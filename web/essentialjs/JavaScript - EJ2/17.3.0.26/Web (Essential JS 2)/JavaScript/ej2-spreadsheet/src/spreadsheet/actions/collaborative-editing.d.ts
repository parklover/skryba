import { Spreadsheet } from '../base/index';
/**
 * Collaborative Editing module allows to real time changes of the Spreadsheet.
 */
export declare class CollaborativeEditing {
    private parent;
    constructor(parent: Spreadsheet);
    /**

     */
    private refreshClients;
    private addEventListener;
    private removeEventListener;
    /**
     * Destroy collaborative editing module.
     */
    destroy(): void;
    /**
     * Get the cell format module name.
     */
    getModuleName(): string;
}
