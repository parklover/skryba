import { initiateSort, getIndexesFromAddress } from '../../workbook/index';
import { collaborativeUpdate } from '../common/index';
/**
 * Collaborative Editing module allows to real time changes of the Spreadsheet.
 */
var CollaborativeEditing = /** @class */ (function () {
    function CollaborativeEditing(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**

     */
    /* tslint:disable no-any */
    CollaborativeEditing.prototype.refreshClients = function (options) {
        var _this = this;
        var eventArgs = options.eventArgs;
        switch (options.action) {
            case 'sorting':
                var args = {
                    range: options.eventArgs.range,
                    sortOptions: options.eventArgs.sortOptions,
                    cancel: false
                };
                var promise = new Promise(function (resolve, reject) {
                    resolve((function () { })());
                });
                var sortArgs = { args: args, promise: promise };
                this.parent.notify(initiateSort, sortArgs);
                sortArgs.promise.then(function (args) {
                    _this.parent.serviceLocator.getService('cell').refreshRange(getIndexesFromAddress(args.range));
                });
                break;
            case 'cellSave':
                this.parent.updateCell({ value: options.eventArgs.value });
                break;
            case 'cellFormat':
                if (eventArgs.requestType === 'CellFormat') {
                    this.parent.cellFormat(eventArgs.style, eventArgs.range);
                }
                else {
                    this.parent.numberFormat(eventArgs.format, eventArgs.range);
                }
                break;
            case 'clipboard':
                eventArgs.copiedInfo.isCut ? this.parent.cut(eventArgs.copiedRange) : this.parent.copy(eventArgs.copiedRange);
                this.parent.paste(eventArgs.pastedRange, eventArgs.type);
                break;
            case 'gridLines':
                this.parent.sheets[eventArgs.sheetIdx].showGridLines = eventArgs.isShow;
                break;
            case 'headers':
                this.parent.sheets[eventArgs.sheetIdx].showHeaders = eventArgs.isShow;
                break;
            case 'import':
                break;
            case 'resize':
            case 'resizeToFit':
                break;
        }
    };
    CollaborativeEditing.prototype.addEventListener = function () {
        this.parent.on(collaborativeUpdate, this.refreshClients, this);
    };
    CollaborativeEditing.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(collaborativeUpdate, this.refreshClients);
        }
    };
    /**
     * Destroy collaborative editing module.
     */
    CollaborativeEditing.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    /**
     * Get the cell format module name.
     */
    CollaborativeEditing.prototype.getModuleName = function () {
        return 'collaborativeEditing';
    };
    return CollaborativeEditing;
}());
export { CollaborativeEditing };
