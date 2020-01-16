import { SheetModel, ColumnModel } from './index';
import { ChildProperty } from '@syncfusion/ej2-base';
/**
 * Configures the Column behavior for the spreadsheet.
 */
export declare class Column extends ChildProperty<Column> {
    /**
     * Specifies index of the column. Based on the index, column properties are applied.


     */
    index: number;
    /**
     * Specifies width of the column.


     */
    width: number;
    /**
     * specifies custom width of the column.

     */
    customWidth: boolean;
    /**
     * To hide/show the column in spreadsheet.


     */
    hidden: boolean;
}
/**

 */
export declare function getColumn(sheet: SheetModel, colIndex: number): ColumnModel;
/**

 */
export declare function getColumnWidth(sheet: SheetModel, index: number): number;
/**

 */
export declare function getColumnsWidth(sheet: SheetModel, startCol: number, endCol?: number): number;
export declare function isHiddenCol(sheet: SheetModel, index: number): boolean;
