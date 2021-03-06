import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents Vuejs chart Component
 * ```vue
 * <ejs-chart></ejs-chart>
 * ```
 */
export declare class ChartComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    addSeries(seriesCollection: Object[]): void;
    createChartSvg(): void;
    export(type: Object, fileName: string): void;
    getLocalizedLabel(key: string): string;
    print(id?: string[] | string | Object): void;
    removeSeries(index: number): void;
    setAnnotationValue(annotationIndex: number, content: string): void;
}
export declare const ChartPlugin: {
    name: string;
    install(Vue: any): void;
};
