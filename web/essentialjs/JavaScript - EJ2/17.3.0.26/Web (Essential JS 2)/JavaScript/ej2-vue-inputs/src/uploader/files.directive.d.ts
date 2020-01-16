import Vue from 'vue';
export declare class FilesDirective extends Vue {
    render(): void;
}
export declare const FilesPlugin: {
    name: string;
    install(Vue: any): void;
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
export declare class UploadedFilesDirective extends Vue {
    render(): void;
}
export declare const UploadedFilesPlugin: {
    name: string;
    install(Vue: any): void;
};
