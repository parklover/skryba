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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * Helper functions for maps control
 */
import { createElement, isNullOrUndefined, remove, compile as templateComplier, merge } from '@syncfusion/ej2-base';
import { Animation } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { animationComplete } from '../index';
import { markerClusterRendering } from '../index';
/**
 * Maps internal use of `Size` type
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    return Size;
}());
export { Size };
/**
 * To find number from string
 * @private
 */
export function stringToNumber(value, containerSize) {
    if (value !== null && value !== undefined) {
        return value.indexOf('%') !== -1 ? (containerSize / 100) * parseInt(value, 10) : parseInt(value, 10);
    }
    return null;
}
/**
 * Method to calculate the width and height of the maps
 */
export function calculateSize(maps) {
    var containerWidth = maps.element.clientWidth;
    var containerHeight = maps.element.clientHeight;
    maps.availableSize = new Size(stringToNumber(maps.width, containerWidth) || containerWidth || 600, stringToNumber(maps.height, containerHeight) || containerHeight || (maps.isDevice ?
        Math.min(window.innerWidth, window.innerHeight) : 450));
}
/**
 * Method to create svg for maps.
 */
export function createSvg(maps) {
    maps.renderer = new SvgRenderer(maps.element.id);
    calculateSize(maps);
    maps.svgObject = maps.renderer.createSvg({
        id: maps.element.id + '_svg',
        width: maps.availableSize.width,
        height: maps.availableSize.height
    });
}
export function getMousePosition(pageX, pageY, element) {
    var elementRect = element.getBoundingClientRect();
    var pageXOffset = element.ownerDocument.defaultView.pageXOffset;
    var pageYOffset = element.ownerDocument.defaultView.pageYOffset;
    var clientTop = element.ownerDocument.documentElement.clientTop;
    var clientLeft = element.ownerDocument.documentElement.clientLeft;
    var positionX = elementRect.left + pageXOffset - clientLeft;
    var positionY = elementRect.top + pageYOffset - clientTop;
    return new MapLocation((pageX - positionX), (pageY - positionY));
}
/**
 * Method to convert degrees to radians
 */
export function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}
/**
 * Convert radians to degrees method
 */
export function radiansToDegrees(radian) {
    return radian * (180 / Math.PI);
}
/**
 * Method for converting from latitude and longitude values to points
 */
export function convertGeoToPoint(latitude, longitude, factor, layer, mapModel) {
    var mapSize = new Size(mapModel.mapAreaRect.width, mapModel.mapAreaRect.height);
    var x;
    var y;
    var value;
    var lat;
    var lng;
    var temp;
    var longitudeMinMax = mapModel.baseMapBounds.longitude;
    var latitudeMinMax = mapModel.baseMapBounds.latitude;
    var latRadian = degreesToRadians(latitude);
    var lngRadian = degreesToRadians(longitude);
    var type = mapModel.projectionType;
    var size = (mapModel.isTileMap) ? Math.pow(2, 1) * 256 : (isNullOrUndefined(factor)) ? Math.min(mapSize.width, mapSize.height) :
        (Math.min(mapSize.width, mapSize.height) * factor);
    if (layer.geometryType === 'Normal') {
        x = isNullOrUndefined(factor) ? longitude : Math.abs((longitude - longitudeMinMax.min) * factor);
        y = isNullOrUndefined(factor) ? latitude : Math.abs((latitudeMinMax.max - latitude) * factor);
    }
    else if (layer.geometryType === 'Geographic') {
        switch (type) {
            case 'Mercator':
                var pixelOrigin = new Point(size / 2, size / 2);
                x = pixelOrigin.x + longitude * (size / 360);
                var sinY = calculateBound(Math.sin(degreesToRadians(latitude)), -0.9999, 0.9999);
                y = pixelOrigin.y + 0.5 * (Math.log((1 + sinY) / (1 - sinY))) * (-(size / (2 * Math.PI)));
                break;
            case 'Winkel3':
                value = aitoff(lngRadian, latRadian);
                lng = (value.x + lngRadian / (Math.PI / 2)) / 2;
                lat = (value.y + latRadian) / 2;
                break;
            case 'Miller':
                lng = lngRadian;
                lat = (1.25 * Math.log(Math.tan((Math.PI / 4) + (.4 * latRadian))));
                break;
            case 'Eckert3':
                temp = Math.sqrt(Math.PI * (4 + Math.PI));
                lng = 2 / temp * lngRadian * (1 + Math.sqrt(1 - 4 * latRadian * latRadian / (Math.PI * Math.PI)));
                lat = 4 / temp * latRadian;
                break;
            case 'AitOff':
                value = aitoff(lngRadian, latRadian);
                lng = value.x;
                lat = value.y;
                break;
            case 'Eckert5':
                lng = lngRadian * (1 + Math.cos(latRadian)) / Math.sqrt(2 + Math.PI);
                lat = 2 * latRadian / Math.sqrt(2 + Math.PI);
                break;
            case 'Equirectangular':
                lng = lngRadian;
                lat = latRadian;
                break;
            case 'Eckert6':
                var epsilon = 1e-6;
                temp = (1 + (Math.PI / 2)) * Math.sin(latRadian);
                var delta = Infinity;
                for (var i = 0; i < 10 && Math.abs(delta) > epsilon; i++) {
                    delta = (latRadian + (Math.sin(latRadian)) - temp) / (1 + Math.cos(latRadian));
                    latRadian = latRadian - delta;
                }
                temp = Math.sqrt(2 + Math.PI);
                lng = lngRadian * (1 + Math.cos(latRadian)) / temp;
                lat = 2 * latRadian / temp;
                break;
        }
        x = (type === 'Mercator') ? x : roundTo(xToCoordinate(mapModel, radiansToDegrees(lng)), 3);
        y = (type === 'Mercator') ? y : (-(roundTo(yToCoordinate(mapModel, radiansToDegrees(lat)), 3)));
    }
    return new Point(x, y);
}
/**
 * Converting tile latitude and longitude to point
 */
