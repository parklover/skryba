import { PivotView } from '../../pivotview/base/pivotview';
import { IAction } from '../../common/base/interface';
/**
 * Module for Field List rendering
 */
export declare class FieldList implements IAction {
    /**
     * Module declarations
     */
    private parent;
    private element;
    private handlers;
    private timeOutObj;
    /** Constructor for Field List module */
    constructor(parent: PivotView);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private initiateModule;
    private updateControl;
    private update;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * To destroy the Field List
     * @return {void}

     */
    destroy(): void;
}
