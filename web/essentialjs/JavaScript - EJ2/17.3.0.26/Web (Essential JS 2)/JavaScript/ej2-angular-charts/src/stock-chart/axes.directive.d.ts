import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Axis Directive
 * ```html
 * <e-stockchart-axes><e-stockchart-axis></e-stockchart-axis></e-stockchart-axes>
 * ```
 */
export declare class StockChartAxisDirective extends ComplexBase<StockChartAxisDirective> {
    private viewContainerRef;
    childStripLines: any;
    tags: string[];
    /**
     * The polar radar radius position.

     */
    coefficient: any;
    /**
     * Specifies the value at which the axis line has to be intersect with the vertical axis or vice versa.

     */
    crossesAt: any;
    /**
     * Specifies axis name with which the axis line has to be crossed

     */
    crossesInAxis: any;
    /**
     * Options to customize the crosshair ToolTip.
     */
    crosshairTooltip: any;
    /**
     * Description for axis and its element.

     */
    description: any;
    /**
     * With this property, you can request axis to calculate intervals approximately equal to your specified interval.


     */
    desiredIntervals: any;
    /**
     * Specifies the position of labels at the edge of the axis.They are,
     * * None: No action will be performed.
     * * Hide: Edge label will be hidden.
     * * Shift: Shifts the edge labels.

     */
    edgeLabelPlacement: any;
    /**
     * If set to true, axis interval will be calculated automatically with respect to the zoomed range.

     */
    enableAutoIntervalOnZooming: any;
    /**
     * Specifies the Trim property for an axis.

     */
    enableTrim: any;
    /**
     * Specifies the interval for an axis.


     */
    interval: any;
    /**
     * Specifies the types like `Years`, `Months`, `Days`, `Hours`, `Minutes`, `Seconds` in date time axis.They are,
     * * Auto: Defines the interval of the axis based on data.
     * * Years: Defines the interval of the axis in years.
     * * Months: Defines the interval of the axis in months.
     * * Days: Defines the interval of the axis in days.
     * * Hours: Defines the interval of the axis in hours.
     * * Minutes: Defines the interval of the axis in minutes.

     */
    intervalType: any;
    /**
     * It specifies whether the axis to be rendered in inversed manner or not.

     */
    isInversed: any;
    /**
     * Used to format the axis label that accepts any global string format like 'C', 'n1', 'P' etc.
     * It also accepts placeholder like '{value}°C' in which value represent the axis label, e.g, 20°C.

     */
    labelFormat: any;
    /**
     * Specifies the actions like `Hide`, `Rotate45`, and `Rotate90` when the axis labels intersect with each other.They are,
     * * None: Shows all the labels.
     * * Hide: Hides the label when it intersects.
     * * Rotate45: Rotates the label to 45 degree when it intersects.
     * * Rotate90: Rotates the label to 90 degree when it intersects.

     */
    labelIntersectAction: any;
    /**
     * Specifies the placement of a label for category axis. They are,
     * * betweenTicks: Renders the label between the ticks.
     * * onTicks: Renders the label on the ticks.

     */
    labelPlacement: any;
    /**
     * Specifies the placement of a labels to the axis line. They are,
     * * inside: Renders the labels inside to the axis line.
     * * outside: Renders the labels outside to the axis line.

     */
    labelPosition: any;
    /**
     * The angle to which the axis label gets rotated.

     */
    labelRotation: any;
    /**
     * Options to customize the axis label.
     */
    labelStyle: any;
    /**
     * Options for customizing axis lines.
     */
    lineStyle: any;
    /**
     * The base value for logarithmic axis. It requires `valueType` to be `Logarithmic`.

     */
    logBase: any;
    /**
     * Options for customizing major grid lines.
     */
    majorGridLines: any;
    /**
     * Options for customizing major tick lines.
     */
    majorTickLines: any;
    /**
     * Specifies the maximum range of an axis.

     */
    maximum: any;
    /**
     * Specifies the maximum width of an axis label.

     */
    maximumLabelWidth: any;
    /**
     * The maximum number of label count per 100 pixels with respect to the axis length.

     */
    maximumLabels: any;
    /**
     * Specifies the minimum range of an axis.

     */
    minimum: any;
    /**
     * Options for customizing minor grid lines.
     */
    minorGridLines: any;
    /**
     * Options for customizing minor tick lines.
     */
    minorTickLines: any;
    /**
     * Specifies the number of minor ticks per interval.

     */
    minorTicksPerInterval: any;
    /**
     * Unique identifier of an axis.
     * To associate an axis with the series, set this name to the xAxisName/yAxisName properties of the series.

     */
    name: any;
    /**
     * If set to true, the axis will render at the opposite side of its default position.

     */
    opposedPosition: any;
    /**
     * Specifies whether axis elements like axis labels, axis title, etc has to be crossed with axis line

     */
    placeNextToAxisLine: any;
    /**
     * Left and right padding for the plot area in pixels.

     */
    plotOffset: any;
    /**
     * Specifies the padding for the axis range in terms of interval.They are,
     * * none: Padding cannot be applied to the axis.
     * * normal: Padding is applied to the axis based on the range calculation.
     * * additional: Interval of the axis is added as padding to the minimum and maximum values of the range.
     * * round: Axis range is rounded to the nearest possible value divided by the interval.

     */
    rangePadding: any;
    /**
     * Specifies the index of the row where the axis is associated, when the chart area is divided into multiple plot areas by using `rows`.
     *

     */
    rowIndex: any;
    /**
     * Specifies the skeleton format in which the dateTime format will process.

     */
    skeleton: any;
    /**
     * It specifies the type of format to be used in dateTime format process.

     */
    skeletonType: any;
    /**
     * Specifies the number of `columns` or `rows` an axis has to span horizontally or vertically.

     */
    span: any;
    /**
     * The start angle for the series.

     */
    startAngle: any;
    /**
     * Specifies the stripLine collection for the axis
     */
    stripLines: any;
    /**
     * TabIndex value for the axis.

     */
    tabIndex: any;
    /**
     * Specifies the placement of a ticks to the axis line. They are,
     * * inside: Renders the ticks inside to the axis line.
     * * outside: Renders the ticks outside to the axis line.

     */
    tickPosition: any;
    /**
     * Specifies the title of an axis.

     */
    title: any;
    /**
     * Options for customizing the axis title.
     */
    titleStyle: any;
    /**
     * Specifies the type of data the axis is handling.
     * * Double:  Renders a numeric axis.
     * * DateTime: Renders a dateTime axis.
     * * Category: Renders a category axis.
     * * Logarithmic: Renders a log axis.



     */
    valueType: any;
    /**
     * If set to true, axis label will be visible.

     */
    visible: any;
    /**
     * The axis is scaled by this factor. When zoomFactor is 0.5, the chart is scaled by 200% along this axis. Value ranges from 0 to 1.

     */
    zoomFactor: any;
    /**
     * Position of the zoomed axis. Value ranges from 0 to 1.

     */
    zoomPosition: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockChartAxis Array Directive
 * @private
 */
export declare class StockChartAxesDirective extends ArrayBase<StockChartAxesDirective> {
    constructor();
}
