import { DataManager, Query, Deferred } from '@syncfusion/ej2-data';
import { getCell, setCell } from '../base/index';
import { getRangeIndexes, checkIsFormula, updateSheetFromDataSource, checkDateFormat, dataSourceChanged } from '../common/index';
import { getFormatFromType } from './number-format';
/**
 * Data binding module
 */
var DataBind = /** @class */ (function () {
    function DataBind(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    DataBind.prototype.addEventListener = function () {
        this.parent.on(updateSheetFromDataSource, this.updateSheetFromDataSourceHandler, this);
        this.parent.on(dataSourceChanged, this.dataSourceChangedHandler, this);
    };
    /**
     * Destroys the Data binding module.
     * @return {void}
     */
    DataBind.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    DataBind.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(updateSheetFromDataSource, this.updateSheetFromDataSourceHandler);
            this.parent.off(dataSourceChanged, this.dataSourceChangedHandler);
        }
    };
    /**
     * Update given data source to sheet.
     */
    DataBind.prototype.updateSheetFromDataSourceHandler = function (args) {
        var _this = this;
        var cell;
        var flds;
        var sCellIdx;
        var result;
        var remoteUrl;
        var isLocal;
        var dataManager;
        var requestedRange = [];
        var sRanges = [];
        var rowIdx;
        var deferred = new Deferred();
        var sRowIdx;
        var sColIdx;
        var loadedInfo;
        args.promise = deferred.promise;
        if (args.sheet && args.sheet.rangeSettings.length) {
            var _loop_1 = function (k) {
                var sRange = args.indexes[0];
                var eRange = args.indexes[2];
                var range = args.sheet.rangeSettings[k];
                sRowIdx = getRangeIndexes(range.startCell)[0];
                dataManager = range.dataSource instanceof DataManager ? range.dataSource
                    : range.dataSource ? new DataManager(range.dataSource) : new DataManager();
                remoteUrl = remoteUrl || dataManager.dataSource.url;
                args.sheet.isLocalData = isLocal || !dataManager.dataSource.url;
                if (sRowIdx <= sRange) {
                    sRange = sRange - sRowIdx;
                }
                else {
                    if (sRowIdx <= eRange) {
                        eRange = eRange - sRowIdx;
                        sRange = 0;
                    }
                    else {
                        sRange = -1;
                    }
                }
                if (range.showFieldAsHeader && sRange !== 0) {
                    sRange -= 1;
                }
                var isEndReached = false;
                this_1.initRangeInfo(range);
                var count = this_1.getMaxCount(range);
                loadedInfo = this_1.getLoadedInfo(sRange, eRange, range);
                sRange = loadedInfo.unloadedRange[0];
                eRange = loadedInfo.unloadedRange[1];
                if (sRange > count) {
                    isEndReached = true;
                }
                else if (eRange > count) {
                    eRange = count;
                }
                if (sRange >= 0 && loadedInfo.isNotLoaded && !isEndReached) {
                    sRanges[k] = sRange;
                    requestedRange.push(false);
                    var query = (range.query ? range.query : new Query()).clone();
                    dataManager.executeQuery(query.range(sRange, eRange >= count ? eRange : eRange + 1)
                        .requiresCount()).then(function (e) {
                        if (!_this.parent || _this.parent.isDestroyed) {
                            return;
                        }
                        result = (e.result && e.result.result ? e.result.result : e.result);
                        if (result.length) {
                            range.info.count = e.count;
                            flds = Object.keys(result[0]);
                            range.info.fldLen = flds.length;
                            sCellIdx = getRangeIndexes(range.startCell);
                            sRowIdx = sCellIdx[0];
                            sColIdx = sCellIdx[1];
                            if (sRanges[k] === 0 && range.showFieldAsHeader) {
                                flds.forEach(function (field, i) {
                                    cell = getCell(sRowIdx + sRanges[k], sColIdx + i, args.sheet, true);
                                    if (!cell) {
                                        args.sheet.rows[sRowIdx + sRanges[k]].cells[sColIdx + i] = { value: field };
                                    }
                                    else if (!cell.value) {
                                        cell.value = field;
                                    }
                                });
                            }
                            result.forEach(function (item, i) {
                                for (var j = 0; j < flds.length; j++) {
                                    rowIdx = sRowIdx + sRanges[k] + i + (range.showFieldAsHeader ? 1 : 0);
                                    cell = getCell(rowIdx, sColIdx + j, args.sheet, true);
                                    if (cell) {
                                        if (!cell.value) {
                                            setCell(rowIdx, sColIdx + j, args.sheet, _this.getCellDataFromProp(item[flds[j]]), true);
                                        }
                                    }
                                    else {
                                        args.sheet.rows[rowIdx]
                                            .cells[sColIdx + j] = _this.getCellDataFromProp(item[flds[j]]);
                                    }
                                    _this.checkDataForFormat({
                                        args: args, cell: cell, colIndex: sColIdx + j, rowIndex: rowIdx, i: i, j: j, k: k,
                                        range: range, sRanges: sRanges, value: item[flds[j]]
                                    });
                                }
                            });
                        }
                        args.sheet.usedRange.rowIndex =
                            Math.max(sRowIdx + (count || e.count) + (range.showFieldAsHeader ? 1 : 0), args.sheet.usedRange.rowIndex);
                        args.sheet.usedRange.colIndex = Math.max(sColIdx + flds.length - 1, args.sheet.usedRange.colIndex);
                        range.info.loadedRange.push([sRange, eRange]);
                        requestedRange[k] = true;
                        if (requestedRange.indexOf(false) === -1) {
                            if (remoteUrl) {
                                _this.updateSheetFromDataSourceHandler({
                                    sheet: args.sheet, indexes: [0, 0, args.sheet.usedRange.rowIndex, args.sheet.usedRange.colIndex],
                                    promise: new Promise(function (resolve) { resolve((function () { })()); })
                                });
                            }
                            deferred.resolve();
                        }
                    });
                }
                else if (k === 0 && requestedRange.indexOf(false) === -1) {
                    deferred.resolve();
                }
            };
            var this_1 = this;
            for (var k = args.sheet.rangeSettings.length - 1; k >= 0; k--) {
                _loop_1(k);
            }
        }
        else {
            deferred.resolve();
        }
    };
    DataBind.prototype.getCellDataFromProp = function (prop) {
        var data = {};
        if (Object.prototype.toString.call(prop) === '[object Object]') {
            if (prop.formula) {
                data.formula = prop.formula;
            }
            else if (prop.value) {
                data.value = prop.value;
            }
        }
        else {
            if (checkIsFormula(prop)) {
                data.formula = prop;
            }
            else {
                data.value = prop;
            }
        }
        return data;
    };
    DataBind.prototype.checkDataForFormat = function (args) {
        if (args.value !== '') {
            var dateEventArgs = {
                value: args.value,
                rowIndex: args.rowIndex,
                colIndex: args.colIndex,
                isDate: false,
                updatedVal: args.value,
                isTime: false
            };
            this.parent.notify(checkDateFormat, dateEventArgs);
            if (dateEventArgs.isDate) {
                if (args.cell) {
                    args.cell.format = getFormatFromType('ShortDate');
                    args.cell.value = dateEventArgs.updatedVal;
                }
                else {
                    args.args.sheet.rows[args.rowIndex]
                        .cells[args.colIndex].format = getFormatFromType('ShortDate');
                    args.args.sheet.rows[args.rowIndex]
                        .cells[args.colIndex].value = dateEventArgs.updatedVal;
                }
            }
            else if (dateEventArgs.isTime) {
                if (args.cell) {
                    args.cell.format = getFormatFromType('Time');
                    args.cell.value = dateEventArgs.updatedVal;
                }
                else {
                    args.args.sheet.rows[args.rowIndex]
                        .cells[args.colIndex].format = getFormatFromType('Time');
                    args.args.sheet.rows[args.rowIndex]
                        .cells[args.colIndex].value = dateEventArgs.updatedVal;
                }
            }
        }
    };
    DataBind.prototype.getLoadedInfo = function (sRange, eRange, range) {
        var isNotLoaded = true;
        range.info.loadedRange.forEach(function (range) {
            if (range[0] <= sRange && sRange <= range[1]) {
                if (range[0] <= eRange && eRange <= range[1]) {
                    isNotLoaded = false;
                }
                else {
                    sRange = range[1] + 1;
                }
            }
            else if (range[0] <= eRange && eRange <= range[1]) {
                eRange = range[0] - 1;
            }
        });
        return { isNotLoaded: isNotLoaded, unloadedRange: [sRange, eRange] };
    };
    DataBind.prototype.getMaxCount = function (range) {
        if (range.query) {
            var query = range.query.queries;
            for (var i = 0; i < query.length; i++) {
                if (query[i].fn === 'onTake') {
                    return Math.min(query[i].e.nos, range.info.count || query[i].e.nos);
                }
            }
        }
        return range.info.count;
    };
    DataBind.prototype.initRangeInfo = function (range) {
        if (!range.info) {
            range.info = { loadedRange: [] };
        }
    };
    /**
     * Remove old data from sheet.
     */
    DataBind.prototype.dataSourceChangedHandler = function (args) {
        var oldSheet = args.oldProp.sheets[args.sheetIdx];
        var row;
        var sheet = this.parent.sheets[args.sheetIdx];
        var oldRange = oldSheet && oldSheet.rangeSettings && oldSheet.rangeSettings[args.rangeIdx];
        if (oldRange) {
            var indexes_1 = getRangeIndexes(oldRange.startCell);
            sheet.rangeSettings[args.rangeIdx].info.loadedRange = [];
            oldRange.info.loadedRange.forEach(function (range) {
                for (var i = range[0]; i < range[1]; i++) {
                    row = sheet.rows[i + indexes_1[0]];
                    for (var j = indexes_1[1]; j < indexes_1[1] + oldRange.info.fldLen; j++) {
                        row.cells[j].value = '';
                    }
                }
            });
        }
        this.parent.notify('data-refresh', { sheetIdx: args.sheetIdx });
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    DataBind.prototype.getModuleName = function () {
        return 'dataBind';
    };
    return DataBind;
}());
export { DataBind };
