import { remove, resetBlazorTemplate, blazorTemplates, isBlazor } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { DataManager, Query, Deferred, Predicate, DataUtil } from '@syncfusion/ej2-data';
import { ValueFormatter } from '../services/value-formatter';
import { RenderType, CellType } from '../base/enum';
import { Data } from '../actions/data';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import * as events from '../base/constant';
import { prepareColumns, setFormatter, isGroupAdaptive, getDatePredicate, getObject } from '../base/util';
import { ContentRender } from '../renderer/content-renderer';
import { HeaderRender } from '../renderer/header-renderer';
import { CellRenderer } from '../renderer/cell-renderer';
import { HeaderCellRenderer } from '../renderer/header-cell-renderer';
import { StackedHeaderCellRenderer } from '../renderer/stacked-cell-renderer';
import { IndentCellRenderer } from '../renderer/indent-cell-renderer';
import { GroupCaptionCellRenderer, GroupCaptionEmptyCellRenderer } from '../renderer/caption-cell-renderer';
import { ExpandCellRenderer } from '../renderer/expand-cell-renderer';
import { HeaderIndentCellRenderer } from '../renderer/header-indent-renderer';
import { DetailHeaderIndentCellRenderer } from '../renderer/detail-header-indent-renderer';
import { DetailExpandCellRenderer } from '../renderer/detail-expand-cell-renderer';
import { RowDragDropRenderer } from './row-drag-drop-renderer';
import { RowDragDropHeaderRenderer } from '../renderer/row-drag-header-indent-render';
/**
 * Content module is used to render grid content

 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function Render(parent, locator) {
        this.emptyGrid = false;
        this.counter = 0;
        this.parent = parent;
        this.locator = locator;
        this.data = new Data(parent, locator);
        this.l10n = locator.getService('localization');
        this.ariaService = this.locator.getService('ariaService');
        this.renderer = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    /**
     * To initialize grid header, content and footer rendering
     */
    Render.prototype.render = function () {
        var gObj = this.parent;
        this.headerRenderer = this.renderer.getRenderer(RenderType.Header);
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.headerRenderer.renderPanel();
        this.contentRenderer.renderPanel();
        if (gObj.getColumns().length) {
            this.isLayoutRendered = true;
            this.headerRenderer.renderTable();
            this.contentRenderer.renderTable();
            this.emptyRow(false);
        }
        this.parent.scrollModule.setWidth();
        this.parent.scrollModule.setHeight();
        if (this.parent.height !== 'auto') {
            this.parent.scrollModule.setPadding();
        }
        this.refreshDataManager();
    };
    /**
     * Refresh the entire Grid.
     * @return {void}
     */
    Render.prototype.refresh = function (e) {
        var _this = this;
        if (e === void 0) { e = { requestType: 'refresh' }; }
        var gObj = this.parent;
        gObj.notify(e.requestType + "-begin", e);
        if (isBlazor()) {
            this.resetTemplates();
        }
        gObj.trigger(events.actionBegin, e, function (args) {
            if (args === void 0) { args = { requestType: 'refresh' }; }
            if (args.requestType === 'delete' && isBlazor() && !gObj.isJsComponent) {
                var data = 'data';
                args[data] = gObj.getSelectedRecords();
            }
            if (args.cancel) {
                gObj.notify(events.cancelBegin, args);
                return;
            }
            if (args.requestType === 'delete' && gObj.allowPaging) {
                var dataLength = args.data.length;
                var count = gObj.pageSettings.totalRecordsCount - dataLength;
                if (!(gObj.currentViewData.length - dataLength) && count) {
                    gObj.prevPageMoving = true;
                    gObj.setProperties({
                        pageSettings: {
                            totalRecordsCount: count, currentPage: Math.ceil(count / gObj.pageSettings.pageSize)
                        }
                    }, true);
                    gObj.pagerModule.pagerObj.totalRecordsCount = count;
                }
            }
            _this.refreshDataManager(args);
        });
    };
    Render.prototype.resetTemplates = function () {
        var gObj = this.parent;
        var gridColumns = gObj.getColumns();
        if (gObj.detailTemplate) {
            var detailTemplateID = gObj.element.id + 'detailTemplate';
            blazorTemplates[detailTemplateID] = [];
            resetBlazorTemplate(detailTemplateID, 'DetailTemplate');
        }
        if (gObj.groupSettings.captionTemplate) {
            resetBlazorTemplate(gObj.element.id + 'captionTemplate', 'CaptionTemplate');
        }
        if (gObj.rowTemplate) {
            resetBlazorTemplate(gObj.element.id + 'rowTemplate', 'RowTemplate');
        }
        if (gObj.toolbarTemplate) {
            resetBlazorTemplate(gObj.element.id + 'toolbarTemplate', 'ToolbarTemplate');
        }
        for (var i = 0; i < gridColumns.length; i++) {
            if (gridColumns[i].template) {
                blazorTemplates[gObj.element.id + gridColumns[i].uid] = [];
                resetBlazorTemplate(gObj.element.id + gridColumns[i].uid, 'Template');
            }
            if (gridColumns[i].headerTemplate) {
                resetBlazorTemplate(gObj.element.id + gridColumns[i].uid + 'headerTemplate', 'HeaderTemplate');
            }
            if (gridColumns[i].filterTemplate) {
                resetBlazorTemplate(gObj.element.id + gridColumns[i].uid + 'filterTemplate', 'FilterTemplate');
            }
        }
        var guid = 'guid';
        for (var k = 0; k < gObj.aggregates.length; k++) {
            for (var j = 0; j < gObj.aggregates[k].columns.length; j++) {
                if (gObj.aggregates[k].columns[j].footerTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[k].columns[j][guid] + 'footerTemplate';
                    resetBlazorTemplate(tempID, 'FooterTemplate');
                }
                if (gObj.aggregates[k].columns[j].groupFooterTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[k].columns[j][guid] + 'groupFooterTemplate';
                    resetBlazorTemplate(tempID, 'GroupFooterTemplate');
                }
                if (gObj.aggregates[k].columns[j].groupCaptionTemplate) {
                    var tempID = gObj.element.id + gObj.aggregates[k].columns[j][guid] + 'groupCaptionTemplate';
                    resetBlazorTemplate(tempID, 'GroupCaptionTemplate');
                }
            }
        }
    };
    Render.prototype.refreshComplete = function (e) {
        this.parent.trigger(events.actionComplete, e);
    };
    /**
     * The function is used to refresh the dataManager
     * @return {void}
     */
    Render.prototype.refreshDataManager = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        if (args.requestType !== 'virtualscroll') {
            this.parent.showSpinner();
        }
        this.emptyGrid = false;
        var dataManager;
        var isFActon = this.isNeedForeignAction();
        this.ariaService.setBusy(this.parent.getContent().firstChild, true);
        if (isFActon) {
            var deffered = new Deferred();
            dataManager = this.getFData(deffered);
        }
        if (!dataManager) {
            dataManager = this.data.getData(args, this.data.generateQuery().requiresCount());
        }
        else {
            dataManager = dataManager.then(function (e) {
                var query = _this.data.generateQuery().requiresCount();
                if (_this.emptyGrid) {
                    var def = new Deferred();
                    def.resolve({ result: [], count: 0 });
                    return def.promise;
                }
                return _this.data.getData(args, query);
            });
        }
        if (this.parent.getForeignKeyColumns().length && (!isFActon || this.parent.searchSettings.key.length)) {
            var deffered_1 = new Deferred();
            dataManager = dataManager.then(function (e) {
                _this.parent.notify(events.getForeignKeyData, { dataManager: dataManager, result: e, promise: deffered_1 });
                return deffered_1.promise;
            });
        }
        if (this.parent.groupSettings.disablePageWiseAggregates && this.parent.groupSettings.columns.length) {
            dataManager = dataManager.then(function (e) { return _this.validateGroupRecords(e); });
        }
        dataManager.then(function (e) { return _this.dataManagerSuccess(e, args); })
            .catch(function (e) { return _this.dataManagerFailure(e, args); });
    };
    Render.prototype.getFData = function (deferred) {
        this.parent.notify(events.getForeignKeyData, { isComplex: true, promise: deferred });
        return deferred.promise;
    };
    Render.prototype.isNeedForeignAction = function () {
        var gObj = this.parent;
        return !!((gObj.allowFiltering && gObj.filterSettings.columns.length) ||
            (gObj.searchSettings.key.length)) && this.foreignKey(this.parent.getForeignKeyColumns());
    };
    Render.prototype.foreignKey = function (columns) {
        var _this = this;
        return columns.some(function (col) {
            var fbool = false;
            fbool = _this.parent.filterSettings.columns.some(function (value) {
                return col.uid === value.uid;
            });
            return !!(fbool || _this.parent.searchSettings.key.length);
        });
    };
    Render.prototype.sendBulkRequest = function (args) {
        var _this = this;
        args.requestType = 'batchsave';
        var promise = this.data.saveChanges(args.changes, this.parent.getPrimaryKeyFieldNames()[0], args.original);
        var query = this.data.generateQuery().requiresCount();
        if (this.data.dataManager.dataSource.offline) {
            this.refreshDataManager({ requestType: 'batchsave' });
            return;
        }
        else {
            promise.then(function (e) {
                _this.data.getData(args, query)
                    .then(function (e) { return _this.dmSuccess(e, args); })
                    .catch(function (e) { return _this.dmFailure(e, args); });
            })
                .catch(function (e) { return _this.dmFailure(e, args); });
        }
    };
    Render.prototype.dmSuccess = function (e, args) {
        this.dataManagerSuccess(e, args);
    };
    Render.prototype.dmFailure = function (e, args) {
        this.dataManagerFailure(e, args);
    };
    /**
     * Render empty row to Grid which is used at the time to represent to no records.
     * @return {void}

     */
    Render.prototype.renderEmptyRow = function () {
        this.emptyRow(true);
    };
    Render.prototype.emptyRow = function (isTrigger) {
        var gObj = this.parent;
        var tbody = this.contentRenderer.getTable().querySelector('tbody');
        var tr;
        if (!isNullOrUndefined(tbody)) {
            remove(tbody);
        }
        tbody = this.parent.createElement('tbody');
        var spanCount = 0;
        if (gObj.detailTemplate || gObj.childGrid) {
            ++spanCount;
        }
        tr = this.parent.createElement('tr', { className: 'e-emptyrow' });
        tr.appendChild(this.parent.createElement('td', {
            innerHTML: this.l10n.getConstant('EmptyRecord'),
            attrs: { colspan: (gObj.getColumns().length + spanCount).toString() }
        }));
        tbody.appendChild(tr);
        this.contentRenderer.renderEmpty(tbody);
        if (isTrigger) {
            this.parent.trigger(events.dataBound, {});
            this.parent.notify(events.onEmpty, { rows: [new Row({ isDataRow: true, cells: [new Cell({ isDataCell: true, visible: true })] })] });
        }
    };
    Render.prototype.dynamicColumnChange = function () {
        if (this.parent.getCurrentViewRecords().length) {
            this.updateColumnType(this.parent.getCurrentViewRecords()[0]);
        }
    };
    Render.prototype.updateColumnType = function (record) {
        var columns = this.parent.getColumns();
        var value;
        var cFormat = 'customFormat';
        var equalTo = 'equalTo';
        var data = record && record.items ? record.items[0] : record;
        var fmtr = this.locator.getService('valueFormatter');
        for (var i = 0, len = columns.length; i < len; i++) {
            value = getObject(columns[i].field || '', data);
            if (!isNullOrUndefined(columns[i][cFormat])) {
                columns[i].format = columns[i][cFormat];
            }
            if (!isNullOrUndefined(columns[i].validationRules) && !isNullOrUndefined(columns[i].validationRules[equalTo])) {
                columns[i].validationRules[equalTo][0] = this.parent.element.id + columns[i].validationRules[equalTo][0];
            }
            if (columns[i].isForeignColumn() && columns[i].columnData) {
                value = getObject(columns[i].foreignKeyValue || '', columns[i].columnData[0]);
            }
            if (!isNullOrUndefined(value)) {
                this.isColTypeDef = true;
                if (!columns[i].type) {
                    columns[i].type = value.getDay ? (value.getHours() > 0 || value.getMinutes() > 0 ||
                        value.getSeconds() > 0 || value.getMilliseconds() > 0 ? 'datetime' : 'date') : typeof (value);
                }
            }
            else {
                columns[i].type = columns[i].type || null;
            }
            var valueFormatter = new ValueFormatter();
            if (columns[i].format && (columns[i].format.skeleton || columns[i].format.format)) {
                columns[i].setFormatter(valueFormatter.getFormatFunction(columns[i].format));
                columns[i].setParser(valueFormatter.getParserFunction(columns[i].format));
            }
            if (typeof (columns[i].format) === 'string') {
                setFormatter(this.locator, columns[i]);
            }
            else if (!columns[i].format && columns[i].type === 'number') {
                columns[i].setParser(fmtr.getParserFunction({ format: 'n2' }));
            }
        }
    };
    Render.prototype.dataManagerSuccess = function (e, args) {
        var _this = this;
        var gObj = this.parent;
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.headerRenderer = this.renderer.getRenderer(RenderType.Header);
        e.actionArgs = args;
        gObj.trigger(events.beforeDataBound, e, function (dataArgs) {
            if (dataArgs.cancel) {
                return;
            }
            dataArgs.result = isNullOrUndefined(dataArgs.result) ? [] : dataArgs.result;
            var len = Object.keys(dataArgs.result).length;
            if (_this.parent.isDestroyed) {
                return;
            }
            if ((!gObj.getColumns().length && !len) && !(gObj.columns.length && gObj.columns[0] instanceof Column)) {
                gObj.hideSpinner();
                return;
            }
            _this.parent.isEdit = false;
            _this.parent.notify(events.tooltipDestroy, {});
            gObj.currentViewData = dataArgs.result;
            if (!len && dataArgs.count && gObj.allowPaging && args && args.requestType !== 'delete') {
                gObj.prevPageMoving = true;
                gObj.pageSettings.totalRecordsCount = dataArgs.count;
                if (args.requestType !== 'paging') {
                    gObj.pageSettings.currentPage = Math.ceil(dataArgs.count / gObj.pageSettings.pageSize);
                }
                gObj.dataBind();
                return;
            }
            if ((!gObj.getColumns().length && len || !_this.isLayoutRendered) && !isGroupAdaptive(gObj)) {
                _this.updatesOnInitialRender(dataArgs);
            }
            if (!_this.isColTypeDef && gObj.getCurrentViewRecords()) {
                _this.updateColumnType(gObj.getCurrentViewRecords()[0]);
            }
            if (!_this.parent.isInitialLoad && _this.parent.groupSettings.disablePageWiseAggregates &&
                !_this.parent.groupSettings.columns.length) {
                dataArgs.result = _this.parent.dataSource instanceof Array ? _this.parent.dataSource : _this.parent.currentViewData;
            }
            _this.parent.notify(events.dataReady, extend({ count: dataArgs.count, result: dataArgs.result, aggregates: dataArgs.aggregates }, args));
            if ((gObj.groupSettings.columns.length || (args && args.requestType === 'ungrouping'))
                && (args && args.requestType !== 'filtering')) {
                _this.headerRenderer.refreshUI();
            }
            if (len) {
                if (isGroupAdaptive(gObj)) {
                    var content = 'content';
                    args.scrollTop = { top: _this.contentRenderer[content].scrollTop };
                }
                _this.contentRenderer.refreshContentRows(args);
            }
            else {
                if (!gObj.getColumns().length) {
                    gObj.element.innerHTML = '';
                    alert(_this.l10n.getConstant('EmptyDataSourceError')); //ToDO: change this alert as dialog
                    return;
                }
                _this.contentRenderer.setRowElements([]);
                _this.contentRenderer.setRowObjects([]);
                _this.ariaService.setBusy(_this.parent.getContent().firstChild, false);
                _this.renderEmptyRow();
                if (args) {
                    var action = (args.requestType || '').toLowerCase() + '-complete';
                    _this.parent.notify(action, args);
                    if (args.requestType === 'batchsave') {
                        args.cancel = false;
                        args.rows = [];
                        args.isFrozen = _this.parent.getFrozenColumns() !== 0 && !args.isFrozen;
                        _this.parent.trigger(events.actionComplete, args);
                    }
                }
                _this.parent.hideSpinner();
            }
            _this.parent.notify(events.toolbarRefresh, {});
        });
    };
    Render.prototype.dataManagerFailure = function (e, args) {
        this.ariaService.setOptions(this.parent.getContent().firstChild, { busy: false, invalid: true });
        this.parent.trigger(events.actionFailure, { error: e });
        this.parent.hideSpinner();
        if (args.requestType === 'save' || args.requestType === 'delete'
            || args.name === 'bulk-save') {
            return;
        }
        this.parent.currentViewData = [];
        this.renderEmptyRow();
        this.parent.log('actionfailure', { error: e });
    };
    Render.prototype.updatesOnInitialRender = function (e) {
        this.isLayoutRendered = true;
        if (this.parent.columns.length < 1) {
            this.buildColumns(e.result[0]);
        }
        prepareColumns(this.parent.columns);
        this.headerRenderer.renderTable();
        this.contentRenderer.renderTable();
        this.parent.isAutoGen = true;
        this.parent.notify(events.autoCol, {});
    };
    Render.prototype.iterateComplexColumns = function (obj, field, split) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            var childKeys = Object.keys(obj[keys[i]]);
            if (typeof obj[keys[i]] === 'object' && childKeys.length) {
                this.iterateComplexColumns(obj[keys[i]], field + (keys[i] + '.'), split);
            }
            else {
                split[this.counter] = field + keys[i];
                this.counter++;
            }
        }
    };
    Render.prototype.buildColumns = function (record) {
        var cols = [];
        var complexCols = {};
        this.iterateComplexColumns(record, '', complexCols);
        var columns = Object.keys(complexCols).filter(function (e) { return complexCols[e] !== 'BlazId'; }).
            map(function (field) { return complexCols[field]; });
        for (var i = 0, len = columns.length; i < len; i++) {
            cols[i] = { 'field': columns[i] };
            if (this.parent.enableColumnVirtualization) {
                cols[i].width = !isNullOrUndefined(cols[i].width) ? cols[i].width : 200;
            }
        }
        this.parent.setProperties({ 'columns': cols }, true);
    };
    Render.prototype.instantiateRenderer = function () {
        this.renderer.addRenderer(RenderType.Header, new HeaderRender(this.parent, this.locator));
        this.renderer.addRenderer(RenderType.Content, new ContentRender(this.parent, this.locator));
        var cellrender = this.locator.getService('cellRendererFactory');
        cellrender.addCellRenderer(CellType.Header, new HeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Data, new CellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Indent, new IndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaption, new GroupCaptionCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.GroupCaptionEmpty, new GroupCaptionEmptyCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.Expand, new ExpandCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.HeaderIndent, new HeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.StackedHeader, new StackedHeaderCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailHeader, new DetailHeaderIndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.RowDragHIcon, new RowDragDropHeaderRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailExpand, new DetailExpandCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.DetailFooterIntent, new IndentCellRenderer(this.parent, this.locator));
        cellrender.addCellRenderer(CellType.RowDragIcon, new RowDragDropRenderer(this.parent, this.locator));
    };
    Render.prototype.addEventListener = function () {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on('refreshdataSource', this.dataManagerSuccess, this);
        this.parent.on(events.modelChanged, this.refresh, this);
        this.parent.on(events.refreshComplete, this.refreshComplete, this);
        this.parent.on(events.bulkSave, this.sendBulkRequest, this);
        this.parent.on(events.showEmptyGrid, function () { _this.emptyGrid = true; }, this);
        this.parent.on(events.autoCol, this.dynamicColumnChange, this);
    };
    Render.prototype.validateGroupRecords = function (e) {
        var _this = this;
        var index = e.result.length - 1;
        if (index < 0) {
            return Promise.resolve(e);
        }
        var group0 = e.result[0];
        var groupN = e.result[index];
        var predicate = [];
        var addWhere = function (input) {
            [group0, groupN].forEach(function (group) {
                return predicate.push(new Predicate('field', '==', group.field).and(_this.getPredicate('key', 'equal', group.key)));
            });
            input.where(Predicate.or(predicate));
        };
        var query = new Query();
        addWhere(query);
        var curDm = new DataManager(e.result);
        var curFilter = curDm.executeLocal(query);
        var newQuery = this.data.generateQuery(true);
        var rPredicate = [];
        if (this.data.isRemote()) {
            [group0, groupN].forEach(function (group) {
                return rPredicate.push(_this.getPredicate(group.field, 'equal', group.key));
            });
            newQuery.where(Predicate.or(rPredicate));
        }
        else {
            addWhere(newQuery);
        }
        var deferred = new Deferred();
        this.data.getData({}, newQuery).then(function (r) {
            _this.updateGroupInfo(curFilter, r.result);
            deferred.resolve(e);
        }).catch(function (e) { return deferred.reject(e); });
        return deferred.promise;
    };
    Render.prototype.getPredicate = function (key, operator, value) {
        if (value instanceof Date) {
            return getDatePredicate({ field: key, operator: operator, value: value });
        }
        return new Predicate(key, operator, value);
    };
    Render.prototype.updateGroupInfo = function (current, untouched) {
        var _this = this;
        var dm = new DataManager(untouched);
        current.forEach(function (element, index, array) {
            var uGroup = dm.executeLocal(new Query()
                .where(new Predicate('field', '==', element.field).and(_this.getPredicate('key', 'equal', element.key))))[0];
            element.count = uGroup.count;
            var itemGroup = element.items;
            var uGroupItem = uGroup.items;
            if (itemGroup.GroupGuid) {
                element.items = _this.updateGroupInfo(element.items, uGroup.items);
            }
            _this.parent.aggregates.forEach(function (row) {
                return row.columns.forEach(function (column) {
                    var types = column.type instanceof Array ? column.type : [column.type];
                    types.forEach(function (type) {
                        var key = column.field + ' - ' + type.toLowerCase();
                        var data = itemGroup.level ? uGroupItem.records : uGroup.items;
                        var context = _this.parent;
                        if (type === 'Custom') {
                            var data_1 = itemGroup.level ? uGroupItem : uGroup;
                            element.aggregates[key] = column.customAggregate ?
                                column.customAggregate.call(context, data_1, column) : '';
                        }
                        else {
                            element.aggregates[key] = DataUtil.aggregates[type.toLowerCase()](data, column.field);
                        }
                    });
                });
            });
        });
        return current;
    };
    return Render;
}());
export { Render };
