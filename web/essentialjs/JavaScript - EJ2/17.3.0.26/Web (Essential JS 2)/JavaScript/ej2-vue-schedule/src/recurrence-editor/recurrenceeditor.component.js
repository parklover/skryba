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
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { RecurrenceEditor } from '@syncfusion/ej2-schedule';
export var properties = ['calendarMode', 'cssClass', 'dateFormat', 'enablePersistence', 'enableRtl', 'firstDayOfWeek', 'frequencies', 'locale', 'maxDate', 'minDate', 'selectedType', 'startDate', 'value', 'change'];
export var modelProps = [];
/**
 * `ejs-recurrenceeditor` represents the VueJS RecurrenceEditor Component.
 * ```vue
 * <ejs-recurrenceeditor></ejs-recurrenceeditor>
 * ```
 */
var RecurrenceEditorComponent = /** @class */ (function (_super) {
    __extends(RecurrenceEditorComponent, _super);
    function RecurrenceEditorComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = false;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new RecurrenceEditor({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    RecurrenceEditorComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    RecurrenceEditorComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    RecurrenceEditorComponent.prototype.getCalendarMode = function () {
        return this.ej2Instances.getCalendarMode();
    };
    RecurrenceEditorComponent.prototype.getRecurrenceDates = function (startDate, rule, excludeDate, maximumCount, viewDate) {
        return this.ej2Instances.getRecurrenceDates(startDate, rule, excludeDate, maximumCount, viewDate);
    };
    RecurrenceEditorComponent.prototype.getRecurrenceRule = function () {
        return this.ej2Instances.getRecurrenceRule();
    };
    RecurrenceEditorComponent.prototype.getRuleSummary = function (rule) {
        return this.ej2Instances.getRuleSummary(rule);
    };
    RecurrenceEditorComponent.prototype.resetFields = function () {
        return this.ej2Instances.resetFields();
    };
    RecurrenceEditorComponent.prototype.setRecurrenceRule = function (rule, startDate) {
        return this.ej2Instances.setRecurrenceRule(rule, startDate);
    };
    RecurrenceEditorComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], RecurrenceEditorComponent);
    return RecurrenceEditorComponent;
}(ComponentBase));
export { RecurrenceEditorComponent };
export var RecurrenceEditorPlugin = {
    name: 'ejs-recurrenceeditor',
    install: function (Vue) {
        Vue.component(RecurrenceEditorPlugin.name, RecurrenceEditorComponent);
    }
};
