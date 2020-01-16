/**
 * Maps base doc
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { LabelPosition, Alignment, HighLightMode, SelectionMode, LabelIntersectAction, LabelPlacement } from '../utils/enum';
import { LabelAlignment, LegendShape, LegendPosition, LegendMode, LegendOrientation } from '../utils/enum';
import { BorderModel, FontModel, SubTitleSettingsModel, ColorMappingModel, CommonTitleSettingsModel } from './base-model';
import { Location } from '../utils/helper';
/**
 * Configures the borders in the maps.
 */
export declare type MarkerShape = 'Circle' | 'Rectangle' | 'Triangle' | 'Diamond' | 'Cross' | 'HorizontalLine' | 'VerticalLine' | 'Pentagon' | 'InvertedTriangle' | 'Image';
export declare class Border extends ChildProperty<Border> {
    /**
     * The color of the border that accepts value in hex and rgba as a valid CSS color string.

     */
    color: string;
    /**
     * The width of the border in pixels.

     */
    width: number;
}
/**
 * Configures the treemap margin.
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * Left margin in pixels.

     */
    left: number;
    /**
     * Right margin in pixels.

     */
    right: number;
    /**
     * Top margin in pixels.

     */
    top: number;
    /**
     * Bottom margin in pixels.

     */
    bottom: number;
}
/**
 * Configures the fonts in treemap.
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * Font size for the text.

     */
    size: string;
    /**
     * Color for the text.

     */
    color: string;
    /**
     * fontFamily for the text.

     */
    fontFamily: string;
    /**
     * FontWeight for the text.

     */
    fontWeight: string;
    /**
     * FontStyle for the text.

     */
    fontStyle: string;
    /**
     * Opacity for the text.

     */
    opacity: number;
}
/**
 * To configure title of the maps.
 */
export declare class CommonTitleSettings extends ChildProperty<CommonTitleSettings> {
    /**
     * To customize the text of the title.

     */
    text: string;
    /**
     * To customize title description for the accessibility.

     */
    description: string;
}
/**
 * To configure subtitle of the maps.
 */
export declare class SubTitleSettings extends CommonTitleSettings {
    /**
     * Options for customizing title styles of the Maps.
     */
    textStyle: FontModel;
    /**
     * Options for customize the text alignment.

     */
    alignment: Alignment;
}
/**
 * To configure title of the maps.
 */
