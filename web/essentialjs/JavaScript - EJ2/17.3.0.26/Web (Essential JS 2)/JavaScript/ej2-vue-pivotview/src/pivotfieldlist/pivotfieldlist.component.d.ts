import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-pivotfieldlist` represents the VueJS PivotFieldList Component.
 * ```vue
 * <ejs-pivotfieldlist></ejs-pivotfieldlist>
 * ```
 */
export declare class PivotFieldListComponent extends ComponentBase {
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
    update(control: Object): void;
    updateView(control: Object): void;
}
export declare const PivotFieldListPlugin: {
    name: string;
    install(Vue: any): void;
};
