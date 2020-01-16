import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Layer Directive
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-markerSettings>
 * <e-markerSetting>
 * </e-markerSetting>
 * </e-markerSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class MarkerDirective extends ComplexBase<MarkerDirective> {
    private viewContainerRef;
    /**
     * Animation delay time

     */
    animationDelay: any;
    /**
     * Animation duration time

     */
    animationDuration: any;
    /**
     * Options for customizing the color and width of the marker.
     */
    border: any;
    /**
     * Options for customizing the dash array options
     */
    dashArray: any;
    /**
     * To configure the dataSource of the marker.



     */
    dataSource: any;
    /**
     * To customize the fill color of the marker.

     */
    fill: any;
    /**
     * To customize the height of the marker.

     */
    height: any;
    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings: any;
    /**
     * To provide the image url for rendering marker image
     */
    imageUrl: any;
    /**
     * To provide the dataSource field to display legend text

     */
    legendText: any;
    /**
     * To move the marker by setting offset values
     */
    offset: any;
    /**
     * To customize the opacity of the marker.

     */
    opacity: any;
    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings: any;
    /**
     * To customize the shape of the marker.

     */
    shape: any;
    /**
     * To configure the tooltip settings of the maps marker.
     */
    tooltipSettings: any;
    /**
     * Toggle the visibility of the marker.

     */
    visible: any;
    /**
     * To customize the width of the marker.

     */
    width: any;
    /**
     * To customize the template of the marker.

     */
    template: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Marker Array Directive
 * @private
 */
export declare class MarkersDirective extends ArrayBase<MarkersDirective> {
    constructor();
}
