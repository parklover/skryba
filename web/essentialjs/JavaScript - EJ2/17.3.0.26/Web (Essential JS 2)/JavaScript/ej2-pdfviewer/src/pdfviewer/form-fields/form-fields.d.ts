import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
/**
 * The `FormFields` module is to render formfields in the PDF document.

 */
export declare class FormFields {
    private pdfViewer;
    private pdfViewerBase;
    private maxTabIndex;
    private minTabIndex;
    private maintainTabIndex;
    private maintanMinTabindex;
    private isSignatureField;
    private currentTarget;
    /**
     * @private
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     */
    renderFormFields(pageIndex: number): void;
    /**
     * @private
     */
    downloadFormFieldsData(): any;
    private focusFormFields;
    private blurFormFields;
    private updateFormFields;
    /**
     * @private
     */
    drawSignature(): void;
    private updateFormFieldsValue;
    private changeFormFields;
    /**
     * @private
     */
    updateDataInSession(target: any, signaturePath?: any): void;
    private applyCommonProperties;
    /**
     * @private
     */
    createFormFields(currentData: any, pageIndex: number, index?: number, printContainer?: any): void;
    private createTextBoxField;
    private checkIsReadonly;
    private applyTabIndex;
    private checkIsRequiredField;
    private applyDefaultColor;
    private addAlignmentPropety;
    private createRadioBoxField;
    private createDropDownField;
    private createListBoxField;
    private createSignatureField;
    private addSignaturePath;
    private applyPosition;
    /**
     * @private
     */
    setStyleToTextDiv(textDiv: HTMLElement, left: number, top: number, fontHeight: number, width: number, height: number, isPrint: boolean): void;
    private renderExistingAnnnot;
    /**
     * @private
     */
    ConvertPointToPixel(number: any): any;
    /**
     * @private
     */
    destroy(): void;
    /**
     * @private
     */
    getModuleName(): string;
}
