import { Component, INotifyPropertyChanged, EmitType } from '@syncfusion/ej2-base';
import { ModuleDeclaration } from '@syncfusion/ej2-base';
import { WorkbookModel } from './workbook-model';
import { DefineNameModel } from '../common/class-model';
import { SheetModel } from './sheet-model';
import { CellModel } from './cell-model';
import { OpenOptions, BeforeOpenEventArgs, OpenFailureArgs } from '../../spreadsheet/common/interface';
import { CellStyleModel } from '../common/index';
import { BeforeSaveEventArgs, SaveCompleteEventArgs, BeforeCellFormatArgs, SaveOptions } from '../common/interface';
import { SortOptions, SortEventArgs } from '../common/interface';
import { ServiceLocator } from '../services/index';
/**
 * Represents the Workbook.
 */
export declare class Workbook extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Configures sheets and its options.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      sheets: [{
     *                  name: 'First Sheet',
     *                  rangeSettings: [{ dataSource: data }],
     *                  rows: [{
     *                          index: 5,
     *                          cells: [{ index: 4, value: 'Total Amount:' },
     *                                  { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
     *                  }]
     *              }, {
     *                  name: 'Second Sheet',
     *                  columns: [{ width: 180 }, { index: 4, width: 130 }]
     *              }]
     * ...
     *  }, '#Spreadsheet');
     * ```

     */
    sheets: SheetModel[];
    /**
     * Specifies active sheet tab in workbook.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      activeSheetTab: 2
     * ...
     *  }, '#Spreadsheet');
     * ```


     */
    activeSheetTab: number;
    /**
     * Defines the height of the Spreadsheet. It accepts height as pixels, number, and percentage.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      height: '550px'
     * ...
     *  }, '#Spreadsheet');
     * ```

     */
    height: string | number;
    /**
     * Defines the width of the Spreadsheet. It accepts width as pixels, number, and percentage.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      width: '550px'
     * ...
     *  }, '#Spreadsheet');
     * ```

     */
    width: string | number;
    /**
     * It shows or hides the ribbon in spreadsheet.

     */
    showRibbon: boolean;
    /**
     * It shows or hides the formula bar and its features.

     */
    showFormulaBar: boolean;
    /**
     * It shows or hides the sheets tabs, this is used to navigate among the sheets and create or delete sheets by UI interaction.

     */
    showSheetTabs: boolean;
    /**
     * It allows you to add new data or update existing cell data. If it is false, it will act as read only mode.

     */
    allowEditing: boolean;
    /**
     * It allows you to open an Excel file (.xlsx, .xls, and .csv) in Spreadsheet.

     */
    allowOpen: boolean;
    /**
     * It allows you to save Spreadsheet with all data as Excel file (.xlsx, .xls, and .csv).

     */
    allowSave: boolean;
    /**
     * It allows to enable/disable sort and its functionalities.

     */
    allowSorting: boolean;
    /**
     * It allows formatting a raw number into different types of formats (number, currency, accounting, percentage, short date,
     * long date, time, fraction, scientific, and text) with built-in format codes.

     */
    allowNumberFormatting: boolean;
    /**
     * It allows you to apply styles (font size, font weight, font family, fill color, and more) to the spreadsheet cells.

     */
    allowCellFormatting: boolean;
    /**
     * Specifies the cell style options.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      ...
     *          cellStyle: { fontWeight: 'bold', fontSize: 12,
     *              fontStyle: 'italic', textIndent: '2pt'
     *              backgroundColor: '#4b5366', color: '#ffffff'
     *      },
     *      ...
     *  }, '#Spreadsheet');
     * ```

     */
    cellStyle: CellStyleModel;
    /**
     * Specifies the service URL to open excel file in spreadsheet.

     */
    openUrl: string;
    /**
     * Specifies the service URL to save spreadsheet as Excel file.

     */
    saveUrl: string;
    /**
     * Specifies the name for a range and uses it in formula for calculation.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *      ...
     *      definedNames: [{ name: 'namedRange1', refersTo: 'A1:B5' }],
     *      ...
     *  }, '#Spreadsheet');
     * ```

     */
    definedNames: DefineNameModel[];
    /**
     * Triggers before opening an Excel file.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeOpen: (args: BeforeOpenEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeOpen: EmitType<BeforeOpenEventArgs>;
    /**
     * Triggers when the opened Excel file fails to load.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       openFailure: (args: OpenFailureArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    openFailure: EmitType<OpenFailureArgs>;
    /**
     * Triggers before saving the Spreadsheet as Excel file.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeSave: (args: BeforeSaveEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeSave: EmitType<BeforeSaveEventArgs>;
    /**
     * Triggers after saving the Spreadsheet as Excel file.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       saveComplete: (args: SaveCompleteEventArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    saveComplete: EmitType<SaveCompleteEventArgs>;
    /**
     * Triggers before the cell format applied to the cell.
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * new Spreadsheet({
     *       beforeCellFormat: (args: BeforeCellFormatArgs) => {
     *       }
     *      ...
     *  }, '#Spreadsheet');
     * ```
     * @event
     */
    beforeCellFormat: EmitType<BeforeCellFormatArgs>;
    commonCellStyle: CellStyleModel;
    /**
     * To generate sheet name based on sheet count.

     */
    sheetNameCount: number;
    serviceLocator: ServiceLocator;
    /**

     */
    isOpen: boolean;
    /**
     * Constructor for initializing the library.
     * @param options - Configures Workbook model.
     */
    constructor(options: WorkbookModel);
    /**
     * For internal use only.
     * @returns void

     */
    protected preRender(): void;
    private initWorkbookServices;
    /**
     * For internal use only.
     * @returns void

     */
    protected render(): void;
    /**
     * To provide the array of modules needed for workbook.
     * @return {ModuleDeclaration[]}

     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Get the properties to be maintained in the persisted state.
     * @returns string

     */
    getPersistData(): string;
    /**
     * Applies the style (font family, font weight, background color, etc...) to the specified range of cells.
     * @param {CellStyleModel} style - Specifies the cell style.
     * @param {string} range? - Specifies the address for the range of cells.
     */
    cellFormat(style: CellStyleModel, range?: string): void;
    getCellStyleValue(cssProps: string[], indexes: number[]): CellStyleModel;
    /**
     * Applies the number format (number, currency, percentage, short date, etc...) to the specified range of cells.
     * @param {string} format - Specifies the number format code.
     * @param {string} range? - Specifies the address for the range of cells.
     */
    numberFormat(format: string, range?: string): void;
    /**
     * Used to create new sheet.

     */
    createSheet(index?: number): void;
    /**
     * Used to remove sheet.

     */
    removeSheet(idx: number): void;
    /**
     * Destroys the Workbook library.
     */
    destroy(): void;
    /**
     * Called internally if any of the property value changed.
     * @param  {WorkbookModel} newProp
     * @param  {WorkbookModel} oldProp
     * @returns void

     */
    onPropertyChanged(newProp: WorkbookModel, oldProp: WorkbookModel): void;
    /**
     * Not applicable for workbook.

     */
    appendTo(selector: string | HTMLElement): void;
    /**
     * Used to hide/show the rows in spreadsheet.
     * @param {number} startRow - Specifies the start row index.
     * @param {number} endRow - Specifies the end row index.
     * @param {boolean} hide - To hide/show the rows in specified range.

     */
    showHideRow(hide: boolean, startRow: number, endRow?: number): void;
    private initEmptySheet;
    getActiveSheet(): SheetModel;
    /**
     * Used for setting the used range row and column index.

     */
    setUsedRange(rowIdx: number, colIdx: number): void;
    /**
     * Gets the range of data as JSON from the specified address.
     * @param {string} address - Specifies the address for range of cells.
     */
    getData(address: string): Promise<Map<string, CellModel>>;
    /**
     * Get component name.
     * @returns string

     */
    getModuleName(): string;
    getValueRowCol(sheetIndex: number, rowIndex: number, colIndex: number): string | number;
    setValueRowCol(sheetIndex: number, value: string | number, rowIndex: number, colIndex: number): void;
    /**
     * Opens the specified excel file or stream.
     * @param {OpenOptions} options - Options for opening the excel file.
     */
    open(options: OpenOptions): void;
    /**
     * Saves the Spreadsheet data to Excel file.
     * @param {SaveOptions} saveOptions - Options for saving the excel file.
     */
    save(saveOptions?: SaveOptions): void;
    /**
     * Sorts the range of cells in the active Spreadsheet.
     * @param sortOptions - options for sorting.
     * @param range - address of the data range.
     */
    sort(sortOptions?: SortOptions, range?: string): Promise<SortEventArgs>;
    /**
     * To update a cell properties.
     * @param {CellModel} cell - Cell properties.
     * @param {string} address - Address to update.
     */
    updateCell(cell: CellModel, address?: string): void;
    /**
     * Adds the defined name to the Spreadsheet.
     * @param {DefineNameModel} definedName - Specifies the name.
     * @return {boolean} - Return the added status of the defined name.
     */
    addDefinedName(definedName: DefineNameModel): boolean;
    /**
     * Removes the defined name from the Spreadsheet.
     * @param {string} definedName - Specifies the name.
     * @param {string} scope - Specifies the scope of the defined name.
     * @return {boolean} - Return the removed status of the defined name.
     */
    removeDefinedName(definedName: string, scope?: string): boolean;
    clearRange(address?: string, sheetIndex?: number, valueOnly?: boolean): void;
}
