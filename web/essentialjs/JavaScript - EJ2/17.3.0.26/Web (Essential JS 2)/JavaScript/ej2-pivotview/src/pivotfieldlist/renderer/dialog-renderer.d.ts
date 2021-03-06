import { PivotFieldList } from '../base/field-list';
import { Dialog } from '@syncfusion/ej2-popups';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
/**
 * Module to render Pivot Field List Dialog
 */
export declare class DialogRenderer {
    parent: PivotFieldList;
    parentElement: HTMLElement;
    fieldListDialog: Dialog;
    deferUpdateCheckBox: CheckBox;
    adaptiveElement: Tab;
    private deferUpdateApplyButton;
    private deferUpdateCancelButton;
    /** Constructor for render module */
    constructor(parent: PivotFieldList);
    /**
     * Initialize the field list layout rendering
     * @returns void
     * @private
     */
    render(): void;
    private renderStaticLayout;
    private renderDeferUpdateButtons;
    private createDeferUpdateButtons;
    private onCheckChange;
    private applyButtonClick;
    private cancelButtonClick;
    private renderFieldListDialog;
    /**
     * Called internally if any of the field added to axis.

     */
    updateDataSource(selectedNodes: string[]): void;
    private onDeferUpdateClick;
    private renderAdaptiveLayout;
    private tabSelect;
    private createCalculatedButton;
    private createAddButton;
    private createAxisTable;
    private showCalculatedField;
    private showFieldListDialog;
    private onShowFieldList;
    private onCloseFieldList;
    private removeFieldListIcon;
    private keyPress;
    private wireDialogEvent;
    private unWireDialogEvent;
}
