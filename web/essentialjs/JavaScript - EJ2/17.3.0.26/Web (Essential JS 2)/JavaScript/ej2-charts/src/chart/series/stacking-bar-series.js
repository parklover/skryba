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
import { withInRange } from '../../common/utils/helper';
import { ColumnBase } from './column-base';
/**
 * `StackingBarSeries` module is used to render the stacking bar series.
 */
var StackingBarSeries = /** @class */ (function (_super) {
    __extends(StackingBarSeries, _super);
    function StackingBarSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the Stacking bar series.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.render = function (series) {
        var sideBySideInfo = this.getSideBySideInfo(series);
        var stackedValue = series.stackedValues;
        var rect;
        var argsData;
        for (var _i = 0, _a = series.points; _i < _a.length; _i++) {
            var pointStack = _a[_i];
            pointStack.symbolLocations = [];
            pointStack.regions = [];
            if (pointStack.visible && withInRange(series.points[pointStack.index - 1], pointStack, series.points[pointStack.index + 1], series)) {
                rect = this.getRectangle(pointStack.xValue + sideBySideInfo.start, stackedValue.endValues[pointStack.index], pointStack.xValue + sideBySideInfo.end, stackedValue.startValues[pointStack.index], series);
                argsData = this.triggerEvent(series, pointStack, series.interior, { width: series.border.width, color: series.border.color });
                if (!argsData.cancel) {
                    this.drawRectangle(series, pointStack, rect, argsData);
                    this.updateSymbolLocation(pointStack, rect, series);
                }
            }
        }
        this.renderMarker(series);
    };
    /**
     * To destroy the stacking bar.
     * @return {void}
     * @private
     */
    StackingBarSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name.
     */
    StackingBarSeries.prototype.getModuleName = function () {
        return 'StackingBarSeries';
    };
    /**
     * Animates the series.
     * @param  {Series} series - Defines the series to animate.
     * @return {void}
     */
    StackingBarSeries.prototype.doAnimation = function (series) {
        this.animate(series);
    };
    return StackingBarSeries;
}(ColumnBase));
export { StackingBarSeries };
