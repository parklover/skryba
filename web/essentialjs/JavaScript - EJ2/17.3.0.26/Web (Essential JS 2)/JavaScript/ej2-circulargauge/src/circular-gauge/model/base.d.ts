import { ChildProperty } from '@syncfusion/ej2-base';
import { FontModel, BorderModel, RangeTooltipModel, AnnotationTooltipModel } from './base-model';
/**
 * Configures the borders in circular gauge.
 */
export declare class Border extends ChildProperty<Border> {
    /**
     * The color of the border, which accepts value in hex, rgba as a valid CSS color string.
     */
    color: string;
    /**
     * The width of the border in pixels.

     */
    width: number;
}
/**
 * Configures the fonts in circular gauge.
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * Font size for text.

     */
    size: string;
    /**
     * Color for text.
     */
    color: string;
    /**
     * FontFamily for text.

     */
    fontFamily: string;
    /**
     * FontWeight for text.

     */
    fontWeight: string;
    /**
     * FontStyle for text.

     */
    fontStyle: string;
    /**
     * Opacity for text.

     */
    opacity: number;
}
/**
 * To set tooltip properties for range tooltip.
 */
export declare class RangeTooltip extends ChildProperty<RangeTooltip> {
    /**
     * The fill color of the range tooltip, which accepts value in hex, rgba as a valid CSS color string.

     */
    fill: string;
    /**
     * Options to customize the tooltip text of range.
     */
    textStyle: FontModel;
    /**
     * Format of the range tooltip content.

     */
    format: string;
    /**
     * Custom template to format the  tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.

     */
    template: string;
    /**
     * If set true, range tooltip will animate, while moving from one point to another.

     */
    enableAnimation: boolean;
    /**
     * Options to customize the border for range tooltip.
     */
    border: BorderModel;
    /**
     * Options to show the range tooltip position on pointer.

     */
    showAtMousePosition: boolean;
}
/**
 * To set tooltip properties for annotation tooltip.
 */
export declare class AnnotationTooltip extends ChildProperty<AnnotationTooltip> {
    /**
     * The fill color of the annotation tooltip, which accepts value in hex, rgba as a valid CSS color string.

     */
    fill: string;
    /**
     * Options to customize the tooltip text of annotation.
     */
    textStyle: FontModel;
    /**
     * Format of the annotation tooltip content.

     */
    format: string;
    /**
     * Custom template to format the  tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.

     */
    template: string;
    /**
     * If set true, range and annotation tooltip will animate, while moving from one point to another.

     */
    enableAnimation: boolean;
    /**
     * Options to customize the border for annotation tooltip.
     */
    border: BorderModel;
}
/**
 * Configures the margin of circular gauge.
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * Left margin in pixels.

     */
    left: number;
    /**
     * Right margin in pixels.

     */
    right: number;
    /**
     * Top margin in pixels.

     */
    top: number;
    /**
     * Bottom margin in pixels.

     */
    bottom: number;
}
/**
 * Configures the tooltip in circular gauge.
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enable / Disable the visibility of tooltip.

     */
    enable: boolean;
    /**
     * The fill color of the tooltip, which accepts value in hex, rgba as a valid CSS color string.

     */
    fill: string;
    /**
     * Options to customize the tooltip text.
     */
    textStyle: FontModel;
    /**
     * Options to customize the range tooltip property.
     */
    rangeSettings: RangeTooltipModel;
    /**
     * Options to customize the annotation tooltip property.
     */
    annotationSettings: AnnotationTooltipModel;
    /**
     * Format of the tooltip content.

     */
    format: string;
    /**
     * Custom template to format the tooltip content. Use ${x} and ${y} as a placeholder text to display the corresponding data point.

     */
    template: string;
    /**
     * If set true, tooltip will animate, while moving from one point to another.

     */
    enableAnimation: boolean;
    /**
     * Options to customize the border for tooltip.
     */
    border: BorderModel;
    /**
     * Options to show the tooltip position on pointer

     */
    showAtMousePosition: boolean;
    /**
     * Option to select the tooltip from Range, Annotation, Pointer

     */
    type: string[];
}
