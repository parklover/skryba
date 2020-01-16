import { Spreadsheet } from '../base/index';
import { ICellRenderer, CellRenderArgs } from '../common/index';
/**
 * CellRenderer class which responsible for building cell content.

 */
export declare class CellRenderer implements ICellRenderer {
    private parent;
    private element;
    private th;
    constructor(parent?: Spreadsheet);
    renderColHeader(index: number): Element;
    renderRowHeader(index: number): Element;
    render(args: CellRenderArgs): Element;
    private updateCell;
    private removeStyle;
    refreshRange(range: number[]): void;
}
