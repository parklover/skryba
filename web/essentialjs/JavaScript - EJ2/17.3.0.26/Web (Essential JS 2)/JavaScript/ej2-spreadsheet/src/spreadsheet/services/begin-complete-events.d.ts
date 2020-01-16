import { Spreadsheet } from '../base/index';
import { SortEventArgs, SaveCompleteEventArgs } from '../../workbook/index';
import { CellSaveEventArgs } from '../common/index';
/**
 *  Begin and complete events.

 */
export declare class BeginCompleteEvents {
    private parent;
    /**
     * Constructor for initializing actioncomplete service.
     */
    constructor(parent: Spreadsheet);
    private initializeActionBegin;
    private initializeActionComplete;
    private beginAction;
    completeAction(args: SortEventArgs | CellSaveEventArgs | SaveCompleteEventArgs | Object, action: string): void;
}
