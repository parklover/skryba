/**
 * Interface for calculate failure event arguments.
 */
export interface FailureEventArgs {
    message: string;
    exception: Object;
    isForceCalculable: boolean;
    computeForceCalculate?: boolean;
}
/**

 */
export interface IFormulaColl {
    handler: Function;
    isCustom?: boolean;
    category?: string;
    description?: string;
}
/**

 */
export interface StoredCellInfo {
    cellValue: string | string[];
    cellRange: string[];
    criteria: string[];
    argArray: string[];
    isCriteria: string;
    storedCells: string[];
    isCountIfS: string;
    countVal?: number;
}
/**

 */
export interface IBasicFormula {
    formulaName: string;
    category?: string;
    description?: string;
}
