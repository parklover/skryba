import { Property, Collection, ChildProperty } from '@syncfusion/ej2-base';import { CellModel, SheetModel, RowModel } from './index';import { Cell } from './cell';

/**
 * Interface for a class Row
 */
export interface RowModel {

    /**
     * Specifies cell and its properties for the row.

     */
    cells?: CellModel[];

    /**
     * Specifies the index to the row. Based on the index, row properties are applied.


     */
    index?: number;

    /**
     * Specifies height of the row.


     */
    height?: number;

    /**
     * specifies custom height of the row.

     */
    customHeight?: boolean;

    /**
     * To hide/show the row in spreadsheet.


     */
    hidden?: boolean;

}