/**
 * Query Builder Source
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { ChildProperty } from '@syncfusion/ej2-base';
import { QueryBuilderModel, ShowButtonsModel, ColumnsModel, RuleModel } from './query-builder-model';
import { EmitType, BaseEventArgs } from '@syncfusion/ej2-base';
import { Query, Predicate, DataManager } from '@syncfusion/ej2-data';
export declare class Columns extends ChildProperty<Columns> {
    /**
     * Specifies the fields in columns.

     */
    field: string;
    /**
     * Specifies the labels name in columns

     */
    label: string;
    /**
     * Specifies the types in columns field

     */
    type: string;
    /**
     * Specifies the values in columns or bind the values from sub controls.

     */
    values: string[] | number[] | boolean[];
    /**
     * Specifies the operators in columns.

     */
    operators: {
        [key: string]: Object;
    }[];
    /**
     * Specifies the template for value field such as slider or any other widgets.

     */
    template: TemplateColumn;
    /**
     * Specifies the validation for columns (text, number and date).

     */
    validation: Validation;
    /**
     * Specifies the date format for columns.

     */
    format: string;
    /**
     * Specifies the step value(numeric textbox) for columns.

     */
    step: number;
    /**
     * Specifies the default value for columns.

     */
    value: string[] | number[] | string | number | boolean | Date;
    /**
     * Specifies the category for columns.

     */
    category: string;
}
export declare class Rule extends ChildProperty<Rule> {
    /**
     * Specifies the condition value in group.

     */
    condition: string;
    /**
     * Specifies the rules in group.

     */
    rules: RuleModel[];
    /**
     * Specifies the field value in group.

     */
    field: string;
    /**
     * Specifies the label value in group.

     */
    label: string;
    /**
     * Specifies the type value in group.

     */
    type: string;
    /**
     * Specifies the operator value in group.

     */
    operator: string;
    /**
     * Specifies the sub controls value in group.

     */
    value: string[] | number[] | string | number | boolean;
}
export declare class ShowButtons extends ChildProperty<ShowButtons> {
    /**
     * Specifies the boolean value in ruleDelete that the enable/disable the buttons in rule.

     */
    ruleDelete: boolean;
    /**
     * Specifies the boolean value in groupInsert that the enable/disable the buttons in group.

     */
    groupInsert: boolean;
    /**
     * Specifies the boolean value in groupDelete that the enable/disable the buttons in group.

     */
    groupDelete: boolean;
}
/**
 * Specify Specifies the displayMode as Horizontal or Vertical.
 */
export declare type DisplayMode = 
/**  Display the Horizontal UI */
'Horizontal' | 
/**  Display the Vertical UI */
'Vertical';
/**
 * Specifies the sort direction of the field names. They are
 * * Default
 * * Ascending
 * * Descending
 */
