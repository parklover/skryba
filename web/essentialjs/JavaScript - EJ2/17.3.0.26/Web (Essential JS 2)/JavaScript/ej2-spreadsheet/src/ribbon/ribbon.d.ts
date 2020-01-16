import { Component, INotifyPropertyChanged, EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { ItemModel, SelectingEventArgs, MenuItemModel, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { MenuEventArgs, BeforeOpenCloseMenuEventArgs, HeaderModel } from '@syncfusion/ej2-navigations';
import { RibbonModel, RibbonItemModel } from './ribbon-model';
import { SelectEventArgs } from '@syncfusion/ej2-dropdowns';
export declare type RibbonItemType = 'Tab' | 'Menu' | 'Sidebar';
/**
 * An array of object that is used to configure the Tab.
 */
export declare class RibbonItem extends ChildProperty<RibbonItem> {
    /**
     * The object used for configuring the Tab item header properties.

     */
    header: HeaderModel;
    /**
     * Specifies the content of Tab item, that is displayed when concern item header is selected.

     */
    content: ItemModel[];
    /**
     * Sets the CSS classes to the Tab item to customize its styles.

     */
    cssClass: string;
    /**
     * Sets true to disable user interactions of the Tab item.

     */
    disabled: boolean;
    /**
     * Sets true to disable user interactions of the Tab item.

     */
    type: RibbonItemType;
    /**
     * Specifies the sub menu items that is the array of MenuItem model.

     */
    menuItems: MenuItemModel[];
}
/**
 * Interface for ribbon content expand/collapse event.
 */
export interface ExpandCollapseEventArgs {
    /** Ribbon content element */
    element: HTMLElement;
    /** Represent whether the ribbon content is expanded/collapsed */
    expanded: boolean;
}
/**
 * Represents Ribbon component.
 */
export declare class Ribbon extends Component<HTMLDivElement> implements INotifyPropertyChanged {
    private toolbarObj;
    private tabObj;
    /**
     * Defines class/multiple classes separated by a space in the Spreadsheet element.

     */
    cssClass: string;
    /**
     * An array of object that is used to configure the Tab component.

     */
    items: RibbonItemModel[];
    /**
     * Triggers while selecting the tab item.
     * @event
     */
    selecting: EmitType<SelectingEventArgs>;
    /**
     * Triggers while selecting the file menu item.
     * @event
     */
    fileItemSelect: EmitType<MenuEventArgs>;
    /**
     * Triggers while rendering each file menu item.
     * @event
     */
    beforeFileItemRender: EmitType<MenuEventArgs>;
    /**
     * Triggers before opening the file menu.
     * @event
     */
    beforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before closing the file menu.
     * @event
     */
    beforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers format dropdown items gets selected.
     * @event

     */
    selectFormat: EmitType<SelectEventArgs>;
    /**
     * Triggers while clicking the ribbon content elements.
     * @event
     */
    clicked: EmitType<ClickEventArgs>;
    /**
     * Triggers once the component rendering is completed.
     * @event
     */
    created: EmitType<Event>;
    /**
     * Triggers once the component rendering is completed.
     * @event
     */
    expandCollapse: EmitType<ExpandCollapseEventArgs>;
    /**
     * Constructor for creating the widget.
     * @param  {RibbonModel} options?
     * @param  {string|HTMLDivElement} element?
     */
    constructor(options?: RibbonModel, element?: string | HTMLDivElement);
    /**
     * For internal use only.
     * @returns void
     * @private
     */
    protected preRender(): void;
    /**
     * For internal use only.
     * @returns void
     * @private
     */
    protected render(): void;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     * @method destroy
     * @return {void}
     */
    destroy(): void;
    private getTabItems;
    private initMenu;
    private renderRibbon;
    private ribbonExpandCollapse;
    /**
     * Enables or disables the specified Ribbon items or all ribbon items.
     * @param  {boolean} enable  - Boolean value that determines whether the command should be enabled or disabled.
     * @param  {HTMLElement} items - DOM element or an array of items to be enabled or disabled.
     * By default, `isEnable` is set to true.
     * @returns void.
     */
    enableItems(enable: boolean, items?: HTMLElement): void;
    /**
     * Get component name.
     * @returns string
     * @private
     */
    getModuleName(): string;
    /**
     * Get the properties to be maintained in the persisted state.
     * @returns string
     * @private
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     * @param  {RibbonModel} newProp
     * @param  {RibbonModel} oldProp
     * @returns void
     * @private
     */
    onPropertyChanged(newProp: RibbonModel, oldProp: RibbonModel): void;
    private destroyComponent;
}
