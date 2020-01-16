import { TreeGrid } from '../base/treegrid';
import { ExcelExportProperties } from '@syncfusion/ej2-grids';
import { Ajax } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
/**
 * TreeGrid Excel Export module

 */
export declare class ExcelExport {
    private parent;
    private dataResults;
    /**
     * Constructor for Excel Export module
     */
    constructor(parent?: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**

     */
    addEventListener(): void;
    /**
     * To destroy the Excel Export
     * @return {void}

     */
    destroy(): void;
    /**

     */
    removeEventListener(): void;
    private updateExcelResultModel;
    Map(excelExportProperties?: ExcelExportProperties, isMultipleExport?: boolean, workbook?: any, isBlob?: boolean, isCsv?: boolean): Promise<Object>;
    protected generateQuery(query: Query, property?: ExcelExportProperties): Query;
    protected manipulateExportProperties(property?: ExcelExportProperties, dtSrc?: Object, queryResult?: Ajax): Object;
    /**
     * TreeGrid Excel Export cell modifier

     */
    private excelQueryCellInfo;
    private isLocal;
}
