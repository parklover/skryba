import { IGrid } from '../base/interface';
import { Scroll } from '../actions/scroll';
/**

 */
export declare function getCloneProperties(): string[];
/**
 *
 * The `Print` module is used to handle print action.
 */
export declare class Print {
    private parent;
    private printWind;
    private scrollModule;
    private isAsyncPrint;
    static printGridProp: string[];
    private defered;
    /**
     * Constructor for the Grid print module

     */
    constructor(parent?: IGrid, scrollModule?: Scroll);
    private isContentReady;
    private hierarchyPrint;
    /**
     * By default, prints all the Grid pages and hides the pager.
     * > You can customize print options using the
     * [`printMode`](grid/#printmode-string/).
     * @return {void}
     */
    print(): void;
    private onEmpty;
    private actionBegin;
    private renderPrintGrid;
    private contentReady;
    private printGrid;
    private printGridElement;
    private removeColGroup;
    private hideColGroup;
    private isPrintGrid;
    /**
     * To destroy the print
     * @return {void}

     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
