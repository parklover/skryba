import { PivotEngine } from '../../base/engine';
import { IMultiLevelLabelClickEventArgs } from '@syncfusion/ej2-charts';
import { ChartSettingsModel } from '../../pivotview/model/chartsettings-model';
import { PivotView } from '../../pivotview';
import { OlapEngine } from '../../base/olap/engine';
export declare class PivotChart {
    private chartSeries;
    private dataSourceSettings;
    private chartSettings;
    private element;
    private measureList;
    private headerColl;
    private maxLevel;
    private columnGroupObject;
    private persistSettings;
    private fieldPosition;
    private measurePos;
    private measuresNames;
    calculatedWidth: number;
    currentMeasure: string;
    engineModule: PivotEngine | OlapEngine;
    parent: PivotView;
    /**
     * Get component name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    loadChart(parent: PivotView, chartSettings: ChartSettingsModel): void;
    /**
     * Refreshing chart based on the updated chartSettings.
     * @returns void
     */
    refreshChart(): void;
    private frameObjectWithKeys;
    private bindChart;
    private frameAxesWithRows;
    private getFormat;
    private getColumnTotalIndex;
    private groupHierarchyWithLevels;
    private frameMultiLevelLabels;
    private getZoomFactor;
    private configTooltipSettings;
    private configLegendSettings;
    private configXAxis;
    private configZoomSettings;
    private tooltipRender;
    private loaded;
    private axisLabelRender;
    private multiLevelLabelClick;
    onDrill(args: IMultiLevelLabelClickEventArgs): void;
    private load;
    private resized;
    /**
     * To destroy the chart module
     * @returns void

     */
    destroy(): void;
}
