import { Property, ChildProperty } from '@syncfusion/ej2-base';

/**
 * Interface for a class TaskFields
 */
export interface TaskFieldsModel {

    /**
     * To map id of task from data source.

     */
    id?: string;

    /**
     * To map name of task from data source.

     */
    name?: string;

    /**
     * To map parent id of task from data source.

     */
    parentID?: string;

    /**
     * To map start date of task from data source.

     */
    startDate?: string;

    /**
     * To map end date of task from data source.

     */
    endDate?: string;

    /**
     * To map dependency of task from data source.

     */
    dependency?: string;

    /**
     * To map progress of task from data source.

     */
    progress?: string;

    /**
     * To map child of task from data source.

     */
    child?: string;

    /**
     * To map milestone of task from data source.

     */
    milestone?: string;

    /**
     * To map duration of task from data source.

     */
    duration?: string;

    /**
     * To map duration unit of task from data source.
     */
    durationUnit?: string;

    /**
     * To map custom css class of task from data source.
     */
    cssClass?: string;

    /**
     * To map baseline start date of task from data source.
     */
    baselineStartDate?: string;

    /**
     * To map baseline end date of task from data source.
     */
    baselineEndDate?: string;

    /**
     * To map assigned resources of task from data source.
     */
    resourceInfo?: string;

    /**
     * To map expand status of parent record from data source.
     */
    expandState?: string;

    /**
     * To map indicators of task from data source.

     */
    indicators?: string;

    /**
     * To map notes value of task from data source.

     */
    notes?: string;

}