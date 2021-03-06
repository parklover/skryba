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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, NotifyPropertyChanges, Collection, Complex } from '@syncfusion/ej2-base';
import { initSheet, getSheet, getSheetIndexFromId, getSheetNameCount, getMaxSheetId, getSheetIndexByName, getSheetIndex } from './sheet';
import { Sheet } from './sheet';
import { Event, merge, L10n } from '@syncfusion/ej2-base';
import { getWorkbookRequiredModules } from '../common/module';
import { getData, clearRange } from './index';
import { DefineName, CellStyle, updateUsedRange, getIndexesFromAddress, localeData, workbookLocale } from '../common/index';
import * as events from '../common/event';
import { setCellFormat, sheetCreated } from '../common/index';
import { getCell, skipDefaultValue, setCell } from './cell';
import { DataBind, setRow } from '../index';
import { WorkbookSave, WorkbookFormula, WorkbookOpen, WorkbookSort } from '../integrations/index';
import { WorkbookNumberFormat } from '../integrations/number-format';
import { WorkbookEdit, WorkbookCellFormat } from '../actions/index';
import { ServiceLocator } from '../services/index';
/**
 * Represents the Workbook.
 */
var Workbook = /** @class */ (function (_super) {
    __extends(Workbook, _super);
    /**
     * Constructor for initializing the library.
     * @param options - Configures Workbook model.
     */
    function Workbook(options) {
        var _this = _super.call(this, options) || this;
        /**
         * To generate sheet name based on sheet count.
    
         */
        _this.sheetNameCount = 1;
        /**
    
         */
        _this.isOpen = false;
        Workbook_1.Inject(DataBind, WorkbookSave, WorkbookOpen, WorkbookNumberFormat, WorkbookCellFormat, WorkbookEdit, WorkbookFormula, WorkbookSort);
        _this.commonCellStyle = {};
        if (options && options.cellStyle) {
            _this.commonCellStyle = options.cellStyle;
        }
        if (_this.getModuleName() === 'workbook') {
            _this.serviceLocator = new ServiceLocator;
            _this.initWorkbookServices();
            _this.dataBind();
            _this.initEmptySheet();
        }
        return _this;
    }
    Workbook_1 = Workbook;
    /**
     * For internal use only.
     * @returns void

     */
    Workbook.prototype.preRender = function () {
        if (!Object.keys(this.commonCellStyle).length) {
            this.commonCellStyle = skipDefaultValue(this.cellStyle, true);
        }
        if (this.getModuleName() === 'spreadsheet') {
            this.initEmptySheet();
        }
    };
    Workbook.prototype.initWorkbookServices = function () {
        this.serviceLocator.register(workbookLocale, new L10n(this.getModuleName(), localeData, this.locale));
    };
    /**
     * For internal use only.
     * @returns void

     */
    Workbook.prototype.render = function () {
        /** code snippets */
    };
    /**
     * To provide the array of modules needed for workbook.
     * @return {ModuleDeclaration[]}

     */
    Workbook.prototype.requiredModules = function () {
        return getWorkbookRequiredModules(this);
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @returns string

     */
    Workbook.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Applies the style (font family, font weight, background color, etc...) to the specified range of cells.
     * @param {CellStyleModel} style - Specifies the cell style.
     * @param {string} range? - Specifies the address for the range of cells.
     */
    Workbook.prototype.cellFormat = function (style, range) {
        var sheet = this.getActiveSheet();
        range = range || sheet.selectedRange;
        this.notify(setCellFormat, { style: style, range: range, refreshRibbon: range.indexOf(sheet.activeCell) > -1 ? true : false });
    };
    Workbook.prototype.getCellStyleValue = function (cssProps, indexes) {
        var _this = this;
        var cell = getCell(indexes[0], indexes[1], this.getActiveSheet());
        var style = {};
        cssProps.forEach(function (cssProp) {
            style[cssProp] = _this.cellStyle[cssProp];
            if (cell && cell.style && cell.style[cssProp]) {
                style[cssProp] = cell.style[cssProp];
            }
        });
        return style;
    };
    /**
     * Applies the number format (number, currency, percentage, short date, etc...) to the specified range of cells.
     * @param {string} format - Specifies the number format code.
     * @param {string} range? - Specifies the address for the range of cells.
     */
    Workbook.prototype.numberFormat = function (format, range) {
        this.notify(events.applyNumberFormatting, { format: format, range: range });
    };
    /**
     * Used to create new sheet.

     */
    Workbook.prototype.createSheet = function (index) {
        var sheet = new Sheet(this, 'sheets', { id: getMaxSheetId(this.sheets), name: 'Sheet' + getSheetNameCount(this) }, true);
        if (index > -1) {
            this.sheets.splice(index, 0, sheet);
        }
        else {
            this.sheets.push(sheet);
        }
        this.setProperties({ 'sheet': this.sheets }, true);
        this.notify(sheetCreated, { sheetIndex: index | 0 });
        this.notify(events.workbookFormulaOperation, { action: 'registerSheet', sheetIndex: index });
    };
    /**
     * Used to remove sheet.

     */
    Workbook.prototype.removeSheet = function (idx) {
        this.sheets.splice(idx, 1);
    };
    /**
     * Destroys the Workbook library.
     */
    Workbook.prototype.destroy = function () {
        this.notify(events.workbookDestroyed, null);
        _super.prototype.destroy.call(this);
    };
    /**
     * Called internally if any of the property value changed.
     * @param  {WorkbookModel} newProp
     * @param  {WorkbookModel} oldProp
     * @returns void

     */
    Workbook.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cellStyle':
                    merge(this.commonCellStyle, skipDefaultValue(newProp.cellStyle));
                    break;
            }
        }
    };
    /**
     * Not applicable for workbook.

     */
    Workbook.prototype.appendTo = function (selector) {
        _super.prototype.appendTo.call(this, selector);
    };
    /**
     * Used to hide/show the rows in spreadsheet.
     * @param {number} startRow - Specifies the start row index.
     * @param {number} endRow - Specifies the end row index.
     * @param {boolean} hide - To hide/show the rows in specified range.

     */
    Workbook.prototype.showHideRow = function (hide, startRow, endRow) {
        if (endRow === void 0) { endRow = startRow; }
        var sheet = this.getActiveSheet();
        for (var i = startRow; i < endRow; i++) {
            setRow(sheet, i, { hidden: hide });
        }
        this.setProperties({ 'sheets': this.sheets }, true);
    };
    Workbook.prototype.initEmptySheet = function () {
        var len = this.sheets.length;
        if (len) {
            initSheet(this);
        }
        else {
            this.createSheet();
        }
    };
    Workbook.prototype.getActiveSheet = function () {
        return this.sheets[this.activeSheetTab - 1];
    };
    /**
     * Used for setting the used range row and column index.

     */
    Workbook.prototype.setUsedRange = function (rowIdx, colIdx) {
        var sheet = this.getActiveSheet();
        if (rowIdx > sheet.usedRange.rowIndex) {
            sheet.usedRange.rowIndex = rowIdx;
            this.setProperties({ 'sheets': this.sheets }, true);
            this.notify(updateUsedRange, { index: rowIdx, update: 'row' });
        }
        if (colIdx > sheet.usedRange.colIndex) {
            sheet.usedRange.colIndex = colIdx;
            this.setProperties({ 'sheets': this.sheets }, true);
            this.notify(updateUsedRange, { index: colIdx, update: 'col' });
        }
    };
    /**
     * Gets the range of data as JSON from the specified address.
     * @param {string} address - Specifies the address for range of cells.
     */
    Workbook.prototype.getData = function (address) {
        return getData(this, address);
    };
    /**
     * Get component name.
     * @returns string

     */
    Workbook.prototype.getModuleName = function () {
        return 'workbook';
    };
    Workbook.prototype.getValueRowCol = function (sheetIndex, rowIndex, colIndex) {
        var args = {
            action: 'getSheetInfo', sheetInfo: []
        };
        this.notify(events.workbookFormulaOperation, args);
        var id = getSheetIndexByName(this, 'Sheet' + sheetIndex, args.sheetInfo);
        if (id === -1) {
            var errArgs = { action: 'getReferenceError', refError: '' };
            this.notify(events.workbookFormulaOperation, errArgs);
            return errArgs.refError;
        }
        sheetIndex = getSheetIndexFromId(this, sheetIndex);
        var sheet = getSheet(this, sheetIndex - 1);
        var cell = getCell(rowIndex - 1, colIndex - 1, sheet);
        return (cell && cell.value) || '';
    };
    Workbook.prototype.setValueRowCol = function (sheetIndex, value, rowIndex, colIndex) {
        sheetIndex = getSheetIndexFromId(this, sheetIndex);
        this.notify(events.workbookEditOperation, {
            action: 'updateCellValue', address: [rowIndex - 1, colIndex - 1], value: value,
            sheetIndex: sheetIndex, isValueOnly: true
        });
    };
    /**
     * Opens the specified excel file or stream.
     * @param {OpenOptions} options - Options for opening the excel file.
     */
    Workbook.prototype.open = function (options) {
        this.notify(events.workbookOpen, options);
    };
    /**
     * Saves the Spreadsheet data to Excel file.
     * @param {SaveOptions} saveOptions - Options for saving the excel file.
     */
    Workbook.prototype.save = function (saveOptions) {
        if (saveOptions === void 0) { saveOptions = {}; }
        if (this.allowSave) {
            var defaultProps = {
                url: this.saveUrl,
                fileName: saveOptions.fileName || 'Sample',
                saveType: 'Xlsx'
            };
            var eventArgs = __assign({}, defaultProps, saveOptions, { customParams: {}, isFullPost: true, needBlobData: false, cancel: false });
            this.trigger('beforeSave', eventArgs);
            if (!eventArgs.cancel) {
                this.notify(events.beginSave, {
                    saveSettings: eventArgs, isFullPost: eventArgs.isFullPost,
                    needBlobData: eventArgs.needBlobData, customParams: eventArgs.customParams
                });
            }
        }
    };
    /**
     * Sorts the range of cells in the active Spreadsheet.
     * @param sortOptions - options for sorting.
     * @param range - address of the data range.
     */
    Workbook.prototype.sort = function (sortOptions, range) {
        if (!this.allowSorting) {
            return Promise.reject();
        }
        var eventArgs = {
            range: range || this.getActiveSheet().selectedRange,
            sortOptions: sortOptions || { sortDescriptors: {} },
            cancel: false
        };
        var promise = new Promise(function (resolve, reject) { resolve((function () { })()); });
        var sortArgs = { args: eventArgs, promise: promise };
        this.notify(events.initiateSort, sortArgs);
        return sortArgs.promise;
    };
    /**
     * To update a cell properties.
     * @param {CellModel} cell - Cell properties.
     * @param {string} address - Address to update.
     */
    Workbook.prototype.updateCell = function (cell, address) {
        var range = getIndexesFromAddress(address);
        var sheetIdx = getSheetIndex(this, address.split('!')[0]) || this.activeSheetTab - 1;
        setCell(range[0], range[1], this.sheets[sheetIdx], cell);
    };
    /**
     * Adds the defined name to the Spreadsheet.
     * @param {DefineNameModel} definedName - Specifies the name.
     * @return {boolean} - Return the added status of the defined name.
     */
    Workbook.prototype.addDefinedName = function (definedName) {
        var eventArgs = {
            action: 'addDefinedName',
            isAdded: false,
            definedName: definedName
        };
        this.notify(events.workbookFormulaOperation, eventArgs);
        return eventArgs.isAdded;
    };
    /**
     * Removes the defined name from the Spreadsheet.
     * @param {string} definedName - Specifies the name.
     * @param {string} scope - Specifies the scope of the defined name.
     * @return {boolean} - Return the removed status of the defined name.
     */
    Workbook.prototype.removeDefinedName = function (definedName, scope) {
        if (scope === void 0) { scope = ''; }
        var eventArgs = {
            action: 'removeDefinedName',
            isRemoved: false,
            definedName: definedName,
            scope: scope
        };
        this.notify(events.workbookFormulaOperation, eventArgs);
        return eventArgs.isRemoved;
    };
    Workbook.prototype.clearRange = function (address, sheetIndex, valueOnly) {
        if (valueOnly === void 0) { valueOnly = true; }
        address = address ? address : this.getActiveSheet().selectedRange;
        sheetIndex = sheetIndex ? sheetIndex : this.activeSheetTab;
        clearRange(this, address, sheetIndex, valueOnly);
    };
    var Workbook_1;
    __decorate([
        Collection([], Sheet)
    ], Workbook.prototype, "sheets", void 0);
    __decorate([
        Property(1)
    ], Workbook.prototype, "activeSheetTab", void 0);
    __decorate([
        Property('100%')
    ], Workbook.prototype, "height", void 0);
    __decorate([
        Property('100%')
    ], Workbook.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "showRibbon", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "showFormulaBar", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "showSheetTabs", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowEditing", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowOpen", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowSave", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowSorting", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowNumberFormatting", void 0);
    __decorate([
        Property(true)
    ], Workbook.prototype, "allowCellFormatting", void 0);
    __decorate([
        Complex({}, CellStyle)
    ], Workbook.prototype, "cellStyle", void 0);
    __decorate([
        Property('')
    ], Workbook.prototype, "openUrl", void 0);
    __decorate([
        Property('')
    ], Workbook.prototype, "saveUrl", void 0);
    __decorate([
        Collection([], DefineName)
    ], Workbook.prototype, "definedNames", void 0);
    __decorate([
        Event()
    ], Workbook.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], Workbook.prototype, "openFailure", void 0);
    __decorate([
        Event()
    ], Workbook.prototype, "beforeSave", void 0);
    __decorate([
        Event()
    ], Workbook.prototype, "saveComplete", void 0);
    __decorate([
        Event()
    ], Workbook.prototype, "beforeCellFormat", void 0);
    Workbook = Workbook_1 = __decorate([
        NotifyPropertyChanges
    ], Workbook);
    return Workbook;
}(Component));
export { Workbook };
