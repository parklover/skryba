import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents Vuejs TreeMap Component
 * ```vue
 * <ejs-treemap></ejs-treemap>
 * ```
 */
export declare class TreeMapComponent extends ComponentBase {
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
    calculatePreviousLevelChildItems(labelText: Object, drillLevelValues: Object, item: Object, directLevel: boolean): boolean;
    calculateSelectedTextLevels(labelText: Object, item: Object): Object;
    clickOnTreeMap(e: Object): void;
    compareSelectedLabelWithDrillDownItems(drillLevelValues: Object, item: Object, i: number): Object;
    doubleClickOnTreeMap(e: Object): void;
    export(type: Object, fileName: string, orientation?: Object): void;
    findTotalWeight(processData: Object[], type: string): void;
    mouseDownOnTreeMap(e: Object): void;
    mouseEndOnTreeMap(e: Object): void;
    mouseLeaveOnTreeMap(e: Object): void;
    mouseMoveOnTreeMap(e: Object): void;
    print(id?: string[] | string | Object): void;
    reOrderLevelData(start: number): void;
    resizeOnTreeMap(e: Object): void;
    rightClickOnTreeMap(e: Object): void;
}
export declare const TreeMapPlugin: {
    name: string;
    install(Vue: any): void;
};
