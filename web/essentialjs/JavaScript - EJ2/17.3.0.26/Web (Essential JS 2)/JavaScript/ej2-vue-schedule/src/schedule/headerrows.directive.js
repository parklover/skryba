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
var HeaderRowsDirective = /** @class */ (function (_super) {
    __extends(HeaderRowsDirective, _super);
    function HeaderRowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderRowsDirective.prototype.render = function () {
        return;
    };
    HeaderRowsDirective = __decorate([
        EJComponentDecorator({})
    ], HeaderRowsDirective);
    return HeaderRowsDirective;
}(Vue));
export { HeaderRowsDirective };
export var HeaderRowsPlugin = {
    name: 'e-header-rows',
    install: function (Vue) {
        Vue.component(HeaderRowsPlugin.name, HeaderRowsDirective);
    }
};
/**
 * `e-header-rows` directive represent a header rows of the VueJS Schedule.
 * It must be contained in a Schedule component(`ejs-schedule`).
 * ```vue
 * <ejs-schedule>
 *   <e-header-rows>
 *    <e-header-row option='Week'></e-header-row>
 *    <e-header-row option='Date'></e-header-row>
 *   </e-header-rows>
 * </ejs-schedule>
 * ```
 */
var HeaderRowDirective = /** @class */ (function (_super) {
    __extends(HeaderRowDirective, _super);
    function HeaderRowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderRowDirective.prototype.render = function () {
        return;
    };
    HeaderRowDirective = __decorate([
        EJComponentDecorator({})
    ], HeaderRowDirective);
    return HeaderRowDirective;
}(Vue));
export { HeaderRowDirective };
export var HeaderRowPlugin = {
    name: 'e-header-row',
    install: function (Vue) {
        Vue.component(HeaderRowPlugin.name, HeaderRowDirective);
    }
};
