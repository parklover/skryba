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
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { Grid } from '@syncfusion/ej2-grids';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateColumnsPlugin, AggregateColumnPlugin } from './aggregate-columns.directive';
import { AggregatesDirective, AggregateDirective, AggregatesPlugin, AggregatePlugin } from './aggregates.directive';
export var properties = ['aggregates', 'allowExcelExport', 'allowFiltering', 'allowGrouping', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'childGrid', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'currencyCode', 'dataSource', 'detailTemplate', 'editSettings', 'enableAltRow', 'enableAutoFill', 'enableColumnVirtualization', 'enableHover', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'groupSettings', 'height', 'hierarchyPrintMode', 'locale', 'pageSettings', 'pagerTemplate', 'printMode', 'query', 'queryString', 'rowDropSettings', 'rowHeight', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnChooser', 'showColumnMenu', 'sortSettings', 'textWrapSettings', 'toolbar', 'toolbarTemplate', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'batchAdd', 'batchCancel', 'batchDelete', 'beforeBatchAdd', 'beforeBatchDelete', 'beforeBatchSave', 'beforeCopy', 'beforeDataBound', 'beforeExcelExport', 'beforeOpenColumnChooser', 'beforePaste', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSaved', 'cellSelected', 'cellSelecting', 'checkBoxChange', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'commandClick', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'destroyed', 'detailDataBound', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'exportDetailDataBound', 'headerCellInfo', 'keyPressed', 'load', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick'];
export var modelProps = ['dataSource'];
/**
 * `ejs-grid` represents the VueJS Grid Component.
 * ```vue
 * <ejs-grid :dataSource='data' allowPaging='true' allowSorting='true'></ejs-grid>
 * ```
 */
var GridComponent = /** @class */ (function (_super) {
    __extends(GridComponent, _super);
    function GridComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-columns": "e-column", "e-aggregates": { "e-aggregate": { "e-columns": "e-column" } } };
        _this.tagNameMapper = {};
        _this.ej2Instances = new Grid({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    GridComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    GridComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            var key = this.models.toString().match(/checked|value/) || [];
            var propKey = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                this.$emit('update:' + propKey, eventProp[propKey]);
                this.$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler);
        }
    };
    GridComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    GridComponent.prototype.addRecord = function (data, index) {
        return this.ej2Instances.addRecord(data, index);
    };
    GridComponent.prototype.autoFitColumns = function (fieldNames) {
        return this.ej2Instances.autoFitColumns(fieldNames);
    };
    GridComponent.prototype.clearCellSelection = function () {
        return this.ej2Instances.clearCellSelection();
    };
    GridComponent.prototype.clearFiltering = function () {
        return this.ej2Instances.clearFiltering();
    };
    GridComponent.prototype.clearGrouping = function () {
        return this.ej2Instances.clearGrouping();
    };
    GridComponent.prototype.clearRowSelection = function () {
        return this.ej2Instances.clearRowSelection();
    };
    GridComponent.prototype.clearSelection = function () {
        return this.ej2Instances.clearSelection();
    };
    GridComponent.prototype.clearSorting = function () {
        return this.ej2Instances.clearSorting();
    };
    GridComponent.prototype.closeEdit = function () {
        return this.ej2Instances.closeEdit();
    };
    GridComponent.prototype.copy = function (withHeader) {
        return this.ej2Instances.copy(withHeader);
    };
    GridComponent.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    GridComponent.prototype.dataReady = function () {
        return this.ej2Instances.dataReady();
    };
    GridComponent.prototype.deleteRecord = function (fieldname, data) {
        return this.ej2Instances.deleteRecord(fieldname, data);
    };
    GridComponent.prototype.deleteRow = function (tr) {
        return this.ej2Instances.deleteRow(tr);
    };
    GridComponent.prototype.destroyTemplate = function (propertyNames, index) {
        return this.ej2Instances.destroyTemplate(propertyNames, index);
    };
    GridComponent.prototype.detailCollapseAll = function () {
        return this.ej2Instances.detailCollapseAll();
    };
    GridComponent.prototype.detailExpandAll = function () {
        return this.ej2Instances.detailExpandAll();
    };
    GridComponent.prototype.editCell = function (index, field) {
        return this.ej2Instances.editCell(index, field);
    };
    GridComponent.prototype.enableToolbarItems = function (items, isEnable) {
        return this.ej2Instances.enableToolbarItems(items, isEnable);
    };
    GridComponent.prototype.endEdit = function () {
        return this.ej2Instances.endEdit();
    };
    GridComponent.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    GridComponent.prototype.extendRequiredModules = function (modules) {
        return this.ej2Instances.extendRequiredModules(modules);
    };
    GridComponent.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator) {
        return this.ej2Instances.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator);
    };
    GridComponent.prototype.getBatchChanges = function () {
        return this.ej2Instances.getBatchChanges();
    };
    GridComponent.prototype.getCellFromIndex = function (rowIndex, columnIndex) {
        return this.ej2Instances.getCellFromIndex(rowIndex, columnIndex);
    };
    GridComponent.prototype.getColumnByField = function (field) {
        return this.ej2Instances.getColumnByField(field);
    };
    GridComponent.prototype.getColumnByUid = function (uid) {
        return this.ej2Instances.getColumnByUid(uid);
    };
    GridComponent.prototype.getColumnFieldNames = function () {
        return this.ej2Instances.getColumnFieldNames();
    };
    GridComponent.prototype.getColumnHeaderByField = function (field) {
        return this.ej2Instances.getColumnHeaderByField(field);
    };
    GridComponent.prototype.getColumnHeaderByIndex = function (index) {
        return this.ej2Instances.getColumnHeaderByIndex(index);
    };
    GridComponent.prototype.getColumnHeaderByUid = function (uid) {
        return this.ej2Instances.getColumnHeaderByUid(uid);
    };
    GridComponent.prototype.getColumnIndexByField = function (field) {
        return this.ej2Instances.getColumnIndexByField(field);
    };
    GridComponent.prototype.getColumnIndexByUid = function (uid) {
        return this.ej2Instances.getColumnIndexByUid(uid);
    };
    GridComponent.prototype.getColumns = function (isRefresh) {
        return this.ej2Instances.getColumns(isRefresh);
    };
    GridComponent.prototype.getContent = function () {
        return this.ej2Instances.getContent();
    };
    GridComponent.prototype.getContentTable = function () {
        return this.ej2Instances.getContentTable();
    };
    GridComponent.prototype.getCurrentViewRecords = function () {
        return this.ej2Instances.getCurrentViewRecords();
    };
    GridComponent.prototype.getDataModule = function () {
        return this.ej2Instances.getDataModule();
    };
    GridComponent.prototype.getDataRows = function () {
        return this.ej2Instances.getDataRows();
    };
    GridComponent.prototype.getFooterContent = function () {
        return this.ej2Instances.getFooterContent();
    };
    GridComponent.prototype.getFooterContentTable = function () {
        return this.ej2Instances.getFooterContentTable();
    };
    GridComponent.prototype.getForeignKeyColumns = function () {
        return this.ej2Instances.getForeignKeyColumns();
    };
    GridComponent.prototype.getHeaderContent = function () {
        return this.ej2Instances.getHeaderContent();
    };
    GridComponent.prototype.getHeaderTable = function () {
        return this.ej2Instances.getHeaderTable();
    };
    GridComponent.prototype.getMovableCellFromIndex = function (rowIndex, columnIndex) {
        return this.ej2Instances.getMovableCellFromIndex(rowIndex, columnIndex);
    };
    GridComponent.prototype.getMovableDataRows = function () {
        return this.ej2Instances.getMovableDataRows();
    };
    GridComponent.prototype.getMovableRowByIndex = function (index) {
        return this.ej2Instances.getMovableRowByIndex(index);
    };
    GridComponent.prototype.getMovableRows = function () {
        return this.ej2Instances.getMovableRows();
    };
    GridComponent.prototype.getPager = function () {
        return this.ej2Instances.getPager();
    };
    GridComponent.prototype.getPrimaryKeyFieldNames = function () {
        return this.ej2Instances.getPrimaryKeyFieldNames();
    };
    GridComponent.prototype.getRowByIndex = function (index) {
        return this.ej2Instances.getRowByIndex(index);
    };
    GridComponent.prototype.getRowIndexByPrimaryKey = function (value) {
        return this.ej2Instances.getRowIndexByPrimaryKey(value);
    };
    GridComponent.prototype.getRowInfo = function (target) {
        return this.ej2Instances.getRowInfo(target);
    };
    GridComponent.prototype.getRows = function () {
        return this.ej2Instances.getRows();
    };
    GridComponent.prototype.getSelectedRecords = function () {
        return this.ej2Instances.getSelectedRecords();
    };
    GridComponent.prototype.getSelectedRowCellIndexes = function () {
        return this.ej2Instances.getSelectedRowCellIndexes();
    };
    GridComponent.prototype.getSelectedRowIndexes = function () {
        return this.ej2Instances.getSelectedRowIndexes();
    };
    GridComponent.prototype.getSelectedRows = function () {
        return this.ej2Instances.getSelectedRows();
    };
    GridComponent.prototype.getUidByColumnField = function (field) {
        return this.ej2Instances.getUidByColumnField(field);
    };
    GridComponent.prototype.getVisibleColumns = function () {
        return this.ej2Instances.getVisibleColumns();
    };
    GridComponent.prototype.goToPage = function (pageNo) {
        return this.ej2Instances.goToPage(pageNo);
    };
    GridComponent.prototype.groupCollapseAll = function () {
        return this.ej2Instances.groupCollapseAll();
    };
    GridComponent.prototype.groupColumn = function (columnName) {
        return this.ej2Instances.groupColumn(columnName);
    };
    GridComponent.prototype.groupExpandAll = function () {
        return this.ej2Instances.groupExpandAll();
    };
    GridComponent.prototype.hideColumns = function (keys, hideBy) {
        return this.ej2Instances.hideColumns(keys, hideBy);
    };
    GridComponent.prototype.hideScroll = function () {
        return this.ej2Instances.hideScroll();
    };
    GridComponent.prototype.hideSpinner = function () {
        return this.ej2Instances.hideSpinner();
    };
    GridComponent.prototype.openColumnChooser = function (x, y) {
        return this.ej2Instances.openColumnChooser(x, y);
    };
    GridComponent.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
    };
    GridComponent.prototype.print = function () {
        return this.ej2Instances.print();
    };
    GridComponent.prototype.refresh = function () {
        return this.ej2Instances.refresh();
    };
    GridComponent.prototype.refreshColumns = function () {
        return this.ej2Instances.refreshColumns();
    };
    GridComponent.prototype.refreshHeader = function () {
        return this.ej2Instances.refreshHeader();
    };
    GridComponent.prototype.reorderColumnByIndex = function (fromIndex, toIndex) {
        return this.ej2Instances.reorderColumnByIndex(fromIndex, toIndex);
    };
    GridComponent.prototype.reorderColumnByTargetIndex = function (fieldName, toIndex) {
        return this.ej2Instances.reorderColumnByTargetIndex(fieldName, toIndex);
    };
    GridComponent.prototype.reorderColumns = function (fromFName, toFName) {
        return this.ej2Instances.reorderColumns(fromFName, toFName);
    };
    GridComponent.prototype.reorderRows = function (fromIndexes, toIndex) {
        return this.ej2Instances.reorderRows(fromIndexes, toIndex);
    };
    GridComponent.prototype.saveCell = function () {
        return this.ej2Instances.saveCell();
    };
    GridComponent.prototype.search = function (searchString) {
        return this.ej2Instances.search(searchString);
    };
    GridComponent.prototype.selectCell = function (cellIndex, isToggle) {
        return this.ej2Instances.selectCell(cellIndex, isToggle);
    };
    GridComponent.prototype.selectCells = function (rowCellIndexes) {
        return this.ej2Instances.selectCells(rowCellIndexes);
    };
    GridComponent.prototype.selectCellsByRange = function (startIndex, endIndex) {
        return this.ej2Instances.selectCellsByRange(startIndex, endIndex);
    };
    GridComponent.prototype.selectRow = function (index, isToggle) {
        return this.ej2Instances.selectRow(index, isToggle);
    };
    GridComponent.prototype.selectRows = function (rowIndexes) {
        return this.ej2Instances.selectRows(rowIndexes);
    };
    GridComponent.prototype.selectRowsByRange = function (startIndex, endIndex) {
        return this.ej2Instances.selectRowsByRange(startIndex, endIndex);
    };
    GridComponent.prototype.setCellValue = function (key, field, value) {
        return this.ej2Instances.setCellValue(key, field, value);
    };
    GridComponent.prototype.setGridContent = function (element) {
        return this.ej2Instances.setGridContent(element);
    };
    GridComponent.prototype.setGridContentTable = function (element) {
        return this.ej2Instances.setGridContentTable(element);
    };
    GridComponent.prototype.setGridHeaderContent = function (element) {
        return this.ej2Instances.setGridHeaderContent(element);
    };
    GridComponent.prototype.setGridHeaderTable = function (element) {
        return this.ej2Instances.setGridHeaderTable(element);
    };
    GridComponent.prototype.setGridPager = function (element) {
        return this.ej2Instances.setGridPager(element);
    };
    GridComponent.prototype.setRowData = function (key, rowData) {
        return this.ej2Instances.setRowData(key, rowData);
    };
    GridComponent.prototype.showColumns = function (keys, showBy) {
        return this.ej2Instances.showColumns(keys, showBy);
    };
    GridComponent.prototype.showSpinner = function () {
        return this.ej2Instances.showSpinner();
    };
    GridComponent.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        return this.ej2Instances.sortColumn(columnName, direction, isMultiSort);
    };
    GridComponent.prototype.startEdit = function () {
        return this.ej2Instances.startEdit();
    };
    GridComponent.prototype.ungroupColumn = function (columnName) {
        return this.ej2Instances.ungroupColumn(columnName);
    };
    GridComponent.prototype.updateCell = function (rowIndex, field, value) {
        return this.ej2Instances.updateCell(rowIndex, field, value);
    };
    GridComponent.prototype.updateExternalMessage = function (message) {
        return this.ej2Instances.updateExternalMessage(message);
    };
    GridComponent.prototype.updateRow = function (index, data) {
        return this.ej2Instances.updateRow(index, data);
    };
    GridComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], GridComponent);
    return GridComponent;
}(ComponentBase));
export { GridComponent };
export var GridPlugin = {
    name: 'ejs-grid',
    install: function (Vue) {
        Vue.component(GridPlugin.name, GridComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(AggregatePlugin.name, AggregateDirective);
        Vue.component(AggregatesPlugin.name, AggregatesDirective);
        Vue.component(AggregateColumnPlugin.name, AggregateColumnDirective);
        Vue.component(AggregateColumnsPlugin.name, AggregateColumnsDirective);
    }
};
