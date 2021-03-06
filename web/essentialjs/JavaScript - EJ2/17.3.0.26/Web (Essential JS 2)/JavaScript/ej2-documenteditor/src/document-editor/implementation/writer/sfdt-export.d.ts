import { WListFormat, WCharacterFormat } from '../format/index';
import { LayoutViewer } from '../index';
import { LineWidget, Page, ChartElementBox } from '../viewer/page';
/**
 * Exports the document to Sfdt format.
 */
export declare class SfdtExport {
    private endLine;
    private endOffset;
    private endCell;
    private startColumnIndex;
    private endColumnIndex;
    private lists;
    private viewer;
    private document;
    private writeInlineStyles;
    private editRangeId;
    /**
     * @private
     */
    constructor(owner: LayoutViewer);
    private getModuleName;
    private clear;
    /**
     * Serialize the data as Syncfusion document text.
     * @private
     */
    serialize(): string;
    /**
     * @private
     */
    saveAsBlob(viewer: LayoutViewer): Promise<Blob>;
    private updateEditRangeId;
    /**
     * @private
     */
    write(line?: LineWidget, startOffset?: number, endLine?: LineWidget, endOffset?: number, writeInlineStyles?: boolean): any;
    /**
     * @private
     */
    Initialize(): void;
    /**
     * @private
     */
    writePage(page: Page): any;
    private writeBodyWidget;
    private writeHeaderFooters;
    private writeHeaderFooter;
    private createSection;
    private writeBlock;
    private writeParagraph;
    private writeInlines;
    private writeInline;
    writeChart(element: ChartElementBox, inline: any): void;
    private writeChartTitleArea;
    private writeChartDataFormat;
    private writeChartLayout;
    private writeChartArea;
    private writeChartLegend;
    private writeChartCategoryAxis;
    private writeChartDataTable;
    private writeChartCategory;
    private createChartCategory;
    private writeChartData;
    private createChartData;
    private createChartSeries;
    private writeChartSeries;
    private writeChartDataLabels;
    private writeChartTrendLines;
    private writeLines;
    private writeLine;
    private createParagraph;
    /**
     * @private
     */
    writeCharacterFormat(format: WCharacterFormat, isInline?: boolean): any;
    private writeParagraphFormat;
    private writeTabs;
    /**
     * @private
     */
    writeListFormat(format: WListFormat, isInline?: boolean): any;
    private writeTable;
    private writeRow;
    private writeCell;
    private createTable;
    private createRow;
    private createCell;
    private writeShading;
    private writeBorder;
    private writeBorders;
    private writeCellFormat;
    private writeRowFormat;
    private writeTableFormat;
    private writeStyles;
    private writeStyle;
    private writeLists;
    private writeAbstractList;
    private writeList;
    private writeListLevel;
    /**
     * @private
     */
    destroy(): void;
}
