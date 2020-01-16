import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ej-schedule` represents the VueJS Schedule Component.
 * ```vue
 * <ejs-schedule></ejs-schedule>
 * ```
 */
export declare class ScheduleComponent extends ComponentBase {
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
    addEvent(data: Object | Object[]): void;
    addResource(resources: Object | Object[], name: string, index: number): void;
    addSelectedClass(cells: Object[], focusCell: Object): void;
    boundaryValidation(pageY: number, pageX: number): Object;
    changeDate(selectedDate: Object, event?: Object): void;
    changeView(view: Object, event?: Object, muteOnChange?: boolean, index?: number): void;
    closeEditor(): void;
    closeQuickInfoPopup(): void;
    deleteEvent(id: string | number | undefined | undefined[], currentAction?: Object): void;
    exportToExcel(excelExportOptions?: Object): void;
    exportToICalendar(fileName?: string): void;
    getAllDayRow(): Object;
    getAppointmentTemplate(): Object;
    getBlockEvents(startDate?: Object, endDate?: Object, includeOccurrences?: boolean): Object[];
    getCalendarMode(): string;
    getCellDetails(tdCol: Object | Object[]): Object;
    getCellHeaderTemplate(): Object;
    getCellTemplate(): Object;
    getContentTable(): Object;
    getCssProperties(): Object;
    getCurrentTime(): Object;
    getCurrentViewDates(): Object[];
    getCurrentViewEvents(): Object[];
    getDateFromElement(td: Object): Object;
    getDateHeaderTemplate(): Object;
    getDateTime(date: Object): Object;
    getDayNames(type: string): string[];
    getDeletedOccurrences(recurrenceData: string | number | undefined): Object[];
    getEditorTemplate(): Object;
    getEventDetails(element: Object): Object;
    getEventTooltipTemplate(): Object;
    getEvents(startDate?: Object, endDate?: Object, includeOccurrences?: boolean): Object[];
    getHeaderTooltipTemplate(): Object;
    getIndexOfDate(collection: Object[], date: Object): number;
    getMajorSlotTemplate(): Object;
    getMinorSlotTemplate(): Object;
    getNavigateView(): Object;
    getOccurrencesByID(eventID: number | string): Object[];
    getOccurrencesByRange(startTime: Object, endTime: Object): Object[];
    getQuickInfoTemplatesContent(): Object;
    getQuickInfoTemplatesFooter(): Object;
    getQuickInfoTemplatesHeader(): Object;
    getResourceHeaderTemplate(): Object;
    getResourcesByIndex(index: number): Object;
    getSelectedElements(): Object[];
    getStartEndTime(startEndTime: string): Object;
    getTableRows(): Object[];
    getTimeString(date: Object): string;
    getWorkCellElements(): Object[];
    hideSpinner(): void;
    importICalendar(fileContent: Object): void;
    isAllDayCell(td: Object): boolean;
    isSelectedDate(date: Object): boolean;
    isSlotAvailable(startTime: Object | Object, endTime?: Object, groupIndex?: number): boolean;
    openEditor(data: Object, action: Object, isEventData?: boolean, repeatType?: number): void;
    print(): void;
    refreshEvents(): void;
    removeNewEventElement(): void;
    removeResource(resourceId: string | string[] | number | number[], name: string): void;
    removeSelectedClass(): void;
    renderCompleted(): void;
    renderElements(isLayoutOnly: boolean): void;
    resetEventTemplates(): void;
    resetLayoutTemplates(): void;
    resetWorkHours(dates: Object[], start?: string, end?: string, groupIndex?: number): void;
    saveEvent(data: undefined | undefined[], currentAction?: Object): void;
    scrollTo(hour: string): void;
    selectCell(element: undefined): void;
    setRecurrenceEditor(recurrenceEditor: Object): void;
    setWorkHours(dates: Object[], start: string, end: string, groupIndex?: number): void;
    showSpinner(): void;
    templateParser(template: string): Object;
    updateLayoutTemplates(): void;
}
export declare const SchedulePlugin: {
    name: string;
    install(Vue: any): void;
};
