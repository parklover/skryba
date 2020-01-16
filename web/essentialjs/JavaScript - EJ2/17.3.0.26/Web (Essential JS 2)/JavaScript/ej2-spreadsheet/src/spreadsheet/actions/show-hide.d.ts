import { Spreadsheet } from '../base/index';
/**
 * The `ShowHide` module is used to perform hide/show the rows and columns.

 */
export declare class ShowHide {
    private parent;
    /**
     * Constructor for the Spreadsheet show hide module.
     * @private
     */
    constructor(parent: Spreadsheet);
    private showHideRow;
    private showHideCol;
    private getViewportIdx;
    private addEventListener;
    private destroy;
    private removeEventListener;
}
