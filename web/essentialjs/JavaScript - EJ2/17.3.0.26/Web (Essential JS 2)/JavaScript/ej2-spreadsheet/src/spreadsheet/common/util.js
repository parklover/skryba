import { Browser, setStyleAttribute as setBaseStyleAttribute, getComponent } from '@syncfusion/ej2-base';
import { getCellPosition, getRowsHeight, getColumnsWidth, getSwapRange } from '../../workbook/index';
/**
 * The function used to update Dom using requestAnimationFrame.
 * @param  {Function} fn - Function that contains the actual action
 * @return {Promise<T>}

 */
export function getUpdateUsingRaf(fn) {
    requestAnimationFrame(function () {
        fn();
    });
}
/**
 * The function used to remove the dom element children.
 * @param  parent -

 */
export function removeAllChildren(parent, index) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/**
 * The function used to remove the dom element children.
 * @param  parent -

 */
export function getColGroupWidth(index) {
    var width = 30;
    if (index.toString().length > 3) {
        width = index.toString().length * 10;
    }
    return width;
}
var scrollAreaWidth = null;
export function getScrollBarWidth() {
    if (scrollAreaWidth !== null) {
        return scrollAreaWidth;
    }
    var htmlDivNode = document.createElement('div');
    var result = 0;
    htmlDivNode.style.cssText = 'width:100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;';
    document.body.appendChild(htmlDivNode);
    result = (htmlDivNode.offsetWidth - htmlDivNode.clientWidth) | 0;
    document.body.removeChild(htmlDivNode);
    return scrollAreaWidth = result;
}
var classes = ['e-ribbon', 'e-formula-bar-panel', 'e-sheet-tab-panel', 'e-header-toolbar'];
export function getSiblingsHeight(element, classList) {
    if (classList === void 0) { classList = classes; }
    var previous = getHeightFromDirection(element, 'previous', classList);
    var next = getHeightFromDirection(element, 'next', classList);
    return previous + next;
}
function getHeightFromDirection(element, direction, classList) {
    // tslint:disable-next-line:no-any
    var sibling = element[direction + 'ElementSibling'];
    var result = 0;
    while (sibling) {
        if (classList.some(function (value) { return sibling.classList.contains(value); })) {
            result += sibling.offsetHeight;
        }
        // tslint:disable-next-line:no-any
        sibling = sibling[direction + 'ElementSibling'];
    }
    return result;
}
/**

 */
export function inView(context, range, isModify) {
    if (context.scrollSettings.enableVirtualization) {
        var topIdx = context.viewport.topIndex;
        var leftIdx = context.viewport.leftIndex;
        var bottomIdx = topIdx + context.viewport.rowCount + context.getThreshold('row') * 2;
        var rightIdx = leftIdx + context.viewport.colCount + context.getThreshold('col') * 2;
        var inView_1 = topIdx <= range[0] && bottomIdx >= range[2] && leftIdx <= range[1] && rightIdx >= range[3];
        if (inView_1) {
            return true;
        }
        if (isModify) {
            if (range[0] < topIdx && range[2] < topIdx || range[0] > bottomIdx && range[2] > bottomIdx) {
                return false;
            }
            else {
                if (range[0] < topIdx && range[2] > topIdx) {
                    range[0] = topIdx;
                    inView_1 = true;
                }
                if (range[2] > bottomIdx) {
                    range[2] = bottomIdx;
                    inView_1 = true;
                }
            }
            if (range[1] < leftIdx && range[3] < leftIdx || range[1] > rightIdx && range[3] > rightIdx) {
                return false;
            }
            else {
                if (range[1] < leftIdx && range[3] > leftIdx) {
                    range[1] = leftIdx;
                    inView_1 = true;
                }
                if (range[3] > rightIdx) {
                    range[3] = rightIdx;
                    inView_1 = true;
                }
            }
        }
        return inView_1;
    }
    else {
        return true;
    }
}
/**
 * Position element with given range

 */
