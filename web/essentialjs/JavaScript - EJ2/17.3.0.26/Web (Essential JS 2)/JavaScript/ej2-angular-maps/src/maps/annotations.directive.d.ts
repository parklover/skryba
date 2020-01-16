import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Annotation Directive
 * ```html
 * <e-maps-annotations>
 * <e-maps-annotation></e-maps-annotation>
 * </e-maps-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    /**
     * Specifies the horizontal alignment of annotation.

     */
    horizontalAlignment: any;
    /**
     * Specifies the vertical alignment of annotation.

     */
    verticalAlignment: any;
    /**
     * Specifies the position of x.
     */
    x: any;
    /**
     * Specifies the position of y.
     */
    y: any;
    /**
     * Specifies the zIndex of the annotation.

     */
    zIndex: any;
    /**
     * Specifies the id of html element.
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Annotation Array Directive
 * @private
 */
export declare class AnnotationsDirective extends ArrayBase<AnnotationsDirective> {
    constructor();
}
