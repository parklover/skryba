import { Connector, getBezierPoints, isEmptyVector } from '../objects/connector';
import { Node, BpmnSubEvent, BpmnAnnotation } from '../objects/node';
import { PathElement } from '../core/elements/path-element';
import { TextElement } from '../core/elements/text-element';
import { OrthogonalSegment } from '../objects/connector';
import { Rect } from '../primitives/rect';
import { identityMatrix, rotateMatrix, transformPointByMatrix, scaleMatrix } from './../primitives/matrix';
import { cloneObject as clone, cloneObject, getBounds, getFunction } from './../utility/base-util';
import { completeRegion, getTooltipOffset, sort, findObjectIndex, intersect3, getAnnotationPosition } from './../utility/diagram-util';
import { updatePathElement, cloneBlazorObject } from './../utility/diagram-util';
import { randomId, cornersPointsBeforeRotation } from './../utility/base-util';
import { Selector } from '../objects/node';
import { hasSelection, isSelected, hasSingleConnection } from './actions';
import { DiagramEvent } from '../enum/enum';
import { canSelect, canMove, canRotate, canDragSourceEnd, canDragTargetEnd, canSingleSelect, canDrag } from './../utility/constraints-util';
import { canMultiSelect, canContinuousDraw } from './../utility/constraints-util';
import { canPanX, canPanY, canPageEditable } from './../utility/constraints-util';
import { SnapConstraints, DiagramTools, DiagramAction } from '../enum/enum';
import { getDiagramElement, getAdornerLayerSvg, getHTMLLayer, getAdornerLayer } from '../utility/dom-util';
import { Point } from '../primitives/point';
import { Size } from '../primitives/size';
import { getObjectType, getPoint, intersect2, getOffsetOfConnector } from './../utility/diagram-util';
import { Layer } from '../diagram/layer';
import { SelectorConstraints, DiagramConstraints } from '../enum/enum';
import { remove, isBlazor } from '@syncfusion/ej2-base';
import { getOppositeDirection, getPortDirection, findAngle } from './../utility/connector';
import { swapBounds, findPoint, orthoConnection2Segment, getIntersection } from './../utility/connector';
import { ShapeAnnotation, PathAnnotation } from '../objects/annotation';
import { renderContainerHelper } from './container-interaction';
import { checkChildNodeInContainer, checkParentAsContainer, addChildToContainer } from './container-interaction';
import { renderStackHighlighter } from './container-interaction';
import { getConnectors, updateConnectorsProperties, findLaneIndex } from './../utility/swim-lane-util';
import { swimLaneSelection, pasteSwimLane, gridSelection } from '../utility/swim-lane-util';
/**
 * Defines the behavior of commands
 */