export function locateElem(ele, range, sheet, isRtl) {
    var swapRange = getSwapRange(range);
    var cellPosition = getCellPosition(sheet, swapRange);
    var attrs = {
        'top': (swapRange[0] === 0 ? cellPosition.top : cellPosition.top - 1) + 'px',
        'height': getRowsHeight(sheet, range[0], range[2]) + (swapRange[0] === 0 ? 0 : 1) + 'px',
        'width': getColumnsWidth(sheet, range[1], range[3]) + (swapRange[1] === 0 ? 0 : 1) + 'px'
    };
    attrs[isRtl ? 'right' : 'left'] = (swapRange[1] === 0 ? cellPosition.left : cellPosition.left - 1) + 'px';
    setStyleAttribute([{ element: ele, attrs: attrs }]);
}
/**
 * To update element styles using request animation frame

 */
export function setStyleAttribute(styles) {
    requestAnimationFrame(function () {
        styles.forEach(function (style) {
            setBaseStyleAttribute(style.element, style.attrs);
        });
    });
}
/**

 */
export function getStartEvent() {
    return (Browser.isPointer ? 'pointerdown' : 'mousedown touchstart');
}
/**

 */
export function getMoveEvent() {
    return (Browser.isPointer ? 'pointermove' : 'mousemove touchmove');
}
/**

 */
export function getEndEvent() {
    return (Browser.isPointer ? 'pointerup' : 'mouseup touchend');
}
/**

 */
export function isTouchStart(e) {
    return e.type === 'touchstart' || (e.type === 'pointerdown' && e.pointerType === 'touch');
}
/**

 */
export function isTouchMove(e) {
    return e.type === 'touchmove' || (e.type === 'pointermove' && e.pointerType === 'touch');
}
/**

 */
export function isTouchEnd(e) {
    return e.type === 'touchend' || (e.type === 'pointerup' && e.pointerType === 'touch');
}
/**

 */
export function getClientX(e) {
    return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
}
/**

 */
export function getClientY(e) {
    return e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
}
var config = {
    role: 'role',
    selected: 'aria-selected',
    multiselectable: 'aria-multiselectable',
    busy: 'aria-busy',
    colcount: 'aria-colcount'
};
export function setAriaOptions(target, options) {
    var props = Object.keys(options);
    props.forEach(function (name) {
        if (target) {
            target.setAttribute(config[name], options[name]);
        }
    });
}
/**

 */
export function destroyComponent(element, component) {
    if (element) {
        var compObj = getComponent(element, component);
        if (compObj) {
            compObj.destroy();
        }
    }
}
/**

 */
