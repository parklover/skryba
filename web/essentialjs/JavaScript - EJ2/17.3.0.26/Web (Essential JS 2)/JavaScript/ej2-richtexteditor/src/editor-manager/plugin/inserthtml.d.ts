/**
 * Insert a HTML Node or Text

 */
export declare class InsertHtml {
    static Insert(docElement: Document, insertNode: Node | string, editNode?: Element): void;
    private static findDetachEmptyElem;
    private static removeEmptyElements;
    private static closestEle;
}
