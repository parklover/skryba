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
import { Tab } from '@syncfusion/ej2-navigations';
import { TabItemsDirective, TabItemDirective, TabItemsPlugin, TabItemPlugin } from './items.directive';
export var properties = ['animation', 'cssClass', 'enablePersistence', 'enableRtl', 'headerPlacement', 'height', 'heightAdjustMode', 'items', 'locale', 'overflowMode', 'scrollStep', 'selectedItem', 'showCloseButton', 'width', 'added', 'adding', 'created', 'destroyed', 'removed', 'removing', 'selected', 'selecting'];
export var modelProps = [];
/**
 * Represents the EJ2 VueJS Tab Component.
 * ```html
 * <ejs-tab  :items='tabItems'></ejs-tab>
 * ```
 */
var TabComponent = /** @class */ (function (_super) {
    __extends(TabComponent, _super);
    function TabComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-tabitems": "e-tabitem" };
        _this.tagNameMapper = { "e-tabitems": "e-items" };
        _this.ej2Instances = new Tab({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    TabComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    TabComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    TabComponent.prototype.addTab = function (items, index) {
        return this.ej2Instances.addTab(items, index);
    };
    TabComponent.prototype.disable = function (value) {
        return this.ej2Instances.disable(value);
    };
    TabComponent.prototype.enableTab = function (index, value) {
        return this.ej2Instances.enableTab(index, value);
    };
    TabComponent.prototype.hideTab = function (index, value) {
        return this.ej2Instances.hideTab(index, value);
    };
    TabComponent.prototype.removeTab = function (index) {
        return this.ej2Instances.removeTab(index);
    };
    TabComponent.prototype.select = function (args) {
        return this.ej2Instances.select(args);
    };
    TabComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], TabComponent);
    return TabComponent;
}(ComponentBase));
export { TabComponent };
export var TabPlugin = {
    name: 'ejs-tab',
    install: function (Vue) {
        Vue.component(TabPlugin.name, TabComponent);
        Vue.component(TabItemPlugin.name, TabItemDirective);
        Vue.component(TabItemsPlugin.name, TabItemsDirective);
    }
};
