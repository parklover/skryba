import { IGanttData, ITaskData, IParent } from './interface';
import { Gantt } from './gantt';
import { DateProcessor } from './date-processor';
/**
 * To calculate and update task related values
 */
export declare class TaskProcessor extends DateProcessor {
    private recordIndex;
    private dataArray;
    private taskIds;
    private hierarchyData;
    constructor(parent: Gantt);
    private addEventListener;
    /**
     * @private
     */
    checkDataBinding(isChange?: boolean): void;
    private initDataSource;
    private constructDataSource;
    private cloneDataSource;
    /**
     * Function to manipulate data-source

     */
    private prepareDataSource;
    private prepareRecordCollection;
    /**
     * Method to update custom field values in gantt record
     */
    private addCustomFieldValue;
    /**
     * To populate Gantt record
     * @param data
     * @param level
     * @param parentItem
     * @param isLoad
     * @private
     */
    createRecord(data: Object, level: number, parentItem?: IGanttData, isLoad?: boolean): IGanttData;
    /**
     *
     * @param record
     * @param parent
     * @private
     */
    getCloneParent(parent: IGanttData): IParent;
    /**
     * @private
     */
    reUpdateResources(): void;
    private addTaskData;
    private updateExpandStateMappingValue;
    /**
     *
     * @param ganttData
     * @param data
     * @param isLoad
     * @private
     */
    calculateScheduledValues(ganttData: IGanttData, data: Object, isLoad: boolean): void;
    private calculateDateFromEndDate;
    private calculateDateFromStartDate;
    /**
     *
     * @param parentWidth
     * @param percent
     * @private
     */
    getProgressWidth(parentWidth: number, percent: number): number;
    /**
     *
     * @param ganttProp
     * @private
     */
    calculateWidth(ganttProp: ITaskData): number;
    private getTaskbarHeight;
    /**
     * Method to calculate left
     * @param ganttProp
     * @private
     */
    calculateLeft(ganttProp: ITaskData): number;
    /**
     * calculate the left margin of the baseline element
     * @param ganttData
     * @private
     */
    calculateBaselineLeft(ganttProperties: ITaskData): number;
    /**
     * calculate the width between baseline start date and baseline end date.
     * @private
     */
    calculateBaselineWidth(ganttProperties: ITaskData): number;
    /**
     * To get tasks width value
     * @param startDate
     * @param endDate
     * @private
     */
    getTaskWidth(startDate: Date, endDate: Date): number;
    /**
     * Get task left value
     * @param startDate
     * @param isMilestone
     * @private
     */
    getTaskLeft(startDate: Date, isMilestone: boolean): number;
    /**
     *
     * @param ganttData
     * @param fieldName
     * @private
     */
    updateMappingData(ganttData: IGanttData, fieldName: string): void;
    private setRecordDate;
    private getDurationInDay;
    private setRecordDuration;
    /**
     *
     * @param ganttData
     * @private
     */
    updateTaskData(ganttData: IGanttData): void;
    /**
     * To set resource value in Gantt record
     * @private
     */
    setResourceInfo(data: Object): Object[];
    private updateResourceName;
    private dataReorder;
    private validateDurationUnitMapping;
    /**
     * To update duration value in Task
     * @param duration
     * @param ganttProperties
     * @private
     */
    updateDurationValue(duration: string, ganttProperties: ITaskData): void;
    /**
     * @private
     */
    reUpdateGanttData(): void;
    /**
     * Update all gantt data collection width, progress width and left value
     * @private
     */
    updateGanttData(): void;
    /**
     * @private
     */
    reUpdateGanttDataPosition(): void;
    /**
     * method to update left, width, progress width in record
     * @param data
     * @private
     */
    updateWidthLeft(data: IGanttData): void;
    /**
     * To calculate parent progress value
     * @private
     */
    getParentProgress(childGanttRecord: IGanttData): Object;
    /**
     * @private
     */
    updateParentItems(cloneParent: IParent): void;
}
