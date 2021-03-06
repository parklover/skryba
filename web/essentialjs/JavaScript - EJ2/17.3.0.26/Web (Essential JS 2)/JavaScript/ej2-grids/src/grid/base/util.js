import { ChildProperty, compile as baseTemplateComplier, setValue, Internationalization } from '@syncfusion/ej2-base';
import { extend as baseExtend, isNullOrUndefined, getValue, classList } from '@syncfusion/ej2-base';
import { setStyleAttribute, addClass, attributes, remove, createElement, removeClass } from '@syncfusion/ej2-base';
import { isObject } from '@syncfusion/ej2-base';
import { DataUtil, Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { Column } from '../models/column';
import { calculateRelativeBasedPosition, calculatePosition } from '@syncfusion/ej2-popups';
import { Print } from '../actions/print';
//https://typescript.codeplex.com/discussions/401501
/**
 * Function to check whether target object implement specific interface
 * @param  {Object} target
 * @param  {string} checkFor
 * @returns no

 */
export function doesImplementInterface(target, checkFor) {
    /* tslint:disable:no-any */
    return target.prototype && checkFor in target.prototype;
}
/**
 * Function to get value from provided data
 * @param  {string} field
 * @param  {Object} data
 * @param  {IColumn} column

 */
export function valueAccessor(field, data, column) {
    return (isNullOrUndefined(field) || field === '') ? '' : DataUtil.getObject(field, data);
}
/**
 * The function used to update Dom using requestAnimationFrame.
 * @param  {Function} fn - Function that contains the actual action
 * @return {Promise<T>}

 */
export function getUpdateUsingRaf(updateFunction, callBack) {
    requestAnimationFrame(function () {
        try {
            callBack(null, updateFunction());
        }
        catch (e) {
            callBack(e);
        }
    });
}
/**

 */
export function updatecloneRow(grid) {
    var nRows = [];
    var actualRows = grid.vRows;
    for (var i = 0; i < actualRows.length; i++) {
        if (actualRows[i].isDataRow) {
            nRows.push(actualRows[i]);
        }
        else if (!actualRows[i].isDataRow) {
            nRows.push(actualRows[i]);
            if (!actualRows[i].isExpand && actualRows[i].isCaptionRow) {
                i += getCollapsedRowsCount(actualRows[i], grid);
            }
        }
    }
    grid.vcRows = nRows;
}
/**

 */
var count = 0;
export function getCollapsedRowsCount(val, grid) {
    count = 0;
    var gSummary = 'gSummary';
    var total = 'count';
    var gLen = grid.groupSettings.columns.length;
    var records = 'records';
    var items = 'items';
    var value = val[gSummary];
    var dataRowCnt = 0;
    var agrCnt = 'aggregatesCount';
    if (value === val.data[total]) {
        if (grid.groupSettings.columns.length && !isNullOrUndefined(val[agrCnt])) {
            if (grid.groupSettings.columns.length !== 1 && val[agrCnt]) {
                count += (val.indent !== 0 && (value) < 2) ? (val[gSummary] * ((gLen - val.indent) + (gLen - val.indent) * val[agrCnt])) :
                    (val[gSummary] * ((gLen - val.indent) + (gLen - val.indent - 1) * val[agrCnt])) + val[agrCnt];
            }
            else if (val[agrCnt] && grid.groupSettings.columns.length === 1) {
                count += (val[gSummary] * (gLen - val.indent)) + val[agrCnt];
            }
        }
        else if (grid.groupSettings.columns.length) {
            if (grid.groupSettings.columns.length !== 1) {
                count += val[gSummary] * (grid.groupSettings.columns.length - val.indent);
            }
            else {
                count += val[gSummary];
            }
        }
        return count;
    }
    else {
        for (var i = 0, len = val.data[items].length; i < len; i++) {
            var gLevel = val.data[items][i];
            count += gLevel[items].length + ((gLen !== grid.columns.length) &&
                !isNullOrUndefined(gLevel[items][records]) ? gLevel[items][records].length : 0);
            dataRowCnt += (!isNullOrUndefined(gLevel[items][records]) && !isNullOrUndefined(val[agrCnt])) ? gLevel[items][records].length :
                gLevel[items].length;
            if (gLevel[items].GroupGuid && gLevel[items].childLevels !== 0) {
                recursive(gLevel);
            }
        }
        count += val.data[items].length;
        if (!isNullOrUndefined(val[agrCnt])) {
            if (val[agrCnt] && count && dataRowCnt !== 0) {
                count += ((count - dataRowCnt) * val[agrCnt]) + val[agrCnt];
            }
        }
    }
    return count;
}
/**

 */
export function recursive(row) {
    var items = 'items';
    var rCount = 'count';
    for (var j = 0, length_1 = row[items].length; j < length_1; j++) {
        var nLevel = row[items][j];
        count += nLevel[rCount];
        if (nLevel[items].childLevels !== 0) {
            recursive(nLevel);
        }
    }
}
/**

 */
export function iterateArrayOrObject(collection, predicate) {
    var result = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        var pred = predicate(collection[i], i);
        if (!isNullOrUndefined(pred)) {
            result.push(pred);
        }
    }
    return result;
}
export function iterateExtend(array) {
    var obj = [];
    for (var i = 0; i < array.length; i++) {
        obj.push(baseExtend({}, getActualProperties(array[i]), {}, true));
    }
    return obj;
}
export function templateCompiler(template) {
    if (template) {
        var e = void 0;
        try {
            if (document.querySelectorAll(template).length) {
                return baseTemplateComplier(document.querySelector(template).innerHTML.trim());
            }
        }
        catch (e) {
            return baseTemplateComplier(template);
        }
    }
    return undefined;
}
export function setStyleAndAttributes(node, customAttributes) {
    var copyAttr = {};
    var literals = ['style', 'class'];
    //Dont touch the original object - make a copy
    baseExtend(copyAttr, customAttributes, {});
    if ('style' in copyAttr) {
        setStyleAttribute(node, copyAttr[literals[0]]);
        delete copyAttr[literals[0]];
    }
    if ('class' in copyAttr) {
        addClass([node], copyAttr[literals[1]]);
        delete copyAttr[literals[1]];
    }
    attributes(node, copyAttr);
}
export function extend(copied, first, second, exclude) {
    var moved = baseExtend(copied, first, second);
    Object.keys(moved).forEach(function (value, index) {
        if (exclude && exclude.indexOf(value) !== -1) {
            delete moved[value];
        }
    });
    return moved;
}
export function setColumnIndex(columnModel, ind) {
    if (ind === void 0) { ind = 0; }
    for (var i = 0, len = columnModel.length; i < len; i++) {
        if (columnModel[i].columns) {
            columnModel[i].index = isNullOrUndefined(columnModel[i].index) ? ind : columnModel[i].index;
            ind++;
            ind = setColumnIndex(columnModel[i].columns, ind);
        }
        else {
            columnModel[i].index = isNullOrUndefined(columnModel[i].index) ? ind : columnModel[i].index;
            ind++;
        }
    }
    return ind;
}
export function prepareColumns(columns, autoWidth) {
    for (var c = 0, len = columns.length; c < len; c++) {
        var column = void 0;
        if (typeof columns[c] === 'string') {
            column = new Column({ field: columns[c] });
        }
        else if (!(columns[c] instanceof Column)) {
            if (!columns[c].columns) {
                column = new Column(columns[c]);
            }
            else {
                columns[c].columns = prepareColumns(columns[c].columns);
                column = new Column(columns[c]);
            }
        }
        else {
            column = columns[c];
        }
        column.headerText = isNullOrUndefined(column.headerText) ? column.foreignKeyValue || column.field || '' : column.headerText;
        column.foreignKeyField = column.foreignKeyField || column.field;
        column.valueAccessor = (typeof column.valueAccessor === 'string' ? getValue(column.valueAccessor, window)
            : column.valueAccessor) || valueAccessor;
        column.width = autoWidth && isNullOrUndefined(column.width) ? 200 : column.width;
        if (isNullOrUndefined(column.visible)) {
            column.visible = true;
        }
        columns[c] = column;
    }
    return columns;
}
export function setCssInGridPopUp(popUp, e, className) {
    var popUpSpan = popUp.querySelector('span');
    var position = popUp.parentElement.getBoundingClientRect();
    var targetPosition = e.target.getBoundingClientRect();
    var isBottomTail;
    popUpSpan.className = className;
    popUp.style.display = '';
    isBottomTail = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY) > popUp.offsetHeight + 10;
    popUp.style.top = targetPosition.top - position.top +
        (isBottomTail ? -(popUp.offsetHeight + 10) : popUp.offsetHeight + 10) + 'px'; //10px for tail element
    popUp.style.left = getPopupLeftPosition(popUp, e, targetPosition, position.left) + 'px';
    if (isBottomTail) {
        popUp.querySelector('.e-downtail').style.display = '';
        popUp.querySelector('.e-uptail').style.display = 'none';
    }
    else {
        popUp.querySelector('.e-downtail').style.display = 'none';
        popUp.querySelector('.e-uptail').style.display = '';
    }
}
function getPopupLeftPosition(popup, e, targetPosition, left) {
    var width = popup.offsetWidth / 2;
    var x = getPosition(e).x;
    if (x - targetPosition.left < width) {
        return targetPosition.left - left;
    }
    else if (targetPosition.right - x < width) {
        return targetPosition.right - left - width * 2;
    }
    else {
        return x - left - width;
    }
}
export function getActualProperties(obj) {
    if (obj instanceof ChildProperty) {
        return getValue('properties', obj);
    }
    else {
        return obj;
    }
}
export function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
export function getElementIndex(element, elements) {
    var index = -1;
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[i].isEqualNode(element)) {
            index = i;
            break;
        }
    }
    return index;
}
export function inArray(value, collection) {
    for (var i = 0, len = collection.length; i < len; i++) {
        if (collection[i] === value) {
            return i;
        }
    }
    return -1;
}
export function getActualPropFromColl(collection) {
    var coll = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        if (collection[i].hasOwnProperty('properties')) {
            coll.push(collection[i].properties);
        }
        else {
            coll.push(collection[i]);
        }
    }
    return coll;
}
export function removeElement(target, selector) {
    var elements = [].slice.call(target.querySelectorAll(selector));
    for (var i = 0; i < elements.length; i++) {
        remove(elements[i]);
    }
}
export function getPosition(e) {
    var position = {};
    position.x = (isNullOrUndefined(e.clientX) ? e.changedTouches[0].clientX :
        e.clientX);
    position.y = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY);
    return position;
}
var uid = 0;
export function getUid(prefix) {
    return prefix + uid++;
}
export function appendChildren(elem, children) {
    for (var i = 0, len = children.length; i < len; i++) {
        if (len === children.length) {
            elem.appendChild(children[i]);
        }
        else {
            elem.appendChild(children[0]);
        }
    }
    return elem;
}
export function parents(elem, selector, isID) {
    var parent = elem;
    var parents = [];
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            parents.push(parent);
        }
        parent = parent.parentElement;
    }
    return parents;
}
export function calculateAggregate(type, data, column, context) {
    if (type === 'Custom') {
        var temp = column.customAggregate;
        if (typeof temp === 'string') {
            temp = getValue(temp, window);
        }
        return temp ? temp.call(context, data, column) : '';
    }
    return (column.field in data || data instanceof Array) ? DataUtil.aggregates[type.toLowerCase()](data, column.field) : null;
}
var scrollWidth = null;
export function getScrollBarWidth() {
    if (scrollWidth !== null) {
        return scrollWidth;
    }
    var divNode = document.createElement('div');
    var value = 0;
    divNode.style.cssText = 'width:100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;';
    document.body.appendChild(divNode);
    value = (divNode.offsetWidth - divNode.clientWidth) | 0;
    document.body.removeChild(divNode);
    return scrollWidth = value;
}
var rowHeight;
export function getRowHeight(element) {
    if (rowHeight !== undefined) {
        return rowHeight;
    }
    var table = createElement('table', { className: 'e-table', styles: 'visibility: hidden' });
    table.innerHTML = '<tr><td class="e-rowcell">A<td></tr>';
    element.appendChild(table);
    var rect = table.querySelector('td').getBoundingClientRect();
    element.removeChild(table);
    rowHeight = Math.ceil(rect.height);
    return rowHeight;
}
export function isComplexField(field) {
    return field.split('.').length > 1;
}
export function getComplexFieldID(field) {
    if (field === void 0) { field = ''; }
    return field.replace(/\./g, '___');
}
export function setComplexFieldID(field) {
    if (field === void 0) { field = ''; }
    return field.replace(/___/g, '.');
}
export function isEditable(col, type, elem) {
    var row = parentsUntil(elem, 'e-row');
    var isOldRow = !row ? true : row && !row.classList.contains('e-insertedrow');
    if (type === 'beginEdit' && isOldRow) {
        if (col.isIdentity || col.isPrimaryKey || !col.allowEditing) {
            return false;
        }
        return true;
    }
    else if (type === 'add' && col.isIdentity) {
        return false;
    }
    else {
        if (isOldRow && !col.allowEditing && !col.isIdentity && !col.isPrimaryKey) {
            return false;
        }
        return true;
    }
}
export function isActionPrevent(inst) {
    var dlg = inst.element.querySelector('#' + inst.element.id + 'EditConfirm');
    return inst.editSettings.mode === 'Batch' &&
        (inst.element.querySelectorAll('.e-updatedtd').length) && inst.editSettings.showConfirmDialog &&
        (dlg ? dlg.classList.contains('e-popup-close') : true);
}
export function wrap(elem, action) {
    var clName = 'e-wrap';
    elem = elem instanceof Array ? elem : [elem];
    for (var i = 0; i < elem.length; i++) {
        action ? elem[i].classList.add(clName) : elem[i].classList.remove(clName);
    }
}
export function setFormatter(serviceLocator, column) {
    var fmtr = serviceLocator.getService('valueFormatter');
    switch (column.type) {
        case 'date':
            column.setFormatter(fmtr.getFormatFunction({ type: 'date', skeleton: column.format }));
            column.setParser(fmtr.getParserFunction({ type: 'date', skeleton: column.format }));
            break;
        case 'datetime':
            column.setFormatter(fmtr.getFormatFunction({ type: 'dateTime', skeleton: column.format }));
            column.setParser(fmtr.getParserFunction({ type: 'dateTime', skeleton: column.format }));
            break;
        case 'number':
            column.setFormatter(fmtr.getFormatFunction({ format: column.format }));
            column.setParser(fmtr.getParserFunction({ format: column.format }));
            break;
    }
}
export function addRemoveActiveClasses(cells, add) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    for (var i = 0, len = cells.length; i < len; i++) {
        if (add) {
            classList(cells[i], args.slice(), []);
            cells[i].setAttribute('aria-selected', 'true');
        }
        else {
            classList(cells[i], [], args.slice());
            cells[i].removeAttribute('aria-selected');
        }
    }
}
export function distinctStringValues(result) {
    var temp = {};
    var res = [];
    for (var i = 0; i < result.length; i++) {
        if (!(result[i] in temp)) {
            res.push(result[i].toString());
            temp[result[i]] = 1;
        }
    }
    return res;
}
export function getFilterMenuPostion(target, dialogObj, grid) {
    var elementVisible = dialogObj.element.style.display;
    dialogObj.element.style.display = 'block';
    var dlgWidth = dialogObj.width;
    var newpos;
    if (!grid.enableRtl) {
        newpos = calculateRelativeBasedPosition(target, dialogObj.element);
        dialogObj.element.style.display = elementVisible;
        dialogObj.element.style.top = (newpos.top + target.getBoundingClientRect().height) - 5 + 'px';
        var leftPos = ((newpos.left - dlgWidth) + target.clientWidth);
        if (leftPos < 1) {
            dialogObj.element.style.left = (dlgWidth + leftPos) - 16 + 'px'; // right calculation
        }
        else {
            dialogObj.element.style.left = leftPos + -4 + 'px';
        }
    }
    else {
        newpos = calculatePosition(target, 'left', 'bottom');
        dialogObj.element.style.top = (newpos.top + target.getBoundingClientRect().height) - 35 + 'px';
        dialogObj.element.style.display = elementVisible;
        var leftPos = ((newpos.left - dlgWidth) + target.clientWidth);
        if (leftPos < 1) {
            dialogObj.element.style.left = (dlgWidth + leftPos) + -16 + 'px';
        }
        else {
            dialogObj.element.style.left = leftPos - 16 + 'px';
        }
    }
}
export function getZIndexCalcualtion(args, dialogObj) {
    args.popup.element.style.zIndex = (dialogObj.zIndex + 1).toString();
}
export function toogleCheckbox(elem) {
    var span = elem.querySelector('.e-frame');
    span.classList.contains('e-check') ? classList(span, ['e-uncheck'], ['e-check']) :
        classList(span, ['e-check'], ['e-uncheck']);
}
export function createCboxWithWrap(uid, elem, className) {
    var div = createElement('div', { className: className });
    div.appendChild(elem);
    div.setAttribute('uid', uid);
    return div;
}
export function removeAddCboxClasses(elem, checked) {
    removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
    if (checked) {
        elem.classList.add('e-check');
    }
    else {
        elem.classList.add('e-uncheck');
    }
}
/**
 * Refresh the Row model's foreign data.
 * @param row - Grid Row model object.
 * @param columns - Foreign columns array.
 * @param data - Updated Row data.

 */
