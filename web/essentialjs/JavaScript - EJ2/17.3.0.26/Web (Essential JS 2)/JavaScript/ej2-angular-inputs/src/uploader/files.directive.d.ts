import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * 'e-files' directive represent a file of angular uploader
 * It must be contained in a Uploader component(`ejs-uploader`).
 * ```html
 * <ejs-uploader id='fileupload' multiple=true>
 *   <e-files>
 *    <e-file name='Java' size=23000 type='pdf'></e-file>
 *    <e-file name='C++' size=30000 type='.docx'></e-file>
 *   </e-files>
 * </ejs-uploader>
 * ```
 */
export declare class UploadedFilesDirective extends ComplexBase<UploadedFilesDirective> {
    private viewContainerRef;
    /**
     * Specifies the type of the file

     */
    type: any;
    /**
     * Specifies the name of the file

     */
    name: any;
    /**
     * Specifies the size of the file

     */
    size: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * UploadedFiles Array Directive
 * @private
 */
export declare class FilesDirective extends ArrayBase<FilesDirective> {
    constructor();
}
