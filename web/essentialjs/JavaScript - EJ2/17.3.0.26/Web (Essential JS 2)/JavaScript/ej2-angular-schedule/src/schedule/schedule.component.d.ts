import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Schedule } from '@syncfusion/ej2-schedule';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ej-schedule` represents the Angular Schedule Component.
 * ```html
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare class ScheduleComponent extends Schedule implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childViews: any;
    childResources: any;
    childHeaderRows: any;
    tags: string[];
    currentViewChange: any;
    selectedDateChange: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     *  the date header cells. The field that can be accessed via this template is `date`.
     * {% codeBlock src="schedule/date-header-api/index.ts" %}{% endcodeBlock %}

     */
    dateHeaderTemplate: any;
    /**
     * The template option which is used to render the customized work cells on the Schedule. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the work cells.
     *  The fields accessible via template are as follows.
     *  * date
     *  * groupIndex
     *  * type
     * {% codeBlock src="schedule/cell-template-api/index.html" %}{% endcodeBlock %}
     * {% codeBlock src="schedule/cell-template-api/index.ts" %}{% endcodeBlock %}

     */
    cellTemplate: any;
    /**
     * It accepts either the string or HTMLElement as template design content and parse it appropriately before displaying it onto
     *  the month date cells. This template is only applicable for month view day cells.

     */
    cellHeaderTemplate: any;
    eventSettings_tooltipTemplate: any;
    eventSettings_template: any;
    /**
     * The template option to render the customized editor window. The form elements defined within this template should be accompanied
     *  with `e-field` class, so as to fetch and process it from internally.
     * {% codeBlock src="schedule/editor-api/index.html" %}{% endcodeBlock %}
     * {% codeBlock src="schedule/editor-api/index.ts" %}{% endcodeBlock %}

     */
    editorTemplate: any;
    timeScale_minorSlotTemplate: any;
    timeScale_majorSlotTemplate: any;
    /**
     * Template option to customize the resource header bar. Here, the template accepts either
     *  the string or HTMLElement as template design and then the parsed design is displayed onto the resource header cells.
     * The following can be accessible via template.
     * * resource - All the resource fields.
     * * resourceData - object collection of current resource.
     * {% codeBlock src="schedule/resource-header-api/index.html" %}{% endcodeBlock %}
     * {% codeBlock src="schedule/resource-header-api/index.ts" %}{% endcodeBlock %}

     */
    resourceHeaderTemplate: any;
    quickInfoTemplates_header: any;
    quickInfoTemplates_content: any;
    quickInfoTemplates_footer: any;
    group_headerTooltipTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
