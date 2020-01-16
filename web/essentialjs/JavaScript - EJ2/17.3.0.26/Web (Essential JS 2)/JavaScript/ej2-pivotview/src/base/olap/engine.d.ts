import { Internationalization, Ajax } from '@syncfusion/ej2-base';
import { IField, IDataOptions, IMembers, IDrillOptions, IDrilledItem, IFieldOptions, IPageSettings, ISort } from '../engine';
import { IAxisSet, IGridValues, IPivotValues, IFilter, ICustomProperties, IValueSortSettings, ICalculatedFieldSettings } from '../engine';
import { IFormatSettings, IMatrix2D } from '../engine';
/**
 * OlapEngine is used to manipulate the olap or Multi-Dimensional data as pivoting values.
 */
export declare class OlapEngine {
    isEmptyData: boolean;
    globalize: Internationalization;
    fieldList: IOlapFieldListOptions;
    fields: string[];
    rows: IFieldOptions[];
    columns: IFieldOptions[];
    values: IFieldOptions[];
    filters: IFieldOptions[];
    calculatedFieldSettings: ICalculatedFieldSettings[];
    isMutiMeasures: boolean;
    drilledMembers: IDrillOptions[];
    valueSortSettings: IValueSortSettings;
    isEngineUpdated: boolean;
    savedFieldList: IOlapFieldListOptions;
    savedFieldListData: IOlapField[];
    valueAxis: string;
    columnCount: number;
    rowCount: number;
    colFirstLvl: number;
    rowFirstLvl: number;
    pageColStartPos: number;
    enableSort: boolean;
    enableValueSorting: boolean;
    isHeaderAvail: boolean;
    fieldListData: IOlapField[];
    fieldListObj: FieldData;
    dataFields: {
        [key: string]: IFieldOptions;
    };
    formats: IFormatSettings[];
    formatFields: {
        [key: string]: IFormatSettings;
    };
    emptyCellTextContent: string;
    isMondrian: boolean;
    isMeasureAvail: boolean;
    selectedItems: string[];
    filterSettings: IFilter[];
    sortSettings: ISort[];
    filterMembers: {
        [key: string]: string[] | IFilter[];
    };
    allowMemberFilter: boolean;
    allowLabelFilter: boolean;
    allowValueFilter: boolean;
    mdxQuery: string;
    isPaging: boolean;
    pageSettings: IPageSettings;
    calcChildMembers: IOlapField[];
    drilledSets: {
        [key: string]: HTMLElement;
    };
    aggregatedValueMatrix: IMatrix2D;
    private localeObj;
    private measureReportItems;
    private locale;
    private customRegex;
    private formatRegex;
    xmlaCellSet: NodeListOf<Element>;
    pivotValues: IPivotValues;
    dataSourceSettings: IDataOptions;
    valueContent: IGridValues;
    headerContent: IGridValues;
    colMeasurePos: number;
    rowStartPos: number;
    pageRowStartPos: number;
    rowMeasurePos: number;
    tupColumnInfo: ITupInfo[];
    tupRowInfo: ITupInfo[];
    gridJSON: string;
    namedSetsPosition: {
        [key: string]: {
            [key: number]: string;
        };
    };
    private colDepth;
    private totalCollection;
    private parentObjCollection;
    private colMeasures;
    private curDrillEndPos;
    private headerGrouping;
    private lastLevel;
    private xmlDoc;
    private request;
    private customArgs;
    private onDemandDrillEngine;
    private showRowSubTotals;
    private showColumnSubTotals;
    private hideRowTotalsObject;
    private hideColumnTotalsObject;
    private sortObject;
    renderEngine(dataSourceSettings?: IDataOptions, customProperties?: IOlapCustomProperties): void;
    generateGridData(dataSourceSettings: IDataOptions, action?: string): void;
    generatePagingData(xmlDoc: Document, request: Ajax, customArgs: FieldData): void;
    scrollPage(direction: string, newPage?: number, prevPage?: number): void;
    generateEngine(xmlDoc: Document, request: Ajax, customArgs: FieldData): void;
    private getSubTotalsVisibility;
    private frameRowHeader;
    private frameTupCollection;
    private getCaptionCollectionWithMeasure;
    /** hidden */
    setNamedSetsPosition(): void;
    private updateRowEngine;
    private updateTupCollection;
    private frameColumnHeader;
    private orderTotals;
    private setParentCollection;
    private setDrillInfo;
    private levelCompare;
    private mergeTotCollection;
    private getLevelsAsString;
    private frameCommonColumnLoop;
    private getDrilledParent;
    private performRowSorting;
    private performColumnSorting;
    private frameUniqueName;
    private sortRowHeaders;
    private sortColumnHeaders;
    private frameSortObject;
    private getParentUname;
    private performColumnSpanning;
    private frameValues;
    /** hidden */
    getFormattedValue(value: number, fieldName: string, formattedText: string): string;
    private getMeasureInfo;
    private frameMeasureOrder;
    getDrilledSets(uNameCollection: string, currentCell: IAxisSet, fieldPos: number, axis: string): {
        [key: string]: string;
    };
    updateDrilledInfo(dataSourceSettings: IDataOptions): void;
    updateCalcFields(dataSourceSettings: IDataOptions, lastcalcInfo: ICalculatedFieldSettings): void;
    onSort(dataSourceSettings: IDataOptions): void;
    private updateFieldlist;
    updateFieldlistData(name: string, isSelect?: boolean): void;
    private getFormattedFields;
    private getFieldList;
    getTreeData(args: ConnectionInfo, successMethod: Function, customArgs: object): void;
    private getAxisFields;
    private getAggregateType;
    getUniqueName(name: string): string;
    private updateFilterItems;
    private getParentNode;
    updateDrilledItems(drilledMembers: IDrillOptions[]): IDrillOptions[];
    /**

     */
    getDrillThroughData(pivotValue: IAxisSet, maxRows: number): void;
    private drillThroughSuccess;
    getFilterMembers(dataSourceSettings: IDataOptions, fieldName: string, levelCount: number, isSearchFilter?: boolean, loadLevelMember?: boolean): string;
    getMembers(dataSourceSettings: IDataOptions, fieldName: string, isAllFilterData?: boolean, filterParentQuery?: string, loadLevelMember?: boolean): void;
    getChildMembers(dataSourceSettings: IDataOptions, memberUQName: string, fieldName: string): void;
    getCalcChildMembers(dataSourceSettings: IDataOptions, memberUQName: string): void;
    getSearchMembers(dataSourceSettings: IDataOptions, fieldName: string, searchString: string, maxNodeLimit: number, isAllFilterData?: boolean, levelCount?: number): void;
    private generateMembers;
    private getFieldListItems;
    private loadCalculatedMemberElements;
    private loadDimensionElements;
    private loadNamedSetElements;
    private loadHierarchyElements;
    private loadLevelElements;
    private loadMeasureElements;
    private loadMeasureGroups;
    doAjaxPost(type: string, url: string, data: string, success: Function, customArgs?: Object): void;
    private getSoapMsg;
    getConnectionInfo(connectionString: string, locale: string | number): ConnectionInfo;
    getMDXQuery(dataSourceSettings: IDataOptions): string;
}
/**

 */
