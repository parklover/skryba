import { FilterSettings } from '../base/grid';
import { IGrid, IFilterArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { ExcelFilterBase } from '../common/excel-filter-base';
import { CheckBoxFilter } from './checkbox-filter';
/**

 * `ExcelFilter` module is used to handle filtering action.
 */
export declare class ExcelFilter extends CheckBoxFilter {
    protected parent: IGrid;
    excelFilterBase: ExcelFilterBase;
    /**
     * Constructor for excelbox filtering module

     */
    constructor(parent?: IGrid, filterSettings?: FilterSettings, serviceLocator?: ServiceLocator, customFltrOperators?: Object);
    /**
     * To destroy the excel filter.
     * @return {void}

     */
    destroy(): void;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    filterByColumn(fieldName: string, firstOperator: string, firstValue: string | number | Date | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, secondOperator?: string, secondValue?: string | number | Date | boolean): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
}
