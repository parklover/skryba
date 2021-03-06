import { isNullOrUndefined, getValue, setValue } from '@syncfusion/ej2-base';
import { Row } from '../models/row';
import { CellType } from '../base/enum';
import { Cell } from '../models/cell';
import { getUid } from '../base/util';
import { getForeignData } from '../../grid/base/util';
/**
 * RowModelGenerator is used to generate grid data rows.

 */
var RowModelGenerator = /** @class */ (function () {
    /**
     * Constructor for header renderer module
     */
    function RowModelGenerator(parent) {
        this.parent = parent;
    }
    RowModelGenerator.prototype.generateRows = function (data, args) {
        var rows = [];
        var startIndex = this.parent.enableVirtualization ? args.startIndex : 0;
        for (var i = 0, len = Object.keys(data).length; i < len; i++, startIndex++) {
            rows[i] = this.generateRow(data[i], startIndex);
        }
        return rows;
    };
    RowModelGenerator.prototype.ensureColumns = function () {
        //TODO: generate dummy column for group, detail here;
        var cols = [];
        if (this.parent.detailTemplate || this.parent.childGrid) {
            cols.push(this.generateCell({}, null, CellType.DetailExpand));
        }
        if (this.parent.isRowDragable()) {
            cols.push(this.generateCell({}, null, CellType.RowDragIcon));
        }
        return cols;
    };
    RowModelGenerator.prototype.generateRow = function (data, index, cssClass, indent, pid, tIndex) {
        var options = {};
        options.foreignKeyData = {};
        options.uid = getUid('grid-row');
        options.data = data;
        options.index = index;
        options.indent = indent;
        options.tIndex = tIndex;
        options.isDataRow = true;
        options.parentGid = pid;
        if (this.parent.isPrinting) {
            if (this.parent.hierarchyPrintMode === 'All') {
                options.isExpand = true;
            }
            else if (this.parent.hierarchyPrintMode === 'Expanded' && this.parent.expandedRows && this.parent.expandedRows[index]) {
                options.isExpand = this.parent.expandedRows[index].isExpand;
            }
        }
        options.cssClass = cssClass;
        options.isAltRow = this.parent.enableAltRow ? index % 2 !== 0 : false;
        options.isSelected = this.parent.getSelectedRowIndexes().indexOf(index) > -1;
        this.refreshForeignKeyRow(options);
        var cells = this.ensureColumns();
        var row = new Row(options);
        row.cells = cells.concat(this.generateCells(options));
        return row;
    };
    RowModelGenerator.prototype.refreshForeignKeyRow = function (options) {
        this.parent.getForeignKeyColumns().forEach(function (col) {
            setValue(col.field, getForeignData(col, options.data), options.foreignKeyData);
        });
    };
    RowModelGenerator.prototype.generateCells = function (options) {
        var _this = this;
        var dummies = this.parent.getColumns();
        var tmp = [];
        dummies.forEach(function (dummy, index) {
            return tmp.push(_this.generateCell(dummy, options.uid, isNullOrUndefined(dummy.commands) ? undefined : CellType.CommandColumn, null, index, options.foreignKeyData));
        });
        return tmp;
    };
    RowModelGenerator.prototype.generateCell = function (column, rowId, cellType, colSpan, oIndex, foreignKeyData) {
        var opt = {
            'visible': column.visible,
            'isDataCell': !isNullOrUndefined(column.field || column.template),
            'isTemplate': !isNullOrUndefined(column.template),
            'rowID': rowId,
            'column': column,
            'cellType': !isNullOrUndefined(cellType) ? cellType : CellType.Data,
            'colSpan': colSpan,
            'commands': column.commands,
            'isForeignKey': column.isForeignColumn && column.isForeignColumn(),
            'foreignKeyData': column.isForeignColumn && column.isForeignColumn() && getValue(column.field, foreignKeyData)
        };
        if (opt.isDataCell || opt.column.type === 'checkbox') {
            opt.index = oIndex;
        }
        return new Cell(opt);
    };
    RowModelGenerator.prototype.refreshRows = function (input) {
        var _this = this;
        input.forEach(function (row) {
            _this.refreshForeignKeyRow(row);
            row.cells = _this.generateCells(row);
        });
        return input;
    };
    return RowModelGenerator;
}());
export { RowModelGenerator };
