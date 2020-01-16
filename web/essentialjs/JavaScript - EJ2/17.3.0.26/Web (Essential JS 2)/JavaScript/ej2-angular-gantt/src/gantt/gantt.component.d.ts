import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Gantt } from '@syncfusion/ej2-gantt';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-gantt` represents the Angular Gantt Component.
 * ```html
 * <ejs-gantt [dataSource]='data' allowSelection='true' allowSorting='true'></ejs-gantt>
 * ```
 */
export declare class GanttComponent extends Gantt implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childColumns: any;
    childAddDialogFields: any;
    childEditDialogFields: any;
    childDayWorkingTime: any;
    childHolidays: any;
    childEventMarkers: any;
    tags: string[];
    dataSourceChange: any;
    /**
     * The parent task bar template that renders customized parent task bars from the given template.

     */
    parentTaskbarTemplate: any;
    /**
     * The milestone template that renders customized milestone task from the given template.

     */
    milestoneTemplate: any;
    /**
     * The task bar template that renders customized child task bars from the given template.

     */
    taskbarTemplate: any;
    labelSettings_rightLabel: any;
    labelSettings_leftLabel: any;
    labelSettings_taskLabel: any;
    tooltipSettings_taskbar: any;
    tooltipSettings_baseline: any;
    tooltipSettings_connectorLine: any;
    tooltipSettings_editing: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
