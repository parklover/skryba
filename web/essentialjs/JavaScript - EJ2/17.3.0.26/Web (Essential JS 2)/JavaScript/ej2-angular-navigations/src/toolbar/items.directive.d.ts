import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * ItemDirective represent a item of the Essential JS 2 Angular Toolbar.
 * ```html
 * <ejs-toolbar >
 *   <e-items>
 *    <e-item text='Cut'></e-item>
 *    <e-item text='Copy'></e-item>
 *   </e-items>
 * </ejs-toolbar>
 * ```
 */
export declare class ItemDirective extends ComplexBase<ItemDirective> {
    private viewContainerRef;
    /**
     * Specifies the types of command to be rendered in the Toolbar.
     * Supported types are:
     * - Button: Creates the Button control with its given properties like text, prefixIcon, etc.
     * - Separator: Adds a horizontal line that separates the Toolbar commands.
     * - Input: Creates an input element that is applicable to template rendering with Syncfusion controls like DropDownList,
     * AutoComplete, etc.

     */
    type: any;
    /**
     * Specifies the location for aligning Toolbar items on the Toolbar. Each command will be aligned according to the `align` property.
     * Possible values are:
     * - Left: To align commands to the left side of the Toolbar.
     * - Center: To align commands at the center of the Toolbar.
     * - Right: To align commands to the right side of the Toolbar.
     *

     */
    align: any;
    /**
     * Defines single/multiple classes (separated by space) to be used for customization of commands.

     */
    cssClass: any;
    /**
     * Defines htmlAttributes used to add custom attributes to Toolbar command.
     * Supports HTML attributes such as style, class, etc.

     */
    htmlAttributes: any;
    /**
     * Specifies the unique ID to be used with button or input element of Toolbar items.

     */
    id: any;
    /**
     * Specifies the Toolbar command display area when an element's content is too large to fit available space.
     * This is applicable only to `popup` mode. Possible values are:
     * - Show:  Always shows the item as the primary priority on the *Toolbar*.
     * - Hide: Always shows the item as the secondary priority on the *popup*.
     * - None: No priority for display, and as per normal order moves to popup when content exceeds.

     */
    overflow: any;
    /**
     * Defines single/multiple classes separated by space used to specify an icon for the button.
     * The icon will be positioned before the text content if text is available, otherwise the icon alone will be rendered.

     */
    prefixIcon: any;
    /**
     * Defines the priority of items to display it in popup always.
     * It allows to maintain toolbar item on popup always but it does not work for toolbar priority items.

     */
    showAlwaysInPopup: any;
    /**
     * Specifies where the button text will be displayed on *popup mode* of the Toolbar.
     * Possible values are:
     * - Toolbar:  Text will be displayed on *Toolbar* only.
     * - Overflow: Text will be displayed only when content overflows to *popup*.
     * - Both: Text will be displayed on *popup* and *Toolbar*.

     */
    showTextOn: any;
    /**
     * Defines single/multiple classes separated by space used to specify an icon for the button.
     * The icon will be positioned after the text content if text is available.

     */
    suffixIcon: any;
    /**
     * Specifies the text to be displayed on the Toolbar button.

     */
    text: any;
    /**
     * Specifies the text to be displayed on the Toolbar button.

     */
    tooltipText: any;
    /**
     * Specifies the width of the Toolbar button commands.

     */
    width: any;
    /**
     * Specifies the HTML element/element ID as a string that can be added as a Toolbar command.
     *

     */
    template: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Item Array Directive
 * @private
 */
export declare class ItemsDirective extends ArrayBase<ItemsDirective> {
    constructor();
}
