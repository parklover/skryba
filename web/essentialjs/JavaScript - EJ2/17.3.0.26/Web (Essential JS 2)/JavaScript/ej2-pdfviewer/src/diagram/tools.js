var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { randomId, Point } from '@syncfusion/ej2-drawings';
import { rotatePoint, } from '@syncfusion/ej2-drawings';
import { Rect } from '@syncfusion/ej2-drawings';
import { transformPointByMatrix, rotateMatrix, identityMatrix } from '@syncfusion/ej2-drawings';
import { TextElement } from '@syncfusion/ej2-drawings';
import { Selector } from './selector';
import { findActiveElement } from './action';
import { cloneObject, isLineShapes } from './drawing-util';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { updatePerimeterLabel } from './connector-util';
/**
 * Defines the interactive tools

 */
var ToolBase = /** @class */ (function () {
    /**
     * Initializes the tool
     * @param command Command that is corresponding to the current action
     */
    function ToolBase(pdfViewer, pdfViewerBase, protectChange) {
        if (protectChange === void 0) { protectChange = false; }
        /**
         * Command that is corresponding to the current action
         */
        this.commandHandler = null;
        /**
         * Sets/Gets whether the interaction is being done
         */
        this.inAction = false;
        /**
         * Sets/Gets the protect change
         */
        this.pdfViewerBase = null;
        /**
         * Sets/Gets the current element that is under mouse
         */
        /**   @private  */
        this.currentElement = null;
        /**   @private  */
        this.blocked = false;
        this.isTooltipVisible = false;
        /** @private */
        this.childTable = {};
        /** @private */
        this.helper = undefined;
        /**
         * Sets/Gets the previous object when mouse down
         */
        this.undoElement = { annotations: [] };
        this.undoParentElement = { annotations: [] };
        this.commandHandler = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    ToolBase.prototype.startAction = function (currentElement) {
        this.currentElement = currentElement;
        this.inAction = true;
    };
    /**   @private  */
    ToolBase.prototype.mouseDown = function (args) {
        this.currentElement = args.source;
        this.startPosition = this.currentPosition = this.prevPosition = args.position;
        this.isTooltipVisible = true;
        this.startAction(args.source);
    };
    /**   @private  */
    ToolBase.prototype.mouseMove = function (args) {
        this.currentPosition = args.position;
        //this.currentElement = currentElement;
        this.prevPageId = this.pdfViewerBase.activeElements.activePageID;
        return !this.blocked;
    };
    /**   @private  */
    ToolBase.prototype.mouseUp = function (args) {
        this.currentPosition = args.position;
        // this.currentElement = currentElement;
        this.isTooltipVisible = false;
        //At the end
        this.endAction();
        this.helper = null;
    };
    ToolBase.prototype.endAction = function () {
        //remove helper  
        if (this.commandHandler) {
            this.commandHandler.tool = '';
            if (this.helper) {
                this.commandHandler.remove(this.helper);
            }
        }
        this.commandHandler = null;
        this.currentElement = null;
        this.currentPosition = null;
        this.inAction = false;
        this.blocked = false;
    };
    /**   @private  */
    ToolBase.prototype.mouseWheel = function (args) {
        this.currentPosition = args.position;
    };
    /**   @private  */
    ToolBase.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ToolBase.prototype.updateSize = function (shape, startPoint, endPoint, corner, initialBounds, angle) {
        shape = shape;
        var zoom = this.commandHandler.viewerBase.getZoomFactor();
        var difx = this.currentPosition.x / zoom - this.startPosition.x / zoom;
        var dify = this.currentPosition.y / zoom - this.startPosition.y / zoom;
        var rotateAngle = (shape instanceof TextElement) ? angle : shape.rotateAngle;
        var matrix;
        matrix = identityMatrix();
        rotateMatrix(matrix, -rotateAngle, 0, 0);
        var deltaWidth = 0;
        var deltaHeight = 0;
        var diff;
        var width = (shape instanceof TextElement) ? shape.actualSize.width : shape.wrapper.bounds.width;
        var height = (shape instanceof TextElement) ? shape.actualSize.height : shape.wrapper.bounds.height;
        switch (corner) {
            case 'ResizeWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = 1;
                difx = difx;
                dify = 0;
                deltaWidth = (initialBounds.width - difx) / width;
                break;
            case 'ResizeEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                dify = 0;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = 1;
                break;
            case 'ResizeNorth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouth':
                deltaWidth = 1;
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
            case 'ResizeNorthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaWidth = (initialBounds.width + difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeNorthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height - dify) / height;
                break;
            case 'ResizeSouthEast':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaHeight = (initialBounds.height + dify) / height;
                deltaWidth = (initialBounds.width + difx) / width;
                break;
            case 'ResizeSouthWest':
                diff = transformPointByMatrix(matrix, ({ x: difx, y: dify }));
                difx = diff.x;
                dify = diff.y;
                deltaWidth = (initialBounds.width - difx) / width;
                deltaHeight = (initialBounds.height + dify) / height;
                break;
        }
        return { width: deltaWidth, height: deltaHeight };
    };
    ToolBase.prototype.getPivot = function (corner) {
        switch (corner) {
            case 'ResizeWest':
                return { x: 1, y: 0.5 };
            case 'ResizeEast':
                return { x: 0, y: 0.5 };
            case 'ResizeNorth':
                return { x: 0.5, y: 1 };
            case 'ResizeSouth':
                return { x: 0.5, y: 0 };
            case 'ResizeNorthEast':
                return { x: 0, y: 1 };
            case 'ResizeNorthWest':
                return { x: 1, y: 1 };
            case 'ResizeSouthEast':
                return { x: 0, y: 0 };
            case 'ResizeSouthWest':
                return { x: 1, y: 0 };
        }
        return { x: 0.5, y: 0.5 };
    };
    return ToolBase;
}());
export { ToolBase };
/**
 * Helps to select the objects

 */
var SelectTool = /** @class */ (function (_super) {
    __extends(SelectTool, _super);
    function SelectTool(commandHandler, base) {
        return _super.call(this, commandHandler, base, true) || this;
        //     this.action = action;
    }
    /**   @private  */
    SelectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.mouseEventHelper(args);
        _super.prototype.mouseDown.call(this, args);
    };
    SelectTool.prototype.mouseEventHelper = function (args) {
        // tslint:disable-next-line
        var object = findActiveElement(args, this.pdfViewerBase, this.commandHandler);
        if (this.commandHandler) {
            var selectedObject = this.commandHandler.selectedItems;
            var currentSource = args.source;
            if ((selectedObject.annotations.length) && args.info && !args.info.ctrlKey
                // tslint:disable-next-line
                && this.commandHandler.annotationModule && this.commandHandler.annotationModule.freeTextAnnotationModule.isInuptBoxInFocus === false) {
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                // tslint:disable-next-line:max-line-length
            }
            else if (args.info && args.info.ctrlKey && ((currentSource && currentSource.shapeAnnotationType === 'FreeText') || (this.commandHandler.selectedItems.annotations[0] && this.commandHandler.selectedItems.annotations[0].shapeAnnotationType === 'FreeText'))) {
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            }
            if (object) {
                this.commandHandler.select([object.id]);
            }
        }
    };
    /**   @private  */
    SelectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        //draw selected region
        return !this.blocked;
    };
    /**   @private  */
    SelectTool.prototype.mouseUp = function (args) {
        // tslint:disable-next-line
        this.mouseEventHelper(args);
        this.inAction = false;
        _super.prototype.mouseUp.call(this, args);
    };
    /**   @private  */
    SelectTool.prototype.mouseLeave = function (args) {
        if (this.inAction) {
            this.mouseUp(args);
        }
    };
    return SelectTool;
}(ToolBase));
export { SelectTool };
var MoveTool = /** @class */ (function (_super) {
    __extends(MoveTool, _super);
    function MoveTool(commandHandler, base) {
        var _this = _super.call(this, commandHandler, base) || this;
        /**   @private  */
        _this.currentTarget = null;
        /**   @private  */
        _this.prevNode = null;
        return _this;
    }
    /**   @private  */
    MoveTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.offset = { x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY };
        this.startPosition = args.position;
        var nodeMouseDown = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: nodeMouseDown.wrapper.offsetX, y: nodeMouseDown.wrapper.offsetY,
                width: nodeMouseDown.wrapper.actualSize.width, height: nodeMouseDown.wrapper.actualSize.height
            }
            // tslint:disable-next-line
        };
        if (isLineShapes(nodeMouseDown)) {
            this.redoElement.vertexPoints = nodeMouseDown.vertexPoints;
            this.redoElement.leaderHeight = nodeMouseDown.leaderHeight;
        }
        this.inAction = true;
    };
    /**   @private  */
    /* tslint:disable */
    MoveTool.prototype.mouseUp = function (args) {
        var object;
        if (this.commandHandler) {
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            this.commandHandler.select([args.source.id]);
            this.commandHandler.dragSelectedObjects(this.calculateMouseActionXDiff(args), this.calculateMouseActionYDiff(args), this.pdfViewerBase.activeElements.activePageID, null);
            this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
            // tslint:disable-next-line
            var newShapeObject = {
                bounds: {
                    x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                    width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                }, modifiedDate: args.source.modifiedDate
            };
            if (isLineShapes(args.source)) {
                newShapeObject.vertexPoints = args.source.vertexPoints;
                newShapeObject.leaderHeight = args.source.leaderHeight;
            }
            // tslint:disable-next-line
            this.commandHandler.annotation.addAction(this.pageIndex, null, args.source, 'Drag', '', this.redoElement, newShapeObject);
            this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, null, 'Drag');
            this.commandHandler.annotation.stickyNotesAnnotationModule.updateStickyNotes(args.source, null);
        }
        _super.prototype.mouseUp.call(this, args);
    };
    MoveTool.prototype.calculateMouseXDiff = function () {
        if (this.currentPosition && this.startPosition) {
            return this.currentPosition.x - this.startPosition.x;
        }
        else {
            return 0;
        }
    };
    MoveTool.prototype.calculateMouseYDiff = function () {
        if (this.currentPosition && this.startPosition) {
            return this.currentPosition.y - this.startPosition.y;
        }
        else {
            return 0;
        }
    };
    MoveTool.prototype.calculateMouseActionXDiff = function (args) {
        var x = this.calculateMouseXDiff() / this.commandHandler.viewerBase.getZoomFactor();
        // let y: number = this.calculateMouseYDiff() / this.commandHandler.magnification.zoomFactor;
        var requiredX = this.offset.x + x;
        // let requiredY: number = this.offset.y + y;
        return requiredX - args.source.wrapper.offsetX;
        //let diffY: number = requiredY - args.source.wrapper.offsetY;
    };
    MoveTool.prototype.calculateMouseActionYDiff = function (args) {
        // let x: number = this.calculateMouseXDiff() / this.commandHandler.magnification.zoomFactor;
        var y = this.calculateMouseYDiff() / this.commandHandler.viewerBase.getZoomFactor();
        // let requiredX: number = this.offset.x + x;
        var requiredY = this.offset.y + y;
        // let diffX: number = requiredX - args.source.wrapper.offsetX;
        return requiredY - args.source.wrapper.offsetY;
    };
    /**   @private  */
    /* tslint:disable */
    MoveTool.prototype.mouseMove = function (args, isStamp) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction) {
            this.currentPosition = args.position;
            this.currentTarget = args.target;
            var x = this.calculateMouseXDiff() / this.commandHandler.viewerBase.getZoomFactor();
            var y = this.calculateMouseYDiff() / this.commandHandler.viewerBase.getZoomFactor();
            var requiredX = this.offset.x + x;
            var requiredY = this.offset.y + y;
            var diffX = this.calculateMouseActionXDiff(args);
            var diffY = this.calculateMouseActionYDiff(args);
            if (!this.helper) {
                var selectedItem = this.commandHandler.selectedItems.annotations[0];
                // tslint:disable-next-line
                var cobject = cloneObject(this.commandHandler.selectedItems.annotations[0]);
                diffX = requiredX - cobject.wrapper.offsetX;
                diffY = requiredY - cobject.wrapper.offsetY;
                cobject.bounds = this.commandHandler.selectedItems.annotations[0].wrapper.bounds;
                cobject.wrapper = undefined;
                cobject.id = 'diagram_helper';
                if (cobject.shapeAnnotationType === 'Stamp') {
                    cobject.strokeColor = '';
                    cobject.borderDashArray = '';
                    cobject.fillColor = 'transparent';
                    cobject.stampFillColor = 'transparent';
                    cobject.data = '';
                }
                else if (cobject.shapeAnnotationType === 'FreeText') {
                    cobject.strokeColor = 'blue';
                    cobject.fillColor = 'transparent';
                    cobject.thickness = 1;
                    cobject.opacity = 1;
                    cobject.dynamicText = '';
                }
                else {
                    cobject.strokeColor = 'red';
                    cobject.borderDashArray = '5,5';
                    cobject.fillColor = 'transparent';
                    cobject.thickness = 2;
                    cobject.opacity = 1;
                }
                if (cobject.enableShapeLabel === true) {
                    cobject.labelContent = '';
                }
                if (!isStamp) {
                    this.helper = cobject = this.commandHandler.add(cobject);
                }
                else {
                    cobject = this.helper = args.source;
                }
                this.commandHandler.selectedItems.annotations = [cobject];
            }
            else {
                diffX = requiredX - this.helper.wrapper.offsetX;
                diffY = requiredY - this.helper.wrapper.offsetY;
            }
            if (this.helper && this.helper.shapeAnnotationType === 'Stamp') {
                isStamp = true;
            }
            // tslint:disable-next-line:max-line-length
            if (this.commandHandler.checkBoundaryConstraints(diffX, diffY, this.pdfViewerBase.activeElements.activePageID, this.helper.wrapper.bounds, isStamp)) {
                this.commandHandler.dragSelectedObjects(diffX, diffY, this.pdfViewerBase.activeElements.activePageID, this.helper);
                this.prevNode = this.helper;
                this.prevPosition = this.currentPosition;
            }
            else {
                this.currentPosition = this.prevPosition;
            }
        }
        return true;
    };
    /**   @private  */
    MoveTool.prototype.mouseLeave = function (args) {
        var object;
        var requiredX = this.offset.x + this.calculateMouseXDiff();
        var requiredY = this.offset.y + this.calculateMouseYDiff();
        var diffX = requiredX - args.source.wrapper.offsetX;
        var diffY = requiredY - args.source.wrapper.offsetY;
        this.commandHandler.dragSelectedObjects(diffX, diffY, this.prevPageId, null);
        this.commandHandler.renderSelector(this.prevPageId);
        _super.prototype.mouseLeave.call(this, args);
    };
    /**   @private  */
    MoveTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.currentTarget = null;
        this.prevPosition = null;
    };
    return MoveTool;
}(ToolBase));
export { MoveTool };
var StampTool = /** @class */ (function (_super) {
    __extends(StampTool, _super);
    function StampTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**   @private  */
    // tslint:disable-next-line
    StampTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseUp.call(this, args);
    };
    /**   @private  */
    StampTool.prototype.mouseMove = function (args) {
        // tslint:disable-next-line
        var newObject;
        if (!this.inAction) {
            var pageIndex = this.pdfViewerBase.activeElements.activePageID;
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            // tslint:disable-next-line:max-line-length
            var nodeElement = this.commandHandler.annotation.stampAnnotationModule.moveStampElement(args.position.x, args.position.y, pageIndex);
            newObject = this.commandHandler.add(nodeElement);
            args.source = this.commandHandler.annotations[this.commandHandler.annotations.length - 1];
            args.sourceWrapper = args.source.wrapper;
            this.inAction = true;
            // tslint:disable-next-line
            this['offset'] = { x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY };
            this.startPosition = args.position;
            this.commandHandler.select([newObject.id]);
        }
        _super.prototype.mouseMove.call(this, args, true);
        this.commandHandler.renderSelector(args.source.pageIndex);
        return this.inAction;
    };
    return StampTool;
}(MoveTool));
export { StampTool };
/**
 * Helps to edit the selected connectors

 */
