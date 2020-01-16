import { TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, MeasureAnnotation } from '../index';
import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { NumericTextBox, Slider, ColorPicker } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { isLineShapes, cloneObject } from '../../diagram/drawing-util';
import { NodeDrawingTool, LineTool, MoveTool, ResizeTool, ConnectTool } from '../../diagram/tools';
import { updateDistanceLabel, updateRadiusLabel } from '../../diagram/connector-util';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
var Annotation = /** @class */ (function () {
    /**
     * @private
     */
    function Annotation(pdfViewer, viewerBase) {
        this.isUndoRedoAction = false;
        this.isUndoAction = false;
        /**
         * @private
         */
        this.isShapeCopied = false;
        /**
         * @private
         */
        this.actionCollection = [];
        /**
         * @private
         */
        this.redoCollection = [];
        /**
         * @private
         */
        this.isPopupNoteVisible = false;
        /**
         * @private
         */
        this.undoCommentsElement = [];
        /**
         * @private
         */
        this.redoCommentsElement = [];
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = viewerBase;
        if (this.pdfViewer.enableTextMarkupAnnotation) {
            this.textMarkupAnnotationModule = new TextMarkupAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableShapeAnnotation) {
            this.shapeAnnotationModule = new ShapeAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        if (this.pdfViewer.enableMeasureAnnotation) {
            this.measureAnnotationModule = new MeasureAnnotation(this.pdfViewer, this.pdfViewerBase);
        }
        this.stampAnnotationModule = new StampAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.stickyNotesAnnotationModule = new StickyNotesAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.freeTextAnnotationModule = new FreeTextAnnotation(this.pdfViewer, this.pdfViewerBase);
        this.inputElementModule = new InputElement(this.pdfViewer, this.pdfViewerBase);
    }
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     * @param type
     * @returns void
     */
    Annotation.prototype.setAnnotationMode = function (type) {
        if (type === 'None') {
            this.clearAnnotationMode();
        }
        else if (type === 'Highlight' || type === 'Strikethrough' || type === 'Underline') {
            if (this.textMarkupAnnotationModule) {
                this.textMarkupAnnotationModule.drawTextMarkupAnnotations(type.toString());
            }
        }
        else if (type === 'Line' || type === 'Arrow' || type === 'Rectangle' || type === 'Circle' || type === 'Polygon') {
            if (this.shapeAnnotationModule) {
                this.shapeAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'Distance' || type === 'Perimeter' || type === 'Area' || type === 'Radius' || type === 'Volume') {
            if (this.measureAnnotationModule) {
                this.measureAnnotationModule.setAnnotationType(type);
            }
        }
        else if (type === 'FreeText' && this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.setAnnotationType('FreeText');
            this.freeTextAnnotationModule.isNewFreeTextAnnot = true;
            this.freeTextAnnotationModule.isNewAddedAnnot = true;
        }
        else if (type === 'HandWrittenSignature') {
            this.pdfViewerBase.signatureModule.setAnnotationMode();
        }
    };
    Annotation.prototype.clearAnnotationMode = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
        }
        if (this.freeTextAnnotationModule) {
            this.freeTextAnnotationModule.isNewFreeTextAnnot = true;
            this.freeTextAnnotationModule.isNewAddedAnnot = true;
        }
    };
    Annotation.prototype.deleteAnnotation = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.deleteTextMarkupAnnotation();
        }
        if (this.pdfViewer.selectedItems.annotations.length !== 0) {
            var pageNumber = this.pdfViewer.selectedItems.annotations[0].pageIndex;
            // tslint:disable-next-line
            var shapeType = this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType;
            // tslint:disable-next-line
            var undoElement = void 0;
            if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                // tslint:disable-next-line:max-line-length
                if (isNullOrUndefined(this.pdfViewer.selectedItems.annotations[0].measureType) || this.pdfViewer.selectedItems.annotations[0].measureType === '') {
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(this.pdfViewer.selectedItems.annotations[0], 'shape');
                }
                else {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(this.pdfViewer.selectedItems.annotations[0], 'measure');
                }
                undoElement = this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'delete');
            }
            else if (shapeType === 'FreeText') {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(this.pdfViewer.selectedItems.annotations[0], 'FreeText', 'delete');
                undoElement = this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'delete');
            }
            else if (shapeType === 'HandWrittenSignature') {
                undoElement = this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'delete');
            }
            else {
                undoElement = this.pdfViewer.selectedItems.annotations[0];
                this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(undoElement, undoElement.shapeAnnotationType, 'delete');
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotation.stampAnnotationModule.updateSessionStorage(this.pdfViewer.selectedItems.annotations[0], null, 'delete');
            }
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.annotation.addAction(pageNumber, null, this.pdfViewer.selectedItems.annotations[0], 'Delete', '', undoElement, this.pdfViewer.selectedItems.annotations[0]);
            // tslint:disable-next-line
            var removeDiv = void 0;
            if (this.pdfViewer.selectedItems.annotations[0].annotName !== '') {
                removeDiv = document.getElementById(this.pdfViewer.selectedItems.annotations[0].annotName);
            }
            else {
                if (undoElement) {
                    if (undoElement.annotName !== '') {
                        removeDiv = document.getElementById(undoElement.annotName);
                    }
                }
            }
            if (removeDiv) {
                if (removeDiv.parentElement.childElementCount === 1) {
                    this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                }
                else {
                    removeDiv.remove();
                }
            }
            var selectedAnnot = this.pdfViewer.selectedItems.annotations[0];
            var annotationId = selectedAnnot.annotName;
            var annotType = this.getAnnotationType(selectedAnnot.shapeAnnotationType, selectedAnnot.measureType);
            if (shapeType === 'Path') {
                // tslint:disable-next-line
                var inputFields = document.getElementById(selectedAnnot.id);
                if (inputFields && inputFields.className === 'e-pdfviewer-signatureformFields signature') {
                    inputFields.className = 'e-pdfviewer-signatureformFields';
                    inputFields.style.pointerEvents = '';
                    this.pdfViewer.formFieldsModule.updateDataInSession(inputFields, '');
                }
            }
            this.pdfViewer.remove(this.pdfViewer.selectedItems.annotations[0]);
            this.pdfViewer.renderDrawing();
            this.pdfViewer.clearSelection(pageNumber);
            this.pdfViewerBase.isDocumentEdited = true;
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.fireAnnotationRemove(pageNumber, annotationId, annotType);
            if (this.pdfViewer.textSelectionModule) {
                this.pdfViewer.textSelectionModule.enableTextSelectionMode();
            }
        }
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(false);
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableTextMarkupAnnotationPropertiesTools(false);
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.getAnnotationType = function (type, measureType) {
        var annotType;
        if (measureType === '' || isNullOrUndefined(measureType)) {
            switch (type) {
                case 'Line':
                    annotType = 'Line';
                    break;
                case 'LineWidthArrowHead':
                    annotType = 'Arrow';
                    break;
                case 'Rectangle':
                    annotType = 'Rectangle';
                    break;
                case 'Ellipse':
                    annotType = 'Circle';
                    break;
                case 'Polygon':
                    annotType = 'Polygon';
                    break;
            }
        }
        else {
            switch (measureType) {
                case 'Distance':
                    annotType = 'Distance';
                    break;
                case 'Perimeter':
                    annotType = 'Perimeter';
                    break;
                case 'Area':
                    annotType = 'Area';
                    break;
                case 'Radius':
                    annotType = 'Radius';
                    break;
                case 'Volume':
                    annotType = 'Volume';
                    break;
            }
        }
        return annotType;
    };
    /**
     * @private
     */
    Annotation.prototype.getAnnotationIndex = function (pageNumber, annotationId) {
        var pageAnnotationBases = this.pdfViewer.drawing.getPageObjects(pageNumber);
        var index = null;
        for (var i = 0; i < pageAnnotationBases.length; i++) {
            if (pageAnnotationBases[i].id === annotationId) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @private
     */
    Annotation.prototype.initializeCollection = function () {
        this.actionCollection = [];
        this.redoCollection = [];
        this.pdfViewerBase.customStampCollection = [];
        if (!this.popupNote) {
            this.createNote();
        }
    };
    /**
     * @private
     */
    Annotation.prototype.showCommentsPanel = function () {
        if (this.pdfViewer.enableCommentPanel) {
            var commentPanel = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
            if (commentPanel) {
                if (commentPanel.style.display === 'none') {
                    commentPanel.style.display = 'block';
                    this.pdfViewerBase.navigationPane.commentPanelResizer.style.display = 'block';
                    this.pdfViewerBase.navigationPane.setCommentPanelResizeIconTop();
                    this.pdfViewer.annotation.stickyNotesAnnotationModule.updateCommentPanelTextTop();
                    var viewerContainer = document.getElementById(this.pdfViewer.element.id + '_viewerContainer');
                    var pageContainer = document.getElementById(this.pdfViewer.element.id + '_pageViewContainer');
                    if (viewerContainer) {
                        if (this.pdfViewer.enableRtl) {
                            viewerContainer.style.left = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        else {
                            viewerContainer.style.right = this.pdfViewerBase.navigationPane.getViewerContainerRight() + 'px';
                        }
                        // tslint:disable-next-line:max-line-length
                        viewerContainer.style.width = (this.pdfViewer.element.clientWidth - this.pdfViewerBase.navigationPane.getViewerContainerLeft() - this.pdfViewerBase.navigationPane.getViewerContainerRight()) + 'px';
                        pageContainer.style.width = (viewerContainer.offsetWidth - this.pdfViewerBase.navigationPane.getViewerContainerScrollbarWidth()) + 'px';
                    }
                    this.pdfViewerBase.updateZoomValue();
                    if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                        this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.addAction = function (
    // tslint:disable-next-line
    pageNumber, index, annotation, actionString, property, node, redo) {
        var action = {
            pageIndex: pageNumber, index: index, annotation: annotation,
            action: actionString, modifiedProperty: property, undoElement: node, redoElement: redo
        };
        this.actionCollection.push(action);
        this.updateToolbar();
    };
    /**
     * @private
     */
    Annotation.prototype.undo = function () {
        var actionObject = this.actionCollection.pop();
        if (actionObject) {
            // tslint:disable-next-line
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            this.isUndoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        // tslint:disable-next-line:max-line-length
                        this.textMarkupAnnotationModule.undoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        // tslint:disable-next-line:max-line-length
                        actionObject.annotation = this.textMarkupAnnotationModule.undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty, true);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.undoElement.bounds, vertexPoints: actionObject.undoElement.vertexPoints, leaderHeight: actionObject.undoElement.leaderHeight });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.undoElement.bounds });
                    }
                    // tslint:disable-next-line:max-line-length
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { notes: actionObject.undoElement.notes });
                        this.updateCalibrateValues(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    // tslint:disable-next-line:max-line-length
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead' ||
                        actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature') {
                        this.modifyInCollections(actionObject.annotation, 'bounds');
                    }
                    break;
                case 'Addition':
                    var isAnnotationUpdate = false;
                    // tslint:disable-next-line:max-line-length
                    if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                        if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'shape');
                        }
                        else {
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, 'measure');
                        }
                        isAnnotationUpdate = true;
                        actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                    }
                    if (shapeType === 'Stamp' || shapeType === 'Image') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                        // tslint:disable-next-line:max-line-length
                        this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                        isAnnotationUpdate = true;
                    }
                    if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature') {
                        isAnnotationUpdate = true;
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                        actionObject.duplicate = this.modifyInCollections(actionObject.annotation, 'delete');
                    }
                    if (!isAnnotationUpdate) {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, actionObject.annotation.shapeAnnotationType, 'delete');
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.remove(actionObject.annotation);
                    this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                    // tslint:disable-next-line
                    var removeDiv = document.getElementById(actionObject.annotation.annotName);
                    if (removeDiv) {
                        if (removeDiv.parentElement.childElementCount === 1) {
                            this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                        }
                        else {
                            removeDiv.remove();
                        }
                    }
                    break;
                case 'Delete':
                    // tslint:disable-next-line:max-line-length
                    if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                        if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                            shapeType = 'shape';
                            this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                        else {
                            shapeType = 'shape_measure';
                            this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                        }
                    }
                    if (shapeType === 'Stamp' || shapeType === 'Image') {
                        this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.annotation);
                    }
                    else if (shapeType === 'FreeText') {
                        this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.undoElement);
                    }
                    var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                    if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                        this.pdfViewer.nodePropertyChange(addedAnnot, {});
                    }
                    this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(actionObject.annotation.pageIndex, shapeType);
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = new Date().toLocaleString();
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { strokeColor: actionObject.undoElement.strokeColor });
                    this.modifyInCollections(actionObject.annotation, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fillColor: actionObject.undoElement.fillColor });
                    this.modifyInCollections(actionObject.annotation, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.undoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(actionObject.annotation);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                        actionObject.annotation.modifiedDate = new Date().toLocaleString();
                    }
                    else {
                        this.modifyInCollections(actionObject.annotation, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { thickness: actionObject.undoElement.thickness });
                    this.modifyInCollections(actionObject.annotation, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                        // tslint:disable-next-line:max-line-length
                        fillColor: actionObject.undoElement.fillColor, borderDashArray: actionObject.undoElement.borderDashArray, borderStyle: actionObject.undoElement.borderStyle,
                        // tslint:disable-next-line:max-line-length
                        strokeColor: actionObject.undoElement.strokeColor, opacity: actionObject.undoElement.opacity, thickness: actionObject.undoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadStart), taregetDecoraterShapes: this.getArrowType(actionObject.undoElement.lineHeadEnd)
                    });
                    this.updateCollectionForLineProperty(actionObject.annotation);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    actionObject.annotation.modifiedDate = new Date().toLocaleString();
                    break;
                case 'Comments Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Comments Reply Deleted':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'dynamicText Change':
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    actionObject.annotation.dynamicText = actionObject.undoElement.dynamicText;
                    // tslint:disable-next-line
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.undoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    this.modifyInCollections(actionObject.annotation, 'dynamicText');
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {});
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    break;
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontColor: actionObject.undoElement.fontColor });
                    this.modifyInCollections(actionObject.annotation, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontSize: actionObject.undoElement.fontSize });
                    this.modifyInCollections(actionObject.annotation, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontFamily':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontFamily: actionObject.undoElement.fontFamily });
                    this.modifyInCollections(actionObject.annotation, 'fontFamily');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { textAlign: actionObject.undoElement.textAlign });
                    this.modifyInCollections(actionObject.annotation, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { font: actionObject.undoElement.font });
                    this.modifyInCollections(actionObject.annotation, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
            }
            this.redoCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
            this.isUndoAction = false;
        }
    };
    /**
     * @private
     */
    Annotation.prototype.redo = function () {
        var actionObject = this.redoCollection.pop();
        if (actionObject) {
            // tslint:disable-next-line
            var shapeType = actionObject.annotation.shapeAnnotationType;
            this.isUndoRedoAction = true;
            switch (actionObject.action) {
                case 'Text Markup Property modified':
                    if (this.textMarkupAnnotationModule) {
                        // tslint:disable-next-line:max-line-length
                        actionObject.annotation = this.textMarkupAnnotationModule.undoRedoPropertyChange(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.modifiedProperty);
                    }
                    break;
                case 'Text Markup Added':
                case 'Text Markup Deleted':
                    if (this.textMarkupAnnotationModule) {
                        // tslint:disable-next-line:max-line-length
                        this.textMarkupAnnotationModule.redoTextMarkupAction(actionObject.annotation, actionObject.pageIndex, actionObject.index, actionObject.action);
                    }
                    break;
                case 'Drag':
                case 'Resize':
                    if (isLineShapes(actionObject.annotation)) {
                        this.pdfViewer.nodePropertyChange(
                        // tslint:disable-next-line:max-line-length
                        actionObject.annotation, { bounds: actionObject.redoElement.bounds, vertexPoints: actionObject.redoElement.vertexPoints, leaderHeight: actionObject.redoElement.leaderHeight });
                    }
                    else {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { bounds: actionObject.redoElement.bounds });
                    }
                    // tslint:disable-next-line:max-line-length
                    if (actionObject.annotation.measureType === 'Distance' || actionObject.annotation.measureType === 'Perimeter' || actionObject.annotation.measureType === 'Area' ||
                        actionObject.annotation.measureType === 'Radius' || actionObject.annotation.measureType === 'Volume') {
                        this.pdfViewer.nodePropertyChange(actionObject.annotation, { notes: actionObject.redoElement.notes });
                        this.updateCalibrateValues(actionObject.annotation);
                    }
                    this.pdfViewer.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                    this.pdfViewer.select([actionObject.annotation.id]);
                    // tslint:disable-next-line:max-line-length
                    if (actionObject.annotation.shapeAnnotationType === 'Line' || actionObject.annotation.shapeAnnotationType === 'Rectangle' || actionObject.annotation.shapeAnnotationType === 'Ellipse' || actionObject.annotation.shapeAnnotationType === 'Polygon' || actionObject.annotation.shapeAnnotationType === 'LineWidthArrowHead'
                        || actionObject.annotation.shapeAnnotationType === 'Radius' || actionObject.annotation.shapeAnnotationType === 'FreeText' || actionObject.annotation.shapeAnnotationType === 'HandWrittenSignature') {
                        this.modifyInCollections(actionObject.annotation, 'bounds');
                    }
                    break;
                case 'Addition':
                    // tslint:disable-next-line:max-line-length
                    if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                        if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                            shapeType = 'shape';
                            this.shapeAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                        else {
                            shapeType = 'shape_measure';
                            this.measureAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                        }
                    }
                    if (shapeType === 'FreeText') {
                        this.freeTextAnnotationModule.addInCollection(actionObject.annotation.pageIndex, actionObject.duplicate);
                    }
                    if (shapeType === 'Stamp') {
                        this.stampAnnotationModule.updateDeleteItems(actionObject.annotation.pageIndex, actionObject.redoElement);
                    }
                    var addedAnnot = this.pdfViewer.add(actionObject.annotation);
                    if ((shapeType === 'FreeText' || addedAnnot.enableShapeLabel) && addedAnnot) {
                        this.pdfViewer.nodePropertyChange(addedAnnot, {});
                    }
                    this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.addAnnotationComments(actionObject.annotation.pageIndex, shapeType);
                    break;
                case 'Delete':
                    var isUpdate = false;
                    var sType = actionObject.annotation.shapeAnnotationType;
                    // tslint:disable-next-line:max-line-length
                    if (shapeType === 'Line' || shapeType === 'LineWidthArrowHead' || shapeType === 'Polygon' || shapeType === 'Ellipse' || shapeType === 'Rectangle' || shapeType === 'Radius' || shapeType === 'Distance') {
                        if (actionObject.annotation.measureType === '' || isNullOrUndefined(actionObject.annotation.measureType)) {
                            sType = 'shape';
                        }
                        else {
                            sType = 'measure';
                        }
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                        this.modifyInCollections(actionObject.annotation, 'delete');
                        isUpdate = true;
                    }
                    if (shapeType === 'Stamp') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                        this.stampAnnotationModule.updateSessionStorage(actionObject.annotation, null, 'delete');
                        isUpdate = true;
                    }
                    if (shapeType === 'FreeText' || shapeType === 'HandWrittenSignature') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                        this.modifyInCollections(actionObject.annotation, 'delete');
                    }
                    if (!isUpdate) {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.stickyNotesAnnotationModule.findPosition(actionObject.annotation, sType, 'delete');
                    }
                    this.pdfViewer.clearSelection(actionObject.annotation.pageIndex);
                    this.pdfViewer.remove(actionObject.annotation);
                    this.pdfViewer.renderDrawing(null, actionObject.annotation.pageIndex);
                    // tslint:disable-next-line
                    var removeDiv = document.getElementById(actionObject.annotation.annotName);
                    if (removeDiv) {
                        if (removeDiv.parentElement.childElementCount === 1) {
                            this.stickyNotesAnnotationModule.updateAccordionContainer(removeDiv);
                        }
                        else {
                            removeDiv.remove();
                        }
                    }
                    break;
                case 'stampOpacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.redoElement.opacity });
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    break;
                case 'Shape Stroke':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { strokeColor: actionObject.redoElement.strokeColor });
                    this.modifyInCollections(actionObject.annotation, 'stroke');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Fill':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fillColor: actionObject.redoElement.fillColor });
                    this.modifyInCollections(actionObject.annotation, 'fill');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Opacity':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { opacity: actionObject.redoElement.opacity });
                    if (actionObject.annotation.shapeAnnotationType === 'StickyNotes') {
                        this.stickyNotesAnnotationModule.updateOpacityValue(actionObject.annotation);
                        this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    }
                    else {
                        this.modifyInCollections(actionObject.annotation, 'opacity');
                    }
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Shape Thickness':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { thickness: actionObject.redoElement.thickness });
                    this.modifyInCollections(actionObject.annotation, 'thickness');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Line properties change':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {
                        // tslint:disable-next-line:max-line-length
                        fillColor: actionObject.redoElement.fillColor, strokeColor: actionObject.redoElement.strokeColor, opacity: actionObject.redoElement.opacity, thickness: actionObject.redoElement.thickness,
                        sourceDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadStart), taregetDecoraterShapes: this.getArrowType(actionObject.redoElement.lineHeadEnd),
                        borderDashArray: actionObject.redoElement.borderDashArray, borderStyle: actionObject.redoElement.borderStyle
                    });
                    this.updateCollectionForLineProperty(actionObject.annotation);
                    this.pdfViewer.renderDrawing();
                    break;
                case 'Text Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    break;
                case 'Comments Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    break;
                case 'Status Property Added':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'Comments Reply Deleted':
                    // tslint:disable-next-line:max-line-length
                    actionObject.annotation = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action);
                    break;
                case 'dynamicText Change':
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                    actionObject.annotation.dynamicText = actionObject.redoElement.dynamicText;
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.redoAction(actionObject.annotation, actionObject.action, actionObject.undoElement);
                    this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(actionObject.annotation, null, true);
                    this.modifyInCollections(actionObject.annotation, 'dynamicText');
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, {});
                    this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    break;
                case 'fontColor':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontColor: actionObject.redoElement.fontColor });
                    this.modifyInCollections(actionObject.annotation, 'fontColor');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'fontSize':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { fontSize: actionObject.redoElement.fontSize });
                    this.modifyInCollections(actionObject.annotation, 'fontSize');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textAlign':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { textAlign: actionObject.redoElement.textAlign });
                    this.modifyInCollections(actionObject.annotation, 'textAlign');
                    this.pdfViewer.renderDrawing();
                    break;
                case 'textPropertiesChange':
                    this.pdfViewer.nodePropertyChange(actionObject.annotation, { font: actionObject.redoElement.font });
                    this.modifyInCollections(actionObject.annotation, 'textPropertiesChange');
                    this.pdfViewer.renderDrawing();
                    break;
            }
            if (actionObject.redoElement && actionObject.redoElement.modifiedDate !== undefined) {
                actionObject.annotation.modifiedDate = actionObject.redoElement.modifiedDate;
            }
            this.actionCollection.push(actionObject);
            this.updateToolbar();
            this.isUndoRedoAction = false;
        }
    };
    Annotation.prototype.updateCollectionForLineProperty = function (pdfAnnotationBase) {
        this.modifyInCollections(pdfAnnotationBase, 'fill');
        this.modifyInCollections(pdfAnnotationBase, 'stroke');
        this.modifyInCollections(pdfAnnotationBase, 'opacity');
        this.modifyInCollections(pdfAnnotationBase, 'thickness');
        this.modifyInCollections(pdfAnnotationBase, 'dashArray');
        this.modifyInCollections(pdfAnnotationBase, 'startArrow');
        this.modifyInCollections(pdfAnnotationBase, 'endArrow');
    };
    Annotation.prototype.updateToolbar = function () {
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateUndoRedoButtons();
        }
    };
    Annotation.prototype.createNote = function () {
        // tslint:disable-next-line:max-line-length
        this.popupNote = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note', className: 'e-pv-annotation-note', styles: 'display:none' });
        this.popupNoteAuthor = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_author', className: 'e-pv-annotation-note-author' });
        this.popupNote.appendChild(this.popupNoteAuthor);
        // tslint:disable-next-line:max-line-length
        this.popupNoteContent = createElement('div', { id: this.pdfViewer.element.id + '_annotation_note_content', className: 'e-pv-annotation-note-content' });
        this.popupNote.appendChild(this.popupNoteContent);
        this.pdfViewerBase.mainContainer.appendChild(this.popupNote);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.showPopupNote = function (event, color, author, note, type) {
        var mainContainerPosition = this.pdfViewerBase.mainContainer.getBoundingClientRect();
        var popupNoteClientRect = this.popupNote.getBoundingClientRect();
        if (author) {
            this.popupNoteAuthor.textContent = author;
        }
        this.popupNoteContent.textContent = note;
        if (type === 'Highlight') {
            this.popupNote.style.backgroundColor = 'rgb(237, 232, 177)';
        }
        else if (type === 'Underline') {
            this.popupNote.style.backgroundColor = 'rgb(187, 241, 191)';
        }
        else if (type === 'Strikethrough') {
            this.popupNote.style.backgroundColor = 'rgb(242, 188, 207)';
        }
        this.popupNote.style.display = 'block';
        var topPosition = (event.pageY - mainContainerPosition.top + 5);
        var leftPosition = (event.pageX - mainContainerPosition.left + 5);
        if (leftPosition + popupNoteClientRect.width > mainContainerPosition.width) {
            leftPosition = leftPosition - popupNoteClientRect.width;
        }
        if (topPosition + popupNoteClientRect.height > mainContainerPosition.height) {
            topPosition = topPosition - popupNoteClientRect.height;
        }
        this.popupNote.style.top = topPosition + 'px';
        this.popupNote.style.left = leftPosition + 'px';
    };
    /**
     * @private
     */
    Annotation.prototype.hidePopupNote = function () {
        this.popupNote.style.display = 'none';
    };
    Annotation.prototype.createTextMarkupPopup = function () {
        var _this = this;
        var elementId = this.pdfViewer.element.id;
        // tslint:disable-next-line:max-line-length
        this.popupElement = createElement('div', { id: elementId + '_popup_annotation_note', className: 'e-pv-annotation-popup-menu', styles: 'display:none' });
        var headerElement = createElement('div', { id: elementId + '_popup_header', className: 'e-pv-annotation-popup-header' });
        // tslint:disable-next-line:max-line-length
        this.authorPopupElement = createElement('div', { id: elementId + '_popup_author', className: 'e-pv-annotation-popup-author' });
        headerElement.appendChild(this.authorPopupElement);
        // tslint:disable-next-line:max-line-length
        var closeBtn = createElement('span', { id: elementId + '_popup_close', className: 'e-pv-annotation-popup-close e-pv-icon' });
        headerElement.appendChild(closeBtn);
        this.popupElement.appendChild(headerElement);
        // tslint:disable-next-line:max-line-length
        this.modifiedDateElement = createElement('div', { id: elementId + '_popup_modified_time', className: 'e-pv-annotation-modified-time' });
        this.popupElement.appendChild(this.modifiedDateElement);
        // tslint:disable-next-line:max-line-length
        var contentContainer = createElement('div', { id: elementId + '_popup_content_container', className: 'e-pv-annotation-popup-note-container' });
        this.noteContentElement = createElement('div', { id: elementId + '_popup_content', className: 'e-pv-annotation-popup-content' });
        this.noteContentElement.contentEditable = 'true';
        contentContainer.appendChild(this.noteContentElement);
        this.popupElement.appendChild(contentContainer);
        this.pdfViewerBase.viewerContainer.appendChild(this.popupElement);
        closeBtn.addEventListener('click', this.saveClosePopupMenu.bind(this));
        closeBtn.addEventListener('touchend', this.saveClosePopupMenu.bind(this));
        this.popupElement.addEventListener('mousedown', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('mousemove', this.onPopupElementMove.bind(this));
        window.addEventListener('mouseup', this.onPopupElementMoveEnd.bind(this));
        this.popupElement.addEventListener('touchstart', this.onPopupElementMoveStart.bind(this));
        this.popupElement.addEventListener('touchmove', this.onPopupElementMove.bind(this));
        window.addEventListener('touchend', this.onPopupElementMoveEnd.bind(this));
        this.noteContentElement.addEventListener('mousedown', function () { _this.noteContentElement.focus(); });
    };
    // tslint:disable-next-line
    Annotation.prototype.onPopupElementMoveStart = function (event) {
        if (event.type === 'touchstart') {
            event = event.changedTouches[0];
        }
        if ((event.target.id !== (this.noteContentElement.id) || !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            this.isPopupMenuMoved = true;
            var popupElementClientRect = this.popupElement.getBoundingClientRect();
            this.clientX = event.clientX - popupElementClientRect.left;
            // tslint:disable-next-line:max-line-length
            this.clientY = (event.clientY - popupElementClientRect.top) + (this.pdfViewerBase.pageSize[this.currentAnnotPageNumber].top * this.pdfViewerBase.getZoomFactor());
        }
    };
    // tslint:disable-next-line
    Annotation.prototype.onPopupElementMove = function (event) {
        if (event.type === 'touchmove') {
            event = event.changedTouches[0];
        }
        // tslint:disable-next-line:max-line-length
        if (this.isPopupMenuMoved && (event.target.id !== (this.noteContentElement.id) || !(event.target.contains(this.noteContentElement.childNodes[0])))) {
            var left = (event.clientX - this.clientX) + parseFloat(this.popupElement.style.left);
            var top_1 = ((event.clientY - this.clientY) + parseFloat(this.popupElement.style.top));
            this.clientX = event.clientX;
            this.clientY = event.clientY;
            var clientPosition = this.popupElement.getBoundingClientRect();
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
            // tslint:disable-next-line:max-line-length
            if (left > parseFloat(pageDiv.style.left) && (left + clientPosition.width) < (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                this.popupElement.style.left = (left) + 'px';
            }
            else {
                this.popupElement.style.left = parseFloat(this.popupElement.style.left) + 'px';
            }
            // tslint:disable-next-line:max-line-length
            if (top_1 > parseFloat(pageDiv.style.top) && (top_1 + clientPosition.height) < (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                this.popupElement.style.top = (top_1) + 'px';
            }
            else {
                this.popupElement.style.top = parseFloat(this.popupElement.style.top) + 'px';
            }
        }
    };
    Annotation.prototype.onPopupElementMoveEnd = function () {
        this.isPopupMenuMoved = false;
    };
    Annotation.prototype.saveClosePopupMenu = function () {
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.saveNoteContent(this.currentAnnotPageNumber, this.noteContentElement.innerText);
        }
        this.closePopupMenu();
    };
    /**
     * @private
     */
    Annotation.prototype.closePopupMenu = function () {
        if (this.popupElement) {
            this.popupElement.parentElement.removeChild(this.popupElement);
            this.popupElement = null;
            this.isPopupNoteVisible = false;
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.showAnnotationPopup = function (event) {
        if (this.textMarkupAnnotationModule) {
            this.currentAnnotPageNumber = this.getEventPageNumber(event);
            // tslint:disable-next-line:max-line-length
            if (this.textMarkupAnnotationModule && (event.target !== (this.noteContentElement) || (event.target.contains(this.noteContentElement.childNodes[0])))) {
                this.hidePopupNote();
                if (!this.popupElement) {
                    this.createTextMarkupPopup();
                    this.popupElement.style.display = 'block';
                    this.authorPopupElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.author;
                    // tslint:disable-next-line:max-line-length
                    this.modifiedDateElement.textContent = this.getProperDate(this.textMarkupAnnotationModule.currentTextMarkupAnnotation.modifiedDate);
                    this.noteContentElement.textContent = this.textMarkupAnnotationModule.currentTextMarkupAnnotation.note;
                    var clientPosition = this.popupElement.getBoundingClientRect();
                    // tslint:disable-next-line:max-line-length
                    var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + this.currentAnnotPageNumber);
                    var canvasPosition = pageDiv.getBoundingClientRect();
                    var topPosition = ((event.clientY) - canvasPosition.top) + parseFloat(pageDiv.style.top);
                    var leftPosition = (event.clientX);
                    if ((leftPosition + clientPosition.width) > (parseFloat(pageDiv.style.left) + parseFloat(pageDiv.style.width))) {
                        this.popupElement.style.left = (leftPosition - clientPosition.width) + 'px';
                    }
                    else {
                        this.popupElement.style.left = leftPosition + 'px';
                    }
                    if ((topPosition + clientPosition.height) > (parseFloat(pageDiv.style.top) + parseFloat(pageDiv.style.height))) {
                        this.popupElement.style.top = (topPosition - clientPosition.height) + 'px';
                    }
                    else {
                        this.popupElement.style.top = topPosition + 'px';
                    }
                    this.isPopupNoteVisible = true;
                }
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.modifyOpacity = function (args) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var opacityValue = args.value / 100;
        redoClonedObject.opacity = opacityValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: opacityValue });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
        if (currentAnnotation.shapeAnnotationType === 'StickyNotes') {
            this.stickyNotesAnnotationModule.updateOpacityValue(currentAnnotation);
        }
        else {
            this.modifyInCollections(currentAnnotation, 'opacity');
        }
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyFontColor = function (currentColor) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontColor = currentColor;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: currentColor });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontColor', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'fontColor');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyFontFamily = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontFamily = currentValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontFamily: currentValue });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontFamily', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'fontFamily');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyFontSize = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fontSize = currentValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { fontSize: currentValue });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'fontSize', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'fontSize');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyTextAlignment = function (currentValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.textAlign = currentValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { textAlign: currentValue });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'textAlign', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'textAlign');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyTextProperties = function (fontInfo, action) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        if (action === 'bold') {
            redoClonedObject.font.isBold = fontInfo.isBold;
        }
        else if (action === 'italic') {
            redoClonedObject.font.isItalic = fontInfo.isItalic;
        }
        else if (action === 'underline') {
            redoClonedObject.font.isUnderline = fontInfo.isUnderline;
        }
        else if (action === 'strikeout') {
            redoClonedObject.font.isStrikeout = fontInfo.isStrikeout;
        }
        this.pdfViewer.nodePropertyChange(currentAnnotation, { font: fontInfo });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'textPropertiesChange', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'textPropertiesChange');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyThickness = function (thicknessValue) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.thickness = thicknessValue;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: thicknessValue });
        this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'thickness');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyStrokeColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.strokeColor = color;
        this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: color });
        this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'stroke');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyFillColor = function (color) {
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        redoClonedObject.fillColor = color;
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], { fillColor: color });
        this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
        this.modifyInCollections(currentAnnotation, 'fill');
        this.pdfViewer.renderDrawing();
    };
    /**
     * @private
     */
    Annotation.prototype.modifyDynamicTextValue = function (dynamicText, annotName) {
        var currentAnnotation = null;
        currentAnnotation = this.pdfViewer.selectedItems.annotations.filter(function (s) { return s.annotName === annotName; })[0];
        if (currentAnnotation) {
            var clonedObject = cloneObject(currentAnnotation);
            var redoClonedObject = cloneObject(currentAnnotation);
            currentAnnotation.dynamicText = dynamicText;
            redoClonedObject.dynamicText = dynamicText;
            this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], { dynamicText: dynamicText });
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'dynamicText Change', '', clonedObject, redoClonedObject);
            this.modifyInCollections(currentAnnotation, 'dynamicText');
            this.pdfViewer.renderDrawing();
        }
    };
    // tslint:disable-next-line
    Annotation.prototype.modifyInCollections = function (annotationBase, property) {
        // tslint:disable-next-line
        var returnObj;
        if (annotationBase.measureType === '' || isNullOrUndefined(annotationBase.measureType)) {
            if (annotationBase.shapeAnnotationType === 'FreeText') {
                returnObj = this.freeTextAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else if (annotationBase.shapeAnnotationType === 'HandWrittenSignature') {
                // tslint:disable-next-line:max-line-length
                returnObj = this.pdfViewerBase.signatureModule.modifySignatureCollection(property, annotationBase.pageIndex, annotationBase);
            }
            else {
                returnObj = this.shapeAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
            }
        }
        else if (annotationBase.measureType === 'Distance' || annotationBase.measureType === 'Perimeter' ||
            annotationBase.measureType === 'Radius' || annotationBase.measureType === 'Area' || annotationBase.measureType === 'Volume') {
            returnObj = this.measureAnnotationModule.modifyInCollection(property, annotationBase.pageIndex, annotationBase);
        }
        if (this.isUndoRedoAction) {
            this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase, null, true);
            if (this.isUndoAction) {
                annotationBase.modifiedDate = new Date().toLocaleString();
            }
        }
        else {
            if (property !== 'bounds') {
                this.stickyNotesAnnotationModule.updateAnnotationModifiedDate(annotationBase);
            }
        }
        return returnObj;
    };
    /**
     * @private
     */
    Annotation.prototype.createPropertiesWindow = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        var dialogDiv = createElement('div', { id: elementID + '_properties_window', className: 'e-pv-properties-window' });
        var appearanceTab = this.createAppearanceTab();
        this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
        this.propertiesDialog = new Dialog({
            showCloseIcon: true, closeOnEscape: false, isModal: true, header: this.pdfViewer.localeObj.getConstant('Line Properties'),
            target: this.pdfViewer.element, content: appearanceTab, close: function () {
                _this.destroyPropertiesWindow();
            }
        });
        if (!Browser.isDevice) {
            this.propertiesDialog.buttons = [
                // tslint:disable-next-line:max-line-length
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) }
            ];
        }
        else {
            this.propertiesDialog.buttons = [
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.onCancelClicked.bind(this) },
                // tslint:disable-next-line:max-line-length
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.onOkClicked.bind(this) }
            ];
        }
        if (this.pdfViewer.enableRtl) {
            this.propertiesDialog.enableRtl = true;
        }
        this.propertiesDialog.appendTo(dialogDiv);
        // tslint:disable-next-line:max-line-length
        this.startArrowDropDown.content = this.createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].sourceDecoraterShapes)).outerHTML;
        this.endArrowDropDown.content = this.createContent(this.getArrowString(this.pdfViewer.selectedItems.annotations[0].taregetDecoraterShapes)).outerHTML;
        this.thicknessBox.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
        this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
        this.refreshColorPicker(this.fillColorPicker);
        this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        this.refreshColorPicker(this.strokeColorPicker);
        this.updateColorInIcon(this.fillDropDown.element, this.fillColorPicker.value);
        this.updateColorInIcon(this.strokeDropDown.element, this.strokeColorPicker.value);
        this.opacitySlider.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
        this.updateOpacityIndicator();
        // tslint:disable-next-line
        if (parseInt(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray) >= 3) {
            this.lineStyleDropDown.content = this.createDropDownContent('dashed').outerHTML;
        }
        else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '2') {
            this.lineStyleDropDown.content = this.createDropDownContent('dotted').outerHTML;
        }
        else if (this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray === '0') {
            this.lineStyleDropDown.content = this.createDropDownContent('solid').outerHTML;
        }
        this.selectedLineStyle = this.pdfViewer.selectedItems.annotations[0].borderStyle;
        this.selectedLineDashArray = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeDashArray;
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            this.leaderLengthBox.value = this.pdfViewer.selectedItems.annotations[0].leaderHeight;
        }
    };
    Annotation.prototype.destroyPropertiesWindow = function () {
        if (this.strokeColorPicker) {
            this.strokeColorPicker.destroy();
            this.strokeColorPicker = null;
        }
        if (this.fillColorPicker) {
            this.fillColorPicker.destroy();
            this.fillColorPicker = null;
        }
        if (this.endArrowDropDown) {
            this.endArrowDropDown.destroy();
            this.endArrowDropDown = null;
        }
        if (this.startArrowDropDown) {
            this.startArrowDropDown.destroy();
            this.startArrowDropDown = null;
        }
        if (this.opacitySlider) {
            this.opacitySlider.destroy();
            this.opacitySlider = null;
        }
        if (this.thicknessBox) {
            this.thicknessBox.destroy();
            this.thicknessBox = null;
        }
        if (this.lineStyleDropDown) {
            this.lineStyleDropDown.destroy();
            this.lineStyleDropDown = null;
        }
        if (this.leaderLengthBox) {
            this.leaderLengthBox.destroy();
            this.leaderLengthBox = null;
        }
        if (this.propertiesDialog) {
            this.propertiesDialog.destroy();
            this.propertiesDialog = null;
        }
        var dialogElement = this.pdfViewerBase.getElement('_properties_window');
        if (dialogElement) {
            dialogElement.parentElement.removeChild(dialogElement);
        }
    };
    Annotation.prototype.refreshColorPicker = function (colorPick) {
        colorPick.setProperties({ 'value': colorPick.value }, true);
        colorPick.refresh();
    };
    Annotation.prototype.createAppearanceTab = function () {
        var _this = this;
        var elementID = this.pdfViewer.element.id;
        // tslint:disable-next-line:max-line-length
        var items = [{ text: this.pdfViewer.localeObj.getConstant('None') }, { text: this.pdfViewer.localeObj.getConstant('Open Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Closed Arrow') },
            { text: this.pdfViewer.localeObj.getConstant('Round Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Square Arrow') }, { text: this.pdfViewer.localeObj.getConstant('Diamond Arrow') }];
        // tslint:disable-next-line:max-line-length
        var appearanceDiv = createElement('div', { id: elementID + '_properties_appearance' });
        var lineStyleContainer = createElement('div', { className: 'e-pv-properties-line-style-prop' });
        appearanceDiv.appendChild(lineStyleContainer);
        // tslint:disable-next-line:max-line-length
        var lineHeadStartElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Start Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-start', elementID + '_properties_line_start');
        // tslint:disable-next-line:max-line-length
        this.startArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-start', select: this.onStartArrowHeadStyleSelect.bind(this) }, lineHeadStartElement);
        var lineHeadEndElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('End Arrow'), lineStyleContainer, 'text', 'button', true, 'e-pv-properties-line-end', elementID + '_properties_line_end');
        // tslint:disable-next-line:max-line-length
        var borderStyleContainer = createElement('div', { className: 'e-pv-properties-border-style' });
        appearanceDiv.appendChild(borderStyleContainer);
        // tslint:disable-next-line:max-line-length
        this.endArrowDropDown = new DropDownButton({ items: items, cssClass: 'e-pv-properties-line-end', select: this.onEndArrowHeadStyleSelect.bind(this) }, lineHeadEndElement);
        var lineStyleElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Style'), borderStyleContainer, 'text', 'button', true, 'e-pv-properties-line-style', elementID + '_properties_line_style');
        var dropDownTarget = this.createStyleList();
        // tslint:disable-next-line:max-line-length
        this.lineStyleDropDown = new DropDownButton({ cssClass: 'e-pv-properties-line-style', target: dropDownTarget }, lineStyleElement);
        // tslint:disable-next-line:max-line-length
        var thicknessElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Thickness'), borderStyleContainer, 'text', 'input', true, 'e-pv-properties-line-thickness', elementID + '_properties_thickness');
        this.thicknessBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-thickness', min: 0, max: 12 }, thicknessElement);
        var colorStyleContainer = createElement('div', { className: 'e-pv-properties-color-style' });
        appearanceDiv.appendChild(colorStyleContainer);
        // tslint:disable-next-line:max-line-length
        var fillColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Fill Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-fill-color', elementID + '_properties_fill_color');
        this.fillColorPicker = this.createColorPicker(elementID + '_properties_fill_color', true);
        this.fillColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.fillDropDown.toggle();
            _this.updateColorInIcon(_this.fillDropDown.element, currentColor);
        };
        // tslint:disable-next-line:max-line-length
        this.fillDropDown = this.createDropDownButton(fillColorElement, 'e-pv-properties-fill-color-icon', this.fillColorPicker.element.parentElement);
        this.fillDropDown.beforeOpen = this.onFillDropDownBeforeOpen.bind(this);
        this.fillDropDown.open = function () { _this.fillColorPicker.refresh(); };
        // tslint:disable-next-line:max-line-length
        var strokeColorElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Line Color'), colorStyleContainer, 'color', 'button', true, 'e-pv-properties-line-stroke-color', elementID + '_properties_stroke_color');
        this.strokeColorPicker = this.createColorPicker(elementID + '_properties_stroke_color', false);
        this.strokeColorPicker.change = function (args) {
            var currentColor = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
            _this.strokeDropDown.toggle();
            _this.updateColorInIcon(_this.strokeDropDown.element, currentColor);
        };
        // tslint:disable-next-line:max-line-length
        this.strokeDropDown = this.createDropDownButton(strokeColorElement, 'e-pv-properties-stroke-color-icon', this.strokeColorPicker.element.parentElement);
        this.strokeDropDown.beforeOpen = this.onStrokeDropDownBeforeOpen.bind(this);
        this.strokeDropDown.open = function () { _this.strokeColorPicker.refresh(); };
        var opacityContainer = createElement('div', { className: 'e-pv-properties-opacity-style' });
        appearanceDiv.appendChild(opacityContainer);
        // tslint:disable-next-line:max-line-length
        var opacityElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Opacity'), opacityContainer, '', 'div', true, 'e-pv-properties-line-opacity', elementID + '_properties_opacity');
        this.opacitySlider = new Slider({ type: 'MinRange', max: 100, min: 0, cssClass: 'e-pv-properties-line-opacity', change: function () { _this.updateOpacityIndicator(); } }, opacityElement);
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            // tslint:disable-next-line:max-line-length
            var lineLengthElement = this.createInputElement(this.pdfViewer.localeObj.getConstant('Leader Length'), opacityContainer, 'text', 'input', true, 'e-pv-properties-line-leader-length', elementID + '_properties_leader_length');
            this.leaderLengthBox = new NumericTextBox({ value: 0, format: '## pt', cssClass: 'e-pv-properties-line-leader-length', min: 0, max: 100 }, lineLengthElement);
        }
        return appearanceDiv;
    };
    Annotation.prototype.createContent = function (text) {
        var divElement = createElement('div', { className: 'e-pv-properties-line-style-content' });
        divElement.textContent = text;
        return divElement;
    };
    Annotation.prototype.onStrokeDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.strokeColorPicker.refresh();
    };
    Annotation.prototype.onFillDropDownBeforeOpen = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.fillColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        }
        this.fillColorPicker.refresh();
    };
    Annotation.prototype.createStyleList = function () {
        var _this = this;
        var ulElement = createElement('ul');
        document.body.appendChild(ulElement);
        var solidLi = this.createListForStyle('solid');
        solidLi.addEventListener('click', function () { _this.setThickness('0', 'solid'); });
        ulElement.appendChild(solidLi);
        var dottedLi = this.createListForStyle('dotted');
        dottedLi.addEventListener('click', function () { _this.setThickness('2', 'dotted'); });
        ulElement.appendChild(dottedLi);
        var dashedLi = this.createListForStyle('dashed');
        dashedLi.addEventListener('click', function () { _this.setThickness('3', 'dashed'); });
        ulElement.appendChild(dashedLi);
        return ulElement;
    };
    Annotation.prototype.createColorPicker = function (idString, isNoColor) {
        var inputElement = createElement('input', { id: idString + '_target' });
        document.body.appendChild(inputElement);
        var colorPicker = new ColorPicker({
            inline: true, mode: 'Palette', enableOpacity: false, value: '#000000', showButtons: false, modeSwitcher: false,
            noColor: isNoColor
        });
        if (this.pdfViewer.enableRtl) {
            colorPicker.enableRtl = true;
        }
        colorPicker.appendTo(inputElement);
        return colorPicker;
    };
    Annotation.prototype.createDropDownButton = function (element, iconClass, target) {
        // tslint:disable-next-line:max-line-length
        var dropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        return dropDownButton;
    };
    Annotation.prototype.updateColorInIcon = function (element, color) {
        element.childNodes[0].style.borderBottomColor = color;
    };
    Annotation.prototype.setThickness = function (value, style) {
        this.lineStyleDropDown.content = this.createDropDownContent(style).outerHTML;
        this.selectedLineDashArray = value;
        if (value === '0') {
            this.selectedLineStyle = 'Solid';
        }
        else if (value === '2' || value === '3') {
            this.selectedLineStyle = 'Dashed';
        }
    };
    Annotation.prototype.createDropDownContent = function (style) {
        var divElement = createElement('div', { className: 'e-pv-line-styles-content-container' });
        // tslint:disable-next-line:max-line-length
        var spanElement = createElement('span', { className: 'e-pv-line-styles-content', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        return divElement;
    };
    Annotation.prototype.createListForStyle = function (style) {
        var liElement = createElement('li', { className: 'e-menu-item' });
        var divElement = createElement('div', { className: 'e-pv-line-styles-container' });
        // tslint:disable-next-line:max-line-length
        var spanElement = createElement('span', { className: 'e-pv-line-styles-item', styles: 'border-bottom-style:' + style });
        divElement.appendChild(spanElement);
        liElement.appendChild(divElement);
        return liElement;
    };
    Annotation.prototype.onStartArrowHeadStyleSelect = function (args) {
        this.startArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    Annotation.prototype.onEndArrowHeadStyleSelect = function (args) {
        this.endArrowDropDown.content = this.createContent(args.item.text).outerHTML;
    };
    // tslint:disable-next-line:max-line-length
    Annotation.prototype.createInputElement = function (labelText, parentElement, inputType, input, isLabelNeeded, className, idString) {
        var container = createElement('div', { id: idString + '_container', className: className + '-container' });
        if (isLabelNeeded) {
            var label = createElement('div', { id: idString + '_label', className: className + '-label' });
            label.textContent = labelText;
            container.appendChild(label);
        }
        if (this.pdfViewer.localeObj.getConstant('Opacity') === labelText) {
            this.opacityIndicator = createElement('span', { className: 'e-pv-properties-opacity-indicator' });
            container.appendChild(this.opacityIndicator);
        }
        var textBoxInput = createElement(input, { id: idString });
        if (input === 'input') {
            textBoxInput.type = inputType;
        }
        container.appendChild(textBoxInput);
        parentElement.appendChild(container);
        return textBoxInput;
    };
    Annotation.prototype.updateOpacityIndicator = function () {
        this.opacityIndicator.textContent = this.opacitySlider.value + '%';
    };
    Annotation.prototype.onOkClicked = function () {
        var startArrow = this.getArrowTypeFromDropDown(this.startArrowDropDown.content);
        var endArrow = this.getArrowTypeFromDropDown(this.endArrowDropDown.content);
        var thickness = this.thicknessBox.value;
        var strokeColor = this.strokeColorPicker.getValue(this.strokeColorPicker.value, 'hex');
        strokeColor = (strokeColor === '') ? '#ffffff00' : strokeColor;
        var fillColor = this.fillColorPicker.getValue(this.fillColorPicker.value, 'hex');
        fillColor = (fillColor === '' || this.fillColorPicker.value === '#ffffff00') ? '#ffffff00' : fillColor;
        var opacity = this.opacitySlider.value / 100;
        var currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
        var clonedObject = cloneObject(currentAnnotation);
        var redoClonedObject = cloneObject(currentAnnotation);
        var newNode = {};
        var isColorChanged = false;
        var isStrokeColorChanged = false;
        var isThicknessChanged = false;
        var isOpacityChanged = false;
        var isLineHeadStartStyleChanged = false;
        var isLineHeadEndStyleChanged = false;
        var isBorderDashArrayChanged = false;
        if (startArrow !== currentAnnotation.sourceDecoraterShapes) {
            newNode.sourceDecoraterShapes = startArrow;
            redoClonedObject.lineHeadStart = this.getArrowString(startArrow);
            isLineHeadStartStyleChanged = true;
        }
        if (endArrow !== currentAnnotation.taregetDecoraterShapes) {
            newNode.taregetDecoraterShapes = endArrow;
            redoClonedObject.lineHeadEnd = this.getArrowString(endArrow);
            isLineHeadEndStyleChanged = true;
        }
        if (thickness !== currentAnnotation.wrapper.children[0].style.strokeWidth) {
            newNode.thickness = thickness;
            redoClonedObject.thickness = thickness;
            isThicknessChanged = true;
        }
        if (strokeColor !== currentAnnotation.wrapper.children[0].style.strokeColor) {
            newNode.strokeColor = strokeColor;
            redoClonedObject.strokeColor = strokeColor;
            isStrokeColorChanged = true;
        }
        if (fillColor !== currentAnnotation.wrapper.children[0].style.fill) {
            newNode.fillColor = fillColor;
            redoClonedObject.fillColor = fillColor;
            isColorChanged = true;
        }
        if (opacity !== currentAnnotation.wrapper.children[0].style.opacity) {
            newNode.opacity = opacity;
            redoClonedObject.opacity = opacity;
            isOpacityChanged = true;
        }
        if (this.selectedLineDashArray !== currentAnnotation.wrapper.children[0].style.strokeDashArray) {
            newNode.borderDashArray = this.selectedLineDashArray;
            newNode.borderStyle = this.selectedLineStyle;
            redoClonedObject.borderDashArray = newNode.borderDashArray;
            redoClonedObject.borderStyle = newNode.borderStyle;
            isBorderDashArrayChanged = true;
        }
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance' && this.leaderLengthBox.value !== this.pdfViewer.selectedItems.annotations[0].leaderHeight) {
            newNode.leaderHeight = this.leaderLengthBox.value;
        }
        this.pdfViewer.nodePropertyChange(this.pdfViewer.selectedItems.annotations[0], newNode);
        // tslint:disable-next-line:max-line-length
        this.triggerAnnotationPropChange(this.pdfViewer.selectedItems.annotations[0], isColorChanged, isStrokeColorChanged, isThicknessChanged, isOpacityChanged, isLineHeadStartStyleChanged, isLineHeadEndStyleChanged, isBorderDashArrayChanged);
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'thickness');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'stroke');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'fill');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'opacity');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'dashArray');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'startArrow');
        this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'endArrow');
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Distance') {
            this.modifyInCollections(this.pdfViewer.selectedItems.annotations[0], 'leaderLength');
        }
        // tslint:disable-next-line:max-line-length
        this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
        this.renderAnnotations(currentAnnotation.pageIndex, null, null, null);
        this.propertiesDialog.hide();
    };
    Annotation.prototype.onCancelClicked = function () {
        this.propertiesDialog.hide();
    };
    Annotation.prototype.getArrowTypeFromDropDown = function (arrowType) {
        arrowType = arrowType.split('</div>')[0].split('">')[1];
        var arrow = 'None';
        switch (arrowType) {
            case this.pdfViewer.localeObj.getConstant('None'):
                arrow = 'None';
                break;
            case this.pdfViewer.localeObj.getConstant('Open Arrow'):
                arrow = 'OpenArrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Closed Arrow'):
                arrow = 'Arrow';
                break;
            case this.pdfViewer.localeObj.getConstant('Round Arrow'):
                arrow = 'Circle';
                break;
            case this.pdfViewer.localeObj.getConstant('Square Arrow'):
                arrow = 'Square';
                break;
            case this.pdfViewer.localeObj.getConstant('Diamond Arrow'):
                arrow = 'Diamond';
                break;
        }
        return arrow;
    };
    /**
     * @private
     */
    Annotation.prototype.getArrowString = function (arrow) {
        var arrowType = this.pdfViewer.localeObj.getConstant('None');
        switch (arrow) {
            case 'Arrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Closed');
                break;
            case 'OpenArrow':
                arrowType = this.pdfViewer.localeObj.getConstant('Open Arrow');
                break;
            case 'Circle':
                arrowType = this.pdfViewer.localeObj.getConstant('Round');
                break;
            case 'None':
            case 'Square':
            case 'Diamond':
                arrowType = this.pdfViewer.localeObj.getConstant(arrow);
                break;
        }
        return arrowType;
    };
    /**
     * @private
     */
    Annotation.prototype.onAnnotationMouseUp = function () {
        if (this.pdfViewer.selectedItems.annotations.length !== 0) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
                this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
            }
            this.pdfViewerBase.disableTextSelectionMode();
        }
        else {
            if (this.pdfViewer.textSelectionModule && !this.pdfViewerBase.isPanMode) {
                this.pdfViewer.textSelectionModule.enableTextSelectionMode();
            }
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule && !Browser.isDevice) {
                // tslint:disable-next-line:max-line-length
                if (this.pdfViewer.annotation.freeTextAnnotationModule && !this.pdfViewer.annotation.freeTextAnnotationModule.isInuptBoxInFocus) {
                    this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
                    this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(false);
                }
                this.pdfViewer.toolbar.annotationToolbarModule.updateAnnnotationPropertyItems();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(false);
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.onShapesMouseup = function (pdfAnnotationBase, event) {
        // tslint:disable-next-line:max-line-length
        pdfAnnotationBase = isNullOrUndefined(pdfAnnotationBase) ? this.pdfViewer.selectedItems.annotations[0] : pdfAnnotationBase;
        if (pdfAnnotationBase) {
            // tslint:disable-next-line:max-line-length
            if ((this.pdfViewerBase.tool instanceof NodeDrawingTool || this.pdfViewerBase.tool instanceof LineTool) && !this.pdfViewerBase.tool.dragging) {
                // tslint:disable-next-line
                var setting = {
                    opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
                    thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
                    modifiedDate: pdfAnnotationBase.modifiedDate
                };
                var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
                // tslint:disable-next-line
                var bounds = { left: pdfAnnotationBase.bounds.x, top: pdfAnnotationBase.bounds.y, width: pdfAnnotationBase.bounds.width, height: pdfAnnotationBase.bounds.height };
                if (this.pdfViewerBase.tool instanceof LineTool) {
                    setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
                    setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
                    setting.borderDashArray = pdfAnnotationBase.borderDashArray;
                }
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    // tslint:disable-next-line:max-line-length
                    this.shapeAnnotationModule.renderShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' ||
                    pdfAnnotationBase.measureType === 'Radius') {
                    // tslint:disable-next-line:max-line-length
                    this.measureAnnotationModule.renderMeasureShapeAnnotations(pdfAnnotationBase, this.pdfViewer.annotation.getEventPageNumber(event));
                }
                this.pdfViewerBase.isDocumentEdited = true;
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.fireAnnotationAdd(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType), bounds, setting);
            }
            else if (this.pdfViewerBase.tool instanceof MoveTool || this.pdfViewerBase.tool instanceof ResizeTool) {
                this.pdfViewerBase.isDocumentEdited = true;
                if (this.pdfViewerBase.tool instanceof ResizeTool) {
                    this.triggerAnnotationResize(pdfAnnotationBase);
                }
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    if (pdfAnnotationBase.shapeAnnotationType === 'FreeText') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.freeTextAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else if (pdfAnnotationBase.shapeAnnotationType === 'HandWrittenSignature') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewerBase.signatureModule.modifySignatureCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    // tslint:disable-next-line:max-line-length
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Radius' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
            }
            else if (this.pdfViewerBase.tool instanceof ConnectTool) {
                this.pdfViewerBase.isDocumentEdited = true;
                this.triggerAnnotationResize(pdfAnnotationBase);
                if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                    // tslint:disable-next-line:max-line-length
                    if ((pdfAnnotationBase.shapeAnnotationType === 'Line' || pdfAnnotationBase.shapeAnnotationType === 'LineWidthArrowHead' || pdfAnnotationBase.shapeAnnotationType === 'Polygon')) {
                        this.pdfViewer.annotation.shapeAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // tslint:disable-next-line:max-line-length
                }
                else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume') {
                    if (pdfAnnotationBase.measureType === 'Distance') {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('leaderLength', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                    }
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('bounds', this.pdfViewer.annotation.getEventPageNumber(event), pdfAnnotationBase);
                }
            }
            if (this.pdfViewer.toolbarModule) {
                if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                    this.pdfViewer.toolbarModule.annotationToolbarModule.clearTextMarkupMode();
                    if (pdfAnnotationBase.measureType === '' || isNullOrUndefined(pdfAnnotationBase.measureType)) {
                        // tslint:disable-next-line:max-line-length
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearMeasureMode();
                    }
                    else if (pdfAnnotationBase.measureType === 'Distance' || pdfAnnotationBase.measureType === 'Perimeter' || pdfAnnotationBase.measureType === 'Area' || pdfAnnotationBase.measureType === 'Volume' || pdfAnnotationBase.measureType === 'Radius') {
                        this.pdfViewer.toolbarModule.annotationToolbarModule.clearShapeMode();
                    }
                    this.pdfViewer.toolbarModule.annotationToolbarModule.enableAnnotationPropertiesTools(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.selectAnnotationDeleteItem(true);
                    this.pdfViewer.toolbarModule.annotationToolbarModule.setCurrentColorInPicker();
                    this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden = true;
                    this.pdfViewer.toolbarModule.annotationToolbarModule.showAnnotationToolbar(this.pdfViewer.toolbarModule.annotationItem);
                }
            }
        }
    };
    /**
     * @private
     */
    Annotation.prototype.updateCalibrateValues = function (pdfAnnotationBase) {
        if (pdfAnnotationBase.measureType === 'Distance') {
            pdfAnnotationBase.notes = updateDistanceLabel(pdfAnnotationBase, pdfAnnotationBase.vertexPoints, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Radius') {
            pdfAnnotationBase.notes = updateRadiusLabel(pdfAnnotationBase, this.measureAnnotationModule);
            if (pdfAnnotationBase.enableShapeLabel === true) {
                pdfAnnotationBase.labelContent = pdfAnnotationBase.notes;
            }
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
            this.renderAnnotations(pdfAnnotationBase.pageIndex, null, null, null, null);
        }
        else if (pdfAnnotationBase.measureType === 'Perimeter') {
            pdfAnnotationBase.notes = this.measureAnnotationModule.calculatePerimeter(pdfAnnotationBase);
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
        }
        else if (pdfAnnotationBase.measureType === 'Area') {
            // tslint:disable-next-line:max-line-length
            pdfAnnotationBase.notes = this.measureAnnotationModule.calculateArea(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
        }
        else if (pdfAnnotationBase.measureType === 'Volume') {
            // tslint:disable-next-line:max-line-length
            pdfAnnotationBase.notes = this.measureAnnotationModule.calculateVolume(pdfAnnotationBase.vertexPoints, pdfAnnotationBase.id, pdfAnnotationBase.pageIndex);
            this.pdfViewer.annotation.measureAnnotationModule.modifyInCollection('notes', pdfAnnotationBase.pageIndex, pdfAnnotationBase);
            this.pdfViewer.annotation.stickyNotesAnnotationModule.addTextToComments(pdfAnnotationBase.annotName, pdfAnnotationBase.notes);
        }
    };
    /**
     * @private
     */
    Annotation.prototype.onAnnotationMouseDown = function () {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                this.enableBasedOnType();
                this.pdfViewer.toolbar.annotationToolbarModule.selectAnnotationDeleteItem(true);
            }
        }
    };
    Annotation.prototype.enableBasedOnType = function () {
        if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Stamp' ||
            this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Image') {
            this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
        }
        else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'StickyNotes') {
            this.pdfViewer.toolbar.annotationToolbarModule.enableStampAnnotationPropertiesTools(true);
        }
        else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Path') {
            this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(false);
        }
        else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
            this.pdfViewer.toolbar.annotationToolbarModule.enableFreeTextAnnotationPropertiesTools(true);
        }
        else if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'HandWrittenSignature') {
            this.pdfViewer.toolbar.annotationToolbarModule.enableSignaturePropertiesTools(true);
        }
        else {
            this.pdfViewer.toolbar.annotationToolbarModule.enableAnnotationPropertiesTools(true);
        }
    };
    Annotation.prototype.getProperDate = function (date) {
        var dateObject = new Date(date.toString());
        if (isNaN(dateObject.getFullYear())) {
            var dateString = date.slice(2, 16);
            // tslint:disable-next-line:max-line-length
            dateString = dateString.slice(0, 4) + '/' + dateString.slice(4, 6) + '/' + dateString.slice(6, 8) + ' ' + dateString.slice(8, 10) + ':' + dateString.slice(10, 12) + ':' + dateString.slice(12, 14);
            dateObject = new Date(dateString);
        }
        // tslint:disable-next-line:max-line-length
        return (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear() + ' ' + dateObject.getHours() + ':' + dateObject.getMinutes() + ':' + dateObject.getSeconds();
    };
    /**
     * @private
     */
    Annotation.prototype.getPageCollection = function (pageAnnotations, pageNumber) {
        var index = null;
        for (var i = 0; i < pageAnnotations.length; i++) {
            if (pageAnnotations[i].pageIndex === pageNumber) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getAnnotationWithId = function (annotations, id) {
        // tslint:disable-next-line
        var annotation;
        for (var i = 0; i < annotations.length; i++) {
            if (id === annotations[i].id) {
                annotation = annotations[i];
            }
        }
        return annotation;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getEventPageNumber = function (event) {
        var eventTarget = event.target;
        if (eventTarget.classList.contains('e-pv-hyperlink')) {
            eventTarget = eventTarget.parentElement;
        }
        // tslint:disable-next-line:max-line-length
        var pageString = eventTarget.id.split('_text_')[1] || eventTarget.id.split('_textLayer_')[1] || eventTarget.id.split('_annotationCanvas_')[1] || eventTarget.id.split('_pageDiv_')[1];
        // tslint:disable-next-line
        return parseInt(pageString);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getAnnotationComments = function (commentsAnnotations, parentAnnotation, author) {
        var newArray = [];
        var annotationObject = null;
        if (commentsAnnotations) {
            if (commentsAnnotations.length > 0) {
                for (var i = 0; i < commentsAnnotations.length; i++) {
                    // tslint:disable-next-line
                    var annotation = commentsAnnotations[i];
                    annotationObject = {
                        // tslint:disable-next-line:max-line-length
                        shapeAnnotationType: 'sticky', author: annotation.Author, modifiedDate: annotation.ModifiedDate, note: annotation.Note, state: annotation.state, stateModel: annotation.stateModel,
                        comments: [], review: { state: annotation.State, stateModel: annotation.StateModel, modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                        annotName: annotation.AnnotName, parentId: parentAnnotation.AnnotName, subject: 'Comments'
                    };
                    newArray[newArray.length] = annotationObject;
                }
            }
        }
        return newArray;
    };
    Annotation.prototype.getRandomNumber = function () {
        // tslint:disable-next-line
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line
            var random = Math.random() * 16 | 0, v = c == 'x' ? random : (random & 0x3 | 0x8);
            return random.toString(16);
        });
    };
    /**
     * @private
     */
    Annotation.prototype.createGUID = function () {
        // tslint:disable-next-line:max-line-length
        return this.getRandomNumber();
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    Annotation.prototype.createAnnotationLayer = function (pageDiv, pageWidth, pageHeight, pageNumber, displayMode) {
        // tslint:disable-next-line:max-line-length
        var annotationCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_annotationCanvas_' + pageNumber, className: 'e-pv-annotation-canvas' });
        annotationCanvas.width = pageWidth;
        annotationCanvas.height = pageHeight;
        annotationCanvas.style.display = displayMode;
        pageDiv.appendChild(annotationCanvas);
        return annotationCanvas;
    };
    /**
     * @private
     */
    Annotation.prototype.resizeAnnotations = function (width, height, pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
        }
    };
    /**
     * @private
     */
    Annotation.prototype.clearAnnotationCanvas = function (pageNumber) {
        var canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        if (canvas) {
            canvas.width = this.pdfViewerBase.pageSize[pageNumber].width * this.pdfViewerBase.getZoomFactor();
            canvas.height = this.pdfViewerBase.pageSize[pageNumber].height * this.pdfViewerBase.getZoomFactor();
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.renderAnnotations = function (pageNumber, shapeAnnotation, measureShapeAnnotation, textMarkupAnnotation, canvas, isImportAnnotations) {
        this.clearAnnotationCanvas(pageNumber);
        if (this.shapeAnnotationModule) {
            if (isImportAnnotations) {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber, true);
            }
            else {
                this.shapeAnnotationModule.renderShapeAnnotations(shapeAnnotation, pageNumber);
            }
        }
        if (this.measureAnnotationModule) {
            if (isImportAnnotations) {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber, true);
            }
            else {
                this.measureAnnotationModule.renderMeasureShapeAnnotations(measureShapeAnnotation, pageNumber);
            }
        }
        if (canvas !== null && canvas !== undefined) {
            canvas = canvas;
        }
        else {
            canvas = this.pdfViewerBase.getElement('_annotationCanvas_' + pageNumber);
        }
        this.pdfViewer.drawing.refreshCanvasDiagramLayer(canvas, pageNumber);
        if (this.textMarkupAnnotationModule) {
            if (isImportAnnotations) {
                // tslint:disable-next-line
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber, true);
            }
            else {
                // tslint:disable-next-line
                this.textMarkupAnnotationModule.renderTextMarkupAnnotationsInPage(textMarkupAnnotation, pageNumber);
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.storeAnnotations = function (pageNumber, annotation, annotationId) {
        // let annotationId: string = '_annotations_textMarkup';
        // if (annotation is ITextMarkupAnnotation) {
        //     annotationId = '_annotations_textMarkup';
        // } else if (annotation as IShapeAnnotation) {
        //     annotationId = '_annotations_shape';
        // } else {
        //     annotationId = '_annotations_stamp';
        // }
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + annotationId);
        var index = 0;
        if (!storeObject) {
            var pageAnnotation = { pageIndex: pageNumber, annotations: [] };
            pageAnnotation.annotations.push(annotation);
            index = pageAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(pageAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
        }
        else {
            var annotObject = JSON.parse(storeObject);
            window.sessionStorage.removeItem(this.pdfViewerBase.documentId + annotationId);
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
            window.sessionStorage.setItem(this.pdfViewerBase.documentId + annotationId, annotationStringified);
        }
        return index;
    };
    /**
     * @private
     */
    Annotation.prototype.getArrowType = function (type) {
        var decoratorShapes = 'None';
        switch (type) {
            case 'ClosedArrow':
            case 'Closed':
                decoratorShapes = 'Arrow';
                break;
            case 'OpenArrow':
            case 'Open':
                decoratorShapes = 'OpenArrow';
                break;
            case 'Square':
                decoratorShapes = 'Square';
                break;
            case 'Circle':
            case 'Round':
                decoratorShapes = 'Circle';
                break;
            case 'Diamond':
                decoratorShapes = 'Diamond';
                break;
            case 'Butt':
                // decoratorShapes = 'Butt';
                break;
            case 'Slash':
                // decoratorShapes = 'Slash';
                break;
        }
        return decoratorShapes;
    };
    /**
     * @private
     */
    Annotation.prototype.getArrowTypeForCollection = function (arrow) {
        var arrowType;
        switch (arrow) {
            case 'Arrow':
                arrowType = 'ClosedArrow';
                break;
            case 'OpenArrow':
            case 'Square':
            case 'Circle':
            case 'Diamond':
            case 'None':
                arrowType = arrow.toString();
                break;
        }
        return arrowType;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getBounds = function (bound, pageIndex) {
        var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
        if (pageDetails) {
            if (pageDetails.rotation === 1) {
                return { left: bound.top, top: pageDetails.width - (bound.left + bound.width), width: bound.height, height: bound.width };
            }
            else if (pageDetails.rotation === 2) {
                // tslint:disable-next-line:max-line-length
                return { left: pageDetails.width - bound.left - bound.width, top: pageDetails.height - bound.top - bound.height, width: bound.width, height: bound.height };
            }
            else if (pageDetails.rotation === 3) {
                return { left: pageDetails.height - bound.top - bound.height, top: bound.left, width: bound.height, height: bound.width };
            }
            else {
                return bound;
            }
        }
        else {
            return bound;
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getVertexPoints = function (points, pageIndex) {
        if (points) {
            var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
            if (pageDetails.rotation === 1) {
                var points1 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: points[i].y, y: pageDetails.width - points[i].x };
                    points1.push(point);
                }
                return points1;
            }
            else if (pageDetails.rotation === 2) {
                var points2 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.width - points[i].x, y: pageDetails.height - points[i].y };
                    points2.push(point);
                }
                return points2;
            }
            else if (pageDetails.rotation === 3) {
                var points3 = [];
                for (var i = 0; i < points.length; i++) {
                    var point = { x: pageDetails.height - points[i].y, y: points[i].x };
                    points3.push(point);
                }
                return points3;
            }
            else {
                return points;
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.getStoredAnnotations = function (pageIndex, shapeAnnotations, idString) {
        // tslint:disable-next-line
        var annotationCollection;
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + idString);
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
            }
            else {
                annotationCollection = null;
            }
        }
        else {
            annotationCollection = null;
        }
        return annotationCollection;
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    Annotation.prototype.triggerAnnotationPropChange = function (pdfAnnotationBase, isColor, isStroke, isThickness, isOpacity, isLineStart, isLineEnd, isDashArray) {
        var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pdfAnnotationBase.pageIndex, annotationId: pdfAnnotationBase.annotName, annotationType: type, isColorChanged: isColor, isOpacityChanged: isOpacity, isThicknessChanged: isThickness, isStrokeColorChanged: isStroke };
        if (isLineStart) {
            eventArgs.isLineHeadStartStyleChanged = isLineStart;
        }
        if (isLineEnd) {
            eventArgs.isLineHeadEndStyleChanged = isLineEnd;
        }
        if (isDashArray) {
            eventArgs.isBorderDashArrayChanged = isDashArray;
        }
        this.pdfViewer.trigger('annotationPropertiesChange', eventArgs);
    };
    /**
     * @private
     */
    Annotation.prototype.triggerAnnotationResize = function (pdfAnnotationBase) {
        // tslint:disable-next-line
        var setting = {
            opacity: pdfAnnotationBase.opacity, fillColor: pdfAnnotationBase.fillColor, strokeColor: pdfAnnotationBase.strokeColor,
            thickness: pdfAnnotationBase.thickness, author: pdfAnnotationBase.author, subject: pdfAnnotationBase.subject,
            modifiedDate: pdfAnnotationBase.modifiedDate
        };
        var index = this.getAnnotationIndex(pdfAnnotationBase.pageIndex, pdfAnnotationBase.id);
        // tslint:disable-next-line
        var bounds = { left: pdfAnnotationBase.bounds.x, top: pdfAnnotationBase.bounds.y, width: pdfAnnotationBase.bounds.width, height: pdfAnnotationBase.bounds.height };
        var type = this.getAnnotationType(pdfAnnotationBase.shapeAnnotationType, pdfAnnotationBase.measureType);
        if (type === 'Line' || type === 'Arrow' || type === 'Distance' || type === 'Perimeter') {
            setting.lineHeadStartStyle = this.getArrowString(pdfAnnotationBase.sourceDecoraterShapes);
            setting.lineHeadEndStyle = this.getArrowString(pdfAnnotationBase.taregetDecoraterShapes);
            setting.borderDashArray = pdfAnnotationBase.borderDashArray;
        }
        this.pdfViewer.fireAnnotationResize(pdfAnnotationBase.pageIndex, pdfAnnotationBase.annotName, type, bounds, setting);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.selectAnnotation = function (annotationId, pageNumber, annotation) {
        // tslint:disable-next-line
        var annotSettings;
        if (annotation.shapeAnnotationType === 'textMarkup') {
            annotSettings = { type: 'TextMarkup', subType: annotation.subject, opacity: annotation.opacity, color: annotation.color };
        }
        else if (annotation.shapeAnnotationType === 'StickyNotes') {
            annotSettings = { type: 'StickyNotes', opacity: annotation.opacity };
        }
        else if (annotation.shapeAnnotationType === 'Stamp' || annotation.shapeAnnotationType === 'Image') {
            annotSettings = { type: 'Stamp', opacity: annotation.opacity };
        }
        else if (annotation.shapeAnnotationType === 'FreeText') {
            annotSettings = {
                type: 'FreeText', opacity: annotation.opacity, fillColor: annotation.fillColor,
                // tslint:disable-next-line:max-line-length
                strokeColor: annotation.strokeColor, thickness: annotation.thickness, content: annotation.dynamicText,
                // tslint:disable-next-line:max-line-length
                fontFamily: annotation.fontFamily, fontSize: annotation.fontSize, fontColor: annotation.fontColor, textAlign: annotation.textAlign
            };
        }
        else if (annotation.measureType === '') {
            if (annotation.shapeAnnotationType === 'Line') {
                // tslint:disable-next-line:max-line-length
                annotSettings = { type: 'Shape', subType: 'Line', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes };
            }
            else if (annotation.shapeAnnotationType === 'Arrow' || annotation.shapeAnnotationType === 'LineWidthArrowHead') {
                // tslint:disable-next-line:max-line-length
                annotSettings = { type: 'Shape', subType: 'Arrow', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes };
            }
            else if (annotation.shapeAnnotationType === 'Rectangle') {
                annotSettings = {
                    type: 'Shape', subType: 'Rectangle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
            else if (annotation.shapeAnnotationType === 'Circle' || annotation.shapeAnnotationType === 'Ellipse') {
                annotSettings = {
                    type: 'Shape', subType: 'Circle', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
            else if (annotation.shapeAnnotationType === 'Polygon') {
                annotSettings = {
                    type: 'Shape', subType: 'Polygon', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
        }
        else if (annotation.measureType !== '') {
            if (annotation.measureType === 'Distance') {
                // tslint:disable-next-line:max-line-length
                annotSettings = { type: 'Measure', subType: 'Distance', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes };
            }
            else if (annotation.measureType === 'Perimeter') {
                // tslint:disable-next-line:max-line-length
                annotSettings = { type: 'Measure', subType: 'Perimeter', opacity: annotation.opacity, fillColor: annotation.fillColor, strokeColor: annotation.strokeColor, thickness: annotation.thickness, borderDashArray: annotation.borderDashArray, lineHeadStartStyle: annotation.sourceDecoraterShapes, lineHeadEndStyle: annotation.taregetDecoraterShapes };
            }
            else if (annotation.measureType === 'Area') {
                annotSettings = {
                    type: 'Measure', subType: 'Area', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
            else if (annotation.measureType === 'Radius') {
                annotSettings = {
                    type: 'Measure', subType: 'Radius', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
            else if (annotation.measureType === 'Volume') {
                annotSettings = {
                    type: 'Measure', subType: 'Volume', opacity: annotation.opacity, fillColor: annotation.fillColor,
                    strokeColor: annotation.strokeColor, thickness: annotation.thickness
                };
            }
        }
        this.addFreeTextProperties(annotation, annotSettings);
        this.pdfViewer.fireAnnotationSelect(annotationId, pageNumber, annotSettings);
    };
    // tslint:disable-next-line
    Annotation.prototype.editAnnotation = function (annotation) {
        // tslint:disable-next-line
        var currentAnnotation;
        var annotationId;
        var annotationType;
        var pageNumber;
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
            currentAnnotation = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
            annotationId = currentAnnotation.annotName;
            pageNumber = this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
        }
        else {
            if (this.pdfViewer.selectedItems.annotations[0]) {
                currentAnnotation = this.pdfViewer.selectedItems.annotations[0];
                annotationId = currentAnnotation.annotName;
                pageNumber = currentAnnotation.pageIndex;
            }
        }
        if (currentAnnotation) {
            // tslint:disable-next-line
            var clonedObject = cloneObject(currentAnnotation);
            // tslint:disable-next-line
            var redoClonedObject = cloneObject(currentAnnotation);
            if (annotation.type === 'TextMarkup') {
                if (currentAnnotation.opacity !== annotation.opacity) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyOpacityProperty(null, annotation.opacity);
                }
                if (currentAnnotation.color !== annotation.color) {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyColorProperty(annotation.color);
                }
                annotationType = 'textMarkup';
            }
            else if (annotation.type === 'StickyNotes' || annotation.type === 'Stamp') {
                if (currentAnnotation.opacity !== annotation.opacity) {
                    redoClonedObject.opacity = annotation.opacity;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: annotation.opacity });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
                }
                if (annotation.type === 'StickyNotes') {
                    annotationType = 'sticky';
                }
                else {
                    annotationType = 'stamp';
                }
            }
            else if (annotation.type === 'Shape' || annotation.type === 'Measure') {
                if (currentAnnotation.opacity !== annotation.opacity) {
                    redoClonedObject.opacity = annotation.opacity;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { opacity: annotation.opacity });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, true);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Opacity', '', clonedObject, redoClonedObject);
                }
                if (currentAnnotation.fillColor !== annotation.fillColor) {
                    redoClonedObject.fillColor = annotation.fillColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fillColor: annotation.fillColor });
                    this.triggerAnnotationPropChange(currentAnnotation, true, false, false, false);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Fill', '', clonedObject, redoClonedObject);
                }
                if (currentAnnotation.strokeColor !== annotation.strokeColor) {
                    redoClonedObject.strokeColor = annotation.strokeColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { strokeColor: annotation.strokeColor });
                    this.triggerAnnotationPropChange(currentAnnotation, false, true, false, false);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Stroke', '', clonedObject, redoClonedObject);
                }
                if (currentAnnotation.thickness !== annotation.thickness) {
                    redoClonedObject.thickness = annotation.thickness;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { thickness: annotation.thickness });
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, true, false);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Shape Thickness', '', clonedObject, redoClonedObject);
                }
                if (this.pdfViewer.enableShapeLabel && currentAnnotation.fontColor !== annotation.fontColor) {
                    redoClonedObject.fontColor = annotation.fontColor;
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { fontColor: annotation.fontColor });
                }
                // tslint:disable-next-line:max-line-length
                if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' || annotation.subType === 'Perimeter') {
                    var isSourceDecoraterShapesChanged = false;
                    var isTargetDecoraterShapesChanged = false;
                    var isBorderDashArrayChanged = false;
                    clonedObject.lineHeadStart = currentAnnotation.sourceDecoraterShapes;
                    clonedObject.lineHeadEnd = currentAnnotation.taregetDecoraterShapes;
                    redoClonedObject.lineHeadStart = annotation.lineHeadStartStyle;
                    redoClonedObject.lineHeadEnd = annotation.lineHeadEndStyle;
                    redoClonedObject.borderDashArray = annotation.borderDashArray;
                    if (currentAnnotation.taregetDecoraterShapes !== annotation.lineHeadEndStyle) {
                        isTargetDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.sourceDecoraterShapes !== annotation.lineHeadStartStyle) {
                        isSourceDecoraterShapesChanged = true;
                    }
                    if (currentAnnotation.borderDashArray !== annotation.borderDashArray) {
                        isBorderDashArrayChanged = true;
                    }
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.nodePropertyChange(currentAnnotation, { sourceDecoraterShapes: annotation.lineHeadStartStyle, taregetDecoraterShapes: annotation.lineHeadEndStyle, borderDashArray: annotation.borderDashArray });
                    // tslint:disable-next-line:max-line-length
                    this.triggerAnnotationPropChange(currentAnnotation, false, false, false, false, isSourceDecoraterShapesChanged, isTargetDecoraterShapesChanged, isBorderDashArrayChanged);
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.addAction(currentAnnotation.pageIndex, null, currentAnnotation, 'Line properties change', '', clonedObject, redoClonedObject);
                }
                if (annotation.type === 'Shape') {
                    annotationType = 'shape';
                }
                else {
                    annotationType = 'shape_measure';
                }
                if (annotation.labelSettings && this.pdfViewer.enableShapeLabel) {
                    this.updateFreeTextProperties(currentAnnotation);
                    this.pdfViewer.nodePropertyChange(currentAnnotation, {
                        // tslint:disable-next-line:max-line-length
                        labelOpacity: annotation.labelSettings.opacity, fontColor: annotation.labelSettings.fontColor, fontSize: annotation.labelSettings.fontSize, fontFamily: annotation.labelSettings.fontFamily,
                        labelContent: annotation.labelSettings.labelContent, labelFillColor: annotation.labelSettings.fillColor
                    });
                }
            }
            else if (annotation.type === 'FreeText') {
                this.pdfViewer.nodePropertyChange(currentAnnotation, {
                    // tslint:disable-next-line:max-line-length
                    opacity: annotation.opacity, fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                    // tslint:disable-next-line:max-line-length
                    dynamicText: annotation.content, fillColor: annotation.fillColor, textAlign: annotation.textAlign, strokeColor: annotation.strokeColor, thickness: annotation.thickness
                });
            }
            var date = new Date();
            currentAnnotation.modifiedDate = date.toLocaleString();
            if (annotation.type !== 'TextMarkup') {
                this.pdfViewer.renderDrawing();
                this.updateCollection(annotationId, pageNumber, annotation, annotationType);
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.updateFreeTextProperties = function (annotation) {
        if (annotation.labelSettings) {
            if (annotation.labelSettings.fillColor) {
                annotation.labelFillColor = annotation.labelSettings.fillColor;
            }
            if (annotation.labelSettings.fontColor) {
                annotation.fontColor = annotation.labelSettings.fontColor;
            }
            if (annotation.labelSettings.fontSize) {
                annotation.fontSize = annotation.labelSettings.fontSize;
            }
            if (annotation.labelSettings.fontFamily) {
                annotation.fontFamily = annotation.labelSettings.fontFamily;
            }
            if (annotation.labelSettings.opacity) {
                annotation.labelOpacity = annotation.labelSettings.opacity;
            }
            if (annotation.labelSettings.labelContent) {
                annotation.labelContent = annotation.labelSettings.labelContent;
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.addFreeTextProperties = function (annotation, currentAnnotation) {
        if (this.pdfViewer.enableShapeLabel && annotation && currentAnnotation) {
            currentAnnotation.labelSettings = {
                fontColor: annotation.fontColor, fontSize: annotation.fontSize, fontFamily: annotation.fontFamily,
                opacity: annotation.labelOpacity, labelContent: annotation.labelContent, fillColor: annotation.labelFillColor
            };
        }
    };
    Annotation.prototype.updateMeasurementSettings = function () {
        if (this.pdfViewer.enableAnnotation && this.pdfViewer.enableMeasureAnnotation) {
            // tslint:disable-next-line:max-line-length
            var ratioString = '1 ' + this.pdfViewer.measurementSettings.conversionUnit + ' = ' + this.pdfViewer.measurementSettings.scaleRatio + ' ' + this.pdfViewer.measurementSettings.displayUnit;
            this.measureAnnotationModule.updateMeasureValues(ratioString, this.pdfViewer.measurementSettings.displayUnit, this.pdfViewer.measurementSettings.conversionUnit, this.pdfViewer.measurementSettings.depth);
        }
    };
    // tslint:disable-next-line
    Annotation.prototype.updateCollection = function (annotationId, pageNumber, annotation, annotationType) {
        // tslint:disable-next-line
        var annotationCollection;
        // tslint:disable-next-line
        var storeObject = window.sessionStorage.getItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.getPageCollection(annotObject, pageNumber);
            if (annotObject[index]) {
                annotationCollection = annotObject[index].annotations;
                if (annotationCollection !== null) {
                    for (var i = 0; i < annotationCollection.length; i++) {
                        if (annotationCollection[i].annotName === annotationId) {
                            // tslint:disable-next-line
                            var newAnnot = this.modifyAnnotationProperties(annotationCollection[i], annotation, annotationType);
                            annotationCollection[i] = newAnnot;
                        }
                    }
                    window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType);
                    if (annotObject[index]) {
                        annotObject[index].annotations = annotationCollection;
                    }
                    var annotationStringified = JSON.stringify(annotObject);
                    window.sessionStorage.setItem(this.pdfViewerBase.documentId + '_annotations_' + annotationType, annotationStringified);
                }
            }
        }
    };
    // tslint:disable-next-line
    Annotation.prototype.modifyAnnotationProperties = function (newAnnotation, annotation, annotationType) {
        if (annotationType === 'textMarkup') {
            newAnnotation.opacity = annotation.opacity;
            newAnnotation.color = annotation.color;
        }
        else if (annotationType === 'sticky' || annotationType === 'stamp') {
            newAnnotation.opacity = annotation.opacity;
        }
        else if (annotationType === 'shape' || annotationType === 'shape_measure') {
            if (annotation.subType === 'Line' || annotation.subType === 'Arrow' || annotation.subType === 'Distance' ||
                annotation.subType === 'Perimeter') {
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
                newAnnotation.borderDashArray = annotation.borderDashArray;
                newAnnotation.lineHeadStart = annotation.lineHeadStartStyle;
                newAnnotation.lineHeadEnd = annotation.lineHeadEndStyle;
            }
            else {
                newAnnotation.opacity = annotation.opacity;
                newAnnotation.fillColor = annotation.fillColor;
                newAnnotation.strokeColor = annotation.strokeColor;
                newAnnotation.thickness = annotation.thickness;
            }
        }
        var date = new Date();
        newAnnotation.modifiedDate = date.toLocaleString();
        return newAnnotation;
    };
    /**
     * @private
     */
    Annotation.prototype.updateAnnotationAuthor = function (annotationType, annotationSubType) {
        var annotationAuthor;
        if (annotationType === 'sticky') {
            annotationAuthor = this.pdfViewer.stickyNotesSettings.author ? this.pdfViewer.stickyNotesSettings.author : 'Guest';
        }
        else if (annotationType === 'stamp') {
            annotationAuthor = this.pdfViewer.stampSettings.author ? this.pdfViewer.stampSettings.author : 'Guest';
        }
        else if (annotationType === 'shape') {
            if (annotationSubType === 'Line') {
                annotationAuthor = this.pdfViewer.lineSettings.author ? this.pdfViewer.lineSettings.author : 'Guest';
            }
            else if (annotationSubType === 'LineWidthArrowHead' || annotationSubType === 'Arrow') {
                annotationAuthor = this.pdfViewer.arrowSettings.author ? this.pdfViewer.arrowSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Circle' || annotationSubType === 'Ellipse' || annotationSubType === 'Oval') {
                annotationAuthor = this.pdfViewer.circleSettings.author ? this.pdfViewer.circleSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Rectangle' || annotationSubType === 'Square') {
                annotationAuthor = this.pdfViewer.rectangleSettings.author ? this.pdfViewer.rectangleSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Polygon') {
                annotationAuthor = this.pdfViewer.polygonSettings.author ? this.pdfViewer.polygonSettings.author : 'Guest';
            }
            else {
                annotationAuthor = this.pdfViewer.rectangleSettings.author ? this.pdfViewer.rectangleSettings.author : 'Guest';
            }
        }
        else if (annotationType === 'measure') {
            if (annotationSubType === 'Distance' || annotationSubType === 'Distance calculation') {
                annotationAuthor = this.pdfViewer.distanceSettings.author ? this.pdfViewer.distanceSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Perimeter' || annotationSubType === 'Perimeter calculation') {
                annotationAuthor = this.pdfViewer.perimeterSettings.author ? this.pdfViewer.perimeterSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Radius' || annotationSubType === 'Radius calculation') {
                annotationAuthor = this.pdfViewer.radiusSettings.author ? this.pdfViewer.radiusSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Area' || annotationSubType === 'Area calculation') {
                annotationAuthor = this.pdfViewer.areaSettings.author ? this.pdfViewer.areaSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Volume' || annotationSubType === 'Volume calculation') {
                annotationAuthor = this.pdfViewer.volumeSettings.author ? this.pdfViewer.volumeSettings.author : 'Guest';
            }
            else {
                annotationAuthor = this.pdfViewer.distanceSettings.author ? this.pdfViewer.distanceSettings.author : 'Guest';
            }
        }
        else if (annotationType === 'textMarkup') {
            if (annotationSubType === 'Highlight') {
                annotationAuthor = this.pdfViewer.highlightSettings.author ? this.pdfViewer.highlightSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Underline') {
                annotationAuthor = this.pdfViewer.underlineSettings.author ? this.pdfViewer.underlineSettings.author : 'Guest';
            }
            else if (annotationSubType === 'Strikethrough') {
                annotationAuthor = this.pdfViewer.strikethroughSettings.author ? this.pdfViewer.strikethroughSettings.author : 'Guest';
            }
            else {
                annotationAuthor = this.pdfViewer.highlightSettings.author ? this.pdfViewer.highlightSettings.author : 'Guest';
            }
        }
        else if (annotationType === 'freeText') {
            annotationAuthor = this.pdfViewer.freeTextSettings.author ? this.pdfViewer.freeTextSettings.author : 'Guest';
        }
        else {
            annotationAuthor = this.pdfViewer.stickyNotesSettings.author ? this.pdfViewer.stickyNotesSettings.author : 'Guest';
        }
        return annotationAuthor;
    };
    /**
     * @private
     */
    Annotation.prototype.clear = function () {
        if (this.shapeAnnotationModule) {
            this.shapeAnnotationModule.shapeCount = 0;
        }
        if (this.measureAnnotationModule) {
            this.measureAnnotationModule.measureShapeCount = 0;
        }
        if (this.textMarkupAnnotationModule) {
            this.textMarkupAnnotationModule.clear();
        }
        if (this.stickyNotesAnnotationModule) {
            this.stickyNotesAnnotationModule.clear();
        }
        this.pdfViewer.refresh();
        this.undoCommentsElement = [];
        this.redoCommentsElement = [];
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.stampAnnotationModule) {
            this.pdfViewer.annotation.stampAnnotationModule.stampPageNumber = [];
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.freeTextAnnotationModule) {
            this.pdfViewer.annotation.freeTextAnnotationModule.freeTextPageNumbers = [];
        }
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_shape_measure');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_stamp');
        window.sessionStorage.removeItem(this.pdfViewerBase.documentId + '_annotations_sticky');
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    Annotation.prototype.cloneObject = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    /**
     * @private
     */
    Annotation.prototype.destroy = function () {
        this.destroyPropertiesWindow();
        this.textMarkupAnnotationModule.clear();
    };
    /**
     * @private
     */
    Annotation.prototype.getModuleName = function () {
        return 'Annotation';
    };
    return Annotation;
}());
export { Annotation };