var CommandHandler = /** @class */ (function () {
    function CommandHandler(diagram) {
        /**   @private  */
        this.clipboardData = {};
        /**   @private  */
        this.connectorsTable = [];
        /**   @private  */
        this.processTable = {};
        /** @private */
        this.isContainer = false;
        this.childTable = {};
        this.parentTable = {};
        this.diagram = diagram;
    }
    Object.defineProperty(CommandHandler.prototype, "snappingModule", {
        /**   @private  */
        get: function () {
            return this.diagram.snappingModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandHandler.prototype, "layoutAnimateModule", {
        /**   @private  */
        get: function () {
            return this.diagram.layoutAnimateModule;
        },
        enumerable: true,
        configurable: true
    });
    /** @private */
    CommandHandler.prototype.startTransaction = function (protectChange) {
        this.state = { element: this.diagram.selectedItems, backup: null };
        if (protectChange) {
            this.diagram.protectPropertyChange(true);
        }
        getAdornerLayer(this.diagram.element.id).style.pointerEvents = 'none';
    };
    /** @private */
    CommandHandler.prototype.endTransaction = function (protectChange) {
        this.state = null;
        if (protectChange) {
            this.diagram.protectPropertyChange(false);
        }
        getAdornerLayer(this.diagram.element.id).style.pointerEvents = 'all';
    };
    /**
     * @private
     */
    CommandHandler.prototype.showTooltip = function (node, position, content, toolName, isTooltipVisible) {
        var _this = this;
        if (isTooltipVisible) {
            this.diagram.tooltipObject.position = 'BottomCenter';
            this.diagram.tooltipObject.animation = { open: { delay: 0, duration: 0 } };
            this.diagram.tooltip.relativeMode = toolName === 'ConnectTool' ? 'Mouse' : 'Object';
            this.diagram.tooltipObject.openDelay = 0;
            this.diagram.tooltipObject.closeDelay = 0;
        }
        if (this.diagram.selectedItems.setTooltipTemplate) {
            var template = void 0;
            var setTooltipTemplate = getFunction(this.diagram.selectedItems.setTooltipTemplate);
            if (setTooltipTemplate) {
                template = setTooltipTemplate(node, this.diagram);
            }
            if (template instanceof HTMLElement) {
                content = template.cloneNode(true);
            }
            else {
                content = template ? template : content;
            }
        }
        this.diagram.tooltipObject.content = content;
        var tooltipOffset = getTooltipOffset(this.diagram, { x: position.x, y: position.y }, node);
        this.diagram.tooltipObject.offsetX = tooltipOffset.x + (toolName === 'ConnectTool' ? 10 : 0);
        this.diagram.tooltipObject.offsetY = tooltipOffset.y + 10;
        this.diagram.tooltipObject.dataBind();
        if (isTooltipVisible) {
            setTimeout(function () {
                _this.diagram.tooltipObject.open(_this.diagram.element);
            }, 1);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.closeTooltip = function () {
        this.diagram.tooltipObject.close();
    };
    /**
     * @private
     */
    CommandHandler.prototype.canEnableDefaultTooltip = function () {
        if (this.diagram.selectedItems.constraints & SelectorConstraints.ToolTip) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateSelector = function () {
        this.diagram.updateSelector();
    };
    /**
     * @private
     */
    CommandHandler.prototype.triggerEvent = function (event, args) {
        if (event === DiagramEvent.drop || event === DiagramEvent.positionChange ||
            event === DiagramEvent.connectionChange) {
            if (this.diagram.currentSymbol) {
                return;
            }
            if (event === DiagramEvent.drop) {
                args.source = this.diagram;
            }
            if (this.diagram.currentDrawingObject) {
                return;
            }
        }
        this.diagram.triggerEvent(event, args);
    };
    /**
     * @private
     */
    CommandHandler.prototype.dragOverElement = function (args, currentPosition) {
        if (this.diagram.currentSymbol) {
            var dragOverArg = {
                element: cloneBlazorObject(args.source), target: cloneBlazorObject(args.target),
                mousePosition: cloneBlazorObject(currentPosition), diagram: cloneBlazorObject(this.diagram)
            };
            this.triggerEvent(DiagramEvent.dragOver, dragOverArg);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.disConnect = function (obj, endPoint) {
        var oldChanges = {};
        var newChanges = {};
        var selectorModel;
        var connector;
        if (obj instanceof Selector) {
            selectorModel = obj;
            connector = selectorModel.connectors[0];
        }
        else if (obj instanceof Connector && this.diagram.currentDrawingObject) {
            connector = this.diagram.currentDrawingObject;
        }
        if (obj && connector && (hasSingleConnection(this.diagram) || this.diagram.currentDrawingObject)) {
            if (endPoint && (endPoint === 'ConnectorSourceEnd' || endPoint === 'ConnectorTargetEnd')) {
                var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
                var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
                if (connector[nodeEndId]) { //connector.sourceID || connector.targetID
                    oldChanges[nodeEndId] = connector[nodeEndId];
                    connector[nodeEndId] = '';
                    newChanges[nodeEndId] = connector[nodeEndId];
                    if (connector.sourcePortID || connector.targetPortID) {
                        oldChanges[portEndId] = connector[portEndId];
                        connector[portEndId] = '';
                        newChanges[portEndId] = connector[portEndId];
                    }
                    this.connectionEventChange(connector, oldChanges, newChanges, endPoint);
                }
            }
            else if ((endPoint !== 'OrthoThumb' && endPoint !== 'SegmentEnd') && (connector.sourceID || connector.targetID)) {
                oldChanges = {
                    sourceID: connector.sourceID, sourcePortID: connector.sourcePortID,
                    targetID: connector.targetID, targetPortID: connector.targetPortID
                };
                connector.sourceID = '';
                connector.sourcePortID = '';
                connector.targetID = '';
                connector.targetPortID = '';
                newChanges = {
                    sourceID: connector.sourceID, sourcePortID: connector.sourcePortID,
                    targetID: connector.targetID, targetPortID: connector.targetPortID
                };
                var arg = {
                    connector: cloneBlazorObject(connector), oldValue: oldChanges,
                    newValue: newChanges, cancel: false, state: 'Changing', connectorEnd: endPoint
                };
                if (isBlazor()) {
                    arg = {
                        connector: cloneBlazorObject(connector),
                        oldValue: { connector: cloneBlazorObject(oldChanges) },
                        newValue: { connector: cloneBlazorObject(newChanges) },
                        cancel: false, state: 'Changed', connectorEnd: endPoint
                    };
                }
                this.triggerEvent(DiagramEvent.connectionChange, arg);
                if (arg.cancel) {
                    connector.sourceID = oldChanges.sourceID;
                    connector.sourcePortID = oldChanges.sourcePortID;
                    connector.targetID = oldChanges.targetID;
                    connector.targetPortID = oldChanges.targetPortID;
                }
                else {
                    this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
                    this.diagram.updateDiagramObject(connector);
                    arg = {
                        connector: connector, oldValue: oldChanges,
                        newValue: newChanges, cancel: false, state: 'Changed', connectorEnd: endPoint
                    };
                    if (isBlazor()) {
                        arg = {
                            connector: cloneBlazorObject(connector), oldValue: { connector: oldChanges },
                            newValue: { connector: newChanges }, cancel: false, state: 'Changed', connectorEnd: endPoint
                        };
                    }
                    this.triggerEvent(DiagramEvent.connectionChange, arg);
                }
            }
        }
    };
    CommandHandler.prototype.connectionEventChange = function (connector, oldChanges, newChanges, endPoint) {
        var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        var arg = {
            connector: cloneBlazorObject(connector), oldValue: { nodeId: oldChanges[nodeEndId], portId: oldChanges[portEndId] },
            newValue: { nodeId: newChanges[nodeEndId], portId: newChanges[portEndId] },
            cancel: false, state: 'Changing', connectorEnd: endPoint
        };
        if (isBlazor()) {
            arg = {
                connector: cloneBlazorObject(connector),
                cancel: false, state: 'Changing', connectorEnd: endPoint,
                oldValue: { connectorTargetValue: { portId: oldChanges[portEndId], nodeId: oldChanges[nodeEndId] } },
                newValue: { connectorTargetValue: { portId: newChanges[portEndId], nodeId: newChanges[nodeEndId] } }
            };
        }
        this.triggerEvent(DiagramEvent.connectionChange, arg);
        if (arg.cancel) {
            connector[nodeEndId] = oldChanges[nodeEndId];
            connector[portEndId] = oldChanges[portEndId];
            newChanges = oldChanges;
        }
        else {
            this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
            this.diagram.updateDiagramObject(connector);
            arg = {
                connector: cloneBlazorObject(connector), oldValue: { nodeId: oldChanges[nodeEndId], portId: oldChanges[portEndId] },
                newValue: {
                    nodeId: newChanges[nodeEndId],
                    portId: newChanges[portEndId]
                },
                cancel: false, state: 'Changed', connectorEnd: endPoint
            };
            if (isBlazor()) {
                arg = {
                    connector: cloneBlazorObject(connector),
                    oldValue: { connectorTargetValue: { portId: oldChanges[portEndId], nodeId: oldChanges[nodeEndId] } },
                    newValue: { connectorTargetValue: { portId: newChanges[portEndId], nodeId: newChanges[nodeEndId] } },
                    cancel: false, state: 'Changed', connectorEnd: endPoint
                };
            }
            this.triggerEvent(DiagramEvent.connectionChange, arg);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.findTarget = function (element, argsTarget, source, connection) {
        var target;
        if (argsTarget instanceof Node) {
            if (element && element.id === argsTarget.id + '_content') {
                return argsTarget;
            }
            if (source && argsTarget.shape.type === 'Bpmn' && argsTarget.shape.shape === 'Activity') {
                if (argsTarget.shape.activity.subProcess.type === 'Transaction') {
                    var transaction = argsTarget.shape.activity.subProcess.transaction;
                    if (transaction.success.visible && element.id.indexOf(argsTarget.id + '_success') === 0) {
                        return transaction.success;
                    }
                    if (transaction.cancel.visible && element.id.indexOf(argsTarget.id + '_cancel') === 0) {
                        return transaction.cancel;
                    }
                    if (transaction.failure.visible && element.id.indexOf(argsTarget.id + '_failure') === 0) {
                        return transaction.failure;
                    }
                }
            }
            if (element instanceof PathElement) {
                for (var i = 0; i < argsTarget.ports.length; i++) {
                    var port = argsTarget.ports[i];
                    if (element.id === argsTarget.id + '_' + port.id) {
                        return port;
                    }
                }
            }
        }
        if (!connection) {
            var annotation = void 0;
            for (var i = 0; i < argsTarget.annotations.length; i++) {
                annotation = argsTarget.annotations[i];
                if (element.id === argsTarget.id + '_' + annotation.id) {
                    return annotation;
                }
            }
        }
        return argsTarget;
    };
    /**
     * @private
     */
    CommandHandler.prototype.canDisconnect = function (endPoint, args, targetPortId, targetNodeId) {
        var selector;
        var connect;
        if (args.source instanceof Selector) {
            selector = args.source;
            connect = selector.connectors[0];
        }
        else if (args.source instanceof Connector && this.diagram.currentDrawingObject) {
            connect = this.diagram.currentDrawingObject;
        }
        var targetObject = this.findTarget(args.targetWrapper, args.target, endPoint === 'ConnectorSourceEnd', true);
        var nodeEnd = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEnd = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        if (connect[nodeEnd] !== targetNodeId || connect[portEnd] !== targetPortId) {
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    CommandHandler.prototype.changeAnnotationDrag = function (args) {
        var selectorModel;
        var connector;
        if (args.source && args.source.connectors &&
            args.source.connectors.length && this.diagram.bpmnModule &&
            this.diagram.bpmnModule.textAnnotationConnectors.indexOf(args.source.connectors[0]) > -1) {
            if (args.source instanceof Selector) {
                selectorModel = args.source;
                connector = selectorModel.connectors[0];
            }
            var id = connector.id.split('_');
            var annotationId = id[id.length - 1];
            var nodeId = id[id.length - 3] || id[0];
            if (args.target && args.target.id !== nodeId &&
                args.target.shape.shape !== 'TextAnnotation') {
                this.diagram.startGroupAction();
                var parentNode = this.diagram.nameTable[id[0]];
                var clonedNode = this.getAnnotation(parentNode, id[1]);
                var annotationNode = {
                    id: id[1] + randomId(),
                    angle: Point.findAngle(connector.intermediatePoints[0], connector.intermediatePoints[1]),
                    text: clonedNode.text,
                    length: Point.distancePoints(connector.intermediatePoints[0], connector.intermediatePoints[1]),
                    shape: { shape: 'TextAnnotation', type: 'Bpmn' },
                    nodeId: clonedNode.nodeId
                };
                var annotationObj = new BpmnAnnotation(args.target.shape, 'annotations', annotationNode, true);
                this.diagram.bpmnModule.checkAndRemoveAnnotations(this.diagram.nameTable[connector.targetID], this.diagram);
                this.diagram.refreshCanvasLayers();
                annotationObj.id = id[1];
                this.diagram.addTextAnnotation(annotationObj, args.target);
                this.diagram.endGroupAction();
            }
            else if (connector) {
                connector.sourceID = nodeId;
                this.diagram.connectorPropertyChange(connector, {}, { sourceID: nodeId });
                this.diagram.updateDiagramObject(connector);
            }
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.connect = function (endPoint, args) {
        var newChanges = {};
        var oldChanges = {};
        var oldNodeId;
        var oldPortId;
        var selectorModel;
        var connector;
        if (args.source instanceof Selector) {
            selectorModel = args.source;
            connector = selectorModel.connectors[0];
        }
        else if (args.source instanceof Connector && this.diagram.currentDrawingObject) {
            connector = this.diagram.currentDrawingObject;
        }
        var target = this.findTarget(args.targetWrapper, args.target, endPoint === 'ConnectorSourceEnd', true);
        var nodeEndId = endPoint === 'ConnectorSourceEnd' ? 'sourceID' : 'targetID';
        var portEndId = endPoint === 'ConnectorSourceEnd' ? 'sourcePortID' : 'targetPortID';
        if (target instanceof Node) {
            oldChanges[nodeEndId] = connector[nodeEndId];
            connector[nodeEndId] = target.id;
            newChanges[nodeEndId] = connector[nodeEndId];
            oldChanges[portEndId] = connector[portEndId];
            this.connectionEventChange(connector, oldChanges, newChanges, endPoint);
        }
        else {
            oldNodeId = connector[nodeEndId];
            oldPortId = connector[portEndId];
            connector[portEndId] = target.id;
            connector[nodeEndId] = args.target.id;
            newChanges[nodeEndId] = connector[nodeEndId];
            newChanges[portEndId] = connector[portEndId];
            var arg = {
                connector: cloneBlazorObject(connector), oldValue: { nodeId: oldNodeId, portId: oldPortId },
                newValue: { nodeId: newChanges[nodeEndId], portId: newChanges[portEndId] },
                cancel: false, state: 'Changing', connectorEnd: endPoint
            };
            if (isBlazor()) {
                arg = {
                    connector: cloneBlazorObject(connector),
                    oldValue: { connectorTargetValue: { portId: oldChanges[portEndId], nodeId: oldChanges[nodeEndId] } },
                    newValue: { connectorTargetValue: { portId: newChanges[portEndId], nodeId: newChanges[nodeEndId] } },
                    cancel: false, state: 'Changing', connectorEnd: endPoint
                };
            }
            this.triggerEvent(DiagramEvent.connectionChange, arg);
            if (arg.cancel) {
                connector[nodeEndId] = oldNodeId;
                connector[portEndId] = oldPortId;
                newChanges[nodeEndId] = oldNodeId;
                newChanges[portEndId] = oldPortId;
            }
            else {
                this.diagram.connectorPropertyChange(connector, oldChanges, newChanges);
                this.diagram.updateDiagramObject(connector);
                arg = {
                    connector: cloneBlazorObject(connector), oldValue: { nodeId: oldNodeId, portId: oldPortId },
                    newValue: { nodeId: newChanges[nodeEndId], portId: newChanges[portEndId] }, cancel: false,
                    state: 'Changed', connectorEnd: endPoint
                };
                if (isBlazor()) {
                    arg = {
                        newValue: { connectorTargetValue: { portId: newChanges[portEndId], nodeId: newChanges[nodeEndId] } },
                        connector: cloneBlazorObject(connector),
                        oldValue: { connectorTargetValue: { portId: oldChanges[portEndId], nodeId: oldChanges[nodeEndId] } },
                        cancel: false, state: 'Changed', connectorEnd: endPoint,
                    };
                }
                this.triggerEvent(DiagramEvent.connectionChange, arg);
            }
        }
        this.renderHighlighter(args, undefined, endPoint === 'ConnectorSourceEnd');
    };
    /** @private */
    CommandHandler.prototype.cut = function () {
        var index;
        this.clipboardData.pasteIndex = 0;
        if (this.diagram.undoRedoModule) {
            this.diagram.historyManager.startGroupAction();
        }
        this.clipboardData.clipObject = this.copyObjects();
        if (this.diagram.undoRedoModule) {
            this.diagram.historyManager.endGroupAction();
        }
        if (this.diagram.mode !== 'SVG') {
            this.diagram.refreshDiagramLayer();
        }
    };
    /** @private */
    CommandHandler.prototype.addLayer = function (layer, objects) {
        layer.id = layer.id || randomId();
        layer.zIndex = this.diagram.layers.length;
        layer = new Layer(this.diagram, 'layers', layer, true);
        layer.objectZIndex = -1;
        layer.zIndexTable = {};
        this.diagram.layers.push(layer);
        this.diagram.layerZIndexTable[layer.zIndex] = layer.id;
        this.diagram.activeLayer = layer;
        var layers = layer.objects;
        if (objects) {
            for (var i = 0; i < objects.length; i++) {
                this.diagram.add(objects[i]);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.getObjectLayer = function (objectName) {
        var layers = this.diagram.layers;
        for (var i = 0; i < layers.length; i++) {
            var objIndex = layers[i].objects.indexOf(objectName);
            if (objIndex > -1) {
                return layers[i];
            }
        }
        return this.diagram.activeLayer;
    };
    /** @private */
    CommandHandler.prototype.getLayer = function (layerName) {
        var layers = this.diagram.layers;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].id === layerName) {
                return layers[i];
            }
        }
        return undefined;
    };
    /** @private */
    CommandHandler.prototype.removeLayer = function (layerId) {
        var layers = this.getLayer(layerId);
        if (layers) {
            var index = this.diagram.layers.indexOf(layers);
            var layerObject = layers.objects;
            for (var i = layerObject.length - 1; i >= 0; i--) {
                this.diagram.unSelect(this.diagram.nameTable[layerObject[i]]);
                this.diagram.remove(this.diagram.nameTable[layerObject[i]]);
                if (layers.id !== 'default_layer') {
                    if (this.diagram.activeLayer.id === layerId) {
                        this.diagram.activeLayer = this.diagram.layers[this.diagram.layers.length - 1];
                    }
                }
            }
            delete this.diagram.layerZIndexTable[layers.zIndex];
            this.diagram.layers.splice(index, 1);
            if (this.diagram.mode !== 'SVG') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.moveObjects = function (objects, targetLayer) {
        var layer = this.getLayer(targetLayer) || this.diagram.activeLayer;
        this.diagram.setActiveLayer(layer.id);
        var targerNodes;
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var i = objects_1[_i];
            var layer_1 = this.getObjectLayer(i);
            var index = layer_1.objects.indexOf(i);
            if (index > -1) {
                targerNodes = this.diagram.nameTable[i];
                this.diagram.unSelect(targerNodes);
                this.diagram.remove(this.diagram.nameTable[i]);
                this.diagram.add(targerNodes);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.cloneLayer = function (layerName) {
        var layers = this.diagram.layers;
        var layer = this.getLayer(layerName);
        if (layer) {
            var cloneObject_1 = [];
            var newlayer = {
                id: layerName + '_' + randomId(), objects: [], visible: true, lock: false
            };
            this.addLayer(newlayer);
            newlayer.zIndex = this.diagram.layers.length - 1;
            var multiSelect = cloneObject_1.length !== 1;
            for (var _i = 0, _a = layer.objects; _i < _a.length; _i++) {
                var obj = _a[_i];
                cloneObject_1.push(this.diagram.nameTable[obj]);
            }
            this.paste(cloneObject_1);
        }
    };
    /** @private */
    CommandHandler.prototype.copy = function () {
        this.clipboardData.pasteIndex = 1;
        this.clipboardData.clipObject = this.copyObjects();
        return this.clipboardData.clipObject;
    };
    /** @private */
    CommandHandler.prototype.copyObjects = function () {
        var selectedItems = [];
        var obj = [];
        this.clipboardData.childTable = {};
        if (this.diagram.selectedItems.connectors.length > 0) {
            selectedItems = this.diagram.selectedItems.connectors;
            for (var j = 0; j < selectedItems.length; j++) {
                var element = void 0;
                if (this.diagram.bpmnModule &&
                    this.diagram.bpmnModule.textAnnotationConnectors.indexOf(selectedItems[j]) > -1) {
                    element = cloneObject((this.diagram.nameTable[selectedItems[j].targetID]));
                }
                else {
                    element = cloneObject((selectedItems[j]));
                }
                obj.push(element);
            }
        }
        if (this.diagram.selectedItems.nodes.length > 0) {
            selectedItems = selectedItems.concat(this.diagram.selectedItems.nodes);
            for (var j = 0; j < this.diagram.selectedItems.nodes.length; j++) {
                var node = clone(this.diagram.selectedItems.nodes[j]);
                if (node.wrapper && (node.offsetX !== node.wrapper.offsetX)) {
                    node.offsetX = node.wrapper.offsetX;
                }
                if (node.wrapper && (node.offsetY !== node.wrapper.offsetY)) {
                    node.offsetY = node.wrapper.offsetY;
                }
                var processTable = {};
                this.copyProcesses(node);
                obj.push(clone(node));
                var matrix = identityMatrix();
                rotateMatrix(matrix, -node.rotateAngle, node.offsetX, node.offsetY);
                if (node.children) {
                    var childTable = this.clipboardData.childTable;
                    var tempNode = void 0;
                    var elements = [];
                    var nodes = this.getAllDescendants(node, elements, true);
                    for (var i = 0; i < nodes.length; i++) {
                        tempNode = this.diagram.nameTable[nodes[i].id];
                        var clonedObject = childTable[tempNode.id] = clone(tempNode);
                        var newOffset = transformPointByMatrix(matrix, { x: clonedObject.wrapper.offsetX, y: clonedObject.wrapper.offsetY });
                        if (tempNode instanceof Node) {
                            clonedObject.offsetX = newOffset.x;
                            clonedObject.offsetY = newOffset.y;
                            clonedObject.rotateAngle -= node.rotateAngle;
                        }
                    }
                    this.clipboardData.childTable = childTable;
                }
                if (node.shape.type === 'SwimLane') {
                    var swimlane = this.diagram.getObject(this.diagram.selectedItems.nodes[j].id);
                    var childTable = this.clipboardData.childTable;
                    var connectorsList = getConnectors(this.diagram, swimlane.wrapper.children[0], 0, true);
                    for (var i = 0; i < connectorsList.length; i++) {
                        var connector = this.diagram.getObject(connectorsList[i]);
                        childTable[connector.id] = clone(connector);
                    }
                }
                if (node && node.isLane) {
                    var childTable = this.clipboardData.childTable;
                    var swimlane = this.diagram.getObject(node.parentId);
                    var laneIndex = findLaneIndex(swimlane, node);
                    childTable[node.id] = cloneObject(swimlane.shape.lanes[laneIndex]);
                    childTable[node.id].width = swimlane.wrapper.actualSize.width;
                }
            }
        }
        if (this.clipboardData.pasteIndex === 0) {
            this.startGroupAction();
            for (var _i = 0, selectedItems_1 = selectedItems; _i < selectedItems_1.length; _i++) {
                var item = selectedItems_1[_i];
                if (this.diagram.nameTable[item.id]) {
                    if (this.diagram.bpmnModule &&
                        this.diagram.bpmnModule.textAnnotationConnectors.indexOf(item) > -1) {
                        this.diagram.remove(this.diagram.nameTable[item.targetID]);
                    }
                    else {
                        this.diagram.remove(item);
                    }
                }
            }
            this.endGroupAction();
        }
        this.sortByZIndex(obj, 'zIndex');
        return obj;
    };
    CommandHandler.prototype.copyProcesses = function (node) {
        if (node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes &&
            node.shape.activity.subProcess.processes.length > 0) {
            var processes = node.shape.activity.subProcess.processes;
            for (var _i = 0, processes_1 = processes; _i < processes_1.length; _i++) {
                var i = processes_1[_i];
                this.processTable[i] = (clone(this.diagram.nameTable[i]));
                if (this.processTable[i].shape.activity.subProcess.processes &&
                    this.processTable[i].shape.activity.subProcess.processes.length > 0) {
                    this.copyProcesses(this.processTable[i]);
                }
            }
            this.clipboardData.processTable = this.processTable;
        }
    };
    /** @private */
    CommandHandler.prototype.group = function () {
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram[propName];
        this.diagram.protectPropertyChange(true);
        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.Group;
        var selectedItems = [];
        var obj = {};
        var group;
        obj.id = 'group' + randomId();
        obj = new Node(this.diagram, 'nodes', obj, true);
        obj.children = [];
        selectedItems = this.diagram.selectedItems.nodes;
        selectedItems = selectedItems.concat(this.diagram.selectedItems.connectors);
        for (var i = 0; i < selectedItems.length; i++) {
            if (!selectedItems[i].parentId) {
                obj.children.push(selectedItems[i].id);
            }
        }
        group = this.diagram.add(obj);
        if (group) {
            this.select(group);
        }
        var entry = { type: 'Group', undoObject: obj, redoObject: obj, category: 'Internal' };
        this.addHistoryEntry(entry);
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.Group;
        this.diagram.protectPropertyChange(protectedChange);
    };
    /** @private */
    CommandHandler.prototype.unGroup = function (obj) {
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram[propName];
        this.diagram.protectPropertyChange(true);
        this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.Group;
        var selectedItems = [];
        if (obj) {
            selectedItems.push(obj);
        }
        else {
            selectedItems = this.diagram.selectedItems.nodes;
        }
        for (var i = 0; i < selectedItems.length; i++) {
            var node = selectedItems[i];
            var entry = {
                type: 'UnGroup', undoObject: cloneObject(node),
                redoObject: cloneObject(node), category: 'Internal'
            };
            if (!(this.diagram.diagramActions & DiagramAction.UndoRedo)) {
                this.addHistoryEntry(entry);
            }
            if (node.children) {
                if (node.ports && node.ports.length > 0) {
                    this.diagram.removePorts(node, node.ports);
                }
                if (node.annotations && node.annotations.length > 0) {
                    this.diagram.removeLabels(node, node.annotations);
                }
                var parentNode = this.diagram.nameTable[node.parentId];
                for (var j = node.children.length - 1; j >= 0; j--) {
                    (this.diagram.nameTable[node.children[j]]).parentId = '';
                    this.diagram.deleteChild(this.diagram.nameTable[node.children[j]], node);
                    if (node.parentId && node.children[j]) {
                        this.diagram.addChild(parentNode, node.children[j]);
                    }
                }
                if (node.parentId) {
                    this.diagram.deleteChild(node, parentNode);
                }
            }
            this.diagram.removeNode(node);
            this.clearSelection();
        }
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.Group;
        this.diagram.protectPropertyChange(protectedChange);
    };
    /** @private */
    CommandHandler.prototype.paste = function (obj) {
        if (obj || this.clipboardData.clipObject) {
            this.diagram.protectPropertyChange(true);
            var copiedItems = obj ? this.getNewObject(obj) :
                this.clipboardData.clipObject;
            if (copiedItems) {
                var multiSelect = copiedItems.length !== 1;
                var groupAction = false;
                var objectTable = {};
                var keyTable = {};
                if (this.clipboardData.pasteIndex !== 0) {
                    this.clearSelection();
                }
                if (this.diagram.undoRedoModule) {
                    groupAction = true;
                    this.diagram.historyManager.startGroupAction();
                }
                for (var _i = 0, copiedItems_1 = copiedItems; _i < copiedItems_1.length; _i++) {
                    var copy = copiedItems_1[_i];
                    objectTable[copy.id] = copy;
                }
                for (var j = 0; j < copiedItems.length; j++) {
                    var copy = copiedItems[j];
                    if (getObjectType(copy) === Connector) {
                        var clonedObj = clone(copy);
                        var nodeId = clonedObj.sourceID;
                        clonedObj.sourceID = '';
                        if (objectTable[nodeId] && keyTable[nodeId]) {
                            clonedObj.sourceID = keyTable[nodeId];
                        }
                        nodeId = clonedObj.targetID;
                        clonedObj.targetID = '';
                        if (objectTable[nodeId] && keyTable[nodeId]) {
                            clonedObj.targetID = keyTable[nodeId];
                        }
                        var newObj = this.cloneConnector(clonedObj, multiSelect);
                        keyTable[copy.id] = newObj.id;
                    }
                    else {
                        var newNode = this.cloneNode(copy, multiSelect);
                        //bpmn text annotations will not be pasted
                        if (newNode) {
                            keyTable[copy.id] = newNode.id;
                            var edges = copy.inEdges;
                            if (edges) {
                                for (var _a = 0, edges_1 = edges; _a < edges_1.length; _a++) {
                                    var edge = edges_1[_a];
                                    if (objectTable[edge] && keyTable[edge]) {
                                        var newConnector = this.diagram.nameTable[keyTable[edge]];
                                        newConnector.targetID = keyTable[copy.id];
                                        this.diagram.connectorPropertyChange(newConnector, { targetID: '', targetPortID: '' }, { targetID: newConnector.targetID, targetPortID: newConnector.targetPortID });
                                    }
                                }
                            }
                            edges = copy.outEdges;
                            if (edges) {
                                for (var _b = 0, edges_2 = edges; _b < edges_2.length; _b++) {
                                    var edge = edges_2[_b];
                                    if (objectTable[edge] && keyTable[edge]) {
                                        var newConnector = this.diagram.nameTable[keyTable[edge]];
                                        newConnector.sourceID = keyTable[copy.id];
                                        this.diagram.connectorPropertyChange(newConnector, { sourceID: '', sourcePortID: '' }, { sourceID: newConnector.sourceID, sourcePortID: newConnector.sourcePortID });
                                    }
                                }
                            }
                        }
                    }
                }
                if (groupAction === true) {
                    this.diagram.historyManager.endGroupAction();
                    groupAction = false;
                }
                if (this.diagram.mode !== 'SVG') {
                    this.diagram.refreshDiagramLayer();
                }
                this.clipboardData.pasteIndex++;
                this.diagram.protectPropertyChange(false);
            }
        }
    };
    CommandHandler.prototype.getNewObject = function (obj) {
        var newObj;
        var newobjs = [];
        this.clipboardData.pasteIndex = 1;
        for (var i = 0; i < obj.length; i++) {
            newObj = cloneObject(obj[i]);
            newobjs.push(newObj);
        }
        return newobjs;
    };
    CommandHandler.prototype.cloneConnector = function (connector, multiSelect) {
        var newConnector;
        var cloneObject = clone(connector);
        this.translateObject(cloneObject);
        cloneObject.zIndex = -1;
        newConnector = this.diagram.add(cloneObject);
        this.selectObjects([newConnector], multiSelect);
        return newConnector;
    };
    CommandHandler.prototype.cloneNode = function (node, multiSelect, children, groupnodeID) {
        var newNode;
        var connectorsTable = {};
        var cloneObject = clone(node);
        var process;
        var temp = this.diagram.nameTable[node.parentId];
        if (node.shape && node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes
            && node.shape.activity.subProcess.processes.length) {
            process = cloneObject.shape.activity.subProcess.processes;
            cloneObject.zIndex = -1;
            cloneObject.shape.activity.subProcess.processes = undefined;
        }
        if (node.shape && node.shape.type === 'SwimLane') {
            pasteSwimLane(node, this.diagram, this.clipboardData);
        }
        else if (temp && temp.shape.type === 'SwimLane') {
            pasteSwimLane(clone(temp), this.diagram, this.clipboardData, node, true);
        }
        else if (node.children && node.children.length && (!children || !children.length)) {
            newNode = this.cloneGroup(node, multiSelect);
        }
        else if (node.shape && node.shape.shape === 'TextAnnotation' && node.id.indexOf('_textannotation_') !== -1 &&
            this.diagram.nameTable[node.id]) {
            var checkAnnotation = node.id.split('_textannotation_');
            var parentNode = void 0;
            var annotation = this.diagram.nameTable[node.id];
            for (var j = 0; j < annotation.inEdges.length; j++) {
                var connector = this.diagram.nameTable[annotation.inEdges[j]];
                if (connector) {
                    parentNode = this.diagram.nameTable[connector.sourceID];
                    var clonedNode = this.getAnnotation(parentNode, checkAnnotation[1]);
                    var annotationNode = {
                        id: checkAnnotation[1] + randomId(),
                        angle: clonedNode.angle,
                        text: clonedNode.text,
                        length: clonedNode.length,
                        shape: { shape: 'TextAnnotation', type: 'Bpmn' },
                        nodeId: clonedNode.nodeId
                    };
                    this.diagram.addTextAnnotation(annotationNode, parentNode);
                }
            }
        }
        else {
            this.translateObject(cloneObject, groupnodeID);
            cloneObject.zIndex = -1;
            if (children) {
                cloneObject.children = children;
            }
            newNode = this.diagram.add(cloneObject);
        }
        for (var _i = 0, _a = Object.keys(connectorsTable); _i < _a.length; _i++) {
            var i = _a[_i];
            this.diagram.add(connectorsTable[i]);
        }
        if (process && process.length) {
            newNode.shape.activity.subProcess.processes = process;
            this.cloneSubProcesses(newNode);
        }
        if (newNode) {
            this.selectObjects([newNode], multiSelect);
        }
        return newNode;
    };
    CommandHandler.prototype.getAnnotation = function (parent, annotationId) {
        var currentAnnotation = parent.shape.annotations;
        if (currentAnnotation && currentAnnotation.length) {
            for (var g = 0; g <= currentAnnotation.length; g++) {
                if (currentAnnotation[g].id === annotationId) {
                    return currentAnnotation[g];
                }
            }
        }
        return undefined;
    };
    CommandHandler.prototype.cloneSubProcesses = function (node) {
        var connector = [];
        var temp = {};
        if (node.shape.type === 'Bpmn' && node.shape.activity &&
            node.shape.activity.subProcess.processes
            && node.shape.activity.subProcess.processes.length) {
            var process = node.shape.activity.subProcess.processes;
            for (var g = 0; g < process.length; g++) {
                var child = this.diagram.nameTable[process[g]] || this.clipboardData.processTable[process[g]];
                for (var _i = 0, _a = child.outEdges; _i < _a.length; _i++) {
                    var j = _a[_i];
                    if (connector.indexOf(j) < 0) {
                        connector.push(j);
                    }
                }
                for (var _b = 0, _c = child.inEdges; _b < _c.length; _b++) {
                    var j = _c[_b];
                    if (connector.indexOf(j) < 0) {
                        connector.push(j);
                    }
                }
                var innerChild = cloneObject(this.clipboardData.processTable[process[g]]);
                innerChild.processId = node.id;
                var newNode = this.cloneNode(innerChild, false);
                temp[process[g]] = newNode.id;
                process[g] = newNode.id;
                this.diagram.addProcess(newNode, node.id);
                for (var _d = 0, connector_1 = connector; _d < connector_1.length; _d++) {
                    var i = connector_1[_d];
                    var node_1 = this.diagram.nameTable[i] || this.diagram.connectorTable[i];
                    var clonedNode = cloneObject(node_1);
                    if (temp[clonedNode.sourceID] && temp[clonedNode.targetID]) {
                        clonedNode.zIndex = -1;
                        clonedNode.id += randomId();
                        clonedNode.sourceID = temp[clonedNode.sourceID];
                        clonedNode.targetID = temp[clonedNode.targetID];
                        connector.splice(connector.indexOf(i), 1);
                        this.diagram.add(clonedNode);
                    }
                }
            }
        }
    };
    CommandHandler.prototype.cloneGroup = function (obj, multiSelect) {
        var value;
        var newChildren = [];
        var children = [];
        var connectorObj = [];
        var newObj;
        var oldID = [];
        children = children.concat(obj.children);
        var id = randomId();
        if (this.clipboardData.childTable || obj.children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                var childObj = void 0;
                if (this.clipboardData.childTable) {
                    childObj = this.clipboardData.childTable[children[i]];
                }
                else {
                    childObj = this.diagram.nameTable[children[i]];
                }
                childObj.parentId = '';
                if (childObj) {
                    if (getObjectType(childObj) === Connector) {
                        connectorObj.push(childObj);
                    }
                    else {
                        newObj = this.cloneNode(childObj, multiSelect, undefined, id);
                        oldID.push(childObj.id);
                        newChildren.push(newObj.id);
                    }
                }
            }
        }
        for (var k = 0; k < connectorObj.length; k++) {
            if (connectorObj[k].sourceID || connectorObj[k].targetID) {
                for (var j = 0; j < oldID.length; j++) {
                    if (connectorObj[k].sourceID === (oldID[j])) {
                        connectorObj[k].sourceID += id;
                    }
                    if (connectorObj[k].targetID === (oldID[j])) {
                        connectorObj[k].targetID += id;
                    }
                }
            }
            newObj = this.cloneConnector(connectorObj[k], multiSelect);
            newChildren.push(newObj.id);
        }
        var parentObj = this.cloneNode(obj, multiSelect, newChildren);
        if (parentObj && parentObj.container && parentObj.shape && parentObj.shape.type === 'UmlClassifier') {
            this.diagram.updateDiagramObject(parentObj);
            parentObj.wrapper.measure(new Size());
        }
        return parentObj;
    };
    /** @private */
    CommandHandler.prototype.translateObject = function (obj, groupnodeID) {
        obj.id += groupnodeID || randomId();
        var diff = this.clipboardData.pasteIndex * 10;
        if (getObjectType(obj) === Connector) {
            obj.sourcePoint = {
                x: obj.sourcePoint.x + diff, y: obj.sourcePoint.y + diff
            };
            obj.targetPoint = {
                x: obj.targetPoint.x + diff, y: obj.targetPoint.y + diff
            };
            if (obj.type === 'Bezier') {
                var segments = obj.segments;
                for (var i = 0; i < segments.length; i++) {
                    if (!Point.isEmptyPoint(segments[i].point1)) {
                        segments[i].point1 = {
                            x: segments[i].point1.x + diff, y: segments[i].point1.y + diff
                        };
                    }
                    if (!Point.isEmptyPoint(segments[i].point2)) {
                        segments[i].point2 = {
                            x: segments[i].point2.x + diff, y: segments[i].point2.y + diff
                        };
                    }
                }
            }
            if (obj.type === 'Straight' || obj.type === 'Bezier') {
                if (obj.segments && obj.segments.length > 0) {
                    var segments = obj.segments;
                    for (var i = 0; i < segments.length - 1; i++) {
                        segments[i].point.x += diff;
                        segments[i].point.y += diff;
                    }
                }
            }
        }
        else {
            obj.offsetX += diff;
            obj.offsetY += diff;
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.drawObject = function (obj) {
        var newObj;
        var cloneObject;
        cloneObject = clone(this.diagram.drawingObject);
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var prop = _a[_i];
            cloneObject[prop] = obj[prop];
        }
        if (getObjectType(this.diagram.drawingObject) === Node) {
            newObj = new Node(this.diagram, 'nodes', cloneObject, true);
            newObj.id = (this.diagram.drawingObject.id || 'node') + randomId();
            this.diagram.initObject(newObj);
        }
        else {
            newObj = new Connector(this.diagram, 'connectors', cloneObject, true);
            newObj.id = (this.diagram.drawingObject.id || 'connector') + randomId();
            this.diagram.initObject(newObj);
        }
        this.diagram.updateDiagramObject(newObj);
        this.diagram.currentDrawingObject = newObj;
        return newObj;
    };
    /**
     * @private
     */
    CommandHandler.prototype.addObjectToDiagram = function (obj) {
        var newObj;
        this.diagram.removeFromAQuad(obj);
        this.diagram.removeObjectsFromLayer(this.diagram.nameTable[obj.id]);
        delete this.diagram.nameTable[obj.id];
        newObj = this.diagram.add(obj);
        if (this.diagram.mode !== 'SVG') {
            this.diagram.refreshDiagramLayer();
        }
        this.selectObjects([newObj]);
        if (obj && (!(canContinuousDraw(this.diagram)))) {
            this.diagram.tool &= ~DiagramTools.DrawOnce;
            this.diagram.currentDrawingObject = undefined;
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.addText = function (obj, currentPosition) {
        var annotation = this.diagram.findElementUnderMouse(obj, currentPosition);
        this.diagram.startTextEdit(obj, annotation instanceof TextElement ? (annotation.id).split('_')[1] : undefined);
    };
    CommandHandler.prototype.updateArgsObject = function (obj, arg1, argValue) {
        if (obj) {
            var connector = void 0;
            for (var i = 0; i < obj.length; i++) {
                connector = (getObjectType(obj[i]) === Connector);
                connector ? argValue.connectors.push(cloneBlazorObject(obj[i])) : argValue.nodes.push(cloneBlazorObject(obj[i]));
            }
        }
    };
    CommandHandler.prototype.updateSelectionChangeEventArgs = function (arg, obj, oldValue) {
        if (isBlazor()) {
            arg = {
                cause: this.diagram.diagramActions, newValue: {}, oldValue: {},
                state: 'Changing', type: 'Addition', cancel: false
            };
            var argOldValue = arg.oldValue;
            var argNewValue = arg.newValue;
            argOldValue.connectors = [];
            argOldValue.nodes = [];
            argNewValue.connectors = [];
            argNewValue.nodes = [];
            this.updateArgsObject(obj, arg, argNewValue);
            this.updateArgsObject(oldValue, arg, argOldValue);
            return arg;
        }
        return arg;
    };
    /** @private */
    CommandHandler.prototype.selectObjects = function (obj, multipleSelection, oldValue) {
        var arg = {
            oldValue: oldValue ? oldValue : this.getSelectedObject(),
            newValue: obj, cause: this.diagram.diagramActions,
            state: 'Changing', type: 'Addition', cancel: false
        };
        var select = true;
        if (isBlazor()) {
            arg = this.updateSelectionChangeEventArgs(arg, obj, oldValue ? oldValue : []);
        }
        this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
        var canDoMultipleSelection = canMultiSelect(this.diagram);
        var canDoSingleSelection = canSingleSelect(this.diagram);
        if (canDoSingleSelection || canDoMultipleSelection) {
            if (!canDoMultipleSelection && ((obj.length > 1) || (multipleSelection && obj.length === 1))) {
                if (obj.length === 1) {
                    this.clearSelection();
                }
                else {
                    return;
                }
            }
            if (!canDoSingleSelection && obj.length === 1 && (!multipleSelection || !hasSelection(this.diagram))) {
                this.clearSelection();
                return;
            }
        }
        if (!arg.cancel) {
            for (var i = 0; i < obj.length; i++) {
                var newObj = obj[i];
                select = true;
                if (!hasSelection(this.diagram)) {
                    this.select(newObj, i > 0 || multipleSelection, true);
                }
                else {
                    if ((i > 0 || multipleSelection) && newObj.children && !newObj.parentId) {
                        for (var i_1 = 0; i_1 < this.diagram.selectedItems.nodes.length; i_1++) {
                            var parentNode = this.diagram.nameTable[this.diagram.selectedItems.nodes[i_1].parentId];
                            if (parentNode) {
                                parentNode = this.findParent(parentNode);
                                if (parentNode) {
                                    if (newObj.id === parentNode.id) {
                                        this.selectGroup(newObj);
                                    }
                                }
                            }
                        }
                    }
                    this.selectProcesses(newObj);
                    select = this.selectBpmnSubProcesses(newObj);
                    if (select) {
                        this.select(newObj, i > 0 || multipleSelection, true);
                    }
                }
            }
            arg = {
                oldValue: cloneBlazorObject(oldValue ? oldValue : []),
                newValue: cloneBlazorObject(this.getSelectedObject()),
                cause: this.diagram.diagramActions, state: 'Changed', type: 'Addition', cancel: false,
            };
            this.updateBlazorSelectorModel(oldValue);
            arg = this.updateSelectionChangeEventArgs(arg, obj, oldValue);
            this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
            this.diagram.renderSelector(multipleSelection || (obj && obj.length > 1));
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.findParent = function (node) {
        if (node.parentId) {
            node = this.diagram.nameTable[node.parentId];
            this.findParent(node);
        }
        return node;
    };
    CommandHandler.prototype.selectProcesses = function (newObj) {
        if (this.hasProcesses(newObj)) {
            var processes = (newObj).shape.activity.subProcess.processes;
            for (var i = 0; i < processes.length; i++) {
                var innerChild = this.diagram.nameTable[processes[i]];
                if (this.hasProcesses(innerChild)) {
                    this.selectObjects([innerChild], true);
                }
                this.unSelect(innerChild);
            }
        }
    };
    CommandHandler.prototype.selectGroup = function (newObj) {
        for (var j = 0; j < newObj.children.length; j++) {
            var innerChild = this.diagram.nameTable[newObj.children[j]];
            if (innerChild.children) {
                this.selectGroup(innerChild);
            }
            this.unSelect(this.diagram.nameTable[newObj.children[j]]);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.selectBpmnSubProcesses = function (node) {
        var select = true;
        var parent;
        if (node.processId) {
            if (isSelected(this.diagram, this.diagram.nameTable[node.processId])) {
                select = false;
            }
            else {
                select = this.selectBpmnSubProcesses(this.diagram.nameTable[node.processId]);
            }
        }
        else if (node instanceof Connector) {
            if (node.sourceID && this.diagram.nameTable[node.sourceID] &&
                this.diagram.nameTable[node.sourceID].processId) {
                parent = this.diagram.nameTable[node.sourceID].processId;
            }
            if (node.targetID && this.diagram.nameTable[node.targetID] &&
                this.diagram.nameTable[node.targetID].processId) {
                parent = this.diagram.nameTable[node.targetID].processId;
            }
            if (parent) {
                if (isSelected(this.diagram, this.diagram.nameTable[parent])) {
                    return false;
                }
                else {
                    select = this.selectBpmnSubProcesses(this.diagram.nameTable[parent]);
                }
            }
        }
        else if (node.parentId && this.diagram.nameTable[node.parentId] &&
            this.diagram.nameTable[node.parentId].shape.type === 'UmlClassifier') {
            if (isSelected(this.diagram, this.diagram.nameTable[node.parentId])) {
                select = false;
            }
        }
        return select;
    };
    /**
     * @private
     */
    CommandHandler.prototype.hasProcesses = function (node) {
        if (node) {
            if ((node.shape.type === 'Bpmn') && node.shape.activity &&
                node.shape.activity.subProcess.processes &&
                node.shape.activity.subProcess.processes.length > 0) {
                return true;
            }
        }
        return false;
    };
    /** @private */
    CommandHandler.prototype.select = function (obj, multipleSelection, preventUpdate) {
        var hasLayer = this.getObjectLayer(obj.id);
        if ((canSelect(obj) && !(obj instanceof Selector) && !isSelected(this.diagram, obj))
            && (hasLayer && !hasLayer.lock && hasLayer.visible) && obj.wrapper.visible) {
            multipleSelection = hasSelection(this.diagram) ? multipleSelection : false;
            if (!multipleSelection) {
                this.clearSelection();
            }
            var selectorModel = this.diagram.selectedItems;
            var convert = obj;
            if (convert instanceof Node) {
                if (obj.isHeader) {
                    var node = this.diagram.nameTable[obj.parentId];
                    selectorModel.nodes.push(node);
                }
                else {
                    selectorModel.nodes.push(obj);
                }
            }
            else {
                selectorModel.connectors.push(obj);
            }
            if (!multipleSelection) {
                selectorModel.init(this.diagram);
                if (selectorModel.nodes.length === 1 && selectorModel.connectors.length === 0) {
                    var wrapper = gridSelection(this.diagram, selectorModel);
                    if (wrapper) {
                        selectorModel.wrapper.children[0] = wrapper;
                    }
                    selectorModel.rotateAngle = selectorModel.nodes[0].rotateAngle;
                    selectorModel.wrapper.rotateAngle = selectorModel.nodes[0].rotateAngle;
                    selectorModel.wrapper.pivot = selectorModel.nodes[0].pivot;
                }
            }
            else {
                selectorModel.wrapper.rotateAngle = selectorModel.rotateAngle = 0;
                selectorModel.wrapper.children.push(obj.wrapper);
            }
            if (!preventUpdate) {
                this.diagram.renderSelector(multipleSelection);
            }
        }
    };
    CommandHandler.prototype.getObjectCollectionId = function (isNode, clearSelection) {
        var id = [];
        var i = 0;
        var selectedObject = isNode ? this.diagram.selectedItems.nodes
            : this.diagram.selectedItems.connectors;
        while (!clearSelection && i < selectedObject.length) {
            id[i] = selectedObject[i].id;
            i++;
        }
        return id;
    };
    CommandHandler.prototype.updateBlazorSelectorModel = function (oldItemsCollection, clearSelection) {
        var ejsInterop = 'ejsInterop';
        if (window && window[ejsInterop]) {
            var i = 0;
            var nodes = [];
            var connectors = [];
            var oldItems = [];
            while (oldItemsCollection && i < oldItemsCollection.length) {
                oldItems[i] = oldItemsCollection[i].id;
                i++;
            }
            i = 0;
            nodes = this.getObjectCollectionId(true, clearSelection);
            connectors = this.getObjectCollectionId(false, clearSelection);
            var items = { nodes: nodes, connectors: connectors };
            var newItems = cloneBlazorObject(items);
            if (window[ejsInterop].updateDiagramCollection) {
                window[ejsInterop].updateDiagramCollection.call(this.diagram, 'selectedItems', newItems, oldItems, false, true);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.labelSelect = function (obj, textWrapper) {
        var selectorModel = (this.diagram.selectedItems);
        selectorModel.nodes = selectorModel.connectors = [];
        if (obj instanceof Node) {
            selectorModel.nodes[0] = obj;
        }
        else {
            selectorModel.connectors[0] = obj;
        }
        selectorModel.annotation = (this.findTarget(textWrapper, obj));
        selectorModel.init(this.diagram);
        this.diagram.renderSelector(false);
    };
    /** @private */
    CommandHandler.prototype.unSelect = function (obj) {
        var objArray = [];
        objArray.push(obj);
        var arg = {
            oldValue: objArray, newValue: [], cause: this.diagram.diagramActions,
            state: 'Changing', type: 'Removal', cancel: false
        };
        if (!this.diagram.currentSymbol) {
            if (isBlazor()) {
                arg = this.updateSelectionChangeEventArgs(arg, [], objArray);
            }
            this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
        }
        if (isSelected(this.diagram, obj)) {
            var selectormodel = this.diagram.selectedItems;
            var index = void 0;
            if (obj instanceof Node) {
                index = selectormodel.nodes.indexOf(obj, 0);
                selectormodel.nodes.splice(index, 1);
            }
            else {
                index = selectormodel.connectors.indexOf(obj, 0);
                selectormodel.connectors.splice(index, 1);
            }
            arg = {
                oldValue: objArray, newValue: [], cause: this.diagram.diagramActions,
                state: 'Changed', type: 'Removal', cancel: false
            };
            this.updateBlazorSelectorModel(objArray);
            arg = {
                oldValue: cloneBlazorObject(objArray), newValue: [], cause: this.diagram.diagramActions,
                state: 'Changed', type: 'Removal', cancel: arg.cancel
            };
            if (!arg.cancel) {
                index = selectormodel.wrapper.children.indexOf(obj.wrapper, 0);
                selectormodel.wrapper.children.splice(index, 1);
                this.diagram.updateSelector();
                if (!this.diagram.currentSymbol) {
                    arg = this.updateSelectionChangeEventArgs(arg, [], objArray);
                    this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.getChildElements = function (child) {
        var children = [];
        for (var i = 0; i < child.length; i++) {
            var childNode = child[i];
            if (childNode.children && childNode.children.length > 0) {
                children.concat(this.getChildElements(childNode.children));
            }
            else {
                children.push(childNode.id);
                if (childNode instanceof TextElement) {
                    children.push(childNode.id + '_text');
                }
            }
        }
        return children;
    };
    /** @private */
    CommandHandler.prototype.moveSvgNode = function (nodeId, targetID) {
        var diagramDiv = getDiagramElement(targetID + '_groupElement', this.diagram.element.id);
        var backNode = getDiagramElement(nodeId + '_groupElement', this.diagram.element.id);
        diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
    };
    /** @private */
    CommandHandler.prototype.sendLayerBackward = function (layerName) {
        var layer = this.getLayer(layerName);
        if (layer && layer.zIndex !== 0) {
            var index = layer.zIndex;
            if (this.diagram.mode === 'SVG') {
                var currentLayerObject = layer.objects;
                var targetObject = this.getLayer(this.diagram.layerZIndexTable[index - 1]).objects[0];
                if (targetObject) {
                    for (var _i = 0, currentLayerObject_1 = currentLayerObject; _i < currentLayerObject_1.length; _i++) {
                        var obj = currentLayerObject_1[_i];
                        this.moveSvgNode(obj, targetObject);
                    }
                }
            }
            var targetLayer = this.getLayer(this.diagram.layerZIndexTable[index - 1]);
            targetLayer.zIndex = targetLayer.zIndex + 1;
            layer.zIndex = layer.zIndex - 1;
            var temp = this.diagram.layerZIndexTable[index];
            this.diagram.layerZIndexTable[index] = this.diagram.layerZIndexTable[index - 1];
            this.diagram.layerZIndexTable[index - 1] = temp;
            if (this.diagram.mode === 'Canvas') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.bringLayerForward = function (layerName) {
        var layer = this.getLayer(layerName);
        if (layer && layer.zIndex < this.diagram.layers.length - 1) {
            var index = layer.zIndex;
            var targetLayer = this.getLayer(this.diagram.layerZIndexTable[index + 1]);
            if (this.diagram.mode === 'SVG') {
                var currentLayerObject = layer.objects[0];
                var targetLayerObjects = targetLayer.objects;
                for (var _i = 0, targetLayerObjects_1 = targetLayerObjects; _i < targetLayerObjects_1.length; _i++) {
                    var obj = targetLayerObjects_1[_i];
                    if (obj) {
                        this.moveSvgNode(obj, currentLayerObject);
                    }
                }
            }
            targetLayer.zIndex = targetLayer.zIndex - 1;
            layer.zIndex = layer.zIndex + 1;
            var temp = this.diagram.layerZIndexTable[index];
            this.diagram.layerZIndexTable[index] = this.diagram.layerZIndexTable[index + 1];
            this.diagram.layerZIndexTable[index + 1] = temp;
            if (this.diagram.mode === 'Canvas') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.sendToBack = function () {
        if (hasSelection(this.diagram)) {
            var objectId = this.diagram.selectedItems.nodes.length ? this.diagram.selectedItems.nodes[0].id
                : this.diagram.selectedItems.connectors[0].id;
            var index = this.diagram.nameTable[objectId].zIndex;
            var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectId));
            var zIndexTable = this.diagram.layers[layerNum].zIndexTable;
            for (var i = index; i > 0; i--) {
                if (zIndexTable[i]) {
                    //When there are empty records in the zindex table
                    if (!zIndexTable[i - 1]) {
                        zIndexTable[i - 1] = zIndexTable[i];
                        this.diagram.nameTable[zIndexTable[i - 1]].zIndex = i;
                        delete zIndexTable[i];
                    }
                    else {
                        //bringing the objects forward
                        zIndexTable[i] = zIndexTable[i - 1];
                        this.diagram.nameTable[zIndexTable[i]].zIndex = i;
                    }
                }
            }
            zIndexTable[0] = this.diagram.nameTable[objectId].id;
            this.diagram.nameTable[objectId].zIndex = 0;
            if (this.diagram.mode === 'SVG') {
                var i = 1;
                var target = zIndexTable[i];
                while (!target && i < index) {
                    target = zIndexTable[++i];
                }
                this.moveSvgNode(objectId, target);
                this.updateNativeNodeIndex(objectId);
            }
            else {
                this.diagram.refreshCanvasLayers();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.bringToFront = function () {
        if (hasSelection(this.diagram)) {
            var objectName = this.diagram.selectedItems.nodes.length ? this.diagram.selectedItems.nodes[0].id
                : this.diagram.selectedItems.connectors[0].id;
            var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectName));
            var zIndexTable = this.diagram.layers[layerNum].zIndexTable;
            //find the maximum zIndex of the tabel
            var tabelLength = Number(Object.keys(zIndexTable).sort(function (a, b) { return Number(a) - Number(b); }).reverse()[0]);
            var index = this.diagram.nameTable[objectName].zIndex;
            for (var i = index; i < tabelLength; i++) {
                //When there are empty records in the zindex table
                if (zIndexTable[i]) {
                    if (!zIndexTable[i + 1]) {
                        zIndexTable[i + 1] = zIndexTable[i];
                        this.diagram.nameTable[zIndexTable[i + 1]].zIndex = i;
                        delete zIndexTable[i];
                    }
                    else {
                        //bringing the objects backward
                        zIndexTable[i] = zIndexTable[i + 1];
                        this.diagram.nameTable[zIndexTable[i]].zIndex = i;
                    }
                }
            }
            zIndexTable[tabelLength] = this.diagram.nameTable[objectName].id;
            this.diagram.nameTable[objectName].zIndex = tabelLength;
            if (this.diagram.mode === 'SVG') {
                var diagramLayer = this.diagram.diagramLayer;
                var child = this.getChildElements(this.diagram.nameTable[objectName].wrapper.children);
                var targerNodes = [];
                var element = getDiagramElement(objectName + '_groupElement', this.diagram.element.id);
                var nodes = this.diagram.selectedItems.nodes;
                if (nodes.length > 0 && (nodes[0].shape.type === 'Native' || nodes[0].shape.type === 'HTML')) {
                    element.parentNode.removeChild(element);
                    for (var j = 0; j < this.diagram.views.length; j++) {
                        element = getDiagramElement(objectName + (nodes[0].shape.type === 'HTML' ? '_html_element' : '_content_groupElement'), this.diagram.views[j]);
                        var lastChildNode = element.parentNode.lastChild;
                        lastChildNode.parentNode.insertBefore(element, lastChildNode.nextSibling);
                    }
                    var htmlLayer = getHTMLLayer(this.diagram.element.id);
                    this.diagram.diagramRenderer.renderElement(this.diagram.nameTable[objectName].wrapper, diagramLayer, htmlLayer);
                }
                else {
                    var target = void 0;
                    var layer = this.getObjectLayer(objectName);
                    for (var i = 0; i < layer.objects.length; i++) {
                        if (layer.objects[i] !== objectName) {
                            this.moveSvgNode(layer.objects[i], objectName);
                            this.updateNativeNodeIndex(objectName);
                        }
                    }
                }
            }
            else {
                this.diagram.refreshCanvasLayers();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.sortByZIndex = function (nodeArray, sortID) {
        var id = sortID ? sortID : 'zIndex';
        nodeArray = nodeArray.sort(function (a, b) {
            return a[id] - b[id];
        });
        return nodeArray;
    };
    /** @private */
    CommandHandler.prototype.sendForward = function () {
        if (hasSelection(this.diagram)) {
            var nodeId = this.diagram.selectedItems.nodes.length ? this.diagram.selectedItems.nodes[0].id
                : this.diagram.selectedItems.connectors[0].id;
            var layerIndex = this.diagram.layers.indexOf(this.getObjectLayer(nodeId));
            var zIndexTable = this.diagram.layers[layerIndex].zIndexTable;
            var tabelLength = Object.keys(zIndexTable).length;
            var index = this.diagram.nameTable[nodeId];
            var intersectArray = [];
            var temp = this.diagram.spatialSearch.findObjects(index.wrapper.bounds);
            if (temp.length > 2) {
                temp = this.sortByZIndex(temp);
            }
            for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
                var i = temp_1[_i];
                if (index.id !== i.id) {
                    var currentLayer = this.getObjectLayer(i.id).zIndex;
                    if (layerIndex === currentLayer && (Number(this.diagram.nameTable[nodeId].zIndex) < Number(i.zIndex)) &&
                        index.wrapper.bounds.intersects(i.wrapper.bounds)) {
                        intersectArray.push(i);
                        break;
                    }
                }
            }
            if (intersectArray.length > 0) {
                var overlapObject = intersectArray[0].zIndex;
                var currentObject = index.zIndex;
                var temp_2 = zIndexTable[overlapObject];
                //swap the nodes
                this.diagram.layers[0].zIndexTable[overlapObject] = index.id;
                this.diagram.nameTable[zIndexTable[overlapObject]].zIndex = overlapObject;
                this.diagram.layers[0].zIndexTable[currentObject] = intersectArray[0].id;
                this.diagram.nameTable[zIndexTable[currentObject]].zIndex = currentObject;
                if (this.diagram.mode === 'SVG') {
                    this.moveSvgNode(zIndexTable[Number(intersectArray[0].zIndex)], nodeId);
                    this.updateNativeNodeIndex(zIndexTable[Number(intersectArray[0].zIndex)], nodeId);
                }
                else {
                    this.diagram.refreshCanvasLayers();
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.sendBackward = function () {
        if (hasSelection(this.diagram)) {
            var objectId = this.diagram.selectedItems.nodes.length ? this.diagram.selectedItems.nodes[0].id
                : this.diagram.selectedItems.connectors[0].id;
            var layerNum = this.diagram.layers.indexOf(this.getObjectLayer(objectId));
            var zIndexTable = this.diagram.layers[layerNum].zIndexTable;
            var tabelLength = Object.keys(zIndexTable).length;
            var node = this.diagram.nameTable[objectId];
            var intersectArray = [];
            var temp = this.diagram.spatialSearch.findObjects(node.wrapper.bounds);
            if (temp.length > 2) {
                temp = this.sortByZIndex(temp);
            }
            for (var _i = 0, temp_3 = temp; _i < temp_3.length; _i++) {
                var i = temp_3[_i];
                if (node.id !== i.id) {
                    var currentLayer = this.getObjectLayer(i.id).zIndex;
                    if (layerNum === currentLayer && (Number(this.diagram.nameTable[objectId].zIndex) > Number(i.zIndex)) &&
                        node.wrapper.bounds.intersects(i.wrapper.bounds)) {
                        intersectArray.push(i);
                    }
                }
            }
            if (intersectArray.length > 0) {
                var overlapObject = intersectArray[intersectArray.length - 1].zIndex;
                var currentObject = node.zIndex;
                var temp_4 = zIndexTable[overlapObject];
                //swap the nodes
                zIndexTable[overlapObject] = node.id;
                this.diagram.nameTable[zIndexTable[overlapObject]].zIndex = overlapObject;
                zIndexTable[currentObject] = intersectArray[intersectArray.length - 1].id;
                this.diagram.nameTable[zIndexTable[currentObject]].zIndex = currentObject;
                if (this.diagram.mode === 'SVG') {
                    this.moveSvgNode(objectId, zIndexTable[intersectArray[intersectArray.length - 1].zIndex]);
                    this.updateNativeNodeIndex(objectId, zIndexTable[intersectArray[intersectArray.length - 1].zIndex]);
                }
                else {
                    this.diagram.refreshCanvasLayers();
                }
            }
        }
    };
    /**   @private  */
    CommandHandler.prototype.updateNativeNodeIndex = function (nodeId, targetID) {
        var node = this.diagram.selectedItems.nodes[0] || this.diagram.getObject(targetID);
        for (var i = 0; i < this.diagram.views.length; i++) {
            if (node && (node.shape.type === 'HTML'
                || node.shape.type === 'Native')) {
                var id = node.shape.type === 'HTML' ? '_html_element' : '_content_groupElement';
                var backNode = getDiagramElement(nodeId + id, this.diagram.views[i]);
                var diagramDiv = targetID ? getDiagramElement(targetID + id, this.diagram.views[i])
                    : backNode.parentElement.firstChild;
                if (backNode.parentNode.id === diagramDiv.parentNode.id) {
                    diagramDiv.parentNode.insertBefore(backNode, diagramDiv);
                }
            }
        }
    };
    /**   @private  */
    CommandHandler.prototype.initSelectorWrapper = function () {
        var selectorModel = this.diagram.selectedItems;
        selectorModel.init(this.diagram);
        if (selectorModel.nodes.length === 1 && selectorModel.connectors.length === 0) {
            selectorModel.rotateAngle = selectorModel.nodes[0].rotateAngle;
            selectorModel.wrapper.rotateAngle = selectorModel.nodes[0].rotateAngle;
            selectorModel.wrapper.pivot = selectorModel.nodes[0].pivot;
        }
    };
    /** @private */
    CommandHandler.prototype.doRubberBandSelection = function (region) {
        this.clearSelectionRectangle();
        var selArray = [];
        var rubberArray = [];
        selArray = this.diagram.getNodesConnectors(selArray);
        if (this.diagram.selectedItems.rubberBandSelectionMode === 'CompleteIntersect') {
            rubberArray = completeRegion(region, selArray);
        }
        else {
            rubberArray = this.diagram.spatialSearch.findObjects(region);
        }
        if (rubberArray.length) {
            this.selectObjects(rubberArray, true);
        }
    };
    CommandHandler.prototype.clearSelectionRectangle = function () {
        var adornerSvg = getAdornerLayerSvg(this.diagram.element.id);
        var element = adornerSvg.getElementById(this.diagram.element.id + '_diagramAdorner_selected_region');
        if (element) {
            remove(element);
        }
    };
    /** @private */
    CommandHandler.prototype.dragConnectorEnds = function (endPoint, obj, point, segment, target, targetPortId) {
        var selectorModel;
        var connector;
        var node;
        var tx;
        var segmentPoint;
        var ty;
        var index;
        var checkBezierThumb = false;
        if (obj instanceof Selector) {
            selectorModel = obj;
            connector = selectorModel.connectors[0];
        }
        else if (obj instanceof Connector && this.diagram.currentDrawingObject) {
            this.clearSelection();
            connector = this.diagram.currentDrawingObject;
        }
        if (endPoint === 'BezierSourceThumb' || endPoint === 'BezierTargetThumb') {
            checkBezierThumb = true;
        }
        if (endPoint === 'ConnectorSourceEnd' || endPoint === 'BezierSourceThumb') {
            tx = point.x - (checkBezierThumb ? segment.bezierPoint1.x : connector.sourcePoint.x);
            ty = point.y - (checkBezierThumb ? segment.bezierPoint1.y : connector.sourcePoint.y);
            return this.dragSourceEnd(connector, tx, ty, null, point, endPoint, undefined, target, targetPortId, undefined, segment);
        }
        else {
            tx = point.x - (checkBezierThumb ? segment.bezierPoint2.x : connector.targetPoint.x);
            ty = point.y - (checkBezierThumb ? segment.bezierPoint2.y : connector.targetPoint.y);
            return this.dragTargetEnd(connector, tx, ty, null, point, endPoint, undefined, segment);
        }
    };
    /**   @private  */
    CommandHandler.prototype.getSelectedObject = function () {
        var selectormodel = this.diagram.selectedItems;
        return (selectormodel.nodes).concat(selectormodel.connectors);
    };
    /** @private */
    CommandHandler.prototype.clearSelection = function (triggerAction) {
        if (hasSelection(this.diagram)) {
            var selectormodel = this.diagram.selectedItems;
            var arrayNodes = this.getSelectedObject();
            if (this.diagram.currentSymbol) {
                this.diagram.previousSelectedObject = arrayNodes;
            }
            var arg = {
                oldValue: arrayNodes, newValue: [], cause: this.diagram.diagramActions,
                state: 'Changing', type: 'Removal', cancel: false
            };
            this.updateBlazorSelectorModel(arrayNodes, true);
            if (triggerAction) {
                if (isBlazor()) {
                    arg = this.updateSelectionChangeEventArgs(arg, [], arrayNodes);
                }
                this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
            }
            if (!arg.cancel) {
                selectormodel.offsetX = 0;
                selectormodel.offsetY = 0;
                selectormodel.width = 0;
                selectormodel.height = 0;
                selectormodel.rotateAngle = 0;
                selectormodel.nodes = [];
                selectormodel.connectors = [];
                selectormodel.wrapper = null;
                selectormodel.annotation = undefined;
                this.diagram.clearSelectorLayer();
                if (triggerAction) {
                    arg = {
                        oldValue: cloneBlazorObject(arrayNodes), newValue: [], cause: this.diagram.diagramActions,
                        state: 'Changed', type: 'Removal', cancel: false
                    };
                    arg = this.updateSelectionChangeEventArgs(arg, [], arrayNodes);
                    this.diagram.triggerEvent(DiagramEvent.selectionChange, arg);
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.clearSelectedItems = function () {
        var selectedNodes = this.diagram.selectedItems.nodes ? this.diagram.selectedItems.nodes.length : 0;
        var selectedConnectors = this.diagram.selectedItems.connectors ? this.diagram.selectedItems.connectors.length : 0;
        this.clearSelection((selectedNodes + selectedConnectors) > 0 ? true : false);
    };
    /**
     * @private
     */
    CommandHandler.prototype.removeStackHighlighter = function () {
        var adornerSvg = getAdornerLayerSvg(this.diagram.element.id);
        var highlighter = adornerSvg.getElementById(adornerSvg.id + '_stack_highlighter');
        if (highlighter) {
            highlighter.parentNode.removeChild(highlighter);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.renderStackHighlighter = function (args, target) {
        var source = this.diagram.selectedItems.nodes[0];
        var symbolDrag;
        var node;
        var selectorModel;
        if (!target) {
            var objects = this.diagram.findObjectsUnderMouse(args.position);
            target = this.diagram.findObjectUnderMouse(objects, 'Drag', true);
            if (target && !(target.isLane || target.isPhase || target.isHeader)) {
                for (var i = 0; i < objects.length; i++) {
                    var laneNode = this.diagram.nameTable[objects[i].id];
                    if (laneNode.isLane || laneNode.isPhase || laneNode.isHeader) {
                        target = laneNode;
                    }
                }
            }
        }
        if (source && target && target.isLane && source.shape && !source.shape.isPhase) {
            node = this.diagram.nameTable[target.parentId];
            if (this.diagram.currentSymbol && node.shape.type === 'SwimLane') {
                symbolDrag = true;
            }
            if ((source && !source.parentId && source.shape.type !== 'SwimLane') ||
                (source && source.parentId && this.diagram.nameTable[source.parentId] && this.diagram.nameTable[source.parentId].isLane &&
                    (source.parentId !== target.parentId && source.parentId !== target.id))) {
                selectorModel = this.diagram.selectedItems;
                var canvas = gridSelection(this.diagram, selectorModel, target.id, true);
                if (canvas) {
                    selectorModel.wrapper.children[0] = canvas;
                }
                this.diagram.renderSelector(false, true);
                selectorModel.wrapper.children[0] = selectorModel.nodes[0].wrapper;
            }
        }
        if (source && target && target.parentId && source.shape && source.shape.isPhase) {
            var node_2 = this.diagram.nameTable[target.parentId];
            if (node_2.shape.type === 'SwimLane') {
                this.diagram.selectedItems.wrapper.children[0] = this.diagram.nameTable[target.parentId].wrapper;
                this.diagram.renderSelector(false, true);
            }
        }
        if ((symbolDrag && this.diagram.currentSymbol.shape.isLane) || (source && target &&
            source.parentId && target.parentId && !source.isPhase && (source.parentId === target.parentId)
            && (source.id !== target.id) && node &&
            (node.container && (node.container.type === 'Stack' || node.container.type === 'Grid')))) {
            var canvas = void 0;
            var value = node.container.orientation === 'Vertical';
            var isVertical = node.container === 'Stack' ? value : !value;
            if (node.container.type === 'Grid' && target.isLane &&
                ((!this.diagram.currentSymbol &&
                    (node.shape.orientation === 'Horizontal' && target.rowIndex !== source.rowIndex) ||
                    (node.shape.orientation === 'Vertical' && target.columnIndex !== source.columnIndex))
                    || (this.diagram.currentSymbol &&
                        this.diagram.currentSymbol.shape.orientation === node.container.orientation))) {
                selectorModel = this.diagram.selectedItems;
                canvas = gridSelection(this.diagram, selectorModel, target.id, symbolDrag);
            }
            var wrapper = node.container.type === 'Stack' ? target.wrapper : canvas;
            if (wrapper) {
                renderStackHighlighter(wrapper, isVertical, args.position, this.diagram, false, true);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.drag = function (obj, tx, ty) {
        var tempNode;
        var elements = [];
        if (canMove(obj) && this.checkBoundaryConstraints(tx, ty, obj.wrapper.bounds) && canPageEditable(this.diagram)) {
            if (obj instanceof Node) {
                var oldValues = { offsetX: obj.offsetX, offsetY: obj.offsetY };
                obj.offsetX += tx;
                obj.offsetY += ty;
                if (obj.children && !(obj.container)) {
                    var nodes = this.getAllDescendants(obj, elements);
                    for (var i = 0; i < nodes.length; i++) {
                        tempNode = (this.diagram.nameTable[nodes[i].id]);
                        this.drag(tempNode, tx, ty);
                    }
                    this.updateInnerParentProperties(obj);
                }
                if (checkParentAsContainer(this.diagram, obj, true)) {
                    checkChildNodeInContainer(this.diagram, obj);
                }
                else {
                    if (obj && obj.shape && obj.shape.type === 'UmlClassifier') {
                        obj.wrapper.measureChildren = true;
                    }
                    this.diagram.nodePropertyChange(obj, oldValues, { offsetX: obj.offsetX, offsetY: obj.offsetY }, undefined, undefined, false);
                    obj.wrapper.measureChildren = false;
                }
                if (obj.shape.type === 'SwimLane' && !this.diagram.currentSymbol) {
                    var grid = obj.wrapper.children[0];
                    var connectors = getConnectors(this.diagram, grid, 0, true);
                    updateConnectorsProperties(connectors, this.diagram);
                }
            }
            else {
                var connector = obj;
                var oldValues = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
                var update = connector.type === 'Bezier' ? true : false;
                var hasEnds = false;
                if (!connector.sourceWrapper) {
                    this.dragSourceEnd(connector, tx, ty, true, null, '', update);
                }
                else {
                    hasEnds = true;
                }
                if (!connector.targetWrapper) {
                    this.dragTargetEnd(connector, tx, ty, true, null, '', update);
                }
                else {
                    hasEnds = true;
                }
                if (!hasEnds) {
                    this.dragControlPoint(connector, tx, ty, true);
                    var conn = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
                    this.diagram.connectorPropertyChange(connector, oldValues, conn);
                }
            }
        }
    };
    /**   @private  */
    CommandHandler.prototype.connectorSegmentChange = function (actualObject, existingInnerBounds, isRotate) {
        var tx;
        var ty;
        var segmentChange = true;
        if (existingInnerBounds.equals(existingInnerBounds, actualObject.wrapper.bounds) === false) {
            if (actualObject.outEdges.length > 0) {
                for (var k = 0; k < actualObject.outEdges.length; k++) {
                    var connector = this.diagram.nameTable[actualObject.outEdges[k]];
                    if (connector.targetID !== '') {
                        segmentChange = this.isSelected(this.diagram.nameTable[connector.targetID]) ? false : true;
                    }
                    else {
                        segmentChange = this.isSelected(this.diagram.nameTable[connector.id]) ? false : true;
                    }
                    if (connector.type === 'Orthogonal' && connector.segments && connector.segments.length > 1) {
                        if (!isRotate) {
                            if (segmentChange) {
                                switch (connector.segments[0].direction) {
                                    case 'Bottom':
                                        tx = actualObject.wrapper.bounds.bottomCenter.x - existingInnerBounds.bottomCenter.x;
                                        ty = actualObject.wrapper.bounds.bottomCenter.y - existingInnerBounds.bottomCenter.y;
                                        break;
                                    case 'Top':
                                        tx = actualObject.wrapper.bounds.topCenter.x - existingInnerBounds.topCenter.x;
                                        ty = actualObject.wrapper.bounds.topCenter.y - existingInnerBounds.topCenter.y;
                                        break;
                                    case 'Left':
                                        tx = actualObject.wrapper.bounds.middleLeft.x - existingInnerBounds.middleLeft.x;
                                        ty = actualObject.wrapper.bounds.middleLeft.y - existingInnerBounds.middleLeft.y;
                                        break;
                                    case 'Right':
                                        tx = actualObject.wrapper.bounds.middleRight.x - existingInnerBounds.middleRight.x;
                                        ty = actualObject.wrapper.bounds.middleRight.y - existingInnerBounds.middleRight.y;
                                        break;
                                }
                                this.dragSourceEnd(connector, tx, ty, true, null, 'ConnectorSourceEnd', undefined, undefined, undefined, true);
                            }
                        }
                        else {
                            var firstSegment = connector.segments[0];
                            var secondSegment = connector.segments[1];
                            var cornerPoints = swapBounds(actualObject.wrapper, actualObject.wrapper.corners, actualObject.wrapper.bounds);
                            var sourcePoint = findPoint(cornerPoints, firstSegment.direction);
                            sourcePoint = getIntersection(connector, connector.sourceWrapper, sourcePoint, { x: connector.sourceWrapper.offsetX, y: connector.sourceWrapper.offsetY }, false);
                            var source = {
                                corners: undefined, point: sourcePoint, margin: undefined, direction: firstSegment.direction
                            };
                            var target = {
                                corners: undefined, point: secondSegment.points[1], margin: undefined, direction: undefined
                            };
                            var intermediatePoints = orthoConnection2Segment(source, target);
                            firstSegment.length = Point.distancePoints(intermediatePoints[0], intermediatePoints[1]);
                            if (secondSegment.direction && secondSegment.length) {
                                secondSegment.length = Point.distancePoints(intermediatePoints[1], intermediatePoints[2]);
                            }
                        }
                    }
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.updateEndPoint = function (connector, oldChanges) {
        var conn = {
            sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint,
            sourceID: connector.sourceID ? connector.sourceID : undefined,
            targetID: connector.targetID ? connector.targetID : undefined,
            sourcePortID: connector.sourcePortID ? connector.sourcePortID : undefined,
            targetPortID: connector.targetPortID ? connector.targetPortID : undefined,
            segments: connector.segments ? connector.segments : undefined
        };
        var newValue = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
        if (connector.sourceID) {
            newValue.sourceID = connector.sourceID;
        }
        if (connector.targetID) {
            newValue.targetID = connector.targetID;
        }
        if (connector.sourcePortID) {
            newValue.sourcePortID = connector.sourcePortID;
        }
        if (connector.targetPortID) {
            newValue.targetPortID = connector.targetPortID;
        }
        if (connector.segments) {
            newValue.segments = connector.segments;
        }
        this.diagram.connectorPropertyChange(connector, oldChanges ? oldChanges : {}, newValue);
        // this.diagram.refreshDiagramLayer();
        this.diagram.updateSelector();
    };
    /** @private */
    CommandHandler.prototype.dragSourceEnd = function (obj, tx, ty, preventUpdate, point, endPoint, update, target, targetPortId, isDragSource, segment) {
        var connector = this.diagram.nameTable[obj.id];
        var oldChanges = {};
        var checkBoundaryConstraints = this.checkBoundaryConstraints(tx, ty, connector.wrapper.bounds);
        if (canDragSourceEnd(connector) && checkBoundaryConstraints
            && (endPoint !== 'BezierSourceThumb') && canPageEditable(this.diagram)) {
            oldChanges = { sourcePoint: connector.sourcePoint };
            connector.sourcePoint.x += tx;
            connector.sourcePoint.y += ty;
            if (endPoint === 'ConnectorSourceEnd' && connector.type === 'Orthogonal') {
                this.changeSegmentLength(connector, target, targetPortId, isDragSource);
            }
            if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default') {
                this.updatePathElementOffset(connector);
            }
        }
        if (connector.type === 'Bezier') {
            oldChanges = { sourcePoint: connector.sourcePoint };
            if (segment) {
                this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorSourceEnd' : endPoint, tx, ty, segment, point, !update);
            }
            else {
                for (var i = 0; i < obj.segments.length; i++) {
                    this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorSourceEnd' : endPoint, tx, ty, obj.segments[i], point, !update);
                }
            }
        }
        if (!preventUpdate) {
            this.updateEndPoint(connector, oldChanges);
        }
        this.diagram.refreshCanvasLayers();
        return checkBoundaryConstraints;
    };
    /**
     * Update Path Element offset
     */
    CommandHandler.prototype.updatePathElementOffset = function (connector) {
        connector.wrapper.children.splice(3, 1);
        var pathElement = new PathElement();
        var anglePoints = connector.intermediatePoints;
        pathElement = updatePathElement(anglePoints, connector);
        connector.wrapper.children.splice(3, 0, pathElement);
    };
    /**
     * Upadte the connector segments when change the source node
     */
    CommandHandler.prototype.changeSegmentLength = function (connector, target, targetPortId, isDragSource) {
        if (connector.segments && connector.segments[0].direction !== null
            && ((!target && connector.sourceID === '') || isDragSource)) {
            var first = connector.segments[0];
            var second = connector.segments[1];
            var node = this.diagram.nameTable[connector.sourceID];
            var secPoint = void 0;
            first.points[0] = connector.sourcePoint;
            if (first.direction === 'Top' || first.direction === 'Bottom') {
                first.points[first.points.length - 1].x = connector.sourcePoint.x;
                second.points[0].y = first.points[first.points.length - 1].y;
            }
            else {
                first.points[first.points.length - 1].y = connector.sourcePoint.y;
                second.points[0].x = first.points[first.points.length - 1].x;
            }
            if (first.direction && (first.length || first.length === 0)) {
                first.length = Point.distancePoints(first.points[0], first.points[first.points.length - 1]);
            }
            if (second.direction && (second.length || second.length === 0)) {
                second.length = Point.distancePoints(first.points[first.points.length - 1], second.points[second.points.length - 1]);
                second.direction = Point.direction(first.points[first.points.length - 1], second.points[second.points.length - 1]);
            }
            if (connector.sourcePortID !== '' && first.length < 10) {
                if (connector.segments.length > 2) {
                    var next = connector.segments[2];
                    var nextDirection = Point.direction(next.points[0], next.points[1]);
                    if (first.direction === getOppositeDirection(nextDirection)) {
                        if (first.direction === 'Right') {
                            next.points[0].x = first.points[first.points.length - 1].x = node.wrapper.corners.middleRight.x + 20;
                        }
                        else if (first.direction === 'Left') {
                            next.points[0].x = first.points[first.points.length - 1].x = node.wrapper.corners.middleLeft.x - 20;
                        }
                        else if (first.direction === 'Top') {
                            next.points[0].y = first.points[first.points.length - 1].y = node.wrapper.corners.topCenter.y - 20;
                        }
                        else {
                            next.points[0].y = first.points[first.points.length - 1].y = node.wrapper.corners.bottomCenter.y + 20;
                        }
                        if (next.direction && next.length) {
                            next.length = Point.distancePoints(next.points[0], next.points[next.points.length - 1]);
                        }
                        first.length = Point.distancePoints(first.points[0], first.points[first.points.length - 1]);
                    }
                    else if (first.direction === nextDirection && next.direction && next.length) {
                        if (first.direction === 'Top' || first.direction === 'Bottom') {
                            next.points[0] = first.points[0];
                            next.points[next.points.length - 1].x = next.points[0].x;
                        }
                        else {
                            next.points[0] = first.points[0];
                            next.points[next.points.length - 1].y = next.points[0].y;
                        }
                        next.length = Point.distancePoints(next.points[0], next.points[next.points.length - 1]);
                        connector.segments.splice(0, 2);
                    }
                    else {
                        first.length = 20;
                    }
                }
                else {
                    first.length = 20;
                }
            }
            else if (first.length < 1) {
                if (connector.sourceID !== '') {
                    if (second.direction === 'Right') {
                        secPoint = node.wrapper.corners.middleRight;
                        second.points[second.points.length - 1].y = secPoint.y;
                    }
                    else if (second.direction === 'Left') {
                        secPoint = node.wrapper.corners.middleLeft;
                        second.points[second.points.length - 1].y = secPoint.y;
                    }
                    else if (second.direction === 'Top') {
                        secPoint = node.wrapper.corners.topCenter;
                        second.points[second.points.length - 1].x = secPoint.x;
                    }
                    else {
                        secPoint = node.wrapper.corners.bottomCenter;
                        second.points[second.points.length - 1].x = secPoint.x;
                    }
                    second.length = Point.distancePoints(secPoint, second.points[second.points.length - 1]);
                    if (connector.segments.length > 2) {
                        var next = connector.segments[2];
                        if (next.direction && next.length) {
                            next.length = Point.distancePoints(second.points[second.points.length - 1], next.points[next.points.length - 1]);
                        }
                    }
                    connector.segments.splice(0, 1);
                }
                else {
                    connector.segments.splice(0, 1);
                }
            }
        }
        else {
            if (target && !targetPortId && connector.sourceID !== target.id &&
                connector.segments && connector.segments[0].direction !== null && target && target instanceof Node) {
                this.changeSourceEndToNode(connector, target);
            }
            if (target && targetPortId && connector.sourcePortID !== targetPortId &&
                connector.segments && connector.segments[0].direction !== null && target && target instanceof Node) {
                this.changeSourceEndToPort(connector, target, targetPortId);
            }
        }
    };
    /**
     * Change the connector endPoint to port
     */
    CommandHandler.prototype.changeSourceEndToPort = function (connector, target, targetPortId) {
        var port = this.diagram.getWrapper(target.wrapper, targetPortId);
        var point = { x: port.offsetX, y: port.offsetY };
        var direction = getPortDirection(point, cornersPointsBeforeRotation(target.wrapper), target.wrapper.bounds, false);
        var firstSegment = connector.segments[0];
        var secondSegment = connector.segments[1];
        if (firstSegment.direction !== direction) {
            var segments = [];
            var segValues = {};
            if (firstSegment.direction === getOppositeDirection(direction)) {
                segValues = {};
                var segValues1 = void 0;
                if (direction === 'Top' || direction === 'Bottom') {
                    segValues1 = (direction === 'Top') ? {
                        type: 'Orthogonal', isTerminal: true, direction: direction,
                        length: Math.abs(firstSegment.points[0].y - point.y)
                    } :
                        {
                            type: 'Orthogonal', isTerminal: true, direction: direction,
                            length: Math.abs(point.y - firstSegment.points[0].y)
                        };
                    segValues = (firstSegment.points[0].x > point.x) ?
                        { type: 'Orthogonal', isTerminal: true, direction: 'Right', length: (firstSegment.points[0].x - point.x) } :
                        { type: 'Orthogonal', isTerminal: true, direction: 'Left', length: (point.x - firstSegment.points[0].x) };
                }
                else {
                    segValues1 = (direction === 'Right') ? {
                        type: 'Orthogonal', isTerminal: true, direction: direction,
                        length: Math.abs(firstSegment.points[0].x - point.x)
                    } :
                        {
                            type: 'Orthogonal', isTerminal: true, direction: direction,
                            length: Math.abs(point.x - firstSegment.points[0].x)
                        };
                    segValues = (firstSegment.points[0].y > point.y) ?
                        { type: 'Orthogonal', direction: 'Top', isTerminal: true, length: (firstSegment.points[0].y - point.y) } :
                        { type: 'Orthogonal', direction: 'Bottom', isTerminal: true, length: (point.y - firstSegment.points[0].y) };
                }
                segments.push(new OrthogonalSegment(connector, 'segments', segValues1, true));
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
            }
            else {
                segValues = { type: 'Orthogonal', direction: direction, length: 20, isTerminal: true };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
            }
            if (firstSegment.direction !== getOppositeDirection(direction)) {
                if (direction === 'Top' || direction === 'Bottom') {
                    firstSegment.points[0].x = point.x;
                    firstSegment.points[0].y = firstSegment.points[firstSegment.points.length - 1].y = (direction === 'Top') ?
                        point.y - 20 : point.y + 20;
                }
                else {
                    firstSegment.points[0].y = point.y;
                    firstSegment.points[0].x = firstSegment.points[firstSegment.points.length - 1].x = (direction === 'Right') ?
                        point.x + 20 : point.x - 20;
                }
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                secondSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], secondSegment.points[secondSegment.points.length - 1]);
            }
            connector.segments = segments.concat(connector.segments);
        }
        else {
            firstSegment.points[0] = point;
            if (direction === 'Top' || direction === 'Bottom') {
                firstSegment.points[firstSegment.points.length - 1].x = point.x;
            }
            else {
                firstSegment.points[firstSegment.points.length - 1].y = point.y;
            }
            firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
            secondSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], secondSegment.points[secondSegment.points.length - 1]);
        }
    };
    /**
     * @private
     * Remove terinal segment in initial
     */
    CommandHandler.prototype.removeTerminalSegment = function (connector, changeTerminal) {
        for (var i = 0; i < connector.segments.length - 2; i++) {
            var segment = connector.segments[0];
            if (segment.isTerminal) {
                if (changeTerminal) {
                    segment.isTerminal = false;
                }
                else {
                    connector.segments.splice(i, 1);
                    i--;
                }
            }
        }
    };
    /**
     * Change the connector endPoint from point to node
     */
    CommandHandler.prototype.changeSourceEndToNode = function (connector, target) {
        this.removeTerminalSegment(connector);
        var sourceWrapper = target.wrapper.children[0].corners;
        var sourcePoint;
        var sourcePoint2;
        var firstSegment = connector.segments[0];
        var nextSegment = connector.segments[1];
        var segments = [];
        if (firstSegment.direction === 'Right' || firstSegment.direction === 'Left') {
            sourcePoint = (firstSegment.direction === 'Left') ? sourceWrapper.middleLeft : sourceWrapper.middleRight;
            if (firstSegment.length > sourceWrapper.width || ((firstSegment.direction === 'Left' &&
                sourcePoint.x >= firstSegment.points[0].x) || (firstSegment.direction === 'Right' &&
                sourcePoint.x <= firstSegment.points[0].x))) {
                firstSegment.points[0].y = firstSegment.points[firstSegment.points.length - 1].y = sourcePoint.y;
                firstSegment.points[0].x = sourcePoint.x;
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                nextSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], nextSegment.points[nextSegment.points.length - 1]);
            }
            else {
                var direction = void 0;
                if (nextSegment.direction) {
                    direction = nextSegment.direction;
                }
                else {
                    direction = Point.direction(nextSegment.points[0], nextSegment.points[nextSegment.points.length - 1]);
                }
                sourcePoint2 = (direction === 'Bottom') ? sourceWrapper.bottomCenter : sourceWrapper.topCenter;
                if (nextSegment.length && nextSegment.direction) {
                    nextSegment.length =
                        (direction === 'Top') ? firstSegment.points[firstSegment.points.length - 1].y - (sourcePoint2.y + 20) :
                            (sourcePoint2.y + 20) - firstSegment.points[firstSegment.points.length - 1].y;
                }
                firstSegment.length = firstSegment.points[firstSegment.points.length - 1].x - sourcePoint2.x;
                firstSegment.direction = (firstSegment.length > 0) ? 'Right' : 'Left';
                var segValues = { type: 'Orthogonal', direction: direction, length: 20 };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
                connector.segments = segments.concat(connector.segments);
            }
        }
        else {
            sourcePoint = (firstSegment.direction === 'Bottom') ? sourceWrapper.bottomCenter : sourceWrapper.topCenter;
            if (firstSegment.length > sourceWrapper.height || ((firstSegment.direction === 'Top' &&
                sourcePoint.y >= firstSegment.points[0].y) ||
                (firstSegment.direction === 'Bottom' && sourcePoint.y <= firstSegment.points[0].y))) {
                firstSegment.points[0].x = firstSegment.points[firstSegment.points.length - 1].x = sourcePoint.x;
                firstSegment.points[0].y = sourcePoint.y;
                firstSegment.length = Point.distancePoints(firstSegment.points[0], firstSegment.points[firstSegment.points.length - 1]);
                nextSegment.length = Point.distancePoints(firstSegment.points[firstSegment.points.length - 1], nextSegment.points[nextSegment.points.length - 1]);
            }
            else {
                sourcePoint2 = (nextSegment.direction === 'Left') ? sourceWrapper.middleLeft : sourceWrapper.middleRight;
                var direction = void 0;
                if (nextSegment.direction) {
                    direction = nextSegment.direction;
                }
                else {
                    direction = Point.direction(nextSegment.points[0], nextSegment.points[nextSegment.points.length - 1]);
                }
                if (nextSegment.length && nextSegment.direction) {
                    nextSegment.length =
                        (direction === 'Left') ? firstSegment.points[firstSegment.points.length - 1].x - (sourcePoint2.x + 20) :
                            (sourcePoint2.x + 20) - firstSegment.points[firstSegment.points.length - 1].x;
                }
                firstSegment.length = firstSegment.points[firstSegment.points.length - 1].y - sourcePoint2.y;
                firstSegment.direction = (firstSegment.length > 0) ? 'Bottom' : 'Top';
                var segValues = { type: 'Orthogonal', direction: direction, length: 20 };
                segments.push(new OrthogonalSegment(connector, 'segments', segValues, true));
                connector.segments = segments.concat(connector.segments);
            }
        }
    };
    /**
     * Translate the bezier points during the interaction
     */
    CommandHandler.prototype.translateBezierPoints = function (connector, value, tx, ty, seg, point, update) {
        var index = (connector.segments.indexOf(seg));
        var segment = connector.segments[index];
        if (segment) {
            if (value === 'BezierSourceThumb' && (segment.vector1.angle || segment.vector1.distance)) {
                segment.vector1 = {
                    distance: connector.distance(connector.sourcePoint, point),
                    angle: Point.findAngle(connector.sourcePoint, point),
                };
            }
            else if (value === 'BezierTargetThumb' && (segment.vector2.angle || segment.vector2.distance)) {
                segment.vector2 = {
                    distance: connector.distance(connector.targetPoint, point),
                    angle: Point.findAngle(connector.targetPoint, point),
                };
            }
            else if ((value === 'ConnectorSourceEnd' && !connector.sourceID || value === 'ConnectorTargetEnd' && !connector.targetID)
                && update && isEmptyVector(segment.vector1) && isEmptyVector(segment.vector2)) {
                if (Point.isEmptyPoint(segment.point1)) {
                    segment.bezierPoint1 = getBezierPoints(connector.sourcePoint, connector.targetPoint);
                }
                if (Point.isEmptyPoint(segment.point2)) {
                    segment.bezierPoint2 = getBezierPoints(connector.targetPoint, connector.sourcePoint);
                }
            }
            else if (value === 'BezierSourceThumb' || (value === 'ConnectorSourceEnd' && !update && isEmptyVector(segment.vector1))) {
                segment.bezierPoint1.x += tx;
                segment.bezierPoint1.y += ty;
                if ((!Point.isEmptyPoint(segment.point1)) || (update)) {
                    segment.point1 = { x: segment.bezierPoint1.x, y: segment.bezierPoint1.y };
                }
            }
            else if (value === 'BezierTargetThumb' || (value === 'ConnectorTargetEnd' && !update && isEmptyVector(segment.vector2))) {
                segment.bezierPoint2.x += tx;
                segment.bezierPoint2.y += ty;
                if ((!Point.isEmptyPoint(segment.point2)) || (update)) {
                    segment.point2 = { x: segment.bezierPoint2.x, y: segment.bezierPoint2.y };
                }
            }
        }
    };
    /** @private */
    CommandHandler.prototype.dragTargetEnd = function (obj, tx, ty, preventUpdate, point, endPoint, update, segment) {
        var connector = this.diagram.nameTable[obj.id];
        var oldChanges;
        var boundaryConstraints = this.checkBoundaryConstraints(tx, ty, connector.wrapper.bounds);
        if (canDragTargetEnd(connector) && endPoint !== 'BezierTargetThumb'
            && boundaryConstraints && canPageEditable(this.diagram)) {
            oldChanges = { targetPoint: connector.targetPoint };
            connector.targetPoint.x += tx;
            connector.targetPoint.y += ty;
            if (endPoint === 'ConnectorTargetEnd' && connector.type === 'Orthogonal' &&
                connector.segments && connector.segments.length > 0) {
                var prev = connector.segments[connector.segments.length - 2];
                if (prev && connector.segments[connector.segments.length - 1].points.length === 2) {
                    if (prev.direction === 'Left' || prev.direction === 'Right') {
                        prev.points[prev.points.length - 1].x = connector.targetPoint.x;
                    }
                    else {
                        prev.points[prev.points.length - 1].y = connector.targetPoint.y;
                    }
                    prev.length = Point.distancePoints(prev.points[0], prev.points[prev.points.length - 1]);
                    prev.direction = Point.direction(prev.points[0], prev.points[prev.points.length - 1]);
                }
            }
            if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default') {
                this.updatePathElementOffset(connector);
            }
        }
        if (connector.type === 'Bezier') {
            oldChanges = { targetPoint: connector.targetPoint };
            if (segment) {
                this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorTargetEnd' : endPoint, tx, ty, segment, point, !update);
            }
            else {
                for (var i = 0; i < obj.segments.length; i++) {
                    this.translateBezierPoints(obj, (endPoint === '') ? 'ConnectorTargetEnd' : endPoint, tx, ty, obj.segments[i], point, !update);
                }
            }
        }
        if (!preventUpdate) {
            this.updateEndPoint(connector, oldChanges);
        }
        this.diagram.refreshCanvasLayers();
        return boundaryConstraints;
    };
    /** @private */
    CommandHandler.prototype.dragControlPoint = function (obj, tx, ty, preventUpdate, segmentNumber) {
        var connector = this.diagram.nameTable[obj.id];
        if ((connector.type === 'Straight' || connector.type === 'Bezier') && connector.segments.length > 0) {
            if (segmentNumber !== undefined && connector.segments[segmentNumber]) {
                connector.segments[segmentNumber].point.x += tx;
                connector.segments[segmentNumber].point.y += ty;
            }
            else {
                for (var i = 0; i < connector.segments.length - 1; i++) {
                    connector.segments[i].point.x += tx;
                    connector.segments[i].point.y += ty;
                }
            }
            if (!preventUpdate) {
                this.updateEndPoint(connector);
            }
        }
        return true;
    };
    /** @private */
    CommandHandler.prototype.rotateObjects = function (parent, objects, angle, pivot, includeParent) {
        pivot = pivot || {};
        var matrix = identityMatrix();
        rotateMatrix(matrix, angle, pivot.x, pivot.y);
        var oldValues;
        for (var _i = 0, objects_2 = objects; _i < objects_2.length; _i++) {
            var obj = objects_2[_i];
            if (obj instanceof Node) {
                if (canRotate(obj) && canPageEditable(this.diagram)) {
                    if (includeParent !== false || parent !== obj) {
                        oldValues = { rotateAngle: obj.rotateAngle };
                        obj.rotateAngle += angle;
                        obj.rotateAngle = (obj.rotateAngle + 360) % 360;
                        var newOffset = transformPointByMatrix(matrix, { x: obj.offsetX, y: obj.offsetY });
                        obj.offsetX = newOffset.x;
                        obj.offsetY = newOffset.y;
                        this.diagram.nodePropertyChange(obj, {}, { offsetX: obj.offsetX, offsetY: obj.offsetY, rotateAngle: obj.rotateAngle });
                    }
                    if (obj.processId) {
                        var parent_1 = this.diagram.nameTable[obj.processId];
                        var bound = this.diagram.bpmnModule.getChildrenBound(parent_1, obj.id, this.diagram);
                        this.diagram.bpmnModule.updateSubProcessess(bound, obj, this.diagram);
                    }
                    if (obj.children && obj.children.length && !obj.container) {
                        this.getChildren(obj, objects);
                    }
                }
            }
            else {
                this.rotatePoints(obj, angle, pivot || { x: obj.wrapper.offsetX, y: obj.wrapper.offsetY });
            }
            this.diagram.updateDiagramObject(obj);
        }
        this.diagram.refreshCanvasLayers();
        this.diagram.updateSelector();
    };
    /** @private */
    CommandHandler.prototype.snapConnectorEnd = function (currentPosition) {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToLines)
            && this.snappingModule) {
            this.diagram.snappingModule.snapConnectorEnd(currentPosition);
        }
        return currentPosition;
    };
    /**   @private  */
    CommandHandler.prototype.snapAngle = function (angle) {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToLines)
            && this.snappingModule) {
            return this.snappingModule.snapAngle(this.diagram, angle);
        }
        else {
            return 0;
        }
    };
    /**   @private  */
    CommandHandler.prototype.rotatePoints = function (conn, angle, pivot) {
        if (!conn.sourceWrapper || !conn.targetWrapper) {
            var matrix = identityMatrix();
            rotateMatrix(matrix, angle, pivot.x, pivot.y);
            conn.sourcePoint = transformPointByMatrix(matrix, conn.sourcePoint);
            conn.targetPoint = transformPointByMatrix(matrix, conn.targetPoint);
            if (conn.shape.type === 'Bpmn' && conn.shape.sequence === 'Default') {
                this.updatePathElementOffset(conn);
            }
            var newProp = { sourcePoint: conn.sourcePoint, targetPoint: conn.targetPoint };
            this.diagram.connectorPropertyChange(conn, {}, newProp);
        }
    };
    CommandHandler.prototype.updateInnerParentProperties = function (tempNode) {
        var elements = [];
        var protect = 'isProtectedOnChange';
        var protectChange = this.diagram[protect];
        this.diagram.protectPropertyChange(true);
        var innerParents = this.getAllDescendants(tempNode, elements, false, true);
        for (var i = 0; i < innerParents.length; i++) {
            var obj = this.diagram.nameTable[innerParents[i].id];
            obj.offsetX = obj.wrapper.offsetX;
            obj.offsetY = obj.wrapper.offsetY;
            obj.width = obj.wrapper.width;
            obj.height = obj.wrapper.height;
        }
        this.diagram.protectPropertyChange(protectChange);
    };
    /** @private */
    CommandHandler.prototype.scale = function (obj, sw, sh, pivot, refObject) {
        var node = this.diagram.nameTable[obj.id];
        var tempNode = node;
        var elements = [];
        var element = node.wrapper;
        if (!refObject) {
            refObject = obj;
        }
        var refWrapper = refObject.wrapper;
        var x = refWrapper.offsetX - refWrapper.actualSize.width * refWrapper.pivot.x;
        var y = refWrapper.offsetY - refWrapper.actualSize.height * refWrapper.pivot.y;
        var refPoint = getPoint(x, y, refWrapper.actualSize.width, refWrapper.actualSize.height, refWrapper.rotateAngle, refWrapper.offsetX, refWrapper.offsetY, pivot);
        if (element.actualSize.width !== undefined && element.actualSize.height !== undefined && canPageEditable(this.diagram)) {
            if (tempNode.children && !(tempNode.container)) {
                var nodes = this.getAllDescendants(tempNode, elements);
                for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                    var temp = nodes_1[_i];
                    this.scaleObject(sw, sh, refPoint, temp, element, refObject);
                }
                obj.wrapper.measure(new Size());
                obj.wrapper.arrange(obj.wrapper.desiredSize);
                this.diagram.updateGroupOffset(node);
                this.updateInnerParentProperties(tempNode);
            }
            else {
                this.scaleObject(sw, sh, refPoint, node, element, refObject);
            }
            var bounds = getBounds(obj.wrapper);
            var checkBoundaryConstraints = this.checkBoundaryConstraints(undefined, undefined, bounds);
            if (!checkBoundaryConstraints) {
                this.scale(obj, 1 / sw, 1 / sh, pivot);
                return false;
            }
            this.diagram.updateDiagramObject(obj);
        }
        return true;
    };
    /** @private */
    CommandHandler.prototype.getAllDescendants = function (node, nodes, includeParent, innerParent) {
        var temp = node;
        var parentNodes = [];
        for (var i = 0; i < temp.children.length; i++) {
            node = (this.diagram.nameTable[temp.children[i]]);
            if (node) {
                if (!node.children) {
                    nodes.push(node);
                }
                else {
                    if (includeParent) {
                        nodes.push(node);
                    }
                    if (innerParent) {
                        parentNodes.push(node);
                    }
                    nodes = this.getAllDescendants(node, nodes);
                }
            }
        }
        return (innerParent) ? parentNodes : nodes;
    };
    /**   @private  */
    CommandHandler.prototype.getChildren = function (node, nodes) {
        var temp = node;
        if (node.children) {
            for (var i = 0; i < temp.children.length; i++) {
                node = (this.diagram.nameTable[temp.children[i]]);
                nodes.push(node);
            }
        }
        return nodes;
    };
    /** @private */
    CommandHandler.prototype.cloneChild = function (id) {
        var node = this.diagram.nameTable[id];
        return node;
    };
    /** @private */
    CommandHandler.prototype.scaleObject = function (sw, sh, pivot, obj, element, refObject) {
        sw = sw < 0 ? 1 : sw;
        sh = sh < 0 ? 1 : sh;
        var process;
        var oldValues = {};
        if (sw !== 1 || sh !== 1) {
            var width = void 0;
            var height = void 0;
            if (obj instanceof Node) {
                var node = obj;
                var isResize = void 0;
                var bound = void 0;
                oldValues = {
                    width: obj.wrapper.actualSize.width, height: obj.wrapper.actualSize.height,
                    offsetX: obj.wrapper.offsetX, offsetY: obj.wrapper.offsetY,
                    margin: { top: node.margin.top, left: node.margin.left }
                };
                if (node.shape.type === 'Bpmn' && node.shape.activity.subProcess.processes
                    && node.shape.activity.subProcess.processes.length > 0) {
                    bound = this.diagram.bpmnModule.getChildrenBound(node, node.id, this.diagram);
                    isResize = node.wrapper.bounds.containsRect(bound);
                }
                width = node.wrapper.actualSize.width * sw;
                height = node.wrapper.actualSize.height * sh;
                if (node.maxWidth !== undefined && node.maxWidth !== 0) {
                    width = Math.min(node.maxWidth, width);
                }
                if (node.minWidth !== undefined && node.minWidth !== 0) {
                    width = Math.max(node.minWidth, width);
                }
                if (node.maxHeight !== undefined && node.maxHeight !== 0) {
                    height = Math.min(node.maxHeight, height);
                }
                if (node.minHeight !== undefined && node.minHeight !== 0) {
                    height = Math.max(node.minHeight, height);
                }
                if (isResize) {
                    width = Math.max(width, (bound.right - node.wrapper.bounds.x));
                    height = Math.max(height, (bound.bottom - node.wrapper.bounds.y));
                }
                sw = width / node.actualSize.width;
                sh = height / node.actualSize.height;
            }
            var matrix = identityMatrix();
            var refWrapper = void 0;
            if (!refObject) {
                refObject = obj;
            }
            refWrapper = refObject.wrapper;
            rotateMatrix(matrix, -refWrapper.rotateAngle, pivot.x, pivot.y);
            scaleMatrix(matrix, sw, sh, pivot.x, pivot.y);
            rotateMatrix(matrix, refWrapper.rotateAngle, pivot.x, pivot.y);
            if (obj instanceof Node) {
                var node = obj;
                var left = void 0;
                var top_1;
                var newPosition = transformPointByMatrix(matrix, { x: node.wrapper.offsetX, y: node.wrapper.offsetY });
                var oldleft = node.wrapper.offsetX - node.wrapper.actualSize.width * node.pivot.x;
                var oldtop = node.wrapper.offsetY - node.wrapper.actualSize.height * node.pivot.y;
                if (width > 0) {
                    if (node.processId) {
                        var parent_2 = this.diagram.nameTable[node.processId];
                        if (!parent_2.maxWidth || ((node.margin.left + width) < parent_2.maxWidth)) {
                            node.width = width;
                            node.offsetX = newPosition.x;
                        }
                    }
                    else {
                        node.width = width;
                        node.offsetX = newPosition.x;
                    }
                }
                if (height > 0) {
                    if (node.processId) {
                        var parent_3 = this.diagram.nameTable[node.processId];
                        if (!parent_3.maxHeight || ((node.margin.top + height) < parent_3.maxHeight)) {
                            node.height = height;
                            node.offsetY = newPosition.y;
                        }
                    }
                    else {
                        node.height = height;
                        node.offsetY = newPosition.y;
                    }
                }
                left = node.wrapper.offsetX - node.wrapper.actualSize.width * node.pivot.x;
                top_1 = node.wrapper.offsetY - node.wrapper.actualSize.height * node.pivot.y;
                var parent_4 = this.diagram.nameTable[node.processId];
                if (parent_4 && ((node.margin.top + (top_1 - oldtop)) <= 0 ||
                    (node.margin.left + (left - oldleft) <= 0))) {
                    this.diagram.nodePropertyChange(obj, {}, {
                        margin: { top: node.margin.top, left: node.margin.left }
                    });
                }
                else {
                    if (checkParentAsContainer(this.diagram, obj, true)) {
                        checkChildNodeInContainer(this.diagram, obj);
                    }
                    else {
                        this.diagram.nodePropertyChange(obj, oldValues, {
                            width: node.width, height: node.height, offsetX: node.offsetX, offsetY: node.offsetY,
                            margin: { top: node.margin.top + (top_1 - oldtop), left: node.margin.left + (left - oldleft) }
                        });
                    }
                }
            }
            else {
                var connector = obj;
                var oldValues_1 = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
                if (!connector.sourceWrapper || !connector.targetWrapper) {
                    this.scaleConnector(connector, matrix, oldValues_1);
                }
            }
            var parentNode = this.diagram.nameTable[obj.processId];
            if (parentNode) {
                var parent_5 = parentNode.wrapper.bounds;
                var child = obj.wrapper.bounds;
                var bound = this.diagram.bpmnModule.getChildrenBound(parentNode, obj.id, this.diagram);
                this.diagram.bpmnModule.updateSubProcessess(bound, obj, this.diagram);
            }
        }
    };
    CommandHandler.prototype.scaleConnector = function (connector, matrix, oldValues) {
        connector.sourcePoint = transformPointByMatrix(matrix, connector.sourcePoint);
        connector.targetPoint = transformPointByMatrix(matrix, connector.targetPoint);
        if (connector.shape.type === 'Bpmn' && connector.shape.sequence === 'Default') {
            this.updatePathElementOffset(connector);
        }
        var newProp = { sourcePoint: connector.sourcePoint, targetPoint: connector.targetPoint };
        this.diagram.connectorPropertyChange(connector, oldValues, newProp);
    };
    /** @private */
    CommandHandler.prototype.portDrag = function (obj, portElement, tx, ty) {
        var oldValues;
        var changedvalues;
        var port = this.findTarget(portElement, obj);
        var bounds = getBounds(obj.wrapper);
        if (port && canDrag(port, this.diagram)) {
            oldValues = this.getPortChanges(obj, port);
            port.offset.x += (tx / bounds.width);
            port.offset.y += (ty / bounds.height);
            changedvalues = this.getPortChanges(obj, port);
            this.diagram.nodePropertyChange(obj, oldValues, changedvalues);
            this.diagram.updateDiagramObject(obj);
        }
    };
    /** @private */
    CommandHandler.prototype.labelDrag = function (obj, textElement, tx, ty) {
        var oldValues;
        var changedvalues;
        var label;
        label = this.findTarget(textElement, obj);
        var bounds = cornersPointsBeforeRotation(obj.wrapper);
        oldValues = this.getAnnotationChanges(obj, label);
        if (label instanceof ShapeAnnotation) {
            label.offset.x += (tx / bounds.width);
            label.offset.y += (ty / bounds.height);
        }
        else {
            this.updatePathAnnotationOffset(obj, label, tx, ty);
            if (label instanceof PathAnnotation) {
                label.alignment = 'Center';
            }
        }
        changedvalues = this.getAnnotationChanges(obj, label);
        if (obj instanceof Node) {
            this.diagram.nodePropertyChange(obj, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(obj, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(obj);
        if (!isSelected(this.diagram, label, false, textElement)) {
            this.labelSelect(obj, textElement);
        }
    };
    CommandHandler.prototype.updatePathAnnotationOffset = function (object, label, tx, ty, newPosition, size) {
        var textWrapper = this.diagram.getWrapper(object.wrapper, label.id);
        var offsetX = textWrapper.offsetX;
        var offsetY = textWrapper.offsetY;
        var offset;
        var intermediatePoints = object.intermediatePoints;
        var prev;
        var pointLength = 0;
        var totalLength = 0;
        var intersectingOffset;
        var currentPosition = (newPosition) ? newPosition : { x: offsetX + tx, y: offsetY + ty };
        var intersetingPts = this.getInterceptWithSegment(currentPosition, intermediatePoints);
        var newOffset = intermediatePoints[intermediatePoints.length - 1];
        totalLength = Point.getLengthFromListOfPoints(intermediatePoints);
        if (intersetingPts.length > 0) {
            if (label.dragLimit.top || label.dragLimit.bottom || label.dragLimit.left || label.dragLimit.right) {
                var minDistance = { minDistance: null };
                newOffset = this.getRelativeOffset(currentPosition, intermediatePoints, minDistance);
                var distance = { minDistance: null };
                intersectingOffset = this.getRelativeOffset(currentPosition, intersetingPts, distance);
                if (minDistance != null && distance.minDistance < minDistance.minDistance) {
                    newOffset = intersectingOffset;
                }
                else {
                    var connectorOffset = getOffsetOfConnector(object.intermediatePoints, label, object.wrapper.bounds);
                    newOffset = connectorOffset.point;
                }
            }
            else {
                intersectingOffset = intersetingPts[intersetingPts.length - 1];
                newOffset = intersectingOffset;
            }
            if (newOffset) {
                var p = void 0;
                var bounds = void 0;
                for (p = 0; p < intermediatePoints.length; p++) {
                    if (prev != null) {
                        bounds = Rect.toBounds([prev, intermediatePoints[p]]);
                        if (bounds.containsPoint(newOffset)) {
                            pointLength += Point.findLength(prev, newOffset);
                            break;
                        }
                        else {
                            pointLength += Point.findLength(prev, intermediatePoints[p]);
                        }
                    }
                    prev = intermediatePoints[p];
                }
                offset = { x: pointLength / totalLength, y: 0 };
            }
            this.updateLabelMargin(object, label, offset, currentPosition, size, tx, ty);
        }
        else {
            this.updateLabelMargin(object, label, null, currentPosition, size, tx, ty);
        }
    };
    CommandHandler.prototype.getRelativeOffset = function (currentPosition, points, minDistance) {
        var newOffset;
        var distance;
        var pt;
        var i;
        for (i = 0; i < points.length; i++) {
            pt = points[i];
            distance = Math.round(Math.sqrt(Math.pow((currentPosition.x - pt.x), 2) +
                Math.pow((currentPosition.y - pt.y), 2)));
            if (minDistance.minDistance === null ||
                Math.min(Math.abs(minDistance.minDistance), Math.abs(distance)) === Math.abs(distance)) {
                newOffset = pt;
                minDistance.minDistance = distance;
            }
        }
        return newOffset;
    };
    ;
    CommandHandler.prototype.dragLimitValue = function (label, point, tempPt, contentDimension) {
        var x = false;
        var y = false;
        if ((tempPt.x >= (point.x - label.dragLimit.left - (contentDimension.width / 2))) &&
            (tempPt.x <= point.x + label.dragLimit.right + (contentDimension.width / 2))) {
            x = true;
        }
        if ((tempPt.y >= (point.y - label.dragLimit.top - (contentDimension.height / 2))) &&
            (tempPt.y <= point.y + label.dragLimit.bottom + (contentDimension.height / 2))) {
            y = true;
        }
        return { x: x, y: y };
    };
    ;
    CommandHandler.prototype.updateLabelMargin = function (node, label, offset, tempPt, size, tx, ty) {
        offset = offset ? offset : { x: label.offset, y: 0 };
        if (label && offset && offset.x > 0 && offset.x < 1) {
            var point = void 0;
            var length_1 = Point.getLengthFromListOfPoints(node.intermediatePoints);
            point = this.getPointAtLength(length_1 * offset.x, node.intermediatePoints, 0);
            var curZoomfactor = this.diagram.scrollSettings.currentZoom;
            var dragLimit = label.dragLimit;
            if (dragLimit.top || dragLimit.bottom || dragLimit.left || dragLimit.right) {
                var labelBounds = this.diagram.getWrapper(node.wrapper, label.id);
                var contentDimension = new Rect(0, 0, 0, 0);
                var annotationWrtapper = this.diagram.getWrapper(node.wrapper, label.id);
                contentDimension.x = ((annotationWrtapper).offsetX / curZoomfactor) + tx;
                contentDimension.y = (annotationWrtapper.offsetY / curZoomfactor) + ty;
                contentDimension.width = annotationWrtapper.bounds.width / curZoomfactor;
                contentDimension.height = annotationWrtapper.bounds.height / curZoomfactor;
                var draggableBounds = new Rect(point.x - (dragLimit.left || 0) - contentDimension.width / 2, point.y - (dragLimit.top || 0) - contentDimension.height / 2, (dragLimit.left || 0) + (dragLimit.right || 0) + contentDimension.width, (dragLimit.top || 0) + (dragLimit.bottom || 0) + contentDimension.height);
                if (draggableBounds.containsPoint(tempPt)) {
                    tempPt = tempPt;
                }
                else {
                    var lineIntersects = void 0;
                    var line1 = [point, tempPt];
                    lineIntersects = this.boundsInterSects(line1, draggableBounds, false);
                    for (var _i = 0, lineIntersects_1 = lineIntersects; _i < lineIntersects_1.length; _i++) {
                        var i = lineIntersects_1[_i];
                        var ptt = i;
                        tempPt = ptt;
                    }
                }
                var cursorLimit = this.dragLimitValue(label, point, tempPt, contentDimension);
                label.margin = {
                    left: cursorLimit.x ? tempPt.x - point.x : label.margin.left,
                    top: cursorLimit.y ? tempPt.y - point.y : label.margin.top, right: 0, bottom: 0
                };
            }
            else {
                label.margin = { left: tempPt.x - point.x, top: tempPt.y - point.y, right: 0, bottom: 0 };
            }
            label.offset = offset.x;
            if (size) {
                label.width = size.width;
                label.height = size.height;
            }
        }
    };
    CommandHandler.prototype.boundsInterSects = function (polyLine, bounds, self) {
        var intersects;
        if (bounds) {
            var polyLine2 = [
                { x: bounds.x, y: bounds.y },
                { x: bounds.x + bounds.width, y: bounds.y },
                { x: bounds.x + bounds.width, y: bounds.y + bounds.height },
                { x: bounds.x, y: bounds.y + bounds.height },
                { x: bounds.x, y: bounds.y }
            ];
            intersects = this.intersect(polyLine, polyLine2, self);
        }
        return intersects;
    };
    ;
    CommandHandler.prototype.intersect = function (polyLine1, polyLine2, self) {
        var intersect = [];
        for (var i = 0; i < polyLine1.length - 1; i++) {
            for (var j = 0; j < polyLine2.length - 1; j++) {
                var p = intersect2(polyLine1[i], polyLine1[i + 1], polyLine2[j], polyLine2[j + 1]);
                if (p.x !== 0 && p.y !== 0) {
                    intersect.push(p);
                }
            }
        }
        return intersect;
    };
    ;
    CommandHandler.prototype.getPointAtLength = function (length, points, angle) {
        angle = 0;
        var run = 0;
        var pre;
        var found = { x: 0, y: 0 };
        var pt;
        for (var i = 0; i < points.length; i++) {
            pt = points[i];
            if (!pre) {
                pre = pt;
                continue;
            }
            else {
                var l = Point.findLength(pre, pt);
                var r = void 0;
                var deg = void 0;
                var x = void 0;
                var y = void 0;
                if (run + l >= length) {
                    r = length - run;
                    deg = Point.findAngle(pre, pt);
                    x = r * Math.cos(deg * Math.PI / 180);
                    y = r * Math.sin(deg * Math.PI / 180);
                    found = { x: pre.x + x, y: pre.y + y };
                    angle = deg;
                    break;
                }
                else {
                    run += l;
                }
            }
            pre = pt;
        }
        return found;
    };
    CommandHandler.prototype.getInterceptWithSegment = function (currentPosition, conPoints) {
        var intercepts = [];
        var imgLine = [];
        var segemnt = [];
        var tarAngle;
        var srcAngle;
        var maxLength;
        maxLength = Point.findLength({ x: 0, y: 0 }, { x: this.diagram.scroller.viewPortWidth, y: this.diagram.scroller.viewPortHeight });
        for (var i = 1; i < conPoints.length; i++) {
            segemnt = [conPoints[i - 1], conPoints[i]];
            imgLine = [];
            srcAngle = Math.round(Point.findAngle(segemnt[0], segemnt[1]) % 360);
            tarAngle = Math.round(Point.findAngle(segemnt[1], segemnt[0]) % 360);
            var angleAdd = (srcAngle > 0 && srcAngle <= 90) || (srcAngle > 180 && srcAngle <= 270) ? 90 : -90;
            imgLine.push(Point.transform(currentPosition, srcAngle + angleAdd, maxLength));
            imgLine.push(Point.transform(currentPosition, tarAngle + angleAdd, maxLength));
            var lineUtil1 = { x1: segemnt[0].x, y1: segemnt[0].y, x2: segemnt[1].x, y2: segemnt[1].y };
            var lineUtil2 = { x1: imgLine[0].x, y1: imgLine[0].y, x2: imgLine[1].x, y2: imgLine[1].y };
            var line3 = intersect3(lineUtil1, lineUtil2);
            if (line3.enabled) {
                intercepts.push(line3.intersectPt);
            }
        }
        return intercepts;
    };
    /** @private */
    CommandHandler.prototype.getAnnotationChanges = function (object, label) {
        var index = findObjectIndex(object, label.id, true);
        var annotations = {};
        annotations[index] = {
            width: label.width, height: label.height, offset: (object instanceof Node) ? ({
                x: label.offset.x,
                y: label.offset.y
            }) : label.offset,
            rotateAngle: label.rotateAngle,
            margin: { left: label.margin.left, right: label.margin.right, top: label.margin.top, bottom: label.margin.bottom },
            horizontalAlignment: label.horizontalAlignment, verticalAlignment: label.verticalAlignment,
            alignment: ((object instanceof Connector) ? label.alignment : undefined)
        };
        return { annotations: annotations };
    };
    /** @private */
    CommandHandler.prototype.getPortChanges = function (object, port) {
        var index = findObjectIndex(object, port.id, false);
        var ports = {};
        ports[index] = { offset: port.offset };
        return { ports: ports };
    };
    /** @private */
    CommandHandler.prototype.labelRotate = function (object, label, currentPosition, selector) {
        var oldValues;
        var changedvalues;
        oldValues = this.getAnnotationChanges(object, label);
        var matrix = identityMatrix();
        var rotateAngle = label.rotateAngle;
        var labelWrapper = this.diagram.getWrapper(object.wrapper, label.id);
        var angle = findAngle({ x: labelWrapper.offsetX, y: labelWrapper.offsetY }, currentPosition) + 90;
        var snapAngle = this.snapAngle(angle);
        angle = snapAngle !== 0 ? snapAngle : angle;
        if (label instanceof PathAnnotation && label.segmentAngle) {
            var getPointloop = getAnnotationPosition(object.intermediatePoints, label, object.wrapper.bounds);
            angle -= getPointloop.angle;
        }
        angle = (angle + 360) % 360;
        label.rotateAngle += angle - (label.rotateAngle + labelWrapper.parentTransform);
        label.margin.bottom += (labelWrapper.verticalAlignment === 'Top') ? (-label.height / 2) : ((labelWrapper.verticalAlignment === 'Bottom') ? (label.height / 2) : 0);
        label.margin.right += (labelWrapper.horizontalAlignment === 'Left') ? (-label.width / 2) : ((labelWrapper.horizontalAlignment === 'Right') ? (label.width / 2) : 0);
        if (label instanceof PathAnnotation) {
            label.alignment = 'Center';
        }
        else {
            label.horizontalAlignment = label.verticalAlignment = 'Center';
        }
        selector.wrapper.rotateAngle = selector.rotateAngle = label.rotateAngle;
        changedvalues = this.getAnnotationChanges(object, label);
        if (object instanceof Node) {
            this.diagram.nodePropertyChange(object, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(object, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(object);
    };
    /** @private */
    CommandHandler.prototype.labelResize = function (node, label, deltaWidth, deltaHeight, pivot, selector) {
        var oldValues;
        var changedvalues;
        var rotateAngle;
        oldValues = this.getAnnotationChanges(node, label);
        var textElement = selector.wrapper.children[0];
        if ((deltaWidth && deltaWidth !== 1) || (deltaHeight && deltaHeight !== 1)) {
            var newMat = identityMatrix();
            var matrix = identityMatrix();
            rotateMatrix(newMat, -node.rotateAngle, node.offsetX, node.offsetY);
            rotateAngle = ((textElement.rotateAngle + ((node instanceof Node) ? node.rotateAngle : 0)) + 360) % 360;
            rotateMatrix(matrix, -rotateAngle, pivot.x, pivot.y);
            scaleMatrix(matrix, deltaWidth, deltaHeight, pivot.x, pivot.y);
            rotateMatrix(matrix, rotateAngle, pivot.x, pivot.y);
            var newPosition = transformPointByMatrix(matrix, { x: textElement.offsetX, y: textElement.offsetY });
            var height = textElement.actualSize.height * deltaHeight;
            var width = textElement.actualSize.width * deltaWidth;
            var shape = this.findTarget(textElement, node);
            if (shape instanceof PathAnnotation) {
                this.updatePathAnnotationOffset(node, label, 0, 0, newPosition, new Size(width, height));
            }
            else {
                var bounds = cornersPointsBeforeRotation(node.wrapper);
                newPosition = transformPointByMatrix(newMat, newPosition);
                newPosition.x = newPosition.x - textElement.margin.left + textElement.margin.right;
                newPosition.y = newPosition.y - textElement.margin.top + textElement.margin.bottom;
                newPosition.y += (shape.verticalAlignment === 'Top') ? (-height / 2) : ((shape.verticalAlignment === 'Bottom') ? (height / 2) : 0);
                newPosition.x += (shape.horizontalAlignment === 'Left') ? (-width / 2) : ((shape.horizontalAlignment === 'Right') ? (width / 2) : 0);
                var offsetx = bounds.width / (newPosition.x - bounds.x);
                var offsety = bounds.height / (newPosition.y - bounds.y);
                if (width > 1) {
                    shape.width = width;
                    shape.offset.x = 1 / offsetx;
                }
                if (height > 1) {
                    shape.height = height;
                    shape.offset.y = 1 / offsety;
                }
            }
        }
        if (label instanceof PathAnnotation) {
            label.alignment = 'Center';
        }
        changedvalues = this.getAnnotationChanges(node, label);
        if (node instanceof Node) {
            this.diagram.nodePropertyChange(node, oldValues, changedvalues);
        }
        else {
            this.diagram.connectorPropertyChange(node, oldValues, changedvalues);
        }
        this.diagram.updateDiagramObject(node);
    };
    /** @private */
    CommandHandler.prototype.getSubProcess = function (source) {
        var selector = { nodes: [], connectors: [] };
        var process;
        if (source instanceof Node) {
            process = source.processId;
        }
        else if (source && source.nodes && (source.nodes.length)
            && source.nodes[0].processId) {
            process = source.nodes[0].processId;
        }
        if (process) {
            selector.nodes.push(clone(this.diagram.nameTable[process]));
            return selector;
        }
        return selector;
    };
    /**   @private  */
    CommandHandler.prototype.checkBoundaryConstraints = function (tx, ty, nodeBounds) {
        var pageSettings = this.diagram.pageSettings;
        var boundaryConstraints = this.diagram.pageSettings.boundaryConstraints;
        var scroller = this.diagram.scroller;
        if (boundaryConstraints === 'Page' || boundaryConstraints === 'Diagram') {
            var selectorBounds = !nodeBounds ? this.diagram.selectedItems.wrapper.bounds : undefined;
            var width = boundaryConstraints === 'Page' ? pageSettings.width : scroller.viewPortWidth;
            var height = boundaryConstraints === 'Page' ? pageSettings.height : scroller.viewPortHeight;
            var bounds = nodeBounds;
            var right = (nodeBounds ? bounds.right : selectorBounds.right) + (tx || 0);
            var left = (nodeBounds ? bounds.left : selectorBounds.left) + (tx || 0);
            var top_2 = (nodeBounds ? bounds.top : selectorBounds.top) + (ty || 0);
            var bottom = (nodeBounds ? bounds.bottom : selectorBounds.bottom) + (ty || 0);
            if (right <= width && left >= 0
                && bottom <= height && top_2 >= 0) {
                return true;
            }
            return false;
        }
        return true;
    };
    //interfaces
    /** @private */
    CommandHandler.prototype.dragSelectedObjects = function (tx, ty) {
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.offsetX = obj.offsetX;
            this.state.backup.offsetY = obj.offsetY;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        if (this.checkBoundaryConstraints(tx, ty)) {
            this.diagram.diagramActions = this.diagram.diagramActions | DiagramAction.PreventZIndexOnDragging;
            this.diagram.drag(obj, tx, ty);
            this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PreventZIndexOnDragging;
            this.diagram.refreshCanvasLayers();
            return true;
        }
        return false;
    };
    /** @private */
    CommandHandler.prototype.scaleSelectedItems = function (sx, sy, pivot) {
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.offsetX = obj.offsetX;
            this.state.backup.offsetY = obj.offsetY;
            this.state.backup.width = obj.width;
            this.state.backup.height = obj.height;
            this.state.backup.pivot = pivot;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        return this.diagram.scale(obj, sx, sy, pivot);
    };
    /** @private */
    CommandHandler.prototype.rotateSelectedItems = function (angle) {
        var obj = this.diagram.selectedItems;
        if (this.state && !this.state.backup) {
            this.state.backup = {};
            this.state.backup.angle = obj.rotateAngle;
        }
        obj = renderContainerHelper(this.diagram, obj) || obj;
        return this.diagram.rotate(obj, angle);
    };
    /** @private */
    CommandHandler.prototype.hasSelection = function () {
        return hasSelection(this.diagram);
    };
    /** @private */
    CommandHandler.prototype.isSelected = function (element) {
        return isSelected(this.diagram, element);
    };
    /**
     * initExpand is used for layout expand and collapse interaction
     */
    CommandHandler.prototype.initExpand = function (args) {
        var propName = 'isProtectedOnChange';
        var protectedChange = this.diagram[propName];
        this.diagram.protectPropertyChange(true);
        var node = (args.target || args.source);
        var oldValues = { isExpanded: node.isExpanded };
        node.isExpanded = !node.isExpanded;
        this.diagram.preventNodesUpdate = true;
        this.diagram.diagramActions |= DiagramAction.PreventIconsUpdate;
        this.diagram.nodePropertyChange(node, oldValues, { isExpanded: node.isExpanded });
        this.diagram.diagramActions = this.diagram.diagramActions & ~DiagramAction.PreventIconsUpdate;
        this.diagram.preventNodesUpdate = false;
        this.diagram.protectPropertyChange(protectedChange);
    };
    /** @private */
    CommandHandler.prototype.expandNode = function (node, diagram) {
        var animation;
        var objects;
        var preventNodesUpdate = this.diagram.preventNodesUpdate;
        var expand = node.isExpanded;
        this.diagram.preventNodesUpdate = true;
        this.diagram.preventConnectorsUpdate = true;
        this.expandCollapse(node, expand, this.diagram);
        node.isExpanded = expand;
        this.diagram.layout.fixedNode = node.id;
        if (this.diagram.layoutAnimateModule && this.diagram.layout.enableAnimation && this.diagram.organizationalChartModule) {
            this.diagram.organizationalChartModule.isAnimation = true;
        }
        objects = this.diagram.doLayout();
        this.diagram.preventNodesUpdate = preventNodesUpdate;
        this.diagram.preventConnectorsUpdate = false;
        if (this.diagram.layoutAnimateModule && this.diagram.organizationalChartModule) {
            this.layoutAnimateModule.expand(this.diagram.layout.enableAnimation, objects, node, this.diagram);
        }
        else {
            var arg = {
                element: cloneBlazorObject(clone(node)), state: (node.isExpanded) ? true : false
            };
            this.triggerEvent(DiagramEvent.expandStateChange, arg);
        }
        return objects;
    };
    CommandHandler.prototype.getparentexpand = function (target, diagram, visibility, connector) {
        var boolean;
        for (var i = 0; i < target.inEdges.length; i++) {
            var newConnector = diagram.nameTable[target.inEdges[i]];
            var previousNode = diagram.nameTable[newConnector.sourceID];
            if (previousNode.isExpanded && !visibility && previousNode.id !== connector.sourceID && newConnector.visible) {
                return false;
            }
            else {
                boolean = true;
            }
        }
        return boolean;
    };
    /**
     * Setinterval and Clear interval for layout animation
     */
    /** @private */
    CommandHandler.prototype.expandCollapse = function (source, visibility, diagram) {
        for (var i = 0; i < source.outEdges.length; i++) {
            var connector = diagram.nameTable[source.outEdges[i]];
            var target = diagram.nameTable[connector.targetID];
            var value = this.getparentexpand(target, diagram, visibility, connector);
            connector.visible = visibility;
            var oldValues = {
                visible: target.visible,
                style: { opacity: target.style.opacity }
            };
            var newValues = {
                visible: target.visible,
                style: { opacity: target.style.opacity }
            };
            if (value) {
                if (target.isExpanded) {
                    this.expandCollapse(target, visibility, diagram);
                }
                target.visible = visibility;
                target.style.opacity = (this.diagram.layoutAnimateModule &&
                    this.diagram.layout.enableAnimation && visibility) ? 0.1 : target.style.opacity;
                diagram.nodePropertyChange(target, oldValues, newValues);
            }
            diagram.connectorPropertyChange(connector, oldValues, newValues);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateNodeDimension = function (obj, rect) {
        if (obj instanceof Node) {
            obj.offsetX = rect.x + rect.width / 2;
            obj.offsetY = rect.y + rect.height / 2;
            obj.width = rect.width;
            obj.height = rect.height;
            obj.wrapper.children[0].canMeasurePath = true;
            this.diagram.nodePropertyChange(obj, {}, {
                width: rect.width, height: rect.height, offsetX: obj.offsetX,
                offsetY: obj.offsetY
            });
            if (this.diagram.mode !== 'SVG') {
                this.diagram.refreshDiagramLayer();
            }
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateConnectorPoints = function (obj, rect) {
        if (obj instanceof Connector) {
            this.diagram.connectorPropertyChange(obj, {}, {
                targetPoint: obj.targetPoint
            });
            this.diagram.updateDiagramObject(obj);
        }
    };
    /**
     * @private
     */
    CommandHandler.prototype.updateSelectedNodeProperties = function (object) {
        if (this.diagram.lineRoutingModule && (this.diagram.constraints & DiagramConstraints.LineRouting)) {
            this.diagram.protectPropertyChange(true);
            var objects = [];
            var connectors = [];
            var actualObject = this.diagram.selectedObject.actualObject;
            var helperObject = this.diagram.selectedObject.helperObject;
            if (helperObject && actualObject) {
                var offsetX = (helperObject.offsetX - actualObject.offsetX);
                var offsetY = (helperObject.offsetY - actualObject.offsetY);
                var width = (helperObject.width - actualObject.width);
                var height = (helperObject.height - actualObject.height);
                var rotateAngle = (helperObject.rotateAngle - actualObject.rotateAngle);
                this.diagram.selectedItems.wrapper.rotateAngle = this.diagram.selectedItems.rotateAngle = helperObject.rotateAngle;
                if (actualObject instanceof Node &&
                    actualObject.shape.type !== 'SwimLane' && !actualObject.isLane && !actualObject.isPhase && !actualObject.isHeader) {
                    actualObject.offsetX += offsetX;
                    actualObject.offsetY += offsetY;
                    actualObject.width += width;
                    actualObject.height += height;
                    actualObject.rotateAngle += rotateAngle;
                    this.diagram.nodePropertyChange(actualObject, {}, {
                        offsetX: actualObject.offsetX, offsetY: actualObject.offsetY,
                        width: actualObject.width, height: actualObject.height, rotateAngle: actualObject.rotateAngle
                    });
                    objects = this.diagram.spatialSearch.findObjects(actualObject.wrapper.outerBounds);
                }
                else if (actualObject instanceof Selector) {
                    for (var i = 0; i < actualObject.nodes.length; i++) {
                        var node = actualObject.nodes[i];
                        if (node instanceof Node && node.shape.type !== 'SwimLane' && !node.isLane
                            && !node.isPhase && !node.isHeader) {
                            node.offsetX += offsetX;
                            node.offsetY += offsetY;
                            node.width += width;
                            node.height += height;
                            node.rotateAngle += rotateAngle;
                            this.diagram.nodePropertyChange(node, {}, {
                                offsetX: node.offsetX, offsetY: node.offsetY,
                                width: node.width, height: node.height, rotateAngle: node.rotateAngle
                            });
                            objects = objects.concat(this.diagram.spatialSearch.findObjects(actualObject.wrapper.outerBounds));
                        }
                    }
                }
            }
            else {
                if (object instanceof Connector) {
                    objects.push(object);
                }
                else if (object instanceof Selector && object.connectors.length) {
                    objects = objects.concat(object.connectors);
                }
            }
            for (var i = 0; i < objects.length; i++) {
                if (objects[i] instanceof Connector && connectors.indexOf(objects[i].id) === -1) {
                    connectors.push(objects[i].id);
                }
            }
            this.diagram.lineRoutingModule.renderVirtualRegion(this.diagram, true);
            for (var i = 0; i < connectors.length; i++) {
                var connector = this.diagram.nameTable[connectors[i]];
                if (connector instanceof Connector) {
                    this.diagram.lineRoutingModule.refreshConnectorSegments(this.diagram, connector, true);
                }
            }
            this.updateSelector();
            this.diagram.protectPropertyChange(false);
        }
    };
    /** @private */
    CommandHandler.prototype.drawSelectionRectangle = function (x, y, width, height) {
        this.diagram.drawSelectionRectangle(x, y, width, height);
    };
    /** @private */
    CommandHandler.prototype.startGroupAction = function () {
        this.diagram.startGroupAction();
    };
    /** @private */
    CommandHandler.prototype.endGroupAction = function () {
        this.diagram.endGroupAction();
    };
    /** @private */
    CommandHandler.prototype.removeChildFromBPmn = function (child, newTarget, oldTarget) {
        var obj = this.diagram.nameTable[child.id] || child.nodes[0];
        if (oldTarget) {
            if ((obj) && obj.processId && obj.processId === oldTarget.wrapper.id) {
                var node = clone(obj);
                node.processId = obj.processId;
                this.diagram.startGroupAction();
                var edges = [];
                edges = edges.concat(obj.outEdges, obj.inEdges);
                for (var i = edges.length - 1; i >= 0; i--) {
                    var connector = this.diagram.nameTable[edges[i]];
                    if (connector) {
                        this.diagram.remove(connector);
                    }
                }
                var nodeCollection = void 0;
                nodeCollection = (this.diagram.nameTable[obj.processId].shape.activity.subProcess.processes) || [];
                nodeCollection.splice(nodeCollection.indexOf((obj).id), 1);
                this.diagram.bpmnModule.removeChildFromBPMN(this.diagram.nameTable[obj.processId].wrapper, (obj).id);
                this.diagram.nameTable[(obj).id].processId = '';
                obj.offsetX = obj.wrapper.offsetX;
                obj.offsetY = obj.wrapper.offsetY;
                var undoElement = clone(obj);
                var entry = {
                    type: 'PositionChanged', redoObject: { nodes: [undoElement] }, undoObject: { nodes: [node] }, category: 'Internal'
                };
                this.addHistoryEntry(entry);
                this.diagram.endGroupAction();
            }
        }
    };
    /** @private */
    CommandHandler.prototype.isDroppable = function (source, targetNodes) {
        var node = this.diagram.nameTable[source.id] || source.nodes[0];
        if (node) {
            if (node.shape.shape === 'TextAnnotation') {
                return true;
            }
            if (node && node.shape.type === 'Bpmn') {
                if ((node.processId === targetNodes.id) || (node.id === targetNodes.processId) ||
                    targetNodes.shape.type === 'Bpmn'
                        && targetNodes.shape.activity.subProcess.collapsed) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    CommandHandler.prototype.renderHighlighter = function (args, connectHighlighter, source) {
        var bounds = new Rect();
        if (args.target instanceof Node || (connectHighlighter && args.source instanceof Node)) {
            var tgt = connectHighlighter ? args.source : args.target;
            var tgtWrap = connectHighlighter ? args.sourceWrapper : args.targetWrapper;
            var target = this.findTarget(tgtWrap, tgt, source, true);
            var element = void 0;
            if (target instanceof BpmnSubEvent) {
                var portId = target.id;
                var node = args.target;
                var parent_6 = node.wrapper.children[0].children[0].children[2];
                for (var _i = 0, _a = parent_6.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.id === node.id + '_' + portId) {
                        element = child.children[0];
                        break;
                    }
                }
            }
            else {
                element = target instanceof Node ?
                    target.wrapper : connectHighlighter ? args.sourceWrapper : args.targetWrapper;
            }
            this.diagram.renderHighlighter(element);
        }
    };
    //additional events
    /** @private */
    CommandHandler.prototype.mouseOver = function (source, target, position) {
        //mouse over
        //returns whether the source can move over the target or not
        return true;
    };
    /**
     * @private
     */
    CommandHandler.prototype.snapPoint = function (startPoint, endPoint, tx, ty) {
        var obj = this.diagram.selectedItems;
        var point;
        var towardsLeft = endPoint.x < startPoint.x;
        var towardsTop = endPoint.y < startPoint.y;
        point = { x: tx, y: ty };
        var snappedPoint = point;
        if (this.snappingModule) {
            snappedPoint = this.diagram.snappingModule.snapPoint(this.diagram, obj, towardsLeft, towardsTop, point, startPoint, endPoint);
        }
        return snappedPoint;
    };
    /**
     * @private
     */
    CommandHandler.prototype.removeSnap = function () {
        if ((this.diagram.snapSettings.constraints & SnapConstraints.SnapToObject) && this.snappingModule) {
            this.snappingModule.removeGuidelines(this.diagram);
        }
    };
    /** @private */
    CommandHandler.prototype.dropAnnotation = function (source, target) {
        var node = (source instanceof Node) ? source : source.nodes[0];
        if (this.diagram.bpmnModule && target.shape.type === 'Bpmn'
            && node.shape.shape === 'TextAnnotation') {
            var hasTarget = 'hasTarget';
            node[hasTarget] = target.id;
            node.shape.annotation.nodeId = target.id;
            if (!this.diagram.currentSymbol) {
                this.diagram.addTextAnnotation(node.shape.annotation, target);
                node.shape.annotation.nodeId = '';
                this.diagram.remove(node);
            }
            this.diagram.refreshDiagramLayer();
        }
    };
    ;
    /** @private */
    CommandHandler.prototype.drop = function (source, target, position) {
        //drop
        if (this.diagram.bpmnModule) {
            this.diagram.bpmnModule.dropBPMNchild(target, (source instanceof Node) ? source : source.nodes[0], this.diagram);
            this.diagram.refreshDiagramLayer();
        }
    };
    /** @private */
    CommandHandler.prototype.addHistoryEntry = function (entry) {
        this.diagram.addHistoryEntry(entry);
    };
    /** @private */
    CommandHandler.prototype.align = function (objects, option, type) {
        if (objects.length > 0) {
            var i = 0;
            objects[0] = this.diagram.nameTable[objects[0].id] || objects[0];
            var bounds = (type === 'Object') ? getBounds(objects[0].wrapper) : this.diagram.selectedItems.wrapper.bounds;
            var undoObj = { nodes: [], connectors: [] };
            var redoObj = { nodes: [], connectors: [] };
            for (i = ((type === 'Object') ? (i + 1) : i); i < objects.length; i++) {
                var tx = 0;
                var ty = 0;
                objects[i] = this.diagram.nameTable[objects[i].id] || objects[i];
                var objectBounds = getBounds(objects[i].wrapper);
                if (option === 'Left') {
                    tx = bounds.left + objectBounds.width / 2 - objectBounds.center.x;
                }
                else if (option === 'Right') {
                    tx = bounds.right - objectBounds.width / 2 - objectBounds.center.x;
                }
                else if (option === 'Top') {
                    ty = bounds.top + objectBounds.height / 2 - objectBounds.center.y;
                }
                else if (option === 'Bottom') {
                    ty = bounds.bottom - objectBounds.height / 2 - objectBounds.center.y;
                }
                else if (option === 'Center') {
                    tx = bounds.center.x - objectBounds.center.x;
                }
                else if (option === 'Middle') {
                    ty = bounds.center.y - objectBounds.center.y;
                }
                undoObj = this.storeObject(undoObj, objects[i]);
                this.drag(objects[i], tx, ty);
                this.diagram.updateSelector();
                redoObj = this.storeObject(redoObj, objects[i]);
            }
            undoObj = clone(undoObj);
            redoObj = clone(redoObj);
            var entry = {
                type: 'Align', category: 'Internal',
                undoObject: cloneObject(undoObj), redoObject: cloneObject(redoObj)
            };
            this.addHistoryEntry(entry);
        }
    };
    /** @private */
    CommandHandler.prototype.distribute = function (objects, option) {
        if (objects.length > 0) {
            var i = 0;
            var j = 0;
            var rect = new Rect();
            var b = [];
            var temp = void 0;
            var right = 0;
            var left = 0;
            var top_3 = 0;
            var bottom = 0;
            var center = 0;
            var middle = 0;
            var btt = 0;
            var sum = 0;
            var undoSelectorObj = { nodes: [], connectors: [] };
            var redoSelectorObj = { nodes: [], connectors: [] };
            for (i = 0; i < objects.length; i++) {
                objects[i] = this.diagram.nameTable[objects[i].id] || objects[i];
            }
            objects = sort(objects, option);
            for (i = 1; i < objects.length; i++) {
                right = right + objects[i].wrapper.bounds.topRight.x - objects[i - 1].wrapper.bounds.topRight.x;
                left = left + objects[i].wrapper.bounds.topLeft.x - objects[i - 1].wrapper.bounds.topLeft.x;
                top_3 = top_3 + objects[i].wrapper.bounds.topRight.y - objects[i - 1].wrapper.bounds.topRight.y;
                bottom = bottom + objects[i].wrapper.bounds.bottomRight.y - objects[i - 1].wrapper.bounds.bottomRight.y;
                center = center + objects[i].wrapper.bounds.center.x - objects[i - 1].wrapper.bounds.center.x;
                middle = middle + objects[i].wrapper.bounds.center.y - objects[i - 1].wrapper.bounds.center.y;
                btt = btt + objects[i].wrapper.bounds.topRight.y - objects[i - 1].wrapper.bounds.bottomRight.y;
            }
            for (i = 1; i < objects.length - 1; i++) {
                var tx = 0;
                var ty = 0;
                var prev = getBounds(objects[i - 1].wrapper);
                var current = getBounds(objects[i].wrapper);
                if (option === 'RightToLeft' || option === 'Center') {
                    tx = prev.center.x - current.center.x + (center / (objects.length - 1));
                }
                else if (option === 'Right') {
                    tx = prev.topRight.x - current.topRight.x + (right / (objects.length - 1));
                }
                else if (option === 'Left') {
                    tx = prev.topLeft.x - current.topLeft.x + (left / (objects.length - 1));
                }
                else if (option === 'Middle') {
                    ty = prev.center.y - current.center.y + (middle / (objects.length - 1));
                }
                else if (option === 'Top') {
                    ty = prev.topRight.y - current.topRight.y + (top_3 / (objects.length - 1));
                }
                else if (option === 'Bottom') {
                    ty = prev.bottomRight.y - current.bottomRight.y + (bottom / (objects.length - 1));
                }
                else if (option === 'BottomToTop') {
                    ty = prev.bottomRight.y - current.topRight.y + (btt / (objects.length - 1));
                }
                undoSelectorObj = this.storeObject(undoSelectorObj, objects[i]);
                this.drag(objects[i], tx, ty);
                this.diagram.updateSelector();
                redoSelectorObj = this.storeObject(redoSelectorObj, objects[i]);
            }
            undoSelectorObj = clone(undoSelectorObj);
            redoSelectorObj = clone(redoSelectorObj);
            var entry = {
                type: 'Distribute', category: 'Internal',
                undoObject: cloneObject(undoSelectorObj), redoObject: cloneObject(redoSelectorObj)
            };
            this.addHistoryEntry(entry);
        }
    };
    /** @private */
    CommandHandler.prototype.sameSize = function (objects, option) {
        if (objects.length > 0) {
            var i = 0;
            var pivot = void 0;
            pivot = { x: 0.5, y: 0.5 };
            objects[0] = this.diagram.nameTable[objects[0].id] || objects[0];
            var bounds = getBounds(objects[0].wrapper);
            var undoObject = { nodes: [], connectors: [] };
            var redoObject = { nodes: [], connectors: [] };
            for (i = 1; i < objects.length; i++) {
                objects[i] = this.diagram.nameTable[objects[i].id] || objects[0];
                var rect = getBounds(objects[i].wrapper);
                var sw = 1;
                var sh = 1;
                if (option === 'Width') {
                    sw = bounds.width / rect.width;
                }
                else if (option === 'Height') {
                    sh = bounds.height / rect.height;
                }
                else if (option === 'Size') {
                    sw = bounds.width / rect.width;
                    sh = bounds.height / rect.height;
                }
                undoObject = this.storeObject(undoObject, objects[i]);
                this.scale(objects[i], sw, sh, pivot);
                redoObject = this.storeObject(redoObject, objects[i]);
            }
            this.diagram.updateSelector();
            undoObject = clone(undoObject);
            redoObject = clone(redoObject);
            var entry = {
                type: 'Sizing', category: 'Internal',
                undoObject: cloneObject(undoObject), redoObject: cloneObject(redoObject)
            };
            this.addHistoryEntry(entry);
        }
    };
    CommandHandler.prototype.storeObject = function (selectorObject, obj) {
        if (obj instanceof Node) {
            selectorObject.nodes.push(clone(obj));
        }
        else {
            selectorObject.connectors.push(clone(obj));
        }
        return selectorObject;
    };
    /** @private */
    CommandHandler.prototype.scroll = function (scrollX, scrollY, focusPoint) {
        var panx = canPanX(this.diagram);
        var pany = canPanY(this.diagram);
        this.diagram.pan((scrollX = panx ? scrollX : 0) * this.diagram.scroller.currentZoom, (scrollY = pany ? scrollY : 0) * this.diagram.scroller.currentZoom, focusPoint);
    };
    /**
     * @private
     */
    CommandHandler.prototype.drawHighlighter = function (element) {
        this.diagram.renderHighlighter(element.wrapper);
    };
    /**
     * @private
     */
    CommandHandler.prototype.removeHighlighter = function () {
        this.diagram.clearHighlighter();
    };
    /**
     * @private
     */
    CommandHandler.prototype.renderContainerHelper = function (node) {
        return renderContainerHelper(this.diagram, node);
    };
    /**
     * @private
     */
    CommandHandler.prototype.isParentAsContainer = function (node, isChild) {
        return checkParentAsContainer(this.diagram, node, isChild);
    };
    /**
     * @private
     */
    CommandHandler.prototype.dropChildToContainer = function (parent, node) {
        addChildToContainer(this.diagram, parent, node);
    };
    /** @private */
    CommandHandler.prototype.checkSelection = function (selector, corner) {
        var node;
        var wrapper;
        var child;
        var index;
        var shape;
        if (selector.nodes.length === 1 && selector.connectors.length === 0) {
            if (checkParentAsContainer(this.diagram, selector.nodes[0], true)) {
                node = (selector.nodes[0].shape === 'SwimLane') ? selector.nodes[0] :
                    this.diagram.nameTable[selector.nodes[0].parentId];
                var child_1 = selector.nodes[0];
                if (node.shape.type === 'SwimLane') {
                    var orientation_1 = (node.shape.orientation === 'Horizontal') ? true : false;
                    if ((child_1.isPhase && ((orientation_1 && corner === 'ResizeSouth') || (!orientation_1 && corner === 'ResizeEast'))) ||
                        (child_1.isLane && ((orientation_1 && corner === 'ResizeEast') || (!orientation_1 && corner === 'ResizeSouth')))) {
                        swimLaneSelection(this.diagram, node, corner);
                    }
                }
                else if (node.container.type === 'Grid') {
                    if (((node.container.orientation === 'Horizontal' && child_1.rowIndex === 1) ||
                        (node.container.orientation === 'Vertical' && child_1.rowIndex > 0 && child_1.columnIndex > 0))) {
                        if (corner === 'ResizeSouth') {
                            for (var i = 0; i < this.diagram.nodes.length; i++) {
                                var obj = this.diagram.nodes[i];
                                if (obj.rowIndex === node.rows.length - 1 && obj.columnIndex === 0) {
                                    this.select(obj);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        if (corner === 'ResizeEast') {
                            for (var i = 0; i < this.diagram.nodes.length; i++) {
                                var obj = this.diagram.nodes[i];
                                if (obj.rowIndex === 1 && obj.columnIndex === node.columns.length - 1) {
                                    this.select(obj);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else {
                swimLaneSelection(this.diagram, selector.nodes[0], corner);
            }
        }
    };
    /** @private */
    CommandHandler.prototype.zoom = function (scale, scrollX, scrollY, focusPoint) {
        this.diagram.scroller.zoom(scale, scrollX * this.diagram.scroller.currentZoom, scrollY * this.diagram.scroller.currentZoom, focusPoint);
    };
    return CommandHandler;
}());
export { CommandHandler };