export function refreshForeignData(row, columns, data) {
    columns.forEach(function (col) {
        setValue(col.field, getForeignData(col, data), row.foreignKeyData);
    });
    row.cells.forEach(function (cell) {
        if (cell.isForeignKey) {
            setValue('foreignKeyData', getValue(cell.column.field, row.foreignKeyData), cell);
        }
    });
}
/**
 * Get the foreign data for the corresponding cell value.
 * @param column - Foreign Key column
 * @param data - Row data.
 * @param lValue - cell value.
 * @param foreignData - foreign data source.

 */
export function getForeignData(column, data, lValue, foreignKeyData) {
    var fField = column.foreignKeyField;
    var key = (!isNullOrUndefined(lValue) ? lValue : valueAccessor(column.field, data, column));
    key = isNullOrUndefined(key) ? '' : key;
    var query = new Query();
    var fdata = foreignKeyData || ((column.dataSource instanceof DataManager) && column.dataSource.dataSource.json.length ?
        column.dataSource.dataSource.json : column.columnData);
    if (key.getDay) {
        query.where(getDatePredicate({ field: fField, operator: 'equal', value: key, matchCase: false }));
    }
    else {
        query.where(fField, '==', key, false);
    }
    return new DataManager(fdata).executeLocal(query);
}
/**
 * To use to get the column's object by the foreign key value.
 * @param foreignKeyValue - Defines ForeignKeyValue.
 * @param columns - Array of column object.

 */
