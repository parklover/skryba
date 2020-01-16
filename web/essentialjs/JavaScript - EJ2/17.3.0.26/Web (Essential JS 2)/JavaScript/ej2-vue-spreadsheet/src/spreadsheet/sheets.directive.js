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
var SheetsDirective = /** @class */ (function (_super) {
    __extends(SheetsDirective, _super);
    function SheetsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SheetsDirective.prototype.render = function () {
        return;
    };
    SheetsDirective = __decorate([
        EJComponentDecorator({})
    ], SheetsDirective);
    return SheetsDirective;
}(Vue));
export { SheetsDirective };
export var SheetsPlugin = {
    name: 'e-sheets',
    install: function (Vue) {
        Vue.component(SheetsPlugin.name, SheetsDirective);
    }
};
/**
 * `e-sheet` directive represent a sheet of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet></e-sheet>
 *    <e-sheet></e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
var SheetDirective = /** @class */ (function (_super) {
    __extends(SheetDirective, _super);
    function SheetDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SheetDirective.prototype.render = function () {
        return;
    };
    SheetDirective = __decorate([
        EJComponentDecorator({})
    ], SheetDirective);
    return SheetDirective;
}(Vue));
export { SheetDirective };
export var SheetPlugin = {
    name: 'e-sheet',
    install: function (Vue) {
        Vue.component(SheetPlugin.name, SheetDirective);
    }
};
