import { RenderType } from '../base/enum';
import { IRichTextEditor, IToolbarItems } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
import { BaseQuickToolbar } from './base-quick-toolbar';
import { BaseToolbar } from './base-toolbar';
import { RichTextEditorModel } from '../base/rich-text-editor-model';
/**
 * `Quick toolbar` module is used to handle Quick toolbar actions.
 */
export declare class QuickToolbar {
    private offsetX;
    private offsetY;
    private deBouncer;
    private target;
    private locator;
    private parent;
    private contentRenderer;
    linkQTBar: BaseQuickToolbar;
    textQTBar: BaseQuickToolbar;
    imageQTBar: BaseQuickToolbar;
    tableQTBar: BaseQuickToolbar;
    inlineQTBar: BaseQuickToolbar;
    private renderFactory;
    constructor(parent?: IRichTextEditor, locator?: ServiceLocator);
    private formatItems;
    private getQTBarOptions;
    createQTBar(popupType: string, mode: string, items: (string | IToolbarItems)[], type: RenderType): BaseQuickToolbar;
    private initializeQuickToolbars;
    private onMouseDown;
    private renderQuickToolbars;
    private renderInlineQuickToolbar;
    private showInlineQTBar;
    private hideInlineQTBar;
    /**
     * Method for hidding the quick toolbar

     */
    hideQuickToolbars(): void;
    private deBounce;
    private mouseUpHandler;
    private keyDownHandler;
    private inlineQTBarMouseDownHandler;
    private keyUpHandler;
    private selectionChangeHandler;
    private onSelectionChange;
    getInlineBaseToolbar(): BaseToolbar;
    /**
     * Destroys the ToolBar.
     * @method destroy
     * @return {void}

     */
    destroy(): void;
    private wireInlineQTBarEvents;
    private unWireInlineQTBarEvents;
    private toolbarUpdated;
    addEventListener(): void;
    private onKeyDown;
    private onIframeMouseDown;
    private setRtl;
    removeEventListener(): void;
    /**
     * Called internally if any of the property value changed.

     */
    protected onPropertyChanged(e: {
        [key: string]: RichTextEditorModel;
    }): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
