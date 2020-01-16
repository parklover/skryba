import { Component, INotifyPropertyChanged, ModuleDeclaration, ChildProperty } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DocumentChangeEventArgs, ViewChangeEventArgs, ZoomFactorChangeEventArgs, StyleType } from './index';
import { SelectionChangeEventArgs, RequestNavigateEventArgs, ContentChangeEventArgs, DocumentEditorKeyDownEventArgs, CustomContentMenuEventArgs, BeforeOpenCloseCustomContentMenuEventArgs } from './index';
import { LayoutViewer } from './index';
import { Print, SearchResultsChangeEventArgs } from './index';
import { WParagraphFormat, WCharacterFormat } from './index';
import { SfdtReader } from './index';
import { Selection } from './index';
import { TextPosition } from './index';
import { Editor, EditorHistory } from './index';
import { Search } from './index';
import { OptionsPane } from './index';
import { WordExport } from './index';
import { TextExport } from './index';
import { FormatType, PageFitType, DialogType } from './index';
import { ContextMenu } from './index';
import { ImageResizer } from './index';
import { SfdtExport } from './index';
import { HyperlinkDialog, TableDialog, BookmarkDialog, StylesDialog, TableOfContentsDialog } from './index';
import { PageSetupDialog, ParagraphDialog, ListDialog, StyleDialog, FontDialog } from './index';
import { TablePropertiesDialog, BordersAndShadingDialog, CellOptionsDialog, TableOptionsDialog } from './index';
import { SpellChecker } from './implementation/spell-check/spell-checker';
import { SpellCheckDialog } from './implementation/dialogs/spellCheck-dialog';
import { DocumentEditorModel, ServerActionSettingsModel } from './document-editor-model';
import { CharacterFormatProperties, ParagraphFormatProperties, SectionFormatProperties } from './implementation';
import { PasteOptions } from './index';
/**
 * The Document editor component is used to draft, save or print rich text contents as page by page.
 */
