import { extend, isNullOrUndefined, Browser, isBlazor } from '@syncfusion/ej2-base';
import * as CONSTANT from '../base/constant';
import { updateUndoRedoStatus, isIDevice } from '../base/util';
import { KEY_DOWN, KEY_UP } from './../../common/constant';
/**
 * Formatter

 */
var Formatter = /** @class */ (function () {
    function Formatter() {
    }
    /**
     * To execute the command
     * @param  {IRichTextEditor} self
     * @param  {ActionBeginEventArgs} args
     * @param  {MouseEvent|KeyboardEvent} event
     * @param  {IItemCollectionArgs} value
     */
    Formatter.prototype.process = function (self, args, event, value) {
        var _this = this;
        var selection = self.contentModule.getDocument().getSelection();
        var range = (selection.rangeCount > 0) ? selection.getRangeAt(selection.rangeCount - 1) : null;
        var saveSelection;
        if (self.editorMode === 'HTML') {
            saveSelection = this.editorManager.nodeSelection.save(range, self.contentModule.getDocument());
        }
        if (!isNullOrUndefined(args)
            && args.item.command
            && args.item.command !== 'Table'
            && args.item.command !== 'Actions'
            && args.item.command !== 'Links'
            && args.item.command !== 'Images'
            && range
            && !(self.contentModule.getEditPanel().contains(this.getAncestorNode(range.commonAncestorContainer))
                || self.contentModule.getEditPanel() === range.commonAncestorContainer
                || self.contentModule.getPanel() === range.commonAncestorContainer)) {
            return;
        }
        if (isNullOrUndefined(args)) {
            var action_1 = event.action;
            if (action_1 !== 'tab' && action_1 !== 'enter' && action_1 !== 'space' && action_1 !== 'escape') {
                args = {};
                if (self.editorMode === 'Markdown' && action_1 === 'insert-table') {
                    value = {
                        'headingText': self.localeObj.getConstant('TableHeadingText'),
                        'colText': self.localeObj.getConstant('TableColText')
                    };
                }
                var items = {
                    originalEvent: event, cancel: false,
                    requestType: action_1 || (event.key + 'Key'),
                    itemCollection: value
                };
                extend(args, args, items, true);
                if (isBlazor()) {
                    delete args.item;
                    delete args.itemCollection;
                }
                self.trigger(CONSTANT.actionBegin, args, function (actionBeginArgs) {
                    if (actionBeginArgs.cancel) {
                        if (action_1 === 'paste' || action_1 === 'cut' || action_1 === 'copy') {
                            event.preventDefault();
                        }
                    }
                });
            }
            if ((event.which === 9 && self.tableModule ? self.tableModule.ensureInsideTableList : false) || event.which !== 9) {
                this.editorManager.observer.notify((event.type === 'keydown' ? KEY_DOWN : KEY_UP), {
                    event: event,
                    callBack: this.onSuccess.bind(this, self),
                    value: value
                });
            }
        }
        else if (!isNullOrUndefined(args) && args.item.command && args.item.subCommand && ((args.item.command !== args.item.subCommand
            && args.item.command !== 'Font')
            || ((args.item.subCommand === 'FontName' || args.item.subCommand === 'FontSize') && args.name === 'dropDownSelect')
            || ((args.item.subCommand === 'BackgroundColor' || args.item.subCommand === 'FontColor')
                && args.name === 'colorPickerChanged'))) {
            extend(args, args, { requestType: args.item.subCommand, cancel: false, itemCollection: value }, true);
            self.trigger(CONSTANT.actionBegin, args, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    if (_this.getUndoRedoStack().length === 0 && actionBeginArgs.item.command !== 'Links'
                        && actionBeginArgs.item.command !== 'Images') {
                        _this.saveData();
                    }
                    self.isBlur = false;
                    self.contentModule.getEditPanel().focus();
                    if (self.editorMode === 'HTML') {
                        saveSelection.restore();
                    }
                    var command = actionBeginArgs.item.subCommand.toLocaleLowerCase();
                    if (command === 'paste' || command === 'cut' || command === 'copy') {
                        self.clipboardAction(command, event);
                    }
                    else {
                        _this.editorManager.observer.notify(CONSTANT.checkUndo, { subCommand: actionBeginArgs.item.subCommand });
                        _this.editorManager.execCommand(actionBeginArgs.item.command, actionBeginArgs.item.subCommand, event, _this.onSuccess.bind(_this, self), actionBeginArgs.item.value, value, ('#' + self.getID() + ' iframe'));
                    }
                }
            });
        }
        if (isNullOrUndefined(event) || event && event.action !== 'copy') {
            this.enableUndo(self);
        }
    };
    Formatter.prototype.getAncestorNode = function (node) {
        node = node.nodeType === 3 ? node.parentNode : node;
        return node;
    };
    Formatter.prototype.onKeyHandler = function (self, e) {
        var _this = this;
        this.editorManager.observer.notify(KEY_UP, {
            event: e, callBack: function () {
                _this.enableUndo(self);
            }
        });
    };
    Formatter.prototype.onSuccess = function (self, events) {
        if (isNullOrUndefined(events.event) || (events && events.event.action !== 'copy')) {
            this.enableUndo(self);
            self.notify(CONSTANT.execCommandCallBack, events);
        }
        if (isBlazor()) {
            delete events.elements;
        }
        self.trigger(CONSTANT.actionComplete, events, function (callbackArgs) {
            self.setPlaceHolder();
            if (callbackArgs.requestType === 'Images' || callbackArgs.requestType === 'Links' && self.editorMode === 'HTML') {
                var args = callbackArgs;
                if (callbackArgs.requestType === 'Links' && callbackArgs.event &&
                    callbackArgs.event.type === 'keydown' &&
                    callbackArgs.event.keyCode === 32) {
                    return;
                }
                self.notify(CONSTANT.insertCompleted, {
                    args: args.event, type: callbackArgs.requestType, isNotify: true,
                    elements: args.elements
                });
            }
            self.autoResize();
        });
    };
    /**
     * Save the data for undo and redo action.
     */
    Formatter.prototype.saveData = function (e) {
        this.editorManager.undoRedoManager.saveData(e);
    };
    Formatter.prototype.getUndoStatus = function () {
        return this.editorManager.undoRedoManager.getUndoStatus();
    };
    Formatter.prototype.getUndoRedoStack = function () {
        return this.editorManager.undoRedoManager.undoRedoStack;
    };
    Formatter.prototype.enableUndo = function (self) {
        var status = this.getUndoStatus();
        if (self.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            updateUndoRedoStatus(self.quickToolbarModule.inlineQTBar.quickTBarObj, status);
            self.trigger(CONSTANT.toolbarStatusUpdate, status);
        }
        else {
            if (self.toolbarModule) {
                updateUndoRedoStatus(self.toolbarModule.baseToolbar, status);
                self.trigger(CONSTANT.toolbarStatusUpdate, status);
            }
        }
    };
    return Formatter;
}());
export { Formatter };