export function convertTileLatLongToPoint(center, zoomLevel, tileTranslatePoint, isMapCoordinates) {
    var size = Math.pow(2, zoomLevel) * 256;
    var x = (center.x + 180) / 360;
    var sinLatitude = Math.sin(center.y * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
    var pixelX = center.x;
    var pixelY = center.y;
    if (isMapCoordinates) {
        pixelX = (x * size + 0.5) + tileTranslatePoint.x;
        pixelY = (y * size + 0.5) + tileTranslatePoint.y;
    }
    return { x: pixelX, y: pixelY };
}
/**
 * Method for calculate x point
 */
export function xToCoordinate(mapObject, val) {
    var longitudeMinMax = mapObject.baseMapBounds.longitude;
    var totalSize = isNullOrUndefined(mapObject.baseSize) ? mapObject.mapAreaRect.width : mapObject.mapAreaRect.width +
        (Math.abs(mapObject.baseSize.width - mapObject.mapAreaRect.width) / 2);
    return Math.round(totalSize * (val - longitudeMinMax.min) / (longitudeMinMax.max - longitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate y point
 */
export function yToCoordinate(mapObject, val) {
    var latitudeMinMax = mapObject.baseMapBounds.latitude;
    return Math.round(mapObject.mapAreaRect.height * (val - latitudeMinMax.min) / (latitudeMinMax.max - latitudeMinMax.min) * 100) / 100;
}
/**
 * Method for calculate aitoff projection
 */
export function aitoff(x, y) {
    var cosy = Math.cos(y);
    var sincia = sinci(acos(cosy * Math.cos(x /= 2)));
    return new Point(2 * cosy * Math.sin(x) * sincia, Math.sin(y) * sincia);
}
/**
 * Method to round the number
 */
export function roundTo(a, b) {
    var c = Math.pow(10, b);
    return (Math.round(a * c) / c);
}
export function sinci(x) {
    return x / Math.sin(x);
}
export function acos(a) {
    return Math.acos(a);
}
/**
 * Method to calculate bound
 */
export function calculateBound(value, min, max) {
    if (!isNullOrUndefined(min)) {
        value = Math.max(value, min);
    }
    if (!(isNullOrUndefined(max))) {
        value = Math.min(value, max);
    }
    return value;
}
/**
 * Map internal class for point
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
export { Point };
/**
 * Map internal class for min and max
 *
 */
var MinMax = /** @class */ (function () {
    function MinMax(min, max) {
        this.min = min;
        this.max = max;
    }
    return MinMax;
}());
export { MinMax };
/**
 * Map internal class locations
 */
var GeoLocation = /** @class */ (function () {
    function GeoLocation(latitude, longitude) {
        this.latitude = new MinMax(latitude.min, latitude.max);
        this.longitude = new MinMax(longitude.min, longitude.max);
    }
    return GeoLocation;
}());
export { GeoLocation };
/**
 * Function to measure the height and width of the text.
 * @param  {string} text
 * @param  {FontModel} font
 * @param  {string} id
 * @returns no
 * @private
 */
export function measureText(text, font) {
    var measureObject = document.getElementById('mapsmeasuretext');
    if (measureObject === null) {
        measureObject = createElement('text', { id: 'mapsmeasuretext' });
        document.body.appendChild(measureObject);
    }
    measureObject.innerHTML = text;
    measureObject.style.position = 'absolute';
    measureObject.style.fontSize = font.size;
    measureObject.style.fontWeight = font.fontWeight;
    measureObject.style.fontStyle = font.fontStyle;
    measureObject.style.fontFamily = font.fontFamily;
    measureObject.style.visibility = 'hidden';
    measureObject.style.top = '-100';
    measureObject.style.left = '0';
    measureObject.style.whiteSpace = 'nowrap';
    // For bootstrap line height issue
    measureObject.style.lineHeight = 'normal';
    return new Size(measureObject.clientWidth, measureObject.clientHeight);
}
/**
 * Internal use of text options
 * @private
 */
var TextOption = /** @class */ (function () {
    function TextOption(id, x, y, anchor, text, transform, baseLine) {
        if (transform === void 0) { transform = ''; }
        this.transform = '';
        this.baseLine = 'auto';
        this.id = id;
        this.text = text;
        this.transform = transform;
        this.anchor = anchor;
        this.x = x;
        this.y = y;
        this.baseLine = baseLine;
    }
    return TextOption;
}());
export { TextOption };
/**
 * Internal use of path options
 * @private
 */
var PathOption = /** @class */ (function () {
    function PathOption(id, fill, width, color, opacity, dashArray, d) {
        this.id = id;
        this.opacity = opacity;
        this.fill = fill;
        this.stroke = color;
        this['stroke-width'] = width;
        this['stroke-dasharray'] = dashArray;
        this.d = d;
    }
    return PathOption;
}());
export { PathOption };
/** @private */
var ColorValue = /** @class */ (function () {
    function ColorValue(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    return ColorValue;
}());
export { ColorValue };
/**
 * Internal use of rectangle options
 * @private
 */
var RectOption = /** @class */ (function (_super) {
    __extends(RectOption, _super);
    function RectOption(id, fill, border, opacity, rect, rx, ry, transform, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity, dashArray) || this;
        _this.y = rect.y;
        _this.x = rect.x;
        _this.height = rect.height;
        _this.width = rect.width;
        _this.rx = rx ? rx : 0;
        _this.ry = ry ? ry : 0;
        _this.transform = transform ? transform : '';
        _this['stroke-dasharray'] = dashArray;
        return _this;
    }
    return RectOption;
}(PathOption));
export { RectOption };
/**
 * Internal use of circle options
 * @private
 */
var CircleOption = /** @class */ (function (_super) {
    __extends(CircleOption, _super);
    function CircleOption(id, fill, border, opacity, cx, cy, r, dashArray) {
        var _this = _super.call(this, id, fill, border.width, border.color, opacity) || this;
        _this.cy = cy;
        _this.cx = cx;
        _this.r = r;
        _this['stroke-dasharray'] = dashArray;
        return _this;
    }
    return CircleOption;
}(PathOption));
export { CircleOption };
/**
 * Internal use of polygon options
 * @private
 */
var PolygonOption = /** @class */ (function (_super) {
    __extends(PolygonOption, _super);
    function PolygonOption(id, points, fill, width, color, opacity, dashArray) {
        if (opacity === void 0) { opacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, opacity, dashArray) || this;
        _this.points = points;
        return _this;
    }
    return PolygonOption;
}(PathOption));
export { PolygonOption };
/**
 * Internal use of polyline options
 * @private
 */
var PolylineOption = /** @class */ (function (_super) {
    __extends(PolylineOption, _super);
    function PolylineOption(id, points, fill, width, color, opacity, dashArray) {
        if (opacity === void 0) { opacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        return _super.call(this, id, points, fill, width, color, opacity, dashArray) || this;
    }
    return PolylineOption;
}(PolygonOption));
export { PolylineOption };
/**
 * Internal use of line options
 * @private
 */
var LineOption = /** @class */ (function (_super) {
    __extends(LineOption, _super);
    function LineOption(id, line, fill, width, color, opacity, dashArray) {
        if (opacity === void 0) { opacity = 1; }
        if (dashArray === void 0) { dashArray = ''; }
        var _this = _super.call(this, id, fill, width, color, opacity, dashArray) || this;
        _this.x1 = line.x1;
        _this.y1 = line.y1;
        _this.x2 = line.x2;
        _this.y2 = line.y2;
        return _this;
    }
    return LineOption;
}(PathOption));
export { LineOption };
/**
 * Internal use of line
 * @property
 */
var Line = /** @class */ (function () {
    function Line(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    return Line;
}());
export { Line };
/**
 * Internal use of map location type
 */
var MapLocation = /** @class */ (function () {
    function MapLocation(x, y) {
        this.x = x;
        this.y = y;
    }
    return MapLocation;
}());
export { MapLocation };
/**
 * Internal use of type rect
 * @private
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Rect;
}());
export { Rect };
/**
 * Internal use for pattern creation.
 * @property
 */
var PatternOptions = /** @class */ (function () {
    function PatternOptions(id, x, y, width, height, patternUnits, patternContentUnits, patternTransform, href) {
        if (patternUnits === void 0) { patternUnits = 'userSpaceOnUse'; }
        if (patternContentUnits === void 0) { patternContentUnits = 'userSpaceOnUse'; }
        if (patternTransform === void 0) { patternTransform = ''; }
        if (href === void 0) { href = ''; }
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.patternUnits = patternUnits;
        this.patternContentUnits = patternContentUnits;
        this.patternTransform = patternTransform;
        this.href = href;
    }
    return PatternOptions;
}());
export { PatternOptions };
/**
 * Internal rendering of text
 * @private
 */
export function renderTextElement(option, style, color, parent, isMinus) {
    if (isMinus === void 0) { isMinus = false; }
    var renderOptions = {
        'id': option.id,
        'x': option.x,
        'y': option.y,
        'fill': color,
        'font-size': style.size,
        'font-style': style.fontStyle,
        'font-family': style.fontFamily,
        'font-weight': style.fontWeight,
        'text-anchor': option.anchor,
        'transform': option.transform,
        'opacity': style.opacity,
        'dominant-baseline': option.baseLine
    };
    var text = typeof option.text === 'string' ? option.text : isMinus ? option.text[option.text.length - 1] : option.text[0];
    var tspanElement;
    var renderer = new SvgRenderer('');
    var height;
    var htmlObject = renderer.createText(renderOptions, text);
    htmlObject.style['user-select'] = 'none';
    htmlObject.style['-moz-user-select'] = 'none';
    htmlObject.style['-webkit-touch-callout'] = 'none';
    htmlObject.style['-webkit-user-select'] = 'none';
    htmlObject.style['-khtml-user-select'] = 'none';
    htmlObject.style['-ms-user-select'] = 'none';
    htmlObject.style['-o-user-select'] = 'none';
    if (typeof option.text !== 'string' && option.text.length > 1) {
        for (var i = 1, len = option.text.length; i < len; i++) {
            height = (measureText(option.text[i], style).height);
            tspanElement = renderer.createTSpan({
                'x': option.x, 'id': option.id,
                'y': (option.y) + ((isMinus) ? -(i * height) : (i * height))
            }, isMinus ? option.text[option.text.length - (i + 1)] : option.text[i]);
            htmlObject.appendChild(tspanElement);
        }
    }
    parent.appendChild(htmlObject);
    return htmlObject;
}
/**
 * @private
 */
export function convertElement(element, markerId, data, index, mapObj) {
    var childElement = createElement('div', {
        id: markerId,
        styles: 'position: absolute;pointer-events: auto;'
    });
    var elementLength = element.length;
    while (elementLength > 0) {
        childElement.appendChild(element[0]);
        elementLength--;
    }
    var templateHtml = childElement.innerHTML;
    var properties = Object.keys(data);
    for (var i = 0; i < properties.length; i++) {
        if (properties[i].toLowerCase() !== 'latitude' && properties[i].toLowerCase() !== 'longitude') {
            templateHtml = templateHtml.replace(new RegExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
        }
    }
    childElement.innerHTML = templateHtml;
    return childElement;
}
export function convertElementFromLabel(element, labelId, data, index, mapObj) {
    var labelEle = isNullOrUndefined(element.childElementCount) ? element[0] : element;
    var templateHtml = labelEle.outerHTML;
    var properties = Object.keys(data);
    for (var i = 0; i < properties.length; i++) {
        templateHtml = templateHtml.replace(new RegExp('{{:' + properties[i] + '}}', 'g'), data[properties[i].toString()]);
    }
    return createElement('div', {
        id: labelId,
        innerHTML: templateHtml,
        styles: 'position: absolute'
    });
}
/* tslint:disable:no-string-literal */
//tslint:disable
export function drawSymbols(shape, imageUrl, location, markerID, shapeCustom, markerCollection, maps) {
    var markerEle;
    var x;
    var y;
    var size = shapeCustom['size'];
    var borderColor = shapeCustom['borderColor'];
    var borderWidth = parseFloat(shapeCustom['borderWidth']);
    var fill = shapeCustom['fill'];
    var dashArray = shapeCustom['dashArray'];
    var border = { color: borderColor, width: borderWidth };
    var opacity = shapeCustom['opacity'];
    var circleOptions;
    var pathOptions;
    var rectOptions;
    pathOptions = new PathOption(markerID, fill, borderWidth, borderColor, opacity, dashArray, '');
    if (shape === 'Circle') {
        var radius = (size.width + size.height) / 4;
        circleOptions = new CircleOption(markerID, fill, border, opacity, location.x, location.y, radius, dashArray);
        markerEle = maps.renderer.drawCircle(circleOptions);
    }
    else if (shape === 'Rectangle') {
        x = location.x - (size.width / 2);
        y = location.y - (size.height / 2);
        rectOptions = new RectOption(markerID, fill, border, opacity, new Rect(x, y, size.width, size.height), null, null, '', dashArray);
        markerEle = maps.renderer.drawRectangle(rectOptions);
    }
    else if (shape === 'Image') {
        x = location.x - (size.width / 2);
        y = location.y - size.height;
        merge(pathOptions, { 'href': imageUrl, 'height': size.height, 'width': size.width, x: x, y: y });
        markerEle = maps.renderer.drawImage(pathOptions);
    }
    else {
        markerEle = calculateShapes(maps, shape, pathOptions, size, location, markerCollection);
    }
    return markerEle;
}
//tslint:disable
export function clusterTemplate(currentLayer, markerTemplate, maps, layerIndex, markerCollection) {
    var bounds = [];
    var colloideBounds = [];
    var tempX = 0;
    var tempY = 0;
    var data;
    var style = currentLayer.markerClusterSettings.labelStyle;
    var options;
    var textElement;
    var postionY = (15 / 4);
    var m = 0;
    var g = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + layerIndex + '_markerCluster' });
    for (var n = 0; n < markerTemplate.childElementCount; n++) {
        var tempElement = markerTemplate.childNodes[n];
        bounds.push(tempElement.getBoundingClientRect());
    }
    var _loop_1 = function (o) {
        if (!isNullOrUndefined(bounds[o])) {
            for (var p = o + 1; p < bounds.length; p++) {
                if (!isNullOrUndefined(bounds[p])) {
                    if (bounds[o].left > bounds[p].right || bounds[o].right < bounds[p].left
                        || bounds[o].top > bounds[p].bottom || bounds[o].bottom < bounds[p].top) {
                    }
                    else {
                        colloideBounds.push(bounds[p]);
                    }
                }
            }
            tempX = bounds[o].left;
            tempY = bounds[o].top;
            for (var q = 0; q < colloideBounds.length; q++) {
                for (var k = 0; k < bounds.length; k++) {
                    if (!isNullOrUndefined(bounds[k])) {
                        if (colloideBounds[q]['left'] === bounds[k]['left']) {
                            delete bounds[k];
                            for (var r = 0; r < markerTemplate.childElementCount; r++) {
                                var tempElement = markerTemplate.childNodes[r];
                                if (colloideBounds[q]['left'] === tempElement.getBoundingClientRect()['left']) {
                                    markerTemplate.childNodes[r]['style']['visibility'] = "hidden";
                                    markerTemplate.childNodes[o]['style']['visibility'] = "hidden";
                                }
                            }
                        }
                    }
                }
            }
            if (colloideBounds.length > 0) {
                var padding = 10;
                var container = maps.element.getBoundingClientRect();
                tempX = Math.abs(container['left'] - tempX) + padding;
                tempY = Math.abs(container['top'] - tempY) + padding;
                var translate = (maps.isTileMap) ? new Object() : getTranslate(maps, currentLayer, false);
                var transPoint_1 = (maps.isTileMap) ? { x: 0, y: 0 } : (maps.translatePoint.x !== 0) ?
                    maps.translatePoint : translate['location'];
                var dataIndex_1 = parseInt(markerTemplate.childNodes[o]['id'].split('_dataIndex_')[1].split('_')[0], 10);
                var markerIndex_1 = parseInt(markerTemplate.childNodes[o]['id'].split('_MarkerIndex_')[1].split('_')[0], 10);
                var clusters = currentLayer.markerClusterSettings;
                var shapeCustom_1 = {
                    size: new Size(clusters.width, clusters.height),
                    fill: clusters.fill, borderColor: clusters.border.color,
                    borderWidth: clusters.border.width, opacity: clusters.opacity,
                    dashArray: clusters.dashArray
                };
                var eventArg_1 = {
                    cancel: false, name: markerClusterRendering, fill: clusters.fill, height: clusters.height,
                    width: clusters.width, imageUrl: clusters.imageUrl, shape: clusters.shape,
                    data: data, maps: maps, cluster: clusters, border: clusters.border
                };
                if (maps.isBlazor) {
                    var data_1 = eventArg_1.data, maps_1 = eventArg_1.maps, cluster = eventArg_1.cluster, blazorEventArgs = __rest(eventArg_1, ["data", "maps", "cluster"]);
                    eventArg_1 = blazorEventArgs;
                }
                shapeCustom_1['fill'] = eventArg_1.fill;
                shapeCustom_1['size']['width'] = eventArg_1.width;
                shapeCustom_1['size']['height'] = eventArg_1.height;
                shapeCustom_1['imageUrl'] = eventArg_1.imageUrl;
                shapeCustom_1['shape'] = eventArg_1.shape;
                shapeCustom_1['borderColor'] = eventArg_1.border.color;
                shapeCustom_1['borderWidth'] = eventArg_1.border.width;
                maps.trigger('markerClusterRendering', eventArg_1, function (clusterargs) {
                    tempX = (maps.isTileMap) ? tempX : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempX : ((tempX + transPoint_1.x) * maps.mapScaleValue);
                    tempY = (maps.isTileMap) ? tempY : (markerTemplate.id.indexOf('_Markers_Group') > -1) ? tempY : ((tempY + transPoint_1.y) * maps.mapScaleValue);
                    var clusterID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex_1 + '_dataIndex_' + dataIndex_1 + '_cluster_' + (m);
                    var labelID = maps.element.id + '_LayerIndex_' + layerIndex + '_MarkerIndex_' + markerIndex_1 + '_dataIndex_' + dataIndex_1 + '_cluster_' + (m) + '_datalabel_' + m;
                    m++;
                    var ele = drawSymbols(eventArg_1.shape, eventArg_1.imageUrl, { x: 0, y: 0 }, clusterID, shapeCustom_1, markerCollection, maps);
                    ele.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                    options = new TextOption(labelID, (0), postionY, 'middle', (colloideBounds.length + 1).toString(), '', '');
                    textElement = renderTextElement(options, style, style.color, markerCollection);
                    textElement.setAttribute('transform', 'translate( ' + tempX + ' ' + tempY + ' )');
                    g.appendChild(textElement);
                    g.appendChild(ele);
                });
            }
        }
        colloideBounds = [];
    };
    for (var o = 0; o < bounds.length; o++) {
        _loop_1(o);
    }
    while (0 < g.childNodes.length) {
        markerCollection.insertBefore(g.childNodes[0], markerCollection.firstChild);
    }
    return markerTemplate;
}
export function mergeSeparateCluster(sameMarkerData, maps, markerElement) {
    var markerId = maps.element.id + '_LayerIndex_' + sameMarkerData[0].layerIndex + '_MarkerIndex_' + sameMarkerData[0].markerIndex;
    var clusterId = markerId + '_dataIndex_' + sameMarkerData[0].data[0]['index'] + '_cluster_' + sameMarkerData[0].targetClusterIndex;
    var clusterEle = getElement(clusterId);
    var clusterEleLabel = getElement(clusterId + '_datalabel_' + sameMarkerData[0].targetClusterIndex);
    clusterEle.setAttribute('visibility', 'visible');
    clusterEleLabel.setAttribute('visibility', 'visible');
    var markerEle;
    for (var i = 0; i < sameMarkerData[0].data.length; i++) {
        markerEle = getElement(markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        markerEle['style']['visibility'] = "hidden";
    }
    removeElement(maps.element.id + '_LayerIndex_' + sameMarkerData[0].layerIndex + '_MarkerIndex_' + sameMarkerData[0].markerIndex + '_markerClusterConnectorLine');
}
export function clusterSeparate(sameMarkerData, maps, markerElement, isDom) {
    var getElementFunction = isDom ? getElement : markerElement.querySelector.bind(markerElement);
    var getQueryConnect = isDom ? '' : '#';
    var markerId = maps.element.id + '_LayerIndex_' + sameMarkerData[0].layerIndex + '_MarkerIndex_' + sameMarkerData[0].markerIndex;
    var clusterId = markerId + '_dataIndex_' + sameMarkerData[0].data[0]['index'] + '_cluster_' + sameMarkerData[0].targetClusterIndex;
    var clusterEle = getElementFunction(getQueryConnect + '' + clusterId);
    var clusterEleLabel = getElementFunction(getQueryConnect + '' + clusterId + '_datalabel_' + sameMarkerData[0].targetClusterIndex);
    clusterEle.setAttribute('visibility', 'hidden');
    clusterEleLabel.setAttribute('visibility', 'hidden');
    var markerEle = getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[0]['index']);
    var height = maps.layers[sameMarkerData[0].layerIndex].markerSettings[sameMarkerData[0].markerIndex].height;
    var width = maps.layers[sameMarkerData[0].layerIndex].markerSettings[sameMarkerData[0].markerIndex].width;
    var centerX = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[0];
    var centerY = +clusterEle.getAttribute('transform').split('translate(')[1].trim().split(' ')[1].split(')')[0].trim() + height / 2;
    var radius = width + 5;
    var area = 2 * 3.14 * radius;
    var totalMarker = 0;
    var numberOfMarker = Math.round(area / width);
    totalMarker += numberOfMarker;
    var percent = Math.round((height / area) * 100);
    percent = sameMarkerData[0].data.length < numberOfMarker ? 100 / sameMarkerData[0].data.length : percent;
    var angle = (percent / 100) * 360;
    var newAngle = sameMarkerData[0].data.length < numberOfMarker ? 45 : 0;
    var count = 1;
    var start = 'M ' + centerX + ' ' + centerY + ' ';
    var path = '';
    for (var i = 0; i < sameMarkerData[0].data.length; i++) {
        if (totalMarker === i || Math.round(newAngle) >= 360) {
            count++;
            radius = (width + 5) * count;
            newAngle = 0;
            area = 2 * 3.14 * radius;
            numberOfMarker = Math.round(area / height);
            percent = Math.round((height / area) * 100);
            while (percent * numberOfMarker < 100) {
                numberOfMarker++;
            }
            angle = ((percent / 100) * 360);
            totalMarker += numberOfMarker;
        }
        var x1 = centerX + radius * Math.sin((Math.PI * 2 * newAngle) / 360);
        var y1 = centerY + radius * Math.cos((Math.PI * 2 * newAngle) / 360);
        path += start + 'L ' + (x1 + 2) + ' ' + y1 + ' ';
        markerEle = getElementFunction(getQueryConnect + '' + markerId + '_dataIndex_' + sameMarkerData[0].data[i]['index']);
        markerEle.setAttribute('transform', 'translate( ' + x1 + ' ' + y1 + ')');
        markerEle['style']['visibility'] = "visible";
        newAngle += angle;
    }
    var options;
    options = {
        d: path,
        id: maps.element.id + '_markerClusterConnectorLine',
        stroke: maps.layers[sameMarkerData[0].layerIndex].markerClusterSettings.connectorLineSettings.color,
        opacity: maps.layers[sameMarkerData[0].layerIndex].markerClusterSettings.connectorLineSettings.opacity,
        'stroke-width': maps.layers[sameMarkerData[0].layerIndex].markerClusterSettings.connectorLineSettings.width
    };
    markerElement = isDom ? getElementFunction(maps.element.id + '_Markers_Group') : markerElement;
    var groupEle = maps.renderer.createGroup({ id: maps.element.id + '_LayerIndex_' + sameMarkerData[0].layerIndex + '_MarkerIndex_' + sameMarkerData[0].markerIndex + '_markerClusterConnectorLine' });
    groupEle.appendChild(maps.renderer.drawPath(options));
    markerElement.insertBefore(groupEle, markerElement.querySelector('#' + markerId + '_dataIndex_0'));
}
export function marker(eventArgs, markerSettings, markerData, dataIndex, location, transPoint, markerID, offset, scale, maps, markerCollection) {
    var shapeCustom = {
        size: new Size(eventArgs.width, eventArgs.height),
        fill: eventArgs.fill, borderColor: eventArgs.border.color,
        borderWidth: eventArgs.border.width, opacity: markerSettings.opacity,
        dashArray: markerSettings.dashArray
    };
    var ele = drawSymbols(eventArgs.shape, eventArgs.imageUrl, { x: 0, y: 0 }, markerID, shapeCustom, markerCollection, maps);
    var x = (maps.isTileMap ? location.x : (location.x + transPoint.x) * scale) + offset.x;
    var y = (maps.isTileMap ? location.y : (location.y + transPoint.y) * scale) + offset.y;
    ele.setAttribute('transform', 'translate( ' + x + ' ' + y + ' )');
    markerCollection.appendChild(ele);
    var element = (markerData.length - 1) === dataIndex ? 'marker' : null;
    var markerPoint = new Point(x, y);
    if (markerSettings.animationDuration > 0) {
        elementAnimate(ele, markerSettings.animationDelay, markerSettings.animationDuration, markerPoint, maps, element);
    }
    return markerCollection;
}
export function markerTemplate(eventArgs, templateFn, markerID, data, markerIndex, markerTemplate, location, scale, offset, maps) {
    templateFn = getTemplateFunction(eventArgs.template);
    if (templateFn && (!maps.isBlazor ? templateFn(data, null, null, maps.element.id + '_MarkerTemplate', false).length : {})) {
        var templateElement = templateFn(data, null, null, maps.element.id + '_MarkerTemplate', false);
        var markerElement = convertElement(templateElement, markerID, data, markerIndex, maps);
        for (var i = 0; i < markerElement.children.length; i++) {
            markerElement.children[i].style.pointerEvents = 'none';
        }
        markerElement.style.left = ((maps.isTileMap ? location.x :
            ((Math.abs(maps.baseMapRectBounds['min']['x'] - location.x)) * scale)) + offset.x) + 'px';
        markerElement.style.top = ((maps.isTileMap ? location.y :
            ((Math.abs(maps.baseMapRectBounds['min']['y'] - location.y)) * scale)) + offset.y) + 'px';
        markerTemplate.appendChild(markerElement);
    }
    return markerTemplate;
}
/**
 * Internal use of append shape element
 * @private
 */
export function appendShape(shape, element) {
    if (element) {
        element.appendChild(shape);
    }
    return shape;
}
/**
 * Internal rendering of Circle
 * @private
 */
export function drawCircle(maps, options, element) {
    return appendShape(maps.renderer.drawCircle(options), element);
}
/**
 * Internal rendering of Rectangle
 * @private
 */
export function drawRectangle(maps, options, element) {
    return appendShape(maps.renderer.drawRectangle(options), element);
}
/**
 * Internal rendering of Path
 * @private
 */
export function drawPath(maps, options, element) {
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Polygon
 * @private
 */
export function drawPolygon(maps, options, element) {
    return appendShape(maps.renderer.drawPolygon(options), element);
}
/**
 * Internal rendering of Polyline
 * @private
 */
export function drawPolyline(maps, options, element) {
    return appendShape(maps.renderer.drawPolyline(options), element);
}
/**
 * Internal rendering of Line
 * @private
 */
export function drawLine(maps, options, element) {
    return appendShape(maps.renderer.drawLine(options), element);
}
/**
 * @private
 * Calculate marker shapes
 */
export function calculateShapes(maps, shape, options, size, location, markerEle) {
    var tempGroup;
    switch (shape) {
        case 'Balloon':
            tempGroup = drawBalloon(maps, options, size, location, markerEle);
            break;
        case 'Cross':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height
                / 2) + ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
            break;
        case 'Diamond':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' '
                + location.y + ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + location.y + ' Z';
            break;
        case 'Star':
            options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            break;
        case 'Triangle':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
            break;
        case 'HorizontalLine':
            options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' '
                + location.y;
            break;
        case 'VerticalLine':
            options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2);
            break;
    }
    return shape === 'Balloon' ? tempGroup : maps.renderer.drawPath(options);
}
/**
 * Internal rendering of Diamond
 * @private
 */
export function drawDiamond(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' + location.y +
        ' L ' + location.x + ' ' + (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + location.y + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Triangle
 * @private
 */
export function drawTriangle(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + (location.x + size.width / 2) + ' ' +
        (location.y + size.height / 2) + ' L ' + (location.x - size.width / 2) + ' ' + (location.y + size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Cross
 * @private
 */
export function drawCross(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2) +
        ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of HorizontalLine
 * @private
 */
export function drawHorizontalLine(maps, options, size, location, element) {
    options.d = ' M ' + (location.x - size.width / 2) + ' ' + location.y + ' L ' + (location.x + size.width / 2) + ' ' + location.y;
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of VerticalLine
 * @private
 */
export function drawVerticalLine(maps, options, size, location, element) {
    options.d = 'M ' + location.x + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2);
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Star
 * @private
 */
export function drawStar(maps, options, size, location, element) {
    options.d = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
        + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6) + ' L '
        + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' + (location.y + size.height / 2)
        + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
    return appendShape(maps.renderer.drawPath(options), element);
}
/**
 * Internal rendering of Balloon
 * @private
 */
export function drawBalloon(maps, options, size, location, element) {
    var width = size.width;
    var height = size.height;
    var padding = 5;
    location.x -= width / 2;
    location.y -= height;
    options.d = 'M15,0C8.8,0,3.8,5,3.8,11.2C3.8,17.5,9.4,24.4,15,30c5.6-5.6,11.2-12.5,11.2-18.8C26.2,5,21.2,0,15,0z M15,16' +
        'c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S17.8,16,15,16z';
    var balloon = maps.renderer.drawPath(options);
    var x = size.width / 22.5;
    var y = size.height / 30;
    balloon.setAttribute('transform', 'translate(' + location.x + ', ' + location.y + ') scale(' + x + ', ' + y + ')');
    var g = maps.renderer.createGroup({ id: options.id });
    appendShape(balloon, g);
    return appendShape(g, element);
}
/**
 * Internal rendering of Pattern
 * @private
 */
export function drawPattern(maps, options, elements, element) {
    var pattern = maps.renderer.createPattern(options, 'pattern');
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var ele = elements_1[_i];
        appendShape(ele, pattern);
    }
    return appendShape(pattern, element);
}
/**
 * Method to get specific field and vaues from data.
 * @private
 */
// tslint:disable:no-any
export function getFieldData(dataSource, fields) {
    var newData = [];
    var data;
    for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
        var temp = dataSource_1[_i];
        data = {};
        for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
            var field = fields_1[_a];
            if (temp[field]) {
                data[field] = temp[field];
            }
        }
        newData.push(data);
    }
    return newData;
}
/**
 * To find the index of dataSource from shape properties
 */
// tslint:disable:no-string-literal
export function checkShapeDataFields(dataSource, properties, dataPath, propertyPath) {
    if (!(isNullOrUndefined(properties))) {
        for (var i = 0; i < dataSource.length; i++) {
            var shapePath = checkPropertyPath(dataSource[i][dataPath], propertyPath, properties);
            if (dataSource[i][dataPath] === properties[shapePath]) {
                return i;
            }
        }
    }
    return null;
}
export function checkPropertyPath(shapeData, shapePropertyPath, shape) {
    if (!isNullOrUndefined(shapeData) && !isNullOrUndefined(shape)) {
        if (!isNullOrUndefined(shapePropertyPath)) {
            var length_1;
            var properties = (Object.prototype.toString.call(shapePropertyPath) === '[object Array]' ?
                shapePropertyPath : [shapePropertyPath]);
            for (var i = 0; i < properties.length; i++) {
                if (shapeData === shape[properties[i]]) {
                    return properties[i];
                }
            }
        }
    }
    return null;
}
export function filter(points, start, end) {
    var pointObject = [];
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (start <= point.y && end >= point.y) {
            pointObject.push(point);
        }
    }
    return pointObject;
}
export function getRatioOfBubble(min, max, value, minValue, maxValue) {
    var percent = (100 / (maxValue - minValue)) * (value - minValue);
    var bubbleRadius = (((max - min) / 100) * percent) + min;
    if (maxValue === minValue) {
        bubbleRadius = (((max - min) / 100)) + min;
    }
    return bubbleRadius;
}
/**
 * To find the midpoint of the polygon from points
 */
export function findMidPointOfPolygon(points, type) {
    if (!points.length) {
        return null;
    }
    var min = 0;
    var max = points.length;
    var startX;
    var startY;
    var startX1;
    var startY1;
    var sum = 0;
    var xSum = 0;
    var ySum = 0;
    for (var i = min; i <= max - 1; i++) {
        startX = points[i].x;
        startY = type === 'Mercator' ? points[i].y : -(points[i].y);
        if (i === max - 1) {
            startX1 = points[0].x;
            startY1 = type === 'Mercator' ? points[0].y : -(points[0].y);
        }
        else {
            startX1 = points[i + 1].x;
            startY1 = type === 'Mercator' ? points[i + 1].y : -(points[i + 1].y);
        }
        sum = sum + Math.abs(((startX * startY1)) - (startX1 * startY));
        xSum = xSum + Math.abs(((startX + startX1) * (((startX * startY1) - (startX1 * startY)))));
        ySum = ySum + Math.abs(((startY + startY1) * (((startX * startY1) - (startX1 * startY)))));
    }
    sum = 0.5 * sum;
    xSum = (1 / (4 * sum)) * xSum;
    ySum = (1 / (4 * sum)) * ySum;
    /* Code for finding nearest points in polygon related to midPoint*/
    var rightMinPoint = { x: 0, y: 0 };
    var rightMaxPoint = { x: 0, y: 0 };
    var leftMinPoint = { x: 0, y: 0 };
    var leftMaxPoint = { x: 0, y: 0 };
    var bottomMinPoint = { x: 0, y: 0 };
    var bottomMaxPoint = { x: 0, y: 0 };
    var topMinPoint = { x: 0, y: 0 };
    var topMaxPoint = { x: 0, y: 0 };
    var height = 0;
    for (var i = min; i <= max - 1; i++) {
        var point = points[i];
        point.y = type === 'Mercator' ? point.y : -(point.y);
        if (point.y > ySum) {
            if (point.x < xSum && xSum - point.x < xSum - bottomMinPoint.x) {
                bottomMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (bottomMaxPoint.x === 0 || point.x - xSum < bottomMaxPoint.x - xSum)) {
                bottomMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.x < xSum && xSum - point.x < xSum - topMinPoint.x) {
                topMinPoint = { x: point.x, y: point.y };
            }
            else if (point.x > xSum && (topMaxPoint.x === 0 || point.x - xSum < topMaxPoint.x - xSum)) {
                topMaxPoint = { x: point.x, y: point.y };
            }
        }
        height = (bottomMaxPoint.y - topMaxPoint.y) + ((bottomMaxPoint.y - topMaxPoint.y) / 4);
        if (point.x > xSum) {
            if (point.y < ySum && ySum - point.y < ySum - rightMinPoint.y) {
                rightMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (rightMaxPoint.y === 0 || point.y - ySum < rightMaxPoint.y - ySum)) {
                rightMaxPoint = { x: point.x, y: point.y };
            }
        }
        else {
            if (point.y < ySum && ySum - point.y < ySum - leftMinPoint.y) {
                leftMinPoint = { x: point.x, y: point.y };
            }
            else if (point.y > ySum && (leftMaxPoint.y === 0 || point.y - ySum < leftMaxPoint.y - ySum)) {
                leftMaxPoint = { x: point.x, y: point.y };
            }
        }
    }
    return {
        x: xSum, y: ySum, rightMin: rightMinPoint, rightMax: rightMaxPoint,
        leftMin: leftMinPoint, leftMax: leftMaxPoint, points: points, topMax: topMaxPoint, topMin: topMinPoint,
        bottomMax: bottomMaxPoint, bottomMin: bottomMinPoint, height: height
    };
}
/**
 * @private
 * Check custom path
 */
/* tslint:disable:no-string-literal */
export function isCustomPath(layerData) {
    var customPath = false;
    if (Object.prototype.toString.call(layerData) === '[object Array]') {
        layerData.forEach(function (layer, index) {
            if (!isNullOrUndefined(layer['geometry']) && layer['geometry']['type'] === 'Path') {
                customPath = true;
            }
        });
    }
    return customPath;
}
/**
 * @private
 * Trim the title text
 */
export function textTrim(maxWidth, text, font) {
    var label = text;
    var size = measureText(text, font).width;
    if (size > maxWidth) {
        var textLength = text.length;
        for (var i = textLength - 1; i >= 0; --i) {
            label = text.substring(0, i) + '...';
            size = measureText(label, font).width;
            if (size <= maxWidth || label.length < 4) {
                if (label.length < 4) {
                    label = ' ';
                }
                return label;
            }
        }
    }
    return label;
}
/**
 * Method to calculate x position of title
 */
export function findPosition(location, alignment, textSize, type) {
    var x;
    var y;
    switch (alignment) {
        case 'Near':
            x = location.x;
            break;
        case 'Center':
            x = (type === 'title') ? (location.width / 2 - textSize.width / 2) :
                ((location.x + (location.width / 2)) - textSize.width / 2);
            break;
        case 'Far':
            x = (type === 'title') ? (location.width - location.y - textSize.width) :
                ((location.x + location.width) - textSize.width);
            break;
    }
    y = (type === 'title') ? location.y + (textSize.height / 2) : ((location.y + location.height / 2) + textSize.height / 2);
    return new Point(x, y);
}
/**
 * To remove element by id
 */
export function removeElement(id) {
    var element = document.getElementById(id);
    return element ? remove(element) : null;
}
/**
 * @private
 */
export function getTranslate(mapObject, layer, animate) {
    if (isNullOrUndefined(mapObject.mapScaleValue)) {
        mapObject.mapScaleValue = mapObject.zoomSettings.zoomFactor;
    }
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    var min = mapObject.baseMapRectBounds['min'];
    var max = mapObject.baseMapRectBounds['max'];
    var size = (mapObject.totalRect) ? mapObject.totalRect : mapObject.mapAreaRect;
    var availSize = mapObject.availableSize;
    var x;
    var y;
    var mapWidth = Math.abs(max['x'] - min['x']);
    var mapHeight = Math.abs(min['y'] - max['y']);
    var factor = animate ? 1 : mapObject.zoomSettings.zoomFactor;
    var scaleFactor;
    var center = mapObject.centerPosition;
    if (!isNullOrUndefined(center.longitude) && !isNullOrUndefined(center.latitude)) {
        var leftPosition = ((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) / factor;
        var topPosition = ((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) / factor;
        var point = convertGeoToPoint(center.latitude, center.longitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
        if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType) {
            x = -point.x + leftPosition;
            y = -point.y + topPosition;
            scaleFactor = zoomFactor;
        }
        else {
            scaleFactor = mapObject.scale;
            x = mapObject.zoomTranslatePoint.x;
            y = mapObject.zoomTranslatePoint.y;
        }
    }
    else {
        if (isNullOrUndefined(mapObject.previousProjection) || mapObject.previousProjection !== mapObject.projectionType) {
            scaleFactor = parseFloat(Math.min(size.width / mapWidth, size.height / mapHeight).toFixed(2));
            mapWidth *= scaleFactor;
            mapHeight *= scaleFactor;
            x = size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2)));
            y = size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2)));
        }
        else {
            scaleFactor = mapObject.scale;
            x = mapObject.zoomTranslatePoint.x;
            y = mapObject.zoomTranslatePoint.y;
        }
    }
    return { scale: scaleFactor, location: new Point(x, y) };
}
/**
 * @private
 */
