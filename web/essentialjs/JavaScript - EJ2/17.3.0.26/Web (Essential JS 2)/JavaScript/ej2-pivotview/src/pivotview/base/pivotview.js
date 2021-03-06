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
import { Property, Browser, Component, createElement, setStyleAttribute, append, isBlazor } from '@syncfusion/ej2-base';
import { EventHandler, Complex, extend, ChildProperty, Collection, isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { Internationalization, L10n, NotifyPropertyChanges, compile, formatUnit } from '@syncfusion/ej2-base';
import { removeClass, addClass, Event, setValue } from '@syncfusion/ej2-base';
import { updateBlazorTemplate, resetBlazorTemplate } from '@syncfusion/ej2-base';
import { PivotEngine } from '../../base/engine';
import { Tooltip, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { Render } from '../renderer/render';
import { DataSourceSettings } from '../model/datasourcesettings';
import { GridSettings } from '../model/gridsettings';
import { Grid, Reorder, Resize, getObject } from '@syncfusion/ej2-grids';
import { ExcelExport } from '../actions/excel-export';
import { PDFExport } from '../actions/pdf-export';
import { KeyboardInteraction } from '../actions/keyboard';
import { PivotContextMenu } from '../../common/popups/context-menu';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { VirtualScroll } from '../actions/virtualscroll';
import { DrillThrough } from '../actions/drill-through';
import { PivotUtil } from '../../base/util';
import { PivotChart } from '../../pivotchart/index';
import { ChartSettings } from '../model/chartsettings';
import { OlapEngine } from '../../base/olap/engine';
/**
 * It holds the settings of Grouping Bar.
 */
var GroupingBarSettings = /** @class */ (function (_super) {
    __extends(GroupingBarSettings, _super);
    function GroupingBarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showFilterIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showSortIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showRemoveIcon", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "showValueTypeIcon", void 0);
    __decorate([
        Property('Both')
    ], GroupingBarSettings.prototype, "displayMode", void 0);
    __decorate([
        Property(true)
    ], GroupingBarSettings.prototype, "allowDragAndDrop", void 0);
    return GroupingBarSettings;
}(ChildProperty));
export { GroupingBarSettings };
/**
 * Configures the edit behavior of the Grid.
 */
var CellEditSettings = /** @class */ (function (_super) {
    __extends(CellEditSettings, _super);
    function CellEditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowAdding", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowEditing", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowDeleting", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "allowCommandColumns", void 0);
    __decorate([
        Property('Normal')
    ], CellEditSettings.prototype, "mode", void 0);
    __decorate([
        Property(true)
    ], CellEditSettings.prototype, "allowEditOnDblClick", void 0);
    __decorate([
        Property(true)
    ], CellEditSettings.prototype, "showConfirmDialog", void 0);
    __decorate([
        Property(false)
    ], CellEditSettings.prototype, "showDeleteConfirmDialog", void 0);
    return CellEditSettings;
}(ChildProperty));
export { CellEditSettings };
/**
 * Configures the conditional based hyper link settings.
 */
var ConditionalSettings = /** @class */ (function (_super) {
    __extends(ConditionalSettings, _super);
    function ConditionalSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "measure", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "label", void 0);
    __decorate([
        Property('NotEquals')
    ], ConditionalSettings.prototype, "conditions", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "value1", void 0);
    __decorate([
        Property()
    ], ConditionalSettings.prototype, "value2", void 0);
    return ConditionalSettings;
}(ChildProperty));
export { ConditionalSettings };
/**
 * It holds the settings of Hyperlink.
 */
var HyperlinkSettings = /** @class */ (function (_super) {
    __extends(HyperlinkSettings, _super);
    function HyperlinkSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showRowHeaderHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showColumnHeaderHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showValueCellHyperlink", void 0);
    __decorate([
        Property(false)
    ], HyperlinkSettings.prototype, "showSummaryCellHyperlink", void 0);
    __decorate([
        Collection([], ConditionalSettings)
    ], HyperlinkSettings.prototype, "conditionalSettings", void 0);
    __decorate([
        Property()
    ], HyperlinkSettings.prototype, "headerText", void 0);
    __decorate([
        Property('')
    ], HyperlinkSettings.prototype, "cssClass", void 0);
    return HyperlinkSettings;
}(ChildProperty));
export { HyperlinkSettings };
/**
 * It holds the option for configure the chart and grid view.
 */
var DisplayOption = /** @class */ (function (_super) {
    __extends(DisplayOption, _super);
    function DisplayOption() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Table')
    ], DisplayOption.prototype, "view", void 0);
    __decorate([
        Property('Table')
    ], DisplayOption.prototype, "primary", void 0);
    return DisplayOption;
}(ChildProperty));
export { DisplayOption };
/**
 * Represents the PivotView component.
 * ```html
 * <div id="PivotView"></div>
 * <script>
 *  var pivotviewObj = new PivotView({ enableGroupingBar: true });
 *  pivotviewObj.appendTo("#pivotview");
 * </script>
 * ```
 */
