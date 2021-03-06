/**
 * Is formatted or not.

 */
export declare class IsFormatted {
    static inlineTags: string[];
    getFormattedNode(node: Node, format: string, endNode: Node): Node;
    private getFormatParent;
    private isFormattedNode;
    static isBold(node: Node): boolean;
    static isItalic(node: Node): boolean;
    static isUnderline(node: Node): boolean;
    static isStrikethrough(node: Node): boolean;
    static isSuperscript(node: Node): boolean;
    static isSubscript(node: Node): boolean;
    private isFontColor;
    private isBackgroundColor;
    private isFontSize;
    private isFontName;
}
