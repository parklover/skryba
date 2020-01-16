import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Indicator Directive
 * ```html
 * <e-indicators>
 * <e-indicator></e-indicator>
 * </e-indicators>
 * ```
 */
export declare class IndicatorDirective extends ComplexBase<IndicatorDirective> {
    private viewContainerRef;
    /**
     * Defines the type of the technical indicator

     */
    type: any;
    /**
     * Options to customizing animation for the series.
     */
    animation: any;
    /**
     * Options for customizing the BollingerBand in the indicator.

     */
    bandColor: any;
    /**
     * The DataSource field that contains the close value of y
     * It is applicable for series and technical indicators

     */
    close: any;
    /**
     * Defines the period, the price changes over which will define the %D value in stochastic indicators

     */
    dPeriod: any;
    /**
     * Defines the pattern of dashes and gaps to stroke the lines in `Line` type series.

     */
    dashArray: any;
    /**
     * Specifies the DataSource for the series. It can be an array of JSON objects or an instance of DataManager.
     *

     */
    dataSource: any;
    /**
     * This property used to improve chart performance via data mapping for series dataSource.

     */
    enableComplexProperty: any;
    /**
     * Sets the fast period to define the Macd line

     */
    fastPeriod: any;
    /**
     * Defines the field to compare the current value with previous values

     */
    field: any;
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
     * Defines the look back period, the price changes over which will define the %K value in stochastic indicators

     */
    kPeriod: any;
    /**
     * The DataSource field that contains the low value of y
     * It is applicable for series and technical indicators

     */
    low: any;
    /**
     * Defines the appearance of lower line in technical indicators
     */
    lowerLine: any;
    /**
     * Defines the appearance of the the MacdLine of Macd indicator

     */
    macdLine: any;
    /**
     * Defines the color of the negative bars in Macd indicators

     */
    macdNegativeColor: any;
    /**
     * Defines the color of the positive bars in Macd indicators

     */
    macdPositiveColor: any;
    /**
     * Defines the type of the Macd indicator.

     */
    macdType: any;
    /**
     * The DataSource field that contains the open value of y
     * It is applicable for series and technical indicators

     */
    open: any;
    /**
     * Defines the over-bought(threshold) values. It is applicable for RSI and stochastic indicators

     */
    overBought: any;
    /**
     * Defines the over-sold(threshold) values. It is applicable for RSI and stochastic indicators

     */
    overSold: any;
    /**
     * Defines the period, the price changes over which will be considered to predict the trend

     */
    period: any;
    /**
     * Defines the appearance of period line in technical indicators
     */
    periodLine: any;
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
     * Defines the axis, based on which the line series will be split.
     */
    segmentAxis: any;
    /**
     * Defines the collection of regions that helps to differentiate a line series.
     */
    segments: any;
    /**
     * Defines the name of the series, the data of which has to be depicted as indicator

     */
    seriesName: any;
    /**
     * Enables/Disables the over-bought and over-sold regions

     */
    showZones: any;
    /**
     * Sets the slow period to define the Macd line

     */
    slowPeriod: any;
    /**
     * Sets the standard deviation values that helps to define the upper and lower bollinger bands

     */
    standardDeviation: any;
    /**
     * Defines the appearance of the upper line in technical indicators
     */
    upperLine: any;
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
     *

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
     *

     */
    yAxisName: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Indicator Array Directive
 * @private
 */
export declare class IndicatorsDirective extends ArrayBase<IndicatorsDirective> {
    constructor();
}