export function getZoomTranslate(mapObject, layer, animate) {
    if (isNullOrUndefined(mapObject.mapScaleValue)) {
        mapObject.mapScaleValue = mapObject.zoomSettings.zoomFactor;
    }
    var zoomFactor = animate ? 1 : mapObject.mapScaleValue;
    var size = mapObject.mapAreaRect;
    var x;
    var y;
    var min = mapObject.baseMapRectBounds['min'];
    var max = mapObject.baseMapRectBounds['max'];
    var factor = animate ? 1 : mapObject.mapScaleValue;
    var scaleFactor;
    var mapWidth = Math.abs(max['x'] - min['x']);
    var mapHeight = Math.abs(min['y'] - max['y']);
    var center = mapObject.centerPosition;
    if (!isNullOrUndefined(center.longitude) && !isNullOrUndefined(center.latitude)) {
        var topPosition = ((mapHeight + Math.abs(mapObject.mapAreaRect.height - mapHeight)) / 2) / factor;
        var leftPosition = ((mapWidth + Math.abs(mapObject.mapAreaRect.width - mapWidth)) / 2) / factor;
        var point = convertGeoToPoint(center.latitude, center.longitude, mapObject.mapLayerPanel.calculateFactor(layer), layer, mapObject);
        if (!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                x = -point.x + leftPosition;
                y = -point.y + topPosition;
            }
            else {
                x = mapObject.zoomTranslatePoint.x;
                y = mapObject.zoomTranslatePoint.y;
            }
        }
        else {
            x = -point.x + leftPosition;
            y = -point.y + topPosition;
        }
        scaleFactor = zoomFactor !== 0 ? zoomFactor : 1;
    }
    else {
        var zoomFact = mapObject.zoomSettings.zoomFactor === 0 ? 1 : mapObject.zoomSettings.zoomFactor;
        var maxZoomFact = 10;
        zoomFact = zoomFact > maxZoomFact ? maxZoomFact : zoomFact;
        scaleFactor = zoomFact;
        var mapScale = mapObject.mapScaleValue === 0 ? 1 : mapObject.mapScaleValue > maxZoomFact
            ? maxZoomFact : mapObject.mapScaleValue;
        var leftPosition = (size.x + ((-(min['x'])) + ((size.width / 2) - (mapWidth / 2))));
        var topPosition = (size.y + ((-(min['y'])) + ((size.height / 2) - (mapHeight / 2))));
        if (!isNullOrUndefined(mapObject.zoomTranslatePoint) || !isNullOrUndefined(mapObject.previousProjection)) {
            if (mapObject.previousProjection !== mapObject.projectionType) {
                var previousPositions = [];
                var previousPoints = { x: leftPosition, y: topPosition };
                previousPositions.push(previousPoints);
                for (var i = 1; i < maxZoomFact; i++) {
                    var translatePointX = previousPositions[i - 1]['x'] - (((size.width / (i)) - (size.width / (i + 1))) / 2);
                    var translatePointY = previousPositions[i - 1]['y'] - (((size.height / (i)) - (size.height / (i + 1))) / 2);
                    previousPoints = { x: translatePointX, y: translatePointY };
                    previousPositions.push(previousPoints);
                }
                leftPosition = previousPositions[zoomFact - 1]['x'];
                topPosition = previousPositions[zoomFact - 1]['y'];
            }
            else {
                leftPosition = mapObject.zoomTranslatePoint.x;
                topPosition = mapObject.zoomTranslatePoint.y;
                if (zoomFact !== mapScale) {
                    scaleFactor = mapScale;
                }
            }
        }
        x = leftPosition;
        y = topPosition;
    }
    return { scale: scaleFactor, location: new Point(x, y) };
}
/**
 * To get the html element by specified id
 */
