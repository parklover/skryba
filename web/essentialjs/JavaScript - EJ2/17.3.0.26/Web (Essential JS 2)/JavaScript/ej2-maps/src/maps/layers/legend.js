import { click, legendRendering } from '../index';
import { Rect, measureText, PathOption, textTrim, removeClass, querySelector, getTemplateFunction } from '../utils/helper';
import { RectOption, Size, TextOption, Point, renderTextElement, drawSymbol, checkPropertyPath } from '../utils/helper';
import { isNullOrUndefined, Browser, EventHandler, remove, extend } from '@syncfusion/ej2-base';
/**
 * Legend module is used to render legend for the maps
 */
var Legend = /** @class */ (function () {
    function Legend(maps) {
        this.legendBorderRect = new Rect(0, 0, 0, 0);
        this.totalPages = [];
        this.page = 0;
        this.currentPage = 0;
        this.legendItemRect = new Rect(0, 0, 0, 0);
        this.heightIncrement = 0;
        this.widthIncrement = 0;
        this.textMaxWidth = 0;
        this.shapeHighlightCollection = [];
        this.shapeSelectionCollection = [];
        this.legendHighlightCollection = [];
        this.legendSelectionCollection = [];
        this.legendElement = null;
        this.shapeElement = null;
        this.shapeSelection = true;
        this.legendSelection = true;
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * To calculate legend bounds and draw the legend shape and text.
     */
    Legend.prototype.renderLegend = function () {
        this.legendRenderingCollections = [];
        this.legendCollection = [];
        this.totalPages = [];
        this.widthIncrement = 0;
        this.heightIncrement = 0;
        this.defsElement = this.maps.renderer.createDefs();
        this.maps.svgObject.appendChild(this.defsElement);
        this.calculateLegendBounds();
        this.drawLegend();
    };
    /* tslint:disable-next-line:max-func-body-length */
    Legend.prototype.calculateLegendBounds = function () {
        var _this = this;
        var map = this.maps;
        var legend = map.legendSettings;
        this.legendCollection = [];
        var spacing = 10;
        var leftPadding = 10;
        var topPadding = map.mapAreaRect.y;
        this.legendRenderingCollections = [];
        map.layersCollection.forEach(function (layer, layerIndex) {
            if (!isNullOrUndefined(layer.shapeData)) {
                var layerData = layer.shapeData['features'];
                var dataPath = layer.shapeDataPath;
                var propertyPath = layer.shapePropertyPath;
                var dataSource = layer.dataSource;
                var colorValuePath = void 0;
                var colorMapping = void 0;
                if (legend.type === 'Layers' && layer.visible) {
                    colorValuePath = layer.shapeSettings.colorValuePath;
                    colorMapping = layer.shapeSettings.colorMapping;
                    _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                }
                else if (legend.type === 'Bubbles') {
                    for (var _i = 0, _a = layer.bubbleSettings; _i < _a.length; _i++) {
                        var bubble = _a[_i];
                        if (bubble.visible) {
                            colorValuePath = bubble.colorValuePath;
                            colorMapping = bubble.colorMapping;
                            dataSource = bubble.dataSource;
                            _this.getLegends(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
                        }
                    }
                }
                else {
                    _this.getMarkersLegendCollections(layerIndex, layer.markerSettings);
                }
            }
        });
        var defaultSize = 25;
        var legendTitle = map.legendSettings.title.text;
        var titleTextStyle = map.legendSettings.titleStyle;
        if (this.legendCollection.length > 0) {
            var legendMode = legend.mode;
            var shapeX = 0;
            var shapeY = 0;
            var textX = 0;
            var textY = 0;
            var shapePadding = legend.shapePadding;
            var textPadding = 10;
            var shapeHeight = legend.shapeHeight;
            var shapeWidth = legend.shapeWidth;
            var shapeLocation = [];
            var textLocation = [];
            var legendRectCollection = [];
            var location_1;
            var position = legend.position;
            var labelAction = legend.labelDisplayMode;
            var arrangement = (legend.orientation === 'None') ? ((position === 'Top' || position === 'Bottom')
                ? 'Horizontal' : 'Vertical') : legend.orientation;
            var legendWidth = (legend.width.length > 1) ? (legend.width.indexOf('%') > -1) ? (map.availableSize.width / 100)
                * parseInt(legend.width, 10) : parseInt(legend.width, 10) : null;
            var legendHeight = (legend.height.length > 1) ? (legend.height.indexOf('%') > -1) ? (map.availableSize.height / 100) *
                parseInt(legend.height, 10) : parseInt(legend.height, 10) : null;
            var legendItemStartX_1;
            var legendItemStartY_1;
            var startX = 0;
            var startY = 0;
            var legendtitleSize = measureText(legendTitle, titleTextStyle);
            if (legendMode === 'Interactive') {
                var itemTextStyle = legend.textStyle;
                var rectWidth = void 0;
                var rectHeight = void 0;
                var legendLength = this.legendCollection.length;
                rectWidth = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendWidth)) ? (map.mapAreaRect.width / legendLength) :
                    (legendWidth / legendLength) : (isNullOrUndefined(legendWidth)) ? defaultSize : legendWidth;
                rectHeight = (arrangement === 'Horizontal') ? (isNullOrUndefined(legendHeight)) ? defaultSize : legendHeight :
                    (isNullOrUndefined(legendHeight)) ? (map.mapAreaRect.height / legendLength) : (legendHeight / legendLength);
                startX = 0;
                startY = legendtitleSize.height + spacing;
                var position_1 = legend.labelPosition;
                var textX_1 = 0;
                var textY_1 = 0;
                var textPadding_1 = 10;
                var itemStartX = 0;
                var itemStartY = 0;
                var maxTextHeight = 0;
                var maxTextWidth = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    startX = (arrangement === 'Horizontal') ? (startX + rectWidth) : startX;
                    startY = (arrangement === 'Horizontal') ? startY : (startY + rectHeight);
                    var legendText = this.legendCollection[i]['text'];
                    var itemTextSize = new Size(0, 0);
                    if (labelAction === 'None') {
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else if (labelAction === 'Trim') {
                        legendText = textTrim((arrangement === 'Horizontal' ? rectWidth : rectHeight), legendText, itemTextStyle);
                        itemTextSize = measureText(legendText, itemTextStyle);
                    }
                    else {
                        legendText = '';
                    }
                    maxTextHeight = Math.max(maxTextHeight, itemTextSize.height);
                    maxTextWidth = Math.max(maxTextWidth, itemTextSize.width);
                    if (itemTextSize.width > 0 && itemTextSize.height > 0) {
                        if (arrangement === 'Horizontal') {
                            textX_1 = startX + (rectWidth / 2);
                            textY_1 = (position_1 === 'After') ? (startY + rectHeight + (itemTextSize.height / 2)) + textPadding_1 :
                                (startY - textPadding_1);
                        }
                        else {
                            textX_1 = (position_1 === 'After') ? startX - (itemTextSize.width / 2) - textPadding_1
                                : (startX + rectWidth + itemTextSize.width / 2) + textPadding_1;
                            textY_1 = startY + (rectHeight / 2) + (itemTextSize.height / 4);
                        }
                    }
                    if (i === 0) {
                        itemStartX = (arrangement === 'Horizontal') ? startX : (position_1 === 'After') ?
                            textX_1 - (itemTextSize.width / 2) : startX;
                        itemStartY = (arrangement === 'Horizontal') ? (position_1 === 'After') ? startY :
                            textY_1 - (itemTextSize.height / 2) : startY;
                    }
                    else if (i === this.legendCollection.length - 1) {
                        legendWidth = (arrangement === 'Horizontal') ? Math.abs((startX + rectWidth) - itemStartX) :
                            (rectWidth + maxTextWidth + textPadding_1);
                        legendHeight = (arrangement === 'Horizontal') ? (rectHeight + (maxTextHeight / 2) + textPadding_1) :
                            Math.abs((startY + rectHeight) - itemStartY);
                    }
                    this.legendRenderingCollections.push({
                        fill: this.legendCollection[i]['fill'], x: startX, y: startY,
                        width: rectWidth, height: rectHeight,
                        text: legendText, textX: textX_1, textY: textY_1,
                        textWidth: itemTextSize.width, textHeight: itemTextSize.height
                    });
                }
                if (this.legendCollection.length === 1) {
                    legendHeight = rectHeight;
                    legendWidth = rectWidth;
                }
                this.legendItemRect = { x: itemStartX, y: itemStartY, width: legendWidth, height: legendHeight };
            }
            else {
                legendWidth = (isNullOrUndefined(legendWidth)) ? map.mapAreaRect.width : legendWidth;
                legendHeight = (isNullOrUndefined(legendHeight)) ? map.mapAreaRect.height : legendHeight;
                var j = 0;
                this.page = 0;
                for (var i = 0; i < this.legendCollection.length; i++) {
                    var legendItem = this.legendCollection[i];
                    if (isNullOrUndefined(this.totalPages[this.page])) {
                        this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
                    }
                    var legendTextSize = measureText(legendItem['text'], legend.textStyle);
                    this.textMaxWidth = Math.max(this.textMaxWidth, legendTextSize.width);
                    if (i === 0) {
                        startX = shapeX = (leftPadding + (shapeWidth / 2));
                        startY = shapeY = topPadding + legendtitleSize.height + (shapeHeight > legendTextSize.height ? shapeHeight / 2
                            : (legendTextSize.height / 4));
                    }
                    else {
                        var maxSize = (legendTextSize.height > shapeHeight) ? legendTextSize.height : shapeHeight;
                        if (arrangement === 'Horizontal') {
                            var prvePositionX = (textLocation[j - 1].x + textLocation[j - 1].width) + textPadding + shapeWidth;
                            if ((prvePositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                var nextPositionY = (textLocation[j - 1].y > (shapeLocation[j - 1].y + (shapeHeight / 2)) ?
                                    textLocation[j - 1].y : (shapeLocation[j - 1].y + (shapeHeight / 2))) + topPadding;
                                if ((nextPositionY + maxSize) > legendHeight) {
                                    this.getPageChanged();
                                    j = 0;
                                    shapeLocation = [];
                                    textLocation = [];
                                    legendRectCollection = [];
                                    shapeX = startX;
                                    shapeY = startY;
                                }
                                else {
                                    shapeX = (shapeLocation[0].x);
                                    shapeY = (nextPositionY + (maxSize / 2));
                                }
                            }
                            else {
                                shapeX = (prvePositionX - (shapeWidth / 2));
                                shapeY = (shapeLocation[j - 1]).y;
                            }
                        }
                        else {
                            var prevPositionY = textLocation[j - 1].y > shapeLocation[j - 1].y + (shapeHeight / 2) ?
                                textLocation[j - 1].y : shapeLocation[j - 1].y + (shapeHeight / 2);
                            if ((prevPositionY + topPadding + maxSize) > legendHeight) {
                                var nextPositionX = (textLocation[j - 1].x + this.textMaxWidth + textPadding);
                                if ((nextPositionX + shapePadding + legendTextSize.width) > legendWidth) {
                                    shapeX = startX;
                                    shapeY = startY;
                                    legendRectCollection = [];
                                    textLocation = [];
                                    shapeLocation = [];
                                    this.getPageChanged();
                                    j = 0;
                                }
                                else {
                                    shapeX = nextPositionX + (shapeWidth / 2);
                                    shapeY = (shapeLocation[0].y);
                                }
                            }
                            else {
                                shapeX = shapeLocation[j - 1].x;
                                shapeY = prevPositionY + topPadding + (shapeHeight / 2);
                            }
                        }
                    }
                    textX = shapeX + (shapeWidth / 2) + shapePadding;
                    textY = shapeY + (legendTextSize.height / 4);
                    shapeLocation.push({ x: shapeX, y: shapeY });
                    textLocation.push({ x: textX, y: textY, width: legendTextSize.width, height: (legendTextSize.height / 2) });
                    this.totalPages[this.page]['Collection'].push({
                        DisplayText: legendItem['text'],
                        ImageSrc: legendItem['imageSrc'],
                        Shape: { x: shapeX, y: shapeY },
                        Text: { x: textX, y: textY },
                        Fill: legendItem['fill'],
                        Rect: {
                            x: shapeLocation[j].x - (shapeWidth / 2),
                            y: (shapeLocation[j].y - (shapeHeight / 2)) < (textY - legendTextSize.height) ?
                                (shapeLocation[j].y - (shapeHeight / 2)) : (textY - legendTextSize.height),
                            width: Math.abs((shapeLocation[j].x - (shapeWidth / 2)) - (textX + legendTextSize.width)),
                            height: ((shapeHeight > legendTextSize.height) ? shapeHeight : legendTextSize.height)
                        }
                    });
                    j++;
                }
                var collection = this.totalPages[0]['Collection'];
                collection.forEach(function (legendObj, index) {
                    var legendRect = new Rect(legendObj['Rect']['x'], legendObj['Rect']['y'], legendObj['Rect']['width'], legendObj['Rect']['height']);
                    if (index === 0) {
                        legendItemStartX_1 = legendRect.x;
                        legendItemStartY_1 = legendRect.y;
                    }
                    _this.widthIncrement = Math.max(_this.widthIncrement, Math.abs(legendItemStartX_1 - (legendRect.x + legendRect.width)));
                    _this.heightIncrement = Math.max(_this.heightIncrement, Math.abs(legendItemStartY_1 - (legendRect.y + legendRect.height)));
                });
                legendWidth = ((this.widthIncrement < legendWidth) ? this.widthIncrement : legendWidth);
                legendHeight = ((this.heightIncrement < legendHeight) ? this.heightIncrement : legendHeight);
                this.legendItemRect = {
                    x: collection[0]['Rect']['x'], y: collection[0]['Rect']['y'],
                    width: legendWidth, height: legendHeight
                };
            }
        }
    };
    /**
     *
     */
    Legend.prototype.getLegends = function (layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        this.getRangeLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getEqualLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
        this.getDataLegendCollection(layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath);
    };
    Legend.prototype.getPageChanged = function () {
        this.page++;
        if (isNullOrUndefined(this.totalPages[this.page])) {
            this.totalPages[this.page] = { Page: (this.page + 1), Collection: [] };
        }
    };
    /**
     * To draw the legend shape and text.
     */
    Legend.prototype.drawLegend = function () {
        var _this = this;
        var map = this.maps;
        var legend = map.legendSettings;
        var render = map.renderer;
        var textOptions;
        var textFont = legend.textStyle;
        this.legendGroup = render.createGroup({ id: map.element.id + '_Legend_Group' });
        var eventArgs = {
            name: legendRendering, cancel: false, fill: '', shape: legend.shape,
            shapeBorder: legend.shapeBorder
        };
        if (legend.mode === 'Interactive') {
            var _loop_1 = function (i) {
                var itemId = map.element.id + '_Legend_Index_' + i;
                var textId = map.element.id + '_Legend_Index_' + i + '_Text';
                var item = this_1.legendRenderingCollections[i];
                var bounds = new Rect(item['x'], item['y'], item['width'], item['height']);
                var textLocation = new Point(item['textX'], item['textY']);
                eventArgs.fill = item['fill'];
                map.trigger(legendRendering, eventArgs, function () {
                    textFont.color = (textFont.color !== null) ? textFont.color : _this.maps.themeStyle.legendTextColor;
                    var rectOptions = new RectOption(itemId, eventArgs.fill, eventArgs.shapeBorder, legend.opacity, bounds);
                    textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'middle', item['text'], '', '');
                    textFont.fontFamily = map.themeStyle.fontFamily || textFont.fontFamily;
                    textFont.size = map.themeStyle.legendFontSize || textFont.size;
                    renderTextElement(textOptions, textFont, textFont.color, _this.legendGroup);
                    _this.legendGroup.appendChild(render.drawRectangle(rectOptions));
                    if (i === _this.legendRenderingCollections.length - 1) {
                        _this.renderLegendBorder();
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.legendRenderingCollections.length; i++) {
                _loop_1(i);
            }
        }
        else {
            this.drawLegendItem(this.currentPage);
        }
    };
    // tslint:disable-next-line:max-func-body-length
    Legend.prototype.drawLegendItem = function (page) {
        var _this = this;
        var map = this.maps;
        var legend = map.legendSettings;
        var spacing = 10;
        var shapeSize = new Size(legend.shapeWidth, legend.shapeHeight);
        var textOptions;
        var renderOptions;
        var render = map.renderer;
        var shapeBorder = legend.shapeBorder;
        var eventArgs = { name: legendRendering, cancel: false, fill: '', shape: legend.shape };
        if (page >= 0 && page < this.totalPages.length) {
            if (querySelector(this.legendGroup.id, this.maps.element.id)) {
                remove(querySelector(this.legendGroup.id, this.maps.element.id));
            }
            var strokeColor = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                || legend.shape === 'Cross') ? isNullOrUndefined(legend.fill) ? '#000000' : legend.fill : shapeBorder.color;
            var strokeWidth = (legend.shape === 'HorizontalLine' || legend.shape === 'VerticalLine'
                || legend.shape === 'Cross') ? (shapeBorder.width === 0) ?
                1 : shapeBorder.width : shapeBorder.width;
            eventArgs.shapeBorder = { width: strokeWidth, color: strokeColor };
            var _loop_2 = function (i) {
                var collection = this_2.totalPages[page]['Collection'][i];
                var legendElement = render.createGroup({ id: map.element.id + '_Legend_Index_' + i });
                var legendText = collection['DisplayText'];
                eventArgs.fill = collection['Fill'];
                eventArgs.shape = ((legend.type === 'Markers') ? ((isNullOrUndefined(collection['ImageSrc'])) ?
                    legend.shape : 'Image') : legend.shape);
                map.trigger(legendRendering, eventArgs, function () {
                    var shapeId = map.element.id + '_Legend_Shape_Index_' + i;
                    var textId = map.element.id + '_Legend_Text_Index_' + i;
                    var shapeLocation = collection['Shape'];
                    var textLocation = collection['Text'];
                    var imageUrl = ((isNullOrUndefined(collection['ImageSrc'])) ? legend.shape : collection['ImageSrc']);
                    var renderOptions = new PathOption(shapeId, eventArgs.fill, eventArgs.shapeBorder.width, eventArgs.shapeBorder.color, legend.opacity, '');
                    legend.textStyle.color = (legend.textStyle.color !== null) ? legend.textStyle.color :
                        _this.maps.themeStyle.legendTextColor;
                    legend.textStyle.fontFamily = map.themeStyle.fontFamily || legend.textStyle.fontFamily;
                    legend.textStyle.size = map.themeStyle.legendFontSize || legend.textStyle.size;
                    legendElement.appendChild(drawSymbol(shapeLocation, eventArgs.shape, shapeSize, collection['ImageSrc'], renderOptions));
                    textOptions = new TextOption(textId, textLocation.x, textLocation.y, 'start', legendText, '', '');
                    renderTextElement(textOptions, legend.textStyle, legend.textStyle.color, legendElement);
                    _this.legendGroup.appendChild(legendElement);
                    if (i === (_this.totalPages[page]['Collection'].length - 1)) {
                        var pagingGroup = void 0;
                        var width = spacing;
                        var height = (spacing / 2);
                        if (_this.page !== 0) {
                            var pagingText = (page + 1) + '/' + _this.totalPages.length;
                            var pagingFont = legend.textStyle;
                            var pagingTextSize = measureText(pagingText, pagingFont);
                            var leftPageX = (_this.legendItemRect.x + _this.legendItemRect.width) - pagingTextSize.width -
                                (width * 2) - spacing;
                            var rightPageX = (_this.legendItemRect.x + _this.legendItemRect.width);
                            var locY = (_this.legendItemRect.y + _this.legendItemRect.height) + (height / 2) + spacing;
                            var pageTextX = rightPageX - width - (pagingTextSize.width / 2) - (spacing / 2);
                            pagingGroup = render.createGroup({ id: map.element.id + '_Legend_Paging_Group' });
                            var leftPageElement = render.createGroup({ id: map.element.id + '_Legend_Left_Paging_Group' });
                            var rightPageElement = render.createGroup({ id: map.element.id + '_Legend_Right_Paging_Group' });
                            var rightPath = ' M ' + rightPageX + ' ' + locY + ' L ' + (rightPageX - width) + ' ' + (locY - height) +
                                ' L ' + (rightPageX - width) + ' ' + (locY + height) + ' z ';
                            var leftPath = ' M ' + leftPageX + ' ' + locY + ' L ' + (leftPageX + width) + ' ' + (locY - height) +
                                ' L ' + (leftPageX + width) + ' ' + (locY + height) + ' z ';
                            var leftPageOptions = new PathOption(map.element.id + '_Left_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', leftPath);
                            leftPageElement.appendChild(render.drawPath(leftPageOptions));
                            var leftRectPageOptions = new RectOption(map.element.id + '_Left_Page_Rect', 'transparent', {}, 1, new Rect(leftPageX - (width / 2), (locY - (height * 2)), width * 2, spacing * 2), null, null, '', '');
                            leftPageElement.appendChild(render.drawRectangle(leftRectPageOptions));
                            _this.wireEvents(leftPageElement);
                            var rightPageOptions = new PathOption(map.element.id + '_Right_Page', '#a6a6a6', 0, '#a6a6a6', 1, '', rightPath);
                            rightPageElement.appendChild(render.drawPath(rightPageOptions));
                            var rightRectPageOptions = new RectOption(map.element.id + '_Right_Page_Rect', 'transparent', {}, 1, new Rect((rightPageX - width), (locY - height), width, spacing), null, null, '', '');
                            rightPageElement.appendChild(render.drawRectangle(rightRectPageOptions));
                            _this.wireEvents(rightPageElement);
                            pagingGroup.appendChild(leftPageElement);
                            pagingGroup.appendChild(rightPageElement);
                            var pageTextOptions = {
                                'id': map.element.id + '_Paging_Text',
                                'x': pageTextX,
                                'y': locY + (pagingTextSize.height / 4),
                                'fill': '#a6a6a6',
                                'font-size': '14px',
                                'font-style': pagingFont.fontStyle,
                                'font-family': pagingFont.fontFamily,
                                'font-weight': pagingFont.fontWeight,
                                'text-anchor': 'middle',
                                'transform': '',
                                'opacity': 1,
                                'dominant-baseline': ''
                            };
                            pagingGroup.appendChild(render.createText(pageTextOptions, pagingText));
                            _this.legendGroup.appendChild(pagingGroup);
                        }
                        _this.renderLegendBorder();
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i < this.totalPages[page]['Collection'].length; i++) {
                _loop_2(i);
            }
        }
    };
    // tslint:disable-next-line:max-func-body-length
    Legend.prototype.legendHighLightAndSelection = function (targetElement, value) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var textEle;
        var legend = this.maps.legendSettings;
        textEle = legend.mode === 'Default' ? document.getElementById(targetElement.id.replace('Shape', 'Text')) :
            document.getElementById(targetElement.id + '_Text');
        var collection = this.maps.legendModule.legendCollection;
        var length;
        var selectLength = 0;
        var interactProcess = true;
        if (value === 'selection') {
            this.shapeHighlightCollection = [];
            if (this.legendSelectionCollection.length > 0) {
                for (var k = 0; k < this.legendSelectionCollection.length; k++) {
                    if (targetElement === this.legendSelectionCollection[k]['legendElement']) {
                        interactProcess = false;
                        this.removeLegendSelectionCollection();
                        this.legendSelectionCollection.splice(k, 1);
                        break;
                    }
                    else {
                        this.removeLegendSelectionCollection();
                        this.legendSelectionCollection.splice(k, 1);
                    }
                }
            }
        }
        else {
            if (this.legendSelectionCollection.length > 0) {
                for (var k = 0; k < this.legendSelectionCollection.length; k++) {
                    if ((targetElement.id.indexOf('_Legend_Shape') > -1 || targetElement.id.indexOf('_Legend_Index')) && targetElement ===
                        this.legendSelectionCollection[k]['legendElement']) {
                        interactProcess = false;
                        break;
                    }
                    else {
                        this.removeLegendHighlightCollection();
                    }
                }
            }
            this.removeLegendHighlightCollection();
        }
        if (interactProcess) {
            for (var i = 0; i < collection.length; i++) {
                if (textEle.textContent === collection[i]['text'] && collection[i]['data'].length > 0 &&
                    parseFloat(targetElement.id.split('_Legend_Index_')[1]) === i) {
                    var layer = this.maps.layers[collection[i]['data'][0]['layerIndex']];
                    var enable = (value === 'selection') ? layer.selectionSettings.enable : layer.highlightSettings.enable;
                    var module = void 0;
                    module = (value === 'selection') ? layer.selectionSettings : layer.highlightSettings;
                    var data = collection[i]['data'];
                    if (enable) {
                        for (var j = 0; j < data.length; j++) {
                            shapeIndex = data[j]['shapeIndex'];
                            layerIndex = data[j]['layerIndex'];
                            dataIndex = data[j]['dataIndex'];
                            var shapeEle = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                                layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                            if (shapeEle !== null) {
                                if (value === 'highlight' && this.shapeElement !== targetElement) {
                                    if (j === 0) {
                                        this.legendHighlightCollection = [];
                                        this.pushCollection(targetElement, this.legendHighlightCollection, collection[i], layer.shapeSettings);
                                    }
                                    length = this.legendHighlightCollection.length;
                                    var legendHighlightColor = this.legendHighlightCollection[length - 1]['legendOldFill'];
                                    this.legendHighlightCollection[length - 1]['MapShapeCollection']['Elements'].push(shapeEle);
                                    this.setColor(shapeEle, !isNullOrUndefined(module.fill) ? module.fill : legendHighlightColor, module.opacity.toString(), module.border.color, module.border.width.toString());
                                    this.setColor(targetElement, !isNullOrUndefined(module.fill) ? module.fill : legendHighlightColor, module.opacity.toString(), module.border.color, module.border.width.toString());
                                }
                                else if (value === 'selection' && this.shapeSelection) {
                                    this.legendHighlightCollection = [];
                                    if (j === 0) {
                                        this.pushCollection(targetElement, this.legendSelectionCollection, collection[i], layer.shapeSettings);
                                    }
                                    selectLength = this.legendSelectionCollection.length;
                                    var legendSelectionColor = this.legendSelectionCollection[selectLength - 1]['legendOldFill'];
                                    this.legendSelectionCollection[selectLength - 1]['MapShapeCollection']['Elements'].push(shapeEle);
                                    this.setColor(targetElement, !isNullOrUndefined(module.fill) ? module.fill : legendSelectionColor, module.opacity.toString(), module.border.color, module.border.width.toString());
                                    this.setColor(shapeEle, !isNullOrUndefined(module.fill) ? module.fill : legendSelectionColor, module.opacity.toString(), module.border.color, module.border.width.toString());
                                    this.legendElement = targetElement;
                                    if (j === data.length - 1) {
                                        this.legendSelection = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Legend.prototype.setColor = function (element, fill, opacity, borderColor, borderWidth) {
        element.setAttribute('fill', fill);
        element.setAttribute('opacity', opacity);
        element.setAttribute('stroke', borderColor);
        element.setAttribute('stroke-width', (Number(borderWidth) / this.maps.scale).toString());
    };
    Legend.prototype.pushCollection = function (targetElement, collection, oldElement, shapeSettings) {
        collection.push({
            legendElement: targetElement, legendOldFill: oldElement['fill'], legendOldOpacity: oldElement['opacity'],
            legendOldBorderColor: oldElement['borderColor'], legendOldBorderWidth: oldElement['borderWidth'],
            shapeOpacity: shapeSettings.opacity, shapeOldBorderColor: shapeSettings.border.color,
            shapeOldBorderWidth: shapeSettings.border.width
        });
        length = collection.length;
        collection[length - 1]['MapShapeCollection'] = { Elements: [] };
    };
    Legend.prototype.removeLegend = function (collection) {
        for (var i = 0; i < collection.length; i++) {
            var item = collection[i];
            this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth']);
            var dataCount = item['MapShapeCollection']['Elements'].length;
            for (var j = 0; j < dataCount; j++) {
                this.setColor(item['MapShapeCollection']['Elements'][j], item['legendOldFill'], item['shapeOpacity'], item['shapeOldBorderColor'], item['shapeOldBorderWidth']);
            }
        }
    };
    Legend.prototype.removeLegendHighlightCollection = function () {
        if (this.legendHighlightCollection.length > 0) {
            this.removeLegend(this.legendHighlightCollection);
        }
    };
    Legend.prototype.removeLegendSelectionCollection = function () {
        if (this.legendSelectionCollection.length > 0) {
            this.removeLegend(this.legendSelectionCollection);
            this.legendElement = null;
            this.legendSelection = true;
        }
    };
    Legend.prototype.removeShapeHighlightCollection = function () {
        if (this.shapeHighlightCollection.length > 0) {
            for (var i = 0; i < this.shapeHighlightCollection.length; i++) {
                var item = this.shapeHighlightCollection[i];
                var removeFill = true;
                for (var j = 0; j < this.shapeSelectionCollection.length; j++) {
                    if (this.shapeSelectionCollection[j]['legendElement'] === item['legendElement']) {
                        removeFill = false;
                    }
                }
                if (removeFill) {
                    this.setColor(item['legendElement'], item['legendOldFill'], item['legendOldOpacity'], item['legendOldBorderColor'], item['legendOldBorderWidth']);
                }
            }
        }
    };
    Legend.prototype.shapeHighLightAndSelection = function (targetElement, data, module, getValue, layerIndex) {
        if (data !== undefined) {
            var collection = this.maps.legendModule.legendCollection;
            var index = this.legendIndexOnShape(data, layerIndex);
            var text = collection[index]['text'];
            var content = void 0;
            var legendShape = void 0;
            if (this.maps.legendSettings.mode === 'Default') {
                content = document.getElementById(this.maps.element.id + '_Legend_Text_Index_' + index).textContent;
                legendShape = document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + index);
            }
            else {
                content = document.getElementById(this.maps.element.id + '_Legend_Index_' + index + '_Text').textContent;
                legendShape = document.getElementById(this.maps.element.id + '_Legend_Index_' + index);
            }
            var shapeElement = this.shapeDataOnLegend(targetElement);
            this.oldShapeElement = shapeElement['LegendEle'];
            var length_1 = this.shapeSelectionCollection.length;
            if (text === content) {
                if (getValue === 'highlight' && shapeElement['LegendEle'] !== this.legendElement) {
                    var selectionEle = this.isTargetSelected(shapeElement, this.shapeHighlightCollection);
                    if (selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) {
                        this.pushCollection(legendShape, this.shapeHighlightCollection, collection[index], this.maps.layers[layerIndex].shapeSettings);
                    }
                    if (length_1 > 0) {
                        for (var j = 0; j < length_1; j++) {
                            if (shapeElement['LegendEle'] === this.shapeSelectionCollection[j]['legendElement']) {
                                break;
                            }
                            else if (j === length_1 - 1) {
                                this.removeShapeHighlightCollection();
                                this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString());
                            }
                        }
                    }
                    else {
                        this.removeShapeHighlightCollection();
                        this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString());
                    }
                }
                else if (getValue === 'selection') {
                    var selectionEle = this.isTargetSelected(shapeElement, this.shapeSelectionCollection);
                    if (length_1 > 0) {
                        for (var j = 0; j < length_1; j++) {
                            if (shapeElement['LegendEle'] !== this.shapeSelectionCollection[j]['legendElement']) {
                                var element = this.shapeSelectionCollection[j];
                                this.setColor(element['legendElement'], element['legendOldFill'], element['legendOldOpacity'], element['legendOldBorderColor'], element['legendOldBorderWidth']);
                                this.shapeSelection = true;
                                this.shapeElement = null;
                            }
                        }
                    }
                    if (selectionEle && (selectionEle['IsSelected'] && targetElement.getAttribute('class') === 'ShapeselectionMapStyle')) {
                        var element = this.shapeSelectionCollection[selectionEle['SelectionIndex']];
                        this.setColor(shapeElement['LegendEle'], element['legendOldFill'], element['legendOldOpacity'], element['legendOldBorderColor'], element['legendOldBorderWidth']);
                        this.shapeSelectionCollection.splice(selectionEle['SelectionIndex'], 1);
                        this.shapeSelection = true;
                        this.shapeElement = null;
                    }
                    if (targetElement.getAttribute('class') !== 'ShapeselectionMapStyle' && this.legendSelection) {
                        if (selectionEle === undefined || (selectionEle && !selectionEle['IsSelected'])) {
                            this.pushCollection(legendShape, this.shapeSelectionCollection, collection[index], this.maps.layers[layerIndex].shapeSettings);
                        }
                        this.setColor(legendShape, !isNullOrUndefined(module.fill) ? module.fill : legendShape.getAttribute('fill'), module.opacity.toString(), module.border.color, module.border.width.toString());
                        this.shapeElement = shapeElement['LegendEle'];
                        this.shapeSelection = false;
                    }
                }
                else if (document.getElementsByClassName('highlightMapStyle').length > 0) {
                    this.removeShapeHighlightCollection();
                    removeClass(document.getElementsByClassName('highlightMapStyle')[0]);
                }
            }
        }
        else {
            this.removeShapeHighlightCollection();
        }
    };
    Legend.prototype.isTargetSelected = function (target, collection) {
        var selectEle;
        for (var i = 0; i < collection.length; i++) {
            if (target['LegendEle'] === collection[i]['legendElement']) {
                selectEle = { IsSelected: true, SelectionIndex: i };
            }
        }
        return selectEle;
    };
    Legend.prototype.legendIndexOnShape = function (data, index) {
        var legendIndex;
        var path = this.maps.layers[index].shapeDataPath;
        var value = data[path];
        var collection = this.maps.legendModule.legendCollection;
        for (var i = 0; i < collection.length; i++) {
            var dataValue = collection[i]['data'];
            for (var j = 0; j < dataValue.length; j++) {
                if (value === dataValue[j]['name']) {
                    legendIndex = i;
                }
            }
        }
        return legendIndex;
    };
    Legend.prototype.shapeDataOnLegend = function (targetElement) {
        var shapeIndex;
        var layerIndex;
        var dataIndex;
        var collection = this.maps.legendModule.legendCollection;
        var legend = this.maps.legendSettings;
        for (var i = 0; i < collection.length; i++) {
            var data = collection[i]['data'];
            var process = false;
            var elements = [];
            var currentElement = { Elements: [] };
            for (var j = 0; j < data.length; j++) {
                shapeIndex = data[j]['shapeIndex'];
                layerIndex = data[j]['layerIndex'];
                dataIndex = data[j]['dataIndex'];
                var shapeEle = document.getElementById(this.maps.element.id + '_LayerIndex_' +
                    layerIndex + '_shapeIndex_' + shapeIndex + '_dataIndex_' + dataIndex);
                if (targetElement === shapeEle) {
                    process = true;
                }
                elements.push(shapeEle);
            }
            if (process) {
                if (isNullOrUndefined(currentElement['LegendEle'])) {
                    currentElement['LegendEle'] = legend.mode === 'Default' ?
                        document.getElementById(this.maps.element.id + '_Legend_Shape_Index_' + i) :
                        document.getElementById(this.maps.element.id + '_Legend_Index_' + i);
                }
                currentElement['Elements'] = elements;
                return currentElement;
            }
        }
        return null;
    };
    //tslint:disable
    Legend.prototype.renderLegendBorder = function () {
        var map = this.maps;
        var legend = map.legendSettings;
        var legendTitle = legend.title.text;
        var textStyle = legend.titleStyle;
        var textOptions;
        var spacing = 10;
        var trimTitle = textTrim((this.legendItemRect.width + (spacing * 2)), legendTitle, textStyle);
        var textSize = measureText(trimTitle, textStyle);
        this.legendBorderRect = new Rect((this.legendItemRect.x - spacing), (this.legendItemRect.y - spacing - textSize.height), (this.legendItemRect.width) + (spacing * 2), (this.legendItemRect.height) + (spacing * 2) + textSize.height +
            (legend.mode === 'Interactive' ? 0 : (this.page !== 0) ? spacing : 0));
        if (legendTitle) {
            textStyle.color = (textStyle.color !== null) ? textStyle.color : this.maps.themeStyle.legendTextColor;
            textOptions = new TextOption(map.element.id + '_LegendTitle', (this.legendItemRect.x) + (this.legendItemRect.width / 2), this.legendItemRect.y - (textSize.height / 2) - spacing / 2, 'middle', trimTitle, '');
            renderTextElement(textOptions, textStyle, textStyle.color, this.legendGroup);
        }
        var renderOptions = new RectOption(map.element.id + '_Legend_Border', legend.background, legend.border, 1, this.legendBorderRect, null, null, '', '');
        this.legendGroup.appendChild(map.renderer.drawRectangle(renderOptions));
        this.getLegendAlignment(map, this.legendBorderRect.width, this.legendBorderRect.height, legend);
        this.legendGroup.setAttribute('transform', 'translate( ' + (this.translate.x + (-(this.legendBorderRect.x))) + ' ' +
            (this.translate.y + (-(this.legendBorderRect.y))) + ' )');
        map.svgObject.appendChild(this.legendGroup);
    };
    Legend.prototype.changeNextPage = function (e) {
        this.currentPage = (e.target.id.indexOf('_Left_Page_') > -1) ? (this.currentPage - 1) :
            (this.currentPage + 1);
        this.legendGroup = this.maps.renderer.createGroup({ id: this.maps.element.id + '_Legend_Group' });
        this.drawLegendItem(this.currentPage);
        if (querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id)) {
            querySelector(this.maps.element.id + '_Legend_Border', this.maps.element.id).style.pointerEvents = 'none';
        }
    };
    Legend.prototype.getLegendAlignment = function (map, width, height, legend) {
        var x;
        var y;
        var spacing = 10;
        var totalRect;
        totalRect = extend({}, map.mapAreaRect, totalRect, true);
        var areaX = totalRect.x;
        var areaY = totalRect.y;
        var areaHeight = totalRect.height;
        var areaWidth = totalRect.width;
        var totalWidth = map.availableSize.width;
        var totalHeight = map.availableSize.height;
        if (legend.position === 'Float') {
            this.translate = legend.location;
        }
        else {
            switch (legend.position) {
                case 'Top':
                case 'Bottom':
                    totalRect.height = (areaHeight - height);
                    x = (totalWidth / 2) - (width / 2);
                    y = (legend.position === 'Top') ? areaY : (areaY + totalRect.height);
                    totalRect.y = (legend.position === 'Top') ? areaY + height + spacing : areaY;
                    break;
                case 'Left':
                case 'Right':
                    totalRect.width = (areaWidth - width);
                    x = (legend.position === 'Left') ? areaX : (areaX + totalRect.width) - spacing;
                    y = (totalHeight / 2) - (height / 2);
                    totalRect.x = (legend.position === 'Left') ? areaX + width : areaX;
                    break;
            }
            switch (legend.alignment) {
                case 'Near':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = totalRect.x;
                    }
                    else {
                        y = totalRect.y;
                    }
                    break;
                case 'Far':
                    if (legend.position === 'Top' || legend.position === 'Bottom') {
                        x = (totalWidth - width) - spacing;
                    }
                    else {
                        y = totalHeight - height;
                    }
                    break;
            }
            if (legend.height && legend.width && legend.mode !== 'Interactive') {
                map.totalRect = totalRect;
            }
            else {
                map.mapAreaRect = totalRect;
            }
            this.translate = new Point(x, y);
        }
    };
    Legend.prototype.getMarkersLegendCollections = function (layerIndex, markers) {
        var _this = this;
        markers.forEach(function (marker, markerIndex) {
            var dataSource = marker.dataSource;
            var field = marker.legendText;
            var templateFn;
            var isDuplicate;
            dataSource.forEach(function (data, dataIndex) {
                var imageSrc = null;
                var showLegend = isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ? true :
                    data[_this.maps.legendSettings.showLegendPath];
                if (marker.visible && showLegend && (!isNullOrUndefined(data['latitude'] | data['Latitude'])) && (!isNullOrUndefined(data['longitude'] | data['Longitude']))) {
                    if (marker.template) {
                        templateFn = getTemplateFunction(marker.template);
                        var templateElement = templateFn(_this.maps);
                        var markerEle = isNullOrUndefined(templateElement.childElementCount) ? templateElement[0] :
                            templateElement;
                        imageSrc = markerEle.querySelector('img').src;
                    }
                    var text = isNullOrUndefined(data[field]) ? '' : data[field];
                    isDuplicate = _this.maps.legendSettings.removeDuplicateLegend ?
                        _this.removeDuplicates(_this.legendCollection, text) : false;
                    if (!isDuplicate) {
                        _this.legendCollection.push({
                            layerIndex: layerIndex, markerIndex: markerIndex, dataIndex: dataIndex,
                            fill: marker.fill, text: text, imageSrc: imageSrc
                        });
                    }
                }
            });
        });
    };
    Legend.prototype.getRangeLegendCollection = function (layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var legendIndex = 0;
        var fill = this.maps.legendSettings.fill;
        var rangeData = [];
        var _loop_3 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.from) && !isNullOrUndefined(colorMap.to)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.from + ' - ' + colorMap.to;
                rangeData = [];
                var colorMapProcess_1 = false;
                dataSource.forEach(function (data, dataIndex) {
                    var colorValue = parseFloat(data[colorValuePath]);
                    if (colorValue >= colorMap.from && colorValue <= colorMap.to) {
                        colorMapProcess_1 = true;
                        rangeData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, colorValue));
                    }
                });
                if (!colorMapProcess_1) {
                    rangeData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]' ?
                    !isNullOrUndefined(colorMap.value) ? colorMap.color[0] : this_3.legendGradientColor(colorMap, legendIndex) :
                    colorMap.color : fill;
                legendIndex++;
                this_3.getOverallLegendItemsCollection(legendText, legendFill, rangeData, colorMap.showLegend);
            }
        };
        var this_3 = this;
        for (var _i = 0, colorMapping_1 = colorMapping; _i < colorMapping_1.length; _i++) {
            var colorMap = colorMapping_1[_i];
            _loop_3(colorMap);
        }
    };
    Legend.prototype.getOverallLegendItemsCollection = function (legendText, legendFill, legendData, showLegend) {
        var newColllection = [];
        var legend = this.maps.legendSettings;
        if (legendData.length > 0 && showLegend) {
            for (var i = 0; i < legendData.length; i++) {
                var collection = legendData[i];
                if (collection.length > 0) {
                    for (var j = 0; j < collection.length; j++) {
                        newColllection.push(collection[j]);
                    }
                }
                else {
                    newColllection.push(legendData[i]);
                }
                newColllection['_isVisible'] = true;
            }
            var isDuplicate = this.maps.legendSettings.removeDuplicateLegend ?
                this.removeDuplicates(this.legendCollection, legendText) : false;
            if (!isDuplicate) {
                this.legendCollection.push({
                    text: legendText, fill: legendFill, data: newColllection, opacity: legend.opacity,
                    borderColor: legend.shapeBorder.color, borderWidth: legend.shapeBorder.width
                });
            }
        }
    };
    Legend.prototype.removeDuplicates = function (legendCollection, text) {
        var isDuplicate = false;
        for (var i = 0; i < legendCollection.length; i++) {
            if (legendCollection[i]['text'] === text) {
                isDuplicate = true;
                break;
            }
            else {
                continue;
            }
        }
        return isDuplicate;
    };
    Legend.prototype.getEqualLegendCollection = function (layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var fill = this.maps.legendSettings.fill;
        var equalValues = [];
        var legendText;
        var legendIndex = 0;
        var equalData = [];
        var outOfRangeValues = [];
        var outOfRange = [];
        var _loop_4 = function (colorMap) {
            if (!isNullOrUndefined(colorMap.value)) {
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : colorMap.value;
                equalData = [];
                var eqaulColorProcess_1 = false;
                dataSource.forEach(function (data, dataIndex) {
                    var equalValue = data[colorValuePath];
                    if (equalValue === colorMap.value) {
                        eqaulColorProcess_1 = true;
                        if (equalValues.indexOf(equalValue) === -1) {
                            equalValues.push(equalValue);
                        }
                        equalData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                    }
                    else {
                        if (outOfRangeValues.indexOf(equalValue) === -1) {
                            outOfRangeValues.push(equalValue);
                        }
                    }
                });
                for (var x = 0; x < equalValues.length; x++) {
                    for (var y = 0; y < outOfRangeValues.length; y++) {
                        if (equalValues[x] === outOfRangeValues[y]) {
                            var equalIndex = outOfRangeValues.indexOf(equalValues[x]);
                            outOfRangeValues.splice(equalIndex, 1);
                        }
                    }
                }
                if (!eqaulColorProcess_1) {
                    equalData.push({
                        layerIndex: layerIndex, shapeIndex: null, dataIndex: null,
                        name: null, value: null
                    });
                }
                var legendFill = (isNullOrUndefined(fill)) ? Object.prototype.toString.call(colorMap.color) === '[object Array]'
                    ? colorMap.color[0] : colorMap.color : fill;
                legendIndex++;
                this_4.getOverallLegendItemsCollection(legendText, legendFill, equalData, colorMap.showLegend);
            }
            else if (isNullOrUndefined(colorMap.minOpacity) && isNullOrUndefined(colorMap.maxOpacity) && isNullOrUndefined(colorMap.value)
                && isNullOrUndefined(colorMap.from) && isNullOrUndefined(colorMap.to) && !isNullOrUndefined(colorMap.color)) {
                dataSource.forEach(function (data, dataIndex) {
                    var equalValue = data[colorValuePath];
                    for (var k = 0; k < outOfRangeValues.length; k++) {
                        if (equalValue === outOfRangeValues[k]) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, equalValue));
                        }
                    }
                });
                if (outOfRangeValues.length === 0) {
                    var range_1 = false;
                    var outRange = [];
                    dataSource.forEach(function (data, dataIndex) {
                        range_1 = false;
                        var rangeValue = data[colorValuePath];
                        for (var z = 0; z < colorMapping.length; z++) {
                            if (!isNullOrUndefined(rangeValue) && rangeValue !== 0) {
                                if (rangeValue >= colorMapping[z].from && rangeValue <= colorMapping[z].to) {
                                    range_1 = true;
                                }
                            }
                            else if (!range_1) {
                                range_1 = false;
                            }
                        }
                        if (!range_1) {
                            outOfRange.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, rangeValue));
                        }
                    });
                }
                legendText = !isNullOrUndefined(colorMap.label) ? colorMap.label : 'Others';
                var outfill = ((Object.prototype.toString.call(colorMap.color) === '[object Array]'))
                    ? colorMap.color[0] : colorMap.color;
                var legendOutFill = outfill;
                legendIndex++;
                this_4.getOverallLegendItemsCollection(legendText, legendOutFill, outOfRange, colorMap.showLegend);
            }
        };
        var this_4 = this;
        for (var _i = 0, colorMapping_2 = colorMapping; _i < colorMapping_2.length; _i++) {
            var colorMap = colorMapping_2[_i];
            _loop_4(colorMap);
        }
    };
    Legend.prototype.getDataLegendCollection = function (layerIndex, layerData, colorMapping, dataSource, dataPath, colorValuePath, propertyPath) {
        var _this = this;
        var legendText;
        var fill = this.maps.legendSettings.fill;
        var valuePath = this.maps.legendSettings.valuePath;
        if (!isNullOrUndefined(colorValuePath) && !isNullOrUndefined(dataSource)) {
            dataSource.forEach(function (data, dataIndex) {
                var showLegend = isNullOrUndefined(_this.maps.legendSettings.showLegendPath) ?
                    true : isNullOrUndefined(data[_this.maps.legendSettings.showLegendPath]) ?
                    false : data[_this.maps.legendSettings.showLegendPath];
                var dataValue = data[colorValuePath];
                var newData = [];
                var legendFill = (isNullOrUndefined(fill)) ? dataValue : fill;
                if (!isNullOrUndefined(dataValue) && colorMapping.length === 0) {
                    legendText = !isNullOrUndefined(data[valuePath]) ? data[valuePath] : data[dataPath];
                    newData.push(_this.getLegendData(layerIndex, dataIndex, data, dataPath, layerData, propertyPath, dataValue));
                }
                _this.getOverallLegendItemsCollection(legendText, legendFill, newData, showLegend);
            });
        }
    };
    Legend.prototype.interactiveHandler = function (e) {
        var target = e.target;
        var legend = this.maps.legendSettings;
        var id = this.maps.element.id + '_Interactive_Legend';
        var hoverId = legend.type === 'Layers' ? '_shapeIndex_' : (legend.type === 'Markers') ? '_MarkerIndex_' :
            '_BubbleIndex_';
        if (target.id.indexOf(hoverId) > 1) {
            var layerIndex = parseFloat(target.id.split('_LayerIndex_')[1].split('_')[0]);
            var dataIndex = parseFloat(target.id.split(/_dataIndex_/i)[1].split('_')[0]);
            var fill = void 0;
            var stroke = void 0;
            var strokeWidth = void 0;
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
            var layer = this.maps.layersCollection[layerIndex];
            var markerVisible = (legend.type === 'Layers' ? layer.visible :
                legend.type === 'Markers' ? layer.markerSettings[parseFloat(target.id.split('_MarkerIndex_')[1].split('_')[0])].visible :
                    (this.maps.getBubbleVisible(this.maps.layersCollection[layerIndex])));
            if (legend.visible && this.legendRenderingCollections.length > 0
                && legend.mode === 'Interactive' && markerVisible) {
                var svgRect = this.maps.svgObject.getBoundingClientRect();
                for (var i = 0; i < this.legendCollection.length; i++) {
                    var currentData = this.legendCollection[i];
                    var legendElement = querySelector(this.maps.element.id + '_Legend_Index_' + i, this.maps.element.id);
                    var legendRect = legendElement.getBoundingClientRect();
                    var rect = new Rect(Math.abs(legendRect.left - svgRect.left), Math.abs(legendRect.top - svgRect.top), legendRect.width, legendRect.height);
                    fill = legendElement.getAttribute('fill');
                    stroke = legend.shapeBorder.color;
                    strokeWidth = legend.shapeBorder.width;
                    if (!isNullOrUndefined(currentData['data'])) {
                        var data = currentData['data'];
                        for (var j = 0; j < data.length; j++) {
                            if (dataIndex === data[j]['dataIndex'] && layerIndex === data[j]['layerIndex']) {
                                this.renderInteractivePointer(legend, fill, stroke, id, strokeWidth, rect);
                                break;
                            }
                        }
                    }
                }
            }
        }
        else {
            if (!(isNullOrUndefined(querySelector(id, this.maps.element.id)))) {
                remove(querySelector(id, this.maps.element.id));
            }
        }
    };
    Legend.prototype.renderInteractivePointer = function (legend, fill, stroke, id, strokeWidth, rect) {
        var path;
        var pathOptions;
        var locX;
        var locY;
        var height = 10;
        var width = 10;
        var direction = (legend.orientation === 'None') ? (legend.position === 'Top' || legend.position === 'Bottom')
            ? 'Horizontal' : 'Vertical' : legend.orientation;
        if (direction === 'Horizontal') {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width / 2);
                locY = rect.y;
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY - height) + ' Z ';
            }
            else {
                locX = rect.x + (rect.width / 2);
                locY = rect.y + (rect.height);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY + height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' Z ';
            }
        }
        else {
            if (!legend.invertedPointer) {
                locX = rect.x + (rect.width);
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX + width) + ' ' + (locY - height) +
                    ' L ' + (locX + width) + ' ' + (locY + height) + ' z ';
            }
            else {
                locX = rect.x;
                locY = rect.y + (rect.height / 2);
                path = ' M ' + locX + ' ' + locY + ' L ' + (locX - width) + ' ' + (locY - height) +
                    ' L ' + (locX - width) + ' ' + (locY + height) + ' z ';
            }
        }
        pathOptions = new PathOption(id, fill, strokeWidth, stroke, 1, '', path);
        this.maps.svgObject.appendChild(this.maps.renderer.drawPath(pathOptions));
    };
    Legend.prototype.wireEvents = function (element) {
        EventHandler.add(element, Browser.touchStartEvent, this.changeNextPage, this);
    };
    Legend.prototype.addEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.on(Browser.touchMoveEvent, this.interactiveHandler, this);
        this.maps.on(Browser.touchEndEvent, this.interactiveHandler, this);
        this.maps.on(click, this.legendClick, this);
    };
    Legend.prototype.legendClick = function (targetEle) {
        var legendShapeId;
        var legendTextId;
        var legendTextColor;
        var legendToggleFill = this.maps.legendSettings.toggleLegendSettings.fill;
        var legendToggleOpacity = this.maps.legendSettings.toggleLegendSettings.opacity;
        var legendToggleBorderColor = this.maps.legendSettings.toggleLegendSettings.border.color;
        var legendToggleBorderWidth = this.maps.legendSettings.toggleLegendSettings.border.width;
        if (targetEle.parentNode['id'].indexOf(this.maps.element.id + '_Legend_Index_') > -1) {
            var mapElement = void 0;
            var legendIndex = parseFloat(targetEle.parentElement.id.substr((this.maps.element.id + '_Legend_Index_').length));
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            var shape = void 0;
            if (this.maps.legendSettings.toggleLegendSettings.enable && this.maps.legendSettings.type === "Bubbles") {
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < this.maps.layers[k].bubbleSettings.length; j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            shape = this.legendCollection[legendIndex]['data'][i];
                            mapElement = querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                            if (isVisible && mapElement !== null) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapElement.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    mapElement.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                    mapElement.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapElement.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                }
                                else {
                                    mapElement.setAttribute("fill", legendToggleFill);
                                    mapElement.setAttribute("opacity", (legendToggleOpacity).toString());
                                    mapElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", "#E5E5E5");
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#E5E5E5");
                                }
                            }
                            else {
                                mapElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                mapElement.setAttribute('stroke', this.maps.layers[k].bubbleSettings[j].border.color);
                                mapElement.setAttribute('opacity', (this.maps.layers[k].bubbleSettings[j].opacity).toString());
                                mapElement.setAttribute('stroke-width', (this.maps.layers[k].bubbleSettings[j].border.width).toString());
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", this.legendCollection[legendIndex]['fill']);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#757575");
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === "Layers" && this.maps.legendSettings.toggleLegendSettings.enable) {
                var layerElement = void 0;
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        shape = this.legendCollection[legendIndex]['data'][i];
                        layerElement = querySelector(this.maps.element.id + '_LayerIndex_' + shape['layerIndex'] +
                            '_shapeIndex_' + shape['shapeIndex'] + '_dataIndex_' + shape['dataIndex'], this.maps.element.id);
                        if (layerElement !== null) {
                            if (isVisible) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    layerElement.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    layerElement.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    layerElement.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                    layerElement.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                }
                                else {
                                    layerElement.setAttribute("fill", legendToggleFill);
                                    layerElement.setAttribute("opacity", (legendToggleOpacity).toString());
                                    layerElement.setAttribute('stroke', legendToggleBorderColor);
                                    layerElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#E5E5E5");
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", "#E5E5E5");
                                }
                            }
                            else {
                                layerElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                layerElement.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                layerElement.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                layerElement.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Text_Index_' + legendIndex, this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#757575");
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Shape_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", this.legendCollection[legendIndex]['fill']);
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
        else if (!isNullOrUndefined(targetEle.id) && (targetEle.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
            targetEle.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1) && this.maps.legendSettings.visible &&
            targetEle.id.indexOf('_Text') === -1) {
            var LegendInteractive = void 0;
            var legendIndex = parseFloat(targetEle.id.substr((this.maps.element.id + '_Legend_Index_').length));
            var mapdata = void 0;
            var selectedItem = this.legendCollection[legendIndex]['data'];
            var isVisible = selectedItem['_isVisible'];
            if (this.maps.legendSettings.type === "Bubbles" && this.maps.legendSettings.toggleLegendSettings.enable) {
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var j = 0; j < this.maps.layers[k].bubbleSettings.length; j++) {
                        for (var i = 0; i < selectedItem.length; i++) {
                            mapdata = this.legendCollection[legendIndex]['data'][i];
                            LegendInteractive = querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                                '_BubbleIndex_' + j + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                            if (isVisible && LegendInteractive !== null) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    LegendInteractive.setAttribute('fill', this.maps.layers[k].shapeSettings.fill);
                                    LegendInteractive.setAttribute('stroke', this.maps.layers[k].shapeSettings.border.color);
                                    LegendInteractive.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                    LegendInteractive.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                }
                                else {
                                    LegendInteractive.setAttribute("fill", legendToggleFill);
                                    LegendInteractive.setAttribute("opacity", (legendToggleOpacity).toString());
                                    LegendInteractive.setAttribute('stroke', legendToggleBorderColor);
                                    LegendInteractive.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                }
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#E5E5E5");
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", "#E5E5E5");
                                }
                            }
                            else {
                                LegendInteractive.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                LegendInteractive.setAttribute('stroke', this.maps.layers[k].bubbleSettings[j].border.color);
                                LegendInteractive.setAttribute('stroke-width', (this.maps.layers[k].bubbleSettings[j].border.width).toString());
                                LegendInteractive.setAttribute('opacity', (this.maps.layers[k].bubbleSettings[j].opacity).toString());
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", this.legendCollection[legendIndex]['fill']);
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#757575");
                                }
                            }
                        }
                        selectedItem['_isVisible'] = isVisible ? false : true;
                    }
                }
            }
            if (this.maps.legendSettings.type === "Layers" && this.maps.legendSettings.toggleLegendSettings.enable) {
                var mapLegendElement = void 0;
                for (var k = 0; k < this.maps.layers.length; k++) {
                    for (var i = 0; i < selectedItem.length; i++) {
                        mapdata = this.legendCollection[legendIndex]['data'][i];
                        mapLegendElement = querySelector(this.maps.element.id + '_LayerIndex_' + mapdata['layerIndex'] +
                            '_shapeIndex_' + mapdata['shapeIndex'] + '_dataIndex_' + mapdata['dataIndex'], this.maps.element.id);
                        if (mapLegendElement !== null) {
                            if (isVisible) {
                                if (this.maps.legendSettings.toggleLegendSettings.applyShapeSettings) {
                                    mapLegendElement.setAttribute('fill', this.maps.layers[0].shapeSettings.fill);
                                    mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color);
                                    mapLegendElement.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                    mapLegendElement.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                }
                                else {
                                    mapLegendElement.setAttribute("fill", legendToggleFill);
                                    mapLegendElement.setAttribute("opacity", (legendToggleOpacity).toString());
                                    mapLegendElement.setAttribute('stroke', legendToggleBorderColor);
                                    mapLegendElement.setAttribute('stroke-width', (legendToggleBorderWidth).toString());
                                }
                                if (targetEle !== null) {
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", "#E5E5E5");
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#E5E5E5");
                                }
                            }
                            else {
                                mapLegendElement.setAttribute('fill', this.legendCollection[legendIndex]['fill']);
                                mapLegendElement.setAttribute('stroke', this.maps.layers[0].shapeSettings.border.color);
                                mapLegendElement.setAttribute('opacity', (this.maps.layers[k].shapeSettings.opacity).toString());
                                mapLegendElement.setAttribute('stroke-width', (this.maps.layers[k].shapeSettings.border.width).toString());
                                if (targetEle !== null) {
                                    legendTextId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex + '_Text', this.maps.element.id);
                                    legendTextId.setAttribute("fill", "#757575");
                                    legendShapeId = querySelector(this.maps.element.id + '_Legend_Index_' + legendIndex, this.maps.element.id);
                                    legendShapeId.setAttribute("fill", this.legendCollection[legendIndex]['fill']);
                                }
                            }
                        }
                    }
                }
                selectedItem['_isVisible'] = isVisible ? false : true;
            }
        }
    };
    Legend.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(Browser.touchMoveEvent, this.interactiveHandler);
        this.maps.off(Browser.touchEndEvent, this.interactiveHandler);
        this.maps.off(click, this.legendClick);
    };
    Legend.prototype.getLegendData = function (layerIndex, dataIndex, data, dataPath, layerData, shapePropertyPath, value) {
        var legendData = [];
        if (Object.prototype.toString.call(layerData) === '[object Array]') {
            for (var i = 0; i < layerData.length; i++) {
                var shapeData = layerData[i];
                var shapePath = checkPropertyPath(data[dataPath], shapePropertyPath, shapeData['properties']);
                if (shapeData['properties'][shapePath] === data[dataPath]) {
                    legendData.push({
                        layerIndex: layerIndex, shapeIndex: i, dataIndex: dataIndex,
                        name: data[dataPath], value: value
                    });
                }
            }
        }
        return legendData;
    };
    Legend.prototype.legendGradientColor = function (colorMap, legendIndex) {
        var legendFillColor;
        var xmlns = 'http://www.w3.org/2000/svg';
        if (!isNullOrUndefined(colorMap.color) && typeof (colorMap.color) === 'object') {
            var linerGradientEle = document.createElementNS(xmlns, 'linearGradient');
            var opacity = 1;
            var position = this.maps.legendSettings.position;
            var x2 = void 0;
            var y2 = void 0;
            x2 = position === 'Top' || position === 'Bottom' ? '100' : '0';
            y2 = position === 'Top' || position === 'Bottom' ? '0' : '100';
            linerGradientEle.setAttribute('id', 'linear_' + legendIndex);
            linerGradientEle.setAttribute('x1', 0 + '%');
            linerGradientEle.setAttribute('y1', 0 + '%');
            linerGradientEle.setAttribute('x2', x2 + '%');
            linerGradientEle.setAttribute('y2', y2 + '%');
            for (var b = 0; b < colorMap.color.length; b++) {
                var offsetColor = 100 / (colorMap.color.length - 1);
                var stopEle = document.createElementNS(xmlns, 'stop');
                stopEle.setAttribute('offset', b * offsetColor + '%');
                stopEle.setAttribute('stop-color', colorMap.color[b]);
                stopEle.setAttribute('stop-opacity', opacity.toString());
                linerGradientEle.appendChild(stopEle);
            }
            this.legendLinearGradient = linerGradientEle;
            var color = 'url(' + '#linear_' + legendIndex + ')';
            this.defsElement.appendChild(linerGradientEle);
            legendFillColor = color;
        }
        return legendFillColor;
    };
    /**
     * Get module name.
     */
    Legend.prototype.getModuleName = function () {
        return 'Legend';
    };
    /**
     * To destroy the legend.
     * @return {void}
     * @private
     */
    Legend.prototype.destroy = function (maps) {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    };
    return Legend;
}());
export { Legend };
