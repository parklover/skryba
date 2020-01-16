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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, Complex, Collection, Internationalization } from '@syncfusion/ej2-base';
import { Browser, remove, Event, EventHandler } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import { Chart } from '../chart/index';
import { RangeNavigator, appendChildElement, redrawElement } from '../index';
import { Rect, TextOption, measureText, SvgRenderer } from '@syncfusion/ej2-svg-base';
import { Periods } from '../common/model/base';
import { CrosshairSettings, TooltipSettings } from '../chart/index';
import { ZoomSettings } from '../chart/index';
import { calculateSize, getElement } from '../common/utils/helper';
import { getRangeValueXByPoint } from '../range-navigator/index';
import { PeriodSelector } from '../common/period-selector/period-selector';
import { CartesianChart } from './renderer/cartesian-chart';
import { RangeSelector } from './renderer/range-selector';
import { ToolBarSelector } from './renderer/toolbar-selector';
import { StockMargin, StockChartArea, StockChartAxis, StockChartRow, StockChartIndexes, StockEventsSettings } from './model/base';
import { StockSeries, StockChartIndicator, StockChartBorder } from './model/base';
import { StockChartAnnotationSettings, } from './model/base';
import { StockChartFont } from './model/base';
import { textElement, titlePositionX } from '../index';
import { getThemeColor } from '../common/model/theme';
import { StockEvents } from './renderer/stock-events';
/**
 * Stock Chart
 */
