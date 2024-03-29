import { Component, ChildProperty } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { NodeModel, ConnectorModel } from '../diagram/index';
import { BpmnDiagrams } from '../diagram/index';
import { DiagramElement, MarginModel, PointModel } from '../diagram/index';
import { SymbolPaletteModel, SymbolPreviewModel, PaletteModel } from './symbol-palette-model';
import { TextWrap, TextOverflow, IPaletteSelectionChangeArgs } from '../diagram/index';
/**
 * A palette allows to display a group of related symbols and it textually annotates the group with its header.
 */
export declare class Palette extends ChildProperty<Palette> {
    /**
     * Defines the unique id of a symbol group

     */
    id: string;
    /**
     * Sets the height of the symbol group



     */
    height: number;
    /**
     * Sets whether the palette items to be expanded or not

     */
    expanded: boolean;
    /**
     * Defines the content of the symbol group

     */
    iconCss: string;
    /**
     * Defines the title of the symbol group

     */
    title: string;
    /**
     * Defines the collection of predefined symbols

     */
    symbols: (NodeModel | ConnectorModel)[];
    /** @private */
    isInteraction: boolean;
}
/**
 * customize the preview size and position of the individual palette items.
 */
export declare class SymbolPreview extends ChildProperty<SymbolPreview> {
    /**
     * Sets the preview width of the symbols



     */
    width: number;
    /**
     * Sets the preview height of the symbols



     */
    height: number;
    /**
     * Defines the distance to be left between the cursor and symbol

     */
    offset: PointModel;
}
/**
 * Represents the Symbol Palette Component.
 * ```html
 * <div id="symbolpalette"></div>
 * <script>
 *  var palette = new SymbolPalatte({ allowDrag:true });
 *  palette.appendTo("#symbolpalette");
 * </script>
 * ```
 */
/**
 * The symbol palette control allows to predefine the frequently used nodes and connectors
 * and to drag and drop those nodes/connectors to drawing area
 */
