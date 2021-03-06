import { createElement, Browser } from '@syncfusion/ej2-base';
import { AjaxHandler } from '../index';
/**
 * Print module
 */
var Print = /** @class */ (function () {
    /**
     * @private
     */
    function Print(viewer, base) {
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * Print the PDF document being loaded in the ejPdfViewer control.
     * @returns void
     */
    Print.prototype.print = function () {
        var _this = this;
        var pageIndex;
        if (this.pdfViewerBase.pageCount > 0) {
            // tslint:disable-next-line:max-line-length
            this.printViewerContainer = createElement('div', {
                id: this.pdfViewer.element.id + '_print_viewer_container',
                className: 'e-pv-print-viewer-container'
            });
            this.pdfViewerBase.showPrintLoadingIndicator(true);
            this.iframe = document.createElement('iframe');
            this.iframe.className = 'iframeprint';
            this.iframe.id = 'iframePrint';
            this.iframe.style.position = 'absolute';
            this.iframe.style.top = '-100000000px';
            document.body.appendChild(this.iframe);
            this.frameDoc = this.iframe.contentWindow ? this.iframe.contentWindow : this.iframe.contentDocument;
            this.frameDoc.document.open();
            setTimeout(function () {
                for (pageIndex = 0; pageIndex < _this.pdfViewerBase.pageCount; pageIndex++) {
                    var pageWidth = _this.pdfViewerBase.pageSize[pageIndex].width;
                    var pageHeight = _this.pdfViewerBase.pageSize[pageIndex].height;
                    _this.pdfViewer.printModule.createRequestForPrint(pageIndex, pageWidth, pageHeight, _this.pdfViewerBase.pageCount);
                }
            }, 100);
        }
    };
    Print.prototype.createRequestForPrint = function (pageIndex, pageWidth, pageHeight, pageCount) {
        var proxy = this;
        // tslint: disable-next-line:max-line-length
        // set default zoomFactor value.  
        var jsonObject = {
            pageNumber: pageIndex, documentId: this.pdfViewerBase.documentId,
            hashId: this.pdfViewerBase.hashId, zoomFactor: 1,
            action: 'PrintImages',
            elementId: this.pdfViewer.element.id,
            uniqueId: this.pdfViewerBase.documentId
        };
        if (this.pdfViewerBase.jsonDocumentId) {
            // tslint:disable-next-line
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        proxy.printRequestHandler = new AjaxHandler(proxy.pdfViewer);
        proxy.printRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.print;
        proxy.printRequestHandler.responseType = null;
        proxy.printRequestHandler.mode = false;
        proxy.printRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        proxy.printRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line
            var printImage = result.data;
            if (printImage) {
                if (typeof printImage !== 'object') {
                    try {
                        printImage = JSON.parse(printImage);
                        if (typeof printImage !== 'object') {
                            proxy.pdfViewerBase.onControlError(500, printImage, proxy.pdfViewer.serverActionSettings.print);
                            printImage = null;
                        }
                    }
                    catch (error) {
                        proxy.pdfViewerBase.onControlError(500, printImage, proxy.pdfViewer.serverActionSettings.print);
                        printImage = null;
                    }
                }
            }
            if (printImage && printImage.uniqueId === proxy.pdfViewerBase.documentId) {
                var annotationSource_1 = '';
                if (printImage.textMarkupAnnotation && proxy.pdfViewerBase.isTextMarkupAnnotationModule()) {
                    // tslint:disable-next-line
                    var stampData = printImage['stampAnnotations'];
                    if (proxy.pdfViewerBase.isImportAction) {
                        var importAnnotationList = proxy.pdfViewerBase.importedAnnotation;
                        // tslint:disable-next-line
                        var importAnnotation = importAnnotationList[printImage.pageNumber];
                        var textMarkupAnnotation = printImage.textMarkupAnnotation;
                        var shapeAnnotation = printImage.shapeAnnotation;
                        var measureShapeAnnotation = printImage.measureShapeAnnotation;
                        var stampAnnotation = stampData;
                        // tslint:disable-next-line
                        var stickyNoteAnnotation = printImage.stickyNotesAnnotation;
                        if (importAnnotation) {
                            if (importAnnotation.textMarkupAnnotation.length !== 0) {
                                textMarkupAnnotation = printImage.textMarkupAnnotation.concat(importAnnotation.textMarkupAnnotation);
                            }
                            if (importAnnotation.shapeAnnotation.length !== 0) {
                                shapeAnnotation = printImage.shapeAnnotation.concat(importAnnotation.shapeAnnotation);
                            }
                            if (importAnnotation.measureShapeAnnotation.length !== 0) {
                                measureShapeAnnotation = printImage.measureShapeAnnotation.concat(importAnnotation.measureShapeAnnotation);
                            }
                            if (importAnnotation.stampAnnotations.length !== 0) {
                                stampAnnotation = stampData.concat(importAnnotation.stampAnnotations);
                            }
                            if (importAnnotation.stickyNotesAnnotation.length !== 0) {
                                stickyNoteAnnotation = printImage.stickyNotesAnnotation.concat(importAnnotation.stickyNotesAnnotation);
                            }
                        }
                        // tslint:disable-next-line:max-line-length
                        annotationSource_1 = proxy.pdfViewer.annotationModule.textMarkupAnnotationModule.printTextMarkupAnnotations(textMarkupAnnotation, pageIndex, stampAnnotation, shapeAnnotation, measureShapeAnnotation, stickyNoteAnnotation);
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        annotationSource_1 = proxy.pdfViewer.annotationModule.textMarkupAnnotationModule.printTextMarkupAnnotations(printImage.textMarkupAnnotation, pageIndex, stampData, printImage.shapeAnnotation, printImage.measureShapeAnnotation, printImage.stickyNoteAnnotation);
                    }
                }
                var currentPageNumber_1 = printImage.pageNumber;
                // tslint:disable-next-line:max-line-length
                proxy.printCanvas = createElement('canvas', { id: proxy.pdfViewer.element.id + '_printCanvas_' + pageIndex, className: 'e-pv-print-canvas' });
                proxy.printCanvas.style.width = pageWidth + 'px';
                proxy.printCanvas.style.height = pageHeight + 'px';
                var printScaleValue = 1.5;
                proxy.printCanvas.height = 1056 * printScaleValue * window.devicePixelRatio;
                proxy.printCanvas.width = 816 * printScaleValue * window.devicePixelRatio;
                var context_1 = proxy.printCanvas.getContext('2d');
                var pageImage_1 = new Image();
                var annotationImage_1 = new Image();
                pageImage_1.onload = function () {
                    if (pageHeight > pageWidth) {
                        context_1.drawImage(pageImage_1, 0, 0, proxy.printCanvas.width, proxy.printCanvas.height);
                        if (annotationSource_1) {
                            context_1.drawImage(annotationImage_1, 0, 0, proxy.printCanvas.width, proxy.printCanvas.height);
                        }
                    }
                    else {
                        // translate to center canvas
                        context_1.translate(proxy.printCanvas.width * 0.5, proxy.printCanvas.height * 0.5);
                        // rotate the canvas to - 90 degree 
                        context_1.rotate(-0.5 * Math.PI);
                        // un translate the canvas back to origin
                        context_1.translate(-proxy.printCanvas.height * 0.5, -proxy.printCanvas.width * 0.5);
                        // draw the image
                        context_1.drawImage(pageImage_1, 0, 0, proxy.printCanvas.height, proxy.printCanvas.width);
                        if (annotationSource_1) {
                            context_1.drawImage(annotationImage_1, 0, 0, proxy.printCanvas.height, proxy.printCanvas.width);
                        }
                    }
                    if (currentPageNumber_1 === (proxy.pdfViewerBase.pageCount - 1)) {
                        proxy.printWindowOpen();
                    }
                    proxy.pdfViewer.renderDrawing(null, pageIndex);
                };
                pageImage_1.src = printImage.image;
                annotationImage_1.src = annotationSource_1;
                proxy.printViewerContainer.appendChild(proxy.printCanvas);
            }
        };
        // tslint:disable-next-line
        this.printRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.print);
        };
        // tslint:disable-next-line
        this.printRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.print);
        };
    };
    // tslint:disable-next-line
    Print.prototype.renderFieldsForPrint = function (pageIndex, heightRatio, widthRatio) {
        // tslint:disable-next-line
        var data = window.sessionStorage.getItem('formfields');
        // tslint:disable-next-line
        var formFieldsData = JSON.parse(data);
        for (var i = 0; i < formFieldsData.length; i++) {
            // tslint:disable-next-line
            var currentData = formFieldsData[i];
            // tslint:disable-next-line
            if (parseFloat(currentData['PageIndex']) === pageIndex) {
                // tslint:disable-next-line
                var targetField = this.frameDoc.document.getElementById('fields_' + pageIndex);
                // tslint:disable-next-line
                var inputField = this.pdfViewer.formFieldsModule.createFormFields(currentData, pageIndex, i, targetField);
                if (inputField) {
                    // tslint:disable-next-line
                    var bounds = currentData['LineBounds'];
                    // tslint:disable-next-line
                    var font = currentData['Font'];
                    this.applyPosition(inputField, bounds, font, heightRatio, widthRatio);
                    if (currentData.IsSignatureField) {
                        inputField.style.backgroundColor = 'transparent';
                    }
                    targetField.appendChild(inputField);
                }
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Print.prototype.applyPosition = function (inputField, bounds, font, heightRatio, widthRatio) {
        if (bounds) {
            var left = (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.X)) / widthRatio;
            var top_1 = (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Y)) / heightRatio;
            var width = (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Width)) / widthRatio;
            var height = (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Height)) / heightRatio;
            var fontHeight = 0;
            if (font !== null && font.Height) {
                inputField.style.fontfamily = font.Name;
                if (font.Italic) {
                    inputField.style.fontStyle = 'italic';
                }
                if (font.Bold) {
                    inputField.style.fontWeight = 'Bold';
                }
                fontHeight = this.pdfViewer.formFieldsModule.ConvertPointToPixel(font.Size);
            }
            if (Browser.isIE) {
                top_1 = top_1 - 6;
            }
            this.pdfViewer.formFieldsModule.setStyleToTextDiv(inputField, left, top_1, fontHeight, width, height, true);
        }
    };
    Print.prototype.printWindowOpen = function () {
        var _this = this;
        var browserUserAgent = navigator.userAgent;
        // tslint: disable-next-line:max-line-length
        if ((browserUserAgent.indexOf('Chrome') !== -1) || (browserUserAgent.indexOf('Safari') !== -1) ||
            (browserUserAgent.indexOf('Firefox')) !== -1) {
            //chrome and firefox
            this.frameDoc.document.write('<!DOCTYPE html>');
            // tslint: disable-next-line:max-line-length
            this.frameDoc.document.write('<html moznomarginboxes mozdisallowselectionprint><head><style>html, body { height: 100%; }'
                + ' img { height: 100%; width: 100%; display: block; }@media print { body { margin: 0cm; }'
                + ' img { width:100%; max-width: 1048px; box-sizing: border-box; }br, button { display: none; }'
                // set default page Height and page Width for A4 size.
                + ' div{ page-break-inside: avoid; }} @page{margin:0mm; size: 816px 1056px;}</style></head><body><center class="loader">');
        }
        else {
            //ie
            this.frameDoc.document.write('<!DOCTYPE html>');
            // tslint: disable-next-line:max-line-length
            this.frameDoc.document.write('<html><head>'
                + '<style>html, body { height: 99%; } img { height: 99%; width: 100%; }@media print { body { margin: 0cm; }'
                + 'img { width:98%; max-width: 1048px; box-sizing: border-box; }br, button { display: none; } '
                // set default page Height and page Width for A4 size.
                + 'div{ page-break-inside: avoid; }} @page{margin:0mm; size: 816px 1056px;}</style></head><body><center>');
        }
        for (var i = 0; i < this.printViewerContainer.children.length; i++) {
            // tslint:disable-next-line:max-line-length
            var canvasUrl = this.printViewerContainer.children[i].toDataURL();
            this.frameDoc.document.write('<div style="margin:0mm;width:816px;height:1056px;position:relative"><img src="' + canvasUrl + '" id="' + 'image_' + i + '" /><div id="' + 'fields_' + i + '" style="margin:0px;top:0px;left:0px;position:absolute;width:816px;height:1056px;z-index:2"></div></div>');
            if (this.pdfViewer.formFieldsModule) {
                var pageWidth = this.pdfViewerBase.pageSize[i].width;
                var pageHeight = this.pdfViewerBase.pageSize[i].height;
                var heightRatio = pageHeight / 1056;
                var widthRatio = pageWidth / 816;
                this.renderFieldsForPrint(i, heightRatio, widthRatio);
            }
        }
        this.pdfViewerBase.showPrintLoadingIndicator(false);
        if (Browser.isIE || Browser.info.name === 'edge') {
            try {
                this.iframe.contentWindow.document.execCommand('print', false, null);
            }
            catch (e) {
                this.iframe.contentWindow.print();
            }
        }
        else {
            setTimeout(function () {
                _this.iframe.contentWindow.print();
                _this.iframe.contentWindow.focus();
                document.body.removeChild(_this.iframe);
            }, 200);
        }
    };
    /**
     * @private
     */
    Print.prototype.destroy = function () {
        this.printViewerContainer = undefined;
        this.frameDoc = undefined;
    };
    /**
     * @private
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    return Print;
}());
export { Print };
