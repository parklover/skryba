import { ColorPicker as ColorPickerComponent } from '@syncfusion/ej2-inputs';
import { addClass } from '@syncfusion/ej2-base';
import { spreadsheetDestroyed, fontColor, fillColor, beforeRibbonCreate, locale, destroyComponent } from '../common/index';
import { setCellFormat } from '../../workbook/common/index';
/**
 * `Color Picker` module is used to handle ColorPicker functionality.

 */
var ColorPicker = /** @class */ (function () {
    function ColorPicker(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var id = this.parent.element.id;
        var input = this.parent.createElement('input', { attrs: { 'type': 'color' } });
        var fontColorPicker = new ColorPickerComponent({
            value: '#000000ff',
            mode: 'Palette',
            showButtons: false,
            presetColors: fontColor,
            enableOpacity: false,
            beforeClose: function (args) { return _this.beforeCloseHandler(fontColorPicker); },
            open: this.openHandler.bind(this),
            beforeModeSwitch: function (args) { return _this.beforeModeSwitch(fontColorPicker, args); },
            change: function (args) {
                var color = fontColorPicker.getValue(args.currentValue.rgba);
                var eventArgs = { style: { color: color }, onActionUpdate: true };
                _this.parent.notify(setCellFormat, eventArgs);
                if (eventArgs.cancel) {
                    fontColorPicker.setProperties({ 'value': fontColorPicker.getValue(args.previousValue.rgba, 'HEXA') }, true);
                }
                else {
                    _this.updateSelectedColor(eventArgs.style.color, fontColorPicker.element);
                }
                _this.parent.element.focus();
            },
            created: function () { return _this.wireFocusEvent(fontColorPicker.element, '#000000'); }
        });
        fontColorPicker.createElement = this.parent.createElement;
        this.parent.element.appendChild(input);
        fontColorPicker.appendTo(input);
        input.parentElement.id = id + "_font_color_picker";
        addClass([input.nextElementSibling.getElementsByClassName('e-selected-color')[0]], ['e-icons', 'e-font-color']);
        input = this.parent.createElement('input', { attrs: { 'type': 'color' } });
        var filColorPicker = new ColorPickerComponent({
            value: '#ffff00ff',
            mode: 'Palette',
            presetColors: fillColor,
            showButtons: false,
            enableOpacity: false,
            open: this.openHandler.bind(this),
            beforeClose: function (args) { return _this.beforeCloseHandler(filColorPicker); },
            beforeModeSwitch: function (args) { return _this.beforeModeSwitch(filColorPicker, args); },
            change: function (args) {
                var color = filColorPicker.getValue(args.currentValue.rgba);
                var eventArgs = { style: { backgroundColor: color }, onActionUpdate: true };
                _this.parent.notify(setCellFormat, eventArgs);
                if (eventArgs.cancel) {
                    filColorPicker.setProperties({ 'value': filColorPicker.getValue(args.previousValue.rgba, 'HEXA') }, true);
                }
                else {
                    _this.updateSelectedColor(eventArgs.style.backgroundColor, filColorPicker.element);
                }
                _this.parent.element.focus();
            },
            created: function () { return _this.wireFocusEvent(filColorPicker.element, '#ffff00'); }
        });
        filColorPicker.createElement = this.parent.createElement;
        this.parent.element.appendChild(input);
        filColorPicker.appendTo(input);
        input.parentElement.id = id + "_fill_color_picker";
        addClass([input.nextElementSibling.getElementsByClassName('e-selected-color')[0]], ['e-icons', 'e-fill-color']);
    };
    ColorPicker.prototype.updateSelectedColor = function (color, ele) {
        ele.nextElementSibling.querySelector('.e-selected-color').style.borderBottomColor = color;
    };
    ColorPicker.prototype.wireFocusEvent = function (element, color) {
        var _this = this;
        this.updateSelectedColor(color, element);
        element = element.parentElement.querySelector('.e-split-colorpicker');
        element.addEventListener('focus', function () {
            _this.parent.element.focus();
        });
    };
    ColorPicker.prototype.openHandler = function (args) {
        args.element.querySelector('.e-mode-switch-btn').title =
            this.parent.serviceLocator.getService(locale).getConstant('MoreColors');
    };
    ColorPicker.prototype.beforeCloseHandler = function (inst) {
        if (!inst.modeSwitcher) {
            inst.setProperties({ modeSwitcher: true }, true);
        }
        if (inst.showButtons) {
            inst.setProperties({ showButtons: false }, true);
        }
    };
    ColorPicker.prototype.beforeModeSwitch = function (inst, args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (args.mode === 'Picker') {
            inst.showButtons = true;
            inst.dataBind();
            args.element.querySelector('.e-apply').title = l10n.getConstant('Apply');
            args.element.querySelector('.e-cancel').title = l10n.getConstant('Cancel');
            args.element.querySelector('.e-mode-switch-btn').title = l10n.getConstant('StandardColors');
        }
        else {
            inst.showButtons = false;
            inst.dataBind();
            args.element.querySelector('.e-mode-switch-btn').title = l10n.getConstant('MoreColors');
        }
    };
    ColorPicker.prototype.destroy = function () {
        this.removeEventListener();
        var id = this.parent.element.id;
        this.destroyColorPicker(id + "_font_color_picker");
        this.destroyColorPicker(id + "_fill_color_picker");
        this.parent = null;
    };
    ColorPicker.prototype.destroyColorPicker = function (id) {
        var ele = document.getElementById(id);
        if (ele) {
            destroyComponent(ele.firstElementChild, ColorPickerComponent);
        }
    };
    ColorPicker.prototype.addEventListener = function () {
        this.parent.on(beforeRibbonCreate, this.render, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    ColorPicker.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(beforeRibbonCreate, this.render);
            this.parent.off(spreadsheetDestroyed, this.destroy);
        }
    };
    return ColorPicker;
}());
export { ColorPicker };