var ConnectTool = /** @class */ (function (_super) {
    __extends(ConnectTool, _super);
    function ConnectTool(commandHandler, base, endPoint) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        _this.endPoint = endPoint;
        return _this;
    }
    /**   @private  */
    ConnectTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = undefined;
        _super.prototype.mouseDown.call(this, args);
        var oldValue;
        var connectors;
        if (args.source && args.source.annotations) {
            oldValue = { x: this.prevPosition.x, y: this.prevPosition.y };
            connectors = args.source.annotations[0];
        }
        this.initialPosition = args.position;
        this.prevSource = this.commandHandler.selectedItems.annotations[0];
        var nodeElement = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: nodeElement.wrapper.offsetX, y: nodeElement.wrapper.offsetY,
                width: nodeElement.wrapper.actualSize.width, height: nodeElement.wrapper.actualSize.height
            }
            // tslint:disable-next-line
        };
        if (isLineShapes(nodeElement)) {
            this.redoElement.vertexPoints = nodeElement.vertexPoints;
            this.redoElement.leaderHeight = nodeElement.leaderHeight;
            // tslint:disable-next-line:max-line-length
            if (nodeElement.measureType === 'Distance' || nodeElement.measureType === 'Perimeter' || nodeElement.measureType === 'Area' || nodeElement.measureType === 'Volume') {
                this.redoElement.notes = nodeElement.notes;
            }
        }
        this.currentPosition = args.position;
    };
    /**   @private  */
    ConnectTool.prototype.mouseUp = function (args) {
        if (this.commandHandler) {
            var node = this.commandHandler.selectedItems.annotations[0];
            if (node) {
                // tslint:disable-next-line:max-line-length
                this.commandHandler.nodePropertyChange(this.prevSource, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                this.commandHandler.select([this.prevSource.id]);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
                // tslint:disable-next-line
                var newShapeElementObject = {
                    bounds: {
                        x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                        width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                    }
                };
                // tslint:disable-next-line:max-line-length
                if (node.measureType === 'Distance' || node.measureType === 'Perimeter' || node.measureType === 'Area' || node.measureType === 'Volume') {
                    this.commandHandler.annotation.updateCalibrateValues(this.commandHandler.selectedItems.annotations[0]);
                    newShapeElementObject.notes = args.source.notes;
                }
                if (isLineShapes(args.source)) {
                    newShapeElementObject.vertexPoints = args.source.vertexPoints;
                    newShapeElementObject.leaderHeight = args.source.leaderHeight;
                }
                // tslint:disable-next-line
                this.commandHandler.annotation.addAction(this.pageIndex, null, this.prevSource, 'Resize', '', this.redoElement, newShapeElementObject);
            }
        }
        _super.prototype.mouseUp.call(this, args);
    };
    /**   @private  */
    ConnectTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var connector;
        this.currentPosition = args.position;
        if (this.currentPosition && this.prevPosition) {
            var diffX = this.currentPosition.x - this.prevPosition.x;
            var diffY = this.currentPosition.y - this.prevPosition.y;
            var newValue = void 0;
            var oldValue = void 0;
            if (args.source && args.source.annotations) {
                newValue = {
                    x: this.currentPosition.x, y: this.currentPosition.y,
                };
                oldValue = {
                    x: this.prevPosition.x, y: this.prevPosition.y
                };
                connector = args.source.annotations[0];
            }
            var targetPortId = void 0;
            var targetPdfAnnotationBaseModelId = void 0;
            if (this.inAction && this.endPoint !== undefined && diffX !== 0 || diffY !== 0) {
                if (!this.helper) {
                    // tslint:disable-next-line
                    var cloneShapebject = cloneObject(this.commandHandler.selectedItems.annotations[0]);
                    cloneShapebject.id = 'diagram_helper';
                    cloneShapebject.strokeColor = 'red';
                    cloneShapebject.borderDashArray = '5,5';
                    cloneShapebject.fillColor = 'transparent';
                    cloneShapebject.thickness = 2;
                    cloneShapebject.opacity = 1;
                    if (cloneShapebject.enableShapeLabel === true) {
                        cloneShapebject.labelContent = '';
                    }
                    this.helper = cloneShapebject = this.commandHandler.add(cloneShapebject);
                    this.commandHandler.selectedItems.annotations = [cloneShapebject];
                }
                this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, this.helper, this.currentPosition, this.selectedSegment, args.target);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
            }
        }
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**   @private  */
    ConnectTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    ConnectTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
    };
    return ConnectTool;
}(ToolBase));
export { ConnectTool };
/**
 * Scales the selected objects

 */
