var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { Schedule } from '@syncfusion/ej2-schedule';
import { ViewsDirective, ViewDirective, ViewsPlugin, ViewPlugin } from './views.directive';
import { ResourcesDirective, ResourceDirective, ResourcesPlugin, ResourcePlugin } from './resources.directive';
import { HeaderRowsDirective, HeaderRowDirective, HeaderRowsPlugin, HeaderRowPlugin } from './headerrows.directive';
export var properties = ['agendaDaysCount', 'allowDragAndDrop', 'allowKeyboardInteraction', 'allowResizing', 'calendarMode', 'cellHeaderTemplate', 'cellTemplate', 'cssClass', 'currentView', 'dateFormat', 'dateHeaderTemplate', 'editorTemplate', 'enablePersistence', 'enableRecurrenceValidation', 'enableRtl', 'endHour', 'eventDragArea', 'eventSettings', 'firstDayOfWeek', 'group', 'headerRows', 'height', 'hideEmptyAgendaDays', 'locale', 'quickInfoTemplates', 'readonly', 'resourceHeaderTemplate', 'resources', 'rowAutoHeight', 'selectedDate', 'showHeaderBar', 'showQuickInfo', 'showTimeIndicator', 'showWeekNumber', 'showWeekend', 'startHour', 'timeScale', 'timezone', 'views', 'width', 'workDays', 'workHours', 'actionBegin', 'actionComplete', 'actionFailure', 'cellClick', 'cellDoubleClick', 'created', 'dataBinding', 'dataBound', 'destroyed', 'drag', 'dragStart', 'dragStop', 'eventClick', 'eventRendered', 'hover', 'moreEventsClick', 'navigating', 'popupClose', 'popupOpen', 'renderCell', 'resizeStart', 'resizeStop', 'resizing', 'select'];
export var modelProps = ['currentView', 'selectedDate'];
/**
 * `ej-schedule` represents the VueJS Schedule Component.
 * ```vue
 * <ejs-schedule></ejs-schedule>
 * ```
 */
