import { PivotView } from '../../pivotview/base/pivotview';
import { IAction } from '../../common/base/interface';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
export declare class CalculatedField implements IAction {
    parent: PivotView | PivotFieldList;
    isFormula: boolean;
    /**
     * Internal variables.
     */
    private dialog;
    private treeObj;
    private inputObj;
    private droppable;
    private menuObj;
    private newFields;
    private curMenu;
    private isFieldExist;
    private parentID;
    private existingReport;
    private formulaText;
    private fieldText;
    private keyboardEvents;
    private isEdit;
    private currentFieldName;
    private confirmPopUp;
    private field;
    /** Constructor for calculatedfield module */
    constructor(parent: PivotView | PivotFieldList);
    /**
     * To get module name.
     * @returns string
     */
    protected getModuleName(): string;
    private keyActionHandler;
    /**
     * Trigger while click treeview icon.
     * @param  {MouseEvent} e
     * @returns void
     */
    private fieldClickHandler;
    private clearFormula;
    /**
     * To display context menu.
     * @param  {HTMLElement} node
     * @returns void
     */
    private displayMenu;
    /**
     * To set position for context menu.
     * @returns void
     */
    private openContextMenu;
    /**
     * Triggers while select menu.
     * @param  {MenuEventArgs} menu
     * @returns void
     */
    private selectContextMenu;
    /**
     * To create context menu.
     * @returns void
     */
    private createMenu;
    /**
     * Triggers while click OK button.
     * @returns void
     */
    private applyFormula;
    private addFormula;
    showError(): void;
    /**
     * To get treeview data
     * @param  {PivotGrid|PivotFieldList} parent
     * @returns Object
     */
    private getFieldListData;
    /**
     * Triggers before menu opens.
     * @param  {BeforeOpenCloseMenuEventArgs} args
     * @returns void
     */
    private beforeMenuOpen;
    /**
     * Trigger while drop node in formula field.
     * @param  {DragAndDropEventArgs} args
     * @returns void
     */
    private fieldDropped;
    /**
     * To create dialog.
     * @returns void
     */
    private createDialog;
    private cancelClick;
    private beforeOpen;
    private closeDialog;
    /**
     * To render dialog elements.
     * @returns void
     */
    private renderDialogElements;
    /**
     * To create calculated field adaptive layout.
     * @returns void
     */
    private renderAdaptiveLayout;
    /**
     * To create treeview.
     * @returns void
     */
    private createOlapDropElements;
    /**
     * To create treeview.
     * @returns void
     */
    private createTreeView;
    private updateNodeIcon;
    private nodeCollapsing;
    private dragStart;
    /**
     * Trigger before treeview text append.
     * @param  {DrawNodeEventArgs} args
     * @returns void
     */
    private drawTreeNode;
    /**
     * To create radio buttons.
     * @param  {string} key
     * @returns HTMLElement
     */
    private createTypeContainer;
    /**
     * To get Accordion Data.
     * @param  {PivotView | PivotFieldList} parent
     * @returns AccordionItemModel
     */
    private getAccordionData;
    /**
     * To render mobile layout.
     * @param  {Tab} tabObj
     * @returns void
     */
    private renderMobileLayout;
    private accordionExpand;
    private onChange;
    private updateType;
    /**
     * Trigger while click cancel button.
     * @returns void
     */
    private cancelBtnClick;
    /**
     * Trigger while click add button.
     * @returns void
     */
    private addBtnClick;
    /**
     * To create calculated field dialog elements.
     * @returns void

     */
    createCalculatedFieldDialog(): void;
    /**
     * To create calculated field desktop layout.
     * @returns void
     */
    private renderDialogLayout;
    /**
     * Creates the error dialog for the unexpected action done.
     * @method createConfirmDialog
     * @return {void}

     */
    private createConfirmDialog;
    private replaceFormula;
    private removeErrorDialog;
    /**
     * To add event listener.
     * @returns void

     */
    addEventListener(): void;
    /**
     * To remove event listener.
     * @returns void

     */
    removeEventListener(): void;
    /**
     * To destroy the calculated field dialog
     * @returns void

     */
    destroy(): void;
}
