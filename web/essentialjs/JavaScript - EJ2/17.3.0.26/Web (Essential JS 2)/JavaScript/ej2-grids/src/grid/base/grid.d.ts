import { Component, ModuleDeclaration, ChildProperty, TouchEventArgs } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n } from '@syncfusion/ej2-base';
import { KeyboardEvents, EmitType } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GridModel } from './grid-model';
import { ReturnType } from '../base/type';
import { IDialogUI, ScrollPositionType } from './interface';
import { IRenderer, IValueFormatter, IFilterOperator, IIndex, RowDataBoundEventArgs, QueryCellInfoEventArgs } from './interface';
import { CellDeselectEventArgs, CellSelectEventArgs, CellSelectingEventArgs, ParentDetails, ContextMenuItemModel } from './interface';
import { PdfQueryCellInfoEventArgs, ExcelQueryCellInfoEventArgs, ExcelExportProperties, PdfExportProperties } from './interface';
import { PdfHeaderQueryCellInfoEventArgs, ExcelHeaderQueryCellInfoEventArgs, ExportDetailDataBoundEventArgs } from './interface';
import { ColumnMenuOpenEventArgs, BatchCancelArgs, RecordDoubleClickEventArgs, DataResult } from './interface';
import { HeaderCellInfoEventArgs, KeyboardEventArgs } from './interface';
import { FailureEventArgs, FilterEventArgs, ColumnDragEventArgs, GroupEventArgs, PrintEventArgs, ICustomOptr } from './interface';
import { RowDeselectEventArgs, RowSelectEventArgs, RowSelectingEventArgs, PageEventArgs, RowDragEventArgs } from './interface';
import { BeforeBatchAddArgs, BeforeBatchDeleteArgs, BeforeBatchSaveArgs, ResizeArgs, ColumnMenuItemModel, NotifyArgs } from './interface';
import { BatchAddArgs, BatchDeleteArgs, BeginEditArgs, CellEditArgs, CellSaveArgs, BeforeDataBoundArgs, RowInfo } from './interface';
import { DetailDataBoundEventArgs, ColumnChooserEventArgs, AddEventArgs, SaveEventArgs, EditEventArgs, DeleteEventArgs } from './interface';
import { ExcelExportCompleteArgs, PdfExportCompleteArgs, DataStateChangeEventArgs, DataSourceChangedEventArgs } from './interface';
import { SearchEventArgs, SortEventArgs, ISelectedCell, BeforeCopyEventArgs } from './interface';
import { BeforePasteEventArgs, CheckBoxChangeEventArgs, CommandClickEventArgs } from './interface';
import { Render } from '../renderer/render';
import { Column, ColumnModel, ActionEventArgs } from '../models/column';
import { Action, SelectionType, GridLine, SortDirection, SelectionMode, PrintMode, FilterType, FilterBarMode } from './enum';
import { CheckboxSelectionType, HierarchyGridPrintMode, NewRowPosition } from './enum';
import { WrapMode, ToolbarItems, ContextMenuItem, ColumnMenuItem, ToolbarItem, CellSelectionMode, EditMode } from './enum';
import { ColumnQueryModeType } from './enum';
import { Data } from '../actions/data';
import { ServiceLocator } from '../services/service-locator';
import { ColumnWidthService } from '../services/width-controller';
import { AriaService } from '../services/aria-service';
import { SortSettingsModel, SelectionSettingsModel, FilterSettingsModel, SearchSettingsModel, EditSettingsModel } from './grid-model';
import { SortDescriptorModel, PredicateModel, RowDropSettingsModel, GroupSettingsModel, TextWrapSettingsModel } from './grid-model';
import { PageSettingsModel, AggregateRowModel } from '../models/models';
import { Sort } from '../actions/sort';
import { Page } from '../actions/page';
import { Selection } from '../actions/selection';
import { Filter } from '../actions/filter';
import { Search } from '../actions/search';
import { Resize } from '../actions/resize';
import { Reorder } from '../actions/reorder';
import { RowDD } from '../actions/row-reorder';
import { ShowHide } from '../actions/show-hide';
import { Scroll } from '../actions/scroll';
import { Group } from '../actions/group';
import { Print } from '../actions/print';
import { DetailRow } from '../actions/detail-row';
import { Toolbar } from '../actions/toolbar';
import { Edit } from '../actions/edit';
import { Row } from '../models/row';
import { ColumnChooser } from '../actions/column-chooser';
import { ExcelExport } from '../actions/excel-export';
import { PdfExport } from '../actions/pdf-export';
import { Clipboard } from '../actions/clipboard';
import { ContextMenu } from '../actions/context-menu';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { ColumnMenu } from '../actions/column-menu';
import { CheckState } from './enum';
import { Aggregate } from '../actions/aggregate';
/**
 * Represents the field name and direction of sort column.
 */
export declare class SortDescriptor extends ChildProperty<SortDescriptor> {
    /**
     * Defines the field name of sort column.

     */
    field: string;
    /**
     * Defines the direction of sort column.


     */
    direction: SortDirection;
    /**

     * Defines the sorted column whether or from grouping operation.

     */
    isFromGroup: boolean;
}
/**
 * Configures the sorting behavior of Grid.
 */
export declare class SortSettings extends ChildProperty<SortSettings> {
    /**
     * Specifies the columns to sort at initial rendering of Grid.
     * Also user can get current sorted columns.

     */
    columns: SortDescriptorModel[];
    /**
     * If `allowUnsort` set to false the user can not get the grid in unsorted state by clicking the sorted column header.

     */
    allowUnsort: boolean;
}
/**
 * Represents the predicate for the filter column.
 */
export declare class Predicate extends ChildProperty<Predicate> {
    /**
     * Defines the field name of the filter column.

     */
    field: string;
    /**
     * Defines the operator to filter records. The available operators and its supported data types are:
     * <table>
     * <tr>
     * <td colspan=1 rowspan=1>
     * Operator<br/></td><td colspan=1 rowspan=1>
     * Description<br/></td><td colspan=1 rowspan=1>
     * Supported Types<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * startswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value begins with the specified value.<br/></td><td colspan=1 rowspan=1>
     * String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * endswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value ends with the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * contains<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value contains the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * equal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String | Number | Boolean | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * notequal<br/></td><td colspan=1 rowspan=1>
     * Checks for values that are not equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>String | Number | Boolean | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * greaterthan<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is greater than the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * greaterthanorequal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is greater than or equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * lessthan<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is less than the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * lessthanorequal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the value is less than or equal to the specified value.<br/><br/></td><td colspan=1 rowspan=1>
     * <br/>Number | Date<br/></td></tr>
     * </table>



     */
    operator: string;
    /**
     * Defines the value used to filter records.

     */
    value: string | number | Date | boolean;
    /**
     * If match case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).

     */
    matchCase: boolean;
    /**
     * If ignoreAccent is set to true, then filter ignores the diacritic characters or accents while filtering.

     */
    ignoreAccent: boolean;
    /**
     * Defines the relationship between one filter query and another by using AND or OR predicate.

     */
    predicate: string;
    /**

     * Defines the actual filter value for the filter column.
     */
    actualFilterValue: Object;
    /**

     * Defines the actual filter operator for the filter column.
     */
    actualOperator: Object;
    /**

     * Defines the type of the filter column.
     */
    type: string;
    /**

     * Defines the predicate of filter column.
     */
    ejpredicate: Object;
    /**

     * Defines the UID of filter column.
     */
    uid: string;
    /**

     * Defines the foreignKey availability in filtered columns.
     */
    isForeignKey: boolean;
}
/**
 * Configures the filtering behavior of the Grid.
 */
