import { Spreadsheet } from '../index';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
/**

 * The `Formula` module is used to handle the formulas and its functionalities in Spreadsheet.
 */
export declare class Formula {
    private parent;
    private isFormulaBar;
    private isFormula;
    private isPopupOpened;
    private isPreventClose;
    private isSubFormula;
    private argumentSeparator;
    private keyCodes;
    autocompleteInstance: AutoComplete;
    /**
     * Constructor for formula module in Spreadsheet.
     * @private
     */
    constructor(parent: Spreadsheet);
    /**
     * Get the module name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    /**
     * To destroy the formula module.
     * @return {void}

     */
    destroy(): void;
    private addEventListener;
    private removeEventListener;
    private performFormulaOperation;
    private renderAutoComplete;
    private onSuggestionOpen;
    private onSuggestionClose;
    private onSelect;
    private onSuggestionComplete;
    private keyUpHandler;
    private keyDownHandler;
    private clickHandler;
    private refreshFormulaSuggestion;
    private endEdit;
    private hidePopUp;
    private getSuggestionKeyFromFormula;
    private getPopupPosition;
    private getEditingValue;
    private isNavigationKey;
    private triggerKeyDownEvent;
    private getArgumentSeparator;
    private getNames;
    private getNameFromRange;
    private addDefinedName;
}
