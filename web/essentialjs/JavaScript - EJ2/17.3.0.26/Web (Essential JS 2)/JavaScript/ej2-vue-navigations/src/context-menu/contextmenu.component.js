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
import { ContextMenu } from '@syncfusion/ej2-navigations';
export var properties = ['animationSettings', 'cssClass', 'enablePersistence', 'enableRtl', 'enableScrolling', 'fields', 'filter', 'items', 'locale', 'showItemOnClick', 'target', 'template', 'beforeClose', 'beforeItemRender', 'beforeOpen', 'created', 'onClose', 'onOpen', 'select'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS ContextMenu Component.
 * ```html
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ejs-contextmenu target='#target' :items='menuItems'></ejs-contextmenu>
 * ```
 */
var ContextMenuComponent = /** @class */ (function (_super) {
    __extends(ContextMenuComponent, _super);
    function ContextMenuComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = false;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new ContextMenu({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    ContextMenuComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    ContextMenuComponent.prototype.render = function (createElement) {
        return createElement('ul', this.$slots.default);
    };
    ContextMenuComponent.prototype.close = function () {
        return this.ej2Instances.close();
    };
    ContextMenuComponent.prototype.enableItems = function (items, enable, isUniqueId) {
        return this.ej2Instances.enableItems(items, enable, isUniqueId);
    };
    ContextMenuComponent.prototype.hideItems = function (items, isUniqueId) {
        return this.ej2Instances.hideItems(items, isUniqueId);
    };
    ContextMenuComponent.prototype.insertAfter = function (items, text, isUniqueId) {
        return this.ej2Instances.insertAfter(items, text, isUniqueId);
    };
    ContextMenuComponent.prototype.insertBefore = function (items, text, isUniqueId) {
        return this.ej2Instances.insertBefore(items, text, isUniqueId);
    };
    ContextMenuComponent.prototype.open = function (top, left, target) {
        return this.ej2Instances.open(top, left, target);
    };
    ContextMenuComponent.prototype.removeItems = function (items, isUniqueId) {
        return this.ej2Instances.removeItems(items, isUniqueId);
    };
    ContextMenuComponent.prototype.showItems = function (items, isUniqueId) {
        return this.ej2Instances.showItems(items, isUniqueId);
    };
    ContextMenuComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], ContextMenuComponent);
    return ContextMenuComponent;
}(ComponentBase));
export { ContextMenuComponent };
export var ContextMenuPlugin = {
    name: 'ejs-contextmenu',
    install: function (Vue) {
        Vue.component(ContextMenuPlugin.name, ContextMenuComponent);
    }
};
