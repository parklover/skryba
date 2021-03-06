import { Component, ChildProperty } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { SplitterModel, PanePropertiesModel } from './splitter-model';
/**
 * Interface to configure pane properties such as its content, size, min, max, resizable, collapsed and collapsible.
 */
export declare class PaneProperties extends ChildProperty<PaneProperties> {
    /**
     * Configures the properties for each pane.

     */
    size: string;
    /**
     * Specifies whether a pane is collapsible or not collapsible.

     */
    collapsible: boolean;
    /**
     * Specifies whether a pane is collapsed or not collapsed at the initial rendering of splitter.

     */
    collapsed: boolean;
    /**
     * Specifies the value whether a pane is resizable. By default, the Splitter is resizable in all panes.
     * You can disable this for any specific panes using this property.

     */
    resizable: boolean;
    /**
     * Specifies the minimum size of a pane. The pane cannot be resized if it is less than the specified minimum size.

     */
    min: string;
    /**
     * Specifies the maximum size of a pane. The pane cannot be resized if it is more than the specified maximum limit.

     */
    max: string;
    /**
     * Specifies the content of split pane as plain text, HTML markup, or any other JavaScript controls.


     */
    content: string | HTMLElement;
}
/**
 * Specifies a value that indicates whether to align the split panes horizontally or vertically.
 */
export declare type Orientation = 'Horizontal' | 'Vertical';
/**
 * Splitter is a layout user interface (UI) control that has resizable and collapsible split panes.
 * The container can be split into multiple panes, which are oriented horizontally or vertically.
 * The separator (divider) splits the panes and resizes and expands/collapses the panes.
 * The splitter is placed inside the split pane to make a nested layout user interface.
 *
 * ```html
 * <div id="splitter">
 *  <div> Left Pane </div>
 *  <div> Center Pane </div>
 *  <div> Right Pane </div>
 * </div>
 * ```
 * ```typescript
 * <script>
 *   var splitterObj = new Splitter({ width: '300px', height: '200px'});
 *   splitterObj.appendTo('#splitter');
 * </script>
 * ```
 */
