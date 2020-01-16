import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-definedname` directive represent a defined name of the Angular Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```html
 * <ejs-spreadsheet>
 *   <e-definednames>
 *    <e-definedname></e-definedname>
 *    <e-definedname></e-definedname>
 *   </e-definednames>
 * </ejs-spreadsheet>
 * ```
 */
export declare class DefinedNameDirective extends ComplexBase<DefinedNameDirective> {
    private viewContainerRef;
    /**
     * Specifies comment for the defined name.

     */
    comment: any;
    /**
     * Specifies name for the defined name, which can be used in formula.

     */
    name: any;
    /**
     * Specifies reference for the defined name.

     */
    refersTo: any;
    /**
     * Specifies scope for the defined name.

     */
    scope: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * DefinedName Array Directive
 * @private
 */
export declare class DefinedNamesDirective extends ArrayBase<DefinedNamesDirective> {
    constructor();
}
