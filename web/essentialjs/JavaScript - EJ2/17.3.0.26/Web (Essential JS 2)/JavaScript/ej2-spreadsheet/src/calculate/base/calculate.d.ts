import { INotifyPropertyChanged, EmitType, ModuleDeclaration, Base } from '@syncfusion/ej2-base';
import { CalculateModel } from './calculate-model';
import { IFormulaColl, FailureEventArgs, StoredCellInfo } from '../common/interface';
import { Parser } from './parser';
/**
 * Represents the calculate library.
 */
export declare class Calculate extends Base<HTMLElement> implements INotifyPropertyChanged {
    private lFormulas;
    /* tslint:disable-next-line:no-any */
    libraryFormulas: any;
    storedData: Map<string, FormulaInfo>;
    private keyToRowsMap;
    private rowsToKeyMap;
    rightBracket: string;
    leftBracket: string;
    sheetToken: string;
    private emptyString;
    private leftBrace;
    private rightBrace;
    private cell;
    private cellPrefix;
    private treatEmptyStringAsZero;
    parentObject: Object | Calculate;
    tic: string;
    singleTic: string;
    trueValue: string;
    falseValue: string;
    private parseDecimalSeparator;
    arithMarker: string;
    arithMarker2: string;
    private dependentCells;
    private dependentFormulaCells;
    minValue: number;
    maxValue: number;
    categoryCollection: string[];
    private dependencyLevel;
    private refreshedCells;
    private computedValues;
    randomValues: Map<string, string>;
    isRandomVal: boolean;
    randCollection: string[];
    /**

     */
    formulaErrorStrings: string[];
    private errorStrings;
    grid: Object | Calculate;
    parser: Parser;
    private parseArgumentSeparator;
    private dateTime1900;
    private isParseDecimalSeparatorChanged;
    private isArgumentSeparatorChanged;
    private sheetFamilyID;
    private defaultFamilyItem;
    private sheetFamiliesList;
    private modelToSheetID;
    tokenCount: number;
    private sortedSheetNames;
    private tempSheetPlaceHolder;
    namedRanges: Map<string, string>;
    protected injectedModules: Function[];
    private formulaInfoTable;
    private oaDate;
    private millisecondsOfaDay;
    private parseDateTimeSeparator;
    /**
     * Specifies a value that indicates whether the basic formulas need to be included.

     */
    includeBasicFormulas: boolean;
    /**
     * Triggers when the calculation caught any errors.
     * @event
     */
    onFailure: EmitType<FailureEventArgs>;
    /**
     * Base constructor for creating Calculate library.
     */
    constructor(parent?: Object);
    /**
     * To get the argument separator to split the formula arguments.
     * @returns string
     */
    getParseArgumentSeparator(): string;
    /**
     * To set the argument separator to split the formula arguments.
     * @param {string} value - Argument separator based on the culture.
     * @returns void
     */
    setParseArgumentSeparator(value: string): void;
    /**
     * To get the date separator to split the date value.
     * @returns string
     */
    getParseDateTimeSeparator(): string;
    /**
     * To set whether the empty string is treated as zero or not.
     * @param {boolean} value
     * @returns boolean
     */
    setTreatEmptyStringAsZero(value: boolean): void;
    /**
     * To get whether the empty string is treated as zero or not.
     * @returns boolean
     */
    getTreatEmptyStringAsZero(): boolean;
    /**
     * To set the date separator to split the date value.
     * @param {string} value - Argument separator based on the culture.
     * @returns void
     */
    setParseDateTimeSeparator(value: string): void;
    /**
     * To provide the array of modules needed.

     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Dynamically injects the required modules to the library.

     */
    static Inject(...moduleList: Function[]): void;
    /**
     * Get injected modules

     */
    getInjectedModules(): Function[];
    onPropertyChanged(newProp: CalculateModel, oldProp: CalculateModel): void;
    protected getModuleName(): string;
    getFormulaCharacter(): string;
    isUpperChar(text: string): boolean;
    private resetKeys;
    /**

     */
    updateDependentCell(cellRef: string): void;
    /**

     */
    getDependentCells(): Map<string, string[]>;
    /**

     */
    getDependentFormulaCells(): Map<string, Map<string, string>>;
    /**
     * To get library formulas collection.
     * @returns Map<string, Function>
     */
    getLibraryFormulas(): Map<string, IFormulaColl>;
    /**
     * To get library function.
     * @param {string} libFormula - Library formula to get a corresponding function.
     * @returns Function
     */
    getFunction(libFormula: string): Function;
    getFormulaInfoTable(): Map<string, FormulaInfo>;
    /**
     * To get the formula text.
     * @private
     */
    private getFormula;
    /**
     * To get the formula text.
     * @returns void
     */
    getParseDecimalSeparator(): string;
    /**
     * To get the formula text.
     * @param {string} value - Specifies the decimal separator value.
     * @returns void
     */
    setParseDecimalSeparator(value: string): void;
    getSheetToken(cellRef: string): string;
    getSheetID(grd: Object): number;
    parseFloat(value: string | number): number;
    /**
     * To get the row index of the given cell.
     * @param {string} cell - Cell address for getting row index.
     * @returns number
     */
    rowIndex(cell: string): number;
    /**
     * To get the column index of the given cell.
     * @param {string} cell - Cell address for getting column index.
     * @returns number
     */
    colIndex(cell: string): number;
    /**
     * To get the valid error strings.

     */
    getErrorStrings(): string[];
    substring(text: string, startIndex: number, length?: number): string;
    isChar(c: string): boolean;
    getSheetFamilyItem(model: Object): CalcSheetFamilyItem;
    /**
     * Register a key value pair for formula.
     * @param {string} key - Key for formula reference .
     * @param {string | number} value - Value for the corresponding key.
     * @returns void
     */
    setKeyValue(key: string, value: string | number): void;
    /**

     */
    clearFormulaDependentCells(cell: string): void;
    private arrayRemove;
    /**
     * Register a key value pair for formula.
     * @param {string} key - Key for getting the corresponding value.
     * @returns string | number
     */
    getKeyValue(key: string): string | number;
    getNamedRanges(): Map<string, string>;
    /**
     * Adds a named range to the NamedRanges collection.
     * @param {string} name - Name of the named range.
     * @param {string} range - Range for the specified name.
     * @param {number} sheetIndex - Defined scope for the specified name. Default - Workbook scope.
     * @returns boolean
     */
    addNamedRange(name: string, range: string): boolean;
    /**
     * Remove the specified named range form the named range collection.
     * @param {string} name - Name of the specified named range.
     * @returns boolean
     */
    removeNamedRange(name: string): boolean;
    convertAlpha(col: number): string;
    getCellCollection(cellRange: string): string[] | string;
    /**
     * Compute the given formula.
     * @param {string} formulaText - Specifies to compute the given formula.
     * @returns string | number
     */
    computeFormula(formulaText: string): string | number;
    computeSumIfAndAvgIf(range: string[]): number[] | string;
    computeLookup(range: string[]): string;
    computeVLookup(range: string[]): string;
    findWildCardValue(lookVal: string, cellValue: string): string;
    getComputeSumIfValue(criteriaRange: string[] | string, sumRange: string[] | string, criteria: string, checkCriteria: number, op: string): number[];
    computeAndOr(args: string[], op: string): string;
    removeTics(text: string): string;
    private computeValue;
    private getValArithmetic;
    processLogical(stack: string[], operator: string): string;
    computeStoreCells(sCell: StoredCellInfo): string[];
    computeIfsFormulas(range: string[], isCountIfs?: string, isAvgIfs?: string): string | number;
    private processNestedFormula;
    isNaN(value: string | number): boolean;
    fromOADate(doubleNumber: number): Date;
    getSerialDateFromDate(year: number, month: number, day: number): number;
    private toOADate;
    calculateDate(date: string): string;
    isTextEmpty(s: string): boolean;
    isDigit(text: string): boolean;
    private findLastIndexOfq;
    /**
     * To get the exact value from argument.
     * @param {string} arg - Formula argument for getting a exact value.
     * @returns string
     */
    getValueFromArg(arg: string): string;
    private isDate;
    private isValidCellReference;
    parseDate(date: any): any;
    isCellReference(args: string): boolean;
    setTokensForSheets(text: string): string;
    private getParentObjectCellValue;
    private getParentCellValue;
    /**
     * Getting the formula result.
     * @param {Object} grid - Specifies the parent object.
     * @param {number} row - Row index of the parent object or key.
     * @param {number} col - Column index of the parent object.
     * @returns string
     */
    getValueRowCol(grid: Object, row: number, col: number): string;
    /**
     * To add custom library formula.
     * @param {string} formulaName - Custom Formula name.
     * @param {string} functionName - Custom function name.
     * @returns void
     */
    defineFunction(formulaName: string, functionName: string | Function): void;
    /**
     * Specifies when changing the value.
     * @param {string} grid - Parent object reference name.
     * @param {ValueChangedArgs} changeArgs - Value changed arguments.
     * @param {boolean} isCalculate - Value that allow to calculate.
     */
    valueChanged(grid: string, changeArgs: ValueChangedArgs, isCalculate?: boolean): void;
    getComputedValue(): Map<string, string | number>;
    /**

     */
    setValueRowCol(value: number, formulaValue: string | number, row: number, col: number): void;
    private getSortedSheetNames;
    getErrorLine(error: string): string;
    createSheetFamilyID(): number;
    computeMinMax(args: string[], operation: string): string;
    calculateAvg(args: string[]): string;
    /**

     */
    registerGridAsSheet(refName: string, model: Object | string, sheetFamilyID: number): string;
    /**

     */
    unregisterGridAsSheet(refName: string, model: string | Object): void;
    private isSheetMember;
    /**
     * To dispose the calculate engine.
     * @returns void
     */
    dispose(): void;
    refreshRandValues(cellRef: string): void;
    refresh(cellRef: string): void;
}
export declare class FormulaError {
    /**

     */
    message: string;
    formulaCorrection: boolean;
    constructor(errorMessage: string, formulaAutoCorrection?: boolean);
}
export declare class FormulaInfo {
    /**

     */
    calcID: number;
    /**

     */
    formulaText: string;
    private formulaValue;
    private parsedFormula;
    private calcID1;
    /**

     */
    getFormulaText(): string;
    /**

     */
    setFormulaText(value: string): void;
    /**

     */
    getFormulaValue(): string | number;
    /**

     */
    setFormulaValue(value: string | number): void;
    /**

     */
    getParsedFormula(): string;
    /**

     */
    setParsedFormula(value: string): void;
}
export declare class CalcSheetFamilyItem {
    /**

     */
    isSheetMember: boolean;
    /**

     */
    parentObjectToToken: Map<Object, string>;
    /**

     */
    sheetDependentCells: Map<string, string[]>;
    /**

     */
    sheetDependentFormulaCells: Map<string, Map<string, string>>;
    /**

     */
    sheetNameToParentObject: Map<string, Object>;
    /**

     */
    sheetNameToToken: Map<string, string>;
    /**

     */
    tokenToParentObject: Map<string, Object>;
    /**

     */
    sheetFormulaInfotable: Map<string, FormulaInfo>;
}
/**

 */
export declare function getAlphalabel(col: number): string;
export declare class ValueChangedArgs {
    row: number;
    col: number;
    value: number | string;
    getRowIndex: Function;
    setRowIndex: Function;
    getColIndex: Function;
    setColIndex: Function;
    getValue: Function;
    setValue: Function;
    constructor(row: number, col: number, value: number | string);
}
