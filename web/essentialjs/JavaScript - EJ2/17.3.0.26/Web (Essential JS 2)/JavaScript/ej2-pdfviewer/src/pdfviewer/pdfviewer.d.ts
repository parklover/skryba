import { Component, INotifyPropertyChanged, ChildProperty, L10n } from '@syncfusion/ej2-base';
import { ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { PdfViewerModel, HighlightSettingsModel, UnderlineSettingsModel, StrikethroughSettingsModel, LineSettingsModel, ArrowSettingsModel, RectangleSettingsModel, CircleSettingsModel, PolygonSettingsModel, StampSettingsModel, StickyNotesSettingsModel, CustomStampSettingsModel, VolumeSettingsModel, RadiusSettingsModel, AreaSettingsModel, PerimeterSettingsModel, DistanceSettingsModel, MeasurementSettingsModel, FreeTextSettingsModel, AnnotationSelectorSettingsModel, TextSearchColorSettingsModel } from './pdfviewer-model';
import { ToolbarSettingsModel, AnnotationToolbarSettingsModel, ShapeLabelSettingsModel } from './pdfviewer-model';
import { ServerActionSettingsModel, AjaxRequestSettingsModel, CustomStampItemModel, HandWrittenSignatureSettingsModel } from './pdfviewer-model';
import { PdfViewerBase } from './index';
import { Navigation } from './index';
import { Magnification } from './index';
import { Toolbar } from './index';
import { ToolbarItem } from './index';
import { LinkTarget, InteractionMode, AnnotationType, AnnotationToolbarItem, LineHeadStyle, ContextMenuAction, FontStyle, TextAlignment } from './base/types';
import { Annotation } from './index';
import { LinkAnnotation } from './index';
import { ThumbnailView } from './index';
import { BookmarkView } from './index';
import { TextSelection } from './index';
import { TextSearch } from './index';
import { FormFields } from './index';
import { Print, CalibrationUnit } from './index';
import { UnloadEventArgs, LoadEventArgs, LoadFailedEventArgs, AjaxRequestFailureEventArgs, PageChangeEventArgs, PageClickEventArgs, ZoomChangeEventArgs, HyperlinkClickEventArgs, HyperlinkMouseOverArgs, ImportStartEventArgs, ImportSuccessEventArgs, ImportFailureEventArgs, ExportStartEventArgs, ExportSuccessEventArgs, ExportFailureEventArgs } from './index';
import { AnnotationAddEventArgs, AnnotationRemoveEventArgs, AnnotationPropertiesChangeEventArgs, AnnotationResizeEventArgs, AnnotationSelectEventArgs } from './index';
import { TextSelectionStartEventArgs, TextSelectionEndEventArgs } from './index';
import { PdfAnnotationBase, ZOrderPageTable } from '../diagram/pdf-annotation';
import { PdfAnnotationBaseModel } from '../diagram/pdf-annotation-model';
import { Drawing, ClipBoardObject } from '../diagram/drawing';
import { SelectorModel } from '../diagram/selector-model';
import { PointModel, IElement, Rect } from '@syncfusion/ej2-drawings';
import { ThumbnailClickEventArgs } from './index';
/**
 * The `ToolbarSettings` module is used to provide the toolbar settings of PDF viewer.
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Enable or disables the toolbar of PdfViewer.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    toolbarItems: ToolbarItem[];
}
/**
 * The `AjaxRequestSettings` module is used to set the ajax Request Headers of PDF viewer.
 */
export declare class AjaxRequestSettings extends ChildProperty<AjaxRequestSettings> {
    /**
     * set the ajax Header values in the PdfViewer.
     */
    ajaxHeaders: IAjaxHeaders[];
}
export interface IAjaxHeaders {
    /**
     * specifies the ajax Header Name of the PdfViewer.
     */
    headerName: string;
    /**
     * specifies the ajax Header Value of the PdfViewer.
     */
    headerValue: string;
}
export declare class CustomStampItem extends ChildProperty<CustomStampItem> {
    /**
     * specifies the stamp Name of the PdfViewer.
     */
    customStampName: string;
    /**
     * specifies the stamp ImageSource of the PdfViewer.
     */
    customStampImageSource: string;
}
/**
 * The `AnnotationToolbarSettings` module is used to provide the annotation toolbar settings of the PDF viewer.
 */
export declare class AnnotationToolbarSettings extends ChildProperty<AnnotationToolbarSettings> {
    /**
     * Enable or disables the tooltip of the toolbar.
     */
    showTooltip: boolean;
    /**
     * shows only the defined options in the PdfViewer.
     */
    annotationToolbarItem: AnnotationToolbarItem[];
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of PDF viewer.
 */
export declare class ServerActionSettings extends ChildProperty<ServerActionSettings> {
    /**
     * specifies the load action of PdfViewer.
     */
    load: string;
    /**
     * specifies the unload action of PdfViewer.
     */
    unload: string;
    /**
     * specifies the render action of PdfViewer.
     */
    renderPages: string;
    /**
     * specifies the print action of PdfViewer.
     */
    print: string;
    /**
     * specifies the download action of PdfViewer.
     */
    download: string;
    /**
     * specifies the download action of PdfViewer.
     */
    renderThumbnail: string;
    /**
     * specifies the annotation comments action of PdfViewer.
     */
    renderComments: string;
    /**
     * specifies the imports annotations action of PdfViewer.
     */
    importAnnotations: string;
    /**
     * specifies the export annotations action of PdfViewer.
     */
    exportAnnotations: string;
    /**
     * specifies the imports action of PdfViewer.
     */
    importFormFields: string;
    /**
     * specifies the export action of PdfViewer.
     */
    exportFormFields: string;
}
/**
 * The `StrikethroughSettings` module is used to provide the properties to Strikethrough annotation.
 */
export declare class StrikethroughSettings extends ChildProperty<StrikethroughSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
}
/**
 * The `UnderlineSettings` module is used to provide the properties to Underline annotation.
 */
export declare class UnderlineSettings extends ChildProperty<UnderlineSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
}
/**
 * The `HighlightSettings` module is used to provide the properties to Highlight annotation.
 */
