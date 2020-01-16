import Vue from 'vue';
export declare class CellsDirective extends Vue {
    render(): void;
}
export declare const CellsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-cell` directive represent a cell of the VueJS Spreadsheet.
 * It must be contained in a `e-row` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row>
 *    <e-cells>
 *    <e-cell value='A1'></e-cell>
 *    </e-cells>
 *    </e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class CellDirective extends Vue {
    render(): void;
}
export declare const CellPlugin: {
    name: string;
    install(Vue: any): void;
};
