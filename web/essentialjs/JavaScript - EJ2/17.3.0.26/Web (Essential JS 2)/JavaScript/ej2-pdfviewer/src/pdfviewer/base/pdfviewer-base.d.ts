import { PdfViewer, TextLayer, ContextMenu, Signature } from '../index';
import { NavigationPane } from './navigation-pane';
import { TextMarkupAnnotation } from '../annotation';
import { DrawingElement, PointModel, Matrix } from '@syncfusion/ej2-drawings';
import { ToolBase, Actions, MouseEventArgs } from '../../diagram/tools';
import { ActiveElements } from '../../diagram/action';
import { PdfAnnotationBaseModel } from '../../diagram/pdf-annotation-model';
/**
 * The `ISize` module is used to handle page size property of PDF viewer.

 */
export interface ISize {
    width: number;
    height: number;
    top: number;
    rotation?: number;
}
/**
 * The `IPinchZoomStorage` module is used to handle pinch zoom storage of PDF viewer.

 */
export interface IPinchZoomStorage {
    index: number;
    pinchZoomStorage: object;
}
/**
 * The `IAnnotationCollection` module is used to handle page size property of PDF viewer.

 */
export interface IAnnotationCollection {
    textMarkupAnnotation: object;
    shapeAnnotation: object;
    measureShapeAnnotation: object;
    stampAnnotations: object;
    stickyNotesAnnotation: object;
    freeTextAnnotation: object;
}
/**

 */
interface ICustomStampItems {
    customStampName: string;
    customStampImageSource: string;
}
/**
 * The `PdfViewerBase` module is used to handle base methods of PDF viewer.

 */
