import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the EJ2 VueJS TreeView Component.
 * ```html
 * <ejs-treeview></ejs-treeview>
 * ```
 */
export declare class TreeViewComponent extends ComponentBase {
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
    addNodes(nodes: undefined[], target?: string | Object, index?: number, preventTargetExpand?: boolean): void;
    beginEdit(node: string | Object): void;
    checkAll(nodes?: string[] | Object[]): void;
    collapseAll(nodes?: string[] | Object[], level?: number, excludeHiddenNodes?: boolean): void;
    disableNodes(nodes: string[] | Object[]): void;
    enableNodes(nodes: string[] | Object[]): void;
    ensureVisible(node: string | Object): void;
    expandAll(nodes?: string[] | Object[], level?: number, excludeHiddenNodes?: boolean): void;
    getAllCheckedNodes(): string[];
    getNode(node: string | Object): Object;
    getTreeData(node?: string | Object): undefined[];
    moveNodes(sourceNodes: string[] | Object[], target: string | Object, index: number, preventTargetExpand?: boolean): void;
    removeNodes(nodes: string[] | Object[]): void;
    uncheckAll(nodes?: string[] | Object[]): void;
    updateNode(target: string | Object, newText: string): void;
}
export declare const TreeViewPlugin: {
    name: string;
    install(Vue: any): void;
};
