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
import { getPoint, withInRange, TransformToVisible } from '../../common/utils/helper';
import { PathOption } from '@syncfusion/ej2-svg-base';
import { SplineBase } from './spline-base';
/**
 * `SplineSeries` module is used to render the spline series.
 */
var SplineSeries = /** @class */ (function (_super) {
    __extends(SplineSeries, _super);
    function SplineSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render the spline series.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.render = function (series, xAxis, yAxis, isInverted) {
        var chart = series.chart;
        var marker = series.marker;
        var ySpline;
        var options;
        var firstPoint = null;
        var secondPoint = null;
        var direction = '';
        var pt1;
        var pt2;
        var bpt1;
        var bpt2;
        var data;
        var controlPointCount = 0;
        var controlPoint1;
        var controlPoint2;
        var startPoint = 'M';
        var points = this.filterEmptyPoints(series);
        var previous;
        var getCoordinate = series.chart.chartAreaType === 'PolarRadar' ? TransformToVisible : getPoint;
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            previous = this.getPreviousIndex(points, point.index - 1, series);
            point.symbolLocations = [];
            point.regions = [];
            if (point.visible && withInRange(points[previous], point, points[this.getNextIndex(points, point.index - 1, series)], series)) {
                if (firstPoint !== null) {
                    direction = this.getSplineDirection(series.drawPoints[previous], firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
                    startPoint = 'L';
                }
                firstPoint = point;
                this.storePointLocation(point, series, isInverted, getCoordinate);
            }
            else {
                startPoint = 'M';
                firstPoint = null;
                point.symbolLocations = [];
            }
        }
        if (series.chart.chartAreaType === 'PolarRadar' && series.isClosed) {
            direction = this.getSplineDirection(series.drawPoints[series.drawPoints.length - 1], points[points.length - 1], { xValue: points.length, yValue: points[0].yValue }, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction);
            startPoint = 'L';
        }
        var name = series.category === 'TrendLine' ? series.chart.element.id + '_Series_' + series.sourceIndex + '_TrendLine_' + series.index :
            series.chart.element.id + '_Series_' + series.index;
        options = new PathOption(name, 'transparent', series.width, series.interior, series.opacity, series.dashArray, direction);
        this.appendLinePath(options, series, '');
        this.renderMarker(series);
    };
    /**
     *
     * @param data To find the direct of spline using points.
     * @param firstPoint
     * @param point
     * @param xAxis
     * @param yAxis
     * @param isInverted
     * @param series
     * @param startPoint
     * @param getCoordinate
     * @param direction
     */
    SplineSeries.prototype.getSplineDirection = function (data, firstPoint, point, xAxis, yAxis, isInverted, series, startPoint, getCoordinate, direction) {
        var controlPoint1 = data.controlPoint1;
        var controlPoint2 = data.controlPoint2;
        var pt1 = getCoordinate(firstPoint.xValue, firstPoint.yValue, xAxis, yAxis, isInverted, series);
        var pt2 = getCoordinate(point.xValue, point.yValue, xAxis, yAxis, isInverted, series);
        var bpt1 = getCoordinate(controlPoint1.x, controlPoint1.y, xAxis, yAxis, isInverted, series);
        var bpt2 = getCoordinate(controlPoint2.x, controlPoint2.y, xAxis, yAxis, isInverted, series);
        return direction.concat((startPoint + ' ' + (pt1.x) + ' ' + (pt1.y) + ' ' + 'C' + ' ' + (bpt1.x) + ' '
            + (bpt1.y) + ' ' + (bpt2.x) + ' ' + (bpt2.y) + ' ' + (pt2.x) + ' ' + (pt2.y) + ' '));
    };
    /**
     * Get module name.
     */
    SplineSeries.prototype.getModuleName = function () {
        /**
         * Returns the module name of the series
         */
        return 'SplineSeries';
    };
    /**
     * To destroy the spline.
     * @return {void}
     * @private
     */
    SplineSeries.prototype.destroy = function (chart) {
        /**
         * Destroy method calling here
         */
    };
    return SplineSeries;
}(SplineBase));
export { SplineSeries };
