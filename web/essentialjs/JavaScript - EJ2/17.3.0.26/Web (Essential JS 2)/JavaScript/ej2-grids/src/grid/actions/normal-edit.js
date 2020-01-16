import { extend, isBlazor } from '@syncfusion/ej2-base';
import { remove, isNullOrUndefined, updateBlazorTemplate, resetBlazorTemplate } from '@syncfusion/ej2-base';
import { parentsUntil, isGroupAdaptive, refreshForeignData, getObject } from '../base/util';
import * as events from '../base/constant';
import { RowRenderer } from '../renderer/row-renderer';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * `NormalEdit` module is used to handle normal('inline, dialog, external') editing actions.

 */
var NormalEdit = /** @class */ (function () {
    function NormalEdit(parent, serviceLocator, renderer) {
        this.args = {};
        this.parent = parent;
        this.renderer = renderer;
        this.serviceLocator = serviceLocator;
        this.addEventListener();
    }
    NormalEdit.prototype.clickHandler = function (e) {
        var target = e.target;
        var gObj = this.parent;
        if ((((parentsUntil(target, 'e-gridcontent') &&
            parentsUntil(parentsUntil(target, 'e-gridcontent'), 'e-grid').id === gObj.element.id)) || (gObj.frozenRows
            && parentsUntil(target, 'e-headercontent'))) && !parentsUntil(target, 'e-unboundcelldiv')) {
            this.rowIndex = parentsUntil(target, 'e-rowcell') ? parseInt(target.parentElement.getAttribute('aria-rowindex'), 10) : -1;
            if (gObj.isEdit) {
                gObj.editModule.endEdit();
            }
        }
    };
    NormalEdit.prototype.dblClickHandler = function (e) {
        if (parentsUntil(e.target, 'e-rowcell') && this.parent.editSettings.allowEditOnDblClick) {
            this.parent.editModule.startEdit(parentsUntil(e.target, 'e-row'));
        }
    };
    /**
     * The function used to trigger editComplete
     * @return {void}

     */
    NormalEdit.prototype.editComplete = function (e) {
        this.parent.isEdit = false;
        switch (e.requestType) {
            case 'save':
                if (!(this.parent.isCheckBoxSelection || this.parent.selectionSettings.type === 'Multiple')
                    || (!this.parent.isPersistSelection)) {
                    this.parent.selectRow(0);
                }
                this.parent.trigger(events.actionComplete, extend(e, {
                    requestType: 'save',
                    type: events.actionComplete
                }));
                break;
            case 'delete':
                if (isBlazor() && !this.parent.isJsComponent) {
                    var d = 'data';
                    e[d] = e[d][0];
                }
                this.parent.trigger(events.actionComplete, extend(e, {
                    requestType: 'delete',
                    type: events.actionComplete
                }));
                this.parent.selectRow(this.editRowIndex);
                break;
        }
    };
    NormalEdit.prototype.startEdit = function (tr) {
        var _this = this;
        var gObj = this.parent;
        var primaryKeys = gObj.getPrimaryKeyFieldNames();
        var primaryKeyValues = [];
        this.rowIndex = this.editRowIndex = parseInt(tr.getAttribute('aria-rowindex'), 10);
        if (isBlazor()) {
            var cols = this.parent.getColumns();
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (col.template) {
                    resetBlazorTemplate(gObj.element.id + col.uid, 'Template', this.rowIndex);
                }
            }
        }
        if (isGroupAdaptive(gObj)) {
            var rObj = gObj.getRowObjectFromUID(tr.getAttribute('data-uid'));
            this.previousData = rObj.data;
        }
        else {
            this.previousData = gObj.getCurrentViewRecords()[this.rowIndex];
        }
        for (var i = 0; i < primaryKeys.length; i++) {
            primaryKeyValues.push(getObject(primaryKeys[i], this.previousData));
        }
        this.uid = tr.getAttribute('data-uid');
        var rowObj = gObj.getRowObjectFromUID(this.uid);
        var args = {
            primaryKey: primaryKeys, primaryKeyValue: primaryKeyValues, requestType: 'beginEdit',
            rowData: this.previousData, rowIndex: this.rowIndex, type: 'edit', cancel: false,
            foreignKeyData: rowObj && rowObj.foreignKeyData, target: undefined
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            args.row = tr;
        }
        gObj.trigger(events.beginEdit, args, function (begineditargs) {
            begineditargs.type = 'actionBegin';
            gObj.trigger(events.actionBegin, begineditargs, function (editargs) {
                if (!editargs.cancel) {
                    gObj.isEdit = true;
                    editargs.row = editargs.row ? editargs.row : tr;
                    if (gObj.editSettings.mode !== 'Dialog') {
                        gObj.clearSelection();
                    }
                    if (gObj.editSettings.mode === 'Dialog' && gObj.selectionModule) {
                        gObj.selectionModule.preventFocus = true;
                        editargs.row.classList.add('e-dlgeditrow');
                    }
                    _this.renderer.update(editargs);
                    _this.uid = tr.getAttribute('data-uid');
                    gObj.editModule.applyFormValidation();
                    editargs.type = 'actionComplete';
                    gObj.trigger(events.actionComplete, editargs);
                    _this.args = editargs;
                    if (_this.parent.allowTextWrap) {
                        _this.parent.notify(events.freezeRender, { case: 'textwrap' });
                    }
                    if (isBlazor()) {
                        _this.parent.notify(events.toolbarRefresh, {});
                        gObj.element.querySelector('.e-gridpopup').style.display = 'none';
                        _this.parent.notify('start-edit', {});
                    }
                }
            });
        });
    };
    NormalEdit.prototype.updateRow = function (index, data) {
        var _this = this;
        var gObj = this.parent;
        var args = {
            requestType: 'save', type: events.actionBegin, data: data, cancel: false,
            previousData: gObj.getCurrentViewRecords()[index]
        };
        gObj.showSpinner();
        gObj.notify(events.updateData, args);
        if (args.promise) {
            args.promise.then(function () { return gObj.refresh(); }).catch(function (e) { return _this.edFail(e); });
        }
        else {
            gObj.refresh();
        }
    };
    NormalEdit.prototype.editFormValidate = function () {
        var gObj = this.parent;
        var form1 = gObj.editModule.formObj.validate();
        var form2 = gObj.editModule.mFormObj ? gObj.editModule.mFormObj.validate() : true;
        return (form1 && form2);
    };
    NormalEdit.prototype.endEdit = function () {
        var gObj = this.parent;
        if (!this.parent.isEdit || !this.editFormValidate()) {
            return;
        }
        var editedData = extend({}, {}, this.previousData, true);
        var args = extend(this.args, {
            requestType: 'save', type: events.actionBegin, data: editedData, cancel: false,
            previousData: this.previousData, selectedRow: gObj.selectedRowIndex, foreignKeyData: {}
        });
        var isDlg = gObj.editSettings.mode === 'Dialog';
        var dlgWrapper = document.querySelector('#' + gObj.element.id + '_dialogEdit_wrapper');
        var dlgForm = isDlg ? dlgWrapper.querySelector('.e-gridform') : gObj.element.querySelector('.e-gridform');
        editedData = gObj.editModule.getCurrentEditedData(dlgForm, editedData);
        if (gObj.getFrozenColumns() && gObj.editSettings.mode === 'Normal') {
            var mForm = gObj.element.querySelector('.e-movableheader').querySelector('.e-gridform');
            if (gObj.frozenRows && mForm) {
                editedData = gObj.editModule.getCurrentEditedData(mForm, editedData);
            }
            else {
                editedData = gObj.editModule.getCurrentEditedData(gObj.element.querySelector('.e-movablecontent').querySelector('.e-gridform'), editedData);
            }
        }
        if (isDlg ? dlgWrapper.querySelectorAll('.e-editedrow').length : gObj.element.querySelectorAll('.e-editedrow').length) {
            args.action = 'edit';
            gObj.trigger(events.actionBegin, args, function (endEditArgs) {
                if (endEditArgs.cancel) {
                    return;
                }
                gObj.showSpinner();
                gObj.notify(events.updateData, endEditArgs);
            });
        }
        else {
            args.action = 'add';
            args.selectedRow = 0;
            args.index = this.addedRowIndex;
            gObj.notify(events.modelChanged, args);
            this.addedRowIndex = null;
            if (args.cancel) {
                return;
            }
        }
    };
    NormalEdit.prototype.destroyElements = function () {
        var gObj = this.parent;
        gObj.editModule.destroyWidgets();
        gObj.editModule.destroyForm();
        this.parent.notify(events.dialogDestroy, {});
    };
    NormalEdit.prototype.editHandler = function (args) {
        var _this = this;
        if (args.promise) {
            args.promise.then(function (e) { return _this.edSucc(e, args); }).catch(function (e) { return _this.edFail(e); });
        }
        else {
            this.editSuccess(args.data, args);
        }
    };
    NormalEdit.prototype.edSucc = function (e, args) {
        this.editSuccess(e, args);
    };
    NormalEdit.prototype.edFail = function (e) {
        this.editFailure(e);
    };
    NormalEdit.prototype.updateCurrentViewData = function (data) {
        this.parent.getCurrentViewRecords()[this.editRowIndex] = data;
    };
    NormalEdit.prototype.requestSuccess = function (args) {
        if (this.parent.editModule.formObj && !this.parent.editModule.formObj.isDestroyed) {
            this.destroyElements();
            this.stopEditStatus();
            if (this.parent.editSettings.mode === 'Dialog' && args.action !== 'add') {
                this.parent.element.querySelector('.e-dlgeditrow').classList.remove('e-dlgeditrow');
            }
        }
    };
    NormalEdit.prototype.editSuccess = function (e, args) {
        if (!isNullOrUndefined(e) && !(e instanceof Array)) {
            var rowData = 'rowData';
            args.data = extend({}, extend({}, args[rowData], args.data), e);
        }
        this.requestSuccess(args);
        this.parent.trigger(events.beforeDataBound, args);
        args.type = events.actionComplete;
        this.parent.isEdit = false;
        this.refreshRow(args.data);
        this.updateCurrentViewData(args.data);
        this.blazorTemplate();
        this.parent.trigger(events.actionComplete, args);
        if (isBlazor()) {
            this.parent.notify(events.toolbarRefresh, {});
        }
        if (!(this.parent.isCheckBoxSelection || this.parent.selectionSettings.type === 'Multiple')
            || (!this.parent.isPersistSelection)) {
            if (this.parent.editSettings.mode !== 'Dialog') {
                this.parent.selectRow(this.rowIndex > -1 ? this.rowIndex : this.editRowIndex);
            }
        }
        this.parent.hideSpinner();
    };
    NormalEdit.prototype.blazorTemplate = function () {
        var cols = this.parent.getColumns();
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            if (col.template) {
                updateBlazorTemplate(this.parent.element.id + col.uid, 'Template', col, false);
            }
            if (col.editTemplate) {
                updateBlazorTemplate(this.parent.element.id + col.uid + 'editTemplate', 'EditTemplate', col);
            }
        }
    };
    NormalEdit.prototype.editFailure = function (e) {
        this.parent.trigger(events.actionFailure, ((isBlazor() && e instanceof Array) ? e[0] : e));
        this.parent.hideSpinner();
        this.parent.log('actionfailure', { error: e });
    };
    NormalEdit.prototype.refreshRow = function (data) {
        var frzCols = this.parent.getFrozenColumns();
        var row = new RowRenderer(this.serviceLocator, null, this.parent);
        var rowObj = this.parent.getRowObjectFromUID(this.uid);
        if (rowObj) {
            rowObj.changes = data;
            refreshForeignData(rowObj, this.parent.getForeignKeyColumns(), rowObj.changes);
            row.refresh(rowObj, this.parent.getColumns(), true);
            if (frzCols) {
                var uid = void 0;
                var tr = this.parent.element.querySelector('[data-uid=' + rowObj.uid + ']');
                if ((parentsUntil(tr, 'e-frozencontent')) || (parentsUntil(tr, 'e-frozenheader'))) {
                    uid = this.parent.getMovableRows()[rowObj.index].getAttribute('data-uid');
                }
                else {
                    uid = this.parent.getRows()[rowObj.index].getAttribute('data-uid');
                }
                rowObj = this.parent.getRowObjectFromUID(uid);
                rowObj.changes = data;
                row.refresh(rowObj, this.parent.columns, true);
            }
        }
    };
    NormalEdit.prototype.closeEdit = function () {
        var _this = this;
        if (!this.parent.isEdit) {
            return;
        }
        var gObj = this.parent;
        var args = extend(this.args, {
            requestType: 'cancel', type: events.actionBegin, data: this.previousData, selectedRow: gObj.selectedRowIndex
        });
        this.blazorTemplate();
        gObj.trigger(events.actionBegin, args, function (closeEditArgs) {
            if (_this.parent.editSettings.mode === 'Dialog') {
                _this.parent.notify(events.dialogDestroy, {});
            }
            gObj.isEdit = false;
            _this.stopEditStatus();
            closeEditArgs.type = events.actionComplete;
            if (gObj.editSettings.mode !== 'Dialog') {
                _this.refreshRow(closeEditArgs.data);
            }
            if (!gObj.getContentTable().querySelector('tr.e-emptyrow') &&
                !gObj.getContentTable().querySelector('tr.e-row')) {
                gObj.renderModule.emptyRow();
            }
            if (gObj.editSettings.mode !== 'Dialog') {
                gObj.selectRow(_this.rowIndex);
            }
            gObj.trigger(events.actionComplete, closeEditArgs);
            if (isBlazor()) {
                _this.parent.notify(events.toolbarRefresh, {});
                _this.parent.notify('close-edit', {});
            }
        });
    };
    NormalEdit.prototype.addRecord = function (data, index) {
        var _this = this;
        var gObj = this.parent;
        this.addedRowIndex = index = !isNullOrUndefined(index) ? index : 0;
        if (data) {
            gObj.notify(events.modelChanged, {
                requestType: 'save', type: events.actionBegin, data: data, selectedRow: 0, action: 'add', index: index
            });
            return;
        }
        if (gObj.isEdit) {
            return;
        }
        this.previousData = {};
        this.uid = '';
        (gObj.columnModel).forEach(function (col) {
            if (col.field) {
                DataUtil.setValue(col.field, col.defaultValue, _this.previousData);
            }
        });
        var args = {
            cancel: false, foreignKeyData: {},
            requestType: 'add', data: this.previousData, type: events.actionBegin, index: index,
            rowData: this.previousData, target: undefined
        };
        gObj.trigger(events.actionBegin, args, function (addArgs) {
            if (addArgs.cancel) {
                return;
            }
            gObj.isEdit = true;
            if (gObj.editSettings.mode !== 'Dialog') {
                gObj.clearSelection();
            }
            _this.renderer.addNew(addArgs);
            gObj.editModule.applyFormValidation();
            addArgs.type = events.actionComplete;
            addArgs.row = gObj.element.querySelector('.e-addedrow');
            gObj.trigger(events.actionComplete, addArgs);
            if (isBlazor()) {
                _this.parent.notify(events.toolbarRefresh, {});
                _this.parent.notify('start-add', {});
            }
            _this.args = addArgs;
        });
    };
    NormalEdit.prototype.deleteRecord = function (fieldname, data) {
        this.editRowIndex = this.parent.selectedRowIndex;
        if (data) {
            data = (data instanceof Array) ? data : [data];
            var gObj = this.parent;
            var index = 0;
            var dataLen = Object.keys(data).length;
            fieldname = fieldname || this.parent.getPrimaryKeyFieldNames()[0];
            var _loop_1 = function (i) {
                var _a;
                var tmpRecord;
                var contained = gObj.currentViewData.some(function (record) {
                    tmpRecord = record;
                    return data[i] === getObject(fieldname, record) || data[i] === record;
                });
                data[i] = contained ? tmpRecord : (_a = {}, _a[fieldname] = data[i], _a);
            };
            for (var i = 0; i < dataLen; i++) {
                _loop_1(i);
            }
        }
        var args = {
            requestType: 'delete', type: events.actionBegin, foreignKeyData: {},
            data: data ? data : this.parent.getSelectedRecords(), tr: this.parent.getSelectedRows(), cancel: false
        };
        var dataInString = 'data';
        if (isBlazor() && !this.parent.isJsComponent) {
            args[dataInString] = args[dataInString][0];
        }
        this.parent.notify(events.modelChanged, args);
    };
    NormalEdit.prototype.stopEditStatus = function () {
        var gObj = this.parent;
        var elem = gObj.element.querySelector('.e-addedrow');
        var mElem;
        var editMElem;
        if (gObj.getFrozenColumns()) {
            mElem = gObj.element.querySelectorAll('.e-addedrow')[1];
            editMElem = gObj.element.querySelectorAll('.e-editedrow')[1];
            if (mElem) {
                remove(mElem);
            }
            if (editMElem) {
                editMElem.classList.remove('e-editedrow');
            }
        }
        if (elem) {
            remove(elem);
        }
        elem = gObj.element.querySelector('.e-editedrow');
        if (elem) {
            elem.classList.remove('e-editedrow');
        }
    };
    /**

     */
    NormalEdit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.crudAction, this.editHandler, this);
        this.parent.on(events.doubleTap, this.dblClickHandler, this);
        this.parent.on(events.click, this.clickHandler, this);
        this.parent.on(events.recordAdded, this.requestSuccess, this);
        this.parent.on(events.dblclick, this.dblClickHandler, this);
        this.parent.on(events.deleteComplete, this.editComplete, this);
        this.parent.on(events.saveComplete, this.editComplete, this);
    };
    /**

     */
    NormalEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.crudAction, this.editHandler);
        this.parent.off(events.doubleTap, this.dblClickHandler);
        this.parent.off(events.click, this.clickHandler);
        this.parent.off(events.recordAdded, this.requestSuccess);
        this.parent.off(events.dblclick, this.dblClickHandler);
        this.parent.off(events.deleteComplete, this.editComplete);
        this.parent.off(events.saveComplete, this.editComplete);
    };
    /**

     */
    NormalEdit.prototype.destroy = function () {
        this.removeEventListener();
        this.renderer.destroy();
    };
    return NormalEdit;
}());
export { NormalEdit };
