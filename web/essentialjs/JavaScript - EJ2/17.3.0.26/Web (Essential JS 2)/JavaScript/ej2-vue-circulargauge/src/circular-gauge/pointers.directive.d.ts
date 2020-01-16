import Vue from 'vue';
export declare class PointersDirective extends Vue {
    render(): void;
}
export declare const PointersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `Pointers` directive represent a pointers of the Vuejs circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare class PointerDirective extends Vue {
    render(): void;
}
export declare const PointerPlugin: {
    name: string;
    install(Vue: any): void;
};
