import { EditorManager } from './../base/editor-manager';
/**
 * Formats internal component

 */
export declare class Alignments {
    private parent;
    private alignments;
    /**
     * Constructor for creating the Formats plugin

     */
    constructor(parent: EditorManager);
    private addEventListener;
    private onKeyDown;
    private getTableNode;
    private applyAlignment;
}