var ResizeTool = /** @class */ (function (_super) {
    __extends(ResizeTool, _super);
    function ResizeTool(commandHandler, base, corner) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        /**   @private  */
        _this.initialBounds = new Rect();
        _this.corner = corner;
        return _this;
    }
    /**   @private  */
    ResizeTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.initialBounds.x = args.source.wrapper.offsetX;
        this.initialBounds.y = args.source.wrapper.offsetY;
        this.initialBounds.height = args.source.wrapper.actualSize.height;
        this.initialBounds.width = args.source.wrapper.actualSize.width;
        this.initialPosition = args.position;
        var node = cloneObject(args.source);
        this.redoElement = {
            bounds: {
                x: node.wrapper.offsetX, y: node.wrapper.offsetY,
                width: node.wrapper.actualSize.width, height: node.wrapper.actualSize.height
            }
            // tslint:disable-next-line
        };
        if (isLineShapes(node)) {
            this.redoElement.vertexPoints = node.vertexPoints;
            this.redoElement.leaderHeight = node.leaderHeight;
        }
        if (node.measureType === 'Radius') {
            this.redoElement.notes = node.notes;
        }
        this.prevSource = this.commandHandler.selectedItems.annotations[0];
    };
    /**   @private  */
    ResizeTool.prototype.mouseUp = function (args, isPreventHistory) {
        var object;
        object = args.source;
        if (this.commandHandler) {
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            this.commandHandler.select([this.prevSource.id]);
            // tslint:disable-next-line:max-line-length
            var deltaValues = this.updateSize(this.prevSource, this.currentPosition, this.initialPosition, this.corner, this.initialBounds);
            this.blocked = this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.currentPosition, this.initialPosition, this.prevSource);
            this.commandHandler.renderSelector(this.prevPageId);
            if (this.commandHandler.annotation) {
                // tslint:disable-next-line
                var newObject = {
                    bounds: {
                        x: args.source.wrapper.offsetX, y: args.source.wrapper.offsetY,
                        width: args.source.wrapper.actualSize.width, height: args.source.wrapper.actualSize.height
                    }
                };
                if (isLineShapes(args.source)) {
                    newObject.vertexPoints = args.source.vertexPoints;
                    newObject.leaderHeight = args.source.leaderHeight;
                }
                if (this.prevSource.measureType === 'Radius') {
                    newObject.notes = args.source.notes;
                    this.commandHandler.annotation.updateCalibrateValues(this.prevSource);
                }
                // tslint:disable-next-line
                if (this.prevSource.shapeAnnotationType === 'FreeText' && this.commandHandler.selectedItems.annotations && this.commandHandler.selectedItems.annotations.length > 0) {
                    this.commandHandler.nodePropertyChange(this.commandHandler.selectedItems.annotations[0], {});
                }
                // tslint:disable-next-line
                this.commandHandler.annotation.addAction(this.pageIndex, null, this.prevSource, 'Resize', '', this.redoElement, newObject);
            }
            this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, this.prevSource.id, 'Resize');
        }
        _super.prototype.mouseUp.call(this, args);
        return !this.blocked;
    };
    /**   @private  */
    ResizeTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = args.source;
        this.currentPosition = args.position;
        var x = this.currentPosition.x - this.startPosition.x;
        var y = this.currentPosition.y - this.startPosition.y;
        x = x / this.commandHandler.viewerBase.getZoomFactor();
        y = y / this.commandHandler.viewerBase.getZoomFactor();
        var changes = { x: x, y: y };
        changes = rotatePoint(-this.currentElement.wrapper.rotateAngle, undefined, undefined, changes);
        var sx = (this.currentElement.wrapper.actualSize.width + changes.x) / this.currentElement.wrapper.actualSize.width;
        var sy = (this.currentElement.wrapper.actualSize.height + changes.y) / this.currentElement.wrapper.actualSize.height;
        changes = this.getChanges(changes);
        if (!this.helper) {
            // tslint:disable-next-line
            var cobject = cloneObject(this.commandHandler.selectedItems.annotations[0]);
            cobject.id = 'diagram_helper';
            if (cobject.shapeAnnotationType === 'Stamp') {
                cobject.strokeColor = '';
                cobject.borderDashArray = '';
                cobject.fillColor = 'transparent';
                cobject.stampFillColor = 'transparent';
                cobject.data = '';
            }
            else if (cobject.shapeAnnotationType === 'FreeText') {
                cobject.strokeColor = 'blue';
                cobject.fillColor = 'transparent';
                cobject.thickness = 1;
                cobject.opacity = 1;
                cobject.dynamicText = '';
            }
            else {
                cobject.bounds = this.commandHandler.selectedItems.annotations[0].wrapper.bounds;
                cobject.strokeColor = 'red';
                cobject.borderDashArray = '5,5';
                cobject.fillColor = 'transparent';
                cobject.thickness = 2;
                cobject.opacity = 1;
            }
            if (cobject.enableShapeLabel === true) {
                cobject.labelContent = '';
            }
            this.helper = cobject = this.commandHandler.add(cobject);
            this.commandHandler.selectedItems.annotations = [cobject];
        }
        var deltaValues = this.updateSize(this.helper, this.startPosition, this.currentPosition, this.corner, this.initialBounds);
        this.blocked = !(this.scaleObjects(deltaValues.width, deltaValues.height, this.corner, this.startPosition, this.currentPosition, this.helper));
        this.prevPosition = this.currentPosition;
        return !this.blocked;
    };
    /**   @private  */
    ResizeTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    ResizeTool.prototype.getTooltipContent = function (pdfAnnotationBaseModel) {
        // tslint:disable-next-line:max-line-length
        return 'W:' + Math.round(pdfAnnotationBaseModel.wrapper.bounds.width) + ' ' + 'H:' + Math.round(pdfAnnotationBaseModel.wrapper.bounds.height);
    };
    ResizeTool.prototype.getChanges = function (change) {
        switch (this.corner) {
            case 'ResizeEast':
                return { x: change.x, y: 0 };
            case 'ResizeSouthEast':
                return change;
            case 'ResizeSouth':
                return { x: 0, y: change.y };
            case 'ResizeNorth':
                return { x: 0, y: -change.y };
            case 'ResizeNorthEast':
                return { x: change.x, y: -change.y };
            case 'ResizeNorthWest':
                return { x: -change.x, y: -change.y };
            case 'ResizeWest':
                return { x: -change.x, y: 0 };
            case 'ResizeSouthWest':
                return { x: -change.x, y: change.y };
        }
        return change;
    };
    /**
     * Updates the size with delta width and delta height using scaling.
     */
    /**
     * Aspect ratio used to resize the width or height based on resizing the height or width
     */
    ResizeTool.prototype.scaleObjects = function (deltaWidth, deltaHeight, corner, startPoint, endPoint, source) {
        if (source instanceof Selector && source.annotations.length === 1 &&
            // tslint:disable-next-line:max-line-length
            (source.annotations[0].shapeAnnotationType === 'Perimeter' || source.annotations[0].shapeAnnotationType === 'Radius' || source.shapeAnnotationType === 'Stamp')) {
            if (!(deltaHeight === 1 && deltaWidth === 1)) {
                deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
            }
            else if (startPoint !== endPoint) {
                deltaHeight = deltaWidth = Math.max(deltaHeight, deltaWidth);
            }
            else {
                deltaHeight = deltaWidth = 0;
            }
        }
        else {
            // tslint:disable-next-line:max-line-length
            if (source.shapeAnnotationType === 'Perimeter' || source.shapeAnnotationType === 'Radius'
                || source.shapeAnnotationType === 'Stamp') {
                if (!(deltaHeight === 1 && deltaWidth === 1)) {
                    deltaHeight = deltaWidth = Math.max(deltaHeight === 1 ? 0 : deltaHeight, deltaWidth === 1 ? 0 : deltaWidth);
                }
            }
        }
        var oldValue = {
            offsetX: source.wrapper.offsetX, offsetY: source.wrapper.offsetY,
        };
        this.blocked = this.commandHandler.scaleSelectedItems(deltaWidth, deltaHeight, this.getPivot(this.corner));
        return this.blocked;
    };
    return ResizeTool;
}(ToolBase));
export { ResizeTool };
/**
 * Draws a node that is defined by the user

 */
