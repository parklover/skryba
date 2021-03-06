import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * ItemDirective represent a item of the Essential JS 2 Angular Accordion.
 * ```html
 * <ejs-accordion >
 *   <e-accordionitems>
 *    <e-accordionitem header='Header1'></e-accordionitem>
 *    <e-accordionitem header='Header2' content='Content2'></e-accordionitem>
 *   </e-accordionitems>
 * </ejs-accordion>
 * ```
 */
export declare class AccordionItemDirective extends ComplexBase<AccordionItemDirective> {
    private viewContainerRef;
    /**
     * Defines single/multiple classes (separated by a space) are to be used for Accordion item customization.

     */
    cssClass: any;
    /**
     * Sets the expand (true) or collapse (false) state of the Accordion item. By default, all the items are in a collapsed state.

     */
    expanded: any;
    /**
     * Defines an icon with the given custom CSS class that is to be rendered before the header text.
     * Add the css classes to the `iconCss` property and write the css styles to the defined class to set images/icons.
     * Adding icon is applicable only to the header.
     *

     */
    iconCss: any;
    /**
     * Sets the header text to be displayed for the Accordion item.
     * You can set the title of the Accordion item using `header` property.
     * It also supports to include the title as `HTML element`, `string`, or `query selector`.
     *

     */
    header: any;
    /**
     * Sets the text content to be displayed for the Accordion item.
     * You can set the content of the Accordion item using `content` property.
     * It also supports to include the title as `HTML element`, `string`, or `query selector`.
     *

     */
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * AccordionItem Array Directive
 * @private
 */
export declare class AccordionItemsDirective extends ArrayBase<AccordionItemsDirective> {
    constructor();
}
