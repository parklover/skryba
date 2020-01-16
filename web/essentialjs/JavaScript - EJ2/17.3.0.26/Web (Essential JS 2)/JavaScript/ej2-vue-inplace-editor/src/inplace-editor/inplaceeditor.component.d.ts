import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-inplace-editor` represents the VueJS InPlaceEditor Component.
 * ```vue
 * <ejs-inplaceeditor></ejs-inplaceeditor>
 * ```
 */
export declare class InPlaceEditorComponent extends ComponentBase {
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
    extendModelValue(val: string | number | boolean | Object | Object | string[] | Object[] | number[] | boolean[]): void;
    save(): void;
    setValue(): void;
    validate(): void;
}
export declare const InPlaceEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
