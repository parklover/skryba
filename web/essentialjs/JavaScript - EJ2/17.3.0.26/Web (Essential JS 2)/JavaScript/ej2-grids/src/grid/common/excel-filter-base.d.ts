import { FilterSettings } from '../base/grid';
import { IGrid, IFilterArgs } from '../base/interface';
import { ContextMenu } from '@syncfusion/ej2-navigations';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
/**

 * `ExcelFilter` module is used to handle filtering action.
 */
export declare class ExcelFilterBase extends CheckBoxFilterBase {
    private datePicker;
    private dateTimePicker;
    private actObj;
    private numericTxtObj;
    private dlgDiv;
    private l10n;
    private dlgObj;
    private menuEle;
    private customFilterOperators;
    private dropOptr;
    private optrData;
    private menuItem;
    private menu;
    private cmenu;
    protected menuObj: ContextMenu;
    private isCMenuOpen;
    /**
     * Constructor for excel filtering module

     */
    constructor(parent?: IGrid, filterSettings?: FilterSettings, customFltrOperators?: Object);
    private getCMenuDS;
    /**
     * To destroy the filter bar.
     * @return {void}

     */
    destroy(): void;
    private createMenu;
    private createMenuElem;
    private wireExEvents;
    private unwireExEvents;
    private clickExHandler;
    private destroyCMenu;
    private hoverHandler;
    private ensureTextFilter;
    private preventClose;
    private getContextBounds;
    private getCMenuYPosition;
    openDialog(options: IFilterArgs): void;
    closeDialog(): void;
    private selectHandler;
    private renderDialogue;
    private removeDialog;
    private createdDialog;
    private renderCustomFilter;
    private filterBtnClick;
    /**

     * Filters grid row by column name with given options.
     * @param {string} fieldName - Defines the field name of the filter column.
     * @param {string} firstOperator - Defines the first operator by how to filter records.
     * @param {string | number | Date | boolean} firstValue - Defines the first value which is used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query with another by using AND or OR predicate.
     * @param {boolean} matchCase - If ignore case set to true, then filter records with exact match or else
     * filter records with case insensitive(uppercase and lowercase letters treated as same).
     * @param {boolean} ignoreAccent - If ignoreAccent set to true, then ignores the diacritic characters or accents when filtering.
     * @param {string} secondOperator - Defines the second operator by how to filter records.
     * @param {string | number | Date | boolean} secondValue - Defines the first value which is used to filter records.
     */
    filterByColumn(fieldName: string, firstOperator: string, firstValue: string | number | Date | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, secondOperator?: string, secondValue?: string | number | Date | boolean): void;
    private renderOperatorUI;
    private dropDownOpen;
    private getSelectedValue;
    private dropSelectedVal;
    private getSelectedText;
    private renderFilterUI;
    private renderRadioButton;
    private removeObjects;
    private renderFlValueUI;
    private getExcelFilterData;
    private renderMatchCase;
    private renderDate;
    private renderDateTime;
    private completeAction;
    private renderNumericTextBox;
    private renderAutoComplete;
    private performComplexDataOperation;
}
