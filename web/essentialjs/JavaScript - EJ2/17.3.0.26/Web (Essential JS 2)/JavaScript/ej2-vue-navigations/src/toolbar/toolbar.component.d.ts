import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS Toolbar Component.
 * ```html
 * <ejs-toolbar  :items='toolbarItems'></ejs-toolbar>
 * ```
 */
export declare class ToolbarComponent extends ComponentBase {
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
    addItems(items: Object[], index?: number): void;
    disable(value: boolean): void;
    enableItems(items: number | Object | Object, isEnable?: boolean): void;
    hideItem(index: number | Object | Object, value?: boolean): void;
    refreshOverflow(): void;
    removeItems(args: number | Object | Object | Object | Object[]): void;
}
export declare const ToolbarPlugin: {
    name: string;
    install(Vue: any): void;
};
