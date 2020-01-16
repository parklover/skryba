import { Spreadsheet } from '../base/index';
/**
 * The `Scroll` module is used to handle scrolling behavior.

 */
export declare class Scroll {
    private parent;
    private onScroll;
    private offset;
    private topIndex;
    private leftIndex;
    private initScrollValue;
    prevScroll: {
        scrollLeft: number;
        scrollTop: number;
    };
    /**
     * Constructor for the Spreadsheet scroll module.
     * @private
     */
    constructor(parent: Spreadsheet);
    private onContentScroll;
    private updateNonVirtualRows;
    private updateNonVirtualCols;
    private updateTopLeftCell;
    private getRowOffset;
    private getColOffset;
    private wireEvents;
    private initProps;
    private getThreshold;
    /**

     */
    setPadding(): void;
    private addEventListener;
    private destroy;
    private removeEventListener;
}
