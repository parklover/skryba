import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Annotation directive
 * ```html
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * ```
 */
export declare class AnnotationDirective extends ComplexBase<AnnotationDirective> {
    private viewContainerRef;
    /**
     * Specifies the index of axis.

     */
    axisIndex: any;
    /**
     * Specifies the value of axis.


     */
    axisValue: any;
    /**
     * The font of the axis labels.
     */
    font: any;
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
