import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
export declare class ColorMappingDirective extends ComplexBase<ColorMappingDirective> {
    private viewContainerRef;
    /**
     * specifies the color

     */
    color: any;
    /**
     * Specifies the from


     */
    from: any;
    /**
     * Specifies the label text.

     */
    label: any;
    /**
     * maxOpacity

     */
    maxOpacity: any;
    /**
     * Specifies the minOpacity

     */
    minOpacity: any;
    /**
     * Specifies the visibility of the legend for color mapping

     */
    showLegend: any;
    /**
     * Specifies the to


     */
    to: any;
    /**
     * Specifies the value

     */
    value: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * ColorMapping Array Directive
 * @private
 */
export declare class ColorMappingsDirective extends ArrayBase<ColorMappingsDirective> {
    constructor();
}