var NodeDrawingTool = /** @class */ (function (_super) {
    __extends(NodeDrawingTool, _super);
    function NodeDrawingTool(commandHandler, base, sourceObject) {
        var _this = _super.call(this, commandHandler, base) || this;
        _this.sourceObject = sourceObject;
        return _this;
    }
    /**   @private  */
    NodeDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        var node = {
            bounds: { x: 100, y: 300, width: 100, height: 100 },
            pageIndex: 0, strokeColor: 'red', thickness: 3
        };
        node.id = randomId();
        this.sourceObject.pageIndex = node.pageIndex = this.pdfViewerBase.activeElements.activePageID || 0;
        this.sourceObject.enableShapeLabel = this.commandHandler.enableShapeLabel;
        this.pdfViewerBase.updateFreeTextProperties(this.sourceObject);
        // tslint:disable-next-line
        this.commandHandler.drawingObject = this.drawingObject = this.commandHandler.add(this.sourceObject || node);
    };
    /**   @private  */
    NodeDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            this.dragging = true;
            var rect = Rect.toBounds([this.prevPosition, this.currentPosition]);
            this.updateNodeDimension(this.drawingObject, rect);
            if (this.drawingObject.shapeAnnotationType === 'Radius') {
                this.updateRadiusLinePosition(this.drawingObject.wrapper.children[1], this.drawingObject);
            }
        }
        return true;
    };
    /**   @private  */
    NodeDrawingTool.prototype.mouseUp = function (args) {
        if (this.drawingObject && this.dragging) {
            this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
            this.commandHandler.select([this.drawingObject.id]);
            this.commandHandler.annotation.updateCalibrateValues(this.drawingObject);
            if (this.commandHandler) {
                // tslint:disable-next-line
                this.commandHandler.annotation.addAction(this.pageIndex, null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
            }
            this.drawingObject = null;
            this.dragging = false;
            _super.prototype.mouseUp.call(this, args);
            this.inAction = false;
        }
    };
    /**   @private  */
    NodeDrawingTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    /**   @private  */
    NodeDrawingTool.prototype.updateNodeDimension = function (obj, rect) {
        var zoom = this.commandHandler.viewerBase.getZoomFactor();
        obj.bounds.x = (rect.x / zoom) + rect.width / zoom;
        obj.bounds.y = (rect.y / zoom) + rect.height / zoom;
        obj.bounds.width = rect.width / zoom;
        obj.bounds.height = rect.height / zoom;
        this.commandHandler.nodePropertyChange(obj, { bounds: obj.bounds });
    };
    /**   @private  */
    NodeDrawingTool.prototype.updateRadiusLinePosition = function (obj, node) {
        var trasPoint = { x: node.bounds.x + (node.bounds.width / 4), y: node.bounds.y };
        var center = { x: (node.bounds.x + (node.bounds.width / 2)), y: (node.bounds.y + (node.bounds.height / 2)) };
        var matrix = identityMatrix();
        rotateMatrix(matrix, node.rotateAngle, center.x, center.y);
        var rotatedPoint = transformPointByMatrix(matrix, trasPoint);
        var newPoint1 = { x: rotatedPoint.x, y: rotatedPoint.y };
        obj.offsetX = newPoint1.x;
        obj.offsetY = newPoint1.y;
        obj.width = node.bounds.width / 2;
        this.commandHandler.renderDrawing(undefined, node.pageIndex);
    };
    return NodeDrawingTool;
}(ToolBase));
export { NodeDrawingTool };
/**
 * Draws a Polygon shape node dynamically using polygon Tool

 */
