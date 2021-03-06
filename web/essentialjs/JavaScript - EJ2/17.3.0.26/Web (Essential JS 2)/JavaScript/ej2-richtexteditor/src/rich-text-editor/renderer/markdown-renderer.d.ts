import { IRenderer, IRichTextEditor } from '../base/interface';
/**
 * Markdown module is used to render RichTextEditor as Markdown editor content

 */
export declare class MarkdownRender implements IRenderer {
    private contentPanel;
    protected parent: IRichTextEditor;
    protected editableElement: Element;
    /**
     * Constructor for content renderer module
     */
    constructor(parent?: IRichTextEditor);
    /**
     * The function is used to render RichTextEditor content div
     */
    renderPanel(): void;
    /**
     * Get the content div element of RichTextEditor
     * @return {Element}
     */
    getPanel(): Element;
    /**
     * Get the editable element of RichTextEditor
     * @return {Element}
     */
    getEditPanel(): Element;
    /**
     * Returns the text content as string.
     * @return {string}
     */
    getText(): string;
    /**
     * Set the content div element of RichTextEditor
     * @param  {Element} panel
     */
    setPanel(panel: Element): void;
    /**
     * Get the document of RichTextEditor
     * @param  {Document}
     */
    getDocument(): Document;
}
