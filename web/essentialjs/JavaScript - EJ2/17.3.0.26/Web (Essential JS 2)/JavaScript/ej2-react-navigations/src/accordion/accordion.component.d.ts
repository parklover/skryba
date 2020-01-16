import * as React from 'react';
import { Accordion, AccordionModel } from '@syncfusion/ej2-navigations';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface AccordionTypecast {
    headerTemplate?: string | Function | any;
    itemTemplate?: string | Function | any;
}
/**
 * `AccordionComponent` represents the react Accordion Component.
 * ```ts
 * <AccordionComponent ></AccordionComponent
 * ```
 */
export declare class AccordionComponent extends Accordion {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<AccordionModel & DefaultHtmlAttributes | AccordionTypecast>;
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
    }> & Readonly<AccordionModel & DefaultHtmlAttributes | AccordionTypecast>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
