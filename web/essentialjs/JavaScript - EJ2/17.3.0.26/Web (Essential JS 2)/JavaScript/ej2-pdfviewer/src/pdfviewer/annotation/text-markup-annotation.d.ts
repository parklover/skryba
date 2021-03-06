import { PdfViewer, PdfViewerBase, IRectangle, ICommentsCollection, IReviewCollection } from '../index';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
/**

 */
export interface ITextMarkupAnnotation {
    textMarkupAnnotationType: string;
    author: string;
    subject: string;
    modifiedDate: string;
    note: string;
    bounds: any;
    color: any;
    opacity: number;
    rect: any;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    shapeAnnotationType: string;
    position?: string;
}
/**

 */
export interface IPageAnnotationBounds {
    pageIndex: number;
    bounds: IRectangle[];
    rect: any;
    startIndex?: number;
    endIndex?: number;
    textContent?: string;
}
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.

 */
export declare class TextMarkupAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    isTextMarkupAnnotationMode: boolean;
    /**
     * @private
     */
    currentTextMarkupAddMode: string;
    /**
     * @private
     */
    highlightColor: string;
    /**
     * @private
     */
    underlineColor: string;
    /**
     * @private
     */
    strikethroughColor: string;
    /**
     * @private
     */
    highlightOpacity: number;
    /**
     * @private
     */
    underlineOpacity: number;
    /**
     * @private
     */
    strikethroughOpacity: number;
    /**
     * @private
     */
    selectTextMarkupCurrentPage: number;
    /**
     * @private
     */
    currentTextMarkupAnnotation: ITextMarkupAnnotation;
    private currentAnnotationIndex;
    private isAnnotationSelect;
    private dropDivAnnotationLeft;
    private dropDivAnnotationRight;
    private dropElementLeft;
    private dropElementRight;
    /**
     * @private
     */
    isDropletClicked: boolean;
    /**
     * @private
     */
    isRightDropletClicked: boolean;
    /**
     * @private
     */
    isLeftDropletClicked: boolean;
    private isSelectionMaintained;
    private isExtended;
    /**
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @private
     */
    createAnnotationSelectElement(): void;
    private maintainSelection;
    private selectionEnd;
    private annotationLeftMove;
    private annotationRightMove;
    /**
     * @private
     */
    textSelect(target: any, x: any, y: any): void;
    /**
     * @private
     */
    showHideDropletDiv(hide: boolean): void;
    private updateAnnotationBounds;
    private retreieveSelection;
    /**
     * @private
     */
    updatePosition(x: number, y: number, isSelected?: boolean): void;
    /**
     * @private
     */
    updateLeftposition(x: number, y: number, isSelected?: boolean): void;
    private getClientValueTop;
    /**
     * @private
     */
    renderTextMarkupAnnotationsInPage(textMarkupAnnotations: any, pageNumber: number, isImportTextMarkup?: boolean): void;
    private renderTextMarkupAnnotations;
    /**
     * @private
     */
    drawTextMarkupAnnotations(type: string): void;
    private convertSelectionToTextMarkup;
    private updateTextMarkupAnnotationBounds;
    private drawTextMarkups;
    private renderHighlightAnnotation;
    private renderStrikeoutAnnotation;
    private renderUnderlineAnnotation;
    private getProperBounds;
    private drawLine;
    /**
     * @private
     */
    printTextMarkupAnnotations(textMarkupAnnotations: any, pageIndex: number, stampData: any, shapeData: any, measureShapeData: any, stickyData: any): string;
    /**
     * @private
     */
    saveTextMarkupAnnotations(): string;
    /**
     * @private
     */
    deleteTextMarkupAnnotation(): void;
    /**
     * @private
     */
    modifyColorProperty(color: string): void;
    /**
     * @private
     */
    modifyOpacityProperty(args: ChangeEventArgs, isOpacity?: number): void;
    private modifyAnnotationProperty;
    /**
     * @private
     */
    undoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @private
     */
    undoRedoPropertyChange(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, property: string, isUndoAction?: boolean): ITextMarkupAnnotation;
    /**
     * @private
     */
    redoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @private
     */
    saveNoteContent(pageNumber: number, note: string): void;
    private clearCurrentAnnotation;
    /**
     * @private
     */
    clearCurrentAnnotationSelection(pageNumber: number, isSelect?: boolean): void;
    private getBoundsForSave;
    private getRgbCode;
    private getDrawnBounds;
    private getIndexNumbers;
    /**
     * @private
     */
    rerenderAnnotationsPinch(pageNumber: number): void;
    /**
     * @private
     */
    rerenderAnnotations(pageNumber: number): void;
    /**
     * @private
     */
    onTextMarkupAnnotationMouseUp(event: MouseEvent): void;
    /**
     * @private
     */
    onTextMarkupAnnotationTouchEnd(event: TouchEvent): void;
    private clearCurrentSelectedAnnotation;
    /**
     * @private
     */
    onTextMarkupAnnotationMouseMove(event: MouseEvent): void;
    private showPopupNote;
    private getCurrentMarkupAnnotation;
    private compareCurrentAnnotations;
    /**
     * @private
     */
    clearAnnotationSelection(pageNumber: number): void;
    /**
     * @private
     */
    selectAnnotation(annotation: ITextMarkupAnnotation, canvas: HTMLElement, pageNumber?: number): void;
    private drawAnnotationSelectRect;
    /**
     * @private
     */
    enableAnnotationPropertiesTool(isEnable: boolean): void;
    /**
     * @private
     */
    maintainAnnotationSelection(): void;
    private manageAnnotations;
    private getAnnotations;
    private getAddedAnnotation;
    private annotationDivSelect;
    private getPageContext;
    private getDefaultValue;
    private getMagnifiedValue;
    /**
     * @private
     */
    saveImportedTextMarkupAnnotations(annotation: any, pageNumber: number): any;
    /**
     * @private
     */
    clear(): void;
}
