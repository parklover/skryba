import { PureComponent, createElement } from 'react';
import { AutoComplete, ComboBox, DropDownList, ListBox, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';

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
 * The DropDownList component contains a list of predefined values, from which the user can choose a single value.
 * ```
 * <DropDownListComponent dataSource={data}/>
 * ```
 */
var DropDownListComponent = /** @class */ (function (_super) {
    __extends(DropDownListComponent, _super);
    function DropDownListComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = false;
        return _this;
    }
    DropDownListComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return DropDownListComponent;
}(DropDownList));
applyMixins(DropDownListComponent, [ComponentBase, PureComponent]);

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
 *The ComboBox component allows the user to type a value or choose an option from the list of predefined options.
 * ```
 * <ComboBoxComponent dataSource={data}/>
 * ```
 */
var ComboBoxComponent = /** @class */ (function (_super) {
    __extends$1(ComboBoxComponent, _super);
    function ComboBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = false;
        return _this;
    }
    ComboBoxComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return ComboBoxComponent;
}(ComboBox));
applyMixins(ComboBoxComponent, [ComponentBase, PureComponent]);

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
 *The AutoComplete component provides the matched suggestion list when type into the input, from which the user can select one.
 * ```
 * <AutoCompleteComponent dataSource={data}/>
 * ```
 */
var AutoCompleteComponent = /** @class */ (function (_super) {
    __extends$2(AutoCompleteComponent, _super);
    function AutoCompleteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = false;
        return _this;
    }
    AutoCompleteComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return AutoCompleteComponent;
}(AutoComplete));
applyMixins(AutoCompleteComponent, [ComponentBase, PureComponent]);

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
* The MultiSelect allows the user to pick a values from the predefined list of values.
 * ```
 * <MultiSelectComponent dataSource={data}/>
 * ```
 */
var MultiSelectComponent = /** @class */ (function (_super) {
    __extends$3(MultiSelectComponent, _super);
    function MultiSelectComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = false;
        return _this;
    }
    MultiSelectComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return MultiSelectComponent;
}(MultiSelect));
applyMixins(MultiSelectComponent, [ComponentBase, PureComponent]);

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
* The ListBox allows the user to select values from the predefined list of values.
 * ```
 * <ListBoxComponent dataSource={data} />
 * ```
 */
var ListBoxComponent = /** @class */ (function (_super) {
    __extends$4(ListBoxComponent, _super);
    function ListBoxComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = false;
        return _this;
    }
    ListBoxComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('input', this.getDefaultAttributes());
        }
    };
    return ListBoxComponent;
}(ListBox));
applyMixins(ListBoxComponent, [ComponentBase, PureComponent]);

export { DropDownListComponent, ComboBoxComponent, AutoCompleteComponent, MultiSelectComponent, ListBoxComponent };
export * from '@syncfusion/ej2-dropdowns';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-dropdowns.es5.js.map
