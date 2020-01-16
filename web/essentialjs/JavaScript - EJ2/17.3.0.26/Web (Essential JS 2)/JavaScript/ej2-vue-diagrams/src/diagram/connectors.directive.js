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
var ConnectorsDirective = /** @class */ (function (_super) {
    __extends(ConnectorsDirective, _super);
    function ConnectorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorsDirective.prototype.render = function () {
        return;
    };
    ConnectorsDirective = __decorate([
        EJComponentDecorator({})
    ], ConnectorsDirective);
    return ConnectorsDirective;
}(Vue));
export { ConnectorsDirective };
export var ConnectorsPlugin = {
    name: 'e-connectors',
    install: function (Vue) {
        Vue.component(ConnectorsPlugin.name, ConnectorsDirective);
    }
};
/**
 * `e-connectors` directive represent a connectors of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector></e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
var ConnectorDirective = /** @class */ (function (_super) {
    __extends(ConnectorDirective, _super);
    function ConnectorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorDirective.prototype.render = function () {
        return;
    };
    ConnectorDirective = __decorate([
        EJComponentDecorator({})
    ], ConnectorDirective);
    return ConnectorDirective;
}(Vue));
export { ConnectorDirective };
export var ConnectorPlugin = {
    name: 'e-connector',
    install: function (Vue) {
        Vue.component(ConnectorPlugin.name, ConnectorDirective);
    }
};
