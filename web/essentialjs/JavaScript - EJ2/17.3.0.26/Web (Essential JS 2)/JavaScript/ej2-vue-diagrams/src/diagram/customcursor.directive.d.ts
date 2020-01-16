import Vue from 'vue';
export declare class CustomCursorsDirective extends Vue {
    render(): void;
}
export declare const CustomCursorsPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * `e-custormaps` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
export declare class CustomCursorDirective extends Vue {
    render(): void;
}
export declare const CustomCursorPlugin: {
    name: string;
    install(Vue: any): void;
};
