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
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { PresetsDirective, PresetDirective, PresetsPlugin, PresetPlugin } from './presets.directive';
export var properties = ['allowEdit', 'calendarMode', 'cssClass', 'dayHeaderFormat', 'depth', 'enablePersistence', 'enableRtl', 'enabled', 'endDate', 'firstDayOfWeek', 'floatLabelType', 'format', 'htmlAttributes', 'keyConfigs', 'locale', 'max', 'maxDays', 'min', 'minDays', 'placeholder', 'presets', 'readonly', 'separator', 'serverTimezoneOffset', 'showClearButton', 'start', 'startDate', 'strictMode', 'value', 'weekNumber', 'width', 'zIndex', 'blur', 'change', 'close', 'created', 'destroyed', 'focus', 'navigated', 'open', 'renderDayCell', 'select'];
export var modelProps = ['startDate', 'endDate', 'value'];
/**
 * Represents the Essential JS 2 VueJS DateRangePicker Component.
 * ```html
 * <ejs-daterangepicker v-bind:startDate='date' v-bind:endDate='date'></ejs-daterangepicker>
 * ```
 */
var DateRangePickerComponent = /** @class */ (function (_super) {
    __extends(DateRangePickerComponent, _super);
    function DateRangePickerComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-presets": "e-preset" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new DateRangePicker({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    DateRangePickerComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    DateRangePickerComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
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
    DateRangePickerComponent.prototype.render = function (createElement) {
        return createElement('input', this.$slots.default);
    };
    DateRangePickerComponent.prototype.focusIn = function () {
        return this.ej2Instances.focusIn();
    };
    DateRangePickerComponent.prototype.focusOut = function () {
        return this.ej2Instances.focusOut();
    };
    DateRangePickerComponent.prototype.getSelectedRange = function () {
        return this.ej2Instances.getSelectedRange();
    };
    DateRangePickerComponent.prototype.hide = function (event) {
        return this.ej2Instances.hide(event);
    };
    DateRangePickerComponent.prototype.requiredModules = function () {
        return this.ej2Instances.requiredModules();
    };
    DateRangePickerComponent.prototype.show = function (element, event) {
        return this.ej2Instances.show(element, event);
    };
    DateRangePickerComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], DateRangePickerComponent);
    return DateRangePickerComponent;
}(ComponentBase));
export { DateRangePickerComponent };
export var DateRangePickerPlugin = {
    name: 'ejs-daterangepicker',
    install: function (Vue) {
        Vue.component(DateRangePickerPlugin.name, DateRangePickerComponent);
        Vue.component(PresetPlugin.name, PresetDirective);
        Vue.component(PresetsPlugin.name, PresetsDirective);
    }
};