export declare class PdfViewerBase {
    /**
     * @private
     */
    viewerContainer: HTMLElement;
    /**
     * @private
     */
    contextMenuModule: ContextMenu;
    /**
     * @private
     */
    pageSize: ISize[];
    /**
     * @private
     */
    pageCount: number;
    /**
     * @private
     */
    currentPageNumber: number;
    /**
     * @private
     */
    activeElements: ActiveElements;
    /**
     * @private
     */
    textLayer: TextLayer;
    private pdfViewer;
    private unload;
    /**
     * @private
     */
    isDocumentLoaded: boolean;
    /**
     * @private
     */
    isDocumentEdited: boolean;
    /**
     * @private
     */
    documentId: string;
    /**
     * @private
     */
    jsonDocumentId: string;
    /**
     * @private
     */
    renderedPagesList: number[];
    /**
     * @private
     */
    pageGap: number;
    private pageLeft;
    private sessionLimit;
    private pageStopValue;
    /**
     * @private
     */
    toolbarHeight: number;
    private pageLimit;
    private previousPage;
    private isViewerMouseDown;
    private isViewerMouseWheel;
    private scrollPosition;
    private sessionStorage;
    /**
     * @private
     */
    pageContainer: HTMLElement;
    private scrollHoldTimer;
    private isFileName;
    private pointerCount;
    private pointersForTouch;
    private corruptPopup;
    private passwordPopup;
    private goToPagePopup;
    private isPasswordAvailable;
    private document;
    /**
     * @private
     */
    reRenderedCount: number;
    private passwordInput;
    private promptElement;
    /**
     * @private
     */
    navigationPane: NavigationPane;
    private mouseX;
    private mouseY;
    /**
     * @private
     */
    hashId: string;
    private documentLiveCount;
    /**
     * @private
     */
    mainContainer: HTMLElement;
    /**
     * @private
     */
    viewerMainContainer: HTMLElement;
    private printMainContainer;
    /**
     * @private
     */
    mobileScrollerContainer: HTMLElement;
    /**
     * @private
     */
    mobilePageNoContainer: HTMLElement;
    /**
     * @private
     */
    mobileSpanContainer: HTMLElement;
    /**
     * @private
     */
    mobilecurrentPageContainer: HTMLElement;
    private mobilenumberContainer;
    private mobiletotalPageContainer;
    private touchClientX;
    private touchClientY;
    private previousTime;
    private currentTime;
    private isTouchScrolled;
    private goToPageInput;
    /**
     * @private
     */
    pageNoContainer: HTMLElement;
    private goToPageElement;
    private isLongTouchPropagated;
    private longTouchTimer;
    private isViewerContainerDoubleClick;
    private dblClickTimer;
    /**
     * @private
     */
    pinchZoomStorage: IPinchZoomStorage[];
    private isPinchZoomStorage;
    /**
     * @private
     */
    isTextSelectionDisabled: boolean;
    /**
     * @private
     */
    isPanMode: boolean;
    private dragX;
    private dragY;
    private isScrollbarMouseDown;
    private scrollX;
    private scrollY;
    private ispageMoved;
    private isThumb;
    private isTapHidden;
    private singleTapTimer;
    private tapCount;
    private inputTapCount;
    /**
     * @private
     */
    isInitialLoaded: boolean;
    private loadRequestHandler;
    private unloadRequestHandler;
    private dowonloadRequestHandler;
    private pageRequestHandler;
    private virtualLoadRequestHandler;
    private exportAnnotationRequestHandler;
    private importAnnotationRequestHandler;
    private exportFormFieldsRequestHandler;
    private importFormFieldsRequestHandler;
    private annotationPageList;
    private importPageList;
    /**
     * @private
     */
    importedAnnotation: any;
    /**
     * @private
     */
    isImportAction: boolean;
    private isImportedAnnotation;
    private isAnnotationCollectionRemoved;
    /**
     * @private
     */
    tool: ToolBase;
    action: string;
    /**
     * @private
     */
    eventArgs: MouseEventArgs;
    /**
     * @private
     */
    inAction: boolean;
    /**
     * @private
     */
    isMouseDown: boolean;
    /**
     * @private
     */
    isStampMouseDown: boolean;
    /**
     * @private
     */
    currentPosition: PointModel;
    /**
     * @private
     */
    prevPosition: PointModel;
    private initialEventArgs;
    /**
     * @private
     */
    stampAdded: boolean;
    /**
     * @private
     */
    customStampCount: number;
    /**
     * @private
     */
    isDynamicStamp: boolean;
    private isMixedSizeDocument;
    /**
     * @private
     */
    customStampCollection: ICustomStampItems[];
    /**
     * @private
     */
    isAlreadyAdded: boolean;
    /**
     * @private
     */
    isWebkitMobile: boolean;
    /**
     * @private
     */
    isFreeTextContextMenu: boolean;
    /**
     * @private
     */
    signatureModule: Signature;
    /**
     * @private
     */
    isSelection: boolean;
    /**
     * @private
     */
    annotationComments: any;
    /**
     * @private
     */
    isToolbarSignClicked: boolean;
    /**
     * @private
     */
    signatureCount: number;
    /**
     * @private
     */
    isSignatureAdded: boolean;
    /**
     * @private
     */
    isNewSignatureAdded: boolean;
    /**
     * @private
     */
    currentSignatureAnnot: any;
    constructor(viewer: PdfViewer);
    /**
     * @private
     */
    initializeComponent(): void;
    private createMobilePageNumberContainer;
    /**
     * @private
     */
    initiatePageRender(documentData: string, password: string): void;
    private mobileScrollContainerDown;
    private setMaximumHeight;
    /**
     * @private
     */
    updateWidth(): void;
    /**
     * @private
     */
    updateHeight(): void;
    /**
     * @private
     */
    updateViewerContainer(): void;
    private updateViewerContainerSize;
    private mobileScrollContainerEnd;
    private createAjaxRequest;
    /**
     * @private
     */
    openNotificationPopup(errorString?: string): void;
    private requestSuccess;
    private pageRender;
    private renderPasswordPopup;
    private renderCorruptPopup;
    private constructJsonObject;
    private checkDocumentData;
    private setFileName;
    private saveDocumentInfo;
    private saveDocumentHashData;
    private saveFormfieldsData;
    private updateWaitingPopup;
    private createWaitingPopup;
    private showLoadingIndicator;
    private showPageLoadingIndicator;
    /**
     * @private
     */
    showPrintLoadingIndicator(isShow: boolean): void;
    private setLoaderProperties;
    /**
     * @private
     */
    updateScrollTop(pageNumber: number): void;
    /**
     * @private
     */
    getZoomFactor(): number;
    /**
     * @private
     */
    getPinchZoomed(): boolean;
    /**
     * @private
     */
    getMagnified(): boolean;
    private getPinchScrolled;
    private getPagesPinchZoomed;
    private getPagesZoomed;
    private getRerenderCanvasCreated;
    /**
     * @private
     */
    getDocumentId(): string;
    /**
     * @private
     */
    download(): void;
    /**
     * @private
     */
    saveAsBlob(): Promise<Blob>;
    private saveAsBlobRequest;
    /**
     * @private
     */
    clear(isTriggerEvent: boolean): void;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    unloadDocument(proxy: PdfViewerBase): void;
    /**
     * @private
     */
    private windowSessionStorageClear;
    private updateCommentPanel;
    /**
     * @private
     */
    focusViewerContainer(): void;
    private getScrollParent;
    private createCorruptedPopup;
    private closeCorruptPopup;
    private createPrintPopup;
    private createGoToPagePopup;
    private closeGoToPagePopUp;
    private EnableApplyButton;
    private DisableApplyButton;
    private GoToPageCancelClick;
    private GoToPageApplyClick;
    /**
     * @private
     */
    updateMobileScrollerPosition(): void;
    private createPasswordPopup;
    private passwordCancel;
    private passwordCancelClick;
    private passwordDialogReset;
    private applyPassword;
    private wireEvents;
    private unWireEvents;
    /**
     * @private
     */
    onWindowResize: () => void;
    /**
     * @private
     */
    updateZoomValue(): void;
    /**
     * @private
     */
    updateFreeTextProperties(annotation: any): void;
    private viewerContainerOnMousedown;
    private viewerContainerOnMouseup;
    private viewerContainerOnMouseWheel;
    private viewerContainerOnKeyDown;
    private viewerContainerOnMousemove;
    private panOnMouseMove;
    /**
     * @private
     */
    initiatePanning(): void;
    /**
     * @private
     */
    initiateTextSelectMode(): void;
    private enableAnnotationAddTools;
    private viewerContainerOnMouseLeave;
    private viewerContainerOnMouseEnter;
    private viewerContainerOnMouseOver;
    private viewerContainerOnClick;
    private applySelection;
    private viewerContainerOnDragStart;
    private viewerContainerOnContextMenuClick;
    private onWindowMouseUp;
    private onWindowTouchEnd;
    private viewerContainerOnTouchStart;
    private handleTaps;
    private handleTextBoxTaps;
    private onTextBoxDoubleTap;
    private onSingleTap;
    private onDoubleTap;
    private viewerContainerOnLongTouch;
    private viewerContainerOnPointerDown;
    private preventTouchEvent;
    private viewerContainerOnTouchMove;
    private viewerContainerOnPointerMove;
    private viewerContainerOnTouchEnd;
    private renderStampAnnotation;
    private viewerContainerOnPointerEnd;
    private initPageDiv;
    private renderElementsVirtualScroll;
    private renderPageElement;
    private renderPagesVirtually;
    private initiateRenderPagesVirtually;
    private tileRenderPage;
    private renderPage;
    private onPageRender;
    private renderTextContent;
    private renderPageContainer;
    private orderPageDivElements;
    /**
     * @private
     */
    renderPageCanvas(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): HTMLElement;
    /**
     * @private
     */
    updateLeftPosition(pageIndex: number): number;
    /**
     * @private
     */
    applyLeftPosition(pageIndex: number): void;
    private updatePageHeight;
    private viewerContainerOnScroll;
    private initiatePageViewScrollChanged;
    private renderCountIncrement;
    /**
     * @private
     */
    pageViewScrollChanged(currentPageNumber: number): void;
    private downloadDocument;
    private downloadExportAnnotationJson;
    /**
     * @private
     */
    exportFormFields(): void;
    /**
     * @private
     */
    importFormFields(source: any): void;
    /**
     * @private
     */
    createRequestForExportFormfields(isObject?: boolean): any;
    /**
     * @private
     */
    createRequestForImportingFormfields(source: any): void;
    private createFormfieldsJsonData;
    private constructJsonDownload;
    /**
     * @private
     */
    isFreeTextAnnotationModule(): boolean;
    private createRequestForDownload;
    /**
     * @private
     */
    getTileCount(pageWidth: any): number;
    private createRequestForRender;
    /**
     * @private
     */
    onControlError(status: number, errorMessage: string, action: string): void;
    /**
     * @private
     */
    getStoredData(pageIndex: number): any;
    /**
     * @private
     */
    storeWinData(data: any, pageIndex: number, tileX?: number, tileY?: number): void;
    /**
     * @private
     */
    setCustomAjaxHeaders(request: XMLHttpRequest): void;
    private getPinchZoomPage;
    private getWindowSessionStorage;
    private getWindowSessionStorageTile;
    private manageSessionStorage;
    private createBlobUrl;
    private getRandomNumber;
    private createGUID;
    /**
     * @private
     */
    isClickedOnScrollBar(event: MouseEvent, isNeedToSet?: boolean): boolean;
    private setScrollDownValue;
    /**
     * @private
     */
    disableTextSelectionMode(): void;
    /**
     * @private
     */
    getElement(idString: string): HTMLElement;
    /**
     * @private
     */
    getPageWidth(pageIndex: number): number;
    /**
     * @private
     */
    getPageHeight(pageIndex: number): number;
    /**
     * @private
     */
    getPageTop(pageIndex: number): number;
    private isAnnotationToolbarHidden;
    /**
     * @private
     */
    getTextMarkupAnnotationMode(): boolean;
    private isNewFreeTextAnnotation;
    private getCurrentTextMarkupAnnotation;
    /**
     * @private
     */
    getSelectTextMarkupCurrentPage(): number;
    /**
     * @private
     */
    getAnnotationToolStatus(): boolean;
    /**
     * @private
     */
    getPopupNoteVisibleStatus(): boolean;
    /**
     * @private
     */
    isTextMarkupAnnotationModule(): TextMarkupAnnotation;
    /**
     * @private
     */
    isShapeAnnotationModule(): boolean;
    /**
     * @private
     */
    isCalibrateAnnotationModule(): boolean;
    /**
     * @private
     */
    isStampAnnotationModule(): boolean;
    /**
     * @private
     */
    isCommentAnnotationModule(): boolean;
    /**
     * @private
     */
    isShapeBasedAnnotationsEnabled(): boolean;
    /** @private */
    getMousePosition(e: MouseEvent | PointerEvent | TouchEvent): PointModel;
    private getMouseEventArgs;
    /**
     * @private
     */
    findToolToActivate(obj: PdfAnnotationBaseModel, position: PointModel): Actions | string;
    private inflate;
    checkResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    checkForResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    /** @private */
    diagramMouseMove(evt: MouseEvent | TouchEvent): void;
    private updateDefaultCursor;
    /** @private */
    diagramMouseLeave(evt: MouseEvent | TouchEvent): void;
    private diagramMouseActionHelper;
    private setCursor;
    /** @private */
    getTool(action: Actions | string): ToolBase;
    /** @private */
    diagramMouseUp(evt: MouseEvent | TouchEvent): void;
    /**
     * @private
     */
    skipPreventDefault(target: HTMLElement): boolean;
    private isMetaKey;
    /**
     * @private
     */
    diagramMouseDown(evt: MouseEvent | TouchEvent): void;
    /**
     * @private
     */
    exportAnnotationsAsObject(): any;
    /**
     * @private
     */
    exportFormFieldsAsObject(): any;
    /**
     * @private
     */
    importAnnotations(importData: any): void;
    /**
     * @private
     */
    exportAnnotations(): void;
    private createRequestForExportAnnotations;
    private createRequestForImportAnnotations;
    /**
     * @private
     */
    openImportExportNotificationPopup(errorDetails: string): void;
    private reRenderAnnotations;
    private drawPageAnnotations;
    private checkAnnotationCollections;
    private checkAnnotationCommentsCollections;
    private saveImportedAnnotations;
    private savePageAnnotations;
    /**
     * @private
     */
    createAnnotationJsonData(): any;
    private combineImportedData;
    private updateExportItem;
    private isFreeTextAnnotation;
    private checkImportedData;
    /**
     * @private
     */
    deleteAnnotations(): void;
}
export {};
