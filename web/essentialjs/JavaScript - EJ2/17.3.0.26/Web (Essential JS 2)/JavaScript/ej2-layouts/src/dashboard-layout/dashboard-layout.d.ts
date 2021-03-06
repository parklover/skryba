import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { Draggable, DragEventArgs } from '@syncfusion/ej2-base';
import { EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { DashboardLayoutModel, PanelModel } from './dashboard-layout-model';
/**
 * Defines the panel of the DashboardLayout component.
 */
export declare class Panel extends ChildProperty<Panel> {
    /**
     * Defines the id of the panel.

     */
    id: string;
    /**
     * Defines the CSS class name that can be appended with each panel element.

     */
    cssClass: string;
    /**
     * Defines the template value that should be displayed as the panel's header.
     */
    header: string | HTMLElement;
    /**
     * Defines the template value that should be displayed as the panel's content.
     */
    content: string | HTMLElement;
    /**
     * Defines whether to the panel should be enabled or not.

     */
    enabled: boolean;
    /**
     * Defines a row value where the panel should be placed.



     */
    row: number;
    /**
     * Defines the column value where the panel to be placed.



     */
    col: number;
    /**
     * Specifies the width of the panel in the layout in cells count.
     *

     */
    sizeX: number;
    /**
     * Specifies the height of the panel in the layout in cells count.
     *

     */
    sizeY: number;
    /**
     * Specifies the minimum height of the panel in cells count.
     *

     */
    minSizeY: number;
    /**
     * Specifies the minimum width of the panel in cells count.
     * *

     */
    minSizeX: number;
    /**
     * Specifies the maximum height of the panel in cells count.
     * *



     *
     */
    maxSizeY: number;
    /**
     * Specifies the maximum width of the panel in cells count.
     * *



     */
    maxSizeX: number;
    /**
     * Specifies the z-index of the panel
     * *



     */
    zIndex: number;
}
/**
 * The DashboardLayout is a grid structured layout control, that helps to create a dashboard with panels.
 * Panels hold the UI components or data to be visualized with flexible options like resize, reorder, drag-n-drop, remove and add,
 * that allows users to easily place the panels at a desired position within the grid layout.
 * ```html
 * <div id="default-layout">
 * ```
 * ```typescript
 * <script>
 *   let dashBoardObject : DashboardLayout = new DashboardLayout();
 *   dashBoardObject.appendTo('#default-layout');
 * </script>
 * ```
 */
export declare class DashboardLayout extends Component<HTMLElement> implements INotifyPropertyChanged {
    protected panelCollection: HTMLElement[];
    protected checkCollision: HTMLElement[];
    protected mainElement: HTMLElement;
    protected rows: number;
    protected dragobj: Draggable;
    protected dragStartArgs: DragStartArgs;
    protected dragStopEventArgs: DragStopArgs;
    protected draggedEventArgs: DraggedEventArgs;
    protected updatedRows: number;
    protected tempObject: DashboardLayout;
    protected sortedArray: HTMLElement[][];
    protected cloneArray: HTMLElement[][];
    protected panelID: number;
    protected movePanelCalled: boolean;
    protected resizeCalled: boolean;
    protected gridPanelCollection: PanelModel[];
    protected overlapElement: HTMLElement[];
    protected shouldRestrict: boolean;
    protected shouldSubRestrict: boolean;
    protected overlapElementClone: HTMLElement[];
    protected overlapSubElementClone: HTMLElement[];
    protected dragCollection: Draggable[];
    protected iterationValue: number;
    protected shadowEle: HTMLElement;
    protected elementRef: {
        top: string;
        left: string;
        height: string;
        width: string;
    };
    protected allItems: HTMLElement[];
    protected dimensions: (string | number)[];
    protected oldRowCol: {
        [key: string]: {
            row: number;
            col: number;
        };
    };
    protected collisionChecker: {
        [key: string]: {
            ele: HTMLElement;
            row: number;
            srcEle: HTMLElement;
        };
    };
    protected availableClasses: string[];
    protected addPanelCalled: boolean;
    protected isSubValue: boolean;
    protected direction: number;
    protected directionRow: number;
    protected lastMouseX: number;
    protected lastMouseY: number;
    protected elementX: number;
    protected elementY: number;
    protected elementWidth: number;
    protected elementHeight: number;
    protected previousRow: number;
    protected originalWidth: number;
    protected originalHeight: number;
    protected handleClass: string;
    protected mOffX: number;
    protected mOffY: number;
    protected maxTop: number;
    protected maxRows: number;
    protected maxLeft: number;
    protected mouseX: number;
    protected mouseY: number;
    protected minTop: number;
    protected minLeft: number;
    protected moveTarget: HTMLElement;
    protected upTarget: HTMLElement;
    protected downTarget: HTMLElement;
    protected leftAdjustable: boolean;
    protected rightAdjustable: boolean;
    protected topAdjustable: boolean;
    protected spacedColumnValue: number;
    protected checkingElement: HTMLElement;
    protected panelContent: HTMLElement;
    protected panelHeaderElement: HTMLElement;
    protected panelBody: HTMLElement;
    protected startRow: number;
    protected startCol: number;
    protected maxColumnValue: number;
    protected checkColumnValue: number;
    protected spacedRowValue: number;
    protected cellSize: number[] | string[];
    protected table: HTMLElement;
    protected cloneObject: {
        [key: string]: {
            row: number;
            col: number;
        };
    };
    private panelsInitialModel;
    protected isRenderComplete: boolean;
    protected isMouseUpBound: boolean;
    /**
     * If allowDragging is set to true, then the DashboardLayout allows you to drag and reorder the panels.
     * *

     */
    allowDragging: boolean;
    /**
     * If allowResizing is set to true, then the DashboardLayout allows you to resize the panels.

     */
    allowResizing: boolean;
    /**
     * If pushing is set to true, then the DashboardLayout allow to push the panels when panels collide
     * while dragging or resizing the panels.
     * *

     * @private
     */
    private allowPushing;
    /**
     * If allowFloating is set to true, then the DashboardLayout automatically move the panels upwards to fill the empty available
     * cells while dragging or resizing the panels.
     * *

     */
    allowFloating: boolean;
    /**
     * Defines the cell aspect ratio of the panel.

     */
    cellAspectRatio: number;
    /**
     * Defines the spacing between the panels.
     * *

     */
    cellSpacing: number[];
    /**
     * Defines the number of columns to be created in the DashboardLayout.

     */
    columns: number;
    /**
     *
     * *

     */
    showGridLines: boolean;
    /**
     * Defines the draggable handle selector which will act as dragging handler for the panels.
     * *

     */
    draggableHandle: string;
    /**
     * Locale property.
     * This is not a dashboard layout property.

     * @private
     */
    locale: string;
    /**
     * Defines the media query value where the dashboardlayout becomes stacked layout when the resolution meets.

     */
    mediaQuery: string;
    /**
     *
     * Defines the panels property of the DashboardLayout component.
     *

     */
    panels: PanelModel[];
    /**
     * Defines the resizing handles directions used for resizing the panels.

     *
     */
    resizableHandles: string[];
    /**
     * Triggers whenever the panels positions are changed.
     * @event

     */
    change: EmitType<ChangeEventArgs>;
    /**
     * Triggers when a panel is about to drag.
     * @event

     */
    dragStart: EmitType<DragStartArgs>;
    /**
     * Triggers while a panel is dragged continuously.
     * @event

     */
    drag: EmitType<DraggedEventArgs>;
    /**
     * Triggers when a dragged panel is dropped.
     * @event

     */
    dragStop: EmitType<DragStopArgs>;
    /**
     * Triggers when a panel is about to resize.
     * @event

     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers when a panel is being resized continuously.
     * @event

     */
    resize: EmitType<ResizeArgs>;
    /**
     * Triggers when a panel resize ends.
     * @event

     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Triggers when Dashboard Layout is created.
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when Dashboard Layout is destroyed.
     * @event

     */
    destroyed: EmitType<Object>;
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void;
    protected setOldRowCol(): void;
    protected createPanelElement(cssClass: string, idValue: string): HTMLElement;
    /**
     * To Initialize the control rendering.
     * @returns void
     * @private
     */
    protected render(): void;
    private initGridLines;
    private initialize;
    protected checkMediaQuery(): boolean;
    protected calculateCellSize(): void;
    protected maxRow(recheck?: boolean): number;
    protected maxCol(): number;
    protected updateOldRowColumn(): void;
    protected createSubElement(cssClass: string, idValue: string, className: string): HTMLElement;
    private templateParser;
    protected renderTemplate(content: string, appendElement: HTMLElement, type: string, isStringTemplate: boolean): void;
    protected renderPanels(cellElement: HTMLElement, panelModel: PanelModel, panelId: string, isStringTemplate: boolean): HTMLElement;
    protected disablePanel(panelElement: HTMLElement): void;
    protected getInlinePanels(panelElement: HTMLElement): void;
    private resizeEvents;
    protected bindEvents(): void;
    protected downResizeHandler(e: MouseEvent): void;
    protected downHandler(e: MouseEvent | TouchEvent): void;
    protected touchDownResizeHandler(e: TouchEvent): void;
    private getCellSize;
    protected updateMaxTopLeft(e: MouseEvent | TouchEvent): void;
    protected updateResizeElement(el: HTMLElement): void;
    protected moveResizeHandler(e: MouseEvent): void;
    protected touchMoveResizeHandler(e: TouchEvent): void;
    protected resizingPanel(el: HTMLElement, panelModel: PanelModel, currentX: number, currentY: number): void;
    protected upResizeHandler(e: MouseEvent | TouchEvent): void;
    protected getResizeRowColumn(item: PanelModel, e: HTMLElement): PanelModel;
    protected pixelsToColumns(pixels: number, isCeil: boolean): number;
    protected pixelsToRows(pixels: number, isCeil: boolean): number;
    protected getMinWidth(item: PanelModel): number;
    protected getMaxWidth(item: PanelModel): number;
    protected getMinHeight(item: PanelModel): number;
    protected getMaxHeight(item: PanelModel): number;
    protected sortedPanel(): void;
    protected moveItemsUpwards(): void;
    protected moveItemUpwards(item: HTMLElement): void;
    private sortItem;
    protected updateLayout(element: HTMLElement, panelModel: PanelModel): void;
    refresh(): void;
    protected updateGridLines(): void;
    protected checkDragging(dragCollection: Draggable[]): void;
    protected sortPanels(): PanelModel[];
    protected checkMediaQuerySizing(): void;
    protected panelResponsiveUpdate(): void;
    protected updateRowHeight(): void;
    protected setHeightWidth(): void;
    protected setHeightAndWidth(panelElement: HTMLElement, panelModel: PanelModel): void;
    protected renderCell(panel: PanelModel, isStringTemplate: boolean): HTMLElement;
    protected setPanelPosition(cellElement: HTMLElement, row: number, col: number): void;
    protected getRowColumn(): void;
    protected setMinMaxValues(panel: PanelModel): void;
    protected checkMinMaxValues(panel: PanelModel): void;
    protected panelPropertyChange(panel: PanelModel, value: IChangePanel): void;
    protected renderDashBoardCells(cells: PanelModel[]): void;
    protected collisions(row: number, col: number, sizeX: number, sizeY: number, ignore: HTMLElement[] | HTMLElement): HTMLElement[];
    protected rightWardsSpaceChecking(rowElements: HTMLElement[], col: number, ele: HTMLElement): number[];
    protected getOccupiedColumns(element: HTMLElement, type: string): number[];
    protected leftWardsSpaceChecking(rowElements: HTMLElement[], col: number, ele: HTMLElement): number[];
    protected adjustmentAvailable(row: number, col: number, sizeY: number, sizeX: number, ele: HTMLElement): boolean;
    protected isXSpacingAvailable(spacing: number[], sizeX?: number): boolean;
    protected getRowElements(base: HTMLElement[]): HTMLElement[];
    protected isLeftAdjustable(spaces: number[], ele: HTMLElement, row: number, col: number, sizeX: number, sizeY: number): boolean;
    protected isRightAdjustable(spacing: number[], ele: HTMLElement, row: number, col: number, sizeX: number, sizeY: number): boolean;
    protected replacable(spacing: number[], sizeX: number, row: number, sizeY: number, ele: HTMLElement): boolean;
    protected sortCollisionItems(collisionItems: HTMLElement[]): HTMLElement[];
    protected updatedModels(collisionItems: HTMLElement[], panelModel: PanelModel, ele: HTMLElement): HTMLElement[];
    protected resetLayout(model: PanelModel, element: HTMLElement): HTMLElement[];
    protected swapAvailability(collisions: HTMLElement[], element: HTMLElement): boolean;
    protected checkForSwapping(collisions: HTMLElement[], element: HTMLElement, panelModel: PanelModel): boolean;
    protected swapItems(collisions: HTMLElement[], element: HTMLElement, panelModel: PanelModel): void;
    protected updatePanelLayout(element: HTMLElement, panelModel: PanelModel): void;
    protected checkForCompletePushing(): void;
    protected updateCollisionChecked(item: HTMLElement): void;
    protected updateRowColumn(row: number, ele: HTMLElement[], srcEle: HTMLElement): void;
    protected collisionPanel(collisionModels: HTMLElement[], colValue: number, updatedRow: number, clone: HTMLElement): void;
    protected removeResizeClasses(panelElements: HTMLElement[]): void;
    protected setClasses(panelCollection: HTMLElement[]): void;
    protected setResizingClass(ele?: HTMLElement, container?: HTMLElement): void;
    protected setXYAttributes(element: HTMLElement, panelModel: PanelModel): void;
    protected setXYDimensions(panelModel: PanelModel): (string | number)[];
    protected getRowColumnDragValues(args: DragEventArgs): number[];
    protected enableDraggingContent(collections: HTMLElement[]): void;
    protected updatePanels(): void;
    protected updateDragArea(): void;
    protected updateRowsHeight(row: number, sizeY: number, addRows: number): void;
    private onDraggingStart;
    private cloneModels;
    private onDragStart;
    protected getPanelBase(args: HTMLElement | DragEventArgs | String): HTMLElement;
    protected getPanel(row: number, column: number, excludeItems: HTMLElement[] | HTMLElement): PanelModel;
    protected setHolderPosition(args: DragEventArgs): void;
    protected getCellInstance(idValue: string): PanelModel;
    /**
     * Allows to add a panel to the Dashboardlayout.
     * @param {panel: [`PanelModel`](./panelModel)} panel -  Defines the panel element.
     * @returns void
     */
    addPanel(panel: PanelModel): void;
    /**
     * Allows to update a panel in the DashboardLayout.
     * @param {panel: [`panelModel`](./panelModel)} panel - Defines the panel element.
     * @returns void
     */
    updatePanel(panel: PanelModel): void;
    protected updateCloneArrayObject(): void;
    /**
     * Returns the panels object of the DashboardLayout.
     * @returns [`PanelModel[]`](./panelModel)
     */
    serialize(): PanelModel[];
    /**
     * Removes all the panels from the DashboardLayout.
     */
    removeAll(): void;
    /**
     * Removes the panel from the DashboardLayout.
     * @param {id: string} id -  Defines the panel ID.
     * @returns void
     */
    removePanel(id: string): void;
    constructor(options?: DashboardLayoutModel, element?: string | HTMLInputElement);
    /**
     * Moves the panel in the DashboardLayout.
     * @param {id: string} id - Defines the panel ID.
     * @param {row: number} row - Defines the row of dashboard layout.
     * @param {col: number} col - Defines the column of dashboard layout.
     * @returns void
     */
    movePanel(id: string, row: number, col: number): void;
    protected setAttributes(value: IAttributes, ele: HTMLElement): void;
    /**
     * Resize the panel in the DashboardLayout.
     * @param {id: string} id - Defines the panel ID.
     * @param {sizeX: number} sizeX - Defines the sizeX of dashboard layout.
     * @param {sizeY: number} sizeY - Defines the sizeY of dashboard layout.
     */
    resizePanel(id: string, sizeX: number, sizeY: number): void;
    /**
     * Destroys the DashboardLayout component
     * @returns void
     */
    destroy(): void;
    private removeAllPanel;
    protected setEnableRtl(): void;
    protected getDragInstance(id: string): Draggable;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    private updateCellSizeAndSpacing;
    private updatePanelsDynamically;
    private checkForIDValues;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    onPropertyChanged(newProp: DashboardLayoutModel, oldProp: DashboardLayoutModel): void;
    /**
     * Gets the properties to be maintained upon browser refresh.
     * @returns string
     */
    getPersistData(): string;
    /**
     * Returns the current module name.
     * @returns string
     * @private
     */
    protected getModuleName(): string;
}
/**
 * Defines the dragstart event arguments
 */
export interface DragStartArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel: boolean;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
}
/**
 * Defines the change event arguments
 */