export declare class DocumentEditor extends Component<HTMLElement> implements INotifyPropertyChanged {
    private enableHeaderFooterIn;
    /**
     * @private
     */
    enableHeaderAndFooter: boolean;
    /**
     * @private
     */
    viewer: LayoutViewer;
    /**
     * @private
     */
    isShiftingEnabled: boolean;
    /**
     * @private
     */
    isLayoutEnabled: boolean;
    /**
     * @private
     */
    isPastingContent: boolean;
    /**
     * @private
     */
    parser: SfdtReader;
    private isDocumentLoadedIn;
    private disableHistoryIn;
    /**
     * @private
     */
    findResultsList: string[];
    /**
     * @private
     */
    printModule: Print;
    /**
     * @private
     */
    sfdtExportModule: SfdtExport;
    /**
     * @private
     */
    selectionModule: Selection;
    /**
     * @private
     */
    editorModule: Editor;
    /**
     * @private
     */
    wordExportModule: WordExport;
    /**
     * @private
     */
    textExportModule: TextExport;
    /**
     * @private
     */
    editorHistoryModule: EditorHistory;
    /**
     * @private
     */
    tableOfContentsDialogModule: TableOfContentsDialog;
    /**
     * @private
     */
    tablePropertiesDialogModule: TablePropertiesDialog;
    /**
     * @private
     */
    bordersAndShadingDialogModule: BordersAndShadingDialog;
    /**
     * @private
     */
    listDialogModule: ListDialog;
    /**
     * @private
     */
    styleDialogModule: StyleDialog;
    /**
     * @private
     */
    cellOptionsDialogModule: CellOptionsDialog;
    /**
     * @private
     */
    tableOptionsDialogModule: TableOptionsDialog;
    /**
     * @private
     */
    tableDialogModule: TableDialog;
    /**
     * @private
     */
    spellCheckDialogModule: SpellCheckDialog;
    /**
     * @private
     */
    pageSetupDialogModule: PageSetupDialog;
    /**
     * @private
     */
    paragraphDialogModule: ParagraphDialog;
    /**
     * @private
     */
    optionsPaneModule: OptionsPane;
    /**
     * @private
     */
    hyperlinkDialogModule: HyperlinkDialog;
    /**
     * @private
     */
    bookmarkDialogModule: BookmarkDialog;
    /**
     * @private
     */
    stylesDialogModule: StylesDialog;
    /**
     * @private
     */
    contextMenuModule: ContextMenu;
    /**
     * @private
     */
    imageResizerModule: ImageResizer;
    /**
     * @private
     */
    searchModule: Search;
    /**
     * Default Paste Formatting Options

     */
    defaultPasteOption: PasteOptions;
    /**
     * Current User

     */
    currentUser: string;
    /**
     * User Selection Highlight Color

     */
    userColor: string;
    /**
     * Gets or sets the page gap value in document editor

     */
    pageGap: number;
    /**
     * Gets or sets the name of the document.

     */
    documentName: string;
    /**
     * @private
     */
    spellCheckerModule: SpellChecker;
    /**
     * Sfdt Service URL

     */
    serviceUrl: string;
    /**
     * Gets or sets the zoom factor in document editor.

     */
    zoomFactor: number;
    /**
     * Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.


     */
    zIndex: number;
    /**
     * Gets or sets a value indicating whether the document editor is in read only state or not.

     */
    isReadOnly: boolean;
    /**
     * Gets or sets a value indicating whether print needs to be enabled or not.

     */
    enablePrint: boolean;
    /**
     * Gets or sets a value indicating whether selection needs to be enabled or not.

     */
    enableSelection: boolean;
    /**
     * Gets or sets a value indicating whether editor needs to be enabled or not.

     */
    enableEditor: boolean;
    /**
     * Gets or sets a value indicating whether editor history needs to be enabled or not.

     */
    enableEditorHistory: boolean;
    /**
     * Gets or sets a value indicating whether Sfdt export needs to be enabled or not.

     */
    enableSfdtExport: boolean;
    /**
     * Gets or sets a value indicating whether word export needs to be enabled or not.

     */
    enableWordExport: boolean;
    /**
     * Gets or sets a value indicating whether text export needs to be enabled or not.

     */
    enableTextExport: boolean;
    /**
     * Gets or sets a value indicating whether options pane is enabled or not.

     */
    enableOptionsPane: boolean;
    /**
     * Gets or sets a value indicating whether context menu is enabled or not.

     */
    enableContextMenu: boolean;
    /**
     * Gets or sets a value indicating whether hyperlink dialog is enabled or not.

     */
    enableHyperlinkDialog: boolean;
    /**
     * Gets or sets a value indicating whether bookmark dialog is enabled or not.

     */
    enableBookmarkDialog: boolean;
    /**
     * Gets or sets a value indicating whether table of contents dialog is enabled or not.

     */
    enableTableOfContentsDialog: boolean;
    /**
     * Gets or sets a value indicating whether search module is enabled or not.

     */
    enableSearch: boolean;
    /**
     * Gets or sets a value indicating whether paragraph dialog is enabled or not.

     */
    enableParagraphDialog: boolean;
    /**
     * Gets or sets a value indicating whether list dialog is enabled or not.

     */
    enableListDialog: boolean;
    /**
     * Gets or sets a value indicating whether table properties dialog is enabled or not.

     */
    enableTablePropertiesDialog: boolean;
    /**
     * Gets or sets a value indicating whether borders and shading dialog is enabled or not.

     */
    enableBordersAndShadingDialog: boolean;
    /**
     * Gets or sets a value indicating whether margin dialog is enabled or not.

     */
    enablePageSetupDialog: boolean;
    /**
     * Gets or sets a value indicating whether font dialog is enabled or not.

     */
    enableStyleDialog: boolean;
    /**
     * Gets or sets a value indicating whether font dialog is enabled or not.

     */
    enableFontDialog: boolean;
    /**
     * @private
     */
    fontDialogModule: FontDialog;
    /**
     * Gets or sets a value indicating whether table options dialog is enabled or not.

     */
    enableTableOptionsDialog: boolean;
    /**
     * Gets or sets a value indicating whether table dialog is enabled or not.

     */
    enableTableDialog: boolean;
    /**
     * Gets or sets a value indicating whether image resizer is enabled or not.

     */
    enableImageResizer: boolean;
    /**
     * Gets or sets a value indicating whether editor need to be spell checked.

     */
    enableSpellCheck: boolean;
    /**
     * Gets or Sets a value indicating whether tab key can be accepted as input or not.

     */
    acceptTab: boolean;
    /**
     * Gets or Sets a value indicating whether holding Ctrl key is required to follow hyperlink on click. The default value is true.

     */
    useCtrlClickToFollowHyperlink: boolean;
    /**
     * Gets or sets the page outline color.

     */
    pageOutline: string;
    /**
     * Gets or sets a value indicating whether to enable cursor in document editor on read only state or not. The default value is false.

     */
    enableCursorOnReadOnly: boolean;
    /**
     * Gets or sets a value indicating whether local paste needs to be enabled or not.

     */
    enableLocalPaste: boolean;
    /**
     * Defines the settings of the DocumentEditor services
     */
    serverActionSettings: ServerActionSettingsModel;
    /**
     * Triggers whenever document changes in the document editor.
     * @event

     */
    documentChange: EmitType<DocumentChangeEventArgs>;
    /**
     * Triggers whenever container view changes in the document editor.
     * @event

     */
    viewChange: EmitType<ViewChangeEventArgs>;
    /**
     * Triggers whenever zoom factor changes in the document editor.
     * @event

     */
    zoomFactorChange: EmitType<ZoomFactorChangeEventArgs>;
    /**
     * Triggers whenever selection changes in the document editor.
     * @event

     */
    selectionChange: EmitType<SelectionChangeEventArgs>;
    /**
     * Triggers whenever hyperlink is clicked or tapped in the document editor.
     * @event

     */
    requestNavigate: EmitType<RequestNavigateEventArgs>;
    /**
     * Triggers whenever content changes in the document editor.
     * @event

     */
    contentChange: EmitType<ContentChangeEventArgs>;
    /**
     * Triggers whenever key is pressed in the document editor.
     * @event

     */
    keyDown: EmitType<DocumentEditorKeyDownEventArgs>;
    /**
     * Triggers whenever search results changes in the document editor.
     * @event

     */
    searchResultsChange: EmitType<SearchResultsChangeEventArgs>;
    /**
     * Triggers when the component is created
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     * @event

     */
    destroyed: EmitType<Object>;
    /**
     * Triggers while selecting the custom context-menu option.
     * @event

     */
    customContextMenuSelect: EmitType<CustomContentMenuEventArgs>;
    /**
     * Triggers before opening the custom context-menu option.
     * @event

     */
    customContextMenuBeforeOpen: EmitType<BeforeOpenCloseCustomContentMenuEventArgs>;
    /**
     * @private
     */
    characterFormat: CharacterFormatProperties;
    /**
     * @private
     */
    paragraphFormat: ParagraphFormatProperties;
    /**
     * @private
     */
    sectionFormat: SectionFormatProperties;
    /**
     * Gets the total number of pages.
     * @returns {number}
     */
    readonly pageCount: number;
    /**
     *  Gets the selection object of the document editor.


     * @returns {Selection}

     */
    readonly selection: Selection;
    /**
     *  Gets the editor object of the document editor.


     * @returns {Editor}

     */
    readonly editor: Editor;
    /**
     * Gets the editor history object of the document editor.


     * @returns {EditorHistory}
     */
    readonly editorHistory: EditorHistory;
    /**
     * Gets the search object of the document editor.


     * @returns { Search }
     */
    readonly search: Search;
    /**
     * Gets the context menu object of the document editor.


     * @returns {ContextMenu}
     */
    readonly contextMenu: ContextMenu;
    /**
     * Gets the spell check dialog object of the document editor.
     * @returns SpellCheckDialog
     */
    readonly spellCheckDialog: SpellCheckDialog;
    /**
     * Gets the spell check object of the document editor.


     * @returns SpellChecker
     */
    readonly spellChecker: SpellChecker;
    /**
     * @private
     */
    readonly containerId: string;
    /**
     * @private
     */
    isDocumentLoaded: boolean;
    /**
     * Determines whether history needs to be enabled or not.

     * @private
     */
    readonly enableHistoryMode: boolean;
    /**
     * Gets the start text position in the document.

     * @private
     */
    readonly documentStart: TextPosition;
    /**
     * Gets the end text position in the document.

     * @private
     */
    readonly documentEnd: TextPosition;
    /**
     * @private
     */
    readonly isReadOnlyMode: boolean;
    /**
     * Specifies to enable image resizer option
     * default - false
     * @private
     */
    readonly enableImageResizerMode: boolean;
    /**
     * Initialize the constructor of DocumentEditor
     */
    constructor(options?: DocumentEditorModel, element?: string | HTMLElement);
    protected preRender(): void;
    protected render(): void;
    /**
     * Get component name
     * @private
     */
    getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    onPropertyChanged(model: DocumentEditorModel, oldProp: DocumentEditorModel): void;
    private localizeDialogs;
    /**
     * Set the default character format for document editor
     * @param characterFormat
     */
    setDefaultCharacterFormat(characterFormat: CharacterFormatProperties): void;
    /**
     * Set the default paragraph format for document editor
     * @param paragraphFormat
     */
    setDefaultParagraphFormat(paragraphFormat: ParagraphFormatProperties): void;
    /**
     * Set the default section format for document editor
     * @param sectionFormat
     */
    setDefaultSectionFormat(sectionFormat: SectionFormatProperties): void;
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    getPersistData(): string;
    private clearPreservedCollectionsInViewer;
    /**
     * @private
     */
    getDocumentEditorElement(): HTMLElement;
    /**
     * @private
     */
    fireContentChange(): void;
    /**
     * @private
     */
    fireDocumentChange(): void;
    /**
     * @private
     */
    fireSelectionChange(): void;
    /**
     * @private
     */
    fireZoomFactorChange(): void;
    /**
     * @private
     */
    fireViewChange(): void;
    /**
     * @private
     */
    fireCustomContextMenuSelect(item: string): void;
    /**
     * @private
     */
    fireCustomContextMenuBeforeOpen(item: string[]): void;
    /**
     * Shows the Paragraph dialog
     * @private
     */
    showParagraphDialog(paragraphFormat?: WParagraphFormat): void;
    /**
     * Shows the margin dialog
     * @private
     */
    showPageSetupDialog(): void;
    /**
     * Shows the font dialog
     * @private
     */
    showFontDialog(characterFormat?: WCharacterFormat): void;
    /**
     * Shows the cell option dialog
     * @private
     */
    showCellOptionsDialog(): void;
    /**
     * Shows the table options dialog.
     * @private
     */
    showTableOptionsDialog(): void;
    /**
     * Shows insert table dialog
     * @private
     */
    showTableDialog(): void;
    /**
     * Shows the table of content dialog
     * @private
     */
    showTableOfContentsDialog(): void;
    /**
     * Shows the style dialog
     * @private
     */
    showStyleDialog(): void;
    /**
     * Shows the hyperlink dialog
     * @private
     */
    showHyperlinkDialog(): void;
    /**
     * Shows the bookmark dialog.
     * @private
     */
    showBookmarkDialog(): void;
    /**
     * Shows the styles dialog.
     * @private
     */
    showStylesDialog(): void;
    /**
     * Shows the List dialog
     * @private
     */
    showListDialog(): void;
    /**
     * Shows the table properties dialog
     * @private
     */
    showTablePropertiesDialog(): void;
    /**
     * Shows the borders and shading dialog
     * @private
     */
    showBordersAndShadingDialog(): void;
    protected requiredModules(): ModuleDeclaration[];
    /**
     * @private
     */
    defaultLocale: Object;
    /**
     * Opens the given Sfdt text.
     * @param {string} sfdtText.
     */
    open(sfdtText: string): void;
    /**
     * Scrolls view to start of the given page number if exists.
     * @param  {number} pageNumber.
     * @returns void
     */
    scrollToPage(pageNumber: number): boolean;
    /**
     * Enables all the modules.
     * @returns void
     */
    enableAllModules(): void;
    /**
     * Resizes the component and its sub elements based on given size or container size.
     * @param width
     * @param height
     */
    resize(width?: number, height?: number): void;
    /**
     * Shifts the focus to the document.
     */
    focusIn(): void;
    /**
     * Fits the page based on given fit type.
     * @param  {PageFitType} pageFitType? - Default value of ‘pageFitType’ parameter is 'None'
     * @returns void
     */
    fitPage(pageFitType?: PageFitType): void;
    /**
     * Prints the document.
     * @param  {Window} printWindow? - Default value of 'printWindow' parameter is undefined.
     */
    print(printWindow?: Window): void;
    /**
     * Serialize the data to JSON string.
     */
    serialize(): string;
    /**
     * Saves the document.
     * @param {string} fileName
     * @param {FormatType} formatType
     */
    save(fileName: string, formatType?: FormatType): void;
    /**
     * Saves the document as blob.
     * @param {FormatType} formatType
     */
    saveAsBlob(formatType?: FormatType): Promise<Blob>;
    /**
     * Opens a blank document.
     */
    openBlank(): void;
    /**
     * Gets the style names based on given style type.
     * @param styleType
     */
    getStyleNames(styleType?: StyleType): string[];
    /**
     * Gets the style objects on given style type.
     * @param styleType
     */
    getStyles(styleType?: StyleType): Object[];
    /**
     * Gets the bookmarks.
     */
    getBookmarks(): string[];
    /**
     * Shows the dialog.
     * @param {DialogType} dialogType
     * @returns void
     */
    showDialog(dialogType: DialogType): void;
    /**
     * Shows the options pane.
     */
    showOptionsPane(): void;
    /**
     * Destroys all managed resources used by this object.
     */
    destroy(): void;
    private destroyDependentModules;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor.
 */
export declare class ServerActionSettings extends ChildProperty<ServerActionSettings> {
    /**
     * Specifies the system clipboard action of Document Editor.

     */
    systemClipboard: string;
    /**
     * Specifies the spell check action of Document Editor.

     */
    spellCheck: string;
    /**
     * Specifies the restrict editing encryption/decryption action of Document Editor.

     */
    restrictEditing: string;
}
/**
 * The `ServerActionSettings` module is used to provide the server action methods of Document Editor Container.
 */
export declare class ContainerServerActionSettings extends ServerActionSettings {
    /**
     * Specifies the load action of Document Editor.

     */
    import: string;
}
