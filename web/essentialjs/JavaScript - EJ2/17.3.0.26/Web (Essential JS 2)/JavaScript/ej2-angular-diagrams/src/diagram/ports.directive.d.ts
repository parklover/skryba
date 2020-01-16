import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Nodes Directive
 * ```html
 * <e-nodes>
 * <e-node>
 * <e-node-ports>
 * <e-node-port>
 * </e-node-port>
 * </e-node-ports>
 * </e-node>
 * </e-nodes>
 * ```
 */
export declare class PortDirective extends ComplexBase<PortDirective> {
    private viewContainerRef;
    /**
     * Allows the user to save custom information/data about a port



     */
    addInfo: any;
    /**
     * Defines the constraints of port



     */
    constraints: any;
    /**
     * Sets the height of the port

     */
    height: any;
    /**
     * Sets the horizontal alignment of the port with respect to its immediate parent(node/connector)
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Left - Aligns the diagram element at the left of its immediate parent
     * * Right - Aligns the diagram element at the right of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    horizontalAlignment: any;
    /**
     * Defines the unique id of the port

     */
    id: any;
    /**
     * Defines the space that the port has to be moved from its actual position

     */
    margin: any;
    /**
     * Defines the position of the port with respect to the boundaries of nodes/connector

     */
    offset: any;
    /**
     * Defines the geometry of the port

     */
    pathData: any;
    /**
     * Defines the type of the port shape
     * * X - Sets the decorator shape as X
     * * Circle - Sets the decorator shape as Circle
     * * Square - Sets the decorator shape as Square
     * * Custom - Sets the decorator shape as Custom

     */
    shape: any;
    /**
     * Defines the appearance of the port
     *

     */
    style: any;
    /**
     * Sets the vertical alignment of the port with respect to its immediate parent(node/connector)
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Top - Aligns the diagram element at the top of its immediate parent
     * * Bottom - Aligns the diagram element at the bottom of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    verticalAlignment: any;
    /**
     * Defines the type of the port visibility
     * * Visible - Always shows the port
     * * Hidden - Always hides the port
     * * Hover - Shows the port when the mouse hovers over a node
     * * Connect - Shows the port when a connection end point is dragged over a node



     */
    visibility: any;
    /**
     * Sets the width of the port

     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Port Array Directive
 * @private
 */
export declare class PortsDirective extends ArrayBase<PortsDirective> {
    constructor();
}
