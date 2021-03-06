import { Dialog, Tooltip } from '@syncfusion/ej2-popups';
import { Droppable, createElement, extend, remove, addClass, closest, getInstance } from '@syncfusion/ej2-base';
import { prepend, append, KeyboardEvents, removeClass } from '@syncfusion/ej2-base';
import { Button, RadioButton, CheckBox } from '@syncfusion/ej2-buttons';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import * as cls from '../../common/base/css-constant';
import { TreeView } from '@syncfusion/ej2-navigations';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import * as events from '../../common/base/constant';
import { Accordion } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { PivotUtil } from '../../base/util';
/**
 * Module to render Calculated Field Dialog
 */
var COUNT = 'Count';
var AVG = 'Avg';
var MIN = 'Min';
var MAX = 'Max';
var SUM = 'Sum';
var DISTINCTCOUNT = 'DistinctCount';
var PRODUCT = 'Product';
var STDEV = 'SampleStDev';
var STDEVP = 'PopulationStDev';
var VAR = 'SampleVar';
var VARP = 'PopulationVar';
var CALC = 'CalculatedField';
var AGRTYPE = 'AggregateType';
var CalculatedField = /** @class */ (function () {
    /** Constructor for calculatedfield module */
    function CalculatedField(parent) {
        this.isFormula = false;
        this.parent = parent;
        this.existingReport = null;
        this.parent.calculatedFieldModule = this;
        this.removeEventListener();
        this.addEventListener();
        this.parentID = this.parent.element.id;
        this.dialog = null;
        this.inputObj = null;
        this.treeObj = null;
        this.droppable = null;
        this.menuObj = null;
        this.newFields = null;
        this.isFieldExist = true;
        this.formulaText = null;
        this.fieldText = null;
        this.isEdit = false;
        this.currentFieldName = null;
        this.confirmPopUp = null;
    }
    /**
     * To get module name.
     * @returns string
     */
    CalculatedField.prototype.getModuleName = function () {
        return 'calculatedfield';
    };
    CalculatedField.prototype.keyActionHandler = function (e) {
        var node = e.currentTarget.querySelector('.e-hover.e-node-focus');
        if (node) {
            switch (e.action) {
                case 'moveRight':
                    if (this.parent.dataType === 'pivot') {
                        this.displayMenu(node.previousSibling);
                    }
                    break;
                case 'enter':
                    var field = node.getAttribute('data-field');
                    var type = node.getAttribute('data-type');
                    var dropField = this.dialog.element.querySelector('#' + this.parentID + 'droppable');
                    if (this.parent.dataType === 'pivot') {
                        if (dropField.value === '') {
                            if (type === CALC) {
                                dropField.value = node.getAttribute('data-uid');
                            }
                            else {
                                dropField.value = '"' + type + '(' + field + ')' + '"';
                            }
                        }
                        else if (dropField.value !== '') {
                            if (type === CALC) {
                                dropField.value = dropField.value + node.getAttribute('data-uid');
                            }
                            else {
                                dropField.value = dropField.value + '"' + type + '(' + field + ')' + '"';
                            }
                        }
                    }
                    else {
                        if (this.parent.olapEngineModule && this.parent.olapEngineModule.fieldList[field] &&
                            this.parent.olapEngineModule.fieldList[field].isCalculatedField) {
                            field = this.parent.olapEngineModule.fieldList[field].tag;
                        }
                        if (dropField.value === '') {
                            dropField.value = field;
                        }
                        else if (dropField.value !== '') {
                            dropField.value = dropField.value + field;
                        }
                    }
                    break;
            }
        }
    };
    /**
     * Trigger while click treeview icon.
     * @param  {MouseEvent} e
     * @returns void
     */
    CalculatedField.prototype.fieldClickHandler = function (e) {
        var node = e.event.target.parentElement;
        if (e.event.target.classList.contains(cls.FORMAT) ||
            e.event.target.classList.contains(cls.CALC_EDIT) ||
            e.event.target.classList.contains(cls.CALC_EDITED)) {
            this.displayMenu(node.parentElement);
        }
    };
    CalculatedField.prototype.clearFormula = function () {
        if (this.treeObj && this.treeObj.element.querySelector('li')) {
            removeClass(this.treeObj.element.querySelectorAll('li'), 'e-active');
            this.displayMenu(this.treeObj.element.querySelector('li'));
        }
    };
    /**
     * To display context menu.
     * @param  {HTMLElement} node
     * @returns void
     */
    CalculatedField.prototype.displayMenu = function (node) {
        if (this.parent.dataType === 'pivot' && document.querySelector('.' + this.parentID + 'calculatedmenu') !== null &&
            node.querySelector('.e-list-icon').classList.contains(cls.ICON) &&
            !node.querySelector('.e-list-icon').classList.contains(cls.CALC_EDITED) &&
            !node.querySelector('.e-list-icon').classList.contains(cls.CALC_EDIT) && node.tagName === 'LI') {
            this.menuObj.close();
            this.curMenu = node.querySelector('.' + cls.LIST_TEXT_CLASS);
            this.openContextMenu();
        }
        else if (node.tagName === 'LI' && (node.querySelector('.e-list-icon').classList.contains(cls.CALC_EDIT) ||
            (this.parent.dataType === 'olap' && node.getAttribute('data-type') === CALC && node.classList.contains('e-active')))) {
            this.isEdit = true;
            var fieldName = node.getAttribute('data-field');
            var caption = node.getAttribute('data-caption');
            this.currentFieldName = fieldName;
            this.inputObj.value = caption;
            this.inputObj.dataBind();
            if (this.parent.dataType === 'olap') {
                var memberType = node.getAttribute('data-membertype');
                var parentHierarchy = node.getAttribute('data-hierarchy');
                var expression = node.getAttribute('data-formula');
                var formatString = node.getAttribute('data-formatString');
                var customString = node.getAttribute('data-customString');
                var dialogElement = this.dialog.element;
                /* tslint:disable */
                var fieldTitle = dialogElement.querySelector('#' + this.parentID + '_' + 'FieldNameTitle');
                var customFormat = getInstance(dialogElement.querySelector('#' + this.parentID + 'Custom_Format_Element'), MaskedTextBox);
                var memberTypeDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Member_Type_Div'), DropDownList);
                var hierarchyDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Hierarchy_List_Div'), DropDownList);
                var formatDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Format_Div'), DropDownList);
                /* tslint:enable */
                fieldTitle.innerHTML = this.parent.localeObj.getConstant('caption');
                document.querySelector('#' + this.parentID + 'droppable').value = expression;
                memberTypeDrop.readonly = true;
                memberTypeDrop.value = memberType;
                memberTypeDrop.dataBind();
                if (memberType === 'Dimension') {
                    hierarchyDrop.value = parentHierarchy;
                }
                if (formatString !== '') {
                    formatDrop.value = formatString;
                    formatDrop.dataBind();
                }
                customFormat.value = customString;
                customFormat.dataBind();
            }
            else {
                addClass([node.querySelector('.e-list-icon')], cls.CALC_EDITED);
                removeClass([node.querySelector('.e-list-icon')], cls.CALC_EDIT);
                node.querySelector('.' + cls.CALC_EDITED).setAttribute('title', this.parent.localeObj.getConstant('clear'));
                document.querySelector('#' + this.parentID + 'droppable').value = node.getAttribute('data-uid');
            }
        }
        else if (node.tagName === 'LI' && (node.querySelector('.e-list-icon').classList.contains(cls.CALC_EDITED) ||
            (this.parent.dataType === 'olap' && !node.classList.contains('e-active')))) {
            this.isEdit = false;
            this.inputObj.value = '';
            this.inputObj.dataBind();
            if (this.parent.dataType === 'olap') {
                var dialogElement = this.dialog.element;
                /* tslint:disable */
                var hierarchyDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Hierarchy_List_Div'), DropDownList);
                var formatDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Format_Div'), DropDownList);
                var customFormat = getInstance(dialogElement.querySelector('#' + this.parentID + 'Custom_Format_Element'), MaskedTextBox);
                var memberTypeDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Member_Type_Div'), DropDownList);
                var fieldTitle = dialogElement.querySelector('#' + this.parentID + '_' + 'FieldNameTitle');
                /* tslint:enable */
                fieldTitle.innerHTML = this.parent.localeObj.getConstant('fieldTitle');
                hierarchyDrop.index = 0;
                hierarchyDrop.dataBind();
                formatDrop.index = 0;
                formatDrop.dataBind();
                customFormat.value = '';
                customFormat.dataBind();
                memberTypeDrop.index = 0;
                memberTypeDrop.readonly = false;
                memberTypeDrop.dataBind();
            }
            else {
                addClass([node.querySelector('.e-list-icon')], cls.CALC_EDIT);
                removeClass([node.querySelector('.e-list-icon')], cls.CALC_EDITED);
                node.querySelector('.' + cls.CALC_EDIT).setAttribute('title', this.parent.localeObj.getConstant('edit'));
            }
            document.querySelector('#' + this.parentID + 'droppable').value = '';
        }
    };
    /**
     * To set position for context menu.
     * @returns void
     */
    CalculatedField.prototype.openContextMenu = function () {
        var pos = this.curMenu.getBoundingClientRect();
        if (this.parent.enableRtl) {
            this.menuObj.open(pos.top + 30, pos.left - 100);
        }
        else {
            this.menuObj.open(pos.top + 30, pos.left + 150);
        }
    };
    /**
     * Triggers while select menu.
     * @param  {MenuEventArgs} menu
     * @returns void
     */
    CalculatedField.prototype.selectContextMenu = function (menu) {
        if (menu.element.textContent !== null) {
            var field = closest(this.curMenu, '.e-list-item').getAttribute('data-caption');
            closest(this.curMenu, '.e-list-item').setAttribute('data-type', menu.element.id.split(this.parent.element.id + '_')[1]);
            this.curMenu.textContent = field + ' (' + menu.element.id.split(this.parent.element.id + '_')[1] + ')';
            addClass([this.curMenu.parentElement.parentElement], ['e-node-focus', 'e-hover']);
            this.curMenu.parentElement.parentElement.setAttribute('tabindex', '-1');
            this.curMenu.parentElement.parentElement.focus();
        }
    };
    /**
     * To create context menu.
     * @returns void
     */
    CalculatedField.prototype.createMenu = function () {
        var menuItems = [
            { id: this.parent.element.id + '_Sum', text: this.parent.localeObj.getConstant('Sum') },
            { id: this.parent.element.id + '_Count', text: this.parent.localeObj.getConstant('Count') },
            { id: this.parent.element.id + '_DistinctCount', text: this.parent.localeObj.getConstant('DistinctCount') },
            { id: this.parent.element.id + '_Avg', text: this.parent.localeObj.getConstant('Avg') },
            { id: this.parent.element.id + '_Min', text: this.parent.localeObj.getConstant('Min') },
            { id: this.parent.element.id + '_Max', text: this.parent.localeObj.getConstant('Max') },
            { id: this.parent.element.id + '_Product', text: this.parent.localeObj.getConstant('Product') },
            { id: this.parent.element.id + '_SampleStDev', text: this.parent.localeObj.getConstant('SampleStDev') },
            { id: this.parent.element.id + '_SampleVar', text: this.parent.localeObj.getConstant('SampleVar') },
            { id: this.parent.element.id + '_PopulationStDev', text: this.parent.localeObj.getConstant('PopulationStDev') },
            { id: this.parent.element.id + '_PopulationVar', text: this.parent.localeObj.getConstant('PopulationVar') }
        ];
        var menuOptions = {
            cssClass: this.parentID + 'calculatedmenu',
            items: menuItems,
            enableRtl: this.parent.enableRtl,
            beforeOpen: this.beforeMenuOpen.bind(this),
            select: this.selectContextMenu.bind(this)
        };
        var contextMenu = createElement('ul', {
            id: this.parentID + 'contextmenu'
        });
        this.parent.element.appendChild(contextMenu);
        this.menuObj = new Menu(menuOptions);
        this.menuObj.isStringTemplate = true;
        this.menuObj.appendTo(contextMenu);
    };
    /* tslint:disable */
    /**
     * Triggers while click OK button.
     * @returns void
     */
    CalculatedField.prototype.applyFormula = function () {
        var currentObj = this;
        var isExist = false;
        removeClass([document.getElementById(this.parentID + 'ddlelement')], cls.EMPTY_FIELD);
        if (currentObj.parent.dataType === 'olap') {
            var field = currentObj.inputObj.value;
            if (currentObj.parent.olapEngineModule.fieldList[field] &&
                currentObj.parent.olapEngineModule.fieldList[field].type !== 'CalculatedField') {
                isExist = true;
            }
        }
        else {
            Object.keys(currentObj.parent.engineModule.fieldList).forEach(function (key, index) {
                if (currentObj.inputObj.value && currentObj.inputObj.value === key &&
                    currentObj.parent.engineModule.fieldList[key].aggregateType !== 'CalculatedField') {
                    isExist = true;
                }
            });
        }
        if (isExist) {
            currentObj.parent.pivotCommon.errorDialog.createErrorDialog(currentObj.parent.localeObj.getConstant('error'), currentObj.parent.localeObj.getConstant('fieldExist'));
            return;
        }
        this.newFields =
            extend([], this.parent.dataSourceSettings.calculatedFieldSettings, null, true);
        this.existingReport = extend({}, this.parent.dataSourceSettings, null, true);
        var report = this.parent.dataSourceSettings;
        var dropField = document.querySelector('#' + this.parentID + 'droppable');
        if (this.inputObj.value !== null && this.inputObj.value !== '' && dropField.value !== '') {
            var field = void 0;
            if (this.parent.dataType === 'olap') {
                var dialogElement = this.parent.isAdaptive ? this.parent.dialogRenderer.adaptiveElement.element : this.dialog.element;
                var memberTypeDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Member_Type_Div'), DropDownList);
                var customFormat = getInstance(dialogElement.querySelector('#' + this.parentID + 'Custom_Format_Element'), MaskedTextBox);
                var hierarchyDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Hierarchy_List_Div'), DropDownList);
                var formatDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Format_Div'), DropDownList);
                field = {
                    name: this.inputObj.value,
                    formula: dropField.value,
                    formatString: (formatDrop.value === 'Custom' ? customFormat.value : formatDrop.value)
                };
                if (memberTypeDrop.value === 'Dimension') {
                    field.hierarchyUniqueName = hierarchyDrop.value;
                }
                this.isFieldExist = false;
                if (!this.isEdit) {
                    for (var i = 0; i < report.calculatedFieldSettings.length; i++) {
                        if (report.calculatedFieldSettings[i].name === field.name) {
                            this.createConfirmDialog(currentObj.parent.localeObj.getConstant('alert'), currentObj.parent.localeObj.getConstant('confirmText'));
                            return;
                        }
                    }
                }
                else {
                    for (var i = 0; i < report.calculatedFieldSettings.length; i++) {
                        if (report.calculatedFieldSettings[i].name === this.currentFieldName && this.isEdit) {
                            if (memberTypeDrop.value === 'Dimension') {
                                report.calculatedFieldSettings[i].hierarchyUniqueName = field.hierarchyUniqueName;
                            }
                            this.parent.olapEngineModule.fieldList[this.currentFieldName].caption = this.inputObj.value;
                            report.calculatedFieldSettings[i].formatString = field.formatString;
                            report.calculatedFieldSettings[i].formula = field.formula;
                            field = report.calculatedFieldSettings[i];
                            this.isFieldExist = true;
                            break;
                        }
                    }
                    var axisFields = [report.rows, report.columns, report.values, report.filters];
                    var isFieldExist = false;
                    for (var _i = 0, axisFields_1 = axisFields; _i < axisFields_1.length; _i++) {
                        var fields = axisFields_1[_i];
                        for (var _a = 0, fields_1 = fields; _a < fields_1.length; _a++) {
                            var item = fields_1[_a];
                            if (item.isCalculatedField && this.currentFieldName !== null &&
                                item.name === this.currentFieldName && this.isEdit) {
                                item.caption = this.inputObj.value;
                                this.isFieldExist = true;
                                isFieldExist = true;
                                break;
                            }
                        }
                        if (isFieldExist) {
                            break;
                        }
                    }
                }
                if (!this.isFieldExist) {
                    report.calculatedFieldSettings.push(field);
                }
                this.parent.lastCalcFieldInfo = field;
            }
            else {
                field = {
                    name: this.inputObj.value,
                    type: 'CalculatedField'
                };
                var cField = {
                    name: this.inputObj.value,
                    formula: dropField.value
                };
                this.isFieldExist = true;
                if (!this.isEdit) {
                    for (var i = 0; i < report.values.length; i++) {
                        if (report.values[i].type === CALC && report.values[i].name === field.name) {
                            for (var j = 0; j < report.calculatedFieldSettings.length; j++) {
                                if (report.calculatedFieldSettings[j].name === field.name) {
                                    this.createConfirmDialog(currentObj.parent.localeObj.getConstant('alert'), currentObj.parent.localeObj.getConstant('confirmText'));
                                    return;
                                }
                            }
                            this.isFieldExist = false;
                        }
                    }
                }
                else {
                    for (var i = 0; i < report.values.length; i++) {
                        if (report.values[i].type === CALC && this.currentFieldName !== null &&
                            report.values[i].name === this.currentFieldName && this.isEdit) {
                            for (var j = 0; j < report.calculatedFieldSettings.length; j++) {
                                if (report.calculatedFieldSettings[j].name === this.currentFieldName) {
                                    report.values[i].caption = this.inputObj.value;
                                    report.calculatedFieldSettings[j].formula = dropField.value;
                                    this.parent.engineModule.fieldList[this.currentFieldName].caption = this.inputObj.value;
                                    this.isFieldExist = false;
                                }
                            }
                        }
                    }
                }
                if (this.isFieldExist) {
                    report.values.push(field);
                    report.calculatedFieldSettings.push(cField);
                }
                this.parent.lastCalcFieldInfo = cField;
            }
            this.addFormula(report, field.name);
        }
        else {
            if (this.inputObj.value === null || this.inputObj.value === '') {
                addClass([document.getElementById(this.parentID + 'ddlelement')], cls.EMPTY_FIELD);
                document.getElementById(this.parentID + 'ddlelement').focus();
            }
            else {
                this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('invalidFormula'));
            }
        }
    };
    /* tslint:enable */
    CalculatedField.prototype.addFormula = function (report, field) {
        this.isFormula = true;
        this.field = field;
        this.parent.setProperties({ dataSourceSettings: report }, true);
        if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.allowDeferLayoutUpdate) {
            this.parent.isRequiredUpdate = false;
        }
        try {
            this.parent.updateDataSource(false);
            var thisObj = this;
            //setTimeout(() => {
            thisObj.isEdit = false;
            if (thisObj.dialog) {
                thisObj.dialog.close();
            }
            else {
                thisObj.inputObj.value = '';
                thisObj.formulaText = null;
                thisObj.fieldText = null;
                thisObj.parent.
                    dialogRenderer.parentElement.querySelector('.' + cls.CALCINPUT).value = '';
                thisObj.parent.
                    dialogRenderer.parentElement.querySelector('#' + thisObj.parentID + 'droppable').value = '';
            }
            //});
        }
        catch (exception) {
            this.showError();
        }
    };
    CalculatedField.prototype.showError = function () {
        if (this.parent.engineModule.fieldList[this.field]) {
            delete this.parent.engineModule.fieldList[this.field];
        }
        this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('invalidFormula'));
        this.parent.setProperties({ dataSourceSettings: this.existingReport }, true);
        this.parent.lastCalcFieldInfo = {};
        this.parent.updateDataSource(false);
        this.isFormula = false;
    };
    /**
     * To get treeview data
     * @param  {PivotGrid|PivotFieldList} parent
     * @returns Object
     */
    CalculatedField.prototype.getFieldListData = function (parent) {
        var fields = [];
        if (this.parent.dataType === 'olap') {
            fields = PivotUtil.getClonedData(parent.olapEngineModule.fieldListData);
            for (var _i = 0, _a = fields; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.spriteCssClass &&
                    (item.spriteCssClass.indexOf('e-attributeCDB-icon') > -1 ||
                        item.spriteCssClass.indexOf('e-level-members') > -1)) {
                    item.hasChildren = true;
                }
                else if (item.spriteCssClass &&
                    (item.spriteCssClass.indexOf('e-namedSetCDB-icon') > -1)) {
                    item.hasChildren = false;
                }
            }
        }
        else {
            Object.keys(parent.engineModule.fieldList).forEach(function (key) {
                var type = null;
                if (parent.engineModule.fieldList[key].type === 'string' || parent.engineModule.fieldList[key].type === 'include' ||
                    parent.engineModule.fieldList[key].type === 'exclude') {
                    type = COUNT;
                }
                else {
                    type = parent.engineModule.fieldList[key].aggregateType !== undefined ?
                        parent.engineModule.fieldList[key].aggregateType : SUM;
                }
                fields.push({
                    index: parent.engineModule.fieldList[key].index,
                    name: parent.engineModule.fieldList[key].caption + ' (' + type + ')',
                    type: type,
                    icon: cls.FORMAT + ' ' + cls.ICON,
                    formula: parent.engineModule.fieldList[key].formula,
                    field: key,
                    caption: parent.engineModule.fieldList[key].caption ? parent.engineModule.fieldList[key].caption : key
                });
            });
        }
        return fields;
    };
    /**
     * Triggers before menu opens.
     * @param  {BeforeOpenCloseMenuEventArgs} args
     * @returns void
     */
    CalculatedField.prototype.beforeMenuOpen = function (args) {
        args.element.style.zIndex = (this.dialog.zIndex + 1).toString();
        args.element.style.display = 'inline';
    };
    /**
     * Trigger while drop node in formula field.
     * @param  {DragAndDropEventArgs} args
     * @returns void
     */
    CalculatedField.prototype.fieldDropped = function (args) {
        args.cancel = true;
        var dropField = this.dialog.element.querySelector('#' + this.parentID + 'droppable');
        removeClass([dropField], 'e-copy-drop');
        removeClass([args.draggedNode.querySelector('.' + cls.LIST_TEXT_CLASS)], cls.SELECTED_NODE_CLASS);
        var field = args.draggedNode.getAttribute('data-field');
        if (this.parent.dataType === 'olap') {
            if (this.parent.olapEngineModule.fieldList[field] &&
                this.parent.olapEngineModule.fieldList[field].isCalculatedField) {
                field = this.parent.olapEngineModule.fieldList[field].tag;
            }
            if (args.target.id === this.parentID + 'droppable' && dropField.value === '') {
                dropField.value = field;
                dropField.focus();
            }
            else if (args.target.id === (this.parentID + 'droppable') && dropField.value !== '') {
                var textCovered = void 0;
                var currentValue = dropField.value;
                var cursorPos = dropField.selectionStart;
                var textAfterText = currentValue.substring(cursorPos, currentValue.length);
                var textBeforeText = currentValue.substring(0, cursorPos);
                textCovered = textBeforeText + field;
                dropField.value = textBeforeText + field + textAfterText;
                dropField.focus();
                dropField.setSelectionRange(textCovered.length, textCovered.length);
            }
            else {
                args.cancel = true;
            }
        }
        else {
            var type = args.draggedNode.getAttribute('data-type');
            if (args.target.id === this.parentID + 'droppable' && dropField.value === '') {
                if (type === CALC) {
                    dropField.value = args.draggedNodeData.id.toString();
                }
                else {
                    dropField.value = '"' + type + '(' + field + ')' + '"';
                }
                dropField.focus();
            }
            else if (args.target.id === (this.parentID + 'droppable') && dropField.value !== '') {
                var textCovered = void 0;
                var cursorPos = dropField.selectionStart;
                var currentValue = dropField.value;
                var textBeforeText = currentValue.substring(0, cursorPos);
                var textAfterText = currentValue.substring(cursorPos, currentValue.length);
                if (type === CALC) {
                    textCovered = textBeforeText + args.draggedNodeData.id.toString();
                    dropField.value = textBeforeText + args.draggedNodeData.id.toString() + textAfterText;
                }
                else {
                    textCovered = textBeforeText + '"' + type + '(' + field + ')' + '"';
                    dropField.value = textBeforeText + '"' + type + '(' + field + ')' + '"' + textAfterText;
                }
                dropField.focus();
                dropField.setSelectionRange(textCovered.length, textCovered.length);
            }
            else {
                args.cancel = true;
            }
        }
    };
    /**
     * To create dialog.
     * @returns void
     */
    CalculatedField.prototype.createDialog = function () {
        var _this = this;
        if (document.querySelector('#' + this.parentID + 'calculateddialog') !== null) {
            remove(document.querySelector('#' + this.parentID + 'calculateddialog'));
        }
        this.parent.element.appendChild(createElement('div', {
            id: this.parentID + 'calculateddialog',
            className: cls.CALCDIALOG + ' ' + (this.parent.dataType === 'olap' ? cls.OLAP_CALCDIALOG : '')
        }));
        var calcButtons = [
            {
                click: this.applyFormula.bind(this),
                buttonModel: {
                    content: this.parent.localeObj.getConstant('ok'),
                    isPrimary: true
                }
            },
            {
                click: this.cancelClick.bind(this),
                buttonModel: {
                    content: this.parent.localeObj.getConstant('cancel')
                }
            }
        ];
        if (this.parent.dataType === 'olap') {
            var clearButton = {
                click: this.clearFormula.bind(this),
                buttonModel: {
                    cssClass: 'e-calc-clear-btn',
                    content: this.parent.localeObj.getConstant('clear'),
                }
            };
            calcButtons.splice(0, 0, clearButton);
        }
        this.dialog = new Dialog({
            allowDragging: true,
            position: { X: 'center', Y: 'center' },
            buttons: calcButtons,
            close: this.closeDialog.bind(this),
            beforeOpen: this.beforeOpen.bind(this),
            open: function () {
                if (_this.dialog.element.querySelector('#' + _this.parentID + 'ddlelement')) {
                    _this.dialog.element.querySelector('#' + _this.parentID + 'ddlelement').focus();
                }
            },
            animationSettings: { effect: 'Zoom' },
            width: '25%',
            isModal: false,
            closeOnEscape: true,
            enableRtl: this.parent.enableRtl,
            showCloseIcon: true,
            header: this.parent.localeObj.getConstant('createCalculatedField'),
            target: document.body
        });
        this.dialog.isStringTemplate = true;
        this.dialog.appendTo('#' + this.parentID + 'calculateddialog');
    };
    CalculatedField.prototype.cancelClick = function () {
        this.dialog.close();
        this.isEdit = false;
    };
    CalculatedField.prototype.beforeOpen = function (args) {
        // this.dialog.element.querySelector('.e-dlg-header').innerHTML = this.parent.localeObj.getConstant('createCalculatedField');
        this.dialog.element.querySelector('.e-dlg-header').
            setAttribute('title', this.parent.localeObj.getConstant('createCalculatedField'));
    };
    CalculatedField.prototype.closeDialog = function (args) {
        if (this.parent.getModuleName() === 'pivotfieldlist') {
            this.parent.axisFieldModule.render();
            if (this.parent.renderMode !== 'Fixed') {
                addClass([this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], cls.ICON_HIDDEN);
                this.parent.dialogRenderer.fieldListDialog.show();
            }
        }
        this.treeObj.destroy();
        this.dialog.destroy();
        this.newFields = null;
        remove(document.getElementById(this.parentID + 'calculateddialog'));
        remove(document.querySelector('.' + this.parentID + 'calculatedmenu'));
    };
    /* tslint:disable */
    /**
     * To render dialog elements.
     * @returns void
     */
    CalculatedField.prototype.renderDialogElements = function () {
        var outerDiv = createElement('div', {
            id: this.parentID + 'outerDiv',
            className: (this.parent.dataType === 'olap' ? cls.OLAP_CALCOUTERDIV + ' ' : '') + cls.CALCOUTERDIV
        });
        var olapFieldTreeDiv = createElement('div', { id: this.parentID + 'Olap_Tree_Div', className: 'e-olap-field-tree-div' });
        var olapCalcDiv = createElement('div', { id: this.parentID + 'Olap_Calc_Div', className: 'e-olap-calculated-div' });
        if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.
            dialogRenderer.parentElement.querySelector('.' + cls.FORMULA) !== null && this.parent.isAdaptive) {
            var accordDiv = createElement('div', { id: this.parentID + 'accordDiv', className: cls.CALCACCORD });
            outerDiv.appendChild(accordDiv);
            var buttonDiv = createElement('div', { id: this.parentID + 'buttonDiv', className: cls.CALCBUTTONDIV });
            var addBtn = createElement('button', {
                id: this.parentID + 'addBtn', innerHTML: this.parent.localeObj.getConstant('add'),
                className: cls.CALCADDBTN
            });
            var cancelBtn = createElement('button', {
                id: this.parentID + 'cancelBtn', innerHTML: this.parent.localeObj.getConstant('cancel'),
                className: cls.CALCCANCELBTN
            });
            buttonDiv.appendChild(cancelBtn);
            buttonDiv.appendChild(addBtn);
            outerDiv.appendChild(buttonDiv);
        }
        else {
            if (!this.parent.isAdaptive && this.parent.dataType === 'olap') {
                var formulaTitle = createElement('div', {
                    className: cls.PIVOT_FIELD_TITLE_CLASS, id: this.parentID + '_' + 'FieldNameTitle',
                    innerHTML: this.parent.localeObj.getConstant('fieldTitle')
                });
                olapCalcDiv.appendChild(formulaTitle);
            }
            var inputDiv = createElement('div', { id: this.parentID + 'outerDiv', className: cls.CALCINPUTDIV });
            var inputObj = createElement('input', {
                id: this.parentID + 'ddlelement',
                attrs: { 'type': 'text' },
                className: cls.CALCINPUT
            });
            inputDiv.appendChild(inputObj);
            (this.parent.dataType === 'olap' && !this.parent.isAdaptive ? olapCalcDiv.appendChild(inputDiv) : outerDiv.appendChild(inputDiv));
            var wrapDiv = createElement('div', { id: this.parentID + 'control_wrapper', className: cls.TREEVIEWOUTER });
            if (!this.parent.isAdaptive) {
                var fieldTitle = createElement('div', {
                    className: cls.PIVOT_ALL_FIELD_TITLE_CLASS,
                    innerHTML: (this.parent.dataType === 'olap' ? this.parent.localeObj.getConstant('allFields') :
                        this.parent.localeObj.getConstant('formulaField'))
                });
                if (this.parent.dataType === 'olap') {
                    var headerWrapperDiv = createElement('div', { className: cls.PIVOT_ALL_FIELD_TITLE_CLASS + '-wrapper' });
                    headerWrapperDiv.appendChild(fieldTitle);
                    var spanElement = createElement('span', {
                        attrs: {
                            'tabindex': '0',
                            'aria-disabled': 'false',
                            'aria-label': this.parent.localeObj.getConstant('fieldTooltip'),
                        },
                        className: cls.ICON + ' ' + cls.CALC_INFO
                    });
                    headerWrapperDiv.appendChild(spanElement);
                    var tooltip = new Tooltip({
                        content: this.parent.localeObj.getConstant('fieldTooltip'),
                        position: (this.parent.enableRtl ? 'RightCenter' : 'LeftCenter'),
                        target: '.' + cls.CALC_INFO,
                        offsetY: (this.parent.enableRtl ? -10 : -10),
                        width: 220
                    });
                    tooltip.appendTo(headerWrapperDiv);
                    wrapDiv.appendChild(headerWrapperDiv);
                }
                else {
                    outerDiv.appendChild(fieldTitle);
                }
            }
            var treeOuterDiv = createElement('div', { className: cls.TREEVIEW + '-outer-div' });
            wrapDiv.appendChild(treeOuterDiv);
            treeOuterDiv.appendChild(createElement('div', { id: this.parentID + 'tree', className: cls.TREEVIEW }));
            (this.parent.dataType === 'olap' && !this.parent.isAdaptive ? olapFieldTreeDiv.appendChild(wrapDiv) : outerDiv.appendChild(wrapDiv));
            if (!this.parent.isAdaptive) {
                var formulaTitle = createElement('div', {
                    className: cls.PIVOT_FORMULA_TITLE_CLASS,
                    innerHTML: (this.parent.dataType === 'olap' ? this.parent.localeObj.getConstant('expressionField') :
                        this.parent.localeObj.getConstant('formula'))
                });
                (this.parent.dataType === 'olap' ? olapCalcDiv.appendChild(formulaTitle) : outerDiv.appendChild(formulaTitle));
            }
            var dropDiv = createElement('textarea', {
                id: this.parentID + 'droppable',
                className: cls.FORMULA,
                attrs: {
                    'placeholder': this.parent.isAdaptive ? this.parent.localeObj.getConstant('dropTextMobile') :
                        (this.parent.dataType === 'olap' ? this.parent.localeObj.getConstant('olapDropText') :
                            this.parent.localeObj.getConstant('dropText'))
                }
            });
            (this.parent.dataType === 'olap' && !this.parent.isAdaptive ? olapCalcDiv.appendChild(dropDiv) : outerDiv.appendChild(dropDiv));
            if (this.parent.isAdaptive) {
                var buttonDiv = createElement('div', { id: this.parentID + 'buttonDiv', className: cls.CALCBUTTONDIV });
                var okBtn = createElement('button', {
                    id: this.parentID + 'okBtn', innerHTML: this.parent.localeObj.getConstant('apply'),
                    className: cls.CALCOKBTN
                });
                buttonDiv.appendChild(okBtn);
                outerDiv.appendChild(buttonDiv);
            }
            if (this.parent.dataType === 'olap') {
                if (!this.parent.isAdaptive) {
                    var memberTypeTitle = createElement('div', {
                        className: cls.OLAP_MEMBER_TITLE_CLASS,
                        innerHTML: this.parent.localeObj.getConstant('memberType')
                    });
                    olapCalcDiv.appendChild(memberTypeTitle);
                }
                var memberTypeDrop = createElement('div', { id: this.parentID + 'Member_Type_Div', className: cls.CALC_MEMBER_TYPE_DIV });
                (this.parent.isAdaptive ? outerDiv.appendChild(memberTypeDrop) : olapCalcDiv.appendChild(memberTypeDrop));
                if (!this.parent.isAdaptive) {
                    var hierarchyTitle = createElement('div', {
                        className: cls.OLAP_HIERARCHY_TITLE_CLASS,
                        innerHTML: this.parent.localeObj.getConstant('selectedHierarchy')
                    });
                    olapCalcDiv.appendChild(hierarchyTitle);
                }
                var hierarchyDrop = createElement('div', { id: this.parentID + 'Hierarchy_List_Div', className: cls.CALC_HIERARCHY_LIST_DIV });
                (this.parent.isAdaptive ? outerDiv.appendChild(hierarchyDrop) : olapCalcDiv.appendChild(hierarchyDrop));
                if (!this.parent.isAdaptive) {
                    var formatTitle = createElement('div', {
                        className: cls.OLAP_FORMAT_TITLE_CLASS,
                        innerHTML: this.parent.localeObj.getConstant('formatString')
                    });
                    olapCalcDiv.appendChild(formatTitle);
                }
                var formatDrop = createElement('div', { id: this.parentID + 'Format_Div', className: cls.CALC_FORMAT_TYPE_DIV });
                (this.parent.isAdaptive ? outerDiv.appendChild(formatDrop) : olapCalcDiv.appendChild(formatDrop));
                var customFormatDiv = createElement('div', { id: this.parentID + 'custom_Format_Div', className: cls.CALC_CUSTOM_FORMAT_INPUTDIV });
                var customFormatObj = createElement('input', {
                    id: this.parentID + 'Custom_Format_Element',
                    attrs: { 'type': 'text' },
                    className: cls.CALC_FORMAT_INPUT
                });
                customFormatDiv.appendChild(customFormatObj);
                olapCalcDiv.appendChild(customFormatDiv);
                (this.parent.isAdaptive ? outerDiv.appendChild(customFormatDiv) : olapCalcDiv.appendChild(customFormatDiv));
                if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.
                    dialogRenderer.parentElement.querySelector('.' + cls.FORMULA) === null && this.parent.isAdaptive) {
                    var okBtn = outerDiv.querySelector('.' + cls.CALCOKBTN);
                    outerDiv.appendChild(okBtn);
                }
                else {
                    outerDiv.appendChild(olapFieldTreeDiv);
                    outerDiv.appendChild(olapCalcDiv);
                }
            }
        }
        return outerDiv;
    };
    /* tslint:enable */
    /**
     * To create calculated field adaptive layout.
     * @returns void
     */
    CalculatedField.prototype.renderAdaptiveLayout = function () {
        if (document.querySelector('#' + this.parentID + 'droppable')) {
            this.formulaText = document.querySelector('#' + this.parentID + 'droppable').value;
            this.fieldText = this.inputObj.value;
        }
        this.renderMobileLayout(this.parent.dialogRenderer.adaptiveElement);
    };
    /**
     * To create treeview.
     * @returns void
     */
    CalculatedField.prototype.createOlapDropElements = function () {
        var dialogElement = (this.parent.isAdaptive ?
            this.parent.dialogRenderer.parentElement : this.dialog.element);
        var mData = [];
        var fData = [];
        var fieldData = [];
        var memberTypeData = ['Measure', 'Dimension'];
        var formatStringData = ['Standard', 'Currency', 'Percent', 'Custom'];
        for (var _i = 0, memberTypeData_1 = memberTypeData; _i < memberTypeData_1.length; _i++) {
            var type = memberTypeData_1[_i];
            mData.push({ value: type, text: this.parent.localeObj.getConstant(type) });
        }
        for (var _a = 0, formatStringData_1 = formatStringData; _a < formatStringData_1.length; _a++) {
            var format = formatStringData_1[_a];
            fData.push({ value: format, text: this.parent.localeObj.getConstant(format) });
        }
        var fields = PivotUtil.getClonedData(this.parent.olapEngineModule.fieldListData);
        for (var _b = 0, _c = fields; _b < _c.length; _b++) {
            var item = _c[_b];
            if (item.spriteCssClass &&
                (item.spriteCssClass.indexOf('e-attributeCDB-icon') > -1 ||
                    item.spriteCssClass.indexOf('e-hierarchyCDB-icon') > -1)) {
                fieldData.push({ value: item.id, text: item.caption });
            }
        }
        var memberTypeObj = new DropDownList({
            dataSource: mData, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' }, index: 0,
            cssClass: cls.MEMBER_OPTIONS_CLASS, width: '100%',
            change: function (args) {
                hierarchyListObj.enabled = args.value === 'Dimension' ? true : false;
                hierarchyListObj.dataBind();
            }
        });
        memberTypeObj.isStringTemplate = true;
        memberTypeObj.appendTo(dialogElement.querySelector('#' + this.parentID + 'Member_Type_Div'));
        var hierarchyListObj = new DropDownList({
            dataSource: fieldData, enableRtl: this.parent.enableRtl,
            allowFiltering: true, enabled: false,
            filterBarPlaceholder: this.parent.localeObj.getConstant('example') + ' ' + fieldData[0].text.toString(),
            fields: { value: 'value', text: 'text' }, index: 0,
            cssClass: cls.MEMBER_OPTIONS_CLASS, width: '100%'
        });
        hierarchyListObj.isStringTemplate = true;
        hierarchyListObj.appendTo(dialogElement.querySelector('#' + this.parentID + 'Hierarchy_List_Div'));
        var formatStringObj = new DropDownList({
            dataSource: fData, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' }, index: 0,
            cssClass: cls.MEMBER_OPTIONS_CLASS, width: '100%',
            change: function (args) {
                customerFormatObj.enabled = args.value === 'Custom' ? true : false;
                customerFormatObj.dataBind();
            }
        });
        formatStringObj.isStringTemplate = true;
        formatStringObj.appendTo(dialogElement.querySelector('#' + this.parentID + 'Format_Div'));
        var customerFormatObj = new MaskedTextBox({
            placeholder: this.parent.localeObj.getConstant('customFormat'),
            enabled: false
        });
        customerFormatObj.isStringTemplate = true;
        customerFormatObj.appendTo('#' + this.parentID + 'Custom_Format_Element');
    };
    /**
     * To create treeview.
     * @returns void
     */
    CalculatedField.prototype.createTreeView = function () {
        var _this = this;
        if (this.parent.dataType === 'olap') {
            this.treeObj = new TreeView({
                /* tslint:disable-next-line:max-line-length */
                fields: { dataSource: this.getFieldListData(this.parent), id: 'id', text: 'caption', parentID: 'pid', iconCss: 'spriteCssClass' },
                allowDragAndDrop: true,
                enableRtl: this.parent.enableRtl,
                nodeDragStart: this.dragStart.bind(this),
                nodeDragging: function (e) {
                    if (e.event.target && e.event.target.classList.contains(cls.FORMULA)) {
                        removeClass([e.clonedNode], cls.NO_DRAG_CLASS);
                        addClass([e.event.target], 'e-copy-drop');
                    }
                    else {
                        addClass([e.clonedNode], cls.NO_DRAG_CLASS);
                        removeClass([e.event.target], 'e-copy-drop');
                        e.dropIndicator = 'e-no-drop';
                        addClass([e.clonedNode.querySelector('.' + cls.ICON)], 'e-icon-expandable');
                        removeClass([e.clonedNode.querySelector('.' + cls.ICON)], 'e-list-icon');
                    }
                },
                nodeClicked: this.fieldClickHandler.bind(this),
                nodeSelected: function (args) {
                    if (args.node.getAttribute('data-type') === CALC) {
                        _this.displayMenu(args.node);
                    }
                    else {
                        removeClass([args.node], 'e-active');
                        args.cancel = true;
                    }
                },
                nodeDragStop: this.fieldDropped.bind(this),
                drawNode: this.drawTreeNode.bind(this),
                nodeExpanding: this.updateNodeIcon.bind(this),
                nodeCollapsed: this.updateNodeIcon.bind(this),
                sortOrder: 'None',
            });
        }
        else {
            this.treeObj = new TreeView({
                fields: { dataSource: this.getFieldListData(this.parent), id: 'formula', text: 'name', iconCss: 'icon' },
                allowDragAndDrop: true,
                enableRtl: this.parent.enableRtl,
                nodeCollapsing: this.nodeCollapsing.bind(this),
                nodeDragStart: this.dragStart.bind(this),
                nodeClicked: this.fieldClickHandler.bind(this),
                nodeDragStop: this.fieldDropped.bind(this),
                drawNode: this.drawTreeNode.bind(this),
                sortOrder: 'Ascending'
            });
        }
        this.treeObj.isStringTemplate = true;
        this.treeObj.appendTo('#' + this.parentID + 'tree');
    };
    CalculatedField.prototype.updateNodeIcon = function (args) {
        if (args.node && args.node.querySelector('.e-list-icon') &&
            args.node.querySelector('.e-icon-expandable.e-process') &&
            (args.node.querySelector('.e-list-icon').className.indexOf('e-folderCDB-icon') > -1)) {
            var node = args.node.querySelector('.e-list-icon');
            removeClass([node], 'e-folderCDB-icon');
            addClass([node], 'e-folderCDB-open-icon');
        }
        else if (args.node && args.node.querySelector('.e-list-icon') &&
            args.node.querySelector('.e-icon-expandable') &&
            (args.node.querySelector('.e-list-icon').className.indexOf('e-folderCDB-open-icon') > -1)) {
            var node = args.node.querySelector('.e-list-icon');
            removeClass([node], 'e-folderCDB-open-icon');
            addClass([node], 'e-folderCDB-icon');
        }
        else {
            var curTreeData = this.treeObj.fields.dataSource;
            var fieldListData = curTreeData;
            var childNodes = [];
            for (var _i = 0, fieldListData_1 = fieldListData; _i < fieldListData_1.length; _i++) {
                var item = fieldListData_1[_i];
                if (item.pid === args.nodeData.id.toString()) {
                    childNodes.push(item);
                }
            }
            if (childNodes.length === 0) {
                this.parent.olapEngineModule.calcChildMembers = [];
                this.parent.olapEngineModule.getCalcChildMembers(this.parent.dataSourceSettings, args.nodeData.id.toString());
                childNodes = this.parent.olapEngineModule.calcChildMembers;
                this.parent.olapEngineModule.calcChildMembers = [];
                for (var _a = 0, childNodes_1 = childNodes; _a < childNodes_1.length; _a++) {
                    var node = childNodes_1[_a];
                    node.pid = args.nodeData.id.toString();
                    node.hasChildren = false;
                    node.spriteCssClass = 'e-level-members';
                    node.caption = (node.caption === '' ? this.parent.localeObj.getConstant('blank') : node.caption);
                    curTreeData.push(node);
                }
                this.treeObj.addNodes(childNodes, args.node);
            }
            else {
                return;
            }
        }
    };
    CalculatedField.prototype.nodeCollapsing = function (args) {
        args.cancel = true;
    };
    CalculatedField.prototype.dragStart = function (args) {
        var isDrag = false;
        var dragItem = args.clonedNode;
        if (dragItem && ((this.parent.dataType === 'olap' &&
            (dragItem.querySelector('.e-calc-dimension-icon,.e-calc-measure-icon,.e-measure-icon') ||
                dragItem.querySelector('.e-dimensionCDB-icon,.e-attributeCDB-icon,.e-hierarchyCDB-icon') ||
                dragItem.querySelector('.e-level-members,.e-namedSetCDB-icon'))) || (this.parent.dataType === 'pivot' &&
            args.event.target.classList.contains(cls.DRAG_CLASS)))) {
            isDrag = true;
        }
        if (isDrag) {
            addClass([args.draggedNode.querySelector('.' + cls.LIST_TEXT_CLASS)], cls.SELECTED_NODE_CLASS);
            addClass([dragItem], cls.PIVOTCALC);
            dragItem.style.zIndex = (this.dialog.zIndex + 1).toString();
            dragItem.style.display = 'inline';
        }
        else {
            args.cancel = true;
        }
    };
    /**
     * Trigger before treeview text append.
     * @param  {DrawNodeEventArgs} args
     * @returns void
     */
    CalculatedField.prototype.drawTreeNode = function (args) {
        if (this.parent.dataType === 'olap') {
            if (args.node.querySelector('.e-measure-icon')) {
                args.node.querySelector('.e-list-icon').style.display = 'none';
            }
            var field = args.nodeData;
            args.node.setAttribute('data-field', field.id);
            args.node.setAttribute('data-caption', field.caption);
            var liTextElement = args.node.querySelector('.' + cls.TEXT_CONTENT_CLASS);
            if (args.nodeData && args.nodeData.type === CALC &&
                liTextElement && args.node.querySelector('.e-list-icon.e-calc-member')) {
                args.node.setAttribute('data-type', field.type);
                args.node.setAttribute('data-membertype', field.fieldType);
                args.node.setAttribute('data-hierarchy', field.parentHierarchy ? field.parentHierarchy : '');
                args.node.setAttribute('data-formula', field.formula);
                var formatStringData = ['Standard', 'Currency', 'Percent'];
                var formatString = void 0;
                formatString = (field.formatString ? formatStringData.indexOf(field.formatString) > -1 ?
                    field.formatString : 'Custom' : '');
                args.node.setAttribute('data-formatString', formatString);
                args.node.setAttribute('data-customString', (formatString === 'Custom' ? field.formatString : ''));
                // if (!this.parent.isAdaptive) {
                //     let editElement: Node = args.node.querySelector('.e-list-icon.e-calc-member').cloneNode(true);
                //     let calcClasses: string[] = ['e-calc-measure-icon', 'e-calc-dimension-icon', 'e-calc-member'];
                //     removeClass([editElement as Element], calcClasses);
                //     addClass([editElement as Element], cls.CALC_EDIT);
                //     (editElement as Element).setAttribute('title', this.parent.localeObj.getConstant('edit'));
                //     liTextElement.insertBefore(editElement, args.node.querySelector('.e-list-icon'));
                // }
            }
            if (this.parent.isAdaptive) {
                var liTextElement_1 = args.node.querySelector('.' + cls.TEXT_CONTENT_CLASS);
                if (args.node && args.node.querySelector('.e-list-icon') && liTextElement_1) {
                    var liIconElement = args.node.querySelector('.e-list-icon');
                    liTextElement_1.insertBefore(liIconElement, args.node.querySelector('.e-list-text'));
                }
                if (args.node && args.node.querySelector('.e-calcMemberGroupCDB,.e-measureGroupCDB-icon,.e-folderCDB-icon')) {
                    args.node.querySelector('.e-checkbox-wrapper').style.display = 'none';
                }
                if (args.node && args.node.querySelector('.e-level-members')) {
                    args.node.querySelector('.e-list-icon').style.display = 'none';
                }
            }
        }
        else {
            var field = args.nodeData.field;
            args.node.setAttribute('data-field', field);
            args.node.setAttribute('data-caption', args.nodeData.caption);
            args.node.setAttribute('data-type', args.nodeData.type);
            var dragElement = createElement('span', {
                attrs: { 'tabindex': '-1', 'aria-disabled': 'false', 'title': this.parent.localeObj.getConstant('dragField') },
                className: cls.ICON + ' e-drag'
            });
            prepend([dragElement], args.node.querySelector('.' + cls.TEXT_CONTENT_CLASS));
            append([args.node.querySelector('.' + cls.FORMAT)], args.node.querySelector('.' + cls.TEXT_CONTENT_CLASS));
            if (this.parent.engineModule.fieldList[field].type !== 'number' &&
                this.parent.engineModule.fieldList[field].aggregateType !== CALC) {
                removeClass([args.node.querySelector('.' + cls.FORMAT)], cls.ICON);
            }
            else {
                args.node.querySelector('.' + cls.FORMAT).setAttribute('title', this.parent.localeObj.getConstant('format'));
            }
            if (this.parent.engineModule.fieldList[field].aggregateType === CALC) {
                args.node.querySelector('.' + cls.FORMAT).setAttribute('title', this.parent.localeObj.getConstant('edit'));
                addClass([args.node.querySelector('.' + cls.FORMAT)], cls.CALC_EDIT);
                removeClass([args.node.querySelector('.' + cls.FORMAT)], cls.FORMAT);
            }
        }
    };
    /**
     * To create radio buttons.
     * @param  {string} key
     * @returns HTMLElement
     */
    CalculatedField.prototype.createTypeContainer = function (key) {
        var wrapDiv = createElement('div', { id: this.parentID + 'control_wrapper', className: cls.TREEVIEWOUTER });
        var type = [SUM, COUNT, AVG, MIN, MAX, DISTINCTCOUNT, PRODUCT, STDEV, STDEVP, VAR, VARP];
        for (var i = 0; i < type.length; i++) {
            var input = createElement('input', {
                id: this.parentID + 'radio' + type[i],
                attrs: { 'type': 'radio', 'data-ftxt': key },
                className: cls.CALCRADIO
            });
            wrapDiv.appendChild(input);
        }
        return wrapDiv;
    };
    /**
     * To get Accordion Data.
     * @param  {PivotView | PivotFieldList} parent
     * @returns AccordionItemModel
     */
    CalculatedField.prototype.getAccordionData = function (parent) {
        var _this = this;
        var data = [];
        Object.keys(parent.engineModule.fieldList).forEach(function (key, index) {
            data.push({
                header: '<input id=' + _this.parentID + '_' + index + ' class=' + cls.CALCCHECK + ' type="checkbox" data-field=' +
                    key + ' data-caption=' + _this.parent.engineModule.fieldList[key].caption + ' data-type=' +
                    _this.parent.engineModule.fieldList[key].type + '/>',
                content: parent.engineModule.fieldList[key].aggregateType === CALC ||
                    _this.parent.engineModule.fieldList[key].type !== 'number' ? '' : _this.createTypeContainer(key).outerHTML
            });
        });
        return data;
    };
    /**
     * To render mobile layout.
     * @param  {Tab} tabObj
     * @returns void
     */
    CalculatedField.prototype.renderMobileLayout = function (tabObj) {
        tabObj.items[4].content = this.renderDialogElements().outerHTML;
        tabObj.dataBind();
        if (this.parent.dataType === 'olap' && this.parent.isAdaptive) {
            this.createOlapDropElements();
        }
        var cancelBtn = new Button({ cssClass: cls.FLAT, isPrimary: true });
        cancelBtn.isStringTemplate = true;
        cancelBtn.appendTo('#' + this.parentID + 'cancelBtn');
        if (cancelBtn.element) {
            cancelBtn.element.onclick = this.cancelBtnClick.bind(this);
        }
        if (this.parent.
            dialogRenderer.parentElement.querySelector('.' + cls.FORMULA) !== null && this.parent.isAdaptive) {
            var okBtn = new Button({ cssClass: cls.FLAT + ' ' + cls.OUTLINE_CLASS, isPrimary: true });
            okBtn.isStringTemplate = true;
            okBtn.appendTo('#' + this.parentID + 'okBtn');
            this.inputObj = new MaskedTextBox({
                placeholder: this.parent.localeObj.getConstant('fieldName')
            });
            this.inputObj.isStringTemplate = true;
            this.inputObj.appendTo('#' + this.parentID + 'ddlelement');
            if (this.formulaText !== null && this.parent.
                dialogRenderer.parentElement.querySelector('#' + this.parentID + 'droppable') !== null) {
                var drop = this.parent.
                    dialogRenderer.parentElement.querySelector('#' + this.parentID + 'droppable');
                drop.value = this.formulaText;
            }
            if (this.fieldText !== null && this.parent.
                dialogRenderer.parentElement.querySelector('.' + cls.CALCINPUT) !== null) {
                this.parent.
                    dialogRenderer.parentElement.querySelector('.' + cls.CALCINPUT).value = this.fieldText;
                this.inputObj.value = this.fieldText;
            }
            if (okBtn.element) {
                okBtn.element.onclick = this.applyFormula.bind(this);
            }
        }
        else if (this.parent.isAdaptive) {
            var addBtn = new Button({ cssClass: cls.FLAT, isPrimary: true });
            addBtn.isStringTemplate = true;
            addBtn.appendTo('#' + this.parentID + 'addBtn');
            if (this.parent.dataType === 'olap') {
                this.treeObj = new TreeView({
                    /* tslint:disable-next-line:max-line-length */
                    fields: { dataSource: this.getFieldListData(this.parent), id: 'id', text: 'caption', parentID: 'pid', iconCss: 'spriteCssClass' },
                    showCheckBox: true,
                    autoCheck: false,
                    sortOrder: 'None',
                    enableRtl: this.parent.enableRtl,
                    drawNode: this.drawTreeNode.bind(this),
                    nodeExpanding: this.updateNodeIcon.bind(this),
                    nodeCollapsed: this.updateNodeIcon.bind(this)
                });
                this.treeObj.isStringTemplate = true;
                this.treeObj.appendTo('#' + this.parentID + 'accordDiv');
            }
            else {
                var accordion = new Accordion({
                    items: this.getAccordionData(this.parent),
                    enableRtl: this.parent.enableRtl,
                    expanding: this.accordionExpand.bind(this),
                });
                accordion.isStringTemplate = true;
                accordion.appendTo('#' + this.parentID + 'accordDiv');
                Object.keys(this.parent.engineModule.fieldList).forEach(this.updateType.bind(this));
            }
            if (addBtn.element) {
                addBtn.element.onclick = this.addBtnClick.bind(this);
            }
        }
    };
    CalculatedField.prototype.accordionExpand = function (args) {
        var _this = this;
        if (args.element.querySelectorAll('.e-radio-wrapper').length === 0) {
            Object.keys(this.parent.engineModule.fieldList).forEach(function (key) {
                var type = [SUM, COUNT, AVG, MIN, MAX, DISTINCTCOUNT, PRODUCT, STDEV, STDEVP, VAR, VARP];
                var radiobutton;
                if (key === args.element.querySelector('[data-field').getAttribute('data-field')) {
                    for (var i = 0; i < type.length; i++) {
                        radiobutton = new RadioButton({
                            label: _this.parent.localeObj.getConstant(type[i]),
                            name: AGRTYPE + key,
                            change: _this.onChange.bind(_this),
                        });
                        radiobutton.isStringTemplate = true;
                        radiobutton.appendTo('#' + _this.parentID + 'radio' + type[i]);
                    }
                }
            });
        }
    };
    CalculatedField.prototype.onChange = function (args) {
        var type = args.event.target.id.split(this.parent.element.id + 'radio')[1];
        var field = args.event.target.closest('.e-acrdn-item').
            querySelector('[data-field').getAttribute('data-caption');
        args.event.target.
            closest('.e-acrdn-item').querySelector('.e-label').
            innerText = field + ' (' + type + ')';
        args.event.target.closest('.e-acrdn-item').
            querySelector('[data-type').setAttribute('data-type', type);
    };
    CalculatedField.prototype.updateType = function (key, index) {
        var type = null;
        if (this.parent.engineModule.fieldList[key].type === 'string' ||
            this.parent.engineModule.fieldList[key].type === 'include' ||
            this.parent.engineModule.fieldList[key].type === 'exclude') {
            type = COUNT;
        }
        else {
            type = this.parent.engineModule.fieldList[key].aggregateType !== undefined ?
                this.parent.engineModule.fieldList[key].aggregateType : SUM;
        }
        var checkbox = new CheckBox({
            label: this.parent.engineModule.fieldList[key].caption + ' (' + type + ')'
        });
        checkbox.isStringTemplate = true;
        checkbox.appendTo('#' + this.parentID + '_' + index);
        document.querySelector('#' + this.parentID + '_' + index).setAttribute('data-field', key);
        document.querySelector('#' + this.parentID + '_' + index).setAttribute('data-type', type);
    };
    /**
     * Trigger while click cancel button.
     * @returns void
     */
    CalculatedField.prototype.cancelBtnClick = function () {
        this.renderMobileLayout(this.parent.dialogRenderer.adaptiveElement);
    };
    /**
     * Trigger while click add button.
     * @returns void
     */
    CalculatedField.prototype.addBtnClick = function () {
        var fieldText = '';
        var field = null;
        var type = null;
        if (this.parent.dataType === 'pivot') {
            var node = document.querySelectorAll('.e-accordion .e-check');
            for (var i = 0; i < node.length; i++) {
                field = node[i].parentElement.querySelector('[data-field]').getAttribute('data-field');
                type = node[i].parentElement.querySelector('[data-field]').getAttribute('data-type');
                if (type.indexOf(CALC) === -1) {
                    fieldText = fieldText + ('"' + type + '(' + field + ')' + '"');
                }
                else {
                    for (var j = 0; j < this.parent.dataSourceSettings.calculatedFieldSettings.length; j++) {
                        if (this.parent.dataSourceSettings.calculatedFieldSettings[j].name === field) {
                            fieldText = fieldText + this.parent.dataSourceSettings.calculatedFieldSettings[j].formula;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var nodes = this.treeObj.getAllCheckedNodes();
            var olapEngine = this.parent.olapEngineModule;
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var item = nodes_1[_i];
                fieldText = fieldText + (olapEngine.fieldList[item] &&
                    olapEngine.fieldList[item].type === CALC ? olapEngine.fieldList[item].tag : item);
            }
        }
        this.formulaText = this.formulaText !== null ? (this.formulaText + fieldText) : fieldText;
        this.renderMobileLayout(this.parent.dialogRenderer.adaptiveElement);
    };
    /**
     * To create calculated field dialog elements.
     * @returns void

     */
    CalculatedField.prototype.createCalculatedFieldDialog = function () {
        if (this.parent.isAdaptive && this.parent.getModuleName() === 'pivotfieldlist') {
            this.renderAdaptiveLayout();
        }
        else if (!this.parent.isAdaptive) {
            this.renderDialogLayout();
            this.dialog.element.style.top = parseInt(this.dialog.element.style.top, 10) < 0 ? '0px' : this.dialog.element.style.top;
        }
    };
    /**
     * To create calculated field desktop layout.
     * @returns void
     */
    CalculatedField.prototype.renderDialogLayout = function () {
        this.newFields =
            extend([], this.parent.dataSourceSettings.calculatedFieldSettings, null, true);
        this.createDialog();
        this.dialog.content = this.renderDialogElements();
        this.dialog.refresh();
        this.inputObj = new MaskedTextBox({
            placeholder: this.parent.localeObj.getConstant('fieldName')
        });
        this.inputObj.isStringTemplate = true;
        this.inputObj.appendTo('#' + this.parentID + 'ddlelement');
        if (this.parent.dataType === 'olap' && !this.parent.isAdaptive) {
            this.createOlapDropElements();
        }
        this.createTreeView();
        this.createMenu();
        this.droppable = new Droppable(this.dialog.element.querySelector('#' + this.parentID + 'droppable'));
        this.keyboardEvents = new KeyboardEvents(this.parent.calculatedFieldModule.dialog.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: { moveRight: 'rightarrow', enter: 'enter' },
            eventName: 'keydown'
        });
    };
    /**
     * Creates the error dialog for the unexpected action done.
     * @method createConfirmDialog
     * @return {void}

     */
    CalculatedField.prototype.createConfirmDialog = function (title, description) {
        var errorDialog = createElement('div', {
            id: this.parentID + '_ErrorDialog',
            className: cls.ERROR_DIALOG_CLASS
        });
        this.parent.element.appendChild(errorDialog);
        this.confirmPopUp = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: false,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            width: 'auto',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.replaceFormula.bind(this),
                    buttonModel: {
                        cssClass: cls.OK_BUTTON_CLASS + ' ' + cls.OUTLINE_CLASS,
                        content: this.parent.localeObj.getConstant('ok'), isPrimary: true
                    }
                },
                {
                    click: this.removeErrorDialog.bind(this),
                    buttonModel: {
                        cssClass: cls.CANCEL_BUTTON_CLASS,
                        content: this.parent.localeObj.getConstant('cancel'), isPrimary: true
                    }
                }
            ],
            header: title,
            content: description,
            isModal: true,
            visible: true,
            closeOnEscape: true,
            target: document.body,
            close: this.removeErrorDialog.bind(this),
        });
        this.confirmPopUp.isStringTemplate = true;
        this.confirmPopUp.appendTo(errorDialog);
        // this.confirmPopUp.element.querySelector('.e-dlg-header').innerHTML = title;
    };
    CalculatedField.prototype.replaceFormula = function () {
        var report = this.parent.dataSourceSettings;
        var dropField = document.querySelector('#' + this.parentID + 'droppable');
        if (this.parent.dataType === 'olap') {
            var dialogElement = this.dialog.element;
            /* tslint:disable */
            var customFormat = getInstance(dialogElement.querySelector('#' + this.parentID + 'Custom_Format_Element'), MaskedTextBox);
            var formatDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Format_Div'), DropDownList);
            var memberTypeDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Member_Type_Div'), DropDownList);
            var hierarchyDrop = getInstance(dialogElement.querySelector('#' + this.parentID + 'Hierarchy_List_Div'), DropDownList);
            /* tslint:enable */
            for (var j = 0; j < report.calculatedFieldSettings.length; j++) {
                if (report.calculatedFieldSettings[j].name === this.inputObj.value) {
                    if (memberTypeDrop.value === 'Dimension') {
                        report.calculatedFieldSettings[j].hierarchyUniqueName = hierarchyDrop.value;
                    }
                    report.calculatedFieldSettings[j].formatString =
                        (formatDrop.value === 'Custom' ? customFormat.value : formatDrop.value);
                    report.calculatedFieldSettings[j].formula = dropField.value;
                    this.parent.lastCalcFieldInfo = report.calculatedFieldSettings[j];
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < report.values.length; i++) {
                if (report.values[i].type === CALC && report.values[i].name === this.inputObj.value) {
                    for (var j = 0; j < report.calculatedFieldSettings.length; j++) {
                        if (report.calculatedFieldSettings[j].name === this.inputObj.value) {
                            report.calculatedFieldSettings[j].formula = dropField.value;
                            this.parent.lastCalcFieldInfo = report.calculatedFieldSettings[j];
                        }
                    }
                }
            }
        }
        this.addFormula(report, this.inputObj.value);
        this.removeErrorDialog();
    };
    CalculatedField.prototype.removeErrorDialog = function () {
        if (document.getElementById(this.parentID + '_ErrorDialog')) {
            remove(document.getElementById(this.parentID + '_ErrorDialog').parentElement);
        }
    };
    /**
     * To add event listener.
     * @returns void

     */
    CalculatedField.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initCalculatedField, this.createCalculatedFieldDialog, this);
    };
    /**
     * To remove event listener.
     * @returns void

     */
    CalculatedField.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initCalculatedField, this.createCalculatedFieldDialog);
    };
    /**
     * To destroy the calculated field dialog
     * @returns void

     */
    CalculatedField.prototype.destroy = function () {
        this.removeEventListener();
    };
    return CalculatedField;
}());
export { CalculatedField };
