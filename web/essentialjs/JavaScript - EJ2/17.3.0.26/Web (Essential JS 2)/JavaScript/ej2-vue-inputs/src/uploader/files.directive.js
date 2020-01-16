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
import Vue from 'vue';
import { EJComponentDecorator } from '@syncfusion/ej2-vue-base';
var FilesDirective = /** @class */ (function (_super) {
    __extends(FilesDirective, _super);
    function FilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilesDirective.prototype.render = function () {
        return;
    };
    FilesDirective = __decorate([
        EJComponentDecorator({})
    ], FilesDirective);
    return FilesDirective;
}(Vue));
export { FilesDirective };
export var FilesPlugin = {
    name: 'e-files',
    install: function (Vue) {
        Vue.component(FilesPlugin.name, FilesDirective);
    }
};
/**
 * 'files' directive represent a file of vue uploader
 * It must be contained in a Uploader component(`ejs-uploader`).
 * ```html
 * <ejs-uploader id='fileupload' v-bind:multiple='true'>
 *   <e-files>
 *    <e-file name='Java' size=23000 type='pdf'></e-file>
 *    <e-file name='C++' size=30000 type='.docx'></e-file>
 *   </e-files>
 * </ejs-uploader>
 * ```
 */
var UploadedFilesDirective = /** @class */ (function (_super) {
    __extends(UploadedFilesDirective, _super);
    function UploadedFilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadedFilesDirective.prototype.render = function () {
        return;
    };
    UploadedFilesDirective = __decorate([
        EJComponentDecorator({})
    ], UploadedFilesDirective);
    return UploadedFilesDirective;
}(Vue));
export { UploadedFilesDirective };
export var UploadedFilesPlugin = {
    name: 'e-uploadedfiles',
    install: function (Vue) {
        Vue.component(UploadedFilesPlugin.name, UploadedFilesDirective);
    }
};
