import { Internationalization, NumberFormatOptions, DateFormatOptions, L10n } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Sorting, SummaryTypes, FilterType, Operators, Condition } from './types';
import { DateGroup, GroupType, ProviderType } from './types';
import { HeaderCollection } from '../common';
/**
 * PivotEngine is used to manipulate the relational or Multi-Dimensional data as pivoting values.
 */
export declare class PivotEngine {
    globalize: Internationalization;
    fieldList: IFieldListOptions;
    pivotValues: IPivotValues;
    aggregatedValueMatrix: IMatrix2D;
    headerContent: IGridValues;
    valueContent: IGridValues;
    fields: string[];
    rows: IFieldOptions[];
    columns: IFieldOptions[];
    values: IFieldOptions[];
    filters: IFieldOptions[];
    excludeFields: string[];
    groups: IGroupSettings[];
    isMutiMeasures: boolean;
    alwaysShowValueHeader: boolean;
    drilledMembers: IDrillOptions[];
    formats: IFormatSettings[];
    isExpandAll: boolean;
    enableSort: boolean;
    showSubTotals: boolean;
    showRowSubTotals: boolean;
    showColumnSubTotals: boolean;
    showGrandTotals: boolean;
    showRowGrandTotals: boolean;
    showHeaderWhenEmpty: boolean;
    showColumnGrandTotals: boolean;
    pageSettings: IPageSettings;
    filterMembers: number[];
    formatFields: {
        [key: string]: IFormatSettings;
    };
    dateFormatFunction: {
        [key: string]: {
            exactFormat: Function;
            fullFormat: Function;
        };
    };
    calculatedFieldSettings: ICalculatedFieldSettings[];
    calculatedFields: {
        [key: string]: ICalculatedFields;
    };
    calculatedFormulas: {
        [key: string]: Object;
    };
    valueSortSettings: IValueSortSettings;
    isEngineUpdated: boolean;
    savedFieldList: IFieldListOptions;
    valueAxis: number;
    saveDataHeaders: {
        [key: string]: IAxisSet[];
    };
    columnCount: number;
    rowCount: number;
    colFirstLvl: number;
    rowFirstLvl: number;
    rowStartPos: number;
    colStartPos: number;
    enableValueSorting: boolean;
    headerCollection: HeaderCollection;
    isValueFilterEnabled: boolean;
    isEmptyData: boolean;
    emptyCellTextContent: string;
    isHeaderAvail: boolean;
    isDrillThrough: boolean;
    rMembers: IAxisSet[];
    cMembers: IAxisSet[];
    private allowValueFilter;
    private isValueFiltered;
    private isValueFiltersAvail;
    private valueSortData;
    private valueFilteredData;
    private filterFramedHeaders;
    private valueMatrix;
    private indexMatrix;
    private memberCnt;
    private pageInLimit;
    private endPos;
    private removeCount;
    private colHdrBufferCalculated;
    private colValuesLength;
    private rowValuesLength;
    private slicedHeaders;
    private fieldFilterMem;
    private filterPosObj;
    private selectedHeaders;
    private rawIndexObject;
    private isEditing;
    data: IDataSet[];
    actualData: IDataSet[];
    private allowDataCompression;
    private dataSourceSettings;
    private frameHeaderObjectsCollection;
    private headerObjectsCollection;
    private localeObj;
    private getValueCellInfo;
    private fieldsType;
    private groupingFields;
    private columnKeys;
    private fieldDrillCollection;
    private customRegex;
    private formatRegex;
    renderEngine(dataSource?: IDataOptions, customProperties?: ICustomProperties, fn?: Function): void;
    private getGroupedRawData;
    private getGroupData;
    private frameData;
    private getRange;
    private getFormattedFields;
    private getFieldList;
    private updateFieldList;
    private updateTreeViewData;
    private getCalculatedField;
    private validateFilters;
    private fillFieldMembers;
    private generateValueMatrix;
    private updateSortSettings;
    private updateFilterMembers;
    private getFilters;
    private isValidFilterField;
    private applyLabelFilter;
    private getLabelFilterMembers;
    private getDateFilterMembers;
    private validateFilterValue;
    private frameFilterList;
    private updateFilter;
    private applyValueFiltering;
    private getFilteredData;
    private getParsedValue;
    private removefilteredData;
    private validateFilteredParentData;
    private updateFramedHeaders;
    private validateFilteredHeaders;
    private isEmptyDataAvail;
    updateGridData(dataSource: IDataOptions): void;
    generateGridData(dataSource: IDataOptions, headerCollection?: HeaderCollection): void;
    onDrill(drilledItem: IDrilledItem): void;
    onSort(sortItem: ISort): void;
    onFilter(filterItem: IFilter, dataSource: IDataOptions): void;
    onAggregation(field: IFieldOptions): void;
    onCalcOperation(field: ICalculatedFields): void;
    private performDrillOperation;
    private performSortOperation;
    private performFilterDeletion;
    private matchIndexes;
    private performFilterAddition;
    private performFilterCommonUpdate;
    private getHeadersInfo;
    updateEngine(): void;
    private getAxisByFieldName;
    private getFieldByName;
    private updateHeadersCount;
    frameHeaderWithKeys(header: any): IAxisSet;
    private getSortedHeaders;
    applyValueSorting(rMembers?: IAxisSet[], cMembers?: IAxisSet[]): ISortedHeaders;
    private getMember;
    private sortByValueRow;
    private insertAllMembersCommon;
    private insertSubTotals;
    private frameDrillObject;
    private getIndexedHeaders;
    private getOrderedIndex;
    private insertPosition;
    private insertTotalPosition;
    private calculatePagingValues;
    private performSlicing;
    private removeChildMembers;
    private insertAllMember;
    private getTableData;
    private getAggregatedHeaders;
    private getAggregatedHeaderData;
    private updateSelectedHeaders;
    private applyAdvancedAggregate;
    private updateAggregates;
    private recursiveRowData;
    private updateRowData;
    private getCellSet;
    private getHeaderData;
    private getAggregateValue;
    private evaluate;
    /** hidden */
    getFormattedValue(value: number | string, fieldName: string): IAxisSet;
    private powerFunction;
}
export interface IDataOptions {
    catalog?: string;
    cube?: string;
    providerType?: ProviderType;
    url?: string;
    localeIdentifier?: number;
    dataSource?: IDataSet[] | DataManager;
    rows?: IFieldOptions[];
    columns?: IFieldOptions[];
    values?: IFieldOptions[];
    filters?: IFieldOptions[];
    excludeFields?: string[];
    expandAll?: boolean;
    valueAxis?: string;
    filterSettings?: IFilter[];
    sortSettings?: ISort[];
    enableSorting?: boolean;
    formatSettings?: IFormatSettings[];
    drilledMembers?: IDrillOptions[];
    valueSortSettings?: IValueSortSettings;
    calculatedFieldSettings?: ICalculatedFieldSettings[];
    allowMemberFilter?: boolean;
    allowLabelFilter?: boolean;
    allowValueFilter?: boolean;
    showSubTotals?: boolean;
    showRowSubTotals?: boolean;
    showColumnSubTotals?: boolean;
    showGrandTotals?: boolean;
    showRowGrandTotals?: boolean;
    showColumnGrandTotals?: boolean;
    showHeaderWhenEmpty?: boolean;
    alwaysShowValueHeader?: boolean;
    conditionalFormatSettings?: IConditionalFormatSettings[];
    emptyCellsTextContent?: string;
    groupSettings?: IGroupSettings[];
}
export interface IConditionalFormatSettings {
    measure?: string;
    conditions?: Condition;
    value1?: number;
    value2?: number;
    style?: IStyle;
    label?: string;
    applyGrandTotals?: boolean;
}
export interface IStyle {
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
}
export interface IValueSortSettings {
    headerText?: string;
    headerDelimiter?: string;
    sortOrder?: Sorting;
    columnIndex?: number;
    measure?: string;
}
export interface IPageSettings {
    columnSize?: number;
    rowSize?: number;
    columnCurrentPage?: number;
    rowCurrentPage?: number;
    allowDataCompression?: boolean;
}
/**

 */
