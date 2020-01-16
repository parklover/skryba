import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { TreeMap } from '@syncfusion/ej2-treemap';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * TreeMap Component
 * ```html
 * <ej-treemap></ej-treemap>
 * ```
 */
export declare class TreeMapComponent extends TreeMap implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childLevels: any;
    tags: string[];
    tooltipSettings_template: any;
    leafItemSettings_labelTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