export function getColumnByForeignKeyValue(foreignKeyValue, columns) {
    var column;
    return columns.some(function (col) {
        column = col;
        return col.foreignKeyValue === foreignKeyValue;
    }) && column;
}
/**

 * @param filterObject - Defines predicate model object
 */
export function getDatePredicate(filterObject, type) {
    var datePredicate;
    var prevDate;
    var nextDate;
    var prevObj = baseExtend({}, getActualProperties(filterObject));
    var nextObj = baseExtend({}, getActualProperties(filterObject));
    if (filterObject.value === null) {
        datePredicate = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
        return datePredicate;
    }
    var value = new Date(filterObject.value);
    if (filterObject.operator === 'equal' || filterObject.operator === 'notequal') {
        if (type === 'datetime') {
            prevDate = new Date(value.setSeconds(value.getSeconds() - 1));
            nextDate = new Date(value.setSeconds(value.getSeconds() + 2));
            filterObject.value = new Date(value.setSeconds(nextDate.getSeconds() - 1));
        }
        else {
            prevDate = new Date(value.setHours(0) - 1);
            nextDate = new Date(value.setHours(24));
        }
        prevObj.value = prevDate;
        nextObj.value = nextDate;
        if (filterObject.operator === 'equal') {
            prevObj.operator = 'greaterthan';
            nextObj.operator = 'lessthan';
        }
        else if (filterObject.operator === 'notequal') {
            prevObj.operator = 'lessthanorequal';
            nextObj.operator = 'greaterthanorequal';
        }
        var predicateSt = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
        var predicateEnd = new Predicate(nextObj.field, nextObj.operator, nextObj.value, false);
        datePredicate = filterObject.operator === 'equal' ? predicateSt.and(predicateEnd) : predicateSt.or(predicateEnd);
    }
    else {
        if (typeof (prevObj.value) === 'string') {
            prevObj.value = new Date(prevObj.value);
        }
        var predicates = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
        datePredicate = predicates;
    }
    if (filterObject.setProperties) {
        filterObject.setProperties({ ejpredicate: datePredicate }, true);
    }
    else {
        filterObject.ejpredicate = datePredicate;
    }
    return datePredicate;
}
/**

 */