export interface ChangeEventArgs {
    /**
     * Specifies the model values of the position changed panels.
     */
    changedPanels: PanelModel[];
}
/**
 * Defines the Drag event arguments
 */
export interface DraggedEventArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
    /**
     * Specifies the element below the cell element being dragged.
     */
    target: HTMLElement;
}
/**
 * Defines the dragstop event arguments
 */
export interface DragStopArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being dragged.
     */
    element: HTMLElement;
}
/**
 * Defines the resize event arguments
 */
export interface ResizeArgs {
    /**
     * Specifies the original event.
     */
    event: MouseEvent | TouchEvent;
    /**
     * Specifies the cell element being resized.
     */
    element: HTMLElement;
}
interface IAttributes {
    [key: string]: {
        sizeX?: string | number;
        sizeY?: string | number;
        minSizeX?: string | number;
        minSizeY?: string | number;
        maxSizeX?: string | number;
        maxSizeY?: string | number;
        row?: string | number;
        col?: string | number;
    };
}
interface IChangePanel {
    sizeX?: number;
    sizeY?: number;
    minSizeX?: number;
    minSizeY?: number;
    maxSizeX?: number;
    maxSizeY?: number;
    row?: number;
    col?: number;
    id?: string;
    header?: string | HTMLElement;
    content?: string | HTMLElement;
}
export {};
