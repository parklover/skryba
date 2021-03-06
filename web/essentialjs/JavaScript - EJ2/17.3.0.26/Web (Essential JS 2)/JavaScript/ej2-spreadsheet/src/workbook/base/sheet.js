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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Row } from './row';
import { Column } from './column';
import { Property, Collection, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { processIdx } from './data';
/**
 * Configures the Range settings for the spreadsheet.
 *  ```html
 * <div id='Spreadsheet'></div>
 * ```
 * ```typescript
 * let spreadsheet: Spreadsheet = new Spreadsheet({
 *      sheets: [{
 *                  name: 'First Sheet',
 *                  rangeSettings: [{ dataSource: defaultData }],
 *                  rows: [{
 *                          index: 30,
 *                          cells: [{ index: 4, value: 'Total Amount:' },
 *                                  { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
 *                  }]
 * ...
 * });
 * spreadsheet.appendTo('#Spreadsheet');
 * ```
 */
var RangeSetting = /** @class */ (function (_super) {
    __extends(RangeSetting, _super);
    function RangeSetting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], RangeSetting.prototype, "dataSource", void 0);
    __decorate([
        Property('A1')
    ], RangeSetting.prototype, "startCell", void 0);
    __decorate([
        Property(null)
    ], RangeSetting.prototype, "query", void 0);
    __decorate([
        Property(true)
    ], RangeSetting.prototype, "showFieldAsHeader", void 0);
    return RangeSetting;
}(ChildProperty));
export { RangeSetting };
/**
 * Used range which contains end row index and end column index of the last used cell in sheet .
 */
var UsedRange = /** @class */ (function (_super) {
    __extends(UsedRange, _super);
    function UsedRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], UsedRange.prototype, "rowIndex", void 0);
    __decorate([
        Property(0)
    ], UsedRange.prototype, "colIndex", void 0);
    return UsedRange;
}(ChildProperty));
export { UsedRange };
/**
 * Configures the sheet behavior for the spreadsheet.
 */
var Sheet = /** @class */ (function (_super) {
    __extends(Sheet, _super);
    function Sheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], Sheet.prototype, "id", void 0);
    __decorate([
        Collection([], Row)
    ], Sheet.prototype, "rows", void 0);
    __decorate([
        Collection([], Column)
    ], Sheet.prototype, "columns", void 0);
    __decorate([
        Collection([], RangeSetting)
    ], Sheet.prototype, "rangeSettings", void 0);
    __decorate([
        Property(0)
    ], Sheet.prototype, "index", void 0);
    __decorate([
        Property('')
    ], Sheet.prototype, "name", void 0);
    __decorate([
        Property(100)
    ], Sheet.prototype, "rowCount", void 0);
    __decorate([
        Property(100)
    ], Sheet.prototype, "colCount", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "selectedRange", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "activeCell", void 0);
    __decorate([
        Complex({}, UsedRange)
    ], Sheet.prototype, "usedRange", void 0);
    __decorate([
        Property('A1')
    ], Sheet.prototype, "topLeftCell", void 0);
    __decorate([
        Property(true)
    ], Sheet.prototype, "showHeaders", void 0);
    __decorate([
        Property(true)
    ], Sheet.prototype, "showGridLines", void 0);
    return Sheet;
}(ChildProperty));
export { Sheet };
/**
 * To get sheet index from address.

 */
export function getSheetIndex(context, name) {
    var idx;
    for (var i = 0; i < context.sheets.length; i++) {
        if (context.sheets[i].name === name) {
            idx = i;
            break;
        }
    }
    return idx;
}
/**
 * To get sheet index from address.

 */
export function getSheetIndexFromId(context, id) {
    var idx;
    for (var i = 0; i < context.sheets.length; i++) {
        if (context.sheets[i].id === id) {
            idx = i;
            break;
        }
    }
    return idx + 1;
}
/**
 * To get sheet name from address.

 */
export function getSheetNameFromAddress(address) {
    return address.split('!')[0];
}
/**
 * To get sheet index from sheet name.

 */
export function getSheetIndexByName(context, name, info) {
    var len = info.length;
    for (var i = 0; i < len; i++) {
        if (info[i].sheet.toUpperCase() === name.toUpperCase()) {
            return info[i].index;
        }
    }
    return -1;
}
/**
 * update selected range

 */
export function updateSelectedRange(context, range, sheet) {
    if (sheet === void 0) { sheet = {}; }
    sheet.selectedRange = range;
    context.setProperties({ 'sheets': context.sheets }, true);
}
/**
 * get selected range

 */
export function getSelectedRange(sheet) {
    return sheet && sheet.selectedRange || 'A1';
}
/**

 */
export function getSheet(context, idx) {
    return context.sheets[idx];
}
/**

 */
export function getSheetNameCount(context) {
    var name = [];
    context.sheets.forEach(function (sheet) {
        name.push(sheet.name.toLowerCase());
    });
    for (var i = 0; i < name.length; i++) {
        if (name.indexOf('sheet' + context.sheetNameCount) > -1) {
            context.sheetNameCount++;
        }
        else {
            return context.sheetNameCount++;
        }
    }
    return context.sheetNameCount++;
}
/**

 */
export function getMaxSheetId(sheets) {
    var cnt = 0;
    sheets.forEach(function (sheet) {
        cnt = Math.max(sheet.id, cnt);
    });
    return cnt + 1;
}
/**

 */
export function initSheet(context) {
    context.sheets.forEach(function (sheet) {
        processIdx(sheet.columns);
        initRow(sheet.rows);
    });
    processIdx(context.sheets, true, context);
}
function initRow(rows) {
    rows.forEach(function (row) {
        if (row.cells) {
            processIdx(row.cells);
        }
    });
    processIdx(rows);
}
/**
 * get sheet name

 */
export function getSheetName(context, idx) {
    if (idx === void 0) { idx = context.activeSheetTab; }
    return getSheet(context, idx - 1).name;
}
