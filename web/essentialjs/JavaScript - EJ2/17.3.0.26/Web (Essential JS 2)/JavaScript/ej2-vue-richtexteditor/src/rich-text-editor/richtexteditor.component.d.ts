import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-richtexteditor` represents the VueJS RichTextEditor Component.
 * ```vue
 * <ejs-richtexteditor></ejs-richtexteditor>
 * ```
 */
export declare class RichTextEditorComponent extends ComponentBase {
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
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    executeCommand(commandName: Object, value?: string | Object | Object | Object): void;
    focusIn(): void;
    focusOut(): void;
    getCharCount(): number;
    getContent(): Object;
    getHtml(): string;
    getID(): string;
    getRange(): Object;
    getSelection(): string;
    getText(): string;
    invokeChangeEvent(): void;
    preventDefaultResize(e: Object | Object): void;
    print(): void;
    refreshUI(): void;
    removeToolbarItem(items: string | string[]): void;
    sanitizeHtml(value: string): string;
    selectAll(): void;
    selectRange(range: Object): void;
    setContentHeight(target?: string, isExpand?: boolean): void;
    setEnable(): void;
    setPlaceHolder(): void;
    setReadOnly(initial?: boolean): void;
    showFullScreen(): void;
    showSourceCode(): void;
    updateValue(value?: string): void;
}
export declare const RichTextEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
