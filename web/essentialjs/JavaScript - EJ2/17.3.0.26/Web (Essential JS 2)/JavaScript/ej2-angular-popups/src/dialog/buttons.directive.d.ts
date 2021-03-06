import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * 'e-button' directive represent a button of angular dialog
 * It must be contained in a Dialog component(`ej-dialog`).
 * ```html
 * <ejs-dialog id='dialog' showCloseIcon=true>
 *   <e-buttons>
 *    <e-dialogbutton [buttonModal]='okButton'></e-button>
 *    <e-dialogbutton [buttonModal]='cancelButton'></e-button>
 *   </e-buttons>
 * </ejs-dialog>
 * ```
 */
export declare class DialogButtonDirective extends ComplexBase<DialogButtonDirective> {
    private viewContainerRef;
    /**
     * Specify the type of the button.
     * Possible values are Button, Submit and Reset.



     */
    type: any;
    /**
     * Specifies the button component properties to render the dialog buttons.
     */
    buttonModel: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * DialogButton Array Directive
 * @private
 */
export declare class ButtonsDirective extends ArrayBase<ButtonsDirective> {
    constructor();
}
