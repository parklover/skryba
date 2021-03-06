var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { markerRendering, convertTileLatLongToPoint, MapLocation } from '../index';
import { markerClick, markerMouseMove, markerClusterClick, markerClusterMouseMove } from '../index';
import { isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
import { getTranslate, convertGeoToPoint, clusterTemplate, marker, markerTemplate, getZoomTranslate } from '../utils/helper';
import { getElementByID, mergeSeparateCluster, clusterSeparate } from '../utils/helper';
/**
 * Marker class
 */
var Marker = /** @class */ (function () {
    function Marker(maps) {
        this.maps = maps;
        this.trackElements = [];
        this.sameMarkerData = [];
    }
    /* tslint:disable:no-string-literal */
    Marker.prototype.markerRender = function (layerElement, layerIndex, factor, type) {
        var _this = this;
        var templateFn;
        var currentLayer = this.maps.layersCollection[layerIndex];
        this.markerSVGObject = this.maps.renderer.createGroup({
            id: this.maps.element.id + '_Markers_Group',
            style: 'pointer-events: auto;'
        });
        var markerTemplateEle = createElement('div', {
            id: this.maps.element.id + '_LayerIndex_' + layerIndex + '_Markers_Template_Group',
            className: 'template',
            styles: 'overflow: hidden; position: absolute;pointer-events: none;' +
                'top:' + (this.maps.isTileMap ? 0 : this.maps.mapAreaRect.y) + 'px;' +
                'left:' + (this.maps.isTileMap ? 0 : this.maps.mapAreaRect.x) + 'px;' +
                'height:' + this.maps.mapAreaRect.height + 'px;' +
                'width:' + this.maps.mapAreaRect.width + 'px;'
        });
        //tslint:disable
        currentLayer.markerSettings.map(function (markerSettings, markerIndex) {
            var markerData = markerSettings.dataSource;
            markerData.forEach(function (data, dataIndex) {
                var eventArgs = {
                    cancel: false, name: markerRendering, fill: markerSettings.fill, height: markerSettings.height,
                    width: markerSettings.width, imageUrl: markerSettings.imageUrl, shape: markerSettings.shape,
                    template: markerSettings.template, data: data, maps: _this.maps, marker: markerSettings,
                    border: markerSettings.border
                };
                if (_this.maps.isBlazor) {
                    var maps = eventArgs.maps, marker_1 = eventArgs.marker, blazorEventArgs = __rest(eventArgs, ["maps", "marker"]);
                    eventArgs = blazorEventArgs;
                }
                _this.maps.trigger('markerRendering', eventArgs, function (MarkerArgs) {
                    var lng = data['longitude'] | data['Longitude'];
                    var lat = data['latitude'] | data['Latitude'];
                    var offset = markerSettings.offset;
                    if (!eventArgs.cancel && markerSettings.visible && !isNullOrUndefined(lng) && !isNullOrUndefined(lat)) {
                        var markerID = _this.maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_'
                            + markerIndex + '_dataIndex_' + dataIndex;
                        var location_1 = (_this.maps.isTileMap) ? convertTileLatLongToPoint(new MapLocation(lng, lat), factor, _this.maps.tileTranslatePoint, true) : convertGeoToPoint(lat, lng, factor, currentLayer, _this.maps);
                        var animate = currentLayer.animationDuration !== 0 || isNullOrUndefined(_this.maps.zoomModule);
                        var translate = (_this.maps.isTileMap) ? new Object() :
                            !isNullOrUndefined(_this.maps.zoomModule) && _this.maps.zoomSettings.zoomFactor > 1 ?
                                getZoomTranslate(_this.maps, currentLayer, animate) :
                                getTranslate(_this.maps, currentLayer, animate);
                        var scale = type === 'AddMarker' ? _this.maps.scale : translate['scale'];
                        var transPoint = type === 'AddMarker' ? _this.maps.translatePoint : translate['location'];
                        if (eventArgs.template) {
                            markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplateEle, location_1, scale, offset, _this.maps);
                        }
                        else {
                            marker(eventArgs, markerSettings, markerData, dataIndex, location_1, transPoint, markerID, offset, scale, _this.maps, _this.markerSVGObject);
                        }
                    }
                });
            });
        });
        if (this.markerSVGObject.childElementCount > 0) {
            layerElement.appendChild(this.markerSVGObject);
            if (currentLayer.markerClusterSettings.allowClustering) {
                this.maps.svgObject.appendChild(this.markerSVGObject);
                this.maps.element.appendChild(this.maps.svgObject);
                this.markerSVGObject = clusterTemplate(currentLayer, this.markerSVGObject, this.maps, layerIndex, this.markerSVGObject);
                layerElement.appendChild(this.markerSVGObject);
            }
        }
        if (markerTemplateEle.childElementCount > 0 && getElementByID(this.maps.element.id + '_Secondary_Element')) {
            getElementByID(this.maps.element.id + '_Secondary_Element').appendChild(markerTemplateEle);
            if (currentLayer.markerClusterSettings.allowClustering) {
                markerTemplateEle = clusterTemplate(currentLayer, markerTemplateEle, this.maps, layerIndex, this.markerSVGObject);
                getElementByID(this.maps.element.id + '_Secondary_Element').appendChild(markerTemplateEle);
            }
        }
    };
    /**
     * To check and trigger marker click event
     */
    Marker.prototype.markerClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: markerClick, data: options.data, maps: this.maps,
            marker: options.marker, target: target, x: e.clientX, y: e.clientY,
            latitude: options.data["latitude"] || options.data["Latitude"], longitude: options.data["longitude"] || options.data["Longitude"]
        };
        if (this.maps.isBlazor) {
            var maps = eventArgs.maps, marker_2 = eventArgs.marker, data = eventArgs.data, blazorEventArgs = __rest(eventArgs, ["maps", "marker", "data"]);
            eventArgs = blazorEventArgs;
        }
        this.maps.trigger(markerClick, eventArgs);
    };
    /**
     * To check and trigger Cluster click event
     */
    Marker.prototype.markerClusterClick = function (e) {
        var target = e.target.id;
        if (target.indexOf('_LayerIndex_') === -1 || target.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(target);
        if (isNullOrUndefined(options)) {
            return;
        }
        var textElement = document.getElementById(target.indexOf('_datalabel_') > -1 ? target : target + '_datalabel_' + target.split('_cluster_')[1]);
        if (options.clusterCollection.length > 0) {
            var textElement_1 = document.getElementById(target.indexOf('_datalabel_') > -1 ? target : target + '_datalabel_' + target.split('_cluster_')[1]);
            if (+textElement_1.textContent === options.clusterCollection[0].data.length) {
                if (this.sameMarkerData.length > 0) {
                    mergeSeparateCluster(this.sameMarkerData, this.maps, this.markerSVGObject);
                }
                this.sameMarkerData = options.clusterCollection;
                clusterSeparate(this.sameMarkerData, this.maps, this.markerSVGObject, true);
            }
            else {
                this.sameMarkerData = [];
            }
        }
        var eventArgs = {
            cancel: false, name: markerClusterClick, data: options.data, maps: this.maps,
            target: target, x: e.clientX, y: e.clientY,
            latitude: options.data["latitude"] || options.data["Latitude"], longitude: options.data["longitude"] || options.data["Longitude"]
        };
        if (this.maps.isBlazor) {
            var maps = eventArgs.maps, data = eventArgs.data, blazorEventArgs = __rest(eventArgs, ["maps", "data"]);
            eventArgs = blazorEventArgs;
        }
        this.maps.trigger(markerClusterClick, eventArgs);
    };
    /**
     * To get marker from target id
     */
    Marker.prototype.getMarker = function (target) {
        var id = target.split('_LayerIndex_');
        var index = parseInt(id[1].split('_')[0], 10);
        var layer = this.maps.layers[index];
        var data;
        var clusterCollection = [];
        var marker;
        if (target.indexOf('_MarkerIndex_') > -1) {
            var markerIndex = parseInt(id[1].split('_MarkerIndex_')[1].split('_')[0], 10);
            var dataIndex = parseInt(id[1].split('_dataIndex_')[1].split('_')[0], 10);
            marker = layer.markerSettings[markerIndex];
            if (!isNaN(markerIndex)) {
                data = marker.dataSource[dataIndex];
                var colo_1 = [];
                if ((this.maps.layers[index].markerClusterSettings.allowClusterExpand) && target.indexOf('_cluster_') > -1) {
                    marker.dataSource.forEach(function (loc, index) {
                        if (loc['latitude'] === data['latitude'] && loc['longitude'] === data['longitude']) {
                            colo_1.push({ data: data, index: index });
                        }
                    });
                    clusterCollection.push({
                        data: colo_1, layerIndex: index, markerIndex: markerIndex,
                        targetClusterIndex: +(target.split('_cluster_')[1].indexOf('_datalabel_') > -1 ? target.split('_cluster_')[1].split('_datalabel_')[0] : target.split('_cluster_')[1])
                    });
                }
                return { marker: marker, data: data, clusterCollection: clusterCollection };
            }
        }
        return null;
    };
    /**
     * To check and trigger marker move event
     */
    Marker.prototype.markerMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') > 0) {
            return;
        }
        var options = this.getMarker(targetId);
        if (isNullOrUndefined(options)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: markerMouseMove, data: options.data,
            maps: this.maps, target: targetId, x: e.clientX, y: e.clientY
        };
        if (this.maps.isBlazor) {
            var maps = eventArgs.maps, blazorEventArgs = __rest(eventArgs, ["maps"]);
            eventArgs = blazorEventArgs;
        }
        this.maps.trigger(markerMouseMove, eventArgs);
    };
    /**
     * To check and trigger cluster move event
     */
    Marker.prototype.markerClusterMouseMove = function (e) {
        var targetId = e.target.id;
        if (targetId.indexOf('_LayerIndex_') === -1 || targetId.indexOf('_cluster_') === -1) {
            return;
        }
        var options = this.getMarker(targetId);
        if (isNullOrUndefined(options)) {
            return;
        }
        var eventArgs = {
            cancel: false, name: markerClusterMouseMove, data: options.data, maps: this.maps,
            target: targetId, x: e.clientX, y: e.clientY
        };
        if (this.maps.isBlazor) {
            var maps = eventArgs.maps, blazorEventArgs = __rest(eventArgs, ["maps"]);
            eventArgs = blazorEventArgs;
        }
        this.maps.trigger(markerClusterMouseMove, eventArgs);
    };
    /**
     * Get module name.
     */
    Marker.prototype.getModuleName = function () {
        return 'Marker';
    };
    /**
     * To destroy the layers.
     * @return {void}
     * @private
     */
    Marker.prototype.destroy = function (maps) {
        /**
         * Destroy method performed here
         */
    };
    return Marker;
}());
export { Marker };
