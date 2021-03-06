import { Spreadsheet } from '../index';
/**
 * The `Edit` module is used to handle the editing functionalities in Spreadsheet.
 */
export declare class Edit {
    private parent;
    private editorElem;
    private editCellData;
    private isEdit;
    private isCellEdit;
    private isNewValueEdit;
    private keyCodes;
    /**
     * Constructor for edit module in Spreadsheet.
     * @private
     */
    constructor(parent: Spreadsheet);
    private init;
    /**
     * To destroy the edit module.
     * @return {void}

     */
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    private performEditOperation;
    private keyUpHandler;
    private keyDownHandler;
    private renderEditor;
    private refreshEditor;
    private startEdit;
    private setCursorPosition;
    private hasFormulaSuggSelected;
    private editingHandler;
    private mouseDownHandler;
    private dblClickHandler;
    private updateEditCellDetail;
    private initiateEditor;
    private positionEditor;
    private updateEditedValue;
    private refreshDependentCellValue;
    private getRefreshNodeArgs;
    endEdit(refreshFormulaBar?: boolean): void;
    cancelEdit(refreshFormulaBar?: boolean, trigEvent?: boolean): void;
    private focusElement;
    private triggerEvent;
    private altEnter;
    private resetEditState;
}
