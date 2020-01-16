import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Layers Directive
 * ```html
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * ```
 */
export declare class LayerDirective extends ComplexBase<LayerDirective> {
    private viewContainerRef;
    /**
     * Defines the description of the layer
     *



     */
    addInfo: any;
    /**
     * Defines the id of a diagram layer

     */
    id: any;
    /**
     * Enables or disables editing objects in a particular layer

     */
    lock: any;
    /**
     * Defines the collection of the objects that are added to a particular layer



     */
    objects: any;
    /**
     * Enables or disables the visibility of objects in a particular layer

     */
    visible: any;
    /**
     * Defines the zOrder of the layer

     */
    zIndex: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Layer Array Directive
 * @private
 */
export declare class LayersDirective extends ArrayBase<LayersDirective> {
    constructor();
}
