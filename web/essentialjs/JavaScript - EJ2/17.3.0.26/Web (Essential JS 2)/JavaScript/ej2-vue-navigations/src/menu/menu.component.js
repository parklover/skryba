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
import { Menu } from '@syncfusion/ej2-navigations';
import { MenuItemsDirective, MenuItemDirective, MenuItemsPlugin, MenuItemPlugin } from './items.directive';
export var properties = ['animationSettings', 'cssClass', 'enablePersistence', 'enableRtl', 'enableScrolling', 'fields', 'filter', 'hamburgerMode', 'items', 'locale', 'orientation', 'showItemOnClick', 'target', 'template', 'title', 'beforeClose', 'beforeItemRender', 'beforeOpen', 'created', 'onClose', 'onOpen', 'select'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS Menu Component.
 * ```html
 * <ejs-menu :items='menuItems'></ejs-menu>
 * ```
 */
var MenuComponent = /** @class */ (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-menu-items": "e-" };
        _this.tagNameMapper = { "e-menu-items": "e-items" };
        _this.ej2Instances = new Menu({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    MenuComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    MenuComponent.prototype.render = function (createElement) {
        return createElement('ul', this.$slots.default);
    };
    MenuComponent.prototype.close = function () {
        return this.ej2Instances.close();
    };
    MenuComponent.prototype.enableItems = function (items, enable, isUniqueId) {
        return this.ej2Instances.enableItems(items, enable, isUniqueId);
    };
    MenuComponent.prototype.hideItems = function (items, isUniqueId) {
        return this.ej2Instances.hideItems(items, isUniqueId);
    };
    MenuComponent.prototype.insertAfter = function (items, text, isUniqueId) {
        return this.ej2Instances.insertAfter(items, text, isUniqueId);
    };
    MenuComponent.prototype.insertBefore = function (items, text, isUniqueId) {
        return this.ej2Instances.insertBefore(items, text, isUniqueId);
    };
    MenuComponent.prototype.open = function () {
        return this.ej2Instances.open();
    };
    MenuComponent.prototype.removeItems = function (items, isUniqueId) {
        return this.ej2Instances.removeItems(items, isUniqueId);
    };
    MenuComponent.prototype.showItems = function (items, isUniqueId) {
        return this.ej2Instances.showItems(items, isUniqueId);
    };
    MenuComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], MenuComponent);
    return MenuComponent;
}(ComponentBase));
export { MenuComponent };
export var MenuPlugin = {
    name: 'ejs-menu',
    install: function (Vue) {
        Vue.component(MenuPlugin.name, MenuComponent);
        Vue.component(MenuItemPlugin.name, MenuItemDirective);
        Vue.component(MenuItemsPlugin.name, MenuItemsDirective);
    }
};
