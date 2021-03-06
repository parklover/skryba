import { formatUnit, detach, attributes } from '@syncfusion/ej2-base';
import { getRangeIndexes } from './../../workbook/common/address';
import { getColumnWidth } from '../../workbook/base/column';
import { contentLoaded, editOperation, getUpdateUsingRaf, removeAllChildren } from '../common/index';
import { beforeContentLoaded, getColGroupWidth, virtualContentLoaded, setAriaOptions, dataBound } from '../common/index';
import { beforeHeaderLoaded } from '../common/index';
/**
 * Sheet module is used to render Sheet

 */
var SheetRender = /** @class */ (function () {
    function SheetRender(parent) {
        this.freezePane = false;
        this.colGroupWidth = 30; //Row header and selectall table colgroup width
        this.parent = parent;
        this.col = parent.createElement('col');
        this.rowRenderer = parent.serviceLocator.getService('row');
        this.cellRenderer = parent.serviceLocator.getService('cell');
    }
    SheetRender.prototype.refreshSelectALLContent = function () {
        var cell;
        if (this.freezePane) {
            var tHead = this.getSelectAllTable().querySelector('thead');
            var row = this.rowRenderer.render();
            tHead.appendChild(row);
            cell = this.parent.createElement('th', { className: 'e-select-all-cell' });
            row.appendChild(cell);
        }
        else {
            cell = this.headerPanel.firstElementChild;
            cell.classList.add('e-select-all-cell');
        }
        cell.appendChild(this.parent.createElement('button', { className: 'e-selectall e-icons',
            id: this.parent.element.id + "_select_all" }));
    };
    SheetRender.prototype.updateLeftColGroup = function (width, rowHdr) {
        if (width) {
            this.colGroupWidth = width;
        }
        if (!rowHdr) {
            rowHdr = this.getRowHeaderPanel();
        }
        var table = rowHdr.querySelector('table');
        this.detachColGroup(table);
        var colGrp = this.parent.createElement('colgroup');
        var colGrpWidth = this.colGroupWidth + "px";
        var col = this.col.cloneNode();
        col.style.width = colGrpWidth;
        colGrp.appendChild(col);
        table.insertBefore(colGrp, table.querySelector('tbody'));
        rowHdr.style.width = colGrpWidth;
        if (this.freezePane) {
            table = this.getSelectAllTable();
            this.detachColGroup(table);
            table.insertBefore(colGrp.cloneNode(true), table.querySelector('thead'));
        }
        else {
            this.getSelectAllContent().style.width = colGrpWidth;
        }
        if (this.parent.getActiveSheet().showHeaders) {
            this.getColHeaderPanel().style.width = "calc(100% - " + colGrpWidth + ")";
            this.getContentPanel().style.width = "calc(100% - " + colGrpWidth + ")";
        }
    };
    SheetRender.prototype.detachColGroup = function (table) {
        var colGrp = table.querySelector('colgroup');
        if (colGrp) {
            detach(colGrp);
        }
    };
    SheetRender.prototype.renderPanel = function () {
        this.contentPanel = this.parent.createElement('div', { className: 'e-main-panel' });
        var sheet = this.parent.getActiveSheet();
        var id = this.parent.element.id;
        if (sheet.showHeaders) {
            this.contentPanel.appendChild(this.parent.createElement('div', { className: 'e-row-header', id: id + "_row_header" }));
            this.initHeaderPanel();
            this.parent.scrollModule.setPadding();
        }
        else {
            this.updateHideHeaders();
        }
        var content = this.contentPanel.appendChild(this.parent.createElement('div', { className: 'e-main-content', id: id + "_main_content" }));
        if (!sheet.showGridLines) {
            content.classList.add('e-hide-gridlines');
        }
        if (!this.parent.allowScrolling) {
            content.style.overflow = 'hidden';
        }
    };
    SheetRender.prototype.initHeaderPanel = function () {
        var id = this.parent.element.id;
        this.headerPanel = this.parent.createElement('div', { className: 'e-header-panel' });
        this.headerPanel.appendChild(this.parent.createElement('div', { className: 'e-selectall-container', id: id + "_selectall" }));
        this.headerPanel.appendChild(this.parent.createElement('div', { className: 'e-column-header', id: id + "_col_header" }));
    };
    SheetRender.prototype.createTable = function () {
        if (this.parent.getActiveSheet().showHeaders) {
            this.createHeaderTable();
        }
        this.updateTable('tbody', 'content', this.contentPanel.lastElementChild);
    };
    SheetRender.prototype.createHeaderTable = function (rowHdrEle) {
        if (rowHdrEle === void 0) { rowHdrEle = this.contentPanel.querySelector('.e-row-header'); }
        if (this.freezePane) {
            this.updateTable('thead', 'selectall', this.headerPanel.querySelector('.e-selectall-container'));
        }
        this.updateTable('thead', 'colhdr', this.headerPanel.querySelector('.e-column-header'));
        this.updateTable('tbody', 'rowhdr', rowHdrEle);
        this.updateLeftColGroup(null, rowHdrEle);
    };
    SheetRender.prototype.updateTable = function (tagName, name, appendTo) {
        var table = this.parent.createElement('table', { className: 'e-table', attrs: { 'role': 'grid' } });
        table.classList.add("e-" + name + "-table");
        appendTo.appendChild(table);
        table.appendChild(this.parent.createElement(tagName));
    };
    /**
     * It is used to refresh the select all, row header, column header and content table contents.
     */
    SheetRender.prototype.renderTable = function (cells, rowIdx, colIdx, lastIdx, top, left) {
        var _this = this;
        var indexes;
        var row;
        var sheet = this.parent.getActiveSheet();
        var frag = document.createDocumentFragment();
        this.createTable();
        var colGrp = this.parent.createElement('colgroup');
        var cTBody = this.contentPanel.querySelector('.e-main-content tbody');
        var rHdrTBody;
        var cHdrTHead;
        var cHdrRow;
        if (sheet.showHeaders) {
            frag.appendChild(this.headerPanel);
            this.refreshSelectALLContent();
            rHdrTBody = this.contentPanel.querySelector('.e-row-header tbody');
            cHdrTHead = this.headerPanel.querySelector('.e-column-header thead');
            this.getColHeaderTable().insertBefore(colGrp, cHdrTHead);
            cHdrRow = this.rowRenderer.render();
            cHdrTHead.appendChild(cHdrRow);
        }
        frag.appendChild(this.contentPanel);
        this.parent.notify(beforeContentLoaded, { startColIdx: colIdx });
        var colCount = sheet.colCount.toString();
        var rowCount = sheet.colCount.toString();
        if (sheet.showHeaders) {
            this.parent.getColHeaderTable().setAttribute('aria-colcount', colCount);
            this.parent.getRowHeaderTable().setAttribute('aria-rowcount', rowCount);
        }
        attributes(this.parent.getContentTable(), { 'aria-rowcount': rowCount, 'aria-colcount': colCount });
        cells.forEach(function (value, key) {
            indexes = getRangeIndexes(key);
            if (indexes[0] === rowIdx) {
                _this.updateCol(indexes[1], colGrp, sheet);
                if (sheet.showHeaders) {
                    cHdrRow.appendChild(_this.cellRenderer.renderColHeader(indexes[1]));
                }
            }
            if (indexes[1] === colIdx) {
                if (sheet.showHeaders) {
                    row = _this.rowRenderer.render(indexes[0], true);
                    rHdrTBody.appendChild(row);
                    row.appendChild(_this.cellRenderer.renderRowHeader(indexes[0]));
                }
                row = _this.rowRenderer.render(indexes[0]);
                cTBody.appendChild(row);
            }
            row.appendChild(_this.cellRenderer.render({ colIdx: indexes[1], rowIdx: indexes[0], cell: value,
                address: key, lastCell: indexes[1] === lastIdx, isHeightCheckNeeded: true }));
        });
        this.getContentTable().insertBefore(colGrp.cloneNode(true), cTBody);
        getUpdateUsingRaf(function () {
            var content = _this.parent.getMainContent();
            document.getElementById(_this.parent.element.id + '_sheet').appendChild(frag);
            if (top) {
                content.scrollTop = top;
                if (sheet.showHeaders) {
                    _this.parent.getRowHeaderContent().scrollTop = top;
                }
            }
            if (left) {
                content.scrollLeft = left;
                if (sheet.showHeaders) {
                    _this.parent.getColumnHeaderContent().scrollLeft = left;
                }
            }
            _this.parent.notify(contentLoaded, null);
            _this.parent.notify(editOperation, { action: 'renderEditor' });
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
            _this.parent.trigger(dataBound, {});
        });
    };
    SheetRender.prototype.refreshColumnContent = function (cells, rowIndex, colIndex, lastIdx) {
        var _this = this;
        var indexes;
        var row;
        var table;
        var count = 0;
        var sheet = this.parent.getActiveSheet();
        var frag = document.createDocumentFragment();
        var hFrag = document.createDocumentFragment();
        var tBody = this.parent.element.querySelector('.e-main-content tbody');
        tBody = frag.appendChild(tBody.cloneNode(true));
        var colGrp = this.parent.element.querySelector('.e-main-content colgroup');
        colGrp = colGrp.cloneNode();
        var hRow;
        var tHead;
        if (sheet.showHeaders) {
            hFrag.appendChild(colGrp);
            tHead = this.parent.element.querySelector('.e-column-header thead');
            tHead = hFrag.appendChild(tHead.cloneNode(true));
            hRow = tHead.querySelector('tr');
            hRow.innerHTML = '';
        }
        cells.forEach(function (value, key) {
            indexes = getRangeIndexes(key);
            if (indexes[0] === rowIndex) {
                _this.updateCol(indexes[1], colGrp, sheet);
                if (sheet.showHeaders) {
                    hRow.appendChild(_this.cellRenderer.renderColHeader(indexes[1]));
                }
            }
            if (indexes[1] === colIndex) {
                row = tBody.children[count];
                if (row) {
                    count++;
                    row.innerHTML = '';
                }
                else {
                    return;
                }
            }
            row.appendChild(_this.cellRenderer.render({
                colIdx: indexes[1], rowIdx: indexes[0], cell: value, address: key
            }));
        });
        frag.insertBefore(colGrp.cloneNode(true), tBody);
        getUpdateUsingRaf(function () {
            if (sheet.showHeaders) {
                table = _this.getColHeaderTable();
                removeAllChildren(table);
                table.appendChild(hFrag);
            }
            table = _this.getContentTable();
            removeAllChildren(table);
            table.appendChild(frag);
            _this.parent.notify(virtualContentLoaded, { refresh: 'Column' });
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        });
    };
    SheetRender.prototype.refreshRowContent = function (cells, startIndex, lastIdx) {
        var _this = this;
        var indexes;
        var row;
        var hRow;
        var colGroupWidth = this.colGroupWidth;
        var sheet = this.parent.getActiveSheet();
        var hFrag;
        var hTBody;
        var frag = document.createDocumentFragment();
        var tBody = this.parent.createElement('tbody');
        if (sheet.showHeaders) {
            hFrag = document.createDocumentFragment();
            hTBody = tBody.cloneNode();
            hFrag.appendChild(hTBody);
        }
        frag.appendChild(tBody);
        cells.forEach(function (value, key) {
            indexes = getRangeIndexes(key);
            if (indexes[1] === startIndex) {
                if (sheet.showHeaders) {
                    hRow = _this.rowRenderer.render(indexes[0], true);
                    hTBody.appendChild(hRow);
                    hRow.appendChild(_this.cellRenderer.renderRowHeader(indexes[0]));
                    colGroupWidth = getColGroupWidth(indexes[0] + 1);
                }
                row = _this.rowRenderer.render(indexes[0]);
                tBody.appendChild(row);
            }
            row.appendChild(_this.cellRenderer.render({ rowIdx: indexes[0], colIdx: indexes[1], cell: value, address: key,
                lastCell: indexes[1] === lastIdx, row: row, hRow: hRow, isHeightCheckNeeded: true }));
        });
        getUpdateUsingRaf(function () {
            if (_this.parent.isDestroyed) {
                return;
            }
            if (_this.colGroupWidth !== colGroupWidth) {
                _this.updateLeftColGroup(colGroupWidth);
            }
            if (sheet.showHeaders) {
                detach(_this.contentPanel.querySelector('.e-row-header tbody'));
                _this.getRowHeaderTable().appendChild(hFrag);
            }
            detach(_this.contentPanel.querySelector('.e-main-content tbody'));
            _this.getContentTable().appendChild(frag);
            _this.parent.notify(virtualContentLoaded, { refresh: 'Row' });
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        });
    };
    SheetRender.prototype.updateCol = function (idx, appendTo, sheet) {
        var col = this.col.cloneNode();
        col.style.width = formatUnit(getColumnWidth(sheet, idx));
        appendTo.appendChild(col);
    };
    SheetRender.prototype.updateColContent = function (cells, rowIdx, colIdx, lastIdx, direction) {
        var _this = this;
        getUpdateUsingRaf(function () {
            var indexes;
            var row;
            var table;
            var refChild;
            var cell;
            var hRow;
            var rowCount = 0;
            var col;
            var hRefChild;
            var sheet = _this.parent.getActiveSheet();
            if (sheet.showHeaders) {
                hRow = _this.parent.element.querySelector('.e-column-header .e-header-row');
                hRefChild = hRow.firstElementChild;
            }
            var colGrp = _this.parent.element.querySelector('.e-main-content colgroup');
            var colRefChild = colGrp.firstElementChild;
            var tBody = _this.parent.element.querySelector('.e-main-content tbody');
            cells.forEach(function (value, key) {
                indexes = getRangeIndexes(key);
                if (indexes[0] === rowIdx) {
                    if (direction === 'first') {
                        _this.updateCol(indexes[1], colGrp, sheet);
                        if (sheet.showHeaders) {
                            hRow.appendChild(_this.cellRenderer.renderColHeader(indexes[1]));
                        }
                    }
                    else {
                        col = _this.col.cloneNode();
                        col.style.width = formatUnit(getColumnWidth(sheet, indexes[1]));
                        colGrp.insertBefore(col, colRefChild);
                        if (sheet.showHeaders) {
                            hRow.insertBefore(_this.cellRenderer.renderColHeader(indexes[1]), hRefChild);
                        }
                    }
                    if (_this.parent.scrollSettings.enableVirtualization) {
                        // tslint:disable
                        detach(colGrp[direction + 'ElementChild']);
                        if (sheet.showHeaders) {
                            detach(hRow[direction + 'ElementChild']);
                        }
                        // tslint:enable
                    }
                }
                if (indexes[1] === colIdx) {
                    row = tBody.children[rowCount];
                    rowCount++;
                    refChild = row.firstElementChild;
                }
                cell = _this.cellRenderer.render({ colIdx: indexes[1], rowIdx: indexes[0], cell: value, address: key,
                    lastCell: indexes[1] === lastIdx, isHeightCheckNeeded: direction === 'first' });
                if (direction === 'first') {
                    row.appendChild(cell);
                }
                else {
                    row.insertBefore(cell, refChild);
                }
                if (_this.parent.scrollSettings.enableVirtualization) {
                    // tslint:disable-next-line:no-any
                    detach(row[direction + 'ElementChild']);
                }
            });
            if (sheet.showHeaders) {
                table = _this.getColHeaderTable();
                detach(table.querySelector('colgroup'));
                table.insertBefore(colGrp.cloneNode(true), table.querySelector('thead'));
            }
            if (_this.parent.scrollSettings.enableVirtualization) {
                _this.parent.notify(virtualContentLoaded, { refresh: 'Column' });
            }
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        });
    };
    SheetRender.prototype.updateRowContent = function (cells, startIndex, lastIdx, direction) {
        var _this = this;
        var colGroupWidth = this.colGroupWidth;
        var row;
        var hRow;
        var sheet = this.parent.getActiveSheet();
        var tBody = this.parent.getMainContent().querySelector('tbody');
        var rTBody;
        var rFrag;
        if (sheet.showHeaders) {
            rFrag = document.createDocumentFragment();
            rTBody = this.parent.getRowHeaderContent().querySelector('tbody');
        }
        var indexes;
        var frag = document.createDocumentFragment();
        this.parent.showSpinner();
        cells.forEach(function (value, cKey) {
            indexes = getRangeIndexes(cKey);
            if (indexes[1] === startIndex) {
                if (sheet.showHeaders) {
                    hRow = _this.rowRenderer.render(indexes[0], true);
                    rFrag.appendChild(hRow);
                    hRow.appendChild(_this.cellRenderer.renderRowHeader(indexes[0]));
                    colGroupWidth = getColGroupWidth(indexes[0] + 1);
                    if (_this.parent.scrollSettings.enableVirtualization && direction) {
                        // tslint:disable-next-line:no-any
                        detach(rTBody[direction + 'ElementChild']);
                    }
                }
                row = _this.rowRenderer.render(indexes[0]);
                frag.appendChild(row);
                if (_this.parent.scrollSettings.enableVirtualization && direction) {
                    // tslint:disable-next-line:no-any
                    detach(tBody[direction + 'ElementChild']);
                }
            }
            row.appendChild(_this.cellRenderer.render({ colIdx: indexes[1], rowIdx: indexes[0], cell: value, address: cKey,
                lastCell: indexes[1] === lastIdx, row: row, hRow: hRow, isHeightCheckNeeded: direction === 'first' || direction === '' }));
        });
        getUpdateUsingRaf(function () {
            if (_this.colGroupWidth !== colGroupWidth) {
                _this.updateLeftColGroup(colGroupWidth);
            }
            if (direction === 'last') {
                if (sheet.showHeaders) {
                    rTBody.insertBefore(rFrag, rTBody.firstElementChild);
                }
                tBody.insertBefore(frag, tBody.firstElementChild);
            }
            else {
                if (sheet.showHeaders) {
                    rTBody.appendChild(rFrag);
                }
                tBody.appendChild(frag);
            }
            if (_this.parent.scrollSettings.enableVirtualization) {
                _this.parent.notify(virtualContentLoaded, { refresh: 'Row' });
            }
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        });
    };
    /**
     * Used to toggle row and column headers.
     */
    SheetRender.prototype.showHideHeaders = function () {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        if (sheet.showHeaders) {
            if (this.parent.scrollSettings.enableVirtualization) {
                var startIndex = [this.parent.viewport.topIndex, this.parent.viewport.leftIndex];
                this.renderHeaders([startIndex[0], startIndex[0] + this.parent.viewport.rowCount + (this.parent.getThreshold('row') * 2)], [startIndex[1], startIndex[1] + this.parent.viewport.colCount + (this.parent.getThreshold('col') * 2)]);
            }
            else {
                this.renderHeaders([0, sheet.rowCount - 1], [0, sheet.colCount - 1]);
                if (sheet.topLeftCell !== 'A1') {
                    this.parent.goTo(sheet.topLeftCell);
                }
            }
        }
        else {
            getUpdateUsingRaf(function () {
                detach(_this.headerPanel);
                detach(_this.getRowHeaderPanel());
                _this.getContentPanel().style.width = '';
                _this.updateHideHeaders();
            });
        }
    };
    SheetRender.prototype.renderHeaders = function (rowIndexes, colIndexes) {
        var _this = this;
        this.initHeaderPanel();
        var cFrag = document.createDocumentFragment();
        var rFrag = document.createDocumentFragment();
        cFrag.appendChild(this.headerPanel);
        var rowHdrEle = rFrag.appendChild(this.parent.createElement('div', { className: 'e-row-header', id: this.parent.element.id + "_row_header" }));
        this.createHeaderTable(rowHdrEle);
        this.parent.notify(beforeHeaderLoaded, { element: rowHdrEle });
        this.refreshSelectALLContent();
        var rTBody = rowHdrEle.querySelector('tbody');
        var cTHead = this.headerPanel.querySelector('.e-column-header thead');
        var cRow = this.rowRenderer.render();
        cTHead.appendChild(cRow);
        var row;
        for (var i = colIndexes[0]; i <= colIndexes[1]; i++) {
            cRow.appendChild(this.cellRenderer.renderColHeader(i));
        }
        var colGroupWidth = getColGroupWidth(rowIndexes[1]);
        if (this.colGroupWidth !== colGroupWidth) {
            this.updateLeftColGroup(colGroupWidth, rowHdrEle);
        }
        for (var i = rowIndexes[0]; i <= rowIndexes[1]; i++) {
            row = this.rowRenderer.render(i, true);
            row.appendChild(this.cellRenderer.renderRowHeader(i));
            rTBody.appendChild(row);
        }
        getUpdateUsingRaf(function () {
            _this.getColHeaderTable().insertBefore(_this.getContentTable().querySelector('colgroup').cloneNode(true), cTHead);
            var sheet = document.getElementById(_this.parent.element.id + '_sheet');
            sheet.classList.remove('e-hide-headers');
            sheet.insertBefore(cFrag, _this.contentPanel);
            var content = _this.getContentPanel();
            _this.contentPanel.insertBefore(rFrag, content);
            _this.parent.scrollModule.setPadding();
            rowHdrEle.scrollTop = content.scrollTop;
            _this.getColHeaderPanel().scrollLeft = content.scrollLeft;
        });
    };
    SheetRender.prototype.updateHideHeaders = function () {
        document.getElementById(this.parent.element.id + '_sheet').classList.add('e-hide-headers');
        this.headerPanel = null;
    };
    /**
     * Get the select all table element of spreadsheet
     * @return {HTMLElement}
     */
    SheetRender.prototype.getSelectAllContent = function () {
        return this.headerPanel.getElementsByClassName('e-selectall-container')[0];
    };
    /**
     * Get the select all table element of spreadsheet
     * @return {Element}
     */
    SheetRender.prototype.getSelectAllTable = function () {
        return this.headerPanel.getElementsByClassName('e-selectall-table')[0];
    };
    /**
     * Get the column header element of spreadsheet
     * @return {HTMLTableElement}
     */
    SheetRender.prototype.getColHeaderTable = function () {
        return this.headerPanel.getElementsByClassName('e-colhdr-table')[0];
    };
    /**
     * Get the row header table element of spreadsheet
     * @return {HTMLTableElement}
     */
    SheetRender.prototype.getRowHeaderTable = function () {
        return this.contentPanel.getElementsByClassName('e-rowhdr-table')[0];
    };
    /**
     * Get the main content table element of spreadsheet
     * @return {Element}
     */
    SheetRender.prototype.getContentTable = function () {
        return this.contentPanel.getElementsByClassName('e-content-table')[0];
    };
    /**
     * Get the row header div element of spreadsheet
     * @return {Element}
     */
    SheetRender.prototype.getRowHeaderPanel = function () {
        return this.contentPanel.getElementsByClassName('e-row-header')[0];
    };
    /**
     * Get the column header div element of spreadsheet
     * @return {Element}
     */
    SheetRender.prototype.getColHeaderPanel = function () {
        return this.headerPanel.getElementsByClassName('e-column-header')[0];
    };
    /**
     * Get the main content div element of spreadsheet
     * @return {Element}
     */
    SheetRender.prototype.getContentPanel = function () {
        return this.contentPanel.getElementsByClassName('e-main-content')[0];
    };
    return SheetRender;
}());
export { SheetRender };
