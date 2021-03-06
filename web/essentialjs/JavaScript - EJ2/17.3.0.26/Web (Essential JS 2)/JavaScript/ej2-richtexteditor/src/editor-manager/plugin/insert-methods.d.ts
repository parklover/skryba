/**
 * Node appending methods.

 */
export declare class InsertMethods {
    static WrapBefore(textNode: Text, parentNode: HTMLElement, isAfter?: boolean): Text;
    static Wrap(childNode: HTMLElement, parentNode: HTMLElement): HTMLElement;
    static unwrap(node: Node | HTMLElement): Node[];
    static AppendBefore(textNode: HTMLElement | Text | DocumentFragment, parentNode: HTMLElement | Text | DocumentFragment, isAfter?: boolean): HTMLElement | Text | DocumentFragment;
}