export function renderMovable(ele, frzCols) {
    var mEle = ele.cloneNode(true);
    for (var i = 0; i < frzCols; i++) {
        mEle.removeChild(mEle.children[0]);
    }
    for (var i = frzCols, len = ele.childElementCount; i < len; i++) {
        ele.removeChild(ele.children[ele.childElementCount - 1]);
    }
    return mEle;
}
/**

 */
export function isGroupAdaptive(grid) {
    return grid.enableVirtualization && grid.groupSettings.columns.length > 0 && grid.isVirtualAdaptive;
}
/**

 */
export function getObject(field, object) {
    if (field === void 0) { field = ''; }
    if (field) {
        var value = object;
        var splits = field.split('.');
        for (var i = 0; i < splits.length && !isNullOrUndefined(value); i++) {
            value = value[splits[i]];
        }
        return value;
    }
}
/**

 */
export function getCustomDateFormat(format, colType) {
    var intl = new Internationalization();
    var formatvalue;
    var formatter = 'format';
    var type = 'type';
    if (colType === 'date') {
        formatvalue = typeof (format) === 'object' ?
            intl.getDatePattern({ type: format[type] ? format[type] : 'date', format: format[formatter] }, false) :
            intl.getDatePattern({ type: 'date', skeleton: format }, false);
    }
    else {
        formatvalue = typeof (format) === 'object' ?
            intl.getDatePattern({ type: format[type] ? format[type] : 'dateTime', format: format[formatter] }, false) :
            intl.getDatePattern({ type: 'dateTime', skeleton: format }, false);
    }
    return formatvalue;
}
/**

 */