var PivotView = /** @class */ (function (_super) {
    __extends(PivotView, _super);
    /**
     * Constructor for creating the widget
     * @param  {PivotViewModel} options?
     * @param  {string|HTMLElement} element?
     */
    function PivotView(options, element) {
        var _this_1 = _super.call(this, options, element) || this;
        _this_1.verticalScrollScale = 1;
        _this_1.horizontalScrollScale = 1;
        _this_1.scrollerBrowserLimit = 500000;
        _this_1.lastSortInfo = {};
        _this_1.lastFilterInfo = {};
        _this_1.lastAggregationInfo = {};
        _this_1.lastCalcFieldInfo = {};
        _this_1.isScrolling = false;
        _this_1.shiftLockedPos = [];
        _this_1.savedSelectedCellsPos = [];
        _this_1.isPopupClicked = false;
        _this_1.isMouseDown = false;
        _this_1.isMouseUp = false;
        _this_1.fieldsType = {};
        _this_1.defaultItems = {};
        _this_1.isCellBoxMultiSelection = false;
        _this_1.gridHeaderCellInfo = [];
        _this_1.gridCellCollection = {};
        _this_1.rowRangeSelection = { enable: false, startIndex: 0, endIndex: 0 };
        _this_1.resizeInfo = {};
        _this_1.scrollPosObject = {
            vertical: 0, horizontal: 0, verticalSection: 0,
            horizontalSection: 0, top: 0, left: 0, scrollDirection: { direction: '', position: 0 }
        };
        _this_1.pivotColumns = [];
        _this_1.totColWidth = 0;
        _this_1.posCount = 0;
        _this_1.isModified = false;
        _this_1.needsID = true;
        _this_1.pivotRefresh = Component.prototype.refresh;
        _this_1.pivotView = _this_1;
        setValue('mergePersistData', _this_1.mergePersistPivotData, _this_1);
        return _this_1;
    }
    PivotView_1 = PivotView;
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}

     */
    PivotView.prototype.requiredModules = function () {
        var modules = [];
        var isCommonRequire;
        isCommonRequire = true;
        modules.push({ args: [this], member: 'grouping' });
        if (this.allowConditionalFormatting) {
            modules.push({ args: [this], member: 'conditionalformatting' });
        }
        if (this.allowNumberFormatting) {
            isCommonRequire = true;
            modules.push({ args: [this], member: 'numberformatting' });
        }
        if (this.allowCalculatedField) {
            isCommonRequire = true;
            modules.push({ args: [this], member: 'calculatedfield' });
        }
        // if (this.showGroupingBar || !this.showGroupingBar) {
        //     isCommonRequire = true;
        //     modules.push({ args: [this], member: 'grouping' });
        // }
        if (this.showToolbar && this.toolbar.length > 0) {
            isCommonRequire = true;
            modules.push({ args: [this], member: 'toolbar' });
        }
        if (this.showFieldList) {
            isCommonRequire = true;
            modules.push({ args: [this], member: 'fieldlist' });
        }
        if (this.allowExcelExport) {
            modules.push({ args: [this], member: 'excelExport' });
        }
        if (this.allowPdfExport) {
            modules.push({ args: [this], member: 'pdfExport' });
        }
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'virtualscroll' });
        }
        if (this.gridSettings) {
            if (this.gridSettings.contextMenuItems) {
                isCommonRequire = true;
            }
        }
        if (isCommonRequire) {
            modules.push({ args: [this], member: 'common' });
        }
        return modules;
    };
    /**
     * For internal use only - Initializing internal properties;
     * @private
     */
    PivotView.prototype.preRender = function () {
        if (this.dataSourceSettings && this.dataSourceSettings.providerType === 'SSAS') {
            this.dataType = 'olap';
            this.olapEngineModule = new OlapEngine();
        }
        else {
            this.dataType = 'pivot';
            this.engineModule = new PivotEngine();
        }
        this.initProperties();
        this.isAdaptive = Browser.isDevice;
        this.renderToolTip();
        this.keyboardModule = new KeyboardInteraction(this);
        this.contextMenuModule = new PivotContextMenu(this);
        this.globalize = new Internationalization(this.locale);
        this.defaultLocale = {
            grandTotal: 'Grand Total',
            total: 'Total',
            value: 'Value',
            noValue: 'No value',
            row: 'Row',
            column: 'Column',
            collapse: 'Collapse',
            expand: 'Expand',
            rowAxisPrompt: 'Drop row here',
            columnAxisPrompt: 'Drop column here',
            valueAxisPrompt: 'Drop value here',
            filterAxisPrompt: 'Drop filter here',
            filter: 'Filter',
            filtered: 'Filtered',
            sort: 'Sort',
            filters: 'Filters',
            rows: 'Rows',
            columns: 'Columns',
            values: 'Values',
            close: 'Close',
            cancel: 'Cancel',
            delete: 'Delete',
            CalculatedField: 'Calculated Field',
            createCalculatedField: 'Create Calculated Field',
            fieldName: 'Enter the field name',
            error: 'Error',
            invalidFormula: 'Invalid formula.',
            dropText: 'Example: ("Sum(Order_Count)" + "Sum(In_Stock)") * 250',
            dropTextMobile: 'Add fields and edit formula here.',
            dropAction: 'Calculated field cannot be place in any other region except value axis.',
            alert: 'Alert',
            warning: 'Warning',
            ok: 'OK',
            search: 'Search',
            drag: 'Drag',
            remove: 'Remove',
            allFields: 'All Fields',
            formula: 'Formula',
            addToRow: 'Add to Row',
            addToColumn: 'Add to Column',
            addToValue: 'Add to Value',
            addToFilter: 'Add to Filter',
            emptyData: 'No records to display',
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
            all: 'All',
            multipleItems: 'Multiple items',
            /* tslint:disable */
            member: 'Member',
            label: 'Label',
            date: 'Date',
            enterValue: 'Enter value',
            chooseDate: 'Enter date',
            Before: 'Before',
            BeforeOrEqualTo: 'Before Or Equal To',
            After: 'After',
            AfterOrEqualTo: 'After Or Equal To',
            labelTextContent: 'Show the items for which the label',
            dateTextContent: 'Show the items for which the date',
            valueTextContent: 'Show the items for which',
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
            And: 'and',
            Sum: 'Sum',
            Count: 'Count',
            DistinctCount: 'Distinct Count',
            Product: 'Product',
            Avg: 'Avg',
            Min: 'Min',
            SampleVar: 'Sample Var',
            PopulationVar: 'Population Var',
            RunningTotals: 'Running Totals',
            Max: 'Max',
            Index: 'Index',
            SampleStDev: 'Sample StDev',
            PopulationStDev: 'Population StDev',
            PercentageOfRowTotal: '% of Row Total',
            PercentageOfParentTotal: '% of Parent Total',
            PercentageOfParentColumnTotal: '% of Parent Column Total',
            PercentageOfParentRowTotal: '% of Parent Row Total',
            DifferenceFrom: 'Difference From',
            PercentageOfDifferenceFrom: '% of Difference From',
            PercentageOfGrandTotal: '% of Grand Total',
            PercentageOfColumnTotal: '% of Column Total',
            MoreOption: 'More...',
            /* tslint:enable */
            NotEquals: 'Not Equals',
            AllValues: 'All Values',
            conditionalFormating: 'Conditional Formatting',
            apply: 'APPLY',
            condition: 'Add Condition',
            formatLabel: 'Format',
            valueFieldSettings: 'Value field settings',
            baseField: 'Base field :',
            baseItem: 'Base item :',
            summarizeValuesBy: 'Summarize values by :',
            sourceName: 'Field name :',
            sourceCaption: 'Field caption :',
            example: 'e.g:',
            editorDataLimitMsg: ' more items. Search to refine further.',
            details: 'Details',
            manageRecords: 'Manage Records',
            Years: 'Years',
            Quarters: 'Quarters',
            Months: 'Months',
            Days: 'Days',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Seconds: 'Seconds',
            save: 'Save a report',
            new: 'Create a new report',
            load: 'Load',
            saveAs: 'Save as current report',
            rename: 'Rename a current report',
            deleteReport: 'Delete a current report',
            export: 'Export',
            subTotals: 'Sub totals',
            grandTotals: 'Grand totals',
            reportName: 'Report Name :',
            pdf: 'PDF',
            excel: 'Excel',
            csv: 'CSV',
            png: 'PNG',
            jpeg: 'JPEG',
            svg: 'SVG',
            mdxQuery: 'MDX Query',
            showSubTotals: 'Show sub totals',
            doNotShowSubTotals: 'Do not show sub totals',
            showSubTotalsRowsOnly: 'Show sub totals rows only',
            showSubTotalsColumnsOnly: 'Show sub totals columns only',
            showGrandTotals: 'Show grand totals',
            doNotShowGrandTotals: 'Do not show grand totals',
            showGrandTotalsRowsOnly: 'Show grand totals rows only',
            showGrandTotalsColumnsOnly: 'Show grand totals columns only',
            fieldList: 'Show fieldlist',
            grid: 'Show table',
            toolbarFormatting: 'Conditional formatting',
            chart: 'Chart',
            reportMsg: 'Please enter vaild report name!!!',
            reportList: 'Report list',
            removeConfirm: 'Are you sure want to delete this report?',
            emptyReport: 'No reports found!!',
            bar: 'Bar',
            line: 'Line',
            area: 'Area',
            scatter: 'Scatter',
            polar: 'Polar',
            of: 'of',
            emptyFormat: 'No format found!!!',
            emptyInput: 'Enter a value',
            newReportConfirm: 'Want to save changes to report?',
            emptyReportName: 'Enter a report name',
            qtr: 'Qtr',
            null: 'null',
            undefined: 'undefined',
            groupOutOfRange: 'Out of Range',
            fieldDropErrorAction: 'The field you are moving cannot be placed in that area of the report',
            aggregate: 'Aggregate',
            drillThrough: 'Drill Through',
            ascending: 'Ascending',
            descending: 'Descending',
            number: 'Number',
            currency: 'Currency',
            percentage: 'Percentage',
            formatType: 'Format Type',
            customText: 'Currency Symbol',
            symbolPosition: 'Symbol Position',
            left: 'Left',
            right: 'Right',
            grouping: 'Grouping',
            true: 'True',
            false: 'False',
            decimalPlaces: 'Decimal Places',
            numberFormat: 'Number Formatting',
            memberType: 'Field Type',
            formatString: 'Format String',
            expressionField: 'Expression',
            customFormat: 'Enter custom format string',
            selectedHierarchy: 'Parent Hierarchy',
            olapDropText: 'Example: [Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            Percent: 'Percent',
            Currency: 'Currency',
            Custom: 'Custom',
            Measure: 'Measure',
            Dimension: 'Dimension',
            Standard: 'Standard',
            blank: '(Blank)',
            fieldTooltip: 'Drag and drop fields to create an expression. ' +
                'And, if you want to edit the existing the calculated fields! ' +
                'You can achieve it by simply selecting the field under "Calculated Members".',
            fieldTitle: 'Field Name',
            QuarterYear: 'Quarter Year',
            drillError: 'Cannot show the raw items of calculated fields.',
            caption: 'Field Caption',
            copy: 'Copy',
            defaultReport: 'Default report',
            customFormatString: 'Custom Format',
            invalidFormat: 'Invalid Format.'
        };
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
        this.renderContextMenu();
        this.isDragging = false;
        this.addInternalEvents();
        //setCurrencyCode(this.currencyCode);
    };
    PivotView.prototype.onBeforeTooltipOpen = function (args) {
        args.element.classList.add('e-pivottooltipwrap');
    };
    PivotView.prototype.renderToolTip = function () {
        if (this.showTooltip) {
            this.tooltip = new Tooltip({
                target: 'td.e-valuescontent',
                showTipPointer: false,
                enableRtl: this.enableRtl,
                beforeRender: this.setToolTip.bind(this),
                beforeOpen: this.onBeforeTooltipOpen
            });
            this.tooltip.isStringTemplate = true;
            this.tooltip.appendTo(this.element);
        }
        else if (this.tooltip) {
            this.tooltip.destroy();
        }
    };
    PivotView.prototype.renderContextMenu = function () {
        if (this.gridSettings.contextMenuItems) {
            var conmenuItems = [];
            var customItems = [];
            var exportItems = [];
            var aggItems = [];
            var expItems = [];
            var aggregateItems = [];
            for (var _i = 0, _a = this.gridSettings.contextMenuItems; _i < _a.length; _i++) {
                var item = _a[_i];
                if (typeof item === 'string' && this.getDefaultItems().indexOf(item) !== -1) {
                    if (item.toString().toLowerCase().indexOf('aggregate') !== -1) {
                        aggregateItems = [
                            { text: this.localeObj.getConstant('Sum'), id: this.element.id + '_AggSum' },
                            { text: this.localeObj.getConstant('DistinctCount'), id: this.element.id + '_AggDistinctCount' },
                            { text: this.localeObj.getConstant('Count'), id: this.element.id + '_AggCount' },
                            { text: this.localeObj.getConstant('Product'), id: this.element.id + '_AggProduct' },
                            { text: this.localeObj.getConstant('Avg'), id: this.element.id + '_AggAvg' },
                            { text: this.localeObj.getConstant('Max'), id: this.element.id + '_AggMax' },
                            { text: this.localeObj.getConstant('Min'), id: this.element.id + '_AggMin' },
                            { text: this.localeObj.getConstant('MoreOption'), id: this.element.id + '_AggMoreOption' }
                        ];
                    }
                    else if (item.toString().toLowerCase().indexOf('export') !== -1) {
                        exportItems.push(this.buildDefaultItems(item));
                    }
                    else {
                        conmenuItems.push(this.buildDefaultItems(item));
                    }
                }
                else if (typeof item !== 'string') {
                    customItems.push(item);
                }
            }
            if (aggregateItems.length > 0) {
                var aggregateGroup = this.buildDefaultItems('Aggregate');
                aggregateGroup.items = aggregateItems;
                aggItems.push(aggregateGroup);
            }
            if (exportItems.length > 0) {
                var exportGroupItems = this.buildDefaultItems('export');
                exportGroupItems.items = exportItems;
                expItems.push(exportGroupItems);
            }
            this.gridSettings.contextMenuItems = [];
            Array.prototype.push.apply(this.gridSettings.contextMenuItems, aggItems);
            Array.prototype.push.apply(this.gridSettings.contextMenuItems, conmenuItems);
            Array.prototype.push.apply(this.gridSettings.contextMenuItems, expItems);
            Array.prototype.push.apply(this.gridSettings.contextMenuItems, customItems);
        }
    };
    PivotView.prototype.getDefaultItems = function () {
        return ['Drillthrough', 'Expand',
            'Collapse', 'Pdf Export', 'Excel Export', 'Csv Export', 'Sort Ascending', 'Sort Descending',
            'Aggregate', 'CalculatedField'];
    };
    PivotView.prototype.buildDefaultItems = function (item) {
        var menuItem;
        switch (item) {
            case 'Aggregate':
                menuItem = {
                    text: this.localeObj.getConstant('aggregate'), target: 'th.e-valuesheader,td.e-valuescontent,.e-stot',
                    id: this.element.id + '_aggregate'
                };
                break;
            case 'CalculatedField':
                menuItem = {
                    text: this.localeObj.getConstant('CalculatedField'), target: 'td.e-valuescontent',
                    id: this.element.id + '_CalculatedField'
                };
                break;
            case 'Drillthrough':
                menuItem = {
                    text: this.localeObj.getConstant('drillThrough'), target: 'td.e-valuescontent',
                    id: this.element.id + '_drillthrough_menu', iconCss: cls.PIVOTVIEW_GRID + ' ' + cls.ICON
                };
                break;
            case 'export':
                menuItem = {
                    text: this.localeObj.getConstant('export'), target: 'td.e-valuescontent',
                    id: this.element.id + '_exporting', iconCss: cls.PIVOTVIEW_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Pdf Export':
                menuItem = {
                    text: this.localeObj.getConstant('pdf'), id: this.element.id + '_pdf',
                    iconCss: cls.GRID_PDF_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Excel Export':
                menuItem = {
                    text: this.localeObj.getConstant('excel'), id: this.element.id + '_excel',
                    iconCss: cls.GRID_EXCEL_EXPORT + ' ' + cls.ICON
                };
                break;
            case 'Csv Export':
                menuItem = {
                    text: this.localeObj.getConstant('csv'), id: this.element.id + '_csv',
                    iconCss: cls.GRID_CSV_EXPORT + ' ' + cls.ICON,
                };
                break;
            case 'Expand':
                menuItem = {
                    text: this.localeObj.getConstant('expand'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_expand', iconCss: cls.PIVOTVIEW_EXPAND + ' ' + cls.ICON
                };
                break;
            case 'Collapse':
                menuItem = {
                    text: this.localeObj.getConstant('collapse'), target: 'td.e-rowsheader,.e-columnsheader',
                    id: this.element.id + '_collapse', iconCss: cls.PIVOTVIEW_COLLAPSE + ' ' + cls.ICON
                };
                break;
            case 'Sort Ascending':
                menuItem = {
                    text: this.localeObj.getConstant('ascending'), target: 'th.e-valuesheader,.e-stot',
                    id: this.element.id + '_sortasc', iconCss: cls.ICON_ASC + ' ' + cls.ICON
                };
                break;
            case 'Sort Descending':
                menuItem = {
                    text: this.localeObj.getConstant('descending'), target: 'th.e-valuesheader,.e-stot',
                    id: this.element.id + '_sortdesc', iconCss: cls.ICON_DESC + ' ' + cls.ICON
                };
                break;
        }
        this.defaultItems[item] = {
            text: menuItem.text, id: menuItem.id,
            target: menuItem.target, iconCss: menuItem.iconCss
        };
        return this.defaultItems[item];
    };
    /* tslint:disable:align */
    PivotView.prototype.initProperties = function () {
        this.pivotRefresh = Component.prototype.refresh;
        this.isScrolling = false;
        this.setProperties({ pivotValues: [] }, true);
        this.scrollPosObject = {
            vertical: 0, horizontal: 0, verticalSection: 0,
            horizontalSection: 0, top: 0, left: 0, scrollDirection: { direction: '', position: 0 }
        };
        this.queryCellInfo = this.gridSettings.queryCellInfo ? this.gridSettings.queryCellInfo.bind(this) : undefined;
        this.headerCellInfo = this.gridSettings.headerCellInfo ? this.gridSettings.headerCellInfo.bind(this) : undefined;
        this.resizing = this.gridSettings.resizing ? this.gridSettings.resizing.bind(this) : undefined;
        this.resizeStop = this.gridSettings.resizeStop ? this.gridSettings.resizeStop.bind(this) : undefined;
        this.pdfHeaderQueryCellInfo = this.gridSettings.pdfHeaderQueryCellInfo ?
            this.gridSettings.pdfHeaderQueryCellInfo.bind(this) : undefined;
        this.pdfQueryCellInfo = this.gridSettings.pdfQueryCellInfo ? this.gridSettings.pdfQueryCellInfo.bind(this) : undefined;
        this.excelHeaderQueryCellInfo = this.gridSettings.excelHeaderQueryCellInfo ?
            this.gridSettings.excelHeaderQueryCellInfo.bind(this) : undefined;
        this.excelQueryCellInfo = this.gridSettings.excelQueryCellInfo ?
            this.gridSettings.excelQueryCellInfo.bind(this) : undefined;
        this.columnDragStart = this.gridSettings.columnDragStart ? this.gridSettings.columnDragStart.bind(this) : undefined;
        this.columnDrag = this.gridSettings.columnDrag ? this.gridSettings.columnDrag.bind(this) : undefined;
        this.columnDrop = this.gridSettings.columnDrop ? this.gridSettings.columnDrop.bind(this) : undefined;
        this.beforeColumnsRender = this.gridSettings.columnRender ? this.gridSettings.columnRender : undefined;
        this.selected = this.gridSettings.cellSelected ? this.gridSettings.cellSelected : undefined;
        this.cellDeselected = this.gridSettings.cellDeselected ? this.gridSettings.cellDeselected : undefined;
        this.rowSelected = this.gridSettings.rowSelected ? this.gridSettings.rowSelected : undefined;
        this.rowDeselected = this.gridSettings.rowDeselected ? this.gridSettings.rowDeselected : undefined;
        this.chartTooltipRender = this.chartSettings.tooltipRender ? this.chartSettings.tooltipRender : undefined;
        this.chartLoaded = this.chartSettings.loaded ? this.chartSettings.loaded : undefined;
        this.chartLoad = this.chartSettings.load ? this.chartSettings.load : undefined;
        this.chartResized = this.chartSettings.resized ? this.chartSettings.resized : undefined;
        this.chartAxisLabelRender = this.chartSettings.axisLabelRender ? this.chartSettings.axisLabelRender : undefined;
        this.contextMenuClick = this.gridSettings.contextMenuClick ? this.gridSettings.contextMenuClick : undefined;
        this.contextMenuOpen = this.gridSettings.contextMenuOpen ? this.gridSettings.contextMenuOpen : undefined;
        this.beforePdfExport = this.gridSettings.beforePdfExport ? this.gridSettings.beforePdfExport.bind(this) : undefined;
        this.beforeExcelExport = this.gridSettings.beforeExcelExport ? this.gridSettings.beforeExcelExport.bind(this) : undefined;
        if (this.gridSettings.rowHeight === null) {
            this.setProperties({ gridSettings: { rowHeight: this.isAdaptive ? 48 : 36 } }, true);
        }
        this.element.style.height = '100%';
        if (this.enableVirtualization) {
            this.updatePageSettings(true);
            if (this.allowExcelExport) {
                PivotView_1.Inject(ExcelExport);
            }
            if (this.allowPdfExport) {
                PivotView_1.Inject(PDFExport);
            }
            if (this.editSettings.allowEditing) {
                PivotView_1.Inject(DrillThrough);
            }
        }
        this.isCellBoxMultiSelection = this.gridSettings.allowSelection &&
            this.gridSettings.selectionSettings.cellSelectionMode === 'Box' &&
            this.gridSettings.selectionSettings.mode === 'Cell' && this.gridSettings.selectionSettings.type === 'Multiple';
        if (this.displayOption.view !== 'Table') {
            this.chartModule = new PivotChart();
        }
        this.currentView = this.currentView ? this.currentView : (this.displayOption.view === 'Both' ?
            this.displayOption.primary : this.displayOption.view);
    };
    /**

     */
    PivotView.prototype.updatePageSettings = function (isInit) {
        if (this.enableVirtualization) {
            var colValues = 1;
            var rowValues = 1;
            if (this.dataSourceSettings.values.length > 1 && this.dataType === 'pivot') {
                if (this.dataSourceSettings.valueAxis === 'row') {
                    rowValues = this.dataSourceSettings.values.length;
                }
                else {
                    colValues = this.dataSourceSettings.values.length;
                }
            }
            var heightAsNumber = this.getHeightAsNumber();
            if (isNaN(heightAsNumber)) {
                heightAsNumber = this.element.offsetHeight;
            }
            this.pageSettings = {
                columnCurrentPage: isInit ? 1 : this.pageSettings.columnCurrentPage,
                rowCurrentPage: isInit ? 1 : this.pageSettings.rowCurrentPage,
                columnSize: Math.ceil((Math.floor((this.getWidthAsNumber()) /
                    this.gridSettings.columnWidth) - 1) / colValues),
                rowSize: Math.ceil(Math.floor((heightAsNumber) / this.gridSettings.rowHeight) / rowValues),
                allowDataCompression: this.allowDataCompression
            };
        }
    };
    /**
     * Initialize the control rendering
     * @returns void

     */
    PivotView.prototype.render = function () {
        var _this_1 = this;
        this.cellTemplateFn = this.templateParser(this.cellTemplate);
        if (this.spinnerTemplate) {
            createSpinner({ target: this.element, template: this.spinnerTemplate }, this.createElement);
        }
        else {
            createSpinner({ target: this.element }, this.createElement);
        }
        var loadArgs = {
            dataSourceSettings: this.dataSourceSettings,
            pivotview: isBlazor() ? undefined : this,
            fieldsType: {}
        };
        this.trigger(events.load, loadArgs, function (observedArgs) {
            if (isBlazor()) {
                observedArgs.dataSourceSettings.dataSource = _this_1.dataSourceSettings.dataSource;
            }
            _this_1.dataSourceSettings = observedArgs.dataSourceSettings;
            _this_1.fieldsType = observedArgs.fieldsType;
            _this_1.updateClass();
            _this_1.notify(events.initSubComponent, {});
            _this_1.notify(events.initialLoad, {});
            if (_this_1.isAdaptive) {
                _this_1.contextMenuModule.render();
            }
            _this_1.notify(events.initToolbar, {});
        });
        if (isBlazor()) {
            this.renderComplete();
        }
    };
    /**
     * Register the internal events.
     * @returns void

     */
    PivotView.prototype.addInternalEvents = function () {
        this.on(events.initialLoad, this.generateData, this);
        this.on(events.dataReady, this.renderPivotGrid, this);
        this.on(events.contentReady, this.onContentReady, this);
    };
    /**
     * De-Register the internal events.
     * @returns void

     */
    PivotView.prototype.removeInternalEvents = function () {
        this.off(events.initialLoad, this.generateData);
        this.off(events.dataReady, this.renderPivotGrid);
        this.off(events.contentReady, this.onContentReady);
    };
    /**
     * Get the Pivot widget properties to be maintained in the persisted state.
     * @returns {string}
     */
    PivotView.prototype.getPersistData = function () {
        var keyEntity = ['dataSourceSettings', 'pivotValues', 'gridSettings', 'chartSettings', 'displayOption'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Loads pivot Layout
     * @param {string} persistData - Specifies the persist data to be loaded to pivot.
     * @returns {void}
     */
    PivotView.prototype.loadPersistData = function (persistData) {
        var pivotData;
        /* tslint:disable */
        if (isBlazor()) {
            pivotData = persistData;
            pivotData.dataSourceSettings.dataSource = this.dataSourceSettings.dataSource;
        }
        else {
            pivotData = JSON.parse(persistData);
        }
        this.setProperties({
            gridSettings: pivotData.gridSettings,
            pivotValues: pivotData.pivotValues,
            chartSettings: pivotData.chartSettings,
            displayOption: pivotData.displayOption
        }, true);
        /* tslint:enable */
        this.dataSourceSettings = pivotData.dataSourceSettings;
    };
    PivotView.prototype.mergePersistPivotData = function () {
        var blazdataSource;
        if (isBlazor()) {
            blazdataSource = this.dataSourceSettings.dataSource;
        }
        var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        if (!(isNullOrUndefined(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
        if (this.dataSourceSettings.dataSource instanceof Object && isBlazor()) {
            this.setProperties({ dataSourceSettings: { dataSource: blazdataSource } }, true);
        }
    };
    /**
     * Method to open conditional formatting dialog
     */
    PivotView.prototype.showConditionalFormattingDialog = function () {
        if (this.conditionalFormattingModule) {
            this.conditionalFormattingModule.showConditionalFormattingDialog();
        }
    };
    /**
     * Method to open calculated field dialog
     */
    PivotView.prototype.createCalculatedFieldDialog = function () {
        if (this.calculatedFieldModule) {
            this.calculatedFieldModule.createCalculatedFieldDialog();
        }
    };
    /**
     * It returns the Module name.
     * @returns string

     */
    PivotView.prototype.getModuleName = function () {
        return 'pivotview';
    };
    /**
     * Copy the selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     * @returns {void}

     */
    PivotView.prototype.copy = function (withHeader) {
        this.grid.copy(withHeader);
    };
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./api-pivotgrid.html#printmode-string).
     * @returns {void}

     */
    // public print(): void {
    //     this.grid.print();
    // }
    /* tslint:disable:max-func-body-length */
    /**
     * Called internally if any of the property value changed.
     * @returns void

     */
    PivotView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'dataSourceSettings':
                case 'hyperlinkSettings':
                case 'allowDrillThrough':
                case 'editSettings':
                case 'allowDataCompression':
                    if (newProp.dataSourceSettings && Object.keys(newProp.dataSourceSettings).length === 1
                        && newProp.dataSourceSettings.groupSettings) {
                        var groupSettings = extend([], this.dataSourceSettings.groupSettings, null, true);
                        var data = PivotUtil.getClonedData(this.clonedDataSet);
                        var dataSource = extend({}, this.clonedReport, null, true);
                        dataSource.dataSource = data;
                        if (newProp.dataSourceSettings.groupSettings.length === 0 ||
                            newProp.dataSourceSettings.groupSettings.length > 0) {
                            dataSource.groupSettings =
                                newProp.dataSourceSettings.groupSettings.length > 0 ? groupSettings : [];
                            this.setProperties({ dataSourceSettings: dataSource }, true);
                        }
                    }
                    if (newProp.dataSourceSettings && Object.keys(newProp.dataSourceSettings).length === 1
                        && Object.keys(newProp.dataSourceSettings)[0] === 'dataSource') {
                        this.engineModule.fieldList = null;
                    }
                    this.notify(events.initialLoad, {});
                    break;
                case 'pivotValues':
                case 'displayOption':
                case 'height':
                case 'width':
                    if (!this.showToolbar && newProp.displayOption && Object.keys(newProp.displayOption).length === 1 &&
                        newProp.displayOption.view) {
                        this.currentView = (newProp.displayOption.view === 'Both' ?
                            this.displayOption.primary : newProp.displayOption.view);
                        if (this.showGroupingBar || this.showFieldList) {
                            if (this.showFieldList && this.pivotFieldListModule) {
                                this.pivotFieldListModule.destroy();
                            }
                            if (this.showGroupingBar && this.groupingBarModule) {
                                this.groupingBarModule.destroy();
                            }
                            this.notify(events.initSubComponent, this);
                        }
                        if (!this.grid && newProp.displayOption.view !== 'Chart') {
                            this.renderEmptyGrid();
                            if (newProp.displayOption.view === 'Table') {
                                if (this.chartModule) {
                                    this.chartModule.destroy();
                                    this.chart = undefined;
                                    this.chartModule = undefined;
                                }
                            }
                        }
                        else if (!this.chartModule && this.displayOption.view !== 'Table') {
                            this.chartModule = new PivotChart();
                        }
                    }
                    this.notify(events.dataReady, {});
                    break;
                case 'gridSettings':
                    this.lastGridSettings = newProp.gridSettings;
                    this.renderModule.updateGridSettings();
                    this.isCellBoxMultiSelection = this.gridSettings.allowSelection &&
                        this.gridSettings.selectionSettings.cellSelectionMode === 'Box' &&
                        this.gridSettings.selectionSettings.mode === 'Cell' && this.gridSettings.selectionSettings.type === 'Multiple';
                    break;
                case 'chartSettings':
                    this.chartModule.loadChart(this, this.chartSettings);
                    break;
                case 'locale':
                case 'currencyCode':
                case 'enableRtl':
                    if (this.tooltip) {
                        this.tooltip.destroy();
                    }
                    _super.prototype.refresh.call(this);
                    this.updateClass();
                    break;
                case 'enableValueSorting':
                    this.enableValueSorting = newProp.enableValueSorting;
                    this.updateDataSource();
                    break;
                case 'showGroupingBar':
                    if (this.element.querySelector('.e-grouping-bar')) {
                        this.element.querySelector('.e-grouping-bar').remove();
                    }
                    this.renderPivotGrid();
                    break;
                case 'groupingBarSettings':
                    this.axisFieldModule.render();
                    break;
                case 'showTooltip':
                    this.renderToolTip();
                    break;
                case 'toolbar':
                    if (this.toolbarModule) {
                        this.toolbarModule.refreshToolbar();
                    }
                    break;
            }
        }
    };
    PivotView.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    PivotView.prototype.getCellTemplate = function () {
        return this.cellTemplateFn;
    };
    /**
     * Render the UI section of PivotView.
     * @returns void

     */
    PivotView.prototype.renderPivotGrid = function () {
        if (this.currentView === 'Table') {
            /* tslint:disable-next-line */
            if (this.cellTemplate && isBlazor()) {
                resetBlazorTemplate(this.element.id + '_cellTemplate', 'CellTemplate');
            }
        }
        if (this.chartModule) {
            this.chartModule.engineModule = this.engineModule;
            this.chartModule.loadChart(this, this.chartSettings);
            if (this.enableRtl && this.chart) {
                addClass([this.chart.element], cls.PIVOTCHART_LTR);
            }
        }
        if (this.showFieldList || this.showGroupingBar) {
            this.notify(events.uiUpdate, this);
            if (this.pivotFieldListModule && this.allowDeferLayoutUpdate) {
                this.pivotFieldListModule.clonedDataSource = extend({}, this.dataSourceSettings, null, true);
            }
        }
        if (this.enableVirtualization) {
            this.virtualscrollModule = new VirtualScroll(this);
        }
        if (this.displayOption.view !== 'Chart') {
            if (this.hyperlinkSettings) {
                this.isRowCellHyperlink = (this.hyperlinkSettings.showRowHeaderHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isColumnCellHyperlink = (this.hyperlinkSettings.showColumnHeaderHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isValueCellHyperlink = (this.hyperlinkSettings.showValueCellHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.isSummaryCellHyperlink = (this.hyperlinkSettings.showSummaryCellHyperlink ?
                    true : this.hyperlinkSettings.showHyperlink ? true : false);
                this.applyHyperlinkSettings();
            }
            if (this.allowDrillThrough || this.editSettings.allowEditing) {
                this.drillThroughModule = new DrillThrough(this);
            }
            this.renderModule = new Render(this);
            this.renderModule.render();
        }
        else if (this.grid) {
            remove(this.grid.element);
        }
        this.trigger(events.dataBound);
        if (this.allowConditionalFormatting) {
            this.applyFormatting(this.pivotValues);
        }
        if (this.showToolbar) {
            if (this.displayOption.view === 'Both' && this.chart && this.grid) {
                if (this.showGroupingBar && this.groupingBarModule && this.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.refreshUI();
                }
                if (this.toolbarModule && this.toolbarModule.toolbar) {
                    this.toolbarModule.toolbar.width = this.getGridWidthAsNumber() - 2;
                }
                this.chart.element.style.width = formatUnit(this.getGridWidthAsNumber());
                this.chart.width = formatUnit(this.getGridWidthAsNumber());
                if (this.currentView === 'Table') {
                    this.grid.element.style.display = '';
                    this.chart.element.style.display = 'none';
                }
                else {
                    this.grid.element.style.display = 'none';
                    this.chart.element.style.display = '';
                }
            }
        }
        if (this.toolbarModule) {
            if (this.showFieldList && this.element.querySelector('#' + this.element.id + '_PivotFieldList')) {
                this.element.querySelector('#' + this.element.id + '_PivotFieldList').style.display = 'none';
            }
            if (this.toolbarModule && this.toolbarModule.action !== 'New' && this.toolbarModule.action !== 'Load'
                && this.toolbarModule.action !== 'Remove') {
                this.isModified = true;
            }
            else {
                this.toolbarModule.action = '';
            }
        }
    };
    /* tslint:disable:max-func-body-length */
    /**
     * Updates the PivotEngine using dataSource from Pivot View component.
     * @method updateDataSource
     * @return {void}

     */
    PivotView.prototype.updateDataSource = function (isRefreshGrid) {
        showSpinner(this.element);
        var pivot = this;
        //setTimeout(() => {
        /* tslint:disable:align */
        var isSorted = Object.keys(pivot.lastSortInfo).length > 0 ? true : false;
        var isFiltered = Object.keys(pivot.lastFilterInfo).length > 0 ? true : false;
        var isAggChange = Object.keys(pivot.lastAggregationInfo).length > 0 ? true : false;
        var isCalcChange = Object.keys(pivot.lastCalcFieldInfo).length > 0 ? true : false;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(pivot.dataSourceSettings)
        };
        pivot.trigger(events.enginePopulating, args, function (observedArgs) {
            if (!(pivot.enableVirtualization && (isSorted || isFiltered || isAggChange || isCalcChange))) {
                PivotUtil.updateDataSourceSettings(pivot, observedArgs.dataSourceSettings);
            }
            pivot.updatePageSettings(false);
            if (pivot.dataType === 'pivot' && pivot.enableVirtualization && (isSorted || isFiltered || isAggChange || isCalcChange)) {
                if (isSorted) {
                    pivot.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                    pivot.engineModule.onSort(pivot.lastSortInfo);
                    pivot.lastSortInfo = {};
                }
                if (isAggChange) {
                    pivot.engineModule.onAggregation(pivot.lastAggregationInfo);
                    pivot.lastAggregationInfo = {};
                }
                if (isCalcChange) {
                    pivot.engineModule.onCalcOperation(pivot.lastCalcFieldInfo);
                    pivot.lastCalcFieldInfo = {};
                }
                if (isFiltered) {
                    pivot.engineModule.onFilter(pivot.lastFilterInfo, pivot.dataSourceSettings);
                    pivot.lastFilterInfo = {};
                }
                pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
            }
            else {
                if (pivot.dataType === 'olap') {
                    /* tslint:disable:align */
                    var customProperties = {
                        mode: '',
                        savedFieldList: pivot.olapEngineModule.fieldList,
                        savedFieldListData: pivot.olapEngineModule.fieldListData,
                        pageSettings: pivot.pageSettings,
                        enableValueSorting: pivot.enableValueSorting,
                        isDrillThrough: (pivot.allowDrillThrough || pivot.editSettings.allowEditing),
                        localeObj: pivot.localeObj
                    };
                    if (isCalcChange || isSorted) {
                        pivot.olapEngineModule.savedFieldList = pivot.olapEngineModule.fieldList;
                        pivot.olapEngineModule.savedFieldListData = pivot.olapEngineModule.fieldListData;
                        if (isCalcChange) {
                            pivot.olapEngineModule.updateCalcFields(pivot.dataSourceSettings, pivot.lastCalcFieldInfo);
                            pivot.lastCalcFieldInfo = {};
                        }
                        else {
                            pivot.olapEngineModule.onSort(pivot.dataSourceSettings);
                            pivot.lastSortInfo = {};
                        }
                    }
                    else {
                        pivot.olapEngineModule.renderEngine(pivot.dataSourceSettings, customProperties);
                    }
                    pivot.setProperties({ pivotValues: pivot.olapEngineModule.pivotValues }, true);
                }
                else {
                    /* tslint:disable:align */
                    var customProperties = {
                        mode: '',
                        savedFieldList: pivot.engineModule.fieldList,
                        pageSettings: pivot.pageSettings,
                        enableValueSorting: pivot.enableValueSorting,
                        isDrillThrough: (pivot.allowDrillThrough || pivot.editSettings.allowEditing),
                        localeObj: pivot.localeObj,
                        fieldsType: pivot.fieldsType
                    };
                    pivot.engineModule.renderEngine(pivot.dataSourceSettings, customProperties, pivot.getValueCellInfo.bind(pivot));
                    pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
                }
            }
            var eventArgs = {
                dataSourceSettings: pivot.dataSourceSettings,
                pivotValues: isBlazor() ? pivot.dataType === 'olap' ? pivot.olapEngineModule.pivotValues :
                    pivot.engineModule.pivotValues : pivot.pivotValues
            };
            pivot.trigger(events.enginePopulated, eventArgs, function (observedArgs) {
                var dataSource = pivot.dataSourceSettings.dataSource;
                if (isBlazor() && observedArgs.dataSourceSettings.dataSource instanceof Object) {
                    observedArgs.dataSourceSettings.dataSource = dataSource;
                }
                pivot.dataSourceSettings = observedArgs.dataSourceSettings;
                if (pivot.dataType === 'olap') {
                    pivot.olapEngineModule.pivotValues = isBlazor() ? pivot.olapEngineModule.pivotValues : observedArgs.pivotValues;
                    pivot.setProperties({ pivotValues: pivot.olapEngineModule.pivotValues }, true);
                }
                else {
                    pivot.engineModule.pivotValues = isBlazor() ? pivot.engineModule.pivotValues : observedArgs.pivotValues;
                    pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
                }
                pivot.pivotCommon.engineModule = pivot.dataType === 'olap' ? pivot.olapEngineModule : pivot.engineModule;
                pivot.pivotCommon.dataSourceSettings = pivot.dataSourceSettings;
                pivot.renderPivotGrid();
            });
        });
        //});
    };
    /**
     * Export Pivot widget data to Excel file(.xlsx).
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    /* tslint:disable-next-line:no-any */
    PivotView.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        if (this.enableVirtualization) {
            this.excelExportModule.exportToExcel('Excel');
        }
        else {
            this.grid.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        }
    };
    /**
     * Export PivotGrid data to CSV file.
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    /* tslint:disable-next-line:no-any */
    PivotView.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        if (this.enableVirtualization) {
            this.excelExportModule.exportToExcel('CSV');
        }
        else {
            this.grid.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        }
    };
    /**
     * Export Pivot widget data to PDF document.
     * @param  {pdfExportProperties} PdfExportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    PivotView.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        if (this.enableVirtualization) {
            this.pdfExportModule.exportToPDF();
        }
        else {
            this.grid.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
        }
    };
    /**
     * Export method for the chart.
     * @param type - Defines the export type.
     * @param fileName - Defines file name of export document.
     * @param orientation - Defines the page orientation on pdf export(0 for Portrait mode, 1 for Landscape mode).
     * @param width - Defines width of the export document.
     * @param height - Defines height of the export document.
     */
    PivotView.prototype.chartExport = function (type, fileName, orientation, width, height) {
        if (this.chart && this.chart.enableExport) {
            this.chart.exportModule.export(type, fileName, orientation, null, width, height);
        }
    };
    /**
     * Print method for the chart.
     */
    PivotView.prototype.printChart = function () {
        if (this.chart) {
            this.chart.print();
        }
    };
    /* tslint:disable:max-func-body-length */
    PivotView.prototype.onDrill = function (target, chartDrillInfo) {
        var delimiter = (this.dataSourceSettings.drilledMembers[0] && this.dataSourceSettings.drilledMembers[0].delimiter) ?
            this.dataSourceSettings.drilledMembers[0].delimiter : '**';
        var fieldName = '';
        var axis = '';
        var action = '';
        if (chartDrillInfo) {
            fieldName = chartDrillInfo.fieldName;
            axis = chartDrillInfo.cell.axis;
            action = chartDrillInfo.isDrilled ? 'up' : 'down';
        }
        else {
            fieldName = target.parentElement.getAttribute('fieldname');
            axis = target.parentElement.classList.contains(cls.ROWSHEADER) ? 'row' : 'column';
            action = target.classList.contains(cls.COLLAPSE) ? 'up' : 'down';
        }
        if (this.dataType === 'pivot') {
            var currentCell = chartDrillInfo ? chartDrillInfo.cell :
                this.engineModule.pivotValues[Number(target.parentElement.getAttribute('index'))][Number(target.parentElement.getAttribute('aria-colindex'))];
            var memberName = currentCell.valueSort.levelName.
                split(this.engineModule.valueSortSettings.headerDelimiter).join(delimiter);
            var fieldAvail = false;
            if (this.dataSourceSettings.drilledMembers.length === 0) {
                /* tslint:disable-next-line:max-line-length */
                this.setProperties({ dataSourceSettings: { drilledMembers: [{ name: fieldName, items: [memberName], delimiter: delimiter }] } }, true);
            }
            else {
                for (var fCnt = 0; fCnt < this.dataSourceSettings.drilledMembers.length; fCnt++) {
                    var field = this.dataSourceSettings.drilledMembers[fCnt];
                    memberName = memberName.split(delimiter).join(field.delimiter ? field.delimiter : delimiter);
                    delimiter = field.delimiter = field.delimiter ? field.delimiter : delimiter;
                    if (field.name === fieldName) {
                        fieldAvail = true;
                        var memIndex = field.items.indexOf(memberName);
                        if (memIndex > -1) {
                            field.items.splice(memIndex, 1);
                        }
                        else {
                            field.items.push(memberName);
                        }
                    }
                    else {
                        continue;
                    }
                }
                if (!fieldAvail) {
                    this.dataSourceSettings.drilledMembers.push({ name: fieldName, items: [memberName], delimiter: delimiter });
                }
            }
            showSpinner(this.element);
            var pivot = this;
            //setTimeout(() => {
            var drilledItem = {
                fieldName: fieldName, memberName: memberName, delimiter: delimiter,
                axis: axis,
                action: action,
                currentCell: currentCell
            };
            pivot.trigger(events.drill, {
                drillInfo: drilledItem,
                pivotview: isBlazor() ? undefined : pivot
            });
            if (pivot.enableVirtualization) {
                pivot.engineModule.drilledMembers = pivot.dataSourceSettings.drilledMembers;
                pivot.engineModule.onDrill(drilledItem);
            }
            else {
                pivot.engineModule.generateGridData(pivot.dataSourceSettings);
            }
            pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
            pivot.renderPivotGrid();
            //});
        }
        else {
            this.onOlapDrill(fieldName, axis, action, delimiter, target, chartDrillInfo);
        }
    };
    /* tslint:disable-next-line:max-line-length */
    PivotView.prototype.onOlapDrill = function (fieldName, axis, action, delimiter, target, chartDrillInfo) {
        var currentCell = chartDrillInfo ? chartDrillInfo.cell :
            this.olapEngineModule.pivotValues[Number(target.parentElement.getAttribute('index'))][Number(target.parentElement.getAttribute('aria-colindex'))];
        var tupInfo = axis === 'row' ? this.olapEngineModule.tupRowInfo[currentCell.ordinal] :
            this.olapEngineModule.tupColumnInfo[currentCell.ordinal];
        var drillInfo = {
            axis: axis,
            action: action,
            fieldName: fieldName,
            delimiter: delimiter,
            memberName: tupInfo.uNameCollection,
            currentCell: currentCell
        };
        /* tslint:disable-next-line:max-line-length */
        var fieldPos = tupInfo.drillInfo.map(function (item) { return item.hierarchy; }).indexOf(currentCell.hierarchy.toString());
        if (drillInfo && drillInfo.action === 'down') {
            this.olapEngineModule.drilledSets[currentCell.actualText] = tupInfo.members[fieldPos];
            var fields = drillInfo.memberName.split('::');
            var member = '';
            for (var pos = 0; pos <= fieldPos; pos++) {
                var field = fields[pos];
                var members = field.split('~~');
                member = member + (member !== '' ? '~~' : '') + members[members.length - 1];
            }
            drillInfo.memberName = member;
            var drillItem = [];
            for (var _i = 0, _a = this.dataSourceSettings.drilledMembers; _i < _a.length; _i++) {
                var field = _a[_i];
                if (field.name === drillInfo.fieldName) {
                    drillItem.push(field);
                }
            }
            if (drillItem.length > 0) {
                if (drillItem[0].delimiter) {
                    member = member.replace(/~~/g, drillItem[0].delimiter);
                }
                var index = PivotUtil.inArray(member, drillItem[0].items);
                if (index === -1) {
                    drillItem[0].items.push(member);
                }
            }
            else {
                var drilledMember = { name: drillInfo.fieldName, items: [member], delimiter: '~~' };
                if (!this.dataSourceSettings.drilledMembers) {
                    this.dataSourceSettings.drilledMembers = [drilledMember];
                }
                else {
                    this.dataSourceSettings.drilledMembers.push(drilledMember);
                }
            }
            this.olapEngineModule.updateDrilledInfo(this.dataSourceSettings);
        }
        else {
            delete this.olapEngineModule.drilledSets[currentCell.actualText];
            var drillSets = this.olapEngineModule.getDrilledSets(drillInfo.memberName, currentCell, fieldPos, axis);
            var keys = Object.keys(drillSets);
            for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
                var key = keys_1[_b];
                var drillSet = drillSets[key];
                for (var i = 0, cnt = this.dataSourceSettings.drilledMembers.length; i < cnt; i++) {
                    var drillItem = this.dataSourceSettings.drilledMembers[i];
                    var member = drillSet;
                    if (drillItem.delimiter) {
                        member = drillSet.replace(/~~/g, drillItem.delimiter);
                    }
                    var items = [];
                    for (var itemPos = 0; itemPos < drillItem.items.length; itemPos++) {
                        if (drillItem.items[itemPos].indexOf(member) !== 0) {
                            items[items.length] = drillItem.items[itemPos];
                        }
                    }
                    drillItem.items = items;
                }
            }
            var drilledMembers = [];
            for (var _c = 0, _d = this.dataSourceSettings.drilledMembers; _c < _d.length; _c++) {
                var fields = _d[_c];
                if (fields.items.length > 0) {
                    drilledMembers.push(fields);
                }
            }
            this.setProperties({ dataSourceSettings: { drilledMembers: drilledMembers } }, true);
            this.olapEngineModule.updateDrilledInfo(this.dataSourceSettings);
        }
        this.setProperties({ pivotValues: this.olapEngineModule.pivotValues }, true);
        this.renderPivotGrid();
    };
    PivotView.prototype.onContentReady = function () {
        if (this.currentView !== 'Table') {
            /* tslint:disable-next-line */
            if (this.cellTemplate && isBlazor()) {
                resetBlazorTemplate(this.element.id + '_cellTemplate', 'CellTemplate');
            }
        }
        this.isPopupClicked = false;
        if (this.showFieldList) {
            hideSpinner(this.pivotFieldListModule.fieldListSpinnerElement);
        }
        else if (this.fieldListSpinnerElement) {
            hideSpinner(this.fieldListSpinnerElement);
        }
        if (!this.isEmptyGrid) {
            hideSpinner(this.element);
            this.trigger(events.dataBound);
        }
        else {
            this.isEmptyGrid = false;
        }
        if (this.grid) {
            var engine = this.dataType === 'pivot' ? this.engineModule : this.olapEngineModule;
            if (this.enableVirtualization && engine) {
                if (this.element.querySelector('.' + cls.MOVABLECONTENT_DIV) &&
                    !this.element.querySelector('.' + cls.MOVABLECONTENT_DIV).querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                    this.virtualDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
                    this.element.querySelector('.' + cls.MOVABLECONTENT_DIV).appendChild(this.virtualDiv);
                }
                if (this.element.querySelector('.' + cls.MOVABLEHEADER_DIV) &&
                    !this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                    this.virtualHeaderDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
                    this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).appendChild(this.virtualHeaderDiv);
                }
                else {
                    this.virtualHeaderDiv =
                        this.element.querySelector('.' + cls.MOVABLEHEADER_DIV).querySelector('.' + cls.VIRTUALTRACK_DIV);
                }
                var movableTable = this.element.querySelector('.' + cls.MOVABLECONTENT_DIV).querySelector('.e-table');
                var vHeight = (this.gridSettings.rowHeight * engine.rowCount + 0.1 - movableTable.clientHeight);
                if (vHeight > this.scrollerBrowserLimit) {
                    this.verticalScrollScale = vHeight / this.scrollerBrowserLimit;
                    vHeight = this.scrollerBrowserLimit;
                }
                var vWidth = (this.gridSettings.columnWidth * engine.columnCount
                    - this.grid.columns[0].width);
                if (vWidth > this.scrollerBrowserLimit) {
                    this.horizontalScrollScale = vWidth / this.scrollerBrowserLimit;
                    vWidth = this.scrollerBrowserLimit;
                }
                setStyleAttribute(this.virtualDiv, {
                    height: (vHeight > 0.1 ? vHeight : 0.1) + 'px',
                    width: (vWidth > 0.1 ? vWidth : 0.1) + 'px'
                });
                setStyleAttribute(this.virtualHeaderDiv, {
                    height: 0, width: (vWidth > 0.1 ? vWidth : 0.1) + 'px'
                });
                var mCnt = this.element.querySelector('.' + cls.MOVABLECONTENT_DIV);
                var fCnt = this.element.querySelector('.' + cls.FROZENCONTENT_DIV);
                var mHdr = this.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
                var verOffset = (mCnt.scrollTop > this.scrollerBrowserLimit) ?
                    mCnt.querySelector('.' + cls.TABLE).style.transform.split(',')[1].trim() :
                    -(((mCnt.scrollTop * this.verticalScrollScale) - this.scrollPosObject.verticalSection - mCnt.scrollTop)) + 'px)';
                var horiOffset = (mCnt.scrollLeft > this.scrollerBrowserLimit) ?
                    (mCnt.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim() + ',') :
                    'translate(' + -(((mCnt.scrollLeft * this.horizontalScrollScale) -
                        this.scrollPosObject.horizontalSection - mCnt.scrollLeft)) + 'px,';
                setStyleAttribute(fCnt.querySelector('.e-table'), {
                    transform: 'translate(' + 0 + 'px,' + verOffset
                });
                setStyleAttribute(mCnt.querySelector('.e-table'), {
                    transform: horiOffset + verOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: horiOffset + 0 + 'px)'
                });
            }
            if (this.showGroupingBar) {
                this.element.style.minWidth = '400px';
                this.grid.element.style.minWidth = '400px';
            }
            else {
                this.element.style.minWidth = '310px';
                this.grid.element.style.minWidth = '310px';
            }
        }
        this.unwireEvents();
        this.wireEvents();
        this.isChartLoaded = false;
        /* tslint:disable-next-line */
        if (this.cellTemplate && isBlazor()) {
            var gridCells = Object.keys(this.gridCellCollection);
            if (gridCells.length > 0) {
                for (var _i = 0, gridCells_1 = gridCells; _i < gridCells_1.length; _i++) {
                    var cell = gridCells_1[_i];
                    /* tslint:disable-next-line */
                    var templateObject = {};
                    var tCell = this.gridCellCollection[cell];
                    var colIndex = Number(tCell.getAttribute('aria-colindex'));
                    var rowIndex = Number(tCell.getAttribute('index'));
                    var pivotCell = this.pivotValues[rowIndex][colIndex];
                    templateObject.axis = pivotCell.axis;
                    if (templateObject.axis === 'column' || templateObject.axis === 'row') {
                        templateObject.fieldName = pivotCell.valueSort.axis;
                        templateObject.formattedText = pivotCell.formattedText;
                    }
                    else {
                        templateObject.fieldName = pivotCell.actualText;
                        templateObject.formattedText = pivotCell.formattedText;
                        templateObject.value = pivotCell.value;
                    }
                    /* tslint:disable-next-line */
                    append([].slice.call(this.getCellTemplate()(templateObject, this, 'cellTemplate', this.element.id + '_cellTemplate')), tCell);
                }
                updateBlazorTemplate(this.element.id + '_cellTemplate', 'CellTemplate', this);
            }
        }
    };
    PivotView.prototype.setToolTip = function (args) {
        var colIndex = Number(args.target.getAttribute('aria-colindex'));
        var rowIndex = Number(args.target.getAttribute('index'));
        var cell = this.pivotValues[rowIndex][colIndex];
        this.tooltip.content = '';
        var aggregateType;
        var caption;
        var hasField = false;
        if (cell && this.dataType === 'olap') {
            if (this.olapEngineModule.fieldList[cell.actualText]) {
                var field = this.olapEngineModule.fieldList[cell.actualText];
                aggregateType = field.isCalculatedField ? field.type : field.aggregateType;
                caption = field.caption;
                hasField = true;
            }
        }
        else {
            if (cell && this.engineModule.fieldList[cell.actualText]) {
                var field = this.engineModule.fieldList[cell.actualText];
                aggregateType = field.aggregateType;
                caption = field.caption;
                hasField = true;
            }
        }
        if (cell && hasField) {
            this.tooltip.content = '<div class=' + cls.PIVOTTOOLTIP + '><p class=' + cls.TOOLTIP_HEADER + '>' +
                this.localeObj.getConstant('row') + ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' +
                this.getRowText(rowIndex, 0) +
                '</p></br><p class=' + cls.TOOLTIP_HEADER + '>' +
                this.localeObj.getConstant('column') + ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' +
                this.getColText(0, colIndex, rowIndex) + '</p></br>' + (cell.actualText !== '' ? ('<p class=' + cls.TOOLTIP_HEADER + '>' +
                (this.dataType === 'olap' ? '' :
                    (this.localeObj.getConstant(aggregateType) + ' ' + this.localeObj.getConstant('of') + ' ')) +
                caption + ':</p><p class=' + cls.TOOLTIP_CONTENT + '>' +
                (((cell.formattedText === '0' || cell.formattedText === '') ?
                    this.localeObj.getConstant('noValue') : cell.formattedText)) + '</p></div>') : '');
        }
        else {
            args.cancel = true;
        }
    };
    PivotView.prototype.getRowText = function (rowIndex, colIndex) {
        var cell = this.pivotValues[rowIndex][colIndex];
        var level = cell.level;
        var rowText = cell.type === 'grand sum' ? this.localeObj.getConstant('grandTotal') : cell.formattedText;
        while (level > 0 || cell.index === undefined) {
            rowIndex--;
            cell = this.pivotValues[rowIndex][colIndex];
            if (cell.index !== undefined) {
                if (level > cell.level) {
                    rowText = rowText + ' - ' + cell.formattedText;
                    level = level - 1;
                }
            }
        }
        return rowText.split(' - ').reverse().join(' - ');
    };
    PivotView.prototype.getColText = function (rowIndex, colIndex, limit) {
        var cell = this.pivotValues[0][colIndex];
        var axis = cell.axis;
        var colText = cell.type === 'grand sum' ? this.localeObj.getConstant('grandTotal') : cell.formattedText;
        while (axis !== 'value' && limit > rowIndex) {
            rowIndex++;
            if (this.pivotValues[rowIndex]) {
                cell = this.pivotValues[rowIndex][colIndex];
                axis = cell.axis;
                if (cell.type !== 'sum' && cell.type !== 'grand sum' && axis !== 'value') {
                    colText = colText + ' - ' + cell.formattedText;
                }
            }
        }
        return colText;
    };
    PivotView.prototype.updateClass = function () {
        if (this.enableRtl) {
            addClass([this.element], cls.RTL);
        }
        else {
            removeClass([this.element], cls.RTL);
        }
        if (this.isAdaptive) {
            addClass([this.element], cls.DEVICE);
        }
        else {
            removeClass([this.element], cls.DEVICE);
        }
    };
    PivotView.prototype.mouseRclickHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        else if (e.which === 0) {
            this.lastCellClicked = e.target;
        }
        this.lastCellClicked = e.target;
    };
    PivotView.prototype.mouseDownHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        if (this.isCellBoxMultiSelection) {
            this.isMouseDown = true;
            this.isMouseUp = false;
            var parent_1 = this.parentAt(e.target, 'TH');
            this.clearSelection(parent_1, e, Number(parent_1.getAttribute('aria-colindex')), Number(parent_1.getAttribute('index')));
            this.lastSelectedElement = undefined;
        }
    };
    PivotView.prototype.mouseMoveHandler = function (e) {
        if (this.isCellBoxMultiSelection) {
            e.preventDefault();
            if (this.isMouseDown && e.target) {
                var ele = e.target;
                var parentElement = this.parentAt(ele, 'TH');
                if (this.lastSelectedElement && this.lastSelectedElement !== parentElement &&
                    parentElement.classList.contains(cls.SELECTED_BGCOLOR)) {
                    this.lastSelectedElement.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                    this.lastSelectedElement.classList.remove(cls.SELECTED_BGCOLOR);
                    this.lastSelectedElement = parentElement;
                }
                else {
                    this.lastSelectedElement = parentElement;
                    parentElement.classList.add(cls.CELL_ACTIVE_BGCOLOR);
                    parentElement.classList.add(cls.SELECTED_BGCOLOR);
                }
                this.renderModule.selected();
            }
        }
    };
    PivotView.prototype.mouseUpHandler = function (e) {
        if (this.isCellBoxMultiSelection) {
            this.isMouseDown = false;
            this.isMouseUp = true;
        }
    };
    PivotView.prototype.parentAt = function (target, tagName) {
        while (target.tagName !== tagName) {
            if (target.parentElement) {
                target = target.parentElement;
            }
            else {
                break;
            }
        }
        return target;
    };
    PivotView.prototype.mouseClickHandler = function (e) {
        if (e.which === 3) {
            this.lastCellClicked = e.target;
        }
        else if (e.which === 0) {
            this.lastCellClicked = e.target;
        }
        var target = e.target;
        if ((target.classList.contains('e-headercell') ||
            target.classList.contains('e-headercelldiv') ||
            target.classList.contains('e-rowsheader') ||
            target.classList.contains('e-rowcell') ||
            target.classList.contains('e-stackedheadercelldiv') ||
            target.classList.contains('e-headertext') ||
            target.classList.contains('e-ascending') ||
            target.classList.contains('e-descending')) && this.enableValueSorting && this.dataType === 'pivot') {
            var ele = null;
            if (target.classList.contains('e-headercell') || target.classList.contains('e-rowsheader')
                || target.classList.contains('e-rowcell')) {
                ele = target;
            }
            else if (target.classList.contains('e-stackedheadercelldiv') || target.classList.contains('e-headercelldiv') ||
                target.classList.contains('e-ascending') || target.classList.contains('e-descending')) {
                ele = target.parentElement;
            }
            else if (target.classList.contains('e-headertext')) {
                ele = target.parentElement.parentElement;
            }
            this.CellClicked(target, e);
            if ((ele.parentElement.parentElement.parentElement.parentElement.classList.contains('e-movableheader')
                && this.dataSourceSettings.valueAxis === 'column') || (ele.parentElement.classList.contains('e-row') &&
                this.dataSourceSettings.valueAxis === 'row') && (ele.classList.contains('e-rowsheader') ||
                ele.classList.contains('e-stot'))) {
                /* tslint:disable */
                var colIndex = Number(ele.getAttribute('aria-colindex'));
                var rowIndex = Number(ele.getAttribute('index'));
                if (this.dataSourceSettings.valueAxis === 'row' && (this.dataSourceSettings.values.length > 1 || this.dataSourceSettings.alwaysShowValueHeader)) {
                    rowIndex = this.pivotValues[rowIndex][colIndex].type === 'value' ? rowIndex : (rowIndex + 1);
                }
                else if (this.dataSourceSettings.valueAxis === 'column' && (this.dataSourceSettings.values.length > 1 || this.dataSourceSettings.alwaysShowValueHeader)) {
                    colIndex = (Number(ele.getAttribute('aria-colindex')) + Number(ele.getAttribute('aria-colspan')) - 1);
                    rowIndex = this.engineModule.headerContent.length - 1;
                }
                this.setProperties({
                    dataSourceSettings: {
                        valueSortSettings: {
                            columnIndex: (Number(ele.getAttribute('aria-colindex')) +
                                Number(ele.getAttribute('aria-colspan')) - 1),
                            sortOrder: this.dataSourceSettings.valueSortSettings.sortOrder === 'Descending' ? 'Ascending' : 'Descending',
                            headerText: this.pivotValues[rowIndex][colIndex].valueSort.levelName,
                            headerDelimiter: this.dataSourceSettings.valueSortSettings.headerDelimiter ?
                                this.dataSourceSettings.valueSortSettings.headerDelimiter : '.'
                        }
                    }
                }, true);
                /* tslint:enable */
                showSpinner(this.element);
                var pivot = this;
                //setTimeout(() => {
                pivot.engineModule.enableValueSorting = true;
                if (pivot.enableVirtualization) {
                    if (pivot.dataSourceSettings.enableSorting) {
                        for (var _i = 0, _a = Object.keys(pivot.engineModule.fieldList); _i < _a.length; _i++) {
                            var key = _a[_i];
                            pivot.engineModule.fieldList[key].sort = 'Ascending';
                        }
                        pivot.setProperties({ dataSourceSettings: { sortSettings: [] } }, true);
                    }
                    pivot.engineModule.rMembers = pivot.engineModule.headerCollection.rowHeaders;
                    pivot.engineModule.cMembers = pivot.engineModule.headerCollection.columnHeaders;
                    pivot.engineModule.applyValueSorting();
                    pivot.engineModule.updateEngine();
                }
                else {
                    pivot.engineModule.generateGridData(pivot.dataSourceSettings);
                }
                pivot.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
                pivot.renderPivotGrid();
                //});
            }
        }
        else if (target.classList.contains(cls.COLLAPSE) || target.classList.contains(cls.EXPAND)) {
            this.onDrill(target);
        }
        else {
            this.CellClicked(target, e);
            return;
        }
    };
    PivotView.prototype.framePivotColumns = function (gridcolumns) {
        for (var _i = 0, gridcolumns_1 = gridcolumns; _i < gridcolumns_1.length; _i++) {
            var column = gridcolumns_1[_i];
            if (column.columns && column.columns.length > 0) {
                this.framePivotColumns(column.columns);
            }
            else {
                /* tslint:disable */
                var levelName = column.field === '0.formattedText' ? '' :
                    (column.customAttributes ? column.customAttributes.cell.valueSort.levelName : '');
                var width = this.renderModule.setSavedWidth(column.field === '0.formattedText' ? column.field :
                    levelName, Number(column.width === 'auto' ? column.minWidth : column.width));
                this.pivotColumns.push({
                    allowReordering: column.allowReordering,
                    allowResizing: column.allowResizing,
                    headerText: levelName,
                    width: width
                });
                this.totColWidth = this.totColWidth + Number(width);
                /* tslint:enable */
            }
        }
    };
    PivotView.prototype.setGridColumns = function (gridcolumns) {
        if (this.element.offsetWidth < this.totColWidth) {
            for (var _i = 0, gridcolumns_2 = gridcolumns; _i < gridcolumns_2.length; _i++) {
                var column = gridcolumns_2[_i];
                if (column.columns && column.columns.length > 0) {
                    this.setGridColumns(column.columns);
                }
                else {
                    /* tslint:disable */
                    var levelName = column.field === '0.formattedText' ? '' :
                        (column.customAttributes ? column.customAttributes.cell.valueSort.levelName : '');
                    column.allowReordering = this.pivotColumns[this.posCount].allowReordering;
                    column.allowResizing = this.pivotColumns[this.posCount].allowResizing;
                    var calcWidth = this.renderModule.setSavedWidth(column.field === '0.formattedText' ? column.field :
                        levelName, Number(this.pivotColumns[this.posCount].width));
                    if (column.width !== 'auto') {
                        column.width = calcWidth;
                    }
                    else {
                        column.minWidth = calcWidth;
                    }
                    this.posCount++;
                    if (column.allowReordering) {
                        this.gridSettings.allowReordering = true;
                    }
                    if (column.allowResizing) {
                        this.gridSettings.allowResizing = true;
                    }
                }
            }
            if (this.gridSettings.allowReordering) {
                Grid.Inject(Reorder);
            }
            if (this.gridSettings.allowResizing) {
                Grid.Inject(Resize);
            }
            /* tslint:enable */
        }
    };
    PivotView.prototype.fillGridColumns = function (gridcolumns) {
        for (var _i = 0, gridcolumns_3 = gridcolumns; _i < gridcolumns_3.length; _i++) {
            var column = gridcolumns_3[_i];
            column.allowReordering = this.gridSettings.allowReordering;
            column.allowResizing = this.gridSettings.allowResizing;
            this.posCount++;
            if (column.columns && column.columns.length > 0) {
                this.fillGridColumns(column.columns);
            }
        }
    };
    PivotView.prototype.triggerColumnRenderEvent = function (gridcolumns) {
        this.pivotColumns = [];
        this.totColWidth = 0;
        this.framePivotColumns(gridcolumns);
        var firstColWidth = this.pivotColumns[0].width;
        var eventArgs = {
            columns: this.pivotColumns,
            dataSourceSettings: this.dataSourceSettings
        };
        this.trigger(events.beforeColumnsRender, eventArgs);
        if (firstColWidth !== this.pivotColumns[0].width && this.element.offsetWidth < this.totColWidth) {
            this.firstColWidth = this.pivotColumns[0].width;
        }
        this.posCount = 0;
        this.setGridColumns(gridcolumns);
    };
    PivotView.prototype.setCommonColumnsWidth = function (columns, width) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.field !== '0.formattedText') {
                if (column.columns) {
                    this.setCommonColumnsWidth(column.columns, width);
                }
                else {
                    if (column.width !== 'auto') {
                        column.width = width;
                    }
                    else {
                        column.minWidth = width;
                    }
                }
            }
            else {
                column.width = !this.firstColWidth ? column.width : this.firstColWidth;
            }
        }
    };
    PivotView.prototype.getHeightAsNumber = function () {
        var height;
        if (isNaN(this.height)) {
            if (this.height.toString().indexOf('%') > -1) {
                height = (parseFloat(this.height.toString()) / 100) * this.element.offsetHeight;
            }
            else if (this.height.toString().indexOf('px') > -1) {
                height = Number(this.height.toString().split('px')[0]);
            }
        }
        else {
            height = Number(this.height);
        }
        if (height < this.gridSettings.rowHeight) {
            height = this.gridSettings.rowHeight;
        }
        return height;
    };
    PivotView.prototype.getWidthAsNumber = function () {
        var width;
        if (isNaN(this.width)) {
            if (this.width.toString().indexOf('%') > -1) {
                width = (parseFloat(this.width.toString()) / 100) * this.element.offsetWidth;
            }
            else if (this.width.toString().indexOf('px') > -1) {
                width = Number(this.width.toString().split('px')[0]);
            }
            if (isNaN(width)) {
                width = this.element.offsetWidth;
            }
        }
        else {
            width = Number(this.width);
        }
        if (width < 400) {
            width = 400;
        }
        return width;
    };
    PivotView.prototype.getGridWidthAsNumber = function () {
        var width;
        if (isNaN(this.grid.width)) {
            if (this.grid.width.toString().indexOf('%') > -1) {
                width = (parseFloat(this.grid.width.toString()) / 100) * this.element.offsetWidth;
            }
            else if (this.grid.width.toString().indexOf('px') > -1) {
                width = Number(this.grid.width.toString().split('px')[0]);
            }
            if (isNaN(width)) {
                width = this.element.offsetWidth;
            }
        }
        else {
            width = Number(this.grid.width);
        }
        return width;
    };
    PivotView.prototype.onWindowResize = function () {
        /* tslint:disable */
        clearTimeout(this.timeOutObj);
        this.timeOutObj = setTimeout(this.layoutRefresh.bind(this), 500);
        /* tslint:enable */
    };
    /**
     * Refreshes the Pivot Table for blazor layoutRefresh is called for other base refresh is called
     */
    PivotView.prototype.refresh = function () {
        if (isBlazor()) {
            this.layoutRefresh();
        }
        else {
            this.pivotRefresh();
        }
    };
    PivotView.prototype.layoutRefresh = function () {
        if (this.element && this.element.classList.contains('e-pivotview') &&
            (this.dataType === 'olap' ? (this.olapEngineModule && this.olapEngineModule.pivotValues) :
                this.engineModule && this.engineModule.pivotValues)) {
            if (this.grid) {
                var colLength = (this.dataType === 'olap' && this.olapEngineModule.pivotValues.length > 0) ?
                    this.olapEngineModule.pivotValues[0].length : (this.dataSourceSettings.values.length > 0 &&
                    this.engineModule.pivotValues.length > 0 ? this.engineModule.pivotValues[0].length : 2);
                var colWidth = this.renderModule.resizeColWidth(colLength);
                this.grid.width = this.renderModule.calculateGridWidth();
                this.renderModule.calculateGridHeight(true);
                this.setCommonColumnsWidth(this.grid.columns, colWidth);
                this.posCount = 0;
                if (!this.showGroupingBar) {
                    this.setGridColumns(this.grid.columns);
                }
                if (this.currentView === 'Table') {
                    /* tslint:disable-next-line */
                    if (this.cellTemplate && isBlazor()) {
                        resetBlazorTemplate(this.element.id + '_cellTemplate', 'CellTemplate');
                    }
                }
                this.grid.refreshColumns();
                if (this.showGroupingBar && this.groupingBarModule && this.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.setGridRowWidth();
                }
            }
            if (this.showToolbar && this.toolbarModule && this.toolbarModule.toolbar) {
                this.toolbarModule.toolbar.width = this.grid ? (this.getGridWidthAsNumber() - 2) : (this.getWidthAsNumber() - 2);
            }
            if (this.chart) {
                this.chart.width = (this.showToolbar && this.grid) ? this.getGridWidthAsNumber().toString() :
                    this.getWidthAsNumber().toString();
                if (this.displayOption.view === 'Chart' && this.showGroupingBar && this.groupingBarModule &&
                    this.element.querySelector('.' + cls.CHART_GROUPING_BAR_CLASS)) {
                    this.groupingBarModule.refreshUI();
                }
            }
        }
    };
    PivotView.prototype.CellClicked = function (target, e) {
        var _this_1 = this;
        var ele = null;
        if (target.classList.contains('e-headercell') || target.classList.contains('e-rowcell')) {
            ele = target;
        }
        else if (target.classList.contains('e-stackedheadercelldiv') || target.classList.contains('e-cellvalue') ||
            target.classList.contains('e-headercelldiv')) {
            ele = target.parentElement;
        }
        else if (target.classList.contains('e-headertext')) {
            ele = target.parentElement.parentElement;
        }
        else if (target.classList.contains(cls.ROW_SELECT)) {
            if (target.classList.contains(cls.SPAN_CLICKED)) {
                this.isPopupClicked = false;
            }
            else {
                this.isPopupClicked = true;
            }
        }
        /* tslint:disable */
        if (ele) {
            var colIndex_1 = Number(ele.getAttribute('aria-colindex'));
            var rowIndex_1 = Number(ele.getAttribute('index'));
            var colSpan_1 = Number(ele.getAttribute('aria-colspan'));
            // let selectArgs: PivotCellSelectedEventArgs = { isCellClick: true, currentCell: target };
            var selectArgs = {
                cancel: false,
                isCellClick: true,
                currentCell: ele,
                data: this.pivotValues[rowIndex_1][colIndex_1]
            };
            this.trigger(events.cellSelecting, selectArgs, function (observedArgs) {
                if (_this_1.gridSettings.allowSelection) {
                    if (_this_1.gridSettings.selectionSettings.mode === 'Both' ? !ele.classList.contains(cls.ROW_CELL_CLASS) :
                        _this_1.gridSettings.selectionSettings.mode !== 'Row') {
                        _this_1.clearSelection(ele, e, colIndex_1, rowIndex_1);
                        if (!observedArgs.cancel) {
                            _this_1.applyColumnSelection(e, ele, colIndex_1, colIndex_1 + (colSpan_1 > 0 ? (colSpan_1 - 1) : 0), rowIndex_1);
                        }
                    }
                    else {
                        _this_1.clearSelection(ele, e, colIndex_1, rowIndex_1);
                    }
                    if (_this_1.gridSettings.selectionSettings.type === 'Multiple' &&
                        (_this_1.gridSettings.selectionSettings.mode === 'Row' || _this_1.gridSettings.selectionSettings.mode === 'Both')) {
                        _this_1.applyRowSelection(0, rowIndex_1, e);
                    }
                }
                if (_this_1.cellClick && observedArgs.isCellClick) {
                    _this_1.trigger(events.cellClick, {
                        currentCell: ele,
                        data: _this_1.pivotValues[rowIndex_1][colIndex_1]
                    });
                }
            });
        }
    };
    PivotView.prototype.clearSelection = function (ele, e, colIndex, rowIndex) {
        if ((!e.shiftKey && !e.ctrlKey) || this.gridSettings.selectionSettings.type === 'Single') {
            if (this.gridSettings.selectionSettings.mode === 'Cell') {
                if (ele.classList.contains(cls.COLUMNSHEADER)) {
                    [].slice.call(this.element.querySelectorAll(('.' + cls.ROW_CELL_CLASS + '.') + cls.CELL_SELECTED_BGCOLOR)).forEach(function (ele) {
                        ele.classList.remove(cls.CELL_SELECTED_BGCOLOR);
                    });
                }
                else {
                    [].slice.call(this.element.querySelectorAll(('.' + cls.COLUMNSHEADER + '.') + cls.CELL_ACTIVE_BGCOLOR)).forEach(function (ele) {
                        ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                        ele.classList.remove(cls.SELECTED_BGCOLOR);
                    });
                }
            }
            else if (this.gridSettings.selectionSettings.mode === 'Both') {
                if (ele.classList.contains(cls.ROW_CELL_CLASS)) {
                    [].slice.call(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR)).forEach(function (ele) {
                        if (Number(ele.getAttribute('index')) !== rowIndex) {
                            ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                            ele.classList.remove(cls.SELECTED_BGCOLOR);
                        }
                    });
                }
                else {
                    [].slice.call(this.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR)).forEach(function (ele) {
                        ele.classList.remove(cls.CELL_SELECTED_BGCOLOR);
                    });
                }
            }
        }
    };
    PivotView.prototype.applyRowSelection = function (colIndex, rowIndex, e) {
        var pivotValue = this.engineModule.pivotValues[rowIndex][colIndex];
        if (!e.ctrlKey && !e.shiftKey && pivotValue && pivotValue.members && pivotValue.members.length > 0) {
            var parentLevel = pivotValue.level;
            var rCount = rowIndex;
            do {
                rCount++;
                pivotValue = this.engineModule.pivotValues[rCount][colIndex];
            } while (pivotValue && parentLevel < pivotValue.level);
            var _this = this;
            if (this.isAdaptive) {
                this.rowRangeSelection = {
                    enable: true,
                    startIndex: rowIndex - _this.renderModule.rowStartPos,
                    endIndex: rCount - (1 + _this.renderModule.rowStartPos)
                };
            }
            else {
                _this.grid.selectionModule.selectRowsByRange(rowIndex -
                    _this.renderModule.rowStartPos, rCount - (1 + _this.renderModule.rowStartPos));
            }
        }
    };
    PivotView.prototype.applyColumnSelection = function (e, target, colStart, colEnd, rowStart) {
        if (!target.classList.contains(cls.ROWSHEADER) &&
            (this.gridSettings.selectionSettings.mode === 'Cell' ? target.classList.contains(cls.COLUMNSHEADER) : true)) {
            var isCtrl_1 = e.ctrlKey;
            if (this.isAdaptive && this.gridSettings.selectionSettings.type === 'Multiple') {
                this.grid.selectionModule.showPopup(e);
                if (this.isPopupClicked) {
                    this.element.querySelector('.' + cls.ROW_SELECT).classList.add(cls.SPAN_CLICKED);
                    isCtrl_1 = true;
                }
                else {
                    this.element.querySelector('.' + cls.ROW_SELECT).classList.remove(cls.SPAN_CLICKED);
                    isCtrl_1 = false;
                }
            }
            var queryStringArray = [];
            var type = this.gridSettings.selectionSettings.type;
            var isToggle_1 = target.classList.contains(cls.CELL_ACTIVE_BGCOLOR);
            var activeColumns_1 = [];
            var actColPos_1 = {};
            for (var cCnt = colStart; cCnt <= colEnd; cCnt++) {
                activeColumns_1.push(cCnt.toString());
            }
            if (!isCtrl_1 || type === 'Single') {
                [].slice.call(this.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR)).forEach(function (ele) {
                    ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                    ele.classList.remove(cls.SELECTED_BGCOLOR);
                    if (activeColumns_1.indexOf(ele.getAttribute('aria-colindex')) === -1) {
                        isToggle_1 = false;
                    }
                    var colIndex = Number(ele.getAttribute('aria-colindex'));
                    actColPos_1[colIndex] = colIndex;
                });
                /* tslint:disable-next-line:no-any */
                activeColumns_1 = Object.keys(actColPos_1).length > 0 ? Object.keys(actColPos_1).sort(function (a, b) {
                    return a - b;
                }) : activeColumns_1;
            }
            else {
                isToggle_1 = false;
            }
            if (type === 'Multiple' && e.shiftKey) {
                this.shiftLockedPos = this.shiftLockedPos.length === 0 ? activeColumns_1 : this.shiftLockedPos;
                if (Number(this.shiftLockedPos[0]) <= colStart) {
                    colStart = Number(this.shiftLockedPos[0]);
                }
                else {
                    colEnd = colEnd < Number(this.shiftLockedPos[this.shiftLockedPos.length - 1]) ?
                        Number(this.shiftLockedPos[this.shiftLockedPos.length - 1]) : colEnd;
                }
            }
            else {
                this.shiftLockedPos = [];
            }
            var rowSelectedList_1 = [];
            if (e.ctrlKey && this.gridSettings.selectionSettings.mode === 'Both' && type === 'Multiple' && !target.classList.contains(cls.ROWSHEADER)) {
                [].slice.call(this.element.querySelectorAll('.' + cls.ROWSHEADER + '.' + cls.CELL_SELECTED_BGCOLOR)).forEach(function (ele) {
                    rowSelectedList_1.push(ele.getAttribute('index'));
                });
            }
            var count = colStart;
            while (count <= colEnd) {
                queryStringArray.push('[aria-colindex="' + count + '"]' + (this.gridSettings.selectionSettings.mode === 'Cell' ?
                    '[index="' + rowStart + '"]' : "") + '');
                count++;
            }
            if (!isToggle_1) {
                rowStart = target.classList.contains('e-headercell') ? rowStart : (this.renderModule.rowStartPos - 1);
                var isTargetSelected_1 = target.classList.contains(cls.CELL_ACTIVE_BGCOLOR);
                [].slice.call(this.element.querySelectorAll(queryStringArray.toString())).forEach(function (ele) {
                    if (Number(ele.getAttribute('index')) >= rowStart) {
                        if (isTargetSelected_1 && isCtrl_1 && (rowSelectedList_1.indexOf(ele.getAttribute('index')) === -1)) {
                            ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
                            ele.classList.remove(cls.SELECTED_BGCOLOR);
                        }
                        else {
                            ele.classList.add(cls.CELL_ACTIVE_BGCOLOR);
                            ele.classList.add(cls.SELECTED_BGCOLOR);
                        }
                    }
                });
            }
            this.renderModule.selected();
        }
    };
    PivotView.prototype.getSelectedCellsPos = function () {
        var control = this;
        control.savedSelectedCellsPos = [];
        [].slice.call(this.element.querySelectorAll('.' + cls.SELECTED_BGCOLOR)).forEach(function (ele) {
            control.savedSelectedCellsPos.push({ rowIndex: ele.getAttribute('index'), colIndex: ele.getAttribute('aria-colindex') });
        });
    };
    PivotView.prototype.setSavedSelectedCells = function () {
        var control = this;
        [].slice.call(this.savedSelectedCellsPos).forEach(function (item) {
            var query = '[aria-colindex="' + item.colIndex + '"][index="' + item.rowIndex + '"]';
            control.element.querySelector(query).classList.add(cls.CELL_ACTIVE_BGCOLOR);
            control.element.querySelector(query).classList.add(cls.SELECTED_BGCOLOR);
        });
    };
    /* tslint:enable */
    PivotView.prototype.renderEmptyGrid = function () {
        var _this_1 = this;
        this.isEmptyGrid = true;
        this.renderModule = new Render(this);
        if (this.grid && this.grid.element && this.element.querySelector('.e-grid')) {
            /* tslint:disable */
            this.grid.setProperties({
                columns: this.renderModule.frameEmptyColumns(),
                dataSource: this.renderModule.frameEmptyData()
            }, true);
            /* tslint:enable */
            this.grid.notify('datasource-modified', {});
            this.grid.refreshColumns();
        }
        else {
            if (this.element.querySelector('.' + cls.GRID_CLASS)) {
                remove(this.element.querySelector('.' + cls.GRID_CLASS));
            }
            this.renderModule.bindGrid(this, true);
            /* tslint:disable:no-empty */
            this.grid.showSpinner = function () { };
            this.grid.hideSpinner = function () { };
            /* tslint:enable:no-empty */
            this.element.appendChild(createElement('div', { id: this.element.id + '_grid' }));
            this.grid.isStringTemplate = true;
            this.grid.appendTo('#' + this.element.id + '_grid');
            /* tslint:disable-next-line:no-any */
            this.grid.off('data-ready', this.grid.dataReady);
            this.grid.on('data-ready', function () {
                _this_1.grid.scrollModule.setWidth();
                _this_1.grid.scrollModule.setHeight();
                _this_1.grid.element.querySelector('.e-movablecontent').style.overflowY = 'auto';
            });
        }
    };
    /* tslint:disable */
    PivotView.prototype.initEngine = function () {
        var _this_1 = this;
        var args = {
            dataSourceSettings: PivotUtil.getClonedDataSourceSettings(this.dataSourceSettings)
        };
        this.trigger(events.enginePopulating, args, function (observedArgs) {
            PivotUtil.updateDataSourceSettings(_this_1, observedArgs.dataSourceSettings);
            _this_1.updatePageSettings(false);
            /* tslint:disable:align */
            var customProperties = {
                mode: '',
                savedFieldList: undefined,
                pageSettings: _this_1.pageSettings,
                enableValueSorting: _this_1.enableValueSorting,
                isDrillThrough: (_this_1.allowDrillThrough || _this_1.editSettings.allowEditing),
                localeObj: _this_1.localeObj,
                fieldsType: _this_1.fieldsType
            };
            if (_this_1.dataType === 'pivot') {
                if (_this_1.dataSourceSettings.groupSettings && _this_1.dataSourceSettings.groupSettings.length > 0) {
                    var dataSet = _this_1.engineModule.data;
                    _this_1.clonedDataSet = (_this_1.clonedDataSet ? _this_1.clonedDataSet : PivotUtil.getClonedData(dataSet));
                    _this_1.setProperties({ dataSourceSettings: { dataSource: [] } }, true);
                    _this_1.clonedReport = _this_1.clonedReport ? _this_1.clonedReport : extend({}, _this_1.dataSourceSettings, null, true);
                    _this_1.setProperties({ dataSourceSettings: { dataSource: dataSet } }, true);
                }
                _this_1.engineModule.renderEngine(_this_1.dataSourceSettings, customProperties, _this_1.getValueCellInfo.bind(_this_1));
                _this_1.setProperties({ pivotValues: _this_1.engineModule.pivotValues }, true);
            }
            else if (_this_1.dataSourceSettings.providerType === 'SSAS' && _this_1.dataType === 'olap') {
                customProperties.savedFieldList = _this_1.olapEngineModule.fieldList;
                customProperties.savedFieldListData = _this_1.olapEngineModule.fieldListData;
                _this_1.olapEngineModule.renderEngine(_this_1.dataSourceSettings, customProperties);
                _this_1.setProperties({ pivotValues: _this_1.olapEngineModule.pivotValues }, true);
            }
            var this$ = _this_1;
            _this_1.trigger(events.enginePopulated, { pivotValues: _this_1.pivotValues }, function (observedArgs) {
                if (this$.dataType === 'olap') {
                    this$.olapEngineModule.pivotValues = isBlazor() ? _this_1.olapEngineModule.pivotValues : observedArgs.pivotValues;
                    this$.pivotValues = this$.olapEngineModule.pivotValues;
                }
                else {
                    this$.engineModule.pivotValues = isBlazor() ? _this_1.engineModule.pivotValues : observedArgs.pivotValues;
                    this$.pivotValues = this$.engineModule.pivotValues;
                }
                this$.notify(events.dataReady, {});
                this$.isEmptyGrid = false;
            });
        });
    };
    /* tslint:enable */
    PivotView.prototype.generateData = function () {
        if (this.displayOption.view !== 'Chart') {
            this.renderEmptyGrid();
        }
        showSpinner(this.element);
        var pivot = this;
        //setTimeout(() => {
        /* tslint:disable */
        if (isBlazor()) {
            if (pivot.dataType === 'olap') {
                if (pivot.dataSourceSettings.dataSource instanceof DataManager) {
                    pivot.dataSourceSettings.dataSource = undefined;
                }
            }
        }
        if (pivot.dataSourceSettings && (pivot.dataSourceSettings.dataSource || pivot.dataSourceSettings.url)) {
            if (pivot.dataSourceSettings.dataSource instanceof DataManager) {
                setTimeout(pivot.getData.bind(pivot), 100);
            }
            else if ((this.dataSourceSettings.url !== '' && this.dataType === 'olap') ||
                pivot.dataSourceSettings.dataSource.length > 0) {
                if (pivot.dataType === 'pivot') {
                    pivot.engineModule.data = pivot.dataSourceSettings.dataSource;
                }
                pivot.initEngine();
            }
            else {
                hideSpinner(pivot.element);
            }
        }
        else {
            hideSpinner(pivot.element);
        }
        /* tslint:enable */
        //});
    };
    PivotView.prototype.getValueCellInfo = function (aggregateObj) {
        var args = aggregateObj;
        this.trigger(events.aggregateCellInfo, args);
        return args;
    };
    /**
     * De-Register the internal events.
     * @returns void

     */
    PivotView.prototype.bindTriggerEvents = function (args) {
        this.trigger(getObject('name', args), args);
    };
    PivotView.prototype.getData = function () {
        this.dataSourceSettings.dataSource.executeQuery(new Query()).then(this.executeQuery.bind(this));
    };
    PivotView.prototype.executeQuery = function (e) {
        if (!this.element.querySelector('.e-spinner-pane')) {
            showSpinner(this.element);
        }
        var pivot = this;
        //setTimeout(() => {
        pivot.engineModule.data = e.result;
        pivot.initEngine();
        //});
    };
    PivotView.prototype.applyFormatting = function (pivotValues) {
        if (pivotValues) {
            var colIndex = [];
            for (var len = pivotValues.length, i = 0; i < len; i++) {
                if (pivotValues[i] !== undefined && pivotValues[i][0] === undefined) {
                    colIndex.push(i);
                }
            }
            for (var i = 0; i < pivotValues.length; i++) {
                for (var j = 1; (pivotValues[i] && j < pivotValues[i].length); j++) {
                    if (pivotValues[i][j].axis === 'value') {
                        pivotValues[i][j].style = undefined;
                        pivotValues[i][j].cssClass = undefined;
                        var format_1 = this.dataSourceSettings.conditionalFormatSettings;
                        for (var k = 0; k < format_1.length; k++) {
                            if ((format_1[k].applyGrandTotals === true || isNullOrUndefined(format_1[k].applyGrandTotals)) ? true :
                                pivotValues[i][j].rowHeaders !== '' &&
                                    pivotValues[i][j].columnHeaders !== '') {
                                if (this.checkCondition(pivotValues[i][j].value, format_1[k].conditions, format_1[k].value1, format_1[k].value2)) {
                                    // let ilen: number =
                                    //     (this.dataSourceSettings.valueAxis === 'row' ? i : this.engineModule.headerContent.length - 1);
                                    // let jlen: number = (this.dataSourceSettings.valueAxis === 'row' ? 0 : j);
                                    if ((!format_1[k].measure || pivotValues[i][j].actualText === format_1[k].measure) &&
                                        (format_1[k].measure === undefined || format_1[k].measure !== '') && (format_1[k].label === undefined ||
                                        format_1[k].label !== '') && ((!format_1[k].label ||
                                        (pivotValues[i][0].valueSort.levelName
                                            .indexOf(format_1[k].label)) > -1) || (pivotValues[i][j]
                                        .rowHeaders.indexOf(format_1[k].label) > -1) ||
                                        (pivotValues[i][j].columnHeaders
                                            .indexOf(format_1[k].label) > -1))) {
                                        if (format_1[k].style && format_1[k].style.backgroundColor) {
                                            format_1[k].style.backgroundColor = this.conditionalFormattingModule
                                                .isHex(format_1[k].style.backgroundColor.substr(1)) ? format_1[k].style.backgroundColor :
                                                this.conditionalFormattingModule.colourNameToHex(format_1[k].style.backgroundColor);
                                        }
                                        if (format_1[k].style && format_1[k].style.color) {
                                            format_1[k].style.color = this.conditionalFormattingModule
                                                .isHex(format_1[k].style.color.substr(1)) ? format_1[k].style.color :
                                                this.conditionalFormattingModule.colourNameToHex(format_1[k].style.color);
                                        }
                                        pivotValues[i][j].style = format_1[k].style;
                                        pivotValues[i][j].cssClass = 'format' + this.element.id + k;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var format = this.dataSourceSettings.conditionalFormatSettings;
            for (var k = 0; k < format.length; k++) {
                var sheet = (this.createStyleSheet.bind(this))();
                var str = 'color: ' + format[k].style.color + '!important;background-color: ' + format[k].style.backgroundColor +
                    '!important;font-size: ' + format[k].style.fontSize + '!important;font-family: ' + format[k].style.fontFamily +
                    ' !important;';
                sheet.insertRule('.format' + this.element.id + k + '{' + str + '}', 0);
            }
        }
    };
    PivotView.prototype.createStyleSheet = function () {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        return style.sheet;
    };
    PivotView.prototype.applyHyperlinkSettings = function () {
        if (this.pivotValues) {
            var pivotValues = this.pivotValues;
            var colIndex = [];
            for (var len = pivotValues.length, i = 0; i < len; i++) {
                if (pivotValues[i] !== undefined && pivotValues[i][0] === undefined) {
                    colIndex.push(i);
                }
            }
            if (this.hyperlinkSettings.conditionalSettings.length > 0) {
                for (var i = 0; i < pivotValues.length; i++) {
                    for (var j = 1; (pivotValues[i] && j < pivotValues[i].length); j++) {
                        if (pivotValues[i][j].axis === 'value') {
                            pivotValues[i][j].enableHyperlink = false;
                            var collection = this.hyperlinkSettings.conditionalSettings;
                            for (var k = 0; k < collection.length; k++) {
                                if (this.checkCondition(pivotValues[i][j].value, collection[k].conditions, collection[k].value1, collection[k].value2)) {
                                    var ilen = (this.dataSourceSettings.valueAxis === 'row' ?
                                        i : (this.dataType === 'pivot' ?
                                        this.engineModule.headerContent.length - 1 : this.olapEngineModule.headerContent.length - 1));
                                    var jlen = (this.dataSourceSettings.valueAxis === 'row' ? 0 : j);
                                    if ((!collection[k].measure || this.dataSourceSettings.values.length === 1 ||
                                        (pivotValues[ilen][jlen].valueSort &&
                                            (pivotValues[ilen][jlen].actualText === collection[k].measure))) &&
                                        (!collection[k].label || ((pivotValues[colIndex[collection[k].label.split('.').length - 1]] &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j] &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j].valueSort &&
                                            pivotValues[colIndex[collection[k].label.split('.').length - 1]][j].
                                                valueSort[collection[k].label]) || (pivotValues[i][0].
                                            valueSort.levelName.indexOf(collection[k].label) > -1)))) {
                                        pivotValues[i][j].enableHyperlink = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (!isNullOrUndefined(this.hyperlinkSettings.headerText)) {
                for (var i = 0; i < pivotValues.length; i++) {
                    for (var j = 1; (pivotValues[i] && j < pivotValues[i].length); j++) {
                        if (pivotValues[i][j].axis === 'value') {
                            // (pivotValues[i][j] as IAxisSet).enableHyperlink = false;
                            var label = this.hyperlinkSettings.headerText;
                            var ilen = (this.dataSourceSettings.valueAxis === 'row' ?
                                i : (this.dataType === 'pivot' ?
                                this.engineModule.headerContent.length - 1 : this.olapEngineModule.headerContent.length - 1));
                            var jlen = (this.dataSourceSettings.valueAxis === 'row' ? 0 : j);
                            if ((pivotValues[colIndex[label.split('.').length - 1]] &&
                                pivotValues[colIndex[label.split('.').length - 1]][j] &&
                                pivotValues[colIndex[label.split('.').length - 1]][j].
                                    valueSort && pivotValues[colIndex[label.split('.').length - 1]][j].
                                valueSort[label])) {
                                for (var _i = 0, colIndex_2 = colIndex; _i < colIndex_2.length; _i++) {
                                    var index = colIndex_2[_i];
                                    if (pivotValues[index][j] &&
                                        pivotValues[index][j].axis === 'column' &&
                                        (pivotValues[index][j].valueSort.levelName.indexOf(label) > -1)) {
                                        pivotValues[index][j].enableHyperlink = true;
                                    }
                                }
                                pivotValues[i][j].enableHyperlink = true;
                            }
                            else if (pivotValues[i][0].valueSort.levelName.indexOf(label) > -1) {
                                pivotValues[i][0].enableHyperlink = true;
                                pivotValues[i][j].enableHyperlink = true;
                            }
                        }
                    }
                }
            }
            else {
                return;
            }
        }
    };
    PivotView.prototype.checkCondition = function (cellValue, conditions, conditionalValue1, conditionalValue2) {
        switch (conditions) {
            case 'LessThan':
                return cellValue < conditionalValue1;
            case 'LessThanOrEqualTo':
                return cellValue <= conditionalValue1;
            case 'GreaterThan':
                return cellValue > conditionalValue1;
            case 'GreaterThanOrEqualTo':
                return cellValue >= conditionalValue1;
            case 'Equals':
                return cellValue === conditionalValue1;
            case 'NotEquals':
                return cellValue !== conditionalValue1;
            case 'Between':
                return (conditionalValue1 < conditionalValue2 && cellValue >= conditionalValue1 && cellValue <= conditionalValue2) ||
                    (conditionalValue1 > conditionalValue2 && cellValue <= conditionalValue1 && cellValue >= conditionalValue2);
            case 'NotBetween':
                return !((conditionalValue1 < conditionalValue2 && cellValue >= conditionalValue1 && cellValue <= conditionalValue2) ||
                    (conditionalValue1 > conditionalValue2 && cellValue <= conditionalValue1 && cellValue >= conditionalValue2));
            default:
                return false;
        }
    };
    PivotView.prototype.wireEvents = function () {
        if (this.displayOption.view !== 'Chart') {
            EventHandler.add(this.element, this.isAdaptive ? 'touchend' : 'click', this.mouseClickHandler, this);
            EventHandler.add(this.element, 'mousedown', this.mouseDownHandler, this);
            EventHandler.add(this.element.querySelector('.' + cls.GRID_HEADER), 'mousemove', this.mouseMoveHandler, this);
            EventHandler.add(this.element, 'mouseup', this.mouseUpHandler, this);
            EventHandler.add(this.element, this.isAdaptive ? 'touchend' : 'contextmenu', this.mouseRclickHandler, this);
        }
        window.addEventListener('resize', this.onWindowResize.bind(this), true);
    };
    PivotView.prototype.unwireEvents = function () {
        if (this.displayOption.view !== 'Chart') {
            EventHandler.remove(this.element, this.isAdaptive ? 'touchend' : 'click', this.mouseClickHandler);
            EventHandler.remove(this.element, 'mousedown', this.mouseDownHandler);
            if (this.element.querySelector('.' + cls.GRID_HEADER)) {
                EventHandler.remove(this.element.querySelector('.' + cls.GRID_HEADER), 'mousemove', this.mouseMoveHandler);
            }
            EventHandler.remove(this.element, 'mouseup', this.mouseUpHandler);
            EventHandler.remove(this.element, this.isAdaptive ? 'touchend' : 'contextmenu', this.mouseRclickHandler);
        }
        window.removeEventListener('resize', this.onWindowResize.bind(this), true);
    };
    /**
     * To destroy the PivotView elements.
     * @returns void
     */
    PivotView.prototype.destroy = function () {
        this.removeInternalEvents();
        if (this.showGroupingBar && this.groupingBarModule) {
            this.groupingBarModule.destroy();
        }
        if (this.showToolbar && this.toolbarModule) {
            this.toolbarModule.destroy();
        }
        if (this.enableVirtualization && this.virtualscrollModule) {
            this.virtualscrollModule.destroy();
        }
        if (this.allowConditionalFormatting && this.conditionalFormattingModule) {
            this.conditionalFormattingModule.destroy();
        }
        if (this.allowNumberFormatting && this.numberFormattingModule) {
            this.numberFormattingModule.destroy();
        }
        if (this.isAdaptive && this.contextMenuModule) {
            this.contextMenuModule.destroy();
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
        if (this.tooltip) {
            this.tooltip.destroy();
        }
        if (this.chart) {
            this.chart.destroy();
        }
        this.unwireEvents();
        removeClass([this.element], cls.ROOT);
        removeClass([this.element], cls.RTL);
        removeClass([this.element], cls.DEVICE);
        this.element.innerHTML = '';
        _super.prototype.destroy.call(this);
    };
    var PivotView_1;
    __decorate([
        Property('USD')
    ], PivotView.prototype, "currencyCode", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showFieldList", void 0);
    __decorate([
        Complex({}, GridSettings)
    ], PivotView.prototype, "gridSettings", void 0);
    __decorate([
        Complex({}, ChartSettings)
    ], PivotView.prototype, "chartSettings", void 0);
    __decorate([
        Complex({}, GroupingBarSettings)
    ], PivotView.prototype, "groupingBarSettings", void 0);
    __decorate([
        Complex({}, HyperlinkSettings)
    ], PivotView.prototype, "hyperlinkSettings", void 0);
    __decorate([
        Complex({}, DataSourceSettings)
    ], PivotView.prototype, "dataSourceSettings", void 0);
    __decorate([
        Complex({}, CellEditSettings)
    ], PivotView.prototype, "editSettings", void 0);
    __decorate([
        Complex({}, DisplayOption)
    ], PivotView.prototype, "displayOption", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "pivotValues", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showGroupingBar", void 0);
    __decorate([
        Property(true)
    ], PivotView.prototype, "showTooltip", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showToolbar", void 0);
    __decorate([
        Property([])
    ], PivotView.prototype, "toolbar", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "showValuesButton", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowCalculatedField", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableValueSorting", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowConditionalFormatting", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowNumberFormatting", void 0);
    __decorate([
        Property('auto')
    ], PivotView.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], PivotView.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDrillThrough", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowPdfExport", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDeferLayoutUpdate", void 0);
    __decorate([
        Property(false)
    ], PivotView.prototype, "allowDataCompression", void 0);
    __decorate([
        Property(1000)
    ], PivotView.prototype, "maxNodeLimitInMemberEditor", void 0);
    __decorate([
        Property(10000)
    ], PivotView.prototype, "maxRowsInDrillThrough", void 0);
    __decorate([
        Property(true)
    ], PivotView.prototype, "loadOnDemandInMemberEditor", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "cellTemplate", void 0);
    __decorate([
        Property()
    ], PivotView.prototype, "spinnerTemplate", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "headerCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pdfHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeColumnsRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "selected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartTooltipRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartLoaded", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartLoad", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartResized", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartAxisLabelRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "onPdfCellRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "saveReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fetchReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "loadReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "renameReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "removeReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "newReport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "toolbarRender", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "load", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "enginePopulating", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "enginePopulated", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "onFieldDropped", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "created", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beforeExport", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "conditionalFormatting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "drillThrough", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "beginDrillThrough", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "hyperlinkCellClick", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "drill", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "chartSeriesCreated", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "aggregateCellInfo", void 0);
    __decorate([
        Event()
    ], PivotView.prototype, "fieldListRefreshed", void 0);
    PivotView = PivotView_1 = __decorate([
        NotifyPropertyChanges
    ], PivotView);
    return PivotView;
}(Component));
export { PivotView };
