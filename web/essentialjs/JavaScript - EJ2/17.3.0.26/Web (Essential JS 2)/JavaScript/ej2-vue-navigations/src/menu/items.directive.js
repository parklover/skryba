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
var MenuItemsDirective = /** @class */ (function (_super) {
    __extends(MenuItemsDirective, _super);
    function MenuItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemsDirective.prototype.render = function () {
        return;
    };
    MenuItemsDirective = __decorate([
        EJComponentDecorator({})
    ], MenuItemsDirective);
    return MenuItemsDirective;
}(Vue));
export { MenuItemsDirective };
export var MenuItemsPlugin = {
    name: 'e-menu-items',
    install: function (Vue) {
        Vue.component(MenuItemsPlugin.name, MenuItemsDirective);
    }
};
var MenuItemDirective = /** @class */ (function (_super) {
    __extends(MenuItemDirective, _super);
    function MenuItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemDirective.prototype.render = function () {
        return;
    };
    MenuItemDirective = __decorate([
        EJComponentDecorator({})
    ], MenuItemDirective);
    return MenuItemDirective;
}(Vue));
export { MenuItemDirective };
export var MenuItemPlugin = {
    name: 'e-',
    install: function (Vue) {
        Vue.component(MenuItemPlugin.name, MenuItemDirective);
    }
};
