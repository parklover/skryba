import * as EVENTS from './../../common/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isIDevice, setEditFrameFocus } from '../../common/util';
/**
 * Formats internal component

 */
var Formats = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin

     */
    function Formats(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Formats.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.FORMAT_TYPE, this.applyFormats, this);
    };
    Formats.prototype.getParentNode = function (node) {
        for (; node.parentNode && node.parentNode !== this.parent.editableElement; null) {
            node = node.parentNode;
        }
        return node;
    };
    Formats.prototype.applyFormats = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var save = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.parent.domNode.setMarker(save);
        var formatsNodes = this.parent.domNode.blockNodes();
        for (var i = 0; i < formatsNodes.length; i++) {
            var parentNode = void 0;
            var replaceHTML = void 0;
            if (e.subCommand.toLowerCase() === 'blockquote') {
                parentNode = this.getParentNode(formatsNodes[i]);
                replaceHTML = this.parent.domNode.isList(parentNode) ||
                    parentNode.tagName === 'TABLE' ? parentNode.outerHTML : parentNode.innerHTML;
            }
            else {
                parentNode = formatsNodes[i];
                replaceHTML = parentNode.innerHTML;
            }
            if (e.subCommand.toLowerCase() === parentNode.tagName.toLowerCase() ||
                isNullOrUndefined(parentNode.parentNode) || parentNode.tagName === 'LI') {
                continue;
            }
            this.cleanFormats(parentNode, e.subCommand);
            var replaceTag = this.parent.domNode.createTagString(e.subCommand, parentNode, replaceHTML.replace(/>\s+</g, '><'));
            this.parent.domNode.replaceWith(parentNode, replaceTag);
        }
        this.parent.editableElement.focus();
        save = this.parent.domNode.saveMarker(save);
        if (isIDevice()) {
            setEditFrameFocus(this.parent.editableElement, e.selector);
        }
        save.restore();
        if (e.callBack) {
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Formats.prototype.cleanFormats = function (element, tagName) {
        var ignoreAttr = ['display', 'font-size', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'font-weight'];
        tagName = tagName.toLowerCase();
        for (var i = 0; i < ignoreAttr.length && (tagName !== 'p' && tagName !== 'blockquote' && tagName !== 'pre'); i++) {
            element.style.removeProperty(ignoreAttr[i]);
        }
    };
    return Formats;
}());
export { Formats };
