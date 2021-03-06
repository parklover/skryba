import { RenderType } from '../base/enum';
import { CLS_HR_SEPARATOR } from '../base/classes';
import * as events from '../base/constant';
import { getTooltipText, toObjectLowerCase } from '../base/util';
import { tools, templateItems } from '../models/items';
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
var BaseToolbar = /** @class */ (function () {
    function BaseToolbar(parent, serviceLocator) {
        this.tools = {};
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        if (this.parent.toolbarSettings && Object.keys(this.parent.toolbarSettings.itemConfigs).length > 0) {
            extend(this.tools, tools, toObjectLowerCase(this.parent.toolbarSettings.itemConfigs), true);
        }
        else {
            this.tools = tools;
        }
    }
    BaseToolbar.prototype.addEventListener = function () {
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.destroy, this.removeEventListener, this);
    };
    BaseToolbar.prototype.removeEventListener = function () {
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.destroy, this.removeEventListener);
    };
    BaseToolbar.prototype.setRtl = function (args) {
        if (!isNullOrUndefined(this.toolbarObj)) {
            this.toolbarObj.setProperties({ enableRtl: args.enableRtl });
        }
    };
    BaseToolbar.prototype.getTemplateObject = function (itemStr, container) {
        var tagName;
        switch (itemStr) {
            case 'fontcolor':
            case 'backgroundcolor':
                tagName = 'span';
                break;
            default:
                tagName = 'button';
                break;
        }
        return {
            command: this.tools[itemStr.toLocaleLowerCase()].command,
            subCommand: this.tools[itemStr.toLocaleLowerCase()].subCommand,
            template: this.parent.createElement(tagName, {
                id: this.parent.getID() + '_' + container
                    + '_' + this.tools[itemStr.toLocaleLowerCase()].id
            }).outerHTML,
            tooltipText: getTooltipText(itemStr, this.locator)
        };
    };
    BaseToolbar.prototype.getObject = function (item, container) {
        var itemStr = item.toLowerCase();
        if (templateItems.indexOf(itemStr) !== -1) {
            return this.getTemplateObject(itemStr, container);
        }
        else {
            switch (itemStr) {
                case '|':
                    return { type: 'Separator' };
                case '-':
                    return { type: 'Separator', cssClass: CLS_HR_SEPARATOR };
                default:
                    return {
                        id: this.parent.getID() + '_' + container + '_' + this.tools[itemStr.toLocaleLowerCase()].id,
                        prefixIcon: this.tools[itemStr.toLocaleLowerCase()].icon,
                        tooltipText: getTooltipText(itemStr, this.locator),
                        command: this.tools[itemStr.toLocaleLowerCase()].command,
                        subCommand: this.tools[itemStr.toLocaleLowerCase()].subCommand
                    };
            }
        }
    };
    /**

     */
    BaseToolbar.prototype.getItems = function (tbItems, container) {
        if (this.parent.toolbarSettings.items.length < 1) {
            return [];
        }
        var items = [];
        for (var _i = 0, tbItems_1 = tbItems; _i < tbItems_1.length; _i++) {
            var item = tbItems_1[_i];
            switch (typeof item) {
                case 'string':
                    items.push(this.getObject(item, container));
                    break;
                default:
                    items.push(item);
            }
        }
        return items;
    };
    BaseToolbar.prototype.getToolbarOptions = function (args) {
        return {
            target: args.target,
            rteToolbarObj: this,
            items: this.getItems(args.items, args.container),
            overflowMode: args.mode,
            enablePersistence: this.parent.enablePersistence,
            enableRtl: this.parent.enableRtl
        };
    };
    BaseToolbar.prototype.render = function (args) {
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
        this.toolbarRenderer.renderToolbar(this.getToolbarOptions(args));
    };
    return BaseToolbar;
}());
export { BaseToolbar };
