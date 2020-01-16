import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { ListView } from '@syncfusion/ej2-lists';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents Angular ListView Component
 * ```
 * <ejs-listview [dataSource]='data'></ejs-listview>
 * ```
 */
export declare class ListViewComponent extends ListView implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    /**
     * The ListView supports to customize the content of each list items with the help of template property.
     * Refer the documentation [here](./listview/customizing-templates)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="listview/template-api/index.ts" %}{% endcodeBlock %}

     */
    template: any;
    /**
     * The ListView has an option to custom design the group header title with the help of groupTemplate property.
     * Refer the documentation [here]
     * (./listview/customizing-templates#group-template)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="listview/grouptemplate-api/index.ts" %}{% endcodeBlock %}

     */
    groupTemplate: any;
    /**
     * The ListView has an option to custom design the ListView header title with the help of headerTemplate property.
     * Refer the documentation [here]
     * (./listview/customizing-templates#header-template)
     *  to know more about this property with demo.
     *
     * {% codeBlock src="listview/headertemplate-api/index.ts" %}{% endcodeBlock %}

     */
    headerTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
