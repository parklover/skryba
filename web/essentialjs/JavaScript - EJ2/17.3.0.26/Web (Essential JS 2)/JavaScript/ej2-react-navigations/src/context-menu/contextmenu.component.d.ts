import * as React from 'react';
import { ContextMenu, ContextMenuModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `ContextMenuComponent` represents the react ContextMenu Component.
 * ```ts
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ContextMenuComponent target='#target' items={menuItems} />
 * ```
 */
export declare class ContextMenuComponent extends ContextMenu {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ContextMenuModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ContextMenuModel & DefaultHtmlAttributes>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
