import { ChildProperty } from '@syncfusion/ej2-base';
import { GradientModel, RadialGradientModel, LinearGradientModel, StopModel } from './appearance-model';
import { TextDecoration, TextWrap, TextAlign, GradientType, TextOverflow, WhiteSpace } from '../enum/enum';
/**
 * Layout Model module defines the styles and types to arrange objects in containers
 */
export declare class Thickness {
    /**
     * Sets the left value of the thickness

     */
    left: number;
    /**
     * Sets the right value of the thickness

     */
    right: number;
    /**
     * Sets the top value of the thickness

     */
    top: number;
    /**
     * Sets the bottom value of the thickness

     */
    bottom: number;
    constructor(left: number, right: number, top: number, bottom: number);
}
/**
 * Defines the space to be left between an object and its immediate parent
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * Sets the space to be left from the left side of the immediate parent of an element

     */
    left: number;
    /**
     * Sets the space to be left from the right side of the immediate parent of an element

     */
    right: number;
    /**
     * Sets the space to be left from the top side of the immediate parent of an element

     */
    top: number;
    /**
     * Sets the space to be left from the bottom side of the immediate parent of an element

     */
    bottom: number;
}
/**
 * Defines the different colors and the region of color transitions
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let stopscol: StopModel[] = [];
 * let stops1: StopModel = { color: 'white', offset: 0, opacity: 0.7 };
 * stopscol.push(stops1);
 * let stops2: StopModel = { color: 'red', offset: 0, opacity: 0.3 };
 * stopscol.push(stops2);
 * let gradient: RadialGradientModel = { cx: 50, cy: 50, fx: 50, fy: 50, stops: stopscol, type: 'Radial' };
 * let nodes: NodeModel[] = [{ id: 'node1', width: 100, height: 100,
 * style: { gradient: gradient }
 * }];
 * let diagram: Diagram = new Diagram({
 * ...
 *   nodes: nodes,
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 */
export declare class Stop extends ChildProperty<Stop> {
    /**
     * Sets the color to be filled over the specified region

     */
    color: string;
    /**
     * Sets the position where the previous color transition ends and a new color transition starts

     */
    offset: number;
    /**
     * Describes the transparency level of the region

     */
    opacity: number;
    /**
     * @private
     * Returns the name of class Stop
     */
    getClassName(): string;
}
/**
 * Paints the node with a smooth transition from one color to another color
 */
export declare class Gradient extends ChildProperty<Gradient> {
    /**
     * Defines the stop collection of gradient

     */
    stops: StopModel[];
    /**
     * Defines the type of gradient
     * * Linear - Sets the type of the gradient as Linear
     * * Radial - Sets the type of the gradient as Radial

     */
    type: GradientType;
    /**
     * Defines the id of gradient

     */
    id: string;
}
/**
 * Defines the linear gradient of styles
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let stopscol: StopModel[] = [];
 * let stops1: StopModel = { color: 'white', offset: 0, opacity: 0.7 };
 * stopscol.push(stops1);
 * let stops2: StopModel = { color: 'red', offset: 0, opacity: 0.3 };
 * stopscol.push(stops2);
 * let gradient: LinearGradientModel = { x1: 0, x2: 50, y1: 0, y2: 50, stops: stopscol, type: 'Linear' };
 * let nodes: NodeModel[] = [{ id: 'node1', width: 100, height: 100,
 * style: { gradient: gradient }
 * }];
 * let diagram: Diagram = new Diagram({
 * ...
 *   nodes: nodes,
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 */
/**
 * Paints the node with linear color transitions
 */
export declare class LinearGradient extends Gradient {
    /**
     * Defines the x1 value of linear gradient

     */
    x1: number;
    /**
     * Defines the x2 value of linear gradient

     */
    x2: number;
    /**
     * Defines the y1 value of linear gradient

     */
    y1: number;
    /**
     * Defines the y2 value of linear gradient

     */
    y2: number;
}
/**
 * A focal point defines the beginning of the gradient, and a circle defines the end point of the gradient
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let stopscol: StopModel[] = [];
 * let stops1: StopModel = { color: 'white', offset: 0, opacity: 0.7 };
 * stopscol.push(stops1);
 * let stops2: StopModel = { color: 'red', offset: 0, opacity: 0.3 };
 * stopscol.push(stops2);
 * let gradient: RadialGradientModel = { cx: 50, cy: 50, fx: 50, fy: 50, stops: stopscol, type: 'Radial' };
 * let nodes: NodeModel[] = [{ id: 'node1', width: 100, height: 100,
 * style: { gradient: gradient }
 * }];
 * let diagram: Diagram = new Diagram({
 * ...
 *   nodes: nodes,
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 */
export declare class RadialGradient extends Gradient {
    /**
     * Defines the cx value of radial gradient

     */
    cx: number;
    /**
     * Defines the cy value of radial gradient

     */
    cy: number;
    /**
     * Defines the fx value of radial gradient

     */
    fx: number;
    /**
     * Defines the fy value of radial gradient

     */
    fy: number;
    /**
     * Defines the r value of radial gradient

     */
    r: number;
}
/**
 * Defines the style of shape/path
 */
