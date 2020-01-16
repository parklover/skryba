import { Property, ChildProperty, Complex, extend } from '@syncfusion/ej2-base';import { SheetModel, getRowsHeight, getColumnsWidth, CellModel } from './index';import { CellStyleModel, CellStyle } from '../common/index';import { getRow } from './row';import { RowModel } from './row-model';

/**
 * Interface for a class Cell
 */
export interface CellModel {

    /**
     * Defines the value of the cell which can be text or number with formatting.

     */
    value?: string;

    /**
     * Defines the formula or expression of the cell.

     */
    formula?: string;

    /**
     * Specifies the index of the cell.


     */
    index?: number;

    /**
     * Specifies the number format code to display value in specified number format.

     */
    format?: string;

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
    style?: CellStyleModel;

}