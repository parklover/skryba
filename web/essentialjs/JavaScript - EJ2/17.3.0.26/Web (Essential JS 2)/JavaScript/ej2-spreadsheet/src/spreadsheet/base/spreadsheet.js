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
/// <reference path='../../workbook/base/workbook-model.d.ts'/>
import { Property, NotifyPropertyChanges, EventHandler, Event } from '@syncfusion/ej2-base';
import { addClass, removeClass, Complex, formatUnit, detach, L10n, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { initialLoad, mouseDown, spreadsheetDestroyed, keyUp, hideShowRow } from '../common/index';
import { beginCompleteEvents, collaborativeUpdate, keyDown } from '../common/index';
import { getSiblingsHeight, colWidthChanged, rowHeightChanged } from '../common/index';
import { defaultLocale, locale, setAriaOptions, setResize } from '../common/index';
import { ribbon, formulaBar, sheetTabs, formulaOperation } from '../common/index';
import { addContextMenuItems, removeContextMenuItems, enableContextMenuItems, selectRange } from '../common/index';
import { cut, copy, paste, dialog, editOperation, activeSheetChanged } from '../common/index';
import { Render } from '../renderer/render';
import { Scroll, VirtualScroll, Edit, CellFormat, Selection, KeyboardNavigation, KeyboardShortcut, ShowHide } from '../actions/index';
import { Clipboard, CollaborativeEditing } from '../actions/index';
import { click } from '../common/index';
import { Dialog, BeginCompleteEvents } from '../services/index';
import { ServiceLocator } from '../../workbook/services/index';
import { getColumnsWidth, getSheetIndex } from './../../workbook/index';
import { activeCellChanged } from './../../workbook/index';
import { getSheetNameFromAddress, DataBind } from './../../workbook/index';
import { beforeSort, sortComplete, sortRangeAlert } from './../../workbook/index';
import { getSheetIndexFromId, WorkbookEdit, WorkbookOpen, WorkbookSave, WorkbookCellFormat, WorkbookSort } from './../../workbook/index';
import { Workbook } from '../../workbook/base/workbook';
import { Resize } from '../actions/index';
import { getRequiredModules, ScrollSettings } from '../common/index';
import { SelectionSettings, getStartEvent } from '../common/index';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { setRowHeight, getRowsHeight, isHiddenRow } from './../../workbook/base/index';
import { getRangeIndexes, getIndexesFromAddress, getCellIndexes, WorkbookNumberFormat, WorkbookFormula } from '../../workbook/index';
import { Ribbon, FormulaBar, SheetTabs, Open, ContextMenu, Save, NumberFormat, Formula } from '../integrations/index';
import { Sort } from '../integrations/index';
import { isNumber, getColumn } from '../../workbook/index';
/**
 * Represents the Spreadsheet component.
 * ```html
 * <div id='spreadsheet'></div>
 * <script>
 *  var spreadsheetObj = new Spreadsheet();
 *  spreadsheetObj.appendTo('#spreadsheet');
 * </script>
 * ```
 */
var Spreadsheet = /** @class */ (function (_super) {
    __extends(Spreadsheet, _super);
    /**
     * Constructor for creating the widget.
     * @param  {SpreadsheetModel} options? - Configures Spreadsheet options.
     * @param  {string|HTMLElement} element? - Element to render Spreadsheet.
     */
    function Spreadsheet(options, element) {
        var _this = _super.call(this, options) || this;
        _this.isEdit = false;
        _this.viewport = { rowCount: 0, colCount: 0, height: 0, topIndex: 0, leftIndex: 0, width: 0,
            bottomIndex: 0 };
        _this.needsID = true;
        Spreadsheet_1.Inject(Ribbon, FormulaBar, SheetTabs, Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, DataBind, Open, ContextMenu, Save, NumberFormat, CellFormat, Formula, WorkbookEdit, WorkbookOpen, WorkbookSave, WorkbookCellFormat, WorkbookNumberFormat, WorkbookFormula, Sort, WorkbookSort, Resize, CollaborativeEditing);
        if (element) {
            _this.appendTo(element);
        }
        return _this;
    }
    Spreadsheet_1 = Spreadsheet;
    /**
     * To get cell element.
     * @returns HTMLElement

     */
    Spreadsheet.prototype.getCell = function (rowIndex, colIndex) {
        if (this.scrollSettings.enableVirtualization) {
            colIndex = colIndex - this.viewport.leftIndex;
        }
        var row = this.getRow(rowIndex);
        return row ? row.cells[colIndex] : row;
    };
    /**
     * Get cell element.
     * @returns HTMLTableRowElement

     */
    Spreadsheet.prototype.getRow = function (index, table) {
        if (this.scrollSettings.enableVirtualization) {
            index -= this.hiddenRowsCount(this.viewport.topIndex, index);
            index -= this.viewport.topIndex;
        }
        table = table || this.getContentTable();
        return table ? table.rows[index] : null;
    };
    Spreadsheet.prototype.hiddenRowsCount = function (startIndex, endIndex) {
        var sheet = this.getActiveSheet();
        var count = 0;
        for (var i = startIndex; i <= endIndex; i++) {
            if (isHiddenRow(sheet, i)) {
                count++;
            }
        }
        return count;
    };
    /**
     * To initialize the services;
     * @returns void

     */
    Spreadsheet.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
        this.serviceLocator = new ServiceLocator;
        this.initServices();
    };
    Spreadsheet.prototype.initServices = function () {
        this.serviceLocator.register(locale, new L10n(this.getModuleName(), defaultLocale, this.locale));
        this.serviceLocator.register(dialog, new Dialog(this));
        this.serviceLocator.register(beginCompleteEvents, new BeginCompleteEvents(this));
    };
    /**
     * To Initialize the component rendering.
     * @returns void

     */
    Spreadsheet.prototype.render = function () {
        _super.prototype.render.call(this);
        this.element.setAttribute('tabindex', '0');
        setAriaOptions(this.element, { role: 'grid' });
        this.renderModule = new Render(this);
        this.notify(initialLoad, null);
        this.renderSpreadsheet();
        this.wireEvents();
    };
    Spreadsheet.prototype.renderSpreadsheet = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
        this.setHeight();
        this.setWidth();
        createSpinner({ target: this.element }, this.createElement);
        if (this.isMobileView() && this.cssClass.indexOf('e-mobile-view') === -1) {
            this.element.classList.add('e-mobile-view');
        }
        this.sheetModule = this.serviceLocator.getService('sheet');
        if (this.allowScrolling) {
            this.scrollModule = new Scroll(this);
        }
        if (this.scrollSettings.enableVirtualization) {
            new VirtualScroll(this);
        }
        this.renderModule.render();
        new ShowHide(this);
    };
    /**
     * By default, Spreadsheet shows the spinner for all its actions. To manually show spinner you this method at your needed time.
     * @return {void}
     */
    Spreadsheet.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * To hide showed spinner manually.
     * @return {void}
     */
    Spreadsheet.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    /**
     * Selection will navigates to the specified cell address in active sheet.
     * @param {string} address - Specifies the cell address which needs to navigate.
     */
    Spreadsheet.prototype.goTo = function (address) {
        var indexes = getRangeIndexes(address);
        var content = this.getMainContent();
        var sheet = this.getActiveSheet();
        content.scrollTop = indexes[0] ? getRowsHeight(sheet, 0, indexes[0] - 1) : 0;
        content.scrollLeft = indexes[1] ? getColumnsWidth(sheet, 0, indexes[1] - 1) : 0;
    };
    /**
     * This method is used to resize the Spreadsheet component.
     */
    Spreadsheet.prototype.resize = function () {
        this.renderModule.setSheetPanelSize();
        if (this.scrollSettings.enableVirtualization) {
            this.renderModule.refreshSheet();
        }
    };
    /**
     * To cut the specified cell or cells properties such as value, format, style etc...
     * @param {string} address - Specifies the range address to cut.
     */
    Spreadsheet.prototype.cut = function (address) {
        this.notify(cut, address ? {
            range: getIndexesFromAddress(address),
            sId: this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))].id
        } : null);
    };
    /**
     * To copy the specified cell or cells properties such as value, format, style etc...
     * @param {string} address - Specifies the range address.
     */
    Spreadsheet.prototype.copy = function (address) {
        this.notify(copy, address ? {
            range: getIndexesFromAddress(address),
            sId: this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))].id
        } : null);
    };
    /**
     * This method is used to paste the cut or copied cells in to specified address.
     * @param {string} address - Specifies the cell or range address.
     * @param {PasteSpecialType} type - Specifies the type of paste.
     */
    Spreadsheet.prototype.paste = function (address, type) {
        this.notify(paste, {
            range: getIndexesFromAddress(address), sIdx: getSheetIndex(this, getSheetNameFromAddress(address)),
            type: type
        });
    };
    /**
     * To refresh the clients which needs to refresh in real time.
     * @param {CollaborativeEditArgs} options - Collaborative editing event options.
     */
    Spreadsheet.prototype.refreshClients = function (options) {
        this.notify(collaborativeUpdate, { action: options.action, eventArgs: options.eventArgs });
    };
    Spreadsheet.prototype.setHeight = function () {
        if (this.height.toString().indexOf('%') > -1) {
            this.element.style.minHeight = '400px';
        }
        this.element.style.height = formatUnit(this.height);
    };
    Spreadsheet.prototype.setWidth = function () {
        if (this.width.toString().indexOf('%') > -1 || this.width === 'auto') {
            this.element.style.minWidth = '300px';
        }
        this.element.style.width = formatUnit(this.width);
    };
    /**
     * Set the width of column.
     * @param {number} width
     * @param {number} colIndex
     * @param {number} sheetIndex
     */
    Spreadsheet.prototype.setColWidth = function (width, colIndex, sheetIndex) {
        sheetIndex = isNullOrUndefined(sheetIndex) ? null : sheetIndex - 1;
        var sheet = isNullOrUndefined(sheetIndex) ? this.getActiveSheet() : this.sheets[sheetIndex];
        if (sheet) {
            var mIndex = colIndex;
            colIndex = isNullOrUndefined(colIndex) ? getCellIndexes(sheet.activeCell)[1] : colIndex;
            if (this.scrollSettings.enableVirtualization) {
                colIndex = colIndex - this.viewport.leftIndex;
            }
            var trgt = this.getColumnHeaderContent().getElementsByClassName('e-header-cell')[colIndex];
            var colWidth = (typeof width === 'number') ? width + 'px' : width;
            var eleWidth = parseInt(this.getMainContent().getElementsByTagName('col')[colIndex].style.width, 10);
            var threshold = parseInt(colWidth, 10) - eleWidth;
            if (threshold < 0 && eleWidth < -(threshold)) {
                getCellIndexes(sheet.activeCell);
                threshold = -eleWidth;
            }
            var oldIdx = parseInt(trgt.getAttribute('aria-colindex'), 10) - 1;
            if (this.getActiveSheet() === sheet) {
                this.notify(colWidthChanged, { threshold: threshold, colIdx: oldIdx });
                setResize(colIndex, colWidth, true, this);
            }
            getColumn(sheet, mIndex).width = parseInt(colWidth, 10) > 0 ? parseInt(colWidth, 10) : 0;
            sheet.columns[mIndex].customWidth = true;
            this.setProperties({ sheets: this.sheets }, true);
        }
    };
    /**
     * Set the height of row.
     * @param {number} height
     * @param {number} rowIndex
     * @param {number} sheetIndex
     */
    Spreadsheet.prototype.setRowHeight = function (height, rowIndex, sheetIndex) {
        sheetIndex = isNullOrUndefined(sheetIndex) ? null : sheetIndex - 1;
        var sheet = isNullOrUndefined(sheetIndex) ? this.getActiveSheet() : this.sheets[sheetIndex];
        if (sheet) {
            var mIndex = rowIndex;
            var rowHeight = (typeof height === 'number') ? height + 'px' : height;
            rowIndex = isNullOrUndefined(rowIndex) ? getCellIndexes(sheet.activeCell)[0] : rowIndex;
            if (this.scrollSettings.enableVirtualization) {
                rowIndex = rowIndex - this.viewport.topIndex;
            }
            if (rowIndex >= 0) {
                var trgt = this.getRowHeaderContent().getElementsByClassName('e-header-cell')[rowIndex];
                var eleHeight = parseInt(this.getMainContent().getElementsByTagName('tr')[rowIndex].style.height, 10);
                var threshold = parseInt(rowHeight, 10) - eleHeight;
                if (threshold < 0 && eleHeight < -(threshold)) {
                    threshold = -eleHeight;
                }
                var oldIdx = parseInt(trgt.parentElement.getAttribute('aria-rowindex'), 10) - 1;
                if (this.getActiveSheet() === sheet) {
                    this.notify(rowHeightChanged, { threshold: threshold, rowIdx: oldIdx });
                    setResize(rowIndex, rowHeight, false, this);
                }
            }
            setRowHeight(sheet, mIndex, parseInt(rowHeight, 10) > 0 ? parseInt(rowHeight, 10) : 0);
            sheet.rows[mIndex].customHeight = true;
            this.setProperties({ sheets: this.sheets }, true);
        }
    };
    Spreadsheet.prototype.setPanelSize = function () {
        if (this.height !== 'auto') {
            var panel = document.getElementById(this.element.id + '_sheet_panel');
            panel.style.height = this.element.getBoundingClientRect().height - getSiblingsHeight(panel) + "px";
        }
    };
    /**
     * Opens the Excel file.
     * @param {OpenOptions} options - Options for opening the excel file.
     */
    Spreadsheet.prototype.open = function (options) {
        this.isOpen = true;
        _super.prototype.open.call(this, options);
        if (this.isOpen) {
            this.showSpinner();
        }
    };
    Spreadsheet.prototype.showHideRow = function (hide, startRow, endRow) {
        if (endRow === void 0) { endRow = startRow; }
        this.notify(hideShowRow, { startRow: startRow, endRow: endRow, hide: hide });
    };
    /**
     * Gets the row header div of the Spreadsheet.
     * @return {Element}

     */
    Spreadsheet.prototype.getRowHeaderContent = function () {
        return this.sheetModule.getRowHeaderPanel();
    };
    /**
     * Gets the column header div of the Spreadsheet.
     * @return {Element}

     */
    Spreadsheet.prototype.getColumnHeaderContent = function () {
        return this.sheetModule.getColHeaderPanel();
    };
    /**
     * Gets the main content div of the Spreadsheet.
     * @return {Element}

     */
    Spreadsheet.prototype.getMainContent = function () {
        return this.sheetModule.getContentPanel();
    };
    /**
     * Get the main content table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    Spreadsheet.prototype.getContentTable = function () {
        return this.sheetModule.getContentTable();
    };
    /**
     * Get the row header table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    Spreadsheet.prototype.getRowHeaderTable = function () {
        return this.sheetModule.getRowHeaderTable();
    };
    /**
     * Get the column header table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    Spreadsheet.prototype.getColHeaderTable = function () {
        return this.sheetModule.getColHeaderTable();
    };
    /**
     * To get the backup element count for row and column virtualization.

     */
    Spreadsheet.prototype.getThreshold = function (layout) {
        var threshold = Math.round((this.viewport[layout + 'Count'] + 1) / 2);
        return threshold < 15 ? 15 : threshold;
    };
    Spreadsheet.prototype.isMobileView = function () {
        return ((this.cssClass.indexOf('e-mobile-view') > -1 || Browser.isDevice) && this.cssClass.indexOf('e-desktop-view') === -1)
            && false;
    };
    Spreadsheet.prototype.getValueRowCol = function (sheetIndex, rowIndex, colIndex) {
        var val = _super.prototype.getValueRowCol.call(this, sheetIndex, rowIndex, colIndex);
        return val;
    };
    /**
     * To update a cell properties.
     * @param {CellModel} cell - Cell properties.
     * @param {string} address - Address to update.
     */
    Spreadsheet.prototype.updateCell = function (cell, address) {
        address = address || this.getActiveSheet().activeCell;
        _super.prototype.updateCell.call(this, cell, address);
        this.serviceLocator.getService('cell').refreshRange(getIndexesFromAddress(address));
        this.notify(activeCellChanged, {});
    };
    /**
     * Sorts the range of cells in the active sheet.
     * @param sortOptions - options for sorting.
     * @param range - address of the data range.
     */
    Spreadsheet.prototype.sort = function (sortOptions, range) {
        var _this = this;
        if (!this.allowSorting) {
            return Promise.reject();
        }
        range = range || this.getActiveSheet().selectedRange;
        sortOptions = sortOptions || { sortDescriptors: {} };
        var args = { range: range, sortOptions: sortOptions, cancel: false };
        this.trigger(beforeSort, args);
        if (args.cancel) {
            return Promise.reject();
        }
        this.notify(beforeSort, null);
        return _super.prototype.sort.call(this, args.sortOptions, args.range).then(function (args) {
            _this.notify(sortComplete, args);
            _this.trigger(sortComplete, args);
            return Promise.resolve(args);
        }).catch(function (error) {
            _this.notify(sortRangeAlert, { error: error });
            return Promise.reject(error);
        });
    };
    Spreadsheet.prototype.setValueRowCol = function (sheetIndex, value, rowIndex, colIndex) {
        if (value === 'circular reference: ') {
            var circularArgs = {
                action: 'isCircularReference', argValue: value
            };
            this.notify(formulaOperation, circularArgs);
            value = circularArgs.argValue;
        }
        _super.prototype.setValueRowCol.call(this, sheetIndex, value, rowIndex, colIndex);
        sheetIndex = getSheetIndexFromId(this, sheetIndex);
        this.notify(editOperation, {
            action: 'refreshDependentCellValue', rowIdx: rowIndex, colIdx: colIndex,
            sheetIdx: sheetIndex
        });
    };
    /**
     * Get component name.
     * @returns string

     */
    Spreadsheet.prototype.getModuleName = function () {
        return 'spreadsheet';
    };
    Spreadsheet.prototype.refreshNode = function (td, args) {
        var value;
        var spanElem = td.querySelector('.e-' + this.element.id + '_currency');
        var alignClass = 'e-right-align';
        if (args) {
            args.result = isNullOrUndefined(args.result) ? '' : args.result.toString();
            if (spanElem) {
                detach(spanElem);
            }
            if (args.type === 'Accounting' && isNumber(args.value)) {
                td.textContent = args.result.split(args.curSymbol).join('');
                td.appendChild(this.createElement('span', {
                    className: 'e-' + this.element.id + '_currency',
                    innerHTML: " " + args.curSymbol,
                    styles: 'float: left'
                }));
                td.classList.add(alignClass);
                return;
            }
            else {
                if (args.result && (args.result.toLowerCase() === 'true' || args.result.toLowerCase() === 'false')) {
                    args.result = args.result.toUpperCase();
                    alignClass = 'e-center-align';
                    args.isRightAlign = true; // Re-use this to center align the cell.
                }
                value = args.result;
            }
            args.isRightAlign ? td.classList.add(alignClass) : td.classList.remove(alignClass);
        }
        value = !isNullOrUndefined(value) ? value : '';
        if (!isNullOrUndefined(td)) {
            var node = td.lastChild;
            if (node && (node.nodeType === 3 || node.nodeType === 1)) {
                node.nodeValue = value;
            }
            else {
                td.appendChild(document.createTextNode(value));
            }
        }
    };
    Spreadsheet.prototype.skipHiddenRows = function (startIdx, endIdx) {
        var count = 0;
        var sheet = this.getActiveSheet();
        for (var i = startIdx; i <= endIdx; i++) {
            if (isHiddenRow(sheet, i)) {
                if (startIdx === i) {
                    startIdx++;
                }
                endIdx++;
            }
        }
        return [startIdx, endIdx];
    };
    Spreadsheet.prototype.mouseClickHandler = function (e) {
        this.notify(click, e);
    };
    Spreadsheet.prototype.mouseDownHandler = function (e) {
        this.notify(mouseDown, e);
    };
    Spreadsheet.prototype.keyUpHandler = function (e) {
        this.notify(keyUp, e);
    };
    Spreadsheet.prototype.keyDownHandler = function (e) {
        this.notify(keyDown, e);
    };
    /**
     * Binding events to the element while component creation.
     */
    Spreadsheet.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.mouseClickHandler, this);
        EventHandler.add(this.element, getStartEvent(), this.mouseDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'noderefresh', this.refreshNode, this);
    };
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     */
    Spreadsheet.prototype.destroy = function () {
        this.unwireEvents();
        this.notify(spreadsheetDestroyed, null);
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
        this.element.removeAttribute('tabindex');
        this.element.removeAttribute('role');
        this.element.style.removeProperty('height');
        this.element.style.removeProperty('width');
        this.element.style.removeProperty('min-height');
        this.element.style.removeProperty('min-width');
    };
    /**
     * Unbinding events from the element while component destroy.
     */
    Spreadsheet.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.mouseClickHandler);
        EventHandler.remove(this.element, getStartEvent(), this.mouseDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'noderefresh', this.refreshNode);
    };
    /**
     * To add context menu items.
     * @param {MenuItemModel[]} items - Items that needs to be added.
     * @param {string} text - Item before / after that the element to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    Spreadsheet.prototype.addContextMenuItems = function (items, text, insertAfter, isUniqueId) {
        if (insertAfter === void 0) { insertAfter = true; }
        this.notify(addContextMenuItems, { items: items, text: text, insertAfter: insertAfter, isUniqueId: isUniqueId });
    };
    /**
     * To remove existing context menu items.
     * @param {string[]} items - Items that needs to be removed.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    Spreadsheet.prototype.removeContextMenuItems = function (items, isUniqueId) {
        this.notify(removeContextMenuItems, { items: items, isUniqueId: isUniqueId });
    };
    /**
     * To enable / disable context menu items.
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    Spreadsheet.prototype.enableContextMenuItems = function (items, enable, isUniqueId) {
        if (enable === void 0) { enable = true; }
        this.notify(enableContextMenuItems, { items: items, enable: enable, isUniqueId: isUniqueId });
    };
    /**
     * Selects the cell / range of cells with specified address.
     * @param {string} address - Specifies the range address.
     */
    Spreadsheet.prototype.selectRange = function (address) {
        this.notify(selectRange, getRangeIndexes(address));
    };
    /**
     * Start edit the active cell.
     * @return {void}
     */
    Spreadsheet.prototype.startEdit = function () {
        this.notify(editOperation, { action: 'startEdit', isNewValueEdit: false });
    };
    /**
     * Cancels the edited state, this will not update any value in the cell.
     * @return {void}
     */
    Spreadsheet.prototype.closeEdit = function () {
        this.notify(editOperation, { action: 'cancelEdit' });
    };
    /**
     * If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     * @return {void}
     */
    Spreadsheet.prototype.endEdit = function () {
        this.notify(editOperation, { action: 'endEdit' });
    };
    /**
     * Called internally if any of the property value changed.
     * @param  {SpreadsheetModel} newProp
     * @param  {SpreadsheetModel} oldProp
     * @returns void

     */
    Spreadsheet.prototype.onPropertyChanged = function (newProp, oldProp) {
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    newProp.enableRtl ? document.getElementById(this.element.id + '_sheet_panel').classList.add('e-rtl') :
                        document.getElementById(this.element.id + '_sheet_panel').classList.remove('e-rtl');
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.split(' '));
                    }
                    break;
                case 'activeSheetTab':
                    this.renderModule.refreshSheet();
                    this.notify(activeSheetChanged, { idx: newProp.activeSheetTab - 1 });
                    break;
                case 'width':
                    this.setWidth();
                    this.resize();
                    break;
                case 'height':
                    this.setHeight();
                    this.resize();
                    break;
                case 'showRibbon':
                    this.notify(ribbon, { uiUpdate: true });
                    break;
                case 'showFormulaBar':
                    this.notify(formulaBar, { uiUpdate: true });
                    break;
                case 'showSheetTabs':
                    this.notify(sheetTabs, null);
                    break;
                case 'cellStyle':
                    this.renderModule.refreshSheet();
                    break;
            }
        }
    };
    /**
     * To provide the array of modules needed for component rendering.
     * @return {ModuleDeclaration[]}

     */
    Spreadsheet.prototype.requiredModules = function () {
        return getRequiredModules(this);
    };
    /**
     * Appends the control within the given HTML Div element.
     * @param {string | HTMLElement} selector - Target element where control needs to be appended.
     */
    Spreadsheet.prototype.appendTo = function (selector) {
        _super.prototype.appendTo.call(this, selector);
    };
    var Spreadsheet_1;
    __decorate([
        Property('')
    ], Spreadsheet.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowScrolling", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowResizing", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableClipboard", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableContextMenu", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableKeyboardNavigation", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableKeyboardShortcut", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], Spreadsheet.prototype, "selectionSettings", void 0);
    __decorate([
        Complex({}, ScrollSettings)
    ], Spreadsheet.prototype, "scrollSettings", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeCellRender", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "select", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuBeforeClose", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileMenuBeforeClose", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuItemSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileItemSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeDataBound", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellEditing", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellSave", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "created", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeSort", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "openComplete", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "sortComplete", void 0);
    Spreadsheet = Spreadsheet_1 = __decorate([
        NotifyPropertyChanges
    ], Spreadsheet);
    return Spreadsheet;
}(Workbook));
export { Spreadsheet };
