import { TreeGrid } from '../base/treegrid';
/**
 * TreeGrid Filter module will handle filtering action

 */
export declare class Filter {
    private parent;
    filteredResult: Object[];
    private flatFilteredData;
    private filteredParentRecs;
    private isHierarchyFilter;
    /**
     * Constructor for Filter module
     */
    constructor(parent?: TreeGrid);
    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string;
    /**
     * To destroy the Filter module
     * @return {void}

     */
    destroy(): void;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * Function to update filtered records

     */
    private updatedFilteredRecord;
    private updateParentFilteredRecord;
    private addParentRecord;
    private checkChildExsist;
    private updateFilterLevel;
    private clearFilterLevel;
}