export declare class HighlightSettings extends ChildProperty<HighlightSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the color of the annotation.
     */
    color: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
}
/**
 * The `LineSettings` module is used to provide the properties to line annotation.
 */
export declare class LineSettings extends ChildProperty<LineSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head end style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
}
/**
 * The `ArrowSettings` module is used to provide the properties to arrow annotation.
 */
export declare class ArrowSettings extends ChildProperty<ArrowSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
}
/**
 * The `RectangleSettings` module is used to provide the properties to rectangle annotation.
 */
export declare class RectangleSettings extends ChildProperty<RectangleSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `CircleSettings` module is used to provide the properties to circle annotation.
 */
export declare class CircleSettings extends ChildProperty<CircleSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `ShapeLabelSettings` module is used to provide the properties to rectangle annotation.
 */
export declare class ShapeLabelSettings extends ChildProperty<ShapeLabelSettings> {
    /**
     * specifies the opacity of the label.
     */
    opacity: number;
    /**
     * specifies the fill color of the label.
     */
    fillColor: string;
    /**
     * specifies the border color of the label.
     */
    fontColor: string;
    /**
     * specifies the font size of the label.
     */
    fontSize: number;
    /**
     * specifies the max-width of the label.
     */
    fontFamily: string;
}
/**
 * The `PolygonSettings` module is used to provide the properties to polygon annotation.
 */
export declare class PolygonSettings extends ChildProperty<PolygonSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `stampSettings` module is used to provide the properties to stamp annotation.
 */
export declare class StampSettings extends ChildProperty<StampSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
}
/**
 * The `CustomStampSettings` module is used to provide the properties to customstamp annotation.
 */
export declare class CustomStampSettings extends ChildProperty<CustomStampSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the left position of the annotation.
     */
    left: number;
    /**
     * specifies the top position of the annotation.
     */
    top: number;
    /**
     * Specifies to maintain the newly added custom stamp element in the menu items.
     */
    isAddToSubMenu: boolean;
}
/**
 * The `DistanceSettings` module is used to provide the properties to distance calibrate annotation.
 */
export declare class DistanceSettings extends ChildProperty<DistanceSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
}
/**
 * The `PerimeterSettings` module is used to provide the properties to perimeter calibrate annotation.
 */
