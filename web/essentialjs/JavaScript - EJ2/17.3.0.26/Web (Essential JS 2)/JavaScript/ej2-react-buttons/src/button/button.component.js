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
import * as React from 'react';
import { Button } from '@syncfusion/ej2-buttons';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * `ButtonComponent` represents the react Button Component.
 * ```ts
 * <ButtonComponent></ButtonComponent>
 * ```
 */
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    ButtonComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('button', this.getDefaultAttributes(), this.props.children);
        }
    };
    return ButtonComponent;
}(Button));
export { ButtonComponent };
applyMixins(ButtonComponent, [ComponentBase, React.PureComponent]);
