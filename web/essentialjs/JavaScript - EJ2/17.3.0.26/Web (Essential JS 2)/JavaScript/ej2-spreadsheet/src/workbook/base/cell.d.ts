import { ChildProperty } from '@syncfusion/ej2-base';
import { SheetModel, CellModel } from './index';
import { CellStyleModel } from '../common/index';
import { RowModel } from './row-model';
/**
 * Represents the cell.
 */
export declare class Cell extends ChildProperty<RowModel> {
    /**
     * Defines the value of the cell which can be text or number with formatting.

     */
    value: string;
    /**
     * Defines the formula or expression of the cell.

     */
    formula: string;
    /**
     * Specifies the index of the cell.


     */
    index: number;
    /**
     * Specifies the number format code to display value in specified number format.

     */
    format: string;
    /**
     * Specifies the cell style options.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet: Spreadsheet = new Spreadsheet({
     *      sheets: [{
     *       ...
     *            rows: [{
     *                  cells: [{ value: '12', index: 2,  style: { fontWeight: 'bold', fontSize: 12, fontStyle: 'italic', textIndent: '2pt'
     *                         backgroundColor: '#4b5366', color: '#ffffff' } }]
     *                  }]
     *            }]
     *  });
     * spreadsheet.appendTo('#Spreadsheet');
     * ```

     */
    style: CellStyleModel;
}
/**

 */
export declare function getCell(rowIndex: number, colIndex: number, sheet: SheetModel, isInitRow?: boolean): CellModel;
/**

 */
export declare function setCell(rowIndex: number, colIndex: number, sheet: SheetModel, cell: CellModel, isExtend?: boolean): void;
/**

 */
export declare function getCellPosition(sheet: SheetModel, indexes: number[]): {
    top: number;
    left: number;
};
export declare function skipDefaultValue(style: CellStyleModel, defaultKey?: boolean): CellStyleModel;
