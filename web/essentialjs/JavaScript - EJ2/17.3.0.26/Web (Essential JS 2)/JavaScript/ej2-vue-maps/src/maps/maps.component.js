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
import { Maps } from '@syncfusion/ej2-maps';
import { MarkersDirective, MarkerDirective, MarkersPlugin, MarkerPlugin } from './markersettings.directive';
import { ColorMappingsDirective, ColorMappingDirective, ColorMappingsPlugin, ColorMappingPlugin } from './colormapping.directive';
import { BubblesDirective, BubbleDirective, BubblesPlugin, BubblePlugin } from './bubblesettings.directive';
import { NavigationLinesDirective, NavigationLineDirective, NavigationLinesPlugin, NavigationLinePlugin } from './navigationlinesettings.directive';
import { LayersDirective, LayerDirective, LayersPlugin, LayerPlugin } from './layers.directive';
import { AnnotationsDirective, AnnotationDirective, AnnotationsPlugin, AnnotationPlugin } from './annotations.directive';
export var properties = ['annotations', 'background', 'baseLayerIndex', 'border', 'centerPosition', 'description', 'enablePersistence', 'enableRtl', 'format', 'height', 'layers', 'legendSettings', 'locale', 'mapsArea', 'margin', 'projectionType', 'tabIndex', 'theme', 'titleSettings', 'tooltipDisplayMode', 'useGroupingSeparator', 'width', 'zoomSettings', 'animationComplete', 'annotationRendering', 'beforePrint', 'bubbleClick', 'bubbleMouseMove', 'bubbleRendering', 'click', 'dataLabelRendering', 'doubleClick', 'itemHighlight', 'itemSelection', 'layerRendering', 'load', 'loaded', 'markerClick', 'markerClusterClick', 'markerClusterMouseMove', 'markerClusterRendering', 'markerMouseMove', 'markerRendering', 'pan', 'resize', 'rightClick', 'shapeHighlight', 'shapeRendering', 'shapeSelected', 'tooltipRender', 'tooltipRenderComplete', 'zoom'];
export var modelProps = ['dataSource'];
/**
 * Represents Vuejs Maps Component
 * ```vue
 * <ejs-maps></ejs-maps>
 * ```
 */
var MapsComponent = /** @class */ (function (_super) {
    __extends(MapsComponent, _super);
    function MapsComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-layers": { "e-layer": { "e-markerSettings": "e-markerSetting", "e-bubbleSettings": { "e-bubbleSetting": { "e-colorMappings": "e-colorMapping" } }, "e-navigationLineSettings": "e-navigationLineSetting" } }, "e-maps-annotations": "e-maps-annotation" };
        _this.tagNameMapper = { "e-colorMappings": "e-colorMapping", "e-maps-annotations": "e-annotations" };
        _this.ej2Instances = new Maps({});
        _this.ej2Instances._trigger = _this.ej2Instances.trigger;
        _this.ej2Instances.trigger = _this.trigger;
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    MapsComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    MapsComponent.prototype.trigger = function (eventName, eventProp, successHandler) {
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
    MapsComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    MapsComponent.prototype.addLayer = function (layer) {
        return this.ej2Instances.addLayer(layer);
    };
    MapsComponent.prototype.addMarker = function (layerIndex, markerCollection) {
        return this.ej2Instances.addMarker(layerIndex, markerCollection);
    };
    MapsComponent.prototype.export = function (type, fileName, orientation) {
        return this.ej2Instances.export(type, fileName, orientation);
    };
    MapsComponent.prototype.getGeoLocation = function (layerIndex, location) {
        return this.ej2Instances.getGeoLocation(layerIndex, location);
    };
    MapsComponent.prototype.getLocalizedLabel = function (key) {
        return this.ej2Instances.getLocalizedLabel(key);
    };
    MapsComponent.prototype.getTileGeoLocation = function (location) {
        return this.ej2Instances.getTileGeoLocation(location);
    };
    MapsComponent.prototype.mapsOnClick = function (e) {
        return this.ej2Instances.mapsOnClick(e);
    };
    MapsComponent.prototype.mapsOnDoubleClick = function (e) {
        return this.ej2Instances.mapsOnDoubleClick(e);
    };
    MapsComponent.prototype.mapsOnResize = function (e) {
        return this.ej2Instances.mapsOnResize(e);
    };
    MapsComponent.prototype.mouseDownOnMap = function (e) {
        return this.ej2Instances.mouseDownOnMap(e);
    };
    MapsComponent.prototype.mouseEndOnMap = function (e) {
        return this.ej2Instances.mouseEndOnMap(e);
    };
    MapsComponent.prototype.mouseLeaveOnMap = function (e) {
        return this.ej2Instances.mouseLeaveOnMap(e);
    };
    MapsComponent.prototype.mouseMoveOnMap = function (e) {
        return this.ej2Instances.mouseMoveOnMap(e);
    };
    MapsComponent.prototype.onMouseMove = function (e) {
        return this.ej2Instances.onMouseMove(e);
    };
    MapsComponent.prototype.panByDirection = function (direction) {
        return this.ej2Instances.panByDirection(direction);
    };
    MapsComponent.prototype.pointToLatLong = function (pageX, pageY) {
        return this.ej2Instances.pointToLatLong(pageX, pageY);
    };
    MapsComponent.prototype.print = function (id) {
        return this.ej2Instances.print(id);
    };
    MapsComponent.prototype.processResponseJsonData = function (processType, data, layer, dataType) {
        return this.ej2Instances.processResponseJsonData(processType, data, layer, dataType);
    };
    MapsComponent.prototype.removeLayer = function (index) {
        return this.ej2Instances.removeLayer(index);
    };
    MapsComponent.prototype.zoomByPosition = function (centerPosition, zoomFactor) {
        return this.ej2Instances.zoomByPosition(centerPosition, zoomFactor);
    };
    MapsComponent = __decorate([
        EJComponentDecorator({
            props: properties,
            model: {
                event: 'modelchanged'
            }
        })
    ], MapsComponent);
    return MapsComponent;
}(ComponentBase));
export { MapsComponent };
export var MapsPlugin = {
    name: 'ejs-maps',
    install: function (Vue) {
        Vue.component(MapsPlugin.name, MapsComponent);
        Vue.component(LayerPlugin.name, LayerDirective);
        Vue.component(LayersPlugin.name, LayersDirective);
        Vue.component(MarkerPlugin.name, MarkerDirective);
        Vue.component(MarkersPlugin.name, MarkersDirective);
        Vue.component(BubblePlugin.name, BubbleDirective);
        Vue.component(BubblesPlugin.name, BubblesDirective);
        Vue.component(ColorMappingPlugin.name, ColorMappingDirective);
        Vue.component(ColorMappingsPlugin.name, ColorMappingsDirective);
        Vue.component(NavigationLinePlugin.name, NavigationLineDirective);
        Vue.component(NavigationLinesPlugin.name, NavigationLinesDirective);
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
};
