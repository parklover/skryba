import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Connectors Directive
 * ```html
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * ```
 */
export declare class ConnectorDirective extends ComplexBase<ConnectorDirective> {
    private viewContainerRef;
    childAnnotations: any;
    tags: string[];
    /**
     * Defines the type of the connector
     * * Straight - Sets the segment type as Straight
     * * Orthogonal - Sets the segment type as Orthogonal
     * * Bezier - Sets the segment type as Bezier




     */
    type: any;
    /**
     * Allows the user to save custom information/data about a node/connector



     */
    addInfo: any;
    /**
     *
     */
    annotations: any;
    /**
     * Defines the bridgeSpace of connector

     */
    bridgeSpace: any;
    /**
     * Defines the collapsed state of a node

     */
    collapseIcon: any;
    /**
     * Defines the constraints of connector
     * * None - Interaction of the connectors cannot be done.
     * * Select - Selects the connector.
     * * Delete - Delete the connector.
     * * Drag - Drag the connector.
     * * DragSourceEnd - Drag the source end of the connector.
     * * DragTargetEnd - Drag the target end of the connector.
     * * DragSegmentThump - Drag the segment thumb of the connector.
     * * AllowDrop - Allow to drop a node.
     * * Bridging - Creates bridge  on intersection of two connectors.
     * * InheritBridging - Creates bridge  on intersection of two connectors.
     * * PointerEvents - Sets the pointer events.
     * * Tooltip - Displays a tooltip for the connectors.
     * * InheritToolTip - Displays a tooltip for the connectors.
     * * Interaction - Features of the connector used for interaction.
     * * ReadOnly - Enables ReadOnly



     */
    constraints: any;
    /**
     * Sets the corner radius of the connector

     */
    cornerRadius: any;
    /**
     * Defines whether the node should be automatically positioned or not. Applicable, if layout option is enabled.

     */
    excludeFromLayout: any;
    /**
     * Defines the expanded state of a node

     */
    expandIcon: any;
    /**
     * Flip the element in Horizontal/Vertical directions



     */
    flip: any;
    /**
     * Sets the connector padding value

     */
    hitPadding: any;
    /**
     * Represents the unique id of nodes/connectors

     */
    id: any;
    /**
     * Defines whether the node is expanded or not

     */
    isExpanded: any;
    /**
     * Defines the space to be left between the node and its immediate parent

     */
    margin: any;
    /**
     * Defines the collection of connection points of nodes/connectors



     */
    ports: any;
    /**
     * Defines the segments



     */
    segments: any;
    /**
     * Defines the shape of the connector



     */
    shape: any;
    /**
     * Defines the source decorator of the connector

     */
    sourceDecorator: any;
    /**
     * Sets the source node/connector object of the connector

     */
    sourceID: any;
    /**
     * Sets the source padding of the connector


     */
    sourcePadding: any;
    /**
     * Sets the beginning point of the connector

     */
    sourcePoint: any;
    /**
     * Sets the unique id of the source port of the connector

     */
    sourcePortID: any;
    /**
     * Defines the appearance of the connection path

     */
    style: any;
    /**
     * Defines the target decorator of the connector

     */
    targetDecorator: any;
    /**
     * Sets the target node/connector object of the connector

     */
    targetID: any;
    /**
     * Sets the target padding of the connector


     */
    targetPadding: any;
    /**
     * Sets the end point of the connector

     */
    targetPoint: any;
    /**
     * Sets the unique id of the target port of the connector

     */
    targetPortID: any;
    /**
     * defines the tooltip for the connector

     */
    tooltip: any;
    /**
     * Sets the visibility of the node/connector

     */
    visible: any;
    /**
     * Defines the UI of the connector

     */
    wrapper: any;
    /**
     * Defines the visual order of the node/connector in DOM

     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Connector Array Directive
 * @private
 */
export declare class ConnectorsDirective extends ArrayBase<ConnectorsDirective> {
    constructor();
}
