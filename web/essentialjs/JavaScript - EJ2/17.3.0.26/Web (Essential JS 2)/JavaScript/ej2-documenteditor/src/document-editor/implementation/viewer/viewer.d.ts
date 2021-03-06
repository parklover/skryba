import { Dictionary } from '../../base/dictionary';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
import { WSectionFormat, WCharacterFormat, WParagraphFormat, WStyles } from '../format/index';
import { Layout } from './layout';
import { Renderer } from './render';
import { Page, Rect, Widget, FieldElementBox, ParagraphWidget, HeaderFooterWidget, EditRangeStartElementBox } from './page';
import { DocumentEditor } from '../../document-editor';
import { BodyWidget, LineWidget, TableWidget, TableRowWidget, TableCellWidget, BlockWidget, HeaderFooters, BookmarkElementBox } from './page';
import { Point } from '../editor/editor-helper';
import { TextHelper, TextHeightInfo } from './text-helper';
import { Selection } from '../index';
import { TextPosition } from '../selection/selection-helper';
import { Zoom } from './zooming';
import { Dialog } from '@syncfusion/ej2-popups';
import { HeaderFooterType, PageFitType, ProtectionType } from '../../base/types';
import { RestrictEditing } from '../restrict-editing/restrict-editing-pane';
/**
 * @private
 */
