import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-event-markers` directive represent a event marker collection in Gantt.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-event-markers>
 *     <e-event-marker day='02/10/2018' label='Project Starts'></e-event-marker>
 *   </e-event-markers>
 * </ejs-gantt>
 * ```
 */
export declare class EventMarkerDirective extends ComplexBase<EventMarkerDirective> {
    private viewContainerRef;
    /**
     * Define custom css class for event marker to customize line and label.

     */
    cssClass: any;
    /**
     * Defines day of event marker.

     */
    day: any;
    /**
     * Defines label of event marker.

     */
    label: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * EventMarker Array Directive
 * @private
 */
export declare class EventMarkersDirective extends ArrayBase<EventMarkersDirective> {
    constructor();
}
