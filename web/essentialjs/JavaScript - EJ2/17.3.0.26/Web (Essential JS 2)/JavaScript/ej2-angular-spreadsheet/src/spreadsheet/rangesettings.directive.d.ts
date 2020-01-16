import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-rangesetting` directive represent a range setting of the Angular Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```html
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rangesettings>
 *    <e-rangesetting [dataSource]='data'></e-rangesetting>
 *    </e-rangesettings>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class RangeSettingDirective extends ComplexBase<RangeSettingDirective> {
    private viewContainerRef;
    /**
     * Specifies the data as JSON / Data manager to the sheet.

     */
    dataSource: any;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.

     */
    query: any;
    /**
     * Show/Hide the field of the datasource as header.

     */
    showFieldAsHeader: any;
    /**
     * Specifies the start cell from which the datasource will be populated.

     */
    startCell: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * RangeSetting Array Directive
 * @private
 */
export declare class RangeSettingsDirective extends ArrayBase<RangeSettingsDirective> {
    constructor();
}
