import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Vue Toast Component
 * ```html
 * <ejs-toast></ejs-toast>
 * ```
 */
export declare class ToastComponent extends ComponentBase {
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
    hide(element?: Object | Object | string): void;
    show(toastObj?: Object): void;
}
export declare const ToastPlugin: {
    name: string;
    install(Vue: any): void;
};
