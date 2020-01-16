import { closest, EventHandler, isNullOrUndefined } from '@syncfusion/ej2-base';
import { colWidthChanged, rowHeightChanged, beforeHeaderLoaded, contentLoaded, hideShowRow } from '../common/index';
import { findMaxValue, beginCompleteEvents, setResize, autoFit } from '../common/index';
import { setRowHeight, isHiddenRow, getColumn, setRow } from '../../workbook/base/index';
import { getRangeIndexes } from '../../workbook/common/index';
/**
 * The `Resize` module is used to handle the resizing functionalities in Spreadsheet.
 */
var Resize = /** @class */ (function () {
    /**
     * Constructor for resize module in Spreadsheet.
     * @private
     */
    function Resize(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Resize.prototype.addEventListener = function () {
        this.parent.on(contentLoaded, this.wireEvents, this);
        this.parent.on(beforeHeaderLoaded, this.wireEvents, this);
        this.parent.on(autoFit, this.autoFit, this);
    };
    Resize.prototype.autoFit = function (args) {
        args.isRow = args.isRow ? false : true;
        var rowHdrTable = this.parent.getRowHeaderTable();
        for (var i = args.startIndex; i <= args.endIndex; i++) {
            this.trgtEle = this.parent.getRow(i, rowHdrTable);
            this.setAutofit(i, args.isRow);
        }
    };
    Resize.prototype.wireEvents = function (args) {
        var rowHeader = isNullOrUndefined(this.parent.getRowHeaderContent()) ?
            args.element : this.parent.getRowHeaderContent();
        var colHeader = this.parent.getColumnHeaderContent();
        EventHandler.add(colHeader, 'dblclick', this.dblClickHandler, this);
        EventHandler.add(rowHeader, 'dblclick', this.dblClickHandler, this);
        EventHandler.add(colHeader, 'mousedown', this.mouseDownHandler, this);
        EventHandler.add(rowHeader, 'mousedown', this.mouseDownHandler, this);
        this.wireResizeCursorEvent(rowHeader, colHeader);
    };
    Resize.prototype.wireResizeCursorEvent = function (rowHeader, colHeader) {
        EventHandler.add(rowHeader, 'mousemove', this.setTarget, this);
        EventHandler.add(colHeader, 'mousemove', this.setTarget, this);
    };
    Resize.prototype.unWireResizeCursorEvent = function () {
        EventHandler.remove(this.parent.getRowHeaderContent(), 'mousemove', this.setTarget);
        EventHandler.remove(this.parent.getColumnHeaderContent(), 'mousemove', this.setTarget);
    };
    Resize.prototype.unwireEvents = function () {
        EventHandler.remove(this.parent.getColumnHeaderContent(), 'dblclick', this.dblClickHandler);
        EventHandler.remove(this.parent.getRowHeaderContent(), 'dblclick', this.dblClickHandler);
        EventHandler.remove(this.parent.getColumnHeaderContent(), 'mousedown', this.mouseDownHandler);
        EventHandler.remove(this.parent.getRowHeaderContent(), 'mousedown', this.mouseDownHandler);
        this.unWireResizeCursorEvent();
    };
    Resize.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(contentLoaded, this.wireEvents);
            this.parent.off(beforeHeaderLoaded, this.wireEvents);
            this.parent.off(autoFit, this.autoFit);
        }
    };
    Resize.prototype.mouseMoveHandler = function (e) {
        var sheetPanel = this.parent.element.getElementsByClassName('e-sheet-panel')[0];
        var colResizeHandler = this.parent.element.getElementsByClassName('e-colresize-handler')[0];
        var rowResizeHandler = this.parent.element.getElementsByClassName('e-rowresize-handler')[0];
        if (colResizeHandler || rowResizeHandler) {
            if (colResizeHandler) {
                if (e.x > this.trgtEle.parentElement.firstChild.getBoundingClientRect().left) {
                    colResizeHandler.style.left = e.clientX - this.parent.element.getBoundingClientRect().left + 'px';
                }
            }
            else if (rowResizeHandler) {
                if (e.y >= this.trgtEle.parentElement.parentElement.firstChild.getBoundingClientRect().top) {
                    rowResizeHandler.style.top = e.clientY - sheetPanel.getBoundingClientRect().top + 'px';
                }
            }
        }
    };
    Resize.prototype.mouseDownHandler = function (e) {
        this.event = e;
        this.trgtEle = e.target;
        this.updateTarget(e, this.trgtEle);
        var trgt = this.trgtEle;
        var className = trgt.classList.contains('e-colresize') ? 'e-colresize-handler' :
            trgt.classList.contains('e-rowresize') ? 'e-rowresize-handler' : '';
        this.createResizeHandler(trgt, className);
        this.unWireResizeCursorEvent();
        EventHandler.add(this.parent.element, 'mousemove', this.mouseMoveHandler, this);
        EventHandler.add(document, 'mouseup', this.mouseUpHandler, this);
    };
    Resize.prototype.mouseUpHandler = function (e) {
        var colResizeHandler = this.parent.element.getElementsByClassName('e-colresize-handler')[0];
        var rowResizeHandler = this.parent.element.getElementsByClassName('e-rowresize-handler')[0];
        this.resizeOn(e);
        var resizeHandler = colResizeHandler ? colResizeHandler : rowResizeHandler;
        if (resizeHandler) {
            this.parent.element.getElementsByClassName('e-sheet-panel')[0].removeChild(resizeHandler);
            this.updateCursor(e);
        }
        EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
        EventHandler.remove(this.parent.element, 'mousemove', this.mouseMoveHandler);
        this.wireResizeCursorEvent(this.parent.getRowHeaderContent(), this.parent.getColumnHeaderContent());
    };
    Resize.prototype.dblClickHandler = function (e) {
        this.trgtEle = e.target;
        this.updateTarget(e, this.trgtEle);
        var trgt = this.trgtEle;
        if (trgt.classList.contains('e-colresize') || trgt.classList.contains('e-rowresize')) {
            var colIndx = parseInt(trgt.getAttribute('aria-colindex'), 10) - 1;
            var rowIndx = parseInt(this.trgtEle.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            if (trgt.classList.contains('e-colresize')) {
                this.setAutofit(colIndx, true);
            }
            else if (trgt.classList.contains('e-rowresize')) {
                this.setAutofit(rowIndx, false);
            }
        }
    };
    Resize.prototype.setTarget = function (e) {
        var trgt = e.target;
        var newTrgt;
        var tOffsetV;
        var eOffsetV;
        var tClass;
        if (closest(trgt, '.e-header-row')) {
            eOffsetV = e.offsetX;
            tOffsetV = trgt.offsetWidth;
            tClass = 'e-colresize';
            if (!isNullOrUndefined(trgt.previousElementSibling)) {
                newTrgt = trgt.previousElementSibling;
            }
        }
        else if (closest(trgt, '.e-row')) {
            eOffsetV = e.offsetY;
            tOffsetV = trgt.offsetHeight;
            tClass = 'e-rowresize';
            if (isNullOrUndefined(trgt.parentElement.previousElementSibling)) {
                var idx = Number(trgt.parentElement.getAttribute('aria-rowindex'));
                if (idx > 1) {
                    newTrgt = trgt;
                }
            }
            else {
                newTrgt =
                    trgt.parentElement.previousElementSibling.firstElementChild;
            }
        }
        if (tOffsetV - 2 < 8 && eOffsetV !== Math.ceil((tOffsetV - 2) / 2)) {
            if (eOffsetV < Math.ceil((tOffsetV - 2) / 2)) {
                trgt.classList.add(tClass);
                newTrgt.classList.add(tClass);
            }
            else if (eOffsetV > Math.ceil((tOffsetV - 2) / 2)) {
                trgt.classList.add(tClass);
            }
        }
        else if (tOffsetV - 5 < eOffsetV && eOffsetV <= tOffsetV && tOffsetV >= 10) {
            trgt.classList.add(tClass);
        }
        else if (eOffsetV < 5 && newTrgt && tOffsetV >= 10) {
            trgt.classList.add(tClass);
            newTrgt.classList.add(tClass);
        }
        else {
            var resEle = (tClass === 'e-colresize' ? trgt.parentElement.getElementsByClassName(tClass)
                : this.parent.getRowHeaderTable().getElementsByClassName(tClass));
            for (var index = 0; index < resEle.length; index++) {
                resEle[index].classList.remove(tClass);
            }
        }
    };
    Resize.prototype.updateTarget = function (e, trgt) {
        if (closest(trgt, '.e-header-row')) {
            if ((trgt.offsetWidth < 10 && e.offsetX < Math.ceil((trgt.offsetWidth - 2) / 2)) || (e.offsetX < 5 &&
                trgt.offsetWidth >= 10) && trgt.classList.contains('e-colresize') && trgt.previousElementSibling) {
                this.trgtEle = trgt.previousElementSibling;
            }
        }
        else {
            if ((trgt.offsetHeight < 10 && e.offsetY < Math.ceil((trgt.offsetHeight - 2) / 2)) || (e.offsetY < 5 &&
                trgt.offsetHeight >= 10) && trgt.classList.contains('e-rowresize')) {
                var sheet = this.parent.getActiveSheet();
                var prevIdx = Number(trgt.parentElement.getAttribute('aria-rowindex')) - 2;
                if (trgt.parentElement.previousElementSibling || isHiddenRow(sheet, prevIdx)) {
                    if (e.type === 'dblclick' && isHiddenRow(sheet, prevIdx)) {
                        var selectRange = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                        var eventArgs = void 0;
                        if (selectRange[2] === prevIdx) {
                            eventArgs = { startRow: selectRange[0], endRow: selectRange[2], hide: false, autoFit: true };
                        }
                        else {
                            eventArgs = { startRow: prevIdx, endRow: prevIdx, hide: false, autoFit: true };
                        }
                        this.parent.notify(hideShowRow, eventArgs);
                    }
                    else {
                        if (!isHiddenRow(sheet, prevIdx)) {
                            this.trgtEle = trgt.parentElement.previousElementSibling.getElementsByClassName('e-header-cell')[0];
                        }
                    }
                }
            }
        }
    };
    Resize.prototype.setAutofit = function (idx, isCol) {
        var index;
        var oldIdx = idx;
        if (this.parent.scrollSettings.enableVirtualization) {
            idx = isCol ? idx - this.parent.viewport.leftIndex : idx - this.parent.viewport.topIndex;
        }
        var sheet = this.parent.getActiveSheet();
        var mainContent = this.parent.getMainContent();
        var oldValue = isCol ?
            mainContent.getElementsByTagName('col')[idx].style.width : mainContent.getElementsByTagName('tr')[idx].style.height;
        var headerTable = isCol ? this.parent.getColHeaderTable() : this.parent.getRowHeaderTable();
        var contentRow = mainContent.getElementsByClassName('e-row');
        var contentClone = [];
        var contentTable = mainContent.getElementsByClassName('e-content-table')[0];
        var headerRow = headerTable.getElementsByTagName('tr');
        var headerText;
        if (isCol) {
            headerText = headerRow[0].getElementsByClassName('e-header-cell')[idx].cloneNode(true);
            for (index = 0; index < contentRow.length; index++) {
                contentClone[index] = contentRow[index].getElementsByTagName('td')[idx].cloneNode(true);
            }
        }
        else {
            headerText = headerRow[idx].getElementsByClassName('e-header-cell')[0].cloneNode(true);
            for (index = 0; index < contentRow[idx].getElementsByTagName('td').length; index++) {
                contentClone[index] = contentRow[idx].getElementsByTagName('td')[index].cloneNode(true);
            }
        }
        var headerFit = findMaxValue(headerTable, [headerText], isCol, this.parent);
        var contentFit = findMaxValue(contentTable, contentClone, isCol, this.parent);
        var autofitValue = headerFit < contentFit ? contentFit : headerFit;
        var threshold = parseInt(oldValue, 10) > autofitValue ?
            -(parseInt(oldValue, 10) - autofitValue) : autofitValue - parseInt(oldValue, 10);
        if (isCol) {
            getColumn(sheet, oldIdx).width = autofitValue > 0 ? autofitValue : 0;
            this.parent.notify(colWidthChanged, { threshold: threshold, colIdx: oldIdx });
        }
        else {
            setRowHeight(sheet, oldIdx, autofitValue > 0 ? autofitValue : 0);
            this.parent.notify(rowHeightChanged, { threshold: threshold, rowIdx: oldIdx });
        }
        this.resizeStart(idx, autofitValue + 'px', isCol);
    };
    Resize.prototype.createResizeHandler = function (trgt, className) {
        var editor = this.parent.createElement('div', { className: className });
        if (trgt.classList.contains('e-colresize')) {
            editor.style.height = this.parent.getMainContent().clientHeight + trgt.offsetHeight + 'px';
            editor.style.left = this.event.clientX - this.parent.element.getBoundingClientRect().left + 'px';
            editor.style.top = '0px';
        }
        else if (trgt.classList.contains('e-rowresize')) {
            editor.style.width = this.parent.getMainContent().clientWidth + trgt.offsetWidth + 'px';
            editor.style.left = '0px';
            editor.style.top = this.event.clientY
                - this.parent.element.getElementsByClassName('e-sheet-panel')[0].getBoundingClientRect().top + 'px';
        }
        this.parent.element.getElementsByClassName('e-sheet-panel')[0].appendChild(editor);
        this.updateCursor(this.event);
    };
    Resize.prototype.setColWidth = function (index, width) {
        var sheet = this.parent.getActiveSheet();
        var mIndex = index;
        if (this.parent.scrollSettings.enableVirtualization) {
            mIndex = mIndex + this.parent.viewport.leftIndex;
        }
        var eleWidth = parseInt(this.parent.getMainContent().getElementsByTagName('col')[index].style.width, 10);
        var colWidth = width;
        var threshold = parseInt(colWidth, 10) - eleWidth;
        if (threshold < 0 && eleWidth < -(threshold)) {
            threshold = -eleWidth;
        }
        var oldIdx = parseInt(this.trgtEle.getAttribute('aria-colindex'), 10) - 1;
        this.parent.notify(colWidthChanged, { threshold: threshold, colIdx: oldIdx });
        this.resizeStart(index, colWidth, true);
        getColumn(sheet, mIndex).width = parseInt(colWidth, 10) > 0 ? parseInt(colWidth, 10) : 0;
        sheet.columns[mIndex].customWidth = true;
        this.parent.setProperties({ sheets: this.parent.sheets }, true);
    };
    Resize.prototype.setRowHeight = function (rowIdx, viewportIdx, height) {
        var sheet = this.parent.getActiveSheet();
        var eleHeight = parseInt(this.parent.getMainContent().getElementsByTagName('tr')[viewportIdx].style.height, 10);
        var rowHeight = height;
        var threshold = parseInt(rowHeight, 10) - eleHeight;
        if (threshold < 0 && eleHeight < -(threshold)) {
            threshold = -eleHeight;
        }
        this.parent.notify(rowHeightChanged, { threshold: threshold, rowIdx: rowIdx });
        this.resizeStart(viewportIdx, rowHeight, false);
        setRow(sheet, rowIdx, { height: parseInt(rowHeight, 10) > 0 ? parseInt(rowHeight, 10) : 0, customHeight: true });
        this.parent.setProperties({ sheets: this.parent.sheets }, true);
    };
    Resize.prototype.resizeOn = function (e) {
        var idx;
        var actualIdx;
        if (this.trgtEle.classList.contains('e-rowresize')) {
            var sheet = this.parent.getActiveSheet();
            var prevIdx = Number(this.trgtEle.parentElement.getAttribute('aria-rowindex')) - 2;
            if (isHiddenRow(sheet, prevIdx)) {
                var eventArgs = { startRow: prevIdx, endRow: prevIdx, hide: false, skipAppend: true };
                this.parent.notify(hideShowRow, eventArgs);
                var rTbody = this.parent.getRowHeaderTable().tBodies[0];
                var tbody = this.parent.getContentTable().tBodies[0];
                eventArgs.hdrRow.style.display = 'none';
                eventArgs.row.style.display = 'none';
                rTbody.insertBefore(eventArgs.hdrRow, rTbody.children[eventArgs.insertIdx]);
                tbody.insertBefore(eventArgs.row, tbody.children[eventArgs.insertIdx]);
                this.trgtEle = eventArgs.hdrRow.firstElementChild;
                eventArgs.hdrRow.nextElementSibling.classList.remove('e-hide-end');
            }
            actualIdx = idx = parseInt(this.trgtEle.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            if (this.parent.scrollSettings.enableVirtualization) {
                idx = idx - this.parent.hiddenRowsCount(this.parent.viewport.topIndex, idx) - this.parent.viewport.topIndex;
            }
            var rowHeight = e.clientY - this.event.clientY +
                parseInt(this.parent.getMainContent().getElementsByClassName('e-row')[idx].style.height, 10);
            if (rowHeight <= 0) {
                this.parent.showHideRow(true, actualIdx);
                return;
            }
            this.setRowHeight(actualIdx, idx, rowHeight + "px");
            if (this.trgtEle.parentElement.style.display === 'none') {
                var sheet_1 = this.parent.getActiveSheet();
                var selectedRange = getRangeIndexes(sheet_1.selectedRange);
                if (actualIdx === selectedRange[2] && actualIdx !== selectedRange[0]) {
                    rowHeight = sheet_1.rows[actualIdx].height;
                    for (var i = selectedRange[0]; i < selectedRange[2]; i++) {
                        setRow(sheet_1, i, { customHeight: true, height: rowHeight });
                    }
                    this.parent.showHideRow(false, selectedRange[0], actualIdx - 1);
                }
                else {
                    if (idx !== 0 && !isHiddenRow(sheet_1, actualIdx - 1)) {
                        this.trgtEle.parentElement.previousElementSibling.classList.remove('e-hide-start');
                    }
                    else {
                        if (idx !== 0) {
                            this.trgtEle.parentElement.classList.add('e-hide-end');
                        }
                    }
                    this.parent.selectRange(sheet_1.selectedRange);
                }
                this.trgtEle.parentElement.style.display = '';
                this.parent.getContentTable().rows[idx].style.display = '';
            }
        }
        else if (this.trgtEle.classList.contains('e-colresize')) {
            var mIndex = parseInt(this.trgtEle.getAttribute('aria-colindex'), 10) - 1;
            idx = mIndex;
            if (this.parent.scrollSettings.enableVirtualization) {
                idx = idx - this.parent.viewport.leftIndex;
            }
            var colWidth = e.clientX - this.event.clientX +
                parseInt(this.parent.getMainContent().getElementsByTagName('col')[idx].style.width, 10) + 'px';
            this.setColWidth(idx, colWidth);
        }
    };
    Resize.prototype.setWidthAndHeight = function (trgt, value, isCol) {
        if (isCol) {
            trgt.style.width = parseInt(trgt.style.width, 10) + value + 'px';
        }
        else {
            trgt.style.height = parseInt(trgt.style.height, 10) + value + 'px';
        }
    };
    Resize.prototype.resizeStart = function (index, value, isCol, isFit) {
        setResize(index, value, isCol, this.parent);
        var action = isFit ? 'resizeToFit' : 'resize';
        var eventArgs = isCol ? { index: index, width: value, isCol: isCol } : { index: index, height: value, isCol: isCol };
        this.parent.serviceLocator.getService(beginCompleteEvents).completeAction(eventArgs, action);
    };
    Resize.prototype.updateCursor = function (e) {
        if (this.parent.element.getElementsByClassName('e-colresize-handler')[0]) {
            this.parent.element.classList.add('e-col-resizing');
        }
        else if (this.parent.element.classList.contains('e-col-resizing')) {
            this.parent.element.classList.remove('e-col-resizing');
        }
        if (this.parent.element.getElementsByClassName('e-rowresize-handler')[0]) {
            this.parent.element.classList.add('e-row-resizing');
        }
        else if (this.parent.element.classList.contains('e-row-resizing')) {
            this.parent.element.classList.remove('e-row-resizing');
        }
    };
    /**
     * To destroy the resize module.
     * @return {void}
     */
    Resize.prototype.destroy = function () {
        this.unwireEvents();
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the module name.
     * @returns string
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    return Resize;
}());
export { Resize };
