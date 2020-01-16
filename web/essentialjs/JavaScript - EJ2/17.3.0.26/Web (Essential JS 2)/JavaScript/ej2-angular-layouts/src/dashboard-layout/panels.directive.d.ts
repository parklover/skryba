import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * 'e-panels' directive represent a panels of angular dashboardlayout
 * It must be contained in a dashboardlayout component(`ej-dashboardlayout`).
 * ```html
 * <ejs-dashboardlayout>
 *   <e-panels>
 *    <e-panel></e-panel>
 *    <e-panel></e-panel>
 *   </e-panels>
 * </ejs-dashboardlayout>
 * ```
 */
export declare class PanelDirective extends ComplexBase<PanelDirective> {
    private viewContainerRef;
    /**
     * Defines the column value where the panel to be placed.



     */
    col: any;
    /**
     * Defines the CSS class name that can be appended with each panel element.

     */
    cssClass: any;
    /**
     * Defines whether to the panel should be enabled or not.

     */
    enabled: any;
    /**
     * Defines the id of the panel.

     */
    id: any;
    /**
     * Specifies the maximum width of the panel in cells count.
     * *



     */
    maxSizeX: any;
    /**
     * Specifies the maximum height of the panel in cells count.
     * *




     */
    maxSizeY: any;
    /**
     * Specifies the minimum width of the panel in cells count.
     * *

     */
    minSizeX: any;
    /**
     * Specifies the minimum height of the panel in cells count.

     */
    minSizeY: any;
    /**
     * Defines a row value where the panel should be placed.



     */
    row: any;
    /**
     * Specifies the width of the panel in the layout in cells count.

     */
    sizeX: any;
    /**
     * Specifies the height of the panel in the layout in cells count.

     */
    sizeY: any;
    /**
     * Specifies the z-index of the panel
     * *



     */
    zIndex: any;
    /**
     * Defines the template value that should be displayed as the panel's header.
     */
    header: any;
    /**
     * Defines the template value that should be displayed as the panel's content.
     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Panel Array Directive
 * @private
 */
export declare class PanelsDirective extends ArrayBase<PanelsDirective> {
    constructor();
}
