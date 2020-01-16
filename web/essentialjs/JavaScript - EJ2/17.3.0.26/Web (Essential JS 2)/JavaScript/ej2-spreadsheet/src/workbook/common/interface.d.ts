import { CellStyleModel } from './class-model';
import { SaveType, SortOrder, FormatType } from './index';
import { Sheet, RangeSettingModel, CellModel } from '../base/index';
export interface SaveOptions {
    url?: string;
    fileName?: string;
    saveType?: SaveType;
}
export interface BeforeSaveEventArgs extends SaveOptions {
    customParams: Object;
    isFullPost: boolean;
    needBlobData: boolean;
    cancel: boolean;
}
export interface SaveCompleteEventArgs extends SaveOptions {
    blobData: Blob;
    status: string;
    message: string;
}
export interface CellFormatArgs {
    style: CellStyleModel;
    rowIdx: number;
    colIdx: number;
    cell?: HTMLElement;
    row?: HTMLElement;
    hRow?: HTMLElement;
    lastCell?: boolean;
    isHeightCheckNeeded?: boolean;
    manualUpdate?: boolean;
    onActionUpdate?: boolean;
}
export interface SetCellFormatArgs {
    style: CellStyleModel;
    range?: string | number[];
    refreshRibbon?: boolean;
    onActionUpdate?: boolean;
    cancel?: boolean;
}
export interface ExtendedRange extends RangeSettingModel {
    info?: RangeInfo;
}
interface RangeInfo {
    loadedRange?: number[][];
    count?: number;
    fldLen?: number;
}
export interface AutoDetectInfo {
    value: string;
    args: {
        sheet: Sheet;
        indexes: number[];
    };
    cell: CellModel;
    rowIndex: number;
    colIndex: number;
    i: number;
    j: number;
    k: number;
    sRanges: number[];
    range: ExtendedRange;
}
/**

 */
export interface ExtendedSheet extends Sheet {
    isLocalData?: boolean;
}
/**
 * Specifies before cell formatting arguments.
 */
export interface BeforeCellFormatArgs {
    range: string;
    requestType: FormatType;
    format?: string;
    style?: CellStyleModel;
    sheetIndex?: number;
    cancel?: boolean;
}
export interface AggregateArgs {
    Count: number;
    Sum: string;
    Avg: string;
    Min: string;
    Max: string;
}
/**
 * Specifies the procedure for sorting.
 */
export interface SortDescriptor {
    field?: string;
    order?: SortOrder;
    sortComparer?: Function;
}
/**
 * Specifies the arguments for sorting.
 */
export interface SortEventArgs {
    range?: string;
    sortOptions?: SortOptions;
}
/**
 * Specifies the options for sorting.
 */
export interface SortOptions {
    sortDescriptors?: SortDescriptor | SortDescriptor[];
    containsHeader?: boolean;
    caseSensitive?: boolean;
}
/**
 * Specifies before sorting arguments.
 */
export interface BeforeSortEventArgs extends SortEventArgs {
    cancel?: boolean;
}
export {};
