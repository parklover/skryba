import { NodeSelection } from './../../selection/index';
export declare const markerClassName: {
    [key: string]: string;
};
/**
 * DOMNode internal plugin

 */
export declare class DOMNode {
    private parent;
    private currentDocument;
    private nodeSelection;
    /**
     * Constructor for creating the DOMNode plugin

     */
    constructor(parent: Element, currentDocument: Document);
    contents(element: Element): Node[];
    isBlockNode(element: Element): boolean;
    isLink(element: Element): boolean;
    blockParentNode(element: Element): Element;
    rawAttributes(element: Element): {
        [key: string]: string;
    };
    attributes(element?: Element): string;
    clearAttributes(element: Element): void;
    openTagString(element: Element): string;
    closeTagString(element: Element): string;
    createTagString(tagName: string, relativeElement: Element, innerHTML: string): string;
    isList(element: Element): boolean;
    isElement(element: Element): boolean;
    isEditable(element: Element): boolean;
    hasClass(element: Element, className: string): boolean;
    replaceWith(element: Element, value: string): void;
    parseHTMLFragment(value: string): Element;
    wrap(element: Element, wrapper: Element): Element;
    insertAfter(newNode: Element, referenceNode: Element): void;
    wrapInner(parent: Element, wrapper: Element): Element;
    unWrap(element: Element): Element[];
    getSelectedNode(element: Element, index: number): Element;
    nodeFinds(element: Element, elements: Element[]): Element[];
    isEditorArea(): boolean;
    getRangePoint(point?: number): Range | Range[];
    getSelection(): Selection;
    getPreviousNode(element: Element): Element;
    encode(value: string): string;
    saveMarker(save: NodeSelection, action?: string): NodeSelection;
    private marker;
    setMarker(save: NodeSelection): void;
    ensureSelfClosingTag(start: Element, className: string, range: Range): void;
    createTempNode(element: Element): Element;
    getImageTagInSelection(): NodeListOf<HTMLImageElement>;
    blockNodes(): Node[];
    private ignoreTableTag;
}
