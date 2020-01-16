import { Spreadsheet } from '../base/index';
import { IRowRenderer } from '../common/index';
/**
 * Sheet module is used for creating row element

 */
export declare class RowRenderer implements IRowRenderer {
    private parent;
    private element;
    private cellRenderer;
    constructor(parent?: Spreadsheet);
    render(index?: number, isRowHeader?: boolean, skipHidden?: boolean): Element;
    refresh(index: number, hRow?: Element): Element;
}
