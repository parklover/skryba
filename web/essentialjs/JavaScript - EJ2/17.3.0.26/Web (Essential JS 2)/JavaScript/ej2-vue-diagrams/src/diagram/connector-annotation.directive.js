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
var ConnectorAnnotationsDirective = /** @class */ (function (_super) {
    __extends(ConnectorAnnotationsDirective, _super);
    function ConnectorAnnotationsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorAnnotationsDirective.prototype.render = function () {
        return;
    };
    ConnectorAnnotationsDirective = __decorate([
        EJComponentDecorator({})
    ], ConnectorAnnotationsDirective);
    return ConnectorAnnotationsDirective;
}(Vue));
export { ConnectorAnnotationsDirective };
export var ConnectorAnnotationsPlugin = {
    name: 'e-connector-annotations',
    install: function (Vue) {
        Vue.component(ConnectorAnnotationsPlugin.name, ConnectorAnnotationsDirective);
    }
};
/**
 * `e-connector-annotation` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-annotations>
 * <e-connector-annotation>
 * </e-connector-annotation>
 * </e-connector-annotations>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
var ConnectorAnnotationDirective = /** @class */ (function (_super) {
    __extends(ConnectorAnnotationDirective, _super);
    function ConnectorAnnotationDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectorAnnotationDirective.prototype.render = function () {
        return;
    };
    ConnectorAnnotationDirective = __decorate([
        EJComponentDecorator({})
    ], ConnectorAnnotationDirective);
    return ConnectorAnnotationDirective;
}(Vue));
export { ConnectorAnnotationDirective };
export var ConnectorAnnotationPlugin = {
    name: 'e-connector-annotation',
    install: function (Vue) {
        Vue.component(ConnectorAnnotationPlugin.name, ConnectorAnnotationDirective);
    }
};
