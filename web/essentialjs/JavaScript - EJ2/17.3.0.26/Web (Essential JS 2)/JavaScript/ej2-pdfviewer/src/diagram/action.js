import { Container } from '@syncfusion/ej2-drawings';
import { isPointOverConnector } from './connector-util';
/** @private */
export function findActiveElement(event, pdfBase, pdfViewer) {
    if (pdfViewer && pdfBase.activeElements.activePageID > -1) {
        var objects = findObjectsUnderMouse(pdfBase, pdfViewer, event);
        var object = findObjectUnderMouse(objects, event, pdfBase, pdfViewer);
        return object;
    }
    return undefined;
}
/** @private */
export function findObjectsUnderMouse(pdfBase, pdfViewer, event) {
    var actualTarget = [];
    var bounds;
    // tslint:disable-next-line
    var pt = pdfBase.currentPosition || { x: event.offsetX, y: event.offsetY };
    pt = { x: pt.x / pdfBase.getZoomFactor(), y: pt.y / pdfBase.getZoomFactor() };
    var pageTable = pdfViewer.getPageTable(pdfBase.activeElements.activePageID);
    var objArray = findObjects(pt, pageTable.objects);
    return objArray;
}
/** @private */
export function findObjectUnderMouse(
// tslint:disable-next-line
objects, event, pdfBase, pdfViewer) {
    var actualTarget = null;
    var touchArg;
    var offsetX;
    var offsetY;
    if (event && event.type && event.type.indexOf('touch') !== -1) {
        touchArg = event;
        if (pdfViewer.annotation) {
            var pageDiv = pdfBase.getElement('_pageDiv_' + pdfViewer.annotation.getEventPageNumber(event));
            if (pageDiv) {
                var pageCurrentRect = pageDiv.getBoundingClientRect();
                offsetX = touchArg.changedTouches[0].clientX - pageCurrentRect.left;
                offsetY = touchArg.changedTouches[0].clientY - pageCurrentRect.top;
            }
        }
    }
    else {
        offsetX = !isNaN(event.offsetX) ? event.offsetX : (event.position ? event.position.x : 0);
        offsetY = !isNaN(event.offsetY) ? event.offsetY : (event.position ? event.position.y : 0);
    }
    var offsetForSelector = 5;
    for (var i = 0; i < objects.length; i++) {
        // tslint:disable-next-line:max-line-length
        if (!(objects[i].shapeAnnotationType === 'Distance' || objects[i].shapeAnnotationType === 'Line' || objects[i].shapeAnnotationType === 'LineWidthArrowHead')) {
            var bounds = objects[i].wrapper.bounds;
            var rotationValue = 0;
            if (objects[i].shapeAnnotationType === 'Stamp') {
                rotationValue = 25;
            }
            // tslint:disable-next-line:max-line-length
            if ((((bounds.x - offsetForSelector) * pdfBase.getZoomFactor()) < offsetX) && (((bounds.x + bounds.width + offsetForSelector) * pdfBase.getZoomFactor()) > offsetX) &&
                (((bounds.y - offsetForSelector - rotationValue) * pdfBase.getZoomFactor()) < offsetY) && (((bounds.y + bounds.height + offsetForSelector) * pdfBase.getZoomFactor()) > offsetY)) {
                actualTarget = objects[i];
                break;
            }
        }
        else {
            var pt = { x: offsetX / pdfBase.getZoomFactor(), y: offsetY / pdfBase.getZoomFactor() };
            var obj = findElementUnderMouse(objects[i], pt, offsetForSelector);
            var isOver = isPointOverConnector(objects[i], pt);
            if (obj && isOver) {
                actualTarget = objects[i];
                break;
            }
        }
    }
    return actualTarget;
}
/** @private */
export function findElementUnderMouse(obj, position, padding) {
    return findTargetShapeElement(obj.wrapper, position, padding);
}
/** @private */
export function insertObject(obj, key, collection) {
    if (collection.length === 0) {
        collection.push(obj);
    }
    else if (collection.length === 1) {
        // tslint:disable-next-line
        if (collection[0][key] > obj[key]) {
            collection.splice(0, 0, obj);
        }
        else {
            collection.push(obj);
        }
    }
    else if (collection.length > 1) {
        var low = 0;
        var high = collection.length - 1;
        var mid = Math.floor((low + high) / 2);
        while (mid !== low) {
            // tslint:disable-next-line
            if (collection[mid][key] < obj[key]) {
                low = mid;
                mid = Math.floor((low + high) / 2);
                // tslint:disable-next-line
            }
            else if (collection[mid][key] > obj[key]) {
                high = mid;
                mid = Math.floor((low + high) / 2);
            }
        }
        // tslint:disable-next-line
        if (collection[high][key] < obj[key]) {
            collection.push(obj);
            // tslint:disable-next-line
        }
        else if (collection[low][key] > obj[key]) {
            collection.splice(low, 0, obj);
            // tslint:disable-next-line
        }
        else if ((collection[low][key] < obj[key]) && collection[high][key] > obj[key]) {
            collection.splice(high, 0, obj);
        }
    }
}
/** @private */
export function findTargetShapeElement(container, position, padding) {
    if (container && container.children) {
        for (var i = container.children.length - 1; i >= 0; i--) {
            var shapeElement = container.children[i];
            if (shapeElement && shapeElement.bounds.containsPoint(position, 10)) {
                if (shapeElement instanceof Container) {
                    var targetElement = this.findTargetElement(shapeElement, position);
                    if (targetElement) {
                        return targetElement;
                    }
                }
                if (shapeElement.bounds.containsPoint(position, 10)) {
                    return shapeElement;
                }
            }
        }
    }
    if (container.bounds.containsPoint(position, padding) && container.style.fill !== 'none') {
        return container;
    }
    return null;
}
/** @private */
export function findObjects(region, objCollection) {
    var objects = [];
    for (var _i = 0, objCollection_1 = objCollection; _i < objCollection_1.length; _i++) {
        var obj = objCollection_1[_i];
        if (findElementUnderMouse(obj, region, 10) ||
            (obj.shapeAnnotationType === 'Stamp' && findElementUnderMouse(obj, region, 40))) {
            insertObject(obj, 'Zindex', objects);
        }
    }
    return objects;
}
/** @private */
export function findActivePage(event, pdfBase) {
    var activePageID = undefined;
    if (event.target && event.target.wrapper) {
        return event.target.pageIndex;
    }
    if (event.target) {
        var elementIdColl = event.target.id.split('_');
        if (elementIdColl.length > 0) {
            // tslint:disable-next-line:radix
            activePageID = parseInt(elementIdColl[elementIdColl.length - 1]);
        }
    }
    return activePageID;
}
/**

 */
var ActiveElements = /** @class */ (function () {
    function ActiveElements() {
        this.activePage = undefined;
        this.activePageID = undefined;
    }
    Object.defineProperty(ActiveElements.prototype, "activePageID", {
        /** @private */
        get: function () {
            return this.activePage;
        },
        /** @private */
        set: function (offset) {
            this.activePage = offset;
            // tslint:disable-next-line
            if (offset !== this.activePage) { }
        },
        enumerable: true,
        configurable: true
    });
    return ActiveElements;
}());
export { ActiveElements };
