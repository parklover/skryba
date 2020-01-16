import Vue from 'vue';
export declare class DefinedNamesDirective extends Vue {
    render(): void;
}
export declare const DefinedNamesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-definedname` directive represent a defined name of the VueJS Spreadsheet.
 * It must be contained in a Spreadsheet component(`ejs-spreadsheet`).
 * ```vue
 * <ejs-spreadsheet>
 *   <e-definednames>
 *    <e-definedname></e-definedname>
 *    <e-definedname></e-definedname>
 *   </e-definednames>
 * </ejs-spreadsheet>
 * ```
 */
export declare class DefinedNameDirective extends Vue {
    render(): void;
}
export declare const DefinedNamePlugin: {
    name: string;
    install(Vue: any): void;
};
