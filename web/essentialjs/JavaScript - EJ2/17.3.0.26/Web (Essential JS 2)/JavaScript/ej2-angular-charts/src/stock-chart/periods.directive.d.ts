import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Indicator Directive
 * ```html
 * <e-stockchart-periods>
 * <e-stockchart-period></e-stockchart-period>
 * </e-stockchart-periods>
 * ```
 */
export declare class StockChartPeriodDirective extends ComplexBase<StockChartPeriodDirective> {
    private viewContainerRef;
    /**
     * Count value for the button

     */
    interval: any;
    /**
     * IntervalType of button

     */
    intervalType: any;
    /**
     * To select the default period

     */
    selected: any;
    /**
     * Text to be displayed on the button

     */
    text: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockChartPeriod Array Directive
 * @private
 */
export declare class StockChartPeriodsDirective extends ArrayBase<StockChartPeriodsDirective> {
    constructor();
}
