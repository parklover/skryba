import { PivotFieldList } from '../base/field-list';
/**
 * Module to render Axis Fields
 */
export declare class AxisFieldRenderer {
    parent: PivotFieldList;
    private pivotButton;
    /** Constructor for render module */
    constructor(parent: PivotFieldList);
    /**
     * Initialize the pivot button rendering
     * @returns void
     * @private
     */
    render(): void;
    private createPivotButtons;
}
