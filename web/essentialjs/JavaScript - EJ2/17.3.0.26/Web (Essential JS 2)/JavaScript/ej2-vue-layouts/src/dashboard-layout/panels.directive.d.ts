import Vue from 'vue';
export declare class PanelsDirective extends Vue {
    render(): void;
}
export declare const PanelsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-panels' directive represent a presets of VueJS dashboardlayout component
 * It must be contained in a dashboardlayout component(`ejs-dashboardlayout`).
 * ```html
 * <ejs-dashboardlayout>
 *   <e-panels>
 *   <e-panel></e-panel>
 *   <e-panel></e-panel>
 *   </e-panels>
 * </ejs-dashboardlayout>
 * ```
 */
export declare class PanelDirective extends Vue {
    render(): void;
}
export declare const PanelPlugin: {
    name: string;
    install(Vue: any): void;
};
