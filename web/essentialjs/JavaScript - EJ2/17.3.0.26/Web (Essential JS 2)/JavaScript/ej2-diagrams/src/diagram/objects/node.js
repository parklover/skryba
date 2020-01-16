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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path='./node-base-model.d.ts'/>
import { Property, Complex, Collection, ChildProperty, ComplexFactory } from '@syncfusion/ej2-base';
import { ShapeStyle, Margin, TextStyle, Shadow } from '../core/appearance';
import { Point } from '../primitives/point';
import { Size } from '../primitives/size';
import { ElementAction } from '../enum/enum';
import { Container } from '../core/containers/container';
import { Canvas } from '../core/containers/canvas';
import { getBasicShape } from './dictionary/basic-shapes';
import { DiagramElement } from '../core/elements/diagram-element';
import { PathElement } from '../core/elements/path-element';
import { TextElement } from '../core/elements/text-element';
import { ImageElement } from '../core/elements/image-element';
import { DiagramNativeElement } from '../core/elements/native-element';
import { PointPort } from './port';
import { SelectorConstraints } from '../enum/enum';
import { Annotation, ShapeAnnotation } from './annotation';
import { getPortShape, getIconShape } from './dictionary/common';
import { getFlowShape } from './dictionary/flow-shapes';
import { NodeConstraints } from '../enum/enum';
import { checkPortRestriction, setUMLActivityDefaults, getUMLActivityShapes, updatePortEdges } from './../utility/diagram-util';
import { setSwimLaneDefaults } from './../utility/diagram-util';
import { randomId, getFunction } from './../utility/base-util';
import { NodeBase } from './node-base';
import { canShadow } from './../utility/constraints-util';
import { PortVisibility } from '../enum/enum';
import { measurePath } from './../utility/dom-util';
import { getPolygonPath } from './../utility/path-util';
import { DiagramHtmlElement } from '../core/elements/html-element';
import { StackPanel } from '../core/containers/stack-panel';
import { GridPanel } from '../core/containers/grid';
import { getULMClassifierShapes } from '../utility/uml-util';
import { initSwimLane } from './../utility/swim-lane-util';
import { Connector } from './connector';
import { UserHandle } from '../interaction/selector';
var getShapeType = function (obj) {
    if (obj) {
        switch (obj.type) {
            case 'Basic':
                return BasicShape;
            case 'Flow':
                return FlowShape;
            case 'Path':
                return Path;
            case 'Image':
                return Image;
            case 'Text':
                return Text;
            case 'Bpmn':
                return BpmnShape;
            case 'Native':
                return Native;
            case 'HTML':
                return Html;
            case 'UmlActivity':
                return UmlActivityShape;
            case 'UmlClassifier':
                return UmlClassifierShape;
            case 'SwimLane':
                return SwimLane;
            default:
                return BasicShape;
        }
    }
    return BasicShape;
};
/**
 * Defines the behavior of default shape
 */
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Basic')
    ], Shape.prototype, "type", void 0);
    return Shape;
}(ChildProperty));
export { Shape };
/**
 * Defines the behavior of path shape
 */
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Path
     */
    Path.prototype.getClassName = function () {
        return 'Path';
    };
    __decorate([
        Property('Path')
    ], Path.prototype, "type", void 0);
    __decorate([
        Property('')
    ], Path.prototype, "data", void 0);
    return Path;
}(Shape));
export { Path };
/**
 * Defines the behavior of Native shape
 */
var Native = /** @class */ (function (_super) {
    __extends(Native, _super);
    function Native() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Native
     */
    Native.prototype.getClassName = function () {
        return 'Native';
    };
    __decorate([
        Property('Native')
    ], Native.prototype, "type", void 0);
    __decorate([
        Property('')
    ], Native.prototype, "content", void 0);
    __decorate([
        Property('Stretch')
    ], Native.prototype, "scale", void 0);
    return Native;
}(Shape));
export { Native };
/**
 * Defines the behavior of html shape
 */
var Html = /** @class */ (function (_super) {
    __extends(Html, _super);
    function Html() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Html
     */
    Html.prototype.getClassName = function () {
        return 'Html';
    };
    __decorate([
        Property('HTML')
    ], Html.prototype, "type", void 0);
    __decorate([
        Property('')
    ], Html.prototype, "content", void 0);
    return Html;
}(Shape));
export { Html };
/**
 * Defines the behavior of image shape
 */
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Image
     */
    Image.prototype.getClassName = function () {
        return 'Image';
    };
    __decorate([
        Property('Image')
    ], Image.prototype, "type", void 0);
    __decorate([
        Property('')
    ], Image.prototype, "source", void 0);
    __decorate([
        Property('None')
    ], Image.prototype, "scale", void 0);
    __decorate([
        Property('None')
    ], Image.prototype, "align", void 0);
    return Image;
}(Shape));
export { Image };
/**
 * Defines the behavior of the text shape
 */
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Text
     */
    Text.prototype.getClassName = function () {
        return 'Text';
    };
    __decorate([
        Property('Text')
    ], Text.prototype, "type", void 0);
    __decorate([
        Property('')
    ], Text.prototype, "content", void 0);
    __decorate([
        Complex({}, Margin)
    ], Text.prototype, "margin", void 0);
    return Text;
}(Shape));
export { Text };
/**
 * Defines the behavior of the basic shape
 */
var BasicShape = /** @class */ (function (_super) {
    __extends(BasicShape, _super);
    function BasicShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BasicShape
     */
    BasicShape.prototype.getClassName = function () {
        return 'BasicShape';
    };
    __decorate([
        Property('Basic')
    ], BasicShape.prototype, "type", void 0);
    __decorate([
        Property('Rectangle')
    ], BasicShape.prototype, "shape", void 0);
    __decorate([
        Property(0)
    ], BasicShape.prototype, "cornerRadius", void 0);
    __decorate([
        Collection([], Point)
    ], BasicShape.prototype, "points", void 0);
    return BasicShape;
}(Shape));
export { BasicShape };
/**
 * Defines the behavior of the flow shape
 */
