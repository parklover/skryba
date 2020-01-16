import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-holidays` directive represent a holidays collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-holidays>
 *     <e-holiday from='02/20/2018' label='Holiday 1'></e-holiday>
 *     <e-holiday from='05/15/2018' label='Holiday 2'></e-holiday>
 *   </e-holidays>
 * </ejs-gantt>
 * ```
 */
export declare class HolidayDirective extends ComplexBase<HolidayDirective> {
    private viewContainerRef;
    /**
     * Defines custom css class of holiday to customize background and label.

     */
    cssClass: any;
    /**
     * Defines start date of holiday.

     */
    from: any;
    /**
     * Defines label of holiday.

     */
    label: any;
    /**
     * Defines end date of holiday.

     */
    to: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Holiday Array Directive
 * @private
 */
export declare class HolidaysDirective extends ArrayBase<HolidaysDirective> {
    constructor();
}
