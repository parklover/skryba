var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Row } from '../models/row';
import { isNullOrUndefined, extend, setValue } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { RowModelGenerator } from '../services/row-model-generator';
import { GroupSummaryModelGenerator, CaptionSummaryModelGenerator } from '../services/summary-model-generator';
import { getForeignData, getUid } from '../../grid/base/util';
/**
 * GroupModelGenerator is used to generate group caption rows and data rows.

 */
var GroupModelGenerator = /** @class */ (function (_super) {
    __extends(GroupModelGenerator, _super);
    function GroupModelGenerator(parent) {
        var _this = _super.call(this, parent) || this;
        _this.rows = [];
        _this.index = 0;
        _this.parent = parent;
        _this.summaryModelGen = new GroupSummaryModelGenerator(parent);
        _this.captionModelGen = new CaptionSummaryModelGenerator(parent);
        return _this;
    }
    GroupModelGenerator.prototype.generateRows = function (data, args) {
        if (this.parent.groupSettings.columns.length === 0) {
            return _super.prototype.generateRows.call(this, data, args);
        }
        this.rows = [];
        this.index = this.parent.enableVirtualization ? args.startIndex : 0;
        for (var i = 0, len = data.length; i < len; i++) {
            this.getGroupedRecords(0, data[i], data.level, i, undefined, this.rows.length);
        }
        this.index = 0;
        return this.rows;
    };
    GroupModelGenerator.prototype.getGroupedRecords = function (index, data, raw, parentid, childId, tIndex) {
        var _a;
        var level = raw;
        if (isNullOrUndefined(data.items)) {
            if (isNullOrUndefined(data.GroupGuid)) {
                this.rows = this.rows.concat(this.generateDataRows(data, index, parentid, this.rows.length));
            }
            else {
                for (var j = 0, len = data.length; j < len; j++) {
                    this.getGroupedRecords(index, data[j], data.level, parentid, index, this.rows.length);
                }
            }
        }
        else {
            this.rows = this.rows.concat(this.generateCaptionRow(data, index, parentid, childId, tIndex));
            if (data.items && data.items.length) {
                this.getGroupedRecords(index + 1, data.items, data.items.level, parentid, index + 1, this.rows.length);
            }
            if (this.parent.aggregates.length) {
                var rowCnt = this.rows.length;
                (_a = this.rows).push.apply(_a, this.summaryModelGen.generateRows(data, { level: level }));
                for (var i = rowCnt - 1; i >= 0; i--) {
                    if (this.rows[i].isCaptionRow) {
                        this.rows[i].aggregatesCount = this.rows.length - rowCnt;
                    }
                    else if (!this.rows[i].isCaptionRow && !this.rows[i].isDataRow) {
                        break;
                    }
                }
            }
        }
    };
    GroupModelGenerator.prototype.getCaptionRowCells = function (field, indent, data) {
        var _this = this;
        var cells = [];
        var visibles = [];
        var column = this.parent.getColumnByField(field);
        var indexes = this.parent.getColumnIndexesInView();
        if (this.parent.enableColumnVirtualization) {
            column = this.parent.columns.filter(function (c) { return c.field === field; })[0];
        }
        var groupedLen = this.parent.groupSettings.columns.length;
        var gObj = this.parent;
        if (!this.parent.enableColumnVirtualization || indexes.indexOf(indent) !== -1) {
            for (var i = 0; i < indent; i++) {
                cells.push(this.generateIndentCell());
            }
            cells.push(this.generateCell({}, null, CellType.Expand));
        }
        indent = this.parent.enableColumnVirtualization ? 1 :
            (this.parent.getVisibleColumns().length + groupedLen + (gObj.detailTemplate || gObj.childGrid ? 1 : 0) -
                indent + (this.parent.getVisibleColumns().length ? -1 : 0));
        //Captionsummary cells will be added here.    
        if (this.parent.aggregates.length && !this.captionModelGen.isEmpty()) {
            var captionCells = this.captionModelGen.generateRows(data)[0];
            extend(data, captionCells.data);
            var cIndex_1 = 0;
            captionCells.cells.some(function (cell, index) { cIndex_1 = index; return cell.visible && cell.isDataCell; });
            visibles = captionCells.cells.slice(cIndex_1).filter(function (cell) { return cell.visible; });
            if (captionCells.visible && visibles[0].column.field === this.parent.getVisibleColumns()[0].field) {
                visibles = visibles.slice(1);
            }
            if (this.parent.getVisibleColumns().length === 1) {
                visibles = [];
            }
            indent = indent - visibles.length;
        }
        var cols = (!this.parent.enableColumnVirtualization ? [column] : this.parent.getColumns());
        var wFlag = true;
        cols.forEach(function (col, index) {
            var tmpFlag = wFlag && indexes.indexOf(indent) !== -1;
            if (tmpFlag) {
                wFlag = false;
            }
            var cellType = !_this.parent.enableColumnVirtualization || tmpFlag ?
                CellType.GroupCaption : CellType.GroupCaptionEmpty;
            indent = _this.parent.enableColumnVirtualization && cellType === CellType.GroupCaption ? indent + groupedLen : indent;
            if (gObj.isRowDragable()) {
                indent++;
            }
            cells.push(_this.generateCell(column, null, cellType, indent));
        });
        cells.push.apply(cells, visibles);
        return cells;
    };
    GroupModelGenerator.prototype.generateCaptionRow = function (data, indent, parentID, childID, tIndex) {
        var options = {};
        var tmp = [];
        var records = 'records';
        var col = this.parent.getColumnByField(data.field);
        options.data = extend({}, data);
        if (col) {
            options.data.field = data.field;
        }
        options.isDataRow = false;
        options.isExpand = true;
        options.parentGid = parentID;
        options.childGid = childID;
        options.tIndex = tIndex;
        options.isCaptionRow = true;
        options.gSummary = !isNullOrUndefined(data.items[records]) ? data.items[records].length : data.items.length;
        options.uid = getUid('grid-row');
        var row = new Row(options);
        row.indent = indent;
        this.getForeignKeyData(row);
        row.cells = this.getCaptionRowCells(data.field, indent, row.data);
        return row;
    };
    GroupModelGenerator.prototype.getForeignKeyData = function (row) {
        var data = row.data;
        var col = this.parent.getColumnByField(data.field);
        if (col && col.isForeignColumn && col.isForeignColumn()) {
            var fkValue = (isNullOrUndefined(data.key) ? '' : col.valueAccessor(col.foreignKeyValue, getForeignData(col, {}, data.key)[0], col));
            setValue('foreignKey', fkValue, row.data);
        }
    };
    GroupModelGenerator.prototype.generateDataRows = function (data, indent, childID, tIndex) {
        var rows = [];
        var indexes = this.parent.getColumnIndexesInView();
        for (var i = 0, len = data.length; i < len; i++, tIndex++) {
            rows[i] = this.generateRow(data[i], this.index, i ? undefined : 'e-firstchildrow', indent, childID, tIndex);
            for (var j = 0; j < indent; j++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(indent) === -1) {
                    continue;
                }
                rows[i].cells.unshift(this.generateIndentCell());
            }
            this.index++;
        }
        return rows;
    };
    GroupModelGenerator.prototype.generateIndentCell = function () {
        return this.generateCell({}, null, CellType.Indent);
    };
    GroupModelGenerator.prototype.refreshRows = function (input) {
        var _this = this;
        var indexes = this.parent.getColumnIndexesInView();
        input.forEach(function (row) {
            if (row.isDataRow) {
                row.cells = _this.generateCells(row);
                for (var j = 0; j < row.indent; j++) {
                    if (_this.parent.enableColumnVirtualization && indexes.indexOf(row.indent) === -1) {
                        continue;
                    }
                    row.cells.unshift(_this.generateIndentCell());
                }
            }
            else {
                var cRow = _this.generateCaptionRow(row.data, row.indent);
                row.cells = cRow.cells;
            }
        });
        return input;
    };
    return GroupModelGenerator;
}(RowModelGenerator));
export { GroupModelGenerator };