var FlowShape = /** @class */ (function (_super) {
    __extends(FlowShape, _super);
    function FlowShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class FlowShape
     */
    FlowShape.prototype.getClassName = function () {
        return 'FlowShape';
    };
    __decorate([
        Property('Flow')
    ], FlowShape.prototype, "type", void 0);
    __decorate([
        Property('Terminator')
    ], FlowShape.prototype, "shape", void 0);
    return FlowShape;
}(Shape));
export { FlowShape };
/**
 * Defines the behavior of the bpmn gateway shape
 */
var BpmnGateway = /** @class */ (function (_super) {
    __extends(BpmnGateway, _super);
    function BpmnGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnGateway
     */
    BpmnGateway.prototype.getClassName = function () {
        return 'BpmnGateway';
    };
    __decorate([
        Property('None')
    ], BpmnGateway.prototype, "type", void 0);
    return BpmnGateway;
}(ChildProperty));
export { BpmnGateway };
/**
 * Defines the behavior of the bpmn data object
 */
var BpmnDataObject = /** @class */ (function (_super) {
    __extends(BpmnDataObject, _super);
    function BpmnDataObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnDataObject
     */
    BpmnDataObject.prototype.getClassName = function () {
        return 'BpmnDataObject';
    };
    __decorate([
        Property('None')
    ], BpmnDataObject.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], BpmnDataObject.prototype, "collection", void 0);
    return BpmnDataObject;
}(ChildProperty));
export { BpmnDataObject };
/**
 * Defines the behavior of the bpmn task shape
 */
var BpmnTask = /** @class */ (function (_super) {
    __extends(BpmnTask, _super);
    function BpmnTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('None')
    ], BpmnTask.prototype, "type", void 0);
    __decorate([
        Property('None')
    ], BpmnTask.prototype, "loop", void 0);
    __decorate([
        Property(false)
    ], BpmnTask.prototype, "call", void 0);
    __decorate([
        Property(false)
    ], BpmnTask.prototype, "compensation", void 0);
    return BpmnTask;
}(ChildProperty));
export { BpmnTask };
/**
 * Defines the behavior of the bpmn Event shape
 */
var BpmnEvent = /** @class */ (function (_super) {
    __extends(BpmnEvent, _super);
    function BpmnEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnEvent
     */
    BpmnEvent.prototype.getClassName = function () {
        return 'BpmnEvent';
    };
    __decorate([
        Property('Start')
    ], BpmnEvent.prototype, "event", void 0);
    __decorate([
        Property('None')
    ], BpmnEvent.prototype, "trigger", void 0);
    return BpmnEvent;
}(ChildProperty));
export { BpmnEvent };
/**
 * Defines the behavior of the bpmn sub event
 */
var BpmnSubEvent = /** @class */ (function (_super) {
    __extends(BpmnSubEvent, _super);
    function BpmnSubEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnSubEvent
     */
    BpmnSubEvent.prototype.getClassName = function () {
        return 'BpmnSubEvent';
    };
    __decorate([
        Property('None')
    ], BpmnSubEvent.prototype, "trigger", void 0);
    __decorate([
        Property('Start')
    ], BpmnSubEvent.prototype, "event", void 0);
    __decorate([
        Property('')
    ], BpmnSubEvent.prototype, "id", void 0);
    __decorate([
        Complex({}, Point)
    ], BpmnSubEvent.prototype, "offset", void 0);
    __decorate([
        Collection([], ShapeAnnotation)
    ], BpmnSubEvent.prototype, "annotations", void 0);
    __decorate([
        Collection([], PointPort)
    ], BpmnSubEvent.prototype, "ports", void 0);
    __decorate([
        Property()
    ], BpmnSubEvent.prototype, "width", void 0);
    __decorate([
        Property()
    ], BpmnSubEvent.prototype, "height", void 0);
    __decorate([
        Complex({}, Margin)
    ], BpmnSubEvent.prototype, "margin", void 0);
    __decorate([
        Property('Center')
    ], BpmnSubEvent.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Center')
    ], BpmnSubEvent.prototype, "verticalAlignment", void 0);
    __decorate([
        Property(true)
    ], BpmnSubEvent.prototype, "visible", void 0);
    return BpmnSubEvent;
}(ChildProperty));
export { BpmnSubEvent };
/**
 * Defines the behavior of the BpmnTransactionSubProcess
 */
var BpmnTransactionSubProcess = /** @class */ (function (_super) {
    __extends(BpmnTransactionSubProcess, _super);
    function BpmnTransactionSubProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ id: 'success', event: 'End', offset: { x: 1, y: 0.5 } }, BpmnSubEvent)
    ], BpmnTransactionSubProcess.prototype, "success", void 0);
    __decorate([
        Complex({ id: 'failure', event: 'Intermediate', trigger: 'Error', offset: { x: 0.25, y: 1 } }, BpmnSubEvent)
    ], BpmnTransactionSubProcess.prototype, "failure", void 0);
    __decorate([
        Complex({ id: 'cancel', event: 'Intermediate', trigger: 'Cancel', offset: { x: 0.75, y: 1 } }, BpmnSubEvent)
    ], BpmnTransactionSubProcess.prototype, "cancel", void 0);
    return BpmnTransactionSubProcess;
}(ChildProperty));
export { BpmnTransactionSubProcess };
/**
 * Defines the behavior of the BPMNSubProcess
 */
var BpmnSubProcess = /** @class */ (function (_super) {
    __extends(BpmnSubProcess, _super);
    function BpmnSubProcess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('None')
    ], BpmnSubProcess.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], BpmnSubProcess.prototype, "adhoc", void 0);
    __decorate([
        Property('Default')
    ], BpmnSubProcess.prototype, "boundary", void 0);
    __decorate([
        Property(false)
    ], BpmnSubProcess.prototype, "compensation", void 0);
    __decorate([
        Property('None')
    ], BpmnSubProcess.prototype, "loop", void 0);
    __decorate([
        Property(true)
    ], BpmnSubProcess.prototype, "collapsed", void 0);
    __decorate([
        Collection([], BpmnSubEvent)
    ], BpmnSubProcess.prototype, "events", void 0);
    __decorate([
        Complex({}, BpmnTransactionSubProcess)
    ], BpmnSubProcess.prototype, "transaction", void 0);
    __decorate([
        Property(undefined)
    ], BpmnSubProcess.prototype, "processes", void 0);
    return BpmnSubProcess;
}(ChildProperty));
export { BpmnSubProcess };
/**
 * Defines the behavior of the bpmn activity shape
 */
