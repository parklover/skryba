import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Axes directive
 * ```html
 * <e-axes><e-axis></e-axis></e-axes>
 * ```
 */
export declare class AxisDirective extends ComplexBase<AxisDirective> {
    private viewContainerRef;
    childRanges: any;
    childPointers: any;
    tags: string[];
    /**
     * Specifies the axis rendering direction.
     */
    isInversed: any;
    /**
     * Options for customizing the axis label appearance.
     */
    labelStyle: any;
    /**
     * Options for customizing the axis line.
     */
    line: any;
    /**
     * Options for customizing the major tick lines.
     */
    majorTicks: any;
    /**
     * Specifies the maximum value of an axis.

     */
    maximum: any;
    /**
     * Specifies the minimum value of an axis.

     */
    minimum: any;
    /**
     * Options for customizing the minor tick lines.
     */
    minorTicks: any;
    /**
     * Specifies the axis rendering position.
     */
    opposedPosition: any;
    /**
     * Options for customizing the pointers of an axis
     */
    pointers: any;
    /**
     * Options for customizing the ranges of an axis
     */
    ranges: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Axis Array Directive
 * @private
 */
export declare class AxesDirective extends ArrayBase<AxesDirective> {
    constructor();
}
