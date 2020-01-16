import { IRichTextEditor } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * PasteCleanup module called when pasting content in RichTextEditor
 */
export declare class PasteCleanup {
    private parent;
    private renderFactory;
    private locator;
    private contentRenderer;
    private i10n;
    private saveSelection;
    private nodeSelectionObj;
    private dialogRenderObj;
    private popupObj;
    private uploadObj;
    private sanitize;
    private inlineNode;
    private blockNode;
    constructor(parent?: IRichTextEditor, serviceLocator?: ServiceLocator);
    private addEventListener;
    private destroy;
    private removeEventListener;
    private pasteClean;
    private imgUploading;
    private uploadMethod;
    private popupClose;
    private refreshPopup;
    private base64ToFile;
    /**
     * Method for image formatting when pasting
  
     */
    private imageFormatting;
    private radioRender;
    private selectFormatting;
    private pasteDialog;
    private destroyDialog;
    private formatting;
    private sanitizeHelper;
    private plainFormatting;
    private getTextContent;
    private detachInlineElements;
    private findDetachEmptyElem;
    private removeEmptyElements;
    private tagGrouping;
    private attributesfilter;
    private deniedTags;
    private deniedAttributes;
    private allowedStyle;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
