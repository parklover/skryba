import { EditorManager } from './../base/editor-manager';
/**
 * Indents internal component

 */
export declare class Indents {
    private parent;
    private indentValue;
    /**
     * Constructor for creating the Formats plugin

     */
    constructor(parent: EditorManager);
    private addEventListener;
    private onKeyDown;
    private applyIndents;
}
