import Vue from 'vue';
export declare class PalettesDirective extends Vue {
    render(): void;
}
export declare const PalettesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `Palette` directive represent a axis palette of the vue SymbolPalette.
 * It must be contained in a SymbolPalette component(`SymbolPaletteComponent`).
 * ```html
 * <e-palettes><e-palette></e-palette><e-palettes>
 * ```
 */
export declare class PaletteDirective extends Vue {
    render(): void;
}
export declare const PalettePlugin: {
    name: string;
    install(Vue: any): void;
};
