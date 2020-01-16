import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Level Directive
 * ```html
 * <e-levels>
 * <e-level></e-level>
 * </e-levels>
 * ```
 */
export declare class LevelDirective extends ComplexBase<LevelDirective> {
    private viewContainerRef;
    childColorMapping: any;
    tags: string[];
    /**
     * Items rendering with random colors.

     */
    autoFill: any;
    /**
     * Specifies the border
     */
    border: any;
    /**
     * Specifies the colorMapping
     */
    colorMapping: any;
    /**
     * Specifies the background of level.

     */
    fill: any;
    /**
     * Specifies the padding.

     */
    groupGap: any;
    /**
     * Specifies the padding.

     */
    groupPadding: any;
    /**
     * Specifies the field name from the dataSource.

     */
    groupPath: any;
    /**
     * Customize the text alignment

     */
    headerAlignment: any;
    /**
     * Specifies the header format.

     */
    headerFormat: any;
    /**
     * To specifies the height of header.

     */
    headerHeight: any;
    /**
     * Customize the header style.
     */
    headerStyle: any;
    /**
     * Specifies the opacity for color.

     */
    opacity: any;
    /**
     * To Show or hide the header in level.

     */
    showHeader: any;
    /**
     * Specifies the label position in level.

     */
    templatePosition: any;
    /**
     * Specifies the template for header rendering.

     */
    headerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Level Array Directive
 * @private
 */
export declare class LevelsDirective extends ArrayBase<LevelsDirective> {
    constructor();
}
