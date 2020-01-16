import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { click, keyPressed, commandClick, initialEnd } from '../base/constant';
import { CellType } from '../base/enum';
import { CommandColumnRenderer } from '../renderer/command-column-renderer';
import { getUid } from '../base/util';
/**
 * `CommandColumn` used to handle the command column actions.

 */
var CommandColumn = /** @class */ (function () {
    function CommandColumn(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.initiateRender();
        this.addEventListener();
    }
    CommandColumn.prototype.initiateRender = function () {
        var cellFac = this.locator.getService('cellRendererFactory');
        cellFac.addCellRenderer(CellType.CommandColumn, new CommandColumnRenderer(this.parent, this.locator));
    };
    CommandColumn.prototype.commandClickHandler = function (e) {
        var gObj = this.parent;
        var gID = gObj.element.id;
        var target = closest(e.target, 'button');
        if (!target || !closest(e.target, '.e-unboundcell')) {
            return;
        }
        var buttonObj = target.ej2_instances[0];
        var type = buttonObj.commandType;
        var uid = target.getAttribute('data-uid');
        var commandColumn;
        var row = gObj.getRowObjectFromUID(closest(target, '.e-row').getAttribute('data-uid'));
        this.parent.columnModel.forEach(function (col) {
            if (col.commands) {
                col.commands.forEach(function (commandCol) {
                    var idInString = 'uid';
                    var typeInString = 'type';
                    if (commandCol[idInString] === uid && commandCol[typeInString] === type) {
                        commandColumn = commandCol;
                    }
                });
            }
        });
        var args = {
            cancel: false,
            target: target,
            commandColumn: commandColumn,
            rowData: isNullOrUndefined(row) ? undefined : row.data
        };
        this.parent.trigger(commandClick, args, function (commandclickargs) {
            if (buttonObj.disabled || !gObj.editModule || commandclickargs.cancel) {
                return;
            }
            switch (type) {
                case 'Edit':
                    gObj.editModule.endEdit();
                    gObj.editModule.startEdit(closest(target, 'tr'));
                    break;
                case 'Cancel':
                    gObj.editModule.closeEdit();
                    break;
                case 'Save':
                    gObj.editModule.endEdit();
                    break;
                case 'Delete':
                    if (gObj.editSettings.mode !== 'Batch') {
                        gObj.editModule.endEdit();
                    }
                    gObj.clearSelection();
                    //for toogle issue when dbl click
                    gObj.selectRow(parseInt(closest(target, 'tr').getAttribute('aria-rowindex'), 10), false);
                    gObj.editModule.deleteRecord();
                    break;
            }
        });
    };
    /**
     * For internal use only - Get the module name.
     */
    CommandColumn.prototype.getModuleName = function () {
        return 'commandColumn';
    };
    /**
     * To destroy CommandColumn.
     * @method destroy
     * @return {void}
     */
    CommandColumn.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    CommandColumn.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(click, this.commandClickHandler);
        this.parent.off(keyPressed, this.keyPressHandler);
        this.parent.off(initialEnd, this.load);
    };
    CommandColumn.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(click, this.commandClickHandler, this);
        this.parent.on(keyPressed, this.keyPressHandler, this);
        this.parent.on(initialEnd, this.load, this);
    };
    CommandColumn.prototype.keyPressHandler = function (e) {
        if (e.action === 'enter' && closest(e.target, '.e-unboundcelldiv')) {
            this.commandClickHandler(e);
            e.preventDefault();
        }
    };
    CommandColumn.prototype.load = function () {
        var uid = 'uid';
        this.parent.columnModel.forEach(function (col, indexs) {
            if (col.commands) {
                col.commands.forEach(function (commandCol) {
                    commandCol[uid] = getUid('gridcommand');
                });
            }
        });
    };
    return CommandColumn;
}());
export { CommandColumn };
