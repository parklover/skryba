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
    childAnnotations: any;
    childRanges: any;
    childPointers: any;
    tags: string[];
    /**
     * ‘Annotation’ module is used to handle annotation action for an axis.
     */
    annotations: any;
    /**
     * The background color of the axis, which accepts value in hex, rgba as a valid CSS color string.

     */
    background: any;
    /**
     * Specifies the direction of an axis. They are
     * * clockWise -  Renders the axis in clock wise direction.
     * * antiClockWise - Renders the axis in anti-clock wise direction.

     */
    direction: any;
    /**
     * The end angle of an axis

     */
    endAngle: any;
    /**
     * Specifies to hide the intersecting axis labels

     */
    hideIntersectingLabel: any;
    /**
     * Options to customize the axis label.
     */
    labelStyle: any;
    /**
     * Options for customizing the axis lines.
     */
    lineStyle: any;
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
     * Options for customizing the pointers of an axis
     */
    pointers: any;
    /**
     * Radius of an axis in pixels or in percentage.

     */
    radius: any;
    /**
     * Specifies the range gap property by pixel value.

     */
    rangeGap: any;
    /**
     * Options for customizing the ranges of an axis
     */
    ranges: any;
    /**
     * Specifies the rounding Off value in the label

     */
    roundingPlaces: any;
    /**
     * Specifies the last label to be shown

     */
    showLastLabel: any;
    /**
     * Specifies the start and end range gap.

     */
    startAndEndRangeGap: any;
    /**
     * The start angle of an axis

     */
    startAngle: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Axis Array Directive
 * @private
 */
export declare class AxesDirective extends ArrayBase<AxesDirective> {
    constructor();
}
