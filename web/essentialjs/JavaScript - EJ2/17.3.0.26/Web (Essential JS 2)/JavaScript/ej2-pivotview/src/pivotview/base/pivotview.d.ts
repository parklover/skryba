import { Component, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { Internationalization, L10n, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
import { PivotEngine, IPivotValues, IDataSet, IPageSettings } from '../../base/engine';
import { ISort, IFilter, IFieldOptions, ICalculatedFields } from '../../base/engine';
import { IConditionalFormatSettings } from '../../base/engine';
import { PivotViewModel, GroupingBarSettingsModel, CellEditSettingsModel, DisplayOptionModel } from './pivotview-model';
import { HyperlinkSettingsModel, ConditionalSettingsModel } from './pivotview-model';
import { Tooltip } from '@syncfusion/ej2-popups';
import { AxisFields } from '../../common/grouping-bar/axis-field-renderer';
import { LoadEventArgs, EnginePopulatingEventArgs, DrillThroughEventArgs, PivotColumn, ChartLabelInfo } from '../../common/base/interface';
import { FetchReportArgs, LoadReportArgs, RenameReportArgs, RemoveReportArgs, ToolbarArgs } from '../../common/base/interface';
import { PdfCellRenderArgs, NewReportArgs, ChartSeriesCreatedEventArgs, AggregateEventArgs } from '../../common/base/interface';
import { ResizeInfo, ScrollInfo, ColumnRenderEventArgs, PivotCellSelectedEventArgs, SaveReportArgs } from '../../common/base/interface';
import { CellClickEventArgs, FieldDroppedEventArgs, HyperCellClickEventArgs, CellTemplateArgs } from '../../common/base/interface';
import { BeforeExportEventArgs, EnginePopulatedEventArgs, BeginDrillThroughEventArgs, DrillArgs } from '../../common/base/interface';
import { FieldListRefreshedEventArgs } from '../../common/base/interface';
import { Render } from '../renderer/render';
import { PivotCommon } from '../../common/base/pivot-common';
import { Common } from '../../common/actions/common';
import { GroupingBar } from '../../common/grouping-bar/grouping-bar';
import { DataSourceSettingsModel } from '../model/datasourcesettings-model';
import { GridSettingsModel } from '../model/gridsettings-model';
import { PivotButton } from '../../common/actions/pivot-button';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import { Grid, QueryCellInfoEventArgs, ColumnModel } from '@syncfusion/ej2-grids';
import { CellSelectEventArgs, RowSelectEventArgs, ResizeArgs } from '@syncfusion/ej2-grids';
import { RowDeselectEventArgs, ContextMenuClickEventArgs } from '@syncfusion/ej2-grids';
import { EditSettingsModel, HeaderCellInfoEventArgs, CellDeselectEventArgs } from '@syncfusion/ej2-grids';
import { PdfExportProperties, ExcelExportProperties, ExcelQueryCellInfoEventArgs, ColumnDragEventArgs } from '@syncfusion/ej2-grids';
import { ExcelHeaderQueryCellInfoEventArgs, PdfQueryCellInfoEventArgs, PdfHeaderQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';
import { ExcelExport } from '../actions/excel-export';
import { PDFExport } from '../actions/pdf-export';
import { CalculatedField } from '../../common/calculatedfield/calculated-field';
import { KeyboardInteraction } from '../actions/keyboard';
import { PivotContextMenu } from '../../common/popups/context-menu';
import { ConditionalFormatting } from '../../common/conditionalformatting/conditional-formatting';
import { VirtualScroll } from '../actions/virtualscroll';
import { DrillThrough } from '../actions/drill-through';
import { Condition } from '../../base/types';
import { EditMode, ToolbarItems, View, Primary } from '../../common';
import { Toolbar } from '../../common/popups/toolbar';
import { PivotChart } from '../../pivotchart/index';
import { ChartSettingsModel } from '../model/chartsettings-model';
import { Chart, ITooltipRenderEventArgs, ILoadedEventArgs } from '@syncfusion/ej2-charts';
import { IResizeEventArgs, IAxisLabelRenderEventArgs, ExportType } from '@syncfusion/ej2-charts';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { ClickEventArgs, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { OlapEngine } from '../../base/olap/engine';
import { NumberFormatting } from '../../common/popups/formatting-dialog';
/**
 * It holds the settings of Grouping Bar.
 */
export declare class GroupingBarSettings extends ChildProperty<GroupingBarSettings> {
    /**
     * It allows to set the visibility of filter icon in GroupingBar button

     */
    showFilterIcon: boolean;
    /**
     * It allows to set the visibility of sort icon in GroupingBar button

     */
    showSortIcon: boolean;
    /**
     * It allows to set the visibility of remove icon in GroupingBar button

     */
    showRemoveIcon: boolean;
    /**
     * It allows to set the visibility of drop down icon in GroupingBar button

     */
    showValueTypeIcon: boolean;
    /**
     * It allows to set the visibility of grouping bar in desired view port

     */
    displayMode: View;
    /**
     * It allows to enable/disable the drag and drop option to GroupingBar buttons.

     */
    allowDragAndDrop: boolean;
}
/**
 * Configures the edit behavior of the Grid.
 */
export declare class CellEditSettings extends ChildProperty<CellEditSettings> implements EditSettingsModel {
    /**
     * If `allowAdding` is set to true, new records can be added to the Grid.

     */
    allowAdding: boolean;
    /**
     * If `allowEditing` is set to true, values can be updated in the existing record.

     */
    allowEditing: boolean;
    /**
     * If `allowDeleting` is set to true, existing record can be deleted from the Grid.

     */
    allowDeleting: boolean;
    /**
     * If `allowCommandColumns` is set to true, an additional column appended to perform CRUD operations in Grid.

     */
    allowCommandColumns: boolean;
    /**
     * Defines the mode to edit. The available editing modes are:
     * * Normal
     * * Dialog
     * * Batch

     */
    mode: EditMode;
    /**
     * If `allowEditOnDblClick` is set to false, Grid will not allow editing of a record on double click.

     */
    allowEditOnDblClick: boolean;
    /**
     * if `showConfirmDialog` is set to false, confirm dialog does not show when batch changes are saved or discarded.

     */
    showConfirmDialog: boolean;
    /**
     * If `showDeleteConfirmDialog` is set to true, confirm dialog will show delete action. You can also cancel delete command.

     */
    showDeleteConfirmDialog: boolean;
}
/**
 * Configures the conditional based hyper link settings.
 */
export declare class ConditionalSettings extends ChildProperty<ConditionalSettings> {
    /**
     * It allows to set the field name to get visibility of hyperlink based on condition.
     */
    measure: string;
    /**
     * It allows to set the label name to get visibility of hyperlink based on condition.
     */
    label: string;
    /**
     * It allows to set the filter conditions to the field.

     */
    conditions: Condition;
    /**
     * It allows to set the value1 get visibility of hyperlink.
     */
    value1: number;
    /**
     * It allows to set the value2 to get visibility of hyperlink.
     */
    value2: number;
}
/**
 * It holds the settings of Hyperlink.
 */
export declare class HyperlinkSettings extends ChildProperty<HyperlinkSettings> {
    /**
     * It allows to set the visibility of hyperlink in all cells

     */
    showHyperlink: boolean;
    /**
     * It allows to set the visibility of hyperlink in row headers

     */
    showRowHeaderHyperlink: boolean;
    /**
     * It allows to set the visibility of hyperlink in column headers

     */
    showColumnHeaderHyperlink: boolean;
    /**
     * It allows to set the visibility of hyperlink in value cells

     */
    showValueCellHyperlink: boolean;
    /**
     * It allows to set the visibility of hyperlink in summary cells

     */
    showSummaryCellHyperlink: boolean;
    /**
     * It allows to set the visibility of hyperlink based on condition

     */
    conditionalSettings: ConditionalSettingsModel[];
    /**
     * It allows to set the visibility of hyperlink based on header text
     */
    headerText: string;
    /**
     * It allows to set the custom class name for hyperlink options

     */
    cssClass: string;
}
/**
 * It holds the option for configure the chart and grid view.
 */
export declare class DisplayOption extends ChildProperty<DisplayOption> {
    /**
     * It allows the user to switch the view port as table or chart or both

     */
    view: View;
    /**
     * It allows the user to switch the primary view as table or chart

     */
    primary: Primary;
}
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
export declare class PivotView extends Component<HTMLElement> implements INotifyPropertyChanged {
    globalize: Internationalization;
    localeObj: L10n;
    dataType: string;
    tooltip: Tooltip;
    grid: Grid;
    chart: Chart;
    currentView: Primary;
    isChartLoaded: boolean;
    isDragging: boolean;
    isAdaptive: Boolean;
    fieldListSpinnerElement: HTMLElement;
    isRowCellHyperlink: Boolean;
    isColumnCellHyperlink: Boolean;
    isValueCellHyperlink: Boolean;
    isSummaryCellHyperlink: Boolean;
    clonedDataSet: IDataSet[];
    clonedReport: DataSourceSettingsModel;
    verticalScrollScale: number;
    horizontalScrollScale: number;
    scrollerBrowserLimit: number;
    lastSortInfo: ISort;
    lastFilterInfo: IFilter;
    lastAggregationInfo: IFieldOptions;
    lastCalcFieldInfo: ICalculatedFields;
    lastCellClicked: Element;
    isScrolling: boolean;
    pivotView: PivotView;
    renderModule: Render;
    engineModule: PivotEngine;
    olapEngineModule: OlapEngine;
    pivotCommon: PivotCommon;
    axisFieldModule: AxisFields;
    groupingBarModule: GroupingBar;
    pivotButtonModule: PivotButton;
    commonModule: Common;
    pivotFieldListModule: PivotFieldList;
    excelExportModule: ExcelExport;
    pdfExportModule: PDFExport;
    virtualscrollModule: VirtualScroll;
    drillThroughModule: DrillThrough;
    calculatedFieldModule: CalculatedField;
    conditionalFormattingModule: ConditionalFormatting;
    keyboardModule: KeyboardInteraction;
    contextMenuModule: PivotContextMenu;
    toolbarModule: Toolbar;
    chartModule: PivotChart;
    numberFormattingModule: NumberFormatting;
    private defaultLocale;
    private timeOutObj;
    private isEmptyGrid;
    private shiftLockedPos;
    private savedSelectedCellsPos;
    private isPopupClicked;
    private isMouseDown;
    private isMouseUp;
    private lastSelectedElement;
    private fieldsType;
    private defaultItems;
    private isCellBoxMultiSelection;
    gridHeaderCellInfo: CellTemplateArgs[];
    gridCellCollection: {
        [key: string]: HTMLElement;
    };
    rowRangeSelection: {
        enable: boolean;
        startIndex: number;
        endIndex: number;
    };
    pageSettings: IPageSettings;
    virtualDiv: HTMLElement;
    virtualHeaderDiv: HTMLElement;
    resizeInfo: ResizeInfo;
    scrollPosObject: ScrollInfo;
    pivotColumns: PivotColumn[];
    firstColWidth: number | string;
    totColWidth: number;
    posCount: number;
    isModified: boolean;
    lastGridSettings: GridSettingsModel;
    protected needsID: boolean;
    private cellTemplateFn;
    private pivotRefresh;
    /**
     * Defines the currencyCode format of the Pivot widget columns
     * @private
     */
    private currencyCode;
    /**
     * It allows to render pivotfieldlist.

     */
    showFieldList: boolean;
    /**
     * Configures the features settings of Pivot widget.
     */
    gridSettings: GridSettingsModel;
    /**
     * Configures the features settings of Pivot widget.
     */
    chartSettings: ChartSettingsModel;
    /**
     * Configures the settings of GroupingBar.
     */
    groupingBarSettings: GroupingBarSettingsModel;
    /**
     * Configures the settings of hyperlink settings.
     */
    hyperlinkSettings: HyperlinkSettingsModel;
    /**
     * It allows the user to configure the pivot report as per the user need.
     */
    dataSourceSettings: DataSourceSettingsModel;
    /**
     * Configures the edit behavior of the Pivot Grid.

     * mode:'Normal', allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }
     */
    editSettings: CellEditSettingsModel;
    /**
     * Configures the settings of displayOption.
     */
    displayOption: DisplayOptionModel;
    /**
     * It holds the pivot engine data which renders the Pivot widget.
     */
    pivotValues: IPivotValues;
    /**
     * Enables the display of GroupingBar allowing you to filter, sort, and remove fields obtained from the datasource.

     */
    showGroupingBar: boolean;
    /**
     * Allows to display the Tooltip on hovering value cells in pivot grid.

     */
    showTooltip: boolean;
    /**
     * It allows to enable/disable toolbar in pivot table.

     */
    showToolbar: boolean;
    /**
     * It allows to set toolbar items in pivot table.

     */
    toolbar: ToolbarItems[];
    /**
     * It shows a common button for value fields to move together in column or row axis

     */
    showValuesButton: boolean;
    /**
     * It allows to enable calculated field in PivotView.

     */
    allowCalculatedField: boolean;
    /**
     * It allows to enable Value Sorting in PivotView.

     */
    enableValueSorting: boolean;
    /**
     * It allows to enable Conditional Formatting in PivotView.

     */
    allowConditionalFormatting: boolean;
    /**
     * It allows to enable number formatting popup in pivot table.

     */
    allowNumberFormatting: boolean;
    /**
     * Pivot widget. (Note change all occurrences)

     */
    height: string | number;
    /**
     * It allows to set the width of Pivot widget.

     */
    width: string | number;
    /**
     * If `allowExcelExport` is set to true, then it will allow the user to export pivotview to Excel file.

     */
    allowExcelExport: boolean;
    /**
     * If `enableVirtualization` set to true, then the Grid will render only the rows and the columns visible within the view-port
     * and load subsequent rows and columns on vertical scrolling. This helps to load large dataset in Pivot Grid.

     */
    enableVirtualization: boolean;
    /**
     * If `allowDrillThrough` set to true, then you can view the raw items that are used to create a
     * specified value cell in the pivot grid.

     */
    allowDrillThrough: boolean;
    /**
     * If `allowPdfExport` is set to true, then it will allow the user to export pivotview to Pdf file.

     */
    allowPdfExport: boolean;
    /**
     * If `allowDeferLayoutUpdate` is set to true, then it will enable defer layout update to pivotview.

     */
    allowDeferLayoutUpdate: boolean;
    /**
     * If `allowDataCompression` is set to true when virtual scrolling is enabled,
     * the performance of drag and drop, add/remove operations can be improved.
     * Note: It is having limitations in Drill-through, editing and some of the aggregation types.

     */
    allowDataCompression: boolean;
    /**
     * It allows to set the maximum number of nodes to be displayed in the member editor.

     */
    maxNodeLimitInMemberEditor: number;
    /**
     * It allows to set the maximum number of rows to be return while drill through.

     */
    maxRowsInDrillThrough: number;
    /**
     * If `loadOnDemandInMemberEditor` is set to false,
     * then it will load all the level members from cube when doing member filtering initially.
     * Note: This may cause performance lag based on members count that fetch from cube
     * while the member editor pop-up opens for the first time alone.

     */
    loadOnDemandInMemberEditor: boolean;
    /**
     * The template option which is used to render the pivot cells on the pivotview. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the pivot cells.

     */
    cellTemplate: string;
    /**
     * It allows to customize the spinner.

     */
    spinnerTemplate: string;
    /**


     */
    protected queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**


     */
    protected headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**


     */
    protected resizing: EmitType<ResizeArgs>;
    /**


     */
    protected resizeStop: EmitType<ResizeArgs>;
    /**


     */
    protected pdfHeaderQueryCellInfo: EmitType<PdfHeaderQueryCellInfoEventArgs>;
    /**


     */
    protected pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**


     */
    protected excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**


     */
    protected excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    protected columnDragStart: EmitType<ColumnDragEventArgs>;
    protected columnDrag: EmitType<ColumnDragEventArgs>;
    protected columnDrop: EmitType<ColumnDragEventArgs>;
    protected beforePdfExport: EmitType<Object>;
    protected beforeExcelExport: EmitType<Object>;
    /**


     */
    beforeColumnsRender: EmitType<ColumnRenderEventArgs>;
    /**


     */
    selected: EmitType<CellSelectEventArgs>;
    /**


     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**


     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**


     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**


     */
    protected chartTooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**


     */
    protected chartLoaded: EmitType<ILoadedEventArgs>;
    protected chartLoad: EmitType<ILoadedEventArgs>;
    /**


     */
    protected chartResized: EmitType<IResizeEventArgs>;
    /**



     */
    protected chartAxisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**



     */
    contextMenuClick: EmitType<ContextMenuClickEventArgs>;
    /**



     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * This allows any customization of Pivot cell style while  PDF exporting.
     * @event

     */
    onPdfCellRender: EmitType<PdfCellRenderArgs>;
    /**
     * This allows to save the report in any storage.
     * @event
     */
    saveReport: EmitType<SaveReportArgs>;
    /**
     * This allows to fetch the report names from storage.
     * @event

     */
    fetchReport: EmitType<FetchReportArgs>;
    /**
     * This allows to load the report from storage.
     * @event

     */
    loadReport: EmitType<LoadReportArgs>;
    /**
     * This allows to rename the report.
     * @event
     */
    renameReport: EmitType<RenameReportArgs>;
    /**
     * This allows to remove the report from storage.
     * @event
     */
    removeReport: EmitType<RemoveReportArgs>;
    /**
     * This allows to set the new report.
     * @event
     */
    newReport: EmitType<NewReportArgs>;
    /**
     * This allows to change the toolbar items.
     * @event

     */
    toolbarRender: EmitType<ToolbarArgs>;
    /**
     * This allows to change the toolbar items.
     * @event


     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * This allows any customization of PivotView properties on initial rendering.
     * @event

     */
    load: EmitType<LoadEventArgs>;
    /**
     * Triggers before the pivot engine starts to populate and allows to customize the pivot datasource settings.
     * @event

     */
    enginePopulating: EmitType<EnginePopulatingEventArgs>;
    /**
     * Triggers after the pivot engine populated and allows to customize the pivot widget.
     * @event

     */
    enginePopulated: EmitType<EnginePopulatedEventArgs>;
    /**
     * Triggers when a field getting dropped into any axis.
     * @event

     */
    onFieldDropped: EmitType<FieldDroppedEventArgs>;
    /**
     * Triggers when data source is populated in the Pivot View.
     * @event
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when data source is created in the Pivot View.
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggers when data source is destroyed in the Pivot View.
     * @event
     */
    destroyed: EmitType<Object>;
    /**
     * This allows to set properties for exporting.
     * @event


     */
    beforeExport: EmitType<BeforeExportEventArgs>;
    /**
     * This allows to do changes before conditional formatting apply.
     * @event
     */
    conditionalFormatting: EmitType<IConditionalFormatSettings>;
    /**
     * Triggers when cell is clicked in the Pivot widget.
     * @event
     */
    cellClick: EmitType<CellClickEventArgs>;
    /**
     * Triggers when value cell is clicked in the Pivot widget on Drill-Through.
     * @event

     */
    drillThrough: EmitType<DrillThroughEventArgs>;
    /**
     * Triggers when value cell is clicked in the Pivot widget on Editing.
     * @event

     */
    beginDrillThrough: EmitType<BeginDrillThroughEventArgs>;
    /**
     * Triggers when hyperlink cell is clicked in the Pivot widget.
     * @event

     */
    hyperlinkCellClick: EmitType<HyperCellClickEventArgs>;
    /**
     * Triggers before cell got selected in Pivot widget.
     * @event

     */
    cellSelecting: EmitType<PivotCellSelectedEventArgs>;
    /**
     * Triggers before drill down/ drill up Pivot widget.
     * @event
     */
    drill: EmitType<DrillArgs>;
    /**
     * Triggers when cell got selected in Pivot widget.
     * @event

     */
    cellSelected: EmitType<PivotCellSelectedEventArgs>;
    /**
     * Triggers when chart series are created.
     * @event

     */
    chartSeriesCreated: EmitType<ChartSeriesCreatedEventArgs>;
    /**
     * This allows to change the cell value.
     * @event


     */
    aggregateCellInfo: EmitType<AggregateEventArgs>;
    /**
     * This allows to identify each field list update.
     * @event

     */
    fieldListRefreshed: EmitType<FieldListRefreshedEventArgs>;
    /**
     * Constructor for creating the widget
     * @param  {PivotViewModel} options?
     * @param  {string|HTMLElement} element?
     */
    constructor(options?: PivotViewModel, element?: string | HTMLElement);
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}

     */
    requiredModules(): ModuleDeclaration[];
    /**
     * For internal use only - Initializing internal properties;
     * @private
     */
    protected preRender(): void;
    private onBeforeTooltipOpen;
    private renderToolTip;
    renderContextMenu(): void;
    private getDefaultItems;
    private buildDefaultItems;
    private initProperties;
    /**

     */
    updatePageSettings(isInit: boolean): void;
    /**
     * Initialize the control rendering
     * @returns void

     */
    render(): void;
    /**
     * Register the internal events.
     * @returns void

     */
    addInternalEvents(): void;
    /**
     * De-Register the internal events.
     * @returns void

     */
    removeInternalEvents(): void;
    /**
     * Get the Pivot widget properties to be maintained in the persisted state.
     * @returns {string}
     */
    getPersistData(): string;
    /**
     * Loads pivot Layout
     * @param {string} persistData - Specifies the persist data to be loaded to pivot.
     * @returns {void}
     */
    loadPersistData(persistData: string): void;
    private mergePersistPivotData;
    /**
     * Method to open conditional formatting dialog
     */
    showConditionalFormattingDialog(): void;
    /**
     * Method to open calculated field dialog
     */
    createCalculatedFieldDialog(): void;
    /**
     * It returns the Module name.
     * @returns string

     */
    getModuleName(): string;
    /**
     * Copy the selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     * @returns {void}

     */
    copy(withHeader?: boolean): void;
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./api-pivotgrid.html#printmode-string).
     * @returns {void}

     */
    /**
     * Called internally if any of the property value changed.
     * @returns void

     */
    onPropertyChanged(newProp: PivotViewModel, oldProp: PivotViewModel): void;
    templateParser(template: string): Function;
    getCellTemplate(): Function;
    /**
     * Render the UI section of PivotView.
     * @returns void

     */
    renderPivotGrid(): void;
    /**
     * Updates the PivotEngine using dataSource from Pivot View component.
     * @method updateDataSource
     * @return {void}

     */
    updateDataSource(isRefreshGrid?: boolean): void;
    /**
     * Export Pivot widget data to Excel file(.xlsx).
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    excelExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): void;
    /**
     * Export PivotGrid data to CSV file.
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): void;
    /**
     * Export Pivot widget data to PDF document.
     * @param  {pdfExportProperties} PdfExportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns void
     */
    pdfExport(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): void;
    /**
     * Export method for the chart.
     * @param type - Defines the export type.
     * @param fileName - Defines file name of export document.
     * @param orientation - Defines the page orientation on pdf export(0 for Portrait mode, 1 for Landscape mode).
     * @param width - Defines width of the export document.
     * @param height - Defines height of the export document.
     */
    chartExport(type: ExportType, fileName: string, orientation?: PdfPageOrientation, width?: number, height?: number): void;
    /**
     * Print method for the chart.
     */
    printChart(): void;
    onDrill(target: Element, chartDrillInfo?: ChartLabelInfo): void;
    private onOlapDrill;
    private onContentReady;
    private setToolTip;
    private getRowText;
    private getColText;
    private updateClass;
    private mouseRclickHandler;
    private mouseDownHandler;
    private mouseMoveHandler;
    private mouseUpHandler;
    private parentAt;
    private mouseClickHandler;
    private framePivotColumns;
    setGridColumns(gridcolumns: ColumnModel[]): void;
    fillGridColumns(gridcolumns: ColumnModel[]): void;
    triggerColumnRenderEvent(gridcolumns: ColumnModel[]): void;
    setCommonColumnsWidth(columns: ColumnModel[], width: number): void;
    getHeightAsNumber(): number;
    getWidthAsNumber(): number;
    getGridWidthAsNumber(): number;
    onWindowResize(): void;
    /**
     * Refreshes the Pivot Table for blazor layoutRefresh is called for other base refresh is called
     */
    refresh(): void;
    layoutRefresh(): void;
    private CellClicked;
    clearSelection(ele: Element, e: MouseEvent | KeyboardEventArgs, colIndex: number, rowIndex: number): void;
    applyRowSelection(colIndex: number, rowIndex: number, e: MouseEvent): void;
    applyColumnSelection(e: MouseEvent | KeyboardEventArgs, target: Element, colStart: number, colEnd: number, rowStart: number): void;
    private getSelectedCellsPos;
    private setSavedSelectedCells;
    private renderEmptyGrid;
    private initEngine;
    private generateData;
    private getValueCellInfo;
    /**
     * De-Register the internal events.
     * @returns void

     */
    bindTriggerEvents(args?: Object): void;
    private getData;
    private executeQuery;
    applyFormatting(pivotValues: IPivotValues): void;
    private createStyleSheet;
    private applyHyperlinkSettings;
    private checkCondition;
    private wireEvents;
    private unwireEvents;
    /**
     * To destroy the PivotView elements.
     * @returns void
     */
    destroy(): void;
}
