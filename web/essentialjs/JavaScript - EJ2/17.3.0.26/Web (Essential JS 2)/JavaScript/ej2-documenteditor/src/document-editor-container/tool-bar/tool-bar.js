import { createElement, isNullOrUndefined, EventHandler, classList } from '@syncfusion/ej2-base';
import { Toolbar as EJ2Toolbar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { showSpinner, hideSpinner, DialogUtility } from '@syncfusion/ej2-popups';
import { XmlHttpRequestHandler } from '../../document-editor/base/ajax-helper';
var TOOLBAR_ID = '_toolbar';
var NEW_ID = '_new';
var OPEN_ID = '_open';
var UNDO_ID = '_undo';
var REDO_ID = '_redo';
var INSERT_IMAGE_ID = '_image';
var INSERT_IMAGE_LOCAL_ID = '_image_local';
var INSERT_IMAGE_ONLINE_ID = '_image_url';
var INSERT_TABLE_ID = '_table';
var INSERT_LINK_ID = '_link';
var BOOKMARK_ID = '_bookmark';
var TABLE_OF_CONTENT_ID = '_toc';
var HEADER_ID = '_header';
var FOOTER_ID = '_footer';
var PAGE_SET_UP_ID = '_page_setup';
var PAGE_NUMBER_ID = '_page_number';
var BREAK_ID = '_break';
var FIND_ID = '_find';
var CLIPBOARD_ID = '_use_local_clipboard';
var RESTRICT_EDITING_ID = '_restrict_edit';
var PAGE_BREAK = '_page_break';
var SECTION_BREAK = '_section_break';
var READ_ONLY = '_read_only';
var PROTECTIONS = '_protections';
/**
 * Toolbar Module
 */
var Toolbar = /** @class */ (function () {
    /**
     * @private
     */
    function Toolbar(container) {
        this.container = container;
        this.importHandler = new XmlHttpRequestHandler();
    }
    Object.defineProperty(Toolbar.prototype, "documentEditor", {
        /**
         * @private
         */
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    /**
     * @private
     */
    Toolbar.prototype.initToolBar = function () {
        this.renderToolBar();
        this.wireEvent();
    };
    // tslint:disable-next-line:max-func-body-length
    Toolbar.prototype.renderToolBar = function () {
        if (isNullOrUndefined(this.container)) {
            return;
        }
        var toolbarContainer = this.container.toolbarContainer;
        var toolbarWrapper = createElement('div', { className: 'e-de-tlbr-wrapper' });
        var toolbarTarget = createElement('div', { className: 'e-de-toolbar', styles: 'height:100%' });
        this.initToolbarItems();
        toolbarWrapper.appendChild(toolbarTarget);
        toolbarContainer.appendChild(toolbarWrapper);
        // Show hide pane button initialization 
        var propertiesPaneDiv = createElement('div', { className: 'e-de-ctnr-properties-pane-btn' });
        var buttonElement = createElement('button', { attrs: { type: 'button' } });
        propertiesPaneDiv.appendChild(buttonElement);
        var cssClassName = 'e-tbar-btn e-tbtn-txt e-control e-btn e-de-showhide-btn';
        var iconCss = 'e-icons e-de-ctnr-showhide';
        if (this.container.enableRtl) {
            cssClassName += '-rtl';
            iconCss = 'e-icons e-de-ctnr-showhide e-de-flip';
        }
        this.propertiesPaneButton = new Button({
            cssClass: cssClassName,
            iconCss: iconCss
        });
        this.propertiesPaneButton.appendTo(buttonElement);
        EventHandler.add(buttonElement, 'click', this.showHidePropertiesPane, this);
        toolbarContainer.appendChild(propertiesPaneDiv);
        this.toolbar.appendTo(toolbarTarget);
        var locale = this.container.localObj;
        var id = this.container.element.id + TOOLBAR_ID;
        var imageButton = toolbarTarget.getElementsByClassName('e-de-image-splitbutton')[0].firstChild;
        var items = {
            items: [
                {
                    text: locale.getConstant('Upload from computer'), iconCss: 'e-icons e-de-ctnr-upload',
                    id: id + INSERT_IMAGE_LOCAL_ID
                }
            ],
            //,{ text: locale.getConstant('By URL'), iconCss: 'e-icons e-de-ctnr-link', id: id + INSERT_IMAGE_ONLINE_ID }],
            cssClass: 'e-de-toolbar-btn-first e-caret-hide',
            iconCss: 'e-icons e-de-ctnr-image',
            select: this.onDropDownButtonSelect.bind(this),
        };
        this.imgDropDwn = new DropDownButton(items, imageButton);
        var breakButton = toolbarTarget.getElementsByClassName('e-de-break-splitbutton')[0].firstChild;
        items = {
            items: [
                { text: locale.getConstant('Page Break'), iconCss: 'e-icons e-de-ctnr-page-break', id: id + PAGE_BREAK },
                { text: locale.getConstant('Section Break'), iconCss: 'e-icons e-de-ctnr-section-break', id: id + SECTION_BREAK }
            ],
            cssClass: 'e-caret-hide',
            iconCss: 'e-icons e-de-ctnr-break',
            select: this.onDropDownButtonSelect.bind(this),
        };
        this.breakDropDwn = new DropDownButton(items, breakButton);
        this.filePicker = createElement('input', {
            attrs: { type: 'file', accept: '.doc,.docx,.rtf,.txt,.htm,.html,.sfdt' }, className: 'e-de-ctnr-file-picker'
        });
        this.imagePicker = createElement('input', {
            attrs: { type: 'file', accept: '.jpg,.jpeg,.png,.bmp' }, className: 'e-de-ctnr-file-picker'
        });
        this.toggleButton(id + CLIPBOARD_ID, this.container.enableLocalPaste);
        this.toggleButton(id + RESTRICT_EDITING_ID, this.container.restrictEditing);
        var restrictEditing = toolbarTarget.getElementsByClassName('e-de-lock-dropdownbutton')[0].firstChild;
        var lockItems = {
            items: [
                { text: locale.getConstant('Read only'), id: id + READ_ONLY },
                { text: locale.getConstant('Protections'), id: id + PROTECTIONS }
            ],
            cssClass: 'e-de-toolbar-btn-first e-caret-hide',
            select: this.onDropDownButtonSelect.bind(this)
        };
        this.restrictDropDwn = new DropDownButton(lockItems, restrictEditing);
    };
    Toolbar.prototype.showHidePropertiesPane = function () {
        if (this.container.propertiesPaneContainer.style.display === 'none') {
            this.container.showPropertiesPane = true;
        }
        else {
            this.container.showPropertiesPane = false;
        }
        this.enableDisablePropertyPaneButton(this.container.showPropertiesPane);
        this.container.showPropertiesPaneOnSelection();
        this.documentEditor.focusIn();
    };
    Toolbar.prototype.onWrapText = function (text) {
        var content = '';
        var index = text.lastIndexOf(' ');
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + '</div>';
        return content;
    };
    Toolbar.prototype.wireEvent = function () {
        this.propertiesPaneButton.on('click', this.togglePropertiesPane.bind(this));
        EventHandler.add(this.filePicker, 'change', this.onFileChange, this);
        EventHandler.add(this.imagePicker, 'change', this.onImageChange, this);
    };
    // tslint:disable-next-line:max-func-body-length
    Toolbar.prototype.initToolbarItems = function () {
        var id = this.container.element.id + TOOLBAR_ID;
        var locale = this.container.localObj;
        this.toolbar = new EJ2Toolbar({
            enableRtl: this.container.enableRtl,
            clicked: this.clickHandler.bind(this),
            items: [
                {
                    prefixIcon: 'e-de-ctnr-new', tooltipText: locale.getConstant('Create a new document.'),
                    id: id + NEW_ID, text: locale.getConstant('New'), cssClass: 'e-de-toolbar-btn-start'
                },
                {
                    prefixIcon: 'e-de-ctnr-open', tooltipText: locale.getConstant('Open a document.'), id: id + OPEN_ID,
                    text: locale.getConstant('Open'), cssClass: 'e-de-toolbar-btn-last'
                },
                {
                    type: 'Separator', cssClass: 'e-de-separator'
                },
                {
                    prefixIcon: 'e-de-ctnr-undo', tooltipText: locale.getConstant('Undo the last operation (Ctrl+Z).'),
                    id: id + UNDO_ID, text: locale.getConstant('Undo'), cssClass: 'e-de-toolbar-btn-first'
                },
                {
                    prefixIcon: 'e-de-ctnr-redo', tooltipText: locale.getConstant('Redo the last operation (Ctrl+Y).'),
                    id: id + REDO_ID, text: locale.getConstant('Redo'), cssClass: 'e-de-toolbar-btn-last'
                },
                {
                    type: 'Separator', cssClass: 'e-de-separator'
                },
                {
                    tooltipText: locale.getConstant('Insert inline picture from a file.'), id: id + INSERT_IMAGE_ID,
                    text: locale.getConstant('Image'), cssClass: 'e-de-toolbar-btn-first e-de-image-splitbutton e-de-image-focus'
                },
                {
                    prefixIcon: 'e-de-ctnr-table', tooltipText: locale.getConstant('Insert a table into the document'),
                    id: id + INSERT_TABLE_ID, text: locale.getConstant('Table'), cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    prefixIcon: 'e-de-ctnr-link',
                    tooltipText: locale.getConstant('Create a link in your document for quick access to webpages and files (Ctrl+K).'),
                    id: id + INSERT_LINK_ID, text: locale.getConstant('Link'), cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    prefixIcon: 'e-de-ctnr-bookmark',
                    tooltipText: locale.getConstant('Insert a bookmark in a specific place in this document.'),
                    id: id + BOOKMARK_ID, text: locale.getConstant('Bookmark'), cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    prefixIcon: 'e-de-ctnr-tableofcontent',
                    tooltipText: locale.getConstant('Provide an overview of your document by adding a table of contents.'),
                    id: id + TABLE_OF_CONTENT_ID, text: this.onWrapText(locale.getConstant('Table of Contents')),
                    cssClass: 'e-de-toolbar-btn-last'
                },
                {
                    type: 'Separator', cssClass: 'e-de-separator'
                },
                {
                    prefixIcon: 'e-de-ctnr-header', tooltipText: locale.getConstant('Add or edit the header.'),
                    id: id + HEADER_ID, text: locale.getConstant('Header'), cssClass: 'e-de-toolbar-btn-first'
                },
                {
                    prefixIcon: 'e-de-ctnr-footer', tooltipText: locale.getConstant('Add or edit the footer.'),
                    id: id + FOOTER_ID, text: locale.getConstant('Footer'), cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    prefixIcon: 'e-de-ctnr-pagesetup', tooltipText: locale.getConstant('Open the page setup dialog.'),
                    id: id + PAGE_SET_UP_ID, text: this.onWrapText(locale.getConstant('Page Setup')),
                    cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    prefixIcon: 'e-de-ctnr-pagenumber', tooltipText: locale.getConstant('Add page numbers.'),
                    id: id + PAGE_NUMBER_ID, text: this.onWrapText(locale.getConstant('Page Number')),
                    cssClass: 'e-de-toolbar-btn-middle'
                },
                {
                    tooltipText: locale.getConstant('Break'), text: locale.getConstant('Break'), id: BREAK_ID,
                    cssClass: 'e-de-toolbar-btn-last e-de-break-splitbutton'
                },
                {
                    type: 'Separator', cssClass: 'e-de-separator'
                },
                {
                    prefixIcon: 'e-de-ctnr-find', tooltipText: locale.getConstant('Find text in the document (Ctrl+F).'),
                    id: id + FIND_ID, text: locale.getConstant('Find'), cssClass: 'e-de-toolbar-btn'
                },
                {
                    type: 'Separator', cssClass: 'e-de-separator'
                },
                {
                    prefixIcon: 'e-de-ctnr-paste',
                    tooltipText: locale.getConstant('Toggle between the internal clipboard and system clipboard'),
                    id: id + CLIPBOARD_ID, text: this.onWrapText(locale.getConstant('Local Clipboard')),
                    cssClass: 'e-de-toolbar-btn-first'
                },
                {
                    prefixIcon: 'e-de-ctnr-lock', tooltipText: locale.getConstant('Restrict editing.'), id: id + RESTRICT_EDITING_ID,
                    text: this.onWrapText(locale.getConstant('Restrict Editing')), cssClass: 'e-de-toolbar-btn-end e-de-lock-dropdownbutton'
                }
            ]
        });
    };
    Toolbar.prototype.clickHandler = function (args) {
        var id = this.container.element.id + TOOLBAR_ID;
        switch (args.item.id) {
            case id + NEW_ID:
                this.container.documentEditor.openBlank();
                break;
            case id + OPEN_ID:
                this.filePicker.value = '';
                this.filePicker.click();
                break;
            case id + UNDO_ID:
                this.container.documentEditor.editorHistory.undo();
                break;
            case id + REDO_ID:
                this.container.documentEditor.editorHistory.redo();
                break;
            case id + INSERT_TABLE_ID:
                this.container.documentEditor.showDialog('Table');
                break;
            case id + INSERT_LINK_ID:
                this.container.documentEditor.showDialog('Hyperlink');
                break;
            case id + BOOKMARK_ID:
                this.container.documentEditor.showDialog('Bookmark');
                break;
            case id + HEADER_ID:
                this.container.documentEditor.selection.goToHeader();
                break;
            case id + TABLE_OF_CONTENT_ID:
                this.onToc();
                break;
            case id + FOOTER_ID:
                this.container.documentEditor.selection.goToFooter();
                break;
            case id + PAGE_SET_UP_ID:
                this.container.documentEditor.showDialog('PageSetup');
                break;
            case id + PAGE_NUMBER_ID:
                this.container.documentEditor.editor.insertPageNumber();
                break;
            case id + FIND_ID:
                this.container.documentEditor.showOptionsPane();
                break;
            case id + CLIPBOARD_ID:
                this.toggleLocalPaste(args.item.id);
                break;
        }
        if (args.item.id !== id + FIND_ID && args.item.id !== id + INSERT_IMAGE_ID) {
            this.container.documentEditor.focusIn();
        }
    };
    Toolbar.prototype.toggleLocalPaste = function (id) {
        this.container.enableLocalPaste = !this.container.enableLocalPaste;
        this.toggleButton(id, this.container.enableLocalPaste);
    };
    Toolbar.prototype.toggleEditing = function (id) {
        this.container.restrictEditing = !this.container.restrictEditing;
        this.container.showPropertiesPane = !this.container.restrictEditing;
        // this.toggleButton(id, this.container.restrictEditing);
    };
    Toolbar.prototype.toggleButton = function (id, toggle) {
        var element = document.getElementById(id);
        if (toggle) {
            classList(element, ['e-btn-toggle'], []);
        }
        else {
            classList(element, [], ['e-btn-toggle']);
        }
    };
    Toolbar.prototype.togglePropertiesPane = function () {
        this.container.showPropertiesPane = !this.container.showPropertiesPane;
    };
    Toolbar.prototype.onDropDownButtonSelect = function (args) {
        var _this = this;
        var parentId = this.container.element.id + TOOLBAR_ID;
        var id = args.item.id;
        if (id === parentId + PAGE_BREAK) {
            this.container.documentEditor.editorModule.insertPageBreak();
        }
        else if (id === parentId + SECTION_BREAK) {
            this.container.documentEditor.editorModule.insertSectionBreak();
        }
        else if (id === parentId + INSERT_IMAGE_LOCAL_ID) {
            this.imagePicker.value = '';
            this.imagePicker.click();
        }
        else if (id === parentId + INSERT_IMAGE_ONLINE_ID) {
            // Need to implement image dialog;
        }
        else if (id === parentId + READ_ONLY) {
            this.container.restrictEditing = !this.container.restrictEditing;
            this.container.showPropertiesPane = !this.container.restrictEditing;
        }
        else if (id === parentId + PROTECTIONS) {
            this.documentEditor.viewer.restrictEditingPane.showHideRestrictPane(true);
        }
        setTimeout(function () { _this.documentEditor.focusIn(); }, 30);
    };
    Toolbar.prototype.onFileChange = function () {
        var _this = this;
        var file = this.filePicker.files[0];
        if (file) {
            if (file.name.substr(file.name.lastIndexOf('.')) === '.sfdt') {
                var fileReader_1 = new FileReader();
                fileReader_1.onload = function () {
                    _this.container.documentEditor.open(fileReader_1.result);
                };
                fileReader_1.readAsText(file);
            }
            else {
                this.convertToSfdt(file);
            }
            this.container.documentEditor.documentName = file.name.substr(0, file.name.lastIndexOf('.'));
        }
    };
    Toolbar.prototype.convertToSfdt = function (file) {
        showSpinner(this.container.containerTarget);
        this.importHandler.url = this.container.serviceUrl + this.container.serverActionSettings.import;
        this.importHandler.onSuccess = this.successHandler.bind(this);
        this.importHandler.onFailure = this.failureHandler.bind(this);
        this.importHandler.onError = this.failureHandler.bind(this);
        var formData = new FormData();
        formData.append('files', file);
        this.importHandler.send(formData);
    };
    /* tslint:disable:no-any */
    Toolbar.prototype.failureHandler = function (args) {
        if (args.name === 'onError') {
            // tslint:disable-next-line:max-line-length
            DialogUtility.alert({ content: this.container.localObj.getConstant('Error in establishing connection with web server'), closeOnEscape: true, showCloseIcon: true, position: { X: 'Center', Y: 'Center' } });
        }
        else {
            alert('Failed to load the file');
        }
        hideSpinner(this.container.containerTarget);
    };
    Toolbar.prototype.successHandler = function (result) {
        this.container.documentEditor.open(result.data);
        hideSpinner(this.container.containerTarget);
    };
    /* tslint:enable:no-any */
    Toolbar.prototype.onImageChange = function () {
        var _this = this;
        var file = this.imagePicker.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function () {
            _this.insertImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };
    Toolbar.prototype.insertImage = function (data) {
        var image = document.createElement('img');
        var container = this.container;
        image.addEventListener('load', function () {
            container.documentEditor.editor.insertImage(data, this.width, this.height);
        });
        image.src = data;
    };
    /**
     * @private
     */
    Toolbar.prototype.enableDisableToolBarItem = function (enable, isProtectedContent) {
        var id = this.container.element.id + TOOLBAR_ID;
        for (var _i = 0, _a = this.toolbar.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var itemId = item.id;
            if (itemId !== id + NEW_ID && itemId !== id + OPEN_ID && itemId !== id + FIND_ID &&
                itemId !== id + CLIPBOARD_ID && itemId !== id + RESTRICT_EDITING_ID && item.type !== 'Separator') {
                var element = document.getElementById(item.id);
                this.toolbar.enableItems(element.parentElement, enable);
            }
        }
        if (!isProtectedContent) {
            classList(this.propertiesPaneButton.element.parentElement, !enable ? ['e-de-overlay'] : [], !enable ? [] : ['e-de-overlay']);
        }
        if (enable) {
            this.enableDisableUndoRedo();
        }
    };
    /**
     * @private
     */
    Toolbar.prototype.enableDisableUndoRedo = function () {
        var id = this.container.element.id + TOOLBAR_ID;
        // tslint:disable-next-line:max-line-length
        this.toolbar.enableItems(document.getElementById(id + UNDO_ID).parentElement, this.container.documentEditor.editorHistory.canUndo());
        this.toolbar.enableItems(document.getElementById(id + REDO_ID).parentElement, this.container.documentEditor.editorHistory.canRedo());
    };
    Toolbar.prototype.onToc = function () {
        if (this.container.previousContext === 'TableOfContents' && this.container.propertiesPaneContainer.style.display === 'none') {
            this.container.showPropertiesPane = false;
            this.documentEditor.focusIn();
            return;
        }
        if (this.container.headerFooterProperties.element.style.display === 'block') {
            this.documentEditor.selection.closeHeaderFooter();
        }
        this.enableDisablePropertyPaneButton(false);
        this.container.showProperties('toc');
    };
    /**
     * @private
     */
    Toolbar.prototype.enableDisablePropertyPaneButton = function (isShow) {
        if (isShow) {
            classList(this.propertiesPaneButton.element.firstChild, ['e-pane-enabled'], ['e-pane-disabled']);
        }
        else {
            classList(this.propertiesPaneButton.element.firstChild, ['e-pane-disabled'], ['e-pane-enabled']);
        }
    };
    /**
     * @private
     */
    Toolbar.prototype.destroy = function () {
        if (this.restrictDropDwn) {
            this.restrictDropDwn.destroy();
            this.restrictDropDwn = undefined;
        }
        if (this.imgDropDwn) {
            this.imgDropDwn.destroy();
            this.imgDropDwn = undefined;
        }
        if (this.breakDropDwn) {
            this.breakDropDwn.destroy();
            this.breakDropDwn = undefined;
        }
        if (this.toolbar) {
            var toolbarElement = this.toolbar.element;
            this.toolbar.destroy();
            this.toolbar = undefined;
            toolbarElement.parentElement.removeChild(toolbarElement);
        }
        this.container = undefined;
    };
    return Toolbar;
}());
export { Toolbar };
