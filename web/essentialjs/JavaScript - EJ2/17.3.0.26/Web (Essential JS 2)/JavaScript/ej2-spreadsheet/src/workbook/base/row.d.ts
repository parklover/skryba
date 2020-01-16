import { ChildProperty } from '@syncfusion/ej2-base';
import { CellModel, SheetModel, RowModel } from './index';
/**
 * Configures the Row behavior for the spreadsheet.
 *  ```html
 * <div id='Spreadsheet'></div>
 * ```
 * ```typescript
 * let spreadsheet: Spreadsheet = new Spreadsheet({
 *      sheets: [{
 *                rows: [{
 *                        index: 30,
 *                        cells: [{ index: 4, value: 'Total Amount:' },
 *                               { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
 *                }]
 * ...
 * });
 * spreadsheet.appendTo('#Spreadsheet');
 * ```
 */
export declare class Row extends ChildProperty<SheetModel> {
    /**
     * Specifies cell and its properties for the row.

     */
    cells: CellModel[];
    /**
     * Specifies the index to the row. Based on the index, row properties are applied.


     */
    index: number;
    /**
     * Specifies height of the row.


     */
    height: number;
    /**
     * specifies custom height of the row.

     */
    customHeight: boolean;
    /**
     * To hide/show the row in spreadsheet.


     */
    hidden: boolean;
}
/**

 */
export declare function getRow(sheet: SheetModel, rowIndex: number): RowModel;
export declare function setRow(sheet: SheetModel, rowIndex: number, row: RowModel): void;
export declare function isHiddenRow(sheet: SheetModel, index: number): boolean;
/**

 */
export declare function getRowHeight(sheet: SheetModel, rowIndex: number): number;
/**

 */
export declare function setRowHeight(sheet: SheetModel, rowIndex: number, height: number): void;
/**

 */
export declare function getRowsHeight(sheet: SheetModel, startRow: number, endRow?: number): number;
