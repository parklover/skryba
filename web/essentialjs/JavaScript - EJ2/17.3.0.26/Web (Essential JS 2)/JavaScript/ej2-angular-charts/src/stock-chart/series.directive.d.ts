import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Series Directive
 * ```html
 * <e-stockchart-series-collection>
 * <e-stockchart-series></e-stockchart-series>
 * </e-stockchart-series-collection>
 * ```
 */
export declare class StockChartSeriesDirective extends ComplexBase<StockChartSeriesDirective> {
    private viewContainerRef;
    childTrendlines: any;
    tags: string[];
    /**
     * The type of the series are
     * * Line
     * * Column
     * * Area
     * * Spline
     * * Hilo
     * * HiloOpenClose
     * * Candle

     */
    type: any;
    /**
     * Options to customizing animation for the series.
     */
    animation: any;
    /**
     * This property is used in stock charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is less than the closing price.

     */
    bearFillColor: any;
    /**
     * Options to customizing the border of the series. This is applicable only for `Column` and `Bar` type series.
     */
    border: any;
    /**
     * This property is used in financial charts to visualize the price movements in stock.
     * It defines the color of the candle/point, when the opening price is higher than the closing price.

     */
    bullFillColor: any;
    /**
     * It defines tension of cardinal spline types

     */
    cardinalSplineTension: any;
    /**
     * The DataSource field that contains the close value of y
     * It is applicable for series and technical indicators

     */
    close: any;
    /**
     * To render the column series points with particular column spacing. It takes value from 0 - 1.

     */
    columnSpacing: any;
    /**
     * To render the column series points with particular column width. If the series type is histogram the
     * default value is 1 otherwise 0.7.


     */
    columnWidth: any;
    /**
     * To render the column series points with particular rounded corner.
     */
    cornerRadius: any;
    /**
     * Defines the pattern of dashes and gaps to stroke the lines in `Line` type series.

     */
    dashArray: any;
    /**
     * Specifies the DataSource for the series. It can be an array of JSON objects or an instance of DataManager.

     */
    dataSource: any;
    /**
     * options to customize the empty points in series
     */
    emptyPointSettings: any;
    /**
     * This property is applicable for candle series.
     * It enables/disables to visually compare the current values with the previous values in stock.

     */
    enableSolidCandles: any;
    /**
     * If set true, the Tooltip for series will be visible.

     */
    enableTooltip: any;
    /**
     * The fill color for the series that accepts value in hex and rgba as a valid CSS color string.
     * It also represents the color of the signal lines in technical indicators.
     * For technical indicators, the default value is 'blue' and for series, it has null.

     */
    fill: any;
    /**
     * The DataSource field that contains the high value of y
     * It is applicable for series and technical indicators

     */
    high: any;
    /**
     * The DataSource field that contains the low value of y
     * It is applicable for series and technical indicators

     */
    low: any;
    /**
     * Options for displaying and customizing markers for individual points in a series.
     */
    marker: any;
    /**
     * The name of the series visible in legend.

     */
    name: any;
    /**
     * The opacity of the series.

     */
    opacity: any;
    /**
     * The DataSource field that contains the open value of y
     * It is applicable for series and technical indicators

     */
    open: any;
    /**
     * The DataSource field that contains the color value of point
     * It is applicable for series

     */
    pointColorMapping: any;
    /**
     * Specifies query to select data from DataSource. This property is applicable only when the DataSource is `ej.DataManager`.

     */
    query: any;
    /**
     * Custom style for the selected series or points.

     */
    selectionStyle: any;
    /**
     * The provided value will be considered as a Tooltip name

     */
    tooltipMappingName: any;
    /**
     * Defines the collection of trendlines that are used to predict the trend
     */
    trendlines: any;
    /**
     * Specifies the visibility of series.

     */
    visible: any;
    /**
     * Defines the data source field that contains the volume value in candle charts
     * It is applicable for financial series and technical indicators

     */
    volume: any;
    /**
     * The stroke width for the series that is applicable only for `Line` type series.
     * It also represents the stroke width of the signal lines in technical indicators.

     */
    width: any;
    /**
     * The name of the horizontal axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators

     */
    xAxisName: any;
    /**
     * The DataSource field that contains the x value.
     * It is applicable for series and technical indicators

     */
    xName: any;
    /**
     * The name of the vertical axis associated with the series. It requires `axes` of the chart.
     * It is applicable for series and technical indicators

     */
    yAxisName: any;
    /**
     * The DataSource field that contains the y value.

     */
    yName: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockChartSeries Array Directive
 * @private
 */
export declare class StockChartSeriesCollectionDirective extends ArrayBase<StockChartSeriesCollectionDirective> {
    constructor();
}
