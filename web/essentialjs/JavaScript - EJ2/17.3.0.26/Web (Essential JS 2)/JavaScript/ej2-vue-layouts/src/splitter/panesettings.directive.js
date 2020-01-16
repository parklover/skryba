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
var PanesDirective = /** @class */ (function (_super) {
    __extends(PanesDirective, _super);
    function PanesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanesDirective.prototype.render = function () {
        return;
    };
    PanesDirective = __decorate([
        EJComponentDecorator({})
    ], PanesDirective);
    return PanesDirective;
}(Vue));
export { PanesDirective };
export var PanesPlugin = {
    name: 'e-panes',
    install: function (Vue) {
        Vue.component(PanesPlugin.name, PanesDirective);
    }
};
/**
 * 'e-pane' directive represent a pane of Vue Splitter
 * It must be contained in a Splitter component(`ejs-splitter`).
 * ```html
 * <ejs-splitter id='splitter'>
 *   <e-panes>
 *    <e-pane size='150px'></e-pane>
 *    <e-pane size='150px'></e-pane>
 *   </e-panes>
 * </ejs-splitter>
 * ```
 */
var PaneDirective = /** @class */ (function (_super) {
    __extends(PaneDirective, _super);
    function PaneDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaneDirective.prototype.render = function () {
        return;
    };
    PaneDirective = __decorate([
        EJComponentDecorator({})
    ], PaneDirective);
    return PaneDirective;
}(Vue));
export { PaneDirective };
export var PanePlugin = {
    name: 'e-pane',
    install: function (Vue) {
        Vue.component(PanePlugin.name, PaneDirective);
    }
};
