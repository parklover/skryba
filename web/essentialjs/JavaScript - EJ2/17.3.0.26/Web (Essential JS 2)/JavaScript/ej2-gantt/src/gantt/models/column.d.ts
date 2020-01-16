import { NumberFormatOptions, DateFormatOptions } from '@syncfusion/ej2-base';
import { TextAlign, ClipMode, ValueAccessor, IEditCell, IFilter } from '@syncfusion/ej2-grids';
import { IGanttCellFormatter } from '../base/interface';
/**
 * Configures column collection in Gantt.
 */
export declare class Column {
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.

     */
    allowEditing: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.

     */
    allowReordering: boolean;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default all the columns can be resized.

     */
    allowResizing: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.

     */
    allowSorting: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.

     */
    allowFiltering: boolean;
    /**
     * It is used to customize the default filter options for a specific columns.
     * * ui - to render custom component for specific column it has following functions.
     * * ui.create – It is used for creating custom components.
     * * ui.read -  It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.

     */
    filter: IFilter;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.




     */
    clipMode: ClipMode;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.

     */
    customAttributes: {
        [x: string]: Object;
    };
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.

     */
    disableHtmlEncode: boolean;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.

     */
    displayAsCheckBox: boolean;
    /**
     * Defines the type of component for editing.

     */
    editType: string;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.
     */
    field: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../../common/internationalization/#number-formatting)
     * and [`date`](../../../common/internationalization/#formatting) formats.



     */
    format: string | NumberFormatOptions | DateFormatOptions;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.

     */
    formatter: {
        new (): IGanttCellFormatter;
    } | Function | IGanttCellFormatter;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.

     */
    headerTemplate: string;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.

     */
    headerText: string;
    /**
     * Define the alignment of column header which is used to align the text of column header.



     */
    headerTextAlign: TextAlign;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.

     */
    hideAtMedia: string;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.

     */
    maxWidth: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.

     */
    minWidth: string | number;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template string or HTML element ID.

     */
    template: string;
    /**
     * Defines the alignment of the column in both header and content cells.



     */
    textAlign: TextAlign;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.

     */
    valueAccessor: ValueAccessor | string;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.

     */
    visible: boolean;
    /**
     * Defines the width of the column in pixels or percentage.

     */
    width: string | number;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.

     */
    isPrimaryKey: boolean;
    /**
     * Defines the `IEditCell` object to customize default edit cell.

     */
    edit: IEditCell;
    constructor(options: ColumnModel);
}
/**
 * Interface for a class GanttColumn
 */
export interface ColumnModel {
    /**
     * If `allowEditing` set to false, then it disables editing of a particular column.
     * By default all columns are editable.

     */
    allowEditing?: boolean;
    /**
     * If `allowReordering` set to false, then it disables reorder of a particular column.
     * By default all columns can be reorder.

     */
    allowReordering?: boolean;
    /**
     * If `allowResizing` is set to false, it disables resize option of a particular column.
     * By default all the columns can be resized.

     */
    allowResizing?: boolean;
    /**
     * If `allowSorting` set to false, then it disables sorting option of a particular column.
     * By default all columns are sortable.

     */
    allowSorting?: boolean;
    /**
     * If `allowFiltering` set to false, then it disables filtering option and filter bar element of a particular column.
     * By default all columns are filterable.

     */
    allowFiltering?: boolean;
    /**
     * It is used to customize the default filter options for a specific columns.
     * * ui - to render custom component for specific column it has following functions.
     * * ui.create – It is used for creating custom components.
     * * ui.read -  It is used for read the value from the component.
     * * ui.write - It is used to apply component model as dynamically.

     */
    filter?: IFilter;
    /**
     * Defines the cell content's overflow mode. The available modes are
     * * `Clip` -  Truncates the cell content when it overflows its area.
     * * `Ellipsis` -  Displays ellipsis when the cell content overflows its area.
     * * `EllipsisWithTooltip` - Displays ellipsis when the cell content overflows its area
     * also it will display tooltip while hover on ellipsis applied cell.




     */
    clipMode?: ClipMode;
    /**
     * The CSS styles and attributes of the content cells of a particular column can be customized.

     */
    customAttributes?: {
        [x: string]: Object;
    };
    /**
     * If `disableHtmlEncode` is set to true, it encodes the HTML of the header and content cells.

     */
    disableHtmlEncode?: boolean;
    /**
     * If `displayAsCheckBox` is set to true, it displays the column value as a check box instead of Boolean value.

     */
    displayAsCheckBox?: boolean;
    /**
     * Defines the field name of column which is mapped with mapping name of DataSource.
     * The `field` name must be a valid JavaScript identifier,
     * the first character must be an alphabet and should not contain spaces and special characters.

     */
    field?: string;
    /**
     * Defines the type of component for editing.

     */
    editType?: string;
    /**
     * It is used to change display value with the given format and does not affect the original data.
     * Gets the format from the user which can be standard or custom
     * [`number`](../../../common/internationalization/#number-formatting)
     * and [`date`](../../../common/internationalization/#formatting) formats.



     */
    format?: string | NumberFormatOptions | DateFormatOptions;
    /**
     * Defines the method which is used to achieve custom formatting from an external function.
     * This function triggers before rendering of each cell.

     */
    formatter?: {
        new (): IGanttCellFormatter;
    } | Function | IGanttCellFormatter;
    /**
     * Defines the header template as string or HTML element ID which is used to add customized element in the column header.

     */
    headerTemplate?: string;
    /**
     * Defines the header text of column which is used to display in column header.
     * If `headerText` is not defined, then field name value will be assigned to header text.

     */
    headerText?: string;
    /**
     * Define the alignment of column header which is used to align the text of column header.




     */
    headerTextAlign?: TextAlign;
    /**
     * Column visibility can change based on [`Media Queries`](http://cssmediaqueries.com/what-are-css-media-queries.html).
     * `hideAtMedia` accepts only valid Media Queries.

     */
    hideAtMedia?: string;
    /**
     * Defines the maximum width of the column in pixel or percentage, which will restrict resizing beyond this pixel or percentage.

     */
    maxWidth?: string | number;
    /**
     * Defines the minimum width of the column in pixels or percentage.

     */
    minWidth?: string | number;
    /**
     * Defines the column template that renders customized element in each cell of the column.
     * It accepts either template string or HTML element ID.

     */
    template?: string;
    /**
     * Defines the alignment of the column in both header and content cells.




     */
    textAlign?: TextAlign;
    /**
     * Defines the method used to apply custom cell values from external function and display this on each cell rendered.

     */
    valueAccessor?: ValueAccessor | string;
    /**
     * If `visible` is set to false, hides the particular column. By default, columns are displayed.

     */
    visible?: boolean;
    /**
     * Defines the width of the column in pixels or percentage.

     */
    width?: string | number;
    /**
     * If `isPrimaryKey` is set to true, considers this column as the primary key constraint.

     */
    isPrimaryKey?: boolean;
    /**
     * Defines the `IEditCell` object to customize default edit cell.

     */
    edit?: IEditCell;
    /**
     * To define column type.
     * @private
     */
    type?: string;
}
