import { ChildProperty } from '@syncfusion/ej2-base';
/**
 * Specifies the Ajax settings of the File Manager.
 */
export declare class UploadSettings extends ChildProperty<UploadSettings> {
    /**
     * Specifies the extensions of the file types allowed in the file manager component and pass the extensions with comma separators.
     * For example, if you want to upload specific image files, pass allowedExtensions as ".jpg,.png".

     */
    allowedExtensions: string;
    /**
     * By default, the FileManager component initiates automatic upload when the files are added in upload queue.
     * If you want to manipulate the files before uploading to server, disable the autoUpload property.
     * The buttons "upload" and "clear" will be hided from file list when the autoUpload property is true.

     */
    autoUpload: boolean;
    /**
     * Specifies the minimum file size to be uploaded in bytes.
     * The property is used to make sure that you cannot upload empty files and small files.

     */
    minFileSize: number;
    /**
     * Specifies the maximum allowed file size to be uploaded in bytes.
     * The property is used to make sure that you cannot upload too large files.

     */
    maxFileSize: number;
}