export declare class ShapeStyle extends ChildProperty<ShapeStyle> {
    /**
     * Sets the fill color of a shape/path

     */
    fill: string;
    /**
     * Sets the stroke color of a shape/path

     */
    strokeColor: string;
    /**
     * Defines the pattern of dashes and spaces to stroke the path/shape
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```
     *  let nodes: NodeModel[] = [{  id: 'node', width: 100, height: 100, offsetX: 100, offsetY: 100,
     * style: { fill: 'red', strokeColor: 'blue', strokeWidth: 5,
     * strokeDashArray: '2 2', opacity: 0.6 } as ShapeStyleModel,
     * }];
     * let diagram: Diagram = new Diagram({
     * ...
     *   nodes: nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```

     */
    strokeDashArray: string;
    /**
     * Defines the stroke width of the path/shape

     */
    strokeWidth: number;
    /**
     * Sets the opacity of a shape/path

     */
    opacity: number;
    /**
     * Defines the gradient of a shape/path


     */
    gradient: GradientModel | LinearGradientModel | RadialGradientModel;
}
/**
 * Defines the stroke style of a path
 */
export declare class StrokeStyle extends ShapeStyle {
    /**
     * Sets the fill color of a shape/path

     */
    fill: string;
}
/**
 * Defines the appearance of text
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let style: TextStyleModel = { strokeColor: 'black', opacity: 0.5, strokeWidth: 1 };
 * let node: NodeModel;
 * node = {
 * ...
 * id: 'node', width: 100, height: 100, offsetX: 100, offsetY: 100,
 * annotations : [{
 * content: 'text', style: style }];
 * ...
 * };
 * let diagram: Diagram = new Diagram({
 * ...
 *   nodes: [node],
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 */
export declare class TextStyle extends ShapeStyle {
    /**
     * Sets the font color of a text

     */
    color: string;
    /**
     * Sets the font type of a text

     */
    fontFamily: string;
    /**
     * Defines the font size of a text

     */
    fontSize: number;
    /**
     * Enables/disables the italic style of text

     */
    italic: boolean;
    /**
     * Enables/disables the bold style of text

     */
    bold: boolean;
    /**
     * Defines how the white space and new line characters have to be handled
     * * PreserveAll - Preserves all empty spaces and empty lines
     * * CollapseSpace - Collapses the consequent spaces into one
     * * CollapseAll - Collapses all consequent empty spaces and empty lines

     */
    whiteSpace: WhiteSpace;
    /**
     * Defines how the text should be wrapped, when the text size exceeds some specific bounds
     * * WrapWithOverflow - Wraps the text so that no word is broken
     * * Wrap - Wraps the text and breaks the word, if necessary
     * * NoWrap - Text will no be wrapped

     */
    textWrapping: TextWrap;
    /**
     * Defines how the text should be aligned within its bounds
     * * Left - Aligns the text at the left of the text bounds
     * * Right - Aligns the text at the right of the text bounds
     * * Center - Aligns the text at the center of the text bounds
     * * Justify - Aligns the text in a justified manner

     */
    textAlign: TextAlign;
    /**
     * Defines how the text should be decorated. For example, with underline/over line
     * * Overline - Decorates the text with a line above the text
     * * Underline - Decorates the text with an underline
     * * LineThrough - Decorates the text by striking it with a line
     * * None - Text will not have any specific decoration

     */
    textDecoration: TextDecoration;
    /**
     * Defines how to handle the text when it exceeds the given size.
     * * Wrap - Wraps the text to next line, when it exceeds its bounds
     * * Ellipsis - It truncates the overflown text and represents the clipping with an ellipsis
     * * Clip - It clips the overflow text

     */
    textOverflow: TextOverflow;
    /**
     * Sets the fill color of a shape/path

     */
    fill: string;
}
