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
var RangeSettingsDirective = /** @class */ (function (_super) {
    __extends(RangeSettingsDirective, _super);
    function RangeSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingsDirective.prototype.render = function () {
        return;
    };
    RangeSettingsDirective = __decorate([
        EJComponentDecorator({})
    ], RangeSettingsDirective);
    return RangeSettingsDirective;
}(Vue));
export { RangeSettingsDirective };
export var RangeSettingsPlugin = {
    name: 'e-rangesettings',
    install: function (Vue) {
        Vue.component(RangeSettingsPlugin.name, RangeSettingsDirective);
    }
};
/**
 * `e-rangesetting` directive represent a range setting of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rangesettings>
 *    <e-rangesetting :dataSource='data'></e-rangesetting>
 *    </e-rangesettings>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var RangeSettingDirective = /** @class */ (function (_super) {
    __extends(RangeSettingDirective, _super);
    function RangeSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingDirective.prototype.render = function () {
        return;
    };
    RangeSettingDirective = __decorate([
        EJComponentDecorator({})
    ], RangeSettingDirective);
    return RangeSettingDirective;
}(Vue));
export { RangeSettingDirective };
export var RangeSettingPlugin = {
    name: 'e-rangesetting',
    install: function (Vue) {
        Vue.component(RangeSettingPlugin.name, RangeSettingDirective);
    }
};
