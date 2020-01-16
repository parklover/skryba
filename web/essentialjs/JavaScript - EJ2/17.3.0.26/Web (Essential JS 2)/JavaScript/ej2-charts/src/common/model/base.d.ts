import { ChildProperty } from '@syncfusion/ej2-base';
import { BorderModel, FontModel, PeriodsModel } from './base-model';
import { EmptyPointMode } from '../../chart/utils/enum';
import { AccEmptyPointMode, ConnectorType } from '../../accumulation-chart/model/enum';
import { Alignment, TextOverflow } from '../utils/enum';
import { RangeIntervalType, PeriodSelectorPosition } from '../utils/enum';
/**
 * Defines the appearance of the connectors
 */
export declare class Connector extends ChildProperty<Connector> {
    /**
     * specifies the type of the connector line. They are
     * * Smooth
     * * Line

     */
    type: ConnectorType;
    /**
     * Color of the connector line.

     */
    color: string;
    /**
     * Width of the connector line in pixels.

     */
    width: number;
    /**
     * Length of the connector line in pixels.

     */
    length: string;
    /**
     * dashArray of the connector line.

     */
    dashArray: string;
}
/**
 * Configures the fonts in charts.
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * FontStyle for the text.

     */
    fontStyle: string;
    /**
     * Font size for the text.

     */
    size: string;
    /**
     * FontWeight for the text.

     */
    fontWeight: string;
    /**
     * Color for the text.

     */
    color: string;
    /**
     * text alignment

     */
    textAlignment: Alignment;
    /**
     * FontFamily for the text.
     */
    fontFamily: string;
    /**
     * Opacity for the text.

     */
    opacity: number;
    /**
     * Specifies the chart title text overflow

     */
    textOverflow: TextOverflow;
}
/**
 * Configures the borders in the chart.
 */
export declare class Border extends ChildProperty<Border> {
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.

     */
    color: string;
    /**
     * The width of the border in pixels.

     */
    width: number;
}
/**
 * Configures the marker position in the chart.
 */
export declare class Offset extends ChildProperty<Offset> {
    /**
     * x value of the marker position

     */
    x: number;
    /**
     * y value of the marker position

     */
    y: number;
}
/**
 * Configures the chart area.
 */
export declare class ChartArea extends ChildProperty<ChartArea> {
    /**
     * Options to customize the border of the chart area.
     */
    border: BorderModel;
    /**
     * The background of the chart area that accepts value in hex and rgba as a valid CSS color string..

     */
    background: string;
    /**
     * The opacity for background.

     */
    opacity: number;
    /**
     * The background image of the chart area that accepts value in string as url link or location of an image.

     */
    backGroundImageUrl: string;
}
/**
 * Configures the chart margins.
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
 * Configures the animation behavior for chart series.
 */
export declare class Animation extends ChildProperty<Animation> {
    /**
     * If set to true, series gets animated on initial loading.

     */
    enable: boolean;
    /**
     * The duration of animation in milliseconds.

     */
    duration: number;
    /**
     * The option to delay animation of the series.

     */
    delay: number;
}
/**
 * Series and point index
 * @public
 */
export declare class Indexes extends ChildProperty<Indexes> {
    /**
     * Specifies the series index


     */
    series: number;
    /**
     * Specifies the point index


     */
    point: number;
}
/**
 * Column series rounded corner options
 */
export declare class CornerRadius extends ChildProperty<CornerRadius> {
    /**
     * Specifies the top left corner radius value

     */
    topLeft: number;
    /**
     * Specifies the top right corner radius value

     */
    topRight: number;
    /**
     * Specifies the bottom left corner radius value

     */
    bottomLeft: number;
    /**
     * Specifies the bottom right corner radius value

     */
    bottomRight: number;
}
/**
 * @private
 */
export declare class Index {
    series: number;
    point: number;
    constructor(seriesIndex: number, pointIndex?: number);
}
/**
 * Configures the Empty Points of series
 */
export declare class EmptyPointSettings extends ChildProperty<EmptyPointSettings> {
    /**
     * To customize the fill color of empty points.

     */
    fill: string;
    /**
     * Options to customize the border of empty points.

     */
    border: BorderModel;
    /**
     * To customize the mode of empty points.

     */
    mode: EmptyPointMode | AccEmptyPointMode;
}
/**
 * Configures the drag settings of series
 */
export declare class DragSettings extends ChildProperty<DragSettings> {
    /**
     * To enable the drag the points

     */
    enable: boolean;
    /**
     * To set the minimum y of the point

     */
    minY: number;
    /**
     * To set the maximum y of the point

     */
    maxY: number;
    /**
     * To set the color of the edited point

     */
    fill: string;
}
/**
 * Configures the ToolTips in the chart.
 * @public
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Enables / Disables the visibility of the tooltip.

     */
    enable: boolean;
    /**
     * Enables / Disables the visibility of the marker.

     */
    enableMarker: boolean;
    /**
     * If set to true, a single ToolTip will be displayed for every index.

     */
    shared: boolean;
    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string.

     */
    fill: string;
    /**
     * Header for tooltip.

     */
    header: string;
    /**
     * The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string.

     */
    opacity: number;
    /**
     * Options to customize the ToolTip text.
     */
    textStyle: FontModel;
    /**
     * Format the ToolTip content.

     */
    format: string;
    /**
     * Custom template to format the ToolTip content. Use ${x} and ${y} as the placeholder text to display the corresponding data point.

     */
    template: string;
    /**
     * If set to true, ToolTip will animate while moving from one point to another.

     */
    enableAnimation: boolean;
    /**
     * Duration for the ToolTip animation.

     */
    duration: number;
    /**
     * Fade Out duration for the ToolTip hide.

     */
    fadeOutDuration: number;
    /**
     * Options to customize tooltip borders.
     */
    border: BorderModel;
}
/**
 * button settings in period selector
 */
export declare class Periods extends ChildProperty<Periods> {
    /**
     * IntervalType of button

     */
    intervalType: RangeIntervalType;
    /**
     * Count value for the button

     */
    interval: number;
    /**
     * Text to be displayed on the button

     */
    text: string;
    /**
     * To select the default period

     */
    selected: boolean;
}
/**
 * Period Selector Settings
 */
export declare class PeriodSelectorSettings extends ChildProperty<PeriodSelectorSettings> {
    /**
     * Height for the period selector

     */
    height: number;
    /**
     * vertical position of the period selector

     */
    position: PeriodSelectorPosition;
    /**
     * Buttons
     */
    periods: PeriodsModel[];
}
