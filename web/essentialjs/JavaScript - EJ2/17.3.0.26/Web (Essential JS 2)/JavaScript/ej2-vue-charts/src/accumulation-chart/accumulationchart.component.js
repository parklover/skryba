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
import { isUndefined } from '@syncfusion/ej2-base';
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { AccumulationChart } from '@syncfusion/ej2-charts';
import { AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationSeriesCollectionPlugin, AccumulationSeriesPlugin } from './series.directive';
import { AccumulationAnnotationsDirective, AccumulationAnnotationDirective, AccumulationAnnotationsPlugin, AccumulationAnnotationPlugin } from './annotations.directive';
export var properties = ['annotations', 'backGroundImageUrl', 'background', 'border', 'center', 'currencyCode', 'dataSource', 'enableAnimation', 'enableExport', 'enablePersistence', 'enableRtl', 'enableSmartLabels', 'height', 'isMultiSelect', 'legendSettings', 'locale', 'margin', 'selectedDataIndexes', 'selectionMode', 'series', 'subTitle', 'subTitleStyle', 'theme', 'title', 'titleStyle', 'tooltip', 'useGroupingSeparator', 'width', 'animationComplete', 'annotationRender', 'beforePrint', 'chartMouseClick', 'chartMouseDown', 'chartMouseLeave', 'chartMouseMove', 'chartMouseUp', 'legendRender', 'load', 'loaded', 'pointClick', 'pointMove', 'pointRender', 'resized', 'seriesRender', 'textRender', 'tooltipRender'];
export var modelProps = ['dataSource'];
/**
 * Represents Vuejs AccumulationChart Component
 * ```vue
 * <ejs-accumulationchart></ejs-accumulationchart>
 * ```
 */
var AccumulationChartComponent = /** @class */ (function (_super) {
    __extends(AccumulationChartComponent, _super);
    function AccumulationChartComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-accumulation-series-collection": "e-accumulation-series", "e-accumulation-annotations": "e-accumulation-annotation" };
        _this.tagNameMapper = { "e-accumulation-series-collection": "e-series", "e-accumulation-annotations": "e-annotations" };
        _this.ej2Instances = new AccumulationChart({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    AccumulationChartComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    AccumulationChartComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
        if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
            var key = this.models.toString().match(/checked|value/) || [];
            var propKey = key[0];
            if (eventProp && key && !isUndefined(eventProp[propKey])) {
                this.$emit('update:' + propKey, eventProp[propKey]);
                this.$emit('modelchanged', eventProp[propKey]);
            }
        }
        if (this.ej2Instances && this.ej2Instances._trigger) {
            this.ej2Instances._trigger(eventName, eventProp, successHandler);
        }
    };
    AccumulationChartComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    AccumulationChartComponent.prototype.export = function (type, fileName) {
        return this.ej2Instances.export(type, fileName);
    };
    AccumulationChartComponent.prototype.print = function (id) {
        return this.ej2Instances.print(id);
    };
    AccumulationChartComponent.prototype.setAnnotationValue = function (annotationIndex, content) {
        return this.ej2Instances.setAnnotationValue(annotationIndex, content);
    };
    AccumulationChartComponent.prototype.titleTooltip = function (event, x, y, isTouch) {
        return this.ej2Instances.titleTooltip(event, x, y, isTouch);
    };
    AccumulationChartComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], AccumulationChartComponent);
    return AccumulationChartComponent;
}(ComponentBase));
export { AccumulationChartComponent };
export var AccumulationChartPlugin = {
    name: 'ejs-accumulationchart',
    install: function (Vue) {
        Vue.component(AccumulationChartPlugin.name, AccumulationChartComponent);
        Vue.component(AccumulationSeriesPlugin.name, AccumulationSeriesDirective);
        Vue.component(AccumulationSeriesCollectionPlugin.name, AccumulationSeriesCollectionDirective);
        Vue.component(AccumulationAnnotationPlugin.name, AccumulationAnnotationDirective);
        Vue.component(AccumulationAnnotationsPlugin.name, AccumulationAnnotationsDirective);
    }
};
