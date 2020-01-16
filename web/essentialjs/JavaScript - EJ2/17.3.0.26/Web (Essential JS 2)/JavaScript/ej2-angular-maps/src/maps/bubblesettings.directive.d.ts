import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Layer Directive
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class BubbleDirective extends ComplexBase<BubbleDirective> {
    private viewContainerRef;
    childColorMapping: any;
    tags: string[];
    /**
     * Animation duration

     */
    animationDelay: any;
    /**
     * To configure bubble animation duration

     */
    animationDuration: any;
    /**
     * Configures the bubble border
     */
    border: any;
    /**
     * To configure bubble shape type

     */
    bubbleType: any;
    /**
     * To configure bubble colorMapping

     */
    colorMapping: any;
    /**
     * To configure bubble colorValuePath

     */
    colorValuePath: any;
    /**
     * Specifies the data source for bubble.



     */
    dataSource: any;
    /**
     * To configure bubble fill color

     */
    fill: any;
    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings: any;
    /**
     * To configure bubble maxRadius

     */
    maxRadius: any;
    /**
     * To configure bubble minRadius

     */
    minRadius: any;
    /**
     * To configure bubble opacity

     */
    opacity: any;
    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings: any;
    /**
     * To configure the tooltip settings of the bubble .
     */
    tooltipSettings: any;
    /**
     * To configure bubble valuePath

     */
    valuePath: any;
    /**
     * Toggle the visibility of bubble

     */
    visible: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Bubble Array Directive
 * @private
 */
export declare class BubblesDirective extends ArrayBase<BubblesDirective> {
    constructor();
}
