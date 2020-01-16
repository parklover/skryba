import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export declare class StockChartSelectedDataIndexDirective extends ComplexBase<StockChartSelectedDataIndexDirective> {
    private viewContainerRef;
    /**
     * Specifies index of point


     */
    point: any;
    /**
     * Specifies index of series


     */
    series: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockChartSelectedDataIndex Array Directive
 * @private
 */
export declare class StockChartSelectedDataIndexesDirective extends ArrayBase<StockChartSelectedDataIndexesDirective> {
    constructor();
}
