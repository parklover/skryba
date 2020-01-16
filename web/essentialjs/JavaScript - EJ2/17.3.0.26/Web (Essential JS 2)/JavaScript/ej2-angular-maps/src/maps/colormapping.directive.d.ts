import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * ColorMapping Directive
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-colorMappings>
 * <e-colorMapping>
 * </e-colorMapping>
 * </e-colorMappings>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class ColorMappingDirective extends ComplexBase<ColorMappingDirective> {
    private viewContainerRef;
    /**
     * To configure color

     */
    color: any;
    /**
     * To configure from



     */
    from: any;
    /**
     * To configure labels

     */
    label: any;
    /**
     * To configure max opacity

     */
    maxOpacity: any;
    /**
     * To configure min opacity

     */
    minOpacity: any;
    /**
     * To enable or disable the legend

     */
    showLegend: any;
    /**
     * To configure to



     */
    to: any;
    /**
     * To configure value

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
