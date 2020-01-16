import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * StripLine Directive
 * ```html
 * <e-axis>
 * <e-striplines>
 * <e-stripline></e-stripline>
 * </e-striplines>
 * </e-axis>
 * ```
 */
export declare class StripLineDirective extends ComplexBase<StripLineDirective> {
    private viewContainerRef;
    /**
     * Border of the strip line.
     */
    border: any;
    /**
     * Color of the strip line.

     */
    color: any;
    /**
     * Dash Array of the strip line.


     */
    dashArray: any;
    /**
     * End value of the strip line.


     */
    end: any;
    /**
     * Defines the position of the strip line text horizontally. They are,
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.

     */
    horizontalAlignment: any;
    /**
     * isRepeat value of the strip line.


     */
    isRepeat: any;
    /**
     * isSegmented value of the strip line


     */
    isSegmented: any;
    /**
     * Strip line Opacity

     */
    opacity: any;
    /**
     * repeatEvery value of the strip line.


     */
    repeatEvery: any;
    /**
     * repeatUntil value of the strip line.


     */
    repeatUntil: any;
    /**
     * The angle to which the strip line text gets rotated.


     */
    rotation: any;
    /**
     * segmentAxisName of the strip line.


     */
    segmentAxisName: any;
    /**
     * segmentEnd value of the strip line.


     */
    segmentEnd: any;
    /**
     * segmentStart value of the strip line.


     */
    segmentStart: any;
    /**
     * Size of the strip line, when it starts from the origin.


     */
    size: any;
    /**
     * Size type of the strip line

     */
    sizeType: any;
    /**
     * Start value of the strip line.


     */
    start: any;
    /**
     *  If set true, strip line get render from axis origin.

     */
    startFromAxis: any;
    /**
     * Strip line text.

     */
    text: any;
    /**
     * Options to customize the strip line text.
     */
    textStyle: any;
    /**
     * Defines the position of the strip line text vertically. They are,
     * * Start: Places the strip line text at the start.
     * * Middle: Places the strip line text in the middle.
     * * End: Places the strip line text at the end.

     */
    verticalAlignment: any;
    /**
     * If set true, strip line for axis renders.

     */
    visible: any;
    /**
     * Specifies the order of the strip line. They are,
     * * Behind: Places the strip line behind the series elements.
     * * Over: Places the strip line over the series elements.

     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StripLine Array Directive
 * @private
 */
export declare class StripLinesDirective extends ArrayBase<StripLinesDirective> {
    constructor();
}
