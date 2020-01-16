import { IBasicFormula } from '../common/index';
import { Calculate } from '../base/index';
/**
 * Represents the basic formulas module.
 */
export declare class BasicFormulas {
    private parent;
    formulas: IBasicFormula[];
    private isConcat;
    constructor(parent?: Calculate);
    private init;
    private addFormulaCollection;
    ComputeSUM(...args: string[]): string | number;
    ComputeCOUNT(...args: string[]): number | string;
    ComputeDATE(...args: string[]): Date | string;
    ComputeFLOOR(...args: string[]): number | string;
    ComputeCEILING(...args: string[]): number | string;
    ComputeDAY(...serialNumber: string[]): number | string;
    ComputeIF(...args: string[]): string | number;
    ComputeIFERROR(...args: string[]): number | string;
    ComputePRODUCT(...range: string[]): string | number;
    ComputeDAYS(...range: string[]): number | string;
    ComputeCHOOSE(...args: string[]): string | number;
    ComputeSUMIF(...range: string[]): string | number;
    ComputeABS(...absValue: string[]): string | number;
    ComputeAVERAGE(...args: string[]): string;
    ComputeAVERAGEIF(...range: string[]): string | number;
    ComputeCONCATENATE(...range: string[]): string;
    ComputeCONCAT(...range: string[]): string;
    ComputeMAX(...args: string[]): string;
    ComputeMIN(...args: string[]): string;
    ComputeRAND(...args: string[]): string;
    ComputeAND(...args: string[]): string;
    ComputeOR(...args: string[]): string;
    ComputeFIND(...args: string[]): string | number;
    ComputeINDEX(...range: string[]): string | number;
    ComputeIFS(...range: string[]): string | number;
    ComputeCOUNTA(...args: string[]): number | string;
    ComputeAVERAGEA(...args: string[]): number | string;
    ComputeCOUNTIF(...args: string[]): number | string;
    ComputeSUMIFS(...range: string[]): string | number;
    ComputeCOUNTIFS(...args: string[]): number | string;
    ComputeAVERAGEIFS(...args: string[]): number | string;
    ComputeMATCH(...args: string[]): string | number;
    ComputeLOOKUP(...range: string[]): string | number;
    ComputeVLOOKUP(...range: string[]): string | number;
    ComputeSUBTOTAL(...range: string[]): string | number;
    ComputeRADIANS(...range: string[]): string | number;
    ComputeRANDBETWEEN(...range: string[]): string | number;
    protected getModuleName(): string;
}
