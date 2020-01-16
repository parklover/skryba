import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
export declare class MenuItemDirective extends ComplexBase<MenuItemDirective> {
    private viewContainerRef;
    /**
     * Defines class/multiple classes separated by a space for the menu Item that is used to include an icon.
     * Menu Item can include font icon and sprite image.

     */
    iconCss: any;
    /**
     * Specifies the id for menu item.

     */
    id: any;
    /**
     * Specifies the sub menu items that is the array of MenuItem model.

     */
    items: any;
    /**
     * Specifies separator between the menu items. Separator are either horizontal or vertical lines used to group menu items.

     */
    separator: any;
    /**
     * Specifies text for menu item.

     */
    text: any;
    /**
     * Specifies url for menu item that creates the anchor link to navigate to the url provided.

     */
    url: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * MenuItem Array Directive
 * @private
 */
export declare class MenuItemsDirective extends ArrayBase<MenuItemsDirective> {
    constructor();
}
