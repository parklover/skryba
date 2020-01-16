import { PureComponent, createElement } from 'react';
import { PivotFieldList, PivotView } from '@syncfusion/ej2-pivotview';
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
 * `PivotViewComponent` represents the react PivotView.
 * ```tsx
 * <PivotViewComponent/>
 * ```
 */
var PivotViewComponent = /** @class */ (function (_super) {
    __extends(PivotViewComponent, _super);
    function PivotViewComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = false;
        return _this;
    }
    PivotViewComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return PivotViewComponent;
}(PivotView));
applyMixins(PivotViewComponent, [ComponentBase, PureComponent]);

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
 * `PivotFieldListComponent` represents the react PivotFieldList.
 * ```tsx
 * <PivotFieldListComponent/>
 * ```
 */
var PivotFieldListComponent = /** @class */ (function (_super) {
    __extends$1(PivotFieldListComponent, _super);
    function PivotFieldListComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = true;
        return _this;
    }
    PivotFieldListComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return PivotFieldListComponent;
}(PivotFieldList));
applyMixins(PivotFieldListComponent, [ComponentBase, PureComponent]);

export { PivotViewComponent, PivotFieldListComponent };
export * from '@syncfusion/ej2-pivotview';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-pivotview.es5.js.map
