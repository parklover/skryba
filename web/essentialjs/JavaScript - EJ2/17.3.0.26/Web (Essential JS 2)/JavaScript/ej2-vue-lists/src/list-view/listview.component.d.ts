import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents VueJS ListView Component
 * ```
 * <ejs-listview :dataSource='data'></ejs-listview>
 * ```
 */
export declare class ListViewComponent extends ComponentBase {
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
    addItem(data: undefined[], fields: Object): void;
    back(): void;
    checkAllItems(): void;
    checkItem(item: Object | Object | Object): void;
    disableItem(obj: Object | Object | Object): void;
    enableItem(obj: Object | Object | Object): void;
    findItem(obj: Object | Object | Object): Object;
    getSelectedItems(): Object | Object | Object | Object;
    hideItem(obj: Object | Object | Object): void;
    refreshItemHeight(): void;
    removeItem(obj: Object | Object | Object): void;
    removeMultipleItems(obj: Object[] | Object[] | Object[]): void;
    requiredModules(): Object[];
    selectItem(obj: Object | Object | Object): void;
    selectMultipleItems(obj: Object[] | Object[] | Object[]): void;
    showItem(obj: Object | Object | Object): void;
    uncheckAllItems(): void;
    uncheckItem(item: Object | Object | Object): void;
}
export declare const ListViewPlugin: {
    name: string;
    install(Vue: any): void;
};
