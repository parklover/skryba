import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Layer Directive
 * ```html
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * ```
 */
export declare class NavigationLineDirective extends ComplexBase<NavigationLineDirective> {
    private viewContainerRef;
    /**
     * Specifies the angle of curve connecting different locations in map

     */
    angle: any;
    /**
     * arrow
     */
    arrowSettings: any;
    /**
     * NavigationSelectedLine color
     */
    color: any;
    /**
     * dashArray

     */
    dashArray: any;
    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings: any;
    /**
     * NavigationSelectedLine latitude

     */
    latitude: any;
    /**
     * NavigationSelectedLine longitude

     */
    longitude: any;
    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings: any;
    /**
     * NavigationSelectedLine visible

     */
    visible: any;
    /**
     * Configures the label border

     */
    width: any;
    tooltipSettings_template: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * NavigationLine Array Directive
 * @private
 */
export declare class NavigationLinesDirective extends ArrayBase<NavigationLinesDirective> {
    constructor();
}
