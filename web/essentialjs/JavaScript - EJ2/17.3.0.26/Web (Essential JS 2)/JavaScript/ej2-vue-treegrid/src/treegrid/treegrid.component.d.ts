import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * `ejs-treegrid` represents the VueJS TreeGrid Component.
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'></ejs-treegrid>
 * ```
 */
export declare class TreeGridComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    addRecord(data?: Object, index?: number, position?: Object): void;
    autoFitColumns(fieldNames?: string | string[]): void;
    clearFiltering(): void;
    clearSelection(): void;
    clearSorting(): void;
    closeEdit(): void;
    collapseAll(): void;
    collapseAtLevel(level: number): void;
    collapseRow(row: Object, record?: Object): void;
    csvExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Object;
    deleteRecord(fieldName?: string, data?: Object): void;
    deleteRow(tr: Object): void;
    editCell(rowIndex?: number, field?: string): void;
    endEdit(): void;
    excelExport(excelExportProperties?: Object, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean): Object;
    expandAll(): void;
    expandAtLevel(level: number): void;
    expandRow(row: Object, record?: Object): void;
    filterByColumn(fieldName: string, filterOperator: string, filterValue: string | number | Object | boolean, predicate?: string, matchCase?: boolean, ignoreAccent?: boolean, actualFilterValue?: string, actualOperator?: string): void;
    getCellFromIndex(rowIndex: number, columnIndex: number): Object;
    getCheckedRecords(): Object[];
    getCheckedRowIndexes(): number[];
    getColumnByField(field: string): Object;
    getColumnByUid(uid: string): Object;
    getColumnFieldNames(): string[];
    getColumnHeaderByField(field: string): Object;
    getColumnHeaderByIndex(index: number): Object;
    getColumnHeaderByUid(uid: string): Object;
    getColumnIndexByField(field: string): number;
    getColumnIndexByUid(uid: string): number;
    getColumns(isRefresh?: boolean): Object[];
    getContent(): Object;
    getContentTable(): Object;
    getCurrentViewRecords(): Object[];
    getDataModule(): Object;
    getDataRows(): Object[];
    getFooterContent(): Object;
    getFooterContentTable(): Object;
    getHeaderContent(): Object;
    getHeaderTable(): Object;
    getMovableCellFromIndex(rowIndex: number, columnIndex: number): Object;
    getMovableDataRows(): Object[];
    getMovableRowByIndex(index: number): Object;
    getMovableRows(): Object[];
    getPager(): Object;
    getPrimaryKeyFieldNames(): string[];
    getRowByIndex(index: number): Object;
    getRowInfo(target: Object | Object): Object;
    getRows(): Object[];
    getSelectedRecords(): Object[];
    getSelectedRowCellIndexes(): Object[];
    getSelectedRowIndexes(): number[];
    getSelectedRows(): Object[];
    getUidByColumnField(field: string): string;
    getVisibleColumns(): Object[];
    goToPage(pageNo: number): void;
    hideColumns(keys: string | string[], hideBy?: string): void;
    hideSpinner(): void;
    pdfExport(pdfExportProperties?: Object, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Object;
    print(): void;
    refresh(): void;
    refreshColumns(refreshUI?: boolean): void;
    refreshHeader(): void;
    reorderColumns(fromFName: string | string[], toFName: string): void;
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    search(searchString: string): void;
    selectCell(cellIndex: Object, isToggle?: boolean): void;
    selectCheckboxes(indexes: number[]): void;
    selectRow(index: number, isToggle?: boolean): void;
    selectRows(rowIndexes: number[]): void;
    setCellValue(key: string | number, field: string, value: string | number | boolean | Object): void;
    setRowData(key: string | number, rowData?: Object): void;
    showColumns(keys: string | string[], showBy?: string): void;
    showSpinner(): void;
    sortByColumn(columnName: string, direction: Object, isMultiSort?: boolean): void;
    startEdit(): void;
    updateExternalMessage(message: string): void;
}
export declare const TreeGridPlugin: {
    name: string;
    install(Vue: any): void;
};
