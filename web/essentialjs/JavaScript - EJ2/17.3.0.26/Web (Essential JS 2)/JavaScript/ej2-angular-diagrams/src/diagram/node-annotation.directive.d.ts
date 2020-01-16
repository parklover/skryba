import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Nodes Directive
 * ```html
 * <e-nodes>
 * <e-node>
 * <e-node-annotations>
 * <e-node-annotation>
 * </e-node-annotation>
 * </e-node-annotations>
 * </e-node>
 * </e-nodes>
 * ```
 */
export declare class NodeAnnotationDirective extends ComplexBase<NodeAnnotationDirective> {
    private viewContainerRef;
    /**
     * Sets the type of the annotation
     *  * Shape - Sets the annotation type as Shape
     *  * Path - Sets the annotation type as Path

     */
    type: any;
    /**
     * Allows the user to save custom information/data about an annotation
     *



     */
    addInfo: any;
    /**
     * Enables or disables the default behaviors of the label.
     * * ReadOnly - Enables/Disables the ReadOnly Constraints
     * * InheritReadOnly - Enables/Disables the InheritReadOnly Constraints



     */
    constraints: any;
    /**
     * Sets the textual description of the node/connector

     */
    content: any;
    /**
     * Sets the space to be left between an annotation and its parent node/connector

     */
    dragLimit: any;
    /**
     * Sets the height of the text



     */
    height: any;
    /**
     * Sets the horizontal alignment of the text with respect to the parent node/connector
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Left - Aligns the diagram element at the left of its immediate parent
     * * Right - Aligns the diagram element at the right of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    horizontalAlignment: any;
    /**
     * Sets the hyperlink of the label
     *



     */
    hyperlink: any;
    /**
     * Defines the unique id of the annotation

     */
    id: any;
    /**
     * Sets the space to be left between an annotation and its parent node/connector

     */
    margin: any;
    /**
     * Sets the position of the annotation with respect to its parent bounds

     */
    offset: any;
    /**
     * Sets the rotate angle of the text

     */
    rotateAngle: any;
    /**
     * Defines the appearance of the text

     */
    style: any;
    /**
     * Sets the textual description of the node/connector

     */
    template: any;
    /**
     * Sets the vertical alignment of the text with respect to the parent node/connector
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Top - Aligns the diagram element at the top of its immediate parent
     * * Bottom - Aligns the diagram element at the bottom of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    verticalAlignment: any;
    /**
     * Defines the visibility of the label

     */
    visibility: any;
    /**
     * Sets the width of the text



     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * NodeAnnotation Array Directive
 * @private
 */
export declare class NodeAnnotationsDirective extends ArrayBase<NodeAnnotationsDirective> {
    constructor();
}
