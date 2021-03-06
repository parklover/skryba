/**
 * Exports util methods used by RichTextEditor.
 */
import { isNullOrUndefined as isNOU, addClass, removeClass, selectAll, createElement, Browser } from '@syncfusion/ej2-base';
import * as classes from '../base/classes';
import * as model from '../models/items';
import { toolsLocale } from '../models/default-locale';
var undoRedoItems = ['Undo', 'Redo'];
export function getIndex(val, items) {
    var index = -1;
    items.some(function (item, i) {
        if (typeof item === 'string' && val === item.toLocaleLowerCase()) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
}
export function hasClass(element, className) {
    var hasClass = false;
    if (element.classList.contains(className)) {
        hasClass = true;
    }
    return hasClass;
}
export function getDropDownValue(items, value, type, returnType) {
    var data;
    var result;
    for (var k = 0; k < items.length; k++) {
        if (type === 'value' && items[k].value.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
        else if (type === 'text' && items[k].text.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
        else if (type === 'subCommand' && items[k].subCommand.toLocaleLowerCase() === value.toLocaleLowerCase()) {
            data = items[k];
            break;
        }
    }
    if (!isNOU(data)) {
        switch (returnType) {
            case 'text':
                result = data.text;
                break;
            case 'value':
                result = data.value;
                break;
            case 'iconCss':
                result = data.iconCss;
                break;
        }
    }
    return result;
}
export function isIDevice() {
    var result = false;
    if (Browser.isDevice && Browser.isIos) {
        result = true;
    }
    return result;
}
export function getFormattedFontSize(value) {
    if (isNOU(value)) {
        return '';
    }
    return value;
}
export function pageYOffset(e, parentElement, isIFrame) {
    var y = 0;
    if (isIFrame) {
        y = window.pageYOffset + parentElement.getBoundingClientRect().top + e.clientY;
    }
    else {
        y = e.pageY;
    }
    return y;
}
export function getTooltipText(item, serviceLocator) {
    var i10n = serviceLocator.getService('rteLocale');
    var itemLocale = toolsLocale[item];
    var tooltipText = i10n.getConstant(itemLocale);
    return tooltipText;
}
export function setToolbarStatus(e, isPopToolbar) {
    var dropDown = e.dropDownModule;
    var data = e.args;
    var keys = Object.keys(e.args);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        for (var j = 0; j < e.tbItems.length; j++) {
            var item = e.tbItems[j].subCommand;
            var itemStr = item && item.toLocaleLowerCase();
            if (item && (itemStr === key) || (item === 'UL' && key === 'unorderedlist') || (item === 'OL' && key === 'orderedlist')) {
                if (typeof data[key] === 'boolean') {
                    if (data[key] === true) {
                        addClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                    }
                    else {
                        removeClass([e.tbElements[j]], [classes.CLS_ACTIVE]);
                    }
                }
                else if ((typeof data[key] === 'string' || data[key] === null) &&
                    getIndex(key, e.parent.toolbarSettings.items) > -1) {
                    var value = ((data[key]) ? data[key] : '');
                    var result = '';
                    switch (key) {
                        case 'formats':
                            if (isNOU(dropDown.formatDropDown) || isPopToolbar ||
                                (!isNOU(dropDown.formatDropDown) && dropDown.formatDropDown.isDestroyed)) {
                                return;
                            }
                            var formatItems = e.parent.format.types;
                            result = getDropDownValue(formatItems, value, 'subCommand', 'text');
                            var formatContent = isNOU(e.parent.format.default) ? formatItems[0].text :
                                e.parent.format.default;
                            dropDown.formatDropDown.content = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.format.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text">'
                                + (isNOU(result) ? formatContent : result) +
                                '</span></span>');
                            dropDown.formatDropDown.dataBind();
                            break;
                        case 'alignments':
                            if (isNOU(dropDown.alignDropDown) ||
                                (!isNOU(dropDown.alignDropDown) && dropDown.alignDropDown.isDestroyed)) {
                                return;
                            }
                            var alignItems = model.alignmentItems;
                            result = getDropDownValue(alignItems, value, 'subCommand', 'iconCss');
                            dropDown.alignDropDown.iconCss = isNOU(result) ? 'e-icons e-justify-left' : result;
                            dropDown.alignDropDown.dataBind();
                            break;
                        case 'fontname':
                            if (isNOU(dropDown.fontNameDropDown) || isPopToolbar ||
                                (!isNOU(dropDown.fontNameDropDown) && dropDown.fontNameDropDown.isDestroyed)) {
                                return;
                            }
                            var fontNameItems = e.parent.fontFamily.items;
                            result = getDropDownValue(fontNameItems, value, 'value', 'text');
                            var fontNameContent = isNOU(e.parent.fontFamily.default) ? fontNameItems[0].text :
                                e.parent.fontFamily.default;
                            var name_1 = (isNOU(result) ? fontNameContent : result);
                            e.tbElements[j].title = name_1;
                            dropDown.fontNameDropDown.content = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.fontFamily.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text">'
                                + name_1 + '</span></span>');
                            dropDown.fontNameDropDown.dataBind();
                            break;
                        case 'fontsize':
                            if (isNOU(dropDown.fontSizeDropDown) ||
                                (!isNOU(dropDown.fontSizeDropDown) && dropDown.fontSizeDropDown.isDestroyed)) {
                                return;
                            }
                            var fontSizeItems = e.parent.fontSize.items;
                            var fontSizeContent = isNOU(e.parent.fontSize.default) ? fontSizeItems[1].text :
                                e.parent.fontSize.default;
                            result = getDropDownValue(fontSizeItems, (value === '' ? fontSizeContent.replace(/\s/g, '') : value), 'value', 'text');
                            dropDown.fontSizeDropDown.content = ('<span style="display: inline-flex;' +
                                'width:' + e.parent.fontSize.width + '" >' +
                                '<span class="e-rte-dropdown-btn-text">'
                                + getFormattedFontSize(result) + '</span></span>');
                            dropDown.fontSizeDropDown.dataBind();
                            break;
                    }
                }
            }
        }
    }
}
export function getCollection(items) {
    if (typeof items === 'object') {
        return items;
    }
    else {
        return [items];
    }
}
export function getTBarItemsIndex(items, toolbarItems) {
    var itemsIndex = [];
    for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < toolbarItems.length; j++) {
            if (toolbarItems[j].type === 'Separator') {
                continue;
            }
            else {
                if (items[i] === 'OrderedList' && toolbarItems[j].subCommand === 'OL') {
                    itemsIndex.push(j);
                    break;
                }
                else if (items[i] === 'UnorderedList' && toolbarItems[j].subCommand === 'UL') {
                    itemsIndex.push(j);
                    break;
                }
                else if (items[i] === toolbarItems[j].subCommand) {
                    itemsIndex.push(j);
                    break;
                }
            }
        }
    }
    return itemsIndex;
}
export function updateUndoRedoStatus(baseToolbar, undoRedoStatus) {
    var i = 0;
    var trgItems = getTBarItemsIndex(getCollection(undoRedoItems), baseToolbar.toolbarObj.items);
    var tbItems = selectAll('.' + classes.CLS_TB_ITEM, baseToolbar.toolbarObj.element);
    var keys = Object.keys(undoRedoStatus);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var target = tbItems[trgItems[i]];
        if (target) {
            baseToolbar.toolbarObj.enableItems(target, undoRedoStatus[key]);
        }
        i++;
    }
}
/**
 * To dispatch the event manually

 */
