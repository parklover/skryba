import { EditorManager } from './../base/editor-manager';
/**
 * Lists internal component

 */
export declare class Lists {
    private parent;
    private startContainer;
    private endContainer;
    private saveSelection;
    private domNode;
    private currentAction;
    /**
     * Constructor for creating the Lists plugin

     */
    constructor(parent: EditorManager);
    private addEventListener;
    private testList;
    private testCurrentList;
    private spaceList;
    private keyDownHandler;
    private getAction;
    private revertClean;
    private noPreviousElement;
    private nestedList;
    private applyListsHandler;
    private applyLists;
    private removeEmptyListElements;
    private isRevert;
    private checkLists;
    private cleanNode;
    private findUnSelected;
    private revertList;
    private openTag;
    private closeTag;
}