var PolygonDrawingTool = /** @class */ (function (_super) {
    __extends(PolygonDrawingTool, _super);
    function PolygonDrawingTool(commandHandler, base, action) {
        var _this = _super.call(this, commandHandler, base) || this;
        _this.action = action;
        return _this;
    }
    /**   @private  */
    PolygonDrawingTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
        if (!this.drawingObject) {
            this.startPoint = { x: this.startPosition.x, y: this.startPosition.y };
            var nodeAnnotElement = {
                bounds: {
                    x: this.currentPosition.x,
                    y: this.currentPosition.y, width: 5, height: 5
                    // tslint:disable-next-line:max-line-length
                }, vertexPoints: [{ x: this.startPoint.x / this.pdfViewerBase.getZoomFactor(), y: this.startPoint.y / this.pdfViewerBase.getZoomFactor() }, { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(), y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                shapeAnnotationType: 'Line', fillColor: this.commandHandler.drawingObject.fillColor,
                strokeColor: this.commandHandler.drawingObject.strokeColor, pageIndex: this.pdfViewerBase.activeElements.activePageID,
                // tslint:disable-next-line:max-line-length
                notes: this.commandHandler.drawingObject.notes, thickness: this.commandHandler.drawingObject.thickness, author: this.commandHandler.drawingObject.author,
                subject: this.commandHandler.drawingObject.subject, borderDashArray: this.commandHandler.drawingObject.borderDashArray,
                modifiedDate: this.commandHandler.drawingObject.modifiedDate, borderStyle: this.commandHandler.drawingObject.borderStyle,
                measureType: this.commandHandler.drawingObject.measureType, enableShapeLabel: this.commandHandler.enableShapeLabel
            };
            this.pdfViewerBase.updateFreeTextProperties(nodeAnnotElement);
            // tslint:disable-next-line
            this.drawingObject = this.commandHandler.add(nodeAnnotElement);
        }
        else {
            var pt = void 0;
            var obj = (this.drawingObject);
            pt = obj.vertexPoints[obj.vertexPoints.length - 1];
            pt = { x: pt.x, y: pt.y };
            var lastPoint = this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1];
            if (!(lastPoint.x === pt.x && lastPoint.x === pt.y)) {
                this.drawingObject.vertexPoints.push(pt);
            }
            this.commandHandler.nodePropertyChange(obj, { vertexPoints: obj.vertexPoints });
        }
    };
    /**   @private  */
    PolygonDrawingTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            this.dragging = true;
            var obj = (this.drawingObject);
            if (this.drawingObject && this.currentPosition) {
                obj.vertexPoints[obj.vertexPoints.length - 1].x = this.currentPosition.x / this.pdfViewerBase.getZoomFactor();
                obj.vertexPoints[obj.vertexPoints.length - 1].y = this.currentPosition.y / this.pdfViewerBase.getZoomFactor();
                this.commandHandler.nodePropertyChange(obj, { vertexPoints: obj.vertexPoints });
            }
            if (obj.measureType === 'Perimeter') {
                updatePerimeterLabel(obj, obj.vertexPoints, this.commandHandler.annotation.measureAnnotationModule);
            }
        }
        return true;
    };
    /**   @private  */
    PolygonDrawingTool.prototype.mouseUp = function (args, isDoubleClineck, isMouseLeave) {
        _super.prototype.mouseMove.call(this, args);
        if (this.drawingObject) {
            // tslint:disable-next-line:max-line-length
            var bounds = new Rect(this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1].x - 20, this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1].y - 20, 40, 40);
            var point = { x: this.drawingObject.vertexPoints[0].x, y: this.drawingObject.vertexPoints[0].y };
            if ((bounds.containsPoint(point) || isDoubleClineck) && this.dragging) {
                if (this.inAction) {
                    this.inAction = false;
                    if (this.drawingObject) {
                        if (!isMouseLeave) {
                            if (this.drawingObject.vertexPoints.length > 2) {
                                this.drawingObject.vertexPoints.splice(this.drawingObject.vertexPoints.length - 1, 1);
                            }
                        }
                        if (this.action === 'Polygon') {
                            if (!isMouseLeave) {
                                // tslint:disable-next-line:max-line-length
                                this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length - 1] = this.drawingObject.vertexPoints[0];
                            }
                            else {
                                // tslint:disable-next-line:max-line-length
                                this.drawingObject.vertexPoints[this.drawingObject.vertexPoints.length] = this.drawingObject.vertexPoints[0];
                            }
                            this.commandHandler.nodePropertyChange(this.drawingObject, { vertexPoints: this.drawingObject.vertexPoints });
                            var cobject = cloneObject(this.drawingObject);
                            cobject.shapeAnnotationType = 'Polygon';
                            cobject.bounds.width = cobject.wrapper.actualSize.width;
                            cobject.bounds.height = cobject.wrapper.actualSize.height;
                            cobject.bounds.x = this.drawingObject.wrapper.bounds.x;
                            cobject.bounds.y = this.drawingObject.wrapper.bounds.y;
                            this.commandHandler.add(cobject);
                            this.commandHandler.remove(this.drawingObject);
                            this.commandHandler.select([cobject.id]);
                            var drawingObject = this.commandHandler.selectedItems.annotations[0];
                            // tslint:disable-next-line:max-line-length
                            if (this.commandHandler.enableShapeAnnotation && (isNullOrUndefined(drawingObject.measureType) || drawingObject.measureType === '')) {
                                this.commandHandler.annotation.shapeAnnotationModule.renderShapeAnnotations(drawingObject, drawingObject.pageIndex);
                            }
                            // tslint:disable-next-line:max-line-length
                            if (this.commandHandler.enableMeasureAnnotation && (drawingObject.measureType === 'Area' || drawingObject.measureType === 'Volume')) {
                                if (drawingObject.measureType === 'Area') {
                                    // tslint:disable-next-line:max-line-length
                                    drawingObject.notes = this.commandHandler.annotation.measureAnnotationModule.calculateArea(drawingObject.vertexPoints);
                                    this.commandHandler.annotation.stickyNotesAnnotationModule.addTextToComments(drawingObject.annotName, drawingObject.notes);
                                }
                                else if (drawingObject.measureType === 'Volume') {
                                    // tslint:disable-next-line:max-line-length
                                    drawingObject.notes = this.commandHandler.annotation.measureAnnotationModule.calculateVolume(drawingObject.vertexPoints);
                                    this.commandHandler.annotation.stickyNotesAnnotationModule.addTextToComments(drawingObject.annotName, drawingObject.notes);
                                }
                                // tslint:disable-next-line:max-line-length
                                this.commandHandler.annotation.measureAnnotationModule.renderMeasureShapeAnnotations(drawingObject, drawingObject.pageIndex);
                            }
                            // tslint:disable-next-line
                            var setting = {
                                opacity: drawingObject.opacity, fillColor: drawingObject.fillColor, strokeColor: drawingObject.strokeColor,
                                thickness: drawingObject.thickness, author: drawingObject.author, subject: drawingObject.subject,
                                modifiedDate: drawingObject.modifiedDate, borderDashArray: drawingObject.borderDashArray,
                                lineHeadStartStyle: this.commandHandler.annotation.getArrowString(drawingObject.sourceDecoraterShapes),
                                lineHeadEndStyle: this.commandHandler.annotation.getArrowString(drawingObject.taregetDecoraterShapes)
                            };
                            // tslint:disable-next-line
                            var bounds_1 = { left: drawingObject.bounds.x, top: drawingObject.bounds.y, width: drawingObject.bounds.width, height: drawingObject.bounds.height };
                            // tslint:disable-next-line:max-line-length
                            this.commandHandler.fireAnnotationAdd(drawingObject.pageIndex, drawingObject.annotName, this.commandHandler.annotation.getAnnotationType(drawingObject.shapeAnnotationType, drawingObject.measureType), bounds_1, setting);
                        }
                        else {
                            if (!isMouseLeave) {
                                if (isDoubleClineck) {
                                    this.drawingObject.vertexPoints.splice(this.drawingObject.vertexPoints.length - 1, 1);
                                }
                            }
                            this.commandHandler.nodePropertyChange(this.drawingObject, {
                                // tslint:disable-next-line:max-line-length
                                vertexPoints: this.drawingObject.vertexPoints, sourceDecoraterShapes: this.commandHandler.drawingObject.sourceDecoraterShapes,
                                taregetDecoraterShapes: this.commandHandler.drawingObject.taregetDecoraterShapes
                            });
                            this.commandHandler.select([this.drawingObject.id]);
                            if (this.commandHandler.enableMeasureAnnotation && this.drawingObject.measureType === 'Perimeter') {
                                this.commandHandler.renderDrawing(null, this.drawingObject.pageIndex);
                                // tslint:disable-next-line:max-line-length
                                this.drawingObject.notes = this.commandHandler.annotation.measureAnnotationModule.calculatePerimeter(this.drawingObject);
                                this.commandHandler.annotation.stickyNotesAnnotationModule.addTextToComments(this.drawingObject.annotName, this.drawingObject.notes);
                                // tslint:disable-next-line:max-line-length
                                this.commandHandler.annotation.measureAnnotationModule.renderMeasureShapeAnnotations(this.drawingObject, this.drawingObject.pageIndex);
                                var drawingObject = this.commandHandler.selectedItems.annotations[0];
                                // tslint:disable-next-line
                                var setting = {
                                    opacity: drawingObject.opacity, fillColor: drawingObject.fillColor, strokeColor: drawingObject.strokeColor,
                                    thickness: drawingObject.thickness, author: drawingObject.author, subject: drawingObject.subject,
                                    modifiedDate: drawingObject.modifiedDate, borderDashArray: drawingObject.borderDashArray,
                                    lineHeadStartStyle: this.commandHandler.annotation.getArrowString(drawingObject.sourceDecoraterShapes),
                                    lineHeadEndStyle: this.commandHandler.annotation.getArrowString(drawingObject.taregetDecoraterShapes)
                                };
                                // tslint:disable-next-line
                                var bounds_2 = { left: drawingObject.bounds.x, top: drawingObject.bounds.y, width: drawingObject.bounds.width, height: drawingObject.bounds.height };
                                // tslint:disable-next-line:max-line-length
                                this.commandHandler.fireAnnotationAdd(drawingObject.pageIndex, drawingObject.annotName, this.commandHandler.annotation.getAnnotationType(drawingObject.shapeAnnotationType, drawingObject.measureType), bounds_2, setting);
                            }
                        }
                        // tslint:disable-next-line
                        this.commandHandler.annotation.addAction(this.pageIndex, null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
                        this.drawingObject = null;
                    }
                }
                this.endAction();
            }
            else if (this.inAction && !this.dragging) {
                this.commandHandler.remove(this.drawingObject);
            }
        }
    };
    /**   @private  */
    PolygonDrawingTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args, true, true);
    };
    /**   @private  */
    PolygonDrawingTool.prototype.mouseWheel = function (args) {
        _super.prototype.mouseWheel.call(this, args);
        this.mouseMove(args);
    };
    /**   @private  */
    PolygonDrawingTool.prototype.endAction = function () {
        this.inAction = false;
        this.drawingObject = null;
        this.commandHandler.tool = '';
    };
    return PolygonDrawingTool;
}(ToolBase));
export { PolygonDrawingTool };
/**
 * Helps to edit the selected connectors

 */
