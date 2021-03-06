import { isNullOrUndefined, extend, createElement, Ajax } from '@syncfusion/ej2-base';
import { getShapeColor } from '../model/theme';
import { GeoLocation, isCustomPath, convertGeoToPoint, Point, PathOption, Size, PolylineOption, getElementByID } from '../utils/helper';
import { MapLocation, RectOption, getTranslate, convertTileLatLongToPoint, checkShapeDataFields, CircleOption } from '../utils/helper';
import { getZoomTranslate } from '../utils/helper';
import { Tile } from '../model/base';
import { BingMap } from './bing-map';
import { ColorMapping } from './color-mapping';
import { layerRendering, shapeRendering } from '../index';
/**
 * To calculate and render the shape layer
 */
var LayerPanel = /** @class */ (function () {
    function LayerPanel(map) {
        this.tileTranslatePoint = new MapLocation(0, 0);
        this.isMapCoordinates = true;
        this.ajaxProcessCount = 0;
        this.mapObject = map;
        this.ajaxModule = new Ajax();
        this.ajaxResponse = [];
    }
    /* tslint:disable:no-string-literal */
    LayerPanel.prototype.measureLayerPanel = function () {
        var _this = this;
        var imageSize = 30;
        var layerCollection = this.mapObject.layersCollection;
        var areaRect = this.mapObject.mapAreaRect;
        var padding = 10;
        var secondaryEle = getElementByID(this.mapObject.element.id + '_Secondary_Element');
        if (this.mapObject.isTileMap && secondaryEle) {
            this.tileSvgObject = this.mapObject.renderer.createSvg({
                id: this.mapObject.element.id + '_Tile_SVG', width: areaRect.width,
                height: areaRect.height
            });
            secondaryEle.appendChild(this.tileSvgObject);
        }
        this.layerGroup = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_Layer_Collections',
            'clip-path': 'url(#' + this.mapObject.element.id + '_MapArea_ClipRect)'
        }));
        this.clipRectElement = this.mapObject.renderer.drawClipPath(new RectOption(this.mapObject.element.id + '_MapArea_ClipRect', 'transparent', { width: 1, color: 'Gray' }, 1, {
            x: this.mapObject.isTileMap ? 0 : areaRect.x, y: this.mapObject.isTileMap ? 0 : areaRect.y,
            width: areaRect.width, height: areaRect.height
        }));
        this.layerGroup.appendChild(this.clipRectElement);
        this.mapObject.baseMapBounds = null;
        this.mapObject.baseMapRectBounds = null;
        this.mapObject.baseSize = null;
        var layerCount = layerCollection.length - 1;
        layerCollection.forEach(function (layer, index) {
            _this.currentLayer = layer;
            _this.processLayers(layer, index);
        });
    };
    LayerPanel.prototype.renderTileLayer = function (panel, layer, layerIndex, bing) {
        var center = new Point(panel.mapObject.centerPosition.longitude, panel.mapObject.centerPosition.latitude);
        panel.currentFactor = panel.calculateFactor(layer);
        if (isNullOrUndefined(panel.mapObject.tileZoomLevel)) {
            panel.mapObject.tileZoomLevel = panel.mapObject.zoomSettings.zoomFactor;
        }
        else if (panel.mapObject.zoomSettings.zoomFactor !== 1) {
            panel.mapObject.tileZoomLevel = panel.mapObject.zoomSettings.zoomFactor;
            if (!isNullOrUndefined(panel.mapObject.tileTranslatePoint)) {
                panel.mapObject.tileTranslatePoint.x = 0;
                panel.mapObject.tileTranslatePoint.y = 0;
            }
        }
        panel.mapObject.tileTranslatePoint = panel.panTileMap(panel.mapObject.availableSize.width, panel.mapObject.availableSize.height, center);
        panel.generateTiles(panel.mapObject.tileZoomLevel, panel.mapObject.tileTranslatePoint, bing);
        if (panel.mapObject.navigationLineModule) {
            panel.layerObject.appendChild(panel.mapObject.navigationLineModule.renderNavigation(panel.currentLayer, panel.mapObject.tileZoomLevel, layerIndex));
        }
        if (panel.mapObject.markerModule) {
            panel.mapObject.markerModule.markerRender(panel.layerObject, layerIndex, panel.mapObject.tileZoomLevel, null);
        }
        panel.translateLayerElements(panel.layerObject, layerIndex);
        panel.layerGroup.appendChild(panel.layerObject);
    };
    LayerPanel.prototype.processLayers = function (layer, layerIndex) {
        var _this = this;
        this.layerObject = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex
        }));
        var eventArgs = {
            cancel: false, name: layerRendering, index: layerIndex,
            layer: layer, maps: this.mapObject
        };
        this.mapObject.trigger('layerRendering', eventArgs, function (observedArgs) {
            if (!eventArgs.cancel) {
                if (layer.layerType !== 'Geometry') {
                    if (layer.layerType !== 'Bing' || _this.bing) {
                        _this.renderTileLayer(_this, layer, layerIndex);
                    }
                    else if (layer.key && layer.key.length > 1) {
                        var proxy_1 = _this;
                        var bing_1 = new BingMap(_this.mapObject);
                        var url = 'https://dev.virtualearth.net/REST/V1/Imagery/Metadata/' + layer.bingMapType;
                        var ajax = new Ajax({
                            url: url + '?output=json&include=ImageryProviders&key=' + layer.key
                        });
                        ajax.onSuccess = function (json) {
                            var jsonObject = JSON.parse(json);
                            var resource = jsonObject['resourceSets'][0]['resources'][0];
                            var imageUrl = resource['imageUrl'];
                            var subDomains = resource['imageUrlSubdomains'];
                            var maxZoom = resource['zoomMax'];
                            if (imageUrl !== null && imageUrl !== undefined && imageUrl !== bing_1.imageUrl) {
                                bing_1.imageUrl = imageUrl;
                            }
                            if (subDomains !== null && subDomains !== undefined && subDomains !== bing_1.subDomains) {
                                bing_1.subDomains = subDomains;
                            }
                            if (maxZoom !== null && maxZoom !== undefined && maxZoom !== bing_1.maxZoom) {
                                bing_1.maxZoom = maxZoom;
                            }
                            proxy_1.mapObject['bingMap'] = bing_1;
                            proxy_1.renderTileLayer(proxy_1, layer, layerIndex, bing_1);
                        };
                        ajax.send();
                    }
                }
                else {
                    if (!isNullOrUndefined(layer.shapeData) && (!isNullOrUndefined(layer.shapeData['geometries']) ||
                        !isNullOrUndefined(layer.shapeData['features']))) {
                        var featureData = (!isNullOrUndefined(layer.shapeData['geometries']) &&
                            layer.shapeData['geometries'].length > 0 ? layer.shapeData['geometries'] :
                            layer.shapeData['features']);
                        layer.layerData = [];
                        var bbox = layer.shapeData['bbox'];
                        if (!isNullOrUndefined(bbox) && layer.isBaseLayer) {
                            _this.mapObject.baseMapBounds = new GeoLocation({ min: bbox[0][1], max: bbox[1][1] }, { min: bbox[0][0], max: bbox[1][0] });
                        }
                        else if (isNullOrUndefined(_this.mapObject.baseMapBounds) && !isCustomPath(featureData)) {
                            _this.calculateRectBounds(featureData);
                            // if (isNullOrUndefined(this.mapObject.baseSize)) {
                            //     let minSize: Point = convertGeoToPoint(
                            //         this.mapObject.baseMapBounds.latitude.min,
                            //         this.mapObject.baseMapBounds.longitude.min, this.calculateFactor(layer), layer, this.mapObject
                            //     );
                            //     let maxSize: Point = convertGeoToPoint(
                            //         this.mapObject.baseMapBounds.latitude.max,
                            //         this.mapObject.baseMapBounds.longitude.max, this.calculateFactor(layer), layer, this.mapObject
                            //     );
                            //     this.mapObject.baseSize = new Size(Math.abs(minSize.x - maxSize.x), Math.abs(minSize.y - maxSize.y));
                            // }
                        }
                        _this.calculatePathCollection(layerIndex, featureData);
                    }
                }
            }
        });
        if (!this.mapObject.isTileMap) {
            this.mapObject.svgObject.appendChild(this.layerGroup);
        }
        else if (this.tileSvgObject) {
            this.tileSvgObject.appendChild(this.layerGroup);
        }
    };
    //tslint:disable:max-func-body-length
    LayerPanel.prototype.bubbleCalculation = function (bubbleSettings, range) {
        if (bubbleSettings.dataSource != null && bubbleSettings != null) {
            for (var i = 0; i < bubbleSettings.dataSource.length; i++) {
                var bubbledata = parseFloat(bubbleSettings.dataSource[i][bubbleSettings.valuePath]);
                if (i !== 0) {
                    if (bubbledata > range.max) {
                        range.max = bubbledata;
                    }
                    else if (bubbledata < range.min) {
                        range.min = bubbledata;
                    }
                }
                else {
                    range.max = range.min = bubbledata;
                }
            }
        }
    };
    // tslint:disable-next-line:max-func-body-length
    LayerPanel.prototype.calculatePathCollection = function (layerIndex, renderData) {
        var _this = this;
        this.groupElements = [];
        if ((!isCustomPath(renderData))) {
            this.currentFactor = this.calculateFactor(this.currentLayer);
        }
        this.rectBounds = null;
        var shapeSettings = this.currentLayer.shapeSettings;
        var bubbleSettings = this.currentLayer.bubbleSettings;
        renderData.forEach(function (geometryData, index) {
            if (!isNullOrUndefined(geometryData['geometry']) || !isNullOrUndefined(geometryData['coordinates'])) {
                var type = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['type'] : geometryData['type'];
                var coords = !isNullOrUndefined(geometryData['geometry']) ? geometryData['geometry']['coordinates'] :
                    geometryData['coordinates'];
                var data = geometryData['geometry'];
                var properties = geometryData['properties'];
                _this.generatePoints(type, coords, data, properties);
            }
        });
        this.currentLayer.rectBounds = this.rectBounds;
        if (isNullOrUndefined(this.mapObject.baseMapRectBounds) && this.currentLayer.isBaseLayer) {
            this.mapObject.baseMapRectBounds = this.rectBounds;
        }
        var colors = shapeSettings.palette.length > 1 ? shapeSettings.palette : getShapeColor(this.mapObject.theme);
        var labelTemplateEle = createElement('div', {
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_Label_Template_Group',
            className: 'template',
            styles: 'pointer-events: none; overflow: hidden; position: absolute;' +
                'top:' + this.mapObject.mapAreaRect.y + 'px;' +
                'left:' + this.mapObject.mapAreaRect.x + 'px;' +
                'height:' + this.mapObject.mapAreaRect.height + 'px;' +
                'width:' + this.mapObject.mapAreaRect.width + 'px;'
        });
        var _loop_1 = function (i) {
            var k = void 0;
            var currentShapeData = this_1.currentLayer.layerData[i];
            var pathOptions;
            var polyLineOptions;
            var circleOptions;
            var groupElement;
            var drawObject = void 0;
            var path = '';
            var points = '';
            var getShapeColor_1 = void 0;
            var fill = (shapeSettings.autofill) ? colors[i % colors.length] : shapeSettings.fill;
            var opacity;
            if (shapeSettings.colorValuePath !== null && !isNullOrUndefined(currentShapeData['property'])) {
                k = checkShapeDataFields(this_1.currentLayer.dataSource, currentShapeData['property'], this_1.currentLayer.shapeDataPath, this_1.currentLayer.shapePropertyPath);
                if (k !== null && shapeSettings.colorMapping.length === 0) {
                    fill = this_1.currentLayer.dataSource[k][shapeSettings.colorValuePath];
                }
                else if (currentShapeData['property'][shapeSettings.colorValuePath] &&
                    this_1.currentLayer.dataSource.length === 0 && shapeSettings.colorMapping.length === 0) {
                    fill = currentShapeData['property'][shapeSettings.colorValuePath];
                }
            }
            var shapeID = this_1.mapObject.element.id + '_LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_' + k;
            getShapeColor_1 = this_1.getShapeColorMapping(this_1.currentLayer, currentShapeData['property'], fill);
            fill = Object.prototype.toString.call(getShapeColor_1) === '[object Object]' && !isNullOrUndefined(getShapeColor_1['fill'])
                ? getShapeColor_1['fill'] : fill;
            opacity = (Object.prototype.toString.call(getShapeColor_1) === '[object Object]'
                && !isNullOrUndefined(getShapeColor_1['opacity'])) ? getShapeColor_1['opacity'] : shapeSettings.opacity;
            var eventArgs = {
                cancel: false, name: shapeRendering, index: i,
                data: this_1.currentLayer.dataSource ? this_1.currentLayer.dataSource[k] : null,
                maps: !this_1.mapObject.isBlazor ? this_1.mapObject : null,
                shape: shapeSettings, fill: fill, border: { width: shapeSettings.border.width, color: shapeSettings.border.color }
            };
            // tslint:disable-next-line:max-func-body-length
            this_1.mapObject.trigger('shapeRendering', eventArgs, function (shapeArgs) {
                var drawingType = !isNullOrUndefined(currentShapeData['_isMultiPolygon'])
                    ? 'MultiPolygon' : isNullOrUndefined(currentShapeData['type']) ? currentShapeData[0]['type'] : currentShapeData['type'];
                drawingType = (drawingType === 'Polygon' || drawingType === 'MultiPolygon') ? 'Polygon' : drawingType;
                if (_this.groupElements.length < 1) {
                    groupElement = _this.mapObject.renderer.createGroup({
                        id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group', transform: ''
                    });
                    _this.groupElements.push(groupElement);
                }
                else {
                    for (var i_1 = 0; i_1 < _this.groupElements.length; i_1++) {
                        var ele = _this.groupElements[i_1];
                        if (ele.id.indexOf(drawingType) > -1) {
                            groupElement = ele;
                            break;
                        }
                        else if (i_1 >= _this.groupElements.length - 1) {
                            groupElement = _this.mapObject.renderer.createGroup({
                                id: _this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_' + drawingType + '_Group'
                            });
                            _this.groupElements.push(groupElement);
                            break;
                        }
                    }
                }
                var pathEle;
                switch (drawingType) {
                    case 'Polygon':
                        if (!currentShapeData['_isMultiPolygon']) {
                            path += 'M' + (currentShapeData[0]['point']['x']) + ' ' + (currentShapeData[0]['point']['y']);
                            currentShapeData.map(function (shapeData) {
                                path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
                            });
                        }
                        else {
                            path = _this.generateMultiPolygonPath(currentShapeData);
                        }
                        path += ' z ';
                        if (path.length > 3) {
                            pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, shapeSettings.dashArray, path);
                            pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                        }
                        break;
                    case 'LineString':
                        currentShapeData.map(function (lineData) {
                            points += lineData['point']['x'] + ' , ' + lineData['point']['y'] + ' ';
                        });
                        polyLineOptions = new PolylineOption(shapeID, points, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, shapeSettings.dashArray);
                        pathEle = _this.mapObject.renderer.drawPolyline(polyLineOptions);
                        break;
                    case 'Point':
                        var pointData = currentShapeData['point'];
                        circleOptions = new CircleOption(shapeID, eventArgs.fill, eventArgs.border, opacity, pointData['x'], pointData['y'], shapeSettings.circleRadius, null);
                        pathEle = _this.mapObject.renderer.drawCircle(circleOptions);
                        break;
                    case 'Path':
                        path = currentShapeData['point'];
                        pathOptions = new PathOption(shapeID, eventArgs.fill, eventArgs.border.width, eventArgs.border.color, opacity, shapeSettings.dashArray, path);
                        pathEle = _this.mapObject.renderer.drawPath(pathOptions);
                        break;
                }
                if (!isNullOrUndefined(pathEle)) {
                    var property = (Object.prototype.toString.call(_this.currentLayer.shapePropertyPath) === '[object Array]' ?
                        _this.currentLayer.shapePropertyPath : [_this.currentLayer.shapePropertyPath]);
                    // tslint:disable-next-line:align
                    var properties = void 0;
                    for (var j = 0; j < property.length; j++) {
                        if (!isNullOrUndefined(currentShapeData['property'])) {
                            properties = property[j];
                            break;
                        }
                    }
                    pathEle.setAttribute('aria-label', ((!isNullOrUndefined(currentShapeData['property'])) ?
                        (currentShapeData['property'][properties]) : ''));
                    pathEle.setAttribute('tabindex', (_this.mapObject.tabIndex + i + 2).toString());
                    groupElement.appendChild(pathEle);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.currentLayer.layerData.length; i++) {
            _loop_1(i);
        }
        var bubbleG;
        if (this.currentLayer.bubbleSettings.length && this.mapObject.bubbleModule) {
            var length_1 = this.currentLayer.bubbleSettings.length;
            var bubble_1;
            var _loop_2 = function (j) {
                bubble_1 = this_2.currentLayer.bubbleSettings[j];
                bubbleG = this_2.mapObject.renderer.createGroup({
                    id: this_2.mapObject.element.id + '_LayerIndex_' + layerIndex + '_bubble_Group_' + j
                });
                var range = { min: 0, max: 0 };
                this_2.bubbleCalculation(bubble_1, range);
                bubble_1.dataSource.map(function (bubbleData, i) {
                    _this.renderBubble(_this.currentLayer, bubbleData, colors[i % colors.length], range, j, i, bubbleG, layerIndex, bubble_1);
                });
                this_2.groupElements.push(bubbleG);
            };
            var this_2 = this;
            for (var j = 0; j < length_1; j++) {
                _loop_2(j);
            }
        }
        var group = (this.mapObject.renderer.createGroup({
            id: this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_dataLableIndex_Group', style: 'pointer-events: none;'
        }));
        if (this.mapObject.dataLabelModule && this.currentLayer.dataLabelSettings.visible) {
            var intersect_1 = [];
            renderData.map(function (currentShapeData, i) {
                _this.renderLabel(_this.currentLayer, layerIndex, currentShapeData, group, i, labelTemplateEle, intersect_1);
            });
            this.groupElements.push(group);
        }
        if (this.mapObject.navigationLineModule) {
            this.groupElements.push(this.mapObject.navigationLineModule.renderNavigation(this.currentLayer, this.currentFactor, layerIndex));
        }
        this.groupElements.map(function (element) {
            _this.layerObject.appendChild(element);
        });
        if (this.mapObject.markerModule) {
            this.mapObject.markerModule.markerRender(this.layerObject, layerIndex, this.currentFactor, null);
        }
        this.translateLayerElements(this.layerObject, layerIndex);
        this.layerGroup.appendChild(this.layerObject);
    };
    /**
     *  render datalabel
     */
    LayerPanel.prototype.renderLabel = function (layer, layerIndex, shape, group, shapeIndex, labelTemplateEle, intersect) {
        this.mapObject.dataLabelModule.renderLabel(layer, layerIndex, shape, layer.layerData, group, labelTemplateEle, shapeIndex, intersect);
    };
    /**
     * To render path for multipolygon
     */
    LayerPanel.prototype.generateMultiPolygonPath = function (currentShapeData) {
        var path = '';
        var shape;
        for (var j = 0; j < currentShapeData.length; j++) {
            path += 'M' + (currentShapeData[j][0]['point']['x']) + ' ' + (currentShapeData[j][0]['point']['y']);
            shape = currentShapeData[j];
            shape.map(function (shapeData) {
                path += ' L ' + (shapeData['point']['x']) + ' ' + (shapeData['point']['y']);
            });
        }
        return path;
    };
    /**
     * To render bubble
     */
    LayerPanel.prototype.renderBubble = function (layer, bubbleData, color, range, bubbleIndex, dataIndex, group, layerIndex, bubbleSettings) {
        if (isNullOrUndefined(this.mapObject.bubbleModule) || !bubbleSettings.visible) {
            return null;
        }
        color = bubbleSettings.fill ? bubbleSettings.fill : color;
        this.mapObject.bubbleModule.id = this.mapObject.element.id + '_LayerIndex_' + layerIndex + '_BubbleIndex_' +
            bubbleIndex + '_dataIndex_' + dataIndex;
        this.mapObject.bubbleModule.renderBubble(bubbleSettings, bubbleData, color, range, bubbleIndex, dataIndex, layerIndex, layer, group, this.mapObject.bubbleModule.id);
    };
    /**
     * To get the shape color from color mapping module
     */
    LayerPanel.prototype.getShapeColorMapping = function (layer, shape, color) {
        color = color ? color : layer.shapeSettings.fill;
        if (layer.shapeSettings.colorMapping.length === 0 && isNullOrUndefined(layer.dataSource)) {
            return color;
        }
        var index = checkShapeDataFields(layer.dataSource, shape, layer.shapeDataPath, layer.shapePropertyPath);
        var colorMapping = new ColorMapping(this.mapObject);
        if (isNullOrUndefined(layer.dataSource[index])) {
            return color;
        }
        return colorMapping.getShapeColorMapping(layer.shapeSettings, layer.dataSource[index], color);
    };
    LayerPanel.prototype.generatePoints = function (type, coordinates, data, properties) {
        var _this = this;
        var latitude;
        var longitude;
        var newData = [];
        switch (type.toLowerCase()) {
            case 'polygon':
                newData = this.calculatePolygonBox(coordinates[0], data, properties);
                if (newData.length > 0) {
                    newData['property'] = properties;
                    newData['type'] = type;
                    newData['_isMultiPolygon'] = false;
                    this.currentLayer.layerData.push(newData);
                }
                break;
            case 'multipolygon':
                var multiPolygonDatas = [];
                for (var i = 0; i < coordinates.length; i++) {
                    newData = this.calculatePolygonBox(coordinates[i][0], data, properties);
                    if (newData.length > 0) {
                        multiPolygonDatas.push(newData);
                    }
                }
                multiPolygonDatas['property'] = properties;
                multiPolygonDatas['type'] = type;
                multiPolygonDatas['_isMultiPolygon'] = true;
                this.currentLayer.layerData.push(multiPolygonDatas);
                break;
            case 'linestring':
                coordinates.map(function (points, index) {
                    latitude = points[1];
                    longitude = points[0];
                    var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                    newData.push({
                        point: point, lat: latitude, lng: longitude
                    });
                });
                newData['property'] = properties;
                newData['type'] = type;
                this.currentLayer.layerData.push(newData);
                break;
            case 'point':
                var arrayCollections_1 = false;
                coordinates.map(function (points, index) {
                    if (Object.prototype.toString.call(points) === '[object Array]') {
                        latitude = points[1];
                        longitude = points[0];
                        arrayCollections_1 = true;
                        var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                        _this.currentLayer.layerData.push({
                            point: point, type: type, lat: latitude, lng: longitude, property: properties
                        });
                    }
                });
                if (!arrayCollections_1) {
                    latitude = coordinates[1];
                    longitude = coordinates[0];
                    var point = convertGeoToPoint(latitude, longitude, this.currentFactor, this.currentLayer, this.mapObject);
                    this.currentLayer.layerData.push({
                        point: point, type: type, lat: latitude, lng: longitude, property: properties
                    });
                }
                break;
            case 'path':
                this.currentLayer.layerData.push({
                    point: data['d'], type: type, property: properties
                });
                break;
        }
    };
    LayerPanel.prototype.calculateFactor = function (layer) {
        var horFactor;
        var verFactor = 1;
        var divide = 10;
        var exp = 'e+1';
        var bounds = this.mapObject.baseMapBounds;
        var mapSize = new Size(this.mapObject.mapAreaRect.width, this.mapObject.mapAreaRect.height - 5);
        var mapHeight;
        var mapWidth;
        if (bounds) {
            var start = convertGeoToPoint(bounds.latitude.min, bounds.longitude.min, null, layer, this.mapObject);
            var end = convertGeoToPoint(bounds.latitude.max, bounds.longitude.max, null, layer, this.mapObject);
            mapHeight = end.y - start.y;
            mapWidth = end.x - start.x;
        }
        else {
            mapHeight = mapWidth = 500;
        }
        if (mapHeight < mapSize.height) {
            horFactor = parseFloat(Math.abs(Number(mapSize.height / Number(mapHeight.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            horFactor = mapSize.height / mapHeight;
        }
        if (mapWidth < mapSize.width) {
            verFactor = parseFloat(Math.abs(Number(mapSize.width / Number(mapWidth.toString() + exp)) * 100).toString().split('.')[0])
                / divide;
        }
        else {
            verFactor = mapSize.width / mapWidth;
        }
        return (Math.min(verFactor, horFactor));
    };
    LayerPanel.prototype.translateLayerElements = function (layerElement, index) {
        var childNode;
        if (!isNullOrUndefined(this.mapObject.baseMapRectBounds)) {
            var duration = this.currentLayer.animationDuration;
            var animate = duration !== 0 || isNullOrUndefined(this.mapObject.zoomModule);
            this.mapObject.baseTranslatePoint = this.mapObject.zoomTranslatePoint;
            var translate = void 0;
            if (this.mapObject.zoomSettings.zoomFactor > 1 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                translate = getZoomTranslate(this.mapObject, this.currentLayer, animate);
            }
            else {
                translate = getTranslate(this.mapObject, this.currentLayer, animate);
            }
            var scale = this.mapObject.previousScale = translate['scale'];
            var location_1 = this.mapObject.previousPoint = translate['location'];
            this.mapObject.baseTranslatePoint = this.mapObject.translatePoint = location_1;
            this.mapObject.baseScale = this.mapObject.scale = scale;
            for (var i = 0; i < layerElement.childElementCount; i++) {
                childNode = layerElement.childNodes[i];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                    var transform = 'scale( ' + scale + ' ) '
                        + 'translate( ' + location_1.x + ' ' + location_1.y + ' ) ';
                    childNode.setAttribute('transform', transform);
                    if (duration > 0 && !isNullOrUndefined(this.mapObject.zoomModule)) {
                        if (this.mapObject.zoomSettings.zoomFactor > 1) {
                            translate = getZoomTranslate(this.mapObject, this.currentLayer);
                        }
                        else {
                            translate = getTranslate(this.mapObject, this.currentLayer);
                        }
                        this.mapObject.scale = translate['scale'];
                        this.mapObject.zoomTranslatePoint = this.mapObject.translatePoint = translate['location'];
                    }
                }
            }
        }
        else if (this.mapObject.isTileMap && !isNullOrUndefined(this.mapObject.scale)) {
            for (var j = 0; j < layerElement.childElementCount; j++) {
                childNode = layerElement.childNodes[j];
                if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                    (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                    (!(childNode.id.indexOf('_dataLableIndex_Group') > -1)) &&
                    (!(childNode.id.indexOf('_line_Group') > -1))) {
                    var transform = 'scale( ' + this.mapObject.scale + ' ) ' + 'translate( ' + this.mapObject.translatePoint.x
                        + ' ' + this.mapObject.translatePoint.y + ' ) ';
                    childNode.setAttribute('transform', transform);
                }
            }
        }
    };
    LayerPanel.prototype.calculateRectBounds = function (layerData) {
        var _this = this;
        layerData.forEach(function (obj, index) {
            if (!isNullOrUndefined(obj['geometry']) || !isNullOrUndefined(obj['coordinates'])) {
                var type = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['type'] : obj['type'];
                var coordinates = !isNullOrUndefined(obj['geometry']) ? obj['geometry']['coordinates'] : obj['coordinates'];
                switch (type.toLowerCase()) {
                    case 'polygon':
                        _this.calculateRectBox(coordinates[0]);
                        break;
                    case 'multipolygon':
                        coordinates.map(function (point, index) {
                            _this.calculateRectBox(point[0]);
                        });
                        break;
                }
            }
        });
    };
    LayerPanel.prototype.calculatePolygonBox = function (coordinates, data, properties) {
        var _this = this;
        var newData = [];
        var bounds = this.mapObject.baseMapBounds;
        coordinates.map(function (currentPoint, index) {
            var latitude = currentPoint[1];
            var longitude = currentPoint[0];
            if ((longitude >= bounds.longitude.min && longitude <= bounds.longitude.max)
                && (latitude >= bounds.latitude.min && latitude <= bounds.latitude.max)) {
                var point = convertGeoToPoint(latitude, longitude, _this.currentFactor, _this.currentLayer, _this.mapObject);
                if (isNullOrUndefined(_this.rectBounds)) {
                    _this.rectBounds = { min: { x: point.x, y: point.y }, max: { x: point.x, y: point.y } };
                }
                else {
                    _this.rectBounds['min']['x'] = Math.min(_this.rectBounds['min']['x'], point.x);
                    _this.rectBounds['min']['y'] = Math.min(_this.rectBounds['min']['y'], point.y);
                    _this.rectBounds['max']['x'] = Math.max(_this.rectBounds['max']['x'], point.x);
                    _this.rectBounds['max']['y'] = Math.max(_this.rectBounds['max']['y'], point.y);
                }
                newData.push({
                    point: point,
                    lat: latitude,
                    lng: longitude
                });
            }
        });
        return newData;
    };
    LayerPanel.prototype.calculateRectBox = function (coordinates) {
        var _this = this;
        coordinates.forEach(function (currentCoords) {
            if (isNullOrUndefined(_this.mapObject.baseMapBounds)) {
                _this.mapObject.baseMapBounds = new GeoLocation({ min: currentCoords[1], max: currentCoords[1] }, { min: currentCoords[0], max: currentCoords[0] });
            }
            else {
                _this.mapObject.baseMapBounds.latitude.min = Math.min(_this.mapObject.baseMapBounds.latitude.min, currentCoords[1]);
                _this.mapObject.baseMapBounds.latitude.max = Math.max(_this.mapObject.baseMapBounds.latitude.max, currentCoords[1]);
                _this.mapObject.baseMapBounds.longitude.min = Math.min(_this.mapObject.baseMapBounds.longitude.min, currentCoords[0]);
                _this.mapObject.baseMapBounds.longitude.max = Math.max(_this.mapObject.baseMapBounds.longitude.max, currentCoords[0]);
            }
        });
    };
    LayerPanel.prototype.generateTiles = function (zoomLevel, tileTranslatePoint, bing) {
        var userLang = this.mapObject.locale;
        var size = this.mapObject.availableSize;
        this.tiles = [];
        var xcount;
        var ycount;
        xcount = ycount = Math.pow(2, zoomLevel);
        var width = size.width / 2;
        var height = size.height / 2;
        var baseLayer = this.mapObject.layers[this.mapObject.baseLayerIndex];
        this.urlTemplate = baseLayer.urlTemplate;
        var endY = Math.min(ycount, ((-tileTranslatePoint.y + size.height) / 256) + 1);
        var endX = Math.min(xcount, ((-tileTranslatePoint.x + size.width) / 256) + 1);
        var startX = (-(tileTranslatePoint.x + 256) / 256);
        var startY = (-(tileTranslatePoint.y + 256) / 256);
        bing = bing || this.bing || this.mapObject['bingMap'];
        for (var i = Math.round(startX); i < Math.round(endX); i++) {
            for (var j = Math.round(startY); j < Math.round(endY); j++) {
                var x = 256 * i + tileTranslatePoint.x;
                var y = 256 * j + tileTranslatePoint.y;
                if (x > -256 && x <= size.width && y > -256 && y < size.height) {
                    if (i >= 0 && j >= 0) {
                        var tile = new Tile(i, j);
                        tile.left = x;
                        tile.top = y;
                        if (baseLayer.layerType === 'Bing') {
                            var key = baseLayer.key;
                            tile.src = bing.getBingMap(tile, key, baseLayer.bingMapType, userLang, bing.imageUrl, bing.subDomains);
                        }
                        else {
                            tile.src = this.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', tile.x.toString())
                                .replace('tileY', tile.y.toString());
                        }
                        this.tiles.push(tile);
                    }
                }
            }
        }
        var proxTiles = extend([], this.tiles, [], true);
        for (var _i = 0, _a = this.mapObject.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (!(layer.type === 'SubLayer' && layer.visible)) {
                continue;
            }
            if (layer.layerType === 'OSM' || layer.layerType === 'Bing') {
                for (var _b = 0, proxTiles_1 = proxTiles; _b < proxTiles_1.length; _b++) {
                    var baseTile = proxTiles_1[_b];
                    var subtile = extend(baseTile, {}, {}, true);
                    if (layer.layerType === 'Bing') {
                        subtile.src = bing.getBingMap(subtile, layer.key, layer.bingMapType, userLang, bing.imageUrl, bing.subDomains);
                    }
                    else {
                        subtile.src = layer.urlTemplate.replace('level', zoomLevel.toString()).replace('tileX', baseTile.x.toString())
                            .replace('tileY', baseTile.y.toString());
                    }
                    this.tiles.push(subtile);
                }
            }
        }
        this.arrangeTiles();
    };
    LayerPanel.prototype.arrangeTiles = function () {
        var htmlString = this.templateCompiler(this.tiles);
        if (getElementByID(this.mapObject.element.id + '_tile_parent')) {
            document.getElementById(this.mapObject.element.id + '_tile_parent').innerHTML = htmlString;
        }
    };
    LayerPanel.prototype.templateCompiler = function (tiles) {
        var tileElment = '';
        var id = 0;
        for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
            var tile = tiles_1[_i];
            if (this.urlTemplate.indexOf('tileX') !== -1) {
                tileElment += '<div><div id="tile' + id + '" style="position:absolute;left: ' + tile.left + 'px;top: ' + tile.top +
                    'px;height: ' + tile.height + 'px;width: ' + tile.width + 'px;"><img src="' + tile.src + '"></img></div></div>';
                id++;
            }
            else {
                tileElment = '<div style="position:absolute;"><img src="' + this.urlTemplate + '"></div>';
                break;
            }
        }
        return tileElment;
    };
    LayerPanel.prototype.panTileMap = function (factorX, factorY, centerPosition) {
        var level = this.mapObject.tileZoomLevel;
        var padding = 20;
        var x;
        var y;
        var totalSize = Math.pow(2, level) * 256;
        x = (factorX / 2) - (totalSize / 2);
        y = (factorY / 2) - (totalSize / 2);
        var position = convertTileLatLongToPoint(centerPosition, level, { x: x, y: y }, this.isMapCoordinates);
        x -= position.x - (factorX / 2);
        y = (y - (position.y - (factorY / 2))) + padding;
        this.mapObject.scale = Math.pow(2, level - 1);
        if (!isNullOrUndefined(this.mapObject.tileTranslatePoint)) {
            if (this.mapObject.tileTranslatePoint.x !== 0 && this.mapObject.tileTranslatePoint.x !== x) {
                x = this.mapObject.tileTranslatePoint.x;
            }
            if (this.mapObject.tileTranslatePoint.y !== 0 && this.mapObject.tileTranslatePoint.y !== y) {
                y = this.mapObject.tileTranslatePoint.y;
            }
        }
        this.mapObject.translatePoint = new Point((x - (0.01 * this.mapObject.scale)) / this.mapObject.scale, (y - (0.01 * this.mapObject.scale)) / this.mapObject.scale);
        return new Point(x, y);
    };
    return LayerPanel;
}());
export { LayerPanel };
