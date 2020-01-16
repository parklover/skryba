import { Workbook } from '../base/index';
import { SheetModel } from './sheet-model';
import { RowModel } from './row-model';
import { CellModel } from './cell-model';
/**
 * Update data source to Sheet and returns Sheet

 */
export declare function getData(context: Workbook, address: string, columnWiseData?: boolean): Promise<Map<string, CellModel> | {
    [key: string]: CellModel;
}[]>;
/**

 */
export declare function getModel(model: (SheetModel | RowModel | CellModel)[], idx: number): SheetModel | RowModel | CellModel;
/**

 */
export declare function processIdx(model: (SheetModel | RowModel | CellModel)[], isSheet?: true, context?: Workbook): void;
/**

 */
export declare function clearRange(context: Workbook, address: string, sheetIdx: number, valueOnly: boolean): void;
