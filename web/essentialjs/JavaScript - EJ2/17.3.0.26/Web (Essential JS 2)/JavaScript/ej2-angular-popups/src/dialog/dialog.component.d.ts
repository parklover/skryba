import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Dialog } from '@syncfusion/ej2-popups';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the Angular Dialog Component
 * ```html
 * <ejs-dialog></ejs-dialog>
 * ```
 */
export declare class DialogComponent extends Dialog implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childButtons: any;
    tags: string[];
    visibleChange: any;
    /**
     * Specifies the template value that can be displayed with dialog's footer area.
     * This is optional property and can be used only when the footer is occupied with information or custom components.
     * By default, the footer is configured with action [buttons](#buttons).
     * If footer template is configured to dialog, the action buttons property will be disabled.
     *
     * > More information on the footer template configuration can be found on this [documentation](../../dialog/template/#footer) section.
     *


     */
    footerTemplate: any;
    /**
     * Specifies the value that can be displayed in the dialog's title area that can be configured with plain text or HTML elements.
     * This is optional property and the dialog can be displayed without header, if the header property is null.


     */
    header: any;
    /**
     * Specifies the value that can be displayed in dialog's content area.
     * It can be information, list, or other HTML elements.
     * The content of dialog can be loaded with dynamic data such as database, AJAX content, and more.
     *
     * {% codeBlock src="dialog/content-api/index.ts" %}{% endcodeBlock %}
     *
     *{% codeBlock src="dialog/content-api/index.html" %}{% endcodeBlock %}


     */
    content: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