export declare class FilterSettings extends ChildProperty<FilterSettings> {
    /**
     * Specifies the columns to be filtered at initial rendering of the Grid. You can also get the columns that were currently filtered.

     */
    columns: PredicateModel[];
    /**
     * Defines options for filtering type. The available options are
     * * `Menu` - Specifies the filter type as menu.
     * * `CheckBox` - Specifies the filter type as checkbox.
     * * `FilterBar` - Specifies the filter type as filterbar.
     * * `Excel` - Specifies the filter type as checkbox.

     */
    type: FilterType;
    /**
     * Defines the filter bar modes. The available options are,
     * * `OnEnter`: Initiates filter operation after Enter key is pressed.
     * * `Immediate`: Initiates filter operation after a certain time interval. By default, time interval is 1500 ms.

     */
    mode: FilterBarMode;
    /**
     * Shows or hides the filtered status message on the pager.

     */
    showFilterBarStatus: boolean;
    /**
     * Defines the time delay (in milliseconds) in filtering records when the `Immediate` mode of filter bar is set.

     */
    immediateModeDelay: number;
    /**
     * The `operators` is used to override the default operators in filter menu. This should be defined by type wise
     * (string, number, date and boolean). Based on the column type, this customize operator list will render in filter menu.
     *
     * > Check the [`Filter Menu Operator`](../../grid/how-to/#customizing-filter-menu-operators-list/) customization.

     */
    operators: ICustomOptr;
    /**
     * If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     *
     * > Check the [`Diacritics`](../../grid/filtering/#diacritics/) filtering.

     */
    ignoreAccent: boolean;
    /**
     * If `enableCaseSensitivity` is set to true then searches grid records with exact match based on the filter
     * operator. It will have no effect on number, boolean and Date fields.
     *

     */
    enableCaseSensitivity: boolean;
}
/**
 * Configures the selection behavior of the Grid.
 */
export declare class SelectionSettings extends ChildProperty<SelectionSettings> {
    /**
     * Grid supports row, cell, and both (row and cell) selection mode.

     */
    mode: SelectionMode;
    /**
     * The cell selection modes are flow and box. It requires the selection
     * [`mode`](grid/#mode-selectionmode/) to be either cell or both.
     * * `Flow`: Selects the range of cells between start index and end index that also includes the other cells of the selected rows.
     * * `Box`: Selects the range of cells within the start and end column indexes that includes in between cells of rows within the range.
     * * `BoxWithBorder`: Selects the range of cells as like Box mode with borders.

     */
    cellSelectionMode: CellSelectionMode;
    /**
     * Defines options for selection type. They are
     * * `Single`: Allows selection of only a row or a cell.
     * * `Multiple`: Allows selection of multiple rows or cells.

     */
    type: SelectionType;
    /**
     * If 'checkboxOnly' set to true, then the Grid selection is allowed only through checkbox.
     *
     * > To enable checkboxOnly selection, should specify the column type as`checkbox`.

     */
    checkboxOnly: boolean;
    /**
     * If 'persistSelection' set to true, then the Grid selection is persisted on all operations.
     * For persisting selection in the Grid, any one of the column should be enabled as a primary key.

     */
    persistSelection: boolean;
    /**
     * Defines options for checkbox selection Mode. They are
     * * `Default`: This is the default value of the checkboxMode. In this mode, user can select multiple rows by clicking rows one by one.
     * * `ResetOnRowClick`: In ResetOnRowClick mode, on clicking a row it will reset previously selected row and also multiple
     *  rows can be selected by using CTRL or SHIFT key.

     */
    checkboxMode: CheckboxSelectionType;
    /**
     * If 'enableSimpleMultiRowSelection' set to true, then the user can able to perform multiple row selection with single clicks.

     */
    enableSimpleMultiRowSelection: boolean;
    /**
     * If 'enableToggle' set to true, then the user can able to perform toggle for the selected row.

     */
    enableToggle: boolean;
}
/**
 * Configures the search behavior of the Grid.
 */
export declare class SearchSettings extends ChildProperty<SearchSettings> {
    /**
     * Specifies the collection of fields included in search operation. By default, bounded columns of the Grid are included.

     */
    fields: string[];
    /**
     * Specifies the key value to search Grid records at initial rendering.
     * You can also get the current search key.

     */
    key: string;
    /**
     * Defines the operator to search records. The available operators are:
     * <table>
     * <tr>
     * <td colspan=1 rowspan=1>
     * Operator<br/></td><td colspan=1 rowspan=1>
     * Description<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * startswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string begins with the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * endswith<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string ends with the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * contains<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string contains the specified string. <br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * equal<br/></td><td colspan=1 rowspan=1>
     * Checks whether the string is equal to the specified string.<br/></td></tr>
     * <tr>
     * <td colspan=1 rowspan=1>
     * notequal<br/></td><td colspan=1 rowspan=1>
     * Checks for strings not equal to the specified string. <br/></td></tr>
     * </table>



     */
    operator: string;
    /**
     * If `ignoreCase` is set to false, searches records that match exactly, else
     * searches records that are case insensitive(uppercase and lowercase letters treated the same).

     */
    ignoreCase: boolean;
    /**
     * If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     *
     * > Check the [`Diacritics`](../../grid/filtering/#diacritics/) filtering.

     */
    ignoreAccent: boolean;
}
/**
 * Configures the row drop settings of the Grid.
 */
export declare class RowDropSettings extends ChildProperty<RowDropSettings> {
    /**
     * Defines the ID of droppable component on which row drop should occur.

     */
    targetID: string;
}
/**
 * Configures the text wrap settings of the Grid.
 */
export declare class TextWrapSettings extends ChildProperty<TextWrapSettings> {
    /**
     * Defines the `wrapMode` of the Grid. The available modes are:
     * * `Both`: Wraps both the header and content.
     * * `Content`: Wraps the header alone.
     * * `Header`: Wraps the content alone.

     */
    wrapMode: WrapMode;
}
/**
 * Configures the group behavior of the Grid.
 */
export declare class GroupSettings extends ChildProperty<GroupSettings> {
    /**
     * If `showDropArea` is set to true, the group drop area element will be visible at the top of the Grid.

     */
    showDropArea: boolean;
    /**
     * If `showToggleButton` set to true, then the toggle button will be showed in the column headers which can be used to group
     * or ungroup columns by clicking them.

     */
    showToggleButton: boolean;
    /**
     * If `showGroupedColumn` is set to false, it hides the grouped column after grouping.

     */
    showGroupedColumn: boolean;
    /**
     * If `showUngroupButton` set to false, then ungroup button is hidden in dropped element.
     * It can be used to ungroup the grouped column when click on ungroup button.

     */
    showUngroupButton: boolean;
    /**
     * If `disablePageWiseAggregates` set to true, then the group aggregate value will
     * be calculated from the whole data instead of paged data and two requests will be made for each page
     * when Grid bound with remote service.

     */
    disablePageWiseAggregates: boolean;
    /**
     * Specifies the column names to group at initial rendering of the Grid.
     * You can also get the currently grouped columns.

     */
    columns: string[];
    /**
     * The Caption Template allows user to display the string or HTML element in group caption.
     * > It accepts either the
     * [template string](http://ej2.syncfusion.com/documentation/common/template-engine/) or the HTML element ID.

     */
    captionTemplate: string;
}
/**
 * Configures the edit behavior of the Grid.
 */
export declare class EditSettings extends ChildProperty<EditSettings> {
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
    /**
     * Defines the custom edit elements for the dialog template.


     */
    template: string | Object;
    /**
     * Defines the position of adding a new row. The available position are:
     * * Top
     * * Bottom

     */
    newRowPosition: NewRowPosition;
    /**
     * Defines the dialog params to edit.

     */
    dialog: IDialogUI;
    /**
     * If allowNextRowEdit is set to true, editing is done to next row. By default allowNextRowEdit is set to false.

     */
    allowNextRowEdit: boolean;
}
/**
 * Represents the Grid component.
 * ```html
 * <div id="grid"></div>
 * <script>
 *  var gridObj = new Grid({ allowPaging: true });
 *  gridObj.appendTo("#grid");
 * </script>
 * ```
 */
