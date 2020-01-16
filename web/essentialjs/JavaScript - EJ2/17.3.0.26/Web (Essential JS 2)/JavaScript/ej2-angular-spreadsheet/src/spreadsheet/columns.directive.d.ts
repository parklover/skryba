import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-column` directive represent a column of the Angular Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```html
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-columns>
 *    <e-column width='100'></e-column>
 *    </e-columns>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnDirective> {
    private viewContainerRef;
    /**
     * specifies custom width of the column.

     */
    customWidth: any;
    /**
     * Specifies index of the column. Based on the index, column properties are applied.


     */
    index: any;
    /**
     * Specifies width of the column.


     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Column Array Directive
 * @private
 */
export declare class ColumnsDirective extends ArrayBase<ColumnsDirective> {
    constructor();
}
