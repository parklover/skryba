import { ComponentBase } from '@syncfusion/ej2-vue-base';
export declare const properties: string[];
export declare const modelProps: string[];
/**
 * Represents Vuejs Maps Component
 * ```vue
 * <ejs-maps></ejs-maps>
 * ```
 */
export declare class MapsComponent extends ComponentBase {
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
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    render(createElement: any): any;
    addLayer(layer: Object): void;
    addMarker(layerIndex: number, markerCollection: Object[]): void;
    export(type: Object, fileName: string, orientation?: Object): void;
    getGeoLocation(layerIndex: number, location: Object): Object;
    getLocalizedLabel(key: string): string;
    getTileGeoLocation(location: Object): Object;
    mapsOnClick(e: Object): void;
    mapsOnDoubleClick(e: Object): void;
    mapsOnResize(e: Object): boolean;
    mouseDownOnMap(e: Object): void;
    mouseEndOnMap(e: Object): boolean;
    mouseLeaveOnMap(e: Object): void;
    mouseMoveOnMap(e: Object): void;
    onMouseMove(e: Object): boolean;
    panByDirection(direction: Object): void;
    pointToLatLong(pageX: number, pageY: number): Object;
    print(id?: string[] | string | Object): void;
    processResponseJsonData(processType: string, data?: any | string, layer?: Object, dataType?: string): void;
    removeLayer(index: number): void;
    zoomByPosition(centerPosition: undefined, zoomFactor: number): void;
}
export declare const MapsPlugin: {
    name: string;
    install(Vue: any): void;
};
