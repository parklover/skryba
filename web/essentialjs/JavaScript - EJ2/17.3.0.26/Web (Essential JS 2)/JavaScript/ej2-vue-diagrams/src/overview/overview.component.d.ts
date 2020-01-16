import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents vue Overview Component
 * ```html
 * <ej-overview></ej-overview>
 * ```
 */
export declare class OverviewComponent extends ComponentBase {
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
    updateHtmlLayer(view: Object): void;
}
export declare const OverviewPlugin: {
    name: string;
    install(Vue: any): void;
};
