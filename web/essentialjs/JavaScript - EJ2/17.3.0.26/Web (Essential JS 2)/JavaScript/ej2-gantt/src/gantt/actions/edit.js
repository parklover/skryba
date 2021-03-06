var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isNullOrUndefined, isUndefined, extend, setValue, getValue, deleteObject, createElement, isBlazor } from '@syncfusion/ej2-base';
import { DataManager, DataUtil, Query } from '@syncfusion/ej2-data';
import { getSwapKey, isScheduledTask, getTaskData, isRemoteData, getIndex } from '../base/utils';
import { CellEdit } from './cell-edit';
import { TaskbarEdit } from './taskbar-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';
import { ConnectorLineEdit } from './connector-line-edit';
/**
 * The Edit Module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    function Edit(parent) {
        this.isFromDeleteMethod = false;
        this.targetedRecords = [];
        /**
         * @private
         */
        this.confirmDialog = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        this.isBreakLoop = false;
        /**
         * @private
         */
        this.deletedTaskDetails = [];
        this.parent = parent;
        this.validatedChildItems = [];
        if (this.parent.editSettings.allowEditing && this.parent.editSettings.mode === 'Auto') {
            this.cellEditModule = new CellEdit(this.parent);
        }
        if (this.parent.taskFields.dependency) {
            this.parent.connectorLineEditModule = new ConnectorLineEdit(this.parent);
        }
        if (this.parent.editSettings.allowAdding || (this.parent.editSettings.allowEditing &&
            (this.parent.editSettings.mode === 'Dialog' || this.parent.editSettings.mode === 'Auto'))) {
            this.dialogModule = new DialogEdit(this.parent);
            if (this.parent.editSettings.mode === 'Dialog') {
                this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
            }
        }
        if (this.parent.editSettings.allowTaskbarEditing) {
            this.taskbarEditModule = new TaskbarEdit(this.parent);
        }
        if (this.parent.editSettings.allowDeleting) {
            var confirmDialog = createElement('div', {
                id: this.parent.element.id + '_deleteConfirmDialog',
            });
            this.parent.element.appendChild(confirmDialog);
            this.renderDeleteConfirmDialog();
        }
        this.parent.treeGrid.editSettings.allowAdding = this.parent.editSettings.allowAdding;
        this.parent.treeGrid.editSettings.allowDeleting = this.parent.editSettings.allowDeleting;
        this.parent.treeGrid.editSettings.showDeleteConfirmDialog = this.parent.editSettings.showDeleteConfirmDialog;
        this.updateDefaultColumnEditors();
    }
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * Method to update default edit params and editors for Gantt
     */
    Edit.prototype.updateDefaultColumnEditors = function () {
        var customEditorColumns = [this.parent.taskFields.id, this.parent.taskFields.progress, this.parent.taskFields.resourceInfo];
        for (var i = 0; i < customEditorColumns.length; i++) {
            if (!isNullOrUndefined(customEditorColumns[i]) && customEditorColumns[i].length > 0) {
                var column = this.parent.getColumnByField(customEditorColumns[i], this.parent.treeGridModule.treeGridColumns);
                if (column) {
                    if (column.field === this.parent.taskFields.id) {
                        this.updateIDColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.progress) {
                        this.updateProgessColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.resourceInfo) {
                        this.updateResourceColumnEditor(column);
                    }
                }
            }
        }
    };
    /**
     * Method to update editors for id column in Gantt
     */
    Edit.prototype.updateIDColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            decimals: 0,
            validateDecimalOnType: true,
            format: 'n0',
            showSpinButton: false
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Method to update edit params of default progress column
     */
    Edit.prototype.updateProgessColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            decimals: 0,
            validateDecimalOnType: true,
            max: 100,
            format: 'n0'
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Assign edit params for id and progress columns
     */
    Edit.prototype.updateEditParams = function (column, editParam) {
        if (isNullOrUndefined(column.edit)) {
            column.edit = {};
            column.edit.params = {};
        }
        else if (isNullOrUndefined(column.edit.params)) {
            column.edit.params = {};
        }
        extend(column.edit.params, editParam);
        var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
        ganttColumn.edit = column.edit;
    };
    /**
     * Method to update resource column editor for default resource column
     */
    Edit.prototype.updateResourceColumnEditor = function (column) {
        if (this.parent.editSettings.allowEditing && isNullOrUndefined(column.edit) && this.parent.editSettings.mode === 'Auto') {
            column.editType = 'dropdownedit';
            column.edit = this.getResourceEditor();
            var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
            ganttColumn.editType = 'dropdownedit';
            ganttColumn.edit = column.edit;
        }
    };
    /**
     * Method to create resource custom editor
     */
    Edit.prototype.getResourceEditor = function () {
        var _this = this;
        var editObject = {};
        var editor;
        MultiSelect.Inject(CheckBoxSelection);
        editObject.write = function (args) {
            _this.parent.treeGridModule.currentEditRow = {};
            editor = new MultiSelect({
                dataSource: new DataManager(_this.parent.resources),
                fields: { text: _this.parent.resourceNameMapping, value: _this.parent.resourceIDMapping },
                mode: 'CheckBox',
                showDropDownIcon: true,
                popupHeight: '350px',
                delimiterChar: ',',
                value: _this.parent.treeGridModule.getResourceIds(args.rowData)
            });
            editor.appendTo(args.element);
        };
        editObject.read = function (element) {
            var value = element.ej2_instances[0].value;
            var resourcesName = [];
            if (isNullOrUndefined(value)) {
                value = [];
            }
            for (var i = 0; i < value.length; i++) {
                for (var j = 0; j < _this.parent.resources.length; j++) {
                    if (_this.parent.resources[j][_this.parent.resourceIDMapping] === value[i]) {
                        resourcesName.push(_this.parent.resources[j][_this.parent.resourceNameMapping]);
                        break;
                    }
                }
            }
            _this.parent.treeGridModule.currentEditRow[_this.parent.taskFields.resourceInfo] = value;
            return resourcesName.join(',');
        };
        editObject.destroy = function () {
            if (editor) {
                editor.destroy();
            }
        };
        return editObject;
    };
    /**
     * @private
     */
    Edit.prototype.reUpdateEditModules = function () {
        var editSettings = this.parent.editSettings;
        if (editSettings.allowEditing) {
            if (this.parent.editModule.cellEditModule && editSettings.mode === 'Dialog') {
                this.cellEditModule.destroy();
                this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
            }
            else if (isNullOrUndefined(this.parent.editModule.cellEditModule) && editSettings.mode === 'Auto') {
                this.cellEditModule = new CellEdit(this.parent);
            }
            if (this.parent.editModule.dialogModule && editSettings.mode === 'Auto') {
                this.parent.treeGrid.recordDoubleClick = undefined;
            }
            else if (isNullOrUndefined(this.parent.editModule.dialogModule)) {
                this.dialogModule = new DialogEdit(this.parent);
            }
            if (isNullOrUndefined(this.parent.editModule.taskbarEditModule)) {
                this.taskbarEditModule = new TaskbarEdit(this.parent);
            }
        }
        else {
            if (this.cellEditModule) {
                this.cellEditModule.destroy();
            }
            if (this.taskbarEditModule) {
                this.taskbarEditModule.destroy();
            }
            if (this.dialogModule) {
                this.dialogModule.destroy();
            }
        }
        if (editSettings.allowDeleting && editSettings.showDeleteConfirmDialog) {
            if (isNullOrUndefined(this.confirmDialog)) {
                var confirmDialog = createElement('div', {
                    id: this.parent.element.id + '_deleteConfirmDialog',
                });
                this.parent.element.appendChild(confirmDialog);
                this.renderDeleteConfirmDialog();
            }
        }
        else if (!editSettings.allowDeleting || !editSettings.showDeleteConfirmDialog) {
            if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
                this.confirmDialog.destroy();
            }
        }
    };
    Edit.prototype.recordDoubleClick = function (args) {
        var ganttData;
        if (args.row) {
            var rowIndex = getValue('rowIndex', args.row);
            ganttData = this.parent.currentViewData[rowIndex];
        }
        if (!isNullOrUndefined(ganttData) && this.parent.editSettings.allowEditing) {
            this.dialogModule.openEditDialog(ganttData);
        }
    };
    /**
     * @private
     */
    Edit.prototype.destroy = function () {
        if (this.cellEditModule) {
            this.cellEditModule.destroy();
        }
        if (this.taskbarEditModule) {
            this.taskbarEditModule.destroy();
        }
        if (this.dialogModule) {
            this.dialogModule.destroy();
        }
        if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
            this.confirmDialog.destroy();
        }
    };
    /**
     * Method to update record with new values.
     * @param {Object} data - Defines new data to update.
     */
    Edit.prototype.updateRecordByID = function (data) {
        var tasks = this.parent.taskFields;
        if (isNullOrUndefined(data) || isNullOrUndefined(data[tasks.id])) {
            return;
        }
        var ganttData = this.parent.getRecordByID(data[tasks.id]);
        if (isBlazor()) {
            var keys = Object.keys(data);
            if (keys.indexOf(tasks.startDate) !== -1 && !isNullOrUndefined(getValue(this.parent.taskFields.startDate, data))) {
                setValue(this.parent.taskFields.startDate, this.parent.dataOperation.getDateFromFormat(getValue(this.parent.taskFields.startDate, data)), data);
            }
            if (keys.indexOf(tasks.endDate) !== -1 && !isNullOrUndefined(getValue(this.parent.taskFields.endDate, data))) {
                setValue(this.parent.taskFields.endDate, this.parent.dataOperation.getDateFromFormat(getValue(this.parent.taskFields.endDate, data)), data);
            }
            /* tslint:disable-next-line */
            if (keys.indexOf(tasks.baselineStartDate) !== -1 && !isNullOrUndefined(getValue(this.parent.taskFields.baselineStartDate, data))) {
                setValue(this.parent.taskFields.baselineStartDate, this.parent.dataOperation.getDateFromFormat(getValue(this.parent.taskFields.baselineStartDate, data)), data);
            }
            if (keys.indexOf(tasks.baselineEndDate) !== -1 && !isNullOrUndefined(getValue(this.parent.taskFields.baselineEndDate, data))) {
                setValue(this.parent.taskFields.baselineEndDate, this.parent.dataOperation.getDateFromFormat(getValue(this.parent.taskFields.baselineEndDate, data)), data);
            }
        }
        if (!isNullOrUndefined(this.parent.editModule) && ganttData) {
            this.parent.isOnEdit = true;
            this.validateUpdateValues(data, ganttData, true);
            var keys = Object.keys(data);
            if (keys.indexOf(tasks.startDate) !== -1 || keys.indexOf(tasks.endDate) !== -1 ||
                keys.indexOf(tasks.duration) !== -1) {
                this.parent.dataOperation.calculateScheduledValues(ganttData, ganttData.taskData, false);
            }
            this.parent.dataOperation.updateWidthLeft(ganttData);
            if (!isUndefined(data[this.parent.taskFields.dependency]) &&
                data[this.parent.taskFields.dependency] !== ganttData.ganttProperties.predecessorsName) {
                this.parent.connectorLineEditModule.updatePredecessor(ganttData, data[this.parent.taskFields.dependency]);
            }
            else {
                var args = {};
                args.data = ganttData;
                this.parent.editModule.initiateUpdateAction(args);
            }
        }
    };
    /**
     *
     * @param data
     * @param ganttData
     * @param isFromDialog
     * @private
     */
    Edit.prototype.validateUpdateValues = function (data, ganttData, isFromDialog) {
        var ganttObj = this.parent;
        var tasks = ganttObj.taskFields;
        var ganttPropByMapping = getSwapKey(ganttObj.columnMapping);
        var scheduleFieldNames = [];
        var isScheduleValueUpdated = false;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            if (isNullOrUndefined(key) || isNullOrUndefined(data[key])) {
                continue;
            }
            if ([tasks.startDate, tasks.endDate, tasks.duration].indexOf(key) !== -1) {
                if (isFromDialog) {
                    if (tasks.duration === key) {
                        ganttObj.dataOperation.updateDurationValue(data[key], ganttData.ganttProperties);
                        if (ganttData.ganttProperties.duration > 0 && ganttData.ganttProperties.isMilestone) {
                            this.parent.setRecordValue('isMilestone', false, ganttData.ganttProperties, true);
                        }
                        ganttObj.dataOperation.updateMappingData(ganttData, ganttPropByMapping[key]);
                    }
                    else {
                        ganttObj.setRecordValue(ganttPropByMapping[key], data[key], ganttData.ganttProperties, true);
                        ganttObj.dataOperation.updateMappingData(ganttData, ganttPropByMapping[key]);
                    }
                }
                else {
                    scheduleFieldNames.push(key);
                    isScheduleValueUpdated = true;
                }
            }
            else if (tasks.resourceInfo === key) {
                var resourceData = ganttObj.dataOperation.setResourceInfo(data);
                ganttData.ganttProperties.resourceInfo = resourceData;
                ganttObj.dataOperation.updateMappingData(ganttData, 'resourceInfo');
            }
            else if (tasks.dependency === key) {
                //..
            }
            else if ([tasks.progress, tasks.notes, tasks.durationUnit, tasks.expandState,
                tasks.milestone, tasks.name, tasks.baselineStartDate,
                tasks.baselineEndDate, tasks.indicators, tasks.id].indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* tslint:disable-next-line */
                var value = data[key];
                if (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') {
                    value = ganttObj.dataOperation.getDateFromFormat(value);
                }
                var ganttPropKey = ganttPropByMapping[key];
                if (key === tasks.id) {
                    ganttPropKey = 'taskId';
                }
                else if (key === tasks.name) {
                    ganttPropKey = 'taskName';
                }
                ganttObj.setRecordValue(ganttPropKey, value, ganttData.ganttProperties, true);
                if ((key === tasks.baselineStartDate || key === tasks.baselineEndDate) &&
                    (ganttData.ganttProperties.baselineStartDate && ganttData.ganttProperties.baselineEndDate)) {
                    ganttObj.setRecordValue('baselineLeft', ganttObj.dataOperation.calculateBaselineLeft(ganttData.ganttProperties), ganttData.ganttProperties, true);
                    ganttObj.setRecordValue('baselineWidth', ganttObj.dataOperation.calculateBaselineWidth(ganttData.ganttProperties), ganttData.ganttProperties, true);
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (ganttObj.customColumns.indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* tslint:disable-next-line */
                var value = data[key];
                if (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') {
                    value = ganttObj.dataOperation.getDateFromFormat(value);
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
        }
        if (isScheduleValueUpdated) {
            this.validateScheduleValues(scheduleFieldNames, ganttData, data);
        }
    };
    Edit.prototype.validateScheduleValues = function (fieldNames, ganttData, data) {
        var ganttObj = this.parent;
        if (fieldNames.length > 2) {
            ganttObj.dataOperation.calculateScheduledValues(ganttData, data, false);
        }
        else if (fieldNames.length > 1) {
            this.validateScheduleByTwoValues(data, fieldNames, ganttData);
        }
        else {
            this.dialogModule.validateScheduleValuesByCurrentField(fieldNames[0], data[fieldNames[0]], ganttData);
        }
    };
    Edit.prototype.validateScheduleByTwoValues = function (data, fieldNames, ganttData) {
        var ganttObj = this.parent;
        var startDate;
        var endDate;
        var duration;
        var tasks = ganttObj.taskFields;
        var ganttProp = ganttData.ganttProperties;
        var isUnscheduledTask = ganttObj.allowUnscheduledTasks;
        if (fieldNames.indexOf(tasks.startDate) !== -1) {
            startDate = data[tasks.startDate];
        }
        if (fieldNames.indexOf(tasks.endDate) !== -1) {
            endDate = data[tasks.endDate];
        }
        if (fieldNames.indexOf(tasks.duration) !== -1) {
            duration = data[tasks.duration];
        }
        if (startDate && endDate || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1) &&
            (fieldNames.indexOf(tasks.endDate) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.calculateDuration(ganttData);
        }
        else if (endDate && duration || (isUnscheduledTask &&
            (fieldNames.indexOf(tasks.endDate) !== -1) && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
        else if (startDate && duration || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1)
            && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
    };
    Edit.prototype.isTaskbarMoved = function (data) {
        var isMoved = false;
        var taskData = data.ganttProperties;
        var prevData = this.parent.previousRecords &&
            this.parent.previousRecords[data.uniqueID];
        if (prevData && prevData.ganttProperties) {
            var prevStart = getValue('ganttProperties.startDate', prevData);
            var prevEnd = getValue('ganttProperties.endDate', prevData);
            var prevDuration = getValue('ganttProperties.duration', prevData);
            var prevDurationUnit = getValue('ganttProperties.durationUnit', prevData);
            var keys = Object.keys(prevData.ganttProperties);
            if (keys.indexOf('startDate') !== -1 || keys.indexOf('endDate') !== -1 ||
                keys.indexOf('duration') !== -1 || keys.indexOf('durationUnit') !== -1) {
                if ((isNullOrUndefined(prevStart) && !isNullOrUndefined(taskData.startDate)) ||
                    (isNullOrUndefined(prevEnd) && !isNullOrUndefined(taskData.endDate)) ||
                    (isNullOrUndefined(taskData.startDate) && !isNullOrUndefined(prevStart)) ||
                    (isNullOrUndefined(taskData.endDate) && !isNullOrUndefined(prevEnd)) ||
                    (prevStart && prevStart.getTime() !== taskData.startDate.getTime())
                    || (prevEnd && prevEnd.getTime() !== taskData.endDate.getTime())
                    || (!isNullOrUndefined(prevDuration) && prevDuration !== taskData.duration)
                    || (!isNullOrUndefined(prevDuration) && prevDuration === taskData.duration &&
                        prevDurationUnit !== taskData.durationUnit)) {
                    isMoved = true;
                }
            }
        }
        return isMoved;
    };
    Edit.prototype.isPredecessorUpdated = function (data) {
        var isPredecessorUpdated = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        if (prevData && prevData.ganttProperties && prevData.ganttProperties.hasOwnProperty('predecessor')) {
            if (data.ganttProperties.predecessorsName !== prevData.ganttProperties.predecessorsName) {
                isPredecessorUpdated = true;
            }
            else {
                this.parent.setRecordValue('predecessor', prevData.ganttProperties.predecessor, data.ganttProperties, true);
            }
        }
        return isPredecessorUpdated;
    };
    /**
     * Method to check need to open predecessor validate dialog
     * @param data
     */
    Edit.prototype.isCheckPredecessor = function (data) {
        var isValidatePredecessor = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        if (prevData && this.parent.taskFields.dependency && this.parent.isInPredecessorValidation &&
            this.parent.predecessorModule.getValidPredecessor(data).length > 0) {
            if (this.isTaskbarMoved(data)) {
                isValidatePredecessor = true;
            }
        }
        return isValidatePredecessor;
    };
    /**
     * Method to update all dependent record on edit action
     * @param args
     * @private
     */
    Edit.prototype.initiateUpdateAction = function (args) {
        var isValidatePredecessor = this.isCheckPredecessor(args.data);
        this.taskbarMoved = this.isTaskbarMoved(args.data);
        this.predecessorUpdated = this.isPredecessorUpdated(args.data);
        if (this.predecessorUpdated) {
            this.parent.isConnectorLineUpdate = true;
            this.parent.connectorLineEditModule.addRemovePredecessor(args.data);
        }
        var validateObject = {};
        if (isValidatePredecessor) {
            validateObject = this.parent.connectorLineEditModule.validateTypes(args.data);
            this.parent.isConnectorLineUpdate = true;
            if (!isNullOrUndefined(getValue('violationType', validateObject))) {
                var newArgs = this.validateTaskEvent(args);
                if (newArgs.validateMode.preserveLinkWithEditing === false &&
                    newArgs.validateMode.removeLink === false &&
                    newArgs.validateMode.respectLink === false) {
                    this.parent.connectorLineEditModule.openValidationDialog(validateObject);
                }
                else {
                    this.parent.connectorLineEditModule.applyPredecessorOption();
                }
            }
            else {
                this.updateEditedTask(args);
            }
        }
        else {
            if (this.taskbarMoved) {
                this.parent.isConnectorLineUpdate = true;
            }
            this.updateEditedTask(args);
        }
    };
    /**
     *
     * @param data method to trigger validate predecessor link by dialog
     */
    Edit.prototype.validateTaskEvent = function (editedEventArgs) {
        var newArgs = {};
        var blazorArgs = {};
        this.resetValidateArgs();
        this.parent.currentEditedArgs = newArgs;
        newArgs.cancel = false;
        newArgs.data = editedEventArgs.data;
        newArgs.requestType = 'validateLinkedTask';
        newArgs.validateMode = this.parent.dialogValidateMode;
        newArgs.editEventArgs = editedEventArgs;
        if (isBlazor()) {
            blazorArgs = __assign({}, newArgs);
            this.parent.updateDataArgs(newArgs);
            this.parent.currentEditedArgs = blazorArgs;
        }
        this.parent.actionBeginTask(newArgs);
        return isBlazor() ? blazorArgs : newArgs;
    };
    Edit.prototype.resetValidateArgs = function () {
        this.parent.dialogValidateMode.preserveLinkWithEditing = true;
        this.parent.dialogValidateMode.removeLink = false;
        this.parent.dialogValidateMode.respectLink = false;
    };
    /**
     *
     * @param args - Edited event args like taskbar editing, dialog editing, cell editing
     * @private
     */
    Edit.prototype.updateEditedTask = function (args) {
        var ganttRecord = args.data;
        /** Update parent up-to zeroth level */
        if (ganttRecord.parentItem) {
            this.parent.dataOperation.updateParentItems(ganttRecord.parentItem);
        }
        this.updateParentChildRecord(ganttRecord);
        if (this.parent.isConnectorLineUpdate) {
            /* validating predecessor for updated child items */
            for (var i = 0; i < this.validatedChildItems.length; i++) {
                var child = this.validatedChildItems[i];
                if (child.ganttProperties.predecessor && child.ganttProperties.predecessor.length > 0) {
                    this.parent.editedTaskBarItem = child;
                    this.parent.predecessorModule.validatePredecessor(child, [], '');
                }
            }
            /** validating predecessor for current edited records */
            if (ganttRecord.ganttProperties.predecessor) {
                this.parent.isMileStoneEdited = ganttRecord.ganttProperties.isMilestone;
                if (this.taskbarMoved) {
                    this.parent.editedTaskBarItem = ganttRecord;
                }
                this.parent.predecessorModule.validatePredecessor(ganttRecord, [], '');
            }
        }
        this.initiateSaveAction(args);
    };
    /**
     * To update parent records while perform drag action.
     * @return {void}
     * @private
     */
    Edit.prototype.updateParentChildRecord = function (data) {
        var ganttRecord = data;
        if (ganttRecord.hasChildRecords && this.taskbarMoved) {
            this.updateChildItems(ganttRecord);
        }
    };
    /**
     *
     * @param data
     * @param newStartDate
     */
    Edit.prototype.calculateDateByRoundOffDuration = function (data, newStartDate) {
        var ganttRecord = data;
        var taskData = ganttRecord.ganttProperties;
        var projectStartDate = new Date(newStartDate.getTime());
        if (!isNullOrUndefined(taskData.endDate) && isNullOrUndefined(taskData.startDate)) {
            var endDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, null);
            this.parent.setRecordValue('endDate', this.parent.dateValidationModule.checkEndDate(endDate, ganttRecord.ganttProperties), taskData, true);
        }
        else {
            this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData), taskData, true);
            if (!isNullOrUndefined(taskData.duration)) {
                this.parent.dateValidationModule.calculateEndDate(ganttRecord);
            }
        }
        this.parent.dataOperation.updateWidthLeft(data);
        this.parent.dataOperation.updateTaskData(ganttRecord);
    };
    /**
     * To update progress value of parent tasks
     * @param cloneParent
     * @private
     */
    Edit.prototype.updateParentProgress = function (cloneParent) {
        var parentProgress = 0;
        var parent = this.parent.getParentTask(cloneParent);
        var childRecords = parent.childRecords;
        var childCount = childRecords ? childRecords.length : 0;
        var totalProgress = 0;
        var milesStoneCount = 0;
        var taskCount = 0;
        var totalDuration = 0;
        var progressValues = {};
        if (childRecords) {
            for (var i = 0; i < childCount; i++) {
                if ((!childRecords[i].ganttProperties.isMilestone || childRecords[i].hasChildRecords) &&
                    isScheduledTask(childRecords[i].ganttProperties)) {
                    progressValues = this.parent.dataOperation.getParentProgress(childRecords[i]);
                    totalProgress += getValue('totalProgress', progressValues);
                    totalDuration += getValue('totalDuration', progressValues);
                }
                else {
                    milesStoneCount += 1;
                }
            }
            taskCount = childCount - milesStoneCount;
            parentProgress = taskCount > 0 ? Math.round(totalProgress / totalDuration) : 0;
            if (isNaN(parentProgress)) {
                parentProgress = 0;
            }
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(parent.ganttProperties.width, parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('progress', Math.floor(parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('totalProgress', totalProgress, parent.ganttProperties, true);
            this.parent.setRecordValue('totalDuration', totalDuration, parent.ganttProperties, true);
        }
        this.parent.dataOperation.updateTaskData(parent);
        if (parent.parentItem) {
            this.updateParentProgress(parent.parentItem);
        }
    };
    /**
     * Method to revert cell edit action
     * @param args
     * @private
     */
    Edit.prototype.revertCellEdit = function (args) {
        this.parent.editModule.reUpdatePreviousRecords(false, true);
        this.resetEditProperties();
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.reUpdatePreviousRecords = function (isRefreshChart, isRefreshGrid) {
        var collection = this.parent.previousRecords;
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var uniqueId = keys[i];
            var prevTask = collection[uniqueId];
            var originalData = this.parent.getTaskByUniqueID(uniqueId);
            this.copyTaskData(originalData.taskData, prevTask.taskData);
            delete prevTask.taskData;
            this.copyTaskData(originalData.ganttProperties, prevTask.ganttProperties);
            delete prevTask.ganttProperties;
            this.copyTaskData(originalData, prevTask);
            var rowIndex = this.parent.currentViewData.indexOf(originalData);
            if (isRefreshChart) {
                this.parent.chartRowsModule.refreshRow(rowIndex);
            }
            if (isRefreshGrid) {
                this.parent.treeGrid.grid.setRowData(originalData.ganttProperties.taskId, originalData);
                var row = this.parent.treeGrid.grid.getRowObjectFromUID(this.parent.treeGrid.grid.getDataRows()[rowIndex].getAttribute('data-uid'));
                row.data = originalData;
            }
        }
    };
    /**
     * Copy previous task data value to edited task data
     * @param existing
     * @param newValue
     */
    Edit.prototype.copyTaskData = function (existing, newValue) {
        if (!isNullOrUndefined(newValue)) {
            extend(existing, newValue);
        }
    };
    /**
     * To update schedule date on editing.
     * @return {void}
     * @private
     */
    Edit.prototype.updateScheduleDatesOnEditing = function (args) {
        //..
    };
    /**
     *
     * @param ganttRecord
     */
    Edit.prototype.updateChildItems = function (ganttRecord) {
        var previousData = this.parent.previousRecords[ganttRecord.uniqueID];
        var previousStartDate;
        if (isNullOrUndefined(previousData) ||
            (isNullOrUndefined(previousData) && !isNullOrUndefined(previousData.ganttProperties))) {
            previousStartDate = new Date(ganttRecord.ganttProperties.startDate.getTime());
        }
        else {
            previousStartDate = new Date(previousData.ganttProperties.startDate.getTime());
        }
        var currentStartDate = ganttRecord.ganttProperties.startDate;
        var childRecords = [];
        var validStartDate;
        var validEndDate;
        var calcEndDate;
        var isRightMove;
        var durationDiff;
        this.getUpdatableChildRecords(ganttRecord, childRecords);
        if (childRecords.length === 0) {
            return;
        }
        if (previousStartDate.getTime() > currentStartDate.getTime()) {
            validStartDate = this.parent.dateValidationModule.checkStartDate(currentStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(previousStartDate, ganttRecord.ganttProperties);
            isRightMove = false;
        }
        else {
            validStartDate = this.parent.dateValidationModule.checkStartDate(previousStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(currentStartDate, ganttRecord.ganttProperties);
            isRightMove = true;
        }
        //Get Duration
        if (validStartDate.getTime() >= validEndDate.getTime()) {
            durationDiff = 0;
        }
        else {
            durationDiff = this.parent.dateValidationModule.getDuration(validStartDate, validEndDate, 'minute', true, false);
        }
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                if (durationDiff > 0) {
                    var startDate = isScheduledTask(childRecords[i].ganttProperties) ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.startDate ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.endDate ?
                        childRecords[i].ganttProperties.endDate : new Date(previousStartDate.toString());
                    if (isRightMove) {
                        calcEndDate = this.parent.dateValidationModule.getEndDate(this.parent.dateValidationModule.checkStartDate(startDate, childRecords[i].ganttProperties, childRecords[i].ganttProperties.isMilestone), durationDiff, 'minute', childRecords[i].ganttProperties, false);
                    }
                    else {
                        calcEndDate = this.parent.dateValidationModule.getStartDate(this.parent.dateValidationModule.checkEndDate(startDate, childRecords[i].ganttProperties), durationDiff, 'minute', childRecords[i].ganttProperties);
                    }
                    this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
                else if (isNullOrUndefined(previousData)) {
                    calcEndDate = previousStartDate;
                    this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
            }
        }
    };
    /**
     * To get updated child records.
     * @param parentRecord
     * @param childLists
     */
    Edit.prototype.getUpdatableChildRecords = function (parentRecord, childLists) {
        var childRecords = parentRecord.childRecords;
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                childLists.push(childRecords[i]);
                if (childRecords[i].hasChildRecords) {
                    this.getUpdatableChildRecords(childRecords[i], childLists);
                }
            }
        }
    };
    /**
     *
     * @private
     */
    Edit.prototype.initiateSaveAction = function (args) {
        var _this = this;
        this.parent.showSpinner();
        var eventArgs = {};
        var modifiedTaskData = [];
        eventArgs.requestType = 'beforeSave';
        eventArgs.data = args.data;
        eventArgs.modifiedRecords = this.parent.editedRecords;
        eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords);
        if (isBlazor()) {
            eventArgs = this.parent.updateDataArgs(eventArgs);
            modifiedTaskData = eventArgs.modifiedTaskData;
        }
        this.parent.trigger('actionBegin', eventArgs, function (eventArgs) {
            if (eventArgs.cancel) {
                _this.reUpdatePreviousRecords();
                _this.parent.chartRowsModule.refreshRecords([args.data]);
                _this.resetEditProperties();
                // Trigger action complete event with save canceled request type
            }
            else {
                if (isRemoteData(_this.parent.dataSource)) {
                    var data = _this.parent.dataSource;
                    var updatedData = {
                        changedRecords: isBlazor() ? modifiedTaskData : eventArgs.modifiedTaskData
                    };
                    /* tslint:disable-next-line */
                    var crud = data.saveChanges(updatedData, _this.parent.taskFields.id, null, new Query());
                    crud.then(function (e) { return _this.dmSuccess(e, args); })
                        .catch(function (e) { return _this.dmFailure(e, args); });
                }
                else {
                    _this.saveSuccess(args);
                }
            }
        });
    };
    Edit.prototype.dmSuccess = function (e, args) {
        this.saveSuccess(args);
    };
    Edit.prototype.dmFailure = function (e, args) {
        if (this.deletedTaskDetails.length) {
            var deleteRecords = this.deletedTaskDetails;
            for (var d = 0; d < deleteRecords.length; d++) {
                deleteRecords[d].isDelete = false;
            }
            this.deletedTaskDetails = [];
        }
        this.reUpdatePreviousRecords(true, true);
        this.resetEditProperties();
        this.parent.trigger('actionFailure', { error: e });
    };
    /**
     * Method for save action success for local and remote data
     */
    Edit.prototype.saveSuccess = function (args) {
        var eventArgs = {};
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = this.parent.editedRecords;
            this.parent.timelineModule.updateTimeLineOnEditing(tempArray, args.action);
        }
        this.parent.chartRowsModule.refreshRecords(this.parent.editedRecords);
        if (this.parent.isConnectorLineUpdate && !isNullOrUndefined(this.parent.connectorLineEditModule)) {
            this.parent.updatedConnectorLineCollection = [];
            this.parent.connectorLineIds = [];
            this.parent.connectorLineEditModule.refreshEditedRecordConnectorLine(this.parent.editedRecords);
            this.updateScheduleDatesOnEditing(args);
        }
        eventArgs.requestType = 'save';
        eventArgs.data = args.data;
        eventArgs.modifiedRecords = this.parent.editedRecords;
        eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords);
        if (!isNullOrUndefined(args.action)) {
            setValue('action', args.action, eventArgs);
        }
        this.endEditAction(args);
        if (isBlazor()) {
            this.parent.updateDataArgs(eventArgs);
        }
        this.parent.trigger('actionComplete', eventArgs);
    };
    Edit.prototype.resetEditProperties = function () {
        this.parent.currentEditedArgs = {};
        this.resetValidateArgs();
        this.parent.editedTaskBarItem = null;
        this.parent.isOnEdit = false;
        this.validatedChildItems = [];
        this.parent.isConnectorLineUpdate = false;
        this.parent.editedTaskBarItem = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        if (!isNullOrUndefined(this.dialogModule)) {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
        this.parent.hideSpinner();
        this.parent.initiateEditAction(false);
    };
    /**
     * @private
     */
    Edit.prototype.endEditAction = function (args) {
        this.resetEditProperties();
        if (args.action === 'TaskbarEditing') {
            this.parent.trigger('taskbarEdited', args);
        }
        else if (args.action === 'CellEditing') {
            this.parent.trigger('endEdit', args);
        }
        else if (args.action === 'DialogEditing') {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
    };
    Edit.prototype.saveFailed = function (args) {
        this.reUpdatePreviousRecords();
        this.parent.hideSpinner();
        //action failure event trigger
    };
    /**
     * To render delete confirmation dialog
     * @return {void}
     */
    Edit.prototype.renderDeleteConfirmDialog = function () {
        var dialogObj = new Dialog({
            width: '320px',
            isModal: true,
            visible: false,
            content: this.parent.localeObj.getConstant('confirmDelete'),
            buttons: [
                {
                    click: this.confirmDeleteOkButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.closeConfirmDialog.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' },
        });
        dialogObj.appendTo('#' + this.parent.element.id + '_deleteConfirmDialog');
        this.confirmDialog = dialogObj;
    };
    Edit.prototype.closeConfirmDialog = function () {
        this.confirmDialog.hide();
    };
    Edit.prototype.confirmDeleteOkButton = function () {
        this.deleteSelectedItems();
        this.confirmDialog.hide();
        var focussedElement = this.parent.element.querySelector('.e-treegrid');
        focussedElement.focus();
    };
    /**
     * @private
     */
    Edit.prototype.startDeleteAction = function () {
        if (this.parent.editSettings.allowDeleting) {
            if (this.parent.editSettings.showDeleteConfirmDialog) {
                this.confirmDialog.show();
            }
            else {
                this.deleteSelectedItems();
            }
        }
    };
    Edit.prototype.deleteSelectedItems = function () {
        if (!this.isFromDeleteMethod) {
            var selectedRecords = [];
            if (this.parent.selectionSettings.mode !== 'Cell') {
                selectedRecords = this.parent.selectionModule.getSelectedRecords();
            }
            else if (this.parent.selectionSettings.mode === 'Cell') {
                selectedRecords = this.parent.selectionModule.getCellSelectedRecords();
            }
            this.deleteRow(selectedRecords);
        }
        else {
            if (this.targetedRecords.length) {
                this.deleteRow(this.targetedRecords);
            }
            this.isFromDeleteMethod = false;
        }
    };
    /**
     * Method to delete record.
     * @param {number | string | number[] | string[] | IGanttData | IGanttData[]} taskDetail - Defines the details of data to delete.
     * @public
     */
    Edit.prototype.deleteRecord = function (taskDetail) {
        this.isFromDeleteMethod = true;
        var variableType = typeof (taskDetail);
        this.targetedRecords = [];
        switch (variableType) {
            case 'number':
            case 'string':
                var taskId = taskDetail.toString();
                if (!isNullOrUndefined(taskId) && this.parent.ids.indexOf(taskId) !== -1) {
                    this.targetedRecords.push(this.parent.getRecordByID(taskId));
                }
                break;
            case 'object':
                if (!Array.isArray(taskDetail)) {
                    this.targetedRecords.push(taskDetail.valueOf());
                }
                else {
                    this.updateTargetedRecords(taskDetail);
                }
                break;
            default:
        }
        this.startDeleteAction();
    };
    /**
     * To update 'targetedRecords collection' from given array collection
     * @param taskDetailArray
     */
    Edit.prototype.updateTargetedRecords = function (taskDetailArray) {
        if (taskDetailArray.length) {
            var variableType = typeof (taskDetailArray[0]);
            if (variableType === 'object') {
                this.targetedRecords = taskDetailArray;
            }
            else {
                // Get record from array of task ids
                for (var i = 0; i < taskDetailArray.length; i++) {
                    var taskId = taskDetailArray[i].toString();
                    if (!isNullOrUndefined(taskId) && this.parent.ids.indexOf(taskId) !== -1) {
                        this.targetedRecords.push(this.parent.getRecordByID(taskId));
                    }
                }
            }
        }
    };
    Edit.prototype.deleteRow = function (tasks) {
        var flatData = this.parent.flatData;
        var rowItems = tasks && tasks.length ? tasks :
            this.parent.selectionModule.getSelectedRecords();
        if (rowItems.length) {
            this.parent.isOnDelete = true;
            rowItems.forEach(function (item) {
                item.isDelete = true;
            });
            for (var i = 0; i < rowItems.length; i++) {
                var deleteRecord = rowItems[i];
                if (this.deletedTaskDetails.indexOf(deleteRecord) !== -1) {
                    continue;
                }
                if (deleteRecord.parentItem) {
                    var childRecord = this.parent.getParentTask(deleteRecord.parentItem).childRecords;
                    var filteredRecord = childRecord.length === 1 ?
                        childRecord : childRecord.filter(function (data) {
                        return !data.isDelete;
                    });
                    if (filteredRecord.length > 0) {
                        this.parent.dataOperation.updateParentItems(deleteRecord.parentItem);
                    }
                }
                var predecessor = deleteRecord.ganttProperties.predecessor;
                if (predecessor && predecessor.length) {
                    this.removePredecessorOnDelete(deleteRecord);
                }
                this.deletedTaskDetails.push(deleteRecord);
                if (deleteRecord.hasChildRecords) {
                    this.deleteChildRecords(deleteRecord);
                }
            }
            if (this.parent.selectionModule && this.parent.allowSelection) {
                // clear selection
                this.parent.selectionModule.clearSelection();
            }
            var delereArgs = {};
            delereArgs.deletedRecordCollection = this.deletedTaskDetails;
            delereArgs.updatedRecordCollection = this.parent.editedRecords;
            delereArgs.cancel = false;
            delereArgs.action = 'delete';
            this.initiateDeleteAction(delereArgs);
            this.parent.isOnDelete = false;
        }
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    Edit.prototype.removePredecessorOnDelete = function (record) {
        var predecessors = record.ganttProperties.predecessor;
        for (var i = 0; i < predecessors.length; i++) {
            var predecessor = predecessors[i];
            if (predecessor.from.toString() === record.ganttProperties.taskId.toString()) {
                var toRecord = this.parent.getRecordByID(predecessor.to.toString());
                var toRecordPredcessor = extend([], [], toRecord.ganttProperties.predecessor, true);
                var index = void 0;
                for (var t = 0; t < toRecordPredcessor.length; t++) {
                    if (toRecordPredcessor[t].to.toString() === toRecord.ganttProperties.taskId.toString()
                        && toRecordPredcessor[t].from.toString() === record.ganttProperties.taskId.toString()) {
                        index = t;
                        break;
                    }
                }
                toRecordPredcessor.splice(index, 1);
                this.updatePredecessorValues(toRecord, toRecordPredcessor);
            }
            else if (predecessor.to.toString() === record.ganttProperties.taskId.toString()) {
                var fromRecord = this.parent.getRecordByID(predecessor.from.toString());
                var fromRecordPredcessor = extend([], [], fromRecord.ganttProperties.predecessor, true);
                var index = void 0;
                for (var t = 0; t < fromRecordPredcessor.length; t++) {
                    if (fromRecordPredcessor[t].from.toString() === fromRecord.ganttProperties.taskId.toString()
                        && fromRecordPredcessor[t].to.toString() === record.ganttProperties.taskId.toString()) {
                        index = t;
                        break;
                    }
                }
                fromRecordPredcessor.splice(index, 1);
                this.updatePredecessorValues(fromRecord, fromRecordPredcessor);
            }
        }
    };
    Edit.prototype.updatePredecessorValues = function (record, predcessorArray) {
        this.parent.setRecordValue('predecessor', predcessorArray, record.ganttProperties, true);
        var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(record);
        this.parent.setRecordValue('predecessorsName', predecessorString, record.ganttProperties, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, record);
        this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, record);
    };
    Edit.prototype.deleteChildRecords = function (record) {
        var childRecords = record.childRecords;
        for (var c = 0; c < childRecords.length; c++) {
            var childRecord = childRecords[c];
            if (this.deletedTaskDetails.indexOf(childRecord) !== -1) {
                continue;
            }
            var predecessor = childRecord.ganttProperties.predecessor;
            if (predecessor && predecessor.length) {
                this.removePredecessorOnDelete(childRecord);
            }
            this.deletedTaskDetails.push(childRecord);
            if (childRecord.hasChildRecords) {
                this.deleteChildRecords(childRecord);
            }
        }
    };
    Edit.prototype.removeFromDataSource = function (deleteRecordIDs) {
        var dataSource;
        var taskFields = this.parent.taskFields;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        this.removeData(dataSource, deleteRecordIDs);
        this.isBreakLoop = false;
    };
    Edit.prototype.removeData = function (dataCollection, record) {
        for (var i = 0; i < dataCollection.length; i++) {
            if (this.isBreakLoop) {
                break;
            }
            if (record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()) !== -1) {
                if (dataCollection[i][this.parent.taskFields.child]) {
                    var childRecords = dataCollection[i][this.parent.taskFields.child];
                    this.removeData(childRecords, record);
                }
                record.splice(record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()), 1);
                dataCollection.splice(i, 1);
                if (record.length === 0) {
                    this.isBreakLoop = true;
                    break;
                }
            }
            else if (dataCollection[i][this.parent.taskFields.child]) {
                var childRecords = dataCollection[i][this.parent.taskFields.child];
                this.removeData(childRecords, record);
            }
        }
    };
    Edit.prototype.initiateDeleteAction = function (args) {
        var _this = this;
        this.parent.showSpinner();
        var eventArgs = {};
        eventArgs.requestType = 'beforeDelete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection);
        var blazorArgs = {};
        if (isBlazor()) {
            eventArgs = this.parent.updateDataArgs(eventArgs);
            blazorArgs.modifiedTaskData = eventArgs.modifiedTaskData;
            blazorArgs.data = eventArgs.data;
        }
        this.parent.trigger('actionBegin', eventArgs, function (eventArgs) {
            if (eventArgs.cancel) {
                var deleteRecords = _this.deletedTaskDetails;
                for (var d = 0; d < deleteRecords.length; d++) {
                    deleteRecords[d].isDelete = false;
                }
                _this.deletedTaskDetails = [];
                _this.reUpdatePreviousRecords();
                _this.parent.initiateEditAction(false);
                _this.parent.hideSpinner();
            }
            else {
                if (isRemoteData(_this.parent.dataSource)) {
                    var data = _this.parent.dataSource;
                    var updatedData = {
                        /* tslint:disable-next-line */
                        deletedRecords: isBlazor() ? getTaskData(blazorArgs.data) : getTaskData(eventArgs.data),
                        changedRecords: isBlazor() ? blazorArgs.modifiedTaskData : eventArgs.modifiedTaskData
                    };
                    var crud = data.saveChanges(updatedData, _this.parent.taskFields.id);
                    crud.then(function (e) { return _this.deleteSuccess(args); })
                        .catch(function (e) { return _this.dmFailure(e, args); });
                }
                else {
                    _this.deleteSuccess(args);
                }
            }
        });
    };
    Edit.prototype.deleteSuccess = function (args) {
        var flatData = this.parent.flatData;
        var currentData = this.parent.currentViewData;
        var deletedRecords = this.parent.getRecordFromFlatdata(args.deletedRecordCollection);
        var deleteRecordIDs = [];
        for (var i = 0; i < deletedRecords.length; i++) {
            var deleteRecord = deletedRecords[i];
            var currentIndex = currentData.indexOf(deleteRecord);
            var flatIndex = flatData.indexOf(deleteRecord);
            var treeGridParentIndex = this.parent.treeGrid.parentData.indexOf(deleteRecord);
            var childIndex = void 0;
            if (currentIndex !== -1) {
                currentData.splice(currentIndex, 1);
            }
            if (flatIndex !== -1) {
                flatData.splice(flatIndex, 1);
            }
            deleteRecordIDs.push(deleteRecord.ganttProperties.taskId.toString());
            if (flatIndex !== -1) {
                this.parent.ids.splice(flatIndex, 1);
            }
            if (deleteRecord.level === 0 && treeGridParentIndex !== -1) {
                this.parent.treeGrid.parentData.splice(treeGridParentIndex, 1);
            }
            if (deleteRecord.parentItem) {
                var parentItem = this.parent.getParentTask(deleteRecord.parentItem);
                if (parentItem) {
                    var childRecords = parentItem.childRecords;
                    childIndex = childRecords.indexOf(deleteRecord);
                    if (childIndex !== -1) {
                        childRecords.splice(childIndex, 1);
                    }
                    if (!childRecords.length) {
                        parentItem.hasChildRecords = false;
                    }
                }
            }
            this.updateTreeGridUniqueID(deleteRecord, 'delete');
        }
        if (deleteRecordIDs.length > 0) {
            this.removeFromDataSource(deleteRecordIDs);
        }
        var eventArgs = {};
        this.parent.updatedConnectorLineCollection = [];
        this.parent.connectorLineIds = [];
        this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        // this.parent.connectorLineEditModule.refreshEditedRecordConnectorLine(flatData);
        this.parent.treeGrid.refresh();
        // Trigger actioncomplete event for delete action
        eventArgs.requestType = 'delete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection);
        setValue('action', args.action, eventArgs);
        if (isBlazor()) {
            this.parent.updateDataArgs(eventArgs);
        }
        this.parent.trigger('actionComplete', eventArgs);
        this.deletedTaskDetails = [];
        this.parent.initiateEditAction(false);
        this.parent.hideSpinner();
    };
    /**
     *
     * @return {number | string}
     * @private
     */
    Edit.prototype.getNewTaskId = function () {
        var maxId = DataUtil.aggregates.max(this.parent.flatData, this.parent.taskFields.id);
        if (!isNullOrUndefined(maxId)) {
            return parseInt(maxId.toString(), 10) + 1;
        }
        else {
            return 1;
        }
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.prepareNewlyAddedData = function (obj, rowPosition) {
        var taskModel = this.parent.taskFields;
        var id;
        var ids = this.parent.ids;
        /*Validate Task Id of data*/
        if (obj[taskModel.id]) {
            if (ids.indexOf(obj[taskModel.id].toString()) !== -1) {
                obj[taskModel.id] = null;
            }
            else {
                obj[taskModel.id] = isNullOrUndefined(obj[taskModel.id]) ? null : parseInt(obj[taskModel.id], 10);
            }
        }
        if (!obj[taskModel.id]) {
            id = this.getNewTaskId();
            obj[taskModel.id] = id;
        }
        if (taskModel.name && !obj[taskModel.name]) {
            obj[taskModel.name] = 'New Task' + ' ' + obj[taskModel.id];
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.startDate]) {
            obj[taskModel.startDate] = this.parent.projectStartDate;
        }
        if (!this.parent.allowUnscheduledTasks && taskModel.duration && isNullOrUndefined(obj[taskModel.duration])) {
            if (!obj[taskModel.endDate]) {
                obj[taskModel.duration] = '5';
            }
        }
        if (taskModel.progress) {
            obj[taskModel.progress] = obj[taskModel.progress] ? (obj[taskModel.progress] > 100 ? 100 : obj[taskModel.progress]) : 0;
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.endDate] && taskModel.endDate) {
            if (!obj[taskModel.duration]) {
                var startDate = this.parent.dataOperation.getDateFromFormat(this.parent.projectStartDate);
                startDate.setDate(startDate.getDate() + 4);
                obj[taskModel.endDate] = this.parent.getFormatedDate(startDate, this.parent.dateFormat);
            }
        }
    };
    /**
     *
     * @return {IGanttData}
     * @private
     */
    Edit.prototype.updateNewlyAddedDataBeforeAjax = function (obj, level, rowPosition, parentItem) {
        var cAddedRecord;
        cAddedRecord = this.parent.dataOperation.createRecord(obj, level);
        cAddedRecord.index = parseInt(cAddedRecord.ganttProperties.taskId.toString(), 10) - 1;
        if (!isNullOrUndefined(parentItem)) {
            this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), cAddedRecord);
            var pIndex = cAddedRecord.parentItem ? cAddedRecord.parentItem.index : null;
            this.parent.setRecordValue('parentIndex', pIndex, cAddedRecord);
            var parentUniqId = cAddedRecord.parentItem ? cAddedRecord.parentItem.uniqueID : null;
            this.parent.setRecordValue('parentUniqueID', parentUniqId, cAddedRecord);
            if (!isNullOrUndefined(this.parent.taskFields.id) &&
                !isNullOrUndefined(this.parent.taskFields.parentID) && cAddedRecord.parentItem) {
                this.parent.setRecordValue(this.parent.taskFields.parentID, cAddedRecord.parentItem.taskId, cAddedRecord.taskData, true);
            }
        }
        this.backUpAndPushNewlyAddedRecord(cAddedRecord, rowPosition, parentItem);
        // need to push in dataSource also.
        this.parent.isOnEdit = true;
        if (this.parent.taskFields.dependency && cAddedRecord.ganttProperties.predecessorsName) {
            this.parent.predecessorModule.ensurePredecessorCollectionHelper(cAddedRecord, cAddedRecord.ganttProperties);
            this.parent.predecessorModule.updatePredecessorHelper(cAddedRecord);
            this.parent.predecessorModule.validatePredecessorDates(cAddedRecord);
        }
        else {
            if (cAddedRecord.parentItem && this.parent.getParentTask(cAddedRecord.parentItem).ganttProperties.isAutoSchedule) {
                this.parent.dataOperation.updateParentItems(cAddedRecord.parentItem);
            }
        }
        return cAddedRecord;
    };
    /**
     *
     * @return {number}
     * @private
     */
    Edit.prototype.getChildCount = function (record, count) {
        var currentRecord;
        if (!record.hasChildRecords) {
            return 0;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[i];
            count++;
            if (currentRecord.hasChildRecords) {
                count = this.getChildCount(currentRecord, count);
            }
        }
        return count;
    };
    /**
     *
     * @return {number}
     * @private
     */
    Edit.prototype.getVisibleChildRecordCount = function (data, count, collection) {
        var childRecords;
        var length;
        if (data.hasChildRecords) {
            childRecords = data.childRecords;
            length = childRecords.length;
            for (var i = 0; i < length; i++) {
                if (collection.indexOf(childRecords[i]) !== -1) {
                    count++;
                }
                if (childRecords[i].hasChildRecords) {
                    count = this.getVisibleChildRecordCount(childRecords[i], count, collection);
                }
            }
        }
        else {
            if (collection.indexOf(data) !== -1) {
                count++;
            }
        }
        return count;
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.updatePredecessorOnIndentOutdent = function (parentRecord) {
        var len = parentRecord.ganttProperties.predecessor.length;
        var parentRecordTaskData = parentRecord.ganttProperties;
        var predecessorCollection = parentRecordTaskData.predecessor;
        var childRecord;
        var predecessorIndex;
        var id;
        var updatedPredecessor = [];
        for (var count = 0; count < len; count++) {
            if (predecessorCollection[count].to === parentRecordTaskData.taskId.toString()) {
                childRecord = this.parent.getRecordByID(predecessorCollection[count].from);
                predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                var predecessorCollections = void 0;
                predecessorCollections = (extend([], childRecord.ganttProperties.predecessor, [], true));
                predecessorCollections.splice(predecessorIndex, 1);
                this.parent.setRecordValue('predecessor', predecessorCollections, childRecord.ganttProperties, true);
            }
            else if (predecessorCollection[count].from === parentRecordTaskData.taskId.toString()) {
                childRecord = this.parent.getRecordByID(predecessorCollection[count].to);
                var stringPredecessor = this.predecessorToString(childRecord.ganttProperties.predecessor, parentRecord);
                var prdcList = (childRecord.ganttProperties.predecessorsName.toString()).split(',');
                var str = predecessorCollection[count].from + predecessorCollection[count].type;
                var ind = prdcList.indexOf(str);
                prdcList.splice(ind, 1);
                this.parent.setRecordValue('predecessorsName', prdcList.join(','), childRecord.ganttProperties, true);
                predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                var temppredecessorCollection = void 0;
                temppredecessorCollection = (extend([], childRecord.ganttProperties.predecessor, [], true));
                temppredecessorCollection.splice(predecessorIndex, 1);
                this.parent.setRecordValue('predecessor', temppredecessorCollection, childRecord.ganttProperties, true);
                this.parent.predecessorModule.validatePredecessorDates(childRecord);
            }
        }
        this.parent.setRecordValue('predecessor', updatedPredecessor, parentRecord.ganttProperties, true);
        this.parent.setRecordValue('predecessorsName', '', parentRecord.ganttProperties, true);
    };
    /**
     *
     * @return {string}
     * @private
     */
    Edit.prototype.predecessorToString = function (predecessorCollection, record) {
        var predecessorString = [];
        var count = 0;
        var length = predecessorCollection.length;
        for (count; count < length; count++) {
            if (record.ganttProperties.taskId.toString() !== predecessorCollection[count].from) {
                var tem = predecessorCollection[count].from + predecessorCollection[count].type;
                predecessorCollection[count].offset =
                    isNaN(predecessorCollection[count].offset) ? 0 : predecessorCollection[count].offset;
                if (predecessorCollection[count].offset !== 0) {
                    if (predecessorCollection[count].offset < 0) {
                        tem += predecessorCollection[count].offset.toString() + 'd';
                    }
                    else if (predecessorCollection[count].offset > 0) {
                        tem += '+' + predecessorCollection[count].offset.toString() + 'd';
                    }
                }
                predecessorString.push(tem);
            }
        }
        return predecessorString.join(',');
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.backUpAndPushNewlyAddedRecord = function (record, rowPosition, parentItem) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var currentItemIndex;
        var recordIndex;
        var updatedCollectionIndex;
        var childIndex;
        switch (rowPosition) {
            case 'Top':
                flatRecords.splice(0, 0, record);
                currentViewData.splice(0, 0, record);
                ids.splice(0, 0, record.ganttProperties.taskId.toString()); // need to check NAN
                break;
            case 'Bottom':
                flatRecords.push(record);
                currentViewData.push(record);
                ids.push(record.ganttProperties.taskId.toString()); // need to check NAN
                break;
            case 'Above':
                /*Record Updates*/
                recordIndex = flatRecords.indexOf(this.addRowSelectedItem);
                updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem);
                this.recordCollectionUpdate(childIndex, recordIndex, updatedCollectionIndex, record, parentItem);
                break;
            case 'Below':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem);
                break;
            case 'Child':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    //Expand Add record's parent item 
                    if (!this.addRowSelectedItem.expanded) {
                        this.parent.expandByID(Number(this.addRowSelectedItem.ganttProperties.taskId));
                    }
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    this.addRowSelectedItem.hasChildRecords = true;
                    this.addRowSelectedItem.childRecords = [];
                    this.addRowSelectedItem.expanded = true;
                    this.addRowSelectedItem.ganttProperties.isMilestone = false;
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                    if (this.addRowSelectedItem.ganttProperties.predecessor) {
                        this.updatePredecessorOnIndentOutdent(this.addRowSelectedItem);
                    }
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem);
                break;
        }
        this.newlyAddedRecordBackup = record;
    };
    /**
     *
     * @return {ITaskAddedEventArgs}
     * @private
     */
    Edit.prototype.recordCollectionUpdate = function (childIndex, recordIndex, updatedCollectionIndex, record, parentItem) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        /* Record collection update */
        flatRecords.splice(recordIndex, 0, record);
        currentViewData.splice(updatedCollectionIndex, 0, record);
        ids.splice(recordIndex, 0, record.ganttProperties.taskId.toString());
        /* data Source update */
        if (!isNullOrUndefined(parentItem)) {
            childIndex = parentItem.childRecords.indexOf(this.addRowSelectedItem);
            /*Child collection update*/
            parentItem.childRecords.splice(childIndex, 0, record);
        }
    };
    /**
     *
     * @return {ITaskAddedEventArgs}
     * @private
     */
    Edit.prototype.constructTaskAddedEventArgs = function (cAddedRecord, modifiedRecords, event) {
        var eventArgs = {};
        eventArgs.action = event;
        eventArgs.data = cAddedRecord;
        eventArgs.newTaskData = getTaskData([cAddedRecord])[0];
        eventArgs.recordIndex = cAddedRecord.index;
        eventArgs.modifiedRecords = modifiedRecords;
        eventArgs.modifiedTaskData = getTaskData(modifiedRecords);
        return eventArgs;
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.addSuccess = function (args) {
        // let addedRecords: IGanttData = args.addedRecord;
        // let eventArgs: IActionBeginEventArgs = {};
        // this.parent.updatedConnectorLineCollection = [];
        // this.parent.connectorLineIds = [];
        // this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        this.parent.treeGrid.refresh();
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.updateRealDataSource = function (addedRecord, rowPosition) {
        var dataSource;
        var taskFields = this.parent.taskFields;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        if (rowPosition === 'Top') {
            dataSource.splice(0, 0, addedRecord.taskData);
        }
        else if (rowPosition === 'Bottom') {
            dataSource.push(addedRecord);
        }
        else {
            if (!isNullOrUndefined(taskFields.id) && !isNullOrUndefined(taskFields.parentID)) {
                dataSource.push(addedRecord.taskData);
            }
            else {
                this.addDataInRealDataSource(dataSource, addedRecord.taskData, rowPosition);
            }
        }
        this.isBreakLoop = false;
    };
    /**
     *
     * @return {boolean | void}
     * @private
     */
    Edit.prototype.addDataInRealDataSource = function (dataCollection, record, rowPosition) {
        for (var i = 0; i < dataCollection.length; i++) {
            if (this.isBreakLoop) {
                break;
            }
            if (getValue(this.parent.taskFields.id, dataCollection[i]).toString() ===
                this.addRowSelectedItem.ganttProperties.taskId.toString()) {
                if (rowPosition === 'Above') {
                    dataCollection.splice(i, 0, record);
                }
                else if (rowPosition === 'Below') {
                    dataCollection.splice(i + 1, 0, record);
                }
                else if (rowPosition === 'Child') {
                    /* tslint:disable-next-line */
                    if (dataCollection[i]['subtasks'] && dataCollection[i]['subtasks'].length > 0) {
                        /* tslint:disable-next-line */
                        dataCollection[i]['subtasks'].push(record);
                    }
                    else {
                        /* tslint:disable-next-line */
                        dataCollection[i]['subtasks'] = [];
                        /* tslint:disable-next-line */
                        dataCollection[i]['subtasks'].push(record);
                    }
                }
                this.isBreakLoop = true;
                break;
            }
            else if (dataCollection[i][this.parent.taskFields.child]) {
                var childRecords = dataCollection[i][this.parent.taskFields.child];
                this.addDataInRealDataSource(childRecords, record, rowPosition);
            }
        }
    };
    /**
     * Method to add new record.
     * @param {Object | IGanttData} data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @return {void}
     * @private
     */
    /* tslint:disable-next-line:max-func-body-length */
    Edit.prototype.addRecord = function (data, rowPosition, rowIndex) {
        var _this = this;
        if (this.parent.editModule && this.parent.editSettings.allowAdding) {
            var selectedRowIndex = isNullOrUndefined(rowIndex) || isNaN(parseInt(rowIndex.toString(), 10)) ?
                this.parent.selectionModule ?
                    (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both') &&
                        this.parent.selectionModule.selectedRowIndexes.length === 1 ?
                        this.parent.selectionModule.selectedRowIndexes[0] :
                        this.parent.selectionSettings.mode === 'Cell' && this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ?
                            this.parent.selectionModule.getSelectedRowCellIndexes()[0].rowIndex : null : null : rowIndex;
            this.addRowSelectedItem = isNullOrUndefined(selectedRowIndex) ? null : this.parent.currentViewData[selectedRowIndex];
            rowPosition = isNullOrUndefined(rowPosition) ? this.parent.editSettings.newRowPosition : rowPosition;
            data = isNullOrUndefined(data) ? this.parent.editModule.dialogModule.composeAddRecord() : data;
            if (((isNullOrUndefined(selectedRowIndex) || selectedRowIndex < 0 ||
                isNullOrUndefined(this.addRowSelectedItem)) && (rowPosition === 'Above'
                || rowPosition === 'Below'
                || rowPosition === 'Child')) || !rowPosition || (rowPosition !== 'Above'
                && rowPosition !== 'Below'
                && rowPosition !== 'Child' && rowPosition !== 'Top' &&
                rowPosition !== 'Bottom')) {
                rowPosition = 'Top';
            }
            var level = 0;
            var cAddedRecord_1;
            var args = {};
            var parentItem = void 0;
            switch (rowPosition) {
                case 'Top':
                case 'Bottom':
                    level = 0;
                    break;
                case 'Above':
                case 'Below':
                    level = this.addRowSelectedItem.level;
                    parentItem = this.parent.getParentTask(this.addRowSelectedItem.parentItem);
                    break;
                case 'Child':
                    level = this.addRowSelectedItem.level + 1;
                    parentItem = this.addRowSelectedItem;
                    break;
            }
            //Add Action Init.
            this.prepareNewlyAddedData(data, rowPosition);
            cAddedRecord_1 = this.updateNewlyAddedDataBeforeAjax(data, level, rowPosition, parentItem);
            args = this.constructTaskAddedEventArgs(cAddedRecord_1, this.parent.editedRecords, 'beforeAdd');
            this.parent.showSpinner();
            var blazorArgs_1 = {};
            if (isBlazor()) {
                if (!Array.isArray(args.data)) {
                    var customData = [];
                    customData.push(args.data);
                    setValue('data', customData, args);
                }
                blazorArgs_1 = __assign({}, args);
            }
            this.parent.trigger('actionBegin', args, function (args) {
                if (!args.cancel) {
                    if (isBlazor()) {
                        blazorArgs_1.data = blazorArgs_1.data[0];
                        args = blazorArgs_1;
                    }
                    if (isRemoteData(_this.parent.dataSource)) {
                        var data_1 = _this.parent.dataSource;
                        var updatedData = {
                            addedRecords: [args.newTaskData],
                            changedRecords: args.modifiedTaskData
                        };
                        /* tslint:disable-next-line */
                        var crud = data_1.saveChanges(updatedData, _this.parent.taskFields.id, null, new Query());
                        crud.then(function (e) {
                            if (_this.parent.taskFields.id && !isNullOrUndefined(e.addedRecords[0][_this.parent.taskFields.id]) &&
                                e.addedRecords[0][_this.parent.taskFields.id] !== args.data.ganttProperties.taskId) {
                                _this.parent.setRecordValue('taskId', e.addedRecords[0][_this.parent.taskFields.id], args.data.ganttProperties, true);
                                _this.parent.setRecordValue('taskData.' + _this.parent.taskFields.id, e.addedRecords[0][_this.parent.taskFields.id], args.data);
                                _this.parent.setRecordValue(_this.parent.taskFields.id, e.addedRecords[0][_this.parent.taskFields.id], args.data);
                            }
                            if (cAddedRecord_1.level === 0) {
                                _this.parent.treeGrid.parentData.splice(0, 0, cAddedRecord_1);
                            }
                            _this.updateTreeGridUniqueID(cAddedRecord_1, 'add');
                            _this.refreshNewlyAddedRecord(args, cAddedRecord_1);
                        }).catch(function (e) {
                            _this.removeAddedRecord();
                            _this.dmFailure(e, args);
                        });
                    }
                    else {
                        _this.updateRealDataSource(args.data, rowPosition);
                        if (cAddedRecord_1.level === 0) {
                            _this.parent.treeGrid.parentData.splice(0, 0, cAddedRecord_1);
                        }
                        _this.updateTreeGridUniqueID(cAddedRecord_1, 'add');
                        _this.refreshNewlyAddedRecord(args, cAddedRecord_1);
                    }
                }
                else {
                    args = isBlazor() ? blazorArgs_1 : args;
                    _this.removeAddedRecord();
                    _this.reUpdatePreviousRecords();
                    if (_this.dialogModule.dialog && !_this.dialogModule.dialogObj.isDestroyed) {
                        _this.dialogModule.dialogObj.hide();
                    }
                    _this.dialogModule.dialogClose();
                }
                _this.parent.isOnEdit = false;
                _this.parent.hideSpinner();
                _this.addRowSelectedItem = null;
                _this.newlyAddedRecordBackup = null;
                _this.isBreakLoop = false;
                _this.parent.element.tabIndex = 0;
                _this.parent.initiateEditAction(false);
            });
        }
    };
    /**
     * Method to update unique id collection in TreeGrid
     */
    Edit.prototype.updateTreeGridUniqueID = function (data, action) {
        if (action === 'add') {
            setValue('uniqueIDCollection.' + data.uniqueID, data, this.parent.treeGrid);
        }
        else if (action === 'delete') {
            deleteObject(getValue('uniqueIDCollection', this.parent.treeGrid), data.uniqueID);
        }
    };
    Edit.prototype.refreshNewlyAddedRecord = function (args, cAddedRecord) {
        if (this.parent.selectionModule && this.parent.allowSelection &&
            (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both')) {
            this.parent.staticSelectedRowIndex = this.parent.currentViewData.indexOf(args.data);
        }
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = [];
            if (args.modifiedRecords.length > 0) {
                tempArray.push(args.data);
                tempArray.push.apply(tempArray, args.modifiedRecords);
            }
            else {
                tempArray = [args.data];
            }
            this.parent.timelineModule.updateTimeLineOnEditing(tempArray, args.action);
        }
        this.addSuccess(args);
        args = this.constructTaskAddedEventArgs(cAddedRecord, args.modifiedRecords, 'add');
        if (isBlazor()) {
            this.parent.updateDataArgs(args);
        }
        this.parent.trigger('actionComplete', args);
        if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
            this.dialogModule.dialogObj.hide();
        }
        this.dialogModule.dialogClose();
    };
    /**
     *
     * @return {void}
     * @private
     */
    Edit.prototype.removeAddedRecord = function () {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var flatRecordsIndex = flatRecords.indexOf(this.newlyAddedRecordBackup);
        var currentViewDataIndex = currentViewData.indexOf(this.newlyAddedRecordBackup);
        var idsIndex = ids.indexOf(this.newlyAddedRecordBackup.ganttProperties.taskId.toString());
        deleteObject(this.parent.previousRecords, flatRecords[flatRecordsIndex].uniqueID);
        if (this.newlyAddedRecordBackup.parentItem) {
            var parentItem = this.parent.getParentTask(this.newlyAddedRecordBackup.parentItem);
            var parentIndex = parentItem.childRecords.indexOf(this.newlyAddedRecordBackup);
            parentItem.childRecords.splice(parentIndex, 1);
        }
        flatRecords.splice(flatRecordsIndex, 1);
        currentViewData.splice(currentViewDataIndex, 1);
        ids.splice(idsIndex, 1);
    };
    return Edit;
}());
export { Edit };
