/* tslint:disable-next-line:max-line-length */
import { EventHandler, isNullOrUndefined, extend, classList, addClass, removeClass, Browser, getValue, setValue, isBlazor } from '@syncfusion/ej2-base';
import { parentsUntil, getUid, appendChildren, getDatePredicate, getObject } from '../base/util';
import { remove, debounce } from '@syncfusion/ej2-base';
import { DataUtil, Query, DataManager, Predicate, UrlAdaptor, Deferred } from '@syncfusion/ej2-data';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import * as events from '../base/constant';
import { ValueFormatter } from '../services/value-formatter';
import { getForeignData } from '../base/util';
import { Dialog } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { getFilterMenuPostion, toogleCheckbox, createCboxWithWrap, removeAddCboxClasses, getColumnByForeignKeyValue } from '../base/util';
/**

 * `CheckBoxFilterBase` module is used to handle filtering action.
 */
var CheckBoxFilterBase = /** @class */ (function () {
    /**
     * Constructor for checkbox filtering module

     */
    function CheckBoxFilterBase(parent, filterSettings) {
        this.existingPredicate = {};
        this.foreignKeyQuery = new Query();
        this.filterState = true;
        this.values = {};
        this.renderEmpty = false;
        this.parent = parent;
        this.id = this.parent.element.id;
        this.filterSettings = filterSettings;
        this.valueFormatter = new ValueFormatter(this.parent.locale);
        this.cBoxTrue = createCheckBox(this.parent.createElement, false, { checked: true, label: ' ' });
        this.cBoxFalse = createCheckBox(this.parent.createElement, false, { checked: false, label: ' ' });
        this.cBoxTrue.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden', attrs: { type: 'checkbox' }
        }), this.cBoxTrue.firstChild);
        this.cBoxFalse.insertBefore(this.parent.createElement('input', {
            className: 'e-chk-hidden', attrs: { 'type': 'checkbox' }
        }), this.cBoxFalse.firstChild);
        this.cBoxFalse.querySelector('.e-frame').classList.add('e-uncheck');
        if (this.parent.enableRtl) {
            addClass([this.cBoxTrue, this.cBoxFalse], ['e-rtl']);
        }
    }
    /**
     * To destroy the filter bar.
     * @return {void}

     */
    CheckBoxFilterBase.prototype.destroy = function () {
        this.closeDialog();
    };
    CheckBoxFilterBase.prototype.wireEvents = function () {
        EventHandler.add(this.dlg, 'click', this.clickHandler, this);
        this.searchHandler = debounce(this.searchBoxKeyUp, 200);
        EventHandler.add(this.dlg.querySelector('.e-searchinput'), 'keyup', this.searchHandler, this);
    };
    CheckBoxFilterBase.prototype.unWireEvents = function () {
        EventHandler.remove(this.dlg, 'click', this.clickHandler);
        var elem = this.dlg.querySelector('.e-searchinput');
        if (elem) {
            EventHandler.remove(elem, 'keyup', this.searchHandler);
        }
    };
    CheckBoxFilterBase.prototype.foreignKeyFilter = function (args, fColl, mPredicate) {
        var _this = this;
        var fPredicate = {};
        var filterCollection = [];
        var query = this.foreignKeyQuery.clone();
        this.options.column.dataSource.
            executeQuery(query.where(mPredicate)).then(function (e) {
            _this.options.column.columnData = e.result;
            _this.parent.notify(events.generateQuery, { predicate: fPredicate, column: _this.options.column });
            args.ejpredicate = fPredicate.predicate.predicates;
            fPredicate.predicate.predicates.forEach(function (fpred) {
                filterCollection.push({
                    field: fpred.field,
                    predicate: 'or',
                    matchCase: fpred.ignoreCase,
                    ignoreAccent: fpred.ignoreAccent,
                    operator: fpred.operator,
                    value: fpred.value,
                    type: _this.options.type
                });
            });
            args.filterCollection = filterCollection.length ? filterCollection :
                fColl.filter(function (col) { return col.field = _this.options.field; });
            _this.options.handler(args);
        });
    };
    CheckBoxFilterBase.prototype.foreignFilter = function (args, value) {
        var operator = this.parent.getDataModule().isRemote() ?
            (this.options.column.type === 'string' ? 'contains' : 'equal') : (this.options.column.type ? 'startswith' : 'contains');
        var initalPredicate = new Predicate(this.options.column.foreignKeyValue, operator, value, true, this.parent.filterSettings.ignoreAccent);
        this.foreignKeyFilter(args, [args.filterCollection], initalPredicate);
    };
    CheckBoxFilterBase.prototype.searchBoxClick = function (e) {
        var target = e.target;
        if (target.classList.contains('e-searchclear')) {
            this.sInput.value = '';
            this.refreshCheckboxes();
            this.updateSearchIcon();
            this.sInput.focus();
        }
    };
    CheckBoxFilterBase.prototype.searchBoxKeyUp = function (e) {
        this.refreshCheckboxes();
        this.updateSearchIcon();
    };
    CheckBoxFilterBase.prototype.updateSearchIcon = function () {
        if (this.sInput.value.length) {
            classList(this.sIcon, ['e-chkcancel-icon'], ['e-search-icon']);
        }
        else {
            classList(this.sIcon, ['e-search-icon'], ['e-chkcancel-icon']);
        }
    };
    /**
     * Gets the localized label by locale keyword.
     * @param  {string} key
     * @return {string}
     */
    CheckBoxFilterBase.prototype.getLocalizedLabel = function (key) {
        return this.localeObj.getConstant(key);
    };
    CheckBoxFilterBase.prototype.updateDataSource = function () {
        var dataSource = this.options.dataSource;
        var str = 'object';
        if (!(dataSource instanceof DataManager)) {
            for (var i = 0; i < dataSource.length; i++) {
                if (typeof dataSource !== str) {
                    var obj = {};
                    obj[this.options.field] = dataSource[i];
                    dataSource[i] = obj;
                }
            }
        }
    };
    CheckBoxFilterBase.prototype.updateModel = function (options) {
        this.options = options;
        this.existingPredicate = options.actualPredicate || {};
        this.options.dataSource = options.dataSource;
        this.updateDataSource();
        this.options.type = options.type;
        this.options.format = options.format || '';
        this.options.filteredColumns = options.filteredColumns || this.parent.filterSettings.columns;
        this.options.sortedColumns = options.sortedColumns || this.parent.sortSettings.columns;
        this.options.query = options.query || new Query();
        this.options.allowCaseSensitive = options.allowCaseSensitive || false;
        this.options.uid = options.column.uid;
        this.values = {};
        this.localeObj = options.localeObj;
        this.isFiltered = options.filteredColumns.length;
    };
    CheckBoxFilterBase.prototype.getAndSetChkElem = function (options) {
        this.dlg = this.parent.createElement('div', {
            id: this.id + this.options.type + '_excelDlg',
            className: 'e-checkboxfilter e-filter-popup'
        });
        this.sBox = this.parent.createElement('div', { className: 'e-searchcontainer' });
        if (!options.hideSearchbox) {
            this.sInput = this.parent.createElement('input', {
                id: this.id + '_SearchBox',
                className: 'e-searchinput'
            });
            this.sIcon = this.parent.createElement('span', {
                className: 'e-searchclear e-search-icon e-icons e-input-group-icon', attrs: {
                    type: 'text', title: this.getLocalizedLabel('Search')
                }
            });
            this.searchBox = this.parent.createElement('span', { className: 'e-searchbox e-fields' });
            this.searchBox.appendChild(this.sInput);
            this.sBox.appendChild(this.searchBox);
            var inputargs = {
                element: this.sInput, floatLabelType: 'Never', properties: {
                    placeholder: this.getLocalizedLabel('Search')
                }
            };
            Input.createInput(inputargs, this.parent.createElement);
            this.searchBox.querySelector('.e-input-group').appendChild(this.sIcon);
        }
        this.spinner = this.parent.createElement('div', { className: 'e-spinner' }); //for spinner
        this.cBox = this.parent.createElement('div', {
            id: this.id + this.options.type + '_CheckBoxList',
            className: 'e-checkboxlist e-fields'
        });
        this.spinner.appendChild(this.cBox);
        this.sBox.appendChild(this.spinner);
        return this.sBox;
    };
    CheckBoxFilterBase.prototype.showDialog = function (options) {
        var args = {
            requestType: events.filterBeforeOpen,
            columnName: this.options.field, columnType: this.options.type, cancel: false
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            var filterModel = 'filterModel';
            args[filterModel] = this;
        }
        this.parent.notify(events.cBoxFltrBegin, args);
        if (args.cancel) {
            return;
        }
        this.dialogObj = new Dialog({
            visible: false, content: this.sBox,
            close: this.closeDialog.bind(this),
            width: (!isNullOrUndefined(parentsUntil(options.target, 'e-bigger')))
                || this.parent.element.classList.contains('e-device') ? 260 : 255,
            target: this.parent.element, animationSettings: { effect: 'None' },
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: {
                        content: this.getLocalizedLabel(this.isExcel ? 'OKButton' : 'FilterButton'),
                        cssClass: 'e-primary', isPrimary: true
                    }
                },
                {
                    click: this.btnClick.bind(this),
                    buttonModel: { cssClass: 'e-flat', content: this.getLocalizedLabel(this.isExcel ? 'CancelButton' : 'ClearButton') }
                }],
            created: this.dialogCreated.bind(this),
            open: this.dialogOpen.bind(this)
        });
        var isStringTemplate = 'isStringTemplate';
        this.dialogObj[isStringTemplate] = true;
        this.dialogObj.appendTo(this.dlg);
        this.dialogObj.element.style.maxHeight = this.options.height + 'px';
        this.dialogObj.show();
        this.wireEvents();
        createSpinner({ target: this.spinner }, this.parent.createElement);
        showSpinner(this.spinner);
        this.getAllData();
    };
    CheckBoxFilterBase.prototype.dialogCreated = function (e) {
        if (!Browser.isDevice) {
            getFilterMenuPostion(this.options.target, this.dialogObj, this.parent);
        }
        else {
            this.dialogObj.position = { X: 'center', Y: 'center' };
        }
        this.parent.notify(events.filterDialogCreated, e);
    };
    CheckBoxFilterBase.prototype.openDialog = function (options) {
        this.updateModel(options);
        this.getAndSetChkElem(options);
        this.showDialog(options);
    };
    CheckBoxFilterBase.prototype.closeDialog = function () {
        if (this.dialogObj && !this.dialogObj.isDestroyed) {
            var filterTemplateCol = this.parent.getColumns().filter(function (col) { return col.getFilterItemTemplate(); });
            if (filterTemplateCol.length) {
                this.parent.destroyTemplate(['filterItemTemplate']);
            }
            this.parent.notify(events.filterMenuClose, { field: this.options.field });
            this.dialogObj.destroy();
            this.unWireEvents();
            remove(this.dlg);
            this.dlg = null;
        }
    };
    CheckBoxFilterBase.prototype.clearFilter = function () {
        /* tslint:disable-next-line:max-line-length */
        var args = { instance: this, handler: this.clearFilter, cancel: false };
        this.parent.notify(events.fltrPrevent, args);
        if (args.cancel) {
            return;
        }
        this.options.handler({ action: 'clear-filter', field: this.options.field });
    };
    CheckBoxFilterBase.prototype.btnClick = function (e) {
        if (this.filterState) {
            if (e.target.tagName.toLowerCase() === 'input') {
                var value = e.target.value;
                if (this.options.column.type === 'boolean') {
                    if (value !== undefined &&
                        this.getLocalizedLabel('FilterTrue').toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        value = 'true';
                    }
                    else if (value !== undefined &&
                        this.getLocalizedLabel('FilterFalse').toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        value = 'false';
                    }
                }
                var args = {
                    action: 'filtering', filterCollection: {
                        field: this.options.field,
                        operator: this.options.isRemote ?
                            (this.options.column.type === 'string' ? 'contains' : 'equal') :
                            (this.options.column.type === 'date' || this.options.column.type === 'datetime' ||
                                this.options.column.type === 'boolean' ? 'equal' : 'contains'),
                        value: value, matchCase: false, type: this.options.column.type
                    },
                    field: this.options.field
                };
                value ? this.options.column.isForeignColumn() ? this.foreignFilter(args, value) :
                    this.options.handler(args) : this.closeDialog();
            }
            else {
                var text = e.target.firstChild.textContent.toLowerCase();
                if (this.getLocalizedLabel(this.isExcel ? 'OKButton' : 'FilterButton').toLowerCase() === text) {
                    this.fltrBtnHandler();
                }
                else if (this.getLocalizedLabel('ClearButton').toLowerCase() === text) {
                    this.clearFilter();
                }
            }
            this.closeDialog();
        }
        else if (!(e.target.tagName.toLowerCase() === 'input')) {
            this.clearFilter();
            this.closeDialog();
        }
    };
    CheckBoxFilterBase.prototype.fltrBtnHandler = function () {
        var checked = [].slice.call(this.cBox.querySelectorAll('.e-check:not(.e-selectall)'));
        var optr = 'equal';
        var searchInput = this.searchBox.querySelector('.e-searchinput');
        var caseSen = this.options.allowCaseSensitive;
        var defaults = {
            field: this.options.field, predicate: 'or', uid: this.options.uid,
            operator: optr, type: this.options.type, matchCase: caseSen, ignoreAccent: this.parent.filterSettings.ignoreAccent
        };
        var isNotEqual = this.itemsCnt !== checked.length && this.itemsCnt - checked.length < checked.length;
        if (isNotEqual && searchInput.value === '') {
            optr = 'notequal';
            checked = [].slice.call(this.cBox.querySelectorAll('.e-uncheck:not(.e-selectall)'));
            defaults.predicate = 'and';
            defaults.operator = 'notequal';
        }
        var value;
        var fObj;
        var coll = [];
        if (checked.length !== this.itemsCnt || (searchInput.value && searchInput.value !== '')) {
            for (var i = 0; i < checked.length; i++) {
                value = this.values[parentsUntil(checked[i], 'e-ftrchk').getAttribute('uid')];
                fObj = extend({}, { value: value }, defaults);
                if (value && !value.toString().length) {
                    fObj.operator = isNotEqual ? 'notequal' : 'equal';
                }
                if (value === '' || isNullOrUndefined(value)) {
                    if (this.options.type === 'string') {
                        coll.push({
                            field: defaults.field, ignoreAccent: defaults.ignoreAccent, matchCase: defaults.matchCase,
                            operator: defaults.operator, predicate: defaults.predicate, value: ''
                        });
                    }
                    coll.push({
                        field: defaults.field,
                        matchCase: defaults.matchCase, operator: defaults.operator, predicate: defaults.predicate, value: null
                    });
                    coll.push({
                        field: defaults.field, matchCase: defaults.matchCase, operator: defaults.operator,
                        predicate: defaults.predicate, value: undefined
                    });
                }
                else {
                    coll.push(fObj);
                }
                var args = {
                    instance: this, handler: this.fltrBtnHandler, arg1: fObj.field, arg2: fObj.predicate, arg3: fObj.operator,
                    arg4: fObj.matchCase, arg5: fObj.ignoreAccent, arg6: fObj.value, cancel: false
                };
                this.parent.notify(events.fltrPrevent, args);
                if (args.cancel) {
                    return;
                }
            }
            this.initiateFilter(coll);
        }
        else {
            this.clearFilter();
        }
    };
    CheckBoxFilterBase.prototype.initiateFilter = function (fColl) {
        var firstVal = fColl[0];
        var predicate;
        if (!isNullOrUndefined(firstVal)) {
            predicate = firstVal.ejpredicate ? firstVal.ejpredicate :
                new Predicate(firstVal.field, firstVal.operator, firstVal.value, !firstVal.matchCase, firstVal.ignoreAccent);
            for (var j = 1; j < fColl.length; j++) {
                predicate = fColl[j].ejpredicate !== undefined ?
                    predicate[fColl[j].predicate](fColl[j].ejpredicate) :
                    predicate[fColl[j].predicate](fColl[j].field, fColl[j].operator, fColl[j].value, !fColl[j].matchCase, fColl[j].ignoreAccent);
            }
            var args = {
                action: 'filtering', filterCollection: fColl, field: this.options.field,
                ejpredicate: Predicate.or(predicate)
            };
            this.options.handler(args);
        }
    };
    CheckBoxFilterBase.prototype.refreshCheckboxes = function () {
        var _this = this;
        var val = this.sInput.value;
        var column = this.options.column;
        var query = column.isForeignColumn() ? this.foreignKeyQuery.clone() : this.options.query.clone();
        var foreignQuery = this.options.query.clone();
        query.queries = [];
        foreignQuery.queries = [];
        var parsed = (this.options.type !== 'string' && parseFloat(val)) ? parseFloat(val) : val;
        var operator = this.parent.getDataModule().isRemote() ?
            (this.options.type === 'string' ? 'contains' : 'equal') : (this.options.type ? 'startswith' : 'contains');
        var matchCase = true;
        var ignoreAccent = this.parent.filterSettings.ignoreAccent;
        var field = column.isForeignColumn() ? column.foreignKeyValue : column.field;
        parsed = (parsed === '' || parsed === undefined) ? undefined : parsed;
        var predicte;
        if (this.options.type === 'boolean') {
            if (parsed !== undefined &&
                this.getLocalizedLabel('FilterTrue').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = (this.parent.getDataModule().dataManager.adaptor.getModuleName()
                    === 'ODataAdaptor' || 'ODataV4Adaptor') ? true : 'true';
            }
            else if (parsed !== undefined &&
                this.getLocalizedLabel('FilterFalse').toLowerCase().indexOf(parsed.toLowerCase()) !== -1) {
                parsed = (this.parent.getDataModule().dataManager.adaptor.getModuleName()
                    === 'ODataAdaptor' || 'ODataV4Adaptor') ? false : 'false';
            }
            operator = 'equal';
        }
        this.addDistinct(query);
        /* tslint:disable-next-line:max-line-length */
        var args = {
            requestType: events.filterSearchBegin,
            filterModel: this, columnName: field, column: column,
            operator: operator, matchCase: matchCase, ignoreAccent: ignoreAccent, filterChoiceCount: null,
            query: query
        };
        this.parent.notify(events.cBoxFltrBegin, args);
        predicte = new Predicate(field, args.operator, parsed, args.matchCase, args.ignoreAccent);
        if (this.options.type === 'date' || this.options.type === 'datetime') {
            parsed = this.valueFormatter.fromView(val, this.options.parserFn, this.options.type);
            operator = 'equal';
            if (isNullOrUndefined(parsed) && val.length) {
                return;
            }
            var filterObj = {
                field: field, operator: operator, value: parsed, matchCase: matchCase,
                ignoreAccent: ignoreAccent
            };
            predicte = getDatePredicate(filterObj, this.options.type);
        }
        if (val.length) {
            query.where(predicte);
        }
        args.filterChoiceCount = !isNullOrUndefined(args.filterChoiceCount) ? args.filterChoiceCount : 1000;
        var fPredicate = {};
        showSpinner(this.spinner);
        this.renderEmpty = false;
        if (column.isForeignColumn() && val.length) {
            // tslint:disable-next-line:no-any
            column.dataSource.executeQuery(query).then(function (e) {
                var columnData = _this.options.column.columnData;
                _this.options.column.columnData = e.result;
                _this.parent.notify(events.generateQuery, { predicate: fPredicate, column: column });
                if (fPredicate.predicate.predicates.length) {
                    foreignQuery.where(fPredicate.predicate);
                }
                else {
                    _this.renderEmpty = true;
                }
                _this.options.column.columnData = columnData;
                foreignQuery.take(args.filterChoiceCount);
                _this.search(args, foreignQuery);
            });
        }
        else {
            query.take(args.filterChoiceCount);
            this.search(args, query);
        }
    };
    CheckBoxFilterBase.prototype.search = function (args, query) {
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            this.filterEvent(args, query);
        }
        else {
            this.processSearch(query);
        }
    };
    CheckBoxFilterBase.prototype.getPredicateFromCols = function (columns) {
        var predicates = CheckBoxFilterBase.getPredicate(columns);
        var predicateList = [];
        var fPredicate = {};
        var isGrid = this.parent.getForeignKeyColumns !== undefined;
        var foreignColumn = isGrid ? this.parent.getForeignKeyColumns() : [];
        for (var _i = 0, _a = Object.keys(predicates); _i < _a.length; _i++) {
            var prop = _a[_i];
            var col = void 0;
            if (isGrid && this.parent.getColumnByField(prop).isForeignColumn()) {
                col = getColumnByForeignKeyValue(prop, foreignColumn);
            }
            if (col) {
                this.parent.notify(events.generateQuery, { predicate: fPredicate, column: col });
                if (fPredicate.predicate.predicates.length) {
                    predicateList.push(Predicate.or(fPredicate.predicate.predicates));
                }
            }
            else {
                predicateList.push(predicates[prop]);
            }
        }
        return predicateList.length && Predicate.and(predicateList);
    };
    CheckBoxFilterBase.prototype.getQuery = function () {
        return this.parent.getQuery ? this.parent.getQuery().clone() : new Query();
    };
    CheckBoxFilterBase.prototype.getAllData = function () {
        var query = this.getQuery();
        query.requiresCount(); //consider take query
        this.addDistinct(query);
        var args = {
            requestType: events.filterChoiceRequest, query: query, filterChoiceCount: null
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            var filterModel = 'filterModel';
            args[filterModel] = this;
        }
        this.parent.notify(events.cBoxFltrBegin, args);
        args.filterChoiceCount = !isNullOrUndefined(args.filterChoiceCount) ? args.filterChoiceCount : 1000;
        query.take(args.filterChoiceCount);
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            this.filterEvent(args, query);
        }
        else {
            this.processDataOperation(query, true);
        }
    };
    CheckBoxFilterBase.prototype.addDistinct = function (query) {
        var filteredColumn = DataUtil.distinct(this.options.filteredColumns, 'field');
        if (filteredColumn.indexOf(this.options.column.field) <= -1) {
            filteredColumn = filteredColumn.concat(this.options.column.field);
        }
        query.distinct(filteredColumn);
        return query;
    };
    CheckBoxFilterBase.prototype.filterEvent = function (args, query) {
        var _this = this;
        var def = this.eventPromise(args, query);
        def.promise.then(function (e) {
            _this.dataSuccess(e);
        });
    };
    CheckBoxFilterBase.prototype.eventPromise = function (args, query) {
        var state;
        state = this.getStateEventArgument(query);
        var def = new Deferred();
        state.dataSource = def.resolve;
        state.action = args;
        this.parent.trigger(events.dataStateChange, state);
        return def;
    };
    ;
    CheckBoxFilterBase.prototype.getStateEventArgument = function (query) {
        var adaptr = new UrlAdaptor();
        var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        var state = adaptr.processQuery(dm, query);
        var data = JSON.parse(state.data);
        return data;
    };
    ;
    CheckBoxFilterBase.prototype.processDataOperation = function (query, isInitial) {
        var _this = this;
        this.options.dataSource = this.options.dataSource instanceof DataManager ?
            this.options.dataSource : new DataManager(this.options.dataSource);
        var allPromise = [];
        var runArray = [];
        if (this.options.column.isForeignColumn() && isInitial) {
            allPromise.push(this.options.column.dataSource.executeQuery(this.foreignKeyQuery));
            runArray.push(function (data) { return _this.foreignKeyData = data; });
        }
        allPromise.push(this.options.dataSource.executeQuery(query));
        runArray.push(this.dataSuccess.bind(this));
        var i = 0;
        Promise.all(allPromise).then(function (e) {
            e.forEach(function (data) {
                runArray[i++](data.result);
            });
        });
    };
    CheckBoxFilterBase.prototype.dataSuccess = function (e) {
        this.fullData = e;
        var query = new Query();
        if (this.parent.searchSettings && this.parent.searchSettings.key.length) {
            var sSettings = this.parent.searchSettings;
            var fields = sSettings.fields.length ? sSettings.fields : this.parent.getColumns().map(function (f) { return f.field; });
            /* tslint:disable-next-line:max-line-length */
            query.search(sSettings.key, fields, sSettings.operator, sSettings.ignoreCase, sSettings.ignoreAccent);
        }
        if ((this.options.filteredColumns.length)) {
            var cols = [];
            for (var i = 0; i < this.options.filteredColumns.length; i++) {
                var filterColumn = this.options.filteredColumns[i];
                if (this.options.uid) {
                    filterColumn.uid = filterColumn.uid || this.parent.getColumnByField(filterColumn.field).uid;
                    if (filterColumn.uid !== this.options.uid) {
                        cols.push(this.options.filteredColumns[i]);
                    }
                }
                else {
                    if (filterColumn.field !== this.options.field) {
                        cols.push(this.options.filteredColumns[i]);
                    }
                }
            }
            var predicate = this.getPredicateFromCols(cols);
            if (predicate) {
                query.where(predicate);
            }
        }
        // query.select(this.options.field);
        var result = new DataManager(this.fullData).executeLocal(query);
        var col = this.options.column;
        this.filteredData = CheckBoxFilterBase.
            getDistinct(result, this.options.field, col, this.foreignKeyData).records || [];
        this.processDataSource(null, true, this.filteredData);
        this.sInput.focus();
        var args = {
            requestType: events.filterAfterOpen,
            columnName: this.options.field, columnType: this.options.type
        };
        if (!isBlazor() || this.parent.isJsComponent) {
            var filterModel = 'filterModel';
            args[filterModel] = this;
        }
        this.parent.notify(events.cBoxFltrComplete, args);
    };
    CheckBoxFilterBase.prototype.processDataSource = function (query, isInitial, dataSource) {
        showSpinner(this.spinner);
        // query = query ? query : this.options.query.clone();
        // query.requiresCount();
        // let result: Object = new DataManager(dataSource as JSON[]).executeLocal(query);
        // let res: { result: Object[] } = result as { result: Object[] };
        this.updateResult();
        this.createFilterItems(dataSource, isInitial);
    };
    CheckBoxFilterBase.prototype.processSearch = function (query) {
        this.processDataOperation(query);
    };
    CheckBoxFilterBase.prototype.updateResult = function () {
        this.result = {};
        var predicate = this.getPredicateFromCols(this.options.filteredColumns);
        var query = new Query();
        if (predicate) {
            query.where(predicate);
        }
        var result = new DataManager(this.fullData).executeLocal(query);
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var res = result_1[_i];
            this.result[getObject(this.options.field, res)] = true;
        }
    };
    CheckBoxFilterBase.prototype.clickHandler = function (e) {
        var target = e.target;
        var elem = parentsUntil(target, 'e-checkbox-wrapper');
        if (parentsUntil(target, 'e-searchbox')) {
            this.searchBoxClick(e);
        }
        if (elem) {
            var selectAll = elem.querySelector('.e-selectall');
            if (selectAll) {
                this.updateAllCBoxes(!selectAll.classList.contains('e-check'));
            }
            else {
                toogleCheckbox(elem.parentElement);
            }
            this.updateIndeterminatenBtn();
            elem.querySelector('.e-chk-hidden').focus();
        }
    };
    CheckBoxFilterBase.prototype.updateAllCBoxes = function (checked) {
        var cBoxes = [].slice.call(this.cBox.querySelectorAll('.e-frame'));
        for (var _i = 0, cBoxes_1 = cBoxes; _i < cBoxes_1.length; _i++) {
            var cBox = cBoxes_1[_i];
            removeAddCboxClasses(cBox, checked);
        }
    };
    CheckBoxFilterBase.prototype.dialogOpen = function () {
        if (this.parent.element.classList.contains('e-device')) {
            this.dialogObj.element.querySelector('.e-input-group').classList.remove('e-input-focus');
            this.dialogObj.element.querySelector('.e-btn').focus();
        }
    };
    CheckBoxFilterBase.prototype.createCheckbox = function (value, checked, data) {
        var elem = checked ? this.cBoxTrue.cloneNode(true) :
            this.cBoxFalse.cloneNode(true);
        var label = elem.querySelector('.e-label');
        label.innerHTML = !isNullOrUndefined(value) && value.toString().length ? value :
            this.getLocalizedLabel('Blanks');
        addClass([label], ['e-checkboxfiltertext']);
        if (this.options.template) {
            label.innerHTML = '';
            appendChildren(label, this.options.template(data, this.parent, 'filterItemTemplate'));
        }
        return elem;
    };
    CheckBoxFilterBase.prototype.updateIndeterminatenBtn = function () {
        var cnt = this.cBox.children.length - 1;
        var className = [];
        var elem = this.cBox.querySelector('.e-selectall');
        var selected = this.cBox.querySelectorAll('.e-check:not(.e-selectall)').length;
        var btn = this.dialogObj.btnObj[0];
        btn.disabled = false;
        if (cnt === selected) {
            className = ['e-check'];
        }
        else if (selected) {
            className = ['e-stop'];
        }
        else {
            className = ['e-uncheck'];
            btn.disabled = true;
        }
        this.filterState = !btn.disabled;
        btn.dataBind();
        removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
        addClass([elem], className);
    };
    CheckBoxFilterBase.prototype.createFilterItems = function (data, isInitial) {
        var _a;
        var cBoxes = this.parent.createElement('div');
        var btn = this.dialogObj.btnObj[0];
        var nullCounter = -1;
        for (var i = 0; i < data.length; i++) {
            var val = getValue('ejValue', data[i]);
            if (val === '' || isNullOrUndefined(val)) {
                nullCounter = nullCounter + 1;
            }
        }
        this.itemsCnt = nullCounter !== -1 ? data.length - nullCounter : data.length;
        if (data.length && !this.renderEmpty) {
            var selectAllValue = this.getLocalizedLabel('SelectAll');
            var checkBox = this.createCheckbox(selectAllValue, false, (_a = {}, _a[this.options.field] = selectAllValue, _a));
            var selectAll = createCboxWithWrap(getUid('cbox'), checkBox, 'e-ftrchk');
            selectAll.querySelector('.e-frame').classList.add('e-selectall');
            cBoxes.appendChild(selectAll);
            var predicate = new Predicate('field', 'equal', this.options.field);
            if (this.options.foreignKeyValue) {
                predicate = predicate.or('field', 'equal', this.options.foreignKeyValue);
            }
            var isColFiltered = new DataManager(this.options.filteredColumns).executeLocal(new Query().where(predicate)).length;
            var isRndere = void 0;
            for (var i = 0; i < data.length; i++) {
                var uid = getUid('cbox');
                this.values[uid] = getValue('ejValue', data[i]);
                var value = this.valueFormatter.toView(getValue(this.options.field, data[i]), this.options.formatFn);
                if ((value === '' || isNullOrUndefined(value))) {
                    if (isRndere) {
                        continue;
                    }
                    isRndere = true;
                }
                var checkbox = this.createCheckbox(value, this.getCheckedState(isColFiltered, this.values[uid]), getValue('dataObj', data[i]));
                cBoxes.appendChild(createCboxWithWrap(uid, checkbox, 'e-ftrchk'));
            }
            this.cBox.innerHTML = '';
            appendChildren(this.cBox, [].slice.call(cBoxes.children));
            this.updateIndeterminatenBtn();
            btn.disabled = false;
        }
        else {
            cBoxes.appendChild(this.parent.createElement('span', { innerHTML: this.getLocalizedLabel('NoResult') }));
            this.cBox.innerHTML = '';
            appendChildren(this.cBox, [].slice.call(cBoxes.children));
            btn.disabled = true;
        }
        this.filterState = !btn.disabled;
        btn.dataBind();
        var args = { requestType: events.filterChoiceRequest, dataSource: this.renderEmpty ? [] : data };
        if (!isBlazor() || this.parent.isJsComponent) {
            var filterModel = 'filterModel';
            args[filterModel] = this;
        }
        this.parent.notify(events.cBoxFltrComplete, args);
        hideSpinner(this.spinner);
    };
    CheckBoxFilterBase.prototype.getCheckedState = function (isColFiltered, value) {
        if (!this.isFiltered || !isColFiltered) {
            return true;
        }
        else {
            return this.result[value];
        }
    };
    CheckBoxFilterBase.getDistinct = function (json, field, column, foreignKeyData) {
        var len = json.length;
        var result = [];
        var value;
        var ejValue = 'ejValue';
        var lookup = {};
        var isForeignKey = column && column.isForeignColumn();
        while (len--) {
            value = json[len];
            value = getObject(field, value); //local remote diff, check with mdu   
            if (!(value in lookup)) {
                var obj = {};
                obj[ejValue] = value;
                lookup[value] = true;
                if (isForeignKey) {
                    var foreignDataObj = getForeignData(column, {}, value, foreignKeyData)[0];
                    setValue(events.foreignKeyData, foreignDataObj, json[len]);
                    value = getValue(column.foreignKeyValue, foreignDataObj);
                }
                setValue(field, isNullOrUndefined(value) ? null : value, obj);
                setValue('dataObj', json[len], obj);
                result.push(obj);
            }
        }
        return DataUtil.group(DataUtil.sort(result, field, DataUtil.fnAscending), 'ejValue');
    };
    CheckBoxFilterBase.getPredicate = function (columns) {
        var cols = DataUtil.distinct(columns, 'field', true) || [];
        var collection = [];
        var pred = {};
        for (var i = 0; i < cols.length; i++) {
            collection = new DataManager(columns).executeLocal(new Query().where('field', 'equal', cols[i].field));
            if (collection.length !== 0) {
                pred[cols[i].field] = CheckBoxFilterBase.generatePredicate(collection);
            }
        }
        return pred;
    };
    CheckBoxFilterBase.generatePredicate = function (cols) {
        var len = cols ? cols.length : 0;
        var predicate;
        var first;
        first = CheckBoxFilterBase.updateDateFilter(cols[0]);
        first.ignoreAccent = !isNullOrUndefined(first.ignoreAccent) ? first.ignoreAccent : false;
        if (first.type === 'date' || first.type === 'datetime') {
            predicate = getDatePredicate(first, first.type);
        }
        else {
            predicate = first.ejpredicate ? first.ejpredicate :
                new Predicate(first.field, first.operator, first.value, !CheckBoxFilterBase.getCaseValue(first), first.ignoreAccent);
        }
        for (var p = 1; p < len; p++) {
            cols[p] = CheckBoxFilterBase.updateDateFilter(cols[p]);
            if (len > 2 && p > 1 && cols[p].predicate === 'or') {
                if (cols[p].type === 'date' || cols[p].type === 'datetime') {
                    predicate.predicates.push(getDatePredicate(cols[p], cols[p].type));
                }
                else {
                    predicate.predicates.push(new Predicate(cols[p].field, cols[p].operator, cols[p].value, !CheckBoxFilterBase.getCaseValue(cols[p]), cols[p].ignoreAccent));
                }
            }
            else {
                if (cols[p].type === 'date' || cols[p].type === 'datetime') {
                    predicate = predicate[(cols[p].predicate)](getDatePredicate(cols[p]), cols[p].type, cols[p].ignoreAccent);
                }
                else {
                    /* tslint:disable-next-line:max-line-length */
                    predicate = cols[p].ejpredicate ?
                        predicate[cols[p].predicate](cols[p].ejpredicate) :
                        predicate[(cols[p].predicate)](cols[p].field, cols[p].operator, cols[p].value, !CheckBoxFilterBase.getCaseValue(cols[p]), cols[p].ignoreAccent);
                }
            }
        }
        return predicate || null;
    };
    CheckBoxFilterBase.getCaseValue = function (filter) {
        if (isNullOrUndefined(filter.matchCase)) {
            return true;
        }
        else {
            return filter.matchCase;
        }
    };
    CheckBoxFilterBase.updateDateFilter = function (filter) {
        if ((filter.type === 'date' || filter.type === 'datetime' || filter.value instanceof Date)) {
            filter.type = filter.type || 'date';
        }
        return filter;
    };
    return CheckBoxFilterBase;
}());
export { CheckBoxFilterBase };
