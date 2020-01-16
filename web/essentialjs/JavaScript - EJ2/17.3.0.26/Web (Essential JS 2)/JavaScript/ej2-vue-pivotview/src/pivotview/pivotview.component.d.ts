import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-pivotview` represents the VueJS PivotView Component.
 * ```vue
 * <ejs-pivotview></ejs-pivotview>
 * ```
 */
export declare class PivotViewComponent extends ComponentBase {
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
    chartExport(type: Object, fileName: string, orientation?: Object, width?: number, height?: number): void;
    createCalculatedFieldDialog(): void;
    csvExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): void;
    excelExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): void;
    getCellTemplate(): Object;
    loadPersistData(persistData: string): void;
    pdfExport(pdfExportProperties?: Object, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): void;
    printChart(): void;
    refresh(): void;
    showConditionalFormattingDialog(): void;
    templateParser(template: string): Object;
}
export declare const PivotViewPlugin: {
    name: string;
    install(Vue: any): void;
};