export declare type SortDirection = 
/**  Show the field names in default */
'Default' | 
/**  Show the field names in Ascending */
'Ascending' | 
/**  Show the field names in Descending */
'Descending';
export declare class QueryBuilder extends Component<HTMLDivElement> implements INotifyPropertyChanged {
    private groupIdCounter;
    private ruleIdCounter;
    private btnGroupId;
    private levelColl;
    private isImportRules;
    private isPublic;
    private parser;
    private defaultLocale;
    private l10n;
    private intl;
    private items;
    private customOperators;
    private operators;
    private ruleElem;
    private groupElem;
    private dataColl;
    private dataManager;
    private fields;
    private selectedColumn;
    private actionButton;
    private isInitialLoad;
    private timer;
    /**
     * Triggers when the component is created.
     * @event

     */
    created: EmitType<Event>;
    /**
     * Triggers before the condition (And/Or), field, operator, value is changed.
     * @event

     */
    beforeChange: EmitType<ChangeEventArgs>;
    /**
     * Triggers when changing the condition(AND/OR), field, value, operator is changed
     * @event

     */
    change: EmitType<ChangeEventArgs>;
    /**
     * Triggers when changing the condition(AND/OR), field, value, operator is changed
     * @event

     */
    ruleChange: EmitType<RuleChangeEventArgs>;
    /**
     * Specifies the showButtons settings of the query builder component.
     * The showButtons can be enable Enables or disables the ruleDelete, groupInsert, and groupDelete buttons.

     */
    showButtons: ShowButtonsModel;
    /**
     * Shows or hides the filtered query.

     */
    summaryView: boolean;
    /**
     * Enables or disables the validation.

     */
    allowValidation: boolean;
    /**
     * Specifies columns to create filters.

     */
    columns: ColumnsModel[];
    /**
     * Defines class or multiple classes, which are separated by a space in the QueryBuilder element.
     * You can add custom styles to the QueryBuilder using the cssClass property.

     */
    cssClass: string;
    /**
     * Binds the column name from data source in query-builder.
     * The `dataSource` is an array of JavaScript objects.

     */
    dataSource: Object[] | Object | DataManager;
    /**
     * Specifies the displayMode as Horizontal or Vertical.

     */
    displayMode: DisplayMode;
    /**
     * Enable or disable persisting component's state between page reloads.
     * If enabled, filter states will be persisted.

     */
    enablePersistence: boolean;
    /**
     * Specifies the sort direction of the field names.

     */
    sortDirection: SortDirection;
    /**
     * Specifies the maximum group count or restricts the group count.

     */
    maxGroupCount: number;
    /**
     * Specifies the height of the query builder.

     */
    height: string;
    /**
     * Specifies the width of the query builder.

     */
    width: string;
    /**
     * If match case is set to true, the grid filters the records with exact match.
     * if false, it filters case insensitive records (uppercase and lowercase letters treated the same).

     */
    matchCase: boolean;
    /**
     * If immediateModeDelay is set by particular number, the rule Change event is triggered after that period.

     */
    immediateModeDelay: number;
    /**
     * Defines rules in the QueryBuilder.
     * Specifies the initial rule, which is JSON data.

     */
    rule: RuleModel;
    constructor(options?: QueryBuilderModel, element?: string | HTMLDivElement);
    protected getPersistData(): string;
    /**
     * Clears the rules without root rule.
     * @returns void.
     */
    reset(): void;
    private getWrapper;
    protected getModuleName(): string;
    private initialize;
    private clickEventHandler;
    private beforeSuccessCallBack;
    private selectBtn;
    private addRuleElement;
    private addRuleSuccessCallBack;
    private renderToolTip;
    /**
     * Validate the conditions and it display errors for invalid fields.
     * @returns boolean.
     */
    validateFields(): boolean;
    private refreshLevelColl;
    private refreshLevel;
    private groupTemplate;
    private ruleTemplate;
    private addGroupElement;
    private addGroupSuccess;
    notifyChange(value: string | number | boolean | Date | string[] | number[] | Date[], element: Element): void;
    private changeValue;
    private filterValue;
    private changeValueSuccessCallBack;
    private changeField;
    private changeRule;
    private changeFilter;
    private changeOperator;
    private fieldChangeSuccess;
    private operatorChangeSuccess;
    private changeRuleValues;
    private destroyControls;
    private templateDestroy;
    private getDistinctValues;
    private renderMultiSelect;
    private multiSelectOpen;
    private bindBlazorMultiSelectData;
    private bindMultiSelectData;
    private getMultiSelectData;
    private createSpinner;
    private closePopup;
    private processTemplate;
    private getItemData;
    private setDefaultValue;
    private renderStringValue;
    private renderNumberValue;
    private processValueString;
    private parseDate;
    private renderControls;
    private getOperatorIndex;
    private renderValues;
    private updateValues;
    private updateRules;
    private filterRules;
    private ruleValueUpdate;
    private validatValue;
    private findGroupByIdx;
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    /**
     * Adds single or multiple rules.
     * @returns void.
     */
    addRules(rule: RuleModel[], groupID: string): void;
    /**
     * Adds single or multiple groups, which contains the collection of rules.
     * @returns void.
     */
    addGroups(groups: RuleModel[], groupID: string): void;
    private initWrapper;
    private renderSummary;
    private renderSummaryCollapse;
    private columnSort;
    onPropertyChanged(newProp: QueryBuilderModel, oldProp: QueryBuilderModel): void;
    protected preRender(): void;
    protected render(): void;
    private executeDataManager;
    private initControl;
    protected wireEvents(): void;
    protected unWireEvents(): void;
    private getParentGroup;
    private deleteGroup;
    private deleteGroupSuccessCallBack;
    private deleteRule;
    private deleteRuleSuccessCallBack;
    private setGroupRules;
    /**
     * return the valid rule or rules collection.
     * @returns RuleModel.
     */
    getValidRules(currentRule: RuleModel): RuleModel;
    private getRuleCollection;
    /**
     * Set the rule or rules collection.
     * @returns void.
     */
    setRules(rule: RuleModel): void;
    /**
     * Gets the rule or rule collection.
     * @returns object.
     */
    getRules(): RuleModel;
    /**
     * Gets the rule.
     * @returns object.
     */
    getRule(elem: string | HTMLElement): RuleModel;
    /**
     * Gets the group.
     * @returns object.
     */
    getGroup(target: Element | string): RuleModel;
    /**
     * Deletes the group or groups based on the group ID.
     * @returns void.
     */
    deleteGroups(groupIdColl: string[]): void;
    /**
     * return the Query from current rules collection.
     * @returns Promise.

     */
    getFilteredRecords(): Promise<Object> | object;
    /**
     * Deletes the rule or rules based on the rule ID.
     * @returns void.
     */
    deleteRules(ruleIdColl: string[]): void;
    /**
     * Gets the query for Data Manager.
     * @returns string.
     */
    getDataManagerQuery(rule: RuleModel): Query;
    /**
     * Get the predicate from collection of rules.
     * @returns null
     */
    getPredicate(rule: RuleModel): Predicate;
    private getColumn;
    private datePredicate;
    private arrayPredicate;
    private importRules;
    private renderGroup;
    private renderRule;
    private getSqlString;
    /**
     * Sets the rules from the sql query.
     */
    setRulesFromSql(sqlString: string): void;
    /**
     * Get the rules from SQL query.
     * @returns object.
     */
    getRulesFromSql(sqlString: string): RuleModel;
    /**
     * Gets the sql query from rules.
     * @returns object.
     */
    getSqlFromRules(rule: RuleModel, allowEscape?: boolean): string;
    private sqlParser;
    private parseSqlStrings;
    private getOperator;
    private getTypeFromColumn;
    private processParser;
    private isBlazor;
}
export interface Level {
    [key: string]: number[];
}
export interface TemplateColumn {
    /**
     * Creates the custom component.

     */
    create?: Element | Function | string;
    /**
     * Wire events for the custom component.

     */
    write?: void | Function | string;
    /**
     * Destroy the custom component.

     */
    destroy?: Function | string;
}
export interface Validation {
    /**
     * Specifies the minimum value in textbox validation.

     */
    min?: number;
    /**
     * Specifies the maximum value in textbox validation.

     */
    max?: number;
    /**
     * Specifies whether the value is required or not

     */
    isRequired: boolean;
}
/**
 * Interface for change event.
 */
export interface ChangeEventArgs extends BaseEventArgs {
    groupID: string;
    ruleID?: string;
    value?: string | number | Date | boolean | string[];
    selectedIndex?: number;
    selectedField?: string;
    cancel?: boolean;
    type?: string;
}
export interface RuleChangeEventArgs extends BaseEventArgs {
    previousRule?: RuleModel;
    rule: RuleModel;
    type?: string;
}
