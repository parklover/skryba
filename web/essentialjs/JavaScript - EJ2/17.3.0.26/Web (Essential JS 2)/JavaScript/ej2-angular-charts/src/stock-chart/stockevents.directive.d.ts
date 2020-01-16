import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * StockEvents
 * ```html
 * <e-stockchart-stockevents>
 * <e-stockchart-stockevent></e-stockchart-stockevent>
 * </e-stockchart-stockevents>
 * ```
 */
export declare class StockEventDirective extends ComplexBase<StockEventDirective> {
    private viewContainerRef;
    /**
     * Specifies type of stock events
     * * Circle
     * * Square
     * * Flag
     * * Text
     * * Sign
     * * Triangle
     * * InvertedTriangle
     * * ArrowUp
     * * ArrowDown
     * * ArrowLeft
     * * ArrowRight

     */
    type: any;
    /**
     * The background of the stock event that accepts value in hex and rgba as a valid CSS color string.

     */
    background: any;
    /**
     * Options to customize the border of the stock events.
     */
    border: any;
    /**
     * Date value of stock event in which stock event shows.
     */
    date: any;
    /**
     * Specifies the description for the chart which renders in tooltip for stock event.
     */
    description: any;
    /**
     * Corresponding values in which stock event placed.
     * * Close
     * * Open
     * * High
     * * Close

     */
    placeAt: any;
    /**
     * Enables the stock events to be render on series. If it disabled, stock event rendered on primaryXAxis.

     */
    showOnSeries: any;
    /**
     * Specifies the text for the stock chart text.
     */
    text: any;
    /**
     * Options to customize the styles for stock events text.
     */
    textStyle: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockEvent Array Directive
 * @private
 */
export declare class StockEventsDirective extends ArrayBase<StockEventsDirective> {
    constructor();
}
