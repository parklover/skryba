import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WCharacterFormat, WParagraphFormat, WSectionFormat } from '../format/index';
import { WStyles } from '../format/index';
import { LayoutViewer } from './viewer';
import { Widget, BodyWidget, BlockWidget, HeaderFooters } from './page';
/**
 * @private
 */
export declare class SfdtReader {
    private viewer;
    private fieldSeparator;
    private isPageBreakInsideTable;
    private editableRanges;
    private readonly isPasting;
    constructor(viewer: LayoutViewer);
    /**
     * @private
     * @param json
     */
    convertJsonToDocument(json: string): BodyWidget[];
    private parseDocumentProtection;
    private parseStyles;
    parseStyle(data: any, style: any, styles: WStyles): void;
    private getStyle;
    /**
     * @private
     * @param data
     * @param abstractLists
     */
    parseAbstractList(data: any, abstractLists: WAbstractList[]): void;
    private parseListLevel;
    /**
     * @private
     * @param data
     * @param listCollection
     */
    parseList(data: any, listCollection: WList[]): void;
    private parseLevelOverride;
    private parseSections;
    /**
     * @private
     */
    parseHeaderFooter(data: any, headersFooters: any): HeaderFooters;
    private parseTextBody;
    parseBody(data: any, blocks: BlockWidget[], container?: Widget, isSectionBreak?: boolean): void;
    private parseTable;
    private parseRowGridValues;
    private parseParagraph;
    private applyCharacterStyle;
    private parseEditableRangeStart;
    private addEditRangeCollection;
    private parseChartTitleArea;
    private parseChartDataFormat;
    private parseChartLayout;
    private parseChartLegend;
    private parseChartCategoryAxis;
    private parseChartDataTable;
    private parseChartArea;
    private parseChartData;
    private parseChartSeries;
    private parseChartDataLabels;
    private parseChartSeriesDataPoints;
    private parseChartTrendLines;
    private parseTableFormat;
    private parseCellFormat;
    private parseCellMargin;
    private parseRowFormat;
    private parseBorders;
    private parseBorder;
    private parseShading;
    /**
     * @private
     */
    parseCharacterFormat(sourceFormat: any, characterFormat: WCharacterFormat, writeInlineFormat?: boolean): void;
    private getColor;
    /**
     * @private
     */
    parseParagraphFormat(sourceFormat: any, paragraphFormat: WParagraphFormat): void;
    private parseListFormat;
    /**
     *
     * @param data @private
     * @param sectionFormat
     */
    parseSectionFormat(data: any, sectionFormat: WSectionFormat): void;
    private parseTabStop;
    private validateImageUrl;
}
