import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Series Directive
 * ```html
 * <e-series-collection>
 * <e-series>
 * <e-trendlines>
 * <e-trendline>
 * </e-trendline>
 * </e-trendlines>
 * </e-series-collection>
 * ```
 */
export declare class TrendlineDirective extends ComplexBase<TrendlineDirective> {
    private viewContainerRef;
    /**
     * Defines the type of the trendline

     */
    type: any;
    /**
     * Options to customize the animation for trendlines
     */
    animation: any;
    /**
     * Defines the period, by which the trend has to backward forecast

     */
    backwardForecast: any;
    /**
     * Defines the pattern of dashes and gaps to stroke.

     */
    dashArray: any;
    /**
     * Enables/disables tooltip for trendlines

     */
    enableTooltip: any;
    /**
     * Defines the fill color of trendline

     */
    fill: any;
    /**
     * Defines the period, by which the trend has to forward forecast

     */
    forwardForecast: any;
    /**
     * Defines the intercept of the trendline


     */
    intercept: any;
    /**
     * Sets the legend shape of the trendline

     */
    legendShape: any;
    /**
     * Options to customize the marker for trendlines

     */
    marker: any;
    /**
     * Defines the name of trendline

     */
    name: any;
    /**
     * Defines the period, the price changes over which will be considered to predict moving average trend line

     */
    period: any;
    /**
     * Defines the polynomial order of the polynomial trendline

     */
    polynomialOrder: any;
    /**
     * Specifies the visibility of trendline.

     */
    visible: any;
    /**
     * Defines the width of the trendline

     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Trendline Array Directive
 * @private
 */
export declare class TrendlinesDirective extends ArrayBase<TrendlinesDirective> {
    constructor();
}
