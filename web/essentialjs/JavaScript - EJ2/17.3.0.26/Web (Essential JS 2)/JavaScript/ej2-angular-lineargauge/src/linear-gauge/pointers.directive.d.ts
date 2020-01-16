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
     * Specifies the type of pointer.

     */
    type: any;
    /**
     * Specifies the animating duration of pointer in milliseconds.

     */
    animationDuration: any;
    /**
     * Specifies the border of pointer.
     */
    border: any;
    /**
     * Specifies the color of the pointer.
     */
    color: any;
    /**
     * Description of the pointer.

     */
    description: any;
    /**
     * Specifies the enable or disable the pointer drag.

     */
    enableDrag: any;
    /**
     * Specifies the height of pointer.

     */
    height: any;
    /**
     * Specifies the path of image.

     */
    imageUrl: any;
    /**
     * Specifies the marker shape in pointer.

     */
    markerType: any;
    /**
     * Specifies to move the pointer.

     */
    offset: any;
    /**
     * Specifies the opacity for pointer.

     */
    opacity: any;
    /**
     * Specifies the place of the pointer.

     */
    placement: any;
    /**
     * Specifies the corner radius for rounded rectangle.

     */
    roundedCornerRadius: any;
    /**
     * Specifies value of the pointer.


     */
    value: any;
    /**
     * Specifies the width of pointer.

     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Pointer Array Directive
 * @private
 */
export declare class PointersDirective extends ArrayBase<PointersDirective> {
    constructor();
}
