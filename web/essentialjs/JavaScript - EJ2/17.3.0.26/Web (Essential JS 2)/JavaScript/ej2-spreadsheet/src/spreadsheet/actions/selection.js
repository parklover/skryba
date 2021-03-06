import { contentLoaded, mouseDown, virtualContentLoaded, cellNavigate, getUpdateUsingRaf } from '../common/index';
import { getColumnsWidth, updateSelectedRange, getColumnWidth } from '../../workbook/index';
import { getRowHeight, isSingleCell, activeCellChanged } from '../../workbook/index';
import { EventHandler, addClass, removeClass, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { selectionComplete, getMoveEvent, getEndEvent, isTouchStart, locateElem } from '../common/index';
import { isTouchEnd, isTouchMove, getClientX, getClientY, mouseUpAfterSelection, selectRange, rowHeightChanged } from '../common/index';
import { colWidthChanged } from '../common/index';
import { getRangeIndexes, getCellAddress, getRangeAddress, getCellIndexes, getSwapRange } from '../../workbook/common/address';
/**
 * Represents selection support for Spreadsheet.
 */
var Selection = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet selection module.
     * @private
     */
    function Selection(parent) {
        this.parent = parent;
        this.addEventListener();
        this.mouseMoveEvt = this.mouseMoveHandler.bind(this);
    }
    Selection.prototype.addEventListener = function () {
        this.parent.on(contentLoaded, this.init, this);
        this.parent.on(mouseDown, this.mouseDownHandler, this);
        this.parent.on(virtualContentLoaded, this.virtualContentLoadedHandler, this);
        this.parent.on(cellNavigate, this.cellNavigateHandler, this);
        this.parent.on(selectRange, this.selectRange, this);
        this.parent.on(rowHeightChanged, this.rowHeightChanged, this);
        this.parent.on(colWidthChanged, this.colWidthChanged, this);
    };
    Selection.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(contentLoaded, this.init);
            this.parent.off(mouseDown, this.mouseDownHandler);
            this.parent.off(virtualContentLoaded, this.virtualContentLoadedHandler);
            this.parent.off(cellNavigate, this.cellNavigateHandler);
            this.parent.off(selectRange, this.selectRange);
            this.parent.off(rowHeightChanged, this.rowHeightChanged);
            this.parent.off(colWidthChanged, this.colWidthChanged);
        }
    };
    Selection.prototype.rowHeightChanged = function (args) {
        var _this = this;
        getUpdateUsingRaf(function () {
            var ele = _this.getActiveCell();
            var cellIndex = getCellIndexes(_this.parent.getActiveSheet().activeCell)[0];
            if (cellIndex === args.rowIdx && ele) {
                ele.style.height = parseInt(ele.style.height, 10) + args.threshold + "px";
            }
            else if (cellIndex > args.rowIdx && ele) {
                ele.style.top = parseInt(ele.style.top, 10) + args.threshold + "px";
            }
            ele = _this.getSelectionElement();
            if (ele) {
                var selectedRange = getRangeIndexes(_this.parent.getActiveSheet().selectedRange);
                var sRange = getSwapRange(selectedRange);
                var rowStart = sRange[0];
                var rowEnd = sRange[2];
                if (rowStart <= args.rowIdx && rowEnd >= args.rowIdx && ele) {
                    ele.style.height = parseInt(ele.style.height, 10) + args.threshold + "px";
                }
                else if (rowStart > args.rowIdx && ele) {
                    ele.style.top = parseInt(ele.style.top, 10) + args.threshold + "px";
                }
            }
        });
    };
    Selection.prototype.colWidthChanged = function (args) {
        var _this = this;
        getUpdateUsingRaf(function () {
            var ele = _this.getActiveCell();
            var cellIndex = getCellIndexes(_this.parent.getActiveSheet().activeCell)[1];
            if (cellIndex === args.colIdx && ele) {
                ele.style.width = parseInt(ele.style.width, 10) + args.threshold + "px";
            }
            else if (cellIndex > args.colIdx && ele) {
                ele.style.left = parseInt(ele.style.left, 10) + args.threshold + "px";
            }
            ele = _this.getSelectionElement();
            var selectedRange = getRangeIndexes(_this.parent.getActiveSheet().selectedRange);
            var sRange = getSwapRange(selectedRange);
            var colStart = sRange[1];
            var colEnd = sRange[3];
            if (colStart <= args.colIdx && colEnd >= args.colIdx && ele) {
                ele.style.width = parseInt(ele.style.width, 10) + args.threshold + "px";
            }
            else if (colStart > args.colIdx && ele) {
                ele.style.left = parseInt(ele.style.left, 10) + args.threshold + "px";
            }
        });
    };
    Selection.prototype.selectRange = function (indexes) {
        this.selectRangeByIdx(this.parent.selectionSettings.mode === 'Single' ? indexes.slice(0, 2).concat(indexes.slice(0, 2)) : indexes);
    };
    Selection.prototype.init = function () {
        var range = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
        var sRange = getSwapRange(range);
        var actRange = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var inRange = sRange[0] <= actRange[0] && sRange[2] >= actRange[0] && sRange[1] <= actRange[1]
            && sRange[3] >= actRange[1];
        this.createSelectionElement();
        this.selectRangeByIdx(range, null, null, inRange);
    };
    Selection.prototype.createSelectionElement = function () {
        var cont = this.parent.getMainContent();
        var ele = this.parent.createElement('div', { className: 'e-selection' });
        var activeCell = this.parent.createElement('div', { className: 'e-active-cell' });
        cont.appendChild(ele);
        cont.appendChild(activeCell);
    };
    Selection.prototype.mouseDownHandler = function (e) {
        if (!this.parent.isEdit) {
            if (this.getSheetElement().contains(e.target) && !e.target.classList.contains('e-colresize')
                && !e.target.classList.contains('e-rowresize')) {
                var sheet = this.parent.getActiveSheet();
                var mode = this.parent.selectionSettings.mode;
                var rowIdx = this.getRowIdxFromClientY(getClientY(e));
                var colIdx = this.getColIdxFromClientX(getClientX(e));
                var activeIdx = getCellIndexes(sheet.activeCell);
                var isRowSelected = sheet.showHeaders && this.parent.getRowHeaderContent().contains(e.target);
                var isColSelected = sheet.showHeaders && this.parent.getColumnHeaderContent().contains(e.target);
                if (e.which === 3 && this.isSelected(rowIdx, colIdx)) {
                    return;
                }
                if (mode === 'Multiple' && (!isTouchEnd(e) && (!isTouchStart(e) ||
                    (isTouchStart(e) && activeIdx[0] === rowIdx && activeIdx[1] === colIdx)) || isColSelected || isRowSelected)) {
                    document.addEventListener(getMoveEvent().split(' ')[0], this.mouseMoveEvt);
                    if (!Browser.isPointer) {
                        document.addEventListener(getMoveEvent().split(' ')[1], this.mouseMoveEvt, { passive: false });
                    }
                }
                if (!isTouchEnd(e)) {
                    EventHandler.add(document, getEndEvent(), this.mouseUpHandler, this);
                }
                if (isTouchStart(e) && !(isColSelected || isRowSelected)) {
                    this.touchEvt = e;
                    return;
                }
                if (isRowSelected) {
                    this.isRowSelected = true;
                    if (!e.shiftKey || mode === 'Single') {
                        this.startCell = [rowIdx, 0];
                    }
                    this.selectRangeByIdx([this.startCell[0], 0, rowIdx, sheet.colCount - 1], e);
                }
                else if (isColSelected) {
                    this.isColSelected = true;
                    if (!e.shiftKey || mode === 'Single') {
                        this.startCell = [0, colIdx];
                    }
                    this.selectRangeByIdx([0, this.startCell[1], sheet.rowCount - 1, colIdx], e);
                }
                else if (e.target.classList.contains('e-selectall')) {
                    this.startCell = [0, 0];
                    this.selectRangeByIdx([].concat(this.startCell, [sheet.rowCount - 1, sheet.colCount - 1]), e);
                }
                else if (!e.target.classList.contains('e-main-content')) {
                    if (!e.shiftKey || mode === 'Single') {
                        this.startCell = [rowIdx, colIdx];
                    }
                    this.selectRangeByIdx([].concat(this.startCell ? this.startCell : getCellIndexes(sheet.activeCell), [rowIdx, colIdx]), e);
                }
                if (this.parent.isMobileView()) {
                    this.parent.element.classList.add('e-mobile-focused');
                    this.parent.renderModule.setSheetPanelSize();
                }
            }
        }
    };
    Selection.prototype.mouseMoveHandler = function (e) {
        var _this = this;
        if (isTouchMove(e)) {
            e.preventDefault();
        }
        var sheet = this.parent.getActiveSheet();
        var cont = this.getScrollContent();
        var clientRect = cont.getBoundingClientRect();
        var clientX = getClientX(e);
        var clientY = getClientY(e);
        // remove math.min or handle top and left auto scroll
        var colIdx = this.isRowSelected ? sheet.colCount - 1 : this.getColIdxFromClientX(Math.min(clientX, clientRect.right));
        var rowIdx = this.isColSelected ? sheet.rowCount - 1 : this.getRowIdxFromClientY(Math.min(clientY, clientRect.bottom));
        var isScrollDown = clientY > clientRect.bottom && rowIdx < sheet.rowCount;
        var isScrollUp = clientY < clientRect.top && rowIdx >= 0 && !this.isColSelected;
        var isScrollRight = clientX > clientRect.right && colIdx < sheet.colCount;
        var isScrollLeft = clientX < clientRect.left && colIdx >= 0 && !this.isRowSelected;
        this.clearInterval();
        if (isScrollDown || isScrollUp || isScrollRight || isScrollLeft) {
            this.scrollInterval = setInterval(function () {
                if ((isScrollDown || isScrollUp) && !_this.isColSelected) {
                    rowIdx = _this.getRowIdxFromClientY(isScrollDown ? clientRect.bottom : clientRect.top);
                    if (rowIdx >= sheet.rowCount) { // clear interval when scroll up
                        _this.clearInterval();
                        return;
                    }
                    cont.scrollTop += (isScrollDown ? 1 : -1) * getRowHeight(sheet, rowIdx);
                }
                if ((isScrollRight || isScrollLeft) && !_this.isRowSelected) {
                    colIdx = _this.getColIdxFromClientX(isScrollRight ? clientRect.right : clientRect.left);
                    if (colIdx >= sheet.colCount) { // clear interval when scroll left
                        _this.clearInterval();
                        return;
                    }
                    cont.scrollLeft += (isScrollRight ? 1 : -1) * getColumnWidth(sheet, colIdx);
                }
                _this.selectRangeByIdx([].concat(_this.startCell, [rowIdx, colIdx]), e);
                // tslint:disable-next-line
            }, 100);
        }
        else {
            this.selectRangeByIdx([].concat(this.startCell ? this.startCell : getCellIndexes(sheet.activeCell), [rowIdx, colIdx]), e);
        }
    };
    Selection.prototype.mouseUpHandler = function (e) {
        var rowIdx = this.getRowIdxFromClientY(getClientY(e));
        var colIdx = this.getColIdxFromClientX(getClientX(e));
        this.clearInterval();
        if (isTouchEnd(e) && !(this.isColSelected || this.isRowSelected) &&
            (this.getRowIdxFromClientY(getClientY(this.touchEvt)) === rowIdx &&
                this.getColIdxFromClientX(getClientX(this.touchEvt)) === colIdx)) {
            this.mouseDownHandler(e);
        }
        this.parent.trigger('select', { range: this.parent.getActiveSheet().selectedRange });
        document.removeEventListener(getMoveEvent().split(' ')[0], this.mouseMoveEvt);
        if (!Browser.isPointer) {
            document.removeEventListener(getMoveEvent().split(' ')[1], this.mouseMoveEvt);
        }
        EventHandler.remove(document, getEndEvent(), this.mouseUpHandler);
        this.parent.notify(mouseUpAfterSelection, e);
    };
    Selection.prototype.isSelected = function (rowIdx, colIdx) {
        var indexes = getSwapRange(getRangeIndexes(this.parent.getActiveSheet().selectedRange));
        return indexes[0] <= rowIdx && rowIdx <= indexes[2] && indexes[1] <= colIdx && colIdx <= indexes[3];
    };
    Selection.prototype.virtualContentLoadedHandler = function () {
        var sheet = this.parent.getActiveSheet();
        var indexes = getRangeIndexes(sheet.selectedRange);
        if (this.isColSelected && this.isRowSelected) {
            this.selectRangeByIdx([0, 0, sheet.rowCount - 1, sheet.colCount - 1], null, true);
        }
        else if (this.isColSelected) {
            this.selectRangeByIdx([0, indexes[1], sheet.rowCount - 1, indexes[3]], null, true);
        }
        else if (this.isRowSelected) {
            this.selectRangeByIdx([indexes[0], 0, indexes[2], sheet.colCount - 1], null, true);
        }
        else {
            this.highlightHdr(indexes, indexes[0] >= this.parent.viewport.topIndex || indexes[2] >= this.parent.viewport.topIndex, indexes[1] >= this.parent.viewport.leftIndex || indexes[3] >= this.parent.viewport.leftIndex);
        }
    };
    Selection.prototype.clearInterval = function () {
        clearInterval(this.scrollInterval);
        this.scrollInterval = null;
    };
    Selection.prototype.getScrollContent = function () {
        return this.parent.getMainContent();
    };
    Selection.prototype.getScrollLeft = function () {
        return this.parent.scrollModule ? this.parent.scrollModule.prevScroll.scrollLeft : 0;
    };
    Selection.prototype.cellNavigateHandler = function (args) {
        this.selectRangeByIdx(args.range.concat(args.range));
    };
    Selection.prototype.getColIdxFromClientX = function (clientX) {
        var width = 0;
        var sheet = this.parent.getActiveSheet();
        var cliRect = this.parent.getMainContent().getBoundingClientRect();
        var left = (this.parent.enableRtl ? (cliRect.right - clientX) : (clientX - cliRect.left)) + this.getScrollLeft();
        for (var i = 0;; i++) {
            width += getColumnsWidth(sheet, i);
            if (left < width) {
                return i;
            }
        }
    };
    Selection.prototype.getRowIdxFromClientY = function (clientY) {
        var height = 0;
        var sheet = this.parent.getActiveSheet();
        var top = (clientY - this.parent.getMainContent().getBoundingClientRect().top)
            + this.parent.getMainContent().scrollTop;
        for (var i = 0;; i++) {
            height += getRowHeight(sheet, i);
            if (top < height) {
                return i;
            }
        }
    };
    Selection.prototype.selectRangeByIdx = function (range, e, isScrollRefresh, isActCellChanged) {
        var ele = this.getSelectionElement();
        var sheet = this.parent.getActiveSheet();
        var args = { range: getRangeAddress(range), cancel: false };
        this.parent.trigger('beforeSelect', args);
        if (args.cancel === true) {
            return;
        }
        if (isSingleCell(range)) {
            ele.classList.add('e-hide');
        }
        else {
            ele.classList.remove('e-hide');
            locateElem(ele, range, sheet, this.parent.enableRtl);
        }
        updateSelectedRange(this.parent, getRangeAddress(range), sheet);
        this.UpdateRowColSelected(range);
        this.highlightHdr(range);
        if (!isScrollRefresh && !(e && (e.type === 'mousemove' || isTouchMove(e)))) {
            this.updateActiveCell(isActCellChanged ? getCellIndexes(sheet.activeCell) : range);
        }
        if (isNullOrUndefined(e)) {
            e = { type: 'mousedown' };
        }
        this.parent.notify(selectionComplete, e);
    };
    Selection.prototype.UpdateRowColSelected = function (indexes) {
        var sheet = this.parent.getActiveSheet();
        this.isRowSelected = (indexes[1] === 0 && indexes[3] === sheet.colCount - 1);
        this.isColSelected = (indexes[0] === 0 && indexes[2] === sheet.rowCount - 1);
    };
    Selection.prototype.updateActiveCell = function (range) {
        var sheet = this.parent.getActiveSheet();
        var topLeftIdx = getRangeIndexes(sheet.topLeftCell);
        var rowIdx = this.isColSelected ? topLeftIdx[0] : range[0];
        var colIdx = this.isRowSelected ? topLeftIdx[1] : range[1];
        sheet.activeCell = getCellAddress(rowIdx, colIdx);
        this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
        locateElem(this.getActiveCell(), getRangeIndexes(sheet.activeCell), sheet, this.parent.enableRtl);
        this.parent.notify(activeCellChanged, [rowIdx, colIdx]);
    };
    Selection.prototype.getSelectionElement = function () {
        return this.parent.element.getElementsByClassName('e-selection')[0];
    };
    Selection.prototype.getActiveCell = function () {
        return this.parent.getMainContent().getElementsByClassName('e-active-cell')[0];
    };
    Selection.prototype.getSheetElement = function () {
        return document.getElementById(this.parent.element.id + '_sheet');
    };
    Selection.prototype.highlightHdr = function (range, isRowRefresh, isColRefresh) {
        if (isRowRefresh === void 0) { isRowRefresh = true; }
        if (isColRefresh === void 0) { isColRefresh = true; }
        if (this.parent.getActiveSheet().showHeaders) {
            var rowHdr = [];
            var colHdr = [];
            var swapRange = getSwapRange(range);
            swapRange = this.getHdrIndexes(swapRange);
            var selectAll = this.parent.element.getElementsByClassName('e-select-all-cell')[0];
            removeClass(this.getSheetElement().querySelectorAll('.e-highlight'), 'e-highlight');
            removeClass(this.getSheetElement().querySelectorAll('.e-prev-highlight'), 'e-prev-highlight');
            removeClass([selectAll], ['e-prev-highlight-right', 'e-prev-highlight-bottom']);
            if (isRowRefresh) {
                rowHdr = [].slice.call(this.parent.getRowHeaderContent().querySelectorAll('td')).slice(swapRange[0], swapRange[2] + 1);
            }
            if (isColRefresh) {
                colHdr = [].slice.call(this.parent.getColumnHeaderContent().querySelectorAll('th')).slice(swapRange[1], swapRange[3] + 1);
            }
            addClass([].concat(rowHdr, colHdr), 'e-highlight');
            if (rowHdr.length && rowHdr[0].parentElement.previousElementSibling) {
                rowHdr[0].parentElement.previousElementSibling.classList.add('e-prev-highlight');
            }
            if (colHdr.length && colHdr[0].previousElementSibling) {
                colHdr[0].previousElementSibling.classList.add('e-prev-highlight');
            }
            if (this.isRowSelected && this.isColSelected) {
                document.getElementById(this.parent.element.id + "_select_all").classList.add('e-highlight');
            }
            if (swapRange[0] === 0) {
                selectAll.classList.add('e-prev-highlight-bottom');
            }
            if (swapRange[1] === 0) {
                selectAll.classList.add('e-prev-highlight-right');
            }
        }
    };
    Selection.prototype.getHdrIndexes = function (range) {
        if (this.parent.scrollSettings.enableVirtualization) {
            var indexes = [];
            var hiddenRowCount = this.parent.hiddenRowsCount(this.parent.viewport.topIndex, range[0]);
            indexes[0] = this.isColSelected ? range[0] : (range[0] - this.parent.viewport.topIndex) < 0
                ? 0 : ((range[0] - hiddenRowCount) - this.parent.viewport.topIndex);
            indexes[1] = this.isRowSelected ? range[1] : (range[1] - this.parent.viewport.leftIndex) < 0
                ? 0 : (range[1] - this.parent.viewport.leftIndex);
            indexes[2] = this.isColSelected ? this.parent.viewport.rowCount + this.parent.getThreshold('row') * 2 : range[2] -
                this.parent.hiddenRowsCount(range[0], range[2]) - hiddenRowCount - this.parent.viewport.topIndex;
            indexes[3] = this.isRowSelected ? this.parent.viewport.colCount + this.parent.getThreshold('col') * 2 : indexes[1] === 0
                ? range[3] - this.parent.viewport.leftIndex : range[3] - range[1] + indexes[1];
            return indexes;
        }
        return range;
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    Selection.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    return Selection;
}());
export { Selection };
