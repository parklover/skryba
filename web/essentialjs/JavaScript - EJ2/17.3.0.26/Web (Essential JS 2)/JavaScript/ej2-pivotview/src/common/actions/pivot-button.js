import { createElement, Draggable, remove, extend } from '@syncfusion/ej2-base';
import { EventHandler, isBlazor } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, addClass, removeClass, closest, Browser } from '@syncfusion/ej2-base';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { Button } from '@syncfusion/ej2-buttons';
import { AggregateMenu } from '../popups/aggregate-menu';
import { AxisFieldRenderer } from '../../pivotfieldlist/renderer/axis-field-renderer';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/**
 * Module to render Pivot button
 */
var PivotButton = /** @class */ (function () {
    /** Constructor for render module */
    function PivotButton(parent) {
        this.parent = parent;
        this.menuOption = new AggregateMenu(this.parent);
        this.parent.pivotButtonModule = this;
        this.addEventListener();
        if (this.parent instanceof PivotFieldList) {
            this.axisField = new AxisFieldRenderer(this.parent);
        }
    }
    /* tslint:disable */
    PivotButton.prototype.renderPivotButton = function (args) {
        var field = extend([], args.field, null, true);
        var axis = args.axis;
        var axisElement;
        var valuePos = -1;
        var showValuesButton = (this.parent.dataType === 'pivot' ? (this.parent.getModuleName() == "pivotfieldlist" &&
            this.parent.pivotGridModule) ?
            this.parent.pivotGridModule.showValuesButton : this.parent.showValuesButton : false);
        if (((this.parent.dataSourceSettings.valueAxis === 'row' && args.axis === 'rows') ||
            (this.parent.dataSourceSettings.valueAxis === 'column' && args.axis === 'columns')) && showValuesButton && this.parent.dataSourceSettings.values.length > 1) {
            valuePos = field.length;
            field.push({
                name: this.parent.localeObj.getConstant('values'), caption: this.parent.localeObj.getConstant('values'),
                axis: args.axis
            });
        }
        this.parentElement = this.parent.getModuleName() === 'pivotview' ? this.parent.element :
            document.getElementById(this.parent.element.id + '_Wrapper');
        if (this.parent.getModuleName() === 'pivotfieldlist') {
            this.parentElement = document.getElementById(this.parent.element.id + '_Wrapper');
            if (this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis)) {
                var axisPrompt = this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis)
                    .querySelector('.' + cls.AXIS_PROMPT_CLASS);
                if (field.length === 0) {
                    removeClass([axisPrompt], cls.ICON_DISABLE);
                }
                else {
                    addClass([axisPrompt], cls.ICON_DISABLE);
                }
                axisElement =
                    this.parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-' + axis).querySelector('.' + cls.AXIS_CONTENT_CLASS);
            }
            else {
                return;
            }
        }
        else {
            this.parentElement = this.parent.element;
            axisElement = this.parentElement.querySelector('.e-group-' + axis);
        }
        if (axisElement) {
            if (this.parent.getModuleName() === 'pivotview' && field.length === 0) {
                for (var _i = 0, _a = this.parentElement.querySelectorAll('.e-group-' + axis); _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (!element.classList.contains(cls.GROUP_CHART_VALUE)) {
                        var axisPrompt = createElement('span', {
                            className: cls.AXIS_PROMPT_CLASS,
                            innerHTML: (this.parent.groupingBarSettings.allowDragAndDrop ? axis === 'rows' ? this.parent.localeObj.getConstant('rowAxisPrompt') :
                                axis === 'columns' ? this.parent.localeObj.getConstant('columnAxisPrompt') :
                                    axis === 'values' ? this.parent.localeObj.getConstant('valueAxisPrompt') :
                                        this.parent.localeObj.getConstant('filterAxisPrompt') : '')
                        });
                        element.appendChild(axisPrompt);
                    }
                }
            }
            else {
                for (var i = 0, cnt = field.length; i < cnt; i++) {
                    for (var _b = 0, _c = (this.parent.getModuleName() === 'pivotfieldlist' ? [axisElement] : this.parentElement.querySelectorAll('.e-group-' + axis)); _b < _c.length; _b++) {
                        var element = _c[_b];
                        element = element;
                        var isMeasureAvail = (this.parent.dataType === 'olap' && (field[i].name.toLowerCase() === '[measures]' || axis === 'values'));
                        var isMeasureFieldsAvail = (this.parent.dataType === 'olap' && axis === 'values');
                        if (!element.classList.contains(cls.GROUP_CHART_VALUE)) {
                            var buttonWrapper = createElement('div', {
                                className: cls.PIVOT_BUTTON_WRAPPER_CLASS + (i === 0 ? ' e-first-btn' : ''),
                                attrs: { 'data-tag': axis + ':' + field[i].name }
                            });
                            var buttonElement = createElement('div', {
                                id: field[i].name, className: cls.PIVOT_BUTTON_CLASS + ' ' + field[i].name.replace(/[^A-Z0-9]/ig, ''),
                                attrs: {
                                    'data-uid': field[i].name, 'tabindex': '0', 'isvalue': (i === valuePos || isMeasureAvail && !isMeasureFieldsAvail) ? 'true' : 'false',
                                    'aria-disabled': 'false', 'aria-label': field[i].caption ? field[i].caption : field[i].name,
                                    'data-type': (this.parent.dataType === 'olap' ? isMeasureFieldsAvail ? 'isMeasureFieldsAvail' : isMeasureAvail ? 'isMeasureAvail' : field[i].type : field[i].type),
                                    'data-caption': field[i].caption ? field[i].caption : field[i].name,
                                    'data-basefield': field[i].baseField,
                                    'data-baseitem': field[i].baseItem
                                }
                            });
                            var dropIndicatorElement = createElement('span', {
                                attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                                className: cls.DROP_INDICATOR_CLASS
                            });
                            var dropLastIndicatorElement = createElement('span', {
                                attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                                className: cls.DROP_INDICATOR_CLASS + '-last'
                            });
                            var dragWrapper = this.createButtonDragIcon(buttonElement);
                            var contentElement = this.createButtonText(field, i, axis, valuePos);
                            buttonElement.appendChild(contentElement);
                            if (!isMeasureAvail && !field[i].isNamedSet && !field[i].isCalculatedField) {
                                if (['filters', 'values'].indexOf(axis) === -1 && valuePos !== i &&
                                    !(this.parent.dataType === 'olap' && ((this.parent.getModuleName() === 'pivotview' &&
                                        this.parent.enableVirtualization) || (this.parent.getModuleName() === 'pivotfieldlist' &&
                                        this.parent.pivotGridModule !== undefined &&
                                        this.parent.pivotGridModule.enableVirtualization)))) {
                                    this.createSortOption(buttonElement, field[i].name);
                                }
                                if (axis !== 'values' && valuePos !== i) {
                                    this.createFilterOption(buttonElement, field[i].name, axis);
                                }
                                if (axis === 'values') {
                                    this.getTypeStatus(field, i, buttonElement);
                                }
                            }
                            var removeElement = createElement('span', {
                                attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                                className: cls.ICON + ' ' + cls.REMOVE_CLASS
                            });
                            if (this.parent.getModuleName() === 'pivotview') {
                                if (this.parent.groupingBarSettings.showRemoveIcon) {
                                    removeClass([removeElement], cls.ICON_DISABLE);
                                }
                                else {
                                    addClass([removeElement], cls.ICON_DISABLE);
                                }
                            }
                            buttonElement.appendChild(removeElement);
                            buttonWrapper.appendChild(dropIndicatorElement);
                            buttonWrapper.appendChild(buttonElement);
                            buttonWrapper.appendChild(dropLastIndicatorElement);
                            element.appendChild(buttonWrapper);
                            var pivotButton = new Button({ enableRtl: this.parent.enableRtl });
                            pivotButton.isStringTemplate = true;
                            pivotButton.appendTo(buttonElement);
                            this.unWireEvent(buttonWrapper, i === valuePos ? 'values' : axis, isMeasureAvail);
                            this.wireEvent(buttonWrapper, i === valuePos ? 'values' : axis, isMeasureAvail);
                            if ((this.parent.getModuleName() === 'pivotview' && !this.parent.isAdaptive) ||
                                this.parent.getModuleName() === 'pivotfieldlist') {
                                this.createDraggable(this.parent.getModuleName() === 'pivotview' ? contentElement : dragWrapper);
                            }
                        }
                    }
                }
                if (axis === 'values') {
                    var _loop_1 = function (element) {
                        if (element.classList.contains(cls.GROUP_CHART_VALUE) && this_1.parent.chartModule) {
                            var valueData = field.map(function (item) { return { text: item.caption ? item.caption : item.name, value: item.name }; });
                            var parent_1 = this_1.parent;
                            if (this_1.valueFiedDropDownList && element.querySelector('.' + cls.GROUP_CHART_VALUE_DROPDOWN_DIV)) {
                                this_1.valueFiedDropDownList.dataSource = valueData;
                                this_1.valueFiedDropDownList.value = !parent_1.chartSettings.enableMultiAxis ?
                                    parent_1.chartModule.currentMeasure : valueData[0].value;
                            }
                            else {
                                var ddlDiv = createElement('div', { className: cls.GROUP_CHART_VALUE_DROPDOWN_DIV });
                                element.appendChild(ddlDiv);
                                this_1.valueFiedDropDownList = new DropDownList({
                                    dataSource: valueData,
                                    enableRtl: this_1.parent.enableRtl,
                                    value: !parent_1.chartSettings.enableMultiAxis ?
                                        parent_1.chartModule.currentMeasure : valueData[0].value,
                                    width: 200,
                                    fields: { value: 'value', text: 'text' },
                                    cssClass: cls.GROUP_CHART_VALUE_DROPDOWN,
                                    change: function (args) {
                                        if (args.e && args.e !== null) {
                                            parent_1.chartSettings.value = args.value;
                                        }
                                    }
                                });
                                this_1.valueFiedDropDownList.isStringTemplate = true;
                                this_1.valueFiedDropDownList.appendTo(ddlDiv);
                            }
                        }
                    };
                    var this_1 = this;
                    for (var _d = 0, _e = this.parentElement.querySelectorAll('.e-group-' + axis); _d < _e.length; _d++) {
                        var element = _e[_d];
                        _loop_1(element);
                    }
                }
            }
        }
        else {
            return;
        }
    };
    PivotButton.prototype.createButtonText = function (field, i, axis, valuePos) {
        var buttonText;
        var aggregation;
        var filterMem;
        if (axis === "filters") {
            filterMem = this.updateButtontext(field[i].name);
        }
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (engineModule.fieldList[field[i].name] !== undefined) {
            aggregation = engineModule.fieldList[field[i].name].aggregateType;
            if (aggregation === undefined && (engineModule.fieldList[field[i].name].type === 'string' || engineModule.fieldList[field[i].name].type === 'include' ||
                engineModule.fieldList[field[i].name].type === 'exclude')) {
                aggregation = 'Count';
            }
            else if (aggregation === undefined) {
                aggregation = engineModule.fieldList[field[i].name].aggregateType !== undefined ?
                    engineModule.fieldList[field[i].name].aggregateType : 'Sum';
            }
        }
        var text = field[i].caption ? field[i].caption : field[i].name;
        buttonText = createElement('span', {
            attrs: {
                title: axis === 'filters' ? (this.parent.dataType === 'olap' && engineModule.fieldList[field[i].name].type === 'CalculatedField') ?
                    text : (text + ' (' + filterMem + ')') : (this.parent.dataType === 'olap' ?
                    text : (((!this.parent.dataSourceSettings.showAggregationOnValueField || axis !== 'values' || aggregation === 'CalculatedField') ?
                    text : this.parent.localeObj.getConstant(aggregation) + ' ' + 'of' + ' ' + text))),
                'tabindex': '-1', 'aria-disabled': 'false', 'oncontextmenu': 'return false;',
                'data-type': valuePos === i ? '' : aggregation
            },
            className: cls.PIVOT_BUTTON_CONTENT_CLASS + ' ' +
                (this.parent.getModuleName() === 'pivotview' && !this.parent.groupingBarSettings.allowDragAndDrop ? 'e-disable-drag' : ''),
            innerHTML: axis === 'filters' ? (this.parent.dataType === 'olap' && engineModule.fieldList[field[i].name].type === 'CalculatedField') ?
                text : (text + ' (' + filterMem + ')') : (this.parent.dataType === 'olap' ?
                text : (!this.parent.dataSourceSettings.showAggregationOnValueField || axis !== 'values' || aggregation === 'CalculatedField' ?
                text : this.parent.localeObj.getConstant(aggregation) + ' ' + 'of' + ' ' + text))
        });
        return buttonText;
    };
    PivotButton.prototype.getTypeStatus = function (field, i, buttonElement) {
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        var fieldListItem = engineModule.fieldList[field[i].name];
        if (fieldListItem.aggregateType !== 'CalculatedField' &&
            fieldListItem.type === 'number') {
            this.createSummaryType(buttonElement, field[i].name);
        }
    };
    PivotButton.prototype.createSummaryType = function (pivotButton, fieldName) {
        var spanElement = createElement('span', {
            attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
            className: cls.ICON + ' ' + cls.AXISFIELD_ICON_CLASS
        });
        if (this.parent.getModuleName() === 'pivotview') {
            if (this.parent.groupingBarSettings.showValueTypeIcon) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    PivotButton.prototype.createMenuOption = function (args) {
        this.menuOption.render(args, this.parentElement);
        this.parent.pivotButtonModule = this;
    };
    PivotButton.prototype.createDraggable = function (target) {
        this.draggable = new Draggable(target, {
            clone: true,
            enableTailMode: true,
            enableAutoScroll: true,
            helper: this.createDragClone.bind(this),
            dragStart: this.onDragStart.bind(this),
            drag: this.onDragging.bind(this),
            dragStop: this.onDragStop.bind(this),
            abort: (this.parent.getModuleName() === 'pivotview' && !this.parent.groupingBarSettings.allowDragAndDrop ? '.' + cls.PIVOT_BUTTON_CLASS : '')
        });
    };
    PivotButton.prototype.createButtonDragIcon = function (pivotButton) {
        var dragWrapper = createElement('span', {
            attrs: { 'tabindex': '-1', 'aria-disabled': 'false' }
        });
        var dragElement = createElement('span', {
            attrs: {
                'tabindex': '-1', 'aria-disabled': 'false'
            },
            className: cls.ICON + ' ' + cls.DRAG_CLASS
        });
        dragWrapper.appendChild(dragElement);
        pivotButton.appendChild(dragWrapper);
        return dragWrapper;
    };
    PivotButton.prototype.createSortOption = function (pivotButton, fieldName) {
        var sortCLass;
        var spanElement;
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (!this.parent.allowDeferLayoutUpdate) {
            sortCLass = engineModule.fieldList[fieldName].sort === 'Descending' ? cls.SORT_DESCEND_CLASS : '';
        }
        else {
            sortCLass = '';
            for (var i = 0; i < this.parent.dataSourceSettings.sortSettings.length; i++) {
                if (this.parent.dataSourceSettings.sortSettings[i].name === fieldName) {
                    sortCLass = this.parent.dataSourceSettings.sortSettings[i].order === 'Descending' ? cls.SORT_DESCEND_CLASS : '';
                }
            }
        }
        if (engineModule.fieldList[fieldName].sort === 'None') {
            spanElement = createElement('span', {
                attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                className: cls.ICON
            });
        }
        else {
            spanElement = createElement('span', {
                attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
                className: cls.ICON + ' ' + cls.SORT_CLASS + ' ' + sortCLass
            });
        }
        if (this.parent.dataSourceSettings.enableSorting) {
            removeClass([spanElement], cls.ICON_DISABLE);
        }
        else {
            addClass([spanElement], cls.ICON_DISABLE);
        }
        if (this.parent.getModuleName() === 'pivotview') {
            if (this.parent.groupingBarSettings.showSortIcon) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    PivotButton.prototype.createFilterOption = function (pivotButton, fieldName, axis) {
        var filterCLass;
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        if (!this.parent.allowDeferLayoutUpdate) {
            filterCLass = engineModule.fieldList[fieldName].filter.length === 0 ?
                !engineModule.fieldList[fieldName].isExcelFilter ? cls.FILTER_CLASS : cls.FILTERED_CLASS : cls.FILTERED_CLASS;
        }
        else {
            filterCLass = cls.FILTER_CLASS;
            for (var i = 0; i < this.parent.dataSourceSettings.filterSettings.length; i++) {
                if (this.parent.dataSourceSettings.filterSettings[i].name === fieldName) {
                    filterCLass = cls.FILTERED_CLASS;
                }
            }
        }
        var spanElement = createElement('span', {
            attrs: {
                'tabindex': '-1', 'aria-disabled': 'false'
            },
            className: cls.FILTER_COMMON_CLASS + ' ' + cls.ICON + ' ' + filterCLass
        });
        if ((((this.parent.dataSourceSettings.allowLabelFilter || this.parent.dataSourceSettings.allowValueFilter) &&
            axis !== 'filters') || this.parent.dataSourceSettings.allowMemberFilter)) {
            removeClass([spanElement], cls.ICON_DISABLE);
        }
        else {
            addClass([spanElement], cls.ICON_DISABLE);
        }
        if (this.parent.getModuleName() === 'pivotview') {
            if (this.parent.groupingBarSettings.showFilterIcon &&
                (((this.parent.dataSourceSettings.allowLabelFilter || this.parent.dataSourceSettings.allowValueFilter) &&
                    axis !== 'filters') || this.parent.dataSourceSettings.allowMemberFilter)) {
                removeClass([spanElement], cls.ICON_DISABLE);
            }
            else {
                addClass([spanElement], cls.ICON_DISABLE);
            }
        }
        pivotButton.appendChild(spanElement);
        return spanElement;
    };
    // To update button text
    PivotButton.prototype.updateButtontext = function (fieldName) {
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        var filterCount = engineModule.fieldList[fieldName].filter.length;
        var filterType = engineModule.fieldList[fieldName].filterType;
        var memLen = engineModule.fieldList[fieldName].dateMember.length;
        var filterMem;
        var firstNode = engineModule.fieldList[fieldName].filter[0];
        if (this.parent.dataType === 'olap') {
            filterMem = this.updateOlapButtonText(engineModule, fieldName, firstNode, filterCount);
        }
        else if (filterType === "include") {
            if (filterCount === 1) {
                filterMem = firstNode;
            }
            else if (filterCount > 1) {
                if (filterCount === memLen) {
                    filterMem = this.parent.localeObj.getConstant('all');
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
        }
        else if (filterType === "exclude") {
            if (filterCount === 1) {
                if (memLen === 2) {
                    if (firstNode !== engineModule.fieldList[fieldName].dateMember[0].actualText) {
                        filterMem = firstNode;
                    }
                    else {
                        filterMem = engineModule.fieldList[fieldName].dateMember[0].actualText;
                    }
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
            else if (filterCount > 1) {
                var j = void 0;
                var allNodes = Object.keys(engineModule.fieldList[fieldName].members);
                var filteredItems = engineModule.fieldList[fieldName].filter;
                if (filterCount === (allNodes.length - 1)) {
                    loop: for (j = 0; j < allNodes.length; j++) {
                        var test = allNodes[j];
                        var x = filteredItems.indexOf(test);
                        if (x === -1) {
                            filterMem = allNodes[j];
                            break loop;
                        }
                    }
                }
                else {
                    filterMem = this.parent.localeObj.getConstant('multipleItems');
                }
            }
        }
        else {
            filterMem = this.parent.localeObj.getConstant('all');
        }
        return filterMem;
    };
    PivotButton.prototype.updateOlapButtonText = function (engineModule, fieldName, firstNode, filterCount) {
        var filterMem;
        var filterItems = engineModule.fieldList[fieldName].actualFilter;
        if (filterItems.length > 0) {
            var cMembers = engineModule.fieldList[fieldName].members;
            var actualFilterItems = [];
            if (engineModule.fieldList[fieldName].filterMembers.length > 0) {
                var dummyfilterItems = {};
                for (var _i = 0, filterItems_1 = filterItems; _i < filterItems_1.length; _i++) {
                    var item = filterItems_1[_i];
                    dummyfilterItems[item] = item;
                    if (cMembers[item]) {
                        dummyfilterItems = this.parent.pivotCommon.eventBase.getParentNode(fieldName, item, dummyfilterItems);
                    }
                }
                var updatedFilterItems = dummyfilterItems ? Object.keys(dummyfilterItems) : [];
                for (var _a = 0, updatedFilterItems_1 = updatedFilterItems; _a < updatedFilterItems_1.length; _a++) {
                    var item = updatedFilterItems_1[_a];
                    if (cMembers[item].isSelected) {
                        if (!(cMembers[item].parent && cMembers[cMembers[item].parent].isSelected)) {
                            actualFilterItems.push(item);
                        }
                    }
                }
                firstNode = actualFilterItems.length === 1 ? cMembers[actualFilterItems[0]].caption : firstNode;
            }
            filterCount = actualFilterItems.length === 0 ? filterCount : actualFilterItems.length;
        }
        if (filterCount === 0) {
            filterMem = (engineModule.fieldList[fieldName].allMember ?
                engineModule.fieldList[fieldName].allMember : this.parent.localeObj.getConstant('all'));
        }
        else if (filterCount === 1) {
            filterMem = firstNode;
        }
        else if (filterCount > 1) {
            filterMem = this.parent.localeObj.getConstant('multipleItems');
        }
        return filterMem;
    };
    PivotButton.prototype.createDragClone = function (args) {
        var element = closest(args.element, '.' + cls.PIVOT_BUTTON_CLASS);
        var cloneElement = createElement('div', {
            id: this.parent.element.id + '_DragClone',
            className: cls.DRAG_CLONE_CLASS
        });
        var contentElement = createElement('span', {
            className: cls.TEXT_CONTENT_CLASS,
            innerHTML: element.textContent
        });
        cloneElement.appendChild(contentElement);
        document.body.appendChild(cloneElement);
        return cloneElement;
    };
    PivotButton.prototype.onDragStart = function (e) {
        this.parent.isDragging = true;
        var engineModule;
        if (this.parent.dataType === 'olap') {
            engineModule = this.parent.olapEngineModule;
        }
        else {
            engineModule = this.parent.engineModule;
        }
        var element = closest(e.element, '.' + cls.PIVOT_BUTTON_CLASS);
        var data = engineModule.fieldList[element.getAttribute('data-uid')];
        var axis = [cls.ROW_AXIS_CLASS, cls.COLUMN_AXIS_CLASS, cls.FILTER_AXIS_CLASS];
        var dragItem = document.getElementById(this.parent.element.id + '_DragClone');
        addClass([element], cls.SELECTED_NODE_CLASS);
        if (dragItem && (this.parent.getModuleName() === 'pivotfieldlist' &&
            this.parent.renderMode) === 'Popup') {
            var fieldListPopup = this.parent;
            dragItem.style.zIndex = (fieldListPopup.dialogRenderer.fieldListDialog.zIndex + 1).toString();
        }
        if (data && data.aggregateType === 'CalculatedField') {
            for (var _i = 0, axis_1 = axis; _i < axis_1.length; _i++) {
                var axisContent = axis_1[_i];
                addClass([this.parentElement.querySelector('.' + axisContent)], cls.NO_DRAG_CLASS);
            }
        }
        if (isBlazor()) {
            e.bindEvents(e.dragElement);
        }
    };
    PivotButton.prototype.onDragging = function (e) {
        this.draggable.setProperties({ cursorAt: { top: (!isNOU(e.event.targetTouches) || Browser.isDevice) ? 60 : -20, } });
        // if (closest(e.event.srcElement, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS)) {
        //     let droppableElement: HTMLElement = closest(e.event.srcElement, '.' + cls.DROPPABLE_CLASS) as HTMLElement;
        //     let buttonElement: HTMLElement = closest(e.event.srcElement, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS) as HTMLElement;
        //     if (droppableElement.offsetHeight < droppableElement.scrollHeight) {
        //         let scrollPosition: number = (droppableElement.scrollHeight - buttonElement.offsetTop);
        //         if (buttonElement.offsetTop >= droppableElement.offsetTop && scrollPosition > droppableElement.scrollTop) {
        //             droppableElement.scrollTop += Math.abs(buttonElement.offsetHeight);
        //         } else if (buttonElement.offsetTop <= droppableElement.offsetTop) {
        //             droppableElement.scrollTop -= Math.abs(buttonElement.offsetHeight);
        //         }
        //     }
        // }
    };
    PivotButton.prototype.onDragStop = function (args) {
        this.parent.isDragging = false;
        if (args.target.classList && (args.target.classList.contains(cls.GROUP_CHART_VALUE) || args.target.classList.contains(cls.GROUP_CHART_VALUE_DROPDOWN))) {
            args.target = this.parent.element.querySelector('.' + cls.GROUP_CHART_ROW);
        }
        var element = closest(args.element, '.' + cls.PIVOT_BUTTON_CLASS);
        removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS)), cls.SELECTED_NODE_CLASS);
        removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
        var axis = [cls.ROW_AXIS_CLASS, cls.COLUMN_AXIS_CLASS, cls.FILTER_AXIS_CLASS];
        for (var _i = 0, axis_2 = axis; _i < axis_2.length; _i++) {
            var axisContent = axis_2[_i];
            removeClass([this.parentElement.querySelector('.' + axisContent)], cls.NO_DRAG_CLASS);
        }
        if (this.parent.pivotCommon.filterDialog.dialogPopUp) {
            this.parent.pivotCommon.filterDialog.dialogPopUp.close();
        }
        if (document.getElementById(this.parent.element.id + '_DragClone')) {
            remove(document.getElementById(this.parent.element.id + '_DragClone'));
        }
        document.body.style.cursor = 'auto';
        if (!this.isButtonDropped(args.target, element)) {
            return;
        }
        this.parent.pivotCommon.dataSourceUpdate.control = this.parent.getModuleName() === 'pivotview' ? this.parent :
            (this.parent.pivotGridModule ? this.parent.pivotGridModule : this.parent);
        if (this.parent.pivotCommon.nodeStateModified.onStateModified(args, element.id)) {
            this.updateDataSource();
            var thisObj = this;
            //setTimeout(() => {
            thisObj.parent.axisFieldModule.render();
            //});
        }
    };
    PivotButton.prototype.isButtonDropped = function (dropTarget, target) {
        var axisPanel = closest(target, '.' + cls.DROPPABLE_CLASS);
        var droppableElement = closest(dropTarget, '.' + cls.DROPPABLE_CLASS);
        var isDropped = true;
        if (axisPanel === droppableElement) {
            var pivotButtons = [].slice.call(axisPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
            var droppableTarget = closest(dropTarget, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS);
            var sourcePosition = void 0;
            var droppedPosition = -1;
            for (var i = 0, n = pivotButtons.length; i < n; i++) {
                if (pivotButtons[i].id === target.id) {
                    sourcePosition = i;
                }
                if (droppableTarget) {
                    var droppableButton = droppableTarget.querySelector('.' + cls.PIVOT_BUTTON_CLASS);
                    if (pivotButtons[i].id === droppableButton.id) {
                        droppedPosition = i;
                    }
                }
            }
            if (sourcePosition === droppedPosition || (sourcePosition === (pivotButtons.length - 1) && droppedPosition === -1)) {
                removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
                isDropped = false;
            }
        }
        return isDropped;
    };
    PivotButton.prototype.updateSorting = function (args) {
        if (!(args.target.classList.contains(cls.FILTER_COMMON_CLASS)) &&
            !(args.target.classList.contains(cls.REMOVE_CLASS))) {
            if ((this.parent instanceof PivotFieldList || this.parent.groupingBarSettings.showSortIcon) &&
                this.parent.dataSourceSettings.enableSorting &&
                !(this.parent.dataType === 'olap' && ((this.parent.getModuleName() === 'pivotfieldlist' &&
                    this.parent.pivotGridModule !== undefined &&
                    this.parent.pivotGridModule.enableVirtualization) ||
                    (this.parent.getModuleName() === 'pivotview' && this.parent.enableVirtualization)))) {
                if (((this.parent.getModuleName() === 'pivotview' && this.parent.enableValueSorting) ||
                    (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.pivotGridModule !== undefined &&
                        this.parent.pivotGridModule.enableValueSorting))) {
                    if (this.parent.enableValueSorting || this.parent.pivotGridModule.enableValueSorting) {
                        if (args.target.classList.contains('e-pivot-button')) {
                            if (args.target.parentElement.getAttribute('data-tag').split(':')[0] === 'rows') {
                                this.parent.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                            }
                        }
                        else {
                            if (args.target.parentElement.parentElement.getAttribute('data-tag').split(':')[0] === 'rows') {
                                this.parent.setProperties({ dataSourceSettings: { valueSortSettings: { headerText: '' } } }, true);
                            }
                        }
                    }
                }
                this.parent.pivotCommon.eventBase.updateSorting(args);
                if (!this.parent.allowDeferLayoutUpdate || this.parent.getModuleName() != "pivotfieldlist") {
                    this.updateDataSource(true);
                }
                var thisObj = this;
                //setTimeout(() => {
                if (thisObj.parent instanceof PivotFieldList) {
                    thisObj.axisField.render();
                }
                //});
            }
        }
    };
    PivotButton.prototype.updateDataSource = function (isRefreshGrid) {
        if (!this.parent.allowDeferLayoutUpdate || this.parent.getModuleName() === 'pivotview') {
            this.parent.updateDataSource(isRefreshGrid);
        }
        else {
            if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.renderMode === 'Popup') {
                if (this.parent.dataType === 'olap') {
                    this.parent.pivotGridModule.olapEngineModule = this.parent.olapEngineModule;
                }
                else {
                    this.parent.pivotGridModule.engineModule = this.parent.engineModule;
                }
                this.parent.pivotGridModule.notify(events.uiUpdate, this);
                this.parent.
                    pivotGridModule.setProperties({ dataSourceSettings: this.parent.dataSourceSettings.properties }, true);
            }
            else {
                this.parent.triggerPopulateEvent();
            }
        }
    };
    PivotButton.prototype.updateFiltering = function (args) {
        this.parent.pivotCommon.eventBase.updateFiltering(args);
        var target = args.target;
        this.fieldName = target.parentElement.id;
        this.dialogPopUp = this.parent.pivotCommon.filterDialog.dialogPopUp;
        this.memberTreeView = this.parent.pivotCommon.filterDialog.memberTreeView;
        this.parent.pivotCommon.filterDialog.memberTreeView.nodeChecked = this.nodeStateModified.bind(this);
        this.parent.pivotCommon.filterDialog.allMemberSelect.nodeChecked = this.nodeStateModified.bind(this);
        this.bindDialogEvents();
    };
    PivotButton.prototype.bindDialogEvents = function () {
        if (this.parent.pivotCommon.filterDialog.allowExcelLikeFilter && this.parent.pivotCommon.filterDialog.tabObj) {
            this.index = this.parent.pivotCommon.filterDialog.tabObj.selectedItem;
            this.updateDialogButtonEvents();
            this.dialogPopUp.buttons = this.buttonModel();
            this.dialogPopUp.dataBind();
            this.parent.pivotCommon.filterDialog.tabObj.selected = this.tabSelect.bind(this);
        }
        else if (this.parent.dataSourceSettings.allowMemberFilter) {
            this.index = 0;
            this.updateDialogButtonEvents();
        }
    };
    PivotButton.prototype.buttonModel = function () {
        return [
            {
                buttonModel: {
                    cssClass: cls.OK_BUTTON_CLASS, content: this.parent.localeObj.getConstant('ok'), isPrimary: true
                },
                click: (this.index === 0 ? this.updateFilterState.bind(this, this.fieldName) : this.updateCustomFilter.bind(this))
            },
            {
                buttonModel: {
                    cssClass: 'e-clear-filter-button' + (this.parent.pivotCommon.filterDialog.allowExcelLikeFilter ? '' : ' ' + cls.ICON_DISABLE),
                    iconCss: 'e-icons e-clear-filter-icon', enableRtl: this.parent.enableRtl,
                    content: this.parent.localeObj.getConstant('clearFilter'), disabled: (this.parent.pivotCommon.filterDialog.filterObject ? false : true)
                },
                click: this.ClearFilter.bind(this)
            },
            {
                click: this.parent.pivotCommon.filterDialog.closeFilterDialog.bind(this),
                buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS, content: this.parent.localeObj.getConstant('cancel') }
            }
        ];
    };
    PivotButton.prototype.tabSelect = function (e) {
        this.index = e.selectedIndex;
        this.updateDialogButtonEvents();
        removeClass([].slice.call(this.dialogPopUp.element.querySelectorAll('.e-selected-tab')), 'e-selected-tab');
        if (e.selectedIndex > 0) {
            /* tslint:disable-next-line:max-line-length */
            addClass([this.dialogPopUp.element.querySelector('.e-filter-div-content' + '.' + (e.selectedIndex === 1 && this.parent.dataSourceSettings.allowLabelFilter ? 'e-label-filter' : 'e-value-filter'))], 'e-selected-tab');
        }
        if (e.selectedIndex === 0) {
            this.parent.pivotCommon.filterDialog.updateCheckedState();
        }
        else {
            this.dialogPopUp.buttons[0].buttonModel.disabled = false;
            this.dialogPopUp.element.querySelector('.' + cls.OK_BUTTON_CLASS).removeAttribute('disabled');
        }
    };
    PivotButton.prototype.updateDialogButtonEvents = function () {
        this.dialogPopUp.buttons = this.buttonModel();
        this.dialogPopUp.dataBind();
    };
    PivotButton.prototype.updateCustomFilter = function (args) {
        var dialogElement = this.dialogPopUp.element.querySelector('.e-selected-tab');
        var fieldName = dialogElement.getAttribute('data-fieldname');
        var levelName = dialogElement.getAttribute('data-selectedField');
        var filterType = dialogElement.getAttribute('data-type');
        var measure = dialogElement.getAttribute('data-measure');
        var operator = dialogElement.getAttribute('data-operator');
        var operand1 = dialogElement.getAttribute('data-value1');
        var operand2 = dialogElement.getAttribute('data-value2');
        var type = ((filterType === 'value') ? 'Value' : (filterType === 'date') ? 'Date' :
            (filterType === 'number') ? 'Number' : 'Label');
        var filterItem = {
            name: fieldName,
            type: type,
            measure: measure,
            condition: operator,
            value1: filterType === 'date' ? new Date(operand1) : operand1,
            value2: filterType === 'date' ? new Date(operand2) : operand2
        };
        var filterObject;
        if (this.parent.dataType === 'olap') {
            filterItem.selectedField = levelName;
            this.removeDataSourceSettings(fieldName, levelName, type);
            var filterItems = this.parent.dataSourceSettings.filterSettings;
            for (var _i = 0, filterItems_2 = filterItems; _i < filterItems_2.length; _i++) {
                var item = filterItems_2[_i];
                if (item.name === fieldName && item.selectedField === levelName) {
                    filterObject = item;
                }
            }
        }
        else {
            filterObject = this.parent.pivotCommon.eventBase.getFilterItemByName(fieldName);
        }
        if ((isNOU(operand1) || operand1 === '') ||
            (['Between', 'NotBetween'].indexOf(operator) > -1 && (isNOU(operand2) || operand2 === ''))) {
            var inputElementString = (type.toLowerCase() + ((isNOU(operand1) || operand1 === '') ? '_input_option_1' : '_input_option_2'));
            var focusElement = dialogElement.querySelector('#' + this.parent.element.id + '_' + inputElementString);
            addClass([focusElement], cls.EMPTY_FIELD);
            focusElement.focus();
            return;
        }
        if (filterObject) {
            // this.removeDataSourceSettings(fieldName);
            filterObject = filterObject.properties ?
                filterObject.properties : filterObject;
            filterObject.type = type;
            filterObject.measure = measure;
            filterObject.condition = operator;
            filterObject.value1 = filterType === 'date' ? new Date(operand1) : operand1;
            filterObject.value2 = filterType === 'date' ? new Date(operand2) : operand2;
            if (this.parent.dataType === 'olap') {
                filterObject.selectedField = levelName;
            }
        }
        else {
            this.parent.dataSourceSettings.filterSettings.push(filterItem);
        }
        if (type !== 'Value') {
            this.parent.lastFilterInfo = this.parent.pivotCommon.eventBase.getFilterItemByName(fieldName);
        }
        this.dialogPopUp.close();
        this.refreshPivotButtonState(fieldName, true);
        this.updateDataSource(true);
    };
    PivotButton.prototype.ClearFilter = function (e) {
        var dialogElement = this.dialogPopUp.element;
        var fieldName = dialogElement.getAttribute('data-fieldname');
        var tabElement = dialogElement.querySelector('.e-selected-tab');
        this.dialogPopUp.close();
        if (this.parent.dataType === 'olap' && tabElement) {
            var levelName = tabElement.getAttribute('data-selectedField');
            this.removeDataSourceSettings(fieldName, levelName);
        }
        else {
            this.removeDataSourceSettings(fieldName);
        }
        var filterObject = this.parent.pivotCommon.eventBase.getFilterItemByName(fieldName);
        this.refreshPivotButtonState(fieldName, filterObject ? true : false);
        this.updateDataSource(true);
    };
    PivotButton.prototype.removeButton = function (args) {
        var target = args.target;
        var fieldName = target.parentElement.id;
        if (target.parentElement.getAttribute('isvalue') === 'true') {
            this.parent.setProperties({ dataSourceSettings: { values: [] } }, true);
            if (this.parent.dataType === 'olap') {
                this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport('[measures]');
            }
        }
        else {
            this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport(fieldName);
            if (this.parent.dataType === 'olap' && this.parent.dataSourceSettings.values.length === 0) {
                this.parent.pivotCommon.dataSourceUpdate.removeFieldFromReport('[measures]');
            }
        }
        if (this.parent.getModuleName() === 'pivotfieldlist') {
            this.parent.axisFieldModule.render();
        }
        this.updateDataSource();
    };
    PivotButton.prototype.nodeStateModified = function (args) {
        var target = closest(args.node, 'li');
        var fieldName = target.getAttribute('data-fieldname');
        if (target.getAttribute('data-uid') === 'all') {
            this.memberTreeView.nodeChecked = null;
            if (args.action === 'check') {
                this.memberTreeView.checkAll();
            }
            else {
                this.memberTreeView.uncheckAll();
            }
            if (this.parent.dataType === 'olap' && this.parent.olapEngineModule &&
                !this.parent.olapEngineModule.fieldList[fieldName].isHierarchy) {
                this.updateNodeStates(this.memberTreeView.getAllCheckedNodes(), fieldName, args.action);
            }
            this.checkedStateAll(args.action);
            this.memberTreeView.nodeChecked = this.nodeStateModified.bind(this);
        }
        else {
            if (this.parent.dataType === 'olap' && this.parent.olapEngineModule &&
                !this.parent.olapEngineModule.fieldList[fieldName].isHierarchy) {
                // let st1: number = new Date().getTime();
                var checkedNodes = this.memberTreeView.getAllCheckedNodes();
                // let st2: number = (new Date().getTime() - st1) / 1000;
                // console.log('getAllCheckedNodes:' + st2);
                this.updateNodeStates(checkedNodes, fieldName, args.action);
            }
            var pos = this.parent.pivotCommon.currentTreeItemsPos[target.getAttribute('data-uid')];
            if (args.action === 'check') {
                if (this.parent.pivotCommon.currentTreeItems[pos]) {
                    this.parent.pivotCommon.currentTreeItems[pos].isSelected = true;
                }
            }
            else {
                if (this.parent.pivotCommon.currentTreeItems[pos]) {
                    this.parent.pivotCommon.currentTreeItems[pos].isSelected = false;
                }
            }
        }
        this.parent.pivotCommon.filterDialog.updateCheckedState();
    };
    PivotButton.prototype.checkedStateAll = function (state) {
        var searchItemObj = {};
        for (var _i = 0, _a = this.parent.pivotCommon.searchTreeItems; _i < _a.length; _i++) {
            var item = _a[_i];
            item.isSelected = state === 'check';
            searchItemObj[item.id] = item.id;
        }
        for (var _b = 0, _c = this.parent.pivotCommon.currentTreeItems; _b < _c.length; _b++) {
            var item = _c[_b];
            if (searchItemObj[item.id] !== undefined) {
                item.isSelected = state === 'check';
            }
        }
    };
    PivotButton.prototype.updateNodeStates = function (checkedNodes, fieldName, state) {
        var fieldList = this.parent.pivotCommon.engineModule.fieldList[fieldName];
        var currentMembers = fieldList.members;
        var searchMembers = fieldList.currrentMembers;
        if (fieldList.searchMembers.length > 0) {
            var members = Object.keys(searchMembers);
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var member = members_1[_i];
                if (searchMembers[member]) {
                    searchMembers[member].isSelected = false;
                }
                if (currentMembers[member]) {
                    currentMembers[member].isSelected = false;
                    if (this.memberTreeView.element.querySelector('li[data-uid="' + member + '"]')) {
                        var element = this.memberTreeView.element.querySelector('li[data-uid="' + member + '"]');
                        if (element && !element.querySelector('ul')) {
                            this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, member, false);
                        }
                    }
                }
            }
            for (var _a = 0, checkedNodes_1 = checkedNodes; _a < checkedNodes_1.length; _a++) {
                var node = checkedNodes_1[_a];
                if (currentMembers[node]) {
                    if (this.memberTreeView.element.querySelector('li[data-uid="' + node + '"]')) {
                        var element = this.memberTreeView.element.querySelector('li[data-uid="' + node + '"]');
                        if (element && !element.querySelector('ul')) {
                            currentMembers[node].isSelected = true;
                            this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, node, true);
                        }
                    }
                }
                if (searchMembers[node]) {
                    searchMembers[node].isSelected = true;
                }
            }
        }
        else {
            var members = Object.keys(currentMembers);
            for (var _b = 0, members_2 = members; _b < members_2.length; _b++) {
                var member = members_2[_b];
                if (currentMembers[member].isSelected) {
                    currentMembers[member].isSelected = false;
                }
            }
            for (var _c = 0, checkedNodes_2 = checkedNodes; _c < checkedNodes_2.length; _c++) {
                var node = checkedNodes_2[_c];
                if (currentMembers[node]) {
                    currentMembers[node].isSelected = true;
                    this.parent.pivotCommon.eventBase.updateChildNodeStates(fieldList.filterMembers, fieldName, node, true);
                }
            }
        }
    };
    PivotButton.prototype.updateFilterState = function (fieldName, args) {
        var isNodeUnChecked = false;
        var filterItem = { items: [], name: fieldName, type: 'Include' };
        var engineModule = this.parent.olapEngineModule;
        if (this.parent.dataType === 'olap' && engineModule &&
            !engineModule.fieldList[fieldName].isHierarchy) {
            var cMembers = engineModule.fieldList[fieldName].members;
            var sMembers = engineModule.fieldList[fieldName].currrentMembers;
            filterItem.items = this.memberTreeView.getAllCheckedNodes();
            filterItem.levelCount = engineModule.fieldList[fieldName].levelCount;
            isNodeUnChecked = (filterItem.items.length ===
                this.memberTreeView.fields.dataSource.length ? false : true);
            if (engineModule.fieldList[fieldName].searchMembers.length > 0 && !isNodeUnChecked) {
                var cNodeLength = Object.keys(cMembers).length;
                var sNodeLength = Object.keys(sMembers).length;
                isNodeUnChecked = cNodeLength === sNodeLength && cNodeLength === filterItem.items.length ? false : true;
            }
            var filterItems = filterItem.items;
            for (var _i = 0, filterItems_3 = filterItems; _i < filterItems_3.length; _i++) {
                var node = filterItems_3[_i];
                if (engineModule.fieldList[fieldName].searchMembers.length > 0 && sMembers[node]) {
                    sMembers[node].isSelected = true;
                }
                else if (cMembers[node]) {
                    cMembers[node].isSelected = true;
                }
            }
        }
        else {
            for (var _a = 0, _b = this.parent.pivotCommon.searchTreeItems; _a < _b.length; _a++) {
                var item = _b[_a];
                if (item.isSelected) {
                    if (this.parent.pivotCommon.isDateField) {
                        filterItem.items.push(item.name);
                    }
                    else {
                        filterItem.items.push(item.id);
                    }
                }
            }
            isNodeUnChecked = (filterItem.items.length === this.parent.pivotCommon.currentTreeItems.length ?
                false : true);
        }
        if (this.parent.dataType === 'olap') {
            this.removeDataSourceSettings(fieldName);
        }
        var filterObject = this.parent.pivotCommon.eventBase.getFilterItemByName(fieldName);
        if (filterObject) {
            for (var i = 0; i < this.parent.dataSourceSettings.filterSettings.length; i++) {
                if (this.parent.dataSourceSettings.filterSettings[i].name === fieldName) {
                    this.parent.dataSourceSettings.filterSettings.splice(i, 1);
                    break;
                }
            }
            this.parent.dataSourceSettings.filterSettings.push(filterItem);
        }
        else {
            this.parent.dataSourceSettings.filterSettings.push(filterItem);
        }
        this.dialogPopUp.close();
        this.refreshPivotButtonState(fieldName, isNodeUnChecked);
        if (!isNodeUnChecked) {
            this.removeDataSourceSettings(fieldName);
        }
        this.parent.lastFilterInfo = filterItem;
        this.updateDataSource(true);
        var thisObj = this;
        //setTimeout(() => {
        if (thisObj.parent instanceof PivotFieldList) {
            thisObj.axisField.render();
        }
        //});
    };
    PivotButton.prototype.refreshPivotButtonState = function (fieldName, isFiltered) {
        var pivotButtons = [].slice.call(this.parentElement.querySelectorAll('.e-pivot-button'));
        var selectedButton;
        for (var _i = 0, pivotButtons_1 = pivotButtons; _i < pivotButtons_1.length; _i++) {
            var item = pivotButtons_1[_i];
            if (item.getAttribute('data-uid') === fieldName) {
                selectedButton = item.querySelector('.' + cls.FILTER_COMMON_CLASS);
                break;
            }
        }
        if (isFiltered) {
            removeClass([selectedButton], cls.FILTER_CLASS);
            addClass([selectedButton], cls.FILTERED_CLASS);
        }
        else {
            removeClass([selectedButton], cls.FILTERED_CLASS);
            addClass([selectedButton], cls.FILTER_CLASS);
        }
    };
    PivotButton.prototype.removeDataSourceSettings = function (fieldName, selectedField, type) {
        var filterSettings = this.parent.dataSourceSettings.filterSettings;
        for (var len = 0, lnt = filterSettings.length; len < lnt; len++) {
            if (this.parent.dataType === 'olap' && selectedField) {
                if (!type && filterSettings[len].name === fieldName &&
                    filterSettings[len].selectedField === selectedField) {
                    filterSettings.splice(len, 1);
                    break;
                }
                else if (type) {
                    if (filterSettings[len].type !== type &&
                        filterSettings[len].name === fieldName) {
                        filterSettings.splice(len, 1);
                        lnt--;
                        len--;
                    }
                }
            }
            else {
                if (filterSettings[len].name === fieldName) {
                    filterSettings.splice(len, 1);
                    if (this.parent.dataType !== 'olap') {
                        break;
                    }
                    lnt--;
                    len--;
                }
            }
        }
    };
    PivotButton.prototype.updateDropIndicator = function (e) {
        if (this.parent.isDragging) {
            removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(this.parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            var element = closest(e.target, '.' + cls.PIVOT_BUTTON_WRAPPER_CLASS);
            addClass([element.querySelector('.' + cls.DROP_INDICATOR_CLASS)], cls.INDICATOR_HOVER_CLASS);
        }
    };
    PivotButton.prototype.wireEvent = function (element, axis, isMeasureAvail) {
        EventHandler.add(element, 'mouseover', this.updateDropIndicator, this);
        if (!isMeasureAvail) {
            if (['filters', 'values'].indexOf(axis) === -1 && element.querySelector('.' + cls.PIVOT_BUTTON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.PIVOT_BUTTON_CLASS), 'click', this.updateSorting, this);
            }
            if (axis !== 'values' && element.querySelector('.' + cls.FILTER_COMMON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.FILTER_COMMON_CLASS), 'click', this.updateFiltering, this);
            }
            if (axis === 'values' && element.querySelector('.' + cls.AXISFIELD_ICON_CLASS) !== null) {
                EventHandler.add(element.querySelector('.' + cls.AXISFIELD_ICON_CLASS), 'click', this.createMenuOption, this);
            }
        }
        EventHandler.add(element.querySelector('.' + cls.REMOVE_CLASS), 'click', this.removeButton, this);
    };
    PivotButton.prototype.unWireEvent = function (element, axis, isMeasureAvail) {
        EventHandler.remove(element, 'mouseover', this.updateDropIndicator);
        if (!isMeasureAvail) {
            if (['filters', 'values'].indexOf(axis) === -1 && element.querySelector('.' + cls.PIVOT_BUTTON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.PIVOT_BUTTON_CLASS), 'click', this.updateSorting);
            }
            if (axis !== 'values' && element.querySelector('.' + cls.FILTER_COMMON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.FILTER_COMMON_CLASS), 'click', this.updateFiltering);
            }
            if (axis === 'values' && element.querySelector('.' + cls.AXISFIELD_ICON_CLASS) !== null) {
                EventHandler.remove(element.querySelector('.' + cls.AXISFIELD_ICON_CLASS), 'click', this.createMenuOption);
            }
        }
        EventHandler.remove(element.querySelector('.' + cls.REMOVE_CLASS), 'click', this.removeButton);
    };
    /**

     */
    PivotButton.prototype.addEventListener = function () {
        this.handlers = {
            load: this.renderPivotButton
        };
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.pivotButtonUpdate, this.handlers.load, this);
    };
    /**

     */
    PivotButton.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.pivotButtonUpdate, this.handlers.load);
    };
    /**
     * To destroy the pivot button event listener
     * @return {void}

     */
    PivotButton.prototype.destroy = function () {
        this.menuOption.destroy();
        this.removeEventListener();
    };
    return PivotButton;
}());
export { PivotButton };
