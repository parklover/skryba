import { extend, isNullOrUndefined, setValue, getValue, isBlazor, addClass, removeClass } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { getObject, getUid } from '@syncfusion/ej2-grids';
import { isRemoteData, isOffline, isCountRequired } from '../utils';
import * as events from './constant';
/**
 * Internal dataoperations for tree grid

 */
var DataManipulation = /** @class */ (function () {
    function DataManipulation(grid) {
        this.parent = grid;
        this.parentItems = [];
        this.taskIds = [];
        this.hierarchyData = [];
        this.storedIndex = -1;
        this.sortedData = [];
        this.isSortAction = false;
        this.addEventListener();
        this.dataResults = {};
        this.isSelfReference = !isNullOrUndefined(this.parent.parentIdMapping);
    }
    /**

     */
    DataManipulation.prototype.addEventListener = function () {
        this.parent.on('updateRemoteLevel', this.updateParentRemoteData, this);
        this.parent.grid.on('sorting-begin', this.beginSorting, this);
        this.parent.on('updateAction', this.updateData, this);
        this.parent.on(events.remoteExpand, this.collectExpandingRecs, this);
        this.parent.on('dataProcessor', this.dataProcessor, this);
    };
    /**

     */
    DataManipulation.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.remoteExpand, this.collectExpandingRecs);
        this.parent.off('updateRemoteLevel', this.updateParentRemoteData);
        this.parent.off('updateAction', this.updateData);
        this.parent.off('dataProcessor', this.dataProcessor);
        this.parent.grid.off('sorting-begin', this.beginSorting);
    };
    /**
     * To destroy the dataModule
     * @return {void}

     */
    DataManipulation.prototype.destroy = function () {
        this.removeEventListener();
    };
    DataManipulation.prototype.isRemote = function () {
        if (!(this.parent.dataSource instanceof DataManager)) {
            return false;
        }
        return true;
        // let gridData:  DataManager = <DataManager>this.parent.dataSource;
        // return gridData.dataSource.offline !== true && gridData.dataSource.url !== undefined;
    };
    /**
     * Function to manipulate datasource
    
     */
    DataManipulation.prototype.convertToFlatData = function (data) {
        var _this = this;
        this.parent.flatData = (Object.keys(data).length === 0 && !(this.parent.dataSource instanceof DataManager) ?
            this.parent.dataSource : []);
        this.parent.parentData = [];
        var adaptorName = 'adaptorName';
        if ((isRemoteData(this.parent) && !isOffline(this.parent)) && data instanceof DataManager && !(data instanceof Array)) {
            var dm = this.parent.dataSource;
            if (this.parent.parentIdMapping) {
                this.parent.query = isNullOrUndefined(this.parent.query) ?
                    new Query() : this.parent.query;
                if (this.parent.parentIdMapping) {
                    if (this.parent.initialRender) {
                        this.parent.query.where(this.parent.parentIdMapping, 'equal', null);
                        this.parent.query.addParams('IdMapping', this.parent.idMapping);
                    }
                }
                if (!this.parent.hasChildMapping && !(this.parent.dataSource[adaptorName] === 'BlazorAdaptor')) {
                    var qry = this.parent.query.clone();
                    qry.queries = [];
                    qry = qry.select([this.parent.parentIdMapping]);
                    qry.isCountRequired = true;
                    dm.executeQuery(qry).then(function (e) {
                        _this.parentItems = DataUtil.distinct(e.result, _this.parent.parentIdMapping, false);
                        var req = getObject('dataSource.requests', _this.parent).filter(function (e) {
                            return e.httpRequest.statusText !== 'OK';
                        }).length;
                        if (req === 0) {
                            setValue('grid.contentModule.isLoaded', true, _this.parent);
                            if (!isNullOrUndefined(_this.zerothLevelData)) {
                                setValue('cancel', false, _this.zerothLevelData);
                                getValue('grid.renderModule', _this.parent).dataManagerSuccess(_this.zerothLevelData);
                                _this.zerothLevelData = null;
                            }
                            _this.parent.grid.hideSpinner();
                        }
                    });
                }
            }
        }
        else if (data instanceof Array) {
            this.hierarchyData = [];
            this.taskIds = [];
            for (var i = 0; i < Object.keys(data).length; i++) {
                var tempData = data[i];
                this.hierarchyData.push(extend({}, tempData));
                if (!isNullOrUndefined(tempData[this.parent.idMapping])) {
                    this.taskIds.push(tempData[this.parent.idMapping]);
                }
            }
            if (this.isSelfReference) {
                var selfData = [];
                var mappingData = new DataManager(this.hierarchyData).executeLocal(new Query()
                    .group(this.parent.parentIdMapping));
                for (var i = 0; i < mappingData.length; i++) {
                    var groupData = mappingData[i];
                    var index = this.taskIds.indexOf(groupData.key);
                    if (!isNullOrUndefined(groupData.key)) {
                        if (index > -1) {
                            var childData = (groupData.items);
                            this.hierarchyData[index][this.parent.childMapping] = childData;
                            continue;
                        }
                    }
                    selfData.push.apply(selfData, groupData.items);
                }
                this.hierarchyData = this.selfReferenceUpdate(selfData);
            }
            if (!Object.keys(this.hierarchyData).length) {
                this.parent.flatData = (!(this.parent.dataSource instanceof DataManager) ? this.parent.dataSource : []);
            }
            else {
                this.createRecords(this.hierarchyData);
            }
            this.storedIndex = -1;
        }
        // else if (data instanceof DataManager && this.parent.isLocalData) {
        //   this.convertToFlatData(data.dataSource.json);
        // }
        //this.crudActions();
    };
    // private crudActions(): void {
    //   if (this.parent.dataSource instanceof DataManager && (this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor)) {
    //     let oldUpdate: Function = this.parent.dataSource.adaptor.update;
    //     this.parent.dataSource.adaptor.update =
    //         function (dm: DataManager, keyField: string, value: Object, tableName?: string, query?: Query, original?: Object): Object {
    //                value = getPlainData(value);
    //                return oldUpdate.apply(this, [dm, keyField, value, tableName, query, original]);
    //              }
    //   }
    // }
    DataManipulation.prototype.selfReferenceUpdate = function (selfData) {
        var result = [];
        while (this.hierarchyData.length > 0 && selfData.length > 0) {
            var index = selfData.indexOf(this.hierarchyData[0]);
            if (index === -1) {
                this.hierarchyData.shift();
            }
            else {
                result.push(this.hierarchyData.shift());
                selfData.splice(index, 1);
            }
        }
        return result;
    };
    /**
     * Function to update the zeroth level parent records in remote binding
  
     */
    DataManipulation.prototype.updateParentRemoteData = function (args) {
        var records = args.result;
        var adaptorName = 'adaptorName';
        if (!this.parent.hasChildMapping && !this.parentItems.length &&
            (!(this.parent.dataSource[adaptorName] === 'BlazorAdaptor') && !this.parent.loadChildOnDemand)) {
            this.zerothLevelData = args;
            setValue('cancel', true, args);
        }
        else {
            if (!(this.parent.dataSource[adaptorName] === 'BlazorAdaptor') && !this.parent.loadChildOnDemand) {
                for (var rec = 0; rec < records.length; rec++) {
                    if ((records[rec][this.parent.hasChildMapping] || this.parentItems.indexOf(records[rec][this.parent.idMapping]) !== -1)
                        && (isNullOrUndefined(records[rec].index))) {
                        records[rec].taskData = extend({}, records[rec]);
                        records[rec].uniqueID = getUid(this.parent.element.id + '_data_');
                        setValue('uniqueIDCollection.' + records[rec].uniqueID, records[rec], this.parent);
                        records[rec].level = 0;
                        records[rec].index = Math.ceil(Math.random() * 1000);
                        records[rec].hasChildRecords = true;
                    }
                }
            }
            else {
                this.convertToFlatData(records);
            }
        }
        args.result = this.parent.dataSource[adaptorName] === 'BlazorAdaptor' || this.parent.loadChildOnDemand ? this.parent.flatData : records;
        this.parent.notify('updateResults', args);
    };
    /**
     * Function to manipulate datasource
  
     */
    DataManipulation.prototype.collectExpandingRecs = function (rowDetails) {
        var _this = this;
        var gridRows = this.parent.getRows();
        if (this.parent.rowTemplate) {
            var rows = this.parent.getContentTable().rows;
            gridRows = [].slice.call(rows);
        }
        var childRecord;
        var adaptorName = 'adaptorName';
        var args = { row: rowDetails.parentRow, data: rowDetails.record };
        if (rowDetails.rows.length > 0) {
            rowDetails.record.expanded = true;
            for (var i = 0; i < rowDetails.rows.length; i++) {
                rowDetails.rows[i].style.display = 'table-row';
                if ((isBlazor() && this.parent.dataSource[adaptorName] === 'BlazorAdaptor') || !this.parent.loadChildOnDemand) {
                    var targetEle = rowDetails.rows[i].getElementsByClassName('e-treegridcollapse')[0];
                    if (!isNullOrUndefined(targetEle)) {
                        addClass([targetEle], 'e-treegridexpand');
                        removeClass([targetEle], 'e-treegridcollapse');
                    }
                    childRecord = this.parent.rowTemplate ? this.parent.grid.getCurrentViewRecords()[rowDetails.rows[i].rowIndex] :
                        this.parent.grid.getRowObjectFromUID(rowDetails.rows[i].getAttribute('data-Uid')).data;
                    var childRows = gridRows.filter(function (r) {
                        return r.classList.contains('e-gridrowindex' + childRecord.index + 'level' + (childRecord.level + 1));
                    });
                    if (childRows.length) {
                        this.collectExpandingRecs({ record: childRecord, rows: childRows, parentRow: rowDetails.parentRow });
                    }
                }
                var expandingTd = rowDetails.rows[i].querySelector('.e-detailrowcollapse');
                if (!isNullOrUndefined(expandingTd)) {
                    this.parent.grid.detailRowModule.expand(expandingTd);
                }
            }
        }
        else {
            var dm = this.parent.dataSource;
            var qry = this.parent.grid.getDataModule().generateQuery();
            var clonequries = qry.queries.filter(function (e) { return e.fn !== 'onPage' && e.fn !== 'onWhere'; });
            qry.queries = clonequries;
            qry.isCountRequired = true;
            qry.where(this.parent.parentIdMapping, 'equal', rowDetails.record[this.parent.idMapping]);
            showSpinner(this.parent.element);
            dm.executeQuery(qry).then(function (e) {
                var datas = _this.parent.grid.currentViewData;
                var inx = datas.indexOf(rowDetails.record);
                var haveChild = getObject('actual.nextLevel', e);
                var result = e.result;
                rowDetails.record.childRecords = result;
                for (var r = 0; r < result.length; r++) {
                    result[r].taskData = extend({}, result[r]);
                    result[r].level = rowDetails.record.level + 1;
                    result[r].index = Math.ceil(Math.random() * 1000);
                    var parentData = extend({}, rowDetails.record);
                    delete parentData.childRecords;
                    result[r].parentItem = parentData;
                    result[r].parentUniqueID = rowDetails.record.uniqueID;
                    result[r].uniqueID = getUid(_this.parent.element.id + '_data_');
                    setValue('uniqueIDCollection.' + result[r].uniqueID, result[r], _this.parent);
                    // delete result[r].parentItem.childRecords;
                    if ((result[r][_this.parent.hasChildMapping] || _this.parentItems.indexOf(result[r][_this.parent.idMapping]) !== -1)
                        && !(haveChild && !haveChild[r])) {
                        result[r].hasChildRecords = true;
                        result[r].expanded = false;
                    }
                    datas.splice(inx + r + 1, 0, result[r]);
                }
                setValue('result', datas, e);
                setValue('action', 'beforecontentrender', e);
                _this.parent.trigger(events.actionComplete, e);
                hideSpinner(_this.parent.element);
                e.count = _this.parent.grid.pageSettings.totalRecordsCount;
                getValue('grid.renderModule', _this.parent).dataManagerSuccess(e);
                _this.parent.trigger(events.expanded, args);
            });
        }
    };
    DataManipulation.prototype.beginSorting = function () {
        this.isSortAction = true;
    };
    DataManipulation.prototype.createRecords = function (data, parentRecords) {
        var treeGridData = [];
        for (var i = 0, len = Object.keys(data).length; i < len; i++) {
            var currentData = extend({}, data[i]);
            currentData.taskData = data[i];
            var level = 0;
            this.storedIndex++;
            currentData.index = this.storedIndex;
            if (!isNullOrUndefined(currentData[this.parent.childMapping]) ||
                (currentData[this.parent.hasChildMapping] && isCountRequired(this.parent))) {
                currentData.hasChildRecords = true;
                if (this.parent.enableCollapseAll || !isNullOrUndefined(this.parent.dataStateChange)
                    && isNullOrUndefined(currentData[this.parent.childMapping])) {
                    currentData.expanded = false;
                }
                else {
                    currentData.expanded = !isNullOrUndefined(currentData[this.parent.expandStateMapping])
                        ? currentData[this.parent.expandStateMapping] : true;
                }
            }
            currentData.index = currentData.hasChildRecords ? this.storedIndex : this.storedIndex;
            if (this.isSelfReference && isNullOrUndefined(currentData[this.parent.parentIdMapping])) {
                this.parent.parentData.push(currentData);
            }
            currentData.uniqueID = getUid(this.parent.element.id + '_data_');
            setValue('uniqueIDCollection.' + currentData.uniqueID, currentData, this.parent);
            if (!isNullOrUndefined(parentRecords)) {
                var parentData = extend({}, parentRecords);
                delete parentData.childRecords;
                delete parentData[this.parent.childMapping];
                if (this.isSelfReference) {
                    delete parentData.taskData[this.parent.childMapping];
                }
                currentData.parentItem = parentData;
                currentData.parentUniqueID = parentData.uniqueID;
                level = parentRecords.level + 1;
            }
            currentData.level = level;
            currentData.checkboxState = 'uncheck';
            if (isNullOrUndefined(currentData[this.parent.parentIdMapping]) || currentData.parentItem) {
                this.parent.flatData.push(currentData);
            }
            if (!this.isSelfReference && currentData.level === 0) {
                this.parent.parentData.push(currentData);
            }
            if (!isNullOrUndefined(currentData[this.parent.childMapping] && currentData[this.parent.childMapping].length)) {
                var record = this.createRecords(currentData[this.parent.childMapping], currentData);
                currentData.childRecords = record;
            }
            treeGridData.push(currentData);
        }
        return treeGridData;
    };
    /**
     * Function to perform filtering/sorting action for local data
  
     */
    DataManipulation.prototype.dataProcessor = function (args) {
        var isExport = getObject('isExport', args);
        var expresults = getObject('expresults', args);
        var exportType = getObject('exportType', args);
        var isPrinting = getObject('isPrinting', args);
        var dataObj;
        var actionArgs = getObject('actionArgs', args);
        var requestType = getObject('requestType', args);
        var actionData = getObject('data', args);
        var action = getObject('action', args);
        if ((!isNullOrUndefined(actionArgs) && Object.keys(actionArgs).length) || requestType === 'save') {
            requestType = requestType ? requestType : actionArgs.requestType.toString();
            actionData = actionData ? actionData : getObject('data', actionArgs);
            action = action ? action : getObject('action', actionArgs);
            if (action === 'add') {
                this.parent.grid.currentViewData = args.result;
            }
            if (this.parent.isLocalData) {
                if ((requestType === 'delete' || requestType === 'save')) {
                    this.parent.notify(events.crudAction, { value: actionData, action: action || requestType });
                }
            }
        }
        if (isExport && !isNullOrUndefined(expresults)) {
            dataObj = expresults;
        }
        else {
            dataObj = isCountRequired(this.parent) ? getValue('result', this.parent.grid.dataSource)
                : this.parent.grid.dataSource;
        }
        var results = dataObj instanceof DataManager ? dataObj.dataSource.json : dataObj;
        var count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        if ((this.parent.grid.allowFiltering && this.parent.grid.filterSettings.columns.length) ||
            (this.parent.grid.searchSettings.key.length > 0)) {
            var qry = new Query();
            var gridQuery = getObject('query', args);
            if (isNullOrUndefined(gridQuery)) {
                gridQuery = new Query();
                gridQuery = getValue('grid.renderModule.data', this.parent).filterQuery(gridQuery);
                gridQuery = getValue('grid.renderModule.data', this.parent).searchQuery(gridQuery);
            }
            var fltrQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onWhere'; });
            var srchQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onSearch'; });
            qry.queries = fltrQuery.concat(srchQuery);
            var filteredData = new DataManager(results).executeLocal(qry);
            this.parent.notify('updateFilterRecs', { data: filteredData });
            results = this.dataResults.result;
            this.dataResults.result = null;
            //this.parent.filterModule.updatedFilteredRecord(filteredData);
            if (this.parent.grid.aggregates.length > 0) {
                var query = getObject('query', args);
                if (isNullOrUndefined(gridQuery)) {
                    gridQuery = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
                }
                if (!isNullOrUndefined(query)) {
                    var summaryQuery = query.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                    results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, results, true);
                }
            }
        }
        if (this.parent.grid.aggregates.length && this.parent.grid.sortSettings.columns.length === 0
            && this.parent.grid.filterSettings.columns.length === 0 && !this.parent.grid.searchSettings.key.length) {
            var gridQuery = getObject('query', args);
            if (isNullOrUndefined(gridQuery)) {
                gridQuery = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
            }
            var summaryQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onAggregates'; });
            results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.parent.flatData, true);
        }
        if (this.parent.grid.sortSettings.columns.length > 0 || this.isSortAction) {
            this.isSortAction = false;
            var parentData = void 0;
            var action_1 = 'action';
            var collpasedIndexes = [];
            parentData = this.parent.parentData;
            var sortedData = void 0;
            var query = getObject('query', args);
            var srtQry = new Query();
            for (var srt = this.parent.grid.sortSettings.columns.length - 1; srt >= 0; srt--) {
                var col = this.parent.getColumnByField(this.parent.grid.sortSettings.columns[srt].field);
                var compFun = col.sortComparer && !this.isRemote() ?
                    col.sortComparer.bind(col) :
                    this.parent.grid.sortSettings.columns[srt].direction;
                srtQry.sortBy(this.parent.grid.sortSettings.columns[srt].field, compFun);
            }
            var modifiedData = new DataManager(parentData).executeLocal(srtQry);
            sortedData = modifiedData;
            var sortArgs = { modifiedData: modifiedData, filteredData: results, srtQry: srtQry };
            this.parent.notify('createSort', sortArgs);
            results = sortArgs.modifiedData;
            this.dataResults.result = null;
            this.sortedData = results;
            this.parent.notify('updateModel', {});
            if (this.parent.grid.aggregates.length > 0 && !isNullOrUndefined(query)) {
                var isSort = false;
                var query_1 = getObject('query', args);
                var summaryQuery = query_1.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.sortedData, isSort);
            }
        }
        count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        var temp = this.paging(results, count, isExport, isPrinting, exportType, args);
        results = temp.result;
        count = temp.count;
        args.result = results;
        args.count = count;
        this.parent.notify('updateResults', args);
    };
    DataManipulation.prototype.paging = function (results, count, isExport, isPrinting, exportType, args) {
        if (this.parent.allowPaging && (!isExport || exportType === 'CurrentPage')
            && (!isPrinting || this.parent.printMode === 'CurrentPage')) {
            this.parent.notify(events.pagingActions, { result: results, count: count });
            results = this.dataResults.result;
            count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
                : this.dataResults.count;
        }
        else if (this.parent.enableVirtualization && (!isExport || exportType === 'CurrentPage')) {
            this.parent.notify(events.pagingActions, { result: results, count: count, actionArgs: getValue('actionArgs', args) });
            results = this.dataResults.result;
            count = this.dataResults.count;
        }
        var value = { result: results, count: count };
        return value;
    };
    /**
     * update for datasource
     */
    DataManipulation.prototype.updateData = function (dataResult) {
        this.dataResults = dataResult;
    };
    return DataManipulation;
}());
export { DataManipulation };
