import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-spreadsheet` represents the Angular Spreadsheet Component.
 * ```html
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
export declare class SpreadsheetComponent extends Spreadsheet implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childSheets: any;
    childDefinedNames: any;
    tags: string[];
    template: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
