import { TextPosition, ImageFormat } from '../selection/selection-helper';
import { ParagraphWidget, LineWidget, ElementBox, TextElementBox, Margin, ImageElementBox, BlockWidget, BlockContainer, BodyWidget, TableWidget, TableCellWidget, TableRowWidget, Widget, ListTextElementBox, BookmarkElementBox, HeaderFooterWidget, FieldTextElementBox, TabElementBox, EditRangeStartElementBox, EditRangeEndElementBox } from '../viewer/page';
import { WCharacterFormat } from '../format/character-format';
import { HelperMethods, Base64 } from './editor-helper';
import { isNullOrUndefined, Browser, classList, L10n } from '@syncfusion/ej2-base';
import { WParagraphFormat, WSectionFormat, WListFormat, WTableFormat, WRowFormat, WCellFormat, WBorder, WBorders, WTabStop } from '../index';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { WListLevel } from '../list/list-level';
import { WLevelOverride } from '../list/level-override';
import { FieldElementBox } from '../viewer/page';
import { XmlHttpRequestHandler } from '../../base/index';
import { WCharacterStyle } from '../format/style';
import { TableResizer } from './table-resizer';
import { WParagraphStyle } from '../format/style';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * Editor module
 */
var Editor = /** @class */ (function () {
    /**
     * Initialize the editor module
     * @param  {LayoutViewer} viewer
     * @private
     */
    function Editor(viewer) {
        var _this = this;
        this.nodes = [];
        this.editHyperlinkInternal = false;
        this.startParagraph = undefined;
        this.endParagraph = undefined;
        this.removeEditRange = false;
        /**
         * @private
         */
        this.isHandledComplex = false;
        /**
         * @private
         */
        this.tableResize = undefined;
        /**
         * @private
         */
        this.tocStyles = {};
        this.refListNumber = undefined;
        this.incrementListNumber = -1;
        this.removedBookmarkElements = [];
        /**
         * @private
         */
        this.tocBookmarkId = 0;
        /**
         * @private
         */
        this.copiedData = undefined;
        this.pageRefFields = {};
        this.delBlockContinue = false;
        this.delBlock = undefined;
        this.delSection = undefined;
        /**
         * @private
         */
        this.isInsertingTOC = false;
        this.editStartRangeCollection = [];
        /* tslint:disable:no-any */
        this.copiedContent = '';
        /* tslint:enable:no-any */
        this.copiedTextContent = '';
        this.pasteTextPosition = undefined;
        this.isSkipHistory = false;
        this.isPaste = false;
        this.isPasteListUpdated = false;
        /**
         * @private
         */
        this.isBordersAndShadingDialog = false;
        /**
         * @private
         */
        this.onTextInputInternal = function (event) {
            if (Browser.isDevice) {
                var viewer = _this.viewer;
                var nbsp = new RegExp(String.fromCharCode(160), 'g');
                var lineFeed = new RegExp(String.fromCharCode(10), 'g');
                viewer.prefix = viewer.prefix.replace(nbsp, ' ').replace(lineFeed, ' ');
                var text = viewer.editableDiv.textContent.replace(nbsp, ' ').replace(lineFeed, ' ');
                var textBoxText = text.substring(2);
                if (viewer.isCompositionStart && viewer.isCompositionUpdated) {
                    viewer.isCompositionUpdated = false;
                    if (!viewer.owner.isReadOnlyMode && viewer.owner.isDocumentLoaded) {
                        if (viewer.prefix.substring(2) !== textBoxText) {
                            if (_this.selection.isEmpty) {
                                // tslint:disable-next-line:max-line-length
                                _this.selection.start.setPositionForLineWidget(viewer.selection.start.currentWidget, _this.selection.start.offset - (viewer.prefix.length - 2));
                                _this.handleTextInput(textBoxText);
                                viewer.prefix = '@' + String.fromCharCode(160) + textBoxText;
                            }
                            else {
                                _this.handleTextInput(textBoxText);
                                viewer.prefix = '@' + String.fromCharCode(160) + textBoxText;
                            }
                        }
                    }
                    return;
                }
                else if (viewer.isCompositionStart && viewer.isCompositionEnd && viewer.suffix === '') {
                    if (viewer.prefix.substring(2) !== textBoxText) {
                        if (_this.selection.isEmpty && viewer.isCompositionStart) {
                            viewer.isCompositionStart = false;
                            // tslint:disable-next-line:max-line-length
                            _this.selection.start.setPositionForLineWidget(viewer.selection.start.currentWidget, _this.selection.start.offset - viewer.prefix.substring(2).length);
                            _this.selection.retrieveCurrentFormatProperties();
                            if (viewer.suffix === '' || textBoxText === '') {
                                _this.handleTextInput(textBoxText);
                            }
                        }
                        else if (!_this.selection.isEmpty) {
                            viewer.isCompositionStart = false;
                            _this.handleTextInput(textBoxText);
                        }
                    }
                    else if (textBoxText === '') {
                        viewer.isCompositionStart = false;
                        _this.handleBackKey();
                    }
                    else if (viewer.prefix.substring(2) === textBoxText && viewer.suffix === '') {
                        viewer.isCompositionStart = false;
                        _this.handleTextInput(' ');
                    }
                    viewer.isCompositionEnd = false;
                    return;
                }
                else if (viewer.isCompositionEnd || viewer.isCompositionStart && !viewer.isCompositionUpdated) {
                    if (textBoxText.length < viewer.prefix.length &&
                        textBoxText === viewer.prefix.substring(2, viewer.prefix.length - 1) || viewer.editableDiv.innerText.length < 2) {
                        _this.handleBackKey();
                        return;
                    }
                    else if (viewer.suffix !== '' &&
                        viewer.editableDiv.innerText[viewer.editableDiv.innerText.length - 1] !== String.fromCharCode(160)) {
                        viewer.isCompositionStart = false;
                        //When cursor is placed in between a word and chosen a word from predicted words.
                        // tslint:disable-next-line:max-line-length
                        _this.selection.start.setPositionForLineWidget(viewer.selection.start.currentWidget, _this.selection.start.offset - (viewer.prefix.length - 2));
                        _this.selection.end.setPositionForLineWidget(viewer.selection.end.currentWidget, _this.selection.end.offset + viewer.suffix.length);
                        //Retrieve the character format properties. Since the selection was changed manually.
                        _this.selection.retrieveCurrentFormatProperties();
                        _this.handleTextInput(textBoxText);
                        return;
                    }
                }
                // tslint:disable-next-line:max-line-length
                if (text !== '\r' && text !== '\b' && text !== '\u001B' && !viewer.owner.isReadOnlyMode && viewer.isControlPressed === false) {
                    if (text === '@' || text[0] !== '@' || text === '' || text.length < viewer.prefix.length &&
                        textBoxText === viewer.prefix.substring(2, viewer.prefix.length - 1)) {
                        _this.handleBackKey();
                        if (viewer.editableDiv.innerText.length < 2) {
                            _this.predictText();
                        }
                    }
                    else if (text.indexOf(viewer.prefix) === 0 && text.length > viewer.prefix.length) {
                        _this.handleTextInput(text.substring(viewer.prefix.length));
                    }
                    else if (text.indexOf(viewer.prefix) === -1 && text[text.length - 1] !== String.fromCharCode(160)
                        && text[text.length - 1] !== ' ') {
                        if ((textBoxText.charAt(0).toLowerCase() + textBoxText.slice(1)) === viewer.prefix.substring(2)) {
                            // tslint:disable-next-line:max-line-length
                            _this.selection.start.setPositionParagraph(viewer.selection.start.currentWidget, _this.selection.start.offset - (viewer.prefix.length - 2));
                        }
                        _this.handleTextInput(textBoxText);
                    }
                    else if (text.length !== 2) {
                        _this.handleTextInput(' ');
                    }
                }
            }
            else {
                var text = _this.viewer.editableDiv.innerText;
                if (text !== String.fromCharCode(160)) {
                    // tslint:disable-next-line:max-line-length
                    if (text !== '\r' && text !== '\b' && text !== '\u001B' && !_this.owner.isReadOnlyMode && _this.viewer.isControlPressed === false) {
                        _this.handleTextInput(text);
                    }
                }
                else {
                    _this.handleTextInput(' ');
                }
                _this.viewer.editableDiv.innerText = '';
            }
        };
        /**
         * Fired on paste.
         * @param {ClipboardEvent} event
         * @private
         */
        this.onPaste = function (event) {
            if (!_this.owner.isReadOnlyMode) {
                _this.pasteInternal(event);
            }
            event.preventDefault();
        };
        this.viewer = viewer;
        this.tableResize = new TableResizer(this.viewer.owner);
        this.base64 = new Base64();
    }
    Object.defineProperty(Editor.prototype, "restrictFormatting", {
        /**
         * @private
         */
        get: function () {
            return this.viewer.isDocumentProtected && (this.viewer.restrictFormatting
                || (!this.viewer.restrictFormatting && !this.selection.isSelectionIsAtEditRegion(false)));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "restrictEditing", {
        /**
         * @private
         */
        get: function () {
            return this.viewer.isDocumentProtected && this.viewer.protectionType === 'ReadOnly'
                && !this.selection.isSelectionIsAtEditRegion(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "editorHistory", {
        get: function () {
            return this.viewer.owner.editorHistory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "selection", {
        get: function () {
            if (this.viewer) {
                return this.viewer.selection;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editor.prototype, "owner", {
        get: function () {
            return this.viewer.owner;
        },
        enumerable: true,
        configurable: true
    });
    Editor.prototype.getModuleName = function () {
        return 'Editor';
    };
    /**
     * Inserts the specified field at cursor position
     * @param code
     * @param result
     */
    Editor.prototype.insertField = function (code, result) {
        var fieldCode = code;
        if (isNullOrUndefined(result)) {
            fieldCode = HelperMethods.trimStart(fieldCode);
            if (fieldCode.substring(0, 10) === 'MERGEFIELD') {
                fieldCode = fieldCode.substring(10).trim();
                var index = fieldCode.indexOf('\\*');
                result = '«' + fieldCode.substring(0, index).trim() + '»';
            }
        }
        var paragraph = new ParagraphWidget();
        var insertFormat = new WCharacterFormat();
        var selectionFormat = this.copyInsertFormat(insertFormat, false);
        var line = new LineWidget(paragraph);
        var fieldBegin = new FieldElementBox(0);
        fieldBegin.characterFormat.mergeFormat(selectionFormat);
        line.children.push(fieldBegin);
        var fieldCodeSpan = new TextElementBox();
        fieldCodeSpan.text = code;
        line.children.push(fieldCodeSpan);
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.fieldBegin = fieldBegin;
        fieldBegin.fieldSeparator = fieldSeparator;
        line.children.push(fieldSeparator);
        var fieldResultSpan = new TextElementBox();
        fieldResultSpan.text = result;
        fieldResultSpan.characterFormat.mergeFormat(selectionFormat);
        line.children.push(fieldResultSpan);
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.characterFormat.mergeFormat(selectionFormat);
        fieldEnd.fieldSeparator = fieldSeparator;
        fieldEnd.fieldBegin = fieldBegin;
        fieldBegin.fieldEnd = fieldEnd;
        fieldSeparator.fieldEnd = fieldEnd;
        line.children.push(fieldEnd);
        fieldBegin.line = line;
        paragraph.childWidgets.push(line);
        this.viewer.fields.push(fieldBegin);
        var widgets = [];
        widgets.push(paragraph);
        this.pasteContentsInternal(widgets);
    };
    /**
     * To update style for paragraph
     * @param style - style name
     * @param clearDirectFormatting - Removes manual formatting (formatting not applied using a style)
     * from the selected text, to match the formatting of the applied style. Default value is false.
     */
    Editor.prototype.applyStyle = function (style, clearDirectFormatting) {
        clearDirectFormatting = isNullOrUndefined(clearDirectFormatting) ? false : clearDirectFormatting;
        if (clearDirectFormatting) {
            this.initComplexHistory('ApplyStyle');
            this.clearFormatting();
        }
        var styleObj = this.viewer.styles.findByName(style);
        if (styleObj !== undefined) {
            this.onApplyParagraphFormat('styleName', styleObj, false, true);
        }
        else {
            // tslint:disable-next-line:max-line-length
            this.viewer.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), JSON.parse(this.viewer.preDefinedStyles.get(style)), this.viewer.styles);
            this.applyStyle(style);
        }
        if (this.editorHistory && this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action === 'ApplyStyle') {
            this.editorHistory.updateComplexHistory();
        }
    };
    // Public Implementation Starts
    /**
     * Moves the selected content in the document editor control to clipboard.
     */
    Editor.prototype.cut = function () {
        if (this.owner.isReadOnlyMode || this.selection.isEmpty) {
            return;
        }
        this.selection.copySelectedContent(true);
    };
    /**
     * Insert editing region in current selection range.
     */
    Editor.prototype.insertEditingRegion = function (user) {
        this.insertEditRangeElement(user && user !== '' ? user : 'Everyone');
    };
    /**
     * Enforce document protection.
     */
    Editor.prototype.enforceProtection = function (credential, limitToFormatting, isReadOnly) {
        this.viewer.restrictFormatting = limitToFormatting;
        this.viewer.protectionType = isReadOnly ? 'ReadOnly' : this.viewer.protectionType;
        this.selection.isHighlightEditRegion = true;
        this.addProtection(credential);
    };
    /**
     * @private
     */
    Editor.prototype.addProtection = function (password) {
        var enforceProtectionHandler = new XmlHttpRequestHandler();
        var passwordBase64 = this.base64.encodeString(password);
        /* tslint:disable:no-any */
        var formObject = {
            passwordBase64: passwordBase64,
            saltBase64: '',
            spinCount: 100000
        };
        /* tslint:enable:no-any */
        var url = this.owner.serviceUrl + this.owner.serverActionSettings.restrictEditing;
        enforceProtectionHandler.url = url;
        enforceProtectionHandler.contentType = 'application/json;charset=UTF-8';
        enforceProtectionHandler.onSuccess = this.enforceProtectionInternal.bind(this);
        enforceProtectionHandler.onFailure = this.protectionFailureHandler.bind(this);
        enforceProtectionHandler.onError = this.protectionFailureHandler.bind(this);
        enforceProtectionHandler.send(formObject);
    };
    /* tslint:disable:no-any */
    Editor.prototype.protectionFailureHandler = function (result) {
        var localeValue = new L10n('documenteditor', this.owner.defaultLocale);
        localeValue.setLocale(this.viewer.owner.locale);
        if (result.name === 'onError') {
            DialogUtility.alert(localeValue.getConstant('Error in establishing connection with web server'));
        }
        else {
            console.error(result.statusText);
        }
    };
    Editor.prototype.enforceProtectionInternal = function (result) {
        var data = JSON.parse(result.data);
        this.viewer.saltValue = data[0];
        this.viewer.hashValue = data[1];
        this.protectDocument();
    };
    /* tslint:enable:no-any */
    Editor.prototype.protectDocument = function () {
        this.protect(this.viewer.protectionType);
        var restrictPane = this.viewer.restrictEditingPane.restrictPane;
        if (restrictPane && restrictPane.style.display === 'block') {
            this.viewer.restrictEditingPane.showStopProtectionPane(true);
            this.viewer.restrictEditingPane.loadPaneValue();
            this.viewer.dialog.hide();
        }
    };
    /**
     * Stop document protection.
     */
    /* tslint:disable:no-any */
    Editor.prototype.stopProtection = function (password) {
        if (this.viewer.isDocumentProtected) {
            var unProtectDocumentHandler = new XmlHttpRequestHandler();
            var passwordBase64 = this.base64.encodeString(password);
            var formObject = {
                passwordBase64: passwordBase64,
                saltBase64: this.viewer.saltValue,
                spinCount: 100000
            };
            unProtectDocumentHandler.url = this.owner.serviceUrl + this.owner.serverActionSettings.restrictEditing;
            unProtectDocumentHandler.contentType = 'application/json;charset=UTF-8';
            unProtectDocumentHandler.onSuccess = this.onUnProtectionSuccess.bind(this);
            unProtectDocumentHandler.onFailure = this.protectionFailureHandler.bind(this);
            unProtectDocumentHandler.onError = this.protectionFailureHandler.bind(this);
            unProtectDocumentHandler.send(formObject);
        }
    };
    Editor.prototype.onUnProtectionSuccess = function (result) {
        var encodeString = JSON.parse(result.data);
        this.validateHashValue(encodeString[1]);
    };
    /* tslint:enable:no-any */
    Editor.prototype.validateHashValue = function (currentHashValue) {
        var localeValue = new L10n('documenteditor', this.owner.defaultLocale);
        localeValue.setLocale(this.viewer.owner.locale);
        var decodeUserHashValue = this.base64.decodeString(currentHashValue);
        var documentHashValue = this.viewer.hashValue;
        var defaultHashValue = this.base64.decodeString(documentHashValue);
        var stopProtection = true;
        if (decodeUserHashValue.length === defaultHashValue.length) {
            for (var i = 0; i < decodeUserHashValue.length; i++) {
                if (decodeUserHashValue[i] !== defaultHashValue[i]) {
                    stopProtection = false;
                    break;
                }
            }
        }
        else {
            stopProtection = false;
        }
        if (stopProtection) {
            this.viewer.isDocumentProtected = false;
            this.viewer.restrictFormatting = false;
            this.viewer.selection.highlightEditRegion();
            var restrictPane = this.viewer.restrictEditingPane.restrictPane;
            if (restrictPane && restrictPane.style.display === 'block') {
                this.viewer.restrictEditingPane.showStopProtectionPane(false);
            }
            this.viewer.dialog.hide();
        }
        else {
            DialogUtility.alert(localeValue.getConstant('The password is incorrect'));
        }
    };
    /**
     * Notify content change event
     * @private
     */
    Editor.prototype.fireContentChange = function () {
        if (this.selection.isHighlightEditRegion) {
            this.selection.onHighlight();
        }
        if (!this.isPaste) {
            this.copiedContent = undefined;
            this.copiedTextContent = '';
            this.selection.isViewPasteOptions = false;
            if (this.isPasteListUpdated) {
                this.isPasteListUpdated = false;
            }
            this.selection.showHidePasteOptions(undefined, undefined);
        }
        if (this.viewer.owner.isLayoutEnabled && !this.viewer.owner.isShiftingEnabled) {
            this.viewer.owner.fireContentChange();
        }
    };
    /**
     * Update physical location for text position
     * @private
     */
    Editor.prototype.updateSelectionTextPosition = function (isSelectionChanged) {
        this.getOffsetValue(this.selection);
        this.selection.start.updatePhysicalPosition(true);
        if (this.selection.isEmpty) {
            this.selection.end.setPositionInternal(this.selection.start);
        }
        else {
            this.selection.end.updatePhysicalPosition(true);
        }
        this.selection.upDownSelectionLength = this.selection.end.location.x;
        this.selection.fireSelectionChanged(isSelectionChanged);
    };
    /**
     * Predict text
     * @private
     */
    Editor.prototype.predictText = function () {
        this.viewer.suffix = '';
        if (this.selection.start.paragraph.isEmpty() || this.selection.start.offset === 0 &&
            this.selection.start.currentWidget.isFirstLine() || this.selection.end.offset === 0 &&
            this.selection.end.currentWidget.isFirstLine()) {
            this.viewer.prefix = '';
        }
        else {
            this.getPrefixAndSuffix();
        }
        this.viewer.prefix = '@' + String.fromCharCode(160) + this.viewer.prefix; // &nbsp;
        this.viewer.editableDiv.innerText = this.viewer.prefix;
        this.viewer.selection.setEditableDivCaretPosition(this.viewer.prefix.length);
    };
    /**
     * Gets prefix and suffix.
     * @private
     */
    /* tslint:disable:max-func-body-length */
    Editor.prototype.getPrefixAndSuffix = function () {
        var viewer = this.viewer;
        if (this.selection.text !== '') {
            viewer.prefix = '';
            return;
        }
        else {
            var startIndex = 0;
            var inlineInfo = this.selection.start.currentWidget.getInline(this.selection.start.offset, startIndex);
            var inline = inlineInfo.element;
            startIndex = inlineInfo.index;
            if (inline !== undefined) {
                var boxInfo = this.selection.getElementBoxInternal(inline, startIndex);
                var box = boxInfo.element;
                startIndex = boxInfo.index;
                var spaceIndex = 0;
                if (!isNullOrUndefined(box)) {
                    var prefixAdded = false;
                    if (box instanceof TextElementBox && startIndex > 0 && box.line.isFirstLine()) {
                        viewer.prefix = '';
                    }
                    if (!(inline instanceof TextElementBox)) {
                        inline = this.selection.getPreviousTextElement(inline);
                    }
                    /* tslint:disable:no-conditional-assignment */
                    while ((spaceIndex = viewer.prefix.lastIndexOf(' ')) < 0 && inline instanceof TextElementBox) {
                        if (inline.previousNode instanceof TextElementBox && viewer.prefix.indexOf(' ') === -1) {
                            if (!prefixAdded) {
                                viewer.prefix = inline.text.substring(0, startIndex);
                                prefixAdded = true;
                            }
                            else {
                                viewer.prefix = inline.text + viewer.prefix;
                            }
                            inline = inline.previousNode;
                            // If the line has no elements then break the loop to avoid the exception.
                            if (inline instanceof ListTextElementBox) {
                                break;
                            }
                            if (!(inline instanceof TextElementBox)) {
                                inline = this.selection.getPreviousTextElement(inline);
                            }
                        }
                        else if (!(inline.previousNode instanceof TextElementBox)) {
                            if (!prefixAdded) {
                                viewer.prefix = inline.text.substring(0, startIndex);
                                prefixAdded = true;
                            }
                            else {
                                viewer.prefix = inline.text + viewer.prefix;
                            }
                            break;
                        }
                    }
                    if (!(viewer.prefix.length > 1 && viewer.prefix[viewer.prefix.length - 1] === ' ' &&
                        viewer.prefix[viewer.prefix.length - 2] === '.')) {
                        spaceIndex = viewer.prefix.lastIndexOf(' ');
                    }
                    else {
                        spaceIndex = -1;
                        viewer.prefix = '';
                    }
                    viewer.prefix = spaceIndex < 0 ? viewer.prefix : viewer.prefix.substring(spaceIndex);
                    if (viewer.prefix.indexOf(' ') === 0 && viewer.prefix.length >= 1) {
                        viewer.prefix = viewer.prefix.substring(1);
                    }
                    // suffix text prediction
                    var endIndex = 0;
                    var endInlineInfo = this.selection.end.currentWidget.getInline(this.selection.end.offset, endIndex);
                    var endInline = endInlineInfo.element;
                    endIndex = endInlineInfo.index;
                    boxInfo = this.selection.getElementBoxInternal(endInline, endIndex);
                    box = boxInfo.element;
                    endIndex = boxInfo.index;
                    if (box) {
                        var suffixAdded = false;
                        if (box instanceof TextElementBox && endIndex < box.length) {
                            viewer.suffix = '';
                        }
                        // boxIndex = renderedElements.get(endInline).indexOf(box);
                        while ((spaceIndex = viewer.suffix.indexOf(' ')) < 0 && endInline instanceof TextElementBox) {
                            if (endInline.nextNode instanceof TextElementBox && viewer.suffix.indexOf(' ') === -1) {
                                if (!suffixAdded) {
                                    viewer.suffix = box.text.substring(endIndex);
                                    suffixAdded = true;
                                }
                                else {
                                    viewer.suffix = viewer.suffix + endInline.text;
                                }
                                endInline = endInline.nextNode;
                            }
                            else if (!(endInline.nextNode instanceof TextElementBox)) {
                                if (!suffixAdded) {
                                    viewer.suffix = box.text.substring(endIndex);
                                    suffixAdded = true;
                                }
                                else {
                                    viewer.suffix = viewer.suffix + endInline.text;
                                }
                                break;
                            }
                        }
                        spaceIndex = viewer.suffix.indexOf(' ');
                        viewer.suffix = spaceIndex < 0 ? viewer.suffix : viewer.suffix.substring(0, spaceIndex);
                    }
                }
            }
        }
    };
    /**
     * key action
     * @private
     */
    // tslint:disable:max-func-body-length
    Editor.prototype.onKeyDownInternal = function (event, ctrl, shift, alt) {
        var key = event.which || event.keyCode;
        if (ctrl && !shift && !alt) {
            this.viewer.isControlPressed = true;
            switch (key) {
                case 9:
                    event.preventDefault();
                    if (this.owner.acceptTab) {
                        this.selection.handleTabKey(false, false);
                    }
                    break;
                case 13:
                    event.preventDefault();
                    this.insertPageBreak();
                    break;
                case 48:
                    event.preventDefault();
                    this.onApplyParagraphFormat('beforeSpacing', 0, false, false);
                    break;
                case 49:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyParagraphFormat('lineSpacing', 1, false, false);
                    }
                    break;
                case 50:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyParagraphFormat('lineSpacing', 2, false, false);
                    }
                    break;
                case 53:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyParagraphFormat('lineSpacing', 1.5, false, false);
                    }
                    break;
                case 66:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleBold();
                    }
                    break;
                case 68:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.fontDialogModule) {
                        this.owner.fontDialogModule.showFontDialog();
                    }
                    break;
                case 69:
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleTextAlignment('Center');
                    }
                    event.preventDefault();
                    break;
                case 72:
                    event.preventDefault();
                    if (!this.owner.isReadOnly && this.owner.optionsPaneModule) {
                        this.owner.optionsPaneModule.isReplace = true;
                        this.owner.optionsPaneModule.showHideOptionsPane(true);
                    }
                    break;
                case 73:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleItalic();
                    }
                    break;
                case 74:
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleTextAlignment('Justify');
                    }
                    event.preventDefault();
                    break;
                case 75:
                    event.preventDefault();
                    if (this.owner.hyperlinkDialogModule && !this.owner.isReadOnlyMode) {
                        this.owner.hyperlinkDialogModule.show();
                    }
                    break;
                case 76:
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleTextAlignment('Left');
                    }
                    event.preventDefault();
                    break;
                case 77:
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.increaseIndent();
                    }
                    event.preventDefault();
                    break;
                case 78:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.openBlank();
                    }
                    break;
                case 82:
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleTextAlignment('Right');
                    }
                    event.preventDefault();
                    break;
                case 85:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.toggleUnderline('Single');
                    }
                    break;
                case 88:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.editor.cut();
                    }
                    break;
                case 89:
                    if (this.owner.enableEditorHistory) {
                        this.editorHistory.redo();
                        event.preventDefault();
                    }
                    break;
                case 90:
                    if (this.owner.enableEditorHistory) {
                        this.editorHistory.undo();
                        event.preventDefault();
                    }
                    break;
                case 219:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'decrement', true);
                    }
                    break;
                case 221:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'increment', true);
                    }
                    break;
                case 187:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleBaselineAlignment('Subscript');
                    }
                    break;
            }
        }
        else if (shift && !ctrl && !alt) {
            switch (key) {
                case 9:
                    event.preventDefault();
                    if (this.owner.acceptTab) {
                        this.selection.handleTabKey(false, true);
                    }
                    break;
                case 13:
                    this.handleShiftEnter();
                    event.preventDefault();
                    break;
            }
        }
        else if (shift && ctrl && !alt) {
            switch (key) {
                case 68:
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.toggleUnderline('Double');
                    }
                    break;
                case 77:
                    if (!this.owner.isReadOnlyMode) {
                        this.owner.selection.decreaseIndent();
                    }
                    event.preventDefault();
                    break;
                case 188:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'decrement', true);
                    }
                    break;
                case 190:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.onApplyCharacterFormat('fontSize', 'increment', true);
                    }
                    break;
                case 187:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode) {
                        this.toggleBaselineAlignment('Superscript');
                    }
            }
        }
        else if (!shift && ctrl && alt) {
            switch (key) {
                case 72:
                    event.preventDefault();
                    if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded) {
                        this.toggleHighlightColor();
                    }
                    break;
            }
        }
        else {
            switch (key) {
                case 8:
                    event.preventDefault();
                    this.handleBackKey();
                    break;
                case 9:
                    event.preventDefault();
                    if (this.owner.acceptTab) {
                        this.selection.handleTabKey(true, false);
                    }
                    break;
                case 13:
                    event.preventDefault();
                    this.viewer.triggerSpellCheck = true;
                    this.handleEnterKey();
                    this.viewer.triggerSpellCheck = false;
                    break;
                case 27:
                    event.preventDefault();
                    if (!this.isPaste) {
                        this.copiedContent = undefined;
                        this.copiedTextContent = '';
                        this.selection.isViewPasteOptions = false;
                        if (this.isPasteListUpdated) {
                            this.isPasteListUpdated = false;
                        }
                        this.selection.showHidePasteOptions(undefined, undefined);
                    }
                    break;
                case 46:
                    this.handleDelete();
                    event.preventDefault();
                    break;
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.handleShiftEnter = function () {
        if (!this.owner.isReadOnlyMode) {
            this.handleTextInput('\v');
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles back key.
     * @private
     */
    Editor.prototype.handleBackKey = function () {
        if (!this.owner.isReadOnlyMode) {
            this.owner.editorModule.onBackSpace();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles delete
     * @private
     */
    Editor.prototype.handleDelete = function () {
        if (!this.owner.isReadOnlyMode) {
            this.owner.editorModule.onDelete();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Handles enter key.
     * @private
     */
    Editor.prototype.handleEnterKey = function () {
        if (!this.owner.isReadOnlyMode) {
            if (Browser.isDevice) {
                this.viewer.isCompositionStart = false;
            }
            this.owner.editorModule.onEnter();
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * @private
     */
    Editor.prototype.handleTextInput = function (text) {
        var _this = this;
        if (!this.owner.isReadOnlyMode) {
            if (this.animationTimer) {
                clearTimeout(this.animationTimer);
            }
            classList(this.selection.caret, [], ['e-de-cursor-animation']);
            this.owner.editorModule.insertText(text);
            /* tslint:disable:align */
            this.animationTimer = setTimeout(function () {
                if (_this.animationTimer) {
                    clearTimeout(_this.animationTimer);
                }
                if (_this.selection && _this.selection.caret) {
                    classList(_this.selection.caret, ['e-de-cursor-animation'], []);
                }
            }, 600);
        }
        this.selection.checkForCursorVisibility();
    };
    /**
     * Copies to format.
     * @param  {WCharacterFormat} format
     * @private
     */
    Editor.prototype.copyInsertFormat = function (format, copy) {
        var insertFormat = new WCharacterFormat();
        var sFormat = this.selection.characterFormat;
        if (copy) {
            insertFormat.copyFormat(format);
        }
        if (!isNullOrUndefined(sFormat.bold) && format.bold !== sFormat.bold) {
            insertFormat.bold = sFormat.bold;
        }
        if (!isNullOrUndefined(sFormat.italic) && format.italic !== sFormat.italic) {
            insertFormat.italic = sFormat.italic;
        }
        if (sFormat.fontSize > 0 && format.fontSize !== sFormat.fontSize) {
            insertFormat.fontSize = sFormat.fontSize;
        }
        if (!isNullOrUndefined(sFormat.fontFamily) && format.fontFamily !== sFormat.fontFamily) {
            insertFormat.fontFamily = sFormat.fontFamily;
        }
        if (!isNullOrUndefined(sFormat.highlightColor) && format.highlightColor !== sFormat.highlightColor) {
            insertFormat.highlightColor = sFormat.highlightColor;
        }
        if (!isNullOrUndefined(sFormat.baselineAlignment) && format.baselineAlignment !== sFormat.baselineAlignment) {
            insertFormat.baselineAlignment = sFormat.baselineAlignment;
        }
        if (!isNullOrUndefined(sFormat.fontColor) && format.fontColor !== sFormat.fontColor) {
            insertFormat.fontColor = sFormat.fontColor;
        }
        if (!isNullOrUndefined(sFormat.underline) && format.underline !== sFormat.underline) {
            insertFormat.underline = sFormat.underline;
        }
        if (!isNullOrUndefined(sFormat.strikethrough) && format.strikethrough !== sFormat.strikethrough) {
            insertFormat.strikethrough = sFormat.strikethrough;
        }
        return insertFormat;
    };
    /**
     * Inserts the specified text at cursor position
     * @param  {string} text - text to insert
     */
    Editor.prototype.insertText = function (text) {
        if (isNullOrUndefined(text) || text === '') {
            return;
        }
        this.insertTextInternal(text, false);
    };
    /**
     * @private
     */
    //tslint:disable: max-func-body-length
    Editor.prototype.insertTextInternal = function (text, isReplace) {
        var selection = this.viewer.selection;
        var insertPosition;
        var isRemoved = true;
        this.isListTextSelected();
        this.initHistory('Insert');
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        selection.editPosition = selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        var bidi = selection.start.paragraph.paragraphFormat.bidi;
        if (!bidi && this.viewer.layout.isContainsRtl(selection.start.currentWidget)) {
            this.viewer.layout.reArrangeElementsForRtl(selection.start.currentWidget, bidi);
        }
        if ((!selection.isEmpty && !selection.isImageSelected) ||
            this.viewer.isListTextSelected && selection.contextType === 'List') {
            selection.isSkipLayouting = true;
            selection.skipFormatRetrieval = true;
            isRemoved = this.removeSelectedContents(selection);
            selection.skipFormatRetrieval = false;
            selection.isSkipLayouting = false;
        }
        else if (selection.isEmpty && !this.viewer.isListTextSelected && !isReplace) {
            this.viewer.isTextInput = true;
        }
        paragraphInfo = this.selection.getParagraphInfo(selection.start);
        if (isRemoved) {
            selection.owner.isShiftingEnabled = true;
            this.updateInsertPosition();
            insertPosition = selection.start;
            if (insertPosition.paragraph.isEmpty()) {
                var span = new TextElementBox();
                var insertFormat = this.copyInsertFormat(insertPosition.paragraph.characterFormat, true);
                span.characterFormat.copyFormat(insertFormat);
                span.text = text;
                var isBidi = this.viewer.textHelper.getRtlLanguage(text).isRtl;
                span.characterFormat.bidi = isBidi;
                span.line = insertPosition.paragraph.childWidgets[0];
                span.margin = new Margin(0, 0, 0, 0);
                span.line.children.push(span);
                if ((insertPosition.paragraph.paragraphFormat.textAlignment === 'Center'
                    || insertPosition.paragraph.paragraphFormat.textAlignment === 'Right') &&
                    insertPosition.paragraph.paragraphFormat.listFormat.listId === -1) {
                    insertPosition.paragraph.x = this.viewer.clientActiveArea.x;
                }
                this.viewer.layout.reLayoutParagraph(insertPosition.paragraph, 0, 0);
            }
            else {
                var indexInInline = 0;
                // tslint:disable-next-line:max-line-length
                var inlineObj = insertPosition.currentWidget.getInline(insertPosition.offset, indexInInline, bidi, (isReplace) ? false : true);
                var inline = inlineObj.element;
                indexInInline = inlineObj.index;
                inline.ischangeDetected = true;
                if (inline instanceof TextElementBox && text !== ' ' && this.viewer.owner.enableSpellCheck) {
                    this.owner.spellChecker.removeErrorsFromCollection({ 'element': inline, 'text': inline.text });
                    if (!isReplace) {
                        inline.ignoreOnceItems = [];
                    }
                }
                if (inline.canTrigger && inline.text.length <= 1) {
                    inline.canTrigger = false;
                }
                // Todo: compare selection format
                var insertFormat = this.copyInsertFormat(inline.characterFormat, true);
                var isBidi = this.viewer.textHelper.getRtlLanguage(text).isRtl;
                var insertLangId = this.viewer.textHelper.getRtlLanguage(text).id;
                var inlineLangId = 0;
                var isRtl = false;
                if (inline instanceof TextElementBox) {
                    inlineLangId = this.viewer.textHelper.getRtlLanguage(inline.text).id;
                    isRtl = this.viewer.textHelper.getRtlLanguage(inline.text).isRtl;
                }
                if (isBidi || !this.viewer.owner.enableSpellCheck) {
                    insertFormat.bidi = isBidi;
                }
                // tslint:disable-next-line:max-line-length
                if ((!this.viewer.owner.enableSpellCheck || (text !== ' ' && inline.text !== ' ')) && insertFormat.isSameFormat(inline.characterFormat) && (!isBidi || (isBidi && insertLangId === inlineLangId))
                    || (text.trim() === '' && !isBidi && inline.characterFormat.bidi)) {
                    this.insertTextInline(inline, selection, text, indexInInline);
                }
                else {
                    var tempSpan = new TextElementBox();
                    tempSpan.text = text;
                    tempSpan.line = inline.line;
                    tempSpan.characterFormat.copyFormat(insertFormat);
                    var insertIndex = inline.indexInOwner;
                    if (indexInInline === inline.length) {
                        var isParaBidi = inline.line.paragraph.bidi;
                        inline.line.children.splice(isParaBidi ? insertIndex : insertIndex + 1, 0, tempSpan);
                    }
                    else if (indexInInline === 0) {
                        if (isRtl && !isBidi) {
                            inline.line.children.splice(insertIndex + 1, 0, tempSpan);
                        }
                        else {
                            inline.line.children.splice(insertIndex, 0, tempSpan);
                        }
                    }
                    else {
                        if (inline instanceof TextElementBox) {
                            var splittedSpan = new TextElementBox();
                            splittedSpan.line = inline.line;
                            splittedSpan.characterFormat.copyFormat(inline.characterFormat);
                            if (bidi && isRtl && !isBidi) {
                                splittedSpan.text = inline.text.slice(0, indexInInline);
                                inline.text = inline.text.substring(indexInInline);
                            }
                            else {
                                splittedSpan.text = inline.text.substring(indexInInline);
                                inline.text = inline.text.slice(0, indexInInline);
                            }
                            if (this.owner.enableSpellCheck) {
                                this.owner.spellChecker.updateSplittedElementError(inline, splittedSpan);
                            }
                            inline.line.children.splice(insertIndex + 1, 0, splittedSpan);
                        }
                        inline.line.children.splice(insertIndex + 1, 0, tempSpan);
                    }
                    this.viewer.layout.reLayoutParagraph(insertPosition.paragraph, inline.line.indexInOwner, 0);
                }
            }
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + text.length, true);
            this.updateEndPosition();
            if (!isNullOrUndefined(this.editorHistory) && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)
                && (this.editorHistory.currentHistoryInfo.action === 'ListSelect') &&
                this.viewer.isListTextSelected) {
                this.editorHistory.updateHistory();
                this.editorHistory.updateComplexHistory();
            }
            this.reLayout(selection);
            this.viewer.isTextInput = false;
        }
        if (!isReplace && isRemoved && (text === ' ' || text === '\t' || text === '\v')) {
            var isList = false;
            if (!(text === '\v')) {
                isList = this.checkAndConvertList(selection, text === '\t');
            }
            if (!isList) {
                if (!isNullOrUndefined(selection.getHyperlinkField())) {
                    return;
                }
                //Checks if the previous text is URL, then it is auto formatted to hyperlink.
                this.checkAndConvertToHyperlink(selection, false);
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.insertIMEText = function (text, isUpdate) {
        if (this.viewer.lastComposedText === text && isUpdate) {
            return;
        }
        // Clone selection start position
        var paragraphInfo = this.selection.getParagraphInfo(this.selection.start);
        var startPosition = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        // Insert IME text in current selection
        this.insertText(text);
        this.viewer.lastComposedText = text;
        // update selection start
        var start = this.selection.start;
        this.setPositionForCurrentIndex(start, startPosition);
        // Update selection end
        var endPosition = new TextPosition(this.owner);
        endPosition.setPositionForLineWidget(start.currentWidget, start.offset + text.length);
        this.selection.selectPosition(isUpdate ? start : endPosition, endPosition);
    };
    /**
     * Insert Section break at cursor position
     */
    Editor.prototype.insertSectionBreak = function () {
        var selection = this.viewer.selection;
        if (isNullOrUndefined(selection) || this.owner.isReadOnlyMode || selection.start.paragraph.isInHeaderFooter) {
            return;
        }
        this.initHistory('SectionBreak');
        if (!selection.isEmpty) {
            selection.selectContent(selection.isForward ? selection.start : selection.end, true);
        }
        this.viewer.owner.isShiftingEnabled = true;
        this.updateInsertPosition();
        this.insertSection(selection, true);
        this.updateEndPosition();
        this.reLayout(selection, true);
    };
    /**
     * @private
     */
    Editor.prototype.insertSection = function (selection, selectFirstBlock) {
        var newSectionFormat = this.selection.start.paragraph.bodyWidget.sectionFormat.cloneFormat();
        var lastBlock;
        var firstBlock;
        if (selection.start.paragraph.isInsideTable) {
            var table = this.viewer.layout.getParentTable(selection.start.paragraph);
            table = table.combineWidget(this.viewer);
            var insertBefore = false;
            if (selection.start.paragraph.associatedCell.rowIndex === 0) {
                insertBefore = true;
            }
            var newParagraph = new ParagraphWidget();
            var previousBlock = table.previousRenderedWidget;
            if (!insertBefore) {
                lastBlock = this.splitTable(table, selection.start.paragraph.associatedCell.ownerRow);
                this.viewer.layout.layoutBodyWidgetCollection(lastBlock.index, lastBlock.containerWidget, lastBlock, false);
                lastBlock = lastBlock.getSplitWidgets().pop();
            }
            else {
                lastBlock = table;
            }
            var insertIndex = 0;
            if ((isNullOrUndefined(previousBlock) || !previousBlock.bodyWidget.equals(lastBlock.bodyWidget)) && insertBefore) {
                insertIndex = 0;
                newParagraph.index = 0;
            }
            else {
                insertIndex = lastBlock.indexInOwner + 1;
                newParagraph.index = lastBlock.index + 1;
            }
            lastBlock.containerWidget.childWidgets.splice(insertIndex, 0, newParagraph);
            newParagraph.containerWidget = lastBlock.containerWidget;
            this.updateNextBlocksIndex(newParagraph, true);
            this.viewer.layout.layoutBodyWidgetCollection(newParagraph.index, newParagraph.containerWidget, newParagraph, false);
            lastBlock = newParagraph;
        }
        else {
            var paragraphInfo = this.selection.getParagraphInfo(selection.start);
            var selectionStart = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
            //Split Paragraph
            this.splitParagraphInternal(selection, selection.start.paragraph, selection.start.currentWidget, selection.start.offset);
            this.setPositionForCurrentIndex(selection.start, selectionStart);
            lastBlock = selection.start.paragraph.getSplitWidgets().pop();
        }
        //Split body widget
        firstBlock = this.splitBodyWidget(lastBlock.bodyWidget, newSectionFormat, lastBlock).firstChild;
        if (firstBlock instanceof TableWidget) {
            firstBlock.updateRowIndex(0);
        }
        this.viewer.layout.layoutBodyWidgetCollection(firstBlock.index, firstBlock.containerWidget, firstBlock, false);
        if (firstBlock instanceof TableWidget) {
            firstBlock = selection.getFirstParagraphInFirstCell(firstBlock);
        }
        if (selectFirstBlock) {
            selection.selectParagraphInternal(firstBlock, true);
        }
        return firstBlock;
    };
    Editor.prototype.splitBodyWidget = function (bodyWidget, sectionFormat, startBlock) {
        var sectionIndex;
        //Move blocks after the start block to next body widget
        var newBodyWidget = this.viewer.layout.moveBlocksToNextPage(startBlock);
        //Update SectionIndex for splitted body widget
        this.updateSectionIndex(sectionFormat, newBodyWidget, true);
        // insert New header footer widget in to section index 
        this.insertRemoveHeaderFooter(newBodyWidget.sectionIndex, true);
        //update header and footer for splitted widget
        this.viewer.layout.layoutHeaderFooter(newBodyWidget, this.viewer, newBodyWidget.page);
        //Update Child item index from 0 for new Section
        this.updateBlockIndex(0, newBodyWidget.firstChild);
        // Start sinfting from first block
        this.viewer.updateClientArea(newBodyWidget.sectionFormat, newBodyWidget.page);
        return newBodyWidget;
    };
    Editor.prototype.insertRemoveHeaderFooter = function (sectionIndex, insert) {
        if (this.viewer.headersFooters[sectionIndex]) {
            // Need to handle further
        }
        else {
            this.viewer.headersFooters[sectionIndex] = {};
        }
    };
    Editor.prototype.updateBlockIndex = function (blockIndex, block) {
        var blocks;
        var sectionIndex = block.bodyWidget.sectionIndex;
        do {
            blocks = block.getSplitWidgets();
            for (var i = 0; i < blocks.length; i++) {
                blocks[i].index = blockIndex;
            }
            blockIndex++;
            block = blocks.pop().nextRenderedWidget;
        } while (!isNullOrUndefined(block) && block.bodyWidget.sectionIndex === sectionIndex);
    };
    Editor.prototype.updateSectionIndex = function (sectionFormat, startBodyWidget, increaseIndex) {
        var currentSectionIndex = startBodyWidget.sectionIndex;
        var blockIndex = 0;
        var bodyWidget = startBodyWidget;
        do {
            if (bodyWidget.index === currentSectionIndex && sectionFormat) {
                bodyWidget.sectionFormat = sectionFormat;
            }
            if (increaseIndex) {
                bodyWidget.index++;
            }
            else {
                bodyWidget.index--;
            }
            bodyWidget = bodyWidget.nextRenderedWidget;
        } while (bodyWidget);
    };
    //Auto convert List
    Editor.prototype.checkAndConvertList = function (selection, isTab) {
        var list = selection.paragraphFormat.getList();
        if (!isNullOrUndefined(list)) {
            return false;
        }
        var convertList = false;
        var isLeadingZero = false;
        var indexInInline = 0;
        var inlineObj = selection.start.currentWidget.getInline(selection.start.offset - 1, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        if (!(inline instanceof TextElementBox)) {
            return false;
        }
        var span = inline;
        var text = span.text.substring(0, indexInInline);
        var tabValue = 0;
        var length = 0;
        while (!isNullOrUndefined(span.previousNode)) {
            // tslint:disable-next-line:max-line-length
            if (span.previousNode instanceof TextElementBox && (span.previousNode.text === '\t' || span.previousNode.text.trim().length === 0)) {
                (span.previousNode.text === '\t') ? tabValue += 36 : length = span.previousNode.text.length * 2.5;
                span = span.previousNode;
                continue;
            }
            return false;
        }
        span = inline;
        var index = 0;
        var tabIndex = text.lastIndexOf('\t');
        index = (tabIndex >= 0) ? tabIndex + 1 : text.lastIndexOf(' ') + 1;
        while (span.previousNode instanceof TextElementBox && index === 0) {
            span = span.previousNode;
            var previousText = span.text;
            tabIndex = previousText.lastIndexOf('\t');
            index = (tabIndex >= 0) ? tabIndex + 1 : previousText.lastIndexOf(' ') + 1;
            text = span.text + text;
            text = text.substring(index);
        }
        text = HelperMethods.trimStart(text);
        var numberFormat = text.substring(1, 2);
        var listLevelPattern = this.getListLevelPattern(text.substring(0, 1));
        if (listLevelPattern !== 'None' && this.checkNumberFormat(numberFormat, listLevelPattern === 'Bullet', text)) {
            convertList = true;
        }
        else if (this.checkLeadingZero(text)) {
            isLeadingZero = true;
            convertList = true;
        }
        if (convertList) {
            this.initComplexHistory('AutoList');
            var paragraph = inline.paragraph;
            // tslint:disable-next-line:max-line-length
            selection.start.setPositionParagraph(paragraph.childWidgets[0], paragraph.childWidgets[0].getOffset(inline, indexInInline + 1));
            selection.end.setPositionParagraph(paragraph.childWidgets[0], 0);
            this.initHistory('Delete');
            this.deleteSelectedContents(selection, false);
            this.reLayout(selection, false);
            var followCharacter = isTab ? 'Tab' : 'Space';
            numberFormat = !isLeadingZero ? '%1' + numberFormat : '%1' + text.substring(text.length - 1, text.length);
            var leadingZeroText = text.substring(text.length - 3, text.length - 1);
            listLevelPattern = !isLeadingZero ? listLevelPattern : this.getListLevelPattern(leadingZeroText);
            var listLevel = new WListLevel(undefined);
            listLevel.listLevelPattern = listLevelPattern;
            if (listLevelPattern === 'Bullet') {
                if (text === '*') {
                    listLevel.numberFormat = '\uf0b7';
                    listLevel.characterFormat.fontFamily = 'Symbol';
                }
                else if (text === '-') {
                    listLevel.numberFormat = '-';
                }
            }
            else {
                listLevel.numberFormat = numberFormat;
            }
            listLevel.followCharacter = followCharacter;
            var leftIndent = selection.paragraphFormat.leftIndent;
            if (tabValue !== 0 || length !== 0) {
                listLevel.paragraphFormat.leftIndent = leftIndent + 18 + tabValue + length;
            }
            else if (indexInInline > 2) {
                listLevel.paragraphFormat.leftIndent = leftIndent + (indexInInline - 2) * 2.5 + 18;
            }
            else if (leftIndent > 0) {
                listLevel.paragraphFormat.leftIndent = leftIndent + 18;
            }
            else {
                listLevel.paragraphFormat.leftIndent = 36;
            }
            listLevel.paragraphFormat.firstLineIndent = -18;
            if ((!isLeadingZero && text.substring(0, 1) === '0') || leadingZeroText === '00') {
                listLevel.startAt = 0;
            }
            else {
                listLevel.startAt = 1;
            }
            this.autoConvertList(selection, listLevel);
            if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
                this.editorHistory.updateComplexHistory();
            }
            else {
                this.reLayout(selection);
            }
        }
        return convertList;
    };
    Editor.prototype.getListLevelPattern = function (value) {
        switch (value) {
            case '0':
            case '1':
                return 'Arabic';
            case 'I':
                return 'UpRoman';
            case 'i':
                return 'LowRoman';
            case 'A':
                return 'UpLetter';
            case 'a':
                return 'LowLetter';
            case '*':
            case '-':
                return 'Bullet';
            case '00':
            case '01':
                return 'LeadingZero';
            default:
                return 'None';
        }
    };
    Editor.prototype.autoConvertList = function (selection, listLevel) {
        var start = selection.start;
        if (!selection.isForward) {
            start = selection.end;
        }
        var newList = new WList();
        if (this.viewer.lists.length > 0) {
            newList.listId = this.viewer.lists[this.viewer.lists.length - 1].listId + 1;
        }
        else {
            newList.listId = 0;
        }
        var newAbstractList = new WAbstractList();
        var layout = this.viewer;
        if (layout.abstractLists.length > 0) {
            newAbstractList.abstractListId = layout.abstractLists[layout.abstractLists.length - 1].abstractListId + 1;
        }
        else {
            newAbstractList.abstractListId = 0;
        }
        newList.abstractListId = newAbstractList.abstractListId;
        newList.abstractList = newAbstractList;
        layout.abstractLists.push(newAbstractList);
        newAbstractList.levels.push(listLevel);
        listLevel.ownerBase = newAbstractList;
        selection.paragraphFormat.setList(newList);
        selection.paragraphFormat.listLevelNumber = 0;
    };
    Editor.prototype.checkNumberFormat = function (numberFormat, isBullet, text) {
        if (isBullet) {
            return numberFormat === '';
        }
        else {
            var index = text.indexOf(numberFormat);
            return (numberFormat === '.' || numberFormat === ')'
                || numberFormat === '>' || numberFormat === '-') && text.substring(index, text.length - 1) === '';
        }
    };
    Editor.prototype.checkLeadingZero = function (text) {
        var j;
        var isZero = false;
        for (var i = 0; i <= text.length - 1; i++) {
            if (text.charAt(i) === '0') {
                isZero = true;
                continue;
            }
            j = i;
            break;
        }
        var numberFormat = undefined;
        if (text.charAt(j) === '1') {
            numberFormat = text.charAt(j + 1);
        }
        else {
            numberFormat = text.charAt(j);
        }
        return isZero && this.checkNumberFormat(numberFormat, false, text);
    };
    Editor.prototype.getPageFromBlockWidget = function (block) {
        var page = undefined;
        if (block.containerWidget instanceof BodyWidget) {
            page = block.containerWidget.page;
        }
        else if (block.containerWidget instanceof HeaderFooterWidget) {
            page = block.containerWidget.page;
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            page = block.containerWidget.bodyWidget.page;
        }
        return page;
    };
    /**
     * @private
     */
    Editor.prototype.insertTextInline = function (element, selection, text, index) {
        if (element instanceof TextElementBox) {
            element.text = HelperMethods.insert(element.text, index, text);
            var paragraph = element.line.paragraph;
            var lineIndex = paragraph.childWidgets.indexOf(element.line);
            var elementIndex = element.line.children.indexOf(element);
            if (element.line.paragraph.bidi) {
                this.viewer.layout.reArrangeElementsForRtl(element.line, element.line.paragraph.bidi);
            }
            this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex, element.line.paragraph.bidi);
        }
        else if (element instanceof ImageElementBox) {
            this.insertImageText(element, selection, text, index);
        }
        else if (element instanceof FieldElementBox) {
            if (element.fieldType === 0) {
                this.insertFieldBeginText(element, selection, text, index);
            }
            else if (element.fieldType === 2) {
                this.insertFieldSeparatorText(element, selection, text, index);
            }
            else {
                this.insertFieldEndText(element, selection, text, index);
            }
        }
        else if (element instanceof BookmarkElementBox) {
            this.insertBookMarkText(element, selection, text, index);
        }
    };
    Editor.prototype.insertFieldBeginText = function (fieldBegin, selection, text, index) {
        var spanObj = new TextElementBox();
        spanObj.text = text;
        var lineIndex = fieldBegin.line.paragraph.childWidgets.indexOf(fieldBegin.line);
        var spanIndex = fieldBegin.line.children.indexOf(fieldBegin);
        spanObj.characterFormat.copyFormat(fieldBegin.characterFormat);
        fieldBegin.line.children.splice(spanIndex, 0, spanObj);
        spanObj.line = fieldBegin.line;
        this.viewer.layout.reLayoutParagraph(fieldBegin.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertBookMarkText = function (element, selection, text, index) {
        var spanObj = new TextElementBox();
        spanObj.text = text;
        var lineIndex = element.line.paragraph.childWidgets.indexOf(element.line);
        var spanIndex = element.line.children.indexOf(element);
        spanObj.characterFormat.copyFormat(element.characterFormat);
        element.line.children.splice(spanIndex, 0, spanObj);
        spanObj.line = element.line;
        this.viewer.layout.reLayoutParagraph(element.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertFieldSeparatorText = function (fieldSeparator, selection, text, index) {
        var previousInline = selection.getPreviousTextInline(fieldSeparator);
        var nextInline = selection.getNextTextInline(fieldSeparator);
        var span = new TextElementBox();
        span.text = text;
        var spanIndex = fieldSeparator.line.children.indexOf(fieldSeparator);
        if (index === fieldSeparator.length) {
            spanIndex++;
        }
        if (isNullOrUndefined(previousInline) && isNullOrUndefined(nextInline)) {
            span.characterFormat.copyFormat(fieldSeparator.line.paragraph.characterFormat);
        }
        else if (isNullOrUndefined(previousInline)) {
            span.characterFormat.copyFormat(nextInline.characterFormat);
        }
        else {
            span.characterFormat.copyFormat(previousInline.characterFormat);
        }
        fieldSeparator.line.children.splice(spanIndex, 0, span);
        span.line = fieldSeparator.line;
        var lineIndex = fieldSeparator.line.paragraph.childWidgets.indexOf(fieldSeparator.line);
        this.viewer.layout.reLayoutParagraph(fieldSeparator.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertFieldEndText = function (fieldEnd, selection, text, index) {
        var span = new TextElementBox();
        span.text = text;
        var spanIndex = fieldEnd.line.children.indexOf(fieldEnd);
        span.characterFormat.copyFormat(fieldEnd.characterFormat);
        fieldEnd.line.children.splice(spanIndex + 1, 0, span);
        span.line = fieldEnd.line;
        var lineIndex = fieldEnd.line.paragraph.childWidgets.indexOf(fieldEnd.line);
        this.viewer.layout.reLayoutParagraph(fieldEnd.line.paragraph, lineIndex, spanIndex);
    };
    Editor.prototype.insertImageText = function (image, selection, text, index) {
        var previousInlineObj = selection.getPreviousTextInline(image);
        var nextInlineObj = selection.getNextTextInline(image);
        var line = image.line;
        var element = new TextElementBox();
        var paragraph = line.paragraph;
        var lineIndex = paragraph.childWidgets.indexOf(line);
        element.text = text;
        var spanIndex = line.children.indexOf(image);
        if (index === image.length) {
            spanIndex++;
        }
        if (isNullOrUndefined(previousInlineObj) && isNullOrUndefined(nextInlineObj)) {
            element.characterFormat.copyFormat(paragraph.characterFormat);
        }
        else if (isNullOrUndefined(previousInlineObj)) {
            element.characterFormat.copyFormat(nextInlineObj.characterFormat);
        }
        else {
            element.characterFormat.copyFormat(previousInlineObj.characterFormat);
        }
        line.children.splice(spanIndex, 0, element);
        element.line = line;
        this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, spanIndex);
    };
    /**
     * @private
     */
    Editor.prototype.isListTextSelected = function () {
        if (this.viewer.isListTextSelected) {
            this.initComplexHistory('ListSelect');
            // tslint:disable-next-line:max-line-length
            if (this.viewer.selection.start.paragraph.paragraphFormat.listFormat && this.viewer.selection.start.paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
            }
        }
    };
    //Auto Format and insert Hyperlink Implementation starts
    Editor.prototype.checkAndConvertToHyperlink = function (selection, isEnter, paragraph) {
        var text;
        var span;
        if (isEnter) {
            span = paragraph.lastChild.children[paragraph.lastChild.children.length - 1];
            text = span.text;
        }
        else {
            var indexInInline = 0;
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset - 1, indexInInline);
            var inline = inlineObj.element;
            indexInInline = inlineObj.index;
            if (!(inline instanceof TextElementBox)) {
                return;
            }
            span = inline;
            text = span.text.substring(0, indexInInline);
        }
        var index = 0;
        var tabCharIndex = text.lastIndexOf('\t');
        index = (tabCharIndex >= 0) ? tabCharIndex + 1 : text.lastIndexOf(' ') + 1;
        while (span.previousNode instanceof TextElementBox && index === 0) {
            span = span.previousNode;
            var previousText = span.text;
            tabCharIndex = previousText.lastIndexOf('\t');
            index = (tabCharIndex >= 0) ? tabCharIndex + 1 : previousText.lastIndexOf(' ') + 1;
            text = span.text + text;
        }
        text = text.substring(index);
        var lowerCaseText = text.toLowerCase();
        var containsURL = false;
        if (lowerCaseText.substring(0, 8) === 'file:///'
            || (lowerCaseText.substring(0, 7) === 'http://' && lowerCaseText.length > 7)
            || (lowerCaseText.substring(0, 8) === 'https://' && lowerCaseText.length > 8)
            || (lowerCaseText.substring(0, 4) === 'www.' && lowerCaseText.length > 4)
            || (lowerCaseText.substring(0, 3) === '\\' && lowerCaseText.length > 3)
            || (lowerCaseText.substring(0, 7) === 'mailto:' && lowerCaseText.length > 7)) {
            containsURL = true;
            if (lowerCaseText.substring(0, 4) === 'www.' && lowerCaseText.length > 4) {
                text = 'http://' + text;
            }
        }
        else {
            var atIndex = text.indexOf('@');
            var dotIndex = text.indexOf('.');
            if (atIndex > 0 && atIndex < dotIndex && dotIndex < text.length - 1) {
                containsURL = true;
                text = 'mailto:' + text;
            }
        }
        if (containsURL) {
            var startPos = new TextPosition(this.viewer.owner);
            startPos.setPositionParagraph(span.line, span.line.getOffset(span, index));
            var endPos = new TextPosition(this.viewer.owner);
            if (isEnter) {
                endPos.setPositionParagraph(span.line, span.line.getEndOffset());
            }
            else {
                if (selection.end.currentWidget.children.length === 0 && selection.end.offset === 0) {
                    var prevLine = selection.end.currentWidget.previousLine;
                    endPos.setPositionParagraph(prevLine, prevLine.getEndOffset());
                }
                else {
                    endPos.setPositionParagraph(selection.end.currentWidget, selection.end.offset - 1);
                }
            }
            this.autoFormatHyperlink(selection, text, startPos, endPos);
        }
    };
    Editor.prototype.autoFormatHyperlink = function (selection, url, startPosition, endPosition) {
        this.initComplexHistory('AutoFormatHyperlink');
        var blockInfo = this.selection.getParagraphInfo(startPosition);
        var start = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.insertPosition = start;
        }
        // Moves the selection to URL text start and end position.
        selection.start.setPositionInternal(startPosition);
        selection.end.setPositionInternal(endPosition);
        // Preserves the character format for hyperlink field.
        var temp = this.getCharacterFormat(selection);
        var format = new WCharacterFormat();
        format.copyFormat(temp);
        var fieldEnd = this.createHyperlinkElement(url, startPosition, endPosition, format);
        // Moves the selection to the end of field end position.
        selection.start.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 1));
        // Moves to next text position. (To achieve common behavior for space and enter).
        selection.start.moveNextPosition();
        selection.end.setPositionInternal(selection.start);
        blockInfo = this.selection.getParagraphInfo(selection.end);
        var end = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.endPosition = end;
            this.editorHistory.updateComplexHistory();
            this.reLayout(selection);
        }
        else {
            this.updateComplexWithoutHistory(0, start, end);
        }
    };
    Editor.prototype.appylingHyperlinkFormat = function (selection) {
        this.initHistory('Underline');
        this.updateCharacterFormatWithUpdate(selection, 'underline', 'Single', false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
        // Applies font color for field result.
        this.initHistory('FontColor');
        this.updateCharacterFormatWithUpdate(selection, 'fontColor', '#0563c1', false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.createHyperlinkElement = function (url, startPosition, endPosition, format) {
        var selection = this.selection;
        this.viewer.layout.allowLayout = false;
        this.appylingHyperlinkFormat(selection);
        this.viewer.layout.allowLayout = true;
        // Adds the field end at the URL text end position.
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.characterFormat.copyFormat(format);
        fieldEnd.line = selection.end.currentWidget;
        selection.start.setPositionInternal(selection.end);
        // this.insertElementInCurrentLine(selection, fieldEnd, true);
        this.initInsertInline(fieldEnd);
        // Moves the selection to URL text start position.        
        selection.start.setPositionInternal(startPosition);
        selection.end.setPositionInternal(selection.start);
        // Adds field begin, field code and field separator at the URL text start position.
        var begin = this.insertHyperlinkfield(selection, format, url);
        var lineIndex = selection.start.paragraph.childWidgets.indexOf(begin.line);
        var index = begin.line.children.indexOf(begin);
        fieldEnd.linkFieldCharacter(this.viewer);
        this.viewer.layout.reLayoutParagraph(selection.start.paragraph, lineIndex, index);
        return fieldEnd;
    };
    Editor.prototype.insertHyperlinkfield = function (selection, format, url, isBookmark) {
        // Adds field begin, field code and field separator at the URL text start position.
        var begin = new FieldElementBox(0);
        begin.characterFormat.copyFormat(format);
        begin.line = selection.start.currentWidget;
        this.initInsertInline(begin);
        var span = new TextElementBox();
        span.characterFormat.copyFormat(format);
        if (isBookmark) {
            span.text = ' HYPERLINK \\l \"' + url + '\" ';
        }
        else {
            span.text = ' HYPERLINK \"' + url + '\" ';
        }
        span.line = selection.start.currentWidget;
        this.initInsertInline(span);
        var separator = new FieldElementBox(2);
        separator.characterFormat.copyFormat(format);
        separator.line = selection.start.currentWidget;
        this.initInsertInline(separator);
        return begin;
    };
    Editor.prototype.unLinkFieldCharacter = function (inline) {
        if (inline instanceof FieldElementBox && inline.fieldType === 0) {
            if (inline.fieldEnd) {
                if (this.viewer) {
                    this.viewer.fieldToLayout = inline;
                    this.viewer.fieldEndParagraph = inline.line.paragraph;
                }
                // inline.line.paragraph.addFieldCharacter(inline.fieldEnd);
                inline.fieldEnd = undefined;
            }
        }
        if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            if (!isNullOrUndefined(inline.fieldEnd)) {
                if (this.viewer) {
                    this.viewer.fieldToLayout = inline.fieldBegin;
                    this.viewer.fieldEndParagraph = inline.line.paragraph;
                }
                inline.fieldBegin.fieldSeparator = undefined;
                inline.fieldEnd.fieldSeparator = undefined;
            }
        }
        else if (inline instanceof FieldElementBox && inline.fieldType === 1) {
            if (inline.fieldBegin) {
                if (!isNullOrUndefined(this.viewer)) {
                    this.viewer.fieldToLayout = inline.fieldBegin;
                    this.viewer.fieldEndParagraph = inline.line.paragraph;
                }
                var fieldIndex = this.viewer.fields.indexOf(inline.fieldBegin);
                if (fieldIndex !== -1) {
                    this.viewer.fields.splice(fieldIndex, 1);
                }
                inline.fieldBegin = undefined;
            }
        }
    };
    Editor.prototype.getCharacterFormat = function (selection) {
        if (selection.start.paragraph.isEmpty()) {
            return selection.start.paragraph.characterFormat;
        }
        else {
            var info = selection.start.currentWidget.getInline(selection.start.offset, 0);
            return info.element.characterFormat;
        }
    };
    /**
     * Insert Hyperlink
     * @param  {string} address - Hyperlink URL
     * @param  {string} displayText - Display text for the hyperlink
     */
    Editor.prototype.insertHyperlink = function (address, displayText) {
        if (isNullOrUndefined(displayText)) {
            displayText = address;
        }
        this.insertHyperlinkInternal(address, displayText, this.owner.selection.text !== displayText, false);
    };
    /**
     * @private
     */
    Editor.prototype.insertHyperlinkInternal = function (url, displayText, remove, isBookmark) {
        var selection = this.viewer.selection;
        if (selection.start.paragraph.associatedCell !== selection.end.paragraph.associatedCell) {
            return;
        }
        if (remove) {
            //Empty selection Hyperlink insert
            this.insertHyperlinkInternalInternal(selection, url, displayText, isBookmark);
        }
        else {
            //Non-Empty Selection- change the selected text to Field       
            // this.preservedFontCol = this.getFontColor();
            var startPosition = selection.start;
            var endPosition = selection.end;
            if (!selection.isForward) {
                startPosition = selection.end;
                endPosition = selection.start;
            }
            var fieldStartPosition = new TextPosition(this.viewer.owner);
            fieldStartPosition.setPositionInternal(startPosition);
            var temp = this.getCharacterFormat(selection);
            var format = new WCharacterFormat(undefined);
            format.copyFormat(temp);
            this.initComplexHistory('InsertHyperlink');
            var blockInfo = this.selection.getParagraphInfo(startPosition);
            var start = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                // tslint:disable-next-line:max-line-length
                this.editorHistory.currentHistoryInfo.insertPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            this.appylingHyperlinkFormat(selection);
            this.viewer.layout.allowLayout = true;
            startPosition.setPositionInternal(endPosition);
            // Adds the field end at the URL text end position.
            var fieldEnd = new FieldElementBox(1);
            fieldEnd.characterFormat.copyFormat(format);
            fieldEnd.line = selection.end.currentWidget;
            startPosition.setPositionInternal(endPosition);
            // this.insertElementInCurrentLine(selection, fieldEnd, true);
            this.initInsertInline(fieldEnd);
            // Moves the selection to URL text start position.        
            startPosition.setPositionInternal(fieldStartPosition);
            endPosition.setPositionInternal(startPosition);
            // Adds field begin, field code and field separator at the URL text start position.
            var begin = this.insertHyperlinkfield(selection, format, url, isBookmark);
            fieldEnd.linkFieldCharacter(this.viewer);
            var lineIndex = selection.start.paragraph.childWidgets.indexOf(begin.line);
            var index = begin.line.children.indexOf(begin);
            this.viewer.layout.reLayoutParagraph(selection.start.paragraph, lineIndex, index);
            var lineWidget = fieldEnd.line;
            selection.selects(lineWidget, lineWidget.getOffset(fieldEnd, fieldEnd.length), true);
            blockInfo = this.selection.getParagraphInfo(endPosition);
            var end = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
                // tslint:disable-next-line:max-line-length
                this.editorHistory.currentHistoryInfo.endPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
                this.editorHistory.updateComplexHistory();
            }
            else {
                this.updateComplexWithoutHistory(1, start, end);
            }
        }
    };
    Editor.prototype.insertHyperlinkInternalInternal = function (selection, url, displayText, isBookmark) {
        if (isNullOrUndefined(selection.start)) {
            return;
        }
        if (this.editHyperlink(selection, url, displayText)) {
            return;
        }
        this.initHistory('InsertHyperlink');
        var isRemoved = true;
        if (!selection.isEmpty) {
            isRemoved = this.removeSelectedContents(selection);
        }
        if (isRemoved) {
            // Preserves the character format for hyperlink field.
            var temp = this.getCharacterFormat(selection);
            var format = new WCharacterFormat();
            format.copyFormat(temp);
            this.insertHyperlinkByFormat(selection, url, displayText, format, isBookmark);
        }
        //else
        //    this.Select(Start, true);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.insertHyperlinkByFormat = function (selection, url, displayText, format, isBookmark) {
        this.updateInsertPosition();
        selection.owner.isShiftingEnabled = true;
        var indexInInline = 0;
        var initial = indexInInline;
        var element = [];
        var fieldBegin = new FieldElementBox(0);
        element.push(fieldBegin);
        var span = new TextElementBox();
        if (isBookmark) {
            span.text = ' HYPERLINK \\l \"' + url + '\" ';
        }
        else {
            span.text = ' HYPERLINK \"' + url + '\" ';
        }
        element.push(span);
        var fieldSeparator = new FieldElementBox(2);
        element.push(fieldSeparator);
        if (!isNullOrUndefined(displayText) && displayText !== '') {
            span = new TextElementBox();
            span.characterFormat.underline = 'Single';
            span.characterFormat.fontColor = '#0563c1';
            span.text = displayText;
            element.push(span);
        }
        var fieldEnd = new FieldElementBox(1);
        element.push(fieldEnd);
        this.insertElement(element);
        var paragraph = selection.start.paragraph;
        fieldEnd.linkFieldCharacter(this.viewer);
        if (this.viewer.fields.indexOf(fieldBegin) === -1) {
            this.viewer.fields.push(fieldBegin);
        }
        var offset = fieldEnd.line.getOffset(fieldEnd, 1);
        selection.selects(fieldEnd.line, fieldEnd.line.getOffset(fieldEnd, fieldEnd.length), true);
        this.updateEndPosition();
        this.reLayout(selection, true);
    };
    Editor.prototype.initInsertInline = function (element, insertHyperlink) {
        this.initHistory('InsertInline');
        this.insertInlineInSelection(this.viewer.selection, element);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
    };
    /**
     * @private
     */
    Editor.prototype.insertElementInCurrentLine = function (selection, inline, isReLayout) {
        if (this.checkIsNotRedoing()) {
            selection.owner.isShiftingEnabled = true;
        }
        if (!selection.isEmpty) {
            this.removeSelectedContents(selection);
        }
        this.updateInsertPosition();
        this.insertElement([inline]);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.start, false);
        }
        this.fireContentChange();
    };
    /**
     * Edit Hyperlink
     * @param  {Selection} selection
     * @param  {string} url
     * @param  {string} displayText
     * @private
     */
    Editor.prototype.editHyperlink = function (selection, url, displayText, isBookmark) {
        var fieldBegin = selection.getHyperlinkField();
        if (isNullOrUndefined(fieldBegin)) {
            return false;
        }
        this.initHistory('InsertHyperlink');
        this.editHyperlinkInternal = isNullOrUndefined(this.editorHistory)
            || (this.editorHistory && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo));
        var fieldResult = '';
        var isNestedField = false;
        // Preserves the character format for hyperlink field.
        var temp = this.getCharacterFormat(selection);
        var format = new WCharacterFormat();
        format.copyFormat(temp);
        var fieldSeparator = undefined;
        if (!isNullOrUndefined(fieldBegin.fieldSeparator)) {
            fieldSeparator = fieldBegin.fieldSeparator;
            // tslint:disable-next-line:max-line-length
            var fieldObj = selection.getHyperlinkDisplayText(fieldBegin.fieldSeparator.line.paragraph, fieldBegin.fieldSeparator, fieldBegin.fieldEnd, isNestedField, format);
            fieldResult = fieldObj.displayText;
            isNestedField = fieldObj.isNestedField;
            format = fieldObj.format;
        }
        var offset = fieldBegin.line.getOffset(fieldBegin, 0);
        selection.start.setPositionParagraph(fieldBegin.line, offset);
        offset = fieldBegin.fieldEnd.line.getOffset(fieldBegin.fieldEnd, 1);
        selection.end.setPositionParagraph(fieldBegin.fieldEnd.line, offset);
        this.deleteSelectedContents(selection, false);
        if (!isNestedField && fieldResult !== displayText || isNullOrUndefined(fieldSeparator)) {
            this.insertHyperlinkByFormat(selection, url, displayText, format, isBookmark);
        }
        else {
            //Modify the new hyperlink url. Inserts field begin, url and field separator.
            this.updateInsertPosition();
            var newFieldBegin = new FieldElementBox(0);
            newFieldBegin.characterFormat.copyFormat(fieldBegin.characterFormat);
            newFieldBegin.line = selection.start.currentWidget;
            this.insertInlineInternal(newFieldBegin);
            var span = new TextElementBox();
            span.characterFormat.copyFormat(fieldBegin.characterFormat);
            if (isBookmark) {
                span.text = ' HYPERLINK \\l \"' + url + '\" ';
            }
            else {
                span.text = ' HYPERLINK \"' + url + '\" ';
            }
            span.line = selection.start.currentWidget;
            this.insertInlineInternal(span);
            var nodes = this.editorHistory && this.editorHistory.currentBaseHistoryInfo ?
                this.editorHistory.currentBaseHistoryInfo.removedNodes : this.nodes;
            this.insertClonedFieldResult(selection, nodes, fieldSeparator);
            var fieldEnd = selection.end.currentWidget.getInline(selection.end.offset, 0).element;
            fieldEnd.linkFieldCharacter(this.viewer);
            var paragraph = newFieldBegin.line.paragraph;
            var lineIndex = newFieldBegin.line.paragraph.childWidgets.indexOf(newFieldBegin.line);
            var elementIndex = newFieldBegin.line.children.indexOf(newFieldBegin);
            this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
            selection.selects(newFieldBegin.fieldEnd.line, offset, true);
            this.updateEndPosition();
            this.reLayout(selection, true);
        }
        this.editHyperlinkInternal = false;
        this.nodes = [];
        return true;
    };
    /* tslint:disable:no-any */
    Editor.prototype.insertClonedFieldResult = function (selection, nodes, fieldSeparator) {
        var fieldEnd;
        var isStarted = false;
        for (var i = nodes.length - 1; i > -1; i--) {
            var node = nodes[i];
            /* tslint:enable:no-any */
            if (!isStarted) {
                if (fieldSeparator === node) {
                    isStarted = true;
                }
                else {
                    if (node instanceof ParagraphWidget && node === fieldSeparator.line.paragraph) {
                        isStarted = true;
                        var paragraph = undefined;
                        if (i === nodes.length - 1) {
                            paragraph = selection.start.paragraph;
                            var fieldParagraph = fieldSeparator.line.paragraph;
                            this.getClonedFieldResultWithSel(fieldParagraph, selection, fieldSeparator);
                        }
                        else {
                            paragraph = this.getClonedFieldResult(fieldSeparator.line.paragraph, fieldSeparator);
                            this.insertParagraph(paragraph, true);
                        }
                        selection.selectParagraphInternal(selection.getNextParagraphBlock(paragraph), true);
                    }
                    continue;
                }
            }
            if (node instanceof ElementBox) {
                this.insertInlineInternal(node.clone());
            }
            else if (node instanceof BlockWidget) {
                this.insertBlock(node.clone());
            }
            // else if (node instanceof WSection)
            //     editor.insertSection((node as WSection)._Clone());
        }
    };
    Editor.prototype.getClonedFieldResultWithSel = function (paragraph, selection, fieldSeparator) {
        var lineIndex = paragraph.childWidgets.indexOf(fieldSeparator.line);
        var elementIndex = paragraph.childWidgets[lineIndex].children.indexOf(fieldSeparator);
        for (var j = lineIndex; j < paragraph.childWidgets.length; j++) {
            var lineWidget = paragraph.childWidgets[j];
            if (j !== lineIndex) {
                elementIndex = 0;
            }
            for (var i = elementIndex; i < lineWidget.children.length; i++) {
                this.insertInlineInternal(lineWidget.children[i].clone());
            }
        }
    };
    Editor.prototype.getClonedFieldResult = function (curParagraph, fieldSeparator) {
        var paragraph = new ParagraphWidget();
        paragraph.characterFormat.copyFormat(curParagraph.characterFormat);
        paragraph.paragraphFormat.copyFormat(curParagraph.paragraphFormat);
        var lineIndex = curParagraph.childWidgets.indexOf(fieldSeparator.line);
        var elementIndex = curParagraph.childWidgets[lineIndex].children.indexOf(fieldSeparator);
        for (var j = lineIndex; j < curParagraph.childWidgets.length; j++) {
            var lineWidget = curParagraph.childWidgets[j];
            if (j !== lineIndex) {
                elementIndex = 0;
            }
            for (var i = elementIndex; i < lineWidget.children.length; i++) {
                paragraph.childWidgets[0].children.push(lineWidget.children[i]);
            }
        }
        return paragraph;
    };
    /**
     * Removes the hyperlink if selection is within hyperlink.
     */
    Editor.prototype.removeHyperlink = function () {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var selection = this.selection;
        var fieldBegin = selection.getHyperlinkField();
        if (isNullOrUndefined(fieldBegin)) {
            return;
        }
        var fieldEnd = fieldBegin.fieldEnd;
        var fieldSeparator = fieldBegin.fieldSeparator;
        var fieldStartPosition = new TextPosition(selection.owner);
        // tslint:disable-next-line:max-line-length
        fieldStartPosition.setPositionParagraph(fieldBegin.line, (fieldBegin.line).getOffset(fieldBegin, 0));
        var fieldSeparatorPosition = new TextPosition(selection.owner);
        // tslint:disable-next-line:max-line-length
        fieldSeparatorPosition.setPositionParagraph(fieldSeparator.line, (fieldSeparator.line).getOffset(fieldSeparator, fieldSeparator.length));
        this.initComplexHistory('RemoveHyperlink');
        selection.start.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 0));
        selection.end.setPositionInternal(selection.start);
        this.onDelete();
        selection.start.setPositionInternal(fieldSeparatorPosition);
        this.initHistory('Underline');
        this.updateCharacterFormatWithUpdate(selection, 'underline', 'None', false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        // Applies font color for field result.
        this.initHistory('FontColor');
        this.updateCharacterFormatWithUpdate(selection, 'fontColor', undefined, false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.reLayout(selection, false);
        selection.end.setPositionInternal(selection.start);
        selection.start.setPositionInternal(fieldStartPosition);
        this.initHistory('Delete');
        this.deleteSelectedContents(selection, false);
        this.reLayout(selection, true);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
            this.editorHistory.updateComplexHistory();
        }
    };
    //Paste Implementation starts
    /**
     * Paste copied clipboard content on Paste event
     * @param  {ClipboardEvent} event
     * @param  {any} pasteWindow?
     * @private
     */
    /* tslint:disable:no-any */
    Editor.prototype.pasteInternal = function (event, pasteWindow) {
        this.currentPasteOptions = this.owner.defaultPasteOption;
        if (this.viewer.owner.enableLocalPaste) {
            this.paste();
        }
        else {
            this.selection.isViewPasteOptions = true;
            if (this.selection.pasteElement) {
                this.selection.pasteElement.style.display = 'none';
            }
            if (isNullOrUndefined(pasteWindow)) {
                pasteWindow = window;
            }
            /* tslint:enable:no-any */
            var textContent = '';
            var htmlContent = '';
            var rtfContent = '';
            var clipbordData = pasteWindow.clipboardData ? pasteWindow.clipboardData : event.clipboardData;
            if (Browser.info.name !== 'msie') {
                rtfContent = clipbordData.getData('Text/Rtf');
                htmlContent = clipbordData.getData('Text/Html');
            }
            this.copiedTextContent = textContent = clipbordData.getData('Text');
            if (rtfContent !== '') {
                this.pasteAjax(rtfContent, '.rtf');
            }
            else if (htmlContent !== '') {
                var doc = new DOMParser().parseFromString(htmlContent, 'text/html');
                var result = new XMLSerializer().serializeToString(doc);
                result = result.replace(/<!--StartFragment-->/gi, '');
                result = result.replace(/<!--EndFragment-->/gi, '');
                this.pasteAjax(result, '.html');
            }
            else if (textContent !== '') {
                this.pasteContents(textContent);
                this.applyPasteOptions(this.currentPasteOptions);
                this.viewer.editableDiv.innerHTML = '';
            }
            // if (textContent !== '') {
            //     this.pasteContents(textContent);
            //     this.viewer.editableDiv.innerHTML = '';
            // }
        }
        this.viewer.updateFocus();
    };
    /**
     * @private
     */
    Editor.prototype.pasteAjax = function (content, type) {
        var proxy = this;
        /* tslint:disable:no-any */
        var formObject = {
            content: content,
            type: type
        };
        var editor = this;
        this.pasteRequestHandler = new XmlHttpRequestHandler();
        this.pasteRequestHandler.url = proxy.owner.serviceUrl + this.owner.serverActionSettings.systemClipboard;
        this.pasteRequestHandler.responseType = 'json';
        this.pasteRequestHandler.contentType = 'application/json;charset=UTF-8';
        this.pasteRequestHandler.send(formObject);
        showSpinner(this.owner.element);
        this.pasteRequestHandler.onSuccess = this.pasteFormattedContent.bind(this);
        this.pasteRequestHandler.onFailure = this.onPasteFailure.bind(this);
        this.pasteRequestHandler.onError = this.onPasteFailure.bind(this);
    };
    Editor.prototype.pasteFormattedContent = function (result) {
        if (this.isPasteListUpdated) {
            this.isPasteListUpdated = false;
        }
        this.pasteContents(isNullOrUndefined(result.data) ? this.copiedTextContent : result.data);
        this.applyPasteOptions(this.currentPasteOptions);
        hideSpinner(this.owner.element);
    };
    Editor.prototype.onPasteFailure = function (result) {
        console.error(result.status, result.statusText);
        hideSpinner(this.owner.element);
    };
    /**
     * Pastes provided sfdt content or the data present in local clipboard if any .
     * @param {string} sfdt? insert the specified sfdt content at current position
     */
    Editor.prototype.paste = function (sfdt, defaultPasteOption) {
        if (isNullOrUndefined(sfdt)) {
            sfdt = this.owner.enableLocalPaste ? this.copiedData : undefined;
        }
        if (!isNullOrUndefined(defaultPasteOption)) {
            this.currentPasteOptions = defaultPasteOption;
        }
        /* tslint:disable:no-any */
        if (sfdt) {
            var document_1 = JSON.parse(sfdt);
            this.pasteContents(document_1);
            this.applyPasteOptions(this.currentPasteOptions);
        }
    };
    Editor.prototype.getUniqueListOrAbstractListId = function (isList) {
        if (isList && this.viewer.lists.length) {
            var sortedList = this.viewer.lists.slice().sort(function (a, b) {
                return a.listId - b.listId;
            });
            return sortedList[sortedList.length - 1].listId + 1;
        }
        else if (this.viewer.abstractLists.length) {
            var sortedAbsList = this.viewer.abstractLists.slice().sort(function (a, b) {
                return a.abstractListId - b.abstractListId;
            });
            return sortedAbsList[sortedAbsList.length - 1].abstractListId + 1;
        }
        return 0;
    };
    Editor.prototype.checkSameLevelFormat = function (lstLevelNo, abstractList, list) {
        return abstractList.levels[lstLevelNo].listLevelPattern === list.abstractList.levels[lstLevelNo].listLevelPattern
            && abstractList.levels[lstLevelNo].numberFormat === list.abstractList.levels[lstLevelNo].numberFormat;
    };
    Editor.prototype.listLevelPatternInCollection = function (lstLevelNo, listLevelPattern, numberFormat) {
        return this.viewer.lists.filter(function (list) {
            return list.abstractList.levels[lstLevelNo].listLevelPattern === listLevelPattern
                && list.abstractList.levels[lstLevelNo].numberFormat === numberFormat;
        })[0];
    };
    Editor.prototype.getBlocksToUpdate = function (blocks) {
        var _this = this;
        var blcks = [];
        blocks.forEach(function (obj) {
            if (obj.paragraphFormat && obj.paragraphFormat.listFormat
                && Object.keys(obj.paragraphFormat.listFormat).length > 0) {
                blcks.push(obj);
            }
            else if (obj.rows) {
                obj.rows.forEach(function (row) {
                    row.cells.forEach(function (cell) {
                        blcks = blcks.concat(_this.getBlocksToUpdate(cell.blocks));
                    });
                });
            }
        });
        return blcks;
    };
    Editor.prototype.updateListIdForBlocks = function (blocks, abstractList, list, id, idToUpdate) {
        var _this = this;
        var update = false;
        blocks.forEach(function (obj) {
            if (obj.paragraphFormat && obj.paragraphFormat.listFormat
                && Object.keys(obj.paragraphFormat.listFormat).length > 0) {
                var format = obj.paragraphFormat.listFormat;
                // tslint:disable-next-line:max-line-length
                var existingList = _this.listLevelPatternInCollection(format.listLevelNumber, abstractList.levels[format.listLevelNumber].listLevelPattern, abstractList.levels[format.listLevelNumber].numberFormat);
                if (format.listId === id) {
                    if (isNullOrUndefined(existingList) && (!list || (list
                        && !_this.checkSameLevelFormat(format.listLevelNumber, abstractList, list)))) {
                        update = true;
                        format.listId = idToUpdate;
                    }
                    else if (!isNullOrUndefined(existingList)
                        && _this.checkSameLevelFormat(format.listLevelNumber, abstractList, existingList)) {
                        if (!format.isUpdated) {
                            format.listId = existingList.listId;
                            format.isUpdated = true;
                        }
                        update = false;
                    }
                }
            }
            else if (obj.rows) {
                obj.rows.forEach(function (row) {
                    row.cells.forEach(function (cell) {
                        var toUpdate = _this.updateListIdForBlocks(cell.blocks, abstractList, list, id, idToUpdate);
                        if (!update) {
                            update = toUpdate;
                        }
                    });
                });
            }
        });
        return update;
    };
    Editor.prototype.updatePasteContent = function (pasteContent, sectionId) {
        var uniqueListId = this.getUniqueListOrAbstractListId(true);
        if (pasteContent.lists.filter(function (obj) { return obj.listId === uniqueListId; }).length > 0) {
            var sortedPasteList = pasteContent.lists.slice().sort(function (a, b) {
                return a.listId - b.listId;
            });
            uniqueListId = sortedPasteList[sortedPasteList.length - 1].listId + 1;
        }
        var uniqueAbsLstId = this.getUniqueListOrAbstractListId(false);
        if (pasteContent.abstractLists.filter(function (obj) {
            return obj.abstractListId === uniqueAbsLstId;
        }).length > 0) {
            var sortedPasteAbsList = pasteContent.abstractLists.slice().sort(function (a, b) {
                return a.abstractListId - b.abstractListId;
            });
            uniqueAbsLstId = sortedPasteAbsList[sortedPasteAbsList.length - 1].abstractListId + 1;
        }
        var _loop_1 = function (k) {
            var list = pasteContent.lists[k];
            var abstractList = pasteContent.abstractLists.filter(function (obj) {
                return obj.abstractListId === list.abstractListId;
            })[0];
            var lstDup = this_1.viewer.lists.filter(function (obj) {
                return obj.listId === list.listId;
            });
            // tslint:disable-next-line:max-line-length
            var isUpdate = this_1.updateListIdForBlocks(pasteContent.sections[sectionId].blocks, abstractList, lstDup[0], list.listId, uniqueListId);
            if (isUpdate) {
                abstractList.abstractListId = uniqueAbsLstId;
                list.listId = uniqueListId;
                list.abstractListId = uniqueAbsLstId;
                uniqueListId++;
                uniqueAbsLstId++;
            }
            else {
                pasteContent.lists.splice(k, 1);
                pasteContent.abstractLists.splice(pasteContent.abstractLists.indexOf(abstractList), 1);
                k--;
            }
            out_k_1 = k;
        };
        var this_1 = this, out_k_1;
        for (var k = 0; k < pasteContent.lists.length; k++) {
            _loop_1(k);
            k = out_k_1;
        }
        this.getBlocksToUpdate(pasteContent.sections[sectionId].blocks).forEach(function (blck) {
            delete blck.paragraphFormat.listFormat.isUpdated;
        });
    };
    Editor.prototype.getBlocks = function (pasteContent) {
        var widgets = [];
        if (typeof (pasteContent) === 'string') {
            var startParagraph = this.selection.start.paragraph;
            if (!this.selection.isForward) {
                startParagraph = this.selection.end.paragraph;
            }
            var arr = [];
            var txt = pasteContent;
            txt = txt.replace(/\r\n/g, '\r');
            arr = txt.split('\r');
            for (var i = 0; i < arr.length; i++) {
                var currentInline = this.selection.start.currentWidget.getInline(this.selection.start.offset, 0);
                var element = this.selection.getPreviousValidElement(currentInline.element);
                var insertFormat = element ? element.characterFormat :
                    this.copyInsertFormat(startParagraph.characterFormat, false);
                var insertParaFormat = this.viewer.selection.copySelectionParagraphFormat();
                var paragraph = new ParagraphWidget();
                paragraph.paragraphFormat.copyFormat(insertParaFormat);
                var line = new LineWidget(paragraph);
                if (arr[i].length > 0) {
                    var textElement = new TextElementBox();
                    textElement.characterFormat.copyFormat(insertFormat);
                    textElement.text = arr[i];
                    line.children.push(textElement);
                    textElement.line = line;
                }
                paragraph.childWidgets.push(line);
                widgets.push(paragraph);
            }
        }
        else {
            for (var i = 0; i < pasteContent.sections.length; i++) {
                var parser = this.viewer.owner.parser;
                if (!this.isPasteListUpdated && !isNullOrUndefined(pasteContent.lists)) {
                    if (this.viewer.lists.length > 0) {
                        this.updatePasteContent(pasteContent, i);
                    }
                    this.isPasteListUpdated = true;
                    if (!isNullOrUndefined(pasteContent.abstractLists)) {
                        parser.parseAbstractList(pasteContent, this.viewer.abstractLists);
                    }
                    if (!isNullOrUndefined(pasteContent.lists)) {
                        parser.parseList(pasteContent, this.viewer.lists);
                    }
                }
                parser.parseBody(pasteContent.sections[i].blocks, widgets);
            }
        }
        if (this.currentPasteOptions === 'MergeWithExistingFormatting') {
            this.applyMergeFormat(widgets);
        }
        return widgets;
    };
    Editor.prototype.applyMergeFormat = function (widgets) {
        var startParagraph = this.selection.start.paragraph;
        var currentInline = this.selection.start.currentWidget.getInline(this.selection.start.offset, 0);
        var element = this.selection.getPreviousValidElement(currentInline.element);
        var insertFormat = element ? element.characterFormat :
            this.copyInsertFormat(startParagraph.characterFormat, false);
        var insertParaFormat = this.viewer.selection.copySelectionParagraphFormat();
        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            if (widget instanceof ParagraphWidget) {
                widget.paragraphFormat.copyFormat(insertParaFormat);
                this.applyFormatInternal(widget, insertFormat);
            }
            else {
                for (var j = 0; j < widget.childWidgets.length; j++) {
                    var row = widget.childWidgets[j];
                    for (var k = 0; k < row.childWidgets.length; k++) {
                        var cell = row.childWidgets[k];
                        for (var l = 0; l < cell.childWidgets.length; l++) {
                            this.applyFormatInternal(cell.childWidgets[l], insertFormat);
                        }
                    }
                }
            }
        }
    };
    Editor.prototype.applyFormatInternal = function (widget, insertFormat) {
        if (widget instanceof ParagraphWidget) {
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var lineWidget = widget.childWidgets[j];
                for (var k = 0; k < lineWidget.children.length; k++) {
                    var inlineCharacterFormat = lineWidget.children[k].characterFormat;
                    var characterFormat = inlineCharacterFormat.cloneFormat();
                    lineWidget.children[k].characterFormat = insertFormat;
                    if (characterFormat.bold) {
                        lineWidget.children[k].characterFormat.bold = characterFormat.bold;
                    }
                    if (characterFormat.italic) {
                        lineWidget.children[k].characterFormat.italic = characterFormat.italic;
                    }
                }
            }
        }
        else {
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var rowWidget = widget.childWidgets[j];
                for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                    var cellWidget = rowWidget.childWidgets[k];
                    for (var l = 0; l < cellWidget.childWidgets.length; l++) {
                        this.applyFormatInternal(cellWidget.childWidgets[l], insertFormat);
                    }
                }
            }
        }
    };
    Editor.prototype.applyPasteOptions = function (options) {
        if (isNullOrUndefined(this.copiedContent) || this.copiedTextContent === '') {
            return;
        }
        this.isSkipHistory = true;
        this.currentPasteOptions = options;
        this.selection.start.setPositionInternal(this.pasteTextPosition.startPosition);
        this.selection.end.setPositionInternal(this.pasteTextPosition.endPosition);
        switch (options) {
            case 'KeepSourceFormatting':
                this.pasteContents(this.copiedContent !== '' ? this.copiedContent : this.copiedTextContent);
                break;
            case 'MergeWithExistingFormatting':
                var start = this.selection.isForward ? this.selection.start : this.selection.end;
                var currentFormat = start.paragraph.paragraphFormat;
                this.pasteContents(this.copiedContent !== '' ? this.copiedContent : this.copiedTextContent, currentFormat);
                break;
            case 'KeepTextOnly':
                this.pasteContents(this.copiedTextContent);
                break;
        }
        this.isSkipHistory = false;
    };
    Editor.prototype.pasteContents = function (content, currentFormat) {
        if (typeof (content) !== 'string') {
            this.copiedContent = content;
        }
        this.pasteContentsInternal(this.getBlocks(content), currentFormat);
    };
    Editor.prototype.pasteContentsInternal = function (widgets, currentFormat) {
        this.isPaste = true;
        /* tslint:enable:no-any */
        var selection = this.viewer.selection;
        var isRemoved = true;
        if (!this.isSkipHistory) {
            this.initComplexHistory('Paste');
        }
        if (this.viewer.isListTextSelected) {
            var paragraph = selection.start.paragraph;
            if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
            }
        }
        if (!this.isSkipHistory) {
            this.initHistory('Paste');
        }
        if (!selection.isEmpty || this.viewer.isListTextSelected) {
            isRemoved = this.removeSelectedContentInternal(selection, selection.start, selection.end);
        }
        if (isRemoved) {
            this.pasteContent(widgets, currentFormat);
        }
        else if (this.editorHistory) {
            this.editorHistory.currentBaseHistoryInfo = undefined;
        }
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.updateHistory();
            this.editorHistory.updateComplexHistory();
        }
        else {
            this.reLayout(selection, selection.isEmpty);
        }
        this.isPaste = false;
    };
    /* tslint:disable:no-any */
    Editor.prototype.pasteContent = function (widgets, currentFormat) {
        /* tslint:enable:no-any */
        this.viewer.owner.isShiftingEnabled = true;
        var insertPosition = '';
        this.updateInsertPosition();
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            insertPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
        }
        else {
            var position = this.selection.start;
            if (!this.selection.isForward) {
                position = this.selection.end;
            }
            var blockInfo = this.selection.getParagraphInfo(position);
            insertPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        this.viewer.owner.isLayoutEnabled = true;
        this.viewer.owner.isPastingContent = true;
        this.pasteCopiedData(widgets, currentFormat);
        var endPosition = '';
        this.updateEndPosition();
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            endPosition = this.editorHistory.currentBaseHistoryInfo.endPosition;
        }
        else {
            var blockInfo = this.selection.getParagraphInfo(this.selection.start);
            endPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        var startPosition = new TextPosition(this.viewer.owner);
        this.setPositionForCurrentIndex(startPosition, insertPosition);
        var end = new TextPosition(this.viewer.owner);
        this.setPositionForCurrentIndex(end, endPosition);
        this.pasteTextPosition = { startPosition: startPosition, endPosition: end };
        this.viewer.owner.isPastingContent = false;
        this.viewer.selection.fireSelectionChanged(true);
    };
    Editor.prototype.pasteCopiedData = function (widgets, currentFormat) {
        if (this.viewer.layout.isBidiReLayout) {
            this.viewer.layout.isBidiReLayout = false;
        }
        for (var j = 0; j < widgets.length; j++) {
            var widget = widgets[j];
            if (widget instanceof ParagraphWidget && widget.childWidgets.length === 0) {
                widget.childWidgets[0] = new LineWidget(widget);
            }
            if (widget instanceof ParagraphWidget && !isNullOrUndefined(currentFormat)) {
                widget.paragraphFormat.copyFormat(currentFormat);
                var insertFormat = this.copyInsertFormat(this.selection.start.paragraph.characterFormat, false);
                widget.characterFormat.mergeFormat(insertFormat);
            }
            if (j === widgets.length - 1 && widget instanceof ParagraphWidget) {
                var newParagraph = widget;
                if (newParagraph.childWidgets.length > 0
                    && newParagraph.childWidgets[0].children.length > 0) {
                    var insertPosition = this.selection.start;
                    if ((insertPosition.paragraph.paragraphFormat.textAlignment === 'Center'
                        || insertPosition.paragraph.paragraphFormat.textAlignment === 'Right') &&
                        insertPosition.paragraph.paragraphFormat.listFormat.listId === -1) {
                        insertPosition.paragraph.x = this.viewer.clientActiveArea.x;
                    }
                    this.insertElement(newParagraph.childWidgets[0].children, newParagraph.paragraphFormat);
                }
            }
            else if (widget instanceof BlockWidget) {
                var startParagraph = this.selection.start.paragraph;
                if (widget instanceof TableWidget && startParagraph.isInsideTable) {
                    var table = widget;
                    //Handled to resize table based on parent cell width.
                    var clientWidth = startParagraph.getContainerWidth();
                    table.fitCellsToClientArea(clientWidth);
                }
                if (widget instanceof TableWidget && startParagraph.isEmpty()
                    && startParagraph.previousWidget instanceof TableWidget) {
                    this.insertTableRows(widget, startParagraph.previousWidget);
                }
                else {
                    this.insertBlockInternal(widget);
                }
            }
        }
    };
    /**
     * Insert Table on undo
     * @param  {WTable} table
     * @param  {WTable} newTable
     * @param  {boolean} moveRows
     * @private
     */
    Editor.prototype.insertTableInternal = function (table, newTable, moveRows) {
        //Gets the index of current table.
        var insertIndex = table.getIndex();
        if (moveRows) {
            //Moves the rows to table.
            for (var i = 0, index = 0; i < table.childWidgets.length; i++, index++) {
                var row = table.childWidgets[i];
                newTable.childWidgets.splice(index, 0, row);
                row.containerWidget = newTable;
                table.childWidgets.splice(i, 1);
                i--;
            }
        }
        var owner = table.containerWidget;
        this.removeBlock(table);
        //Inserts table in the current table position.        
        var blockAdvCollection = owner.childWidgets;
        blockAdvCollection.splice(insertIndex, 0, newTable);
        newTable.index = table.index;
        table.containerWidget = undefined;
        newTable.containerWidget = owner;
        this.viewer.layout.clearTableWidget(newTable, true, true, true);
        newTable.buildTableColumns();
        newTable.isGridUpdated = true;
        this.updateNextBlocksIndex(newTable, true);
        this.viewer.layout.linkFieldInTable(newTable);
        this.viewer.layout.layoutBodyWidgetCollection(newTable.index, owner, newTable, false);
    };
    /**
     * Insert Table on undo
     * @param  {Selection} selection
     * @param  {WBlock} block
     * @param  {WTable} table
     * @private
     */
    Editor.prototype.insertBlockTable = function (selection, block, table) {
        var offset = selection.start.offset;
        var lineIndex = selection.start.paragraph.childWidgets.indexOf(selection.start.currentWidget);
        if (block instanceof ParagraphWidget && offset > 0) {
            //Moves the inline items before selection start to the inserted paragraph.
            // tslint:disable-next-line:max-line-length
            this.moveInlines(selection.start.paragraph, block, 0, 0, selection.start.paragraph.firstChild, offset, selection.start.currentWidget);
            selection.selectParagraphInternal(selection.start.paragraph, true);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(this.selection.getHierarchicalIndex(block, offset.toString()), true);
            }
        }
        if (offset > 0 && this.checkInsertPosition(selection)) {
            this.updateHistoryPosition(selection.start, true);
        }
        var index = table.indexInOwner;
        table.containerWidget.childWidgets.splice(index, 0, block);
        block.containerWidget = table.containerWidget;
        block.index = table.index;
        this.updateNextBlocksIndex(block, true);
        this.viewer.layout.layoutBodyWidgetCollection(block.index, block.containerWidget, block, false);
        if (this.checkInsertPosition(selection)) {
            var paragraph = undefined;
            if (block instanceof ParagraphWidget) {
                paragraph = block;
            }
            if (block instanceof TableWidget) {
                paragraph = selection.getFirstParagraphInFirstCell(block);
            }
            this.updateHistoryPosition(this.selection.getHierarchicalIndex(paragraph, '0'), true);
        }
    };
    /**
     * On cut handle selected content remove and relayout
     * @param  {Selection} selection
     * @param  {TextPosition} startPosition
     * @param  {TextPosition} endPosition
     * @private
     */
    Editor.prototype.handleCut = function (selection) {
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        // this.owner.isShiftingEnabled = true;
        var blockInfo = this.selection.getParagraphInfo(startPosition);
        selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        var image = undefined;
        if (startPosition.paragraph === endPosition.paragraph && startPosition.offset + 1 === endPosition.offset) {
            //Gets selected image and copy image to clipboard.
            var index = 0;
            var currentInline = startPosition.paragraph.getInline(endPosition.offset, index);
            var inline = currentInline.element;
            image = inline;
        }
        this.initHistory('Cut');
        selection.owner.isShiftingEnabled = true;
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(selection.editPosition, true);
            }
        }
        this.deleteSelectedContent(endPosition.paragraph, selection, startPosition, endPosition, 3);
        var textPosition = new TextPosition(selection.owner);
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            if (this.checkEndPosition(selection)) {
                this.updateHistoryPosition(selection.end, false);
            }
        }
        this.reLayout(selection);
    };
    Editor.prototype.insertInlineInternal = function (element) {
        var selection = this.selection;
        var length = element.length;
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        if (selection.start.paragraph.isEmpty()) {
            var paragraph = selection.start.paragraph;
            if ((paragraph.paragraphFormat.textAlignment === 'Center' || paragraph.paragraphFormat.textAlignment === 'Right')
                && paragraph.paragraphFormat.listFormat.listId === -1) {
                paragraph.x = this.viewer.clientActiveArea.x;
            }
            paragraph.childWidgets[0].children.push(element);
            element.line = paragraph.childWidgets[0];
            element.linkFieldCharacter(this.viewer);
            this.viewer.layout.reLayoutParagraph(paragraph, 0, 0);
        }
        else {
            var indexInInline = 0;
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset, indexInInline);
            var curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            this.insertElementInternal(curInline, element, indexInInline, true);
        }
        this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
    };
    Editor.prototype.insertElement = function (element, paragraphFormat) {
        var selection = this.selection;
        var length = 0;
        var paragraph = undefined;
        var lineIndex = -1;
        var lineWidget = undefined;
        var insertIndex = 0;
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        if (selection.start.paragraph.isEmpty()) {
            paragraph = selection.start.paragraph;
            lineWidget = paragraph.childWidgets[0];
            lineIndex = 0;
        }
        else {
            var indexInInline = 0;
            var inlineObj = selection.start.currentWidget.getInline(selection.start.offset, indexInInline);
            var curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            paragraph = curInline.line.paragraph;
            lineIndex = paragraph.childWidgets.indexOf(curInline.line);
            insertIndex = curInline.indexInOwner;
            lineWidget = curInline.line;
            if (indexInInline === curInline.length) { // Add new Element in current 
                insertIndex++;
            }
            else if (indexInInline === 0) {
                if (isNullOrUndefined(curInline.previousNode)) {
                    insertIndex = 0;
                }
            }
            else {
                insertIndex++;
                var prevElement = new TextElementBox();
                prevElement.characterFormat.copyFormat(curInline.characterFormat);
                prevElement.text = curInline.text.substring(indexInInline);
                curInline.text = curInline.text.substr(0, indexInInline);
                lineWidget.children.splice(insertIndex, 0, prevElement);
                prevElement.line = curInline.line;
            }
        }
        for (var i = 0; i < element.length; i++) {
            length += element[i].length;
            if (element[i] instanceof TextElementBox && element[i].text.indexOf(' ') >= 0) {
                this.viewer.triggerSpellCheck = true;
            }
            element[i].ischangeDetected = true;
            lineWidget.children.splice(insertIndex, 0, element[i]);
            element[i].line = lineWidget;
            element[i].linkFieldCharacter(this.viewer);
            insertIndex++;
        }
        if (paragraphFormat) {
            paragraph.paragraphFormat.copyFormat(paragraphFormat);
        }
        this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, 0, paragraph.paragraphFormat.bidi);
        this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
    };
    Editor.prototype.insertElementInternal = function (element, newElement, index, relayout) {
        var line = element.line;
        var paragraph = line.paragraph;
        var lineIndex = line.indexInOwner;
        var insertIndex = element.indexInOwner;
        var isBidi = paragraph.paragraphFormat.bidi && element.isRightToLeft;
        if (index === element.length) {
            // Add new Element in current 
            if (!isBidi) {
                insertIndex++;
            }
            line.children.splice(insertIndex, 0, newElement);
        }
        else if (index === 0) {
            if (isNullOrUndefined(element.previousNode)) {
                element.line.children.splice(0, 0, newElement);
                insertIndex = 0;
            }
            else {
                element.line.children.splice(insertIndex, 0, newElement);
            }
        }
        else {
            if (!isBidi) {
                insertIndex++;
            }
            var textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(element.characterFormat);
            textElement.text = element.text.substring(index);
            element.text = element.text.substr(0, index);
            line.children.splice(insertIndex, 0, textElement);
            textElement.line = element.line;
            //Inserts the new inline.
            line.children.splice(isBidi ? insertIndex + 1 : insertIndex, 0, newElement);
            insertIndex -= 1;
        }
        newElement.line = element.line;
        newElement.linkFieldCharacter(this.viewer);
        if (relayout) {
            this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, insertIndex);
        }
    };
    /**
     * Insert Block on undo
     * @param  {Selection} selection
     * @param  {WBlock} block
     * @private
     */
    Editor.prototype.insertBlock = function (block) {
        var isRemoved = true;
        var selection = this.selection;
        if (!selection.isEmpty) {
            isRemoved = this.removeSelectedContents(selection);
        }
        if (!isRemoved) {
            selection.selectContent(selection.start, false);
        }
        this.insertBlockInternal(block);
        if (this.checkInsertPosition(selection)) {
            var paragraph = undefined;
            if (block instanceof ParagraphWidget) {
                paragraph = block;
            }
            else {
                paragraph = this.selection.getFirstParagraphInFirstCell(block);
            }
            // tslint:disable-next-line:max-line-length
            this.updateHistoryPosition(this.selection.getHierarchicalIndex(paragraph, '0'), true);
        }
        this.fireContentChange();
    };
    /**
     * Insert new Block on specific index
     * @param  {Selection} selection
     * @param  {BlockWidget} block
     * @private
     */
    Editor.prototype.insertBlockInternal = function (block) {
        var selection = this.selection;
        var isRemoved = true;
        var startPara = this.selection.start.paragraph;
        if (!selection.start.isAtParagraphStart) {
            if (block instanceof ParagraphWidget) {
                this.insertNewParagraphWidget(block, false);
                return;
            }
            this.updateInsertPosition();
            startPara = startPara.combineWidget(this.viewer);
            // tslint:disable-next-line:max-line-length
            this.splitParagraph(startPara, startPara.firstChild, 0, selection.start.currentWidget, selection.start.offset, false);
            selection.selectParagraphInternal(this.selection.start.paragraph, true);
        }
        var bodyWidget = selection.start.paragraph.containerWidget;
        var blockIndex = selection.start.paragraph.index;
        var insertIndex = bodyWidget.childWidgets.indexOf(selection.start.paragraph);
        if (!isNullOrUndefined(bodyWidget)) {
            bodyWidget.childWidgets.splice(insertIndex, 0, block);
            block.containerWidget = bodyWidget;
            block.index = blockIndex;
            block.height = 0;
            if (block instanceof TableWidget) {
                block.isGridUpdated = false;
                block.buildTableColumns();
                block.isGridUpdated = true;
            }
            this.updateNextBlocksIndex(block, true);
            this.viewer.layout.layoutBodyWidgetCollection(blockIndex, bodyWidget, block, false);
        }
    };
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     * @param {string} imageString  Base64 string, web URL or file URL.
     * @param {number} width? Image width
     * @param {number} height? Image height
     */
    Editor.prototype.insertImage = function (imageString, width, height) {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        if (isNullOrUndefined(width)) {
            width = 100;
        }
        if (isNullOrUndefined(height)) {
            height = 100;
        }
        this.insertPicture(imageString, width, height);
    };
    /**
     * Inserts a table of specified size at cursor position
     *  in the document editor.
     * @param {number} rows Default value of ‘rows’ parameter is 1.
     * @param {number} columns Default value of ‘columns’ parameter is 1.
     */
    Editor.prototype.insertTable = function (rows, columns) {
        var startPos = this.selection.start;
        if (this.owner.isReadOnlyMode) {
            return;
        }
        rows = rows || 1;
        columns = columns || 1;
        var table = this.createTable(rows, columns);
        var clientWidth = startPos.paragraph.getContainerWidth();
        table.splitWidthToTableCells(clientWidth);
        var prevBlock = startPos.paragraph.previousWidget;
        if (startPos.currentWidget.isFirstLine() && startPos.offset === 0 && prevBlock instanceof TableWidget) {
            this.insertTableRows(table, prevBlock);
            table.destroy();
            return;
        }
        else {
            this.initHistory('InsertTable');
            this.viewer.owner.isShiftingEnabled = true;
            this.insertBlock(table);
        }
        var startLine = this.selection.getFirstParagraphInFirstCell(table).childWidgets[0];
        startPos.setPosition(startLine, true);
        this.selection.end.setPositionInternal(startPos);
        var lastParagraph = this.selection.getLastParagraphInLastCell(table.getSplitWidgets().pop());
        var endOffset = lastParagraph.getLength() + 1;
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            // tslint:disable-next-line:max-line-length
            this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(lastParagraph, endOffset.toString());
        }
        this.reLayout(this.selection);
    };
    /**
     * Inserts the specified number of rows to the table above or below to the row at cursor position.
     * @param {boolean} above The above parameter is optional and if omitted,
     * it takes the value as false and inserts below the row at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     */
    Editor.prototype.insertRow = function (above, count) {
        var rowPlacement = above ? 'Above' : 'Below';
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        if (startPos.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory(rowPlacement === 'Above' ? 'InsertRowAbove' : 'InsertRowBelow');
            }
            this.viewer.owner.isShiftingEnabled = true;
            var startCell = this.getOwnerCell(this.selection.isForward).getSplitWidgets()[0];
            var endCell = this.getOwnerCell(!this.selection.isForward).getSplitWidgets()[0];
            var table = startCell.ownerTable.combineWidget(this.viewer);
            var row = rowPlacement === 'Below' ? endCell.ownerRow : startCell.ownerRow;
            if (this.editorHistory) {
                var clonedTable = this.cloneTableToHistoryInfo(table);
            }
            var rowCount = count ? count : this.getRowCountToInsert();
            var rows = [];
            var index = row.rowIndex;
            if (rowPlacement === 'Below') {
                index++;
                var isAffectedByRowSpannedCell = isNullOrUndefined(endCell.previousWidget)
                    || endCell.columnIndex === endCell.previousWidget.columnIndex + 1;
                var isRowSpanEnd = endCell.cellIndex !== endCell.columnIndex && isAffectedByRowSpannedCell
                    && row.rowIndex + startCell.cellFormat.rowSpan - 1 === endCell.ownerRow.rowIndex;
                if (!isRowSpanEnd) {
                    if (endCell.cellFormat.rowSpan > 1) {
                        if (!isNullOrUndefined(row.nextWidget) && row.nextWidget instanceof TableRowWidget) {
                            endCell.cellFormat.rowSpan += rowCount;
                            row = row.nextWidget;
                        }
                    }
                }
            }
            for (var i = 0; i < rowCount; i++) {
                var cellCountInfo = this.updateRowspan(row, rowPlacement === 'Below' ? endCell : startCell, rowPlacement);
                var newRow = this.createRowAndColumn(cellCountInfo.count, i);
                newRow.rowFormat.copyFormat(row.rowFormat);
                this.updateCellFormatForInsertedRow(newRow, cellCountInfo.cellFormats);
                rows.push(newRow);
            }
            table.insertTableRowsInternal(rows, index);
            var cell = undefined;
            var paragraph = undefined;
            if ((table.childWidgets[index] instanceof TableRowWidget)) {
                cell = table.childWidgets[index].firstChild;
                paragraph = this.selection.getFirstParagraph(cell);
            }
            else {
                var widget = undefined;
                while (!(widget instanceof TableWidget)) {
                    widget = table.nextRenderedWidget;
                }
                paragraph = this.selection.getFirstParagraphInFirstCell(widget);
            }
            this.viewer.layout.reLayoutTable(table);
            this.selection.selectParagraphInternal(paragraph, true);
        }
        this.reLayout(this.selection, true);
    };
    /**
     * Fits the table based on AutoFitType.
     * @param {AutoFitType} - auto fit type
     */
    Editor.prototype.autoFitTable = function (fitType) {
        if (this.viewer.owner.isReadOnlyMode) {
            return;
        }
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        if (!this.selection.isForward) {
            startPosition = this.selection.end;
            endPosition = this.selection.start;
        }
        var tableAdv = this.selection.getTable(startPosition, endPosition);
        tableAdv = tableAdv.getSplitWidgets()[0];
        var parentTable = this.viewer.layout.getParentTable(tableAdv);
        if (!isNullOrUndefined(parentTable)) {
            this.setOffsetValue(this.selection);
            parentTable = parentTable.combineWidget(this.viewer);
            // tslint:disable-next-line:max-line-length
            this.initHistory(fitType === 'FitToContents' ? 'TableAutoFitToContents' : fitType === 'FitToWindow' ? 'TableAutoFitToWindow' : 'TableFixedColumnWidth');
            if (this.viewer.owner.editorHistoryModule) {
                this.cloneTableToHistoryInfo(parentTable);
            }
            parentTable.updateProperties(true, tableAdv, fitType);
            this.viewer.owner.isShiftingEnabled = true;
            //Layouts the table.
            this.viewer.layout.reLayoutTable(tableAdv);
            this.reLayout(this.selection, true);
        }
    };
    Editor.prototype.updateCellFormatForInsertedRow = function (newRow, cellFormats) {
        for (var i = 0; i < newRow.childWidgets.length; i++) {
            newRow.childWidgets[i].cellFormat.copyFormat(cellFormats[i]);
            newRow.childWidgets[i].cellFormat.rowSpan = 1;
        }
    };
    Editor.prototype.updateRowspan = function (row, startCell, rowPlacement) {
        var spannedCells = row.getPreviousRowSpannedCells(true);
        var count = 0;
        var cellFormats = [];
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var isCellIncluded = false;
            // Need to check with all the row spanned cells. if the start cell contains rowspan greater than 1, 
            // and when inserting below, need to increment rowspan for all row spanned cells by 1 except
            // if the spanned cells is placed in the same column or cell to be cloned has the same row index of cloned cell row index.
            // and when inserting above, if cloned cell placed in the same row of start cell or
            // if the cloned cell has equal column index, need to skip updating rowspan value of cloned cell.
            // else update row span value for spanned cell except 
            // if the spanned cells is placed in the same column or cell to be cloned has the same row index of cloned cell row index.
            var isRowSpanned = (isNullOrUndefined(cell.previousWidget)
                || cell.columnIndex !== cell.previousWidget.columnIndex + 1);
            for (var j = 0; j < spannedCells.length; j++) {
                if (isRowSpanned) {
                    var spannedCell = spannedCells[j];
                    var clonedRowIndex = spannedCell.ownerRow.rowIndex + spannedCell.cellFormat.rowSpan - 1;
                    if (cell.columnIndex < spannedCell.columnIndex && cell.cellIndex !== cell.columnIndex) {
                        isCellIncluded = true;
                        count++;
                        cellFormats.push(cell.cellFormat);
                    }
                    if (startCell.cellFormat.rowSpan === 1) {
                        // Need to check whether cell is affected by a row spanned cell. if cell is placed on the row where it is affected 
                        // by row spanned cell, then if we are inserting row below, need to add new cell with spanned cell width
                        // or if we are inserting above, need to update row span value of the spanned cell.
                        // if cell is placed inbetween the spanned cell , 
                        // then if we are inserting below, need to update row span value of spanned cell or
                        // if we are inserting above, need to skip updating row span value except
                        // if start cell is placed on the same row of spanned cell or if start cell placed in the same column.
                        if (clonedRowIndex > cell.ownerRow.rowIndex) {
                            if (rowPlacement === 'Above'
                                && spannedCell.ownerRow === startCell.ownerRow) {
                                continue;
                            }
                            else {
                                spannedCell.cellFormat.rowSpan += 1;
                                spannedCells.splice(j, 1);
                                j--;
                            }
                        }
                        else if (cell.cellIndex !== cell.columnIndex && isRowSpanned && clonedRowIndex === cell.ownerRow.rowIndex) {
                            if (rowPlacement === 'Above') {
                                spannedCell.cellFormat.rowSpan += 1;
                                spannedCells.splice(j, 1);
                                j--;
                            }
                            else {
                                count++;
                                cellFormats.push(spannedCell.cellFormat);
                                spannedCells.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    else {
                        if (spannedCell !== startCell) {
                            if (rowPlacement === 'Above'
                                && (spannedCell.ownerRow === startCell.ownerRow || spannedCell.columnIndex === startCell.columnIndex)) {
                                continue;
                            }
                            else {
                                if (spannedCell.columnIndex !== startCell.columnIndex
                                    && spannedCell.ownerRow.rowIndex !== cell.ownerRow.rowIndex
                                    && (clonedRowIndex > startCell.ownerRow.rowIndex
                                        || (rowPlacement === 'Above' && clonedRowIndex === startCell.ownerRow.rowIndex))) {
                                    spannedCell.cellFormat.rowSpan += 1;
                                    spannedCells.splice(j, 1);
                                    j--;
                                }
                            }
                        }
                    }
                }
            }
            if (spannedCells.indexOf(cell) === -1 && cell.cellFormat.rowSpan > 1) {
                isCellIncluded = true;
            }
            if (!isCellIncluded) {
                count++;
                cellFormats.push(cell.cellFormat);
            }
        }
        return { count: count, cellFormats: cellFormats };
    };
    Editor.prototype.insertTableRows = function (table, prevBlock) {
        this.initHistory('InsertRowBelow');
        table.containerWidget = prevBlock.containerWidget;
        prevBlock = prevBlock.combineWidget(this.viewer);
        if (this.editorHistory) {
            var clonedTable = this.cloneTableToHistoryInfo(prevBlock);
        }
        var row = prevBlock.childWidgets[prevBlock.childWidgets.length - 1];
        prevBlock.insertTableRowsInternal(table.childWidgets, prevBlock.childWidgets.length);
        var paragraph = this.selection.getFirstParagraph(row.nextWidget.childWidgets[0]);
        prevBlock.isDefaultFormatUpdated = false;
        this.viewer.layout.reLayoutTable(prevBlock);
        this.selection.selectParagraphInternal(paragraph, true);
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
            this.updateHistoryPosition(this.selection.start, true);
            this.updateHistoryPosition(this.selection.end, false);
        }
        this.reLayout(this.selection);
    };
    /**
     * Inserts the specified number of columns to the table left or right to the column at cursor position.
     * @param {number} left The left parameter is optional and if omitted, it takes the value as false and
     * inserts to the right of column at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     */
    Editor.prototype.insertColumn = function (left, count) {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var columnPlacement = left ? 'Left' : 'Right';
        if (this.selection.start.paragraph.isInsideTable) {
            if (this.checkIsNotRedoing()) {
                this.initHistory(columnPlacement === 'Left' ? 'InsertColumnLeft' : 'InsertColumnRight');
            }
            this.selection.owner.isShiftingEnabled = true;
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            var table = startCell.ownerRow.ownerTable.combineWidget(this.viewer);
            if (this.editorHistory) {
                //Clones the entire table to preserve in history.
                var clonedTable = this.cloneTableToHistoryInfo(table);
            }
            this.selection.owner.isLayoutEnabled = false;
            var cellIndex = startCell.columnIndex;
            if (columnPlacement === 'Right') {
                cellIndex = endCell.columnIndex + endCell.cellFormat.columnSpan;
            }
            var startParagraph = undefined;
            var newCell = undefined;
            var columnCount = count ? count : this.getColumnCountToInsert();
            var rowSpannedCells = [];
            var rowSpanCellIndex = cellIndex;
            for (var i = 0; i < columnCount; i++) {
                for (var j = 0; j < table.childWidgets.length; j++) {
                    var row = table.childWidgets[j];
                    newCell = this.createColumn(this.selection.getLastParagraph(startCell));
                    newCell.index = j;
                    newCell.rowIndex = row.rowIndex;
                    newCell.containerWidget = row;
                    newCell.cellFormat.copyFormat(startCell.cellFormat);
                    newCell.cellFormat.rowSpan = 1;
                    if (isNullOrUndefined(startParagraph)) {
                        startParagraph = this.selection.getFirstParagraph(newCell);
                    }
                    if (cellIndex === 0) {
                        row.childWidgets.splice(cellIndex, 0, newCell);
                    }
                    else {
                        var isCellInserted = false;
                        for (var j_1 = 0; j_1 < row.childWidgets.length; j_1++) {
                            var rowCell = row.childWidgets[j_1];
                            // Add the row spanned cells to colection for adding column before / after row spnned cells.
                            if (rowCell.cellFormat.rowSpan > 1) {
                                rowSpannedCells.push(rowCell);
                            }
                            if (rowCell.columnIndex + rowCell.cellFormat.columnSpan === cellIndex) {
                                row.childWidgets.splice(rowCell.cellIndex + 1, 0, newCell);
                                isCellInserted = true;
                            }
                            else if (cellIndex > rowCell.columnIndex && rowCell.columnIndex + rowCell.cellFormat.columnSpan > cellIndex
                                && cellIndex < rowCell.columnIndex + rowCell.cellFormat.columnSpan) {
                                row.childWidgets.splice(rowCell.cellIndex, 0, newCell);
                                isCellInserted = true;
                            }
                            if (isCellInserted) {
                                break;
                            }
                        }
                        // If the cell is not inserted for row, then check for row spanned cells.
                        if (!isCellInserted) {
                            if (rowSpannedCells.length > 0) {
                                for (var k = 0; k < rowSpannedCells.length; k++) {
                                    var rowSpannedCell = rowSpannedCells[k];
                                    if (rowSpannedCell.ownerRow !== row
                                        && row.rowIndex <= rowSpannedCell.ownerRow.rowIndex + rowSpannedCell.cellFormat.rowSpan - 1) {
                                        if (rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan === cellIndex) {
                                            if (rowSpannedCell.cellIndex > row.childWidgets.length) {
                                                row.childWidgets.push(newCell);
                                            }
                                            else {
                                                row.childWidgets.splice(rowSpannedCell.cellIndex, 0, newCell);
                                            }
                                            isCellInserted = true;
                                        }
                                        else if (cellIndex > rowSpannedCell.columnIndex &&
                                            rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan > cellIndex
                                            && cellIndex < rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan) {
                                            row.childWidgets.splice(rowSpannedCell.columnIndex, 0, newCell);
                                            isCellInserted = true;
                                        }
                                    }
                                    if (isCellInserted) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            table.updateRowIndex(0);
            var parentTable = this.viewer.layout.getParentTable(table);
            if (parentTable) {
                parentTable.fitChildToClientArea();
            }
            else {
                table.fitChildToClientArea();
            }
            this.selection.owner.isLayoutEnabled = true;
            table.isGridUpdated = false;
            table.buildTableColumns();
            table.isGridUpdated = true;
            this.viewer.skipScrollToPosition = true;
            this.viewer.layout.reLayoutTable(table);
            this.selection.start.setPosition(startParagraph.firstChild, true);
            this.selection.end.setPosition(this.selection.getLastParagraph(newCell).firstChild, false);
            if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
                this.reLayout(this.selection);
            }
        }
    };
    /**
     * Creates table with specified rows and columns.
     * @private
     */
    Editor.prototype.createTable = function (rows, columns) {
        var startPara = this.selection.start.paragraph;
        var table = new TableWidget();
        table.tableFormat = new WTableFormat(table);
        table.tableFormat.preferredWidthType = 'Auto';
        table.tableFormat.initializeTableBorders();
        var index = 0;
        while (index < rows) {
            var tableRow = this.createRowAndColumn(columns, index);
            tableRow.rowFormat.heightType = 'Auto';
            tableRow.containerWidget = table;
            table.childWidgets.push(tableRow);
            index++;
        }
        return table;
    };
    Editor.prototype.createRowAndColumn = function (columns, rowIndex) {
        var startPara = this.selection.start.paragraph;
        var tableRow = new TableRowWidget();
        tableRow.rowFormat = new WRowFormat(tableRow);
        tableRow.index = rowIndex;
        for (var i = 0; i < columns; i++) {
            var tableCell = this.createColumn(startPara);
            tableCell.index = i;
            tableCell.rowIndex = rowIndex;
            tableCell.containerWidget = tableRow;
            tableRow.childWidgets.push(tableCell);
        }
        return tableRow;
    };
    Editor.prototype.createColumn = function (paragraph) {
        var tableCell = new TableCellWidget();
        var para = new ParagraphWidget();
        para.paragraphFormat.copyFormat(paragraph.paragraphFormat);
        para.characterFormat.copyFormat(paragraph.characterFormat);
        para.containerWidget = tableCell;
        tableCell.childWidgets.push(para);
        tableCell.cellFormat = new WCellFormat(tableCell);
        return tableCell;
    };
    Editor.prototype.getColumnCountToInsert = function () {
        var count = 1;
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        if (start && end && this.selection.getTable(start, end)) {
            if (start.paragraph.associatedCell === end.paragraph.associatedCell) {
                return count = 1;
            }
            if (start.paragraph.associatedCell.ownerRow === end.paragraph.associatedCell.ownerRow) {
                return count = count + end.paragraph.associatedCell.cellIndex - start.paragraph.associatedCell.cellIndex;
            }
            else {
                count = 0;
                // tslint:disable-next-line:max-line-length
                var selectedCells = start.paragraph.associatedCell.ownerTable.getColumnCellsForSelection(start.paragraph.associatedCell, end.paragraph.associatedCell);
                for (var i = 0; i < selectedCells.length; i++) {
                    if (start.paragraph.associatedCell.ownerRow === selectedCells[i].ownerRow) {
                        count++;
                    }
                }
            }
        }
        return count === 0 ? 1 : count;
    };
    Editor.prototype.getRowCountToInsert = function () {
        var count = 1;
        var start = this.selection.start;
        var end = this.selection.end;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end) && !isNullOrUndefined(this.selection.getTable(start, end))) {
            if (start.paragraph.associatedCell === end.paragraph.associatedCell ||
                start.paragraph.associatedCell.ownerRow === end.paragraph.associatedCell.ownerRow) {
                return count = 1;
            }
            else {
                return count = count +
                    this.getOwnerRow(!this.selection.isForward).rowIndex - this.getOwnerRow(this.selection.isForward).rowIndex;
            }
        }
        return count === 0 ? 1 : count;
    };
    Editor.prototype.getOwnerCell = function (isStart) {
        var cell = undefined;
        var startCell = isStart ? this.selection.start.paragraph.associatedCell
            : this.selection.end.paragraph.associatedCell;
        var endCell = isStart ? this.selection.end.paragraph.associatedCell
            : this.selection.start.paragraph.associatedCell;
        cell = startCell;
        var owner = cell.ownerTable;
        while (!isNullOrUndefined(owner) && owner.containerWidget instanceof TableCellWidget && owner !== endCell.ownerTable) {
            cell = owner.containerWidget;
            owner = cell.ownerTable;
        }
        return cell;
    };
    Editor.prototype.getOwnerRow = function (isStart) {
        var row;
        var startRow = isStart ? this.selection.start.paragraph.associatedCell.ownerRow
            : this.selection.end.paragraph.associatedCell.ownerRow;
        var endRow = isStart ? this.selection.end.paragraph.associatedCell.ownerRow
            : this.selection.start.paragraph.associatedCell.ownerRow;
        row = startRow;
        var owner = row.ownerTable;
        while (!isNullOrUndefined(owner) && owner.containerWidget instanceof TableCellWidget && owner !== endRow.ownerTable) {
            row = owner.containerWidget.ownerRow;
            owner = row.ownerTable;
        }
        return row;
    };
    Editor.prototype.getOwnerTable = function (isStart) {
        var table = undefined;
        var startTable = this.selection.start.paragraph.associatedCell.ownerTable;
        var endTable = this.selection.end.paragraph.associatedCell.ownerTable;
        table = isStart ? startTable : endTable;
        while (table.containerWidget instanceof TableCellWidget && table !== (isStart ? endTable : startTable)) {
            table = table.containerWidget.ownerTable;
        }
        return table;
    };
    /**
     * Merge Selected cells
     * @private
     */
    Editor.prototype.mergeSelectedCellsInTable = function () {
        if (!this.canMergeCells()) {
            return;
        }
        if (this.checkIsNotRedoing()) {
            this.initHistory('MergeCells');
        }
        this.selection.owner.isShiftingEnabled = true;
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        if (!this.selection.isForward) {
            startPosition = this.selection.end;
            endPosition = this.selection.start;
        }
        var startOwnerCell = this.getOwnerCell(this.selection.isForward);
        var endOwnerCell = this.getOwnerCell(!this.selection.isForward);
        var containerCell = this.selection.getContainerCellOf(startOwnerCell, endOwnerCell);
        if (containerCell.ownerTable.contains(endOwnerCell)) {
            if (!this.selection.containsCell(containerCell, endOwnerCell)) {
                //Start and End are in different cells.               
                var table = startOwnerCell.ownerTable.combineWidget(this.viewer);
                startOwnerCell = this.selection.getSelectedCell(startOwnerCell, containerCell);
                endOwnerCell = this.selection.getSelectedCell(endOwnerCell, containerCell);
                //Merges the selected cells.               
                var mergedCell = this.mergeSelectedCells(table, startOwnerCell, endOwnerCell);
                var firstParagraph = this.selection.getFirstParagraph(mergedCell);
                startPosition.setPosition(firstParagraph.firstChild, true);
                var lastParagraph = this.selection.getLastParagraph(mergedCell);
                endPosition.setPosition(lastParagraph.lastChild, false);
            }
        }
        if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
            this.reLayout(this.selection, false);
        }
    };
    Editor.prototype.mergeSelectedCells = function (table, startCell, endCell) {
        //Clones the entire table to preserve in history.
        var clonedTable = this.cloneTableToHistoryInfo(table);
        this.selection.owner.isLayoutEnabled = false;
        //Merges the selected cells.
        var start = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var end = start + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(start, end, endCellLeft, endCellRight);
        start = cellInfo.start;
        end = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var mergedCell = undefined;
        var firstBlock;
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (HelperMethods.round(start, 2) <= HelperMethods.round(cellStart, 2)
                    && HelperMethods.round(cellStart, 2) < HelperMethods.round(end, 2)) {
                    var lastBlock = cell.lastChild;
                    if (lastBlock instanceof ParagraphWidget && lastBlock.isEmpty()) {
                        cell.childWidgets.pop();
                    }
                    if (isNullOrUndefined(mergedCell)) {
                        mergedCell = cell;
                        firstBlock = lastBlock;
                    }
                    else {
                        if (i === rowStartIndex) {
                            mergedCell.cellFormat.preferredWidth += cell.cellFormat.preferredWidth;
                            mergedCell.cellFormat.columnSpan += cell.cellFormat.columnSpan;
                            this.mergeBorders(mergedCell, cell);
                        }
                        for (var k = 0; k < cell.childWidgets.length; k++) {
                            var block = cell.childWidgets[k];
                            var newBlock = block.clone();
                            newBlock.containerWidget = mergedCell;
                            mergedCell.childWidgets.push(newBlock);
                        }
                        row.childWidgets.splice(j, 1);
                        cell.destroy();
                        j--;
                    }
                }
            }
            //To Ensure minimul content. 
            // tslint:disable-next-line:max-line-length
            if ((mergedCell.childWidgets.length === 0 || mergedCell.childWidgets.length === 1 && mergedCell.childWidgets[0] instanceof TableWidget) && firstBlock) {
                var newBlock = firstBlock.clone();
                mergedCell.childWidgets.push(newBlock);
                newBlock.containerWidget = mergedCell;
            }
            if (row.childWidgets.length === 0) {
                var rowIndex = table.childWidgets.indexOf(row);
                row.updateRowBySpannedCells();
                table.childWidgets.splice(rowIndex, 1);
                row.destroy();
                count--;
                i--;
            }
        }
        if (!isNullOrUndefined(mergedCell) && rowStartIndex < count) {
            mergedCell.cellFormat.rowSpan = count - rowStartIndex + 1;
        }
        this.updateBlockIndexAfterMerge(mergedCell);
        table.updateRowIndex(0);
        table.calculateGrid();
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.viewer.layout.reLayoutTable(table);
        //Layouts the table after merging cells.
        this.selection.owner.isLayoutEnabled = true;
        return mergedCell;
    };
    Editor.prototype.mergeBorders = function (mergedCell, tableCell) {
        var mergedCellborders = undefined;
        var cellBorders = null;
        if (!isNullOrUndefined(mergedCell.cellFormat.borders)) {
            mergedCellborders = mergedCell.cellFormat.borders;
        }
        if (!isNullOrUndefined(tableCell.cellFormat.borders)) {
            cellBorders = tableCell.cellFormat.borders;
        }
        if (isNullOrUndefined(mergedCellborders) && isNullOrUndefined(cellBorders)) {
            return;
        }
        if (isNullOrUndefined(mergedCellborders)) {
            mergedCellborders = new WBorders(mergedCell.cellFormat);
            mergedCellborders.copyFormat(cellBorders);
        }
        else if (isNullOrUndefined(cellBorders)) {
            return;
        }
        else {
            if (mergedCell.ownerRow.rowIndex === tableCell.ownerRow.rowIndex) {
                mergedCellborders.top = mergedCell.getBorderBasedOnPriority(mergedCellborders.top, cellBorders.bottom);
                mergedCellborders.bottom = mergedCell.getBorderBasedOnPriority(mergedCellborders.bottom, cellBorders.bottom);
            }
        }
    };
    Editor.prototype.updateBlockIndexAfterMerge = function (cell) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            cell.childWidgets[i].index = i;
        }
    };
    /**
     * Determines whether merge cell operation can be done.
     */
    Editor.prototype.canMergeCells = function () {
        if (this.selection.isEmpty || !this.selection.start.paragraph.isInsideTable || !this.selection.end.paragraph.isInsideTable) {
            return false;
        }
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        var startCell = this.getOwnerCell(this.selection.isForward);
        var endCell = this.getOwnerCell(!this.selection.isForward);
        var containerCell = this.selection.getContainerCellOf(startCell, endCell);
        if (containerCell.ownerTable.contains(endCell)) {
            if (!this.selection.containsCell(containerCell, endCell)) {
                startCell = this.selection.getSelectedCell(startCell, containerCell);
                endCell = this.selection.getSelectedCell(endCell, containerCell);
                var rowSpan = 1;
                if (startCell.ownerRow === endCell.ownerRow) {
                    var startCellIndex = startCell.ownerRow.childWidgets.indexOf(startCell);
                    for (var i = startCellIndex; i <= startCell.ownerRow.childWidgets.indexOf(endCell); i++) {
                        var cell = startCell.ownerRow.childWidgets[i];
                        var prevCell = cell.previousWidget;
                        if (i !== startCellIndex) {
                            if (cell.cellFormat.rowSpan !== rowSpan) {
                                return false;
                            }
                            if (!isNullOrUndefined(prevCell)
                                && cell.columnIndex !== (prevCell.cellFormat.columnSpan + prevCell.columnIndex)) {
                                return false;
                            }
                        }
                        rowSpan = cell.cellFormat.rowSpan;
                    }
                    return true;
                }
                return this.canMergeSelectedCellsInTable(startCell.ownerTable, startCell, endCell);
            }
        }
        return false;
    };
    Editor.prototype.canMergeSelectedCellsInTable = function (table, startCell, endCell) {
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var startLeft = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var endLeft = startLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startLeft, endLeft, endCellLeft, endCellRight);
        startLeft = cellInfo.start;
        endLeft = cellInfo.end;
        var selectionLeft = 0;
        var selectionRight = 0;
        var isRowLeftWithinSel = false;
        var isRowRightWithinSel = false;
        var rowSpannedCells = [];
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            var rowLeft = 0;
            var rowRight = 0;
            var isStarted = false;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (this.checkCellWithInSelection(startLeft, endLeft, cellStart)) {
                    isRowLeftWithinSel = false;
                    isRowRightWithinSel = false;
                    if (cell.cellFormat.rowSpan > 1) {
                        rowSpannedCells.push(cell);
                    }
                    if (!isStarted) {
                        rowLeft = cellStart;
                        rowRight = cellStart;
                        isStarted = true;
                    }
                    var prevCell = cell.previousWidget;
                    if (rowRight !== 0 && HelperMethods.round(rowRight, 0) !== HelperMethods.round(cellStart, 0)) {
                        rowRight = cellStart;
                    }
                    rowRight += HelperMethods.convertPointToPixel(cell.cellFormat.cellWidth);
                    var isPrevCellWithinSel = this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, true);
                    var isNextCellWithinSel = this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, false);
                    // When selected cell not having row spanned cells and column index is not having immediate cell index value,
                    // then returned false.
                    var isNoRowSpan = rowSpannedCells.length === 0 || rowSpannedCells.length === 1 && rowSpannedCells[0] === cell;
                    // checks whether current cell is with in selection.
                    var isCellWithInSel = this.checkCurrentCell(rowSpannedCells, cell, isPrevCellWithinSel, isNextCellWithinSel);
                    // when last selected row not having equal row span then returned false.
                    if (i === count && !isNullOrUndefined(prevCell) && cell.cellFormat.rowSpan > prevCell.cellFormat.rowSpan
                        && !isCellWithInSel) {
                        return false;
                    }
                    if (i !== rowStartIndex) {
                        for (var m = 0; m < rowSpannedCells.length; m++) {
                            {
                                var rowSpan = (rowSpannedCells[m].ownerRow.rowIndex + rowSpannedCells[m].cellFormat.rowSpan) - 1;
                                if (rowSpan >= row.rowIndex) {
                                    if (rowSpannedCells[m].columnIndex > cell.columnIndex) {
                                        isRowRightWithinSel = true;
                                    }
                                    else {
                                        isRowLeftWithinSel = true;
                                    }
                                    if (i === count && rowSpannedCells[m] !== cell
                                        && rowSpan > (cell.ownerRow.rowIndex + cell.cellFormat.rowSpan - 1)) {
                                        return false;
                                    }
                                    if (rowSpan === row.rowIndex && !this.checkPrevOrNextCellIsWithinSel(startLeft, endLeft, cell, false)) {
                                        rowSpannedCells.splice(rowSpannedCells.indexOf(rowSpannedCells[m]), 1);
                                    }
                                }
                            }
                        }
                    }
                    if (isPrevCellWithinSel && !isNullOrUndefined(prevCell)
                        && isNoRowSpan
                        && (cell.columnIndex !== prevCell.columnIndex + 1 && this.checkCellWidth(cell))) {
                        return false;
                    }
                }
            }
            if (i === rowStartIndex) {
                selectionLeft = rowLeft;
                selectionRight = rowRight;
            }
            else {
                if (rowRight > 0 && rowLeft > 0) {
                    if (!((isRowLeftWithinSel || Math.round(selectionLeft) === Math.round(rowLeft))
                        && (isRowRightWithinSel || Math.round(selectionRight) === Math.round(rowRight)))) {
                        return false;
                    }
                }
                if (i === count) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.checkCellWidth = function (cell) {
        var prevCell = cell.previousWidget;
        var cellLeft = this.viewer.selection.getCellLeft(cell.ownerRow, cell);
        var prevCellLeft = this.viewer.selection.getCellLeft(cell.ownerRow, prevCell);
        var left = prevCellLeft + HelperMethods.convertPointToPixel(prevCell.cellFormat.cellWidth);
        if (HelperMethods.round(left, 2) !== HelperMethods.round(cellLeft, 2)) {
            return true;
        }
        return false;
    };
    ;
    Editor.prototype.checkCellWithInSelection = function (startLeft, endLeft, cellStart) {
        if (HelperMethods.round(startLeft, 2) <= HelperMethods.round(cellStart, 2)
            && HelperMethods.round(cellStart, 2) < HelperMethods.round(endLeft, 2)) {
            return true;
        }
        return false;
    };
    ;
    Editor.prototype.checkPrevOrNextCellIsWithinSel = function (startLeft, endLeft, cell, isPrev) {
        var prevOrNextCell = isPrev ? cell.previousWidget : cell.nextWidget;
        var cellStart = 0;
        if (isNullOrUndefined(prevOrNextCell)) {
            return false;
        }
        cellStart = this.viewer.selection.getCellLeft(prevOrNextCell.ownerRow, prevOrNextCell);
        return this.checkCellWithInSelection(startLeft, endLeft, cellStart);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.checkCurrentCell = function (rowSpannedCells, cell, isPrevCellWithInSel, isNextCellWithinSel) {
        var cellOwner = cell.ownerRow;
        if (rowSpannedCells.length > 0) {
            for (var i = 0; i < rowSpannedCells.length; i++) {
                var spannedCellOwner = rowSpannedCells[i].ownerRow;
                var rowSpan = (spannedCellOwner.rowIndex + rowSpannedCells[i].cellFormat.rowSpan) - 1;
                if (rowSpannedCells[i] === cell && (rowSpannedCells.length === 1 || this.checkRowSpannedCells(rowSpannedCells, cell))
                    && !(isNextCellWithinSel || isPrevCellWithInSel)) {
                    return true;
                }
                if (rowSpannedCells[i] !== cell && spannedCellOwner.rowIndex < cellOwner.rowIndex
                    && rowSpan === (cellOwner.rowIndex + cell.cellFormat.rowSpan - 1)) {
                    return true;
                }
            }
        }
        return false;
    };
    Editor.prototype.checkRowSpannedCells = function (rowSpannedCells, cell) {
        for (var i = 0; i < rowSpannedCells.length; i++) {
            if (rowSpannedCells[i] !== cell && rowSpannedCells[i].columnIndex === cell.columnIndex) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    Editor.prototype.insertNewParagraphWidget = function (newParagraph, insertAfter) {
        this.updateInsertPosition();
        this.insertParagraph(newParagraph, insertAfter);
        if (!insertAfter) {
            var nextParagraph = void 0;
            var currentParagraph = newParagraph;
            do {
                nextParagraph = this.selection.getNextParagraphBlock(currentParagraph);
                currentParagraph = nextParagraph;
            } while (nextParagraph && nextParagraph.equals(newParagraph));
            if (!isNullOrUndefined(nextParagraph)) {
                this.selection.selectParagraphInternal(nextParagraph, true);
            }
            else {
                this.selection.selectParagraphInternal(newParagraph, true);
            }
        }
        this.fireContentChange();
    };
    Editor.prototype.insertParagraph = function (newParagraph, insertAfter) {
        var lineWidget = this.selection.start.currentWidget;
        var offset = this.selection.start.offset;
        var currentParagraph = this.selection.start.paragraph;
        currentParagraph = currentParagraph.combineWidget(this.viewer);
        if (insertAfter) {
            // tslint:disable-next-line:max-line-length
            var length_1 = this.selection.getLineLength(currentParagraph.lastChild);
            var insertIndex_1 = newParagraph.firstChild ? newParagraph.firstChild.children.length : 0;
            // tslint:disable-next-line:max-line-length
            this.moveInlines(currentParagraph, newParagraph, insertIndex_1, offset, lineWidget, length_1, currentParagraph.lastChild);
        }
        else if (offset > 0) {
            this.moveInlines(currentParagraph, newParagraph, 0, 0, currentParagraph.firstChild, offset, lineWidget);
        }
        var splittedWidget = currentParagraph.getSplitWidgets();
        currentParagraph = insertAfter ? splittedWidget[splittedWidget.length - 1] : splittedWidget[0];
        var insertIndex = currentParagraph.containerWidget.childWidgets.indexOf(currentParagraph);
        if (insertAfter) {
            insertIndex++;
        }
        var bodyWidget = currentParagraph.containerWidget;
        newParagraph.index = currentParagraph.index;
        newParagraph.containerWidget = bodyWidget;
        bodyWidget.childWidgets.splice(insertIndex, 0, newParagraph);
        this.updateNextBlocksIndex(insertAfter ? currentParagraph : newParagraph, true);
        newParagraph.height = 0;
        this.viewer.layout.layoutBodyWidgetCollection(newParagraph.index, bodyWidget, newParagraph, false);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.moveInlines = function (currentParagraph, newParagraph, insertIndex, startOffset, startLine, endOffset, endLine) {
        if (newParagraph.childWidgets.length === 0) {
            var line = new LineWidget(newParagraph);
            newParagraph.childWidgets.push(line);
        }
        var isMoved = false;
        this.viewer.layout.clearListElementBox(currentParagraph);
        this.viewer.layout.clearListElementBox(newParagraph);
        for (var j = 0; j < currentParagraph.childWidgets.length; j++) {
            var lineWidget = currentParagraph.childWidgets[j];
            if (startLine === lineWidget && endLine === lineWidget) {
                insertIndex = this.moveContent(lineWidget, startOffset, endOffset, insertIndex, newParagraph);
                break;
            }
            if (endLine === lineWidget) {
                insertIndex = this.moveContent(lineWidget, 0, endOffset, insertIndex, newParagraph);
                break;
            }
            else if (startLine === lineWidget) {
                isMoved = true;
                // tslint:disable-next-line:max-line-length
                insertIndex = this.moveContent(lineWidget, startOffset, this.viewer.selection.getLineLength(lineWidget), insertIndex, newParagraph);
            }
            else if (isMoved) {
                insertIndex = this.moveContent(lineWidget, 0, this.viewer.selection.getLineLength(lineWidget), insertIndex, newParagraph);
            }
        }
        this.removeEmptyLine(currentParagraph);
        if (!currentParagraph.isInsideTable) {
            this.viewer.layout.reLayoutParagraph(currentParagraph, 0, 0);
        }
    };
    /**
     * @private
     */
    //tslint:disable-next-line:max-line-length
    Editor.prototype.moveContent = function (lineWidget, startOffset, endOffset, insertIndex, paragraph) {
        var count = 0;
        var lineIndex = lineWidget.paragraph.childWidgets.indexOf(lineWidget);
        for (var i = 0; i < lineWidget.children.length; i++) {
            var inline = lineWidget.children[i];
            if (startOffset >= count + inline.length || inline instanceof ListTextElementBox) {
                if (!(inline instanceof ListTextElementBox)) {
                    count += inline.length;
                }
                continue;
            }
            var startIndex = 0;
            if (startOffset > count) {
                startIndex = startOffset - count;
            }
            var endIndex = endOffset - count;
            if (endIndex > inline.length) {
                endIndex = inline.length;
            }
            if (startIndex > 0) {
                count += startIndex;
            }
            if (startIndex === 0 && endIndex === inline.length) {
                paragraph.firstChild.children.splice(insertIndex, 0, inline);
                inline.line = paragraph.firstChild;
                insertIndex++;
                // if (editAction < 4) {
                // this.unLinkFieldCharacter(inline);
                lineWidget.children.splice(i, 1);
                i--;
                // }
            }
            else if (inline instanceof TextElementBox) {
                // if (editAction < 4) {
                var span = new TextElementBox();
                span.characterFormat.copyFormat(inline.characterFormat);
                span.text = inline.text.substr(startIndex, endIndex - startIndex);
                inline.ischangeDetected = true;
                span.ischangeDetected = true;
                paragraph.firstChild.children.splice(insertIndex, 0, span);
                span.line = paragraph.firstChild;
                insertIndex++;
                inline.text = inline.text.slice(0, startIndex) + inline.text.slice(endIndex);
                inline.ischangeDetected = true;
            }
            if (endOffset <= count + endIndex - startIndex) {
                break;
            }
            count += endIndex - startIndex;
        }
        return insertIndex;
    };
    /**
     * update complex changes when history is not preserved
     * @param  {number} action?
     * @param  {string} start?
     * @param  {string} end?
     * @private
     */
    Editor.prototype.updateComplexWithoutHistory = function (action, start, end) {
        var selection = this.viewer.selection;
        if (action === 0) {
            var startPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(startPosition, start);
            this.viewer.layout.reLayoutParagraph(startPosition.paragraph, 0, 0);
            this.setPositionForCurrentIndex(selection.start, end);
            this.setPositionForCurrentIndex(selection.end, end);
        }
        if (action === 1) {
            var startPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(startPosition, start);
            var endPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(endPosition, end);
            this.viewer.layout.reLayoutParagraph(startPosition.paragraph, 0, 0);
            if (endPosition.paragraph !== startPosition.paragraph) {
                this.viewer.layout.reLayoutParagraph(endPosition.paragraph, 0, 0);
            }
        }
        if (selection.owner.isShiftingEnabled) {
            this.viewer.layout.shiftLayoutedItems();
            if (this.viewer.owner.enableHeaderAndFooter) {
                this.updateHeaderFooterWidget();
            }
        }
        selection.owner.isShiftingEnabled = false;
        selection.start.updatePhysicalPosition(true);
        if (selection.isEmpty) {
            selection.end.setPositionInternal(selection.start);
        }
        else {
            selection.end.updatePhysicalPosition(true);
        }
        selection.upDownSelectionLength = selection.end.location.x;
        selection.fireSelectionChanged(true);
        this.viewer.updateFocus();
        this.viewer.updateScrollBars();
        this.fireContentChange();
        this.isHandledComplex = true;
    };
    /**
     * reLayout
     * @param selection
     * @param isSelectionChanged
     * @private
     */
    Editor.prototype.reLayout = function (selection, isSelectionChanged) {
        if (!this.viewer.isComposingIME && this.editorHistory && this.editorHistory.isHandledComplexHistory()) {
            if (this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action !== 'ClearFormat') {
                this.startParagraph = undefined;
                this.endParagraph = undefined;
            }
            this.isHandledComplex = false;
            return;
        }
        if (isNullOrUndefined(this.viewer.blockToShift)) {
            this.viewer.removeEmptyPages();
            this.viewer.layout.updateFieldElements();
            this.viewer.updateScrollBars();
            if (!selection.owner.isShiftingEnabled) {
                selection.fireSelectionChanged(true);
                this.startParagraph = undefined;
                this.endParagraph = undefined;
            }
        }
        if (isNullOrUndefined(isSelectionChanged)) {
            isSelectionChanged = selection.isEmpty;
        }
        if (selection.owner.isShiftingEnabled) {
            selection.owner.isShiftingEnabled = false;
            selection.owner.isLayoutEnabled = true;
            this.viewer.layout.shiftLayoutedItems();
            if (this.viewer.owner.enableHeaderAndFooter) {
                this.updateHeaderFooterWidget();
            }
            this.getOffsetValue(selection);
            selection.upDownSelectionLength = selection.end.location.x;
            selection.fireSelectionChanged(true);
            this.viewer.updateFocus();
            this.startParagraph = undefined;
            this.endParagraph = undefined;
            this.viewer.layout.allowLayout = true;
        }
        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo &&
            ((this.editorHistory.currentBaseHistoryInfo.action !== 'RowResizing'
                && this.editorHistory.currentBaseHistoryInfo.action !== 'CellResizing')
                || (this.editorHistory.isUndoing || this.editorHistory.isRedoing))) {
            if (this.editorHistory.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                this.editorHistory.currentBaseHistoryInfo.updateSelection();
            }
            this.editorHistory.updateHistory();
        }
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.updateHeaderFooterWidget = function () {
        this.updateHeaderFooterWidgetToPage(this.selection.start.paragraph.bodyWidget);
        var headerFooterWidget = this.selection.start.paragraph.bodyWidget;
        this.shiftPageContent(headerFooterWidget.headerFooterType, headerFooterWidget.sectionFormat);
    };
    /**
     * @private
     */
    Editor.prototype.updateHeaderFooterWidgetToPage = function (node) {
        var currentPage = node.page;
        node = this.viewer.layout.updateHeaderFooterToParent(node);
        var isEvenPage = (node.headerFooterType === 'EvenHeader' || node.headerFooterType === 'EvenFooter');
        for (var i = 0; i < this.viewer.pages.length; i++) {
            var page = this.viewer.pages[i];
            if ((i + 1 === 1) && page.bodyWidgets[0].sectionFormat.differentFirstPage &&
                node.headerFooterType.indexOf('FirstPage') !== -1) {
                return;
            }
            if (page.index === 0 && page.bodyWidgets[0].sectionFormat.differentFirstPage &&
                node.headerFooterType.indexOf('FirstPage') === -1) {
                continue;
            }
            if (currentPage !== page) {
                if (page.bodyWidgets[0].sectionFormat.differentOddAndEvenPages) {
                    if (isEvenPage && (i + 1) % 2 === 0) {
                        this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                    }
                    else if ((!isEvenPage && (i + 1) % 2 !== 0)) {
                        if (page.bodyWidgets[0].sectionFormat.differentFirstPage && (i + 1 !== 1)) {
                            this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                        }
                    }
                }
                else {
                    this.updateHeaderFooterWidgetToPageInternal(page, node, node.headerFooterType.indexOf('Header') !== -1);
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.updateHeaderFooterWidgetToPageInternal = function (page, widget, isHeader) {
        if (widget.page !== page) {
            var hfWidget = widget.clone();
            hfWidget.page = page;
            this.viewer.updateHFClientArea(hfWidget.sectionFormat, isHeader);
            hfWidget = this.viewer.layout.layoutHeaderFooterItems(this.viewer, hfWidget);
            var headerOrFooter = void 0;
            if (isHeader) {
                headerOrFooter = page.headerWidget;
                page.headerWidget = hfWidget;
            }
            else {
                headerOrFooter = page.footerWidget;
                page.footerWidget = hfWidget;
            }
            this.removeFieldInWidget(headerOrFooter);
            headerOrFooter.destroy();
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeFieldInWidget = function (widget) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            this.removeFieldInBlock(widget.childWidgets[i]);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeFieldInBlock = function (block) {
        if (block instanceof TableWidget) {
            this.removeFieldTable(block);
        }
        else {
            this.removeField(block);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeFieldTable = function (table) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.removeFieldInWidget(row.childWidgets[j]);
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.shiftPageContent = function (type, sectionFormat) {
        // let type: HeaderFooterType = headerFooter.headerFooterType;
        var pageIndex;
        if (type.indexOf('First') !== -1) {
            pageIndex = 0;
        }
        else if (sectionFormat.differentOddAndEvenPages) {
            var isEven = type.indexOf('Even') !== -1;
            if (sectionFormat.differentFirstPage) {
                pageIndex = isEven ? 1 : 2;
            }
            else {
                pageIndex = !isEven ? 0 : 1;
            }
        }
        else {
            pageIndex = sectionFormat.differentFirstPage ? 1 : 0;
            if (pageIndex === 1 && this.viewer.pages.length === 1) {
                pageIndex = 0;
            }
        }
        var section = this.viewer.pages[pageIndex].bodyWidgets[0];
        do {
            if (type.indexOf('Header') !== -1) {
                var widget = section.page.headerWidget;
                var isNotEmpty = !widget.isEmpty || widget.isEmpty && this.owner.enableHeaderAndFooter;
                var firstBlock = section.firstChild;
                var top_1 = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                var headerDistance = HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
                if (isNotEmpty) {
                    top_1 = Math.max(headerDistance + section.page.headerWidget.height, top_1);
                }
                if (firstBlock.y !== top_1) {
                    this.viewer.updateClientArea(section.sectionFormat, section.page);
                    firstBlock = firstBlock.combineWidget(this.viewer);
                    var prevWidget = firstBlock.previousRenderedWidget;
                    if (prevWidget) {
                        if (firstBlock.containerWidget.equals(prevWidget.containerWidget)) {
                            this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                            // tslint:disable-next-line:max-line-length
                            this.viewer.layout.updateContainerWidget(firstBlock, prevWidget.containerWidget, prevWidget.indexInOwner + 1, false);
                        }
                    }
                    this.viewer.blockToShift = firstBlock;
                }
            }
            else {
                this.checkAndShiftFromBottom(section.page, section.page.footerWidget);
            }
            if (this.viewer.blockToShift) {
                this.viewer.renderedLists.clear();
                this.viewer.layout.shiftLayoutedItems();
            }
            while (section) {
                var splittedSection = section.getSplitWidgets();
                section = splittedSection[splittedSection.length - 1].nextRenderedWidget;
                if (section) {
                    if (pageIndex === 0) {
                        break;
                    }
                    else {
                        if (section.page.index + 1 % 2 === 0 && pageIndex === 1 ||
                            (section.page.index + 1 % 2 !== 0 && pageIndex === 2)) {
                            break;
                        }
                        var nextPage = section.page.nextPage;
                        if (nextPage.bodyWidgets[0].equals(section)) {
                            section = nextPage.bodyWidgets[0];
                            break;
                        }
                    }
                }
            }
        } while (section);
    };
    /**
     * @private
     */
    Editor.prototype.checkAndShiftFromBottom = function (page, footerWidget) {
        var bodyWidget = page.bodyWidgets[0];
        var blockToShift;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var block = bodyWidget.childWidgets[i];
            if (block.y + block.height > footerWidget.y) {
                blockToShift = block;
                break;
            }
            if (bodyWidget.childWidgets.length - 1 === i && block.y + block.height < footerWidget.y) {
                blockToShift = block;
                break;
            }
        }
        this.viewer.updateClientArea(bodyWidget.sectionFormat, page);
        this.viewer.cutFromTop(blockToShift.y);
        this.viewer.blockToShift = blockToShift;
    };
    //Paste Implementation ends
    //Character Format apply implementation starts
    /**
     * Change HighlightColor
     * @param  {HighlightColor} highlightColor
     * Applies character format for selection.
     * @param {string} property
     * @param {Object} value
     * @param {boolean} update
     * @private
     */
    Editor.prototype.onApplyCharacterFormat = function (property, value, update) {
        if (this.restrictFormatting) {
            return;
        }
        this.viewer.layout.isBidiReLayout = true;
        var selection = this.viewer.selection;
        if (selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded) {
            return;
        }
        update = isNullOrUndefined(update) ? false : update;
        var action = (property[0].toUpperCase() + property.slice(1));
        var paragraph = selection.start.paragraph;
        var lastLine = paragraph.childWidgets[paragraph.childWidgets.length - 1];
        if (selection.isEmpty && selection.contextType !== 'List') {
            selection.skipFormatRetrieval = true;
            if (selection.end.isAtParagraphEnd) {
                this.initHistory(action);
                this.viewer.owner.isShiftingEnabled = true;
                this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
                this.reLayout(this.viewer.selection);
                this.viewer.updateFocus();
            }
            else {
                selection.fireSelectionChanged(true);
            }
            selection.skipFormatRetrieval = false;
            return;
        }
        this.setOffsetValue(selection);
        this.initHistory(action);
        // Todo: Complete Microsoft Word behavior on apply formatting in empty selection
        // if (selection.isEmpty) {
        //     this.viewer.owner.isShiftingEnabled = true;
        //     this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
        //     this.reLayout(this.viewer.selection);
        //     this.viewer.updateFocus();
        //     return;
        // }
        if (selection.contextType === 'List') {
            // this.updateCharacterFormatForListText(selection, action, value, update);
            this.applyCharacterFormatForListText(selection, property, value, update);
        }
        else {
            //Iterate and update format.
            this.updateSelectionCharacterFormatting(property, value, update);
        }
        this.viewer.layout.isBidiReLayout = false;
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharacterFormatForListText = function (selection, property, values, update) {
        var listLevel = this.getListLevel(selection.start.paragraph);
        if (isNullOrUndefined(listLevel)) {
            return;
        }
        var characterFormat = listLevel.characterFormat;
        switch (property) {
            case 'bold':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'bold', !(characterFormat.bold));
                break;
            case 'italic':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'italic', !(characterFormat.italic));
                break;
            case 'fontColor':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontColor', values);
                break;
            case 'fontFamily':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontFamily', values);
                break;
            case 'fontSize':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'fontSize', values);
                break;
            case 'highlightColor':
                this.applyListCharacterFormatByValue(selection, characterFormat, 'highlightColor', values);
                break;
            case 'baselineAlignment':
                if (characterFormat.baselineAlignment === values) {
                    values = 'Normal';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'baselineAlignment', values);
                break;
            case 'strikethrough':
                if (characterFormat.strikethrough === values) {
                    values = 'None';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'strikethrough', values);
                break;
            case 'underline':
                if (characterFormat.underline === values) {
                    values = 'None';
                }
                this.applyListCharacterFormatByValue(selection, characterFormat, 'underline', values);
                break;
            case 'characterFormat':
                this.applyListCharacterFormatByValue(selection, characterFormat, undefined, values);
                break;
        }
    };
    Editor.prototype.applyListCharacterFormatByValue = function (selection, format, property, value) {
        this.initHistory('ListCharacterFormat');
        this.applyCharFormatValue(format, property, value, false);
        this.editorHistory.updateHistory();
        this.reLayout(selection);
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.updateListCharacterFormat = function (selection, property, value) {
        this.updateListTextSelRange(selection, property, value, false);
    };
    Editor.prototype.updateListTextSelRange = function (selection, property, value, update) {
        this.viewer.owner.isShiftingEnabled = true;
        var startPositionInternal = selection.start;
        var endPositionInternal = selection.end;
        if (!selection.isForward) {
            startPositionInternal = selection.end;
            endPositionInternal = selection.start;
        }
        this.initHistoryPosition(selection, startPositionInternal);
        var listLevel = this.getListLevel(selection.start.paragraph);
        this.applyCharFormatValue(listLevel.characterFormat, property, value, update);
        this.startSelectionReLayouting(startPositionInternal.paragraph, selection, startPositionInternal, endPositionInternal);
    };
    /**
     * @private
     */
    Editor.prototype.getListLevel = function (paragraph) {
        var currentList = undefined;
        var listLevelNumber = 0;
        if (!isNullOrUndefined(paragraph.paragraphFormat) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
            currentList = this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId);
            listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
        }
        if (!isNullOrUndefined(currentList) &&
            !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId))
            // && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId).levels.getItem(listLevelNumber))) {
            && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId).levels)) {
            return this.viewer.layout.getListLevel(currentList, listLevelNumber);
        }
        return undefined;
    };
    Editor.prototype.updateInsertPosition = function () {
        var selection = this.viewer.selection;
        var position = selection.start;
        if (!selection.isForward) {
            position = selection.end;
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && !isNullOrUndefined(position)) {
            if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                this.updateHistoryPosition(position, true);
            }
        }
    };
    /**
     * preserve paragraph and offset value for selection
     * @private
     */
    Editor.prototype.setOffsetValue = function (selection) {
        var info = this.selection.getParagraphInfo(selection.start);
        this.startParagraph = info.paragraph;
        this.startOffset = info.offset;
        info = this.selection.getParagraphInfo(selection.end);
        this.endParagraph = info.paragraph;
        this.endOffset = info.offset;
    };
    /**
     * Toggles the highlight color property of selected contents.
     * @param {HighlightColor} highlightColor Default value of ‘underline’ parameter is Yellow.
     */
    Editor.prototype.toggleHighlightColor = function (highlightColor) {
        var selection = this.viewer.selection;
        if (isNullOrUndefined(highlightColor) || highlightColor === 'NoColor') {
            highlightColor = 'Yellow';
        }
        //In Ms Word the highlight color is took from the ribbon. So we Have given yellow as constant.
        if (selection.characterFormat.highlightColor === highlightColor) {
            highlightColor = 'NoColor';
        }
        this.selection.characterFormat.highlightColor = highlightColor;
    };
    /**
     * Toggles the subscript formatting of selected contents.
     */
    Editor.prototype.toggleSubscript = function () {
        if (!this.owner.isReadOnlyMode) {
            var value = this.selection.characterFormat.baselineAlignment === 'Subscript' ? 'Normal' : 'Subscript';
            this.selection.characterFormat.baselineAlignment = value;
        }
    };
    /**
     * Toggles the superscript formatting of selected contents.
     */
    Editor.prototype.toggleSuperscript = function () {
        if (!this.owner.isReadOnlyMode) {
            var value = this.selection.characterFormat.baselineAlignment === 'Superscript' ? 'Normal' : 'Superscript';
            this.selection.characterFormat.baselineAlignment = value;
        }
    };
    /**
     * Toggles the text alignment property of selected contents.
     * @param {TextAlignment} textAlignment Default value of ‘textAlignment parameter is TextAlignment.Left.
     */
    /**
     * Increases the left indent of selected paragraphs to a factor of 36 points.
     */
    Editor.prototype.increaseIndent = function () {
        if (!this.owner.isReadOnlyMode) {
            this.onApplyParagraphFormat('leftIndent', this.viewer.defaultTabWidth, true, false);
        }
    };
    /**
     * Decreases the left indent of selected paragraphs to a factor of 36 points.
     */
    Editor.prototype.decreaseIndent = function () {
        if (!this.owner.isReadOnlyMode) {
            this.onApplyParagraphFormat('leftIndent', -this.viewer.defaultTabWidth, true, false);
        }
    };
    /**
     * Clears the list format for selected paragraphs.
     */
    Editor.prototype.clearList = function () {
        this.selection.owner.editorModule.onApplyList(undefined);
    };
    /**
     * Applies the bullet list to selected paragraphs.
     * @param {string} bullet Bullet character
     * @param {string} fontFamily Bullet font family
     */
    Editor.prototype.applyBullet = function (bullet, fontFamily) {
        if (!this.owner.isReadOnlyMode) {
            this.applyBulletOrNumbering(bullet, 'Bullet', fontFamily);
        }
    };
    /**
     * Applies the numbering list to selected paragraphs.
     * @param numberFormat  “%n” representations in ‘numberFormat’ parameter will be replaced by respective list level’s value.
     * `“%1)” will be displayed as “1)” `
     * @param listLevelPattern  Default value of ‘listLevelPattern’ parameter is ListLevelPattern.Arabic
     */
    Editor.prototype.applyNumbering = function (numberFormat, listLevelPattern) {
        if (!this.owner.isReadOnlyMode) {
            this.applyBulletOrNumbering(numberFormat, listLevelPattern, 'Verdana');
        }
    };
    /**
     * Toggles the baseline alignment property of selected contents.
     * @param  {Selection} selection
     * @param  {BaselineAlignment} baseAlignment
     */
    Editor.prototype.toggleBaselineAlignment = function (baseAlignment) {
        this.updateProperty(2, baseAlignment);
    };
    /**
     * Clears the formatting.
     */
    Editor.prototype.clearFormatting = function () {
        var selection = this.viewer.selection;
        this.initComplexHistory('ClearFormat');
        // let startIndex: string = selection.start.getHierarchicalIndexInternal();
        // let endIndex: string = selection.end.getHierarchicalIndexInternal();
        if (selection.isEmpty) {
            selection.start.moveToParagraphStartInternal(selection, false);
            selection.end.moveToParagraphEndInternal(selection, false);
        }
        this.setOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ClearCharacterFormat');
        }
        this.updateSelectionCharacterFormatting('ClearCharacterFormat', undefined, false);
        this.getOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.setOffsetValue(selection);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ClearParagraphFormat');
        }
        this.updateParagraphFormatInternal('ClearParagraphFormat', undefined, false);
        if (this.editorHistory) {
            this.editorHistory.updateHistory();
        }
        this.getOffsetValue(selection);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
            this.editorHistory.updateComplexHistory();
        }
        this.startParagraph = undefined;
        this.endParagraph = undefined;
        // else {
        //     this.checkAndUpdatedSelection(startIndex, endIndex);
        // }
    };
    /**
     * Toggles the specified property. If property is assigned already. Then property will be changed
     * @param  {Selection} selection
     * @param  {number} type
     * @param  {Object} value
     * @private
     */
    Editor.prototype.updateProperty = function (type, value) {
        var selection = this.selection;
        if (selection.owner.isReadOnlyMode || !selection.owner.isDocumentLoaded) {
            return;
        }
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        var indexInInline = 0;
        var inlineObj = startPosition.currentWidget.getInline(startPosition.offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        var paragraph = startPosition.paragraph;
        if (!isNullOrUndefined(inline) && inline.length === indexInInline && !this.selection.isEmpty) {
            inline = inline.nextNode;
        }
        if (type === 1) {
            var currentUnderline = 'None';
            if (!isNullOrUndefined(inline)) {
                currentUnderline = inline.characterFormat.underline;
            }
            else if (!isNullOrUndefined(paragraph)) {
                currentUnderline = paragraph.characterFormat.underline;
            }
            this.selection.characterFormat.underline = value === currentUnderline ? 'None' : value;
        }
        else {
            var script = 'Normal';
            if (!isNullOrUndefined(inline)) {
                script = inline.characterFormat.baselineAlignment;
            }
            else if (!isNullOrUndefined(paragraph)) {
                script = paragraph.characterFormat.baselineAlignment;
            }
            if (script === value) {
                value = 'Normal';
            }
            this.selection.characterFormat.baselineAlignment = value;
        }
    };
    Editor.prototype.getCompleteStyles = function () {
        var completeStylesString = '{"styles":[';
        for (var _i = 0, _a = this.viewer.preDefinedStyles.keys; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            completeStylesString += (this.viewer.preDefinedStyles.get(name_1) + ',');
        }
        return completeStylesString.slice(0, -1) + ']}';
    };
    /**
     * Initialize default styles
     * @private
     */
    Editor.prototype.intializeDefaultStyles = function () {
        var existingStyles = this.owner.getStyleNames('Paragraph');
        var defaultStyleNames = ['Normal', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'];
        var styleNames = defaultStyleNames.filter(function (val) {
            return existingStyles.indexOf(val) === -1;
        });
        for (var _i = 0, styleNames_1 = styleNames; _i < styleNames_1.length; _i++) {
            var name_2 = styleNames_1[_i];
            this.createStyle(this.viewer.preDefinedStyles.get(name_2));
        }
    };
    /**
     * Creates a new instance of Style.
     */
    Editor.prototype.createStyle = function (styleString) {
        this.createStyleIn(styleString);
    };
    /**
     * Create a Style.
     * @private
     */
    Editor.prototype.createStyleIn = function (styleString) {
        /* tslint:disable:no-any */
        var style = JSON.parse(styleString);
        var styleObj = this.viewer.styles.findByName(style.name);
        if (styleObj !== undefined) {
            //Create a new style with new name and add it to collection.
            style.name = this.getUniqueStyleName(style.name);
        }
        this.viewer.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), style, this.viewer.styles);
        return this.viewer.styles.findByName(style.name);
    };
    /**
     * @private
     */
    Editor.prototype.getUniqueStyleName = function (name) {
        var uniqueName = this.getUniqueName(name);
        var style = this.viewer.styles.findByName(uniqueName);
        while (!isNullOrUndefined(style)) {
            uniqueName = this.getUniqueStyleName(style.name);
            style = this.viewer.styles.findByName(uniqueName);
        }
        return uniqueName;
    };
    Editor.prototype.getUniqueName = function (name) {
        var matchArray = name.match(/\d+$/);
        var returnName;
        if (!isNullOrUndefined(matchArray) && matchArray.length > 0) {
            return name.replace(matchArray[0], (parseInt(matchArray[0], 10) + 1).toString());
        }
        else {
            return name + '_1';
        }
    };
    /**
     * Update Character format for selection
     * @private
     */
    Editor.prototype.updateSelectionCharacterFormatting = function (property, values, update) {
        if (isNullOrUndefined(property)) {
            property = 'CharacterFormat';
        }
        switch (property) {
            case 'bold':
                this.updateCharacterFormat('bold', values);
                break;
            case 'italic':
                this.updateCharacterFormat('italic', values);
                break;
            case 'fontColor':
                this.updateCharacterFormat('fontColor', values);
                break;
            case 'fontFamily':
                this.updateCharacterFormat('fontFamily', values);
                break;
            case 'fontSize':
                this.viewer.layout.isBidiReLayout = false;
                this.updateCharacterFormatWithUpdate(this.viewer.selection, 'fontSize', values, update);
                break;
            case 'highlightColor':
                this.updateCharacterFormat('highlightColor', values);
                break;
            case 'baselineAlignment':
                this.updateCharacterFormat('baselineAlignment', values);
                break;
            case 'strikethrough':
                this.updateCharacterFormat('strikethrough', values);
                break;
            case 'underline':
                this.updateCharacterFormat('underline', values);
                break;
            case 'styleName':
                this.updateCharacterFormatWithUpdate(this.viewer.selection, 'styleName', values, true);
                break;
            case 'CharacterFormat':
                this.updateCharacterFormat(undefined, values);
                break;
            case 'ClearCharacterFormat':
                this.updateCharacterFormat(undefined, values);
                break;
        }
        this.reLayout(this.viewer.selection);
    };
    /**
     * Update character format for selection range
     * @param  {SelectionRange} selectionRange
     * @param  {string} property
     * @param  {Object} value
     * @returns void
     * @private
     */
    Editor.prototype.updateCharacterFormat = function (property, value) {
        this.updateCharacterFormatWithUpdate(this.viewer.selection, property, value, false);
    };
    Editor.prototype.updateCharacterFormatWithUpdate = function (selection, property, value, update) {
        this.viewer.owner.isShiftingEnabled = true;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        this.applyCharFormatSelectedContent(startPosition.paragraph, selection, startPosition, endPosition, property, value, update);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatSelectedContent = function (paragraph, selection, start, end, property, value, update) {
        //Selection start in cell.
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || selection.isCellSelected(start.paragraph.associatedCell, start, end))) {
            var cell = void 0;
            start.paragraph.associatedCell.ownerTable.combineWidget(this.viewer);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(start, true);
            }
            cell = start.paragraph.associatedCell;
            this.applyCharFormatCell(cell, selection, start, end, property, value, update);
            var table = cell.ownerTable;
            // tslint:disable-next-line:max-line-length
            this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        }
        else {
            this.applyCharFormat(paragraph, selection, start, end, property, value, update);
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatForSelectedPara = function (paragraph, selection, property, value, update) {
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var j = 0; j < line.children.length; j++) {
                var element = line.children[j];
                this.applyCharFormatValue(element.characterFormat, property, value, update);
            }
        }
        this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
    };
    Editor.prototype.splittedLastParagraph = function (paragraph) {
        var splittedWidets = paragraph.getSplitWidgets();
        return splittedWidets[splittedWidets.length - 1];
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.getNextParagraphForCharacterFormatting = function (block, start, end, property, value, update) {
        var widgetCollection = block.getSplitWidgets();
        block = widgetCollection[widgetCollection.length - 1];
        block = this.viewer.selection.getNextRenderedBlock(block);
        if (!isNullOrUndefined(block)) { //Goto the next block.
            if (block instanceof ParagraphWidget) {
                this.applyCharFormat(block, this.viewer.selection, start, end, property, value, update);
            }
            else {
                this.applyCharFormatForTable(0, block, this.viewer.selection, start, end, property, value, update);
            }
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormat = function (paragraph, selection, start, end, property, value, update) {
        paragraph = paragraph.combineWidget(this.viewer);
        var startOffset = 0;
        var length = selection.getParagraphLength(paragraph);
        var startLineWidget = paragraph.childWidgets.indexOf(start.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(start.currentWidget) : 0;
        var endOffset = end.offset;
        var endLineWidget = paragraph.childWidgets.indexOf(end.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(end.currentWidget) : paragraph.childWidgets.length - 1;
        if (!isNullOrUndefined(selection)) {
            if (paragraph === start.paragraph) {
                startOffset = start.offset;
            }
        }
        if (!paragraph.equals(end.paragraph)) {
            this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
            endOffset = length;
        }
        else {
            var lastLine = paragraph.childWidgets[paragraph.childWidgets.length - 1];
            if (selection.isParagraphLastLine(lastLine) && end.currentWidget === lastLine
                && ((endOffset === selection.getLineLength(lastLine) + 1) || (selection.isEmpty && selection.end.isAtParagraphEnd))) {
                this.applyCharFormatValue(paragraph.characterFormat, property, value, update);
            }
        }
        // let count: number = 0;
        for (var i = startLineWidget; i <= endLineWidget; i++) {
            var line = paragraph.childWidgets[i];
            if (i !== startLineWidget) {
                startOffset = selection.getStartLineOffset(line);
            }
            if (line === end.currentWidget) {
                endOffset = end.offset;
            }
            else {
                endOffset = selection.getLineLength(line);
            }
            var count = 0;
            for (var j = 0; j < line.children.length; j++) {
                var inlineObj = line.children[j];
                if (inlineObj instanceof ListTextElementBox) {
                    continue;
                }
                if (startOffset >= count + inlineObj.length) {
                    count += inlineObj.length;
                    continue;
                }
                var startIndex = 0;
                if (startOffset > count) {
                    startIndex = startOffset - count;
                }
                var endIndex = endOffset - count;
                var inlineLength = inlineObj.length;
                if (endIndex > inlineLength) {
                    endIndex = inlineLength;
                }
                j += this.applyCharFormatInline(inlineObj, selection, startIndex, endIndex, property, value, update);
                if (endOffset <= count + inlineLength) {
                    break;
                }
                count += inlineLength;
            }
        }
        var endParagraph = end.paragraph;
        this.viewer.layout.reLayoutParagraph(paragraph, startLineWidget, 0);
        if (paragraph.equals(endParagraph)) {
            return;
        }
        this.getNextParagraphForCharacterFormatting(paragraph, start, end, property, value, update);
    };
    /**
     * Toggles the bold property of selected contents.
     */
    Editor.prototype.toggleBold = function () {
        if (this.viewer.owner.isReadOnlyMode) {
            return;
        }
        var value = this.getCurrentSelectionValue('bold');
        this.selection.characterFormat.bold = value;
    };
    /**
     * Toggles the bold property of selected contents.
     */
    Editor.prototype.toggleItalic = function () {
        if (this.viewer.owner.isReadOnlyMode) {
            return;
        }
        var value = this.getCurrentSelectionValue('italic');
        this.selection.characterFormat.italic = value;
    };
    Editor.prototype.getCurrentSelectionValue = function (property) {
        var value = false;
        if ((property === 'bold' || property === 'italic')) {
            var index = 0;
            var start = this.selection.start;
            if (!this.selection.isForward) {
                start = this.selection.end;
            }
            var lineWidget = start.currentWidget;
            var inlineObj = lineWidget.getInline(start.offset, index);
            var inline = inlineObj.element;
            // inline.ownerBase
            index = inlineObj.index;
            var characterFormat = lineWidget.paragraph.characterFormat;
            if (!isNullOrUndefined(inline)) {
                if (!this.selection.isEmpty && index === inline.length) {
                    characterFormat = isNullOrUndefined(inline.nextNode) ? lineWidget.paragraph.characterFormat
                        : inline.nextNode.characterFormat;
                }
                else {
                    characterFormat = inline.characterFormat;
                }
            }
            if (property === 'bold') {
                value = !(characterFormat.bold);
            }
            if (property === 'italic') {
                value = !(characterFormat.italic);
            }
        }
        return value;
    };
    /**
     * Toggles the underline property of selected contents.
     * @param underline Default value of ‘underline’ parameter is Single.
     */
    Editor.prototype.toggleUnderline = function (underline) {
        if (!this.owner.isReadOnlyMode) {
            this.updateProperty(1, underline);
        }
    };
    /**
     * Toggles the strike through property of selected contents.
     * @param {Strikethrough} strikethrough Default value of strikethrough parameter is SingleStrike.
     */
    Editor.prototype.toggleStrikethrough = function (strikethrough) {
        if (!this.owner.isReadOnlyMode) {
            var value = void 0;
            if (isNullOrUndefined(strikethrough)) {
                value = this.selection.characterFormat.strikethrough === 'SingleStrike' ? 'None' : 'SingleStrike';
            }
            else {
                value = strikethrough;
            }
            this.selection.characterFormat.strikethrough = value;
        }
    };
    Editor.prototype.updateFontSize = function (format, value) {
        if (typeof (value) === 'number' && !(value < 0 && format.fontSize === 1)) {
            return format.fontSize + value;
        }
        var fontsizeCollection = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72];
        if (typeof (value) === 'string' && value === 'increment') {
            if (format.fontSize < 8) {
                return format.fontSize + 1;
            }
            else if (format.fontSize >= 72 && format.fontSize < 80) {
                return 80;
            }
            else if (format.fontSize >= 80) {
                return format.fontSize + 10;
            }
            else {
                for (var i = 0; i < fontsizeCollection.length; i++) {
                    if (format.fontSize < fontsizeCollection[i]) {
                        return fontsizeCollection[i];
                    }
                }
            }
        }
        else if (typeof (value) === 'string' && value === 'decrement' && format.fontSize > 1) {
            if (format.fontSize <= 8) {
                return format.fontSize - 1;
            }
            else if (format.fontSize > 72 && format.fontSize <= 80) {
                return 72;
            }
            else if (format.fontSize > 80) {
                return format.fontSize - 10;
            }
            else {
                for (var i = 0; i < fontsizeCollection.length; i++) {
                    if (format.fontSize <= fontsizeCollection[i]) {
                        return fontsizeCollection[i - 1];
                    }
                }
            }
        }
        return format.fontSize;
    };
    // Inline
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatInline = function (inline, selection, startIndex, endIndex, property, value, update) {
        if (startIndex === 0 && endIndex === inline.length) {
            this.applyCharFormatValue(inline.characterFormat, property, value, update);
            return 0;
        }
        else if (inline instanceof TextElementBox) {
            return this.formatInline(inline, selection, startIndex, endIndex, property, value, update);
        }
        return 0;
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.formatInline = function (inline, selection, startIndex, endIndex, property, value, update) {
        var x = 0;
        var node = inline;
        var index = inline.line.children.indexOf(node);
        var paragraph = inline.paragraph;
        var lineIndex = paragraph.childWidgets.indexOf(inline.line);
        var textElement;
        if (startIndex > 0) {
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inline.characterFormat);
            textElement.line = inline.line;
            textElement.text = inline.text.substr(startIndex, endIndex - startIndex);
            this.applyCharFormatValue(textElement.characterFormat, property, value, update);
            index++;
            node.line.children.splice(index, 0, textElement);
            x++;
            // this.addToLinkedFields(span);                      
        }
        if (endIndex < node.length) {
            textElement = new TextElementBox();
            textElement.characterFormat.copyFormat(inline.characterFormat);
            textElement.text = node.text.substring(endIndex);
            textElement.line = inline.line;
            index++;
            node.line.children.splice(index, 0, textElement);
            x++;
            // this.addToLinkedFields(span);                       
        }
        if (startIndex === 0) {
            inline.text = inline.text.substr(0, endIndex);
            this.applyCharFormatValue(inline.characterFormat, property, value, update);
        }
        else {
            inline.text = inline.text.substr(0, startIndex);
        }
        return x;
    };
    // Cell
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatCell = function (cell, selection, start, end, property, value, update) {
        if (end.paragraph.isInsideTable) {
            var containerCell = selection.getContainerCellOf(cell, end.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cell, containerCell);
                var endCell = selection.getSelectedCell(end.paragraph.associatedCell, containerCell);
                if (selection.containsCell(containerCell, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(containerCell, start, end)) {
                        value = this.getCharacterFormatValueOfCell(cell, selection, value, property);
                        this.applyCharFormatForSelectedCell(containerCell, selection, property, value, update);
                    }
                    else {
                        if (startCell === containerCell) {
                            this.applyCharFormat(start.paragraph, selection, start, end, property, value, update);
                        }
                        else {
                            this.applyCharFormatRow(startCell.ownerRow, selection, start, end, property, value, update);
                        }
                    }
                }
                else { //Format other selected cells in current table.
                    this.applyCharFormatForTableCell(containerCell.ownerTable, selection, containerCell, endCell, property, value, update);
                }
            }
            else {
                this.applyCharFormatRow(containerCell.ownerRow, selection, start, end, property, value, update);
            }
        }
        else {
            var tableCell = selection.getContainerCell(cell);
            this.applyCharFormatRow(tableCell.ownerRow, selection, start, end, property, value, update);
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatForSelectedCell = function (cell, selection, property, value, update) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            if (block instanceof ParagraphWidget) {
                this.applyCharFormatForSelectedPara(block, selection, property, value, update);
            }
            else {
                this.applyCharFormatForSelTable(block, selection, property, value, update);
            }
        }
    };
    // Row
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatRow = function (row, selection, start, end, property, value, update) {
        value = this.getCharacterFormatValueOfCell(row.childWidgets[0], selection, value, property);
        this.applyCharFormatForTable(row.rowIndex, row.ownerTable, selection, start, end, property, value, update);
    };
    // Table
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatForTable = function (index, table, selection, start, end, property, value, update) {
        table = table.combineWidget(this.viewer);
        for (var i = index; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
            }
            if (end.paragraph.isInsideTable && selection.containsRow(row, end.paragraph.associatedCell)) {
                this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
                return;
            }
        }
        this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        this.getNextParagraphForCharacterFormatting(table, start, end, property, value, update);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatForSelTable = function (tableWidget, selection, property, value, update) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var row = tableWidget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
            }
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyCharFormatForTableCell = function (table, selection, startCell, endCell, property, value, update) {
        var startCellLeft = selection.getCellLeft(startCell.ownerRow, startCell);
        var startCellRight = startCellLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startCellLeft, startCellRight, endCellLeft, endCellRight);
        startCellLeft = cellInfo.start;
        startCellRight = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var isStarted = false;
        for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var left = selection.getCellLeft(row, row.childWidgets[j]);
                if (HelperMethods.round(startCellLeft, 2) <= HelperMethods.round(left, 2) &&
                    HelperMethods.round(left, 2) < HelperMethods.round(startCellRight, 2)) {
                    if (!isStarted) {
                        value = this.getCharacterFormatValueOfCell(row.childWidgets[j], selection, value, property);
                        isStarted = true;
                    }
                    this.applyCharFormatForSelectedCell(row.childWidgets[j], selection, property, value, update);
                }
            }
        }
    };
    Editor.prototype.updateSelectedCellsInTable = function (start, end, endCellLeft, endCellRight) {
        var selection = this.viewer.selection;
        if (start > endCellLeft) {
            start = endCellLeft;
        }
        if (end < endCellRight) {
            end = endCellRight;
        }
        if (start > selection.upDownSelectionLength) {
            start = selection.upDownSelectionLength;
        }
        if (end < selection.upDownSelectionLength) {
            end = selection.upDownSelectionLength;
        }
        return { start: start, end: end };
    };
    Editor.prototype.getCharacterFormatValueOfCell = function (cell, selection, value, property) {
        if (typeof (value) === 'boolean' || (value === undefined && (property === 'bold' || property === 'italic'))) {
            var firstParagraph = selection.getFirstParagraph(cell);
            var format = firstParagraph.characterFormat;
            if (firstParagraph.childWidgets.length > 0 && firstParagraph.childWidgets[0].children.length > 0) {
                format = firstParagraph.childWidgets[0].children[0].characterFormat;
            }
            value = !format.getPropertyValue(property);
        }
        return value;
    };
    /**
     * Apply Character format for selection
     * @private
     */
    Editor.prototype.applyCharFormatValueInternal = function (selection, format, property, value) {
        this.applyCharFormatValue(format, property, value, false);
    };
    Editor.prototype.copyInlineCharacterFormat = function (sourceFormat, destFormat) {
        destFormat.uniqueCharacterFormat = sourceFormat.uniqueCharacterFormat;
        destFormat.baseCharStyle = sourceFormat.baseCharStyle;
    };
    Editor.prototype.applyCharFormatValue = function (format, property, value, update) {
        if (update && property === 'fontSize') {
            value = this.updateFontSize(format, value);
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedProperties(format, property, value);
        }
        if (value instanceof WCharacterFormat) {
            if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                this.copyInlineCharacterFormat(value, format);
            }
            else {
                format.copyFormat(value);
            }
            return;
        }
        if (isNullOrUndefined(value)) {
            format.clearFormat();
            return;
        }
        if (property === 'bold') {
            format.bold = value;
        }
        else if (property === 'italic') {
            format.italic = value;
        }
        else if (property === 'fontColor') {
            format.fontColor = value;
        }
        else if (property === 'fontFamily') {
            format.fontFamily = value;
        }
        else if (property === 'fontSize') {
            format.fontSize = value;
        }
        else if (property === 'highlightColor') {
            format.highlightColor = value;
        }
        else if (property === 'baselineAlignment') {
            format.baselineAlignment = value;
        }
        else if (property === 'strikethrough') {
            format.strikethrough = value;
        }
        else if (property === 'underline') {
            format.underline = value;
        }
        else if (property === 'styleName') {
            format.baseCharStyle = value;
        }
    };
    /**
     * @private
     */
    Editor.prototype.onImageFormat = function (elementBox, width, height) {
        var modifiedFormat = new ImageFormat(elementBox);
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ImageResizing');
            this.editorHistory.currentBaseHistoryInfo.modifiedProperties.push(modifiedFormat);
        }
        this.setOffsetValue(this.selection);
        elementBox.width = width;
        elementBox.height = height;
        // tslint:disable-next-line:max-line-length
        this.viewer.layout.reLayoutParagraph(elementBox.line.paragraph, elementBox.line.indexInOwner, 0);
        this.reLayout(this.selection, false);
        if (this.viewer.owner.imageResizerModule) {
            this.viewer.owner.imageResizerModule.positionImageResizer(elementBox);
        }
    };
    /**
     * Toggles the text alignment of selected paragraphs.
     * @param  {TextAlignment} textAlignment
     */
    Editor.prototype.toggleTextAlignment = function (textAlignment) {
        if (this.viewer.owner.isReadOnlyMode || !this.viewer.owner.isDocumentLoaded) {
            return;
        }
        // Toggle performed based on current selection format similar to MS word behavior.
        // tslint:disable-next-line:max-line-length
        if (!isNullOrUndefined(this.viewer.selection.paragraphFormat.textAlignment) && this.viewer.selection.paragraphFormat.textAlignment === textAlignment) {
            if (textAlignment === 'Left') {
                this.onApplyParagraphFormat('textAlignment', 'Justify', false, true);
            }
            else {
                this.onApplyParagraphFormat('textAlignment', 'Left', false, true);
            }
        }
        else {
            this.onApplyParagraphFormat('textAlignment', textAlignment, false, true);
        }
    };
    /**
     * Applies paragraph format for the selection ranges.
     * @param {string} property
     * @param {Object} value
     * @param {boolean} update
     * @param {boolean} isSelectionChanged
     * @private
     */
    Editor.prototype.onApplyParagraphFormat = function (property, value, update, isSelectionChanged) {
        if (this.restrictFormatting) {
            return;
        }
        var action = property === 'bidi' ? 'ParagraphBidi' : (property[0].toUpperCase() + property.slice(1));
        this.viewer.owner.isShiftingEnabled = true;
        var selection = this.viewer.selection;
        this.initHistory(action);
        if (this.viewer.owner.isReadOnlyMode || !this.viewer.owner.isDocumentLoaded) {
            return;
        }
        if (property === 'leftIndent') {
            if (selection.paragraphFormat.listId !== -1 && update) {
                this.updateListLevel(value > 0);
                return;
            }
        }
        if (selection.isEmpty) {
            this.setOffsetValue(selection);
            var isBidiList = selection.paragraphFormat.bidi &&
                (property === 'listFormat' || selection.paragraphFormat.listId !== -1);
            if (!isBidiList) {
                this.viewer.layout.isBidiReLayout = true;
            }
            if (update && property === 'leftIndent') {
                value = this.getIndentIncrementValue(selection.start.paragraph, value);
            }
            var para = selection.start.paragraph.combineWidget(this.viewer);
            this.applyParaFormatProperty(para, property, value, update);
            this.layoutItemBlock(para, false);
            if (!isBidiList) {
                this.viewer.layout.isBidiReLayout = false;
            }
        }
        else {
            //Iterate and update formatting's.      
            if (action !== 'ParagraphBidi') {
                this.setOffsetValue(selection);
            }
            this.updateSelectionParagraphFormatting(property, value, update);
        }
        this.reLayout(selection);
    };
    /**
     * Update the list level
     * @param  {boolean} increaseLevel
     * @private
     */
    Editor.prototype.updateListLevel = function (increaseLevel) {
        // Increment or Decrement list level for Multilevel lists.
        var viewer = this.viewer;
        var listFormat = this.viewer.selection.start.paragraph.paragraphFormat.listFormat;
        var paragraphFormat = this.viewer.selection.start.paragraph.paragraphFormat;
        var list = viewer.getListById(paragraphFormat.listFormat.listId);
        var listLevel = viewer.layout.getListLevel(list, paragraphFormat.listFormat.listLevelNumber);
        var levelNumber;
        if (increaseLevel) {
            levelNumber = paragraphFormat.listFormat.listLevelNumber + 1;
        }
        else {
            levelNumber = paragraphFormat.listFormat.listLevelNumber - 1;
        }
        var nextListLevel = viewer.layout.getListLevel(list, levelNumber);
        if (!isNullOrUndefined(nextListLevel)) {
            this.onApplyListInternal(list, levelNumber);
            viewer.selection.start.updatePhysicalPosition(true);
            viewer.selection.end.updatePhysicalPosition(true);
            viewer.selection.updateCaretPosition();
        }
    };
    /**
     * Applies list
     * @param  {WList} list
     * @param  {number} listLevelNumber
     * @private
     */
    Editor.prototype.onApplyListInternal = function (list, listLevelNumber) {
        var selection = this.viewer.selection;
        var listFormat = new WListFormat();
        if (!isNullOrUndefined(list) && listLevelNumber >= 0 && listLevelNumber < 9) {
            listFormat.listId = list.listId;
            listFormat.listLevelNumber = listLevelNumber;
        }
        this.onApplyParagraphFormat('listFormat', listFormat, false, false);
    };
    /**
     * Apply paragraph format to selection range
     * @private
     */
    Editor.prototype.updateSelectionParagraphFormatting = function (property, value, update) {
        var selection = this.viewer.selection;
        if (property === 'leftIndent' && update) {
            if (!isNullOrUndefined(selection.start) && selection.start.isExistBefore(selection.end)) {
                value = this.getIndentIncrementValue(selection.start.paragraph, value);
            }
            else {
                value = this.getIndentIncrementValue(selection.end.paragraph, value);
            }
        }
        this.updateParagraphFormatInternal(property, value, update);
    };
    Editor.prototype.getIndentIncrementValue = function (currentParagraph, incrementFactor) {
        var currentParagraphIndent = currentParagraph.paragraphFormat.leftIndent;
        if (currentParagraphIndent < 0) {
            // In MS Word, if the current paragraph left indent is lesser that or equal to 0
            // then performing decrement indent will set left indent to 0. 
            if (incrementFactor < 0 || currentParagraphIndent + incrementFactor >= 0) {
                return -currentParagraphIndent;
            }
            else {
                var incrementValue = -this.getIndentIncrementValueInternal(-currentParagraphIndent, -incrementFactor);
                return incrementValue % incrementFactor === 0 ? incrementValue : incrementValue + incrementFactor;
            }
        }
        else {
            return this.getIndentIncrementValueInternal(currentParagraphIndent, incrementFactor);
        }
    };
    Editor.prototype.getIndentIncrementValueInternal = function (position, incrementFactor) {
        var tabValue = Math.abs(incrementFactor);
        if (position === 0 || tabValue === 0) {
            return incrementFactor > 0 ? tabValue : 0;
        }
        else {
            var diff = ((Math.round(position) * 100) % (Math.round(tabValue) * 100)) / 100;
            var cnt = (Math.round(position) - diff) / Math.round(tabValue);
            var fPosition = cnt * tabValue;
            if (incrementFactor > 0) {
                fPosition += tabValue;
            }
            return (fPosition - position) === 0 ? incrementFactor : fPosition - position;
        }
    };
    Editor.prototype.updateParagraphFormatInternal = function (property, value, update) {
        if (isNullOrUndefined(property)) {
            property = 'ParagraphFormat';
        }
        switch (property) {
            case 'afterSpacing':
                this.updateParagraphFormat('afterSpacing', value, false);
                break;
            case 'beforeSpacing':
                this.updateParagraphFormat('beforeSpacing', value, false);
                break;
            case 'rightIndent':
                this.updateParagraphFormat('rightIndent', value, false);
                break;
            case 'leftIndent':
                this.updateParagraphFormat('leftIndent', value, update);
                break;
            case 'firstLineIndent':
                this.updateParagraphFormat('firstLineIndent', value, false);
                break;
            case 'lineSpacing':
                this.updateParagraphFormat('lineSpacing', value, false);
                break;
            case 'lineSpacingType':
                this.updateParagraphFormat('lineSpacingType', value, false);
                break;
            case 'textAlignment':
                this.updateParagraphFormat('textAlignment', value, false);
                break;
            case 'listFormat':
                this.updateParagraphFormat('listFormat', value, false);
                break;
            case 'ParagraphFormat':
                this.updateParagraphFormat(undefined, value, false);
                break;
            case 'styleName':
                this.updateParagraphFormat('styleName', value, false);
                break;
            case 'ClearParagraphFormat':
                // this.initializeHistory('ClearParagraphFormat', selectionRange);
                this.updateParagraphFormat(undefined, value, false);
                break;
            case 'bidi':
                var isBidiList = this.selection.paragraphFormat.listId !== -1;
                if (!isBidiList) {
                    this.viewer.layout.isBidiReLayout = true;
                }
                this.updateParagraphFormat('bidi', value, false);
                if (!isBidiList) {
                    this.viewer.layout.isBidiReLayout = false;
                }
                break;
            case 'contextualSpacing':
                this.updateParagraphFormat('contextualSpacing', value, false);
                break;
        }
    };
    /**
     * Update paragraph format on undo
     * @param  {SelectionRange} selectionRange
     * @param  {string} property
     * @param  {Object} value
     * @param  {boolean} update
     * @private
     */
    Editor.prototype.updateParagraphFormat = function (property, value, update) {
        var selection = this.viewer.selection;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        // this.updateInsertPosition(selection, startPosition);
        this.applyParaFormatSelectedContent(startPosition, endPosition, property, value, update);
        // this.startSelectionReLayouting(startPosition.paragraph, selection, startPosition, endPosition);
    };
    Editor.prototype.applyParaFormatSelectedContent = function (start, end, property, value, update) {
        var selection = this.viewer.selection;
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || selection.isCellSelected(start.paragraph.associatedCell, start, end))) {
            var cell = void 0;
            start.paragraph.associatedCell.ownerTable.combineWidget(this.viewer);
            if (this.checkInsertPosition(selection)) {
                this.updateHistoryPosition(start, true);
            }
            cell = start.paragraph.associatedCell;
            this.applyParaFormatInCell(cell, start, end, property, value, update);
            var table = cell.ownerTable;
            this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        }
        else {
            // tslint:disable-next-line:max-line-length
            if (!isNullOrUndefined(value) && !this.selection.isEmpty && property === 'styleName' && this.applyCharacterStyle(start.paragraph, start, end, property, value, update)) {
                return;
            }
            else {
                this.applyParaFormat(start.paragraph, start, end, property, value, update);
            }
        }
    };
    /**
     * Apply Paragraph format
     * @private
     */
    Editor.prototype.applyParaFormatProperty = function (paragraph, property, value, update) {
        var format = paragraph.paragraphFormat;
        if (update && property === 'leftIndent') {
            value = format.leftIndent + value;
        }
        if (property === 'listFormat' && value instanceof WListFormat) {
            var listFormat = value;
            if (!listFormat.hasValue('listLevelNumber')) {
                listFormat.listLevelNumber = format.listFormat.listLevelNumber;
            }
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForParagraphFormat(format, property, value);
        }
        if (value instanceof WParagraphFormat) {
            if (isNullOrUndefined(property)) {
                if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                    this.copyParagraphFormat(value, format);
                }
                else {
                    format.copyFormat(value);
                }
            }
            else if (property === 'listFormat') {
                format.listFormat = value.listFormat;
                // this.handleListFormat(format, value as WParagraphFormat);
            }
        }
        if (isNullOrUndefined(value)) {
            format.clearFormat();
            this.viewer.layout.reLayoutParagraph(format.ownerBase, 0, 0);
            return;
        }
        if (property === 'afterSpacing') {
            format.afterSpacing = value;
        }
        else if (property === 'beforeSpacing') {
            format.beforeSpacing = value;
        }
        else if (property === 'leftIndent') {
            format.leftIndent = value;
        }
        else if (property === 'lineSpacingType') {
            format.lineSpacingType = value;
        }
        else if (property === 'lineSpacing') {
            format.lineSpacing = value;
        }
        else if (property === 'rightIndent') {
            format.rightIndent = value;
        }
        else if (property === 'firstLineIndent') {
            format.firstLineIndent = value;
        }
        else if (property === 'textAlignment') {
            format.textAlignment = value;
            this.viewer.layout.allowLayout = false;
        }
        else if (property === 'styleName') {
            if (typeof (value) === 'string') {
                value = this.viewer.styles.findByName(value);
            }
            format.ApplyStyle(value);
        }
        else if (property === 'listFormat') {
            if (value instanceof WParagraphFormat) {
                this.copyFromListLevelParagraphFormat(format, value);
                value = value.listFormat;
            }
            format.listFormat.copyFormat(value);
            this.viewer.layout.clearListElementBox(format.ownerBase);
            this.onListFormatChange(format.ownerBase, value, format);
            this.layoutItemBlock(format.ownerBase, false);
            return;
        }
        else if (property === 'bidi') {
            format.bidi = value;
        }
        else if (property === 'contextualSpacing') {
            format.contextualSpacing = value;
        }
    };
    Editor.prototype.copyParagraphFormat = function (sourceFormat, destFormat) {
        destFormat.uniqueParagraphFormat = sourceFormat.uniqueParagraphFormat;
        destFormat.listFormat = sourceFormat.listFormat;
        destFormat.baseStyle = sourceFormat.baseStyle;
    };
    Editor.prototype.onListFormatChange = function (paragraph, listFormat, paraFormat) {
        if (listFormat instanceof WListFormat) {
            var currentFormat = listFormat;
            // currentFormat.setOwnerBase(paraFormat);
            this.updateListParagraphFormat(paragraph, listFormat);
        }
    };
    Editor.prototype.updateListParagraphFormat = function (paragraph, listFormat) {
        var list = this.viewer.getListById(listFormat.listId);
        var listlevel = undefined;
        if (!isNullOrUndefined(list)) {
            listlevel = this.viewer.layout.getListLevel(list, listFormat.listLevelNumber);
        }
        var isUpdateIndent = !this.editorHistory || (this.editorHistory && !this.editorHistory.isUndoing);
        if (isUpdateIndent) {
            if (paragraph instanceof ParagraphWidget && !isNullOrUndefined(listlevel)
                && !isNullOrUndefined(listlevel.paragraphFormat) && !isNullOrUndefined(paragraph.containerWidget)) {
                this.copyFromListLevelParagraphFormat(paragraph.paragraphFormat, listlevel.paragraphFormat);
            }
            else if (isNullOrUndefined(list)) {
                paragraph.paragraphFormat.leftIndent = undefined;
                paragraph.paragraphFormat.firstLineIndent = undefined;
            }
        }
    };
    /**
     * Copies list level paragraph format
     * @param  {WParagraphFormat} oldFormat
     * @param  {WParagraphFormat} newFormat
     * @private
     */
    Editor.prototype.copyFromListLevelParagraphFormat = function (oldFormat, newFormat) {
        if (!isNullOrUndefined(newFormat.leftIndent)) {
            oldFormat.leftIndent = newFormat.leftIndent;
        }
        if (!isNullOrUndefined(newFormat.firstLineIndent)) {
            oldFormat.firstLineIndent = newFormat.firstLineIndent;
        }
    };
    /**
     * @private
     */
    Editor.prototype.applyContinueNumbering = function (selection) {
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('ContinueNumbering');
        }
        this.applyContinueNumberingInternal(selection);
    };
    /**
     * @private
     */
    Editor.prototype.applyContinueNumberingInternal = function (selection) {
        var paragraph = selection.start.paragraph;
        var numberingInfo = this.getContinueNumberingInfo(paragraph);
        var paraFormat = this.getParagraphFormat(paragraph, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.changeListId(numberingInfo.currentList, paragraph, paraFormat, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.reLayout(selection, false);
        this.viewer.updateFocus();
    };
    /**
     * @private
     */
    Editor.prototype.getContinueNumberingInfo = function (paragraph) {
        var currentList = undefined;
        var listLevelNumber = 0;
        var listPattern = 'None';
        if (!isNullOrUndefined(paragraph.paragraphFormat)
            && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
            currentList = this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId);
            listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
        }
        var viewer = this.viewer;
        if (listLevelNumber !== 0 && !isNullOrUndefined(currentList) &&
            !isNullOrUndefined(viewer.getAbstractListById(currentList.abstractListId))
            && !isNullOrUndefined(viewer.getAbstractListById(currentList.abstractListId).levels[listLevelNumber])) {
            var listLevel = this.viewer.layout.getListLevel(currentList, listLevelNumber);
            if (!isNullOrUndefined(listLevel)) {
                listPattern = listLevel.listLevelPattern;
            }
        }
        return {
            currentList: currentList,
            listLevelNumber: listLevelNumber,
            listPattern: listPattern
        };
    };
    /**
     * @private
     */
    Editor.prototype.revertContinueNumbering = function (selection, format) {
        var paragraph = selection.start.paragraph;
        var numberingInfo = this.getContinueNumberingInfo(paragraph);
        this.changeListId(numberingInfo.currentList, paragraph, format, numberingInfo.listLevelNumber, numberingInfo.listPattern);
        this.reLayout(selection, false);
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.editorHistory.updateHistory();
        }
    };
    Editor.prototype.changeListId = function (list, block, format, levelNum, listType) {
        if (isNullOrUndefined(block)) {
            return;
        }
        if (block instanceof ParagraphWidget) {
            if (list.listId === block.paragraphFormat.listFormat.listId
                && levelNum === block.paragraphFormat.listFormat.listLevelNumber) {
                if (this.editorHistory) {
                    var baseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
                    if (!isNullOrUndefined(baseHistoryInfo)) {
                        format = baseHistoryInfo.addModifiedPropertiesForContinueNumbering(block.paragraphFormat, format);
                    }
                }
                block.paragraphFormat.copyFormat(format);
                this.viewer.layout.reLayoutParagraph(block, 0, 0);
            }
        }
        return this.changeListId(list, block.nextRenderedWidget, format, levelNum, listType);
    };
    Editor.prototype.getParagraphFormat = function (paragraph, levelNumber, listType) {
        if (!isNullOrUndefined(paragraph.previousRenderedWidget)) {
            if (paragraph.previousRenderedWidget instanceof ParagraphWidget) {
                if (!isNullOrUndefined(paragraph.previousRenderedWidget.paragraphFormat.listFormat)
                    && paragraph.previousRenderedWidget.paragraphFormat.listFormat.listId !== -1) {
                    var listLevel = this.getListLevel(paragraph.previousRenderedWidget);
                    if (levelNumber === 0) {
                        return paragraph.previousRenderedWidget.paragraphFormat;
                    }
                    else if (listType === listLevel.listLevelPattern
                        || this.checkNumberArabic(listType, listLevel.listLevelPattern)) {
                        return paragraph.previousRenderedWidget.paragraphFormat;
                    }
                    else {
                        return this.getParagraphFormat(paragraph.previousRenderedWidget, levelNumber, listType);
                    }
                }
                else {
                    return this.getParagraphFormat(paragraph.previousRenderedWidget, levelNumber, listType);
                }
            }
        }
        return undefined;
    };
    Editor.prototype.checkNumberArabic = function (listType, levelPattern) {
        if ((listType === 'Number' && levelPattern === 'Arabic')
            || (levelPattern === 'Number' && listType === 'Arabic')) {
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    Editor.prototype.applyRestartNumbering = function (selection) {
        if (this.editorHistory) {
            this.editorHistory.initializeHistory('RestartNumbering');
        }
        this.restartListAt(selection);
    };
    /**
     * @private
     */
    Editor.prototype.restartListAt = function (selection) {
        var currentListLevel = this.getListLevel(selection.start.paragraph);
        var list = new WList();
        list.listId = this.viewer.lists[(this.viewer.lists.length - 1)].listId + 1;
        var abstractList = new WAbstractList();
        abstractList.abstractListId = this.viewer.abstractLists[(this.viewer.abstractLists.length - 1)].abstractListId + 1;
        list.abstractListId = abstractList.abstractListId;
        list.abstractList = abstractList;
        this.viewer.abstractLists.push(abstractList);
        this.createListLevels(abstractList, currentListLevel, list);
        this.viewer.lists.push(list);
        this.restartListAtInternal(selection, list.listId);
    };
    /**
     * @private
     */
    Editor.prototype.restartListAtInternal = function (selection, listId) {
        var numberingInfo = this.getContinueNumberingInfo(selection.start.paragraph);
        this.changeRestartNumbering(numberingInfo.currentList, selection.start.paragraph, listId);
        this.reLayout(selection, false);
        this.incrementListNumber = -1;
        this.refListNumber = undefined;
        this.viewer.updateFocus();
    };
    Editor.prototype.changeRestartNumbering = function (list, block, listId) {
        if (isNullOrUndefined(block)) {
            return;
        }
        if (block instanceof ParagraphWidget) {
            if (list.listId === block.paragraphFormat.listFormat.listId) {
                if (this.editorHistory) {
                    var baseHistoryInfo = this.editorHistory.currentBaseHistoryInfo;
                    if (!isNullOrUndefined(baseHistoryInfo)) {
                        listId = baseHistoryInfo.addModifiedPropertiesForRestartNumbering(block.paragraphFormat.listFormat, listId);
                    }
                }
                block.paragraphFormat.listFormat.listId = listId;
                if (this.refListNumber !== block.paragraphFormat.listFormat.listLevelNumber) {
                    this.incrementListNumber += 1;
                    this.refListNumber = block.paragraphFormat.listFormat.listLevelNumber;
                }
                block.paragraphFormat.listFormat.listLevelNumber = this.incrementListNumber;
                this.viewer.layout.reLayoutParagraph(block, 0, 0);
            }
        }
        return this.changeRestartNumbering(list, block.nextRenderedWidget, listId);
    };
    Editor.prototype.createListLevels = function (abstractList, currentListLevel, list) {
        var levelPattern = currentListLevel.listLevelPattern;
        var levelPatterns = [];
        var currentAbstractList = currentListLevel.ownerBase;
        for (var i = 0; i < 3; i++) {
            var listLevel = currentAbstractList.levels[i];
            if (!isNullOrUndefined(listLevel)) {
                levelPatterns.push(listLevel.listLevelPattern);
            }
        }
        var indexOfLevelPattern = levelPatterns.indexOf(levelPattern) === -1 ? 0 : levelPatterns.indexOf(levelPattern);
        var numberFormat = currentListLevel.numberFormat.charAt(currentListLevel.numberFormat.length - 1);
        for (var i = 0; i < currentAbstractList.levels.length; i++) {
            var listLevel = new WListLevel(abstractList);
            if (i === 0) {
                listLevel.listLevelPattern = levelPattern;
            }
            else {
                if (indexOfLevelPattern === 0 || indexOfLevelPattern < levelPatterns.length - 1) {
                    indexOfLevelPattern++;
                }
                else {
                    indexOfLevelPattern = 0;
                }
                listLevel.listLevelPattern = levelPatterns[indexOfLevelPattern];
            }
            listLevel.numberFormat = '%' + (i + 1) + numberFormat;
            listLevel.startAt = 1;
            listLevel.characterFormat.copyFormat(currentListLevel.characterFormat);
            listLevel.paragraphFormat.copyFormat(currentListLevel.paragraphFormat);
            listLevel.restartLevel = i;
            abstractList.levels.push(listLevel);
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyParaFormat = function (paragraph, start, end, property, value, update) {
        this.setOffsetValue(this.selection);
        paragraph = paragraph.combineWidget(this.viewer);
        //Apply Paragraph Format for spitted paragraph
        this.applyParaFormatProperty(paragraph, property, value, update);
        this.layoutItemBlock(paragraph, false);
        this.getOffsetValue(this.selection);
        if (paragraph.equals(end.paragraph)) {
            return;
        }
        this.getNextParagraphForFormatting(paragraph, start, end, property, value, update);
    };
    /* tslint:disable-next-line:max-line-length */
    Editor.prototype.applyCharacterStyle = function (paragraph, start, end, property, value, update) {
        var paragraphWidget = paragraph.getSplitWidgets();
        var selection = end.owner.selection;
        var lastLine = end.currentWidget;
        var isParaSelected = start.offset === 0 && (selection.isParagraphLastLine(lastLine) && end.currentWidget === lastLine
            && end.offset === selection.getLineLength(lastLine) + 1 || end.isAtParagraphEnd);
        if (!isParaSelected && (end.paragraph === paragraph || paragraphWidget.indexOf(end.paragraph) !== -1)) {
            if (((value.type === 'Paragraph') && ((value.link) instanceof WCharacterStyle)) || (value.type === 'Character')) {
                var obj = (value.type === 'Character') ? value : value.link;
                this.updateSelectionCharacterFormatting(property, obj, update);
                return true;
            }
        }
        return false;
    };
    // Cell
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyParaFormatInCell = function (cell, start, end, property, value, update) {
        var selection = this.viewer.selection;
        if (end.paragraph.isInsideTable) {
            var cellContainer = selection.getContainerCellOf(cell, end.paragraph.associatedCell);
            if (cellContainer.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cell, cellContainer);
                var endCell = selection.getSelectedCell(end.paragraph.associatedCell, cellContainer);
                if (selection.containsCell(cellContainer, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(cellContainer, start, end)) {
                        value = this.getParaFormatValueInCell(cellContainer, property, value);
                        this.applyParaFormatCellInternal(cellContainer, property, value, update);
                    }
                    else {
                        if (startCell === cellContainer) {
                            this.applyParaFormat(start.paragraph, start, end, property, value, update);
                        }
                        else {
                            this.applyParagraphFormatRow(startCell.ownerRow, start, end, property, value, update);
                        }
                    }
                }
                else {
                    //Format other selected cells in current table.
                    this.applyParaFormatTableCell(cellContainer.ownerTable, cellContainer, endCell, property, value, update);
                }
            }
            else {
                this.applyParagraphFormatRow(cellContainer.ownerRow, start, end, property, value, update);
            }
        }
        else {
            var wCell = selection.getContainerCell(cell);
            this.applyParagraphFormatRow(wCell.ownerRow, start, end, property, value, update);
        }
    };
    Editor.prototype.applyParaFormatCellInternal = function (cell, property, value, update) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            if (block instanceof ParagraphWidget) {
                this.applyParaFormatProperty(block, property, value, update);
            }
            else {
                this.applyParagraphFormatTableInternal(block, property, value, update);
            }
        }
    };
    Editor.prototype.getParaFormatValueInCell = function (cell, property, value) {
        if (typeof value === 'boolean') {
            var firstPara = this.viewer.selection.getFirstParagraph(cell);
            value = !firstPara.paragraphFormat.getPropertyValue(property);
        }
        return value;
    };
    // Row
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyParagraphFormatRow = function (wRow, start, end, property, value, update) {
        value = this.getParaFormatValueInCell(wRow.childWidgets[0], property, value);
        for (var i = wRow.rowIndex; i < wRow.ownerTable.childWidgets.length; i++) {
            var row = wRow.ownerTable.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.applyParaFormatCellInternal(row.childWidgets[j], property, value, update);
            }
            if (end.paragraph.isInsideTable && this.viewer.selection.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
        }
        this.getNextParagraphForFormatting(wRow.ownerTable, start, end, property, value, update);
    };
    // Table
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyParaFormatTableCell = function (table, startCell, endCell, property, value, update) {
        var selection = this.viewer.selection;
        var startValue = selection.getCellLeft(startCell.ownerRow, startCell);
        var endValue = startValue + startCell.cellFormat.cellWidth;
        var endCellLeft = selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startValue, endValue, endCellLeft, endCellRight);
        startValue = cellInfo.start;
        endValue = cellInfo.end;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var isStarted = false;
        for (var m = table.childWidgets.indexOf(startCell.ownerRow); m <= count; m++) {
            var row = table.childWidgets[m];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var left = selection.getCellLeft(row, row.childWidgets[j]);
                if (Math.round(startValue) <= Math.round(left) && Math.round(left) < Math.round(endValue)) {
                    if (!isStarted) {
                        value = this.getParaFormatValueInCell(row.childWidgets[j], property, value);
                        isStarted = true;
                    }
                    this.applyParaFormatCellInternal(row.childWidgets[j], property, value, update);
                }
            }
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyParaFormatTable = function (table, start, end, property, value, update) {
        table = table.combineWidget(this.viewer);
        var selection = this.viewer.selection;
        for (var m = 0; m < table.childWidgets.length; m++) {
            var tableRow = table.childWidgets[m];
            for (var k = 0; k < tableRow.childWidgets.length; k++) {
                this.applyParaFormatCellInternal(tableRow.childWidgets[k], property, value, update);
            }
            if (end.paragraph.isInsideTable && selection.containsRow(tableRow, end.paragraph.associatedCell)) {
                this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
                return;
            }
        }
        this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        this.getNextParagraphForFormatting(table, start, end, property, value, update);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.getNextParagraphForFormatting = function (block, start, end, property, value, update) {
        var widgetCollection = block.getSplitWidgets();
        block = widgetCollection[widgetCollection.length - 1];
        block = this.viewer.selection.getNextRenderedBlock(block);
        if (!isNullOrUndefined(block)) { //Goto the next block.
            if (block instanceof ParagraphWidget) {
                this.applyParaFormat(block, start, end, property, value, update);
            }
            else {
                this.applyParaFormatTable(block, start, end, property, value, update);
            }
        }
    };
    Editor.prototype.applyParagraphFormatTableInternal = function (table, property, value, update) {
        for (var x = 0; x < table.childWidgets.length; x++) {
            var row = table.childWidgets[x];
            for (var y = 0; y < row.childWidgets.length; y++) {
                this.applyParaFormatCellInternal(row.childWidgets[y], property, value, update);
            }
        }
    };
    //Paragraph Format apply implementation Ends
    // Apply Selection Section Format Option Implementation Starts
    /**
     * Apply section format selection changes
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.onApplySectionFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        if (!isNullOrUndefined(property)) {
            var action = (property[0].toUpperCase() + property.slice(1));
            this.initHistory(action);
        }
        else {
            this.initHistory('SectionFormat');
        }
        this.updateSectionFormat(property, value);
    };
    /**
     * Update section format
     * @param  {string} property
     * @param  {Object} value
     * @returns TextPosition
     * @private
     */
    Editor.prototype.updateSectionFormat = function (property, value) {
        var selection = this.viewer.selection;
        selection.owner.isShiftingEnabled = true;
        var startPosition = selection.start;
        var endPosition = selection.end;
        if (!selection.isForward) {
            startPosition = selection.end;
            endPosition = selection.start;
        }
        var startPageIndex;
        var endPageIndex;
        this.viewer.clearContent();
        var startSectionIndex = startPosition.paragraph.bodyWidget.sectionIndex;
        var endSectionIndex = endPosition.paragraph.bodyWidget.sectionIndex;
        for (var i = 0; i < this.viewer.pages.length; i++) {
            if (this.viewer.pages[i].bodyWidgets[0].index === startSectionIndex) {
                startPageIndex = i;
                break;
            }
        }
        for (var i = startPageIndex; i < this.viewer.pages.length; i++) {
            var bodyWidget = this.viewer.pages[i].bodyWidgets[0];
            endPageIndex = i;
            if ((bodyWidget.index === startSectionIndex)) {
                continue;
            }
            else if ((bodyWidget.index >= startSectionIndex) && bodyWidget.index <= endSectionIndex) {
                continue;
            }
            else {
                endPageIndex = i - 1;
                break;
            }
        }
        // let startPageIndex: number = this.viewer.pages.indexOf((selection.start.paragraph.containerWidget as BodyWidget).page);
        // let endPageIndex: number = this.viewer.pages.indexOf((selection.end.paragraph.containerWidget as BodyWidget).page);
        var update = true;
        var index = 0;
        for (var i = startPageIndex; i <= endPageIndex; i++) {
            if (index !== this.viewer.pages[i].bodyWidgets[0].index && !update) {
                update = true;
            }
            this.applyPropertyValueForSection(this.viewer.pages[i].bodyWidgets[0].sectionFormat, property, value, update);
            index = this.viewer.pages[i].bodyWidgets[0].index;
            update = false;
        }
        this.layoutWholeDocument();
        this.fireContentChange();
    };
    //Apply Selection Table Format option implementation starts
    /**
     * Apply table format property changes
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.onApplyTableFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getTableFormatAction(property);
        this.viewer.owner.isShiftingEnabled = true;
        var selection = this.viewer.selection;
        var table = selection.start.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.viewer);
        if (selection.isEmpty) {
            this.initHistory(action);
            this.applyTablePropertyValue(selection, property, value, table);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        table.calculateGrid();
        this.selection.owner.isLayoutEnabled = true;
        this.viewer.layout.reLayoutTable(table);
        this.reLayout(selection, false);
    };
    Editor.prototype.getTableFormatAction = function (property) {
        switch (property) {
            case 'tableAlignment':
                return 'TableAlignment';
            case 'leftIndent':
                return 'TableLeftIndent';
            case 'leftMargin':
                return 'DefaultCellLeftMargin';
            case 'rightMargin':
                return 'DefaultCellRightMargin';
            case 'bottomMargin':
                return 'DefaultCellBottomMargin';
            case 'topMargin':
                return 'DefaultCellTopMargin';
            case 'preferredWidth':
                return 'TablePreferredWidth';
            case 'preferredWidthType':
                return 'TablePreferredWidthType';
            case 'shading':
                return 'Shading';
            case 'bidi':
                return 'TableBidi';
            default:
                return 'DefaultCellSpacing';
        }
    };
    // Apply Selection Row Format Option Implementation Starts
    /**
     * Apply table row format property changes
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.onApplyTableRowFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getRowAction(property);
        this.viewer.owner.isShiftingEnabled = true;
        var selection = this.viewer.selection;
        if (selection.isEmpty) {
            this.initHistory(action);
            var table = selection.start.paragraph.associatedCell.ownerRow.ownerTable;
            this.applyRowPropertyValue(selection, property, value, selection.start.paragraph.associatedCell.ownerRow);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        this.reLayout(selection, false);
    };
    Editor.prototype.getRowAction = function (property) {
        switch (property) {
            case 'height':
                return 'RowHeight';
            case 'heightType':
                return 'RowHeightType';
            case 'isHeader':
                return 'RowHeader';
            default:
                return 'AllowBreakAcrossPages';
        }
    };
    /**
     * Apply table cell property changes
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.onApplyTableCellFormat = function (property, value) {
        if (this.restrictFormatting) {
            return;
        }
        var action = this.getTableCellAction(property);
        this.viewer.owner.isShiftingEnabled = true;
        var selection = this.viewer.selection;
        var table = selection.start.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.viewer);
        if (selection.isEmpty) {
            this.initHistory(action);
            this.applyCellPropertyValue(selection, property, value, selection.start.paragraph.associatedCell.cellFormat);
            table.calculateGrid();
            this.selection.owner.isLayoutEnabled = true;
            this.viewer.layout.reLayoutTable(table);
        }
        else {
            this.updateSelectionTableFormat(this.selection, action, value);
        }
        this.reLayout(selection, false);
    };
    Editor.prototype.getTableCellAction = function (property) {
        switch (property) {
            case 'verticalAlignment':
                return 'CellContentVerticalAlignment';
            case 'leftMargin':
                return 'CellLeftMargin';
            case 'rightMargin':
                return 'CellRightMargin';
            case 'bottomMargin':
                return 'CellBottomMargin';
            case 'topMargin':
                return 'CellTopMargin';
            case 'preferredWidth':
                return 'CellPreferredWidth';
            case 'shading':
                return 'Shading';
            default:
                return 'CellPreferredWidthType';
        }
    };
    Editor.prototype.applyPropertyValueForSection = function (sectionFormat, property, value, update) {
        var selection = this.viewer.selection;
        if (update && this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedPropertiesForSection(sectionFormat, property, value);
        }
        if (isNullOrUndefined(value)) {
            return;
        }
        if (value instanceof WSectionFormat) {
            if (isNullOrUndefined(property)) {
                sectionFormat.copyFormat(value, this.editorHistory);
            }
            return;
        }
        if (property === 'pageHeight') {
            sectionFormat.pageHeight = value;
        }
        else if (property === 'pageWidth') {
            sectionFormat.pageWidth = value;
        }
        else if (property === 'leftMargin') {
            sectionFormat.leftMargin = value;
        }
        else if (property === 'rightMargin') {
            sectionFormat.rightMargin = value;
        }
        else if (property === 'topMargin') {
            sectionFormat.topMargin = value;
        }
        else if (property === 'bottomMargin') {
            sectionFormat.bottomMargin = value;
        }
        else if (property === 'differentFirstPage') {
            sectionFormat.differentFirstPage = value;
        }
        else if (property === 'differentOddAndEvenPages') {
            sectionFormat.differentOddAndEvenPages = value;
        }
        else if (property === 'headerDistance') {
            sectionFormat.headerDistance = value;
        }
        else if (property === 'footerDistance') {
            sectionFormat.footerDistance = value;
        }
    };
    /**
     * @private
     */
    Editor.prototype.layoutWholeDocument = function () {
        var startPosition = this.viewer.selection.start;
        var endPosition = this.viewer.selection.end;
        if (startPosition.isExistAfter(endPosition)) {
            startPosition = this.viewer.selection.end;
            endPosition = this.viewer.selection.start;
        }
        var startInfo = this.selection.getParagraphInfo(startPosition);
        var endInfo = this.selection.getParagraphInfo(startPosition);
        var startIndex = this.selection.getHierarchicalIndex(startInfo.paragraph, startInfo.offset.toString());
        var endIndex = this.selection.getHierarchicalIndex(endInfo.paragraph, endInfo.offset.toString());
        this.viewer.renderedLists.clear();
        // this.viewer.owner.isLayoutEnabled = true;
        var sections = this.combineSection();
        this.viewer.clearContent();
        this.viewer.layout.layoutItems(sections);
        this.viewer.owner.isShiftingEnabled = false;
        this.setPositionForCurrentIndex(startPosition, startIndex);
        this.setPositionForCurrentIndex(endPosition, endIndex);
        this.viewer.selection.selectPosition(startPosition, endPosition);
        this.reLayout(this.viewer.selection);
    };
    Editor.prototype.combineSection = function () {
        var sections = [];
        var nextSection = this.viewer.pages[0].bodyWidgets[0];
        do {
            nextSection = this.combineSectionChild(nextSection, sections);
        } while (nextSection);
        return sections;
    };
    Editor.prototype.combineSectionChild = function (bodyWidget, sections) {
        var previousBodyWidget = bodyWidget;
        var temp = new BodyWidget();
        temp.sectionFormat = bodyWidget.sectionFormat;
        temp.index = previousBodyWidget.index;
        do {
            previousBodyWidget = bodyWidget;
            if (bodyWidget.lastChild) {
                bodyWidget.lastChild.combineWidget(this.viewer);
            }
            bodyWidget = bodyWidget.nextRenderedWidget;
            for (var j = 0; j < previousBodyWidget.childWidgets.length; j++) {
                var block = previousBodyWidget.childWidgets[j];
                if (block instanceof TableWidget) {
                    this.viewer.layout.clearTableWidget(block, true, true, true);
                }
                else {
                    block.x = 0;
                    block.y = 0;
                    block.width = 0;
                    block.height = 0;
                }
                temp.childWidgets.push(block);
                previousBodyWidget.childWidgets.splice(j, 1);
                j--;
                block.containerWidget = temp;
            }
            previousBodyWidget.page.destroy();
            // this.viewer.pages.splice(previousBodyWidget.page.index, 1);
        } while (bodyWidget && previousBodyWidget.equals(bodyWidget));
        sections.push(temp);
        return bodyWidget;
    };
    Editor.prototype.updateSelectionTableFormat = function (selection, action, value) {
        switch (action) {
            case 'TableAlignment':
                this.editorHistory.initializeHistory('TableAlignment');
                this.updateTableFormat(selection, 'tableAlignment', value);
                break;
            case 'TableLeftIndent':
                this.editorHistory.initializeHistory('TableLeftIndent');
                this.updateTableFormat(selection, 'leftIndent', value);
                break;
            case 'DefaultCellSpacing':
                this.editorHistory.initializeHistory('DefaultCellSpacing');
                this.updateTableFormat(selection, 'cellSpacing', value);
                break;
            case 'DefaultCellLeftMargin':
                this.editorHistory.initializeHistory('DefaultCellLeftMargin');
                this.updateTableFormat(selection, 'leftMargin', value);
                break;
            case 'DefaultCellRightMargin':
                this.editorHistory.initializeHistory('DefaultCellRightMargin');
                this.updateTableFormat(selection, 'rightMargin', value);
                break;
            case 'DefaultCellTopMargin':
                this.editorHistory.initializeHistory('DefaultCellTopMargin');
                this.updateTableFormat(selection, 'topMargin', value);
                break;
            case 'TablePreferredWidth':
                this.editorHistory.initializeHistory('TablePreferredWidth');
                this.updateTableFormat(selection, 'preferredWidth', value);
                break;
            case 'TablePreferredWidthType':
                this.editorHistory.initializeHistory('TablePreferredWidthType');
                this.updateTableFormat(selection, 'preferredWidthType', value);
                break;
            case 'DefaultCellBottomMargin':
                this.editorHistory.initializeHistory('DefaultCellBottomMargin');
                this.updateTableFormat(selection, 'bottomMargin', value);
                break;
            case 'CellContentVerticalAlignment':
                this.editorHistory.initializeHistory('CellContentVerticalAlignment');
                this.updateCellFormat(selection, 'verticalAlignment', value);
                break;
            case 'CellLeftMargin':
                this.editorHistory.initializeHistory('CellLeftMargin');
                this.updateCellFormat(selection, 'leftMargin', value);
                break;
            case 'CellRightMargin':
                this.editorHistory.initializeHistory('CellRightMargin');
                this.updateCellFormat(selection, 'rightMargin', value);
                break;
            case 'CellTopMargin':
                this.editorHistory.initializeHistory('CellTopMargin');
                this.updateCellFormat(selection, 'topMargin', value);
                break;
            case 'CellBottomMargin':
                this.editorHistory.initializeHistory('CellBottomMargin');
                this.updateCellFormat(selection, 'bottomMargin', value);
                break;
            case 'CellPreferredWidth':
                this.editorHistory.initializeHistory('CellPreferredWidth');
                this.updateCellFormat(selection, 'preferredWidth', value);
                break;
            case 'CellPreferredWidthType':
                this.editorHistory.initializeHistory('CellPreferredWidthType');
                this.updateCellFormat(selection, 'preferredWidthType', value);
                break;
            case 'Shading':
                this.editorHistory.initializeHistory('Shading');
                this.updateCellFormat(selection, 'shading', value);
                break;
            case 'RowHeight':
                this.editorHistory.initializeHistory('RowHeight');
                this.updateRowFormat(selection, 'height', value);
                break;
            case 'RowHeightType':
                this.editorHistory.initializeHistory('RowHeightType');
                this.updateRowFormat(selection, 'heightType', value);
                break;
            case 'RowHeader':
                this.editorHistory.initializeHistory('RowHeader');
                this.updateRowFormat(selection, 'isHeader', value);
                break;
            case 'AllowBreakAcrossPages':
                this.editorHistory.initializeHistory('AllowBreakAcrossPages');
                this.updateRowFormat(selection, 'allowBreakAcrossPages', value);
                break;
            case 'TableBidi':
                this.editorHistory.initializeHistory(action);
                this.updateTableFormat(selection, 'bidi', value);
                break;
        }
    };
    // Update Table Properties
    /**
     * Update Table Format on undo
     * @param  {Selection} selection
     * @param  {SelectionRange} selectionRange
     * @param  {string} property
     * @param  {object} value
     * @private
     */
    Editor.prototype.updateTableFormat = function (selection, property, value) {
        var tableStartPosition = selection.start;
        var tableEndPosition = selection.end;
        if (!selection.isForward) {
            tableStartPosition = selection.end;
            tableEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, tableStartPosition);
        // tslint:disable-next-line:max-line-length
        this.applyTablePropertyValue(selection, property, value, tableStartPosition.paragraph.associatedCell.ownerTable);
        if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
            this.viewer.layout.reLayoutTable(tableStartPosition.paragraph.associatedCell.ownerTable);
        }
    };
    /**
     * update cell format on undo
     * @param  {Selection} selection
     * @param  {SelectionRange} selectionRange
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.updateCellFormat = function (selection, property, value) {
        selection.owner.isShiftingEnabled = true;
        var newStartPosition = selection.start;
        var newEndPosition = selection.end;
        if (!selection.isForward) {
            newStartPosition = selection.end;
            newEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, newStartPosition);
        this.updateFormatForCell(selection, property, value);
    };
    /**
     * update row format on undo
     * @param  {Selection} selection
     * @param  {SelectionRange} selectionRange
     * @param  {string} property
     * @param  {Object} value
     * @private
     */
    Editor.prototype.updateRowFormat = function (selection, property, value) {
        var rowStartPosition = selection.start;
        var rowEndPosition = selection.end;
        if (!selection.isForward) {
            rowStartPosition = selection.end;
            rowEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, rowStartPosition);
        // tslint:disable-next-line:max-line-length
        this.applyRowFormat(rowStartPosition.paragraph.associatedCell.ownerRow, rowStartPosition, rowEndPosition, property, value);
    };
    Editor.prototype.initHistoryPosition = function (selection, position) {
        if (this.viewer.owner.editorHistoryModule && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (!isNullOrUndefined(position)) {
                if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                    this.editorHistory.currentBaseHistoryInfo.insertPosition = position.getHierarchicalIndexInternal();
                }
            }
            else if (isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition)) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = selection.start.getHierarchicalIndexInternal();
            }
        }
    };
    Editor.prototype.startSelectionReLayouting = function (paragraph, selection, start, end) {
        selection.owner.isLayoutEnabled = true;
        if (start.paragraph.isInsideTable) {
            var table = start.paragraph.associatedCell.ownerTable;
            while (table.isInsideTable) {
                table = table.associatedCell.ownerTable;
            }
            this.reLayoutSelectionOfTable(table, selection, start, end);
        }
        else {
            this.reLayoutSelection(paragraph, selection, start, end);
        }
    };
    Editor.prototype.reLayoutSelectionOfTable = function (table, selection, start, end) {
        var isEnded = false;
        this.viewer.layout.layoutBodyWidgetCollection(table.index, table.containerWidget, table, false);
        // If the selection ends in the current table, need to stop relayouting.
        if (!isNullOrUndefined(end.paragraph.associatedCell) && table.contains(end.paragraph.associatedCell)) {
            return true;
        }
        var block = selection.getNextRenderedBlock(table);
        // Relayout the next block.
        if (!isNullOrUndefined(block)) {
            isEnded = this.reLayoutSelectionOfBlock(block, selection, start, end);
        }
        return isEnded;
    };
    Editor.prototype.reLayoutSelection = function (paragraph, selection, start, end) {
        if (start.paragraph === paragraph) {
            var startOffset = start.offset;
            var length_2 = selection.getParagraphLength(paragraph);
            var indexInInline = 0;
            var index = 0;
            var inlineObj = paragraph.getInline(start.offset, indexInInline);
            var inline = inlineObj.element;
            indexInInline = inlineObj.index;
            if (!isNullOrUndefined(inline)) {
                if (indexInInline === inline.length && !isNullOrUndefined(inline.nextNode)) {
                    inline = inline.nextNode;
                }
                index = inline.line.children.indexOf(inline);
            }
            var lineIndex = 0;
            if (start.currentWidget.paragraph === paragraph) {
                lineIndex = paragraph.childWidgets.indexOf(start.currentWidget);
                index = start.currentWidget.children.indexOf(inline);
            }
            // If selection start inline is at new inline, need to relayout from the previous inline.
            if (inline instanceof TextElementBox && !inline.line && index > 0) {
                this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, index - 1);
            }
            else {
                this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, index);
            }
        }
        else {
            this.viewer.layout.reLayoutParagraph(paragraph, 0, 0);
        }
        // If the selection ends at the current paragraph, need to stop relayouting.
        if (end.paragraph === paragraph) {
            return true;
        }
        // _Relayout the next block.
        var block = selection.getNextRenderedBlock(paragraph);
        if (!isNullOrUndefined(block)) {
            return this.reLayoutSelectionOfBlock(block, selection, start, end);
        }
        return false;
    };
    //Relayouting Start    
    Editor.prototype.reLayoutSelectionOfBlock = function (block, selection, start, end) {
        if (block instanceof ParagraphWidget) {
            return this.reLayoutSelection(block, selection, start, end);
        }
        else {
            return undefined;
            // return this.reLayoutSelectionOfTable(block as TableWidget, selection, start, end);
        }
    };
    /**
     * @private
     */
    Editor.prototype.layoutItemBlock = function (block, shiftNextWidget) {
        var section = undefined;
        if (block.containerWidget instanceof BlockContainer) {
            section = block.containerWidget;
            var index = section.childWidgets.indexOf(block);
            if (!isNullOrUndefined(this.viewer.owner)
                && this.viewer.owner.isLayoutEnabled) {
                // tslint:disable-next-line:max-line-length
                this.viewer.layout.layoutBodyWidgetCollection(block.index, section, block, false);
            }
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            var cell = block.containerWidget;
            cell = this.viewer.selection.getContainerCell(cell);
            if (!isNullOrUndefined(this.viewer.owner)
                && this.viewer.owner.isLayoutEnabled) {
                this.viewer.layout.reLayoutTable(block);
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeSelectedContents = function (selection) {
        return this.removeSelectedContentInternal(selection, selection.start, selection.end);
    };
    Editor.prototype.removeSelectedContentInternal = function (selection, startPosition, endPosition) {
        var startPos = startPosition;
        var endPos = endPosition;
        if (!startPosition.isExistBefore(endPosition)) {
            startPos = endPosition;
            endPos = startPosition;
        }
        // tslint:disable-next-line:max-line-length
        if (startPos.paragraph === endPos.paragraph && startPos.paragraph.childWidgets.indexOf(startPos.currentWidget) === startPos.paragraph.childWidgets.length - 1 &&
            startPos.offset === selection.getParagraphLength(startPos.paragraph) && startPos.offset + 1 === endPos.offset) {
            selection.owner.isShiftingEnabled = true;
            selection.selectContent(startPos, true);
            return true;
        }
        var paragraphInfo = this.selection.getParagraphInfo(startPos);
        selection.editPosition = this.selection.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
        var isRemoved = this.removeSelectedContent(endPos.paragraph, selection, startPos, endPos);
        var textPosition = new TextPosition(selection.owner);
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        return isRemoved;
    };
    Editor.prototype.removeSelectedContent = function (paragraph, selection, start, end) {
        //If end is not table end and start is outside the table, then skip removing the contents and move caret to start position.
        if (end.paragraph.isInsideTable
            && end.paragraph !== selection.getLastParagraphInLastCell(end.paragraph.associatedCell.ownerTable)
            && (!start.paragraph.isInsideTable || start.paragraph.associatedCell.ownerTable !== end.paragraph.associatedCell.ownerTable)) {
            return false;
        }
        selection.owner.isShiftingEnabled = true;
        this.deleteSelectedContent(paragraph, selection, start, end, 2);
        return true;
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.deleteSelectedContent = function (paragraph, selection, start, end, editAction) {
        var indexInInline = 0;
        var inlineObj = start.currentWidget.getInline(start.offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        // if (!isNullOrUndefined(inline)) {
        //     inline = selection.getNextRenderedInline(inline, indexInInline);
        // }
        // if (inline instanceof WFieldBegin && !isNullOrUndefined((inline as WFieldBegin).fieldEnd)) {
        // tslint:disable-next-line:max-line-length
        //     let fieldEndOffset: number = ((inline as WFieldBegin).fieldEnd.owner as WParagraph).getOffset((inline as WFieldBegin).fieldEnd, 1);
        //     let fieldEndIndex: string = WordDocument.getHierarchicalIndexOf((inline as WFieldBegin).fieldEnd.owner as WParagraph, fieldEndOffset.toString());
        //     let selectionEndIndex: string = end.getHierarchicalIndexInternal();
        //     if (!TextPosition.isForwardSelection(fieldEndIndex, selectionEndIndex)) {
        //         //If selection end is after field begin, moves selection start to field separator.
        //         start.moveToInline((inline as WFieldBegin).fieldSeparator, 1);
        //         selection.editPosition = start.getHierarchicalIndexInternal();
        //         if (!isNullOrUndefined(selection.currentBaseHistoryInfo)) {
        //             selection.currentBaseHistoryInfo.insertPosition = selection.editPosition;
        //         }
        //     }
        // }
        indexInInline = 0;
        inlineObj = end.currentWidget.getInline(end.offset, indexInInline);
        inline = inlineObj.element;
        indexInInline = inlineObj.index;
        // if (!isNullOrUndefined(inline)) {
        //     inline = selection.getNextRenderedInline(inline, indexInInline);
        // }
        // if (inline instanceof WFieldEnd && !isNullOrUndefined((inline as WFieldEnd).fieldBegin)) {
        // tslint:disable-next-line:max-line-length
        //     let fieldBeginOffset: number = ((inline as WFieldEnd).fieldBegin.owner as WParagraph).getOffset((inline as WFieldEnd).fieldBegin, 0);
        //     let fieldBeginIndex: string = WordDocument.getHierarchicalIndexOf((inline as WFieldEnd).fieldBegin.owner as WParagraph, fieldBeginOffset.toString());
        //     let selectionStartIndex: string = start.getHierarchicalIndexInternal();
        //     if (!TextPosition.isForwardSelection(selectionStartIndex, fieldBeginIndex)) {
        //         //If field begin is before selection start, move selection end to inline item before field end.
        //         let prevInline: WInline = selection.getPreviousTextInline(inline);
        //         if (isNullOrUndefined(prevInline)) {
        //             end.moveBackward();
        //         } else {
        //             end.moveToInline(prevInline, prevInline.length);
        //         }
        //     }
        // }
        if (end.paragraph !== paragraph) {
            this.deleteSelectedContent(end.paragraph, selection, start, end, editAction);
            return;
        }
        //  Selection start in cell.
        if (end.paragraph.isInsideTable && (!start.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || selection.isCellSelected(end.paragraph.associatedCell, start, end))) {
            end.paragraph.associatedCell.ownerTable.combineWidget(this.viewer);
            this.deleteTableCell(end.paragraph.associatedCell, selection, start, end, editAction);
        }
        else {
            this.deletePara(paragraph, start, end, editAction);
            if (this.delBlockContinue && this.delBlock) {
                if (this.delSection) {
                    var bodyWidget = paragraph.bodyWidget instanceof BodyWidget ? paragraph.bodyWidget : undefined;
                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                    this.delSection = undefined;
                }
                this.deleteBlock(this.delBlock, selection, start, end, editAction);
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
    };
    /**
     * Merge the selected cells.
     */
    Editor.prototype.mergeCells = function () {
        if (this.owner.isReadOnlyMode || !this.owner.isDocumentLoaded) {
            return;
        }
        if (!isNullOrUndefined(this.viewer) && !this.selection.isEmpty) {
            this.mergeSelectedCellsInTable();
        }
    };
    /**
     * Deletes the entire table at selection.
     */
    Editor.prototype.deleteTable = function () {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        if (startPos.paragraph.isInsideTable) {
            var table = this.getOwnerTable(this.selection.isForward).combineWidget(this.viewer);
            this.selection.owner.isShiftingEnabled = true;
            if (this.checkIsNotRedoing()) {
                this.initHistory('DeleteTable');
                //Sets the insert position in history info as current table.    
                this.updateHistoryPosition(startPos, true);
            }
            var paragraph = this.getParagraphForSelection(table);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.editorHistory.currentBaseHistoryInfo.removedNodes.push(table.clone());
            }
            this.removeBlock(table);
            this.selection.selectParagraphInternal(paragraph, true);
            if (this.checkIsNotRedoing() || isNullOrUndefined(this.editorHistory)) {
                this.reLayout(this.selection);
            }
        }
    };
    /**
     * Deletes the selected column(s).
     */
    Editor.prototype.deleteColumn = function () {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        if (startPos.paragraph.isInsideTable) {
            this.selection.owner.isShiftingEnabled = true;
            if (this.checkIsNotRedoing()) {
                this.initHistory('DeleteColumn');
            }
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            var table = startCell.ownerTable.combineWidget(this.viewer);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.cloneTableToHistoryInfo(table);
            }
            var paragraph = undefined;
            if (endCell.nextWidget) {
                var nextCell = endCell.nextWidget;
                paragraph = this.selection.getFirstParagraph(nextCell);
            }
            else if (startCell.previousWidget) {
                var previousCell = startCell.previousWidget;
                paragraph = this.selection.getFirstParagraph(previousCell);
            }
            if (isNullOrUndefined(paragraph)) {
                paragraph = this.getParagraphForSelection(table);
            }
            //retrieve the cell collection based on start and end cell to remove. 
            var deleteCells = table.getColumnCellsForSelection(startCell, endCell);
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                if (row.childWidgets.length === 1) {
                    if (deleteCells.indexOf(row.childWidgets[0]) >= 0) {
                        table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
                        row.destroy();
                        i--;
                    }
                }
                else {
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var tableCell = row.childWidgets[j];
                        if (deleteCells.indexOf(tableCell) >= 0) {
                            row.childWidgets.splice(j, 1);
                            tableCell.destroy();
                            j--;
                        }
                    }
                    if (row.childWidgets.length === 0) {
                        table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
                        row.destroy();
                        i--;
                    }
                }
            }
            if (table.childWidgets.length === 0) {
                // Before disposing table reset the paragrph.
                paragraph = this.getParagraphForSelection(table);
                this.removeBlock(table);
                if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                    this.editorHistory.currentBaseHistoryInfo.action = 'DeleteTable';
                }
                table.destroy();
            }
            else {
                table.isGridUpdated = false;
                table.buildTableColumns();
                table.isGridUpdated = true;
                this.viewer.layout.reLayoutTable(table);
            }
            this.selection.selectParagraphInternal(paragraph, true);
            if (isNullOrUndefined(this.editorHistory) || this.checkIsNotRedoing()) {
                this.reLayout(this.selection, true);
            }
        }
    };
    /**
     * Deletes the selected row(s).
     */
    Editor.prototype.deleteRow = function () {
        if (this.owner.isReadOnlyMode) {
            return;
        }
        var startPos = !this.selection.isForward ? this.selection.end : this.selection.start;
        var endPos = !this.selection.isForward ? this.selection.start : this.selection.end;
        if (startPos.paragraph.isInsideTable) {
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            if (this.checkIsNotRedoing()) {
                this.initHistory('DeleteRow');
            }
            this.selection.owner.isShiftingEnabled = true;
            var table = startCell.ownerTable.combineWidget(this.viewer);
            var row = this.getOwnerRow(true);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.cloneTableToHistoryInfo(table);
            }
            var paragraph = undefined;
            if (row.nextWidget) {
                var nextCell = row.nextWidget.childWidgets[0];
                paragraph = this.selection.getFirstParagraph(nextCell);
            }
            if (isNullOrUndefined(paragraph)) {
                paragraph = this.getParagraphForSelection(table);
            }
            if (!this.selection.isEmpty) {
                //tslint:disable-next-line:max-line-length
                var containerCell = this.selection.getContainerCellOf(startCell, endCell);
                if (containerCell.ownerTable.contains(endCell)) {
                    startCell = this.selection.getSelectedCell(startCell, containerCell);
                    endCell = this.selection.getSelectedCell(endCell, containerCell);
                    if (this.selection.containsCell(containerCell, endCell)) {
                        row = startCell.ownerRow;
                        this.removeRow(row);
                    }
                    else {
                        row = startCell.ownerRow;
                        var endRow = endCell.ownerRow;
                        //Update the selection paragraph.
                        paragraph = undefined;
                        if (endRow.nextWidget) {
                            var nextCell = endRow.nextWidget.childWidgets[0];
                            paragraph = this.selection.getFirstParagraph(nextCell);
                        }
                        if (isNullOrUndefined(paragraph)) {
                            paragraph = this.getParagraphForSelection(table);
                        }
                        for (var i = 0; i < table.childWidgets.length; i++) {
                            var tableRow = table.childWidgets[i];
                            if (tableRow.rowIndex >= row.rowIndex && tableRow.rowIndex <= endRow.rowIndex) {
                                table.childWidgets.splice(i, 1);
                                tableRow.destroy();
                                i--;
                            }
                        }
                        if (table.childWidgets.length === 0) {
                            this.removeBlock(table);
                            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                                this.editorHistory.currentBaseHistoryInfo.action = 'DeleteTable';
                            }
                            table.destroy();
                        }
                        else {
                            this.updateTable(table);
                        }
                    }
                }
            }
            else {
                this.removeRow(row);
            }
            this.selection.selectParagraphInternal(paragraph, true);
            if (isNullOrUndefined(this.editorHistory) || this.checkIsNotRedoing()) {
                this.reLayout(this.selection, true);
            }
        }
    };
    Editor.prototype.removeRow = function (row) {
        var table = row.ownerTable;
        if (table.childWidgets.length === 1) {
            this.removeBlock(table);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                this.editorHistory.currentBaseHistoryInfo.action = 'Delete';
            }
            table.destroy();
        }
        else {
            table.childWidgets.splice(table.childWidgets.indexOf(row), 1);
            row.destroy();
            this.updateTable(table);
        }
    };
    Editor.prototype.updateTable = function (table) {
        table.updateRowIndex(0);
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.viewer.layout.reLayoutTable(table);
    };
    Editor.prototype.getParagraphForSelection = function (table) {
        var paragraph = undefined;
        var nextWidget = table.nextWidget ? table.nextWidget : table.nextRenderedWidget;
        var previousWidget = table.previousWidget ? table.previousWidget : table.previousRenderedWidget;
        if (nextWidget) {
            paragraph = nextWidget instanceof ParagraphWidget ? nextWidget
                : this.selection.getFirstParagraphInFirstCell(nextWidget);
        }
        else if (previousWidget) {
            paragraph = previousWidget instanceof ParagraphWidget ? previousWidget
                : this.selection.getLastParagraphInLastCell(previousWidget);
        }
        return paragraph;
    };
    Editor.prototype.deletePara = function (paragraph, start, end, editAction) {
        paragraph = paragraph.combineWidget(this.viewer);
        var selection = this.viewer.selection;
        var paragraphStart = selection.getStartOffset(paragraph);
        var endParagraphStartOffset = selection.getStartOffset(end.paragraph);
        var startOffset = paragraphStart;
        var endOffset = 0;
        var isCombineNextParagraph = false;
        var lastLinelength = this.selection.getLineLength(paragraph.lastChild);
        var currentParagraph = paragraph;
        var section = paragraph.bodyWidget instanceof BodyWidget ? paragraph.bodyWidget : undefined;
        var startLine = undefined;
        var endLineWidget = undefined;
        if (paragraph === start.paragraph) {
            startOffset = start.offset;
            startLine = start.currentWidget;
            if (end.paragraph.isInsideTable) {
                isCombineNextParagraph = this.isEndInAdjacentTable(paragraph, end.paragraph);
            }
        }
        else {
            startLine = paragraph.firstChild;
        }
        if (paragraph !== start.paragraph && selection.isSkipLayouting) {
            selection.isSkipLayouting = false;
        }
        if (paragraph === end.paragraph) {
            endLineWidget = end.currentWidget;
            endOffset = end.offset;
        }
        else {
            endLineWidget = paragraph.lastChild;
            endOffset = this.viewer.selection.getLineLength(paragraph.lastChild);
        }
        var block = paragraph.previousRenderedWidget;
        if (startOffset > paragraphStart && start.currentWidget === paragraph.lastChild &&
            startOffset === lastLinelength && (paragraph === end.paragraph && end.offset === startOffset + 1 ||
            paragraph.nextRenderedWidget === end.paragraph && end.offset === endParagraphStartOffset) ||
            (this.editorHistory && this.editorHistory.isUndoing && this.editorHistory.currentHistoryInfo &&
                this.editorHistory.currentHistoryInfo.action === 'PageBreak' && block && block.isPageBreak()
                && (startOffset === 0 && !start.currentWidget.isFirstLine || startOffset > 0))) {
            isCombineNextParagraph = true;
        }
        if (end.paragraph === paragraph && end.currentWidget !== paragraph.lastChild ||
            (end.currentWidget === paragraph.lastChild && end.offset <= selection.getLineLength(paragraph.lastChild))) {
            var isStartParagraph = start.paragraph === paragraph;
            if (end.currentWidget.isFirstLine() && end.offset > paragraphStart || !end.currentWidget.isFirstLine()) {
                //If selection end with this paragraph and selection doesnot include paragraph mark.               
                this.removeInlines(paragraph, startLine, startOffset, endLineWidget, endOffset, editAction);
                //Removes the splitted paragraph.
            }
            if (!isNullOrUndefined(block) && !isStartParagraph) {
                this.delBlockContinue = true;
                this.delBlock = block;
                var nextSection = block.bodyWidget instanceof BodyWidget ? block.bodyWidget : undefined;
                if (nextSection && !section.equals(nextSection) && section.index !== nextSection.index) {
                    this.delSection = nextSection;
                }
                else {
                    this.delSection = undefined;
                }
            }
            else {
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        else if (start.paragraph === paragraph && (start.currentWidget !== paragraph.firstChild ||
            (start.currentWidget === paragraph.firstChild && startOffset > paragraphStart))) {
            // If selection start is after paragraph start
            //And selection does not end with this paragraph Or selection include paragraph mark.
            this.delBlockContinue = false;
            this.delBlock = undefined;
            if (editAction === 4) {
                return;
            }
            else {
                currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, startLine, startOffset, true);
                this.insertParagraphPaste(paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction);
                this.addRemovedNodes(paragraph);
                return;
            }
        }
        else {
            var newParagraph = undefined;
            var previousBlock = paragraph.previousWidget;
            var prevParagraph = (previousBlock instanceof ParagraphWidget) ? previousBlock : undefined;
            var nextWidget = paragraph.nextRenderedWidget;
            if (editAction < 4) {
                //Checks whether this is last paragraph of owner text body and previousBlock is not paragraph.
                newParagraph = this.checkAndInsertBlock(paragraph, start, end, editAction, prevParagraph);
                this.removeBlock(paragraph);
                if (this.viewer.blockToShift === paragraph) {
                    this.viewer.blockToShift = undefined;
                }
                this.addRemovedNodes(paragraph);
                if (!isNullOrUndefined(newParagraph)) {
                    selection.editPosition = this.selection.getHierarchicalIndex(newParagraph, '0');
                    var offset = selection.getParagraphLength(newParagraph) + 1;
                    if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                        //tslint:disable-next-line:max-line-length
                        this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(newParagraph, offset.toString());
                    }
                }
                else if (paragraph === start.paragraph && isNullOrUndefined(nextWidget) && !isNullOrUndefined(prevParagraph)) {
                    var offset = this.selection.getParagraphLength(prevParagraph);
                    // if (isNullOrUndefined(block)) {
                    selection.editPosition = this.selection.getHierarchicalIndex(prevParagraph, offset.toString());
                    if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                        this.updateHistoryPosition(selection.editPosition, true);
                        this.editorHistory.currentBaseHistoryInfo.endPosition = selection.editPosition;
                    }
                    // } else {
                    //     let offset: number = selection.getParagraphLength(paragraph) + 1;
                    //     if (block instanceof ParagraphWidget) {
                    //         prevParagraph = block as ParagraphWidget;
                    //     }
                    //     // if (block instanceof WTable) {
                    //     //     prevParagraph = (block as WTable).getFirstParagraphInFirstCell();
                    //     // }
                    //     selection.editPosition = prevLineWidget.getHierarchicalIndex('0');
                    // }
                }
            }
            if (start.paragraph !== paragraph && !isNullOrUndefined(block)) {
                this.delBlockContinue = true;
                this.delBlock = block;
            }
            else {
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        this.insertParagraphPaste(paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction);
    };
    Editor.prototype.deleteSection = function (selection, section, nextSection, editAction) {
        if (editAction < 4) {
            this.combineSectionInternal(selection, section, nextSection);
        }
        //Copies the section properties, if this is last paragraph of section.
        if (editAction > 2) {
            section.sectionFormat.copyFormat(nextSection.sectionFormat);
        }
    };
    Editor.prototype.combineSectionInternal = function (selection, section, nextSection) {
        // if (section.sectionFormat.isEqualFormat(nextSection.sectionFormat)) {
        // } else {
        var bodyWidget = section.getSplitWidgets()[0];
        var currentSection = [];
        this.combineSectionChild(bodyWidget, currentSection);
        bodyWidget = currentSection[0];
        var lastBlockIndex = bodyWidget.lastChild.index;
        this.updateBlockIndex(lastBlockIndex + 1, nextSection.firstChild);
        var insertIndex = 0;
        var containerWidget = nextSection;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var block = bodyWidget.childWidgets.splice(i, 1)[0];
            containerWidget.childWidgets.splice(insertIndex, 0, block);
            block.containerWidget = containerWidget;
            this.viewer.layout.layoutBodyWidgetCollection(block.index, block.bodyWidget, block, false);
            block = block.getSplitWidgets().pop();
            containerWidget = block.containerWidget;
            insertIndex = block.indexInOwner + 1;
            i--;
        }
        this.updateSectionIndex(undefined, nextSection, false);
        this.addRemovedNodes(bodyWidget);
        // this.insert
        // }
    };
    //tslint:disable:max-line-length
    /**
     * @private
     */
    Editor.prototype.checkAndInsertBlock = function (block, start, end, editAction, previousParagraph) {
        if (block instanceof ParagraphWidget && block === start.paragraph || block instanceof TableWidget) {
            var newParagraph = void 0; //Adds an empty paragraph, to ensure minimal content.
            if (isNullOrUndefined(block.nextWidget) && (isNullOrUndefined(previousParagraph) || previousParagraph.nextRenderedWidget instanceof TableWidget)) {
                newParagraph = new ParagraphWidget();
                if (editAction === 1 && block instanceof ParagraphWidget) {
                    newParagraph.characterFormat.copyFormat(block.characterFormat);
                    newParagraph.paragraphFormat.copyFormat(block.paragraphFormat);
                }
                newParagraph.index = block.index + 1;
                newParagraph.containerWidget = block.containerWidget;
                this.viewer.layout.layoutBodyWidgetCollection(newParagraph.index, newParagraph.bodyWidget, newParagraph, false);
                if (block.containerWidget instanceof Widget) {
                    block.containerWidget.childWidgets.push(newParagraph);
                }
            }
            return newParagraph;
        }
        return undefined;
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.splitParagraph = function (paragraphAdv, startLine, startOffset, endLine, endOffset, removeBlock) {
        var paragraph = new ParagraphWidget();
        paragraph.paragraphFormat = new WParagraphFormat(paragraph);
        paragraph.characterFormat = new WCharacterFormat(paragraph);
        paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
        paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
        var lineWidget = new LineWidget(paragraph);
        paragraph.childWidgets.push(lineWidget);
        var blockIndex = paragraphAdv.index;
        var insertIndex = paragraphAdv.indexInOwner;
        this.moveInlines(paragraphAdv, paragraph, 0, startOffset, startLine, endOffset, endLine);
        //Inserts new paragraph in the current text position.
        paragraphAdv.containerWidget.childWidgets.splice(insertIndex, 0, paragraph);
        paragraph.index = blockIndex;
        paragraph.containerWidget = paragraphAdv.containerWidget;
        this.updateNextBlocksIndex(paragraph, true);
        if (removeBlock) {
            this.removeBlock(paragraphAdv);
        }
        // tslint:disable-next-line:max-line-length
        this.viewer.layout.layoutBodyWidgetCollection(blockIndex, paragraph.containerWidget, paragraph, false);
        return paragraph;
    };
    /**
     * @private
     */
    Editor.prototype.removeBlock = function (block) {
        var index;
        var blockCollection;
        var containerWidget;
        this.removeFieldInBlock(block);
        if (block.isInsideTable) {
            containerWidget = block.associatedCell;
            index = block.associatedCell.childWidgets.indexOf(block);
            blockCollection = block.associatedCell.childWidgets;
            this.updateNextBlocksIndex(block, false);
            block.associatedCell.childWidgets.splice(index, 1);
            block.containerWidget = undefined;
            this.viewer.layout.layoutBodyWidgetCollection(block.index, containerWidget, block, false);
        }
        else {
            containerWidget = block.containerWidget;
            index = containerWidget.childWidgets.indexOf(block);
            blockCollection = containerWidget.childWidgets;
            this.updateNextBlocksIndex(block, false);
            containerWidget.childWidgets.splice(index, 1);
            block.containerWidget = undefined;
            containerWidget.height -= block.height;
            this.viewer.layout.layoutBodyWidgetCollection(block.index, containerWidget, block, false);
        }
    };
    Editor.prototype.removeField = function (block) {
        for (var i = 0; i < this.viewer.fields.length; i++) {
            var field = this.viewer.fields[i];
            if (field.line.paragraph === block) {
                this.viewer.fields.splice(i, 1);
                i--;
            }
        }
    };
    Editor.prototype.addRemovedNodes = function (node) {
        if (node instanceof FieldElementBox && node.fieldType === 0) {
            if (this.viewer.fields.indexOf(node) !== -1) {
                this.viewer.fields.splice(this.viewer.fields.indexOf(node), 1);
            }
        }
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.editorHistory.currentBaseHistoryInfo.removedNodes.push(node);
        }
        else if (this.editHyperlinkInternal) {
            this.nodes.push(node);
        }
    };
    Editor.prototype.deleteBlock = function (block, selection, start, end, editAction) {
        if (block instanceof ParagraphWidget) {
            this.deletePara(block, start, end, editAction);
            if (this.delBlockContinue && this.delBlock) {
                if (this.delSection) {
                    var bodyWidget = block.bodyWidget instanceof BodyWidget ? block.bodyWidget : undefined;
                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                    this.delSection = undefined;
                }
                this.deleteBlock(this.delBlock, selection, start, end, editAction);
                this.delBlockContinue = false;
                this.delBlock = undefined;
            }
        }
        else {
            this.deleteTableBlock(block, selection, start, end, editAction);
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.deleteTableCell = function (cellAdv, selection, start, end, editAction) {
        var deletePreviousBlock = !(start.paragraph.isInsideTable && cellAdv.ownerTable.contains(start.paragraph.associatedCell));
        var previousBlock = cellAdv.ownerTable.previousRenderedWidget;
        if (start.paragraph.isInsideTable) {
            var containerCell = selection.getContainerCellOf(cellAdv, start.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(start.paragraph.associatedCell)) {
                var startCell = selection.getSelectedCell(cellAdv, containerCell);
                var endCell = selection.getSelectedCell(start.paragraph.associatedCell, containerCell);
                if (selection.containsCell(containerCell, start.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (selection.isCellSelected(containerCell, start, end)) {
                        //Container cell is completely selected.
                        this.updateEditPosition(containerCell, selection);
                        if (editAction === 1) {
                            //Specifically handled for backspace. Delete selected cell in current table.
                            this.deleteCellsInTable(cellAdv.ownerRow.ownerTable, selection, start, end, editAction);
                        }
                        else {
                            //Delete contents within table cell or Copy contents within table cell to clipboard.
                            var isCellCleared = this.deleteCell(containerCell, selection, editAction, true);
                            if (!isCellCleared && editAction !== 2 && this.editorHistory) {
                                this.editorHistory.currentBaseHistoryInfo = undefined;
                            }
                            else if (isCellCleared) {
                                this.viewer.layout.reLayoutTable(containerCell.ownerRow.ownerTable);
                            }
                        }
                    }
                    else {
                        if (startCell === containerCell) {
                            this.deletePara(end.paragraph, start, end, editAction);
                            if (this.delBlockContinue && this.delBlock) {
                                if (this.delSection) {
                                    var para = end.paragraph;
                                    var bodyWidget = para.bodyWidget instanceof BodyWidget ? para.bodyWidget : undefined;
                                    this.deleteSection(selection, this.delSection, bodyWidget, editAction);
                                    this.delSection = undefined;
                                }
                                this.deleteBlock(this.delBlock, selection, start, end, editAction);
                                this.delBlockContinue = false;
                                this.delBlock = undefined;
                            }
                        }
                        else {
                            this.deleteContainer(startCell, selection, start, end, editAction);
                        }
                    }
                }
                else {
                    if (editAction === 2) {
                        //Delete contents within table cell.
                        this.deleteCell(cellAdv, selection, 2, false);
                    }
                    else {
                        //Delete other selected cells in current table.
                        this.deleteCellsInTable(containerCell.ownerTable, selection, start, end, editAction);
                    }
                }
            }
            else {
                //Selection end is different table.
                this.deleteContainer(containerCell, selection, start, end, editAction);
            }
        }
        else {
            //Selection end is outside table.
            var cell = selection.getContainerCell(cellAdv);
            this.deleteContainer(cell, selection, start, end, editAction);
        }
        if (deletePreviousBlock) {
            var sectionAdv = previousBlock.bodyWidget instanceof BodyWidget ? previousBlock.bodyWidget : undefined;
            // this.deleteContent(cellAdv.ownerTable, selection, editAction);
            if (!isNullOrUndefined(previousBlock)) {
                // let nextSection: WSection = blockAdv.section instanceof WSection ? blockAdv.section as WSection : undefined;
                // if (sectionAdv !== nextSection) {
                //     this.deleteSection(selection, sectionAdv, nextSection, editAction);
                // }
                //Goto the next block.
                this.deleteBlock(previousBlock, selection, start, end, editAction);
            }
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.deleteCellsInTable = function (table, selection, start, end, editAction) {
        var clonedTable = undefined;
        var isDeleteCells = false;
        var action = 'Delete';
        var startCell = start.paragraph.associatedCell;
        var endCell = end.paragraph.associatedCell;
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            action = this.editorHistory.currentBaseHistoryInfo.action;
            //tslint:disable-next-line:max-line-length
            isDeleteCells = this.editorHistory.currentBaseHistoryInfo.action === 'BackSpace' || this.editorHistory.currentBaseHistoryInfo.action === 'DeleteCells'
                || this.editorHistory.currentBaseHistoryInfo.action === 'InsertTable' || (isNullOrUndefined(startCell.ownerRow.previousWidget)
                && isNullOrUndefined(endCell.ownerRow.nextWidget) && this.editorHistory.currentBaseHistoryInfo.action === 'Cut');
            this.editorHistory.currentBaseHistoryInfo.action = isDeleteCells ? 'DeleteCells' : 'ClearCells';
            clonedTable = this.cloneTableToHistoryInfo(table);
            selection.owner.isLayoutEnabled = false;
        }
        var startColumnIndex = startCell.columnIndex;
        var endColumnIndex = endCell.columnIndex + endCell.cellFormat.columnSpan - 1;
        var startRowIndex = startCell.rowIndex;
        var endRowIndex = endCell.rowIndex;
        var cells = [];
        var isStarted = false;
        var isCellCleared = false;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row.index >= startRowIndex && row.index <= endRowIndex) {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    if (cell.columnIndex >= startColumnIndex && cell.columnIndex <= endColumnIndex) {
                        if (!isStarted) {
                            this.updateEditPosition(cell, selection);
                            isStarted = true;
                        }
                        if (isDeleteCells) {
                            //Specific for Backspace and Cut if selection includes all rows.
                            var cell_1 = row.childWidgets[j];
                            this.updateNextBlocksIndex(cell_1, false);
                            row.childWidgets.splice(j, 1);
                            j--;
                        }
                        else if (editAction < 4) {
                            isCellCleared = this.deleteCell(cell, selection, editAction, false);
                        }
                    }
                }
                if (row.childWidgets.length === 0) {
                    this.updateNextBlocksIndex(table.childWidgets[i], false);
                    table.childWidgets.splice(i, 1);
                    i--;
                    endRowIndex--;
                }
            }
        }
        //Layouts the table after delete cells.
        selection.owner.isLayoutEnabled = true;
        if (table.childWidgets.length === 0) {
            selection.editPosition = this.selection.getHierarchicalIndex(table, '0');
            this.setActionInternal(selection, action);
            this.removeBlock(table);
        }
        else {
            // Before lay outing need to update table grid.
            table.isGridUpdated = false;
            table.buildTableColumns();
            table.isGridUpdated = true;
            this.viewer.layout.reLayoutTable(table);
        }
    };
    Editor.prototype.deleteCell = function (cell, selection, editAction, copyChildToClipboard) {
        //Checks whether this is last paragraph of owner textbody.
        var block = cell.childWidgets[0];
        if (cell.childWidgets.length === 1 && block instanceof ParagraphWidget && block.isEmpty()) {
            return false;
        }
        for (var i = 0; i < cell.childWidgets.length; i++) {
            block = cell.childWidgets[i];
            if (editAction < 4) {
                //Checks whether this is last paragraph of owner textbody.
                if (block instanceof ParagraphWidget && cell.childWidgets.length === 1) {
                    //Preserves empty paragraph, to ensure minimal content.
                    var paragraph = block;
                    //Removes all the inlines in the paragraph.
                    for (var j = 0; j < paragraph.childWidgets.length; j++) {
                        var inline = paragraph.childWidgets[j];
                        for (var k = 0; k < inline.children.length; k++) {
                            var element = inline.children[k];
                            this.unLinkFieldCharacter(element);
                            inline.children.splice(k, 1);
                            // this.layoutInlineCollection(true, paragraph.inlines.indexOf(inline), paragraph.inlines, inline);
                            k--;
                            if (this.checkClearCells(selection)) {
                                this.addRemovedNodes(element);
                            }
                        }
                        if (paragraph.childWidgets.length > 1) {
                            paragraph.childWidgets.splice(j, 1);
                            j--;
                        }
                    }
                    if (this.checkClearCells(selection)) {
                        //Add Index for line Widget
                        selection.editPosition = this.selection.getHierarchicalIndex(paragraph, '0');
                        this.updateHistoryPosition(selection.editPosition, true);
                    }
                    break;
                }
                this.removeBlock(block);
                i--;
                if (this.checkClearCells(selection)) {
                    this.addRemovedNodes(block);
                }
            }
        }
        return true;
    };
    Editor.prototype.deleteContainer = function (cell, selection, start, end, editAction) {
        var ownerTable = cell.ownerTable;
        if (selection.containsRow(ownerTable.lastChild, end.paragraph.associatedCell)) {
            this.deleteContent(ownerTable, selection, editAction);
        }
        else {
            for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                var row = ownerTable.childWidgets[i];
                if (editAction < 4) {
                    this.updateNextBlocksIndex(row, false);
                    ownerTable.childWidgets.splice(i, 1);
                    this.addRemovedNodes(row);
                    i--;
                }
                if (end.paragraph.isInsideTable && selection.containsRow(row, end.paragraph.associatedCell)) {
                    this.viewer.layout.reLayoutTable(ownerTable);
                    return;
                }
            }
        }
    };
    Editor.prototype.deleteTableBlock = function (table, selection, start, end, editAction) {
        table = table.combineWidget(this.viewer);
        if (start.paragraph.isInsideTable && table.contains(start.paragraph.associatedCell)) {
            var block = table.previousRenderedWidget;
            // tslint:disable-next-line:max-line-length
            var previousBlock = this.checkAndInsertBlock(table, start, end, editAction, block instanceof ParagraphWidget ? block : undefined);
            if (selection.containsRow(table.firstChild, start.paragraph.associatedCell)) {
                this.deleteContent(table, selection, editAction);
            }
            else {
                var newTable = this.splitTable(table, start.paragraph.associatedCell.ownerRow);
                this.deleteContent(table, selection, editAction);
                this.viewer.layout.layoutBodyWidgetCollection(newTable.index, newTable.containerWidget, newTable, false);
            }
            if (!isNullOrUndefined(previousBlock)) {
                selection.editPosition = this.selection.getHierarchicalIndex(previousBlock, '0');
                if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                    this.editorHistory.currentBaseHistoryInfo.endPosition = selection.editPosition;
                }
            }
        }
        else {
            var blockAdv = table.previousRenderedWidget;
            var sectionAdv = table.bodyWidget instanceof BodyWidget ? table.bodyWidget : undefined;
            this.deleteContent(table, selection, editAction);
            if (!isNullOrUndefined(blockAdv)) {
                // let nextSection: WSection = blockAdv.section instanceof WSection ? blockAdv.section as WSection : undefined;
                // if (sectionAdv !== nextSection) {
                //     this.deleteSection(selection, sectionAdv, nextSection, editAction);
                // }
                //Goto the next block.
                this.deleteBlock(blockAdv, selection, start, end, editAction);
            }
        }
    };
    Editor.prototype.splitTable = function (table, splitEndRow) {
        var newTable = new TableWidget();
        newTable.tableFormat.copyFormat(table.tableFormat);
        newTable.index = table.index;
        //Moves the rows to new table.
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row === splitEndRow) {
                break;
            }
            newTable.childWidgets.push(row);
            row.containerWidget = newTable;
            table.childWidgets.splice(i, 1);
            i--;
        }
        //Inserts new table in the current text position.
        var insertIndex = table.getIndex();
        table.containerWidget.childWidgets.splice(insertIndex, 0, newTable);
        newTable.containerWidget = table.containerWidget;
        this.updateNextBlocksIndex(newTable, true);
        return newTable;
    };
    Editor.prototype.updateEditPosition = function (cell, selection) {
        var firstParagraph = selection.getFirstParagraphInCell(cell);
        selection.editPosition = this.selection.getHierarchicalIndex(firstParagraph, '0');
    };
    /**
     * @private
     */
    Editor.prototype.deleteContent = function (table, selection, editAction) {
        if (editAction < 4) {
            this.removeBlock(table);
            this.addRemovedNodes(table);
        }
    };
    Editor.prototype.setActionInternal = function (selection, action) {
        if (this.viewer.owner.enableHistoryMode && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.editorHistory.currentBaseHistoryInfo.action = action;
        }
    };
    Editor.prototype.checkClearCells = function (selection) {
        // tslint:disable-next-line:max-line-length
        return this.editorHistory && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action !== 'ClearCells';
    };
    Editor.prototype.isEndInAdjacentTable = function (paragraph, endParagraph) {
        var start = this.selection.getHierarchicalIndex(paragraph, '');
        var end = this.selection.getHierarchicalIndex(endParagraph, '');
        var selectionStart = start.split(';');
        var selectionEnd = end.split(';');
        return selectionStart.length < selectionEnd.length;
    };
    Editor.prototype.cloneTableToHistoryInfo = function (table) {
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            //Clones the entire table to preserve in history.
            var clonedTable = table.clone();
            //Preserves the cloned table in history info, for future undo operation.
            this.editorHistory.currentBaseHistoryInfo.removedNodes.push(clonedTable);
            //Sets the insert position in history info as current table.
            if (this.viewer.selection.start.paragraph.isInsideTable &&
                this.viewer.selection.start.paragraph.associatedCell.ownerTable === table) {
                this.updateHistoryPosition(this.selection.getHierarchicalIndex(table, '0'), true);
            }
            return clonedTable;
        }
        return undefined;
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.insertParagraphPaste = function (paragraph, currentParagraph, start, end, isCombineNextParagraph, editAction) {
        if (this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing) && this.editorHistory.currentBaseHistoryInfo.action === 'Paste') {
            var nextParagraph = this.selection.getNextParagraphBlock(currentParagraph);
            if (nextParagraph) {
                if (start.offset > 0 && nextParagraph === end.paragraph && paragraph === start.paragraph
                    && this.editorHistory.currentBaseHistoryInfo.action === 'Paste') {
                    //Combines the current paragraph with end paragraph specific for undo/redo paste action.
                    var insertIndex = 0;
                    this.removeBlock(currentParagraph);
                    this.viewer.layout.clearListElementBox(nextParagraph);
                    this.viewer.layout.clearListElementBox(currentParagraph);
                    for (var i = 0; i < currentParagraph.childWidgets.length; i++) {
                        var line = currentParagraph.childWidgets[i];
                        nextParagraph.childWidgets.splice(insertIndex, 0, line);
                        currentParagraph.childWidgets.splice(i, 1);
                        i--;
                        insertIndex++;
                        line.paragraph = nextParagraph;
                    }
                    this.viewer.layout.reLayoutParagraph(nextParagraph, 0, 0);
                    isCombineNextParagraph = false;
                    var offset = this.selection.editPosition.substring(this.selection.editPosition.lastIndexOf(';') + 1);
                    this.selection.editPosition = this.selection.getHierarchicalIndex(nextParagraph, offset);
                }
            }
        }
        if (isCombineNextParagraph) {
            this.deleteParagraphMark(currentParagraph, this.selection, editAction);
        }
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.removeInlines = function (paragraph, startLine, startOffset, endLine, endOffset, editAction) {
        var isRemoved = false;
        this.viewer.layout.clearListElementBox(paragraph);
        var startIndex = paragraph.childWidgets.indexOf(startLine);
        for (var i = paragraph.childWidgets.length - 1; i >= 0; i--) {
            var lineWidget = paragraph.childWidgets[i];
            if (startLine === lineWidget && endLine === lineWidget) {
                this.removeContent(lineWidget, startOffset, endOffset);
                isRemoved = true;
                break;
            }
            if (endLine === lineWidget) {
                isRemoved = true;
                this.removeContent(lineWidget, 0, endOffset);
            }
            else if (startLine === lineWidget) {
                this.removeContent(lineWidget, startOffset, this.viewer.selection.getLineLength(lineWidget));
                break;
            }
            else if (isRemoved) {
                this.removeContent(lineWidget, 0, this.viewer.selection.getLineLength(lineWidget));
            }
        }
        if (isRemoved) {
            this.removeEmptyLine(paragraph);
            this.viewer.layout.reLayoutParagraph(paragraph, 0, 0);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeContent = function (lineWidget, startOffset, endOffset) {
        var count = this.selection.getLineLength(lineWidget);
        var isBidi = lineWidget.paragraph.paragraphFormat.bidi;
        var childLength = lineWidget.children.length;
        for (var i = isBidi ? 0 : childLength - 1; isBidi ? i < childLength : i >= 0; isBidi ? i++ : i--) {
            var inline = lineWidget.children[i];
            if (endOffset <= count - inline.length) {
                count -= inline.length;
                continue;
            }
            var endIndex = inline.length;
            if (count > endOffset && (count - endIndex < endOffset)) {
                endIndex = endOffset - (count - inline.length);
            }
            var startIndex = 0;
            if (count - inline.length < startOffset) {
                startIndex = startOffset - (count - inline.length);
            }
            if (count > endOffset) {
                count -= (inline.length - endIndex);
            }
            if (startIndex === 0 && endIndex === inline.length) {
                if (!(this.editorHistory && (this.editorHistory.isUndoing || this.editorHistory.isRedoing))) {
                    if (inline instanceof BookmarkElementBox) {
                        this.removedBookmarkElements.push(inline);
                    }
                }
                // if (editAction < 4) {
                this.unLinkFieldCharacter(inline);
                this.addRemovedNodes(lineWidget.children[i]);
                lineWidget.children.splice(i, 1);
                // }
            }
            else if (inline instanceof TextElementBox) {
                // if (editAction < 4) {
                var span = new TextElementBox();
                span.characterFormat.copyFormat(inline.characterFormat);
                span.text = inline.text.substr(startIndex, endIndex - startIndex);
                this.addRemovedNodes(span);
                inline.text = inline.text.slice(0, startIndex) + inline.text.slice(endIndex);
            }
            if (startOffset >= count - (endIndex - startIndex)) {
                break;
            }
            count -= (endIndex - startIndex);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeEmptyLine = function (paragraph) {
        if (paragraph.childWidgets.length > 1) {
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var lineWidget = paragraph.childWidgets[i];
                if (lineWidget.children.length === 0 && paragraph.childWidgets.length > 1) {
                    paragraph.childWidgets.splice(i, 1);
                    i--;
                }
            }
        }
    };
    //#endregion
    /**
     * clone the list level
     * @param  {WListLevel} source
     * @private
     */
    Editor.prototype.cloneListLevel = function (source) {
        var listLevel = new WListLevel(undefined);
        this.copyListLevel(listLevel, source);
        return listLevel;
    };
    /**
     * Copies the list level
     * @param  {WListLevel} destination
     * @param  {WListLevel} listLevel
     * @private
     */
    Editor.prototype.copyListLevel = function (destination, listLevel) {
        if (!isNullOrUndefined(listLevel.paragraphFormat)) {
            destination.paragraphFormat = new WParagraphFormat(destination);
            destination.paragraphFormat.copyFormat(listLevel.paragraphFormat);
        }
        if (!isNullOrUndefined(listLevel.characterFormat)) {
            destination.characterFormat = new WCharacterFormat(destination);
            destination.characterFormat.copyFormat(listLevel.characterFormat);
        }
        if (!isNullOrUndefined(listLevel.followCharacter)) {
            destination.followCharacter = listLevel.followCharacter;
        }
        if (!isNullOrUndefined(listLevel.listLevelPattern)) {
            destination.listLevelPattern = listLevel.listLevelPattern;
        }
        if (!isNullOrUndefined(listLevel.numberFormat)) {
            destination.numberFormat = listLevel.numberFormat;
        }
        if (!isNullOrUndefined(listLevel.restartLevel)) {
            destination.restartLevel = listLevel.restartLevel;
        }
        if (!isNullOrUndefined(listLevel.startAt)) {
            destination.startAt = listLevel.startAt;
        }
    };
    /**
     * Clone level override
     * @param  {WLevelOverride} source
     * @private
     */
    Editor.prototype.cloneLevelOverride = function (source) {
        var levelOverride = new WLevelOverride();
        if (!isNullOrUndefined(source.startAt)) {
            levelOverride.startAt = source.startAt;
        }
        if (!isNullOrUndefined(source.overrideListLevel)) {
            levelOverride.overrideListLevel = source.overrideListLevel;
        }
        if (!isNullOrUndefined(source.levelNumber)) {
            levelOverride.levelNumber = source.levelNumber;
        }
        return levelOverride;
    };
    /**
     * Update List Paragraph
     * @private
     */
    Editor.prototype.updateListParagraphs = function () {
        this.viewer.listParagraphs = [];
        for (var j = 0; j < this.viewer.pages.length; j++) {
            var bodyWidget = this.viewer.pages[j].bodyWidgets[0];
            for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
                this.updateListParagraphsInBlock(bodyWidget.childWidgets[i]);
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.updateListParagraphsInBlock = function (block) {
        if (block instanceof ParagraphWidget) {
            if (!isNullOrUndefined(block.paragraphFormat)
                && !isNullOrUndefined(block.paragraphFormat.listFormat)
                && !isNullOrUndefined(block.paragraphFormat.listFormat.listId)) {
                if (isNullOrUndefined(this.viewer.listParagraphs)) {
                    this.viewer.listParagraphs = [];
                }
                this.viewer.listParagraphs.push(block);
            }
        }
        else if (block instanceof TableWidget) {
            for (var i = 0; i < block.childWidgets.length; i++) {
                for (var j = 0; j < block.childWidgets[i].childWidgets.length; j++) {
                    var cell = block.childWidgets[i].childWidgets[j];
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        this.updateListParagraphsInBlock(cell.childWidgets[k]);
                    }
                }
            }
        }
    };
    /**
     * Applies list format
     * @param  {WList} list
     * @private
     */
    Editor.prototype.onApplyList = function (list) {
        var selection = this.viewer.selection;
        this.setOffsetValue(this.viewer.selection);
        this.initHistory('ListFormat');
        var format = new WListFormat();
        if (!isNullOrUndefined(list)) {
            format.listId = list.listId;
        }
        this.viewer.owner.isShiftingEnabled = true;
        if (selection.isEmpty) {
            this.applyParaFormatProperty(selection.start.paragraph, 'listFormat', format, false);
            this.layoutItemBlock(selection.start.paragraph, false);
        }
        else {
            this.updateSelectionParagraphFormatting('listFormat', format, false);
        }
        this.reLayout(selection);
    };
    /**
     * Applies bullets or numbering list
     * @param  {string} format
     * @param  {ListLevelPattern} listLevelPattern
     * @param  {string} fontFamily
     * @private
     */
    Editor.prototype.applyBulletOrNumbering = function (format, listLevelPattern, fontFamily) {
        var selection = this.viewer.selection;
        var list = selection.paragraphFormat.getList();
        var isUpdate = false;
        var start = selection.start;
        if (!selection.isForward) {
            start = selection.end;
        }
        var currentParagraph = start.paragraph;
        if (isNullOrUndefined(list)) {
            while (!isNullOrUndefined(currentParagraph.previousWidget) && currentParagraph.previousWidget instanceof ParagraphWidget
                && currentParagraph.previousWidget.isEmpty() && currentParagraph.previousWidget.paragraphFormat.listFormat.listId === -1) {
                currentParagraph = currentParagraph.previousWidget;
            }
            if (currentParagraph.previousWidget && currentParagraph.previousWidget instanceof ParagraphWidget
                && currentParagraph.previousWidget.paragraphFormat.listFormat.listId !== -1) {
                currentParagraph = currentParagraph.previousWidget;
                list = this.viewer.getListById(currentParagraph.paragraphFormat.listFormat.listId);
                isUpdate = true;
            }
        }
        var startListLevel = undefined;
        if (!isNullOrUndefined(list)) {
            var tempList = this.viewer.getListById(currentParagraph.paragraphFormat.listFormat.listId);
            startListLevel = this.viewer.layout.getListLevel(tempList, currentParagraph.paragraphFormat.listFormat.listLevelNumber);
        }
        if (isNullOrUndefined(list) || (!isNullOrUndefined(list) && ((startListLevel.listLevelPattern !== listLevelPattern) ||
            startListLevel.numberFormat !== format || (startListLevel.characterFormat.fontFamily !== fontFamily
            && startListLevel.listLevelPattern === 'Bullet')))) {
            isUpdate = false;
            list = new WList();
            if (this.viewer.lists.length > 0) {
                list.listId = this.viewer.lists[this.viewer.lists.length - 1].listId + 1;
            }
            else {
                list.listId = 0;
            }
            var abstractList = new WAbstractList();
            if (this.viewer.abstractLists.length > 0) {
                abstractList.abstractListId = this.viewer.abstractLists[this.viewer.abstractLists.length - 1].abstractListId + 1;
            }
            else {
                abstractList.abstractListId = 0;
            }
            list.abstractListId = abstractList.abstractListId;
            list.abstractList = abstractList;
            this.viewer.abstractLists.push(abstractList);
            if (format === 'bullet' || format === 'multiLevel' || format === 'numbering') {
                this.addListLevels(abstractList, format, selection);
            }
            else {
                var listLevel = new WListLevel(abstractList);
                listLevel.listLevelPattern = listLevelPattern;
                listLevel.numberFormat = format;
                if (listLevelPattern !== 'Bullet') {
                    listLevel.startAt = 1;
                }
                else {
                    listLevel.characterFormat.fontFamily = fontFamily;
                }
                listLevel.paragraphFormat.leftIndent = 36;
                listLevel.paragraphFormat.firstLineIndent = -18;
                abstractList.levels.push(listLevel);
                selection.paragraphFormat.listLevelNumber = 0;
            }
            selection.paragraphFormat.setList(list);
        }
        else if (!isNullOrUndefined(list) && isUpdate) {
            selection.paragraphFormat.setList(list);
        }
        else {
            selection.paragraphFormat.setList(undefined);
        }
    };
    Editor.prototype.addListLevels = function (abstractListAdv, listName, selection) {
        var bulletCharacters = ['\uf076', '\uf0d8', '\uf0a7', '\uf0b7', '\uf0a8'];
        for (var i = abstractListAdv.levels.length; i < 9; i++) {
            var listLevel = new WListLevel(abstractListAdv);
            if (listName.match('bullet')) {
                listLevel.listLevelPattern = 'Bullet';
                listLevel.numberFormat = bulletCharacters[i < 5 ? i % 5 : i % 5 + 1];
                listLevel.characterFormat.fontFamily = i < 3 || i === 5 ? 'Wingdings' : 'Symbol';
            }
            else {
                if (listName.match('multiLevel')) {
                    for (var j = 0; j < i + 1; j++) {
                        listLevel.numberFormat += '%' + (j + 1).toString() + '.';
                    }
                    listLevel.listLevelPattern = 'Number';
                }
                else {
                    listLevel.numberFormat = '%' + (i + 1).toString() + ')';
                    listLevel.listLevelPattern = i % 3 === 0 ? 'Number'
                        : i % 3 === 1 ? 'LowLetter' : 'LowRoman';
                }
                listLevel.startAt = 1;
                listLevel.restartLevel = i;
            }
            if (i === 0) {
                listLevel.paragraphFormat.leftIndent = 36;
            }
            else {
                listLevel.paragraphFormat.leftIndent = 36 * i;
            }
            listLevel.paragraphFormat.firstLineIndent = -18;
            abstractListAdv.levels.push(listLevel);
            selection.paragraphFormat.listLevelNumber = i;
        }
    };
    /**
     * Insert page break at cursor position
     */
    Editor.prototype.insertPageBreak = function () {
        if (!this.owner.isReadOnlyMode) {
            if (this.viewer.selection.start.paragraph.isInsideTable ||
                this.viewer.selection.start.paragraph.isInHeaderFooter) {
                return;
            }
            this.initComplexHistory('PageBreak');
            this.onEnter(true);
            if (this.editorHistory && this.editorHistory.currentHistoryInfo != null) {
                this.editorHistory.updateComplexHistory();
            }
            this.selection.checkForCursorVisibility();
        }
    };
    /**
     * @private
     */
    Editor.prototype.onEnter = function (isInsertPageBreak) {
        var selection = this.viewer.selection;
        if (selection.isEmpty) {
            //ToDo: Need to handle the CTRL + Enter (Page Break) and SHIFT + Enter (Line Break) behavior.
            var hyperlinkField = selection.getHyperlinkField();
            var isSelectionOnHyperlink = !isNullOrUndefined(hyperlinkField);
            if (isSelectionOnHyperlink) {
                selection.fireRequestNavigate(hyperlinkField);
                return;
            }
            var paragraph = selection.start.paragraph;
            if (paragraph.isEmpty() && paragraph.paragraphFormat.listFormat.listId !== -1) {
                // tslint:disable-next-line:max-line-length
                this.onApplyListInternal(this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId), paragraph.paragraphFormat.listFormat.listLevelNumber - 1);
                return;
            }
        }
        this.initHistory('Enter');
        var isRemoved = true;
        if (!selection.isEmpty) {
            // this.initHistoryWithSelection(selection, 'Enter');
            isRemoved = this.removeSelectedContents(selection);
        }
        if (isRemoved) {
            selection.owner.isShiftingEnabled = true;
            this.updateInsertPosition();
            var blockInfo = this.selection.getParagraphInfo(selection.start);
            var initialStart = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            this.splitParagraphInternal(selection, selection.start.paragraph, selection.start.currentWidget, selection.start.offset);
            this.setPositionForCurrentIndex(selection.start, initialStart);
            if (isInsertPageBreak) {
                var currentParagraph = selection.start.paragraph;
                var breakParagraph = new ParagraphWidget();
                breakParagraph.characterFormat.copyFormat(currentParagraph.characterFormat);
                breakParagraph.paragraphFormat.copyFormat(currentParagraph.paragraphFormat);
                var pageBreak = new TextElementBox();
                pageBreak.text = '\f';
                var line = new LineWidget(breakParagraph);
                line.children.push(pageBreak);
                pageBreak.line = line;
                breakParagraph.childWidgets.push(line);
                this.insertParagraph(breakParagraph, true);
                selection.selectParagraphInternal(breakParagraph, true);
            }
            var nextNode = selection.start.paragraph.nextWidget;
            if (isNullOrUndefined(nextNode)) {
                nextNode = selection.getNextRenderedBlock(selection.start.paragraph);
            }
            selection.selectParagraphInternal(nextNode, true);
            this.updateEndPosition();
            if (isInsertPageBreak && this.editorHistory) {
                this.owner.editorHistory.updateHistory();
            }
            // if (!isNullOrUndefined(selection.currentHistoryInfo)) {
            //     this.updateComplexHistory();
            // } else {
            this.reLayout(selection);
            // tslint:disable-next-line:max-line-length
            var currentPara = this.selection.start.paragraph.containerWidget.firstChild;
            if (!isNullOrUndefined(currentPara)) {
                currentPara.isChangeDetected = false;
                var nextPara = currentPara.nextRenderedWidget;
                // tslint:disable-next-line:max-line-length
                while (this.owner.enableSpellCheck && !isNullOrUndefined(nextPara)) {
                    currentPara = nextPara;
                    currentPara.isChangeDetected = false;
                    nextPara = currentPara.nextRenderedWidget;
                }
            }
            // }
            var paragraph = selection.start.paragraph.previousWidget;
            if (!isNullOrUndefined(paragraph) && !paragraph.isEmpty() &&
                // tslint:disable-next-line:max-line-length
                paragraph.lastChild.children[paragraph.lastChild.children.length - 1] instanceof TextElementBox) {
                this.checkAndConvertToHyperlink(selection, true, paragraph);
            }
        }
    };
    Editor.prototype.splitParagraphInternal = function (selection, paragraphAdv, currentLine, offset) {
        var insertIndex = 0;
        var blockIndex = paragraphAdv.index;
        var currentPara = paragraphAdv;
        currentPara.isChangeDetected = (offset === 0) ? true : false;
        while (this.owner.enableSpellCheck && !isNullOrUndefined(currentPara.nextRenderedWidget)) {
            currentPara = currentPara.nextRenderedWidget;
            currentPara.isChangeDetected = true;
        }
        var paragraph = new ParagraphWidget();
        var lineWidget = new LineWidget(paragraph);
        paragraph.childWidgets.push(lineWidget);
        //Copies the format to new paragraph.
        paragraph.paragraphFormat.ownerBase = paragraph;
        if (currentLine === paragraphAdv.lastChild && offset === selection.getLineLength(currentLine)) {
            // tslint:disable-next-line:max-line-length
            if (paragraphAdv.paragraphFormat.baseStyle
                && paragraphAdv.paragraphFormat.baseStyle.name !== 'Normal' && paragraphAdv.paragraphFormat.baseStyle.next instanceof WParagraphStyle) {
                if (paragraphAdv.paragraphFormat.baseStyle.name === paragraphAdv.paragraphFormat.baseStyle.next.name) {
                    paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
                    paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
                }
                else {
                    paragraph.paragraphFormat.baseStyle = paragraphAdv.paragraphFormat.baseStyle.next;
                }
                this.selection.skipFormatRetrieval = false;
            }
            else {
                paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
                paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
            }
            //ToDo in future: Need to skip copying formattings to new paragraph, if the style for following paragraph is same style.
            insertIndex++;
            blockIndex++;
        }
        else {
            paragraph.paragraphFormat.copyFormat(paragraphAdv.paragraphFormat);
            paragraph.characterFormat.copyFormat(paragraphAdv.characterFormat);
            if (offset > 0 || !currentLine.isFirstLine()) {
                paragraphAdv = paragraphAdv.combineWidget(this.viewer);
                this.moveInlines(paragraphAdv, paragraph, 0, 0, paragraphAdv.firstChild, offset, currentLine);
            }
            paragraphAdv = paragraphAdv.getSplitWidgets()[0];
        }
        insertIndex += paragraphAdv.getIndex();
        var container = paragraphAdv.containerWidget;
        var childNodes = container.childWidgets;
        childNodes.splice(insertIndex, 0, paragraph);
        paragraph.containerWidget = container;
        paragraph.index = blockIndex;
        this.updateNextBlocksIndex(paragraph, true);
        // tslint:disable-next-line:max-line-length
        this.viewer.layout.layoutBodyWidgetCollection(blockIndex, container, paragraph, false);
    };
    /**
     * @private
     */
    Editor.prototype.updateNextBlocksIndex = function (block, increaseIndex) {
        var nextIndex = block.containerWidget.childWidgets.indexOf(block) + 1;
        if (block.containerWidget instanceof BodyWidget) {
            var currentSectionIndex = block.containerWidget.index;
            for (var j = this.viewer.pages.indexOf(block.containerWidget.page); j < this.viewer.pages.length; j++) {
                var page = this.viewer.pages[j];
                if (page.bodyWidgets[0].index === currentSectionIndex) {
                    for (var k = nextIndex; k < page.bodyWidgets[0].childWidgets.length; k++) {
                        var childWidget = page.bodyWidgets[0].childWidgets[k];
                        this.updateIndex(childWidget, increaseIndex);
                    }
                    nextIndex = 0;
                }
                else {
                    return;
                }
            }
        }
        else if (block.containerWidget instanceof TableCellWidget) {
            var cells = block.containerWidget.getSplitWidgets();
            var currentCellIndex = cells.indexOf(block.containerWidget);
            for (var x = currentCellIndex; x < cells.length; x++) {
                var blocks = cells[x].childWidgets;
                for (var y = nextIndex; y < blocks.length; y++) {
                    this.updateIndex(blocks[y], increaseIndex);
                }
                currentCellIndex = 0;
                nextIndex = 0;
            }
        }
        else if (block.containerWidget instanceof TableRowWidget) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var cell = block.containerWidget.childWidgets[i];
                if (cell.rowIndex === block.containerWidget.index) {
                    this.updateIndex(cell, increaseIndex);
                }
            }
        }
        else if (block.containerWidget instanceof TableWidget) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var row = block.containerWidget.childWidgets[i];
                this.updateIndex(row, increaseIndex);
                for (var j = 0; j < row.childWidgets.length; j++) {
                    row.childWidgets[j].rowIndex = row.index;
                }
            }
            //update Row index of all the cell
        }
        else if (block.containerWidget instanceof HeaderFooterWidget) {
            for (var i = nextIndex; i < block.containerWidget.childWidgets.length; i++) {
                var nextBlock = block.containerWidget.childWidgets[i];
                this.updateIndex(nextBlock, increaseIndex);
            }
        }
    };
    Editor.prototype.updateIndex = function (widget, increment) {
        if (increment) {
            widget.index++;
        }
        else {
            widget.index--;
        }
    };
    Editor.prototype.updateEndPosition = function () {
        var selection = this.viewer.selection;
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            this.updateHistoryPosition(selection.start, false);
        }
    };
    /**
     * @private
     */
    Editor.prototype.onBackSpace = function () {
        this.removeEditRange = true;
        var selection = this.viewer.selection;
        this.viewer.triggerSpellCheck = true;
        if (selection.isEmpty) {
            this.singleBackspace(selection, false);
        }
        else {
            this.initHistory('BackSpace');
            var skipBackSpace = this.deleteSelectedContents(selection, true);
            if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                if (skipBackSpace) {
                    this.editorHistory.currentBaseHistoryInfo = undefined;
                }
                else {
                    if (this.checkEndPosition(selection)) {
                        this.updateHistoryPosition(selection.end, false);
                    }
                    this.reLayout(selection);
                }
            }
            this.viewer.triggerSpellCheck = false;
        }
        this.removeEditRange = false;
    };
    /**
     * @private
     */
    Editor.prototype.insertRemoveBookMarkElements = function () {
        var isHandledComplexHistory = false;
        for (var i = 0; i < this.removedBookmarkElements.length; i++) {
            var bookMark = this.removedBookmarkElements[i];
            if (bookMark.bookmarkType === 0) {
                var bookMarkStart = bookMark;
                if (bookMarkStart && bookMarkStart.reference && this.removedBookmarkElements.indexOf(bookMarkStart.reference) !== -1) {
                    var endIndex = this.removedBookmarkElements.indexOf(bookMarkStart.reference);
                    var startIndex = this.removedBookmarkElements.indexOf(bookMarkStart);
                    this.removedBookmarkElements.splice(endIndex, 1);
                    this.removedBookmarkElements.splice(startIndex, 1);
                }
                else {
                    if (this.editorHistory.currentBaseHistoryInfo) {
                        this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                        this.editorHistory.updateHistory();
                    }
                    this.initInsertInline(bookMarkStart.clone());
                    if (this.editorHistory.currentHistoryInfo) {
                        this.editorHistory.updateComplexHistory();
                        isHandledComplexHistory = true;
                    }
                }
            }
            else {
                var bookMarkEnd = bookMark;
                if (bookMarkEnd && bookMarkEnd.reference && this.removedBookmarkElements.indexOf(bookMarkEnd.reference) !== -1) {
                    var endIndex = this.removedBookmarkElements.indexOf(bookMarkEnd.reference);
                    var startIndex = this.removedBookmarkElements.indexOf(bookMarkEnd);
                    this.removedBookmarkElements.splice(endIndex, 1);
                    this.removedBookmarkElements.splice(startIndex, 1);
                }
                else {
                    if (this.editorHistory.currentBaseHistoryInfo) {
                        this.initComplexHistory(this.editorHistory.currentBaseHistoryInfo.action);
                        this.editorHistory.updateHistory();
                    }
                    this.initInsertInline(bookMarkEnd.clone());
                    if (this.editorHistory.currentHistoryInfo) {
                        this.editorHistory.updateComplexHistory();
                        isHandledComplexHistory = true;
                    }
                }
            }
        }
        this.removedBookmarkElements = [];
        return isHandledComplexHistory;
    };
    /**
     * @private
     */
    Editor.prototype.deleteSelectedContents = function (selection, isBackSpace) {
        var skipBackSpace = this.deleteSelectedContentInternal(selection, isBackSpace, selection.start, selection.end);
        var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
        selection.selectContent(textPosition, true);
        return skipBackSpace;
    };
    Editor.prototype.removeWholeElement = function (selection) {
        this.initHistory('BackSpace');
        this.deleteSelectedContents(selection, true);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.end, false);
        }
        this.reLayout(selection);
    };
    /**
     * @private
     */
    Editor.prototype.singleBackspace = function (selection, isRedoing) {
        var history = this.editorHistory;
        // If backspace is pressed after auto format to hyperlink is done, need to undo auto format.
        if (history && !isRedoing && !history.canRedo() && history.canUndo()) {
            var historyInfo = history.undoStack[history.undoStack.length - 1];
            var startBlockInfo = this.selection.getParagraphInfo(selection.start);
            var endBlockInfo = this.selection.getParagraphInfo(selection.end);
            // tslint:disable-next-line:max-line-length
            if (historyInfo.action === 'AutoFormatHyperlink' && historyInfo.insertPosition === this.selection.getHierarchicalIndex(startBlockInfo.paragraph, startBlockInfo.offset.toString()) &&
                historyInfo.endPosition === this.selection.getHierarchicalIndex(endBlockInfo.paragraph, endBlockInfo.offset.toString())) {
                history.undo();
                return;
            }
        }
        var paragraph = selection.start.paragraph;
        var currentLineWidget = selection.start.currentWidget;
        var offset = selection.start.offset;
        var indexInInline = 0;
        var inlineObj = currentLineWidget.getInline(offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        if (inline instanceof TextElementBox) {
            inline.ignoreOnceItems = [];
        }
        if (inline instanceof TextElementBox) {
            inline.ignoreOnceItems = [];
        }
        var previousInline = inline;
        if (inline instanceof FieldElementBox && inline.fieldType === 2) {
            if (HelperMethods.isLinkedFieldCharacter(inline)) {
                var begin = inline.fieldBegin;
                var end = inline.fieldEnd;
                selection.start.setPositionParagraph(begin.line, begin.line.getOffset(begin, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                selection.fireSelectionChanged(true);
                return;
            }
        }
        if (inline instanceof FieldElementBox && inline.fieldType === 1) {
            var prevInline = selection.getPreviousValidElement(inline);
            if (prevInline instanceof FieldElementBox) {
                inline = prevInline.fieldBegin;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                selection.end.setPositionParagraph(inline.line, offset); //Selects the entire field.
                selection.fireSelectionChanged(true);
                return;
            }
            else if (prevInline !== inline) {
                inline = prevInline; //Updates the offset to delete next content.
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, inline.length);
            }
        }
        if (inline instanceof EditRangeStartElementBox || inline instanceof EditRangeEndElementBox) {
            if ((inline.nextNode instanceof EditRangeEndElementBox && inline.editRangeEnd === inline.nextNode)
                || (inline.previousNode instanceof EditRangeStartElementBox
                    && inline.editRangeStart === inline.previousNode)) {
                return;
            }
            if (inline instanceof EditRangeStartElementBox && !(inline.previousNode instanceof EditRangeEndElementBox)) {
                return;
            }
            if (inline instanceof EditRangeEndElementBox) {
                inline = inline.previousNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, inline.length);
            }
            if (inline.length === 1 && inline.nextNode instanceof EditRangeEndElementBox
                && inline.previousNode instanceof EditRangeStartElementBox) {
                var start = inline.previousNode;
                var end = inline.nextNode;
                selection.start.setPositionParagraph(start.line, start.line.getOffset(start, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                this.removeWholeElement(selection);
                return;
            }
        }
        if (inline && (inline instanceof BookmarkElementBox && inline.bookmarkType === 1
            || inline.previousNode instanceof BookmarkElementBox)) {
            if (inline instanceof BookmarkElementBox) {
                inline = inline.previousNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, inline.length);
            }
            if (inline.length === 1 && inline.nextNode instanceof BookmarkElementBox && inline.previousNode instanceof BookmarkElementBox) {
                var begin = inline.previousNode;
                var end = inline.nextNode;
                selection.start.setPositionParagraph(begin.line, begin.line.getOffset(begin, 0));
                selection.end.setPositionParagraph(end.line, end.line.getOffset(end, 0) + 1);
                this.removeWholeElement(selection);
                return;
            }
        }
        if (!isRedoing) {
            this.initHistory('BackSpace');
        }
        if (offset === selection.getStartOffset(paragraph) && selection.start.currentWidget.isFirstLine()) {
            if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
                this.onApplyList(undefined);
                return;
            }
            if (paragraph.paragraphFormat.firstLineIndent !== 0) {
                this.onApplyParagraphFormat('firstLineIndent', 0, false, false);
                return;
            }
            if (paragraph.paragraphFormat.leftIndent !== 0) {
                this.onApplyParagraphFormat('leftIndent', 0, false, false);
                return;
            }
            if (paragraph.paragraphFormat.textAlignment !== 'Left') {
                this.onApplyParagraphFormat('textAlignment', 'Left', false, true);
                return;
            }
            if (paragraph.previousRenderedWidget instanceof ParagraphWidget) {
                selection.owner.isShiftingEnabled = true;
                var previousParagraph = paragraph.previousRenderedWidget;
                // if (isNullOrUndefined(previousParagraph)) {
                //     previousParagraph = this.viewer.selection.getPreviousBlock(paragraph) as ParagraphWidget;
                // }
                if (previousParagraph.isEmpty()) {
                    this.removeBlock(previousParagraph);
                    this.addRemovedNodes(previousParagraph);
                }
                else {
                    this.removeBlock(paragraph);
                    var endOffset = this.viewer.selection.getLineLength(previousParagraph.lastChild);
                    var previousIndex = previousParagraph.childWidgets.length - 1;
                    var lineWidget = void 0;
                    if (!paragraph.isEmpty()) {
                        for (var i = 0; i < paragraph.childWidgets.length; i++) {
                            lineWidget = paragraph.childWidgets[i];
                            previousParagraph.childWidgets.push(lineWidget);
                            paragraph.childWidgets.splice(i, 1);
                            i--;
                            lineWidget.paragraph = previousParagraph;
                        }
                    }
                    this.viewer.layout.reLayoutParagraph(previousParagraph, previousIndex, 0);
                    selection.selects(previousParagraph.childWidgets[previousIndex], endOffset, true);
                    this.addRemovedNodes(paragraph);
                }
                this.setPositionForHistory();
                // if (!isRedoing) {
                this.reLayout(selection);
                // }
            }
            else {
                if (this.editorHistory) {
                    this.editorHistory.currentBaseHistoryInfo = undefined;
                }
            }
        }
        else {
            if (!isRedoing) {
                selection.owner.isShiftingEnabled = true;
            }
            var paragraphInfo = this.selection.getParagraphInfo(selection.start);
            var lineWidget = selection.start.currentWidget;
            var removeOffset = offset - 1;
            if (removeOffset < 0) {
                lineWidget = lineWidget.previousLine;
                removeOffset = this.viewer.selection.getLineLength(lineWidget) + removeOffset;
            }
            this.removeAtOffset(lineWidget, selection, removeOffset);
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset - 1, false);
            this.setPositionForHistory();
            if (!isRedoing) {
                this.reLayout(selection);
            }
            else {
                this.fireContentChange();
            }
        }
    };
    Editor.prototype.setPositionForHistory = function (editPosition) {
        var selection = this.viewer.selection;
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            if (isNullOrUndefined(editPosition)) {
                this.updateHistoryPosition(selection.start, true);
                this.editorHistory.currentBaseHistoryInfo.endPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
            }
            else {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = editPosition;
                this.editorHistory.currentBaseHistoryInfo.endPosition = editPosition;
            }
        }
    };
    Editor.prototype.removeAtOffset = function (lineWidget, selection, offset) {
        var count = 0;
        var lineIndex = lineWidget.paragraph.childWidgets.indexOf(lineWidget);
        for (var i = 0; i < lineWidget.children.length; i++) {
            var inline = lineWidget.children[i];
            if (inline instanceof ListTextElementBox) {
                continue;
            }
            if (offset < count + inline.length) {
                var indexInInline = offset - count;
                inline.ischangeDetected = true;
                if (this.owner.enableSpellCheck) {
                    this.owner.spellChecker.removeErrorsFromCollection({ 'element': inline, 'text': inline.text });
                }
                if (!inline.canTrigger) {
                    this.viewer.triggerSpellCheck = false;
                }
                if (offset === count && inline.length === 1) {
                    this.unLinkFieldCharacter(inline);
                    lineWidget.children.splice(i, 1);
                    this.viewer.layout.reLayoutParagraph(lineWidget.paragraph, lineIndex, i);
                    this.addRemovedNodes(inline);
                }
                else {
                    var span = new TextElementBox();
                    span.characterFormat.copyFormat(inline.characterFormat);
                    span.text = inline.text.substr(indexInInline, 1);
                    inline.text = HelperMethods.remove(inline.text, indexInInline, 1);
                    this.viewer.layout.reLayoutParagraph(lineWidget.paragraph, lineIndex, i);
                    this.addRemovedNodes(span);
                }
                break;
            }
            count += inline.length;
        }
    };
    /**
     * @private
     */
    Editor.prototype.onDelete = function () {
        this.removeEditRange = true;
        var selection = this.viewer.selection;
        if (selection.isEmpty) {
            this.singleDelete(selection, false);
        }
        else {
            // this.initComplexHistory('MultiSelection');
            // for (let i: number = 0; i < selection.selectionRanges.length; i++) {
            // let selectionRange: SelectionRange = selection.selectionRanges.getRange(i);
            this.initHistory('Delete');
            this.deleteSelectedContentInternal(selection, false, selection.start, selection.end);
            var textPosition = new TextPosition(selection.owner);
            this.setPositionForCurrentIndex(textPosition, selection.editPosition);
            selection.selectContent(textPosition, true);
            // if (this.viewer.owner.enableEditorHistory) {
            this.reLayout(selection);
            // }
            // this.updateSelectionRangeOffSet(selection.start, selection.end);
            // }
            // let textPosition: TextPosition = new TextPosition(selection.owner, this.viewer);
            // this.setPositionForCurrentIndex(textPosition,selection.editPosition);
            // selection.selectContent(textPosition, true);
            // if (!isNullOrUndefined(selection.currentHistoryInfo)) {
            //     this.updateComplexHistory();
            // } else {
            //     this.updateComplexWithoutHistory();
            // }
        }
        this.removeEditRange = false;
    };
    Editor.prototype.deleteEditElement = function (selection) {
        this.initHistory('Delete');
        this.deleteSelectedContentInternal(selection, false, selection.start, selection.end);
        var textPosition = new TextPosition(selection.owner);
        this.setPositionForCurrentIndex(textPosition, selection.editPosition);
        selection.selectContent(textPosition, true);
        this.reLayout(selection);
    };
    /**
     * Remove single character on right of cursor position
     * @param  {Selection} selection
     * @param  {boolean} isRedoing
     * @private
     */
    Editor.prototype.singleDelete = function (selection, isRedoing) {
        // tslint:disable-next-line:max-line-length
        var paragraph = selection.start.paragraph;
        var offset = selection.start.offset;
        var indexInInline = 0;
        var inlineObj = paragraph.getInline(selection.start.offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1 &&
            this.viewer.isListTextSelected && selection.contextType === 'List') {
            this.onApplyList(undefined);
            return;
        }
        if (!isNullOrUndefined(inline) && indexInInline === inline.length && !isNullOrUndefined(inline.nextNode)) {
            inline = inline.nextNode;
            indexInInline = 0;
        }
        if (!isNullOrUndefined(inline)) {
            var nextRenderedInline = undefined;
            var nextInline = selection.getNextValidElement(inline);
            if (nextInline instanceof ElementBox) {
                nextRenderedInline = nextInline;
            }
            if (!isNullOrUndefined(nextRenderedInline) && nextRenderedInline instanceof FieldElementBox
                && nextRenderedInline.fieldType === 0) { //Selects the entire field.
                inline = nextRenderedInline.fieldEnd;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 1);
                selection.end.setPositionParagraph(inline.line, offset);
                selection.fireSelectionChanged(true);
                return;
            }
            else if (inline !== nextRenderedInline) { //Updates the offset to delete next content.               
                inline = nextRenderedInline;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
                if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                    offset++;
                }
            }
        }
        if (inline instanceof EditRangeStartElementBox || inline instanceof EditRangeEndElementBox) {
            if ((inline.nextNode instanceof EditRangeEndElementBox && inline.editRangeEnd === inline.nextNode)
                || (inline.previousNode instanceof EditRangeStartElementBox
                    && inline.editRangeStart === inline.previousNode)) {
                return;
            }
            if (inline instanceof EditRangeStartElementBox) {
                inline = inline.nextNode;
                offset = inline.line.getOffset(inline, 0);
                paragraph = inline.line.paragraph;
            }
            if (inline.length === 1 && inline.nextNode instanceof EditRangeEndElementBox
                && inline.previousNode instanceof EditRangeStartElementBox) {
                var editStart = inline.previousNode;
                var editEnd = inline.nextNode;
                selection.start.setPositionParagraph(editStart.line, editStart.line.getOffset(editStart, 0));
                selection.end.setPositionParagraph(editEnd.line, editEnd.line.getOffset(editEnd, 0) + 1);
                this.deleteEditElement(selection);
                return;
            }
        }
        if (inline && (inline instanceof BookmarkElementBox && inline.bookmarkType === 0
            || inline.nextNode instanceof BookmarkElementBox)) {
            if (inline instanceof BookmarkElementBox) {
                inline = inline.nextNode;
                paragraph = inline.line.paragraph;
                offset = inline.line.getOffset(inline, 0);
            }
            if (inline.length === 1 && inline.nextNode instanceof BookmarkElementBox
                && inline.previousNode instanceof BookmarkElementBox) {
                var bookMarkBegin = inline.previousNode;
                var bookMarkEnd = inline.nextNode;
                selection.start.setPositionParagraph(bookMarkBegin.line, bookMarkBegin.line.getOffset(bookMarkBegin, 0));
                selection.end.setPositionParagraph(bookMarkEnd.line, bookMarkEnd.line.getOffset(bookMarkEnd, 0) + 1);
                this.deleteEditElement(selection);
                return;
            }
        }
        if (selection.start.currentWidget.isLastLine() && offset === this.viewer.selection.getLineLength(selection.start.currentWidget)) {
            if (paragraph.isInsideTable && isNullOrUndefined(paragraph.nextWidget)) {
                return;
            }
            var previousParagraph = undefined;
            var newParagraph = undefined;
            var nextParagraph = selection.getNextParagraphBlock(paragraph);
            if (isNullOrUndefined(nextParagraph)) {
                if (offset > 0) {
                    return;
                }
                else {
                    if (paragraph.previousWidget instanceof ParagraphWidget) {
                        previousParagraph = paragraph.previousWidget;
                    }
                    if (paragraph.previousWidget instanceof TableWidget) {
                        return;
                    }
                    if (isNullOrUndefined(previousParagraph)) {
                        return;
                        //Adds an empty paragraph, to ensure minimal content.
                    }
                }
            }
            if (!isRedoing) {
                this.initHistory('Delete');
            }
            var blockInfo = this.selection.getParagraphInfo(selection.start);
            selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            if (this.checkInsertPosition(selection)) {
                this.setPositionForHistory(selection.editPosition);
            }
            selection.owner.isShiftingEnabled = true;
            if (paragraph.isEmpty()) {
                this.removeBlock(paragraph);
                this.addRemovedNodes(paragraph);
                if (isNullOrUndefined(nextParagraph)) {
                    if (isNullOrUndefined(previousParagraph)) {
                        // selection.selectParagraphInternal(newParagraph, true, true);
                        var paraEndOffset = selection.getParagraphLength(newParagraph) + 1;
                        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
                            this.updateHistoryPosition(selection.start, true);
                            //tslint:disable-next-line:max-line-length
                            this.editorHistory.currentBaseHistoryInfo.endPosition = this.selection.getHierarchicalIndex(newParagraph, paraEndOffset.toString());
                        }
                    }
                    else {
                        selection.selectParagraphInternal(previousParagraph, false);
                        this.setPositionForHistory();
                    }
                }
                else {
                    selection.selectParagraphInternal(nextParagraph, true);
                }
            }
            else {
                paragraph = paragraph.combineWidget(this.viewer);
                // tslint:disable-next-line:max-line-length
                var currentParagraph = this.splitParagraph(paragraph, paragraph.firstChild, 0, selection.start.currentWidget, selection.start.offset, true);
                this.deleteParagraphMark(currentParagraph, selection, 0);
                this.addRemovedNodes(paragraph);
                this.setPositionForCurrentIndex(selection.start, selection.editPosition);
                selection.selectContent(selection.start, true);
            }
            // if (!isRedoing) {
            this.reLayout(selection);
            // }
        }
        else {
            this.singleDeleteInternal(selection, isRedoing, paragraph);
        }
    };
    Editor.prototype.singleDeleteInternal = function (selection, isRedoing, paragraph) {
        if (!isRedoing) {
            selection.owner.isShiftingEnabled = true;
            this.initHistory('Delete');
        }
        if (this.checkInsertPosition(selection)) {
            this.updateHistoryPosition(selection.start, true);
            this.editorHistory.currentBaseHistoryInfo.endPosition = this.editorHistory.currentBaseHistoryInfo.insertPosition;
        }
        var paragraphInfo = this.selection.getParagraphInfo(selection.start);
        var lineWidget = selection.start.currentWidget;
        var removeOffset = selection.start.offset;
        var lineLength = selection.getLineLength(selection.start.currentWidget);
        if (removeOffset >= lineLength) {
            lineWidget = lineWidget.nextLine;
            removeOffset = removeOffset - lineLength;
        }
        this.removeAtOffset(lineWidget, selection, removeOffset);
        this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset, false);
        if (!isRedoing) {
            this.reLayout(selection);
        }
        else {
            this.fireContentChange();
        }
    };
    Editor.prototype.deleteParagraphMark = function (paragraph, selection, editAction) {
        if (isNullOrUndefined(paragraph.containerWidget)) {
            return;
        }
        paragraph = paragraph.combineWidget(this.viewer);
        var nextParagraph = selection.getNextParagraphBlock(paragraph);
        if (paragraph.isInsideTable && isNullOrUndefined(paragraph.nextWidget) || isNullOrUndefined(nextParagraph)) {
            return;
        }
        //BodyWidget
        var section = paragraph.containerWidget instanceof BodyWidget ? paragraph.containerWidget : undefined;
        var table = undefined;
        if (selection.getNextRenderedBlock(paragraph) instanceof TableWidget) {
            table = selection.getNextRenderedBlock(paragraph);
        }
        else {
            table = undefined;
        }
        if (nextParagraph.isInsideTable && !isNullOrUndefined(table) && table.contains(nextParagraph.associatedCell)) {
            if (editAction < 4) {
                // let nextSection: BodyWidget = table.containerWidget instanceof BodyWidget ? table.containerWidget : undefined;
                // if (section !== nextSection) {
                //     this.combineSection(section, selection, nextSection);
                // }
                var offset = 0;
                this.removeBlock(paragraph);
                this.viewer.layout.clearListElementBox(nextParagraph);
                this.viewer.layout.clearListElementBox(paragraph);
                for (var i = paragraph.childWidgets.length - 1; i >= 0; i--) {
                    var line = paragraph.childWidgets[i];
                    for (var j = line.children.length - 1; j >= 0; j--) {
                        var element = line.children[j];
                        offset += element.length;
                        nextParagraph.firstChild.children.unshift(element);
                        element.line = nextParagraph.firstChild;
                        // this.layoutInlineCollection(false, 0, nextParagraph.inlines, inline);
                    }
                }
                this.viewer.layout.reLayoutParagraph(nextParagraph, 0, 0);
                if (offset > 0) {
                    selection.editPosition = this.selection.getHierarchicalIndex(nextParagraph, offset.toString());
                }
            }
        }
        else {
            if (editAction < 4) {
                // let nextSection: WSection = nextParagraph.section instanceof WSection ? nextParagraph.section as WSection : undefined;
                // if (section !== nextSection) {
                //     this.combineSection(section, selection, nextSection);
                // }
                var prevLength = paragraph.childWidgets.length - 1;
                var nextPara = nextParagraph.getSplitWidgets();
                nextParagraph = nextParagraph.combineWidget(this.viewer);
                this.viewer.layout.clearListElementBox(nextParagraph);
                this.viewer.layout.clearListElementBox(paragraph);
                this.updateEditPositionOnMerge(paragraph, nextParagraph);
                for (var i = 0; i < nextParagraph.childWidgets.length; i++) {
                    var inline = nextParagraph.childWidgets[i];
                    nextParagraph.childWidgets.splice(i, 1);
                    paragraph.childWidgets.push(inline);
                    inline.paragraph = paragraph;
                    i--;
                }
                if (nextParagraph.childWidgets.length === 0) {
                    nextParagraph.childWidgets.push(new LineWidget(nextParagraph));
                }
                this.removeBlock(nextParagraph);
                this.viewer.layout.reLayoutParagraph(paragraph, 0, 0);
                this.addRemovedNodes(nextParagraph);
            }
        }
    };
    Editor.prototype.updateEditPositionOnMerge = function (currentParagraph, nextParagraph) {
        if (this.viewer.selection.editPosition === this.selection.getHierarchicalIndex(nextParagraph, '0') &&
            nextParagraph.nextRenderedWidget === undefined) {
            // tslint:disable-next-line:max-line-length
            this.viewer.selection.editPosition = this.selection.getHierarchicalIndex(currentParagraph, this.viewer.selection.getLineLength(currentParagraph.lastChild).toString());
        }
    };
    Editor.prototype.checkEndPosition = function (selection) {
        return (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.endPosition));
    };
    Editor.prototype.checkInsertPosition = function (selection) {
        return (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)
            && isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo.insertPosition));
    };
    Editor.prototype.checkIsNotRedoing = function () {
        return this.viewer.owner.enableHistoryMode && !this.editorHistory.isRedoing;
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.deleteSelectedContentInternal = function (selection, isBackSpace, startPosition, endPosition) {
        var startPos = startPosition;
        var endPos = endPosition;
        if (!startPosition.isExistBefore(endPosition)) {
            startPos = endPosition;
            endPos = startPosition;
        }
        var blockInfo = this.selection.getParagraphInfo(startPos);
        selection.editPosition = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        var skipBackSpace = false;
        if (isBackSpace && startPos.isInSameParagraph(endPos)) {
            //Handled specifically to skip removal of contents, if selection is only paragraph mark and next rendered block is table.
            if (startPos.offset < endPos.offset && startPos.offset === selection.getParagraphLength(endPos.paragraph)) {
                var nextBlock = selection.getNextRenderedBlock(startPos.paragraph);
                skipBackSpace = nextBlock instanceof TableWidget;
            }
            //Handled specifically to remove paragraph completely (Delete behavior), if the selected paragraph is empty.
            if (endPos.offset === 1 && endPos.offset > selection.getParagraphLength(endPos.paragraph)
                && !(endPos.paragraph.isInsideTable && isNullOrUndefined(endPos.paragraph.nextWidget))) {
                isBackSpace = false;
            }
        }
        if (!skipBackSpace) {
            selection.owner.isShiftingEnabled = true;
            if (this.checkInsertPosition(selection)) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = selection.editPosition;
            }
            var editAction = (isBackSpace ? 1 : 0);
            this.deleteSelectedContent(endPos.paragraph, selection, startPos, endPos, editAction);
        }
        return skipBackSpace;
    };
    /**
     * Init EditorHistory
     * @private
     */
    Editor.prototype.initHistory = function (action) {
        if (this.viewer.owner.enableHistoryMode) {
            this.editorHistory.initializeHistory(action);
        }
    };
    /**
     * Init Complex EditorHistory
     * @private
     */
    Editor.prototype.initComplexHistory = function (action) {
        if (this.viewer.owner.enableHistoryMode) {
            this.editorHistory.initComplexHistory(this.viewer.selection, action);
        }
    };
    //Insert Picture implementation starts
    /**
     * Insert image
     * @param  {string} base64String
     * @param  {number} width
     * @param  {number} height
     * @private
     */
    Editor.prototype.insertPicture = function (base64String, width, height) {
        var imageElementBox = new ImageElementBox(true);
        imageElementBox.imageString = base64String;
        imageElementBox.width = width;
        imageElementBox.height = height;
        this.insertPictureInternal(imageElementBox);
    };
    Editor.prototype.insertPictureInternal = function (imageElementBox) {
        var selection = this.viewer.selection;
        this.initHistory('InsertInline');
        this.fitImageToPage(selection, imageElementBox);
        this.insertInlineInSelection(selection, imageElementBox);
        this.reLayout(selection);
    };
    Editor.prototype.fitImageToPage = function (selection, imageElementBox) {
        var section = selection.start.paragraph.bodyWidget;
        var pageWidth = section.sectionFormat.pageWidth - section.sectionFormat.leftMargin - section.sectionFormat.rightMargin;
        var pageHeight = section.sectionFormat.pageHeight - section.sectionFormat.topMargin - section.sectionFormat.topMargin;
        //Resizes image to page size.
        if (imageElementBox.width > pageWidth) {
            imageElementBox.height = imageElementBox.height * pageWidth / imageElementBox.width;
            imageElementBox.width = pageWidth;
        }
        if (imageElementBox.height > pageHeight) {
            imageElementBox.width = imageElementBox.width * pageHeight / imageElementBox.height;
            imageElementBox.height = pageHeight;
        }
    };
    //Insert Picture implementation ends
    /**
     * @private
     */
    Editor.prototype.insertInlineInSelection = function (selection, elementBox) {
        if (this.checkIsNotRedoing()) {
            selection.owner.isShiftingEnabled = true;
        }
        if (!selection.isEmpty) {
            this.removeSelectedContents(selection);
        }
        this.updateInsertPosition();
        this.insertInlineInternal(elementBox);
        if (this.checkEndPosition(selection)) {
            this.updateHistoryPosition(selection.start, false);
        }
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.onPortrait = function () {
        var sectionFormat = new WSectionFormat();
        var width = this.viewer.selection.sectionFormat.pageWidth;
        var height = this.viewer.selection.sectionFormat.pageHeight;
        if (width > height) {
            sectionFormat.pageWidth = height;
            sectionFormat.pageHeight = width;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    /**
     * @private
     */
    Editor.prototype.onLandscape = function () {
        var sectionFormat = new WSectionFormat();
        var width = this.viewer.selection.sectionFormat.pageWidth;
        var height = this.viewer.selection.sectionFormat.pageHeight;
        if (width < height) {
            sectionFormat.pageWidth = height;
            sectionFormat.pageHeight = width;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    Editor.prototype.copyValues = function () {
        var format = new WSectionFormat();
        format.bottomMargin = this.viewer.selection.sectionFormat.bottomMargin;
        format.topMargin = this.viewer.selection.sectionFormat.topMargin;
        format.leftMargin = this.viewer.selection.sectionFormat.leftMargin;
        format.rightMargin = this.viewer.selection.sectionFormat.rightMargin;
        format.pageHeight = this.viewer.selection.sectionFormat.pageHeight;
        format.pageWidth = this.viewer.selection.sectionFormat.pageWidth;
        format.footerDistance = this.viewer.selection.sectionFormat.footerDistance;
        format.headerDistance = this.viewer.selection.sectionFormat.headerDistance;
        return format;
    };
    /**
     * @private
     */
    Editor.prototype.changeMarginValue = function (property) {
        var sectionFormat = this.copyValues();
        if (property === 'lastCustomSetting' || property === 'normal') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 72;
            sectionFormat.rightMargin = 72;
        }
        else if (property === 'narrow') {
            sectionFormat.topMargin = 36;
            sectionFormat.bottomMargin = 36;
            sectionFormat.leftMargin = 36;
            sectionFormat.rightMargin = 36;
        }
        else if (property === 'moderate') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 54;
            sectionFormat.rightMargin = 54;
        }
        else if (property === 'wide') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 144;
            sectionFormat.rightMargin = 144;
        }
        else if (property === 'mirrored') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 90;
            sectionFormat.rightMargin = 72;
        }
        else if (property === 'office2003Default') {
            sectionFormat.topMargin = 72;
            sectionFormat.bottomMargin = 72;
            sectionFormat.leftMargin = 90;
            sectionFormat.rightMargin = 90;
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    /**
     * @private
     */
    Editor.prototype.onPaperSize = function (property) {
        var sectionFormat = this.copyValues();
        var width = this.viewer.selection.sectionFormat.pageWidth;
        var height = this.viewer.selection.sectionFormat.pageHeight;
        if (property === 'letter') {
            if (width < height) {
                sectionFormat.pageWidth = 611.9;
                sectionFormat.pageHeight = 791.9;
            }
            else {
                sectionFormat.pageWidth = 791.9;
                sectionFormat.pageHeight = 611.9;
            }
        }
        else if (property === 'tabloid') {
            if (width < height) {
                sectionFormat.pageWidth = 791.9;
                sectionFormat.pageHeight = 1223.9;
            }
            else {
                sectionFormat.pageWidth = 1223.9;
                sectionFormat.pageHeight = 791.9;
            }
        }
        else if (property === 'legal') {
            if (width < height) {
                sectionFormat.pageWidth = 611.9;
                sectionFormat.pageHeight = 1007.9;
            }
            else {
                sectionFormat.pageWidth = 1007.9;
                sectionFormat.pageHeight = 611.9;
            }
        }
        else if (property === 'statement') {
            if (width < height) {
                sectionFormat.pageWidth = 396;
                sectionFormat.pageHeight = 611.9;
            }
            else {
                sectionFormat.pageWidth = 611.9;
                sectionFormat.pageHeight = 396;
            }
        }
        else if (property === 'executive') {
            if (width < height) {
                sectionFormat.pageWidth = 521.9;
                sectionFormat.pageHeight = 755.9;
            }
            else {
                sectionFormat.pageWidth = 755.9;
                sectionFormat.pageHeight = 521.9;
            }
        }
        else if (property === 'a3') {
            if (width < height) {
                sectionFormat.pageWidth = 841.8;
                sectionFormat.pageHeight = 1190.4;
            }
            else {
                sectionFormat.pageWidth = 1190.4;
                sectionFormat.pageHeight = 841.8;
            }
        }
        else if (property === 'a4') {
            if (width < height) {
                sectionFormat.pageWidth = 595.2;
                sectionFormat.pageHeight = 841.8;
            }
            else {
                sectionFormat.pageWidth = 841.8;
                sectionFormat.pageHeight = 595.2;
            }
        }
        else if (property === 'a5') {
            if (width < height) {
                sectionFormat.pageWidth = 419.5;
                sectionFormat.pageHeight = 595.2;
            }
            else {
                sectionFormat.pageWidth = 595.2;
                sectionFormat.pageHeight = 419.5;
            }
        }
        else if (property === 'b4') {
            if (width < height) {
                sectionFormat.pageWidth = 728.4;
                sectionFormat.pageHeight = 1031.7;
            }
            else {
                sectionFormat.pageWidth = 1031.7;
                sectionFormat.pageHeight = 728.4;
            }
        }
        else if (property === 'b5') {
            if (width < height) {
                sectionFormat.pageWidth = 515.8;
                sectionFormat.pageHeight = 728.4;
            }
            else {
                sectionFormat.pageWidth = 728.4;
                sectionFormat.pageHeight = 515.8;
            }
        }
        this.onApplySectionFormat(undefined, sectionFormat);
    };
    //Update List Items
    /**
     * @private
     */
    Editor.prototype.updateListItemsTillEnd = function (blockAdv, updateNextBlockList) {
        var block = updateNextBlockList ? this.viewer.selection.getNextRenderedBlock(blockAdv) : blockAdv;
        while (!isNullOrUndefined(block) && !this.viewer.isTextInput) {
            //Updates the list value of the rendered paragraph. 
            this.updateRenderedListItems(block);
            block = block.getSplitWidgets().pop().nextRenderedWidget;
        }
    };
    /**
     * @private
     */
    Editor.prototype.updateWholeListItems = function (block) {
        this.viewer.renderedLists.clear();
        var sectionIndex = block.bodyWidget.index;
        var currentBlock;
        for (var j = 0; j < this.viewer.pages.length; j++) {
            var page = this.viewer.pages[j];
            if (page.bodyWidgets[0].index === sectionIndex) {
                currentBlock = page.bodyWidgets[0].firstChild;
                if (!isNullOrUndefined(currentBlock)) {
                    break;
                }
            }
        }
        var isListUpdated = false;
        do {
            isListUpdated = this.updateListItems(currentBlock, block);
            if (isListUpdated) {
                break;
            }
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
        } while (currentBlock);
    };
    Editor.prototype.updateListItems = function (blockAdv, block) {
        var isListUpdated = false;
        if (blockAdv instanceof ParagraphWidget) {
            isListUpdated = this.updateListItemsForPara(blockAdv, block);
        }
        else {
            isListUpdated = this.updateListItemsForTable(blockAdv, block);
        }
        return isListUpdated;
    };
    Editor.prototype.updateListItemsForTable = function (table, block) {
        if (block instanceof TableWidget && table.equals(block)) {
            return true;
        }
        var row = table.firstChild;
        do {
            var isListUpdated = this.updateListItemsForRow(row, block);
            if (isListUpdated) {
                return true;
            }
            row = row.getSplitWidgets().pop().nextRenderedWidget;
        } while (row);
        return false;
    };
    Editor.prototype.updateListItemsForRow = function (row, block) {
        if (block.isInsideTable && row.childWidgets.indexOf(this.viewer.selection.getContainerCell(block.associatedCell)) !== -1) {
            //Returns as list updated, inorder to start list numbering from first list paragraph of this row.
            return true;
        }
        var cell = row.firstChild;
        do {
            this.updateListItemsForCell(cell, block);
            cell = cell.nextRenderedWidget;
        } while (cell);
        return false;
    };
    Editor.prototype.updateListItemsForCell = function (cell, block) {
        if (cell.childWidgets.length === 0) {
            return;
        }
        var currentBlock = cell.firstChild;
        do {
            this.updateListItems(currentBlock, block);
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
        } while (currentBlock);
    };
    // public abstract updateListParagraphs(): void;
    /**
     * @private
     */
    Editor.prototype.updateRenderedListItems = function (block) {
        if (block instanceof ParagraphWidget) {
            this.updateRenderedListItemsForPara(block);
        }
        else {
            this.updateRenderedListItemsForTable(block);
        }
    };
    Editor.prototype.updateRenderedListItemsForTable = function (table) {
        var row = table.firstChild;
        do {
            this.updateRenderedListItemsForRow(row);
            row = row.getSplitWidgets().pop().nextRenderedWidget;
        } while (row);
    };
    Editor.prototype.updateRenderedListItemsForRow = function (row) {
        var cell = row.firstChild;
        do {
            this.updateRenderedListItemsForCell(cell);
            cell = cell.nextRenderedWidget;
        } while (cell);
    };
    Editor.prototype.updateRenderedListItemsForCell = function (cell) {
        if (cell.childWidgets.length === 0) {
            return;
        }
        var currentBlock = cell.firstChild;
        do {
            this.updateRenderedListItems(currentBlock);
            currentBlock = currentBlock.getSplitWidgets().pop().nextRenderedWidget;
        } while (currentBlock);
    };
    Editor.prototype.updateListItemsForPara = function (paragraph, block) {
        if (paragraph.equals(block)) {
            return true;
        }
        else {
            var currentList = undefined;
            var listLevelNumber = 0;
            if (!isNullOrUndefined(paragraph.paragraphFormat) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
                currentList = this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId);
                listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            }
            // tslint:disable-next-line:max-line-length
            if (!isNullOrUndefined(currentList) && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId))
                // tslint:disable-next-line:max-line-length
                && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId).levels[listLevelNumber])) {
                var currentListLevel = this.viewer.layout.getListLevel(currentList, listLevelNumber);
                //Updates the list numbering from document start for reLayouting.
                if (currentListLevel.listLevelPattern !== 'Bullet') {
                    this.viewer.layout.getListNumber(paragraph.paragraphFormat.listFormat);
                }
            }
        }
        return false;
    };
    Editor.prototype.updateRenderedListItemsForPara = function (paragraph) {
        if (!isNullOrUndefined(this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId))) {
            var currentList = this.viewer.getListById(paragraph.paragraphFormat.listFormat.listId);
            var listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
            if (!isNullOrUndefined(currentList) && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId))
                // tslint:disable-next-line:max-line-length
                && !isNullOrUndefined(this.viewer.getAbstractListById(currentList.abstractListId).levels[paragraph.paragraphFormat.listFormat.listLevelNumber])) {
                var currentListLevel = this.viewer.layout.getListLevel(currentList, listLevelNumber);
                //Updates the list numbering from document start for reLayouting.
                if (currentListLevel.listLevelPattern !== 'Bullet') {
                    var element = undefined;
                    if (paragraph.childWidgets.length > 0) {
                        var lineWidget = paragraph.childWidgets[0];
                        if (lineWidget.children.length > 0) {
                            if (paragraph.paragraphFormat.bidi) {
                                element = lineWidget.children[lineWidget.children.length - 1];
                            }
                            else {
                                element = lineWidget.children[0];
                            }
                        }
                    }
                    if (!isNullOrUndefined(element)) {
                        element.text = this.viewer.layout.getListNumber(paragraph.paragraphFormat.listFormat);
                    }
                }
            }
        }
    };
    /**
     * Get offset value to update in selection
     * @private
     */
    Editor.prototype.getOffsetValue = function (selection) {
        if (this.startParagraph) {
            var lineInfo = selection.getLineInfoBasedOnParagraph(this.startParagraph, this.startOffset);
            selection.start.setPositionFromLine(lineInfo.line, lineInfo.offset);
        }
        selection.start.updatePhysicalPosition(true);
        if (selection.isEmpty) {
            selection.end.setPositionInternal(selection.start);
        }
        else {
            if (this.endParagraph) {
                var lineInfo = selection.getLineInfoBasedOnParagraph(this.endParagraph, this.endOffset);
                selection.end.setPositionFromLine(lineInfo.line, lineInfo.offset);
            }
            selection.end.updatePhysicalPosition(true);
        }
    };
    /**
     * @private
     */
    Editor.prototype.setPositionParagraph = function (paragraph, offset, skipSelectionChange) {
        var selection = this.viewer.selection;
        var lineInfo = selection.getLineInfoBasedOnParagraph(paragraph, offset);
        selection.start.setPositionFromLine(lineInfo.line, lineInfo.offset);
        selection.end.setPositionInternal(selection.start);
        if (!skipSelectionChange) {
            selection.fireSelectionChanged(true);
        }
    };
    /**
     * @private
     */
    Editor.prototype.setPositionForCurrentIndex = function (textPosition, editPosition) {
        var blockInfo = this.selection.getParagraph({ index: editPosition });
        var lineInfo = this.selection.getLineInfoBasedOnParagraph(blockInfo.paragraph, blockInfo.offset);
        textPosition.setPositionForLineWidget(lineInfo.line, lineInfo.offset);
    };
    /**
     * @private
     */
    Editor.prototype.insertPageNumber = function (numberFormat) {
        if (isNullOrUndefined(numberFormat)) {
            numberFormat = '';
        }
        else {
            numberFormat = ' \\*' + numberFormat;
        }
        var fieldCode = 'PAGE ' + numberFormat + ' \\* MERGEFORMAT';
        this.createFields(fieldCode);
    };
    /**
     * @private
     */
    Editor.prototype.insertPageCount = function (numberFormat) {
        if (isNullOrUndefined(numberFormat)) {
            numberFormat = '';
        }
        else {
            numberFormat = ' \*' + numberFormat;
        }
        var fieldCode = 'NUMPAGES ' + numberFormat + ' \* MERGEFORMAT';
        this.createFields(fieldCode);
    };
    Editor.prototype.createFields = function (fieldCode) {
        var paragraph = new ParagraphWidget();
        var line = new LineWidget(paragraph);
        var fieldBegin = new FieldElementBox(0);
        line.children.push(fieldBegin);
        var fieldtext = new FieldTextElementBox();
        fieldtext.fieldBegin = fieldBegin;
        fieldtext.text = '1';
        var text = new TextElementBox();
        text.text = fieldCode;
        line.children.push(text);
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.fieldBegin = fieldBegin;
        fieldBegin.fieldSeparator = fieldSeparator;
        line.children.push(fieldSeparator);
        line.children.push(fieldtext);
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.fieldBegin = fieldBegin;
        fieldEnd.fieldSeparator = fieldSeparator;
        fieldSeparator.fieldEnd = fieldEnd;
        fieldBegin.fieldEnd = fieldEnd;
        line.children.push(fieldEnd);
        fieldBegin.line = line;
        paragraph.childWidgets.push(line);
        var widgets = [];
        widgets.push(paragraph);
        this.viewer.fields.push(fieldBegin);
        this.pasteContentsInternal(widgets);
    };
    /**
     * Insert Bookmark at current selection range
     * @param  {string} name - Name of bookmark
     */
    Editor.prototype.insertBookmark = function (name) {
        var bookmark = new BookmarkElementBox(0);
        bookmark.name = name;
        var bookmarkEnd = new BookmarkElementBox(1);
        bookmarkEnd.name = name;
        bookmark.reference = bookmarkEnd;
        bookmarkEnd.reference = bookmark;
        this.viewer.bookmarks.add(name, bookmark);
        this.initComplexHistory('InsertBookmark');
        this.insertElements([bookmarkEnd], [bookmark]);
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
        }
        this.selection.start.setPositionForSelection(bookmark.line, bookmark, 1, this.selection.start.location);
        this.selection.end.setPositionForSelection(bookmarkEnd.line, bookmarkEnd, 0, this.selection.end.location);
        this.selection.fireSelectionChanged(true);
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.deleteBookmark = function (bookmarkName) {
        var bookmarks = this.viewer.bookmarks;
        var bookmark = bookmarks.get(bookmarkName);
        if (bookmark instanceof BookmarkElementBox) {
            var bookmarkEnd = bookmark.reference;
            this.initHistory('DeleteBookmark');
            if (this.editorHistory) {
                this.editorHistory.currentBaseHistoryInfo.setBookmarkInfo(bookmark);
                this.editorHistory.updateHistory();
            }
            this.deleteBookmarkInternal(bookmark);
        }
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.deleteBookmarkInternal = function (bookmark) {
        this.viewer.bookmarks.remove(bookmark.name);
        bookmark.line.children.splice(bookmark.indexInOwner, 1);
        bookmark.reference.line.children.splice(bookmark.reference.indexInOwner, 1);
    };
    /**
     * @private
     */
    Editor.prototype.getSelectionInfo = function () {
        var start = this.selection.start;
        var end = this.selection.end;
        var isEmpty = this.selection.isEmpty;
        if (!this.selection.isForward) {
            start = this.selection.end;
            end = this.selection.start;
        }
        var startElementInfo = start.currentWidget.getInline(start.offset, 0);
        var endElementInfo = end.currentWidget.getInline(end.offset, 0);
        if (!(end.offset === this.selection.getLineLength(end.currentWidget) + 1
            && this.selection.isParagraphLastLine(end.currentWidget))) {
            end.offset += 1;
        }
        // tslint:disable-next-line:max-line-length
        return { 'start': start.clone(), 'end': end.clone(), 'startElementInfo': startElementInfo, 'endElementInfo': endElementInfo, 'isEmpty': isEmpty };
    };
    /**
     * @private
     */
    Editor.prototype.insertElements = function (endElements, startElements) {
        var info = this.getSelectionInfo();
        if (!isNullOrUndefined(startElements)) {
            this.insertElementsInternal(info.start, startElements);
        }
        if (!isNullOrUndefined(endElements)) {
            this.insertElementsInternal(info.end, endElements);
        }
    };
    /**
     * @private
     */
    Editor.prototype.insertElementsInternal = function (position, elements) {
        this.selection.selectPosition(position, position);
        this.initHistory('InsertElements');
        this.updateInsertPosition();
        var indexInInline = 0;
        var paragraphInfo = this.selection.getParagraphInfo(this.selection.start);
        if (this.selection.start.paragraph.isEmpty()) {
            var paragraph = this.selection.start.paragraph;
            paragraph.childWidgets[0].children.push(elements[0]);
            elements[0].line = paragraph.childWidgets[0];
            elements[0].linkFieldCharacter(this.viewer);
            this.viewer.layout.reLayoutParagraph(paragraph, 0, 0);
            this.setPositionParagraph(paragraphInfo.paragraph, paragraphInfo.offset + length, true);
            position.setPositionForSelection(elements[0].line, elements[0], elements[0].length, this.selection.start.location);
            this.selection.selectPosition(position, position);
        }
        else {
            var inlineObj = this.selection.start.currentWidget.getInline(this.viewer.selection.start.offset, indexInInline);
            var curInline = inlineObj.element;
            indexInInline = inlineObj.index;
            var firstElement = elements[0];
            this.insertElementInternal(curInline, firstElement, indexInInline, true);
            var index = firstElement.indexInOwner;
            var lastElement = firstElement;
            for (var i = 1; i < elements.length; i++) {
                lastElement = elements[i];
                firstElement.line.children.splice(index + i, 0, lastElement);
            }
            position.setPositionForSelection(lastElement.line, lastElement, lastElement.length, this.selection.start.location);
            this.selection.selectPosition(position, position);
        }
        if (this.editorHistory) {
            if (this.checkEndPosition()) {
                this.updateHistoryPosition(this.selection.start, false);
            }
            this.editorHistory.updateHistory();
        }
    };
    /**
     * @private
     */
    Editor.prototype.getBlock = function (position) {
        var bodyWidget = this.selection.getBodyWidget(position);
        return this.getBlockInternal(bodyWidget, position);
    };
    /**
     * Return Block relative to position
     * @private
     */
    Editor.prototype.getBlockInternal = function (widget, position) {
        if (position.index === '' || isNullOrUndefined(position)) {
            return undefined;
        }
        var index = position.index.indexOf(';');
        var value = position.index.substring(0, index);
        position.index = position.index.substring(index).replace(';', '');
        var node = widget;
        // if (node instanceof WSection && value === 'HF') {
        //     //Gets the block in Header footers.
        //     let blockObj: BlockInfo = this.getBlock((node as WSection).headerFooters, position);
        // tslint:disable-next-line:max-line-length
        //     return { 'node': (!isNullOrUndefined(blockObj)) ? blockObj.node : undefined, 'position': (!isNullOrUndefined(blockObj)) ? blockObj.position : undefined };
        // }
        index = parseInt(value, 10);
        var childWidget = this.selection.getBlockByIndex(widget, index);
        if (childWidget) {
            var child = childWidget;
            if (position.index.indexOf(';') >= 0) {
                if (child instanceof ParagraphWidget) {
                    if (position.index.indexOf(';') >= 0) {
                        position.index = '0';
                    }
                    return { 'node': child, 'position': position };
                }
                if (child instanceof Widget) {
                    var blockObj = this.getBlockInternal(child, position);
                    // tslint:disable-next-line:max-line-length
                    return { 'node': (!isNullOrUndefined(blockObj)) ? blockObj.node : undefined, 'position': (!isNullOrUndefined(blockObj)) ? blockObj.position : undefined };
                }
            }
            else {
                return { 'node': child, 'position': position };
            }
        }
        else {
            return { 'node': node, 'position': position };
        }
        return { 'node': node, 'position': position };
    };
    /**
     * @private
     */
    Editor.prototype.updateHistoryPosition = function (position, isInsertPosition) {
        if (this.editorHistory && !isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            var hierarchicalIndex = void 0;
            if (position instanceof TextPosition) {
                var blockInfo = this.selection.getParagraphInfo(position);
                hierarchicalIndex = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
            }
            else {
                hierarchicalIndex = position;
            }
            if (isInsertPosition) {
                this.editorHistory.currentBaseHistoryInfo.insertPosition = hierarchicalIndex;
            }
            else {
                this.editorHistory.currentBaseHistoryInfo.endPosition = hierarchicalIndex;
            }
        }
    };
    /**
     * Applies the borders based on given settings.
     * @param {BorderSettings} settings
     */
    Editor.prototype.applyBorders = function (settings) {
        this.initHistory('Borders');
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var table = startPos.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.viewer);
        if (this.editorHistory) {
            var clonedTable = this.cloneTableToHistoryInfo(table);
        }
        var startCell = startPos.paragraph.associatedCell;
        var endCell = endPos.paragraph.associatedCell;
        var cells;
        var border = this.getBorder(settings.borderColor, settings.lineWidth, settings.borderStyle);
        if (this.selection.isEmpty) {
            //Apply borders for current selected cell initially.                    
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'LeftBorder') {
                endCell.cellFormat.borders.left.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'TopBorder') {
                endCell.cellFormat.borders.top.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'RightBorder') {
                endCell.cellFormat.borders.right.copyFormat(border);
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'AllBorders' ||
                settings.type === 'BottomBorder') {
                endCell.cellFormat.borders.bottom.copyFormat(border);
            }
            if (settings.type === 'AllBorders' || settings.type === 'InsideBorders'
                || settings.type === 'InsideVerticalBorder') {
                endCell.cellFormat.borders.vertical.copyFormat(border);
            }
            if (settings.type === 'AllBorders' || settings.type === 'InsideBorders'
                || settings.type === 'InsideHorizontalBorder') {
                endCell.cellFormat.borders.horizontal.copyFormat(border);
            }
            if (settings.type === 'NoBorder') {
                this.clearAllBorderValues(endCell.cellFormat.borders);
            }
        }
        else {
            if (settings.type === 'OutsideBorders' || settings.type === 'TopBorder') {
                var selectedCell = this.getTopBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.top.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'LeftBorder') {
                var selectedCell = this.getLeftBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.left.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'RightBorder') {
                var selectedCell = this.getRightBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.right.copyFormat(border);
                }
            }
            if (settings.type === 'OutsideBorders' || settings.type === 'BottomBorder') {
                var selectedCell = this.getBottomBorderCellsOnSelection();
                for (var i = 0; i < selectedCell.length; i++) {
                    selectedCell[i].cellFormat.borders.bottom.copyFormat(border);
                }
            }
        }
        //Apply Only borders property to selected cells      
        if (settings.type === 'BottomBorder' || settings.type === 'AllBorders' || settings.type === 'OutsideBorders'
            || settings.type === 'NoBorder') {
            cells = this.getAdjacentCellToApplyBottomBorder();
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (settings.type === 'NoBorder') {
                    cell.cellFormat.borders.top.copyFormat(this.clearBorder());
                }
                else {
                    cell.cellFormat.borders.top.copyFormat(border);
                }
            }
        }
        if (settings.type === 'AllBorders' || settings.type === 'OutsideBorders' || settings.type === 'RightBorder'
            || settings.type === 'NoBorder') {
            cells = this.getAdjacentCellToApplyRightBorder();
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if (settings.type === 'NoBorder') {
                    cell.cellFormat.borders.left.copyFormat(this.clearBorder());
                }
                else {
                    cell.cellFormat.borders.left.copyFormat(border);
                }
            }
        }
        if (settings.type === 'AllBorders' || settings.type === 'NoBorder') {
            this.applyAllBorders(border, settings.type);
        }
        if (settings.type === 'InsideBorders' || settings.type === 'InsideVerticalBorder'
            || settings.type === 'InsideHorizontalBorder' || settings.type === 'NoBorder') {
            this.applyInsideBorders(border, settings.type, table);
        }
        this.updateGridForTableDialog(table, false);
        this.reLayout(this.selection, false);
        this.editorHistory.updateHistory();
    };
    Editor.prototype.applyAllBorders = function (border, borderType) {
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            if (borderType === 'NoBorder') {
                cells[i].cellFormat.borders.left.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.right.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.top.copyFormat(this.clearBorder());
                cells[i].cellFormat.borders.bottom.copyFormat(this.clearBorder());
            }
            else {
                cells[i].cellFormat.borders.left.copyFormat(border);
                cells[i].cellFormat.borders.right.copyFormat(border);
                cells[i].cellFormat.borders.top.copyFormat(border);
                cells[i].cellFormat.borders.bottom.copyFormat(border);
            }
        }
    };
    Editor.prototype.applyInsideBorders = function (border, borderType, table) {
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var isLastSelectedRow = cell.ownerRow === cells[cells.length - 1].ownerRow;
            var isLastRightCell = (cell.columnIndex + cell.cellFormat.columnSpan - 1) === cells[cells.length - 1].columnIndex;
            if (borderType === 'NoBorder') {
                cell.cellFormat.borders.right.copyFormat(this.clearBorder());
                cell.cellFormat.borders.bottom.copyFormat(this.clearBorder());
            }
            else {
                if (!isLastRightCell && borderType !== 'InsideHorizontalBorder') {
                    cell.cellFormat.borders.right.copyFormat(border);
                }
                if (!isLastSelectedRow && borderType !== 'InsideVerticalBorder') {
                    cell.cellFormat.borders.bottom.copyFormat(border);
                }
            }
            if (!isLastSelectedRow && borderType !== 'InsideVerticalBorder') {
                // Apply adjacent bottom borders.
                var nextRowIndex = cell.ownerRow.rowIndex + cell.cellFormat.rowSpan;
                var nextRow = table.childWidgets[nextRowIndex];
                if (nextRow) {
                    var selectedCells = this.getAdjacentBottomBorderOnEmptyCells(nextRow, cell, true);
                    for (var j = 0; j < selectedCells.length; j++) {
                        if (borderType === 'NoBorder') {
                            selectedCells[j].cellFormat.borders.top.copyFormat(this.clearBorder());
                        }
                        else {
                            selectedCells[j].cellFormat.borders.top.copyFormat(border);
                        }
                    }
                }
            }
            if (!isLastRightCell && borderType !== 'InsideHorizontalBorder') {
                // Apply adjacent right borders.
                var rightBorderCells = this.getSelectedCellsNextWidgets(cell, table);
                for (var k = 0; k < rightBorderCells.length; k++) {
                    if (borderType === 'NoBorder') {
                        rightBorderCells[k].cellFormat.borders.left.copyFormat(this.clearBorder());
                    }
                    else {
                        rightBorderCells[k].cellFormat.borders.left.copyFormat(border);
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.getTopBorderCellsOnSelection = function () {
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var startCell = startPos.paragraph.associatedCell;
        var topBorderCells = [];
        var cells = this.selection.getSelectedCells();
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].ownerRow === startCell.ownerRow) {
                topBorderCells.push(cells[i]);
            }
        }
        return topBorderCells;
    };
    /**
     * @private
     */
    Editor.prototype.getLeftBorderCellsOnSelection = function () {
        var startPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var startCell = startPos.paragraph.associatedCell;
        var cells = this.selection.getSelectedCells();
        var leftBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].columnIndex === startCell.columnIndex) {
                leftBorderCells.push(cells[i]);
            }
        }
        return leftBorderCells;
    };
    /**
     * @private
     */
    Editor.prototype.getRightBorderCellsOnSelection = function () {
        var cells = this.selection.getSelectedCells();
        var rightBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if ((cells[i].columnIndex + cells[i].cellFormat.columnSpan - 1) === cells[cells.length - 1].columnIndex) {
                rightBorderCells.push(cells[i]);
            }
        }
        return rightBorderCells;
    };
    /**
     * @private
     */
    Editor.prototype.getBottomBorderCellsOnSelection = function () {
        var endPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var endCell = endPos.paragraph.associatedCell;
        var cells = this.selection.getSelectedCells();
        var bottomBorderCells = [];
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].ownerRow === endCell.ownerRow) {
                bottomBorderCells.push(cells[i]);
            }
        }
        return bottomBorderCells;
    };
    /**
     * @private
     */
    Editor.prototype.clearAllBorderValues = function (borders) {
        var border = this.clearBorder();
        borders.bottom.copyFormat(border);
        borders.left.copyFormat(border);
        borders.right.copyFormat(border);
        borders.top.copyFormat(border);
        borders.vertical.copyFormat(border);
        borders.horizontal.copyFormat(border);
    };
    Editor.prototype.clearBorder = function () {
        var border = new WBorder();
        border.lineStyle = 'Cleared';
        return border;
    };
    /**
     * @private
     */
    Editor.prototype.getAdjacentCellToApplyBottomBorder = function () {
        var cells = [];
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        var table = startPos.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.viewer);
        var startCell = startPos.paragraph.associatedCell;
        var endCell = endPos.paragraph.associatedCell;
        var nextRowIndex = endCell.ownerRow.rowIndex + endCell.cellFormat.rowSpan;
        var nextRow = table.childWidgets[nextRowIndex];
        if (nextRow) {
            if (endCell.cellFormat.columnSpan > 1) {
                for (var i = endCell.columnIndex; i < endCell.columnIndex + endCell.cellFormat.columnSpan; i++) {
                    cells.push(nextRow.childWidgets[i]);
                }
            }
            else {
                cells = this.getAdjacentBottomBorderOnEmptyCells(nextRow, endCell);
                if (!this.selection.isEmpty) {
                    for (var i = 0; i < nextRow.childWidgets.length; i++) {
                        var nextCellColIndex = nextRow.childWidgets[i].columnIndex;
                        if (nextCellColIndex >= startCell.columnIndex && nextCellColIndex <= endCell.columnIndex) {
                            cells.push(nextRow.childWidgets[i]);
                        }
                    }
                }
            }
        }
        return cells;
    };
    Editor.prototype.getAdjacentBottomBorderOnEmptyCells = function (nextRow, cell, isSingleCell) {
        var cells = [];
        if (cell.cellFormat.columnSpan > 1) {
            for (var i = cell.columnIndex; i < cell.columnIndex + cell.cellFormat.columnSpan; i++) {
                cells.push(nextRow.childWidgets[i]);
            }
        }
        else {
            if (this.selection.isEmpty || isSingleCell) {
                for (var i = 0; i < nextRow.childWidgets.length; i++) {
                    if (nextRow.childWidgets[i].columnIndex === cell.columnIndex) {
                        cells.push(nextRow.childWidgets[i]);
                    }
                }
            }
        }
        return cells;
    };
    /**
     * @private
     */
    Editor.prototype.getAdjacentCellToApplyRightBorder = function () {
        var cells = [];
        var startPosIn = this.selection.start;
        var endPosIn = this.selection.end;
        if (!this.selection.isForward) {
            startPosIn = this.selection.end;
            endPosIn = this.selection.start;
        }
        var table = startPosIn.paragraph.associatedCell.ownerTable;
        table = table.combineWidget(this.viewer);
        var startCell = startPosIn.paragraph.associatedCell;
        var endCell = endPosIn.paragraph.associatedCell;
        if (this.selection.isEmpty) {
            var selectedCell = startPosIn.paragraph.associatedCell;
            cells = this.getSelectedCellsNextWidgets(selectedCell, table);
        }
        else {
            // tslint:disable-next-line:max-line-length
            var selectedCells = this.getRightBorderCellsOnSelection();
            for (var i = 0; i < selectedCells.length; i++) {
                var cell = selectedCells[i];
                cells = cells.concat(this.getSelectedCellsNextWidgets(cell, table));
            }
        }
        return cells;
    };
    Editor.prototype.getSelectedCellsNextWidgets = function (selectedCell, table) {
        var cells = [];
        if (selectedCell.nextWidget) {
            cells.push(selectedCell.nextWidget);
        }
        if (selectedCell.cellFormat.rowSpan > 1) {
            var nextRowIndex = selectedCell.ownerRow.rowIndex + selectedCell.cellFormat.rowSpan;
            for (var i = selectedCell.ownerRow.rowIndex + 1; i < nextRowIndex; i++) {
                var nextRow = table.childWidgets[i];
                if (nextRow) {
                    for (var j = 0; j < nextRow.childWidgets.length; j++) {
                        if (nextRow.childWidgets[j].columnIndex ===
                            selectedCell.nextWidget.columnIndex) {
                            cells.push(nextRow.childWidgets[j]);
                        }
                    }
                }
            }
        }
        return cells;
    };
    /**
     * @private
     */
    Editor.prototype.getBorder = function (borderColor, lineWidth, borderStyle) {
        var border = new WBorder();
        border.color = borderColor || '#000000';
        border.lineWidth = lineWidth || 1;
        border.lineStyle = borderStyle || 'Single';
        return border;
    };
    /**
     * Applies borders
     * @param  {WBorders} sourceBorders
     * @param  {WBorders} applyBorders
     * @private
     */
    Editor.prototype.applyBordersInternal = function (sourceBorders, applyBorders) {
        if (!isNullOrUndefined(sourceBorders) && !isNullOrUndefined(sourceBorders)) {
            if (!isNullOrUndefined(sourceBorders.top)) {
                this.applyBorder(sourceBorders.top, applyBorders.top);
            }
            if (!isNullOrUndefined(sourceBorders.bottom)) {
                this.applyBorder(sourceBorders.bottom, applyBorders.bottom);
            }
            if (!isNullOrUndefined(sourceBorders.left)) {
                this.applyBorder(sourceBorders.left, applyBorders.left);
            }
            if (!isNullOrUndefined(sourceBorders.right)) {
                this.applyBorder(sourceBorders.right, applyBorders.right);
            }
            if (!isNullOrUndefined(sourceBorders.horizontal)) {
                this.applyBorder(sourceBorders.horizontal, applyBorders.horizontal);
            }
            if (!isNullOrUndefined(sourceBorders.vertical)) {
                this.applyBorder(sourceBorders.vertical, applyBorders.vertical);
            }
            if (!isNullOrUndefined(sourceBorders.diagonalUp)) {
                this.applyBorder(sourceBorders.diagonalUp, applyBorders.diagonalUp);
            }
            if (!isNullOrUndefined(sourceBorders.diagonalDown)) {
                this.applyBorder(sourceBorders.diagonalDown, applyBorders.diagonalDown);
            }
        }
    };
    /**
     * Apply shading to table
     * @param  {WShading} sourceShading
     * @param  {WShading} applyShading
     * @private
     */
    Editor.prototype.applyShading = function (sourceShading, applyShading) {
        if (!isNullOrUndefined(applyShading) && !isNullOrUndefined(sourceShading)) {
            if (!isNullOrUndefined(applyShading.backgroundColor)
                && sourceShading.backgroundColor !== applyShading.backgroundColor) {
                sourceShading.backgroundColor = applyShading.backgroundColor;
            }
            if (!isNullOrUndefined(applyShading.foregroundColor)
                && sourceShading.foregroundColor !== applyShading.foregroundColor) {
                sourceShading.foregroundColor = applyShading.foregroundColor;
            }
            if (!isNullOrUndefined(applyShading.textureStyle)
                && sourceShading.textureStyle !== applyShading.textureStyle) {
                sourceShading.textureStyle = applyShading.textureStyle;
            }
        }
    };
    Editor.prototype.applyBorder = function (sourceBorder, applyBorder) {
        if (!isNullOrUndefined(sourceBorder) && !isNullOrUndefined(applyBorder)) {
            if (!isNullOrUndefined(applyBorder.color)
                && sourceBorder.color !== applyBorder.color) {
                sourceBorder.color = applyBorder.color;
            }
            if (!isNullOrUndefined(applyBorder.lineStyle)
                && sourceBorder.lineStyle !== applyBorder.lineStyle) {
                sourceBorder.lineStyle = applyBorder.lineStyle;
            }
            if (!isNullOrUndefined(applyBorder.lineWidth)
                && sourceBorder.lineWidth !== applyBorder.lineWidth) {
                sourceBorder.lineWidth = applyBorder.lineWidth;
            }
            if (!isNullOrUndefined(applyBorder.shadow)
                && sourceBorder.shadow !== applyBorder.shadow) {
                sourceBorder.shadow = applyBorder.shadow;
            }
            if (!isNullOrUndefined(applyBorder.space)
                && sourceBorder.space !== applyBorder.space) {
                sourceBorder.space = applyBorder.space;
            }
        }
    };
    /**
     * Apply Table Format changes
     * @param  {Selection} selection
     * @param  {WTableFormat} format
     * @private
     */
    Editor.prototype.onTableFormat = function (format, isShading) {
        if (!isNullOrUndefined(this.selection.tableFormat)) {
            if (isNullOrUndefined(isShading)) {
                isShading = false;
            }
            this.viewer.owner.isShiftingEnabled = true;
            this.editorHistory.initializeHistory('TableFormat');
            var table = this.selection.start.paragraph.associatedCell.ownerTable.combineWidget(this.viewer);
            if (isShading) {
                for (var i = 0; i < table.childWidgets.length; i++) {
                    var rowWidget = table.childWidgets[i];
                    for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                        var cellWidget = rowWidget.childWidgets[j];
                        cellWidget.cellFormat.shading.copyFormat(format.shading);
                    }
                }
            }
            this.applyTableFormat(table, undefined, format);
            this.reLayout(this.selection, false);
        }
    };
    /**
     * @private
     */
    Editor.prototype.applyTableFormat = function (table, property, value) {
        this.applyTablePropertyValue(this.viewer.selection, undefined, value, table);
    };
    // tslint:disable-next-line:max-line-length
    Editor.prototype.applyTablePropertyValue = function (selection, property, value, table) {
        var sourceFormat = table.tableFormat;
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedTableProperties(sourceFormat, property, value);
        }
        if (value instanceof WTableFormat) {
            if (isNullOrUndefined(property)) {
                this.handleTableFormat(sourceFormat, value);
            }
            return;
        }
        if (property === 'preferredWidth') {
            sourceFormat.preferredWidth = value;
        }
        else if (property === 'leftIndent') {
            sourceFormat.leftIndent = value;
        }
        else if (property === 'tableAlignment') {
            sourceFormat.tableAlignment = value;
        }
        else if (property === 'cellSpacing') {
            sourceFormat.cellSpacing = value;
        }
        else if (property === 'leftMargin') {
            sourceFormat.leftMargin = value;
        }
        else if (property === 'rightMargin') {
            sourceFormat.rightMargin = value;
        }
        else if (property === 'topMargin') {
            sourceFormat.topMargin = value;
        }
        else if (property === 'bottomMargin') {
            sourceFormat.bottomMargin = value;
        }
        else if (property === 'preferredWidthType') {
            sourceFormat.preferredWidthType = value;
        }
        else if (property === 'bidi') {
            sourceFormat.bidi = value;
        }
        if (property === 'shading') {
            sourceFormat.shading = value;
        }
        else if (property === 'borders') {
            sourceFormat.borders = value;
        }
        // if (!isNullOrUndefined(table)) {
        //     this.layoutItemBlock(table, true);
        // }
    };
    Editor.prototype.handleTableFormat = function (tableFormat, applyFormat) {
        if (this.isBordersAndShadingDialog || this.editorHistory.isUndoing
            || this.editorHistory.isRedoing) {
            if (!isNullOrUndefined(tableFormat.borders)) {
                this.applyBordersInternal(tableFormat.borders, applyFormat.borders);
            }
            if (!isNullOrUndefined(tableFormat.shading)) {
                this.applyShading(tableFormat.shading, applyFormat.shading);
            }
        }
        if (!this.isBordersAndShadingDialog) {
            if (applyFormat.hasValue('bidi') && applyFormat.bidi !== tableFormat.bidi) {
                tableFormat.bidi = applyFormat.bidi;
            }
            if (applyFormat.hasValue('preferredWidth') && applyFormat.preferredWidth !== tableFormat.preferredWidth) {
                tableFormat.preferredWidth = applyFormat.preferredWidth;
            }
            if (applyFormat.hasValue('preferredWidthType') && applyFormat.preferredWidthType !== tableFormat.preferredWidthType) {
                tableFormat.preferredWidthType = applyFormat.preferredWidthType;
            }
            if (applyFormat.hasValue('tableAlignment') && applyFormat.tableAlignment !== tableFormat.tableAlignment) {
                tableFormat.tableAlignment = applyFormat.tableAlignment;
            }
            if (applyFormat.hasValue('leftIndent') && applyFormat.leftIndent !== tableFormat.leftIndent) {
                tableFormat.leftIndent = applyFormat.leftIndent;
            }
        }
        this.updateGridForTableDialog(tableFormat.ownerBase, false);
    };
    Editor.prototype.updateGridForTableDialog = function (table, shiftNextItem) {
        if (table.tableHolder) {
            table.updateRowIndex(0);
            table.calculateGrid();
            table.isGridUpdated = false;
        }
        this.viewer.layout.reLayoutTable(table);
    };
    /**
     * Applies Row Format Changes
     * @param  {Selection} selection
     * @param  {WRowFormat} format
     * @param  {WRow} row
     * @private
     */
    Editor.prototype.onRowFormat = function (format) {
        if (isNullOrUndefined(this.selection) || isNullOrUndefined(format)) {
            return;
        }
        this.editorHistory.initializeHistory('RowFormat');
        this.viewer.owner.isShiftingEnabled = true;
        var rowStartPos = this.selection.isForward ? this.selection.start : this.selection.end;
        var rowEndPos = this.selection.isForward ? this.selection.end : this.selection.start;
        var table = rowStartPos.paragraph.associatedCell.ownerTable.combineWidget(this.viewer);
        this.applyRowFormat(rowStartPos.paragraph.associatedCell.ownerRow, rowStartPos, rowEndPos, undefined, format);
        this.reLayout(this.selection, false);
    };
    Editor.prototype.applyRowFormat = function (row, start, end, property, value) {
        this.applyRowPropertyValue(this.viewer.selection, property, value, row);
        if (end.paragraph.associatedCell.ownerRow === row) {
            return;
        }
        var newRow = row.nextWidget;
        if (!isNullOrUndefined(newRow)) {
            this.applyRowFormat(newRow, start, end, property, value);
        }
    };
    Editor.prototype.applyRowPropertyValue = function (selection, property, value, row) {
        var applyFormat = row.rowFormat;
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedRowProperties(applyFormat, property, value);
        }
        if (value instanceof WRowFormat) {
            if (isNullOrUndefined(property)) {
                this.handleRowFormat(value, applyFormat);
            }
            return;
        }
        if (property === 'heightType') {
            applyFormat.heightType = value;
        }
        else if (property === 'height') {
            applyFormat.height = value;
        }
        else if (property === 'isHeader') {
            applyFormat.isHeader = value;
        }
        else if (property === 'allowBreakAcrossPages') {
            applyFormat.allowBreakAcrossPages = value;
        }
        if (!isNullOrUndefined(row.ownerTable)) {
            this.layoutItemBlock(row.ownerTable, true);
        }
    };
    Editor.prototype.handleRowFormat = function (format, applyFormat) {
        if (format.hasValue('allowBreakAcrossPages') && format.allowBreakAcrossPages !== applyFormat.allowBreakAcrossPages) {
            applyFormat.allowBreakAcrossPages = format.allowBreakAcrossPages;
        }
        if (format.hasValue('isHeader') && format.isHeader !== applyFormat.isHeader) {
            applyFormat.isHeader = format.isHeader;
        }
        if (format.hasValue('heightType') && format.heightType !== applyFormat.heightType) {
            applyFormat.heightType = format.heightType;
        }
        if (format.hasValue('height') && format.height !== applyFormat.height) {
            applyFormat.height = format.height;
        }
        this.updateGridForTableDialog(applyFormat.ownerBase.ownerTable, true);
    };
    /**
     * Applies Cell Format changes
     * @param  {Selection} selection
     * @param  {WCellFormat} format
     * @param  {WCell} cell
     * @private
     */
    Editor.prototype.onCellFormat = function (format) {
        if (isNullOrUndefined(this.selection) || isNullOrUndefined(format)) {
            return;
        }
        this.editorHistory.initializeHistory('CellFormat');
        this.updateFormatForCell(this.selection, undefined, format);
        this.reLayout(this.selection, false);
    };
    /**
     * @private
     */
    Editor.prototype.updateCellMargins = function (selection, value) {
        var cellStartPosition = selection.start;
        var cellEndPosition = selection.end;
        if (!selection.isForward) {
            cellStartPosition = selection.end;
            cellEndPosition = selection.start;
        }
        this.initHistoryPosition(selection, cellStartPosition);
        // tslint:disable-next-line:max-line-length
        this.viewer.owner.cellOptionsDialogModule.applyCellmarginsValue(cellStartPosition.paragraph.associatedCell.ownerRow, cellStartPosition, cellEndPosition, value);
    };
    /**
     * @private
     */
    Editor.prototype.updateFormatForCell = function (selection, property, value) {
        var start = selection.start;
        var end = selection.end;
        if (!selection.isForward) {
            start = selection.end;
            end = selection.start;
        }
        var startCell = start.paragraph.associatedCell;
        var endCell = end.paragraph.associatedCell;
        var cells;
        var table = startCell.ownerTable.combineWidget(this.viewer);
        var appliedFormat;
        for (var k = startCell.columnIndex; k <= endCell.columnIndex; k++) {
            cells = this.getSelectedCellInColumn(startCell.ownerTable, startCell.ownerRow.rowIndex, k, endCell.ownerRow.rowIndex);
            for (var i = 0; i < cells.length; i++) {
                appliedFormat = this.applyCellPropertyValue(this.viewer.selection, property, value, cells[i].cellFormat);
            }
        }
        this.updateGridForTableDialog(table, false);
    };
    /**
     * @private
     */
    Editor.prototype.getSelectedCellInColumn = function (table, rowStartIndex, columnIndex, rowEndIndex) {
        var cells = [];
        for (var i = rowStartIndex; i <= rowEndIndex; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                if (row.childWidgets[j].columnIndex === columnIndex) {
                    cells.push(row.childWidgets[j]);
                }
            }
        }
        return cells;
    };
    Editor.prototype.getColumnCells = function (table, columnIndex, isLeftSideCollection) {
        var cells = [];
        for (var k = 0; k < table.childWidgets.length; k++) {
            var row = table.childWidgets[k];
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                if (isLeftSideCollection) {
                    if (cell.columnIndex + cell.cellFormat.columnSpan === columnIndex) {
                        cells.push(cell);
                    }
                }
                else {
                    if (cell.columnIndex === columnIndex) {
                        cells.push(cell);
                    }
                }
            }
        }
        return cells;
    };
    /**
     * @private
     */
    Editor.prototype.getTableWidth = function (table) {
        if (table.tableFormat.preferredWidth !== 0 || table.tableFormat.preferredWidthType === 'Percent') {
            if (table.tableFormat.preferredWidthType === 'Auto' || table.tableFormat.preferredWidthType === 'Point') {
                return table.tableFormat.preferredWidth;
            }
            else {
                if (table.tableFormat.preferredWidth === 0) {
                    return 0;
                }
                else {
                    return HelperMethods.convertPixelToPoint(this.viewer.clientArea.width) / 100 * table.tableFormat.preferredWidth;
                }
            }
        }
        return HelperMethods.convertPixelToPoint(this.viewer.layout.getTableWidth(table));
    };
    Editor.prototype.applyCellPropertyValue = function (selection, property, value, applyFormat) {
        if (!isNullOrUndefined(this.editorHistory.currentBaseHistoryInfo)) {
            value = this.editorHistory.currentBaseHistoryInfo.addModifiedCellProperties(applyFormat, property, value);
        }
        if (value instanceof WCellFormat) {
            if (isNullOrUndefined(property)) {
                this.handleCellFormat(value, applyFormat);
            }
            return value;
        }
        if (property === 'leftMargin') {
            applyFormat.leftMargin = value;
        }
        else if (property === 'topMargin') {
            applyFormat.topMargin = value;
        }
        else if (property === 'rightMargin') {
            applyFormat.rightMargin = value;
        }
        else if (property === 'bottomMargin') {
            applyFormat.bottomMargin = value;
        }
        else if (property === 'preferredWidth') {
            applyFormat.preferredWidth = value;
            applyFormat.cellWidth = value;
        }
        else if (property === 'cellWidth') {
            applyFormat.cellWidth = value;
        }
        else if (property === 'columnSpan') {
            applyFormat.columnSpan = value;
        }
        else if (property === 'rowSpan') {
            applyFormat.rowSpan = value;
        }
        else if (property === 'preferredWidthType') {
            applyFormat.preferredWidthType = value;
        }
        else if (property === 'verticalAlignment') {
            applyFormat.verticalAlignment = value;
        }
        if (property === 'shading') {
            applyFormat.shading = value;
        }
        else if (property === 'borders') {
            applyFormat.borders = value;
        }
        return undefined;
    };
    Editor.prototype.handleCellFormat = function (cellFormat, applyFormat) {
        if (!isNullOrUndefined(cellFormat) && !isNullOrUndefined(applyFormat)) {
            if (this.isBordersAndShadingDialog) {
                if (!isNullOrUndefined(cellFormat.borders)) {
                    this.applyBordersInternal(applyFormat.borders, cellFormat.borders);
                }
                if (!isNullOrUndefined(cellFormat.shading)) {
                    this.applyShading(applyFormat.shading, cellFormat.shading);
                }
                // this.layoutRow((applyFormat.ownerBase as TableCellWidget).ownerRow, this.viewer, false);
            }
            else {
                if (cellFormat.hasValue('preferredWidth') && applyFormat.preferredWidth !== cellFormat.preferredWidth) {
                    applyFormat.preferredWidth = cellFormat.preferredWidth;
                }
                if (cellFormat.hasValue('preferredWidthType') && applyFormat.preferredWidthType !== cellFormat.preferredWidthType) {
                    applyFormat.preferredWidthType = cellFormat.preferredWidthType;
                }
                if (cellFormat.hasValue('verticalAlignment') && applyFormat.verticalAlignment !== cellFormat.verticalAlignment) {
                    applyFormat.verticalAlignment = cellFormat.verticalAlignment;
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.destroy = function () {
        this.viewer = undefined;
        this.nodes = [];
    };
    Editor.prototype.isTocField = function (element) {
        if (element instanceof FieldElementBox) {
            var nextElement = element.nextNode;
            if (element instanceof FieldElementBox && element.fieldType === 0 && nextElement instanceof TextElementBox
                && nextElement.text.trim().toLowerCase().indexOf('toc') === 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * Updates the table of contents.
     * @private
     */
    Editor.prototype.updateToc = function (tocField) {
        if (isNullOrUndefined(tocField)) {
            tocField = this.selection.getTocFieldInternal();
        }
        if (!this.isTocField(tocField)) {
            return;
        }
        // Decode field code to get parameters
        var code = this.selection.getFieldCode(tocField);
        if (code.toLocaleLowerCase().indexOf('toc') !== -1) {
            this.insertTableOfContents(this.validateTocSettings(this.getTocSettings(code, tocField)));
        }
    };
    Editor.prototype.getTocSettings = function (code, tocField) {
        var tocSettings = {};
        tocSettings.includePageNumber = true;
        tocSettings.rightAlign = true;
        // Decode field code to get parameters
        if (code.toLowerCase() === 'toc \\mergeformat') {
            tocSettings.startLevel = 1;
            tocSettings.endLevel = 3;
        }
        else {
            var swtiches = code.split('\\');
            for (var i = 0; i < swtiches.length; i++) {
                var swtch = swtiches[i];
                if (swtch.length === 0) {
                    continue;
                }
                switch (swtch[0]) {
                    case 'o':
                        if (!isNullOrUndefined(swtch.match(/\d+/g))) {
                            var levels = swtch.match(/\d+/g).map(Number);
                            tocSettings.startLevel = levels[0];
                            tocSettings.endLevel = levels[1];
                        }
                        else {
                            tocSettings.startLevel = 1;
                            tocSettings.endLevel = 9;
                        }
                        break;
                    case 'h':
                        tocSettings.includeHyperlink = true;
                        break;
                    case 'n':
                        tocSettings.includePageNumber = false;
                        break;
                    case 'p':
                        tocSettings.rightAlign = false;
                        break;
                    case 'u':
                        tocSettings.includeOutlineLevels = true;
                        break;
                    case 't':
                        this.decodeTSwitch(tocSettings, swtch);
                        break;
                }
            }
        }
        //assigns tab leader.
        var tabs = tocField.paragraph.paragraphFormat.getUpdatedTabs();
        if (tabs.length > 0) {
            tocSettings.tabLeader = tabs[tabs.length - 1].tabLeader;
        }
        if (tocSettings.rightAlign && isNullOrUndefined(tocSettings.tabLeader)) {
            tocSettings.tabLeader = 'Dot';
        }
        return tocSettings;
    };
    Editor.prototype.decodeTSwitch = function (tocSettings, tSwitch) {
        tocSettings.levelSettings = {};
        tSwitch = tSwitch.replace('t', '');
        tSwitch = tSwitch.replace('"', '');
        tSwitch = tSwitch.replace('"', '');
        tSwitch = tSwitch.trim();
        var levels = tSwitch.split(',');
        for (var index = 0; index < levels.length; index++) {
            tocSettings.levelSettings[levels[index]] = parseInt(levels[index + 1], 10);
            index++;
        }
    };
    /**
     * Inserts, modifies or updates the table of contents based on given settings.
     * @param {TableOfContentsSettings} tableOfContentsSettings
     */
    Editor.prototype.insertTableOfContents = function (tableOfContentsSettings) {
        this.isInsertingTOC = true;
        this.initComplexHistory('TOC');
        if (isNullOrUndefined(tableOfContentsSettings)) {
            //Initializes with default value.
            tableOfContentsSettings = {};
            tableOfContentsSettings.startLevel = 1;
            tableOfContentsSettings.endLevel = 3;
            tableOfContentsSettings.includeHyperlink = true;
            tableOfContentsSettings.includeOutlineLevels = true;
            tableOfContentsSettings.includePageNumber = true;
            tableOfContentsSettings.rightAlign = true;
            tableOfContentsSettings.tabLeader = 'Dot';
        }
        var tocField = undefined;
        var code = undefined;
        if (this.selection.contextType === 'TableOfContents') {
            tocField = this.selection.getTocFieldInternal();
        }
        if (tocField instanceof FieldElementBox) {
            this.selection.start.setPositionForSelection(tocField.line, tocField, 0, this.selection.start.location);
            this.selection.end.setPositionForSelection(tocField.fieldEnd.line, tocField.fieldEnd, 2, this.selection.end.location);
            this.onDelete();
        }
        // Build TOC field code based on parameter
        code = this.constructTocFieldCode(tableOfContentsSettings);
        var isStartParagraph = this.selection.start.isAtParagraphStart;
        var blockInfo = this.selection.getParagraphInfo(this.selection.start);
        var initialStart = this.selection.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        // Build TOC fields
        // tslint:disable-next-line:max-line-length
        var widgets = this.buildToc(this.validateTocSettings(tableOfContentsSettings), code, true, isStartParagraph);
        if (widgets.length > 0) {
            var tocLastPara = new ParagraphWidget();
            var tocLastLine = new LineWidget(tocLastPara);
            tocLastPara.childWidgets.push(tocLastLine);
            var index = 0;
            if (!isStartParagraph) {
                index = 1;
            }
            var line = widgets[index].childWidgets[0];
            var fieldBegin = line.children[0];
            this.appendEndField(fieldBegin, tocLastLine);
            widgets.push(tocLastPara);
            this.appendEmptyPara(widgets);
        }
        this.setPositionForCurrentIndex(this.selection.start, initialStart);
        this.selection.end.setPositionInternal(this.selection.start);
        this.pasteContentsInternal(widgets);
        this.isInsertingTOC = false;
        this.updatePageRef();
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
        }
    };
    Editor.prototype.appendEmptyPara = function (widgets) {
        var emptyPara = new ParagraphWidget();
        var emptyLine = new LineWidget(emptyPara);
        emptyPara.childWidgets.push(emptyLine);
        widgets.push(emptyPara);
    };
    Editor.prototype.constructTocFieldCode = function (tocSettings) {
        var tocFieldCode = 'TOC';
        //appends styles level
        // tslint:disable-next-line:max-line-length
        if (!isNullOrUndefined(tocSettings.startLevel) && tocSettings.startLevel !== 0 && !isNullOrUndefined(tocSettings.endLevel) && tocSettings.endLevel !== 0) {
            tocFieldCode = tocFieldCode + ' \\o "' + tocSettings.startLevel + '-' + tocSettings.endLevel + '"';
        }
        if (tocSettings.includePageNumber && !tocSettings.rightAlign) {
            tocFieldCode = tocFieldCode + ' \\p " "';
        }
        if (!tocSettings.includePageNumber) {
            tocFieldCode = tocFieldCode + ' \\n';
        }
        if (tocSettings.includeHyperlink) {
            tocFieldCode = tocFieldCode + ' \\h \\z';
        }
        if (tocSettings.includeOutlineLevels) {
            tocFieldCode = tocFieldCode + ' \\u';
        }
        var tSwitch = this.constructTSwitch(tocSettings);
        if (tSwitch.length > 6) {
            tocFieldCode = tocFieldCode + tSwitch;
        }
        return tocFieldCode;
    };
    Editor.prototype.constructTSwitch = function (tocSettings) {
        var tSwitch = '';
        var prefix = ' \\t ';
        if (!isNullOrUndefined(tocSettings.levelSettings)) {
            for (var _i = 0, _a = Object.keys(tocSettings.levelSettings); _i < _a.length; _i++) {
                var key = _a[_i];
                tSwitch = tSwitch + key + ',' + tocSettings.levelSettings[key].toString() + ',';
            }
        }
        tSwitch = tSwitch.slice(0, -1);
        tSwitch = prefix + '"' + tSwitch + '"';
        return tSwitch;
    };
    /**
     * Appends the end filed to the given line.
     */
    Editor.prototype.appendEndField = function (fieldBegin, lineWidget) {
        var fieldEnd = new FieldElementBox(1);
        fieldEnd.fieldSeparator = fieldBegin.fieldSeparator;
        fieldBegin.fieldSeparator.fieldEnd = fieldEnd;
        fieldEnd.fieldBegin = fieldBegin;
        fieldEnd.fieldBegin.fieldEnd = fieldEnd;
        fieldEnd.line = lineWidget;
        lineWidget.children.push(fieldEnd);
    };
    Editor.prototype.validateTocSettings = function (tocSettings) {
        if (isNullOrUndefined(tocSettings.startLevel) || tocSettings.startLevel < 1) {
            tocSettings.startLevel = 1;
        }
        if (isNullOrUndefined(tocSettings.endLevel) || tocSettings.endLevel < tocSettings.endLevel) {
            tocSettings.endLevel = tocSettings.startLevel > 3 ? tocSettings.startLevel : 3;
        }
        if (isNullOrUndefined(tocSettings.includeHyperlink)) {
            tocSettings.includeHyperlink = false;
        }
        if (isNullOrUndefined(tocSettings.includePageNumber)) {
            tocSettings.includePageNumber = false;
        }
        if (isNullOrUndefined(tocSettings.rightAlign)) {
            tocSettings.rightAlign = false;
        }
        if (isNullOrUndefined(tocSettings.levelSettings)) {
            tocSettings.levelSettings = {};
        }
        return tocSettings;
    };
    /**
     * Builds the TOC
     * @private
     */
    // tslint:disable-next-line:max-line-length
    Editor.prototype.buildToc = function (tocSettings, fieldCode, isFirstPara, isStartParagraph) {
        var tocDomBody = this.viewer.pages[0].bodyWidgets[0];
        var widgets = [];
        this.createHeadingLevels(tocSettings);
        if (tocSettings.includeOutlineLevels) {
            this.createOutlineLevels(tocSettings);
        }
        var sectionFormat = this.selection.start.paragraph.bodyWidget.sectionFormat;
        var widget = tocDomBody.childWidgets[0];
        while (widget !== undefined) {
            // tslint:disable-next-line:max-line-length
            if (widget instanceof ParagraphWidget && (this.isHeadingStyle(widget) || (tocSettings.includeOutlineLevels && this.isOutlineLevelStyle(widget)))) {
                var bookmarkName = this.insertTocBookmark(widget);
                // tslint:disable-next-line:max-line-length
                this.createTOCWidgets(widget, widgets, fieldCode, bookmarkName, tocSettings, isFirstPara, isStartParagraph, sectionFormat);
                isFirstPara = false;
            }
            widget = this.selection.getNextParagraphBlock(widget.getSplitWidgets().pop());
        }
        this.tocStyles = {};
        return widgets;
    };
    Editor.prototype.createOutlineLevels = function (settings) {
        for (var i = settings.startLevel; i <= settings.endLevel; i++) {
            var levelStyle = 'Level' + i.toString();
            if (isNullOrUndefined(this.tocStyles[levelStyle])) {
                this.tocStyles[levelStyle] = i;
            }
        }
    };
    /**
     * Creates TOC heading styles
     * @param start - lower heading level
     * @param end - higher heading level
     */
    Editor.prototype.createHeadingLevels = function (settings) {
        var normalStyle = 'Normal';
        for (var i = settings.startLevel; i <= settings.endLevel; i++) {
            var headingStyle = 'Heading ' + i.toString();
            if (isNullOrUndefined(this.tocStyles[headingStyle])) {
                this.tocStyles[headingStyle] = i;
            }
        }
        if (!isNullOrUndefined(settings.levelSettings)) {
            for (var _i = 0, _a = Object.keys(settings.levelSettings); _i < _a.length; _i++) {
                var key = _a[_i];
                this.tocStyles[key] = settings.levelSettings[key];
            }
        }
    };
    /**
     * Checks the current style is heading style.
     */
    Editor.prototype.isHeadingStyle = function (para) {
        var style = para.paragraphFormat.baseStyle;
        if (style !== undefined) {
            return isNullOrUndefined(this.tocStyles[style.name]) ? false : true;
        }
        return false;
    };
    Editor.prototype.isOutlineLevelStyle = function (para) {
        var styleName = para.paragraphFormat.outlineLevel;
        return isNullOrUndefined(this.tocStyles[styleName]) ? false : true;
    };
    /**
     * Creates TOC field element.
     */
    Editor.prototype.createTocFieldElement = function (lineWidget, fieldCode) {
        //begin
        var fieldBegin = new FieldElementBox(0);
        fieldBegin.hasFieldEnd = true;
        fieldBegin.line = lineWidget;
        lineWidget.children.push(fieldBegin);
        //format toc
        var textElement = new TextElementBox();
        textElement.text = fieldCode;
        textElement.line = lineWidget;
        lineWidget.children.push(textElement);
        //field separator
        var fieldSeparator = new FieldElementBox(2);
        fieldSeparator.fieldBegin = fieldBegin;
        fieldSeparator.fieldBegin.fieldSeparator = fieldSeparator;
        fieldSeparator.line = lineWidget;
        lineWidget.children.push(fieldSeparator);
        return fieldBegin;
    };
    /**
     * Updates TOC para
     */
    // tslint:disable-next-line:max-line-length
    Editor.prototype.createTOCWidgets = function (widget, widgets, fieldCode, bookmarkName, tocSettings, isFirstPara, isStartParagraph, sectionFormat) {
        var fieldBegin = undefined;
        var tocPara = undefined;
        var tocLine = undefined;
        // tslint:disable-next-line:max-line-length
        if (widgets.length === 1 && widgets[0].childWidgets[0].children.length === 3 && !isNullOrUndefined(isFirstPara) && !isFirstPara) {
            tocLine = widgets[0].childWidgets[0];
        }
        else {
            tocPara = new ParagraphWidget();
            var styleName = undefined;
            //Adds toc syles into paragraph
            var headingStyleName = widget.paragraphFormat.baseStyle.name;
            if (tocSettings.includeOutlineLevels && isNullOrUndefined(this.tocStyles[headingStyleName])) {
                styleName = widget.paragraphFormat.outlineLevel;
            }
            else {
                styleName = headingStyleName;
            }
            var tocStyleName = 'Toc' + this.tocStyles[styleName];
            var paraStyle = this.viewer.styles.findByName(tocStyleName, 'Paragraph');
            if (isNullOrUndefined(paraStyle)) {
                // tslint:disable-next-line:max-line-length
                this.viewer.owner.parser.parseStyle(JSON.parse(this.getCompleteStyles()), JSON.parse(this.viewer.preDefinedStyles.get(tocStyleName)), this.viewer.styles);
                paraStyle = this.viewer.styles.findByName(tocStyleName, 'Paragraph');
            }
            tocPara.paragraphFormat.ApplyStyle(paraStyle);
            //Creates right tab for page number.
            if (tocSettings.rightAlign && tocSettings.includePageNumber) {
                var tabStop = new WTabStop();
                tabStop.position = sectionFormat.pageWidth - (sectionFormat.leftMargin + sectionFormat.rightMargin);
                tabStop.tabLeader = tocSettings.tabLeader;
                tabStop.deletePosition = 0;
                tabStop.tabJustification = 'Right';
                tocPara.paragraphFormat.tabs.push(tabStop);
            }
            tocLine = new LineWidget(tocPara);
            tocPara.childWidgets.push(tocLine);
        }
        //creates toc field element if it is insert
        if ((isFirstPara !== undefined) && isFirstPara) {
            if (!isNullOrUndefined(isStartParagraph) && !isStartParagraph) {
                this.appendEmptyPara(widgets);
            }
            this.createTocFieldElement(tocLine, fieldCode);
        }
        var text = '';
        var isFieldCode = false;
        var paragraph = widget;
        while (paragraph instanceof ParagraphWidget) {
            for (var lineIndex = 0; lineIndex < paragraph.childWidgets.length; lineIndex++) {
                var lineWidget = paragraph.childWidgets[lineIndex];
                for (var elementIndex = 0; elementIndex < lineWidget.children.length; elementIndex++) {
                    var element = lineWidget.children[elementIndex];
                    if (element.isPageBreak) {
                        continue;
                    }
                    if ((element instanceof FieldElementBox) || (element instanceof BookmarkElementBox) || isFieldCode) {
                        if (element instanceof FieldElementBox) {
                            if (element.fieldType === 0) {
                                isFieldCode = true;
                            }
                            else if (element.fieldType === 2) {
                                isFieldCode = false;
                            }
                        }
                    }
                    else if (element instanceof TextElementBox || element instanceof ListTextElementBox) {
                        var temp = element.text;
                        var tabChar = '\t';
                        if (temp.indexOf(tabChar) !== -1) {
                            temp = temp.replace(new RegExp(tabChar, 'g'), ' ');
                        }
                        text = text + temp;
                    }
                }
            }
            paragraph = paragraph.nextSplitWidget;
        }
        if (text !== '') {
            // inserts hyperlink
            if (tocSettings.includeHyperlink && (bookmarkName !== undefined)) {
                fieldBegin = this.insertTocHyperlink(tocLine, bookmarkName, text);
            }
            else {
                var span = new TextElementBox();
                span.text = text;
                span.line = tocLine;
                tocLine.children.push(span);
            }
            //inserts page number
            if (tocSettings.includePageNumber && (bookmarkName !== undefined)) {
                if (tocSettings.rightAlign) {
                    var tabText = new TabElementBox();
                    tabText.text = '\t';
                    tabText.line = tocLine;
                    tocLine.children.push(tabText);
                }
                var pageField = this.insertTocPageNumber(bookmarkName, tocLine, tocSettings.rightAlign, widget);
                this.appendEndField(pageField, tocLine);
            }
            if (tocSettings.includeHyperlink && fieldBegin !== undefined) {
                this.appendEndField(fieldBegin, tocLine);
            }
        }
        if (!isNullOrUndefined(tocPara) && (text !== '' || isFirstPara)) {
            widgets.push(tocPara);
        }
    };
    /**
     * Inserts toc hyperlink.
     */
    Editor.prototype.insertTocHyperlink = function (lineWidget, bookmarkName, text) {
        var fieldCode = ' HYPERLINK \\l \"' + bookmarkName + '\" ';
        var fieldBegin = this.createTocFieldElement(lineWidget, fieldCode);
        //text element.
        var span = new TextElementBox();
        span.text = text;
        span.line = lineWidget;
        lineWidget.children.push(span);
        return fieldBegin;
    };
    /**
     * Inserts toc page number.
     */
    // tslint:disable-next-line:max-line-length
    Editor.prototype.insertTocPageNumber = function (bookMarkname, lineWidget, isRightAlign, widget) {
        var fieldCode = ' PAGEREF' + bookMarkname + ' \\h ';
        var fieldBegin = this.createTocFieldElement(lineWidget, fieldCode);
        var text = (this.viewer.pages.indexOf(widget.bodyWidget.page) + 1).toString();
        //text element.
        var span = new FieldTextElementBox();
        span.fieldBegin = fieldBegin;
        if (!isRightAlign) {
            text = ' ' + text;
        }
        span.text = text;
        span.line = lineWidget;
        lineWidget.children.push(span);
        this.pageRefFields[bookMarkname] = span;
        return fieldBegin;
    };
    Editor.prototype.updatePageRef = function () {
        for (var _i = 0, _a = Object.keys(this.pageRefFields); _i < _a.length; _i++) {
            var key = _a[_i];
            var bookmark = this.viewer.bookmarks.get(key);
            var pageRef = (bookmark.paragraph.bodyWidget.page.index + 1).toString();
            var span = this.pageRefFields[key];
            if (pageRef !== span.text) {
                span.text = pageRef;
                var paragraph = span.paragraph;
                var lineIndex = paragraph.childWidgets.indexOf(span.line);
                var elementIndex = span.line.children.indexOf(span);
                this.viewer.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
            }
        }
    };
    /**
     * Inserts toc bookmark.
     */
    Editor.prototype.insertTocBookmark = function (widget) {
        var bookmarkName = undefined;
        var lineLength = widget.childWidgets.length;
        if (lineLength > 0) {
            var splitParagraph = widget.getSplitWidgets();
            var firstParagraph = splitParagraph[0];
            var lastParagraph = splitParagraph.pop();
            var startLine = firstParagraph.childWidgets[0];
            var endLine = lastParagraph.childWidgets[lastParagraph.childWidgets.length - 1];
            if ((startLine !== undefined) && (endLine !== undefined)) {
                var startElement = startLine.children[0];
                if (startElement instanceof ListTextElementBox) {
                    do {
                        startElement = startElement.nextNode;
                    } while (startElement instanceof ListTextElementBox);
                }
                //Returns the bookmark if already present for paragraph.
                // tslint:disable-next-line:max-line-length
                if (!isNullOrUndefined(startElement) && startElement instanceof BookmarkElementBox && startElement.bookmarkType === 0 && (startElement.name.toLowerCase().match('^_toc'))) {
                    return startElement.name;
                }
                var endElement = endLine.children[endLine.children.length - 1];
                if ((startElement !== undefined) && (endElement !== undefined)) {
                    this.selection.start.setPositionForSelection(startLine, startElement, 0, this.selection.start.location);
                    this.selection.end.setPositionForSelection(endLine, endElement, endElement.length, this.selection.end.location);
                    bookmarkName = this.generateBookmarkName();
                    this.insertBookmark(bookmarkName);
                }
            }
        }
        return bookmarkName;
    };
    /**
     * Generates bookmark id.
     */
    Editor.prototype.generateBookmarkName = function () {
        this.tocBookmarkId++;
        var count = 10 - this.tocBookmarkId.toString().length;
        var formatString = '';
        while (count - 1 > 0) {
            formatString = '0' + formatString;
            count--;
        }
        var bookmarkName = '_Toc' + formatString + this.tocBookmarkId;
        return bookmarkName;
    };
    /**
     * Change cell content alignment
     * @private
     */
    Editor.prototype.onCellContentAlignment = function (verticalAlignment, textAlignment) {
        this.owner.isShiftingEnabled = true;
        var selection = this.owner.selection;
        if (selection.isEmpty && selection.start.paragraph.isInsideTable) {
            if (this.owner.editorHistory) {
                this.owner.editorHistory.initComplexHistory(selection, 'MultiSelection');
            }
            //Selecting the table cell to update the all the paragraph format.
            selection.selectTableCell();
            this.initHistory('CellContentVerticalAlignment');
            var cellFormat = selection.start.paragraph.associatedCell.cellFormat;
            this.applyCellPropertyValue(selection, 'verticalAlignment', verticalAlignment, cellFormat);
            this.reLayout(selection, false);
            this.initHistory('TextAlignment');
            this.updateParagraphFormat('textAlignment', textAlignment, false);
            this.reLayout(this.owner.selection, false);
            if (this.owner.editorHistory) {
                this.owner.editorHistory.updateComplexHistory();
            }
        }
        else {
            if (this.owner.editorHistory) {
                this.owner.editorHistory.initComplexHistory(selection, 'MultiSelection');
            }
            if (!isNullOrUndefined(selection.getTable(selection.start, selection.end))) {
                //Table cell vertical alignment.
                this.updateSelectionTableFormat(selection, 'CellContentVerticalAlignment', verticalAlignment);
                this.reLayout(this.owner.selection, false);
                this.initHistory('TextAlignment');
                //Paragraph text alignment.
                this.updateSelectionParagraphFormatting('textAlignment', textAlignment, false);
                this.reLayout(selection, false);
            }
            if (this.owner.editorHistory) {
                this.owner.editorHistory.updateComplexHistory();
            }
        }
    };
    //Restrict editing implementation starts
    /**
     * @private
     */
    Editor.prototype.insertEditRangeElement = function (user) {
        if (this.viewer.isDocumentProtected || this.viewer.selection.isEmpty) {
            return;
        }
        this.initComplexHistory('RestrictEditing');
        this.selection.skipEditRangeRetrieval = true;
        var selection = this.viewer.selection;
        var startPos = this.selection.start;
        var endPos = this.selection.end;
        if (!this.selection.isForward) {
            startPos = this.selection.end;
            endPos = this.selection.start;
        }
        if (selection.start.paragraph.isInsideTable && selection.end.paragraph.isInsideTable
            && selection.start.paragraph.associatedCell.ownerTable.contains(selection.end.paragraph.associatedCell)) {
            var startCell = this.getOwnerCell(this.selection.isForward);
            var endCell = this.getOwnerCell(!this.selection.isForward);
            if (startCell.rowIndex === endCell.rowIndex) {
                var startIndex = startCell.ownerRow.childWidgets.indexOf(startCell);
                var endIndex = startCell.ownerRow.childWidgets.indexOf(endCell);
                var startElement = [];
                var endElement = [];
                for (var i = startIndex; i <= endIndex; i++) {
                    var editStart = this.addEditElement(user);
                    editStart.columnFirst = i;
                    editStart.columnLast = i;
                    editStart.line = selection.start.currentWidget;
                    var editEnd = editStart.editRangeEnd;
                    editEnd.line = selection.end.currentWidget;
                    startElement.push(editStart);
                    endElement.push(editEnd);
                }
                this.insertElements(endElement, startElement);
                var offset = startElement[0].line.getOffset(startElement[0], 1);
                this.selection.start.setPositionParagraph(startElement[0].line, offset);
                offset = endElement[0].line.getOffset(endElement[0], 1);
                this.selection.end.setPositionParagraph(endElement[0].line, offset);
                this.selection.fireSelectionChanged(true);
                this.fireContentChange();
            }
            else {
                this.insertEditRangeInsideTable(startCell, endCell, user);
                var startLine = this.selection.getFirstParagraphInCell(startCell).childWidgets[0];
                var endLine = this.selection.getLastParagraph(endCell).childWidgets[0];
                var offset = startLine.getOffset(startLine.children[0], 1);
                this.selection.start.setPositionParagraph(startLine, offset);
                offset = endLine.getOffset(endLine.children[0], 1);
                this.selection.end.setPositionParagraph(endLine, offset);
                this.selection.fireSelectionChanged(true);
                this.fireContentChange();
            }
        }
        else {
            this.addRestrictEditingForSelectedArea(user);
        }
        this.selection.skipEditRangeRetrieval = false;
    };
    /**
     * @private
     */
    Editor.prototype.insertEditRangeInsideTable = function (startCell, endCell, user) {
        var table = startCell.ownerTable;
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
        var startLeft = this.selection.getCellLeft(startCell.ownerRow, startCell);
        var endLeft = startLeft + startCell.cellFormat.cellWidth;
        var endCellLeft = this.selection.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        var cellInfo = this.updateSelectedCellsInTable(startLeft, endLeft, endCellLeft, endCellRight);
        startLeft = cellInfo.start;
        endLeft = cellInfo.end;
        var endElement = [];
        for (var i = rowStartIndex; i <= count; i++) {
            var row = table.childWidgets[i];
            var cellSelectionStartIndex = -1;
            var cellSelectionEndIndex = -1;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var cellStart = this.selection.getCellLeft(row, cell);
                if (this.checkCellWithInSelection(startLeft, endLeft, cellStart)) {
                    if (cellSelectionStartIndex === -1) {
                        cellSelectionStartIndex = j;
                    }
                    cellSelectionEndIndex = j;
                }
            }
            var newEndElement = [];
            for (var z = cellSelectionStartIndex; z <= cellSelectionEndIndex; z++) {
                var index = 0;
                var startCell_1 = void 0;
                var startParagraph = void 0;
                if (z === cellSelectionStartIndex) {
                    startCell_1 = row.childWidgets[cellSelectionStartIndex];
                    startParagraph = this.selection.getFirstParagraphInCell(startCell_1).childWidgets[0];
                }
                var editStart = this.addEditElement(user);
                editStart.columnFirst = z;
                editStart.columnLast = z;
                editStart.line = startParagraph;
                editStart.line.children.splice(index, 0, editStart);
                index++;
                var editEnd = editStart.editRangeEnd;
                newEndElement.push(editEnd);
                if (endElement.length > 0 && z === cellSelectionEndIndex) {
                    for (var l = 0; l < endElement.length; l++) {
                        endElement[l].line = editStart.line;
                        editStart.line.children.splice(index, 0, endElement[l]);
                        index++;
                    }
                    endElement = [];
                }
            }
            endElement = newEndElement;
            if (i === count && endElement.length > 0) {
                var cellWidget = row.childWidgets[cellSelectionEndIndex];
                var lastLine = this.selection.getLastParagraph(cellWidget).lastChild;
                var index = lastLine.children.length - 1;
                for (var l = 0; l < endElement.length; l++) {
                    endElement[l].line = lastLine;
                    lastLine.children.splice(index, 0, endElement[l]);
                    index++;
                }
            }
        }
    };
    /**
     * @private
     */
    Editor.prototype.addRestrictEditingForSelectedArea = function (user) {
        var editStart = this.addEditElement(user);
        var editEnd = editStart.editRangeEnd;
        if (this.editorHistory && this.editorHistory.currentHistoryInfo) {
            this.editorHistory.currentHistoryInfo.editRangeStart = editStart;
        }
        this.insertElements([editEnd], [editStart]);
        if (this.editorHistory) {
            this.editorHistory.updateComplexHistoryInternal();
        }
        var offset = editStart.line.getOffset(editStart, 1);
        this.selection.start.setPositionParagraph(editStart.line, offset);
        offset = editEnd.line.getOffset(editEnd, 1);
        this.selection.end.setPositionParagraph(editEnd.line, offset);
        this.selection.fireSelectionChanged(true);
        this.fireContentChange();
    };
    /**
     * @private
     */
    Editor.prototype.addEditElement = function (user) {
        var editStart = new EditRangeStartElementBox();
        if (user.toLocaleLowerCase() === 'everyone') {
            editStart.group = user;
        }
        else {
            editStart.user = user;
        }
        var editEnd = new EditRangeEndElementBox();
        editEnd.editRangeStart = editStart;
        editStart.editRangeEnd = editEnd;
        this.editStartRangeCollection.push(editStart);
        this.addEditCollectionToDocument();
        this.editStartRangeCollection = [];
        return editStart;
    };
    /**
     * @private
     */
    Editor.prototype.protect = function (protectionType) {
        this.viewer.isDocumentProtected = true;
        this.viewer.protectionType = protectionType;
        this.selection.highlightEditRegion();
    };
    /**
     * @private
     */
    Editor.prototype.addEditCollectionToDocument = function () {
        for (var i = 0; i < this.editStartRangeCollection.length; i++) {
            var editStart = this.editStartRangeCollection[i];
            var user = editStart.user === '' ? editStart.group : editStart.user;
            if (this.viewer.editRanges.length > 0 && this.viewer.editRanges.containsKey(user)) {
                this.viewer.editRanges.get(user).push(editStart);
            }
            else {
                var collection = [];
                collection.push(editStart);
                this.viewer.editRanges.add(user, collection);
            }
        }
        this.selection.updateEditRangeCollection();
    };
    /**
     * @private
     */
    Editor.prototype.updateRangeCollection = function (editStart, user) {
        if (this.viewer.editRanges.length > 0 && this.viewer.editRanges.containsKey(user)) {
            this.viewer.editRanges.get(user).push(editStart);
        }
        else {
            var collection = [];
            collection.push(editStart);
            this.viewer.editRanges.add(user, collection);
        }
    };
    /**
     * @private
     */
    Editor.prototype.removeUserRestrictions = function (user) {
        if (!this.selection.checkSelectionIsAtEditRegion()) {
            return;
        }
        this.selection.skipEditRangeRetrieval = true;
        var editStart = this.selection.getEditRangeStartElement();
        this.initHistory('RemoveEditRange');
        if (this.editorHistory) {
            this.editorHistory.currentBaseHistoryInfo.setEditRangeInfo(editStart);
            this.editorHistory.updateHistory();
        }
        if (editStart.user === user || editStart.group === user) {
            this.removeUserRestrictionsInternal(editStart, user);
        }
        this.selection.updateEditRangeCollection();
        this.fireContentChange();
        this.selection.skipEditRangeRetrieval = false;
    };
    /**
     * @private
     */
    Editor.prototype.removeUserRestrictionsInternal = function (editStart, currentUser) {
        var user = currentUser;
        if (isNullOrUndefined(currentUser)) {
            user = editStart.user === '' ? editStart.group : editStart.user;
        }
        var index = this.viewer.editRanges.get(user).indexOf(editStart);
        this.viewer.editRanges.get(user).splice(index, 1);
        editStart.editRangeEnd.line.children.splice(editStart.editRangeEnd.indexInOwner, 1);
        editStart.line.children.splice(editStart.indexInOwner, 1);
    };
    /**
     * @private
     */
    Editor.prototype.removeAllEditRestrictions = function () {
        this.selection.skipEditRangeRetrieval = true;
        var startPosition = this.selection.start;
        var endPosition = this.selection.end;
        var editStart = [];
        var keys = this.viewer.editRanges.keys;
        for (var j = 0; j < keys.length; j++) {
            editStart = this.viewer.editRanges.get(keys[j]);
            for (var i = 0; i < editStart.length; i++) {
                editStart[i].editRangeEnd.line.children.splice(editStart[i].editRangeEnd.indexInOwner, 1);
                editStart[i].line.children.splice(editStart[i].indexInOwner, 1);
            }
        }
        this.viewer.editRanges.clear();
        this.selection.updateEditRangeCollection();
        this.selection.start.setPositionInternal(startPosition);
        this.selection.end.setPositionInternal(endPosition);
        this.selection.editRegionHighlighters.clear();
        this.viewer.updateScrollBars();
        this.selection.fireSelectionChanged(false);
        this.selection.skipEditRangeRetrieval = false;
    };
    return Editor;
}());
export { Editor };
