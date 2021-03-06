import { Toolbar as tool } from '@syncfusion/ej2-navigations';
import { PivotView } from '../../pivotview/base/pivotview';
/**
 * Module for Toolbar
 */
export declare class Toolbar {
    action: string;
    toolbar: tool;
    private parent;
    private dialog;
    private mdxDialog;
    private reportList;
    private currentReport;
    private confirmPopUp;
    private chartMenu;
    private exportMenu;
    private subTotalMenu;
    private grandTotalMenu;
    private formattingMenu;
    private dropArgs;
    constructor(parent: PivotView);
    /**
     * It returns the Module name.
     * @returns string

     */
    getModuleName(): string;
    private createToolbar;
    private fetchReports;
    private fetchReportsArgs;
    private getItems;
    private reportChange;
    private reportLoad;
    private saveReport;
    private mdxQueryDialog;
    private dialogShow;
    private renameReport;
    private actionClick;
    private renderDialog;
    private renderMDXDialog;
    private copyMDXQuery;
    private okBtnClick;
    private createNewReport;
    private cancelBtnClick;
    private createConfirmDialog;
    private okButtonClick;
    private cancelButtonClick;
    private create;
    private updateExportMenu;
    private updateSubtotalSelection;
    private updateGrandtotalSelection;
    private updateReportList;
    private menuItemClick;
    /**

     */
    addEventListener(): void;
    /**
     * To refresh the toolbar
     * @return {void}

     */
    refreshToolbar(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * To destroy the toolbar
     * @return {void}

     */
    destroy(): void;
}
