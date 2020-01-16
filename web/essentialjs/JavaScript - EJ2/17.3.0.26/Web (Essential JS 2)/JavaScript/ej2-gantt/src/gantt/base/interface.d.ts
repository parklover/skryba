import { ContextMenuType } from './enum';
import { ContextMenuOpenEventArgs, ContextMenuClickEventArgs } from '@syncfusion/ej2-grids';
import { RowSelectingEventArgs as GridRowSelectingEventArgs } from '@syncfusion/ej2-grids';
import { CellSelectingEventArgs as GridCellSelectingEventArgs } from '@syncfusion/ej2-grids';
import { RowDeselectEventArgs as GridRowDeselectEventArgs } from '@syncfusion/ej2-grids';
import { RowSelectEventArgs as GridRowSelectEventArgs, RowDataBoundEventArgs as GridRowDataBoundEventArgs } from '@syncfusion/ej2-grids';
import { IGanttData, IValidateMode } from '../base/interface';
import { Column } from '../models/column';
import { TooltipEventArgs } from '@syncfusion/ej2-popups';
import { TimelineViewMode } from '../base/enum';
import { TimelineTierSettingsModel } from '../models/timeline-settings-model';
/**
 * Specifies Gantt-chart interfaces
 *
 */
export interface IGanttData {
    /** Defines the child records of task. */
    childRecords?: IGanttData[];
    /** Defines the expanded state of task. */
    expanded?: boolean;
    /** Defines the properties which used in internal calculations. */
    ganttProperties?: ITaskData;
    /** Defines gantt data has child records or not. */
    hasChildRecords?: boolean;
    /** Defines the index of task. */
    index?: number;
    /** Defines the level of task. */
    level?: number;
    /** Defines the direct parent item of task. */
    parentItem?: IParent;
    /** Defines the parent unique id of task. */
    parentUniqueID?: string;
    /** Defines the data which specified in data source.

     */
    taskData?: Object;
    /** Defines the unique id of task. */
    uniqueID?: string;
    /** Defines the indicators value of task. */
    indicators?: IIndicator[];
    /** Defines the delete . */
    isDelete?: boolean;
}
export interface IParent {
    /** Defines the unique id of task. */
    uniqueID?: string;
    /** Defines the expanded state of task. */
    expanded?: boolean;
    /** Defines the level of task. */
    level?: number;
    /** Defines the id of task. */
    taskId?: string;
    /** Defines the index of task. */
    index?: number;
}
export interface ITaskData {
    /** Defines the baselineleft of task. */
    baselineLeft?: number;
    /** Defines the baseline startdate of task. */
    baselineStartDate?: Date;
    /** Defines the baseline enddate of task. */
    baselineEndDate?: Date;
    /** Defines the baseline width of task. */
    baselineWidth?: number;
    /** Defines the end date of task. */
    endDate?: Date;
    /** Defines the css class of task. */
    cssClass?: string;
    /** Defines the duration of task. */
    duration?: number;
    /** Defines the duration unit of task. */
    durationUnit?: string;
    /** Defines the task is auto schedule-able or not. */
    isAutoSchedule?: boolean;
    /** Defines the task is milestone or not. */
    isMilestone?: boolean;
    /** Defines the left of task. */
    left?: number;
    /** Defines the progress of task. */
    progress?: number;
    /** Defines the progress width of task. */
    progressWidth?: number;
    /** Defines the resource info of task. */
    resourceInfo?: Object[];
    /** Defines the resource names of task. */
    resourceNames?: string;
    /** Defines the start date of task. */
    startDate?: Date;
    /** Defines the notes of task. */
    notes?: string;
    /** Defines the predecessors name of task. */
    predecessorsName?: string | number | object[];
    /** Defines the predecessor of task. */
    predecessor?: IPredecessor[];
    /** Defines the id of task. */
    taskId?: string;
    /** Defines the name of task. */
    taskName?: string;
    /** Defines the width of task. */
    width?: number;
    /** Defines the indicators of task. */
    indicators?: IIndicator[];
    /** Defines the unique id of task. */
    uniqueID?: string;
    /** Defines the total progress of task. */
    totalProgress?: number;
    /** Defines the total duration of task. */
    totalDuration?: number;
}
export interface IGanttColumn {
    field?: string;
    headerText?: string;
    editType?: string;
    mappingName?: string;
    allowEditing: boolean;
    width: number;
    format: string;
    visible: boolean;
}
export interface IIndicator {
    /** Defines the date of indicator. */
    date?: Date | string;
    /** Defines the icon class of indicator. */
    iconClass?: string;
    /** Defines the name of indicator. */
    name?: string;
    /** Defines the tooltip of indicator. */
    tooltip?: string;
}
export interface IWorkingTimeRange {
    from?: number;
    to?: number;
    isWorking?: boolean;
    color?: string;
    interval?: number;
}
export interface IQueryTaskbarInfoEventArgs {
    /** Defines the data. */
    data: IGanttData;
    /** Defines the row element. */
    rowElement: Element;
    /** Defines the taskbar element. */
    taskbarElement: Element;
    /** Defines the taskbar background color. */
    taskbarBgColor?: string;
    /** Defines the taskbar border color. */
    taskbarBorderColor?: string;
    /** Defines the progressbar background color. */
    progressBarBgColor?: string;
    /** Defines the milestone color. */
    milestoneColor?: string;
    /** Defines the right label color. */
    rightLabelColor?: string;
    /** Defines the left label color. */
    leftLabelColor?: string;
    /** Defines the task label color. */
    taskLabelColor?: string;
    /** Defines the baseline color. */
    baselineColor?: string;
    /** Defines the taskbar type. */
    taskbarType: string;
}
export interface IGanttCellFormatter {
    /** Method to format the cell value of date columns. */
    getValue(column: Column, data: Object): Object;
}
export interface ITaskbarEditedEventArgs {
    /** Defines the editingFields. */
    editingFields?: ITaskData;
    /** Defines the data. */
    data?: IGanttData;
    /** Defines the index of edited task. */
    recordIndex?: number;
    /** Defines the previous value of editing task. */
    previousData?: ITaskData;
    /** Defines the type of taskbar edit action. */
    taskBarEditAction?: string;
    /** Defines the duration roundoff. */
    roundOffDuration?: boolean;
    /** Defines the event is cancel-able or not. */
    cancel?: boolean;
    /** Defines the action. */
    action?: string;
}
export interface IKeyPressedEventArgs {
    /** Defines the request type. */
    requestType?: string;
    /** Defines the key action. */
    action?: string;
    /** Defines the event. */
    keyEvent?: Event;
}
export interface ITaskDeletedEventArgs {
    deletedRecordCollection?: IGanttData[];
    updatedRecordCollection?: IGanttData[];
    cancel?: boolean;
    action?: string;
}
export interface IDependencyEditData {
    id?: string;
    text?: string;
    value?: string;
}
export interface IPredecessor {
    /** Defines the from value of predecessor. */
    from?: string;
    /** Defines the to value of predecessor. */
    to?: string;
    /** Defines the type of predecessor. */
    type?: string;
    /** Defines the offset value of predecessor. */
    offset?: number;
    /** Defines the offset unit of predecessor. */
    offsetUnit?: string;
    /** Defines the predecessor is drawn-able or not. */
    isDrawn?: boolean;
}
export interface IValidateArgs {
    data?: IGanttData;
    recordIndex?: number;
    requestType?: string;
    cancel?: boolean;
    validateMode?: IValidateMode;
    editEventArgs?: object;
}
export interface IValidateMode {
    respectLink?: boolean;
    removeLink?: boolean;
    preserveLinkWithEditing?: boolean;
}
export interface ITimeSpanEventArgs {
    /** Defines the project start date. */
    projectStartDate?: Date;
    /** Defines the project end date. */
    ProjectEndDate?: Date;
    /** Defines the timeline roundoff state. */
    isTimelineRoundOff?: boolean;
    /** Defines the request type. */
    requestType?: string;
    /** Defines the event is cancel-able or not. */
    cancel?: boolean;
}
export interface IValidateMode {
    respectLink?: boolean;
    removeLink?: boolean;
    preserveLinkWithEditing?: boolean;
}
export interface IActionBeginEventArgs {
    requestType?: string;
    data?: IGanttData | IGanttData[];
    modifiedRecords?: IGanttData[];
    modifiedTaskData?: object[];
    cancel?: boolean;
}
export interface IValidateLinkedTaskArgs {
    editMode?: string;
    data?: IGanttData;
    requestType?: string;
    validateMode?: IValidateMode;
    cancel?: boolean;
}
export interface IConnectorLineObject {
    parentLeft?: number;
    childLeft?: number;
    parentWidth?: number;
    childWidth?: number;
    parentIndex?: number;
    childIndex?: number;
    rowHeight?: number;
    type?: string;
    connectorLineId?: string;
    milestoneParent?: boolean;
    milestoneChild?: boolean;
}
export interface ISplitterResizedEventArgs {
    /** Defines the element. */
    element?: HTMLElement;
    /** Defines the event. */
    event?: Event;
    /** Defines the size of resized pane. */
    paneSize?: number[];
    /** Defines the pane. */
    pane?: HTMLElement[];
    /** Defines the index of resizing pane. */
    index?: number[];
    /** Defines the separator. */
    separator?: HTMLElement;
    /** Defines the event is cancel-able or not. */
    cancel?: boolean;
}
export interface PredecessorTooltip {
    /** Defines the from id of predecessor. */
    fromId?: string;
    /** Defines the to id of predecessor. */
    toId?: string;
    /** Defines the from name of predecessor. */
    fromName?: string;
    /** Defines the to name of predecessor. */
    toName?: string;
    /** Defines the link type of predecessor. */
    linkType?: string;
    /** Defines the link text of predecessor. */
    linkText?: string;
    /** Defines the offset value of predecessor. */
    offset?: number;
    /** Defines the offset unit of predecessor. */
    offsetUnit?: string;
    /** Defines the offset string value of predecessor. */
    offsetString?: string;
}
export interface BeforeTooltipRenderEventArgs {
    /** Defines the data. */
    data?: BeforeTooltipRenderEventArgsData;
    /** Defines the original event arguments of tooltip control.

     */
    args?: TooltipEventArgs;
    /** Defines the content. */
    content?: string | Element;
    /** Cancel the tooltip */
    cancel?: boolean;
}
export interface QueryCellInfoEventArgs {
    /** Defines the row data associated with this cell. */
    data?: IGanttData;
    /** Defines the cell element. */
    cell?: Element;
    /** Defines the column object associated with this cell. */
    column?: Column;
    /** Defines the no. of columns to be spanned */
    colSpan?: number;
    /** Defines the no. of rows to be spanned */
    rowSpan?: number;
    /** Defines the current action. */
    requestType?: string;
    /** Define the foreignKey row data associated with this column */
    foreignKeyData?: Object;
}
/**
 * Extending IGanttData and PredecessorTooltip interfaces for data used in BeforeTooltipRenderEventArgs interface.
 */
