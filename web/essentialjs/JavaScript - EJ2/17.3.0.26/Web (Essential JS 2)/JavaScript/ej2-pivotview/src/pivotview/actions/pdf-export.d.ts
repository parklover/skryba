import { PivotView } from '../base/pivotview';
/**

 * `PDFExport` module is used to handle the PDF export action.
 */
export declare class PDFExport {
    private parent;
    private gridStyle;
    private engine;
    /**
     * Constructor for the PivotGrid PDF Export module.

     */
    constructor(parent?: PivotView);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private addPage;
    private hexDecToRgb;
    private getFontStyle;
    private getBorderStyle;
    private getDashStyle;
    private getStyle;
    private setRecordThemeStyle;
    /**
     * Method to perform pdf export.

     */
    exportToPDF(): void;
    private applyStyle;
    private getFontFamily;
    private getFont;
    private processCellStyle;
    private applyEvent;
    /**
     * To destroy the pdf export module
     * @returns void

     */
    destroy(): void;
}
