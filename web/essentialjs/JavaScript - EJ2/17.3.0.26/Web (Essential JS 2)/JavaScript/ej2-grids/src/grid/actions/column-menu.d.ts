import { IGrid, IAction } from '../base/interface';
import { ServiceLocator } from '../services/service-locator';
/**
 * 'column menu module used to handle column menu actions'

 */
export declare class ColumnMenu implements IAction {
    private element;
    private gridID;
    private parent;
    private serviceLocator;
    private columnMenu;
    private l10n;
    private defaultItems;
    private localeText;
    private targetColumn;
    private disableItems;
    private hiddenItems;
    private headerCell;
    private isOpen;
    private eventArgs;
    private GROUP;
    private UNGROUP;
    private ASCENDING;
    private DESCENDING;
    private ROOT;
    private FILTER;
    private POP;
    private WRAP;
    private CHOOSER;
    constructor(parent?: IGrid, serviceLocator?: ServiceLocator);
    private wireEvents;
    private unwireEvents;
    /**
     * To destroy the resize
     * @return {void}

     */
    destroy(): void;
    columnMenuHandlerClick(e: Event): void;
    private openColumnMenu;
    private columnMenuHandlerDown;
    private getColumnMenuHandlers;
    /**

     */
    addEventListener(): void;
    /**

     */
    removeEventListener(): void;
    private enableAfterRenderMenu;
    private render;
    private wireFilterEvents;
    private unwireFilterEvents;
    private beforeMenuItemRender;
    private columnMenuBeforeClose;
    private isChooserItem;
    private columnMenuBeforeOpen;
    private columnMenuOnOpen;
    private ensureDisabledStatus;
    private columnMenuItemClick;
    private columnMenuOnClose;
    private getDefaultItems;
    private getItems;
    private getDefaultItem;
    private getLocaleText;
    private generateID;
    private getKeyFromId;
    /**

     */
    getColumnMenu(): HTMLElement;
    private getModuleName;
    private setLocaleKey;
    private getHeaderCell;
    private getColumn;
    private createChooserItems;
    private appendFilter;
    private getFilter;
    private setPosition;
    private filterPosition;
    private getDefault;
    private isFilterPopupOpen;
    private getFilterPop;
    private isFilterItemAdded;
}
