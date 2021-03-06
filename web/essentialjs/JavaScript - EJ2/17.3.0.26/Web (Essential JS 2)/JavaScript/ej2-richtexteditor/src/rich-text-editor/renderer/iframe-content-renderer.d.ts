import { ContentRender } from '../renderer/content-renderer';
/**
 * Content module is used to render RichTextEditor content

 */
export declare class IframeContentRender extends ContentRender {
    /**
     * The function is used to render RichTextEditor iframe
     */
    renderPanel(): void;
    private setThemeColor;
    /**
     * Get the editable element of RichTextEditor
     * @return {Element}
     */
    getEditPanel(): Element;
    /**
     * Get the document of RichTextEditor
     * @param  {Document}
     */
    getDocument(): Document;
}
