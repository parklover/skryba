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
/**
 * Maps Component file
 */
import { Component, NotifyPropertyChanges, Property, Ajax, resetBlazorTemplate } from '@syncfusion/ej2-base';
import { EventHandler, Browser, isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
import { Event, remove, L10n, Collection, Internationalization, Complex, isBlazor } from '@syncfusion/ej2-base';
import { updateBlazorTemplate } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Size, createSvg, Point, removeElement, triggerShapeEvent, showTooltip, mergeSeparateCluster } from './utils/helper';
import { getElement, removeClass, getTranslate } from './utils/helper';
import { ZoomSettings, LegendSettings } from './model/base';
import { LayerSettings, TitleSettings, Border, Margin, MapsAreaSettings, Annotation, CenterPosition } from './model/base';
import { Marker } from './layers/marker';
import { load, click, loaded, resize, shapeSelected } from './model/constants';
import { getThemeStyle } from './model/theme';
import { BingMap } from './layers/bing-map';
import { LayerPanel } from './layers/layer-panel';
import { Rect, RectOption, measureText, getElementByID, MapAjax } from '../maps/utils/helper';
import { findPosition, textTrim, TextOption, renderTextElement, convertGeoToPoint } from '../maps/utils/helper';
import { Annotations } from '../maps/user-interaction/annotation';
import { MarkerSettings } from './index';
import { changeBorderWidth } from './index';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ExportUtils } from '../maps/utils/export';
/**
 * Represents the Maps control.
 * ```html
 * <div id="maps"/>
 * <script>
 *   var maps = new Maps();
 *   maps.appendTo("#maps");
 * </script>
 * ```
 */
