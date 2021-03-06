import { Maps } from '../../index';
import { ColorMappingSettings } from '../index';
import { HighlightSettingsModel, SelectionSettingsModel } from '../model/base-model';
/**
 * Legend module is used to render legend for the maps
 */
export declare class Legend {
    legendCollection: Object[];
    legendRenderingCollections: Object[];
    private translate;
    private legendBorderRect;
    private maps;
    private totalPages;
    private page;
    private currentPage;
    private legendItemRect;
    private heightIncrement;
    private widthIncrement;
    private textMaxWidth;
    private legendGroup;
    private shapeHighlightCollection;
    private shapeSelectionCollection;
    legendHighlightCollection: object[];
    legendSelectionCollection: object[];
    private legendLinearGradient;
    private currentLayer;
    private defsElement;
    legendElement: Element;
    private shapeElement;
    oldShapeElement: Element;
    shapeSelection: boolean;
    legendSelection: boolean;
    constructor(maps: Maps);
    /**
     * To calculate legend bounds and draw the legend shape and text.
     */
    renderLegend(): void;
    calculateLegendBounds(): void;
    /**
     *
     */
    private getLegends;
    private getPageChanged;
    /**
     * To draw the legend shape and text.
     */
    drawLegend(): void;
    private drawLegendItem;
    legendHighLightAndSelection(targetElement: Element, value: string): void;
    private setColor;
    private pushCollection;
    private removeLegend;
    removeLegendHighlightCollection(): void;
    removeLegendSelectionCollection(): void;
    removeShapeHighlightCollection(): void;
    shapeHighLightAndSelection(targetElement: Element, data: object, module: SelectionSettingsModel | HighlightSettingsModel, getValue: string, layerIndex: number): void;
    private isTargetSelected;
    private legendIndexOnShape;
    private shapeDataOnLegend;
    private renderLegendBorder;
    changeNextPage(e: PointerEvent): void;
    private getLegendAlignment;
    private getMarkersLegendCollections;
    private getRangeLegendCollection;
    private getOverallLegendItemsCollection;
    private removeDuplicates;
    private getEqualLegendCollection;
    private getDataLegendCollection;
    interactiveHandler(e: PointerEvent): void;
    private renderInteractivePointer;
    wireEvents(element: Element): void;
    addEventListener(): void;
    private legendClick;
    removeEventListener(): void;
    private getLegendData;
    legendGradientColor(colorMap: ColorMappingSettings, legendIndex: number): string;
    /**
     * Get module name.
     */
    protected getModuleName(): string;
    /**
     * To destroy the legend.
     * @return {void}
     * @private
     */
    destroy(maps: Maps): void;
}
