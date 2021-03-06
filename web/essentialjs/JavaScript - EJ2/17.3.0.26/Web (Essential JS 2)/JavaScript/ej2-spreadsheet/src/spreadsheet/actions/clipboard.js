import { detach, EventHandler, Browser, extend } from '@syncfusion/ej2-base';
import { getRangeIndexes, getCell, setCell, getSheet, getSwapRange } from '../../workbook/index';
import { getRangeAddress } from '../../workbook/index';
import { getFormattedCellObject, workbookFormulaOperation, applyCellFormat, checkIsFormula } from '../../workbook/index';
import { ribbonClick, cut, copy, paste } from '../common/index';
import { enableRibbonItems, rowHeightChanged, beginCompleteEvents } from '../common/index';
import { clearCopy, locateElem, selectRange, dialog, contentLoaded, tabSwitch, cMenuBeforeOpen, locale } from '../common/index';
/**
 * Represents clipboard support for Spreadsheet.
 */
var Clipboard = /** @class */ (function () {
    function Clipboard(parent) {
        this.parent = parent;
        this.init();
        this.addEventListener();
    }
    Clipboard.prototype.init = function () {
        this.parent.element
            .appendChild(this.parent.createElement('input', { className: 'e-clipboard', attrs: { 'contenteditable': 'true' } }));
    };
    Clipboard.prototype.addEventListener = function () {
        var ele = this.getClipboardEle();
        this.parent.on(cut, this.cut, this);
        this.parent.on(copy, this.copy, this);
        this.parent.on(paste, this.paste, this);
        this.parent.on(clearCopy, this.clearCopiedInfo, this);
        this.parent.on(tabSwitch, this.tabSwitchHandler, this);
        this.parent.on(cMenuBeforeOpen, this.cMenuBeforeOpenHandler, this);
        this.parent.on(ribbonClick, this.ribbonClickHandler, this);
        this.parent.on(contentLoaded, this.initCopyIndicator, this);
        this.parent.on(rowHeightChanged, this.rowHeightChanged, this);
        EventHandler.add(ele, 'cut', this.cut, this);
        EventHandler.add(ele, 'copy', this.copy, this);
        EventHandler.add(ele, 'paste', this.paste, this);
    };
    Clipboard.prototype.removeEventListener = function () {
        var ele = this.getClipboardEle();
        if (!this.parent.isDestroyed) {
            this.parent.off(cut, this.cut);
            this.parent.off(copy, this.copy);
            this.parent.off(paste, this.paste);
            this.parent.off(clearCopy, this.clearCopiedInfo);
            this.parent.off(tabSwitch, this.tabSwitchHandler);
            this.parent.off(cMenuBeforeOpen, this.cMenuBeforeOpenHandler);
            this.parent.off(ribbonClick, this.ribbonClickHandler);
            this.parent.off(contentLoaded, this.initCopyIndicator);
            this.parent.off(rowHeightChanged, this.rowHeightChanged);
        }
        EventHandler.remove(ele, 'cut', this.cut);
        EventHandler.remove(ele, 'copy', this.copy);
        EventHandler.remove(ele, 'paste', this.paste);
    };
    Clipboard.prototype.ribbonClickHandler = function (args) {
        var parentId = this.parent.element.id;
        switch (args.item.id) {
            case parentId + '_cut':
                this.cut({ isClick: true });
                break;
            case parentId + '_copy':
                this.copy({ isClick: true });
                break;
        }
        this.parent.element.focus();
    };
    Clipboard.prototype.tabSwitchHandler = function (args) {
        if (args.idx === 1 && !this.copiedInfo) {
            this.hidePaste();
        }
    };
    Clipboard.prototype.cMenuBeforeOpenHandler = function (e) {
        if (e.target === 'Content' || e.target === 'Header') {
            var l10n = this.parent.serviceLocator.getService(locale);
            this.parent.enableContextMenuItems([l10n.getConstant('Paste'), l10n.getConstant('PasteSpecial')], this.copiedInfo ? true : false);
        }
    };
    Clipboard.prototype.rowHeightChanged = function (args) {
        if (this.copiedInfo && this.copiedInfo.range[0] > args.rowIdx) {
            var ele = this.parent.element.getElementsByClassName('e-copy-indicator')[0];
            ele.style.top = parseInt(ele.style.top, 10) + args.threshold + "px";
        }
    };
    Clipboard.prototype.cut = function (args) {
        this.setCopiedInfo(args, true);
    };
    Clipboard.prototype.copy = function (args) {
        this.setCopiedInfo(args, false);
    };
    Clipboard.prototype.paste = function (args) {
        if (this.parent.isEdit) {
            if (args && args.type) {
                args.preventDefault();
                document.getElementById(this.parent.element.id + '_edit').focus();
                return;
            }
        }
        var rfshRange;
        /* tslint:disable-next-line */
        var isExternal = !this.copiedInfo && ((args && args.clipboardData) || window['clipboardData']);
        var copiedIdx = this.getCopiedIdx();
        if (this.copiedInfo || isExternal) {
            var cell = void 0;
            var isExtend = void 0;
            var cSIdx = (args && args.sIdx > -1) ? args.sIdx : this.parent.activeSheetTab - 1;
            var curSheet = getSheet(this.parent, cSIdx);
            var prevSheet = getSheet(this.parent, isExternal ? cSIdx : copiedIdx);
            var selIdx = getSwapRange(args && args.range || getRangeIndexes(curSheet.selectedRange));
            var rows = isExternal && this.getExternalCells(args);
            if (isExternal && !rows.length) { // If image pasted
                return;
            }
            var rowIdx = selIdx[0];
            var cIdx = isExternal
                ? [0, 0, rows.length - 1, rows[0].cells.length - 1] : getSwapRange(this.copiedInfo.range);
            var isRepeative = (selIdx[2] - selIdx[0] + 1) % (cIdx[2] - cIdx[0] + 1) === 0
                && (selIdx[3] - selIdx[1] + 1) % (cIdx[3] - cIdx[1] + 1) === 0;
            rfshRange = isRepeative ? selIdx : [selIdx[0], selIdx[1]]
                .concat([selIdx[0] + cIdx[2] - cIdx[0], selIdx[1] + cIdx[3] - cIdx[1] || selIdx[1]]);
            for (var i = cIdx[0], l = 0; i <= cIdx[2]; i++, l++) {
                for (var j = cIdx[1], k = 0; j <= cIdx[3]; j++, k++) {
                    cell = isExternal ? rows[i].cells[j] : Object.assign({}, getCell(i, j, prevSheet));
                    if (cell && args && args.type) {
                        switch (args.type) {
                            case 'Formats':
                                cell = { format: cell.format, style: cell.style };
                                break;
                            case 'Values':
                                cell = { value: cell.value };
                                break;
                        }
                        isExtend = ['Formats', 'Values'].indexOf(args.type) > -1;
                    }
                    if ((!this.parent.scrollSettings.isFinite && (cIdx[2] - cIdx[0] > (1048575 - selIdx[0])
                        || cIdx[3] - cIdx[1] > (16383 - selIdx[1])))
                        || (this.parent.scrollSettings.isFinite && (cIdx[2] - cIdx[0] > (curSheet.rowCount - 1 - selIdx[0])
                            || cIdx[3] - cIdx[1] > (curSheet.colCount - 1 - selIdx[1])))) {
                        this.showDialog();
                        return;
                    }
                    if (isRepeative) {
                        for (var x = selIdx[0]; x <= selIdx[2]; x += (cIdx[2] - cIdx[0]) + 1) {
                            for (var y = selIdx[1]; y <= selIdx[3]; y += (cIdx[3] - cIdx[1] + 1)) {
                                this.setCell(x + l, y + k, curSheet, cell, isExtend);
                            }
                        }
                    }
                    else {
                        this.setCell(rowIdx, selIdx[1] + k, curSheet, cell, isExtend);
                    }
                    if (!isExternal && this.copiedInfo.isCut) {
                        this.setCell(i, j, prevSheet, getCell(i, j, prevSheet), false, true);
                    }
                }
                rowIdx++;
            }
            this.parent.setUsedRange(rfshRange[2], rfshRange[3]);
            if (cSIdx === this.parent.activeSheetTab - 1) {
                this.parent.serviceLocator.getService('cell').refreshRange(rfshRange);
                this.parent.notify(selectRange, rfshRange);
            }
            if (!isExternal && this.copiedInfo.isCut) {
                if (copiedIdx === this.parent.activeSheetTab - 1) {
                    this.parent.serviceLocator.getService('cell').refreshRange(cIdx);
                }
                this.clearCopiedInfo();
            }
            if (isExternal || (args && args.isClick)) {
                this.parent.element.focus();
            }
        }
        else {
            this.getClipboardEle().select();
        }
        var cSID = this.copiedInfo && this.copiedInfo.sId ? this.copiedInfo.sId : this.parent.activeSheetTab;
        var eventArgs = {
            reqType: 'paste',
            copiedInfo: this.copiedInfo,
            pasteSheetIdx: this.parent.activeSheetTab,
            copiedRange: this.parent.sheets[cSID - 1].name + '!' + cSID,
            pastedRange: this.parent.sheets[this.parent.activeSheetTab - 1].name + '!' + getRangeAddress(rfshRange),
            type: (args && args.type) || 'All'
        };
        this.parent.serviceLocator.getService(beginCompleteEvents).completeAction(eventArgs, 'clipboard');
    };
    Clipboard.prototype.setCell = function (rIdx, cIdx, sheet, cell, isExtend, isCut) {
        setCell(rIdx, cIdx, sheet, isCut ? null : cell, isExtend);
        if (cell && cell.formula) {
            this.parent.notify(workbookFormulaOperation, {
                action: 'refreshCalculate', value: isCut ? '' : cell.formula, rowIndex: rIdx,
                colIndex: cIdx, sheetIndex: this.parent.activeSheetTab, isFormula: true
            });
        }
        if (isCut && cell && cell.style) {
            this.parent.notify(applyCellFormat, {
                style: extend({}, this.getEmptyStyle(cell.style), this.parent.commonCellStyle), rowIdx: rIdx, colIdx: cIdx, cell: null,
                lastCell: null, row: null, hRow: null, isHeightCheckNeeded: true, manualUpdate: false
            });
        }
    };
    Clipboard.prototype.getEmptyStyle = function (cellStyle) {
        var style = {};
        Object.keys(cellStyle).forEach(function (key) {
            style[key] = '';
        });
        return style;
    };
    Clipboard.prototype.getCopiedIdx = function () {
        if (this.copiedInfo) {
            for (var i = 0; i < this.parent.sheets.length; i++) {
                if (this.parent.sheets[i].id === this.copiedInfo.sId) {
                    return i;
                }
            }
            this.clearCopiedInfo();
        }
        return -1;
    };
    Clipboard.prototype.setCopiedInfo = function (args, isCut) {
        var _this = this;
        if (this.parent.isEdit) {
            return;
        }
        var sheet = this.parent.getActiveSheet();
        var range = (args && args.range) || getRangeIndexes(sheet.selectedRange);
        var option = {
            sheet: sheet, indexes: [0, 0, sheet.rowCount - 1, sheet.colCount - 1], promise: new Promise(function (resolve, reject) { resolve((function () { })()); })
        };
        if (sheet.isLocalData && !(args && args.clipboardData) && range[0] === 0 && range[2] === (sheet.rowCount - 1)) {
            this.parent.showSpinner();
            this.parent.notify('updateSheetFromDataSource', option);
        }
        option.promise.then(function () {
            if (!(args && args.clipboardData)) {
                if (_this.copiedInfo) {
                    _this.clearCopiedInfo();
                }
                _this.copiedInfo = {
                    range: range, sId: (args && args.sId) ? args.sId : sheet.id, isCut: isCut
                };
                _this.hidePaste(true);
                _this.initCopyIndicator();
                if (!Browser.isIE) {
                    _this.getClipboardEle().select();
                }
                if (args && args.isClick) {
                    document.execCommand(isCut ? 'cut' : 'copy');
                }
                _this.parent.hideSpinner();
            }
            if (Browser.isIE) {
                _this.setExternalCells(args);
            }
        });
        if (args && args.clipboardData) {
            this.setExternalCells(args);
            this.parent.element.focus();
        }
    };
    Clipboard.prototype.clearCopiedInfo = function () {
        if (this.copiedInfo) {
            if (this.parent.getActiveSheet().id === this.copiedInfo.sId) {
                detach(this.parent.getMainContent().getElementsByClassName('e-copy-indicator')[0]);
            }
            this.copiedInfo = null;
            this.hidePaste();
        }
    };
    Clipboard.prototype.initCopyIndicator = function () {
        if (this.copiedInfo && this.parent.getActiveSheet().id === this.copiedInfo.sId) {
            var copyIndicator = this.parent.createElement('div', { className: 'e-copy-indicator' });
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-top' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-bottom' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-left' }));
            copyIndicator.appendChild(this.parent.createElement('div', { className: 'e-right' }));
            locateElem(copyIndicator, this.copiedInfo.range, this.parent.getActiveSheet());
            this.parent.getMainContent().appendChild(copyIndicator);
        }
    };
    Clipboard.prototype.showDialog = function () {
        this.parent.serviceLocator.getService(dialog).show({
            header: 'Spreadsheet',
            target: this.parent.element,
            height: 205, width: 340, isModal: true, showCloseIcon: true,
            content: this.parent.serviceLocator.getService(locale).getConstant('PasteAlert')
        });
    };
    Clipboard.prototype.hidePaste = function (isShow) {
        this.parent.notify(enableRibbonItems, { id: this.parent.element.id + '_paste', isEnable: isShow || false });
    };
    Clipboard.prototype.setExternalCells = function (args) {
        var cell;
        var text = '';
        var range = this.copiedInfo.range;
        var sheet = this.parent.getActiveSheet();
        var data = '<html><body><table xmlns="http://www.w3.org/1999/xhtml"><tbody>';
        for (var i = range[0]; i <= range[2]; i++) {
            data += '<tr>';
            for (var j = range[1]; j <= range[3]; j++) {
                data += '<td style="white-space:nowrap;vertical-align:bottom;';
                cell = getCell(i, j, sheet);
                if (cell && cell.style) {
                    Object.keys(cell.style).forEach(function (style) {
                        var regex = style.match(/[A-Z]/);
                        data += (style === 'backgroundColor' ? 'background' : (regex ? style.replace(regex[0], '-'
                            + regex[0].toLowerCase()) : style)) + ':' + ((style === 'backgroundColor' || style === 'color')
                            ? cell.style[style].slice(0, 7) : cell.style[style]) + ';';
                    });
                }
                data += '">';
                if (cell && cell.value) {
                    var eventArgs = {
                        formattedText: cell.value,
                        value: cell.value,
                        format: cell.format,
                        onLoad: true
                    };
                    if (cell.format) {
                        this.parent.notify(getFormattedCellObject, eventArgs);
                    }
                    data += eventArgs.formattedText;
                    text += eventArgs.formattedText;
                }
                data += '</td>';
                text += j === range[3] ? '' : '\t';
            }
            data += '</tr>';
            text += i === range[2] ? '' : '\n';
        }
        data += '</tbody></table></body></html>';
        if (Browser.isIE) {
            /* tslint:disable-next-line */
            window['clipboardData'].setData('text', text);
        }
        else {
            args.clipboardData.setData('text/html', data);
            args.clipboardData.setData('text/plain', text);
            args.preventDefault();
        }
    };
    Clipboard.prototype.getExternalCells = function (args) {
        var _this = this;
        var html;
        var text;
        var rows = [];
        var cells = [];
        var cellStyle;
        var ele = this.parent.createElement('span');
        if (Browser.isIE) {
            /* tslint:disable-next-line */
            text = window['clipboardData'].getData('text');
        }
        else {
            html = args.clipboardData.getData('text/html');
            text = args.clipboardData.getData('text/plain');
            ele.innerHTML = html;
        }
        if (ele.querySelector('table')) {
            ele.querySelectorAll('tr').forEach(function (tr) {
                tr.querySelectorAll('td').forEach(function (td, j) {
                    cells[j] = { value: td.textContent, style: _this.getStyle(td, ele) };
                });
                rows.push({ cells: cells });
                cells = [];
            });
        }
        else if (text) {
            if (html) {
                [].slice.call(ele.children).forEach(function (child) {
                    if (child.getAttribute('style')) {
                        cellStyle = _this.getStyle(child, ele);
                    }
                });
            }
            text.trim().split('\n').forEach(function (row) {
                row.split('\t').forEach(function (col, j) {
                    cells[j] = { style: cellStyle };
                    if (checkIsFormula(col)) {
                        cells[j].formula = col;
                    }
                    else {
                        cells[j].value = col;
                    }
                });
                rows.push({ cells: cells });
                cells = [];
            });
        }
        setTimeout(function () { _this.getClipboardEle().innerHTML = ''; }, 0);
        return rows;
    };
    Clipboard.prototype.getStyle = function (td, ele) {
        var styles = [];
        var cellStyle = {};
        if (td.classList.length || td.getAttribute('style')) {
            if (td.classList.length) {
                styles.push(ele.querySelector('style').innerHTML.split(td.classList[0])[1].split('{')[1].split('}')[0]);
            }
            if (td.getAttribute('style')) {
                styles.push(td.getAttribute('style'));
            }
            styles.forEach(function (styles) {
                styles.split(';').forEach(function (style) {
                    var char = style.split(':')[0].trim();
                    if (['font-family', 'vertical-align', 'text-align', 'text-indent', 'color', 'background', 'font-weight', 'font-style',
                        'font-size', 'text-decoration'].indexOf(char) > -1) {
                        char = char === 'background' ? 'backgroundColor' : char;
                        var regex = char.match(/-[a-z]/);
                        cellStyle[regex ? char.replace(regex[0], regex[0].charAt(1).toUpperCase()) : char] = style.split(':')[1];
                    }
                });
            });
        }
        return cellStyle;
    };
    Clipboard.prototype.getClipboardEle = function () {
        return this.parent.element.getElementsByClassName('e-clipboard')[0];
    };
    Clipboard.prototype.getModuleName = function () {
        return 'clipboard';
    };
    Clipboard.prototype.destroy = function () {
        this.removeEventListener();
        var ele = this.getClipboardEle();
        detach(ele);
        this.parent = null;
    };
    return Clipboard;
}());
export { Clipboard };