export declare class Grid extends Component<HTMLElement> implements INotifyPropertyChanged {
    private gridPager;
    private isInitial;
    isPreventScrollEvent: boolean;
    private columnModel;
    private rowTemplateFn;
    private editTemplateFn;
    private detailTemplateFn;
    private sortedColumns;
    private footerElement;
    private inViewIndexes;
    private mediaCol;
    private getShowHideService;
    private mediaColumn;
    private media;
    invokedFromMedia: boolean;
    private dataBoundFunction;
    private freezeRefresh;
    recordsCount: number;
    isVirtualAdaptive: boolean;
    vRows: Row<Column>[];
    vcRows: Row<Column>[];
    vGroupOffsets: {
        [x: number]: number;
    };
    isInitialLoad: boolean;
    /**

     */
    mergeCells: {
        [key: string]: number;
    };
    /**

     */
    checkAllRows: CheckState;
    /**

     */
    isCheckBoxSelection: boolean;
    /**

     */
    isPersistSelection: boolean;
    /**
     * Gets the currently visible records of the Grid.
     */
    currentViewData: Object[];
    parentDetails: ParentDetails;
    currentAction: Action;
    isEdit: boolean;
    commonQuery: Query;
    scrollPosition: ScrollPositionType;
    isLastCellPrimaryKey: boolean;
    filterOperators: IFilterOperator;
    localeObj: L10n;
    isSelectedRowIndexUpdating: boolean;
    private defaultLocale;
    private keyConfigs;
    private keyPress;
    private toolTipObj;
    private prevElement;
    private stackedColumn;
    lockcolPositionCount: number;
    prevPageMoving: boolean;
    pageTemplateChange: boolean;
    isAutoGen: boolean;
    /**

     */
    renderModule: Render;
    /**

     */
    headerModule: IRenderer;
    /**

     */
    contentModule: IRenderer;
    /**

     */
    valueFormatterService: IValueFormatter;
    /**

     */
    serviceLocator: ServiceLocator;
    /**

     */
    ariaService: AriaService;
    /**
     * The `keyboardModule` is used to manipulate keyboard interactions in the Grid.
     */
    keyboardModule: KeyboardEvents;
    /**

     */
    widthService: ColumnWidthService;
    /**
     * The `rowDragAndDropModule` is used to manipulate row reordering in the Grid.
     */
    rowDragAndDropModule: RowDD;
    /**
     * The `pagerModule` is used to manipulate paging in the Grid.
     */
    pagerModule: Page;
    /**
     * The `sortModule` is used to manipulate sorting in the Grid.
     */
    sortModule: Sort;
    /**
     * The `filterModule` is used to manipulate filtering in the Grid.
     */
    filterModule: Filter;
    /**
     * The `selectionModule` is used to manipulate selection behavior in the Grid.
     */
    selectionModule: Selection;
    /**
     * The `showHider` is used to manipulate column's show/hide operation in the Grid.
     */
    showHider: ShowHide;
    /**
     * The `searchModule` is used to manipulate searching in the Grid.
     */
    searchModule: Search;
    /**
     * The `scrollModule` is used to manipulate scrolling in the Grid.
     */
    scrollModule: Scroll;
    /**
     * The `reorderModule` is used to manipulate reordering in the Grid.
     */
    reorderModule: Reorder;
    /**
     * `resizeModule` is used to manipulate resizing in the Grid.

     */
    resizeModule: Resize;
    /**
     * The `groupModule` is used to manipulate grouping behavior in the Grid.
     */
    groupModule: Group;
    /**
     * The `printModule` is used to handle the printing feature of the Grid.
     */
    printModule: Print;
    /**
     * The `excelExportModule` is used to handle Excel exporting feature in the Grid.
     */
    excelExportModule: ExcelExport;
    /**
     * The `pdfExportModule` is used to handle PDF exporting feature in the Grid.
     */
    pdfExportModule: PdfExport;
    /**
     * `detailRowModule` is used to handle detail rows rendering in the Grid.

     */
    detailRowModule: DetailRow;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the Grid.
     */
    toolbarModule: Toolbar;
    /**
     * The `contextMenuModule` is used to handle context menu items and its action in the Grid.
     */
    contextMenuModule: ContextMenu;
    /**
     * The `columnMenuModule` is used to manipulate column menu items and its action in the Grid.
     */
    columnMenuModule: ColumnMenu;
    /**
     * The `editModule` is used to handle Grid content manipulation.
     */
    editModule: Edit;
    /**
     * `clipboardModule` is used to handle Grid copy action.
     */
    clipboardModule: Clipboard;
    /**
     * `columnchooserModule` is used to dynamically show or hide the Grid columns.

     */
    columnChooserModule: ColumnChooser;
    /**
     * The `aggregateModule` is used to manipulate aggregate functionality in the Grid.

     */
    aggregateModule: Aggregate;
    private commandColumnModule;
    private loggerModule;
    private enableLogger;
    private focusModule;
    protected needsID: boolean;
    /**
     * Defines the schema of dataSource.
     * If the `columns` declaration is empty or undefined then the `columns` are automatically generated from data source.

     */
    columns: Column[] | string[] | ColumnModel[];
    /**
     * If `enableAltRow` is set to true, the grid will render with `e-altrow` CSS class to the alternative tr elements.
     * > Check the [`AltRow`](../../grid/row/#styling-alternate-rows/) to customize the styles of alternative rows.

     */
    enableAltRow: boolean;
    /**
     * If `enableHover` is set to true, the row hover is enabled in the Grid.

     */
    enableHover: boolean;
    /**
     * If `enableAutoFill` is set to true, then the auto fill icon will displayed on cell selection for copy cells.
     * It requires the selection `mode` to be Cell and `cellSelectionMode` to be `Box`.

     */
    enableAutoFill: boolean;
    /**
     * Enables or disables the key board interaction of Grid.


     */
    allowKeyboard: boolean;
    /**
     * If `allowTextWrap` set to true,
     * then text content will wrap to the next line when its text content exceeds the width of the Column Cells.

     */
    allowTextWrap: boolean;
    /**
     * Configures the text wrap in the Grid.

     */
    textWrapSettings: TextWrapSettingsModel;
    /**
     * If `allowPaging` is set to true, the pager renders at the footer of the Grid. It is used to handle page navigation in the Grid.
     *
     * > Check the [`Paging`](../../grid/paging/) to configure the grid pager.

     */
    allowPaging: boolean;
    /**
     * Configures the pager in the Grid.

     */
    pageSettings: PageSettingsModel;
    /**
     * If `enableVirtualization` set to true, then the Grid will render only the rows visible within the view-port
     * and load subsequent rows on vertical scrolling. This helps to load large dataset in Grid.

     */
    enableVirtualization: boolean;
    /**
     * If `enableColumnVirtualization` set to true, then the Grid will render only the columns visible within the view-port
     * and load subsequent columns on horizontal scrolling. This helps to load large dataset of columns in Grid.

     */
    enableColumnVirtualization: boolean;
    /**
     * Configures the search behavior in the Grid.

     */
    searchSettings: SearchSettingsModel;
    /**
     * If `allowSorting` is set to true, it allows sorting of grid records when column header is clicked.
     *
     * > Check the [`Sorting`](../../grid/sorting/) to customize its default behavior.

     */
    allowSorting: boolean;
    /**
     * If `allowMultiSorting` set to true, then it will allow the user to sort multiple column in the grid.
     * > `allowSorting` should be true.

     */
    allowMultiSorting: boolean;
    /**
     * If `allowExcelExport` set to true, then it will allow the user to export grid to Excel file.
     *
     * > Check the [`ExcelExport`](../../grid/excel-exporting/) to configure exporting document.

     */
    allowExcelExport: boolean;
    /**
     * If `allowPdfExport` set to true, then it will allow the user to export grid to Pdf file.
     *
     * > Check the [`Pdfexport`](../../grid/pdf-export/) to configure the exporting document.

     */
    allowPdfExport: boolean;
    /**
     * Configures the sort settings.

     */
    sortSettings: SortSettingsModel;
    /**
     * If `allowSelection` is set to true, it allows selection of (highlight row) Grid records by clicking it.

     */
    allowSelection: boolean;
    /**
     * The `selectedRowIndex` allows you to select a row at initial rendering.
     * You can also get the currently selected row index.

     */
    selectedRowIndex: number;
    /**
     * Configures the selection settings.

     */
    selectionSettings: SelectionSettingsModel;
    /**
     * If `allowFiltering` set to true the filter bar will be displayed.
     * If set to false the filter bar will not be displayed.
     * Filter bar allows the user to filter grid records with required criteria.
     *
     * > Check the [`Filtering`](../../grid/filtering/) to customize its default behavior.

     */
    allowFiltering: boolean;
    /**
     * If `allowReordering` is set to true, Grid columns can be reordered.
     * Reordering can be done by drag and drop of a particular column from one index to another index.
     * > If Grid is rendered with stacked headers, reordering is allowed only at the same level as the column headers.

     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to true, Grid columns can be resized.

     */
    allowResizing: boolean;
    /**
     * If `allowRowDragAndDrop` is set to true, you can drag and drop grid rows at another grid.

     */
    allowRowDragAndDrop: boolean;
    /**
     * Configures the row drop settings.

     */
    rowDropSettings: RowDropSettingsModel;
    /**
     * Configures the filter settings of the Grid.

     */
    filterSettings: FilterSettingsModel;
    /**
     * If `allowGrouping` set to true, then it will allow the user to dynamically group or ungroup columns.
     * Grouping can be done by drag and drop columns from column header to group drop area.
     *
     * > Check the [`Grouping`](../../grid/grouping/) to customize its default behavior.

     */
    allowGrouping: boolean;
    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.
     *
     * > Check the [`Column menu`](../../grid/columns/#column-menu/) for its configuration.

     */
    showColumnMenu: boolean;
    /**
     * Configures the group settings.

     */
    groupSettings: GroupSettingsModel;
    /**
     * Configures the edit settings.

     * allowEditOnDblClick: true, showConfirmDialog: true, showDeleteConfirmDialog: false }
     */
    editSettings: EditSettingsModel;
    /**
     * Configures the Grid aggregate rows.
     * > Check the [`Aggregates`](../../grid/aggregates/) for its configuration.

     */
    aggregates: AggregateRowModel[];
    /**
     * If `showColumnChooser` is set to true, it allows you to dynamically show or hide columns.
     *
     * > Check the [`ColumnChooser`](../../grid/columns/#column-chooser/) for its configuration.

     */
    showColumnChooser: boolean;
    /**
     * Defines the scrollable height of the grid content.

     */
    height: string | number;
    /**
     * Defines the Grid width.

     */
    width: string | number;
    /**
     * Defines the mode of grid lines. The available modes are,
     * * `Both`: Displays both horizontal and vertical grid lines.
     * * `None`: No grid lines are displayed.
     * * `Horizontal`: Displays the horizontal grid lines only.
     * * `Vertical`: Displays the vertical grid lines only.
     * * `Default`: Displays grid lines based on the theme.

     */
    gridLines: GridLine;
    /**
     * The row template that renders customized rows from the given template.
     * By default, Grid renders a table row for every data source item.
     * > * It accepts either [template string](../../common/template-engine/) or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [`Row Template`](grid/row/) customization.
     */
    rowTemplate: string;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     *
     * {% codeBlock src="grid/detail-template-api/index.ts" %}{% endcodeBlock %}
     */
    detailTemplate: string;
    /**
     * Defines Grid options to render child Grid.
     * It requires the [`queryString`](grid/#querystring-string) for parent
     * and child relationship.
     *
     * > Check the [`Child Grid`](../../grid/hierarchy-grid/) for its configuration.

     */
    childGrid: GridModel;
    /**
     * Defines the relationship between parent and child datasource. It acts as the foreign key for parent datasource.
     */
    queryString: string;
    /**
     * Defines the print modes. The available print modes are
     * * `AllPages`: Prints all pages of the Grid.
     * * `CurrentPage`: Prints the current page of the Grid.

     */
    printMode: PrintMode;
    /**
     * Defines the hierarchy grid print modes. The available modes are
     * * `Expanded` - Prints the master grid with expanded child grids.
     * * `All` - Prints the master grid with all the child grids.
     * * `None` - Prints the master grid alone.

     */
    hierarchyPrintMode: HierarchyGridPrintMode;
    /**
     * It is used to render grid table rows.
     * If the `dataSource` is an array of JavaScript objects,
     * then Grid will create instance of [`DataManager`](https://ej2.syncfusion.com/documentation/data/api-dataManager.html)
     * from this `dataSource`.
     * If the `dataSource` is an existing [`DataManager`](https://ej2.syncfusion.com/documentation/data/api-dataManager.html),
     *  the Grid will not initialize a new one.
     *
     * > Check the available [`Adaptors`](../../data/adaptors/) to customize the data operation.


     */
    dataSource: Object | DataManager | DataResult;
    /**
     * Defines the height of Grid rows.

     */
    rowHeight: number;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.

     */
    query: Query;
    /**
     * Defines the currencyCode format of the Grid columns
     * @private
     */
    private currencyCode;
    /**
     * `toolbar` defines the ToolBar items of the Grid.
     * It contains built-in and custom toolbar items.
     * If a string value is assigned to the `toolbar` option, it is considered as the template for the whole Grid ToolBar.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the Grid's Toolbar.
     * <br><br>
     * The available built-in ToolBar items are:
     * * Add: Adds a new record.
     * * Edit: Edits the selected record.
     * * Update: Updates the edited record.
     * * Delete: Deletes the selected record.
     * * Cancel: Cancels the edit state.
     * * Search: Searches records by the given key.
     * * Print: Prints the Grid.
     * * ExcelExport - Export the Grid to Excel(excelExport() method manually to make export.)
     * * PdfExport - Export the Grid to PDF(pdfExport() method manually to make export.)
     * * CsvExport - Export the Grid to CSV(csvExport() method manually to make export.)<br><br>
     * The following code example implements the custom toolbar items.
     *
     *  > Check the [`Toolbar`](../../grid/tool-bar/#custom-toolbar-items/) to customize its default items.
     *
     * {% codeBlock src="grid/toolbar-api/index.ts" %}{% endcodeBlock %}

     */
    toolbar: (ToolbarItems | string | ItemModel | ToolbarItem)[];
    /**
     * `contextMenuItems` defines both built-in and custom context menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Group` - Group by current column.
     * * `Ungroup` - Ungroup by current column.
     * * `Edit` - Edit the current record.
     * * `Delete` - Delete the current record.
     * * `Save` - Save the edited record.
     * * `Cancel` - Cancel the edited state.
     * * `Copy` - Copy the selected records.
     * * `PdfExport` - Export the grid as Pdf format.
     * * `ExcelExport` - Export the grid as Excel format.
     * * `CsvExport` - Export the grid as CSV format.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `FirstPage` - Go to the first page.
     * * `PrevPage` - Go to the previous page.
     * * `LastPage` - Go to the last page.
     * * `NextPage` - Go to the next page.
     *

     */
    contextMenuItems: ContextMenuItem[] | ContextMenuItemModel[];
    /**
     * `columnMenuItems` defines both built-in and custom column menu items.
     * <br><br>
     * The available built-in items are,
     * * `AutoFitAll` - Auto fit the size of all columns.
     * * `AutoFit` - Auto fit the current column.
     * * `Group` - Group by current column.
     * * `Ungroup` - Ungroup by current column.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property like checkbox filter, excel filter, menu filter.

     */
    columnMenuItems: ColumnMenuItem[] | ColumnMenuItemModel[];
    /**
     * It used to render toolbar template

     */
    toolbarTemplate: string;
    /**
     * It used to render pager template

     */
    pagerTemplate: string;
    /**
     * Gets or sets the number of frozen rows.

     */
    frozenRows: number;
    /**
     * Gets or sets the number of frozen columns.

     */
    frozenColumns: number;
    /**
     * `columnQueryMode`provides options to retrive data from the datasource.Their types are
     * * `All`: It Retrives whole datasource.
     * * `Schema`: Retrives data for all the defined columns in grid from the datasource.
     * * `ExcludeHidden`: Retrives data only for visible columns of grid from the dataSource.

     */
    columnQueryMode: ColumnQueryModeType;
    /**
     * Triggers when the component is created.
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     * @event

     */
    destroyed: EmitType<Object>;
    /**
     * This event allows customization of Grid properties before rendering.
     * @event

     */
    load: EmitType<Object>;
    /**
     * Triggered every time a request is made to access row information, element, or data.
     * This will be triggered before the row element is appended to the Grid element.
     * @event

     */
    rowDataBound: EmitType<RowDataBoundEventArgs>;
    /**
     * Triggered every time a request is made to access cell information, element, or data.
     * This will be triggered before the cell element is appended to the Grid element.
     * @event

     */
    queryCellInfo: EmitType<QueryCellInfoEventArgs>;
    /**
     * Triggered for stacked header.
     * @event

     */
    headerCellInfo: EmitType<HeaderCellInfoEventArgs>;
    /**
     * Triggers when Grid actions such as sorting, filtering, paging, grouping etc., starts.
     * @event

     */
    actionBegin: EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs>;
    /**
     * Triggers when Grid actions such as sorting, filtering, paging, grouping etc. are completed.
     * @event

     */
    actionComplete: EmitType<PageEventArgs | GroupEventArgs | FilterEventArgs | SearchEventArgs | SortEventArgs | AddEventArgs | SaveEventArgs | EditEventArgs | DeleteEventArgs | ActionEventArgs>;
    /**
     * Triggers when any Grid action failed to achieve the desired results.
     * @event

     */
    actionFailure: EmitType<FailureEventArgs>;
    /**
     * Triggers when data source is populated in the Grid.
     * @event

     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when record is double clicked.
     * @event

     */
    recordDoubleClick: EmitType<RecordDoubleClickEventArgs>;
    /**
     * Triggers before row selection occurs.
     * @event

     */
    rowSelecting: EmitType<RowSelectingEventArgs>;
    /**
     * Triggers after a row is selected.
     * @event

     */
    rowSelected: EmitType<RowSelectEventArgs>;
    /**
     * Triggers before deselecting the selected row.
     * @event
     */
    rowDeselecting: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers when a selected row is deselected.
     * @event

     */
    rowDeselected: EmitType<RowDeselectEventArgs>;
    /**
     * Triggers before any cell selection occurs.
     * @event

     */
    cellSelecting: EmitType<CellSelectingEventArgs>;
    /**
     * Triggers after a cell is selected.
     * @event

     */
    cellSelected: EmitType<CellSelectEventArgs>;
    /**
     * Triggers before the selected cell is deselecting.
     * @event

     */
    cellDeselecting: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when a particular selected cell is deselected.
     * @event

     */
    cellDeselected: EmitType<CellDeselectEventArgs>;
    /**
     * Triggers when column header element drag (move) starts.
     * @event

     */
    columnDragStart: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when column header element is dragged (moved) continuously.
     * @event

     */
    columnDrag: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers when a column header element is dropped on the target column.
     * @event

     */
    columnDrop: EmitType<ColumnDragEventArgs>;
    /**
     * Triggers after print action is completed.
     * @event

     */
    printComplete: EmitType<PrintEventArgs>;
    /**
     * Triggers before the print action starts.
     * @event

     */
    beforePrint: EmitType<PrintEventArgs>;
    /**
     * Triggers before exporting each cell to PDF document. You can also customize the PDF cells.
     * @event

     */
    pdfQueryCellInfo: EmitType<PdfQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to PDF document. You can also customize the PDF cells.
     * @event

     */
    pdfHeaderQueryCellInfo: EmitType<PdfHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each detail Grid to PDF document.
     * @event

     */
    exportDetailDataBound: EmitType<ExportDetailDataBoundEventArgs>;
    /**
     * Triggers before exporting each cell to Excel file.
     * You can also customize the Excel cells.
     * @event

     */
    excelQueryCellInfo: EmitType<ExcelQueryCellInfoEventArgs>;
    /**
     * Triggers before exporting each header cell to Excel file.
     * You can also customize the Excel cells.
     * @event

     */
    excelHeaderQueryCellInfo: EmitType<ExcelHeaderQueryCellInfoEventArgs>;
    /**
     * Triggers before Grid data is exported to Excel file.
     * @event

     */
    beforeExcelExport: EmitType<Object>;
    /**
     * Triggers after Grid data is exported to Excel file.
     * @event

     */
    excelExportComplete: EmitType<ExcelExportCompleteArgs>;
    /**
     * Triggers before Grid data is exported to PDF document.
     * @event

     */
    beforePdfExport: EmitType<Object>;
    /**
     * Triggers after Grid data is exported to PDF document.
     * @event

     */
    pdfExportComplete: EmitType<PdfExportCompleteArgs>;
    /**
     * Triggers when row element's before drag(move).
     * @event

     */
    rowDragStartHelper: EmitType<RowDragEventArgs>;
    /**
     * Triggers after detail row expands.
     * > This event triggers at initial expand.
     * @event

     */
    detailDataBound: EmitType<DetailDataBoundEventArgs>;
    /**
     * Triggers when row element's drag(move) starts.
     * @event

     */
    rowDragStart: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row elements are dragged (moved) continuously.
     * @event

     */
    rowDrag: EmitType<RowDragEventArgs>;
    /**
     * Triggers when row elements are dropped on the target row.
     * @event

     */
    rowDrop: EmitType<RowDragEventArgs>;
    /**
     * Triggers when toolbar item is clicked.
     * @event


     */
    toolbarClick: EmitType<ClickEventArgs>;
    /**
     * Triggers before the columnChooser open.
     * @event

     */
    beforeOpenColumnChooser: EmitType<ColumnChooserEventArgs>;
    /**
     * Triggers when records are added in batch mode.
     * @event

     */
    batchAdd: EmitType<BatchAddArgs>;
    /**
     * Triggers when records are deleted in batch mode.
     * @event

     */
    batchDelete: EmitType<BatchDeleteArgs>;
    /**
     * Triggers when cancel the batch edit changes batch mode.
     * @event

     */
    batchCancel: EmitType<BatchCancelArgs>;
    /**
     * Triggers before records are added in batch mode.
     * @event

     */
    beforeBatchAdd: EmitType<BeforeBatchAddArgs>;
    /**
     * Triggers before records are deleted in batch mode.
     * @event

     */
    beforeBatchDelete: EmitType<BeforeBatchDeleteArgs>;
    /**
     * Triggers before records are saved in batch mode.
     * @event

     */
    beforeBatchSave: EmitType<BeforeBatchSaveArgs>;
    /**
     * Triggers before the record is to be edit.
     * @event

     */
    beginEdit: EmitType<BeginEditArgs>;
    /**
     * Triggers when command button is clicked.
     * @event

     */
    commandClick: EmitType<CommandClickEventArgs>;
    /**
     * Triggers when the cell is being edited.
     * @event

     */
    cellEdit: EmitType<CellEditArgs>;
    /**
     * Triggers when cell is saved.
     * @event

     */
    cellSave: EmitType<CellSaveArgs>;
    /**
     * Triggers when cell is saved.
     * @event

     */
    cellSaved: EmitType<CellSaveArgs>;
    /**
     * Triggers when column resize starts.
     * @event

     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers on column resizing.
     * @event

     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Triggers when column resize ends.
     * @event

     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when any keyboard keys are pressed inside the grid.
     * @event

     */
    keyPressed: EmitType<KeyboardEventArgs>;
    /**
     * Triggers before data is bound to Grid.
     * @event

     */
    beforeDataBound: EmitType<BeforeDataBoundArgs>;
    /**
     * Triggers before context menu opens.
     * @event

     */
    contextMenuOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when click on context menu.
     * @event


     */
    contextMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers before column menu opens.
     * @event

     */
    columnMenuOpen: EmitType<ColumnMenuOpenEventArgs>;
    /**
     * Triggers when click on column menu.
     * @event


     */
    columnMenuClick: EmitType<MenuEventArgs>;
    /**
     * Triggers when the check box state change in checkbox column.
     * @event

     */
    checkBoxChange: EmitType<CheckBoxChangeEventArgs>;
    /**
     * Triggers before Grid copy action.
     * @event

     */
    beforeCopy: EmitType<BeforeCopyEventArgs>;
    /**
     * Triggers before Grid paste action.
     * @event

     */
    beforePaste: EmitType<BeforePasteEventArgs>;
    /**
     * Triggers when the grid actions such as Sorting, Paging, Grouping etc., are done.
     * In this event,the current view data and total record count should be assigned to the `dataSource` based on the action performed.
     * @event

     */
    dataStateChange: EmitType<DataStateChangeEventArgs>;
    /**
     * Triggers when the grid data is added, deleted and updated.
     * Invoke the done method from the argument to start render after edit operation.
     * @event

     */
    dataSourceChanged: EmitType<DataSourceChangedEventArgs>;
    /**
     * Constructor for creating the component

     */
    constructor(options?: GridModel, element?: string | HTMLElement);
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}

