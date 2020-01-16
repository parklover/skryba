var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
export var properties = ['acceptTab', 'currentUser', 'defaultPasteOption', 'documentName', 'enableBookmarkDialog', 'enableBordersAndShadingDialog', 'enableContextMenu', 'enableCursorOnReadOnly', 'enableEditor', 'enableEditorHistory', 'enableFontDialog', 'enableHyperlinkDialog', 'enableImageResizer', 'enableListDialog', 'enableLocalPaste', 'enableOptionsPane', 'enablePageSetupDialog', 'enableParagraphDialog', 'enablePersistence', 'enablePrint', 'enableRtl', 'enableSearch', 'enableSelection', 'enableSfdtExport', 'enableSpellCheck', 'enableStyleDialog', 'enableTableDialog', 'enableTableOfContentsDialog', 'enableTableOptionsDialog', 'enableTablePropertiesDialog', 'enableTextExport', 'enableWordExport', 'isReadOnly', 'locale', 'pageGap', 'pageOutline', 'serverActionSettings', 'serviceUrl', 'useCtrlClickToFollowHyperlink', 'userColor', 'zIndex', 'zoomFactor', 'contentChange', 'created', 'customContextMenuBeforeOpen', 'customContextMenuSelect', 'destroyed', 'documentChange', 'keyDown', 'requestNavigate', 'searchResultsChange', 'selectionChange', 'viewChange', 'zoomFactorChange'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS Document Editor Component
 * ```html
 * <ejs-documenteditor id='container'></ejs-documenteditor>
 * ```
 */
var DocumentEditorComponent = /** @class */ (function (_super) {
    __extends(DocumentEditorComponent, _super);
    function DocumentEditorComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = true;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new DocumentEditor({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    DocumentEditorComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    DocumentEditorComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    DocumentEditorComponent.prototype.enableAllModules = function () {
        return this.ej2Instances.enableAllModules();
    };
    DocumentEditorComponent.prototype.fitPage = function (pageFitType) {
        return this.ej2Instances.fitPage(pageFitType);
    };
    DocumentEditorComponent.prototype.focusIn = function () {
        return this.ej2Instances.focusIn();
    };
    DocumentEditorComponent.prototype.getBookmarks = function () {
        return this.ej2Instances.getBookmarks();
    };
    DocumentEditorComponent.prototype.getStyleNames = function (styleType) {
        return this.ej2Instances.getStyleNames(styleType);
    };
    DocumentEditorComponent.prototype.getStyles = function (styleType) {
        return this.ej2Instances.getStyles(styleType);
    };
    DocumentEditorComponent.prototype.open = function (sfdtText) {
        return this.ej2Instances.open(sfdtText);
    };
    DocumentEditorComponent.prototype.openBlank = function () {
        return this.ej2Instances.openBlank();
    };
    DocumentEditorComponent.prototype.print = function (printWindow) {
        return this.ej2Instances.print(printWindow);
    };
    DocumentEditorComponent.prototype.resize = function (width, height) {
        return this.ej2Instances.resize(width, height);
    };
    DocumentEditorComponent.prototype.save = function (fileName, formatType) {
        return this.ej2Instances.save(fileName, formatType);
    };
    DocumentEditorComponent.prototype.saveAsBlob = function (formatType) {
        return this.ej2Instances.saveAsBlob(formatType);
    };
    DocumentEditorComponent.prototype.scrollToPage = function (pageNumber) {
        return this.ej2Instances.scrollToPage(pageNumber);
    };
    DocumentEditorComponent.prototype.serialize = function () {
        return this.ej2Instances.serialize();
    };
    DocumentEditorComponent.prototype.setDefaultCharacterFormat = function (characterFormat) {
        return this.ej2Instances.setDefaultCharacterFormat(characterFormat);
    };
    DocumentEditorComponent.prototype.setDefaultParagraphFormat = function (paragraphFormat) {
        return this.ej2Instances.setDefaultParagraphFormat(paragraphFormat);
    };
    DocumentEditorComponent.prototype.setDefaultSectionFormat = function (sectionFormat) {
        return this.ej2Instances.setDefaultSectionFormat(sectionFormat);
    };
    DocumentEditorComponent.prototype.showDialog = function (dialogType) {
        return this.ej2Instances.showDialog(dialogType);
    };
    DocumentEditorComponent.prototype.showOptionsPane = function () {
        return this.ej2Instances.showOptionsPane();
    };
    DocumentEditorComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], DocumentEditorComponent);
    return DocumentEditorComponent;
}(ComponentBase));
export { DocumentEditorComponent };
export var DocumentEditorPlugin = {
    name: 'ejs-documenteditor',
    install: function (Vue) {
        Vue.component(DocumentEditorPlugin.name, DocumentEditorComponent);
    }
};