export declare class PerimeterSettings extends ChildProperty<PerimeterSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadStartStyle: LineHeadStyle;
    /**
     * specifies the line head start style of the annotation.
     */
    lineHeadEndStyle: LineHeadStyle;
    /**
     * specifies the border dash array  of the annotation.
     */
    borderDashArray: number;
}
/**
 * The `AreaSettings` module is used to provide the properties to area calibrate annotation.
 */
export declare class AreaSettings extends ChildProperty<AreaSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `RadiusSettings` module is used to provide the properties to radius calibrate annotation.
 */
export declare class RadiusSettings extends ChildProperty<RadiusSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `VolumeSettings` module is used to provide the properties to volume calibrate annotation.
 */
export declare class VolumeSettings extends ChildProperty<VolumeSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
}
/**
 * The `stickyNotesSettings` module is used to provide the properties to sticky notes annotation.
 */
export declare class StickyNotesSettings extends ChildProperty<StickyNotesSettings> {
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
}
/**
 * The `MeasurementSettings` module is used to provide the settings to measurement annotations.
 */
export declare class MeasurementSettings extends ChildProperty<MeasurementSettings> {
    /**
     * specifies the scale ratio of the annotation.
     */
    scaleRatio: number;
    /**
     * specifies the unit of the annotation.
     */
    conversionUnit: CalibrationUnit;
    /**
     * specifies the unit of the annotation.
     */
    displayUnit: CalibrationUnit;
    /**
     * specifies the depth of the volume annotation.
     */
    depth: number;
}
/**
 * The `FreeTextSettings` module is used to provide the properties to free text annotation.
 */
export declare class FreeTextSettings extends ChildProperty<FreeTextSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the border color of the annotation.
     */
    borderColor: string;
    /**
     * specifies the border with of the annotation.
     */
    borderWidth: number;
    /**
     * specifies the border style of the annotation.
     */
    borderStyle: string;
    /**
     * specifies the author of the annotation.
     */
    author: string;
    /**
     * specifies the subject of the annotation.
     */
    subject: string;
    /**
     * specifies the modified date of the annotation.
     */
    modifiedDate: string;
    /**
     * specifies the background fill color of the annotation.
     */
    fillColor: string;
    /**
     * specifies the text box font size of the annotation.
     */
    fontSize: number;
    /**
     * specifies the width of the annotation.
     */
    width: number;
    /**
     * specifies the height of the annotation.
     */
    height: number;
    /**
     * specifies the text box font color of the annotation.
     */
    fontColor: string;
    /**
     * specifies the text box font family of the annotation.
     */
    fontFamily: string;
    /**
     * setting the default text for annotation.
     */
    defaultText: string;
    /**
     * applying the font styles for the text.
     */
    fontStyle: FontStyle;
    /**
     * Aligning the text in the annotation.
     */
    textAlignment: TextAlignment;
}
/**
 * The `AnnotationSelectorSettings` module is used to provide the properties to annotation selectors.
 */
export declare class AnnotationSelectorSettings extends ChildProperty<AnnotationSelectorSettings> {
    /**
     * Specifies the selection border color.
     */
    selectionBorderColor: string;
    /**
     * Specifies the border color of the resizer.

     */
    resizerBorderColor: string;
    /**
     * Specifies the fill color of the resizer.

     */
    resizerFillColor: string;
    /**
     * Specifies the size of the resizer.

     */
    resizerSize: number;
    /**
     * Specifies the thickness of the border of selection.
     */
    selectionBorderThickness: number;
}
/**
 * The `TextSearchColorSettings` module is used to set the settings for the color of the text search highlight.
 */
export declare class TextSearchColorSettings extends ChildProperty<TextSearchColorSettings> {
    /**
     * Sets the color of the current occurrence of the text searched string.
     */
    currentOccurrence: string;
    /**
     * Sets the color of the other occurrence of the text searched string.
     */
    otherOccurrence: string;
}
/**
 * The `HandWrittenSignatureSettings` module is used to provide the properties to handwritten signature.
 */
