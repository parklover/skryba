import { ChildProperty, Property } from '@syncfusion/ej2-base';import { FontFamily, TextAlign, VerticalAlign, FontWeight, FontStyle, TextDecoration } from './enum';

/**
 * Interface for a class CellStyle
 */
export interface CellStyleModel {

    /**
     * Specifies font family to the cell.

     */
    fontFamily?: FontFamily;

    /**
     * Specifies vertical align to the cell.

     */
    verticalAlign?: VerticalAlign;

    /**
     * Specifies text align style to the cell.

     */
    textAlign?: TextAlign;

    /**
     * Specifies text indent style to the cell.

     */
    textIndent?: string;

    /**
     * Specifies font color to the cell.

     */
    color?: string;

    /**
     * Specifies background color to the cell.

     */
    backgroundColor?: string;

    /**
     * Specifies font weight to the cell.

     */
    fontWeight?: FontWeight;

    /**
     * Specifies font style to the cell.

     */
    fontStyle?: FontStyle;

    /**
     * Specifies font size to the cell.

     */
    fontSize?: string;

    /**
     * Specifies text decoration to the cell.


     */
    textDecoration?: TextDecoration;

}

/**
 * Interface for a class DefineName
 */
export interface DefineNameModel {

    /**
     * Specifies name for the defined name, which can be used in formula.

     */
    name?: string;

    /**
     * Specifies scope for the defined name.

     */
    scope?: string;

    /**
     * Specifies comment for the defined name.

     */
    comment?: string;

    /**
     * Specifies reference for the defined name.

     */
    refersTo?: string;

}