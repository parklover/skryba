import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Uploader } from '@syncfusion/ej2-inputs';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Uploader Component.
 * ```html
 * <ejs-uploader></ejs-uploader>
 * ```
 */
export declare class UploaderComponent extends Uploader implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childFiles: any;
    tags: string[];
    /**
     * Specifies the HTML string that used to customize the content of each file in the list.
     *
     * > For more information, refer to the [template](../../uploader/template/) section from the documentation.
     *

     */
    template: any;
    focus: any;
    blur: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
