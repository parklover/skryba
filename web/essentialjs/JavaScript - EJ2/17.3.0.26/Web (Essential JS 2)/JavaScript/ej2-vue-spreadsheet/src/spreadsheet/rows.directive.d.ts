import Vue from 'vue';
export declare class RowsDirective extends Vue {
    render(): void;
}
export declare const RowsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-row` directive represent a row of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rows>
 *    <e-row></e-row>
 *    </e-rows>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class RowDirective extends Vue {
    render(): void;
}
export declare const RowPlugin: {
    name: string;
    install(Vue: any): void;
};
