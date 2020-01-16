import { PivotCommon } from '../base/pivot-common';
import { ISort, IFilter, IFormatSettings, IFieldOptions } from '../../base/engine';
import { MaskChangeEventArgs } from '@syncfusion/ej2-inputs';
import { TreeView } from '@syncfusion/ej2-navigations';
import { IOlapField } from '../../base/olap/engine';
/**
 * `EventBase` for active fields action.
 */
export declare class EventBase {
    parent: PivotCommon;
    /**
     * Constructor for the dialog action.

     */
    constructor(parent?: PivotCommon);
    /**
     * Updates sorting order for the selected field.
     * @method updateSorting
     * @param  {Event} args - Contains clicked element information to update dataSource.
     * @return {void}

     */
    updateSorting(args: Event): void;
    /**
     * Updates sorting order for the selected field.
     * @method updateFiltering
     * @param  {Event} args - Contains clicked element information to update dataSource.
     * @return {void}

     */
    updateFiltering(args: Event): void;
    /**
     * Returns boolean by checing the valid filter members from the selected filter settings.
     * @method isValidFilterItemsAvail
     * @param  {string} fieldName - Gets filter members for the given field name.
     * @return {boolean}

     */
    isValidFilterItemsAvail(fieldName: string, filterObj: IFilter): boolean;
    private getOlapData;
    /**
     * Gets sorted filter members for the selected field.
     * @method sortFilterData
     * @param  {{ [key: string]: Object }[]} treeData - Gets filter members for the given field name.
     * @return {{ [key: string]: Object }[]}

     */
    sortOlapFilterData(treeData: {
        [key: string]: Object;
    }[], order: string): {
        [key: string]: Object;
    }[];
    /**
     * Gets sort object for the given field name from the dataSource.
     * @method getSortItemByName
     * @param  {string} fieldName - Gets sort settings for the given field name.
     * @return {ISort}

     */
    getSortItemByName(fieldName: string): ISort;
    /**
     * Gets filter object for the given field name from the dataSource.
     * @method getFilterItemByName
     * @param  {string} fieldName - Gets filter settings for the given field name.
     * @return {IFilter}

     */
    getFilterItemByName(fieldName: string): IFilter;
    /**
     * Gets filter object for the given field name from the dataSource.
     * @method getFieldByName
     * @param  {string} fieldName - Gets filter settings for the given field name.
     * @return {Sort}

     */
    getFieldByName(fieldName: string, fields: IFieldOptions[]): IFieldOptions;
    /**
     * Gets format object for the given field name from the dataSource.
     * @method getFilterItemByName
     * @param  {string} fieldName - Gets format settings for the given field name.
     * @return {IFormatSettings}

     */
    getFormatItemByName(fieldName: string): IFormatSettings;
    private getParentIDs;
    private getChildIDs;
    /**
     * show tree nodes using search text.

     */
    searchTreeNodes(args: MaskChangeEventArgs, treeObj: TreeView, isFieldCollection: boolean, isHierarchy?: boolean): void;
    private updateOlapSearchTree;
    private getTreeData;
    private getOlapTreeData;
    private getOlapSearchTreeData;
    updateChildNodeStates(members: IOlapField[], fieldName: string, node: string, state: boolean): void;
    /**
     * get the parent node of particular filter members.

     */
    getParentNode(fieldName: string, item: string, filterObj: {
        [key: string]: string;
    }): {
        [key: string]: string;
    };
    private getFilteredTreeNodes;
}
