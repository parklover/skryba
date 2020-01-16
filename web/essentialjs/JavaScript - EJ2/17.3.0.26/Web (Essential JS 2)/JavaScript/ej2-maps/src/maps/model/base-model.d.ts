import { Property, ChildProperty, Complex, Collection } from '@syncfusion/ej2-base';import { DataManager, Query } from '@syncfusion/ej2-data';import { Alignment, LegendPosition, LegendType, LegendMode, ShapeLayerType, Type, MarkerType, Orientation, MapAjax } from '../../index';import { SmartLabelMode, IntersectAction } from '../../index';import { Theme } from './theme';import { Point, GeoLocation } from '../utils/helper';import { BingMapType, LegendArrangement, LegendShape, BubbleType } from '../utils/enum';import { AnnotationAlignment, GeometryType, LabelPosition, LabelIntersectAction } from '../index';

/**
 * Interface for a class Annotation
 */
export interface AnnotationModel {

    /**
     * Specifies the id of html element.
     */
    content?: string;

    /**
     * Specifies the position of x.
     */
    x?: string;

    /**
     * Specifies the position of y.
     */
    y?: string;

    /**
     * Specifies the vertical alignment of annotation.

     */
    verticalAlignment?: AnnotationAlignment;

    /**
     * Specifies the horizontal alignment of annotation.

     */
    horizontalAlignment?: AnnotationAlignment;

    /**
     * Specifies the zIndex of the annotation.

     */
    zIndex?: string;

}

/**
 * Interface for a class Arrow
 */
export interface ArrowModel {

    /**
     * arrowPosition
     */
    position?: string;

    /**
     * show
     */
    showArrow?: boolean;

    /**
     * size
     */
    size?: number;

    /**
     * color
     */
    color?: string;

    /**
     * offset the arrow in navigation line by specified pixels
     */
    offSet?: number;

}

/**
 * Interface for a class Font
 */
export interface FontModel {

    /**
     * Font size for the text.
     */
    size?: string;

    /**
     * Color for the text.
     */
    color?: string;

    /**
     * FontFamily for the text.
     */
    fontFamily?: string;

    /**
     * FontWeight for the text.
     */
    fontWeight?: string;

    /**
     * FontStyle for the text.
     */
    fontStyle?: string;

    /**
     * Opacity for the text.

     */
    opacity?: number;

}

/**
 * Interface for a class Border
 */
export interface BorderModel {

    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.
     */
    color?: string;

    /**
     * The width of the border in pixels.
     */
    width?: number;

}

/**
 * Interface for a class CenterPosition
 */
export interface CenterPositionModel {

    /**
     * latitude for the center position of maps

     */
    latitude?: number;

    /**
     * longitude for the center position of maps

     */
    longitude?: number;

}

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Toggle the tooltip visibility.

     */
    visible?: boolean;

    /**
     * To customize the tooltip template.

     */
    template?: string;

    /**
     * To customize the fill color of the tooltip.
     */
    fill?: string;

    /**
     * Options for customizing the color and width of the tooltip.
     */
    border?: BorderModel;

    /**
     * Options for customizing text styles of the tooltip.
     */
    textStyle?: FontModel;

    /**
     * To customize the format of the tooltip.

     */
    format?: string;

    /**
     * To customize the value of the tooltip.

     */
    valuePath?: string;

}

/**
 * Interface for a class Margin
 */
export interface MarginModel {

    /**
     * Left margin in pixels.

     */
    left?: number;

    /**
     * Right margin in pixels.

     */
    right?: number;

    /**
     * Top margin in pixels.

     */
    top?: number;

    /**
     * Bottom margin in pixels.

     */
    bottom?: number;

}

/**
 * Interface for a class ConnectorLineSettings
 */
export interface ConnectorLineSettingsModel {

    /**
     * Set the color for connector line

     */
    color?: string;

    /**
     * Set the line width for connector line

     */
    width?: number;

    /**
     * Set the opacity for connector line

     */
    opacity?: number;

}

/**
 * Interface for a class MarkerClusterSettings
 */
export interface MarkerClusterSettingsModel {

    /**
     * Toggle the Clustering visibility.

     */
    allowClustering?: boolean;

