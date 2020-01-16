import { ChildProperty } from '@syncfusion/ej2-base';
import { TimelineViewMode } from '../base/enum';
import { TimelineTierSettingsModel } from './timeline-settings-model';
import { ITimelineFormatter } from '../base/interface';
/**
 * Configures timeline settings of Gantt.
 */
export declare class TimelineTierSettings extends ChildProperty<TimelineTierSettings> {
    /**
     * Defines timeline cell format.

     */
    format: string;
    /**
     * Defines timeline mode of Gantt header.
     * * `None` - Default.
     * * `Week` - Define the week mode header.
     * * `Day` - Define the day mode header.
     * * `Hour` - Define the hour mode header.
     * * `Month` - Define the month mode header.
     * * `Year` - Define the year mode header.
     * * `Minutes` - Define the minutes mode header.

     */
    unit: TimelineViewMode;
    /**
     * Defines number of timeline units combined for single cell.

     */
    count: number;
    /**
     * Defines method to get custom formatted values of timeline cells.

     */
    formatter: string | ITimelineFormatter;
}
/**
 * Configures the timeline settings property in the Gantt.
 */
export declare class TimelineSettings extends ChildProperty<TimelineSettings> {
    /**
     * Defines timeline mode of Gantt header.
     * * `None` - Default.
     * * `Week` - Define the week mode header.
     * * `Day` - Define the day mode header.
     * * `Hour` - Define the hour mode header.
     * * `Month` - Define the month mode header.
     * * `Year` - Define the year mode header.
     * * `Minutes` - Define the minutes mode header.

     */
    timelineViewMode: TimelineViewMode;
    /**
     * Defines top tier setting in timeline.
     */
    topTier: TimelineTierSettingsModel;
    /**
     * Defines bottom tier settings in timeline.
     */
    bottomTier: TimelineTierSettingsModel;
    /**
     * Defines width of timeline cell.

     */
    timelineUnitSize: number;
    /**
     * Defines week start day in timeline.

     */
    weekStartDay: number;
    /**
     * Defines background color of weekend cell in week - day timeline mode.

     */
    weekendBackground: string;
    /**
     * Enables or disables tooltip for timeline cells.

     */
    showTooltip: boolean;
    /**
     * Enables or disables timeline auto update on editing action.

     */
    updateTimescaleView: boolean;
}
