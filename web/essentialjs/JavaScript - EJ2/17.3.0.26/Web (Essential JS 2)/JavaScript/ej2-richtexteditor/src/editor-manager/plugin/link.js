import { createElement, isNullOrUndefined, closest } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import { InsertHtml } from './inserthtml';
/**
 * Link internal component

 */
var LinkCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin

     */
    function LinkCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    LinkCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.LINK, this.linkCommand, this);
    };
    LinkCommand.prototype.linkCommand = function (e) {
        switch (e.value.toString().toLocaleLowerCase()) {
            case 'createlink':
            case 'editlink':
                this.createLink(e);
                break;
            case 'openlink':
                this.openLink(e);
                break;
            case 'removelink':
                this.removeLink(e);
                break;
        }
    };
    LinkCommand.prototype.createLink = function (e) {
        var closestAnchor = (!isNullOrUndefined(e.item.selectParent) && e.item.selectParent.length > 0) &&
            closest(e.item.selectParent[0], 'a');
        closestAnchor = !isNullOrUndefined(closestAnchor) ? closestAnchor :
            (!isNullOrUndefined(e.item.selectParent) && e.item.selectParent.length > 0) ? (e.item.selectParent[0]) : null;
        if (!isNullOrUndefined(closestAnchor) && closestAnchor.tagName === 'A') {
            var anchorEle = closestAnchor;
            anchorEle.setAttribute('href', e.item.url);
            anchorEle.setAttribute('title', e.item.title);
            anchorEle.innerText = e.item.text;
            if (!isNullOrUndefined(e.item.target)) {
                anchorEle.setAttribute('target', e.item.target);
            }
            else {
                anchorEle.removeAttribute('target');
            }
            e.item.selection.setSelectionText(this.parent.currentDocument, anchorEle, anchorEle, 1, 1);
            e.item.selection.restore();
        }
        else {
            var anchor = createElement('a', {
                className: 'e-rte-anchor', attrs: {
                    href: e.item.url,
                    title: isNullOrUndefined(e.item.title) || e.item.title === '' ? e.item.url : e.item.title
                }
            });
            if (!isNullOrUndefined(e.item.target)) {
                anchor.setAttribute('target', e.item.target);
            }
            anchor.innerText = e.item.text === '' ? e.item.url : e.item.text;
            e.item.selection.restore();
            InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
            if (e.event && e.event.type === 'keydown' && (e.event.keyCode === 32
                || e.event.keyCode === 13)) {
                var startContainer = e.item.selection.range.startContainer;
                startContainer.textContent = this.removeText(startContainer.textContent, e.item.text);
            }
            else {
                var startIndex = e.item.action === 'Paste' ? anchor.childNodes[0].textContent.length : 0;
                e.item.selection.setSelectionText(this.parent.currentDocument, anchor.childNodes[0], anchor.childNodes[0], startIndex, anchor.childNodes[0].textContent.length);
            }
        }
        if (e.callBack) {
            e.callBack({
                requestType: 'Links',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    LinkCommand.prototype.removeText = function (text, val) {
        var arr = text.split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr.join(' ') + ' ';
    };
    LinkCommand.prototype.openLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    LinkCommand.prototype.removeLink = function (e) {
        this.parent.domNode.setMarker(e.item.selection);
        var closestAnchor = closest(e.item.selectParent[0], 'a');
        var selectParent = closestAnchor ? closestAnchor : e.item.selectParent[0];
        var parent = selectParent.parentNode;
        var child = [];
        for (; selectParent.firstChild; null) {
            child.push(parent.insertBefore(selectParent.firstChild, selectParent));
        }
        parent.removeChild(selectParent);
        if (child && child.length === 1) {
            e.item.selection.startContainer = e.item.selection.getNodeArray(child[child.length - 1], true);
            e.item.selection.endContainer = e.item.selection.startContainer;
        }
        e.item.selection = this.parent.domNode.saveMarker(e.item.selection);
        e.item.selection.restore();
        this.callBack(e);
    };
    LinkCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    return LinkCommand;
}());
export { LinkCommand };
