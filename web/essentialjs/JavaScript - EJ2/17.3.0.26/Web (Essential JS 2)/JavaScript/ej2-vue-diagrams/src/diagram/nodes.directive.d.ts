import Vue from 'vue';
export declare class NodesDirective extends Vue {
    render(): void;
}
export declare const NodesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-node` directive represent a nodes of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node></e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare class NodeDirective extends Vue {
    render(): void;
}
export declare const NodePlugin: {
    name: string;
    install(Vue: any): void;
};
