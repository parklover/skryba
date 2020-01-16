import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents vue DataMatrix Component
 * ```html
 * <ejs-datamatrix-generator></ejs-datamatrix-generator>
 * ```
 */
export declare class DataMatrixGeneratorComponent extends ComponentBase {
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
}
export declare const DataMatrixGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
