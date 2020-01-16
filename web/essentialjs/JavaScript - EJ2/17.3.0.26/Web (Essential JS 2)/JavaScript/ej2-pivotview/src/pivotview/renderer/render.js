import { Reorder, headerRefreshed } from '@syncfusion/ej2-grids';
import { Grid, Resize, ExcelExport, PdfExport, ContextMenu, Freeze } from '@syncfusion/ej2-grids';
import { Selection } from '@syncfusion/ej2-grids';
import { createElement, setStyleAttribute, remove, isNullOrUndefined, EventHandler, append, getElement } from '@syncfusion/ej2-base';
import { isBlazor } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { AggregateMenu } from '../../common/popups/aggregate-menu';
/**
 * Module to render PivotGrid control
 */
var Render = /** @class */ (function () {
    /** Constructor for render module */
    function Render(parent) {
        this.indentCollection = {};
        this.colPos = 0;
        this.lastSpan = 0;
        this.lvlCollection = {};
        this.hierarchyCollection = {};
        this.lvlPosCollection = {};
        this.hierarchyPosCollection = {};
        this.position = 0;
        this.measurePos = 0;
        this.maxMeasurePos = 0;
        this.hierarchyCount = 0;
        this.actualText = '';
        this.parent = parent;
        this.resColWidth = (this.parent.showGroupingBar && this.parent.groupingBarModule) ? (this.parent.isAdaptive ? 180 : 250) :
            (this.parent.isAdaptive ? 140 : 200);
        this.engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.gridSettings = parent.gridSettings;
        this.formatList = this.getFormatList();
        this.aggMenu = new AggregateMenu(this.parent);
    }
    /* tslint:disable */
    Render.prototype.render = function () {
        var parent = this.parent;
        var engine = this.parent.dataType === 'olap' ? this.parent.olapEngineModule : this.parent.engineModule;
        this.parent.gridHeaderCellInfo = [];
        this.parent.gridCellCollection = {};
        this.injectGridModules(parent);
        this.rowStartPos = this.getRowStartPos();
        if (this.parent.grid && this.parent.grid.element && this.parent.element.querySelector('.e-grid')) {
            if (!engine.isEngineUpdated) {
                engine.headerContent = this.frameDataSource('header');
                engine.valueContent = this.frameDataSource('value');
            }
            else {
                if (this.parent.enableValueSorting) {
                    engine.valueContent = this.frameDataSource('value');
                }
                engine.isEngineUpdated = false;
            }
            /* tslint:disable */
            this.parent.grid.setProperties({
                columns: this.frameStackedHeaders(), dataSource: (this.parent.dataType === 'olap' ? true :
                    parent.dataSourceSettings.values.length > 0) && !this.engine.isEmptyData ? engine.valueContent :
                    this.frameDataSource('value')
            }, true);
            /* tslint:enable */
            this.parent.grid.notify('datasource-modified', {});
            if (this.parent.isScrolling) {
                this.parent.resizeInfo = {};
            }
            this.parent.grid.refreshColumns();
            if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
                this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                this.parent.groupingBarModule.setGridRowWidth();
            }
            var e = this.parent.element.querySelector('.e-movablecontent');
            e.querySelector('colGroup').innerHTML =
                this.parent.grid.getHeaderContent().querySelector('.e-movableheader').querySelector('colgroup').innerHTML;
            this.parent.grid.width = this.calculateGridWidth();
            if (!this.parent.isScrolling) {
                this.calculateGridHeight(true);
            }
            //this.parent.isScrolling = false;
        }
        else {
            this.parent.element.innerHTML = '';
            this.bindGrid(this.parent, (this.engine.isEmptyData ? true : false));
            this.parent.element.appendChild(createElement('div', { id: this.parent.element.id + '_grid' }));
            this.parent.grid.isStringTemplate = true;
            this.parent.grid.appendTo('#' + this.parent.element.id + '_grid');
        }
        /* tslint:disable */
        this.parent.grid.on(headerRefreshed, this.refreshHeader, this);
    };
    Render.prototype.refreshHeader = function () {
        if (this.parent.enableVirtualization) {
            var mHdr = this.parent.element.querySelector('.' + cls.MOVABLEHEADER_DIV);
            var mCont = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV);
            var vtr = mCont.querySelector('.' + cls.VIRTUALTRACK_DIV);
            this.parent.virtualHeaderDiv = mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV);
            if (mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV)) {
                remove(mHdr.querySelector('.' + cls.VIRTUALTRACK_DIV));
            }
            else {
                this.parent.virtualHeaderDiv = createElement('div', { className: cls.VIRTUALTRACK_DIV });
            }
            mHdr.appendChild(this.parent.virtualHeaderDiv);
            if (vtr) {
                setStyleAttribute(this.parent.virtualHeaderDiv, { height: 0, width: vtr.style.width });
            }
            setStyleAttribute(mHdr.querySelector('.e-table'), {
                transform: (mCont.querySelector('.e-table').style.transform).split(',')[0] + ',' + 0 + 'px)'
            });
            mHdr.scrollLeft = mCont.scrollLeft;
        }
    };
    Render.prototype.bindGrid = function (parent, isEmpty) {
        this.injectGridModules(parent);
        this.parent.grid = new Grid({
            frozenColumns: 1,
            frozenRows: 0,
            dataSource: isEmpty ? this.frameEmptyData() : this.frameDataSource('value'),
            columns: isEmpty ? this.frameEmptyColumns() : this.frameStackedHeaders(),
            height: isEmpty ? 'auto' : this.calculateGridHeight(),
            width: isEmpty ? this.parent.width : this.calculateGridWidth(),
            locale: parent.locale,
            enableRtl: parent.enableRtl,
            allowExcelExport: parent.allowExcelExport,
            allowPdfExport: parent.allowPdfExport,
            allowResizing: this.gridSettings.allowResizing,
            allowTextWrap: this.gridSettings.allowTextWrap,
            allowReordering: (this.parent.showGroupingBar ? false : this.gridSettings.allowReordering),
            allowSelection: this.gridSettings.allowSelection,
            /* tslint:disable-next-line */
            contextMenuItems: this.gridSettings.contextMenuItems,
            selectedRowIndex: this.gridSettings.selectedRowIndex,
            /* tslint:disable-next-line */
            selectionSettings: this.gridSettings.selectionSettings,
            textWrapSettings: this.gridSettings.textWrapSettings,
            printMode: this.gridSettings.printMode,
            rowHeight: this.gridSettings.rowHeight,
            gridLines: this.gridSettings.gridLines,
            contextMenuClick: this.contextMenuClick.bind(this),
            contextMenuOpen: this.contextMenuOpen.bind(this),
            beforeCopy: this.gridSettings.beforeCopy ? this.gridSettings.beforeCopy.bind(this.parent) : undefined,
            beforePrint: this.gridSettings.beforePrint ? this.gridSettings.beforePrint.bind(this.parent) : undefined,
            printComplete: this.gridSettings.printComplete ? this.gridSettings.printComplete.bind(this.parent) : undefined,
            rowSelecting: this.gridSettings.rowSelecting ? this.gridSettings.rowSelecting.bind(this.parent) : undefined,
            rowSelected: this.rowSelected.bind(this),
            rowDeselecting: this.gridSettings.rowDeselecting ? this.gridSettings.rowDeselecting.bind(this.parent) : undefined,
            rowDeselected: this.rowDeselected.bind(this),
            cellSelecting: this.gridSettings.cellSelecting ? this.gridSettings.cellSelecting.bind(this.parent) : undefined,
            cellSelected: this.cellSelected.bind(this),
            cellDeselecting: this.gridSettings.cellDeselecting ? this.gridSettings.cellDeselecting.bind(this.parent) : undefined,
            cellDeselected: this.cellDeselected.bind(this),
            resizeStart: this.gridSettings.resizeStart ? this.gridSettings.resizeStart.bind(this.parent) : undefined,
            columnDragStart: this.gridSettings.columnDragStart ? this.gridSettings.columnDragStart.bind(this) : undefined,
            columnDrag: this.gridSettings.columnDrag ? this.gridSettings.columnDrag.bind(this) : undefined,
            columnDrop: this.gridSettings.columnDrop ? this.gridSettings.columnDrop.bind(this) : undefined,
            beforeExcelExport: this.beforeExcelExport.bind(this),
            resizing: this.setGroupWidth.bind(this),
            resizeStop: this.onResizeStop.bind(this),
            queryCellInfo: this.queryCellInfo.bind(this),
            dataBound: this.dataBound.bind(this),
            headerCellInfo: this.headerCellInfo.bind(this),
            excelHeaderQueryCellInfo: this.excelHeaderQueryCellInfo.bind(this),
            pdfHeaderQueryCellInfo: this.pdfHeaderQueryCellInfo.bind(this),
            excelQueryCellInfo: this.excelQueryCellInfo.bind(this),
            pdfQueryCellInfo: this.pdfQueryCellInfo.bind(this),
            beforePdfExport: this.gridSettings.beforePdfExport ? this.gridSettings.beforePdfExport.bind(this) : undefined
        });
        this.parent.grid.on('header-refreshed', this.headerRefreshed.bind(this));
    };
    /* tslint:disable-next-line */
    Render.prototype.headerRefreshed = function (args) {
        if (this.parent.lastGridSettings && Object.keys(this.parent.lastGridSettings).indexOf('allowResizing') > -1) {
            this.parent.lastGridSettings = undefined;
            if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
                this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
                this.parent.groupingBarModule.setGridRowWidth();
            }
        }
    };
    /* tslint:disable-next-line */
    Render.prototype.beforeExcelExport = function (args) {
        if (!isNullOrUndefined(args.gridObject.columns) && !isNullOrUndefined(this.parent.pivotColumns)) {
            args.gridObject.columns[args.gridObject.columns.length - 1].width =
                this.parent.pivotColumns[this.parent.pivotColumns.length - 1].width;
        }
        this.parent.trigger(events.beforeExcelExport, args);
    };
    Render.prototype.rowSelected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.rowSelected, args);
    };
    Render.prototype.rowDeselected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.rowDeselected, args);
    };
    Render.prototype.cellSelected = function (args) {
        if (this.parent.rowRangeSelection.enable) {
            this.parent.grid.selectionModule.selectRowsByRange(this.parent.rowRangeSelection.startIndex, this.parent.rowRangeSelection.endIndex);
            this.parent.rowRangeSelection.enable = false;
        }
        else {
            this.parent.renderModule.selected();
            this.parent.trigger(events.selected, args);
        }
    };
    Render.prototype.cellSelecting = function (args) {
        this.parent.trigger(events.cellSelecting, args);
    };
    Render.prototype.cellDeselected = function (args) {
        this.parent.renderModule.selected();
        this.parent.trigger(events.cellDeselected, args);
    };
    Render.prototype.queryCellInfo = function (args) {
        this.parent.renderModule.rowCellBoundEvent(args);
    };
    Render.prototype.headerCellInfo = function (args) {
        this.parent.renderModule.columnCellBoundEvent(args);
    };
    Render.prototype.excelHeaderQueryCellInfo = function (args) {
        this.parent.renderModule.excelColumnEvent(args);
    };
    Render.prototype.pdfQueryCellInfo = function (args) {
        this.parent.renderModule.pdfRowEvent(args);
    };
    Render.prototype.excelQueryCellInfo = function (args) {
        this.parent.renderModule.excelRowEvent(args);
    };
    Render.prototype.pdfHeaderQueryCellInfo = function (args) {
        this.parent.renderModule.pdfColumnEvent(args);
    };
    Render.prototype.dataBound = function (args) {
        /* tslint:disable-next-line */
        if (this.parent.cellTemplate && !isBlazor()) {
            for (var _i = 0, _a = this.parent.gridHeaderCellInfo; _i < _a.length; _i++) {
                var cell = _a[_i];
                if (this.parent.cellTemplate) {
                    /* tslint:disable-next-line */
                    append([].slice.call(this.parent.getCellTemplate()(cell, this.parent, 'cellTemplate', this.parent.element.id + '_cellTemplate')), cell.targetCell);
                }
            }
            this.parent.gridHeaderCellInfo = [];
        }
        if (this.parent.element.querySelector('.e-firstcell')) {
            if (this.parent.enableRtl) {
                this.parent.element.querySelector('.e-firstcell').style.borderRight = 'none';
            }
            else {
                this.parent.element.querySelector('.e-firstcell').style.borderLeft = 'none';
            }
        }
        this.parent.grid.widthService.setWidthToTable();
        /* tslint:disable-next-line */
        if (!this.parent.isEmptyGrid) {
            this.calculateGridHeight(true);
        }
        if (this.parent.currentView !== 'Chart') {
            this.parent.grid.hideScroll();
        }
        this.parent.isScrolling = false;
        this.parent.notify(events.contentReady, {});
    };
    /* tslint:disable */
    /* tslint:disable:typedef */
    Render.prototype.contextMenuOpen = function (args) {
        for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var cellTarget = this.parent.lastCellClicked;
            var elem = null;
            var bool = void 0;
            if (cellTarget.classList.contains('e-stackedheadercelldiv') || cellTarget.classList.contains('e-cellvalue') ||
                cellTarget.classList.contains('e-headercelldiv') || cellTarget.classList.contains('e-icons') || cellTarget.classList.contains('e-rhandler')) {
                elem = cellTarget.parentElement;
            }
            else if (cellTarget.classList.contains('e-headercell') || cellTarget.classList.contains('e-rowcell') || cellTarget.classList.contains('e-columnsheader') ||
                cellTarget.classList.contains('e-rowsheader') || cellTarget.classList.contains('e-valuescontent') || cellTarget.classList.contains('e-valuesheader')) {
                elem = cellTarget;
            }
            else if (cellTarget.classList.contains('e-headertext')) {
                elem = cellTarget.parentElement.parentElement;
            }
            if (elem.classList.contains('e-valuesheader') || elem.classList.contains('e-stot')) {
                bool = true;
            }
            var rowIndex = Number(elem.getAttribute('index'));
            var colIndex = Number(elem.getAttribute('aria-colindex'));
            var pivotValue1 = this.parent.pivotValues[rowIndex][colIndex];
            var select = item.id;
            switch (select) {
                case this.parent.element.id + '_expand':
                    if (elem.querySelectorAll('.' + cls.EXPAND).length > 0) {
                        if (args.element.querySelectorAll('#' + this.parent.element.id + '_expand')) {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.add(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_expand').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.remove(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_expand').classList.contains(cls.MENU_HIDE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.remove(cls.MENU_HIDE);
                            args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.remove(cls.MENU_HIDE);
                        }
                    }
                    else {
                        if (bool) {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.add(cls.MENU_HIDE);
                        }
                        else {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this.parent.element.id + '_collapse':
                    if (elem.querySelectorAll('.' + cls.COLLAPSE).length > 0) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_expand')) {
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.add(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.remove(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.contains(cls.MENU_HIDE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.remove(cls.MENU_HIDE);
                            args.element.querySelector('#' + this.parent.element.id + '_expand').classList.remove(cls.MENU_HIDE);
                        }
                    }
                    else {
                        if (bool) {
                            args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.add(cls.MENU_HIDE);
                        }
                        else {
                            args.element.querySelector('#' + this.parent.element.id + '_collapse').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this.parent.element.id + '_drillthrough':
                    if (!this.parent.allowDrillThrough) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_drillthrough')) {
                            args.element.querySelector('#' + this.parent.element.id + '_drillthrough').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (!(elem.classList.contains('e-summary'))) {
                        if (elem.innerText === "") {
                            if (args.element.querySelector('#' + this.parent.element.id + '_drillthrough')) {
                                args.element.querySelector('#' + this.parent.element.id + '_drillthrough').classList.add(cls.MENU_DISABLE);
                            }
                        }
                    }
                    else {
                        if (args.element.querySelector('#' + this.parent.element.id + '_drillthrough').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_drillthrough').classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    break;
                case this.parent.element.id + '_sortasc':
                    if (!this.parent.enableValueSorting) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortasc')) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (elem.querySelectorAll('.e-icon-descending').length > 0) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortdesc')) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.add(cls.MENU_DISABLE);
                        }
                        else {
                            args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.remove(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    else if (args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.contains(cls.MENU_DISABLE)) {
                        args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.remove(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_sortdesc':
                    if (!this.parent.enableValueSorting) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortdesc')) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else if (elem.querySelectorAll('.e-icon-ascending').length > 0) {
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortasc')) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.add(cls.MENU_DISABLE);
                        }
                        else {
                            args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.remove(cls.MENU_DISABLE);
                        }
                        if (args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_sortdesc').classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    else if (args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.contains(cls.MENU_DISABLE)) {
                        args.element.querySelector('#' + this.parent.element.id + '_sortasc').classList.remove(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_CalculatedField':
                    if (!this.parent.allowCalculatedField) {
                        args.element.querySelector('#' + this.parent.element.id + '_CalculatedField').classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_pdf':
                    if (!this.parent.allowPdfExport) {
                        args.element.querySelector('#' + this.parent.element.id + '_pdf').classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_excel':
                    if (!this.parent.allowExcelExport) {
                        args.element.querySelector('#' + this.parent.element.id + '_excel').classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_csv':
                    if (!this.parent.allowExcelExport) {
                        args.element.querySelector('#' + this.parent.element.id + '_csv').classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_exporting':
                    if ((!this.parent.allowExcelExport) && (!this.parent.allowPdfExport)) {
                        args.element.querySelector('#' + this.parent.element.id + '_exporting').classList.add(cls.MENU_DISABLE);
                    }
                    break;
                case this.parent.element.id + '_aggregate':
                    if (elem.innerText === "") {
                        if (args.element.querySelector('#' + this.parent.element.id + '_aggregate')) {
                            args.element.querySelector('#' + this.parent.element.id + '_aggregate').classList.add(cls.MENU_DISABLE);
                        }
                    }
                    else {
                        if (args.element.querySelector('#' + this.parent.element.id + '_aggregate').classList.contains(cls.MENU_DISABLE)) {
                            args.element.querySelector('#' + this.parent.element.id + '_aggregate').classList.remove(cls.MENU_DISABLE);
                        }
                    }
                    break;
            }
        }
        this.parent.trigger(events.contextMenuOpen, args);
    };
    Render.prototype.contextMenuClick = function (args) {
        // this.parent.gridSettings.contextMenuClick();
        var target = this.parent.lastCellClicked;
        var selected = args.item.id;
        var event = new MouseEvent('dblclick', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        var ele = null;
        if (target.classList.contains('e-stackedheadercelldiv') || target.classList.contains('e-cellvalue') ||
            target.classList.contains('e-headercelldiv') || target.classList.contains('e-icons') || target.classList.contains('e-rhandler')) {
            ele = target.parentElement;
        }
        else if (target.classList.contains('e-headercell') || target.classList.contains('e-rowcell')) {
            ele = target;
        }
        else if (target.classList.contains('e-headertext')) {
            ele = target.parentElement.parentElement;
        }
        var rowIndx = Number(ele.getAttribute('index'));
        var colIndx = Number(ele.getAttribute('aria-colindex'));
        var pivotValue = this.parent.pivotValues[rowIndx][colIndx];
        if (args.item.id === this.parent.element.id + '_AggSum' || args.item.id === this.parent.element.id + '_AggProduct' ||
            args.item.id === this.parent.element.id + '_AggCount' || args.item.id === this.parent.element.id + '_AggDistinctCount' ||
            args.item.id === this.parent.element.id + '_AggAvg' || args.item.id === this.parent.element.id + '_AggMin' ||
            args.item.id === this.parent.element.id + '_AggMax' || args.item.id === this.parent.element.id + '_AggMoreOption') {
            this.field = this.parent.engineModule.fieldList[pivotValue.actualText.toString()].id;
            this.fieldCaption = this.parent.engineModule.fieldList[pivotValue.actualText.toString()].caption;
        }
        switch (selected) {
            case this.parent.element.id + '_pdf':
                this.parent.pdfExport();
                break;
            case this.parent.element.id + '_excel':
                this.parent.excelExport();
                break;
            case this.parent.element.id + '_csv':
                this.parent.csvExport();
                break;
            case this.parent.element.id + '_drillthrough_menu':
                ele.dispatchEvent(event);
                break;
            case this.parent.element.id + '_sortasc':
                this.parent.setProperties({
                    dataSourceSettings: {
                        valueSortSettings: {
                            headerText: pivotValue.valueSort.levelName,
                            headerDelimiter: this.parent.dataSourceSettings.valueSortSettings.headerDelimiter
                        }
                    }
                });
                this.parent.dataSourceSettings.valueSortSettings.sortOrder = 'Ascending';
                break;
            case this.parent.element.id + '_sortdesc':
                this.parent.setProperties({
                    dataSourceSettings: {
                        valueSortSettings: {
                            headerText: pivotValue.valueSort.levelName,
                            headerDelimiter: this.parent.dataSourceSettings.valueSortSettings.headerDelimiter
                        }
                    }
                });
                this.parent.dataSourceSettings.valueSortSettings.sortOrder = 'Descending';
                break;
            case this.parent.element.id + '_expand':
                if (ele.querySelectorAll('.' + cls.EXPAND)) {
                    var exp = ele.querySelectorAll('.' + cls.EXPAND)[0];
                    this.parent.onDrill(exp);
                }
                break;
            case this.parent.element.id + '_collapse':
                if (ele.querySelectorAll('.' + cls.COLLAPSE)) {
                    var colp = ele.querySelectorAll('.' + cls.COLLAPSE)[0];
                    this.parent.onDrill(colp);
                }
                break;
            case this.parent.element.id + '_CalculatedField':
                this.parent.calculatedFieldModule.createCalculatedFieldDialog();
                break;
            case this.parent.element.id + '_AggSum':
                this.updateAggregate('Sum');
                break;
            case this.parent.element.id + '_AggProduct':
                this.updateAggregate('Product');
                break;
            case this.parent.element.id + '_AggCount':
                this.updateAggregate('Count');
                break;
            case this.parent.element.id + '_AggDistinctCount':
                this.updateAggregate('DistinctCount');
                break;
            case this.parent.element.id + '_AggAvg':
                this.updateAggregate('Avg');
                break;
            case this.parent.element.id + '_AggMin':
                this.updateAggregate('Min');
                break;
            case this.parent.element.id + '_AggMax':
                this.updateAggregate('Max');
                break;
            case this.parent.element.id + '_AggMoreOption':
                ele.setAttribute('id', this.field);
                ele.setAttribute('data-caption', this.fieldCaption);
                ele.setAttribute('data-field', this.field);
                ele.setAttribute('data-type', this.engine.fieldList[pivotValue.actualText.toString()].aggregateType);
                ele.setAttribute('data-basefield', this.engine.fieldList[pivotValue.actualText.toString()].baseField);
                ele.setAttribute('data-baseItem', this.engine.fieldList[pivotValue.actualText.toString()].baseItem);
                this.aggMenu.createValueSettingsDialog(ele, this.parent.element);
                break;
        }
        this.parent.trigger(events.contextMenuClick, args);
    };
    /* tslint:enable */
    Render.prototype.updateAggregate = function (aggregate) {
        var valuefields = this.parent.dataSourceSettings.values;
        for (var valueCnt = 0; valueCnt < this.parent.dataSourceSettings.values.length; valueCnt++) {
            if (this.parent.dataSourceSettings.values[valueCnt].name === this.field) {
                var dataSourceItem = valuefields[valueCnt];
                dataSourceItem.type = aggregate;
            }
        }
    };
    Render.prototype.injectGridModules = function (parent) {
        Grid.Inject(Freeze);
        if (parent.allowExcelExport) {
            Grid.Inject(ExcelExport);
        }
        if (parent.allowPdfExport) {
            Grid.Inject(PdfExport);
        }
        Grid.Inject(Selection, Reorder, Resize);
        if (this.gridSettings.contextMenuItems) {
            Grid.Inject(ContextMenu);
        }
    };
    Render.prototype.updateGridSettings = function () {
        this.injectGridModules(this.parent);
        this.parent.grid.allowResizing = this.gridSettings.allowResizing;
        this.parent.grid.allowTextWrap = this.gridSettings.allowTextWrap;
        this.parent.grid.allowReordering = (this.parent.showGroupingBar ? false : this.gridSettings.allowReordering);
        this.parent.grid.allowSelection = this.gridSettings.allowSelection;
        /* tslint:disable-next-line */
        this.parent.grid.contextMenuItems = this.gridSettings.contextMenuItems;
        this.parent.grid.selectedRowIndex = this.gridSettings.selectedRowIndex;
        /* tslint:disable-next-line */
        this.parent.grid.selectionSettings = this.gridSettings.selectionSettings;
        this.parent.grid.textWrapSettings = this.gridSettings.textWrapSettings;
        this.parent.grid.printMode = this.gridSettings.printMode;
        this.parent.grid.rowHeight = this.gridSettings.rowHeight;
        this.parent.grid.gridLines = this.gridSettings.gridLines;
        if (this.parent.lastGridSettings) {
            var keys = Object.keys(this.parent.lastGridSettings);
            if (keys.indexOf('height') > -1) {
                this.parent.grid.height = this.gridSettings.height;
            }
            if (keys.indexOf('width') > -1) {
                this.parent.grid.width = this.gridSettings.width;
            }
            this.updatePivotColumns();
        }
        this.clearColumnSelection();
    };
    Render.prototype.updatePivotColumns = function () {
        var keys = Object.keys(this.parent.lastGridSettings);
        for (var colPos = 0; colPos < this.parent.pivotColumns.length; colPos++) {
            var pivotColumn = this.parent.pivotColumns[colPos];
            for (var keyPos = 0; keyPos < keys.length; keyPos++) {
                var key = keys[keyPos];
                /* tslint:disable-next-line */
                if (!isNullOrUndefined(this.parent.pivotColumns[colPos][key])) {
                    /* tslint:disable-next-line */
                    pivotColumn[key] = this.parent.lastGridSettings[key];
                }
            }
        }
        this.parent.fillGridColumns(this.parent.grid.columns);
    };
    Render.prototype.clearColumnSelection = function () {
        this.parent.element.querySelectorAll('.' + cls.CELL_ACTIVE_BGCOLOR).forEach(function (ele) {
            ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
            ele.classList.remove(cls.SELECTED_BGCOLOR);
        });
    };
    Render.prototype.appendValueSortIcon = function (cell, tCell, rCnt, cCnt) {
        if (this.parent.enableValueSorting && this.parent.dataType === 'pivot') {
            var vSort = this.parent.dataSourceSettings.valueSortSettings;
            var len = (cell.type === 'grand sum' &&
                this.parent.dataSourceSettings.values.length === 1 && !this.parent.dataSourceSettings.alwaysShowValueHeader) ? 0 :
                (this.parent.dataSourceSettings.values.length > 1 || this.parent.dataSourceSettings.alwaysShowValueHeader) ?
                    (this.parent.engineModule.headerContent.length - 1) :
                    this.parent.dataSourceSettings.columns.length === 0 ? 0 : (this.parent.engineModule.headerContent.length - 1);
            var lock = (vSort && vSort.headerText) ? cell.valueSort.levelName === vSort.headerText : cCnt === vSort.columnIndex;
            if (vSort !== undefined && lock && rCnt === len && this.parent.dataSourceSettings.valueAxis === 'column') {
                if (tCell.querySelector('.e-sortfilterdiv')) {
                    tCell.querySelector('.e-sortfilterdiv').classList.add(vSort.sortOrder === 'Descending' ?
                        'e-descending' : 'e-ascending');
                    tCell.querySelector('.e-sortfilterdiv').classList.add(vSort.sortOrder === 'Descending' ?
                        'e-icon-descending' : 'e-icon-ascending');
                }
                else {
                    tCell.appendChild(createElement('div', {
                        className: (vSort.sortOrder === 'Descending' ?
                            'e-icon-descending e-icons e-descending e-sortfilterdiv' :
                            'e-icon-ascending e-icons e-ascending e-sortfilterdiv'),
                    }));
                }
                if (!isNullOrUndefined(cell.hasChild) && cell.type !== 'grand sum' && tCell.querySelector('.e-expand') &&
                    (tCell.querySelector('.e-icon-descending') || tCell.querySelector('.e-icon-ascending'))) {
                    var element = (tCell.querySelector('.e-icon-descending') || tCell.querySelector('.e-icon-ascending'));
                    setStyleAttribute(element, { 'padding-top': '12px' });
                }
            }
            // return tCell;
        }
        return tCell;
    };
    Render.prototype.onResizeStop = function (args) {
        /* tslint:disable-next-line */
        var column = args.column.field === '0.formattedText' ? '0.formattedText' : args.column.customAttributes.cell.valueSort.levelName;
        this.parent.resizeInfo[column] = Number(args.column.width.toString().split('px')[0]);
        this.setGroupWidth(args);
        this.calculateGridHeight(true);
        this.parent.grid.hideScroll();
    };
    Render.prototype.setGroupWidth = function (args) {
        if (this.parent.showGroupingBar && this.parent.groupingBarModule &&
            this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS)) {
            this.parent.groupingBarModule.refreshUI();
            if (this.parent.element.querySelector('.e-group-row').offsetWidth < 245 && !this.parent.firstColWidth) {
                args.cancel = true;
                var gridColumn = this.parent.grid.columns;
                if (gridColumn && gridColumn.length > 0) {
                    gridColumn[0].width = this.resColWidth;
                }
                this.parent.element.querySelector('.e-frozenheader').querySelector('col').style.width = (this.resColWidth + 'px');
                this.parent.element.querySelector('.e-frozencontent').querySelector('col').style.width = (this.resColWidth + 'px');
            }
            this.parent.element.querySelector('.e-group-rows').style.height = 'auto';
            this.parent.element.querySelector('.e-group-values').style.width =
                this.parent.element.querySelector('.e-group-row').offsetWidth + 'px';
            var firstRowHeight = this.parent.element.querySelector('.e-headercontent').offsetHeight;
            this.parent.element.querySelector('.e-group-rows').style.height = firstRowHeight + 'px';
        }
        this.parent.trigger(args.e.type === 'touchend' || args.e.type === 'mouseup' ? events.resizeStop : events.resizing, args);
    };
    /* tslint:disable */
    Render.prototype.selected = function () {
        clearTimeout(this.timeOutObj);
        this.timeOutObj = setTimeout(this.onSelect.bind(this), 300);
    };
    Render.prototype.onSelect = function () {
        var pivotArgs = { selectedCellsInfo: [], pivotValues: this.parent.pivotValues, currentCell: null };
        /* tslint:disable-next-line */
        var selectedElements = this.parent.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR + ',.' + cls.SELECTED_BGCOLOR);
        for (var _i = 0, selectedElements_1 = selectedElements; _i < selectedElements_1.length; _i++) {
            var element = selectedElements_1[_i];
            var colIndex = Number(element.getAttribute('aria-colindex'));
            var rowIndex = Number(element.getAttribute('index'));
            var cell = this.engine.pivotValues[rowIndex][colIndex];
            if (cell) {
                if (cell.axis === 'value') {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.value,
                        columnHeaders: cell.columnHeaders,
                        rowHeaders: cell.rowHeaders,
                        measure: cell.actualText.toString()
                    });
                }
                else if (cell.axis === 'column') {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.formattedText,
                        columnHeaders: cell.valueSort.levelName,
                        rowHeaders: '',
                        measure: ''
                    });
                }
                else {
                    pivotArgs.selectedCellsInfo.push({
                        currentCell: cell,
                        value: cell.formattedText,
                        columnHeaders: '',
                        rowHeaders: cell.valueSort.levelName,
                        measure: ''
                    });
                }
            }
        }
        this.parent.trigger(events.cellSelected, pivotArgs);
    };
    Render.prototype.rowCellBoundEvent = function (args) {
        var tCell = args.cell;
        /* tslint:disable-next-line */
        if (tCell && !this.parent.isEmptyGrid) {
            var customClass = this.parent.hyperlinkSettings.cssClass;
            tCell.setAttribute('index', (Number(tCell.getAttribute('index')) + this.engine.headerContent.length).toString());
            var cell = args.data[0];
            if (tCell.getAttribute('aria-colindex') === '0') {
                if (this.parent.dataType === 'pivot') {
                    var isValueCell = cell.type && cell.type === 'value';
                    tCell.innerText = '';
                    var level = cell.level ? cell.level : (isValueCell ? (this.lastSpan + 1) : 0);
                    do {
                        if (level > 0) {
                            tCell.appendChild(createElement('span', {
                                className: level === 0 ? '' : cls.NEXTSPAN,
                            }));
                        }
                        level--;
                    } while (level > -1);
                    level = cell.level ? cell.level : 0;
                    this.lastSpan = !isValueCell ? level : this.lastSpan;
                    if (!cell.hasChild && level > 0) {
                        tCell.appendChild(createElement('span', {
                            className: cls.LASTSPAN,
                        }));
                    }
                    var fieldName = void 0;
                    if ((this.parent.dataSourceSettings.rows.length > 0 &&
                        (cell.valueSort ? Object.keys(cell.valueSort).length > 0 : true))) {
                        fieldName = level > -1 ? this.parent.dataSourceSettings.rows[level].name : '';
                        tCell.setAttribute('fieldname', fieldName);
                    }
                }
                else {
                    tCell = this.onOlapRowCellBoundEvent(tCell, cell);
                }
                var localizedText = cell.formattedText;
                if (cell.type) {
                    if (cell.type === 'grand sum') {
                        tCell.classList.add('e-gtot');
                        localizedText = this.parent.localeObj.getConstant('grandTotal');
                    }
                    else {
                        tCell.classList.add('e-stot');
                    }
                }
                tCell.classList.add(cls.ROWSHEADER);
                if (cell.hasChild === true && !cell.isNamedSet) {
                    tCell.appendChild(createElement('div', {
                        className: (cell.isDrilled === true ? cls.COLLAPSE : cls.EXPAND) + ' ' + cls.ICON,
                        attrs: {
                            'title': cell.isDrilled === true ? this.parent.localeObj.getConstant('collapse') :
                                this.parent.localeObj.getConstant('expand')
                        }
                    }));
                }
                tCell.appendChild(createElement('span', {
                    className: cls.CELLVALUE,
                    /* tslint:disable-next-line */
                    innerHTML: (this.parent.isRowCellHyperlink || cell.enableHyperlink ? '<a  data-url="' + localizedText + '" class="e-hyperlinkcell ' + customClass + '">' + localizedText + '</a>' : localizedText)
                }));
                var vSort = this.parent.pivotView.dataSourceSettings.valueSortSettings;
                if (this.parent.enableValueSorting) {
                    if (vSort && vSort.headerText && this.parent.dataSourceSettings.valueAxis === 'row'
                        && this.parent.pivotValues[Number(tCell.getAttribute('index'))][0].valueSort.levelName) {
                        if (this.parent.pivotValues[Number(tCell.getAttribute('index'))][0].valueSort.levelName
                            === vSort.headerText) {
                            var style = (tCell.querySelector('.e-expand') || tCell.querySelector('.e-collapse')) ?
                                'padding-top: 18px' : 'padding-top: 12px';
                            tCell.appendChild(createElement('div', {
                                className: (vSort.sortOrder === 'Descending' ?
                                    'e-icon-descending e-icons e-descending e-sortfilterdiv' :
                                    'e-icon-ascending e-icons e-ascending e-sortfilterdiv'),
                                styles: style
                            }));
                        }
                    }
                }
            }
            else {
                var innerText = tCell.innerText;
                tCell.innerText = '';
                tCell.classList.add(cls.VALUESCONTENT);
                cell = args.data[Number(tCell.getAttribute('aria-colindex'))];
                if (cell.isSum) {
                    tCell.classList.add(cls.SUMMARY);
                }
                if (cell.cssClass) {
                    tCell.classList.add(cell.cssClass);
                }
                tCell.appendChild(createElement('span', {
                    className: cls.CELLVALUE,
                    innerHTML: ((tCell.className.indexOf('e-summary') !== -1 && this.parent.isSummaryCellHyperlink) ||
                        (tCell.className.indexOf('e-summary') === -1 && this.parent.isValueCellHyperlink) || cell.enableHyperlink ?
                        '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>' : innerText)
                }));
                if (this.parent.gridSettings.allowReordering && !this.parent.showGroupingBar) {
                    tCell.setAttribute('aria-colindex', args.column.customAttributes.cell.colIndex.toString());
                }
            }
            if (this.parent.cellTemplate) {
                var index = tCell.getAttribute('index');
                var colindex = tCell.getAttribute('aria-colindex');
                var templateID = index + '_' + colindex;
                /* tslint:disable-next-line */
                if (!(window && isBlazor())) {
                    /* tslint:disable-next-line */
                    append([].slice.call(this.parent.getCellTemplate()({ targetCell: tCell }, this.parent, 'cellTemplate', this.parent.element.id + '_cellTemplate')), tCell);
                }
                else if (index && colindex) {
                    this.parent.gridCellCollection[templateID] = tCell;
                }
            }
            this.unWireEvents(tCell);
            this.wireEvents(tCell);
        }
        args.pivotview = this.parent;
        this.parent.trigger(events.queryCellInfo, args);
    };
    /* tslint:disable */
    Render.prototype.onOlapRowCellBoundEvent = function (tCell, cell) {
        tCell.innerText = '';
        var rowMeasurePos = this.engine.rowMeasurePos;
        if (this.parent.enableVirtualization) {
            if (cell.ordinal > -1 && this.parent.olapEngineModule.tupRowInfo.length > 0) {
                var tupInfo = this.parent.olapEngineModule.tupRowInfo[cell.ordinal];
                var memberPosition = tupInfo.uNameCollection.indexOf(cell.actualText.toString());
                var cropUName = tupInfo.uNameCollection.substring(0, memberPosition) +
                    (cell.memberType === 3 ? '' : cell.actualText.toString());
                var fieldSep = cropUName.split('::').filter(function (item) { return item !== ''; });
                if (cell.memberType === 3 && rowMeasurePos === fieldSep.length) {
                    fieldSep.push(cell.actualText.toString());
                }
                var nxtIndextCount = -1;
                var lastIndextCount = 0;
                var prevHasChild = false;
                for (var fPos = 0; fPos < fieldSep.length; fPos++) {
                    var fieldMembers = fieldSep[fPos];
                    var membersCount = fieldMembers.split('~~').length;
                    nxtIndextCount += membersCount;
                    var hasChild = Number(tupInfo.members[fPos].querySelector('CHILDREN_CARDINALITY').textContent) > 0;
                    lastIndextCount += (fPos > 0 && prevHasChild && !hasChild) ? 1 : 0;
                    prevHasChild = hasChild;
                }
                var indent = 0;
                for (var iPos = 0; iPos < nxtIndextCount; iPos++) {
                    tCell.appendChild(createElement('span', {
                        className: cls.NEXTSPAN,
                    }));
                    indent++;
                }
                for (var iPos = 0; iPos < lastIndextCount && nxtIndextCount > 0; iPos++) {
                    tCell.appendChild(createElement('span', {
                        className: cls.LASTSPAN,
                    }));
                }
                this.indentCollection[cell.rowIndex] = indent;
                this.maxIndent = this.maxIndent > indent ? this.maxIndent : indent;
            }
        }
        else {
            var hierarchyName = cell.hierarchy;
            var levelName = cell.memberType === 3 ? (this.measurePos + '.' + cell.levelUniqueName) : cell.levelUniqueName;
            var hasChild = cell.hasChild;
            if (!this.lvlCollection[levelName] && levelName) {
                this.lvlPosCollection[this.position] = levelName;
                this.lvlCollection[levelName] = { position: this.position, hasChild: hasChild };
                this.position++;
            }
            else if (levelName) {
                var currPos_1 = this.lvlCollection[levelName].position;
                for (var pos = currPos_1 + 1; pos < this.position; pos++) {
                    delete this.lvlCollection[this.lvlPosCollection[pos]];
                    delete this.lvlPosCollection[pos];
                }
                this.position = this.position > (currPos_1 + 1) ? (currPos_1 + 1) : this.position;
            }
            if (!this.hierarchyCollection[hierarchyName] && hierarchyName) {
                this.hierarchyPosCollection[this.hierarchyCount] = hierarchyName;
                this.hierarchyCollection[hierarchyName] = {
                    lvlPosition: this.position - 1,
                    hierarchyPOs: this.hierarchyCount
                };
                this.hierarchyCount++;
            }
            else if (hierarchyName) {
                var currPos_2 = this.hierarchyCollection[hierarchyName].hierarchyPOs;
                for (var pos = currPos_2 + 1; pos < this.hierarchyCount; pos++) {
                    delete this.hierarchyCollection[this.hierarchyPosCollection[pos]];
                    delete this.hierarchyPosCollection[pos];
                }
                this.hierarchyCount = this.hierarchyCount > (currPos_2 + 1) ? (currPos_2 + 1) : this.hierarchyCount;
            }
            if (cell.memberType !== 3 && levelName && this.lvlCollection[levelName]) {
                var currHierarchyPos = this.hierarchyCollection[hierarchyName] ?
                    this.hierarchyCollection[hierarchyName].hierarchyPOs : -1;
                this.measurePos = rowMeasurePos <= currHierarchyPos && this.hierarchyPosCollection[rowMeasurePos + 1] ?
                    this.measurePos : this.lvlCollection[levelName].position;
            }
            var currPos = this.lvlCollection[levelName] ? this.lvlCollection[levelName].position : -1;
            var lvlPos = 0;
            var indent = 0;
            while (lvlPos <= currPos && currPos > 0 && cell.level > -1) {
                var hasChild_1 = this.lvlCollection[this.lvlPosCollection[lvlPos]].hasChild;
                var prevHasChild = lvlPos > 0 ? this.lvlCollection[this.lvlPosCollection[lvlPos - 1]].hasChild : false;
                if (prevHasChild && !hasChild_1) {
                    tCell.appendChild(createElement('span', {
                        className: cls.LASTSPAN,
                    }));
                }
                if (lvlPos !== currPos) {
                    tCell.appendChild(createElement('span', {
                        className: cls.NEXTSPAN,
                    }));
                    indent++;
                }
                lvlPos++;
            }
            if (cell.memberType === 3 && cell.level === -1 && Object.keys(this.lvlCollection).length > 1) {
                tCell.appendChild(createElement('span', {
                    className: cls.NEXTSPAN,
                }));
                indent++;
            }
            this.indentCollection[cell.rowIndex] = indent;
            this.maxIndent = this.maxIndent > indent ? this.maxIndent : indent;
        }
        tCell.setAttribute('fieldname', cell.hierarchy);
        return tCell;
    };
    /* tslint:enable */
    Render.prototype.columnCellBoundEvent = function (args) {
        if (args.cell.column && args.cell.column.customAttributes) {
            var cell = args.cell.column.customAttributes.cell;
            var tCell = args.node;
            if (cell) {
                var customClass = this.parent.hyperlinkSettings.cssClass;
                var level = cell.level ? cell.level : 0;
                if ((cell.level === -1 && !cell.rowSpan) || cell.rowSpan === -1) {
                    args.node.style.display = 'none';
                }
                else if (cell.rowSpan > 1) {
                    args.node.setAttribute('rowspan', cell.rowSpan.toString());
                    args.node.setAttribute('aria-rowspan', cell.rowSpan.toString());
                    if ((cell.rowIndex + cell.rowSpan) === this.engine.headerContent.length) {
                        args.node.style.borderBottomWidth = '0px';
                    }
                }
                args.node.setAttribute('aria-colindex', cell.colIndex.toString());
                args.node.setAttribute('index', cell.rowIndex.toString());
                var fieldName = void 0;
                if (this.parent.dataType === 'pivot') {
                    if (!(this.parent.dataSourceSettings.values && this.parent.dataSourceSettings.valueAxis === 'column' &&
                        this.parent.dataSourceSettings.values.length > 1 &&
                        (cell.rowIndex === this.engine.headerContent.length - 1)) && this.parent.dataSourceSettings.columns &&
                        this.parent.dataSourceSettings.columns.length > 0) {
                        fieldName = level > -1 && this.parent.dataSourceSettings.columns[level] ?
                            this.parent.dataSourceSettings.columns[level].name : '';
                        tCell.setAttribute('fieldname', fieldName);
                    }
                }
                else {
                    tCell = this.onOlapColumnCellBoundEvent(tCell, cell);
                }
                if (cell.type) {
                    tCell.classList.add(cell.type === 'grand sum' ? 'e-gtot' : 'e-stot');
                    var localizedText = cell.type === 'grand sum' ? this.parent.localeObj.getConstant('grandTotal') :
                        cell.formattedText.split('Total')[0] + this.parent.localeObj.getConstant('total');
                    if (tCell.querySelector('.e-headertext') !== null) {
                        tCell.querySelector('.e-headertext').innerText = localizedText;
                    }
                    else {
                        tCell.querySelector('.e-stackedheadercelldiv').innerText = localizedText;
                    }
                }
                tCell.classList.add(cls.COLUMNSHEADER);
                if (this.parent.isColumnCellHyperlink || cell.enableHyperlink) {
                    if (tCell.querySelector('.e-stackedheadercelldiv')) {
                        var innerText = tCell.querySelector('.e-stackedheadercelldiv').innerText;
                        tCell.querySelector('.e-stackedheadercelldiv').innerHTML =
                            '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>';
                    }
                    else if (tCell.querySelector('.e-headertext')) {
                        var innerText = tCell.querySelector('.e-headertext').innerText;
                        tCell.querySelector('.e-headertext').innerHTML =
                            '<a data-url="' + innerText + '" class="e-hyperlinkcell ' + customClass + '">' + innerText + '</a>';
                    }
                }
                if (cell.hasChild === true && !cell.isNamedSet) {
                    var hdrdiv = tCell.querySelector('.e-headercelldiv');
                    if (hdrdiv) {
                        hdrdiv.style.height = 'auto';
                        hdrdiv.style.lineHeight = 'normal';
                    }
                    var div = createElement('div', {
                        className: (cell.isDrilled === true ? cls.COLLAPSE : cls.EXPAND) + ' ' + cls.ICON,
                        attrs: {
                            'title': cell.isDrilled === true ? this.parent.localeObj.getConstant('collapse') :
                                this.parent.localeObj.getConstant('expand')
                        }
                    });
                    tCell.children[0].classList.add(cls.CELLVALUE);
                    if (window.navigator.userAgent.indexOf('Edge') > -1 || window.navigator.userAgent.indexOf('Trident') > -1) {
                        tCell.children[0].style.display = 'table';
                    }
                    else {
                        tCell.children[0].style.display = 'block';
                    }
                    tCell.insertBefore(div, tCell.children[0]);
                }
                tCell = this.appendValueSortIcon(cell, tCell, cell.rowIndex, cell.colIndex);
                if (this.parent.cellTemplate) {
                    var index = tCell.getAttribute('index');
                    var colindex = tCell.getAttribute('aria-colindex');
                    var templateID = index + '_' + colindex;
                    /* tslint:disable-next-line */
                    if (!(window && isBlazor())) {
                        this.parent.gridHeaderCellInfo.push({ targetCell: tCell });
                    }
                    else if (index && colindex) {
                        this.parent.gridCellCollection[templateID] = tCell;
                    }
                }
                var field = void 0;
                var len = this.parent.dataSourceSettings.values.length;
                for (var vCnt = 0; vCnt < len; vCnt++) {
                    if (this.parent.dataSourceSettings.values[vCnt].name === cell.actualText) {
                        tCell.classList.add(cls.VALUESHEADER);
                    }
                }
                this.unWireEvents(tCell);
                this.wireEvents(tCell);
            }
        }
        this.parent.trigger(events.headerCellInfo, args);
    };
    Render.prototype.onOlapColumnCellBoundEvent = function (tCell, cell) {
        tCell.setAttribute('fieldname', cell.memberType === 3 ? cell.actualText.toString() : cell.hierarchy);
        var prevCell = this.engine.headerContent[cell.rowIndex] ?
            this.engine.headerContent[cell.rowIndex][cell.colIndex - 1] : undefined;
        if (prevCell && prevCell.actualText === cell.actualText && prevCell.type === cell.type &&
            (cell.memberType === 3 ? true : prevCell.colSpan > 1)) {
            tCell.style.display = 'none';
        }
        else {
            tCell.setAttribute('colspan', cell.colSpan.toString());
            tCell.setAttribute('aria-colspan', cell.colSpan.toString());
        }
        if (cell.rowIndex === (this.engine.headerContent.length - 1) && cell.memberType === 2) {
            tCell.style.display = this.isSpannedCell(this.engine.headerContent.length, cell) ? 'none' : tCell.style.display;
        }
        return tCell;
    };
    Render.prototype.isSpannedCell = function (colLength, currCell) {
        var prevCell = this.engine.headerContent[currCell.rowIndex - 1] ?
            this.engine.headerContent[currCell.rowIndex - 1][currCell.colIndex] : undefined;
        var parentCellSpan;
        var parentCellPos;
        while (prevCell && ((prevCell.memberType === currCell.memberType) || (prevCell.type && currCell.type))) {
            if (prevCell.rowSpan > 0) {
                parentCellSpan = prevCell.rowSpan;
                parentCellPos = prevCell.rowIndex;
            }
            prevCell = this.engine.headerContent[prevCell.rowIndex - 1] ?
                this.engine.headerContent[prevCell.rowIndex - 1][currCell.colIndex] : undefined;
        }
        return (parentCellPos + parentCellSpan) >= colLength;
    };
    Render.prototype.onHyperCellClick = function (e) {
        var cell = e.target.parentElement.parentElement;
        cell = (cell.className.indexOf('e-headercelldiv') > -1 ? cell.parentElement : cell);
        var args = {
            currentCell: cell,
            data: this.engine.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('aria-colindex'))],
            cancel: true
        };
        this.parent.trigger(events.hyperlinkCellClick, args, function (observedArgs) {
            if (!observedArgs.cancel) {
                args.currentCell = getElement(args.currentCell);
                var url = args.currentCell.getAttribute('data-url') ? (args.currentCell).getAttribute('data-url') :
                    args.currentCell.querySelector('a').getAttribute('data-url');
                window.open(url);
            }
        });
    };
    Render.prototype.getRowStartPos = function () {
        var pivotValues = this.parent.pivotValues;
        var rowPos;
        for (var rCnt = 0; rCnt < pivotValues.length; rCnt++) {
            if (pivotValues[rCnt] && pivotValues[rCnt][0] && pivotValues[rCnt][0].axis === 'row') {
                rowPos = rCnt;
                break;
            }
        }
        return rowPos;
    };
    Render.prototype.frameDataSource = function (type) {
        var dataContent = [];
        if (this.parent.dataSourceSettings.values.length > 0 && !this.engine.isEmptyData) {
            if ((this.parent.enableValueSorting) || !this.engine.isEngineUpdated) {
                var rowCnt = 0;
                var pivotValues = this.parent.pivotValues;
                var start = type === 'value' ? this.rowStartPos : 0;
                var end = type === 'value' ? pivotValues.length : this.rowStartPos;
                for (var rCnt = start; rCnt < end; rCnt++) {
                    if (pivotValues[rCnt]) {
                        rowCnt = type === 'header' ? rCnt : rowCnt;
                        dataContent[rowCnt] = {};
                        for (var cCnt = 0; cCnt < pivotValues[rCnt].length; cCnt++) {
                            if (pivotValues[rCnt][cCnt]) {
                                dataContent[rowCnt][cCnt] = pivotValues[rCnt][cCnt];
                            }
                        }
                        rowCnt++;
                    }
                }
            }
            else {
                dataContent = type === 'value' ? this.engine.valueContent : this.engine.headerContent;
            }
        }
        else {
            dataContent = this.frameEmptyData();
        }
        return dataContent;
    };
    /* tslint:disable-next-line */
    Render.prototype.frameEmptyData = function () {
        /* tslint:disable-next-line */
        var dataContent = [{
                0: { formattedText: this.parent.localeObj.getConstant('grandTotal') },
                1: { formattedText: this.parent.localeObj.getConstant('emptyData') }
            }];
        return dataContent;
    };
    Render.prototype.calculateColWidth = function (colCount) {
        var parWidth = isNaN(this.parent.width) ? (this.parent.width.toString().indexOf('%') > -1 ?
            ((parseFloat(this.parent.width.toString()) / 100) * this.parent.element.offsetWidth) : this.parent.element.offsetWidth) :
            Number(this.parent.width);
        parWidth = parWidth - (this.gridSettings.columnWidth > this.resColWidth ? this.gridSettings.columnWidth : this.resColWidth) - 2;
        colCount = colCount - 1;
        var colWidth = (colCount * this.gridSettings.columnWidth) < parWidth ? (parWidth / colCount) : this.gridSettings.columnWidth;
        return Math.floor(colWidth);
    };
    Render.prototype.resizeColWidth = function (colCount) {
        var parWidth = isNaN(this.parent.width) ? (this.parent.width.toString().indexOf('%') > -1 ?
            ((parseFloat(this.parent.width.toString()) / 100) * this.parent.element.offsetWidth) : this.parent.element.offsetWidth) :
            Number(this.parent.width);
        colCount = colCount - 1;
        parWidth = parWidth - (this.gridSettings.columnWidth > this.resColWidth ? this.gridSettings.columnWidth : this.resColWidth) - 2;
        var colWidth = (colCount * this.gridSettings.columnWidth) < parWidth ? (parWidth / colCount) : this.gridSettings.columnWidth;
        return Math.floor(colWidth);
    };
    Render.prototype.calculateGridWidth = function () {
        var parWidth = this.parent.width;
        var eleWidth = this.parent.element.getBoundingClientRect().width ?
            this.parent.element.getBoundingClientRect().width : this.parent.element.offsetWidth;
        if (this.gridSettings.width === 'auto') {
            if (this.parent.width === 'auto') {
                parWidth = eleWidth;
            }
            else if (this.parent.width.toString().indexOf('%') > -1) {
                parWidth = ((parseFloat(this.parent.width.toString()) / 100) * eleWidth);
            }
        }
        else {
            parWidth = this.gridSettings.width;
        }
        return parWidth;
    };
    Render.prototype.calculateGridHeight = function (elementCreated) {
        var gridHeight = this.parent.height;
        var parHeight = this.parent.getHeightAsNumber();
        if (isNaN(parHeight)) {
            parHeight = this.parent.element.offsetHeight > 0 ? this.parent.element.offsetHeight : 1;
        }
        if (this.parent.currentView !== 'Chart') {
            if (this.gridSettings.height === 'auto' && parHeight && this.parent.element.querySelector('.' + cls.GRID_HEADER)) {
                var rowColHeight = this.parent.element.querySelector('.' + cls.GRID_HEADER).offsetHeight;
                var gBarHeight = rowColHeight + (this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS) ?
                    this.parent.element.querySelector('.' + cls.GROUPING_BAR_CLASS).offsetHeight : 0);
                var toolBarHeight = this.parent.element.querySelector('.' + cls.GRID_TOOLBAR) ? 42 : 0;
                gridHeight = parHeight - (gBarHeight + toolBarHeight) - 1;
                if (elementCreated) {
                    var tableHeight = this.parent.element.querySelector('.' + cls.FROZENCONTENT_DIV + ' .' + cls.TABLE).offsetHeight;
                    var contentHeight = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).offsetHeight;
                    var tableWidth = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV + ' .' + cls.TABLE).offsetWidth;
                    var contentWidth = this.parent.element.querySelector('.' + cls.MOVABLECONTENT_DIV).offsetWidth;
                    var horizontalOverflow = contentWidth < tableWidth;
                    var verticalOverflow = contentHeight < tableHeight;
                    var commonOverflow = horizontalOverflow && ((gridHeight - tableHeight) < 18) ? true : false;
                    if (gridHeight >= tableHeight && (horizontalOverflow ? gridHeight >= contentHeight : true) &&
                        !verticalOverflow && !commonOverflow) {
                        this.parent.grid.height = 'auto';
                    }
                    else {
                        this.parent.grid.height = gridHeight;
                    }
                }
                else {
                    if (gridHeight > (this.engine.valueContent.length * this.gridSettings.rowHeight)) {
                        gridHeight = 'auto';
                    }
                }
            }
            else {
                gridHeight = this.gridSettings.height;
            }
        }
        return gridHeight < this.parent.gridSettings.rowHeight ? this.parent.gridSettings.rowHeight : gridHeight;
    };
    Render.prototype.frameStackedHeaders = function () {
        var integrateModel = [];
        if ((this.parent.dataType === 'olap' ? true : this.parent.dataSourceSettings.values.length > 0) && !this.engine.isEmptyData) {
            var headerCnt = this.engine.headerContent.length;
            var headerSplit = [];
            var splitPos = [];
            var colWidth = this.calculateColWidth(this.engine.pivotValues[0].length);
            do {
                var columnModel = [];
                var actualCnt = 0;
                headerCnt--;
                var colField = this.engine.headerContent[headerCnt];
                if (colField) {
                    for (var cCnt = 0; cCnt < Object.keys(colField).length + (colField[0] ? 0 : 1); cCnt++) {
                        var colSpan = (colField[cCnt] && colField[cCnt].colSpan) ?
                            ((colField[cCnt].memberType !== 3 || headerCnt === 0) ?
                                colField[cCnt].colSpan : headerSplit[cCnt]) : 1;
                        colSpan = this.parent.dataType === 'olap' ? 1 : colSpan;
                        var rowSpan = (colField[cCnt] && colField[cCnt].rowSpan) ? colField[cCnt].rowSpan : 1;
                        var formattedText = colField[cCnt] ? (colField[cCnt].type === 'grand sum' ?
                            this.parent.localeObj.getConstant('grandTotal') : (colField[cCnt].type === 'sum' ?
                            colField[cCnt].formattedText.split('Total')[0] + this.parent.localeObj.getConstant('total') :
                            colField[cCnt].formattedText)) : '';
                        if (headerCnt === this.engine.headerContent.length - 1) {
                            colSpan = 1;
                            columnModel[actualCnt] = {
                                field: (cCnt + '.formattedText'),
                                headerText: formattedText,
                                customAttributes: { 'cell': colField[cCnt] },
                                /* tslint:disable-next-line */
                                width: colField[cCnt] ? this.setSavedWidth(colField[cCnt].valueSort.levelName, colWidth) : this.resColWidth,
                                minWidth: 30,
                                format: cCnt === 0 ? '' : this.formatList[colField[cCnt].actualText],
                                allowReordering: (this.parent.showGroupingBar ? false : this.parent.gridSettings.allowReordering),
                                allowResizing: this.parent.gridSettings.allowResizing,
                                visible: true
                            };
                        }
                        else if (headerSplit[cCnt]) {
                            colSpan = (colField[cCnt] && colField[cCnt].type === 'grand sum' &&
                                colField[cCnt].memberType === 2) ? 1 : colSpan;
                            var tmpSpan = colSpan;
                            var innerModel = [];
                            var innerPos = cCnt;
                            while (tmpSpan > 0) {
                                if (columnModel[actualCnt]) {
                                    if (!integrateModel[splitPos[innerPos]]) {
                                        break;
                                    }
                                    innerModel.push(integrateModel[splitPos[innerPos]]);
                                }
                                else {
                                    columnModel[actualCnt] = {
                                        headerText: formattedText,
                                        /* tslint:disable-next-line */
                                        field: colField[cCnt] ? colField[cCnt].valueSort.levelName : '',
                                        customAttributes: { 'cell': colField[cCnt] },
                                        /* tslint:disable-next-line */
                                        width: colField[cCnt] ? this.setSavedWidth(colField[cCnt].valueSort.levelName, colWidth) :
                                            this.resColWidth,
                                        minWidth: 30,
                                        allowReordering: (this.parent.showGroupingBar ? false : this.parent.gridSettings.allowReordering),
                                        allowResizing: this.parent.gridSettings.allowResizing,
                                        visible: true
                                    };
                                    innerModel = [integrateModel[splitPos[innerPos]]];
                                }
                                tmpSpan = tmpSpan - headerSplit[innerPos];
                                innerPos = innerPos + headerSplit[innerPos];
                            }
                            columnModel[actualCnt].columns = innerModel;
                        }
                        if (columnModel[actualCnt]) {
                            columnModel[actualCnt].clipMode = this.gridSettings.clipMode;
                        }
                        headerSplit[cCnt] = colSpan;
                        splitPos[cCnt] = actualCnt;
                        actualCnt++;
                        cCnt = cCnt + colSpan - 1;
                    }
                }
                integrateModel = columnModel.length > 0 ? columnModel : integrateModel;
            } while (headerCnt > 0);
            integrateModel[0] = {
                field: (0 + '.formattedText'),
                width: this.resColWidth,
                minWidth: 30,
                headerText: '',
                allowReordering: false,
                allowResizing: this.parent.gridSettings.allowResizing,
                visible: true
            };
        }
        else {
            integrateModel = this.frameEmptyColumns();
        }
        if (integrateModel.length > 1) {
            integrateModel[integrateModel.length - 1].minWidth = integrateModel[integrateModel.length - 1].width;
            integrateModel[integrateModel.length - 1].width = 'auto';
        }
        this.parent.triggerColumnRenderEvent(integrateModel);
        return integrateModel;
    };
    Render.prototype.setSavedWidth = function (column, width) {
        width = this.parent.resizeInfo[column] ? this.parent.resizeInfo[column] : width;
        return width;
    };
    Render.prototype.frameEmptyColumns = function () {
        var columns = [];
        var colWidth = this.calculateColWidth(2);
        columns.push({ field: '0.formattedText', headerText: '', minWidth: 30, width: this.resColWidth });
        /* tslint:disable-next-line */
        columns.push({ field: '1.formattedText', headerText: this.parent.localeObj.getConstant('grandTotal'), minWidth: 30, width: colWidth });
        return columns;
    };
    Render.prototype.getFormatList = function () {
        var formatArray = {};
        for (var vCnt = 0; vCnt < this.parent.dataSourceSettings.values.length; vCnt++) {
            var field = this.parent.dataSourceSettings.values[vCnt];
            var format = 'N';
            if (this.parent.dataType === 'olap') {
                if (this.parent.olapEngineModule.fieldList[field.name]) {
                    var fString = this.parent.olapEngineModule.fieldList[field.name].formatString;
                    format = fString.indexOf('#') > -1 ? fString : (fString[0] + '2');
                }
            }
            else {
                if (this.parent.dataSourceSettings.formatSettings.length > 0) {
                    for (var fCnt = 0; fCnt < this.parent.dataSourceSettings.formatSettings.length; fCnt++) {
                        var formatSettings = this.parent.dataSourceSettings.formatSettings[fCnt];
                        if (field.name === formatSettings.name) {
                            format = formatSettings.format;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
            formatArray[field.name] = format;
        }
        return formatArray;
    };
    Render.prototype.excelColumnEvent = function (args) {
        args = this.exportHeaderEvent(args);
        this.parent.trigger(events.excelHeaderQueryCellInfo, args);
    };
    Render.prototype.pdfColumnEvent = function (args) {
        args = this.exportHeaderEvent(args);
        this.parent.trigger(events.pdfHeaderQueryCellInfo, args);
    };
    Render.prototype.excelRowEvent = function (args) {
        if (args.column.field === '0.formattedText') {
            var isValueCell = args.data[0].type === 'value';
            var level = 0;
            if (this.parent.dataType === 'olap') {
                /* tslint:disable-next-line */
                level = this.indentCollection[args.data[0].rowIndex];
            }
            else {
                level = isValueCell ? (this.lastSpan + 1) : args.data[0].level;
            }
            this.colPos = 0;
            args.style = { hAlign: 'Left', indent: level * 2 };
            this.lastSpan = isValueCell ? this.lastSpan : level;
        }
        else {
            this.colPos++;
            /* tslint:disable-next-line */
            if (isNullOrUndefined(args.data[this.colPos].value) || isNullOrUndefined(args.data[this.colPos].formattedText)) {
                args.value = '';
            }
            else {
                /* tslint:disable-next-line */
                args.value = args.data[this.colPos].value || args.data[this.colPos].formattedText;
            }
        }
        args = this.exportContentEvent(args);
        this.parent.trigger(events.excelQueryCellInfo, args);
    };
    /* tslint:disable:no-any */
    Render.prototype.pdfRowEvent = function (args) {
        args = this.exportContentEvent(args);
        if (args.column.field === '0.formattedText') {
            var level = 0;
            var isValueCell = args.data[0].type === 'value';
            if (this.parent.dataType === 'olap') {
                level = this.indentCollection[args.data[0].rowIndex];
            }
            else {
                level = isValueCell ? (this.lastSpan + 1) : args.data[0].level !== -1 ?
                    args.data[0].level : 0;
            }
            args.style = { paragraphIndent: level * 10 };
            this.lastSpan = isValueCell ? this.lastSpan : level;
        }
        this.parent.trigger(events.pdfQueryCellInfo, args);
    };
    Render.prototype.exportHeaderEvent = function (args) {
        var rowSpan = 1;
        if (args.gridCell.column.customAttributes) {
            var cell = args.gridCell.column.customAttributes.cell;
            if (this.actualText !== cell.actualText && cell.colSpan > 1 && cell.level > -1) {
                args.gridCell.colSpan = args.cell.colSpan = cell.colSpan > -1 ? cell.colSpan : 1;
            }
            rowSpan = cell.rowSpan > -1 ? cell.rowSpan : 1;
            this.actualText = cell.actualText;
        }
        else {
            rowSpan = Object.keys(this.engine.headerContent).length;
        }
        if (args.cell.rowSpan !== rowSpan && rowSpan > -1) {
            args.cell.rowSpan = rowSpan;
        }
        return args;
    };
    Render.prototype.exportContentEvent = function (args) {
        args.value = args.data[Number(args.column.field.split('.formattedText')[0])].type === 'grand sum' ?
            this.parent.localeObj.getConstant('grandTotal') : args.value;
        return args;
    };
    Render.prototype.unWireEvents = function (cell) {
        if (cell.querySelector('.e-hyperlinkcell')) {
            /* tslint:disable-next-line */
            EventHandler.remove(cell.querySelector('.e-hyperlinkcell'), this.parent.isAdaptive ? 'touchend' : 'click', this.onHyperCellClick);
        }
        else {
            return;
        }
    };
    Render.prototype.wireEvents = function (cell) {
        if (cell.querySelector('.e-hyperlinkcell')) {
            /* tslint:disable-next-line */
            EventHandler.add(cell.querySelector('.e-hyperlinkcell'), this.parent.isAdaptive ? 'touchend' : 'click', this.onHyperCellClick, this);
        }
        else {
            return;
        }
    };
    return Render;
}());
export { Render };