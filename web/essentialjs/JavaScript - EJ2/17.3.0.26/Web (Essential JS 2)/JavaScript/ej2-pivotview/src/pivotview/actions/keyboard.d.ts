import { PivotView } from '../base/pivotview';
/**
 * PivotView Keyboard interaction
 */
export declare class KeyboardInteraction {
    private parent;
    private keyConfigs;
    private pivotViewKeyboardModule;
    /**
     * Constructor
     */
    constructor(parent: PivotView);
    private keyActionHandler;
    private getNextButton;
    private processTab;
    private processEnter;
    private clearSelection;
    private processSelection;
    private getParentElement;
    /**
     * To destroy the keyboard module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
