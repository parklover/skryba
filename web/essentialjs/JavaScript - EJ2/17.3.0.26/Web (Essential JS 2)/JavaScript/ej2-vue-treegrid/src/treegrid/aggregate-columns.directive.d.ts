import Vue from 'vue';
export declare class AggregateColumnsDirective extends Vue {
    render(): void;
}
export declare const AggregateColumnsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-aggregate->e-column` directive represent a aggregate column of the VueJS TreeGrid.
 * ```vue
 * <ejs-treegrid :dataSource='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'/>
 *     <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'/>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-treegrid>
 * ```
 */
export declare class AggregateColumnDirective extends Vue {
    render(): void;
}
export declare const AggregateColumnPlugin: {
    name: string;
    install(Vue: any): void;
};
