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
import { Column } from '../models/column';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { calculateAggregate, getUid } from '../base/util';
import { CellType } from '../base/enum';
import { Cell } from '../models/cell';
/**
 * Summary row model generator

 */
var SummaryModelGenerator = /** @class */ (function () {
    /**
     * Constructor for Summary row model generator
     */
    function SummaryModelGenerator(parent) {
        this.parent = parent;
    }
    SummaryModelGenerator.prototype.getData = function () {
        var _this = this;
        var rows = [];
        this.parent.aggregates.slice().forEach(function (row) {
            var columns = row.columns.filter(function (column) {
                return !(column.footerTemplate || column.groupFooterTemplate || column.groupCaptionTemplate)
                    || _this.columnSelector(column);
            });
            if (columns.length) {
                rows.push({ columns: columns });
            }
        });
        return rows;
    };
    SummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.footerTemplate !== undefined;
    };
    SummaryModelGenerator.prototype.getColumns = function (start, end) {
        var columns = [];
        if (this.parent.allowGrouping) {
            this.parent.groupSettings.columns.forEach(function (value) { return columns.push(new Column({})); });
        }
        if (this.parent.detailTemplate || !isNullOrUndefined(this.parent.childGrid) || this.parent.isRowDragable()) {
            columns.push(new Column({}));
        }
        columns.push.apply(columns, this.parent.getColumns());
        return isNullOrUndefined(start) ? columns : columns.slice(start, end);
    };
    SummaryModelGenerator.prototype.generateRows = function (input, args, start, end) {
        var _this = this;
        if (this.parent.currentViewData.length === 0) {
            return [];
        }
        var data = this.buildSummaryData(input, args);
        var rows = [];
        this.getData().forEach(function (row, index) {
            rows.push(_this.getGeneratedRow(row, data[index], args ? args.level : undefined, start, end));
        });
        return rows;
    };
    SummaryModelGenerator.prototype.getGeneratedRow = function (summaryRow, data, raw, start, end) {
        var _this = this;
        var tmp = [];
        var indents = this.getIndentByLevel(raw);
        var isDetailGridAlone = !isNullOrUndefined(this.parent.childGrid);
        var indentLength = this.parent.groupSettings.columns.length + (this.parent.detailTemplate ||
            !isNullOrUndefined(this.parent.childGrid) ? 1 : 0);
        if (this.parent.isRowDragable()) {
            indentLength++;
            indents = ['e-indentcelltop'];
        }
        this.getColumns(start, end).forEach(function (value, index) { return tmp.push(_this.getGeneratedCell(value, summaryRow, index >= indentLength ? _this.getCellType() :
            index < _this.parent.groupSettings.columns.length ? CellType.Indent : CellType.DetailFooterIntent, indents[index], isDetailGridAlone)); });
        var row = new Row({ data: data, attributes: { class: 'e-summaryrow' } });
        row.cells = tmp;
        row.uid = getUid('grid-row');
        row.visible = tmp.some(function (cell) { return cell.isDataCell && cell.visible; });
        return row;
    };
    SummaryModelGenerator.prototype.getGeneratedCell = function (column, summaryRow, cellType, indent, isDetailGridAlone) {
        //Get the summary column by display
        var sColumn = summaryRow.columns.filter(function (scolumn) { return scolumn.columnName === column.field; })[0];
        var attrs = {
            'style': { 'textAlign': column.textAlign },
            'e-mappinguid': column.uid, index: column.index
        };
        if (indent) {
            attrs.class = indent;
        }
        if (isNullOrUndefined(indent) && isDetailGridAlone) {
            attrs.class = 'e-detailindentcelltop';
        }
        var opt = {
            'visible': column.visible,
            'isDataCell': !isNullOrUndefined(sColumn),
            'isTemplate': sColumn && !isNullOrUndefined(sColumn.footerTemplate
                || sColumn.groupFooterTemplate || sColumn.groupCaptionTemplate),
            'column': sColumn || {},
            'attributes': attrs,
            'cellType': cellType
        };
        return new Cell(opt);
    };
    SummaryModelGenerator.prototype.buildSummaryData = function (data, args) {
        var _this = this;
        var dummy = [];
        var summaryRows = this.getData();
        var single = {};
        var key = '';
        summaryRows.forEach(function (row) {
            single = {};
            row.columns.forEach(function (column) {
                single = _this.setTemplate(column, (args && args.aggregates) ? args : data, single);
            });
            dummy.push(single);
        });
        return dummy;
    };
    SummaryModelGenerator.prototype.getIndentByLevel = function (data) {
        return this.parent.groupSettings.columns.map(function () { return 'e-indentcelltop'; });
    };
    SummaryModelGenerator.prototype.setTemplate = function (column, data, single) {
        var _this = this;
        var types = column.type;
        var helper = {};
        var formatFn = column.getFormatter() || (function () { return function (a) { return a; }; })();
        var group = data;
        if (!(types instanceof Array)) {
            types = [column.type];
        }
        types.forEach(function (type) {
            var key = column.field + ' - ' + type.toLowerCase();
            var disp = column.columnName;
            var val = type !== 'Custom' && group.aggregates && key in group.aggregates ? group.aggregates[key] :
                calculateAggregate(type, group.aggregates ? group : data, column, _this.parent);
            single[disp] = single[disp] || {};
            single[disp][key] = val;
            single[disp][type] = !isNullOrUndefined(val) ? formatFn(val) : ' ';
            if (group.field) {
                single[disp].field = group.field;
                single[disp].key = group.key;
            }
        });
        helper.format = column.getFormatter();
        column.setTemplate(helper);
        return single;
    };
    SummaryModelGenerator.prototype.getCellType = function () {
        return CellType.Summary;
    };
    return SummaryModelGenerator;
}());
export { SummaryModelGenerator };
var GroupSummaryModelGenerator = /** @class */ (function (_super) {
    __extends(GroupSummaryModelGenerator, _super);
    function GroupSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupFooterTemplate !== undefined;
    };
    GroupSummaryModelGenerator.prototype.getIndentByLevel = function (level) {
        if (level === void 0) { level = this.parent.groupSettings.columns.length; }
        return this.parent.groupSettings.columns.map(function (v, indx) { return indx <= level - 1 ? '' : 'e-indentcelltop'; });
    };
    GroupSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.GroupSummary;
    };
    return GroupSummaryModelGenerator;
}(SummaryModelGenerator));
export { GroupSummaryModelGenerator };
var CaptionSummaryModelGenerator = /** @class */ (function (_super) {
    __extends(CaptionSummaryModelGenerator, _super);
    function CaptionSummaryModelGenerator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaptionSummaryModelGenerator.prototype.columnSelector = function (column) {
        return column.groupCaptionTemplate !== undefined;
    };
    CaptionSummaryModelGenerator.prototype.getData = function () {
        var initVal = { columns: [] };
        return [_super.prototype.getData.call(this).reduce(function (prev, cur) {
                prev.columns = prev.columns.concat(cur.columns);
                return prev;
            }, initVal)];
    };
    CaptionSummaryModelGenerator.prototype.isEmpty = function () {
        return (this.getData()[0].columns || []).length === 0;
    };
    CaptionSummaryModelGenerator.prototype.getCellType = function () {
        return CellType.CaptionSummary;
    };
    return CaptionSummaryModelGenerator;
}(SummaryModelGenerator));
export { CaptionSummaryModelGenerator };
