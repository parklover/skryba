import { Component, Internationalization, ModuleDeclaration } from '@syncfusion/ej2-base';
import { EmitType, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { FontModel, BorderModel, ContainerModel, MarginModel, AnnotationModel, TooltipSettingsModel } from './model/base-model';
import { AxisModel } from './axes/axis-model';
import { Axis, Pointer } from './axes/axis';
import { LinearGaugeModel } from './linear-gauge-model';
import { ILoadedEventArgs, ILoadEventArgs, IAnimationCompleteEventArgs, IAnnotationRenderEventArgs } from './model/interface';
import { ITooltipRenderEventArgs, IMouseEventArgs, IAxisLabelRenderEventArgs } from './model/interface';
import { IResizeEventArgs, IValueChangeEventArgs, IThemeStyle } from './model/interface';
import { Size } from './utils/helper';
import { Rect } from './utils/helper';
import { Orientation, LinearGaugeTheme } from './utils/enum';
import { AxisLayoutPanel } from './axes/axis-panel';
import { SvgRenderer } from '@syncfusion/ej2-svg-base';
import { AxisRenderer } from './axes/axis-renderer';
import { Annotations } from './annotations/annotations';
import { GaugeTooltip } from './user-interaction/tooltip';
/**
 * Represents the EJ2 Linear gauge control.
 * ```html
 * <div id="container"/>
 * <script>
 *   var gaugeObj = new LinearGauge({ });
 *   gaugeObj.appendTo("#container");
 * </script>
 * ```
 */
export declare class LinearGauge extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     *  annotationModule is used to place the any text or images into the gauge.
     */
    annotationsModule: Annotations;
    /**
     * tooltipModule is used to display the pointer value.
     */
    tooltipModule: GaugeTooltip;
    /**
     * The width of the Linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full width of its parent element.

     */
    width: string;
    /**
     * The height of the Linear gauge as a string in order to provide input as both like '100px' or '100%'.
     * If specified as '100%, gauge will render to the full height of its parent element.

     */
    height: string;
    /**
     * Specifies the gauge will rendered either horizontal or vertical orientation.

     */
    orientation: Orientation;
    /**
     *  Options to customize the left, right, top and bottom margins of the gauge.
     */
    margin: MarginModel;
    /**
     * Options for customizing the color and width of the gauge border.
     */
    border: BorderModel;
    /**
     * The background color of the gauge, which accepts value in hex, rgba as a valid CSS color string.

     */
    background: string;
    /**
     * Specifies the title for linear gauge.
     */
    title: string;
    /**
     * Options for customizing the title appearance of linear gauge.
     */
    titleStyle: FontModel;
    /**
     * Options for customizing the container linear gauge.
     */
    container: ContainerModel;
    /**
     *  Options for customizing the axes of linear gauge.
     */
    axes: AxisModel[];
    /**
     * Options for customizing the tooltip in linear gauge.
     */
    tooltip: TooltipSettingsModel;
    /**
     *  Options for customizing the annotation of linear gauge.
     */
    annotations: AnnotationModel[];
    /**
     * Specifies color palette for axis ranges.

     */
    rangePalettes: string[];
    /**
     * Specifies whether a grouping separator should be used for a number.

     */
    useGroupingSeparator: boolean;
    /**
     * Specifies the description for linear gauge.

     */
    description: string;
    /**
     * TabIndex value for the gauge.

     */
    tabIndex: number;
    /**
     * To apply internationalization for gauge

     */
    format: string;
    /**
     * Specifies the theme for the maps.

     */
    theme: LinearGaugeTheme;
    /**
     * Triggers after gauge loaded.
     * @event

     */
    loaded: EmitType<ILoadedEventArgs>;
    /**
     * Triggers before gauge load.
     * @event

     */
    load: EmitType<ILoadEventArgs>;
    /**
     * Triggers after complete the animation for pointer.
     * @event

     */
    animationComplete: EmitType<IAnimationCompleteEventArgs>;
    /**
     * Triggers before each axis label gets rendered.
     * @event


     */
    axisLabelRender: EmitType<IAxisLabelRenderEventArgs>;
    /**
     * Triggers before each annotation gets rendered.
     * @event

     */
    annotationRender: EmitType<IAnnotationRenderEventArgs>;
    /**
     * Triggers before the tooltip get rendered.
     * @event


     */
    tooltipRender: EmitType<ITooltipRenderEventArgs>;
    /**
     * Triggers when mouse move on gauge area.
     * @event

     */
    gaugeMouseMove: EmitType<IMouseEventArgs>;
    /**
     * Triggers when mouse leave from the gauge area .
     * @event

     */
    gaugeMouseLeave: EmitType<IMouseEventArgs>;
    /**
     * Triggers when mouse down on gauge area.
     * @event

     */
    gaugeMouseDown: EmitType<IMouseEventArgs>;
    /**
     * Triggers when mouse up on gauge area.
     * @event

     */
    gaugeMouseUp: EmitType<IMouseEventArgs>;
    /**
     * Triggers while drag the pointer.
     * @event


     */
    valueChange: EmitType<IValueChangeEventArgs>;
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
    actualRect: Rect;
    /** @private */
    intl: Internationalization;
    /** @private* */
    containerBounds: Rect;
    /**
     * @private
     * Calculate the axes bounds for gauge.

     */
    gaugeAxisLayoutPanel: AxisLayoutPanel;
    /**
     * @private
     * Render the axis elements for gauge.

     */
    axisRenderer: AxisRenderer;
    /** @private */
    private resizeTo;
    /** @private */
    containerObject: Element;
    /** @private */
    pointerDrag: boolean;
    /** @private */
    mouseX: number;
    /** @private */
    mouseY: number;
    /** @private */
    mouseElement: Element;
    /** @private */
    gaugeResized: boolean;
    /** @private */
    nearSizes: number[];
    /** @private */
    farSizes: number[];
    /**
     * @private
     */
    themeStyle: IThemeStyle;
    /** @private */
    isBlazor: boolean;
    /**
     * @private
     * Constructor for creating the widget

     */
    constructor(options?: LinearGaugeModel, element?: string | HTMLElement);
    /**
     * Initialize the preRender method.
     */
    protected preRender(): void;
    private setTheme;
    private initPrivateVariable;
    /**
     * Method to set culture for chart
     */
    private setCulture;
    /**
     * Methods to create svg element
     */
    private createSvg;
    /**
     * To Remove the SVG.
     * @return {boolean}
     * @private
     */
    removeSvg(): void;
    /**
     * Method to calculate the size of the gauge
     */
    private calculateSize;
    /**
     * To Initialize the control rendering
     */
    protected render(): void;
    /**
     * @private
     * To render the gauge elements
     */
    renderGaugeElements(): void;
    private appendSecondaryElement;
    /**
     * Render the map area border
     */
    private renderArea;
    /**
     * @private
     * To calculate axes bounds
     */
    calculateBounds(): void;
    /**
     * @private
     * To render axis elements
     */
    renderAxisElements(): void;
    private renderBorder;
    private renderTitle;
    private unWireEvents;
    private wireEvents;
    private setStyle;
    /**
     * Handles the gauge resize.
     * @return {boolean}
     * @private
     */
    gaugeResize(e: Event): boolean;
    /**
     * To destroy the gauge element from the DOM.
     */
    destroy(): void;
    /**
     * @private
     * To render the gauge container
     */
    renderContainer(): void;
    /**
     * Handles the mouse down on gauge.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseDown(e: PointerEvent): boolean;
    /**
     * Handles the mouse move.
     * @return {boolean}
     * @private
     */
    mouseMove(e: PointerEvent): boolean;
    /**
     * To find the mouse move on pointer.
     * @param element
     */
    private moveOnPointer;
    /**
     * @private
     * Handle the right click
     * @param event
     */
    gaugeRightClick(event: MouseEvent | PointerEvent): boolean;
    /**
     * Handles the mouse leave.
     * @return {boolean}
     * @private
     */
    mouseLeave(e: PointerEvent): boolean;
    /**
     * Handles the mouse move on gauge.
     * @return {boolean}
     * @private
     */
    gaugeOnMouseMove(e: PointerEvent | TouchEvent): boolean;
    /**
     * Handles the mouse up.
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
     * @private
     * @param axis
     * @param pointer
     */
    markerDrag(axis: Axis, pointer: Pointer): void;
    /**
     * @private
     * @param axis
     * @param pointer
     */
    barDrag(axis: Axis, pointer: Pointer): void;
    /**
     * Triggers when drag the pointer
     * @param activeElement
     */
    private triggerDragEvent;
    /**
     * To set the pointer value using this method
     * @param axisIndex
     * @param pointerIndex
     * @param value
     */
    setPointerValue(axisIndex: number, pointerIndex: number, value: number): void;
    /**
     * To set the annotation value using this method.
     * @param annotationIndex
     * @param content
     */
    setAnnotationValue(annotationIndex: number, content: string, axisValue?: number): void;
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
     * Get component name
     */
    getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     * @private
     */
    onPropertyChanged(newProp: LinearGaugeModel, oldProp: LinearGaugeModel): void;
}
