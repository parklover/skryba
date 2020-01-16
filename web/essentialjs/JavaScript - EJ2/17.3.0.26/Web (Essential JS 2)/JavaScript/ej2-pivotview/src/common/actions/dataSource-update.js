import * as events from '../../common/base/constant';
import { isBlazor } from '@syncfusion/ej2-base';
/**
 * `DataSourceUpdate` module is used to update the dataSource.
 */
var DataSourceUpdate = /** @class */ (function () {
    /**
     * Constructor for the dialog action.

     */
    function DataSourceUpdate(parent) {
        this.parent = parent;
    }
    /**
     * Updates the dataSource by adding the given field along with field dropped position to the dataSource.
     * @param  {string} fieldName - Defines dropped field name to update dataSource.
     * @param  {string} droppedClass -  Defines dropped field axis name to update dataSource.
     * @param  {number} fieldCaption - Defines dropped position to the axis based on field position.
     * @method updateDataSource
     * @return {void}

     */
    DataSourceUpdate.prototype.updateDataSource = function (fieldName, droppedClass, droppedPosition) {
        var _this = this;
        var dataSourceItem;
        if (this.control && this.btnElement && this.btnElement.getAttribute('isvalue') === 'true') {
            switch (droppedClass) {
                case '':
                    this.control.setProperties({ dataSourceSettings: { values: [] } }, true);
                    break;
                case 'rows':
                    this.control.setProperties({ dataSourceSettings: { valueAxis: 'row' } }, true);
                    break;
                case 'columns':
                    this.control.setProperties({ dataSourceSettings: { valueAxis: 'column' } }, true);
                    break;
            }
        }
        else {
            dataSourceItem = this.removeFieldFromReport(fieldName.toString());
            dataSourceItem = dataSourceItem ? dataSourceItem : this.getNewField(fieldName.toString());
            if (dataSourceItem.type === 'CalculatedField' && droppedClass !== '') {
                droppedClass = 'values';
            }
        }
        if (this.parent.dataType === 'olap') {
            dataSourceItem = this.removeFieldFromReport(fieldName.toString());
            dataSourceItem = dataSourceItem ? dataSourceItem : this.getNewField(fieldName.toString());
            if (this.parent.dataSourceSettings.values.length === 0) {
                this.removeFieldFromReport('[measures]');
            }
            if (dataSourceItem.type === 'CalculatedField' && droppedClass !== '') {
                droppedClass = 'values';
            }
        }
        if (this.control) {
            var eventArgs_1 = {
                'droppedField': dataSourceItem, 'dataSourceSettings': this.parent.dataSourceSettings, 'droppedAxis': droppedClass
            };
            /* tslint:disable */
            var dataSourceUpdate_1 = this;
            this.control.trigger(events.onFieldDropped, eventArgs_1, function (observedArgs) {
                eventArgs_1 = observedArgs;
                if (dataSourceItem) {
                    dataSourceItem = observedArgs.droppedField;
                    switch (droppedClass) {
                        case 'filters':
                            droppedPosition !== -1 ?
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.filters.splice(droppedPosition, 0, dataSourceItem) : _this.parent.dataSourceSettings.filters.splice(droppedPosition, 0, dataSourceItem)) :
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.filters.push(dataSourceItem) : _this.parent.dataSourceSettings.filters.push(dataSourceItem));
                            break;
                        case 'rows':
                            droppedPosition !== -1 ?
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.rows.splice(droppedPosition, 0, dataSourceItem) : _this.parent.dataSourceSettings.rows.splice(droppedPosition, 0, dataSourceItem)) :
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.rows.push(dataSourceItem) : _this.parent.dataSourceSettings.rows.push(dataSourceItem));
                            break;
                        case 'columns':
                            droppedPosition !== -1 ?
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.columns.splice(droppedPosition, 0, dataSourceItem) : _this.parent.dataSourceSettings.columns.splice(droppedPosition, 0, dataSourceItem)) :
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.columns.push(dataSourceItem) : _this.parent.dataSourceSettings.columns.push(dataSourceItem));
                            break;
                        case 'values':
                            droppedPosition !== -1 ?
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.values.splice(droppedPosition, 0, dataSourceItem) : _this.parent.dataSourceSettings.values.splice(droppedPosition, 0, dataSourceItem)) :
                                (isBlazor() ? dataSourceUpdate_1.parent.dataSourceSettings.values.push(dataSourceItem) : _this.parent.dataSourceSettings.values.push(dataSourceItem));
                            if (isBlazor()) {
                                if (dataSourceUpdate_1.parent.dataType === 'olap' && !dataSourceUpdate_1.parent.engineModule.isMeasureAvail) {
                                    var measureField = {
                                        name: '[Measures]', caption: 'Measures', baseField: undefined, baseItem: undefined
                                    };
                                    var fieldAxis = dataSourceUpdate_1.parent.dataSourceSettings.valueAxis === 'row' ?
                                        dataSourceUpdate_1.parent.dataSourceSettings.rows : dataSourceUpdate_1.parent.dataSourceSettings.columns;
                                    fieldAxis.push(measureField);
                                }
                            }
                            else {
                                if (_this.parent.dataType === 'olap' && !_this.parent.engineModule.isMeasureAvail) {
                                    var measureField = {
                                        name: '[Measures]', caption: 'Measures', baseField: undefined, baseItem: undefined
                                    };
                                    var fieldAxis = _this.parent.dataSourceSettings.valueAxis === 'row' ?
                                        _this.parent.dataSourceSettings.rows : _this.parent.dataSourceSettings.columns;
                                    fieldAxis.push(measureField);
                                }
                            }
                            break;
                    }
                    if (isBlazor()) {
                        _this.pivotButton.updateDataSource();
                        _this.pivotButton.axisField.render();
                    }
                }
            });
        }
    };
    /* tslint:enable */
    /**
     * Updates the dataSource by removing the given field from the dataSource.
     * @param  {string} fieldName - Defines dropped field name to remove dataSource.
     * @method removeFieldFromReport
     * @return {void}

     */
    DataSourceUpdate.prototype.removeFieldFromReport = function (fieldName) {
        var dataSourceItem;
        var isDataSource = false;
        var rows = this.parent.dataSourceSettings.rows;
        var columns = this.parent.dataSourceSettings.columns;
        var values = this.parent.dataSourceSettings.values;
        var filters = this.parent.dataSourceSettings.filters;
        var fields = [rows, columns, values, filters];
        var field = this.parent.engineModule.fieldList[fieldName];
        for (var len = 0, lnt = fields.length; len < lnt; len++) {
            if (!isDataSource && fields[len]) {
                for (var i = 0, n = fields[len].length; i < n; i++) {
                    if (fields[len][i].name === fieldName || (this.parent.dataType === 'olap' &&
                        fields[len][i].name.toLowerCase() === '[measures]' && fields[len][i].name.toLowerCase() === fieldName)) {
                        dataSourceItem = fields[len][i].properties ?
                            fields[len][i].properties : fields[len][i];
                        dataSourceItem.type = (field && field.type === 'number') ? dataSourceItem.type :
                            'Count';
                        fields[len].splice(i, 1);
                        if (this.parent.dataType === 'olap') {
                            var engineModule = this.parent.engineModule;
                            if (engineModule && engineModule.fieldList[fieldName]) {
                                engineModule.fieldList[fieldName].currrentMembers = {};
                                engineModule.fieldList[fieldName].searchMembers = [];
                            }
                        }
                        isDataSource = true;
                        break;
                    }
                }
            }
        }
        return dataSourceItem;
    };
    /**
     * Creates new field object given field name from the field list data.
     * @param  {string} fieldName - Defines dropped field name to add dataSource.
     * @method getNewField
     * @return {void}

     */
    DataSourceUpdate.prototype.getNewField = function (fieldName) {
        var newField;
        if (this.parent.dataType === 'olap') {
            var field = this.parent.engineModule.fieldList[fieldName];
            newField = {
                name: fieldName,
                caption: field.caption,
                isNamedSet: field.isNamedSets,
                isCalculatedField: field.isCalculatedField,
                type: (field.aggregateType === undefined ? field.type === 'number' ? 'Sum' :
                    'Count' : field.aggregateType),
            };
        }
        else {
            var field = this.parent.engineModule.fieldList[fieldName];
            newField = {
                name: fieldName,
                caption: field.caption,
                type: (field.aggregateType === undefined ? field.type === 'number' ? 'Sum' :
                    'Count' : field.aggregateType),
                showNoDataItems: field.showNoDataItems,
                baseField: field.baseField,
                baseItem: field.baseItem,
            };
        }
        return newField;
    };
    return DataSourceUpdate;
}());
export { DataSourceUpdate };
