import { IGrid, IRenderer, NotifyArgs, VirtualInfo, IModelGenerator } from '../base/interface';
import { Column } from '../models/column';
import { Row } from '../models/row';
import { ContentRender } from './content-renderer';
import { HeaderRender } from './header-renderer';
import { ServiceLocator } from '../services/service-locator';
/**
 * VirtualContentRenderer

 */
export declare class VirtualContentRenderer extends ContentRender implements IRenderer {
    private count;
    private maxPage;
    private maxBlock;
    private prevHeight;
    private observer;
    private prevInfo;
    private currentInfo;
    private vgenerator;
    private header;
    private locator;
    private preventEvent;
    private actions;
    private content;
    private offsets;
    private tmpOffsets;
    private virtualEle;
    private offsetKeys;
    private isFocused;
    private isSelection;
    private selectedRowIndex;
    private isBottom;
    constructor(parent: IGrid, locator?: ServiceLocator);
    renderTable(): void;
    renderEmpty(tbody: HTMLElement): void;
    private scrollListener;
    private block;
    private getInfoFromView;
    ensureBlocks(info: VirtualInfo): number[];
    appendContent(target: HTMLElement, newChild: DocumentFragment, e: NotifyArgs): void;
    protected onDataReady(e?: NotifyArgs): void;
    private setVirtualHeight;
    private getPageFromTop;
    private getTranslateY;
    getOffset(block: number): number;
    private onEntered;
    private dataBound;
    eventListener(action: string): void;
    getBlockSize(): number;
    getBlockHeight(): number;
    isEndBlock(index: number): boolean;
    getGroupedTotalBlocks(): number;
    getTotalBlocks(): number;
    getColumnOffset(block: number): number;
    getModelGenerator(): IModelGenerator<Column>;
    private resetScrollPosition;
    private onActionBegin;
    getRows(): Row<Column>[];
    getRowByIndex(index: number): Element;
    getVirtualRowIndex(index: number): number;
    private refreshOffsets;
    refreshVirtualElement(): void;
    setVisible(columns?: Column[]): void;
    private selectVirtualRow;
}
/**

 */
export declare class VirtualHeaderRenderer extends HeaderRender implements IRenderer {
    virtualEle: VirtualElementHandler;
    private gen;
    constructor(parent: IGrid, locator: ServiceLocator);
    renderTable(): void;
    appendContent(table: Element): void;
    refreshUI(): void;
    setVisible(columns?: Column[]): void;
    private setDisplayNone;
}
/**

 */
export declare class VirtualElementHandler {
    wrapper: HTMLElement;
    placeholder: HTMLElement;
    content: HTMLElement;
    table: HTMLElement;
    renderWrapper(height?: number): void;
    renderPlaceHolder(position?: string): void;
    adjustTable(xValue: number, yValue: number): void;
    setWrapperWidth(width: string, full?: boolean): void;
    setVirtualHeight(height?: number, width?: string): void;
}
