import { IRichTextEditor, NotifyArgs } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * Content module is used to render RichTextEditor content

 */
export declare class Render {
    private parent;
    private locator;
    private contentRenderer;
    private renderer;
    /**
     * Constructor for render module
     */
    constructor(parent?: IRichTextEditor, locator?: ServiceLocator);
    /**
     * To initialize RichTextEditor header, content and footer rendering
     */
    render(): void;
    /**
     * Refresh the entire RichTextEditor.
     * @return {void}
     */
    refresh(e?: NotifyArgs): void;
    /**
     * Destroy the entire RichTextEditor.
     * @return {void}
     */
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private keyUp;
}
