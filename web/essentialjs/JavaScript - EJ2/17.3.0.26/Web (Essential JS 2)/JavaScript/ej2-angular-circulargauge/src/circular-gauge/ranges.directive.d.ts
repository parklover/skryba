import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Ranges directive
 * ```html
 * <e-ranges><e-range></e-range></e-ranges>
 * ```
 */
export declare class RangeDirective extends ComplexBase<RangeDirective> {
    private viewContainerRef;
    /**
     * Specifies the color of the ranges


     */
    color: any;
    /**
     * Specifies the maximum value of the range.


     */
    end: any;
    /**
     * Specifies the end width of the ranges

     */
    endWidth: any;
    /**
     * Specifies the text for legend.

     */
    legendText: any;
    /**
     * Specifies the opacity for ranges.

     */
    opacity: any;
    /**
     * The radius of the range in pixels or in percentage.

     */
    radius: any;
    /**
     * Specifies the rounded corner radius for ranges.

     */
    roundedCornerRadius: any;
    /**
     * Specifies the minimum value of the range.


     */
    start: any;
    /**
     * Specifies the start width of the ranges

     */
    startWidth: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Range Array Directive
 * @private
 */
export declare class RangesDirective extends ArrayBase<RangesDirective> {
    constructor();
}