export interface IMatrix2D {
    [key: number]: {
        [key: number]: number;
    };
    length: number;
    push(item: number): number;
}
/**

 */
interface ISortedHeaders {
    rMembers: IAxisSet[];
    cMembers: IAxisSet[];
}
/**

 */
export interface IFilterObj {
    [key: string]: {
        memberObj: IStringIndex;
    };
}
/**

 */
export interface IIterator {
    [key: string]: {
        index: number[];
        indexObject: INumberIndex;
    };
}
/**

 */
export interface INumberIndex {
    [key: string]: number;
}
/**

 */
export interface INumberArrayIndex {
    [key: string]: number[];
}
/**

 */
export interface IStringIndex {
    [key: string]: string;
}
/**

 */
export interface IPivotValues {
    [key: number]: IPivotRows;
    length: number;
}
/**

 */
export interface IPivotRows {
    [key: number]: number | string | Object | IAxisSet;
    length: number;
}
/**

 */
export interface IGridValues {
    [key: number]: IAxisSet[];
    length: number;
}
/**

 */
export interface ISelectedValues {
    [key: number]: IAxisSet;
}
/**

 */
export interface IDataSet {
    [key: string]: string | number | Date;
}
export interface IFieldOptions {
    name?: string;
    caption?: string;
    type?: SummaryTypes;
    axis?: string;
    showNoDataItems?: boolean;
    baseField?: string;
    baseItem?: string;
    showSubTotals?: boolean;
    isNamedSet?: boolean;
    isCalculatedField?: boolean;
}
export interface ISort {
    name?: string;
    order?: Sorting;
}
export interface IFilter {
    name?: string;
    type?: FilterType;
    items?: string[];
    condition?: Operators;
    value1?: string | Date;
    value2?: string | Date;
    showLabelFilter?: boolean;
    showDateFilter?: boolean;
    showNumberFilter?: boolean;
    measure?: string;
    levelCount?: number;
    selectedField?: string;
}
export interface IDrillOptions {
    name?: string;
    items?: string[];
    delimiter?: string;
}
export interface ICalculatedFieldSettings {
    name?: string;
    formula?: string;
    hierarchyUniqueName?: string;
    formatString?: string;
}
export interface ICalculatedFields extends ICalculatedFieldSettings {
    actualFormula?: string;
}
export interface IFormatSettings extends NumberFormatOptions, DateFormatOptions {
    name?: string;
}
/**

 */
