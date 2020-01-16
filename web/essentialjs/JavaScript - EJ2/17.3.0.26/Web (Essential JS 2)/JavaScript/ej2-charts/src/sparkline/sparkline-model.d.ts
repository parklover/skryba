import { Component, NotifyPropertyChanges, INotifyPropertyChanged, Property, Complex, isBlazor } from '@syncfusion/ej2-base';import { SvgRenderer } from '@syncfusion/ej2-svg-base';import { remove, L10n, Internationalization, Event, EmitType, ModuleDeclaration, isNullOrUndefined } from '@syncfusion/ej2-base';import { Browser, EventHandler, Touch, Collection } from '@syncfusion/ej2-base';import { SparklineBorder, SparklineTooltipSettings, ContainerArea, AxisSettings, Padding, SparklineMarkerSettings } from './model/base';import { SparklineDataLabelSettings, RangeBandSettings } from './model/base';import { SparklineBorderModel, SparklineTooltipSettingsModel, ContainerAreaModel, AxisSettingsModel } from './model/base-model';import { SparklineMarkerSettingsModel, SparklineDataLabelSettingsModel, RangeBandSettingsModel, PaddingModel } from './model/base-model';import { SparklineType, SparklineValueType, SparklineTheme } from './model/enum';import { Size, createSvg, RectOption, Rect, drawRectangle, getIdElement, SparkValues, withInBounds, removeElement } from './utils/helper';import { ISparklineLoadedEventArgs, ISparklineLoadEventArgs, IDataLabelRenderingEventArgs, IPointRegionEventArgs } from './model/interface';import { IMarkerRenderingEventArgs, ISparklinePointEventArgs, ISparklineMouseEventArgs } from './model/interface';import { IAxisRenderingEventArgs, ISparklineResizeEventArgs, ITooltipRenderingEventArgs } from './model/interface';import { ISeriesRenderingEventArgs, IThemes } from './model/interface';import { SparklineRenderer } from './rendering/sparkline-renderer';import { SparklineTooltip } from './rendering/sparkline-tooltip';import { getThemeColor } from './utils/helper';import { DataManager, Query } from '@syncfusion/ej2-data';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class Sparkline
 */
export interface SparklineModel extends ComponentModel{

    /**
     * To configure Sparkline width.
     */
    width?: string;

    /**
     * To configure Sparkline height.
     */
    height?: string;

    /**
     * To configure Sparkline points border color and width.
     */
    border?: SparklineBorderModel;

    /**
     * To configure Sparkline series type.

     */
    type?: SparklineType;

    /**
     * To configure sparkline data source.


     */
    dataSource?: Object[] | DataManager;

    /**
     * Specifies the query for filter the data.

     */
    query?: Query;

    /**
     * To configure sparkline series value type.

     */
    valueType?: SparklineValueType;

    /**
     * To configure sparkline series xName.

     */
    xName?: string;

    /**
     * To configure sparkline series yName.

     */
    yName?: string;

    /**
     * To configure sparkline series fill.

     */
    fill?: string;

    /**
     * To configure sparkline series highest y value point color.

     */
    highPointColor?: string;

    /**
     * To configure sparkline series lowest y value point color.

     */
    lowPointColor?: string;

    /**
     * To configure sparkline series first x value point color.

     */
    startPointColor?: string;

    /**
     * To configure sparkline series last x value point color.

     */
    endPointColor?: string;

    /**
     * To configure sparkline series negative y value point color.

     */
    negativePointColor?: string;

    /**
     * To configure sparkline winloss series tie y value point color.

     */
    tiePointColor?: string;

    /**
     * To configure sparkline series color palette. It applicable to column and pie type series.

     */
    palette?: string[];

    /**
     * To configure sparkline line series width.

     */
    lineWidth?: number;

    /**
     * To configure sparkline line series opacity.

     */
    opacity?: number;

    /**
     * To apply internationalization for sparkline.

     */
    format?: string;

    /**
     * To enable the separator

     */
    useGroupingSeparator?: boolean;

    /**
     * To configure Sparkline tooltip settings.
     */
    tooltipSettings?: SparklineTooltipSettingsModel;

    /**
     * To configure Sparkline container area customization.
     */
    containerArea?: ContainerAreaModel;

    /**
     * To configure Sparkline axis line customization.
     */
    rangeBandSettings?: RangeBandSettingsModel[];

    /**
     * To configure Sparkline container area customization.
     */
    axisSettings?: AxisSettingsModel;

    /**
     * To configure Sparkline marker configuration.
     */
    markerSettings?: SparklineMarkerSettingsModel;

    /**
     * To configure Sparkline dataLabel configuration.
     */
    dataLabelSettings?: SparklineDataLabelSettingsModel;

    /**
     * To configure Sparkline container area customization.
     */
    padding?: PaddingModel;

    /**
     * To configure sparkline theme.

     */
    theme?: SparklineTheme;

    /**
     * Triggers after sparkline rendered.
     * @event

     */
    loaded?: EmitType<ISparklineLoadedEventArgs>;

    /**
     * Triggers before sparkline render.
     * @event

     */
    load?: EmitType<ISparklineLoadEventArgs>;

    /**
     * Triggers before sparkline tooltip render.
     * @event


     */
    tooltipInitialize?: EmitType<ITooltipRenderingEventArgs>;

    /**
     * Triggers before sparkline series render.
     * @event

     */
    seriesRendering?: EmitType<ISeriesRenderingEventArgs>;

    /**
     * Triggers before sparkline axis render.
     * @event


     */
    axisRendering?: EmitType<IAxisRenderingEventArgs>;

    /**
     * Triggers before sparkline points render.
     * @event


     */
    pointRendering?: EmitType<ISparklinePointEventArgs>;

    /**
     * Triggers while mouse move on the sparkline point region.
     * @event

     */
    pointRegionMouseMove?: EmitType<IPointRegionEventArgs>;

    /**
     * Triggers while mouse click on the sparkline point region.
     * @event

     */
    pointRegionMouseClick?: EmitType<IPointRegionEventArgs>;

    /**
     * Triggers while mouse move on the sparkline container.
     * @event

     */
    sparklineMouseMove?: EmitType<ISparklineMouseEventArgs>;

    /**
     * Triggers while mouse click on the sparkline container.
     * @event

     */
    sparklineMouseClick?: EmitType<ISparklineMouseEventArgs>;

    /**
     * Triggers before the sparkline datalabel render.
     * @event


     */
    dataLabelRendering?: EmitType<IDataLabelRenderingEventArgs>;

    /**
     * Triggers before the sparkline marker render.
     * @event


     */
    markerRendering?: EmitType<IMarkerRenderingEventArgs>;

    /**
     * Triggers on resizing the sparkline.
     * @event

     */
    resize?: EmitType<ISparklineResizeEventArgs>;

}