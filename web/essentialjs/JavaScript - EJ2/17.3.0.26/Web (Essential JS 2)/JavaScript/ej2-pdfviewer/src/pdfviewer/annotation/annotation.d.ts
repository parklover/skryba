import { PdfViewer, PdfViewerBase, AnnotationType, TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, IPopupAnnotation, MeasureAnnotation } from '../index';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DecoratorShapes } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel, PdfFontModel } from '../../diagram/pdf-annotation-model';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
/**

 */
export interface IActionElements {
    pageIndex: number;
    index: number;
    annotation: any;
    action: string;
    undoElement: any;
    redoElement: any;
    duplicate?: any;
    modifiedProperty: string;
}
/**

 */
export interface IPoint {
    x: number;
    y: number;
}
/**

 */
export interface IPageAnnotations {
    pageIndex: number;
    annotations: any[];
}
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
export declare class Annotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    textMarkupAnnotationModule: TextMarkupAnnotation;
    /**
     * @private
     */
    shapeAnnotationModule: ShapeAnnotation;
    /**
     * @private
     */
    measureAnnotationModule: MeasureAnnotation;
    /**
     * @private
     */
    stampAnnotationModule: StampAnnotation;
    /**
     * @private
     */
    freeTextAnnotationModule: FreeTextAnnotation;
    /**
     * @private
     */
    inputElementModule: InputElement;
    /**
     * @private
     */
    stickyNotesAnnotationModule: StickyNotesAnnotation;
    private popupNote;
    private popupNoteAuthor;
    private popupNoteContent;
    private popupElement;
    private authorPopupElement;
    private noteContentElement;
    private modifiedDateElement;
    private opacityIndicator;
    private startArrowDropDown;
    private endArrowDropDown;
    private lineStyleDropDown;
    private thicknessBox;
    private leaderLengthBox;
    private fillColorPicker;
    private strokeColorPicker;
    private fillDropDown;
    private strokeDropDown;
    private opacitySlider;
    private propertiesDialog;
    private currentAnnotPageNumber;
    private clientX;
    private clientY;
    private isPopupMenuMoved;
    private selectedLineStyle;
    private selectedLineDashArray;
    private isUndoRedoAction;
    private isUndoAction;
    /**
     * @private
     */
    isShapeCopied: boolean;
    /**
     * @private
     */
    actionCollection: IActionElements[];
    /**
     * @private
     */
    redoCollection: IActionElements[];
    /**
     * @private
     */
    isPopupNoteVisible: boolean;
    /**
     * @private
     */
    undoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    redoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     * @param type
     * @returns void
     */
    setAnnotationMode(type: AnnotationType): void;
    private clearAnnotationMode;
    deleteAnnotation(): void;
    /**
     * @private
     */
    getAnnotationType(type: string, measureType: string): AnnotationType;
    /**
     * @private
     */
    getAnnotationIndex(pageNumber: number, annotationId: string): number;
    /**
     * @private
     */
    initializeCollection(): void;
    /**
     * @private
     */
    showCommentsPanel(): void;
    /**
     * @private
     */
    addAction(pageNumber: number, index: number, annotation: any, actionString: string, property: string, node?: any, redo?: any): void;
    /**
     * @private
     */
    undo(): void;
    /**
     * @private
     */
    redo(): void;
    private updateCollectionForLineProperty;
    private updateToolbar;
    private createNote;
    /**
     * @private
     */
    showPopupNote(event: any, color: string, author: string, note: string, type: string): void;
    /**
     * @private
     */
    hidePopupNote(): void;
    private createTextMarkupPopup;
    private onPopupElementMoveStart;
    private onPopupElementMove;
    private onPopupElementMoveEnd;
    private saveClosePopupMenu;
    /**
     * @private
     */
    closePopupMenu(): void;
    /**
     * @private
     */
    showAnnotationPopup(event: any): void;
    /**
     * @private
     */
    modifyOpacity(args: ChangeEventArgs): void;
    /**
     * @private
     */
    modifyFontColor(currentColor: string): void;
    /**
     * @private
     */
    modifyFontFamily(currentValue: string): void;
    /**
     * @private
     */
    modifyFontSize(currentValue: number): void;
    /**
     * @private
     */
    modifyTextAlignment(currentValue: string): void;
    /**
     * @private
     */
    modifyTextProperties(fontInfo: PdfFontModel, action: string): void;
    /**
     * @private
     */
    modifyThickness(thicknessValue: number): void;
    /**
     * @private
     */
    modifyStrokeColor(color: string): void;
    /**
     * @private
     */
    modifyFillColor(color: string): void;
    /**
     * @private
     */
    modifyDynamicTextValue(dynamicText: string, annotName: string): void;
    private modifyInCollections;
    /**
     * @private
     */
    createPropertiesWindow(): void;
    private destroyPropertiesWindow;
    private refreshColorPicker;
    private createAppearanceTab;
    private createContent;
    private onStrokeDropDownBeforeOpen;
    private onFillDropDownBeforeOpen;
    private createStyleList;
    private createColorPicker;
    private createDropDownButton;
    private updateColorInIcon;
    private setThickness;
    private createDropDownContent;
    private createListForStyle;
    private onStartArrowHeadStyleSelect;
    private onEndArrowHeadStyleSelect;
    private createInputElement;
    private updateOpacityIndicator;
    private onOkClicked;
    private onCancelClicked;
    private getArrowTypeFromDropDown;
    /**
     * @private
     */
    getArrowString(arrow: DecoratorShapes): string;
    /**
     * @private
     */
    onAnnotationMouseUp(): void;
    /**
     * @private
     */
    onShapesMouseup(pdfAnnotationBase: PdfAnnotationBaseModel, event: any): void;
    /**
     * @private
     */
    updateCalibrateValues(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    onAnnotationMouseDown(): void;
    private enableBasedOnType;
    private getProperDate;
    /**
     * @private
     */
    getPageCollection(pageAnnotations: IPageAnnotations[], pageNumber: number): number;
    /**
     * @private
     */
    getAnnotationWithId(annotations: any[], id: string): any;
    /**
     * @private
     */
    getEventPageNumber(event: any): number;
    /**
     * @private
     */
    getAnnotationComments(commentsAnnotations: any, parentAnnotation: any, author: string): any;
    private getRandomNumber;
    /**
     * @private
     */
    createGUID(): string;
    /**
     * @private
     */
    createAnnotationLayer(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): HTMLElement;
    /**
     * @private
     */
    resizeAnnotations(width: number, height: number, pageNumber: number): void;
    /**
     * @private
     */
    clearAnnotationCanvas(pageNumber: number): void;
    /**
     * @private
     */
    renderAnnotations(pageNumber: number, shapeAnnotation: any, measureShapeAnnotation: any, textMarkupAnnotation: any, canvas?: any, isImportAnnotations?: boolean): void;
    /**
     * @private
     */
    storeAnnotations(pageNumber: number, annotation: any, annotationId: string): number;
    /**
     * @private
     */
    getArrowType(type: string): DecoratorShapes;
    /**
     * @private
     */
    getArrowTypeForCollection(arrow: DecoratorShapes): string;
    /**
     * @private
     */
    getBounds(bound: any, pageIndex: number): any;
    /**
     * @private
     */
    getVertexPoints(points: any[], pageIndex: number): any;
    /**
     * @private
     */
    getStoredAnnotations(pageIndex: number, shapeAnnotations: any[], idString: string): any[];
    /**
     * @private
     */
    triggerAnnotationPropChange(pdfAnnotationBase: PdfAnnotationBaseModel, isColor: boolean, isStroke: boolean, isThickness: boolean, isOpacity: boolean, isLineStart?: boolean, isLineEnd?: boolean, isDashArray?: boolean): void;
    /**
     * @private
     */
    triggerAnnotationResize(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    selectAnnotation(annotationId: any, pageNumber: number, annotation: any): void;
    editAnnotation(annotation: any): void;
    /**
     * @private
     */
    updateFreeTextProperties(annotation: any): void;
    /**
     * @private
     */
    addFreeTextProperties(annotation: any, currentAnnotation: any): void;
    updateMeasurementSettings(): void;
    private updateCollection;
    private modifyAnnotationProperties;
    /**
     * @private
     */
    updateAnnotationAuthor(annotationType: string, annotationSubType?: string): string;
    /**
     * @private
     */
    clear(): void;
    /**
     * @private
     */
    cloneObject(obj: any): any;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
