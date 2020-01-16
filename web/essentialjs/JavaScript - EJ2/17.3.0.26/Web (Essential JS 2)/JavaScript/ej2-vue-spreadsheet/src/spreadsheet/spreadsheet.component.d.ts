import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-spreadsheet` represents the VueJS Spreadsheet Component.
 * ```vue
 * <ejs-spreadsheet></ejs-spreadsheet>
 * ```
 */
export declare class SpreadsheetComponent extends ComponentBase {
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
    addContextMenuItems(items: Object[], text: string, insertAfter: boolean, isUniqueId?: boolean): void;
    addDefinedName(definedName: Object): boolean;
    cellFormat(style: Object, range?: string): void;
    closeEdit(): void;
    copy(address?: string): void;
    cut(address?: string): void;
    enableContextMenuItems(items: string[], enable: boolean, isUniqueId?: boolean): void;
    endEdit(): void;
    getData(address: string): Object;
    goTo(address: string): void;
    hideSpinner(): void;
    numberFormat(format: string, range?: string): void;
    open(options: Object): void;
    paste(address?: string, type?: Object): void;
    refreshClients(options: Object): void;
    removeContextMenuItems(items: string[], isUniqueId?: boolean): void;
    removeDefinedName(definedName: string, scope: string): boolean;
    resize(): void;
    save(saveOptions: Object): void;
    selectRange(address: string): void;
    setColWidth(width: number, colIndex: number, sheetIndex: number): void;
    setRowHeight(height: number, rowIndex: number, sheetIndex: number): void;
    showSpinner(): void;
    sort(sortOptions?: Object, range?: string): Object;
    startEdit(): void;
    updateCell(cell: Object, address?: string): void;
}
export declare const SpreadsheetPlugin: {
    name: string;
    install(Vue: any): void;
};
