import { MarkdownParser } from './../base/markdown-parser';
/**
 * Link internal component

 */
export declare class ClearFormat {
    private parent;
    private selection;
    /**
     * Constructor for creating the clear format plugin

     */
    constructor(parent: MarkdownParser);
    private addEventListener;
    private replaceRegex;
    private clearSelectionTags;
    private clearFormatTags;
    private clearFormatLines;
    private clear;
    private restore;
}
