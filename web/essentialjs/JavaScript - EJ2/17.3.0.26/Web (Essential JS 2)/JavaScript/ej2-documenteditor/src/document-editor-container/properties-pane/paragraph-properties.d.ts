import { L10n } from '@syncfusion/ej2-base';
import { DocumentEditor } from '../../document-editor/index';
import { DocumentEditorContainer } from '../document-editor-container';
/**
 * Paragraph Properties
 * @private
 */
export declare class Paragraph {
    private container;
    private textProperties;
    private leftAlignment;
    private rightAlignment;
    private centerAlignment;
    private justify;
    private increaseIndent;
    private decreaseIndent;
    private lineSpacing;
    private style;
    private isRetrieving;
    private styleName;
    appliedBulletStyle: string;
    appliedNumberingStyle: string;
    appliedLineSpacing: string;
    private noneNumberTag;
    private numberList;
    private lowLetter;
    private upLetter;
    private lowRoman;
    private upRoman;
    private noneBulletTag;
    private dotBullet;
    private circleBullet;
    private squareBullet;
    private flowerBullet;
    private arrowBullet;
    private tickBullet;
    localObj: L10n;
    private isRtl;
    private splitButtonClass;
    private bulletListBtn;
    private numberedListBtn;
    readonly documentEditor: DocumentEditor;
    constructor(container: DocumentEditorContainer);
    initializeParagraphPropertiesDiv(wholeDiv: HTMLElement, isRtl?: boolean): void;
    private createSeperator;
    private createDivElement;
    private createButtonTemplate;
    private createLineSpacingDropdown;
    private createNumberListDropButton;
    private updateSelectedBulletListType;
    private updateSelectedNumberedListType;
    private removeSelectedList;
    private applyLastAppliedNumbering;
    private applyLastAppliedBullet;
    private createBulletListDropButton;
    private createNumberListTag;
    private createNumberNoneListTag;
    private createBulletListTag;
    private createStyleDropDownList;
    private updateOptions;
    updateStyleNames(): void;
    private createStyle;
    private constructStyleDropItems;
    private parseStyle;
    wireEvent(): void;
    unwireEvents(): void;
    private leftAlignmentAction;
    private lineSpacingAction;
    private setLineSpacing;
    private selectStyleValue;
    private applyStyleValue;
    private rightAlignmentAction;
    private centerAlignmentAction;
    private justifyAction;
    private increaseIndentAction;
    private decreaseIndentAction;
    private numberedNoneClick;
    private numberedNumberDotClick;
    private numberedUpRomanClick;
    private numberedUpLetterClick;
    private numberedLowLetterClick;
    private numberedLowRomanClick;
    private bulletDotClick;
    private bulletCircleClick;
    private bulletSquareClick;
    private bulletFlowerClick;
    private bulletArrowClick;
    private bulletTickClick;
    onSelectionChange(): void;
    destroy(): void;
}
