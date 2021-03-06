import * as React from 'react';
import { Toolbar, ToolbarModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `ToolbarComponent` represents the react Toolbar Component.
 * ```ts
 * <ToolbarComponent overflowMode= 'Popup' ></ToolbarComponent
 * ```
 */
export declare class ToolbarComponent extends Toolbar {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ToolbarModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<ToolbarModel & DefaultHtmlAttributes>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
