import * as React from 'react';
import { QueryBuilder, QueryBuilderModel } from '@syncfusion/ej2-querybuilder';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the React QueryBuilder Component
 * ```html
 * <QueryBuilderComponent></QueryBuilderComponent>
 * ```
 */
export declare class QueryBuilderComponent extends QueryBuilder {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<QueryBuilderModel & DefaultHtmlAttributes>;
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
    }> & Readonly<QueryBuilderModel & DefaultHtmlAttributes>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
