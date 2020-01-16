import { Spreadsheet } from '../index';
/**
 * `Save` module is used to handle the save action in Spreadsheet.
 */
export declare class Save {
    private parent;
    /**
     * Constructor for Save module in Spreadsheet.
     * @private
     */
    constructor(parent: Spreadsheet);
    /**
     * To destroy the Save module.
     * @return {void}

     */
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    /**
     * Initiate save process.

     */
    private initiateSave;
    /**
     * Save action completed.

     */
    private saveCompleted;
}