export declare class Splitter extends Component<HTMLElement> {
    private allPanes;
    private paneOrder;
    private separatorOrder;
    private currentSeparator;
    private allBars;
    private previousCoordinates;
    private currentCoordinates;
    private totalWidth;
    private totalPercent;
    private order;
    private previousPane;
    private nextPane;
    private prevPaneIndex;
    private previousPaneHeightWidth;
    private updatePrePaneInPercentage;
    private updateNextPaneInPercentage;
    private prePaneDimenson;
    private nextPaneDimension;
    private panesDimensions;
    private border;
    private wrapper;
    private wrapperParent;
    private sizeFlag;
    private prevPaneCurrentWidth;
    private nextPaneCurrentWidth;
    private nextPaneIndex;
    private nextPaneHeightWidth;
    private validDataAttributes;
    private validElementAttributes;
    private arrow;
    private currentBarIndex;
    private prevBar;
    private nextBar;
    private splitInstance;
    private leftArrow;
    private rightArrow;
    private iconsDelay;
    /**
     * Specifies the height of the Splitter component that accepts both string and number values.

     */
    height: string;
    /**
     * Specifies the width of the Splitter control, which accepts both string and number values as width.
     * The string value can be either in pixel or percentage format.

     */
    width: string;
    /**
     * Configures the individual pane behaviors such as content, size, resizable, minimum, maximum validation, collapsible and collapsed.

     */
    paneSettings: PanePropertiesModel[];
    /**
     * Specifies a value that indicates whether to align the split panes horizontally or vertically.
     *  * Set the orientation property as "Horizontal" to create a horizontal splitter that aligns the panes left-to-right.
     *  * Set the orientation property as "Vertical" to create a vertical splitter that aligns the panes top-to-bottom.

     */
    orientation: Orientation;
    /**
     * Specifies the CSS class names that defines specific user-defined
     * styles and themes to be appended on the root element of the Splitter.
     * It is used to customize the Splitter control.
     * One or more custom CSS classes can be specified to the Splitter.

     */
    cssClass: string;
    /**
     * Specifies boolean value that indicates whether the component is enabled or disabled.
     * The Splitter component does not allow to interact when this property is disabled.

     */
    enabled: boolean;
    /**
     * Specifies the size of the separator line for both horizontal or vertical orientation.
     * The separator is used to separate the panes by lines.

     */
    separatorSize: number;
    /**
     * Triggers after creating the splitter component with its panes.
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when the split pane is started to resize.
     * @event

     */
    resizeStart: EmitType<ResizeEventArgs>;
    /**
     * Triggers when a split pane is being resized.
     * @event

     */
    resizing: EmitType<ResizingEventArgs>;
    /**
     * Triggers when the resizing of split pane is stopped.
     * @event

     */
    resizeStop: EmitType<ResizingEventArgs>;
    /**
     * Triggers when before panes get collapsed.
     * @event

     */
    beforeCollapse: EmitType<BeforeExpandEventArgs>;
    /**
     * Triggers when before panes get expanded.
     * @event

     */
    beforeExpand: EmitType<BeforeExpandEventArgs>;
    /**
     * Triggers when after panes get collapsed.
     * @event

     */
    collapsed: EmitType<ExpandedEventArgs>;
    /**
     * Triggers when after panes get expanded.
     * @event

     */
    expanded: EmitType<ExpandedEventArgs>;
    /**
     * Initializes a new instance of the Splitter class.
     * @param options  - Specifies Splitter model properties as options.
     * @param element  - Specifies the element that is rendered as an Splitter.
     */
    constructor(options?: SplitterModel, element?: string | HTMLElement);
    /**
     * Gets called when the model property changes.The data that describes the old and new values of the property that changed.
     * @param  {SplitterModel} newProp
     * @param  {SplitterModel} oldProp
     * @returns void
     * @private
     */
    onPropertyChanged(newProp: SplitterModel, oldProp: SplitterModel): void;
    protected preRender(): void;
    protected getPersistData(): string;
    /**
     * Returns the current module name.
     * @returns string
     * @private
     */
    protected getModuleName(): string;
    /**
     * To Initialize the control rendering
     * @private
     */
    render(): void;
    private onDocumentClick;
    private checkDataAttributes;
    private destroyPaneSettings;
    private setPaneSettings;
    private checkArrow;
    private removeDataPrefix;
    private setRTL;
    private setSplitterSize;
    private getPanesDimensions;
    private setCssClass;
    private hideResizer;
    private showResizer;
    private resizableModel;
    private collapsibleModelUpdate;
    private collapseArrow;
    private updateIsCollapsed;
    private isCollapsed;
    private targetArrows;
    private collapsedOnchange;
    private isEnabled;
    private setSeparatorSize;
    private changeOrientation;
    private checkSplitPane;
    private collectPanes;
    private getPrevPane;
    private getNextPane;
    private addResizeHandler;
    private getHeight;
    private getWidth;
    private setDimension;
    private updateCollapseIcons;
    private createSeparator;
    private updateResizablePanes;
    private addSeparator;
    private isResizable;
    private addMouseActions;
    private getEventType;
    private updateCurrentSeparator;
    private isSeparator;
    private isMouseEvent;
    private updateCursorPosition;
    private changeCoordinates;
    private reportWindowSize;
    private wireResizeEvents;
    private unwireResizeEvents;
    private wireClickEvents;
    private clickHandler;
    private expandAction;
    private hideTargetBarIcon;
    private showTargetBarIcon;
    private updateIconsOnCollapse;
    private collapseAction;
    private beforeAction;
    private splitterProperty;
    private showCurrentBarIcon;
    private updateIconsOnExpand;
    private afterAction;
    private currentIndex;
    private getSeparatorIndex;
    private getPrevBar;
    private getNextBar;
    private updateBars;
    private splitterDetails;
    private onMouseDown;
    private updatePaneFlexBasis;
    private removePercentageUnit;
    private convertPercentageToPixel;
    private convertPixelToPercentage;
    private convertPixelToNumber;
    private calcDragPosition;
    private getSeparatorPosition;
    private getMinMax;
    private getPreviousPaneIndex;
    private getNextPaneIndex;
    private getPaneDetails;
    private getPaneHeight;
    private isValidSize;
    private getPaneDimensions;
    private checkCoordinates;
    private isCursorMoved;
    private getBorder;
    private onMouseMove;
    private validateMinRange;
    private validateMaxRange;
    private validateMinMaxValues;
    private equatePaneWidths;
    private calculateCurrentDimensions;
    private addStaticPaneClass;
    private validateDraggedPosition;
    private onMouseUp;
    private panesDimension;
    private setTemplate;
    private templateCompile;
    private compileElement;
    private paneCollapsible;
    private createSplitPane;
    /**
     * expands corresponding pane based on the index is passed.
     * @param { number } index - Specifies the index value of the corresponding pane to be expanded at initial rendering of splitter.
     * @returns void
     */
    expand(index: number): void;
    /**
     * collapses corresponding pane based on the index is passed.
     * @param { number } index - Specifies the index value of the corresponding pane to be collapsed at initial rendering of splitter.
     * @returns void
     */
    collapse(index: number): void;
    /**
     * Removes the control from the DOM and also removes all its related events.
     * @returns void
     */
    destroy(): void;
    private addPaneClass;
    private removePaneOrders;
    private setPaneOrder;
    private removeSeparator;
    private updatePanes;
    /**
     * Allows you to add a pane dynamically to the specified index position by passing the pane properties.
     * @param { PanePropertiesModel } paneProperties - Specifies the pane’s properties that apply to new pane.
     * @param { number } index - Specifies the index where the pane will be inserted.
     * @returns void
     */
    addPane(paneProperties: PanePropertiesModel, index: number): void;
    /**
     * Allows you to remove the specified pane dynamically by passing its index value.
     * @param { number } index - Specifies the index value to remove the corresponding pane.
     * @returns void
     */
    removePane(index: number): void;
}
export interface ResizeEventArgs {
    /** Contains the root element of resizing pane. */
    element?: HTMLElement;
    /** Contains default event arguments. */
    event?: Event;
    /** Contains the corresponding resizing pane. */
    pane?: HTMLElement[];
    /** Contains the index of resizing pane. */
    index?: number[];
    /** Contains the resizing pane’s separator element. */
    separator?: HTMLElement;
    /**
     * Control the resize action whether the resize action happens continuously.
     * When you set this argument to true, resize process will be stopped.
     */
    cancel?: boolean;
}
export interface ResizingEventArgs {
    /** Contains the root element of resizing pane. */
    element?: HTMLElement;
    /** Contains default event arguments. */
    event?: Event;
    /** Contains a pane size when it resizes. */
    paneSize?: number[];
    /** Contains the corresponding resizing pane. */
    pane?: HTMLElement[];
    /** Contains the index of resizing pane. */
    index?: number[];
    /** Contains the resizing pane’s separator element. */
    separator?: HTMLElement;
}
export interface BeforeExpandEventArgs {
    /**
     * To access root element after control created
     */
    element?: HTMLElement;
    /**
     * default event arguments
     */
    event?: Event;
    /**
     * To get pane elements
     */
    pane?: HTMLElement[];
    /**
     * Index of pane
     */
    index?: number[];
    /**
     * Respective split-bar element
     */
    separator?: HTMLElement;
    /**
     * cancel argument
     */
    cancel?: boolean;
}
export interface ExpandedEventArgs {
    /**
     * To access root element after control created
     */
    element?: HTMLElement;
    /**
     * default event arguments
     */
    event?: Event;
    /**
     * To get pane elements
     */
    pane?: HTMLElement[];
    /**
     * Index of pane
     */
    index?: number[];
    /**
     * Respective split-bar element
     */
    separator?: HTMLElement;
}
