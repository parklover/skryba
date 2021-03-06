import { ActionBeginEventArgs } from './../base/interface';
import { IRichTextEditor, IEditorModel, IItemCollectionArgs } from './../base/interface';
import { IHtmlFormatterCallBack, IMarkdownFormatterCallBack, IUndoCallBack } from './../../common/interface';
import { MarkdownUndoRedoData } from '../../markdown-parser/base/interface';
import { IHtmlUndoRedoData } from '../../editor-manager/base/interface';
/**
 * Formatter

 */
export declare class Formatter {
    editorManager: IEditorModel;
    /**
     * To execute the command
     * @param  {IRichTextEditor} self
     * @param  {ActionBeginEventArgs} args
     * @param  {MouseEvent|KeyboardEvent} event
     * @param  {IItemCollectionArgs} value
     */
    process(self: IRichTextEditor, args: ActionBeginEventArgs, event: MouseEvent | KeyboardEvent, value: IItemCollectionArgs): void;
    private getAncestorNode;
    onKeyHandler(self: IRichTextEditor, e: KeyboardEvent): void;
    onSuccess(self: IRichTextEditor, events: IMarkdownFormatterCallBack | IHtmlFormatterCallBack): void;
    /**
     * Save the data for undo and redo action.
     */
    saveData(e?: KeyboardEvent | MouseEvent | IUndoCallBack): void;
    getUndoStatus(): {
        [key: string]: boolean;
    };
    getUndoRedoStack(): IHtmlUndoRedoData[] | MarkdownUndoRedoData[];
    enableUndo(self: IRichTextEditor): void;
}
