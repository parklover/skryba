import { ComplexBase } from '@syncfusion/ej2-react-base';
import { StockChartStripLineSettingsModel } from '@syncfusion/ej2-charts';
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
export declare class StockChartStripLineDirective extends ComplexBase<StockChartStripLineSettingsModel, StockChartStripLineSettingsModel> {
    static moduleName: string;
}
export declare class StockChartStripLinesDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
