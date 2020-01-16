import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Layer Directive
 * ```html
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * ```
 */
export declare class LayerDirective extends ComplexBase<LayerDirective> {
    private viewContainerRef;
    childMarkerSettings: any;
    childBubbleSettings: any;
    childNavigationLineSettings: any;
    tags: string[];
    /**
     * Specifies the type for the layer.

     */
    type: any;
    /**
     * Specifies the animation duration for the layer.

     */
    animationDuration: any;
    /**
     * Specifies the type for the bing map.

     */
    bingMapType: any;
    /**
     * To configure the bubble settings of the maps.
     */
    bubbleSettings: any;
    /**
     * To configure the datalabel settings of the maps.
     */
    dataLabelSettings: any;
    /**
     * Specifies the data source for the layer.



     */
    dataSource: any;
    /**
     * Specifies the geometry type

     */
    geometryType: any;
    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings: any;
    /**
     * Specifies the key for the layer.

     */
    key: any;
    /**
     * Specifies the layerType for the layer.

     */
    layerType: any;
    /**
     * To configure the cluster settings.
     */
    markerClusterSettings: any;
    /**
     * To configure the marker settings.
     */
    markerSettings: any;
    /**
     * navigationLineSetting
     */
    navigationLineSettings: any;
    /**
     * Specifies the query to select particular data from the shape data.
     * This property is applicable only when the DataSource is `ej.DataManager`.

     */
    query: any;
    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings: any;
    /**
     * Specifies the shape data for the layer.


     */
    shapeData: any;
    /**
     * Specifies the shapeDataPath for the layer.

     */
    shapeDataPath: any;
    /**
     * Specifies the shapePropertyPath for the layer.

     */
    shapePropertyPath: any;
    /**
     * Specifies the shape properties
     */
    shapeSettings: any;
    /**
     * To configure the legend toggle settings.
     */
    toggleLegendSettings: any;
    /**
     * To configure the tooltip settings of the maps layer.
     */
    tooltipSettings: any;
    /**
     * Specifies the urlTemplate for the layer.

     */
    urlTemplate: any;
    /**
     * Toggle the visibility of the layers.

     */
    visible: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Layer Array Directive
 * @private
 */
export declare class LayersDirective extends ArrayBase<LayersDirective> {
    constructor();
}
