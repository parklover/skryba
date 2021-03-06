import { Ribbon as RibbonComponent } from '../../ribbon/index';
import { ribbon, selectionComplete, beforeRibbonCreate, dialog } from '../common/index';
import { destroyComponent, beginCompleteEvents } from '../common/index';
import { enableRibbonItems, ribbonClick, paste, locale, refreshSheetTabs, initiateCustomSort } from '../common/index';
import { tabSwitch, getUpdateUsingRaf, enableToolbar } from '../common/index';
import { Toolbar, Menu } from '@syncfusion/ej2-navigations';
import { extend, isNullOrUndefined, getComponent, closest, detach } from '@syncfusion/ej2-base';
import { getCellIndexes, getFormatFromType, getTypeFromFormat } from '../../workbook/index';
import { DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { calculatePosition } from '@syncfusion/ej2-popups';
import { applyNumberFormatting, getFormattedCellObject } from '../../workbook/common/index';
import { activeCellChanged, textDecorationUpdate } from '../../workbook/common/index';
import { sheetsDestroyed } from '../../workbook/common/index';
import { getCell, setCellFormat } from '../../workbook/index';
import { Button } from '@syncfusion/ej2-buttons';
import { ColorPicker } from './color-picker';
/**
 * Represents Ribbon for Spreadsheet.
 */
var Ribbon = /** @class */ (function () {
    function Ribbon(parent) {
        this.fontNameIndex = 5;
        this.numPopupWidth = 0;
        this.activeTab = 1;
        this.parent = parent;
        this.addEventListener();
        new ColorPicker(parent);
    }
    Ribbon.prototype.getModuleName = function () {
        return 'ribbon';
    };
    Ribbon.prototype.initRibbon = function (args) {
        if (!this.parent.showRibbon && this.ribbon) {
            this.destroy();
            return;
        }
        this.parent.notify(beforeRibbonCreate, {});
        if (this.parent.isMobileView()) {
            this.createMobileView();
        }
        else {
            this.createRibbon(args);
        }
    };
    Ribbon.prototype.getRibbonItems = function () {
        var id = this.parent.element.id;
        var l10n = this.parent.serviceLocator.getService(locale);
        var items = [
            {
                type: 'Menu',
                menuItems: [
                    {
                        text: this.parent.isMobileView() ? '' : l10n.getConstant('File'),
                        iconCss: this.parent.isMobileView() ? 'e-icons e-file-menu-icon' : null,
                        items: [
                            { text: l10n.getConstant('New'), id: 'New', iconCss: 'e-new e-icons' },
                            { text: l10n.getConstant('Open'), id: 'Open', iconCss: 'e-open e-icons' },
                            {
                                text: l10n.getConstant('SaveAs'),
                                iconCss: 'e-save e-icons',
                                items: [
                                    { text: l10n.getConstant('ExcelXlsx'), id: 'Xlsx', iconCss: 'e-xlsx e-icons' },
                                    { text: l10n.getConstant('ExcelXls'), id: 'Xls', iconCss: 'e-xls e-icons' },
                                    { text: l10n.getConstant('CSV'), id: 'Csv', iconCss: 'e-csv e-icons' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                header: { text: l10n.getConstant('Home') },
                content: [
                    { prefixIcon: 'e-cut-icon', tooltipText: l10n.getConstant('Cut') + " (Ctrl+X)", id: id + '_cut' },
                    { prefixIcon: 'e-copy-icon', tooltipText: l10n.getConstant('Copy') + " (Ctrl+C)", id: id + '_copy' },
                    { tooltipText: l10n.getConstant('Paste') + " (Ctrl+V)", template: this.getPasteBtn(id) },
                    { type: 'Separator' },
                    { template: this.getNumFormatDDB(id), tooltipText: l10n.getConstant('NumberFormat') }, { type: 'Separator' },
                    { template: this.getFontNameDDB(id), tooltipText: l10n.getConstant('Font') }, { type: 'Separator' },
                    { template: this.getFontSizeDDB(id), tooltipText: l10n.getConstant('FontSize') }, { type: 'Separator' },
                    { template: this.getBtn(id, 'bold'), tooltipText: l10n.getConstant('Bold') + " (Ctrl+B)" },
                    { template: this.getBtn(id, 'italic'), tooltipText: l10n.getConstant('Italic') + " (Ctrl+I)" },
                    { template: this.getBtn(id, 'line-through'), tooltipText: l10n.getConstant('Strikethrough') + " (Ctrl+5)" },
                    { template: this.getBtn(id, 'underline'), tooltipText: l10n.getConstant('Underline') + " (Ctrl+U)" },
                    { template: document.getElementById(id + "_font_color_picker"), tooltipText: l10n.getConstant('TextColor') },
                    { type: 'Separator' },
                    { template: document.getElementById(id + "_fill_color_picker"), tooltipText: l10n.getConstant('FillColor') },
                    { type: 'Separator' }, { template: this.getTextAlignDDB(id), tooltipText: l10n.getConstant('HorizontalAlignment') },
                    { template: this.getVerticalAlignDDB(id), tooltipText: l10n.getConstant('VerticalAlignment') }
                ]
            },
            {
                header: { text: l10n.getConstant('Formulas') },
                content: [{ prefixIcon: 'e-insert-function', text: l10n.getConstant('InsertFunction'), id: id + '_insert_function' }]
            },
            {
                header: { text: 'View' },
                content: [
                    { prefixIcon: 'e-hide-headers', text: this.getLocaleText(l10n, 'Headers'), id: id + '_headers' }, { type: 'Separator' },
                    { prefixIcon: 'e-hide-gridlines', text: this.getLocaleText(l10n, 'GridLines'), id: id + '_gridlines' }
                ]
            }
        ];
        if (this.parent.allowSorting) {
            items.find(function (x) { return x.header && x.header.text === l10n.getConstant('Home'); }).content.push({ type: 'Separator' }, {
                template: this.getSortingDDB(id), tooltipText: l10n.getConstant('Sort')
            });
        }
        return items;
    };
    Ribbon.prototype.getPasteBtn = function (id) {
        var _this = this;
        var btn = this.parent.element.appendChild(this.parent.createElement('button', { id: id + '_paste' }));
        var l10n = this.parent.serviceLocator.getService(locale);
        var pasteSplitBtn = new SplitButton({
            iconCss: 'e-icons e-paste-icon',
            items: [
                { text: l10n.getConstant('All'), id: 'All' },
                { text: l10n.getConstant('Values'), id: 'Values' },
                { text: l10n.getConstant('Formats'), id: 'Formats' }
            ],
            select: function (args) {
                _this.parent.notify(paste, { type: args.item.id });
            },
            click: function () {
                _this.parent.notify(paste, null);
            },
            close: function () { _this.parent.element.focus(); }
        });
        pasteSplitBtn.createElement = this.parent.createElement;
        pasteSplitBtn.appendTo(btn);
        return btn.parentElement;
    };
    Ribbon.prototype.getLocaleText = function (l10n, str, setClass) {
        var text;
        var sheet = this.parent.getActiveSheet();
        if (sheet['show' + str]) {
            if (setClass) {
                this.parent.getMainContent().classList.remove('e-hide-' + str.toLowerCase());
            }
            text = l10n.getConstant('Hide' + str);
        }
        else {
            if (setClass) {
                this.parent.getMainContent().classList.add('e-hide-' + str.toLowerCase());
            }
            text = l10n.getConstant('Show' + str);
        }
        return text;
    };
    Ribbon.prototype.createRibbon = function (args) {
        var ribbonElement = this.parent.createElement('div');
        this.ribbon = new RibbonComponent({
            items: this.getRibbonItems(),
            fileItemSelect: this.fileItemSelect.bind(this),
            beforeOpen: this.fileMenuBeforeOpen.bind(this),
            beforeClose: this.fileMenuBeforeClose.bind(this),
            clicked: this.toolbarClicked.bind(this),
            created: this.ribbonCreated.bind(this),
            selecting: this.tabSelecting.bind(this),
            expandCollapse: this.expandCollapseHandler.bind(this),
            beforeFileItemRender: this.beforeRenderHandler.bind(this)
        });
        this.ribbon.createElement = this.parent.createElement;
        if (args && args.uiUpdate) {
            var refEle = this.parent.element.querySelector('.e-formula-bar-panel') ||
                document.getElementById(this.parent.element.id + '_sheet_panel');
            this.parent.element.insertBefore(ribbonElement, refEle);
        }
        else {
            this.parent.element.appendChild(ribbonElement);
        }
        this.ribbon.appendTo(ribbonElement);
    };
    Ribbon.prototype.tabSelecting = function (args) {
        if (args.selectingIndex && args.selectingIndex !== this.activeTab) {
            this.activeTab = args.selectingIndex;
            this.refreshRibbonContent();
            this.parent.notify(tabSwitch, { idx: args.selectingIndex });
        }
    };
    Ribbon.prototype.beforeRenderHandler = function (args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (args.item.text === l10n.getConstant('Open') && (!this.parent.openUrl || !this.parent.allowOpen)) {
            args.element.classList.add('e-disabled');
        }
        if (args.item.text === l10n.getConstant('SaveAs') && (!this.parent.saveUrl || !this.parent.allowSave)) {
            args.element.classList.add('e-disabled');
        }
    };
    Ribbon.prototype.getNumFormatDDB = function (id) {
        var _this = this;
        var numFormatBtn = this.parent.createElement('button', { id: id + '_number_format' });
        numFormatBtn.appendChild(this.parent.createElement('span', { className: 'e-tbar-btn-text', innerHTML: 'General' }));
        this.numFormatDDB = new DropDownButton({
            items: this.getNumFormatDdbItems(id),
            content: '',
            select: function (args) { return _this.numDDBSelect(args); },
            open: function (args) { return _this.numDDBOpen(args); },
            beforeItemRender: function (args) { return _this.previewNumFormat(args); },
            close: function () { return _this.parent.element.focus(); },
            cssClass: 'e-flat e-numformat-ddb',
            beforeOpen: this.tBarDdbBeforeOpen.bind(this)
        });
        this.numFormatDDB.createElement = this.parent.createElement;
        this.numFormatDDB.appendTo(numFormatBtn);
        return numFormatBtn;
    };
    Ribbon.prototype.getFontSizeDDB = function (id) {
        var _this = this;
        this.fontSizeDdb = new DropDownButton({
            cssClass: 'e-font-size-ddb',
            content: '11',
            items: [{ text: '8' }, { text: '9' }, { text: '10' }, { text: '11' }, { text: '12' }, { text: '14' }, { text: '16' },
                { text: '18' }, { text: '20' }, { text: '22' }, { text: '24' }, { text: '26' }, { text: '28' }, { text: '36' },
                { text: '48' }, { text: '72' }],
            beforeOpen: function (args) {
                _this.tBarDdbBeforeOpen(args);
                _this.refreshSelected(_this.fontSizeDdb, args.element, 'content', 'text');
            },
            select: function (args) {
                var eventArgs = { style: { fontSize: args.item.text + "pt" }, onActionUpdate: true };
                _this.parent.notify(setCellFormat, eventArgs);
                if (!eventArgs.cancel) {
                    _this.fontSizeDdb.content = eventArgs.style.fontSize.split('pt')[0];
                    _this.fontSizeDdb.dataBind();
                }
            },
            close: function () { return _this.parent.element.focus(); }
        });
        this.fontSizeDdb.createElement = this.parent.createElement;
        this.fontSizeDdb.appendTo(this.parent.createElement('button', { id: id + '_font_size' }));
        return this.fontSizeDdb.element;
    };
    Ribbon.prototype.getFontNameDDB = function (id) {
        var _this = this;
        var fontNameBtn = this.parent.createElement('button', { id: id + '_font_name' });
        fontNameBtn.appendChild(this.parent.createElement('span', { className: 'e-tbar-btn-text', innerHTML: 'Calibri' }));
        this.fontNameDdb = new DropDownButton({
            cssClass: 'e-font-family',
            items: this.getFontFamilyItems(),
            select: function (args) {
                var eventArgs = { style: { fontFamily: args.item.text }, onActionUpdate: true };
                _this.parent.notify(setCellFormat, eventArgs);
                if (!eventArgs.cancel) {
                    _this.refreshFontNameSelection(eventArgs.style.fontFamily);
                }
            },
            close: function () { return _this.parent.element.focus(); },
            beforeOpen: this.tBarDdbBeforeOpen.bind(this)
        });
        this.fontNameDdb.createElement = this.parent.createElement;
        this.fontNameDdb.appendTo(fontNameBtn);
        return fontNameBtn;
    };
    Ribbon.prototype.getBtn = function (id, name) {
        var btnObj = new Button({ iconCss: "e-icons e-" + name + "-icon", isToggle: true });
        btnObj.createElement = this.parent.createElement;
        btnObj.appendTo(this.parent.createElement('button', { id: id + "_" + name }));
        btnObj.element.addEventListener('click', this.toggleBtnClicked.bind(this));
        return btnObj.element;
    };
    Ribbon.prototype.getTextAlignDDB = function (id) {
        var _this = this;
        this.textAlignDdb = new DropDownButton({
            cssClass: 'e-align-ddb',
            iconCss: 'e-icons e-left-icon',
            items: [{ iconCss: 'e-icons e-left-icon' }, { iconCss: 'e-icons e-center-icon' }, { iconCss: 'e-icons e-right-icon' }],
            beforeItemRender: this.alignItemRender.bind(this),
            beforeOpen: function (args) {
                _this.refreshSelected(_this.textAlignDdb, args.element, 'iconCss');
            },
            select: function (args) {
                var eventArgs = {
                    style: { textAlign: args.item.iconCss.split(' e-')[1].split('-icon')[0] }, onActionUpdate: true
                };
                _this.parent.notify(setCellFormat, eventArgs);
                if (!eventArgs.cancel) {
                    _this.textAlignDdb.iconCss = "e-icons e-" + eventArgs.style.textAlign + "-icon";
                    _this.textAlignDdb.dataBind();
                }
            },
            close: function () { return _this.parent.element.focus(); }
        });
        this.textAlignDdb.createElement = this.parent.createElement;
        this.textAlignDdb.appendTo(this.parent.createElement('button', { id: id + '_text_align' }));
        return this.textAlignDdb.element;
    };
    Ribbon.prototype.getVerticalAlignDDB = function (id) {
        var _this = this;
        this.verticalAlignDdb = new DropDownButton({
            cssClass: 'e-align-ddb',
            iconCss: 'e-icons e-bottom-icon',
            items: [{ iconCss: 'e-icons e-top-icon' }, { iconCss: 'e-icons e-middle-icon' }, { iconCss: 'e-icons e-bottom-icon' }],
            beforeItemRender: this.alignItemRender.bind(this),
            beforeOpen: function (args) {
                _this.refreshSelected(_this.verticalAlignDdb, args.element, 'iconCss');
            },
            select: function (args) {
                var eventArgs = {
                    style: { verticalAlign: args.item.iconCss.split(' e-')[1].split('-icon')[0] }, onActionUpdate: true
                };
                _this.parent.notify(setCellFormat, eventArgs);
                if (!eventArgs.cancel) {
                    _this.verticalAlignDdb.iconCss = "e-icons e-" + eventArgs.style.verticalAlign + "-icon";
                    _this.verticalAlignDdb.dataBind();
                }
            },
            close: function () { return _this.parent.element.focus(); }
        });
        this.verticalAlignDdb.createElement = this.parent.createElement;
        this.verticalAlignDdb.appendTo(this.parent.createElement('button', { id: id + '_vertical_align' }));
        return this.verticalAlignDdb.element;
    };
    Ribbon.prototype.getSortingDDB = function (id) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        this.sortingDdb = new DropDownButton({
            cssClass: 'e-sort-ddb',
            iconCss: 'e-icons e-sort-icon',
            items: [
                { text: l10n.getConstant('SortAscending'), iconCss: 'e-icons e-sort-asc' },
                { text: l10n.getConstant('SortDescending'), iconCss: 'e-icons e-sort-desc' },
                { text: l10n.getConstant('CustomSort') + '...', iconCss: 'e-icons e-sort-custom' }
            ],
            // beforeItemRender: this.alignItemRender.bind(this),
            beforeOpen: function (args) {
                _this.refreshSelected(_this.sortingDdb, args.element, 'iconCss');
            },
            select: function (args) {
                if (args.item.text === l10n.getConstant('CustomSort') + '...') {
                    _this.parent.notify(initiateCustomSort, null);
                }
                else {
                    var direction = args.item.text === l10n.getConstant('SortAscending') ? 'Ascending' : 'Descending';
                    _this.sortingDdb.iconCss = args.item.iconCss;
                    _this.sortingDdb.dataBind();
                    _this.parent.sort({ sortDescriptors: { order: direction } });
                }
            },
            close: function () { return _this.parent.element.focus(); }
        });
        this.sortingDdb.createElement = this.parent.createElement;
        this.sortingDdb.appendTo(this.parent.createElement('button', { id: id + '_sorting' }));
        return this.sortingDdb.element;
    };
    Ribbon.prototype.ribbonCreated = function () {
        if (this.parent.enableClipboard) {
            this.enableRibbonItems({ id: this.parent.element.id + '_paste', isEnable: false });
        }
        this.ribbon.element.querySelector('.e-drop-icon').title
            = this.parent.serviceLocator.getService(locale).getConstant('CollapseToolbar');
    };
    Ribbon.prototype.alignItemRender = function (args) {
        var text = args.item.iconCss.split(' e-')[1].split('-icon')[0];
        text = text[0].toUpperCase() + text.slice(1, text.length);
        args.element.title = this.parent.serviceLocator.getService(locale).getConstant('Align' + text);
    };
    Ribbon.prototype.toggleBtnClicked = function (e) {
        var target = closest(e.target, '.e-btn');
        var parentId = this.parent.element.id;
        var id = target.id;
        var property = setCellFormat;
        var value;
        var defaultModel;
        var activeModel;
        var eventArgs;
        var key;
        switch (id) {
            case parentId + "_bold":
                defaultModel = { fontWeight: 'normal' };
                activeModel = { fontWeight: 'bold' };
                key = 'fontWeight';
                break;
            case parentId + "_italic":
                defaultModel = { fontStyle: 'normal' };
                activeModel = { fontStyle: 'italic' };
                key = 'fontStyle';
                break;
            case parentId + "_line-through":
                property = textDecorationUpdate;
                defaultModel = { textDecoration: 'line-through' };
                activeModel = defaultModel;
                key = 'textDecoration';
                break;
            case parentId + "_underline":
                property = textDecorationUpdate;
                defaultModel = { textDecoration: 'underline' };
                activeModel = defaultModel;
                key = 'textDecoration';
                break;
        }
        if (target.classList.contains('e-active')) {
            value = activeModel[key];
            eventArgs = { style: activeModel, onActionUpdate: true };
            this.parent.notify(property, eventArgs);
            if (eventArgs.cancel) {
                target.classList.remove('e-active');
            }
        }
        else {
            value = defaultModel[key];
            eventArgs = { style: defaultModel, onActionUpdate: true };
            this.parent.notify(property, eventArgs);
            if (eventArgs.cancel) {
                target.classList.add('e-active');
            }
        }
        if (!eventArgs.cancel && value !== eventArgs.style[key]) {
            this.refreshToggleBtn(getCellIndexes(this.parent.getActiveSheet().activeCell));
        }
        this.parent.element.focus();
    };
    Ribbon.prototype.getCellStyleValue = function (cssProp, indexes) {
        var cell = getCell(indexes[0], indexes[1], this.parent.getActiveSheet());
        var value = this.parent.cellStyle[cssProp];
        if (cell && cell.style && cell.style[cssProp]) {
            value = cell.style[cssProp];
        }
        return value;
    };
    Ribbon.prototype.refreshSelected = function (inst, element, key, itemKey) {
        if (itemKey === void 0) { itemKey = key; }
        for (var i = 0; i < inst.items.length; i++) {
            if (inst.items[i][itemKey] === inst[key]) {
                element.children[i].classList.add('e-selected');
                break;
            }
        }
    };
    Ribbon.prototype.expandCollapseHandler = function (args) {
        var target = this.ribbon.element.querySelector('.e-drop-icon');
        var l10n = this.parent.serviceLocator.getService(locale);
        if (args.expanded) {
            target.title = l10n.getConstant('CollapseToolbar');
        }
        else {
            target.title = l10n.getConstant('ExpandToolbar');
        }
        this.parent.setPanelSize();
    };
    Ribbon.prototype.getNumFormatDdbItems = function (id) {
        var l10n = this.parent.serviceLocator.getService(locale);
        return [
            { id: id + 'item1', text: l10n.getConstant('General') },
            { id: id + 'item2', text: l10n.getConstant('Number') },
            { id: id + 'item3', text: l10n.getConstant('Currency') },
            { id: id + 'item4', text: l10n.getConstant('Accounting') },
            { id: id + 'item5', text: l10n.getConstant('ShortDate') },
            { id: id + 'item6', text: l10n.getConstant('LongDate') },
            { id: id + 'item7', text: l10n.getConstant('Time') },
            { id: id + 'item8', text: l10n.getConstant('Percentage') },
            { id: id + 'item9', text: l10n.getConstant('Fraction') },
            { id: id + 'item10', text: l10n.getConstant('Scientific') },
            { id: id + 'item11', text: l10n.getConstant('Text') }
        ];
    };
    Ribbon.prototype.getFontFamilyItems = function () {
        return [{ text: 'Arial' }, { text: 'Arial Black' }, { text: 'Axettac Demo' }, { text: 'Batang' }, { text: 'Book Antiqua' },
            { text: 'Calibri', iconCss: 'e-icons e-selected-icon' }, { text: 'Courier' }, { text: 'Courier New' },
            { text: 'Din Condensed' }, { text: 'Georgia' }, { text: 'Helvetica' }, { text: 'Helvetica New' }, { text: 'Roboto' },
            { text: 'Tahoma' }, { text: 'Times New Roman' }, { text: 'Verdana' }];
    };
    Ribbon.prototype.enableToolbar = function (args) {
        this.ribbon.enableItems(args.enable);
    };
    Ribbon.prototype.numDDBSelect = function (args) {
        var eventArgs = {
            format: getFormatFromType(args.item.text),
            range: this.parent.getActiveSheet().selectedRange, cancel: false
        };
        var actionArgs = {
            range: eventArgs.range, format: eventArgs.format, requestType: 'NumberFormat',
            sheetIndex: this.parent.activeSheetTab
        };
        this.parent.trigger('beforeCellFormat', eventArgs);
        if (eventArgs.cancel) {
            return;
        }
        this.parent.notify(applyNumberFormatting, eventArgs);
        this.parent.notify(selectionComplete, { type: 'mousedown' });
        this.refreshNumFormatSelection(args.item.text);
        this.parent.serviceLocator.getService(beginCompleteEvents).completeAction(actionArgs, 'cellFormat');
    };
    Ribbon.prototype.tBarDdbBeforeOpen = function (args) {
        var viewportHeight = this.parent.viewport.height;
        var actualHeight = (parseInt(getComputedStyle(args.element.firstElementChild).height, 10) * args.items.length) +
            (parseInt(getComputedStyle(args.element).paddingTop, 10) * 2);
        if (actualHeight > viewportHeight) {
            args.element.style.height = viewportHeight + "px";
            args.element.style.overflowY = 'auto';
        }
    };
    Ribbon.prototype.numDDBOpen = function (args) {
        this.numPopupWidth = 0;
        var elemList = args.element.querySelectorAll('span.e-numformat-preview-text');
        for (var i = 0, len = elemList.length; i < len; i++) {
            if (this.numPopupWidth < elemList[i].offsetWidth) {
                this.numPopupWidth = elemList[i].offsetWidth;
            }
        }
        var popWidth = this.numPopupWidth + 160;
        document.querySelector('.e-numformat-ddb.e-dropdown-popup').style.width = popWidth + "px";
    };
    Ribbon.prototype.previewNumFormat = function (args) {
        var cellIndex = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var cell = getCell(cellIndex[0], cellIndex[1], this.parent.getActiveSheet());
        var eventArgs = {
            type: args.item.text,
            formattedText: '',
            value: cell && cell.value ? cell.value : '',
            format: getFormatFromType(args.item.text),
            sheetIndex: this.parent.activeSheetTab,
            onLoad: true
        };
        var numElem = this.parent.createElement('div', {
            className: 'e-numformat-text',
            styles: 'width:100%',
            innerHTML: args.element.innerHTML
        });
        args.element.innerHTML = '';
        this.parent.notify(getFormattedCellObject, eventArgs);
        var previewElem = this.parent.createElement('span', {
            className: 'e-numformat-preview-text',
            styles: 'float:right;',
            innerHTML: eventArgs.formattedText.toString()
        });
        numElem.appendChild(previewElem);
        args.element.appendChild(numElem);
    };
    Ribbon.prototype.refreshRibbonContent = function () {
        switch (this.activeTab) {
            case 1:
                this.refreshFirstTabContent(getCellIndexes(this.parent.getActiveSheet().activeCell));
                break;
            case 2:
                // Second tab functionality comes here
                break;
            case 3:
                this.refreshThirdTabContent();
                break;
        }
    };
    Ribbon.prototype.refreshFirstTabContent = function (indexes) {
        if (!isNullOrUndefined(document.getElementById(this.parent.element.id + '_number_format'))) {
            this.numFormatDDB = getComponent(document.getElementById(this.parent.element.id + '_number_format'), DropDownButton);
        }
        var actCell = getCellIndexes(this.parent.getActiveSheet().activeCell);
        var l10n = this.parent.serviceLocator.getService(locale);
        var cell = getCell(actCell[0], actCell[1], this.parent.getActiveSheet(), true);
        cell = cell ? cell : {};
        var type = getTypeFromFormat(cell.format ? cell.format : 'General');
        if (this.numFormatDDB) {
            this.refreshNumFormatSelection(l10n.getConstant(type));
        }
        if (this.fontNameDdb) {
            this.refreshFontNameSelection(this.getCellStyleValue('fontFamily', indexes));
        }
        if (this.fontSizeDdb) {
            var value = this.getCellStyleValue('fontSize', indexes).split('pt')[0];
            if (value !== this.fontSizeDdb.content) {
                this.fontSizeDdb.content = value;
                this.fontSizeDdb.dataBind();
            }
        }
        if (this.textAlignDdb) {
            var value = "e-icons e-" + this.getCellStyleValue('textAlign', indexes).toLowerCase() + "-icon";
            if (value !== this.textAlignDdb.iconCss) {
                this.textAlignDdb.iconCss = value;
                this.textAlignDdb.dataBind();
            }
        }
        if (this.verticalAlignDdb) {
            var value = "e-icons e-" + this.getCellStyleValue('verticalAlign', indexes).toLowerCase() + "-icon";
            if (value !== this.verticalAlignDdb.iconCss) {
                this.verticalAlignDdb.iconCss = value;
                this.verticalAlignDdb.dataBind();
            }
        }
        this.refreshToggleBtn(indexes);
    };
    Ribbon.prototype.refreshToggleBtn = function (indexes) {
        var _this = this;
        var btn;
        var id = this.parent.element.id;
        var value;
        var fontProps = ['fontWeight', 'fontStyle', 'textDecoration', 'textDecoration'];
        ['bold', 'italic', 'line-through', 'underline'].forEach(function (name, index) {
            btn = document.getElementById(id + "_" + name);
            if (btn) {
                value = _this.getCellStyleValue(fontProps[index], indexes).toLowerCase();
                if (value.indexOf(name) > -1) {
                    btn.classList.add('e-active');
                }
                else {
                    if (btn.classList.contains('e-active')) {
                        btn.classList.remove('e-active');
                    }
                }
            }
        });
    };
    Ribbon.prototype.refreshFontNameSelection = function (fontFamily) {
        if (fontFamily !== this.fontNameDdb.items[this.fontNameIndex].text) {
            this.fontNameDdb.element.firstElementChild.textContent = fontFamily;
            for (var i = 0; i < this.fontNameDdb.items.length; i++) {
                if (this.fontNameDdb.items[i].text === fontFamily) {
                    this.fontNameDdb.items[i].iconCss = 'e-icons e-selected-icon';
                    this.fontNameDdb.items[this.fontNameIndex].iconCss = '';
                    this.fontNameDdb.setProperties({ 'items': this.fontNameDdb.items }, true);
                    this.fontNameIndex = i;
                    break;
                }
            }
        }
    };
    Ribbon.prototype.refreshNumFormatSelection = function (type) {
        var l10n = this.parent.serviceLocator.getService(locale);
        for (var i = 0; i < this.numFormatDDB.items.length; i++) {
            if (this.numFormatDDB.items[i].iconCss !== '') {
                this.numFormatDDB.items[i].iconCss = '';
            }
            if (this.numFormatDDB.items[i].text === type) {
                this.numFormatDDB.items[i].iconCss = 'e-icons e-selected-icon';
            }
        }
        this.numFormatDDB.element.firstElementChild.textContent = type;
        this.numFormatDDB.setProperties({ 'items': this.numFormatDDB.items }, true);
    };
    Ribbon.prototype.fileItemSelect = function (args) {
        var _this = this;
        var selectArgs = extend({ cancel: false }, args);
        this.parent.trigger('fileItemSelect', selectArgs);
        if (!selectArgs.cancel) {
            switch (args.item.id) {
                case 'Open':
                    this.parent.element.querySelector('#' + this.parent.element.id + '_fileUpload').click();
                    break;
                case 'Xlsx':
                case 'Xls':
                case 'Csv':
                    this.parent.save({ saveType: args.item.id });
                    break;
                case 'New':
                    var dialogInst_1 = this.parent.serviceLocator.getService(dialog);
                    dialogInst_1.show({
                        height: 200, width: 400, isModal: true, showCloseIcon: true,
                        content: this.parent.serviceLocator.getService(locale).getConstant('DestroyAlert'),
                        beforeOpen: function () { return _this.parent.element.focus(); },
                        buttons: [{
                                buttonModel: {
                                    content: this.parent.serviceLocator.getService(locale).getConstant('Ok'), isPrimary: true
                                },
                                click: function () {
                                    _this.parent.sheets.length = 0;
                                    _this.parent.createSheet();
                                    dialogInst_1.hide();
                                    _this.parent.activeSheetTab = _this.parent.sheets.length;
                                    _this.parent.setProperties({ 'activeSheetTab': _this.parent.sheets.length }, true);
                                    _this.parent.notify(refreshSheetTabs, {});
                                    _this.parent.notify(sheetsDestroyed, {});
                                    _this.parent.renderModule.refreshSheet();
                                }
                            }]
                    });
                    break;
            }
        }
    };
    Ribbon.prototype.toolbarClicked = function (args) {
        var parentId = this.parent.element.id;
        var text;
        var l10n = this.parent.serviceLocator.getService(locale);
        var sheet = this.parent.getActiveSheet();
        switch (args.item.id) {
            case parentId + '_headers':
                var evtHArgs = {
                    isShow: !sheet.showHeaders,
                    sheetIdx: this.parent.activeSheetTab,
                    cancel: false
                };
                this.parent.serviceLocator.getService(beginCompleteEvents).completeAction(evtHArgs, 'headers');
                if (evtHArgs.cancel) {
                    return;
                }
                sheet.showHeaders = !sheet.showHeaders;
                this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
                this.parent.serviceLocator.getService('sheet').showHideHeaders();
                text = this.getLocaleText(l10n, 'Headers', false);
                args.item.text = text;
                this.ribbon.items[3].content[0].text = text;
                this.updateToggleText('headers', text);
                this.parent.element.focus();
                break;
            case parentId + '_gridlines':
                var evtglArgs = {
                    isShow: !sheet.showGridLines,
                    sheetIdx: this.parent.activeSheetTab,
                    cancel: false
                };
                this.parent.serviceLocator.getService(beginCompleteEvents).completeAction(evtglArgs, 'gridLines');
                if (evtglArgs.cancel) {
                    return;
                }
                sheet.showGridLines = !sheet.showGridLines;
                this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
                text = this.getLocaleText(l10n, 'GridLines', true);
                args.item.text = text;
                this.ribbon.items[3].content[2].text = text;
                this.updateToggleText('gridlines', text);
                this.parent.element.focus();
                break;
        }
        this.parent.notify(ribbonClick, args);
    };
    Ribbon.prototype.updateToggleText = function (item, text) {
        var _this = this;
        getUpdateUsingRaf(function () {
            _this.ribbon.element.querySelector("#" + _this.parent.element.id + "_" + item + " .e-tbar-btn-text").textContent = text;
        });
    };
    Ribbon.prototype.refreshThirdTabContent = function () {
        var _this = this;
        var text;
        var idx;
        var sheet = this.parent.getActiveSheet();
        var l10n = this.parent.serviceLocator.getService(locale);
        var itemPos = [0, 2];
        ['Headers', 'GridLines'].forEach(function (item, index) {
            idx = itemPos[index];
            if (sheet['show' + item]) {
                if (_this.ribbon.items[3].content[idx].text === l10n.getConstant('Show' + item)) {
                    _this.updateShowHideBtn('Hide', item, idx);
                }
            }
            else {
                if (_this.ribbon.items[3].content[idx].text === l10n.getConstant('Hide' + item)) {
                    _this.updateShowHideBtn('Show', item, idx);
                }
            }
        });
    };
    Ribbon.prototype.updateShowHideBtn = function (showHideText, item, idx) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var text = l10n.getConstant(showHideText + item);
        this.ribbon.items[3].content[idx].text = text;
        this.ribbon.setProperties({ 'items': this.ribbon.items }, true);
        this.updateToggleText(item.toLowerCase(), text);
    };
    Ribbon.prototype.enableRibbonItems = function (args) {
        var ele = document.getElementById(args.id);
        if (ele) {
            this.ribbon.enableItems(args.isEnable, closest(ele, '.e-toolbar-item'));
        }
    };
    Ribbon.prototype.createMobileView = function () {
        var _this = this;
        var parentId = this.parent.element.id;
        var toobar = this.parent.createElement('div', { className: 'e-header-toolbar' });
        var menu = this.parent.createElement('ul');
        toobar.appendChild(menu);
        var toolbarObj = new Toolbar({
            items: [
                { prefixIcon: 'e-tick-icon', align: 'Left', id: parentId + 'focused_tick', cssClass: 'e-focused-tick' },
                { template: menu, align: 'Right', id: parentId + 'file_menu' },
            ],
            clicked: function (args) {
                switch (args.item.id) {
                    case parentId + 'focused_tick':
                        _this.parent.element.classList.remove('e-mobile-focused');
                        _this.parent.renderModule.setSheetPanelSize();
                        break;
                }
            },
            created: function () {
                var menuObj = new Menu({
                    cssClass: 'e-mobile e-file-menu',
                    enableRtl: true,
                    showItemOnClick: true,
                    items: _this.ribbon.items[0].menuItems,
                    select: _this.fileItemSelect.bind(_this),
                    beforeOpen: function (args) {
                        args.element.parentElement.classList.remove('e-rtl');
                        _this.fileMenuBeforeOpen(args);
                    },
                    beforeClose: _this.fileMenuBeforeClose.bind(_this)
                });
                menuObj.createElement = _this.parent.createElement;
                menuObj.appendTo(menu);
            }
        });
        toolbarObj.createElement = this.parent.createElement;
        toolbarObj.appendTo(toobar);
        this.parent.element.insertBefore(toobar, this.parent.element.firstElementChild);
        this.renderMobileToolbar();
    };
    Ribbon.prototype.renderMobileToolbar = function () {
        var _this = this;
        var toolbarPanel = this.parent.createElement('div', { className: 'e-toolbar-panel e-ribbon' });
        var toolbar = this.parent.createElement('div');
        var ddb = this.parent.createElement('button');
        toolbarPanel.appendChild(toolbar);
        toolbarPanel.appendChild(ddb);
        toolbarPanel.style.display = 'block';
        this.parent.element.appendChild(toolbarPanel);
        var ddbObj = new DropDownButton({
            cssClass: 'e-caret-hide',
            content: this.ribbon.items[1].header.text,
            items: [
                { text: this.ribbon.items[1].header.text },
                { text: this.ribbon.items[2].header.text },
                { text: this.ribbon.items[3].header.text }
            ],
            select: function (args) {
                if (args.item.text !== ddbObj.content) {
                    toolbarObj.element.style.display = 'none';
                    ddbObj.content = args.item.text;
                    ddbObj.dataBind();
                    toolbarObj.items = _this.ribbon.items[ddbObj.items.indexOf(args.item) + 1].content;
                    toolbarObj.width = "calc(100% - " + ddb.getBoundingClientRect().width + "px)";
                    toolbarObj.element.style.display = '';
                    toolbarObj.dataBind();
                    toolbarObj.items[0].text = args.item.text;
                    toolbarObj.dataBind();
                }
            },
            open: function (args) {
                var element = args.element.parentElement;
                var clientRect = element.getBoundingClientRect();
                var offset = calculatePosition(ddbObj.element, 'right', 'bottom');
                element.style.left = offset.left - clientRect.width + "px";
                element.style.top = offset.top - clientRect.height + "px";
                for (var i = 0; i < ddbObj.items.length; i++) {
                    if (ddbObj.content === ddbObj.items[i].text) {
                        args.element.children[i].classList.add('e-selected');
                        break;
                    }
                }
            },
            close: function () { return _this.parent.element.focus(); }
        });
        ddbObj.createElement = this.parent.createElement;
        ddbObj.appendTo(ddb);
        var toolbarObj = new Toolbar({
            width: "calc(100% - " + ddb.getBoundingClientRect().width + "px)",
            items: this.ribbon.items[1].content,
            clicked: this.toolbarClicked.bind(this)
        });
        toolbarObj.createElement = this.parent.createElement;
        toolbarObj.appendTo(toolbar);
        toolbarPanel.style.display = '';
    };
    Ribbon.prototype.fileMenuBeforeOpen = function (args) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var wrapper;
        var contents = ['.xlsx', '.xls', '.csv'];
        if (args.parentItem.text === l10n.getConstant('SaveAs')) {
            [].slice.call(args.element.children).forEach(function (li, index) {
                wrapper = _this.parent.createElement('div', { innerHTML: li.innerHTML });
                li.innerHTML = '';
                wrapper.appendChild(_this.parent.createElement('span', { className: 'e-extension', innerHTML: contents[index] }));
                li.appendChild(wrapper);
            });
        }
        this.parent.trigger('fileMenuBeforeOpen', args);
    };
    Ribbon.prototype.fileMenuBeforeClose = function (args) {
        this.parent.trigger('fileMenuBeforeClose', args);
    };
    Ribbon.prototype.addEventListener = function () {
        this.parent.on(ribbon, this.initRibbon, this);
        this.parent.on(enableRibbonItems, this.enableRibbonItems, this);
        this.parent.on(activeCellChanged, this.refreshRibbonContent, this);
        this.parent.on(enableToolbar, this.enableToolbar, this);
    };
    Ribbon.prototype.destroy = function () {
        var parentElem = this.parent.element;
        var ribbonEle = this.ribbon.element;
        var id = parentElem.id;
        destroyComponent(parentElem.querySelector('#' + id + '_paste'), SplitButton);
        destroyComponent(parentElem.querySelector('#' + id + '_number_format'), DropDownButton);
        destroyComponent(parentElem.querySelector('#' + id + '_font_size'), DropDownButton);
        destroyComponent(parentElem.querySelector('#' + id + '_font_name'), DropDownButton);
        destroyComponent(parentElem.querySelector('#' + id + '_text_align'), DropDownButton);
        destroyComponent(parentElem.querySelector('#' + id + '_vertical_align'), DropDownButton);
        destroyComponent(parentElem.querySelector('#' + id + '_sorting'), DropDownButton);
        ['bold', 'italic', 'line-through', 'underline'].forEach(function (name) {
            destroyComponent(parentElem.querySelector('#' + (id + "_" + name)), Button);
        });
        this.ribbon.destroy();
        if (ribbonEle) {
            detach(ribbonEle);
        }
        this.ribbon = null;
        this.removeEventListener();
    };
    Ribbon.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(ribbon, this.initRibbon);
            this.parent.off(enableRibbonItems, this.enableRibbonItems);
            this.parent.off(activeCellChanged, this.refreshRibbonContent);
            this.parent.on(enableToolbar, this.enableToolbar, this);
        }
    };
    return Ribbon;
}());
export { Ribbon };