export function getExpandedState(gObj, hierarchyPrintMode) {
    var rows = gObj.getRowsObject();
    var obj = {};
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        if (row.isExpand && !row.isDetailRow) {
            var index = gObj.allowPaging && gObj.printMode === 'AllPages' ? row.index +
                (gObj.pageSettings.currentPage * gObj.pageSettings.pageSize) - gObj.pageSettings.pageSize : row.index;
            obj[index] = {};
            obj[index].isExpand = true;
            obj[index].gridModel = getPrintGridModel(row.childGrid, hierarchyPrintMode);
            obj[index].gridModel.query = gObj.childGrid.query;
        }
    }
    return obj;
}
/**

 */
export function getPrintGridModel(gObj, hierarchyPrintMode) {
    if (hierarchyPrintMode === void 0) { hierarchyPrintMode = 'Expanded'; }
    var printGridModel = {};
    if (!gObj) {
        return printGridModel;
    }
    for (var _i = 0, _a = Print.printGridProp; _i < _a.length; _i++) {
        var key = _a[_i];
        if (key === 'columns') {
            printGridModel[key] = getActualPropFromColl(gObj[key]);
        }
        else if (key === 'allowPaging') {
            printGridModel[key] = gObj.printMode === 'CurrentPage';
        }
        else {
            printGridModel[key] = getActualProperties(gObj[key]);
        }
    }
    if (gObj.childGrid && hierarchyPrintMode !== 'None') {
        printGridModel.expandedRows = getExpandedState(gObj, hierarchyPrintMode);
    }
    return printGridModel;
}
/**

 */
