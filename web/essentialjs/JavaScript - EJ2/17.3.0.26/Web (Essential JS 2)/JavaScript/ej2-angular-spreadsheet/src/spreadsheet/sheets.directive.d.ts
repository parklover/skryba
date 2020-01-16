import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-sheet` directive represent a sheet of the Angular Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```html
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet></e-sheet>
 *    <e-sheet></e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class SheetDirective extends ComplexBase<SheetDirective> {
    private viewContainerRef;
    childRows: any;
    childColumns: any;
    childRangeSettings: any;
    tags: string[];
    /**
     * Specifies active cell within `selectedRange` in the sheet.

     */
    activeCell: any;
    /**
     * Defines the number of columns to be rendered in the sheet.


     */
    colCount: any;
    /**
     * Configures column and its properties for the sheet.

     */
    columns: any;
    /**
     * Specifies index of the sheet. Based on the index, sheet properties are applied.


     */
    index: any;
    /**
     * Specifies the name of the sheet, the name will show in the sheet tabs.

     */
    name: any;
    /**
     * Specifies the range settings for the sheet.

     */
    rangeSettings: any;
    /**
     * Defines the number of rows to be rendered in the sheet.


     */
    rowCount: any;
    /**
     * Configures row and its properties for the sheet.

     */
    rows: any;
    /**
     * Specifies selected range in the sheet.
     *

     */
    selectedRange: any;
    /**
     * Specifies to show / hide grid lines in the sheet.

     */
    showGridLines: any;
    /**
     * Specifies to show / hide column and row headers in the sheet.

     */
    showHeaders: any;
    /**
     * Specified cell will be positioned at the upper-left corner of the sheet.

     */
    topLeftCell: any;
    /**
     * Defines the used range of the sheet.

     */
    usedRange: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Sheet Array Directive
 * @private
 */
export declare class SheetsDirective extends ArrayBase<SheetsDirective> {
    constructor();
}
