import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { spreadsheetDestroyed, beforeContentLoaded, beforeVirtualContentLoaded, virtualContentLoaded } from '../common/index';
import { colWidthChanged } from '../common/index';
import { onVerticalScroll, onHorizontalScroll, rowHeightChanged, beforeHeaderLoaded, deInitProperties } from '../common/index';
import { getRowHeight, getRowsHeight, getColumnWidth, getColumnsWidth, isHiddenRow } from './../../workbook/index';
import { getCellAddress } from '../../workbook/common/index';
import { updateUsedRange, sheetCreated, sheetsDestroyed } from '../../workbook/common/event';
/**
 * VirtualScroll module

 */
var VirtualScroll = /** @class */ (function () {
    function VirtualScroll(parent) {
        this.scroll = [];
        this.parent = parent;
        this.addEventListener();
    }
    VirtualScroll.prototype.createVirtualElement = function (args) {
        var sheet = this.parent.getActiveSheet();
        var container = this.parent.getMainContent();
        this.content = this.parent.createElement('div', { className: 'e-virtualable' });
        this.content.appendChild(container.querySelector('.e-table'));
        container.appendChild(this.content);
        var vTrack = container.appendChild(this.parent.createElement('div', { className: 'e-virtualtrack' }));
        var colVTrack;
        var rowVTrack;
        var height;
        var width;
        if (this.parent.sheets.length > this.scroll.length) {
            this.initScroll();
        }
        var domCount = this.parent.viewport.rowCount + 1 + (this.parent.getThreshold('row') * 2);
        if (sheet.rowCount > domCount || sheet.usedRange.rowIndex > domCount) {
            if (sheet.rowCount < sheet.usedRange.rowIndex) {
                sheet.rowCount = sheet.usedRange.rowIndex;
            }
            this.setScrollCount(sheet.rowCount, 'row');
            height = getRowsHeight(sheet, 0, this.scroll[this.parent.activeSheetTab - 1].rowCount - 1);
        }
        else {
            this.scroll[this.parent.activeSheetTab - 1].rowCount = sheet.rowCount = domCount;
            height = 1;
        }
        domCount = this.parent.viewport.colCount + 1 + (this.parent.getThreshold('col') * 2);
        var size = getColumnsWidth(sheet, 0, domCount - 1);
        if (sheet.colCount > domCount) {
            if (sheet.colCount < sheet.usedRange.colIndex) {
                sheet.colCount = sheet.usedRange.colIndex;
            }
            this.setScrollCount(sheet.colCount, 'col');
            width = size + getColumnsWidth(sheet, domCount, this.scroll[this.parent.activeSheetTab - 1].colCount - 1);
        }
        else {
            sheet.colCount = domCount;
            width = size;
        }
        this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
        if (args.startColIdx) {
            size = getColumnsWidth(sheet, args.startColIdx, args.startColIdx + domCount - 1);
        }
        if (isNullOrUndefined(this.translateX)) {
            this.parent.viewport.leftIndex = 0;
            this.translateX = 0;
        }
        if (isNullOrUndefined(this.parent.viewport.topIndex)) {
            this.parent.viewport.topIndex = 0;
        }
        if (isNullOrUndefined(this.translateY)) {
            this.translateY = 0;
        }
        if (sheet.showHeaders) {
            container = this.parent.getRowHeaderContent();
            this.rowHeader = this.content.cloneNode();
            this.rowHeader.appendChild(container.querySelector('.e-table'));
            container.appendChild(this.rowHeader);
            rowVTrack = container.appendChild(vTrack.cloneNode());
            this.rowHeader.style.transform = "translate(0px, " + this.translateY + "px)";
            container = this.parent.getColumnHeaderContent();
            this.colHeader = this.content.cloneNode();
            this.colHeader.appendChild(container.querySelector('.e-table'));
            container.appendChild(this.colHeader);
            colVTrack = container.appendChild(vTrack.cloneNode());
            this.colHeader.style.width = size + "px";
            rowVTrack.style.height = height + "px";
            colVTrack.style.width = width + "px";
            this.colHeader.style.transform = "translate(" + this.translateX + "px, 0px)";
        }
        this.content.style.transform = "translate(" + this.translateX + "px, " + this.translateY + "px)";
        this.content.style.width = size + "px";
        vTrack.style.height = height + "px";
        vTrack.style.width = width + "px";
    };
    VirtualScroll.prototype.initScroll = function () {
        var i = 0;
        while (i < this.parent.sheets.length) {
            if (!this.scroll[i]) {
                this.scroll.push({ rowCount: 0, colCount: 0 });
            }
            i++;
        }
    };
    VirtualScroll.prototype.setScrollCount = function (count, layout) {
        var activeSheetIdx = this.parent.activeSheetTab - 1;
        if (!this.scroll[activeSheetIdx][layout + 'Count']) {
            this.scroll[activeSheetIdx][layout + 'Count'] = count;
        }
    };
    VirtualScroll.prototype.getAddress = function (topIdx) {
        return getCellAddress(topIdx[0], this.parent.viewport.leftIndex) + ":" + getCellAddress(topIdx[1], this.parent.viewport.leftIndex + this.parent.viewport.colCount + (this.parent.getThreshold('col') * 2));
    };
    VirtualScroll.prototype.getColAddress = function (leftIdx) {
        return getCellAddress(this.parent.viewport.topIndex, leftIdx[0]) + ":" + getCellAddress(this.parent.viewport.topIndex + this.parent.viewport.rowCount + (this.parent.getThreshold('row') * 2), leftIdx[1]);
    };
    VirtualScroll.prototype.updateScrollCount = function (idx, layout, threshold) {
        if (threshold === void 0) { threshold = idx; }
        var sheet = this.parent.getActiveSheet();
        var rowCount = idx + this.parent.viewport[layout + 'Count'] + 1 + threshold;
        var usedRangeCount = this.scroll[this.parent.activeSheetTab - 1][layout + 'Count'];
        if (rowCount < usedRangeCount) {
            if (sheet[layout + 'Count'] === usedRangeCount) {
                return;
            }
            rowCount = usedRangeCount;
        }
        if (!this.parent.scrollSettings.isFinite) {
            sheet[layout + 'Count'] = rowCount;
            this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
        }
    };
    VirtualScroll.prototype.onVerticalScroll = function (args) {
        var idx = args.cur.idx;
        var height = args.cur.size;
        var prevIdx = args.prev.idx;
        var idxDiff = Math.abs(idx - prevIdx);
        var threshold = this.parent.getThreshold('row');
        if (idxDiff > Math.round(threshold / 2)) {
            var startIdx = void 0;
            var lastIdx = void 0;
            var prevTopIdx = void 0;
            if (idx <= threshold) {
                if (!args.increase) {
                    if (this.translateY && prevIdx > threshold) {
                        this.translateY = 0;
                        this.parent.viewport.topIndex = prevIdx - threshold;
                        if (!args.preventScroll) {
                            if (idxDiff < this.parent.viewport.rowCount + threshold) {
                                lastIdx = this.parent.viewport.topIndex - 1;
                                startIdx = this.parent.skipHiddenRows(0, lastIdx)[0];
                                this.parent.viewport.topIndex = startIdx;
                                this.parent.viewport.bottomIndex -=
                                    (idxDiff - this.checkHiddenCount(startIdx, lastIdx));
                                this.parent.renderModule.refreshUI({ colIndex: this.parent.viewport.leftIndex, direction: 'last', refresh: 'RowPart' }, this.getAddress([0, lastIdx]));
                            }
                            else {
                                this.parent.renderModule.refreshUI({ rowIndex: 0, colIndex: this.parent.viewport.leftIndex, refresh: 'Row' });
                            }
                        }
                    }
                    this.updateScrollCount(threshold, 'row');
                }
            }
            if (prevIdx < threshold) {
                idxDiff = Math.abs(idx - threshold);
            }
            if (idx > threshold) {
                prevTopIdx = this.parent.viewport.topIndex;
                this.parent.viewport.topIndex = idx - threshold;
                if (args.increase && prevTopIdx > this.parent.viewport.topIndex) {
                    this.parent.viewport.topIndex = prevTopIdx;
                    return;
                }
                this.translateY = height - this.getThresholdHeight(this.parent.viewport.topIndex, threshold);
                if (!args.preventScroll) {
                    if (idxDiff < this.parent.viewport.rowCount + threshold) {
                        if (args.increase) {
                            startIdx = this.parent.viewport.bottomIndex + 1;
                            lastIdx = this.parent.viewport.bottomIndex + (this.parent.viewport.topIndex - prevTopIdx);
                            lastIdx -= this.checkHiddenCount(prevTopIdx, this.parent.viewport.topIndex - 1);
                            if (lastIdx === this.parent.viewport.bottomIndex) {
                                return;
                            }
                            var indexes = this.parent.skipHiddenRows(startIdx, lastIdx);
                            startIdx = indexes[0];
                            lastIdx = indexes[1];
                            lastIdx = this.checkLastIdx(lastIdx, 'row');
                            this.parent.viewport.bottomIndex = lastIdx;
                            this.parent.renderModule.refreshUI({ colIndex: this.parent.viewport.leftIndex, direction: 'first', refresh: 'RowPart' }, this.getAddress([startIdx, lastIdx]));
                        }
                        else {
                            startIdx = this.parent.viewport.topIndex;
                            lastIdx = startIdx + idxDiff - 1;
                            this.parent.viewport.bottomIndex -=
                                (idxDiff - this.checkHiddenCount(startIdx, lastIdx));
                            startIdx = this.parent.skipHiddenRows(startIdx, lastIdx)[0];
                            this.parent.renderModule.refreshUI({ colIndex: this.parent.viewport.leftIndex, direction: 'last', refresh: 'RowPart' }, this.getAddress([startIdx, lastIdx]));
                        }
                    }
                    else {
                        this.parent.renderModule.refreshUI({
                            rowIndex: this.parent.viewport.topIndex,
                            colIndex: this.parent.viewport.leftIndex, refresh: 'Row'
                        });
                    }
                    this.updateScrollCount(idx, 'row', threshold);
                }
            }
            args.prev.idx = idx;
        }
    };
    VirtualScroll.prototype.checkHiddenCount = function (startIdx, endIdx) {
        var index = 0;
        var sheet = this.parent.getActiveSheet();
        for (var i = startIdx; i <= endIdx; i++) {
            if (isHiddenRow(sheet, i)) {
                index++;
            }
        }
        return index;
    };
    VirtualScroll.prototype.checkLastIdx = function (idx, layout) {
        if (this.parent.scrollSettings.isFinite) {
            var count = this.parent.getActiveSheet()[layout + 'Count'] - 1;
            if (idx > count) {
                idx = count;
            }
        }
        return idx;
    };
    VirtualScroll.prototype.onHorizontalScroll = function (args) {
        var idx = args.cur.idx;
        var width = args.cur.size;
        var prevIdx = args.prev.idx;
        var idxDiff = Math.abs(idx - prevIdx);
        var threshold = this.parent.getThreshold('col');
        if (idxDiff > Math.round(threshold / 2)) {
            if (idx <= threshold) {
                if (!args.increase) {
                    this.updateScrollCount(threshold, 'col');
                    if (this.translateX && prevIdx > threshold) {
                        this.translateX = 0;
                        this.parent.viewport.leftIndex = prevIdx - threshold;
                        if (idxDiff < this.parent.viewport.rowCount + threshold) {
                            this.parent.renderModule.refreshUI({ rowIndex: this.parent.viewport.topIndex, colIndex: 0, direction: 'last', refresh: 'ColumnPart' }, this.getColAddress([0, this.parent.viewport.leftIndex - 1]));
                        }
                        else {
                            this.parent.renderModule.refreshUI({ rowIndex: this.parent.viewport.topIndex, colIndex: 0, refresh: 'Column' });
                        }
                        this.parent.viewport.leftIndex = 0;
                    }
                }
            }
            if (prevIdx < threshold) {
                idxDiff = Math.abs(idx - threshold);
            }
            if (idx > threshold) {
                this.updateScrollCount(args.cur.idx, 'col', threshold);
                this.parent.viewport.leftIndex = idx - threshold;
                this.translateX = width - this.getThresholdWidth(this.parent.viewport.leftIndex, threshold);
                if (!args.preventScroll) {
                    if (idxDiff < this.parent.viewport.colCount + threshold) {
                        if (args.increase) {
                            var lastIdx = this.parent.viewport.leftIndex + this.parent.viewport.colCount + (threshold * 2);
                            this.parent.renderModule.refreshUI({
                                rowIndex: this.parent.viewport.topIndex, colIndex: lastIdx - idxDiff + 1,
                                direction: 'first', refresh: 'ColumnPart'
                            }, this.getColAddress([lastIdx - idxDiff + 1, this.checkLastIdx(lastIdx, 'col')]));
                        }
                        else {
                            this.parent.renderModule.refreshUI({
                                rowIndex: this.parent.viewport.topIndex, colIndex: this.parent.viewport.leftIndex,
                                direction: 'last', refresh: 'ColumnPart'
                            }, this.getColAddress([this.parent.viewport.leftIndex, this.parent.viewport.leftIndex + idxDiff - 1]));
                        }
                    }
                    else {
                        this.parent.renderModule.refreshUI({
                            rowIndex: this.parent.viewport.topIndex,
                            colIndex: this.parent.viewport.leftIndex, refresh: 'Column'
                        });
                    }
                }
            }
            args.prev.idx = idx;
        }
    };
    VirtualScroll.prototype.getThresholdHeight = function (idx, threshold) {
        var height = 0;
        var sheet = this.parent.getActiveSheet();
        for (var i = idx; i < idx + threshold; i++) {
            height += getRowHeight(sheet, i);
        }
        return height;
    };
    VirtualScroll.prototype.getThresholdWidth = function (idx, threshold) {
        var width = 0;
        var sheet = this.parent.getActiveSheet();
        for (var i = idx; i < idx + threshold; i++) {
            width += getColumnWidth(sheet, i);
        }
        return width;
    };
    VirtualScroll.prototype.translate = function (args) {
        var sheet = this.parent.getActiveSheet();
        if (args.refresh === 'Row' || args.refresh === 'RowPart') {
            this.content.style.transform = "translate(" + this.translateX + "px, " + this.translateY + "px)";
            if (sheet.showHeaders) {
                this.rowHeader.style.transform = "translate(0px, " + this.translateY + "px)";
            }
        }
        if (args.refresh === 'Column' || args.refresh === 'ColumnPart') {
            var translateX = this.parent.enableRtl ? -this.translateX : this.translateX;
            this.content.style.transform = "translate(" + translateX + "px, " + this.translateY + "px)";
            if (sheet.showHeaders) {
                this.colHeader.style.transform = "translate(" + translateX + "px, 0px)";
            }
        }
    };
    VirtualScroll.prototype.updateColumnWidth = function (args) {
        if (args.refresh === 'Column') {
            this.content.style.width = '';
            var width = this.content.querySelector('tr').getBoundingClientRect().width;
            if (this.parent.getActiveSheet().showHeaders) {
                this.colHeader.style.width = width + 'px';
            }
            this.content.style.width = width + 'px';
        }
    };
    VirtualScroll.prototype.updateUsedRange = function (args) {
        if (!this.scroll.length) {
            return;
        }
        var sheet = this.parent.getActiveSheet();
        if (args.update === 'row') {
            if (args.index > this.scroll[this.parent.activeSheetTab - 1].rowCount) {
                var height = this.getVTrackHeight('height');
                height += getRowsHeight(sheet, this.scroll[this.parent.activeSheetTab - 1].rowCount, args.index);
                this.scroll[this.parent.activeSheetTab - 1].rowCount = args.index + 1;
                this.updateVTrack(this.rowHeader, height, 'height');
                if (this.scroll[this.parent.activeSheetTab - 1].rowCount > sheet.rowCount) {
                    sheet.rowCount = this.scroll[this.parent.activeSheetTab - 1].rowCount;
                }
            }
        }
        else {
            if (args.index > this.scroll[this.parent.activeSheetTab - 1].colCount) {
                var width = this.getVTrackHeight('width');
                width += getColumnsWidth(sheet, this.scroll[this.parent.activeSheetTab - 1].colCount, args.index);
                this.scroll[this.parent.activeSheetTab - 1].colCount = args.index + 1;
                this.updateVTrack(this.colHeader, width, 'width');
                if (this.scroll[this.parent.activeSheetTab - 1].colCount > sheet.colCount) {
                    sheet.colCount = this.scroll[this.parent.activeSheetTab - 1].colCount;
                }
            }
        }
    };
    VirtualScroll.prototype.createHeaderElement = function (args) {
        this.rowHeader = this.content.cloneNode();
        this.colHeader = this.rowHeader.cloneNode();
        this.rowHeader.style.width = '';
        this.rowHeader.style.transform = "translate(0px, " + this.translateY + "px)";
        this.colHeader.style.transform = "translate(" + (this.parent.enableRtl ? -this.translateX : this.translateX) + "px, 0px)";
        this.rowHeader.appendChild(args.element.querySelector('table'));
        args.element.appendChild(this.rowHeader);
        var container = this.parent.getColumnHeaderContent();
        this.colHeader.appendChild(container.querySelector('table'));
        container.appendChild(this.colHeader);
        var rowVTrack = this.content.nextElementSibling.cloneNode();
        var colVTrack = rowVTrack.cloneNode();
        rowVTrack.style.width = '';
        colVTrack.style.height = '';
        args.element.appendChild(rowVTrack);
        container.appendChild(colVTrack);
    };
    VirtualScroll.prototype.getVTrackHeight = function (str) {
        return parseInt(this.content.nextElementSibling.style[str], 10);
    };
    VirtualScroll.prototype.updateVTrackHeight = function (args) {
        var domCount = this.parent.viewport.rowCount + 1 + (this.parent.getThreshold('row') * 2);
        if (args.rowIdx >= domCount && args.rowIdx < this.scroll[this.parent.activeSheetTab - 1].rowCount) {
            this.updateVTrack(this.rowHeader, this.getVTrackHeight('height') + args.threshold, 'height');
        }
    };
    VirtualScroll.prototype.updateVTrackWidth = function (args) {
        if (args.colIdx < this.parent.getActiveSheet().colCount) {
            var hdrVTrack = this.parent.getColumnHeaderContent().getElementsByClassName('e-virtualtrack')[0];
            hdrVTrack.style.width = parseInt(hdrVTrack.style.width, 10) + args.threshold + 'px';
            var cntVTrack = this.parent.getMainContent().getElementsByClassName('e-virtualtrack')[0];
            cntVTrack.style.width = parseInt(cntVTrack.style.width, 10) + args.threshold + 'px';
            var hdrColumn = this.parent.getColumnHeaderContent().getElementsByClassName('e-virtualable')[0];
            hdrColumn.style.width = parseInt(hdrColumn.style.width, 10) + args.threshold + 'px';
            var cntColumn = this.parent.getMainContent().getElementsByClassName('e-virtualable')[0];
            cntColumn.style.width = parseInt(cntColumn.style.width, 10) + args.threshold + 'px';
        }
    };
    VirtualScroll.prototype.updateVTrack = function (header, size, sizeStr) {
        if (this.parent.getActiveSheet().showHeaders) {
            header.nextElementSibling.style[sizeStr] = size + "px";
        }
        this.content.nextElementSibling.style[sizeStr] = size + "px";
    };
    VirtualScroll.prototype.deInitProps = function () {
        this.parent.viewport.leftIndex = null;
        this.parent.viewport.topIndex = null;
        this.parent.viewport.bottomIndex = null;
        this.translateX = null;
        this.translateY = null;
    };
    VirtualScroll.prototype.updateScrollProps = function (args) {
        if (args === void 0) { args = { sheetIndex: 0 }; }
        if (this.scroll.length === 0) {
            this.initScroll();
        }
        else {
            this.scroll.splice(args.sheetIndex, 0, { rowCount: 0, colCount: 0 });
        }
    };
    VirtualScroll.prototype.sliceScrollProps = function (args) {
        if (isNullOrUndefined(args.sheetIndex)) {
            this.scroll.length = 0;
        }
        else {
            this.scroll.splice(args.sheetIndex, 1);
        }
    };
    VirtualScroll.prototype.addEventListener = function () {
        this.parent.on(beforeContentLoaded, this.createVirtualElement, this);
        this.parent.on(beforeVirtualContentLoaded, this.translate, this);
        this.parent.on(virtualContentLoaded, this.updateColumnWidth, this);
        this.parent.on(onVerticalScroll, this.onVerticalScroll, this);
        this.parent.on(onHorizontalScroll, this.onHorizontalScroll, this);
        this.parent.on(updateUsedRange, this.updateUsedRange, this);
        this.parent.on(rowHeightChanged, this.updateVTrackHeight, this);
        this.parent.on(colWidthChanged, this.updateVTrackWidth, this);
        this.parent.on(beforeHeaderLoaded, this.createHeaderElement, this);
        this.parent.on(deInitProperties, this.deInitProps, this);
        this.parent.on(sheetsDestroyed, this.sliceScrollProps, this);
        this.parent.on(sheetCreated, this.updateScrollProps, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
        this.rowHeader = null;
        this.colHeader = null;
        this.content = null;
        this.parent = null;
        this.scroll.length = 0;
        this.translateX = null;
        this.translateY = null;
    };
    VirtualScroll.prototype.removeEventListener = function () {
        this.parent.off(beforeContentLoaded, this.createVirtualElement);
        this.parent.off(beforeVirtualContentLoaded, this.translate);
        this.parent.off(virtualContentLoaded, this.updateColumnWidth);
        this.parent.off(onVerticalScroll, this.onVerticalScroll);
        this.parent.off(onHorizontalScroll, this.onHorizontalScroll);
        this.parent.off(updateUsedRange, this.updateUsedRange);
        this.parent.off(rowHeightChanged, this.updateVTrackHeight);
        this.parent.off(colWidthChanged, this.updateVTrackWidth);
        this.parent.off(beforeHeaderLoaded, this.createHeaderElement);
        this.parent.off(sheetsDestroyed, this.sliceScrollProps);
        this.parent.off(sheetCreated, this.updateScrollProps);
        this.parent.off(spreadsheetDestroyed, this.destroy);
    };
    return VirtualScroll;
}());
export { VirtualScroll };
