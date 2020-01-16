import { ChildProperty } from '@syncfusion/ej2-base';
import { MarginModel } from '../core/appearance-model';
import { PointModel } from '../primitives/point-model';
import { HorizontalAlignment, VerticalAlignment, IconShapes } from '../enum/enum';
/**
 * Defines the behavior of default IconShapes
 */
export declare class IconShape extends ChildProperty<IconShape> {
    /**
     * Defines the shape of the icon.
     * None
     * Minus - sets the icon shape as minus
     * Plus - sets the icon shape as Plus
     * ArrowUp - sets the icon shape as ArrowUp
     * ArrowDown - sets the icon shape as ArrowDown
     * Template - sets the icon shape based on  the given  custom template
     * Path - sets the icon shape based on the given  custom Path

     */
    shape: IconShapes;
    /**
     * Sets the fill color of an icon.
     * ```html
     * <div id='diagram'></div>
     * ```
     * ```typescript
     * let nodes: NodeModel[] = [{
     *           id: 'node1', width: 100, height: 100, offsetX: 100, offsetY: 100,
     *           annotations: [{ content: 'Default Shape' }],
     *           expandIcon: { height: 20, width: 20, shape: "ArrowDown", fill: 'red' },
     *           collapseIcon: { height: 20, width: 20, shape: "ArrowUp" },
     *       }];
     * let diagram: Diagram = new Diagram({
     * ...
     *  nodes: nodes,
     * ...
     * });
     * diagram.appendTo('#diagram');
     * ```

     */
    fill: string;
    /**
     * Defines how the Icon has to be horizontally aligned.
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Left - Aligns the diagram element at the left of its immediate parent
     * * Right - Aligns the diagram element at the right of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    horizontalAlignment: HorizontalAlignment;
    /**
     * Defines how the Icon has to be Vertically aligned.
     * * Stretch - Stretches the diagram element throughout its immediate parent
     * * Top - Aligns the diagram element at the top of its immediate parent
     * * Bottom - Aligns the diagram element at the bottom of its immediate parent
     * * Center - Aligns the diagram element at the center of its immediate parent
     * * Auto - Aligns the diagram element based on the characteristics of its immediate parent

     */
    verticalAlignment: VerticalAlignment;
    /**
     * Defines the width of the icon.

     */
    width: number;
    /**
     * Defines the height of the icon.

     */
    height: number;
    /**
     * Defines the offset of the icon.

     */
    offset: PointModel;
    /**
     * Sets the border color of an icon.

     */
    borderColor: string;
    /**
     * Defines the border width of the icon.

     */
    borderWidth: number;
    /**
     * Defines the space that the icon has to be moved from its actual position

     */
    margin: MarginModel;
    /**
     * Defines the geometry of a path

     */
    pathData: string;
    /**
     * Defines the custom content of the icon

     */
    content: string;
    /**
     * Defines the corner radius of the icon border

     */
    cornerRadius: number;
    /**
     * Defines the space that the icon has to be moved from the icon border

     */
    padding: MarginModel;
}
