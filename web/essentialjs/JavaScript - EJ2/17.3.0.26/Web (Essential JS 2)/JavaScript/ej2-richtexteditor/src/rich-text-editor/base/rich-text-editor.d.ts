import { Component, ModuleDeclaration, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, L10n } from '@syncfusion/ej2-base';
import { BeforeOpenEventArgs } from '@syncfusion/ej2-popups';
import { RichTextEditorModel } from './rich-text-editor-model';
import { Render } from '../renderer/render';
import { ViewSource } from '../renderer/view-source';
import { IRenderer, IFormatter, ActionCompleteEventArgs, ActionBeginEventArgs } from './interface';
import { BeforeQuickToolbarOpenArgs } from './interface';
import { CommandName, ResizeArgs } from './interface';
import { ILinkCommandsArgs, IImageCommandsArgs, BeforeSanitizeHtmlArgs } from './interface';
import { ServiceLocator } from '../services/service-locator';
import { EditorMode } from './../../common/types';
import { Toolbar } from '../actions/toolbar';
import { KeyboardEvents } from '../actions/keyboard';
import { FontFamilyModel, FontSizeModel, FontColorModel, FormatModel, BackgroundColorModel } from '../models/models';
import { ToolbarSettingsModel, IFrameSettingsModel, ImageSettingsModel, TableSettingsModel } from '../models/models';
import { QuickToolbarSettingsModel, InlineModeModel, PasteCleanupSettingsModel } from '../models/models';
import { Link } from '../renderer/link-module';
import { Image } from '../renderer/image-module';
import { Table } from '../renderer/table-module';
import { Count } from '../actions/count';
import { HtmlEditor } from '../actions/html-editor';
import { MarkdownEditor } from '../actions/markdown-editor';
import { BaseToolbar } from '../actions/base-toolbar';
import { QuickToolbar } from '../actions/quick-toolbar';
import { FullScreen } from '../actions/full-screen';
import { PasteCleanup } from '../actions/paste-clean-up';
import { SelectedEventArgs, RemovingEventArgs, UploadingEventArgs, FileInfo } from '@syncfusion/ej2-inputs';
import { Resize } from '../actions/resize';
import { ItemModel } from '@syncfusion/ej2-navigations';
export interface ChangeEventArgs {
    /**
     * Returns value of RichTextEditor
     */
    value: string;
    /** Defines the event name. */
    name?: string;
}
export interface DialogOpenEventArgs {
    /**
     * Defines whether the current action can be prevented.
     */
    target: HTMLElement | String;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
export interface DialogCloseEventArgs {
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Returns the root container element of the dialog.
     */
    container: HTMLElement;
    /**
     * Returns the element of the dialog.
     */
    element: Element;
    /**
     * Returns the original event arguments.
     */
    event: Event;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
    /**
     * DEPRECATED-Determines whether the event is triggered by interaction.
     */
    isInteraction: boolean;
    /**
     * Specify the name of the event.
     */
    name?: string;
    /**
     * Defines whether the current action can be prevented.
     */
    target: HTMLElement | String;
}
export interface ToolbarUpdateEventArgs {
    /**
     * Specify the name of the event.
     */
    name?: string;
    /**
     * Specify the name of the event.
     */
    redo: boolean;
    /**
     * Specify the name of the event.
     */
    undo: boolean;
}
export interface ImageSuccessEventArgs {
    /**
     * Returns the original event arguments.
     */
    e?: object;
    /**
     * Returns the details about upload file.

     */
    file: FileInfo;
    /**
     * Returns the upload status.
     */
    statusText?: string;
    /**
     * Returns the upload event operation.
     */
    operation: string;
    /**
     * Returns the upload event operation.

     */
    response?: ResponseEventArgs;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
export interface ImageFailedEventArgs {
    /**
     * Returns the original event arguments.
     */
    e?: object;
    /**
     * Returns the details about upload file.

     */
    file: FileInfo;
    /**
     * Returns the upload status.
     */
    statusText?: string;
    /**
     * Returns the upload event operation.
     */
    operation: string;
    /**
     * Returns the upload event operation.

     */
    response?: ResponseEventArgs;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
export interface ResponseEventArgs {
    headers?: string;
    readyState?: object;
    statusCode?: object;
    statusText?: string;
    withCredentials?: boolean;
}
export interface DestroyedEventArgs {
    /**
     * Specify the name of the event.
     */
    name?: string;
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
}
export interface BlurEventArgs {
    /**
     * Returns the original event arguments.
     */
    event: Event;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
export interface ToolbarClickEventArgs {
    /**
     * Defines whether the current action can be prevented.
     */
    cancel: boolean;
    /**
     * Defines the current Toolbar Item Object.

     */
    item: ItemModel;
    /**
     * Defines the current Event arguments
     */
    originalEvent: MouseEvent;
    /**
     * Specify the request type of the event.
     */
    requestType: string;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
export interface FocusEventArgs {
    /**
     * Returns the original event arguments.
     */
    event: FocusEvent;
    /**
     * Determines whether the event is triggered by interaction.
     */
    isInteracted: boolean;
    /**
     * Specify the name of the event.
     */
    name?: string;
}
/**
 * Represents the RichTextEditor component.
 * ```html
 * <textarea id="rte"></textarea>
 * <script>
 *  var rteObj = new RichTextEditor();
 *  rteObj.appendTo("#rte");
 * </script>
 * ```
 */
export declare class RichTextEditor extends Component<HTMLElement> implements INotifyPropertyChanged {
    private placeHolderWrapper;
    private scrollParentElements;
    private cloneValue;
    private onFocusHandler;
    private onBlurHandler;
    private onResizeHandler;
    private timeInterval;
    private touchModule;
    private defaultResetValue;
    /**

     */
    isFocusOut: boolean;
    /**

     */
    inputElement: HTMLElement;
    /**

     */
    isRTE: boolean;
    /**

     */
    isBlur: boolean;
    /**

     */
    renderModule: Render;
    /**

     */
    contentModule: IRenderer;
    /**

     */
    serviceLocator: ServiceLocator;
    /**
     * The `toolbarModule` is used to manipulate ToolBar items and its action in the RichTextEditor.

     */
    toolbarModule: Toolbar;
    /**

     */
    imageModule: Image;
    /**

     */
    tableModule: Table;
    /**

     */
    fullScreenModule: FullScreen;
    /**

     */
    resizeModule: Resize;
    /**

     */
    pasteCleanupModule: PasteCleanup;
    /**

     */
    sourceCodeModule: ViewSource;
    /**

     */
    linkModule: Link;
    /**

     */
    markdownEditorModule: MarkdownEditor;
    /**

     */
    htmlEditorModule: HtmlEditor;
    /**

     */
    quickToolbarModule: QuickToolbar;
    /**

     */
    countModule: Count;
    needsID: boolean;
    /**
     * Specifies the group of items aligned horizontally in the toolbar as well as defined the toolbar rendering type.
     * By default, toolbar is float at the top of the RichTextEditor.
     * When you scroll down, the toolbar will scroll along with the page on RichTextEditor with the specified offset value.
     * * enable: set boolean value to show or hide the toolbar.
     * * enableFloating: Set Boolean value to enable or disable the floating toolbar.
     * Preserves the toolbar at top of the RichTextEditor on scrolling.
     * * type: it has two possible options
     *      1. Expand: Hide the overflowing toolbar items in the next row. Click the expand arrow to view overflowing toolbar items
     *      2. MultiRow: The toolbar overflowing items wrapped in the next row.
     * * items: Specifies the array of items aligned horizontally in the toolbar.
     * > | and - can insert a vertical and horizontal separator lines in the toolbar.
     * * itemConfigs: Modify the default toolbar item configuration like icon class.
     *
     * > By default, The toolbar is rendered with scrollable in mobile devices and does not support the toolbar type.

     * {
     *  enable: true,
     *  enableFloating: true,
     *  type: ToolbarType.Expand,
     *  items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
     *  'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo'],
     *  itemConfigs: {}
     * }
     */
    toolbarSettings: ToolbarSettingsModel;
    /**
     * Specifies the items to be rendered in quick toolbar based on the target element.
     * * It has following fields:
     * * enable - set boolean value to show or hide the quick toolbar
     * * actionOnScroll - it has two possible options
     *     1. hide: The quickToolbar is closed when the parent element is scrolled.
     *     2. none: The quickToolbar cannot be closed even the parent element is scrolled.
     * * link  - Specifies the items to be rendered in quick toolbar based on link element such as `Open`, `Edit`, and `UnLink`.
     * * image - Specifies the items to be rendered in quick toolbar based on image element such as 'Replace',
     * 'Align', 'Caption', 'Remove', 'InsertLink', 'Display', 'AltText', 'Dimension'.
     * * text	 - Specifies the items to be rendered in quick toolbar based on text element such as 'Cut', 'Copy', 'Paste'.

     * {
     *  enable: true,
     *  actionOnScroll: 'hide',
     *  link: ['Open', 'Edit', 'UnLink'],
     *  image: ['Replace', 'Align', 'Caption', 'Remove', '-', 'InsertLink', 'Display', 'AltText', 'Dimension'],
     *  text: ['Cut', 'Copy', 'Paste']
     * }
     */
    quickToolbarSettings: QuickToolbarSettingsModel;
    /**
     * Specifies the pasting options in RichTextEditor component and control with the following properties.
     * * prompt - Set boolean value to enable or disable the prompt when pasting.
     * * deniedAttrs  -  Specifies the attributes to restrict when pasting in RTE.
     * * allowedStyleProps  -  Specifies the allowed style properties when pasting in RTE.
     * * deniedTags	 -  Specifies the tags to restrict when pasting in RTE.
     * * keepFormat	 -   Set boolean value to keep or remove the from when pasting.
     * * plainText	 -   Set boolean value to paste as plain text or not.

     * {
     *  prompt: false,
     *  deniedAttrs: null,
     *  allowedStyleProps: ['background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius',
     *  'border-right', 'border-style', 'border-top', 'border-width', 'clear', 'color', 'cursor',
     *  'direction', 'display', 'float', 'font', 'font-family', 'font-size', 'font-weight', 'font-style',
     *  'height', 'left', 'line-height', 'margin', 'margin-top', 'margin-left',
     *  'margin-right', 'margin-bottom', 'max-height', 'max-width', 'min-height', 'min-width',
     *  'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right',
     *  'padding-top', 'position', 'right', 'table-layout', 'text-align', 'text-decoration', 'text-indent',
     *  'top', 'vertical-align', 'visibility', 'white-space', 'width'],
     *  deniedTags: null,
     *  keepFormat: true,
     *  plainText:  false
     * }
     */
    pasteCleanupSettings: PasteCleanupSettingsModel;
    /**
     * Specifies the items to be rendered in an iframe mode, and it has the following properties.
     * * enable - Set Boolean value to enable, the editors content is placed in an iframe and isolated from the rest of the page.
     * * attributes - Custom style to be used inside the iframe to display content. This style is added to the iframe body.
     * * resources - we can add both styles and scripts to the iframe.
     *    1. styles[] - An array of CSS style files to inject inside the iframe to display content
     *    2. scripts[] - An array of JS script files to inject inside the iframe

     * {
     *  enable: false,
     *  attributes: null,
     *  resources: { styles: [], scripts: [] }
     * }
     */
    iframeSettings: IFrameSettingsModel;
    /**
     * Specifies the image insert options in RichTextEditor component and control with the following properties.
     * * allowedTypes - Specifies the extensions of the image types allowed to insert on bowering and
     * passing the extensions with comma separators. For example, pass allowedTypes as .jpg and .png.
     * * display - Sets the default display for an image when it is inserted in to the RichTextEditor.
     * Possible options are: 'inline' and 'block'.
     * * width - Sets the default width of the image when it is inserted in the RichTextEditor.
     * * saveFormat - Specifies the format to store the image in the RichTextEditor (Base64 or Blob).
     * * height - Sets the default height of the image when it is inserted in the RichTextEditor.
     * * saveUrl - Provides URL to map the action result method to save the image.
     * * path - Specifies the location to store the image.

     * {
     *  allowedTypes: ['.jpeg', '.jpg', '.png'],
     *  display: 'inline',
     *  width: 'auto',
     *  height: 'auto',
     *  saveFormat: 'Blob'
     *  saveUrl: null,
     *  path: null,
     * }
     */
    insertImageSettings: ImageSettingsModel;
    /**
     * Specifies the table insert options in RichTextEditor component and control with the following properties.
     * * styles - Class name should be appended by default in table element.
     * It helps to design the table in specific CSS styles always when inserting in editor.
     * * width - Sets the default width of the table when it is inserted in the RichTextEditor.
     * * minWidth - Sets the default minWidth of the table when it is inserted in the RichTextEditor.
     * * maxWidth - Sets the default maxWidth of the table when it is inserted in the RichTextEditor.
     * * resize - To enable resize the table.

     * {
     *  width: '100%',
     *  styles: [{ text: 'Dashed Borders', class: 'e-dashed-borders', command: 'Table', subCommand: 'Dashed' },
     * { text: 'Alternate Rows', class: 'e-alternate-rows', command: 'Table', subCommand: 'Alternate' }],
     * resize: true,
     *  minWidth: 0,
     *  maxWidth: null,
     * }
     */
    tableSettings: TableSettingsModel;
    /**
     * Preserves the toolbar at the top of the RichTextEditor on scrolling and
     * specifies the offset of the floating toolbar from documents top position

     */
    floatingToolbarOffset: number;
    /**
     * Enable or disable the inline edit mode.
     * * enable -  set boolean value to enable or disable the inline edit mode.
     * * onSelection - If its set to true, upon selecting the text, the toolbar is opened in inline.
     * If its set to false, upon clicking to the target element, the toolbar is opened.

     * {
     *  enable: false,
     *  onSelection: true
     * }
     */
    inlineMode: InlineModeModel;
    /**
     * Specifies the width of the RichTextEditor.

     */
    width: string | number;
    /**
     * Enables or disables the persisting component's state between page reloads.
     * If enabled, the value of RichTextEditor is persisted

     */
    enablePersistence: boolean;
    /**
     * Enables or disables the resizing option in the editor.
     * If enabled, the RichTextEditor can be resized by dragging the resize icon in the bottom right corner.

     */
    enableResize: boolean;
    /**
     * Allows additional HTML attributes such as title, name, etc., and
     * It will be accepts n number of attributes in a key-value pair format.

     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Specifies the placeholder for the RichTextEditor’s content used when the RichTextEditor body is empty.

     */
    placeholder: string;
    /**
     * The user interactions on the component are disabled, when set to true.

     */
    readonly: boolean;
    /**
     * Specifies a value that indicates whether the component is enabled or not.

     */
    enabled: boolean;
    /**
     * specifies the value whether the source code is displayed with encoded format.

     */
    enableHtmlEncode: boolean;
    /**
     * Specifies the height of the RichTextEditor component.

     */
    height: string | number;
    /**
     * Specifies the CSS class name appended with the root element of the RichTextEditor.
     * One or more custom CSS classes can be added to a RichTextEditor.

     */
    cssClass: string;
    /**
     * Specifies the value displayed in the RichTextEditor's content area and it should be string.
     * The content of RichTextEditor can be loaded with dynamic data such as database, AJAX content, and more.

     */
    value: string;
    /**
     * Specifies the count of undo history which is stored in undoRedoManager.

     */
    undoRedoSteps: number;
    /**
     * Specifies the interval value in milliseconds that store actions in undoRedoManager. The minimum value is 300 milliseconds.

     */
    undoRedoTimer: number;
    /**
     * Specifies the editing mode of the RichTextEditor.
     *
     *   - `HTML` - Render RichTextEditor as HTML editor using &lt;IFRAME&gt; element or content editable &lt;div&gt; element
     *     or &lt;textarea&gt; element.
     *
     *   - `Markdown` - Render RichTextEditor as markdown editor using &lt;textarea&gt;.
     *

     */
    editorMode: EditorMode;
    /**
     * Customizes the key actions in RichTextEditor.
     * For example, when using German keyboard, the key actions can be customized using these shortcuts.

     */
    keyConfig: {
        [key: string]: string;
    };
    /**
     * Sets Boolean value to enable or disable the display of the character counter.

     */
    showCharCount: boolean;
    /**
     * Allows the tab key action in the RichTextEditor content.

     */
    enableTabKey: boolean;
    /**
     * Enable `enableAutoUrl` to accept the given URL (relative or absolute) without validating the URL for hyperlinks, otherwise
     * the given URL will automatically convert to absolute path URL by prefixing `https://` for hyperlinks.

     */
    enableAutoUrl: boolean;
    /**
     * Specifies the maximum number of characters allowed in the RichTextEditor component.

     */
    maxLength: number;
    /**
     * Predefine the collection of paragraph styles along with quote and code style that populate in format dropdown from the toolbar.

     * {
     *  default: 'Paragraph',
     *  width: '65px',
     *  types: [
     *      { text: 'Paragraph' },
     *      { text: 'Code' },
     *      { text: 'Quotation' },
     *      { text: 'Heading 1' },
     *      { text: 'Heading 2' },
     *      { text: 'Heading 3' },
     *      { text: 'Heading 4' },
     *      { text: 'Heading 5' },
     *      { text: 'Heading 6' }
     *  ]
     * }
     */
    format: FormatModel;
    /**
     * Predefine the font families that populate in font family dropdown list from the toolbar.

     * {
     *  default: 'Segoe UI',
     *  width: '65px',
     *  items: [
     *      { text: 'Segoe UI', value: 'Segoe UI' },
     *      { text: 'Arial',  value: 'Arial,Helvetica,sans-serif' },
     *      { text: 'Courier New', value: 'Courier New,Courier,monospace' },
     *      { text: 'Georgia', value: 'Georgia,serif' },
     *      { text: 'Impact', value: 'Impact,Charcoal,sans-serif' },
     *      { text: 'Lucida Console', value: 'Lucida Console,Monaco,monospace' },
     *      { text: 'Tahoma', value: 'Tahoma,Geneva,sans-serif' },
     *      { text: 'Times New Roman', value: 'Times New Roman,Times,serif' },
     *      { text: 'Trebuchet MS', value: 'Trebuchet MS,Helvetica,sans-serif' },
     *      { text: 'Verdana', value: 'Verdana,Geneva,sans-serif' }
     *     ]
     * }
     */
    fontFamily: FontFamilyModel;
    /**
     * Predefine the font sizes that populate in font size dropdown list from the toolbar.

     * {
     *  default: '10',
     *  width: '35px',
     *  items: [
     *      { text: '8', value: '8pt' },
     *      { text: '10', value: '10pt' },
     *      { text: '12', value: '12pt' },
     *      { text: '14', value: '14pt' },
     *      { text: '18', value: '18pt' },
     *      { text: '24', value: '24pt' },
     *      { text: '36', value: '36pt' }
     *    ]
     * }
     */
    fontSize: FontSizeModel;
    /**
     * Predefine the color palette that can be rendered for font color toolbar command .

     * {
     *  columns: 10,
     *  colorCode: {
     *      'Custom': [
     *          '', '#000000', '#e7e6e6', '#44546a', '#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47', '#ff0000',
     *          '#f2f2f2', '#808080', '#cfcdcd', '#d5dce4', '#d9e2f3', '#fbe4d5', '#ededed', '#fff2cc', '#e2efd9', '#ffcccc',
     *          '#d9d9d9', '#595959', '#aeaaaa', '#acb9ca', '#b4c6e7', '#f7caac', '#dbdbdb', '#ffe599', '#c5e0b3', '#ff8080',
     *          '#bfbfbf', '#404040', '#747070', '#8496b0', '#8eaadb', '#f4b083', '#c9c9c9', '#ffd966', '#a8d08d', '#ff3333',
     *          '#a6a6a6', '#262626', '#3b3838', '#323e4f', '#2f5496', '#c45911', '#7b7b7b', '#bf8f00', '#538135', '#b30000',
     *          '#7f7f7f', '#0d0d0d', '#161616', '#212934', '#1f3763', '#823b0b', '#525252', '#7f5f00', '#375623', '#660000']
     *    }
     *  }
     */
    fontColor: FontColorModel;
    /**
     * Predefine the color palette that can be rendered for background color (text highlighted color) toolbar command.

     * {
     *  columns: 5,
     *  colorCode: {
     *          'Custom': ['#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#0000ff', '#ff0000',
     *              '#000080', '#008080', '#008000', '#800080', '#800000', '#808000',
     *              '#c0c0c0', '#000000', '']
     *   }
     * }
     */
    backgroundColor: BackgroundColorModel;
    /**
     * Accepts the template design and assigns it as RichTextEditor’s content.
     * The built-in template engine which provides options to compile template string into a executable function.
     * For EX: We have expression evolution as like ES6 expression string literals

     */
    valueTemplate: string;
    /**
     * Specifies the saveInterval in milliseconds for autosave the value.
     * The change event will be triggered if the content was changed from the last saved interval.

     */
    saveInterval: number;
    /**
     * Triggers before command execution using toolbar items or executeCommand method.
     * If you cancel this event, the command cannot be executed.
     * Set the cancel argument to true to cancel the command execution.
     * @event

     */
    actionBegin: EmitType<ActionBeginEventArgs>;
    /**
     * Triggers after command execution using toolbar items or executeCommand method.
     * @event

     */
    actionComplete: EmitType<ActionCompleteEventArgs>;
    /**
     * Event triggers when the dialog is being opened.
     * If you cancel this event, the dialog remains closed.
     * Set the cancel argument to true to cancel the open of a dialog.
     * @event


     */
    beforeDialogOpen: EmitType<BeforeOpenEventArgs>;
    /**
     * Event triggers when a dialog is opened.
     * @event


     */
    dialogOpen: EmitType<Object>;
    /**
     * Event triggers after the dialog has been closed.
     * @event


     */
    dialogClose: EmitType<Object>;
    /**
     * Event triggers when the quick toolbar is being opened.
     * @event

     */
    beforeQuickToolbarOpen: EmitType<BeforeQuickToolbarOpenArgs>;
    /**
     * Event triggers when a quick toolbar is opened.
     * @event


     */
    quickToolbarOpen: EmitType<Object>;
    /**
     * Event triggers after the quick toolbar has been closed.
     * @event


     */
    quickToolbarClose: EmitType<Object>;
    /**
     * Triggers when the undo and redo status is updated.
     * @event

     */
    private toolbarStatusUpdate;
    /**
     * Event triggers when the image is selected or dragged into the insert image dialog.
     * @event

     */
    imageSelected: EmitType<SelectedEventArgs>;
    /**
     * Event triggers when the selected image begins to upload in the insert image dialog.
     * @event

     */
    imageUploading: EmitType<UploadingEventArgs>;
    /**
     * Event triggers when the image is successfully uploaded to the server side.
     * @event


     */
    imageUploadSuccess: EmitType<Object>;
    /**
     * Event triggers when there is an error in the image upload.
     * @event


     */
    imageUploadFailed: EmitType<Object>;
    /**
     * Event triggers when the selected image is cleared from the insert image dialog.
     * @event

     */
    imageRemoving: EmitType<RemovingEventArgs>;
    /**
     * Triggers when the RichTextEditor is rendered.
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when the RichTextEditor is destroyed.
     * @event


     */
    destroyed: EmitType<Object>;
    /**
     * Event triggers before sanitize the value. It's only applicable to editorMode as `HTML`.
     * @event

     */
    beforeSanitizeHtml: EmitType<BeforeSanitizeHtmlArgs>;
    /**
     * Triggers when RichTextEditor is focused out.
     * @event

     */
    blur: EmitType<Object>;
    /**
     * Triggers when RichTextEditor Toolbar items is clicked.
     * @event


     */
    toolbarClick: EmitType<Object>;
    /**
     * Triggers when RichTextEditor is focused in
     * @event

     */
    focus: EmitType<Object>;
    /**
     * Triggers only when RichTextEditor is blurred and changes are done to the content.
     * @event

     */
    change: EmitType<ChangeEventArgs>;
    /**
     * Triggers only when resizing the image.
     * @event

     */
    resizing: EmitType<ResizeArgs>;
    /**
     * Triggers only when start resize the image.
     * @event

     */
    resizeStart: EmitType<ResizeArgs>;
    /**
     * Triggers only when stop resize the image.
     * @event

     */
    resizeStop: EmitType<ResizeArgs>;
    /**
     * Customize keyCode to change the key value.


     */
    formatter: IFormatter;
    keyboardModule: KeyboardEvents;
    localeObj: L10n;
    valueContainer: HTMLTextAreaElement;
    private originalElement;
    private clickPoints;
    private initialValue;
    constructor(options?: RichTextEditorModel, element?: string | HTMLElement);
    /**
     * To provide the array of modules needed for component rendering
     * @return {ModuleDeclaration[]}

     */
    requiredModules(): ModuleDeclaration[];
    private updateEnable;
    setEnable(): void;
    /**
     * For internal use only - Initialize the event handler;
     * @private
     */
    protected preRender(): void;
    private persistData;
    private setContainer;
    getPersistData(): string;
    /**
     * Focuses the RichTextEditor component
     * @public
     */
    focusIn(): void;
    /**
     * Blurs the RichTextEditor component
     * @public
     */
    focusOut(): void;
    /**
     * Selects all the content in RichTextEditor
     * @public
     */
    selectAll(): void;
    /**
     * Selects a content range or an element
     * @param {Range} range - Specify the range which you want to select within the content.
     * The method used to select a particular sentence or word or entire document.
     * @public
     */
    selectRange(range: Range): void;
    /**
     * Retrieves the HTML markup content from currently selected content of RichTextEditor.
     * @public
     */
    getSelection(): string;
    /**
     * Executes the commands
     * @param {CommandName} CommandName - Specifies the name of the command to be executed.
     * @param {string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs} value - Specifies the value that you want to execute.
     * @public
     */
    executeCommand(commandName: CommandName, value?: string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs): void;
    private htmlPurifier;
    private encode;
    /**
     * For internal use only - To Initialize the component rendering.
     * @private
     */
    protected render(): void;
    /**
     * For internal use only - Initialize the event handler
     * @private
     */
    protected eventInitializer(): void;
    /**
     * For internal use only - keydown the event handler;
     * @private
     */
    keyDown(e: KeyboardEvent): void;
    private keyUp;
    /**

     */
    serializeValue(value: string): string;
    /**
     * This method will clean up the HTML against cross-site scripting attack and return the HTML as string.
     * It's only applicable to editorMode as `HTML`.
     * @param {string} value - Specifies the value that you want to sanitize.
     * @return {string}
     */
    sanitizeHtml(value: string): string;
    updateValue(value?: string): void;
    private triggerEditArea;
    private notifyMouseUp;
    private mouseUp;
    /**

     */
    ensureModuleInjected(module: Function): boolean;
    /**

     */
    onCopy(): void;
    /**

     */
    onCut(): void;
    /**

     */
    onPaste(e?: KeyboardEvent | ClipboardEvent): void;
    /**

     */
    clipboardAction(action: string, event: MouseEvent | KeyboardEvent): void;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    private removeHtmlAttributes;
    private removeAttributes;
    private destroyDependentModules;
    /**
     * Returns the HTML or Text inside the RichTextEditor.
     * @return {Element}
     */
    getContent(): Element;
    /**
     * Returns the text content as string.
     * @return {string}
     */
    getText(): string;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * Called internally if any of the property value changed.

