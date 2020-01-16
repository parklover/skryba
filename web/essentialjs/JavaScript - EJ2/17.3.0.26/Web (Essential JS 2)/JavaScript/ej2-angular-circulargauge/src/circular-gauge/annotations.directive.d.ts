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
     * Angle for annotation with respect to axis.

     */
    angle: any;
    /**
     * Rotates the annotation along the axis.

     */
    autoAngle: any;
    /**
     * Information about annotation for assistive technology.

     */
    description: any;
    /**
     * Radius for annotation with respect to axis.

     */
    radius: any;
    /**
     * Options for customizing the annotation text.
     */
    textStyle: any;
    /**
     * Order of an annotation in an axis.

     */
    zIndex: any;
    /**
     * Content of the annotation, which accepts the id of the custom element.

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
