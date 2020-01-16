import { ViewContainerRef } from '@angular/core';
import { ComplexBase, ArrayBase } from '@syncfusion/ej2-angular-base';
/**
 * `e-column` directive represent a column of the Angular QueryBuilder.
 * It must be contained in a QueryBuilder component(`ejs-querybuilder`).
 * ```html
 * <ejs-querybuilder [dataSource]='data'>
 *   <e-columns>
 *    <e-column field='ID' label='ID' type='number'></e-column>
 *    <e-column field='Date' label='Date' type='date' format='dd/MM/yyyy'></e-column>
 *   </e-columns>
 * </ejs-querybuilder>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnDirective> {
    private viewContainerRef;
    /**
     * Specifies the types in columns field

     */
    type: any;
    /**
     * Specifies the category for columns.

     */
    category: any;
    /**
     * Specifies the fields in columns.

     */
    field: any;
    /**
     * Specifies the date format for columns.

     */
    format: any;
    /**
     * Specifies the labels name in columns

     */
    label: any;
    /**
     * Specifies the operators in columns.

     */
    operators: any;
    /**
     * Specifies the step value(numeric textbox) for columns.

     */
    step: any;
    /**
     * Specifies the template for value field such as slider or any other widgets.

     */
    template: any;
    /**
     * Specifies the validation for columns (text, number and date).

     */
    validation: any;
    /**
     * Specifies the default value for columns.

     */
    value: any;
    /**
     * Specifies the values in columns or bind the values from sub controls.

     */
    values: any;
    constructor(viewContainerRef: ViewContainerRef);
}
/**
 * Column Array Directive
 * @private
 */
export declare class ColumnsDirective extends ArrayBase<ColumnsDirective> {
    constructor();
}
