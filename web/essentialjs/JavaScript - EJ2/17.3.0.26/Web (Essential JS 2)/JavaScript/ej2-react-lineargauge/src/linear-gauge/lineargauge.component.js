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
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents react Linear Gauge Component
 * ```tsx
 * <LinearGaugeComponent></LinearGaugeComponent>
 * ```
 */
var LinearGaugeComponent = /** @class */ (function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'axes': { 'axis': { 'ranges': 'range', 'pointers': 'pointer' } }, 'annotations': 'annotation' };
        _this.immediateRender = false;
        return _this;
    }
    LinearGaugeComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return LinearGaugeComponent;
}(LinearGauge));
export { LinearGaugeComponent };
applyMixins(LinearGaugeComponent, [ComponentBase, React.PureComponent]);
