import { FilterSettings } from '../base/grid';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 *
 * The `Filter` module is used to handle filtering action.
 */
export declare class Filter implements IAction {
    private filterSettings;
    private element;
    private value;
    private predicate;
    private operator;
    private column;
    private fieldName;
    private matchCase;
    private ignoreAccent;
    private timer;
    private filterStatusMsg;
    private currentFilterObject;
    private isRemove;
    private contentRefresh;
    private initialLoad;
    private refresh;
    private values;
    private cellText;
    private nextFlMenuOpen;
    private type;
    private filterModule;
    private filterOperators;
    private fltrDlgDetails;
    private customOperators;
    skipNumberInput: string[];
    skipStringInput: string[];
    private parent;
    private serviceLocator;
    private l10n;
    private valueFormatter;
    private actualPredicate;
    /**
     * Constructor for Grid filtering module

     */
    constructor(parent?: IGrid, filterSettings?: FilterSettings, serviceLocator?: ServiceLocator);
    /**
     * To render filter bar when filtering enabled.
     * @return {void}

     */
    render(e?: NotifyArgs): void;
    /**
     * To destroy the filter bar.
     * @return {void}

     */
    destroy(): void;
    private generateRow;
    private generateCells;
    private generateCell;
    /**
     * To update filterSettings when applying filter.
     * @return {void}

     */
    updateModel(): void;
    private getFilteredColsIndexByField;
    /**
     * To trigger action complete event.
     * @return {void}

     */
    onActionComplete(e: NotifyArgs): void;
    private wireEvents;
    private unWireEvents;
    private enableAfterRender;
    private initialEnd;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    private filterMenuClose;
    /**
     * Filters the Grid row by fieldName, filterOperator, and filterValue.
     * @param  {string} fieldName - Defines the field name of the filter column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean} filterValue - Defines the value which is used to filter records.
     * @param  {string} predicate - Defines the relationship of one filter query with another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, then the filter records
     * the exact match or <br> filters records that are case insensitive (uppercase and lowercase letters treated the same).
     * @param {boolean} ignoreAccent - If ignoreAccent set to true, then filter ignores the diacritic characters or accents while filtering.
     * @param  {string} actualFilterValue - Defines the actual filter value for the filter column.
     * @param  {string} actualOperator - Defines the actual filter operator for the filter column.
     * @return {void}
     */
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Date | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: Object, actualOperator?: Object): void;
    private applyColumnFormat;
    private onPropertyChanged;
    private refreshFilterSettings;
    private getFilterBarElement;
    /**
     * @private
     */
    refreshFilter(): void;
    /**
     * Clears all the filtered rows of the Grid.
     * @return {void}
     */
    clearFiltering(): void;
    private checkAlreadyColFiltered;
    private columnMenuFilter;
    private filterDialogOpen;
    /**
     * Removes filtered column by field name.
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @return {void}

     */
    removeFilteredColsByField(field: string, isClearFilterBar?: boolean): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private keyUpHandler;
    private updateCrossIcon;
    private updateFilterMsg;
    private setFormatForFlColumn;
    private checkForSkipInput;
    private processFilter;
    private startTimer;
    private stopTimer;
    private onTimerTick;
    private validateFilterValue;
    private getOperator;
    private columnPositionChanged;
    private getLocalizedCustomOperators;
    private filterIconClickHandler;
    private clickHandler;
    private filterHandler;
    private updateFilter;
    private refreshFilterIcon;
    private addFilteredClass;
}
