import { Row } from './row';import { Column } from './column';import { Workbook } from './workbook';import { Query, DataManager } from '@syncfusion/ej2-data';import { Property, Collection, ChildProperty, Complex } from '@syncfusion/ej2-base';import { RowModel } from './row-model';import { ColumnModel } from './column-model';import { processIdx } from './data';

/**
 * Interface for a class RangeSetting
 */
export interface RangeSettingModel {

    /**
     * Specifies the data as JSON / Data manager to the sheet.

     */
    dataSource?: Object[] | DataManager;

    /**
     * Specifies the start cell from which the datasource will be populated.

     */
    startCell?: string;

    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html) 
     * that will be executed along with data processing.

     */
    query?: Query;

    /**
     * Show/Hide the field of the datasource as header.

     */
    showFieldAsHeader?: boolean;

}

/**
 * Interface for a class UsedRange
 */
export interface UsedRangeModel {

    /**
     * Specifies the last used row index of the sheet.


     */
    rowIndex?: number;

    /**
     * Specifies the last used column index of the sheet.


     */
    colIndex?: number;

}

/**
 * Interface for a class Sheet
 */
export interface SheetModel {

    /**
     * Represents sheet unique id.


     */
    id?: number;

    /**
     * Configures row and its properties for the sheet.

     */
    rows?: RowModel[];

    /**
     * Configures column and its properties for the sheet.

     */
    columns?: ColumnModel[];

    /**
     * Specifies the range settings for the sheet.

     */
    rangeSettings?: RangeSettingModel[];

    /**
     * Specifies index of the sheet. Based on the index, sheet properties are applied.


     */
    index?: number;

    /**
     * Specifies the name of the sheet, the name will show in the sheet tabs.

     */
    name?: string;

    /**
     * Defines the number of rows to be rendered in the sheet.


     */
    rowCount?: number;

    /**
     * Defines the number of columns to be rendered in the sheet.


     */
    colCount?: number;

    /**
     * Specifies selected range in the sheet.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet: Spreadsheet = new Spreadsheet({
     *      sheets: [{
     *                selectedRange: 'A1:B5'
     *          }],
     *      ...
     * });
     * spreadsheet.appendTo('#Spreadsheet');
     * ```

     */
    selectedRange?: string;

    /**
     * Specifies active cell within `selectedRange` in the sheet.

     */
    activeCell?: string;

    /**
     * Defines the used range of the sheet.

     */
    usedRange?: UsedRangeModel;

    /**
     * Specified cell will be positioned at the upper-left corner of the sheet.

     */
    topLeftCell?: string;

    /**
     * Specifies to show / hide column and row headers in the sheet.

     */
    showHeaders?: boolean;

    /**
     * Specifies to show / hide grid lines in the sheet.

     */
    showGridLines?: boolean;

}