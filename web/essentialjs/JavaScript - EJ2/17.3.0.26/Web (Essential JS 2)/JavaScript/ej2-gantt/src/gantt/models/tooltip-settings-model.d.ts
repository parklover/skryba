import { Property, ChildProperty } from '@syncfusion/ej2-base';

/**
 * Interface for a class TooltipSettings
 */
export interface TooltipSettingsModel {

    /**
     * Enables or disables tooltip of Gantt element.

     */
    showTooltip?: boolean;

    /**
     * Defines tooltip template for taskbar elements.

     */
    taskbar?: string;

    /**
     * Defines template for baseline tooltip element.

     */
    baseline?: string;

    /**
     * Defines template for dependency line tooltip.

     */
    connectorLine?: string;

    /**
     * Defines tooltip template for taskbar editing action.

     */
    editing?: string;

}