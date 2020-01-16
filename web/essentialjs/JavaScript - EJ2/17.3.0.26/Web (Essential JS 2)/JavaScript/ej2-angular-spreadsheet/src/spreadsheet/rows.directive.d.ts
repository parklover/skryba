import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-row` directive represent a row of the Angular Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```html
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row></e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class RowDirective extends ComplexBase<RowDirective> {
    private viewContainerRef;
    childCells: any;
    tags: string[];
    /**
     * Specifies cell and its properties for the row.

     */
    cells: any;
    /**
     * specifies custom height of the row.

     */
    customHeight: any;
    /**
     * Specifies height of the row.


     */
    height: any;
    /**
     * Specifies the index to the row. Based on the index, row properties are applied.


     */
    index: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Row Array Directive
 * @private
 */
export declare class RowsDirective extends ArrayBase<RowsDirective> {
    constructor();
}
