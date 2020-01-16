import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2 VueJS Document Editor Component
 * ```html
 * <ejs-documenteditor id='container'></ejs-documenteditor>
 * ```
 */
export declare class DocumentEditorComponent extends ComponentBase {
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
    enableAllModules(): void;
    fitPage(pageFitType?: Object): void;
    focusIn(): void;
    getBookmarks(): string[];
    getStyleNames(styleType?: Object): string[];
    getStyles(styleType?: Object): Object[];
    open(sfdtText: string): void;
    openBlank(): void;
    print(printWindow?: Object): void;
    resize(width?: number, height?: number): void;
    save(fileName: string, formatType?: Object): void;
    saveAsBlob(formatType?: Object): Object;
    scrollToPage(pageNumber: number): boolean;
    serialize(): string;
    setDefaultCharacterFormat(characterFormat: Object): void;
    setDefaultParagraphFormat(paragraphFormat: Object): void;
    setDefaultSectionFormat(sectionFormat: Object): void;
    showDialog(dialogType: Object): void;
    showOptionsPane(): void;
}
export declare const DocumentEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
