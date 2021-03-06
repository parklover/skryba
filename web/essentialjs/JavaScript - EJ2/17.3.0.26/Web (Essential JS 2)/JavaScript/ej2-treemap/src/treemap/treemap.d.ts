/**
 * Tree Map Components
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, Internationalization } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { BorderModel, TitleSettingsModel, MarginModel, LevelSettingsModel } from './model/base-model';
import { LeafItemSettingsModel, TooltipSettingsModel, LegendSettingsModel, InitialDrillSettingsModel } from './model/base-model';
import { HighlightSettingsModel, SelectionSettingsModel } from './model/base-model';
import { TreeMapModel } from './treemap-model';
import { LayoutMode, TreeMapTheme, RenderingMode } from './utils/enum';
import { ILoadEventArgs, ILoadedEventArgs, IPrintEventArgs } from '../treemap/model/interface';
import { ILegendItemRenderingEventArgs, ILegendRenderingEventArgs } from '../treemap/model/interface';
import { IItemRenderingEventArgs, IResizeEventArgs, IDoubleClickEventArgs } from '../treemap/model/interface';
import { IItemClickEventArgs, IItemMoveEventArgs, IMouseMoveEventArgs } from '../treemap/model/interface';
import { IDrillStartEventArgs, IItemSelectedEventArgs, ITreeMapTooltipRenderEventArgs } from '../treemap/model/interface';
import { IItemHighlightEventArgs, IDrillEndEventArgs, IThemeStyle } from '../treemap/model/interface';
import { Size, Rect } from '../treemap/utils/helper';
import { TreeMapAjax } from '../treemap/utils/helper';
import { LayoutPanel } from './layout/render-panel';
import { TreeMapTooltip } from './user-interaction/tooltip';
import { ExportType } from '../treemap/utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
import { TreeMapHighlight, TreeMapSelection } from './user-interaction/highlight-selection';
import { TreeMapLegend } from './layout/legend';
import { DataManager, Query } from '@syncfusion/ej2-data';
/**
 * Represents the TreeMap control.
 * ```html
 * <div id="container"/>
 * <script>
 *   var treemap = new TreeMap();
 *   treemap.appendTo("#container");
 * </script>
 * ```
 */
