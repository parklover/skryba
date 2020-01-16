import { TreeGrid } from '../base/treegrid';
/**
 * TreeGrid RowDragAndDrop module

 */
export declare class RowDD {
    private parent;
    private dropPosition;
    private draggedRecord;
    private droppedRecord;
    private treeGridData;
    private treeData;
    private canDrop;
    private isDraggedWithChild;
    isMultipleGrid: string;
    isaddtoBottom: boolean;
    /**
     *
     * Constructor for render module
     */
    constructor(parent?: TreeGrid);
    private getChildrecordsByParentID;
    /**

     */
    private addEventListener;
    /**
     * Reorder the rows based on given indexes and position
     */
    reorderRows(fromIndexes: number[], toIndex: number, position: string): void;
    private rowsAdded;
    private rowsRemoved;
    private refreshGridDataSource;
    private removeFirstrowBorder;
    private removeLastrowBorder;
    private updateIcon;
    private removeChildBorder;
    private addFirstrowBorder;
    private addLastRowborder;
    private getScrollWidth;
    private addErrorElem;
    private removeErrorElem;
    private topOrBottomBorder;
    private removetopOrBottomBorder;
    private addRemoveClasses;
    private getOffset;
    private Rowdraging;
    private rowDropped;
    private dragDropGrid;
    private getTargetIdx;
    private getParentData;
    private dropRows;
    private dropMiddle;
    private dropAtTop;
    private recordLevel;
    private deleteDragRow;
    private updateChildRecord;
    private updateChildRecordLevel;
    private removeRecords;
    private removeChildItem;
    private getChildCount;
    private ensuredropPosition;
    destroy(): void;
    /**

     */
    removeEventListener(): void;
    /**
     * hidden
     */
    /**
     * For internal use only - Get the module name.
     * @private
     */
    private getModuleName;
}
