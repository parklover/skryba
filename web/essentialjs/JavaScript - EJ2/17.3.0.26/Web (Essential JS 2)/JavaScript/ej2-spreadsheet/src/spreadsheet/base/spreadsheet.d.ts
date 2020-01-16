/// <reference path="../../workbook/base/workbook-model.d.ts" />
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { MenuItemModel, BeforeOpenCloseMenuEventArgs } from '@syncfusion/ej2-navigations';
import { BeforeOpenEventArgs } from '../common/index';
import { CollaborativeEditArgs } from '../common/index';
import { CellEditEventArgs, CellSaveEventArgs } from '../common/index';
import { PasteSpecialType } from '../common/index';
import { Render } from '../renderer/render';
import { Scroll } from '../actions/index';
import { CellRenderEventArgs, IRenderer, IViewport, OpenOptions, MenuSelectArgs } from '../common/index';
import { BeforeCellFormatArgs } from './../../workbook/index';
import { BeforeSaveEventArgs, SaveCompleteEventArgs } from './../../workbook/index';
import { CellModel } from './../../workbook/index';
import { BeforeSortEventArgs, SortOptions, SortEventArgs } from './../../workbook/index';
import { Workbook } from '../../workbook/base/workbook';
import { SpreadsheetModel } from './spreadsheet-model';
import { ScrollSettingsModel, SelectionSettingsModel } from '../common/index';
import { BeforeSelectEventArgs, SelectEventArgs } from '../common/index';
import { RefreshValueArgs } from '../integrations/index';
/**
 * Represents the Spreadsheet component.
 * ```html
 * <div id='spreadsheet'></div>
 * <script>
 *  var spreadsheetObj = new Spreadsheet();
 *  spreadsheetObj.appendTo('#spreadsheet');
 * </script>
 * ```
 */
