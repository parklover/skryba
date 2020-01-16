import Vue from 'vue';
export declare class RangeSettingsDirective extends Vue {
    render(): void;
}
export declare const RangeSettingsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-rangesetting` directive represent a range setting of the VueJS Spreadsheet.
 * It must be contained in a `e-sheet` directive.
 * ```vue
 * <ejs-spreadsheet>
 *   <e-sheets>
 *    <e-sheet>
 *    <e-rangesettings>
 *    <e-rangesetting :dataSource='data'></e-rangesetting>
 *    </e-rangesettings>
 *    </e-sheet>
 *   </e-sheets>
 * </ejs-spreadsheet>
 * ```
 */
export declare class RangeSettingDirective extends Vue {
    render(): void;
}
export declare const RangeSettingPlugin: {
    name: string;
    install(Vue: any): void;
};