export function getElementByID(id) {
    return document.getElementById(id);
}
/**
 * To apply internalization
 */
export function Internalize(maps, value) {
    maps.formatFunction =
        maps.intl.getNumberFormat({ format: maps.format, useGrouping: maps.useGroupingSeparator });
    return maps.formatFunction(value);
}
/**
 * Function     to compile the template function for maps.
 * @returns Function
 * @private
 */
export function getTemplateFunction(template) {
    var templateFn = null;
    var e;
    try {
        if (document.querySelectorAll(template).length) {
            templateFn = templateComplier(document.querySelector(template).innerHTML.trim());
        }
    }
    catch (e) {
        templateFn = templateComplier(template);
    }
    return templateFn;
}
/**
 * Function to get element from id.
 * @returns Element
 * @private
 */
export function getElement(id) {
    return document.getElementById(id);
}
/**
 * Function to get shape data using target id
 */
export function getShapeData(targetId, map) {
    var layerIndex = parseInt(targetId.split('_LayerIndex_')[1].split('_')[0], 10);
    var shapeIndex = parseInt(targetId.split('_shapeIndex_')[1].split('_')[0], 10);
    var layer = map.layers[layerIndex];
    var shapeData = layer.layerData[shapeIndex]['property'];
    var data;
    if (layer.dataSource) {
        data = layer.dataSource[checkShapeDataFields(layer.dataSource, shapeData, layer.shapeDataPath, layer.shapePropertyPath)];
    }
    return { shapeData: shapeData, data: data };
}
/**
 * Function to trigger shapeSelected event
 * @private
 */