export interface BeforeTooltipRenderEventArgsData extends IGanttData, PredecessorTooltip {
}
export interface IDependencyEventArgs {
    /** Specifies the predecessor task of dependency. */
    fromItem?: IGanttData;
    /** Specifies the successor task of dependency. */
    toItem?: IGanttData;
    /** Defines the new predecessor string. */
    newPredecessorString?: string;
    /** Defines the dependency link is valid or not */
    isValidLink?: boolean;
    /** Defines the request type. */
    requestType?: string;
}
export interface ITaskAddedEventArgs {
    /** Specifies the newly added task data with Gantt properties. */
    data?: IGanttData;
    /** Specifies the newly added task data without custom Gantt properties. */
    newTaskData?: object;
    /** Defines the modified records. */
    modifiedRecords?: IGanttData[];
    /** Defines the modified task data. */
    modifiedTaskData?: object[];
    /** Defines the record index. */
    recordIndex?: number;
    /** Defines the event is cancel-able or not. */
    cancel?: boolean;
    /** Defines the action. */
    action?: string;
}
export interface ICollapsingEventArgs {
    /** Defines the TreeGrid row element */
    gridRow: Node;
    /** Defines the Gantt chart row element */
    chartRow: Node;
    /** Defines the name of the action. */
    name?: string;
    /** Defines the parent row data. */
    data?: IGanttData;
    /** Cancel the row expanding action */
    cancel?: boolean;
}
export interface ContextMenuOpenEventArgs extends ContextMenuOpenEventArgs {
    /** Defines the TreeGrid row element */
    gridRow?: Element;
    /** Defines the chart row element */
    chartRow?: Element;
    /** Defines the selected row record */
    rowData?: IGanttData;
    /** Defines the context menu type */
    type?: ContextMenuType;
    /** Defines the hidden items collection */
    hideItems?: string[];
    /** Defines the disabled items collection */
    disableItems?: string[];
    /**

     */
    top?: number;
    /**

     */
    left?: number;
}
export interface ContextMenuClickEventArgs extends ContextMenuClickEventArgs {
    /** Defines the selected row record */
    rowData?: IGanttData;
    /** Defines the context menu type */
    type?: ContextMenuType;
}
export declare type ITimelineFormatter = (date?: Date, format?: string, tier?: string, mode?: string) => string;
export interface ZoomEventArgs {
    requestType?: string;
    timeline?: ZoomTimelineSettings;
}
export interface ZoomTimelineSettings {
    /** Defines the timeline view mode. */
    timelineViewMode?: TimelineViewMode;
    /** Defines top tier values. */
    topTier?: TimelineTierSettingsModel;
    /** Defines bottom tier values. */
    bottomTier?: TimelineTierSettingsModel;
    /** Defines timeline unit size. */
    timelineUnitSize?: number;
    weekStartDay?: number;
    /** Defines weekend background color. */
    weekendBackground?: string;
    /** Defines showTooltip whether the tooltip will rendered or not. */
    showTooltip?: boolean;
    /** Defines perDay width. */
    perDayWidth?: number;
    /** Defines zooming level. */
    level?: number;
    /** Defines the updateTimescaleView. */
    updateTimescaleView?: boolean;
}
/** @private */
export interface MousePoint {
    pageX?: number;
    pageY?: number;
}
/** @private */
export interface ITemplateData {
    expanded?: boolean;
    hasChildRecords?: boolean;
    index?: number;
    level?: number;
    baselineLeft?: number;
    baselineWidth?: number;
    taskStartDate?: Date;
    taskEndDate?: Date;
    taskDuration?: number;
    taskDurationUnit?: string;
    taskPredecessorsName?: string;
    taskResourceNames?: string;
    isAutoSchedule?: boolean;
    isMilestone?: boolean;
    left?: number;
    progressWidth?: number;
    width?: number;
}
export interface RowSelectingEventArgs extends GridRowSelectingEventArgs {
    /** Defines the data collections. */
    data: IGanttData;
}
export interface RowSelectEventArgs extends GridRowSelectEventArgs {
    /** Defines the data collections. */
    data: IGanttData;
}
export interface RowDataBoundEventArgs extends GridRowDataBoundEventArgs {
    /** Defines the data collections. */
    data: IGanttData;
}
export interface RowDeselectEventArgs extends GridRowDeselectEventArgs {
    /** Defines the selected/deselected row index.

     */
    rowIndex?: number;
    /** Defines the data collections. */
    data?: IGanttData[];
    /** Defines the selected/deselected row.

     */
    row?: Element;
}
export interface ActionCompleteArgs extends ZoomEventArgs, IKeyPressedEventArgs {
    element?: HTMLElement;
    requestType?: string;
    data?: IGanttData[];
    modifiedRecords?: IGanttData[];
    modifiedTaskData?: IGanttData[];
    cancel?: boolean;
    /** Specifies the newly added task data without custom Gantt properties.

     */
    newTaskData?: object;
    /** Defines the record index. */
    recordIndex?: number;
    /** Defines the action. */
    action?: string;
    /** Defines the type of event. */
    type?: string;
}
export interface ActionBeginArgs extends IDependencyEventArgs {
    rowData?: IGanttData;
    name?: string;
    requestType?: string;
    cancel?: boolean;
    data?: IGanttData[];
    modifiedRecords?: IGanttData[];
    /**

     */
    modifiedTaskData?: object[];
    /** Specifies the newly added task data without custom Gantt properties.

     */
    newTaskData?: object;
    /** Defines the record index. */
    recordIndex?: number;
    /** Defines the action. */
    action?: string;
    /** Defines the type of event. */
    type?: string;
}
export interface CellEditArgs {
    /** Defines the cancel option value. */
    cancel?: boolean;
    /** Defines the current row. */
    row?: Element;
    /** Defines the validation rules. */
    validationRules?: Object;
    /** Defines the name of the event. */
    type?: string;
    /** Defines foreign data object */
    foreignKeyData?: Object;
    /** Defines the row data object. */
    rowData?: IGanttData;
    /** Defines the column name. */
    columnName?: string;
    /** Defines the cell object. */
    cell?: Element;
    /** Defines the column object. */
    columnObject?: Column;
    /** Defines the cell value. */
    value?: string;
    /** Defines isForeignKey option value. */
    isForeignKey?: boolean;
    /** Defines the primaryKey. */
    primaryKey?: string[];
}
export interface CellSelectingEventArgs extends GridCellSelectingEventArgs {
    /** Defines the previously selected cell index.

     */
    previousRowCellIndex?: number;
}
export interface ScrollArgs {
    /** Defines the action type. */
    requestType?: string;
    /** Defines the scroll direction. */
    scrollDirection?: string;
    /** Defines the scroll left value. */
    scrollLeft?: number;
    /** Defines the scroll top value. */
    scrollTop?: number;
    /** Defines the previous scroll top value. */
    previousScrollTop?: number;
    /** Defines the previous scroll left value. */
    previousScrollLeft?: number;
}
