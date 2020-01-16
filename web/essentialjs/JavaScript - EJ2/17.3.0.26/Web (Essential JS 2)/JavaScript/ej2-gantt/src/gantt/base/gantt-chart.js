import { createElement, formatUnit, EventHandler, Browser, isBlazor, getElement } from '@syncfusion/ej2-base';
import { isNullOrUndefined, closest, addClass, removeClass, getValue, setValue } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { ChartScroll } from '../actions/chart-scroll';
import { click } from '@syncfusion/ej2-grids';
/**
 * module to render gantt chart - project view
 */
var GanttChart = /** @class */ (function () {
    function GanttChart(parent) {
        this.isExpandCollapseFromChart = false;
        this.isExpandAll = false;
        this.parent = parent;
        this.chartTimelineContainer = null;
        this.addEventListener();
    }
    GanttChart.prototype.addEventListener = function () {
        this.parent.on('renderPanels', this.renderChartContainer, this);
        this.parent.on('recordsUpdated', this.renderChartElements, this);
        this.parent.on('dataReady', this.renderInitialContents, this);
        this.parent.on('tree-grid-created', this.renderChartContents, this);
        this.parent.on('destroy', this.destroy, this);
    };
    GanttChart.prototype.renderChartContents = function () {
        this.parent.notify('refreshDayMarkers', {});
        this.wireEvents();
    };
    /**
     * Method to render top level containers in Gantt chart
     * @private
     */
    GanttChart.prototype.renderChartContainer = function () {
        this.chartElement = createElement('div', { id: this.parent.element.id + 'GanttChart', className: cls.ganttChart });
        this.parent.chartPane.appendChild(this.chartElement);
        this.renderTimelineContainer();
        this.renderBodyContainers();
        // render top level div header and content
        // Get timeline header from timeline class file and append to header div
        // render content div
        // Render scroll able div
        // Render container for all element like, table, weekend and holidays
        // Get rows element from rows renderer class
        // Get label related info label renderer class
        // Get baseline from baseline renderer class
        // Get weekend elements from weekend-holidays renderer class
    };
    /**
     * method to render timeline, holidays, weekends at load time
     */
    GanttChart.prototype.renderInitialContents = function () {
        this.parent.timelineModule.createTimelineSeries();
    };
    GanttChart.prototype.renderChartElements = function () {
        this.parent.chartRowsModule.renderChartRows();
        this.parent.connectorLineModule.renderConnectorLines(this.parent.updatedConnectorLineCollection);
        this.updateWidthAndHeight();
        this.parent.notify('selectRowByIndex', {});
    };
    /**
     * @private
     */
    GanttChart.prototype.renderTimelineContainer = function () {
        this.chartTimelineContainer =
            createElement('div', { className: cls.timelineHeaderContainer });
        this.chartElement.appendChild(this.chartTimelineContainer);
    };
    /**
     * initiate chart container
     */
    GanttChart.prototype.renderBodyContainers = function () {
        this.chartBodyContainer = createElement('div', { className: cls.chartBodyContainer });
        this.chartElement.appendChild(this.chartBodyContainer);
        this.scrollElement = createElement('div', {
            className: cls.chartScrollElement + ' ' + cls.scrollContent, styles: 'position:relative;'
        });
        this.chartBodyContainer.appendChild(this.scrollElement);
        this.chartBodyContent = createElement('div', { className: cls.chartBodyContent, styles: 'position:relative; overflow: hidden;' });
        this.scrollElement.appendChild(this.chartBodyContent);
        // this.parent.chartRowsModule.createChartTable();
        this.scrollObject = new ChartScroll(this.parent);
        //this.scrollObject.setWidth(this.chartProperties.width);
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        this.scrollObject.
            setHeight(this.parent.ganttHeight - this.chartTimelineContainer.offsetHeight - toolbarHeight);
    };
    GanttChart.prototype.updateWidthAndHeight = function () {
        this.chartBodyContent.style.height = formatUnit(this.parent.contentHeight);
        //let element: HTMLElement = this.chartTimelineContainer.querySelector('.' + cls.timelineHeaderTableContainer);
        this.chartBodyContent.style.width = formatUnit(this.parent.timelineModule.totalTimelineWidth);
        this.parent.notify('updateHeight', {});
        this.parent.updateGridLineContainerHeight();
        this.updateLastRowBottomWidth();
    };
    /**
     * Method to update bottom border for chart rows
     */
    GanttChart.prototype.updateLastRowBottomWidth = function () {
        if (this.parent.currentViewData.length > 0 && this.parent.height !== 'auto') {
            var expandedRecords = this.parent.getExpandedRecords(this.parent.currentViewData);
            var lastExpandedRow = expandedRecords[expandedRecords.length - 1];
            var lastExpandedRowIndex = this.parent.currentViewData.indexOf(lastExpandedRow);
            var lastRow = this.parent.getRowByIndex(lastExpandedRowIndex);
            var table = this.parent.chartRowsModule.ganttChartTableBody;
            if (table.querySelectorAll('.e-chart-row-cell.e-chart-row-border.e-lastrow')) {
                removeClass(table.querySelectorAll('.e-chart-row-cell.e-chart-row-border.e-lastrow'), 'e-lastrow');
            }
            if (this.chartBodyContent.clientHeight < this.chartBodyContainer.clientHeight) {
                if (lastRow) {
                    addClass(lastRow.querySelectorAll('td'), 'e-lastrow');
                    this.chartBodyContent.style.height = formatUnit(this.parent.contentHeight + 1);
                }
            }
        }
    };
    GanttChart.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('renderPanels', this.renderChartContainer);
        this.parent.off('recordsUpdated', this.renderChartElements);
        this.parent.off('dataReady', this.renderInitialContents);
        this.parent.off('tree-grid-created', this.renderChartContents);
        this.parent.off('destroy', this.destroy);
    };
    /**
     * Click event handler in chart side
     */
    GanttChart.prototype.ganttChartMouseDown = function (e) {
        if (e.which !== 3) {
            this.parent.notify('chartMouseDown', e);
            this.parent.element.tabIndex = 0;
        }
    };
    GanttChart.prototype.ganttChartMouseClick = function (e) {
        if (this.parent.autoFocusTasks) {
            this.scrollToTarget(e); /** Scroll to task */
        }
        this.parent.notify('chartMouseClick', e);
    };
    GanttChart.prototype.ganttChartMouseUp = function (e) {
        this.parent.notify('chartMouseUp', e);
    };
    /**
     *
     * @param e
     */
    GanttChart.prototype.scrollToTarget = function (e) {
        var row = closest(e.target, 'tr');
        if (row && this.parent.element.contains(row) &&
            (this.parent.element.querySelectorAll('.e-chart-rows-container')[0].contains(e.target) ||
                this.parent.element.querySelectorAll('.e-gridcontent')[0].contains(e.target)) &&
            this.parent.currentViewData.length > 0) {
            var rowIndex = getValue('rowIndex', closest(e.target, 'tr'));
            var dateObject = this.parent.currentViewData[rowIndex].ganttProperties.startDate;
            if (!isNullOrUndefined(dateObject)) {
                var left = this.parent.dataOperation.getTaskLeft(dateObject, false);
                if (this.parent.autoFocusTasks) {
                    this.updateScrollLeft(left);
                }
            }
        }
    };
    /**
     * To focus selected task in chart side
     * @private
     */
    GanttChart.prototype.updateScrollLeft = function (scrollLeft) {
        scrollLeft = scrollLeft - 50 > 0 ? scrollLeft - 50 : 0;
        scrollLeft = this.scrollElement.scrollWidth <= scrollLeft ? this.scrollElement.scrollWidth : scrollLeft;
        if ((this.scrollElement.offsetWidth + this.parent.ganttChartModule.scrollElement.scrollLeft) < scrollLeft
            || (this.scrollElement.scrollLeft > scrollLeft)) {
            this.scrollObject.setScrollLeft(scrollLeft);
        }
    };
    /**
     *  Method trigger while perform mouse up action.
     * @return {void}
     * @private
     */
    GanttChart.prototype.documentMouseUp = function (e) {
        if (this.parent.isDestroyed || e.which === 3) {
            return;
        }
        var isTaskbarEdited = false;
        if (this.parent.editSettings.allowTaskbarEditing &&
            getValue('editModule.taskbarEditModule.isMouseDragged', this.parent) &&
            getValue('editModule.taskbarEditModule.taskBarEditAction', this.parent)) {
            isTaskbarEdited = true;
        }
        this.parent.notify('chartMouseUp', e);
        if (!isTaskbarEdited) {
            /** Expand/collapse action */
            var target = e.target;
            var isOnTaskbarElement = e.target.classList.contains(cls.taskBarMainContainer)
                || closest(e.target, '.' + cls.taskBarMainContainer);
            if (closest(target, '.e-gantt-parent-taskbar')) {
                this.chartExpandCollapseRequest(e);
            }
            else if (!isOnTaskbarElement && this.parent.autoFocusTasks) {
                this.scrollToTarget(e); /** Scroll to task */
            }
        }
        if (this.parent.editModule && this.parent.editModule.taskbarEditModule) {
            this.parent.editModule.taskbarEditModule.removeFalseLine(true);
        }
    };
    /**
     *  Method trigger while perform mouse leave action.
     * @return {void}
     * @private
     */
    GanttChart.prototype.ganttChartLeave = function (e) {
        this.parent.notify('chartMouseLeave', e);
    };
    /**
     *  Method trigger while perform mouse move action.
     * @return {void}
     * @private
     */
    GanttChart.prototype.ganttChartMove = function (e) {
        this.parent.notify('chartMouseMove', e);
        if (!isNullOrUndefined(this.parent.taskFields.dependency) && this.parent.connectorLineEditModule) {
            this.parent.connectorLineEditModule.updateConnectorLineEditElement(e);
        }
    };
    /**
     * Double click handler for chart
     * @param e
     */
    GanttChart.prototype.doubleClickHandler = function (e) {
        this.parent.notify('chartDblClick', e);
    };
    /**
     * @private
     */
    GanttChart.prototype.getRecordByTarget = function (e) {
        var row = closest(e.target, 'tr');
        var ganttData;
        if (row) {
            var rowIndex = getValue('rowIndex', closest(e.target, 'tr'));
            ganttData = this.parent.currentViewData[rowIndex];
        }
        return ganttData;
    };
    /**
     * To get gantt chart row elements
     * @return {NodeListOf<Element>}
     * @private
     */
    GanttChart.prototype.getChartRows = function () {
        return document.getElementById(this.parent.element.id + 'GanttTaskTableBody').querySelectorAll('.e-chart-row');
    };
    /**
     * Expand Collapse operations from gantt chart side
     * @return {void}
     * @param target
     * @private
     */
    GanttChart.prototype.chartExpandCollapseRequest = function (e) {
        var target = e.target;
        var parentElement = closest(target, '.e-gantt-parent-taskbar');
        var record = this.getRecordByTarget(e);
        var chartRow = closest(target, 'tr');
        var rowIndex = getValue('rowIndex', chartRow);
        var gridRow = this.parent.treeGrid.getRows()[rowIndex];
        var args = { data: record, gridRow: gridRow, chartRow: chartRow, cancel: false };
        this.isExpandCollapseFromChart = true;
        if (parentElement.classList.contains('e-row-expand')) {
            this.collapseGanttRow(args);
        }
        else if (parentElement.classList.contains('e-row-collapse')) {
            this.expandGanttRow(args);
        }
    };
    /**
     * @private
     */
    GanttChart.prototype.reRenderConnectorLines = function () {
        this.parent.connectorLineModule.dependencyViewContainer.innerHTML = '';
        var expandedRecords = this.parent.getExpandedRecords(this.parent.currentViewData);
        this.parent.connectorLineIds = [];
        this.parent.updatedConnectorLineCollection = [];
        this.parent.predecessorModule.createConnectorLinesCollection(expandedRecords);
        this.parent.connectorLineModule.renderConnectorLines(this.parent.updatedConnectorLineCollection);
    };
    /**
     * To collapse gantt rows
     * @return {void}
     * @param args
     * @private
     */
    GanttChart.prototype.collapseGanttRow = function (args, isCancel) {
        var _this = this;
        if (isCancel) {
            this.collapsedGanttRow(args);
        }
        else {
            this.parent.trigger('collapsing', args, function (args) {
                if (_this.isExpandCollapseFromChart && !getValue('cancel', args)) {
                    if (isBlazor()) {
                        setValue('chartRow', getElement(getValue('chartRow', args)), args);
                        setValue('gridRow', getElement(getValue('gridRow', args)), args);
                    }
                    _this.collapsedGanttRow(args);
                }
                _this.isExpandCollapseFromChart = false;
            });
        }
    };
    /**
     * @return {void}
     * @param args
     * @private
     */
    GanttChart.prototype.collapsedGanttRow = function (args) {
        var record = getValue('data', args);
        if (this.isExpandCollapseFromChart) {
            this.expandCollapseChartRows('collapse', getValue('chartRow', args), record, null);
            this.parent.treeGrid.collapseRow(getValue('gridRow', args), record);
            this.isExpandCollapseFromChart = false;
        }
        else {
            this.expandCollapseChartRows('collapse', getValue('chartRow', args), record, null);
        }
        this.parent.updateContentHeight();
        this.updateWidthAndHeight();
        this.reRenderConnectorLines();
        getValue('chartRow', args).setAttribute('aria-expanded', 'false');
        this.parent.trigger('collapsed', args);
    };
    /**
     * To expand gantt rows
     * @return {void}
     * @param args
     * @private
     */
    GanttChart.prototype.expandGanttRow = function (args, isCancel) {
        var _this = this;
        if (isCancel) {
            this.expandedGanttRow(args);
        }
        else {
            this.parent.trigger('expanding', args, function (args) {
                if (isBlazor()) {
                    setValue('chartRow', getElement(getValue('chartRow', args)), args);
                    setValue('gridRow', getElement(getValue('gridRow', args)), args);
                }
                if (_this.isExpandCollapseFromChart && !getValue('cancel', args)) {
                    _this.expandedGanttRow(args);
                }
                _this.isExpandCollapseFromChart = false;
            });
        }
    };
    /**
     * @return {void}
     * @param args
     * @private
     */
    GanttChart.prototype.expandedGanttRow = function (args) {
        var record = getValue('data', args);
        if (this.isExpandCollapseFromChart) {
            this.expandCollapseChartRows('expand', getValue('chartRow', args), record, null);
            this.parent.treeGrid.expandRow(getValue('gridRow', args), record);
            this.isExpandCollapseFromChart = false;
        }
        else {
            this.expandCollapseChartRows('expand', getValue('chartRow', args), record, null);
        }
        this.parent.updateContentHeight();
        this.updateWidthAndHeight();
        this.reRenderConnectorLines();
        getValue('chartRow', args).setAttribute('aria-expanded', 'true');
        this.parent.trigger('expanded', args);
    };
    /**
     * On expand collapse operation row properties will be updated here.
     * @return {void}
     * @param action
     * @param rowElement
     * @param record
     * @param isChild
     * @private
     */
    GanttChart.prototype.expandCollapseChartRows = function (action, rowElement, record, isChild) {
        var displayType;
        if (action === 'expand') {
            displayType = 'table-row';
            if (!isChild) {
                record.expanded = true;
            }
            var targetElement = rowElement.querySelectorAll('.e-row-collapse');
            for (var t = 0; t < targetElement.length; t++) {
                addClass([targetElement[t]], 'e-row-expand');
                removeClass([targetElement[t]], 'e-row-collapse');
            }
        }
        else if (action === 'collapse') {
            displayType = 'none';
            if (!isChild) {
                record.expanded = false;
            }
            var targetElement = rowElement.querySelectorAll('.e-row-expand');
            for (var t = 0; t < targetElement.length; t++) {
                addClass([targetElement[t]], 'e-row-collapse');
                removeClass([targetElement[t]], 'e-row-expand');
            }
        }
        var childRecords = record.childRecords;
        var chartRows = this.getChartRows();
        var rows = [];
        for (var i = 0; i < chartRows.length; i++) {
            if (chartRows[i].classList.contains('gridrowtaskId'
                + record.ganttProperties.taskId + 'level' + (record.level + 1))) {
                rows.push(chartRows[i]);
            }
        }
        for (var i = 0; i < rows.length; i++) {
            rows[i].style.display = displayType;
            if ((childRecords[i].childRecords && childRecords[i].childRecords.length)
                && (action === 'collapse' || childRecords[i].expanded || this.isExpandAll)) {
                this.expandCollapseChartRows(action, rows[i], childRecords[i], true);
            }
        }
    };
    /**
     * Public method to expand or collapse all the rows of Gantt
     * @return {void}
     * @param action
     * @private
     */
    GanttChart.prototype.expandCollapseAll = function (action) {
        if (action === 'expand') {
            this.isExpandAll = true;
            this.parent.treeGrid.expandAll();
        }
        else {
            this.parent.treeGrid.collapseAll();
        }
        this.isExpandAll = false;
        var focussedElement = this.parent.element.querySelector('.e-treegrid');
        focussedElement.focus();
    };
    /**
     * Public method to expand particular level of rows.
     * @return {void}
     * @param level
     * @private
     */
    GanttChart.prototype.expandAtLevel = function (level) {
        this.parent.treeGrid.expandAtLevel(level);
    };
    /**
     * Public method to collapse particular level of rows.
     * @return {void}
     * @param level
     * @private
     */
    GanttChart.prototype.collapseAtLevel = function (level) {
        this.parent.treeGrid.collapseAtLevel(level);
    };
    /**
     * Event Binding for gantt chart click
     */
    GanttChart.prototype.wireEvents = function () {
        var isIE11Pointer = Browser.isPointer;
        var mouseDown = Browser.touchStartEvent;
        var mouseUp = Browser.touchEndEvent;
        var mouseMove = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        if (this.parent.editSettings.allowTaskbarEditing) {
            EventHandler.add(this.parent.chartPane, mouseDown, this.ganttChartMouseDown, this);
            EventHandler.add(this.parent.chartPane, cancel, this.ganttChartLeave, this);
            EventHandler.add(this.parent.chartPane, mouseMove, this.ganttChartMove, this);
            if (this.parent.isAdaptive) {
                EventHandler.add(this.parent.chartPane, click, this.ganttChartMouseClick, this);
                EventHandler.add(this.parent.chartPane, mouseUp, this.ganttChartMouseUp, this);
            }
        }
        if (!this.parent.isAdaptive) {
            EventHandler.add(document.body, mouseUp, this.documentMouseUp, this);
        }
        if (this.parent.editSettings.allowEditing) {
            EventHandler.add(this.parent.chartRowsModule.ganttChartTableBody, 'dblclick', this.doubleClickHandler, this);
        }
    };
    GanttChart.prototype.unWireEvents = function () {
        var isIE11Pointer = Browser.isPointer;
        var mouseDown = Browser.touchStartEvent;
        var mouseUp = Browser.touchEndEvent;
        var mouseMove = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        if (this.parent.editSettings.allowTaskbarEditing) {
            EventHandler.remove(this.parent.chartRowsModule.ganttChartTableBody, mouseDown, this.ganttChartMouseDown);
            EventHandler.remove(this.parent.chartPane, cancel, this.ganttChartLeave);
            EventHandler.remove(this.parent.chartPane, mouseMove, this.ganttChartMove);
            if (this.parent.isAdaptive) {
                EventHandler.remove(this.parent.chartPane, click, this.ganttChartMouseClick);
                EventHandler.remove(this.parent.chartPane, mouseUp, this.ganttChartMouseUp);
            }
        }
        if (!this.parent.isAdaptive) {
            EventHandler.remove(document.body, mouseUp, this.documentMouseUp);
        }
        if (this.parent.editSettings.allowEditing) {
            EventHandler.remove(this.parent.chartPane, 'dblclick', this.doubleClickHandler);
        }
    };
    /**
     * To get record by taskbar element.
     * @return {IGanttData}
     * @private
     */
    GanttChart.prototype.getRecordByTaskBar = function (target) {
        var item = this.parent.currentViewData[this.getIndexByTaskBar(target)];
        return item;
    };
    /**
     * To get index by taskbar element.
     * @return {number}
     * @private
     */
    GanttChart.prototype.getIndexByTaskBar = function (target) {
        var row = closest(target, 'tr.' + cls.chartRow);
        var recordIndex = [].slice.call(this.parent.chartRowsModule.ganttChartTableBody.childNodes).indexOf(row);
        return recordIndex;
    };
    GanttChart.prototype.destroy = function () {
        this.removeEventListener();
        this.unWireEvents();
        this.scrollObject.destroy();
        this.scrollObject = null;
    };
    return GanttChart;
}());
export { GanttChart };
