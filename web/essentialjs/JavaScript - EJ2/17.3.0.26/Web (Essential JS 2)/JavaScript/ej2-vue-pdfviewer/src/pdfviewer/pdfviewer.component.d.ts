import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-pdfviewer` represents the VueJS PdfViewer Component.
 * ```vue
 * <ejs-pdfviewer></ejs-pdfviewer>
 * ```
 */
export declare class PdfViewerComponent extends ComponentBase {
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
    deleteAnnotations(): void;
    download(): void;
    exportAnnotations(): void;
    exportAnnotationsAsObject(): Object;
    exportFormFields(): void;
    exportFormFieldsAsObject(): Object;
    importAnnotations(importData: any): void;
    importFormFields(formFields: any): void;
    load(document: string, password: string): void;
    redo(): void;
    requiredModules(): Object[];
    saveAsBlob(): Object;
    undo(): void;
    unload(): void;
    updateViewerContainer(): void;
}
export declare const PdfViewerPlugin: {
    name: string;
    install(Vue: any): void;
};
