var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { createElement, closest, Draggable, extend, formatUnit, isNullOrUndefined } from '@syncfusion/ej2-base';
import { addClass, remove, removeClass, setStyleAttribute, isBlazor, getElement } from '@syncfusion/ej2-base';
import { ActionBase } from '../actions/action-base';
import * as events from '../base/constant';
import * as util from '../base/util';
import * as cls from '../base/css-constant';
import { MonthEvent } from '../event-renderer/month';
import { TimelineEvent } from '../event-renderer/timeline-view';
import { VerticalEvent } from '../event-renderer/vertical-view';
var MINUTES_PER_DAY = 1440;
/**
 * Schedule events drag actions
 */
var DragAndDrop = /** @class */ (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.widthUptoCursorPoint = 0;
        _this.heightUptoCursorPoint = 0;
        _this.cursorPointIndex = 0;
        _this.isHeaderRows = false;
        _this.isTimelineDayProcess = false;
        _this.widthPerMinute = 0;
        _this.heightPerMinute = 0;
        _this.minDiff = 0;
        _this.isStepDragging = false;
        _this.isMorePopupOpened = false;
        _this.isAllDayDrag = false;
        return _this;
    }
    DragAndDrop.prototype.wireDragEvent = function (element) {
        new Draggable(element, {
            abort: '.' + cls.EVENT_RESIZE_CLASS,
            clone: true,
            isDragScroll: true,
            enableTapHold: this.parent.isAdaptive,
            enableTailMode: (this.parent.eventDragArea) ? true : false,
            cursorAt: (this.parent.eventDragArea) ? { left: -20, top: -20 } : { left: 0, top: 0 },
            dragArea: (this.parent.eventDragArea) ?
                document.querySelector(this.parent.eventDragArea) :
                this.parent.element.querySelector('.' + cls.CONTENT_TABLE_CLASS),
            dragStart: this.dragStart.bind(this),
            drag: this.drag.bind(this),
            dragStop: this.dragStop.bind(this),
            enableAutoScroll: false,
            helper: this.dragHelper.bind(this),
            queryPositionInfo: this.dragPosition.bind(this)
        });
    };
    DragAndDrop.prototype.dragHelper = function (e) {
        this.setDragActionDefaultValues();
        this.actionObj.element = e.element;
        this.actionObj.action = 'drag';
        this.actionObj.clone = this.createCloneElement(this.actionObj.element);
        if (!this.parent.eventDragArea && this.parent.currentView !== 'Month' &&
            this.parent.timeScale.enable && !this.parent.activeView.isTimelineView() &&
            !this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
            setStyleAttribute(this.actionObj.clone, { cursor: 'move', left: '0%', right: '0%', width: '100%' });
        }
        this.actionObj.clone.style.top = formatUnit(this.actionObj.element.offsetTop);
        this.actionObj.cloneElement = [this.actionObj.clone];
        this.actionObj.originalElement = [this.actionObj.element];
        return this.actionObj.clone;
    };
    DragAndDrop.prototype.dragPosition = function (e) {
        if (this.parent.eventDragArea) {
            return { left: e.left, top: e.top };
        }
        var cellHeight = (this.actionObj.cellHeight / this.actionObj.slotInterval) * this.actionObj.interval;
        var leftValue = formatUnit(0);
        if (this.parent.currentView === 'Month') {
            leftValue = e.left;
        }
        if (this.parent.activeView.isTimelineView()) {
            leftValue = formatUnit(this.actionObj.clone.offsetLeft);
        }
        var topValue;
        if ((this.parent.activeView.isTimelineView() || !this.parent.timeScale.enable ||
            (!isNullOrUndefined(this.actionObj.clone.offsetParent) &&
                this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)))) {
            topValue = formatUnit(this.actionObj.clone.offsetTop);
        }
        else if (this.parent.currentView === 'Month') {
            topValue = formatUnit(0);
        }
        else if (this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
            topValue = formatUnit(this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).offsetTop);
            setStyleAttribute(this.actionObj.clone, {
                width: formatUnit(Math.ceil(this.actionObj.clone.offsetWidth / this.actionObj.cellWidth) * this.actionObj.cellWidth),
                right: this.parent.enableRtl && formatUnit(0)
            });
        }
        else {
            if (this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) &&
                !this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                setStyleAttribute(this.actionObj.clone, {
                    height: formatUnit(this.actionObj.cellHeight),
                    width: formatUnit(this.actionObj.cellWidth - 1),
                    pointerEvents: 'none'
                });
            }
            var top_1 = parseInt(e.top, 10);
            top_1 = top_1 < 0 ? 0 : top_1;
            topValue = formatUnit(Math.ceil(top_1 / cellHeight) * cellHeight);
            var scrollHeight = this.parent.element.querySelector('.e-content-wrap').scrollHeight;
            var cloneBottom = parseInt(topValue, 10) + this.actionObj.clone.offsetHeight;
            if (cloneBottom > scrollHeight) {
                topValue = (parseInt(topValue, 10) - (cloneBottom - scrollHeight)) + 'px';
            }
        }
        return { left: leftValue, top: topValue };
    };
    DragAndDrop.prototype.setDragActionDefaultValues = function () {
        this.actionObj.action = 'drag';
        this.actionObj.isAllDay = null;
        this.actionObj.slotInterval = this.parent.activeViewOptions.timeScale.interval / this.parent.activeViewOptions.timeScale.slotCount;
        this.actionObj.interval = this.actionObj.slotInterval;
        var workCell = this.parent.element.querySelector('.' + cls.WORK_CELLS_CLASS);
        this.actionObj.cellWidth = workCell.offsetWidth;
        this.actionObj.cellHeight = workCell.offsetHeight;
    };
    DragAndDrop.prototype.dragStart = function (e) {
        var _this = this;
        var eventGuid = this.actionObj.element.getAttribute('data-guid');
        this.actionObj.event = this.parent.eventBase.getEventByGuid(eventGuid);
        var eventObj = extend({}, this.actionObj.event, null, true);
        var dragArgs = {
            cancel: false,
            data: eventObj,
            event: e,
            excludeSelectors: null,
            element: this.actionObj.element,
            interval: this.actionObj.interval,
            navigation: { enable: false, timeDelay: 2000 },
            scroll: { enable: true, scrollBy: 30, timeDelay: 100 }
        };
        this.parent.trigger(events.dragStart, dragArgs, function (dragEventArgs) {
            if (dragEventArgs.cancel || (!isNullOrUndefined(_this.actionObj.element) &&
                isNullOrUndefined(_this.actionObj.element.parentElement))) {
                _this.actionObj.action = '';
                _this.removeCloneElementClasses();
                _this.removeCloneElement();
                return;
            }
            else if (isBlazor()) {
                e.bindEvents(e.dragElement);
                if (dragEventArgs.element) {
                    dragEventArgs.element = getElement(dragEventArgs.element);
                }
                dragEventArgs.data[_this.parent.eventFields.startTime] = _this.parent.getDateTime(dragEventArgs.data[_this.parent.eventFields.startTime]);
                dragEventArgs.data[_this.parent.eventFields.endTime] = _this.parent.getDateTime(dragEventArgs.data[_this.parent.eventFields.endTime]);
            }
            _this.actionClass('addClass');
            _this.parent.uiStateValues.action = true;
            _this.actionObj.start = eventObj[_this.parent.eventFields.startTime];
            _this.actionObj.end = eventObj[_this.parent.eventFields.endTime];
            _this.actionObj.groupIndex = parseInt(_this.actionObj.element.getAttribute('data-group-index') || '0', 10);
            _this.actionObj.interval = dragEventArgs.interval;
            _this.actionObj.navigation = dragEventArgs.navigation;
            _this.actionObj.scroll = dragEventArgs.scroll;
            _this.actionObj.excludeSelectors = dragEventArgs.excludeSelectors;
            var viewElement = _this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            _this.scrollArgs = { element: viewElement, width: viewElement.scrollWidth, height: viewElement.scrollHeight };
            _this.widthPerMinute = (_this.actionObj.cellWidth / _this.actionObj.slotInterval) * _this.actionObj.interval;
            _this.heightPerMinute = (_this.actionObj.cellHeight / _this.actionObj.slotInterval) * _this.actionObj.interval;
            _this.widthUptoCursorPoint = 0;
            _this.heightUptoCursorPoint = 0;
            _this.cursorPointIndex = -1;
            _this.isHeaderRows = false;
            _this.isTimelineDayProcess = false;
            _this.minDiff = 0;
            _this.isMorePopupOpened = false;
            _this.daysVariation = -1;
            if ((_this.parent.activeView.isTimelineView() || !_this.parent.timeScale.enable)) {
                if (!isNullOrUndefined(_this.actionObj.clone.offsetParent) &&
                    _this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)) {
                    _this.isMorePopupOpened = true;
                }
                var rows = _this.parent.activeViewOptions.headerRows;
                _this.isHeaderRows = rows.length > 0 && rows[rows.length - 1].option !== 'Hour' &&
                    rows[rows.length - 1].option !== 'Date';
                _this.isTimelineDayProcess = !_this.parent.activeViewOptions.timeScale.enable || _this.isHeaderRows ||
                    _this.parent.currentView === 'TimelineMonth' || (rows.length > 0 && rows[rows.length - 1].option === 'Date');
                _this.isStepDragging = !_this.isTimelineDayProcess && (_this.actionObj.slotInterval !== _this.actionObj.interval);
                if (_this.isTimelineDayProcess) {
                    _this.timelineEventModule = new TimelineEvent(_this.parent, 'day');
                }
                else {
                    _this.timelineEventModule = new TimelineEvent(_this.parent, 'hour');
                }
            }
            if (_this.parent.currentView === 'Month') {
                _this.updateOriginalElement(_this.actionObj.clone);
                _this.monthEvent = new MonthEvent(_this.parent);
            }
            if (_this.parent.currentView === 'Day' || _this.parent.currentView === 'Week' || _this.parent.currentView === 'WorkWeek') {
                _this.verticalEvent = new VerticalEvent(_this.parent);
            }
        });
    };
    DragAndDrop.prototype.drag = function (e) {
        this.parent.quickPopup.quickPopupHide(true);
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventArgs = this.getPageCoordinates(e);
        this.actionObj.Y = this.actionObj.pageY = eventArgs.pageY;
        this.actionObj.X = this.actionObj.pageX = eventArgs.pageX;
        this.actionObj.target = e.target;
        this.widthUptoCursorPoint = (this.widthUptoCursorPoint === 0) ?
            Math.ceil((Math.abs(this.actionObj.clone.getBoundingClientRect().left - this.actionObj.X) / this.widthPerMinute)) *
                this.widthPerMinute : this.widthUptoCursorPoint;
        this.widthUptoCursorPoint = this.isMorePopupOpened ? this.actionObj.cellWidth : this.widthUptoCursorPoint;
        this.heightUptoCursorPoint = (this.heightUptoCursorPoint === 0) ?
            Math.ceil((Math.abs(this.actionObj.clone.getBoundingClientRect().top - this.actionObj.Y) / this.heightPerMinute)) *
                this.heightPerMinute : this.heightUptoCursorPoint;
        this.isAllDayDrag = this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS);
        if (this.isStepDragging && this.minDiff === 0) {
            this.calculateMinutesDiff(eventObj);
        }
        if ((this.parent.currentView === 'Month' || this.isAllDayDrag) && this.daysVariation < 0) {
            var currentDate = util.resetTime(new Date(parseInt((this.actionObj.target).getAttribute('data-date'), 10)));
            var startDate = util.resetTime(new Date(eventObj[this.parent.eventFields.startTime].getTime()));
            this.daysVariation = (currentDate.getTime() - startDate.getTime()) / (1440 * 60000);
            this.daysVariation = isNaN(this.daysVariation) ? 0 : this.daysVariation;
        }
        if (this.parent.eventDragArea) {
            var targetElement = eventArgs.target;
            this.actionObj.clone.style.top = formatUnit(targetElement.offsetTop);
            this.actionObj.clone.style.left = formatUnit(targetElement.offsetLeft);
            var currentTarget = closest(targetElement, '.' + cls.ROOT);
            if (!currentTarget) {
                this.actionObj.clone.style.height = '';
                this.actionObj.clone.style.width = '';
            }
            else {
                if (!(this.parent.currentView === 'Week' || this.parent.currentView === 'WorkWeek'
                    || this.parent.currentView === 'Day')) {
                    this.actionObj.clone.style.width = formatUnit(this.actionObj.element.offsetWidth);
                }
            }
        }
        this.updateScrollPosition(e);
        this.updateNavigatingPosition(e);
        this.updateDraggingDateTime(e);
        var dragArgs = {
            data: eventObj, event: e, element: this.actionObj.element, startTime: this.actionObj.start,
            endTime: this.actionObj.end
        };
        if (this.parent.group.resources.length > 0) {
            dragArgs.groupIndex = this.actionObj.groupIndex;
        }
        this.parent.trigger(events.drag, dragArgs);
    };
    DragAndDrop.prototype.calculateMinutesDiff = function (eventObj) {
        if (this.parent.enableRtl) {
            this.minDiff =
                ((this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint) / this.widthPerMinute) * this.actionObj.interval;
        }
        else {
            this.minDiff = (this.widthUptoCursorPoint / this.widthPerMinute) * this.actionObj.interval;
        }
        var startDate = eventObj[this.parent.eventFields.startTime];
        var startTime = this.parent.activeView.renderDates[0];
        var startEndHours = util.getStartEndHours(startTime, this.parent.activeView.getStartHour(), this.parent.activeView.getEndHour());
        if (startEndHours.startHour.getTime() > startDate.getTime()) {
            this.minDiff = this.minDiff + ((startEndHours.startHour.getTime() - startDate.getTime()) / util.MS_PER_MINUTE);
        }
    };
    DragAndDrop.prototype.dragStop = function (e) {
        var _this = this;
        this.removeCloneElementClasses();
        this.removeCloneElement();
        clearInterval(this.actionObj.navigationInterval);
        this.actionObj.navigationInterval = null;
        clearInterval(this.actionObj.scrollInterval);
        this.actionObj.scrollInterval = null;
        this.actionClass('removeClass');
        this.parent.uiStateValues.action = false;
        this.actionObj.action = null;
        if (this.isAllowDrop(e)) {
            return;
        }
        var dragArgs = { cancel: false, data: this.getChangedData(), event: e, element: this.actionObj.element };
        this.parent.trigger(events.dragStop, dragArgs, function (dragEventArgs) {
            if (dragEventArgs.cancel) {
                return;
            }
            _this.saveChangedData(dragEventArgs);
        });
    };
    DragAndDrop.prototype.updateNavigatingPosition = function (e) {
        var _this = this;
        if (this.actionObj.navigation.enable) {
            var currentDate_1 = this.parent.getCurrentTime();
            if (isNullOrUndefined(this.actionObj.navigationInterval)) {
                this.actionObj.navigationInterval = window.setInterval(function () {
                    if (currentDate_1) {
                        var crtDate = _this.parent.getCurrentTime();
                        var end = crtDate.getSeconds();
                        var start = currentDate_1.getSeconds() + (_this.actionObj.navigation.timeDelay / 1000);
                        start = (start >= 60) ? start - 60 : start;
                        if (start === end) {
                            currentDate_1 = _this.parent.getCurrentTime();
                            _this.viewNavigation(e);
                            _this.updateDraggingDateTime(e);
                        }
                    }
                }, this.actionObj.navigation.timeDelay);
            }
        }
    };
    DragAndDrop.prototype.updateDraggingDateTime = function (e) {
        if (!isNullOrUndefined(this.actionObj.clone.offsetParent) &&
            this.actionObj.clone.offsetParent.classList.contains(cls.MORE_EVENT_POPUP_CLASS)) {
            this.morePopupEventDragging(e);
        }
        else if (this.parent.activeView.isTimelineView()) {
            this.timelineEventModule.dateRender = this.parent.activeView.renderDates;
            this.timelineEventModule.cellWidth = this.actionObj.cellWidth;
            this.timelineEventModule.getSlotDates();
            this.actionObj.cellWidth = this.isHeaderRows ? this.timelineEventModule.cellWidth : this.actionObj.cellWidth;
            this.calculateTimelineTime(e);
        }
        else {
            if (this.parent.currentView === 'Month') {
                this.calculateVerticalDate(e);
            }
            else {
                this.calculateVerticalTime(e);
            }
        }
    };
    DragAndDrop.prototype.navigationWrapper = function () {
        if (!this.parent.activeView.isTimelineView()) {
            if (this.parent.currentView === 'Month' || !this.parent.timeScale.enable) {
                var outerWrapperCls = this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS);
                this.actionObj.index = (this.parent.activeView.renderDates.length < this.actionObj.index) ?
                    this.parent.activeView.renderDates.length - 1 : this.actionObj.index;
                var targetWrapper = outerWrapperCls.item(this.actionObj.index).querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
                if (!targetWrapper) {
                    targetWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                    outerWrapperCls.item(this.actionObj.index).appendChild(targetWrapper);
                }
                targetWrapper.appendChild(this.actionObj.clone);
            }
            else {
                var wrapperClass = this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) ?
                    '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS : '.' + cls.APPOINTMENT_WRAPPER_CLASS;
                this.parent.element.querySelectorAll(wrapperClass)
                    .item(this.actionObj.index).appendChild(this.actionObj.clone);
                if (wrapperClass === '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS) {
                    var elementHeight_1 = this.getAllDayEventHeight();
                    var event_1 = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS + ':first-child'));
                    if (event_1[0].offsetHeight < elementHeight_1) {
                        event_1.forEach(function (element) { return element.style.height = ((elementHeight_1 + 2) / 12) + 'em'; });
                    }
                    this.actionObj.clone.style.height = formatUnit(elementHeight_1);
                }
                this.actionObj.height = parseInt(this.actionObj.clone.style.height, 0);
            }
        }
        else {
            var outWrapper = void 0;
            if (this.parent.activeViewOptions.group.resources.length > 0) {
                outWrapper = this.parent.element.querySelectorAll('.e-appointment-container:not(.e-hidden)').item(this.actionObj.index);
            }
            else {
                outWrapper = this.parent.element.querySelector('.' + cls.APPOINTMENT_CONTAINER_CLASS);
            }
            var tarWrapper = outWrapper.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
            if (!tarWrapper) {
                tarWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                outWrapper.appendChild(tarWrapper);
            }
            tarWrapper.appendChild(this.actionObj.clone);
        }
    };
    DragAndDrop.prototype.viewNavigation = function (e) {
        var navigationType;
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        if (dragArea && ((!this.scrollEdges.top && !this.scrollEdges.bottom) ||
            closest(this.actionObj.clone, '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS))) {
            if ((dragArea.scrollLeft === 0) &&
                (Math.round(this.actionObj.X) <=
                    Math.round(dragArea.getBoundingClientRect().left + this.actionObj.cellWidth + window.pageXOffset))) {
                navigationType = this.parent.enableRtl ? 'next' : 'previous';
            }
            else if ((Math.round(dragArea.scrollLeft) + dragArea.clientWidth === dragArea.scrollWidth) &&
                (Math.round(this.actionObj.X) >=
                    Math.round(dragArea.getBoundingClientRect().right - this.actionObj.cellWidth + window.pageXOffset))) {
                navigationType = this.parent.enableRtl ? 'previous' : 'next';
            }
            if (navigationType) {
                this.parent.changeDate(this.parent.activeView.getNextPreviousDate(navigationType));
            }
        }
    };
    DragAndDrop.prototype.morePopupEventDragging = function (e) {
        if (isNullOrUndefined(e.target) || (e.target && isNullOrUndefined(closest(e.target, 'td')))) {
            return;
        }
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventDuration = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        var td = closest(e.target, 'td');
        var dragStart = new Date(parseInt(td.getAttribute('data-date'), 10));
        var dragEnd = new Date(dragStart.getTime());
        dragEnd.setMilliseconds(eventDuration);
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
        }
        this.actionObj.start = new Date(dragStart.getTime());
        this.actionObj.end = new Date(dragEnd.getTime());
        this.actionObj.clone.style.top = formatUnit(td.offsetParent.offsetTop);
        this.actionObj.clone.style.left = formatUnit(td.offsetLeft);
        this.actionObj.clone.style.width = formatUnit(td.offsetWidth);
        var eventContainer = td;
        var eventWrapper;
        if (this.parent.activeView.isTimelineView()) {
            var rowIndex = closest(td, 'tr').rowIndex;
            eventContainer = this.parent.element.querySelectorAll('.e-appointment-container').item(rowIndex);
        }
        eventWrapper = eventContainer.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
        if (!eventWrapper) {
            eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
            eventContainer.appendChild(eventWrapper);
        }
        this.appendCloneElement(eventWrapper);
    };
    DragAndDrop.prototype.calculateVerticalTime = function (e) {
        if (isNullOrUndefined(this.actionObj.target) ||
            (this.actionObj.target && isNullOrUndefined(closest(this.actionObj.target, 'tr'))) ||
            (!(closest(this.actionObj.target, 'td').classList.contains(cls.WORK_CELLS_CLASS)) &&
                !(closest(this.actionObj.target, 'td').classList.contains(cls.ALLDAY_CELLS_CLASS)))) {
            return;
        }
        if (this.parent.activeViewOptions.timeScale.enable) {
            this.swapDragging(e);
        }
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventStart = eventObj[this.parent.eventFields.startTime];
        var eventEnd = eventObj[this.parent.eventFields.endTime];
        var eventDuration = eventEnd.getTime() - eventStart.getTime();
        var offsetTop = Math.floor(parseInt(this.actionObj.clone.style.top, 0) / this.actionObj.cellHeight)
            * this.actionObj.cellHeight;
        offsetTop = offsetTop < 0 ? 0 : offsetTop;
        if (this.scrollEdges.top || this.scrollEdges.bottom) {
            offsetTop = this.scrollEdges.top ? dragArea.scrollTop - this.heightUptoCursorPoint + this.actionObj.cellHeight :
                (dragArea.scrollTop + dragArea.offsetHeight - this.actionObj.clone.offsetHeight) +
                    (this.actionObj.clone.offsetHeight - this.heightUptoCursorPoint);
            offsetTop = Math.round(offsetTop / this.actionObj.cellHeight) * this.actionObj.cellHeight;
            this.actionObj.clone.style.top = formatUnit(offsetTop);
        }
        var rowIndex = offsetTop / this.actionObj.cellHeight;
        var diffInMinutes = parseInt(this.actionObj.clone.style.top, 0) - offsetTop;
        var tr;
        if (this.isAllDayDrag) {
            tr = this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS);
        }
        else {
            var trCollections = this.parent.getContentTable().querySelectorAll('tr');
            tr = trCollections.item(rowIndex);
        }
        var index;
        if (closest(this.actionObj.target, 'td').classList.contains(cls.WORK_CELLS_CLASS) ||
            closest(this.actionObj.target, 'td').classList.contains(cls.ALLDAY_CELLS_CLASS)) {
            index = closest(this.actionObj.target, 'td').cellIndex;
        }
        var colIndex = isNullOrUndefined(index) ? closest(this.actionObj.clone, 'td').cellIndex : index;
        this.actionObj.index = colIndex;
        if (isNullOrUndefined(tr)) {
            return;
        }
        var td = tr.childNodes.item(colIndex);
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
        }
        var dragStart;
        var dragEnd;
        if (this.parent.activeViewOptions.timeScale.enable && !this.isAllDayDrag) {
            this.appendCloneElement(this.getEventWrapper(colIndex));
            var spanHours = -(((this.actionObj.slotInterval / this.actionObj.cellHeight) * diffInMinutes) * (util.MS_PER_MINUTE));
            if (this.actionObj.clone.querySelector('.' + cls.EVENT_ICON_UP_CLASS)) {
                var startTime = new Date(eventStart.getTime());
                spanHours = util.addDays(util.resetTime(new Date(startTime.getTime())), 1).getTime() - startTime.getTime();
            }
            dragStart = new Date(parseInt(td.getAttribute('data-date'), 10));
            dragStart.setMinutes(dragStart.getMinutes() + (diffInMinutes * this.heightPerMinute));
            dragStart.setMilliseconds(-spanHours);
            dragStart = this.calculateIntervalTime(dragStart);
            dragEnd = new Date(dragStart.getTime());
            if (this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                dragEnd.setMinutes(dragEnd.getMinutes() + this.actionObj.slotInterval);
            }
            else {
                dragEnd.setMilliseconds(eventDuration);
            }
        }
        else {
            dragStart = new Date(parseInt(td.getAttribute('data-date'), 10));
            dragStart.setDate(dragStart.getDate() - this.daysVariation);
            dragStart.setHours(eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds());
            dragEnd = new Date(dragStart.getTime());
            dragEnd.setMilliseconds(eventDuration);
            if (!this.actionObj.element.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS) &&
                this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS)) {
                dragEnd = util.addDays(util.resetTime(dragEnd), 1);
            }
            this.updateAllDayEvents(dragStart, dragEnd, this.parent.activeViewOptions.group.byDate ? colIndex : undefined);
        }
        this.actionObj.start = new Date(+dragStart);
        this.actionObj.end = new Date(+dragEnd);
        var event = this.getUpdatedEvent(this.actionObj.start, this.actionObj.end, this.actionObj.event);
        this.updateEventHeight(event);
        this.updateTimePosition(this.actionObj.start);
    };
    DragAndDrop.prototype.updateEventHeight = function (event) {
        this.verticalEvent.initializeValues();
        var datesCount = 0;
        for (var i = 0; i < this.actionObj.groupIndex; i++) {
            datesCount = datesCount + this.verticalEvent.dateRender[i].length;
        }
        var dayIndex = this.actionObj.index - datesCount;
        var record = this.verticalEvent.isSpannedEvent(event, dayIndex, this.actionObj.groupIndex);
        var eStart = record[this.verticalEvent.fields.startTime];
        var eEnd = record[this.verticalEvent.fields.endTime];
        var topValue = 0;
        var appHeight = this.verticalEvent.getHeight(eStart, eEnd);
        topValue = this.verticalEvent.getTopValue(eStart, dayIndex, this.actionObj.groupIndex);
        this.actionObj.clone.style.top = formatUnit(topValue);
        this.actionObj.clone.style.height = formatUnit(appHeight);
    };
    DragAndDrop.prototype.updateAllDayEvents = function (startDate, endDate, colIndex) {
        var _this = this;
        this.parent.eventBase.slots = [];
        var event = this.getUpdatedEvent(startDate, endDate, this.actionObj.event);
        var renderDates = this.parent.activeView.renderDates;
        this.parent.eventBase.slots.push(this.parent.activeView.renderDates.map(function (date) { return +date; }));
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.parent.eventBase.slots = [];
            var resources = this.parent.resourceBase.lastResourceLevel.
                filter(function (res) { return res.groupIndex === _this.actionObj.groupIndex; });
            renderDates = resources[0].renderDates;
            this.parent.eventBase.slots.push(renderDates.map(function (date) { return +date; }));
        }
        var events = this.parent.eventBase.splitEvent(event, renderDates);
        var query = '.e-all-day-cells[data-date="' + events[0][this.parent.eventFields.startTime].getTime() + '"]';
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            query = query.concat('[data-group-index = "' + this.actionObj.groupIndex + '"]');
        }
        var cell = [].slice.call(this.parent.element.querySelectorAll(query));
        if (cell.length > 0 || !isNullOrUndefined(colIndex)) {
            var cellIndex = !isNullOrUndefined(colIndex) ? colIndex : cell[0].cellIndex;
            this.appendCloneElement(this.getEventWrapper(cellIndex));
            this.actionObj.clone.style.width =
                formatUnit(events[0].data.count * this.actionObj.cellWidth);
        }
    };
    DragAndDrop.prototype.swapDragging = function (e) {
        var colIndex = closest(this.actionObj.target, 'td').cellIndex;
        if (closest(this.actionObj.target, '.' + cls.DATE_HEADER_WRAP_CLASS) &&
            !closest(this.actionObj.clone, '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS)) {
            addClass([this.actionObj.clone], cls.ALLDAY_APPOINTMENT_CLASS);
            this.appendCloneElement(this.getEventWrapper(colIndex));
            this.actionObj.isAllDay = true;
            var eventHeight_1 = this.getAllDayEventHeight();
            var allDayElement = [].slice.call(this.parent.element.querySelectorAll('.' + cls.ALLDAY_CELLS_CLASS + ':first-child'));
            if (allDayElement[0].offsetHeight < eventHeight_1) {
                allDayElement.forEach(function (element) { return element.style.height = ((eventHeight_1 + 2) / 12) + 'em'; });
            }
            setStyleAttribute(this.actionObj.clone, {
                width: formatUnit(this.actionObj.cellWidth),
                height: formatUnit(eventHeight_1),
                top: formatUnit(this.parent.element.querySelector('.' + cls.ALLDAY_ROW_CLASS).offsetTop)
            });
        }
        if (closest(this.actionObj.target, '.' + cls.WORK_CELLS_CLASS) &&
            !closest(this.actionObj.clone, '.' + cls.DAY_WRAPPER_CLASS)) {
            removeClass([this.actionObj.clone], cls.ALLDAY_APPOINTMENT_CLASS);
            this.appendCloneElement(this.getEventWrapper(colIndex));
            this.actionObj.isAllDay = false;
            var height = (this.actionObj.element.offsetHeight === 0) ? this.actionObj.height : this.actionObj.element.offsetHeight;
            setStyleAttribute(this.actionObj.clone, {
                left: formatUnit(0),
                height: formatUnit(height),
                width: formatUnit(this.actionObj.cellWidth)
            });
        }
    };
    DragAndDrop.prototype.calculateVerticalDate = function (e) {
        if (isNullOrUndefined(e.target) || (e.target && isNullOrUndefined(closest(e.target, 'tr'))) ||
            (e.target && e.target.tagName === 'DIV')) {
            return;
        }
        this.removeCloneElement();
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventDuration = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        var td = closest(this.actionObj.target, 'td');
        if (!isNullOrUndefined(td)) {
            var tr = td.parentElement;
            this.actionObj.index = (tr.rowIndex * tr.childNodes.length) + td.cellIndex;
            var workCells = [].slice.call(this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS));
            td = workCells[this.actionObj.index];
            var tdDate = parseInt(td.getAttribute('data-date'), 10);
            if (!isNaN(tdDate)) {
                if (this.parent.activeViewOptions.group.resources.length > 0) {
                    this.actionObj.groupIndex = parseInt(td.getAttribute('data-group-index'), 10);
                }
                var currentDate = new Date(tdDate);
                var timeString = new Date(currentDate.setDate(currentDate.getDate() - this.daysVariation));
                var dragStart = new Date(timeString.getTime());
                var dragEnd = new Date(dragStart.getTime());
                var startTimeDiff = eventObj[this.parent.eventFields.startTime].getTime() -
                    (util.resetTime(new Date(+eventObj[this.parent.eventFields.startTime]))).getTime();
                dragStart = new Date(dragStart.getTime() + startTimeDiff);
                dragEnd = new Date(dragStart.getTime() + eventDuration);
                this.actionObj.start = new Date(dragStart.getTime());
                this.actionObj.end = new Date(dragEnd.getTime());
            }
        }
        var event = this.getUpdatedEvent(this.actionObj.start, this.actionObj.end, this.actionObj.event);
        this.dynamicEventsRendering(event);
    };
    DragAndDrop.prototype.calculateTimelineTime = function (e) {
        var eventObj = extend({}, this.actionObj.event, null, true);
        var eventDuration = eventObj[this.parent.eventFields.endTime].getTime() -
            eventObj[this.parent.eventFields.startTime].getTime();
        var offsetLeft = this.parent.enableRtl ? Math.abs(this.actionObj.clone.offsetLeft) - this.actionObj.clone.offsetWidth :
            parseInt(this.actionObj.clone.style.left, 10);
        offsetLeft = Math.floor(offsetLeft / this.actionObj.cellWidth) * this.actionObj.cellWidth;
        var rightOffset;
        if (this.parent.enableRtl) {
            rightOffset = Math.abs(parseInt(this.actionObj.clone.style.right, 10));
            this.actionObj.clone.style.right = formatUnit(rightOffset);
        }
        offsetLeft = this.getOffsetValue(offsetLeft, rightOffset);
        var colIndex = this.getColumnIndex(offsetLeft);
        var cloneIndex = Math.floor((this.actionObj.pageX - this.actionObj.clone.getBoundingClientRect().left) / this.actionObj.cellWidth);
        if (this.parent.enableRtl) {
            cloneIndex = Math.abs(Math.floor((this.actionObj.pageX - this.actionObj.clone.getBoundingClientRect().right) /
                this.actionObj.cellWidth)) - 1;
        }
        if (this.cursorPointIndex < 0) {
            this.cursorIndex(e, eventObj, offsetLeft, cloneIndex);
        }
        var tr = this.parent.getContentTable().querySelector('tr');
        var index = this.getCursorCurrentIndex(colIndex, cloneIndex, tr);
        index = index < 0 ? 0 : index;
        var eventStart = this.isHeaderRows ? new Date(this.timelineEventModule.dateRender[index].getTime()) :
            new Date(parseInt(tr.childNodes.item(index).getAttribute('data-date'), 10));
        if (this.isStepDragging) {
            var widthDiff = this.getWidthDiff(tr, index);
            if (widthDiff !== 0) {
                var timeDiff = Math.round(widthDiff / this.widthPerMinute);
                eventStart.setMinutes(eventStart.getMinutes() + (timeDiff * this.actionObj.interval));
                eventStart.setMinutes(eventStart.getMinutes() - this.minDiff);
            }
            else {
                eventStart = this.actionObj.start;
            }
        }
        else {
            eventStart.setMinutes(eventStart.getMinutes() -
                (this.cursorPointIndex * (this.isTimelineDayProcess ? MINUTES_PER_DAY : this.actionObj.slotInterval)));
        }
        eventStart = this.calculateIntervalTime(eventStart);
        if (this.isTimelineDayProcess) {
            var eventSrt = eventObj[this.parent.eventFields.startTime];
            eventStart.setHours(eventSrt.getHours(), eventSrt.getMinutes(), eventSrt.getSeconds());
        }
        var eventEnd = new Date(eventStart.getTime());
        eventEnd.setMilliseconds(eventDuration);
        var event = this.getUpdatedEvent(eventStart, eventEnd, this.actionObj.event);
        var events = this.timelineEventModule.splitEvent(event, this.timelineEventModule.dateRender);
        var eventData = events[0].data;
        var startTime = this.timelineEventModule.getStartTime(events[0], eventData);
        var endTime = this.timelineEventModule.getEndTime(events[0], eventData);
        var width = this.timelineEventModule.
            getEventWidth(startTime, endTime, eventObj[this.parent.eventFields.isAllDay], eventData.count);
        var day = this.parent.getIndexOfDate(this.timelineEventModule.dateRender, util.resetTime(new Date(startTime.getTime())));
        day = day < 0 ? 0 : day;
        var left = this.timelineEventModule.getPosition(startTime, endTime, eventObj[this.parent.eventFields.isAllDay], day);
        if (this.parent.enableRtl) {
            this.actionObj.clone.style.right = formatUnit(left);
        }
        else {
            this.actionObj.clone.style.left = formatUnit(left);
        }
        if (!this.isMorePopupOpened) {
            this.actionObj.clone.style.width = formatUnit(width);
        }
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            this.calculateResourceGroupingPosition(e);
        }
        this.actionObj.start = new Date(eventStart.getTime());
        this.actionObj.end = new Date(eventEnd.getTime());
        this.updateTimePosition(this.actionObj.start);
    };
    DragAndDrop.prototype.getOffsetValue = function (offsetLeft, rightOffset) {
        if (this.scrollEdges.left || this.scrollEdges.right) {
            var viewEle = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
            if (this.parent.enableRtl) {
                rightOffset = viewEle.offsetWidth - viewEle.scrollLeft;
                if (this.scrollEdges.right) {
                    rightOffset = (rightOffset - viewEle.offsetWidth + this.actionObj.clone.offsetWidth) -
                        (this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint);
                }
                else {
                    rightOffset = rightOffset + this.widthUptoCursorPoint;
                    if (rightOffset - this.widthUptoCursorPoint >= viewEle.scrollWidth) {
                        this.actionObj.clone.style.width =
                            formatUnit(this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint + this.actionObj.cellWidth);
                        rightOffset = (viewEle.scrollLeft - viewEle.scrollWidth);
                    }
                }
                this.actionObj.clone.style.left = formatUnit(rightOffset);
            }
            else {
                if (this.scrollEdges.left) {
                    offsetLeft = viewEle.scrollLeft - this.widthUptoCursorPoint + this.actionObj.cellWidth;
                    if (viewEle.scrollLeft + viewEle.offsetWidth >= viewEle.offsetWidth) {
                        viewEle.scrollLeft = viewEle.scrollLeft - 1;
                    }
                    else if (this.actionObj.clone.offsetLeft === 0) {
                        offsetLeft = viewEle.scrollLeft;
                    }
                }
                else {
                    offsetLeft = (viewEle.scrollLeft + viewEle.offsetWidth -
                        this.actionObj.clone.offsetWidth) + (this.actionObj.clone.offsetWidth - this.widthUptoCursorPoint);
                }
                offsetLeft = offsetLeft < 0 ? 0 : offsetLeft;
                this.actionObj.clone.style.left = formatUnit(offsetLeft);
            }
        }
        return offsetLeft;
    };
    DragAndDrop.prototype.getWidthDiff = function (tr, index) {
        var pages = this.scrollArgs.element.getBoundingClientRect();
        if (pages.left <= this.actionObj.pageX && pages.right >= this.actionObj.pageX) {
            var targetLeft = tr.childNodes.item(index).offsetLeft;
            var pageX = this.actionObj.pageX - pages.left;
            if (this.parent.enableRtl) {
                return (targetLeft + this.actionObj.cellWidth) - (this.scrollArgs.element.scrollLeft + pageX);
            }
            else {
                return (this.scrollArgs.element.scrollLeft + pageX) - targetLeft;
            }
        }
        return 0;
    };
    DragAndDrop.prototype.getColumnIndex = function (offsetLeft) {
        var index = Math.floor(offsetLeft / this.actionObj.cellWidth);
        if (this.isHeaderRows) {
            return index;
        }
        return this.getIndex(index);
    };
    DragAndDrop.prototype.getCursorCurrentIndex = function (colIndex, cloneIndex, tr) {
        var index = colIndex + cloneIndex;
        if (this.isHeaderRows) {
            var dateLength = Math.floor(tr.offsetWidth / this.actionObj.cellWidth);
            return (index > dateLength - 1) ? dateLength - 1 : index;
        }
        return (index > tr.childNodes.length - 1) ? tr.childNodes.length - 1 : index;
    };
    DragAndDrop.prototype.cursorIndex = function (e, event, left, index) {
        var td = closest(e.target, '.e-work-cells');
        if (!isNullOrUndefined(td) && !this.isMorePopupOpened) {
            var targetDate = new Date(parseInt(td.getAttribute('data-date'), 10));
            if (this.isHeaderRows) {
                var currentIndex = Math.floor(left / this.actionObj.cellWidth);
                targetDate = new Date(this.timelineEventModule.dateRender[currentIndex + index].getTime());
            }
            var timeDiff = targetDate.getTime() - event[this.parent.eventFields.startTime].getTime();
            if (this.isTimelineDayProcess) {
                this.cursorPointIndex = Math.abs(Math.ceil(timeDiff / (util.MS_PER_DAY)));
            }
            else {
                var widthDiff = Math.floor((timeDiff / util.MS_PER_MINUTE) / (this.actionObj.slotInterval / this.actionObj.cellWidth));
                this.cursorPointIndex = Math.floor(widthDiff / this.actionObj.cellWidth);
                this.cursorPointIndex = this.cursorPointIndex < 0 ? 0 : this.cursorPointIndex;
            }
        }
        else {
            this.cursorPointIndex = 0;
        }
    };
    DragAndDrop.prototype.calculateResourceGroupingPosition = function (e) {
        var dragArea = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        var trCollection = this.parent.element.querySelectorAll('.e-content-wrap .e-content-table tr:not(.e-hidden)');
        var translateY = util.getTranslateY(dragArea.querySelector('table'));
        translateY = (isNullOrUndefined(translateY)) ? 0 : translateY;
        var rowHeight = (this.parent.rowAutoHeight) ?
            ~~(dragArea.querySelector('table').offsetHeight / trCollection.length) : this.actionObj.cellHeight;
        var rowIndex = Math.floor(Math.floor((this.actionObj.Y + (dragArea.scrollTop - translateY)) -
            dragArea.getBoundingClientRect().top) / rowHeight);
        rowIndex = (rowIndex < 0) ? 0 : (rowIndex > trCollection.length - 1) ? trCollection.length - 1 : rowIndex;
        this.actionObj.index = rowIndex;
        var eventContainer = this.parent.element.querySelectorAll('.e-appointment-container:not(.e-hidden)').item(rowIndex);
        var eventWrapper = eventContainer.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
        if (!eventWrapper) {
            eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
            eventContainer.appendChild(eventWrapper);
        }
        this.appendCloneElement(eventWrapper);
        var td = closest(e.target, 'td');
        this.actionObj.groupIndex = (td && !isNaN(parseInt(td.getAttribute('data-group-index'), 10)))
            ? parseInt(td.getAttribute('data-group-index'), 10) : this.actionObj.groupIndex;
        var top = trCollection.item(rowIndex).offsetTop;
        if (this.parent.rowAutoHeight) {
            var cursorElement = this.getCursorElement(e);
            if (cursorElement) {
                top = cursorElement.classList.contains(cls.WORK_CELLS_CLASS) ? cursorElement.offsetTop :
                    cursorElement.offsetParent.classList.contains(cls.APPOINTMENT_CLASS) ?
                        cursorElement.offsetParent.offsetTop : top;
            }
        }
        this.actionObj.clone.style.top = formatUnit(top);
    };
    DragAndDrop.prototype.appendCloneElement = function (element) {
        if (this.parent.eventDragArea) {
            document.querySelector(this.parent.eventDragArea).appendChild(this.actionObj.clone);
        }
        else {
            element.appendChild(this.actionObj.clone);
        }
    };
    DragAndDrop.prototype.getEventWrapper = function (index) {
        var eventWrapper;
        var isAllDayDrag = this.actionObj.clone.classList.contains(cls.ALLDAY_APPOINTMENT_CLASS);
        if (this.parent.activeViewOptions.timeScale.enable) {
            var wrapperClass = isAllDayDrag ? '.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS : '.' + cls.APPOINTMENT_WRAPPER_CLASS;
            eventWrapper = this.parent.element.querySelectorAll(wrapperClass).item(index);
        }
        else {
            var targetWrapper = this.parent.element.querySelectorAll('.' + cls.WORK_CELLS_CLASS).item(index);
            eventWrapper = targetWrapper.querySelector('.' + cls.APPOINTMENT_WRAPPER_CLASS);
            if (!eventWrapper) {
                eventWrapper = createElement('div', { className: cls.APPOINTMENT_WRAPPER_CLASS });
                targetWrapper.appendChild(eventWrapper);
            }
        }
        return eventWrapper;
    };
    DragAndDrop.prototype.getAllDayEventHeight = function () {
        var eventWrapper = createElement('div', { className: cls.APPOINTMENT_CLASS });
        this.parent.element.querySelector('.' + cls.ALLDAY_APPOINTMENT_WRAPPER_CLASS).appendChild(eventWrapper);
        var eventHeight = eventWrapper.offsetHeight;
        remove(eventWrapper);
        return eventHeight;
    };
    DragAndDrop.prototype.isAllowDrop = function (e) {
        if (!this.actionObj.excludeSelectors) {
            return false;
        }
        var dropSelectors = this.actionObj.excludeSelectors.split(',');
        var isAllowDrop = false;
        for (var _i = 0, dropSelectors_1 = dropSelectors; _i < dropSelectors_1.length; _i++) {
            var selector = dropSelectors_1[_i];
            if (e.target.classList.contains(selector)) {
                isAllowDrop = true;
                break;
            }
        }
        return isAllowDrop;
    };
    /**
     * Get module name.
     */
    DragAndDrop.prototype.getModuleName = function () {
        return 'dragAndDrop';
    };
    return DragAndDrop;
}(ActionBase));
export { DragAndDrop };
