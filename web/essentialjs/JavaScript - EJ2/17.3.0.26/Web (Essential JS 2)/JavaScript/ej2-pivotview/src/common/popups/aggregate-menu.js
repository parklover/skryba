import { createElement, remove, extend, getInstance } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as events from '../../common/base/constant';
/**
 * `AggregateMenu` module to create aggregate type popup.
 */
var AggregateMenu = /** @class */ (function () {
    /**
     * Constructor for the rener action.

     */
    function AggregateMenu(parent) {
        this.parent = parent;
    }
    /**
     * Initialize the pivot table rendering
     * @returns void
     * @private
     */
    AggregateMenu.prototype.render = function (args, parentElement) {
        this.parentElement = parentElement;
        this.openContextMenu(args);
    };
    AggregateMenu.prototype.openContextMenu = function (args) {
        if (this.menuInfo === undefined) {
            this.createContextMenu();
        }
        this.currentMenu = args.currentTarget;
        var pos = this.currentMenu.getBoundingClientRect();
        if (this.parent.enableRtl) {
            this.menuInfo.open(pos.top, pos.left - 105);
        }
        else {
            this.menuInfo.open(pos.top, pos.left);
        }
    };
    AggregateMenu.prototype.createContextMenu = function () {
        var menuItems = [
            { text: this.parent.localeObj.getConstant('Sum'), id: this.parent.element.id + '_Sum' },
            { text: this.parent.localeObj.getConstant('Count'), id: this.parent.element.id + '_Count' },
            { text: this.parent.localeObj.getConstant('DistinctCount'), id: this.parent.element.id + '_DistinctCount' },
            { text: this.parent.localeObj.getConstant('Product'), id: this.parent.element.id + '_Product' },
            { text: this.parent.localeObj.getConstant('Avg'), id: this.parent.element.id + '_Avg' },
            { text: this.parent.localeObj.getConstant('Min'), id: this.parent.element.id + '_Min' },
            { text: this.parent.localeObj.getConstant('Max'), id: this.parent.element.id + '_Max' },
            { text: this.parent.localeObj.getConstant('MoreOption'), id: this.parent.element.id + '_MoreOption' }
        ];
        var menuOptions = {
            items: menuItems,
            enableRtl: this.parent.enableRtl,
            beforeOpen: this.beforeMenuOpen.bind(this),
            select: this.selectOptionInContextMenu.bind(this)
        };
        var removeContextMenu = document.getElementById(this.parent.element.id + 'valueFieldContextMenu');
        if (removeContextMenu !== null) {
            removeContextMenu.innerHTML = '';
        }
        var contextMenu = createElement('ul', {
            id: this.parent.element.id + 'valueFieldContextMenu'
        });
        this.parent.element.appendChild(contextMenu);
        this.menuInfo = new Menu(menuOptions);
        this.menuInfo.isStringTemplate = true;
        this.menuInfo.appendTo(contextMenu);
    };
    AggregateMenu.prototype.beforeMenuOpen = function (args) {
        args.element.style.zIndex = (this.menuInfo.element.style.zIndex + 3).toString();
        args.element.style.display = 'inline';
    };
    AggregateMenu.prototype.createValueSettingsDialog = function (target, parentElement) {
        var _this = this;
        this.parentElement = parentElement;
        var valueDialog = createElement('div', {
            id: this.parentElement.id + '_ValueDialog',
            className: 'e-value-field-settings',
            attrs: { 'data-field': target.id }
        });
        this.parentElement.appendChild(valueDialog);
        this.valueDialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            header: this.parent.localeObj.getConstant('valueFieldSettings'),
            content: this.createFieldOptions(target),
            isModal: true,
            visible: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            width: 'auto',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.updateValueSettings.bind(this),
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS, content: this.parent.localeObj.getConstant('ok'), isPrimary: true }
                },
                {
                    click: function () { _this.valueDialog.hide(); },
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS, content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: true,
            target: this.parentElement,
            overlayClick: function () { _this.removeDialog(); },
            close: this.removeDialog.bind(this)
        });
        this.valueDialog.isStringTemplate = true;
        this.valueDialog.appendTo(valueDialog);
        // this.valueDialog.element.querySelector('.e-dlg-header').innerHTML = this.parent.localeObj.getConstant('valueFieldSettings');
    };
    /* tslint:disable:all */
    AggregateMenu.prototype.createFieldOptions = function (buttonElement) {
        var fieldCaption = buttonElement.getAttribute('data-caption');
        var summaryType = buttonElement.getAttribute('data-type');
        var baseField = buttonElement.getAttribute('data-basefield');
        var baseItem = buttonElement.getAttribute('data-baseitem');
        summaryType = (summaryType.toString() !== 'undefined' ? summaryType : 'Sum');
        var summaryDataSource = [
            { value: 'Sum', text: this.parent.localeObj.getConstant('Sum') },
            { value: 'Count', text: this.parent.localeObj.getConstant('Count') },
            { value: 'DistinctCount', text: this.parent.localeObj.getConstant('DistinctCount') },
            { value: 'Product', text: this.parent.localeObj.getConstant('Product') },
            { value: 'Avg', text: this.parent.localeObj.getConstant('Avg') },
            { value: 'Min', text: this.parent.localeObj.getConstant('Min') },
            { value: 'Max', text: this.parent.localeObj.getConstant('Max') },
            { value: 'Index', text: this.parent.localeObj.getConstant('Index') },
            { value: 'SampleStDev', text: this.parent.localeObj.getConstant('SampleStDev') },
            { value: 'PopulationStDev', text: this.parent.localeObj.getConstant('PopulationStDev') },
            { value: 'SampleVar', text: this.parent.localeObj.getConstant('SampleVar') },
            { value: 'PopulationVar', text: this.parent.localeObj.getConstant('PopulationVar') },
            { value: 'RunningTotals', text: this.parent.localeObj.getConstant('RunningTotals') },
            { value: 'DifferenceFrom', text: this.parent.localeObj.getConstant('DifferenceFrom') },
            { value: 'PercentageOfDifferenceFrom', text: this.parent.localeObj.getConstant('PercentageOfDifferenceFrom') },
            { value: 'PercentageOfGrandTotal', text: this.parent.localeObj.getConstant('PercentageOfGrandTotal') },
            { value: 'PercentageOfColumnTotal', text: this.parent.localeObj.getConstant('PercentageOfColumnTotal') },
            { value: 'PercentageOfRowTotal', text: this.parent.localeObj.getConstant('PercentageOfRowTotal') },
            { value: 'PercentageOfParentTotal', text: this.parent.localeObj.getConstant('PercentageOfParentTotal') },
            { value: 'PercentageOfParentColumnTotal', text: this.parent.localeObj.getConstant('PercentageOfParentColumnTotal') },
            { value: 'PercentageOfParentRowTotal', text: this.parent.localeObj.getConstant('PercentageOfParentRowTotal') }
        ];
        var baseItemTypes = ['DifferenceFrom', 'PercentageOfDifferenceFrom'];
        var baseFieldTypes = ['DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'];
        var dataFields = extend([], this.parent.dataSourceSettings.rows, null, true);
        dataFields = dataFields.concat(this.parent.dataSourceSettings.columns);
        var fieldDataSource = [];
        var fieldItemDataSource = [];
        // let summaryDataSource: { [key: string]: Object }[] = [];
        // for (let type of summaryTypes) {
        //     summaryDataSource.push({ value: type, text: type });
        // }
        for (var _i = 0, dataFields_1 = dataFields; _i < dataFields_1.length; _i++) {
            var field = dataFields_1[_i];
            var value = field.name;
            var text = (field.caption ? field.caption : field.name);
            fieldDataSource.push({ value: value, text: text });
        }
        baseField = (baseField && (baseField.toString() !== 'undefined' && baseField.toString() !== 'null') ? baseField : fieldDataSource[0].value);
        fieldItemDataSource = Object.keys(this.parent.engineModule.fieldList[(baseField.toString() !== 'undefined' ?
            baseField : fieldDataSource[0].value)].formattedMembers);
        baseItem = (baseItem.toString() !== 'undefined' ? baseItem : fieldItemDataSource[0]);
        var mainDiv = createElement('div', {
            className: 'e-value-field-div-content', id: this.parentElement.id + '_field_div_content',
            attrs: { 'data-type': summaryType, 'data-caption': fieldCaption, 'data-basefield': baseField, 'data-baseitem': baseItem }
        });
        var textWrappper = createElement('div', { className: 'e-field-name-text-wrapper', });
        var filterWrapperDiv1 = createElement('div', { className: 'e-field-option-wrapper' });
        var optionWrapperDiv1 = createElement('div', { className: 'e-type-option-wrapper' });
        var optionWrapperDiv2 = createElement('div', { className: 'e-base-field-option-wrapper' });
        var optionWrapperDiv3 = createElement('div', { className: 'e-base-item-option-wrapper' });
        var texttitle = createElement('div', { className: 'e-field-name-title', innerHTML: this.parent.localeObj.getConstant('sourceName') + '&nbsp;' });
        var textContent = createElement('div', { className: 'e-field-name-content', innerHTML: buttonElement.id.toString() });
        var inputTextDiv1 = createElement('div', {
            className: 'e-type-option-text', innerHTML: this.parent.localeObj.getConstant('sourceCaption')
        });
        var optionTextDiv1 = createElement('div', {
            className: 'e-base-field-option-text', innerHTML: this.parent.localeObj.getConstant('summarizeValuesBy')
        });
        var optionTextDiv2 = createElement('div', {
            className: 'e-base-item-option-text', innerHTML: this.parent.localeObj.getConstant('baseField')
        });
        var optionTextDiv3 = createElement('div', {
            className: 'e-type-option-text', innerHTML: this.parent.localeObj.getConstant('baseItem')
        });
        var inputDiv1 = createElement('div', { className: 'e-caption-input-wrapper' });
        var dropOptionDiv1 = createElement('div', { id: this.parentElement.id + '_type_option' });
        var dropOptionDiv2 = createElement('div', { id: this.parentElement.id + '_base_field_option' });
        var dropOptionDiv3 = createElement('div', { id: this.parentElement.id + '_base_item_option' });
        var inputField1 = createElement('input', {
            id: this.parentElement.id + 'type_input_option',
            className: 'e-caption-input-text',
            attrs: { 'type': 'text' }
        });
        textWrappper.appendChild(texttitle);
        textWrappper.appendChild(textContent);
        inputDiv1.appendChild(inputTextDiv1);
        inputDiv1.appendChild(inputField1);
        optionWrapperDiv1.appendChild(optionTextDiv1);
        optionWrapperDiv2.appendChild(optionTextDiv2);
        optionWrapperDiv3.appendChild(optionTextDiv3);
        optionWrapperDiv1.appendChild(dropOptionDiv1);
        optionWrapperDiv2.appendChild(dropOptionDiv2);
        optionWrapperDiv3.appendChild(dropOptionDiv3);
        filterWrapperDiv1.appendChild(textWrappper);
        filterWrapperDiv1.appendChild(inputDiv1);
        filterWrapperDiv1.appendChild(optionWrapperDiv1);
        filterWrapperDiv1.appendChild(optionWrapperDiv2);
        filterWrapperDiv1.appendChild(optionWrapperDiv3);
        mainDiv.appendChild(filterWrapperDiv1);
        var popupInstance = this;
        var optionWrapper1 = new DropDownList({
            dataSource: summaryDataSource, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' },
            value: summaryType,
            // popupWidth: 'auto',
            cssClass: cls.VALUE_OPTIONS_CLASS, width: '100%',
            change: function (args) {
                optionWrapper2.enabled = baseFieldTypes.indexOf(args.value) !== -1 ? true : false;
                optionWrapper3.enabled = baseItemTypes.indexOf(args.value) !== -1 ? true : false;
                if (optionWrapper3.enabled && optionWrapper3.dataSource.length === 1) {
                    optionWrapper3.dataSource = fieldItemDataSource;
                    optionWrapper3.refresh();
                }
            }
        });
        optionWrapper1.isStringTemplate = true;
        optionWrapper1.appendTo(dropOptionDiv1);
        var optionWrapper2 = new DropDownList({
            dataSource: fieldDataSource, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' },
            value: baseField,
            // popupWidth: 'auto',
            enabled: (baseFieldTypes.indexOf(summaryType) !== -1 ? true : false),
            cssClass: cls.VALUE_OPTIONS_CLASS, width: '100%',
            change: function (args) {
                fieldItemDataSource = Object.keys(popupInstance.parent.engineModule.fieldList[args.value].formattedMembers);
                optionWrapper3.dataSource = fieldItemDataSource;
                optionWrapper3.value = fieldItemDataSource[0];
                optionWrapper3.filterBarPlaceholder = popupInstance.parent.localeObj.getConstant('example') + ' ' + fieldItemDataSource[0];
                optionWrapper3.refresh();
            }
        });
        optionWrapper2.isStringTemplate = true;
        optionWrapper2.appendTo(dropOptionDiv2);
        var optionWrapper3 = new DropDownList({
            dataSource: [fieldItemDataSource[0]], enableRtl: this.parent.enableRtl,
            value: baseItem,
            // popupWidth: 'auto',
            allowFiltering: true,
            filterBarPlaceholder: this.parent.localeObj.getConstant('example') + ' ' + fieldItemDataSource[0],
            enabled: (baseItemTypes.indexOf(summaryType) !== -1 ? true : false),
            cssClass: cls.FILTER_OPERATOR_CLASS, width: '100%',
        });
        optionWrapper3.isStringTemplate = true;
        optionWrapper3.appendTo(dropOptionDiv3);
        var inputObj1 = new MaskedTextBox({
            placeholder: 'Enter field caption',
            // floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl,
            value: fieldCaption, width: '100%'
        });
        inputObj1.isStringTemplate = true;
        inputObj1.appendTo(inputField1);
        return mainDiv;
    };
    /* tslint:enable:all */
    AggregateMenu.prototype.selectOptionInContextMenu = function (menu) {
        if (menu.item.text !== null) {
            var buttonElement = this.currentMenu.parentElement;
            var type = menu.item.id.split(this.parent.element.id + '_')[1];
            if (type === 'MoreOption') {
                this.createValueSettingsDialog(buttonElement, this.parentElement);
            }
            else {
                var field = buttonElement.getAttribute('data-uid');
                var valuefields = this.parent.dataSourceSettings.values;
                var contentElement = buttonElement.querySelector('.e-content');
                var captionName = menu.item.text + ' ' + 'of' + ' ' + this.parent.engineModule.fieldList[field].caption;
                contentElement.innerHTML = captionName;
                contentElement.setAttribute('title', captionName);
                buttonElement.setAttribute('data-type', type);
                for (var vCnt = 0; vCnt < this.parent.dataSourceSettings.values.length; vCnt++) {
                    if (this.parent.dataSourceSettings.values[vCnt].name === field) {
                        /* tslint:disable:align */
                        var dataSourceItem = extend({}, valuefields[vCnt].properties ?
                            valuefields[vCnt].properties : valuefields[vCnt], null, true);
                        /* tslint:enable:align */
                        dataSourceItem.type = type;
                        this.parent.engineModule.fieldList[field].aggregateType = type;
                        valuefields.splice(vCnt, 1, dataSourceItem);
                        this.parent.lastAggregationInfo = dataSourceItem;
                    }
                }
                this.updateDataSource();
            }
        }
    };
    AggregateMenu.prototype.updateDataSource = function (isRefreshed) {
        if (!this.parent.allowDeferLayoutUpdate || this.parent.getModuleName() === 'pivotview') {
            this.parent.updateDataSource(isRefreshed);
        }
        else {
            if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.renderMode === 'Popup') {
                /* tslint:disable:align */
                this.parent.pivotGridModule.setProperties({
                    dataSourceSettings: this.parent.dataSourceSettings.properties
                }, true);
                this.parent.pivotGridModule.notify(events.uiUpdate, this);
                this.parent.pivotGridModule.engineModule = this.parent.engineModule;
            }
            else {
                this.parent.triggerPopulateEvent();
            }
        }
    };
    AggregateMenu.prototype.updateValueSettings = function () {
        var dialogElement = this.valueDialog.element;
        var captionInstance = getInstance('#' + this.parentElement.id + 'type_input_option', MaskedTextBox);
        var summaryInstance = getInstance('#' + this.parentElement.id + '_type_option', DropDownList);
        var baseFieldInstance = getInstance('#' + this.parentElement.id + '_base_field_option', DropDownList);
        var baseItemInstance = getInstance('#' + this.parentElement.id + '_base_item_option', DropDownList);
        var fieldName = dialogElement.getAttribute('data-field');
        var buttonElement;
        if (this.parentElement.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            buttonElement = this.parentElement.
                querySelector('.' + cls.PIVOT_BUTTON_CLASS + '.' + fieldName.replace(/[^A-Z0-9]/ig, ''));
        }
        if (buttonElement) {
            var contentElement = buttonElement.querySelector('.e-content');
            var captionName = this.parent.localeObj.getConstant(summaryInstance.value) + ' ' + 'of' + ' ' + captionInstance.value;
            contentElement.innerHTML = captionName;
            contentElement.setAttribute('title', captionName);
            buttonElement.setAttribute('data-type', summaryInstance.value);
            buttonElement.setAttribute('data-caption', captionInstance.value);
            buttonElement.setAttribute('data-basefield', baseFieldInstance.value);
            buttonElement.setAttribute('data-baseitem', baseItemInstance.value);
        }
        var selectedField = this.parent.pivotCommon.eventBase.getFieldByName(fieldName, this.parent.dataSourceSettings.values);
        selectedField = selectedField.properties ?
            selectedField.properties : selectedField;
        selectedField.caption = captionInstance.value;
        selectedField.type = summaryInstance.value;
        selectedField.baseField = baseFieldInstance.value;
        selectedField.baseItem = baseItemInstance.value;
        this.valueDialog.close();
        // this.parent.axisFieldModule.render();
        this.parent.lastAggregationInfo = selectedField;
        this.updateDataSource(true);
    };
    AggregateMenu.prototype.removeDialog = function () {
        if (this.valueDialog && !this.valueDialog.isDestroyed) {
            this.valueDialog.destroy();
        }
        if (document.getElementById(this.parentElement.id + '_ValueDialog')) {
            remove(document.getElementById(this.parentElement.id + '_ValueDialog'));
        }
    };
    /**
     * To destroy the pivot button event listener
     * @return {void}

     */
    AggregateMenu.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.menuInfo && !this.menuInfo.isDestroyed) {
            this.menuInfo.destroy();
        }
        else {
            return;
        }
    };
    return AggregateMenu;
}());
export { AggregateMenu };
