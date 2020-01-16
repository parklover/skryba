/**
 * Circular Gauge
 */
import { Component, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { EmitType, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { CircularGaugeModel } from './circular-gauge-model';
import { ILoadedEventArgs, IAnimationCompleteEventArgs, IThemeStyle, ILegendRenderEventArgs } from './model/interface';
import { IAxisLabelRenderEventArgs, IRadiusCalculateEventArgs, IPointerDragEventArgs, IResizeEventArgs } from './model/interface';
import { ITooltipRenderEventArgs, IAnnotationRenderEventArgs, IMouseEventArgs } from './model/interface';
import { Size, Rect, GaugeLocation } from './utils/helper';
import { GaugeTheme } from './utils/enum';
import { BorderModel, MarginModel, FontModel, TooltipSettingsModel } from './model/base-model';
import { Axis, Pointer } from './axes/axis';
import { Annotations } from './annotations/annotations';
import { GaugeTooltip } from './user-interaction/tooltip';
import { AxisModel } from './axes/axis-model';
import { AxisLayoutPanel } from './axes/axis-panel';
import { LegendSettingsModel } from './legend/legend-model';
import { Legend } from './legend/legend';
/**
 * Represents the Circular gauge control.
 * ```html
 * <div id="gauge"/>
 * <script>
 *   var gaugeObj = new CircularGauge();
 *   gaugeObj.appendTo("#gauge");
 * </script>
 * ```
 */
export declare class CircularGauge extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * annotationModule is used to add annotation in gauge.
     */
    annotationsModule: Annotations;
    /**
     * `tooltipModule` is used to show the tooltip to the circular gauge..
     */
    tooltipModule: GaugeTooltip;
    /**
     * `legendModule` is used to manipulate and add legend to the chart.
     */
    legendModule: Legend;
    /**
     * The width of the circular gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full width of its parent element.

     */
    width: string;
    /**
     * The height of the circular gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full height of its parent element.

     */
    height: string;
    /**
     * Options for customizing the color and width of the gauge border.
     */
    border: BorderModel;
    /**
     *
     */
    /**
     * The background color of the gauge, which accepts value in hex, rgba as a valid CSS color string.

     */
    background: string;
    /**
     * Title for gauge

     */
    title: string;
    /**
     * Options for customizing the title of Gauge.
     */
    titleStyle: FontModel;
    /**
     *  Options to customize the left, right, top and bottom margins of the gauge.
     */
    margin: MarginModel;
    /**
     * Options for customizing the axes of gauge
     */
    axes: AxisModel[];
    /**
     * Options for customizing the tooltip of gauge.
     */
    tooltip: TooltipSettingsModel;
    /**
     * If set true, pointers can able to drag on interaction.

     */
    enablePointerDrag: boolean;
    /**
     * X coordinate of the circular gauge center point, which takes values either in pixels or in percentage.

     */
    centerX: string;
    /**
     * Y coordinate of the circular gauge center point, which takes values either in pixels or in percentage.

     */
    centerY: string;
    /**
     * To place the half or quarter circle in center position, if values not specified for centerX and centerY.

     */
    moveToCenter: boolean;
    /**
     * Specifies the theme for circular gauge.
     * * Material - Gauge render with material theme.
     * * Fabric - Gauge render with fabric theme.

     */
    theme: GaugeTheme;
    /**
     * Specifies whether a grouping separator should be used for a number.

     */
    useGroupingSeparator: boolean;
    /**
     * Information about gauge for assistive technology.

     */
    description: string;
    /**
     * TabIndex value for the gauge.

     */
    tabIndex: number;
    /**
     * Options for customizing the legend of the chart.
     */
    legendSettings: LegendSettingsModel;
    /**
     * Triggers after gauge loaded.
     * @event

     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before gauge load.
     * @event

     */
    load: EmitType<ILoadedEventArgs>;
    /**
     * Triggers after animation gets completed for pointers.
     * @event

     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before each axis label gets rendered.
     * @event


     */
    axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before the radius gets rendered
     * @event

     */
    radiusCalculate: EmitType<IRadiusCalculateEventArgs>;
    /**
     * Triggers before each annotation gets rendered.
     * @event

     */
    annotationRender: EmitType<IAnnotationRenderEventArgs>;
    /**
     * Triggers before each legend gets rendered.
     * @event


     */
    legendRender: EmitType<ILegendRenderEventArgs>;
    /**
     * Triggers before the tooltip for pointer gets rendered.
     * @event

     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers before the pointer is dragged.
     * @event

     */
    dragStart: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers while dragging the pointers.
     * @event

     */
    dragMove: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers after the pointer is dragged.
     * @event

     */
    dragEnd: EmitType<IPointerDragEventArgs>;
    /**
     * Triggers on hovering the circular gauge.
     * @event

     */
    gaugeMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers while cursor leaves the circular gauge.
     * @event

     */
    gaugeMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers on mouse down.
     * @event

     */
    gaugeMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers on mouse up.
     * @event

     */
    gaugeMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers after window resize.
     * @event

     */
    resized: EmitType<IResizeEventArgs>;
    /** @private */
    renderer: SvgRenderer;
    /** @private */
    svgObject: Element;
    /** @private */
    availableSize: Size;
    /** @private */
    intl: Internationalization;
    /** @private */
    private resizeTo;
    /** @private */
    midPoint: GaugeLocation;
    /** @private */
    activePointer: Pointer;
    /** @private */
    activeAxis: Axis;
    /** @private */
    gaugeRect: Rect;
    /** @private */
    animatePointer: boolean;
    /** @private */
    /**
     * Render axis panel for gauge.

     */
    gaugeAxisLayoutPanel: AxisLayoutPanel;
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /** @private */
    isBlazor: boolean;
    /** @private */
    isDrag: boolean;
    /** @private */
    isTouch: boolean;
    /** @private Mouse position x */
    mouseX: number;
    /** @private Mouse position y */
    mouseY: number;
    /**
     * Constructor for creating the widget

     */
    constructor(options?: CircularGaugeModel, element?: string | HTMLElement);
    /**
     *  To create svg object, renderer and binding events for the container.
     */
    protected preRender(): void;
    /**
     * To render the circular gauge elements
     */
    protected render(): void;
    private setTheme;
    /**
     * Method to unbind events for circular gauge
     */
    private unWireEvents;
    /**
     * Method to bind events for circular gauge
     */
    private wireEvents;
    /**
     * Handles the mouse click on accumulation chart.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseClick(e: PointerEvent): boolean;
    /**
     * Handles the mouse move.
     * @return {boolean}
     * @private
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * Handles the mouse leave.
     * @return {boolean}
     * @private
     */
    mouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse right click.
     * @return {boolean}
     * @private
     */
    gaugeRightClick(event: MouseEvent | PointerEvent): boolean;
    /**
     * Handles the pointer draf while mouse move on gauge.
     * @private
     */
    pointerDrag(location: GaugeLocation): void;
    /**
     * Handles the mouse down on gauge.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse end.
     * @return {boolean}
     * @private
     */
    mouseEnd(e: PointerEvent): boolean;
    /**
     * Handles the mouse event arguments.
     * @return {IMouseEventArgs}
     * @private
     */
    private getMouseArgs;
    /**
     * Handles the gauge resize.
     * @return {boolean}
     * @private
     */
    gaugeResize(e: Event): boolean;
    /**
     * Applying styles for circular gauge elements
     */
    private setGaugeStyle;
    /**
     * Method to set culture for gauge
     */
    private setCulture;
    /**
     * Methods to create svg element for circular gauge.
     */
    private createSvg;
    /**
     * To Remove the SVG from circular gauge.
     * @return {boolean}
     * @private
     */
    removeSvg(): void;
    /**
     * To initialize the circular gauge private variable.
     * @private
     */
    private initPrivateVariable;
    /**
     * To calculate the size of the circular gauge element.
     */
    private calculateSvgSize;
    /**
     * Method to calculate the availble size for circular gauge.
     */
    private calculateBounds;
    /**
     * To render elements for circular gauge
     */
    private renderElements;
    /**
     * Method to render legend for accumulation chart
     */
    private renderLegend;
    /**
     * Method to render the title for circular gauge.
     */
    private renderTitle;
    /**
     * Method to render the border for circular gauge.
     */
    private renderBorder;
    /**
     * Method to set the pointer value dynamically for circular gauge.
     */
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    /**
     * Method to set the annotation content dynamically for circular gauge.
     */
    setAnnotationValue(axisIndex: number, annotationIndex: number, content: string): void;
    /**
     * Method to set mouse x, y from events
     */
    private setMouseXY;
    /**
     * Method to set the range values dynamically for circular gauge.
     */
    setRangeValue(axisIndex: number, rangeIndex: number, start: number, end: number): void;
    /**
     * To destroy the widget
     * @method destroy
     * @return {void}
     * @member of Circular-Gauge
     */
    destroy(): void;
    /**
     * To provide the array of modules needed for control rendering
     * @return {ModuleDeclaration[]}
     * @private
     */
    requiredModules(): ModuleDeclaration[];
    /**
     * Get the properties to be maintained in the persisted state.
     * @private
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    onPropertyChanged(newProp: CircularGaugeModel, oldProp: CircularGaugeModel): void;
    /**
     * Get component name for circular gauge
     * @private
     */
    getModuleName(): string;
}
