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
import { PivotView } from '@syncfusion/ej2-pivotview';
export var properties = ['allowCalculatedField', 'allowConditionalFormatting', 'allowDataCompression', 'allowDeferLayoutUpdate', 'allowDrillThrough', 'allowExcelExport', 'allowNumberFormatting', 'allowPdfExport', 'cellTemplate', 'chartSettings', 'currencyCode', 'dataSourceSettings', 'displayOption', 'editSettings', 'enablePersistence', 'enableRtl', 'enableValueSorting', 'enableVirtualization', 'gridSettings', 'groupingBarSettings', 'height', 'hyperlinkSettings', 'loadOnDemandInMemberEditor', 'locale', 'maxNodeLimitInMemberEditor', 'maxRowsInDrillThrough', 'pivotValues', 'showFieldList', 'showGroupingBar', 'showToolbar', 'showTooltip', 'showValuesButton', 'spinnerTemplate', 'toolbar', 'width', 'aggregateCellInfo', 'beforeExport', 'beginDrillThrough', 'cellClick', 'cellSelected', 'cellSelecting', 'chartSeriesCreated', 'conditionalFormatting', 'created', 'dataBound', 'destroyed', 'drill', 'drillThrough', 'enginePopulated', 'enginePopulating', 'fetchReport', 'fieldListRefreshed', 'hyperlinkCellClick', 'load', 'loadReport', 'newReport', 'onFieldDropped', 'onPdfCellRender', 'removeReport', 'renameReport', 'saveReport', 'toolbarClick', 'toolbarRender'];
export var modelProps = [];
/**
 * `ejs-pivotview` represents the VueJS PivotView Component.
 * ```vue
 * <ejs-pivotview></ejs-pivotview>
 * ```
 */
var PivotViewComponent = /** @class */ (function (_super) {
    __extends(PivotViewComponent, _super);
    function PivotViewComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = true;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new PivotView({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    PivotViewComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    PivotViewComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    PivotViewComponent.prototype.chartExport = function (type, fileName, orientation, width, height) {
        return this.ej2Instances.chartExport(type, fileName, orientation, width, height);
    };
    PivotViewComponent.prototype.createCalculatedFieldDialog = function () {
        return this.ej2Instances.createCalculatedFieldDialog();
    };
    PivotViewComponent.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    PivotViewComponent.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
    };
    PivotViewComponent.prototype.getCellTemplate = function () {
        return this.ej2Instances.getCellTemplate();
    };
    PivotViewComponent.prototype.loadPersistData = function (persistData) {
        return this.ej2Instances.loadPersistData(persistData);
    };
    PivotViewComponent.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
    };
    PivotViewComponent.prototype.printChart = function () {
        return this.ej2Instances.printChart();
    };
    PivotViewComponent.prototype.refresh = function () {
        return this.ej2Instances.refresh();
    };
    PivotViewComponent.prototype.showConditionalFormattingDialog = function () {
        return this.ej2Instances.showConditionalFormattingDialog();
    };
    PivotViewComponent.prototype.templateParser = function (template) {
        return this.ej2Instances.templateParser(template);
    };
    PivotViewComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], PivotViewComponent);
    return PivotViewComponent;
}(ComponentBase));
export { PivotViewComponent };
export var PivotViewPlugin = {
    name: 'ejs-pivotview',
    install: function (Vue) {
        Vue.component(PivotViewPlugin.name, PivotViewComponent);
    }
};
