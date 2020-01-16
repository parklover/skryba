import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { RangeNavigator } from '@syncfusion/ej2-charts';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * RangeNavigator Component
 * ```html
 * <ejs-rangenavigator></ejs-rangenavigator>
 * ```
 */
export declare class RangeNavigatorComponent extends RangeNavigator implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childSeries: any;
    tags: string[];
    dataSourceChange: any;
    tooltip_template: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
