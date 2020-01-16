import { SheetModel, ColumnModel } from './index';import { Property, ChildProperty } from '@syncfusion/ej2-base';

/**
 * Interface for a class Column
 */
export interface ColumnModel {

    /**
     * Specifies index of the column. Based on the index, column properties are applied.


     */
    index?: number;

    /**
     * Specifies width of the column.


     */
    width?: number;

    /**
     * specifies custom width of the column.

     */
    customWidth?: boolean;

    /**
     * To hide/show the column in spreadsheet.


     */
    hidden?: boolean;

}