// tslint:disable-next-line:max-func-body-length
export function setResize(index, value, isCol, parent) {
    var curEle;
    var curEleH;
    var curEleC;
    var preEle;
    var preEleH;
    var preEleC;
    var nxtEle;
    var nxtEleH;
    var nxtEleC;
    var sheet = parent.getActiveSheet();
    if (isCol) {
        curEle = parent.element.getElementsByClassName('e-column-header')[0].getElementsByTagName('th')[index];
        curEleH = parent.element.getElementsByClassName('e-column-header')[0].getElementsByTagName('col')[index];
        curEleC = parent.element.getElementsByClassName('e-main-content')[0].getElementsByTagName('col')[index];
    }
    else {
        curEle = parent.element.getElementsByClassName('e-row-header')[0].getElementsByTagName('tr')[index];
        curEleH = parent.element.getElementsByClassName('e-row-header')[0].getElementsByTagName('tr')[index];
        curEleC = parent.element.getElementsByClassName('e-main-content')[0].getElementsByTagName('tr')[index];
        curEleH.style.height = parseInt(value, 10) > 0 ? value : '2px';
        curEleC.style.height = parseInt(value, 10) > 0 ? value : '0px';
        var hdrRow = parent.getRowHeaderContent().getElementsByClassName('e-row');
        var hdrClone = [];
        hdrClone[0] = hdrRow[index].getElementsByTagName('td')[0].cloneNode(true);
        var hdrFntSize = this.findMaxValue(parent.getRowHeaderTable(), hdrClone, false, parent) + 1;
        var contentRow = parent.getMainContent().getElementsByClassName('e-row');
        var contentClone = [];
        for (var idx = 0; idx < contentRow[index].getElementsByTagName('td').length; idx++) {
            contentClone[idx] = contentRow[index].getElementsByTagName('td')[idx].cloneNode(true);
        }
        var cntFntSize = this.findMaxValue(parent.getContentTable(), contentClone, false, parent) + 1;
        var fntSize = hdrFntSize >= cntFntSize ? hdrFntSize : cntFntSize;
        if (parseInt(curEleC.style.height, 10) < fntSize ||
            (curEle.classList.contains('e-reach-fntsize') && parseInt(curEleC.style.height, 10) === fntSize)) {
            curEle.classList.add('e-reach-fntsize');
            curEleH.style.lineHeight = parseInt(value, 10) >= 4 ? ((parseInt(value, 10)) - 4) + 'px' :
                parseInt(value, 10) > 0 ? ((parseInt(value, 10)) - 1) + 'px' : '0px';
            curEleC.style.lineHeight = parseInt(value, 10) > 0 ? ((parseInt(value, 10)) - 1) + 'px' : '0px';
        }
        else {
            curEleH.style.removeProperty('line-height');
            curEleC.style.removeProperty('line-height');
            if (curEle.classList.contains('e-reach-fntsize')) {
                curEle.classList.remove('e-reach-fntsize');
            }
        }
    }
    preEle = curEle.previousElementSibling;
    nxtEle = curEle.nextElementSibling;
    if (preEle) {
        preEle = curEle.previousElementSibling;
        preEleH = curEleH.previousElementSibling;
        preEleC = curEleC.previousElementSibling;
    }
    if (nxtEle) {
        nxtEle = curEle.nextElementSibling;
        nxtEleH = curEleH.nextElementSibling;
        nxtEleC = curEleC.nextElementSibling;
    }
    if (parseInt(value, 10) <= 0 && !(curEle.classList.contains('e-zero') || curEle.classList.contains('e-zero-start'))) {
        if (preEle && nxtEle) {
            if (isCol) {
                curEleH.style.width = '2px';
                curEleC.style.width = '0px';
            }
            else {
                curEleH.style.height = '2px';
                curEleC.style.height = '0px';
            }
            if (preEle.classList.contains('e-zero-start')) {
                curEle.classList.add('e-zero-start');
                curEleC.classList.add('e-zero-start');
            }
            else {
                curEle.classList.add('e-zero');
                curEleC.classList.add('e-zero');
            }
            if (!nxtEle.classList.contains('e-zero') && !nxtEle.classList.contains('e-zero-last')) {
                curEle.classList.add('e-zero-last');
                curEleC.classList.add('e-zero-last');
            }
            if (preEle.classList.contains('e-zero-last')) {
                preEle.classList.remove('e-zero-last');
                preEleC.classList.remove('e-zero-last');
            }
            if (preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero-end')) {
                    this.setWidthAndHeight(preEleH, -2, isCol);
                }
                else {
                    this.setWidthAndHeight(preEleH, -2, isCol);
                }
            }
            else {
                this.setWidthAndHeight(preEleH, -1, isCol);
            }
            if (preEle.classList.contains('e-zero-start')) {
                this.setWidthAndHeight(curEleH, -1, isCol);
            }
            if (nxtEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero-start')) {
                    while (nxtEle) {
                        if (nxtEle.classList.contains('e-zero') && (parseInt(nxtEleH.style.height, 10) !== 0 && !isCol) ||
                            (parseInt(nxtEleH.style.width, 10) !== 0 && isCol)) {
                            if (isCol) {
                                curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                                nxtEleH.style.width = parseInt(nxtEleH.style.width, 10) - 1 + 'px';
                            }
                            else {
                                curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                                nxtEleH.style.height = parseInt(nxtEleH.style.height, 10) - 1 + 'px';
                            }
                            nxtEle.classList.remove('e-zero');
                            nxtEle.classList.add('e-zero-start');
                            break;
                        }
                        else {
                            var nxtIndex = void 0;
                            nxtEle.classList.remove('e-zero');
                            nxtEle.classList.add('e-zero-start');
                            if (isCol) {
                                nxtIndex = parseInt(nxtEle.getAttribute('aria-colindex'), 10) - 1;
                                nxtEle = parent.getColHeaderTable().getElementsByTagName('th')[nxtIndex + 1];
                                nxtEleH = parent.getColHeaderTable().getElementsByTagName('col')[nxtIndex + 1];
                            }
                            else {
                                nxtIndex = parseInt(nxtEle.getAttribute('aria-rowindex'), 10) - 1;
                                nxtEle = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                                nxtEleH = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                            }
                        }
                    }
                }
                else {
                    this.setWidthAndHeight(curEleH, -2, isCol);
                }
            }
            else {
                if (nxtEle.classList.contains('e-zero-end')) {
                    if (isCol) {
                        curEleH.style.width = '0px';
                    }
                    else {
                        curEleH.style.height = '0px';
                    }
                }
                else {
                    this.setWidthAndHeight(nxtEleH, -1, isCol);
                }
            }
        }
        else if (preEle) {
            if (isCol) {
                curEleH.style.width = '1px';
                curEleC.style.width = '0px';
            }
            else {
                curEleH.style.height = '1px';
                curEleC.style.height = '0px';
            }
            curEle.classList.add('e-zero-end');
            curEleC.classList.add('e-zero-end');
            curEle.classList.add('e-zero-last');
            curEleC.classList.add('e-zero-last');
            if (preEle.classList.contains('e-zero')) {
                this.setWidthAndHeight(preEleH, -2, isCol);
            }
            else {
                this.setWidthAndHeight(preEleH, -1, isCol);
            }
        }
        else if (nxtEle) {
            curEle.classList.add('e-zero-start');
            curEleC.classList.add('e-zero-start');
            if (!nxtEle.classList.contains('e-zero')) {
                curEle.classList.add('e-zero-last');
                curEleC.classList.add('e-zero-last');
            }
            if (isCol) {
                curEleH.style.width = '1px';
                curEleC.style.width = '0px';
            }
            else {
                curEleH.style.height = '1px';
                curEleC.style.height = '0px';
            }
            if (nxtEle.classList.contains('e-zero')) {
                while (nxtEle) {
                    if (nxtEle.classList.contains('e-zero') && (parseInt(nxtEleH.style.width, 10) !== 0
                        && isCol) || (parseInt(nxtEleH.style.height, 10) !== 0 && !isCol)) {
                        if (isCol) {
                            nxtEleH.style.width = parseInt(nxtEleH.style.width, 10) - 1 + 'px';
                            curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        }
                        else {
                            nxtEleH.style.height = parseInt(nxtEleH.style.height, 10) - 1 + 'px';
                            curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        }
                        nxtEle.classList.add('e-zero-start');
                        nxtEle.classList.remove('e-zero');
                        break;
                    }
                    else {
                        var nxtIndex = void 0;
                        nxtEle.classList.add('e-zero-start');
                        nxtEle.classList.remove('e-zero');
                        if (isCol) {
                            nxtIndex = parseInt(nxtEle.getAttribute('aria-colindex'), 10) - 1;
                            nxtEleH = parent.getColHeaderTable().getElementsByTagName('col')[nxtIndex + 1];
                            nxtEle = parent.getColHeaderTable().getElementsByTagName('th')[nxtIndex + 1];
                        }
                        else {
                            nxtIndex = parseInt(nxtEle.getAttribute('aria-rowindex'), 10) - 1;
                            nxtEleH = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                            nxtEle = parent.getRowHeaderTable().getElementsByTagName('tr')[nxtIndex + 1];
                        }
                    }
                }
            }
            else {
                this.setWidthAndHeight(nxtEleH, -1, isCol);
            }
        }
    }
    else if (parseInt(value, 10) > 0) {
        if (isCol) {
            curEleH.style.width = value;
            curEleC.style.width = value;
        }
        else {
            curEleH.style.height = value;
            curEleC.style.height = value;
        }
        if (preEle && nxtEle) {
            if (preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero')) {
                    if (isCol) {
                        preEleH.style.width = parseInt(preEleH.style.width, 10) + 2 + 'px';
                        curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                    }
                    else {
                        preEleH.style.height = parseInt(preEleH.style.height, 10) + 2 + 'px';
                        curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                    }
                }
                else {
                    this.setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            else {
                if (curEle.classList.contains('e-zero')) {
                    this.setWidthAndHeight(preEleH, 1, isCol);
                }
                else {
                    if (curEle.classList.contains('e-zero-start')) {
                        if (isCol) {
                            preEleH.style.width = parseInt(preEleH.style.width, 10) + 1 + 'px';
                            curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        }
                        else {
                            preEleH.style.height = parseInt(preEleH.style.height, 10) + 1 + 'px';
                            curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        }
                    }
                }
            }
            if (nxtEle.classList.contains('e-zero')) {
                this.setWidthAndHeight(curEleH, -1, isCol);
            }
            else {
                if (curEle.classList.contains('e-zero') || curEle.classList.contains('e-zero-start')) {
                    this.setWidthAndHeight(nxtEleH, 1, isCol);
                }
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-start')) {
                curEle.classList.remove('e-zero-start');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero-start')) {
                curEleC.classList.remove('e-zero-start');
            }
            if (curEle.classList.contains('e-zero-last')) {
                curEle.classList.remove('e-zero-last');
            }
            if (curEleC.classList.contains('e-zero-last')) {
                curEleC.classList.remove('e-zero-last');
            }
            if (preEle.classList.contains('e-zero') || preEle.classList.contains('e-zero-start')) {
                preEle.classList.add('e-zero-last');
                preEleC.classList.add('e-zero-last');
            }
        }
        else if (preEle) {
            if (preEle.classList.contains('e-zero')) {
                if (curEle.classList.contains('e-zero')) {
                    if (isCol) {
                        curEleH.style.width = parseInt(curEleH.style.width, 10) - 1 + 'px';
                        preEleH.style.width = parseInt(preEleH.style.width, 10) + 2 + 'px';
                    }
                    else {
                        curEleH.style.height = parseInt(curEleH.style.height, 10) - 1 + 'px';
                        preEleH.style.height = parseInt(preEleH.style.height, 10) + 2 + 'px';
                    }
                }
                else {
                    this.setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            else {
                if (curEle.classList.contains('e-zero')) {
                    this.setWidthAndHeight(preEleH, 1, isCol);
                }
                else {
                    this.setWidthAndHeight(curEleH, -1, isCol);
                }
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-end')) {
                curEle.classList.remove('e-zero-end');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero-end')) {
                curEleC.classList.remove('e-zero-end');
            }
        }
        else if (nxtEle) {
            if (nxtEle.classList.contains('e-zero')) {
                this.setWidthAndHeight(curEleH, -1, isCol);
            }
            else if (curEle.classList.contains('e-zero-start')) {
                this.setWidthAndHeight(nxtEleH, 1, isCol);
                curEle.classList.remove('e-zero-start');
            }
            if (curEle.classList.contains('e-zero')) {
                curEle.classList.remove('e-zero');
            }
            if (curEleC.classList.contains('e-zero')) {
                curEleC.classList.remove('e-zero');
            }
            if (curEle.classList.contains('e-zero-start')) {
                curEle.classList.remove('e-zero-start');
            }
            if (curEleC.classList.contains('e-zero-start')) {
                curEleC.classList.remove('e-zero-start');
            }
        }
    }
}
/**

 */
export function setWidthAndHeight(trgt, value, isCol) {
    if (isCol) {
        trgt.style.width = parseInt(trgt.style.width, 10) + value + 'px';
    }
    else {
        trgt.style.height = parseInt(trgt.style.height, 10) + value + 'px';
    }
}
/**

 */
export function findMaxValue(table, text, isCol, parent) {
    var myTableDiv = parent.createElement('div', { className: parent.element.className });
    var myTable = parent.createElement('table', {
        className: table.className + 'e-resizetable',
        styles: 'width: auto;height: auto'
    });
    var myTr = parent.createElement('tr');
    if (isCol) {
        text.forEach(function (element) {
            var tr = myTr.cloneNode();
            tr.appendChild(element);
            myTable.appendChild(tr);
        });
    }
    else {
        text.forEach(function (element) {
            myTr.appendChild(element.cloneNode(true));
        });
        myTable.appendChild(myTr);
    }
    myTableDiv.appendChild(myTable);
    document.body.appendChild(myTableDiv);
    var offsetWidthValue = myTable.getBoundingClientRect().width;
    var offsetHeightValue = myTable.getBoundingClientRect().height;
    document.body.removeChild(myTableDiv);
    if (isCol) {
        return Math.ceil(offsetWidthValue);
    }
    else {
        return Math.ceil(offsetHeightValue);
    }
}
