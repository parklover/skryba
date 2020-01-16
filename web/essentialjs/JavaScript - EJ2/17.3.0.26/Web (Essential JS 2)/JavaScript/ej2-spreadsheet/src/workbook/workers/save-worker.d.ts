import { Workbook } from '../base';
import { SaveOptions } from '../common/index';
/**

 * The `SaveWorker` module is used to perform save functionality with Web Worker.
 */
export declare class SaveWorker {
    protected parent: Workbook;
    /**
     * Constructor for SaveWorker module in Workbook library.
     * @private
     */
    constructor(parent: Workbook);
    /**
     * Process sheet.

     */
    protected processSheet(sheet: string, sheetIndex: number): Object;
    /**
     * Process save action.

     */
    protected processSave(saveJSON: Object, saveSettings: SaveOptions | {
        [key: string]: string;
    }, customParams: Object): void;
}
