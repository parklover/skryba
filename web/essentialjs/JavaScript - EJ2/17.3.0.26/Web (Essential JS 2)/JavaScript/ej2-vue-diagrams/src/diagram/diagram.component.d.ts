import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents vue Diagram Component
 * ```html
 * <ejs-diagram></ejs-diagram>
 * ```
 */
export declare class DiagramComponent extends ComponentBase {
    ej2Instances: any;
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    protected hasInjectedModules: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    constructor();
    setProperties(prop: any, muteOnChange: boolean): void;
    render(createElement: any): any;
    add(obj: Object | Object, group?: boolean): Object | Object;
    addConnector(obj: Object): Object;
    addConnectorLabels(obj: Object, labels: Object[]): void;
    addConstraints(constraintsType: number, constraintsValue: number): number;
    addHistoryEntry(entry: Object): void;
    addLabels(obj: Object | Object, labels: Object[] | Object[] | Object[]): void;
    addLanes(node: Object, lane: Object[], index?: number): void;
    addLayer(layer: Object, layerObject?: Object[]): void;
    addNode(obj: Object, group?: boolean): Object;
    addNodeLabels(obj: Object, labels: Object[]): void;
    addNodeToLane(node: Object, swimLane: string, lane: string): void;
    addPhases(node: Object, phases: Object[]): void;
    addPorts(obj: Object, ports: Object[]): void;
    addProcess(process: Object, parentId: string): void;
    addTextAnnotation(annotation: Object, node: Object): void;
    align(option: Object, objects?: undefined[], type?: Object): void;
    bringIntoView(bound: Object): void;
    bringLayerForward(layerName: string): void;
    bringToCenter(bound: Object): void;
    bringToFront(): void;
    clear(): void;
    clearHistory(): void;
    clearSelection(): void;
    cloneLayer(layerName: string): void;
    copy(): Object;
    cut(): void;
    distribute(option: Object, objects?: undefined[]): void;
    doLayout(): Object;
    drag(obj: Object | Object | Object, tx: number, ty: number): void;
    dragSourceEnd(obj: Object, tx: number, ty: number): void;
    dragTargetEnd(obj: Object, tx: number, ty: number): void;
    endGroupAction(): void;
    exportDiagram(options: Object): string | Object;
    exportImage(image: string, options: Object): void;
    findElementUnderMouse(obj: Object, position: Object): Object;
    findObjectUnderMouse(objects: undefined[], action: Object, inAction: boolean): Object;
    findObjectsUnderMouse(position: Object, source?: Object): Object[];
    findTargetObjectUnderMouse(objects: undefined[], action: Object, inAction: boolean, position: Object, source?: Object): Object;
    fitToPage(options?: Object): void;
    getActiveLayer(): Object;
    getConnectorObject(id: string): Object;
    getCursor(action: string, active: boolean): string;
    getDiagramBounds(): Object;
    getDiagramContent(styleSheets?: Object): string;
    getNodeObject(id: string): Object;
    getObject(name: string): Object;
    getTool(action: string): Object;
    group(): void;
    hideTooltip(obj: Object | Object): void;
    insertData(node?: Object | Object): object;
    loadDiagram(data: string): Object;
    moveForward(): void;
    moveObjects(objects: string[], targetLayer?: string): void;
    moveObjectsUp(node: Object | Object, currentLayer: Object): void;
    nudge(direction: Object, x?: number, y?: number): void;
    pan(horizontalOffset: number, verticalOffset: number, focusedPoint?: Object): void;
    paste(obj?: undefined[]): void;
    print(options: Object): void;
    printImage(image: string, options: Object): void;
    redo(): void;
    remove(obj?: Object | Object): void;
    removeConstraints(constraintsType: number, constraintsValue: number): number;
    removeData(node?: Object | Object): object;
    removeLabels(obj: Object | Object, labels: Object[] | Object[]): void;
    removeLane(node: Object, lane: Object): void;
    removeLayer(layerId: string): void;
    removePhase(node: Object, phase: Object): void;
    removePorts(obj: Object, ports: Object[]): void;
    removeProcess(id: string): void;
    reset(): void;
    rotate(obj: Object | Object | Object, angle: number, pivot?: Object): boolean;
    sameSize(option: Object, objects?: undefined[]): void;
    saveDiagram(): string;
    scale(obj: Object | Object | Object, sx: number, sy: number, pivot: Object): boolean;
    select(objects: undefined[], multipleSelection?: boolean): void;
    selectAll(): void;
    sendBackward(): void;
    sendLayerBackward(layerName: string): void;
    sendToBack(): void;
    setActiveLayer(layerName: string): void;
    setStackLimit(stackLimit: number): void;
    showTooltip(obj: Object | Object): void;
    startGroupAction(): void;
    startTextEdit(node?: Object | Object, id?: string): void;
    unGroup(): void;
    unSelect(obj: Object | Object): void;
    undo(): void;
    updateData(node?: Object | Object): object;
    updateViewPort(): void;
    zoom(factor: number, focusedPoint?: Object): void;
    zoomTo(options: Object): void;
}
export declare const DiagramPlugin: {
    name: string;
    install(Vue: any): void;
};
