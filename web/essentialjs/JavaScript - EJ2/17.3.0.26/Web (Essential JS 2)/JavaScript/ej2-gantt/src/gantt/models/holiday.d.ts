import { ChildProperty } from '@syncfusion/ej2-base';
/**
 * Defines holidays of project.
 */
export declare class Holiday extends ChildProperty<Holiday> {
    /**
     * Defines start date of holiday.

     */
    from: Date | string;
    /**
     * Defines end date of holiday.

     */
    to: Date | string;
    /**
     * Defines label of holiday.

     */
    label: string;
    /**
     * Defines custom css class of holiday to customize background and label.

     */
    cssClass: string;
}
