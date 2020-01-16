import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents the Essential JS 2  VueJS Calendar Component.
 * ```html
 * <ejs-calendar v-bind:value='date'></ejs-calendar>
 * ```
 */
export declare class CalendarComponent extends ComponentBase {
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
    addDate(dates: Object | Object[]): void;
    createContent(): void;
    currentView(): string;
    navigateTo(view: Object, date: Object): void;
    removeDate(dates: Object | Object[]): void;
    requiredModules(): Object[];
}
export declare const CalendarPlugin: {
    name: string;
    install(Vue: any): void;
};
