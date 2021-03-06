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
import { Toolbar } from '@syncfusion/ej2-navigations';
import { ItemsDirective, ItemDirective, ItemsPlugin, ItemPlugin } from './items.directive';
export var properties = ['enableCollision', 'enablePersistence', 'enableRtl', 'height', 'items', 'locale', 'overflowMode', 'scrollStep', 'width', 'beforeCreate', 'clicked', 'created', 'destroyed'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS Toolbar Component.
 * ```html
 * <ejs-toolbar  :items='toolbarItems'></ejs-toolbar>
 * ```
 */
var ToolbarComponent = /** @class */ (function (_super) {
    __extends(ToolbarComponent, _super);
    function ToolbarComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-items": "e-item" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new Toolbar({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    ToolbarComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    ToolbarComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    ToolbarComponent.prototype.addItems = function (items, index) {
        return this.ej2Instances.addItems(items, index);
    };
    ToolbarComponent.prototype.disable = function (value) {
        return this.ej2Instances.disable(value);
    };
    ToolbarComponent.prototype.enableItems = function (items, isEnable) {
        return this.ej2Instances.enableItems(items, isEnable);
    };
    ToolbarComponent.prototype.hideItem = function (index, value) {
        return this.ej2Instances.hideItem(index, value);
    };
    ToolbarComponent.prototype.refreshOverflow = function () {
        return this.ej2Instances.refreshOverflow();
    };
    ToolbarComponent.prototype.removeItems = function (args) {
        return this.ej2Instances.removeItems(args);
    };
    ToolbarComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}(ComponentBase));
export { ToolbarComponent };
export var ToolbarPlugin = {
    name: 'ejs-toolbar',
    install: function (Vue) {
        Vue.component(ToolbarPlugin.name, ToolbarComponent);
        Vue.component(ItemPlugin.name, ItemDirective);
        Vue.component(ItemsPlugin.name, ItemsDirective);
    }
};
