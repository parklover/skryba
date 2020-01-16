import { Internationalization } from '@syncfusion/ej2-base';
/**

 */
export declare function toFraction(val: number): string;
/**

 */
export declare function getGcd(a: string | number, b: string | number): number;
/**

 */
export declare function intToDate(val: number): Date;
/**

 */
export declare function dateToInt(val: any, isTime?: boolean): number;
/**

 */
export declare function isDateTime(date: any): boolean;
/**

 */
export declare function isNumber(val: string | number): boolean;
/**

 */
export declare function toDate(text: Date | string | number, intl: Internationalization): ToDateArgs;
export interface ToDateArgs {
    dateObj: Date;
    type: string;
    isCustom: boolean;
}
