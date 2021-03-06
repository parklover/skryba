import { createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { splitArrayCollection, processPathData } from '@syncfusion/ej2-drawings';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**

 */
var Signature = /** @class */ (function () {
    /**
     * @private
     */
    function Signature(pdfViewer, pdfViewerBase) {
        // tslint:disable-next-line
        this.newObject = [];
        /**
         * @private
         */
        this.outputString = '';
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     */
    Signature.prototype.createSignaturePanel = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var dialogDiv = createElement('div', { id: elementID + '_signature_window', className: 'e-pv-signature-window' });
        dialogDiv.style.display = 'block';
        this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
        var appearanceTab = this.createSignatureCanvas();
        if (this.signatureDialog) {
            this.signatureDialog.content = appearanceTab;
        }
        else {
            this.signatureDialog = new Dialog({
                showCloseIcon: true, closeOnEscape: false, isModal: true, header: this.pdfViewer.localeObj.getConstant('Draw Signature'),
                target: this.pdfViewer.element, content: appearanceTab, width: '750px', visible: true,
                beforeClose: function () {
                    _this.clearSignatureCanvas();
                    _this.signatureDialog.destroy();
                    _this.signatureDialog = null;
                    // tslint:disable-next-line
                    var signatureWindow = document.getElementById(_this.pdfViewer.element.id + '_signature_window');
                    if (signatureWindow) {
                        signatureWindow.remove();
                    }
                }
            });
            this.signatureDialog.buttons = [
                // tslint:disable-next-line:max-line-length
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Clear'), disabled: true, cssClass: 'e-pv-clearbtn' }, click: this.clearSignatureCanvas.bind(this) },
                // tslint:disable-next-line:max-line-length
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.closeSignaturePanel.bind(this) },
                // tslint:disable-next-line:max-line-length
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Create'), isPrimary: true, disabled: true, cssClass: 'e-pv-createbtn' }, click: this.addSignature.bind(this) },
            ];
            this.signatureDialog.appendTo(dialogDiv);
        }
    };
    Signature.prototype.addSignature = function () {
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var annot;
        if (this.pdfViewerBase.isToolbarSignClicked) {
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.isSignatureAdded = true;
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var currentLeft = 0;
            var currentTop = 0;
            // tslint:disable-next-line:max-line-length
            var currentWidth = this.pdfViewer.handWrittenSignatureSettings.width ? this.pdfViewer.handWrittenSignatureSettings.width : 100;
            // tslint:disable-next-line:max-line-length
            var currentHeight = this.pdfViewer.handWrittenSignatureSettings.height ? this.pdfViewer.handWrittenSignatureSettings.height : 100;
            // tslint:disable-next-line:max-line-length
            var thickness = this.pdfViewer.handWrittenSignatureSettings.thickness ? this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
            // tslint:disable-next-line:max-line-length
            var opacity = this.pdfViewer.handWrittenSignatureSettings.opacity ? this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
            // tslint:disable-next-line:max-line-length
            var strokeColor = this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
            currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (currentWidth / 2)) / zoomvalue;
            // tslint:disable-next-line:max-line-length
            currentTop = ((parseFloat(pageDiv.style.height) / 2) - (currentHeight / 2)) / zoomvalue;
            annot = {
                // tslint:disable-next-line:max-line-length
                id: 'sign' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: this.outputString,
                shapeAnnotationType: 'HandWrittenSignature', opacity: opacity, strokeColor: strokeColor, thickness: thickness,
            };
            this.hideSignaturePanel();
            this.pdfViewerBase.currentSignatureAnnot = annot;
            this.pdfViewerBase.isToolbarSignClicked = false;
        }
        else {
            this.pdfViewer.formFieldsModule.drawSignature();
            this.hideSignaturePanel();
        }
    };
    Signature.prototype.hideSignaturePanel = function () {
        if (this.signatureDialog) {
            this.signatureDialog.hide();
        }
    };
    // tslint:disable-next-line
    Signature.prototype.createSignatureCanvas = function () {
        // tslint:disable-next-line
        var previousField = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        // tslint:disable-next-line
        var field = document.getElementById(this.pdfViewer.element.id + 'Signature_appearance');
        if (previousField) {
            previousField.remove();
        }
        if (field) {
            field.remove();
        }
        // tslint:disable-next-line:max-line-length
        var appearanceDiv = createElement('div', { id: this.pdfViewer.element.id + 'Signature_appearance', className: 'e-pv-signature-apperance' });
        // tslint:disable-next-line:max-line-length
        var canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_signatureCanvas_', className: 'e-pv-signature-canvas' });
        if (this.pdfViewer.element.offsetWidth > 750) {
            canvas.width = 715;
            canvas.style.width = '715px';
        }
        else {
            canvas.width = this.pdfViewer.element.offsetWidth - 35;
            canvas.style.width = canvas.width + 'px';
        }
        canvas.height = 335;
        canvas.style.height = '335px';
        canvas.style.border = '1px dotted #bdbdbd';
        canvas.style.backgroundColor = 'white';
        canvas.addEventListener('mousedown', this.signaturePanelMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.signaturePanelMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.signaturePanelMouseUp.bind(this));
        canvas.addEventListener('mouseleave', this.signaturePanelMouseUp.bind(this));
        canvas.addEventListener('touchstart', this.signaturePanelMouseDown.bind(this));
        canvas.addEventListener('touchmove', this.signaturePanelMouseMove.bind(this));
        canvas.addEventListener('touchend', this.signaturePanelMouseUp.bind(this));
        appearanceDiv.appendChild(canvas);
        // // tslint:disable-next-line
        // let input: any = document.createElement('input');
        // input.type = 'checkbox';
        // appearanceDiv.appendChild(input);
        // // tslint:disable-next-line
        // let checkBoxObj: any = new CheckBox({ label: 'Save signature', disabled: true, checked: false });
        // checkBoxObj.appendTo(input);
        return appearanceDiv;
    };
    /**
     * @private
     */
    Signature.prototype.updateCanvasSize = function () {
        // tslint:disable-next-line
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        if (canvas && this.signatureDialog && this.signatureDialog.visible) {
            if (this.pdfViewer.element.offsetWidth > 750) {
                canvas.width = 715;
                canvas.style.width = '715px';
            }
            else {
                canvas.width = this.pdfViewer.element.offsetWidth - 35;
                canvas.style.width = canvas.width + 'px';
            }
        }
    };
    Signature.prototype.signaturePanelMouseDown = function (e) {
        if (e.type !== 'contextmenu') {
            e.preventDefault();
            this.findMousePosition(e);
            this.mouseDetection = true;
            this.oldX = this.mouseX;
            this.oldY = this.mouseY;
            this.newObject = [];
            this.enableCreateButton(false);
            this.drawMousePosition(e);
        }
    };
    Signature.prototype.enableCreateButton = function (isEnable) {
        // tslint:disable-next-line
        var createbtn = document.getElementsByClassName('e-pv-createbtn')[0];
        if (createbtn) {
            createbtn.disabled = isEnable;
        }
        // tslint:disable-next-line
        var clearbtn = document.getElementsByClassName('e-pv-clearbtn')[0];
        if (clearbtn) {
            clearbtn.disabled = isEnable;
        }
    };
    Signature.prototype.signaturePanelMouseMove = function (e) {
        if (this.mouseDetection) {
            this.findMousePosition(e);
            this.drawMousePosition(e);
        }
    };
    Signature.prototype.findMousePosition = function (event) {
        var offsetX;
        var offsetY;
        if (event.type.indexOf('touch') !== -1) {
            event = event;
            var element = event.target;
            // tslint:disable-next-line
            var currentRect = element.getBoundingClientRect();
            this.mouseX = event.touches[0].pageX - currentRect.left;
            this.mouseY = event.touches[0].pageY - currentRect.top;
        }
        else {
            event = event;
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
        }
    };
    Signature.prototype.drawMousePosition = function (event) {
        if (this.mouseDetection) {
            this.drawSignatureInCanvas();
            this.oldX = this.mouseX;
            this.oldY = this.mouseY;
        }
    };
    Signature.prototype.drawSignatureInCanvas = function () {
        // tslint:disable-next-line
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        // tslint:disable-next-line
        var context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(this.oldX, this.oldY);
        context.lineTo(this.mouseX, this.mouseY);
        context.stroke();
        context.lineWidth = 2;
        context.arc(this.oldX, this.oldY, 2 / 2, 0, Math.PI * 2, true);
        context.closePath();
        this.newObject.push(this.mouseX, this.mouseY);
    };
    Signature.prototype.signaturePanelMouseUp = function () {
        if (this.mouseDetection) {
            this.convertToPath(this.newObject);
        }
        this.mouseDetection = false;
    };
    // tslint:disable-next-line
    Signature.prototype.convertToPath = function (newObject) {
        this.movePath(newObject[0], newObject[1]);
        this.linePath(newObject[0], newObject[1]);
        for (var n = 2; n < newObject.length; n = n + 2) {
            this.linePath(newObject[n], newObject[n + 1]);
        }
    };
    Signature.prototype.linePath = function (x, y) {
        this.outputString += 'L' + x + ',' + y + ' ';
    };
    Signature.prototype.movePath = function (x, y) {
        this.outputString += 'M' + x + ',' + y + ' ';
    };
    Signature.prototype.clearSignatureCanvas = function () {
        this.outputString = '';
        this.newObject = [];
        // tslint:disable-next-line
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        // tslint:disable-next-line
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.enableCreateButton(true);
    };
    Signature.prototype.closeSignaturePanel = function () {
        this.clearSignatureCanvas();
        this.signatureDialog.hide();
    };
    /**
     * @private
     */
    Signature.prototype.saveSignature = function () {
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        // tslint:disable-next-line
        var annotations = new Array();
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[j] = [];
        }
        if (storeObject) {
            var annotationCollection = JSON.parse(storeObject);
            for (var i = 0; i < annotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = annotationCollection[i];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        // tslint:disable-next-line:max-line-length
                        var strokeColorString = pageAnnotationObject.annotations[z].strokeColor;
                        pageAnnotationObject.annotations[z].strokeColor = JSON.stringify(this.getRgbCode(strokeColorString));
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(pageAnnotationObject.annotations[z].bounds);
                        // tslint:disable-next-line
                        var collectionData = processPathData(pageAnnotationObject.annotations[z].data);
                        // tslint:disable-next-line
                        var csData = splitArrayCollection(collectionData);
                        pageAnnotationObject.annotations[z].data = JSON.stringify(csData);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    // tslint:disable-next-line
    Signature.prototype.getRgbCode = function (colorString) {
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            var colorpick = new ColorPicker();
            colorString = colorpick.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        // tslint:disable-next-line:radix
        var r = parseInt(stringArray[0].split('(')[1]);
        // tslint:disable-next-line:radix
        var g = parseInt(stringArray[1]);
        // tslint:disable-next-line:radix
        var b = parseInt(stringArray[2]);
        // tslint:disable-next-line:radix
        var a = parseInt(stringArray[3]);
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @private
     */
    Signature.prototype.renderSignature = function (left, top) {
        var annot;
        // tslint:disable-next-line
        var currentAnnotation = this.pdfViewerBase.currentSignatureAnnot;
        if (currentAnnotation) {
            annot = {
                // tslint:disable-next-line:max-line-length
                id: currentAnnotation.id, bounds: { x: left, y: top, width: currentAnnotation.bounds.width, height: currentAnnotation.bounds.height }, pageIndex: currentAnnotation.pageIndex, data: currentAnnotation.data,
                shapeAnnotationType: 'HandWrittenSignature', opacity: currentAnnotation.opacity, strokeColor: currentAnnotation.strokeColor, thickness: currentAnnotation.thickness,
            };
            this.pdfViewer.add(annot);
            // tslint:disable-next-line
            var canvass = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + currentAnnotation.pageIndex);
            // tslint:disable-next-line
            this.pdfViewer.renderDrawing(canvass, currentAnnotation.pageIndex);
            this.storeSignatureData(currentAnnotation.pageIndex, annot);
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.signatureCount++;
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Signature.prototype.storeSignatureData = function (pageNumber, annotations) {
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(annotations.pageIndex, null, annotations, 'Addition', '', annotations, annotations);
        var annotation = null;
        var left = annotations.bounds.left ? annotations.bounds.left : annotations.bounds.x;
        var top = annotations.bounds.top ? annotations.bounds.top : annotations.bounds.y;
        if (annotations.wrapper && annotations.wrapper.bounds) {
            left = annotations.wrapper.bounds.left;
            top = annotations.wrapper.bounds.top;
        }
        annotation = {
            // tslint:disable-next-line:max-line-length
            id: annotations.id, bounds: { left: left, top: top, width: annotations.bounds.width, height: annotations.bounds.height }, shapeAnnotationType: 'Signature', opacity: annotations.opacity, thickness: annotations.thickness, strokeColor: annotations.strokeColor, pageIndex: annotations.pageIndex, data: annotations.data
        };
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        var index = 0;
        if (!storeObject) {
            var shapeAnnotation = { pageIndex: pageNumber, annotations: [] };
            shapeAnnotation.annotations.push(annotation);
            index = shapeAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(shapeAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
        }
        else {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sign');
            var pageIndex = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[pageIndex]) {
                annotObject[pageIndex].annotations.push(annotation);
                index = annotObject[pageIndex].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Signature.prototype.modifySignatureCollection = function (property, pageNumber, annotationBase) {
        this.pdfViewerBase.isDocumentEdited = true;
        var currentAnnotObject = null;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[i].id) {
                    if (property === 'bounds') {
                        // tslint:disable-next-line:max-line-length
                        pageAnnotations[i].bounds = { left: annotationBase.wrapper.bounds.left, top: annotationBase.wrapper.bounds.top, width: annotationBase.bounds.width, height: annotationBase.bounds.height };
                    }
                    else if (property === 'stroke') {
                        pageAnnotations[i].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                        var date = new Date();
                    }
                    else if (property === 'opacity') {
                        pageAnnotations[i].opacity = annotationBase.wrapper.children[0].style.opacity;
                        var date = new Date();
                    }
                    else if (property === 'thickness') {
                        pageAnnotations[i].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                        var date = new Date();
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                }
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    };
    // tslint:disable-next-line
    Signature.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        // tslint:disable-next-line
        var annotationCollection;
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = shapeAnnotations;
            }
        }
        else {
            annotationCollection = shapeAnnotations;
        }
        return annotationCollection;
    };
    Signature.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sign');
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
        }
    };
    /**
     * @private
     */
    Signature.prototype.showSignatureDialog = function (isShow) {
        if (isShow) {
            this.createSignaturePanel();
        }
    };
    /**
     * @private
     */
    Signature.prototype.setAnnotationMode = function () {
        this.pdfViewerBase.isToolbarSignClicked = true;
        this.showSignatureDialog(true);
    };
    /**
     * @private
     */
    Signature.prototype.destroy = function () {
        window.sessionStorage.removeItem('_annotations_sign');
    };
    return Signature;
}());
export { Signature };
