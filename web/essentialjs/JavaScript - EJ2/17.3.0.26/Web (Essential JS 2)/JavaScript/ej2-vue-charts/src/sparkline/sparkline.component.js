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
import { Sparkline } from '@syncfusion/ej2-charts';
import { RangeBandSettingsDirective, RangeBandSettingDirective, RangeBandSettingsPlugin, RangeBandSettingPlugin } from './rangebandsettings.directive';
export var properties = ['axisSettings', 'border', 'containerArea', 'dataLabelSettings', 'dataSource', 'enablePersistence', 'enableRtl', 'endPointColor', 'fill', 'format', 'height', 'highPointColor', 'lineWidth', 'locale', 'lowPointColor', 'markerSettings', 'negativePointColor', 'opacity', 'padding', 'palette', 'query', 'rangeBandSettings', 'startPointColor', 'theme', 'tiePointColor', 'tooltipSettings', 'type', 'useGroupingSeparator', 'valueType', 'width', 'xName', 'yName', 'axisRendering', 'dataLabelRendering', 'load', 'loaded', 'markerRendering', 'pointRegionMouseClick', 'pointRegionMouseMove', 'pointRendering', 'resize', 'seriesRendering', 'sparklineMouseClick', 'sparklineMouseMove', 'tooltipInitialize'];
export var modelProps = [];
/**
 * Represents Vuejs Sparkline Component
 * ```vue
 * <ejs-sparkline></ejs-sparkline>
 * ```
 */
var SparklineComponent = /** @class */ (function (_super) {
    __extends(SparklineComponent, _super);
    function SparklineComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-rangeBandSettings": "e-rangeBandSetting" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new Sparkline({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    SparklineComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    SparklineComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    SparklineComponent.prototype.renderSparkline = function () {
        return this.ej2Instances.renderSparkline();
    };
    SparklineComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], SparklineComponent);
    return SparklineComponent;
}(ComponentBase));
export { SparklineComponent };
export var SparklinePlugin = {
    name: 'ejs-sparkline',
    install: function (Vue) {
        Vue.component(SparklinePlugin.name, SparklineComponent);
        Vue.component(RangeBandSettingPlugin.name, RangeBandSettingDirective);
        Vue.component(RangeBandSettingsPlugin.name, RangeBandSettingsDirective);
    }
};
