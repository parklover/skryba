import { MouseEventArgs } from '@syncfusion/ej2-base';
import { PivotView } from '../../pivotview/base/pivotview';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
/**
 * `AggregateMenu` module to create aggregate type popup.
 */
export declare class AggregateMenu {
    parent: PivotView | PivotFieldList;
    private menuInfo;
    private parentElement;
    private currentMenu;
    private valueDialog;
    /**
     * Constructor for the rener action.

     */
    constructor(parent?: PivotView | PivotFieldList);
    /**
     * Initialize the pivot table rendering
     * @returns void
     * @private
     */
    render(args: MouseEventArgs, parentElement: HTMLElement): void;
    private openContextMenu;
    private createContextMenu;
    private beforeMenuOpen;
    createValueSettingsDialog(target: HTMLElement, parentElement: HTMLElement): void;
    private createFieldOptions;
    private selectOptionInContextMenu;
    private updateDataSource;
    private updateValueSettings;
    private removeDialog;
    /**
     * To destroy the pivot button event listener
     * @return {void}

     */
    destroy(): void;
}