var StockChart = /** @class */ (function (_super) {
    __extends(StockChart, _super);
    /**
     * Constructor for creating the widget

     */
    function StockChart(options, element) {
        var _this = _super.call(this, options, element) || this;
        /** @private */
        _this.isSingleAxis = false;
        _this.chartid = 57723;
        _this.tempSeriesType = [];
        /** private */
        _this.zoomChange = false;
        /** @private */
        _this.allowPan = false;
        /** @private  */
        _this.onPanning = false;
        /** @private */
        _this.trendlinetriggered = true;
        /** @private */
        _this.toolbarHeight = _this.enablePeriodSelector ? (Browser.isDevice ? 56 : 42) : 0;
        /** @private */
        _this.initialRender = true;
        /** @private */
        _this.rangeFound = false;
        /** @private */
        _this.tempPeriods = [];
        return _this;
    }
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    // tslint:disable-next-line:max-func-body-length
    StockChart.prototype.onPropertyChanged = function (newProp, oldProp) {
        // on property changes
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var property = _a[_i];
            switch (property) {
                case 'series':
                    this.render();
                    break;
            }
        }
    };
    /**
     * To change the range for chart
     */
    StockChart.prototype.rangeChanged = function (updatedStart, updatedEnd) {
        // manage chart refresh
        var chartElement = document.getElementById(this.chartObject.id);
        if (chartElement) {
            while (chartElement.firstChild) {
                chartElement.removeChild(chartElement.firstChild);
            }
        }
        this.startValue = updatedStart;
        this.endValue = updatedEnd;
        this.cartesianChart.initializeChart();
        this.periodSelector.datePicker.startDate = new Date(updatedStart);
        this.periodSelector.datePicker.endDate = new Date(updatedEnd);
        this.periodSelector.datePicker.dataBind();
    };
    /**
     * Pre render for financial Chart
     */
    StockChart.prototype.preRender = function () {
        this.unWireEvents();
        this.initPrivateVariable();
        this.setCulture();
        this.stockChartTheme = getThemeColor(this.theme);
        this.wireEvents();
    };
    /**
     * Method to bind events for chart
     */
    StockChart.prototype.unWireEvents = function () {
        /*! Find the Events type */
        var startEvent = Browser.touchStartEvent;
        var moveEvent = Browser.touchMoveEvent;
        var stopEvent = Browser.touchEndEvent;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! UnBind the Event handler */
        EventHandler.remove(this.element, startEvent, this.stockChartOnMouseDown);
        EventHandler.remove(this.element, moveEvent, this.stockChartOnMouseMove);
        EventHandler.remove(this.element, stopEvent, this.stockChartMouseEnd);
        EventHandler.remove(this.element, 'click', this.stockChartOnMouseClick);
        EventHandler.remove(this.element, 'contextmenu', this.stockChartRightClick);
        EventHandler.remove(this.element, cancelEvent, this.stockChartOnMouseLeave);
        window.removeEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize);
    };
    StockChart.prototype.wireEvents = function () {
        /*! Find the Events type */
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        /*! Bind the Event handler */
        EventHandler.add(this.element, Browser.touchStartEvent, this.stockChartOnMouseDown, this);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.stockChartOnMouseMove, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.stockChartMouseEnd, this);
        EventHandler.add(this.element, 'click', this.stockChartOnMouseClick, this);
        EventHandler.add(this.element, 'contextmenu', this.stockChartRightClick, this);
        EventHandler.add(this.element, cancelEvent, this.stockChartOnMouseLeave, this);
        window.addEventListener((Browser.isTouch && ('orientation' in window && 'onorientationchange' in window)) ? 'orientationchange' : 'resize', this.stockChartResize.bind(this));
        this.setStyle(this.element);
    };
    StockChart.prototype.initPrivateVariable = function () {
        if (this.element.id === '') {
            var collection = document.getElementsByClassName('e-stockChart').length;
            this.element.id = 'stockChart_' + this.chartid + '_' + collection;
        }
        this.seriesXMax = null;
        this.seriesXMin = null;
        this.startValue = null;
        this.endValue = null;
        this.currentEnd = null;
    };
    /**
     * Method to set culture for chart
     */
    StockChart.prototype.setCulture = function () {
        this.intl = new Internationalization();
    };
    StockChart.prototype.storeDataSource = function () {
        var _this = this;
        this.series.forEach(function (series) {
            _this.tempSeriesType.push(series.type);
            series.localData = undefined;
        });
        this.initialRender = true;
        this.rangeFound = false;
        this.resizeTo = null;
        this.startValue = null;
        this.endValue = null;
    };
    /**
     * To Initialize the control rendering.
     */
    StockChart.prototype.render = function () {
        this.trigger('load', { stockChart: this });
        this.storeDataSource();
        this.drawSVG();
        this.renderTitle();
        this.chartModuleInjection();
        this.chartRender();
        if (!(this.dataSource instanceof DataManager) || !(this.series[0].dataSource instanceof DataManager)) {
            this.stockChartDataManagerSuccess();
            this.initialRender = false;
        }
        this.renderComplete();
    };
    /**
     * DataManager Success
     */
    StockChart.prototype.stockChartDataManagerSuccess = function () {
        this.findRange();
        this.renderRangeSelector();
        this.renderPeriodSelector();
        this.trigger('loaded', { stockChart: this });
    };
    /**
     * To set styles to resolve mvc width issue.
     * @param element
     */
    StockChart.prototype.setStyle = function (element) {
        var zooming = this.zoomSettings;
        var disableScroll = zooming.enableSelectionZooming || zooming.enablePinchZooming ||
            this.selectionMode !== 'None' || this.crosshair.enable;
        element.style.msTouchAction = disableScroll ? 'none' : 'element';
        element.style.touchAction = disableScroll ? 'none' : 'element';
        element.style.msUserSelect = 'none';
        element.style.msContentZooming = 'none';
        element.style.position = 'relative';
        element.style.display = 'block';
        element.style.webkitUserSelect = 'none';
    };
    StockChart.prototype.drawSVG = function () {
        this.removeSvg();
        calculateSize(this);
        this.renderer = new SvgRenderer(this.element.id);
        this.renderBorder();
        this.createSecondaryElements();
        //overall svg in which chart and selector appened
        this.mainObject = this.renderer.createSvg({
            id: this.element.id + '_stockChart_svg',
            width: this.availableSize.width,
            height: this.availableSize.height - (this.enablePeriodSelector ? this.toolbarHeight : 0) - this.titleSize.height
        });
        this.svgObject = this.mainObject;
        this.element.appendChild(this.mainObject);
    };
    StockChart.prototype.createSecondaryElements = function () {
        var tooltipDiv = redrawElement(false, this.element.id + '_Secondary_Element') ||
            this.createElement('div');
        tooltipDiv.id = this.element.id + '_Secondary_Element';
        if (this.title) {
            this.titleSize = measureText(this.title, this.titleStyle);
            this.titleSize.height += 15; // for title padding
        }
        else {
            this.titleSize = { height: null, width: null };
        }
        var height = (this.enablePeriodSelector ? this.toolbarHeight : 0) + this.titleSize.height;
        tooltipDiv.setAttribute('style', 'position: relative; height:' + height + 'px');
        appendChildElement(false, this.element, tooltipDiv, false);
    };
    StockChart.prototype.findCurrentData = function (totalData, xName) {
        var _this = this;
        var tempData;
        if (totalData && this.startValue && this.endValue) {
            tempData = totalData
                .filter(function (data) {
                return (new Date(Date.parse(data[xName])).getTime() >= _this.startValue &&
                    new Date(Date.parse(data[xName])).getTime() <= _this.endValue);
            });
        }
        return tempData;
    };
    /**
     * Render period selector
     */
    StockChart.prototype.renderPeriodSelector = function () {
        if (this.enablePeriodSelector) {
            this.toolbarSelector.initializePeriodSelector();
            this.periodSelector.toolbar.refreshOverflow(); //to avoid overlapping toolbar elements
            if (!this.enableSelector) {
                this.cartesianChart.cartesianChartRefresh(this, this.startValue, this.endValue);
            }
        }
    };
    StockChart.prototype.chartRender = function () {
        this.cartesianChart = new CartesianChart(this);
        this.cartesianChart.initializeChart();
    };
    /**
     * To render range Selector
     */
    StockChart.prototype.renderRangeSelector = function () {
        //SVG in which range navigator is going to append
        if (this.enableSelector) {
            this.rangeSelector = new RangeSelector(this);
            this.rangeSelector.initializeRangeNavigator();
        }
    };
    /**
     * Get component name
     */
    StockChart.prototype.getModuleName = function () {
        return 'stockChart';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    StockChart.prototype.getPersistData = function () {
        return '';
    };
    /**
     * To Remove the SVG.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.removeSvg = function () {
        if (document.getElementById(this.element.id + '_Secondary_Element')) {
            remove(document.getElementById(this.element.id + '_Secondary_Element'));
        }
        var removeLength = 0;
        if (this.mainObject) {
            while (this.mainObject.childNodes.length > removeLength) {
                this.mainObject.removeChild(this.mainObject.firstChild);
            }
            if (!this.mainObject.hasChildNodes() && this.mainObject.parentNode) {
                remove(this.mainObject);
                this.mainObject = null;
                this.selectorObject = null;
                this.chartObject = null;
            }
        }
    };
    /**
     * Module Injection for components
     */
    StockChart.prototype.chartModuleInjection = function () {
        var moduleName;
        for (var _i = 0, _a = this.getInjectedModules(); _i < _a.length; _i++) {
            var modules = _a[_i];
            moduleName = modules.prototype.getModuleName().toLowerCase();
            if (moduleName.indexOf('rangetooltip') === -1) {
                Chart.Inject(modules);
            }
            else {
                RangeNavigator.Inject(modules);
            }
            if (moduleName === 'datetime' || moduleName === 'areaseries' || moduleName === 'steplineseries') {
                RangeNavigator.Inject(modules);
            }
        }
    };
    /**
     * find range for financal chart
     */
    StockChart.prototype.findRange = function () {
        var _this = this;
        this.seriesXMin = Infinity;
        this.seriesXMax = -Infinity;
        for (var _i = 0, _a = this.chart.series; _i < _a.length; _i++) {
            var value = _a[_i];
            this.seriesXMin = Math.min(this.seriesXMin, value.xMin);
            this.seriesXMax = Math.max(this.seriesXMax, value.xMax);
        }
        this.endValue = this.currentEnd = this.seriesXMax;
        if (this.enablePeriodSelector) {
            this.toolbarSelector = new ToolBarSelector(this);
            this.periodSelector = new PeriodSelector(this);
            this.tempPeriods = this.periods.length ? this.periods : this.toolbarSelector.calculateAutoPeriods();
            this.tempPeriods.map(function (period, index) {
                if (period.selected && period.text.toLowerCase() === 'ytd') {
                    _this.startValue = new Date(new Date(_this.currentEnd).getFullYear().toString()).getTime();
                }
                else if (period.selected && period.text.toLowerCase() === 'all') {
                    _this.startValue = _this.seriesXMin;
                }
                else if (period.selected) {
                    _this.startValue = _this.periodSelector.changedRange(period.intervalType, _this.endValue, period.interval).getTime();
                }
            });
        }
        else {
            this.startValue = this.seriesXMin;
        }
        this.rangeFound = true;
    };
    /**
     * Handles the chart resize.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartResize = function (e) {
        var _this = this;
        // To avoid resize console error
        if (!document.getElementById(this.element.id)) {
            return false;
        }
        this.animateSeries = false;
        if (this.resizeTo) {
            clearTimeout(this.resizeTo);
        }
        this.resizeTo = setTimeout(function () {
            calculateSize(_this);
            _this.renderBorder();
            _this.renderTitle();
            _this.cartesianChart.cartesianChartRefresh(_this, _this.startValue, _this.endValue);
            _this.mainObject.setAttribute('width', _this.availableSize.width.toString());
            if (_this.enablePeriodSelector) {
                _this.renderPeriodSelector();
            }
        }, 500);
        return false;
    };
    /**
     * Handles the mouse down on chart.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseDown = function (e) {
        var pageX;
        var pageY;
        var target;
        var touchArg;
        var offset = Browser.isDevice ? 20 : 30;
        var rect = this.chart.element.getBoundingClientRect();
        var element = e.target;
        this.trigger('stockChartMouseDown', { target: element.id, x: this.mouseX, y: this.mouseY });
        if (e.type === 'touchstart') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            target = touchArg.target;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            this.isTouch = e.pointerType === 'touch';
            pageX = e.clientX;
            pageY = e.clientY;
            target = e.target;
        }
        if (target.id.indexOf(this.element.id + '_stockChart_chart') > -1) {
            var svgRect = getElement(this.element.id + '_stockChart_chart').getBoundingClientRect();
            this.mouseDownY = this.previousMouseMoveY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
            this.mouseDownX = this.previousMouseMoveX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
            this.setMouseXY(this.mouseDownX, this.mouseDownY);
            this.referenceXAxis = this.chart.primaryXAxis;
            getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
            this.mouseDownXPoint = getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.referenceXAxis.visibleRange, this.referenceXAxis.isInversed);
            this.allowPan = true;
            this.notify(Browser.touchStartEvent, e);
        }
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartMouseEnd = function (e) {
        var pageY;
        var pageX;
        var touchArg;
        if (e.type === 'touchend') {
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
            this.isTouch = true;
        }
        else {
            pageY = e.clientY;
            pageX = e.clientX;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'auto');
        this.onPanning = false;
        this.setMouseXY(pageX, pageY);
        this.stockChartOnMouseUp(e);
        return false;
    };
    /**
     * Handles the mouse up.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseUp = function (e) {
        var element = e.target;
        this.trigger('stockChartMouseUp', { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.allowPan = false;
        if (this.isTouch) {
            this.threshold = new Date().getTime() + 300;
        }
        this.notify(Browser.touchEndEvent, e);
        if (this.stockEvent) {
            this.stockEvent.removeStockEventTooltip(0);
        }
        return false;
    };
    /**
     * To find mouse x, y for aligned chart element svg position
     */
    StockChart.prototype.setMouseXY = function (pageX, pageY) {
        var svgRect = getElement(this.element.id + '_stockChart_chart').getBoundingClientRect();
        var rect = this.element.getBoundingClientRect();
        this.mouseX = (pageX - rect.left) - Math.max(svgRect.left - rect.left, 0);
        this.mouseY = (pageY - rect.top) - Math.max(svgRect.top - rect.top, 0);
    };
    /**
     * Handles the mouse move.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseMove = function (e) {
        var pageX;
        var touchArg;
        var pageY;
        if (e.type === 'touchmove') {
            this.isTouch = true;
            touchArg = e;
            pageY = touchArg.changedTouches[0].clientY;
            pageX = touchArg.changedTouches[0].clientX;
        }
        else {
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2' || this.isTouch;
            pageX = e.clientX;
            pageY = e.clientY;
        }
        this.trigger('stockChartMouseMove', { target: e.target.id, x: this.mouseX, y: this.mouseY });
        this.setMouseXY(pageX, pageY);
        this.chartOnMouseMove(e);
        return false;
    };
    /**
     * Handles the mouse move on chart.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.chartOnMouseMove = function (e) {
        if (this.allowPan && this.mouseDownXPoint && this.mouseX !== this.previousMouseMoveX && this.zoomSettings.enablePan) {
            this.onPanning = true;
            getElement(this.element.id + '_stockChart_chart').setAttribute('cursor', 'pointer');
            this.mouseUpXPoint = getRangeValueXByPoint(this.mouseX - this.referenceXAxis.rect.x, this.referenceXAxis.rect.width, this.referenceXAxis.visibleRange, this.referenceXAxis.isInversed);
            var diff = Math.abs(this.mouseUpXPoint - this.mouseDownXPoint);
            if (this.mouseDownXPoint < this.mouseUpXPoint) {
                if (this.seriesXMin <= this.referenceXAxis.visibleRange.min - diff) {
                    this.startValue = this.referenceXAxis.visibleRange.min - diff;
                    this.endValue = this.referenceXAxis.visibleRange.max - diff;
                    this.cartesianChart.cartesianChartRefresh(this, this.referenceXAxis.visibleRange.min - diff, this.referenceXAxis.visibleRange.max - diff);
                    this.rangeSelector.sliderChange(this.referenceXAxis.visibleRange.min - diff, this.referenceXAxis.visibleRange.max - diff);
                }
            }
            else {
                if (this.seriesXMax >= this.referenceXAxis.visibleRange.max + diff) {
                    this.startValue = this.referenceXAxis.visibleRange.min + diff;
                    this.endValue = this.referenceXAxis.visibleRange.max + diff;
                    this.cartesianChart.cartesianChartRefresh(this, this.referenceXAxis.visibleRange.min + diff, this.referenceXAxis.visibleRange.max + diff);
                    this.rangeSelector.sliderChange(this.referenceXAxis.visibleRange.min + diff, this.referenceXAxis.visibleRange.max + diff);
                }
            }
        }
        this.notify(Browser.touchMoveEvent, e);
        if (e.target.id === '') { //to remove the tooltip when hover on mouse move
            var element = void 0;
            if (this.chart.tooltip.enable || this.crosshair.enable) {
                element = document.getElementById(this.element.id + '_stockChart_chart_tooltip');
                if (element) {
                    remove(element);
                }
            }
            if (getElement(this.element.id + '_StockEvents_Tooltip')) {
                this.stockEvent.removeStockEventTooltip(0);
            }
        }
        if (e.target.id.indexOf('StockEvents') !== -1) {
            clearInterval(this.stockEvent.toolTipInterval);
            this.stockEvent.renderStockEventTooltip(e.target.id);
        }
        else {
            if (this.stockEvent) {
                this.stockEvent.removeStockEventTooltip(1000);
            }
        }
        this.isTouch = false;
        return false;
    };
    /**
     * Handles the mouse click on chart.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseClick = function (e) {
        var element = e.target;
        this.trigger('stockChartMouseClick', { target: element.id, x: this.mouseX, y: this.mouseY });
        this.notify('click', e);
        return false;
    };
    StockChart.prototype.stockChartRightClick = function (event) {
        if (this.crosshair.enable &&
            (event.buttons === 2 || event.which === 0 || event.pointerType === 'touch')) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return true;
    };
    /**
     * Handles the mouse leave.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseLeave = function (e) {
        var touchArg;
        var pageX;
        var pageY;
        if (e.type === 'touchleave') {
            this.isTouch = true;
            touchArg = e;
            pageX = touchArg.changedTouches[0].clientX;
            pageY = touchArg.changedTouches[0].clientY;
        }
        else {
            pageX = e.clientX;
            pageY = e.clientY;
            this.isTouch = e.pointerType === 'touch' || e.pointerType === '2';
        }
        this.setMouseXY(pageX, pageY);
        this.allowPan = false;
        this.stockChartOnMouseLeaveEvent(e);
        return false;
    };
    /**
     * Handles the mouse leave on chart.
     * @return {boolean}
     * @private
     */
    StockChart.prototype.stockChartOnMouseLeaveEvent = function (e) {
        var element = e.target;
        var cancelEvent = Browser.isPointer ? 'pointerleave' : 'mouseleave';
        //this.trigger(chartMouseLeave, { target: element.id, x: this.mouseX, y: this.mouseY });
        this.isChartDrag = false;
        this.notify(cancelEvent, e);
        if (this.stockEvent) {
            this.stockEvent.removeStockEventTooltip(1000);
        }
        return false;
    };
    /**
     * Destroy method
     */
    StockChart.prototype.destroy = function () {
        //Perform destroy here
    };
    StockChart.prototype.renderBorder = function () {
        if (this.border.width) {
            var border = this.createElement('div');
            border.id = this.element.id + '_stock_border';
            border.style.width = (this.availableSize.width) + 'px';
            border.style.height = (this.availableSize.height) + 'px';
            border.style.position = 'absolute';
            border.style.border = this.border.width + 'px solid ' + this.border.color;
            border.style.pointerEvents = 'none';
            appendChildElement(false, getElement(this.element.id), border);
        }
    };
    /**
     * Render title for chart
     */
    StockChart.prototype.renderTitle = function () {
        var rect;
        if (this.title) {
            appendChildElement(false, getElement(this.element.id + '_Secondary_Element'), this.renderer.createSvg({
                id: this.element.id + '_stockChart_Title',
                width: this.availableSize.width,
                height: this.titleSize.height,
                fill: this.background || this.stockChartTheme.background
            }), false);
            var alignment = this.titleStyle.textAlignment;
            var getAnchor = alignment === 'Near' ? 'start' : alignment === 'Far' ? 'end' : 'middle';
            rect = new Rect(0, 0, this.availableSize.width, 0);
            var options = new TextOption(this.element.id + '_ChartTitle', titlePositionX(rect, this.titleStyle), ((this.titleSize.height - 10)), getAnchor, this.title, '', 'auto');
            var element = textElement(this.renderer, options, this.titleStyle, this.titleStyle.color || this.findTitleColor(), getElement(this.element.id + '_stockChart_Title'), false, false);
            this.availableSize.height -= (this.titleSize.height + 5);
        }
    };
    StockChart.prototype.findTitleColor = function () {
        if (this.theme.indexOf('Highcontrast') > -1 || this.theme.indexOf('Dark') > -1) {
            return '#ffffff';
        }
        return '#424242';
    };
    /**
     * @private
     */
    StockChart.prototype.calculateStockEvents = function () {
        if (this.stockEvents.length) {
            this.stockEvent = new StockEvents(this);
            appendChildElement(false, this.chartObject, this.stockEvent.renderStockEvents());
        }
    };
    __decorate([
        Property(null)
    ], StockChart.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], StockChart.prototype, "height", void 0);
    __decorate([
        Property('')
    ], StockChart.prototype, "dataSource", void 0);
    __decorate([
        Complex({}, StockMargin)
    ], StockChart.prototype, "margin", void 0);
    __decorate([
        Complex({ color: '#DDDDDD', width: 1 }, StockChartBorder)
    ], StockChart.prototype, "border", void 0);
    __decorate([
        Property(null)
    ], StockChart.prototype, "background", void 0);
    __decorate([
        Property('Material')
    ], StockChart.prototype, "theme", void 0);
    __decorate([
        Complex({ name: 'primaryXAxis', valueType: 'DateTime' }, StockChartAxis)
    ], StockChart.prototype, "primaryXAxis", void 0);
    __decorate([
        Complex({ border: { color: null, width: 0.5 }, background: 'transparent' }, StockChartArea)
    ], StockChart.prototype, "chartArea", void 0);
    __decorate([
        Complex({ name: 'primaryYAxis', opposedPosition: true, labelPosition: 'Inside' }, StockChartAxis)
    ], StockChart.prototype, "primaryYAxis", void 0);
    __decorate([
        Collection([{}], StockChartRow)
    ], StockChart.prototype, "rows", void 0);
    __decorate([
        Collection([{ opposedPosition: true }], StockChartAxis)
    ], StockChart.prototype, "axes", void 0);
    __decorate([
        Collection([], StockSeries)
    ], StockChart.prototype, "series", void 0);
    __decorate([
        Collection([], StockEventsSettings)
    ], StockChart.prototype, "stockEvents", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isTransposed", void 0);
    __decorate([
        Property('')
    ], StockChart.prototype, "title", void 0);
    __decorate([
        Complex({ size: '15px', fontWeight: '500', color: null, fontStyle: 'Normal', fontFamily: 'Segoe UI' }, StockChartFont)
    ], StockChart.prototype, "titleStyle", void 0);
    __decorate([
        Collection([], StockChartIndicator)
    ], StockChart.prototype, "indicators", void 0);
    __decorate([
        Complex({ shared: true, enableMarker: false }, TooltipSettings)
    ], StockChart.prototype, "tooltip", void 0);
    __decorate([
        Complex({ dashArray: '5' }, CrosshairSettings)
    ], StockChart.prototype, "crosshair", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], StockChart.prototype, "zoomSettings", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enablePeriodSelector", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enableCustomRange", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isSelect", void 0);
    __decorate([
        Property(true)
    ], StockChart.prototype, "enableSelector", void 0);
    __decorate([
        Collection([], Periods)
    ], StockChart.prototype, "periods", void 0);
    __decorate([
        Collection([{}], StockChartAnnotationSettings)
    ], StockChart.prototype, "annotations", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "selectorRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseMove", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseLeave", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseDown", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseUp", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockChartMouseClick", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "pointClick", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "pointMove", void 0);
    __decorate([
        Property('None')
    ], StockChart.prototype, "selectionMode", void 0);
    __decorate([
        Property(false)
    ], StockChart.prototype, "isMultiSelect", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "load", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "loaded", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "rangeChange", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "axisLabelRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "tooltipRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "seriesRender", void 0);
    __decorate([
        Event()
    ], StockChart.prototype, "stockEventRender", void 0);
    __decorate([
        Collection([], StockChartIndexes)
    ], StockChart.prototype, "selectedDataIndexes", void 0);
    __decorate([
        Property(['Line', 'Hilo', 'OHLC', 'Hollow Candle', 'Spline', 'Candle'])
    ], StockChart.prototype, "seriesType", void 0);
    __decorate([
        Property(['EMA', 'TMA', 'SMA', 'Momentum', 'ATR', 'Accumulation Distribution', 'Bollinger Bands', 'MACD', 'Stochastic', 'RSI'])
    ], StockChart.prototype, "indicatorType", void 0);
    __decorate([
        Property(['PNG', 'JPEG', 'SVG', 'PDF', 'Print'])
    ], StockChart.prototype, "exportType", void 0);
    __decorate([
        Property(['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'Moving Average'])
    ], StockChart.prototype, "trendlineType", void 0);
    return StockChart;
}(Component));
export { StockChart };
