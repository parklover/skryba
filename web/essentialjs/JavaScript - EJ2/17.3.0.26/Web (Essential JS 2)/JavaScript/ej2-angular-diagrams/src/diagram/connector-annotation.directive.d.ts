import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Connectors Directive
 * ```html
 * <e-connectors>
 * <e-connector>
 * <e-connector-annotations>
 * <e-connector-annotation>
 * </e-connector-annotation>
 * </e-connector-annotations>
 * </e-connector>
 * </e-connectors>
 * ```
 */
export declare class ConnectorAnnotationDirective extends ComplexBase<ConnectorAnnotationDirective> {
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
     * Sets the segment alignment of annotation
     *  * Center - Aligns the annotation at the center of a connector segment
     *  * Before - Aligns the annotation before a connector segment
     *  * After - Aligns the annotation after a connector segment

     */
    alignment: any;
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
     * Sets the displacement of an annotation from its actual position



     */
    displacement: any;
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
     * Sets the segment offset of annotation

     */
    offset: any;
    /**
     * Sets the rotate angle of the text

     */
    rotateAngle: any;
    /**
     * Enable/Disable the angle based on the connector segment

     */
    segmentAngle: any;
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
 * ConnectorAnnotation Array Directive
 * @private
 */
export declare class ConnectorAnnotationsDirective extends ArrayBase<ConnectorAnnotationsDirective> {
    constructor();
}
