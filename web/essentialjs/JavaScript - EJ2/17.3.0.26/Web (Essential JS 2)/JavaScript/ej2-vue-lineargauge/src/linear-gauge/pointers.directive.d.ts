import Vue from 'vue';
export declare class PointersDirective extends Vue {
    render(): void;
}
export declare const PointersPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `Pointers` directive represent a pointers of the VueJS linear gauge.
 * ```vue
 * <ejs-lineargauge>
 * <e-axes>
 * <e-axis>
 * <e-pointers><e-pointer></e-pointer></e-pointers>
 * </e-axis>
 * </e-axes>
 * </ejs-lineargauge>
 * ```
 */
export declare class PointerDirective extends Vue {
    render(): void;
}
export declare const PointerPlugin: {
    name: string;
    install(Vue: any): void;
};
