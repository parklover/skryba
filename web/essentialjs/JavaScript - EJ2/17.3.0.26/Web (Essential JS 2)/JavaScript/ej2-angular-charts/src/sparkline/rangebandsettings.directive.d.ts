import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
export declare class RangeBandSettingDirective extends ComplexBase<RangeBandSettingDirective> {
    private viewContainerRef;
    /**
     * To configure sparkline rangeband color
     */
    color: any;
    /**
     * To configure sparkline end range

     */
    endRange: any;
    /**
     * To configure sparkline rangeband opacity

     */
    opacity: any;
    /**
     * To configure sparkline start range

     */
    startRange: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * RangeBandSetting Array Directive
 * @private
 */
export declare class RangeBandSettingsDirective extends ArrayBase<RangeBandSettingsDirective> {
    constructor();
}
