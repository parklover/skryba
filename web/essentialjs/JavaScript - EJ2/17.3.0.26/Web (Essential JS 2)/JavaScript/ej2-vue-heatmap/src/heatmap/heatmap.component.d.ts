import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents Vuejs HeatMap Component
 * ```vue
 * <ejs-heatmap></ejs-heatmap>
 * ```
 */
export declare class HeatMapComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    setProperties(prop: any, muteOnChange: boolean): void;
    render(createElement: any): any;
    clearSelection(): void;
    heatMapMouseClick(e: Object): boolean;
    refresh(): void;
    refreshBound(): void;
}
export declare const HeatMapPlugin: {
    name: string;
    install(Vue: any): void;
};
