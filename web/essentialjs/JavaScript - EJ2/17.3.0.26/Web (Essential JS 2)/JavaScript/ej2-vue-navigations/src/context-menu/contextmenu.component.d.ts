import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS ContextMenu Component.
 * ```html
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ejs-contextmenu target='#target' :items='menuItems'></ejs-contextmenu>
 * ```
 */
export declare class ContextMenuComponent extends ComponentBase {
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
    close(): void;
    enableItems(items: string[], enable: boolean, isUniqueId?: boolean): void;
    hideItems(items: string[], isUniqueId?: boolean): void;
    insertAfter(items: Object[], text: string, isUniqueId?: boolean): void;
    insertBefore(items: Object[], text: string, isUniqueId?: boolean): void;
    open(top: number, left: number, target?: Object): void;
    removeItems(items: string[], isUniqueId?: boolean): void;
    showItems(items: string[], isUniqueId?: boolean): void;
}
export declare const ContextMenuPlugin: {
    name: string;
    install(Vue: any): void;
};
