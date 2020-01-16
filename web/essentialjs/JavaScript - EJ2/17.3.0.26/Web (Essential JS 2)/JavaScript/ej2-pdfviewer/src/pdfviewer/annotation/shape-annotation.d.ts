import { PdfViewer, PdfViewerBase, IRectangle, ICommentsCollection, IReviewCollection, AnnotationType as AnnotType, LineHeadStyle } from '../../index';
import { PointModel } from '@syncfusion/ej2-drawings';
/**

 */
export interface IShapeAnnotation {
    shapeAnnotationType: string;
    author: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangle;
    thickness: number;
    borderStyle: string;
    borderDashArray: number;
    rotateAngle: string;
    isCloudShape: boolean;
    cloudIntensity: number;
    vertexPoints: PointModel[];
    lineHeadStart: string;
    lineHeadEnd: string;
    rectangleDifference: string[];
    isLocked: boolean;
    id: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    enableShapeLabel: boolean;
    labelContent: string;
    labelFillColor: string;
    labelBorderColor: string;
    fontColor: string;
    fontSize: number;
    labelBounds: IRectangle;
}
/**

 */
export declare class ShapeAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    currentAnnotationMode: string;
    /**
     * @private
     */
    lineOpacity: number;
    /**
     * @private
     */
    arrowOpacity: number;
    /**
     * @private
     */
    rectangleOpacity: number;
    /**
     * @private
     */
    circleOpacity: number;
    /**
     * @private
     */
    polygonOpacity: number;
    /**
     * @private
     */
    lineFillColor: string;
    /**
     * @private
     */
    arrowFillColor: string;
    /**
     * @private
     */
    rectangleFillColor: string;
    /**
     * @private
     */
    circleFillColor: string;
    /**
     * @private
     */
    polygonFillColor: string;
    /**
     * @private
     */
    lineStrokeColor: string;
    /**
     * @private
     */
    arrowStrokeColor: string;
    /**
     * @private
     */
    rectangleStrokeColor: string;
    /**
     * @private
     */
    circleStrokeColor: string;
    /**
     * @private
     */
    polygonStrokeColor: string;
    /**
     * @private
     */
    lineThickness: number;
    /**
     * @private
     */
    arrowThickness: number;
    /**
     * @private
     */
    rectangleThickness: number;
    /**
     * @private
     */
    circleThickness: number;
    /**
     * @private
     */
    polygonThickness: number;
    /**
     * @private
     */
    lineDashArray: number;
    /**
     * @private
     */
    lineStartHead: LineHeadStyle;
    /**
     * @private
     */
    lineEndHead: LineHeadStyle;
    /**
     * @private
     */
    arrowDashArray: number;
    /**
     * @private
     */
    arrowStartHead: LineHeadStyle;
    /**
     * @private
     */
    arrowEndHead: LineHeadStyle;
    /**
     * @private
     */
    shapeCount: number;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     */
    renderShapeAnnotations(shapeAnnotations: any, pageNumber: number, isImportAcion?: boolean): void;
    /**
     * @private
     */
    setAnnotationType(type: AnnotType): void;
    private setShapeType;
    private getShapeType;
    private getShapeAnnotType;
    /**
     * @private
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any): IShapeAnnotation;
    /**
     * @private
     */
    addInCollection(pageNumber: number, annotationBase: IShapeAnnotation): void;
    /**
     * @private
     */
    saveShapeAnnotations(): string;
    private manageAnnotations;
    private createAnnotationObject;
    private getAnnotations;
    private getRgbCode;
    /**
     * @private
     */
    saveImportedShapeAnnotations(annotation: any, pageNumber: number): any;
}