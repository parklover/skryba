import { IMDFormats } from './../base/interface';
/**
 * Lists internal component

 */
export declare class MDLists {
    private parent;
    private startContainer;
    private endContainer;
    private selection;
    private syntax;
    private currentAction;
    /**
     * Constructor for creating the Lists plugin

     */
    constructor(options: IMDFormats);
    private addEventListener;
    private keyDownHandler;
    private keyUpHandler;
    private tabKey;
    private changeTextAreaValue;
    private getTabSpace;
    private isNotFirstLine;
    private getAction;
    private nextOrderedListValue;
    private previousOrderedListValue;
    private enterKey;
    private olListType;
    private applyListsHandler;
    private appliedLine;
    private restore;
    private getListRegex;
}
