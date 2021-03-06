var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { click, itemSelection } from '../index';
import { getElementsByClassName, getElement, createStyle, customizeStyle, removeClass, getTargetElement } from '../utils/helper';
import { isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
/**
 * Selection module class
 */
var Selection = /** @class */ (function () {
    /* tslint:disable:no-string-literal */
    function Selection(maps) {
        this.maps = maps;
        this.addEventListener();
    }
    /**
     * For binding events to selection module
     */
    Selection.prototype.addEventListener = function () {
        if (!this.maps.isDestroyed) {
            this.maps.on(click, this.mouseClick, this);
            this.maps.on(Browser.touchEndEvent, this.mouseClick, this);
        }
    };
    /**
     * For removing events from selection modue
     */
    Selection.prototype.removeEventListener = function () {
        if (this.maps.isDestroyed) {
            return;
        }
        this.maps.off(click, this.mouseClick);
        this.maps.off(Browser.touchEndEvent, this.mouseClick);
    };
    Selection.prototype.mouseClick = function (targetEle) {
        if (!isNullOrUndefined(targetEle['type']) && targetEle['type'].indexOf('touch') !== -1 && isNullOrUndefined(targetEle.id)) {
            targetEle = targetEle['target'];
        }
        if (!isNullOrUndefined(targetEle.id) && (targetEle.id.indexOf('LayerIndex') > -1 || targetEle.id.indexOf('NavigationIndex') > -1)) {
            var layerIndex = void 0;
            var shapeData = void 0;
            var data = void 0;
            var shapeIndex = void 0;
            var dataIndex = void 0;
            layerIndex = parseInt(targetEle.id.split('_LayerIndex_')[1].split('_')[0], 10);
            if (targetEle.id.indexOf('shapeIndex') > -1) {
                shapeIndex = parseInt(targetEle.id.split('_shapeIndex_')[1].split('_')[0], 10);
                shapeData = this.maps.layers[layerIndex].shapeData['features']['length'] > shapeIndex ?
                    this.maps.layers[layerIndex].shapeData['features'][shapeIndex]['properties'] : null;
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = isNullOrUndefined(dataIndex) ? null : this.maps.layers[layerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].selectionSettings;
                this.selectionType = 'Shape';
            }
            else if (targetEle.id.indexOf('BubbleIndex') > -1) {
                var bubbleIndex = parseInt(targetEle.id.split('_BubbleIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].bubbleSettings[bubbleIndex].selectionSettings;
                this.selectionType = 'Bubble';
            }
            else if (targetEle.id.indexOf('MarkerIndex') > -1) {
                var markerIndex = parseInt(targetEle.id.split('_MarkerIndex_')[1].split('_')[0], 10);
                dataIndex = parseInt(targetEle.id.split('_dataIndex_')[1].split('_')[0], 10);
                data = this.maps.layers[layerIndex].markerSettings[markerIndex].dataSource[dataIndex];
                this.selectionsettings = this.maps.layers[layerIndex].markerSettings[markerIndex].selectionSettings;
                this.selectionType = 'Marker';
            }
            else {
                var index = parseInt(targetEle.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                shapeData = null;
                data = {
                    latitude: this.maps.layers[layerIndex].navigationLineSettings[index].latitude,
                    longitude: this.maps.layers[layerIndex].navigationLineSettings[index].longitude
                };
                this.selectionsettings = this.maps.layers[layerIndex].navigationLineSettings[index].selectionSettings;
                this.selectionType = 'navigationline';
            }
            if (this.selectionsettings.enable) {
                if (this.maps.legendSettings.visible && targetEle.id.indexOf('_MarkerIndex_') === -1) {
                    this.maps.legendModule.shapeHighLightAndSelection(targetEle, data, this.selectionsettings, 'selection', layerIndex);
                }
                if (this.maps.legendSettings.visible ? this.maps.legendModule.legendSelection : true) {
                    this.selectMap(targetEle, shapeData, data);
                }
            }
        }
        else if (!isNullOrUndefined(targetEle.id) && (targetEle.id.indexOf(this.maps.element.id + '_Legend_Shape_Index') > -1 ||
            targetEle.id.indexOf(this.maps.element.id + '_Legend_Index') !== -1) && this.maps.legendSettings.visible &&
            targetEle.id.indexOf('_Text') === -1) {
            this.maps.legendModule.legendHighLightAndSelection(targetEle, 'selection');
        }
    };
    /**
     * Public method for selection
     */
    Selection.prototype.addSelection = function (layerIndex, name, enable) {
        var targetEle = getTargetElement(layerIndex, name, enable, this.maps);
        if (enable) {
            this.selectMap(targetEle, null, null);
        }
        else {
            removeClass(targetEle);
        }
    };
    /**
     * Method for selection
     */
    Selection.prototype.selectMap = function (targetEle, shapeData, data) {
        var _this = this;
        var parentElement;
        var children;
        var selectionsettings = this.selectionsettings;
        var border = {
            color: this.selectionsettings.border.color,
            width: this.selectionsettings.border.width / (this.selectionType === 'Marker' ? 1 : this.maps.scale)
        };
        var eventArgs = {
            opacity: this.selectionsettings.opacity,
            fill: this.selectionType !== 'navigationline' ? this.selectionsettings.fill : 'none',
            border: border,
            name: itemSelection,
            target: targetEle.id,
            cancel: false,
            shapeData: shapeData,
            data: data,
            maps: this.maps
        };
        if (this.maps.isBlazor) {
            var shapeData_1 = eventArgs.shapeData, maps = eventArgs.maps, blazorEventArgs = __rest(eventArgs, ["shapeData", "maps"]);
            eventArgs = blazorEventArgs;
        }
        this.maps.trigger('itemSelection', eventArgs, function (observedArgs) {
            // if (this.maps.legendSettings.visible && !this.maps.legendSettings.toggleVisibility
            // && this.maps.legendSettings.legendSelection) {
            //     this.removeLegendSelection(this.maps.legendModule.legendCollection, targetEle);
            // }
            if (targetEle.getAttribute('class') === _this.selectionType + 'selectionMapStyle') {
                removeClass(targetEle);
                if (targetEle.id.indexOf('NavigationIndex') > -1) {
                    var index = parseInt(targetEle.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                    var layerIndex = parseInt(targetEle.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                    targetEle.setAttribute('stroke-width', _this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                    targetEle.setAttribute('stroke', _this.maps.layers[layerIndex].navigationLineSettings[index].color);
                }
            }
            else {
                if (!_this.selectionsettings.enableMultiSelect
                    && getElementsByClassName(_this.selectionType + 'selectionMapStyle').length > 0) {
                    var ele = getElementsByClassName(_this.selectionType + 'selectionMapStyle')[0];
                    removeClass(ele);
                    if (ele.id.indexOf('NavigationIndex') > -1) {
                        var index = parseInt(targetEle.id.split('_NavigationIndex_')[1].split('_')[0], 10);
                        var layerIndex = parseInt(targetEle.parentElement.id.split('_LayerIndex_')[1].split('_')[0], 10);
                        ele.setAttribute('stroke-width', _this.maps.layers[layerIndex].navigationLineSettings[index].width.toString());
                        ele.setAttribute('stroke', _this.maps.layers[layerIndex].navigationLineSettings[index].color);
                    }
                }
                if (!getElement(_this.selectionType + 'selectionMap')) {
                    document.body.appendChild(createStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs));
                }
                else {
                    customizeStyle(_this.selectionType + 'selectionMap', _this.selectionType + 'selectionMapStyle', eventArgs);
                }
                targetEle.setAttribute('class', _this.selectionType + 'selectionMapStyle');
            }
        });
    };
    /**
     * Remove legend selection
     */
    // private removeLegendSelection(legendCollection: Object[], targetEle: Element): void {
    //     let shape: Element;
    //     if (!this.selectionsettings.enableMultiSelect) {
    //        for (let i: number = 0; i < legendCollection.length; i++) {
    //             for (let data of legendCollection[i]['data']) {
    //                 shape = getElement(this.maps.element.id + '_LayerIndex_' + data['layerIndex'] +
    //                            '_shapeIndex_' + data['shapeIndex'] + '_dataIndex_' + data['dataIndex']);
    //                 removeClass(shape);
    //             }
    //         }
    //     }
    // }
    /**
     * Get module name.
     */
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    /**
     * To destroy the selection.
     * @return {void}
     * @private
     */
    Selection.prototype.destroy = function (maps) {
        /**
         * Destroy method performed here
         */
        this.removeEventListener();
    };
    return Selection;
}());
export { Selection };
