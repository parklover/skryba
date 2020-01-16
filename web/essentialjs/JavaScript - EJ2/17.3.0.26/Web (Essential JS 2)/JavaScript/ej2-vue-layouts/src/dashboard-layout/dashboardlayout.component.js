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
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { PanelsDirective, PanelDirective, PanelsPlugin, PanelPlugin } from './panels.directive';
export var properties = ['allowDragging', 'allowFloating', 'allowPushing', 'allowResizing', 'cellAspectRatio', 'cellSpacing', 'columns', 'draggableHandle', 'enablePersistence', 'enableRtl', 'locale', 'mediaQuery', 'panels', 'resizableHandles', 'showGridLines', 'change', 'created', 'destroyed', 'drag', 'dragStart', 'dragStop', 'resize', 'resizeStart', 'resizeStop'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS DashboardLayout Component.
 * ```html
 * <ejs-dashboardlayout></ejs-dashboardlayout>
 * ```
 */
var DashboardLayoutComponent = /** @class */ (function (_super) {
    __extends(DashboardLayoutComponent, _super);
    function DashboardLayoutComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-panels": "e-panel" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new DashboardLayout({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    DashboardLayoutComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    DashboardLayoutComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    DashboardLayoutComponent.prototype.addPanel = function (panel) {
        return this.ej2Instances.addPanel(panel);
    };
    DashboardLayoutComponent.prototype.movePanel = function (id, row, col) {
        return this.ej2Instances.movePanel(id, row, col);
    };
    DashboardLayoutComponent.prototype.refresh = function () {
        return this.ej2Instances.refresh();
    };
    DashboardLayoutComponent.prototype.removeAll = function () {
        return this.ej2Instances.removeAll();
    };
    DashboardLayoutComponent.prototype.removePanel = function (id) {
        return this.ej2Instances.removePanel(id);
    };
    DashboardLayoutComponent.prototype.resizePanel = function (id, sizeX, sizeY) {
        return this.ej2Instances.resizePanel(id, sizeX, sizeY);
    };
    DashboardLayoutComponent.prototype.serialize = function () {
        return this.ej2Instances.serialize();
    };
    DashboardLayoutComponent.prototype.updatePanel = function (panel) {
        return this.ej2Instances.updatePanel(panel);
    };
    DashboardLayoutComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], DashboardLayoutComponent);
    return DashboardLayoutComponent;
}(ComponentBase));
export { DashboardLayoutComponent };
export var DashboardLayoutPlugin = {
    name: 'ejs-dashboardlayout',
    install: function (Vue) {
        Vue.component(DashboardLayoutPlugin.name, DashboardLayoutComponent);
        Vue.component(PanelPlugin.name, PanelDirective);
        Vue.component(PanelsPlugin.name, PanelsDirective);
    }
};