var BpmnActivity = /** @class */ (function (_super) {
    __extends(BpmnActivity, _super);
    function BpmnActivity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnActivity
     */
    BpmnActivity.prototype.getClassName = function () {
        return 'BpmnActivity';
    };
    __decorate([
        Property('Task')
    ], BpmnActivity.prototype, "activity", void 0);
    __decorate([
        Complex({}, BpmnTask)
    ], BpmnActivity.prototype, "task", void 0);
    __decorate([
        Complex({}, BpmnSubProcess)
    ], BpmnActivity.prototype, "subProcess", void 0);
    return BpmnActivity;
}(ChildProperty));
export { BpmnActivity };
/**
 * Defines the behavior of the bpmn annotation
 */
var BpmnAnnotation = /** @class */ (function (_super) {
    __extends(BpmnAnnotation, _super);
    // tslint:disable-next-line:no-any
    function BpmnAnnotation(parent, propName, defaultValue, isArray) {
        return _super.call(this, parent, propName, defaultValue, isArray) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnAnnotation
     */
    BpmnAnnotation.prototype.getClassName = function () {
        return 'BpmnAnnotation';
    };
    __decorate([
        Property('')
    ], BpmnAnnotation.prototype, "text", void 0);
    __decorate([
        Property('')
    ], BpmnAnnotation.prototype, "id", void 0);
    __decorate([
        Property(0)
    ], BpmnAnnotation.prototype, "angle", void 0);
    __decorate([
        Property()
    ], BpmnAnnotation.prototype, "height", void 0);
    __decorate([
        Property()
    ], BpmnAnnotation.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], BpmnAnnotation.prototype, "length", void 0);
    return BpmnAnnotation;
}(ChildProperty));
export { BpmnAnnotation };
/**
 * Defines the behavior of the bpmn shape
 */
var BpmnShape = /** @class */ (function (_super) {
    __extends(BpmnShape, _super);
    function BpmnShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class BpmnShape
     */
    BpmnShape.prototype.getClassName = function () {
        return 'BpmnShape';
    };
    __decorate([
        Property('Bpmn')
    ], BpmnShape.prototype, "type", void 0);
    __decorate([
        Property('Event')
    ], BpmnShape.prototype, "shape", void 0);
    __decorate([
        Complex({}, BpmnEvent)
    ], BpmnShape.prototype, "event", void 0);
    __decorate([
        Complex({}, BpmnGateway)
    ], BpmnShape.prototype, "gateway", void 0);
    __decorate([
        Complex({}, BpmnDataObject)
    ], BpmnShape.prototype, "dataObject", void 0);
    __decorate([
        Complex({}, BpmnActivity)
    ], BpmnShape.prototype, "activity", void 0);
    __decorate([
        Complex({}, BpmnAnnotation)
    ], BpmnShape.prototype, "annotation", void 0);
    __decorate([
        Collection([], BpmnAnnotation)
    ], BpmnShape.prototype, "annotations", void 0);
    return BpmnShape;
}(Shape));
export { BpmnShape };
/**
 * Defines the behavior of the UMLActivity shape
 */
var UmlActivityShape = /** @class */ (function (_super) {
    __extends(UmlActivityShape, _super);
    function UmlActivityShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlActivityShape
     */
    UmlActivityShape.prototype.getClassName = function () {
        return 'UmlActivityShape';
    };
    __decorate([
        Property('UmlActivity')
    ], UmlActivityShape.prototype, "type", void 0);
    __decorate([
        Property('Action')
    ], UmlActivityShape.prototype, "shape", void 0);
    return UmlActivityShape;
}(Shape));
export { UmlActivityShape };
/**
 * Defines the behavior of the uml class method
 */
var MethodArguments = /** @class */ (function (_super) {
    __extends(MethodArguments, _super);
    function MethodArguments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class MethodArguments
     */
    MethodArguments.prototype.getClassName = function () {
        return 'MethodArguments';
    };
    __decorate([
        Property('')
    ], MethodArguments.prototype, "name", void 0);
    __decorate([
        Property('')
    ], MethodArguments.prototype, "type", void 0);
    __decorate([
        Complex({}, TextStyle)
    ], MethodArguments.prototype, "style", void 0);
    return MethodArguments;
}(ChildProperty));
export { MethodArguments };
/**
 * Defines the behavior of the uml class attributes
 */
var UmlClassAttribute = /** @class */ (function (_super) {
    __extends(UmlClassAttribute, _super);
    function UmlClassAttribute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlClassAttribute
     */
    UmlClassAttribute.prototype.getClassName = function () {
        return 'UmlClassAttribute';
    };
    __decorate([
        Property('Public')
    ], UmlClassAttribute.prototype, "scope", void 0);
    __decorate([
        Property(false)
    ], UmlClassAttribute.prototype, "isSeparator", void 0);
    return UmlClassAttribute;
}(MethodArguments));
export { UmlClassAttribute };
/**
 * Defines the behavior of the uml class method
 */
var UmlClassMethod = /** @class */ (function (_super) {
    __extends(UmlClassMethod, _super);
    function UmlClassMethod() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlClassMethod
     */
    UmlClassMethod.prototype.getClassName = function () {
        return 'UmlClassMethod';
    };
    __decorate([
        Collection([], MethodArguments)
    ], UmlClassMethod.prototype, "parameters", void 0);
    return UmlClassMethod;
}(UmlClassAttribute));
export { UmlClassMethod };
/**
 * Defines the behavior of the uml class shapes
 */
var UmlClass = /** @class */ (function (_super) {
    __extends(UmlClass, _super);
    function UmlClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlClass
     */
    UmlClass.prototype.getClassName = function () {
        return 'UmlClass';
    };
    __decorate([
        Property('')
    ], UmlClass.prototype, "name", void 0);
    __decorate([
        Collection([], UmlClassAttribute)
    ], UmlClass.prototype, "attributes", void 0);
    __decorate([
        Collection([], UmlClassMethod)
    ], UmlClass.prototype, "methods", void 0);
    __decorate([
        Complex({}, TextStyle)
    ], UmlClass.prototype, "style", void 0);
    return UmlClass;
}(ChildProperty));
export { UmlClass };
/**
 * Defines the behavior of the uml interface shapes
 */
