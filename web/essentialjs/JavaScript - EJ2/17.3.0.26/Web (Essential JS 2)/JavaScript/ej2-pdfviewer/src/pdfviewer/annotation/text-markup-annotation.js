import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.

 */
var TextMarkupAnnotation = /** @class */ (function () {
    /**
     * @private
     */
    function TextMarkupAnnotation(pdfViewer, viewerBase) {
        var _this = this;
        /**
         * @private
         */
        this.currentTextMarkupAddMode = '';
        /**
         * @private
         */
        this.selectTextMarkupCurrentPage = null;
        /**
         * @private
         */
        this.currentTextMarkupAnnotation = null;
        this.currentAnnotationIndex = null;
        this.isAnnotationSelect = false;
        /**
         * @private
         */
        this.isDropletClicked = false;
        /**
         * @private
         */
        this.isRightDropletClicked = false;
        /**
         * @private
         */
        this.isLeftDropletClicked = false;
        this.isSelectionMaintained = false;
        this.isExtended = false;
        // tslint:disable-next-line
        this.maintainSelection = function (event) {
            _this.isDropletClicked = true;
            _this.pdfViewer.textSelectionModule.initiateSelectionByTouch();
            _this.isExtended = true;
            _this.pdfViewer.textSelectionModule.selectionRangeArray = [];
        };
        // tslint:disable-next-line
        this.selectionEnd = function (event) {
            if (_this.isDropletClicked) {
                _this.isDropletClicked = false;
            }
        };
        // tslint:disable-next-line
        this.annotationLeftMove = function (event) {
            if (_this.isDropletClicked) {
                _this.isLeftDropletClicked = true;
            }
        };
        // tslint:disable-next-line
        this.annotationRightMove = function (event) {
            if (_this.isDropletClicked) {
                _this.isRightDropletClicked = true;
            }
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
        this.highlightColor = pdfViewer.highlightSettings.color;
        this.underlineColor = pdfViewer.underlineSettings.color;
        this.strikethroughColor = pdfViewer.strikethroughSettings.color;
        this.highlightOpacity = pdfViewer.highlightSettings.opacity;
        this.underlineOpacity = pdfViewer.underlineSettings.opacity;
        this.strikethroughOpacity = pdfViewer.strikethroughSettings.opacity;
    }
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.createAnnotationSelectElement = function () {
        // tslint:disable-next-line:max-line-length
        this.dropDivAnnotationLeft = createElement('div', { id: this.pdfViewer.element.id + '_droplet_left', className: 'e-pv-drop' });
        this.dropDivAnnotationLeft.style.borderRight = '2px solid';
        // tslint:disable-next-line:max-line-length
        this.dropDivAnnotationRight = createElement('div', { id: this.pdfViewer.element.id + '_droplet_right', className: 'e-pv-drop' });
        this.dropDivAnnotationRight.style.borderLeft = '2px solid';
        this.dropElementLeft = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_left', });
        this.dropElementLeft.style.transform = 'rotate(0deg)';
        this.dropDivAnnotationLeft.appendChild(this.dropElementLeft);
        this.dropElementRight = createElement('div', { className: 'e-pv-droplet', id: this.pdfViewer.element.id + '_dropletspan_right' });
        this.dropElementRight.style.transform = 'rotate(-90deg)';
        this.dropDivAnnotationRight.appendChild(this.dropElementRight);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationLeft);
        this.pdfViewerBase.pageContainer.appendChild(this.dropDivAnnotationRight);
        this.dropElementLeft.style.top = '20px';
        this.dropElementRight.style.top = '20px';
        this.dropElementRight.style.left = '-8px';
        this.dropElementLeft.style.left = '-8px';
        this.dropDivAnnotationLeft.style.display = 'none';
        this.dropDivAnnotationRight.style.display = 'none';
        this.dropDivAnnotationLeft.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationLeft.addEventListener('mousemove', this.annotationLeftMove);
        this.dropDivAnnotationLeft.addEventListener('mouseup', this.selectionEnd);
        this.dropDivAnnotationRight.addEventListener('mousedown', this.maintainSelection);
        this.dropDivAnnotationRight.addEventListener('mousemove', this.annotationRightMove);
        this.dropDivAnnotationRight.addEventListener('mouseup', this.selectionEnd);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.textSelect = function (target, x, y) {
        if (this.isLeftDropletClicked) {
            var leftElement = this.dropDivAnnotationRight.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                this.updateLeftposition(clientX, clientY);
            }
        }
        else if (this.isRightDropletClicked) {
            var leftElement = this.dropDivAnnotationLeft.getBoundingClientRect();
            var clientX = x;
            var clientY = y;
            if (target.classList.contains('e-pv-text')) {
                if (clientY >= leftElement.top) {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, true);
                }
                else {
                    this.pdfViewer.textSelectionModule.textSelectionOnDrag(target, clientX, clientY, false);
                }
                this.updatePosition(clientX, clientY);
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.showHideDropletDiv = function (hide) {
        if (this.pdfViewer.enableTextMarkupResizer && this.dropDivAnnotationLeft && this.dropDivAnnotationRight) {
            if (hide) {
                this.dropDivAnnotationLeft.style.display = 'none';
                this.dropDivAnnotationRight.style.display = 'none';
            }
            else {
                this.dropDivAnnotationLeft.style.display = '';
                this.dropDivAnnotationRight.style.display = '';
            }
        }
    };
    TextMarkupAnnotation.prototype.updateAnnotationBounds = function () {
        this.isSelectionMaintained = false;
        // tslint:disable-next-line
        var annotation = this.currentTextMarkupAnnotation;
        if (annotation && annotation.bounds) {
            this.retreieveSelection(annotation, null);
            this.pdfViewer.textSelectionModule.maintainSelection(this.selectTextMarkupCurrentPage, false);
            this.isSelectionMaintained = true;
            window.getSelection().removeAllRanges();
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.retreieveSelection = function (annotation, element) {
        for (var k = 0; k < annotation.bounds.length; k++) {
            // tslint:disable-next-line
            var bound = annotation.bounds[k];
            var x = (bound.left ? bound.left : bound.Left) * this.pdfViewerBase.getZoomFactor();
            var y = (bound.top ? bound.top : bound.Top) * this.pdfViewerBase.getZoomFactor();
            var width = (bound.width ? bound.width : bound.Width) * this.pdfViewerBase.getZoomFactor();
            var height = bound.height ? bound.height : bound.Height;
            // tslint:disable-next-line
            var textDivs = this.pdfViewerBase.getElement('_textLayer_' + this.selectTextMarkupCurrentPage).childNodes;
            for (var n = 0; n < textDivs.length; n++) {
                if (textDivs[n]) {
                    // tslint:disable-next-line
                    var top_1 = parseInt(textDivs[n].style.top);
                    // tslint:disable-next-line
                    if (top_1 === parseInt(y.toString()) || (top_1 + 1) === parseInt(y.toString()) || (top_1 - 1) === parseInt(y.toString())) {
                        element = textDivs[n];
                        break;
                    }
                }
            }
            if (element != null) {
                // tslint:disable-next-line
                var boundingRect = this.pdfViewerBase.getElement('_textLayer_' + this.selectTextMarkupCurrentPage).getBoundingClientRect();
                this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left, y + boundingRect.top);
                if ((annotation.bounds.length - 1) === k) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(element, x + boundingRect.left + width, y + boundingRect.top);
                }
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.updatePosition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        // tslint:disable-next-line
        var rightDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_right');
        if (isSelected) {
            // tslint:disable-next-line:max-line-length
            rightDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            // tslint:disable-next-line:max-line-length
            rightDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        rightDivElement.style.left = x - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left + 'px';
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.updateLeftposition = function (x, y, isSelected) {
        this.showHideDropletDiv(false);
        var pageTopValue = this.pdfViewerBase.pageSize[this.pdfViewerBase.currentPageNumber - 1].top;
        var topClientValue = this.getClientValueTop(y, this.pdfViewerBase.currentPageNumber - 1);
        // tslint:disable-next-line
        var leftDivElement = document.getElementById(this.pdfViewer.element.id + '_droplet_left');
        leftDivElement.style.display = '';
        if (isSelected) {
            // tslint:disable-next-line:max-line-length
            leftDivElement.style.top = topClientValue * this.pdfViewerBase.getZoomFactor() + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        else {
            // tslint:disable-next-line:max-line-length
            leftDivElement.style.top = topClientValue + pageTopValue * this.pdfViewerBase.getZoomFactor() + 'px';
        }
        leftDivElement.style.left = x - this.pdfViewerBase.viewerContainer.getBoundingClientRect().left - 20 + 'px';
    };
    TextMarkupAnnotation.prototype.getClientValueTop = function (clientValue, pageNumber) {
        // tslint:disable-next-line:max-line-length
        return clientValue - this.pdfViewerBase.getElement('_pageDiv_' + pageNumber).getBoundingClientRect().top;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotationsInPage = function (textMarkupAnnotations, pageNumber, isImportTextMarkup) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (isImportTextMarkup) {
            this.renderTextMarkupAnnotations(null, pageNumber, canvas, this.pdfViewerBase.getZoomFactor());
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor(), true);
        }
        else {
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageNumber, canvas, this.pdfViewerBase.getZoomFactor());
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.renderTextMarkupAnnotations = function (textMarkupAnnotations, pageNumber, canvas, factor, isImportAction) {
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.setLineDash([]);
            // tslint:disable-next-line
            var annotations = void 0;
            if (!isImportAction) {
                annotations = this.getAnnotations(pageNumber, textMarkupAnnotations);
            }
            else {
                annotations = textMarkupAnnotations;
            }
            if (annotations) {
                for (var i = 0; i < annotations.length; i++) {
                    // tslint:disable-next-line
                    var annotation = annotations[i];
                    var annotationObject = null;
                    if (annotation.TextMarkupAnnotationType) {
                        // tslint:disable-next-line:max-line-length
                        annotationObject = {
                            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color, opacity: annotation.Opacity, bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
                            // tslint:disable-next-line:max-line-length
                            annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup'
                        };
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
                    }
                    // tslint:disable-next-line:max-line-length
                    var type = annotation.TextMarkupAnnotationType ? annotation.TextMarkupAnnotationType : annotation.textMarkupAnnotationType;
                    // tslint:disable-next-line
                    var annotBounds = annotation.Bounds ? annotation.Bounds : annotation.bounds;
                    var opacity = annotation.Opacity ? annotation.Opacity : annotation.opacity;
                    var color = annotation.Color ? annotation.Color : annotation.color;
                    switch (type) {
                        case 'Highlight':
                            this.renderHighlightAnnotation(annotBounds, opacity, color, context, factor);
                            break;
                        case 'Strikethrough':
                            this.renderStrikeoutAnnotation(annotBounds, opacity, color, context, factor);
                            break;
                        case 'Underline':
                            this.renderUnderlineAnnotation(annotBounds, opacity, color, context, factor);
                            break;
                    }
                }
            }
            if (pageNumber === this.selectTextMarkupCurrentPage) {
                if (!this.isAnnotationSelect) {
                    this.maintainAnnotationSelection();
                }
                else {
                    this.isAnnotationSelect = false;
                }
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.drawTextMarkupAnnotations = function (type) {
        this.isTextMarkupAnnotationMode = true;
        this.currentTextMarkupAddMode = type;
        var selectionObject = this.pdfViewer.textSelectionModule.selectionRangeArray;
        if (selectionObject.length > 0 && !this.isSelectionMaintained) {
            this.convertSelectionToTextMarkup(type, selectionObject, this.pdfViewerBase.getZoomFactor());
        }
        if (this.pdfViewer.enableTextMarkupResizer && this.isExtended && window.getSelection().toString()) {
            var pageBounds = this.getDrawnBounds();
            if (pageBounds[0] && pageBounds[0].bounds) {
                this.updateTextMarkupAnnotationBounds(pageBounds[0].bounds);
            }
        }
        else if (window.getSelection().toString()) {
            var pageBounds = this.getDrawnBounds();
            if (pageBounds.length > 0) {
                for (var i = 0; i < pageBounds.length; i++) {
                    // tslint:disable-next-line:max-line-length
                    this.drawTextMarkups(type, pageBounds[i].bounds, pageBounds[i].pageIndex, pageBounds[i].rect, this.pdfViewerBase.getZoomFactor(), pageBounds[i].textContent, pageBounds[i].startIndex, pageBounds[i].endIndex);
                }
            }
        }
        this.isExtended = false;
        this.isSelectionMaintained = false;
        // this.pdfViewerBase.annotationHelper.redoCollection = [];
        this.pdfViewer.textSelectionModule.clearTextSelection();
        if (this.pdfViewer.enableTextMarkupResizer) {
            this.updateAnnotationBounds();
        }
    };
    TextMarkupAnnotation.prototype.convertSelectionToTextMarkup = function (type, selectionObject, factor) {
        for (var i = 0; i < selectionObject.length; i++) {
            var textValue = selectionObject[i].textContent.replace(/(\r\n|\n|\r)/gm, '');
            // tslint:disable-next-line
            var indexes = void 0;
            if (selectionObject[i].startNode === selectionObject[i].endNode) {
                var parentText = document.getElementById(selectionObject[i].startNode).textContent.replace(/(\r\n|\n|\r)/gm, '');
                indexes = this.getIndexNumbers(selectionObject[i].pageNumber, textValue, parentText);
            }
            else {
                indexes = this.getIndexNumbers(selectionObject[i].pageNumber, textValue);
            }
            // tslint:disable-next-line:max-line-length
            this.drawTextMarkups(type, selectionObject[i].rectangleBounds, selectionObject[i].pageNumber, selectionObject[i].bound, factor, textValue, indexes.startIndex, indexes.endIndex);
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.updateTextMarkupAnnotationBounds = function (currentBounds) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
            var annotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                        pageAnnotations[i].bounds = currentBounds;
                    }
                }
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                this.currentTextMarkupAnnotation = null;
                this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                this.pdfViewerBase.isDocumentEdited = true;
                // tslint:disable-next-line:max-line-length
                this.currentAnnotationIndex = null;
                this.selectTextMarkupCurrentPage = null;
            }
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.drawTextMarkups = function (type, bounds, pageNumber, rect, factor, textContent, startIndex, endIndex) {
        var annotation = null;
        var context = this.getPageContext(pageNumber);
        if (context) {
            context.setLineDash([]);
            switch (type) {
                case 'Highlight':
                    // tslint:disable-next-line:max-line-length
                    annotation = this.getAddedAnnotation(type, this.highlightColor, this.highlightOpacity, bounds, this.pdfViewer.highlightSettings.author, this.pdfViewer.highlightSettings.subject, this.pdfViewer.highlightSettings.modifiedDate, '', rect, pageNumber);
                    if (annotation) {
                        this.renderHighlightAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor);
                    }
                    break;
                case 'Strikethrough':
                    // tslint:disable-next-line:max-line-length
                    annotation = this.getAddedAnnotation(type, this.strikethroughColor, this.strikethroughOpacity, bounds, this.pdfViewer.strikethroughSettings.author, this.pdfViewer.strikethroughSettings.subject, this.pdfViewer.strikethroughSettings.modifiedDate, '', rect, pageNumber);
                    if (annotation) {
                        this.renderStrikeoutAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor);
                    }
                    break;
                case 'Underline':
                    // tslint:disable-next-line:max-line-length
                    annotation = this.getAddedAnnotation(type, this.underlineColor, this.underlineOpacity, bounds, this.pdfViewer.underlineSettings.author, this.pdfViewer.underlineSettings.subject, this.pdfViewer.underlineSettings.modifiedDate, '', rect, pageNumber);
                    if (annotation) {
                        this.renderUnderlineAnnotation(annotation.bounds, annotation.opacity, annotation.color, context, factor);
                    }
                    break;
            }
            if (annotation) {
                this.pdfViewerBase.isDocumentEdited = true;
                // tslint:disable-next-line
                var settings = { opacity: annotation.opacity, color: annotation.color, author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate };
                var index = this.pdfViewer.annotationModule.actionCollection[this.pdfViewer.annotationModule.actionCollection.length - 1].index;
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.fireAnnotationAdd(pageNumber, annotation.annotName, type, annotation.bounds, settings, textContent, startIndex, endIndex);
            }
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.renderHighlightAnnotation = function (bounds, opacity, color, context, factor) {
        for (var i = 0; i < bounds.length; i++) {
            // tslint:disable-next-line
            var bound = bounds[i];
            context.beginPath();
            var x = bound.X ? bound.X : bound.left;
            var y = bound.Y ? bound.Y : bound.top;
            var width = bound.Width ? bound.Width : bound.width;
            var height = bound.Height ? bound.Height : bound.height;
            // tslint:disable-next-line:max-line-length
            context.rect((x * factor), (y * factor), (width * factor), (height * factor));
            context.globalAlpha = opacity * 0.5;
            context.closePath();
            context.fillStyle = color;
            context.msFillRule = 'nonzero';
            context.fill();
        }
        context.save();
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.renderStrikeoutAnnotation = function (bounds, opacity, color, context, factor) {
        for (var i = 0; i < bounds.length; i++) {
            // tslint:disable-next-line
            var bound = this.getProperBounds(bounds[i]);
            this.drawLine(opacity, bound.x, bound.y, bound.width, (bound.height / 2), color, factor, context);
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.renderUnderlineAnnotation = function (bounds, opacity, color, context, factor) {
        for (var i = 0; i < bounds.length; i++) {
            // tslint:disable-next-line
            var boundValues = this.getProperBounds(bounds[i]);
            this.drawLine(opacity, boundValues.x, boundValues.y, boundValues.width, boundValues.height, color, factor, context);
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getProperBounds = function (bound) {
        var x = bound.X ? bound.X : bound.left;
        var y = bound.Y ? bound.Y : bound.top;
        var width = bound.Width ? bound.Width : bound.width;
        var height = bound.Height ? bound.Height : bound.height;
        return { x: x, y: y, width: width, height: height };
    };
    // tslint:disable-next-line:max-line-length
    TextMarkupAnnotation.prototype.drawLine = function (opacity, x, y, width, height, color, factor, context) {
        context.globalAlpha = opacity;
        context.beginPath();
        context.moveTo((x * factor), (y + height) * factor);
        context.lineTo((width + x) * factor, (y + height) * factor);
        context.lineWidth = 1;
        context.strokeStyle = color;
        context.closePath();
        context.msFillRule = 'nonzero';
        context.stroke();
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.printTextMarkupAnnotations = function (textMarkupAnnotations, pageIndex, stampData, shapeData, measureShapeData, stickyData) {
        var canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_print_annotation_layer_' + pageIndex });
        canvas.style.width = 816 + 'px';
        canvas.style.height = 1056 + 'px';
        var pageWidth = this.pdfViewerBase.pageSize[pageIndex].width;
        var pageHeight = this.pdfViewerBase.pageSize[pageIndex].height;
        canvas.height = pageHeight * this.pdfViewer.magnification.zoomFactor;
        canvas.width = pageWidth * this.pdfViewer.magnification.zoomFactor;
        // tslint:disable-next-line
        var textMarkupannotations = this.getAnnotations(pageIndex, null, '_annotations_textMarkup');
        // tslint:disable-next-line
        var shapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape');
        // tslint:disable-next-line
        var measureShapeAnnotation = this.getAnnotations(pageIndex, null, '_annotations_shape_measure');
        // tslint:disable-next-line
        var stampAnnotation = this.getAnnotations(pageIndex, null, '_annotations_stamp');
        // tslint:disable-next-line
        var stickyNoteAnnotation = this.getAnnotations(pageIndex, null, '_annotations_sticky');
        if (stampAnnotation || shapeAnnotation || stickyNoteAnnotation || measureShapeAnnotation) {
            this.pdfViewer.renderDrawing(canvas, pageIndex);
        }
        else {
            this.pdfViewer.annotation.renderAnnotations(pageIndex, shapeData, measureShapeData, null, canvas);
            this.pdfViewer.annotation.stampAnnotationModule.renderStampAnnotations(stampData, pageIndex, canvas);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.renderStickyNotesAnnotations(stickyData, pageIndex, canvas);
        }
        if (textMarkupannotations) {
            this.renderTextMarkupAnnotations(null, pageIndex, canvas, 1);
        }
        else {
            this.renderTextMarkupAnnotations(textMarkupAnnotations, pageIndex, canvas, 1);
        }
        var imageSource = canvas.toDataURL();
        return imageSource;
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.saveTextMarkupAnnotations = function () {
        // tslint:disable-next-line
        var storeTextMarkupObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        // tslint:disable-next-line
        var textMarkupAnnotations = new Array();
        var textMarkupColorpick = new ColorPicker();
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            textMarkupAnnotations[j] = [];
        }
        if (storeTextMarkupObject) {
            var textMarkupAnnotationCollection = JSON.parse(storeTextMarkupObject);
            for (var i = 0; i < textMarkupAnnotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = textMarkupAnnotationCollection[i];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        // tslint:disable-next-line:max-line-length
                        pageAnnotationObject.annotations[z].bounds = JSON.stringify(this.getBoundsForSave(pageAnnotationObject.annotations[z].bounds));
                        var colorString = textMarkupColorpick.getValue(pageAnnotationObject.annotations[z].color, 'rgba');
                        pageAnnotationObject.annotations[z].color = JSON.stringify(this.getRgbCode(colorString));
                        pageAnnotationObject.annotations[z].rect = JSON.stringify(pageAnnotationObject.annotations[z].rect);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                textMarkupAnnotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(textMarkupAnnotations);
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.deleteTextMarkupAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            this.showHideDropletDiv(true);
            var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
            var deletedAnnotation = null;
            if (pageAnnotations) {
                for (var i = 0; i < pageAnnotations.length; i++) {
                    if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                        deletedAnnotation = pageAnnotations.splice(i, 1)[0];
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, deletedAnnotation, 'Text Markup Deleted', null);
                        this.currentAnnotationIndex = i;
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(deletedAnnotation, 'textMarkup');
                        var removeDiv = document.getElementById(deletedAnnotation.annotName);
                        if (removeDiv) {
                            if (removeDiv.parentElement.childElementCount === 1) {
                                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                            }
                            else {
                                removeDiv.remove();
                            }
                        }
                    }
                }
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                var annotationId = this.currentTextMarkupAnnotation.annotName;
                this.currentTextMarkupAnnotation = null;
                this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                this.pdfViewerBase.isDocumentEdited = true;
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.fireAnnotationRemove(this.selectTextMarkupCurrentPage, annotationId, deletedAnnotation.textMarkupAnnotationType);
                this.currentAnnotationIndex = null;
                this.selectTextMarkupCurrentPage = null;
                if (Browser.isDevice) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.toolbarModule.annotationToolbarModule.hideMobileAnnotationToolbar();
                    this.pdfViewer.toolbarModule.showToolbar(true);
                }
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.modifyColorProperty = function (color) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = this.modifyAnnotationProperty('Color', color, null);
            this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
            this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
            this.pdfViewerBase.isDocumentEdited = true;
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, this.currentTextMarkupAnnotation.annotName, this.currentTextMarkupAnnotation.textMarkupAnnotationType, true, false, false, false);
            this.currentAnnotationIndex = null;
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.modifyOpacityProperty = function (args, isOpacity) {
        if (this.currentTextMarkupAnnotation) {
            var pageAnnotations = void 0;
            if (isOpacity) {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', isOpacity, 'changed');
            }
            else {
                pageAnnotations = this.modifyAnnotationProperty('Opacity', args.value / 100, args.name);
            }
            if (pageAnnotations) {
                this.manageAnnotations(pageAnnotations, this.selectTextMarkupCurrentPage);
                this.pdfViewer.annotationModule.renderAnnotations(this.selectTextMarkupCurrentPage, null, null, null);
                if (isOpacity || args.name === 'changed') {
                    this.pdfViewerBase.isDocumentEdited = true;
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.fireAnnotationPropertiesChange(this.selectTextMarkupCurrentPage, this.currentTextMarkupAnnotation.annotName, this.currentTextMarkupAnnotation.textMarkupAnnotationType, false, true, false, false);
                    this.currentAnnotationIndex = null;
                }
            }
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.modifyAnnotationProperty = function (property, value, status, annotName) {
        var pageAnnotations = this.getAnnotations(this.selectTextMarkupCurrentPage, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                    var date = new Date();
                    if (property === 'Color') {
                        pageAnnotations[i].color = value;
                    }
                    else {
                        pageAnnotations[i].opacity = value;
                    }
                    pageAnnotations[i].modifiedDate = date.toLocaleString();
                    this.currentAnnotationIndex = i;
                    if (status === null || status === 'changed') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotationModule.addAction(this.selectTextMarkupCurrentPage, i, this.currentTextMarkupAnnotation, 'Text Markup Property modified', property);
                    }
                    this.currentTextMarkupAnnotation = pageAnnotations[i];
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(pageAnnotations[i]);
                }
            }
        }
        return pageAnnotations;
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.undoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[index], 'textMarkup');
                // tslint:disable-next-line
                var removeDiv = document.getElementById(pageAnnotations[index].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.remove();
                    }
                }
                pageAnnotations.splice(index, 1);
            }
            else if (action === 'Text Markup Deleted') {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType);
                pageAnnotations.splice(index, 0, annotation);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.isDocumentEdited = true;
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    TextMarkupAnnotation.prototype.undoRedoPropertyChange = function (annotation, pageNumber, index, property, isUndoAction) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (property === 'Color') {
                var tempColor = pageAnnotations[index].color;
                pageAnnotations[index].color = annotation.color;
                annotation.color = tempColor;
            }
            else {
                var tempOpacity = pageAnnotations[index].opacity;
                pageAnnotations[index].opacity = annotation.opacity;
                annotation.opacity = tempOpacity;
            }
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotation, null, true);
            if (isUndoAction) {
                annotation.modifiedDate = new Date().toLocaleString();
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.isDocumentEdited = true;
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
        return annotation;
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.redoTextMarkupAction = function (annotation, pageNumber, index, action) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            if (action === 'Text Markup Added') {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(pageNumber, annotation.shapeAnnotationType);
                pageAnnotations.push(annotation);
            }
            else if (action === 'Text Markup Deleted') {
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(pageAnnotations[index], 'textMarkup');
                // tslint:disable-next-line
                var removeDiv = document.getElementById(pageAnnotations[index].annotName);
                if (removeDiv) {
                    if (removeDiv.parentElement.childElementCount === 1) {
                        this.pdfViewer.annotationModule.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                    }
                    else {
                        removeDiv.remove();
                    }
                }
                pageAnnotations.splice(index, 1);
            }
        }
        this.clearCurrentAnnotation();
        this.pdfViewerBase.isDocumentEdited = true;
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.saveNoteContent = function (pageNumber, note) {
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (JSON.stringify(this.currentTextMarkupAnnotation) === JSON.stringify(pageAnnotations[i])) {
                    pageAnnotations[i].note = note;
                }
            }
        }
        this.manageAnnotations(pageAnnotations, pageNumber);
        this.pdfViewerBase.isDocumentEdited = true;
    };
    TextMarkupAnnotation.prototype.clearCurrentAnnotation = function () {
        if (!this.isExtended) {
            this.selectTextMarkupCurrentPage = null;
            this.currentTextMarkupAnnotation = null;
            var isSkip = false;
            // tslint:disable-next-line:max-line-length
            if (this.pdfViewer.annotation.freeTextAnnotationModule && this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus) {
                isSkip = true;
            }
            if (!isSkip) {
                this.enableAnnotationPropertiesTool(false);
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.clearCurrentAnnotationSelection = function (pageNumber, isSelect) {
        if (isSelect) {
            this.isAnnotationSelect = true;
        }
        else {
            this.isAnnotationSelect = false;
        }
        var lowerPageIndex = (pageNumber - 2) >= 0 ? (pageNumber - 2) : 0;
        // tslint:disable-next-line:max-line-length
        var higherPageIndex = (pageNumber + 2) < this.pdfViewerBase.pageCount ? (pageNumber + 2) : this.pdfViewerBase.pageCount - 1;
        for (var k = lowerPageIndex; k <= higherPageIndex; k++) {
            this.clearAnnotationSelection(k);
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getBoundsForSave = function (bounds) {
        // tslint:disable-next-line
        var newArray = [];
        for (var i = 0; i < bounds.length; i++) {
            var left = bounds[i].left ? bounds[i].left : bounds[i].Left;
            var top_2 = bounds[i].top ? bounds[i].top : bounds[i].Top;
            var height = bounds[i].height ? bounds[i].height : bounds[i].Height;
            var width = bounds[i].width ? bounds[i].width : bounds[i].Width;
            newArray.push({ left: left, top: top_2, width: width, height: height });
        }
        return newArray;
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getRgbCode = function (colorString) {
        var markupStringArray = colorString.split(',');
        // tslint:disable-next-line:radix
        var textMarkupR = parseInt(markupStringArray[0].split('(')[1]);
        // tslint:disable-next-line:radix
        var textMarkupG = parseInt(markupStringArray[1]);
        // tslint:disable-next-line:radix
        var textMarkupB = parseInt(markupStringArray[2]);
        // tslint:disable-next-line:radix
        var textMarkupA = parseInt(markupStringArray[3]);
        return { a: textMarkupA * 255, r: textMarkupR, g: textMarkupG, b: textMarkupB };
    };
    TextMarkupAnnotation.prototype.getDrawnBounds = function () {
        var pageBounds = [];
        var selection = window.getSelection();
        if (selection.anchorNode !== null) {
            var range = document.createRange();
            var isBackWardSelection = this.pdfViewerBase.textLayer.isBackWardSelection(selection);
            if (selection.anchorNode === selection.focusNode) {
                var pageId = this.pdfViewerBase.textLayer.getPageIndex(selection.anchorNode);
                var startIndex = 0;
                var endIndex = 0;
                if (!isNaN(pageId)) {
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + pageId).getBoundingClientRect();
                    if (isBackWardSelection) {
                        range.setStart(selection.focusNode, selection.focusOffset);
                        range.setEnd(selection.anchorNode, selection.anchorOffset);
                    }
                    else {
                        if (selection.anchorOffset < selection.focusOffset) {
                            startIndex = selection.anchorOffset;
                            endIndex = selection.focusOffset;
                            range.setStart(selection.anchorNode, selection.anchorOffset);
                            range.setEnd(selection.focusNode, selection.focusOffset);
                        }
                        else {
                            startIndex = selection.focusOffset;
                            endIndex = selection.anchorOffset;
                            range.setStart(selection.focusNode, selection.focusOffset);
                            range.setEnd(selection.anchorNode, selection.anchorOffset);
                        }
                    }
                    var boundingRect = range.getBoundingClientRect();
                    // tslint:disable-next-line
                    var indexes = this.getIndexNumbers(pageId, range.toString(), range.commonAncestorContainer.textContent.toString().replace(/(\r\n|\n|\r)/gm, ''));
                    // tslint:disable-next-line:max-line-length
                    var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left), top: this.getDefaultValue(boundingRect.top - pageRect.top), width: this.getDefaultValue(boundingRect.width), height: this.getDefaultValue(boundingRect.height), right: this.getDefaultValue(boundingRect.right - pageRect.left), bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top) };
                    var rectangleArray = [];
                    rectangleArray.push(rectangle);
                    // tslint:disable-next-line
                    var rect = { left: rectangle.left, top: rectangle.top, right: rectangle.right, bottom: rectangle.bottom };
                    pageBounds.push({ pageIndex: pageId, bounds: rectangleArray, rect: rect, startIndex: indexes.startIndex, endIndex: indexes.endIndex, textContent: range.toString() });
                }
            }
            else {
                var startNode = void 0;
                var endNode = void 0;
                var selectionStartOffset = void 0;
                var selectionEndOffset = void 0;
                if (isBackWardSelection) {
                    startNode = selection.focusNode;
                    selectionStartOffset = selection.focusOffset;
                    endNode = selection.anchorNode;
                    selectionEndOffset = selection.anchorOffset;
                }
                else {
                    startNode = selection.anchorNode;
                    selectionStartOffset = selection.anchorOffset;
                    endNode = selection.focusNode;
                    selectionEndOffset = selection.focusOffset;
                }
                var anchorPageId = this.pdfViewerBase.textLayer.getPageIndex(startNode);
                var anchorTextId = this.pdfViewerBase.textLayer.getTextIndex(startNode, anchorPageId);
                var focusPageId = this.pdfViewerBase.textLayer.getPageIndex(endNode);
                var focusTextId = this.pdfViewerBase.textLayer.getTextIndex(endNode, focusPageId);
                var startOffset = 0;
                var endOffset = 0;
                var currentId = 0;
                for (var i = anchorPageId; i <= focusPageId; i++) {
                    var selectionRects = [];
                    var pageStartId = void 0;
                    var pageEndId = void 0;
                    var pageStartOffset = void 0;
                    var pageEndOffset = void 0;
                    var textDivs = this.pdfViewerBase.getElement('_textLayer_' + i).childNodes;
                    var pageRect = this.pdfViewerBase.getElement('_pageDiv_' + i).getBoundingClientRect();
                    if (i === anchorPageId) {
                        currentId = anchorTextId;
                    }
                    else {
                        currentId = 0;
                    }
                    for (var j = currentId; j < textDivs.length; j++) {
                        var textElement = textDivs[j];
                        if (j === currentId) {
                            pageStartId = currentId;
                            pageStartOffset = (i === anchorPageId) ? selectionStartOffset : 0;
                        }
                        else {
                            pageEndId = j;
                            pageEndOffset = (i === focusPageId) ? selectionEndOffset : textElement.textContent.length;
                        }
                        if (j === anchorTextId && i === anchorPageId) {
                            startOffset = selectionStartOffset;
                        }
                        else {
                            startOffset = 0;
                        }
                        if (j === focusTextId && i === focusPageId) {
                            endOffset = selectionEndOffset;
                        }
                        else {
                            endOffset = textElement.textContent.length;
                        }
                        for (var k = 0; k < textElement.childNodes.length; k++) {
                            var node = textElement.childNodes[k];
                            range.setStart(node, startOffset);
                            range.setEnd(node, endOffset);
                        }
                        var boundingRect = range.getBoundingClientRect();
                        // tslint:disable-next-line:max-line-length
                        var rectangle = { left: this.getDefaultValue(boundingRect.left - pageRect.left), top: this.getDefaultValue(boundingRect.top - pageRect.top), width: this.getDefaultValue(boundingRect.width), height: this.getDefaultValue(boundingRect.height), right: this.getDefaultValue(boundingRect.right - pageRect.left), bottom: this.getDefaultValue(boundingRect.bottom - pageRect.top) };
                        selectionRects.push(rectangle);
                        range.detach();
                        if (i === focusPageId && j === focusTextId) {
                            break;
                        }
                    }
                    var startElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageStartId).childNodes[0];
                    var endElementNode = this.pdfViewerBase.getElement('_text_' + i + '_' + pageEndId).childNodes[0];
                    var pageRange = document.createRange();
                    pageRange.setStart(startElementNode, pageStartOffset);
                    pageRange.setEnd(endElementNode, pageEndOffset);
                    var pageRectBounds = pageRange.getBoundingClientRect();
                    var textValue = pageRange.toString().replace(/(\r\n|\n|\r)/gm, '');
                    // tslint:disable-next-line
                    var indexes = this.getIndexNumbers(i, textValue);
                    // tslint:disable-next-line:max-line-length
                    var pageRectangle = { left: this.getDefaultValue(pageRectBounds.left - pageRect.left), top: this.getDefaultValue(pageRectBounds.top - pageRect.top), width: this.getDefaultValue(pageRectBounds.width), height: this.getDefaultValue(pageRectBounds.height), right: this.getDefaultValue(pageRectBounds.right - pageRect.left), bottom: this.getDefaultValue(pageRectBounds.bottom - pageRect.top) };
                    // tslint:disable-next-line
                    var rect = { left: pageRectangle.left, top: pageRectangle.top, right: pageRectangle.right, bottom: pageRectangle.bottom };
                    pageBounds.push({ pageIndex: i, bounds: selectionRects, rect: rect, startIndex: indexes.startIndex, endIndex: indexes.endIndex, textContent: textValue });
                }
            }
        }
        selection.removeAllRanges();
        return pageBounds;
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getIndexNumbers = function (pageNumber, content, parentText) {
        // tslint:disable-next-line
        var storedData = this.pdfViewerBase.getStoredData(pageNumber);
        var startIndex;
        var endIndex;
        if (storedData) {
            var pageText = storedData.pageText.replace(/(\r\n|\n|\r)/gm, '');
            if (!isNullOrUndefined(parentText)) {
                var parentIndex = pageText.indexOf(parentText);
                var initialIndex = parentText.indexOf(content);
                startIndex = parentIndex + initialIndex;
            }
            else {
                startIndex = pageText.indexOf(content);
            }
            endIndex = startIndex + (content.length - 1);
        }
        return { startIndex: startIndex, endIndex: endIndex };
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.rerenderAnnotationsPinch = function (pageNumber) {
        var annotCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (annotCanvas) {
            var oldAnnotCanvas = this.pdfViewerBase.getElement('_old_annotationCanvas_' + pageNumber);
            if (oldAnnotCanvas) {
                if (annotCanvas) {
                    oldAnnotCanvas.id = annotCanvas.id;
                    annotCanvas.parentElement.removeChild(annotCanvas);
                }
                else {
                    oldAnnotCanvas.id = this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber;
                }
                annotCanvas = oldAnnotCanvas;
            }
            annotCanvas.style.width = '';
            annotCanvas.style.height = '';
            annotCanvas.width = this.pdfViewerBase.pageSize[pageNumber].width * this.pdfViewerBase.getZoomFactor();
            annotCanvas.height = this.pdfViewerBase.pageSize[pageNumber].height * this.pdfViewerBase.getZoomFactor();
            this.renderTextMarkupAnnotations(null, pageNumber, annotCanvas, this.pdfViewerBase.getZoomFactor());
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.rerenderAnnotations = function (pageNumber) {
        var oldCanvas = this.pdfViewerBase.getElement('_old_annotationCanvas_' + pageNumber);
        if (oldCanvas) {
            oldCanvas.parentElement.removeChild(oldCanvas);
        }
        var newCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (newCanvas) {
            newCanvas.style.display = 'block';
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseUp = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            this.clearCurrentSelectedAnnotation();
            var currentAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageNumber, canvas);
            if (currentAnnot) {
                this.selectAnnotation(currentAnnot, canvas, pageNumber);
                this.currentTextMarkupAnnotation = currentAnnot;
                this.selectTextMarkupCurrentPage = pageNumber;
                this.enableAnnotationPropertiesTool(true);
                var commentPanelDiv = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (commentPanelDiv && commentPanelDiv.style.display === 'block') {
                    // tslint:disable-next-line
                    var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
                    if (accordionExpand) {
                        accordionExpand.ej2_instances[0].expandItem(true);
                    }
                    // tslint:disable-next-line
                    var comments = document.getElementById(currentAnnot.annotName);
                    if (comments) {
                        comments.firstChild.click();
                    }
                }
                if (this.pdfViewer.toolbarModule) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                    this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                }
            }
            else {
                this.clearCurrentAnnotation();
            }
            this.clearCurrentAnnotationSelection(pageNumber);
        }
        else {
            if (!this.pdfViewerBase.isClickedOnScrollBar(event, true)) {
                this.clearCurrentAnnotation();
                this.clearCurrentAnnotationSelection(pageNumber);
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationTouchEnd = function (event) {
        var pageNumber = this.pdfViewer.annotationModule.getEventPageNumber(event);
        if (!isNullOrUndefined(pageNumber) && !isNaN(pageNumber)) {
            this.clearCurrentAnnotationSelection(pageNumber);
            var touchCanvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
            this.clearCurrentSelectedAnnotation();
            // tslint:disable-next-line:max-line-length
            var currentAnnot = this.getCurrentMarkupAnnotation(event.touches[0].clientX, event.touches[0].clientY, pageNumber, touchCanvas);
            if (currentAnnot) {
                this.selectAnnotation(currentAnnot, touchCanvas, pageNumber);
                this.currentTextMarkupAnnotation = currentAnnot;
                this.selectTextMarkupCurrentPage = pageNumber;
                this.enableAnnotationPropertiesTool(true);
                // tslint:disable-next-line
                var accordionExpand = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (pageNumber + 1));
                if (accordionExpand) {
                    accordionExpand.ej2_instances[0].expandItem(true);
                }
                // tslint:disable-next-line
                var comments = document.getElementById(currentAnnot.annotName);
                if (comments) {
                    comments.firstChild.click();
                }
            }
            else {
                this.clearCurrentAnnotation();
            }
            this.clearCurrentAnnotationSelection(pageNumber);
        }
        else if (this.selectTextMarkupCurrentPage != null && Browser.isDevice) {
            var number = this.selectTextMarkupCurrentPage;
            this.selectTextMarkupCurrentPage = null;
            this.clearAnnotationSelection(number);
        }
        else {
            this.clearCurrentAnnotation();
            this.clearCurrentAnnotationSelection(pageNumber);
        }
    };
    TextMarkupAnnotation.prototype.clearCurrentSelectedAnnotation = function () {
        if (this.currentTextMarkupAnnotation) {
            this.clearAnnotationSelection(this.selectTextMarkupCurrentPage);
            this.clearCurrentAnnotation();
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.onTextMarkupAnnotationMouseMove = function (event) {
        var eventTarget = event.target;
        // tslint:disable-next-line
        var pageIndex = parseInt(eventTarget.id.split('_text_')[1]) || parseInt(eventTarget.id.split('_textLayer_')[1]) || parseInt(eventTarget.id.split('_annotationCanvas_')[1]);
        if (pageIndex) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageIndex);
            var currentAnnot = this.getCurrentMarkupAnnotation(event.clientX, event.clientY, pageIndex, canvas);
            if (currentAnnot) {
                eventTarget.style.cursor = 'pointer';
                // this.showPopupNote(event, currentAnnot);
            }
            else {
                this.pdfViewer.annotationModule.hidePopupNote();
                if (this.pdfViewerBase.isPanMode && !this.pdfViewerBase.getAnnotationToolStatus()) {
                    eventTarget.style.cursor = 'grab';
                }
                else {
                    eventTarget.style.cursor = 'auto';
                }
            }
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.showPopupNote = function (event, annotation) {
        if (annotation.note) {
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.annotationModule.showPopupNote(event, annotation.color, annotation.author, annotation.note, annotation.textMarkupAnnotationType);
        }
    };
    TextMarkupAnnotation.prototype.getCurrentMarkupAnnotation = function (clientX, clientY, pageNumber, canvas) {
        var currentTextMarkupAnnotations = [];
        var canvasParentPosition = canvas.parentElement.getBoundingClientRect();
        var leftClickPosition = clientX - canvasParentPosition.left;
        var topClickPosition = clientY - canvasParentPosition.top;
        var annotationList = this.getAnnotations(pageNumber, null);
        var isAnnotationGot = false;
        if (annotationList) {
            for (var i = 0; i < annotationList.length; i++) {
                var annotation = annotationList[i];
                for (var j = 0; j < annotation.bounds.length; j++) {
                    // tslint:disable-next-line
                    var bound = annotation.bounds[j];
                    var left = bound.left ? bound.left : bound.Left;
                    var top_3 = bound.top ? bound.top : bound.Top;
                    var width = bound.width ? bound.width : bound.Width;
                    var height = bound.height ? bound.height : bound.Height;
                    // tslint:disable-next-line:max-line-length
                    if (leftClickPosition >= this.getMagnifiedValue(left, this.pdfViewerBase.getZoomFactor()) && leftClickPosition <= this.getMagnifiedValue(left + width, this.pdfViewerBase.getZoomFactor()) && topClickPosition >= this.getMagnifiedValue(top_3, this.pdfViewerBase.getZoomFactor()) && topClickPosition <= this.getMagnifiedValue(top_3 + height, this.pdfViewerBase.getZoomFactor())) {
                        currentTextMarkupAnnotations.push(annotation);
                        isAnnotationGot = true;
                    }
                    else {
                        if (isAnnotationGot) {
                            isAnnotationGot = false;
                            break;
                        }
                    }
                }
            }
        }
        var currentAnnot = null;
        if (currentTextMarkupAnnotations.length > 1) {
            currentAnnot = this.compareCurrentAnnotations(currentTextMarkupAnnotations);
        }
        else if (currentTextMarkupAnnotations.length === 1) {
            currentAnnot = currentTextMarkupAnnotations[0];
        }
        return currentAnnot;
    };
    TextMarkupAnnotation.prototype.compareCurrentAnnotations = function (annotations) {
        var previousX;
        var currentAnnotation = null;
        for (var i = 0; i < annotations.length; i++) {
            if (i === annotations.length - 1) {
                break;
            }
            // tslint:disable-next-line
            var firstAnnotBounds = annotations[i].bounds;
            var firstXposition = firstAnnotBounds[0].left ? firstAnnotBounds[0].left : firstAnnotBounds[0].Left;
            var firstYposition = firstAnnotBounds[0].top ? firstAnnotBounds[0].top : firstAnnotBounds[0].Top;
            // tslint:disable-next-line
            var secondAnnotBounds = annotations[i + 1].bounds;
            var secondXposition = secondAnnotBounds[0].left ? secondAnnotBounds[0].left : secondAnnotBounds[0].Left;
            var secondYposition = secondAnnotBounds[0].top ? secondAnnotBounds[0].top : secondAnnotBounds[0].Top;
            if ((firstXposition < secondXposition) || (firstYposition < secondYposition)) {
                previousX = secondXposition;
                currentAnnotation = annotations[i + 1];
            }
            else {
                previousX = firstXposition;
                currentAnnotation = annotations[i];
            }
            if (previousX && (i === (annotations.length - 2))) {
                if ((previousX === firstXposition) && (previousX === secondXposition)) {
                    previousX = secondXposition;
                    currentAnnotation = annotations[i + 1];
                }
            }
        }
        return currentAnnotation;
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.clearAnnotationSelection = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            var context = canvas.getContext('2d');
            context.setLineDash([]);
            this.pdfViewer.annotationModule.renderAnnotations(pageNumber, null, null, null);
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.selectAnnotation = function (annotation, canvas, pageNumber) {
        if (this.pdfViewer.selectedItems.annotations[0]) {
            this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.annotations[0].pageIndex);
            this.pdfViewer.clearSelection(this.selectTextMarkupCurrentPage);
        }
        var isCurrentTextMarkup = false;
        if (!this.currentTextMarkupAnnotation) {
            isCurrentTextMarkup = true;
        }
        if (!isNaN(pageNumber)) {
            this.currentTextMarkupAnnotation = annotation;
            this.selectTextMarkupCurrentPage = pageNumber;
        }
        // tslint:disable-next-line
        var currentEvent = event;
        if (this.pdfViewer.enableTextMarkupResizer && annotation && currentEvent && !currentEvent.touches) {
            // tslint:disable-next-line
            var boundingRect = this.pdfViewerBase.getElement('_textLayer_' + this.selectTextMarkupCurrentPage).getBoundingClientRect();
            var left = annotation.bounds[0].left ? annotation.bounds[0].left : annotation.bounds[0].Left;
            var top_4 = annotation.bounds[0].top ? annotation.bounds[0].top : annotation.bounds[0].Top;
            this.updateLeftposition(left * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (boundingRect.top + top_4), true);
            // tslint:disable-next-line
            var endPosition = annotation.bounds[annotation.bounds.length - 1];
            var endLeft = endPosition.left ? endPosition.left : endPosition.Left;
            var endTop = endPosition.top ? endPosition.top : endPosition.Top;
            var endWidth = endPosition.width ? endPosition.width : endPosition.Width;
            // tslint:disable-next-line:max-line-length
            this.updatePosition((endLeft + endWidth) * this.pdfViewerBase.getZoomFactor() + boundingRect.left, (endTop + boundingRect.top), true);
        }
        for (var i = 0; i < annotation.bounds.length; i++) {
            // tslint:disable-next-line
            var bound = annotation.bounds[i];
            var x = bound.left ? bound.left : bound.Left;
            var y = bound.top ? bound.top : bound.Top;
            var width = bound.width ? bound.width : bound.Width;
            var height = bound.height ? bound.height : bound.Height;
            // tslint:disable-next-line:max-line-length
            this.drawAnnotationSelectRect(canvas, this.getMagnifiedValue(x - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(y - 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(width + 0.5, this.pdfViewerBase.getZoomFactor()), this.getMagnifiedValue(height + 0.5, this.pdfViewerBase.getZoomFactor()));
        }
        if (annotation.annotName !== '') {
            if (isCurrentTextMarkup) {
                this.pdfViewer.annotationModule.selectAnnotation(annotation.annotName, this.selectTextMarkupCurrentPage, annotation);
            }
        }
        if (annotation && this.pdfViewer.enableTextMarkupResizer) {
            this.isTextMarkupAnnotationMode = true;
        }
    };
    TextMarkupAnnotation.prototype.drawAnnotationSelectRect = function (canvas, x, y, width, height) {
        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.beginPath();
        context.setLineDash([4 * this.pdfViewerBase.getZoomFactor()]);
        context.globalAlpha = 1;
        context.rect(x, y, width, height);
        context.closePath();
        // tslint:disable-next-line:max-line-length
        var borderColor = isNullOrUndefined(this.pdfViewer.annotationSelectorSettings.selectionBorderColor) || this.pdfViewer.annotationSelectorSettings.selectionBorderColor === '' ? '#0000ff' : this.pdfViewer.annotationSelectorSettings.selectionBorderColor;
        context.strokeStyle = borderColor;
        // tslint:disable-next-line:max-line-length
        context.lineWidth = isNullOrUndefined(this.pdfViewer.annotationSelectorSettings.selectionBorderThickness) ? 1 : this.pdfViewer.annotationSelectorSettings.selectionBorderThickness;
        context.stroke();
        context.save();
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.enableAnnotationPropertiesTool = function (isEnable) {
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule) {
            this.pdfViewer.toolbarModule.annotationToolbarModule.createMobileAnnotationToolbar(isEnable);
        }
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule && this.pdfViewer.toolbarModule.annotationToolbarModule.isMobileAnnotEnabled && this.pdfViewer.selectedItems.annotations.length === 0) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(isEnable);
                var enable = isEnable;
                if (this.isTextMarkupAnnotationMode) {
                    enable = true;
                }
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(enable);
                if (this.currentTextMarkupAnnotation) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, this.currentTextMarkupAnnotation.color);
                }
                else {
                    if (!this.isTextMarkupAnnotationMode) {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.toolbarModule.annotationToolbarModule.updateColorInIcon(this.pdfViewer.toolbarModule.annotationToolbarModule.colorDropDownElement, '#000000');
                    }
                    else {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.maintainAnnotationSelection = function () {
        if (this.currentTextMarkupAnnotation) {
            var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + this.selectTextMarkupCurrentPage);
            if (canvas) {
                this.selectAnnotation(this.currentTextMarkupAnnotation, canvas, this.selectTextMarkupCurrentPage);
            }
        }
    };
    // private storeAnnotations(pageNumber: number, annotation: ITextMarkupAnnotation): number {
    //     // tslint:disable-next-line
    //     let storeObject: any = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //     let index: number = 0;
    //     if (!storeObject) {
    //         let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //         markupAnnotation.annotations.push(annotation);
    //         index = markupAnnotation.annotations.indexOf(annotation);
    //         let annotationCollection: IPageAnnotations[] = [];
    //         annotationCollection.push(markupAnnotation);
    //         let annotationStringified: string = JSON.stringify(annotationCollection);
    //         window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     } else {
    //         let annotObject: IPageAnnotations[] = JSON.parse(storeObject);
    //         window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    //         let pageIndex: number = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
    //         if (annotObject[pageIndex]) {
    //             (annotObject[pageIndex] as IPageAnnotations).annotations.push(annotation);
    //             index = (annotObject[pageIndex] as IPageAnnotations).annotations.indexOf(annotation);
    //         } else {
    //             let markupAnnotation: IPageAnnotations = { pageIndex: pageNumber, annotations: [] };
    //             markupAnnotation.annotations.push(annotation);
    //             index = markupAnnotation.annotations.indexOf(annotation);
    //             annotObject.push(markupAnnotation);
    //         }
    //         let annotationStringified: string = JSON.stringify(annotObject);
    //         window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
    //     }
    //     return index;
    // }
    TextMarkupAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotObject[index].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_textMarkup', annotationStringified);
        }
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getAnnotations = function (pageIndex, textMarkupAnnotations, id) {
        // tslint:disable-next-line
        var annotationCollection;
        // tslint:disable-next-line
        if (id == null || id == undefined) {
            id = '_annotations_textMarkup';
        }
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + id);
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = textMarkupAnnotations;
            }
        }
        else {
            annotationCollection = textMarkupAnnotations;
        }
        return annotationCollection;
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.getAddedAnnotation = function (type, color, opacity, bounds, author, subject, predefinedDate, note, rect, pageNumber) {
        var date = new Date();
        // tslint:disable-next-line:max-line-length
        var modifiedDate = predefinedDate ? predefinedDate : date.toLocaleString();
        var annotationName = this.pdfViewer.annotation.createGUID();
        var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('textMarkup', pageNumber + 1, type);
        if (commentsDivid) {
            document.getElementById(commentsDivid).id = annotationName;
        }
        var annotation = {
            // tslint:disable-next-line:max-line-length
            textMarkupAnnotationType: type, color: color, opacity: opacity, bounds: bounds, author: author, subject: subject, modifiedDate: modifiedDate, note: note, rect: rect,
            annotName: annotationName, comments: [], review: { state: '', stateModel: '', author: author, modifiedDate: modifiedDate }, shapeAnnotationType: 'textMarkup'
        };
        if (document.getElementById(annotationName)) {
            document.getElementById(annotationName).addEventListener('mouseup', this.annotationDivSelect(annotation, pageNumber));
        }
        var storedIndex = this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotation, '_annotations_textMarkup');
        this.pdfViewer.annotationModule.addAction(pageNumber, storedIndex, annotation, 'Text Markup Added', null);
        return annotation;
    };
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.annotationDivSelect = function (annotation, pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        this.selectAnnotation(annotation, canvas, pageNumber);
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(true);
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
            }
        }
    };
    TextMarkupAnnotation.prototype.getPageContext = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        var context = null;
        if (canvas) {
            context = canvas.getContext('2d');
        }
        return context;
    };
    TextMarkupAnnotation.prototype.getDefaultValue = function (value) {
        return value / this.pdfViewerBase.getZoomFactor();
    };
    TextMarkupAnnotation.prototype.getMagnifiedValue = function (value, factor) {
        return value * factor;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    TextMarkupAnnotation.prototype.saveImportedTextMarkupAnnotations = function (annotation, pageNumber) {
        var annotationObject = null;
        annotation.Author = this.pdfViewer.annotationModule.updateAnnotationAuthor('textMarkup', annotation.Subject);
        // tslint:disable-next-line:max-line-length
        annotationObject = {
            // tslint:disable-next-line:max-line-length
            textMarkupAnnotationType: annotation.TextMarkupAnnotationType, color: annotation.Color, opacity: annotation.Opacity, bounds: annotation.Bounds, author: annotation.Author, subject: annotation.Subject, modifiedDate: annotation.ModifiedDate, note: annotation.Note, rect: annotation.Rect,
            annotName: annotation.AnnotName, comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author), review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author }, shapeAnnotationType: 'textMarkup'
        };
        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annotationObject, '_annotations_textMarkup');
    };
    /**
     * @private
     */
    TextMarkupAnnotation.prototype.clear = function () {
        this.selectTextMarkupCurrentPage = null;
        this.currentTextMarkupAnnotation = null;
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_textMarkup');
    };
    return TextMarkupAnnotation;
}());
export { TextMarkupAnnotation };
