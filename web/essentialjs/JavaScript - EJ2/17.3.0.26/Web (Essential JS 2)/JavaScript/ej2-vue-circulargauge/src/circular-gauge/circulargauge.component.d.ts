import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents Vuejs Circular Gauge Component
 * ```vue
 * <ejs-circulargauge></ejs-circulargauge>
 * ```
 */
export declare class CircularGaugeComponent extends ComponentBase {
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
    render(createElement: any): any;
    setAnnotationValue(axisIndex: number, annotationIndex: number, content: string): void;
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    setRangeValue(axisIndex: number, rangeIndex: number, start: number, end: number): void;
}
export declare const CircularGaugePlugin: {
    name: string;
    install(Vue: any): void;
};
