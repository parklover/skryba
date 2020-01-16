import { ComplexBase } from '@syncfusion/ej2-react-base';
import { ColumnsModel } from '@syncfusion/ej2-querybuilder';
/**
 * `ColumnDirective` represent a column of the react QueryBuilder.
 * It must be contained in a QueryBuilder component(`GridComponent`).
 * ```tsx
 * <QueryBuilderComponent dataSource={data}>
 *   <ColumnsDirective>
 *     <ColumnDirective field='ID' label='ID' type='number'></ColumnDirective>
 *     <ColumnDirective field='Date' label='Date' type='date' format='dd/MM/yyyy'></ColumnDirective>
 *   <ColumnsDirective>
 * </QueryBuilderComponent>
 * ```
 */
export declare class ColumnDirective extends ComplexBase<ColumnsModel, ColumnsModel> {
    static moduleName: string;
}
export declare class ColumnsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
