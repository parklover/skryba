import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS MaskedTextBox Component
 * ```html
 * <ejs-maskedtextbox v-bind:value='value'></ejs-maskedtextbox>
 * ```
 */
export declare class MaskedTextBoxComponent extends ComponentBase {
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
    focusIn(): void;
    focusOut(): void;
    getMaskedValue(): string;
}
export declare const MaskedTextBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
