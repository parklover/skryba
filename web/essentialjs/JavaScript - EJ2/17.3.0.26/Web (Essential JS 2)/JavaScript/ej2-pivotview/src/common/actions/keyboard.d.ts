import { PivotCommon } from '../base/pivot-common';
/**
 * Keyboard interaction
 */
export declare class CommonKeyboardInteraction {
    private parent;
    private keyConfigs;
    private keyboardModule;
    /**
     * Constructor
     */
    constructor(parent: PivotCommon);
    private keyActionHandler;
    private processOpenContextMenu;
    private processSort;
    private processFilter;
    private processDelete;
    /**
     * To destroy the keyboard module.
     * @return {void}
     * @private
     */
    destroy(): void;
}
