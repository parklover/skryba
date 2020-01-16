import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-cell` directive represent a cell of the Angular Spreadsheet.
 * It must be contained in a `e-row` directive.
 * ```html
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row>
 *    <e-cells>
 *    <e-cell value='A1'></e-cell>
 *    </e-cells>
 *    </e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class CellDirective extends ComplexBase<CellDirective> {
    private viewContainerRef;
    /**
     * Specifies the number format code to display value in specified number format.

     */
    format: any;
    /**
     * Defines the formula or expression of the cell.

     */
    formula: any;
    /**
     * Specifies the index of the cell.


     */
    index: any;
    /**
     * Specifies the cell style options.
     *

     */
    style: any;
    /**
     * Defines the value of the cell which can be text or number with formatting.

     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Cell Array Directive
 * @private
 */
export declare class CellsDirective extends ArrayBase<CellsDirective> {
    constructor();
}
