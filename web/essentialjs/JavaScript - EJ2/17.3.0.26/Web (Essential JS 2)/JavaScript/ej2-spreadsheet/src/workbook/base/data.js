import { getSheetNameFromAddress, getSheetIndex, getSheet } from '../base/index';
import { getCellAddress, getIndexesFromAddress, getColumnHeaderText, updateSheetFromDataSource } from '../common/index';
import { getRow, isHiddenRow } from './row';
import { getCell } from './cell';
import { isUndefined, isNullOrUndefined } from '@syncfusion/ej2-base';
import { getMaxSheetId, getSheetNameCount } from './sheet';
/**
 * Update data source to Sheet and returns Sheet

 */
export function getData(context, address, columnWiseData) {
    return new Promise(function (resolve, reject) {
        resolve((function () {
            var i;
            var row;
            var data = new Map();
            var sheet = getSheet(context, getSheetIndex(context, getSheetNameFromAddress(address)));
            var indexes = getIndexesFromAddress(address);
            var sRow = indexes[0];
            var args = {
                sheet: sheet, indexes: indexes, promise: new Promise(function (resolve, reject) { resolve((function () { })()); })
            };
            context.notify(updateSheetFromDataSource, args);
            return args.promise.then(function () {
                while (sRow <= indexes[2]) {
                    if (isHiddenRow(sheet, sRow)) {
                        sRow++;
                        continue;
                    }
                    var cells = {};
                    row = getRow(sheet, sRow);
                    i = indexes[1];
                    while (i <= indexes[3]) {
                        if (columnWiseData) {
                            if (data instanceof Map) {
                                data = [];
                            }
                            var key = getColumnHeaderText(i + 1);
                            cells[key] = row ? getCell(sRow, i, sheet) : null;
                            data[sRow.toString()] = cells;
                        }
                        else {
                            data.set(getCellAddress(sRow, i), row ? getCell(sRow, i, sheet) : null);
                        }
                        i++;
                    }
                    sRow++;
                }
                return data;
            });
        })());
    });
}
/**

 */
export function getModel(model, idx) {
    var diff;
    var j;
    var prevIdx;
    if (isUndefined(model[idx]) || !(model[idx] && model[idx].index === idx)) {
        for (var i = 0; i <= idx; i++) {
            if (model && model[i]) {
                diff = model[i].index - i;
                if (diff > 0) {
                    model.forEach(function (value, index) {
                        if (value && value.index) {
                            prevIdx = value.index;
                            j = 1;
                        }
                        if (value && !value.index && index !== 0) {
                            value.index = prevIdx + j;
                        }
                        j++;
                    });
                    while (diff--) {
                        model.splice(i, 0, null);
                    }
                    i += diff;
                }
            }
            else if (model) {
                model[i] = null;
            }
            else {
                model = [];
            }
        }
    }
    return model[idx];
}
/**

 */
export function processIdx(model, isSheet, context) {
    var j;
    var diff;
    var cnt;
    var len = model.length;
    for (var i = 0; i < len; i++) {
        cnt = diff = model[i].index - i;
        model[i].index = null;
        if (diff > 0) {
            j = 0;
            while (diff--) {
                if (isSheet) {
                    context.createSheet(i + j);
                    j++;
                }
                else {
                    model.splice(i, 0, null);
                }
            }
            i += cnt;
            len += cnt;
        }
        if (isSheet) {
            model[i].id = getMaxSheetId(context.sheets);
            if (!model[i].name) {
                model[i].name = 'Sheet' + getSheetNameCount(context);
            }
        }
    }
    if (isSheet) {
        context.setProperties({ 'sheets': context.sheets }, true);
    }
}
/**

 */
export function clearRange(context, address, sheetIdx, valueOnly) {
    var sheet = getSheet(context, sheetIdx - 1);
    var range = getIndexesFromAddress(address);
    var sRIdx = range[0];
    var eRIdx = range[2];
    var sCIdx;
    var eCIdx;
    for (sRIdx; sRIdx <= eRIdx; sRIdx++) {
        sCIdx = range[1];
        eCIdx = range[3];
        for (sCIdx; sCIdx <= eCIdx; sCIdx++) {
            var cell = getCell(sRIdx, sCIdx, sheet);
            if (!isNullOrUndefined(cell) && valueOnly) {
                delete cell.value;
                if (!isNullOrUndefined(cell.formula)) {
                    delete cell.formula;
                }
            }
        }
    }
}
