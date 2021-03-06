import { KeyboardEvents, closest, addClass, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
/**
 * PivotView Keyboard interaction
 */
var KeyboardInteraction = /** @class */ (function () {
    /**
     * Constructor
     */
    function KeyboardInteraction(parent) {
        this.keyConfigs = {
            tab: 'tab',
            enter: 'enter',
            shiftUp: 'shift+upArrow',
            shiftDown: 'shift+downArrow',
            shiftLeft: 'shift+leftArrow',
            shiftRight: 'shift+rightArrow',
            upArrow: 'upArrow',
            downArrow: 'downArrow',
            leftArrow: 'leftArrow',
            rightArrow: 'rightArrow',
            escape: 'escape'
        };
        this.parent = parent;
        this.parent.element.tabIndex = this.parent.element.tabIndex === -1 ? 0 : this.parent.element.tabIndex;
        this.pivotViewKeyboardModule = new KeyboardEvents(this.parent.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    }
    KeyboardInteraction.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'tab':
                this.processTab(e);
                break;
            case 'enter':
                this.processEnter(e);
                break;
            case 'shiftUp':
            case 'shiftDown':
            case 'shiftLeft':
            case 'shiftRight':
            case 'upArrow':
            case 'downArrow':
            case 'leftArrow':
            case 'rightArrow':
                this.processSelection(e);
                break;
            case 'escape':
                this.clearSelection();
                break;
        }
    };
    KeyboardInteraction.prototype.getNextButton = function (target) {
        var allPivotButtons = [].slice.call(this.parent.element.querySelectorAll('.' + cls.PIVOT_BUTTON_CLASS));
        var nextElement = target;
        if (this.parent.grid.element.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            var len = allPivotButtons.length;
            for (var i = 0; i < len; i++) {
                if (allPivotButtons[i].getAttribute('data-uid') === target.getAttribute('data-uid')) {
                    nextElement = allPivotButtons[i + 1] ? allPivotButtons[i + 1] : nextElement;
                    break;
                }
            }
        }
        return nextElement;
    };
    KeyboardInteraction.prototype.processTab = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.PIVOT_BUTTON_CLASS)) {
            var gridFocus = this.parent.grid.serviceLocator.getService('focus');
            var nextButton = this.getNextButton(target);
            if (nextButton.getAttribute('data-uid') !== target.getAttribute('data-uid')) {
                gridFocus.currentInfo.skipAction = true;
                nextButton.focus();
            }
            else {
                gridFocus.focus();
                var element = gridFocus.getFocusedElement();
                addClass([element], ['e-focused', 'e-focus']);
                element.setAttribute('tabindex', '0');
            }
            e.preventDefault();
            return;
        }
        else if (!this.parent.showGroupingBar && this.parent.showFieldList) {
            if (target && closest(target, '.' + cls.TOGGLE_FIELD_LIST_CLASS)) {
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                gridFocus.focus();
                var element = gridFocus.getFocusedElement();
                addClass([element], ['e-focused', 'e-focus']);
                element.setAttribute('tabindex', '0');
            }
        }
        else if (!this.parent.showGroupingBar && !this.parent.showFieldList) {
            if (target && closest(target, '.' + cls.PIVOT_VIEW_CLASS)) {
                var gridElement = closest(target, '.' + cls.PIVOT_VIEW_CLASS);
                var gridFocus = this.parent.grid.serviceLocator.getService('focus');
                var rows = [].slice.call(gridElement.getElementsByTagName('tr'));
                if (target.innerHTML === (rows[rows.length - 1]).lastChild.innerHTML) {
                    gridFocus.currentInfo.skipAction = true;
                }
                else {
                    gridFocus.focus();
                    var element = gridFocus.getFocusedElement();
                    addClass([element], ['e-focused', 'e-focus']);
                    element.setAttribute('tabindex', '0');
                }
            }
        }
    };
    KeyboardInteraction.prototype.processEnter = function (e) {
        var target = e.target;
        if (target && closest(target, '.' + cls.GRID_CLASS)) {
            if (target.querySelector('.' + cls.ICON)) {
                target.querySelector('.' + cls.ICON).click();
            }
            else if (target.classList.contains('e-valuescontent')) {
                target.dispatchEvent(new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                }));
            }
            e.preventDefault();
            return;
        }
    };
    KeyboardInteraction.prototype.clearSelection = function () {
        var control = this.parent;
        /* tslint:disable */
        [].slice.call(control.element.querySelectorAll('.' + cls.CELL_SELECTED_BGCOLOR + ',.' + cls.SELECTED_BGCOLOR)).forEach(function (ele) {
            ele.classList.remove(cls.SELECTED_BGCOLOR);
            ele.classList.remove(cls.CELL_SELECTED_BGCOLOR);
            ele.classList.remove(cls.CELL_ACTIVE_BGCOLOR);
        });
        this.parent.renderModule.selected();
        /* tslint:enable */
    };
    KeyboardInteraction.prototype.processSelection = function (e) {
        if (this.parent.gridSettings.allowSelection && this.parent.gridSettings.selectionSettings.mode !== 'Row') {
            var target = e.target;
            var control_1 = this.parent;
            var colIndex_1 = Number(e.target.getAttribute('aria-colIndex'));
            var rowIndex_1 = Number(e.target.getAttribute('index'));
            var ele_1;
            /* tslint:disable */
            if (target.nodeName === 'TH' || target.nodeName === 'TD') {
                if (e.action === 'shiftUp' || e.action === 'upArrow') {
                    ele_1 = (rowIndex_1 === 0 || colIndex_1 === 0 || (target.nodeName !== 'TH' &&
                        control_1.renderModule.rowStartPos !== rowIndex_1)) ? null : this.getParentElement(control_1, ele_1, colIndex_1, rowIndex_1 - 1);
                }
                else if (e.action === 'shiftDown' || e.action === 'downArrow') {
                    ele_1 = control_1.element.querySelector('th[aria-colindex="' + colIndex_1 + '"][index="' + (rowIndex_1 + 1) + '"]');
                }
                else if (e.action === 'shiftLeft' || e.action === 'leftArrow') {
                    ele_1 = e.target.previousSibling;
                }
                else {
                    ele_1 = e.target.nextSibling;
                }
            }
            if (!isNullOrUndefined(ele_1)) {
                if (control_1.gridSettings.selectionSettings.mode === 'Both' ? !ele_1.classList.contains(cls.ROW_CELL_CLASS) : true) {
                    colIndex_1 = Number(ele_1.getAttribute('aria-colindex'));
                    rowIndex_1 = Number(ele_1.getAttribute('index'));
                    var colSpan_1 = Number(ele_1.getAttribute('aria-colspan'));
                    control_1.clearSelection(ele_1, e, colIndex_1, rowIndex_1);
                    var selectArgs = {
                        cancel: false,
                        isCellClick: true,
                        currentCell: ele_1,
                        data: control_1.pivotValues[rowIndex_1][colIndex_1]
                    };
                    control_1.trigger(events.cellSelecting, selectArgs, function (observedArgs) {
                        if (!observedArgs.cancel) {
                            control_1.applyColumnSelection(e, ele_1, colIndex_1, colIndex_1 + (colSpan_1 > 0 ? (colSpan_1 - 1) : 0), rowIndex_1);
                        }
                    });
                }
                else {
                    control_1.clearSelection(ele_1, e, colIndex_1, rowIndex_1);
                }
            }
            else {
                if (e.action === 'upArrow') {
                    ele_1 = control_1.element.querySelector('[aria-colindex="' + colIndex_1 + '"][index="' + (rowIndex_1 - 1) + '"]');
                    rowIndex_1--;
                }
                else if (e.action === 'downArrow') {
                    ele_1 = control_1.element.querySelector('[aria-colindex="' + colIndex_1 + '"][index="' + (rowIndex_1 + 1) + '"]');
                    rowIndex_1++;
                }
                if (!isNullOrUndefined(ele_1)) {
                    control_1.clearSelection(ele_1, e, colIndex_1, rowIndex_1);
                }
            }
        }
        /* tslint:enable */
    };
    KeyboardInteraction.prototype.getParentElement = function (control, ele, colIndex, rowIndex) {
        while (!ele) {
            ele = control.element.querySelector('[aria-colindex="' + colIndex + '"][index="' + rowIndex + '"]');
            colIndex--;
        }
        return ele;
    };
    /**
     * To destroy the keyboard module.
     * @return {void}
     * @private
     */
    KeyboardInteraction.prototype.destroy = function () {
        if (this.pivotViewKeyboardModule) {
            this.pivotViewKeyboardModule.destroy();
        }
        else {
            return;
        }
    };
    return KeyboardInteraction;
}());
export { KeyboardInteraction };
