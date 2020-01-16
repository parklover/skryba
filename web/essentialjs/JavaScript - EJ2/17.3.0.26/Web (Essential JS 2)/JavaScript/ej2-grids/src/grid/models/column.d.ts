import { NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { ICellFormatter, IFilterUI, IEditCell, CommandModel, IFilter, CommandButtonOptions } from '../base/interface';
import { TextAlign, ClipMode, Action, SortDirection, CommandButtonType } from '../base/enum';
import { PredicateModel } from '../base/grid-model';
import { ValueAccessor, SortComparer } from '../base/type';
/**
 * Represents Grid `Column` model class.
 */
export declare class Column {
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The bounded columns can be sort, filter and group etc.,
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.

     */
    field: string;
    /**
     * Gets the unique identifier value of the column. It is used to get the column object.

     */
    uid: string;
    /**
     * Gets the unique identifier value of the column. It is used to get the column object.

     */
    index: number;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.

     */
    headerText: string;
    /**
     * Defines the width of the column in pixels or percentage.

     */
    width: string | number;
    /**
     * Defines the minimum Width of the column in pixels or percentage.

     */
    minWidth: string | number;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.

     */
    maxWidth: string | number;
    /**
     * Defines the alignment of the column in both header and content cells.

     */
    textAlign: TextAlign;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.

     */
    clipMode: ClipMode;
    /**
     * Define the alignment of column header which is used to align the text of column header.

     */
    headerTextAlign: TextAlign;
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.

     */
    disableHtmlEncode: boolean;
    /**
     * Defines the data type of the column.


     */
    type: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../common/internationalization/#number-formatting/)
     * and [`date`](../common/internationalization/#number-formatting/) formats.



     */
    format: string | NumberFormatOptions | DateFormatOptions;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.

     */
    visible: boolean;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either [template string](../../common/template-engine/) or HTML element ID.

     */
    template: string;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.

     */
    headerTemplate: string;
    /**
     * You can use this property to freeze selected columns in grid

     */
    isFrozen: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.

     */
    allowSorting: boolean;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default all the columns can be resized.

     */
    allowResizing: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.

     */
    allowFiltering: boolean;
    /**
     * If `allowGrouping` set to false, then it disables grouping of a particular column.
     * By default all columns are groupable.

     */
    allowGrouping: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.

     */
    allowReordering: boolean;
    /**
     * If `showColumnMenu` set to false, then it disable the column menu of a particular column.
     * By default column menu will show for all columns

     */
    showColumnMenu: boolean;
    /**
     * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.

     */
    enableGroupByFormat: boolean;
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.

     */
    allowEditing: boolean;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * {% codeBlock src="grid/custom-attribute-api/index.ts" %}{% endcodeBlock %}

     */
    customAttributes: {
        [x: string]: Object;
    };
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.

     */
    displayAsCheckBox: boolean;
    /**
     * Defines the column data source which will act as foreign data source.

     */
    dataSource: Object[] | DataManager;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     * {% codeBlock src="grid/formatter-api/index.ts" %}{% endcodeBlock %}

     */
    formatter: {
        new (): ICellFormatter;
    } | ICellFormatter | Function;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     *
     * {% codeBlock src="grid/value-accessor-api/index.ts" %}{% endcodeBlock %}
     *

     */
    valueAccessor: ValueAccessor | string;
    /**
     * The `filterBarTemplate` is used to add a custom component instead of default input component for filter bar.
     * It have create and read functions.
     * * create: It is used for creating custom components.
     * * read: It is used to perform custom filter action.
     *
     * {% codeBlock src="grid/filter-template-api/index.ts" %}{% endcodeBlock %}

     */
    filterBarTemplate: IFilterUI;
    /**
     *  It is used to customize the default filter options for a specific columns.
     * * type -  Specifies the filter type as menu or checkbox.
     * * ui - to render custom component for specific column it has following functions.
     * * ui.create – It is used for creating custom components.
     * * ui.read -  It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.
     * {% codeBlock src="grid/filter-menu-api/index.ts" %}{% endcodeBlock %}
     *
     * > Check the [`Filter UI`](../../grid/filtering/#custom-component-in-filter-menu) for its customization.

     */
    filter: IFilter;
    /**
     * Used to render multiple header rows(stacked headers) on the Grid header.

     */
    columns: Column[] | string[] | ColumnModel[];
    /**
     * Defines the tool tip text for stacked headers.


     */
    toolTip: string;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.

     */
    isPrimaryKey: boolean;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.

     */
    hideAtMedia?: string;
    /**
     * If `showInColumnChooser` set to false, then hide the particular column in column chooser.
     *  By default all columns are displayed in column Chooser.

     */
    showInColumnChooser?: boolean;
    /**
     * Defines the type of component for editable.



     */
    editType: string;
    /**
     * Defines rules to validate data before creating and updating.

     */
    validationRules: Object;
    /**
     * Defines default values for the component when adding a new record to the Grid.



     */
    defaultValue: string;
    /**
     * Defines the `IEditCell` object to customize default edit cell.

     */
    edit: IEditCell;
    /**
     * If `isIdentity` is set to true, then this column is considered as identity column.

     */
    isIdentity: boolean;
    /**
     * Defines the display column name from the foreign data source which will be obtained from comparing local and foreign data.

     */
    foreignKeyValue: string;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name

     */
    foreignKeyField: string;
    /**

     * Defines the commands column template as string or HTML element ID which is used to add
     * customized command buttons in each cells of the column.
     */
    commandsTemplate: string;
    /**
     * `commands` provides an option to display command buttons in every cell.
     * The available built-in command buttons are
     * * Edit - Edit the record.
     * * Delete - Delete the record.
     * * Save - Save the record.
     * * Cancel - Cancel the edit state.
     * {% codeBlock src="grid/command-column-api/index.ts" %}{% endcodeBlock %}

     */
    commands: CommandModel[];
    /**

     * Gets the current view foreign key data.

     */
    columnData: Object[];
    /**
     * Defines the cell edit template that used as editor for a particular column.
     * It accepts either template string or HTML element ID.


     */
    editTemplate: string;
    /**
     * Defines the filter template/UI that used as filter for a particular column.
     * It accepts either template string or HTML element ID.


     */
    filterTemplate: string;
    toJSON: Function;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name

     */
    lockColumn: boolean;
    /**
     * If `allowSearching` set to false, then it disables Searching of a particular column.
     * By default all columns allow Searching.

     */
    allowSearching: boolean;
    /**
     * If `autoFit` set to true, then the particular column content width will be
     * adjusted based on its content in the initial rendering itself.
     * Setting this property as true is equivalent to calling `autoFitColumns` method in the `dataBound` event.

     */
    autoFit: boolean;
    constructor(options: ColumnModel);
    private formatFn;
    private parserFn;
    private templateFn;
    private fltrTemplateFn;
    private headerTemplateFn;
    private editTemplateFn;
    private filterTemplateFn;
    private sortDirection;
    getEditTemplate: Function;
    getFilterTemplate: Function;
    getSortDirection(): string;
    setSortDirection(direction: string): void;
    setProperties(column: Column): void;
    /**
     * Defines the custom sort comparer function.
     * The sort comparer function has the same functionality like
     * [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) sort comparer.
     * {% codeBlock src="grid/sort-comparer-api/index.ts" %}{% endcodeBlock %}
     */
    sortComparer: SortComparer | string;
    /**

     * It defines the column is foreign key column or not.
     */
    isForeignColumn(): boolean;
    getFormatter(): Function;
    setFormatter(value: Function): void;
    getParser(): Function;
    setParser(value: Function): void;
    getColumnTemplate(): Function;
    getHeaderTemplate(): Function;
    getFilterItemTemplate(): Function;
    getDomSetter(): string;
}
/**
 * Interface for a class Column
 */
export interface ColumnModel {
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The bounded columns can be sort, filter and group etc.,
     * If the `field` name contains “dot”, then it is considered as complex binding.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.

     */
    field?: string;
    /**
     * Gets the unique identifier value of the column. It is used to get the object.

     */
    uid?: string;
    /**
     * Gets the unique identifier value of the column. It is used to get the object.

     */
    index?: number;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.

     */
    headerText?: string;
    /**
     * Defines the width of the column in pixels or percentage.

     */
    width?: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.

     */
    minWidth?: string | number;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.

     */
    maxWidth?: string | number;
    /**
     * Defines the alignment of the column in both header and content cells.

     */
    textAlign?: TextAlign;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.

     */
    clipMode?: ClipMode;
    /**
     * Define the alignment of column header which is used to align the text of column header.



     */
    headerTextAlign?: TextAlign;
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.

     */
    disableHtmlEncode?: boolean;
    /**
     * Defines the data type of the column.


     */
    type?: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../common/internationalization/#manipulating-numbers)
     * and [`date`](../../common/internationalization/#manipulating-datetime) formats.



     */
    format?: string | NumberFormatOptions | DateFormatOptions;
    /**
     * If `visible` is set to false, hides the particular column. By default, all columns are displayed.

     */
    visible?: boolean;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either [template string](../../common/template-engine/) or HTML element ID.

     */
    template?: string;
    /**
     * Defines the column template as string or HTML element ID which is used to add customized element in the column header.

     */
    headerTemplate?: string;
    /**
     * You can use this property to freeze selected columns in grid.

     */
    isFrozen?: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.

     */
    allowSorting?: boolean;
    /**
     * If `allowResizing` set to false, it disables resize option of a particular column.

     */
    allowResizing?: boolean;
    /**
     * If `showColumnMenu` set to false, then it disable the column menu of a particular column.
     * By default column menu will show for all columns

     */
    showColumnMenu?: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.

     */
    allowFiltering?: boolean;
    /**
     * If `allowGrouping` set to false, then it disables grouping of a particular column.
     * By default all columns are groupable.

     */
    allowGrouping?: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.

     */
    allowReordering?: boolean;
    /**
     * If `enableGroupByFormat` set to true, then it groups the particular column by formatted values.
     * By default no columns are group by format.

     */
    enableGroupByFormat?: boolean;
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.

     */
    allowEditing?: boolean;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.
     *
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({
     * dataSource: filterData,
     * columns: [
     *    { field: 'OrderID', headerText: 'Order ID' },
     *    {
     *        field: 'EmployeeID', headerText: 'Employee ID', customAttributes: {
     *           class: 'employeeid',
     *           type: 'employee-id-cell'
     *      }
     *   }]
     * });
     * gridObj.appendTo('#Grid');
     * ```
     *

     */
    customAttributes?: {
        [x: string]: Object;
    };
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.

     */
    displayAsCheckBox?: boolean;
    /**
     * Defines the column data source  which will act as foreign data source.

     */
    dataSource?: Object[] | DataManager;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.
     *
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * class ExtendedFormatter implements ICellFormatter {
     * public getValue(column: Column, data: Object): Object {
     *   return '<span style="color:' + (data['Verified'] ? 'green' : 'red') + '"><i>' + data['Verified'] + '</i><span>';
     * }
     * }
     * let gridObj: Grid = new Grid({
     *     dataSource: filterData,
     *     columns: [
     *         { field: 'ShipName', headerText: 'Ship Name' },
     *         { field: 'Verified', headerText: 'Verified Status', formatter: ExtendedFormatter }]
     * });
     * gridObj.appendTo('#Grid');
     * ```
     *

     */
    formatter?: {
        new (): ICellFormatter;
    } | ICellFormatter | Function;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.
     *
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({
     * dataSource: [{ EmployeeID: 1, EmployeeName: ['John', 'M'] }, { EmployeeID: 2, EmployeeName: ['Peter', 'A'] }],
     * columns: [
     *     { field: 'EmployeeID', headerText: 'Employee ID' },
     *     { field: 'EmployeeName', headerText: 'Employee First Name',
     *       valueAccessor: (field: string, data: Object, column: Column) => {
     *             return data['EmployeeName'][0];
     *         },
     *     }]
     * });
     * ```
     *

     */
    valueAccessor?: ValueAccessor | string;
    /**
     * The `filterBarTemplate` is used to add a custom component instead of default input component for filter bar.
     * It have create and read functions.
     * * create: It is used for creating custom components.
     * * read: It is used to perform custom filter action.
     *
     * ```html
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * let gridObj: Grid = new Grid({
     * dataSource: filterData,
     * columns: [
     *   { field: 'OrderID', headerText: 'Order ID' },
     *   {
     *      field: 'EmployeeID', filterBarTemplate: {
     *         create: (args: { element: Element, column: Column }) => {
     *              let input: HTMLInputElement = document.createElement('input');
     *              input.id = 'EmployeeID';
     *              input.type = 'text';
     *              return input;
     *         },
     *         write: (args: { element: Element, column: Column }) => {
     *             args.element.addEventListener('input', args.column.filterBarTemplate.read as EventListener);
     *         },
     *         read: (args: { element: HTMLInputElement, columnIndex: number, column: Column }) => {
     *             gridObj.filterByColumn(args.element.id, 'equal', args.element.value);
     *        }
     *     }
     *  }],
     *   allowFiltering: true
     * });
     * gridObj.appendTo('#Grid');
     * ```
     *

     */
    filterBarTemplate?: IFilterUI;
    /**
     *  Defines the filter options to customize filtering for the particular column.

     */
    filter?: IFilter;
    /**
     * Used to render multiple header rows(stacked headers) on the Grid header.

     */
    columns?: Column[] | string[] | ColumnModel[];
    /**
     * Defines the tool tip text for stacked headers.


     */
    toolTip?: string;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.

     */
    isPrimaryKey?: boolean;
    /**
     * Defines the type of component for editing.



     */
    editType?: string;
    /**
     * `editType`(../../grid/edit/#cell-edit-type-and-its-params) Defines rules to validate data before creating and updating.

     */
    validationRules?: Object;
    /**
     * Defines default values for the component when adding a new record to the Grid.



     */
    defaultValue?: string;
    /**
     * Defines the `IEditCell`(../../grid/edit/#cell-edit-template) object to customize default edit cell.

     */
    edit?: IEditCell;
    /**
     * If `isIdentity` is set to true, then this column is considered as identity column.

     */
    isIdentity?: boolean;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name

     */
    foreignKeyField?: string;
    /**
     * Defines the display column name from the foreign data source which will be obtained from comparing local and foreign data

     */
    foreignKeyValue?: string;
    /**
     * column visibility can change based on its [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.

     */
    hideAtMedia?: string;
    /**
     * If `showInColumnChooser` set to false, then hides the particular column in column chooser.
     * By default all columns are displayed in column Chooser.

     */
    showInColumnChooser?: boolean;
    /**

     * Defines the commands column template as string or HTML element ID which is used to add
     * customized command buttons in each cells of the column.
     */
    commandsTemplate?: string;
    /**
     * `commands` provides an option to display command buttons in every cell.
     * The available built-in command buttons are
     * * Edit - Edit the record.
     * * Delete - Delete the record.
     * * Save - Save the record.
     * * Cancel - Cancel the edit state.
     *
     * The following code example implements the custom command column.
     * ```html
     * <style type="text/css" class="cssStyles">
     * .details-icon:before
     * {
     *    content:"\e74d";
     * }
     * </style>
     * <div id="Grid"></div>
     * ```
     * ```typescript
     * var gridObj = new Grid({
     * datasource: window.gridData,
     * columns : [
     *  { field: 'CustomerID', headerText: 'Customer ID' },
     *  { field: 'CustomerName', headerText: 'Customer Name' },
     *  {commands: [{buttonOption:{content: 'Details', click: onClick, cssClass: details-icon}}], headerText: 'Customer Details'}
     * ]
     * gridObj.appendTo("#Grid");
     * ```

     */
    commands?: CommandModel[];
    /**
     * It defines the custom sort comparer function.
     */
    sortComparer?: SortComparer | string;
    /**

     * It defines the column is foreign key column or not.
     */
    isForeignColumn?: () => boolean;
    /**
     * Defines the cell edit template that used as editor for a particular column.
     * It accepts either template string or HTML element ID.

     */
    editTemplate?: string;
    /**
     * Defines the filter template/UI that used as filter for a particular column.
     * It accepts either template string or HTML element ID.

     */
    filterTemplate?: string;
    /**
     * Defines the mapping column name of the foreign data source.
     * If it is not defined then the `columns.field` will be considered as mapping column name

     */
    lockColumn?: boolean;
    /**
     * If `allowSearching` set to false, then it disables Searching of a particular column.
     * By default all columns allow Searching.

     */
    allowSearching?: boolean;
    /**
     * If `autoFit` set to true, then the particular column content width will be
     * adjusted based on its content in the initial rendering itself.
     * Setting this property as true is equivalent to calling `autoFitColumns` method in the `dataBound` event.

     */
    autoFit?: boolean;
}
export interface ActionEventArgs {
    /** Defines the current action. */
    requestType?: Action;
    /** Defines the type of event. */
    type?: string;
    /** Cancel the print action */
    cancel?: boolean;
    /** Defines the previous page number. */
    previousPage?: number;
    /** Defines the current page number. */
    currentPage?: number;
    /** Defines the field name of the currently grouped columns. */
    columnName?: string;
    /** Defines the object that is currently filtered. */
    currentFilterObject?: PredicateModel;
    /** Defines the column name that is currently filtered. */
    currentFilteringColumn?: string;
    /** Defines the collection of filtered columns. */
    columns?: PredicateModel[];
    /** Defines the string value to search. */
    searchString?: string;
    /** Defines the direction of sort column. */
    direction?: SortDirection;
    /** Defines the record objects.

     */
    data?: Object;
    /** Defines the previous data.

     */
    previousData?: Object;
    /** Defines the added row. */
    row?: Object;
    /** Added row index */
    index?: number;
    /** Defines the record objects.

     */
    rowData?: Object;
    /** Defines the target for dialog */
    target?: HTMLElement;
    /** Defines the selected row index. */
    selectedRow?: number;
    /** Defines the current action. */
    action?: string;
    /** Defines foreign data object. */
    foreignKeyData?: Object;
    /** Define the form element */
    form?: HTMLFormElement;
    /** Define the movable table form element */
    movableForm?: HTMLFormElement;
    /** Defines the selected rows for delete. */
    tr?: Element[];
    /** Defines the primary keys */
    primaryKeys?: string[];
    /** Defines the primary key value */
    primaryKeyValue?: Object[];
    /** Defines the edited rowIndex */
    rowIndex?: number;
}
/**
 * Define options for custom command buttons.
 */
export declare class CommandColumnModel {
    /**
     * Define the command Button tooltip.
     */
    title: string;
    /**
     * Define the command Button type.

     */
    type: CommandButtonType;
    /**
     * Define the button model
     */
    buttonOption: CommandButtonOptions;
}
