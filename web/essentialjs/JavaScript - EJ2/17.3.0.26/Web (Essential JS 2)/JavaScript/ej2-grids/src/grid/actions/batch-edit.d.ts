import { FormValidator } from '@syncfusion/ej2-inputs';
import { IGrid } from '../base/interface';
import { EditRender } from '../renderer/edit-renderer';
import { Row } from '../models/row';
import { ServiceLocator } from '../services/service-locator';
import { Column } from '../models/column';
/**
 * `BatchEdit` module is used to handle batch editing actions.

 */
export declare class BatchEdit {
    private parent;
    private serviceLocator;
    private form;
    formObj: FormValidator;
    private renderer;
    private focus;
    private dataBoundFunction;
    private removeSelectedData;
    private cellDetails;
    private isColored;
    private isAdded;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator, renderer?: EditRender);
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    private dataBound;
    /**

     */
    destroy(): void;
    protected clickHandler(e: MouseEvent): void;
    protected dblClickHandler(e: MouseEvent): void;
    private onBeforeCellFocused;
    private onCellFocused;
    private isAddRow;
    private editCellFromIndex;
    closeEdit(): void;
    deleteRecord(fieldname?: string, data?: Object): void;
    addRecord(data?: Object): void;
    endEdit(data?: Object): void;
    private validateFormObj;
    batchSave(): void;
    getBatchChanges(): Object;
    private mergeBatchChanges;
    /**

     */
    removeRowObjectFromUID(uid: string): void;
    /**

     */
    addRowObject(row: Row<Column>): void;
    private bulkDelete;
    private refreshRowIdx;
    private getIndexFromData;
    private bulkAddRow;
    private renderMovable;
    private findNextEditableCell;
    private checkNPCell;
    private getDefaultData;
    private setCellIdx;
    editCell(index: number, field: string, isAdd?: boolean): void;
    updateCell(rowIndex: number, field: string, value: string | number | boolean | Date): void;
    private setChanges;
    updateRow(index: number, data: Object): void;
    private getCellIdx;
    private refreshTD;
    private getColIndex;
    private editNextValCell;
    saveCell(isForceSave?: boolean): void;
    private successCallBack;
    protected getDataByIndex(index: number): Object;
    private keyDownHandler;
    /**

     */
    addCancelWhilePaging(): void;
}