var UmlInterface = /** @class */ (function (_super) {
    __extends(UmlInterface, _super);
    function UmlInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlInterface
     */
    UmlInterface.prototype.getClassName = function () {
        return 'UmlInterface';
    };
    __decorate([
        Property(false)
    ], UmlInterface.prototype, "isSeparator", void 0);
    return UmlInterface;
}(UmlClass));
export { UmlInterface };
/**
 * Defines the behavior of the uml interface shapes
 */
var UmlEnumerationMember = /** @class */ (function (_super) {
    __extends(UmlEnumerationMember, _super);
    function UmlEnumerationMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlEnumerationMember
     */
    UmlEnumerationMember.prototype.getClassName = function () {
        return 'UmlEnumerationMember';
    };
    __decorate([
        Property('')
    ], UmlEnumerationMember.prototype, "name", void 0);
    __decorate([
        Property('')
    ], UmlEnumerationMember.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], UmlEnumerationMember.prototype, "isSeparator", void 0);
    __decorate([
        Complex({}, TextStyle)
    ], UmlEnumerationMember.prototype, "style", void 0);
    return UmlEnumerationMember;
}(ChildProperty));
export { UmlEnumerationMember };
/**
 * Defines the behavior of the uml interface shapes
 */
var UmlEnumeration = /** @class */ (function (_super) {
    __extends(UmlEnumeration, _super);
    function UmlEnumeration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlEnumeration
     */
    UmlEnumeration.prototype.getClassName = function () {
        return 'UmlEnumeration';
    };
    __decorate([
        Property('')
    ], UmlEnumeration.prototype, "name", void 0);
    __decorate([
        Collection([], UmlEnumerationMember)
    ], UmlEnumeration.prototype, "members", void 0);
    __decorate([
        Complex({}, TextStyle)
    ], UmlEnumeration.prototype, "style", void 0);
    return UmlEnumeration;
}(ChildProperty));
export { UmlEnumeration };
/**
 * Defines the behavior of the UMLActivity shape
 */