export declare class TitleSettings extends CommonTitleSettings {
    /**
     * Options for customizing title styles of the Maps.
     */
    textStyle: FontModel;
    /**
     * Options for customize the text alignment.

     */
    alignment: Alignment;
    /**
     * To configure sub title of maps.
     */
    subtitleSettings: SubTitleSettingsModel;
}
export declare class ColorMapping extends ChildProperty<ColorMapping> {
    /**
     * Specifies the from


     */
    from: number;
    /**
     * Specifies the to


     */
    to: number;
    /**
     * specifies the color

     */
    color: string | string[];
    /**
     * Specifies the label text.

     */
    label: string;
    /**
     * Specifies the value

     */
    value: string | number;
    /**
     * Specifies the minOpacity

     */
    minOpacity: number;
    /**
     * maxOpacity

     */
    maxOpacity: number;
    /**
     * Specifies the visibility of the legend for color mapping

     */
    showLegend: boolean;
}
/**
 * Configures the legend settings.
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * Toggle the legend visibility.

     */
    visible: boolean;
    /**
     * Customize the legend mode.

     */
    mode: LegendMode;
    /**
     * Customize the legend background

     */
    background: string;
    /**
     * Customize the legend shape.

     */
    shape: LegendShape;
    /**
     * Customize the legend width.

     */
    width: string;
    /**
     * Customize the legend height.

     */
    height: string;
    /**
     * Options for customize the legend text.
     */
    textStyle: FontModel;
    /**
     * Specifies the legend shape color

     */
    fill: string;
    /**
     * Specifies the legend opacity of shape color

     */
    opacity: number;
    /**
     * Customize the shape width.

     */
    shapeWidth: number;
    /**
     * Customize the shape height.

     */
    shapeHeight: number;
    /**
     * Customize the shape padding

     */
    shapePadding: number;
    /**
     * Specifies the images url.

     */
    imageUrl: string;
    /**
     * Options for customizing the color and width of the legend border.
     */
    border: BorderModel;
    /**
     * Options for customizing the color and width of the shape border.
     */
    shapeBorder: BorderModel;
    /**
     * To configure the title of the legend.
     */
    title: CommonTitleSettingsModel;
    /**
     * Options for customizing text styles of the legend.
     */
    titleStyle: FontModel;
    /**
     * Customize the legend position of the maps.

     */
    position: LegendPosition;
    /**
     * Customize the legend items placed

     */
    orientation: LegendOrientation;
    /**
     * Inverted pointer for interactive legend

     */
    invertedPointer: boolean;
    /**
     * To place the label position for interactive legend.

     */
    labelPosition: LabelPlacement;
    /**
     * Specifies the label intersect action.

     */
    labelDisplayMode: LabelIntersectAction;
    /**
     * Customize the legend alignment.

     */
    alignment: Alignment;
    /**
     * Customize the legend placed by given x and y values.
     */
    location: Location;
    /**
     * Enable or disable the visibility of the legend.

     */
    showLegendPath: string;
    /**
     * Used to render particular field in dataSource as legend.

     */
    valuePath: string;
    /**
     * Used to remove duplicate of the legend items.

     */
    removeDuplicateLegend: boolean;
}
export declare class InitialDrillSettings extends ChildProperty<InitialDrillSettings> {
    /**
     * Specifies the initial rendering level.

     */
    groupIndex: number;
    /**
     * Specifies the initial rendering name.

     */
    groupName: string;
}
export declare class LeafItemSettings extends ChildProperty<LeafItemSettings> {
    /**
     * Specifies the fill color for leaf items.

     */
    fill: string;
    /**
     * Items rendering with random colors.

     */
    autoFill: boolean;
    /**
     * Specifies the border
     */
    border: BorderModel;
    /**
     * Specifies the item gap.

     */
    gap: number;
    /**
     * Specifies the padding.

     */
    padding: number;
    /**
     * Specifies the opacity for color.

     */
    opacity: number;
    /**
     * To show or hide the labels

     */
    showLabels: boolean;
    /**
     * Specifies the field name from the dataSource.

     */
    labelPath: string;
    /**
     * Specifies the label format.

     */
    labelFormat: string;
    /**
     * Specifies the alignment of label.

     */
    labelPosition: LabelPosition;
    /**
     * Customize the label style.
     */
    labelStyle: FontModel;
    /**
     * Specifies the label template.

     */
    labelTemplate: string;
    /**
     * Specifies the alignment of template.

     */
    templatePosition: LabelPosition;
    /**
     * Specifies the label intersect action.

     */
    interSectAction: LabelAlignment;
    /**
     * Specifies the colorMapping
     */
    colorMapping: ColorMappingModel[];
}
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * To enable or disable the Tooltip.

     */
    visible: boolean;
    /**
     * To specifies the template for tooltip.

     */
    template: string;
    /**
     * Specifies the format by given ${data}

     */
    format: string;
    /**
     * To fill the tooltip background.

     */
    fill: string;
    /**
     * Specifies the opacity for fill.

     */
    opacity: number;
    /**
     * Specifies the marker shapes.

     */
    markerShapes: MarkerShape[];
    /**
     * Specifies the tooltip border.
     */
    border: BorderModel;
    /**
     * Specifies the text style.
     */
    textStyle: FontModel;
}
export declare class SelectionSettings extends ChildProperty<SelectionSettings> {
    /**
     * To enable or disable the selection

     */
    enable: boolean;
    /**
     * To specifies the selection color

     */
    fill: string;
    /**
     * To specified the opacity of color.

     */
    opacity: string;
    /**
     * To specifies the border
     */
    border: BorderModel;
    /**
     * To specifies the selection mode.

     */
    mode: SelectionMode;
}
export declare class HighlightSettings extends ChildProperty<HighlightSettings> {
    /**
     * To enable or disable the highlight.

     */
    enable: boolean;
    /**
     * To specifies the highlight color.

     */
    fill: string;
    /**
     * To specified the opacity of color.

     */
    opacity: string;
    /**
     * To specifies the border
     */
    border: BorderModel;
    /**
     * To specifies the highlight mode.

     */
    mode: HighLightMode;
}
/**
 * Options for customizing the tree map levels.
 */
export declare class LevelSettings extends ChildProperty<LevelSettings> {
    /**
     * Specifies the field name from the dataSource.

     */
    groupPath: string;
    /**
     * Specifies the padding.

     */
    groupGap: number;
    /**
     * Specifies the padding.

     */
    groupPadding: number;
    /**
     * Specifies the border
     */
    border: BorderModel;
    /**
     * Specifies the background of level.

     */
    fill: string;
    /**
     * Items rendering with random colors.

     */
    autoFill: boolean;
    /**
     * Specifies the opacity for color.

     */
    opacity: number;
    /**
     * To Show or hide the header in level.

     */
    showHeader: boolean;
    /**
     * To specifies the height of header.

     */
    headerHeight: number;
    /**
     * Specifies the template for header rendering.

     */
    headerTemplate: string;
    /**
     * Specifies the header format.

     */
    headerFormat: string;
    /**
     * Customize the text alignment

     */
    headerAlignment: Alignment;
    /**
     * Customize the header style.
     */
    headerStyle: FontModel;
    /**
     * Specifies the label position in level.

     */
    templatePosition: LabelPosition;
    /**
     * Specifies the colorMapping
     */
    colorMapping: ColorMappingModel[];
}
