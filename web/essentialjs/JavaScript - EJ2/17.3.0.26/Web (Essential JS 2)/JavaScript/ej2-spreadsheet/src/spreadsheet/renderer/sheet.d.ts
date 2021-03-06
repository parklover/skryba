import { Spreadsheet } from '../base/index';
import { IRenderer } from '../common/index';
import { CellModel } from '../../workbook/index';
/**
 * Sheet module is used to render Sheet

 */
export declare class SheetRender implements IRenderer {
    private parent;
    private headerPanel;
    private contentPanel;
    private col;
    private rowRenderer;
    private cellRenderer;
    private freezePane;
    colGroupWidth: number;
    constructor(parent?: Spreadsheet);
    private refreshSelectALLContent;
    private updateLeftColGroup;
    private detachColGroup;
    renderPanel(): void;
    private initHeaderPanel;
    createTable(): void;
    private createHeaderTable;
    private updateTable;
    /**
     * It is used to refresh the select all, row header, column header and content table contents.
     */
    renderTable(cells: Map<string, CellModel>, rowIdx: number, colIdx: number, lastIdx: number, top?: number, left?: number): void;
    refreshColumnContent(cells: Map<string, CellModel>, rowIndex: number, colIndex: number, lastIdx: number): void;
    refreshRowContent(cells: Map<string, CellModel>, startIndex: number, lastIdx: number): void;
    private updateCol;
    updateColContent(cells: Map<string, CellModel>, rowIdx: number, colIdx: number, lastIdx: number, direction: string): void;
    updateRowContent(cells: Map<string, CellModel>, startIndex: number, lastIdx: number, direction: string): void;
    /**
     * Used to toggle row and column headers.
     */
    showHideHeaders(): void;
    private renderHeaders;
    private updateHideHeaders;
    /**
     * Get the select all table element of spreadsheet
     * @return {HTMLElement}
     */
    private getSelectAllContent;
    /**
     * Get the select all table element of spreadsheet
     * @return {Element}
     */
    private getSelectAllTable;
    /**
     * Get the column header element of spreadsheet
     * @return {HTMLTableElement}
     */
    getColHeaderTable(): HTMLTableElement;
    /**
     * Get the row header table element of spreadsheet
     * @return {HTMLTableElement}
     */
    getRowHeaderTable(): HTMLTableElement;
    /**
     * Get the main content table element of spreadsheet
     * @return {Element}
     */
    getContentTable(): HTMLTableElement;
    /**
     * Get the row header div element of spreadsheet
     * @return {Element}
     */
    getRowHeaderPanel(): Element;
    /**
     * Get the column header div element of spreadsheet
     * @return {Element}
     */
    getColHeaderPanel(): Element;
    /**
     * Get the main content div element of spreadsheet
     * @return {Element}
     */
    getContentPanel(): Element;
}
