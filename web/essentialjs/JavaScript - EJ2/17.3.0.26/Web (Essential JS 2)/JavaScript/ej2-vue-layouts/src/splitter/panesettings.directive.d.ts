import Vue from 'vue';
export declare class PanesDirective extends Vue {
    render(): void;
}
export declare const PanesPlugin: {
    name: string;
    install(Vue: any): void;
};
/**
 * 'e-pane' directive represent a pane of Vue Splitter
 * It must be contained in a Splitter component(`ejs-splitter`).
 * ```html
 * <ejs-splitter id='splitter'>
 *   <e-panes>
 *    <e-pane size='150px'></e-pane>
 *    <e-pane size='150px'></e-pane>
 *   </e-panes>
 * </ejs-splitter>
 * ```
 */
export declare class PaneDirective extends Vue {
    render(): void;
}
export declare const PanePlugin: {
    name: string;
    install(Vue: any): void;
};
