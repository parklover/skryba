import { Droppable, isBlazor } from '@syncfusion/ej2-base';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { setStyleAttribute, remove, updateBlazorTemplate, removeClass } from '@syncfusion/ej2-base';
import { getUpdateUsingRaf, appendChildren } from '../base/util';
import * as events from '../base/constant';
import { RowRenderer } from './row-renderer';
import { CellMergeRender } from './cell-merge-renderer';
import { RowModelGenerator } from '../services/row-model-generator';
import { GroupModelGenerator } from '../services/group-model-generator';
import { getScrollBarWidth, isGroupAdaptive } from '../base/util';
/**
 * Content module is used to render grid content

 */
var ContentRender = /** @class */ (function () {
    /**
     * Constructor for content renderer module
     */
    function ContentRender(parent, serviceLocator) {
        var _this = this;
        this.rows = [];
        this.freezeRows = [];
        this.movableRows = [];
        this.freezeRowElements = [];
        this.isLoaded = true;
        this.drop = function (e) {
            _this.parent.notify(events.columnDrop, { target: e.target, droppedElement: e.droppedElement });
            remove(e.droppedElement);
        };
        this.rafCallback = function (args) {
            var arg = args;
            return function () {
                _this.ariaService.setBusy(_this.getPanel().firstChild, false);
                if (_this.parent.isDestroyed) {
                    return;
                }
                var rows = _this.rows.slice(0);
                if (_this.parent.getFrozenColumns() !== 0) {
                    rows = args.isFrozen ? _this.freezeRows : _this.movableRows;
                }
                _this.parent.notify(events.contentReady, { rows: rows, args: arg });
                if (_this.isLoaded) {
                    _this.parent.trigger(events.dataBound, {});
                    if (_this.parent.allowTextWrap) {
                        _this.parent.notify(events.freezeRender, { case: 'textwrap' });
                    }
                    if (_this.parent.getFrozenColumns() !== 0 && !_this.parent.allowTextWrap) {
                        _this.parent.notify(events.freezeRender, { case: 'refreshHeight' });
                    }
                }
                if (arg) {
                    var action = (arg.requestType || '').toLowerCase() + '-complete';
                    _this.parent.notify(action, arg);
                    if (args.requestType === 'batchsave') {
                        args.cancel = false;
                        _this.parent.trigger(events.actionComplete, args);
                    }
                }
                if (_this.isLoaded) {
                    _this.parent.hideSpinner();
                }
            };
        };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.ariaService = this.serviceLocator.getService('ariaService');
        this.generator = this.getModelGenerator();
        if (this.parent.isDestroyed) {
            return;
        }
        if (!this.parent.enableColumnVirtualization && !this.parent.enableVirtualization) {
            this.parent.on(events.columnVisibilityChanged, this.setVisible, this);
        }
        this.parent.on(events.colGroupRefresh, this.colGroupRefresh, this);
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
    }
    /**
     * The function is used to render grid content div
     */
    ContentRender.prototype.renderPanel = function () {
        var gObj = this.parent;
        var div = this.parent.createElement('div', { className: 'e-gridcontent' });
        var innerDiv = this.parent.createElement('div', {
            className: 'e-content'
        });
        this.ariaService.setOptions(innerDiv, { busy: false });
        div.appendChild(innerDiv);
        this.setPanel(div);
        gObj.element.appendChild(div);
    };
    /**
     * The function is used to render grid content table
     */
    ContentRender.prototype.renderTable = function () {
        var contentDiv = this.getPanel();
        var virtualTable = contentDiv.querySelector('.e-virtualtable');
        var virtualTrack = contentDiv.querySelector('.e-virtualtrack');
        if (this.parent.enableVirtualization && !isNullOrUndefined(virtualTable) && !isNullOrUndefined(virtualTrack)) {
            remove(virtualTable);
            remove(virtualTrack);
        }
        contentDiv.appendChild(this.createContentTable('_content_table'));
        this.setTable(contentDiv.querySelector('.e-table'));
        this.ariaService.setOptions(this.getTable(), {
            multiselectable: this.parent.selectionSettings.type === 'Multiple'
        });
        this.initializeContentDrop();
        if (this.parent.frozenRows) {
            this.parent.getHeaderContent().classList.add('e-frozenhdrcont');
        }
    };
    /**
     * The function is used to create content table elements
     * @return {Element}

     */
    ContentRender.prototype.createContentTable = function (id) {
        var innerDiv = this.getPanel().firstChild;
        if (this.getTable()) {
            remove(this.getTable());
        }
        var table = this.parent.createElement('table', {
            className: 'e-table', attrs: {
                cellspacing: '0.25px', role: 'grid',
                id: this.parent.element.id + id
            }
        });
        this.setColGroup(this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').cloneNode(true));
        table.appendChild(this.getColGroup());
        table.appendChild(this.parent.createElement('tbody'));
        innerDiv.appendChild(table);
        return innerDiv;
    };
    ContentRender.prototype.splitRows = function (idx) {
        if (this.parent.getFrozenColumns()) {
            if (idx === 0) {
                this.freezeRows = this.rows;
                this.freezeRowElements = this.rowElements;
            }
            else {
                this.movableRows = this.rows;
            }
        }
    };
    /**
     * Refresh the content of the Grid.
     * @return {void}
     */
    // tslint:disable-next-line:max-func-body-length
    ContentRender.prototype.refreshContentRows = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var gObj = this.parent;
        if (gObj.currentViewData.length === 0) {
            return;
        }
        var dataSource = gObj.currentViewData;
        var frag = document.createDocumentFragment();
        var hdrfrag = document.createDocumentFragment();
        var columns = gObj.getColumns();
        var tr;
        var hdrTbody;
        var frzCols = gObj.getFrozenColumns();
        var trElement;
        var row = new RowRenderer(this.serviceLocator, null, this.parent);
        this.rowElements = [];
        this.rows = [];
        var fCont = this.getPanel().querySelector('.e-frozencontent');
        var mCont = this.getPanel().querySelector('.e-movablecontent');
        var cont = this.getPanel().querySelector('.e-content');
        if (isGroupAdaptive(gObj)) {
            if (['sorting', 'filtering', 'searching', 'grouping', 'ungrouping', 'reorder']
                .some(function (value) { return args.requestType === value; })) {
                gObj.vcRows = [];
                gObj.vRows = [];
            }
        }
        var modelData = this.generator.generateRows(dataSource, args);
        if (isNullOrUndefined(modelData[0].cells[0])) {
            mCont.querySelector('tbody').innerHTML = '';
        }
        var idx = modelData[0].cells[0].index;
        /* tslint:disable:no-any */
        if (this.parent.registeredTemplate && this.parent.registeredTemplate.template && !args.isFrozen) {
            var templatetoclear = [];
            for (var i = 0; i < this.parent.registeredTemplate.template.length; i++) {
                for (var j = 0; j < this.parent.registeredTemplate.template[i].rootNodes.length; j++) {
                    if (isNullOrUndefined(this.parent.registeredTemplate.template[i].rootNodes[j].parentNode)) {
                        templatetoclear.push(this.parent.registeredTemplate.template[i]);
                        /* tslint:enable:no-any */
                    }
                }
            }
            this.parent.destroyTemplate(['template'], templatetoclear);
        }
        if (this.parent.enableColumnVirtualization) {
            var cellMerge = new CellMergeRender(this.serviceLocator, this.parent);
            cellMerge.updateVirtualCells(modelData);
        }
        if (frzCols && idx >= frzCols) {
            this.tbody = mCont.querySelector('tbody');
        }
        else {
            this.tbody = this.getTable().querySelector('tbody');
        }
        var startIndex = 0;
        var blockLoad = true;
        if (isGroupAdaptive(gObj) && gObj.vcRows.length) {
            var top_1 = 'top';
            var scrollTop = !isNullOrUndefined(args.virtualInfo.offsets) ? args.virtualInfo.offsets.top :
                (!isNullOrUndefined(args.scrollTop) ? args.scrollTop[top_1] : 0);
            if (scrollTop !== 0) {
                var offsets_1 = gObj.vGroupOffsets;
                var bSize = gObj.pageSettings.pageSize / 2;
                var values = Object.keys(offsets_1).map(function (key) { return offsets_1[key]; });
                for (var m = 0; m < values.length; m++) {
                    if (scrollTop < values[m]) {
                        if (!isNullOrUndefined(args.virtualInfo) && args.virtualInfo.direction === 'up') {
                            args.virtualInfo.blockIndexes = m === 0 || m === 1 ? [1, 2] : [m, m + 1];
                            startIndex = m === 0 || m === 1 ? 0 : (m * bSize);
                            break;
                        }
                        else {
                            args.virtualInfo.blockIndexes = m === 0 || m === 1 ? [1, 2] : [m, m + 1];
                            startIndex = m === 0 || m === 1 ? 0 : (m) * bSize;
                            break;
                        }
                    }
                }
                if (scrollTop + this.contentPanel.firstElementChild.offsetHeight ===
                    this.contentPanel.firstElementChild.scrollHeight && !args.rowObject) {
                    blockLoad = false;
                }
            }
        }
        for (var i = startIndex, len = modelData.length; i < len; i++) {
            this.rows.push(modelData[i]);
            if (isGroupAdaptive(gObj) && this.rows.length >= (gObj.pageSettings.pageSize) && blockLoad) {
                break;
            }
            if (!gObj.rowTemplate) {
                tr = row.render(modelData[i], columns);
                if (gObj.frozenRows && i < gObj.frozenRows) {
                    hdrfrag.appendChild(tr);
                }
                else {
                    frag.appendChild(tr);
                }
                if (modelData[i].isExpand) {
                    gObj.notify(events.expandChildGrid, tr.cells[gObj.groupSettings.columns.length]);
                }
            }
            else {
                var rowTemplateID = gObj.element.id + 'rowTemplate';
                var elements = gObj.getRowTemplate()(extend({ index: i }, dataSource[i]), gObj, 'rowTemplate', rowTemplateID);
                if (elements[0].tagName === 'TBODY') {
                    for (var j = 0; j < elements.length; j++) {
                        var isTR = elements[j].nodeName.toLowerCase() === 'tr';
                        if (isTR || (elements[j].querySelectorAll && elements[j].querySelectorAll('tr').length)) {
                            tr = isTR ? elements[j] : elements[j].querySelector('tr');
                        }
                    }
                    if (gObj.frozenRows && i < gObj.frozenRows) {
                        hdrfrag.appendChild(tr);
                    }
                    else {
                        frag.appendChild(tr);
                    }
                }
                else {
                    if (gObj.frozenRows && i < gObj.frozenRows) {
                        tr = appendChildren(hdrfrag, elements);
                    }
                    else {
                        // frag.appendChild(tr);
                        tr = appendChildren(frag, elements);
                        trElement = tr.lastElementChild;
                    }
                }
                var arg = { data: modelData[i].data, row: trElement ? trElement : tr };
                this.parent.trigger(events.rowDataBound, arg);
            }
            if (modelData[i].isDataRow) {
                this.rowElements.push(tr);
            }
            this.ariaService.setOptions(this.getTable(), { colcount: gObj.getColumns().length.toString() });
        }
        this.splitRows(idx);
        if (gObj.frozenRows) {
            hdrTbody = frzCols ? gObj.getHeaderContent().querySelector(idx === 0 ? '.e-frozenheader'
                : '.e-movableheader').querySelector('tbody') : gObj.getHeaderTable().querySelector('tbody');
            hdrTbody.innerHTML = '';
            hdrTbody.appendChild(hdrfrag);
        }
        if (gObj.frozenRows && idx === 0 && cont.offsetHeight === Number(gObj.height)) {
            cont.style.height = (cont.offsetHeight - hdrTbody.offsetHeight) + 'px';
        }
        if (frzCols && idx === 0) {
            this.getPanel().firstChild.style.overflowY = 'hidden';
        }
        if (!isBlazor() || this.parent.isJsComponent) {
            args.rows = this.rows.slice(0);
        }
        args.isFrozen = this.parent.getFrozenColumns() !== 0 && !args.isFrozen;
        this.index = idx;
        getUpdateUsingRaf(function () {
            _this.parent.notify(events.beforeFragAppend, args);
            if (!_this.parent.enableVirtualization) {
                remove(_this.tbody);
                _this.tbody = _this.parent.createElement('tbody');
            }
            if (frzCols) {
                _this.tbody.appendChild(frag);
                if (_this.index === 0) {
                    _this.isLoaded = false;
                    fCont.querySelector('table').appendChild(_this.tbody);
                }
                else {
                    if (_this.tbody.childElementCount < 1) {
                        _this.tbody.appendChild(_this.parent.createElement('tr').appendChild(_this.parent.createElement('td')));
                    }
                    _this.isLoaded = true;
                    mCont.querySelector('table').appendChild(_this.tbody);
                    fCont.style.height = ((mCont.offsetHeight) - getScrollBarWidth()) + 'px';
                    mCont.style.overflowY = _this.parent.height !== 'auto' ? 'scroll' : 'auto';
                    fCont.style.borderRightWidth = '1px';
                }
            }
            else {
                if (gObj.rowTemplate) {
                    updateBlazorTemplate(gObj.element.id + 'rowTemplate', 'RowTemplate', gObj);
                }
                _this.appendContent(_this.tbody, frag, args);
            }
            if (frzCols && idx === 0) {
                _this.refreshContentRows(extend({}, args));
            }
            frag = null;
        }, this.rafCallback(extend({}, args)));
    };
    ContentRender.prototype.appendContent = function (tbody, frag, args) {
        tbody.appendChild(frag);
        this.getTable().appendChild(tbody);
    };
    /**
     * Get the content div element of grid
     * @return {Element}
     */
    ContentRender.prototype.getPanel = function () {
        return this.contentPanel;
    };
    /**
     * Set the content div element of grid
     * @param  {Element} panel
     */
    ContentRender.prototype.setPanel = function (panel) {
        this.contentPanel = panel;
    };
    /**
     * Get the content table element of grid
     * @return {Element}
     */
    ContentRender.prototype.getTable = function () {
        return this.contentTable;
    };
    /**
     * Set the content table element of grid
     * @param  {Element} table
     */
    ContentRender.prototype.setTable = function (table) {
        this.contentTable = table;
    };
    /**
     * Get the Row collection in the Grid.
     * @returns {Row[] | HTMLCollectionOf<HTMLTableRowElement>}
     */
    ContentRender.prototype.getRows = function () {
        return this.parent.getFrozenColumns() ? this.freezeRows : this.rows;
    };
    /**
     * Get the Movable Row collection in the Freeze pane Grid.
     * @returns {Row[] | HTMLCollectionOf<HTMLTableRowElement>}
     */
    ContentRender.prototype.getMovableRows = function () {
        return this.movableRows;
    };
    /**
     * Get the content table data row elements
     * @return {Element}
     */
    ContentRender.prototype.getRowElements = function () {
        return this.parent.getFrozenColumns() ? this.freezeRowElements : this.rowElements;
    };
    /**
     * Get the Freeze pane movable content table data row elements
     * @return {Element}
     */
    ContentRender.prototype.getMovableRowElements = function () {
        return this.rowElements;
    };
    /**
     * Get the content table data row elements
     * @return {Element}
     */
    ContentRender.prototype.setRowElements = function (elements) {
        this.rowElements = elements;
    };
    /**
     * Get the header colgroup element
     * @returns {Element}
     */
    ContentRender.prototype.getColGroup = function () {
        return this.colgroup;
    };
    /**
     * Set the header colgroup element
     * @param {Element} colgroup
     * @returns {Element}
     */
    ContentRender.prototype.setColGroup = function (colGroup) {
        if (!isNullOrUndefined(colGroup)) {
            colGroup.id = 'content-' + colGroup.id;
        }
        return this.colgroup = colGroup;
    };
    /**
     * Function to hide content table column based on visible property
     * @param  {Column[]} columns?
     */
    ContentRender.prototype.setVisible = function (columns) {
        var gObj = this.parent;
        var frzCols = gObj.getFrozenColumns();
        var rows = [];
        if (frzCols) {
            var fRows = this.freezeRows;
            var mRows = this.movableRows;
            var rowLen = fRows.length;
            var cellLen = void 0;
            for (var i = 0, row = void 0; i < rowLen; i++) {
                cellLen = mRows[i].cells.length;
                row = fRows[i].clone();
                for (var j = 0; j < cellLen; j++) {
                    row.cells.push(mRows[i].cells[j]);
                }
                rows.push(row);
            }
        }
        else {
            rows = this.getRows();
        }
        var element;
        var testRow;
        rows.some(function (r) { if (r.isDataRow) {
            testRow = r;
        } return r.isDataRow; });
        var tasks = [];
        var needFullRefresh = true;
        if (!gObj.groupSettings.columns.length && testRow) {
            needFullRefresh = false;
        }
        var tr = gObj.getDataRows();
        var args = {};
        var contentrows = this.rows.filter(function (row) { return !row.isDetailRow; });
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[c];
            var idx = this.parent.getNormalizedColumnIndex(column.uid);
            var displayVal = column.visible === true ? '' : 'none';
            if (idx !== -1 && testRow && idx < testRow.cells.length) {
                if (frzCols) {
                    if (idx < frzCols) {
                        setStyleAttribute(this.getColGroup().childNodes[idx], { 'display': displayVal });
                        contentrows = this.freezeRows;
                    }
                    else {
                        var mTable = gObj.getContent().querySelector('.e-movablecontent').querySelector('colgroup');
                        idx = idx - frzCols;
                        setStyleAttribute(mTable.childNodes[idx], { 'display': displayVal });
                        tr = gObj.getMovableDataRows();
                        contentrows = this.movableRows;
                    }
                }
                else {
                    if (gObj.isRowDragable()) {
                        idx++;
                    }
                    setStyleAttribute(this.getColGroup().childNodes[idx], { 'display': displayVal });
                    if (gObj.isRowDragable()) {
                        idx--;
                    }
                }
            }
            idx = gObj.isDetail() ? idx - 1 : idx;
            if (!needFullRefresh) {
                this.setDisplayNone(tr, idx, displayVal, contentrows);
            }
            if (!this.parent.invokedFromMedia && column.hideAtMedia) {
                this.parent.updateMediaColumns(column);
            }
            this.parent.invokedFromMedia = false;
        }
        if (needFullRefresh) {
            this.refreshContentRows({ requestType: 'refresh' });
        }
        else {
            if (!this.parent.getFrozenColumns()) {
                this.parent.notify(events.partialRefresh, { rows: contentrows, args: args });
            }
            else {
                this.parent.notify(events.partialRefresh, { rows: this.freezeRows, args: { isFrozen: true, rows: this.freezeRows } });
                this.parent.notify(events.partialRefresh, { rows: this.movableRows, args: { isFrozen: false, rows: this.movableRows } });
            }
        }
    };
    /**

     */
    ContentRender.prototype.setDisplayNone = function (tr, idx, displayVal, rows) {
        Object.keys(tr).forEach(function (i) {
            if (tr[i].querySelectorAll('td.e-rowcell').length) {
                setStyleAttribute(tr[i].querySelectorAll('td.e-rowcell')[idx], { 'display': displayVal });
                if (tr[i].querySelectorAll('td.e-rowcell')[idx].classList.contains('e-hide')) {
                    removeClass([tr[i].querySelectorAll('td.e-rowcell')[idx]], ['e-hide']);
                }
                rows[i].cells[idx].visible = displayVal === '' ? true : false;
            }
        });
    };
    ContentRender.prototype.colGroupRefresh = function () {
        if (this.getColGroup()) {
            var colGroup = isBlazor() ? this.parent.getHeaderTable().querySelector('colgroup').cloneNode(true) :
                this.parent.element.querySelector('.e-gridheader').querySelector('colgroup').cloneNode(true);
            this.getTable().replaceChild(colGroup, this.getColGroup());
            this.setColGroup(colGroup);
        }
    };
    ContentRender.prototype.initializeContentDrop = function () {
        var gObj = this.parent;
        var drop = new Droppable(gObj.getContent(), {
            accept: '.e-dragclone',
            drop: this.drop
        });
    };
    ContentRender.prototype.canSkip = function (column, row, index) {
        /**
         * Skip the toggle visiblity operation when one of the following success
         * 1. Grid has empty records
         * 2. column visible property is unchanged
         * 3. cell`s isVisible property is same as column`s visible property.
         */
        return isNullOrUndefined(row) || //(1)
            isNullOrUndefined(column.visible) || //(2)    
            row.cells[index].visible === column.visible; //(3)
    };
    ContentRender.prototype.getModelGenerator = function () {
        return this.generator = this.parent.allowGrouping ? new GroupModelGenerator(this.parent) : new RowModelGenerator(this.parent);
    };
    ContentRender.prototype.renderEmpty = function (tbody) {
        this.getTable().appendChild(tbody);
        if (this.parent.frozenRows) {
            this.parent.getHeaderContent().querySelector('tbody').innerHTML = '';
        }
    };
    ContentRender.prototype.setSelection = function (uid, set, clearAll) {
        if (this.parent.getFrozenColumns()) {
            this.getMovableRows().filter(function (row) { return clearAll || uid === row.uid; }).forEach(function (row) { return row.isSelected = set; });
        }
        this.getRows().filter(function (row) { return clearAll || uid === row.uid; })
            .forEach(function (row) {
            row.isSelected = set;
            row.cells.forEach(function (cell) { return cell.isSelected = set; });
        });
    };
    ContentRender.prototype.getRowByIndex = function (index) {
        return this.parent.getDataRows()[index];
    };
    ContentRender.prototype.getVirtualRowIndex = function (index) {
        return index;
    };
    ContentRender.prototype.getMovableRowByIndex = function (index) {
        return this.parent.getMovableDataRows()[index];
    };
    ContentRender.prototype.enableAfterRender = function (e) {
        if (e.module === 'group' && e.enable) {
            this.generator = this.getModelGenerator();
        }
    };
    ContentRender.prototype.setRowObjects = function (rows) {
        this.rows = rows;
    };
    return ContentRender;
}());
export { ContentRender };
