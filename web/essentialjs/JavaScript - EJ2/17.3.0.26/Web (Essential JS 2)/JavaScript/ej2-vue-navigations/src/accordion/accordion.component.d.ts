import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the EJ2 VueJS Accordion Component.
 * ```html
 * <ejs-accordion  :items='accordionItems'></ejs-accordion>
 * ```
 */
export declare class AccordionComponent extends ComponentBase {
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
    addItem(item: Object | Object, index?: number): void;
    enableItem(index: number, isEnable: boolean): void;
    expandItem(isExpand: boolean, index?: number): void;
    hideItem(index: number, isHidden?: Object): void;
    removeItem(index: number): void;
    select(index: number): void;
}
export declare const AccordionPlugin: {
    name: string;
    install(Vue: any): void;
};
