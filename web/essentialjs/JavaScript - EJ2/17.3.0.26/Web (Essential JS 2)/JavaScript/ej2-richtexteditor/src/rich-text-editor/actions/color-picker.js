import { select, detach, extend } from '@syncfusion/ej2-base';
import { RenderType } from '../base/enum';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { getIndex, toObjectLowerCase } from '../base/util';
import { templateItems, tools } from '../models/items';
/**
 * `Color Picker` module is used to handle ColorPicker actions.
 */
var ColorPickerInput = /** @class */ (function () {
    function ColorPickerInput(parent, serviceLocator) {
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
    ColorPickerInput.prototype.initializeInstance = function () {
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
    };
    ColorPickerInput.prototype.renderColorPickerInput = function (args) {
        var _this = this;
        this.initializeInstance();
        var suffixID = args.containerType;
        var tbElement = args.container;
        var targetID;
        var options;
        templateItems.forEach(function (item) {
            if (getIndex(item, args.items) !== -1) {
                switch (item) {
                    case 'fontcolor':
                        targetID = _this.parent.getID() + '_' + suffixID + '_FontColor_Target';
                        var fontNode = _this.parent.createElement('input');
                        fontNode.id = targetID;
                        fontNode.classList.add(classes.CLS_FONT_COLOR_TARGET);
                        document.body.appendChild(fontNode);
                        options = {
                            cssClass: _this.tools[item.toLocaleLowerCase()].icon
                                + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            value: _this.tools[item.toLocaleLowerCase()].value,
                            command: _this.tools[item.toLocaleLowerCase()].command,
                            subCommand: _this.tools[item.toLocaleLowerCase()].subCommand,
                            element: select('#' + _this.parent.getID() + '_' + suffixID + '_FontColor', tbElement),
                            target: ('#' + targetID)
                        };
                        _this.fontColorPicker = _this.toolbarRenderer.renderColorPicker(options, 'fontcolor');
                        _this.fontColorDropDown = _this.toolbarRenderer.renderColorPickerDropDown(options, 'fontcolor', _this.fontColorPicker);
                        break;
                    case 'backgroundcolor':
                        targetID = _this.parent.getID() + '_' + suffixID + '_BackgroundColor_Target';
                        var backNode = _this.parent.createElement('input');
                        backNode.id = targetID;
                        backNode.classList.add(classes.CLS_BACKGROUND_COLOR_TARGET);
                        document.body.appendChild(backNode);
                        options = {
                            cssClass: _this.tools[item.toLocaleLowerCase()].icon
                                + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            value: _this.tools[item.toLocaleLowerCase()].value,
                            command: _this.tools[item.toLocaleLowerCase()].command,
                            subCommand: _this.tools[item.toLocaleLowerCase()].subCommand,
                            element: select('#' + _this.parent.getID() + '_' + suffixID + '_BackgroundColor', tbElement),
                            target: ('#' + targetID)
                        };
                        _this.backgroundColorPicker = _this.toolbarRenderer.renderColorPicker(options, 'backgroundcolor');
                        _this.backgroundColorDropDown = _this.toolbarRenderer.renderColorPickerDropDown(options, 'backgroundcolor', _this.backgroundColorPicker);
                        break;
                }
            }
        });
    };
    ColorPickerInput.prototype.destroy = function () {
        this.removeEventListener();
        this.destroyColorPicker();
    };
    ColorPickerInput.prototype.destroyColorPicker = function () {
        if (this.fontColorPicker && !this.fontColorPicker.isDestroyed) {
            this.fontColorPicker.destroy();
        }
        if (this.backgroundColorPicker && !this.backgroundColorPicker.isDestroyed) {
            this.backgroundColorPicker.destroy();
        }
        if (this.fontColorDropDown && !this.fontColorDropDown.isDestroyed) {
            var innerEle = this.fontColorDropDown.element.querySelector('.e-rte-color-content');
            if (innerEle) {
                detach(innerEle);
            }
            this.fontColorDropDown.destroy();
        }
        if (this.backgroundColorDropDown && !this.backgroundColorDropDown.isDestroyed) {
            var innerEle = this.backgroundColorDropDown.element.querySelector('.e-rte-color-content');
            if (innerEle) {
                detach(innerEle);
            }
            this.backgroundColorDropDown.destroy();
        }
    };
    ColorPickerInput.prototype.setRtl = function (args) {
        if (this.fontColorPicker) {
            this.fontColorPicker.setProperties({ enableRtl: args.enableRtl });
            this.fontColorDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.backgroundColorPicker) {
            this.backgroundColorPicker.setProperties({ enableRtl: args.enableRtl });
            this.backgroundColorDropDown.setProperties({ enableRtl: args.enableRtl });
        }
    };
    ColorPickerInput.prototype.addEventListener = function () {
        this.parent.on(events.toolbarRenderComplete, this.renderColorPickerInput, this);
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.destroyColorPicker, this.destroyColorPicker, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
    };
    ColorPickerInput.prototype.onPropertyChanged = function (model) {
        var newProp = model.newProp;
        var element;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'fontColor':
                    if (this.fontColorPicker) {
                        for (var _b = 0, _c = Object.keys(newProp.fontColor); _b < _c.length; _b++) {
                            var font = _c[_b];
                            switch (font) {
                                case 'default':
                                    this.fontColorPicker.setProperties({ value: newProp.fontColor.default });
                                    element = this.fontColorDropDown.element;
                                    var fontBorder = element.querySelector('.' + this.tools['fontcolor'].icon);
                                    fontBorder.style.borderBottomColor = newProp.fontColor.default;
                                    break;
                                case 'mode':
                                    this.fontColorPicker.setProperties({ mode: newProp.fontColor.mode });
                                    break;
                                case 'columns':
                                    this.fontColorPicker.setProperties({ columns: newProp.fontColor.columns });
                                    break;
                                case 'colorCode':
                                    this.fontColorPicker.setProperties({ presetColors: newProp.fontColor.colorCode });
                                    break;
                                case 'modeSwitcher':
                                    this.fontColorPicker.setProperties({ modeSwitcher: newProp.fontColor.modeSwitcher });
                                    break;
                            }
                        }
                    }
                    break;
                case 'backgroundColor':
                    if (this.backgroundColorPicker) {
                        for (var _d = 0, _e = Object.keys(newProp.backgroundColor); _d < _e.length; _d++) {
                            var background = _e[_d];
                            switch (background) {
                                case 'default':
                                    this.backgroundColorPicker.setProperties({ value: newProp.backgroundColor.default });
                                    element = this.backgroundColorDropDown.element;
                                    var backgroundBorder = element.querySelector('.' + this.tools['backgroundcolor'].icon);
                                    backgroundBorder.style.borderBottomColor = newProp.backgroundColor.default;
                                    break;
                                case 'mode':
                                    this.backgroundColorPicker.setProperties({ mode: newProp.backgroundColor.mode });
                                    break;
                                case 'columns':
                                    this.backgroundColorPicker.setProperties({ columns: newProp.backgroundColor.columns });
                                    break;
                                case 'colorCode':
                                    this.backgroundColorPicker.setProperties({ presetColors: newProp.backgroundColor.colorCode });
                                    break;
                                case 'modeSwitcher':
                                    this.backgroundColorPicker.setProperties({ modeSwitcher: newProp.backgroundColor.modeSwitcher });
                                    break;
                            }
                        }
                    }
                    break;
            }
        }
    };
    ColorPickerInput.prototype.removeEventListener = function () {
        this.parent.off(events.toolbarRenderComplete, this.renderColorPickerInput);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.destroyColorPicker, this.destroyColorPicker);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
    };
    return ColorPickerInput;
}());
export { ColorPickerInput };
