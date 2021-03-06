import { Spreadsheet } from '../base/index';
/**
 * `Color Picker` module is used to handle ColorPicker functionality.

 */
export declare class ColorPicker {
    private parent;
    constructor(parent: Spreadsheet);
    private render;
    private updateSelectedColor;
    private wireFocusEvent;
    private openHandler;
    private beforeCloseHandler;
    private beforeModeSwitch;
    private destroy;
    private destroyColorPicker;
    private addEventListener;
    private removeEventListener;
}