    /**
     * Options for customizing the color and width of the Clustering.
     */
    border?: BorderModel;

    /**
     * To customize the fill color of the Clustering.

     */
    fill?: string;

    /**
     * To customize the opacity of the Clustering.

     */
    opacity?: number;

    /**
     * To customize the Clustering of the marker.

     */
    shape?: MarkerType;

    /**
     * Customize the legend width of the maps.

     */
    width?: number;

    /**
     * Customize the legend height of the maps.

     */
    height?: number;

    /**
     * To move the marker by setting offset values
     */
    offset?: Point;

    /**
     * To provide the image url for rendering marker image
     */
    imageUrl?: string;

    /**
     * dashArray

     */
    dashArray?: string;

    /**
     * cluster style
     */
    labelStyle?: FontModel;

    /**
     * Toggle the cluster separate

     */
    allowClusterExpand?: boolean;

    /**
     * Set connector style for cluster separating
     */
    connectorLineSettings?: ConnectorLineSettingsModel;

}

/**
 * Interface for a class SameMarkerClusterData
 */
export interface SameMarkerClusterDataModel {

}

/**
 * Interface for a class ColorMappingSettings
 */
export interface ColorMappingSettingsModel {

    /**
     * To configure from



     */
    from?: number;

    /**
     * To configure to



     */
    to?: number;

    /**
     * To configure value

     */
    value?: string;

    /**
     * To configure color

     */
    color?: string | string[];

    /**
     * To configure min opacity

     */
    minOpacity?: number;

    /**
     * To configure max opacity

     */
    maxOpacity?: number;

    /**
     * To configure labels

     */
    label?: string;

    /**
     * To enable or disable the legend

     */
    showLegend?: boolean;

}

/**
 * Interface for a class SelectionSettings
 */
export interface SelectionSettingsModel {

    /**
     * Toggle the selection settings.

     */
    enable?: boolean;

    /**
     * To customize the fill color of the Selection.

     */
    fill?: string;

    /**
     * To customize the opacity of the Selection.

     */
    opacity?: number;

    /**
     * Toggle the multi selection.

     */
    enableMultiSelect?: boolean;

    /**
     * Options for customizing the color and width of the selection.
     */
    border?: BorderModel;

}

/**
 * Interface for a class HighlightSettings
 */
export interface HighlightSettingsModel {

    /**
     * To customize the fill color of the highlight.

     */
    fill?: string;

    /**
     * Toggle the highlight settings.

     */
    enable?: boolean;

    /**
     * To customize the opacity of the highlight.

     */
    opacity?: number;

    /**
     * Options for customizing the color and width of the highlight.
     */
    border?: BorderModel;

}

/**
 * Interface for a class NavigationLineSettings
 */
export interface NavigationLineSettingsModel {

    /**
     * NavigationSelectedLine visible

     */
    visible?: boolean;

    /**
     * Configures the label border

     */
    width?: number;

    /**
     * NavigationSelectedLine longitude

     */
    longitude?: number[];

    /**
     * NavigationSelectedLine latitude

     */
    latitude?: number[];

    /**
     * dashArray

     */
    dashArray?: string;

    /**
     * NavigationSelectedLine color
     */
    color?: string;

    /**
     * Specifies the angle of curve connecting different locations in map

     */
    angle?: number;

    /**
     * arrow
     */
    arrowSettings?: ArrowModel;

    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings?: SelectionSettingsModel;

    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings?: HighlightSettingsModel;

}

/**
 * Interface for a class BubbleSettings
 */
export interface BubbleSettingsModel {

    /**
     * Configures the bubble border
     */
    border?: BorderModel;

    /**
     * Toggle the visibility of bubble

     */
    visible?: boolean;

    /**
     * Specifies the data source for bubble.



     */
    dataSource?: object[];

    /**
     * To configure bubble animation duration

     */
    animationDuration?: number;

    /**
     * Animation duration

     */
    animationDelay?: number;

    /**
     * To configure bubble fill color

     */
    fill?: string;

    /**
     * To configure bubble minRadius

     */
    minRadius?: number;