export interface IOlapFieldListOptions {
    [index: string]: IOlapField;
}
/**

 */
export interface IOlapField extends IField {
    pid?: string;
    tag?: string;
    hasChildren?: boolean;
    expanded?: boolean;
    spriteCssClass?: string;
    name?: string;
    defaultHierarchy?: string;
    hasAllMember?: boolean;
    allMember?: string;
    isChecked?: boolean;
    filterMembers?: IOlapField[];
    childMembers?: IOlapField[];
    searchMembers?: IOlapField[];
    htmlAttributes?: {
        [key: string]: string;
    };
    currrentMembers?: IMembers;
    isHierarchy?: boolean;
    isNamedSets?: boolean;
    formatString?: string;
    actualFilter?: string[];
    levels?: IOlapField[];
    levelCount?: number;
    memberType?: number;
    isCalculatedField?: boolean;
    fieldType?: string;
    parentHierarchy?: string;
}
/**

 */
export interface ConnectionInfo {
    url?: string;
    LCID?: string;
    catalog?: string;
    cube?: string;
    request?: string;
}
/**

 */
export interface FieldData {
    hierarchy?: IOlapField[];
    hierarchySuccess?: Document;
    measures?: any;
    dataSourceSettings?: IDataOptions;
    action?: string;
    reportElement?: string[];
    measuresGroups?: HTMLElement[];
    fieldName?: string;
    drillInfo?: IDrilledItem;
    loadLevelMembers?: boolean;
}
export interface IOlapCustomProperties extends ICustomProperties {
    savedFieldList?: IOlapFieldListOptions;
    savedFieldListData?: IOlapField[];
}
export interface ITupInfo {
    allCount?: number;
    allStartPos?: number;
    measure?: Element;
    measureName?: string;
    measurePosition?: number;
    members?: NodeListOf<Element>;
    typeCollection?: string[];
    levelCollection?: number[];
    uNameCollection?: string;
    captionCollection?: string;
    drillInfo?: IDrillInfo[];
    drillStartPos?: number;
    drillEndPos?: number;
    startDrillUniquename?: string;
    endDrillUniquename?: string;
    showTotals?: boolean;
}
export interface IDrillInfo {
    level: number;
    uName: string;
    hierarchy: string;
    isDrilled: boolean;
}
export interface ITotCollection {
    allCount: number;
    allStartPos?: number;
    ordinal: number;
    members: NodeListOf<Element>;
    drillInfo?: IDrillInfo[];
}
export interface IParentObjCollection {
    [key: number]: {
        [key: number]: Element;
    };
}
export interface ILastSavedInfo {
    [key: string]: string | number;
}
export interface IMeasureInfo {
    measureAxis: string;
    measureIndex: number;
    valueInfo: string[];
}
export interface IOrderedInfo {
    orderedValueTuples: Element[];
    orderedHeaderTuples: Element[];
}
