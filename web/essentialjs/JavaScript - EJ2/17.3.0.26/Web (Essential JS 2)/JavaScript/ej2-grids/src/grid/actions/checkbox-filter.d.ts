import { FilterSettings } from '../base/grid';
import { IGrid, IFilterArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
/**

 * `CheckBoxFilter` module is used to handle filtering action.
 */
export declare class CheckBoxFilter {
    protected parent: IGrid;
    checkBoxBase: CheckBoxFilterBase;
    /**
     * Constructor for checkbox filtering module

     */
    constructor(parent?: IGrid, filterSettings?: FilterSettings, serviceLocator?: ServiceLocator);
    /**
     * To destroy the check box filter.
     * @return {void}

     */
    destroy(): void;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private actionBegin;
    private actionComplete;
    private actionPrevent;
    addEventListener(): void;
    removeEventListener(): void;
}
