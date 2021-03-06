import { IGrid, IAction } from '../base/interface';
/**
 * The `Clipboard` module is used to handle clipboard copy action.
 */
export declare class Clipboard implements IAction {
    private activeElement;
    private clipBoardTextArea;
    private copyContent;
    private isSelect;
    private parent;
    /**
     * Constructor for the Grid clipboard module

     */
    constructor(parent?: IGrid);
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    private clickHandler;
    private pasteHandler;
    /**
     * Paste data from clipboard to selected cells.
     * @param {boolean} data - Specifies the date for paste.
     * @param {boolean} rowIndex - Specifies the row index.
     * @param {boolean} colIndex - Specifies the column index.
     */
    paste(data: string, rowIndex: number, colIndex: number): void;
    private initialEnd;
    private keyDownHandler;
    private setCopyData;
    private getCopyData;
    /**
     * Copy selected rows or cells data into clipboard.
     * @param {boolean} withHeader - Specifies whether the column header data need to be copied or not.
     */
    copy(withHeader?: boolean): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * To destroy the clipboard
     * @return {void}

     */
    destroy(): void;
    private checkBoxSelection;
}
