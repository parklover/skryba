import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS ColorPicker Component
 * ```html
 * <ejs-colorpicker></ejs-colorpicker>
 * ```
 */
export declare class ColorPickerComponent extends ComponentBase {
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
    getValue(value?: string, type?: string): string;
    toggle(): void;
}
export declare const ColorPickerPlugin: {
    name: string;
    install(Vue: any): void;
};
