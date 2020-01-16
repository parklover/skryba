var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { InPlaceEditor } from '@syncfusion/ej2-inplace-editor';
export var properties = ['actionOnBlur', 'adaptor', 'cancelButton', 'cssClass', 'disabled', 'editableOn', 'emptyText', 'enableEditMode', 'enablePersistence', 'enableRtl', 'locale', 'mode', 'model', 'name', 'popupSettings', 'primaryKey', 'saveButton', 'showButtons', 'submitOnEnter', 'template', 'type', 'url', 'validationRules', 'value', 'actionBegin', 'actionFailure', 'actionSuccess', 'beginEdit', 'created', 'destroyed', 'validating'];
export var modelProps = [];
/**
 * `ejs-inplace-editor` represents the VueJS InPlaceEditor Component.
 * ```vue
 * <ejs-inplaceeditor></ejs-inplaceeditor>
 * ```
 */
var InPlaceEditorComponent = /** @class */ (function (_super) {
    __extends(InPlaceEditorComponent, _super);
    function InPlaceEditorComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = true;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new InPlaceEditor({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    InPlaceEditorComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    InPlaceEditorComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    InPlaceEditorComponent.prototype.extendModelValue = function (val) {
        return this.ej2Instances.extendModelValue(val);
    };
    InPlaceEditorComponent.prototype.save = function () {
        return this.ej2Instances.save();
    };
    InPlaceEditorComponent.prototype.setValue = function () {
        return this.ej2Instances.setValue();
    };
    InPlaceEditorComponent.prototype.validate = function () {
        return this.ej2Instances.validate();
    };
    InPlaceEditorComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], InPlaceEditorComponent);
    return InPlaceEditorComponent;
}(ComponentBase));
export { InPlaceEditorComponent };
export var InPlaceEditorPlugin = {
    name: 'ejs-inplaceeditor',
    install: function (Vue) {
        Vue.component(InPlaceEditorPlugin.name, InPlaceEditorComponent);
    }
};
