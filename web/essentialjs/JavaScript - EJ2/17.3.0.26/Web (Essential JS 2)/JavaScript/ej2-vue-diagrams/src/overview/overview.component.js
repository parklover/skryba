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
import { Overview } from '@syncfusion/ej2-diagrams';
export var properties = ['enablePersistence', 'enableRtl', 'height', 'locale', 'sourceID', 'width', 'created'];
export var modelProps = [];
/**
 * Represents vue Overview Component
 * ```html
 * <ej-overview></ej-overview>
 * ```
 */
var OverviewComponent = /** @class */ (function (_super) {
    __extends(OverviewComponent, _super);
    function OverviewComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new Overview({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    OverviewComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    OverviewComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    OverviewComponent.prototype.updateHtmlLayer = function (view) {
        return this.ej2Instances.updateHtmlLayer(view);
    };
    OverviewComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], OverviewComponent);
    return OverviewComponent;
}(ComponentBase));
export { OverviewComponent };
export var OverviewPlugin = {
    name: 'ejs-overview',
    install: function (Vue) {
        Vue.component(OverviewPlugin.name, OverviewComponent);
    }
};