export function extendObjWithFn(copied, first, second, deep) {
    var res = copied || {};
    var len = arguments.length;
    if (deep) {
        len = len - 1;
    }
    var _loop_1 = function (i) {
        if (!arguments_1[i]) {
            return "continue";
        }
        var obj1 = arguments_1[i];
        var keys = Object.keys(Object.getPrototypeOf(obj1)).length ?
            Object.keys(obj1).concat(getPrototypesOfObj(obj1)) : Object.keys(obj1);
        keys.forEach(function (key) {
            var source = res[key];
            var cpy = obj1[key];
            var cln;
            if (deep && (isObject(cpy) || Array.isArray(cpy))) {
                if (isObject(cpy)) {
                    cln = source ? source : {};
                    res[key] = baseExtend({}, cln, cpy, deep);
                }
                else {
                    cln = source ? source : [];
                    res[key] = baseExtend([], cln, cpy, deep);
                }
            }
            else {
                res[key] = cpy;
            }
        });
    };
    var arguments_1 = arguments;
    for (var i = 1; i < len; i++) {
        _loop_1(i);
    }
    return res;
}
/**

 */
function getPrototypesOfObj(obj) {
    var keys = [];
    while (Object.getPrototypeOf(obj) && Object.keys(Object.getPrototypeOf(obj)).length) {
        keys = keys.concat(Object.keys(Object.getPrototypeOf(obj)));
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
}
/**

 */
export function measureColumnDepth(column) {
    var max = 0;
    for (var i = 0; i < column.length; i++) {
        var depth = checkDepth(column[i], 0);
        if (max < depth) {
            max = depth;
        }
    }
    return max + 1;
}
/**

 */
export function checkDepth(col, index) {
    var max = index;
    var indices = [];
    if (col.columns) {
        index++;
        for (var i = 0; i < col.columns.length; i++) {
            indices[i] = checkDepth(col.columns[i], index);
        }
        for (var j = 0; j < indices.length; j++) {
            if (max < indices[j]) {
                max = indices[j];
            }
        }
        index = max;
    }
    return index;
}
/**

 */
export function refreshFilteredColsUid(gObj, filteredCols) {
    for (var i = 0; i < filteredCols.length; i++) {
        filteredCols[i].uid = filteredCols[i].isForeignKey ?
            getColumnByForeignKeyValue(filteredCols[i].field, gObj.getForeignKeyColumns()).uid
            : gObj.getColumnByField(filteredCols[i].field).uid;
    }
}
export var Global;
(function (Global) {
    Global.timer = null;
})(Global || (Global = {}));
