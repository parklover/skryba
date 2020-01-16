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
var AccordionItemsDirective = /** @class */ (function (_super) {
    __extends(AccordionItemsDirective, _super);
    function AccordionItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemsDirective.prototype.render = function () {
        return;
    };
    AccordionItemsDirective = __decorate([
        EJComponentDecorator({})
    ], AccordionItemsDirective);
    return AccordionItemsDirective;
}(Vue));
export { AccordionItemsDirective };
export var AccordionItemsPlugin = {
    name: 'e-accordionitems',
    install: function (Vue) {
        Vue.component(AccordionItemsPlugin.name, AccordionItemsDirective);
    }
};
var AccordionItemDirective = /** @class */ (function (_super) {
    __extends(AccordionItemDirective, _super);
    function AccordionItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemDirective.prototype.render = function () {
        return;
    };
    AccordionItemDirective = __decorate([
        EJComponentDecorator({})
    ], AccordionItemDirective);
    return AccordionItemDirective;
}(Vue));
export { AccordionItemDirective };
export var AccordionItemPlugin = {
    name: 'e-accordionitem',
    install: function (Vue) {
        Vue.component(AccordionItemPlugin.name, AccordionItemDirective);
    }
};
