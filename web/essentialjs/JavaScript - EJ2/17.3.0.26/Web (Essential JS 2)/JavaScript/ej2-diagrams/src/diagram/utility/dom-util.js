import { Rect } from '../primitives/rect';
import { Size } from '../primitives/size';
import { processPathData, splitArrayCollection, transformPath } from './path-util';
import { whiteSpaceToString, wordBreakToString, textAlignToString, bBoxText } from './base-util';
import { identityMatrix, transformPointByMatrix, rotateMatrix } from '../primitives/matrix';
import { compile, createElement, Browser } from '@syncfusion/ej2-base';
import { Node } from '../objects/node';
import { getElement } from './diagram-util';
/**
 * Defines the functionalities that need to access DOM
 */
/** @private */
export function removeElementsByClass(className, id) {
    var elements;
    if (id) {
        elements = document.getElementById(id).getElementsByClassName(className);
    }
    else {
        elements = document.getElementsByClassName(className);
    }
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
/** @private */
export function findSegmentPoints(element) {
    var pts = [];
    var sample;
    var sampleLength;
    var measureElement = 'measureElement';
    window[measureElement].style.visibility = 'visible';
    var svg = window[measureElement].children[2];
    var pathNode = getChildNode(svg)[0];
    pathNode.setAttributeNS(null, 'd', element.data);
    var pathBounds = element.absoluteBounds; // || pathNode.getBBox();
    var pathData = updatePath(element, pathBounds, element);
    pathNode.setAttributeNS(null, 'd', pathData);
    var pathLength = pathNode.getTotalLength();
    for (sampleLength = 0; sampleLength <= pathLength; sampleLength += 10) {
        sample = pathNode.getPointAtLength(sampleLength);
        pts.push({ x: sample.x, y: sample.y });
    }
    window[measureElement].style.visibility = 'hidden';
    return pts;
}
export function getChildNode(node) {
    var child;
    var collection = [];
    if (Browser.info.name === 'msie' || Browser.info.name === 'edge') {
        for (var i = 0; i < node.childNodes.length; i++) {
            child = node.childNodes[i];
            if (child.nodeType === 1) {
                collection.push(child);
            }
        }
    }
    else {
        collection = node.children;
    }
    return collection;
}
export function translatePoints(element, points) {
    var translatedPts = [];
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var pt1 = {
            x: element.offsetX - element.actualSize.width * element.pivot.x + point.x,
            y: element.offsetY - element.actualSize.height * element.pivot.y + point.y
        };
        var matrix = void 0;
        var angle = element.rotateAngle + element.parentTransform;
        if (angle) {
            matrix = identityMatrix();
            rotateMatrix(matrix, angle, element.offsetX, element.offsetY);
        }
        if (matrix) {
            pt1 = transformPointByMatrix(matrix, pt1);
        }
        translatedPts.push(pt1);
    }
    return translatedPts;
}
/** @private */
export function measurePath(data) {
    if (data) {
        var measureElement = 'measureElement';
        window[measureElement].style.visibility = 'visible';
        var svg = window[measureElement].children[2];
        var element = getChildNode(svg)[0];
        element.setAttribute('d', data);
        var bounds = element.getBBox();
        var svgBounds = new Rect(bounds.x, bounds.y, bounds.width, bounds.height);
        window[measureElement].style.visibility = 'hidden';
        return svgBounds;
    }
    return new Rect(0, 0, 0, 0);
}
function getTextOptions(element, maxWidth) {
    var options = {
        fill: element.style.fill, stroke: element.style.strokeColor, angle: element.rotateAngle + element.parentTransform,
        pivotX: element.pivot.x, pivotY: element.pivot.y, strokeWidth: element.style.strokeWidth,
        dashArray: element.style.strokeDashArray, opacity: element.style.opacity, shadow: element.shadow,
        gradient: element.style.gradient, visible: element.visible, id: element.id, description: element.description,
        width: maxWidth || element.actualSize.width, height: element.actualSize.height,
        x: element.offsetX - element.actualSize.width * element.pivot.x + 0.5,
        y: element.offsetY - element.actualSize.height * element.pivot.y + 0.5
    };
    options.fontSize = element.style.fontSize;
    options.fontFamily = element.style.fontFamily;
    options.textOverflow = element.style.textOverflow;
    options.textDecoration = element.style.textDecoration;
    options.doWrap = element.doWrap;
    options.whiteSpace = whiteSpaceToString(element.style.whiteSpace, element.style.textWrapping);
    options.content = element.content;
    options.textWrapping = element.style.textWrapping;
    options.breakWord = wordBreakToString(element.style.textWrapping);
    options.textAlign = textAlignToString(element.style.textAlign);
    options.color = element.style.color;
    options.italic = element.style.italic;
    options.bold = element.style.bold;
    options.dashArray = '';
    options.strokeWidth = 0;
    options.fill = '';
    return options;
}
function wrapSvgText(text, textValue, laneWidth) {
    var childNodes = [];
    var k = 0;
    var txtValue;
    var bounds1;
    var content = textValue || text.content;
    if (text.whiteSpace !== 'nowrap' && text.whiteSpace !== 'pre') {
        if (text.breakWord === 'breakall') {
            txtValue = '';
            txtValue += content[0];
            for (k = 0; k < content.length; k++) {
                bounds1 = bBoxText(txtValue, text);
                if (bounds1 >= text.width && txtValue.length > 0) {
                    childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: bounds1 };
                    txtValue = '';
                }
                else {
                    txtValue = txtValue + (content[k + 1] || '');
                    if (txtValue.indexOf('\n') > -1) {
                        txtValue = txtValue.replace('\n', '');
                    }
                    var width = bBoxText(txtValue, text);
                    if (Math.ceil(width) + 2 >= text.width && txtValue.length > 0) {
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                    if (k === content.length - 1 && txtValue.length > 0) {
                        childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                        txtValue = '';
                    }
                }
            }
        }
        else {
            childNodes = wordWrapping(text, textValue, laneWidth);
        }
    }
    else {
        childNodes[childNodes.length] = { text: content, x: 0, dy: 0, width: bBoxText(content, text) };
    }
    return childNodes;
}
function wordWrapping(text, textValue, laneWidth) {
    var childNodes = [];
    var txtValue = '';
    var j = 0;
    var i = 0;
    var wrap = text.whiteSpace !== 'nowrap' ? true : false;
    var content = textValue || text.content;
    var eachLine = content.split('\n');
    var txt;
    var words;
    var newText;
    var existingWidth;
    var existingText;
    for (j = 0; j < eachLine.length; j++) {
        txt = '';
        words = text.textWrapping !== 'NoWrap' ? eachLine[j].split(' ') : eachLine;
        for (i = 0; i < words.length; i++) {
            txtValue += (((i !== 0 || words.length === 1) && wrap && txtValue.length > 0) ? ' ' : '') + words[i];
            newText = txtValue + ' ' + (words[i + 1] || '');
            var width = bBoxText(newText, text);
            if (Math.floor(width) > (laneWidth || text.width) - 2 && txtValue.length > 0) {
                childNodes[childNodes.length] = {
                    text: txtValue, x: 0, dy: 0,
                    width: newText === txtValue ? width : (txtValue === existingText) ? existingWidth : bBoxText(txtValue, text)
                };
                txtValue = '';
            }
            else {
                if (i === words.length - 1) {
                    childNodes[childNodes.length] = { text: txtValue, x: 0, dy: 0, width: width };
                    txtValue = '';
                }
            }
            existingText = newText;
            existingWidth = width;
        }
    }
    return childNodes;
}
function wrapSvgTextAlign(text, childNodes) {
    var wrapBounds = { x: 0, width: 0 };
    var k = 0;
    var txtWidth;
    var width;
    for (k = 0; k < childNodes.length; k++) {
        txtWidth = childNodes[k].width;
        width = txtWidth;
        if (text.textAlign === 'left') {
            txtWidth = 0;
        }
        else if (text.textAlign === 'center') {
            if (txtWidth > text.width && (text.textOverflow === 'Ellipsis' || text.textOverflow === 'Clip')) {
                txtWidth = 0;
            }
            else {
                txtWidth = -txtWidth / 2;
            }
        }
        else if (text.textAlign === 'right') {
            txtWidth = -txtWidth;
        }
        else {
            txtWidth = childNodes.length > 1 ? 0 : -txtWidth / 2;
        }
        childNodes[k].dy = text.fontSize * 1.2;
        childNodes[k].x = txtWidth;
        if (!wrapBounds) {
            wrapBounds = {
                x: txtWidth,
                width: width
            };
        }
        else {
            wrapBounds.x = Math.min(wrapBounds.x, txtWidth);
            wrapBounds.width = Math.max(wrapBounds.width, width);
        }
    }
    return wrapBounds;
}
export function measureHtmlText(style, content, width, height, maxWidth) {
    var bounds = new Size();
    var text = createHtmlElement('span', { 'style': 'display:inline-block; line-height: normal' });
    if (style.bold) {
        text.style.fontWeight = 'bold';
    }
    if (style.italic) {
        text.style.fontStyle = 'italic';
    }
    if (width !== undefined) {
        text.style.width = width.toString() + 'px';
    }
    if (height !== undefined) {
        text.style.height = height.toString() + 'px';
    }
    if (maxWidth !== undefined) {
        text.style.maxWidth = maxWidth.toString() + 'px';
    }
    text.style.fontFamily = style.fontFamily;
    text.style.fontSize = style.fontSize + 'px';
    text.style.color = style.color;
    text.textContent = content;
    text.style.whiteSpace = whiteSpaceToString(style.whiteSpace, style.textWrapping);
    if (maxWidth !== undefined) {
        text.style.wordBreak = 'break-word';
    }
    else {
        text.style.wordBreak = wordBreakToString(style.textWrapping);
    }
    document.body.appendChild(text);
    bounds.width = text.offsetWidth;
    bounds.height = text.offsetHeight;
    document.body.removeChild(text);
    return bounds;
}
/** @private */
export function measureText(text, style, content, maxWidth, textValue) {
    var bounds = new Size(0, 0);
    var childNodes;
    var wrapBounds;
    var options = getTextOptions(text, maxWidth);
    text.childNodes = childNodes = wrapSvgText(options, textValue, text.isLaneOrientation ? maxWidth : undefined);
    text.wrapBounds = wrapBounds = wrapSvgTextAlign(options, childNodes);
    bounds.width = wrapBounds.width;
    if (text.wrapBounds.width >= maxWidth && options.textOverflow !== 'Wrap') {
        bounds.width = maxWidth;
    }
    bounds.height = childNodes.length * text.style.fontSize * 1.2;
    return bounds;
}
/** @private */
export function measureImage(source, contentSize, id, callback) {
    var measureElement = 'measureElement';
    window[measureElement].style.visibility = 'visible';
    var imageElement = window[measureElement].children[1];
    imageElement.setAttribute('src', source);
    var bounds = imageElement.getBoundingClientRect();
    var width = bounds.width;
    var height = bounds.height;
    contentSize = new Size(width, height);
    window[measureElement].style.visibility = 'hidden';
    var element = document.createElement('img');
    element.setAttribute('src', source);
    setAttributeHtml(element, { id: id + 'sf-imageNode', style: 'display: none;' });
    document.body.appendChild(element);
    // tslint:disable-next-line:no-any
    element.onload = function (event) {
        var loadedImage = event.currentTarget;
        if (callback) {
            callback(id, { width: loadedImage.width, height: loadedImage.height });
        }
    };
    return contentSize;
}
/** @private */
export function measureNativeContent(nativeContent) {
    var measureElement = 'measureElement';
    window[measureElement].style.visibility = 'visible';
    var nativeSVG = window[measureElement].children[2];
    nativeSVG.appendChild(nativeContent);
    var bounds = nativeContent.getBoundingClientRect();
    var svgBounds = nativeSVG.getBoundingClientRect();
    var rect = bounds;
    rect.x = bounds.left - svgBounds.left;
    rect.y = bounds.top - svgBounds.top;
    nativeSVG.removeChild(nativeContent);
    window[measureElement].style.visibility = 'hidden';
    return rect;
}
/**
 * @private
 */
