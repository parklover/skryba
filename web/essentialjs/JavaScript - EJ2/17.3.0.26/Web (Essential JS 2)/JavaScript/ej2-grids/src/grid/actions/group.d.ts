import { GroupSettingsModel } from '../base/grid-model';
import { ServiceLocator } from '../services/service-locator';
import { IGrid, IAction, NotifyArgs } from '../base/interface';
/**
 *
 * The `Group` module is used to handle group action.
 */
export declare class Group implements IAction {
    private groupSettings;
    private element;
    private colName;
    private column;
    private isAppliedGroup;
    private isAppliedUnGroup;
    private groupGenerator;
    private visualElement;
    private helper;
    private dragStart;
    private drag;
    private dragStop;
    private drop;
    private parent;
    private serviceLocator;
    private contentRefresh;
    private sortedColumns;
    private l10n;
    private aria;
    private focus;
    /**
     * Constructor for Grid group module

     */
    constructor(parent?: IGrid, groupSettings?: GroupSettingsModel, sortedColumns?: string[], serviceLocator?: ServiceLocator);
    private columnDrag;
    private columnDragStart;
    private columnDrop;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    private initialEnd;
    private keyPressHandler;
    private clickHandler;
    private unGroupFromTarget;
    private toogleGroupFromHeader;
    private applySortFromTarget;
    /**
     * Expands or collapses grouped rows by target element.
     * @param  {Element} target - Defines the target element of the grouped row.
     * @return {void}
     */
    expandCollapseRows(target: Element): void;
    private updateVirtualRows;
    private expandCollapse;
    /**
     * Expands all the grouped rows of the Grid.
     * @return {void}
     */
    expandAll(): void;
    /**
     * Collapses all the grouped rows of the Grid.
     * @return {void}
     */
    collapseAll(): void;
    /**
     * The function is used to render grouping
     * @return {Element}

     */
    render(): void;
    private renderGroupDropArea;
    private updateGroupDropArea;
    private initDragAndDrop;
    private initializeGHeaderDrag;
    private initializeGHeaderDrop;
    /**
     * Groups a column by column name.
     * @param  {string} columnName - Defines the column name to group.
     * @return {void}
     */
    groupColumn(columnName: string): void;
    /**
     * Ungroups a column by column name.
     * @param  {string} columnName - Defines the column name to ungroup.
     * @return {void}
     */
    ungroupColumn(columnName: string): void;
    /**
     * The function used to update groupSettings
     * @return {void}

     */
    updateModel(): void;
    /**
     * The function used to trigger onActionComplete
     * @return {void}

     */
    onActionComplete(e: NotifyArgs): void;
    private groupAddSortingQuery;
    private addColToGroupDrop;
    private refreshToggleBtn;
    private removeColFromGroupDrop;
    private onPropertyChanged;
    private updateGroupedColumn;
    private updateButtonVisibility;
    private enableAfterRender;
    /**
     * To destroy the reorder
     * @return {void}

     */
    destroy(): void;
    /**
     * Clears all the grouped columns of the Grid.
     * @return {void}
     */
    clearGrouping(): void;
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    private refreshSortIcons;
    private getGHeaderCell;
    private onGroupAggregates;
    private iterateGroupAggregates;
}
