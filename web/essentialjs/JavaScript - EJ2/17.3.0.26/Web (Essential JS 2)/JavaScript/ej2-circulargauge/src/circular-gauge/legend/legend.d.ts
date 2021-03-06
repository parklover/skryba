import { CircularGauge } from '../circular-gauge';
import { TextOption } from '../utils/helper';
import { Rect, Size, GaugeLocation } from '../utils/helper';
import { ChildProperty } from '@syncfusion/ej2-base';
import { BorderModel, FontModel, MarginModel } from '../model/base-model';
import { Border } from '../model/base';
import { LegendPosition, Alignment, GaugeShape } from '../utils/enum';
import { Axis } from '../axes/axis';
import { LegendSettingsModel } from './legend-model';
import { LocationModel } from './legend-model';
import { ILegendRegions } from '../model/interface';
/**
 * Configures the location for the legend.
 */
export declare class Location extends ChildProperty<Location> {
    /**
     * X coordinate of the legend in pixels.

     */
    x: number;
    /**
     * Y coordinate of the legend in pixels.

     */
    y: number;
}
/**
 * Configures the legends in charts.
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * If set to true, legend will be visible.

     */
    visible: boolean;
    /**
     * If set to true, series' visibility collapses based on the legend visibility.

     */
    toggleVisibility: boolean;
    /**
     * Legend in chart can be aligned as follows:
     * * Near: Aligns the legend to the left of the chart.
     * * Center: Aligns the legend to the center of the chart.
     * * Far: Aligns the legend to the right of the chart.

     */
    alignment: Alignment;
    /**
     * Options to customize the border of the legend.
     */
    border: BorderModel;
    /**
     * Options to customize the border of the legend.
     */
    shapeBorder: BorderModel;
    /**
     * Option to customize the padding between legend items.

     */
    padding: number;
    /**
     * Opacity of the legend.

     */
    opacity: number;
    /**
     * Position of the legend in the circular gauge are,
     * * Auto: Displays the legend based on the avail space of the circular this.gauge.
     * * Top: Displays the legend at the top of the circular this.gauge.
     * * Left: Displays the legend at the left of the circular this.gauge.
     * * Bottom: Displays the legend at the bottom of the circular this.gauge.
     * * Right: Displays the legend at the right of the circular this.gauge.

     */
    position: LegendPosition;
    /**
     * Customize the legend shape of the maps.

     */
    shape: GaugeShape;
    /**
     * The height of the legend in pixels.

     */
    height: string;
    /**
     * The width of the legend in pixels.

     */
    width: string;
    /**
     * Options to customize the legend text.
     */
    textStyle: FontModel;
    /**
     * Height of the shape

     */
    shapeHeight: number;
    /**
     * Width of the shape

     */
    shapeWidth: number;
    /**
     * Padding for the shape

     */
    shapePadding: number;
    /**
     * Specifies the location of the legend, relative to the chart.
     * If x is 20, legend moves by 20 pixels to the right of the chart. It requires the `position` to be `Custom`.
     * ```html
     * <div id='Gauge'></div>
     * ```
     * ```typescript
     * let gauge: CircularGauge = new CircularGauge({
     * ...
     *   legendSettings: {
     *     visible: true,
     *     position: 'Custom',
     *     location: { x: 100, y: 150 },
     *   },
     * ...
     * });
     * this.gauge.appendTo('#Gauge');
     * ```
     */
    location: LocationModel;
    /**
     * Options to customize the legend background

     */
    background: string;
    /**
     * Options to customize the legend margin
     */
    margin: MarginModel;
}
export declare class Legend {
    legendCollection: LegendOptions[];
    legendRenderingCollections: Object[];
    protected legendRegions: ILegendRegions[];
    titleRect: Rect;
    private totalRowCount;
    private maxColumnWidth;
    protected maxItemHeight: number;
    protected isPaging: boolean;
    protected isVertical: boolean;
    private rowCount;
    private pageButtonSize;
    protected pageXCollections: number[];
    protected maxColumns: number;
    maxWidth: number;
    private clipRect;
    private legendTranslateGroup;
    protected currentPage: number;
    private gauge;
    private totalPages;
    private legend;
    private legendID;
    protected pagingRegions: Rect[];
    private clipPathHeight;
    private toggledIndexes;
    /**
     * Gets the legend bounds in chart.
     * @private
     */
    legendBounds: Rect;
    /**  @private */
    position: LegendPosition;
    constructor(gauge: CircularGauge);
    /**
     * Binding events for legend module.
     */
    private addEventListener;
    /**
     * UnBinding events for legend module.
     */
    private removeEventListener;
    /**
     * Get the legend options.
     * @return {void}
     * @private
     */
    getLegendOptions(axes: Axis[]): void;
    calculateLegendBounds(rect: Rect, availableSize: Size): void;
    /**
     * To find legend alignment for chart and accumulation chart
     */
    private alignLegend;
    /**
     * To find legend location based on position, alignment for chart and accumulation chart
     */
    private getLocation;
    /**
     * Renders the legend.
     * @return {void}
     * @private
     */
    renderLegend(legend: LegendSettingsModel, legendBounds: Rect, redraw?: boolean): void;
    /**
     * To render legend paging elements for chart and accumulation chart
     */
    private renderPagingElements;
    /**
     * To translate legend pages for chart and accumulation chart
     */
    protected translatePage(pagingText: Element, page: number, pageNumber: number): number;
    /**
     * To render legend text for chart and accumulation chart
     */
    protected renderText(legendOption: LegendOptions, group: Element, textOptions: TextOption, axisIndex: number, rangeIndex: number): void;
    /**
     * To render legend symbols for chart and accumulation chart
     */
    protected renderSymbol(legendOption: LegendOptions, group: Element, axisIndex: number, rangeIndex: number): void;
    /**
     * To find legend rendering locations from legend options.
     * @private
     */
    getRenderPoint(legendOption: LegendOptions, start: GaugeLocation, textPadding: number, prevLegend: LegendOptions, rect: Rect, count: number, firstLegend: number): void;
    /**
     * To show or hide the legend on clicking the legend.
     * @return {void}
     */
    click(event: Event): void;
    /**
     * Set toggled legend styles.
     */
    private setStyles;
    /**
     * To get legend by index
     */
    private legendByIndex;
    /**
     * To change legend pages for chart and accumulation chart
     */
    protected changePage(event: Event, pageUp: boolean): void;
    /**
     * To find available width from legend x position.
     */
    private getAvailWidth;
    /**
     * To create legend rendering elements for chart and accumulation chart
     */
    private createLegendElements;
    /**
     * Method to append child element
     */
    private appendChildElement;
    /**
     * To find first valid legend text index for chart and accumulation chart
     */
    private findFirstLegendPosition;
    /**
     * To find legend bounds for accumulation chart.
     * @private
     */
    getLegendBounds(availableSize: Size, legendBounds: Rect, legend: LegendSettingsModel): void;
    /** @private */
    private subtractThickness;
    /**
     * To set bounds for chart and accumulation chart
     */
    protected setBounds(computedWidth: number, computedHeight: number, legend: LegendSettingsModel, legendBounds: Rect): void;
    /**
     * To find maximum column size for legend
     */
    private getMaxColumn;
    /**
     * To show or hide trimmed text tooltip for legend.
     * @return {void}
     * @private
     */
    move(event: Event): void;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     * @return {void}
     * @private
     */
    destroy(circulargauge: CircularGauge): void;
}
/**
 * @private
 */
export declare class Index {
    axisIndex: number;
    rangeIndex: number;
    isToggled: boolean;
    constructor(axisIndex: number, rangeIndex?: number, isToggled?: boolean);
}
/**
 * Class for legend options
 * @private
 */
export declare class LegendOptions {
    render: boolean;
    text: string;
    originalText: string;
    fill: string;
    shape: GaugeShape;
    visible: boolean;
    textSize: Size;
    location: GaugeLocation;
    border: Border;
    shapeBorder: Border;
    shapeWidth: number;
    shapeHeight: number;
    rangeIndex?: number;
    axisIndex?: number;
    constructor(text: string, originalText: string, fill: string, shape: GaugeShape, visible: boolean, border: Border, shapeBorder: Border, shapeWidth: number, shapeHeight: number, rangeIndex?: number, axisIndex?: number);
}
