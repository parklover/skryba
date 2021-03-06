import * as React from 'react';
import { Tab, TabModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * `TabComponent` represents the react Tab Component.
 * ```ts
 * <TabComponent overflowMode= 'Popup'></TabComponent>
 * ```
 */
export declare class TabComponent extends Tab {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TabModel & DefaultHtmlAttributes>;
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
    }> & Readonly<TabModel & DefaultHtmlAttributes>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
