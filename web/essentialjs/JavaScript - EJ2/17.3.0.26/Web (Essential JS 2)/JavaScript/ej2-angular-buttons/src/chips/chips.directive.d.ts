import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-chip` directive represent a chip of the Angular ChipList.
 * ```html
 * <ejs-chiplist >
 *   <e-chips>
 *    <e-chip text='chip1'></e-chip>
 *    <e-chip text='chip2'></e-chip>
 *   </e-chips>
 * </ejs-chiplist>
 * ```
 */
export declare class ChipDirective extends ComplexBase<ChipDirective> {
    private viewContainerRef;
    /**
     * This avatarIconCss property helps to customize avatar element.

     */
    avatarIconCss: any;
    /**
     * This avatarText property helps to customize avatar content.

     */
    avatarText: any;
    /**
     * This cssClass property helps to customize ChipList component.

     */
    cssClass: any;
    /**
     * This enabled property helps to enable/disable ChipList component.

     */
    enabled: any;
    /**
     * This leadingIconCss property helps to customize leading icon element.

     */
    leadingIconCss: any;
    /**
     * This text property helps to render ChipList component.

     */
    text: any;
    /**
     * This trailingIconCss property helps to customize trailing icon element.

     */
    trailingIconCss: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Chip Array Directive
 * @private
 */
export declare class ChipsDirective extends ArrayBase<ChipsDirective> {
    constructor();
}
