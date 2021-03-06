import { NodeSelection } from './../../selection/index';
import { NodeCutter } from './nodecutter';
import * as CONSTANT from './../base/constant';
import { detach, Browser, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { InsertMethods } from './insert-methods';
/**
 * Insert a HTML Node or Text

 */
var InsertHtml = /** @class */ (function () {
    function InsertHtml() {
    }
    InsertHtml.Insert = function (docElement, insertNode, editNode) {
        var node;
        if (typeof insertNode === 'string') {
            var divNode = document.createElement('div');
            divNode.innerHTML = insertNode;
            node = divNode.firstChild;
        }
        else {
            node = insertNode;
        }
        var nodeSelection = new NodeSelection();
        var nodeCutter = new NodeCutter();
        var range = nodeSelection.getRange(docElement);
        var isCollapsed = range.collapsed;
        var nodes = nodeSelection.getInsertNodeCollection(range);
        var closestParentNode = (node.nodeName.toLowerCase() === 'table') ? this.closestEle(nodes[0].parentNode, editNode) : nodes[0];
        if (editNode !== range.startContainer && ((!isCollapsed && !(closestParentNode.nodeType === Node.ELEMENT_NODE &&
            CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) !== -1))
            || (node.nodeName.toLowerCase() === 'table' && closestParentNode &&
                CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) === -1))) {
            var preNode = nodeCutter.GetSpliceNode(range, closestParentNode);
            var sibNode = preNode.previousSibling;
            var parentNode = preNode.parentNode;
            if (nodes.length === 1) {
                nodeSelection.setSelectionContents(docElement, preNode);
                range = nodeSelection.getRange(docElement);
            }
            else {
                var lasNode = nodeCutter.GetSpliceNode(range, nodes[nodes.length - 1].parentElement);
                lasNode = isNOU(lasNode) ? preNode : lasNode;
                nodeSelection.setSelectionText(docElement, preNode, lasNode, 0, (lasNode.nodeType === 3) ?
                    lasNode.textContent.length : lasNode.childNodes.length);
                range = nodeSelection.getRange(docElement);
            }
            range.extractContents();
            if (insertNode.tagName === 'TABLE') {
                this.removeEmptyElements(editNode);
            }
            for (var index = 0; index < nodes.length; index++) {
                if (nodes[index].nodeType !== 3 && nodes[index].parentNode != null) {
                    if (nodes[index].nodeName === 'IMG') {
                        continue;
                    }
                    nodes[index].parentNode.removeChild(nodes[index]);
                }
            }
            if (sibNode) {
                InsertMethods.AppendBefore(node, sibNode, true);
            }
            else {
                var previousNode = null;
                while (parentNode !== editNode && parentNode.firstChild &&
                    (parentNode.textContent.trim() === '')) {
                    var parentNode1 = parentNode.parentNode;
                    previousNode = parentNode;
                    parentNode = parentNode1;
                }
                if (previousNode !== null) {
                    parentNode = previousNode;
                }
                if (parentNode.firstChild && parentNode.contentEditable !== 'true') {
                    if (parentNode.textContent.trim() === '') {
                        InsertMethods.AppendBefore(node, parentNode, false);
                        detach(parentNode);
                    }
                    else {
                        InsertMethods.AppendBefore(node, parentNode.firstChild, false);
                    }
                }
                else {
                    parentNode.appendChild(node);
                }
            }
            if (node.nodeType !== 3) {
                nodeSelection.setSelectionText(docElement, node, node, 0, node.childNodes.length);
            }
            else {
                nodeSelection.setSelectionText(docElement, node, node, 0, node.textContent.length);
            }
        }
        else {
            range.deleteContents();
            if (Browser.isIE) {
                var frag = docElement.createDocumentFragment();
                frag.appendChild(node);
                range.insertNode(frag);
            }
            else {
                range.insertNode(node);
            }
            if (node.nodeType !== 3 && node.childNodes.length > 0) {
                nodeSelection.setSelectionText(docElement, node, node, 1, 1);
            }
            else if (node.nodeType !== 3) {
                nodeSelection.setSelectionContents(docElement, node);
            }
            else {
                nodeSelection.setSelectionText(docElement, node, node, node.textContent.length, node.textContent.length);
            }
        }
        if (!isNOU(node) && !isNOU(node.classList) && node.classList.contains('pasteContent')) {
            var lastNode = node.lastChild;
            while (!isNOU(lastNode) && lastNode.nodeName !== '#text' && lastNode.nodeName !== 'IMG') {
                lastNode = lastNode.lastChild;
            }
            lastNode = isNOU(lastNode) ? node : lastNode;
            nodeSelection.setSelectionText(docElement, lastNode, lastNode, lastNode.textContent.length, lastNode.textContent.length);
        }
    };
    InsertHtml.findDetachEmptyElem = function (element) {
        var removableElement;
        if (!isNOU(element.parentElement)) {
            if (element.parentElement.textContent.trim() === '' && element.parentElement.contentEditable !== 'true') {
                removableElement = this.findDetachEmptyElem(element.parentElement);
            }
            else {
                removableElement = element;
            }
        }
        else {
            removableElement = null;
        }
        return removableElement;
    };
    InsertHtml.removeEmptyElements = function (element) {
        var emptyElements = element.querySelectorAll(':empty');
        for (var i = 0; i < emptyElements.length; i++) {
            if (emptyElements[i].tagName !== 'IMG' && emptyElements[i].tagName !== 'BR') {
                var detachableElement = this.findDetachEmptyElem(emptyElements[i]);
                if (!isNOU(detachableElement)) {
                    detach(detachableElement);
                }
            }
        }
    };
    InsertHtml.closestEle = function (element, editNode) {
        var el = element;
        while (el && el.nodeType === 1) {
            if (el.parentNode === editNode ||
                (!isNOU(el.parentNode.tagName) &&
                    CONSTANT.IGNORE_BLOCK_TAGS.indexOf(el.parentNode.tagName.toLocaleLowerCase()) !== -1)) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    };
    return InsertHtml;
}());
export { InsertHtml };
