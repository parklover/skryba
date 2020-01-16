import { initialLoad, ribbon, formulaBar, beforeVirtualContentLoaded, getSiblingsHeight, setAriaOptions } from '../common/index';
import { SheetRender, RowRenderer, CellRenderer } from './index';
import { remove } from '@syncfusion/ej2-base';
import { getSheetName, getRowsHeight, getColumnsWidth } from '../../workbook/base/index';
import { getCellAddress, getCellIndexes } from '../../workbook/common/index';
import { dataRefresh, sheetTabs, onContentScroll, deInitProperties, beforeDataBound } from '../common/index';
import { spreadsheetDestroyed } from '../common/index';
/**
 * Render module is used to render the spreadsheet

 */
var Render = /** @class */ (function () {
    function Render(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Render.prototype.render = function () {
        if (!this.parent.isMobileView()) {
            this.parent.notify(ribbon, null);
            this.parent.notify(formulaBar, null);
        }
        var sheetPanel = this.parent.createElement('div', {
            id: this.parent.element.id + '_sheet_panel', className: 'e-sheet-panel'
        });
        if (this.parent.enableRtl) {
            sheetPanel.classList.add('e-rtl');
        }
        this.parent.element.appendChild(sheetPanel);
        this.parent.notify(sheetTabs, null);
        if (this.parent.isMobileView()) {
            this.parent.notify(formulaBar, null);
            this.parent.notify(ribbon, null);
        }
        this.setSheetPanelSize();
        this.renderSheet(sheetPanel);
        this.checkTopLeftCell();
    };
    Render.prototype.checkTopLeftCell = function () {
        var sheet = this.parent.getActiveSheet();
        if (!this.parent.scrollSettings.enableVirtualization || sheet.topLeftCell === 'A1') {
            this.refreshUI();
        }
        else {
            var indexes = getCellIndexes(sheet.topLeftCell);
            var top_1 = indexes[0] ? getRowsHeight(sheet, 0, indexes[0] - 1) : 0;
            var left = indexes[1] ? getColumnsWidth(sheet, 0, indexes[1] - 1) : 0;
            this.parent.notify(onContentScroll, { scrollLeft: left, scrollTop: top_1, preventScroll: true });
            var threshold = this.parent.getThreshold('row');
            var rowIndex = indexes[0] > threshold ? indexes[0] - threshold : 0;
            threshold = this.parent.getThreshold('col');
            var colIndex = indexes[1] > threshold ? indexes[1] - threshold : 0;
            this.refreshUI({ rowIndex: rowIndex, colIndex: colIndex, refresh: 'All', top: top_1, left: left });
        }
    };
    Render.prototype.renderSheet = function (panel) {
        if (panel === void 0) { panel = document.getElementById(this.parent.element.id + '_sheet_panel'); }
        panel.appendChild(this.parent.createElement('div', { className: 'e-sheet', id: this.parent.element.id + '_sheet' }));
        this.parent.serviceLocator.getService('sheet').renderPanel();
    };
    Render.prototype.refreshUI = function (args, address) {
        if (args === void 0) { args = { rowIndex: 0, colIndex: 0, refresh: 'All' }; }
        var sheetModule = this.parent.serviceLocator.getService('sheet');
        var sheet = this.parent.getActiveSheet();
        var sheetName = getSheetName(this.parent);
        this.parent.showSpinner();
        if (!address) {
            if (this.parent.scrollSettings.enableVirtualization) {
                var lastRowIdx = args.rowIndex + this.parent.viewport.rowCount + (this.parent.getThreshold('row') * 2);
                var count = sheet.rowCount - 1;
                if (this.parent.scrollSettings.isFinite && lastRowIdx > count) {
                    lastRowIdx = count;
                }
                var lastColIdx = args.colIndex + this.parent.viewport.colCount + (this.parent.getThreshold('col') * 2);
                count = sheet.colCount - 1;
                if (this.parent.scrollSettings.isFinite && lastColIdx > count) {
                    lastColIdx = count;
                }
                var indexes = this.parent.skipHiddenRows(args.rowIndex, lastRowIdx);
                var startRow = args.rowIndex;
                if (args.rowIndex !== indexes[0]) {
                    var topLeftCell = getCellIndexes(sheet.topLeftCell);
                    if (topLeftCell[0] === args.rowIndex) {
                        sheet.topLeftCell = getCellAddress(indexes[0], topLeftCell[1]);
                        this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
                    }
                    args.rowIndex = indexes[0];
                }
                lastRowIdx = indexes[1];
                this.parent.viewport.topIndex = args.rowIndex;
                this.parent.viewport.bottomIndex = lastRowIdx;
                address = getCellAddress(startRow, args.colIndex) + ":" + getCellAddress(lastRowIdx, lastColIdx);
            }
            else {
                address = "A1:" + getCellAddress(sheet.rowCount - 1, sheet.colCount - 1);
            }
        }
        if (args.refresh === 'All') {
            this.parent.trigger(beforeDataBound, {});
        }
        setAriaOptions(this.parent.getMainContent(), { busy: true });
        this.parent.getData(sheetName + "!" + address).then(function (values) {
            var lastCellIdx = getCellIndexes(address.split(':')[1])[1];
            switch (args.refresh) {
                case 'All':
                    sheetModule.renderTable(values, args.rowIndex, args.colIndex, lastCellIdx, args.top, args.left);
                    break;
                case 'Row':
                    sheetModule.refreshRowContent(values, args.colIndex, lastCellIdx);
                    break;
                case 'Column':
                    sheetModule.refreshColumnContent(values, args.rowIndex, args.colIndex, lastCellIdx);
                    break;
                case 'RowPart':
                    sheetModule.updateRowContent(values, args.colIndex, lastCellIdx, args.direction);
                    break;
                case 'ColumnPart':
                    sheetModule.updateColContent(values, args.rowIndex, args.colIndex, lastCellIdx, args.direction);
                    break;
            }
        });
        this.parent.notify(beforeVirtualContentLoaded, { refresh: args.refresh });
    };
    Render.prototype.removeSheet = function () {
        remove(document.getElementById(this.parent.element.id + '_sheet'));
    };
    /**
     * Refresh the active sheet
     */
    Render.prototype.refreshSheet = function () {
        this.removeSheet();
        this.renderSheet();
        this.parent.notify(deInitProperties, {});
        this.checkTopLeftCell();
    };
    /**
     * Used to set sheet panel size.
     */
    Render.prototype.setSheetPanelSize = function () {
        var panel = document.getElementById(this.parent.element.id + '_sheet_panel');
        var offset = this.parent.element.getBoundingClientRect();
        var height;
        if (this.parent.height === 'auto') {
            panel.style.height = '260px';
            height = 230;
        }
        else {
            height = offset.height - getSiblingsHeight(panel);
            panel.style.height = height + "px";
            height -= 30;
        }
        this.parent.viewport.height = height;
        this.parent.viewport.width = offset.width;
        this.parent.viewport.rowCount = this.roundValue(height, 20);
        this.parent.viewport.colCount = this.roundValue(offset.width, 64);
    };
    Render.prototype.roundValue = function (size, threshold) {
        var value = size / threshold;
        var roundedValue = Math.round(value);
        return Math.abs(value - roundedValue) < 0.5 ? roundedValue : roundedValue - 1;
    };
    /**
     * Registing the renderer related services.
     */
    Render.prototype.instantiateRenderer = function () {
        this.parent.serviceLocator.register('cell', new CellRenderer(this.parent));
        this.parent.serviceLocator.register('row', new RowRenderer(this.parent));
        this.parent.serviceLocator.register('sheet', new SheetRender(this.parent));
    };
    /**
     * Destroy the Render module.
     * @return {void}
     */
    Render.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Render.prototype.addEventListener = function () {
        this.parent.on(initialLoad, this.instantiateRenderer, this);
        this.parent.on(dataRefresh, this.refreshSheet, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    Render.prototype.removeEventListener = function () {
        this.parent.off(initialLoad, this.instantiateRenderer);
        this.parent.off(dataRefresh, this.refreshSheet);
        this.parent.off(spreadsheetDestroyed, this.destroy);
    };
    return Render;
}());
export { Render };
