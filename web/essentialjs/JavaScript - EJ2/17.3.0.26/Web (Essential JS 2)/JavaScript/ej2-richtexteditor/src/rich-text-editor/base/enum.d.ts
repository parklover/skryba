/**
 * Defines types of Render

 */
export declare enum RenderType {
    /**  Defines RenderType as Toolbar */
    Toolbar = 0,
    /**  Defines RenderType as Content */
    Content = 1,
    /**  Defines RenderType as Popup */
    Popup = 2,
    /**  Defines RenderType as LinkToolbar */
    LinkToolbar = 3,
    /**  Defines RenderType as TextToolbar */
    TextToolbar = 4,
    /**  Defines RenderType as ImageToolbar */
    ImageToolbar = 5,
    /**  Defines RenderType as InlineToolbar */
    InlineToolbar = 6,
    /**  Defines RenderType as TableToolbar */
    TableToolbar = 7
}
export declare type ActionOnScroll = 'hide' | 'none';
export declare enum ToolbarType {
    /**  Defines ToolbarType as Standard */
    Expand = "Expand",
    /**  Defines ToolbarType as MultiRow */
    MultiRow = "MultiRow"
}
export declare type ToolbarItems = 'alignments' | 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'justifyFull' | 'fontName' | 'fontSize' | 'fontColor' | 'backgroundColor' | 'bold' | 'italic' | 'underline' | 'strikeThrough' | 'clearFormat' | 'clearAll' | 'cut' | 'copy' | 'paste' | 'unorderedList' | 'orderedList' | 'indent' | 'outdent' | 'undo' | 'redo' | 'superScript' | 'subScript' | 'createLink' | 'openLink' | 'editLink' | 'image' | 'createTable' | 'removeTable' | 'replace' | 'align' | 'caption' | 'remove' | 'openImageLink' | 'editImageLink' | 'removeImageLink' | 'insertLink' | 'display' | 'altText' | 'dimension' | 'fullScreen' | 'maximize' | 'minimize' | 'lowerCase' | 'upperCase' | 'print' | 'formats' | 'sourceCode' | 'preview' | 'viewSide' | 'insertCode' | 'tableHeader' | 'tableRemove' | 'tableRows' | 'tableColumns' | 'tableCellBackground' | 'tableCellHorizontalAlign' | 'tableCellVerticalAlign' | 'tableEditProperties' | 'styles' | 'removeLink';