     */
    getPersistData(): string;
    /**
     * To provide the array of modules needed for component rendering
     * @return {ModuleDeclaration[]}

     */
    requiredModules(): ModuleDeclaration[];
    extendRequiredModules(modules: ModuleDeclaration[]): void;
    /**
     * For internal use only - Initialize the event handler;
     * @private
     */
    protected preRender(): void;
    private initProperties;
    /**
     * For internal use only - To Initialize the component rendering.
     * @private
     */
    protected render(): void;
    /**
     * By default, grid shows the spinner for all its actions. You can use this method to show spinner at your needed time.
     */
    showSpinner(): void;
    /**
     * Manually showed spinner needs to hide by `hideSpinnner`.
     */
    hideSpinner(): void;
    private updateStackedFilter;
    private getMediaColumns;
    private pushMediaColumn;
    /**

     */
    updateMediaColumns(col: Column): void;
    /**

     */
    mediaQueryUpdate(columnIndex: number, e?: MediaQueryList): void;
    private refreshMediaCol;
    /**
     * For internal use only - Initialize the event handler
     * @private
     */
    protected eventInitializer(): void;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    private destroyDependentModules;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private enableBoxSelection;
    /**
     * Called internally if any of the property value changed.

     */
    onPropertyChanged(newProp: GridModel, oldProp: GridModel): void;
    private extendedPropertyChange;
    private maintainSelection;
    /**
     * @private
     */
    setProperties(prop: Object, muteOnChange?: boolean): void;
    /**

     */
    updateDefaultCursor(): void;
    private updateColumnModel;
    private updateFrozenColumns;
    private updateLockableColumns;
    private checkLockColumns;
    /**
     * Gets the columns from the Grid.
     * @return {Column[]}

     */
    getColumns(isRefresh?: boolean): Column[];
    /**
     * @private
     */
    getStackedHeaderColumnByHeaderText(stackedHeader: string, col: Column[]): Column;
    /**
     * @private
     */
    getColumnIndexesInView(): number[];
    /**
     * @private
     */
    getQuery(): Query;
    /**
     * @private
     */
    getLocaleConstants(): Object;
    /**
     * @private
     */
    setColumnIndexesInView(indexes: number[]): void;
    /**
     * Gets the visible columns from the Grid.
     * @return {Column[]}

     */
    getVisibleColumns(): Column[];
    /**
     * Gets the header div of the Grid.
     * @return {Element}
     */
    getHeaderContent(): Element;
    /**
     * Sets the header div of the Grid to replace the old header.
     * @param  {Element} element - Specifies the Grid header.
     * @return {void}
     */
    setGridHeaderContent(element: Element): void;
    /**
     * Gets the content table of the Grid.
     * @return {Element}
     */
    getContentTable(): Element;
    /**
     * Sets the content table of the Grid to replace the old content table.
     * @param  {Element} element - Specifies the Grid content table.
     * @return {void}
     */
    setGridContentTable(element: Element): void;
    /**
     * Gets the content div of the Grid.
     * @return {Element}
     */
    getContent(): Element;
    /**
     * Sets the content div of the Grid to replace the old Grid content.
     * @param  {Element} element - Specifies the Grid content.
     * @return {void}
     */
    setGridContent(element: Element): void;
    /**
     * Gets the header table element of the Grid.
     * @return {Element}
     */
    getHeaderTable(): Element;
    /**
     * Sets the header table of the Grid to replace the old one.
     * @param  {Element} element - Specifies the Grid header table.
     * @return {void}
     */
    setGridHeaderTable(element: Element): void;
    /**
     * Gets the footer div of the Grid.
     * @return {Element}
     */
    getFooterContent(): Element;
    /**
     * Gets the footer table element of the Grid.
     * @return {Element}
     */
    getFooterContentTable(): Element;
    /**
     * Gets the pager of the Grid.
     * @return {Element}
     */
    getPager(): Element;
    /**
     * Sets the pager of the Grid to replace the old pager.
     * @param  {Element} element - Specifies the Grid pager.
     * @return {void}
     */
    setGridPager(element: Element): void;
    /**
     * Gets a row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    getRowByIndex(index: number): Element;
    /**
     * Gets a movable tables row by index.
     * @param  {number} index - Specifies the row index.
     * @return {Element}
     */
    getMovableRowByIndex(index: number): Element;
    /**
     * Gets all the data rows of the Grid.
     * @return {Element[]}
     */
    getRows(): Element[];
    /**
     * Get a row information based on cell
     * @param {Element}
     * @return RowInfo
     */
    getRowInfo(target: Element | EventTarget): RowInfo;
    /**
     * Gets the Grid's movable content rows from frozen grid.
     * @return {Element[]}
     */
    getMovableRows(): Element[];
    /**
     * Gets all the Grid's data rows.
     * @return {Element[]}
     */
    getDataRows(): Element[];
    /**

     */
    addMovableRows(fRows: HTMLElement[], mrows: HTMLElement[]): HTMLElement[];
    private generateDataRows;
    /**
     * Gets all the Grid's movable table data rows.
     * @return {Element[]}
     */
    getMovableDataRows(): Element[];
    /**
     * Updates particular cell value based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     * @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     * @param {string } field - Specifies the field name which you want to update.
     * @param {string | number | boolean | Date} value - To update new value for the particular cell.
     */
    setCellValue(key: string | number, field: string, value: string | number | boolean | Date): void;
    /**
     * Updates and refresh the particular row values based on the given primary key value.
     * > Primary key column must be specified using `columns.isPrimaryKey` property.
     *  @param {string| number} key - Specifies the PrimaryKey value of dataSource.
     *  @param {Object} rowData - To update new data for the particular row.
     */
    setRowData(key: string | number, rowData?: Object): void;
    /**
     * Gets a cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    getCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a movable table cell by row and column index.
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @return {Element}
     */
    getMovableCellFromIndex(rowIndex: number, columnIndex: number): Element;
    /**
     * Gets a column header by column index.
     * @param  {number} index - Specifies the column index.
     * @return {Element}
     */
    getColumnHeaderByIndex(index: number): Element;
    /**

     */
    getRowObjectFromUID(uid: string): Row<Column>;
    private rowObject;
    /**

     */
    getRowsObject(): Row<Column>[];
    /**

     */
    getMovableRowsObject(): Row<Column>[];
    /**
     * Gets a column header by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Element}
     */
    getColumnHeaderByField(field: string): Element;
    /**
     * Gets a column header by UID.
     * @param  {string} field - Specifies the column uid.
     * @return {Element}
     */
    getColumnHeaderByUid(uid: string): Element;
    /**


     */
    getColumnByIndex(index: number): Column;
    /**
     * Gets a Column by column name.
     * @param  {string} field - Specifies the column name.
     * @return {Column}

     */
    getColumnByField(field: string): Column;
    /**
     * Gets a column index by column name.
     * @param  {string} field - Specifies the column name.
     * @return {number}
     */
    getColumnIndexByField(field: string): number;
    /**
     * Gets a column by UID.
     * @param  {string} uid - Specifies the column UID.
     * @return {Column}

     */
    getColumnByUid(uid: string): Column;
    /**

     */
    getStackedColumns(columns: Column[], stackedColumn?: Column[]): Column[];
    /**
     * Gets a column index by UID.
     * @param  {string} uid - Specifies the column UID.
     * @return {number}
     */
    getColumnIndexByUid(uid: string): number;
    /**
     * Gets UID by column name.
     * @param  {string} field - Specifies the column name.
     * @return {string}
     */
    getUidByColumnField(field: string): string;
    /**
     * Gets TH index by column uid value.
     * @private
     * @param  {string} uid - Specifies the column uid.
     * @return {number}
     */
    getNormalizedColumnIndex(uid: string): number;
    /**
     * Gets the collection of column fields.
     * @return {string[]}
     */
    getColumnFieldNames(): string[];
    /**
     * Gets a compiled row template.
     * @return {Function}
     * @private
     */
    getRowTemplate(): Function;
    /**
     * Gets a compiled detail row template.
     * @private
     * @return {Function}
     */
    getDetailTemplate(): Function;
    /**
     * Gets a compiled detail row template.
     * @private
     * @return {Function}
     */
    getEditTemplate(): Function;
    /**
     * Get the names of the primary key columns of the Grid.
     * @return {string[]}
     */
    getPrimaryKeyFieldNames(): string[];
    /**
     * Refreshes the Grid header and content.
     */
    refresh(): void;
    /**
     * Refreshes the Grid header.
     */
    refreshHeader(): void;
    /**
     * Gets the collection of selected rows.
     * @return {Element[]}
     */
    getSelectedRows(): Element[];
    /**
     * Gets the collection of selected row indexes.
     * @return {number[]}
     */
    getSelectedRowIndexes(): number[];
    /**
     * Gets the collection of selected row and cell indexes.
     * @return {number[]}
     */
    getSelectedRowCellIndexes(): ISelectedCell[];
    /**
     * Gets the collection of selected records.
     * @return {Object[]}

     */
    getSelectedRecords(): Object[];
    /**
     * Gets the data module.
     * @return {Data}
     */
    getDataModule(): Data;
    /**
     * Shows a column by its column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    showColumns(keys: string | string[], showBy?: string): void;
    /**
     * Hides a column by column name.
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @return {void}
     */
    hideColumns(keys: string | string[], hideBy?: string): void;
    /**

     */
    getFrozenColumns(): number;
    /**

     */
    getVisibleFrozenColumns(): number;
    private getVisibleFrozenColumnsCount;
    private getVisibleFrozenCount;
    private getFrozenCount;
    /**
     * Navigates to the specified target page.
     * @param  {number} pageNo - Defines the page number to navigate.
     * @return {void}
     */
    goToPage(pageNo: number): void;
    /**
     * Defines the text of external message.
     * @param  {string} message - Defines the message to update.
     * @return {void}
     */
    updateExternalMessage(message: string): void;
    /**
     * Sorts a column with the given options.
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @return {void}
     */
    sortColumn(columnName: string, direction: SortDirection, isMultiSort?: boolean): void;
    /**
     * Clears all the sorted columns of the Grid.
     * @return {void}
     */
    clearSorting(): void;
    /**
     * Remove sorted column by field name.
     * @param {string} field - Defines the column field name to remove sort.
     * @return {void}

     */
    removeSortColumn(field: string): void;
    /**
     * Filters grid row by column name with the given options.
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, the grid filters the records with exact match. if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @return {void}
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: string, actualOperator?: string): void;
    /**
     * Clears all the filtered rows of the Grid.
     * @return {void}
     */
    clearFiltering(): void;
    /**
     * Removes filtered column by field name.
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @return {void}

     */
    removeFilteredColsByField(field: string, isClearFilterBar?: boolean): void;
    /**
     * Selects a row by given index.
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectRow(index: number, isToggle?: boolean): void;
    /**
     * Selects a collection of rows by indexes.
     * @param  {number[]} rowIndexes - Specifies the row indexes.
     * @return {void}
     */
    selectRows(rowIndexes: number[]): void;
    /**
     * Deselects the current selected rows and cells.
     * @return {void}
     */
    clearSelection(): void;
    /**
     * Selects a cell by the given index.
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @return {void}
     */
    selectCell(cellIndex: IIndex, isToggle?: boolean): void;
    /**
     * Selects a range of cells from start and end indexes.
     * @param  {IIndex} startIndex - Specifies the row and column's start index.
     * @param  {IIndex} endIndex - Specifies the row and column's end index.
     * @return {void}
     */
    selectCellsByRange(startIndex: IIndex, endIndex?: IIndex): void;
    /**
     * Searches Grid records using the given key.
     * You can customize the default search option by using the
     * [`searchSettings`](./#searchsettings/).
     * @param  {string} searchString - Defines the key.
     * @return {void}
     */
    search(searchString: string): void;
    /**
     * By default, prints all the pages of the Grid and hides the pager.
     * > You can customize print options using the
     * [`printMode`](./#printmode).
     * @return {void}
     */
    print(): void;
    /**
     * Delete a record with Given options. If fieldname and data is not given then grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field, 'Name of the column'.
     * @param {Object} data - Defines the JSON data of the record to be deleted.
     */
    deleteRecord(fieldname?: string, data?: Object): void;
    /**
     * Starts edit the selected row. At least one row must be selected before invoking this method.
     * `editSettings.allowEditing` should be true.
     * @return {void}
     */
    startEdit(): void;
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     */
    endEdit(): void;
    /**
     * Cancels edited state.
     */
    closeEdit(): void;
    /**
     * Adds a new record to the Grid. Without passing parameters, it adds empty rows.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     */
    addRecord(data?: Object, index?: number): void;
    /**
     * Delete any visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    deleteRow(tr: HTMLTableRowElement): void;
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     */
    editCell(index: number, field: string): void;
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     */
    saveCell(): void;
    /**
     * To update the specified cell by given value without changing into edited state.
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     */
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    /**
     * To update the specified row by given values without changing into edited state.
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     */
    updateRow(index: number, data: Object): void;
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     * @return {Object}
     */
    getBatchChanges(): Object;
    /**
     * Enables or disables ToolBar items.
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @return {void}
     */
    enableToolbarItems(items: string[], isEnable: boolean): void;
    /**
     * Copy the selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header text needs to be copied along with rows or cells.
     */
    copy(withHeader?: boolean): void;
    /**

     */
    recalcIndentWidth(): void;
    /**

     */
    isRowDragable(): boolean;
    /**
     * Changes the Grid column positions by field names.
     * @param  {string} fromFName - Defines the origin field name.
     * @param  {string} toFName - Defines the destination field name.
     * @return {void}
     */
    reorderColumns(fromFName: string | string[], toFName: string): void;
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByIndex multiple times,
     * then you won't get the same results every time.
     * @param  {number} fromIndex - Defines the origin field index.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    reorderColumnByIndex(fromIndex: number, toIndex: number): void;
    /**
     * Changes the Grid column positions by field index. If you invoke reorderColumnByTargetIndex multiple times,
     * then you will get the same results every time.
     * @param  {string} fieldName - Defines the field name.
     * @param  {number} toIndex - Defines the destination field index.
     * @return {void}
     */
    reorderColumnByTargetIndex(fieldName: string | string[], toIndex: number): void;
    /**
     * Changes the Grid Row position with given indexes.
     * @param  {number} fromIndexes - Defines the origin Indexes.
     * @param  {number} toIndex - Defines the destination Index.
     * @return {void}
     */
    reorderRows(fromIndexes: number[], toIndex: number): void;
    /**

     */
    refreshDataSource(e: ReturnType, args: NotifyArgs): void;
    /**

     */
    disableRowDD(enable: boolean): void;
    /**
     * Changes the column width to automatically fit its content to ensure that the width shows the content without wrapping/hiding.
     * > * This method ignores the hidden columns.
     * > * Uses the `autoFitColumns` method in the `dataBound` event to resize at initial rendering.
     * @param  {string |string[]} fieldNames - Defines the column names.
     * @return {void}
     *
     *
     * ```typescript
     * <div id="Grid"></div>
     * <script>
     * let gridObj: Grid = new Grid({
     *     dataSource: employeeData,
     *     columns: [
     *         { field: 'OrderID', headerText: 'Order ID', width:100 },
     *         { field: 'EmployeeID', headerText: 'Employee ID' }],
     *     dataBound: () => gridObj.autoFitColumns('EmployeeID')
     * });
     * gridObj.appendTo('#Grid');
     * </script>
     * ```
     *
     */
    autoFitColumns(fieldNames?: string | string[]): void;
    /**

     */
    createColumnchooser(x: number, y: number, target: Element): void;
    private initializeServices;
    private processModel;
    private initForeignColumn;
    private gridRender;
    dataReady(): void;
    private updateRTL;
    private createGridPopUpElement;
    private updateGridLines;
    private updateResizeLines;
    /**
     * The function is used to apply text wrap
     * @return {void}

     */
    applyTextWrap(): void;
    /**
     * The function is used to remove text wrap
     * @return {void}

     */
    removeTextWrap(): void;
    /**
     * The function is used to add Tooltip to the grid cell that has ellipsiswithtooltip clip mode.
     * @return {void}

     */
    createTooltip(): void;
    private getTooltipStatus;
    private mouseMoveHandler;
    private isEllipsisTooltip;
    private scrollHandler;
    /**
     * To create table for ellipsiswithtooltip

     */
    protected createTable(table: Element, tag: string, type: string): HTMLDivElement;
    private onKeyPressed;
    /**
     * Binding events to the element while component creation.

     */
    wireEvents(): void;
    /**
     * Unbinding events from the element while component destroy.

     */
    unwireEvents(): void;
    /**

     */
    addListener(): void;
    /**

     */
    removeListener(): void;
    private blazorTemplate;
    /**
     * Get current visible data of grid.
     * @return {Object[]}

     */
    getCurrentViewRecords(): Object[];
    private mouseClickHandler;
    private checkEdit;
    private dblClickHandler;
    private focusOutHandler;
    private isChildGrid;
    private mergePersistGridData;
    private mergeColumns;
    /**

     */
    isDetail(): boolean;
    private isCommandColumn;
    private isForeignKeyEnabled;
    private keyPressHandler;
    private keyActionHandler;
    /**

     */
    setInjectedModules(modules: Function[]): void;
    private updateColumnObject;
    /**
     * Gets the foreign columns from Grid.
     * @return {Column[]}

     */
    getForeignKeyColumns(): Column[];
    /**

     */
    getRowHeight(): number;
    /**
     * Refreshes the Grid column changes.
     */
    refreshColumns(): void;
    /**
     * Export Grid data to Excel file(.xlsx).
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}

     */
    excelExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Grid data to CSV file.
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Grid.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}

     */
    csvExport(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Promise<any>;
    /**
     * Export Grid data to PDF document.
     * @param  {pdfExportProperties} PdfExportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @return {Promise<any>}

     */
    pdfExport(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    /**
     * Groups a column by column name.
     * @param  {string} columnName - Defines the column name to group.
     * @return {void}
     */
    groupColumn(columnName: string): void;
    /**
     * Expands all the grouped rows of the Grid.
     * @return {void}
     */
    groupExpandAll(): void;
    /**
    * Collapses all the grouped rows of the Grid.
    * @return {void}
    */
    groupCollapseAll(): void;
    /**
     * Expands or collapses grouped rows by target element.
     * @param  {Element} target - Defines the target element of the grouped row.
     * @return {void}
     */
    /**
     * Clears all the grouped columns of the Grid.
     * @return {void}
     */
    clearGrouping(): void;
    /**
     * Ungroups a column by column name.
     * @param  {string} columnName - Defines the column name to ungroup.
     * @return {void}
     */
    ungroupColumn(columnName: string): void;
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @return {void}
     */
    openColumnChooser(x?: number, y?: number): void;
    /**
     * Collapses a detail row with the given target.
     * @param  {Element} target - Defines the expanded element to collapse.
     * @return {void}
     */
    /**
     * Collapses all the detail rows of the Grid.
     * @return {void}
     */
    detailCollapseAll(): void;
    /**
     * Expands a detail row with the given target.
     * @param  {Element} target - Defines the collapsed element to expand.
     * @return {void}
     */
    /**
    * Expands all the detail rows of the Grid.
    * @return {void}
    */
    detailExpandAll(): void;
    /**
     * Deselects the currently selected cells.
     * @return {void}
     */
    clearCellSelection(): void;
    /**
     * Deselects the currently selected rows.
     * @return {void}
     */
    clearRowSelection(): void;
    /**
     * Selects a collection of cells by row and column indexes.
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @return {void}
     */
    selectCells(rowCellIndexes: ISelectedCell[]): void;
    /**
     * Selects a range of rows from start and end row indexes.
     * @param  {number} startIndex - Specifies the start row index.
     * @param  {number} endIndex - Specifies the end row index.
     * @return {void}
     */
    selectRowsByRange(startIndex: number, endIndex?: number): void;
    /**

     */
    isContextMenuOpen(): boolean;
    /**

     */
    ensureModuleInjected(module: Function): boolean;
    /**
     * Destroys the given template reference.
     * @param {string[]} propertyNames - Defines the collection of template name.
     */
    destroyTemplate(propertyNames?: string[], index?: any): void;
    /**

     * @private
     */
    log(type: string | string[], args?: Object): void;
    /**

     */
    applyBiggerTheme(element: Element): void;
    /**

     */
    getPreviousRowData(): Object;
    /**
     * Hides the scrollbar placeholder of Grid content when grid content is not overflown.
     * @return {void}
     */
    hideScroll(): void;
    /**
     * Get row index by primary key or row data.
     * @param  {string} value - Defines the primary key value.
     * @param  {Object} value - Defines the row data.
     */
    getRowIndexByPrimaryKey(value: string | Object): number;
    /**

    */
    grabColumnByFieldFromAllCols(field: string): Column;
    /**

    */
    grabColumnByUidFromAllCols(uid: string): Column;
    private getUserAgent;
    /**

     */
    tapEvent(e: TouchEventArgs): void;
}
