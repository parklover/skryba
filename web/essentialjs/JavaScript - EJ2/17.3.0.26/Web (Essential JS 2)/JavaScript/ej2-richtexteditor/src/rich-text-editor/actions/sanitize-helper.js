/**
 * SanitizeHtmlHelper for sanitize the value.
 */
import { detach } from '@syncfusion/ej2-base';
var removeTags = [
    'script',
    'iframe[src]',
    'link[href*="javascript:"]',
    'object[type="text/x-scriptlet"]',
    'object[data^="data:text/html;base64"]',
    'img[src^="data:text/html;base64"]',
    '[src^="javascript:"]',
    '[dynsrc^="javascript:"]',
    '[lowsrc^="javascript:"]',
    '[type^="application/x-shockwave-flash"]'
];
var removeAttrs = [
    { attribute: 'href', selector: '[href*="javascript:"]' },
    { attribute: 'background', selector: '[background^="javascript:"]' },
    { attribute: 'style', selector: '[style*="javascript:"]' },
    { attribute: 'style', selector: '[style*="expression("]' },
    { attribute: 'href', selector: 'a[href^="data:text/html;base64"]' }
];
var jsEvents = ['onchange',
    'onclick',
    'onmouseover',
    'onmouseout',
    'onkeydown',
    'onload',
    'onerror',
    'onblur',
    'onfocus',
    'onbeforeload',
    'onbeforeunload',
    'onkeyup',
    'onsubmit',
    'onafterprint',
    'onbeforeonload',
    'onbeforeprint',
    'onblur',
    'oncanplay',
    'oncanplaythrough',
    'onchange',
    'onclick',
    'oncontextmenu',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onemptied',
    'onended',
    'onerror',
    'onerror',
    'onfocus',
    'onformchange',
    'onforminput',
    'onhaschange',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onloadeddata',
    'onloadedmetadata',
    'onloadstart',
    'onmessage',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onoffline',
    'onoine',
    'ononline',
    'onpagehide',
    'onpageshow',
    'onpause',
    'onplay',
    'onplaying',
    'onpopstate',
    'onprogress',
    'onratechange',
    'onreadystatechange',
    'onredo',
    'onresize',
    'onscroll',
    'onseeked',
    'onseeking',
    'onselect',
    'onstalled',
    'onstorage',
    'onsubmit',
    'onsuspend',
    'ontimeupdate',
    'onundo',
    'onunload',
    'onvolumechange',
    'onwaiting',
    'onmouseenter',
    'onmouseleave',
    'onmousewheel',
    'onstart',
    'onpropertychange'
];
var SanitizeHtmlHelper = /** @class */ (function () {
    function SanitizeHtmlHelper() {
    }
    SanitizeHtmlHelper.prototype.initialize = function (value, parent) {
        var item = {
            selectors: {
                tags: removeTags,
                attributes: removeAttrs
            },
            helper: null
        };
        parent.trigger('beforeSanitizeHtml', item);
        if (item.helper) {
            value = item.helper(value);
        }
        if (!item.cancel) {
            value = this.serializeValue(item, value);
        }
        return value;
    };
    SanitizeHtmlHelper.prototype.serializeValue = function (item, value) {
        this.removeAttrs = item.selectors.attributes;
        this.removeTags = item.selectors.tags;
        this.wrapElement = document.createElement('div');
        this.wrapElement.innerHTML = value;
        this.removeXssTags();
        this.removeJsEvents();
        this.removeXssAttrs();
        return this.wrapElement.innerHTML;
    };
    SanitizeHtmlHelper.prototype.removeXssTags = function () {
        var elements = this.wrapElement.querySelectorAll(this.removeTags.join(','));
        if (elements.length > 0) {
            elements.forEach(function (element) {
                detach(element);
            });
        }
    };
    SanitizeHtmlHelper.prototype.removeJsEvents = function () {
        var elements = this.wrapElement.querySelectorAll('[' + jsEvents.join('],[') + ']');
        if (elements.length > 0) {
            elements.forEach(function (element) {
                jsEvents.forEach(function (attr) {
                    if (element.hasAttribute(attr)) {
                        element.removeAttribute(attr);
                    }
                });
            });
        }
    };
    SanitizeHtmlHelper.prototype.removeXssAttrs = function () {
        var _this = this;
        this.removeAttrs.forEach(function (item, index) {
            var elements = _this.wrapElement.querySelectorAll(item.selector);
            if (elements.length > 0) {
                elements.forEach(function (element) {
                    element.removeAttribute(item.attribute);
                });
            }
        });
    };
    return SanitizeHtmlHelper;
}());
export { SanitizeHtmlHelper };
