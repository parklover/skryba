import Vue from 'vue';
export declare class ConnectorAnnotationsDirective extends Vue {
    render(): void;
}
export declare const ConnectorAnnotationsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-connector-annotation` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-annotations>
 * <e-connector-annotation>
 * </e-connector-annotation>
 * </e-connector-annotations>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
export declare class ConnectorAnnotationDirective extends Vue {
    render(): void;
}
export declare const ConnectorAnnotationPlugin: {
    name: string;
    install(Vue: any): void;
};
