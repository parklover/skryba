import Vue from 'vue';
export declare class ColumnsDirective extends Vue {
    render(): void;
}
export declare const ColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-column` directive represent a column of the VueJS TreeGrid.
 * It must be contained in a TreeGrid component(`ejs-treegrid`).
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *    <e-column field='ID' width='100'/>
 *    <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 * </ejs-treegrid>
 * ```
 */
export declare class ColumnDirective extends Vue {
    render(): void;
}
export declare const ColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
