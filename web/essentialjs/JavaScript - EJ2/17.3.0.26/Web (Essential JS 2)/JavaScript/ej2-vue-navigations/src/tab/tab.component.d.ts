import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the EJ2 VueJS Tab Component.
 * ```html
 * <ejs-tab  :items='tabItems'></ejs-tab>
 * ```
 */
export declare class TabComponent extends ComponentBase {
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
    addTab(items: Object[], index?: number): void;
    disable(value: boolean): void;
    enableTab(index: number, value: boolean): void;
    hideTab(index: number, value?: boolean): void;
    removeTab(index: number): void;
    select(args: number | Object): void;
}
export declare const TabPlugin: {
    name: string;
    install(Vue: any): void;
};
