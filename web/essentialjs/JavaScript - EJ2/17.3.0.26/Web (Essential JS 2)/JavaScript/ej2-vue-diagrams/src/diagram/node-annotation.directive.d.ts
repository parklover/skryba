import Vue from 'vue';
export declare class NodeAnnotationsDirective extends Vue {
    render(): void;
}
export declare const NodeAnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-annotations>
 * <e-node-annotation>
 * </e-node-annotation>
 * </e-node-annotations>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare class NodeAnnotationDirective extends Vue {
    render(): void;
}
export declare const NodeAnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