var LineTool = /** @class */ (function (_super) {
    __extends(LineTool, _super);
    function LineTool(commandHandler, base, endPoint, drawingObject) {
        var _this = _super.call(this, commandHandler, base, true) || this;
        _this.endPoint = endPoint;
        _this.drawingObject = drawingObject;
        return _this;
    }
    /**   @private  */
    LineTool.prototype.mouseDown = function (args) {
        this.inAction = true;
        this.undoElement = undefined;
        _super.prototype.mouseDown.call(this, args);
        var oldPointValue;
        var connectorsShape;
        if (args.source && args.source.annotations) {
            oldPointValue = { x: this.prevPosition.x, y: this.prevPosition.y };
            connectorsShape = this.drawingObject;
        }
        this.initialPosition = args.position;
        this.prevSource = this.drawingObject;
        this.currentPosition = args.position;
        if (!this.drawingObject) {
            var measureModule = this.commandHandler.annotation.measureAnnotationModule;
            var annotationNode = {
                // tslint:disable-next-line:max-line-length
                vertexPoints: [{ x: this.startPosition.x / this.pdfViewerBase.getZoomFactor(), y: this.startPosition.y / this.pdfViewerBase.getZoomFactor() }, { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(), y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                bounds: {
                    x: this.currentPosition.x,
                    y: this.currentPosition.y, width: 5, height: 5
                }, sourceDecoraterShapes: this.commandHandler.drawingObject.sourceDecoraterShapes,
                taregetDecoraterShapes: this.commandHandler.drawingObject.taregetDecoraterShapes, measureType: 'Distance',
                // tslint:disable-next-line:max-line-length
                fillColor: this.commandHandler.drawingObject.fillColor, notes: this.commandHandler.drawingObject.notes, strokeColor: this.commandHandler.drawingObject.strokeColor,
                opacity: this.commandHandler.drawingObject.opacity, thickness: this.commandHandler.drawingObject.thickness, borderDashArray: this.commandHandler.drawingObject.borderDashArray,
                // tslint:disable-next-line:max-line-length
                shapeAnnotationType: 'Distance', pageIndex: this.pdfViewerBase.activeElements.activePageID,
                author: this.commandHandler.drawingObject.author, subject: this.commandHandler.drawingObject.subject,
                enableShapeLabel: this.commandHandler.enableShapeLabel
            };
            this.pdfViewerBase.updateFreeTextProperties(annotationNode);
            // tslint:disable-next-line
            this.drawingObject = this.commandHandler.add(annotationNode);
        }
        else if (!this.dragging) {
            var nodeAnnot = {
                bounds: {
                    x: this.currentPosition.x,
                    y: this.currentPosition.y, width: 5, height: 5
                    // tslint:disable-next-line:max-line-length
                }, vertexPoints: [{ x: this.startPosition.x / this.pdfViewerBase.getZoomFactor(), y: this.startPosition.y / this.pdfViewerBase.getZoomFactor() }, { x: this.currentPosition.x / this.pdfViewerBase.getZoomFactor(), y: this.currentPosition.y / this.pdfViewerBase.getZoomFactor() }],
                // tslint:disable-next-line:max-line-length
                shapeAnnotationType: this.drawingObject.shapeAnnotationType, sourceDecoraterShapes: this.drawingObject.sourceDecoraterShapes,
                taregetDecoraterShapes: this.drawingObject.taregetDecoraterShapes, fillColor: this.drawingObject.fillColor,
                strokeColor: this.drawingObject.strokeColor, pageIndex: this.pdfViewerBase.activeElements.activePageID,
                // tslint:disable-next-line:max-line-length
                opacity: this.drawingObject.opacity || 1, borderDashArray: this.drawingObject.borderDashArray, thickness: this.drawingObject.thickness,
                modifiedDate: this.drawingObject.modifiedDate, author: this.drawingObject.author, subject: this.drawingObject.subject,
                lineHeadEnd: this.drawingObject.lineHeadEnd, lineHeadStart: this.drawingObject.lineHeadStart,
                measureType: this.commandHandler.drawingObject.measureType, enableShapeLabel: this.commandHandler.enableShapeLabel
            };
            this.pdfViewerBase.updateFreeTextProperties(nodeAnnot);
            // tslint:disable-next-line
            this.drawingObject = this.commandHandler.add(nodeAnnot);
        }
    };
    /**   @private  */
    LineTool.prototype.mouseUp = function (args) {
        if (this.dragging) {
            _super.prototype.mouseMove.call(this, args);
            if (this.commandHandler) {
                var node = this.drawingObject;
                this.commandHandler.nodePropertyChange(node, { vertexPoints: node.vertexPoints, leaderHeight: node.leaderHeight });
                this.commandHandler.clearSelection(this.pdfViewerBase.activeElements.activePageID);
                this.commandHandler.select([node.id]);
                this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
            }
            if (this.endPoint && this.endPoint.indexOf('ConnectorSegmentPoint') > -1 && this.dragging) {
                this.commandHandler.annotation.updateCalibrateValues(this.drawingObject);
                // tslint:disable-next-line
                this.commandHandler.annotation.addAction(this.pageIndex, null, this.drawingObject, 'Addition', '', this.drawingObject, this.drawingObject);
                this.drawingObject = null;
                this.dragging = false;
                _super.prototype.mouseUp.call(this, args);
            }
            if (this.drawingObject) {
                this.endPoint = 'ConnectorSegmentPoint_1';
            }
        }
        else {
            if (this.drawingObject) {
                this.commandHandler.remove(this.drawingObject);
            }
        }
    };
    /**   @private  */
    LineTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        if (this.inAction && Point.equals(this.currentPosition, this.prevPosition) === false) {
            var connector = void 0;
            this.currentPosition = args.position;
            this.dragging = true;
            if (this.currentPosition && this.prevPosition) {
                var diffX = this.currentPosition.x - this.prevPosition.x;
                var diffY = this.currentPosition.y - this.prevPosition.y;
                var newValue = void 0;
                var oldValue = void 0;
                connector = this.drawingObject;
                var targetPortId = void 0;
                var targetPdfAnnotationBaseModelId = void 0;
                // tslint:disable-next-line:max-line-length
                if (this.inAction && this.commandHandler && this.drawingObject && this.endPoint !== undefined && diffX !== 0 || diffY !== 0) {
                    this.blocked = !this.commandHandler.dragConnectorEnds(this.endPoint, this.drawingObject, this.currentPosition, this.selectedSegment, args.target);
                    this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
                }
            }
            this.prevPosition = this.currentPosition;
        }
        return !this.blocked;
    };
    /**   @private  */
    LineTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    LineTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
        this.prevPosition = null;
        this.endPoint = null;
    };
    return LineTool;
}(ToolBase));
export { LineTool };
/**
 * Rotates the selected objects

 */