var UmlClassifierShape = /** @class */ (function (_super) {
    __extends(UmlClassifierShape, _super);
    function UmlClassifierShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class UmlClassifierShape
     */
    UmlClassifierShape.prototype.getClassName = function () {
        return 'UmlClassifierShape';
    };
    __decorate([
        Property('UmlClassifier')
    ], UmlClassifierShape.prototype, "type", void 0);
    __decorate([
        Complex({}, UmlClass)
    ], UmlClassifierShape.prototype, "classShape", void 0);
    __decorate([
        Complex({}, UmlInterface)
    ], UmlClassifierShape.prototype, "interfaceShape", void 0);
    __decorate([
        Complex({}, UmlEnumeration)
    ], UmlClassifierShape.prototype, "enumerationShape", void 0);
    __decorate([
        Property('Class')
    ], UmlClassifierShape.prototype, "classifier", void 0);
    return UmlClassifierShape;
}(Shape));
export { UmlClassifierShape };
/**
 * Defines the behavior of nodes
 */
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    // tslint:disable-next-line:no-any
    function Node(parent, propName, defaultValue, isArray) {
        var _this = _super.call(this, parent, propName, defaultValue, isArray) || this;
        /** @private */
        _this.isCanvasUpdate = false;
        /** @private */
        _this.status = 'None';
        /** @private */
        _this.parentId = '';
        /** @private */
        _this.processId = '';
        /** @private */
        _this.umlIndex = -1;
        /** @private */
        _this.outEdges = [];
        /** @private */
        _this.inEdges = [];
        /** @private */
        _this.isHeader = false;
        /** @private */
        _this.isLane = false;
        /** @private */
        _this.isPhase = false;
        var nodeDefault;
        if (_this.children && _this.children.length > 0) {
            nodeDefault = defaultValue;
            if (!nodeDefault.style || !nodeDefault.style.fill) {
                _this.style.fill = 'transparent';
            }
            if (!nodeDefault.style || !nodeDefault.style.strokeColor) {
                _this.style.strokeColor = 'transparent';
            }
        }
        if (_this.shape && _this.shape.type === 'UmlActivity') {
            setUMLActivityDefaults(defaultValue, _this);
        }
        if (_this.shape && _this.shape.type === 'SwimLane') {
            setSwimLaneDefaults(defaultValue, _this);
        }
        return _this;
    }
    Object.defineProperty(Node.prototype, "actualSize", {
        /** @private */
        get: function () {
            if (this.wrapper !== null) {
                return this.wrapper.actualSize;
            }
            else {
                return new Size(this.width || 0, this.height || 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Allows to initialize the UI of a node
     */
    /** @private */
    /* tslint:disable */
    Node.prototype.init = function (diagram) {
        var content;
        if (this.shape.type != 'SwimLane') {
            content = new DiagramElement();
        }
        else {
            content = new GridPanel();
        }
        var textStyle;
        var changedProperties = 'changedProperties';
        var oldProperties = 'oldProperties';
        this.shape[changedProperties] = {};
        this.shape[oldProperties] = {};
        switch (this.shape.type) {
            case 'Path':
                var pathContent = new PathElement();
                pathContent.data = this.shape.data;
                content = pathContent;
                break;
            case 'Image':
                var imageContent = new ImageElement();
                imageContent.source = this.shape.source;
                imageContent.imageAlign = this.shape.align;
                imageContent.imageScale = this.shape.scale;
                content = imageContent;
                break;
            case 'Text':
                var textContent = new TextElement();
                textContent.content = this.shape.content;
                content = textContent;
                textStyle = this.style;
                content.style = textStyle;
                break;
            case 'Basic':
                if (this.shape.shape === 'Rectangle') {
                    var basicshape = new DiagramElement();
                    content = basicshape;
                    content.cornerRadius = this.shape.cornerRadius;
                }
                else if (this.shape.shape === 'Polygon') {
                    var path = new PathElement();
                    path.data = getPolygonPath(this.shape.points);
                    content = path;
                }
                else {
                    var basicshape = new PathElement();
                    var basicshapedata = getBasicShape(this.shape.shape);
                    basicshape.data = basicshapedata;
                    content = basicshape;
                }
                break;
            case 'Flow':
                var flowshape = new PathElement();
                var flowshapedata = getFlowShape(this.shape.shape);
                flowshape.data = flowshapedata;
                content = flowshape;
                break;
            case 'UmlActivity':
                var umlactivityshape = new PathElement();
                content = getUMLActivityShapes(umlactivityshape, content, this);
                break;
            case 'Bpmn':
                if (diagram.bpmnModule) {
                    content = diagram.bpmnModule.initBPMNContent(content, this, diagram);
                    this.wrapper.elementActions = this.wrapper.elementActions | ElementAction.ElementIsGroup;
                    var subProcess = this.shape.activity.subProcess;
                    if (subProcess.processes && subProcess.processes.length) {
                        var children = this.shape.activity.subProcess.processes;
                        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                            var i = children_1[_i];
                            if (diagram.nameTable[i] && (!diagram.nameTable[i].processId || diagram.nameTable[i].processId === this.id)) {
                                diagram.nameTable[i].processId = this.id;
                                if (subProcess.collapsed) {
                                    diagram.updateElementVisibility(diagram.nameTable[i].wrapper, diagram.nameTable[i], !subProcess.collapsed);
                                }
                                content.children.push(diagram.nameTable[i].wrapper);
                            }
                        }
                    }
                }
                break;
            case 'Native':
                var nativeContent = new DiagramNativeElement(this.id, diagram.element.id);
                nativeContent.content = this.shape.content;
                nativeContent.scale = this.shape.scale;
                content = nativeContent;
                break;
            case 'HTML':
                var htmlContent = new DiagramHtmlElement(this.id, diagram.element.id);
                htmlContent.content = this.shape.content;
                content = htmlContent;
                break;
            case 'UmlClassifier':
                //   let umlClassifierShape: StackPanel = new StackPanel();
                content = getULMClassifierShapes(content, this, diagram);
                break;
            case 'SwimLane':
                this.annotations = [];
                this.ports = [];
                content.cellStyle.fill = "none";
                content.cellStyle.strokeColor = "none";
                this.container = { type: 'Grid', orientation: this.shape.orientation };
                content.id = this.id;
                this.container.orientation = this.shape.orientation;
                this.constraints |= NodeConstraints.HideThumbs;
                initSwimLane(content, diagram, this);
                break;
        }
        content.id = this.id + '_content';
        content.relativeMode = 'Object';
        if (this.width !== undefined) {
            content.width = this.width;
        }
        content.horizontalAlignment = 'Stretch';
        if (this.height !== undefined) {
            content.height = this.height;
        }
        if (this.minHeight !== undefined) {
            content.minHeight = this.minHeight;
        }
        if (this.maxHeight !== undefined) {
            content.maxHeight = this.maxHeight;
        }
        if (this.minWidth !== undefined) {
            content.minWidth = this.minWidth;
        }
        if (this.maxWidth !== undefined) {
            content.maxWidth = this.maxWidth;
        }
        if (this.shape.shape === 'Rectangle' && !this.shape.cornerRadius) {
            content.isRectElement = true;
        }
        content.verticalAlignment = 'Stretch';
        if (this.shape instanceof Text) {
            content.margin = this.shape.margin;
        }
        if (canShadow(this)) {
            if ((this.constraints & NodeConstraints.Shadow) !== 0) {
                content.shadow = this.shadow;
            }
        }
        if ((this.shape.type !== 'Bpmn' || this.shape.shape === 'Message' ||
            this.shape.shape === 'DataSource') && ((this.shape.type !== 'UmlActivity' || this.shape.shape !== 'FinalNode'))) {
            if (this.shape.type !== 'Text') {
                content.style = this.style;
            }
        }
        if (!(this.wrapper.elementActions & ElementAction.ElementIsGroup) && this.flip === 'Horizontal' || this.flip === 'Vertical') {
            content.flip = this.flip;
        }
        return content;
    };
    /* tslint:enable */
    /** @private */
    Node.prototype.initContainer = function () {
        if (!this.id) {
            this.id = randomId();
        }
        // Creates canvas element
        var canvas;
        if (!this.container || this.shape instanceof SwimLane) {
            canvas = this.children ? new Container() : new Canvas();
        }
        else {
            switch (this.container.type) {
                case 'Canvas':
                    canvas = new Canvas();
                    break;
                case 'Stack':
                    canvas = new StackPanel();
                    break;
                case 'Grid':
                    canvas = new GridPanel();
                    canvas.setDefinitions(this.rows, this.columns);
                    break;
            }
        }
        canvas.id = this.id;
        canvas.offsetX = this.offsetX;
        canvas.offsetY = this.offsetY;
        canvas.visible = this.visible;
        canvas.horizontalAlignment = this.horizontalAlignment;
        canvas.verticalAlignment = this.verticalAlignment;
        if (this.container) {
            canvas.width = this.width;
            canvas.height = this.height;
            if (this.container.type === 'Stack') {
                canvas.orientation = this.container.orientation;
            }
        }
        canvas.style.fill = this.backgroundColor;
        canvas.style.strokeColor = this.borderColor;
        canvas.style.strokeWidth = this.borderWidth;
        canvas.rotateAngle = this.rotateAngle;
        canvas.minHeight = this.minHeight;
        canvas.minWidth = this.minWidth;
        canvas.maxHeight = this.maxHeight;
        canvas.maxWidth = this.maxWidth;
        canvas.pivot = this.pivot;
        canvas.margin = this.margin;
        canvas.flip = this.flip;
        this.wrapper = canvas;
        return canvas;
    };
    /** @private */
    Node.prototype.initPorts = function (accessibilityContent, container) {
        var canvas = this.wrapper;
        var port;
        for (var i = 0; this.ports !== undefined, i < this.ports.length; i++) {
            port = this.initPortWrapper(this.ports[i]);
            port.elementActions = port.elementActions | ElementAction.ElementIsPort;
            // tslint:disable-next-line:no-any
            var wrapperContent = void 0;
            var contentAccessibility = getFunction(accessibilityContent);
            if (contentAccessibility) {
                wrapperContent = contentAccessibility(port, this);
            }
            port.description = wrapperContent ? wrapperContent : port.id;
            container.children.push(port);
        }
    };
    Node.prototype.getIconOffet = function (layout, icon) {
        var x;
        var y;
        if (layout.orientation === 'BottomToTop') {
            x = icon.offset.x;
            y = 1 - icon.offset.y;
        }
        else if (layout.orientation === 'LeftToRight') {
            x = icon.offset.y;
            y = icon.offset.x;
        }
        else if (layout.orientation === 'RightToLeft') {
            x = 1 - icon.offset.y;
            y = icon.offset.x;
        }
        else {
            x = icon.offset.x;
            y = icon.offset.y;
        }
        return { x: x, y: y };
    };
    /** @private */
    Node.prototype.initIcons = function (accessibilityContent, layout, container, diagramId) {
        var canvas = this.wrapper;
        var offset;
        var icon = this.isExpanded ? this.expandIcon : this.collapseIcon;
        if (icon.shape !== 'None') {
            var iconContainer = new Canvas();
            iconContainer.float = true;
            var children = [];
            iconContainer.id = this.id + '_icon_content';
            iconContainer.children = children;
            iconContainer.height = icon.height;
            iconContainer.width = icon.width;
            iconContainer.style.strokeColor = 'transparent';
            iconContainer.margin = icon.margin;
            iconContainer.horizontalAlignment = 'Center';
            iconContainer.verticalAlignment = 'Center';
            iconContainer.visible = this.visible;
            offset = this.getIconOffet(layout, icon);
            iconContainer.setOffsetWithRespectToBounds(offset.x, offset.y, 'Fraction');
            iconContainer.relativeMode = 'Point';
            this.initIconSymbol(icon, iconContainer, accessibilityContent, diagramId);
            // tslint:disable-next-line:no-any
            var wrapperContent = void 0;
            var contentAccessibility = getFunction(accessibilityContent);
            if (contentAccessibility) {
                wrapperContent = contentAccessibility(icon, this);
            }
            iconContainer.description = wrapperContent ? wrapperContent : iconContainer.id;
            container.children.push(iconContainer);
        }
    };
    /** @private */
    Node.prototype.initAnnotations = function (accessibilityContent, container, diagramId, virtualize) {
        var annotation;
        for (var i = 0; this.annotations !== undefined, i < this.annotations.length; i++) {
            annotation = this.initAnnotationWrapper(this.annotations[i], diagramId, virtualize, i);
            // tslint:disable-next-line:no-any
            var wrapperContent = void 0;
            var contentAccessibility = getFunction(accessibilityContent);
            if (contentAccessibility) {
                wrapperContent = contentAccessibility(annotation, this);
            }
            annotation.description = wrapperContent ? wrapperContent : annotation.id;
            container.children.push(annotation);
        }
    };
    /** @private */
    Node.prototype.initPortWrapper = function (ports) {
        ports.id = ports.id || randomId();
        // Creates port element
        var portContent = new PathElement();
        portContent.height = ports.height;
        portContent.width = ports.width;
        var pathdata = (ports.shape === 'Custom') ? ports.pathData : getPortShape(ports.shape);
        portContent.id = this.id + '_' + (ports.id);
        portContent.margin = ports.margin;
        portContent.data = pathdata;
        var style = ports.style;
        portContent.style = {
            fill: style.fill, strokeColor: style.strokeColor, gradient: null,
            opacity: style.opacity, strokeDashArray: style.strokeDashArray, strokeWidth: style.strokeWidth
        };
        portContent.horizontalAlignment = ports.horizontalAlignment;
        portContent.verticalAlignment = ports.verticalAlignment;
        portContent = updatePortEdges(portContent, this.flip, ports);
        if (this.width !== undefined || this.height !== undefined) {
            portContent.float = true;
        }
        portContent.relativeMode = 'Point';
        portContent.visible = checkPortRestriction(ports, PortVisibility.Visible) &&
            !checkPortRestriction(ports, PortVisibility.Hover) && !checkPortRestriction(ports, PortVisibility.Connect) ? true : false;
        return portContent;
    };
    /** @private */
    Node.prototype.initAnnotationWrapper = function (annotation, diagramId, virtualize, value) {
        annotation.id = annotation.id || value + 'annotation' || randomId();
        var label = annotation;
        var annotationcontent;
        if (diagramId && annotation.template) {
            annotationcontent = new DiagramHtmlElement(this.id, diagramId, annotation.id);
            annotationcontent.content = annotation.template;
        }
        else {
            annotationcontent = new TextElement();
            annotationcontent.canMeasure = !virtualize;
            var style = annotation.style;
            var link = annotation.hyperlink.link ? annotation.hyperlink : undefined;
            annotationcontent.style = {
                fill: style.fill, strokeColor: style.strokeColor, strokeWidth: style.strokeWidth,
                bold: style.bold, textWrapping: style.textWrapping,
                color: link ? link.color || annotationcontent.hyperlink.color : style.color, whiteSpace: style.whiteSpace,
                fontFamily: style.fontFamily, fontSize: style.fontSize, italic: style.italic, gradient: null, opacity: style.opacity,
                strokeDashArray: style.strokeDashArray, textAlign: style.textAlign, textOverflow: annotation.style.textOverflow,
                textDecoration: link ? link.textDecoration ||
                    annotationcontent.hyperlink.textDecoration : style.textDecoration,
            };
            annotationcontent.hyperlink.link = annotation.hyperlink.link || undefined;
            annotationcontent.hyperlink.content = annotation.hyperlink.content || undefined;
            annotationcontent.hyperlink.textDecoration = annotation.hyperlink.textDecoration || undefined;
            annotationcontent.content = link ? link.content ||
                annotationcontent.hyperlink.link : annotation.content;
        }
        annotationcontent.constraints = annotation.constraints;
        annotationcontent.height = annotation.height;
        annotationcontent.width = annotation.width;
        annotationcontent.visible = annotation.visibility;
        annotationcontent.rotateAngle = annotation.rotateAngle;
        annotationcontent.id = this.id + '_' + annotation.id;
        if (this.width !== undefined && !annotation.template) {
            if (annotation.width === undefined || (annotation.width > this.width &&
                (annotation.style.textWrapping === 'Wrap' || annotation.style.textWrapping === 'WrapWithOverflow'))) {
                annotationcontent.width = this.width;
            }
        }
        annotationcontent.margin = annotation.margin;
        annotationcontent.horizontalAlignment = annotation.horizontalAlignment;
        annotationcontent.verticalAlignment = annotation.verticalAlignment;
        annotationcontent.setOffsetWithRespectToBounds(label.offset.x, label.offset.y, 'Fraction');
        if (this.width !== undefined || this.height !== undefined) {
            annotationcontent.float = true;
        }
        annotationcontent.relativeMode = 'Point';
        return annotationcontent;
    };
    Node.prototype.initIconContainer = function (options, iconContainer) {
        var rect = new DiagramElement();
        rect.id = iconContainer.id + '_rect';
        rect.height = options.height;
        rect.width = options.width;
        rect.visible = iconContainer.visible;
        rect.margin = options.margin;
        rect.cornerRadius = options.cornerRadius;
        rect.style = {
            fill: options.fill, strokeColor: options.borderColor,
            strokeWidth: options.borderWidth
        };
        rect.setOffsetWithRespectToBounds(0.5, 0.5, 'Fraction');
        rect.horizontalAlignment = 'Center';
        rect.verticalAlignment = 'Center';
        rect.relativeMode = 'Object';
        rect.description = rect.description || 'Click here to expand or collapse';
        return rect;
    };
    Node.prototype.initIconSymbol = function (options, iconContainer, accessibilityContent, diagramId) {
        var iconContent;
        iconContainer.children.push(this.initIconContainer(options, iconContainer));
        if (options.shape === 'Template') {
            iconContent = new DiagramNativeElement(this.id, diagramId);
            iconContent.content = options.content;
            iconContent.height = 10;
            iconContent.width = 10;
        }
        else {
            iconContent = new PathElement();
            iconContent.data = getIconShape(options);
            var iconContentBounds = measurePath(iconContent.data);
            iconContent.height =
                iconContentBounds.height < 10 ? iconContentBounds.height : 10 - (options.padding.bottom + options.padding.top);
            iconContent.width =
                iconContentBounds.width < 10 ? iconContentBounds.width : 10 - (options.padding.left + options.padding.right);
        }
        iconContent.id = iconContainer.id + '_shape';
        iconContent.horizontalAlignment = 'Center';
        iconContent.verticalAlignment = 'Center';
        iconContent.visible = iconContainer.visible;
        iconContent.visible = iconContainer.visible;
        iconContent.style = {
            fill: 'black', strokeColor: options.borderColor,
            strokeWidth: options.borderWidth
        };
        iconContent.setOffsetWithRespectToBounds(0.5, 0.5, 'Fraction');
        iconContent.relativeMode = 'Object';
        iconContent.description = iconContainer.description || 'Click here to expand or collapse';
        iconContainer.children.push(iconContent);
    };
    /**
     * @private
     * Returns the name of class Node
     */
    Node.prototype.getClassName = function () {
        return 'Node';
    };
    __decorate([
        Collection([], ShapeAnnotation)
    ], Node.prototype, "annotations", void 0);
    __decorate([
        Property(0)
    ], Node.prototype, "offsetX", void 0);
    __decorate([
        Property(0)
    ], Node.prototype, "offsetY", void 0);
    __decorate([
        Complex({ x: 0.5, y: 0.5 }, Point)
    ], Node.prototype, "pivot", void 0);
    __decorate([
        Property()
    ], Node.prototype, "width", void 0);
    __decorate([
        Property()
    ], Node.prototype, "height", void 0);
    __decorate([
        Property()
    ], Node.prototype, "minWidth", void 0);
    __decorate([
        Property()
    ], Node.prototype, "minHeight", void 0);
    __decorate([
        Property()
    ], Node.prototype, "maxWidth", void 0);
    __decorate([
        Property()
    ], Node.prototype, "maxHeight", void 0);
    __decorate([
        Property(0)
    ], Node.prototype, "rotateAngle", void 0);
    __decorate([
        Complex({ fill: 'white' }, TextStyle)
    ], Node.prototype, "style", void 0);
    __decorate([
        Property('transparent')
    ], Node.prototype, "backgroundColor", void 0);
    __decorate([
        Property('none')
    ], Node.prototype, "borderColor", void 0);
    __decorate([
        Property(0)
    ], Node.prototype, "borderWidth", void 0);
    __decorate([
        Property()
    ], Node.prototype, "data", void 0);
    __decorate([
        ComplexFactory(getShapeType)
    ], Node.prototype, "shape", void 0);
    __decorate([
        Property(null)
    ], Node.prototype, "wrapper", void 0);
    __decorate([
        Property(NodeConstraints.Default)
    ], Node.prototype, "constraints", void 0);
    __decorate([
        Complex({}, Shadow)
    ], Node.prototype, "shadow", void 0);
    __decorate([
        Property()
    ], Node.prototype, "children", void 0);
    __decorate([
        Property(null)
    ], Node.prototype, "container", void 0);
    __decorate([
        Property('Left')
    ], Node.prototype, "horizontalAlignment", void 0);
    __decorate([
        Property('Top')
    ], Node.prototype, "verticalAlignment", void 0);
    __decorate([
        Property()
    ], Node.prototype, "rows", void 0);
    __decorate([
        Property()
    ], Node.prototype, "columns", void 0);
    __decorate([
        Property()
    ], Node.prototype, "rowIndex", void 0);
    __decorate([
        Property()
    ], Node.prototype, "columnIndex", void 0);
    __decorate([
        Property()
    ], Node.prototype, "rowSpan", void 0);
    __decorate([
        Property()
    ], Node.prototype, "columnSpan", void 0);
    __decorate([
        Property('')
    ], Node.prototype, "branch", void 0);
    return Node;
}(NodeBase));
export { Node };
/**
 * Defines the behavior of header in swimLane
 */
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Header.prototype, "id", void 0);
    __decorate([
        Complex({ style: { fill: '#111111' } }, Annotation)
    ], Header.prototype, "annotation", void 0);
    __decorate([
        Complex({ fill: '#E7F4FF', strokeColor: '#CCCCCC' }, ShapeStyle)
    ], Header.prototype, "style", void 0);
    __decorate([
        Property(50)
    ], Header.prototype, "height", void 0);
    __decorate([
        Property(50)
    ], Header.prototype, "width", void 0);
    return Header;
}(ChildProperty));
export { Header };
/**
 * Defines the behavior of lane in swimLane
 */