export declare class TreeMap extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `tooltipModule` is used to render the treemap tooltip.
     */
    treeMapTooltipModule: TreeMapTooltip;
    /**
     * `highlightModule` is used for highlight the items.
     */
    treeMapHighlightModule: TreeMapHighlight;
    /**
     * `selectionModule` is used for select the items.
     */
    treeMapSelectionModule: TreeMapSelection;
    /**
     * `legendModule` is used for render the legend items.
     */
    treeMapLegendModule: TreeMapLegend;
    /**
     * Specifies the width by given pixel or percentage.

     */
    width: string;
    /**
     * Specifies the height by given pixel or percentage.

     */
    height: string;
    /**
     * Specifies the border of tree map.
     */
    border: BorderModel;
    /**
     * Specifies the margin to move the render area.
     */
    margin: MarginModel;
    /**
     * Specifies the background.
     */
    background: string;
    /**
     * Specifies the theme.
     */
    theme: TreeMapTheme;
    /**
     * Specifies the title for tree map.
     */
    titleSettings: TitleSettingsModel;
    /**
     * Specifies the rendering of layout type.
     */
    layoutType: LayoutMode;
    /**
     * Specifies the dataSource.



     */
    dataSource: DataManager | TreeMapAjax | Object[];
    /**
     * Specifies the query for filter the data.

     */
    query: Query;
    /**
     * Specifies the weight value path
     */
    weightValuePath: string;
    /**
     * Specifies the colorValuePath
     */
    rangeColorValuePath: string;
    /**
     * Specifies the colorValuePath
     */
    equalColorValuePath: string;
    /**
     * Specifies the colorValuePath from dataSource
     */
    colorValuePath: string;
    /**
     * Specifies the palette colors.
     */
    palette: string[];
    /**
     * Specifies the rendering of layout of the treemap items.

     */
    renderDirection: RenderingMode;
    /**
     * To enable or disable the drillDown.
     */
    enableDrillDown: boolean;
    /**
     * To render the text from right to left.
     */
    enableBreadcrumb: boolean;
    /**
     * To add the breadCrumb connector.
     */
    breadcrumbConnector: string;
    /**
     * To control the drillDown view.
     */
    drillDownView: boolean;
    /**
     * Specifies the initial drillDown.
     */
    initialDrillDown: InitialDrillSettingsModel;
    /**
     * Specifies to access all leaf items in levels.
     */
    leafItemSettings: LeafItemSettingsModel;
    /**
     * Specifies the item levels.
     */
    levels: LevelSettingsModel[];
    /**
     * To specifies the highlight settings.
     */
    highlightSettings: HighlightSettingsModel;
    /**
     * To specifies the selection settings.
     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Specifies the tooltip settings.
     */
    tooltipSettings: TooltipSettingsModel;
    /**
     * Specifies the legend settings.
     */
    legendSettings: LegendSettingsModel;
    /**
     * To enable the separator

     */
    useGroupingSeparator: boolean;
    /**
     * Description for maps.

     */
    description: string;
    /**
     * TabIndex value for treemap.

     */
    tabIndex: number;
    /**
     * To apply internationalization for treemap

     */
    format: string;
    /**
     * Triggers before treemap rendered.
     * @event
     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers before the prints gets started.
     * @event

     */
    beforePrint: EmitType<IPrintEventArgs>;
    /**
     * Triggers after treemap rendered.
     * @event

     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before item rendering.
     * @event

     */
    itemRendering: EmitType<IItemRenderingEventArgs>;
    /**
     * Triggers the drillDown start.
     * @event

     */
    drillStart: EmitType<IDrillStartEventArgs>;
    /**
     * Triggers the drillDown end.
     * @event

     */
    drillEnd: EmitType<IDrillEndEventArgs>;
    /**
     * Triggers the item selected.
     * @event

     */
    itemSelected: EmitType<IItemSelectedEventArgs>;
    /**
     * Triggers the item highlight.
     * @event

     */
    itemHighlight: EmitType<IItemHighlightEventArgs>;
    /**
     * Triggers the tooltip rendering.
     * @event


     */
    tooltipRendering: EmitType<ITreeMapTooltipRenderEventArgs>;
    /**
     * Triggers the item click.
     * @event

     */
    itemClick: EmitType<IItemClickEventArgs>;
    /**
     * Triggers the item move.
     * @event

     */
    itemMove: EmitType<IItemMoveEventArgs>;
    /**
     * Triggers the click event.
     * @event

     */
    click: EmitType<IItemClickEventArgs>;
    /**
     * Triggers on double clicking the maps.
     * @event

     */
    doubleClick: EmitType<IDoubleClickEventArgs>;
    /**
     * Triggers on right clicking the maps.
     * @event

     */
    rightClick: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers the mouse move event.
     * @event

     */
    mouseMove: EmitType<IMouseMoveEventArgs>;
    /**
     * Triggers the resize event.
     * @event

     */
    resize: EmitType<IResizeEventArgs>;
    /**
     * Triggers the legend item rendering.
     * @event

     */
    legendItemRendering: EmitType<ILegendItemRenderingEventArgs>;
    /**
     * Triggers the legend rendering event.
     * @event


     */
    legendRendering: EmitType<ILegendRenderingEventArgs>;
    /**
     * svg renderer object.
     * @private
     */
    renderer: SvgRenderer;
    /**
     * treemap svg element object
     * @private
     */
    svgObject: Element;
    /**
     *  Stores the exact size of treemap.
     * @private
     */
    availableSize: Size;
    /**
     * Internal use of internationalization instance.
     * @private
     */
    intl: Internationalization;
    /**
     * @private
     * Stores the area bounds.
     */
    areaRect: Rect;
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /**
     * @private
     * Stores the legend bounds.
     */
    totalRect: Rect;
    /** @private */
    layout: LayoutPanel;
    /** @private */
    orientation: string;
    /** @private */
    drilledItems: Object[];
    /** @private */
    drilledLegendItems: Object;
    /** @private */
    currentLevel: number;
    /** @private */
    isHierarchicalData: boolean;
    /** @private */
    private resizeTo;
    /** @private */
    private mouseDown;
    /** @private */
    private drillMouseMove;
    /** @private */
    doubleTapTimer: Object;
    /** @private */
    isBlazor: boolean;
    /**s
     * Constructor for TreeMap component.
     */
    constructor(options?: TreeMapModel, element?: string | HTMLElement);
    protected preRender(): void;
    protected render(): void;
    private processDataManager;
    private renderTreeMapElements;
    protected createSvg(): void;
    /**
     * To initilize the private varibales of treemap.
     */
    private initPrivateVariable;
    private createSecondaryElement;
    private elementChange;
    /**
     * @private
     * Render the treemap border
     */
    private renderBorder;
    private renderTitle;
    protected processingData(): void;
    private checkIsHierarchicalData;
    private processHierarchicalData;
    /**
     * Handles the print method for chart control.
     */
    print(id?: string[] | string | Element): void;
    /**
     * Handles the export method for chart control.
     * @param type
     * @param fileName
     */
    export(type: ExportType, fileName: string, orientation?: PdfPageOrientation): void;
    private processFlatJsonData;
    reOrderLevelData(start: number): void;
    findTotalWeight(processData: Object[], type: string): void;
    /**
     * To unbind event handlers for treemap.
     */
    private unWireEVents;
    /**
     * To bind event handlers for treemap.
     */
    private wireEVents;
    /**
     * Method to set culture for maps
     */
    private setCulture;
    /**
     * To add tab index for treemap element
     */
    private addTabIndex;
    /**
     * To handle the window resize event on treemap.
     */
    resizeOnTreeMap(e: Event): void;
    clickOnTreeMap(e: PointerEvent): void;
    doubleClickOnTreeMap(e: PointerEvent): void;
    rightClickOnTreeMap(e: PointerEvent): void;
    mouseDownOnTreeMap(e: PointerEvent): void;
    mouseMoveOnTreeMap(e: PointerEvent): void;
    calculateSelectedTextLevels(labelText: String, item: Object): Object;
    calculatePreviousLevelChildItems(labelText: String, drillLevelValues: Object, item: Object, directLevel: boolean): boolean;
    compareSelectedLabelWithDrillDownItems(drillLevelValues: Object, item: Object, i: number): Object;
    mouseEndOnTreeMap(e: PointerEvent): void;
    mouseLeaveOnTreeMap(e: PointerEvent): void;
    /**
     * To provide the array of modules needed for maps rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    onPropertyChanged(newProp: TreeMapModel, oldProp: TreeMapModel): void;
    /**
     * Get component name
     */
    getModuleName(): string;
    /**
     * To destroy the treemap control.
     */
    destroy(): void;
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    getPersistData(): string;
}
/**
 * @private
 */
export declare class LevelsData {
    static levelsData: object[];
    static defaultLevelsData: object[];
    static hierarchyData: object[];
}
