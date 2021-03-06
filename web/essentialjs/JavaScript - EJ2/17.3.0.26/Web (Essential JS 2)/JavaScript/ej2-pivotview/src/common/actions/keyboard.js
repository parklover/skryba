import { KeyboardEvents, closest } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
/**
 * Keyboard interaction
 */
var CommonKeyboardInteraction = /** @class */ (function () {
    /**
     * Constructor
     */
    function CommonKeyboardInteraction(parent) {
        this.keyConfigs = {
            shiftF: 'shift+F',
            shiftS: 'shift+S',
            delete: 'delete',
            enter: 'enter'
        };
        this.parent = parent;
        this.parent.element.tabIndex = this.parent.element.tabIndex === -1 ? 0 : this.parent.element.tabIndex;
        this.keyboardModule = new KeyboardEvents(this.parent.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    CommonKeyboardInteraction.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'shiftF':
                this.processFilter(e);
                break;
            case 'shiftS':
                this.processSort(e);
                break;
            case 'delete':
                this.processDelete(e);
                break;
            case 'enter':
                this.processOpenContextMenu(e);
                break;
        }
    };
    CommonKeyboardInteraction.prototype.processOpenContextMenu = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.PIVOT_BUTTON_CLASS) &&
            closest(target, '.' + cls.VALUE_AXIS_CLASS)) {
            target.querySelector('.' + cls.AXISFIELD_ICON_CLASS).click();
            e.preventDefault();
            return;
        }
    };
    CommonKeyboardInteraction.prototype.processSort = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.PIVOT_BUTTON_CLASS) &&
            !closest(target, '.' + cls.VALUE_AXIS_CLASS) && !closest(target, '.' + cls.AXIS_FILTER_CLASS)) {
            target.querySelector('.' + cls.SORT_CLASS).click();
            e.preventDefault();
            return;
        }
    };
    CommonKeyboardInteraction.prototype.processFilter = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.PIVOT_BUTTON_CLASS) && !closest(target, '.' + cls.VALUE_AXIS_CLASS)) {
            target.querySelector('.' + cls.FILTER_COMMON_CLASS).click();
            e.preventDefault();
            return;
        }
    };
    CommonKeyboardInteraction.prototype.processDelete = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.PIVOT_BUTTON_CLASS)) {
            target.querySelector('.' + cls.REMOVE_CLASS).click();
            e.preventDefault();
            return;
        }
    };
    /**
     * To destroy the keyboard module.
     * @return {void}
     * @private
     */
    CommonKeyboardInteraction.prototype.destroy = function () {
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
        else {
            return;
        }
    };
    return CommonKeyboardInteraction;
}());
export { CommonKeyboardInteraction };
