import { PivotView } from '../../pivotview/base/pivotview';
import { IAction } from '../../common/base/interface';
/**
 * Module for GroupingBar rendering
 */
export declare class GroupingBar implements IAction {
    /**
     * Internal variables
     */
    private groupingTable;
    private groupingChartTable;
    private leftAxisPanel;
    private rightAxisPanel;
    private filterPanel;
    private rowPanel;
    private columnPanel;
    private valuePanel;
    private rowAxisPanel;
    private columnAxisPanel;
    private valueAxisPanel;
    private filterAxisPanel;
    private touchObj;
    private resColWidth;
    private timeOutObj;
    /**
     * Module declarations
     */
    private parent;
    private handlers;
    /** Constructor for GroupingBar module */
    constructor(parent: PivotView);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private renderLayout;
    private appendToElement;
    /**

     */
    refreshUI(): void;
    alignIcon(): void;
    /**

     */
    setGridRowWidth(): void;
    private setColWidth;
    private wireEvent;
    private unWireEvent;
    private dropIndicatorUpdate;
    private tapHoldHandler;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * To destroy the groupingbar
     * @return {void}

     */
    destroy(): void;
}