    /**
     * To configure bubble maxRadius

     */
    maxRadius?: number;

    /**
     * To configure bubble opacity

     */
    opacity?: number;

    /**
     * To configure bubble valuePath

     */
    valuePath?: string;

    /**
     * To configure bubble shape type

     */
    bubbleType?: BubbleType;

    /**
     * To configure bubble colorValuePath

     */
    colorValuePath?: string;

    /**
     * To configure bubble colorMapping

     */
    colorMapping?: ColorMappingSettingsModel[];

    /**
     * To configure the tooltip settings of the bubble .
     */
    tooltipSettings?: TooltipSettingsModel;

    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings?: SelectionSettingsModel;

    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings?: HighlightSettingsModel;

}

/**
 * Interface for a class CommonTitleSettings
 */
export interface CommonTitleSettingsModel {

    /**
     * To customize the text of the title.

     */
    text?: string;

    /**
     * To customize title description for the accessibility.

     */
    description?: string;

}

/**
 * Interface for a class SubTitleSettings
 */
export interface SubTitleSettingsModel extends CommonTitleSettingsModel{

    /**
     * Options for customizing title styles of the Maps.
     */
    textStyle?: FontModel;

    /**
     * text alignment

     */
    alignment?: Alignment;

}

/**
 * Interface for a class TitleSettings
 */
export interface TitleSettingsModel extends CommonTitleSettingsModel{

    /**
     * Options for customizing title styles of the Maps.
     */
    textStyle?: FontModel;

    /**
     * text alignment

     */
    alignment?: Alignment;

    /**
     * To configure sub title of maps.
     */
    subtitleSettings?: SubTitleSettingsModel;

}

/**
 * Interface for a class ZoomSettings
 */
export interface ZoomSettingsModel {

    /**
     * Toggle the visibility of zooming.

     */
    enable?: boolean;

    /**
     * Configures tool bar orientation


     */
    toolBarOrientation?: Orientation;

    /**
     * Specifies the tool bar color.
     */
    color?: string;

    /**
     * Specifies the tool bar highlight color.
     */
    highlightColor?: string;

    /**
     * Specifies the tool bar selection color.
     * 
     */
    selectionColor?: string;

    /**
     * Configures vertical placement of tool bar 

     */
    horizontalAlignment?: Alignment;

    /**
     * Configures vertical placement of tool bar 

     */
    verticalAlignment?: Alignment;

    /**
     * To configure zooming items.
     */
    toolbars?: string[];

    /**
     * Toggle the mouse wheel zooming.

     */
    mouseWheelZoom?: boolean;

    /**
     * Double tab zooming


     */
    doubleClickZoom?: boolean;

    /**
     * Toggle the pinch zooming.

     */
    pinchZooming?: boolean;

    /**
     * Toggle the selection on zooming.

     */
    zoomOnClick?: boolean;

    /**
     * Configures zoom factor.

     */
    zoomFactor?: number;

    /**
     * Configures max zooming.

     */
    maxZoom?: number;

    /**
     * Configures minimum zooming.

     */
    minZoom?: number;

}

/**
 * Interface for a class ToggleLegendSettings
 */
export interface ToggleLegendSettingsModel {

    /**
     * To toggle the legend

     */
    enable?: boolean;

    /**
     * To apply the shape settings

     */
    applyShapeSettings?: boolean;

    /**
     * To specify the opacity of the shape

     */
    opacity?: number;

    /**
     * To fill the color for shape

     */
    fill?: string;

    /**
     * To apply border for the shapes
     */
    border?: BorderModel;

}

/**
 * Interface for a class LegendSettings
 */
export interface LegendSettingsModel {

    /**
     * Toggle the legend selection

     */
    toggleVisibility?: boolean;

    /**
     * Toggle the legend visibility.

     */
    visible?: boolean;

    /**
     * Customize the legend background

     */
    background?: string;

    /**
     * Type of the legend rendering

     */
    type?: LegendType;

    /**
     * Inverted pointer for interactive legend
     */
    invertedPointer?: boolean;

    /**
     * To place the label position for interactive legend.

     */
    labelPosition?: LabelPosition;

