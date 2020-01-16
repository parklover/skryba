import { closest } from '@syncfusion/ej2-base';
import { extend, getValue, resetBlazorTemplate, isBlazor } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { EditRender } from '../renderer/edit-renderer';
import { BooleanEditCell } from '../renderer/boolean-edit-cell';
import { DropDownEditCell } from '../renderer/dropdown-edit-cell';
import { NumericEditCell } from '../renderer/numeric-edit-cell';
import { DefaultEditCell } from '../renderer/default-edit-cell';
import { InlineEdit } from './inline-edit';
import { BatchEdit } from './batch-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { parentsUntil, getComplexFieldID, setComplexFieldID, getScrollBarWidth } from '../base/util';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DatePickerEditCell } from '../renderer/datepicker-edit-cell';
import { calculateRelativeBasedPosition } from '@syncfusion/ej2-popups';
import { TemplateEditCell } from '../renderer/template-edit-cell';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * The `Edit` module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for the Grid editing module

     */
    function Edit(parent, serviceLocator) {
        this.editType = { 'Inline': InlineEdit, 'Normal': InlineEdit, 'Batch': BatchEdit, 'Dialog': DialogEdit };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.l10n = this.serviceLocator.getService('localization');
        this.addEventListener();
        this.updateEditObj();
        this.createAlertDlg();
        this.createConfirmDlg();
    }
    Edit.prototype.updateColTypeObj = function () {
        var _this = this;
        this.parent.columnModel.forEach(function (col) {
            if (_this.parent.editSettings.template || col.editTemplate) {
                var templteCell = 'templateedit';
                col.edit = extend(new Edit.editCellType[templteCell](_this.parent), col.edit || {});
            }
            else {
                col.edit = extend(new Edit.editCellType[col.editType && Edit.editCellType[col.editType] ?
                    col.editType : 'defaultedit'](_this.parent, _this.serviceLocator), col.edit || {});
            }
        });
        this.parent.log('primary_column_missing');
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**

     */
    Edit.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        var newProp = e.properties;
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowAdding':
                case 'allowDeleting':
                case 'allowEditing':
                    if (gObj.editSettings.allowAdding || gObj.editSettings.allowEditing || gObj.editSettings.allowDeleting) {
                        this.initialEnd();
                    }
                    break;
                case 'mode':
                    this.updateEditObj();
                    gObj.isEdit = false;
                    gObj.refresh();
                    break;
            }
        }
    };
    Edit.prototype.updateEditObj = function () {
        if (this.editModule) {
            this.editModule.destroy();
        }
        this.renderer = new EditRender(this.parent, this.serviceLocator);
        this.editModule = new this.editType[this.parent.editSettings.mode](this.parent, this.serviceLocator, this.renderer);
    };
    Edit.prototype.initialEnd = function () {
        this.updateColTypeObj();
    };
    /**
     * Edits any bound record in the Grid by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     */
    Edit.prototype.startEdit = function (tr) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowEditing || gObj.isEdit || gObj.editSettings.mode === 'Batch') {
            return;
        }
        this.parent.element.classList.add('e-editing');
        if (!gObj.getSelectedRows().length) {
            if (!tr) {
                this.showDialog('EditOperationAlert', this.alertDObj);
                return;
            }
        }
        else if (!tr) {
            tr = gObj.getSelectedRows()[0];
        }
        if (tr.style.display === 'none') {
            return;
        }
        this.editModule.startEdit(tr);
        if (!isBlazor()) {
            this.refreshToolbar();
            gObj.element.querySelector('.e-gridpopup').style.display = 'none';
            this.parent.notify('start-edit', {});
        }
    };
    /**
     * Cancels edited state.
     */
    Edit.prototype.closeEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog
            && this.parent.element.querySelectorAll('.e-updatedtd').length) {
            this.showDialog('CancelEdit', this.dialogObj);
            return;
        }
        this.editModule.closeEdit();
        if (!isBlazor()) {
            this.refreshToolbar();
            this.parent.notify('close-edit', {});
        }
    };
    Edit.prototype.refreshToolbar = function () {
        this.parent.notify(events.toolbarRefresh, {});
    };
    /**
     * To adds a new row at the top with the given data. When data is not passed, it will add empty rows.
     * > `editSettings.allowEditing` should be true.
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     */
    Edit.prototype.addRecord = function (data, index) {
        if (!this.parent.editSettings.allowAdding) {
            return;
        }
        this.parent.element.classList.add('e-editing');
        this.editModule.addRecord(data, index);
        if (!isBlazor()) {
            this.refreshToolbar();
            this.parent.notify('start-add', {});
        }
    };
    /**
     * Deletes a record with the given options. If fieldname and data are not given, the Grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     * @param {string} fieldname - Defines the primary key field name of the column.
     * @param {Object} data - Defines the JSON data record to be deleted.
     */
    Edit.prototype.deleteRecord = function (fieldname, data) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowDeleting) {
            return;
        }
        if (!data) {
            if (!gObj.getSelectedRecords().length) {
                this.showDialog('DeleteOperationAlert', this.alertDObj);
                return;
            }
        }
        if (gObj.editSettings.showDeleteConfirmDialog) {
            this.showDialog('ConfirmDelete', this.dialogObj);
            return;
        }
        this.editModule.deleteRecord(fieldname, data);
    };
    /**
     * Deletes a visible row by TR element.
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     */
    Edit.prototype.deleteRow = function (tr) {
        this.deleteRecord(null, this.parent.getCurrentViewRecords()[parseInt(tr.getAttribute('aria-rowindex'), 10)]);
    };
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     */
    Edit.prototype.endEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog &&
            (isNullOrUndefined(this.formObj) || this.formObj.validate())) {
            this.parent.editModule.saveCell();
            this.parent.notify(events.editNextValCell, {});
            if (isNullOrUndefined(this.formObj) || this.formObj.validate()) {
                this.showDialog('BatchSaveConfirm', this.dialogObj);
                return;
            }
        }
        this.endEditing();
    };
    /**
     * To update the specified cell by given value without changing into edited state.
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     */
    Edit.prototype.updateCell = function (rowIndex, field, value) {
        this.editModule.updateCell(rowIndex, field, value);
    };
    /**
     * To update the specified row by given values without changing into edited state.
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     */
    Edit.prototype.updateRow = function (index, data) {
        this.editModule.updateRow(index, data);
    };
    /**
     * Resets added, edited, and deleted records in the batch mode.
     */
    Edit.prototype.batchCancel = function () {
        this.closeEdit();
    };
    /**
     * Bulk saves added, edited, and deleted records in the batch mode.
     */
    Edit.prototype.batchSave = function () {
        this.endEdit();
    };
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     */
    Edit.prototype.editCell = function (index, field) {
        this.editModule.editCell(index, field);
    };
    /**
     * Checks the status of validation at the time of editing. If validation is passed, it returns true.
     * @return {boolean}
     */
    Edit.prototype.editFormValidate = function () {
        if (this.formObj) {
            return this.formObj.validate();
        }
        return false;
    };
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     * @return {Object}
     */
    Edit.prototype.getBatchChanges = function () {
        return this.editModule.getBatchChanges ? this.editModule.getBatchChanges() : {};
    };
    /**
     * Gets the current value of the edited component.
     */
    Edit.prototype.getCurrentEditCellData = function () {
        var obj = this.getCurrentEditedData(this.formObj.element, {});
        return obj[Object.keys(obj)[0]];
    };
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     */
    Edit.prototype.saveCell = function () {
        this.editModule.saveCell();
    };
    Edit.prototype.endEditing = function () {
        this.parent.element.classList.remove('e-editing');
        this.editModule.endEdit();
        this.refreshToolbar();
    };
    Edit.prototype.showDialog = function (content, obj) {
        obj.content = '<div>' + this.l10n.getConstant(content) + '</div>';
        obj.dataBind();
        obj.show();
    };
    Edit.prototype.getValueFromType = function (col, value) {
        var val = value;
        switch (col.type) {
            case 'number':
                val = !isNaN(parseFloat(value)) ? parseFloat(value) : null;
                break;
            case 'boolean':
                if (col.editType !== 'booleanedit') {
                    val = value === this.l10n.getConstant('True') || value === true ? true : false;
                }
                break;
            case 'date':
            case 'datetime':
                if (col.editType !== 'datepickeredit' && col.editType !== 'datetimepickeredit'
                    && value && value.length) {
                    val = new Date(value);
                }
                else if (value === '') {
                    val = null;
                }
                break;
        }
        return val;
    };
    Edit.prototype.destroyToolTip = function () {
        var elements = [].slice.call(this.parent.element.querySelectorAll('.e-griderror'));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            remove(elem);
        }
        this.parent.getContent().firstElementChild.style.position = 'relative';
    };
    Edit.prototype.createConfirmDlg = function () {
        this.dialogObj = this.dlgWidget([
            {
                click: this.dlgOk.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'), cssClass: 'e-primary', isPrimary: true }
            },
            {
                click: this.dlgCancel.bind(this),
                buttonModel: { cssClass: 'e-flat', content: this.l10n.getConstant('CancelButton') }
            }
        ], 'EditConfirm');
    };
    Edit.prototype.createAlertDlg = function () {
        this.alertDObj = this.dlgWidget([
            {
                click: this.alertClick.bind(this), buttonModel: { content: this.l10n.getConstant('OKButton'), cssClass: 'e-flat', isPrimary: true }
            }
        ], 'EditAlert');
    };
    Edit.prototype.alertClick = function () {
        this.alertDObj.hide();
    };
    Edit.prototype.dlgWidget = function (btnOptions, name) {
        var div = this.parent.createElement('div', { id: this.parent.element.id + name });
        this.parent.element.appendChild(div);
        var options = {
            showCloseIcon: false,
            isModal: true,
            visible: false,
            closeOnEscape: true,
            target: this.parent.element,
            width: '320px',
            animationSettings: { effect: 'None' }
        };
        options.buttons = btnOptions;
        var obj = new Dialog(options);
        var isStringTemplate = 'isStringTemplate';
        obj[isStringTemplate] = true;
        obj.appendTo(div);
        return obj;
    };
    Edit.prototype.dlgCancel = function () {
        this.dialogObj.hide();
    };
    Edit.prototype.dlgOk = function (e) {
        switch (this.dialogObj.element.querySelector('.e-dlg-content').firstElementChild.innerText) {
            case this.l10n.getConstant('ConfirmDelete'):
                this.editModule.deleteRecord();
                break;
            case this.l10n.getConstant('CancelEdit'):
                this.editModule.closeEdit();
                break;
            case this.l10n.getConstant('BatchSaveConfirm'):
                this.endEditing();
                break;
            case this.l10n.getConstant('BatchSaveLostChanges'):
                if (this.parent.editSettings.mode === 'Batch') {
                    this.editModule.addCancelWhilePaging();
                }
                this.executeAction();
                break;
        }
        this.dlgCancel();
    };
    /**

     */
    Edit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.inBoundModelChanged, this.onPropertyChanged, this);
        this.parent.on(events.initialEnd, this.initialEnd, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
        this.parent.on(events.autoCol, this.updateColTypeObj, this);
        this.parent.on(events.tooltipDestroy, this.destroyToolTip, this);
        this.parent.on(events.preventBatch, this.preventBatch, this);
        this.parent.on(events.destroyForm, this.destroyForm, this);
        this.actionBeginFunction = this.onActionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.parent.addEventListener(events.actionBegin, this.actionBeginFunction);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunction);
    };
    /**

     */
    Edit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.inBoundModelChanged, this.onPropertyChanged);
        this.parent.off(events.initialEnd, this.initialEnd);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        this.parent.off(events.autoCol, this.updateColTypeObj);
        this.parent.off(events.tooltipDestroy, this.destroyToolTip);
        this.parent.off(events.preventBatch, this.preventBatch);
        this.parent.off(events.destroyForm, this.destroyForm);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.removeEventListener(events.actionBegin, this.actionBeginFunction);
    };
    Edit.prototype.actionComplete = function (e) {
        var actions = ['add', 'beginEdit', 'save', 'delete', 'cancel'];
        if (actions.indexOf(e.requestType) < 0) {
            this.parent.isEdit = false;
        }
        this.refreshToolbar();
    };
    /**

     */
    Edit.prototype.getCurrentEditedData = function (form, editedData) {
        var _this = this;
        var gObj = this.parent;
        if (gObj.editSettings.template) {
            [].slice.call(form.elements).forEach(function (element) {
                if (element.hasAttribute('name')) {
                    var field = setComplexFieldID(element.getAttribute('name'));
                    var column = gObj.getColumnByField(field) || { field: field, type: element.getAttribute('type') };
                    var value = void 0;
                    if (column.type === 'checkbox' || column.type === 'boolean') {
                        value = element.checked;
                    }
                    else if (element.value) {
                        value = element.value;
                        if (element.ej2_instances &&
                            element.ej2_instances.length &&
                            !isNullOrUndefined(element.ej2_instances[0].value)) {
                            element.blur();
                            value = element.ej2_instances[0].value;
                        }
                    }
                    if (column.edit && typeof column.edit.read === 'string') {
                        value = getValue(column.edit.read, window)(element, value);
                    }
                    else if (column.edit && column.edit.read) {
                        value = column.edit.read(element, value);
                    }
                    value = gObj.editModule.getValueFromType(column, value);
                    DataUtil.setValue(column.field, value, editedData);
                }
            });
            return editedData;
        }
        gObj.columnModel.filter(function (col) { return col.editTemplate; }).forEach(function (col) {
            if (form[getComplexFieldID(col.field)]) {
                var inputElements = [].slice.call(form[getComplexFieldID(col.field)]);
                inputElements = inputElements.length ? inputElements : [form[getComplexFieldID(col.field)]];
                inputElements.forEach(function (input) {
                    var value = _this.getValue(col, input, editedData);
                    DataUtil.setValue(col.field, value, editedData);
                });
            }
        });
        var inputs = [].slice.call(form.querySelectorAll('.e-field'));
        for (var i = 0, len = inputs.length; i < len; i++) {
            var col = gObj.getColumnByUid(inputs[i].getAttribute('e-mappinguid'));
            if (col && col.field) {
                var value = this.getValue(col, inputs[i], editedData);
                DataUtil.setValue(col.field, value, editedData);
            }
        }
        return editedData;
    };
    Edit.prototype.getValue = function (col, input, editedData) {
        var value = col.isForeignColumn() ? (input.ej2_instances ?
            input.ej2_instances[0].value : input.value) : input.value;
        var gObj = this.parent;
        var temp = col.edit.read;
        if (col.type === 'checkbox' || col.type === 'boolean') {
            value = input.checked;
        }
        if (typeof temp === 'string') {
            temp = getValue(temp, window);
            value = gObj.editModule.getValueFromType(col, (temp)(input, value));
        }
        else {
            value = gObj.editModule.getValueFromType(col, col.edit.read(input, value));
        }
        if (isNullOrUndefined(editedData[col.field]) && value === '') {
            value = editedData[col.field];
        }
        return value;
    };
    /**

     */
    Edit.prototype.onActionBegin = function (e) {
        var restrictedRequestTypes = ['filterafteropen', 'filterbeforeopen', 'filterchoicerequest', 'save'];
        if (this.parent.editSettings.mode !== 'Batch' && this.formObj && !this.formObj.isDestroyed
            && restrictedRequestTypes.indexOf(e.requestType) === -1) {
            this.destroyWidgets();
            this.destroyForm();
        }
    };
    /**

     */
    Edit.prototype.destroyWidgets = function (cols) {
        var gObj = this.parent;
        if (gObj.editSettings.template) {
            this.parent.destroyTemplate(['editSettingsTemplate']);
        }
        cols = cols ? cols : this.parent.getColumns();
        if (cols.some(function (column) { return !isNullOrUndefined(column.editTemplate); })) {
            this.parent.destroyTemplate(['editTemplate']);
        }
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            var temp = col.edit.destroy;
            if (isBlazor() && col.editTemplate) {
                resetBlazorTemplate(this.parent.element.id + col.uid + 'editTemplate', 'EditTemplate');
            }
            if (col.edit.destroy) {
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                    temp();
                }
                else {
                    col.edit.destroy();
                }
            }
        }
        [].slice.call(this.formObj.element.elements).forEach(function (element) {
            if (element.hasAttribute('name')) {
                if (element.ej2_instances &&
                    element.ej2_instances.length &&
                    !element.ej2_instances[0].isDestroyed) {
                    element.ej2_instances[0].destroy();
                }
            }
        });
    };
    /**

     */
    Edit.prototype.destroyForm = function () {
        this.destroyToolTip();
        if (this.formObj && !this.formObj.isDestroyed) {
            this.formObj.destroy();
        }
        this.destroyToolTip();
    };
    /**
     * To destroy the editing.
     * @return {void}

     */
    Edit.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement) {
            return;
        }
        var hasGridChild = gridElement.querySelector('.e-gridheader') &&
            gridElement.querySelector('.e-gridcontent') ? true : false;
        if (hasGridChild) {
            this.destroyForm();
        }
        this.removeEventListener();
        var elem = this.dialogObj.element;
        if (elem.childElementCount > 0) {
            this.dialogObj.destroy();
            remove(elem);
        }
        elem = this.alertDObj.element;
        if (elem.childElementCount > 0) {
            this.alertDObj.destroy();
            remove(elem);
        }
        if (!hasGridChild) {
            return;
        }
        if (this.editModule) {
            this.editModule.destroy();
        }
    };
    Edit.prototype.keyPressHandler = function (e) {
        switch (e.action) {
            case 'insert':
                this.addRecord();
                break;
            case 'delete':
                if ((e.target.tagName !== 'INPUT' || e.target.classList.contains('e-checkselect'))
                    && !document.querySelector('.e-popup-open')) {
                    this.deleteRecord();
                }
                break;
            case 'f2':
                this.startEdit();
                break;
            case 'enter':
                if (!parentsUntil(e.target, 'e-unboundcelldiv') && this.parent.editSettings.mode !== 'Batch' &&
                    (parentsUntil(e.target, 'e-gridcontent') || (this.parent.frozenRows
                        && parentsUntil(e.target, 'e-headercontent')))
                    && !document.querySelectorAll('.e-popup-open').length) {
                    e.preventDefault();
                    this.endEdit();
                }
                break;
            case 'escape':
                this.closeEdit();
                break;
        }
    };
    Edit.prototype.preventBatch = function (args) {
        this.preventObj = args;
        this.showDialog('BatchSaveLostChanges', this.dialogObj);
    };
    Edit.prototype.executeAction = function () {
        this.preventObj.handler.call(this.preventObj.instance, this.preventObj.arg1, this.preventObj.arg2, this.preventObj.arg3, this.preventObj.arg4, this.preventObj.arg5, this.preventObj.arg6, this.preventObj.arg7, this.preventObj.arg8);
    };
    /**

     */
    Edit.prototype.applyFormValidation = function (cols) {
        var gObj = this.parent;
        var frzCols = gObj.getFrozenColumns();
        var form = this.parent.editSettings.mode !== 'Dialog' ?
            gObj.element.querySelector('.e-gridform') :
            document.querySelector('#' + gObj.element.id + '_dialogEdit_wrapper').querySelector('.e-gridform');
        var mForm = gObj.element.querySelectorAll('.e-gridform')[1];
        var rules = {};
        var mRules = {};
        cols = cols ? cols : gObj.getColumns();
        cols.forEach(function (col, index) {
            if (!col.visible) {
                return;
            }
            if (index < frzCols && col.validationRules) {
                rules[getComplexFieldID(col.field)] = col.validationRules;
            }
            else if (index >= frzCols && col.validationRules) {
                mRules[getComplexFieldID(col.field)] = col.validationRules;
            }
        });
        if (frzCols && this.parent.editSettings.mode !== 'Dialog') {
            this.parent.editModule.mFormObj = this.createFormObj(mForm, mRules);
        }
        else {
            rules = extend(rules, mRules);
        }
        this.parent.editModule.formObj = this.createFormObj(form, rules);
    };
    Edit.prototype.createFormObj = function (form, rules) {
        var _this = this;
        return new FormValidator(form, {
            rules: rules,
            locale: this.parent.locale,
            validationComplete: function (args) {
                _this.validationComplete(args);
            },
            customPlacement: function (inputElement, error) {
                _this.valErrorPlacement(inputElement, error);
            }
        });
    };
    Edit.prototype.valErrorPlacement = function (inputElement, error) {
        if (this.parent.isEdit) {
            var id = error.getAttribute('for');
            var elem = this.getElemTable(inputElement).querySelector('#' + id + '_Error');
            if (!elem) {
                this.createTooltip(inputElement, error, id, '');
            }
            else {
                elem.querySelector('.e-tip-content').innerHTML = error.outerHTML;
            }
        }
    };
    Edit.prototype.getElemTable = function (inputElement) {
        var isFHdr;
        if (this.parent.editSettings.mode !== 'Dialog') {
            isFHdr = (this.parent.frozenRows && this.parent.frozenRows
                > (parseInt(closest(inputElement, '.e-row').getAttribute('aria-rowindex'), 10) || 0));
        }
        return this.parent.editSettings.mode !== 'Dialog' ? isFHdr ? this.parent.getHeaderTable() : this.parent.getContentTable() :
            document.querySelector('#' + this.parent.element.id + '_dialogEdit_wrapper');
    };
    Edit.prototype.validationComplete = function (args) {
        if (this.parent.isEdit) {
            var elem = this.getElemTable(args.element).querySelector('#' + args.inputName + '_Error');
            if (elem) {
                if (args.status === 'failure') {
                    elem.style.display = '';
                }
                else {
                    elem.style.display = 'none';
                }
            }
        }
    };
    Edit.prototype.createTooltip = function (element, error, name, display) {
        var gcontent = this.parent.getContent().firstElementChild;
        var isScroll = gcontent.scrollHeight > gcontent.clientHeight || gcontent.scrollWidth > gcontent.clientWidth;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        var isFHdr;
        if (isInline) {
            isFHdr = (this.parent.frozenRows && this.parent.frozenRows
                > (parseInt(closest(element, '.e-row').getAttribute('aria-rowindex'), 10) || 0));
        }
        var fCont = this.parent.getContent().querySelector('.e-frozencontent');
        var table = isInline ?
            (isFHdr ? this.parent.getHeaderTable() : this.parent.getContentTable()) :
            document.querySelector('#' + this.parent.element.id + '_dialogEdit_wrapper').querySelector('.e-dlg-content');
        var client = table.getBoundingClientRect();
        var left = isInline ?
            this.parent.element.getBoundingClientRect().left : client.left;
        var input = closest(element, 'td');
        var inputClient = input ? input.getBoundingClientRect() : element.parentElement.getBoundingClientRect();
        var div = this.parent.createElement('div', {
            className: 'e-tooltip-wrap e-lib e-control e-popup e-griderror',
            id: name + '_Error',
            styles: 'display:' + display + ';top:' +
                ((isFHdr ? inputClient.top + inputClient.height : inputClient.bottom - client.top
                    - (this.parent.getFrozenColumns() ? fCont.scrollTop : 0)) + table.scrollTop + 9) + 'px;left:' +
                (inputClient.left - left + table.scrollLeft + inputClient.width / 2) + 'px;' +
                'max-width:' + inputClient.width + 'px;text-align:center;'
        });
        if (isInline && client.left < left) {
            div.style.left = parseInt(div.style.left, 10) - client.left + left + 'px';
        }
        var content = this.parent.createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        var validationForBottomRowPos;
        if (this.parent.editSettings.newRowPosition === 'Bottom' && this.parent.editSettings.mode !== 'Dialog' &&
            ((this.editModule.args && this.editModule.args.requestType === 'add') || this.editModule.isAdded)) {
            validationForBottomRowPos = true;
        }
        var arrow;
        if (validationForBottomRowPos) {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-bottom' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-bottom' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-bottom' }));
        }
        else {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-top' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        }
        div.appendChild(content);
        div.appendChild(arrow);
        if (this.parent.getFrozenColumns() && this.parent.editSettings.mode !== 'Dialog') {
            var getEditCell = this.parent.editSettings.mode === 'Normal' ?
                closest(element, '.e-editcell') : closest(element, '.e-table');
            getEditCell.style.position = 'relative';
            div.style.position = 'absolute';
            if (this.parent.editSettings.mode === 'Batch' ||
                (closest(element, '.e-frozencontent') || closest(element, '.e-frozenheader'))) {
                this.formObj.element.appendChild(div);
            }
            else {
                this.mFormObj.element.appendChild(div);
            }
        }
        else {
            this.formObj.element.appendChild(div);
        }
        if (isInline && gcontent.getBoundingClientRect().bottom < inputClient.bottom + inputClient.height) {
            gcontent.scrollTop = gcontent.scrollTop + div.offsetHeight + arrow.scrollHeight;
        }
        var lineHeight = parseInt(document.defaultView.getComputedStyle(div, null).getPropertyValue('font-size'), 10);
        if (div.getBoundingClientRect().width < inputClient.width &&
            div.querySelector('label').getBoundingClientRect().height / (lineHeight * 1.2) >= 2) {
            div.style.width = div.style.maxWidth;
        }
        if (this.parent.getFrozenColumns() && (this.parent.editSettings.mode === 'Normal' || this.parent.editSettings.mode === 'Batch')) {
            div.style.left = input.offsetLeft + (input.offsetWidth / 2 - div.offsetWidth / 2) + 'px';
        }
        else {
            div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
        }
        if (!isScroll && isInline && !this.parent.allowPaging) {
            gcontent.style.position = 'static';
            var pos = calculateRelativeBasedPosition(input, div);
            div.style.top = pos.top + inputClient.height + 9 + 'px';
        }
        if (validationForBottomRowPos) {
            if (isScroll) {
                var scrollElem = this.parent.getContent().firstElementChild;
                var scrollWidth = scrollElem.scrollWidth > scrollElem.offsetWidth ? getScrollBarWidth() : 0;
                div.style.bottom = (this.parent.height - this.parent.getContentTable().offsetHeight
                    - scrollWidth) + inputClient.height + 9 + 'px';
            }
            else {
                div.style.bottom = inputClient.height + 9 + 'px';
            }
            div.style.top = null;
        }
    };
    /**

     */
    Edit.prototype.checkColumnIsGrouped = function (col) {
        return !col.visible && !(this.parent.groupSettings.columns.indexOf(col.field) > -1);
    };
    /**

     */
    Edit.AddEditors = function (editors) {
        Edit.editCellType = extend(Edit.editCellType, editors);
    };
    Edit.editCellType = {
        'dropdownedit': DropDownEditCell, 'numericedit': NumericEditCell,
        'datepickeredit': DatePickerEditCell, 'datetimepickeredit': DatePickerEditCell,
        'booleanedit': BooleanEditCell, 'defaultedit': DefaultEditCell,
        'templateedit': TemplateEditCell
    };
    return Edit;
}());
export { Edit };