var Lane = /** @class */ (function (_super) {
    __extends(Lane, _super);
    function Lane() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Lane
     */
    Lane.prototype.getClassName = function () {
        return 'Lane';
    };
    __decorate([
        Property('')
    ], Lane.prototype, "id", void 0);
    __decorate([
        Complex({ fill: '#F9F9F9', strokeColor: '#CCCCCC' }, ShapeStyle)
    ], Lane.prototype, "style", void 0);
    __decorate([
        Collection([], Node)
    ], Lane.prototype, "children", void 0);
    __decorate([
        Property(100)
    ], Lane.prototype, "height", void 0);
    __decorate([
        Property(100)
    ], Lane.prototype, "width", void 0);
    __decorate([
        Complex({ style: { fill: '#E7F4FF', strokeColor: '#CCCCCC' }, annotation: { content: 'Function' } }, Header)
    ], Lane.prototype, "header", void 0);
    return Lane;
}(ChildProperty));
export { Lane };
/**
 * Defines the behavior of phase in swimLane
 */
var Phase = /** @class */ (function (_super) {
    __extends(Phase, _super);
    function Phase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     * Returns the name of class Phase
     */
    Phase.prototype.getClassName = function () {
        return 'Phase';
    };
    __decorate([
        Property('')
    ], Phase.prototype, "id", void 0);
    __decorate([
        Complex({ strokeColor: '#CCCCCC' }, ShapeStyle)
    ], Phase.prototype, "style", void 0);
    __decorate([
        Complex({ annotation: { content: 'Phase' } }, Header)
    ], Phase.prototype, "header", void 0);
    __decorate([
        Property(100)
    ], Phase.prototype, "offset", void 0);
    return Phase;
}(ChildProperty));
export { Phase };
/**
 * Defines the behavior of swimLane shape
 */
