import { contentReady } from '../../common/base/constant';
import * as events from '../../common/base/constant';
import { DrillThroughDialog } from '../../common/popups/drillthrough-dialog';
import { EventHandler, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * `DrillThrough` module.
 */
var DrillThrough = /** @class */ (function () {
    /**
     * Constructor.

     */
    function DrillThrough(parent) {
        this.parent = parent;
        this.drillThroughDialog = new DrillThroughDialog(this.parent);
        this.addInternalEvents();
    }
    /**
     * It returns the Module name.
     * @returns string

     */
    DrillThrough.prototype.getModuleName = function () {
        return 'drillthrough';
    };
    DrillThrough.prototype.addInternalEvents = function () {
        this.parent.on(contentReady, this.wireEvents, this);
    };
    DrillThrough.prototype.wireEvents = function () {
        this.unWireEvents();
        EventHandler.add(this.parent.element, 'dblclick', this.mouseClickHandler, this);
    };
    DrillThrough.prototype.unWireEvents = function () {
        EventHandler.remove(this.parent.element, 'dblclick', this.mouseClickHandler);
    };
    DrillThrough.prototype.mouseClickHandler = function (e) {
        var target = e.target;
        var ele = null;
        if (target.classList.contains('e-stackedheadercelldiv') || target.classList.contains('e-cellvalue') ||
            target.classList.contains('e-headercelldiv')) {
            ele = target.parentElement;
        }
        else if (target.classList.contains('e-headercell') || target.classList.contains('e-rowcell')) {
            ele = target;
        }
        else if (target.classList.contains('e-headertext')) {
            ele = target.parentElement.parentElement;
        }
        if (ele) {
            if (this.parent.allowDrillThrough && ele.classList.contains('e-valuescontent') || this.parent.editSettings.allowEditing) {
                this.executeDrillThrough(ele);
            }
        }
    };
    DrillThrough.prototype.executeDrillThrough = function (ele) {
        var colIndex = Number(ele.getAttribute('aria-colindex'));
        var rowIndex = Number(ele.getAttribute('index'));
        var pivotValue = this.parent.pivotValues[rowIndex][colIndex];
        var engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        var valueCaption = '';
        var aggType = '';
        var rawData = [];
        if (pivotValue.rowHeaders !== undefined && pivotValue.columnHeaders !== undefined && !isNullOrUndefined(pivotValue.value)) {
            if (this.parent.dataType === 'olap') {
                var tupleInfo = void 0;
                if (this.parent.dataSourceSettings.valueAxis === 'row') {
                    tupleInfo = engine.tupRowInfo[pivotValue.rowOrdinal];
                }
                else {
                    tupleInfo = engine.tupColumnInfo[pivotValue.colOrdinal];
                }
                var measureName = tupleInfo ?
                    engine.getUniqueName(tupleInfo.measureName) : pivotValue.actualText;
                if (engine.fieldList[measureName] && engine.fieldList[measureName].isCalculatedField) {
                    this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), this.parent.localeObj.getConstant('drillError'));
                    return;
                }
                valueCaption = engine.fieldList[measureName].caption;
                aggType = engine.fieldList[measureName].aggregateType;
                this.parent.olapEngineModule.getDrillThroughData(pivotValue, this.parent.maxRowsInDrillThrough);
                try {
                    rawData = JSON.parse(engine.gridJSON);
                }
                catch (exception) {
                    this.parent.pivotCommon.errorDialog.createErrorDialog(this.parent.localeObj.getConstant('error'), engine.gridJSON);
                    return;
                }
            }
            else {
                valueCaption = engine.fieldList[pivotValue.actualText.toString()] ?
                    engine.fieldList[pivotValue.actualText.toString()].caption : pivotValue.actualText.toString();
                aggType = engine.fieldList[pivotValue.actualText] ? engine.fieldList[pivotValue.actualText].aggregateType : '';
                var indexArray = Object.keys(pivotValue.indexObject);
                for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                    var index = indexArray_1[_i];
                    rawData.push(this.parent.engineModule.data[Number(index)]);
                }
            }
            var valuetText = aggType === 'CalculatedField' ? valueCaption.toString() :
                aggType !== '' ? (aggType + ' ' + this.parent.localeObj.getConstant('of') + ' ' + valueCaption) : valueCaption;
            var eventArgs = {
                currentTarget: ele,
                currentCell: pivotValue,
                rawData: rawData,
                rowHeaders: pivotValue.rowHeaders === '' ? '' : pivotValue.rowHeaders.toString().split('.').join(' - '),
                columnHeaders: pivotValue.columnHeaders === '' ? '' : pivotValue.columnHeaders.toString().split('.').join(' - '),
                value: valuetText + '(' + pivotValue.formattedText + ')'
            };
            this.parent.trigger(events.drillThrough, eventArgs);
            this.drillThroughDialog.showDrillThroughDialog(eventArgs);
        }
    };
    return DrillThrough;
}());
export { DrillThrough };