export function measureNativeSvg(nativeContent) {
    var measureElement = 'measureElement';
    window[measureElement].style.visibility = 'visible';
    var nativeSVG = window[measureElement].children[2];
    nativeSVG.appendChild(nativeContent);
    var svgBounds = nativeSVG.getBoundingClientRect();
    nativeSVG.removeChild(nativeContent);
    window[measureElement].style.visibility = 'hidden';
    return svgBounds;
}
/** @private */
export function updatePath(element, bounds, child, options) {
    var initX = 0;
    var initY = 0;
    var scaleX = 0;
    var scaleY = 0;
    var isScale = false;
    var bBox;
    var isInit;
    var isResizing = true;
    var newPathString = '';
    var arrayCollection = [];
    bBox = bounds;
    if (initX !== bBox.x || initY !== bBox.y) {
        scaleX = initX - Number(bBox.x);
        scaleY = initY - Number(bBox.y);
    }
    if (element.actualSize.width !== bBox.width || element.actualSize.height !== bBox.height || options) {
        scaleX = (options && options.width || element.actualSize.width) / Number(bBox.width ? bBox.width : 1);
        scaleY = (options && options.height || element.actualSize.height) / Number(bBox.height ? bBox.height : 1);
        isScale = true;
    }
    arrayCollection = processPathData(element.data);
    arrayCollection = splitArrayCollection(arrayCollection);
    newPathString = transformPath(arrayCollection, scaleX, scaleY, isScale, bBox.x, bBox.y, initX, initY);
    isScale = false;
    return newPathString;
}
/** @private */
export function getDiagramLayerSvg(diagramId) {
    var diagramLayerSvg;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-diagram-layer');
    diagramLayerSvg = elementcoll[0];
    return diagramLayerSvg;
}
/** @private */
export function getDiagramElement(elementId, contentId) {
    var diagramElement;
    var element;
    if (contentId) {
        element = document.getElementById(contentId);
    }
    if (Browser.info.name === 'msie' || Browser.info.name === 'edge') {
        diagramElement = (element) ? element.querySelector('#' + elementId) : document.getElementById(elementId);
    }
    else {
        diagramElement = (element) ? element.querySelector('#' + CSS.escape(elementId)) : document.getElementById(elementId);
    }
    return diagramElement;
}
/** @private */
export function getDomIndex(viewId, elementId, layer) {
    var index = undefined;
    var parentElement;
    var postId = '';
    if (layer === 'native') {
        parentElement = getNativeLayer(viewId);
        postId = '_content_groupElement';
    }
    else if (layer === 'html') {
        parentElement = getHTMLLayer(viewId).childNodes[0];
        postId = '_html_element';
    }
    else {
        parentElement = getDiagramLayer(viewId);
        postId = '_groupElement';
    }
    var childElement;
    for (var i = 0; parentElement.childNodes && i < parentElement.childNodes.length; i++) {
        childElement = parentElement.childNodes[i];
        if (childElement && childElement.id === elementId + postId) {
            index = i;
            break;
        }
    }
    return index;
}
/**
 * @private
 */
