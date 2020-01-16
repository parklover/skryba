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
import Vue from 'vue';
import { EJComponentDecorator } from '@syncfusion/ej2-vue-base';
var PresetsDirective = /** @class */ (function (_super) {
    __extends(PresetsDirective, _super);
    function PresetsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PresetsDirective.prototype.render = function () {
        return;
    };
    PresetsDirective = __decorate([
        EJComponentDecorator({})
    ], PresetsDirective);
    return PresetsDirective;
}(Vue));
export { PresetsDirective };
export var PresetsPlugin = {
    name: 'e-presets',
    install: function (Vue) {
        Vue.component(PresetsPlugin.name, PresetsDirective);
    }
};
/**
 * 'e-presets' directive represent a presets of VueJS daterangepicker
 * It must be contained in a daterangepicker component(`ej-daterangepicker`).
 * ```html
 * <ejs-daterangepicker id='range'>
 *   <e-presets>
 *   <e-preset label='Last Week' v-bind:start='startValue' v-bind:end='endValue'></e-preset>
 *   <e-preset label='Last Month' v-bind:start='startValue' v-bind:end='endValue'></e-preset>
 *   </e-presets>
 * </ejs-daterangepicker>
 * ```
 */
var PresetDirective = /** @class */ (function (_super) {
    __extends(PresetDirective, _super);
    function PresetDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PresetDirective.prototype.render = function () {
        return;
    };
    PresetDirective = __decorate([
        EJComponentDecorator({})
    ], PresetDirective);
    return PresetDirective;
}(Vue));
export { PresetDirective };
export var PresetPlugin = {
    name: 'e-preset',
    install: function (Vue) {
        Vue.component(PresetPlugin.name, PresetDirective);
    }
};
