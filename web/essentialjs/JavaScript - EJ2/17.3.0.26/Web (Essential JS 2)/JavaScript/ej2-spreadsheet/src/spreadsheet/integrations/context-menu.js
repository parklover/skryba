import { ContextMenu as ContextMenuComponent } from '@syncfusion/ej2-navigations';
import { closest, extend, detach } from '@syncfusion/ej2-base';
import { addSheetTab, removeSheetTab, cMenuBeforeOpen, renameSheetTab, cut, copy, paste, locale } from '../common/index';
import { addContextMenuItems, removeContextMenuItems, enableContextMenuItems, initiateCustomSort } from '../common/index';
import { getRangeIndexes } from '../../workbook/common/index';
/**
 * Represents context menu for Spreadsheet.
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Constructor for ContextMenu module.
     */
    function ContextMenu(parent) {
        this.parent = parent;
        this.init();
    }
    ContextMenu.prototype.init = function () {
        this.initContextMenu();
        this.addEventListener();
    };
    ContextMenu.prototype.initContextMenu = function () {
        var ul = document.createElement('ul');
        ul.id = this.parent.element.id + '_contextmenu';
        this.parent.element.appendChild(ul);
        this.contextMenuInstance = new ContextMenuComponent({
            cssClass: 'e-spreadsheet-contextmenu',
            target: '#' + this.parent.element.id,
            filter: 'e-numericcontainer e-active-cell e-selection e-row e-header-row e-select-all-cell e-sheet-tabs-items',
            select: this.selectHandler.bind(this),
            beforeOpen: this.beforeOpenHandler.bind(this),
            beforeClose: this.beforeCloseHandler.bind(this)
        }, ul);
    };
    /**
     * Before close event handler.
     */
    ContextMenu.prototype.beforeCloseHandler = function (args) {
        this.parent.trigger('contextMenuBeforeClose', args);
    };
    /**
     * Select event handler.
     */
    ContextMenu.prototype.selectHandler = function (args) {
        var selectArgs = extend({ cancel: false }, args);
        this.parent.trigger('contextMenuItemSelect', selectArgs);
        if (!selectArgs.cancel) {
            var l10n = this.parent.serviceLocator.getService(locale);
            var indexes = void 0;
            switch (args.item.text) {
                case l10n.getConstant('Cut'):
                    this.parent.notify(cut, { isClick: true });
                    break;
                case l10n.getConstant('Copy'):
                    this.parent.notify(copy, { isClick: true });
                    break;
                case l10n.getConstant('Paste'):
                    this.parent.notify(paste, { isClick: true });
                    break;
                case l10n.getConstant('Values'):
                    this.parent.notify(paste, { type: 'Values' });
                    break;
                case l10n.getConstant('Formats'):
                    this.parent.notify(paste, { type: 'Formats' });
                    break;
                case l10n.getConstant('Rename'):
                    this.parent.notify(renameSheetTab, {});
                    break;
                case l10n.getConstant('Delete'):
                    this.parent.notify(removeSheetTab, {});
                    break;
                case l10n.getConstant('Insert'):
                    this.parent.notify(addSheetTab, { text: 'Insert' });
                    break;
                case l10n.getConstant('SortAscending'):
                    this.parent.sort();
                    break;
                case l10n.getConstant('SortDescending'):
                    this.parent.sort({ sortDescriptors: { order: 'Descending' } });
                    break;
                case l10n.getConstant('CustomSort') + '...':
                    this.parent.notify(initiateCustomSort, null);
                    break;
                case l10n.getConstant('HideRow'):
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.showHideRow(true, indexes[0], indexes[2]);
                    break;
                case l10n.getConstant('HideRows'):
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.showHideRow(true, indexes[0], indexes[2]);
                    break;
                case l10n.getConstant('UnHideRows'):
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.showHideRow(false, indexes[0], indexes[2]);
                    break;
                default:
                // Rename functionality goes here
            }
        }
    };
    /**
     * Before open event handler.
     */
    ContextMenu.prototype.beforeOpenHandler = function (args) {
        var target = this.getTarget(args.event.target);
        if (args.element.classList.contains('e-contextmenu')) {
            var items = this.getDataSource(target);
            this.contextMenuInstance.items = items;
            this.contextMenuInstance.dataBind();
        }
        this.parent.trigger('contextMenuBeforeOpen', args);
        this.parent.notify(cMenuBeforeOpen, extend(args, { target: target }));
    };
    /**
     * To get target area based on right click.
     */
    ContextMenu.prototype.getTarget = function (target) {
        if (closest(target, '.e-main-content')) {
            return 'Content';
        }
        else if (closest(target, '.e-column-header')) {
            return 'ColumnHeader';
        }
        else if (closest(target, '.e-row-header')) {
            return 'RowHeader';
        }
        else if (closest(target, '.e-sheet-tabs-items')) {
            return 'Footer';
        }
        else if (closest(target, '.e-selectall-container')) {
            return 'SelectAll';
        }
        else {
            return '';
        }
    };
    /**
     * To populate context menu items based on target area.
     */
    ContextMenu.prototype.getDataSource = function (target) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var items = [];
        if (target === 'Content') {
            this.setClipboardData(items, l10n);
            //push sort items here
            this.setSortItems(items);
        }
        else if (target === 'RowHeader') {
            this.setClipboardData(items, l10n);
            //this.setHideShowItems(items, l10n, 'Row');
        }
        else if (target === 'ColumnHeader') {
            this.setClipboardData(items, l10n);
        }
        else if (target === 'SelectAll') {
            this.setClipboardData(items, l10n);
            this.setSortItems(items);
        }
        else if (target === 'Footer') {
            items.push({
                text: l10n.getConstant('Insert')
            });
            items.push({
                text: l10n.getConstant('Delete'), iconCss: 'e-icons e-delete'
            });
            items.push({
                text: l10n.getConstant('Rename')
            });
        }
        return items;
    };
    /**
     * Sets sorting related items to the context menu.
     */
    ContextMenu.prototype.setSortItems = function (items) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (this.parent.allowSorting) {
            items.push({
                text: l10n.getConstant('Sort'),
                iconCss: 'e-icons e-sort-icon',
                items: [
                    { text: l10n.getConstant('SortAscending'), iconCss: 'e-icons e-sort-asc' },
                    { text: l10n.getConstant('SortDescending'), iconCss: 'e-icons e-sort-desc' },
                    { text: l10n.getConstant('CustomSort') + '...', iconCss: 'e-icons e-sort-custom' }
                ]
            });
        }
    };
    ContextMenu.prototype.setClipboardData = function (items, l10n) {
        if (this.parent.enableClipboard) {
            items.push({
                text: l10n.getConstant('Cut'),
                iconCss: 'e-icons e-cut-icon'
            });
            items.push({
                text: l10n.getConstant('Copy'),
                iconCss: 'e-icons e-copy-icon'
            });
            items.push({
                text: l10n.getConstant('Paste'),
                iconCss: 'e-icons e-paste-icon'
            });
            items.push({
                text: l10n.getConstant('PasteSpecial'),
                items: [
                    { text: l10n.getConstant('Values') },
                    { text: l10n.getConstant('Formats') }
                ]
            });
        }
    };
    ContextMenu.prototype.setHideShowItems = function (items, l10n, layout) {
        items.push({ separator: true });
        var indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
        if (indexes[0] === indexes[2] || indexes[1] === indexes[3]) {
            items.push({ text: l10n.getConstant('Hide' + layout) });
        }
        else {
            items.push({ text: l10n.getConstant('Hide' + layout + 's') });
        }
        if (this.parent.hiddenRowsCount(indexes[0], indexes[2])) {
            items.push({ text: l10n.getConstant('UnHide' + layout + 's') });
        }
    };
    /**
     * To add event listener.
     */
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on(addContextMenuItems, this.addItemsHandler, this);
        this.parent.on(removeContextMenuItems, this.removeItemsHandler, this);
        this.parent.on(enableContextMenuItems, this.enableItemsHandler, this);
    };
    /**
     * To add context menu items before / after particular item.
     */
    ContextMenu.prototype.addItemsHandler = function (args) {
        if (args.insertAfter) {
            this.contextMenuInstance.insertAfter(args.items, args.text, args.isUniqueId);
        }
        else {
            this.contextMenuInstance.insertBefore(args.items, args.text, args.isUniqueId);
        }
    };
    /**
     * To remove context menu items.
     */
    ContextMenu.prototype.removeItemsHandler = function (args) {
        this.contextMenuInstance.removeItems(args.items, args.isUniqueId);
    };
    /**
     * To enable / disable context menu items.
     */
    ContextMenu.prototype.enableItemsHandler = function (args) {
        this.contextMenuInstance.enableItems(args.items, args.enable, args.isUniqueId);
    };
    /**
     * To remove event listener.
     */
    ContextMenu.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(addContextMenuItems, this.addItemsHandler);
            this.parent.off(removeContextMenuItems, this.removeItemsHandler);
            this.parent.off(enableContextMenuItems, this.enableItemsHandler);
        }
    };
    /**
     * To get module name.
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    /**
     * Destroy method.
     */
    ContextMenu.prototype.destroy = function () {
        this.removeEventListener();
        this.contextMenuInstance.destroy();
        var ele = document.getElementById(this.parent.element.id + '_contextmenu');
        if (ele) {
            detach(ele);
        }
        this.parent = null;
    };
    return ContextMenu;
}());
export { ContextMenu };
