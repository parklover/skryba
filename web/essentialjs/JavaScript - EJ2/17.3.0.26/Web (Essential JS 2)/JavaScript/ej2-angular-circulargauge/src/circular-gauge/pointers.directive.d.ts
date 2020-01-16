import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Pointers directive
 * ```html
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * ```
 */
export declare class PointerDirective extends ComplexBase<PointerDirective> {
    private viewContainerRef;
    /**
     * Specifies the type of pointer for an axis.
     * * needle -  Renders a needle.
     * * marker - Renders a marker.
     * * rangeBar - Renders a rangeBar.

     */
    type: any;
    /**
     * Configures the animation of pointers.
     */
    animation: any;
    /**
     * Options for customizing the border of the needle.
     */
    border: any;
    /**
     * Options for customizing the cap
     */
    cap: any;
    /**
     * The color of the pointer.
     */
    color: any;
    /**
     * Information about pointer for assistive technology.

     */
    description: any;
    /**
     * The URL for the Image that is to be displayed as pointer.
     * It requires marker shape value to be Image.

     */
    imageUrl: any;
    /**
     * The height of the marker in pixels.

     */
    markerHeight: any;
    /**
     * Specifies the shape of the marker. They are
     * * circle - Renders a circle.
     * * rectangle - Renders a rectangle.
     * * triangle - Renders a triangle.
     * * diamond - Renders a diamond.
     * * invertedTriangle - Renders a invertedTriangle.
     * * image - Renders a image.

     */
    markerShape: any;
    /**
     * The width of the marker in pixels.

     */
    markerWidth: any;
    /**
     * Options for customizing the back needle.
     */
    needleTail: any;
    /**
     * Width of the pointer in pixels.

     */
    pointerWidth: any;
    /**
     * Length of the pointer in pixels or in percentage.

     */
    radius: any;
    /**
     * Specifies the rounded corner radius for pointer.

     */
    roundedCornerRadius: any;
    /**
     * Specifies the value of the pointer.


     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Pointer Array Directive
 * @private
 */
export declare class PointersDirective extends ArrayBase<PointersDirective> {
    constructor();
}