var SwimLane = /** @class */ (function (_super) {
    __extends(SwimLane, _super);
    function SwimLane() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         * Defines space between children and lane
         */
        _this.padding = 20;
        /**
         * @private
         * Defines header by user or not
         */
        _this.hasHeader = true;
        return _this;
    }
    /**
     * @private
     * Returns the name of class Phase
     */
    SwimLane.prototype.getClassName = function () {
        return 'SwimLane';
    };
    __decorate([
        Property('SwimLane')
    ], SwimLane.prototype, "type", void 0);
    __decorate([
        Property(20)
    ], SwimLane.prototype, "phaseSize", void 0);
    __decorate([
        Collection([], Phase)
    ], SwimLane.prototype, "phases", void 0);
    __decorate([
        Property('Horizontal')
    ], SwimLane.prototype, "orientation", void 0);
    __decorate([
        Collection([], Lane)
    ], SwimLane.prototype, "lanes", void 0);
    __decorate([
        Complex({ style: { fill: '#E7F4FF', strokeColor: '#CCCCCC' }, annotation: { content: 'Function' } }, Header)
    ], SwimLane.prototype, "header", void 0);
    __decorate([
        Property(false)
    ], SwimLane.prototype, "isLane", void 0);
    __decorate([
        Property(false)
    ], SwimLane.prototype, "isPhase", void 0);
    return SwimLane;
}(Shape));
export { SwimLane };
/**
 * Defines the behavior of container
 */
