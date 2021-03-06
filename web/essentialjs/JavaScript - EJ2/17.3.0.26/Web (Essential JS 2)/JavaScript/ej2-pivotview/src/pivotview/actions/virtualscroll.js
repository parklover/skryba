import { EventHandler, setStyleAttribute } from '@syncfusion/ej2-base';
import { contentReady } from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
/**
 * `VirtualScroll` module is used to handle scrolling behavior.
 */
var VirtualScroll = /** @class */ (function () {
    /**
     * Constructor for PivotView scrolling.

     */
    function VirtualScroll(parent) {
        this.previousValues = { top: 0, left: 0 };
        this.frozenPreviousValues = { top: 0, left: 0 };
        this.eventType = '';
        this.parent = parent;
        this.engineModule = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        this.addInternalEvents();
    }
    /**
     * It returns the Module name.
     * @returns string

     */
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualscroll';
    };
    VirtualScroll.prototype.addInternalEvents = function () {
        this.parent.on(contentReady, this.wireEvents, this);
    };
    VirtualScroll.prototype.wireEvents = function () {
        var mCont = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV);
        var fCont = this.parent.element.querySelector('.' + cls.FROZENCONTENT_DIV);
        var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
        EventHandler.clearEvents(mCont);
        EventHandler.clearEvents(fCont);
        if (this.engineModule) {
            EventHandler.add(mCont, 'scroll touchmove pointermove', this.onHorizondalScroll(mHdr, mCont, fCont), this);
            EventHandler.add(mCont, 'scroll wheel touchmove pointermove', this.onVerticalScroll(fCont, mCont), this);
            EventHandler.add(mCont, 'mouseup touchend', this.common(mHdr, mCont, fCont), this);
            EventHandler.add(fCont, 'wheel', this.onWheelScroll(mCont, fCont), this);
            EventHandler.add(fCont, 'touchstart pointerdown', this.setPageXY(), this);
            EventHandler.add(fCont, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont, fCont), this);
            EventHandler.add(mHdr, 'touchstart pointerdown', this.setPageXY(), this);
            EventHandler.add(mHdr, 'touchmove pointermove', this.onTouchScroll(mHdr, mCont, fCont), this);
        }
        this.parent.grid.isPreventScrollEvent = true;
    };
    VirtualScroll.prototype.onWheelScroll = function (mCont, fCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            var top = element.scrollTop + (e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY);
            if (_this.frozenPreviousValues.top === top) {
                return;
            }
            e.preventDefault();
            fCont.scrollTop = top;
            element.scrollTop = top;
            _this.frozenPreviousValues.top = top;
            _this.eventType = e.type;
        };
    };
    VirtualScroll.prototype.getPointXY = function (e) {
        var pageXY = { x: 0, y: 0 };
        if (!(e.touches && e.touches.length)) {
            pageXY.x = e.pageX;
            pageXY.y = e.pageY;
        }
        else {
            pageXY.x = e.touches[0].pageX;
            pageXY.y = e.touches[0].pageY;
        }
        return pageXY;
    };
    VirtualScroll.prototype.onTouchScroll = function (mHdr, mCont, fCont) {
        var _this = this;
        var element = mCont;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            var pageXY = _this.getPointXY(e);
            var top = element.scrollTop + (_this.pageXY.y - pageXY.y);
            var left = element.scrollLeft + (_this.pageXY.x - pageXY.x);
            if (_this.parent.element.querySelector('.' + cls.HEADERCONTENT).contains(e.target)) {
                if (_this.frozenPreviousValues.left === left || left < 0) {
                    return;
                }
                mHdr.scrollLeft = left;
                element.scrollLeft = left;
                _this.pageXY.x = pageXY.x;
                _this.frozenPreviousValues.left = left;
            }
            else {
                if (_this.frozenPreviousValues.top === top || top < 0) {
                    return;
                }
                fCont.scrollTop = top;
                element.scrollTop = top;
                _this.pageXY.y = pageXY.y;
                _this.frozenPreviousValues.top = top;
            }
            _this.eventType = e.type;
        };
    };
    VirtualScroll.prototype.update = function (mHdr, mCont, top, left, e) {
        this.parent.isScrolling = true;
        var engine = this.parent.dataType === 'pivot' ? this.parent.engineModule : this.parent.olapEngineModule;
        if (this.parent.pageSettings && engine.pageSettings) {
            if (this.direction === 'vertical') {
                var rowValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'row' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.rowSize * rowValues * this.parent.gridSettings.rowHeight);
                var section = Math.ceil(top / exactSize);
                if ((this.parent.scrollPosObject.vertical === section ||
                    engine.pageSettings.rowSize >= engine.rowCount)) {
                    hideSpinner(this.parent.element);
                    return;
                }
                showSpinner(this.parent.element);
                //setTimeout(() => {
                this.parent.scrollPosObject.vertical = section;
                engine.pageSettings.rowCurrentPage = section > 1 ? section : 1;
                var rowStartPos = 0;
                if (this.parent.dataType === 'pivot') {
                    this.parent.engineModule.generateGridData(this.parent.dataSourceSettings, this.parent.engineModule.headerCollection);
                    rowStartPos = this.parent.engineModule.rowStartPos;
                }
                else {
                    this.parent.olapEngineModule.scrollPage('scroll');
                    rowStartPos = this.parent.olapEngineModule.pageRowStartPos;
                }
                this.parent.pivotValues = engine.pivotValues;
                var exactPage = Math.ceil(rowStartPos / (this.parent.pageSettings.rowSize * rowValues));
                var pos = exactSize * exactPage -
                    (engine.rowFirstLvl * rowValues * this.parent.gridSettings.rowHeight);
                this.parent.scrollPosObject.verticalSection = pos;
                //});
            }
            else {
                var colValues = this.parent.dataType === 'pivot' ?
                    (this.parent.dataSourceSettings.valueAxis === 'column' ? this.parent.dataSourceSettings.values.length : 1) : 1;
                var exactSize = (this.parent.pageSettings.columnSize *
                    colValues * this.parent.gridSettings.columnWidth);
                var section = Math.ceil(left / exactSize);
                if (this.parent.scrollPosObject.horizontal === section) {
                    hideSpinner(this.parent.element);
                    return;
                }
                showSpinner(this.parent.element);
                var pivot = this.parent;
                //setTimeout(() => {
                pivot.scrollPosObject.horizontal = section;
                engine.pageSettings.columnCurrentPage = section > 1 ? section : 1;
                var colStartPos = 0;
                if (pivot.dataType === 'pivot') {
                    pivot.engineModule.generateGridData(pivot.dataSourceSettings, pivot.engineModule.headerCollection);
                    colStartPos = pivot.engineModule.colStartPos;
                }
                else {
                    pivot.olapEngineModule.scrollPage('scroll');
                    colStartPos = pivot.olapEngineModule.pageColStartPos;
                }
                // let isLastPage: boolean =
                //     (engine.pivotValues[0] as IAxisSet[])[engine.pivotValues[0].length - 1].type
                //     === 'grand sum' && section > 0;
                pivot.pivotValues = engine.pivotValues;
                var exactPage = Math.ceil(colStartPos / (pivot.pageSettings.columnSize * colValues));
                // let pos: number = isLastPage ?
                //     ((left + mHdr.clientWidth) - ((mHdr.querySelector('.' + cls.TABLE) as HTMLElement).offsetWidth)) :
                //     exactSize * exactPage - (engine.colFirstLvl *
                //         colValues * pivot.gridSettings.columnWidth);
                var pos = exactSize * exactPage - (engine.colFirstLvl *
                    colValues * pivot.gridSettings.columnWidth);
                pivot.scrollPosObject.horizontalSection = pos;
                //});
            }
        }
    };
    VirtualScroll.prototype.setPageXY = function () {
        var _this = this;
        return function (e) {
            if (e.pointerType === 'mouse') {
                return;
            }
            _this.pageXY = _this.getPointXY(e);
        };
    };
    VirtualScroll.prototype.common = function (mHdr, mCont, fCont) {
        var _this = this;
        return function (e) {
            _this.update(mHdr, mCont, mCont.scrollTop * _this.parent.verticalScrollScale, mCont.scrollLeft * _this.parent.horizontalScrollScale, e);
        };
    };
    VirtualScroll.prototype.onHorizondalScroll = function (mHdr, mCont, fCont) {
        var _this = this;
        /* tslint:disable-next-line */
        var timeOutObj;
        return function (e) {
            var left = mCont.scrollLeft * _this.parent.horizontalScrollScale;
            if (e.type === 'wheel' || e.type === 'touchmove' || _this.eventType === 'wheel' || _this.eventType === 'touchmove') {
                clearTimeout(timeOutObj);
                /* tslint:disable */
                timeOutObj = setTimeout(function () {
                    left = e.type === 'touchmove' ? mCont.scrollLeft : left;
                    _this.update(mHdr, mCont, mCont.scrollTop * _this.parent.verticalScrollScale, left, e);
                }, 300);
            }
            if (_this.previousValues.left === left) {
                fCont.scrollTop = mCont.scrollTop;
                return;
            }
            _this.direction = 'horizondal';
            var horiOffset = -((left - _this.parent.scrollPosObject.horizontalSection - mCont.scrollLeft));
            var vertiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[1].trim();
            if (mCont.scrollLeft < _this.parent.scrollerBrowserLimit) {
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
            }
            var excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                -(_this.parent.scrollPosObject.horizontalSection - left) : ((left + mHdr.offsetWidth) -
                (_this.parent.scrollPosObject.horizontalSection + mCont.querySelector('.e-table').offsetWidth));
            var notLastPage = Math.ceil(_this.parent.scrollPosObject.horizontalSection / _this.parent.horizontalScrollScale) <
                _this.parent.scrollerBrowserLimit;
            if (_this.parent.scrollPosObject.horizontalSection > left ? true : (excessMove > 1 && notLastPage)) {
                //  showSpinner(this.parent.element);
                if (left > mHdr.clientWidth) {
                    if (_this.parent.scrollPosObject.left < 1) {
                        _this.parent.scrollPosObject.left = mHdr.clientWidth;
                    }
                    _this.parent.scrollPosObject.left = _this.parent.scrollPosObject.left - 50;
                    excessMove = _this.parent.scrollPosObject.horizontalSection > left ?
                        (excessMove - _this.parent.scrollPosObject.left) : (excessMove + _this.parent.scrollPosObject.left);
                }
                else {
                    excessMove = -_this.parent.scrollPosObject.horizontalSection;
                }
                horiOffset = -((left - (_this.parent.scrollPosObject.horizontalSection + excessMove) - mCont.scrollLeft));
                var vWidth = (_this.parent.gridSettings.columnWidth * _this.engineModule.columnCount
                    - _this.parent.grid.columns[0].width);
                if (vWidth > _this.parent.scrollerBrowserLimit) {
                    _this.parent.horizontalScrollScale = vWidth / _this.parent.scrollerBrowserLimit;
                    vWidth = _this.parent.scrollerBrowserLimit;
                }
                if (horiOffset > vWidth && horiOffset > left) {
                    horiOffset = left;
                    excessMove = 0;
                }
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + vertiOffset
                });
                setStyleAttribute(mHdr.querySelector('.e-table'), {
                    transform: 'translate(' + horiOffset + 'px,' + 0 + 'px)'
                });
                _this.parent.scrollPosObject.horizontalSection = _this.parent.scrollPosObject.horizontalSection + excessMove;
            }
            _this.previousValues.left = left;
            _this.frozenPreviousValues.left = left;
            _this.eventType = '';
            mHdr.scrollLeft = mCont.scrollLeft;
        };
    };
    VirtualScroll.prototype.onVerticalScroll = function (fCont, mCont) {
        var _this = this;
        /* tslint:disable-next-line */
        var timeOutObj;
        return function (e) {
            var top = mCont.scrollTop * _this.parent.verticalScrollScale;
            if (e.type === 'wheel' || e.type === 'touchmove' || _this.eventType === 'wheel' || _this.eventType === 'touchmove') {
                clearTimeout(timeOutObj);
                /* tslint:disable */
                timeOutObj = setTimeout(function () {
                    _this.update(null, mCont, mCont.scrollTop * _this.parent.verticalScrollScale, mCont.scrollLeft * _this.parent.horizontalScrollScale, e);
                }, 300);
            }
            if (_this.previousValues.top === top) {
                return;
            }
            _this.direction = 'vertical';
            var vertiOffset = -((top - _this.parent.scrollPosObject.verticalSection - mCont.scrollTop));
            var horiOffset = mCont.querySelector('.' + cls.TABLE).style.transform.split(',')[0].trim();
            if (mCont.scrollTop < _this.parent.scrollerBrowserLimit) {
                setStyleAttribute(fCont.querySelector('.e-table'), {
                    transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                });
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: horiOffset + ',' + vertiOffset + 'px)'
                });
            }
            var excessMove = _this.parent.scrollPosObject.verticalSection > top ?
                -(_this.parent.scrollPosObject.verticalSection - top) : ((top + fCont.clientHeight) -
                (_this.parent.scrollPosObject.verticalSection + fCont.querySelector('.e-table').offsetHeight));
            var notLastPage = Math.ceil(_this.parent.scrollPosObject.verticalSection / _this.parent.verticalScrollScale) <
                _this.parent.scrollerBrowserLimit;
            if (_this.parent.scrollPosObject.verticalSection > top ? true : (excessMove > 1 && notLastPage)) {
                //  showSpinner(this.parent.element);
                if (top > fCont.clientHeight) {
                    if (_this.parent.scrollPosObject.top < 1) {
                        _this.parent.scrollPosObject.top = fCont.clientHeight;
                    }
                    _this.parent.scrollPosObject.top = _this.parent.scrollPosObject.top - 50;
                    excessMove = _this.parent.scrollPosObject.verticalSection > top ?
                        (excessMove - _this.parent.scrollPosObject.top) : (excessMove + _this.parent.scrollPosObject.top);
                }
                else {
                    excessMove = -_this.parent.scrollPosObject.verticalSection;
                }
                var movableTable = _this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).querySelector('.e-table');
                vertiOffset = -((top - (_this.parent.scrollPosObject.verticalSection + excessMove) - mCont.scrollTop));
                var vHeight = (_this.parent.gridSettings.rowHeight * _this.engineModule.rowCount + 0.1
                    - movableTable.clientHeight);
                if (vHeight > _this.parent.scrollerBrowserLimit) {
                    _this.parent.verticalScrollScale = vHeight / _this.parent.scrollerBrowserLimit;
                    vHeight = _this.parent.scrollerBrowserLimit;
                }
                if (vertiOffset > vHeight && vertiOffset > top) {
                    vertiOffset = top;
                    excessMove = 0;
                }
                setStyleAttribute(fCont.querySelector('.e-table'), {
                    transform: 'translate(' + 0 + 'px,' + vertiOffset + 'px)'
                });
                setStyleAttribute(mCont.querySelector('.e-table'), {
                    transform: horiOffset + ',' + vertiOffset + 'px)'
                });
                _this.parent.scrollPosObject.verticalSection = _this.parent.scrollPosObject.verticalSection + excessMove;
            }
            _this.previousValues.top = top;
            _this.frozenPreviousValues.top = top;
            _this.eventType = '';
            fCont.scrollTop = mCont.scrollTop;
            mCont.scrollTop = fCont.scrollTop;
        };
    };
    /**

     */
    VirtualScroll.prototype.removeInternalEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(contentReady, this.wireEvents);
    };
    /**
     * To destroy the virtualscrolling event listener
     * @return {void}

     */
    VirtualScroll.prototype.destroy = function () {
        this.removeInternalEvents();
    };
    return VirtualScroll;
}());
export { VirtualScroll };
