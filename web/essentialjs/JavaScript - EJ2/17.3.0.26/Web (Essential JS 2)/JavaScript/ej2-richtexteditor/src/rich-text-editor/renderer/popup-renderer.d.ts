import { IRenderer, IRichTextEditor } from '../base/interface';
import { BaseQuickToolbar } from '../actions/base-quick-toolbar';
/**
 * `Popup renderer` module is used to render popup in RichTextEditor.

 */
export declare class PopupRenderer implements IRenderer {
    private popupObj;
    private popupPanel;
    protected parent: IRichTextEditor;
    /**
     * Constructor for popup renderer module
     */
    constructor(parent?: IRichTextEditor);
    private quickToolbarOpen;
    renderPopup(args: BaseQuickToolbar): void;
    /**
     * The function is used to add popup class in Quick Toolbar
     */
    renderPanel(): void;
    /**
     * Get the popup element of RichTextEditor
     * @return {Element}
     */
    getPanel(): Element;
    /**
     * Set the popup element of RichTextEditor
     * @param  {Element} panel
     */
    setPanel(panel: Element): void;
}
