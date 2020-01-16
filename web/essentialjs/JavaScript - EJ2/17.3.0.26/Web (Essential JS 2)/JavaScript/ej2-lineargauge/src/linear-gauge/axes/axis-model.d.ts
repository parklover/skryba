import { Property, Complex, ChildProperty, Collection } from '@syncfusion/ej2-base';import { VisibleLabels, Size, VisibleRange, Rect, Align } from '../utils/helper';import { Font, Border } from '../model/base';import { FontModel, BorderModel } from '../model/base-model';import { Point, Placement, MarkerType, Position } from '../utils/enum';

/**
 * Interface for a class Line
 */
export interface LineModel {

    /**
     * The dash array of the axis line.
     */

    dashArray?: string;

    /**
     * Height of the axis line.


     */
    height?: number;

    /**
     * Width of the axis line.

     */
    width?: number;

    /**
     * Color of the axis line.
     */
    color?: string;

    /**
     * Specifies to move the axis line.

     */
    offset?: number;

}

/**
 * Interface for a class Label
 */
export interface LabelModel {

    /**
     * The font of the axis labels.
     */

    font?: FontModel;

    /**
     * The color of the label, based on range color.

     */

    useRangeColor?: boolean;

    /**
     * To format the axis label, which accepts any global format string like 'C', 'n1', 'P' etc.
     * Also accepts placeholder like '{value}°C' in which value represent the axis label e.g. 20°C.
     */

    format?: string;

    /**
     * To move the axis labels.

     */
    offset?: number;

}

/**
 * Interface for a class Range
 */
export interface RangeModel {

    /**
     * Start of the axis range.

     */
    start?: number;

    /**
     * End of the axis range.

     */
    end?: number;

    /**
     * Specifies to position the axis range.

     */
    position?: Position;

    /**
     * Color of the axis range.
     */
    color?: string;

    /**
     * Starting width of axis range.

     */
    startWidth?: number;

    /**
     * Ending width of axis range.

     */
    endWidth?: number;

    /**
     * Specifies to move the axis range.

     */
    offset?: number;

    /**
     * Specifies the border of axis range.
     */
    border?: BorderModel;

}

/**
 * Interface for a class Tick
 */
export interface TickModel {

    /**
     * Height of the tick line.
     */
    height?: number;

    /**
     * Width of the tick line. 

     */
    width?: number;

    /**
     * Specifies the interval for ticks.

     */
    interval?: number;

    /**
     * The color of the major or minor tick line, which accepts value in hex, rgba as a valid CSS color string.
     */

    color?: string;

    /**
     * Specifies to move the axis ticks.

     */
    offset?: number;

}

/**
 * Interface for a class Pointer
 */
export interface PointerModel {

    /**
     * Specifies the type of pointer.

     */
    type?: Point;

    /**
     * Specifies value of the pointer.


     */

    value?: number;

    /**
     * Specifies the marker shape in pointer.

     */
    markerType?: MarkerType;

    /**
     * Specifies the path of image.

     */
    imageUrl?: string;

    /**
     * Specifies the border of pointer.
     */
    border?: BorderModel;

    /**
     * Specifies the corner radius for rounded rectangle.

     */
    roundedCornerRadius?: number;

    /**
     * Specifies the place of the pointer.

     */
    placement?: Placement;

    /**
     * Specifies the height of pointer.

     */
    height?: number;

    /**
     * Specifies the width of pointer.

     */
    width?: number;

    /**
     * Specifies the color of the pointer.
     */
    color?: string;

    /**
     * Specifies the opacity for pointer.

     */
    opacity?: number;

    /**
     * Specifies the animating duration of pointer in milliseconds.

     */
    animationDuration?: number;

    /**
     * Specifies the enable or disable the pointer drag.

     */
    enableDrag?: boolean;

    /**
     * Specifies to move the pointer.

     */
    offset?: number;

    /**
     * Description of the pointer.

     */
    description?: string;

}

/**
 * Interface for a class Axis
 */
export interface AxisModel {

    /**
     * Specifies the minimum value of an axis.

     */

    minimum?: number;

    /**
     * Specifies the maximum value of an axis.

     */

    maximum?: number;

    /**
     * Specifies the axis rendering direction.
     */

    isInversed?: boolean;

    /**
     * Specifies the axis rendering position.
     */
    opposedPosition?: boolean;

    /**
     * Options for customizing the axis line.
     */
    line?: LineModel;

    /**
     * Options for customizing the ranges of an axis
     */

    ranges?: RangeModel[];

    /**
     * Options for customizing the pointers of an axis
     */

    pointers?: PointerModel[];

    /**
     * Options for customizing the major tick lines.
     */

    majorTicks?: TickModel;

    /**
     * Options for customizing the minor tick lines.
     */

    minorTicks?: TickModel;

    /**
     * Options for customizing the axis label appearance.
     */

    labelStyle?: LabelModel;

}