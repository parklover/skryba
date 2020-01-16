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
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
import { CellsDirective, CellDirective, CellsPlugin, CellPlugin } from './cells.directive';
import { RowsDirective, RowDirective, RowsPlugin, RowPlugin } from './rows.directive';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { RangeSettingsDirective, RangeSettingDirective, RangeSettingsPlugin, RangeSettingPlugin } from './rangesettings.directive';
import { SheetsDirective, SheetDirective, SheetsPlugin, SheetPlugin } from './sheets.directive';
import { DefinedNamesDirective, DefinedNameDirective, DefinedNamesPlugin, DefinedNamePlugin } from './definednames.directive';
export var properties = ['activeSheetTab', 'allowCellFormatting', 'allowEditing', 'allowNumberFormatting', 'allowOpen', 'allowResizing', 'allowSave', 'allowScrolling', 'allowSorting', 'cellStyle', 'cssClass', 'definedNames', 'enableClipboard', 'enableContextMenu', 'enableKeyboardNavigation', 'enableKeyboardShortcut', 'enablePersistence', 'enableRtl', 'height', 'locale', 'openUrl', 'saveUrl', 'scrollSettings', 'selectionSettings', 'sheets', 'showFormulaBar', 'showRibbon', 'showSheetTabs', 'width', 'actionBegin', 'actionComplete', 'beforeCellFormat', 'beforeCellRender', 'beforeDataBound', 'beforeOpen', 'beforeSave', 'beforeSelect', 'beforeSort', 'cellEdit', 'cellEditing', 'cellSave', 'contextMenuBeforeClose', 'contextMenuBeforeOpen', 'contextMenuItemSelect', 'created', 'dataBound', 'fileItemSelect', 'fileMenuBeforeClose', 'fileMenuBeforeOpen', 'openComplete', 'openFailure', 'saveComplete', 'select', 'sortComplete'];
export var modelProps = [];
/**
 * `ejs-spreadsheet` represents the VueJS Spreadsheet Component.
 * ```vue
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
var SpreadsheetComponent = /** @class */ (function (_super) {
    __extends(SpreadsheetComponent, _super);
    function SpreadsheetComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-sheets": { "e-sheet": { "e-rows": { "e-row": { "e-cells": "e-cell" } }, "e-columns": "e-column", "e-rangesettings": "e-rangesetting" } }, "e-definednames": "e-definedname" };
        _this.tagNameMapper = { "e-rangesettings": "e-rangeSettings", "e-definednames": "e-definedNames" };
        _this.ej2Instances = new Spreadsheet({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    SpreadsheetComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    SpreadsheetComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    SpreadsheetComponent.prototype.addContextMenuItems = function (items, text, insertAfter, isUniqueId) {
        return this.ej2Instances.addContextMenuItems(items, text, insertAfter, isUniqueId);
    };
    SpreadsheetComponent.prototype.addDefinedName = function (definedName) {
        return this.ej2Instances.addDefinedName(definedName);
    };
    SpreadsheetComponent.prototype.cellFormat = function (style, range) {
        return this.ej2Instances.cellFormat(style, range);
    };
    SpreadsheetComponent.prototype.closeEdit = function () {
        return this.ej2Instances.closeEdit();
    };
    SpreadsheetComponent.prototype.copy = function (address) {
        return this.ej2Instances.copy(address);
    };
    SpreadsheetComponent.prototype.cut = function (address) {
        return this.ej2Instances.cut(address);
    };
    SpreadsheetComponent.prototype.enableContextMenuItems = function (items, enable, isUniqueId) {
        return this.ej2Instances.enableContextMenuItems(items, enable, isUniqueId);
    };
    SpreadsheetComponent.prototype.endEdit = function () {
        return this.ej2Instances.endEdit();
    };
    SpreadsheetComponent.prototype.getData = function (address) {
        return this.ej2Instances.getData(address);
    };
    SpreadsheetComponent.prototype.goTo = function (address) {
        return this.ej2Instances.goTo(address);
    };
    SpreadsheetComponent.prototype.hideSpinner = function () {
        return this.ej2Instances.hideSpinner();
    };
    SpreadsheetComponent.prototype.numberFormat = function (format, range) {
        return this.ej2Instances.numberFormat(format, range);
    };
    SpreadsheetComponent.prototype.open = function (options) {
        return this.ej2Instances.open(options);
    };
    SpreadsheetComponent.prototype.paste = function (address, type) {
        return this.ej2Instances.paste(address, type);
    };
    SpreadsheetComponent.prototype.refreshClients = function (options) {
        return this.ej2Instances.refreshClients(options);
    };
    SpreadsheetComponent.prototype.removeContextMenuItems = function (items, isUniqueId) {
        return this.ej2Instances.removeContextMenuItems(items, isUniqueId);
    };
    SpreadsheetComponent.prototype.removeDefinedName = function (definedName, scope) {
        return this.ej2Instances.removeDefinedName(definedName, scope);
    };
    SpreadsheetComponent.prototype.resize = function () {
        return this.ej2Instances.resize();
    };
    SpreadsheetComponent.prototype.save = function (saveOptions) {
        return this.ej2Instances.save(saveOptions);
    };
    SpreadsheetComponent.prototype.selectRange = function (address) {
        return this.ej2Instances.selectRange(address);
    };
    SpreadsheetComponent.prototype.setColWidth = function (width, colIndex, sheetIndex) {
        return this.ej2Instances.setColWidth(width, colIndex, sheetIndex);
    };
    SpreadsheetComponent.prototype.setRowHeight = function (height, rowIndex, sheetIndex) {
        return this.ej2Instances.setRowHeight(height, rowIndex, sheetIndex);
    };
    SpreadsheetComponent.prototype.showSpinner = function () {
        return this.ej2Instances.showSpinner();
    };
    SpreadsheetComponent.prototype.sort = function (sortOptions, range) {
        return this.ej2Instances.sort(sortOptions, range);
    };
    SpreadsheetComponent.prototype.startEdit = function () {
        return this.ej2Instances.startEdit();
    };
    SpreadsheetComponent.prototype.updateCell = function (cell, address) {
        return this.ej2Instances.updateCell(cell, address);
    };
    SpreadsheetComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], SpreadsheetComponent);
    return SpreadsheetComponent;
}(ComponentBase));
export { SpreadsheetComponent };
export var SpreadsheetPlugin = {
    name: 'ejs-spreadsheet',
    install: function (Vue) {
        Vue.component(SpreadsheetPlugin.name, SpreadsheetComponent);
        Vue.component(SheetPlugin.name, SheetDirective);
        Vue.component(SheetsPlugin.name, SheetsDirective);
        Vue.component(RowPlugin.name, RowDirective);
        Vue.component(RowsPlugin.name, RowsDirective);
        Vue.component(CellPlugin.name, CellDirective);
        Vue.component(CellsPlugin.name, CellsDirective);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(RangeSettingPlugin.name, RangeSettingDirective);
        Vue.component(RangeSettingsPlugin.name, RangeSettingsDirective);
        Vue.component(DefinedNamePlugin.name, DefinedNameDirective);
        Vue.component(DefinedNamesPlugin.name, DefinedNamesDirective);
    }
};