var ScheduleComponent = /** @class */ (function (_super) {
    __extends(ScheduleComponent, _super);
    function ScheduleComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-views": "e-view", "e-resources": "e-resource", "e-header-rows": "e-header-row" };
        _this.tagNameMapper = { "e-header-rows": "e-headerRows" };
        _this.ej2Instances = new Schedule({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    ScheduleComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    ScheduleComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            var key = this.models.toString().match(/checked|value/) || [];
            var propKey = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                this.$emit('update:' + propKey, eventProp[propKey]);
                this.$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler);
        }
    };
    ScheduleComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    ScheduleComponent.prototype.addEvent = function (data) {
        return this.ej2Instances.addEvent(data);
    };
    ScheduleComponent.prototype.addResource = function (resources, name, index) {
        return this.ej2Instances.addResource(resources, name, index);
    };
    ScheduleComponent.prototype.addSelectedClass = function (cells, focusCell) {
        return this.ej2Instances.addSelectedClass(cells, focusCell);
    };
    ScheduleComponent.prototype.boundaryValidation = function (pageY, pageX) {
        return this.ej2Instances.boundaryValidation(pageY, pageX);
    };
    ScheduleComponent.prototype.changeDate = function (selectedDate, event) {
        return this.ej2Instances.changeDate(selectedDate, event);
    };
    ScheduleComponent.prototype.changeView = function (view, event, muteOnChange, index) {
        return this.ej2Instances.changeView(view, event, muteOnChange, index);
    };
    ScheduleComponent.prototype.closeEditor = function () {
        return this.ej2Instances.closeEditor();
    };
    ScheduleComponent.prototype.closeQuickInfoPopup = function () {
        return this.ej2Instances.closeQuickInfoPopup();
    };
    ScheduleComponent.prototype.deleteEvent = function (id, currentAction) {
        return this.ej2Instances.deleteEvent(id, currentAction);
    };
    ScheduleComponent.prototype.exportToExcel = function (excelExportOptions) {
        return this.ej2Instances.exportToExcel(excelExportOptions);
    };
    ScheduleComponent.prototype.exportToICalendar = function (fileName) {
        return this.ej2Instances.exportToICalendar(fileName);
    };
    ScheduleComponent.prototype.getAllDayRow = function () {
        return this.ej2Instances.getAllDayRow();
    };
    ScheduleComponent.prototype.getAppointmentTemplate = function () {
        return this.ej2Instances.getAppointmentTemplate();
    };
    ScheduleComponent.prototype.getBlockEvents = function (startDate, endDate, includeOccurrences) {
        return this.ej2Instances.getBlockEvents(startDate, endDate, includeOccurrences);
    };
    ScheduleComponent.prototype.getCalendarMode = function () {
        return this.ej2Instances.getCalendarMode();
    };
    ScheduleComponent.prototype.getCellDetails = function (tdCol) {
        return this.ej2Instances.getCellDetails(tdCol);
    };
    ScheduleComponent.prototype.getCellHeaderTemplate = function () {
        return this.ej2Instances.getCellHeaderTemplate();
    };
    ScheduleComponent.prototype.getCellTemplate = function () {
        return this.ej2Instances.getCellTemplate();
    };
    ScheduleComponent.prototype.getContentTable = function () {
        return this.ej2Instances.getContentTable();
    };
    ScheduleComponent.prototype.getCssProperties = function () {
        return this.ej2Instances.getCssProperties();
    };
    ScheduleComponent.prototype.getCurrentTime = function () {
        return this.ej2Instances.getCurrentTime();
    };
    ScheduleComponent.prototype.getCurrentViewDates = function () {
        return this.ej2Instances.getCurrentViewDates();
    };
    ScheduleComponent.prototype.getCurrentViewEvents = function () {
        return this.ej2Instances.getCurrentViewEvents();
    };
    ScheduleComponent.prototype.getDateFromElement = function (td) {
        return this.ej2Instances.getDateFromElement(td);
    };
    ScheduleComponent.prototype.getDateHeaderTemplate = function () {
        return this.ej2Instances.getDateHeaderTemplate();
    };
    ScheduleComponent.prototype.getDateTime = function (date) {
        return this.ej2Instances.getDateTime(date);
    };
    ScheduleComponent.prototype.getDayNames = function (type) {
        return this.ej2Instances.getDayNames(type);
    };
    ScheduleComponent.prototype.getDeletedOccurrences = function (recurrenceData) {
        return this.ej2Instances.getDeletedOccurrences(recurrenceData);
    };
    ScheduleComponent.prototype.getEditorTemplate = function () {
        return this.ej2Instances.getEditorTemplate();
    };
    ScheduleComponent.prototype.getEventDetails = function (element) {
        return this.ej2Instances.getEventDetails(element);
    };
    ScheduleComponent.prototype.getEventTooltipTemplate = function () {
        return this.ej2Instances.getEventTooltipTemplate();
    };
    ScheduleComponent.prototype.getEvents = function (startDate, endDate, includeOccurrences) {
        return this.ej2Instances.getEvents(startDate, endDate, includeOccurrences);
    };
    ScheduleComponent.prototype.getHeaderTooltipTemplate = function () {
        return this.ej2Instances.getHeaderTooltipTemplate();
    };
    ScheduleComponent.prototype.getIndexOfDate = function (collection, date) {
        return this.ej2Instances.getIndexOfDate(collection, date);
    };
    ScheduleComponent.prototype.getMajorSlotTemplate = function () {
        return this.ej2Instances.getMajorSlotTemplate();
    };
    ScheduleComponent.prototype.getMinorSlotTemplate = function () {
        return this.ej2Instances.getMinorSlotTemplate();
    };
    ScheduleComponent.prototype.getNavigateView = function () {
        return this.ej2Instances.getNavigateView();
    };
    ScheduleComponent.prototype.getOccurrencesByID = function (eventID) {
        return this.ej2Instances.getOccurrencesByID(eventID);
    };
    ScheduleComponent.prototype.getOccurrencesByRange = function (startTime, endTime) {
        return this.ej2Instances.getOccurrencesByRange(startTime, endTime);
    };
    ScheduleComponent.prototype.getQuickInfoTemplatesContent = function () {
        return this.ej2Instances.getQuickInfoTemplatesContent();
    };
    ScheduleComponent.prototype.getQuickInfoTemplatesFooter = function () {
        return this.ej2Instances.getQuickInfoTemplatesFooter();
    };
    ScheduleComponent.prototype.getQuickInfoTemplatesHeader = function () {
        return this.ej2Instances.getQuickInfoTemplatesHeader();
    };
    ScheduleComponent.prototype.getResourceHeaderTemplate = function () {
        return this.ej2Instances.getResourceHeaderTemplate();
    };
    ScheduleComponent.prototype.getResourcesByIndex = function (index) {
        return this.ej2Instances.getResourcesByIndex(index);
    };
    ScheduleComponent.prototype.getSelectedElements = function () {
        return this.ej2Instances.getSelectedElements();
    };
    ScheduleComponent.prototype.getStartEndTime = function (startEndTime) {
        return this.ej2Instances.getStartEndTime(startEndTime);
    };
    ScheduleComponent.prototype.getTableRows = function () {
        return this.ej2Instances.getTableRows();
    };
    ScheduleComponent.prototype.getTimeString = function (date) {
        return this.ej2Instances.getTimeString(date);
    };
    ScheduleComponent.prototype.getWorkCellElements = function () {
        return this.ej2Instances.getWorkCellElements();
    };
    ScheduleComponent.prototype.hideSpinner = function () {
        return this.ej2Instances.hideSpinner();
    };
    ScheduleComponent.prototype.importICalendar = function (fileContent) {
        return this.ej2Instances.importICalendar(fileContent);
    };
    ScheduleComponent.prototype.isAllDayCell = function (td) {
        return this.ej2Instances.isAllDayCell(td);
    };
    ScheduleComponent.prototype.isSelectedDate = function (date) {
        return this.ej2Instances.isSelectedDate(date);
    };
    ScheduleComponent.prototype.isSlotAvailable = function (startTime, endTime, groupIndex) {
        return this.ej2Instances.isSlotAvailable(startTime, endTime, groupIndex);
    };
    ScheduleComponent.prototype.openEditor = function (data, action, isEventData, repeatType) {
        return this.ej2Instances.openEditor(data, action, isEventData, repeatType);
    };
    ScheduleComponent.prototype.print = function () {
        return this.ej2Instances.print();
    };
    ScheduleComponent.prototype.refreshEvents = function () {
        return this.ej2Instances.refreshEvents();
    };
    ScheduleComponent.prototype.removeNewEventElement = function () {
        return this.ej2Instances.removeNewEventElement();
    };
    ScheduleComponent.prototype.removeResource = function (resourceId, name) {
        return this.ej2Instances.removeResource(resourceId, name);
    };
    ScheduleComponent.prototype.removeSelectedClass = function () {
        return this.ej2Instances.removeSelectedClass();
    };
    ScheduleComponent.prototype.renderCompleted = function () {
        return this.ej2Instances.renderCompleted();
    };
    ScheduleComponent.prototype.renderElements = function (isLayoutOnly) {
        return this.ej2Instances.renderElements(isLayoutOnly);
    };
    ScheduleComponent.prototype.resetEventTemplates = function () {
        return this.ej2Instances.resetEventTemplates();
    };
    ScheduleComponent.prototype.resetLayoutTemplates = function () {
        return this.ej2Instances.resetLayoutTemplates();
    };
    ScheduleComponent.prototype.resetWorkHours = function (dates, start, end, groupIndex) {
        return this.ej2Instances.resetWorkHours(dates, start, end, groupIndex);
    };
    ScheduleComponent.prototype.saveEvent = function (data, currentAction) {
        return this.ej2Instances.saveEvent(data, currentAction);
    };
    ScheduleComponent.prototype.scrollTo = function (hour) {
        return this.ej2Instances.scrollTo(hour);
    };
    ScheduleComponent.prototype.selectCell = function (element) {
        return this.ej2Instances.selectCell(element);
    };
    ScheduleComponent.prototype.setRecurrenceEditor = function (recurrenceEditor) {
        return this.ej2Instances.setRecurrenceEditor(recurrenceEditor);
    };
    ScheduleComponent.prototype.setWorkHours = function (dates, start, end, groupIndex) {
        return this.ej2Instances.setWorkHours(dates, start, end, groupIndex);
    };
    ScheduleComponent.prototype.showSpinner = function () {
        return this.ej2Instances.showSpinner();
    };
    ScheduleComponent.prototype.templateParser = function (template) {
        return this.ej2Instances.templateParser(template);
    };
    ScheduleComponent.prototype.updateLayoutTemplates = function () {
        return this.ej2Instances.updateLayoutTemplates();
    };
    ScheduleComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], ScheduleComponent);
    return ScheduleComponent;
}(ComponentBase));
export { ScheduleComponent };
export var SchedulePlugin = {
    name: 'ejs-schedule',
    install: function (Vue) {
        Vue.component(SchedulePlugin.name, ScheduleComponent);
        Vue.component(ViewPlugin.name, ViewDirective);
        Vue.component(ViewsPlugin.name, ViewsDirective);
        Vue.component(ResourcePlugin.name, ResourceDirective);
        Vue.component(ResourcesPlugin.name, ResourcesDirective);
        Vue.component(HeaderRowPlugin.name, HeaderRowDirective);
        Vue.component(HeaderRowsPlugin.name, HeaderRowsDirective);
    }
};
