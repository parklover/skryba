import Vue from 'vue';
export declare class PortsDirective extends Vue {
    render(): void;
}
export declare const PortsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-port` directive represent a port of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-ports>
 * <e-node-port>
 * </e-node-port>
 * </e-node-ports>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export declare class PortDirective extends Vue {
    render(): void;
}
export declare const PortPlugin: {
    name: string;
    install(Vue: any): void;
};