var Maps = /** @class */ (function (_super) {
    __extends(Maps, _super);
    /**
     * Constructor for creating the widget
     */
    function Maps(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Check layer whether is normal or tile
         * @private
         */
        _this.isTileMap = false;
        /** @private */
        _this.baseSize = new Size(0, 0);
        /** @public */
        _this.translatePoint = new Point(0, 0);
        /** @private */
        _this.baseTranslatePoint = new Point(0, 0);
        /** @public */
        _this.zoomTranslatePoint = new Point(0, 0);
        /** @private */
        _this.tileTranslatePoint = new Point(0, 0);
        /** @private */
        _this.baseTileTranslatePoint = new Point(0, 0);
        /** @private */
        _this.isDevice = false;
        /** @public */
        _this.dataLabelShape = [];
        _this.zoomShapeCollection = [];
        _this.zoomLabelPositions = [];
        _this.mouseDownEvent = { x: null, y: null };
        _this.mouseClickEvent = { x: null, y: null };
        return _this;
    }
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    Maps.prototype.getLocalizedLabel = function (key) {
        return this.localeObject.getConstant(key);
    };
    /**
     * Initializing pre-required values.
     */
    Maps.prototype.preRender = function () {
        var _this = this;
        this.isDevice = Browser.isDevice;
        this.isBlazor = isBlazor();
        this.initPrivateVariable();
        this.trigger(load, this.isBlazor ? {} : { maps: this }, function () {
            _this.unWireEVents();
            _this.createSVG();
            _this.wireEVents();
            _this.setCulture();
        });
    };
    /**
     * To Initialize the control rendering.
     */
    Maps.prototype.render = function () {
        this.findBaseAndSubLayers();
        this.createSecondaryElement();
        this.addTabIndex();
        this.themeStyle = getThemeStyle(this.theme);
        this.renderBorder();
        this.renderTitle(this.titleSettings, 'title', null, null);
        this.renderArea();
        this.processRequestJsonData();
        this.renderComplete();
    };
    /* tslint:disable:no-string-literal */
    Maps.prototype.processRequestJsonData = function () {
        var _this = this;
        var length = this.layersCollection.length - 1;
        this.serverProcess = { request: 0, response: 0 };
        var queryModule;
        var localAjax;
        var ajaxModule;
        var dataModule;
        this.layersCollection.forEach(function (layer, layerIndex) {
            if (layer.shapeData instanceof DataManager) {
                _this.serverProcess['request']++;
                dataModule = layer.shapeData;
                queryModule = layer.query instanceof Query ? layer.query : new Query();
                var dataManager = dataModule.executeQuery(queryModule);
                dataManager.then(function (e) {
                    _this.processResponseJsonData('DataManager', e, layer, 'ShapeData');
                });
            }
            else if (layer.shapeData instanceof MapAjax || layer.shapeData) {
                if (!isNullOrUndefined(layer.shapeData['dataOptions'])) {
                    _this.processAjaxRequest(layer, layer.shapeData, 'ShapeData');
                }
            }
            if (layer.dataSource instanceof MapAjax || !isNullOrUndefined(layer.dataSource['dataOptions'])) {
                _this.processAjaxRequest(layer, layer.dataSource, 'DataSource');
            }
            if (_this.serverProcess['request'] === _this.serverProcess['response'] && length === layerIndex) {
                _this.processResponseJsonData(null);
            }
        });
    };
    // tslint:disable:no-any
    Maps.prototype.processAjaxRequest = function (layer, localAjax, type) {
        var _this = this;
        var ajaxModule;
        this.serverProcess['request']++;
        ajaxModule = new Ajax(localAjax.dataOptions, localAjax.type, localAjax.async, localAjax.contentType);
        ajaxModule.onSuccess = function (args) {
            _this.processResponseJsonData('Ajax', args, layer, type);
        };
        ajaxModule.send(localAjax.sendData);
    };
    /* tslint:disable:no-eval */
    Maps.prototype.processResponseJsonData = function (processType, data, layer, dataType) {
        this.serverProcess['response']++;
        if (processType) {
            if (dataType === 'ShapeData') {
                layer.shapeData = (processType === 'DataManager') ? !isNullOrUndefined(data['result']) ? data['result'] : data['actual'] :
                    JSON.parse(data);
            }
            else {
                layer.dataSource = (processType === 'DataManager') ? !isNullOrUndefined(data['result']) ? data['result'] : data['actual'] :
                    JSON.parse('[' + data + ']')[0];
            }
        }
        if (!isNullOrUndefined(processType) && this.serverProcess['request'] === this.serverProcess['response']) {
            var collection = this.layersCollection;
            this.layersCollection = [];
            for (var i = 0; i < collection.length; i++) {
                if (collection[i].isBaseLayer) {
                    this.layersCollection.push(collection[i]);
                }
            }
            for (var j = 0; j < collection.length; j++) {
                if (!collection[j].isBaseLayer) {
                    this.layersCollection.push(collection[j]);
                }
            }
            this.renderMap();
        }
        else if (isNullOrUndefined(processType)) {
            this.renderMap();
        }
    };
    Maps.prototype.renderMap = function () {
        if (this.legendModule && this.legendSettings.visible) {
            this.legendModule.renderLegend();
        }
        this.createTile();
        if (this.zoomSettings.enable && this.zoomModule) {
            this.zoomModule.createZoomingToolbars();
        }
        if (!isNullOrUndefined(this.dataLabelModule)) {
            this.dataLabelModule.dataLabelCollections = [];
            this.dataLabelShape = [];
        }
        this.mapLayerPanel.measureLayerPanel();
        this.element.appendChild(this.svgObject);
        if (!isNullOrUndefined(document.getElementById(this.element.id + '_tile_parent'))) {
            var svg = this.svgObject.getBoundingClientRect();
            var element = document.getElementById(this.element.id);
            var tileElement = document.getElementById(this.element.id + '_tile_parent');
            var tile = tileElement.getBoundingClientRect();
            var bottom = svg.bottom - tile.bottom - element.offsetTop;
            var left = parseFloat(tileElement.style.left) + element.offsetLeft;
            var top_1 = parseFloat(tileElement.style.top) + element.offsetTop;
            top_1 = (bottom <= 11) ? top_1 : (top_1 * 2);
            left = (bottom <= 11) ? left : (left * 2);
            tileElement.style.top = top_1 + 'px';
            tileElement.style.left = left + 'px';
        }
        this.arrangeTemplate();
        var blazor = this.isBlazor ? this.blazorTemplates() : null;
        if (this.annotationsModule) {
            this.annotationsModule.renderAnnotationElements();
        }
        this.zoomingChange();
        this.trigger(loaded, this.isBlazor ? {} : { maps: this });
    };
    /**
     * To append blazor templates
     */
    Maps.prototype.blazorTemplates = function () {
        // updateBlazorTemplate(this.element.id + '_LabelTemplate', 'LabelTemplate', this.layers[0].dataLabelSettings);
        updateBlazorTemplate(this.element.id + '_MarkerTemplate', 'MarkerTemplate', this.layers[0].markerSettings[0]);
    };
    /**
     * Render the map area border
     */
    Maps.prototype.renderArea = function () {
        var width = this.mapsArea.border.width;
        var background = this.mapsArea.background;
        if (width > 0 || (background || this.themeStyle.areaBackgroundColor)) {
            var rect = new RectOption(this.element.id + '_MapAreaBorder', background || this.themeStyle.areaBackgroundColor, this.mapsArea.border, 1, this.mapAreaRect);
            this.svgObject.appendChild(this.renderer.drawRectangle(rect));
        }
    };
    /**
     * To add tab index for map element
     */
    Maps.prototype.addTabIndex = function () {
        this.element.setAttribute('aria-label', this.description || 'Maps Element');
        this.element.setAttribute('tabindex', this.tabIndex.toString());
    };
    // private setSecondaryElementPosition(): void {
    //     if (!this.isTileMap) {
    //         let element: HTMLDivElement = getElementByID(this.element.id + '_Secondary_Element') as HTMLDivElement;
    //         let rect: ClientRect = this.element.getBoundingClientRect();
    //         let svgRect: ClientRect = getElementByID(this.element.id + '_svg').getBoundingClientRect();
    //         element.style.marginLeft = Math.max(svgRect.left - rect.left, 0) + 'px';
    //         element.style.marginTop = Math.max(svgRect.top - rect.top, 0) + 'px';
    //     }
    // }
    Maps.prototype.zoomingChange = function () {
        var left;
        var top;
        if (getElementByID(this.element.id + '_Layer_Collections') && this.zoomModule) {
            this.zoomModule.layerCollectionEle = getElementByID(this.element.id + '_Layer_Collections');
        }
        if (this.isTileMap && getElementByID(this.element.id + '_Tile_SVG') && getElementByID(this.element.id + '_tile_parent')) {
            var tileRect = getElementByID(this.element.id + '_tile_parent').getBoundingClientRect();
            var tileSvgRect = getElementByID(this.element.id + '_Tile_SVG').getBoundingClientRect();
            left = (tileRect.left - tileSvgRect.left);
            top = (tileRect.top - tileSvgRect.top);
            getElementByID(this.element.id + '_Tile_SVG').setAttribute('transform', 'translate(' + left + ' ' + top + ')');
            var markerTemplateElements = document.getElementsByClassName('template');
            if (!isNullOrUndefined(markerTemplateElements) && markerTemplateElements.length > 0) {
                for (var i = 0; i < markerTemplateElements.length; i++) {
                    var templateGroupEle = markerTemplateElements[i];
                    templateGroupEle.style.left = left + 'px';
                    templateGroupEle.style.top = top + 'px';
                }
            }
        }
        if (this.zoomSettings.zoomFactor >= 1) {
            if (this.zoomModule && this.zoomModule.toolBarGroup && this.zoomSettings.enable) {
                this.zoomModule.alignToolBar();
            }
            var elements = document.getElementById(this.element.id + '_Layer_Collections');
            if (!isNullOrUndefined(elements) && elements.childElementCount > 0) {
                for (var i = 0; i < elements.childNodes.length; i++) {
                    var childElement = elements.childNodes[i];
                    if (childElement.tagName === 'g') {
                        var layerIndex = parseFloat(childElement.id.split('_LayerIndex_')[1].split('_')[0]);
                        for (var j = 0; j < childElement.childNodes.length; j++) {
                            var childNode = childElement.childNodes[j];
                            if (!(childNode.id.indexOf('_Markers_Group') > -1) &&
                                (!(childNode.id.indexOf('_bubble_Group') > -1)) &&
                                (!(childNode.id.indexOf('_dataLableIndex_Group') > -1))) {
                                changeBorderWidth(childNode, layerIndex, this.scale, this);
                            }
                        }
                    }
                }
            }
            if (this.zoomModule && (this.previousScale !== this.scale)) {
                this.zoomModule.applyTransform(true);
            }
        }
    };
    Maps.prototype.createSecondaryElement = function () {
        if (isNullOrUndefined(document.getElementById(this.element.id + '_Secondary_Element'))) {
            var secondaryElement = createElement('div', {
                id: this.element.id + '_Secondary_Element',
                styles: 'position: absolute;z-index:1;'
            });
            this.element.appendChild(secondaryElement);
        }
    };
    Maps.prototype.arrangeTemplate = function () {
        var secondaryEle = getElementByID(this.element.id + '_Secondary_Element');
        if (document.getElementById(this.element.id + '_Legend_Border')) {
            document.getElementById(this.element.id + '_Legend_Border').style.pointerEvents = 'none';
        }
        var templateElements = document.getElementsByClassName('template');
        if (!isNullOrUndefined(templateElements) && templateElements.length > 0 && getElementByID(this.element.id + '_Layer_Collections')) {
            for (var i = 0; i < templateElements.length; i++) {
                var templateGroupEle = templateElements[i];
                if (!isNullOrUndefined(templateGroupEle) && templateGroupEle.childElementCount > 0) {
                    var layerOffset = getElementByID(this.element.id + '_Layer_Collections').getBoundingClientRect();
                    var elementOffset = getElementByID(templateGroupEle.id).getBoundingClientRect();
                    for (var j = 0; j < templateGroupEle.childElementCount; j++) {
                        var currentTemplate = templateGroupEle.childNodes[j];
                        var templateOffset = currentTemplate.getBoundingClientRect();
                        currentTemplate.style.left = ((this.isTileMap ? parseFloat(currentTemplate.style.left) :
                            ((layerOffset.left < elementOffset.left ? (parseFloat(currentTemplate.style.left) -
                                Math.abs(elementOffset.left - layerOffset.left)) : (parseFloat(currentTemplate.style.left) +
                                Math.abs(elementOffset.left - layerOffset.left))))) - (templateOffset.width / 2)) + 'px';
                        currentTemplate.style.top = ((this.isTileMap ? parseFloat(currentTemplate.style.top) :
                            ((layerOffset.top < elementOffset.top ? (parseFloat(currentTemplate.style.top) -
                                Math.abs(elementOffset.top - layerOffset.top)) : (parseFloat(currentTemplate.style.top) +
                                Math.abs(elementOffset.top - layerOffset.top))))) - (templateOffset.height / 2)) + 'px';
                    }
                }
            }
        }
    };
    Maps.prototype.createTile = function () {
        var mainLayer = this.layersCollection[0];
        var padding = 0;
        if (mainLayer.isBaseLayer && (mainLayer.layerType === 'OSM' || mainLayer.layerType === 'Bing')) {
            removeElement(this.element.id + '_tile_parent');
            // let elementRect: ClientRect = this.element.getBoundingClientRect();
            // let parentRect: ClientRect = this.element.parentElement.getBoundingClientRect();
            // let left: number = Math.abs(elementRect.left - parentRect.left);
            // let top: number = Math.abs(elementRect.top - parentRect.top);
            var ele = createElement('div', {
                id: this.element.id + '_tile_parent', styles: 'position: absolute; left: ' +
                    (this.mapAreaRect.x) + 'px; top: ' + (this.mapAreaRect.y + padding) + 'px; height: ' +
                    (this.mapAreaRect.height) + 'px; width: '
                    + (this.mapAreaRect.width) + 'px; overflow: hidden;'
            });
            this.element.appendChild(ele);
        }
    };
    /**
     * To initilize the private varibales of maps.
     */
    Maps.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-maps').length;
            this.element.id = 'maps_control_' + collection;
        }
        this.renderer = new SvgRenderer(this.element.id);
        this.mapLayerPanel = new LayerPanel(this);
    };
    Maps.prototype.findBaseAndSubLayers = function () {
        var _this = this;
        var baseIndex = this.baseLayerIndex;
        var mainLayers = [];
        var subLayers = [];
        this.layersCollection = [];
        this.layers.forEach(function (layer) {
            (layer.type === 'Layer') ? mainLayers.push(layer) : subLayers.push(layer);
        });
        for (var i = 0; i < mainLayers.length; i++) {
            var baseLayer = mainLayers[i];
            if (baseLayer.visible && baseIndex === i) {
                baseLayer.isBaseLayer = true;
                this.isTileMap = (baseLayer.layerType === 'Geometry') ? false : true;
                this.layersCollection.push(baseLayer);
                break;
            }
            else if (i === mainLayers.length - 1) {
                this.layersCollection.push(mainLayers[0]);
                break;
            }
        }
        subLayers.map(function (subLayer, subLayerIndex) {
            if (subLayer.visible) {
                _this.layersCollection.push(subLayer);
            }
        });
    };
    /**
     * @private
     * Render the map border
     */
    Maps.prototype.renderBorder = function () {
        var width = this.border.width;
        var borderElement = this.svgObject.querySelector('#' + this.element.id + '_MapBorder');
        if ((width > 0 || (this.background || this.themeStyle.backgroundColor)) && isNullOrUndefined(borderElement)) {
            var borderRect = new RectOption(this.element.id + '_MapBorder', this.background || this.themeStyle.backgroundColor, this.border, 1, new Rect(width / 2, width / 2, this.availableSize.width - width, this.availableSize.height - width));
            this.svgObject.appendChild(this.renderer.drawRectangle(borderRect));
        }
        else {
            borderElement.setAttribute('fill', this.background || this.themeStyle.backgroundColor);
        }
    };
    /**
     * @private
     * Render the title and subtitle
     */
    Maps.prototype.renderTitle = function (title, type, bounds, groupEle) {
        var style = title.textStyle;
        var height;
        var width = Math.abs((this.margin.left + this.margin.right) - this.availableSize.width);
        style.fontFamily = this.themeStyle.fontFamily || style.fontFamily;
        style.size = this.themeStyle.titleFontSize || style.size;
        if (title.text) {
            if (isNullOrUndefined(groupEle)) {
                groupEle = this.renderer.createGroup({ id: this.element.id + '_Title_Group' });
            }
            var trimmedTitle = textTrim(width, title.text, style);
            var elementSize = measureText(trimmedTitle, style);
            var rect = (isNullOrUndefined(bounds)) ? new Rect(this.margin.left, this.margin.top, this.availableSize.width, this.availableSize.height) : bounds;
            var location_1 = findPosition(rect, title.alignment, elementSize, type);
            var options = new TextOption(this.element.id + '_Map_' + type, location_1.x, location_1.y, 'start', trimmedTitle);
            var titleBounds = new Rect(location_1.x, location_1.y, elementSize.width, elementSize.height);
            var element = renderTextElement(options, style, style.color || (type === 'title' ? this.themeStyle.titleFontColor : this.themeStyle.subTitleFontColor), groupEle);
            element.setAttribute('aria-label', this.description || title.text);
            element.setAttribute('tabindex', (this.tabIndex + (type === 'title' ? 1 : 2)).toString());
            if ((type === 'title' && !title.subtitleSettings.text) || (type === 'subtitle')) {
                height = Math.abs((titleBounds.y + this.margin.bottom) - this.availableSize.height);
                this.mapAreaRect = new Rect(this.margin.left, titleBounds.y + 10, width, height - 10);
            }
            if (type !== 'subtitle' && title.subtitleSettings.text) {
                this.renderTitle(title.subtitleSettings, 'subtitle', titleBounds, groupEle);
            }
            else {
                this.svgObject.appendChild(groupEle);
            }
        }
        else {
            height = Math.abs((this.margin.top + this.margin.bottom) - this.availableSize.height);
            this.mapAreaRect = new Rect(this.margin.left, this.margin.top, width, height);
        }
    };
    /**
     * To create svg element for maps
     */
    Maps.prototype.createSVG = function () {
        resetBlazorTemplate(this.element.id + '_MarkerTemplate', 'MarkerTemplate');
        this.removeSvg();
        createSvg(this);
    };
    /**
     * To Remove the SVG
     */
    Maps.prototype.removeSvg = function () {
        for (var i = 0; i < this.annotations.length; i++) {
            resetBlazorTemplate(this.element.id + '_ContentTemplate_' + i, 'ContentTemplate');
        }
        removeElement(this.element.id + '_Secondary_Element');
        removeElement(this.element.id + '_tile_parent');
        if (document.getElementsByClassName('e-tooltip-wrap')[0]) {
            remove(document.getElementsByClassName('e-tooltip-wrap')[0]);
        }
        if (this.svgObject) {
            while (this.svgObject.childNodes.length > 0) {
                this.svgObject.removeChild(this.svgObject.firstChild);
            }
            if (!this.svgObject.hasChildNodes() && this.svgObject.parentNode) {
                remove(this.svgObject);
            }
        }
    };
    /**
     * To bind event handlers for maps.
     */
    Maps.prototype.wireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.element, 'click', this.mapsOnClick, this);
        // EventHandler.add(this.element, 'contextmenu', this.mapsOnRightClick, this);
        EventHandler.add(this.element, 'dblclick', this.mapsOnDoubleClick, this);
        EventHandler.add(this.element, Browser.touchStartEvent, this.mouseDownOnMap, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.mouseEndOnMap, this);
        EventHandler.add(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap, this);
        //  EventHandler.add(this.element, cancelEvent, this.mouseLeaveOnMap, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.mapsOnResize.bind(this));
    };
    /**
     * To unbind event handlers from maps.
     */
    Maps.prototype.unWireEVents = function () {
        //let cancelEvent: string = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        EventHandler.remove(this.element, 'click', this.mapsOnClick);
        // EventHandler.remove(this.element, 'contextmenu', this.mapsOnRightClick);
        EventHandler.remove(this.element, 'dblclick', this.mapsOnDoubleClick);
        EventHandler.remove(this.element, Browser.touchStartEvent, this.mouseDownOnMap);
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.mouseMoveOnMap);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.mouseEndOnMap);
        EventHandler.remove(this.element, 'pointerleave mouseleave', this.mouseLeaveOnMap);
        //EventHandler.remove(this.element, cancelEvent, this.mouseLeaveOnMap);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.mapsOnResize);
    };
    Maps.prototype.mouseLeaveOnMap = function (e) {
        if (document.getElementsByClassName('highlightMapStyle').length > 0 && this.legendModule) {
            this.legendModule.removeShapeHighlightCollection();
            removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
        }
    };
    /**
     * To handle the click event for the maps.

     */
    /* tslint:disable:no-string-literal */
    Maps.prototype.mapsOnClick = function (e) {
        var _this = this;
        var targetEle = e.target;
        var targetId = targetEle.id;
        var layerIndex = 0;
        var latLongValue;
        var latitude = null;
        var longitude = null;
        this.mouseClickEvent = { x: e.x, y: e.y };
        if (targetEle.id.indexOf('_ToolBar') === -1) {
            if (targetEle.id.indexOf('_LayerIndex_') !== -1 && !this.isTileMap && (this.mouseDownEvent['x'] === this.mouseClickEvent['x'])
                && (this.mouseDownEvent['y'] === this.mouseClickEvent['y'])) {
                layerIndex = parseFloat(targetEle.id.split('_LayerIndex_')[1].split('_')[0]);
                latLongValue = this.getGeoLocation(layerIndex, e);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            else if (this.isTileMap && (this.mouseDownEvent['x'] === this.mouseClickEvent['x'])
                && (this.mouseDownEvent['y'] === this.mouseClickEvent['y'])) {
                latLongValue = this.getTileGeoLocation(e);
                latitude = latLongValue['latitude'];
                longitude = latLongValue['longitude'];
            }
            var eventArgs_1 = {
                cancel: false, name: click, target: targetId, x: e.clientX, y: e.clientY,
                latitude: latitude, longitude: longitude
            };
            this.trigger('click', eventArgs_1, function (mouseArgs) {
                if (targetEle.id.indexOf('shapeIndex') !== -1) {
                    var layerIndex_1 = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
                    triggerShapeEvent(targetId, _this.layers[layerIndex_1].selectionSettings, _this, shapeSelected);
                }
                if (targetEle.id.indexOf('shapeIndex') > -1 || targetEle.id.indexOf('Tile') > -1) {
                    if (_this.markerModule && _this.markerModule.sameMarkerData.length > 0 &&
                        (_this.zoomModule ? _this.zoomModule.flag : true)) {
                        mergeSeparateCluster(_this.markerModule.sameMarkerData, _this, getElement(_this.element.id + '_Markers_Group'));
                        _this.markerModule.sameMarkerData = [];
                    }
                }
                if (_this.markerModule) {
                    _this.markerModule.markerClick(e);
                    _this.markerModule.markerClusterClick(e);
                }
                if (_this.bubbleModule) {
                    _this.bubbleModule.bubbleClick(e);
                }
                if (!eventArgs_1.cancel) {
                    _this.notify(click, targetEle);
                }
            });
        }
    };
    /**
     *
     */
    Maps.prototype.mouseEndOnMap = function (e) {
        var targetEle = e.target;
        var targetId = targetEle.id;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        if (e.type.indexOf('touch') !== -1) {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].pageX;
            pageY = touchArg.changedTouches[0].pageY;
            target = touchArg.target;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.pageX;
            pageY = e.pageY;
            target = e.target;
        }
        if (this.isTouch) {
            this.titleTooltip(e, pageX, pageY, true);
        }
        this.notify(Browser.touchEndEvent, e);
        e.preventDefault();
        return false;
    };
    /**
     *
     */
    Maps.prototype.mouseDownOnMap = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        this.mouseDownEvent = { x: e.x, y: e.y };
        var rect = this.element.getBoundingClientRect();
        var element = e.target;
        this.notify(Browser.touchStartEvent, e);
    };
    /**
     * To handle the double click event for the maps.

     */
    Maps.prototype.mapsOnDoubleClick = function (e) {
        this.notify('dblclick', e);
    };
    /**
     *
     */
    /* tslint:disable:no-string-literal */
    Maps.prototype.mouseMoveOnMap = function (e) {
        var pageX;
        var pageY;
        var touchArg;
        var target;
        var touches = null;
        target = (e.type === 'touchmove') ? e.target :
            target = e.target;
        // if (target.id.indexOf('shapeIndex') !== -1 && !this.highlightSettings.enable) {
        //     triggerShapeEvent(target.id, this.highlightSettings, this, shapeHighlight);
        // }
        if (this.markerModule) {
            this.markerModule.markerMove(e);
            this.markerModule.markerClusterMouseMove(e);
        }
        if (this.bubbleModule) {
            this.bubbleModule.bubbleMove(e);
        }
        this.onMouseMove(e);
        this.notify(Browser.touchMoveEvent, e);
    };
    Maps.prototype.onMouseMove = function (e) {
        var element = e.target;
        var pageX;
        var pageY;
        var target;
        var touchArg;
        if (!this.isTouch) {
            this.titleTooltip(e, e.pageX, e.pageY);
        }
        return false;
    };
    Maps.prototype.titleTooltip = function (event, x, y, isTouch) {
        var targetId = event.target.id;
        if ((targetId === (this.element.id + '_Map_title')) && (event.target.textContent.indexOf('...') > -1)) {
            showTooltip(this.titleSettings.text, this.titleSettings.textStyle.size, x, y, this.element.offsetWidth, this.element.offsetHeight, this.element.id + '_EJ2_Title_Tooltip', getElement(this.element.id + '_Secondary_Element'), isTouch);
        }
        else {
            removeElement(this.element.id + '_EJ2_Title_Tooltip');
        }
    };
    /*

    /**
     * To handle the window resize event on maps.
     */
    Maps.prototype.mapsOnResize = function (e) {
        var _this = this;
        var args = {
            name: resize,
            previousSize: this.availableSize,
            currentSize: new Size(0, 0),
            maps: !this.isBlazor ? this : null
        };
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        if (this.element.classList.contains('e-maps')) {
            this.resizeTo = setTimeout(function () {
                _this.unWireEVents();
                _this.createSVG();
                _this.refreshing = true;
                _this.wireEVents();
                args.currentSize = _this.availableSize;
                _this.trigger(resize, args);
                _this.render();
            }, 500);
        }
        return false;
    };
    /**
     * To zoom the map by specifies the center position
     * @param centerPosition
     * @param zoomFactor
     */
    Maps.prototype.zoomByPosition = function (centerPosition, zoomFactor) {
        var factor = this.mapLayerPanel.calculateFactor(this.layersCollection[0]);
        var position;
        var size = this.mapAreaRect;
        if (!this.isTileMap && this.zoomModule) {
            if (!isNullOrUndefined(centerPosition)) {
                position = convertGeoToPoint(centerPosition.latitude, centerPosition.longitude, factor, this.layersCollection[0], this);
                var mapRect = document.getElementById(this.element.id + '_Layer_Collections').getBoundingClientRect();
                var svgRect = this.svgObject.getBoundingClientRect();
                var xDiff = Math.abs(mapRect.left - svgRect.left) / this.scale;
                var yDiff = Math.abs(mapRect.top - svgRect.top) / this.scale;
                var x = this.translatePoint.x + xDiff;
                var y = this.translatePoint.y + yDiff;
                this.scale = zoomFactor;
                this.translatePoint.x = ((mapRect.left < svgRect.left ? x : 0) + (size.width / 2) - (position.x * zoomFactor)) / zoomFactor;
                this.translatePoint.y = ((mapRect.top < svgRect.top ? y : 0) + (size.height / 2) - (position.y * zoomFactor)) / zoomFactor;
                this.zoomModule.applyTransform();
            }
            else {
                position = { x: size.width / 2, y: size.height / 2 };
                this.zoomModule.performZooming(position, zoomFactor, zoomFactor > this.scale ? 'ZoomIn' : 'ZoomOut');
            }
        }
        else if (this.zoomModule) {
            this.tileZoomLevel = zoomFactor;
            this.tileTranslatePoint = this.mapLayerPanel['panTileMap'](this.availableSize.width, this.availableSize.height, { x: centerPosition.longitude, y: centerPosition.latitude });
            this.mapLayerPanel.generateTiles(zoomFactor, this.tileTranslatePoint, new BingMap(this));
        }
    };
    /**
     * To pan the map by specifies the direction
     * @param direction
     */
    Maps.prototype.panByDirection = function (direction) {
        var xDiff = 0;
        var yDiff = 0;
        switch (direction) {
            case 'Left':
                xDiff = -(this.mapAreaRect.width / 7);
                break;
            case 'Right':
                xDiff = (this.mapAreaRect.width / 7);
                break;
            case 'Top':
                yDiff = -(this.mapAreaRect.height / 7);
                break;
            case 'Bottom':
                yDiff = (this.mapAreaRect.height / 7);
                break;
        }
        if (this.zoomModule) {
            this.zoomModule.panning(direction, xDiff, yDiff);
        }
    };
    /**
     * To add layer
     * @param layer
     */
    Maps.prototype.addLayer = function (layer) {
        this.layers.push(new LayerSettings(this.layers[0], 'layers', layer));
        this.refresh();
    };
    /**
     * To remove layer
     * @param index
     */
    Maps.prototype.removeLayer = function (index) {
        this.layers.splice(index, 1);
        this.refresh();
    };
    /**
     * To add marker
     * @param layerIndex
     * @param marker
     */
    Maps.prototype.addMarker = function (layerIndex, markerCollection) {
        var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + layerIndex);
        if (markerCollection.length > 0 && layerEle) {
            for (var _i = 0, markerCollection_1 = markerCollection; _i < markerCollection_1.length; _i++) {
                var newMarker = markerCollection_1[_i];
                this.layersCollection[layerIndex].markerSettings.push(new MarkerSettings(this, 'markerSettings', newMarker));
            }
            var markerModule = new Marker(this);
            markerModule.markerRender(layerEle, layerIndex, this.mapLayerPanel['currentFactor'], 'AddMarker');
            this.arrangeTemplate();
        }
    };
    /**
     * Method to set culture for maps
     */
    Maps.prototype.setCulture = function () {
        this.intl = new Internationalization();
        this.setLocaleConstants();
        this.localeObject = new L10n(this.getModuleName(), this.defaultLocalConstants, this.locale);
    };
    /**
     * Method to set locale constants
     */
    Maps.prototype.setLocaleConstants = function () {
        // Need to modify after the api confirm
        this.defaultLocalConstants = {
            ZoomIn: 'Zoom In',
            Zoom: 'Zoom',
            ZoomOut: 'Zoom Out',
            Pan: 'Pan',
            Reset: 'Reset',
        };
    };
    /**
     * To destroy maps control.
     */
    Maps.prototype.destroy = function () {
        this.unWireEVents();
        _super.prototype.destroy.call(this);
    };
    /**
     * Get component name
     */
    Maps.prototype.getModuleName = function () {
        return 'maps';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    Maps.prototype.getPersistData = function () {
        return '';
    };
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    Maps.prototype.onPropertyChanged = function (newProp, oldProp) {
        var render = false;
        var newLayerLength = Object.keys(newProp).length;
        var layerEle = document.getElementById(this.element.id + '_LayerIndex_' + (newLayerLength - 1));
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'background':
                    this.renderBorder();
                    break;
                case 'height':
                case 'width':
                case 'layers':
                case 'projectionType':
                case 'legendSettings':
                case 'zoomSettings':
                    render = true;
                    break;
            }
        }
        if (render) {
            if (newProp.layers && newProp.layers[newLayerLength - 1].markerSettings) {
                removeElement(this.element.id + '_Markers_Group');
                this.markerModule.markerRender(layerEle, (newLayerLength - 1), this.mapLayerPanel['currentFactor'], 'AddMarker');
            }
            else {
                this.createSVG();
                this.render();
            }
        }
    };
    /**
     * To provide the array of modules needed for maps rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    Maps.prototype.requiredModules = function () {
        var modules = [];
        var isVisible = this.findVisibleLayers(this.layers);
        var annotationEnable = false;
        this.annotations.map(function (annotation, index) {
            annotationEnable = annotation.content != null;
        });
        if (this.isBubbleVisible()) {
            modules.push({
                member: 'Bubble',
                args: [this]
            });
        }
        if (isVisible.highlight) {
            modules.push({
                member: 'Highlight',
                args: [this]
            });
        }
        if (isVisible.selection) {
            modules.push({
                member: 'Selection',
                args: [this]
            });
        }
        if (this.legendSettings.visible) {
            modules.push({
                member: 'Legend',
                args: [this]
            });
        }
        if (this.zoomSettings.enable || this.zoomSettings.zoomFactor > this.zoomSettings.minZoom) {
            modules.push({
                member: 'Zoom',
                args: [this]
            });
        }
        if (this.isMarkersVisible()) {
            modules.push({
                member: 'Marker',
                args: [this]
            });
        }
        if (this.isDataLabelVisible()) {
            modules.push({
                member: 'DataLabel',
                args: [this]
            });
        }
        if (this.isNavigationVisible()) {
            modules.push({
                member: 'NavigationLine',
                args: [this]
            });
        }
        if (isVisible.tooltip) {
            modules.push({
                member: 'MapsTooltip',
                args: [this]
            });
        }
        if (annotationEnable) {
            modules.push({
                member: 'Annotations',
                args: [this, Annotations]
            });
        }
        return modules;
    };
    /**
     * To find marker visibility
     */
    Maps.prototype.isMarkersVisible = function () {
        var isVisible = false;
        this.layers.forEach(function (layer, layerIndex) {
            for (var i = 0; i < layer.markerSettings.length; i++) {
                if (layer.markerSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find DataLabel visibility
     */
    Maps.prototype.isDataLabelVisible = function () {
        var isVisible = false;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].dataLabelSettings.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find navigation line visibility
     */
    Maps.prototype.isNavigationVisible = function () {
        var isVisible = false;
        this.layers.forEach(function (layer, layerIndex) {
            for (var i = 0; i < layer.navigationLineSettings.length; i++) {
                if (layer.navigationLineSettings[i].visible) {
                    isVisible = true;
                    break;
                }
            }
        });
        return isVisible;
    };
    /**
     * To find marker visibility
     */
    Maps.prototype.isBubbleVisible = function () {
        var isVisible = false;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (this.getBubbleVisible(layer)) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * To find the bubble visibility from layer
     * @private
     */
    Maps.prototype.getBubbleVisible = function (layer) {
        var isVisible = false;
        for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
            var bubble = _a[_i];
            if (bubble.visible) {
                isVisible = true;
                break;
            }
        }
        return isVisible;
    };
    /**
     * Handles the print method for chart control.
     */
    Maps.prototype.print = function (id) {
        var exportChart = new ExportUtils(this);
        exportChart.print(id);
    };
    /**
     * Handles the export method for chart control.
     * @param type
     * @param fileName
     */
    Maps.prototype.export = function (type, fileName, orientation) {
        var exportMap = new ExportUtils(this);
        exportMap.export(type, fileName, orientation);
    };
    /**
     * To find visibility of layers and markers for required modules load.
     */
    Maps.prototype.findVisibleLayers = function (layers, isLayerVisible, isBubblevisible, istooltipVisible, isSelection, isHighlight) {
        if (isLayerVisible === void 0) { isLayerVisible = false; }
        if (isBubblevisible === void 0) { isBubblevisible = false; }
        if (istooltipVisible === void 0) { istooltipVisible = false; }
        if (isSelection === void 0) { isSelection = false; }
        if (isHighlight === void 0) { isHighlight = false; }
        var bubbles;
        var markers;
        var navigationLine;
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var layer = layers_1[_i];
            isLayerVisible = layer.visible || isLayerVisible;
            if (layer.visible) {
                bubbles = layer.bubbleSettings;
                markers = layer.markerSettings;
                navigationLine = layer.navigationLineSettings;
                for (var _a = 0, navigationLine_1 = navigationLine; _a < navigationLine_1.length; _a++) {
                    var navigation = navigationLine_1[_a];
                    if (navigation.visible) {
                        isSelection = navigation.highlightSettings.enable || isSelection;
                        isHighlight = navigation.selectionSettings.enable || isHighlight;
                    }
                }
                for (var _b = 0, markers_1 = markers; _b < markers_1.length; _b++) {
                    var marker = markers_1[_b];
                    if (marker.visible) {
                        istooltipVisible = marker.tooltipSettings.visible || istooltipVisible;
                        isSelection = marker.selectionSettings.enable || isSelection;
                        isHighlight = marker.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                for (var _c = 0, bubbles_1 = bubbles; _c < bubbles_1.length; _c++) {
                    var bubble = bubbles_1[_c];
                    if (bubble.visible) {
                        istooltipVisible = bubble.tooltipSettings.visible || istooltipVisible;
                        isSelection = bubble.selectionSettings.enable || isSelection;
                        isHighlight = bubble.highlightSettings.enable || isHighlight;
                    }
                    if (istooltipVisible) {
                        break;
                    }
                }
                istooltipVisible = layer.tooltipSettings.visible || istooltipVisible;
                isSelection = layer.selectionSettings.enable || isSelection;
                isHighlight = layer.highlightSettings.enable || isHighlight;
            }
            if (isLayerVisible && isBubblevisible && istooltipVisible) {
                break;
            }
        }
        return {
            layer: isLayerVisible, bubble: isBubblevisible, tooltip: istooltipVisible,
            selection: isSelection, highlight: isHighlight
        };
    };
    /**
     * To get the geo location
     * @param {number} layerIndex
     * @param {PointerEvent} location
     * @return GeoPosition
     */
    Maps.prototype.getGeoLocation = function (layerIndex, location) {
        var container = document.getElementById(this.element.id);
        var pageX = location.layerX - container.offsetLeft;
        var pageY = location.layerY - container.offsetTop;
        var currentLayer = this.layersCollection[layerIndex];
        var translate = getTranslate(this, currentLayer, false);
        var translatePoint = translate['location'];
        var translatePointX = translatePoint.x * this.scale;
        var translatePointY = translatePoint.y * this.scale;
        var mapSize = (Math.min(this.mapAreaRect.height, this.mapAreaRect.width)
            * this.mapLayerPanel['currentFactor']) * this.scale;
        var xx = (this.clip(pageX - translatePointX, 0, mapSize - 1) / mapSize) - 0.5;
        var yy = 0.5 - (this.clip(pageY - translatePointY, 0, mapSize - 1) / mapSize);
        var lat = 90 - 360 * Math.atan(Math.exp(-yy * 2 * Math.PI)) / Math.PI;
        var long = 360 * xx;
        return { latitude: lat, longitude: long };
    };
    Maps.prototype.clip = function (value, minVal, maxVal) {
        return Math.min(Math.max(value, minVal), maxVal);
    };
    /**
     * To get the geo location
     * @param {PointerEvent}
     * @return GeoPosition
     */
    Maps.prototype.getTileGeoLocation = function (location) {
        var container = document.getElementById(this.element.id);
        var latLong;
        var ele = document.getElementById(this.element.id + '_tile_parent');
        var lastTile = this.mapLayerPanel.tiles[this.mapLayerPanel.tiles.length - 1];
        var tile0 = this.mapLayerPanel.tiles[0];
        latLong = this.pointToLatLong(location.layerX - (ele.offsetLeft - container.offsetLeft), location.layerY - (ele.offsetTop - container.offsetTop));
        return { latitude: latLong['latitude'], longitude: latLong['longitude'] };
    };
    Maps.prototype.pointToLatLong = function (pageX, pageY) {
        pageY = (this.zoomSettings.enable) ? pageY + 10 : pageY;
        var mapSize = 256 * Math.pow(2, this.tileZoomLevel);
        var x1 = (this.clip(pageX - (this.translatePoint.x * this.scale), 0, mapSize - 1) / mapSize) - 0.5;
        var y1 = 0.5 - (this.clip(pageY - (this.translatePoint.y * this.scale), 0, mapSize - 1) / mapSize);
        var lat = 90 - 360 * Math.atan(Math.exp(-y1 * 2 * Math.PI)) / Math.PI;
        var long = 360 * x1;
        return { latitude: lat, longitude: long };
    };
    __decorate([
        Property(null)
    ], Maps.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], Maps.prototype, "useGroupingSeparator", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "height", void 0);
    __decorate([
        Property('MouseMove')
    ], Maps.prototype, "tooltipDisplayMode", void 0);
    __decorate([
        Complex({}, TitleSettings)
    ], Maps.prototype, "titleSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], Maps.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, LegendSettings)
    ], Maps.prototype, "legendSettings", void 0);
    __decorate([
        Collection([], LayerSettings)
    ], Maps.prototype, "layers", void 0);
    __decorate([
        Collection([], Annotation)
    ], Maps.prototype, "annotations", void 0);
    __decorate([
        Complex({}, Margin)
    ], Maps.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 0 }, Border)
    ], Maps.prototype, "border", void 0);
    __decorate([
        Property('Material')
    ], Maps.prototype, "theme", void 0);
    __decorate([
        Property('Mercator')
    ], Maps.prototype, "projectionType", void 0);
    __decorate([
        Property(0)
    ], Maps.prototype, "baseLayerIndex", void 0);
    __decorate([
        Property(null)
    ], Maps.prototype, "description", void 0);
    __decorate([
        Property(1)
    ], Maps.prototype, "tabIndex", void 0);
    __decorate([
        Complex({ latitude: null, longitude: null }, CenterPosition)
    ], Maps.prototype, "centerPosition", void 0);
    __decorate([
        Complex({}, MapsAreaSettings)
    ], Maps.prototype, "mapsArea", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "load", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "click", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "doubleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "rightClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "resize", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "tooltipRenderComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeSelected", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemSelection", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "itemHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeHighlight", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "layerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "shapeRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerClusterMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "markerMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "dataLabelRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleClick", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "bubbleMouseMove", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "animationComplete", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "annotationRendering", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "zoom", void 0);
    __decorate([
        Event()
    ], Maps.prototype, "pan", void 0);
    Maps = __decorate([
        NotifyPropertyChanges
    ], Maps);
    return Maps;
}(Component));
export { Maps };
