import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * Selected Data Directive
 * ```html
 * <e-selecteddataindexes><e-selecteddataindex></e-selecteddataindex><e-selecteddataindexes>
 * ```
 */
export declare class SelectedDataIndexDirective extends ComplexBase<SelectedDataIndexDirective> {
    private viewContainerRef;
    /**
     * Specifies the point index


     */
    point: any;
    /**
     * Specifies the series index


     */
    series: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * SelectedDataIndex Array Directive
 * @private
 */
export declare class SelectedDataIndexesDirective extends ArrayBase<SelectedDataIndexesDirective> {
    constructor();
}
