import { Node } from './../objects/node';
import { NodeConstraints, ConnectorConstraints, DiagramConstraints, DiagramTools, DiagramAction, RendererAction } from '../enum/enum';
import { AnnotationConstraints, PortConstraints } from '../enum/enum';
import { Connector } from './../objects/connector';
import { Selector } from './../objects/node';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
/**
 * constraints-util module contains the common constraints
 */
/** @private */
export function canSelect(node) {
    if (node) {
        var state = 0;
        if ((node instanceof ShapeAnnotation) || (node instanceof PathAnnotation)) {
            state = node.constraints & AnnotationConstraints.Select;
        }
        else if (node instanceof Connector) {
            state = node.constraints & ConnectorConstraints.Select;
        }
        else {
            state = node.constraints & NodeConstraints.Select;
        }
        return state;
    }
    return 1;
}
/** @private */
export function canMove(node) {
    if (node) {
        var state = 0;
        if ((node instanceof ShapeAnnotation) || (node instanceof PathAnnotation)) {
            state = node.constraints & AnnotationConstraints.Drag;
        }
        else if (node instanceof Connector) {
            state = node.constraints & ConnectorConstraints.Drag;
        }
        else if (node instanceof Selector) {
            state = 1;
        }
        else {
            state = node.constraints & NodeConstraints.Drag;
        }
        return state;
    }
    return 1;
}
/** @private */
export function canEnablePointerEvents(node, diagram) {
    var state = 0;
    if (node instanceof Connector) {
        state = node.constraints & ConnectorConstraints.PointerEvents;
    }
    else {
        state = node.constraints & NodeConstraints.PointerEvents;
    }
    return state;
}
/** @private */
export function canDelete(node) {
    var state = 0;
    if (node instanceof Connector) {
        state = node.constraints & ConnectorConstraints.Delete;
    }
    else {
        state = node.constraints & NodeConstraints.Delete;
    }
    return state;
}
/** @private */
export function canBridge(connector, diagram) {
    var state = 0;
    if (connector.constraints & ConnectorConstraints.Bridging) {
        state = connector.constraints & ConnectorConstraints.Bridging;
    }
    else if (connector.constraints & ConnectorConstraints.InheritBridging) {
        state = diagram.constraints & DiagramConstraints.Bridging;
    }
    else {
        state = 0;
    }
    return state;
}
/** @private */
export function canEnableRouting(connector, diagram) {
    var state = 0;
    if (connector.constraints & ConnectorConstraints.LineRouting) {
        state = connector.constraints & ConnectorConstraints.LineRouting;
    }
    else if (connector.constraints & ConnectorConstraints.InheritLineRouting) {
        state = diagram.constraints & DiagramConstraints.LineRouting;
    }
    return state;
}
/** @private */
export function canDragSourceEnd(connector) {
    return connector.constraints & ConnectorConstraints.DragSourceEnd;
}
/** @private */
export function canDragTargetEnd(connector) {
    return connector.constraints & ConnectorConstraints.DragTargetEnd;
}
/** @private */
export function canDragSegmentThumb(connector) {
    return connector.constraints & ConnectorConstraints.DragSegmentThumb;
}
/** @private */
export function canRotate(node) {
    if ((node instanceof ShapeAnnotation) || (node instanceof PathAnnotation)) {
        return node.constraints & AnnotationConstraints.Rotate;
    }
    else {
        return node.constraints & NodeConstraints.Rotate;
    }
}
/** @private */
export function canShadow(node) {
    return node.constraints & NodeConstraints.Shadow;
}
/** @private */
export function canInConnect(node) {
    if ((node instanceof Node) && (node.constraints & NodeConstraints.InConnect)) {
        return node.constraints & NodeConstraints.InConnect;
    }
    return 0;
}
/** @private */
export function canPortInConnect(port) {
    if (port && port.constraints) {
        if (!(port.constraints & PortConstraints.None) && (port.constraints & PortConstraints.InConnect)) {
            return port.constraints & PortConstraints.InConnect;
        }
    }
    return 0;
}
/** @private */
export function canOutConnect(node) {
    if ((node instanceof Node) && (node.constraints & NodeConstraints.OutConnect)) {
        return node.constraints & NodeConstraints.OutConnect;
    }
    return 0;
}
/** @private */
export function canPortOutConnect(port) {
    if (port && port.constraints) {
        if (!(port.constraints & PortConstraints.None) && (port.constraints & PortConstraints.OutConnect)) {
            return port.constraints & PortConstraints.OutConnect;
        }
    }
    return 0;
}
/** @private */
export function canResize(node, direction) {
    var returnValue = 0;
    if (node instanceof ShapeAnnotation || node instanceof PathAnnotation) {
        returnValue = node.constraints & AnnotationConstraints.Resize;
    }
    else if (node) {
        if (direction === 'SouthEast') {
            returnValue = node.constraints & NodeConstraints.ResizeSouthEast;
        }
        else if (direction === 'East') {
            returnValue = node.constraints & NodeConstraints.ResizeEast;
        }
        else if (direction === 'NorthEast') {
            returnValue = node.constraints & NodeConstraints.ResizeNorthEast;
        }
        else if (direction === 'South') {
            returnValue = node.constraints & NodeConstraints.ResizeSouth;
        }
        else if (direction === 'North') {
            returnValue = node.constraints & NodeConstraints.ResizeNorth;
        }
        else if (direction === 'SouthWest') {
            returnValue = node.constraints & NodeConstraints.ResizeSouthWest;
        }
        else if (direction === 'West') {
            returnValue = node.constraints & NodeConstraints.ResizeWest;
        }
        else if (direction === 'NorthWest') {
            returnValue = node.constraints & NodeConstraints.ResizeNorthWest;
        }
    }
    return returnValue;
}
/** @private */
export function canAllowDrop(node) {
    var state = 0;
    if (node instanceof Connector) {
        state = node.constraints & ConnectorConstraints.AllowDrop;
    }
    else {
        state = node.constraints & NodeConstraints.AllowDrop;
    }
    return state;
}
/** @private */
export function canVitualize(diagram) {
    return diagram.constraints & DiagramConstraints.Virtualization;
}
/** @private */
export function canEnableToolTip(node, diagram) {
    var state = 0;
    if (node instanceof Connector) {
        if (node.constraints & ConnectorConstraints.Tooltip) {
            state = node.constraints & ConnectorConstraints.Tooltip;
        }
        else if (node.constraints & ConnectorConstraints.InheritTooltip) {
            state = diagram.constraints & DiagramConstraints.Tooltip;
        }
    }
    else {
        if (node.constraints & NodeConstraints.Tooltip) {
            state = node.constraints & NodeConstraints.Tooltip;
        }
        else if (node.constraints & NodeConstraints.InheritTooltip) {
            state = diagram.constraints & DiagramConstraints.Tooltip;
        }
    }
    return state;
}
/** @private */
export function canSingleSelect(model) {
    return model.tool & DiagramTools.SingleSelect;
}
/** @private */
export function canMultiSelect(model) {
    return model.tool & DiagramTools.MultipleSelect;
}
/** @private */
export function canZoomPan(model) {
    return model.tool & DiagramTools.ZoomPan;
}
/** @private */
export function canContinuousDraw(model) {
    return model.tool & DiagramTools.ContinuousDraw;
}
/** @private */
export function canDrawOnce(model) {
    return model.tool & DiagramTools.DrawOnce;
}
/** @private */
export function defaultTool(model) {
    return (model.tool & DiagramTools.SingleSelect) || (model.tool & DiagramTools.MultipleSelect);
}
/** @private */
export function canZoom(model) {
    return model.constraints & DiagramConstraints.Zoom;
}
/** @private */
export function canPan(model) {
    return model.constraints & DiagramConstraints.Pan;
}
/** @private */
export function canUserInteract(model) {
    return model.constraints & DiagramConstraints.UserInteraction;
}
/** @private */
export function canApiInteract(model) {
    return model.constraints & DiagramConstraints.ApiUpdate;
}
/** @private */
export function canPanX(model) {
    return ((model.constraints & DiagramConstraints.PanX));
}
/** @private */
export function canPanY(model) {
    return ((model.constraints & DiagramConstraints.PanY));
}
/** @private */
export function canZoomTextEdit(diagram) {
    return ((diagram.constraints & DiagramConstraints.ZoomTextEdit));
}
/** @private */
export function canPageEditable(model) {
    return canApiInteract(model) || (model.diagramActions & DiagramAction.ToolAction);
}
/** @private */
export function enableReadOnly(annotation, node) {
    var enumValue = 0;
    enumValue = (node instanceof Connector) ? ConnectorConstraints.ReadOnly : NodeConstraints.ReadOnly;
    if (node.shape.type === 'Text') {
        return node.constraints & NodeConstraints.ReadOnly;
    }
    else if (node.constraints & enumValue) {
        if (annotation.constraints & AnnotationConstraints.InheritReadOnly) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (annotation.constraints & AnnotationConstraints.ReadOnly) {
        return 1;
    }
    return 0;
}
/** @private */
export function canDraw(port, diagram) {
    return port.constraints & PortConstraints.Draw;
}
/** @private */
export function canDrag(port, diagram) {
    return port.constraints & PortConstraints.Drag;
}
/** @private */
export function canPreventClearSelection(diagramActions) {
    if (diagramActions & DiagramAction.PreventClearSelection) {
        return true;
    }
    else {
        return false;
    }
}
/** @private */
export function canDrawThumbs(rendererActions) {
    if (!(rendererActions & RendererAction.DrawSelectorBorder)) {
        return true;
    }
    else {
        return false;
    }
}
/** @private */
export function avoidDrawSelector(rendererActions) {
    if ((rendererActions & RendererAction.PreventRenderSelector)) {
        return true;
    }
    else {
        return false;
    }
}
