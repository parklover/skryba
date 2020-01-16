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
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `StriplineDirective` directive represent a stripline of the react chart.
 * It must be contained in a Chart component(`ChartComponent`).
 * ```tsx
 * <StockChartComponent>
 * <StockChartAxesDirective>
 * <StockchartAxisDirective>
 * <StriplinesDirective>
 * <StriplineDirective></StriplineDirective>
 * </StriplinesDirective>
 * </StockChartAxisDirective>
 * </StockChartAxesDirective>
 * </StockChartComponent>
 * ```
 */
var StockChartStripLineDirective = /** @class */ (function (_super) {
    __extends(StockChartStripLineDirective, _super);
    function StockChartStripLineDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartStripLineDirective.moduleName = 'stockChartStripLine';
    return StockChartStripLineDirective;
}(ComplexBase));
export { StockChartStripLineDirective };
var StockChartStripLinesDirective = /** @class */ (function (_super) {
    __extends(StockChartStripLinesDirective, _super);
    function StockChartStripLinesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockChartStripLinesDirective.propertyName = 'stripLines';
    StockChartStripLinesDirective.moduleName = 'stockChartStripLines';
    return StockChartStripLinesDirective;
}(ComplexBase));
export { StockChartStripLinesDirective };