    /**
     * Specifies the label intersect action.

     */
    labelDisplayMode?: LabelIntersectAction;

    /**
     * Customize the legend shape of the maps.

     */
    shape?: LegendShape;

    /**
     * Customize the legend width of the maps.

     */
    width?: string;

    /**
     * Customize the legend height of the maps.

     */
    height?: string;

    /**
     * Options for customizing text styles of the legend.
     */
    textStyle?: FontModel;

    /**
     * Customize the legend width of the maps.

     */
    shapeWidth?: number;

    /**
     * Customize the legend height of the maps.

     */
    shapeHeight?: number;

    /**
     * Customize the shape padding

     */
    shapePadding?: number;

    /**
     * Options for customizing the color and width of the legend border.
     */
    border?: BorderModel;

    /**
     * Options for customizing the color and width of the shape border.
     */
    shapeBorder?: BorderModel;

    /**
     * To configure the title of the legend.
     */
    title?: CommonTitleSettingsModel;

    /**
     * Options for customizing text styles of the legend.
     */
    titleStyle?: FontModel;

    /**
     * Customize the legend position of the maps.

     */
    position?: LegendPosition;

    /**
     * Customize the legend alignment of the maps.

     */
    alignment?: Alignment;

    /**
     * Customize the legend items placed

     */
    orientation?: LegendArrangement;

    /**
     * Customize the legend placed by given x and y values. 
     */
    location?: Point;

    /**
     * Specifies the legend shape color
     */
    fill?: string;

    /**
     * Specifies the opacity of legend shape color

     */
    opacity?: number;

    /**
     * Customize the legend mode.

     */
    mode?: LegendMode;

    /**
     * Enable or disable the visibility of legend


     */
    showLegendPath?: string;

    /**
     * Bind the dataSource field for legend

     */
    valuePath?: string;

    /**
     * Removes the duplicate legend item

     */
    removeDuplicateLegend?: boolean;

    /**
     * Options for customizing the color and width of the selection.
     */
    toggleLegendSettings?: ToggleLegendSettingsModel;

}

/**
 * Interface for a class DataLabelSettings
 */
export interface DataLabelSettingsModel {

    /**
     * Toggle the data label visibility.

     */
    visible?: boolean;

    /**
     * Configures the label border
     */
    border?: BorderModel;

    /**
     * configure the fill
     */
    fill?: string;

    /**
     * configure the label opacity
     */
    opacity?: number;

    /**
     * rectangle rx 

     */
    rx?: number;

    /**
     * ry value

     */
    ry?: number;

    /**
     * Options for customizing text styles of the data label.
     */
    textStyle?: FontModel;

    /**
     * To customize the label path values.

     */
    labelPath?: string;

    /**
     * To customize the smartLabels.

     */
    smartLabelMode?: SmartLabelMode;

    /**
     * intersection action

     */
    intersectionAction?: IntersectAction;

    /**
     * To customize the data label template.

     */
    template?: string;

}

/**
 * Interface for a class ShapeSettings
 */
export interface ShapeSettingsModel {

    /**
     * To customize the fill color of the shape.

     */
    fill?: string;

    /**
     * To customize the palette of the shape.

     */
    palette?: string[];

    /**
     * Customize the radius for points
     */
    circleRadius?: number;

    /**
     * Options for customizing the color and width of the shape.
     */
    border?: BorderModel;

    /**
     * Dash array of line
     */
    dashArray?: string;

    /**
     * To customize the opacity of the shape.

     */
    opacity?: number;

    /**
     * To customize the colorValuePath of the shape.

     */
    colorValuePath?: string;

    /**
     * To customize the valuePath of the shape.

     */
    valuePath?: string;

    /**
     * To configure shape colorMapping

     */
    colorMapping?: ColorMappingSettingsModel[];

    /**
     * Toggle the auto fill.

     */
    autofill?: boolean;

}

/**
 * Interface for a class MarkerBase
 */
export interface MarkerBaseModel {

    /**
     * Options for customizing the color and width of the marker.
     */
    border?: BorderModel;

    /**
     * Options for customizing the dash array options
     */
    dashArray?: string;

    /**
     * Toggle the visibility of the marker.

     */
    visible?: boolean;

