import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { Chart, ColumnSeries, LineSeries, Legend, Tooltip, Category, AreaSeries, StepLineSeries, SplineSeries, SplineAreaSeries, MultiColoredLineSeries, RangeAreaSeries, StackingAreaSeries, StepAreaSeries, MultiColoredAreaSeries, StackingColumnSeries, RangeColumnSeries, BarSeries, StackingBarSeries, ScatterSeries, BubbleSeries, PolarSeries, RadarSeries, MultiLevelLabel, ScrollBar, Zoom, ParetoSeries, Export, Crosshair } from '@syncfusion/ej2-charts';
import { createElement, remove, isNullOrUndefined, isBlazor } from '@syncfusion/ej2-base';
import { showSpinner } from '@syncfusion/ej2-popups';
import { PivotUtil } from '../../base/util';
var PivotChart = /** @class */ (function () {
    function PivotChart() {
        this.headerColl = {};
        this.maxLevel = 0;
        this.columnGroupObject = {};
        this.fieldPosition = [];
        this.measurePos = -1;
        this.measuresNames = {};
    }
    /**
     * Get component name.
     * @returns string
     * @private
     */
    PivotChart.prototype.getModuleName = function () {
        return 'pivotchart';
    };
    /* tslint:disable */
    PivotChart.prototype.loadChart = function (parent, chartSettings) {
        this.parent = parent;
        this.measuresNames = {};
        this.engineModule = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.dataSourceSettings = this.parent.dataSourceSettings;
        this.chartSettings = chartSettings;
        var isDataAvail = parent.dataType === 'olap' ?
            (parent.olapEngineModule.tupColumnInfo.length > 0 && parent.olapEngineModule.tupRowInfo.length > 0 &&
                (!isNullOrUndefined(parent.olapEngineModule.colMeasurePos) || !isNullOrUndefined(parent.olapEngineModule.rowMeasurePos)))
            : parent.dataSourceSettings.values.length > 0;
        if (isDataAvail) {
            if (this.chartSettings.enableMultiAxis) {
                this.measureList = this.dataSourceSettings.values.map(function (item) { return item.name; });
            }
            else {
                this.measureList = [chartSettings.value === '' ? this.dataSourceSettings.values[0].name : chartSettings.value];
            }
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var field = _a[_i];
                var fieldName = field.name.replace(/[^A-Z0-9]+/ig, '_');
                this.measuresNames[field.name] = fieldName;
                this.measuresNames[fieldName] = field.name;
            }
        }
        else if (this.parent.chart) {
            this.parent.chart.series = [];
            this.parent.chart.rows = [];
            this.parent.chart.primaryXAxis.title = '';
            this.parent.chart.primaryYAxis.title = '';
            this.parent.chart.primaryXAxis.multiLevelLabels = [];
            this.parent.chart.primaryYAxis.multiLevelLabels = [];
            if (this.parent.chart.axes.length > 0) {
                this.parent.chart.axes[0].title = '';
            }
            this.parent.chart.primaryXAxis.zoomFactor = 1;
            this.parent.chart.refresh();
            return;
        }
        else {
            this.parent.notify(events.contentReady, {});
            this.parent.chart.refresh();
            return;
        }
        this.columnGroupObject = {};
        var pivotValues = this.engineModule.pivotValues;
        this.currentMeasure = chartSettings.enableMultiAxis ? this.measureList[0] :
            (((chartSettings.value === '' || this.dataSourceSettings.values.filter(function (item) {
                return item.name === chartSettings.value;
            }).length === 0) && this.dataSourceSettings.values.length > 0) ? this.dataSourceSettings.values[0].name : chartSettings.value);
        var totColIndex = this.getColumnTotalIndex(pivotValues);
        var rKeys = Object.keys(pivotValues);
        var prevLevel;
        var firstLevelUName;
        var levelCollection = {};
        var prevCell;
        var integratedLevel = 0;
        var indexCount = -0.5;
        this.headerColl = {};
        this.maxLevel = 0;
        var levelPos = {};
        var lastHierarchy = '';
        var lastDimension = '';
        var memberCell;
        if (this.parent.dataType === 'olap') {
            levelPos = this.groupHierarchyWithLevels(pivotValues);
            lastHierarchy = this.fieldPosition[this.fieldPosition.length - 1];
            lastDimension = (this.measurePos === (this.fieldPosition.length - 1) && this.fieldPosition.length > 1) ?
                this.fieldPosition[this.fieldPosition.length - 2] : lastHierarchy;
        }
        for (var _b = 0, rKeys_1 = rKeys; _b < rKeys_1.length; _b++) {
            var rKey = rKeys_1[_b];
            var rowIndex = Number(rKey);
            if (pivotValues[rowIndex][0] && pivotValues[rowIndex][0].axis === 'row' &&
                (this.dataSourceSettings.rows.length === 0 ? true : pivotValues[rowIndex][0].type !== 'grand sum')) {
                var firstRowCell = pivotValues[rowIndex][0];
                var tupInfo = this.parent.dataType === 'olap' ?
                    this.engineModule.tupRowInfo[firstRowCell.ordinal] : undefined;
                var fieldPos = -1;
                var currrentLevel = firstRowCell.level;
                if (this.parent.dataType === 'olap') {
                    fieldPos = tupInfo.uNameCollection.split('::').length - 1;
                    if (firstRowCell.memberType !== 3 && (tupInfo.measureName ?
                        tupInfo.measureName === this.dataSourceSettings.values[0].name : true)) {
                        firstLevelUName = firstLevelUName === undefined ? firstRowCell.levelUniqueName : firstLevelUName;
                        integratedLevel = firstLevelUName === firstRowCell.levelUniqueName ? 0 : integratedLevel;
                        levelCollection = integratedLevel === 0 ? {} : levelCollection;
                        integratedLevel = (prevCell && firstLevelUName !== firstRowCell.levelUniqueName) ?
                            (prevCell.hierarchy === firstRowCell.hierarchy ?
                                (integratedLevel + (firstRowCell.level - prevCell.level)) :
                                (isNullOrUndefined(levelCollection[firstRowCell.levelUniqueName]) ? (levelPos[firstRowCell.hierarchy].start) :
                                    levelCollection[firstRowCell.levelUniqueName])) : integratedLevel;
                        levelCollection[firstRowCell.levelUniqueName] = integratedLevel;
                        currrentLevel = integratedLevel;
                        indexCount += (prevCell && lastDimension === prevCell.hierarchy && !prevCell.isDrilled) ? 1 : 0;
                        prevLevel = integratedLevel;
                        prevCell = firstRowCell;
                    }
                }
                else if (firstRowCell.type !== 'value') {
                    if (!(prevLevel === undefined || prevLevel < currrentLevel)) {
                        indexCount++;
                    }
                    prevLevel = currrentLevel;
                }
                this.maxLevel = currrentLevel > this.maxLevel ? currrentLevel : this.maxLevel;
                var name_1 = this.parent.dataType === 'olap' ? firstRowCell.formattedText :
                    (firstRowCell.actualText ? firstRowCell.actualText.toString() : firstRowCell.formattedText.toString());
                var text = firstRowCell.formattedText ? firstRowCell.formattedText.toString() : name_1;
                var caption = (firstRowCell.hasChild && !firstRowCell.isNamedSet) ?
                    ((firstRowCell.isDrilled ? ' - ' : ' + ') + text) : text;
                var levelName = tupInfo ? tupInfo.uNameCollection : firstRowCell.valueSort['levelName'].toString();
                var cellInfo = {
                    name: name_1,
                    text: caption,
                    hasChild: firstRowCell.hasChild,
                    isDrilled: firstRowCell.isDrilled,
                    levelName: levelName,
                    level: currrentLevel,
                    fieldName: firstRowCell.valueSort['axis'] ? firstRowCell.valueSort['axis'].toString() : '',
                    rowIndex: rowIndex,
                    colIndex: 0,
                    cell: firstRowCell
                };
                if (this.parent.dataType === 'olap' ? firstRowCell.memberType !== 3 : firstRowCell.type !== 'value') {
                    if (this.headerColl[indexCount]) {
                        this.headerColl[indexCount][currrentLevel] = cellInfo;
                    }
                    else {
                        this.headerColl[indexCount] = {};
                        this.headerColl[indexCount][currrentLevel] = cellInfo;
                    }
                }
                var rows = pivotValues[rowIndex];
                var cKeys = Object.keys(rows);
                var prevMemberCell = void 0;
                if (this.parent.dataType === 'olap') {
                    memberCell = firstRowCell.memberType !== 3 ? firstRowCell : memberCell;
                }
                else {
                    memberCell = firstRowCell.type !== 'value' ? firstRowCell : memberCell;
                }
                for (var _c = 0, cKeys_1 = cKeys; _c < cKeys_1.length; _c++) {
                    var cKey = cKeys_1[_c];
                    var cellIndex = Number(cKey);
                    var cell = pivotValues[rowIndex][cellIndex];
                    var measureAllow = cell.rowHeaders === '' ? this.dataSourceSettings.rows.length === 0 : true;
                    var actualText = (this.parent.dataType === 'olap' && tupInfo && tupInfo.measureName) ?
                        tupInfo.measureName : cell.actualText;
                    if (!totColIndex[cell.colIndex] && cell.axis === 'value' && firstRowCell.type !== 'header' &&
                        actualText !== '' && (chartSettings.enableMultiAxis ? true : actualText === this.currentMeasure)) {
                        if (this.parent.dataType === 'olap' ? (lastHierarchy === firstRowCell.hierarchy ?
                            ((firstRowCell.memberType === 3 && prevMemberCell) ?
                                (fieldPos === this.measurePos ? prevMemberCell.isDrilled : true) : firstRowCell.isDrilled) : true)
                            : (((firstRowCell.type === 'value' && prevMemberCell) ?
                                prevMemberCell.members.length > 0 : firstRowCell.members.length > 0) || !measureAllow)) {
                            break;
                        }
                        var colHeaders = this.parent.dataType === 'olap' ? cell.columnHeaders.toString().split(/~~|::/).join(' - ')
                            : cell.columnHeaders.toString().split('.').join(' - ');
                        var rowHeaders = this.parent.dataType === 'olap' ? cell.rowHeaders.toString().split(/~~|::/).join(' - ')
                            : cell.rowHeaders.toString().split('.').join(' - ');
                        var columnSeries = colHeaders + ' | ' + actualText;
                        var yValue = (this.parent.dataType === 'pivot' ? (this.engineModule.aggregatedValueMatrix[rowIndex] &&
                            !isNullOrUndefined(this.engineModule.aggregatedValueMatrix[rowIndex][cellIndex])) ?
                            Number(this.engineModule.aggregatedValueMatrix[rowIndex][cellIndex]) : Number(cell.value) : Number(cell.value));
                        if (this.columnGroupObject[columnSeries]) {
                            this.columnGroupObject[columnSeries].push({
                                x: this.dataSourceSettings.rows.length === 0 ? firstRowCell.formattedText : rowHeaders,
                                y: yValue
                            });
                        }
                        else {
                            this.columnGroupObject[columnSeries] = [{
                                    x: this.dataSourceSettings.rows.length === 0 ? firstRowCell.formattedText : rowHeaders,
                                    y: yValue
                                }];
                        }
                    }
                    prevMemberCell = memberCell;
                }
            }
        }
        this.refreshChart();
    };
    /**
     * Refreshing chart based on the updated chartSettings.
     * @returns void
     */
    PivotChart.prototype.refreshChart = function () {
        this.chartSeries = [];
        var columnKeys = Object.keys(this.columnGroupObject);
        this.persistSettings = JSON.parse(this.parent.getPersistData()).chartSettings;
        for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
            var key = columnKeys_1[_i];
            var currentSeries = {};
            currentSeries = this.persistSettings.chartSeries ? this.frameObjectWithKeys(this.persistSettings.chartSeries) : currentSeries;
            currentSeries.dataSource = this.columnGroupObject[key];
            currentSeries.xName = 'x';
            currentSeries.yName = 'y';
            currentSeries.name = this.chartSettings.enableMultiAxis ? key : key.split(' | ')[0];
            if (!(this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar')) {
                var measure = key.split(' | ')[1];
                currentSeries.yAxisName = this.measuresNames[measure] ? this.measuresNames[measure] : measure;
            }
            this.chartSeries = this.chartSeries.concat(currentSeries);
        }
        var seriesEvent = { series: this.chartSeries, cancel: false };
        this.parent.trigger(events.chartSeriesCreated, seriesEvent);
        if (!seriesEvent.cancel) {
            this.bindChart();
        }
        else {
            if (this.element) {
                remove(this.element);
            }
            this.parent.notify(events.contentReady, {});
        }
    };
    PivotChart.prototype.frameObjectWithKeys = function (series) {
        var keys = Object.keys(series);
        var keyPos = 0;
        var framedSeries = {};
        while (keyPos < keys.length) {
            framedSeries[keys[keyPos]] = series[keys[keyPos]];
            keyPos++;
        }
        return framedSeries;
    };
    PivotChart.prototype.bindChart = function () {
        var currentXAxis = this.configXAxis();
        var currentTooltipSettings = this.configTooltipSettings();
        var currentLegendSettings = this.configLegendSettings();
        var currentZoomSettings = this.configZoomSettings();
        var axesWithRows = this.frameAxesWithRows();
        var type = this.chartSettings.chartSeries.type;
        if (this.parent.displayOption.view === 'Both') {
            this.element = this.parent.displayOption.primary === 'Chart' ? (this.parent.element.insertBefore((!this.element ? (createElement('div', {
                className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
            })) : this.element), this.parent.element.querySelector('.' + cls.GRID_CLASS))) :
                (this.parent.element.appendChild(!this.element ? (createElement('div', {
                    className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
                })) : this.element));
        }
        else if (!this.element) {
            this.element = this.parent.element.appendChild(createElement('div', {
                className: cls.PIVOTCHART, id: this.parent.element.id + '_chart'
            }));
        }
        if (!(this.parent.chart && this.parent.chart.element && this.parent.element.querySelector('.e-chart'))) {
            if (this.parent.showGroupingBar) {
                this.element.style.minWidth = '400px !important';
            }
            else {
                this.element.style.minWidth = '310px !important';
            }
            var width = this.parent.width.toString();
            if (this.parent.showToolbar && this.parent.grid) {
                width = this.parent.getGridWidthAsNumber().toString();
            }
            var height = this.parent.getHeightAsNumber();
            if (isNullOrUndefined(height)) {
                height = "auto";
            }
            Chart.Inject(ColumnSeries, StackingColumnSeries, RangeColumnSeries, BarSeries, StackingBarSeries, ScatterSeries, BubbleSeries, LineSeries, StepLineSeries, SplineSeries, SplineAreaSeries, MultiColoredLineSeries, PolarSeries, RadarSeries, AreaSeries, RangeAreaSeries, StackingAreaSeries, StepAreaSeries, MultiColoredAreaSeries, ParetoSeries, Legend, Tooltip, Category, MultiLevelLabel, ScrollBar, Zoom, Export, Crosshair);
            this.parent.chart = new Chart({
                series: this.chartSeries.length > 0 ? this.chartSeries : [{}],
                legendSettings: currentLegendSettings,
                tooltip: currentTooltipSettings,
                zoomSettings: currentZoomSettings,
                axes: (type === 'Polar' || type === 'Radar') ? [] : axesWithRows.axes,
                rows: (type === 'Polar' || type === 'Radar') ? [{}] :
                    (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' &&
                        this.chartSettings.enableMultiAxis) ? [{ height: '100%' }] : axesWithRows.rows,
                columns: (type === 'Polar' || type === 'Radar') ? [{}] :
                    (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' &&
                        this.chartSettings.enableMultiAxis) ? axesWithRows.columns : [{ width: '100%' }],
                primaryYAxis: (type === 'Polar' || type === 'Radar') ? axesWithRows.axes[0] : { visible: false },
                primaryXAxis: currentXAxis,
                width: width,
                height: height.toString(),
                title: this.chartSettings.title,
                titleStyle: this.chartSettings.titleStyle,
                subTitle: this.chartSettings.subTitle,
                subTitleStyle: this.chartSettings.subTitleStyle,
                margin: this.chartSettings.margin,
                border: this.chartSettings.border,
                background: this.chartSettings.background,
                chartArea: this.chartSettings.chartArea,
                palettes: this.chartSettings.palettes,
                theme: this.chartSettings.theme,
                crosshair: this.chartSettings.crosshair,
                selectionMode: this.chartSettings.selectionMode,
                isMultiSelect: this.chartSettings.isMultiSelect,
                enableExport: this.chartSettings.enableExport,
                selectedDataIndexes: this.chartSettings.selectedDataIndexes,
                isTransposed: this.chartSettings.isTransposed,
                enableAnimation: this.chartSettings.enableAnimation,
                useGroupingSeparator: this.chartSettings.useGroupingSeparator,
                description: this.chartSettings.description,
                tabIndex: this.chartSettings.tabIndex,
                locale: this.parent.locale,
                enableSideBySidePlacement: this.chartSettings.enableSideBySidePlacement,
                beforePrint: this.chartSettings.beforePrint ? this.chartSettings.beforePrint.bind(this) : undefined,
                animationComplete: this.chartSettings.animationComplete ? this.chartSettings.animationComplete.bind(this) : undefined,
                legendRender: this.chartSettings.legendRender ? this.chartSettings.legendRender.bind(this) : undefined,
                textRender: this.chartSettings.textRender ? this.chartSettings.textRender.bind(this) : undefined,
                pointRender: this.chartSettings.pointRender ? this.chartSettings.pointRender.bind(this) : undefined,
                seriesRender: this.chartSettings.seriesRender ? this.chartSettings.seriesRender.bind(this) : undefined,
                chartMouseMove: this.chartSettings.chartMouseMove ? this.chartSettings.chartMouseMove.bind(this) : undefined,
                chartMouseClick: this.chartSettings.chartMouseClick ? this.chartSettings.chartMouseClick.bind(this) : undefined,
                pointMove: this.chartSettings.pointMove ? this.chartSettings.pointMove.bind(this) : undefined,
                pointClick: this.chartSettings.pointClick ? this.chartSettings.pointClick.bind(this) : undefined,
                chartMouseLeave: this.chartSettings.chartMouseLeave ? this.chartSettings.chartMouseLeave.bind(this) : undefined,
                chartMouseDown: this.chartSettings.chartMouseDown ? this.chartSettings.chartMouseDown.bind(this) : undefined,
                chartMouseUp: this.chartSettings.chartMouseUp ? this.chartSettings.chartMouseUp.bind(this) : undefined,
                dragComplete: this.chartSettings.dragComplete ? this.chartSettings.dragComplete.bind(this) : undefined,
                zoomComplete: this.chartSettings.zoomComplete ? this.chartSettings.zoomComplete.bind(this) : undefined,
                scrollStart: this.chartSettings.scrollStart ? this.chartSettings.scrollStart.bind(this) : undefined,
                scrollEnd: this.chartSettings.scrollEnd ? this.chartSettings.scrollEnd.bind(this) : undefined,
                scrollChanged: this.chartSettings.scrollChanged ? this.chartSettings.scrollChanged.bind(this) : undefined,
                tooltipRender: this.tooltipRender.bind(this),
                loaded: this.loaded.bind(this),
                load: this.load.bind(this),
                resized: this.resized.bind(this),
                axisLabelRender: this.axisLabelRender.bind(this),
                multiLevelLabelClick: this.multiLevelLabelClick.bind(this),
            });
            this.parent.chart.isStringTemplate = true;
            this.parent.chart.appendTo('#' + this.parent.element.id + '_chart');
        }
        else {
            this.parent.chart.series = this.chartSeries;
            this.parent.chart.primaryXAxis = currentXAxis;
            if (type === 'Polar' || type === 'Radar') {
                this.parent.chart.primaryYAxis.visible = true;
                this.parent.chart.primaryYAxis = axesWithRows.axes[0];
                this.parent.chart.axes = [];
                this.parent.chart.rows = [{}];
            }
            else {
                this.parent.chart.primaryYAxis.visible = false;
                this.parent.chart.axes = axesWithRows.axes;
                if (type === 'Bar' || type === 'StackingBar' || type === 'StackingBar100' &&
                    this.chartSettings.enableMultiAxis) {
                    this.parent.chart.rows = [{ height: '100%' }];
                    this.parent.chart.columns = axesWithRows.columns;
                }
                else {
                    this.parent.chart.rows = axesWithRows.rows;
                    this.parent.chart.columns = [{ width: '100%' }];
                }
            }
            this.parent.chart.refresh();
        }
    };
    PivotChart.prototype.frameAxesWithRows = function () {
        var axes = [];
        var rows = [];
        var columns = [];
        var percentChart = this.persistSettings.chartSeries && (this.persistSettings.chartSeries.type === 'StackingColumn100' ||
            this.persistSettings.chartSeries.type === 'StackingBar100' ||
            this.persistSettings.chartSeries.type === 'StackingArea100');
        var percentAggregateTypes = ['PercentageOfGrandTotal', 'PercentageOfColumnTotal', 'PercentageOfRowTotal',
            'PercentageOfDifferenceFrom', 'PercentageOfParentRowTotal', 'PercentageOfParentColumnTotal', 'PercentageOfParentTotal'];
        if (this.chartSettings.enableMultiAxis) {
            var valCnt = 0;
            var divider = (100 / this.dataSourceSettings.values.length) + '%';
            for (var _i = 0, _a = this.dataSourceSettings.values; _i < _a.length; _i++) {
                var item = _a[_i];
                var measureField = this.engineModule.fieldList[item.name];
                var measureAggregatedName = (this.parent.dataType === 'olap' ? '' : (this.parent.localeObj.getConstant(measureField.aggregateType) + ' ' +
                    this.parent.localeObj.getConstant('of') + ' ')) + measureField.caption;
                // let formatSetting: IFormatSettings = this.dataSourceSettings.formatSettings.filter((itm: IFormatSettings) => {
                //     return itm.name === item.name;
                // })[0];
                var formatSetting = void 0;
                for (var _b = 0, _c = this.dataSourceSettings.formatSettings; _b < _c.length; _b++) {
                    var field = _c[_b];
                    if (field.name === item.name) {
                        formatSetting = field;
                        break;
                    }
                }
                var format = PivotUtil.inArray(measureField.aggregateType, percentAggregateTypes) !== -1 ? 'P2' : (formatSetting ?
                    (formatSetting.format.toLowerCase().match(/n|p|c/) === null ? 'N' : formatSetting.format) : this.parent.dataType === 'olap' ? this.getFormat(measureField.formatString) : 'N');
                var resFormat = (this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar') ? true : false;
                var currentYAxis = {};
                currentYAxis = this.persistSettings.primaryYAxis ?
                    this.frameObjectWithKeys(this.persistSettings.primaryYAxis) : currentYAxis;
                currentYAxis.labelFormat = currentYAxis.labelFormat ?
                    currentYAxis.labelFormat : (percentChart ? '' : (!resFormat ? format : 'N'));
                currentYAxis.title = currentYAxis.title ? currentYAxis.title : measureAggregatedName;
                currentYAxis.plotOffset = currentYAxis.plotOffset ? currentYAxis.plotOffset : (valCnt % 2 !== 0 ?
                    this.chartSettings.chartSeries.type === 'Bar' || this.chartSettings.chartSeries.type === 'StackingBar' ||
                        this.chartSettings.chartSeries.type === 'StackingBar100' ? 50 : 30 : 0);
                currentYAxis.rowIndex = valCnt;
                currentYAxis.columnIndex = valCnt;
                if (!resFormat) {
                    currentYAxis.name = this.measuresNames[item.name] ? this.measuresNames[item.name] : item.name;
                }
                axes = axes.concat(currentYAxis);
                rows.push({ height: divider });
                columns.push({ width: divider });
                valCnt++;
            }
        }
        else {
            var measureField = this.engineModule.fieldList[this.currentMeasure];
            var measureAggregatedName = (this.parent.dataType === 'olap' ? '' :
                (this.parent.localeObj.getConstant(measureField.aggregateType) + ' ' +
                    this.parent.localeObj.getConstant('of') + ' ')) + measureField.caption;
            // let formatSetting: IFormatSettings = this.dataSourceSettings.formatSettings.filter((item: IFormatSettings) => {
            //     return item.name === this.currentMeasure;
            // })[0];
            var formatSetting = void 0;
            for (var _d = 0, _e = this.dataSourceSettings.formatSettings; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.name === this.currentMeasure) {
                    formatSetting = item;
                    break;
                }
            }
            var currentYAxis = {};
            var format = PivotUtil.inArray(measureField.aggregateType, percentAggregateTypes) !== -1 ? 'P2' : (formatSetting ?
                (formatSetting.format.toLowerCase().match(/n|p|c/) === null ? 'N' : formatSetting.format) :
                this.parent.dataType === 'olap' ? this.getFormat(measureField.formatString) : 'N');
            currentYAxis = this.persistSettings.primaryYAxis ? this.frameObjectWithKeys(this.persistSettings.primaryYAxis) : currentYAxis;
            currentYAxis.rowIndex = 0;
            currentYAxis.columnIndex = 0;
            if (!(this.chartSettings.chartSeries.type === 'Polar' || this.chartSettings.chartSeries.type === 'Radar')) {
                currentYAxis.name = this.measuresNames[this.currentMeasure] ? this.measuresNames[this.currentMeasure] : this.currentMeasure;
            }
            currentYAxis.labelFormat = currentYAxis.labelFormat ? currentYAxis.labelFormat : (percentChart ? '' : format);
            currentYAxis.title = currentYAxis.title ? currentYAxis.title : measureAggregatedName;
            axes = axes.concat(currentYAxis);
            rows.push({ height: '100%' });
            columns.push({ width: '100%' });
        }
        return { axes: axes, rows: rows, columns: columns };
    };
    PivotChart.prototype.getFormat = function (format) {
        if (format === 'Currency') {
            format = 'C';
        }
        else if (format === 'Percent') {
            format = 'P';
        }
        else {
            format = 'N';
        }
        return format;
    };
    PivotChart.prototype.getColumnTotalIndex = function (pivotValues) {
        var colIndexColl = {};
        var rKeys = Object.keys(pivotValues);
        for (var _i = 0, rKeys_2 = rKeys; _i < rKeys_2.length; _i++) {
            var rowIndex = rKeys_2[_i];
            var rows = pivotValues[Number(rowIndex)];
            var cKeys = Object.keys(rows);
            for (var _a = 0, cKeys_2 = cKeys; _a < cKeys_2.length; _a++) {
                var cellIndex = cKeys_2[_a];
                var cell = rows[Number(cellIndex)];
                if (cell.axis !== 'column') {
                    return colIndexColl;
                }
                else if ((cell.type === 'sum' || (this.dataSourceSettings.columns.length === 0 ? false : cell.type === 'grand sum'))
                    && cell.rowSpan !== -1) {
                    colIndexColl[cell.colIndex] = cell.colIndex;
                }
            }
        }
        return colIndexColl;
    };
    PivotChart.prototype.groupHierarchyWithLevels = function (pivotValues) {
        var _a, _b;
        this.fieldPosition = [];
        var group = {};
        var fieldCount = 0;
        var levelPos = {};
        this.measurePos = this.engineModule.tupRowInfo[0].measurePosition;
        for (var rowPos = 0; rowPos < pivotValues.length; rowPos++) {
            var cell = pivotValues[rowPos][0];
            if (cell && cell.axis === 'row' && cell.type !== 'grand sum') {
                if (isNullOrUndefined(group[cell.hierarchy])) {
                    if (cell.memberType === 3) {
                        if (fieldCount === this.measurePos) {
                            this.fieldPosition[this.measurePos] = cell.hierarchy;
                            group[cell.hierarchy] = (_a = {}, _a[cell.levelUniqueName] = cell.levelUniqueName, _a);
                        }
                        else {
                            fieldCount--;
                        }
                    }
                    else {
                        this.fieldPosition[fieldCount] = cell.hierarchy;
                        group[cell.hierarchy] = (_b = {}, _b[cell.levelUniqueName] = cell.levelUniqueName, _b);
                    }
                    fieldCount++;
                }
                else {
                    group[cell.hierarchy][cell.levelUniqueName] = cell.levelUniqueName;
                }
            }
        }
        var lastEnd = -1;
        for (var pos = 0; pos < this.fieldPosition.length; pos++) {
            if (this.measurePos !== pos) {
                levelPos[this.fieldPosition[pos]] = { start: (lastEnd + 1), end: (lastEnd + Object.keys(group[this.fieldPosition[pos]]).length) };
                lastEnd = levelPos[this.fieldPosition[pos]].end;
            }
        }
        return levelPos;
    };
    PivotChart.prototype.frameMultiLevelLabels = function () {
        var startKeys = Object.keys(this.headerColl);
        var parentHeaders = this.headerColl[-0.5];
        for (var _i = 0, startKeys_1 = startKeys; _i < startKeys_1.length; _i++) {
            var startKey = startKeys_1[_i];
            var sKey = Number(startKey);
            var headers = this.headerColl[sKey];
            var levelPos = 0;
            var isAvail = false;
            while (levelPos <= this.maxLevel) {
                if (!isAvail) {
                    if (!headers[levelPos]) {
                        headers[levelPos] = parentHeaders[levelPos];
                    }
                    else {
                        isAvail = true;
                    }
                }
                else if (!headers[levelPos]) {
                    headers[levelPos] = {
                        name: headers[levelPos - 1].name,
                        // text: headers[levelPos - 1].text,
                        text: '',
                        hasChild: headers[levelPos - 1].hasChild,
                        isDrilled: headers[levelPos - 1].isDrilled,
                        levelName: headers[levelPos - 1].levelName,
                        level: headers[levelPos - 1].level,
                        fieldName: headers[levelPos - 1].fieldName,
                        rowIndex: headers[levelPos - 1].rowIndex,
                        colIndex: headers[levelPos - 1].colIndex,
                        span: -1,
                    };
                    // headers[levelPos - 1].span = 0;
                }
                levelPos++;
            }
            parentHeaders = this.headerColl[sKey];
        }
        var gRows = {};
        for (var _a = 0, startKeys_2 = startKeys; _a < startKeys_2.length; _a++) {
            var startKey = startKeys_2[_a];
            var sKey = Number(startKey);
            var headers = this.headerColl[sKey];
            var lKeys = Object.keys(headers);
            for (var _b = 0, lKeys_1 = lKeys; _b < lKeys_1.length; _b++) {
                var levelKey = lKeys_1[_b];
                var lKey = Number(levelKey);
                if (gRows[lKey]) {
                    var len = gRows[lKey].length;
                    if (headers[lKey].levelName === parentHeaders[lKey].levelName) {
                        gRows[lKey][len - 1].end = gRows[lKey][len - 1].end + 1;
                    }
                    else {
                        gRows[lKey].push({
                            start: sKey, end: sKey + 1, text: headers[lKey].text,
                            type: (headers[lKey].span === -1 ? 'WithoutTopandBottomBorder' : 'WithoutTopBorder'), customAttributes: headers[lKey]
                        });
                    }
                }
                else {
                    gRows[lKey] = [{
                            start: sKey, end: sKey + 1, text: headers[lKey].text,
                            type: (headers[lKey].span === -1 ? 'WithoutTopandBottomBorder' : 'WithoutTopBorder'), customAttributes: headers[lKey]
                        }];
                }
            }
            parentHeaders = headers;
        }
        var levellength = Object.keys(gRows).length;
        var multiLevelLabels = [];
        for (var level = levellength - 1; level > -1; level--) {
            multiLevelLabels.push({ categories: gRows[level], border: { width: 1 }, overflow: 'Trim' });
        }
        return multiLevelLabels;
    };
    PivotChart.prototype.getZoomFactor = function () {
        if (!isNaN(Number(this.parent.width))) {
            this.calculatedWidth = Number(this.parent.width);
        }
        else if (this.parent.width.indexOf('%') > -1) {
            this.calculatedWidth = this.parent.element.clientWidth * (parseFloat(this.parent.width) / 100);
        }
        else if (this.parent.width.indexOf('px') > -1) {
            this.calculatedWidth = Number(this.parent.width.toString().split('px')[0]);
        }
        else {
            this.calculatedWidth = this.parent.element.clientWidth;
        }
        var seriesLength = (this.chartSeries.length * 10) > 120 ? (this.chartSeries.length * 10) : 120;
        var zoomFactor = this.chartSeries.length > 0 ?
            (this.calculatedWidth / (Object.keys(this.chartSeries[0].dataSource).length * seriesLength)) : 1;
        zoomFactor = (zoomFactor < 1 && zoomFactor > 0) ? zoomFactor : 1;
        return zoomFactor;
    };
    PivotChart.prototype.configTooltipSettings = function () {
        var tooltip = this.chartSettings.tooltip;
        tooltip.enable = tooltip.enable === undefined ? true : tooltip.enable;
        tooltip.header = tooltip.header ? tooltip.header : '';
        tooltip.enableMarker = tooltip.enableMarker === undefined ? true : tooltip.enableMarker;
        return tooltip;
    };
    PivotChart.prototype.configLegendSettings = function () {
        var legendSettings = {};
        legendSettings = this.chartSettings.legendSettings ? this.chartSettings.legendSettings : legendSettings;
        legendSettings.padding = legendSettings.padding ? legendSettings.padding : 25;
        legendSettings.shapePadding = legendSettings.shapePadding ? legendSettings.shapePadding : 10;
        return legendSettings;
    };
    PivotChart.prototype.configXAxis = function () {
        var currentXAxis = {};
        currentXAxis = this.persistSettings.primaryXAxis ? this.frameObjectWithKeys(this.persistSettings.primaryXAxis) : currentXAxis;
        currentXAxis.valueType = 'Category';
        currentXAxis.labelIntersectAction = currentXAxis.labelIntersectAction ? currentXAxis.labelIntersectAction : 'Rotate45';
        currentXAxis.title = currentXAxis.title ? currentXAxis.title :
            this.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' / ');
        currentXAxis.zoomFactor = this.getZoomFactor();
        if (!this.parent.chartSettings.zoomSettings.enableScrollbar) {
            currentXAxis.zoomFactor = 1;
        }
        if (this.chartSettings.showMultiLevelLabels) {
            currentXAxis.multiLevelLabels = this.frameMultiLevelLabels();
            currentXAxis.border = { width: 1, type: 'WithoutTopandBottomBorder' };
            currentXAxis.majorTickLines = { width: 0, height: -10 };
        }
        return currentXAxis;
    };
    PivotChart.prototype.configZoomSettings = function () {
        var zoomSettings = this.chartSettings.zoomSettings;
        zoomSettings.enableSelectionZooming = zoomSettings.enableSelectionZooming === undefined ? true : zoomSettings.enableSelectionZooming;
        zoomSettings.enableScrollbar = zoomSettings.enableScrollbar === undefined ? true : zoomSettings.enableScrollbar;
        return zoomSettings;
    };
    PivotChart.prototype.tooltipRender = function (args) {
        var measure = args.series.yAxisName ? (args.series.yAxisName.split('_CumulativeAxis')[0]) :
            (this.chartSettings.enableMultiAxis ? args.series.name.split(' | ')[1] : this.measuresNames[this.currentMeasure] ?
                this.measuresNames[this.currentMeasure] : this.currentMeasure);
        var measureField = this.engineModule.fieldList[this.measuresNames[measure] ? this.measuresNames[measure] : measure];
        var measureAggregatedName = (this.parent.dataType === 'olap' ? '' : (this.parent.localeObj.getConstant(measureField.aggregateType) + ' ' +
            this.parent.localeObj.getConstant('of') + ' ')) + measureField.caption;
        var formattedText = args.text.split('<b>')[1].split('</b>')[0];
        var formatField = this.engineModule.formatFields[measureField.id];
        var formattedValue = ((formatField && formatField.format && formatField.format.toLowerCase().match(/n|p|c/) !== null &&
            this.chartSettings.useGroupingSeparator) ? this.parent.dataType === 'olap' ?
            this.engineModule.getFormattedValue(args.point.y, measureField.id, formattedText) :
            this.parent.engineModule.getFormattedValue(args.point.y, measureField.id).formattedText :
            formattedText);
        args.text = measureAggregatedName + ': ' + formattedValue +
            (this.dataSourceSettings.columns.length === 0 ? '' :
                (' <br/>' + this.parent.localeObj.getConstant('column') + ': ' + args.series.name.split(' | ')[0])) +
            (this.dataSourceSettings.rows.length === 0 ? '' :
                (' <br/>' + this.parent.localeObj.getConstant('row') + ': ' + args.point.x));
        this.parent.trigger(events.chartTooltipRender, args);
    };
    PivotChart.prototype.loaded = function (args) {
        this.parent.isChartLoaded = true;
        if (this.parent.chart && this.parent.showGroupingBar && this.parent.groupingBarModule &&
            this.parent.showFieldList && this.parent.currentView === 'Chart') {
            this.parent.groupingBarModule.alignIcon();
        }
        if (this.chartSettings.showMultiLevelLabels) {
            var multilabelAxisName = PivotUtil.inArray(this.chartSettings.chartSeries.type, ['Bar', 'StackingBar', 'StackingBar100']) > -1 ?
                '_chartYAxisMultiLevelLabel0' : '_chartXAxisMultiLevelLabel0';
            if (!isNullOrUndefined(this.parent.element.querySelector("#" + this.parent.element.id + multilabelAxisName))) {
                this.parent.element.querySelector("#" + this.parent.element.id + multilabelAxisName).setAttribute('cursor', 'pointer');
            }
        }
        if (this.parent.chart && this.parent.showToolbar && this.parent.element.querySelector(".e-pivot-toolbar")) {
            this.parent.chart.height = (this.parent.getHeightAsNumber() - this.parent.element.querySelector(".e-pivot-toolbar").clientHeight).toString();
        }
        if (this.parent.chart && this.parent.showGroupingBar && this.parent.element.querySelector(".e-chart-grouping-bar")) {
            this.parent.chart.height = (this.parent.getHeightAsNumber() - this.parent.element.querySelector(".e-chart-grouping-bar").clientHeight).toString();
        }
        if (parseInt(this.parent.chart.height) < 200) {
            this.parent.chart.height = "200";
        }
        this.parent.notify(events.contentReady, {});
        this.parent.trigger(events.chartLoaded, args);
    };
    PivotChart.prototype.axisLabelRender = function (args) {
        if (this.chartSettings.showMultiLevelLabels) {
            if (args.axis.name === 'primaryXAxis') {
                args.text = '';
            }
        }
        this.parent.trigger(events.chartAxisLabelRender, args);
    };
    PivotChart.prototype.multiLevelLabelClick = function (args) {
        if (args.customAttributes && args.customAttributes.hasChild && !args.customAttributes.cell.isNamedSet) {
            if (this.parent.dataType === 'olap') {
                this.parent.onDrill(undefined, args.customAttributes);
            }
            else {
                this.onDrill(args);
            }
        }
    };
    PivotChart.prototype.onDrill = function (args) {
        var labelInfo = args.customAttributes;
        var delimiter = (this.dataSourceSettings.drilledMembers[0] && this.dataSourceSettings.drilledMembers[0].delimiter) ?
            this.dataSourceSettings.drilledMembers[0].delimiter : '**';
        var fieldName = labelInfo.fieldName;
        var currentCell = this.engineModule.pivotValues[labelInfo.rowIndex][labelInfo.colIndex];
        var memberUqName = currentCell.valueSort.levelName.
            split(this.engineModule.valueSortSettings.headerDelimiter).join(delimiter);
        var fieldAvail = false;
        if (this.dataSourceSettings.drilledMembers.length === 0) {
            this.parent.setProperties({ dataSourceSettings: { drilledMembers: [{ name: fieldName, items: [memberUqName], delimiter: delimiter }] } }, true);
        }
        else {
            for (var fCnt = 0; fCnt < this.dataSourceSettings.drilledMembers.length; fCnt++) {
                var field = this.dataSourceSettings.drilledMembers[fCnt];
                memberUqName = memberUqName.split(delimiter).join(field.delimiter ? field.delimiter : delimiter);
                delimiter = field.delimiter = field.delimiter ? field.delimiter : delimiter;
                if (field.name === fieldName) {
                    fieldAvail = true;
                    var memIndex = field.items.indexOf(memberUqName);
                    if (memIndex > -1) {
                        field.items.splice(memIndex, 1);
                    }
                    else {
                        field.items.push(memberUqName);
                    }
                }
                else {
                    continue;
                }
            }
            if (!fieldAvail) {
                this.dataSourceSettings.drilledMembers.push({ name: fieldName, items: [memberUqName], delimiter: delimiter });
            }
        }
        showSpinner(this.parent.element);
        var pivot = this;
        //setTimeout(() => {
        var drilledItem = {
            fieldName: fieldName, memberName: memberUqName, delimiter: delimiter,
            axis: 'row',
            action: labelInfo.isDrilled ? 'up' : 'down',
            currentCell: currentCell
        };
        pivot.parent.trigger(events.drill, {
            drillInfo: drilledItem,
            pivotview: isBlazor() ? undefined : pivot
        });
        if (pivot.parent.enableVirtualization) {
            pivot.engineModule.drilledMembers = pivot.dataSourceSettings.drilledMembers;
            pivot.engineModule.onDrill(drilledItem);
        }
        else {
            pivot.engineModule.generateGridData(pivot.dataSourceSettings);
        }
        pivot.parent.setProperties({ pivotValues: pivot.engineModule.pivotValues }, true);
        pivot.parent.renderPivotGrid();
        //});
    };
    PivotChart.prototype.load = function (args) {
        if (args.chart.zoomModule) {
            args.chart.zoomModule.isZoomed = true;
        }
        this.parent.trigger(events.chartLoad, args);
    };
    PivotChart.prototype.resized = function (args) {
        if (isBlazor()) {
            args.chart = this.parent.chart;
        }
        args.chart.primaryXAxis.zoomFactor = this.getZoomFactor();
        if (!this.parent.chartSettings.zoomSettings.enableScrollbar) {
            args.chart.primaryXAxis.zoomFactor = 1;
        }
        this.parent.trigger(events.chartResized, args);
    };
    /**
     * To destroy the chart module
     * @returns void

     */
    /* tslint:disable:no-empty */
    PivotChart.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.parent.chart && !this.parent.chart.isDestroyed) {
            this.parent.chart.destroy();
        }
        else {
            return;
        }
    };
    return PivotChart;
}());
export { PivotChart };
