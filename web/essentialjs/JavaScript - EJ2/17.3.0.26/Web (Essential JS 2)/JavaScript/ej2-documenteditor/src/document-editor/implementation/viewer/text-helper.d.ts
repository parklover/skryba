import { WCharacterFormat } from '../index';
import { TextElementBox, ListTextElementBox, ParagraphWidget } from './page';
import { LayoutViewer } from './viewer';
import { RtlInfo } from '../editor/editor-helper';
import { BiDirectionalOverride } from '../../index';
/**
 * @private
 */
export interface TextSizeInfo {
    Height?: number;
    BaselineOffset?: number;
    Width?: number;
}
/**
 * @private
 */
export interface TextHeightInfo {
    [key: string]: TextSizeInfo;
}
/**
 * @private
 */
export declare class TextHelper {
    private owner;
    private context;
    private paragraphMarkInfo;
    private readonly paragraphMark;
    private readonly lineBreakMark;
    constructor(viewer: LayoutViewer);
    /**
     * @private
     */
    getParagraphMarkWidth(characterFormat: WCharacterFormat): number;
    /**
     * @private
     */
    getParagraphMarkSize(characterFormat: WCharacterFormat): TextSizeInfo;
    /**
     * @private
     */
    getTextSize(elementBox: TextElementBox, characterFormat: WCharacterFormat): number;
    /**
     * @private
     */
    getHeight(characterFormat: WCharacterFormat): TextSizeInfo;
    /**
     * @private
     */
    getFormatText(characterFormat: WCharacterFormat): string;
    /**
     * @private
     */
    getHeightInternal(characterFormat: WCharacterFormat): TextSizeInfo;
    /**
     * @private
     */
    measureTextExcludingSpaceAtEnd(text: string, characterFormat: WCharacterFormat): number;
    /**
     * @private
     */
    getWidth(text: string, characterFormat: WCharacterFormat): number;
    setText(textToRender: string, isBidi: boolean, bdo: BiDirectionalOverride, isRender?: boolean): string;
    /**
     * @private
     */
    applyStyle(spanElement: HTMLSpanElement, characterFormat: WCharacterFormat): void;
    /**
     * @private
     */
    measureText(text: string, characterFormat: WCharacterFormat): TextSizeInfo;
    /**
     * @private
     */
    updateTextSize(elementBox: ListTextElementBox, paragraph: ParagraphWidget): void;
    /**
     * @private
     */
    isRTLText(text: string): boolean;
    /**
     * @private
     */
    getRtlLanguage(text: string): RtlInfo;
    destroy(): void;
}
