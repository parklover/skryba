import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Nodes Directive
 * ```html
 * <e-nodes>
 * <e-node></e-node>
 * </e-nodes>
 * ```
 */
export declare class NodeDirective extends ComplexBase<NodeDirective> {
    private viewContainerRef;
    childAnnotations: any;
    childPorts: any;
    tags: string[];
    /**
     * Allows the user to save custom information/data about a node/connector



     */
    addInfo: any;
    /**
     * Defines the collection of textual annotations of nodes/connectors



     */
    annotations: any;
    /**
     * Sets the background color of the shape

     */
    backgroundColor: any;
    /**
     * Sets the border color of the node

     */
    borderColor: any;
    /**
     * Sets the border width of the node


     */
    borderWidth: any;
    /**
     * Set the branch for the mind map



     */
    branch: any;
    /**
     * Defines the children of group element



     */
    children: any;
    /**
     * Defines the collapsed state of a node

     */
    collapseIcon: any;
    /**
     * Used to define a index of column in the grid



     */
    columnIndex: any;
    /**
     * Merge the column use the property in the grid container



     */
    columnSpan: any;
    /**
     * Used to define the column for the grid container



     */
    columns: any;
    /**
     * Enables/Disables certain features of nodes
     * * None - Disable all node Constraints
     * * Select - Enables node to be selected
     * * Drag - Enables node to be Dragged
     * * Rotate - Enables node to be Rotate
     * * Shadow - Enables node to display shadow
     * * PointerEvents - Enables node to provide pointer  option
     * * Delete - Enables node to delete
     * * InConnect - Enables node to provide in connect option
     * * OutConnect - Enables node to provide out connect option
     * * Individual - Enables node to provide individual resize option
     * * Expandable - Enables node to provide Expandable option
     * * AllowDrop - Enables node to provide allow to drop option
     * * Inherit - Enables node to inherit the interaction option
     * * ResizeNorthEast - Enable ResizeNorthEast of the node
     * * ResizeEast - Enable ResizeEast of the node
     * * ResizeSouthEast - Enable ResizeSouthEast of the node
     * * ResizeSouth - Enable ResizeSouthWest of the node
     * * ResizeSouthWest - Enable ResizeSouthWest of the node
     * * ResizeSouth - Enable ResizeSouth of the node
     * * ResizeSouthWest - Enable ResizeSouthWest of the node
     * * ResizeWest - Enable ResizeWest of the node
     * * ResizeNorth - Enable ResizeNorth of the node
     * * Resize - Enables the Aspect ratio fo the node
     * * AspectRatio - Enables the Aspect ratio fo the node
     * * Tooltip - Enables or disables tool tip for the Nodes
     * * InheritTooltip - Enables or disables tool tip for the Nodes
     * * ReadOnly - Enables the  ReadOnly support for Annotation



     */
    constraints: any;
    /**
     * Defines the type of the container



     */
    container: any;
    /**
     * Sets the data source of the node
     */
    data: any;
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
     * Sets the height of the node



     */
    height: any;
    /**
     * Sets the horizontalAlignment of the node

     */
    horizontalAlignment: any;
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
     * Sets the maximum height of the node



     */
    maxHeight: any;
    /**
     * Sets the maximum width of the node



     */
    maxWidth: any;
    /**
     * Sets the minimum height of the node



     */
    minHeight: any;
    /**
     * Sets the minimum width of the node



     */
    minWidth: any;
    /**
     * Sets the x-coordinate of the position of the node

     */
    offsetX: any;
    /**
     * Sets the y-coordinate of the position of the node

     */
    offsetY: any;
    /**
     * Sets the reference point, that will act as the offset values(offsetX, offsetY) of a node

     */
    pivot: any;
    /**
     * Defines the collection of connection points of nodes/connectors



     */
    ports: any;
    /**
     * Sets the rotate angle of the node

     */
    rotateAngle: any;
    /**
     * Used to define a index of row in the grid



     */
    rowIndex: any;
    /**
     * Merge the row use the property in the grid container



     */
    rowSpan: any;
    /**
     * Used to define the rows for the grid container



     */
    rows: any;
    /**
     * Defines the shadow of a shape/path

     */
    shadow: any;
    /**
     * Defines the shape of a node



     */
    shape: any;
    /**
     * Sets the shape style of the node


     */
    style: any;
    /**
     * defines the tooltip for the node

     */
    tooltip: any;
    /**
     * Sets the verticalAlignment of the node

     */
    verticalAlignment: any;
    /**
     * Sets the visibility of the node/connector

     */
    visible: any;
    /**
     * Sets the width of the node



     */
    width: any;
    /**
     * Sets or gets the UI of a node

     */
    wrapper: any;
    /**
     * Defines the visual order of the node/connector in DOM

     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Node Array Directive
 * @private
 */
export declare class NodesDirective extends ArrayBase<NodesDirective> {
    constructor();
}
