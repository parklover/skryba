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
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { AggregateColumnsDirective, AggregateColumnDirective, AggregateColumnsPlugin, AggregateColumnPlugin } from './aggregate-columns.directive';
import { AggregatesDirective, AggregateDirective, AggregatesPlugin, AggregatePlugin } from './aggregates.directive';
export var properties = ['aggregates', 'allowExcelExport', 'allowFiltering', 'allowMultiSorting', 'allowPaging', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTextWrap', 'autoCheckHierarchy', 'childMapping', 'columnMenuItems', 'columnQueryMode', 'columns', 'contextMenuItems', 'dataSource', 'detailTemplate', 'editSettings', 'enableAltRow', 'enableCollapseAll', 'enableHover', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'expandStateMapping', 'filterSettings', 'frozenColumns', 'frozenRows', 'gridLines', 'hasChildMapping', 'height', 'idMapping', 'loadChildOnDemand', 'locale', 'pageSettings', 'parentIdMapping', 'printMode', 'query', 'rowDropSettings', 'rowHeight', 'rowTemplate', 'searchSettings', 'selectedRowIndex', 'selectionSettings', 'showColumnMenu', 'sortSettings', 'textWrapSettings', 'toolbar', 'treeColumnIndex', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeDataBound', 'beforeExcelExport', 'beforePdfExport', 'beforePrint', 'beginEdit', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSave', 'cellSelected', 'cellSelecting', 'checkboxChange', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'detailDataBound', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'pdfExportComplete', 'pdfHeaderQueryCellInfo', 'pdfQueryCellInfo', 'printComplete', 'queryCellInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'toolbarClick'];
export var modelProps = ['dataSource'];
/**
 * `ejs-treegrid` represents the VueJS TreeGrid Component.
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
var TreeGridComponent = /** @class */ (function (_super) {
    __extends(TreeGridComponent, _super);
    function TreeGridComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-columns": "e-column", "e-aggregates": { "e-aggregate": { "e-columns": "e-column" } } };
        _this.tagNameMapper = {};
        _this.ej2Instances = new TreeGrid({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    TreeGridComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    TreeGridComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
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
    TreeGridComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    TreeGridComponent.prototype.addRecord = function (data, index, position) {
        return this.ej2Instances.addRecord(data, index, position);
    };
    TreeGridComponent.prototype.autoFitColumns = function (fieldNames) {
        return this.ej2Instances.autoFitColumns(fieldNames);
    };
    TreeGridComponent.prototype.clearFiltering = function () {
        return this.ej2Instances.clearFiltering();
    };
    TreeGridComponent.prototype.clearSelection = function () {
        return this.ej2Instances.clearSelection();
    };
    TreeGridComponent.prototype.clearSorting = function () {
        return this.ej2Instances.clearSorting();
    };
    TreeGridComponent.prototype.closeEdit = function () {
        return this.ej2Instances.closeEdit();
    };
    TreeGridComponent.prototype.collapseAll = function () {
        return this.ej2Instances.collapseAll();
    };
    TreeGridComponent.prototype.collapseAtLevel = function (level) {
        return this.ej2Instances.collapseAtLevel(level);
    };
    TreeGridComponent.prototype.collapseRow = function (row, record) {
        return this.ej2Instances.collapseRow(row, record);
    };
    TreeGridComponent.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    TreeGridComponent.prototype.deleteRecord = function (fieldName, data) {
        return this.ej2Instances.deleteRecord(fieldName, data);
    };
    TreeGridComponent.prototype.deleteRow = function (tr) {
        return this.ej2Instances.deleteRow(tr);
    };
    TreeGridComponent.prototype.editCell = function (rowIndex, field) {
        return this.ej2Instances.editCell(rowIndex, field);
    };
    TreeGridComponent.prototype.endEdit = function () {
        return this.ej2Instances.endEdit();
    };
    TreeGridComponent.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    TreeGridComponent.prototype.expandAll = function () {
        return this.ej2Instances.expandAll();
    };
    TreeGridComponent.prototype.expandAtLevel = function (level) {
        return this.ej2Instances.expandAtLevel(level);
    };
    TreeGridComponent.prototype.expandRow = function (row, record) {
        return this.ej2Instances.expandRow(row, record);
    };
    TreeGridComponent.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator) {
        return this.ej2Instances.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator);
    };
    TreeGridComponent.prototype.getCellFromIndex = function (rowIndex, columnIndex) {
        return this.ej2Instances.getCellFromIndex(rowIndex, columnIndex);
    };
    TreeGridComponent.prototype.getCheckedRecords = function () {
        return this.ej2Instances.getCheckedRecords();
    };
    TreeGridComponent.prototype.getCheckedRowIndexes = function () {
        return this.ej2Instances.getCheckedRowIndexes();
    };
    TreeGridComponent.prototype.getColumnByField = function (field) {
        return this.ej2Instances.getColumnByField(field);
    };
    TreeGridComponent.prototype.getColumnByUid = function (uid) {
        return this.ej2Instances.getColumnByUid(uid);
    };
    TreeGridComponent.prototype.getColumnFieldNames = function () {
        return this.ej2Instances.getColumnFieldNames();
    };
    TreeGridComponent.prototype.getColumnHeaderByField = function (field) {
        return this.ej2Instances.getColumnHeaderByField(field);
    };
    TreeGridComponent.prototype.getColumnHeaderByIndex = function (index) {
        return this.ej2Instances.getColumnHeaderByIndex(index);
    };
    TreeGridComponent.prototype.getColumnHeaderByUid = function (uid) {
        return this.ej2Instances.getColumnHeaderByUid(uid);
    };
    TreeGridComponent.prototype.getColumnIndexByField = function (field) {
        return this.ej2Instances.getColumnIndexByField(field);
    };
    TreeGridComponent.prototype.getColumnIndexByUid = function (uid) {
        return this.ej2Instances.getColumnIndexByUid(uid);
    };
    TreeGridComponent.prototype.getColumns = function (isRefresh) {
        return this.ej2Instances.getColumns(isRefresh);
    };
    TreeGridComponent.prototype.getContent = function () {
        return this.ej2Instances.getContent();
    };
    TreeGridComponent.prototype.getContentTable = function () {
        return this.ej2Instances.getContentTable();
    };
    TreeGridComponent.prototype.getCurrentViewRecords = function () {
        return this.ej2Instances.getCurrentViewRecords();
    };
    TreeGridComponent.prototype.getDataModule = function () {
        return this.ej2Instances.getDataModule();
    };
    TreeGridComponent.prototype.getDataRows = function () {
        return this.ej2Instances.getDataRows();
    };
    TreeGridComponent.prototype.getFooterContent = function () {
        return this.ej2Instances.getFooterContent();
    };
    TreeGridComponent.prototype.getFooterContentTable = function () {
        return this.ej2Instances.getFooterContentTable();
    };
    TreeGridComponent.prototype.getHeaderContent = function () {
        return this.ej2Instances.getHeaderContent();
    };
    TreeGridComponent.prototype.getHeaderTable = function () {
        return this.ej2Instances.getHeaderTable();
    };
    TreeGridComponent.prototype.getMovableCellFromIndex = function (rowIndex, columnIndex) {
        return this.ej2Instances.getMovableCellFromIndex(rowIndex, columnIndex);
    };
    TreeGridComponent.prototype.getMovableDataRows = function () {
        return this.ej2Instances.getMovableDataRows();
    };
    TreeGridComponent.prototype.getMovableRowByIndex = function (index) {
        return this.ej2Instances.getMovableRowByIndex(index);
    };
    TreeGridComponent.prototype.getMovableRows = function () {
        return this.ej2Instances.getMovableRows();
    };
    TreeGridComponent.prototype.getPager = function () {
        return this.ej2Instances.getPager();
    };
    TreeGridComponent.prototype.getPrimaryKeyFieldNames = function () {
        return this.ej2Instances.getPrimaryKeyFieldNames();
    };
    TreeGridComponent.prototype.getRowByIndex = function (index) {
        return this.ej2Instances.getRowByIndex(index);
    };
    TreeGridComponent.prototype.getRowInfo = function (target) {
        return this.ej2Instances.getRowInfo(target);
    };
    TreeGridComponent.prototype.getRows = function () {
        return this.ej2Instances.getRows();
    };
    TreeGridComponent.prototype.getSelectedRecords = function () {
        return this.ej2Instances.getSelectedRecords();
    };
    TreeGridComponent.prototype.getSelectedRowCellIndexes = function () {
        return this.ej2Instances.getSelectedRowCellIndexes();
    };
    TreeGridComponent.prototype.getSelectedRowIndexes = function () {
        return this.ej2Instances.getSelectedRowIndexes();
    };
    TreeGridComponent.prototype.getSelectedRows = function () {
        return this.ej2Instances.getSelectedRows();
    };
    TreeGridComponent.prototype.getUidByColumnField = function (field) {
        return this.ej2Instances.getUidByColumnField(field);
    };
    TreeGridComponent.prototype.getVisibleColumns = function () {
        return this.ej2Instances.getVisibleColumns();
    };
    TreeGridComponent.prototype.goToPage = function (pageNo) {
        return this.ej2Instances.goToPage(pageNo);
    };
    TreeGridComponent.prototype.hideColumns = function (keys, hideBy) {
        return this.ej2Instances.hideColumns(keys, hideBy);
    };
    TreeGridComponent.prototype.hideSpinner = function () {
        return this.ej2Instances.hideSpinner();
    };
    TreeGridComponent.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
    };
    TreeGridComponent.prototype.print = function () {
        return this.ej2Instances.print();
    };
    TreeGridComponent.prototype.refresh = function () {
        return this.ej2Instances.refresh();
    };
    TreeGridComponent.prototype.refreshColumns = function (refreshUI) {
        return this.ej2Instances.refreshColumns(refreshUI);
    };
    TreeGridComponent.prototype.refreshHeader = function () {
        return this.ej2Instances.refreshHeader();
    };
    TreeGridComponent.prototype.reorderColumns = function (fromFName, toFName) {
        return this.ej2Instances.reorderColumns(fromFName, toFName);
    };
    TreeGridComponent.prototype.reorderRows = function (fromIndexes, toIndex, position) {
        return this.ej2Instances.reorderRows(fromIndexes, toIndex, position);
    };
    TreeGridComponent.prototype.search = function (searchString) {
        return this.ej2Instances.search(searchString);
    };
    TreeGridComponent.prototype.selectCell = function (cellIndex, isToggle) {
        return this.ej2Instances.selectCell(cellIndex, isToggle);
    };
    TreeGridComponent.prototype.selectCheckboxes = function (indexes) {
        return this.ej2Instances.selectCheckboxes(indexes);
    };
    TreeGridComponent.prototype.selectRow = function (index, isToggle) {
        return this.ej2Instances.selectRow(index, isToggle);
    };
    TreeGridComponent.prototype.selectRows = function (rowIndexes) {
        return this.ej2Instances.selectRows(rowIndexes);
    };
    TreeGridComponent.prototype.setCellValue = function (key, field, value) {
        return this.ej2Instances.setCellValue(key, field, value);
    };
    TreeGridComponent.prototype.setRowData = function (key, rowData) {
        return this.ej2Instances.setRowData(key, rowData);
    };
    TreeGridComponent.prototype.showColumns = function (keys, showBy) {
        return this.ej2Instances.showColumns(keys, showBy);
    };
    TreeGridComponent.prototype.showSpinner = function () {
        return this.ej2Instances.showSpinner();
    };
    TreeGridComponent.prototype.sortByColumn = function (columnName, direction, isMultiSort) {
        return this.ej2Instances.sortByColumn(columnName, direction, isMultiSort);
    };
    TreeGridComponent.prototype.startEdit = function () {
        return this.ej2Instances.startEdit();
    };
    TreeGridComponent.prototype.updateExternalMessage = function (message) {
        return this.ej2Instances.updateExternalMessage(message);
    };
    TreeGridComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], TreeGridComponent);
    return TreeGridComponent;
}(ComponentBase));
export { TreeGridComponent };
export var TreeGridPlugin = {
    name: 'ejs-treegrid',
    install: function (Vue) {
        Vue.component(TreeGridPlugin.name, TreeGridComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(AggregatePlugin.name, AggregateDirective);
        Vue.component(AggregatesPlugin.name, AggregatesDirective);
        Vue.component(AggregateColumnPlugin.name, AggregateColumnDirective);
        Vue.component(AggregateColumnsPlugin.name, AggregateColumnsDirective);
    }
};
