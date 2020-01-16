import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * 'e-panesettings' directive represent a panes of angular splitter
 * It must be contained in a Splitter component(`ejs-splitter`).
 * ```html
 * <ejs-splitter id='splitter' >
 *   <e-panes>
 *    <e-pane size ='150px'></e-pane>
 *    <e-pane size = '20%'></e-pane>
 *   </e-panes>
 * </ejs-splitter>
 * ```
 */
export declare class PaneDirective extends ComplexBase<PaneDirective> {
    private viewContainerRef;
    /**
     * Specifies whether a pane is collapsed or not collapsed at the initial rendering of splitter.

     */
    collapsed: any;
    /**
     * Specifies whether a pane is collapsible or not collapsible.

     */
    collapsible: any;
    /**
     * Specifies the maximum size of a pane. The pane cannot be resized if it is more than the specified maximum limit.

     */
    max: any;
    /**
     * Specifies the minimum size of a pane. The pane cannot be resized if it is less than the specified minimum size.

     */
    min: any;
    /**
     * Specifies the value whether a pane is resizable. By default, the Splitter is resizable in all panes.
     * You can disable this for any specific panes using this property.

     */
    resizable: any;
    /**
     * Configures the properties for each pane.

     */
    size: any;
    /**
     * Specifies the content of split pane as plain text, HTML markup, or any other JavaScript controls.


     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Pane Array Directive
 * @private
 */
export declare class PanesDirective extends ArrayBase<PanesDirective> {
    constructor();
}
