import Vue from 'vue';
export declare class ConnectorsDirective extends Vue {
    render(): void;
}
export declare const ConnectorsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-connectors` directive represent a connectors of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
export declare class ConnectorDirective extends Vue {
    render(): void;
}
export declare const ConnectorPlugin: {
    name: string;
    install(Vue: any): void;
};