export declare class Spreadsheet extends Workbook implements INotifyPropertyChanged {
    /**
     * To specify a CSS class or multiple CSS class separated by a space, add it in the Spreadsheet root element.
     * This allows you to customize the appearance of component.
     * ```html
     * <div id='spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *  cssClass: 'e-custom1 e-custom2',
     *  ...
     * }, '#spreadsheet');
     * ```

     */
    cssClass: string;
    /**
     * It specifies whether the Spreadsheet should be rendered with scrolling or not.
     * To customize the Spreadsheet scrolling behavior, use the [`scrollSettings`]
     * (https://ej2.syncfusion.com/documentation/api/spreadsheet/#scrollSettings) property.

     */
    allowScrolling: boolean;
    /**
     * If `allowResizing` is set to true, spreadsheet columns and rows can be resized.

     */
    allowResizing: boolean;
    /**
     * It enables or disables the clipboard operations (cut, copy, and paste) of the Spreadsheet.

     */
    enableClipboard: boolean;
    /**
     * It enables or disables the context menu option of spreadsheet. By default, context menu will opens for row header,
     * column header, sheet tabs, and cell.

     */
    enableContextMenu: boolean;
    /**
     * It allows you to interact with cell, pager, formula bar, and ribbon through the keyboard device.

     */
    enableKeyboardNavigation: boolean;
    /**
     * It enables shortcut keys to perform Spreadsheet operations like open, save, copy, paste, and more.

     */
    enableKeyboardShortcut: boolean;
    /**
     * Configures the selection settings.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      selectionSettings: {
     *          mode: 'None'
     *      }
     * ...
     * }, '#Spreadsheet');
     *
     * The selectionSettings `mode` property has three values and it is described below:
     *
     * * None: Disables UI selection.
     * * Single: Allows single selection of cell, row, or column and disables multiple selection.
     * * Multiple: Allows multiple selection of cell, row, or column and disables single selection.
     *
     * ```

     */
    selectionSettings: SelectionSettingsModel;
    /**
     * Configures the scroll settings.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      scrollSettings: {
     *          isFinite: true,
     *          enableVirtualization: false
     *      }
     * ...
     *  }, '#Spreadsheet');
     * ```
     * > The `allowScrolling` property should be `true`.

     */
    scrollSettings: ScrollSettingsModel;
    /**
     * Triggers before the cell appended to the DOM.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      beforeCellRender: (args: CellRenderEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeCellRender: EmitType<CellRenderEventArgs>;
    /**
     * Triggers before the cell or range of cells being selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      beforeSelect: (args: BeforeSelectEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeSelect: EmitType<BeforeSelectEventArgs>;
    /**
     * Triggers after the cell or range of cells is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      select: (args: SelectEventArgs) => {
     *      }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    select: EmitType<SelectEventArgs>;
    /**
     * Triggers before opening the context menu and it allows customizing the menu items.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    contextMenuBeforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before opening the file menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileMenuBeforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    fileMenuBeforeOpen: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before closing the context menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuBeforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    contextMenuBeforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers before closing the file menu.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileMenuBeforeClose: (args: BeforeOpenCloseMenuEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    fileMenuBeforeClose: EmitType<BeforeOpenCloseMenuEventArgs>;
    /**
     * Triggers when the context menu item is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       contextMenuItemSelect: (args: MenuSelectArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    contextMenuItemSelect: EmitType<MenuSelectArgs>;
    /**
     * Triggers when the file menu item is selected.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       fileItemSelect: (args: MenuSelectArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    fileItemSelect: EmitType<MenuSelectArgs>;
    /**
     * Triggers before the data is populated to the worksheet.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeDataBound: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeDataBound: EmitType<Object>;
    /**
     * Triggers when the data is populated in the worksheet.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       dataBound: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    dataBound: EmitType<Object>;
    /**
     * Triggers when the cell is being edited.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellEdit: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    cellEdit: EmitType<CellEditEventArgs>;
    /**
     * Triggers every time a request is made to access cell information.
     * This will be triggered when editing a cell.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellEditing: (args: CellEditEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    cellEditing: EmitType<CellEditEventArgs>;
    /**
     * Triggers when the edited cell is saved.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       cellSave: (args: CellSaveEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    cellSave: EmitType<CellSaveEventArgs>;
    /**
     * Triggers when the component is created.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       created: (args: Event) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    created: EmitType<Event>;
    /**
     * Triggers before sorting the specified range.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeSort: (args: BeforeSortEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeSort: EmitType<BeforeSortEventArgs>;
    /**
     * Triggers when the Spreadsheet actions (such as editing, formatting, sorting etc..) are starts.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       actionBegin: (args: BeforeCellFormatArgs|BeforeOpenEventArgs|BeforeSaveEventArgs|BeforeSelectEventArgs
     *                    |BeforeSortEventArgs|CellEditEventArgs|MenuSelectArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    actionBegin: EmitType<BeforeCellFormatArgs | BeforeOpenEventArgs | BeforeSaveEventArgs | BeforeSelectEventArgs | BeforeSortEventArgs | CellEditEventArgs | MenuSelectArgs>;
    /**
     * Triggers when the spreadsheet actions (such as editing, formatting, sorting etc..) gets completed.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       actionComplete: (args: SortEventArgs|CellSaveEventArgs|SaveCompleteEventArgs|Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    actionComplete: EmitType<SortEventArgs | CellSaveEventArgs | SaveCompleteEventArgs | Object>;
    /**
     * Triggers when the spreadsheet importing gets completed.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       openComplete: (args: Object) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    openComplete: EmitType<Object>;
    /**
     * Triggers after sorting action is completed.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       sortComplete: (args: SortEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    sortComplete: EmitType<SortEventArgs>;
    isEdit: boolean;
    renderModule: Render;
    scrollModule: Scroll;
    sheetModule: IRenderer;
    viewport: IViewport;
    protected needsID: boolean;
    /**
     * Constructor for creating the widget.
     * @param  {SpreadsheetModel} options? - Configures Spreadsheet options.
     * @param  {string|HTMLElement} element? - Element to render Spreadsheet.
     */
    constructor(options?: SpreadsheetModel, element?: string | HTMLElement);
    /**
     * To get cell element.
     * @returns HTMLElement

     */
    getCell(rowIndex: number, colIndex: number): HTMLElement;
    /**
     * Get cell element.
     * @returns HTMLTableRowElement

     */
    getRow(index: number, table?: HTMLTableElement): HTMLTableRowElement;
    hiddenRowsCount(startIndex: number, endIndex: number): number;
    /**
     * To initialize the services;
     * @returns void

     */
    protected preRender(): void;
    private initServices;
    /**
     * To Initialize the component rendering.
     * @returns void

     */
    protected render(): void;
    private renderSpreadsheet;
    /**
     * By default, Spreadsheet shows the spinner for all its actions. To manually show spinner you this method at your needed time.
     * @return {void}
     */
    showSpinner(): void;
    /**
     * To hide showed spinner manually.
     * @return {void}
     */
    hideSpinner(): void;
    /**
     * Selection will navigates to the specified cell address in active sheet.
     * @param {string} address - Specifies the cell address which needs to navigate.
     */
    goTo(address: string): void;
    /**
     * This method is used to resize the Spreadsheet component.
     */
    resize(): void;
    /**
     * To cut the specified cell or cells properties such as value, format, style etc...
     * @param {string} address - Specifies the range address to cut.
     */
    cut(address?: string): void;
    /**
     * To copy the specified cell or cells properties such as value, format, style etc...
     * @param {string} address - Specifies the range address.
     */
    copy(address?: string): void;
    /**
     * This method is used to paste the cut or copied cells in to specified address.
     * @param {string} address - Specifies the cell or range address.
     * @param {PasteSpecialType} type - Specifies the type of paste.
     */
    paste(address?: string, type?: PasteSpecialType): void;
    /**
     * To refresh the clients which needs to refresh in real time.
     * @param {CollaborativeEditArgs} options - Collaborative editing event options.
     */
    refreshClients(options: CollaborativeEditArgs): void;
    private setHeight;
    private setWidth;
    /**
     * Set the width of column.
     * @param {number} width
     * @param {number} colIndex
     * @param {number} sheetIndex
     */
    setColWidth(width: number, colIndex: number, sheetIndex: number): void;
    /**
     * Set the height of row.
     * @param {number} height
     * @param {number} rowIndex
     * @param {number} sheetIndex
     */
    setRowHeight(height: number, rowIndex: number, sheetIndex: number): void;
    setPanelSize(): void;
    /**
     * Opens the Excel file.
     * @param {OpenOptions} options - Options for opening the excel file.
     */
    open(options: OpenOptions): void;
    showHideRow(hide: boolean, startRow: number, endRow?: number): void;
    /**
     * Gets the row header div of the Spreadsheet.
     * @return {Element}

     */
    getRowHeaderContent(): HTMLElement;
    /**
     * Gets the column header div of the Spreadsheet.
     * @return {Element}

     */
    getColumnHeaderContent(): Element;
    /**
     * Gets the main content div of the Spreadsheet.
     * @return {Element}

     */
    getMainContent(): Element;
    /**
     * Get the main content table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    getContentTable(): HTMLTableElement;
    /**
     * Get the row header table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    getRowHeaderTable(): HTMLTableElement;
    /**
     * Get the column header table element of spreadsheet.
     * @return {HTMLTableElement}

     */
    getColHeaderTable(): HTMLTableElement;
    /**
     * To get the backup element count for row and column virtualization.

     */
    getThreshold(layout: string): number;
    isMobileView(): boolean;
    getValueRowCol(sheetIndex: number, rowIndex: number, colIndex: number): string | number;
    /**
     * To update a cell properties.
     * @param {CellModel} cell - Cell properties.
     * @param {string} address - Address to update.
     */
    updateCell(cell: CellModel, address?: string): void;
    /**
     * Sorts the range of cells in the active sheet.
     * @param sortOptions - options for sorting.
     * @param range - address of the data range.
     */
    sort(sortOptions?: SortOptions, range?: string): Promise<SortEventArgs>;
    setValueRowCol(sheetIndex: number, value: string | number, rowIndex: number, colIndex: number): void;
    /**
     * Get component name.
     * @returns string

     */
    getModuleName(): string;
    refreshNode(td: Element, args?: RefreshValueArgs): void;
    skipHiddenRows(startIdx: number, endIdx: number): number[];
    private mouseClickHandler;
    private mouseDownHandler;
    private keyUpHandler;
    private keyDownHandler;
    /**
     * Binding events to the element while component creation.
     */
    private wireEvents;
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     */
    destroy(): void;
    /**
     * Unbinding events from the element while component destroy.
     */
    private unwireEvents;
    /**
     * To add context menu items.
     * @param {MenuItemModel[]} items - Items that needs to be added.
     * @param {string} text - Item before / after that the element to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    addContextMenuItems(items: MenuItemModel[], text: string, insertAfter?: boolean, isUniqueId?: boolean): void;
    /**
     * To remove existing context menu items.
     * @param {string[]} items - Items that needs to be removed.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    removeContextMenuItems(items: string[], isUniqueId?: boolean): void;
    /**
     * To enable / disable context menu items.
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     */
    enableContextMenuItems(items: string[], enable?: boolean, isUniqueId?: boolean): void;
    /**
     * Selects the cell / range of cells with specified address.
     * @param {string} address - Specifies the range address.
     */
    selectRange(address: string): void;
    /**
     * Start edit the active cell.
     * @return {void}
     */
    startEdit(): void;
    /**
     * Cancels the edited state, this will not update any value in the cell.
     * @return {void}
     */
    closeEdit(): void;
    /**
     * If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     * @return {void}
     */
    endEdit(): void;
    /**
     * Called internally if any of the property value changed.
     * @param  {SpreadsheetModel} newProp
     * @param  {SpreadsheetModel} oldProp
     * @returns void

     */
    onPropertyChanged(newProp: SpreadsheetModel, oldProp: SpreadsheetModel): void;
    /**
     * To provide the array of modules needed for component rendering.
     * @return {ModuleDeclaration[]}

     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Appends the control within the given HTML Div element.
     * @param {string | HTMLElement} selector - Target element where control needs to be appended.
     */
    appendTo(selector: string | HTMLElement): void;
}
