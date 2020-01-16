import { ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { StockChart } from '@syncfusion/ej2-charts';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Stock Chart Component
 * ```html
 * <ejs-stockchart></ejs-stockchart>
 * ```
 */
export declare class StockChartComponent extends StockChart implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    childSeries: any;
    childAxes: any;
    childRows: any;
    childAnnotations: any;
    childSelectedDataIndexes: any;
    childPeriods: any;
    childStockEvents: any;
    childIndicators: any;
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
