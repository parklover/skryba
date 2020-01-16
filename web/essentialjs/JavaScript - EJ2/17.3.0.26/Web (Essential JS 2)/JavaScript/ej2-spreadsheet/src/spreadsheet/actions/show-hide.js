import { spreadsheetDestroyed, hideShowCol, hideShowRow, getUpdateUsingRaf } from '../common/index';
import { autoFit } from '../common/index';
import { getCellAddress, isHiddenRow, setRow } from '../../workbook/index';
import { detach } from '@syncfusion/ej2-base';
/**
 * The `ShowHide` module is used to perform hide/show the rows and columns.

 */
var ShowHide = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet show hide module.
     * @private
     */
    function ShowHide(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ShowHide.prototype.showHideRow = function (args) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var count = 0;
        var row;
        var idx;
        var content = this.parent.getContentTable();
        var rowHdr;
        if (sheet.showHeaders) {
            rowHdr = this.parent.getRowHeaderTable();
        }
        if (args.hide) {
            for (var i = args.startRow; i <= args.endRow; i++) {
                if (isHiddenRow(sheet, i)) {
                    continue;
                }
                if (idx === undefined) {
                    idx = this.getViewportIdx(i);
                    if (sheet.showHeaders) {
                        if (idx === 0) {
                            rowHdr.rows[args.endRow + 1].classList.add('e-hide-end');
                        }
                        else {
                            rowHdr.rows[idx - 1].classList.add('e-hide-start');
                            rowHdr.rows[this.getViewportIdx(args.endRow) + 1].classList.add('e-hide-end');
                        }
                    }
                }
                setRow(sheet, i, { hidden: true });
                row = content.rows[idx];
                if (row) {
                    if (sheet.showHeaders) {
                        detach(rowHdr.rows[idx]);
                    }
                    detach(row);
                    count++;
                }
                else {
                    count--;
                }
            }
            this.parent.selectRange(sheet.selectedRange);
            if (this.parent.viewport.topIndex >= args.startRow) {
                this.parent.viewport.topIndex = args.endRow + 1;
            }
            if (this.parent.scrollSettings.enableVirtualization) {
                args.startRow = this.parent.viewport.bottomIndex + 1;
                args.endRow = args.startRow + count - 1;
                var indexes = this.parent.skipHiddenRows(args.startRow, args.endRow);
                args.startRow = indexes[0];
                args.endRow = indexes[1];
                this.parent.viewport.bottomIndex = args.endRow;
                this.parent.renderModule.refreshUI({ colIndex: this.parent.viewport.leftIndex, direction: '', refresh: 'RowPart' }, getCellAddress(args.startRow, this.parent.viewport.leftIndex) + ":" + getCellAddress(args.endRow, this.parent.viewport.leftIndex + this.parent.viewport.colCount + (this.parent.getThreshold('col') * 2)));
            }
        }
        else {
            var hFrag_1 = document.createDocumentFragment();
            var frag_1 = document.createDocumentFragment();
            var hRow = void 0;
            var rowRenderer = this.parent.serviceLocator.getService('row');
            var rTBody_1;
            var tBody_1 = content.tBodies[0];
            if (sheet.showHeaders) {
                rTBody_1 = rowHdr.tBodies[0];
            }
            var endRow_1 = args.startRow;
            for (var i = args.startRow, len = args.endRow; i <= len; i++) {
                if (!isHiddenRow(sheet, i)) {
                    if (idx === undefined && i !== args.startRow) {
                        endRow_1++;
                    }
                    continue;
                }
                endRow_1++;
                setRow(sheet, i, { hidden: false });
                if (i > this.parent.viewport.bottomIndex) {
                    continue;
                }
                if (idx === undefined) {
                    idx = i - 1;
                    if (idx > -1) {
                        idx = this.getViewportIdx(idx) + 1;
                    }
                    else {
                        idx = 0;
                        if (idx < this.parent.viewport.topIndex) {
                            this.parent.viewport.topIndex = idx;
                        }
                    }
                }
                hRow = rowRenderer.refresh(i);
                hFrag_1.appendChild(hRow);
                frag_1.appendChild(rowRenderer.refresh(i, hRow));
                if (sheet.showHeaders) {
                    detach(rTBody_1.lastElementChild);
                }
                detach(tBody_1.lastElementChild);
            }
            this.parent.viewport.bottomIndex = this.parent.viewport.topIndex + this.parent.viewport.rowCount +
                (this.parent.getThreshold('row') * 2);
            count = this.parent.hiddenRowsCount(this.parent.viewport.topIndex, args.startRow) +
                this.parent.hiddenRowsCount(args.endRow + 1, this.parent.viewport.bottomIndex);
            this.parent.viewport.bottomIndex += count;
            args.row = frag_1.querySelector('.e-row');
            if (sheet.showHeaders) {
                args.hdrRow = hFrag_1.querySelector('.e-row');
            }
            args.insertIdx = idx;
            if (args.skipAppend) {
                return;
            }
            getUpdateUsingRaf(function () {
                if (sheet.showHeaders) {
                    if (idx !== 0 && !isHiddenRow(_this.parent.getActiveSheet(), endRow_1 - 1)) {
                        rTBody_1.children[idx - 1].classList.remove('e-hide-start');
                    }
                    rTBody_1.children[idx].classList.remove('e-hide-end');
                    rTBody_1.insertBefore(hFrag_1, rTBody_1.children[idx]);
                }
                tBody_1.insertBefore(frag_1, tBody_1.children[idx]);
                _this.parent.selectRange(sheet.selectedRange);
                if (args.autoFit) {
                    _this.parent.notify(autoFit, { startIndex: args.startRow, endIndex: args.endRow, isRow: true });
                }
            });
        }
    };
    ShowHide.prototype.showHideCol = function () {
        /** */
    };
    ShowHide.prototype.getViewportIdx = function (index) {
        if (this.parent.scrollSettings.enableVirtualization) {
            index -= this.parent.hiddenRowsCount(this.parent.viewport.topIndex, index);
            index -= this.parent.viewport.topIndex;
        }
        return index;
    };
    ShowHide.prototype.addEventListener = function () {
        this.parent.on(hideShowRow, this.showHideRow, this);
        this.parent.on(hideShowCol, this.showHideCol, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    ShowHide.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    ShowHide.prototype.removeEventListener = function () {
        this.parent.off(hideShowRow, this.showHideRow);
        this.parent.off(hideShowCol, this.showHideCol);
        this.parent.off(spreadsheetDestroyed, this.destroy);
    };
    return ShowHide;
}());
export { ShowHide };
