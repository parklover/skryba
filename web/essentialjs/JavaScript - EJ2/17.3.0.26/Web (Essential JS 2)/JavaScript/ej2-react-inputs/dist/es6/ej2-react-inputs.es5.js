import { PureComponent, createElement } from 'react';
import { ColorPicker, MaskedTextBox, NumericTextBox, Slider, TextBox, Uploader } from '@syncfusion/ej2-inputs';
import { ComplexBase, ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React TextBox Component
 * ```html
 * <TextBox value={value}></TextBox>
 * ```
 */
var TextBoxComponent = /** @class */ (function (_super) {
    __extends(TextBoxComponent, _super);
    function TextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    TextBoxComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return TextBoxComponent;
}(TextBox));
applyMixins(TextBoxComponent, [ComponentBase, PureComponent]);

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React NumericTextBox Component
 * ```html
 * <NumericTextBox value={value}></NumericTextBox>
 * ```
 */
var NumericTextBoxComponent = /** @class */ (function (_super) {
    __extends$1(NumericTextBoxComponent, _super);
    function NumericTextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    NumericTextBoxComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return NumericTextBoxComponent;
}(NumericTextBox));
applyMixins(NumericTextBoxComponent, [ComponentBase, PureComponent]);

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React MaskedTextBox Component
 * ```html
 * <MaskedTextBox value={value}></MaskedTextBox>
 * ```
 */
var MaskedTextBoxComponent = /** @class */ (function (_super) {
    __extends$2(MaskedTextBoxComponent, _super);
    function MaskedTextBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.controlAttributes = ['name'];
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    MaskedTextBoxComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return MaskedTextBoxComponent;
}(MaskedTextBox));
applyMixins(MaskedTextBoxComponent, [ComponentBase, PureComponent]);

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Slider Component
 * ```html
 * <Slider value={value}></Slider>
 * ```
 */
var SliderComponent = /** @class */ (function (_super) {
    __extends$3(SliderComponent, _super);
    function SliderComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.controlAttributes = ['name'];
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    SliderComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return SliderComponent;
}(Slider));
applyMixins(SliderComponent, [ComponentBase, PureComponent]);

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `FilesDirective` represent a file of the react uploader.
 * It must be contained in a Uploader component(`UploaderComponent`).
 * ```tsx
 * <UploaderComponent multiple={true}>
 *   <FilesDirective>
 *    <FileDirective name='Java' size=23000 type='pdf'><FileDirective>
 *    <FileDirective name='C++' size=30000 type='.docx'><FileDirective>
 *   </FilesDirective>
 * </UploaderComponent>
 * ```
 */
var UploadedFilesDirective = /** @class */ (function (_super) {
    __extends$4(UploadedFilesDirective, _super);
    function UploadedFilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadedFilesDirective.moduleName = 'uploadedFiles';
    return UploadedFilesDirective;
}(ComplexBase));
var FilesDirective = /** @class */ (function (_super) {
    __extends$4(FilesDirective, _super);
    function FilesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilesDirective.propertyName = 'files';
    FilesDirective.moduleName = 'files';
    return FilesDirective;
}(ComplexBase));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React Uploader Component
 * ```html
 * <UploaderComponent></UploaderComponent>
 * ```
 */
var UploaderComponent = /** @class */ (function (_super) {
    __extends$5(UploaderComponent, _super);
    function UploaderComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'files': 'uploadedFiles' };
        _this.immediateRender = false;
        return _this;
    }
    UploaderComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return UploaderComponent;
}(Uploader));
applyMixins(UploaderComponent, [ComponentBase, PureComponent]);

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Represents the React ColorPicker Component
 * ```html
 * <ColorPickerComponent></ColorPickerComponent>
 * ```
 */
var ColorPickerComponent = /** @class */ (function (_super) {
    __extends$6(ColorPickerComponent, _super);
    function ColorPickerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    ColorPickerComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return ColorPickerComponent;
}(ColorPicker));
applyMixins(ColorPickerComponent, [ComponentBase, PureComponent]);

export { TextBoxComponent, NumericTextBoxComponent, MaskedTextBoxComponent, SliderComponent, UploadedFilesDirective, FilesDirective, UploaderComponent, ColorPickerComponent };
export * from '@syncfusion/ej2-inputs';
//# sourceMappingURL=ej2-react-inputs.es5.js.map
