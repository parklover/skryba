import { ChildProperty } from '@syncfusion/ej2-base';
import { Tooltip, AnimationModel, Position } from '@syncfusion/ej2-popups';
import { TooltipRelativeMode, TooltipMode } from '../enum/enum';
import { Diagram } from '../diagram';
import { NodeModel } from './node-model';
import { ConnectorModel } from './connector-model';
/**
 * Defines the tooltip that should be shown when the mouse hovers over node.
 * An object that defines the description, appearance and alignments of tooltip
 */
export declare abstract class DiagramTooltip extends ChildProperty<DiagramTooltip> {
    /**
     * Defines the content of the Tooltip

     */
    content: string | HTMLElement;
    /**
     * Defines the position of the Tooltip

     */
    position: Position;
    /**
     * Defines the relative mode of the Tooltip
     * * Object - sets the tooltip position relative to the node
     * * Mouse - sets the tooltip position relative to the mouse

     */
    relativeMode: TooltipRelativeMode;
    /**
     * Defines if the Tooltip has tip pointer or not

     */
    showTipPointer: boolean;
    /**
     * Sets the width of the Tooltip

     */
    width: number | string;
    /**
     * Sets the height of the Tooltip

     */
    height: number | string;
    /**
     * Sets how to open the Tooltip

     */
    openOn: TooltipMode;
    /**
     * Allows to set the same or different animation option for the Tooltip, when it is opened or closed.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let diagram: Diagram = new Diagram({
     * ...
     * constraints: DiagramConstraints.Default | DiagramConstraints.Tooltip,
     * tooltip: { content: getcontent(), position: 'TopLeft', relativeMode: 'Object',
     * animation: { open: { effect: 'FadeZoomIn', delay: 0 },
     * close: { effect: 'FadeZoomOut', delay: 0 } } },
     * ...
     * });
     * diagram.appendTo('#diagram');
     * function getcontent(): => {
     * ...
     * }
     * ```



     */
    animation: AnimationModel;
}
/**
 * @private
 * defines the Tooltip.
 * @param diagram
 */
export declare function initTooltip(diagram: Diagram): Tooltip;
/**
 * @private
 * updates the contents of the tooltip.
 * @param diagram
 * @param node
 */
export declare function updateTooltip(diagram: Diagram, node?: NodeModel | ConnectorModel): Tooltip;
