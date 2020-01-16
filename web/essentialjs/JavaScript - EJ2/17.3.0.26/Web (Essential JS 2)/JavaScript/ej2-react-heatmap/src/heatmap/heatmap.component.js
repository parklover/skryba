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
import { HeatMap } from '@syncfusion/ej2-heatmap';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents react HeatMap Component
 * ```tsx
 * <HeatMapComponent></HeatMapComponent>
 * ```
 */
var HeatMapComponent = /** @class */ (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = true;
        return _this;
    }
    HeatMapComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return HeatMapComponent;
}(HeatMap));
export { HeatMapComponent };
applyMixins(HeatMapComponent, [ComponentBase, React.PureComponent]);
