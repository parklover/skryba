import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';import { Placement, ContainerType } from '../utils/enum';

/**
 * Interface for a class Font
 */
export interface FontModel {

    /**
     * Font size for text.
     */
    size?: string;

    /**
     * Color for text.
     */
    color?: string;

    /**
     * FontFamily for text.
     */
    fontFamily?: string;

    /**
     * FontWeight for text.
     */
    fontWeight?: string;

    /**
     * FontStyle for text.
     */
    fontStyle?: string;

    /**
     * Opacity for text.

     */
    opacity?: number;

}

/**
 * Interface for a class Margin
 */
export interface MarginModel {

    /**
     * Left margin in pixels.

     */
    left?: number;

    /**
     * Right margin in pixels.

     */
    right?: number;

    /**
     * Top margin in pixels.

     */
    top?: number;

    /**
     * Bottom margin in pixels.

     */
    bottom?: number;

}

/**
 * Interface for a class Border
 */
export interface BorderModel {

    /**
     * The color of the border, which accepts value in hex, rgba as a valid CSS color string.
     */
    color?: string;

    /**
     * The width of the border in pixels.

     */
    width?: number;

}

/**
 * Interface for a class Annotation
 */
export interface AnnotationModel {

    /**
     * Specifies the id of html element.
     */
    content?: string;

    /**
     * Specifies the position of x.
     */
    x?: number;

    /**
     * Specifies the position of y.
     */
    y?: number;

    /**
     * Specifies the vertical alignment of annotation.

     */
    verticalAlignment?: Placement;

    /**
     * Specifies the horizontal alignment of annotation.

     */
    horizontalAlignment?: Placement;

    /**
     * Specifies the zIndex of the annotation.

     */
    zIndex?: string;

    /**
     * The font of the axis labels.
     */

    font?: FontModel;

    /**
     * Specifies the index of axis.

     */
    axisIndex?: number;

    /**
     * Specifies the value of axis.


     */
    axisValue?: number;

}

/**
 * Interface for a class Container
 */
export interface ContainerModel {

    /**
     * Specifies the type of container.

     */
    type?: ContainerType;

    /**
     * Specifies the height of the container.

     */
    height?: number;

    /**
     * Specifies the width of the container.

     */
    width?: number;

    /**
     * Specifies the corner radius for rounded rectangle.

     */
    roundedCornerRadius?: number;

    /**
     * Specifies the background of the color.
     */
    backgroundColor?: string;

    /**
     * Specifies the border of container.
     */
    border?: BorderModel;

    /**
     * Specifies to move the container.

     */
    offset?: number;

}

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Enable / Disable the visibility of tooltip.

     */

    enable?: boolean;

    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string. 
     */

    fill?: string;

    /**
     * Options to customize the tooltip text.
     */

    textStyle?: FontModel;

    /**
     * Format of the tooltip content.

     */

    format?: string;

    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.

     */

    template?: string;

    /**
     * If set true, tooltip will animate, while moving from one point to another.

     */
    enableAnimation?: boolean;

    /**
     * Options to customize the border for tooltip.
     */
    border?: BorderModel;

}