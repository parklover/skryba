/**
 * Split the Node based on selection

 */
export declare class NodeCutter {
    position: number;
    private nodeSelection;
    GetSpliceNode(range: Range, node: HTMLElement): Node;
    /**

     */
    SplitNode(range: Range, node: HTMLElement, isCollapsed: boolean): HTMLElement;
    private spliceEmptyNode;
    private GetCursorStart;
    GetCursorRange(docElement: Document, range: Range, node: Node): Range;
    GetCursorNode(docElement: Document, range: Range, node: Node): Node;
    TrimLineBreak(line: string): string;
}