export declare class HandWrittenSignatureSettings extends ChildProperty<HandWrittenSignatureSettings> {
    /**
     * specifies the opacity of the annotation.
     */
    opacity: number;
    /**
     * specifies the stroke color of the annotation.
     */
    strokeColor: string;
    /**
     * specified the thickness of the annotation.
     */
    thickness: number;
    /**
     * specified the width of the annotation.
     */
    width: number;
    /**
     * specified the height of the annotation.
     */
    height: number;
}
/**
 * Represents the PDF viewer component.
 * ```html
 * <div id="pdfViewer"></div>
 * <script>
 *  var pdfViewerObj = new PdfViewer();
 *  pdfViewerObj.appendTo("#pdfViewer");
 * </script>
 * ```
 */
export declare class PdfViewer extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Defines the service url of the PdfViewer control.
     */
    serviceUrl: string;
    /**
     * Returns the page count of the document loaded in the PdfViewer control.


     */
    readonly pageCount: number;
    /**
     * Checks whether the PDF document is edited.


     */
    readonly isDocumentEdited: boolean;
    /**
     * Returns the current page number of the document displayed in the PdfViewer control.


     */
    readonly currentPageNumber: number;
    /**
     * Sets the PDF document path for initial loading.
     */
    documentPath: string;
    /**
     * Returns the current zoom percentage of the PdfViewer control.


     */
    readonly zoomPercentage: number;
    /**
     * Gets or sets the document name loaded in the PdfViewer control.
     */
    fileName: string;
    /**
     * Gets or sets the export annotations JSON file name in the PdfViewer control.
     */
    exportAnnotationFileName: string;
    /**
     * Defines the scrollable height of the PdfViewer control.

     */
    height: string | number;
    /**
     * Defines the scrollable width of the PdfViewer control.

     */
    width: string | number;
    /**
     * Enable or disables the toolbar of PdfViewer.

     */
    enableToolbar: boolean;
    /**
     * Enable or disables the Navigation toolbar of PdfViewer.

     */
    enableNavigationToolbar: boolean;
    /**
     * Enable or disables the Comment Panel of PdfViewer.

     */
    enableCommentPanel: boolean;
    /**
     * Enable or disable the text markup resizer to modify the bounds in UI.

     */
    enableTextMarkupResizer: boolean;
    /**
     * Enable or disables the download option of PdfViewer.

     */
    enableDownload: boolean;
    /**
     * Enable or disables the print option of PdfViewer.

     */
    enablePrint: boolean;
    /**
     * Enables or disables the thumbnail view in the PDF viewer

     */
    enableThumbnail: boolean;
    /**
     * Enables or disables the bookmark view in the PDF viewer

     */
    enableBookmark: boolean;
    /**
     * Enables or disables the hyperlinks in PDF document.

     */
    enableHyperlink: boolean;
    /**
     * Enables or disables the handwritten signature in PDF document.

     */
    enableHandwrittenSignature: boolean;
    /**
     * Specifies the open state of the hyperlink in the PDF document.

     */
    hyperlinkOpenState: LinkTarget;
    /**
     * Specifies the state of the ContextMenu in the PDF document.

     */
    contextMenuOption: ContextMenuAction;
    /**
     * Enable or disables the Navigation module of PdfViewer.

     */
    enableNavigation: boolean;
    /**
     * Enable or disables the Magnification module of PdfViewer.

     */
    enableMagnification: boolean;
    /**
     * Enable or disables the Label for shapeAnnotations of PdfViewer.

     */
    enableShapeLabel: boolean;
    /**
     * Enable or disables the Pinch zoom of PdfViewer.

     */
    enablePinchZoom: boolean;
    /**
     * Enable or disables the text selection in the PdfViewer.

     */
    enableTextSelection: boolean;
    /**
     * Enable or disables the text search in the PdfViewer.

     */
    enableTextSearch: boolean;
    /**
     * Enable or disable the annotation in the Pdfviewer.

     */
    enableAnnotation: boolean;
    /**
     * Enable or disable the form fields in the Pdfviewer.

     */
    enableFormFields: boolean;
    /**
     * Enable or disable the free text annotation in the Pdfviewer.

     */
    enableFreeText: boolean;
    /**
     * Enable or disables the text markup annotation in the PdfViewer.

     */
    enableTextMarkupAnnotation: boolean;
    /**
     * Enable or disables the shape annotation in the PdfViewer.

     */
    enableShapeAnnotation: boolean;
    /**
     * Enable or disables the calibrate annotation in the PdfViewer.

     */
    enableMeasureAnnotation: boolean;
    /**
     * Enables and disables the stamp annotations when the PDF viewer control is loaded initially.

     */
    enableStampAnnotations: boolean;
    /**
     * Enables and disables the stickyNotes annotations when the PDF viewer control is loaded initially.

     */
    enableStickyNotesAnnotation: boolean;
    /**
     * Opens the annotation toolbar when the PDF document is loaded in the PDF Viewer control initially.

     */
    enableAnnotationToolbar: boolean;
    /**
     * Sets the interaction mode of the PdfViewer

     */
    interactionMode: InteractionMode;
    /**
     * Defines the settings of the PdfViewer toolbar.
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Defines the ajax Request settings of the PdfViewer.
     */
    ajaxRequestSettings: AjaxRequestSettingsModel;
    /**
     * Defines the stamp items of the PdfViewer.
     */
    customStampItems: CustomStampItemModel[];
    /**
     * Defines the settings of the PdfViewer annotation toolbar.
     */
    annotationToolbarSettings: AnnotationToolbarSettingsModel;
    /**
     * Defines the settings of the PdfViewer service.
     */
    serverActionSettings: ServerActionSettingsModel;
    /**
     * Defines the settings of highlight annotation.
     */
    highlightSettings: HighlightSettingsModel;
    /**
     * Defines the settings of strikethrough annotation.
     */
    strikethroughSettings: StrikethroughSettingsModel;
    /**
     * Defines the settings of underline annotation.
     */
    underlineSettings: UnderlineSettingsModel;
    /**
     * Defines the settings of line annotation.
     */
    lineSettings: LineSettingsModel;
    /**
     * Defines the settings of arrow annotation.
     */
    arrowSettings: ArrowSettingsModel;
    /**
     * Defines the settings of rectangle annotation.
     */
    rectangleSettings: RectangleSettingsModel;
    /**
     * Defines the settings of shape label.
     */
    shapeLabelSettings: ShapeLabelSettingsModel;
    /**
     * Defines the settings of circle annotation.
     */
    circleSettings: CircleSettingsModel;
    /**
     * Defines the settings of polygon annotation.
     */
    polygonSettings: PolygonSettingsModel;
    /**
     * Defines the settings of stamp annotation.
     */
    stampSettings: StampSettingsModel;
    /**
     * Defines the settings of customStamp annotation.
     */
    customStampSettings: CustomStampSettingsModel;
    /**
     * Defines the settings of distance annotation.
     */
    distanceSettings: DistanceSettingsModel;
    /**
     * Defines the settings of perimeter annotation.
     */
    perimeterSettings: PerimeterSettingsModel;
    /**
     * Defines the settings of area annotation.
     */
    areaSettings: AreaSettingsModel;
    /**
     * Defines the settings of radius annotation.
     */
    radiusSettings: RadiusSettingsModel;
    /**
     * Defines the settings of volume annotation.
     */
    volumeSettings: VolumeSettingsModel;
    /**
     * Defines the settings of stickyNotes annotation.
     */
    stickyNotesSettings: StickyNotesSettingsModel;
    /**
     * Defines the settings of free text annotation.
     */
    freeTextSettings: FreeTextSettingsModel;
    /**
     * Defines the settings of measurement annotation.
     */
    measurementSettings: MeasurementSettingsModel;
    /**
     * Defines the settings of annotation selector.
     */
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    /**
     * Sets the settings for the color of the text search highlight.
     */
    textSearchColorSettings: TextSearchColorSettingsModel;
    /**
     * Defines the settings of handWrittenSignature.
     */
    handWrittenSignatureSettings: HandWrittenSignatureSettingsModel;
    /**
     * @private
     */
    viewerBase: PdfViewerBase;
    /**
     * @private
     */
    drawing: Drawing;
    /**
     * @private
     */
    /**
     * Defines the collection of selected items, size and position of the selector

     */
    selectedItems: SelectorModel;
    /**
     * @private
     */
    adornerSvgLayer: SVGSVGElement;
    /**
     * @private
     */
    zIndex: number;
    /**
     * @private
     */
    nameTable: {};
    /**   @private  */
    clipboardData: ClipBoardObject;
    /**
     * @private
     */
    zIndexTable: ZOrderPageTable[];
    /**
     * @private
     */
    navigationModule: Navigation;
    /**
     * @private
     */
    toolbarModule: Toolbar;
    /**
     * @private
     */
    magnificationModule: Magnification;
    /**
     * @private
     */
    linkAnnotationModule: LinkAnnotation;
    localeObj: L10n;
    /**
     * @private
     */
    thumbnailViewModule: ThumbnailView;
    /**
     * @private
     */
    bookmarkViewModule: BookmarkView;
    /**
     * @private
     */
    textSelectionModule: TextSelection;
    /**
     * @private
     */
    textSearchModule: TextSearch;
    /**
     * @private
     */
    printModule: Print;
    /**
     * @private
     */
    annotationModule: Annotation;
    /**
     * @private
     */
    formFieldsModule: FormFields;
    /**
     * Gets the bookmark view object of the pdf viewer.


     * @returns { BookmarkView }
     */
    readonly bookmark: BookmarkView;
    /**
     * Gets the print object of the pdf viewer.


     * @returns { Print }
     */
    readonly print: Print;
    /**
     * Gets the magnification object of the pdf viewer.


     * @returns { Magnification }
     */
    readonly magnification: Magnification;
    /**
     * Gets the navigation object of the pdf viewer.


     * @returns { Navigation }
     */
    readonly navigation: Navigation;
    /**
     * Gets the text search object of the pdf viewer.


     * @returns { TextSearch }
     */
    readonly textSearch: TextSearch;
    /**
     * Gets the toolbar object of the pdf viewer.


     * @returns { Toolbar }
     */
    readonly toolbar: Toolbar;
    /**
     * Gets the thumbnail-view object of the pdf viewer.


     * @returns { ThumbnailView }
     */
    readonly thumbnailView: ThumbnailView;
    /**
     * Gets the annotation object of the pdf viewer.


     * @returns { Annotation }
     */
    readonly annotation: Annotation;
    /**
     * Triggers while loading document into PdfViewer.
     * @event

     */
    documentLoad: EmitType<LoadEventArgs>;
    /**
     * Triggers while close the document
     * @event

     */
    documentUnload: EmitType<UnloadEventArgs>;
    /**
     * Triggers while loading document got failed in PdfViewer.
     * @event

     */
    documentLoadFailed: EmitType<LoadFailedEventArgs>;
    /**
     * Triggers when the AJAX request is failed.
     * @event

     */
    ajaxRequestFailed: EmitType<AjaxRequestFailureEventArgs>;
    /**
     * Triggers when the mouse click is performed over the page of the PDF document.
     * @event

     */
    pageClick: EmitType<PageClickEventArgs>;
    /**
     * Triggers when there is change in current page number.
     * @event

     */
    pageChange: EmitType<PageChangeEventArgs>;
    /**
     * Triggers when hyperlink in the PDF Document is clicked
     * @event

     */
    hyperlinkClick: EmitType<HyperlinkClickEventArgs>;
    /**
     * Triggers when hyperlink in the PDF Document is hovered
     * @event

     */
    hyperlinkMouseOver: EmitType<HyperlinkMouseOverArgs>;
    /**
     * Triggers when there is change in the magnification value.
     * @event

     */
    zoomChange: EmitType<ZoomChangeEventArgs>;
    /**
     * Triggers when an annotation is added over the page of the PDF document.
     * @event

     */
    annotationAdd: EmitType<AnnotationAddEventArgs>;
    /**
     * Triggers when an annotation is removed from the page of the PDF document.
     * @event

     */
    annotationRemove: EmitType<AnnotationRemoveEventArgs>;
    /**
     * Triggers when the property of the annotation is changed in the page of the PDF document.
     * @event

     */
    annotationPropertiesChange: EmitType<AnnotationPropertiesChangeEventArgs>;
    /**
     * Triggers when an annotation is resized over the page of the PDF document.
     * @event

     */
    annotationResize: EmitType<AnnotationResizeEventArgs>;
    /**
     * Triggers when an annotation is selected over the page of the PDF document.
     * @event

     */
    annotationSelect: EmitType<AnnotationSelectEventArgs>;
    /**
     * Triggers when an imported annotations started in the PDF document.
     * @event

     */
    importStart: EmitType<ImportStartEventArgs>;
    /**
     * Triggers when an exported annotations started in the PDF Viewer.
     * @event

     */
    exportStart: EmitType<ExportStartEventArgs>;
    /**
     * Triggers when an imports annotations succeed in the PDF document.
     * @event

     */
    importSuccess: EmitType<ImportSuccessEventArgs>;
    /**
     * Triggers when an export annotations succeed in the PDF Viewer.
     * @event

     */
    exportSuccess: EmitType<ExportSuccessEventArgs>;
    /**
     * Triggers when an imports annotations failed in the PDF document.
     * @event

     */
    importFailed: EmitType<ImportFailureEventArgs>;
    /**
     * Triggers when an export annotations failed in the PDF Viewer.
     * @event

     */
    exportFailed: EmitType<ExportFailureEventArgs>;
    /**
     * Triggers an event when the thumbnail is clicked in the thumbnail panel of PDF Viewer.
     * @event

     */
    thumbnailClick: EmitType<ThumbnailClickEventArgs>;
    /**
     * Triggers an event when the text selection is started.
     * @event

     */
    textSelectionStart: EmitType<TextSelectionStartEventArgs>;
    /**
     * Triggers an event when the text selection is finished.
     * @event

     */
    textSelectionEnd: EmitType<TextSelectionEndEventArgs>;
    /**
     * @private
     */
    /**
     * Triggers when the property of the annotation is changed in the page of the PDF document.
     * @event
     * @private
     */
    annotations: PdfAnnotationBaseModel[];
    /**
     * @private
     */
    /**
     * tool denots the current tool
     * @event
     * @private
     */
    tool: string;
    /**
     * @private
     */
    /**
     * the objects for drawing tool
     * @event
     * @private
     */
    drawingObject: PdfAnnotationBaseModel;
    constructor(options?: PdfViewerModel, element?: string | HTMLElement);
    protected preRender(): void;
    protected render(): void;
    getModuleName(): string;
    /**
     * @private
     */
    getLocaleConstants(): Object;
    onPropertyChanged(newProp: PdfViewerModel, oldProp: PdfViewerModel): void;
    getPersistData(): string;
    requiredModules(): ModuleDeclaration[];
    defaultLocale: Object;
    /**
     * Loads the given PDF document in the PDF viewer control
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns void
     */
    load(document: string, password: string): void;
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     * @returns void
     */
    download(): void;
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     * @returns Promise<Blob>
     */
    saveAsBlob(): Promise<Blob>;
    /**
     * updates the PDF Viewer container width and height from externally.
     * @returns void
     */
    updateViewerContainer(): void;
    /**
     * Perform undo action for the edited annotations
     * @returns void
     */
    undo(): void;
    /**
     * Perform redo action for the edited annotations
     * @returns void
     */
    redo(): void;
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     * @returns void
     */
    unload(): void;
    /**
     * Destroys all managed resources used by this object.
     */
    destroy(): void;
    /**
     * Perform imports annotations action in the PDF Viewer
     * @param  {any} importData - Specifies the data for annotation imports
     * @returns void
     */
    importAnnotations(importData: any): void;
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns void
     */
    exportAnnotations(): void;
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns Promise<object>
     */
    exportAnnotationsAsObject(): Promise<object>;
    /**
     * Perform  action in the PDF Viewer
     * @returns void
     */
    importFormFields(formFields: any): void;
    /**
     * Perform export action in the PDF Viewer
     * @returns void
     */
    exportFormFields(): void;
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns Promise<object>
     */
    exportFormFieldsAsObject(): Promise<object>;
    /**
     * To delete the annotation Collections in the PDF Document.
     * @returns void
     */
    deleteAnnotations(): void;
    /**
     * @private
     */
    fireDocumentLoad(): void;
    /**
     * @private
     */
    fireDocumentUnload(fileName: string): void;
    /**
     * @private
     */
    fireDocumentLoadFailed(isPasswordRequired: boolean, password: string): void;
    /**
     * @private
     */
    fireAjaxRequestFailed(errorStatusCode: number, errorMessage: string, action: string): void;
    /**
     * @private
     */
    firePageClick(x: number, y: number, pageNumber: number): void;
    /**
     * @private
     */
    firePageChange(previousPageNumber: number): void;
    /**
     * @private
     */
    fireZoomChange(): void;
    /**
     * @private
     */
    fireHyperlinkClick(hyperlink: string, hyperlinkElement: HTMLAnchorElement): void;
    /**
     * @private
     */
    fireHyperlinkHover(hyperlinkElement: HTMLAnchorElement): void;
    /**
     * @private
     */
    fireAnnotationAdd(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any, textMarkupContent?: string, tmStartIndex?: number, tmEndIndex?: number): void;
    /**
     * @private
     */
    fireAnnotationRemove(pageNumber: number, index: string, type: AnnotationType): void;
    /**
     * @private
     */
    fireAnnotationPropertiesChange(pageNumber: number, index: string, type: AnnotationType, isColorChanged: boolean, isOpacityChanged: boolean, isTextChanged: boolean, isCommentsChanged: boolean): void;
    /**
     * @private
     */
    fireAnnotationSelect(id: string, pageNumber: number, annotation: any): void;
    /**
     * @private
     */
    fireTextSelectionStart(pageNumber: number): void;
    /**
     * @private
     */
    fireTextSelectionEnd(pageNumber: number, text: string, bound: any[]): void;
    /**
     * @private
     */
    renderDrawing(canvas?: HTMLCanvasElement, index?: number): void;
    /**
     * @private
     */
    fireAnnotationResize(pageNumber: number, index: string, type: AnnotationType, bounds: any, settings: any): void;
    /**
     * @private
     */
    fireThumbnailClick(pageNumber: number): void;
    /**
     * @private
     */
    fireImportStart(importData: any): void;
    /**
     * @private
     */
    fireExportStart(exportData: any): void;
    /**
     * @private
     */
    fireImportSuccess(importData: any): void;
    /**
     * @private
     */
    fireExportSuccess(exportData: any, fileName: string): void;
    /**
     * @private
     */
    fireImportFailed(data: any, errorDetails: string): void;
    /**
     * @private
     */
    fireExportFailed(data: any, errorDetails: string): void;
    /**
     * @private
     */
    renderAdornerLayer(bounds: ClientRect, commonStyle: string, cavas: HTMLElement, index: number): void;
    /**
     * @private
     */
    renderSelector(index: number): void;
    /**
     * @private
     */
    select(objArray: string[], multipleSelection?: boolean, preventUpdate?: boolean): void;
    /**
     * @private
     */
    getPageTable(pageId: number): ZOrderPageTable;
    /**
     * @private
     */
    dragSelectedObjects(diffX: number, diffY: number, pageIndex: number, helper: PdfAnnotationBaseModel): boolean;
    /**
     * @private
     */
    scaleSelectedItems(sx: number, sy: number, pivot: PointModel): boolean;
    /**
     * @private
     */
    dragConnectorEnds(endPoint: string, obj: IElement, point: PointModel, segment: PointModel, target?: IElement, targetPortId?: string): boolean;
    /**
     * @private
     */
    clearSelection(pageId: number): void;
    /**
     * @private
     */
    add(obj: PdfAnnotationBase): PdfAnnotationBaseModel;
    /**
     * @private
     */
    remove(obj: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    copy(): Object;
    /**
     * @private
     */
    rotate(angle: number): boolean;
    /**
     * @private
     */
    paste(obj?: PdfAnnotationBaseModel[]): void;
    /**
     * @private
     */
    refresh(): void;
    /**
     * @private
     */
    cut(): void;
    /**
     * @private
     */
    nodePropertyChange(actualObject: PdfAnnotationBaseModel, node: PdfAnnotationBaseModel): void;
    /**
     * @private
     */
    checkBoundaryConstraints(tx: number, ty: number, pageIndex: number, nodeBounds?: Rect, isStamp?: boolean): boolean;
}
