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
import { Property, Event, Component, Internationalization, extend, isBlazor } from '@syncfusion/ej2-base';
import { L10n, remove, addClass, Browser, Complex, getInstance } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, removeClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { PivotEngine } from '../../base/engine';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { PivotCommon } from '../../common/base/pivot-common';
import { Render } from '../renderer/renderer';
import { PivotView } from '../../pivotview/base/pivotview';
import { DataSourceSettings } from '../../pivotview/model/datasourcesettings';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { PivotUtil } from '../../base/util';
import { OlapEngine } from '../../base/olap/engine';
/**
 * Represents the PivotFieldList component.
 * ```html
 * <div id="pivotfieldlist"></div>
 * <script>
 *  var pivotfieldlistObj = new PivotFieldList({ });
 *  pivotfieldlistObj.appendTo("#pivotfieldlist");
 * </script>
 * ```
 */
var PivotFieldList = /** @class */ (function (_super) {
    __extends(PivotFieldList, _super);
    /**
     * Constructor for creating the widget
     * @param  {PivotFieldListModel} options?
     * @param  {string|HTMLButtonElement} element?
     */
    function PivotFieldList(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isRequiredUpdate = true;
        _this.lastSortInfo = {};
        _this.lastFilterInfo = {};
        _this.lastAggregationInfo = {};
        _this.lastCalcFieldInfo = {};
        return _this;
    }
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}

     */
    PivotFieldList.prototype.requiredModules = function () {
        var modules = [];
        if (this.allowCalculatedField) {
            modules.push({ args: [this], member: 'calculatedfield' });
        }
        return modules;
    };
    /**
     * For internal use only - Initialize the event handler;
     * @private
     */
    PivotFieldList.prototype.preRender = function () {
        if (this.dataSourceSettings && this.dataSourceSettings.providerType === 'SSAS') {
            this.olapEngineModule = new OlapEngine();
            this.dataType = 'olap';
        }
        else {
            this.engineModule = new PivotEngine();
            this.dataType = 'pivot';
        }
        this.isAdaptive = Browser.isDevice;
        this.globalize = new Internationalization(this.locale);
        this.renderModule = new Render(this);
        this.defaultLocale = {
            staticFieldList: 'Pivot Field List',
            fieldList: 'Field List',
            dropFilterPrompt: 'Drop filter here',
            dropColPrompt: 'Drop column here',
            dropRowPrompt: 'Drop row here',
            dropValPrompt: 'Drop value here',
            addPrompt: 'Add field here',
            adaptiveFieldHeader: 'Choose field',
            centerHeader: 'Drag fields between axes below:',
            add: 'add',
            drag: 'Drag',
            filter: 'Filter',
            filtered: 'Filtered',
            sort: 'Sort',
            remove: 'Remove',
            filters: 'Filters',
            rows: 'Rows',
            columns: 'Columns',
            values: 'Values',
            CalculatedField: 'Calculated Field',
            createCalculatedField: 'Create Calculated Field',
            fieldName: 'Enter the field name',
            error: 'Error',
            invalidFormula: 'Invalid formula.',
            dropText: 'Example: ("Sum(Order_Count)" + "Sum(In_Stock)") * 250',
            dropTextMobile: 'Add fields and edit formula here.',
            dropAction: 'Calculated field cannot be place in any other region except value axis.',
            search: 'Search',
            close: 'Close',
            cancel: 'Cancel',
            delete: 'Delete',
            alert: 'Alert',
            warning: 'Warning',
            ok: 'OK',
            allFields: 'All Fields',
            formula: 'Formula',
            fieldExist: 'A field already exists in this name. Please enter a different name.',
            confirmText: 'A calculation field already exists in this name. Do you want to replace it?',
            noMatches: 'No matches',
            format: 'Summaries values by',
            edit: 'Edit',
            clear: 'Clear',
            formulaField: 'Drag and drop fields to formula',
            dragField: 'Drag field to formula',
            clearFilter: 'Clear',
            by: 'by',
            enterValue: 'Enter value',
            chooseDate: 'Enter date',
            all: 'All',
            multipleItems: 'Multiple items',
            /* tslint:disable */
            Equals: 'Equals',
            DoesNotEquals: 'Does Not Equal',
            BeginWith: 'Begins With',
            DoesNotBeginWith: 'Does Not Begin With',
            EndsWith: 'Ends With',
            DoesNotEndsWith: 'Does Not End With',
            Contains: 'Contains',
            DoesNotContains: 'Does Not Contain',
            GreaterThan: 'Greater Than',
            GreaterThanOrEqualTo: 'Greater Than Or Equal To',
            LessThan: 'Less Than',
            LessThanOrEqualTo: 'Less Than Or Equal To',
            Between: 'Between',
            NotBetween: 'Not Between',
            Before: 'Before',
            BeforeOrEqualTo: 'Before Or Equal To',
            After: 'After',
            AfterOrEqualTo: 'After Or Equal To',
            member: 'Member',
            label: 'Label',
            date: 'Date',
            value: 'Value',
            labelTextContent: 'Show the items for which the label',
            dateTextContent: 'Show the items for which the date',
            valueTextContent: 'Show the items for which',
            And: 'and',
            Sum: 'Sum',
            Count: 'Count',
            DistinctCount: 'Distinct Count',
            Product: 'Product',
            Avg: 'Avg',
            Min: 'Min',
            Max: 'Max',
            Index: 'Index',
            SampleStDev: 'Sample StDev',
            PopulationStDev: 'Population StDev',
            SampleVar: 'Sample Var',
            PopulationVar: 'Population Var',
            RunningTotals: 'Running Totals',
            DifferenceFrom: 'Difference From',
            PercentageOfDifferenceFrom: '% of Difference From',
            PercentageOfGrandTotal: '% of Grand Total',
            PercentageOfColumnTotal: '% of Column Total',
            PercentageOfRowTotal: '% of Row Total',
            PercentageOfParentTotal: '% of Parent Total',
            PercentageOfParentColumnTotal: '% of Parent Column Total',
            PercentageOfParentRowTotal: '% of Parent Row Total',
            MoreOption: 'More...',
            Years: 'Years',
            Quarters: 'Quarters',
            Months: 'Months',
            Days: 'Days',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Seconds: 'Seconds',
            /* tslint:enable */
            apply: 'APPLY',
            valueFieldSettings: 'Value field settings',
            sourceName: 'Field name :',
            sourceCaption: 'Field caption :',
            summarizeValuesBy: 'Summarize values by :',
            baseField: 'Base field :',
            baseItem: 'Base item :',
            example: 'e.g:',
            editorDataLimitMsg: ' more items. Search to refine further.',
            deferLayoutUpdate: 'Defer Layout Update',
            null: 'null',
            undefined: 'undefined',
            groupOutOfRange: 'Out of Range',
            fieldDropErrorAction: 'The field you are moving cannot be placed in that area of the report',
            memberType: 'Field Type',
            selectedHierarchy: 'Parent Hierarchy',
            formatString: 'Format String',
            expressionField: 'Expression',
            olapDropText: 'Example: [Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            customFormat: 'Enter custom format string',
            Measure: 'Measure',
            Dimension: 'Dimension',
            Standard: 'Standard',
            Currency: 'Currency',
            Percent: 'Percent',
            Custom: 'Custom',
            blank: '(Blank)',
            fieldTooltip: 'Drag and drop fields to create an expression. ' +
                'And, if you want to edit the existing the calculated fields! ' +
                'You can achieve it by simply selecting the field under "Calculated Members".',
            fieldTitle: 'Field Name',
            QuarterYear: 'Quarter Year',
            caption: 'Field Caption',
            copy: 'Copy'
        };
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        this.isDragging = false;
        this.captionData = [];
        this.wireEvent();
    };
    /* tslint:disable-next-line:max-line-length */
    PivotFieldList.prototype.frameCustomProperties = function (fieldListData, fieldList) {
        if (this.pivotGridModule) {
            this.pivotGridModule.updatePageSettings(false);
        }
        var pageSettings = this.pivotGridModule ? this.pivotGridModule.pageSettings : undefined;
        var isDrillThrough = this.pivotGridModule ?
            (this.pivotGridModule.allowDrillThrough || this.pivotGridModule.editSettings.allowEditing) : true;
        var enableValueSorting = this.pivotGridModule ? this.pivotGridModule.enableValueSorting : undefined;
        var customProperties;
        if (this.dataType === 'olap') {
            customProperties = {
                mode: '',
                savedFieldList: fieldList ? fieldList : undefined,
                savedFieldListData: fieldListData ? fieldListData : undefined,
                pageSettings: pageSettings,
                enableValueSorting: enableValueSorting,
                isDrillThrough: isDrillThrough,
                localeObj: this.localeObj
            };
        }
        else {
            customProperties = {
                mode: '',
                savedFieldList: undefined,
                pageSettings: pageSettings,
                enableValueSorting: enableValueSorting,
                isDrillThrough: isDrillThrough,
                localeObj: this.localeObj
            };
        }
        return customProperties;
    };
    /**
     * Initialize the control rendering
     * @returns void
     * @private
     */
    PivotFieldList.prototype.render = function () {
        var _this = this;
        this.trigger(events.load, { dataSourceSettings: this.dataSourceSettings }, function (observedArgs) {
            if (isBlazor()) {
                observedArgs.dataSourceSettings.dataSource = _this.dataSourceSettings.dataSource;
            }
            _this.dataSourceSettings = observedArgs.dataSourceSettings;
            addClass([_this.element], cls.ROOT);
            if (_this.enableRtl) {
                addClass([_this.element], cls.RTL);
            }
            else {
                removeClass([_this.element], cls.RTL);
            }
            if (_this.isAdaptive) {
                addClass([_this.element], cls.DEVICE);
            }
            else {
                removeClass([_this.element], cls.DEVICE);
            }
            if (_this.cssClass) {
                addClass([_this.element], _this.cssClass);
            }
            _this.notify(events.initialLoad, {});
        });
        if (isBlazor()) {
            this.renderComplete();
        }
    };
    /**
     * Binding events to the Pivot Field List element.

     */
    PivotFieldList.prototype.wireEvent = function () {
        this.on(events.initialLoad, this.generateData, this);
        this.on(events.dataReady, this.fieldListRender, this);
    };
    /**
     * Unbinding events from the element on widget destroy.

     */
    PivotFieldList.prototype.unWireEvent = function () {
        if (this.pivotGridModule && this.pivotGridModule.isDestroyed) {
            return;
        }
        this.off(events.initialLoad, this.generateData);
        this.off(events.dataReady, this.fieldListRender);
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    PivotFieldList.prototype.getPersistData = function () {
        var keyEntity = ['dataSourceSettings'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Get component name.
     * @returns string
     * @private
     */
    PivotFieldList.prototype.getModuleName = function () {
        return 'pivotfieldlist';
    };
    /**
     * Called internally if any of the property value changed.

     */
    PivotFieldList.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'locale':
                    this.refresh();
                    break;
                case 'enableRtl':
                    if (this.enableRtl) {
                        addClass([this.element], cls.RTL);
                    }
                    else {
                        removeClass([this.element], cls.RTL);
                    }
                    requireRefresh = true;
                    break;
            }
            if (requireRefresh) {
                this.fieldListRender();
            }
        }
    };
    /* tslint:disable */
    PivotFieldList.prototype.initEngine = function () {
        var _this = this;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings)
        };
        this.trigger(events.enginePopulating, args, function (observedArgs) {
            PivotUtil.updateDataSourceSettings(_this, observedArgs.dataSourceSettings);
            if (isBlazor()) {
                _this.dataSourceSettings.dataSource = _this.engineModule.data;
            }
            if (_this.dataType === 'pivot') {
                if (_this.dataSourceSettings.groupSettings && _this.dataSourceSettings.groupSettings.length > 0) {
                    var pivotDataSet = void 0;
                    if (isBlazor()) {
                        pivotDataSet = _this.engineModule.data;
                    }
                    else {
                        pivotDataSet = _this.dataSourceSettings.dataSource;
                    }
                    _this.clonedDataSet = (_this.clonedDataSet ? _this.clonedDataSet : PivotUtil.getClonedData(pivotDataSet));
                    _this.setProperties({ dataSourceSettings: { dataSource: [] } }, true);
                    _this.clonedReport = _this.clonedReport ? _this.clonedReport : extend({}, _this.dataSourceSettings, null, true);
                    _this.setProperties({ dataSourceSettings: { dataSource: pivotDataSet } }, true);
                }
                _this.engineModule.renderEngine(_this.dataSourceSettings, _this.frameCustomProperties(), _this.getValueCellInfo.bind(_this));
                _this.pivotFieldList = _this.engineModule.fieldList;
                var eventArgs = {
                    pivotFieldList: _this.pivotFieldList,
                    pivotValues: _this.engineModule.pivotValues
                };
                var this$_1 = _this;
                _this.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                    this$_1.pivotFieldList = observedArgs.pivotFieldList;
                    this$_1.engineModule.pivotValues = isBlazor() ? _this.engineModule.pivotValues : observedArgs.pivotValues;
                    this$_1.notify(events.dataReady, {});
                    this$_1.trigger(events.dataBound);
                });
            }
            else if (_this.dataType === 'olap') {
                _this.olapEngineModule.renderEngine(_this.dataSourceSettings, _this.frameCustomProperties(_this.olapEngineModule.fieldListData, _this.olapEngineModule.fieldList));
                _this.pivotFieldList = _this.olapEngineModule.fieldList;
                var eventArgs = {
                    pivotFieldList: _this.pivotFieldList,
                    pivotValues: _this.olapEngineModule.pivotValues
                };
                var this$_2 = _this;
                _this.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                    this$_2.pivotFieldList = observedArgs.pivotFieldList;
                    this$_2.olapEngineModule.pivotValues = isBlazor() ? _this.engineModule.pivotValues : observedArgs.pivotValues;
                    this$_2.notify(events.dataReady, {});
                    this$_2.trigger(events.dataBound);
                });
            }
        });
    };
    /* tslint:enable */
    /* tslint:enable */
    PivotFieldList.prototype.generateData = function () {
        this.pivotFieldList = {};
        if (this.dataSourceSettings && (this.dataSourceSettings.dataSource || this.dataSourceSettings.url)) {
            if ((this.dataSourceSettings.url !== '' && this.dataType === 'olap') ||
                this.dataSourceSettings.dataSource.length > 0) {
                if (this.dataType === 'pivot') {
                    this.engineModule.data = this.dataSourceSettings.dataSource;
                }
                this.initEngine();
            }
            else if (this.dataSourceSettings.dataSource instanceof DataManager) {
                setTimeout(this.getData.bind(this), 100);
            }
        }
        else {
            this.notify(events.dataReady, {});
            this.trigger(events.dataBound);
        }
    };
    PivotFieldList.prototype.getValueCellInfo = function (aggregateObj) {
        var args = aggregateObj;
        this.trigger(events.aggregateCellInfo, args);
        return args;
    };
    PivotFieldList.prototype.getData = function () {
        this.dataSourceSettings.dataSource.executeQuery(new Query()).then(this.executeQuery.bind(this));
    };
    PivotFieldList.prototype.executeQuery = function (e) {
        this.engineModule.data = e.result;
        this.initEngine();
    };
    PivotFieldList.prototype.fieldListRender = function () {
        this.element.innerHTML = '';
        if (this.renderMode === 'Popup' && this.dialogRenderer.fieldListDialog && !this.dialogRenderer.fieldListDialog.isDestroyed) {
            this.dialogRenderer.fieldListDialog.destroy();
            remove(document.getElementById(this.element.id + '_Wrapper'));
        }
        this.renderModule.render();
        this.fieldListSpinnerElement = this.renderMode === 'Popup' ?
            this.dialogRenderer.fieldListDialog.element : this.element.querySelector('.e-pivotfieldlist-wrapper');
        if (this.spinnerTemplate) {
            createSpinner({ target: this.fieldListSpinnerElement, template: this.spinnerTemplate }, this.createElement);
        }
        else {
            createSpinner({ target: this.fieldListSpinnerElement }, this.createElement);
        }
        var args;
        args = {
            pivotEngine: this.dataType === 'olap' ? this.olapEngineModule : this.engineModule,
            dataSourceSettings: this.dataSourceSettings,
            id: this.element.id,
            element: document.getElementById(this.element.id + '_Wrapper'),
            moduleName: this.getModuleName(),
            enableRtl: this.enableRtl,
            isAdaptive: this.isAdaptive,
            renderMode: this.renderMode,
            localeObj: this.localeObj,
            dataType: this.dataType
        };
        this.pivotCommon = new PivotCommon(args);
        this.pivotCommon.control = this;
        if (this.allowDeferLayoutUpdate) {
            this.clonedDataSource = extend({}, this.dataSourceSettings, null, true);
            this.clonedFieldList = extend({}, this.pivotFieldList, null, true);
        }
    };
    PivotFieldList.prototype.getFieldCaption = function (dataSourceSettings) {
        this.getFields(dataSourceSettings);
        if (this.captionData.length > 0) {
            var lnt = this.captionData.length;
            var engineModule = this.dataType === 'olap' ? this.olapEngineModule : this.engineModule;
            while (lnt--) {
                if (this.captionData[lnt]) {
                    for (var _i = 0, _a = this.captionData[lnt]; _i < _a.length; _i++) {
                        var obj = _a[_i];
                        if (obj) {
                            if (engineModule.fieldList[obj.name]) {
                                if (obj.caption) {
                                    engineModule.fieldList[obj.name].caption = obj.caption;
                                }
                                else {
                                    engineModule.fieldList[obj.name].caption = obj.name;
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            return;
        }
    };
    PivotFieldList.prototype.getFields = function (dataSourceSettings) {
        /* tslint:disable-next-line:max-line-length */
        this.captionData = [dataSourceSettings.rows, dataSourceSettings.columns, dataSourceSettings.values, dataSourceSettings.filters];
    };
    /* tslint:disable:max-func-body-length */
    /**
     * Updates the PivotEngine using dataSource from Pivot Field List component.
     * @method updateDataSource
     * @return {void}

     */
    PivotFieldList.prototype.updateDataSource = function (isTreeViewRefresh, isEngineRefresh) {
        if (this.pivotGridModule) {
            showSpinner(this.pivotGridModule.element);
        }
        showSpinner(this.fieldListSpinnerElement);
        var pivot = this;
        //setTimeout(() => {
        var isOlapDataRefreshed = false;
        var pageSettings = pivot.pivotGridModule && pivot.pivotGridModule.enableVirtualization ?
            pivot.pivotGridModule.pageSettings : undefined;
        var isCalcChange = Object.keys(pivot.lastCalcFieldInfo).length > 0 ? true : false;
        var isSorted = Object.keys(pivot.lastSortInfo).length > 0 ? true : false;
        var lastSortInfo = pivot.lastSortInfo;
        if (pivot.pivotGridModule && pivot.dataType === 'pivot') {
            pivot.pivotGridModule.lastSortInfo = {};
        }
        pivot.lastSortInfo = {};
        var isAggChange = Object.keys(pivot.lastAggregationInfo).length > 0 ? true : false;
        var isFiltered = Object.keys(pivot.lastFilterInfo).length > 0 ? true : false;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(pivot.dataSourceSettings)
        };
        pivot.trigger(events.enginePopulating, args, function (observedArgs) {
            if (!(pageSettings && (isSorted || isFiltered || isAggChange || isCalcChange))) {
                PivotUtil.updateDataSourceSettings(pivot, observedArgs.dataSourceSettings);
                PivotUtil.updateDataSourceSettings(pivot.pivotGridModule, observedArgs.dataSourceSettings);
            }
            if (isNullOrUndefined(isEngineRefresh)) {
                if (pivot.dataType === 'pivot') {
                    var customProperties = pivot.frameCustomProperties();
                    customProperties.savedFieldList = pivot.pivotFieldList;
                    if (pageSettings && (isSorted || isFiltered || isAggChange || isCalcChange)) {
                        if (isSorted) {
                            pivot.pivotGridModule.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                            pivot.engineModule.onSort(lastSortInfo);
                        }
                        if (isFiltered) {
                            pivot.engineModule.onFilter(pivot.lastFilterInfo, pivot.dataSourceSettings);
                            pivot.lastFilterInfo = {};
                        }
                        if (isAggChange) {
                            pivot.engineModule.onAggregation(pivot.lastAggregationInfo);
                            pivot.lastAggregationInfo = {};
                        }
                        if (isCalcChange) {
                            pivot.engineModule.onCalcOperation(pivot.lastCalcFieldInfo);
                            pivot.lastCalcFieldInfo = {};
                        }
                    }
                    else {
                        /* tslint:disable-next-line:max-line-length */
                        pivot.engineModule.renderEngine(pivot.dataSourceSettings, customProperties, pivot.getValueCellInfo.bind(pivot));
                    }
                }
                else {
                    isOlapDataRefreshed = pivot.updateOlapDataSource(pivot, isSorted, isCalcChange, isOlapDataRefreshed);
                }
                pivot.getFieldCaption(pivot.dataSourceSettings);
            }
            else {
                pivot.axisFieldModule.render();
                pivot.isRequiredUpdate = false;
            }
            var eventArgs = {
                dataSourceSettings: pivot.dataSourceSettings,
                pivotFieldList: pivot.dataType === 'pivot' ? pivot.engineModule.fieldList : pivot.olapEngineModule.fieldList,
                pivotValues: pivot.dataType === 'pivot' ? pivot.engineModule.pivotValues : pivot.olapEngineModule.pivotValues
            };
            pivot.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                var dataSource = pivot.dataSourceSettings.dataSource;
                if (isBlazor() && observedArgs.dataSourceSettings.dataSource instanceof Object) {
                    observedArgs.dataSourceSettings.dataSource = dataSource;
                }
                pivot.dataSourceSettings = observedArgs.dataSourceSettings;
                pivot.pivotCommon.dataSourceSettings = pivot.dataSourceSettings;
                pivot.pivotFieldList = observedArgs.pivotFieldList;
                if (pivot.dataType === 'olap') {
                    pivot.olapEngineModule.pivotValues = isBlazor() ? pivot.olapEngineModule.pivotValues : observedArgs.pivotValues;
                    pivot.pivotCommon.engineModule = pivot.olapEngineModule;
                }
                else {
                    pivot.engineModule.pivotValues = isBlazor() ? pivot.engineModule.pivotValues : observedArgs.pivotValues;
                    pivot.pivotCommon.engineModule = pivot.engineModule;
                }
                if (!isTreeViewRefresh && pivot.treeViewModule.fieldTable && !pivot.isAdaptive) {
                    pivot.notify(events.treeViewUpdate, {});
                }
                if (pivot.isRequiredUpdate) {
                    if (pivot.allowDeferLayoutUpdate) {
                        pivot.clonedDataSource = extend({}, pivot.dataSourceSettings, null, true);
                        pivot.clonedFieldList = extend({}, pivot.pivotFieldList, null, true);
                    }
                    pivot.updateView(pivot.pivotGridModule);
                }
                else if (pivot.renderMode === 'Popup' && pivot.allowDeferLayoutUpdate) {
                    pivot.pivotGridModule.engineModule = pivot.engineModule;
                    /* tslint:disable:align */
                    pivot.pivotGridModule.setProperties({
                        dataSourceSettings: pivot.dataSourceSettings.properties
                    }, true);
                    pivot.pivotGridModule.notify(events.uiUpdate, pivot);
                    hideSpinner(pivot.fieldListSpinnerElement);
                }
                if (pivot.renderMode === 'Popup' && pivot.pivotGridModule &&
                    pivot.pivotGridModule.allowDeferLayoutUpdate && !pivot.isRequiredUpdate) {
                    hideSpinner(pivot.fieldListSpinnerElement);
                    hideSpinner(pivot.pivotGridModule.element);
                }
                pivot.isRequiredUpdate = true;
                if (!pivot.pivotGridModule || isOlapDataRefreshed) {
                    hideSpinner(pivot.fieldListSpinnerElement);
                }
                else {
                    pivot.pivotGridModule.fieldListSpinnerElement = pivot.fieldListSpinnerElement;
                }
            });
        });
        //});
    };
    /* tslint:enable */
    PivotFieldList.prototype.updateOlapDataSource = function (pivot, isSorted, isCalcChange, isOlapDataRefreshed) {
        var customProperties = pivot.frameCustomProperties(pivot.olapEngineModule.fieldListData, pivot.olapEngineModule.fieldList);
        customProperties.savedFieldList = pivot.pivotFieldList;
        if (isCalcChange || isSorted) {
            pivot.olapEngineModule.savedFieldList = pivot.pivotFieldList;
            pivot.olapEngineModule.savedFieldListData = pivot.olapEngineModule.fieldListData;
            if (isCalcChange) {
                pivot.olapEngineModule.updateCalcFields(pivot.dataSourceSettings, pivot.lastCalcFieldInfo);
                pivot.lastCalcFieldInfo = {};
                isOlapDataRefreshed = pivot.olapEngineModule.dataFields[pivot.lastCalcFieldInfo.name] ? false : true;
                if (pivot.pivotGridModule) {
                    hideSpinner(pivot.pivotGridModule.element);
                }
            }
            else {
                pivot.olapEngineModule.onSort(pivot.dataSourceSettings);
            }
        }
        else {
            pivot.olapEngineModule.renderEngine(pivot.dataSourceSettings, customProperties);
        }
        return isOlapDataRefreshed;
    };
    /**
     * Updates the Pivot Field List component using dataSource from PivotView component.
     * @method updateControl
     * @return {void}
     */
    PivotFieldList.prototype.update = function (control) {
        if (isBlazor() && control !== undefined) {
            /* tslint:disable */
            var pivotId = control.ID;
            var pivotInstance = getInstance('#' + pivotId, PivotView);
            control = pivotInstance;
            /* tslint:enable */
        }
        if (control) {
            this.clonedDataSet = control.clonedDataSet;
            this.setProperties({ dataSourceSettings: control.dataSourceSettings }, true);
            this.engineModule = control.engineModule;
            this.olapEngineModule = control.olapEngineModule;
            this.dataType = control.dataType;
            this.pivotFieldList = this.dataType === 'olap' ? control.olapEngineModule.fieldList : control.engineModule.fieldList;
            if (this.renderMode === 'Popup') {
                this.pivotGridModule = control;
            }
            this.getFieldCaption(control.dataSourceSettings);
            this.pivotCommon.engineModule = this.dataType === 'olap' ? this.olapEngineModule : this.engineModule;
            this.pivotCommon.dataSourceSettings = this.dataSourceSettings;
            this.pivotCommon.control = this;
            if (this.treeViewModule.fieldTable && !this.isAdaptive) {
                this.notify(events.treeViewUpdate, {});
            }
            this.axisFieldModule.render();
            if (this.renderMode === 'Fixed' && this.allowDeferLayoutUpdate) {
                this.clonedDataSource = extend({}, this.dataSourceSettings, null, true);
                this.clonedFieldList = extend({}, this.pivotFieldList, null, true);
            }
        }
    };
    /**
     * Updates the PivotView component using dataSource from Pivot Field List component.
     * @method refreshTargetControl
     * @return {void}
     */
    PivotFieldList.prototype.updateView = function (control) {
        if (isBlazor() && control !== undefined) {
            /* tslint:disable */
            var pivotId = control.ID;
            var pivotInstance = getInstance('#' + pivotId, PivotView);
            control = pivotInstance;
            /* tslint:enable */
        }
        if (control) {
            control.clonedDataSet = this.clonedDataSet;
            control.setProperties({ dataSourceSettings: this.dataSourceSettings }, true);
            control.engineModule = this.engineModule;
            control.olapEngineModule = this.olapEngineModule;
            control.dataType = this.dataType;
            control.pivotValues = this.dataType === 'olap' ? this.olapEngineModule.pivotValues : this.engineModule.pivotValues;
            var eventArgs = {
                dataSourceSettings: control.dataSourceSettings,
                pivotValues: control.pivotValues
            };
            control.trigger(events.fieldListRefreshed, eventArgs);
            control.dataBind();
        }
    };
    /**
     * Called internally to trigger populate event.

     */
    PivotFieldList.prototype.triggerPopulateEvent = function () {
        var _this = this;
        var eventArgs = {
            dataSourceSettings: this.dataSourceSettings,
            pivotFieldList: this.dataType === 'olap' ? this.olapEngineModule.fieldList : this.engineModule.fieldList,
            pivotValues: this.dataType === 'olap' ? this.olapEngineModule.pivotValues : this.engineModule.pivotValues
        };
        this.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
            _this.dataSourceSettings = observedArgs.dataSourceSettings;
            _this.pivotFieldList = observedArgs.pivotFieldList;
            if (_this.dataType === 'olap') {
                _this.olapEngineModule.pivotValues = isBlazor() ? _this.olapEngineModule.pivotValues : observedArgs.pivotValues;
            }
            else {
                _this.engineModule.pivotValues = isBlazor() ? _this.engineModule.pivotValues : observedArgs.pivotValues;
            }
        });
    };
    /**
     * Destroys the Field Table component.
     * @method destroy
     * @return {void}
     */
    PivotFieldList.prototype.destroy = function () {
        this.unWireEvent();
        if (this.treeViewModule) {
            this.treeViewModule.destroy();
        }
        if (this.pivotButtonModule) {
            this.pivotButtonModule.destroy();
        }
        if (this.allowDeferLayoutUpdate && this.dialogRenderer &&
            this.dialogRenderer.deferUpdateCheckBox && !this.dialogRenderer.deferUpdateCheckBox.isDestroyed) {
            this.dialogRenderer.deferUpdateCheckBox.destroy();
        }
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
        removeClass([this.element], cls.ROOT);
        removeClass([this.element], cls.RTL);
        removeClass([this.element], cls.DEVICE);
        if (this.renderMode === 'Popup') {
            if (this.dialogRenderer.fieldListDialog && !this.dialogRenderer.fieldListDialog.isDestroyed) {
                this.dialogRenderer.fieldListDialog.destroy();
            }
            if (document.getElementById(this.element.id + '_Wrapper')) {
                remove(document.getElementById(this.element.id + '_Wrapper'));
            }
        }
    };
    __decorate([
        Complex({}, DataSourceSettings)
    ], PivotFieldList.prototype, "dataSourceSettings", void 0);
    __decorate([
        Property('Popup')
    ], PivotFieldList.prototype, "renderMode", void 0);
    __decorate([
        Property()
    ], PivotFieldList.prototype, "target", void 0);
    __decorate([
        Property('')
    ], PivotFieldList.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "allowCalculatedField", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "showValuesButton", void 0);
    __decorate([
        Property(false)
    ], PivotFieldList.prototype, "allowDeferLayoutUpdate", void 0);
    __decorate([
        Property(1000)
    ], PivotFieldList.prototype, "maxNodeLimitInMemberEditor", void 0);
    __decorate([
        Property(true)
    ], PivotFieldList.prototype, "loadOnDemandInMemberEditor", void 0);
    __decorate([
        Property()
    ], PivotFieldList.prototype, "spinnerTemplate", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "load", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "enginePopulating", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "enginePopulated", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "onFieldDropped", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "aggregateCellInfo", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "created", void 0);
    __decorate([
        Event()
    ], PivotFieldList.prototype, "destroyed", void 0);
    PivotFieldList = __decorate([
        NotifyPropertyChanges
    ], PivotFieldList);
    return PivotFieldList;
}(Component));
export { PivotFieldList };
