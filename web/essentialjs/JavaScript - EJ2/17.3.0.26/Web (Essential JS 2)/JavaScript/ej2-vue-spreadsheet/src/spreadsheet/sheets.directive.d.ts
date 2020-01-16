import Vue from 'vue';
export declare class SheetsDirective extends Vue {
    render(): void;
}
export declare const SheetsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-sheet` directive represent a sheet of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet></e-sheet>
 *    <e-sheet></e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class SheetDirective extends Vue {
    render(): void;
}
export declare const SheetPlugin: {
    name: string;
    install(Vue: any): void;
};
