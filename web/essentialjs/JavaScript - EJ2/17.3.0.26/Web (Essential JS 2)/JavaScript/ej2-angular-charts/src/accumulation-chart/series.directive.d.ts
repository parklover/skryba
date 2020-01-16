import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * AccumulationSeries Directive
 * ```html
 * <e-accumulation-series-collection>
 * <e-accumulation-series></e-accumulation-series>
 * </e-accumulation-series-collection>
 * ```
 */
export declare class AccumulationSeriesDirective extends ComplexBase<AccumulationSeriesDirective> {
    private viewContainerRef;
    /**
     * Specify the type of the series in accumulation chart.

     */
    type: any;
    /**
     * Options for customizing the animation for series.
     */
    animation: any;
    /**
     * Options for customizing the border of the series.
     */
    border: any;
    /**
     * The data label for the series.
     */
    dataLabel: any;
    /**
     * Specifies the dataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     *

     */
    dataSource: any;
    /**
     * options to customize the empty points in series
     */
    emptyPointSettings: any;
    /**
     * To enable or disable tooltip for a series.

     */
    enableTooltip: any;
    /**
     * End angle for a series.

     */
    endAngle: any;
    /**
     * If set true, series points will be exploded on mouse click or touch.

     */
    explode: any;
    /**
     * If set true, all the points in the series will get exploded on load.

     */
    explodeAll: any;
    /**
     * Index of the point, to be exploded on load.


     */
    explodeIndex: any;
    /**
     * Distance of the point from the center, which takes values in both pixels and percentage.

     */
    explodeOffset: any;
    /**
     * Defines the distance between the segments of a funnel/pyramid series. The range will be from 0 to 1

     */
    gapRatio: any;
    /**
     * AccumulationSeries y values less than groupMode are combined into single slice named others

     */
    groupMode: any;
    /**
     * AccumulationSeries y values less than groupTo are combined into single slice named others

     */
    groupTo: any;
    /**
     * Defines the height of the funnel/pyramid with respect to the chart area

     */
    height: any;
    /**
     * When the innerRadius value is greater than 0 percentage, a donut will appear in pie series. It takes values only in percentage.

     */
    innerRadius: any;
    /**
     * The shape of the legend. Each series has its own legend shape. They are
     * * Circle - Renders a circle.
     * * Rectangle - Renders a rectangle.
     * * Triangle - Renders a triangle.
     * * Diamond - Renders a diamond.
     * * Cross - Renders a cross.
     * * HorizontalLine - Renders a horizontalLine.
     * * VerticalLine - Renders a verticalLine.
     * * Pentagon - Renders a pentagon.
     * * InvertedTriangle - Renders a invertedTriangle.
     * * SeriesType -Render a legend shape based on series type.

     */
    legendShape: any;
    /**
     * Specifies the series name

     */
    name: any;
    /**
     * Defines the height of the funnel neck with respect to the chart area

     */
    neckHeight: any;
    /**
     * Defines the width of the funnel neck with respect to the chart area

     */
    neckWidth: any;
    /**
     * The opacity of the series.

     */
    opacity: any;
    /**
     * Palette for series points.

     */
    palettes: any;
    /**
     * The DataSource field that contains the color value of point
     * It is applicable for series

     */
    pointColorMapping: any;
    /**
     * Defines how the values have to be reflected, whether through height/surface of the segments

     */
    pyramidMode: any;
    /**
     * Specifies Query to select data from dataSource. This property is applicable only when the dataSource is `ej.DataManager`.

     */
    query: any;
    /**
     * Radius of the pie series and its values in percentage.

     */
    radius: any;
    /**
     * Custom style for the selected series or points.

     */
    selectionStyle: any;
    /**
     * Start angle for a series.

     */
    startAngle: any;
    /**
     * The provided value will be considered as a Tooltip Mapping name

     */
    tooltipMappingName: any;
    /**
     * Specifies the series visibility.

     */
    visible: any;
    /**
     * Defines the width of the funnel/pyramid with respect to the chart area

     */
    width: any;
    /**
     * The DataSource field which contains the x value.

     */
    xName: any;
    /**
     * The DataSource field which contains the y value.

     */
    yName: any;
    dataLabel_template: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * AccumulationSeries Array Directive
 * @private
 */
export declare class AccumulationSeriesCollectionDirective extends ArrayBase<AccumulationSeriesCollectionDirective> {
    constructor();
}
