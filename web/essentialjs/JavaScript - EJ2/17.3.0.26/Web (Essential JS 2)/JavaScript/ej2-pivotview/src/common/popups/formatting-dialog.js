import { PivotView } from '../../pivotview/base/pivotview';
import { Dialog, hideSpinner } from '@syncfusion/ej2-popups';
import { createElement, remove, extend } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Common } from '../actions/common';
PivotView.Inject(Common);
/**
 * Module to render NumberFormatting Dialog
 */
var NumberFormatting = /** @class */ (function () {
    function NumberFormatting(parent) {
        this.parent = parent;
        this.parent.numberFormattingModule = this;
        this.removeEventListener();
        this.addEventListener();
    }
    /**
     * To get module name.
     * @returns string
     */
    NumberFormatting.prototype.getModuleName = function () {
        return 'numberformatting';
    };
    /**
     * To show Number Formatting dialog.
     * @returns void
     */
    NumberFormatting.prototype.showNumberFormattingDialog = function () {
        var _this = this;
        var valueDialog = createElement('div', {
            id: this.parent.element.id + '_FormatDialog',
            className: cls.FORMATTING_DIALOG
        });
        this.parent.element.appendChild(valueDialog);
        this.dialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            header: this.parent.localeObj.getConstant('numberFormat'),
            content: this.getDialogContent(),
            isModal: true,
            visible: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            width: 'auto',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.updateFormatting.bind(this),
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS, content: this.parent.localeObj.getConstant('apply'), isPrimary: true }
                },
                {
                    click: function () { _this.dialog.hide(); },
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS, content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: true,
            target: this.parent.element,
            overlayClick: function () { _this.removeDialog(); },
            close: this.removeDialog.bind(this)
        });
        this.dialog.isStringTemplate = true;
        this.dialog.appendTo(valueDialog);
        this.dialog.element.querySelector('.' + cls.DIALOG_HEADER).innerHTML = this.parent.localeObj.getConstant('numberFormat');
        this.renderControls();
    };
    NumberFormatting.prototype.getDialogContent = function () {
        var outerElement = createElement('div', {
            id: this.parent.element.id + '_FormatDialogOuter',
            className: cls.FORMATTING_DIALOG_OUTER
        });
        var table = createElement('table', {
            id: this.parent.element.id + '_FormatTable',
            className: cls.FORMATTING_TABLE,
            styles: 'width: 100%'
        });
        var tRow = createElement('tr');
        var tValue = createElement('td');
        var valueLable = createElement('div', {
            id: this.parent.element.id + '_FormatValueLable',
            className: cls.FORMATTING_VALUE_LABLE,
            innerHTML: this.parent.localeObj.getConstant('values')
        });
        var valueDrop = createElement('div', {
            id: this.parent.element.id + '_FormatValueDrop'
        });
        tValue.appendChild(valueLable);
        tValue.appendChild(valueDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var formatLable = createElement('div', {
            id: this.parent.element.id + '_FormatLable',
            className: cls.FORMATTING_FORMAT_LABLE,
            innerHTML: this.parent.localeObj.getConstant('formatType')
        });
        var formatDrop = createElement('div', {
            id: this.parent.element.id + '_FormatDrop'
        });
        tValue.appendChild(formatLable);
        tValue.appendChild(formatDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var groupingLable = createElement('div', {
            id: this.parent.element.id + '_GroupingLable',
            className: cls.FORMATTING_GROUPING_LABLE,
            innerHTML: this.parent.localeObj.getConstant('grouping')
        });
        var groupingDrop = createElement('div', {
            id: this.parent.element.id + '_GroupingDrop'
        });
        tValue.appendChild(groupingLable);
        tValue.appendChild(groupingDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var decimalLable = createElement('div', {
            id: this.parent.element.id + '_DecimalLable',
            className: cls.FORMATTING_DECIMAL_LABLE,
            innerHTML: this.parent.localeObj.getConstant('decimalPlaces')
        });
        var decimalDrop = createElement('div', {
            id: this.parent.element.id + '_DecimalDrop'
        });
        tValue.appendChild(decimalLable);
        tValue.appendChild(decimalDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        this.customLable = createElement('div', {
            id: this.parent.element.id + '_CustomLable',
            className: cls.FORMATTING_CUSTOM_LABLE,
            innerHTML: this.parent.localeObj.getConstant('customFormatString')
        });
        this.customText = createElement('input', {
            id: this.parent.element.id + '_CustomText',
            attrs: {
                'type': 'text', 'tabindex': '0'
            },
            className: cls.INPUT + ' ' + cls.FORMATTING_CUSTOM_TEXT
        });
        tValue.appendChild(this.customLable);
        tValue.appendChild(this.customText);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        table.appendChild(tRow);
        outerElement.appendChild(table);
        return outerElement;
    };
    NumberFormatting.prototype.renderControls = function () {
        if (this.dialog.element.querySelector('#' + this.parent.element.id + '_FormatValueDrop')) {
            var valueFields = [];
            valueFields.push({
                index: 0, name: this.parent.localeObj.getConstant('AllValues'), field: this.parent.localeObj.getConstant('AllValues')
            });
            for (var i = 0; i < this.parent.dataSourceSettings.values.length; i++) {
                valueFields.push({
                    index: i + 1, name: this.parent.dataSourceSettings.values[i].caption || this.parent.dataSourceSettings.values[i].name,
                    field: this.parent.dataSourceSettings.values[i].name
                });
            }
            this.valuesDropDown = new DropDownList({
                dataSource: valueFields, fields: { text: 'name', value: 'field' }, enableRtl: this.parent.enableRtl,
                index: 0, cssClass: cls.FORMATTING_VALUE_DROP, change: this.valueChange.bind(this), width: '100%'
            });
            this.valuesDropDown.isStringTemplate = true;
            this.valuesDropDown.appendTo('#' + this.parent.element.id + '_FormatValueDrop');
        }
        if (this.dialog.element.querySelector('#' + this.parent.element.id + '_FormatDrop')) {
            var fields = [
                { index: 0, name: this.parent.localeObj.getConstant('number') },
                { index: 1, name: this.parent.localeObj.getConstant('currency') },
                { index: 2, name: this.parent.localeObj.getConstant('percentage') },
                { index: 2, name: this.parent.localeObj.getConstant('Custom') }
            ];
            this.formatDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' },
                index: 0, change: this.dropDownChange.bind(this), enableRtl: this.parent.enableRtl,
                cssClass: cls.FORMATTING_FORMAT_DROP, width: '100%'
            });
            this.formatDropDown.isStringTemplate = true;
            this.formatDropDown.appendTo('#' + this.parent.element.id + '_FormatDrop');
        }
        if (this.dialog.element.querySelector('#' + this.parent.element.id + '_GroupingDrop')) {
            var fields = [
                { index: 0, name: this.parent.localeObj.getConstant('true') },
                { index: 1, name: this.parent.localeObj.getConstant('false') }
            ];
            this.groupingDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' }, enableRtl: this.parent.enableRtl,
                index: 0, cssClass: cls.FORMATTING_GROUPING_DROP, width: '100%'
            });
            this.groupingDropDown.isStringTemplate = true;
            this.groupingDropDown.appendTo('#' + this.parent.element.id + '_GroupingDrop');
        }
        if (this.dialog.element.querySelector('#' + this.parent.element.id + '_DecimalDrop')) {
            var fields = [
                { index: 0, name: 0 },
                { index: 1, name: 1 },
                { index: 2, name: 2 },
                { index: 3, name: 3 },
                { index: 4, name: 4 },
                { index: 5, name: 5 },
                { index: 6, name: 6 },
                { index: 7, name: 7 },
                { index: 8, name: 8 },
                { index: 9, name: 9 },
                { index: 10, name: 10 },
            ];
            this.decimalDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' }, enableRtl: this.parent.enableRtl,
                index: 0, cssClass: cls.FORMATTING_DECIMAL_DROP, popupHeight: 150, width: '100%'
            });
            this.decimalDropDown.isStringTemplate = true;
            this.decimalDropDown.appendTo('#' + this.parent.element.id + '_DecimalDrop');
        }
        if (this.formatDropDown.value !== this.parent.localeObj.getConstant('Custom')) {
            this.customText.disabled = true;
        }
    };
    NumberFormatting.prototype.valueChange = function (args) {
        var format = this.parent.dataSourceSettings.formatSettings;
        var isExist = false;
        for (var i = 0; i < format.length; i++) {
            if (format[i].name === args.value) {
                var fString = format[i].format;
                var first = fString.split('')[0].toLowerCase();
                if (fString.length === 2 && ['n', 'p', 'c'].indexOf(first) > -1) {
                    this.formatDropDown.value = first === 'n' ? this.parent.localeObj.getConstant('number') : first === 'p' ?
                        this.parent.localeObj.getConstant('percentage') : first === 'c' ? this.parent.localeObj.getConstant('currency') :
                        this.parent.localeObj.getConstant('number');
                    this.decimalDropDown.value = Number(fString.split('')[1]);
                    this.groupingDropDown.value = format[i].useGrouping ? this.parent.localeObj.getConstant('true') :
                        this.parent.localeObj.getConstant('false');
                }
                else {
                    this.formatDropDown.value = this.parent.localeObj.getConstant('Custom');
                    this.customText.value = fString;
                }
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            this.formatDropDown.value = this.parent.localeObj.getConstant('number');
            this.decimalDropDown.value = 0;
            this.groupingDropDown.value = this.parent.localeObj.getConstant('true');
        }
    };
    NumberFormatting.prototype.dropDownChange = function (args) {
        if (args.value === this.parent.localeObj.getConstant('Custom')) {
            this.customText.disabled = false;
            this.groupingDropDown.enabled = false;
            this.decimalDropDown.enabled = false;
        }
        else {
            this.customText.disabled = true;
            this.groupingDropDown.enabled = true;
            this.decimalDropDown.enabled = true;
        }
    };
    NumberFormatting.prototype.removeDialog = function () {
        if (this.dialog && !this.dialog.isDestroyed) {
            this.dialog.destroy();
        }
        if (document.getElementById(this.parent.element.id + '_FormatDialog')) {
            remove(document.getElementById(this.parent.element.id + '_FormatDialog'));
        }
    };
    NumberFormatting.prototype.updateFormatting = function () {
        var _this = this;
        var text;
        if (this.formatDropDown.value === this.parent.localeObj.getConstant('number') ||
            this.formatDropDown.value === this.parent.localeObj.getConstant('percentage') ||
            this.formatDropDown.value === this.parent.localeObj.getConstant('currency')) {
            text = this.formatDropDown.value === this.parent.localeObj.getConstant('number') ? 'N' :
                this.formatDropDown.value === this.parent.localeObj.getConstant('currency') ? 'C' : 'P';
            text += this.decimalDropDown.value;
        }
        else {
            text = this.customText.value;
        }
        var format = extend([], this.parent.dataSourceSettings.formatSettings, true);
        if (this.valuesDropDown.value === this.parent.localeObj.getConstant('AllValues')) {
            var fieldList_1 = this.parent.dataType === 'olap' ?
                this.parent.olapEngineModule.fieldList : this.parent.engineModule.fieldList;
            Object.keys(fieldList_1).forEach(function (key) {
                if (fieldList_1[key].type === 'number') {
                    _this.insertFormat(key, text);
                }
            });
        }
        else {
            this.insertFormat(this.valuesDropDown.value.toString(), text);
        }
        try {
            this.parent.updateDataSource(false);
            this.dialog.close();
        }
        catch (exception) {
            this.parent.setProperties({ dataSourceSettings: { formatSettings: format } }, true);
            this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('invalidFormat'), this.dialog.element);
            hideSpinner(this.parent.element);
        }
    };
    NumberFormatting.prototype.insertFormat = function (fieldName, text) {
        var isExist = false;
        var newFormat = {
            name: fieldName, format: text,
            useGrouping: this.groupingDropDown.value === this.parent.localeObj.getConstant('true') ? true : false
        };
        var format = this.parent.dataSourceSettings.formatSettings;
        for (var i = 0; i < format.length; i++) {
            if (format[i].name === fieldName) {
                format[i] = newFormat;
                isExist = true;
            }
        }
        if (!isExist) {
            format.push(newFormat);
        }
    };
    /**
     * To add event listener.
     * @returns void

     */
    NumberFormatting.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initFormatting, this.showNumberFormattingDialog, this);
    };
    /**
     * To remove event listener.
     * @returns void

     */
    NumberFormatting.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initFormatting, this.showNumberFormattingDialog);
    };
    /**
     * To destroy the calculated field dialog
     * @returns void

     */
    NumberFormatting.prototype.destroy = function () {
        if (this.dialog && !this.dialog.isDestroyed) {
            this.dialog.destroy();
        }
        this.removeEventListener();
    };
    return NumberFormatting;
}());
export { NumberFormatting };