import { RenderType } from '../base/enum';
import * as events from '../base/constant';
/**
 * Content module is used to render RichTextEditor content

 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function Render(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.renderer = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    /**
     * To initialize RichTextEditor header, content and footer rendering
     */
    Render.prototype.render = function () {
        var rteObj = this.parent;
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.contentRenderer.renderPanel();
    };
    /**
     * Refresh the entire RichTextEditor.
     * @return {void}
     */
    Render.prototype.refresh = function (e) {
        if (e === void 0) { e = { requestType: 'refresh' }; }
        this.parent.notify(e.requestType + "-begin", e);
    };
    /**
     * Destroy the entire RichTextEditor.
     * @return {void}
     */
    Render.prototype.destroy = function () {
        this.removeEventListener();
    };
    Render.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.modelChanged, this.refresh, this);
        this.parent.on(events.keyUp, this.keyUp, this);
    };
    Render.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.modelChanged, this.refresh);
        this.parent.off(events.keyUp, this.keyUp);
    };
    Render.prototype.keyUp = function (e) {
        if (this.parent.editorMode === 'HTML') {
            switch (e.args.which) {
                case 46:
                case 8:
                    var childNodes = this.parent.contentModule.getEditPanel().childNodes;
                    if ((childNodes.length === 0) ||
                        (childNodes.length === 1 && ((childNodes[0].tagName === 'BR') ||
                            (childNodes[0].tagName === 'P' &&
                                (childNodes[0].childNodes.length === 0 || childNodes[0].textContent === ''))))) {
                        var node = this.parent.contentModule.getEditPanel();
                        node.innerHTML = '<p><br/></p>';
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), node.childNodes[0], 0);
                    }
                    break;
            }
        }
    };
    return Render;
}());
export { Render };