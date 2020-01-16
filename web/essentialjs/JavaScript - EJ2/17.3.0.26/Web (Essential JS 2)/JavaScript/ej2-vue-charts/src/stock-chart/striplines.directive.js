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
var StockChartStripLinesDirective = /** @class */ (function (_super) {
    __extends(StockChartStripLinesDirective, _super);
    function StockChartStripLinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartStripLinesDirective.prototype.render = function () {
        return;
    };
    StockChartStripLinesDirective = __decorate([
        EJComponentDecorator({})
    ], StockChartStripLinesDirective);
    return StockChartStripLinesDirective;
}(Vue));
export { StockChartStripLinesDirective };
export var StockChartStripLinesPlugin = {
    name: 'e-stockchart-striplines',
    install: function (Vue) {
        Vue.component(StockChartStripLinesPlugin.name, StockChartStripLinesDirective);
    }
};
var StockChartStripLineDirective = /** @class */ (function (_super) {
    __extends(StockChartStripLineDirective, _super);
    function StockChartStripLineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartStripLineDirective.prototype.render = function () {
        return;
    };
    StockChartStripLineDirective = __decorate([
        EJComponentDecorator({})
    ], StockChartStripLineDirective);
    return StockChartStripLineDirective;
}(Vue));
export { StockChartStripLineDirective };
export var StockChartStripLinePlugin = {
    name: 'e-stockchart-stripline',
    install: function (Vue) {
        Vue.component(StockChartStripLinePlugin.name, StockChartStripLineDirective);
    }
};
