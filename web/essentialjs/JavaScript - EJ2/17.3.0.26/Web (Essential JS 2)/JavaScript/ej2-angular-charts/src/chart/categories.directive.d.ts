import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * MultiLevelLabels Directive
 * ```html
 * <e-multilevellabels>
 * <e-multilevellabel>
 * <e-Categories>
 * <e-Category>
 * </e-Category>
 * </e-Categories>
 * </e-multilevellabel>
 * </e-multilevellabels>
 * ```
 */
export declare class CategoryDirective extends ComplexBase<CategoryDirective> {
    private viewContainerRef;
    /**
     * Border type for labels
     * * Rectangle
     * * Without Top Border
     * * Without Top and BottomBorder
     * * Without Border
     * * Brace
     * * CurlyBrace



     */
    type: any;
    /**
     * multi level labels custom data.

     */
    customAttributes: any;
    /**
     * End value of the multi level labels


     */
    end: any;
    /**
     * Maximum width of the text for multi level labels.


     */
    maximumTextWidth: any;
    /**
     * Start value of the multi level labels


     */
    start: any;
    /**
     * multi level labels text.

     */
    text: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Category Array Directive
 * @private
 */
export declare class CategoriesDirective extends ArrayBase<CategoriesDirective> {
    constructor();
}
