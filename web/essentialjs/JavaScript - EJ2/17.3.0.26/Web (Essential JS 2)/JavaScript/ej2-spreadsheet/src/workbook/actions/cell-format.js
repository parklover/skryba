import { getRangeIndexes, setCellFormat, applyCellFormat, activeCellChanged } from '../common/index';
import { getSwapRange, textDecorationUpdate } from '../common/index';
import { setCell } from '../base/index';
/**
 * Workbook Cell format.
 */
var WorkbookCellFormat = /** @class */ (function () {
    function WorkbookCellFormat(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    WorkbookCellFormat.prototype.format = function (args) {
        var sheet = this.parent.getActiveSheet();
        var eventArgs;
        if (args.range === undefined) {
            args.range = sheet.selectedRange;
        }
        var triggerEvent = typeof (args.range) !== 'object' && args.onActionUpdate;
        eventArgs = { range: args.range, style: args.style, requestType: 'CellFormat' };
        if (triggerEvent) {
            this.parent.trigger('beforeCellFormat', eventArgs);
            if (eventArgs.cancel) {
                args.cancel = true;
                return;
            }
        }
        var indexes = typeof (eventArgs.range) === 'object' ? eventArgs.range :
            getSwapRange(getRangeIndexes(eventArgs.range));
        for (var i = indexes[0]; i <= indexes[2]; i++) {
            for (var j = indexes[1]; j <= indexes[3]; j++) {
                setCell(i, j, sheet, { style: eventArgs.style }, true);
                this.parent.notify(applyCellFormat, {
                    style: eventArgs.style, rowIdx: i, colIdx: j, lastCell: j === indexes[3], isHeightCheckNeeded: true, manualUpdate: true,
                    onActionUpdate: args.onActionUpdate
                });
            }
        }
        this.parent.setUsedRange(indexes[2], indexes[3]);
        if (args.refreshRibbon) {
            this.parent.notify(activeCellChanged, getRangeIndexes(sheet.activeCell));
        }
        this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
        if (triggerEvent) {
            this.parent.trigger('actionComplete', { action: 'cellFormat', eventArgs: eventArgs });
        }
    };
    WorkbookCellFormat.prototype.textDecorationActionUpdate = function (args) {
        var sheet = this.parent.getActiveSheet();
        var eventArgs = { range: sheet.selectedRange, style: args.style, requestType: 'CellFormat' };
        this.parent.trigger('beforeCellFormat', eventArgs);
        if (eventArgs.cancel) {
            args.cancel = true;
            return;
        }
        var indexes = getSwapRange(getRangeIndexes(sheet.selectedRange));
        var value = args.style.textDecoration;
        var changedValue = value;
        var activeCellIndexes = getRangeIndexes(sheet.activeCell);
        var cellValue = this.parent.getCellStyleValue(['textDecoration'], activeCellIndexes).textDecoration;
        var changedStyle;
        var removeProp = false;
        if (cellValue === 'underline') {
            changedValue = value === 'underline' ? 'none' : 'underline line-through';
        }
        else if (cellValue === 'line-through') {
            changedValue = value === 'line-through' ? 'none' : 'underline line-through';
        }
        else if (cellValue === 'underline line-through') {
            changedValue = value === 'underline' ? 'line-through' : 'underline';
            removeProp = true;
        }
        if (changedValue === 'none') {
            removeProp = true;
        }
        this.format({ style: { textDecoration: changedValue }, range: activeCellIndexes, refreshRibbon: args.refreshRibbon,
            onActionUpdate: true });
        for (var i = indexes[0]; i <= indexes[2]; i++) {
            for (var j = indexes[1]; j <= indexes[3]; j++) {
                if (i === activeCellIndexes[0] && j === activeCellIndexes[1]) {
                    continue;
                }
                changedStyle = {};
                cellValue = this.parent.getCellStyleValue(['textDecoration'], [i, j]).textDecoration;
                if (cellValue === 'none') {
                    if (removeProp) {
                        continue;
                    }
                    changedStyle.textDecoration = value;
                }
                else if (cellValue === 'underline' || cellValue === 'line-through') {
                    if (removeProp) {
                        if (value === cellValue) {
                            changedStyle.textDecoration = 'none';
                        }
                        else {
                            continue;
                        }
                    }
                    else {
                        changedStyle.textDecoration = value !== cellValue ? 'underline line-through' : value;
                    }
                }
                else if (cellValue === 'underline line-through') {
                    if (removeProp) {
                        changedStyle.textDecoration = value === 'underline' ? 'line-through' : 'underline';
                    }
                    else {
                        continue;
                    }
                }
                this.format({ style: changedStyle, range: [i, j, i, j], refreshRibbon: args.refreshRibbon,
                    onActionUpdate: true });
            }
        }
        this.parent.trigger('actionComplete', { action: 'cellFormat', eventArgs: eventArgs });
    };
    WorkbookCellFormat.prototype.addEventListener = function () {
        this.parent.on(setCellFormat, this.format, this);
        this.parent.on(textDecorationUpdate, this.textDecorationActionUpdate, this);
    };
    WorkbookCellFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setCellFormat, this.format);
            this.parent.off(textDecorationUpdate, this.textDecorationActionUpdate);
        }
    };
    /**
     * To destroy workbook cell format.
     */
    WorkbookCellFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the workbook cell format module name.
     */
    WorkbookCellFormat.prototype.getModuleName = function () {
        return 'workbookcellformat';
    };
    return WorkbookCellFormat;
}());
export { WorkbookCellFormat };
