import { EditorManager } from './../base/editor-manager';
/**
 * Link internal component

 */
export declare class TableCommand {
    private parent;
    /**
     * Constructor for creating the Formats plugin

     */
    constructor(parent: EditorManager);
    private addEventListener;
    private createTable;
    private removeEmptyNode;
    private insertAfter;
    private insertRow;
    private insertColumn;
    private deleteColumn;
    private deleteRow;
    private removeTable;
    private tableHeader;
    private tableVerticalAlign;
}