export declare class SymbolPalette extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Configures the key, when it pressed the symbol palette will be focused

     */
    accessKey: string;
    /**
     * Defines the width of the symbol palette

     */
    width: string | number;
    /**
     * Defines the height of the symbol palette

     */
    height: string | number;
    /**
     * Defines the collection of symbol groups

     */
    palettes: PaletteModel[];
    /**
     * Defines the size, appearance and description of a symbol



     */
    /**
     * ```html
     * <div id="symbolpalette"></div>
     *  ```
     * ```typescript
     * let palette: SymbolPalette = new SymbolPalette({
     *   expandMode: 'Multiple',
     *   palettes: [
     *       { id: 'flow', expanded: false, symbols: getFlowShapes(), title: 'Flow Shapes' },
     *   ],
     *   width: '100%', height: '100%', symbolHeight: 50, symbolWidth: 50,
     *   symbolPreview: { height: 100, width: 100 },
     *   enableSearch: true,
     *   getNodeDefaults: setPaletteNodeDefaults,
     *   symbolMargin: { left: 12, right: 12, top: 12, bottom: 12 },
     *   getSymbolInfo: (symbol: NodeModel): SymbolInfo => {
     *       return { fit: true };
     *   }
     * });
     * palette.appendTo('#symbolpalette');
     * export function getFlowShapes(): NodeModel[] {
     *   let flowShapes: NodeModel[] = [
     *       { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' }, style: { strokeWidth: 2 } },
     *       { id: 'Process', shape: { type: 'Flow', shape: 'Process' }, style: { strokeWidth: 2 } },
     *       { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' }, style: { strokeWidth: 2 } }
     *   ];
     *   return flowShapes;
     * }
     * function setPaletteNodeDefaults(node: NodeModel): void {
     * if (node.id === 'Terminator' || node.id === 'Process') {
     *   node.width = 130;
     *   node.height = 65;
     * } else {
     *   node.width = 50;
     *   node.height = 50;
     * }
     * node.style.strokeColor = '#3A3A3A';
     * }
     * ```

     */
    getSymbolInfo: Function | string;
    /**
     * Defines the size, appearance and description of a symbol
     */
    symbolInfo: SymbolInfo;
    /**
     * Defines the symbols to be added in search palette



     */
    filterSymbols: Function | string;
    /**
     * Defines the symbols to be added in search palette
     */
    ignoreSymbolsOnSearch: string[];
    /**
     * Defines the content of a symbol




     */
    getSymbolTemplate: Function | string;
    /**
     * Defines the width of the symbol



     */
    symbolWidth: number;
    /**
     * Defines the height of the symbol



     */
    symbolHeight: number;
    /**
     * Defines the space to be left around a symbol

     */
    symbolMargin: MarginModel;
    /**
     * Defines whether the symbols can be dragged from palette or not

     */
    allowDrag: boolean;
    /**
     * Defines the size and position of the symbol preview



     */
    symbolPreview: SymbolPreviewModel;
    /**
     * Enables/Disables search option in symbol palette

     */
    enableSearch: boolean;
    /**
     * Enables/Disables animation when the palette header is expanded/collapsed
     */
    enableAnimation: boolean;
    /**
     * Defines how many palettes can be at expanded mode at a time

     */
    expandMode: ExpandMode;
    /**
     * Triggers after the selection changes in the symbol palette
     * @event

     */
    paletteSelectionChange: EmitType<IPaletteSelectionChangeArgs>;
    /**
     * `bpmnModule` is used to add built-in BPMN Shapes to diagrams
     * @private
     */
    bpmnModule: BpmnDiagrams;
    /**
     * Helps to return the default properties of node

     */
    getNodeDefaults: Function | string;
    /**
     * Helps to return the default properties of node

     */
    nodeDefaults: NodeModel;
    /**
     * Helps to return the default properties of connector

     */
    getConnectorDefaults: Function | string;
    /**
     * Helps to return the default properties of connectors

     */
    connectorDefaults: ConnectorModel;
    /** @private */
    selectedSymbols: NodeModel | ConnectorModel;
    /**   @private  */
    symbolTable: {};
    /**   @private  */
    childTable: {};
    private diagramRenderer;
    private svgRenderer;
    private accordionElement;
    private highlightedSymbol;
    private selectedSymbol;
    private info;
    private timer;
    private draggable;
    private laneTable;
    private isExpand;
    private isExpandMode;
    private isMethod;
    /**
     * Constructor for creating the component

     */
    constructor(options?: SymbolPaletteModel, element?: Element);
    /**
     * Refreshes the panel when the symbol palette properties are updated
     * @param newProp Defines the new values of the changed properties
     * @param oldProp Defines the old values of the changed properties
     */
    onPropertyChanged(newProp: SymbolPaletteModel, oldProp: SymbolPaletteModel): void;
    /**
     * Get the properties to be maintained in the persisted state.
     * @return {string}
     */
    getPersistData(): string;
    /**
     * Initialize nodes, connectors and renderer
     */
    protected preRender(): void;
    /**
     * Renders nodes and connectors in the symbol palette
     */
    render(): void;
    /**
     * To get Module name
     *  @private
     */
    getModuleName(): string;
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * To destroy the symbol palette
     * @return {void}
     */
    destroy(): void;
    /**
     * Method to initialize the items in the symbols
     */
    private initSymbols;
    /**
     * Method to create the palette
     */
    private renderPalette;
    /**
     * Used to add the palette item as nodes or connectors in palettes
     */
    addPaletteItem(paletteName: string, paletteSymbol: NodeModel | ConnectorModel): void;
    /**
     * Used to remove the palette item as nodes or connectors in palettes
     */
    removePaletteItem(paletteName: string, symbolId: string): void;
    /**
     * Method to create the symbols in canvas
     */
    private prepareSymbol;
    private getContainer;
    /**
     * Method to get the symbol text description
     * @return {void}
     * @private
     */
    private getSymbolDescription;
    /**
     * Method to renders the symbols
     * @return {void}
     * @private
     */
    private renderSymbols;
    /**
     * Method to clone the symbol for previewing the symbols
     * @return {void}
     * @private
     */
    private getSymbolPreview;
    private measureAndArrangeSymbol;
    private updateSymbolSize;
    /**
     * Method to create canvas and render the symbol
     * @return {void}
     * @private
     */
    private getSymbolContainer;
    private getGroupParent;
    private getHtmlSymbol;
    private getSymbolSize;
    private getMousePosition;
    private mouseMove;
    private mouseUp;
    private keyUp;
    private mouseDown;
    private keyDown;
    private initDraggable;
    /**
     * helper method for draggable
     * @return {void}
     * @private
     */
    private helper;
    private dragStart;
    private dragStop;
    private scaleSymbol;
    private scaleChildren;
    private measureChild;
    private scaleGroup;
    private refreshPalettes;
    private updatePalettes;
    private createTextbox;
    private getFilterSymbol;
    private searchPalette;
    private createSearchPalette;
    /**
     * Method to bind events for the symbol palette
     */
    private wireEvents;
    /**
     * Method to unbind events for the symbol palette
     */
    private unWireEvents;
}
/**
 * Defines the size and description of a symbol
 */
export interface SymbolInfo {
    /**
     * Defines the width of the symbol to be drawn over the palette



     */
    width?: number;
    /**
     * Defines the height of the symbol to be drawn over the palette



     */
    height?: number;
    /**
     * Defines whether the symbol has to be fit inside the size, that is defined by the symbol palette

     */
    fit?: boolean;
    /**
     * Define the template of the symbol that is to be drawn over the palette

     */
    template?: DiagramElement;
    /**
     * Define the text to be displayed and how that is to be handled.

     */
    description?: SymbolDescription;
    /**
     * Define the text to be displayed when mouse hover on the shape.

     */
    tooltip?: string;
}
/**
 * Defines the textual description of a symbol
 */
export interface SymbolDescription {
    /**
     * Defines the symbol description



     */
    text?: string;
    /**
     * Defines how to handle the text when its size exceeds the given symbol size
     * * Wrap - Wraps the text to next line, when it exceeds its bounds
     * * Ellipsis - It truncates the overflown text and represents the clipping with an ellipsis
     * * Clip - It clips the overflow text

     */
    overflow?: TextOverflow;
    /**
     * Defines how to wrap the text
     * * WrapWithOverflow - Wraps the text so that no word is broken
     * * Wrap - Wraps the text and breaks the word, if necessary
     * * NoWrap - Text will no be wrapped

     */
    wrap?: TextWrap;
}
