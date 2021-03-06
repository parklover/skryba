import { Toolbar as EJ2Toolbar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DocumentEditorContainer } from '../document-editor-container';
import { DocumentEditor } from '../../document-editor/document-editor';
import { XmlHttpRequestHandler } from '../../document-editor/base/ajax-helper';
/**
 * Toolbar Module
 */
export declare class Toolbar {
    /**
     * @private
     */
    toolbar: EJ2Toolbar;
    /**
     * @private
     */
    container: DocumentEditorContainer;
    /**
     * @private
     */
    filePicker: HTMLInputElement;
    /**
     * @private
     */
    imagePicker: HTMLInputElement;
    /**
     * @private
     */
    propertiesPaneButton: Button;
    /**
     * @private
     */
    importHandler: XmlHttpRequestHandler;
    private restrictDropDwn;
    private imgDropDwn;
    private breakDropDwn;
    /**
     * @private
     */
    readonly documentEditor: DocumentEditor;
    /**
     * @private
     */
    constructor(container: DocumentEditorContainer);
    private getModuleName;
    /**
     * @private
     */
    initToolBar(): void;
    private renderToolBar;
    private showHidePropertiesPane;
    private onWrapText;
    private wireEvent;
    private initToolbarItems;
    private clickHandler;
    private toggleLocalPaste;
    private toggleEditing;
    private toggleButton;
    private togglePropertiesPane;
    private onDropDownButtonSelect;
    private onFileChange;
    private convertToSfdt;
    private failureHandler;
    private successHandler;
    private onImageChange;
    private insertImage;
    /**
     * @private
     */
    enableDisableToolBarItem(enable: boolean, isProtectedContent: boolean): void;
    /**
     * @private
     */
    enableDisableUndoRedo(): void;
    private onToc;
    /**
     * @private
     */
    enableDisablePropertyPaneButton(isShow: boolean): void;
    /**
     * @private
     */
    destroy(): void;
}
