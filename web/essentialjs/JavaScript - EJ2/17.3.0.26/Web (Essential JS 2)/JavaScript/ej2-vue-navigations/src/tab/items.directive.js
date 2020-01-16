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
var TabItemsDirective = /** @class */ (function (_super) {
    __extends(TabItemsDirective, _super);
    function TabItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemsDirective.prototype.render = function () {
        return;
    };
    TabItemsDirective = __decorate([
        EJComponentDecorator({})
    ], TabItemsDirective);
    return TabItemsDirective;
}(Vue));
export { TabItemsDirective };
export var TabItemsPlugin = {
    name: 'e-tabitems',
    install: function (Vue) {
        Vue.component(TabItemsPlugin.name, TabItemsDirective);
    }
};
var TabItemDirective = /** @class */ (function (_super) {
    __extends(TabItemDirective, _super);
    function TabItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemDirective.prototype.render = function () {
        return;
    };
    TabItemDirective = __decorate([
        EJComponentDecorator({})
    ], TabItemDirective);
    return TabItemDirective;
}(Vue));
export { TabItemDirective };
export var TabItemPlugin = {
    name: 'e-tabitem',
    install: function (Vue) {
        Vue.component(TabItemPlugin.name, TabItemDirective);
    }
};