var RotateTool = /** @class */ (function (_super) {
    __extends(RotateTool, _super);
    function RotateTool(commandHandler, base) {
        return _super.call(this, commandHandler, base, true) || this;
    }
    /**   @private  */
    RotateTool.prototype.mouseDown = function (args) {
        this.undoElement = cloneObject(args.source);
        _super.prototype.mouseDown.call(this, args);
    };
    /**   @private  */
    RotateTool.prototype.mouseUp = function (args) {
        var object;
        object = args.source;
        if (this.undoElement.rotateAngle !== object.wrapper.rotateAngle) {
            var oldValue = { rotateAngle: object.wrapper.rotateAngle };
            var obj = void 0;
            obj = cloneObject(args.source);
            this.commandHandler.renderSelector(this.pdfViewerBase.activeElements.activePageID);
        }
        this.commandHandler.annotation.stampAnnotationModule.updateSessionStorage(args.source, null, 'Rotate');
        _super.prototype.mouseUp.call(this, args);
    };
    /**   @private  */
    RotateTool.prototype.mouseMove = function (args) {
        _super.prototype.mouseMove.call(this, args);
        var object;
        object = args.source;
        this.currentPosition = args.position;
        if (object.wrapper) {
            var refPoint = { x: object.wrapper.offsetX, y: object.wrapper.offsetY };
            var angle = Point.findAngle(refPoint, this.currentPosition) + 90;
            angle = (angle + 360) % 360;
            var oldValue = { rotateAngle: object.wrapper.rotateAngle };
            var newValue = { rotateAngle: angle };
            this.blocked = !(this.commandHandler.rotate(angle - object.wrapper.rotateAngle));
        }
        return !this.blocked;
    };
    RotateTool.prototype.getTooltipContent = function (node) {
        return Math.round((node.rotateAngle % 360)).toString() + '\xB0';
    };
    /**   @private  */
    RotateTool.prototype.mouseLeave = function (args) {
        this.mouseUp(args);
    };
    /**   @private  */
    RotateTool.prototype.endAction = function () {
        _super.prototype.endAction.call(this);
    };
    return RotateTool;
}(ToolBase));
export { RotateTool };
