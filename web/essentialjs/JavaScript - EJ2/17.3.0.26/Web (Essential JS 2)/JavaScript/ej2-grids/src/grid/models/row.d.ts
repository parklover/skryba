import { Cell } from './cell';
import { IGrid } from '../base/interface';
/**
 * Row

 */
export declare class Row<T> {
    uid: string;
    data: Object;
    tIndex: number;
    isCaptionRow: boolean;
    changes: Object;
    isDirty: boolean;
    aggregatesCount: number;
    edit: string;
    isSelected: boolean;
    isReadOnly: boolean;
    isAltRow: boolean;
    isDataRow: boolean;
    isExpand: boolean;
    rowSpan: number;
    cells: Cell<T>[];
    index: number;
    indent: number;
    subRowDetails: Object;
    height: string;
    visible: boolean;
    attributes: {
        [x: string]: Object;
    };
    cssClass: string;
    foreignKeyData: Object;
    isDetailRow: boolean;
    childGrid: IGrid;
    constructor(options: {
        [x: string]: Object;
    });
    clone(): Row<T>;
}
