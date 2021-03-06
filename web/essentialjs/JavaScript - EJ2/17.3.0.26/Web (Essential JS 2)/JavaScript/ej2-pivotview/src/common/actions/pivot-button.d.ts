import { PivotView } from '../../pivotview/base/pivotview';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import { IAction } from '../../common/base/interface';
import { AggregateMenu } from '../popups/aggregate-menu';
import { AxisFieldRenderer } from '../../pivotfieldlist/renderer/axis-field-renderer';
/**
 * Module to render Pivot button
 */
export declare class PivotButton implements IAction {
    parent: PivotView | PivotFieldList;
    private parentElement;
    private dialogPopUp;
    private memberTreeView;
    private draggable;
    private handlers;
    menuOption: AggregateMenu;
    axisField: AxisFieldRenderer;
    private fieldName;
    private valueFiedDropDownList;
    private index;
    /** Constructor for render module */
    constructor(parent: PivotView | PivotFieldList);
    private renderPivotButton;
    private createButtonText;
    private getTypeStatus;
    private createSummaryType;
    private createMenuOption;
    private createDraggable;
    private createButtonDragIcon;
    private createSortOption;
    private createFilterOption;
    private updateButtontext;
    private updateOlapButtonText;
    private createDragClone;
    private onDragStart;
    private onDragging;
    private onDragStop;
    private isButtonDropped;
    private updateSorting;
    updateDataSource(isRefreshGrid?: boolean): void;
    private updateFiltering;
    private bindDialogEvents;
    private buttonModel;
    private tabSelect;
    private updateDialogButtonEvents;
    private updateCustomFilter;
    private ClearFilter;
    private removeButton;
    private nodeStateModified;
    private checkedStateAll;
    private updateNodeStates;
    private updateFilterState;
    private refreshPivotButtonState;
    private removeDataSourceSettings;
    private updateDropIndicator;
    private wireEvent;
    private unWireEvent;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * To destroy the pivot button event listener
     * @return {void}

     */
    destroy(): void;
}
