import { PdfViewer, PdfViewerBase } from '../..';
import { PointModel } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel } from '../../diagram/pdf-annotation-model';
/**

 */
export declare class InputElement {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    inputBoxElement: any;
    /**
     * @private
     */
    isInFocus: boolean;
    /**
     * @private
     */
    maxHeight: number;
    /**
     * @private
     */
    maxWidth: number;
    /**
     * @private
     */
    fontSize: number;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     */
    editLabel(currentPosition: PointModel, annotation: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    onFocusOutInputBox(): void;
    /**
     * @private
     */
    calculateLabelBounds(bounds: any): any;
    /**
     * @private
     */
    calculateLabelBoundsFromLoadedDocument(bounds: any): any;
}
