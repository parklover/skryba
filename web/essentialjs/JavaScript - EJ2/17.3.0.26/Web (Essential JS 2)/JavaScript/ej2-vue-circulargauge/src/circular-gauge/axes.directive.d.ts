import Vue from 'vue';
export declare class AxesDirective extends Vue {
    render(): void;
}
export declare const AxesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `Axis` directive represent a axes of the Vuejs circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes><e-axis></e-axis></e-axes>
 * </ejs-circulargauge>
 * ```
 */
export declare class AxisDirective extends Vue {
    render(): void;
}
export declare const AxisPlugin: {
    name: string;
    install(Vue: any): void;
};
