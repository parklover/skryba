/**
 * MarkdownSelection internal module

 */
export declare class MarkdownSelection {
    selectionStart: number;
    selectionEnd: number;
    getLineNumber(textarea: HTMLTextAreaElement, point: number): number;
    getSelectedText(textarea: HTMLTextAreaElement): string;
    getAllParents(value: string): string[];
    getSelectedLine(textarea: HTMLTextAreaElement): string;
    getLine(textarea: HTMLTextAreaElement, index: number): string;
    getSelectedParentPoints(textarea: HTMLTextAreaElement): {
        [key: string]: string | number;
    }[];
    setSelection(textarea: HTMLTextAreaElement, start: number, end: number): void;
    save(start: number, end: number): void;
    restore(textArea: HTMLTextAreaElement): void;
    isStartWith(line: string, command: string): boolean;
    replaceSpecialChar(value: string): string;
    isClear(parents: {
        [key: string]: string | number;
    }[], regex: string): boolean;
    getSelectedInlinePoints(textarea: HTMLTextAreaElement): {
        [key: string]: string | number;
    };
}
