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
     * Specifies the border of axis range.
     */
    border: any;
    /**
     * Color of the axis range.
     */
    color: any;
    /**
     * End of the axis range.

     */
    end: any;
    /**
     * Ending width of axis range.

     */
    endWidth: any;
    /**
     * Specifies to move the axis range.

     */
    offset: any;
    /**
     * Specifies to position the axis range.

     */
    position: any;
    /**
     * Start of the axis range.

     */
    start: any;
    /**
     * Starting width of axis range.

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
