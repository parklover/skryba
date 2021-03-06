/**
 * Enum toolbarItem for toolbar settings
 */
export declare type ToolbarItem = 'OpenOption' | 'PageNavigationTool' | 'MagnificationTool' | 'PanTool' | 'SelectionTool' | 'SearchOption' | 'PrintOption' | 'DownloadOption' | 'UndoRedoTool' | 'AnnotationEditTool' | 'CommentTool';
/**
 * Enum AnnotationToolbarItem for annotation toolbar settings
 */
export declare type AnnotationToolbarItem = 'HighlightTool' | 'UnderlineTool' | 'StrikethroughTool' | 'ShapeTool' | 'CalibrateTool' | 'ColorEditTool' | 'StrokeColorEditTool' | 'ThicknessEditTool' | 'OpacityEditTool' | 'AnnotationDeleteTool' | 'StampAnnotationTool' | 'HandWrittenSignatureTool' | 'FreeTextAnnotationTool' | 'FontFamilyAnnotationTool' | 'FontSizeAnnotationTool' | 'FontStylesAnnotationTool' | 'FontAlignAnnotationTool' | 'FontColorAnnotationTool' | 'CommentPanelTool';
/**
 * Enum LinkTarget for hyperlink navigation
 */
export declare type LinkTarget = 'CurrentTab' | 'NewTab' | 'NewWindow';
/**
 * Enum InteractionMode for interaction mode
 */
export declare type InteractionMode = 'TextSelection' | 'Pan';
/**
 * Enum AnnotationType for specifying Annotations
 */
export declare type AnnotationType = 'None' | 'Highlight' | 'Underline' | 'Strikethrough' | 'Line' | 'Arrow' | 'Rectangle' | 'Circle' | 'Polygon' | 'Distance' | 'Perimeter' | 'Area' | 'Radius' | 'Volume' | 'FreeText' | 'HandWrittenSignature';
/**
 * Enum LineHeadStyle for line and arrow annotation
 */
export declare type LineHeadStyle = 'None' | 'Closed' | 'Open' | 'Square' | 'Round' | 'Diamond';
/**
 * Enum unit for calibration annotation
 */
export declare type CalibrationUnit = 'pt' | 'in' | 'mm' | 'cm' | 'p' | 'ft';
/**
 * Enum unit for ContextMenu Actions
 */
export declare type ContextMenuAction = 'None' | 'MouseUp' | 'RightClick';
/**
 * Enum for font styles
 */
export declare enum FontStyle {
    None = 0,
    Bold = 1,
    Italic = 2,
    Underline = 4,
    Strikethrough = 8
}
/**
 * Enum unit for text alignment
 */
export declare type TextAlignment = 'Left' | 'Right' | 'Center' | 'Justify';
