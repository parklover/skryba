import { PivotView } from '../../pivotview/base/pivotview';
/**
 * Module to render Conditional Formatting Dialog
 */
export declare class ConditionalFormatting {
    parent: PivotView;
    /**
     * Internal variables.
     */
    private dialog;
    private parentID;
    private fieldsDropDown;
    private conditionsDropDown;
    private fontNameDropDown;
    private fontSizeDropDown;
    private fontColor;
    private backgroundColor;
    private newFormat;
    /** Constructor for conditionalformatting module */
    constructor(parent: PivotView);
    /**
     * To get module name.
     * @returns string
     */
    protected getModuleName(): string;
    private createDialog;
    private beforeOpen;
    private addButtonClick;
    private applyButtonClick;
    private cancelButtonClick;
    private refreshConditionValues;
    private addFormat;
    private createDialogElements;
    private renderDropDowns;
    private conditionChange;
    private fontNameChange;
    private fontSizeChange;
    private measureChange;
    private renderColorPicker;
    private backColorChange;
    private fontColorChange;
    private toggleButtonClick;
    /**
     * To check is Hex or not.
     * @returns boolean

     */
    isHex(h: string): boolean;
    /**
     * To convert hex to RGB.
     * @returns { r: number, g: number, b: number } | null

     */
    hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    /**
     * To convert color to hex.
     * @returns string

     */
    colourNameToHex(colour: string): string;
    /**
     * To create Conditional Formatting dialog.
     * @returns void
     */
    showConditionalFormattingDialog(): void;
    /**
     * To destroy the Conditional Formatting dialog
     * @returns void

     */
    destroy(): void;
}
