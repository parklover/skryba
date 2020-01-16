import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS TextBox Component
 * ```html
 * <ejs-textbox v-bind:value='value'></ejs-textbox>
 * ```
 */
export declare class TextBoxComponent extends ComponentBase {
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
    addAttributes(attributes: undefined): void;
    focusIn(): void;
    focusOut(): void;
    removeAttributes(attributes: string[]): void;
}
export declare const TextBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
