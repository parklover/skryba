import { ChildProperty } from '@syncfusion/ej2-base';
import { HeatMap } from '../heatmap';
import { GradientPointer } from '../utils/helper';
import { Size, CanvasTooltip, LegendRange } from '../utils/helper';
import { LegendPosition, Alignment, LabelDisplayType } from '../utils/enum';
import { FontModel } from '../model/base-model';
import { Rect, CurrentLegendRect } from '../utils/helper';
import { Tooltip as tool } from '@syncfusion/ej2-svg-base';
/**
 * Configures the Legend
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * Specifies the height of Legend.

     */
    height: string;
    /**
     * Specifies the width of Legend.

     */
    width: string;
    /**
     * Specifies the position of Legend to render.

     */
    position: LegendPosition;
    /**
     * Specifies whether the Legend should be visible or not.

     */
    visible: boolean;
    /**
     * Specifies the alignment of the legend

     */
    alignment: Alignment;
    /**
     * Specifies whether the label should be visible or not.

     */
    showLabel: boolean;
    /**
     * Specifies whether the gradient pointer should be visible or not.

     */
    showGradientPointer: boolean;
    /**
     * Specifies whether smart legend should be displayed or not when palette type is fixed.

     */
    enableSmartLegend: boolean;
    /**
     * Specifies the type of label display for smart legend.
     * * All:  All labels are displayed.
     * * Edge: Labels will be displayed only at the edges of the legend.
     * * None: No labels are displayed.

     */
    labelDisplayType: LabelDisplayType;
    /**
     * Specifies the legend label style.

     */
    textStyle: FontModel;
    /**
     * Specifies the formatting options for the legend label.

     */
    labelFormat: string;
    /**
     * To toggle the visibility of heatmap cells based on legend range selection

     */
    toggleVisibility: boolean;
}
/**
 *
 * The `Legend` module is used to render legend for the heatmap.
 */
export declare class Legend {
    private heatMap;
    private drawSvgCanvas;
    private legend;
    legendGroup: Rect;
    legendRectScale: Rect;
    maxLegendLabelSize: Size;
    gradientPointer: HTMLElement;
    private legendHeight;
    private legendWidth;
    private height;
    private width;
    private legendRectPadding;
    private gradientScaleSize;
    private segmentCollections;
    private textWrapCollections;
    labelCollections: string[];
    labelCollection: string[];
    private legendMinValue;
    private legendMaxValue;
    private legendSize;
    previousOptions: GradientPointer;
    listPerPage: number;
    private numberOfPages;
    private listHeight;
    private listWidth;
    private legendScale;
    fillRect: Rect;
    private legendRect;
    currentPage: number;
    private lastList;
    navigationCollections: Rect[];
    private pagingRect;
    private labelPadding;
    private paginggroup;
    private translategroup;
    private listInterval;
    legendLabelTooltip: CanvasTooltip[];
    private numberOfRows;
    private labelXCollections;
    private labelYCollections;
    private legendXCollections;
    private legendYCollections;
    /** @private */
    legendRectPositionCollection: CurrentLegendRect[];
    /** @private */
    legendRange: LegendRange[];
    /** @private */
    legendTextRange: LegendRange[];
    /** @private */
    visibilityCollections: boolean[];
    /** @private */
    tooltipObject: tool;
    /** @private */
    format: Function;
    constructor(heatMap?: HeatMap);
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the Legend.
     * @return {void}
     * @private
     */
    destroy(heatMap: HeatMap): void;
    /**
     * @private
     */
    renderLegendItems(): void;
    private renderSmartLegend;
    private renderLegendLabel;
    /**
     * @private
     */
    renderGradientPointer(e: PointerEvent, pageX: number, pageY: number): void;
    /**
     * @private
     */
    removeGradientPointer(): void;
    /**
     * @private
     */
    calculateLegendBounds(rect: Rect): void;
    private calculateListLegendBounds;
    private getMaxLabelSize;
    /**
     * @private
     */
    calculateLegendSize(rect: Rect, legendTop: number): void;
    private measureListLegendBound;
    private renderPagingElements;
    private calculateGradientScale;
    private calculateColorAxisGrid;
    private renderColorAxisGrid;
    /**
     * @private
     */
    renderLegendLabelTooltip(e: PointerEvent, pageX: number, pageY: number): void;
    private calculateListPerPage;
    private renderListLegendMode;
    /**
     * @private
     */
    translatePage(heatMap: HeatMap, page: number, isNext: boolean): void;
    /**
     * To create div container for tooltip which appears on hovering the smart legend.
     * @param heatmap
     * @private
     */
    createTooltipDiv(heatMap: HeatMap): void;
    /**
     * To render tooltip for smart legend.
     * @private
     */
    renderTooltip(currentLegendRect: CurrentLegendRect): void;
    /**
     * To create tooltip for smart legend.
     * @private
     */
    createTooltip(pageX: number, pageY: number): void;
    /**
     * Toggle the visibility of cells based on legend selection
     * @private
     */
    legendRangeSelection(index: number): void;
    /**
     * update visibility collections of legend and series
     * @private
     */
    updateLegendRangeCollections(): void;
}
