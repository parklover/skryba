/**
 * Maps Component file
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { L10n, Internationalization } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Size, Point } from './utils/helper';
import { LayerSettings } from './model/base';
import { ZoomSettingsModel, LegendSettingsModel, LayerSettingsModel, MarkerSettingsModel } from './model/base-model';
import { TitleSettingsModel, BorderModel, MarginModel, CenterPositionModel } from './model/base-model';
import { MapsAreaSettingsModel, AnnotationModel } from './model/base-model';
import { Bubble } from './layers/bubble';
import { Legend } from './layers/legend';
import { Marker } from './layers/marker';
import { Highlight } from './user-interaction/highlight';
import { Selection } from './user-interaction/selection';
import { MapsTooltip } from './user-interaction/tooltip';
import { Zoom } from './user-interaction/zoom';
import { ProjectionType, MapsTheme, PanDirection, TooltipGesture } from './utils/enum';
import { MapsModel } from './maps-model';
import { ILoadEventArgs, ILoadedEventArgs, IMouseEventArgs, IResizeEventArgs, ITooltipRenderEventArgs } from './model/interface';
import { GeoPosition, ITooltipRenderCompleteEventArgs } from './model/interface';
import { ILayerRenderingEventArgs, IShapeRenderingEventArgs, IMarkerRenderingEventArgs, IMarkerClickEventArgs } from './model/interface';
import { IMarkerMoveEventArgs, ILabelRenderingEventArgs, IBubbleMoveEventArgs, IBubbleClickEventArgs } from './model/interface';
import { IMarkerClusterClickEventArgs, IMarkerClusterMoveEventArgs, IMarkerClusterRenderingEventArgs } from './model/interface';
import { ISelectionEventArgs, IShapeSelectedEventArgs, IMapPanEventArgs, IMapZoomEventArgs } from './model/interface';
import { IBubbleRenderingEventArgs, IAnimationCompleteEventArgs, IPrintEventArgs, IThemeStyle } from './model/interface';
import { LayerPanel } from './layers/layer-panel';
import { GeoLocation, Rect } from '../maps/utils/helper';
import { Annotations } from '../maps/user-interaction/annotation';
import { DataLabel, IAnnotationRenderingEventArgs } from './index';
import { NavigationLine } from './layers/navigation-selected-line';
import { ExportType } from '../maps/utils/enum';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';
/**
 * Represents the Maps control.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
export declare class Maps extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * `bubbleModule` is used to add bubble to the maps.
     */
    bubbleModule: Bubble;
    /**
     * `markerModule` is used to add marker to the maps.
     */
    markerModule: Marker;
    /**
     * `dataLabelModule` is used to add datalabel to the maps.
     */
    dataLabelModule: DataLabel;
    /**
     * `highlightModule` is used to add highlight to the maps.
     */
    highlightModule: Highlight;
    /**
     * `navigationLineModule` is used to add navigationLine to the maps.
     */
    navigationLineModule: NavigationLine;
    /**
     * `legendModule` is used to add legend to the maps.
     */
    legendModule: Legend;
    /**
     * `selectionModule` is used to add selection to the maps.
     */
    selectionModule: Selection;
    /**
     * `mapsTooltipModule` is used to add tooltip to the maps.
     */
    mapsTooltipModule: MapsTooltip;
    /**
     * `zoomModule` is used to add zoom to the maps.
     */
    zoomModule: Zoom;
    /**
     *  annotationModule is used to place the any text or images into the maps.
     */
    annotationsModule: Annotations;
    /**
     * To configure the background of the maps container.

     */
    background: string;
    /**
     * To enable the separator

     */
    useGroupingSeparator: boolean;
    /**
     * To apply internationalization for maps

     */
    format: string;
    /**
     * To configure width of maps.

     */
    width: string;
    /**
     * To configure height of maps.

     */
    height: string;
    /**
     * To configure the tooltip gesture

     */
    tooltipDisplayMode: TooltipGesture;
    /**
     * To configure the title settings of the maps.
     */
    titleSettings: TitleSettingsModel;
    /**
     * To configure the zoom settings of the maps.
     */
    zoomSettings: ZoomSettingsModel;
    /**
     * To configure the legend settings of the maps.
     */
    legendSettings: LegendSettingsModel;
    /**
     * To configure the layers settings of the maps.
     */
    layers: LayerSettingsModel[];
    /**
     *  Options for customizing the annotation of maps.
     */
    annotations: AnnotationModel[];
    /**
     *  Options to customize left, right, top and bottom margins of the maps.
     */
    margin: MarginModel;
    /**
     * Options for customizing the color and width of the maps border.
     */
    border: BorderModel;
    /**
     * Specifies the theme for the maps.

     */
    theme: MapsTheme;
    /**
     * Specifies the ProjectionType for the maps.

     */
    projectionType: ProjectionType;
    /**
     * To configure baseMapIndex of maps. Option to select which layer to be visible.

     */
    baseLayerIndex: number;
    /**
     * Description for maps.

     */
    description: string;
    /**
     * TabIndex value for the maps.

     */
    tabIndex: number;
    /**
     * To configure the zoom level of maps.
     */
    centerPosition: CenterPositionModel;
    /**
     * To customization Maps area
     */
    mapsArea: MapsAreaSettingsModel;
    /**
     * Triggers before maps rendered.
     * @event

     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers before the prints gets started.
     * @event

     */
    beforePrint: EmitType<IPrintEventArgs>;
    /**
     * Triggers after maps rendered.
     * @event

     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers on clicking the maps.
     * @event

     */
    click: EmitType<IMouseEventArgs>;
    /**
     * Triggers on double clicking the maps.
     * @event

     */
    doubleClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers on right clicking the maps.
     * @event

     */
    rightClick: EmitType<IMouseEventArgs>;
    /**
     * Triggers on resizing the maps.
     * @event

     */
    resize: EmitType<IResizeEventArgs>;
    /**
     * Triggers before the maps tooltip rendered.

     * @event

     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers after the maps tooltip rendered.

     * @event

     */
    tooltipRenderComplete: EmitType<ITooltipRenderCompleteEventArgs>;
    /**
     * Triggers while clicking the shape
     * @event

     */
    shapeSelected: EmitType<IShapeSelectedEventArgs>;
    /**
     * Triggers before selection applied
     * @event

     */
    itemSelection: EmitType<ISelectionEventArgs>;
    /**
     * Trigger before highlight applied
     * @event

     */
    itemHighlight: EmitType<ISelectionEventArgs>;
    /**
     * Triggers before highlight applied for shape
     * @event

     */
    shapeHighlight: EmitType<IShapeSelectedEventArgs>;
    /**
     * Triggers before the maps layer rendered.
     * @event


     */
    layerRendering: EmitType<ILayerRenderingEventArgs>;
    /**
     * Triggers before the maps shape rendered.
     * @event


     */
    shapeRendering: EmitType<IShapeRenderingEventArgs>;
    /**
     * Triggers before the maps marker rendered.

     * @event

     */
    markerRendering: EmitType<IMarkerRenderingEventArgs>;
    /**
     * Triggers before the maps marker cluster rendered.

     * @event
     */
    markerClusterRendering: EmitType<IMarkerClusterRenderingEventArgs>;
    /**
     * Triggers event mouse clicking on the maps marker element.
     * @event

     */
    markerClick: EmitType<IMarkerClickEventArgs>;
    /**
     * Triggers event mouse clicking on the maps Cluster element.
     * @event
     */
    markerClusterClick: EmitType<IMarkerClusterClickEventArgs>;
    /**
     * Triggers event mouse moving on the maps cluster element.
     * @event
     */
    markerClusterMouseMove: EmitType<IMarkerClusterMoveEventArgs>;
    /**
     * Triggers event mouse moving on the maps marker element.
     * @event

     */
    markerMouseMove: EmitType<IMarkerMoveEventArgs>;
    /**
     * Triggers before the data label get rendered.
     * @event

     */
    dataLabelRendering: EmitType<ILabelRenderingEventArgs>;
    /**
     * Triggers before the maps bubble rendered.
     * @event

     */
    bubbleRendering: EmitType<IBubbleRenderingEventArgs>;
    /**
     * Triggers event mouse clicking on the maps bubble element.
     * @event

     */
    bubbleClick: EmitType<IBubbleClickEventArgs>;
    /**
     * Triggers event mouse moving on the maps bubble element.
     * @event

     */
    bubbleMouseMove: EmitType<IBubbleMoveEventArgs>;
    /**
     * Triggers after the animation completed.
     * @event

     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before annotation rendering.
     * @event

     */
    annotationRendering: EmitType<IAnnotationRenderingEventArgs>;
    /**
     * Triggers before zoom in or zoom out.
     * @event

     */
    zoom: EmitType<IMapZoomEventArgs>;
    /**
     * Triggers before panning.
     * @event

     */
    pan: EmitType<IMapPanEventArgs>;
    /**
     * Format method
     * @private
     */
    formatFunction: Function;
    /**
     * svg renderer object.
     * @private
     */
    renderer: SvgRenderer;
    /**
     * maps svg element's object
     * @private
     */
    svgObject: Element;
    /** @public */
    mapScaleValue: number;
    /**
     * Maps available height, width
     * @private
     */
    availableSize: Size;
    /**
     * localization object
     * @private
     */
    localeObject: L10n;
    /**
     * It contains default values of localization values
     */
    private defaultLocalConstants;
    /**
     * Internal use of internationalization instance.
     * @private
     */
    intl: Internationalization;
    /**
     * Check layer whether is normal or tile
     * @private
     */
    isTileMap: boolean;
    /**
     * Resize the map
     */
    private resizeTo;
    /**
     * @private
     * Stores the map area rect
     */
    mapAreaRect: Rect;
    /**
     * @private
     * Stores layers collection for rendering
     */
    layersCollection: LayerSettings[];
    /**
     * @private
     * Calculate the axes bounds for map.

     */
    mapLayerPanel: LayerPanel;
    /**
     * @private
     * Render the data label.

     */
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /**
     * @private
     * Stores the legend bounds
     */
    totalRect: Rect;
    dataLabel: DataLabel;
    /** @private */
    isTouch: boolean;
    /** @private */
    baseSize: Size;
    /** @private */
    scale: number;
    /** @private */
    baseScale: number;
    /** @private */
    baseMapBounds: GeoLocation;
    /** @private */
    baseMapRectBounds: Object;
    /** @public */
    translatePoint: Point;
    /** @private */
    baseTranslatePoint: Point;
    /** @public */
    zoomTranslatePoint: Point;
    /** @public */
    previousProjection: String;
    /** @private */
    tileTranslatePoint: Point;
    /** @private */
    baseTileTranslatePoint: Point;
    /** @private */
    isDevice: Boolean;
    /** @private */
    tileZoomLevel: number;
    /** @private */
    serverProcess: Object;
    /** @private */
    previousScale: number;
    /** @private */
    previousPoint: Point;
    /** @public */
    dataLabelShape: number[];
    zoomShapeCollection: object[];
    zoomLabelPositions: object[];
    mouseDownEvent: Object;
    mouseClickEvent: Object;
    /** @private */
    isBlazor: boolean;
    /**
     * Constructor for creating the widget
     */
    constructor(options?: MapsModel, element?: string | HTMLElement);
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    getLocalizedLabel(key: string): string;
    /**
     * Initializing pre-required values.
     */
    protected preRender(): void;
    /**
     * To Initialize the control rendering.
     */
    protected render(): void;
    protected processRequestJsonData(): void;
    private processAjaxRequest;
    processResponseJsonData(processType: string, data?: object | string, layer?: LayerSettings, dataType?: string): void;
    private renderMap;
    /**
     * To append blazor templates
     */
    private blazorTemplates;
    /**
     * Render the map area border
     */
    private renderArea;
    /**
     * To add tab index for map element
     */
    private addTabIndex;
    private zoomingChange;
    private createSecondaryElement;
    private arrangeTemplate;
    private createTile;
    /**
     * To initilize the private varibales of maps.
     */
    private initPrivateVariable;
    private findBaseAndSubLayers;
    /**
     * @private
     * Render the map border
     */
    private renderBorder;
    /**
     * @private
     * Render the title and subtitle
     */
    private renderTitle;
    /**
     * To create svg element for maps
     */
    private createSVG;
    /**
     * To Remove the SVG
     */
    private removeSvg;
    /**
     * To bind event handlers for maps.
     */
    private wireEVents;
    /**
     * To unbind event handlers from maps.
     */
    private unWireEVents;
    mouseLeaveOnMap(e: PointerEvent): void;
    /**
     * To handle the click event for the maps.

     */
    mapsOnClick(e: PointerEvent): void;
    /**
     *
     */
    mouseEndOnMap(e: PointerEvent): boolean;
    /**
     *
     */
    mouseDownOnMap(e: PointerEvent): void;
    /**
     * To handle the double click event for the maps.

     */
    mapsOnDoubleClick(e: PointerEvent): void;
    /**
     *
     */
    mouseMoveOnMap(e: PointerEvent): void;
    onMouseMove(e: PointerEvent): boolean;
    private titleTooltip;
    mapsOnResize(e: Event): boolean;
    /**
     * To zoom the map by specifies the center position
     * @param centerPosition
     * @param zoomFactor
     */
    zoomByPosition(centerPosition: {
        latitude: number;
        longitude: number;
    }, zoomFactor: number): void;
    /**
     * To pan the map by specifies the direction
     * @param direction
     */
    panByDirection(direction: PanDirection): void;
    /**
     * To add layer
     * @param layer
     */
    addLayer(layer: Object): void;
    /**
     * To remove layer
     * @param index
     */
    removeLayer(index: number): void;
    /**
     * To add marker
     * @param layerIndex
     * @param marker
     */
    addMarker(layerIndex: number, markerCollection: MarkerSettingsModel[]): void;
    /**
     * Method to set culture for maps
     */
    private setCulture;
    /**
     * Method to set locale constants
     */
    private setLocaleConstants;
    /**
     * To destroy maps control.
     */
    destroy(): void;
    /**
     * Get component name
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    onPropertyChanged(newProp: MapsModel, oldProp: MapsModel): void;
    /**
     * To provide the array of modules needed for maps rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * To find marker visibility
     */
    private isMarkersVisible;
    /**
     * To find DataLabel visibility
     */
    private isDataLabelVisible;
    /**
     * To find navigation line visibility
     */
    private isNavigationVisible;
    /**
     * To find marker visibility
     */
    private isBubbleVisible;
    /**
     * To find the bubble visibility from layer
     * @private
     */
    getBubbleVisible(layer: LayerSettingsModel): boolean;
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
    /**
     * To find visibility of layers and markers for required modules load.
     */
    private findVisibleLayers;
    /**
     * To get the geo location
     * @param {number} layerIndex
     * @param {PointerEvent} location
     * @return GeoPosition
     */
    getGeoLocation(layerIndex: number, location: PointerEvent): GeoPosition;
    private clip;
    /**
     * To get the geo location
     * @param {PointerEvent}
     * @return GeoPosition
     */
    getTileGeoLocation(location: PointerEvent): GeoPosition;
    pointToLatLong(pageX: number, pageY: number): Object;
}
