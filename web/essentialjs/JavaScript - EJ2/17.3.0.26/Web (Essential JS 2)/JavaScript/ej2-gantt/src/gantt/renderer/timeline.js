var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createElement, isNullOrUndefined, getValue, addClass, removeClass } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * Configures the `Timeline` of the gantt.
 */
var Timeline = /** @class */ (function () {
    function Timeline(ganttObj) {
        this.isZoomIn = false;
        this.isZooming = false;
        this.isZoomToFit = false;
        this.parent = ganttObj;
        this.initProperties();
    }
    /**
     * To initialize the public property.
     * @return {void}
     * @private
     */
    Timeline.prototype.initProperties = function () {
        this.timelineStartDate = null;
        this.timelineEndDate = null;
        this.totalTimelineWidth = 0;
        this.customTimelineSettings = null;
        this.parent.isTimelineRoundOff = this.isZoomToFit ? false : isNullOrUndefined(this.parent.projectStartDate) ? true : false;
    };
    /**
     * To render timeline header series.
     * @return {void}
     * @private
     */
    Timeline.prototype.validateTimelineProp = function () {
        this.roundOffDays();
        this.processTimelineProperty();
        this.timelineWidthCalculation();
    };
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    Timeline.prototype.refreshTimeline = function () {
        this.initProperties();
        this.processTimelineUnit();
        this.parent.dataOperation.calculateProjectDates();
        this.parent.updateProjectDates(this.parent.cloneProjectStartDate, this.parent.cloneProjectEndDate, this.parent.isTimelineRoundOff);
    };
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    Timeline.prototype.refreshTimelineByTimeSpan = function () {
        this.validateTimelineProp();
        this.parent.ganttChartModule.chartTimelineContainer.innerHTML = '';
        this.createTimelineSeries();
    };
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    Timeline.prototype.updateChartByNewTimeline = function () {
        this.parent.chartRowsModule.refreshChartByTimeline();
        this.parent.notify('refreshDayMarkers', {});
    };
    /**
     * Function used to perform Zoomin and Zoomout actions in Gantt control.
     * @param isZoomIn
     * @private
     * @return {void}
     */
    Timeline.prototype.processZooming = function (isZoomIn) {
        this.isZoomToFit = false;
        if (!isNullOrUndefined(this.parent.zoomingProjectStartDate)) {
            this.parent.cloneProjectStartDate = this.parent.cloneProjectStartDate.getTime() < this.parent.zoomingProjectStartDate.getTime()
                ? this.parent.cloneProjectStartDate : this.parent.zoomingProjectStartDate;
            this.parent.cloneProjectEndDate = this.parent.cloneProjectEndDate.getTime() > this.parent.zoomingProjectEndDate.getTime()
                ? this.parent.cloneProjectEndDate : this.parent.zoomingProjectEndDate;
        }
        this.parent.zoomingProjectStartDate = null;
        this.parent.zoomingProjectEndDate = null;
        var currentLevel;
        var currentZoomingLevel = this.checkCurrentZoomingLevel();
        this.isZoomIn = isZoomIn;
        this.isZooming = true;
        currentLevel = isZoomIn ? currentZoomingLevel + 1 : currentZoomingLevel - 1;
        if (this.parent.toolbarModule) {
            if (isZoomIn) {
                if (currentLevel === this.parent.zoomingLevels[this.parent.zoomingLevels.length - 1].level) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomin'], false); // disable toolbar items.
                }
                else {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomout'], true); // disable toolbar items.
                }
            }
            else {
                if (currentLevel === this.parent.zoomingLevels[0].level) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomout'], false); // disable toolbar items.
                }
                else {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomin'], true); // enable toolbar items.
                }
            }
        }
        var newTimeline = this.parent.zoomingLevels[currentLevel];
        var args = {
            requestType: isZoomIn ? 'beforeZoomIn' : 'beforeZoomOut',
            timeline: newTimeline
        };
        this.parent.trigger('actionBegin', args);
        newTimeline = args.timeline;
        this.changeTimelineSettings(newTimeline);
    };
    /**
     * To change the timeline settings property values based upon the Zooming levels.
     * @return {void}
     * @private
     */
    Timeline.prototype.changeTimelineSettings = function (newTimeline) {
        var _this = this;
        var skipProperty = this.isSingleTier ?
            this.customTimelineSettings.topTier.unit === 'None' ?
                'topTier' : 'bottomTier' : null;
        Object.keys(this.customTimelineSettings).forEach(function (property) {
            if (property !== skipProperty) {
                _this.customTimelineSettings[property] = (typeof newTimeline[property] === 'object'
                    && !isNullOrUndefined(newTimeline[property])) ? __assign({}, newTimeline[property]) : newTimeline[property];
            }
            else {
                var value = property === 'topTier' ? 'bottomTier' : 'topTier';
                var assignValue = 'bottomTier';
                _this.customTimelineSettings[value] = __assign({}, newTimeline[assignValue]);
            }
        });
        this.parent.isTimelineRoundOff = this.isZoomToFit ? false : isNullOrUndefined(this.parent.projectStartDate) ? true : false;
        this.processTimelineUnit();
        this.parent.updateProjectDates(this.parent.cloneProjectStartDate, this.parent.cloneProjectEndDate, this.parent.isTimelineRoundOff);
        if (this.isZooming || this.isZoomToFit) {
            var args = {
                requestType: this.isZoomIn ? 'AfterZoomIn' : this.isZoomToFit ? 'afterZoomToProject' : 'AfterZoomOut',
            };
            this.parent.trigger('actionComplete', args);
        }
    };
    /**
     * To perform the zoom to fit operation in Gantt.
     * @return {void}
     * @private
     */
    Timeline.prototype.processZoomToFit = function () {
        this.isZoomToFit = true;
        this.isZooming = false;
        if (!this.parent.zoomingProjectStartDate) {
            this.parent.zoomingProjectStartDate = this.parent.cloneProjectStartDate;
            this.parent.zoomingProjectEndDate = this.parent.cloneProjectEndDate;
        }
        this.parent.dataOperation.calculateProjectDates();
        var timeDifference = (this.parent.cloneProjectEndDate.getTime() - this.parent.cloneProjectStartDate.getTime());
        var totalDays = (timeDifference / (1000 * 3600 * 24));
        var chartWidth = this.parent.ganttChartModule.chartElement.offsetWidth;
        var perDayWidth = chartWidth / totalDays;
        var zoomingLevel;
        var firstValue;
        var secondValue;
        var zoomingCollections = this.parent.zoomingLevels.slice();
        var sortedCollectons = zoomingCollections.sort(function (a, b) {
            return (a.perDayWidth < b.perDayWidth) ? 1 : -1;
        });
        if (perDayWidth === 0) { // return when the Gantt chart is not in viewable state.
            return;
        }
        for (var i = 0; i < sortedCollectons.length; i++) {
            firstValue = sortedCollectons[i];
            if (i === sortedCollectons.length - 1) {
                zoomingLevel = sortedCollectons[i];
                break;
            }
            else {
                secondValue = sortedCollectons[i + 1];
            }
            if (perDayWidth >= firstValue.perDayWidth) {
                zoomingLevel = sortedCollectons[i];
                break;
            }
            if (perDayWidth < firstValue.perDayWidth && perDayWidth > secondValue.perDayWidth) {
                zoomingLevel = sortedCollectons[i + 1];
                break;
            }
        }
        var newTimeline = __assign({}, zoomingLevel);
        this.roundOffDateToZoom(this.parent.cloneProjectStartDate, true, perDayWidth, newTimeline.bottomTier.unit);
        this.roundOffDateToZoom(this.parent.cloneProjectEndDate, false, perDayWidth, newTimeline.bottomTier.unit);
        var numberOfCells = this.calculateNumberOfTimelineCells(newTimeline);
        newTimeline.timelineUnitSize = Math.abs((chartWidth - 25)) / numberOfCells;
        this.changeTimelineSettings(newTimeline);
        var args = {
            requestType: 'beforeZoomToProject',
            timeline: newTimeline
        };
        this.parent.trigger('actionBegin', args);
    };
    Timeline.prototype.roundOffDateToZoom = function (date, isStartDate, perDayWidth, tierMode) {
        var width = tierMode === 'Month' || tierMode === 'Year' ? 60 : 20;
        var roundOffTime = (width / perDayWidth) * (24 * 60 * 60 * 1000);
        if (isStartDate) {
            date.setTime(date.getTime() - roundOffTime);
        }
        else {
            date.setTime(date.getTime() + roundOffTime);
        }
        if (tierMode === 'Hour') {
            date.setMinutes(isStartDate ? -120 : 120);
        }
        else if (tierMode === 'Minutes') {
            date.setSeconds(isStartDate ? -120 : 120);
        }
        else {
            date.setHours(isStartDate ? -48 : 48, 0, 0, 0);
        }
    };
    ;
    Timeline.prototype.calculateNumberOfTimelineCells = function (newTimeline) {
        var numberOfDays = Math.abs((this.parent.cloneProjectEndDate.getTime() -
            this.parent.cloneProjectStartDate.getTime()) / (24 * 60 * 60 * 1000));
        var count = newTimeline.bottomTier.count;
        var unit = newTimeline.bottomTier.unit;
        if (unit === 'Day') {
            return numberOfDays / count;
        }
        else if (unit === 'Week') {
            return (numberOfDays / count) / 7;
        }
        else if (unit === 'Month') {
            return (numberOfDays / count) / 28;
        }
        else if (unit === 'Year') {
            return (numberOfDays / count) / (12 * 28);
        }
        else if (unit === 'Hour') {
            return numberOfDays * (24 / count);
        }
        else {
            return numberOfDays * ((60 * 24) / count);
        }
    };
    /**
     * To validate time line unit.
     * @return {void}
     * @private
     */
    Timeline.prototype.processTimelineUnit = function () {
        var directProperty = ['timelineViewMode', 'timelineUnitSize', 'weekStartDay', 'weekendBackground'];
        var innerProperty = {
            'topTier': ['unit', 'format', 'count', 'formatter'],
            'bottomTier': ['unit', 'format', 'count', 'formatter']
        };
        var tierUnits = ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minutes'];
        this.customTimelineSettings = this.customTimelineSettings ? this.customTimelineSettings :
            this.extendFunction(this.parent.timelineSettings, directProperty, innerProperty);
        if ((tierUnits.indexOf(this.customTimelineSettings.topTier.unit) === -1) &&
            (tierUnits.indexOf(this.customTimelineSettings.bottomTier.unit) === -1)) {
            this.customTimelineSettings.topTier.unit = tierUnits.indexOf(this.customTimelineSettings.timelineViewMode) !== -1 ?
                this.customTimelineSettings.timelineViewMode : 'Week';
            this.customTimelineSettings.bottomTier.unit = tierUnits.indexOf(this.customTimelineSettings.topTier.unit) !== 5 ?
                tierUnits[tierUnits.indexOf(this.customTimelineSettings.topTier.unit) + 1] : 'None';
        }
        else if ((tierUnits.indexOf(this.customTimelineSettings.topTier.unit) !== -1 &&
            tierUnits.indexOf(this.customTimelineSettings.bottomTier.unit) !== -1)
            && (tierUnits.indexOf(this.customTimelineSettings.topTier.unit) >
                tierUnits.indexOf(this.customTimelineSettings.bottomTier.unit))) {
            this.customTimelineSettings.bottomTier.unit = this.customTimelineSettings.topTier.unit;
        }
        else {
            this.customTimelineSettings.topTier.unit = tierUnits.indexOf(this.customTimelineSettings.topTier.unit) === -1 ?
                'None' : this.customTimelineSettings.topTier.unit;
            this.customTimelineSettings.bottomTier.unit = tierUnits.indexOf(this.customTimelineSettings.bottomTier.unit) === -1 ?
                'None' : this.customTimelineSettings.bottomTier.unit;
        }
        this.topTier = this.customTimelineSettings.topTier.unit;
        this.bottomTier = this.customTimelineSettings.bottomTier.unit;
        this.previousIsSingleTier = this.isSingleTier;
        this.isSingleTier = this.topTier === 'None' || this.bottomTier === 'None' ? true : false;
    };
    /**
     * To validate timeline properties.
     * @return {void}
     * @private
     */
    Timeline.prototype.processTimelineProperty = function () {
        this.customTimelineSettings.topTier.count = (this.topTier === 'None') ?
            1 : this.validateCount(this.customTimelineSettings.topTier.unit, this.customTimelineSettings.topTier.count, 'topTier');
        this.customTimelineSettings.bottomTier.count = this.customTimelineSettings.bottomTier.unit === 'None' ?
            1 : this.validateCount(this.customTimelineSettings.bottomTier.unit, this.customTimelineSettings.bottomTier.count, 'bottomTier');
        this.customTimelineSettings.bottomTier.format = this.validateFormat(this.customTimelineSettings.bottomTier.unit, this.customTimelineSettings.bottomTier.format);
        this.customTimelineSettings.topTier.format = this.validateFormat(this.topTier, this.customTimelineSettings.topTier.format);
        this.customTimelineSettings.weekStartDay = this.customTimelineSettings.weekStartDay >= 0 &&
            this.customTimelineSettings.weekStartDay <= 6 ? this.customTimelineSettings.weekStartDay : 0;
        this.checkCurrentZoomingLevel();
    };
    /**
     * To find the current zooming level of the Gantt control.
     * @return {void}
     * @private
     */
    Timeline.prototype.calculateZoomingLevelsPerDayWidth = function () {
        var collections = this.parent.zoomingLevels;
        for (var i = 0; i < collections.length; i++) {
            var perDayWidth = this.getPerDayWidth(collections[i].timelineUnitSize, collections[i].bottomTier.count, collections[i].bottomTier.unit);
            collections[i].perDayWidth = perDayWidth;
        }
    };
    /**
     * To find the current zooming level of the Gantt control.
     * @return {void}
     * @private
     */
    Timeline.prototype.checkCurrentZoomingLevel = function () {
        var count = this.customTimelineSettings.bottomTier.unit !== 'None' ?
            this.customTimelineSettings.bottomTier.count : this.customTimelineSettings.topTier.count;
        var unit = this.customTimelineSettings.bottomTier.unit !== 'None' ?
            this.customTimelineSettings.bottomTier.unit : this.customTimelineSettings.topTier.unit;
        var zoomLevel = this.getCurrentZoomingLevel(unit, count);
        if (this.parent.toolbarModule) {
            if (zoomLevel === this.parent.zoomingLevels[this.parent.zoomingLevels.length - 1].level) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomin'], false);
            }
            else if (zoomLevel === this.parent.zoomingLevels[0].level) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomout'], false);
            }
        }
        this.parent.currentZoomingLevel = this.parent.zoomingLevels[zoomLevel];
        return zoomLevel;
    };
    /**
     * @private
     */
    Timeline.prototype.getCurrentZoomingLevel = function (unit, count) {
        var level;
        var currentZoomCollection;
        var checkSameCountLevels;
        var secondValue;
        var firstValue;
        if (!this.parent.zoomingLevels.length) {
            this.parent.zoomingLevels = this.parent.getZoomingLevels();
        }
        var sameUnitLevels = this.parent.zoomingLevels.filter(function (tempLevel) {
            return tempLevel.bottomTier.unit === unit;
        });
        if (sameUnitLevels.length === 0) {
            var closestUnit_1 = this.getClosestUnit(unit, '', false);
            sameUnitLevels = this.parent.zoomingLevels.filter(function (tempLevel) {
                return tempLevel.bottomTier.unit === closestUnit_1;
            });
        }
        var sortedUnitLevels = sameUnitLevels.sort(function (a, b) {
            return (a.bottomTier.count < b.bottomTier.count) ? 1 : -1;
        });
        for (var i = 0; i < sortedUnitLevels.length; i++) {
            firstValue = sortedUnitLevels[i];
            if (i === sortedUnitLevels.length - 1) {
                level = sortedUnitLevels[i].level;
                break;
            }
            else {
                secondValue = sortedUnitLevels[i + 1];
            }
            if (count >= firstValue.bottomTier.count) {
                currentZoomCollection = sortedUnitLevels[i];
                checkSameCountLevels = sortedUnitLevels.filter(function (tempLevel) {
                    return tempLevel.bottomTier.count === currentZoomCollection.bottomTier.count;
                });
                if (checkSameCountLevels.length > 1) {
                    level = this.checkCollectionsWidth(checkSameCountLevels);
                }
                else {
                    level = checkSameCountLevels[0].level;
                }
                break;
            }
            else if (count < firstValue.bottomTier.count && count > secondValue.bottomTier.count) {
                currentZoomCollection = sortedUnitLevels[i + 1];
                checkSameCountLevels = sortedUnitLevels.filter(function (tempLevel) {
                    return tempLevel.bottomTier.count === currentZoomCollection.bottomTier.count;
                });
                if (checkSameCountLevels.length > 1) {
                    level = this.checkCollectionsWidth(checkSameCountLevels);
                }
                else {
                    level = checkSameCountLevels[0].level;
                }
                break;
            }
        }
        return level;
    };
    /**
     * Getting closest zooimg level.
     * @private
     */
    Timeline.prototype.getClosestUnit = function (unit, closetUnit, isCont) {
        var bottomTierUnits = ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minutes'];
        var index = bottomTierUnits.indexOf(unit);
        if (index === 0) {
            isCont = true;
        }
        if (this.isZoomIn || isCont) {
            unit = bottomTierUnits[index + 1];
        }
        else {
            unit = bottomTierUnits[index - 1];
        }
        var sameUnitLevels = this.parent.zoomingLevels.filter(function (tempLevel) {
            return tempLevel.bottomTier.unit === unit;
        });
        if (sameUnitLevels.length === 0) {
            if (unit === 'Year') {
                isCont = true;
            }
            closetUnit = unit;
            return this.getClosestUnit(unit, closetUnit, isCont);
        }
        else {
            return unit;
        }
    };
    Timeline.prototype.checkCollectionsWidth = function (checkSameLevels) {
        var zoomLevels = checkSameLevels;
        var width = this.customTimelineSettings.timelineUnitSize;
        var level;
        var secondValue;
        var firstValue;
        var sortedZoomLevels = zoomLevels.sort(function (a, b) {
            return (a.timelineUnitSize < b.timelineUnitSize) ? 1 : -1;
        });
        for (var i = 0; i < sortedZoomLevels.length; i++) {
            firstValue = sortedZoomLevels[i];
            if (i === sortedZoomLevels.length - 1) {
                level = sortedZoomLevels[i].level;
                break;
            }
            else {
                secondValue = sortedZoomLevels[i + 1];
            }
            if (width >= firstValue.timelineUnitSize) {
                level = sortedZoomLevels[i].level;
                break;
            }
            else if (width < firstValue.timelineUnitSize && width > secondValue.timelineUnitSize) {
                level = sortedZoomLevels[i + 1].level;
                break;
            }
        }
        return level;
    };
    /**
     * To create timeline header template.
     * @return {void}
     * @private
     */
    Timeline.prototype.updateTimelineHeaderHeight = function () {
        if (this.parent.timelineModule.isSingleTier) {
            addClass([this.parent.ganttChartModule.chartTimelineContainer], cls.timelineSingleHeaderOuterDiv);
            if (this.parent.treeGrid.element) {
                addClass(this.parent.treeGrid.element.querySelectorAll('.e-headercell'), cls.timelineSingleHeaderOuterDiv);
                addClass(this.parent.treeGrid.element.querySelectorAll('.e-columnheader'), cls.timelineSingleHeaderOuterDiv);
            }
        }
        else {
            removeClass([this.parent.ganttChartModule.chartTimelineContainer], cls.timelineSingleHeaderOuterDiv);
            if (this.parent.treeGrid.element) {
                removeClass(this.parent.treeGrid.element.querySelectorAll('.e-headercell'), cls.timelineSingleHeaderOuterDiv);
                removeClass(this.parent.treeGrid.element.querySelectorAll('.e-columnheader'), cls.timelineSingleHeaderOuterDiv);
            }
        }
        if (this.previousIsSingleTier !== this.isSingleTier) {
            var toolbarHeight = 0;
            if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
                toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
            }
            this.parent.ganttChartModule.scrollObject.
                setHeight(this.parent.ganttHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight - toolbarHeight);
            this.parent.treeGrid.height = this.parent.ganttHeight - toolbarHeight -
                this.parent.ganttChartModule.chartTimelineContainer.offsetHeight;
        }
    };
    /**
     * To create timeline header template.
     * @return {void}
     * @private
     */
    Timeline.prototype.createTimelineSeries = function () {
        var tr;
        var td;
        var div;
        var table;
        var thead;
        var loopCount = this.isSingleTier ? 1 : 2;
        var tier = this.topTier === 'None' ? 'bottomTier' : 'topTier';
        this.updateTimelineHeaderHeight();
        for (var count = 0; count < loopCount; count++) {
            table = createElement('table', { className: cls.timelineHeaderTableContainer, styles: 'display: block;' });
            thead = createElement('thead', { className: cls.timelineHeaderTableBody, styles: 'display:block; border-collapse:collapse' });
            tr = createElement('tr', { innerHTML: this.createTimelineTemplate(tier) });
            td = createElement('th');
            div = createElement('div', { styles: 'width: 20px' });
            td.appendChild(div);
            tr.appendChild(td);
            thead.appendChild(tr);
            table.appendChild(thead);
            this.parent.ganttChartModule.chartTimelineContainer.appendChild(table);
            tier = 'bottomTier';
            tr = null;
        }
    };
    /**
     * To validate timeline tier count.
     * @return {number}
     * @private
     */
    Timeline.prototype.validateCount = function (mode, count, tier) {
        var tierCount = !isNullOrUndefined(count) && parseInt(count.toString(), 10) > 0 ? parseInt(count.toString(), 10) : 1;
        var timeDifference = Math.abs(this.timelineRoundOffEndDate.getTime() - this.timelineStartDate.getTime());
        var difference;
        switch (mode) {
            case 'Year':
                difference = Math.round((timeDifference / (1000 * 3600 * 24)) / (12 * 28));
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
            case 'Month':
                difference = Math.round((timeDifference / (1000 * 3600 * 24)) / 28);
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
            case 'Week':
                difference = Math.round((timeDifference / (1000 * 3600 * 24)) / 7);
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
            case 'Day':
                difference = Math.round(timeDifference / (1000 * 3600 * 24));
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
            case 'Hour':
                difference = Math.round(timeDifference / (1000 * 3600));
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
            case 'Minutes':
                difference = Math.round(timeDifference / (1000 * 60));
                tierCount = tierCount <= difference ? tierCount : difference > 0 ? difference : 1;
                if (this.topTier !== 'None' && tier === 'bottomTier') {
                    tierCount = this.validateBottomTierCount(mode, tierCount);
                }
                break;
        }
        if (count !== tierCount && this.isZooming && this.parent.toolbarModule && (tier === 'bottomTier' || this.isSingleTier)) {
            if (this.isZoomIn) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomin'], false);
            }
            else {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_zoomout'], false);
            }
        }
        return tierCount;
    };
    /**
     * To validate bottom tier count.
     * @return {number}
     * @private
     */
    Timeline.prototype.validateBottomTierCount = function (mode, tierCount) {
        var count;
        switch (mode) {
            case 'Year':
                count = tierCount <= this.customTimelineSettings.topTier.count ?
                    tierCount : this.customTimelineSettings.topTier.count;
                break;
            case 'Month':
                count = this.topTier === 'Year' ? tierCount <= (this.customTimelineSettings.topTier.count * 12) ?
                    tierCount : (this.customTimelineSettings.topTier.count * 12) :
                    tierCount <= this.customTimelineSettings.topTier.count ?
                        tierCount : this.customTimelineSettings.topTier.count;
                break;
            case 'Week':
                count = this.topTier === 'Year' ? tierCount <= (this.customTimelineSettings.topTier.count * (12 * 4)) ?
                    tierCount : (this.customTimelineSettings.topTier.count * (12 * 4)) :
                    this.topTier === 'Month' ? tierCount <= (this.customTimelineSettings.topTier.count * 4) ?
                        tierCount : (this.customTimelineSettings.topTier.count * 4) :
                        tierCount <= this.customTimelineSettings.topTier.count ?
                            tierCount : this.customTimelineSettings.topTier.count;
                break;
            case 'Day':
                count = this.topTier === 'Year' ? tierCount <= (this.customTimelineSettings.topTier.count * (12 * 28)) ?
                    tierCount : (this.customTimelineSettings.topTier.count * (12 * 28)) :
                    this.topTier === 'Month' ? tierCount <= (this.customTimelineSettings.topTier.count * 28) ?
                        tierCount : (this.customTimelineSettings.topTier.count * 28) :
                        this.topTier === 'Week' ? tierCount <= (this.customTimelineSettings.topTier.count * 7) ?
                            tierCount : (this.customTimelineSettings.topTier.count * 7) :
                            tierCount <= this.customTimelineSettings.topTier.count ? tierCount : this.customTimelineSettings.topTier.count;
                break;
            case 'Hour':
                count = this.topTier === 'Year' ? tierCount <= (this.customTimelineSettings.topTier.count * (12 * 28 * 24)) ?
                    tierCount : (this.customTimelineSettings.topTier.count * (12 * 28 * 24)) :
                    this.topTier === 'Month' ? tierCount <= (this.customTimelineSettings.topTier.count * (28 * 24)) ?
                        tierCount : (this.customTimelineSettings.topTier.count * (28 * 24)) :
                        this.topTier === 'Week' ? tierCount <= (this.customTimelineSettings.topTier.count * 7 * 24) ?
                            tierCount : (this.customTimelineSettings.topTier.count * 7 * 24) :
                            this.topTier === 'Day' ? tierCount <= (this.customTimelineSettings.topTier.count * 24) ?
                                tierCount : (this.customTimelineSettings.topTier.count * 24) :
                                tierCount <= this.customTimelineSettings.topTier.count ?
                                    tierCount : this.customTimelineSettings.topTier.count;
                break;
            case 'Minutes':
                count = this.topTier === 'Year' ? tierCount <= (this.customTimelineSettings.topTier.count * (12 * 28 * 24 * 60)) ?
                    tierCount : (this.customTimelineSettings.topTier.count * (12 * 28 * 24 * 60)) :
                    this.topTier === 'Month' ? tierCount <= (this.customTimelineSettings.topTier.count * (28 * 24 * 60)) ?
                        tierCount : (this.customTimelineSettings.topTier.count * (28 * 24 * 60)) :
                        this.topTier === 'Week' ? tierCount <= (this.customTimelineSettings.topTier.count * 7 * 24 * 60) ?
                            tierCount : (this.customTimelineSettings.topTier.count * 7 * 24 * 60) :
                            this.topTier === 'Day' ? tierCount <= (this.customTimelineSettings.topTier.count * 24 * 60) ?
                                tierCount : (this.customTimelineSettings.topTier.count * 24 * 60) :
                                this.topTier === 'Hour' ? tierCount <= (this.customTimelineSettings.topTier.count * 60) ?
                                    tierCount : (this.customTimelineSettings.topTier.count * 60) :
                                    tierCount <= this.customTimelineSettings.topTier.count ?
                                        tierCount : this.customTimelineSettings.topTier.count;
                break;
        }
        return count;
    };
    /**
     * To validate timeline tier format.
     * @return {string}
     * @private
     */
    Timeline.prototype.validateFormat = function (mode, format) {
        var tierFormat;
        switch (mode) {
            case 'Week':
                tierFormat = !format ? 'MMM dd, yyyy' : format;
                break;
            case 'Day':
            case 'None':
                tierFormat = !format ? '' : format;
                break;
            case 'Hour':
                tierFormat = !format ? 'H' : format;
                break;
            case 'Month':
                tierFormat = !format ? 'MMM yyyy' : format;
                break;
            case 'Year':
                tierFormat = !format ? 'yyyy' : format;
                break;
            case 'Minutes':
                tierFormat = !format ? 'm' : format;
                break;
        }
        return tierFormat;
    };
    /**
     * To perform extend operation.
     * @return {object}
     * @private
     */
    Timeline.prototype.extendFunction = function (cloneObj, propertyCollection, innerProperty) {
        var _this = this;
        var tempObj = {};
        for (var index = 0; index < propertyCollection.length; index++) {
            tempObj[propertyCollection[index]] = cloneObj[propertyCollection[index]];
        }
        if (innerProperty) {
            Object.keys(innerProperty).forEach(function (key) {
                tempObj[key] = _this.extendFunction(cloneObj[key], innerProperty[key], null);
            });
        }
        return tempObj;
    };
    /**
     * To format date.
     * @return {string}
     * @private
     */
    Timeline.prototype.formatDateHeader = function (dayFormat, data) {
        var date = new Date(data.getTime());
        var dateString;
        switch (dayFormat) {
            case '':
                dateString = this.parent.globalize.formatDate(date, { format: 'E' });
                dateString = dateString.slice(0, 1);
                break;
            default:
                dateString = this.parent.globalize.formatDate(date, { format: dayFormat });
        }
        return dateString;
    };
    /**
     * Custom Formatting.
     * @return {string}
     * @private
     */
    Timeline.prototype.customFormat = function (date, format, tier, mode, formatter) {
        formatter = (typeof formatter === 'string' ? getValue(formatter, window) : formatter);
        return formatter(date, format, tier, mode);
    };
    /**
     * To create timeline template .
     * @return {string}
     * @private
     */
    Timeline.prototype.createTimelineTemplate = function (tier) {
        var parent = this.parent;
        var parentTh = '';
        var parentTr = '';
        var mode = tier === 'topTier' ?
            parent.timelineModule.customTimelineSettings.topTier.unit : parent.timelineModule.customTimelineSettings.bottomTier.unit;
        var count = tier === 'topTier' ? parent.timelineModule.customTimelineSettings.topTier.count :
            parent.timelineModule.customTimelineSettings.bottomTier.count;
        var increment;
        var newTime;
        var startDate = new Date(this.parent.timelineModule.timelineStartDate.toString());
        var endDate = new Date(this.timelineRoundOffEndDate.toString());
        var scheduleDateCollection = [];
        do {
            parentTr = this.getHeaterTemplateString(new Date(startDate.toString()), mode, tier, false, count);
            scheduleDateCollection.push(new Date(startDate.toString()));
            increment = this.getIncrement(startDate, count, mode);
            newTime = startDate.getTime() + increment;
            startDate.setTime(newTime);
            if (startDate >= endDate) {
                parentTr = this.getHeaterTemplateString(scheduleDateCollection[scheduleDateCollection.length - 1], mode, tier, true, count);
            }
            parentTh = parentTh + parentTr;
            parentTr = '';
        } while (!(startDate >= endDate));
        return parentTh;
    };
    Timeline.prototype.getTimelineRoundOffEndDate = function (date) {
        var tierMode = this.topTier === 'None' ? this.bottomTier : this.topTier;
        var endDate = new Date(date.toString());
        if (this.parent.isTimelineRoundOff) {
            if (tierMode === 'Hour') {
                endDate.setMinutes(60);
            }
            else if (tierMode === 'Minutes') {
                endDate.setSeconds(60);
            }
            else {
                endDate.setHours(24, 0, 0, 0);
            }
        }
        return endDate;
    };
    /**
     *
     * @param startDate
     * @param count
     * @param mode
     * @private
     */
    Timeline.prototype.getIncrement = function (startDate, count, mode) {
        var firstDay = new Date(startDate.getTime());
        var lastDay = new Date(startDate.getTime());
        var increment;
        switch (mode) {
            case 'Year':
                firstDay = startDate;
                lastDay = new Date(startDate.getFullYear() + (count - 1), 11, 31);
                increment = ((lastDay.getTime() - firstDay.getTime())) + (1000 * 60 * 60 * 24);
                break;
            case 'Month':
                firstDay = startDate;
                lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + count, 1);
                increment = ((lastDay.getTime() - firstDay.getTime()));
                break;
            case 'Week':
                var dayIndex = this.parent.timelineModule.customTimelineSettings.weekStartDay;
                var dayIntervel = startDate.getDay() < dayIndex ? (dayIndex - startDate.getDay()) :
                    (6 - startDate.getDay()) + dayIndex;
                count = dayIntervel > 0 ? count - 1 : 0;
                lastDay.setHours(24, 0, 0, 0);
                dayIntervel = startDate.getDay() < dayIndex ? dayIntervel > 0 ?
                    dayIntervel - 1 : dayIntervel : dayIntervel;
                lastDay.setDate(lastDay.getDate() + (dayIntervel + (7 * count)));
                increment = ((lastDay.getTime() - firstDay.getTime()));
                break;
            case 'Day':
                lastDay.setHours(24, 0, 0, 0);
                increment = ((lastDay.getTime() - firstDay.getTime())) + (1000 * 60 * 60 * 24 * (count - 1));
                break;
            case 'Hour':
                lastDay.setMinutes(60);
                lastDay.setSeconds(0);
                increment = ((lastDay.getTime() - firstDay.getTime())) + (1000 * 60 * 60 * (count - 1));
                break;
            case 'Minutes':
                lastDay.setSeconds(60);
                increment = ((lastDay.getTime() - firstDay.getTime())) + (1000 * 60 * (count - 1));
                break;
        }
        return increment;
    };
    /**
     * Method to find header cell was weekend or not
     * @param mode
     * @param tier
     * @param day
     */
    Timeline.prototype.isWeekendHeaderCell = function (mode, tier, day) {
        return mode === 'Day' && this.customTimelineSettings[tier].count === 1 &&
            this.parent.nonWorkingDayIndex.indexOf(day.getDay()) !== -1;
    };
    /**
     * To construct template string.
     * @return {string}
     * @private
     */
    Timeline.prototype.getHeaterTemplateString = function (scheduleWeeks, mode, tier, isLast, count) {
        var parentTr = '';
        var td = '';
        var format = tier === 'topTier' ?
            this.parent.timelineModule.customTimelineSettings.topTier.format :
            this.parent.timelineModule.customTimelineSettings.bottomTier.format;
        var formatter = tier === 'topTier' ?
            this.parent.timelineModule.customTimelineSettings.topTier.formatter :
            this.parent.timelineModule.customTimelineSettings.bottomTier.formatter;
        var thWidth;
        var cellWidth;
        var isWeekendCell;
        var date = isNullOrUndefined(formatter) ?
            this.parent.globalize.formatDate(scheduleWeeks, { format: this.parent.dateFormat }) :
            this.customFormat(scheduleWeeks, format, tier, mode, formatter);
        thWidth = (this.getIncrement(scheduleWeeks, count, mode) / (1000 * 60 * 60 * 24)) * this.parent.perDayWidth;
        cellWidth = thWidth;
        thWidth = isLast ? this.calculateWidthBetweenTwoDate(mode, scheduleWeeks, this.timelineRoundOffEndDate)
            : thWidth;
        isWeekendCell = this.isWeekendHeaderCell(mode, tier, scheduleWeeks);
        var textClassName = tier === 'topTier' ? ' e-gantt-top-cell-text' : '';
        td += this.parent.timelineModule.isSingleTier ?
            '<th class="' + cls.timelineSingleHeaderCell + ' ' : '<th class="' + cls.timelineTopHeaderCell;
        td += isWeekendCell ? ' ' + cls.weekendHeaderCell : '';
        td += '" tabindex="-1" aria-label= "' + this.parent.localeObj.getConstant('timelineCell') + ' ' + date;
        td += '" style="width:' + thWidth + 'px;';
        td += isWeekendCell && this.customTimelineSettings.weekendBackground ?
            'background-color:' + this.customTimelineSettings.weekendBackground + ';' : '';
        td += '"><div class="' + cls.timelineHeaderCellLabel + textClassName + '" style="width:' +
            (thWidth - 1) + 'px;' + (this.parent.timelineSettings.showTooltip ? '"title="' + date : '');
        td += '">' + (isNullOrUndefined(formatter) ? this.formatDateHeader(format, scheduleWeeks) :
            this.customFormat(scheduleWeeks, format, tier, mode, formatter)) + '</div>';
        parentTr += td;
        parentTr += '</th>';
        td = '';
        if ((this.isSingleTier || tier === 'topTier') && !isLast) {
            this.totalTimelineWidth = this.totalTimelineWidth + thWidth;
        }
        else if ((this.isSingleTier || tier === 'topTier') && isLast) {
            this.totalTimelineWidth = (this.totalTimelineWidth - cellWidth) + thWidth;
        }
        return parentTr;
    };
    /**
     * To calculate last 'th' width.
     * @return {number}
     * @private
     */
    Timeline.prototype.calculateWidthBetweenTwoDate = function (mode, scheduleWeeks, endDate) {
        var balanceDay = ((endDate.getTime() - scheduleWeeks.getTime()) / (1000 * 60 * 60 * 24));
        return balanceDay * this.parent.perDayWidth;
    };
    /**
     * To calculate timeline width.
     * @return {void}
     * @private
     */
    Timeline.prototype.timelineWidthCalculation = function () {
        var timelineUnitSize = this.customTimelineSettings.timelineUnitSize;
        var bottomTierCount = this.customTimelineSettings.bottomTier.count;
        var topTierCount = this.customTimelineSettings.topTier.count;
        this.bottomTierCellWidth = timelineUnitSize;
        switch (this.bottomTier) {
            case 'None':
                this.parent.perDayWidth = this.getPerDayWidth(timelineUnitSize, topTierCount, this.topTier);
                break;
            default:
                this.parent.perDayWidth = this.getPerDayWidth(timelineUnitSize, bottomTierCount, this.bottomTier);
                break;
        }
        this.topTierCellWidth = this.bottomTier !== 'None' ? this.topTier === 'Week' ?
            this.parent.perDayWidth * 7 : this.topTier === 'Hour' ?
            this.parent.perDayWidth / 24 : this.topTier === 'Minutes' ?
            this.parent.perDayWidth / (24 * 60) : this.parent.perDayWidth : timelineUnitSize;
        this.topTierCellWidth = this.isSingleTier ? this.topTierCellWidth : this.topTierCellWidth * topTierCount;
    };
    /**
     * To validate per day width.
     * @return {number}
     * @private
     */
    Timeline.prototype.getPerDayWidth = function (timelineUnitSize, bottomTierCount, mode) {
        var perDayWidth;
        switch (mode) {
            case 'Year':
                perDayWidth = (timelineUnitSize / bottomTierCount) / (12 * 28);
                break;
            case 'Month':
                perDayWidth = (timelineUnitSize / bottomTierCount) / 28;
                break;
            case 'Week':
                perDayWidth = (timelineUnitSize / bottomTierCount) / 7;
                break;
            case 'Day':
                perDayWidth = timelineUnitSize / bottomTierCount;
                break;
            case 'Hour':
                perDayWidth = (24 / bottomTierCount) * timelineUnitSize;
                break;
            case 'Minutes':
                perDayWidth = ((60 * 24) / bottomTierCount) * timelineUnitSize;
                break;
        }
        return perDayWidth;
    };
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    Timeline.prototype.roundOffDays = function () {
        var startDate = this.parent.cloneProjectStartDate;
        var endDate = this.parent.cloneProjectEndDate;
        var tierMode = this.topTier === 'None' ? this.bottomTier : this.topTier;
        if (this.parent.isTimelineRoundOff) {
            if (tierMode === 'Year') {
                startDate = new Date(startDate.getFullYear(), 0, 1);
                endDate = new Date(endDate.getFullYear(), 11, 31);
            }
            else if (tierMode === 'Month') {
                startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
            }
            else if (tierMode === 'Week') {
                var dayIndex = this.parent.timelineModule.customTimelineSettings.weekStartDay;
                var roundOffStartDate = startDate.getDay() < dayIndex ?
                    (startDate.getDate()) - (7 - dayIndex + startDate.getDay()) :
                    (startDate.getDate()) - startDate.getDay() + dayIndex;
                startDate.setDate(roundOffStartDate);
                var first = endDate.getDate() - endDate.getDay();
                var last = first + 6 + dayIndex;
                endDate.setDate(last);
            }
            if (tierMode === 'Hour') {
                startDate.setMinutes(0);
            }
            else if (tierMode === 'Minutes') {
                startDate.setSeconds(0);
            }
            else {
                startDate.setHours(0, 0, 0, 0);
            }
        }
        this.timelineStartDate = startDate;
        this.timelineEndDate = endDate;
        this.timelineRoundOffEndDate = this.getTimelineRoundOffEndDate(this.timelineEndDate);
    };
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    Timeline.prototype.updateScheduleDatesByToolBar = function (mode, span, startDate, endDate) {
        if (mode === 'Year') {
            if (span === 'prevTimeSpan') {
                if (startDate.getMonth() === 0) {
                    startDate = new Date(startDate.getFullYear() - 1, 0, 1);
                }
                else {
                    startDate = new Date(startDate.getFullYear(), 0, 1);
                }
            }
            else {
                if (endDate.getMonth() === 11) {
                    endDate = new Date(endDate.getFullYear() + 1, 0, 1);
                }
                else {
                    endDate = new Date(endDate.getFullYear(), 12, 1);
                }
            }
        }
        if (mode === 'Month') {
            if (span === 'prevTimeSpan') {
                if (startDate.getDate() === 1) {
                    startDate = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
                }
                else {
                    startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
                }
            }
            else {
                endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
            }
        }
        if (mode === 'Week') {
            var dayIndex = this.parent.timelineModule.customTimelineSettings.weekStartDay;
            var dayIntervel = void 0;
            if (span === 'prevTimeSpan') {
                dayIntervel = startDate.getDay() < dayIndex ? 7 - (dayIndex - startDate.getDay()) :
                    startDate.getDay() - dayIndex;
                startDate.setHours(0, 0, 0, 0);
                if (dayIntervel === 0) {
                    startDate.setDate(startDate.getDate() - 7);
                }
                else {
                    startDate.setDate(startDate.getDate() - dayIntervel);
                }
            }
            else {
                dayIntervel = endDate.getDay() < dayIndex ? (dayIndex - endDate.getDay()) :
                    (7 - endDate.getDay()) + dayIndex;
                endDate.setHours(0, 0, 0, 0);
                if (dayIntervel === 0) {
                    endDate.setDate(endDate.getDate() + 6);
                }
                else {
                    endDate.setDate(endDate.getDate() + dayIntervel);
                }
            }
        }
        if (mode === 'Day') {
            if (span === 'prevTimeSpan') {
                if (startDate.getHours() === 0) {
                    startDate.setTime(startDate.getTime() - (1000 * 60 * 60 * 24));
                }
                else {
                    startDate.setHours(0);
                }
            }
            else {
                if (endDate.getHours() === 0) {
                    endDate.setTime(endDate.getTime() + (1000 * 60 * 60 * 24));
                }
                else {
                    endDate.setHours(24);
                }
            }
        }
        if (mode === 'Hour') {
            if (span === 'prevTimeSpan') {
                if (startDate.getMinutes() === 0) {
                    startDate.setTime(startDate.getTime() - (1000 * 60 * 60));
                }
                else {
                    startDate.setMinutes(0);
                }
            }
            else {
                if (endDate.getMinutes() === 0) {
                    endDate.setTime(endDate.getTime() + (1000 * 60 * 60));
                }
                else {
                    endDate.setMinutes(60);
                }
            }
        }
        if (mode === 'Minutes') {
            if (span === 'prevTimeSpan') {
                if (startDate.getSeconds() === 0) {
                    startDate.setTime(startDate.getTime() - (1000 * 60));
                }
                else {
                    startDate.setSeconds(0);
                }
            }
            else {
                if (endDate.getSeconds() === 0) {
                    endDate.setTime(endDate.getTime() + (1000 * 60));
                }
                else {
                    endDate.setSeconds(60);
                }
            }
        }
        this.parent.cloneProjectStartDate = startDate;
        this.parent.cloneProjectEndDate = endDate;
    };
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    Timeline.prototype.updateTimeLineOnEditing = function (tempArray, action) {
        var filteredStartDateRecord = tempArray.filter(function (pdc) { return !isNullOrUndefined(pdc.ganttProperties.startDate); });
        var filteredEndDateRecord = tempArray.filter(function (pdc) { return !isNullOrUndefined(pdc.ganttProperties.endDate); });
        var minStartDate = filteredStartDateRecord.length > 0 ?
            new Date(DataUtil.aggregates.min(filteredStartDateRecord, 'ganttProperties.startDate')) : null;
        var maxEndDate = filteredEndDateRecord.length > 0 ?
            new Date(DataUtil.aggregates.max(filteredEndDateRecord, 'ganttProperties.endDate')) : null;
        var validStartDate = new Date(this.parent.dataOperation.checkStartDate(this.timelineStartDate).getTime());
        var validEndDate = new Date(this.parent.dataOperation.checkEndDate(this.timelineEndDate).getTime());
        var maxStartLeft = isNullOrUndefined(minStartDate) ?
            null : this.parent.dataOperation.getTaskLeft(minStartDate, false);
        var maxEndLeft = isNullOrUndefined(maxEndDate) ?
            null : this.parent.dataOperation.getTaskLeft(maxEndDate, false);
        var validStartLeft = this.parent.dataOperation.getTaskLeft(validStartDate, false);
        var validEndLeft = this.parent.dataOperation.getTaskLeft(validEndDate, false);
        var isChanged;
        if (!isNullOrUndefined(maxStartLeft) && (maxStartLeft <= this.bottomTierCellWidth || maxStartLeft <= validStartLeft)) {
            isChanged = 'prevTimeSpan';
            minStartDate = minStartDate > this.timelineStartDate ? this.timelineStartDate : minStartDate;
        }
        else {
            minStartDate = this.timelineStartDate;
        }
        if (!isNullOrUndefined(maxEndLeft) && (maxEndLeft >= (this.totalTimelineWidth - this.bottomTierCellWidth) ||
            maxEndLeft >= validEndLeft)) {
            isChanged = isChanged === 'prevTimeSpan' ? 'both' : 'nextTimeSpan';
            maxEndDate = maxEndDate < this.timelineEndDate ? this.timelineEndDate : maxEndDate;
        }
        else {
            maxEndDate = this.timelineEndDate;
        }
        if (isChanged) {
            this.performTimeSpanAction(isChanged, action, minStartDate, maxEndDate);
        }
    };
    /**
     * To validate project start date and end date on editing action
     * @return {void}
     * @private
     */
    Timeline.prototype.performTimeSpanAction = function (type, isFrom, startDate, endDate, mode) {
        mode = !isNullOrUndefined(mode) ? mode : this.parent.timelineModule.topTier === 'None' ?
            this.parent.timelineModule.bottomTier : this.parent.timelineModule.topTier;
        var projectStartDate = new Date(this.parent.cloneProjectStartDate.getTime());
        var projectEndDate = new Date(this.parent.cloneProjectEndDate.getTime());
        if (isFrom !== 'publicMethod' && type === 'both') {
            this.updateScheduleDatesByToolBar(mode, 'prevTimeSpan', startDate, endDate);
            this.updateScheduleDatesByToolBar(mode, 'nextTimeSpan', new Date(this.parent.cloneProjectStartDate.getTime()), endDate);
        }
        else {
            this.updateScheduleDatesByToolBar(mode, type, startDate, endDate);
        }
        var args = this.timeSpanActionEvent('actionBegin', type, isFrom);
        if (!args.cancel) {
            this.parent.updateProjectDates(args.projectStartDate, args.ProjectEndDate, args.isTimelineRoundOff, isFrom);
            if (type === 'prevTimeSpan' && isFrom === 'publicMethod') {
                this.parent.ganttChartModule.updateScrollLeft(0);
            }
            else if (type === 'nextTimeSpan' && isFrom === 'publicMethod') {
                this.parent.ganttChartModule.updateScrollLeft(this.parent.timelineModule.totalTimelineWidth);
            }
            this.parent.timelineModule.timeSpanActionEvent('actionComplete', type, isFrom);
        }
        else {
            this.parent.cloneProjectStartDate = projectStartDate;
            this.parent.cloneProjectEndDate = projectEndDate;
        }
    };
    /**
     * To validate project start date and end date.
     * @return {void}
     * @private
     */
    Timeline.prototype.timeSpanActionEvent = function (eventType, requestType, isFrom) {
        var args = {};
        args.projectStartDate = new Date(this.parent.cloneProjectStartDate.getTime());
        args.ProjectEndDate = new Date(this.parent.cloneProjectEndDate.getTime());
        args.requestType = isFrom === 'publicMethod' ? requestType : isFrom === 'beforeAdd' ?
            'TimelineRefreshOnAdd' : isFrom === 'TaskbarEditing' ? 'TimelineRefreshOnEdit' : requestType;
        if (eventType === 'actionBegin') {
            args.isTimelineRoundOff = this.parent.isTimelineRoundOff;
            args.cancel = false;
        }
        this.parent.trigger(eventType, args);
        return args;
    };
    return Timeline;
}());
export { Timeline };
