import { EditorManager } from './../base/editor-manager';
/**
 * Selection EXEC internal component

 */
export declare class SelectionBasedExec {
    private parent;
    /**
     * Constructor for creating the Formats plugin

     */
    constructor(parent: EditorManager);
    private addEventListener;
    private keyDownHandler;
    private applySelection;
    private callBack;
}