export function triggerShapeEvent(targetId, selection, maps, eventName) {
    var shape = getShapeData(targetId, maps);
    var eventArgs = {
        cancel: false,
        name: eventName,
        fill: selection.fill,
        opacity: selection.opacity,
        border: selection.border,
        shapeData: shape.shapeData,
        data: shape.data,
        target: targetId,
        maps: maps
    };
    if (maps.isBlazor) {
        var data = eventArgs.data, maps_2 = eventArgs.maps, shapeData = eventArgs.shapeData, blazorEventArgs = __rest(eventArgs, ["data", "maps", "shapeData"]);
        eventArgs = blazorEventArgs;
    }
    maps.trigger(eventName, eventArgs);
    return eventArgs;
}
/**
 * Function to get elements using class name
 */
export function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}
/**
 * Function to get elements using querySelectorAll
 */
// export function querySelectorAll(args: string, element: Element): NodeListOf<Element> {
//     return element.querySelectorAll('.' + args);
// }
/**
 * Function to get elements using querySelector
 */
export function querySelector(args, elementSelector) {
    var targetEle = null;
    if (document.getElementById(elementSelector)) {
        targetEle = document.getElementById(elementSelector).querySelector('#' + args);
    }
    return targetEle;
}
/**
 * Function to get the element for selection and highlight using public method
 */
