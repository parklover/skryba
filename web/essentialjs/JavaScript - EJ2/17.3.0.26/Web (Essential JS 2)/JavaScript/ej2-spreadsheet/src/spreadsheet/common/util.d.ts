import { StyleType, IAriaOptions } from './index';
import { Spreadsheet } from '../base/index';
import { SheetModel } from '../../workbook/index';
/**
 * The function used to update Dom using requestAnimationFrame.
 * @param  {Function} fn - Function that contains the actual action
 * @return {Promise<T>}

 */
export declare function getUpdateUsingRaf(fn: Function): void;
/**
 * The function used to remove the dom element children.
 * @param  parent -

 */
export declare function removeAllChildren(parent: Element, index?: number): void;
/**
 * The function used to remove the dom element children.
 * @param  parent -

 */
export declare function getColGroupWidth(index: number): number;
export declare function getScrollBarWidth(): number;
export declare function getSiblingsHeight(element: HTMLElement, classList?: string[]): number;
/**

 */
export declare function inView(context: Spreadsheet, range: number[], isModify?: boolean): boolean;
/**
 * Position element with given range

 */
export declare function locateElem(ele: Element, range: number[], sheet: SheetModel, isRtl?: boolean): void;
/**
 * To update element styles using request animation frame

 */
export declare function setStyleAttribute(styles: StyleType[]): void;
/**

 */
export declare function getStartEvent(): string;
/**

 */
export declare function getMoveEvent(): string;
/**

 */
export declare function getEndEvent(): string;
/**

 */
export declare function isTouchStart(e: Event): boolean;
/**

 */
export declare function isTouchMove(e: Event): boolean;
/**

 */
export declare function isTouchEnd(e: Event): boolean;
/**

 */
export declare function getClientX(e: TouchEvent & MouseEvent): number;
/**

 */
export declare function getClientY(e: MouseEvent & TouchEvent): number;
export declare function setAriaOptions(target: HTMLElement, options: IAriaOptions<boolean>): void;
/**

 */
export declare function destroyComponent(element: HTMLElement, component: Object): void;
/**

 */
export declare function setResize(index: number, value: string, isCol: boolean, parent: Spreadsheet): void;
/**

 */
export declare function setWidthAndHeight(trgt: HTMLElement, value: number, isCol: boolean): void;
/**

 */
export declare function findMaxValue(table: HTMLElement, text: HTMLElement[], isCol: boolean, parent: Spreadsheet): number;
