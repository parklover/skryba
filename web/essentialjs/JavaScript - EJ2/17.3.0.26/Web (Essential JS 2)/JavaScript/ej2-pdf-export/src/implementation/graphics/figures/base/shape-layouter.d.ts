/**
 * ShapeLayouter.ts class for EJ2-PDF
 * @private
 */
import { ElementLayouter, PdfLayoutResult, PdfLayoutParams } from './element-layouter';
import { RectangleF } from './../../../drawing/pdf-drawing';
import { PdfShapeElement } from './pdf-shape-element';
/**
 * ShapeLayouter class.
 * @private
 */
export declare class ShapeLayouter extends ElementLayouter {
    /**
     * Initializes the object to store `older form elements` of previous page.

     * @private
     */
    olderPdfForm: number;
    /**
     * Initializes the offset `index`.

     * @private
     */
    private static index;
    /**
     * Initializes the `difference in page height`.

     * @private
     */
    private static splitDiff;
    /**
     * Determines the `end of Vertical offset` values.

     * @private
     */
    private static last;
    /**
     * Determines the document link annotation `border width`.

     * @private
     */
    private static readonly borderWidth;
    /**
     * Checks weather `is pdf grid` or not.
     * @private
     */
    isPdfGrid: boolean;
    /**
     * The `bounds` of the shape element.

     * @private
     */
    shapeBounds: RectangleF;
    /**
     * The `bottom cell padding`.
     * @private
     */
    bottomCellPadding: number;
    /**
     * Total Page size of the web page.

     * @private
     */
    private totalPageSize;
    /**
     * Initializes a new instance of the `ShapeLayouter` class.
     * @private
     */
    constructor(element: PdfShapeElement);
    /**
     * Gets shape element.
     * @private
     */
    readonly element: PdfShapeElement;
    /**
     * Layouts the element.
     * @private
     */
    protected layoutInternal(param: PdfLayoutParams): PdfLayoutResult;
}
