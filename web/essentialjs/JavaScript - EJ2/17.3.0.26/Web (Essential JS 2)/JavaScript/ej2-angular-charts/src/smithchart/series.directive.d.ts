import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
export declare class SmithchartSeriesDirective extends ComplexBase<SmithchartSeriesDirective> {
    private viewContainerRef;
    /**
     * perform animation of series based on animation duration.

     */
    animationDuration: any;
    /**
     *  Specifies the dataSource


     */
    dataSource: any;
    /**
     * enable or disable the animation of series.

     */
    enableAnimation: any;
    /**
     * avoid the overlap of dataLabels.

     */
    enableSmartLabels: any;
    /**
     * color for series.

     */
    fill: any;
    /**
     *  options for customizing marker
     */
    marker: any;
    /**
     * The name of the series visible in legend.

     */
    name: any;
    /**
     * opacity for series.

     */
    opacity: any;
    /**
     * points for series.

     */
    points: any;
    /**
     * reactance name for dataSource

     */
    reactance: any;
    /**
     * resistance name for dataSource

     */
    resistance: any;
    /**
     *  options for customizing tooltip
     */
    tooltip: any;
    /**
     * visibility for series.

     */
    visibility: any;
    /**
     * width for series.

     */
    width: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * SmithchartSeries Array Directive
 * @private
 */
export declare class SmithchartSeriesCollectionDirective extends ArrayBase<SmithchartSeriesCollectionDirective> {
    constructor();
}
