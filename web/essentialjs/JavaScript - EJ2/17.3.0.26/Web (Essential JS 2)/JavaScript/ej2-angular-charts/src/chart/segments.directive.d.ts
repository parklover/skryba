import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series>
 * <e-segments>
 * <e-segment>
 * </e-segment>
 * </e-segments>
 * </e-series-collection>
 * ```
 */
export declare class SegmentDirective extends ComplexBase<SegmentDirective> {
    private viewContainerRef;
    /**
     * Defines the color of a region.

     */
    color: any;
    /**
     * Defines the pattern of dashes and gaps to stroke.

     */
    dashArray: any;
    /**
     * Defines the starting point of region.

     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Segment Array Directive
 * @private
 */
export declare class SegmentsDirective extends ArrayBase<SegmentsDirective> {
    constructor();
}
