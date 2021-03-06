import { remove } from '@syncfusion/ej2-base';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { contextMenuClick, contextMenuOpen, contextMenuBeforeItemRender } from '../enum/enum';
import { createHtmlElement } from '../../diagram/utility/dom-util';
/**
 * @private
 */
export var menuClass = {
    content: '.e-diagramcontent',
    copy: 'e-copy',
    paste: 'e-paste',
    undo: 'e-undo',
    redo: 'e-redo',
    cut: 'e-cut',
    selectAll: 'e-selectall',
    grouping: 'e-grouping',
    group: 'e-group',
    unGroup: 'e-ungroup',
    bringToFront: 'e-bringfront',
    sendToBack: 'e-sendback',
    moveForward: 'e-bringforward',
    sendBackward: 'e-sendbackward',
    order: 'e-order'
};
/**
 * 'ContextMenu module used to handle context menu actions.'
 * @private
 */
var DiagramContextMenu = /** @class */ (function () {
    function DiagramContextMenu(parent, service) {
        this.defaultItems = {};
        /**
         * @private
         */
        this.disableItems = [];
        /**
         * @private
         */
        this.hiddenItems = [];
        this.localeText = this.setLocaleKey();
        this.parent = parent;
        this.serviceLocator = service;
        this.addEventListener();
    }
    /**

     * @private
     */
    DiagramContextMenu.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on('initial-load', this.render, this);
    };
    /**

     * @private
     */
    DiagramContextMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('initial-load', this.render);
    };
    DiagramContextMenu.prototype.render = function () {
        this.l10n = this.serviceLocator.getService('localization');
        this.element = createHtmlElement('ul', { id: this.parent.element.id + '_contextMenu' });
        this.parent.element.appendChild(this.element);
        var target = '#' + this.parent.element.id;
        this.contextMenu = new Menu({
            items: this.getMenuItems(),
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            locale: this.parent.locale,
            target: target,
            select: this.contextMenuItemClick.bind(this),
            beforeOpen: this.contextMenuBeforeOpen.bind(this),
            onOpen: this.contextMenuOpen.bind(this),
            beforeItemRender: this.BeforeItemRender.bind(this),
            onClose: this.contextMenuOnClose.bind(this),
            cssClass: 'e-diagram-menu',
            animationSettings: { effect: 'None' }
        });
        this.contextMenu.appendTo(this.element);
    };
    DiagramContextMenu.prototype.getMenuItems = function () {
        var menuItems = [];
        var orderItems = [];
        var groupItems = [];
        if (!this.parent.contextMenuSettings.showCustomMenuOnly) {
            for (var _i = 0, _a = this.getDefaultItems(); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.toLocaleLowerCase().indexOf('group') !== -1) {
                    if (item.toLocaleLowerCase() !== 'grouping') {
                        groupItems.push(this.buildDefaultItems(item));
                    }
                }
                else if (item.toLocaleLowerCase().indexOf('order') !== -1) {
                    if (item.toLocaleLowerCase() !== 'order') {
                        orderItems.push(this.buildDefaultItems(item));
                    }
                }
                else {
                    menuItems.push(this.buildDefaultItems(item));
                }
            }
            if (groupItems.length > 0) {
                var orderGroup = this.buildDefaultItems('grouping');
                orderGroup.items = groupItems;
                menuItems.push(orderGroup);
            }
            if (orderItems.length > 0) {
                var orderGroup = this.buildDefaultItems('order');
                orderGroup.items = orderItems;
                menuItems.push(orderGroup);
            }
        }
        if (this.parent.contextMenuSettings.items) {
            for (var _b = 0, _c = this.parent.contextMenuSettings.items; _b < _c.length; _b++) {
                var customItem = _c[_b];
                menuItems.push(customItem);
            }
        }
        return menuItems;
    };
    DiagramContextMenu.prototype.contextMenuOpen = function () {
        this.isOpen = true;
    };
    DiagramContextMenu.prototype.BeforeItemRender = function (args) {
        this.parent.trigger(contextMenuBeforeItemRender, args);
    };
    DiagramContextMenu.prototype.contextMenuItemClick = function (args) {
        document.getElementById(this.parent.element.id + 'content').focus();
        this.parent.trigger(contextMenuClick, args);
        var item = this.getKeyFromId(args.item.id);
        if (!args.cancel) {
            switch (item) {
                case 'cut':
                    this.parent.cut();
                    break;
                case 'copy':
                    this.parent.copy();
                    break;
                case 'undo':
                    this.parent.undo();
                    break;
                case 'redo':
                    this.parent.redo();
                    break;
                case 'paste':
                    this.parent.paste();
                    break;
                case 'selectAll':
                    this.parent.selectAll();
                    break;
                case 'group':
                    this.parent.group();
                    break;
                case 'unGroup':
                    this.parent.unGroup();
                    break;
                case 'bringToFrontOrder':
                    this.parent.bringToFront();
                    break;
                case 'moveForwardOrder':
                    this.parent.moveForward();
                    break;
                case 'sendToBackOrder':
                    this.parent.sendToBack();
                    break;
                case 'sendBackwardOrder':
                    this.parent.sendBackward();
                    break;
            }
        }
    };
    DiagramContextMenu.prototype.contextMenuOnClose = function (args) {
        var parent = 'parentObj';
        if (args.items.length > 0 && args.items[0][parent] instanceof Menu) {
            this.updateItemStatus();
        }
    };
    DiagramContextMenu.prototype.getLocaleText = function (item) {
        return this.l10n.getConstant(this.localeText[item]);
    };
    DiagramContextMenu.prototype.updateItemStatus = function () {
        this.contextMenu.showItems(this.hiddenItems, true);
        this.contextMenu.enableItems(this.disableItems, false, true);
        this.hiddenItems = [];
        this.disableItems = [];
        this.isOpen = false;
    };
    DiagramContextMenu.prototype.ensureItems = function (item, event) {
        var key = this.getKeyFromId(item.id);
        var dItem = this.defaultItems[key];
        if (this.getDefaultItems().indexOf(key) !== -1) {
            if (item.target && event &&
                !this.ensureTarget(item)) {
                this.hiddenItems.push(item.id);
            }
        }
    };
    DiagramContextMenu.prototype.contextMenuBeforeOpen = function (args) {
        var diagramArgs = args;
        diagramArgs.hiddenItems = [];
        for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
            var item = _a[_i];
            this.ensureItems(item, args.event);
            if (item.items.length) {
                for (var _b = 0, _c = item.items; _b < _c.length; _b++) {
                    var newItem = _c[_b];
                    this.ensureItems(newItem, args.event);
                }
            }
        }
        this.eventArgs = args.event;
        this.parent.trigger(contextMenuOpen, diagramArgs);
        var hidden = true;
        this.hiddenItems = this.hiddenItems.concat(diagramArgs.hiddenItems);
        this.contextMenu.enableItems(this.disableItems, false, true);
        var contextItems = this;
        args.items.forEach(function (item) {
            if (contextItems.hiddenItems.indexOf(item.id) > -1) {
                contextItems.contextMenu.hideItems([item.id], true);
            }
        });
        contextItems.contextMenu.items.forEach(function (item) {
            if (contextItems.hiddenItems.indexOf(item.id) === -1) {
                hidden = false;
                contextItems.contextMenu.showItems([item.id], true);
            }
        });
        if (hidden) {
            diagramArgs.cancel = hidden;
            this.hiddenItems = [];
        }
    };
    DiagramContextMenu.prototype.ensureTarget = function (item) {
        var selectedLength = this.parent.selectedItems.nodes.length +
            this.parent.selectedItems.connectors.length;
        var itemText = this.getKeyFromId(item.id);
        var target = false;
        switch (itemText) {
            case 'undo':
                target = this.parent.historyManager && this.parent.historyManager.canUndo ? true : false;
                break;
            case 'redo':
                target = this.parent.historyManager && this.parent.historyManager.canRedo ? true : false;
                break;
            case 'paste':
                target = this.parent.commandHandler.clipboardData.clipObject ? true : false;
                break;
            case 'selectAll':
                target = this.parent.nodes.length + this.parent.connectors.length ? true : false;
                break;
            case 'grouping':
                target = ((selectedLength > 1) || (this.parent.selectedItems.nodes[0] && this.parent.selectedItems.nodes[0].children
                    && this.parent.selectedItems.nodes[0].children.length > 1)) ? true : false;
                break;
            case 'group':
                target = selectedLength > 1;
                break;
            case 'unGroup':
                target = ((this.parent.selectedItems.nodes[0] && this.parent.selectedItems.nodes[0].children
                    && this.parent.selectedItems.nodes[0].children.length > 1)) ? true : false;
                break;
            case 'cut':
            case 'copy':
            case 'order':
            case 'bringToFrontOrder':
            case 'moveForwardOrder':
            case 'sendToBackOrder':
            case 'sendBackwardOrder':
                target = selectedLength ? true : false;
                break;
        }
        return target;
    };
    /**
     * To destroy the Context menu.
     * @method destroy
     * @return {void}
     * @private
     */
    DiagramContextMenu.prototype.destroy = function () {
        this.contextMenu.destroy();
        remove(this.element);
        this.removeEventListener();
    };
    DiagramContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    DiagramContextMenu.prototype.generateID = function (item) {
        return this.parent.element.id + '_contextMenu_' + item;
    };
    DiagramContextMenu.prototype.getKeyFromId = function (id) {
        return id.replace(this.parent.element.id + '_contextMenu_', '');
    };
    DiagramContextMenu.prototype.buildDefaultItems = function (item) {
        var menuItem;
        switch (item) {
            case 'copy':
                menuItem = { target: menuClass.content, iconCss: menuClass.copy };
                break;
            case 'cut':
                menuItem = { target: menuClass.content, iconCss: menuClass.cut };
                break;
            case 'paste':
                menuItem = { target: menuClass.content, iconCss: menuClass.paste };
                break;
            case 'undo':
                menuItem = { target: menuClass.content, iconCss: menuClass.undo };
                break;
            case 'redo':
                menuItem = { target: menuClass.content, iconCss: menuClass.redo };
                break;
            case 'grouping':
                menuItem = { target: menuClass.content };
                break;
            case 'group':
                menuItem = { target: menuClass.content, iconCss: menuClass.group };
                break;
            case 'unGroup':
                menuItem = { target: menuClass.content, iconCss: menuClass.unGroup };
                break;
            case 'order':
                menuItem = { target: menuClass.content, iconCss: menuClass.order };
                break;
            case 'bringToFrontOrder':
                menuItem = { target: menuClass.content, iconCss: menuClass.bringToFront };
                break;
            case 'moveForwardOrder':
                menuItem = { target: menuClass.content, iconCss: menuClass.moveForward };
                break;
            case 'sendToBackOrder':
                menuItem = { target: menuClass.content, iconCss: menuClass.sendToBack };
                break;
            case 'sendBackwardOrder':
                menuItem = { target: menuClass.content, iconCss: menuClass.sendBackward };
                break;
            case 'selectAll':
                menuItem = { target: menuClass.content };
                break;
        }
        this.defaultItems[item] = {
            text: this.getLocaleText(item), id: this.generateID(item),
            target: menuItem.target, iconCss: menuItem.iconCss ? 'e-icons ' + menuItem.iconCss : ''
        };
        return this.defaultItems[item];
    };
    DiagramContextMenu.prototype.getDefaultItems = function () {
        return [
            'copy',
            'cut', 'paste', 'undo', 'redo', 'selectAll', 'grouping', 'group', 'unGroup', 'order',
            'bringToFrontOrder', 'moveForwardOrder', 'sendToBackOrder', 'sendBackwardOrder'
        ];
    };
    DiagramContextMenu.prototype.setLocaleKey = function () {
        return {
            'copy': 'Copy',
            'cut': 'Cut',
            'paste': 'Paste',
            'undo': 'Undo',
            'redo': 'Redo',
            'selectAll': 'SelectAll',
            'grouping': 'Grouping',
            'group': 'Group',
            'unGroup': 'UnGroup',
            'order': 'Order',
            'bringToFrontOrder': 'BringToFront',
            'moveForwardOrder': 'MoveForward',
            'sendToBackOrder': 'SendToBack',
            'sendBackwardOrder': 'SendBackward'
        };
    };
    return DiagramContextMenu;
}());
export { DiagramContextMenu };
