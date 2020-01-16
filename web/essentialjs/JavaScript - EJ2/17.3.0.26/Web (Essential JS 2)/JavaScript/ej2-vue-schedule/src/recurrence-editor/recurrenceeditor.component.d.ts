import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-recurrenceeditor` represents the VueJS RecurrenceEditor Component.
 * ```vue
 * <ejs-recurrenceeditor></ejs-recurrenceeditor>
 * ```
 */
export declare class RecurrenceEditorComponent extends ComponentBase {
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
    getCalendarMode(): string;
    getRecurrenceDates(startDate: Object, rule: string, excludeDate?: string, maximumCount?: number, viewDate?: Object): number[];
    getRecurrenceRule(): string;
    getRuleSummary(rule: string): string;
    resetFields(): void;
    setRecurrenceRule(rule: string, startDate: Object): void;
}
export declare const RecurrenceEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
