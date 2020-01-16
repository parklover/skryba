import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * RangenavigatorSeries Directive
 * ```html
 * <e-rangenavigator-series-collection>
 * <e-rangenavigator-series></e-rangenavigator-series>
 * </e-rangenavigator-series-collection>
 * ```
 */
export declare class RangenavigatorSeriesDirective extends ComplexBase<RangenavigatorSeriesDirective> {
    private viewContainerRef;
    /**
     * It defines the series type of the range navigator

     */
    type: any;
    /**
     * Options to customizing animation for the series.
     */
    animation: any;
    /**
     * Options for customizing the color and width of the series border.
     */
    border: any;
    /**
     * Defines the pattern of dashes and gaps to stroke the lines in `Line` type series.

     */
    dashArray: any;
    /**
     * It defines the data source for a series.

     */
    dataSource: any;
    /**
     * The fill color for the series that accepts value in hex and rgba as a valid CSS color string.
     * It also represents the color of the signal lines in technical indicators.
     * For technical indicators, the default value is 'blue' and for series, it has null.

     */
    fill: any;
    /**
     * The opacity for the background.

     */
    opacity: any;
    /**
     * It defines the query for the data source

     */
    query: any;
    /**
     * The stroke width for the series that is applicable only for `Line` type series.
     * It also represents the stroke width of the signal lines in technical indicators.

     */
    width: any;
    /**
     * It defines the xName for the series

     */
    xName: any;
    /**
     * It defines the yName for the series

     */
    yName: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * RangenavigatorSeries Array Directive
 * @private
 */
export declare class RangenavigatorSeriesCollectionDirective extends ArrayBase<RangenavigatorSeriesCollectionDirective> {
    constructor();
}
