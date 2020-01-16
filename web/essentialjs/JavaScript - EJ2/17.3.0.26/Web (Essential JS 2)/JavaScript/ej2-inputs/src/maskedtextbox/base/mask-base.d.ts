/**

 * Built-in masking elements collection.
 */
export declare let regularExpressions: {
    [key: string]: string;
};
/**

 * Generate required masking elements to the MaskedTextBox from user mask input.
 */
export declare function createMask(): void;
/**

 * Apply mask ability with masking elements to the MaskedTextBox.
 */
export declare function applyMask(): void;
/**

 * To wire required events to the MaskedTextBox.
 */
export declare function wireEvents(): void;
/**

 * To unwire events attached to the MaskedTextBox.
 */
export declare function unwireEvents(): void;
/**

 * To bind required events to the MaskedTextBox clearButton.
 */
export declare function bindClearEvent(): void;
/**

 * To get masked value from the MaskedTextBox.
 */
export declare function unstrippedValue(element: HTMLInputElement): string;
/**

 * To extract raw value from the MaskedTextBox.
 */
export declare function strippedValue(element: HTMLInputElement, maskValues: string): string;
export declare function maskInputFocusHandler(event: MouseEvent | FocusEvent | TouchEvent | KeyboardEvent): void;
export declare function maskInputBlurHandler(event: MouseEvent | FocusEvent | TouchEvent | KeyboardEvent): void;
export declare function maskInputDropHandler(event: MouseEvent): void;
export declare function mobileRemoveFunction(): void;
/**

 * To set updated values in the MaskedTextBox.
 */
export declare function setMaskValue(val?: string): void;
/**

 * To set updated values in the input element.
 */
export declare function setElementValue(val: string, element?: HTMLInputElement): void;
/**

 * Provide mask support to input textbox through utility method.
 */
export declare function maskInput(args: MaskInputArgs): void;
/**

 * Gets raw value of the textbox which has been masked through utility method.
 */
export declare function getVal(args: GetValueInputArgs): string;
/**

 * Gets masked value of the textbox which has been masked through utility method.
 */
export declare function getMaskedVal(args: GetValueInputArgs): string;
/**

 * Arguments to get the raw and masked value of MaskedTextBox which has been masked through utility method.
 */
export interface GetValueInputArgs {
    element: HTMLInputElement;
    mask: string;
    promptChar?: string;
    customCharacters?: {
        [x: string]: Object;
    };
}
/**

 * Arguments to mask input textbox through utility method.
 */
export interface MaskInputArgs extends GetValueInputArgs {
    value?: string;
}
/**

 * Arguments to perform undo and redo functionalities.
 */
export declare class MaskUndo {
    value: string;
    startIndex: Number;
    endIndex: Number;
}