export interface IMembers {
    [index: string]: {
        ordinal?: number;
        index?: number[];
        name?: string;
        isDrilled?: boolean;
        isNodeExpand?: boolean;
        parent?: string;
        caption?: string;
        isSelected?: boolean;
    };
}
/**

 */
export interface IFieldListOptions {
    [index: string]: IField;
}
export interface IField {
    id?: string;
    caption?: string;
    type?: string;
    formatString?: string;
    index?: number;
    members?: IMembers;
    formattedMembers?: IMembers;
    dateMember?: IAxisSet[];
    filter?: string[];
    sort?: string;
    aggregateType?: string;
    baseField?: string;
    baseItem?: string;
    filterType?: string;
    format?: string;
    formula?: string;
    isSelected?: boolean;
    isExcelFilter?: boolean;
    showNoDataItems?: boolean;
}
export interface IAxisSet {
    formattedText?: string;
    actualText?: number | string;
    type?: string;
    isDrilled?: boolean;
    hasChild?: boolean;
    members?: this[];
    index?: number[];
    indexObject?: INumberIndex;
    ordinal?: number;
    level?: number;
    axis?: string;
    value?: number;
    colSpan?: number;
    rowSpan?: number;
    valueSort?: IDataSet;
    colIndex?: number;
    rowIndex?: number;
    columnHeaders?: string | number | Date;
    rowHeaders?: string | number | Date;
    isSum?: boolean;
    isLevelFiltered?: boolean;
    cssClass?: string;
    style?: IStyle;
    enableHyperlink?: boolean;
    showSubTotals?: boolean;
    dateText?: number | string;
    memberType?: number;
    parentUniqueName?: string;
    levelUniqueName?: string;
    hierarchy?: string;
    colOrdinal?: number;
    rowOrdinal?: number;
    isNamedSet?: boolean;
}
export interface IDrilledItem {
    fieldName: string;
    memberName: string;
    axis: string;
    action: string;
    delimiter: string;
    currentCell?: IAxisSet;
}
export interface ICustomProperties {
    mode?: string;
    savedFieldList?: IFieldListOptions;
    pageSettings?: IPageSettings;
    enableValueSorting?: boolean;
    isDrillThrough?: boolean;
    localeObj?: L10n;
    fieldsType?: IStringIndex;
}
export interface IGroupSettings {
    name?: string;
    groupInterval?: DateGroup[];
    startingAt?: Date | number | string;
    endingAt?: Date | number | string;
    rangeInterval?: number;
    type?: GroupType;
}
export interface IGroupRange {
    range?: string;
    isNotInRange?: boolean;
    value?: Date | number;
}
export {};