export function getTargetElement(layerIndex, name, enable, map) {
    var shapeIndex;
    var targetId;
    var targetEle;
    var shapeData = map.layers[layerIndex].shapeData['features'];
    for (var i = 0; i < shapeData.length; i++) {
        if (shapeData[i]['properties'].name === name) {
            targetId = map.element.id + '_' + 'LayerIndex_' + layerIndex + '_shapeIndex_' + i + '_dataIndex_undefined';
            break;
        }
    }
    targetEle = getElement(targetId);
    return targetEle;
}
/**
 * Function to create style element for highlight and selection
 */
export function createStyle(id, className, eventArgs) {
    return createElement('style', {
        id: id, innerHTML: '.' + className + '{fill:'
            + eventArgs.fill + ';' + 'opacity:' + eventArgs.opacity.toString() + ';' +
            'stroke-width:' + eventArgs.border.width.toString() + ';' +
            'stroke:' + eventArgs.border.color + ';' + '}'
    });
}
/**
 * Function to customize the style for highlight and selection
 */
export function customizeStyle(id, className, eventArgs) {
    var styleEle = getElement(id);
    styleEle.innerHTML = '.' + className + '{fill:'
        + eventArgs.fill + ';' + 'opacity:' + eventArgs.opacity.toString() + ';' +
        'stroke-width:' + eventArgs.border.width.toString() + ';' +
        'stroke:' + eventArgs.border.color + '}';
}
/**
 * Function to remove class from element
 */
