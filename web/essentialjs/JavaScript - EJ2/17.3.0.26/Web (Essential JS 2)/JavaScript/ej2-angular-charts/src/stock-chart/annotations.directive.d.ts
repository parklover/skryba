import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Annotation Directive
 * ```html
 * <e-stockchart-annotations><e-stockchart-annotation></e-stockchart-annotation><e-stockchart-annotations>
 * ```
 */
export declare class StockChartAnnotationDirective extends ComplexBase<StockChartAnnotationDirective> {
    private viewContainerRef;
    /**
     * Specifies the coordinate units of the annotation. They are
     * * Pixel - Annotation renders based on x and y pixel value.
     * * Point - Annotation renders based on x and y axis value.

     */
    coordinateUnits: any;
    /**
     * Information about annotation for assistive technology.

     */
    description: any;
    /**
     * Specifies the alignment of the annotation. They are
     * * Near - Align the annotation element as left side.
     * * Far - Align the annotation element as right side.
     * * Center - Align the annotation element as mid point.

     */
    horizontalAlignment: any;
    /**
     * Specifies the regions of the annotation. They are
     * * Chart - Annotation renders based on chart coordinates.
     * * Series - Annotation renders based on series coordinates.

     */
    region: any;
    /**
     * Specifies the position of the annotation. They are
     * * Top - Align the annotation element as top side.
     * * Bottom - Align the annotation element as bottom side.
     * * Middle - Align the annotation element as mid point.

     */
    verticalAlignment: any;
    /**
     * if set coordinateUnit as `Pixel` X specifies the axis value
     * else is specifies pixel or percentage of coordinate

     */
    x: any;
    /**
     * The name of horizontal axis associated with the annotation.
     * It requires `axes` of chart.

     */
    xAxisName: any;
    /**
     * if set coordinateUnit as `Pixel` Y specifies the axis value
     * else is specifies pixel or percentage of coordinate

     */
    y: any;
    /**
     * The name of vertical axis associated with the annotation.
     * It requires `axes` of chart.

     */
    yAxisName: any;
    /**
     * Content of the annotation, which accepts the id of the custom element.

     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * StockChartAnnotation Array Directive
 * @private
 */
export declare class StockChartAnnotationsDirective extends ArrayBase<StockChartAnnotationsDirective> {
    constructor();
}