var ChildContainer = /** @class */ (function () {
    function ChildContainer() {
    }
    /**
     * @private
     * Returns the name of class ChildContainer
     */
    ChildContainer.prototype.getClassName = function () {
        return 'ChildContainer';
    };
    __decorate([
        Property('Canvas')
    ], ChildContainer.prototype, "type", void 0);
    __decorate([
        Property('Vertical')
    ], ChildContainer.prototype, "orientation", void 0);
    return ChildContainer;
}());
export { ChildContainer };
/**
 * Defines the size and position of selected items and defines the appearance of selector
 */
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Initializes the UI of the container
     */
    Selector.prototype.init = function (diagram) {
        var container = new Container();
        container.measureChildren = false;
        var consize = new Size();
        container.children = [];
        if (this.annotation) {
            var object = (this.nodes.length > 0) ? diagram.nameTable[this.nodes[0].id].wrapper :
                diagram.nameTable[this.connectors[0].id].wrapper;
            var wrapper = diagram.getWrapper(object, this.annotation.id);
            container.children.push(wrapper);
        }
        else {
            if (this.nodes || this.connectors) {
                for (var i = 0; i < this.nodes.length; i++) {
                    var node = diagram.nameTable[this.nodes[i].id];
                    var wrapper = node.wrapper;
                    // this.width = wrapper.actualSize.width; 
                    // this.height = wrapper.actualSize.height;
                    // this.rotateAngle = wrapper.rotateAngle;
                    // this.offsetX = wrapper.offsetX;
                    // this.offsetY = wrapper.offsetY;
                    container.children.push(wrapper);
                }
                for (var j = 0; j < this.connectors.length; j++) {
                    var connector = diagram.nameTable[this.connectors[j].id];
                    var wrapper = connector.wrapper;
                    // this.width = wrapper.actualSize.width; this.height = wrapper.actualSize.height;
                    // this.rotateAngle = wrapper.rotateAngle; this.offsetX = wrapper.offsetX;
                    // this.offsetY = wrapper.offsetY;
                    container.children.push(wrapper);
                }
            }
        }
        this.wrapper = container;
        return container;
    };
    __decorate([
        Property(null)
    ], Selector.prototype, "wrapper", void 0);
    __decorate([
        Collection([], Node)
    ], Selector.prototype, "nodes", void 0);
    __decorate([
        Collection([], Connector)
    ], Selector.prototype, "connectors", void 0);
    __decorate([
        Property()
    ], Selector.prototype, "width", void 0);
    __decorate([
        Property()
    ], Selector.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], Selector.prototype, "rotateAngle", void 0);
    __decorate([
        Property(0)
    ], Selector.prototype, "offsetX", void 0);
    __decorate([
        Property(0)
    ], Selector.prototype, "offsetY", void 0);
    __decorate([
        Complex({ x: 0.5, y: 0.5 }, Point)
    ], Selector.prototype, "pivot", void 0);
    __decorate([
        Property('CompleteIntersect')
    ], Selector.prototype, "rubberBandSelectionMode", void 0);
    __decorate([
        Collection([], UserHandle)
    ], Selector.prototype, "userHandles", void 0);
    __decorate([
        Property(SelectorConstraints.All)
    ], Selector.prototype, "constraints", void 0);
    __decorate([
        Property()
    ], Selector.prototype, "setTooltipTemplate", void 0);
    return Selector;
}(ChildProperty));
export { Selector };
