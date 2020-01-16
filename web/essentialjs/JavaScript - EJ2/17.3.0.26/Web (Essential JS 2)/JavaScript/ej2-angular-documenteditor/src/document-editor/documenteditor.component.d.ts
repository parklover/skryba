import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-documenteditor` represents the Angular Document Editor Component.
 * ```html
 * <ejs-documenteditor isReadOnly='true' enableSelection='true'></ejs-documenteditor>
 * ```
 */
export declare class DocumentEditorComponent extends DocumentEditor implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