export declare abstract class LayoutViewer {
    /**
     * @private
     */
    owner: DocumentEditor;
    private visibleBoundsIn;
    /**
     * @private
     */
    pageContainer: HTMLElement;
    /**
     * @private
     */
    viewerContainer: HTMLElement;
    /**
     * @private
     */
    optionsPaneContainer: HTMLElement;
    /**
     * @private
     */
    pages: Page[];
    /**
     * @private
     */
    clientActiveArea: Rect;
    /**
     * @private
     */
    clientArea: Rect;
    /**
     * @private
     */
    textWrap: boolean;
    /**
     * @private
     */
    currentPage: Page;
    private selectionStartPageIn;
    private selectionEndPageIn;
    /**
     * @private
     */
    iframe: HTMLIFrameElement;
    /**
     * @private
     */
    editableDiv: HTMLElement;
    /**
     * @private
     */
    fieldStacks: FieldElementBox[];
    /**
     * @private
     */
    splittedCellWidgets: TableCellWidget[];
    /**
     * @private
     */
    tableLefts: number[];
    private tapCount;
    private timer;
    private isTimerStarted;
    /**
     * @private
     */
    isFirstLineFitInShiftWidgets: boolean;
    /**
     * @private
     */
    preZoomFactor: number;
    /**
     * @private
     */
    preDifference: number;
    /**
     * @private
     */
    fieldEndParagraph: ParagraphWidget;
    /**
     * @private
     */
    fieldToLayout: FieldElementBox;
    /**
     * @private
     */
    backgroundColor: string;
    /**
     * @private
     */
    layout: Layout;
    /**
     * @private
     */
    render: Renderer;
    /**
     * @private
     */
    containerTop: number;
    /**
     * @private
     */
    containerLeft: number;
    private containerCanvasIn;
    private selectionCanvasIn;
    /**
     * @private
     */
    zoomModule: Zoom;
    /**
     * @private
     */
    isMouseDown: boolean;
    /**
     * @private
     */
    isSelectionChangedOnMouseMoved: boolean;
    /**
     * @private
     */
    isControlPressed: boolean;
    /**
     * @private
     */
    touchStart: HTMLElement;
    /**
     * @private
     */
    touchEnd: HTMLElement;
    /**
     * @private
     */
    isTouchInput: boolean;
    /**
     * @private
     */
    useTouchSelectionMark: boolean;
    /**
     * @private
     */
    touchDownOnSelectionMark: number;
    /**
     * @private
     */
    textHelper: TextHelper;
    /**
     * @private
     */
    isComposingIME: boolean;
    /**
     * @private
     */
    lastComposedText: string;
    /**
     * @private
     */
    isCompositionStart: boolean;
    /**
     * @private
     */
    isCompositionUpdated: boolean;
    /**
     * @private
     */
    isCompositionCanceled: boolean;
    /**
     * @private
     */
    isCompositionEnd: boolean;
    /**
     * @private
     */
    prefix: string;
    /**
     * @private
     */
    suffix: string;
    private dialogInternal;
    private dialogTarget1;
    private dialogTarget2;
    private dialogInternal2;
    /**
     * @private
     */
    fields: FieldElementBox[];
    /**
     * @private
     */
    blockToShift: BlockWidget;
    /**
     * @private
     */
    heightInfoCollection: TextHeightInfo;
    private animationTimer;
    /**
     * @private
     */
    isListTextSelected: boolean;
    /**
     * @private
     */
    selectionLineWidget: LineWidget;
    /**
     * @private
     */
    characterFormat: WCharacterFormat;
    /**
     * @private
     */
    paragraphFormat: WParagraphFormat;
    /**
     * @private
     */
    renderedLists: Dictionary<WAbstractList, Dictionary<number, number>>;
    /**
     * @private
     */
    headersFooters: HeaderFooters[];
    private fieldSeparator;
    /**
     * @private
     */
    defaultTabWidth: number;
    /**
     * @private
     */
    lists: WList[];
    /**
     * @private
     */
    abstractLists: WAbstractList[];
    /**
     * @private
     */
    styles: WStyles;
    /**
     * @private
     */
    listParagraphs: ParagraphWidget[];
    /**
     * @private
     */
    preDefinedStyles: Dictionary<string, string>;
    /**
     * @private
     */
    isRowOrCellResizing: boolean;
    /**
     * @private
     */
    bookmarks: Dictionary<string, BookmarkElementBox>;
    /**
     * @private
     */
    editRanges: Dictionary<string, EditRangeStartElementBox[]>;
    private isMouseDownInFooterRegion;
    private pageFitTypeIn;
    /**
     * @private
     */
    fieldCollection: FieldElementBox[];
    /**
     * @private
     */
    isPageField: boolean;
    /**
     * @private
     */
    mouseDownOffset: Point;
    /**
     * @private
     */
    protected zoomX: number;
    /**
     * @private
     */
    protected zoomY: number;
    private zoomFactorInternal;
    /**
     * If movecaretposition is 1, Home key is pressed
     * If moveCaretPosition is 2, End key is pressed
     * @private
     */
    moveCaretPosition: number;
    /**
     * @private
     */
    isTextInput: boolean;
    /**
     * @private
     */
    isScrollHandler: boolean;
    /**
     * @private
     */
    triggerElementsOnLoading: boolean;
    /**
     * @private
     */
    triggerSpellCheck: boolean;
    /**
     * @private
     */
    scrollTimer: number;
    /**
     * @private

     */
    isScrollToSpellCheck: boolean;
    /**
     * preserve the format
     * @private
     */
    restrictFormatting: boolean;
    /**
     * preserve the document protection type either readonly or no protection
     * @private
     */
    protectionType: ProtectionType;
    /**
     * Preserve the password protection is enforced or not
     * @private
     */
    isDocumentProtected: boolean;
    /**
     * preserve the hash value of password
     * @private
     */
    hashValue: string;
    /**
     * @private
     */
    saltValue: string;
    /**
     * @private
     */
    userCollection: string[];
    /**
     * @private
     */
    restrictEditingPane: RestrictEditing;
    /**
     * @private
     */
    cachedPages: number[];
    longTouchTimer: number;
    /**
     * @private
     */
    skipScrollToPosition: boolean;
    /**
     * Gets container canvas.
     * @private
     */
    readonly containerCanvas: HTMLCanvasElement;
    /**
     * Gets selection canvas.
     * @private
     */
    readonly selectionCanvas: HTMLCanvasElement;
    /**
     * Gets container context.
     * @private
     */
    readonly containerContext: CanvasRenderingContext2D;
    /**
     * Gets selection context.
     * @private
     */
    readonly selectionContext: CanvasRenderingContext2D;
    /**
     * Gets the current rendering page.
     */
    readonly currentRenderingPage: Page;
    /**
     * Gets visible bounds.
     * @private
     */
    readonly visibleBounds: Rect;
    /**
     * Gets or sets zoom factor.
     * @private
     */
    zoomFactor: number;
    /**
     * Gets the selection.
     * @private
     */
    readonly selection: Selection;
    /**
     * Gets or sets selection start page.
     * @private
     */
    selectionStartPage: Page;
    /**
     * Gets or sets selection end page.
     * @private
     */
    selectionEndPage: Page;
    /**
     * Gets the initialized default dialog.
     * @private
     */
    readonly dialog: Dialog;
    /**
     * Gets the initialized default dialog.
     * @private
     */
    readonly dialog2: Dialog;
    /**
     * Gets or sets page fit type.
     * @private
     */
    pageFitType: PageFitType;
    constructor(owner: DocumentEditor);
    private initalizeStyles;
    /**
     * @private
     */
    clearDocumentItems(): void;
    /**
     * @private
     */
    setDefaultDocumentFormat(): void;
    private setDefaultCharacterValue;
    private setDefaultParagraphValue;
    /**
     * @private
     */
    getAbstractListById(id: number): WAbstractList;
    /**
     * @private
     */
    getListById(id: number): WList;
    /**
     * @private
     */
    static getListLevelNumber(listLevel: WListLevel): number;
    /**
     * Gets the bookmarks.
     * @private
     */
    getBookmarks(includeHidden?: boolean): string[];
    /**
     * Initializes components.
     * @private
     */
    initializeComponents(): void;
    /**
     * @private
     */
    private createEditableDiv;
    /**
     * @private
     */
    private createEditableIFrame;
    private initIframeContent;
    /**
     * Wires events and methods.
     */
    private wireEvent;
    private wireInputEvents;
    private onIframeLoad;
    /**
     * @private
     */
    private onTextInput;
    /**
     * Fires when composition starts.
     * @private
     */
    private compositionStart;
    /**
     * Fires on every input during composition.
     * @private
     */
    private compositionUpdated;
    /**
     * Fires when user selects a character/word and finalizes the input.
     * @private
     */
    private compositionEnd;
    private getEditableDivTextContent;
    /**
     * @private
     */
    positionEditableTarget(): void;
    private onImageResizer;
    private onKeyPressInternal;
    private onTextInputInternal;
    /**
     * Fired on paste.
     * @param {ClipboardEvent} event
     * @private
     */
    onPaste: (event: ClipboardEvent) => void;
    /**
     * Initializes dialog template.
     */
    private initDialog;
    /**
     * Initializes dialog template.
     */
    private initDialog2;
    /**
     * Fires when editable div loses focus.
     * @private
     */
    onFocusOut: () => void;
    /**
     * Updates focus to editor area.
     * @private
     */
    updateFocus: () => void;
    /**
     * Clears the context.
     * @private
     */
    clearContent(): void;
    /**
     * Fired when the document gets changed.
     * @param {WordDocument} document
     */
    onDocumentChanged(sections: BodyWidget[]): void;
    /**
     * Fires on scrolling.
     */
    private scrollHandler;
    /**
     * Fires when the window gets resized.
     * @private
     */
    onWindowResize: () => void;
    /**
     * @private
     */
    onContextMenu: (event: PointerEvent) => void;
    /**
     * Initialize touch ellipse.
     */
    private initTouchEllipse;
    /**
     * Updates touch mark position.
     * @private
     */
    updateTouchMarkPosition(): void;
    /**
     * Called on mouse down.
     * @param {MouseEvent} event
     * @private
     */
    onMouseDownInternal: (event: MouseEvent) => void;
    /**
     * Called on mouse move.
     * @param {MouseEvent} event
     * @private
     */
    onMouseMoveInternal: (event: MouseEvent) => void;
    /**
     * Fired on double tap.
     * @param {MouseEvent} event
     * @private
     */
    onDoubleTap: (event: MouseEvent) => void;
    /**
     * Called on mouse up.
     * @param {MouseEvent} event
     * @private
     */
    onMouseUpInternal: (event: MouseEvent) => void;
    private isSelectionInListText;
    /**
     * Check whether touch point is inside the rectangle or not.
     * @param x
     * @param y
     * @param width
     * @param height
     * @param touchPoint
     * @private
     */
    isInsideRect(x: number, y: number, width: number, height: number, touchPoint: Point): boolean;
    /**
     * @private
     */
    getLeftValue(widget: LineWidget): number;
    /**
     * Checks whether left mouse button is pressed or not.
     */
    private isLeftButtonPressed;
    /**
     * Fired on touch start.
     * @param {TouchEvent} event
     * @private
     */
    onTouchStartInternal: (event: Event) => void;
    /**
     * Fired on long touch
     * @param {TouchEvent} event
     * @private
     */
    onLongTouch: (event: TouchEvent) => void;
    /**
     * Fired on touch move.
     * @param {TouchEvent} event
     * @private
     */
    onTouchMoveInternal: (event: TouchEvent) => void;
    /**
     * Fired on touch up.
     * @param {TouchEvent} event
     * @private
     */
    onTouchUpInternal: (event: TouchEvent) => void;
    /**
     * Updates selection for touch position.
     * @param point
     * @param touchPoint
     */
    private updateSelectionOnTouch;
    /**
     * Gets touch offset value.
     * @private
     */
    getTouchOffsetValue(event: TouchEvent): Point;
    /**
     * Fired on pinch zoom in.
     * @param {TouchEvent} event
     */
    private onPinchInInternal;
    /**
     * Fired on pinch zoom out.
     * @param {TouchEvent} event
     */
    private onPinchOutInternal;
    /**
     * Gets page width.
     * @private
     */
    getPageWidth(page: Page): number;
    /**
     * Removes specified page.
     * @private
     */
    removePage(page: Page): void;
    /**
     * Updates viewer size on window resize.
     * @private
     */
    updateViewerSize(): void;
    /**
     * Updates viewer size.
     */
    private updateViewerSizeInternal;
    /**
     * Updates client area for block.
     * @private
     */
    updateClientAreaForBlock(block: BlockWidget, beforeLayout: boolean, tableCollection?: TableWidget[]): void;
    private tableAlignmentForBidi;
    /**
     * Updates client active area left.
     * @private
     */
    cutFromLeft(x: number): void;
    /**
     * Updates client active area top.
     * @private
     */
    cutFromTop(y: number): void;
    /**
     * Updates client width.
     * @private
     */
    updateClientWidth(width: number): void;
    /**
     * Inserts page in specified index.
     * @private
     */
    insertPage(index: number, page: Page): void;
    /**
     * Updates client area.
     * @private
     */
    updateClientArea(sectionFormat: WSectionFormat, page: Page): void;
    /**
     * Updates client area left or top position.
     * @private
     */
    updateClientAreaTopOrLeft(tableWidget: TableWidget, beforeLayout: boolean): void;
    /**
     * Updates client area for table.
     * @private
     */
    updateClientAreaForTable(tableWidget: TableWidget): void;
    /**
     * Updates client area for row.
     * @private
     */
    updateClientAreaForRow(row: TableRowWidget, beforeLayout: boolean): void;
    /**
     * Updates client area for cell.
     * @private
     */
    updateClientAreaForCell(cell: TableCellWidget, beforeLayout: boolean): void;
    /**
     * Updates the client area based on widget.
     * @private
     */
    updateClientAreaByWidget(widget: ParagraphWidget): void;
    /**
     * Updates client area location.
     * @param widget
     * @param area
     * @private
     */
    updateClientAreaLocation(widget: Widget, area: Rect): void;
    /**
     * Updates text position for selection.
     * @param cursorPoint
     * @param tapCount
     * @param clearMultiSelection
     * @private
     */
    updateTextPositionForSelection(cursorPoint: Point, tapCount: number): void;
    /**
     * Scrolls to specified position.
     * @param startPosition
     * @param endPosition
     * @private
     */
    scrollToPosition(startPosition: TextPosition, endPosition: TextPosition, skipCursorUpdate?: boolean): void;
    /**
     * Gets line widget using cursor point.
     * @private
     */
    getLineWidget(cursorPoint: Point): LineWidget;
    /**
     * Gets line widget.
     * @private
     */
    getLineWidgetInternal(cursorPoint: Point, isMouseDragged: boolean): LineWidget;
    /**
     * @private
     */
    isBlockInHeader(block: Widget): boolean;
    /**
     * Clears selection highlight.
     * @private
     */
    clearSelectionHighlight(): void;
    /**
     * Fired on keyup event.
     * @private
     */
    onKeyUpInternal: (event: KeyboardEvent) => void;
    /**
     * Fired on keydown.
     * @private
     */
    onKeyDownInternal: (event: KeyboardEvent) => void;
    /**
     * @private
     */
    removeEmptyPages(): void;
    /**
     * @private
     */
    scrollToBottom(): void;
    /**
     * Returns the field code result.
     * @private
     */
    getFieldResult(fieldBegin: FieldElementBox, page: Page): string;
    /**
     * Returns field text.
     */
    private getFieldText;
    /**
     * Destroys the internal objects maintained for control.
     */
    destroy(): void;
    /**
     * Un-Wires events and methods
     */
    private unWireEvent;
    /**
     * @private
     */
    abstract createNewPage(section: BodyWidget, index?: number): Page;
    /**
     * @private
     */
    abstract renderVisiblePages(): void;
    /**
     * @private
     */
    abstract updateScrollBars(): void;
    /**
     * private
     */
    abstract scrollToPage(pageIndex: number): void;
    protected abstract updateCursor(event: MouseEvent): void;
    /**
     * @private
     */
    abstract findFocusedPage(point: Point, updateCurrentPage: boolean): Point;
    /**
     * @private
     */
    abstract onPageFitTypeChanged(pageFitType: PageFitType): void;
}
/**
 * @private
 */
