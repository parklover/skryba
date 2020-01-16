import { extend, addClass, removeClass, setValue, isBlazor } from '@syncfusion/ej2-base';
import { remove, classList, updateBlazorTemplate, blazorTemplates, resetBlazorTemplate } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { parentsUntil, inArray, refreshForeignData, getObject } from '../base/util';
import * as events from '../base/constant';
import { RowRenderer } from '../renderer/row-renderer';
import { CellRenderer } from '../renderer/cell-renderer';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import { RowModelGenerator } from '../services/row-model-generator';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * `BatchEdit` module is used to handle batch editing actions.

 */
var BatchEdit = /** @class */ (function () {
    function BatchEdit(parent, serviceLocator, renderer) {
        this.cellDetails = {};
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.renderer = renderer;
        this.focus = serviceLocator.getService('focus');
        this.addEventListener();
    }
    /**

     */
    BatchEdit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.click, this.clickHandler, this);
        this.parent.on(events.dblclick, this.dblClickHandler, this);
        this.parent.on(events.beforeCellFocused, this.onBeforeCellFocused, this);
        this.parent.on(events.cellFocused, this.onCellFocused, this);
        this.dataBoundFunction = this.dataBound.bind(this);
        this.parent.addEventListener(events.dataBound, this.dataBoundFunction);
        this.parent.on(events.doubleTap, this.dblClickHandler, this);
        this.parent.on(events.keyPressed, this.keyDownHandler, this);
        this.parent.on(events.editNextValCell, this.editNextValCell, this);
    };
    /**

     */
    BatchEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.click, this.clickHandler);
        this.parent.off(events.dblclick, this.dblClickHandler);
        this.parent.off(events.beforeCellFocused, this.onBeforeCellFocused);
        this.parent.off(events.cellFocused, this.onCellFocused);
        this.parent.removeEventListener(events.dataBound, this.dataBoundFunction);
        this.parent.off(events.doubleTap, this.dblClickHandler);
        this.parent.off(events.keyPressed, this.keyDownHandler);
        this.parent.off(events.editNextValCell, this.editNextValCell);
    };
    BatchEdit.prototype.dataBound = function () {
        this.parent.notify(events.toolbarRefresh, {});
    };
    /**

     */
    BatchEdit.prototype.destroy = function () {
        this.removeEventListener();
    };
    BatchEdit.prototype.clickHandler = function (e) {
        if (!parentsUntil(e.target, this.parent.element.id + '_add', true)) {
            if (this.parent.isEdit) {
                this.saveCell();
                this.editNextValCell();
            }
            if (parentsUntil(e.target, 'e-rowcell') && !this.parent.isEdit) {
                this.setCellIdx(e.target);
            }
        }
    };
    BatchEdit.prototype.dblClickHandler = function (e) {
        var target = parentsUntil(e.target, 'e-rowcell');
        var tr = parentsUntil(e.target, 'e-row');
        if (target && tr && !isNaN(parseInt(target.getAttribute('aria-colindex'), 10))
            && !target.parentElement.classList.contains('e-editedrow')) {
            this.editCell(parseInt(tr.getAttribute('aria-rowindex'), 10), this.parent.getColumns()[parseInt(target.getAttribute('aria-colindex'), 10)].field, this.isAddRow(parseInt(tr.getAttribute('aria-rowindex'), 10)));
        }
    };
    BatchEdit.prototype.onBeforeCellFocused = function (e) {
        if (this.parent.isEdit && this.validateFormObj() &&
            (e.byClick || (['tab', 'shiftTab', 'enter', 'shiftEnter'].indexOf(e.keyArgs.action) > -1))) {
            e.cancel = true;
            if (e.byClick) {
                e.clickArgs.preventDefault();
            }
            else {
                e.keyArgs.preventDefault();
            }
        }
    };
    BatchEdit.prototype.onCellFocused = function (e) {
        var frzCols = this.parent.getFrozenColumns();
        var mCont = this.parent.getContent().querySelector('.e-movablecontent');
        var mHdr = this.parent.getHeaderContent().querySelector('.e-movableheader');
        var clear = (!e.container.isContent || !e.container.isDataCell) && !(this.parent.frozenRows && e.container.isHeader);
        if (!e.byKey || clear) {
            if (this.parent.isEdit && clear) {
                this.saveCell();
            }
            return;
        }
        var _a = e.container.indexes, rowIndex = _a[0], cellIndex = _a[1];
        if (frzCols && (mCont.contains(e.element) || (this.parent.frozenRows && mHdr.contains(e.element)))) {
            cellIndex += frzCols;
        }
        if (this.parent.frozenRows && e.container.isContent) {
            rowIndex += this.parent.frozenRows;
        }
        var isEdit = this.parent.isEdit;
        if (!this.parent.element.querySelectorAll('.e-popup-open').length) {
            isEdit = isEdit && !this.validateFormObj();
            switch (e.keyArgs.action) {
                case 'tab':
                case 'shiftTab':
                    if (isEdit || this.parent.isLastCellPrimaryKey) {
                        this.editCellFromIndex(rowIndex, cellIndex);
                    }
                    break;
                case 'enter':
                case 'shiftEnter':
                    e.keyArgs.preventDefault();
                    if (isEdit) {
                        this.editCell(rowIndex, this.cellDetails.column.field);
                    }
                    break;
                case 'f2':
                    this.editCellFromIndex(rowIndex, cellIndex);
                    this.focus.focus();
                    break;
            }
        }
    };
    BatchEdit.prototype.isAddRow = function (index) {
        return this.parent.getDataRows()[index].classList.contains('e-insertedrow');
    };
    BatchEdit.prototype.editCellFromIndex = function (rowIdx, cellIdx) {
        this.cellDetails.rowIndex = rowIdx;
        this.cellDetails.cellIndex = cellIdx;
        this.editCell(rowIdx, this.parent.getColumns()[cellIdx].field, this.isAddRow(rowIdx));
    };
    // tslint:disable-next-line:max-func-body-length
    BatchEdit.prototype.closeEdit = function () {
        var gObj = this.parent;
        var rows = this.parent.getRowsObject();
        var argument = { cancel: false, batchChanges: this.getBatchChanges() };
        gObj.notify(events.beforeBatchCancel, argument);
        if (argument.cancel) {
            return;
        }
        if (gObj.frozenColumns && rows.length < this.parent.currentViewData.length * 2) {
            rows.push.apply(rows, this.parent.getMovableRowsObject());
        }
        var cols = this.parent.getColumns();
        if (isBlazor()) {
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (col.template) {
                    updateBlazorTemplate(this.parent.element.id + col.uid, 'Template', col, false);
                }
            }
        }
        var rowRenderer = new RowRenderer(this.serviceLocator, null, this.parent);
        var tr;
        var mTr;
        var movObj;
        if (gObj.isEdit) {
            this.saveCell(true);
        }
        this.isAdded = false;
        gObj.clearSelection();
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].isDirty) {
                if (gObj.frozenColumns) {
                    movObj = gObj.getMovableRowsObject()[rows[i].index];
                    movObj.isDirty = true;
                }
                tr = gObj.getContentTable().querySelector('[data-uid=' + rows[i].uid + ']');
                if (gObj.frozenRows && !tr) {
                    tr = gObj.getHeaderContent().querySelector('[data-uid=' + rows[i].uid + ']');
                }
                if (gObj.frozenColumns) {
                    if (gObj.frozenRows) {
                        mTr = gObj.getHeaderContent().querySelector('.e-movableheader')
                            .querySelector('[data-uid=' + rows[i].uid + ']');
                        if (!mTr) {
                            mTr = gObj.getContent().querySelector('.e-movablecontent')
                                .querySelector('[data-uid=' + rows[i].uid + ']');
                        }
                    }
                    else {
                        mTr = gObj.getContent().querySelector('.e-movablecontent')
                            .querySelector('[data-uid=' + rows[i].uid + ']');
                    }
                }
                if (tr || mTr) {
                    if (tr && tr.classList.contains('e-insertedrow') || mTr && mTr.classList.contains('e-insertedrow')) {
                        if (tr) {
                            remove(tr);
                        }
                        if (mTr && (gObj.frozenColumns || gObj.frozenRows)) {
                            remove(mTr);
                        }
                        this.removeRowObjectFromUID(rows[i].uid);
                        i--;
                    }
                    else {
                        refreshForeignData(rows[i], this.parent.getForeignKeyColumns(), rows[i].data);
                        delete rows[i].changes;
                        delete rows[i].edit;
                        rows[i].isDirty = false;
                        var ftr = mTr ? mTr : tr;
                        classList(ftr, [], ['e-hiddenrow', 'e-updatedtd']);
                        rowRenderer.refresh(rows[i], gObj.getColumns(), false);
                        if (this.parent.aggregates.length > 0) {
                            var type = 'type';
                            var editType = [];
                            editType[type] = 'cancel';
                            this.parent.notify(events.refreshFooterRenderer, editType);
                            if (this.parent.groupSettings.columns.length > 0) {
                                this.parent.notify(events.groupAggregates, editType);
                            }
                        }
                    }
                }
            }
        }
        if (!gObj.getContentTable().querySelector('tr.e-row')) {
            gObj.renderModule.renderEmptyRow();
        }
        var args = {
            requestType: 'batchCancel', rows: this.parent.getRowsObject()
        };
        gObj.notify(events.batchCancel, {
            rows: this.parent.getRowsObject().length ? this.parent.getRowsObject() :
                [new Row({ isDataRow: true, cells: [new Cell({ isDataCell: true, visible: true })] })]
        });
        gObj.selectRow(this.cellDetails.rowIndex);
        this.refreshRowIdx();
        gObj.notify(events.toolbarRefresh, {});
        this.parent.notify(events.tooltipDestroy, {});
        args = { requestType: 'batchCancel', rows: this.parent.getRowsObject() };
        gObj.trigger(events.batchCancel, args);
        if (gObj.frozenColumns) {
            rows.splice(this.parent.getMovableRowsObject().length, rows.length);
        }
    };
    BatchEdit.prototype.deleteRecord = function (fieldname, data) {
        this.saveCell();
        if (this.validateFormObj()) {
            this.saveCell(true);
        }
        this.isAdded = false;
        this.bulkDelete(fieldname, data);
        if (this.parent.aggregates.length > 0) {
            this.parent.notify(events.refreshFooterRenderer, {});
            if (this.parent.groupSettings.columns.length > 0) {
                this.parent.notify(events.groupAggregates, {});
            }
        }
    };
    BatchEdit.prototype.addRecord = function (data) {
        this.bulkAddRow(data);
    };
    BatchEdit.prototype.endEdit = function (data) {
        if (this.parent.isEdit && this.validateFormObj()) {
            return;
        }
        this.batchSave();
    };
    BatchEdit.prototype.validateFormObj = function () {
        return this.parent.editModule.formObj && !this.parent.editModule.formObj.validate();
    };
    BatchEdit.prototype.batchSave = function () {
        var gObj = this.parent;
        var deletedRecords = 'deletedRecords';
        if (gObj.isCheckBoxSelection) {
            var checkAllBox = gObj.element.querySelector('.e-checkselectall').parentElement;
            if (checkAllBox.classList.contains('e-checkbox-disabled') &&
                gObj.pageSettings.totalRecordsCount > gObj.currentViewData.length) {
                removeClass([checkAllBox], ['e-checkbox-disabled']);
            }
        }
        var cols = this.parent.getColumns();
        if (isBlazor()) {
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                if (col.template) {
                    blazorTemplates[this.parent.element.id + col.uid] = [];
                    resetBlazorTemplate(this.parent.element.id + col.uid, 'Template');
                }
            }
        }
        this.saveCell();
        if (gObj.isEdit || this.editNextValCell() || gObj.isEdit) {
            return;
        }
        var changes = this.getBatchChanges();
        if (this.parent.selectionSettings.type === 'Multiple' && changes[deletedRecords].length &&
            this.parent.selectionSettings.persistSelection) {
            changes[deletedRecords] = this.removeSelectedData;
            this.removeSelectedData = [];
        }
        var original = {
            changedRecords: this.parent.getRowsObject()
                .filter(function (row) { return row.isDirty && ['add', 'delete'].indexOf(row.edit) === -1; })
                .map(function (row) { return row.data; })
        };
        var args = { batchChanges: changes, cancel: false };
        gObj.trigger(events.beforeBatchSave, args, function (beforeBatchSaveArgs) {
            if (beforeBatchSaveArgs.cancel) {
                return;
            }
            gObj.showSpinner();
            gObj.notify(events.bulkSave, { changes: changes, original: original });
        });
    };
    BatchEdit.prototype.getBatchChanges = function () {
        var changes = {
            addedRecords: [],
            deletedRecords: [],
            changedRecords: []
        };
        var rows = this.parent.getRowsObject();
        var mRows = this.parent.getMovableRowsObject();
        var frzCols = this.parent.getFrozenColumns();
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            if (frzCols) {
                this.mergeBatchChanges(row, mRows[row.index], frzCols);
            }
            if (row.isDirty) {
                switch (row.edit) {
                    case 'add':
                        changes.addedRecords.push(row.changes);
                        break;
                    case 'delete':
                        changes.deletedRecords.push(row.data);
                        break;
                    default:
                        changes.changedRecords.push(row.changes);
                }
            }
        }
        return changes;
    };
    BatchEdit.prototype.mergeBatchChanges = function (row, mRow, frzCols) {
        if (row.isDirty) {
            if (mRow.isDirty) {
                var i_1 = 0;
                Object.keys(row.changes).forEach(function (key) {
                    if (i_1 >= frzCols) {
                        row.changes[key] = mRow.changes[key];
                    }
                    i_1++;
                });
            }
        }
        else if (mRow.isDirty) {
            row.changes = mRow.changes;
            row.isDirty = mRow.isDirty;
        }
    };
    /**

     */
    BatchEdit.prototype.removeRowObjectFromUID = function (uid) {
        var rows = this.parent.getRowsObject();
        var i = 0;
        for (var len = rows.length; i < len; i++) {
            if (rows[i].uid === uid) {
                break;
            }
        }
        rows.splice(i, 1);
    };
    /**

     */
    BatchEdit.prototype.addRowObject = function (row) {
        var isTop = this.parent.editSettings.newRowPosition === 'Top';
        isTop ? this.parent.getRowsObject().unshift(row) :
            this.parent.getRowsObject().push(row);
        var mRow = this.parent.getMovableRowsObject();
        if (this.parent.getFrozenColumns() && !mRow.length) {
            isTop ? mRow.unshift(row) : mRow.push(row);
        }
    };
    BatchEdit.prototype.bulkDelete = function (fieldname, data) {
        var _this = this;
        this.removeSelectedData = [];
        var gObj = this.parent;
        if (data) {
            gObj.selectRow(this.getIndexFromData(data));
        }
        var index = gObj.selectedRowIndex;
        var selectedRows = gObj.getSelectedRows();
        var args = {
            primaryKey: this.parent.getPrimaryKeyFieldNames(),
            rowIndex: index,
            rowData: data ? data : gObj.getSelectedRecords()[0],
            cancel: false
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            args.row = data ? gObj.getRows()[index] : selectedRows[0];
            if (!args.row) {
                return;
            }
        }
        gObj.trigger(events.beforeBatchDelete, args, function (beforeBatchDeleteArgs) {
            if (beforeBatchDeleteArgs.cancel) {
                return;
            }
            beforeBatchDeleteArgs.row = beforeBatchDeleteArgs.row ?
                beforeBatchDeleteArgs.row : data ? gObj.getRows()[index] : selectedRows[0];
            if (_this.parent.frozenColumns || selectedRows.length === 1) {
                var uid = beforeBatchDeleteArgs.row.getAttribute('data-uid');
                if (beforeBatchDeleteArgs.row.classList.contains('e-insertedrow')) {
                    _this.removeRowObjectFromUID(uid);
                    remove(beforeBatchDeleteArgs.row);
                }
                else {
                    var rowObj = gObj.getRowObjectFromUID(uid);
                    rowObj.isDirty = true;
                    rowObj.edit = 'delete';
                    classList(beforeBatchDeleteArgs.row, ['e-hiddenrow', 'e-updatedtd'], []);
                    if (gObj.getFrozenColumns()) {
                        classList(data ? gObj.getMovableRows()[index] : selectedRows[1], ['e-hiddenrow', 'e-updatedtd'], []);
                        if (gObj.frozenRows && index < gObj.frozenRows && gObj.getMovableDataRows().length >= gObj.frozenRows) {
                            gObj.getHeaderContent().querySelector('.e-movableheader').querySelector('tbody')
                                .appendChild(gObj.getMovableRowByIndex(gObj.frozenRows - 1));
                            gObj.getHeaderContent().querySelector('.e-frozenheader').querySelector('tbody')
                                .appendChild(gObj.getRowByIndex(gObj.frozenRows - 1));
                        }
                    }
                    else if (gObj.frozenRows && index < gObj.frozenRows && gObj.getDataRows().length >= gObj.frozenRows) {
                        gObj.getHeaderContent().querySelector('tbody').appendChild(gObj.getRowByIndex(gObj.frozenRows - 1));
                    }
                }
                delete beforeBatchDeleteArgs.row;
            }
            else {
                for (var i = 0; i < selectedRows.length; i++) {
                    var uniqueid = selectedRows[i].getAttribute('data-uid');
                    if (selectedRows[i].classList.contains('e-insertedrow')) {
                        _this.removeRowObjectFromUID(uniqueid);
                        remove(selectedRows[i]);
                    }
                    else {
                        classList(selectedRows[i], ['e-hiddenrow', 'e-updatedtd'], []);
                        var selectedRow = gObj.getRowObjectFromUID(uniqueid);
                        selectedRow.isDirty = true;
                        selectedRow.edit = 'delete';
                        delete selectedRows[i];
                    }
                }
            }
            _this.refreshRowIdx();
            _this.removeSelectedData = gObj.getSelectedRecords();
            gObj.clearSelection();
            gObj.selectRow(index);
            gObj.trigger(events.batchDelete, beforeBatchDeleteArgs);
            gObj.notify(events.batchDelete, { rows: _this.parent.getRowsObject() });
            gObj.notify(events.toolbarRefresh, {});
        });
    };
    BatchEdit.prototype.refreshRowIdx = function () {
        var rows = [];
        var mRows = [];
        var nonMovableRows = [];
        var frzCols = this.parent.getFrozenColumns();
        if (this.parent.frozenRows) {
            rows = [].slice.call(this.parent.getHeaderTable().querySelector('tbody').children);
            if (frzCols) {
                mRows = [].slice.call(this.parent.getHeaderContent().querySelector('.e-movableheader').querySelector('tbody').children);
                for (var i = 0; i < mRows.length; i++) {
                    nonMovableRows[i] = this.parent.createElement('tr', { className: 'emptynonmv' });
                }
            }
        }
        if (frzCols) {
            mRows = mRows.concat([].slice.call(this.parent.getContentTable().querySelector('tbody').children));
            nonMovableRows = nonMovableRows.concat([].slice.call(this.parent.element.querySelector('.e-movablecontent').querySelector('tbody').children));
        }
        rows = rows.concat([].slice.call(this.parent.getContentTable().querySelector('tbody').children));
        for (var i = 0, j = 0, len = rows.length; i < len; i++) {
            if (rows[i].classList.contains('e-row') && !rows[i].classList.contains('e-hiddenrow')) {
                rows[i].setAttribute('aria-rowindex', j.toString());
                if (frzCols) {
                    mRows[i].setAttribute('aria-rowindex', j.toString());
                    if (nonMovableRows[i].classList.contains('e-row')) {
                        nonMovableRows[i].setAttribute('aria-rowindex', j.toString());
                    }
                }
                j++;
            }
            else {
                rows[i].removeAttribute('aria-rowindex');
                if (frzCols) {
                    mRows[i].removeAttribute('aria-rowindex');
                }
            }
        }
    };
    BatchEdit.prototype.getIndexFromData = function (data) {
        return inArray(data, this.parent.getCurrentViewRecords());
    };
    BatchEdit.prototype.bulkAddRow = function (data) {
        var _this = this;
        var gObj = this.parent;
        if (!gObj.editSettings.allowAdding) {
            return;
        }
        if (gObj.isEdit) {
            this.saveCell();
            this.parent.notify(events.editNextValCell, {});
        }
        if (gObj.isEdit) {
            return;
        }
        this.parent.element.classList.add('e-editing');
        var defaultData = data ? data : this.getDefaultData();
        var args = {
            defaultData: defaultData,
            primaryKey: gObj.getPrimaryKeyFieldNames(),
            cancel: false
        };
        gObj.trigger(events.beforeBatchAdd, args, function (beforeBatchAddArgs) {
            if (beforeBatchAddArgs.cancel) {
                return;
            }
            _this.isAdded = true;
            gObj.clearSelection();
            var mTr;
            var mTbody;
            var row = new RowRenderer(_this.serviceLocator, null, _this.parent);
            var model = new RowModelGenerator(_this.parent);
            var modelData = model.generateRows([beforeBatchAddArgs.defaultData]);
            var tr = row.render(modelData[0], gObj.getColumns());
            var col;
            var index;
            for (var i = 0; i < _this.parent.groupSettings.columns.length; i++) {
                tr.insertBefore(_this.parent.createElement('td', { className: 'e-indentcell' }), tr.firstChild);
                modelData[0].cells.unshift(new Cell({ cellType: CellType.Indent }));
            }
            var tbody = gObj.getContentTable().querySelector('tbody');
            tr.classList.add('e-insertedrow');
            if (tbody.querySelector('.e-emptyrow')) {
                tbody.querySelector('.e-emptyrow').remove();
            }
            if (gObj.getFrozenColumns()) {
                mTr = _this.renderMovable(tr);
                if (gObj.frozenRows && gObj.editSettings.newRowPosition === 'Top') {
                    mTbody = gObj.getHeaderContent().querySelector('.e-movableheader').querySelector('tbody');
                }
                else {
                    mTbody = gObj.getContent().querySelector('.e-movablecontent').querySelector('tbody');
                }
                _this.parent.editSettings.newRowPosition === 'Top' ? mTbody.insertBefore(mTr, mTbody.firstChild) : mTbody.appendChild(mTr);
                addClass(mTr.querySelectorAll('.e-rowcell'), ['e-updatedtd']);
                if (_this.parent.height === 'auto') {
                    _this.parent.notify(events.frozenHeight, {});
                }
            }
            if (gObj.frozenRows && gObj.editSettings.newRowPosition === 'Top') {
                tbody = gObj.getHeaderContent().querySelector('tbody');
            }
            else {
                tbody = gObj.getContent().querySelector('tbody');
            }
            _this.parent.editSettings.newRowPosition === 'Top' ? tbody.insertBefore(tr, tbody.firstChild) : tbody.appendChild(tr);
            addClass(tr.querySelectorAll('.e-rowcell'), ['e-updatedtd']);
            modelData[0].isDirty = true;
            modelData[0].changes = extend({}, {}, modelData[0].data, true);
            modelData[0].edit = 'add';
            _this.addRowObject(modelData[0]);
            _this.refreshRowIdx();
            _this.focus.forgetPrevious();
            gObj.notify(events.batchAdd, { rows: _this.parent.getRowsObject(), args: { isFrozen: _this.parent.getFrozenColumns() } });
            var changes = _this.getBatchChanges();
            var addedRecords = 'addedRecords';
            _this.parent.editSettings.newRowPosition === 'Top' ? gObj.selectRow(0) :
                gObj.selectRow(_this.parent.getCurrentViewRecords().length + changes[addedRecords].length - 1);
            if (!data) {
                index = _this.findNextEditableCell(0, true);
                col = gObj.getColumns()[index];
                _this.parent.editSettings.newRowPosition === 'Top' ? _this.editCell(0, col.field, true) :
                    _this.editCell(_this.parent.getCurrentViewRecords().length + changes[addedRecords].length - 1, col.field, true);
            }
            if (_this.parent.aggregates.length > 0 && data) {
                _this.parent.notify(events.refreshFooterRenderer, {});
            }
            var args1 = {
                defaultData: beforeBatchAddArgs.defaultData, row: tr,
                columnObject: col, columnIndex: index, primaryKey: beforeBatchAddArgs.primaryKey, cell: tr.cells[index]
            };
            gObj.trigger(events.batchAdd, args1);
            if (isBlazor()) {
                _this.parent.notify(events.toolbarRefresh, {});
                _this.parent.notify('start-add', {});
            }
        });
    };
    BatchEdit.prototype.renderMovable = function (ele) {
        var mEle = ele.cloneNode(true);
        for (var i = 0; i < this.parent.frozenColumns; i++) {
            mEle.removeChild(mEle.children[0]);
        }
        for (var i = this.parent.frozenColumns, len = ele.childElementCount; i < len; i++) {
            ele.removeChild(ele.children[ele.childElementCount - 1]);
        }
        return mEle;
    };
    BatchEdit.prototype.findNextEditableCell = function (columnIndex, isAdd, isValOnly) {
        var cols = this.parent.getColumns();
        var endIndex = cols.length;
        var validation;
        for (var i = columnIndex; i < endIndex; i++) {
            validation = isValOnly ? isNullOrUndefined(cols[i].validationRules) : false;
            if (!isAdd && this.checkNPCell(cols[i])) {
                return i;
            }
            else if (isAdd && !cols[i].template && cols[i].visible && cols[i].allowEditing &&
                !(cols[i].isIdentity && cols[i].isPrimaryKey) && !validation) {
                return i;
            }
        }
        return -1;
    };
    BatchEdit.prototype.checkNPCell = function (col) {
        return !col.template && col.visible && !col.isPrimaryKey && !col.isIdentity && col.allowEditing;
    };
    BatchEdit.prototype.getDefaultData = function () {
        var gObj = this.parent;
        var data = {};
        var dValues = { 'number': 0, 'string': null, 'boolean': false, 'date': null, 'datetime': null };
        for (var _i = 0, _a = (gObj.columnModel); _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.field) {
                setValue(col.field, col.defaultValue ? col.defaultValue : dValues[col.type], data);
            }
        }
        return data;
    };
    BatchEdit.prototype.setCellIdx = function (target) {
        var gLen = 0;
        if (this.parent.allowGrouping) {
            gLen = this.parent.groupSettings.columns.length;
        }
        this.cellDetails.cellIndex = target.cellIndex - gLen;
        this.cellDetails.rowIndex = parseInt(target.getAttribute('index'), 10);
    };
    BatchEdit.prototype.editCell = function (index, field, isAdd) {
        var _this = this;
        var gObj = this.parent;
        var col = gObj.getColumnByField(field);
        var keys = gObj.getPrimaryKeyFieldNames();
        this.parent.element.classList.add('e-editing');
        if (isBlazor() && col.template && !isAdd) {
            resetBlazorTemplate(this.parent.element.id + col.uid, 'Template', index);
        }
        if (gObj.editSettings.allowEditing && col.allowEditing) {
            if (gObj.isEdit && !(this.cellDetails.column.field === field
                && (this.cellDetails.rowIndex === index && this.parent.getDataRows().length - 1 !== index))) {
                this.saveCell();
                if (this.cellDetails.rowIndex === index && this.cellDetails.column.field === field) {
                    return;
                }
            }
            if (gObj.isEdit) {
                return;
            }
            var row_1;
            var rowData_1;
            var mRowData = void 0;
            var colIdx = gObj.getColumnIndexByField(field);
            var frzCols = gObj.getFrozenColumns();
            if (frzCols && colIdx >= frzCols) {
                row_1 = gObj.getMovableDataRows()[index];
                mRowData = this.parent.getRowObjectFromUID(this.parent.getMovableDataRows()[index].getAttribute('data-uid'));
                rowData_1 = mRowData.changes ? extend({}, {}, mRowData.changes, true) : extend({}, {}, this.getDataByIndex(index), true);
            }
            else {
                row_1 = gObj.getDataRows()[index];
                rowData_1 = extend({}, {}, this.getDataByIndex(index), true);
            }
            if ((keys[0] === col.field && !row_1.classList.contains('e-insertedrow')) || col.columns ||
                (col.isPrimaryKey && col.isIdentity)) {
                this.parent.isLastCellPrimaryKey = true;
                return;
            }
            this.parent.isLastCellPrimaryKey = false;
            var rowObj = gObj.getRowObjectFromUID(row_1.getAttribute('data-uid'));
            var cells_1 = [].slice.apply(row_1.cells);
            var args = {
                columnName: col.field, columnObject: col, isForeignKey: !isNullOrUndefined(col.foreignKeyValue),
                primaryKey: keys, rowData: rowData_1,
                validationRules: extend({}, col.validationRules ? col.validationRules : {}),
                value: getObject(col.field, rowData_1),
                type: !isAdd ? 'edit' : 'add', cancel: false,
                foreignKeyData: rowObj && rowObj.foreignKeyData
            };
            if (!isBlazor() || this.parent.isJsComponent) {
                args.cell = cells_1[this.getColIndex(cells_1, this.getCellIdx(col.uid))];
                args.row = row_1;
                if (!args.cell) {
                    return;
                }
            }
            gObj.trigger(events.cellEdit, args, function (cellEditArgs) {
                if (cellEditArgs.cancel) {
                    return;
                }
                cellEditArgs.cell = cellEditArgs.cell ? cellEditArgs.cell : cells_1[_this.getColIndex(cells_1, _this.getCellIdx(col.uid))];
                cellEditArgs.row = cellEditArgs.row ? cellEditArgs.row : row_1;
                _this.cellDetails = {
                    rowData: rowData_1, column: col, value: cellEditArgs.value, isForeignKey: cellEditArgs.isForeignKey, rowIndex: index,
                    cellIndex: parseInt(cellEditArgs.cell.getAttribute('aria-colindex'), 10),
                    foreignKeyData: cellEditArgs.foreignKeyData
                };
                if (cellEditArgs.cell.classList.contains('e-updatedtd')) {
                    _this.isColored = true;
                    cellEditArgs.cell.classList.remove('e-updatedtd');
                }
                gObj.isEdit = true;
                gObj.clearSelection();
                if (!gObj.isCheckBoxSelection || !gObj.isPersistSelection) {
                    gObj.selectRow(_this.cellDetails.rowIndex, true);
                }
                _this.renderer.update(cellEditArgs);
                _this.parent.notify(events.batchEditFormRendered, cellEditArgs);
                _this.form = gObj.element.querySelector('#' + gObj.element.id + 'EditForm');
                gObj.editModule.applyFormValidation([col]);
                _this.parent.element.querySelector('.e-gridpopup').style.display = 'none';
            });
        }
    };
    BatchEdit.prototype.updateCell = function (rowIndex, field, value) {
        var col = this.parent.getColumnByField(field);
        var index = this.parent.getColumnIndexByField(field);
        if (col && !col.isPrimaryKey) {
            var td = this.parent.getDataRows()[rowIndex].querySelectorAll('.e-rowcell')[index];
            if (this.parent.getFrozenColumns()) {
                var cells = [].slice.call(this.parent.getDataRows()[rowIndex].querySelectorAll('.e-rowcell')).concat([].slice.call(this.parent.getMovableDataRows()[rowIndex].querySelectorAll('.e-rowcell')));
                td = cells[index];
            }
            var rowObj = this.parent.getRowObjectFromUID(td.parentElement.getAttribute('data-uid'));
            this.refreshTD(td, col, rowObj, value);
            this.parent.trigger(events.queryCellInfo, {
                cell: td, column: col, data: rowObj.changes
            });
        }
    };
    BatchEdit.prototype.setChanges = function (rowObj, field, value) {
        if (!rowObj.changes) {
            rowObj.changes = extend({}, {}, rowObj.data, true);
        }
        if (!isNullOrUndefined(field)) {
            DataUtil.setValue(field, value, rowObj.changes);
        }
        if (rowObj.data[field] !== value) {
            rowObj.isDirty = true;
        }
    };
    BatchEdit.prototype.updateRow = function (index, data) {
        var keys = Object.keys(data);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var col = keys_1[_i];
            this.updateCell(index, col, data[col]);
        }
    };
    BatchEdit.prototype.getCellIdx = function (uid) {
        var cIdx = this.parent.getColumnIndexByUid(uid) + this.parent.groupSettings.columns.length;
        if (!isNullOrUndefined(this.parent.detailTemplate) || !isNullOrUndefined(this.parent.childGrid)) {
            cIdx++;
        }
        if (this.parent.isRowDragable()) {
            cIdx++;
        }
        return cIdx;
    };
    BatchEdit.prototype.refreshTD = function (td, column, rowObj, value) {
        var cell = new CellRenderer(this.parent, this.serviceLocator);
        var rowcell;
        this.setChanges(rowObj, column.field, value);
        var frzCols = this.parent.getFrozenColumns();
        refreshForeignData(rowObj, this.parent.getForeignKeyColumns(), rowObj.changes);
        if (frzCols && this.getCellIdx(column.uid) >= frzCols && this.parent.getColumns().length === rowObj.cells.length) {
            rowcell = rowObj.cells.slice(frzCols, rowObj.cells.length);
        }
        else {
            rowcell = rowObj.cells;
        }
        cell.refreshTD(td, rowcell[this.getCellIdx(column.uid) - (this.getCellIdx(column.uid) >= frzCols ? frzCols : 0)], rowObj.changes, { 'index': this.getCellIdx(column.uid) });
        td.classList.add('e-updatedtd');
        this.parent.notify(events.toolbarRefresh, {});
    };
    BatchEdit.prototype.getColIndex = function (cells, index) {
        var cIdx = 0;
        if (this.parent.allowGrouping && this.parent.groupSettings.columns) {
            cIdx = this.parent.groupSettings.columns.length;
        }
        if (!isNullOrUndefined(this.parent.detailTemplate) || !isNullOrUndefined(this.parent.childGrid)) {
            cIdx++;
        }
        if (this.parent.isRowDragable()) {
            cIdx++;
        }
        for (var m = 0; m < cells.length; m++) {
            var colIndex = parseInt(cells[m].getAttribute('aria-colindex'), 10);
            if (colIndex === index - cIdx) {
                return m;
            }
        }
        return -1;
    };
    BatchEdit.prototype.editNextValCell = function () {
        var gObj = this.parent;
        if (this.isAdded && !gObj.isEdit) {
            for (var i = this.cellDetails.cellIndex; i < gObj.getColumns().length; i++) {
                if (gObj.isEdit) {
                    return;
                }
                var index = this.findNextEditableCell(this.cellDetails.cellIndex + 1, true, true);
                var col = gObj.getColumns()[index];
                if (col) {
                    this.editCell(0, col.field, true);
                    this.saveCell();
                }
            }
            if (!gObj.isEdit) {
                this.isAdded = false;
            }
        }
    };
    BatchEdit.prototype.saveCell = function (isForceSave) {
        var gObj = this.parent;
        if (!isForceSave && (!gObj.isEdit || this.validateFormObj())) {
            return;
        }
        this.parent.element.classList.remove('e-editing');
        var tr = parentsUntil(this.form, 'e-row');
        var column = this.cellDetails.column;
        var obj = {};
        obj[column.field] = this.cellDetails.rowData[column.field];
        var editedData = gObj.editModule.getCurrentEditedData(this.form, obj);
        var cloneEditedData = extend({}, editedData);
        editedData = extend({}, editedData, this.cellDetails.rowData);
        var value = getObject(column.field, cloneEditedData);
        if (!isNullOrUndefined(column.field)) {
            setValue(column.field, value, editedData);
        }
        var args = {
            columnName: column.field,
            value: getObject(column.field, editedData),
            rowData: this.cellDetails.rowData,
            previousValue: this.cellDetails.value,
            columnObject: column,
            isForeignKey: this.cellDetails.isForeignKey, cancel: false
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            args.cell = this.form.parentElement;
        }
        if (!isForceSave) {
            gObj.trigger(events.cellSave, args, this.successCallBack(args, tr, column));
            gObj.notify(events.batchForm, { formObj: this.form });
        }
        else {
            this.successCallBack(args, tr, column)(args);
        }
    };
    BatchEdit.prototype.successCallBack = function (cellSaveArgs, tr, column) {
        var _this = this;
        return function (cellSaveArgs) {
            var gObj = _this.parent;
            cellSaveArgs.cell = cellSaveArgs.cell ? cellSaveArgs.cell : _this.form.parentElement;
            if (cellSaveArgs.cancel) {
                return;
            }
            gObj.editModule.destroyForm();
            gObj.isEdit = false;
            gObj.editModule.destroyWidgets([column]);
            if (isBlazor() && column.template && !cellSaveArgs.cell.parentElement.classList.contains('e-insertedrow')) {
                updateBlazorTemplate(gObj.element.id + column.uid, 'Template', column, false);
            }
            _this.parent.notify(events.tooltipDestroy, {});
            _this.refreshTD(cellSaveArgs.cell, column, gObj.getRowObjectFromUID(tr.getAttribute('data-uid')), cellSaveArgs.value);
            removeClass([tr], ['e-editedrow', 'e-batchrow']);
            removeClass([cellSaveArgs.cell], ['e-editedbatchcell', 'e-boolcell']);
            if (!isNullOrUndefined(cellSaveArgs.value) && cellSaveArgs.value.toString() ===
                (!isNullOrUndefined(_this.cellDetails.value) ? _this.cellDetails.value : '').toString() && !_this.isColored
                || (isNullOrUndefined(cellSaveArgs.value) && isNullOrUndefined(_this.cellDetails.value) &&
                    !cellSaveArgs.cell.parentElement.classList.contains('e-insertedrow'))) {
                cellSaveArgs.cell.classList.remove('e-updatedtd');
            }
            gObj.trigger(events.cellSaved, cellSaveArgs);
            gObj.notify(events.toolbarRefresh, {});
            _this.isColored = false;
            if (_this.parent.aggregates.length > 0) {
                _this.parent.notify(events.refreshFooterRenderer, {});
                if (_this.parent.groupSettings.columns.length > 0 && !_this.isAddRow(_this.cellDetails.rowIndex)) {
                    _this.parent.notify(events.groupAggregates, {});
                }
            }
        };
    };
    BatchEdit.prototype.getDataByIndex = function (index) {
        var row = this.parent.getRowObjectFromUID(this.parent.getDataRows()[index].getAttribute('data-uid'));
        return row.changes ? row.changes : row.data;
    };
    BatchEdit.prototype.keyDownHandler = function (e) {
        if ((e.action === 'tab' || e.action === 'shiftTab') && this.parent.isEdit) {
            var gObj = this.parent;
            var rowcell = parentsUntil(e.target, 'e-rowcell');
            if (rowcell) {
                var cell = rowcell.querySelector('.e-field');
                if (cell) {
                    var visibleColumns = this.parent.getVisibleColumns();
                    var columnIndex = e.action === 'tab' ? visibleColumns.length - 1 : 0;
                    if (visibleColumns[columnIndex].field === cell.getAttribute('id').slice(this.parent.element.id.length)) {
                        if (this.cellDetails.rowIndex !== gObj.getRows().length - 1) {
                            this.saveCell();
                        }
                        else {
                            if (gObj.editSettings.newRowPosition === 'Top') {
                                gObj.editSettings.newRowPosition = 'Bottom';
                                this.addRecord();
                                gObj.editSettings.newRowPosition = 'Top';
                            }
                            else {
                                this.addRecord();
                            }
                        }
                    }
                }
            }
        }
    };
    /**

     */
    BatchEdit.prototype.addCancelWhilePaging = function () {
        if (this.validateFormObj()) {
            this.parent.notify(events.destroyForm, {});
            this.parent.isEdit = false;
            this.isColored = false;
        }
    };
    return BatchEdit;
}());
export { BatchEdit };
