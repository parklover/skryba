import { MarkdownParser } from './../base/markdown-parser';
import { IMarkdownFormatterCallBack } from './../../common/interface';
import { KeyboardEventArgs } from '@syncfusion/ej2-base';
/**
 * Specifies IMDFormats interfaces.

 */
export interface IMDFormats {
    /**
     * Specifies the formatTags.
     */
    syntax?: {
        [key: string]: string;
    };
    /**
     * Specifies the parent.
     */
    parent?: MarkdownParser;
}
/**
 * Specifies IMTable interfaces.

 */
export interface IMDTable {
    syntaxTag?: {
        [key in MarkdownTableFormat]: {
            [key: string]: string;
        };
    };
    /**
     * Specifies the parent.
     */
    parent?: MarkdownParser;
}
export declare type MarkdownTableFormat = 'Formats' | 'List';
/**
 * Specifies ISelectedLines interfaces.

 */
export interface ISelectedLines {
    /**
     * Specifies the parentLinePoints.
     */
    parentLinePoints: {
        [key: string]: string | number;
    }[];
    /**
     * Specifies the textarea selection start point.
     */
    start: number;
    /**
     * Specifies the textarea selection end point.
     */
    end: number;
}
/**
 * Specifies MarkdownParserModel interfaces.

 */
export interface IMarkdownParserModel {
    /**
     * Specifies the element.
     */
    element: Element;
    /**
     * Specifies the formatTags.
     */
    formatTags?: {
        [key: string]: string;
    };
    /**
     * Specifies the formatTags.
     */
    listTags?: {
        [key: string]: string;
    };
    /**
     * Specifies the selectionTags.
     */
    selectionTags?: {
        [key: string]: string;
    };
    /**
     * Specifies the options.
     */
    options?: {
        [key: string]: number;
    };
}
/**
 * Specifies ISubCommands interfaces.

 */
export interface IMarkdownSubCommands {
    /**
     * Specifies the subCommand.
     */
    subCommand: string;
    /**
     * Specifies the callBack.
     */
    callBack(args?: IMarkdownFormatterCallBack): () => void;
    /**
     * Specifies the originalEvent.
     */
    event?: MouseEvent;
}
export interface MarkdownUndoRedoData {
    text?: string;
    start?: number;
    end?: number;
}
export interface IMarkdownItem {
    module?: string;
    event?: KeyboardEvent | MouseEvent;
    item: IMarkdownItemArgs;
    value?: IMarkdownItemArgs;
    subCommand: string;
    callBack(args: IMarkdownFormatterCallBack): () => void;
}
export interface IMarkdownItemArgs {
    url?: string;
    text?: string;
    target?: string;
    width?: number | string;
    height?: number | string;
    headingText?: string;
    colText?: string;
}
/**
 * Specifies IMDKeyboardEvent interfaces.

 */
export interface IMDKeyboardEvent {
    /**
     * Specifies the callBack.
     */
    callBack(args?: IMarkdownFormatterCallBack): () => void;
    /**
     * Specifies the event.
     */
    event: KeyboardEventArgs;
}
export interface ITextArea extends HTMLTextAreaElement {
    selectionDirection: string;
}