export declare class PageLayoutViewer extends LayoutViewer {
    private pageLeft;
    /**
     * @private
     */
    readonly pageGap: number;
    /**
     * @private
     */
    visiblePages: Page[];
    /**
     * Initialize the constructor of PageLayoutViewer
     */
    constructor(owner: DocumentEditor);
    /**
     * Creates new page.
     * @private
     */
    createNewPage(section: BodyWidget, index?: number): Page;
    /**
     * Updates cursor.
     */
    protected updateCursor(event: MouseEvent): void;
    /**
     * Finds focused page.
     * @private
     */
    findFocusedPage(currentPoint: Point, updateCurrentPage: boolean): Point;
    /**
     * Fired when page fit type changed.
     * @private
     */
    onPageFitTypeChanged(pageFitType: PageFitType): void;
    /**
     * @private
     */
    handleZoom(): void;
    /**
     * Gets current page header footer.
     * @private
     */
    getCurrentPageHeaderFooter(section: BodyWidget, isHeader: boolean): HeaderFooterWidget;
    /**
     * Get header footer type
     * @private
     */
    getHeaderFooterType(section: BodyWidget, isHeader: boolean): HeaderFooterType;
    /**
     * Gets current header footer.
     * @param type
     * @param section
     * @private
     */
    getCurrentHeaderFooter(type: HeaderFooterType, sectionIndex: number): HeaderFooterWidget;
    private createHeaderFooterWidget;
    /**
     * Gets header footer.
     * @param type
     * @private
     */
    getHeaderFooter(type: HeaderFooterType): number;
    /**
     * Updates header footer client area.
     * @private
     */
    updateHFClientArea(sectionFormat: WSectionFormat, isHeader: boolean): void;
    /**
     * @private
     */
    updateHCFClientAreaWithTop(sectionFormat: WSectionFormat, isHeader: boolean, page: Page): void;
    /**
     * Scrolls to the specified page
     * @private
     */
    scrollToPage(pageIndex: number): void;
    /**
     * Updates scroll bars.
     * @private
     */
    updateScrollBars(): void;
    updateScrollBarPosition(containerWidth: number, containerHeight: number, viewerWidth: number, viewerHeight: number, width: number, height: number): void;
    /**
     * Updates visible pages.
     * @private
     */
    updateVisiblePages(): void;
    /**
     * Adds visible pages.
     */
    private addVisiblePage;
    /**
     * Render specified page widgets.
     */
    private renderPage;
    /**
     * Renders visible pages.
     * @private
     */
    renderVisiblePages(): void;
}