    /**
     * To customize the fill color of the marker.

     */
    fill?: string;

    /**
     * To customize the height of the marker.

     */
    height?: number;

    /**
     * To customize the width of the marker.

     */
    width?: number;

    /**
     * To customize the opacity of the marker.

     */
    opacity?: number;

    /**
     * To customize the shape of the marker.

     */
    shape?: MarkerType;

    /**
     * To provide the dataSource field to display legend text

     */
    legendText?: string;

    /**
     * To move the marker by setting offset values
     */
    offset?: Point;

    /**
     * To provide the image url for rendering marker image
     */
    imageUrl?: string;

    /**
     * To customize the template of the marker.

     */
    template?: string;

    /**
     * To configure the dataSource of the marker.



     */
    dataSource?: Object[];

    /**
     * To configure the tooltip settings of the maps marker.
     */
    tooltipSettings?: TooltipSettingsModel;

    /**
     * Animation duration time

     */
    animationDuration?: number;

    /**
     * Animation delay time

     */
    animationDelay?: number;

    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings?: SelectionSettingsModel;

    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings?: HighlightSettingsModel;

}

/**
 * Interface for a class MarkerSettings
 */
export interface MarkerSettingsModel extends MarkerBaseModel{

}

/**
 * Interface for a class LayerSettings
 */
export interface LayerSettingsModel {

    /**
     * Specifies the shape data for the layer.


     */
    shapeData?: Object | DataManager | MapAjax;

    /**
     * Specifies the query to select particular data from the shape data. 
     * This property is applicable only when the DataSource is `ej.DataManager`.

     */
    query?: Query;

    /**
     * Specifies the shape properties 
     */
    shapeSettings?: ShapeSettingsModel;

    /**
     * Specifies the data source for the layer.



     */
    dataSource?: Object[] | DataManager | MapAjax;

    /**
     * Specifies the type for the layer.

     */
    type?: Type;

    /**
     * Specifies the geometry type

     */
    geometryType?: GeometryType;

    /**
     * Specifies the type for the bing map.

     */
    bingMapType?: BingMapType;

    /**
     * Specifies the key for the layer.

     */
    key?: string;

    /**
     * Specifies the layerType for the layer.

     */
    layerType?: ShapeLayerType;

    /**
     * Specifies the urlTemplate for the layer.

     */
    urlTemplate?: string;

    /**
     * Toggle the visibility of the layers.

     */
    visible?: boolean;

    /**
     * Specifies the shapeDataPath for the layer.

     */
    shapeDataPath?: string;

    /**
     * Specifies the shapePropertyPath for the layer.

     */
    shapePropertyPath?: string | string[];

    /**
     * Specifies the animation duration for the layer.

     */
    animationDuration?: number;

    /**
     * To configure the marker settings.
     */
    markerSettings?: MarkerSettingsModel[];

    /**
     * To configure the cluster settings.
     */
    markerClusterSettings?: MarkerClusterSettingsModel;

    /**
     * To configure the datalabel settings of the maps.
     */
    dataLabelSettings?: DataLabelSettingsModel;

    /**
     * To configure the bubble settings of the maps.
     */
    bubbleSettings?: BubbleSettingsModel[];

    /**
     * navigationLineSetting
     */
    navigationLineSettings?: NavigationLineSettingsModel[];

    /**
     * To configure the tooltip settings of the maps layer.
     */
    tooltipSettings?: TooltipSettingsModel;

    /**
     * To configure the selection settings of the maps.
     */
    selectionSettings?: SelectionSettingsModel;

    /**
     * To configure the highlight settings of the maps.
     */
    highlightSettings?: HighlightSettingsModel;

    /**
     * To configure the legend toggle settings.
     */
    toggleLegendSettings?: ToggleLegendSettingsModel;

}

/**
 * Interface for a class Tile
 */
export interface TileModel {

}

/**
 * Interface for a class MapsAreaSettings
 */
export interface MapsAreaSettingsModel {

    /**
     * To configure maps area background color
     */
    background?: string;

    /**
     * Options for customizing the color and width of maps area.
     */
    border?: BorderModel;

}