export function removeClass(element) {
    element.removeAttribute('class');
}
/**
 * Animation Effect Calculation End
 * @private
 */
export function elementAnimate(element, delay, duration, point, maps, ele, radius) {
    if (radius === void 0) { radius = 0; }
    var centerX = point.x;
    var centerY = point.y;
    var height = 0;
    var transform = element.getAttribute('transform') || '';
    new Animation({}).animate(element, {
        duration: duration,
        delay: delay,
        progress: function (args) {
            if (args.timeStamp > args.delay) {
                height = ((args.timeStamp - args.delay) / args.duration);
                element.setAttribute('transform', 'translate( ' + (centerX - (radius * height)) + ' ' + (centerY - (radius * height)) +
                    ' ) scale(' + height + ')');
            }
        },
        end: function (model) {
            element.setAttribute('transform', transform);
            if (!ele) {
                return;
            }
            var event = {
                cancel: false, name: animationComplete, element: ele, maps: !maps.isBlazor ? maps : null
            };
            maps.trigger(animationComplete, event);
        }
    });
}
export function timeout(id) {
    removeElement(id);
}
export function showTooltip(text, size, x, y, areaWidth, areaHeight, id, element, isTouch) {
    var tooltip = document.getElementById(id);
    var width = measureText(text, {
        fontFamily: 'Segoe UI', size: '8px',
        fontStyle: 'Normal', fontWeight: 'Regular'
    }).width;
    var str = text.split(' ');
    var demo = str[0].length;
    for (var i = 1; i < str.length; i++) {
        if (demo < str[i].length) {
            demo = str[i].length;
        }
    }
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id,
            styles: 'background-color: rgb(255, 255, 255) !important; color:black !important; ' +
                'position:absolute;border:1px solid rgb(0, 0, 0); padding-left:5px;' +
                'font-size:12px; font-family: "Segoe UI"; text-align:center'
        });
    }
    if (x < (areaWidth - width)) {
        x = x;
    }
    else if (x > (areaWidth - width) && x < areaWidth - (demo * 8)) {
        width = (areaWidth - x);
    }
    else if (x >= areaWidth - demo * 8) {
        if (x > width) {
            x = x - width;
        }
        else {
            width = x;
            x = 0;
        }
    }
    var size1 = size.split('px');
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    var height = tooltip.clientHeight;
    if ((height + parseInt(size1[0], 10) * 2) > areaHeight) {
        width = x;
        x = 0;
    }
    wordWrap(tooltip, text, x, y, size1, width, areaWidth, element);
    if (isTouch) {
        setTimeout(timeout, 5000, id);
    }
}
export function wordWrap(tooltip, text, x, y, size1, width, areaWidth, element) {
    tooltip.innerHTML = text;
    tooltip.style.top = (parseInt(size1[0], 10) * 2).toString() + 'px';
    tooltip.style.left = (x).toString() + 'px';
    tooltip.style.width = width.toString() + 'px';
    tooltip.style.maxWidth = (areaWidth).toString() + 'px';
    tooltip.style.wordWrap = 'break-word';
    element.appendChild(tooltip);
}
// /**
//  *
//  * @param touchList
//  * @param e
//  * @param touches
//  */
// export function addTouchPointer(touchList: ITouches[], e: PointerEvent, touches: TouchList): ITouches[] {
//     if (touches) {
//         touchList = [];
//         for (let i: number = 0, length: number = touches.length; i < length; i++) {
//             touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
//         }
//     } else {
//         touchList = touchList ? touchList : [];
//         if (touchList.length === 0) {
//             touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//         } else {
//             for (let i: number = 0, length: number = touchList.length; i < length; i++) {
//                 if (touchList[i].pointerId === e.pointerId) {
//                     touchList[i] = { pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId };
//                 } else {
//                     touchList.push({ pageX: e.clientX, pageY: e.clientY, pointerId: e.pointerId });
//                 }
//             }
//         }
//     }
//     return touchList;
// }
/** @private */
export function createTooltip(id, text, top, left, fontSize) {
    var tooltip = getElement(id);
    var style = 'top:' + top.toString() + 'px;' +
        'left:' + left.toString() + 'px;' +
        'color: #000000; ' +
        'background:' + '#FFFFFF' + ';' +
        'position:absolute;border:1px solid #707070;font-size:' + fontSize + ';border-radius:2px;';
    if (!tooltip) {
        tooltip = createElement('div', {
            id: id, innerHTML: '&nbsp;' + text + '&nbsp;', styles: style
        });
        document.body.appendChild(tooltip);
    }
    else {
        tooltip.setAttribute('innerHTML', '&nbsp;' + text + '&nbsp;');
        tooltip.setAttribute('styles', style);
    }
}
/** @private */
export function drawSymbol(location, shape, size, url, options) {
    var functionName = 'Path';
    var renderer = new SvgRenderer('');
    var temp = renderLegendShape(location, size, shape, options, url);
    var htmlObject = renderer['draw' + temp.functionName](temp.renderOption);
    return htmlObject;
}
/** @private */
export function renderLegendShape(location, size, shape, options, url) {
    var renderPath;
    var functionName = 'Path';
    var shapeWidth = size.width;
    var shapeHeight = size.height;
    var shapeX = location.x;
    var shapeY = location.y;
    var x = location.x + (-shapeWidth / 2);
    var y = location.y + (-shapeHeight / 2);
    switch (shape) {
        case 'Circle':
        case 'Bubble':
            functionName = 'Ellipse';
            merge(options, { 'rx': shapeWidth / 2, 'ry': shapeHeight / 2, 'cx': shapeX, 'cy': shapeY });
            break;
        case 'VerticalLine':
            renderPath = 'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' '
                + (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Diamond':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + shapeY + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Rectangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (-shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Triangle':
            renderPath = 'M' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (-shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + x + ' ' + (shapeY + (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'InvertedTriangle':
            renderPath = 'M' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX - (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' ' +
                'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + (shapeY - (shapeHeight / 2)) + ' z';
            merge(options, { 'd': renderPath });
            break;
        case 'Pentagon':
            var eq = 72;
            var xValue = void 0;
            var yValue = void 0;
            for (var i = 0; i <= 5; i++) {
                xValue = (shapeWidth / 2) * Math.cos((Math.PI / 180) * (i * eq));
                yValue = (shapeWidth / 2) * Math.sin((Math.PI / 180) * (i * eq));
                if (i === 0) {
                    renderPath = 'M' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ';
                }
                else {
                    renderPath = renderPath.concat('L' + ' ' + (shapeX + xValue) + ' ' + (shapeY + yValue) + ' ');
                }
            }
            renderPath = renderPath.concat('Z');
            merge(options, { 'd': renderPath });
            break;
        case 'Star':
            renderPath = 'M ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + (location.x - size.width / 2)
                + ' ' + (location.y + size.height / 6) + ' L ' + (location.x + size.width / 2) + ' ' + (location.y + size.height / 6)
                + ' L ' + (location.x - size.width / 3) + ' ' + (location.y - size.height / 2) + ' L ' + location.x + ' ' +
                (location.y + size.height / 2) + ' L ' + (location.x + size.width / 3) + ' ' + (location.y - size.height / 2) + ' Z';
            merge(options, { 'd': renderPath });
            break;
        case 'Cross':
            renderPath = 'M' + ' ' + x + ' ' + shapeY + ' ' + 'L' + ' ' + (shapeX + (shapeWidth / 2)) + ' ' + shapeY + ' ' +
                'M' + ' ' + shapeX + ' ' + (shapeY + (shapeHeight / 2)) + ' ' + 'L' + ' ' + shapeX + ' ' +
                (shapeY + (-shapeHeight / 2));
            merge(options, { 'd': renderPath });
            break;
        case 'Image':
            functionName = 'Image';
            merge(options, { 'href': url, 'height': shapeHeight, 'width': shapeWidth, x: x, y: y });
            break;
    }
    return { renderOption: options, functionName: functionName };
}
/**
 * Animation Effect Calculation End
 * @private
 */
// export function markerTemplateAnimate(element: Element, delay: number, duration: number, point: MapLocation): void {
//     let delta: number = 0;
//     let top: string = (element as HTMLElement).style.top;
//     let y: number = parseInt(top, 10);
//     new Animation({}).animate(<HTMLElement>element, {
//         duration: duration,
//         delay: delay,
//         progress: (args: AnimationOptions): void => {
//             if (args.timeStamp > args.delay) {
//                 delta = ((args.timeStamp - args.delay) / args.duration);
//                 (element as HTMLElement).style.top = y - 100 + (delta * 100) + 'px';
//             }
//         },
//         end: (model: AnimationOptions) => {
//             (element as HTMLElement).style.top = top;
//         }
//     });
// }
/** @private */
export function getElementOffset(childElement, parentElement) {
    var width;
    var height;
    parentElement.appendChild(childElement);
    width = childElement.offsetWidth;
    height = childElement.offsetHeight;
    parentElement.removeChild(childElement);
    return new Size(width, height);
}
/** @private */
export function changeBorderWidth(element, index, scale, maps) {
    var childNode;
    for (var l = 0; l < element.childElementCount; l++) {
        childNode = element.childNodes[l];
        if (childNode.id.indexOf('_NavigationGroup') > -1) {
            changeNavaigationLineWidth(childNode, index, scale, maps);
        }
        else {
            var currentStroke = (maps.layersCollection[index].shapeSettings.border.width);
            childNode.setAttribute('stroke-width', (currentStroke / scale).toString());
        }
    }
}
/** @private */
export function changeNavaigationLineWidth(element, index, scale, maps) {
    var node;
    for (var m = 0; m < element.childElementCount; m++) {
        node = element.childNodes[m];
        if (node.tagName === 'path') {
            var currentStroke = (maps.layersCollection[index]
                .navigationLineSettings[parseFloat(node.id.split('_NavigationIndex_')[1].split('_')[0])].width);
            node.setAttribute('stroke-width', (currentStroke / scale).toString());
        }
    }
}
// /** Pinch zoom helper methods */
/** @private */
export function targetTouches(event) {
    var targetTouches = [];
    var touches = event.touches;
    for (var i = 0; i < touches.length; i++) {
        targetTouches.push({ pageX: touches[i].pageX, pageY: touches[i].pageY });
    }
    return targetTouches;
}
/** @private */
export function calculateScale(startTouches, endTouches) {
    var startDistance = getDistance(startTouches[0], startTouches[1]);
    var endDistance = getDistance(endTouches[0], endTouches[1]);
    return (endDistance / startDistance);
}
/** @private */
export function getDistance(a, b) {
    var x = a.pageX - b.pageX;
    var y = a.pageY - b.pageY;
    return Math.sqrt(x * x + y * y);
}
/** @private */
export function getTouches(touches, maps) {
    var rect = maps.element.getBoundingClientRect();
    var posTop = rect.top + document.defaultView.pageXOffset;
    var posLeft = rect.left + document.defaultView.pageYOffset;
    return Array.prototype.slice.call(touches).map(function (touch) {
        return {
            x: touch.pageX - posLeft,
            y: touch.pageY - posTop,
        };
    });
}
/** @private */
export function getTouchCenter(touches) {
    return {
        x: touches.map(function (e) { return e['x']; }).reduce(sum) / touches.length,
        y: touches.map(function (e) { return e['y']; }).reduce(sum) / touches.length
    };
}
/** @private */
export function sum(a, b) {
    return a + b;
}
/**
 * Animation Effect Calculation End
 * @private
 */
export function zoomAnimate(element, delay, duration, point, scale, size, maps) {
    var delta = 0;
    var previousLocation = maps.previousPoint;
    var preScale = maps.previousScale;
    var diffScale = scale - preScale;
    var currentLocation = new MapLocation(0, 0);
    var currentScale = 1;
    if (scale === preScale) {
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        return;
    }
    var slope = function (previousLocation, point) {
        if (previousLocation.x === point.x) {
            return null;
        }
        return (point.y - previousLocation.y) / (point.x - previousLocation.x);
    };
    var intercept = function (point, slopeValue) {
        if (slopeValue === null) {
            return point.x;
        }
        return point.y - slopeValue * point.x;
    };
    var slopeFactor = slope(previousLocation, point);
    var slopeIntersection = intercept(previousLocation, slopeFactor);
    var horizontalDifference = point.x - previousLocation.x;
    var verticalDifference = point.y - previousLocation.y;
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentScale = preScale + (delta * diffScale);
            currentLocation.x = previousLocation.x + (delta * horizontalDifference) / (currentScale / scale);
            if (slopeFactor == null) {
                currentLocation.y = previousLocation.y + (delta * verticalDifference);
            }
            else {
                currentLocation.y = ((slopeFactor * currentLocation.x) + slopeIntersection);
            }
            args.element.setAttribute('transform', 'scale( ' + currentScale + ' ) ' +
                'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
            maps.translatePoint = currentLocation;
            maps.scale = currentScale;
            maps.zoomModule.processTemplate(point.x, point.y, currentScale, maps);
        }
    }, function () {
        maps.translatePoint = point;
        maps.scale = scale;
        element.setAttribute('transform', 'scale( ' + (scale) + ' ) translate( ' + point.x + ' ' + point.y + ' )');
        maps.zoomModule.processTemplate(point.x, point.y, scale, maps);
    });
}
/**
 * To process custom animation
 */
export function animate(element, delay, duration, process, end) {
    var _this = this;
    var start = null;
    var clearAnimation;
    var startAnimation = function (timestamp) {
        if (!start) {
            start = timestamp;
        }
        var progress = timestamp - start;
        if (progress < duration) {
            process.call(_this, { element: element, delay: 0, timeStamp: progress, duration: duration });
            window.requestAnimationFrame(startAnimation);
        }
        else {
            window.cancelAnimationFrame(clearAnimation);
            end.call(_this, { element: element });
        }
    };
    clearAnimation = window.requestAnimationFrame(startAnimation);
}
/**
 * To get shape data file using Ajax.
 */
var MapAjax = /** @class */ (function () {
    function MapAjax(options, type, async, contentType, sendData) {
        this.dataOptions = options;
        this.type = type || 'GET';
        this.async = async || true;
        this.contentType = contentType;
        this.sendData = sendData;
    }
    return MapAjax;
}());
export { MapAjax };
/**
 * Animation Translate
 * @private
 */
export function smoothTranslate(element, delay, duration, point) {
    var delta = 0;
    var transform = element.getAttribute('transform').split(' ');
    if (transform.length === 2) {
        transform[2] = transform[1].split(')')[0];
        transform[1] = transform[0].split('(')[1];
    }
    var previousLocation = new MapLocation(parseInt(transform[1], 10), parseInt(transform[2], 10));
    var diffx = point.x - previousLocation.x;
    var diffy = point.y - previousLocation.y;
    var currentLocation = new MapLocation(0, 0);
    animate(element, delay, duration, function (args) {
        if (args.timeStamp > args.delay) {
            delta = ((args.timeStamp - args.delay) / args.duration);
            currentLocation.x = previousLocation.x + (delta * diffx);
            currentLocation.y = previousLocation.y + (delta * diffy);
            args.element.setAttribute('transform', 'translate( ' + currentLocation.x + ' ' + currentLocation.y + ' )');
        }
    }, function () {
        element.setAttribute('transform', 'translate( ' + point.x + ' ' + point.y + ' )');
    });
}
