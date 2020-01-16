/**
 * Utils.ts class for EJ2-PDF
 * @private

 */
export interface ICompareFunction<T> {
    (a: T, b: T): number;
}
/**
 * @private

 */
export interface IEqualsFunction<T> {
    (a: T, b: T): boolean;
}
/**
 * @private

 */
export interface ILoopFunction<T> {
    (a: T): boolean | void;
}
/**
 * @private

 */
export declare function defaultToString(item: string | number | string[] | number[] | Object | Object[] | boolean): string;
