var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dialog, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { TextLayer, ContextMenu, Signature } from '../index';
import { NavigationPane } from './navigation-pane';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { AjaxHandler } from '../index';
// tslint:disable-next-line:max-line-length
import { Point, Rect, identityMatrix, transformPointByMatrix, contains, rotateMatrix } from '@syncfusion/ej2-drawings';
import { SelectTool, MoveTool, ResizeTool, ConnectTool, NodeDrawingTool, PolygonDrawingTool, LineTool, RotateTool, StampTool } from '../../diagram/tools';
import { Selector } from '../../diagram/selector';
import { ActiveElements, findActiveElement } from '../../diagram/action';
import { renderAdornerLayer } from '../../diagram/dom-util';
/**
 * The `PdfViewerBase` module is used to handle base methods of PDF viewer.

 */
var PdfViewerBase = /** @class */ (function () {
    function PdfViewerBase(viewer) {
        var _this = this;
        /**
         * @private
         */
        this.pageSize = [];
        /**
         * @private
         */
        this.pageCount = 0;
        /**
         * @private
         */
        this.currentPageNumber = 0;
        /**
         * @private
         */
        this.activeElements = new ActiveElements();
        /**
         * @private
         */
        this.isDocumentLoaded = false;
        /**
         * @private
         */
        this.isDocumentEdited = false;
        /**
         * @private
         */
        this.renderedPagesList = [];
        /**
         * @private
         */
        this.pageGap = 8;
        this.pageLeft = 5;
        this.sessionLimit = 1000;
        this.pageStopValue = 300;
        /**
         * @private
         */
        this.toolbarHeight = 56;
        this.pageLimit = 0;
        this.previousPage = 0;
        this.isViewerMouseDown = false;
        this.isViewerMouseWheel = false;
        this.scrollPosition = 0;
        this.sessionStorage = [];
        this.pointerCount = 0;
        this.pointersForTouch = [];
        this.isPasswordAvailable = false;
        /**
         * @private
         */
        this.reRenderedCount = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.touchClientX = 0;
        this.touchClientY = 0;
        this.previousTime = 0;
        this.currentTime = 0;
        this.isTouchScrolled = false;
        this.isLongTouchPropagated = false;
        // tslint:disable-next-line
        this.longTouchTimer = null;
        this.isViewerContainerDoubleClick = false;
        // tslint:disable-next-line
        this.dblClickTimer = null;
        /**
         * @private
         */
        this.pinchZoomStorage = [];
        /**
         * @private
         */
        this.isTextSelectionDisabled = false;
        /**
         * @private
         */
        this.isPanMode = false;
        this.dragX = 0;
        this.dragY = 0;
        this.isScrollbarMouseDown = false;
        this.scrollX = 0;
        this.scrollY = 0;
        this.ispageMoved = false;
        this.isThumb = false;
        this.isTapHidden = false;
        // tslint:disable-next-line
        this.singleTapTimer = null;
        this.tapCount = 0;
        this.inputTapCount = 0;
        /**
         * @private
         */
        this.isInitialLoaded = false;
        this.annotationPageList = [];
        this.importPageList = [];
        /**
         * @private
         */
        this.isImportAction = false;
        this.isImportedAnnotation = false;
        this.isAnnotationCollectionRemoved = false;
        /**
         * @private
         */
        this.tool = null;
        this.action = 'Select';
        /**
         * @private
         */
        this.eventArgs = null;
        /**
         * @private
         */
        this.inAction = false;
        /**
         * @private
         */
        this.isMouseDown = false;
        /**
         * @private
         */
        this.isStampMouseDown = false;
        /**
         * @private
         */
        this.stampAdded = false;
        /**
         * @private
         */
        this.customStampCount = 0;
        /**
         * @private
         */
        this.isDynamicStamp = false;
        this.isMixedSizeDocument = false;
        /**
         * @private
         */
        this.customStampCollection = [];
        /**
         * @private
         */
        this.isAlreadyAdded = false;
        /**
         * @private
         */
        this.isWebkitMobile = false;
        /**
         * @private
         */
        this.isFreeTextContextMenu = false;
        /**
         * @private
         */
        this.isSelection = false;
        /**
         * @private
         */
        // tslint:disable-next-line
        this.annotationComments = null;
        /**
         * @private
         */
        this.isToolbarSignClicked = false;
        /**
         * @private
         */
        this.signatureCount = 0;
        /**
         * @private
         */
        this.isSignatureAdded = false;
        /**
         * @private
         */
        this.isNewSignatureAdded = false;
        /**
         * @private
         */
        this.onWindowResize = function () {
            var proxy = _this;
            if (_this.pdfViewer.enableRtl) {
                // tslint:disable-next-line:max-line-length
                proxy.viewerContainer.style.right = (proxy.navigationPane.sideBarToolbar ? proxy.navigationPane.getViewerContainerLeft() : 0) + 'px';
                // tslint:disable-next-line:max-line-length
                proxy.viewerContainer.style.left = (proxy.navigationPane.commentPanelContainer ? proxy.navigationPane.commentPanelContainer.offsetWidth : 0) + 'px';
            }
            else {
                // tslint:disable-next-line:max-line-length
                proxy.viewerContainer.style.left = (proxy.navigationPane.sideBarToolbar ? proxy.navigationPane.getViewerContainerLeft() : 0) + 'px';
                // tslint:disable-next-line:max-line-length
                proxy.viewerContainer.style.right = (proxy.navigationPane.commentPanelContainer ? proxy.navigationPane.commentPanelContainer.offsetWidth : 0) + 'px';
            }
            // tslint:disable-next-line
            var viewerElementWidth = (proxy.pdfViewer.element.clientWidth > 0 ? proxy.pdfViewer.element.clientWidth : proxy.pdfViewer.element.style.width);
            // tslint:disable-next-line
            var viewerWidth = (viewerElementWidth - (proxy.navigationPane.sideBarToolbar ? proxy.navigationPane.getViewerContainerLeft() : 0) - (proxy.navigationPane.commentPanelContainer ? proxy.navigationPane.getViewerContainerRight() : 0));
            proxy.viewerContainer.style.width = viewerWidth + 'px';
            if (proxy.pdfViewer.toolbarModule) {
                // tslint:disable-next-line
                var toolbarContainer = proxy.getElement('_toolbarContainer');
                var toolbarHeight = 0;
                if (toolbarContainer) {
                    toolbarHeight = toolbarContainer.getBoundingClientRect().height;
                }
                if (proxy.isAnnotationToolbarHidden() || Browser.isDevice) {
                    // tslint:disable-next-line:max-line-length
                    proxy.viewerContainer.style.height = proxy.updatePageHeight(proxy.pdfViewer.element.getBoundingClientRect().height, toolbarHeight);
                }
                else {
                    // tslint:disable-next-line
                    var annotationToolbarContainer = proxy.getElement('_annotation_toolbar');
                    var annotationToolbarHeight = 0;
                    if (annotationToolbarContainer) {
                        annotationToolbarHeight = annotationToolbarContainer.getBoundingClientRect().height;
                    }
                    // tslint:disable-next-line:max-line-length
                    proxy.viewerContainer.style.height = proxy.updatePageHeight(proxy.pdfViewer.element.getBoundingClientRect().height, toolbarHeight + annotationToolbarHeight);
                }
            }
            else {
                proxy.viewerContainer.style.height = proxy.updatePageHeight(proxy.pdfViewer.element.getBoundingClientRect().height, 0);
            }
            if (proxy.pdfViewer.bookmarkViewModule && Browser.isDevice) {
                var bookmarkContainer = proxy.getElement('_bookmarks_container');
                if (bookmarkContainer) {
                    bookmarkContainer.style.height = proxy.updatePageHeight(proxy.pdfViewer.element.getBoundingClientRect().height, 0);
                }
            }
            if (proxy.viewerContainer.style.height === '0px') {
                if (proxy.pdfViewer.height.toString() === 'auto') {
                    proxy.pdfViewer.height = 500;
                    proxy.viewerContainer.style.height = proxy.pdfViewer.height + 'px';
                }
                else {
                    proxy.viewerContainer.style.height = proxy.pdfViewer.element.style.height;
                }
            }
            if (proxy.viewerContainer.style.width === '0px') {
                if (proxy.pdfViewer.width.toString() === 'auto') {
                    proxy.pdfViewer.width = 500;
                    proxy.viewerContainer.style.width = proxy.pdfViewer.width + 'px';
                }
                else {
                    proxy.viewerContainer.style.width = proxy.pdfViewer.element.style.width;
                }
            }
            proxy.pageContainer.style.width = proxy.viewerContainer.clientWidth + 'px';
            if (proxy.viewerContainer.clientWidth === 0) {
                proxy.pageContainer.style.width = proxy.pdfViewer.element.style.width;
            }
            if (proxy.pdfViewer.toolbarModule) {
                // tslint:disable-next-line:max-line-length
                proxy.pdfViewer.toolbarModule.onToolbarResize((proxy.navigationPane.sideBarToolbar ? proxy.navigationPane.getViewerMainContainerWidth() : proxy.pdfViewer.element.clientWidth));
            }
            if (_this.pdfViewer.enableToolbar && _this.pdfViewer.thumbnailViewModule) {
                proxy.pdfViewer.thumbnailViewModule.gotoThumbnailImage(proxy.currentPageNumber - 1);
            }
            if (proxy.pdfViewer.textSearchModule && !Browser.isDevice) {
                proxy.pdfViewer.textSearchModule.textSearchBoxOnResize();
            }
            if (viewerWidth !== 0) {
                if (!proxy.navigationPane.isBookmarkListOpen) {
                    proxy.updateZoomValue();
                }
            }
            if (Browser.isDevice) {
                proxy.mobileScrollerContainer.style.left = (viewerWidth - parseFloat(proxy.mobileScrollerContainer.style.width)) + 'px';
                proxy.mobilePageNoContainer.style.left = (viewerWidth / 2) - (parseFloat(proxy.mobilePageNoContainer.style.width) / 2) + 'px';
                proxy.mobilePageNoContainer.style.top = (proxy.pdfViewer.element.clientHeight / 2) + 'px';
                proxy.updateMobileScrollerPosition();
            }
            else {
                proxy.navigationPane.setResizeIconTop();
                proxy.navigationPane.setCommentPanelResizeIconTop();
                if (event && event.type === 'resize') {
                    proxy.signatureModule.updateCanvasSize();
                }
            }
        };
        this.viewerContainerOnMousedown = function (event) {
            _this.isFreeTextContextMenu = false;
            var isUpdate = false;
            _this.isSelection = true;
            if (event.button === 0 && !_this.getPopupNoteVisibleStatus() && !_this.isClickedOnScrollBar(event, false)) {
                _this.isViewerMouseDown = true;
                // tslint:disable-next-line
                var target = event.target;
                if (event.detail === 1 && target.className !== 'e-pdfviewer-formFields' && target.className !== 'free-text-input') {
                    isUpdate = true;
                    _this.focusViewerContainer();
                }
                _this.scrollPosition = _this.viewerContainer.scrollTop / _this.getZoomFactor();
                _this.mouseX = event.clientX;
                _this.mouseY = event.clientY;
                // tslint:disable-next-line
                var isIE = !!document.documentMode;
                if (_this.pdfViewer.textSelectionModule && !_this.isClickedOnScrollBar(event, true) && !_this.isTextSelectionDisabled) {
                    if (!isIE && target.className !== 'e-pdfviewer-formFields' && target.className !== 'e-pdfviewer-ListBox') {
                        event.preventDefault();
                    }
                    if (target.className !== 'e-pv-droplet') {
                        _this.pdfViewer.textSelectionModule.clearTextSelection();
                    }
                }
            }
            if (_this.isPanMode) {
                _this.dragX = event.pageX;
                _this.dragY = event.pageY;
                // tslint:disable-next-line:max-line-length
                if (_this.viewerContainer.contains(event.target) && (event.target !== _this.viewerContainer) && (event.target !== _this.pageContainer) && _this.isPanMode) {
                    _this.viewerContainer.style.cursor = 'grabbing';
                }
            }
            if (_this.isShapeBasedAnnotationsEnabled()) {
                _this.diagramMouseDown(event);
            }
            if (_this.pdfViewer.annotation && _this.pdfViewer.annotation.stickyNotesAnnotationModule.accordionContainer) {
                if (!isUpdate) {
                    _this.pdfViewer.annotationModule.stickyNotesAnnotationModule.isEditableElement = false;
                    _this.updateCommentPanel();
                    isUpdate = true;
                }
            }
        };
        this.viewerContainerOnMouseup = function (event) {
            if (!_this.getPopupNoteVisibleStatus()) {
                if (_this.isViewerMouseDown) {
                    if (_this.scrollHoldTimer) {
                        clearTimeout(_this.scrollHoldTimer);
                        _this.scrollHoldTimer = null;
                    }
                    if ((_this.scrollPosition * _this.getZoomFactor()) !== _this.viewerContainer.scrollTop) {
                        _this.pageViewScrollChanged(_this.currentPageNumber);
                    }
                }
                if (_this.isShapeBasedAnnotationsEnabled()) {
                    _this.diagramMouseUp(event);
                    _this.pdfViewer.annotation.onAnnotationMouseUp();
                }
                _this.isSelection = false;
                // tslint:disable-next-line:max-line-length
                var commentElement = document.getElementById(_this.pdfViewer.element.id + '_commantPanel');
                if (commentElement && commentElement.style.display === 'block') {
                    if (_this.pdfViewer.selectedItems) {
                        if (_this.pdfViewer.selectedItems.annotations.length !== 0) {
                            // tslint:disable-next-line
                            var accordionExpand = document.getElementById(_this.pdfViewer.element.id + '_accordionContainer' + _this.pdfViewer.currentPageNumber);
                            if (accordionExpand) {
                                accordionExpand.ej2_instances[0].expandItem(true);
                            }
                            // tslint:disable-next-line
                            var commentsDiv = document.getElementById(_this.pdfViewer.selectedItems.annotations[0].annotName);
                            if (commentsDiv) {
                                if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                                    commentsDiv.firstChild.click();
                                }
                            }
                        }
                    }
                }
                if (event.button === 0 && !_this.isClickedOnScrollBar(event, false)) {
                    // 0 is for left button.
                    var eventTarget = event.target;
                    if (eventTarget.classList.contains('e-pv-page-canvas')) {
                        var idStringArray = eventTarget.id.split('_');
                        // tslint:disable-next-line
                        _this.pdfViewer.firePageClick(event.offsetX, event.offsetY, parseInt(idStringArray[idStringArray.length - 1]) + 1);
                    }
                    if (_this.isTextMarkupAnnotationModule()) {
                        _this.pdfViewer.annotationModule.textMarkupAnnotationModule.onTextMarkupAnnotationMouseUp(event);
                    }
                    // tslint:disable-next-line:max-line-length
                    if (_this.viewerContainer.contains(event.target) && (event.target !== _this.viewerContainer) && (event.target !== _this.pageContainer) && _this.isPanMode) {
                        _this.viewerContainer.style.cursor = 'move';
                        _this.viewerContainer.style.cursor = '-webkit-grab';
                        _this.viewerContainer.style.cursor = '-moz-grab';
                        _this.viewerContainer.style.cursor = 'grab';
                    }
                }
                _this.isViewerMouseDown = false;
            }
        };
        this.viewerContainerOnMouseWheel = function (event) {
            _this.isViewerMouseWheel = true;
            if (_this.getRerenderCanvasCreated()) {
                event.preventDefault();
            }
            if (_this.pdfViewer.magnificationModule) {
                _this.pdfViewer.magnificationModule.pageRerenderOnMouseWheel();
                if (event.ctrlKey) {
                    event.preventDefault();
                }
                _this.pdfViewer.magnificationModule.fitPageScrollMouseWheel(event);
            }
            if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled) {
                if (_this.isViewerMouseDown) {
                    if (!event.target.classList.contains('e-pv-text')) {
                        _this.pdfViewer.textSelectionModule.textSelectionOnMouseWheel(_this.currentPageNumber - 1);
                    }
                }
            }
        };
        this.viewerContainerOnKeyDown = function (event) {
            var isMac = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ? true : false;
            var isCommandKey = isMac ? event.metaKey : false;
            if ((_this.isFreeTextAnnotationModule() && _this.pdfViewer.annotationModule
                && (_this.pdfViewer.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus === true
                    || _this.pdfViewer.annotationModule.inputElementModule.isInFocus === true))) {
                return;
            }
            if (event.ctrlKey || isCommandKey) {
                // add keycodes if shift key is used.
                if ((event.shiftKey && !isMac) || (isMac && !event.shiftKey)) {
                    switch (event.keyCode) {
                        case 38: // up arrow
                        case 33: // page up
                            event.preventDefault();
                            if (_this.currentPageNumber !== 1) {
                                _this.updateScrollTop(0);
                            }
                            break;
                        case 40: // down arrow
                        case 34: // page down
                            event.preventDefault();
                            if (_this.currentPageNumber !== _this.pageCount) {
                                _this.updateScrollTop(_this.pageCount - 1);
                            }
                            break;
                        default:
                            break;
                    }
                }
                switch (event.keyCode) {
                    case 79: // o key
                        if (_this.pdfViewer.toolbarModule && _this.pdfViewer.enableToolbar) {
                            _this.pdfViewer.toolbarModule.openFileDialogBox(event);
                        }
                        break;
                    case 67: // c key
                        if (_this.pdfViewer.textSelectionModule && _this.pdfViewer.enableTextSelection && !_this.isTextSelectionDisabled) {
                            event.preventDefault();
                            _this.pdfViewer.textSelectionModule.copyText();
                        }
                        if (_this.pdfViewer.selectedItems.annotations.length) {
                            _this.pdfViewer.copy();
                        }
                        break;
                    case 70: // f key
                        if (_this.pdfViewer.textSearchModule && _this.pdfViewer.enableTextSearch) {
                            event.preventDefault();
                            _this.pdfViewer.toolbarModule.textSearchButtonHandler();
                        }
                        break;
                    case 90: //z key
                        if (_this.pdfViewer.annotationModule) {
                            _this.pdfViewer.annotationModule.undo();
                        }
                        break;
                    case 88: //x key
                        if (_this.pdfViewer.selectedItems.annotations.length) {
                            _this.pdfViewer.cut();
                            _this.pdfViewer.clearSelection(_this.pdfViewer.selectedItems.annotations[0].pageIndex);
                        }
                        break;
                    case 89: //y key
                        if (_this.pdfViewer.annotationModule) {
                            _this.pdfViewer.annotationModule.redo();
                        }
                        break;
                    case 86: //v key
                        if (_this.pdfViewer.annotation && _this.pdfViewer.annotation.isShapeCopied) {
                            _this.pdfViewer.paste();
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case 46:
                        if (_this.pdfViewer.annotation) {
                            if (_this.isTextMarkupAnnotationModule() && !_this.getPopupNoteVisibleStatus()) {
                                _this.pdfViewer.annotationModule.deleteAnnotation();
                            }
                            if (_this.pdfViewer.selectedItems.annotations.length) {
                                _this.pdfViewer.remove(_this.pdfViewer.selectedItems.annotations[0]);
                                _this.pdfViewer.renderSelector(_this.pdfViewer.annotation.getEventPageNumber(event));
                            }
                        }
                }
            }
            if (_this.pdfViewer.magnificationModule) {
                _this.pdfViewer.magnificationModule.magnifyBehaviorKeyDown(event);
            }
        };
        this.viewerContainerOnMousemove = function (event) {
            _this.mouseX = event.clientX;
            _this.mouseY = event.clientY;
            // tslint:disable-next-line
            var isIE = !!document.documentMode;
            var target = event.target;
            if (_this.action === 'Drag') {
                event.preventDefault();
            }
            // tslint:disable-next-line:max-line-length
            if (_this.isViewerMouseDown && !(_this.action === 'Perimeter' || _this.action === 'Polygon' || _this.action === 'Line' || _this.action === 'DrawTool' || _this.action === 'Distance')) {
                // tslint:disable-next-line:max-line-length
                if (_this.pdfViewer.textSelectionModule && _this.pdfViewer.enableTextSelection && !_this.isTextSelectionDisabled && !_this.getPopupNoteVisibleStatus()) {
                    // text selection won't perform if we start the selection from hyperlink content by commenting this line.
                    // this region block the toc/hyperlink navigation on sometimes.
                    // if ((event.target as HTMLElement).classList.contains('e-pv-hyperlink') && this.pdfViewer.linkAnnotationModule) {
                    // this.pdfViewer.linkAnnotationModule.modifyZindexForHyperlink((event.target as HTMLElement), true);
                    // }
                    if (!isIE) {
                        event.preventDefault();
                        _this.mouseX = event.clientX;
                        _this.mouseY = event.clientY;
                        // tslint:disable-next-line:max-line-length
                        if (_this.pdfViewer.enableTextMarkupResizer && _this.pdfViewer.annotation && _this.pdfViewer.annotation.textMarkupAnnotationModule.isDropletClicked) {
                            _this.pdfViewer.annotation.textMarkupAnnotationModule.textSelect(event.target, _this.mouseX, _this.mouseY);
                        }
                        else {
                            _this.pdfViewer.textSelectionModule.textSelectionOnMouseMove(event.target, _this.mouseX, _this.mouseY);
                        }
                    }
                    else {
                        var selection = window.getSelection();
                        if (!selection.type && !selection.isCollapsed && selection.anchorNode !== null) {
                            _this.pdfViewer.textSelectionModule.isTextSelection = true;
                        }
                    }
                }
                else if (_this.skipPreventDefault(target)) {
                    event.preventDefault();
                }
            }
            if (_this.isTextMarkupAnnotationModule() && !_this.getPopupNoteVisibleStatus()) {
                _this.pdfViewer.annotationModule.textMarkupAnnotationModule.onTextMarkupAnnotationMouseMove(event);
            }
            if (_this.isPanMode) {
                _this.panOnMouseMove(event);
            }
            if (_this.isShapeBasedAnnotationsEnabled()) {
                var canvas = void 0;
                // tslint:disable-next-line:max-line-length
                if (event.target && (event.target.id.indexOf('_text') > -1 || event.target.classList.contains('e-pv-hyperlink')) && _this.pdfViewer.annotation) {
                    var pageIndex = _this.pdfViewer.annotation.getEventPageNumber(event);
                    var diagram = document.getElementById(_this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
                    var canvas1 = diagram.getBoundingClientRect();
                    var left = canvas1.x ? canvas1.x : canvas1.left;
                    var top_1 = canvas1.y ? canvas1.y : canvas1.top;
                    canvas = new Rect(left + 10, top_1 + 10, canvas1.width - 10, canvas1.height - 10);
                }
                var stampModule = _this.pdfViewer.annotationModule.stampAnnotationModule;
                if (canvas && canvas.containsPoint({ x: _this.mouseX, y: _this.mouseY }) && !stampModule.isStampAnnotSelected) {
                    _this.diagramMouseMove(event);
                }
                else {
                    _this.diagramMouseLeave(event);
                }
                if (_this.pdfViewer.enableStampAnnotations) {
                    if (stampModule && stampModule.isStampAnnotSelected) {
                        _this.pdfViewer.tool = 'Stamp';
                        _this.tool = new StampTool(_this.pdfViewer, _this);
                        _this.isMouseDown = true;
                        stampModule.isStampAnnotSelected = false;
                        stampModule.isNewStampAnnot = true;
                    }
                }
                if (_this.isSignatureAdded && _this.pdfViewer.enableHandwrittenSignature) {
                    _this.pdfViewer.tool = 'Stamp';
                    _this.tool = new StampTool(_this.pdfViewer, _this);
                    _this.isMouseDown = true;
                    _this.isSignatureAdded = false;
                    _this.isNewSignatureAdded = true;
                }
            }
        };
        this.panOnMouseMove = function (event) {
            var isStampMode = false;
            // tslint:disable-next-line:max-line-length
            if (_this.action === 'Drag' || _this.action.indexOf('Rotate') !== -1 || _this.action.indexOf('Resize') !== -1) {
                isStampMode = true;
            }
            // tslint:disable-next-line:max-line-length
            if (_this.viewerContainer.contains(event.target) && (event.target !== _this.viewerContainer) && (event.target !== _this.pageContainer) && !isStampMode) {
                if (_this.isViewerMouseDown) {
                    var deltaX = _this.dragX - event.pageX;
                    var deltaY = _this.dragY - event.pageY;
                    _this.viewerContainer.scrollTop = _this.viewerContainer.scrollTop + deltaY;
                    _this.viewerContainer.scrollLeft = _this.viewerContainer.scrollLeft + deltaX;
                    _this.viewerContainer.style.cursor = 'move';
                    _this.viewerContainer.style.cursor = '-webkit-grabbing';
                    _this.viewerContainer.style.cursor = '-moz-grabbing';
                    _this.viewerContainer.style.cursor = 'grabbing';
                    _this.dragX = event.pageX;
                    _this.dragY = event.pageY;
                }
                else {
                    if (!_this.navigationPane.isNavigationPaneResized) {
                        _this.viewerContainer.style.cursor = 'move';
                        _this.viewerContainer.style.cursor = '-webkit-grab';
                        _this.viewerContainer.style.cursor = '-moz-grab';
                        _this.viewerContainer.style.cursor = 'grab';
                    }
                }
            }
            else {
                if (!_this.navigationPane.isNavigationPaneResized) {
                    _this.viewerContainer.style.cursor = 'auto';
                }
            }
        };
        this.viewerContainerOnMouseLeave = function (event) {
            if (_this.isViewerMouseDown) {
                if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled && !_this.getTextMarkupAnnotationMode()) {
                    _this.pdfViewer.textSelectionModule.textSelectionOnMouseLeave(event);
                }
            }
        };
        this.viewerContainerOnMouseEnter = function (event) {
            if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled) {
                _this.pdfViewer.textSelectionModule.clear();
            }
        };
        this.viewerContainerOnMouseOver = function (event) {
            // tslint:disable-next-line
            var isIE = !!document.documentMode;
            if (_this.isViewerMouseDown) {
                if (!isIE) {
                    event.preventDefault();
                }
            }
        };
        this.viewerContainerOnClick = function (event) {
            if (event.type === 'dblclick') {
                if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled && !_this.getCurrentTextMarkupAnnotation()) {
                    if (event.target.classList.contains('e-pv-text')) {
                        _this.isViewerContainerDoubleClick = true;
                        if (!_this.getTextMarkupAnnotationMode()) {
                            var pageNumber = parseFloat(event.target.id.split('_')[2]);
                            _this.pdfViewer.fireTextSelectionStart(pageNumber + 1);
                        }
                        _this.pdfViewer.textSelectionModule.selectAWord(event.target, event.clientX, event.clientY, false);
                        if (_this.pdfViewer.contextMenuOption === 'MouseUp') {
                            _this.pdfViewer.textSelectionModule.calculateContextMenuPosition(event.clientY, event.clientX);
                        }
                        if (!_this.getTextMarkupAnnotationMode()) {
                            _this.pdfViewer.textSelectionModule.maintainSelectionOnZoom(true, false);
                            _this.dblClickTimer = setTimeout(function () { _this.applySelection(); }, 100);
                            _this.pdfViewer.textSelectionModule.fireTextSelectEnd();
                        }
                        else if (_this.isTextMarkupAnnotationModule() && _this.getTextMarkupAnnotationMode()) {
                            // tslint:disable-next-line:max-line-length
                            _this.pdfViewer.annotationModule.textMarkupAnnotationModule.drawTextMarkupAnnotations(_this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode);
                        }
                    }
                }
                else if (_this.getCurrentTextMarkupAnnotation()) {
                    // this.pdfViewer.annotationModule.showAnnotationPopup(event);
                }
                if (_this.action && (_this.action === 'Perimeter' || _this.action === 'Polygon') && _this.tool) {
                    _this.eventArgs.position = _this.currentPosition;
                    _this.getMouseEventArgs(_this.currentPosition, _this.eventArgs, event, _this.eventArgs.source);
                    var ctrlKey = _this.isMetaKey(event);
                    var info = { ctrlKey: event.ctrlKey, shiftKey: event.shiftKey };
                    _this.eventArgs.info = info;
                    _this.eventArgs.clickCount = event.detail;
                    _this.tool.mouseUp(_this.eventArgs, true);
                }
                if (_this.pdfViewer.selectedItems ||
                    (_this.pdfViewer.annotation && _this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation)) {
                    if (_this.pdfViewer.selectedItems.annotations.length !== 0) {
                        if (_this.pdfViewer.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus === false) {
                            if (_this.isFreeTextAnnotation(_this.pdfViewer.selectedItems.annotations) === true) {
                                var elmtPosition = {};
                                elmtPosition.x = _this.pdfViewer.selectedItems.annotations[0].bounds.x;
                                elmtPosition.y = _this.pdfViewer.selectedItems.annotations[0].bounds.y;
                                // tslint:disable-next-line:max-line-length
                                _this.pdfViewer.annotation.freeTextAnnotationModule.addInuptElemet(elmtPosition, _this.pdfViewer.selectedItems.annotations[0]);
                            }
                            else if (_this.pdfViewer.selectedItems.annotations[0].enableShapeLabel === true) {
                                var elmtPosition = {};
                                elmtPosition.x = _this.pdfViewer.selectedItems.annotations[0].bounds.x;
                                elmtPosition.y = _this.pdfViewer.selectedItems.annotations[0].bounds.y;
                                // tslint:disable-next-line:max-line-length
                                _this.pdfViewer.annotation.inputElementModule.editLabel(elmtPosition, _this.pdfViewer.selectedItems.annotations[0]);
                            }
                            else {
                                // tslint:disable-next-line
                                var accordionExpand = document.getElementById(_this.pdfViewer.element.id + '_accordionContainer' + _this.pdfViewer.currentPageNumber);
                                if (accordionExpand) {
                                    accordionExpand.ej2_instances[0].expandItem(true);
                                }
                                // tslint:disable-next-line
                                var commentsDiv = document.getElementById(_this.pdfViewer.selectedItems.annotations[0].annotName);
                                if (commentsDiv) {
                                    if (!commentsDiv.classList.contains('e-pv-comments-border')) {
                                        commentsDiv.firstChild.click();
                                    }
                                }
                            }
                        }
                    }
                    else {
                        // tslint:disable-next-line:max-line-length
                        if (_this.pdfViewer.annotation && _this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                            // tslint:disable-next-line
                            var annotation = _this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation;
                            // tslint:disable-next-line
                            var accordionExpand = document.getElementById(_this.pdfViewer.element.id + '_accordionContainer' + _this.currentPageNumber);
                            if (accordionExpand) {
                                accordionExpand.ej2_instances[0].expandItem(true);
                            }
                            // tslint:disable-next-line
                            var comments = document.getElementById(annotation.annotName);
                            if (comments) {
                                comments.firstChild.click();
                            }
                        }
                    }
                }
            }
            else {
                if (event.detail === 3) {
                    if (_this.isViewerContainerDoubleClick) {
                        clearTimeout(_this.dblClickTimer);
                        _this.isViewerContainerDoubleClick = false;
                    }
                    if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled && !_this.getTextMarkupAnnotationMode()) {
                        _this.pdfViewer.textSelectionModule.selectEntireLine(event);
                        _this.pdfViewer.textSelectionModule.maintainSelectionOnZoom(true, false);
                        _this.pdfViewer.textSelectionModule.fireTextSelectEnd();
                        _this.applySelection();
                    }
                }
            }
        };
        this.viewerContainerOnDragStart = function (event) {
            // tslint:disable-next-line
            var isIE = !!document.documentMode;
            if (!isIE) {
                event.preventDefault();
            }
        };
        // tslint:disable-next-line
        this.viewerContainerOnContextMenuClick = function (event) {
            _this.isViewerMouseDown = false;
        };
        // tslint:disable-next-line
        this.onWindowMouseUp = function (event) {
            _this.isFreeTextContextMenu = false;
            // tslint:disable-next-line:max-line-length
            if (_this.pdfViewer.enableTextMarkupResizer && _this.pdfViewer.annotationModule && _this.pdfViewer.annotation.textMarkupAnnotationModule) {
                // tslint:disable-next-line
                var modules = _this.pdfViewer.annotation.textMarkupAnnotationModule;
                modules.isLeftDropletClicked = false;
                modules.isDropletClicked = false;
                modules.isRightDropletClicked = false;
                if (!modules.currentTextMarkupAnnotation && window.getSelection().anchorNode == null) {
                    modules.showHideDropletDiv(true);
                }
            }
            if (!_this.getPopupNoteVisibleStatus()) {
                if (event.button === 0) {
                    // tslint:disable-next-line:max-line-length
                    if (_this.isNewFreeTextAnnotation()) {
                        if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled && !_this.getTextMarkupAnnotationMode()) {
                            // tslint:disable-next-line:max-line-length
                            if (event.detail === 1 && !_this.viewerContainer.contains(event.target) && !_this.contextMenuModule.contextMenuElement.contains(event.target)) {
                                if (window.getSelection().anchorNode !== null) {
                                    _this.pdfViewer.textSelectionModule.textSelectionOnMouseup(event);
                                }
                            }
                            // tslint:disable-next-line
                            var target = event.target;
                            if (_this.viewerContainer.contains(event.target) && target.className !== 'e-pdfviewer-formFields') {
                                if (!_this.isClickedOnScrollBar(event, true) && !_this.isScrollbarMouseDown) {
                                    _this.pdfViewer.textSelectionModule.textSelectionOnMouseup(event);
                                }
                                else {
                                    if (window.getSelection().anchorNode !== null) {
                                        _this.pdfViewer.textSelectionModule.applySpanForSelection();
                                    }
                                }
                            }
                        }
                        else if (_this.getTextMarkupAnnotationMode()) {
                            // tslint:disable-next-line
                            var viewerElement = _this.pdfViewer.element;
                            // tslint:disable-next-line
                            var targetElement = event.target;
                            if (viewerElement && targetElement) {
                                if (viewerElement.id === targetElement.id.split('_')[0]) {
                                    // tslint:disable-next-line:max-line-length
                                    _this.pdfViewer.annotationModule.textMarkupAnnotationModule.drawTextMarkupAnnotations(_this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode);
                                }
                            }
                        }
                    }
                }
                else if (event.button === 2) {
                    if (_this.viewerContainer.contains(event.target) && _this.skipPreventDefault(event.target)) {
                        window.getSelection().removeAllRanges();
                    }
                }
                if (_this.isViewerMouseDown) {
                    _this.isViewerMouseDown = false;
                    if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled) {
                        _this.pdfViewer.textSelectionModule.clear();
                        _this.pdfViewer.textSelectionModule.selectionStartPage = null;
                    }
                    if (_this.isShapeBasedAnnotationsEnabled()) {
                        _this.diagramMouseUp(event);
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                else {
                    return true;
                }
            }
        };
        this.onWindowTouchEnd = function (event) {
            // tslint:disable-next-line:max-line-length
            if (!_this.pdfViewer.element.contains(event.target) && !_this.contextMenuModule.contextMenuElement.contains(event.target)) {
                if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled) {
                    _this.pdfViewer.textSelectionModule.clearTextSelection();
                }
            }
        };
        this.viewerContainerOnTouchStart = function (event) {
            var touchPoints = event.touches;
            if (_this.pdfViewer.magnificationModule) {
                _this.pdfViewer.magnificationModule.setTouchPoints(touchPoints[0].clientX, touchPoints[0].clientY);
            }
            var target = event.target;
            // tslint:disable-next-line:max-line-length
            if (touchPoints.length === 1 && !(target.classList.contains('e-pv-hyperlink')) && _this.skipPreventDefault(target)) {
                _this.preventTouchEvent(event);
            }
            if (event.touches.length === 1 && _this.isTextMarkupAnnotationModule() && !_this.getPopupNoteVisibleStatus()) {
                _this.pdfViewer.annotationModule.textMarkupAnnotationModule.onTextMarkupAnnotationTouchEnd(event);
            }
            _this.touchClientX = touchPoints[0].clientX;
            _this.touchClientY = touchPoints[0].clientY;
            _this.scrollY = touchPoints[0].clientY;
            _this.previousTime = new Date().getTime();
            // tslint:disable-next-line:max-line-length
            if (touchPoints.length === 1 && !(event.target.classList.contains('e-pv-touch-select-drop') || event.target.classList.contains('e-pv-touch-ellipse'))) {
                if (Browser.isDevice && _this.pageCount > 0 && !_this.isThumb && !(event.target.classList.contains('e-pv-hyperlink'))) {
                    _this.handleTaps(touchPoints);
                }
                else if (!Browser.isDevice) {
                    _this.handleTextBoxTaps(touchPoints);
                }
                if (_this.pdfViewer.textSelectionModule && !_this.isTextSelectionDisabled) {
                    _this.pdfViewer.textSelectionModule.clearTextSelection();
                    _this.contextMenuModule.contextMenuObj.close();
                    // event.preventDefault();
                    if (!_this.isLongTouchPropagated) {
                        _this.longTouchTimer = setTimeout(function () { _this.viewerContainerOnLongTouch(event); }, 1000);
                    }
                    _this.isLongTouchPropagated = true;
                }
            }
            _this.diagramMouseDown(event);
            // tslint:disable-next-line:max-line-length
            if (_this.action === 'Drag' || _this.action.indexOf('Rotate') !== -1 || _this.action.indexOf('Resize') !== -1) {
                event.preventDefault();
            }
        };
        this.viewerContainerOnLongTouch = function (event) {
            _this.touchClientX = event.touches[0].clientX;
            _this.touchClientY = event.touches[0].clientY;
            event.preventDefault();
            if (_this.pdfViewer.textSelectionModule) {
                _this.pdfViewer.textSelectionModule.initiateTouchSelection(event, _this.touchClientX, _this.touchClientY);
                if (Browser.isDevice) {
                    clearTimeout(_this.singleTapTimer);
                    _this.tapCount = 0;
                }
            }
        };
        this.viewerContainerOnPointerDown = function (event) {
            if (event.pointerType === 'touch') {
                _this.pointerCount++;
                if (_this.pointerCount <= 2) {
                    event.preventDefault();
                    _this.pointersForTouch.push(event);
                    if (_this.pointerCount === 2) {
                        _this.pointerCount = 0;
                    }
                    if (_this.pdfViewer.magnificationModule) {
                        _this.pdfViewer.magnificationModule.setTouchPoints(event.clientX, event.clientY);
                    }
                }
            }
        };
        this.viewerContainerOnTouchMove = function (event) {
            if (Browser.isDevice) {
                clearTimeout(_this.singleTapTimer);
                _this.tapCount = 0;
            }
            _this.preventTouchEvent(event);
            var touchPoints = event.touches;
            if (_this.pdfViewer.magnificationModule) {
                _this.isTouchScrolled = true;
                if (touchPoints.length > 1 && _this.pageCount > 0) {
                    if (Browser.isDevice) {
                        _this.isTouchScrolled = false;
                        _this.mobileScrollerContainer.style.display = 'none';
                    }
                    if (_this.pdfViewer.enablePinchZoom) {
                        // tslint:disable-next-line:max-line-length
                        _this.pdfViewer.magnificationModule.initiatePinchMove(touchPoints[0].clientX, touchPoints[0].clientY, touchPoints[1].clientX, touchPoints[1].clientY);
                    }
                }
                else if (touchPoints.length === 1 && _this.getPagesPinchZoomed()) {
                    if (Browser.isDevice) {
                        _this.isTouchScrolled = false;
                        _this.mobileScrollerContainer.style.display = 'none';
                    }
                    _this.pdfViewer.magnificationModule.pinchMoveScroll();
                }
            }
            _this.mouseX = touchPoints[0].clientX;
            _this.mouseY = touchPoints[0].clientY;
            var canvas;
            if (event.target && event.target.id.indexOf('_text') > -1 && _this.pdfViewer.annotation) {
                var pageIndex = _this.pdfViewer.annotation.getEventPageNumber(event);
                var diagram = document.getElementById(_this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
                var canvas1 = diagram.getBoundingClientRect();
                var left = canvas1.x ? canvas1.x : canvas1.left;
                var top_2 = canvas1.y ? canvas1.y : canvas1.top;
                canvas = new Rect(left + 10, top_2 + 10, canvas1.width - 10, canvas1.height - 10);
            }
            if (canvas && canvas.containsPoint({ x: _this.mouseX, y: _this.mouseY })) {
                _this.diagramMouseMove(event);
            }
            else {
                _this.diagramMouseLeave(event);
            }
            touchPoints = null;
        };
        this.viewerContainerOnPointerMove = function (event) {
            if (event.pointerType === 'touch' && _this.pageCount > 0) {
                event.preventDefault();
                if (_this.pointersForTouch.length === 2) {
                    for (var i = 0; i < _this.pointersForTouch.length; i++) {
                        if (event.pointerId === _this.pointersForTouch[i].pointerId) {
                            _this.pointersForTouch[i] = event;
                            break;
                        }
                    }
                    if (_this.pdfViewer.magnificationModule && _this.pdfViewer.enablePinchZoom) {
                        // tslint:disable-next-line:max-line-length
                        _this.pdfViewer.magnificationModule.initiatePinchMove(_this.pointersForTouch[0].clientX, _this.pointersForTouch[0].clientY, _this.pointersForTouch[1].clientX, _this.pointersForTouch[1].clientY);
                    }
                }
            }
        };
        this.viewerContainerOnTouchEnd = function (event) {
            if (_this.pdfViewer.magnificationModule) {
                _this.pdfViewer.magnificationModule.pinchMoveEnd();
            }
            _this.isLongTouchPropagated = false;
            clearInterval(_this.longTouchTimer);
            _this.longTouchTimer = null;
            if (Browser.isDevice && _this.isTouchScrolled) {
                _this.currentTime = new Date().getTime();
                var duration = _this.currentTime - _this.previousTime;
                // tslint:disable-next-line
                var difference = _this.scrollY - event.changedTouches[0].pageY;
                // tslint:disable-next-line
                var speed = (difference) / (duration);
                if (Math.abs(speed) > 1.5) {
                    // tslint:disable-next-line
                    var scrollTop = (difference) + ((duration) * speed);
                    _this.viewerContainer.scrollTop += scrollTop;
                    _this.updateMobileScrollerPosition();
                }
            }
            _this.diagramMouseUp(event);
            _this.renderStampAnnotation(event);
        };
        this.viewerContainerOnPointerEnd = function (event) {
            if (event.pointerType === 'touch') {
                event.preventDefault();
                if (_this.pdfViewer.magnificationModule) {
                    _this.pdfViewer.magnificationModule.pinchMoveEnd();
                }
                _this.pointersForTouch = [];
                _this.pointerCount = 0;
            }
        };
        // tslint:disable-next-line
        this.viewerContainerOnScroll = function (event) {
            var proxy = _this;
            var scrollposX = 0;
            var scrollposY = 0;
            if (event.touches && Browser.isDevice) {
                // tslint:disable-next-line
                var ratio = (_this.viewerContainer.scrollHeight - _this.viewerContainer.clientHeight) / (_this.viewerContainer.clientHeight - _this.toolbarHeight);
                if (_this.isThumb) {
                    _this.ispageMoved = true;
                    event.preventDefault();
                    _this.mobilePageNoContainer.style.display = 'block';
                    scrollposX = event.touches[0].pageX - _this.scrollX;
                    scrollposY = event.touches[0].pageY - _this.viewerContainer.offsetTop;
                    _this.viewerContainer.scrollTop = scrollposY * ratio;
                    // tslint:disable-next-line
                    var containerValue = event.touches[0].pageY;
                    if (_this.viewerContainer.scrollTop !== 0 && ((containerValue) <= _this.viewerContainer.clientHeight)) {
                        _this.mobileScrollerContainer.style.top = containerValue + 'px';
                    }
                }
                else if (event.touches[0].target.className !== 'e-pv-touch-ellipse') {
                    if (!(_this.isWebkitMobile && Browser.isDevice)) {
                        _this.mobilePageNoContainer.style.display = 'none';
                        scrollposY = _this.touchClientY - event.touches[0].pageY;
                        scrollposX = _this.touchClientX - event.touches[0].pageX;
                        _this.viewerContainer.scrollTop = _this.viewerContainer.scrollTop + (scrollposY);
                        _this.viewerContainer.scrollLeft = _this.viewerContainer.scrollLeft + (scrollposX);
                    }
                    // tslint:disable-next-line
                    _this.updateMobileScrollerPosition();
                    _this.touchClientY = event.touches[0].pageY;
                    _this.touchClientX = event.touches[0].pageX;
                }
            }
            if (_this.scrollHoldTimer) {
                clearTimeout(_this.scrollHoldTimer);
            }
            var pageIndex = _this.currentPageNumber;
            _this.scrollHoldTimer = null;
            _this.contextMenuModule.contextMenuObj.close();
            var verticalScrollValue = _this.viewerContainer.scrollTop;
            // tslint:disable-next-line:max-line-length
            for (var i = 0; i < _this.pageCount; i++) {
                if (_this.pageSize[i] != null) {
                    var pageHeight = _this.getPageHeight(i);
                    // tslint:disable-next-line:max-line-length
                    if ((verticalScrollValue + _this.pageStopValue) <= (_this.getPageTop(i) + pageHeight)) {
                        _this.currentPageNumber = i + 1;
                        break;
                    }
                }
            }
            // tslint:disable-next-line:max-line-length
            if (_this.pdfViewer.magnificationModule && _this.pdfViewer.magnificationModule.fitType === 'fitToPage' && _this.currentPageNumber > 0) {
                _this.viewerContainer.scrollTop = _this.pageSize[_this.currentPageNumber - 1].top * _this.getZoomFactor();
            }
            _this.renderElementsVirtualScroll(_this.currentPageNumber);
            // tslint:disable-next-line:max-line-length
            if (!_this.isViewerMouseDown && !_this.getPinchZoomed() && !_this.getPinchScrolled() && !_this.getPagesPinchZoomed() || _this.isViewerMouseWheel) {
                _this.pageViewScrollChanged(_this.currentPageNumber);
                _this.isViewerMouseWheel = false;
            }
            else {
                _this.showPageLoadingIndicator(_this.currentPageNumber - 1, false);
            }
            if (_this.pdfViewer.toolbarModule) {
                _this.pdfViewer.toolbarModule.updateCurrentPage(_this.currentPageNumber);
                _this.viewerContainer.setAttribute('aria-labelledby', _this.pdfViewer.element.id + '_pageDiv_' + (_this.currentPageNumber - 1));
                if (!Browser.isDevice) {
                    _this.pdfViewer.toolbarModule.updateNavigationButtons();
                }
            }
            if (pageIndex !== _this.currentPageNumber) {
                if (proxy.pdfViewer.thumbnailViewModule && !Browser.isDevice) {
                    proxy.pdfViewer.thumbnailViewModule.gotoThumbnailImage(proxy.currentPageNumber - 1);
                    proxy.pdfViewer.thumbnailViewModule.isThumbnailClicked = false;
                }
                _this.pdfViewer.firePageChange(pageIndex);
            }
            if (_this.pdfViewer.magnificationModule) {
                _this.pdfViewer.magnificationModule.updatePagesForFitPage(_this.currentPageNumber - 1);
            }
            var currentPage = _this.getElement('_pageDiv_' + (_this.currentPageNumber - 1));
            if (currentPage) {
                currentPage.style.visibility = 'visible';
            }
            if (_this.isViewerMouseDown) {
                if (_this.getRerenderCanvasCreated()) {
                    _this.pdfViewer.magnificationModule.clearIntervalTimer();
                }
                // tslint:disable-next-line
                var data = _this.getStoredData(_this.currentPageNumber);
                if (data) {
                    _this.initiatePageViewScrollChanged();
                }
                else {
                    _this.scrollHoldTimer = setTimeout(function () { _this.initiatePageViewScrollChanged(); }, 100);
                }
            }
            if (_this.pdfViewer.annotation && _this.navigationPane.commentPanelContainer) {
                _this.pdfViewer.annotation.stickyNotesAnnotationModule.updateCommentPanelScrollTop(_this.currentPageNumber);
            }
        };
        this.pdfViewer = viewer;
        this.navigationPane = new NavigationPane(this.pdfViewer, this);
        this.textLayer = new TextLayer(this.pdfViewer, this);
        this.signatureModule = new Signature(this.pdfViewer, this);
        // tslint:disable-next-line:max-line-length
        this.isWebkitMobile = /Chrome/.test(navigator.userAgent) || /Google Inc/.test(navigator.vendor) || (navigator.userAgent.indexOf('Safari') !== -1);
    }
    /**
     * @private
     */
    PdfViewerBase.prototype.initializeComponent = function () {
        var element = document.getElementById(this.pdfViewer.element.id);
        if (element) {
            if (Browser.isDevice) {
                this.pdfViewer.element.classList.add('e-pv-mobile-view');
            }
            var controlWidth = '100%';
            var toolbarDiv = void 0;
            // tslint:disable-next-line:max-line-length
            this.viewerMainContainer = createElement('div', { id: this.pdfViewer.element.id + '_viewerMainContainer', className: 'e-pv-viewer-main-container' });
            // tslint:disable-next-line:max-line-length
            this.viewerContainer = createElement('div', { id: this.pdfViewer.element.id + '_viewerContainer', className: 'e-pv-viewer-container', attrs: { 'aria-label': 'pdfviewer scroll view' } });
            if (Browser.isDevice) {
                this.createMobilePageNumberContainer();
            }
            this.viewerContainer.tabIndex = 0;
            if (this.pdfViewer.enableRtl) {
                this.viewerContainer.style.direction = 'rtl';
            }
            element.style.touchAction = 'pan-x pan-y';
            this.setMaximumHeight(element);
            // tslint:disable-next-line:max-line-length
            this.mainContainer = createElement('div', { id: this.pdfViewer.element.id + '_mainContainer', className: 'e-pv-main-container' });
            this.mainContainer.appendChild(this.viewerMainContainer);
            element.appendChild(this.mainContainer);
            if (this.pdfViewer.toolbarModule) {
                this.navigationPane.initializeNavigationPane();
                toolbarDiv = this.pdfViewer.toolbarModule.intializeToolbar(controlWidth);
            }
            if (toolbarDiv) {
                // tslint:disable-next-line:max-line-length
                this.viewerContainer.style.height = this.updatePageHeight(this.pdfViewer.element.getBoundingClientRect().height, 56);
            }
            else {
                this.viewerContainer.style.height = this.updatePageHeight(this.pdfViewer.element.getBoundingClientRect().height, 0);
            }
            // tslint:disable-next-line:max-line-length
            var viewerWidth = this.pdfViewer.element.clientWidth;
            if (!Browser.isDevice) {
                viewerWidth = viewerWidth - (this.navigationPane.sideBarToolbar ? this.navigationPane.getViewerContainerLeft() : 0) -
                    (this.navigationPane.commentPanelContainer ? this.navigationPane.getViewerContainerRight() : 0);
            }
            this.viewerContainer.style.width = viewerWidth + 'px';
            this.viewerMainContainer.appendChild(this.viewerContainer);
            if (Browser.isDevice) {
                this.mobileScrollerContainer.style.left = (viewerWidth - parseFloat(this.mobileScrollerContainer.style.width)) + 'px';
                this.mobilePageNoContainer.style.left = (viewerWidth / 2) - (parseFloat(this.mobilePageNoContainer.style.width) / 2) + 'px';
                this.mobilePageNoContainer.style.top = (this.pdfViewer.element.clientHeight / 2) + 'px';
                this.mobilePageNoContainer.style.display = 'none';
                this.mobilePageNoContainer.appendChild(this.mobilecurrentPageContainer);
                this.mobilePageNoContainer.appendChild(this.mobilenumberContainer);
                this.mobilePageNoContainer.appendChild(this.mobiletotalPageContainer);
                this.viewerContainer.appendChild(this.mobilePageNoContainer);
                this.viewerMainContainer.appendChild(this.mobileScrollerContainer);
                this.mobileScrollerContainer.appendChild(this.mobileSpanContainer);
            }
            // tslint:disable-next-line:max-line-length
            this.pageContainer = createElement('div', { id: this.pdfViewer.element.id + '_pageViewContainer', className: 'e-pv-page-container', attrs: { 'tabindex': '0', 'aria-label': 'pdfviewer Page View' } });
            if (this.pdfViewer.enableRtl) {
                this.pageContainer.style.direction = 'ltr';
            }
            this.viewerContainer.appendChild(this.pageContainer);
            this.pageContainer.style.width = this.viewerContainer.clientWidth + 'px';
            if (toolbarDiv && this.pdfViewer.thumbnailViewModule && !Browser.isDevice) {
                this.pdfViewer.thumbnailViewModule.createThumbnailContainer();
            }
            this.createPrintPopup();
            if (Browser.isDevice) {
                this.createGoToPagePopup();
            }
            var waitingPopup = createElement('div', { id: this.pdfViewer.element.id + '_loadingIndicator' });
            this.viewerContainer.appendChild(waitingPopup);
            createSpinner({ target: waitingPopup, cssClass: 'e-spin-center' });
            this.setLoaderProperties(waitingPopup);
            this.contextMenuModule = new ContextMenu(this.pdfViewer, this);
            this.contextMenuModule.createContextMenu();
            this.wireEvents();
            if (this.pdfViewer.textSearchModule && !Browser.isDevice) {
                this.pdfViewer.textSearchModule.createTextSearchBox();
            }
            if (this.pdfViewer.documentPath) {
                this.pdfViewer.load(this.pdfViewer.documentPath, null);
            }
            if (this.pdfViewer.annotationModule) {
                this.pdfViewer.annotationModule.initializeCollection();
            }
        }
    };
    PdfViewerBase.prototype.createMobilePageNumberContainer = function () {
        // tslint:disable-next-line:max-line-length
        this.mobilePageNoContainer = createElement('div', { id: this.pdfViewer.element.id + '_mobilepagenoContainer', className: 'e-pv-mobilepagenoscroll-container' });
        // tslint:disable-next-line:max-line-length
        this.mobilecurrentPageContainer = createElement('span', { id: this.pdfViewer.element.id + '_mobilecurrentpageContainer', className: 'e-pv-mobilecurrentpage-container' });
        // tslint:disable-next-line:max-line-length
        this.mobilenumberContainer = createElement('span', { id: this.pdfViewer.element.id + '_mobiledashedlineContainer', className: 'e-pv-mobiledashedline-container' });
        // tslint:disable-next-line:max-line-length
        this.mobiletotalPageContainer = createElement('span', { id: this.pdfViewer.element.id + '_mobiletotalpageContainer', className: 'e-pv-mobiletotalpage-container' });
        this.mobileScrollerContainer = createElement('div', { id: this.pdfViewer.element.id + '_mobilescrollContainer', className: 'e-pv-mobilescroll-container' });
        // tslint:disable-next-line:max-line-length
        this.mobileSpanContainer = createElement('span', { id: this.pdfViewer.element.id + '_mobilespanContainer', className: 'e-pv-mobilespanscroll-container' });
        this.mobileSpanContainer.innerHTML = '1';
        this.mobilecurrentPageContainer.innerHTML = '1';
        this.mobilenumberContainer.innerHTML = '&#x2015;&#x2015;&#x2015;&#x2015;&#x2015;';
        this.mobileScrollerContainer.style.cssFloat = 'right';
        this.mobileScrollerContainer.style.width = '40px';
        this.mobileScrollerContainer.style.height = '32px';
        this.mobileScrollerContainer.style.zIndex = '100';
        this.mobilePageNoContainer.style.width = '120px';
        this.mobilePageNoContainer.style.height = '100px';
        this.mobilePageNoContainer.style.zIndex = '100';
        this.mobilePageNoContainer.style.position = 'fixed';
        this.mobileScrollerContainer.addEventListener('touchstart', this.mobileScrollContainerDown.bind(this));
        this.mobileScrollerContainer.addEventListener('touchend', this.mobileScrollContainerEnd.bind(this));
        this.mobileScrollerContainer.style.display = 'none';
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.initiatePageRender = function (documentData, password) {
        this.documentId = this.createGUID();
        this.viewerContainer.scrollTop = 0;
        this.showLoadingIndicator(true);
        this.hashId = ' ';
        this.isFileName = false;
        this.saveDocumentInfo();
        if (this.pdfViewer.interactionMode === 'Pan') {
            this.initiatePanning();
        }
        documentData = this.checkDocumentData(documentData);
        this.setFileName();
        var jsonObject = this.constructJsonObject(documentData, password);
        this.createAjaxRequest(jsonObject, documentData, password);
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.mobileScrollContainerDown = function (event) {
        this.ispageMoved = false;
        this.isThumb = true;
        if (this.isTextMarkupAnnotationModule()) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage != null && Browser.isDevice) {
                var pageNumber = this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearAnnotationSelection(pageNumber);
                this.pdfViewer.toolbar.showToolbar(true);
            }
        }
        this.mobileScrollerContainer.addEventListener('touchmove', this.viewerContainerOnScroll.bind(this), true);
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.setMaximumHeight = function (element) {
        if (!Browser.isDevice) {
            element.style.minHeight = '500px';
        }
        this.updateWidth();
        this.updateHeight();
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateWidth = function () {
        if (this.pdfViewer.width.toString() !== 'auto') {
            // tslint:disable-next-line
            this.pdfViewer.element.style.width = this.pdfViewer.width;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateHeight = function () {
        if (this.pdfViewer.height.toString() !== 'auto') {
            // tslint:disable-next-line
            this.pdfViewer.element.style.height = this.pdfViewer.height;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateViewerContainer = function () {
        var sideBarContentContainer = this.getElement('_sideBarContentContainer');
        if (sideBarContentContainer) {
            this.navigationPane.updateViewerContainerOnClose();
        }
        else {
            this.updateViewerContainerSize();
        }
    };
    PdfViewerBase.prototype.updateViewerContainerSize = function () {
        // tslint:disable-next-line:max-line-length
        this.viewerContainer.style.width = this.pdfViewer.element.clientWidth + 'px';
        // tslint:disable-next-line:max-line-length
        this.pageContainer.style.width = this.viewerContainer.offsetWidth + 'px';
        this.updateZoomValue();
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.mobileScrollContainerEnd = function (event) {
        if (!this.ispageMoved) {
            this.goToPagePopup.show();
        }
        this.isThumb = false;
        this.ispageMoved = false;
        this.mobileScrollerContainer.removeEventListener('touchmove', this.viewerContainerOnScroll.bind(this), true);
        this.mobilePageNoContainer.style.display = 'none';
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.createAjaxRequest = function (jsonObject, documentData, password) {
        var proxy = this;
        this.loadRequestHandler = new AjaxHandler(this.pdfViewer);
        this.loadRequestHandler.url = this.pdfViewer.serviceUrl + '/' + this.pdfViewer.serverActionSettings.load;
        this.loadRequestHandler.responseType = 'json';
        this.loadRequestHandler.mode = true;
        // tslint:disable-next-line
        jsonObject['action'] = 'Load';
        // tslint:disable-next-line
        jsonObject['elementId'] = this.pdfViewer.element.id;
        this.loadRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        this.loadRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        proxy.onControlError(500, data, this.pdfViewer.serverActionSettings.load);
                        data = null;
                    }
                }
                if (data) {
                    while (typeof data !== 'object') {
                        data = JSON.parse(data);
                        // tslint:disable-next-line
                        if (typeof parseInt(data) === 'number' && !isNaN(parseInt(data))) {
                            // tslint:disable-next-line
                            data = parseInt(data);
                            break;
                        }
                    }
                    // tslint:disable-next-line
                    if (data.uniqueId === proxy.documentId || (typeof parseInt(data) === 'number' && !isNaN(parseInt(data)))) {
                        proxy.requestSuccess(data, documentData, password);
                    }
                }
            }
        };
        // tslint:disable-next-line
        this.loadRequestHandler.onFailure = function (result) {
            var statusString = result.status.toString().split('')[0];
            if (statusString === '4') {
                proxy.openNotificationPopup('Client error');
            }
            else {
                proxy.openNotificationPopup();
            }
            proxy.showLoadingIndicator(false);
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.load);
        };
        // tslint:disable-next-line
        this.loadRequestHandler.onError = function (result) {
            proxy.openNotificationPopup();
            proxy.showLoadingIndicator(false);
            // tslint:disable-next-line
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.load);
        };
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.openNotificationPopup = function (errorString) {
        if (errorString === 'Client error') {
            this.textLayer.createNotificationPopup(this.pdfViewer.localeObj.getConstant('Client error'));
        }
        else {
            this.textLayer.createNotificationPopup(this.pdfViewer.localeObj.getConstant('Server error'));
        }
        this.getElement('_notify').classList.add('e-pv-notification-large-content');
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.requestSuccess = function (data, documentData, password) {
        if (data && data.pageCount !== undefined) {
            this.pageCount = data.pageCount;
            this.hashId = data.hashId;
            this.documentLiveCount = data.documentLiveCount;
            this.isAnnotationCollectionRemoved = false;
            this.saveDocumentHashData();
            this.saveFormfieldsData(data);
            this.pageRender(data);
            if (Browser.isDevice) {
                this.mobileScrollerContainer.style.display = '';
                this.mobileScrollerContainer.style.top = (this.toolbarHeight) + 'px';
            }
        }
        else {
            this.pageCount = 0;
            this.currentPageNumber = 0;
            if (Browser.isDevice) {
                this.mobileScrollerContainer.style.display = 'none';
            }
            if (data === 4) {
                // 4 is error code for encrypted document.
                this.renderPasswordPopup(documentData, password);
            }
            else if (data === 3) {
                // 3 is error code for corrupted document.
                this.renderCorruptPopup();
            }
            if (this.pdfViewer.toolbarModule) {
                this.pdfViewer.toolbarModule.updateToolbarItems();
            }
        }
        if (this.pdfViewer.thumbnailViewModule && !Browser.isDevice) {
            this.pdfViewer.thumbnailViewModule.createRequestForThumbnails();
        }
        if (this.pdfViewer.bookmarkViewModule) {
            this.pdfViewer.bookmarkViewModule.createRequestForBookmarks();
        }
        if (this.pdfViewer.annotationModule && this.pdfViewer.toolbar) {
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.initializeAcccordionContainer();
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.createRequestForComments();
        }
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.enableTextMarkupResizer && this.pdfViewer.annotationModule && this.pdfViewer.annotation.textMarkupAnnotationModule) {
            this.pdfViewer.annotation.textMarkupAnnotationModule.createAnnotationSelectElement();
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.pageRender = function (data) {
        this.document = null;
        this.passwordDialogReset();
        if (this.passwordPopup) {
            this.passwordPopup.hide();
        }
        var pageIndex = 0;
        this.initPageDiv(data);
        if (this.pdfViewer.magnificationModule) {
            this.pdfViewer.magnificationModule.isAutoZoom = true;
            this.pdfViewer.magnificationModule.isInitialLoading = true;
            this.onWindowResize();
            this.pdfViewer.magnificationModule.isInitialLoading = false;
        }
        this.isDocumentLoaded = true;
        // tslint:disable-next-line
        var viewportWidth = this.pdfViewer.element.clientWidth > 0 ? this.pdfViewer.element.clientWidth : this.pdfViewer.element.style.width;
        // tslint:disable-next-line:radix
        viewportWidth = parseInt(viewportWidth);
        var pageWidth = this.pageSize[pageIndex].width;
        if (this.renderedPagesList.indexOf(pageIndex) === -1) {
            this.createRequestForRender(pageIndex);
            var pageNumber = pageIndex + 1;
            if (pageNumber < this.pageCount) {
                this.createRequestForRender(pageNumber);
                pageNumber = pageNumber + 1;
            }
            if (this.pageSize[pageNumber]) {
                var pageTop = this.getPageTop(pageNumber);
                var viewerHeight = this.viewerContainer.clientHeight;
                while (viewerHeight > pageTop) {
                    if (this.pageSize[pageNumber]) {
                        this.renderPageElement(pageNumber);
                        this.createRequestForRender(pageNumber);
                        pageTop = this.getPageTop(pageNumber);
                        pageNumber = pageNumber + 1;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        this.showLoadingIndicator(false);
        this.currentPageNumber = pageIndex + 1;
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.uploadedDocumentName = null;
            this.pdfViewer.toolbarModule.updateCurrentPage(this.currentPageNumber);
            this.pdfViewer.toolbarModule.updateToolbarItems();
            this.viewerContainer.setAttribute('aria-labelledby', this.pdfViewer.element.id + '_pageDiv_' + (this.currentPageNumber - 1));
        }
        if (Browser.isDevice) {
            this.mobileSpanContainer.innerHTML = this.currentPageNumber.toString();
            this.mobilecurrentPageContainer.innerHTML = this.currentPageNumber.toString();
        }
    };
    PdfViewerBase.prototype.renderPasswordPopup = function (documentData, password) {
        if (!this.isPasswordAvailable) {
            if (this.isFileName) {
                this.document = documentData;
            }
            else {
                this.document = 'data:application/pdf;base64,' + documentData;
            }
            this.createPasswordPopup();
            this.pdfViewer.fireDocumentLoadFailed(true, null);
            this.passwordPopup.show();
        }
        else {
            this.pdfViewer.fireDocumentLoadFailed(true, password);
            this.promptElement.classList.add('e-pv-password-error');
            this.promptElement.textContent = this.pdfViewer.localeObj.getConstant('Invalid Password');
            this.promptElement.focus();
            if (this.isFileName) {
                this.document = documentData;
            }
            else {
                this.document = 'data:application/pdf;base64,' + documentData;
            }
            this.passwordPopup.show();
        }
    };
    PdfViewerBase.prototype.renderCorruptPopup = function () {
        this.pdfViewer.fireDocumentLoadFailed(false, null);
        this.createCorruptedPopup();
        this.documentId = null;
        this.corruptPopup.show();
    };
    PdfViewerBase.prototype.constructJsonObject = function (documentData, password) {
        var jsonObject;
        if (password) {
            this.isPasswordAvailable = true;
            // tslint:disable-next-line:max-line-length
            jsonObject = { document: documentData, password: password, zoomFactor: 1, isFileName: this.isFileName, uniqueId: this.documentId };
        }
        else {
            this.isPasswordAvailable = false;
            jsonObject = { document: documentData, zoomFactor: 1, isFileName: this.isFileName, uniqueId: this.documentId };
        }
        return jsonObject;
    };
    PdfViewerBase.prototype.checkDocumentData = function (documentData) {
        var base64String = documentData.split('base64,')[1];
        if (base64String === undefined) {
            this.isFileName = true;
            this.jsonDocumentId = documentData;
            if (this.pdfViewer.fileName === null) {
                // tslint:disable-next-line:max-line-length
                var documentStringArray = (documentData.indexOf('\\') !== -1) ? documentData.split('\\') : documentData.split('/');
                this.pdfViewer.fileName = documentStringArray[documentStringArray.length - 1];
                this.jsonDocumentId = this.pdfViewer.fileName;
                base64String = documentData;
            }
        }
        else {
            this.jsonDocumentId = null;
        }
        return base64String;
    };
    PdfViewerBase.prototype.setFileName = function () {
        if (this.pdfViewer.fileName === null) {
            if (this.pdfViewer.toolbarModule && this.pdfViewer.toolbarModule.uploadedDocumentName !== null) {
                this.pdfViewer.fileName = this.pdfViewer.toolbarModule.uploadedDocumentName;
                this.jsonDocumentId = this.pdfViewer.fileName;
            }
            else {
                this.pdfViewer.fileName = 'undefined.pdf';
                this.jsonDocumentId = null;
            }
        }
    };
    PdfViewerBase.prototype.saveDocumentInfo = function () {
        window.sessionStorage.setItem('currentDocument', this.documentId);
        window.sessionStorage.setItem('serviceURL', this.pdfViewer.serviceUrl);
        window.sessionStorage.setItem('unload', this.pdfViewer.serverActionSettings.unload);
    };
    PdfViewerBase.prototype.saveDocumentHashData = function () {
        window.sessionStorage.setItem('hashId', this.hashId);
        window.sessionStorage.setItem('documentLiveCount', this.documentLiveCount.toString());
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.saveFormfieldsData = function (data) {
        if (data && data.PdfRenderedFormFields) {
            window.sessionStorage.setItem('formfields', JSON.stringify(data.PdfRenderedFormFields));
        }
    };
    PdfViewerBase.prototype.updateWaitingPopup = function (pageNumber) {
        if (this.pageSize[pageNumber].top != null) {
            // tslint:disable-next-line:max-line-length
            var pageCurrentRect = this.getElement('_pageDiv_' + pageNumber).getBoundingClientRect();
            var waitingPopup = this.getElement('_pageDiv_' + pageNumber).firstChild.firstChild;
            if (pageCurrentRect.top < 0) {
                if (this.toolbarHeight + (this.viewerContainer.clientHeight / 2) - pageCurrentRect.top < pageCurrentRect.height) {
                    waitingPopup.style.top = ((this.viewerContainer.clientHeight / 2) - pageCurrentRect.top) - this.toolbarHeight + 'px';
                }
                else {
                    if (this.toolbarHeight + (pageCurrentRect.bottom / 2) - pageCurrentRect.top < pageCurrentRect.height) {
                        waitingPopup.style.top = ((pageCurrentRect.bottom / 2) - pageCurrentRect.top) - this.toolbarHeight + 'px';
                    }
                }
            }
            else {
                waitingPopup.style.top = this.viewerContainer.clientHeight / 2 + 'px';
            }
            if (Browser.isDevice && pageCurrentRect.width > this.viewerContainer.clientWidth) {
                waitingPopup.style.left = (this.viewerContainer.clientWidth / 2) + (this.viewerContainer.scrollLeft) + 'px';
            }
            else if (this.getZoomFactor() > 1.25 && pageCurrentRect.width > this.viewerContainer.clientWidth) {
                waitingPopup.style.left = this.viewerContainer.clientWidth / 2 + 'px';
            }
            else {
                waitingPopup.style.left = pageCurrentRect.width / 2 + 'px';
            }
        }
    };
    PdfViewerBase.prototype.createWaitingPopup = function (pageNumber) {
        // tslint:disable-next-line:max-line-length
        var waitingPopup = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageNumber);
        if (waitingPopup) {
            createSpinner({ target: waitingPopup });
            this.setLoaderProperties(waitingPopup);
        }
    };
    PdfViewerBase.prototype.showLoadingIndicator = function (isShow) {
        var waitingPopup = this.getElement('_loadingIndicator');
        if (waitingPopup != null) {
            if (isShow) {
                showSpinner(waitingPopup);
            }
            else {
                hideSpinner(waitingPopup);
            }
        }
    };
    PdfViewerBase.prototype.showPageLoadingIndicator = function (pageIndex, isShow) {
        var waitingPopup = this.getElement('_pageDiv_' + pageIndex);
        if (waitingPopup != null) {
            if (isShow) {
                showSpinner(waitingPopup);
            }
            else {
                hideSpinner(waitingPopup);
            }
            this.updateWaitingPopup(pageIndex);
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.showPrintLoadingIndicator = function (isShow) {
        var printWaitingPopup = this.getElement('_printLoadingIndicator');
        if (printWaitingPopup != null) {
            if (isShow) {
                this.printMainContainer.style.display = 'block';
                showSpinner(printWaitingPopup);
            }
            else {
                this.printMainContainer.style.display = 'none';
                hideSpinner(printWaitingPopup);
            }
        }
    };
    PdfViewerBase.prototype.setLoaderProperties = function (element) {
        var spinnerElement = element.firstChild.firstChild.firstChild;
        if (spinnerElement) {
            spinnerElement.style.height = '48px';
            spinnerElement.style.width = '48px';
            spinnerElement.style.transformOrigin = '24px 24px 24px';
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateScrollTop = function (pageNumber) {
        // tslint:disable-next-line
        if (this.pageSize[pageNumber] != null) {
            this.viewerContainer.scrollTop = this.getPageTop(pageNumber);
            this.renderElementsVirtualScroll(pageNumber);
            if (this.renderedPagesList.indexOf(pageNumber) === -1) {
                this.createRequestForRender(pageNumber);
            }
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getZoomFactor = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.zoomFactor;
        }
        else {
            // default value
            return 1;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getPinchZoomed = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isPinchZoomed;
        }
        else {
            // default value
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getMagnified = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isMagnified;
        }
        else {
            // default value
            return false;
        }
    };
    PdfViewerBase.prototype.getPinchScrolled = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isPinchScrolled;
        }
        else {
            // default value
            return false;
        }
    };
    PdfViewerBase.prototype.getPagesPinchZoomed = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isPagePinchZoomed;
        }
        else {
            // default value
            return false;
        }
    };
    PdfViewerBase.prototype.getPagesZoomed = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isPagesZoomed;
        }
        else {
            // default value
            return false;
        }
    };
    PdfViewerBase.prototype.getRerenderCanvasCreated = function () {
        if (this.pdfViewer.magnificationModule) {
            return this.pdfViewer.magnificationModule.isRerenderCanvasCreated;
        }
        else {
            // default value
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getDocumentId = function () {
        return this.documentId;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.download = function () {
        if (this.pageCount > 0) {
            this.createRequestForDownload();
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.saveAsBlob = function () {
        var _this = this;
        if (this.pageCount > 0) {
            return new Promise(function (resolve, reject) {
                _this.saveAsBlobRequest().then(function (value) {
                    resolve(value);
                });
            });
        }
        return null;
    };
    PdfViewerBase.prototype.saveAsBlobRequest = function () {
        var _this = this;
        var proxy = this;
        var promise = new Promise(function (resolve, reject) {
            // tslint:disable-next-line
            var jsonObject = proxy.constructJsonDownload();
            _this.dowonloadRequestHandler = new AjaxHandler(_this.pdfViewer);
            _this.dowonloadRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.download;
            _this.dowonloadRequestHandler.responseType = 'text';
            _this.dowonloadRequestHandler.send(jsonObject);
            // tslint:disable-next-line
            _this.dowonloadRequestHandler.onSuccess = function (result) {
                // tslint:disable-next-line
                var data = result.data;
                if (data) {
                    if (typeof data === 'object') {
                        data = JSON.parse(data);
                    }
                    if (typeof data !== 'object' && data.indexOf('data:application/pdf') === -1) {
                        proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.download);
                        data = null;
                    }
                    if (data) {
                        var blobUrl = proxy.createBlobUrl(data.split('base64,')[1], 'application/pdf');
                        resolve(blobUrl);
                    }
                }
            };
            // tslint:disable-next-line
            _this.dowonloadRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.download);
            };
            // tslint:disable-next-line
            _this.dowonloadRequestHandler.onError = function (result) {
                proxy.openNotificationPopup();
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.download);
            };
        });
        return promise;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.clear = function (isTriggerEvent) {
        this.isPasswordAvailable = false;
        this.isDocumentLoaded = false;
        this.isInitialLoaded = false;
        this.isImportAction = false;
        this.annotationPageList = [];
        this.annotationComments = null;
        this.isAnnotationCollectionRemoved = false;
        this.initiateTextSelectMode();
        if (!Browser.isDevice) {
            if (this.navigationPane.sideBarToolbar) {
                this.navigationPane.clear();
            }
        }
        if (this.pdfViewer.thumbnailViewModule) {
            this.pdfViewer.thumbnailViewModule.clear();
        }
        if (this.pdfViewer.bookmarkViewModule) {
            this.pdfViewer.bookmarkViewModule.clear();
        }
        if (this.pdfViewer.magnificationModule) {
            this.pdfViewer.magnificationModule.clearIntervalTimer();
        }
        if (this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.clearTextSelection();
        }
        if (this.pdfViewer.textSearchModule) {
            this.pdfViewer.textSearchModule.resetTextSearch();
        }
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.clear();
        }
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.initializeCollection();
        }
        if (this.pageSize) {
            this.pageSize = [];
        }
        if (this.renderedPagesList) {
            this.renderedPagesList = [];
        }
        while (this.pageContainer.hasChildNodes()) {
            this.pageContainer.removeChild(this.pageContainer.lastChild);
        }
        if (this.pageCount > 0) {
            this.unloadDocument(this);
            // tslint:disable-next-line
            this.textLayer.characterBound = new Array();
        }
        this.windowSessionStorageClear();
        if (this.pinchZoomStorage) {
            this.pinchZoomStorage = [];
        }
        if (isTriggerEvent && this.pageCount > 0) {
            this.pdfViewer.fireDocumentUnload(this.pdfViewer.fileName);
        }
        this.pdfViewer.fileName = null;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.destroy = function () {
        if (Browser.isDevice) {
            this.pdfViewer.element.classList.remove('e-pv-mobile-view');
        }
        this.unWireEvents();
        this.clear(false);
        this.pageContainer.parentNode.removeChild(this.pageContainer);
        this.viewerContainer.parentNode.removeChild(this.viewerContainer);
        this.contextMenuModule.destroy();
        if (this.pdfViewer.toolbarModule) {
            this.navigationPane.destroy();
        }
        var measureElement = document.getElementById('measureElement');
        if (measureElement) {
            measureElement.parentElement.removeChild(measureElement);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.unloadDocument = function (proxy) {
        var documentId = window.sessionStorage.getItem('hashId');
        var documentLiveCount = window.sessionStorage.getItem('documentLiveCount');
        if (documentId !== null) {
            // tslint:disable-next-line:max-line-length
            var jsonObject = { hashId: documentId, documentLiveCount: documentLiveCount, action: 'Unload', elementId: proxy.pdfViewer.element.id };
            var actionName_1 = window.sessionStorage.getItem('unload');
            this.unloadRequestHandler = new AjaxHandler(this.pdfViewer);
            this.unloadRequestHandler.url = window.sessionStorage.getItem('serviceURL') + '/' + actionName_1;
            this.unloadRequestHandler.mode = false;
            this.unloadRequestHandler.responseType = null;
            this.unloadRequestHandler.send(jsonObject);
            // tslint:disable-next-line
            this.unloadRequestHandler.onSuccess = function (result) {
                // tslint:disable-next-line
                var data = result.data;
                if (data) {
                    if (typeof data !== 'object') {
                        if (data.indexOf('Document') === -1) {
                            proxy.onControlError(500, data, actionName_1);
                            data = null;
                        }
                    }
                }
            };
            // tslint:disable-next-line
            this.unloadRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, actionName_1);
            };
            // tslint:disable-next-line
            this.unloadRequestHandler.onError = function (result) {
                proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, actionName_1);
            };
        }
        if (this.pdfViewer.magnificationModule) {
            this.pdfViewer.magnificationModule.zoomFactor = 1;
        }
        window.sessionStorage.removeItem('hashId');
        window.sessionStorage.removeItem('documentLiveCount');
        window.sessionStorage.removeItem('formfields');
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.windowSessionStorageClear = function () {
        window.sessionStorage.removeItem('currentDocument');
        window.sessionStorage.removeItem('serviceURL');
        window.sessionStorage.removeItem('unload');
        this.sessionStorage.forEach(function (element) {
            window.sessionStorage.removeItem(element);
        });
    };
    PdfViewerBase.prototype.updateCommentPanel = function () {
        // tslint:disable-next-line
        var moreOptionsButton = document.querySelectorAll('#' + this.pdfViewer.element.id + '_more-options');
        for (var i = 0; i < moreOptionsButton.length; i++) {
            moreOptionsButton[i].style.visibility = 'hidden';
        }
        // tslint:disable-next-line
        var commentTextBox = document.querySelectorAll('.e-pv-new-comments-div');
        for (var j = 0; j < commentTextBox.length; j++) {
            commentTextBox[j].style.display = 'none';
        }
        // tslint:disable-next-line
        var commentContainer = document.querySelectorAll('.e-pv-comments-border');
        for (var j = 0; j < commentContainer.length; j++) {
            commentContainer[j].classList.remove('e-pv-comments-border');
        }
        // tslint:disable-next-line
        var editableElement = document.querySelectorAll('.e-editable-inline');
        for (var j = 0; j < editableElement.length; j++) {
            editableElement[j].style.display = 'none';
        }
        // tslint:disable-next-line
        var commentSelect = document.querySelectorAll('.e-pv-comments-select');
        for (var z = 0; z < commentSelect.length; z++) {
            commentSelect[z].classList.remove('e-pv-comments-select');
        }
        // tslint:disable-next-line
        var commentsDiv = document.querySelectorAll('.e-pv-comments-div');
        for (var j = 0; j < commentsDiv.length; j++) {
            commentsDiv[j].style.minHeight = 60 + 'px';
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.focusViewerContainer = function () {
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        // tslint:disable-next-line
        var parentNode = this.getScrollParent(this.viewerContainer);
        var scrollNodeX = 0;
        var scrollNodeY = 0;
        if (parentNode !== null) {
            scrollNodeX = parentNode.scrollLeft;
            scrollNodeY = parentNode.scrollTop;
        }
        this.viewerContainer.focus();
        if (this.currentPageNumber > 0) {
            this.viewerContainer.setAttribute('aria-labelledby', this.pdfViewer.element.id + '_pageDiv_' + (this.currentPageNumber - 1));
        }
        if (this.pdfViewer.annotation && this.pdfViewer.annotation.stickyNotesAnnotationModule.accordionContainer) {
            this.updateCommentPanel();
        }
        // tslint:disable-next-line:max-line-length
        if ((navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge') !== -1) && parentNode !== null) {
            parentNode.scrollLeft = scrollNodeX;
            parentNode.scrollTop = scrollNodeY;
        }
        else if (parentNode !== null) {
            parentNode.scrollTo(scrollNodeX, scrollNodeY);
        }
        window.scrollTo(scrollX, scrollY);
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.getScrollParent = function (node) {
        if (node === null || node.nodeName === 'HTML') {
            return null;
        }
        var style = getComputedStyle(node);
        if (this.viewerContainer.id !== node.id && (style.overflowY === 'scroll' || style.overflowY === 'auto')) {
            return node;
        }
        else {
            return this.getScrollParent(node.parentNode);
        }
    };
    PdfViewerBase.prototype.createCorruptedPopup = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var popupElement = createElement('div', { id: this.pdfViewer.element.id + '_corrupted_popup', className: 'e-pv-corrupted-popup' });
        this.pageContainer.appendChild(popupElement);
        this.corruptPopup = new Dialog({
            showCloseIcon: true, closeOnEscape: true, isModal: true,
            // tslint:disable-next-line:max-line-length
            header: '<div class="e-pv-corrupted-popup-header"> ' + this.pdfViewer.localeObj.getConstant('File Corrupted') + '</div>', visible: false,
            // tslint:disable-next-line:max-line-length
            buttons: [{ buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true }, click: this.closeCorruptPopup.bind(this) }],
            target: this.pdfViewer.element, beforeClose: function () {
                _this.corruptPopup.destroy();
                _this.getElement('_corrupted_popup').remove();
                _this.corruptPopup = null;
                var waitingPopup = _this.getElement('_loadingIndicator');
                if (waitingPopup != null) {
                    hideSpinner(waitingPopup);
                }
            }
        });
        if (this.pdfViewer.enableRtl) {
            // tslint:disable-next-line:max-line-length
            this.corruptPopup.content = '<div id="templatertl" class="e-pv-notification-icon-rtl"> <div class="e-pv-corrupted-popup-content-rtl" tabindex="0">' + this.pdfViewer.localeObj.getConstant('File Corrupted Content') + '</div></div>';
            this.corruptPopup.enableRtl = true;
        }
        else {
            // tslint:disable-next-line:max-line-length
            this.corruptPopup.content = '<div id="template" class="e-pv-notification-icon"> <div class="e-pv-corrupted-popup-content" tabindex="0">' + this.pdfViewer.localeObj.getConstant('File Corrupted Content') + '</div></div>';
        }
        this.corruptPopup.appendTo(popupElement);
    };
    PdfViewerBase.prototype.closeCorruptPopup = function () {
        this.corruptPopup.hide();
        var waitingPopup = this.getElement('_loadingIndicator');
        if (waitingPopup !== null) {
            hideSpinner(waitingPopup);
        }
    };
    PdfViewerBase.prototype.createPrintPopup = function () {
        var element = document.getElementById(this.pdfViewer.element.id);
        this.printMainContainer = createElement('div', {
            id: this.pdfViewer.element.id + '_printcontainer',
            className: 'e-pv-print-popup-container'
        });
        element.appendChild(this.printMainContainer);
        this.printMainContainer.style.display = 'none';
        var printWaitingPopup = createElement('div', {
            id: this.pdfViewer.element.id + '_printLoadingIndicator',
            className: 'e-pv-print-loading-container'
        });
        this.printMainContainer.appendChild(printWaitingPopup);
        createSpinner({ target: printWaitingPopup, cssClass: 'e-spin-center' });
        this.setLoaderProperties(printWaitingPopup);
    };
    PdfViewerBase.prototype.createGoToPagePopup = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var popupElement = createElement('div', { id: this.pdfViewer.element.id + '_goTopage_popup', className: 'e-pv-gotopage-popup' });
        this.goToPageElement = createElement('span', { id: this.pdfViewer.element.id + '_prompt' });
        this.goToPageElement.textContent = this.pdfViewer.localeObj.getConstant('Enter pagenumber');
        popupElement.appendChild(this.goToPageElement);
        var inputContainer = createElement('span', { className: 'e-pv-text-input' });
        // tslint:disable-next-line:max-line-length
        this.goToPageInput = createElement('input', { id: this.pdfViewer.element.id + '_page_input', className: 'e-input' });
        this.goToPageInput.type = 'text';
        this.goToPageInput.style.maxWidth = '80%';
        this.pageNoContainer = createElement('span', { className: '.e-pv-number-ofpages' });
        inputContainer.appendChild(this.goToPageInput);
        inputContainer.appendChild(this.pageNoContainer);
        popupElement.appendChild(inputContainer);
        this.pageContainer.appendChild(popupElement);
        this.goToPagePopup = new Dialog({
            showCloseIcon: true, closeOnEscape: false, isModal: true,
            header: this.pdfViewer.localeObj.getConstant('GoToPage'), visible: false, buttons: [
                {
                    buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') },
                    click: this.GoToPageCancelClick.bind(this),
                },
                // tslint:disable-next-line:max-line-length
                {
                    buttonModel: { content: this.pdfViewer.localeObj.getConstant('Apply'), disabled: true, cssClass: 'e-pv-gotopage-apply-btn', isPrimary: true },
                    click: this.GoToPageApplyClick.bind(this),
                },
            ], close: this.closeGoToPagePopUp.bind(this),
        });
        if (this.pdfViewer.enableRtl) {
            this.goToPagePopup.enableRtl = true;
        }
        this.goToPagePopup.appendTo(popupElement);
        var goToPageTextBox = new NumericTextBox({ format: '##', showSpinButton: false });
        goToPageTextBox.appendTo(this.goToPageInput);
        this.goToPageInput.addEventListener('keyup', function () {
            // tslint:disable-next-line
            var inputValue = _this.goToPageInput.value;
            if (inputValue !== '' && parseFloat(inputValue) > 0 && (_this.pdfViewer.pageCount + 1) > parseFloat(inputValue)) {
                _this.EnableApplyButton();
            }
            else {
                _this.DisableApplyButton();
            }
        });
    };
    PdfViewerBase.prototype.closeGoToPagePopUp = function () {
        this.goToPageInput.value = '';
        this.DisableApplyButton();
    };
    PdfViewerBase.prototype.EnableApplyButton = function () {
        // tslint:disable-next-line
        var popupElements = document.getElementsByClassName('e-pv-gotopage-apply-btn')[0];
        popupElements.removeAttribute('disabled');
    };
    PdfViewerBase.prototype.DisableApplyButton = function () {
        // tslint:disable-next-line
        var popupElements = document.getElementsByClassName('e-pv-gotopage-apply-btn')[0];
        popupElements.setAttribute('disabled', true);
    };
    PdfViewerBase.prototype.GoToPageCancelClick = function () {
        this.goToPagePopup.hide();
    };
    PdfViewerBase.prototype.GoToPageApplyClick = function () {
        this.goToPagePopup.hide();
        // tslint:disable-next-line
        var pageNumber = this.goToPageInput.value;
        this.pdfViewer.navigation.goToPage(pageNumber);
        this.updateMobileScrollerPosition();
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateMobileScrollerPosition = function () {
        if (Browser.isDevice) {
            // tslint:disable-next-line
            var ratio = (this.viewerContainer.scrollHeight - this.viewerContainer.clientHeight) / (this.viewerContainer.clientHeight - 56);
            // tslint:disable-next-line
            var differenceRatio = (this.viewerContainer.scrollTop) / ratio;
            this.mobileScrollerContainer.style.top = (this.toolbarHeight + differenceRatio) + 'px';
        }
    };
    PdfViewerBase.prototype.createPasswordPopup = function () {
        var _this = this;
        // tslint:disable-next-line:max-line-length
        var popupElement = createElement('div', { id: this.pdfViewer.element.id + '_password_popup', className: 'e-pv-password-popup', attrs: { 'tabindex': '-1' } });
        this.promptElement = createElement('span', { id: this.pdfViewer.element.id + '_prompt', attrs: { 'tabindex': '-1' } });
        this.promptElement.textContent = this.pdfViewer.localeObj.getConstant('Enter Password');
        popupElement.appendChild(this.promptElement);
        var inputContainer = createElement('span', { className: 'e-input-group e-pv-password-input' });
        // tslint:disable-next-line:max-line-length
        this.passwordInput = createElement('input', { id: this.pdfViewer.element.id + '_password_input', className: 'e-input' });
        this.passwordInput.type = 'password';
        this.passwordInput.name = 'Required';
        inputContainer.appendChild(this.passwordInput);
        popupElement.appendChild(inputContainer);
        this.pageContainer.appendChild(popupElement);
        this.passwordPopup = new Dialog({
            showCloseIcon: true, closeOnEscape: false, isModal: true,
            header: this.pdfViewer.localeObj.getConstant('Password Protected'), visible: false,
            close: this.passwordCancel.bind(this), target: this.pdfViewer.element, beforeClose: function () {
                _this.passwordPopup.destroy();
                _this.getElement('_password_popup').remove();
                _this.passwordPopup = null;
                var waitingPopup = _this.getElement('_loadingIndicator');
                if (waitingPopup != null) {
                    hideSpinner(waitingPopup);
                }
            }
        });
        if (!Browser.isDevice) {
            this.passwordPopup.buttons = [
                {
                    buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true },
                    click: this.applyPassword.bind(this)
                },
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.passwordCancelClick.bind(this) }
            ];
        }
        else {
            this.passwordPopup.buttons = [
                { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel') }, click: this.passwordCancelClick.bind(this) },
                {
                    buttonModel: { content: this.pdfViewer.localeObj.getConstant('OK'), isPrimary: true },
                    click: this.applyPassword.bind(this)
                }
            ];
        }
        if (this.pdfViewer.enableRtl) {
            this.passwordPopup.enableRtl = true;
        }
        this.passwordPopup.appendTo(popupElement);
        this.passwordInput.addEventListener('keyup', function () {
            if (_this.passwordInput.value === '') {
                _this.passwordDialogReset();
            }
        });
        this.passwordInput.addEventListener('focus', function () {
            _this.passwordInput.parentElement.classList.add('e-input-focus');
        });
        this.passwordInput.addEventListener('blur', function () {
            _this.passwordInput.parentElement.classList.remove('e-input-focus');
        });
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.passwordCancel = function (args) {
        if (args.isInteraction) {
            this.clear(false);
            this.passwordDialogReset();
            this.passwordInput.value = '';
        }
        var waitingPopup = this.getElement('_loadingIndicator');
        if (waitingPopup !== null) {
            hideSpinner(waitingPopup);
        }
    };
    PdfViewerBase.prototype.passwordCancelClick = function () {
        this.clear(false);
        this.passwordDialogReset();
        this.passwordPopup.hide();
        var waitingPopup = this.getElement('_loadingIndicator');
        if (waitingPopup !== null) {
            hideSpinner(waitingPopup);
        }
    };
    PdfViewerBase.prototype.passwordDialogReset = function () {
        if (this.promptElement) {
            this.promptElement.classList.remove('e-pv-password-error');
            this.promptElement.textContent = this.pdfViewer.localeObj.getConstant('Enter Password');
            this.passwordInput.value = '';
        }
    };
    PdfViewerBase.prototype.applyPassword = function () {
        var password = this.passwordInput.value;
        if (password !== '') {
            this.pdfViewer.load(this.document, password);
        }
        this.focusViewerContainer();
    };
    PdfViewerBase.prototype.wireEvents = function () {
        var _this = this;
        this.viewerContainer.addEventListener('scroll', this.viewerContainerOnScroll, true);
        if (Browser.isDevice) {
            this.viewerContainer.addEventListener('touchmove', this.viewerContainerOnScroll, true);
        }
        this.viewerContainer.addEventListener('mousedown', this.viewerContainerOnMousedown);
        this.viewerContainer.addEventListener('mouseup', this.viewerContainerOnMouseup);
        this.viewerContainer.addEventListener('wheel', this.viewerContainerOnMouseWheel);
        this.viewerContainer.addEventListener('mousemove', this.viewerContainerOnMousemove);
        this.viewerContainer.addEventListener('mouseleave', this.viewerContainerOnMouseLeave);
        this.viewerContainer.addEventListener('mouseenter', this.viewerContainerOnMouseEnter);
        this.viewerContainer.addEventListener('mouseover', this.viewerContainerOnMouseOver);
        this.viewerContainer.addEventListener('click', this.viewerContainerOnClick);
        this.viewerContainer.addEventListener('dblclick', this.viewerContainerOnClick);
        this.viewerContainer.addEventListener('dragstart', this.viewerContainerOnDragStart);
        this.pdfViewer.element.addEventListener('keydown', this.viewerContainerOnKeyDown);
        window.addEventListener('mouseup', this.onWindowMouseUp);
        window.addEventListener('touchend', this.onWindowTouchEnd);
        this.unload = function () { return _this.unloadDocument(_this); };
        window.addEventListener('unload', this.unload);
        window.addEventListener('resize', this.onWindowResize);
        // tslint:disable-next-line:max-line-length
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Edge') !== -1 || navigator.userAgent.indexOf('Trident') !== -1) {
            this.viewerContainer.addEventListener('pointerdown', this.viewerContainerOnPointerDown);
            this.viewerContainer.addEventListener('pointermove', this.viewerContainerOnPointerMove);
            this.viewerContainer.addEventListener('pointerup', this.viewerContainerOnPointerEnd);
            this.viewerContainer.addEventListener('pointerleave', this.viewerContainerOnPointerEnd);
        }
        else {
            this.viewerContainer.addEventListener('touchstart', this.viewerContainerOnTouchStart);
            this.viewerContainer.addEventListener('touchmove', this.viewerContainerOnTouchMove);
            this.viewerContainer.addEventListener('touchend', this.viewerContainerOnTouchEnd);
            this.viewerContainer.addEventListener('touchleave', this.viewerContainerOnTouchEnd);
            this.viewerContainer.addEventListener('touchcancel', this.viewerContainerOnTouchEnd);
        }
    };
    PdfViewerBase.prototype.unWireEvents = function () {
        this.viewerContainer.removeEventListener('scroll', this.viewerContainerOnScroll, true);
        if (Browser.isDevice) {
            this.viewerContainer.removeEventListener('touchmove', this.viewerContainerOnScroll, true);
        }
        this.viewerContainer.removeEventListener('mousedown', this.viewerContainerOnMousedown);
        this.viewerContainer.removeEventListener('mouseup', this.viewerContainerOnMouseup);
        this.viewerContainer.removeEventListener('wheel', this.viewerContainerOnMouseWheel);
        this.viewerContainer.removeEventListener('mousemove', this.viewerContainerOnMousemove);
        this.viewerContainer.removeEventListener('mouseleave', this.viewerContainerOnMouseLeave);
        this.viewerContainer.removeEventListener('mouseenter', this.viewerContainerOnMouseEnter);
        this.viewerContainer.removeEventListener('mouseover', this.viewerContainerOnMouseOver);
        this.viewerContainer.removeEventListener('click', this.viewerContainerOnClick);
        this.viewerContainer.removeEventListener('dragstart', this.viewerContainerOnDragStart);
        this.viewerContainer.removeEventListener('contextmenu', this.viewerContainerOnContextMenuClick);
        this.pdfViewer.element.removeEventListener('keydown', this.viewerContainerOnKeyDown);
        window.removeEventListener('mouseup', this.onWindowMouseUp);
        window.removeEventListener('unload', this.unload);
        window.removeEventListener('resize', this.onWindowResize);
        // tslint:disable-next-line:max-line-length
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Edge') !== -1 || navigator.userAgent.indexOf('Trident') !== -1) {
            this.viewerContainer.removeEventListener('pointerdown', this.viewerContainerOnPointerDown);
            this.viewerContainer.removeEventListener('pointermove', this.viewerContainerOnPointerMove);
            this.viewerContainer.removeEventListener('pointerup', this.viewerContainerOnPointerEnd);
            this.viewerContainer.removeEventListener('pointerleave', this.viewerContainerOnPointerEnd);
        }
        else {
            this.viewerContainer.removeEventListener('touchstart', this.viewerContainerOnTouchStart);
            this.viewerContainer.removeEventListener('touchmove', this.viewerContainerOnTouchMove);
            this.viewerContainer.removeEventListener('touchend', this.viewerContainerOnTouchEnd);
            this.viewerContainer.removeEventListener('touchleave', this.viewerContainerOnTouchEnd);
            this.viewerContainer.removeEventListener('touchcancel', this.viewerContainerOnTouchEnd);
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateZoomValue = function () {
        if (this.pdfViewer.magnificationModule) {
            if (this.pdfViewer.magnificationModule.isAutoZoom) {
                this.pdfViewer.magnificationModule.fitToAuto();
            }
            else if (this.pdfViewer.magnificationModule.fitType === 'fitToWidth') {
                this.pdfViewer.magnificationModule.fitToWidth();
            }
        }
        for (var i = 0; i < this.pageCount; i++) {
            this.applyLeftPosition(i);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.updateFreeTextProperties = function (annotation) {
        if (this.pdfViewer.enableShapeLabel) {
            if (this.pdfViewer.shapeLabelSettings.fillColor) {
                annotation.labelFillColor = this.pdfViewer.shapeLabelSettings.fillColor;
            }
            if (this.pdfViewer.shapeLabelSettings.fontColor) {
                annotation.fontColor = this.pdfViewer.shapeLabelSettings.fontColor;
            }
            if (this.pdfViewer.shapeLabelSettings.fontSize) {
                annotation.fontSize = this.pdfViewer.shapeLabelSettings.fontSize;
            }
            if (this.pdfViewer.shapeLabelSettings.fontFamily) {
                annotation.fontFamily = this.pdfViewer.shapeLabelSettings.fontFamily;
            }
            if (this.pdfViewer.shapeLabelSettings.opacity) {
                annotation.labelOpacity = this.pdfViewer.shapeLabelSettings.opacity;
            }
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.initiatePanning = function () {
        this.isPanMode = true;
        this.textLayer.modifyTextCursor(false);
        this.disableTextSelectionMode();
        if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
            this.pdfViewer.toolbar.annotationToolbarModule.deselectAllItems();
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.initiateTextSelectMode = function () {
        this.isPanMode = false;
        this.viewerContainer.style.cursor = 'auto';
        if (this.pdfViewer.textSelectionModule) {
            this.textLayer.modifyTextCursor(true);
            this.pdfViewer.textSelectionModule.enableTextSelectionMode();
        }
        if (!Browser.isDevice) {
            this.enableAnnotationAddTools(true);
        }
    };
    PdfViewerBase.prototype.enableAnnotationAddTools = function (isEnable) {
        if (this.pdfViewer.toolbarModule) {
            if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
                this.pdfViewer.toolbarModule.annotationToolbarModule.enableAnnotationAddTools(isEnable);
            }
        }
    };
    PdfViewerBase.prototype.applySelection = function () {
        if (window.getSelection().anchorNode !== null) {
            this.pdfViewer.textSelectionModule.applySpanForSelection();
        }
        this.isViewerContainerDoubleClick = false;
    };
    PdfViewerBase.prototype.handleTaps = function (touchPoints) {
        var _this = this;
        this.singleTapTimer = setTimeout(function () { _this.onSingleTap(touchPoints); }, 300);
        this.tapCount++;
        if (this.pdfViewer.enablePinchZoom) {
            // tslint:disable-next-line
            var timer = setTimeout(function () { _this.onDoubleTap(touchPoints); }, 200);
        }
        if (this.tapCount > 2) {
            this.tapCount = 0;
        }
    };
    PdfViewerBase.prototype.handleTextBoxTaps = function (touchPoints) {
        var _this = this;
        setTimeout(function () { _this.inputTapCount = 0; }, 300);
        this.inputTapCount++;
        // tslint:disable-next-line
        var timer = setTimeout(function () { _this.onTextBoxDoubleTap(touchPoints); }, 200);
        if (this.inputTapCount > 2) {
            this.inputTapCount = 0;
        }
    };
    PdfViewerBase.prototype.onTextBoxDoubleTap = function (touches) {
        var target = touches[0].target;
        if (this.inputTapCount === 2) {
            if (this.pdfViewer.selectedItems.annotations.length !== 0) {
                if (this.isFreeTextAnnotation(this.pdfViewer.selectedItems.annotations) === true) {
                    var elmtPosition = {};
                    elmtPosition.x = this.pdfViewer.selectedItems.annotations[0].bounds.x;
                    elmtPosition.y = this.pdfViewer.selectedItems.annotations[0].bounds.y;
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotation.freeTextAnnotationModule.addInuptElemet(elmtPosition, this.pdfViewer.selectedItems.annotations[0]);
                }
                else if (this.pdfViewer.selectedItems.annotations[0].enableShapeLabel === true) {
                    var elmtPosition = {};
                    elmtPosition.x = this.pdfViewer.selectedItems.annotations[0].bounds.x;
                    elmtPosition.y = this.pdfViewer.selectedItems.annotations[0].bounds.y;
                    this.pdfViewer.annotation.inputElementModule.editLabel(elmtPosition, this.pdfViewer.selectedItems.annotations[0]);
                }
            }
        }
    };
    PdfViewerBase.prototype.onSingleTap = function (touches) {
        var target = touches[0].target;
        var isFormfields = false;
        if (target && (target.classList.contains('e-pdfviewer-formFields')
            || target.classList.contains('e-pdfviewer-ListBox') || target.classList.contains('e-pdfviewer-signatureformFields'))) {
            isFormfields = true;
        }
        if (!this.isLongTouchPropagated && !this.navigationPane.isNavigationToolbarVisible && !isFormfields) {
            if (this.pdfViewer.toolbarModule) {
                if ((this.touchClientX >= touches[0].clientX - 10) && (this.touchClientX <= touches[0].clientX + 10) &&
                    (this.touchClientY >= touches[0].clientY - 10) && (this.touchClientY <= touches[0].clientY + 10)) {
                    if (!this.isTapHidden) {
                        this.viewerContainer.scrollTop -= this.getElement('_toolbarContainer').clientHeight * this.getZoomFactor();
                        this.viewerContainer.style.height = this.updatePageHeight(this.pdfViewer.element.getBoundingClientRect().height, 0);
                        if (this.pdfViewer.toolbar.moreDropDown) {
                            var dropDown = this.getElement('_more_option-popup');
                            if (dropDown.firstElementChild) {
                                dropDown.classList.remove('e-popup-open');
                                dropDown.classList.add('e-popup-close');
                                dropDown.removeChild(dropDown.firstElementChild);
                            }
                        }
                    }
                    else {
                        this.viewerContainer.scrollTop += this.getElement('_toolbarContainer').clientHeight * this.getZoomFactor();
                        // tslint:disable-next-line:max-line-length
                        this.viewerContainer.style.height = this.updatePageHeight(this.pdfViewer.element.getBoundingClientRect().height, 56);
                    }
                    if (this.isTapHidden && Browser.isDevice) {
                        this.mobileScrollerContainer.style.display = '';
                        this.updateMobileScrollerPosition();
                    }
                    else if (Browser.isDevice && this.getSelectTextMarkupCurrentPage() == null) {
                        this.mobileScrollerContainer.style.display = 'none';
                    }
                    if (this.getSelectTextMarkupCurrentPage() == null) {
                        this.pdfViewer.toolbarModule.showToolbar(this.isTapHidden);
                        this.isTapHidden = !this.isTapHidden;
                    }
                }
                this.tapCount = 0;
            }
        }
    };
    PdfViewerBase.prototype.onDoubleTap = function (touches) {
        var target = touches[0].target;
        var isFormfields = false;
        if (target && (target.classList.contains('e-pdfviewer-formFields')
            || target.classList.contains('e-pdfviewer-ListBox') || target.classList.contains('e-pdfviewer-signatureformFields'))) {
            isFormfields = true;
        }
        if (this.tapCount === 2 && !isFormfields) {
            if (Browser.isDevice) {
                this.mobileScrollerContainer.style.display = 'none';
            }
            this.tapCount = 0;
            if ((this.touchClientX >= touches[0].clientX - 10) && (this.touchClientX <= touches[0].clientX + 10) &&
                (this.touchClientY >= touches[0].clientY - 10) && (this.touchClientY <= touches[0].clientY + 10)) {
                if (this.pdfViewer.magnification) {
                    this.pdfViewer.magnification.onDoubleTapMagnification();
                }
                this.viewerContainer.style.height = this.updatePageHeight(this.pdfViewer.element.getBoundingClientRect().height, 0);
                this.isTapHidden = false;
                clearTimeout(this.singleTapTimer);
            }
        }
    };
    PdfViewerBase.prototype.preventTouchEvent = function (event) {
        if (this.pdfViewer.textSelectionModule) {
            // tslint:disable-next-line:max-line-length
            if (!this.isPanMode && this.pdfViewer.enableTextSelection && !this.isTextSelectionDisabled && this.getSelectTextMarkupCurrentPage() == null) {
                if (!(this.isWebkitMobile && Browser.isDevice)) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    };
    PdfViewerBase.prototype.renderStampAnnotation = function (event) {
        if (this.pdfViewer.annotation) {
            var zoomFactor = this.getZoomFactor();
            var pageIndex = this.pdfViewer.annotation.getEventPageNumber(event);
            var pageDiv = this.getElement('_pageDiv_' + pageIndex);
            if (this.pdfViewer.enableStampAnnotations) {
                var stampModule = this.pdfViewer.annotationModule.stampAnnotationModule;
                if (stampModule && stampModule.isStampAnnotSelected) {
                    if (pageDiv) {
                        var pageCurrentRect = pageDiv.getBoundingClientRect();
                        // tslint:disable-next-line:max-line-length
                        stampModule.renderStamp((event.changedTouches[0].clientX - pageCurrentRect.left) / zoomFactor, (event.changedTouches[0].clientY - pageCurrentRect.top) / zoomFactor, null, null, pageIndex, null, null, null, null);
                        stampModule.isStampAnnotSelected = false;
                    }
                }
                this.pdfViewer.annotation.onAnnotationMouseDown();
            }
            if (this.pdfViewer.enableHandwrittenSignature && this.isSignatureAdded && pageDiv) {
                var pageCurrentRect = pageDiv.getBoundingClientRect();
                // tslint:disable-next-line:max-line-length
                this.signatureModule.renderSignature((event.changedTouches[0].clientX - pageCurrentRect.left) / zoomFactor, (event.changedTouches[0].clientY - pageCurrentRect.top) / zoomFactor);
                this.isSignatureAdded = false;
            }
            if (event.touches.length === 1 && this.isTextMarkupAnnotationModule() && !this.getPopupNoteVisibleStatus()) {
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.onTextMarkupAnnotationTouchEnd(event);
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.initPageDiv = function (pageValues) {
        if (this.pdfViewer.toolbarModule) {
            this.pdfViewer.toolbarModule.updateTotalPage();
            if (Browser.isDevice && this.mobiletotalPageContainer) {
                this.mobiletotalPageContainer.innerHTML = this.pageCount.toString();
                this.pageNoContainer.innerHTML = '(1-' + this.pageCount.toString() + ')';
            }
        }
        if (this.pageCount > 0) {
            var topValue = 0;
            var pageLimit = 0;
            this.isMixedSizeDocument = false;
            if (this.pageCount > 100) {
                // to render 100 pages intially.
                pageLimit = 100;
                this.pageLimit = pageLimit;
            }
            else {
                pageLimit = this.pageCount;
            }
            var isPortrait = false;
            var isLandscape = false;
            for (var i = 0; i < pageLimit; i++) {
                var pageSize = pageValues.pageSizes[i].split(',');
                if (pageValues.pageSizes[i - 1] !== null && i !== 0) {
                    var previousPageHeight = pageValues.pageSizes[i - 1].split(',');
                    topValue = this.pageGap + parseFloat(previousPageHeight[1]) + topValue;
                }
                else {
                    topValue = this.pageGap;
                }
                var size = { width: parseFloat(pageSize[0]), height: parseFloat(pageSize[1]), top: topValue };
                this.pageSize.push(size);
                if (this.pageSize[i].height > this.pageSize[i].width) {
                    isPortrait = true;
                }
                if (this.pageSize[i].width > this.pageSize[i].height) {
                    isLandscape = true;
                }
            }
            if (isPortrait && isLandscape) {
                this.isMixedSizeDocument = true;
            }
            var limit = this.pageCount < 10 ? this.pageCount : 10;
            for (var i = 0; i < limit; i++) {
                this.renderPageContainer(i, this.getPageWidth(i), this.getPageHeight(i), this.getPageTop(i));
            }
            // tslint:disable-next-line:max-line-length
            this.pageContainer.style.height = this.getPageTop(this.pageSize.length - 1) + this.getPageHeight(this.pageSize.length - 1) + 'px';
            this.pageContainer.style.position = 'relative';
            if (this.pageLimit === 100) {
                var pageDiv = this.getElement('_pageDiv_' + this.pageLimit);
                if (pageDiv === null && this.pageLimit < this.pageCount) {
                    Promise.all([this.renderPagesVirtually()]);
                }
            }
        }
    };
    PdfViewerBase.prototype.renderElementsVirtualScroll = function (pageNumber) {
        var pageValue = pageNumber + 1;
        if (pageValue > this.pageCount) {
            pageValue = this.pageCount;
        }
        for (var i = pageNumber - 1; i <= pageValue; i++) {
            if (i !== -1) {
                this.renderPageElement(i);
            }
        }
        var lowerPageValue = pageNumber - 3;
        if (lowerPageValue < 0) {
            lowerPageValue = 0;
        }
        for (var i = pageNumber - 1; i >= lowerPageValue; i--) {
            if (i !== -1) {
                this.renderPageElement(i);
            }
        }
        for (var j = 0; j < this.pageCount; j++) {
            if (!((lowerPageValue <= j) && (j <= pageValue))) {
                var pageDiv = this.getElement('_pageDiv_' + j);
                var pageCanvas = this.getElement('_pageCanvas_' + j);
                var textLayer = this.getElement('_textLayer_' + j);
                if (pageCanvas) {
                    pageCanvas.parentNode.removeChild(pageCanvas);
                    if (textLayer) {
                        if (this.pdfViewer.textSelectionModule && textLayer.childNodes.length !== 0 && !this.isTextSelectionDisabled) {
                            this.pdfViewer.textSelectionModule.maintainSelectionOnScroll(j, true);
                        }
                        textLayer.parentNode.removeChild(textLayer);
                    }
                    var indexInArray = this.renderedPagesList.indexOf(j);
                    if (indexInArray !== -1) {
                        this.renderedPagesList.splice(indexInArray, 1);
                    }
                }
                if (pageDiv) {
                    pageDiv.parentNode.removeChild(pageDiv);
                    var indexInArray = this.renderedPagesList.indexOf(j);
                    if (indexInArray !== -1) {
                        this.renderedPagesList.splice(indexInArray, 1);
                    }
                }
            }
        }
    };
    PdfViewerBase.prototype.renderPageElement = function (i) {
        var pageDiv = this.getElement('_pageDiv_' + i);
        var canvas = this.getElement('_pageCanvas_' + i);
        if (canvas == null && pageDiv == null && i < this.pageSize.length) {
            // tslint:disable-next-line
            this.renderPageContainer(i, this.getPageWidth(i), this.getPageHeight(i), this.getPageTop(i));
        }
    };
    PdfViewerBase.prototype.renderPagesVirtually = function () {
        return __awaiter(this, void 0, void 0, function () {
            var proxy;
            var _this = this;
            return __generator(this, function (_a) {
                proxy = this;
                setTimeout(function () { _this.initiateRenderPagesVirtually(proxy); }, 500);
                return [2 /*return*/];
            });
        });
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.initiateRenderPagesVirtually = function (proxy) {
        var jsonObject = { hashId: proxy.hashId, isCompletePageSizeNotReceived: true, action: 'VirtualLoad', elementId: proxy.pdfViewer.element.id, uniqueId: proxy.documentId };
        if (proxy.jsonDocumentId) {
            // tslint:disable-next-line
            jsonObject.documentId = proxy.jsonDocumentId;
        }
        this.virtualLoadRequestHandler = new AjaxHandler(this.pdfViewer);
        this.virtualLoadRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.load;
        this.virtualLoadRequestHandler.responseType = 'json';
        this.virtualLoadRequestHandler.mode = true;
        this.virtualLoadRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        this.virtualLoadRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                        proxy.onControlError(500, data, 'VirtualLoad');
                    }
                }
            }
            if (data) {
                while (typeof data !== 'object') {
                    data = JSON.parse(data);
                }
                if (proxy.documentId === data.uniqueId) {
                    // tslint:disable-next-line
                    var pageValues = data;
                    var topValue = proxy.pageSize[proxy.pageLimit - 1].top;
                    for (var i = proxy.pageLimit; i < proxy.pageCount; i++) {
                        var pageSize = pageValues.pageSizes[i].split(',');
                        if (proxy.pageSize[i - 1] !== null && i !== 0) {
                            var previousPageHeight = proxy.pageSize[i - 1].height;
                            topValue = proxy.pageGap + parseFloat(previousPageHeight) + topValue;
                        }
                        var size = { width: parseFloat(pageSize[0]), height: parseFloat(pageSize[1]), top: topValue };
                        proxy.pageSize.push(size);
                    }
                    // tslint:disable-next-line:max-line-length
                    proxy.pageContainer.style.height = proxy.getPageTop(proxy.pageSize.length - 1) + proxy.getPageHeight(proxy.pageSize.length - 1) + 'px';
                }
            }
        };
        // tslint:disable-next-line
        this.virtualLoadRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText);
        };
        // tslint:disable-next-line
        this.virtualLoadRequestHandler.onError = function (result) {
            proxy.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText);
        };
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.tileRenderPage = function (data, pageIndex) {
        var _this = this;
        if (data) {
            var pageWidth_1 = this.getPageWidth(pageIndex);
            var pageHeight_1 = this.getPageHeight(pageIndex);
            // tslint:disable-next-line:max-line-length
            var canvas = this.getElement('_pageCanvas_' + pageIndex);
            var pageDiv = this.getElement('_pageDiv_' + pageIndex);
            if (pageDiv) {
                pageDiv.style.width = pageWidth_1 + 'px';
                pageDiv.style.height = pageHeight_1 + 'px';
                pageDiv.style.top = this.getPageTop(pageIndex) + 'px';
                if (this.pdfViewer.enableRtl) {
                    pageDiv.style.right = this.updateLeftPosition(pageIndex) + 'px';
                }
                else {
                    pageDiv.style.left = this.updateLeftPosition(pageIndex) + 'px';
                }
            }
            if (canvas) {
                canvas.style.backgroundColor = '#fff';
                canvas.style.width = pageWidth_1 + 'px';
                canvas.style.height = pageHeight_1 + 'px';
                // tslint:disable-next-line
                var imageData = data['image'];
                // tslint:disable-next-line
                var matrix_1 = data['transformationMatrix'];
                if (imageData) {
                    var image_1 = new Image();
                    image_1.onload = function () {
                        var pagecanvas = _this.getElement('_pageCanvas_' + pageIndex);
                        if (pagecanvas) {
                            // tslint:disable-next-line
                            if (!isNaN(parseFloat(pagecanvas.style.width)) && parseInt(pagecanvas.width.toString()) !== parseInt(pagecanvas.style.width)) {
                                pagecanvas.style.width = pageWidth_1 + 'px';
                                pagecanvas.style.height = pageHeight_1 + 'px';
                                pagecanvas.height = pageHeight_1;
                                pagecanvas.width = pageWidth_1;
                            }
                            var context = pagecanvas.getContext('2d');
                            // tslint:disable-next-line
                            context.setTransform(matrix_1.Elements[0], matrix_1.Elements[1], matrix_1.Elements[2], matrix_1.Elements[3], matrix_1.Elements[4], matrix_1.Elements[5]);
                            context.drawImage(image_1, 0, 0);
                            _this.showPageLoadingIndicator(pageIndex, false);
                            if (isNaN(data.tileX) && isNaN(data.tileY)) {
                                if (pageIndex === 0 && _this.isDocumentLoaded) {
                                    _this.isInitialLoaded = true;
                                    _this.pdfViewer.fireDocumentLoad();
                                    _this.isDocumentLoaded = false;
                                }
                                if (_this.pdfViewer.magnificationModule) {
                                    _this.pdfViewer.magnificationModule.rerenderCountIncrement();
                                }
                            }
                            image_1.onload = null;
                            image_1 = null;
                        }
                    };
                    image_1.src = imageData;
                }
                if (isNaN(data.tileX) && isNaN(data.tileY)) {
                    this.onPageRender(data, pageIndex, pageDiv);
                }
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.renderPage = function (data, pageIndex) {
        var _this = this;
        if (data) {
            var pageWidth_2 = this.getPageWidth(pageIndex);
            var pageHeight_2 = this.getPageHeight(pageIndex);
            // tslint:disable-next-line:max-line-length
            var canvas_1 = this.getElement('_pageCanvas_' + pageIndex);
            var pageDiv = this.getElement('_pageDiv_' + pageIndex);
            if (pageDiv) {
                pageDiv.style.width = pageWidth_2 + 'px';
                pageDiv.style.height = pageHeight_2 + 'px';
                pageDiv.style.top = this.getPageTop(pageIndex) + 'px';
                if (this.pdfViewer.enableRtl) {
                    pageDiv.style.right = this.updateLeftPosition(pageIndex) + 'px';
                }
                else {
                    pageDiv.style.left = this.updateLeftPosition(pageIndex) + 'px';
                }
            }
            if (canvas_1) {
                canvas_1.style.width = pageWidth_2 + 'px';
                canvas_1.style.height = pageHeight_2 + 'px';
                var context_1 = canvas_1.getContext('2d');
                // tslint:disable-next-line
                var imageData = data['image'];
                // tslint:disable-next-line
                var matrix_2 = data['transformationMatrix'];
                if (imageData) {
                    var image_2 = new Image();
                    image_2.onload = function () {
                        var scaleFactor = (!isNullOrUndefined(data.scaleFactor)) ? data.scaleFactor : 1.5;
                        // tslint:disable-next-line
                        if (parseInt((pageWidth_2 * scaleFactor).toString()) === image_2.width) {
                            if (!isNaN(parseFloat(canvas_1.style.width))) {
                                canvas_1.style.width = pageWidth_2 + 'px';
                                canvas_1.style.height = pageHeight_2 + 'px';
                                canvas_1.height = pageHeight_2 * window.devicePixelRatio;
                                canvas_1.width = pageWidth_2 * window.devicePixelRatio;
                            }
                            // tslint:disable-next-line
                            context_1.setTransform(matrix_2.Elements[0], matrix_2.Elements[1], matrix_2.Elements[2], matrix_2.Elements[3], matrix_2.Elements[4], matrix_2.Elements[5]);
                            context_1.drawImage(image_2, 0, 0, canvas_1.width, canvas_1.height);
                            _this.showPageLoadingIndicator(pageIndex, false);
                            if (pageIndex === 0 && _this.isDocumentLoaded) {
                                _this.isInitialLoaded = true;
                                _this.pdfViewer.fireDocumentLoad();
                                _this.isDocumentLoaded = false;
                            }
                            if (_this.pdfViewer.magnificationModule) {
                                _this.pdfViewer.magnificationModule.rerenderCountIncrement();
                            }
                        }
                        image_2.onload = null;
                        image_2 = null;
                    };
                    image_2.src = imageData;
                    if (this.pdfViewer.magnificationModule) {
                        this.pdfViewer.magnificationModule.pushImageObjects(image_2);
                    }
                }
                this.onPageRender(data, pageIndex, pageDiv);
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.onPageRender = function (data, pageIndex, pageDiv) {
        var aElement = pageDiv.getElementsByTagName('a');
        if (aElement.length !== 0) {
            for (var index = aElement.length - 1; index >= 0; index--) {
                aElement[index].parentNode.removeChild(aElement[index]);
            }
        }
        this.renderTextContent(data, pageIndex);
        if (this.pdfViewer.formFieldsModule) {
            this.pdfViewer.formFieldsModule.renderFormFields(pageIndex);
        }
        if (this.pdfViewer.enableHyperlink && this.pdfViewer.linkAnnotationModule) {
            this.pdfViewer.linkAnnotationModule.renderHyperlinkContent(data, pageIndex);
        }
        if (this.pdfViewer.textSelectionModule && !this.isTextSelectionDisabled) {
            this.pdfViewer.textSelectionModule.applySelectionRangeOnScroll(pageIndex);
        }
        if (this.isAnnotationCollectionRemoved) {
            data.shapeAnnotation = [];
            data.measureShapeAnnotation = [];
            data.textMarkupAnnotation = [];
            data.freeTextAnnotation = [];
            data.stampAnnotations = [];
            data.stickyNotesAnnotation = [];
        }
        if (this.isTextMarkupAnnotationModule() || this.isShapeBasedAnnotationsEnabled()) {
            if (this.isStampAnnotationModule()) {
                // tslint:disable-next-line
                var stampData = data['stampAnnotations'];
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.stampAnnotationModule.renderStampAnnotations(stampData, pageIndex);
            }
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.annotationModule.renderAnnotations(pageIndex, data.shapeAnnotation, data.measureShapeAnnotation, data.textMarkupAnnotation);
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderStickyNotesAnnotations(data.stickyNotesAnnotation, pageIndex);
        }
        if (this.pdfViewer.textSearchModule) {
            if (this.pdfViewer.textSearchModule.isTextSearch) {
                this.pdfViewer.textSearchModule.highlightOtherOccurrences(pageIndex);
            }
        }
        if (this.isImportAction) {
            var isAnnotationAdded = false;
            for (var i = 0; i < this.annotationPageList.length; i++) {
                if (this.annotationPageList[i] === pageIndex) {
                    isAnnotationAdded = true;
                }
            }
            if (!isAnnotationAdded) {
                if (this.importedAnnotation) {
                    this.drawPageAnnotations(this.importedAnnotation, pageIndex, true);
                    this.annotationPageList[this.annotationPageList.length] = pageIndex;
                }
            }
        }
        if (this.isShapeBasedAnnotationsEnabled()) {
            var canvas1 = this.getElement('_annotationCanvas_' + pageIndex);
            var commonStyle = 'position:absolute;top:0px;left:0px;overflow:hidden;pointer-events:none;';
            var bounds = canvas1.getBoundingClientRect();
            renderAdornerLayer(bounds, commonStyle, canvas1, pageIndex, this.pdfViewer);
            this.pdfViewer.renderSelector(pageIndex);
        }
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.selectCommentsAnnotation(pageIndex);
        }
        if (this.isFreeTextAnnotationModule() && data.freeTextAnnotation) {
            this.pdfViewer.annotationModule.freeTextAnnotationModule.renderFreeTextAnnotations(data.freeTextAnnotation, pageIndex);
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.renderTextContent = function (data, pageIndex) {
        // tslint:disable-next-line
        var texts = data['textContent'];
        // tslint:disable-next-line
        var bounds = data['textBounds'];
        // tslint:disable-next-line
        var rotation = data['rotation'];
        var textLayer = this.getElement('_textLayer_' + pageIndex);
        if (!textLayer) {
            // tslint:disable-next-line:max-line-length
            textLayer = this.textLayer.addTextLayer(pageIndex, this.getPageWidth(pageIndex), this.getPageHeight(pageIndex), this.getElement('_pageDiv_' + pageIndex));
        }
        if (textLayer && texts && bounds) {
            if (textLayer.childNodes.length === 0) {
                this.textLayer.renderTextContents(pageIndex, texts, bounds, rotation);
            }
            else {
                this.textLayer.resizeTextContents(pageIndex, texts, bounds, rotation);
            }
        }
    };
    PdfViewerBase.prototype.renderPageContainer = function (pageNumber, pageWidth, pageHeight, topValue) {
        // tslint:disable-next-line:max-line-length
        var pageDiv = createElement('div', { id: this.pdfViewer.element.id + '_pageDiv_' + pageNumber, className: 'e-pv-page-div', attrs: { 'tabindex': '0' } });
        pageDiv.style.width = pageWidth + 'px';
        pageDiv.style.height = pageHeight + 'px';
        if (this.pdfViewer.enableRtl) {
            pageDiv.style.right = this.updateLeftPosition(pageNumber) + 'px';
        }
        else {
            pageDiv.style.left = this.updateLeftPosition(pageNumber) + 'px';
        }
        pageDiv.style.top = topValue + 'px';
        this.pageContainer.appendChild(pageDiv);
        this.pageContainer.style.width = this.viewerContainer.clientWidth + 'px';
        this.createWaitingPopup(pageNumber);
        this.orderPageDivElements(pageDiv, pageNumber);
        this.renderPageCanvas(pageDiv, pageWidth, pageHeight, pageNumber, 'block');
    };
    PdfViewerBase.prototype.orderPageDivElements = function (pageDiv, pageIndex) {
        var nextElement = this.getElement('_pageDiv_' + (pageIndex + 1));
        if (nextElement) {
            this.pageContainer.insertBefore(pageDiv, nextElement);
        }
        else {
            this.pageContainer.appendChild(pageDiv);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    PdfViewerBase.prototype.renderPageCanvas = function (pageDiv, pageWidth, pageHeight, pageNumber, displayMode) {
        var pageCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_pageCanvas_' + pageNumber, className: 'e-pv-page-canvas' });
        pageCanvas.width = pageWidth;
        pageCanvas.height = pageHeight;
        pageCanvas.style.display = displayMode;
        pageDiv.appendChild(pageCanvas);
        this.textLayer.addTextLayer(pageNumber, pageWidth, pageHeight, pageDiv);
        if (this.pdfViewer.annotation) {
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.annotationModule.createAnnotationLayer(pageDiv, pageWidth, pageHeight, pageNumber, displayMode);
        }
        return pageCanvas;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.updateLeftPosition = function (pageIndex) {
        var leftPosition;
        var width = this.viewerContainer.getBoundingClientRect().width;
        if (width === 0) {
            width = parseFloat(this.pdfViewer.width.toString());
        }
        // tslint:disable-next-line:max-line-length
        leftPosition = (width - this.getPageWidth(pageIndex)) / 2;
        var isLandscape = false;
        if (this.pageSize[pageIndex].width > this.pageSize[pageIndex].height) {
            isLandscape = true;
        }
        // tslint:disable-next-line:max-line-length
        if (leftPosition < 0 || (this.pdfViewer.magnificationModule ? ((this.pdfViewer.magnificationModule.isAutoZoom && this.getZoomFactor() < 1) || this.pdfViewer.magnificationModule.fitType === 'fitToWidth') : false)) {
            var leftValue = leftPosition;
            leftPosition = this.pageLeft;
            if (!isLandscape && this.isMixedSizeDocument) {
                leftPosition = leftValue;
            }
        }
        return leftPosition;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.applyLeftPosition = function (pageIndex) {
        var leftPosition;
        if (this.pageSize[pageIndex]) {
            // tslint:disable-next-line:max-line-length
            leftPosition = (this.viewerContainer.getBoundingClientRect().width - this.pageSize[pageIndex].width * this.getZoomFactor()) / 2;
            var isLandscape = false;
            if (this.pageSize[pageIndex].width > this.pageSize[pageIndex].height) {
                isLandscape = true;
            }
            // tslint:disable-next-line:max-line-length
            if (leftPosition < 0 || (this.pdfViewer.magnificationModule ? ((this.pdfViewer.magnificationModule.isAutoZoom && this.getZoomFactor() < 1) || this.pdfViewer.magnificationModule.fitType === 'fitToWidth') : false)) {
                var leftValue = leftPosition;
                leftPosition = this.pageLeft;
                // tslint:disable-next-line:max-line-length
                if (!isLandscape && this.isMixedSizeDocument) {
                    leftPosition = leftValue;
                }
            }
            // tslint:disable-next-line:max-line-length
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            if (pageDiv) {
                if (!this.pdfViewer.enableRtl) {
                    pageDiv.style.left = leftPosition + 'px';
                }
                else {
                    pageDiv.style.right = leftPosition + 'px';
                }
            }
        }
    };
    PdfViewerBase.prototype.updatePageHeight = function (viewerHeight, toolbarHeight) {
        return ((viewerHeight - toolbarHeight) / viewerHeight) * 100 + '%';
    };
    PdfViewerBase.prototype.initiatePageViewScrollChanged = function () {
        if (this.scrollHoldTimer) {
            clearTimeout(this.scrollHoldTimer);
        }
        this.scrollHoldTimer = null;
        if ((this.scrollPosition * this.getZoomFactor()) !== this.viewerContainer.scrollTop) {
            this.scrollPosition = this.viewerContainer.scrollTop;
            this.pageViewScrollChanged(this.currentPageNumber);
        }
    };
    PdfViewerBase.prototype.renderCountIncrement = function () {
        if (this.pdfViewer.magnificationModule) {
            this.pdfViewer.magnificationModule.renderCountIncrement();
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.pageViewScrollChanged = function (currentPageNumber) {
        this.reRenderedCount = 0;
        var currentPageIndex = currentPageNumber - 1;
        if (currentPageNumber !== this.previousPage && currentPageNumber <= this.pageCount) {
            if (this.renderedPagesList.indexOf(currentPageIndex) === -1 && !this.getMagnified()) {
                this.createRequestForRender(currentPageIndex);
                this.renderCountIncrement();
            }
        }
        if (!(this.getMagnified() || this.getPagesPinchZoomed())) {
            var previous = currentPageIndex - 1;
            var canvas = this.getElement('_pageCanvas_' + previous);
            if (canvas !== null) {
                if (this.renderedPagesList.indexOf(previous) === -1 && !this.getMagnified()) {
                    this.createRequestForRender(previous);
                    this.renderCountIncrement();
                }
            }
            var next = currentPageIndex + 1;
            if (next < this.pageCount) {
                if (this.renderedPagesList.indexOf(next) === -1 && !this.getMagnified()) {
                    this.createRequestForRender(next);
                    var pageHeight = this.getPageHeight(next);
                    this.renderCountIncrement();
                    var pageNumber = next + 1;
                    if (pageNumber < this.pageCount) {
                        this.createRequestForRender(pageNumber);
                        pageHeight = this.getPageHeight(pageNumber);
                        this.renderCountIncrement();
                        next = next + 1;
                    }
                    while (this.viewerContainer.clientHeight > pageHeight) {
                        next = next + 1;
                        if (next < this.pageCount) {
                            this.renderPageElement(next);
                            this.createRequestForRender(next);
                            pageHeight += this.getPageHeight(next);
                            this.renderCountIncrement();
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        }
    };
    PdfViewerBase.prototype.downloadDocument = function (blobUrl) {
        blobUrl = URL.createObjectURL(blobUrl);
        var anchorElement = createElement('a');
        if (anchorElement.click) {
            anchorElement.href = blobUrl;
            anchorElement.target = '_parent';
            if ('download' in anchorElement) {
                anchorElement.download = this.pdfViewer.fileName;
            }
            (document.body || document.documentElement).appendChild(anchorElement);
            anchorElement.click();
            anchorElement.parentNode.removeChild(anchorElement);
        }
        else {
            if (window.top === window &&
                blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
                blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
            }
            window.open(blobUrl, '_parent');
        }
    };
    PdfViewerBase.prototype.downloadExportAnnotationJson = function (blobUrl) {
        blobUrl = URL.createObjectURL(blobUrl);
        var anchorElement = createElement('a');
        if (anchorElement.click) {
            anchorElement.href = blobUrl;
            anchorElement.target = '_parent';
            if ('download' in anchorElement) {
                if (this.pdfViewer.exportAnnotationFileName !== null) {
                    anchorElement.download = this.pdfViewer.exportAnnotationFileName.split('.')[0] + '.json';
                }
                else {
                    anchorElement.download = this.pdfViewer.fileName.split('.')[0] + '.json';
                }
            }
            (document.body || document.documentElement).appendChild(anchorElement);
            anchorElement.click();
            anchorElement.parentNode.removeChild(anchorElement);
            this.pdfViewer.fireExportSuccess(blobUrl, anchorElement.download);
        }
        else {
            if (window.top === window &&
                blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
                blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
            }
            window.open(blobUrl, '_parent');
            this.pdfViewer.fireExportSuccess(blobUrl, this.pdfViewer.fileName.split('.')[0] + '.json');
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.exportFormFields = function () {
        this.createRequestForExportFormfields();
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.importFormFields = function (source) {
        this.createRequestForImportingFormfields(source);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.createRequestForExportFormfields = function (isObject) {
        var _this = this;
        var proxy = this;
        var promise = new Promise(function (resolve, reject) {
            // tslint:disable-next-line
            var jsonObject = proxy.createFormfieldsJsonData();
            jsonObject.action = 'ExportFormFields';
            // tslint:disable-next-line
            jsonObject['hashId'] = _this.hashId;
            // tslint:disable-next-line
            jsonObject['fileName'] = _this.pdfViewer.fileName;
            // tslint:disable-next-line:max-line-length
            if (proxy.jsonDocumentId) {
                // tslint:disable-next-line
                jsonObject.document = proxy.jsonDocumentId;
            }
            var url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.exportFormFields;
            proxy.exportFormFieldsRequestHandler = new AjaxHandler(_this.pdfViewer);
            proxy.exportFormFieldsRequestHandler.url = url;
            proxy.exportFormFieldsRequestHandler.mode = true;
            proxy.exportFormFieldsRequestHandler.responseType = 'text';
            proxy.exportFormFieldsRequestHandler.send(jsonObject);
            // tslint:disable-next-line
            proxy.exportFormFieldsRequestHandler.onSuccess = function (result) {
                // tslint:disable-next-line
                var data = result.data;
                if (data) {
                    if (data) {
                        if (isObject) {
                            // tslint:disable-next-line
                            var annotationJson = atob(data.split(',')[1]);
                            var exportObject = JSON.parse(annotationJson);
                            resolve(exportObject);
                        }
                        else {
                            var blobUrl = proxy.createBlobUrl(data.split('base64,')[1], 'application/json');
                            if (Browser.isIE || Browser.info.name === 'edge') {
                                window.navigator.msSaveOrOpenBlob(blobUrl, proxy.pdfViewer.fileName.split('.')[0]);
                            }
                            else {
                                proxy.downloadExportAnnotationJson(blobUrl);
                            }
                        }
                    }
                }
            };
        });
        if (isObject) {
            return promise;
        }
        else {
            return true;
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.createRequestForImportingFormfields = function (source) {
        var proxy = this;
        // tslint:disable-next-line
        var jsonObject = {};
        jsonObject.data = source;
        // tslint:disable-next-line
        jsonObject.action = 'ImportFormFields';
        // tslint:disable-next-line
        jsonObject['hashId'] = this.hashId;
        // tslint:disable-next-line
        jsonObject['fileName'] = this.pdfViewer.fileName;
        // tslint:disable-next-line:max-line-length
        if (proxy.jsonDocumentId) {
            // tslint:disable-next-line
            jsonObject.document = proxy.jsonDocumentId;
        }
        var url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.importFormFields;
        proxy.importFormFieldsRequestHandler = new AjaxHandler(this.pdfViewer);
        proxy.importFormFieldsRequestHandler.url = url;
        proxy.importFormFieldsRequestHandler.mode = true;
        proxy.importFormFieldsRequestHandler.responseType = 'text';
        proxy.importFormFieldsRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        proxy.importFormFieldsRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line
            var data = result.data;
            if (data) {
                if (typeof data !== 'object') {
                    data = JSON.parse(data);
                }
                window.sessionStorage.removeItem('formfields');
                proxy.saveFormfieldsData(data);
                for (var i = 0; i < proxy.renderedPagesList.length; i++) {
                    this.pdfViewer.formFieldsModule.renderFormFields(i);
                }
            }
        };
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.createFormfieldsJsonData = function () {
        // tslint:disable-next-line
        var jsonObject = {};
        if (this.pdfViewer.formFieldsModule) {
            var fieldsData = this.pdfViewer.formFieldsModule.downloadFormFieldsData();
            // tslint:disable-next-line
            jsonObject['fieldsData'] = fieldsData;
        }
        return jsonObject;
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.constructJsonDownload = function () {
        // tslint:disable-next-line
        var jsonObject = { hashId: this.hashId };
        if (this.jsonDocumentId) {
            // tslint:disable-next-line
            jsonObject.documentId = this.jsonDocumentId;
        }
        this.importPageList = [];
        this.saveImportedAnnotations();
        if (this.isTextMarkupAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var textMarkupAnnotationCollection = this.pdfViewer.annotationModule.textMarkupAnnotationModule.saveTextMarkupAnnotations();
            // tslint:disable-next-line
            jsonObject['textMarkupAnnotations'] = textMarkupAnnotationCollection;
        }
        if (this.isShapeAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var shapeAnnotations = this.pdfViewer.annotationModule.shapeAnnotationModule.saveShapeAnnotations();
            // tslint:disable-next-line
            jsonObject['shapeAnnotations'] = shapeAnnotations;
        }
        if (this.isCalibrateAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var calibrateAnnotations = this.pdfViewer.annotationModule.measureAnnotationModule.saveMeasureShapeAnnotations();
            // tslint:disable-next-line
            jsonObject['measureShapeAnnotations'] = calibrateAnnotations;
        }
        if (this.isStampAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var stampAnnotationCollection = this.pdfViewer.annotationModule.stampAnnotationModule.saveStampAnnotations();
            // tslint:disable-next-line
            jsonObject['stampAnnotations'] = stampAnnotationCollection;
        }
        if (this.isCommentAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var stickyAnnotationCollection = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveStickyAnnotations();
            // tslint:disable-next-line
            jsonObject['stickyNotesAnnotation'] = stickyAnnotationCollection;
        }
        if (this.isImportAction) {
            var importList = JSON.stringify(this.importPageList);
            // tslint:disable-next-line
            jsonObject['importPageList'] = importList;
        }
        if (this.pdfViewer.formFieldsModule) {
            var fieldsData = this.pdfViewer.formFieldsModule.downloadFormFieldsData();
            // tslint:disable-next-line
            jsonObject['fieldsData'] = fieldsData;
        }
        var signatureData = this.signatureModule.saveSignature();
        // tslint:disable-next-line
        jsonObject['signatureData'] = signatureData;
        if (this.isFreeTextAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            var freeTextAnnotationCollection = this.pdfViewer.annotationModule.freeTextAnnotationModule.saveFreeTextAnnotations();
            // tslint:disable-next-line
            jsonObject['freeTextAnnotation'] = freeTextAnnotationCollection;
        }
        // tslint:disable-next-line
        jsonObject['action'] = 'Download';
        // tslint:disable-next-line
        jsonObject['elementId'] = this.pdfViewer.element.id;
        return jsonObject;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isFreeTextAnnotationModule = function () {
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.annotation) {
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.freeTextAnnotationModule) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.createRequestForDownload = function () {
        var proxy = this;
        // tslint:disable-next-line
        var jsonObject = this.constructJsonDownload();
        this.dowonloadRequestHandler = new AjaxHandler(this.pdfViewer);
        this.dowonloadRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.download;
        this.dowonloadRequestHandler.responseType = 'text';
        this.dowonloadRequestHandler.send(jsonObject);
        // tslint:disable-next-line
        this.dowonloadRequestHandler.onSuccess = function (result) {
            // tslint:disable-next-line
            var data = result.data;
            if (data) {
                if (typeof data !== 'object' && data.indexOf('data:application/pdf') === -1) {
                    proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.download);
                    data = null;
                }
                if (typeof data === 'object') {
                    data = JSON.parse(data);
                }
                if (data) {
                    var blobUrl = proxy.createBlobUrl(data.split('base64,')[1], 'application/pdf');
                    if (Browser.isIE || Browser.info.name === 'edge') {
                        window.navigator.msSaveOrOpenBlob(blobUrl, proxy.pdfViewer.fileName);
                    }
                    else {
                        proxy.downloadDocument(blobUrl);
                    }
                }
            }
        };
        // tslint:disable-next-line
        this.dowonloadRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.download);
        };
        // tslint:disable-next-line
        this.dowonloadRequestHandler.onError = function (result) {
            proxy.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.download);
        };
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.getTileCount = function (pageWidth) {
        if (pageWidth && typeof pageWidth === 'number') {
            var defaultWidth = 816;
            var tileCount = pageWidth / defaultWidth;
            // tslint:disable-next-line:radix
            return parseInt(tileCount.toFixed());
        }
        else {
            return 1;
        }
    };
    PdfViewerBase.prototype.createRequestForRender = function (pageIndex) {
        var proxy = this;
        var canvas = proxy.getElement('_pageCanvas_' + pageIndex);
        var oldCanvas = proxy.getElement('_oldCanvas_' + pageIndex);
        var tilecanvas = this.getElement('_pageCanvas_' + pageIndex);
        var context = tilecanvas.getContext('2d');
        // tslint:disable-next-line
        var viewportWidth = proxy.pdfViewer.element.clientWidth > 0 ? proxy.pdfViewer.element.clientWidth : proxy.pdfViewer.element.style.width;
        // tslint:disable-next-line
        var viewportHeight = proxy.pdfViewer.element.clientHeight > 0 ? proxy.pdfViewer.element.clientHeight : proxy.pdfViewer.element.style.height;
        // tslint:disable-next-line:radix
        viewportWidth = parseInt(viewportWidth);
        // tslint:disable-next-line:radix
        viewportHeight = parseInt(viewportHeight);
        var pageWidth = this.pageSize[pageIndex].width;
        var pageHeight = this.pageSize[pageIndex].height;
        var noTileX;
        var noTileY;
        var tileCount = this.getTileCount(pageWidth);
        if (canvas) {
            if (!isNaN(parseFloat(canvas.style.width)) || oldCanvas) {
                if (proxy.isInitialLoaded) {
                    proxy.showPageLoadingIndicator(pageIndex, false);
                }
            }
            // tslint:disable-next-line
            var data = proxy.getStoredData(pageIndex);
            if (data && data.uniqueId === proxy.documentId) {
                canvas.style.backgroundColor = '#fff';
                if (viewportWidth === 0 || viewportWidth > pageWidth) {
                    proxy.renderPage(data, pageIndex);
                }
                else {
                    proxy.tileRenderPage(data, pageIndex);
                    for (var k = 0; k < tileCount; k++) {
                        for (var l = 0; l < tileCount; l++) {
                            if (k === 0 && l === 0) {
                                continue;
                            }
                            var data_1 = JSON.parse(this.getWindowSessionStorageTile(pageIndex, k, l));
                            proxy.tileRenderPage(data_1, pageIndex);
                        }
                    }
                }
                data = null;
            }
            else {
                proxy.showPageLoadingIndicator(pageIndex, true);
                if (proxy.getPagesZoomed()) {
                    if (proxy.isInitialLoaded) {
                        proxy.showPageLoadingIndicator(pageIndex, false);
                    }
                }
                noTileX = viewportWidth > pageWidth ? 1 : this.getTileCount(pageWidth);
                noTileY = viewportWidth > pageWidth ? 1 : this.getTileCount(pageWidth);
                for (var x = 0; x < noTileX; x++) {
                    for (var y = 0; y < noTileY; y++) {
                        var jsonObject = void 0;
                        // tslint:disable-next-line:max-line-length
                        jsonObject = {
                            xCoordinate: x, yCoordinate: y, viwePortWidth: viewportWidth, viewportHeight: viewportHeight,
                            pageNumber: pageIndex, hashId: proxy.hashId, tilecount: tileCount,
                            zoomFactor: proxy.getZoomFactor(), action: 'RenderPdfPages', uniqueId: this.documentId
                        };
                        if (this.jsonDocumentId) {
                            // tslint:disable-next-line
                            jsonObject.documentId = this.jsonDocumentId;
                        }
                        proxy.pageRequestHandler = new AjaxHandler(this.pdfViewer);
                        proxy.pageRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.renderPages;
                        proxy.pageRequestHandler.responseType = 'json';
                        proxy.pageRequestHandler.send(jsonObject);
                        // tslint:disable-next-line                      
                        proxy.pageRequestHandler.onSuccess = function (result) {
                            // tslint:disable-next-line
                            var data = result.data;
                            if (data) {
                                if (typeof data !== 'object') {
                                    try {
                                        data = JSON.parse(data);
                                    }
                                    catch (error) {
                                        proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.renderPages);
                                        data = null;
                                    }
                                }
                            }
                            if (data) {
                                while (typeof data !== 'object') {
                                    data = JSON.parse(data);
                                }
                                if (data.image && data.uniqueId === proxy.documentId) {
                                    var pageNumber = (data.pageNumber !== undefined) ? data.pageNumber : pageIndex;
                                    if (viewportWidth > pageWidth) {
                                        proxy.storeWinData(data, pageNumber);
                                    }
                                    else {
                                        proxy.storeWinData(data, pageNumber, data.tileX, data.tileY);
                                    }
                                    if (viewportWidth > pageWidth) {
                                        proxy.renderPage(data, pageNumber);
                                    }
                                    else {
                                        proxy.tileRenderPage(data, pageNumber);
                                    }
                                }
                            }
                        };
                        // tslint:disable-next-line
                        this.pageRequestHandler.onFailure = function (result) {
                            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderPages);
                        };
                        // tslint:disable-next-line
                        this.pageRequestHandler.onError = function (result) {
                            proxy.openNotificationPopup();
                            // tslint:disable-next-line:max-line-length
                            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.renderPages);
                        };
                    }
                }
            }
            proxy.renderedPagesList.push(pageIndex);
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.onControlError = function (status, errorMessage, action) {
        this.openNotificationPopup();
        this.pdfViewer.fireAjaxRequestFailed(status, errorMessage, action);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.getStoredData = function (pageIndex) {
        // tslint:disable-next-line
        var storedData = this.getWindowSessionStorage(pageIndex) ? this.getWindowSessionStorage(pageIndex) : this.getPinchZoomPage(pageIndex);
        // tslint:disable-next-line
        var data = null;
        if (storedData) {
            // tslint:disable-next-line
            data = storedData;
            if (!this.isPinchZoomStorage) {
                data = JSON.parse(storedData);
            }
            this.isPinchZoomStorage = false;
        }
        return data;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.storeWinData = function (data, pageIndex, tileX, tileY) {
        // tslint:disable-next-line
        var blobObj = this.createBlobUrl(data['image'].split('base64,')[1], 'image/png');
        var blobUrl = URL.createObjectURL(blobObj);
        // tslint:disable-next-line
        var storeObject;
        if (isNaN(tileX) && isNaN(tileY)) {
            storeObject = {
                // tslint:disable-next-line
                image: blobUrl, transformationMatrix: data['transformationMatrix'], hyperlinks: data['hyperlinks'], hyperlinkBounds: data['hyperlinkBounds'], linkAnnotation: data['linkAnnotation'], linkPage: data['linkPage'], annotationLocation: data['annotationLocation'],
                // tslint:disable-next-line
                textContent: data['textContent'], textBounds: data['textBounds'], pageText: data['pageText'], rotation: data['rotation'], scaleFactor: data['scaleFactor'], uniqueId: data['uniqueId']
            };
            if (this.pageSize[pageIndex]) {
                // tslint:disable-next-line
                this.pageSize[pageIndex].rotation = parseFloat(data['rotation']);
            }
            // tslint:disable-next-line
            this.textLayer.characterBound[pageIndex] = data['characterBounds'];
        }
        else {
            storeObject = {
                // tslint:disable-next-line
                image: blobUrl, transformationMatrix: data['transformationMatrix'], tileX: tileX, tileY: tileY
            };
        }
        // tslint:disable-next-line
        var viewportWidth = this.pdfViewer.element.clientWidth > 0 ? this.pdfViewer.element.clientWidth : this.pdfViewer.element.style.width;
        var pageWidth = this.pageSize[pageIndex].width;
        if (viewportWidth > pageWidth) {
            // tslint:disable-next-line:max-line-length
            if (this.pdfViewer.magnificationModule ? this.pdfViewer.magnificationModule.checkZoomFactor() : true) {
                this.manageSessionStorage(pageIndex, storeObject, tileX, tileY);
            }
            else {
                this.pinchZoomStorage.push({ index: pageIndex, pinchZoomStorage: storeObject });
            }
        }
        else {
            this.manageSessionStorage(pageIndex, storeObject, tileX, tileY);
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.setCustomAjaxHeaders = function (request) {
        for (var i = 0; i < this.pdfViewer.ajaxRequestSettings.ajaxHeaders.length; i++) {
            // tslint:disable-next-line:max-line-length
            request.setRequestHeader(this.pdfViewer.ajaxRequestSettings.ajaxHeaders[i].headerName, this.pdfViewer.ajaxRequestSettings.ajaxHeaders[i].headerValue);
        }
    };
    PdfViewerBase.prototype.getPinchZoomPage = function (pageIndex) {
        // tslint:disable-next-line
        for (var key in this.pinchZoomStorage) {
            if (this.pinchZoomStorage.hasOwnProperty(key)) {
                if (this.pinchZoomStorage[key].index === pageIndex) {
                    this.isPinchZoomStorage = true;
                    return this.pinchZoomStorage[key].pinchZoomStorage;
                }
            }
        }
        return null;
    };
    PdfViewerBase.prototype.getWindowSessionStorage = function (pageIndex) {
        return window.sessionStorage.getItem(this.documentId + '_' + pageIndex + '_' + this.getZoomFactor());
    };
    PdfViewerBase.prototype.getWindowSessionStorageTile = function (pageIndex, tileX, tileY) {
        return window.sessionStorage.getItem(this.documentId + '_' + pageIndex + '_' + tileX + '_' + tileY + '_' + this.getZoomFactor());
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.manageSessionStorage = function (pageIndex, storeObject, tileX, tileY) {
        if (this.pageCount > this.sessionLimit && window.sessionStorage.length > this.sessionLimit) {
            var lowerPageValue = this.currentPageNumber - this.sessionLimit;
            if (lowerPageValue < 0) {
                lowerPageValue = 0;
            }
            var higherPageValue = this.currentPageNumber + this.sessionLimit;
            if (higherPageValue > this.pageCount) {
                higherPageValue = this.pageCount;
            }
            for (var i = 0; i <= this.pageCount; i++) {
                if (!((lowerPageValue <= i) && (i < higherPageValue))) {
                    window.sessionStorage.removeItem(this.documentId + '_' + i + '_' + this.getZoomFactor());
                }
            }
        }
        if (isNaN(tileX) && isNaN(tileY)) {
            window.sessionStorage.setItem(this.documentId + '_' + pageIndex + '_' + this.getZoomFactor(), JSON.stringify(storeObject));
            this.sessionStorage.push(this.documentId + '_' + pageIndex + '_' + this.getZoomFactor());
        }
        else {
            // tslint:disable-next-line:max-line-length
            window.sessionStorage.setItem(this.documentId + '_' + pageIndex + '_' + tileX + '_' + tileY + '_' + this.getZoomFactor(), JSON.stringify(storeObject));
        }
    };
    PdfViewerBase.prototype.createBlobUrl = function (base64String, contentType) {
        var sliceSize = 512;
        var byteCharacters = atob(base64String);
        // tslint:disable-next-line
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            // tslint:disable-next-line
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            // tslint:disable-next-line
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        // tslint:disable-next-line
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    PdfViewerBase.prototype.getRandomNumber = function () {
        // tslint:disable-next-line
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line
            var random = Math.random() * 16 | 0, v = c == 'x' ? random : (random & 0x3 | 0x8);
            return random.toString(16);
        });
    };
    PdfViewerBase.prototype.createGUID = function () {
        // tslint:disable-next-line:max-line-length
        return 'Sync_PdfViewer_' + this.getRandomNumber();
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isClickedOnScrollBar = function (event, isNeedToSet) {
        var isScrollBar = false;
        if (isNeedToSet) {
            this.setScrollDownValue(event.type, false);
        }
        // tslint:disable-next-line:max-line-length
        if ((this.viewerContainer.clientWidth + this.viewerContainer.offsetLeft) < event.clientX && event.clientX < (this.viewerContainer.offsetWidth + this.viewerContainer.offsetLeft)) {
            isScrollBar = true;
            if (isNeedToSet) {
                this.setScrollDownValue(event.type, true);
            }
        }
        // tslint:disable-next-line:max-line-length
        if ((this.viewerContainer.clientHeight + this.viewerContainer.offsetTop) < event.clientY && event.clientY < (this.viewerContainer.offsetHeight + this.viewerContainer.offsetTop)) {
            isScrollBar = true;
            if (isNeedToSet) {
                this.setScrollDownValue(event.type, true);
            }
        }
        return isScrollBar;
    };
    PdfViewerBase.prototype.setScrollDownValue = function (eventType, boolValue) {
        if (eventType === 'mousedown') {
            this.isScrollbarMouseDown = boolValue;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.disableTextSelectionMode = function () {
        this.isTextSelectionDisabled = true;
        this.viewerContainer.classList.remove('e-enable-text-selection');
        if (this.pdfViewer.textSelectionModule) {
            this.pdfViewer.textSelectionModule.clearTextSelection();
        }
        this.viewerContainer.classList.add('e-disable-text-selection');
        this.viewerContainer.addEventListener('selectstart', function () { return false; });
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getElement = function (idString) {
        return document.getElementById(this.pdfViewer.element.id + idString);
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getPageWidth = function (pageIndex) {
        return this.pageSize[pageIndex].width * this.getZoomFactor();
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getPageHeight = function (pageIndex) {
        return this.pageSize[pageIndex].height * this.getZoomFactor();
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getPageTop = function (pageIndex) {
        return this.pageSize[pageIndex].top * this.getZoomFactor();
    };
    PdfViewerBase.prototype.isAnnotationToolbarHidden = function () {
        if (this.pdfViewer.toolbarModule.annotationToolbarModule) {
            return this.pdfViewer.toolbarModule.annotationToolbarModule.isToolbarHidden;
        }
        else {
            return true;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getTextMarkupAnnotationMode = function () {
        if (this.isTextMarkupAnnotationModule()) {
            return this.pdfViewer.annotationModule.textMarkupAnnotationModule.isTextMarkupAnnotationMode;
        }
        else {
            return false;
        }
    };
    PdfViewerBase.prototype.isNewFreeTextAnnotation = function () {
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule) {
            if (!this.pdfViewer.annotationModule.freeTextAnnotationModule.isNewFreeTextAnnot) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    PdfViewerBase.prototype.getCurrentTextMarkupAnnotation = function () {
        if (this.isTextMarkupAnnotationModule()) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getSelectTextMarkupCurrentPage = function () {
        if (this.isTextMarkupAnnotationModule()) {
            return this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
        }
        else {
            return null;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getAnnotationToolStatus = function () {
        if (this.pdfViewer.toolbarModule) {
            return this.pdfViewer.toolbarModule.annotationToolbarModule.isAnnotationButtonsEnabled();
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.getPopupNoteVisibleStatus = function () {
        if (this.pdfViewer.annotationModule) {
            return this.pdfViewer.annotationModule.isPopupNoteVisible;
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isTextMarkupAnnotationModule = function () {
        if (this.pdfViewer.annotationModule) {
            return this.pdfViewer.annotationModule.textMarkupAnnotationModule;
        }
        else {
            return null;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isShapeAnnotationModule = function () {
        if (this.pdfViewer.annotation) {
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.shapeAnnotationModule) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isCalibrateAnnotationModule = function () {
        if (this.pdfViewer.annotation) {
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.measureAnnotationModule) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isStampAnnotationModule = function () {
        if (this.pdfViewer.annotation) {
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.stampAnnotationModule) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isCommentAnnotationModule = function () {
        if (this.pdfViewer.annotation) {
            if (this.pdfViewer.annotation && this.pdfViewer.annotation.stickyNotesAnnotationModule) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.isShapeBasedAnnotationsEnabled = function () {
        // tslint:disable-next-line:max-line-length
        if (this.isShapeAnnotationModule() || this.isCalibrateAnnotationModule() || this.isStampAnnotationModule() || this.isCommentAnnotationModule()) {
            return true;
        }
        else {
            return false;
        }
    };
    /** @private */
    PdfViewerBase.prototype.getMousePosition = function (e) {
        var touchArg;
        var offsetX;
        var offsetY;
        if (e.type.indexOf('touch') !== -1) {
            touchArg = e;
            if (this.pdfViewer.annotation) {
                var pageDiv = this.getElement('_pageDiv_' + this.pdfViewer.annotation.getEventPageNumber(e));
                if (pageDiv) {
                    var pageCurrentRect = pageDiv.getBoundingClientRect();
                    offsetX = touchArg.changedTouches[0].clientX - pageCurrentRect.left;
                    offsetY = touchArg.changedTouches[0].clientY - pageCurrentRect.top;
                }
            }
        }
        else {
            if (event.target.classList.contains('e-pv-text') ||
                event.target.classList.contains('e-pv-hyperlink')) {
                offsetX = e.offsetX + e.target.offsetLeft;
                offsetY = e.offsetY + e.target.offsetTop;
            }
            else {
                offsetX = e.offsetX;
                offsetY = e.offsetY;
            }
        }
        return { x: offsetX, y: offsetY };
    };
    PdfViewerBase.prototype.getMouseEventArgs = function (position, args, evt, source) {
        args.position = position;
        var obj;
        var objects;
        if (!source) {
            if (this.action === 'Drag' || this.action === 'ConnectorSourceEnd' || this.action === 'SegmentEnd' ||
                this.action === 'OrthoThumb' || this.action === 'BezierSourceThumb' || this.action === 'BezierTargetThumb' ||
                this.action === 'ConnectorTargetEnd' || this.action.indexOf('Rotate') !== -1 || this.action.indexOf('Resize') !== -1) {
                obj = this.pdfViewer.selectedItems;
                if (this.action === 'Drag' && obj && this.pdfViewer.selectedItems.annotations.length > 0) {
                    obj = findActiveElement(evt, this, this.pdfViewer);
                }
            }
            else {
                obj = findActiveElement(evt, this, this.pdfViewer);
            }
        }
        else {
            //   objects = this.diagram.findObjectsUnderMouse(this.currentPosition, source);
            obj = findActiveElement(evt, this, this.pdfViewer);
        }
        var wrapper;
        if (obj) {
            wrapper = obj.wrapper;
        }
        if (!source) {
            args.source = obj;
            args.sourceWrapper = wrapper;
        }
        else {
            args.target = obj;
            args.targetWrapper = wrapper;
        }
        args.actualObject = this.eventArgs.actualObject;
        //args.startTouches = this.touchStartList;
        //args.moveTouches = this.touchMoveList;
        return args;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.findToolToActivate = function (obj, position) {
        position = { x: position.x / this.getZoomFactor(), y: position.y / this.getZoomFactor() };
        var element = this.pdfViewer.selectedItems.wrapper;
        obj = obj;
        if (element && obj) {
            var selectorBnds = element.bounds; //let handle: SelectorModel = diagram.selectedItems;
            var paddedBounds = new Rect(selectorBnds.x, selectorBnds.y, selectorBnds.width, selectorBnds.height);
            if (obj.shapeAnnotationType === 'Line' || obj.shapeAnnotationType === 'LineWidthArrowHead' ||
                obj.shapeAnnotationType === 'Distance' || obj.shapeAnnotationType === 'Polygon') {
                var conn = this.pdfViewer.selectedItems.annotations[0];
                if (conn) {
                    for (var i = 0; i < conn.vertexPoints.length; i++) {
                        if (contains(position, conn.vertexPoints[i], 10)) {
                            return 'ConnectorSegmentPoint_' + i;
                        }
                    }
                }
            }
            if (obj.shapeAnnotationType === 'Distance') {
                var leaderCount = 0;
                var newPoint1 = void 0;
                if (obj && obj.wrapper) {
                    for (var i = 0; i < obj.wrapper.children.length; i++) {
                        var elementAngle = Point.findAngle(obj.sourcePoint, obj.targetPoint);
                        // tslint:disable-next-line
                        var segment = obj.wrapper.children[i];
                        if (segment.id.indexOf('leader') > -1) {
                            var centerPoint = obj.wrapper.children[0].bounds.center;
                            if (leaderCount === 0) {
                                newPoint1 = { x: obj.sourcePoint.x, y: obj.sourcePoint.y - obj.leaderHeight };
                                centerPoint = obj.sourcePoint;
                            }
                            else {
                                newPoint1 = { x: obj.targetPoint.x, y: obj.targetPoint.y - obj.leaderHeight };
                                centerPoint = obj.targetPoint;
                            }
                            var matrix_3 = identityMatrix();
                            rotateMatrix(matrix_3, elementAngle, centerPoint.x, centerPoint.y);
                            var rotatedPoint = transformPointByMatrix(matrix_3, { x: newPoint1.x, y: newPoint1.y });
                            if (contains(position, rotatedPoint, 10)) {
                                return 'Leader' + leaderCount;
                            }
                            leaderCount++;
                        }
                    }
                }
            }
            var ten = 10 / this.getZoomFactor();
            var matrix = identityMatrix();
            rotateMatrix(matrix, obj.rotateAngle + element.parentTransform, element.offsetX, element.offsetY);
            //check for resizing tool
            var x = element.offsetX - element.pivot.x * element.actualSize.width;
            var y = element.offsetY - element.pivot.y * element.actualSize.height;
            var rotateThumb = {
                x: x + ((element.pivot.x === 0.5 ? element.pivot.x * 2 : element.pivot.x) * element.actualSize.width / 2),
                y: y - 30 / this.getZoomFactor()
            };
            rotateThumb = transformPointByMatrix(matrix, rotateThumb);
            if (obj.shapeAnnotationType === 'Stamp' && contains(position, rotateThumb, ten)) {
                return 'Rotate';
            }
            paddedBounds = this.inflate(ten, paddedBounds);
            if (paddedBounds.containsPoint(position, 0)) {
                var action = this.checkResizeHandles(this.pdfViewer, element, position, matrix, x, y);
                if (action) {
                    return action;
                }
            }
            if (this.pdfViewer.selectedItems.annotations.indexOf(obj) > -1) {
                return 'Drag';
            }
            return 'Select';
        }
        return this.pdfViewer.tool || 'Select';
    };
    PdfViewerBase.prototype.inflate = function (padding, bound) {
        bound.x -= padding;
        bound.y -= padding;
        bound.width += padding * 2;
        bound.height += padding * 2;
        return bound;
    };
    PdfViewerBase.prototype.checkResizeHandles = function (diagram, element, position, matrix, x, y) {
        var action;
        if (!action) {
            action = this.checkForResizeHandles(diagram, element, position, matrix, x, y);
        }
        if (action) {
            return action;
        }
        return null;
    };
    PdfViewerBase.prototype.checkForResizeHandles = function (diagram, element, position, matrix, x, y) {
        var forty = 40 / 1;
        var ten = 10 / 1;
        var selectedItems = diagram.selectedItems;
        var isStamp = false;
        var isSticky = false;
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.selectedItems.annotations[0] && (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'Stamp'
            || this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText')) {
            isStamp = true;
        }
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.selectedItems.annotations[0] && this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'StickyNotes') {
            isSticky = true;
        }
        if (!isSticky) {
            if ((element.actualSize.width >= forty && element.actualSize.height >= forty) || isStamp) {
                if (contains(position, transformPointByMatrix(matrix, { x: x + element.actualSize.width, y: y + element.actualSize.height }), ten)) {
                    return 'ResizeSouthEast';
                }
                if (contains(position, transformPointByMatrix(matrix, { x: x, y: y + element.actualSize.height }), ten)) {
                    return 'ResizeSouthWest';
                }
                if (contains(position, transformPointByMatrix(matrix, { x: x + element.actualSize.width, y: y }), ten)) {
                    return 'ResizeNorthEast';
                }
                if (contains(position, transformPointByMatrix(matrix, { x: x, y: y }), ten)) {
                    return 'ResizeNorthWest';
                }
            }
            if (contains(
            // tslint:disable-next-line:max-line-length
            position, transformPointByMatrix(matrix, { x: x + element.actualSize.width, y: y + element.actualSize.height / 2 }), ten) && !isStamp) {
                return 'ResizeEast';
            }
            // tslint:disable-next-line:max-line-length
            if (contains(position, transformPointByMatrix(matrix, { x: x, y: y + element.actualSize.height / 2 }), ten) && !isStamp) {
                return 'ResizeWest';
            }
            if (contains(
            // tslint:disable-next-line:max-line-length
            position, transformPointByMatrix(matrix, { x: x + element.actualSize.width / 2, y: y + element.actualSize.height }), ten) && !isStamp) {
                return 'ResizeSouth';
            }
            // tslint:disable-next-line:max-line-length
            if (contains(position, transformPointByMatrix(matrix, { x: x + element.actualSize.width / 2, y: y }), ten) && !isStamp) {
                return 'ResizeNorth';
            }
        }
        return null;
    };
    /** @private */
    PdfViewerBase.prototype.diagramMouseMove = function (evt) {
        this.currentPosition = this.getMousePosition(evt);
        if (this.pdfViewer.annotation) {
            this.activeElements.activePageID = this.pdfViewer.annotation.getEventPageNumber(evt);
        }
        var obj = findActiveElement(evt, this, this.pdfViewer);
        if ((this.tool instanceof NodeDrawingTool) || (this.tool instanceof LineTool)) {
            obj = this.pdfViewer.drawingObject;
        }
        var target;
        if ((Point.equals(this.currentPosition, this.prevPosition) === false || this.inAction)) {
            if (this.isMouseDown === false) {
                this.eventArgs = {};
                var sourceDrawingElement = null;
                if (obj) {
                    this.tool = this.getTool(this.action);
                    if (obj.wrapper) {
                        sourceDrawingElement = obj.wrapper.children[0];
                        if (sourceDrawingElement) {
                            target = obj;
                        }
                    }
                }
                var eventTarget = event.target;
                this.action = this.findToolToActivate(obj, this.currentPosition);
                this.tool = this.getTool(this.action);
                this.setCursor(eventTarget, evt);
            }
            else {
                if (this.eventArgs && this.eventArgs.source) {
                    var eventTarget = event.target;
                    this.updateDefaultCursor(this.eventArgs.source, eventTarget, evt);
                }
                else {
                    this.setCursor(event.target, evt);
                }
                this.diagramMouseActionHelper(evt);
                if (this.tool) {
                    var currentObject = obj;
                    if (currentObject && currentObject.shapeAnnotationType === 'Path') {
                        this.tool = null;
                    }
                    if (this.tool != null) {
                        this.tool.mouseMove(this.eventArgs);
                    }
                }
            }
            this.prevPosition = this.currentPosition;
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.updateDefaultCursor = function (source, target, event) {
        // tslint:disable-next-line:max-line-length
        if (source && source.pageIndex !== undefined && source.pageIndex !== this.activeElements.activePageID && target) {
            this.isPanMode ? target.style.cursor = 'grab' : target.style.cursor = 'default';
        }
        else {
            this.setCursor(target, event);
        }
    };
    /** @private */
    PdfViewerBase.prototype.diagramMouseLeave = function (evt) {
        this.currentPosition = this.getMousePosition(evt);
        if (this.pdfViewer.annotation) {
            this.activeElements.activePageID = this.pdfViewer.annotation.getEventPageNumber(evt);
        }
        var shapeElement = findActiveElement(evt, this, this.pdfViewer);
        var mouseMoveforce = false;
        var target;
        if (Point.equals(this.currentPosition, this.prevPosition) === false || this.inAction) {
            if (this.isMouseDown === false || mouseMoveforce) {
                this.eventArgs = {};
                var sourceElement = null;
                if (shapeElement) {
                    sourceElement = shapeElement.wrapper.children[0];
                    if (sourceElement) {
                        target = shapeElement;
                    }
                    mouseMoveforce = false;
                }
            }
            else {
                this.diagramMouseActionHelper(evt);
                // tslint:disable-next-line:max-line-length
                if (this.tool && this.action !== 'Drag' && this.pdfViewer.tool !== 'Stamp' && this.tool.currentElement && this.tool.currentElement.shapeAnnotationType !== 'Stamp') {
                    this.tool.mouseLeave(this.eventArgs);
                    this.tool = null;
                    if (this.pdfViewer.annotation) {
                        this.pdfViewer.annotationModule.renderAnnotations(this.previousPage, null, null, null);
                    }
                }
            }
            this.prevPosition = this.currentPosition;
        }
    };
    PdfViewerBase.prototype.diagramMouseActionHelper = function (evt) {
        this.eventArgs.position = this.currentPosition;
        if (this.action === 'Drag' &&
            this.eventArgs.source instanceof Selector) {
            this.getMouseEventArgs(this.currentPosition, this.eventArgs, evt);
        }
        this.getMouseEventArgs(this.currentPosition, this.eventArgs, evt, this.eventArgs.source);
        this.inAction = true;
        this.initialEventArgs = null;
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.setCursor = function (eventTarget, event) {
        var freeTextAnnotModule = this.pdfViewer.annotationModule.freeTextAnnotationModule;
        if (this.tool instanceof ResizeTool) {
            if (this.tool.corner === 'ResizeNorthWest') {
                eventTarget.style.cursor = 'nw-resize';
            }
            else if (this.tool.corner === 'ResizeNorthEast') {
                eventTarget.style.cursor = 'ne-resize';
            }
            else if (this.tool.corner === 'ResizeSouthWest') {
                eventTarget.style.cursor = 'sw-resize';
            }
            else if (this.tool.corner === 'ResizeSouthEast') {
                eventTarget.style.cursor = 'se-resize';
            }
            else if (this.tool.corner === 'ResizeNorth') {
                eventTarget.style.cursor = 'n-resize';
            }
            else if (this.tool.corner === 'ResizeWest') {
                eventTarget.style.cursor = 'w-resize';
            }
            else if (this.tool.corner === 'ResizeEast') {
                eventTarget.style.cursor = 'e-resize';
            }
            else if (this.tool.corner === 'ResizeSouth') {
                eventTarget.style.cursor = 's-resize';
            }
        }
        else if (this.tool instanceof MoveTool) {
            eventTarget.style.cursor = 'move';
            // tslint:disable-next-line:max-line-length
        }
        else if (this.tool instanceof NodeDrawingTool || this.tool instanceof LineTool || this.tool instanceof PolygonDrawingTool || (freeTextAnnotModule && freeTextAnnotModule.isNewAddedAnnot)) {
            eventTarget.style.cursor = 'crosshair';
        }
        else {
            if (eventTarget.classList.contains('e-pv-text')) {
                eventTarget.style.cursor = 'text';
            }
            else if (eventTarget.classList.contains('e-pv-hyperlink')) {
                eventTarget.style.cursor = 'pointer';
            }
            else if (this.isPanMode) {
                if (this.isViewerMouseDown && event.type === 'mousemove') {
                    eventTarget.style.cursor = 'grabbing';
                }
                else {
                    var obj = findActiveElement(event, this, this.pdfViewer);
                    if (obj && event.type === 'mousemove') {
                        eventTarget.style.cursor = 'pointer';
                    }
                    else {
                        eventTarget.style.cursor = 'grab';
                    }
                }
            }
            else {
                var obj = findActiveElement(event, this, this.pdfViewer);
                if (obj && this.pdfViewer.selectedItems.annotations.length === 0 && event.type === 'mousemove') {
                    eventTarget.style.cursor = 'pointer';
                }
                else {
                    eventTarget.style.cursor = 'default';
                }
            }
        }
    };
    /** @private */
    PdfViewerBase.prototype.getTool = function (action) {
        switch (action) {
            case 'Select':
                return new SelectTool(this.pdfViewer, this);
            case 'Drag':
                return new MoveTool(this.pdfViewer, this);
            case 'ResizeSouthEast':
            case 'ResizeSouthWest':
            case 'ResizeNorthEast':
            case 'ResizeNorthWest':
            case 'ResizeSouth':
            case 'ResizeNorth':
            case 'ResizeWest':
            case 'ResizeEast':
                return new ResizeTool(this.pdfViewer, this, action);
            case 'ConnectorSourceEnd':
            case 'ConnectorTargetEnd':
            case 'Leader':
            case 'ConnectorSegmentPoint':
                return new ConnectTool(this.pdfViewer, this, action);
            case 'DrawTool':
                return new NodeDrawingTool(this.pdfViewer, this, this.pdfViewer.drawingObject);
            case 'Polygon':
                return new PolygonDrawingTool(this.pdfViewer, this, 'Polygon');
            case 'Distance':
                return new LineTool(this.pdfViewer, this, 'Leader1', undefined);
            case 'Line':
                return new LineTool(this.pdfViewer, this, 'ConnectorSegmentPoint_1', this.pdfViewer.drawingObject);
            case 'Perimeter':
                return new PolygonDrawingTool(this.pdfViewer, this, 'Perimeter');
            case 'Rotate':
                return new RotateTool(this.pdfViewer, this);
            case 'Stamp':
                return new StampTool(this.pdfViewer, this);
        }
        if (action.indexOf('ConnectorSegmentPoint') > -1 || action.indexOf('Leader') > -1) {
            return new ConnectTool(this.pdfViewer, this, action);
        }
        return null;
    };
    /** @private */
    PdfViewerBase.prototype.diagramMouseUp = function (evt) {
        var touches;
        if (this.tool) {
            if (!this.inAction && evt.which !== 3) {
                if (this.action === 'Drag') {
                    this.action = 'Select';
                    var obj = findActiveElement(evt, this, this.pdfViewer);
                    var isMultipleSelect = true;
                }
            }
            var isGroupAction = void 0;
            if (!(this.tool instanceof PolygonDrawingTool) && !(this.tool instanceof LineTool) && !(this.tool instanceof NodeDrawingTool)) {
                this.inAction = false;
                this.isMouseDown = false;
            }
            this.currentPosition = this.getMousePosition(evt);
            if (this.tool) {
                this.eventArgs.position = this.currentPosition;
                this.getMouseEventArgs(this.currentPosition, this.eventArgs, evt, this.eventArgs.source);
                var ctrlKey = this.isMetaKey(evt);
                var info = { ctrlKey: evt.ctrlKey, shiftKey: evt.shiftKey };
                this.eventArgs.info = info;
                this.eventArgs.clickCount = evt.detail;
                this.tool.mouseUp(this.eventArgs);
                // tslint:disable-next-line:max-line-length
                if ((this.tool instanceof NodeDrawingTool || this.tool instanceof LineTool || this.tool instanceof PolygonDrawingTool) && !this.tool.dragging) {
                    this.inAction = false;
                    this.isMouseDown = false;
                }
                var obj = findActiveElement(evt, this, this.pdfViewer);
                if (this.isShapeAnnotationModule() || this.isCalibrateAnnotationModule()) {
                    this.pdfViewer.annotation.onShapesMouseup(obj, evt);
                }
            }
        }
        var target = event.target;
        // tslint:disable-next-line:max-line-length
        if (!touches && evt.cancelable && this.skipPreventDefault(target)) {
            evt.preventDefault();
        }
        this.eventArgs = {};
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.skipPreventDefault = function (target) {
        var isSkipped = false;
        var isSkip = false;
        // tslint:disable-next-line:max-line-length
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus) {
            isSkip = true;
        }
        // tslint:disable-next-line:max-line-length
        if (target && !target.classList.contains('e-pdfviewer-formFields')
            && !target.classList.contains('e-pdfviewer-ListBox') && !target.classList.contains('e-pdfviewer-signatureformFields')
            && !((target).className === 'free-text-input' && (target).tagName === 'TEXTAREA')
            && !isSkip) {
            isSkipped = true;
        }
        return isSkipped;
    };
    PdfViewerBase.prototype.isMetaKey = function (evt) {
        return navigator.platform.match('Mac') ? evt.metaKey : evt.ctrlKey;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.diagramMouseDown = function (evt) {
        var touches;
        touches = evt.touches;
        this.isMouseDown = true;
        this.currentPosition = this.prevPosition = this.getMousePosition(evt);
        this.eventArgs = {};
        if (this.pdfViewer.tool === 'Stamp') {
            this.pdfViewer.tool = '';
        }
        var target;
        var obj = findActiveElement(evt, this, this.pdfViewer);
        if (this.pdfViewer.annotation && this.pdfViewer.enableStampAnnotations) {
            var stampModule = this.pdfViewer.annotationModule.stampAnnotationModule;
            if (stampModule && stampModule.isNewStampAnnot) {
                var stampObj = obj;
                if (stampObj === undefined && this.pdfViewer.selectedItems.annotations[0]) {
                    stampObj = this.pdfViewer.selectedItems.annotations[0];
                }
                if (stampObj) {
                    this.isViewerMouseDown = false;
                    stampObj.opacity = this.pdfViewer.stampSettings.opacity;
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.nodePropertyChange(stampObj, { opacity: this.pdfViewer.stampSettings.opacity });
                    this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = false;
                    if (stampObj.shapeAnnotationType === 'Image' && !this.isAlreadyAdded) {
                        this.customStampCollection.push({ customStampName: stampObj.id, customStampImageSource: stampObj.data });
                    }
                    this.isAlreadyAdded = false;
                    stampModule.updateDeleteItems(stampObj.pageIndex, stampObj, stampObj.opacity);
                    stampModule.resetAnnotation();
                    stampModule.isNewStampAnnot = false;
                }
            }
        }
        if (this.isNewSignatureAdded) {
            this.signatureCount++;
            this.currentSignatureAnnot = null;
            var signObject = obj;
            if (signObject === undefined && this.pdfViewer.selectedItems.annotations[0]) {
                signObject = this.pdfViewer.selectedItems.annotations[0];
            }
            if (signObject) {
                this.signatureModule.storeSignatureData(signObject.pageIndex, signObject);
            }
            this.isNewSignatureAdded = false;
        }
        if (this.pdfViewer.annotationModule) {
            var freeTextAnnotModule = this.pdfViewer.annotationModule.freeTextAnnotationModule;
            // tslint:disable-next-line
            var currentObj = obj;
            if (freeTextAnnotModule.isNewFreeTextAnnot === true && !(currentObj && currentObj.shapeAnnotationType === 'FreeText')) {
                var canvas = void 0;
                // tslint:disable-next-line:max-line-length
                if (event.target && (event.target.id.indexOf('_text') > -1 || event.target.classList.contains('e-pv-hyperlink')) && this.pdfViewer.annotation) {
                    var pageIndex = this.pdfViewer.annotation.getEventPageNumber(event);
                    var diagram = document.getElementById(this.pdfViewer.element.id + '_annotationCanvas_' + pageIndex);
                    var canvas1 = diagram.getBoundingClientRect();
                    var left = canvas1.x ? canvas1.x : canvas1.left;
                    var top_3 = canvas1.y ? canvas1.y : canvas1.top;
                    canvas = new Rect(left + 10, top_3 + 10, canvas1.width - 10, canvas1.height - 10);
                }
                if (touches) {
                    this.mouseX = touches[0].clientX;
                    this.mouseY = touches[0].clientY;
                }
                if (canvas && canvas.containsPoint({ x: this.mouseX, y: this.mouseY }) && freeTextAnnotModule.isNewAddedAnnot) {
                    freeTextAnnotModule.addInuptElemet(this.currentPosition);
                    if (this.pdfViewer.toolbar && this.pdfViewer.toolbar.annotationToolbarModule) {
                        // tslint:disable-next-line
                        var annotModule = this.pdfViewer.toolbar.annotationToolbarModule;
                        annotModule.primaryToolbar.deSelectItem(annotModule.freeTextEditItem);
                    }
                    evt.preventDefault();
                    freeTextAnnotModule.isNewAddedAnnot = false;
                }
            }
        }
        var sourceElement = null;
        if (obj) {
            sourceElement = obj.wrapper.children[0];
            if (sourceElement) {
                target = obj;
            }
        }
        if (!this.tool || (this.tool && !this.tool.drawingObject)) {
            this.action = this.findToolToActivate(obj, this.currentPosition);
            this.tool = this.getTool(this.action);
            if (!this.tool) {
                this.action = this.pdfViewer.tool || 'Select';
                this.tool = this.getTool(this.action);
            }
        }
        this.getMouseEventArgs(this.currentPosition, this.eventArgs, evt);
        this.eventArgs.position = this.currentPosition;
        this.tool.mouseDown(this.eventArgs);
        if (this.pdfViewer.annotation) {
            this.pdfViewer.annotation.onAnnotationMouseDown();
        }
        this.initialEventArgs = { source: this.eventArgs.source, sourceWrapper: this.eventArgs.sourceWrapper };
        this.initialEventArgs.position = this.currentPosition;
        this.initialEventArgs.info = this.eventArgs.info;
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.exportAnnotationsAsObject = function () {
        var _this = this;
        if (this.pdfViewer.annotationModule) {
            var isAnnotations = this.updateExportItem();
            if (isAnnotations) {
                return new Promise(function (resolve, reject) {
                    _this.createRequestForExportAnnotations(true).then(function (value) {
                        resolve(value);
                    });
                });
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.exportFormFieldsAsObject = function () {
        var _this = this;
        if (this.pdfViewer.formFieldsModule) {
            return new Promise(function (resolve, reject) {
                _this.createRequestForExportFormfields(true).then(function (value) {
                    resolve(value);
                });
            });
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.importAnnotations = function (importData) {
        if (this.pdfViewer.annotationModule) {
            this.createRequestForImportAnnotations(importData);
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.exportAnnotations = function () {
        if (this.pdfViewer.annotationModule) {
            var isAnnotations = this.updateExportItem();
            if (isAnnotations) {
                this.createRequestForExportAnnotations();
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.createRequestForExportAnnotations = function (isObject) {
        var _this = this;
        var proxy = this;
        var promise = new Promise(function (resolve, reject) {
            // tslint:disable-next-line
            var jsonObject;
            // tslint:disable-next-line:max-line-length
            jsonObject = { hashId: proxy.hashId, action: 'ExportAnnotations', pdfAnnotation: proxy.createAnnotationJsonData() };
            proxy.pdfViewer.fireExportStart(jsonObject.pdfAnnotation);
            if (proxy.jsonDocumentId) {
                // tslint:disable-next-line
                jsonObject.document = proxy.jsonDocumentId;
            }
            var url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.exportAnnotations;
            proxy.exportAnnotationRequestHandler = new AjaxHandler(_this.pdfViewer);
            proxy.exportAnnotationRequestHandler.url = url;
            proxy.exportAnnotationRequestHandler.mode = true;
            proxy.exportAnnotationRequestHandler.responseType = 'text';
            proxy.exportAnnotationRequestHandler.send(jsonObject);
            // tslint:disable-next-line
            proxy.exportAnnotationRequestHandler.onSuccess = function (result) {
                // tslint:disable-next-line
                var data = result.data;
                if (data) {
                    if (typeof data === 'object') {
                        data = JSON.parse(data);
                    }
                    if (data) {
                        if (isObject) {
                            if (data.split('base64,')[1]) {
                                // tslint:disable-next-line
                                var annotationJson = atob(data.split(',')[1]);
                                var exportObject = JSON.parse(annotationJson);
                                if (proxy.pdfViewer.exportAnnotationFileName !== null) {
                                    proxy.pdfViewer.fireExportSuccess(exportObject, proxy.pdfViewer.exportAnnotationFileName);
                                }
                                else {
                                    proxy.pdfViewer.fireExportSuccess(exportObject, proxy.pdfViewer.fileName);
                                }
                                resolve(exportObject);
                            }
                            else {
                                // tslint:disable-next-line:max-line-length
                                proxy.pdfViewer.fireExportFailed(jsonObject.pdfAnnotation, proxy.pdfViewer.localeObj.getConstant('Export Failed'));
                            }
                        }
                        else {
                            if (data.split('base64,')[1]) {
                                var blobUrl = proxy.createBlobUrl(data.split('base64,')[1], 'application/json');
                                if (Browser.isIE || Browser.info.name === 'edge') {
                                    if (proxy.pdfViewer.exportAnnotationFileName !== null) {
                                        window.navigator.msSaveOrOpenBlob(blobUrl, proxy.pdfViewer.exportAnnotationFileName.split('.')[0]);
                                    }
                                    else {
                                        window.navigator.msSaveOrOpenBlob(blobUrl, proxy.pdfViewer.fileName.split('.')[0]);
                                    }
                                }
                                else {
                                    proxy.downloadExportAnnotationJson(blobUrl);
                                }
                            }
                            else {
                                proxy.openImportExportNotificationPopup(proxy.pdfViewer.localeObj.getConstant('Export Failed'));
                                // tslint:disable-next-line:max-line-length
                                proxy.pdfViewer.fireExportFailed(jsonObject.pdfAnnotation, proxy.pdfViewer.localeObj.getConstant('Export Failed'));
                            }
                        }
                    }
                    if (typeof data !== 'string') {
                        try {
                            if (typeof data === 'string') {
                                proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.exportAnnotations);
                                data = null;
                            }
                        }
                        catch (error) {
                            // tslint:disable-next-line:max-line-length
                            proxy.pdfViewer.fireExportFailed(jsonObject.pdfAnnotation, proxy.pdfViewer.localeObj.getConstant('Export Failed'));
                            proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.exportAnnotations);
                            data = null;
                        }
                    }
                }
            };
            // tslint:disable-next-line
            proxy.exportAnnotationRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireExportFailed(jsonObject.pdfAnnotation, result.statusText);
            };
            // tslint:disable-next-line
            proxy.exportAnnotationRequestHandler.onError = function (result) {
                proxy.pdfViewer.fireExportFailed(jsonObject.pdfAnnotation, result.statusText);
            };
        });
        if (isObject) {
            return promise;
        }
        else {
            return true;
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.createRequestForImportAnnotations = function (importData) {
        var jsonObject;
        var proxy = this;
        if (typeof importData === 'object') {
            proxy.reRenderAnnotations(importData.pdfAnnotation);
            proxy.isImportedAnnotation = true;
            proxy.pdfViewer.fireImportSuccess(importData.pdfAnnotation);
        }
        else {
            proxy.pdfViewer.fireImportStart(importData);
            // tslint:disable-next-line:max-line-length
            jsonObject = { fileName: importData, action: 'ImportAnnotations' };
            if (proxy.jsonDocumentId) {
                // tslint:disable-next-line
                jsonObject.document = proxy.jsonDocumentId;
            }
            var url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.importAnnotations;
            proxy.importAnnotationRequestHandler = new AjaxHandler(proxy.pdfViewer);
            proxy.importAnnotationRequestHandler.url = url;
            proxy.importAnnotationRequestHandler.mode = true;
            proxy.importAnnotationRequestHandler.responseType = 'text';
            proxy.importAnnotationRequestHandler.send(jsonObject);
            // tslint:disable-next-line
            proxy.importAnnotationRequestHandler.onSuccess = function (result) {
                // tslint:disable-next-line
                var data = result.data;
                if (data) {
                    if (typeof data !== 'object') {
                        try {
                            data = JSON.parse(data);
                            if (typeof data !== 'object') {
                                proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.importAnnotations);
                                data = null;
                            }
                        }
                        catch (error) {
                            proxy.pdfViewer.fireImportFailed(importData, proxy.pdfViewer.localeObj.getConstant('File not found'));
                            proxy.openImportExportNotificationPopup(proxy.pdfViewer.localeObj.getConstant('File not found'));
                            proxy.onControlError(500, data, proxy.pdfViewer.serverActionSettings.importAnnotations);
                            data = null;
                        }
                    }
                    if (data) {
                        if (data.pdfAnnotation) {
                            proxy.reRenderAnnotations(data.pdfAnnotation);
                            proxy.isImportedAnnotation = true;
                            proxy.pdfViewer.fireImportSuccess(data.pdfAnnotation);
                        }
                    }
                }
            };
            // tslint:disable-next-line
            proxy.importAnnotationRequestHandler.onFailure = function (result) {
                proxy.pdfViewer.fireImportFailed(importData, result.statusText);
            };
            // tslint:disable-next-line
            proxy.importAnnotationRequestHandler.onError = function (result) {
                proxy.pdfViewer.fireImportFailed(importData, result.statusText);
            };
        }
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.openImportExportNotificationPopup = function (errorDetails) {
        this.textLayer.createNotificationPopup(errorDetails);
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.reRenderAnnotations = function (annotation) {
        if (annotation) {
            this.isImportAction = true;
            var count = void 0;
            if (this.isImportedAnnotation) {
                this.importedAnnotation = this.combineImportedData(this.importedAnnotation, annotation);
            }
            else {
                this.importedAnnotation = annotation;
            }
            if (!this.isImportedAnnotation) {
                count = 0;
            }
            for (var i = 0; i < this.pageCount; i++) {
                if (annotation[i]) {
                    // tslint:disable-next-line
                    var textMarkupObject = window.sessionStorage.getItem(this.documentId + '_annotations_textMarkup');
                    // tslint:disable-next-line
                    var shapeObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape');
                    // tslint:disable-next-line
                    var measureShapeObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape_measure');
                    // tslint:disable-next-line
                    var stampObject = window.sessionStorage.getItem(this.documentId + '_annotations_stamp');
                    // tslint:disable-next-line
                    var stickyObject = window.sessionStorage.getItem(this.documentId + '_annotations_sticky');
                    // tslint:disable-next-line
                    var freeTextObject = window.sessionStorage.getItem(this.documentId + '_annotations_freetext');
                    var annotationCanvas = this.getElement('_annotationCanvas_' + i);
                    if (annotationCanvas) {
                        this.drawPageAnnotations(annotation[i], i);
                        if (this.isImportedAnnotation) {
                            var isAdded = false;
                            for (var j = 0; j < this.annotationPageList.length; j++) {
                                if (this.annotationPageList[j] === i) {
                                    isAdded = true;
                                }
                            }
                            if (isAdded) {
                                this.annotationPageList[count] = i;
                                count = count + 1;
                            }
                        }
                        else {
                            this.annotationPageList[count] = i;
                            count = count + 1;
                        }
                    }
                    if (annotation[i].textMarkupAnnotation.length !== 0) {
                        if (textMarkupObject) {
                            var annotObject = JSON.parse(textMarkupObject);
                            // tslint:disable-next-line:max-line-length
                            annotation[i].textMarkupAnnotation = this.checkAnnotationCollections(annotObject, annotation[i].textMarkupAnnotation, i);
                        }
                        annotation[i].textMarkupAnnotation = this.checkAnnotationCommentsCollections(annotation[i].textMarkupAnnotation, i);
                        if (annotation[i].textMarkupAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].textMarkupAnnotation, i);
                        }
                    }
                    if (annotation[i].shapeAnnotation.length !== 0) {
                        if (shapeObject) {
                            var annotObject = JSON.parse(shapeObject);
                            annotation[i].shapeAnnotation = this.checkAnnotationCollections(annotObject, annotation[i].shapeAnnotation, i);
                        }
                        annotation[i].shapeAnnotation = this.checkAnnotationCommentsCollections(annotation[i].shapeAnnotation, i);
                        if (annotation[i].shapeAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].shapeAnnotation, i);
                        }
                    }
                    if (annotation[i].measureShapeAnnotation.length !== 0) {
                        if (measureShapeObject) {
                            var annotObject = JSON.parse(measureShapeObject);
                            // tslint:disable-next-line:max-line-length
                            annotation[i].measureShapeAnnotation = this.checkAnnotationCollections(annotObject, annotation[i].measureShapeAnnotation, i);
                        }
                        // tslint:disable-next-line:max-line-length
                        annotation[i].measureShapeAnnotation = this.checkAnnotationCommentsCollections(annotation[i].measureShapeAnnotation, i);
                        if (annotation[i].measureShapeAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].measureShapeAnnotation, i);
                        }
                    }
                    if (annotation[i].stampAnnotations.length !== 0) {
                        if (stampObject) {
                            var annotObject = JSON.parse(stampObject);
                            // tslint:disable-next-line:max-line-length
                            annotation[i].stampAnnotations = this.checkAnnotationCollections(annotObject, annotation[i].stampAnnotations, i);
                        }
                        annotation[i].stampAnnotations = this.checkAnnotationCommentsCollections(annotation[i].stampAnnotations, i);
                        if (annotation[i].stampAnnotations.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].stampAnnotations, i);
                        }
                    }
                    if (annotation[i].stickyNotesAnnotation.length !== 0) {
                        if (stickyObject) {
                            var annotObject = JSON.parse(stickyObject);
                            // tslint:disable-next-line:max-line-length
                            annotation[i].stickyNotesAnnotation = this.checkAnnotationCollections(annotObject, annotation[i].stickyNotesAnnotation, i);
                        }
                        // tslint:disable-next-line:max-line-length
                        annotation[i].stickyNotesAnnotation = this.checkAnnotationCommentsCollections(annotation[i].stickyNotesAnnotation, i);
                        if (annotation[i].stickyNotesAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].stickyNotesAnnotation, i);
                        }
                    }
                    if (annotation[i].freeTextAnnotation.length !== 0) {
                        if (freeTextObject) {
                            var annotObject = JSON.parse(freeTextObject);
                            // tslint:disable-next-line:max-line-length
                            annotation[i].freeTextAnnotation = this.checkAnnotationCollections(annotObject, annotation[i].freeTextAnnotation, i);
                        }
                        annotation[i].freeTextAnnotation = this.checkAnnotationCommentsCollections(annotation[i].freeTextAnnotation, i);
                        if (annotation[i].freeTextAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderAnnotationComments(annotation[i].freeTextAnnotation, i);
                        }
                    }
                }
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.drawPageAnnotations = function (annotation, pageIndex, isNewlyAdded) {
        if (isNewlyAdded) {
            annotation = annotation[pageIndex];
        }
        if (annotation) {
            if (annotation.textMarkupAnnotation.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_textMarkup');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    if (annotObject) {
                        // tslint:disable-next-line:max-line-length
                        annotation.textMarkupAnnotation = this.checkAnnotationCollections(annotObject, annotation.textMarkupAnnotation, pageIndex);
                    }
                }
                annotation.textMarkupAnnotation = this.checkAnnotationCommentsCollections(annotation.textMarkupAnnotation, pageIndex);
                if (annotation.textMarkupAnnotation.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.renderAnnotations(pageIndex, null, null, annotation.textMarkupAnnotation, null, true);
                }
            }
            if (annotation.shapeAnnotation.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    annotation.shapeAnnotation = this.checkAnnotationCollections(annotObject, annotation.shapeAnnotation, pageIndex);
                }
                annotation.shapeAnnotation = this.checkAnnotationCommentsCollections(annotation.shapeAnnotation, pageIndex);
                if (annotation.shapeAnnotation.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.renderAnnotations(pageIndex, annotation.shapeAnnotation, null, null, null, true);
                }
            }
            if (annotation.measureShapeAnnotation.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape_measure');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    // tslint:disable-next-line:max-line-length
                    annotation.measureShapeAnnotation = this.checkAnnotationCollections(annotObject, annotation.measureShapeAnnotation, pageIndex);
                }
                annotation.measureShapeAnnotation = this.checkAnnotationCommentsCollections(annotation.measureShapeAnnotation, pageIndex);
                if (annotation.measureShapeAnnotation.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.renderAnnotations(pageIndex, null, annotation.measureShapeAnnotation, null, null, true);
                }
            }
            if (annotation.stampAnnotations.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_stamp');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    annotation.stampAnnotations = this.checkAnnotationCollections(annotObject, annotation.stampAnnotations, pageIndex);
                }
                annotation.stampAnnotations = this.checkAnnotationCommentsCollections(annotation.stampAnnotations, pageIndex);
                if (annotation.stampAnnotations.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.stampAnnotationModule.renderStampAnnotations(annotation.stampAnnotations, pageIndex, null, true);
                }
            }
            if (annotation.stickyNotesAnnotation.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_sticky');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    // tslint:disable-next-line:max-line-length
                    annotation.stickyNotesAnnotation = this.checkAnnotationCollections(annotObject, annotation.stickyNotesAnnotation, pageIndex);
                }
                annotation.stickyNotesAnnotation = this.checkAnnotationCommentsCollections(annotation.stickyNotesAnnotation, pageIndex);
                if (annotation.stickyNotesAnnotation.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.stickyNotesAnnotationModule.renderStickyNotesAnnotations(annotation.stickyNotesAnnotation, pageIndex);
                }
            }
            if (annotation.freeTextAnnotation.length !== 0) {
                // tslint:disable-next-line
                var storeObject = window.sessionStorage.getItem(this.documentId + '_annotations_freetext');
                if (storeObject) {
                    var annotObject = JSON.parse(storeObject);
                    annotation.freeTextAnnotation = this.checkAnnotationCollections(annotObject, annotation.freeTextAnnotation, pageIndex);
                }
                annotation.freeTextAnnotation = this.checkAnnotationCommentsCollections(annotation.freeTextAnnotation, pageIndex);
                if (annotation.freeTextAnnotation.length !== 0) {
                    // tslint:disable-next-line:max-line-length
                    this.pdfViewer.annotationModule.freeTextAnnotationModule.renderFreeTextAnnotations(annotation.freeTextAnnotation, pageIndex, true);
                }
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.checkAnnotationCollections = function (annotationCollection, annotation, pageNumber) {
        // tslint:disable-next-line
        var pageCollections = null;
        for (var a = 0; a < annotationCollection.length; a++) {
            if (annotationCollection[a].pageIndex === pageNumber) {
                pageCollections = annotationCollection[a].annotations;
            }
        }
        if (pageCollections) {
            for (var i = 0; i < pageCollections.length; i++) {
                for (var j = 0; j < annotation.length; j++) {
                    if (pageCollections[i].annotName === annotation[j].AnnotName) {
                        annotation.splice(j);
                    }
                }
            }
        }
        pageCollections = null;
        return annotation;
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.checkAnnotationCommentsCollections = function (annotation, pageNumber) {
        if (this.annotationComments) {
            // tslint:disable-next-line
            var annotationCollections = this.annotationComments[pageNumber];
            if (annotationCollections) {
                for (var i = 0; i < annotationCollections.length; i++) {
                    for (var j = 0; j < annotation.length; j++) {
                        if (annotationCollections[i].AnnotName === annotation[j].AnnotName) {
                            annotation.splice(j);
                        }
                    }
                }
            }
            annotationCollections = null;
        }
        return annotation;
    };
    PdfViewerBase.prototype.saveImportedAnnotations = function () {
        if (this.isImportAction) {
            // tslint:disable-next-line
            var annotation = this.importedAnnotation;
            for (var i = 0; i < this.pageCount; i++) {
                var isPageAnnotationSaved = false;
                for (var j = 0; j < this.annotationPageList.length; j++) {
                    if (this.annotationPageList[j] === i) {
                        isPageAnnotationSaved = true;
                        break;
                    }
                }
                if (!isPageAnnotationSaved) {
                    if (annotation[i]) {
                        this.importPageList[this.importPageList.length] = i;
                        this.savePageAnnotations(annotation[i], i);
                    }
                }
            }
        }
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.savePageAnnotations = function (annotation, pageIndex) {
        if (annotation.textMarkupAnnotation.length !== 0) {
            for (var s = 0; s < annotation.textMarkupAnnotation.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.saveImportedTextMarkupAnnotations(annotation.textMarkupAnnotation[s], pageIndex);
            }
        }
        if (annotation.shapeAnnotation.length !== 0) {
            for (var s = 0; s < annotation.shapeAnnotation.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.shapeAnnotationModule.saveImportedShapeAnnotations(annotation.shapeAnnotation[s], pageIndex);
            }
        }
        if (annotation.measureShapeAnnotation.length !== 0) {
            for (var s = 0; s < annotation.measureShapeAnnotation.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.measureAnnotationModule.saveImportedMeasureAnnotations(annotation.measureShapeAnnotation[s], pageIndex);
            }
        }
        if (annotation.stampAnnotations.length !== 0) {
            for (var s = 0; s < annotation.stampAnnotations.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.stampAnnotationModule.saveImportedStampAnnotations(annotation.stampAnnotations[s], pageIndex);
            }
        }
        if (annotation.stickyNotesAnnotation.length !== 0) {
            for (var s = 0; s < annotation.stickyNotesAnnotation.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveImportedStickyNotesAnnotations(annotation.stickyNotesAnnotation[s], pageIndex);
            }
        }
        if (annotation.freeTextAnnotation.length !== 0) {
            for (var s = 0; s < annotation.freeTextAnnotation.length; s++) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotationModule.freeTextAnnotationModule.saveImportedFreeTextAnnotations(annotation.freeTextAnnotation[s], pageIndex);
            }
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewerBase.prototype.createAnnotationJsonData = function () {
        // tslint:disable-next-line
        var annotationCollection = {};
        var textMarkupAnnotationCollection;
        var shapeAnnotations;
        var calibrateAnnotations;
        var stampAnnotationCollection;
        var stickyAnnotationCollection;
        var freeTextAnnotationCollection;
        this.saveImportedAnnotations();
        if (this.isTextMarkupAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            textMarkupAnnotationCollection = this.pdfViewer.annotationModule.textMarkupAnnotationModule.saveTextMarkupAnnotations();
        }
        if (this.isShapeAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            shapeAnnotations = this.pdfViewer.annotationModule.shapeAnnotationModule.saveShapeAnnotations();
        }
        if (this.isCalibrateAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            calibrateAnnotations = this.pdfViewer.annotationModule.measureAnnotationModule.saveMeasureShapeAnnotations();
        }
        if (this.isStampAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            stampAnnotationCollection = this.pdfViewer.annotationModule.stampAnnotationModule.saveStampAnnotations();
        }
        if (this.isCommentAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            stickyAnnotationCollection = this.pdfViewer.annotationModule.stickyNotesAnnotationModule.saveStickyAnnotations();
        }
        if (this.isFreeTextAnnotationModule()) {
            // tslint:disable-next-line:max-line-length
            freeTextAnnotationCollection = this.pdfViewer.annotationModule.freeTextAnnotationModule.saveFreeTextAnnotations();
        }
        for (var s = 0; s < this.pageCount; s++) {
            // tslint:disable-next-line:max-line-length
            var annotation = {
                textMarkupAnnotation: JSON.parse(textMarkupAnnotationCollection)[s], shapeAnnotation: JSON.parse(shapeAnnotations)[s],
                measureShapeAnnotation: JSON.parse(calibrateAnnotations)[s], stampAnnotations: JSON.parse(stampAnnotationCollection)[s],
                // tslint:disable-next-line:max-line-length
                stickyNotesAnnotation: JSON.parse(stickyAnnotationCollection)[s], freeTextAnnotation: JSON.parse(freeTextAnnotationCollection)[s]
            };
            annotationCollection[s] = annotation;
        }
        return JSON.stringify(annotationCollection);
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.combineImportedData = function (excistingImportAnnotation, newlyImportAnnotation) {
        for (var i = 0; i < this.pageCount; i++) {
            if (newlyImportAnnotation[i]) {
                if (excistingImportAnnotation[i]) {
                    if (newlyImportAnnotation[i].textMarkupAnnotation.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].textMarkupAnnotation = this.checkImportedData(excistingImportAnnotation[i].textMarkupAnnotation, newlyImportAnnotation[i].textMarkupAnnotation, i);
                        if (newlyImportAnnotation[i].textMarkupAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].textMarkupAnnotation = excistingImportAnnotation[i].textMarkupAnnotation.concat(newlyImportAnnotation[i].textMarkupAnnotation);
                        }
                    }
                    if (newlyImportAnnotation[i].shapeAnnotation.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].shapeAnnotation = this.checkImportedData(excistingImportAnnotation[i].shapeAnnotation, newlyImportAnnotation[i].shapeAnnotation, i);
                        if (newlyImportAnnotation[i].shapeAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].shapeAnnotation = excistingImportAnnotation[i].shapeAnnotation.concat(newlyImportAnnotation[i].shapeAnnotation);
                        }
                    }
                    if (newlyImportAnnotation[i].measureShapeAnnotation.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].measureShapeAnnotation = this.checkImportedData(excistingImportAnnotation[i].measureShapeAnnotation, newlyImportAnnotation[i].measureShapeAnnotation, i);
                        if (newlyImportAnnotation[i].measureShapeAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].measureShapeAnnotation = excistingImportAnnotation[i].measureShapeAnnotation.concat(newlyImportAnnotation[i].measureShapeAnnotation);
                        }
                    }
                    if (newlyImportAnnotation[i].stampAnnotations.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].stampAnnotations = this.checkImportedData(excistingImportAnnotation[i].stampAnnotations, newlyImportAnnotation[i].stampAnnotations, i);
                        if (newlyImportAnnotation[i].stampAnnotations.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].stampAnnotations = excistingImportAnnotation[i].stampAnnotations.concat(newlyImportAnnotation[i].stampAnnotations);
                        }
                    }
                    if (newlyImportAnnotation[i].stickyNotesAnnotation.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].stickyNotesAnnotation = this.checkImportedData(excistingImportAnnotation[i].stickyNotesAnnotation, newlyImportAnnotation[i].stickyNotesAnnotation, i);
                        if (newlyImportAnnotation[i].stickyNotesAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].stickyNotesAnnotation = excistingImportAnnotation[i].stickyNotesAnnotation.concat(newlyImportAnnotation[i].stickyNotesAnnotation);
                        }
                    }
                    if (newlyImportAnnotation[i].freeTextAnnotation.length !== 0) {
                        // tslint:disable-next-line:max-line-length
                        newlyImportAnnotation[i].freeTextAnnotation = this.checkImportedData(excistingImportAnnotation[i].freeTextAnnotation, newlyImportAnnotation[i].freeTextAnnotation, i);
                        if (newlyImportAnnotation[i].freeTextAnnotation.length !== 0) {
                            // tslint:disable-next-line:max-line-length
                            excistingImportAnnotation[i].freeTextAnnotation = excistingImportAnnotation[i].freeTextAnnotation.concat(newlyImportAnnotation[i].freeTextAnnotation);
                        }
                    }
                }
                else {
                    // tslint:disable-next-line:max-line-length
                    var annotation = {
                        textMarkupAnnotation: newlyImportAnnotation[i].textMarkupAnnotation, shapeAnnotation: newlyImportAnnotation[i].shapeAnnotation,
                        // tslint:disable-next-line:max-line-length
                        measureShapeAnnotation: newlyImportAnnotation[i].measureShapeAnnotation, stampAnnotations: newlyImportAnnotation[i].stampAnnotations,
                        stickyNotesAnnotation: newlyImportAnnotation[i].stickyNotesAnnotation, freeTextAnnotation: newlyImportAnnotation[i].freeTextAnnotation
                    };
                    excistingImportAnnotation[i] = annotation;
                }
            }
        }
        return excistingImportAnnotation;
    };
    PdfViewerBase.prototype.updateExportItem = function () {
        // tslint:disable-next-line
        var shapeObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape');
        // tslint:disable-next-line
        var measureObject = window.sessionStorage.getItem(this.documentId + '_annotations_shape_measure');
        // tslint:disable-next-line
        var stampObject = window.sessionStorage.getItem(this.documentId + '_annotations_stamp');
        // tslint:disable-next-line
        var stickyObject = window.sessionStorage.getItem(this.documentId + '_annotations_sticky');
        // tslint:disable-next-line
        var textMarkupObject = window.sessionStorage.getItem(this.documentId + '_annotations_textMarkup');
        // tslint:disable-next-line
        var freeTextObject = window.sessionStorage.getItem(this.documentId + '_annotations_freetext');
        if (shapeObject || measureObject || stampObject || stickyObject || textMarkupObject || freeTextObject || this.isImportAction) {
            return true;
        }
        else {
            return false;
        }
    };
    PdfViewerBase.prototype.isFreeTextAnnotation = function (annotations) {
        var resut = false;
        if (annotations && annotations.length > 0) {
            resut = annotations.some(function (s) { return s.shapeAnnotationType === 'FreeText' && s.subject === 'Text Box'; });
        }
        return resut;
    };
    // tslint:disable-next-line
    PdfViewerBase.prototype.checkImportedData = function (existingCollection, newCollection, pageIndex) {
        for (var i = 0; i < existingCollection.length; i++) {
            for (var j = 0; j < newCollection.length; j++) {
                if (existingCollection[i].AnnotName === newCollection[j].AnnotName) {
                    newCollection.splice(j);
                }
            }
        }
        if (this.annotationComments) {
            // tslint:disable-next-line
            var annotationCollections = this.annotationComments[pageIndex];
            if (annotationCollections) {
                for (var i = 0; i < annotationCollections.length; i++) {
                    for (var j = 0; j < newCollection.length; j++) {
                        if (annotationCollections[i].AnnotName === newCollection[j].AnnotName) {
                            newCollection.splice(j);
                        }
                    }
                }
            }
        }
        return newCollection;
    };
    /**
     * @private
     */
    PdfViewerBase.prototype.deleteAnnotations = function () {
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotations = [];
            this.pdfViewer.zIndexTable = [];
            this.annotationComments = null;
            window.sessionStorage.removeItem(this.documentId + '_annotations_shape');
            window.sessionStorage.removeItem(this.documentId + '_annotations_shape_measure');
            window.sessionStorage.removeItem(this.documentId + '_annotations_stamp');
            window.sessionStorage.removeItem(this.documentId + '_annotations_sticky');
            window.sessionStorage.removeItem(this.documentId + '_annotations_textMarkup');
            window.sessionStorage.removeItem(this.documentId + '_annotations_freetext');
            for (var i = 0; i < this.pageCount; i++) {
                this.pdfViewer.annotationModule.renderAnnotations(i, null, null, null);
                this.pdfViewer.renderDrawing(undefined, i);
                this.pdfViewer.clearSelection(i);
                var accordionContent = document.getElementById(this.pdfViewer.element.id + '_accordionContainer' + (i + 1));
                if (accordionContent) {
                    accordionContent.remove();
                }
                // tslint:disable-next-line:max-line-length
                var accordionContentContainer = document.getElementById(this.pdfViewer.element.id + '_accordionContentContainer');
                if (accordionContentContainer) {
                    if (accordionContentContainer.childElementCount === 0) {
                        accordionContentContainer.style.display = 'none';
                        if (document.getElementById(this.pdfViewer.element.id + '_commentsPanelText')) {
                            // tslint:disable-next-line:max-line-length
                            this.navigationPane.annotationMenuObj.enableItems([this.pdfViewer.localeObj.getConstant('Export Annotations')], false);
                            document.getElementById(this.pdfViewer.element.id + '_commentsPanelText').style.display = 'block';
                        }
                    }
                }
            }
            this.isImportedAnnotation = false;
            this.isImportAction = false;
            this.importedAnnotation = [];
            this.annotationPageList = [];
            this.pdfViewer.annotationModule.freeTextAnnotationModule.freeTextPageNumbers = [];
            this.pdfViewer.annotationModule.stampAnnotationModule.stampPageNumber = [];
            this.isAnnotationCollectionRemoved = true;
        }
    };
    return PdfViewerBase;
}());
export { PdfViewerBase };
