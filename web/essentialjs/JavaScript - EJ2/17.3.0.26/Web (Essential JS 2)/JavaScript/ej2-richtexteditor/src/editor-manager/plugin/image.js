import { createElement, isNullOrUndefined, detach, closest, addClass, removeClass, select, Browser } from '@syncfusion/ej2-base';
import * as CONSTANT from './../base/constant';
import * as classes from './../base/classes';
import { InsertHtml } from './inserthtml';
/**
 * Link internal component

 */
var ImageCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin

     */
    function ImageCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ImageCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.IMAGE, this.imageCommand, this);
    };
    ImageCommand.prototype.imageCommand = function (e) {
        switch (e.value.toString().toLocaleLowerCase()) {
            case 'image':
            case 'replace':
                this.createImage(e);
                break;
            case 'insertlink':
                this.insertImageLink(e);
                break;
            case 'openimagelink':
                this.openImageLink(e);
                break;
            case 'editimagelink':
                this.editImageLink(e);
                break;
            case 'removeimagelink':
                this.removeImageLink(e);
                break;
            case 'remove':
                this.removeImage(e);
                break;
            case 'alttext':
                this.insertAltTextImage(e);
                break;
            case 'dimension':
                this.imageDimension(e);
                break;
            case 'caption':
                this.imageCaption(e);
                break;
            case 'justifyleft':
                this.imageJustifyLeft(e);
                break;
            case 'justifycenter':
                this.imageJustifyCenter(e);
                break;
            case 'justifyright':
                this.imageJustifyRight(e);
                break;
            case 'inline':
                this.imageInline(e);
                break;
            case 'break':
                this.imageBreak(e);
                break;
        }
    };
    ImageCommand.prototype.createImage = function (e) {
        if (!isNullOrUndefined(e.item.selectParent) && e.item.selectParent[0].tagName === 'IMG') {
            var imgEle = e.item.selectParent[0];
            imgEle.setAttribute('src', e.item.url);
            imgEle.setAttribute('alt', e.item.altText);
        }
        else {
            var imgElement = createElement('img', {
                className: 'e-rte-image ' + e.item.cssClass, attrs: {
                    width: (isNullOrUndefined(e.item.width) || isNullOrUndefined(e.item.width.width)) ? 'auto' :
                        e.item.width.width,
                    height: (isNullOrUndefined(e.item.height) || isNullOrUndefined(e.item.height.height)) ? 'auto' :
                        e.item.height.height,
                    alt: (e.item.altText !== '') ? e.item.altText : ''
                }
            });
            imgElement.setAttribute('src', isNullOrUndefined(e.item.url) ? '' : e.item.url);
            imgElement.style.minWidth = (isNullOrUndefined(e.item.width) || isNullOrUndefined(e.item.width.minWidth)) ? 0 + 'px' :
                e.item.width.minWidth + 'px';
            imgElement.style.maxWidth = (isNullOrUndefined(e.item.width) || isNullOrUndefined(e.item.width.maxWidth)) ? null :
                e.item.width.maxWidth + 'px';
            imgElement.style.minHeight = (isNullOrUndefined(e.item.height) || isNullOrUndefined(e.item.height.minHeight)) ? 0 + 'px' :
                e.item.height.minHeight + 'px';
            imgElement.style.maxHeight = (isNullOrUndefined(e.item.height) || isNullOrUndefined(e.item.height.maxHeight)) ? null :
                e.item.height.maxHeight + 'px';
            if (!isNullOrUndefined(e.item.selection)) {
                e.item.selection.restore();
            }
            if (!isNullOrUndefined(e.selector) && e.selector === 'pasteCleanupModule') {
                e.callBack({ requestType: 'Image',
                    editorMode: 'HTML',
                    event: e.event,
                    range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                    elements: [imgElement]
                });
            }
            else {
                InsertHtml.Insert(this.parent.currentDocument, imgElement, this.parent.editableElement);
            }
        }
        if (e.callBack && (isNullOrUndefined(e.selector) || !isNullOrUndefined(e.selector) && e.selector !== 'pasteCleanupModule')) {
            e.callBack({
                requestType: 'Image',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    ImageCommand.prototype.insertImageLink = function (e) {
        var anchor = createElement('a', {
            attrs: {
                href: e.item.url
            }
        });
        if (e.item.selectNode[0].parentElement.classList.contains('e-img-wrap')) {
            e.item.selection.restore();
            anchor.setAttribute('contenteditable', 'true');
        }
        anchor.appendChild(e.item.selectNode[0]);
        if (!isNullOrUndefined(e.item.target)) {
            anchor.setAttribute('target', e.item.target);
        }
        InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.openImageLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    ImageCommand.prototype.removeImageLink = function (e) {
        var selectParent = e.item.selectParent[0];
        if (selectParent.classList.contains('e-img-caption')) {
            var capImgWrap = select('.e-img-wrap', selectParent);
            var textEle = select('.e-img-inner', selectParent);
            var newTextEle = textEle.cloneNode(true);
            detach(select('a', selectParent));
            detach(textEle);
            capImgWrap.appendChild(e.item.insertElement);
            capImgWrap.appendChild(newTextEle);
        }
        else {
            detach(selectParent);
            if (Browser.isIE) {
                e.item.selection.restore();
            }
            InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.editImageLink = function (e) {
        e.item.selectNode[0].parentElement.href = e.item.url;
        if (isNullOrUndefined(e.item.target)) {
            e.item.selectNode[0].parentElement.removeAttribute('target');
        }
        else {
            e.item.selectNode[0].parentElement.target = e.item.target;
        }
        this.callBack(e);
    };
    ImageCommand.prototype.removeImage = function (e) {
        if (closest(e.item.selectNode[0], 'a')) {
            detach(closest(e.item.selectNode[0], 'a'));
        }
        else if (!isNullOrUndefined(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION))) {
            detach(closest(e.item.selectNode[0], '.' + classes.CLASS_CAPTION));
        }
        else {
            detach(e.item.selectNode[0]);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.insertAltTextImage = function (e) {
        e.item.selectNode[0].setAttribute('alt', e.item.altText);
        this.callBack(e);
    };
    ImageCommand.prototype.imageDimension = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.style.height = '';
        selectNode.style.width = '';
        selectNode.width = e.item.width;
        selectNode.height = e.item.height;
        this.callBack(e);
    };
    ImageCommand.prototype.imageCaption = function (e) {
        InsertHtml.Insert(this.parent.currentDocument, e.item.insertElement, this.parent.editableElement);
        this.callBack(e);
    };
    ImageCommand.prototype.imageJustifyLeft = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], 'e-rte-image');
        if (!isNullOrUndefined(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
        }
        if (selectNode.parentElement.nodeName === 'A') {
            removeClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
            addClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
        }
        else {
            addClass([selectNode], classes.CLASS_IMAGE_LEFT);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageJustifyCenter = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], 'e-rte-image');
        if (!isNullOrUndefined(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
        }
        if (selectNode.parentElement.nodeName === 'A') {
            removeClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
            removeClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
            addClass([selectNode.parentElement], classes.CLASS_IMAGE_CENTER);
            addClass([selectNode], classes.CLASS_IMAGE_CENTER);
        }
        else {
            addClass([selectNode], classes.CLASS_IMAGE_CENTER);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageJustifyRight = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], 'e-rte-image');
        if (!isNullOrUndefined(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
        }
        if (selectNode.parentElement.nodeName === 'A') {
            removeClass([selectNode.parentElement], classes.CLASS_IMAGE_LEFT);
            addClass([selectNode.parentElement], classes.CLASS_IMAGE_RIGHT);
        }
        else {
            addClass([selectNode], classes.CLASS_IMAGE_RIGHT);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageInline = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], 'e-rte-image');
        addClass([selectNode], classes.CLASS_IMAGE_INLINE);
        if (!isNullOrUndefined(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.imageBreak = function (e) {
        var selectNode = e.item.selectNode[0];
        selectNode.removeAttribute('class');
        addClass([selectNode], classes.CLASS_IMAGE_BREAK);
        addClass([selectNode], 'e-rte-image');
        if (!isNullOrUndefined(closest(selectNode, '.' + classes.CLASS_CAPTION))) {
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_CAPTION_INLINE);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_CENTER);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_LEFT);
            removeClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_RIGHT);
            addClass([closest(selectNode, '.' + classes.CLASS_CAPTION)], classes.CLASS_IMAGE_BREAK);
        }
        this.callBack(e);
    };
    ImageCommand.prototype.callBack = function (e) {
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
    return ImageCommand;
}());
export { ImageCommand };
