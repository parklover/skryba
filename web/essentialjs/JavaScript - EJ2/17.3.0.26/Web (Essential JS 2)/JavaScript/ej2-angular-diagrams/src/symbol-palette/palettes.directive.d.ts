import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Palette Directive
 * ```html
 * <e-palettes><e-palette></e-palette><e-palettes>
 * ```
 */
export declare class PaletteDirective extends ComplexBase<PaletteDirective> {
    private viewContainerRef;
    /**
     * Sets whether the palette items to be expanded or not

     */
    expanded: any;
    /**
     * Sets the height of the symbol group



     */
    height: any;
    /**
     * Defines the content of the symbol group

     */
    iconCss: any;
    /**
     * Defines the unique id of a symbol group

     */
    id: any;
    /**
     * Defines the collection of predefined symbols

     */
    symbols: any;
    /**
     * Defines the title of the symbol group

     */
    title: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Palette Array Directive
 * @private
 */
export declare class PalettesDirective extends ArrayBase<PalettesDirective> {
    constructor();
}
