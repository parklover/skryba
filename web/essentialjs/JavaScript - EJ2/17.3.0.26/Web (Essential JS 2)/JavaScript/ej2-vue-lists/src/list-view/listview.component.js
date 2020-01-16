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
import { ListView } from '@syncfusion/ej2-lists';
export var properties = ['animation', 'checkBoxPosition', 'cssClass', 'dataSource', 'enable', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'fields', 'groupTemplate', 'headerTemplate', 'headerTitle', 'height', 'htmlAttributes', 'locale', 'query', 'showCheckBox', 'showHeader', 'showIcon', 'sortOrder', 'template', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'select'];
export var modelProps = [];
/**
 * Represents VueJS ListView Component
 * ```
 * <ejs-listview :dataSource='data'></ejs-listview>
 * ```
 */
var ListViewComponent = /** @class */ (function (_super) {
    __extends(ListViewComponent, _super);
    function ListViewComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = true;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new ListView({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    ListViewComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    ListViewComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    ListViewComponent.prototype.addItem = function (data, fields) {
        return this.ej2Instances.addItem(data, fields);
    };
    ListViewComponent.prototype.back = function () {
        return this.ej2Instances.back();
    };
    ListViewComponent.prototype.checkAllItems = function () {
        return this.ej2Instances.checkAllItems();
    };
    ListViewComponent.prototype.checkItem = function (item) {
        return this.ej2Instances.checkItem(item);
    };
    ListViewComponent.prototype.disableItem = function (obj) {
        return this.ej2Instances.disableItem(obj);
    };
    ListViewComponent.prototype.enableItem = function (obj) {
        return this.ej2Instances.enableItem(obj);
    };
    ListViewComponent.prototype.findItem = function (obj) {
        return this.ej2Instances.findItem(obj);
    };
    ListViewComponent.prototype.getSelectedItems = function () {
        return this.ej2Instances.getSelectedItems();
    };
    ListViewComponent.prototype.hideItem = function (obj) {
        return this.ej2Instances.hideItem(obj);
    };
    ListViewComponent.prototype.refreshItemHeight = function () {
        return this.ej2Instances.refreshItemHeight();
    };
    ListViewComponent.prototype.removeItem = function (obj) {
        return this.ej2Instances.removeItem(obj);
    };
    ListViewComponent.prototype.removeMultipleItems = function (obj) {
        return this.ej2Instances.removeMultipleItems(obj);
    };
    ListViewComponent.prototype.requiredModules = function () {
        return this.ej2Instances.requiredModules();
    };
    ListViewComponent.prototype.selectItem = function (obj) {
        return this.ej2Instances.selectItem(obj);
    };
    ListViewComponent.prototype.selectMultipleItems = function (obj) {
        return this.ej2Instances.selectMultipleItems(obj);
    };
    ListViewComponent.prototype.showItem = function (obj) {
        return this.ej2Instances.showItem(obj);
    };
    ListViewComponent.prototype.uncheckAllItems = function () {
        return this.ej2Instances.uncheckAllItems();
    };
    ListViewComponent.prototype.uncheckItem = function (item) {
        return this.ej2Instances.uncheckItem(item);
    };
    ListViewComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], ListViewComponent);
    return ListViewComponent;
}(ComponentBase));
export { ListViewComponent };
export var ListViewPlugin = {
    name: 'ejs-listview',
    install: function (Vue) {
        Vue.component(ListViewPlugin.name, ListViewComponent);
    }
};
