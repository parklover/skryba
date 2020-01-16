import { getEditValue } from '../base/util';
/**
 * Content module is used to render RichTextEditor content

 */
var ContentRender = /** @class */ (function () {
    /**
     * Constructor for content renderer module
     */
    function ContentRender(parent, serviceLocator) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
    }
    /**
     * The function is used to render RichTextEditor content div
     */
    ContentRender.prototype.renderPanel = function () {
        var rteObj = this.parent;
        var div = this.parent.createElement('div', { className: 'e-rte-content', id: this.parent.getID() + 'rte-view' });
        var rteContent = getEditValue(rteObj.value, rteObj);
        this.editableElement = this.parent.createElement('div', {
            className: 'e-content',
            id: this.parent.getID() + '_rte-edit-view',
            attrs: {
                'contenteditable': 'true'
            },
            innerHTML: rteContent
        });
        div.appendChild(this.editableElement);
        this.setPanel(div);
        rteObj.element.appendChild(div);
    };
    /**
     * Get the content div element of RichTextEditor
     * @return {Element}
     */
    ContentRender.prototype.getPanel = function () {
        return this.contentPanel;
    };
    /**
     * Get the editable element of RichTextEditor
     * @return {Element}
     */
    ContentRender.prototype.getEditPanel = function () {
        return this.editableElement;
    };
    /**
     * Returns the text content as string.
     * @return {string}
     */
    ContentRender.prototype.getText = function () {
        return this.getEditPanel().textContent;
    };
    /**
     * Set the content div element of RichTextEditor
     * @param {Element} panel
     */
    ContentRender.prototype.setPanel = function (panel) {
        this.contentPanel = panel;
    };
    /**
     * Get the document of RichTextEditor
     * @return {Document}
     */
    ContentRender.prototype.getDocument = function () {
        return this.getEditPanel().ownerDocument;
    };
    return ContentRender;
}());
export { ContentRender };
