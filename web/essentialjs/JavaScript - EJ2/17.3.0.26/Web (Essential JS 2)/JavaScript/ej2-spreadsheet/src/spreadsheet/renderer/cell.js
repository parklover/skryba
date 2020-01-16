import { inView } from '../common/index';
import { getColumnHeaderText, getCellAddress } from '../../workbook/common/index';
import { getCell, skipDefaultValue } from '../../workbook/base/index';
import { addClass, attributes, getNumberDependable, extend } from '@syncfusion/ej2-base';
import { getFormattedCellObject, applyCellFormat, workbookFormulaOperation, setCellFormat } from '../../workbook/common/event';
import { getTypeFromFormat } from '../../workbook/index';
import { checkIsFormula } from '../../workbook/common/util';
/**
 * CellRenderer class which responsible for building cell content.

 */
var CellRenderer = /** @class */ (function () {
    function CellRenderer(parent) {
        this.parent = parent;
        this.element = this.parent.createElement('td');
        this.th = this.parent.createElement('th', { className: 'e-header-cell' });
    }
    CellRenderer.prototype.renderColHeader = function (index) {
        var headerCell = this.th.cloneNode();
        attributes(headerCell, { 'role': 'columnheader', 'aria-colindex': (index + 1).toString(), 'tabindex': '-1' });
        headerCell.innerHTML = getColumnHeaderText(index + 1);
        return headerCell;
    };
    CellRenderer.prototype.renderRowHeader = function (index) {
        var headerCell = this.element.cloneNode();
        addClass([headerCell], 'e-header-cell');
        attributes(headerCell, { 'role': 'rowheader', 'tabindex': '-1' });
        headerCell.innerHTML = (index + 1).toString();
        return headerCell;
    };
    CellRenderer.prototype.render = function (args) {
        var td = this.element.cloneNode();
        td.className = 'e-cell';
        attributes(td, { 'role': 'gridcell', 'aria-colindex': (args.colIdx + 1).toString(), 'tabindex': '-1' });
        this.updateCell(args.rowIdx, args.colIdx, td, args.cell, args.lastCell, args.row, args.hRow, args.isHeightCheckNeeded);
        this.parent.trigger('beforeCellRender', { cell: args.cell, element: td, address: args.address });
        return td;
    };
    CellRenderer.prototype.updateCell = function (rowIdx, colIdx, td, cell, lastCell, row, hRow, isHeightCheckNeeded, isRefresh) {
        if (cell && cell.formula && !cell.value) {
            var isFormula = checkIsFormula(cell.formula);
            var eventArgs = {
                action: 'refreshCalculate',
                value: cell.formula,
                rowIndex: rowIdx,
                colIndex: colIdx,
                isFormula: isFormula
            };
            this.parent.notify(workbookFormulaOperation, eventArgs);
        }
        var formatArgs = {
            type: cell && getTypeFromFormat(cell.format),
            value: cell && cell.value, format: cell && cell.format ? cell.format : 'General',
            formattedText: cell && cell.value, onLoad: true, isRightAlign: false, cell: cell
        };
        if (cell) {
            this.parent.notify(getFormattedCellObject, formatArgs);
        }
        td.textContent = td ? formatArgs.formattedText : '';
        this.parent.refreshNode(td, {
            type: formatArgs.type,
            result: formatArgs.formattedText,
            curSymbol: getNumberDependable(this.parent.locale, 'USD'),
            isRightAlign: formatArgs.isRightAlign,
            value: formatArgs.value || ''
        });
        var style = {};
        if (cell && cell.style) {
            if (cell.style.properties) {
                style = skipDefaultValue(cell.style, true);
            }
            else {
                style = cell.style;
            }
        }
        if (Object.keys(style).length || Object.keys(this.parent.commonCellStyle).length || lastCell) {
            if (isRefresh) {
                this.removeStyle(td);
                this.parent.notify(setCellFormat, { style: style, range: getCellAddress(rowIdx, colIdx) });
            }
            else {
                this.parent.notify(applyCellFormat, {
                    style: extend({}, this.parent.commonCellStyle, style), rowIdx: rowIdx, colIdx: colIdx, cell: td,
                    lastCell: lastCell, row: row, hRow: hRow, isHeightCheckNeeded: isHeightCheckNeeded, manualUpdate: false
                });
            }
        }
        else {
            if (isRefresh) {
                this.removeStyle(td);
            }
        }
    };
    CellRenderer.prototype.removeStyle = function (element) {
        if (element.style.length) {
            element.removeAttribute('style');
        }
    };
    CellRenderer.prototype.refreshRange = function (range) {
        var sheet = this.parent.getActiveSheet();
        var cRange = range.slice();
        if (inView(this.parent, cRange, true)) {
            for (var i = cRange[0]; i <= cRange[2]; i++) {
                for (var j = cRange[1]; j <= cRange[3]; j++) {
                    this.updateCell(i, j, this.parent.getCell(i, j), getCell(i, j, sheet), false, null, null, true, true);
                }
            }
        }
    };
    return CellRenderer;
}());
export { CellRenderer };
