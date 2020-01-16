/**
 * To get range indexes.
 */
export declare function getRangeIndexes(range: string): number[];
/**
 * To get single cell indexes
 */
export declare function getCellIndexes(address: string): number[];
/**
 * To get cell address from given row and column index.
 */
export declare function getCellAddress(sRow: number, sCol: number): string;
/**
 * To get range address from given range indexes.
 */
export declare function getRangeAddress(range: number[]): string;
/**
 * To get column header cell text
 */
export declare function getColumnHeaderText(colIndex: number): string;
/**

 */
export declare function getIndexesFromAddress(address: string): number[];
/**

 */
export declare function getRangeFromAddress(address: string): string;
/**
 * Given range will be swapped/arranged in increasing order.

 */
export declare function getSwapRange(range: number[]): number[];
/**

 */
export declare function isSingleCell(range: number[]): boolean;
