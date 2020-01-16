import { Tab } from '@syncfusion/ej2-navigations';
import { refreshSheetTabs, locale, addSheetTab, cMenuBeforeOpen, dialog, renameSheet } from '../common/index';
import { sheetTabs, renameSheetTab, removeSheetTab, activeSheetChanged, onVerticalScroll, onHorizontalScroll } from '../common/index';
import { getUpdateUsingRaf } from '../common/index';
import { getSheetName, aggregateComputation, isSingleCell, getRangeIndexes } from '../../workbook/index';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { isCollide, calculatePosition } from '@syncfusion/ej2-popups';
import { rippleEffect, closest, EventHandler, remove } from '@syncfusion/ej2-base';
import { sheetsDestroyed, activeCellChanged, workbookFormulaOperation } from '../../workbook/common/index';
/**
 * Represents SheetTabs for Spreadsheet.
 */
var SheetTabs = /** @class */ (function () {
    function SheetTabs(parent) {
        this.aggregateContent = '';
        this.parent = parent;
        this.addEventListener();
    }
    SheetTabs.prototype.getModuleName = function () {
        return 'sheetTabs';
    };
    SheetTabs.prototype.createSheetTabs = function () {
        var _this = this;
        if (!this.parent.showSheetTabs && this.tabInstance) {
            this.destroy();
            return;
        }
        var l10n = this.parent.serviceLocator.getService(locale);
        var panel = this.parent.createElement('div', {
            className: 'e-sheet-tab-panel', id: this.parent.element.id + '_sheet_tab_panel'
        });
        var addBtn = this.parent.createElement('button', {
            className: 'e-add-sheet-tab e-btn e-css e-flat e-icon-btn', attrs: { 'title': l10n.getConstant('AddSheet') }
        });
        addBtn.appendChild(this.parent.createElement('span', { className: 'e-btn-icon e-icons e-add-icon' }));
        addBtn.addEventListener('click', this.addSheetTab.bind(this));
        panel.appendChild(addBtn);
        this.addBtnRipple = rippleEffect(panel, { selector: '.e-add-sheet-tab' });
        var ddb = this.parent.createElement('button', { attrs: { 'title': l10n.getConstant('ListAllSheets') } });
        panel.appendChild(ddb);
        this.parent.element.appendChild(panel);
        var items = this.getSheetTabItems();
        this.dropDownInstance = new DropDownButton({
            iconCss: 'e-icons',
            items: items.ddbItems,
            select: function (args) { return _this.updateSheetTab({ idx: _this.dropDownInstance.items.indexOf(args.item) }); },
            beforeOpen: function (args) { return _this.beforeOpenHandler(_this.dropDownInstance, args.element); },
            open: function (args) { return _this.openHandler(_this.dropDownInstance, args.element, 'left'); },
            cssClass: 'e-sheets-list e-flat e-caret-hide',
            close: function () { return _this.parent.element.focus(); }
        });
        this.dropDownInstance.createElement = this.parent.createElement;
        this.dropDownInstance.appendTo(ddb);
        var sheetTab = this.parent.createElement('div', { className: 'e-sheet-tab' });
        this.tabInstance = new Tab({
            selectedItem: 0,
            overflowMode: 'Scrollable',
            items: items.tabItems,
            scrollStep: 250,
            selecting: function (args) {
                /** */
            },
            selected: function (args) {
                if (args.selectedIndex === args.previousIndex) {
                    return;
                }
                _this.parent.activeSheetTab = args.selectedIndex + 1;
                _this.parent.dataBind();
                _this.updateDropDownItems(args.selectedIndex, args.previousIndex);
                _this.parent.element.focus();
            },
            created: function () {
                var tBarItems = _this.tabInstance.element.querySelector('.e-toolbar-items');
                tBarItems.classList.add('e-sheet-tabs-items');
                EventHandler.add(tBarItems, 'dblclick', _this.renameSheetTab, _this);
            },
        });
        panel.appendChild(sheetTab);
        this.tabInstance.createElement = this.parent.createElement;
        this.tabInstance.appendTo(sheetTab);
        // tslint:disable-next-line:no-any
        EventHandler.remove(this.tabInstance.element, 'keydown', this.tabInstance.spaceKeyDown);
        var sheetCount = items.tabItems.length;
        for (var i = 0; i < sheetCount; i++) {
            var sheetName = getSheetName(this.parent, i + 1);
            var arg = { action: 'addSheet', sheetName: sheetName, index: i + 1 };
            this.parent.notify(workbookFormulaOperation, arg);
        }
    };
    SheetTabs.prototype.updateDropDownItems = function (curIdx, prevIdx) {
        if (prevIdx > -1) {
            this.dropDownInstance.items[prevIdx].iconCss = '';
        }
        this.dropDownInstance.items[curIdx].iconCss = 'e-selected-icon e-icons';
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
    };
    SheetTabs.prototype.beforeOpenHandler = function (instance, element) {
        var viewportHeight = this.parent.viewport.height;
        var actualHeight = (parseInt(getComputedStyle(element.firstElementChild).height, 10) *
            instance.items.length) + (parseInt(getComputedStyle(element).paddingTop, 10) * 2);
        if (actualHeight > viewportHeight) {
            element.style.height = viewportHeight + "px";
            element.style.overflowY = 'auto';
        }
        element.parentElement.style.visibility = 'hidden';
    };
    SheetTabs.prototype.openHandler = function (instance, element, positionX) {
        var wrapper = element.parentElement;
        var height;
        var collide = isCollide(wrapper);
        if (collide.indexOf('bottom') === -1) {
            height = element.style.overflowY === 'auto' ? this.parent.viewport.height : wrapper.getBoundingClientRect().height;
            var offset = calculatePosition(instance.element, positionX, 'top');
            if (positionX === 'right') {
                offset.left -= wrapper.getBoundingClientRect().width;
            }
            wrapper.style.left = offset.left + "px";
            wrapper.style.top = offset.top - height + "px";
        }
        wrapper.style.visibility = '';
    };
    SheetTabs.prototype.getSheetTabItems = function () {
        var _this = this;
        var tabItems = [];
        var ddbItems = [];
        var sheetName;
        this.parent.sheets.forEach(function (sheet, index) {
            sheetName = getSheetName(_this.parent, index + 1);
            tabItems.push({ header: { 'text': sheetName } });
            ddbItems.push({ text: sheetName, iconCss: index + 1 === _this.parent.activeSheetTab ? 'e-selected-icon e-icons' : '' });
        });
        return { tabItems: tabItems, ddbItems: ddbItems };
    };
    SheetTabs.prototype.refreshSheetTab = function () {
        var items = this.getSheetTabItems();
        this.dropDownInstance.items = items.ddbItems;
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        this.tabInstance.items = items.tabItems;
        this.tabInstance.selectedItem = this.parent.activeSheetTab - 1;
        this.tabInstance.dataBind();
    };
    SheetTabs.prototype.addSheetTab = function (args) {
        var idx = args.text && args.text === 'Insert' ? this.parent.activeSheetTab - 1 : this.parent.activeSheetTab;
        this.parent.createSheet(idx);
        var sheetName = this.parent.sheets[idx].name;
        this.dropDownInstance.items.splice(idx, 0, { text: sheetName });
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        this.tabInstance.addTab([{ header: { text: sheetName }, content: '' }], idx);
        if (idx === this.parent.activeSheetTab - 1) {
            this.parent.renderModule.refreshSheet();
            this.updateDropDownItems(idx, idx + 1);
        }
        else {
            this.updateSheetTab({ idx: idx });
        }
        this.parent.element.focus();
        var arg = { action: 'addSheet', sheetName: sheetName, index: this.parent.getActiveSheet().id };
        this.parent.notify(workbookFormulaOperation, arg);
    };
    SheetTabs.prototype.updateSheetTab = function (args) {
        this.tabInstance.selectedItem = args.idx;
        this.tabInstance.dataBind();
    };
    SheetTabs.prototype.switchSheetTab = function (args) {
        var target = closest(args.event.target, '.e-toolbar-item');
        if (!target) {
            return;
        }
        var text = target.querySelector('.e-tab-text').textContent;
        for (var i = 0, len = this.tabInstance.items.length; i < len; i++) {
            if (this.tabInstance.items[i].header.text === text) {
                if (this.parent.activeSheetTab - 1 !== i) {
                    this.updateSheetTab({ idx: i });
                }
                break;
            }
        }
    };
    SheetTabs.prototype.renameSheetTab = function () {
        var target = this.tabInstance.element.querySelector('.e-toolbar-item.e-active');
        if (target) {
            target = target.querySelector('.e-text-wrap');
            var value = target.querySelector('.e-tab-text').textContent;
            var input = this.parent.createElement('input', {
                id: this.parent.element.id + '_rename_input',
                className: 'e-input e-sheet-rename', styles: "width: " + target.getBoundingClientRect().width + "px", attrs: {
                    'type': 'text', 'name': 'Rename', 'required': '', 'value': value, 'spellcheck': 'false', 'maxlength': '31'
                }
            });
            target.firstElementChild.style.display = 'none';
            target.appendChild(input);
            EventHandler.add(document, 'mousedown touchstart', this.renameInputFocusOut, this);
            EventHandler.add(input, 'input', this.updateWidth, this);
            input.focus();
            input.setSelectionRange(0, value.length);
            EventHandler.remove(closest(target, '.e-toolbar-items'), 'dblclick', this.renameSheetTab);
        }
    };
    SheetTabs.prototype.updateWidth = function (e) {
        var target = e.target;
        var len = target.value.length;
        var value = target.value.split(' ');
        if (value.length) {
            var spaceLen = value.length - 1;
            len -= spaceLen;
            len += (spaceLen * 0.5);
        }
        target.style.width = len + "ch";
    };
    SheetTabs.prototype.renameInputFocusOut = function (e) {
        var target = e.target;
        if ((e.type === 'mousedown' || e.type === 'touchstart') && (target.classList.contains('e-sheet-rename') ||
            closest(target, '.e-dlg-container'))) {
            return;
        }
        target = document.getElementById(this.parent.element.id + '_rename_input');
        if (e.type === 'keydown' && e.keyCode === 27) {
            this.removeRenameInput(target);
            this.parent.element.focus();
            return;
        }
        var value = target.value;
        var l10n = this.parent.serviceLocator.getService(locale);
        if (value) {
            var idx = this.tabInstance.selectedItem;
            if (!value.match(new RegExp('.*[\\[\\]\\*\\\\\/\\?].*'))) {
                if (this.tabInstance.items[idx].header.text !== value) {
                    for (var i = 0, len = this.parent.sheets.length; i < len; i++) {
                        if (i + 1 !== this.parent.activeSheetTab && this.parent.sheets[i].name.toLowerCase() === value.toLowerCase()) {
                            this.showRenameDialog(target, l10n.getConstant('SheetRenameAlreadyExistsAlert'));
                            return;
                        }
                    }
                }
                var items = this.removeRenameInput(target);
                if (this.tabInstance.items[idx].header.text !== value) {
                    this.parent.sheets[idx].name = value;
                    this.parent.setProperties({ 'sheets': this.parent.sheets }, true);
                    this.tabInstance.items[idx].header.text = value;
                    this.dropDownInstance.items[idx].text = value;
                    this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
                    if (value.indexOf('  ') > -1) {
                        this.tabInstance.setProperties({ 'items': this.tabInstance.items }, true);
                        items.querySelector('.e-toolbar-item.e-active .e-tab-text').textContent = value;
                    }
                    else {
                        this.tabInstance.items = this.tabInstance.items;
                        this.tabInstance.dataBind();
                    }
                }
                if (e.type === 'keydown' || (closest(e.target, '.e-spreadsheet'))) {
                    this.parent.element.focus();
                }
            }
            else {
                this.showRenameDialog(target, l10n.getConstant('SheetRenameInvalidAlert'));
            }
        }
        else {
            this.showRenameDialog(target, l10n.getConstant('SheetRenameEmptyAlert'));
        }
        var sheetIndex = this.parent.getActiveSheet().id;
        var args = { action: 'renameUpdation', value: value, sheetId: sheetIndex };
        this.parent.notify(workbookFormulaOperation, args);
    };
    SheetTabs.prototype.removeRenameInput = function (target) {
        var textEle = target.parentElement.querySelector('.e-tab-text');
        var sheetItems = closest(target, '.e-toolbar-items');
        EventHandler.add(sheetItems, 'dblclick', this.renameSheetTab, this);
        EventHandler.remove(document, 'mousedown touchstart', this.renameInputFocusOut);
        EventHandler.remove(target, 'input', this.updateWidth);
        remove(target);
        textEle.style.display = '';
        return sheetItems;
    };
    SheetTabs.prototype.showRenameDialog = function (target, content) {
        this.parent.serviceLocator.getService(dialog).show({
            target: document.getElementById(this.parent.element.id + '_sheet_panel'),
            height: 180, width: 400, isModal: true, showCloseIcon: true,
            content: content,
            beforeOpen: function () { return target.focus(); },
            close: function () { return target.setSelectionRange(0, target.value.length); }
        });
    };
    SheetTabs.prototype.focusRenameInput = function () {
        var input = document.getElementById(this.parent.element.id + '_rename_input');
        if (input) {
            input.focus();
        }
    };
    SheetTabs.prototype.removeSheetTab = function (args) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        if (this.parent.sheets.length > 1) {
            var sheet = this.parent.getActiveSheet();
            var sheetIndex_1 = sheet.id;
            var isDataAvail = sheet.rows && sheet.rows.length ?
                (sheet.rows.length === 1 ? (sheet.rows[0].cells && sheet.rows[0].cells.length ? true : false) : true) : false;
            if (isDataAvail) {
                var dialogInst_1 = this.parent.serviceLocator.getService(dialog);
                dialogInst_1.show({
                    height: 180, width: 400, isModal: true, showCloseIcon: true,
                    content: l10n.getConstant('DeleteSheetAlert'),
                    beforeOpen: function () { return _this.parent.element.focus(); },
                    buttons: [{
                            buttonModel: {
                                content: l10n.getConstant('Ok'), isPrimary: true
                            },
                            click: function () {
                                dialogInst_1.hide();
                                _this.destroySheet();
                                var sheetArgs = {
                                    action: 'deleteSheetTab', sheetName: '', index: sheetIndex_1
                                };
                                _this.parent.notify(workbookFormulaOperation, sheetArgs);
                            }
                        }]
                });
            }
            else {
                this.destroySheet();
                var sheetArgs = {
                    action: 'deleteSheetTab', sheetName: '', index: sheetIndex_1
                };
                this.parent.notify(workbookFormulaOperation, sheetArgs);
            }
        }
        else {
            this.parent.serviceLocator.getService(dialog).show({
                target: document.getElementById(this.parent.element.id + '_sheet_panel'),
                height: 180, width: 400, isModal: true, showCloseIcon: true,
                content: l10n.getConstant('DeleteSingleLastSheetAlert'),
                beforeOpen: function () { return _this.parent.element.focus(); }
            });
        }
    };
    SheetTabs.prototype.destroySheet = function () {
        var activeSheetIdx = this.parent.activeSheetTab - 1;
        this.parent.removeSheet(activeSheetIdx);
        this.parent.notify(sheetsDestroyed, { sheetIndex: activeSheetIdx });
        this.dropDownInstance.items.splice(activeSheetIdx, 1);
        this.dropDownInstance.setProperties({ 'items': this.dropDownInstance.items }, true);
        this.tabInstance.removeTab(activeSheetIdx);
        this.parent.setProperties({ 'activeSheetTab': this.tabInstance.selectedItem + 1 }, true);
        this.parent.renderModule.refreshSheet();
        this.updateDropDownItems(this.tabInstance.selectedItem);
        this.parent.element.focus();
    };
    SheetTabs.prototype.showAggregate = function () {
        var _this = this;
        if (isSingleCell(getRangeIndexes(this.parent.getActiveSheet().selectedRange))) {
            return;
        }
        getUpdateUsingRaf(function () {
            var eventArgs = { Count: 0, Sum: '0', Avg: '0', Min: '0', Max: '0' };
            _this.parent.notify(aggregateComputation, eventArgs);
            if (eventArgs.Count) {
                if (!_this.aggregateContent) {
                    _this.aggregateContent = eventArgs.Sum ? 'Sum' : 'Count';
                }
                var key = _this.aggregateContent;
                var content = key + ": " + eventArgs[key];
                if (!_this.aggregateDropDown) {
                    var aggregateEle = _this.parent.createElement('button');
                    document.getElementById(_this.parent.element.id + "_sheet_tab_panel").appendChild(aggregateEle);
                    _this.aggregateDropDown = new DropDownButton({
                        content: content,
                        items: _this.getAggregateItems(eventArgs),
                        select: function (args) { return _this.updateAggregateContent(args.item.text, eventArgs); },
                        beforeOpen: function (args) {
                            return _this.beforeOpenHandler(_this.aggregateDropDown, args.element);
                        },
                        open: function (args) { return _this.openHandler(_this.aggregateDropDown, args.element, 'right'); },
                        close: function () { return _this.parent.element.focus(); },
                        cssClass: 'e-aggregate-list e-flat'
                    });
                    _this.aggregateDropDown.createElement = _this.parent.createElement;
                    _this.aggregateDropDown.appendTo(aggregateEle);
                }
                else {
                    _this.updateAggregateContent(content, eventArgs);
                }
            }
        });
    };
    SheetTabs.prototype.getAggregateItems = function (args) {
        var _this = this;
        var items = [];
        var text;
        var iconCss;
        Object.keys(args).forEach(function (key) {
            if (args[key] !== aggregateComputation) {
                text = key + ": " + args[key];
                iconCss = key === _this.aggregateContent ? 'e-selected-icon e-icons' : '';
                items.push({ text: text, iconCss: iconCss });
            }
        });
        return items;
    };
    SheetTabs.prototype.updateAggregateContent = function (text, eventArgs) {
        this.aggregateContent = text.split(': ')[0];
        this.aggregateDropDown.content = text;
        this.aggregateDropDown.dataBind();
        this.aggregateDropDown.setProperties({ 'items': this.getAggregateItems(eventArgs) }, true);
    };
    SheetTabs.prototype.removeAggregate = function () {
        if (this.aggregateDropDown && isSingleCell(getRangeIndexes(this.parent.getActiveSheet().selectedRange))) {
            this.aggregateDropDown.destroy();
            remove(this.aggregateDropDown.element);
            this.aggregateDropDown = null;
        }
    };
    SheetTabs.prototype.addEventListener = function () {
        this.parent.on(sheetTabs, this.createSheetTabs, this);
        this.parent.on(refreshSheetTabs, this.refreshSheetTab, this);
        this.parent.on(addSheetTab, this.addSheetTab, this);
        this.parent.on(removeSheetTab, this.removeSheetTab, this);
        this.parent.on(renameSheetTab, this.renameSheetTab, this);
        this.parent.on(cMenuBeforeOpen, this.switchSheetTab, this);
        this.parent.on(activeSheetChanged, this.updateSheetTab, this);
        this.parent.on(renameSheet, this.renameInputFocusOut, this);
        this.parent.on(activeCellChanged, this.removeAggregate, this);
        this.parent.on(onVerticalScroll, this.focusRenameInput, this);
        this.parent.on(onHorizontalScroll, this.focusRenameInput, this);
    };
    SheetTabs.prototype.destroy = function () {
        this.removeEventListener();
        this.dropDownInstance.destroy();
        this.dropDownInstance = null;
        this.tabInstance.destroy();
        this.tabInstance = null;
        this.aggregateDropDown = null;
        this.aggregateContent = null;
        this.addBtnRipple();
        this.addBtnRipple = null;
        EventHandler.remove(document, 'mousedown touchstart', this.renameInputFocusOut);
        var ele = document.getElementById(this.parent.element.id + '_sheet_tab_panel');
        if (ele) {
            remove(ele);
        }
        this.parent = null;
    };
    SheetTabs.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(sheetTabs, this.createSheetTabs);
            this.parent.off(refreshSheetTabs, this.refreshSheetTab);
            this.parent.off(addSheetTab, this.addSheetTab);
            this.parent.off(removeSheetTab, this.removeSheetTab);
            this.parent.off(renameSheetTab, this.renameSheetTab);
            this.parent.off(cMenuBeforeOpen, this.switchSheetTab);
            this.parent.off(activeSheetChanged, this.updateSheetTab);
            this.parent.off(renameSheet, this.renameInputFocusOut);
            this.parent.off(activeCellChanged, this.removeAggregate);
            this.parent.off(onVerticalScroll, this.focusRenameInput);
            this.parent.off(onHorizontalScroll, this.focusRenameInput);
        }
    };
    return SheetTabs;
}());
export { SheetTabs };
