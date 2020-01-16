import { PureComponent, createElement } from 'react';
import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';
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
 * `RichTextEditor` represents the react RichTextEditor.
 * ```tsx
 * <RichTextEditor/>
 * ```
 */
var RichTextEditorComponent = /** @class */ (function (_super) {
    __extends(RichTextEditorComponent, _super);
    function RichTextEditorComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = false;
        return _this;
    }
    RichTextEditorComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return RichTextEditorComponent;
}(RichTextEditor));
applyMixins(RichTextEditorComponent, [ComponentBase, PureComponent]);

export { RichTextEditorComponent };
export * from '@syncfusion/ej2-richtexteditor';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-richtexteditor.es5.js.map
