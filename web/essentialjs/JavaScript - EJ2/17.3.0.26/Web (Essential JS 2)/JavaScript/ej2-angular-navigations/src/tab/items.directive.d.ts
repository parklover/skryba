import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * TabItemDirective represent a item of the EJ2 Angular Tab.
 * ```html
 * <ejs-tab>
 *  <e-tabitems>
 *   <e-tabitem [header]='Header 1' [content]='Content 1'></e-tabitem>
 *   <e-tabitem [header]='Header 2' [content]='Content 2'></e-tabitem>
 *  <e-tabitems>
 * </ejs-tab>
 * ```
 */
export declare class TabItemDirective extends ComplexBase<TabItemDirective> {
    private viewContainerRef;
    /**
     * Sets the CSS classes to the Tab item to customize its styles.

     */
    cssClass: any;
    /**
     * Sets true to disable user interactions of the Tab item.

     */
    disabled: any;
    /**
     * The object used for configuring the Tab item header properties.

     */
    header: any;
    /**
     * Specifies the content of Tab item, that is displayed when concern item header is selected.

     */
    content: any;
    header_text: any;
    /**
     * Specifies the header text of Tab item.

     */
    headerTemplate: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * TabItem Array Directive
 * @private
 */
export declare class TabItemsDirective extends ArrayBase<TabItemsDirective> {
    constructor();
}
