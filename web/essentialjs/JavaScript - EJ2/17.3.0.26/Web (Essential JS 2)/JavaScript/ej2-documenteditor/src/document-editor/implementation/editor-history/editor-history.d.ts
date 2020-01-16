import { Dictionary } from '../../base/dictionary';
import { WList } from '../list/list';
import { WAbstractList } from '../list/abstract-list';
import { Selection } from '../index';
import { DocumentEditor } from '../../document-editor';
import { Action } from '../../index';
import { BaseHistoryInfo } from './base-history-info';
import { ModifiedParagraphFormat, ModifiedLevel } from './history-helper';
import { HistoryInfo } from './history-info';
import { Point } from '../editor/editor-helper';
import { TableResizer } from '../editor/table-resizer';
/**
 *  `EditorHistory` Module class is used to handle history preservation
 */
export declare class EditorHistory {
    private undoLimitIn;
    private redoLimitIn;
    private undoStackIn;
    private redoStackIn;
    private historyInfoStack;
    private owner;
    /**
     * @private
     */
    isUndoing: boolean;
    /**
     * @private
     */
    isRedoing: boolean;
    /**
     * @private
     */
    currentBaseHistoryInfo: BaseHistoryInfo;
    /**
     * @private
     */
    currentHistoryInfo: HistoryInfo;
    /**
     * @private
     */
    modifiedParaFormats: Dictionary<BaseHistoryInfo, ModifiedParagraphFormat[]>;
    private viewer;
    /**
     * gets undo stack
     * @private
     */
    readonly undoStack: BaseHistoryInfo[];
    /**
     * gets redo stack
     * @private
     */
    readonly redoStack: BaseHistoryInfo[];
    /**
     * Gets or Sets the limit of undo operations can be done.


     */
    /**
    * Sets the limit of undo operations can be done.
    
    
    */
    undoLimit: number;
    /**
     * Gets or Sets the limit of redo operations can be done.


     */
    /**
    * Gets or Sets the limit of redo operations can be done.
    
    
    */
    redoLimit: number;
    /**
     * @private
     */
    constructor(node: DocumentEditor);
    /**
     * @private
     */
    getModuleName(): string;
    /**
     * Determines whether undo operation can be done.
     * @returns boolean
     */
    canUndo(): boolean;
    /**
     * Determines whether redo operation can be done.
     * @returns boolean
     */
    canRedo(): boolean;
    /**
     * initialize EditorHistory
     * @param  {Selection} selection
     * @param  {Action} action
     * @param  {SelectionRange} selectionRange
     * @private
     */
    initializeHistory(action: Action): void;
    /**
     * Initialize complex history
     * @param  {Selection} selection
     * @param  {Action} action
     * @private
     */
    initComplexHistory(selection: Selection, action: Action): void;
    /**
     * @private
     */
    initResizingHistory(startingPoint: Point, tableResize: TableResizer): void;
    /**
     * Update resizing history
     * @param  {Point} point
     * @param  {Selection} selection
     * @private
     */
    updateResizingHistory(point: Point, tableResize: TableResizer): void;
    /**
     * Record the changes
     * @param  {BaseHistoryInfo} baseHistoryInfo
     * @private
     */
    recordChanges(baseHistoryInfo: BaseHistoryInfo): void;
    /**
     * update EditorHistory
     * @private
     */
    updateHistory(): void;
    /**
     * @private
     */
    isHandledComplexHistory(): boolean;
    /**
     * Update complex history
     * @private
     */
    updateComplexHistory(): void;
    /**
     * @private
     */
    updateComplexHistoryInternal(): void;
    /**
     * update list changes for history preservation
     * @param  {Selection} selection
     * @param  {WAbstractList} currentAbstractList
     * @param  {WList} list
     * @private
     */
    updateListChangesInHistory(currentAbstractList: WAbstractList, list: WList): Dictionary<number, ModifiedLevel>;
    /**
     * Apply list changes
     * @param  {Selection} selection
     * @param  {Dictionary<number, ModifiedLevel>} modifiedLevelsInternal
     * @private
     */
    applyListChanges(selection: Selection, modifiedLevelsInternal: Dictionary<number, ModifiedLevel>): void;
    /**
     * Update list changes
     * @param  {Dictionary<number, ModifiedLevel>} modifiedCollection
     * @param  {Selection} selection
     * @private
     */
    updateListChanges(modifiedCollection: Dictionary<number, ModifiedLevel>): void;
    /**
     * Revert list changes
     * @param  {Selection} selection
     */
    private revertListChanges;
    /**
     * Reverts the last editing action.
     */
    undo(): void;
    /**
     * Performs the last reverted action.
     */
    redo(): void;
    /**
     * @private
     */
    destroy(): void;
    private clearHistory;
    private clearUndoStack;
    private clearRedoStack;
}
