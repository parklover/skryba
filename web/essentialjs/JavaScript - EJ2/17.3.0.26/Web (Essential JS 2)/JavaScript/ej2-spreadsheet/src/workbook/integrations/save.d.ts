import { Workbook } from '../base/index';
import { SaveWorker } from '../workers/save-worker';
/**

 * The `WorkbookSave` module is used to handle the save action in Workbook library.
 */
export declare class WorkbookSave extends SaveWorker {
    private isProcessCompleted;
    private saveSettings;
    private saveJSON;
    private isFullPost;
    private needBlobData;
    private customParams;
    /**
     * Constructor for WorkbookSave module in Workbook library.
     * @private
     */
    constructor(parent: Workbook);
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the WorkbookSave module.
     * @return {void}

     */
    destroy(): void;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * Initiate save process.

     */
    private initiateSave;
    /**
     * Update save JSON with basic settings.

     */
    private updateBasicSettings;
    /**
     * Process sheets properties.

     */
    private processSheets;
    /**
     * Update processed sheet data.

     */
    private updateSheet;
    private getSheetLength;
    /**
     * Save process.

     */
    private save;
    /**
     * Update final save data.

     */
    private updateSaveResult;
    private ClientFileDownload;
    private initiateFullPostSave;
    /**
     * Get stringified workbook object.

     */
    private getStringifyObject;
    private getFileNameWithExtension;
    private getFileExtension;
}