     */
    onPropertyChanged(newProp: RichTextEditorModel, oldProp: RichTextEditorModel): void;
    /**

     */
    updateValueData(): void;
    private removeSheets;
    private updatePanelValue;
    private setHeight;
    setPlaceHolder(): void;
    private setWidth;
    private setCssClass;
    private updateRTL;
    private updateReadOnly;
    setReadOnly(initial?: boolean): void;
    /**
     * By default, prints all the pages of the RichTextEditor.
     * @return {void}
     */
    print(): void;
    /**
     * Refresh the view of the editor.
     * @public
     */
    refreshUI(): void;
    /**
     * Shows the RichTextEditor component in full-screen mode.
     */
    showFullScreen(): void;
    /**
     * Enables the give toolbar items in the RichTextEditor component.
     * @param {boolean} muteToolbarUpdate enable/disables the toolbar item status in RichTextEditor.
     * @param {string | string[]} items - Specifies the single or collection of items
     * that you want to be enable in Rich Text Editor’s Toolbar.
     * @public
     */
    enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    /**
     * Disables the given toolbar items in the RichTextEditor component.
     * @param {boolean} muteToolbarUpdate enable/disables the toolbar item status in RichTextEditor.
     * @param {string | string[]} items - Specifies the single or collection of items
     * that you want to be disable in Rich Text Editor’s Toolbar.
     * @public
     */
    disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void;
    /**
     * Removes the give toolbar items from the RichTextEditor component.
     * @param {string | string[]} items - Specifies the single or collection of items
     * that you want to be remove from Rich Text Editor’s Toolbar.
     * @public
     */
    removeToolbarItem(items: string | string[]): void;
    /**
     * Get the selected range from the RichTextEditor's content.
     * @public

     */
    getRange(): Range;
    private initializeServices;
    private RTERender;
    private setIframeSettings;
    private InjectSheet;
    private createScriptElement;
    private createStyleElement;
    private isBlazor;
    private setValue;
    setContentHeight(target?: string, isExpand?: boolean): void;
    /**
     * Retrieves the HTML from RichTextEditor.
     * @public
     */
    getHtml(): string;
    /**
     * Shows the source HTML/MD markup.
     * @public
     */
    showSourceCode(): void;
    /**
     * Returns the maximum number of characters in the Rich Text Editor.
     * @public
     */
    getCharCount(): number;
    /**

     */
    getBaseToolbarObject(): BaseToolbar;
    /**

     */
    getToolbar(): HTMLElement;
    /**

     */
    getToolbarElement(): Element;
    getID(): string;
    private mouseDownHandler;
    private preventImgResize;
    preventDefaultResize(e: FocusEvent | MouseEvent): void;
    private defaultResize;
    private resizeHandler;
    private scrollHandler;
    private contentScrollHandler;
    private focusHandler;
    private getUpdatedValue;
    private updateIntervalValue;
    private onDocumentClick;
    private blurHandler;
    invokeChangeEvent(): void;
    /**

     */
    wireScrollElementsEvents(): void;
    private wireContextEvent;
    private unWireContextEvent;
    /**

     */
    unWireScrollElementsEvents(): void;
    private touchHandler;
    private contextHandler;
    private resetHandler;
    /**

     */
    autoResize(): void;
    private setAutoHeight;
    private wireEvents;
    private restrict;
    private bindEvents;
    private onIframeMouseDown;
    private editorKeyDown;
    private unWireEvents;
    private unbindEvents;
}
