import { Component, createElement, Complex, addClass, removeClass, Event, EmitType, formatUnit, Browser } from '@syncfusion/ej2-base';import { Internationalization, extend, getValue, isObjectArray, isObject, setValue, isUndefined, isBlazor } from '@syncfusion/ej2-base';import { Property, NotifyPropertyChanges, INotifyPropertyChanged, L10n, ModuleDeclaration, remove } from '@syncfusion/ej2-base';import { isNullOrUndefined, KeyboardEvents, KeyboardEventArgs, Collection, append } from '@syncfusion/ej2-base';import { createSpinner, showSpinner, hideSpinner, Dialog } from '@syncfusion/ej2-popups';import { TaskProcessor } from './task-processor';import { GanttChart } from './gantt-chart';import { Timeline } from '../renderer/timeline';import { GanttTreeGrid } from './tree-grid';import { Toolbar } from '../actions/toolbar';import { IGanttData, IWorkingTimeRange, IQueryTaskbarInfoEventArgs, BeforeTooltipRenderEventArgs, IDependencyEventArgs } from './interface';import { ITaskbarEditedEventArgs, IParent, ITaskData, ISplitterResizedEventArgs, ICollapsingEventArgs, CellEditArgs } from './interface';import { IConnectorLineObject, IValidateArgs, IValidateMode, ITaskAddedEventArgs, IKeyPressedEventArgs } from './interface';import { ZoomEventArgs, IActionBeginEventArgs, CellSelectingEventArgs, RowDeselectEventArgs } from './interface';import { ITimeSpanEventArgs, ZoomTimelineSettings, QueryCellInfoEventArgs, RowDataBoundEventArgs, RowSelectEventArgs } from './interface';import { TaskFieldsModel, TimelineSettingsModel, SplitterSettingsModel, SortSettings, SortSettingsModel } from '../models/models';import { EventMarkerModel, AddDialogFieldSettingsModel, EditDialogFieldSettingsModel, EditSettingsModel } from '../models/models';import { HolidayModel, DayWorkingTimeModel, FilterSettingsModel, SelectionSettingsModel } from '../models/models';import { TaskFields, TimelineSettings, Holiday, EventMarker, DayWorkingTime, EditSettings, SelectionSettings } from '../models/models';import { FilterSettings, SplitterSettings, TooltipSettings, LabelSettings, LabelSettingsModel } from '../models/models';import { SearchSettingsModel, SearchSettings } from '../models/models';import { ItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';import { DateProcessor } from './date-processor';import { ChartRows } from '../renderer/chart-rows';import { Dependency } from '../actions/dependency';import * as cls from './css-constants';import { Query, DataManager } from '@syncfusion/ej2-data';import { Column, ColumnModel } from '../models/column';import { TreeGrid, FilterSettingsModel as TreeGridFilterSettingModel } from '@syncfusion/ej2-treegrid';import { Sort } from '../actions/sort';import { CellSelectEventArgs, ISelectedCell, ContextMenuItemModel } from '@syncfusion/ej2-grids';import { CellDeselectEventArgs, IIndex, FailureEventArgs } from '@syncfusion/ej2-grids';import { HeaderCellInfoEventArgs, ColumnMenuClickEventArgs, ColumnMenuOpenEventArgs } from '@syncfusion/ej2-grids';import { ColumnMenuItemModel, ExcelQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';import { ExcelExportProperties, ExcelExportCompleteArgs, ExcelHeaderQueryCellInfoEventArgs } from '@syncfusion/ej2-grids';import { Filter } from '../actions/filter';import { PageEventArgs, FilterEventArgs, SortEventArgs, ResizeArgs, ColumnDragEventArgs, getActualProperties } from '@syncfusion/ej2-grids';import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';import { ConnectorLine } from '../renderer/connector-line';import { ConnectorLineEdit } from '../actions/connector-line-edit';import { Edit } from '../actions/edit';import { Splitter } from './splitter';import { ResizeEventArgs, ResizingEventArgs } from '@syncfusion/ej2-layouts';import { TooltipSettingsModel } from '../models/tooltip-settings-model';import { Tooltip } from '../renderer/tooltip';import { ToolbarItem, ColumnMenuItem, RowPosition, DurationUnit, SortDirection, GridLine, ContextMenuItem } from './enum';import { Selection } from '../actions/selection';import { ExcelExport } from '../actions/excel-export';import { DayMarkers } from '../actions/day-markers';import { ContextMenu } from './../actions/context-menu';import { RowSelectingEventArgs } from './interface';import { ContextMenuOpenEventArgs as CMenuOpenEventArgs, ContextMenuClickEventArgs as CMenuClickEventArgs } from './interface';import { ColumnMenu } from '../actions/column-menu';
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class Gantt
 */
export interface GanttModel extends ComponentModel{

    /**
     * Enables or disables the key board interaction of Gantt.
     * 

     */
    allowKeyboard?: boolean;

    /**
     * Enables or disables the focusing the task bar on click action.
     * 

     */
    autoFocusTasks?: boolean;

    /**
     * If `allowSelection` is set to true, it allows selection of (highlight row) Gantt chart rows by clicking it.

     */
    allowSelection?: boolean;

    /**
     * If `allowSorting` is set to true, it allows sorting of gantt chart tasks when column header is clicked.

     */
    allowSorting?: boolean;

    /**
     * If `enablePredecessorValidation` is set to true, it allows to validate the predecessor link.

     */
    enablePredecessorValidation?: boolean;

    /**
     * If `showColumnMenu` set to true, then it will enable the column menu options in each columns.

     */
    showColumnMenu?: boolean;

    /**
     * `columnMenuItems` defines both built-in and custom column menu items.
     * <br><br>
     * The available built-in items are,
     * * `ColumnChooser` - To show/hide the TreeGrid columns.
     * * `SortAscending` - Sort the current column in ascending order.
     * * `SortDescending` - Sort the current column in descending order.
     * * `Filter` - Filter options will show based on filterSettings property.

     */
    columnMenuItems?: ColumnMenuItem[] | ColumnMenuItemModel[];

    /**
     * If `collapseAllParentTasks` set to true, then root tasks are rendered with collapsed state.

     */
    collapseAllParentTasks?: boolean;

    /**
     * If `highlightWeekends` set to true, then all weekend days are highlighted in week - day timeline mode.

     */
    highlightWeekends?: boolean;

    /**
     * To define expander column index in Grid.



     */
    treeColumnIndex?: number;

    /**
     * It is used to render Gantt chart rows and tasks.
     * `dataSource` value was defined as array of JavaScript objects or instances of `DataManager`.


     */
    dataSource?: Object[] | DataManager;

    /**
     * `durationUnit` Specifies the duration unit for each tasks whether day or hour or minute.
     * * `day`: Sets the duration unit as day.
     * * `hour`: Sets the duration unit as hour.
     * * `minute`: Sets the duration unit as minute.

     */
    durationUnit?: DurationUnit;

    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html) 
     * that will be executed along with data processing.    

     */
    query?: Query;

    /**
     * Specifies the dateFormat for Gantt, given format is displayed in tooltip and Grid cells.
     */
    dateFormat?: string;

    /**
     * Defines the height of the Gantt component container.

     */
    height?: number | string;

    /**
     * If `renderBaseline` is set to `true`, then baselines are rendered for tasks.

     */
    renderBaseline?: boolean;

    /**
     * Configures the grid lines in tree grid and gantt chart.
     */
    gridLines?: GridLine;

    /**
     * Defines the right, left and inner task labels in task bar.
     */
    labelSettings?: LabelSettingsModel;

    /**
     * The task bar template that renders customized child task bars from the given template.

     */
    taskbarTemplate?: string;

    /**
     * The parent task bar template that renders customized parent task bars from the given template.

     */
    parentTaskbarTemplate?: string;

    /**
     * The milestone template that renders customized milestone task from the given template.

     */
    milestoneTemplate?: string;

    /**
     * Defines the baseline bar color.
     */
    baselineColor?: string;

    /**
     * Defines the width of the Gantt component container.

     */
    width?: number | string;

    /**
     * `toolbar` defines the toolbar items of the Gantt. 
     * It contains built-in and custom toolbar items.
     * If an array value is assigned, it is considered as the list of built-in and custom toolbar items in the Gantt's toolbar. 
     * <br><br>     
     * The available built-in toolbar items are:
     * * Add: Adds a new record.
     * * Edit: Edits the selected task.
     * * Update: Updates the edited task.
     * * Delete: Deletes the selected task.
     * * Cancel: Cancels the edit state.
     * * Search: Searches tasks by the given key.
     * * ExpandAll: Expands all the task of Gantt.
     * * CollapseAll: Collapses all the task of Gantt.
     * * PrevTimeSpan: Extends timeline with one unit before the timeline start date.
     * * NextTimeSpan: Extends timeline with one unit after the timeline finish date.
     * * ZoomIn: ZoomIn the Gantt control.
     * * ZoomOut: ZoomOut the Gantt control.
     * * ZoomToFit: Display the all tasks within the viewable Gantt chart.
     * * ExcelExport: To export in Excel format
     * * CsvExport : To export in CSV format

     */
    toolbar?: (ToolbarItem | string | ItemModel)[];

    /**
     * Defines workweek of project.

     */
    workWeek?: string[];

    /**
     * Defines weekend days are considered as working day or not.

     */
    includeWeekend?: boolean;

    /**
     * Enables or disables rendering of unscheduled tasks in Gantt.

     */
    allowUnscheduledTasks?: boolean;

    /**
     * To show notes column cell values inside the cell or in tooltip.


     */
    showInlineNotes?: boolean;

    /**
     * Defines height value for grid rows and chart rows in Gantt.



     */
    rowHeight?: number;

    /**
     * Defines height of taskbar element in Gantt.



     */
    taskbarHeight?: number;

    /**
     * Defines start date of the project, if `projectStartDate` value not set then it will be calculated from data source.

     */
    projectStartDate?: Date | string;

    /**
     * Defines end date of the project, if `projectEndDate` value not set then it will be calculated from data source.

     */
    projectEndDate?: Date | string;

    /**
     * Defines mapping property to get resource id value from resource collection.

     */
    resourceIDMapping?: string;

    /**
     * Defines mapping property to get resource name value from resource collection.

     */
    resourceNameMapping?: string;

    /**
     * Defines resource collection assigned for projects.

     */
    resources?: Object[];

    /**
     * Defines background color of dependency lines.

     */
    connectorLineBackground?: string;

    /**
     * Defines width of dependency lines.



     */
    connectorLineWidth?: number;

    /**
     * Defines column collection displayed in grid
     * If the `columns` declaration was empty then `columns` are automatically populated from `taskSettings` value.

     */
    columns?: Column[] | string[] | ColumnModel[];

    /**
     * Defines the tabs and fields to be included in the add dialog.
     * If the value was empty, then it will be calculated from `taskSettings` and `columns` value.

     */
    addDialogFields?: AddDialogFieldSettingsModel[];

    /**
     * Defines the tabs and fields to be included in the edit dialog.
     * If the value was empty, then it will be calculated from `taskSettings` and `columns` value.

     */
    editDialogFields?: EditDialogFieldSettingsModel[];

    /**
     * The `selectedRowIndex` allows you to select a row at initial rendering. 
     * You can also get the currently selected row index.



     */
    selectedRowIndex?: number;

    /**
     * Defines customized working time of project.
     */
    dayWorkingTime?: DayWorkingTimeModel[];

    /**
     * Defines holidays presented in project timeline.

     */
    holidays?: HolidayModel[];

    /**
     * Defines events and status of project throughout the timeline.

     */
    eventMarkers?: EventMarkerModel[];

    /**
     * Defines mapping properties to find task values such as id, start date, end date, duration and progress values from data source.
     */
    taskFields?: TaskFieldsModel;

    /**
     * Configures timeline settings of Gantt.
     * Defines default timeline modes or customized top tier mode and bottom tier mode or single tier only.
     */
    timelineSettings?: TimelineSettingsModel;

    /**
     * Configures the sort settings of the Gantt.

     */
    sortSettings?: SortSettingsModel;

    /**
     * Configures edit settings of Gantt.

     * showDeleteConfirmDialog: false } 
     */
    editSettings?: EditSettingsModel;

    /**
     * Enables or disables default tooltip of Gantt element and defines customized tooltip for Gantt elements.

     */
    tooltipSettings?: TooltipSettingsModel;

    /**
     * Configures the selection settings.

     */
    selectionSettings?: SelectionSettingsModel;

    /**
     * Enables or disables filtering support in Gantt.

     */
    allowFiltering?: boolean;

    /**
     * If `allowExcelExport` set to true, then it will allow the user to export Gantt to Excel and CSV file.

     */
    allowExcelExport?: boolean;

    /**
     * If `allowReordering` is set to true, Gantt columns can be reordered. 
     * Reordering can be done by drag and drop of a particular column from one index to another index.  

     */
    allowReordering?: boolean;

    /**
     * If `allowResizing` is set to true, Gantt columns can be resized.      

     */
    allowResizing?: boolean;

    /**
     * If `enableContextMenu` is set to true, Enable context menu in Gantt.

     */
    enableContextMenu?: boolean;

    /**
     * If `contextMenuItems` are array collection of menu items in Context Menu.

     */
    contextMenuItems?: ContextMenuItem[] | ContextMenuItemModel[];

    /**
     * Configures the filter settings for Gantt.

     */
    filterSettings?: FilterSettingsModel;

    /**
     * Configures the search settings for Gantt.
     */
    searchSettings?: SearchSettingsModel;

    /**
     * Configures the splitter settings for Gantt.
     */
    splitterSettings?: SplitterSettingsModel;

    /**
     * This will be triggered after the taskbar element is appended to the Gantt element.
     * @event 
     */
    queryTaskbarInfo?: EmitType<IQueryTaskbarInfoEventArgs>;

    /**
     * Triggers before Gantt data is exported to Excel file.

     * @event
     */
    beforeExcelExport?: EmitType<Object>;

    /**
     * Triggers after Gantt data is exported to Excel file.

     * @event
     */
    excelExportComplete?: EmitType<ExcelExportCompleteArgs>;

    /**
     * Triggers before exporting each cell to Excel file.
     * You can also customize the Excel cells.

     * @event
     */
    excelQueryCellInfo?: EmitType<ExcelQueryCellInfoEventArgs>;

    /**
     * Triggers before exporting each header cell to Excel file.
     * You can also customize the Excel cells.

     * @event
     */
    excelHeaderQueryCellInfo?: EmitType<ExcelHeaderQueryCellInfoEventArgs>;

    /**
     * This will be triggered before the row getting collapsed.
     * @event
     */
    collapsing?: EmitType<ICollapsingEventArgs>;

    /**
     * This will be triggered after the row getting collapsed.
     * @event
     */
    collapsed?: EmitType<ICollapsingEventArgs>;

    /**
     * This will be triggered before the row getting expanded.
     * @event 
     */
    expanding?: EmitType<ICollapsingEventArgs>;

    /**
     * This will be triggered after the row getting expanded.
     * @event
     */
    expanded?: EmitType<ICollapsingEventArgs>;

    /**
     * Triggers when Gantt actions such as sorting, filtering, searching etc., starts.


     * @event
     */
    /* tslint:disable-next-line */
    actionBegin?: EmitType<object | PageEventArgs | FilterEventArgs | SortEventArgs | ITimeSpanEventArgs | IDependencyEventArgs | ITaskAddedEventArgs | ZoomEventArgs>;

    /**
     * Triggers when Gantt actions such as sorting, filtering, searching etc. are completed.
     * @event


     */
    actionComplete?: EmitType<FilterEventArgs | SortEventArgs | ITaskAddedEventArgs | IKeyPressedEventArgs | ZoomEventArgs>;

    /**
     * Triggers when actions are failed.
     * @event


     */
    actionFailure?: EmitType<FailureEventArgs>;

    /**
     * This will be triggered taskbar was dragged and dropped on new position.
     * @event
     */
    taskbarEdited?: EmitType<ITaskbarEditedEventArgs>;

    /**
     * This will be triggered when a task get saved by cell edit.
     * @event 
     */
    endEdit?: EmitType<ITaskbarEditedEventArgs>;

    /**
     * This will be triggered a cell get begins to edit.
     * @event

     */
    cellEdit?: EmitType<CellEditArgs>;

    /**
     * Triggered before the Gantt control gets rendered.
     * @event

     */
    load?: EmitType<Object>;

    /**
     * Triggers when the component is created.
     * @event
     */
    created?: EmitType<Object>;

    /**
     * Triggers when the component is destroyed.
     * @event
     */
    destroyed?: EmitType<Object>;

    /**
     * This event will be triggered when taskbar was in dragging state.
     * @event 
     */
    taskbarEditing?: EmitType<ITaskbarEditedEventArgs>;

    /**
     * Triggers when data source is populated in the Grid.
     * @event
     */
    dataBound?: EmitType<Object>;

    /**
     * Triggers when column resize starts.

     * @event
     */
    resizeStart?: EmitType<ResizeArgs>;

    /**
     * Triggers on column resizing.

     * @event
     */
    resizing?: EmitType<ResizeArgs>;

    /**
     * Triggers when column resize ends.

     * @event
     */
    resizeStop?: EmitType<ResizeArgs>;

    /**
     * Triggers when splitter resizing starts.
     * @event

     */
    splitterResizeStart?: EmitType<ResizeEventArgs>;

    /**
     * Triggers when splitter bar was dragging.
     * @event

     */
    splitterResizing?: EmitType<ResizingEventArgs>;

    /**
     * Triggers when splitter resizing action completed.
     * @event
     */
    splitterResized?: EmitType<ISplitterResizedEventArgs>;

    /**
     * Triggers when column header element drag (move) starts.

     * @event
     */
    columnDragStart?: EmitType<ColumnDragEventArgs>;

    /**
     * Triggers when column header element is dragged (moved) continuously.

     * @event
     */
    columnDrag?: EmitType<ColumnDragEventArgs>;

    /**
     * Triggers when a column header element is dropped on the target column.

     * @event
     */
    columnDrop?: EmitType<ColumnDragEventArgs>;

    /**
     * Triggers before tooltip get rendered.
     * @event 
     */
    beforeTooltipRender?: EmitType<BeforeTooltipRenderEventArgs>;

    /**
     * Triggers before row selection occurs.
     * @event
     */
    rowSelecting?: EmitType<RowSelectingEventArgs>;

    /**
     * Triggers after a row is selected.
     * @event
     */
    rowSelected?: EmitType<RowSelectEventArgs>;

    /**
     * Triggers before deselecting the selected row.

     * @event
     */
    rowDeselecting?: EmitType<RowDeselectEventArgs>;

    /**
     * Triggers when a selected row is deselected.
     * @event
     */
    rowDeselected?: EmitType<RowDeselectEventArgs>;

    /**
     * Triggers before any cell selection occurs.
     * @event
     */
    cellSelecting?: EmitType<CellSelectingEventArgs>;

    /**
     * Triggers after a cell is selected.
     * @event

     */
    cellSelected?: EmitType<CellSelectEventArgs>;

    /**
     * Triggers before the selected cell is deselecting.

     * @event 
     */
    cellDeselecting?: EmitType<CellDeselectEventArgs>;

    /**
     * Triggers when a particular selected cell is deselected.

     * @event 
     */
    cellDeselected?: EmitType<CellDeselectEventArgs>;

    /**
     * This will be triggered before the header cell element is appended to the Grid element.
     * @event 
     */
    queryCellInfo?: EmitType<QueryCellInfoEventArgs>;

    /**
     * This will be triggered before the header cell element is appended to the Grid element.
     * @event 

     */
    headerCellInfo?: EmitType<HeaderCellInfoEventArgs>;

    /**
     * This will be triggered before the row element is appended to the Grid element.
     * @event
     */
    rowDataBound?: EmitType<RowDataBoundEventArgs>;

    /**
     * Triggers before column menu opens.

     * @event 
     */
    columnMenuOpen?: EmitType<ColumnMenuOpenEventArgs>;

    /**
     * Triggers when toolbar item was clicked.
     * @event


     */
    toolbarClick?: EmitType<ClickEventArgs>;

    /**
     * Triggers when click on column menu.
     * @event


     */
    columnMenuClick?: EmitType<ColumnMenuClickEventArgs>;

    /**
     * Triggers before context menu opens.
     * @event

     */
    contextMenuOpen?: EmitType<CMenuOpenEventArgs>;

    /**
     * Triggers when click on context menu.
     * @event


     */
    contextMenuClick?: EmitType<CMenuClickEventArgs>;

}