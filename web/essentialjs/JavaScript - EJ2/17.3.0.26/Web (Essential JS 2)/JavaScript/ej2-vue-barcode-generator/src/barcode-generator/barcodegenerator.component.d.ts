import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents vue Barcode Component
 * ```html
 * <ejs-barcode-generator></ejs-barcode-generator>
 * ```
 */
export declare class BarcodeGeneratorComponent extends ComponentBase {
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
export declare const BarcodeGeneratorPlugin: {
    name: string;
    install(Vue: any): void;
};
