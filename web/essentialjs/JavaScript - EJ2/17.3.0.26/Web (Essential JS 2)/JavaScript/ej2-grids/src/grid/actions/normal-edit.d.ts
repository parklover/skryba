import { IGrid, NotifyArgs } from '../base/interface';
import { EditRender } from '../renderer/edit-renderer';
import { ServiceLocator } from '../services/service-locator';
import { FormValidator } from '@syncfusion/ej2-inputs';
/**
 * `NormalEdit` module is used to handle normal('inline, dialog, external') editing actions.

 */
export declare class NormalEdit {
    protected parent: IGrid;
    protected serviceLocator: ServiceLocator;
    protected renderer: EditRender;
    formObj: FormValidator;
    protected previousData: Object;
    private editRowIndex;
    private rowIndex;
    private addedRowIndex;
    private uid;
    private args;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator, renderer?: EditRender);
    protected clickHandler(e: MouseEvent): void;
    protected dblClickHandler(e: MouseEvent): void;
    /**
     * The function used to trigger editComplete
     * @return {void}

     */
    editComplete(e: NotifyArgs): void;
    protected startEdit(tr: Element): void;
    protected updateRow(index: number, data: Object): void;
    private editFormValidate;
    protected endEdit(): void;
    private destroyElements;
    private editHandler;
    private edSucc;
    private edFail;
    private updateCurrentViewData;
    private requestSuccess;
    private editSuccess;
    private blazorTemplate;
    private editFailure;
    private refreshRow;
    protected closeEdit(): void;
    protected addRecord(data?: Object, index?: number): void;
    protected deleteRecord(fieldname?: string, data?: Object): void;
    private stopEditStatus;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**

     */
    destroy(): void;
}