export function dispatchEvent(element, type) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(type, false, true);
    element.dispatchEvent(evt);
}
export function parseHtml(value) {
    var tempNode = createElement('template');
    tempNode.innerHTML = value;
    if (tempNode.content instanceof DocumentFragment) {
        return tempNode.content;
    }
    else {
        return document.createRange().createContextualFragment(value);
    }
}
export function getTextNodesUnder(docElement, node) {
    var nodes = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === 3) {
            nodes.push(node);
        }
        else {
            nodes = nodes.concat(getTextNodesUnder(docElement, node));
        }
    }
    return nodes;
}
export function toObjectLowerCase(obj) {
    var convertedValue = {};
    var keys = Object.keys(obj);
    for (var i = 0; i < Object.keys(obj).length; i++) {
        convertedValue[keys[i].toLocaleLowerCase()] = obj[keys[i]];
    }
    return convertedValue;
}
export function getEditValue(value, rteObj) {
    var val;
    if (value !== null && value !== '') {
        val = rteObj.enableHtmlEncode ? updateTextNode(decode(value)) : updateTextNode(value);
        rteObj.setProperties({ value: val }, true);
    }
    else {
        val = rteObj.enableHtmlEncode ? '&lt;p&gt;&lt;br/&gt;&lt;/p&gt;' : '<p><br/></p>';
    }
    return val;
}
export function updateTextNode(value) {
    var tempNode = document.createElement('div');
    tempNode.innerHTML = value;
    var childNodes = tempNode.childNodes;
    if (childNodes.length > 0) {
        [].slice.call(childNodes).forEach(function (childNode) {
            if (childNode.nodeType === Node.TEXT_NODE && childNode.parentNode === tempNode
                && childNode.textContent.trim() !== '') {
                var defaultTag = document.createElement('p');
                var parentNode = childNode.parentNode;
                parentNode.insertBefore(defaultTag, childNode);
                defaultTag.appendChild(childNode);
            }
        });
    }
    return tempNode.innerHTML;
}
export function isEditableValueEmpty(value) {
    return (value === '<p><br></p>' || value === '&lt;p&gt;&lt;br&gt;&lt;/p&gt;' || value === '') ? true : false;
}
export function decode(value) {
    return value.replace(/&amp;/g, '&').replace(/&amp;lt;/g, '<')
        .replace(/&lt;/g, '<').replace(/&amp;gt;/g, '>')
        .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/&amp;nbsp;/g, ' ').replace(/&quot;/g, '');
}
