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
import { Uploader } from '@syncfusion/ej2-inputs';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents the React Uploader Component
 * ```html
 * <UploaderComponent></UploaderComponent>
 * ```
 */
var UploaderComponent = /** @class */ (function (_super) {
    __extends(UploaderComponent, _super);
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
            return React.createElement('input', this.getDefaultAttributes());
        }
    };
    return UploaderComponent;
}(Uploader));
export { UploaderComponent };
applyMixins(UploaderComponent, [ComponentBase, React.PureComponent]);