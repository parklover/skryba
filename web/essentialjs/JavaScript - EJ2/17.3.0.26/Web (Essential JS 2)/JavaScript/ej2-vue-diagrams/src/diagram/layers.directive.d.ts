import Vue from 'vue';
export declare class LayersDirective extends Vue {
    render(): void;
}
export declare const LayersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-layers` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-layers>
 * <e-layer>
 * </e-layers>
 * </e-layers>
</ejs-diagram>
 * ```
 */
export declare class LayerDirective extends Vue {
    render(): void;
}
export declare const LayerPlugin: {
    name: string;
    install(Vue: any): void;
};
