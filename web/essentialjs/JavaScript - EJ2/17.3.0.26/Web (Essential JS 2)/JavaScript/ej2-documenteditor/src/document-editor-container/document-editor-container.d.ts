import { Component, INotifyPropertyChanged, ModuleDeclaration, L10n } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { Toolbar } from './tool-bar/tool-bar';
import { DocumentEditorContainerModel } from './document-editor-container-model';
import { DocumentEditor } from '../document-editor/document-editor';
import { TextProperties } from './properties-pane/text-properties-pane';
import { HeaderFooterProperties } from './properties-pane/header-footer-pane';
import { ImageProperties } from './properties-pane/image-properties-pane';
import { TocProperties } from './properties-pane/table-of-content-pane';
import { TableProperties } from './properties-pane/table-properties-pane';
import { StatusBar } from './properties-pane/status-bar';
import { ContainerContentChangeEventArgs, ContainerSelectionChangeEventArgs, ContainerDocumentChangeEventArgs, CustomContentMenuEventArgs, BeforeOpenCloseCustomContentMenuEventArgs } from '../document-editor/base';
import { ContainerServerActionSettingsModel } from '../document-editor/document-editor-model';
import { CharacterFormatProperties, ParagraphFormatProperties, SectionFormatProperties } from '../document-editor/implementation';
/**
 * Document Editor container component.
 */
export declare class DocumentEditorContainer extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Show or hide properties pane.

     */
    showPropertiesPane: boolean;
    /**
     * Enable or disable toolbar in document editor container.

     */
    enableToolbar: boolean;
    /**
     * Restrict editing operation.

     */
    restrictEditing: boolean;
    /**
     * Enable or disable spell checker in document editor container.

     */
    enableSpellCheck: boolean;
    /**
     * Enable local paste

     */
    enableLocalPaste: boolean;
    /**
     * Sfdt service URL.

     */
    serviceUrl: string;
    /**
     * Specifies the z-order for rendering that determines whether the dialog is displayed in front or behind of another component.

     */
    zIndex: number;
    /**
     * Enable rendering with strict Content Security policy.
     */
    enableCsp: boolean;
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
     * Triggers whenever the content changes in the document editor container.
     * @event

     */
    contentChange: EmitType<ContainerContentChangeEventArgs>;
    /**
     * Triggers whenever selection changes in the document editor container.
     * @event

     */
    selectionChange: EmitType<ContainerSelectionChangeEventArgs>;
    /**
     * Triggers whenever document changes in the document editor container.
     * @event

     */
    documentChange: EmitType<ContainerDocumentChangeEventArgs>;
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
     * Document editor container's toolbar module
     * @private
     */
    toolbarModule: Toolbar;
    /**
     * @private
     */
    localObj: L10n;
    /**
     * Document Editor instance
     */
    private documentEditorInternal;
    /**
     * @private
     */
    toolbarContainer: HTMLElement;
    /**
     * @private
     */
    editorContainer: HTMLElement;
    /**
     * @private
     */
    propertiesPaneContainer: HTMLElement;
    /**
     * @private
     */
    statusBarElement: HTMLElement;
    /**
     * Text Properties
     * @private
     */
    textProperties: TextProperties;
    /**
     * Header footer Properties
     * @private
     */
    headerFooterProperties: HeaderFooterProperties;
    /**
     * Image Properties Pane
     * @private
     */
    imageProperties: ImageProperties;
    /**
     * @private
     */
    tocProperties: TocProperties;
    /**
     * @private
     */
    tableProperties: TableProperties;
    /**
     * @private
     */
    statusBar: StatusBar;
    /**
     * @private
     */
    containerTarget: HTMLElement;
    /**
     * @private
     */
    previousContext: string;
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
     * Defines the settings of the DocumentEditorContainer service.
     */
    serverActionSettings: ContainerServerActionSettingsModel;
    /**
     * Gets DocumentEditor instance.


     */
    readonly documentEditor: DocumentEditor;
    /**
     * Initialize the constructor of DocumentEditorContainer
     */
    constructor(options?: DocumentEditorContainerModel, element?: string | HTMLElement);
    /**
     * default locale
     * @private
     */
    defaultLocale: Object;
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * @private
     */
    onPropertyChanged(newModel: DocumentEditorContainerModel, oldModel: DocumentEditorContainerModel): void;
    /**
     * @private
     */
    protected preRender(): void;
    /**
     * @private
     */
    protected render(): void;
    private setFormat;
    private setserverActionSettings;
    /**
     * @private
     */
    getPersistData(): string;
    protected requiredModules(): ModuleDeclaration[];
    private initContainerElement;
    private initializeDocumentEditor;
    /**
     * @private
     */
    showHidePropertiesPane(show: boolean): void;
    /**
     * @private
     */
    onContentChange(): void;
    /**
     * @private
     */
    onDocumentChange(): void;
    /**
     * @private
     */
    onSelectionChange(): void;
    /**
     * @private
     */
    private onZoomFactorChange;
    /**
     * @private
     */
    private onRequestNavigate;
    /**
     * @private
     */
    private onViewChange;
    /**
     * @private
     */
    private onCustomContextMenuSelect;
    /**
     * @private
     */
    private onCustomContextMenuBeforeOpen;
    /**
     * @private
     */
    showPropertiesPaneOnSelection(): void;
    /**
     * @private
     * @param property
     */
    showProperties(property: string): void;
    /**
     * Set the default character format for document editor container
     * @param characterFormat
     */
    setDefaultCharacterFormat(characterFormat: CharacterFormatProperties): void;
    /**
     * Set the default paragraph format for document editor container
     * @param paragraphFormat
     */
    setDefaultParagraphFormat(paragraphFormat: ParagraphFormatProperties): void;
    /**
     * Set the default section format for document editor container
     * @param sectionFormat
     */
    setDefaultSectionFormat(sectionFormat: SectionFormatProperties): void;
    /**
     * Destroys all managed resources used by this object.
     */
    destroy(): void;
}
