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
import { Uploader } from '@syncfusion/ej2-inputs';
import { FilesDirective, UploadedFilesDirective, FilesPlugin, UploadedFilesPlugin } from './files.directive';
export var properties = ['allowedExtensions', 'asyncSettings', 'autoUpload', 'buttons', 'cssClass', 'directoryUpload', 'dropArea', 'enablePersistence', 'enableRtl', 'enabled', 'files', 'htmlAttributes', 'locale', 'maxFileSize', 'minFileSize', 'multiple', 'sequentialUpload', 'showFileList', 'template', 'actionComplete', 'beforeRemove', 'beforeUpload', 'canceling', 'change', 'chunkFailure', 'chunkSuccess', 'chunkUploading', 'clearing', 'created', 'failure', 'fileListRendering', 'pausing', 'progress', 'removing', 'rendering', 'resuming', 'selected', 'success', 'uploading'];
export var modelProps = [];
/**
 * Represents the Essential JS 2 VueJS Uploader Component
 * ```html
 * <ejs-uploader id='fileUpload' v-bind:multiple='true'></ejs-uploader>
 * ```
 */
var UploaderComponent = /** @class */ (function (_super) {
    __extends(UploaderComponent, _super);
    function UploaderComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = false;
        _this.tagMapper = { "e-files": "e-uploadedfiles" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new Uploader({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    UploaderComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    UploaderComponent.prototype.render = function (createElement) {
        return createElement('input', this.$slots.default);
    };
    UploaderComponent.prototype.bytesToSize = function (bytes) {
        return this.ej2Instances.bytesToSize(bytes);
    };
    UploaderComponent.prototype.cancel = function (fileData) {
        return this.ej2Instances.cancel(fileData);
    };
    UploaderComponent.prototype.clearAll = function () {
        return this.ej2Instances.clearAll();
    };
    UploaderComponent.prototype.createFileList = function (fileData) {
        return this.ej2Instances.createFileList(fileData);
    };
    UploaderComponent.prototype.getFilesData = function (index) {
        return this.ej2Instances.getFilesData(index);
    };
    UploaderComponent.prototype.pause = function (fileData, custom) {
        return this.ej2Instances.pause(fileData, custom);
    };
    UploaderComponent.prototype.remove = function (fileData, customTemplate, removeDirectly, postRawFile, args) {
        return this.ej2Instances.remove(fileData, customTemplate, removeDirectly, postRawFile, args);
    };
    UploaderComponent.prototype.resume = function (fileData, custom) {
        return this.ej2Instances.resume(fileData, custom);
    };
    UploaderComponent.prototype.retry = function (fileData, fromcanceledStage, custom) {
        return this.ej2Instances.retry(fileData, fromcanceledStage, custom);
    };
    UploaderComponent.prototype.sortFileList = function (filesData) {
        return this.ej2Instances.sortFileList(filesData);
    };
    UploaderComponent.prototype.traverseFileTree = function (item, event) {
        return this.ej2Instances.traverseFileTree(item, event);
    };
    UploaderComponent.prototype.upload = function (files, custom) {
        return this.ej2Instances.upload(files, custom);
    };
    UploaderComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], UploaderComponent);
    return UploaderComponent;
}(ComponentBase));
export { UploaderComponent };
export var UploaderPlugin = {
    name: 'ejs-uploader',
    install: function (Vue) {
        Vue.component(UploaderPlugin.name, UploaderComponent);
        Vue.component(UploadedFilesPlugin.name, UploadedFilesDirective);
        Vue.component(FilesPlugin.name, FilesDirective);
    }
};
