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
var PortsDirective = /** @class */ (function (_super) {
    __extends(PortsDirective, _super);
    function PortsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortsDirective.prototype.render = function () {
        return;
    };
    PortsDirective = __decorate([
        EJComponentDecorator({})
    ], PortsDirective);
    return PortsDirective;
}(Vue));
export { PortsDirective };
export var PortsPlugin = {
    name: 'e-node-ports',
    install: function (Vue) {
        Vue.component(PortsPlugin.name, PortsDirective);
    }
};
/**
 * `e-port` directive represent a port of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-ports>
 * <e-node-port>
 * </e-node-port>
 * </e-node-ports>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
var PortDirective = /** @class */ (function (_super) {
    __extends(PortDirective, _super);
    function PortDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PortDirective.prototype.render = function () {
        return;
    };
    PortDirective = __decorate([
        EJComponentDecorator({})
    ], PortDirective);
    return PortDirective;
}(Vue));
export { PortDirective };
export var PortPlugin = {
    name: 'e-node-port',
    install: function (Vue) {
        Vue.component(PortPlugin.name, PortDirective);
    }
};
