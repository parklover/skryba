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
import { Splitter } from '@syncfusion/ej2-layouts';
import { PanesDirective, PaneDirective, PanesPlugin, PanePlugin } from './panesettings.directive';
export var properties = ['cssClass', 'enablePersistence', 'enableRtl', 'enabled', 'height', 'locale', 'orientation', 'paneSettings', 'separatorSize', 'width', 'beforeCollapse', 'beforeExpand', 'collapsed', 'created', 'expanded', 'resizeStart', 'resizeStop', 'resizing'];
export var modelProps = [];
/**
 * Represents the VueJS Splitter component
 * ```html
 * <ejs-splitter></ejs-splitter>
 * ```
 */
var SplitterComponent = /** @class */ (function (_super) {
    __extends(SplitterComponent, _super);
    function SplitterComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-panes": "e-pane" };
        _this.tagNameMapper = { "e-panes": "e-paneSettings" };
        _this.ej2Instances = new Splitter({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    SplitterComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    SplitterComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    SplitterComponent.prototype.addPane = function (paneProperties, index) {
        return this.ej2Instances.addPane(paneProperties, index);
    };
    SplitterComponent.prototype.collapse = function (index) {
        return this.ej2Instances.collapse(index);
    };
    SplitterComponent.prototype.expand = function (index) {
        return this.ej2Instances.expand(index);
    };
    SplitterComponent.prototype.removePane = function (index) {
        return this.ej2Instances.removePane(index);
    };
    SplitterComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], SplitterComponent);
    return SplitterComponent;
}(ComponentBase));
export { SplitterComponent };
export var SplitterPlugin = {
    name: 'ejs-splitter',
    install: function (Vue) {
        Vue.component(SplitterPlugin.name, SplitterComponent);
        Vue.component(PanePlugin.name, PaneDirective);
        Vue.component(PanesPlugin.name, PanesDirective);
    }
};
