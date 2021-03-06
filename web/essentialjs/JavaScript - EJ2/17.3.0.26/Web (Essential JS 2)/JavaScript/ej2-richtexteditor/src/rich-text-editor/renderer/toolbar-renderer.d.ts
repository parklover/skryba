import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { IRenderer, IRichTextEditor, IToolbarOptions, IDropDownModel, IColorPickerModel } from '../base/interface';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * `Toolbar renderer` module is used to render toolbar in RichTextEditor.

 */
export declare class ToolbarRenderer implements IRenderer {
    private mode;
    private toolbarPanel;
    protected parent: IRichTextEditor;
    private currentElement;
    private currentDropdown;
    private popupOverlay;
    private colorPicker;
    /**
     * Constructor for toolbar renderer module
     */
    constructor(parent?: IRichTextEditor);
    private wireEvent;
    private unWireEvent;
    private toolbarBeforeCreate;
    private toolbarCreated;
    private toolbarClicked;
    private dropDownSelected;
    private beforeDropDownItemRender;
    private dropDownOpen;
    private dropDownClose;
    renderToolbar(args: IToolbarOptions): void;
    renderDropDownButton(args: IDropDownModel): DropDownButton;
    private onPopupOverlay;
    private setIsModel;
    private paletteSelection;
    renderColorPickerDropDown(args: IColorPickerModel, item: string, colorPicker: ColorPicker): DropDownButton;
    private pickerRefresh;
    private popupModal;
    private setColorPickerContentWidth;
    renderColorPicker(args: IColorPickerModel, item: string): ColorPicker;
    /**
     * The function is used to render RichTextEditor toolbar
     */
    renderPanel(): void;
    /**
     * Get the toolbar element of RichTextEditor
     * @return {Element}
     */
    getPanel(): Element;
    /**
     * Set the toolbar element of RichTextEditor
     * @param  {Element} panel
     */
    setPanel(panel: Element): void;
}
