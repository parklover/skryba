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
var DefinedNamesDirective = /** @class */ (function (_super) {
    __extends(DefinedNamesDirective, _super);
    function DefinedNamesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefinedNamesDirective.prototype.render = function () {
        return;
    };
    DefinedNamesDirective = __decorate([
        EJComponentDecorator({})
    ], DefinedNamesDirective);
    return DefinedNamesDirective;
}(Vue));
export { DefinedNamesDirective };
export var DefinedNamesPlugin = {
    name: 'e-definednames',
    install: function (Vue) {
        Vue.component(DefinedNamesPlugin.name, DefinedNamesDirective);
    }
};
/**
 * `e-definedname` directive represent a defined name of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-definednames>
 *    <e-definedname></e-definedname>
 *    <e-definedname></e-definedname>
 *   </e-definednames>
 * </ejs-spreadsheet>
 * ```
 */
var DefinedNameDirective = /** @class */ (function (_super) {
    __extends(DefinedNameDirective, _super);
    function DefinedNameDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefinedNameDirective.prototype.render = function () {
        return;
    };
    DefinedNameDirective = __decorate([
        EJComponentDecorator({})
    ], DefinedNameDirective);
    return DefinedNameDirective;
}(Vue));
export { DefinedNameDirective };
export var DefinedNamePlugin = {
    name: 'e-definedname',
    install: function (Vue) {
        Vue.component(DefinedNamePlugin.name, DefinedNameDirective);
    }
};
