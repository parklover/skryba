import { Workbook } from './workbook';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { ChildProperty } from '@syncfusion/ej2-base';
import { RangeSettingModel, SheetModel, UsedRangeModel } from './sheet-model';
import { RowModel } from './row-model';
import { ColumnModel } from './column-model';
/**
 * Configures the Range settings for the spreadsheet.
 *  ```html
 * <div id='Spreadsheet'></div>
 * ```
 * ```typescript
 * let spreadsheet: Spreadsheet = new Spreadsheet({
 *      sheets: [{
 *                  name: 'First Sheet',
 *                  rangeSettings: [{ dataSource: defaultData }],
 *                  rows: [{
 *                          index: 30,
 *                          cells: [{ index: 4, value: 'Total Amount:' },
 *                                  { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
 *                  }]
 * ...
 * });
 * spreadsheet.appendTo('#Spreadsheet');
 * ```
 */
export declare class RangeSetting extends ChildProperty<Sheet> {
    /**
     * Specifies the data as JSON / Data manager to the sheet.

     */
    dataSource: Object[] | DataManager;
    /**
     * Specifies the start cell from which the datasource will be populated.

     */
    startCell: string;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.

     */
    query: Query;
    /**
     * Show/Hide the field of the datasource as header.

     */
    showFieldAsHeader: boolean;
}
/**
 * Used range which contains end row index and end column index of the last used cell in sheet .
 */
export declare class UsedRange extends ChildProperty<UsedRange> {
    /**
     * Specifies the last used row index of the sheet.


     */
    rowIndex: number;
    /**
     * Specifies the last used column index of the sheet.


     */
    colIndex: number;
}
/**
 * Configures the sheet behavior for the spreadsheet.
 */
export declare class Sheet extends ChildProperty<Workbook> {
    /**
     * Represents sheet unique id.


     */
    id: number;
    /**
     * Configures row and its properties for the sheet.

     */
    rows: RowModel[];
    /**
     * Configures column and its properties for the sheet.

     */
    columns: ColumnModel[];
    /**
     * Specifies the range settings for the sheet.

     */
    rangeSettings: RangeSettingModel[];
    /**
     * Specifies index of the sheet. Based on the index, sheet properties are applied.


     */
    index: number;
    /**
     * Specifies the name of the sheet, the name will show in the sheet tabs.

     */
    name: string;
    /**
     * Defines the number of rows to be rendered in the sheet.


     */
    rowCount: number;
    /**
     * Defines the number of columns to be rendered in the sheet.


     */
    colCount: number;
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
    selectedRange: string;
    /**
     * Specifies active cell within `selectedRange` in the sheet.

     */
    activeCell: string;
    /**
     * Defines the used range of the sheet.

     */
    usedRange: UsedRangeModel;
    /**
     * Specified cell will be positioned at the upper-left corner of the sheet.

     */
    topLeftCell: string;
    /**
     * Specifies to show / hide column and row headers in the sheet.

     */
    showHeaders: boolean;
    /**
     * Specifies to show / hide grid lines in the sheet.

     */
    showGridLines: boolean;
}
/**
 * To get sheet index from address.

 */
export declare function getSheetIndex(context: Workbook, name: string): number;
/**
 * To get sheet index from address.

 */
export declare function getSheetIndexFromId(context: Workbook, id: number): number;
/**
 * To get sheet name from address.

 */
export declare function getSheetNameFromAddress(address: string): string;
/**
 * To get sheet index from sheet name.

 */
export declare function getSheetIndexByName(context: Workbook, name: string, info: {
    visibleName: string;
    sheet: string;
    index: number;
}[]): number;
/**
 * update selected range

 */
export declare function updateSelectedRange(context: Workbook, range: string, sheet?: SheetModel): void;
/**
 * get selected range

 */
export declare function getSelectedRange(sheet: SheetModel): string;
/**

 */
export declare function getSheet(context: Workbook, idx: number): SheetModel;
/**

 */
export declare function getSheetNameCount(context: Workbook): number;
/**

 */
export declare function getMaxSheetId(sheets: SheetModel[]): number;
/**

 */
export declare function initSheet(context: Workbook): void;
/**
 * get sheet name

 */
export declare function getSheetName(context: Workbook, idx?: number): string;
