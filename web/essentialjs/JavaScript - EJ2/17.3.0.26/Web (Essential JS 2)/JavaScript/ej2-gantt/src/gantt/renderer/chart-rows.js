import { createElement, isNullOrUndefined, extend, compile } from '@syncfusion/ej2-base';
import { formatUnit, updateBlazorTemplate, resetBlazorTemplate, isBlazor } from '@syncfusion/ej2-base';
import { isScheduledTask } from '../base/utils';
import * as cls from '../base/css-constants';
/**
 * To render the chart rows in Gantt
 */
var ChartRows = /** @class */ (function () {
    function ChartRows(ganttObj) {
        this.taskBarHeight = 0;
        this.milestoneHeight = 0;
        this.milesStoneRadius = 0;
        this.baselineTop = 0;
        this.baselineHeight = 3;
        this.touchLeftConnectorpoint = '';
        this.touchRightConnectorpoint = '';
        this.parent = ganttObj;
        this.initPublicProp();
        this.addEventListener();
    }
    /**
     * To initialize the public property.
     * @return {void}
     * @private
     */
    ChartRows.prototype.initPublicProp = function () {
        this.ganttChartTableBody = null;
    };
    ChartRows.prototype.addEventListener = function () {
        this.parent.on('renderPanels', this.createChartTable, this);
        this.parent.on('dataReady', this.initiateTemplates, this);
        this.parent.on('destroy', this.destroy, this);
    };
    ChartRows.prototype.refreshChartByTimeline = function () {
        this.taskTable.style.width = formatUnit(this.parent.timelineModule.totalTimelineWidth);
        this.refreshGanttRows();
    };
    /**
     * To render chart rows.
     * @return {void}
     * @private
     */
    ChartRows.prototype.createChartTable = function () {
        this.taskTable = createElement('table', {
            className: cls.taskTable + ' ' + cls.zeroSpacing, id: 'GanttTaskTable' + this.parent.element.id,
            styles: 'z-index: 2;position: absolute;width:' + this.parent.timelineModule.totalTimelineWidth + 'px;',
            attrs: { cellspacing: '0.25px' }
        });
        var colgroup = createElement('colgroup');
        var column = createElement('col', { styles: 'width:' + this.parent.timelineModule.totalTimelineWidth + 'px;' });
        colgroup.appendChild(column);
        this.taskTable.appendChild(colgroup);
        this.ganttChartTableBody = createElement('tbody', {
            id: this.parent.element.id + 'GanttTaskTableBody'
        });
        this.taskTable.appendChild(this.ganttChartTableBody);
        this.parent.ganttChartModule.chartBodyContent.appendChild(this.taskTable);
    };
    ChartRows.prototype.initiateTemplates = function () {
        this.taskTable.style.width = formatUnit(this.parent.timelineModule.totalTimelineWidth);
        this.initChartHelperPrivateVariable();
        this.initializeChartTemplate();
    };
    /**
     * To render chart rows.
     * @return {void}
     * @private
     */
    ChartRows.prototype.renderChartRows = function () {
        this.createTaskbarTemplate();
        this.triggerQueryTaskbarInfo();
        this.parent.isGanttChartRendered = true;
    };
    /**
     * To get gantt Indicator.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getIndicatorNode = function (indicator) {
        var templateString = '<label class="' + cls.label + ' ' + cls.taskIndicatorDiv + '"  style="line-height:'
            + (this.parent.rowHeight) + 'px;' +
            'left:' + this.getIndicatorleft(indicator.date) + 'px;"><i class="' + indicator.iconClass + '"></i> </label>';
        return this.createDivElement(templateString);
    };
    /**
     * To get gantt Indicator.
     * @return {number}
     * @private
     */
    ChartRows.prototype.getIndicatorleft = function (date) {
        date = this.parent.dateValidationModule.getDateFromFormat(date);
        var left = this.parent.dataOperation.getTaskLeft(date, false);
        return left;
    };
    /**
     * To get child taskbar Node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getChildTaskbarNode = function (i) {
        var childTaskbarNode = null;
        var data = this.templateData;
        if (this.childTaskbarTemplateFunction) {
            childTaskbarNode = this.childTaskbarTemplateFunction(extend({ index: i }, data), this.parent, 'TaskbarTemplate', this.getTemplateID('TaskbarTemplate'), false);
        }
        else {
            var labelString = '';
            if (this.taskLabelTemplateFunction) {
                var taskLabelTemplateNode = this.taskLabelTemplateFunction(extend({ index: i }, data), this.parent, 'TaskLabelTemplate', this.getTemplateID('TaskLabelTemplate'), false);
                var tempDiv = createElement('div');
                tempDiv.appendChild(taskLabelTemplateNode[0]);
                labelString = tempDiv.innerHTML;
            }
            else {
                labelString = this.getTaskLabel(this.parent.labelSettings.taskLabel);
                labelString = labelString === 'isCustomTemplate' ? this.parent.labelSettings.taskLabel : labelString;
            }
            var template = (data.ganttProperties.startDate && data.ganttProperties.endDate
                && data.ganttProperties.duration) ? ('<div class="' + cls.childTaskBarInnerDiv + ' ' + cls.traceChildTaskBar + '"' +
                'style="width:' + data.ganttProperties.width + 'px;height:' +
                (this.taskBarHeight) + 'px;">' + '<div class="' + cls.childProgressBarInnerDiv + ' ' +
                cls.traceChildProgressBar + '"' +
                ' style="border-style:' + (data.ganttProperties.progressWidth ? 'solid;' : 'none;') +
                'width:' + data.ganttProperties.progressWidth + 'px;height:100%;' +
                'border-top-right-radius:' + this.getBorderRadius(data.ganttProperties) + 'px;' +
                'border-bottom-right-radius:' + this.getBorderRadius(data.ganttProperties) + 'px;">' +
                '<span class="' + cls.taskLabel + '" style="line-height:' +
                (this.taskBarHeight - 1) + 'px;height:' + this.taskBarHeight + 'px;">' +
                labelString + '</span></div></div>') :
                (data.ganttProperties.startDate && !data.ganttProperties.endDate && !data.ganttProperties.duration) ? ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                    cls.unscheduledTaskbarLeft + '"' +
                    'style="left:' + data.ganttProperties.left + 'px; height:' + this.taskBarHeight + 'px;"></div>') :
                    (data.ganttProperties.endDate && !data.ganttProperties.startDate && !data.ganttProperties.duration) ?
                        ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                            cls.unscheduledTaskbarRight + '"' +
                            'style="left:' + data.ganttProperties.left + 'px; height:' + this.taskBarHeight + 'px;"></div>') :
                        (data.ganttProperties.duration && !data.ganttProperties.startDate && !data.ganttProperties.endDate) ?
                            ('<div class="' + cls.childProgressBarInnerDiv + ' ' + cls.traceChildTaskBar + ' ' +
                                cls.unscheduledTaskbar + '"' +
                                'style="left:' + data.ganttProperties.left + 'px; width:' + data.ganttProperties.width + 'px;' +
                                ' height:' + this.taskBarHeight + 'px;"></div>') : '';
            childTaskbarNode = this.createDivElement(template);
        }
        return childTaskbarNode;
    };
    /**
     * To get milestone node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getMilestoneNode = function (i) {
        var milestoneNode = null;
        var data = this.templateData;
        if (this.milestoneTemplateFunction) {
            milestoneNode = this.milestoneTemplateFunction(extend({ index: i }, data), this.parent, 'MilestoneTemplate', this.getTemplateID('MilestoneTemplate'), false);
        }
        else {
            var template = '<div class="' + cls.traceMilestone + '" style="position:absolute;">' +
                '<div class="' + cls.milestoneTop + ' ' + ((!data.ganttProperties.startDate && !data.ganttProperties.endDate) ?
                cls.unscheduledMilestoneTop : '') + '" style="border-right-width:' +
                this.milesStoneRadius + 'px;border-left-width:' + this.milesStoneRadius + 'px;border-bottom-width:' +
                this.milesStoneRadius + 'px;"></div>' +
                '<div class="' + cls.milestoneBottom + ' ' + ((!data.ganttProperties.startDate && !data.ganttProperties.endDate) ?
                cls.unscheduledMilestoneBottom : '') + '" style="top:' +
                (this.milesStoneRadius) + 'px;border-right-width:' + this.milesStoneRadius + 'px; border-left-width:' +
                this.milesStoneRadius + 'px; border-top-width:' + this.milesStoneRadius + 'px;"></div></div>';
            milestoneNode = this.createDivElement(template);
        }
        return milestoneNode;
    };
    /**
     * To get task baseline Node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getTaskBaselineNode = function () {
        var data = this.templateData;
        var template = '<div class="' + cls.baselineBar + ' ' + '" style="margin-top:' + this.baselineTop +
            'px;left:' + data.ganttProperties.baselineLeft + 'px;' +
            'width:' + data.ganttProperties.baselineWidth + 'px;height:' +
            this.baselineHeight + 'px;' + (this.baselineColor ? 'background-color: ' + this.baselineColor + ';' : '') + '"></div>';
        return this.createDivElement(template);
    };
    /**
     * To get milestone baseline node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getMilestoneBaselineNode = function () {
        var data = this.templateData;
        var template = '<div class="' + cls.baselineMilestoneContainer + ' ' + '" style="' +
            'left:' + (data.ganttProperties.baselineLeft - this.milesStoneRadius) + 'px;' +
            'margin-top:' + (-Math.floor(this.parent.rowHeight - this.milestoneMarginTop) + 2) +
            'px">' + '<div class="' + cls.baselineMilestoneDiv + '">' + '<div class="' + cls.baselineMilestoneDiv +
            ' ' + cls.baselineMilestoneTop + '"  ' +
            'style="top:' + (-this.milestoneHeight) + 'px;border-right:' + this.milesStoneRadius +
            'px solid transparent;border-left:' + this.milesStoneRadius +
            'px solid transparent;border-top:0px' +
            'solid transparent;border-bottom-width:' + this.milesStoneRadius + 'px;' +
            'border-bottom-style: solid;' + (this.baselineColor ? 'border-bottom-color: ' + this.baselineColor + ';' : '') +
            '"></div>' +
            '<div class="' + cls.baselineMilestoneDiv + ' ' + cls.baselineMilestoneBottom + '"  ' +
            'style="top:' + (this.milesStoneRadius - this.milestoneHeight) + 'px;border-right:' + this.milesStoneRadius +
            'px solid transparent;border-left:' + this.milesStoneRadius +
            'px solid transparent;border-bottom:0px' +
            'solid transparent;border-top-width:' + this.milesStoneRadius + 'px;' +
            'border-top-style: solid;' +
            (this.baselineColor ? 'border-top-color: ' + this.baselineColor + ';' : '') + '"></div>' +
            '</div></div>';
        return this.createDivElement(template);
    };
    /**
     * To get left label node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getLeftLabelNode = function (i) {
        var leftLabelNode = this.leftLabelContainer();
        var leftLabelTemplateNode = null;
        if (this.leftTaskLabelTemplateFunction) {
            leftLabelTemplateNode = this.leftTaskLabelTemplateFunction(extend({ index: i }, this.templateData), this.parent, 'LeftLabelTemplate', this.getTemplateID('LeftLabelTemplate'), false);
        }
        else {
            var field = this.parent.labelSettings.leftLabel;
            var labelString = this.getTaskLabel(field);
            if (labelString) {
                labelString = labelString === 'isCustomTemplate' ? field : labelString;
                var templateString = '<div class="' + cls.leftLabelInnerDiv + '"  style="height:' +
                    (this.taskBarHeight) +
                    'px;margin-top:' + this.taskBarMarginTop + 'px;"><span class="' + cls.label + '">' +
                    labelString + '</span></div>';
                leftLabelTemplateNode = this.createDivElement(templateString);
            }
        }
        if (leftLabelTemplateNode && leftLabelTemplateNode.length > 0) {
            leftLabelNode[0].appendChild([].slice.call(leftLabelTemplateNode)[0]);
        }
        return leftLabelNode;
    };
    /**
     * To get right label node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getRightLabelNode = function (i) {
        var rightLabelNode = this.rightLabelContainer();
        var rightLabelTemplateNode = null;
        if (this.rightTaskLabelTemplateFunction) {
            rightLabelTemplateNode = this.rightTaskLabelTemplateFunction(extend({ index: i }, this.templateData), this.parent, 'RightLabelTemplate', this.getTemplateID('RightLabelTemplate'), false);
        }
        else {
            var field = this.parent.labelSettings.rightLabel;
            var labelString = this.getTaskLabel(field);
            if (labelString) {
                labelString = labelString === 'isCustomTemplate' ? field : labelString;
                var templateString = '<div class="' + cls.rightLabelInnerDiv + '"  style="height:'
                    + (this.taskBarHeight) + 'px;margin-top:' + this.taskBarMarginTop +
                    'px;"><span class="' + cls.label + '">' + labelString + '</span></div>';
                rightLabelTemplateNode = this.createDivElement(templateString);
            }
        }
        if (rightLabelTemplateNode && rightLabelTemplateNode.length > 0) {
            rightLabelNode[0].appendChild([].slice.call(rightLabelTemplateNode)[0]);
        }
        return rightLabelNode;
    };
    /**
     * To get parent taskbar node.
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getParentTaskbarNode = function (i) {
        var parentTaskbarNode = null;
        var data = this.templateData;
        if (this.parentTaskbarTemplateFunction) {
            parentTaskbarNode = this.parentTaskbarTemplateFunction(extend({ index: i }, data), this.parent, 'ParentTaskbarTemplate', this.getTemplateID('ParentTaskbarTemplate'), false);
        }
        else {
            var labelString = '';
            if (this.taskLabelTemplateFunction) {
                var parentTaskLabelNode = this.taskLabelTemplateFunction(extend({ index: i }, data), this.parent, 'TaskLabelTemplate', this.getTemplateID('TaskLabelTemplate'), false);
                var div = createElement('div');
                div.appendChild(parentTaskLabelNode[0]);
                labelString = div.innerHTML;
            }
            else {
                labelString = this.getTaskLabel(this.parent.labelSettings.taskLabel);
                labelString = labelString === 'isCustomTemplate' ? this.parent.labelSettings.taskLabel : labelString;
            }
            var template = '<div class="' + cls.parentTaskBarInnerDiv + ' ' +
                this.getExpandClass(data) + ' ' + cls.traceParentTaskBar + '"' +
                ' style="width:' + data.ganttProperties.width + 'px;height:' + this.taskBarHeight + 'px;">' +
                '<div class="' + cls.parentProgressBarInnerDiv + ' ' + this.getExpandClass(data) + ' ' + cls.traceParentProgressBar + '"' +
                ' style="border-style:' + (data.ganttProperties.progressWidth ? 'solid;' : 'none;') +
                'width:' + data.ganttProperties.progressWidth + 'px;' +
                'border-top-right-radius:' + this.getBorderRadius(data) + 'px;' +
                'border-bottom-right-radius:' + this.getBorderRadius(data) + 'px;height:100%;"><span class="' +
                cls.taskLabel + '" style="line-height:' +
                (this.taskBarHeight - 1) + 'px;height:' + this.taskBarHeight + 'px;">' +
                labelString + '</span></div></div>';
            parentTaskbarNode = this.createDivElement(template);
        }
        return parentTaskbarNode;
    };
    /**
     * To get taskbar row('TR') node
     * @return {NodeList}
     * @private
     */
    ChartRows.prototype.getTableTrNode = function () {
        var table = createElement('table');
        var className = (this.parent.gridLines === 'Horizontal' || this.parent.gridLines === 'Both') ?
            'e-chart-row-border' : '';
        table.innerHTML = '<tr class="' + this.getRowClassName(this.templateData) + ' ' + cls.chartRow + '"' +
            'style="display:' + this.getExpandDisplayProp(this.templateData) + ';height:' +
            this.parent.rowHeight + 'px;">' +
            '<td class="' + cls.chartRowCell + ' ' + className
            + '" style="width:' + this.parent.timelineModule.totalTimelineWidth + 'px;"></td></tr>';
        return table.childNodes;
    };
    /**
     * To initialize chart templates.
     * @return {void}
     * @private
     */
    ChartRows.prototype.initializeChartTemplate = function () {
        if (!isNullOrUndefined(this.parent.parentTaskbarTemplate)) {
            this.parentTaskbarTemplateFunction = this.templateCompiler(this.parent.parentTaskbarTemplate);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.leftLabel) &&
            this.isTemplate(this.parent.labelSettings.leftLabel)) {
            this.leftTaskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.leftLabel);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.rightLabel) &&
            this.isTemplate(this.parent.labelSettings.rightLabel)) {
            this.rightTaskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.rightLabel);
        }
        if (!isNullOrUndefined(this.parent.labelSettings.taskLabel) &&
            this.isTemplate(this.parent.labelSettings.taskLabel)) {
            this.taskLabelTemplateFunction = this.templateCompiler(this.parent.labelSettings.taskLabel);
        }
        if (!isNullOrUndefined(this.parent.taskbarTemplate)) {
            this.childTaskbarTemplateFunction = this.templateCompiler(this.parent.taskbarTemplate);
        }
        if (!isNullOrUndefined(this.parent.milestoneTemplate)) {
            this.milestoneTemplateFunction = this.templateCompiler(this.parent.milestoneTemplate);
        }
    };
    ChartRows.prototype.createDivElement = function (template) {
        var div = createElement('div');
        div.innerHTML = template;
        return div.childNodes;
    };
    ChartRows.prototype.isTemplate = function (template) {
        var result = false;
        if (typeof template !== 'string') {
            result = true;
        }
        else if (template.indexOf('#') === 0 || template.indexOf('<') > -1
            || template.indexOf('$') > -1) {
            result = true;
        }
        return result;
    };
    /** @private */
    ChartRows.prototype.getTemplateID = function (templateName) {
        var ganttID = this.parent.element.id;
        return ganttID + templateName;
    };
    ChartRows.prototype.updateTaskbarBlazorTemplate = function (isUpdate, ganttData) {
        var isMilestone = true;
        var isParent = true;
        var isChild = true;
        if (ganttData) {
            if (ganttData.ganttProperties.isMilestone) {
                isParent = isChild = false;
            }
            else if (ganttData.hasChildRecords) {
                isMilestone = isChild = false;
            }
            else if (!ganttData.hasChildRecords) {
                isParent = isMilestone = false;
            }
        }
        if (this.parentTaskbarTemplateFunction && isParent) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('ParentTaskbarTemplate'), 'ParentTaskbarTemplate', this.parent, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('ParentTaskbarTemplate'), 'ParentTaskbarTemplate');
            }
        }
        if (this.childTaskbarTemplateFunction && isChild) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('TaskbarTemplate'), 'TaskbarTemplate', this.parent, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('TaskbarTemplate'), 'TaskbarTemplate');
            }
        }
        if (this.milestoneTemplateFunction && isMilestone) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('MilestoneTemplate'), 'MilestoneTemplate', this.parent, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('MilestoneTemplate'), 'MilestoneTemplate');
            }
        }
        if (this.leftTaskLabelTemplateFunction) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('LeftLabelTemplate'), 'LeftLabelTemplate', this.parent.labelSettings, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('LeftLabelTemplate'), 'LeftLabelTemplate');
            }
        }
        if (this.rightTaskLabelTemplateFunction) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('RightLabelTemplate'), 'RightLabelTemplate', this.parent.labelSettings, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('RightLabelTemplate'), 'RightLabelTemplate');
            }
        }
        if (this.taskLabelTemplateFunction && (isParent || isChild)) {
            if (isUpdate) {
                updateBlazorTemplate(this.getTemplateID('TaskLabelTemplate'), 'TaskLabelTemplate', this.parent.labelSettings, false);
            }
            else {
                resetBlazorTemplate(this.getTemplateID('TaskLabelTemplate'), 'TaskLabelTemplate');
            }
        }
    };
    ChartRows.prototype.leftLabelContainer = function () {
        var template = '<div class="' + ((this.leftTaskLabelTemplateFunction) ? cls.leftLabelTempContainer :
            cls.leftLabelContainer) + ' ' + '" tabindex="-1" ' + this.generateTaskLabelAriaLabel('left') + '  style="height:' +
            (this.parent.rowHeight - 1) + 'px;width:' + this.taskNameWidth(this.templateData) + '"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.taskbarContainer = function () {
        var data = this.templateData;
        var template = '<div class="' + cls.taskBarMainContainer + ' ' +
            this.parent.getUnscheduledTaskClass(data.ganttProperties) + '" ' +
            ((data.ganttProperties.cssClass) ? data.ganttProperties.cssClass : '') +
            ' tabindex="-1" aria-label = "' + this.generateAriaLabel(data) + '"  ' +
            ' style="' + ((data.ganttProperties.isMilestone) ? ('width:' + this.milestoneHeight + 'px;height:' +
            this.milestoneHeight + 'px;margin-top:' + this.milestoneMarginTop + 'px;left:' + (data.ganttProperties.left -
            (this.milestoneHeight / 2)) + 'px;') : ('width:' + data.ganttProperties.width + 'px;margin-top:' +
            this.taskBarMarginTop + 'px;left:' + data.ganttProperties.left + 'px;height:' + this.taskBarHeight + 'px;')) +
            '"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.rightLabelContainer = function () {
        var template = '<div class="' + ((this.rightTaskLabelTemplateFunction) ? cls.rightLabelTempContainer :
            cls.rightLabelContainer) + '" ' + ' tabindex="-1" ' + this.generateTaskLabelAriaLabel('right') +
            ' style="left:' + this.getRightLabelLeft(this.templateData) + 'px;height:'
            + (this.parent.rowHeight - 1) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarLeftResizer = function () {
        var lResizerLeft = -(this.parent.isAdaptive ? 12 : 2);
        var template = '<div class="' + cls.taskBarLeftResizer + ' ' + cls.icon + '"' +
            ' style="left:' + lResizerLeft + 'px;height:' + (this.taskBarHeight) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarRightResizer = function () {
        var rResizerLeft = this.parent.isAdaptive ? -2 : -10;
        var template = '<div class="' + cls.taskBarRightResizer + ' ' + cls.icon + '"' +
            ' style="left:' + (this.templateData.ganttProperties.width + rResizerLeft) + 'px;' +
            'height:' + (this.taskBarHeight) + 'px;"></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.childTaskbarProgressResizer = function () {
        var template = '<div class="' + cls.childProgressResizer + '"' +
            ' style="left:' + (this.templateData.ganttProperties.progressWidth - 6) + 'px;margin-top:' +
            this.taskBarHeight + 'px;"><div class="' + cls.progressBarHandler + '"' +
            '><div class="' + cls.progressHandlerElement + '"></div>' +
            '<div class="' + cls.progressBarHandlerAfter + '"></div></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.getLeftPointNode = function () {
        var data = this.templateData;
        var pointerLeft = -((this.parent.isAdaptive ? 14 : 2) + this.connectorPointWidth);
        var mileStoneLeft = -(this.connectorPointWidth + 2);
        var pointerTop = Math.floor(this.milesStoneRadius - (this.connectorPointWidth / 2));
        var template = '<div class="' + cls.leftConnectorPointOuterDiv + '" style="' +
            ((data.ganttProperties.isMilestone) ? ('margin-top:' + pointerTop + 'px;left:' + mileStoneLeft +
                'px;') : ('margin-top:' + this.connectorPointMargin + 'px;left:' + pointerLeft + 'px;')) + '">' +
            '<div class="' + cls.connectorPointLeft + ' ' + this.parent.getUnscheduledTaskClass(data.ganttProperties) +
            '" style="width: ' + this.connectorPointWidth + 'px;' +
            'height: ' + this.connectorPointWidth + 'px;">' + this.touchLeftConnectorpoint + '</div></div>';
        return this.createDivElement(template);
    };
    ChartRows.prototype.getRightPointNode = function () {
        var data = this.templateData;
        var pointerRight = this.parent.isAdaptive ? 10 : -2;
        var pointerTop = Math.floor(this.milesStoneRadius - (this.connectorPointWidth / 2));
        var template = '<div class="' + cls.rightConnectorPointOuterDiv + '" style="' +
            ((data.ganttProperties.isMilestone) ? ('left:' + (this.milestoneHeight - 2) + 'px;margin-top:' +
                pointerTop + 'px;') : ('left:' + (data.ganttProperties.width + pointerRight) + 'px;margin-top:' +
                this.connectorPointMargin + 'px;')) + '">' +
            '<div class="' + cls.connectorPointRight + ' ' + this.parent.getUnscheduledTaskClass(data.ganttProperties) +
            '" style="width:' + this.connectorPointWidth + 'px;height:' + this.connectorPointWidth + 'px;">' +
            this.touchRightConnectorpoint + '</div></div>';
        return this.createDivElement(template);
    };
    /**
     * To get task label.
     * @return {string}
     * @private
     */
    ChartRows.prototype.getTaskLabel = function (field) {
        var length = this.parent.ganttColumns.length;
        var resultString = null;
        if (!isNullOrUndefined(field) && field !== '') {
            if (field === this.parent.taskFields.resourceInfo) {
                resultString = this.getResourceName(this.templateData);
            }
            else {
                for (var i = 0; i < length; i++) {
                    if (field === this.parent.ganttColumns[i].field) {
                        resultString = this.getFieldValue(this.templateData[field]).toString();
                        break;
                    }
                }
                if (isNullOrUndefined(resultString)) {
                    return 'isCustomTemplate';
                }
            }
        }
        else {
            resultString = '';
        }
        return resultString;
    };
    ChartRows.prototype.getExpandDisplayProp = function (data) {
        data = this.templateData;
        if (this.parent.getExpandStatus(data)) {
            return 'table-row';
        }
        return 'none';
    };
    ChartRows.prototype.getRowClassName = function (data) {
        data = this.templateData;
        var rowClass = 'gridrowtaskId';
        var parentItem = data.parentItem;
        if (parentItem) {
            rowClass += parentItem.taskId.toString();
        }
        rowClass += 'level';
        rowClass += data.level.toString();
        return rowClass;
    };
    ChartRows.prototype.getBorderRadius = function (data) {
        data = this.templateData;
        var diff = data.ganttProperties.width - data.ganttProperties.progressWidth;
        if (diff <= 4) {
            return 4 - diff;
        }
        else {
            return 0;
        }
    };
    ChartRows.prototype.taskNameWidth = function (ganttData) {
        ganttData = this.templateData;
        var width;
        if (ganttData.ganttProperties.isMilestone) {
            width = (ganttData.ganttProperties.left - (this.parent.getTaskbarHeight() / 2));
        }
        else {
            width = ganttData.ganttProperties.left;
        }
        if (width < 0) {
            width = 0;
        }
        return width + 'px';
    };
    ChartRows.prototype.getRightLabelLeft = function (ganttData) {
        ganttData = this.templateData;
        if (ganttData.ganttProperties.isMilestone) {
            return ganttData.ganttProperties.left + (this.parent.getTaskbarHeight() / 2);
        }
        else {
            return ganttData.ganttProperties.left + ganttData.ganttProperties.width;
        }
    };
    ChartRows.prototype.getExpandClass = function (data) {
        data = this.templateData;
        if (data.expanded) {
            return cls.rowExpand;
        }
        else if (!data.expanded && data.hasChildRecords) {
            return cls.rowCollapse;
        }
        return '';
    };
    ChartRows.prototype.getFieldValue = function (field) {
        return isNullOrUndefined(field) ? '' : field;
    };
    ChartRows.prototype.getResourceName = function (ganttData) {
        ganttData = this.templateData;
        var resource = null;
        if (!isNullOrUndefined(ganttData.ganttProperties.resourceInfo)) {
            var length_1 = ganttData.ganttProperties.resourceInfo.length;
            if (length_1 > 0) {
                for (var i = 0; i < length_1; i++) {
                    if (isNullOrUndefined(resource)) {
                        resource = ganttData.ganttProperties.resourceInfo[i][this.parent.resourceNameMapping];
                    }
                    else {
                        resource += ' , ' + ganttData.ganttProperties.resourceInfo[i][this.parent.resourceNameMapping];
                    }
                }
                return resource;
            }
            else {
                return '';
            }
        }
        return '';
    };
    /**
     * To initialize private variable help to render task bars.
     * @return {void}
     * @private
     */
    ChartRows.prototype.initChartHelperPrivateVariable = function () {
        this.baselineColor = !isNullOrUndefined(this.parent.baselineColor) &&
            this.parent.baselineColor !== '' ? this.parent.baselineColor : null;
        this.taskBarHeight = isNullOrUndefined(this.parent.taskbarHeight) || this.parent.taskbarHeight >= this.parent.rowHeight ?
            Math.floor(this.parent.rowHeight * 0.62) : this.parent.taskbarHeight; // 0.62 -- Standard Ratio.
        if (this.parent.renderBaseline) {
            var height = void 0;
            if ((this.taskBarHeight + this.baselineHeight) <= this.parent.rowHeight) {
                height = this.taskBarHeight;
            }
            else {
                height = this.taskBarHeight - (this.baselineHeight + 1);
            }
            this.taskBarHeight = height;
        }
        this.milestoneHeight = Math.floor(this.taskBarHeight * 0.82); // 0.82 -- Standard Ratio.
        this.taskBarMarginTop = Math.floor((this.parent.rowHeight - this.taskBarHeight) / 2);
        this.milestoneMarginTop = Math.floor((this.parent.rowHeight - this.milestoneHeight) / 2);
        this.milesStoneRadius = Math.floor((this.milestoneHeight) / 2);
        this.baselineTop = -(Math.floor((this.parent.rowHeight - (this.taskBarHeight + this.taskBarMarginTop))) - 1);
        this.connectorPointWidth = this.parent.isAdaptive ? Math.round(this.taskBarHeight / 2) : 8;
        this.connectorPointMargin = Math.floor((this.taskBarHeight / 2) - (this.connectorPointWidth / 2));
    };
    /**
     * Function used to refresh Gantt rows.
     * @return {void}
     * @private
     */
    ChartRows.prototype.refreshGanttRows = function () {
        this.parent.currentViewData = this.parent.treeGrid.getCurrentViewRecords().slice();
        this.createTaskbarTemplate();
        this.triggerQueryTaskbarInfo();
    };
    /**
     * To render taskbars.
     * @return {void}
     * @private
     */
    ChartRows.prototype.createTaskbarTemplate = function () {
        this.updateTaskbarBlazorTemplate(false);
        this.ganttChartTableBody.innerHTML = '';
        for (var i = 0; i < this.parent.currentViewData.length; i++) {
            var tempTemplateData = this.parent.currentViewData[i];
            this.ganttChartTableBody.appendChild(this.getGanttChartRow(i, tempTemplateData));
        }
        this.updateTaskbarBlazorTemplate(true);
    };
    /**
     * To render taskbars.
     * @return {Node}
     * @private
     */
    /* tslint:disable-next-line:max-func-body-length */
    ChartRows.prototype.getGanttChartRow = function (i, tempTemplateData) {
        this.templateData = tempTemplateData;
        var taskBaselineTemplateNode = null;
        var parentTrNode = this.getTableTrNode();
        var leftLabelNode = this.getLeftLabelNode(i);
        var taskbarContainerNode = this.taskbarContainer();
        if (!this.templateData.hasChildRecords) {
            var connectorLineLeftNode = this.getLeftPointNode();
            taskbarContainerNode[0].appendChild([].slice.call(connectorLineLeftNode)[0]);
        }
        if (this.templateData.hasChildRecords) {
            var parentTaskbarTemplateNode = this.getParentTaskbarNode(i);
            if (parentTaskbarTemplateNode && parentTaskbarTemplateNode.length > 0) {
                taskbarContainerNode[0].appendChild([].slice.call(parentTaskbarTemplateNode)[0]);
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = this.getTaskBaselineNode();
            }
        }
        else if (this.templateData.ganttProperties.isMilestone) {
            var milestoneTemplateNode = this.getMilestoneNode(i);
            if (milestoneTemplateNode && milestoneTemplateNode.length > 0) {
                taskbarContainerNode[0].appendChild([].slice.call(milestoneTemplateNode)[0]);
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = this.getMilestoneBaselineNode();
            }
        }
        else {
            var scheduledTask = isScheduledTask(this.templateData.ganttProperties);
            var childTaskbarProgressResizeNode = null;
            var childTaskbarRightResizeNode = null;
            var childTaskbarLeftResizeNode = null;
            if (!isNullOrUndefined(scheduledTask)) {
                if (scheduledTask || this.templateData.ganttProperties.duration) {
                    if (scheduledTask) {
                        childTaskbarProgressResizeNode = this.childTaskbarProgressResizer();
                        childTaskbarLeftResizeNode = this.childTaskbarLeftResizer();
                        childTaskbarRightResizeNode = this.childTaskbarRightResizer();
                    }
                }
                var childTaskbarTemplateNode = this.getChildTaskbarNode(i);
                if (childTaskbarLeftResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarLeftResizeNode)[0]);
                }
                if (childTaskbarTemplateNode && childTaskbarTemplateNode.length > 0) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarTemplateNode)[0]);
                }
                if (childTaskbarProgressResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarProgressResizeNode)[0]);
                }
                if (childTaskbarRightResizeNode) {
                    taskbarContainerNode[0].appendChild([].slice.call(childTaskbarRightResizeNode)[0]);
                }
            }
            if (this.parent.renderBaseline && this.templateData.ganttProperties.baselineStartDate &&
                this.templateData.ganttProperties.baselineEndDate) {
                taskBaselineTemplateNode = this.getTaskBaselineNode();
            }
        }
        if (!this.templateData.hasChildRecords) {
            var connectorLineRightNode = this.getRightPointNode();
            taskbarContainerNode[0].appendChild([].slice.call(connectorLineRightNode)[0]);
        }
        var rightLabelNode = this.getRightLabelNode(i);
        parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(leftLabelNode)[0]);
        parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskbarContainerNode)[0]);
        if (this.templateData.ganttProperties.indicators && this.templateData.ganttProperties.indicators.length > 0) {
            var taskIndicatorNode = void 0;
            var taskIndicatorTextFunction = void 0;
            var taskIndicatorTextNode = void 0;
            var indicators = this.templateData.ganttProperties.indicators;
            for (var indicatorIndex = 0; indicatorIndex < indicators.length; indicatorIndex++) {
                taskIndicatorNode = this.getIndicatorNode(indicators[indicatorIndex]);
                if (indicators[indicatorIndex].name.indexOf('$') > -1 || indicators[indicatorIndex].name.indexOf('#') > -1) {
                    taskIndicatorTextFunction = this.templateCompiler(indicators[indicatorIndex].name);
                    taskIndicatorTextNode = taskIndicatorTextFunction(extend({ index: i }, this.templateData), this.parent, 'indicatorLabelText');
                }
                else {
                    var text = createElement('Text');
                    text.innerHTML = indicators[indicatorIndex].name;
                    taskIndicatorTextNode = text.childNodes;
                }
                taskIndicatorNode[0].appendChild([].slice.call(taskIndicatorTextNode)[0]);
                taskIndicatorNode[0].title =
                    !isNullOrUndefined(indicators[indicatorIndex].tooltip) ? indicators[indicatorIndex].tooltip : '';
                parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskIndicatorNode)[0]);
            }
        }
        if (rightLabelNode && rightLabelNode.length > 0) {
            parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(rightLabelNode)[0]);
        }
        if (!isNullOrUndefined(taskBaselineTemplateNode)) {
            parentTrNode[0].childNodes[0].childNodes[0].appendChild([].slice.call(taskBaselineTemplateNode)[0]);
        }
        return parentTrNode[0].childNodes[0];
    };
    /**
     * To trigger query taskbar info event.
     * @return {void}
     * @private
     */
    ChartRows.prototype.triggerQueryTaskbarInfo = function () {
        var length = this.ganttChartTableBody.querySelectorAll('tr').length;
        var trElement;
        var taskbarElement;
        var data;
        for (var index = 0; index < length; index++) {
            trElement = this.ganttChartTableBody.querySelectorAll('tr')[index];
            taskbarElement = trElement.querySelector('.' + cls.taskBarMainContainer);
            data = this.parent.currentViewData[index];
            this.triggerQueryTaskbarInfoByIndex(trElement, data);
        }
    };
    /**
     *
     * @param trElement
     * @param data
     * @private
     */
    ChartRows.prototype.triggerQueryTaskbarInfoByIndex = function (trElement, data) {
        var _this = this;
        var taskbarElement;
        taskbarElement = trElement.querySelector('.' + cls.taskBarMainContainer);
        var rowElement;
        var triggerTaskbarElement;
        var args = {
            data: data,
            rowElement: trElement,
            taskbarElement: trElement.querySelector('.' + cls.taskBarMainContainer),
            taskbarType: data.hasChildRecords ? 'ParentTask' : data.ganttProperties.isMilestone ? 'Milestone' : 'ChildTask'
        };
        var classCollections = this.getClassName(args);
        if (args.taskbarType === 'Milestone') {
            args.milestoneColor = taskbarElement.querySelector(classCollections[0]) ?
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).borderBottomColor : null;
            args.baselineColor = trElement.querySelector(classCollections[1]) ?
                getComputedStyle(trElement.querySelector(classCollections[1])).borderBottomColor : null;
        }
        else {
            args.taskbarBgColor = taskbarElement.querySelector(classCollections[0]) ?
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor : null;
            args.taskbarBorderColor = taskbarElement.querySelector(classCollections[0]) ?
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).borderColor : null;
            args.progressBarBgColor = taskbarElement.querySelector(classCollections[1]) ?
                getComputedStyle(taskbarElement.querySelector(classCollections[1])).backgroundColor : null;
            // args.progressBarBorderColor = taskbarElement.querySelector(progressBarClass) ?
            //     getComputedStyle(taskbarElement.querySelector(progressBarClass)).borderColor : null;
            args.baselineColor = trElement.querySelector('.' + cls.baselineBar) ?
                getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).backgroundColor : null;
            args.taskLabelColor = taskbarElement.querySelector('.' + cls.taskLabel) ?
                getComputedStyle(taskbarElement.querySelector('.' + cls.taskLabel)).color : null;
        }
        args.rightLabelColor = trElement.querySelector('.' + cls.rightLabelContainer) &&
            (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) ?
            getComputedStyle((trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color : null;
        args.leftLabelColor = trElement.querySelector('.' + cls.leftLabelContainer) &&
            (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) ?
            getComputedStyle((trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color : null;
        if (isBlazor()) {
            rowElement = args.rowElement;
            triggerTaskbarElement = args.taskbarElement;
        }
        this.parent.trigger('queryTaskbarInfo', args, function (taskbarArgs) {
            _this.updateQueryTaskbarInfoArgs(taskbarArgs, rowElement, triggerTaskbarElement);
        });
    };
    /**
     * To update query taskbar info args.
     * @return {void}
     * @private
     */
    ChartRows.prototype.updateQueryTaskbarInfoArgs = function (args, rowElement, taskBarElement) {
        var trElement = isBlazor() && rowElement ? rowElement : args.rowElement;
        var taskbarElement = isBlazor() && taskBarElement ? taskBarElement : args.taskbarElement;
        var classCollections = this.getClassName(args);
        if (args.taskbarType === 'Milestone') {
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).borderBottomColor !== args.milestoneColor) {
                taskbarElement.querySelector(classCollections[0]).style.borderBottomColor = args.milestoneColor;
                taskbarElement.querySelector('.' + cls.milestoneBottom).style.borderTopColor = args.milestoneColor;
            }
            if (trElement.querySelector(classCollections[1]) &&
                getComputedStyle(trElement.querySelector(classCollections[1])).borderTopColor !== args.baselineColor) {
                trElement.querySelector(classCollections[1]).style.borderBottomColor = args.baselineColor;
                trElement.querySelector('.' + cls.baselineMilestoneBottom).style.borderTopColor = args.baselineColor;
            }
        }
        else {
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).backgroundColor !== args.taskbarBgColor) {
                taskbarElement.querySelector(classCollections[0]).style.backgroundColor = args.taskbarBgColor;
            }
            if (taskbarElement.querySelector(classCollections[0]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[0])).borderColor !== args.taskbarBorderColor) {
                taskbarElement.querySelector(classCollections[0]).style.borderColor = args.taskbarBorderColor;
            }
            if (taskbarElement.querySelector(classCollections[1]) &&
                getComputedStyle(taskbarElement.querySelector(classCollections[1])).backgroundColor !== args.progressBarBgColor) {
                taskbarElement.querySelector(classCollections[1]).style.backgroundColor = args.progressBarBgColor;
            }
            // if (taskbarElement.querySelector(progressBarClass) &&
            //     getComputedStyle(taskbarElement.querySelector(progressBarClass)).borderColor !== args.progressBarBorderColor) {
            //     (taskbarElement.querySelector(progressBarClass) as HTMLElement).style.borderColor = args.progressBarBorderColor;
            // }
            if (taskbarElement.querySelector('.' + cls.taskLabel) &&
                getComputedStyle(taskbarElement.querySelector('.' + cls.taskLabel)).color !== args.taskLabelColor) {
                taskbarElement.querySelector('.' + cls.taskLabel).style.color = args.taskLabelColor;
            }
            if (trElement.querySelector('.' + cls.baselineBar) &&
                getComputedStyle(trElement.querySelector('.' + cls.baselineBar)).backgroundColor !== args.baselineColor) {
                trElement.querySelector('.' + cls.baselineBar).style.backgroundColor = args.baselineColor;
            }
        }
        if (trElement.querySelector('.' + cls.leftLabelContainer) &&
            (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label) &&
            getComputedStyle((trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label)).color !== args.leftLabelColor) {
            (trElement.querySelector('.' + cls.leftLabelContainer)).querySelector('.' + cls.label).style.color = args.leftLabelColor;
        }
        if (trElement.querySelector('.' + cls.rightLabelContainer) &&
            (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label) &&
            getComputedStyle((trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label)).color !== args.rightLabelColor) {
            (trElement.querySelector('.' + cls.rightLabelContainer)).querySelector('.' + cls.label).style.color = args.rightLabelColor;
        }
    };
    ChartRows.prototype.getClassName = function (args) {
        var classCollection = [];
        classCollection.push('.' + (args.taskbarType === 'ParentTask' ?
            cls.traceParentTaskBar : args.taskbarType === 'ChildTask' ? cls.traceChildTaskBar : cls.milestoneTop));
        classCollection.push('.' + (args.taskbarType === 'ParentTask' ?
            cls.traceParentProgressBar : args.taskbarType === 'ChildTask' ? cls.traceChildProgressBar : cls.baselineMilestoneTop));
        return classCollection;
    };
    /**
     * To compile template string.
     * @return {Function}
     * @private
     */
    ChartRows.prototype.templateCompiler = function (template) {
        if (!isNullOrUndefined(template) && template !== '') {
            var e = void 0;
            try {
                if (document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim(), this.parent);
                }
                else {
                    return compile(template, this.parent);
                }
            }
            catch (e) {
                return compile(template, this.parent);
            }
        }
        return null;
    };
    /**
     * To refresh edited TR
     * @param index
     * @private
     */
    ChartRows.prototype.refreshRow = function (index) {
        var tr = this.ganttChartTableBody.childNodes[index];
        var selectedItem = this.parent.currentViewData[index];
        if (index !== -1 && selectedItem) {
            var data = selectedItem;
            tr.replaceChild(this.getGanttChartRow(index, data).childNodes[0], tr.childNodes[0]);
            this.triggerQueryTaskbarInfoByIndex(tr, data);
            this.parent.treeGrid.grid.setRowData(data.ganttProperties.taskId, data);
            var row = this.parent.treeGrid.grid.getRowObjectFromUID(this.parent.treeGrid.grid.getDataRows()[index].getAttribute('data-uid'));
            row.data = data;
        }
    };
    /**
     * To refresh all edited records
     * @param items
     * @private
     */
    ChartRows.prototype.refreshRecords = function (items) {
        if (this.parent.isGanttChartRendered) {
            this.updateTaskbarBlazorTemplate(false);
            for (var i = 0; i < items.length; i++) {
                var index = this.parent.currentViewData.indexOf(items[i]);
                this.refreshRow(index);
            }
            this.updateTaskbarBlazorTemplate(true);
        }
    };
    ChartRows.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('renderPanels', this.createChartTable);
        this.parent.off('dataReady', this.initiateTemplates);
        this.parent.off('destroy', this.destroy);
    };
    ChartRows.prototype.destroy = function () {
        this.removeEventListener();
    };
    ChartRows.prototype.generateAriaLabel = function (data) {
        data = this.templateData;
        var defaultValue = '';
        var nameConstant = this.parent.localeObj.getConstant('name');
        var startDateConstant = this.parent.localeObj.getConstant('startDate');
        var endDateConstant = this.parent.localeObj.getConstant('endDate');
        var durationConstant = this.parent.localeObj.getConstant('duration');
        var taskNameVal = data.ganttProperties.taskName;
        var startDateVal = data.ganttProperties.startDate;
        var endDateVal = data.ganttProperties.endDate;
        var durationVal = data.ganttProperties.duration;
        if (data.ganttProperties.isMilestone) {
            defaultValue = nameConstant + ' ' + taskNameVal + ' ' + startDateConstant + ' '
                + this.parent.getFormatedDate(startDateVal);
        }
        else {
            if (taskNameVal) {
                defaultValue += nameConstant + ' ' + taskNameVal + ' ';
            }
            if (startDateVal) {
                defaultValue += startDateConstant + ' ' + this.parent.getFormatedDate(startDateVal) + ' ';
            }
            if (endDateVal) {
                defaultValue += endDateConstant + ' ' + this.parent.getFormatedDate(endDateVal) + ' ';
            }
            if (durationVal) {
                defaultValue += durationConstant + ' '
                    + this.parent.getDurationString(durationVal, data.ganttProperties.durationUnit);
            }
        }
        return defaultValue;
    };
    ChartRows.prototype.generateTaskLabelAriaLabel = function (type) {
        var label = '';
        if (type === 'left' && this.parent.labelSettings.leftLabel && !this.leftTaskLabelTemplateFunction) {
            label += 'aria-label= "' + this.parent.localeObj.getConstant('leftTaskLabel') +
                ' ' + this.getTaskLabel(this.parent.labelSettings.leftLabel) + '"';
        }
        else if (type === 'right' && this.parent.labelSettings.rightLabel && !this.rightTaskLabelTemplateFunction) {
            label += 'aria-label="' + this.parent.localeObj.getConstant('rightTaskLabel') +
                ' ' + this.getTaskLabel(this.parent.labelSettings.rightLabel) + '"';
        }
        return label;
    };
    return ChartRows;
}());
export { ChartRows };