export function getAdornerLayerSvg(diagramId) {
    var adornerLayerSvg = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-adorner-layer');
    adornerLayerSvg = elementcoll[0];
    return adornerLayerSvg;
}
/** @private */
export function getSelectorElement(diagramId) {
    var adornerLayer = null;
    var adornerSvg = getAdornerLayerSvg(diagramId);
    adornerLayer = adornerSvg.getElementById(diagramId + '_SelectorElement');
    return adornerLayer;
}
/**
 * @private
 */
export function getAdornerLayer(diagramId) {
    var adornerLayer = null;
    var diagramAdornerSvg = getAdornerLayerSvg(diagramId);
    adornerLayer = diagramAdornerSvg.getElementById(diagramId + '_diagramAdorner');
    return adornerLayer;
}
/** @private */
export function getDiagramLayer(diagramId) {
    var diagramLayer;
    var diagramLayerSvg = getDiagramLayerSvg(diagramId);
    diagramLayer = diagramLayerSvg.getElementById(diagramId + '_diagramLayer');
    return diagramLayer;
}
/** @private */
export function getPortLayerSvg(diagramId) {
    var adornerLayerSvg = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-ports-expand-layer');
    adornerLayerSvg = elementcoll[0];
    return adornerLayerSvg;
}
/** @private */
export function getNativeLayerSvg(diagramId) {
    var nativeLayerSvg;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-native-layer');
    nativeLayerSvg = elementcoll[0];
    return nativeLayerSvg;
}
/** @private */
export function getGridLayerSvg(diagramId) {
    var gridLayerSvg = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-grid-layer');
    gridLayerSvg = elementcoll[0];
    return gridLayerSvg;
}
/** @private */
export function getBackgroundLayerSvg(diagramId) {
    var gridLayerSvg = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll = diagramElement.getElementsByClassName('e-background-layer');
    return elementcoll[0].parentNode;
}
/** @private */
export function getBackgroundImageLayer(diagramId) {
    var imageLayer = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-background-image-layer');
    imageLayer = elementcoll[0];
    return imageLayer;
}
/** @private */
export function getBackgroundLayer(diagramId) {
    var imageLayer = null;
    var diagramElement = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = diagramElement.getElementsByClassName('e-background-layer');
    imageLayer = elementcoll[0];
    return imageLayer;
}
/** @private */
export function getGridLayer(diagramId) {
    var expandCollapse = null;
    var diagramGridSvg = getGridLayerSvg(diagramId);
    expandCollapse = diagramGridSvg.getElementById(diagramId + '_gridline');
    return expandCollapse;
}
// /** @private */
// export function getExpandCollapseLayer(diagramId: string): SVGElement {
//     let expandCollapse: SVGElement = null;
//     let diagramPortSvg: SVGSVGElement = getPortLayerSvg(diagramId);
//     expandCollapse = diagramPortSvg.getElementById(diagramId + '_diagramExpander') as SVGElement;
//     return expandCollapse;
// }
// /** @private */
// export function getPortsLayer(diagramId: string): SVGElement {
//     let expandCollapse: SVGElement = null;
//     let diagramPortSvg: SVGSVGElement = getPortLayerSvg(diagramId);
//     expandCollapse = diagramPortSvg.getElementById(diagramId + '_diagramPorts') as SVGElement;
//     return expandCollapse;
// }
/** @private */
export function getNativeLayer(diagramId) {
    var nativeLayer = null;
    var nativeLayerSvg = getNativeLayerSvg(diagramId);
    nativeLayer = nativeLayerSvg.getElementById(diagramId + '_nativeLayer');
    return nativeLayer;
}
/** @private */
export function getHTMLLayer(diagramId) {
    var htmlLayer = null;
    var element = getDiagramElement(diagramId);
    var elementcoll;
    elementcoll = element.getElementsByClassName('e-html-layer');
    htmlLayer = elementcoll[0];
    return htmlLayer;
}
/** @private */
export function createHtmlElement(elementType, attribute) {
    var element = createElement(elementType);
    setAttributeHtml(element, attribute);
    return element;
}
/** @private */
export function createSvgElement(elementType, attribute) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
    setAttributeSvg(element, attribute);
    return element;
}
export function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : hasClass(parent, selector)) {
            break;
        }
        parent = parent.parentNode;
    }
    return parent;
}
export function hasClass(element, className) {
    var eClassName = (typeof element.className === 'object') ? element.className.animVal : element.className;
    return ((' ' + eClassName + ' ').indexOf(' ' + className + ' ') > -1) ? true : false;
}
export function getScrollerWidth() {
    var outer = createHtmlElement('div', { 'style': 'visibility:hidden; width: 100px' });
    document.body.appendChild(outer);
    var widthNoScroll = outer.getBoundingClientRect().width;
    // force scrollbars
    outer.style.overflow = 'scroll';
    // add innerdiv
    var inner = createHtmlElement('div', { 'style': 'width:100%' });
    outer.appendChild(inner);
    var widthWithScroll = inner.getBoundingClientRect().width;
    // remove divs
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
/**
 * Handles the touch pointer.
 * @return {boolean}
 * @private
 */
export function addTouchPointer(touchList, e, touches) {
    touchList = [];
    for (var i = 0, length_1 = touches.length; i < length_1; i++) {
        touchList.push({ pageX: touches[i].clientX, pageY: touches[i].clientY, pointerId: null });
    }
    return touchList;
}
/**
 * removes the element from dom
 * @param elementId
 */
export function removeElement(elementId, contentId) {
    var div = getDiagramElement(elementId, contentId);
    if (div) {
        div.parentNode.removeChild(div);
    }
}
export function getContent(element, isHtml) {
    var div;
    if (isHtml) {
        var attr = { 'style': 'height: 100%; width: 100%' };
        div = createHtmlElement('div', attr);
    }
    else {
        div = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    }
    var node = getElement(element);
    var content = '';
    var sentNode = {};
    if (node instanceof Node) {
        sentNode = node;
        var blazor = 'Blazor';
        if (window[blazor]) {
            sentNode = {};
            var id = 'id';
            var height = 'height';
            var width = 'width';
            var offsetX = 'offsetX';
            var offsetY = 'offsetY';
            var text = 'content';
            var annotations = 'annotations';
            var addInfo = 'addInfo';
            content = node[id] + 'content_diagram';
            sentNode[id] = node[id];
            sentNode[height] = node[height];
            sentNode[width] = node[width];
            sentNode[offsetX] = node[offsetX];
            sentNode[offsetY] = node[offsetY];
            sentNode[addInfo] = node[addInfo];
            if (node.annotations && node.annotations.length > 0) {
                sentNode[annotations] = [];
                for (var i = 0; i < node.annotations.length; i++) {
                    sentNode[annotations][i] = { content: node.annotations[i][text] };
                }
            }
        }
    }
    else {
        sentNode = node;
        content = element.diagramId + 'template_diagram';
    }
    var item;
    if (typeof element.content === 'string') {
        var template = document.getElementById(element.content);
        if (template) {
            div.appendChild(template);
        }
        else {
            var compiledString = void 0;
            compiledString = compile(element.content);
            for (var _i = 0, _a = compiledString(sentNode, null, null, content); _i < _a.length; _i++) {
                item = _a[_i];
                div.appendChild(item);
            }
        }
    }
    else {
        div.appendChild(element.content);
    }
    return isHtml ? div.cloneNode(true) : div.cloneNode(true);
}
/** @private */
export function setAttributeSvg(svg, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0; i < keys.length; i++) {
        svg.setAttribute(keys[i], attributes[keys[i]]);
    }
}
/** @private */
export function setAttributeHtml(element, attributes) {
    var keys = Object.keys(attributes);
    for (var i = 0; i < keys.length; i++) {
        element.setAttribute(keys[i], attributes[keys[i]]);
    }
}
/** @private */
export function createMeasureElements() {
    var measureElement = 'measureElement';
    if (!window[measureElement]) {
        var divElement = createHtmlElement('div', {
            id: 'measureElement',
            style: 'visibility:hidden ; height: 0px ; width: 0px; overflow: hidden;'
        });
        var text = createHtmlElement('span', { 'style': 'display:inline-block ; line-height: normal' });
        divElement.appendChild(text);
        var imageElement = void 0;
        imageElement = createHtmlElement('img', {});
        divElement.appendChild(imageElement);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
        divElement.appendChild(svg);
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svg.appendChild(element);
        var data = document.createTextNode('');
        var tSpan = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tSpan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
        svg.appendChild(tSpan);
        window[measureElement] = divElement;
        window[measureElement].usageCount = 1;
        document.body.appendChild(divElement);
        var measureElementCount = 'measureElementCount';
        if (!window[measureElementCount]) {
            window[measureElementCount] = 1;
        }
        else {
            window[measureElementCount]++;
        }
    }
    else {
        window[measureElement].usageCount += 1;
    }
}
/** @private */
export function setChildPosition(temp, childNodes, i, options) {
    if (childNodes.length > 1 && temp.x === 0 &&
        (options.textOverflow === 'Clip' || options.textOverflow === 'Ellipsis') &&
        options.textWrapping === 'Wrap') {
        temp.x = childNodes[i - 1] ? childNodes[i - 1].x : -(temp.width / 2);
        return temp.x;
    }
    return temp.x;
}
