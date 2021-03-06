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
import { Component, NotifyPropertyChanges, ChildProperty, L10n, Collection, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined, Property, Event } from '@syncfusion/ej2-base';
import { PdfViewerBase } from './index';
// tslint:disable-next-line:max-line-length
import { FontStyle } from './base/types';
import { PdfAnnotationBase } from '../diagram/pdf-annotation';
import { Drawing } from '../diagram/drawing';
import { Selector } from '../diagram/selector';
import { renderAdornerLayer } from '../diagram/dom-util';
/**
 * The `ToolbarSettings` module is used to provide the toolbar settings of PDF viewer.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], ToolbarSettings.prototype, "toolbarItems", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
/**
 * The `AjaxRequestSettings` module is used to set the ajax Request Headers of PDF viewer.
 */
var AjaxRequestSettings = /** @class */ (function (_super) {
    __extends(AjaxRequestSettings, _super);
    function AjaxRequestSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], AjaxRequestSettings.prototype, "ajaxHeaders", void 0);
    return AjaxRequestSettings;
}(ChildProperty));
export { AjaxRequestSettings };
var CustomStampItem = /** @class */ (function (_super) {
    __extends(CustomStampItem, _super);
    function CustomStampItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], CustomStampItem.prototype, "customStampName", void 0);
    __decorate([
        Property('')
    ], CustomStampItem.prototype, "customStampImageSource", void 0);
    return CustomStampItem;
}(ChildProperty));
export { CustomStampItem };
/**
 * The `AnnotationToolbarSettings` module is used to provide the annotation toolbar settings of the PDF viewer.
 */
var AnnotationToolbarSettings = /** @class */ (function (_super) {
    __extends(AnnotationToolbarSettings, _super);
    function AnnotationToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], AnnotationToolbarSettings.prototype, "showTooltip", void 0);
    __decorate([
        Property()
    ], AnnotationToolbarSettings.prototype, "annotationToolbarItem", void 0);
    return AnnotationToolbarSettings;
}(ChildProperty));
export { AnnotationToolbarSettings };
/**
 * The `ServerActionSettings` module is used to provide the server action methods of PDF viewer.
 */
var ServerActionSettings = /** @class */ (function (_super) {
    __extends(ServerActionSettings, _super);
    function ServerActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Load')
    ], ServerActionSettings.prototype, "load", void 0);
    __decorate([
        Property('Unload')
    ], ServerActionSettings.prototype, "unload", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "renderPages", void 0);
    __decorate([
        Property('RenderPdfPages')
    ], ServerActionSettings.prototype, "print", void 0);
    __decorate([
        Property('Download')
    ], ServerActionSettings.prototype, "download", void 0);
    __decorate([
        Property('RenderThumbnailImages')
    ], ServerActionSettings.prototype, "renderThumbnail", void 0);
    __decorate([
        Property('RenderAnnotationComments')
    ], ServerActionSettings.prototype, "renderComments", void 0);
    __decorate([
        Property('ImportAnnotations')
    ], ServerActionSettings.prototype, "importAnnotations", void 0);
    __decorate([
        Property('ExportAnnotations')
    ], ServerActionSettings.prototype, "exportAnnotations", void 0);
    __decorate([
        Property('ImportFormFields')
    ], ServerActionSettings.prototype, "importFormFields", void 0);
    __decorate([
        Property('ExportFormFields')
    ], ServerActionSettings.prototype, "exportFormFields", void 0);
    return ServerActionSettings;
}(ChildProperty));
export { ServerActionSettings };
/**
 * The `StrikethroughSettings` module is used to provide the properties to Strikethrough annotation.
 */
var StrikethroughSettings = /** @class */ (function (_super) {
    __extends(StrikethroughSettings, _super);
    function StrikethroughSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], StrikethroughSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], StrikethroughSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], StrikethroughSettings.prototype, "author", void 0);
    __decorate([
        Property('strikethrough')
    ], StrikethroughSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], StrikethroughSettings.prototype, "modifiedDate", void 0);
    return StrikethroughSettings;
}(ChildProperty));
export { StrikethroughSettings };
/**
 * The `UnderlineSettings` module is used to provide the properties to Underline annotation.
 */
var UnderlineSettings = /** @class */ (function (_super) {
    __extends(UnderlineSettings, _super);
    function UnderlineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], UnderlineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#00ff00')
    ], UnderlineSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], UnderlineSettings.prototype, "author", void 0);
    __decorate([
        Property('underline')
    ], UnderlineSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], UnderlineSettings.prototype, "modifiedDate", void 0);
    return UnderlineSettings;
}(ChildProperty));
export { UnderlineSettings };
/**
 * The `HighlightSettings` module is used to provide the properties to Highlight annotation.
 */
var HighlightSettings = /** @class */ (function (_super) {
    __extends(HighlightSettings, _super);
    function HighlightSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HighlightSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffff00')
    ], HighlightSettings.prototype, "color", void 0);
    __decorate([
        Property('Guest')
    ], HighlightSettings.prototype, "author", void 0);
    __decorate([
        Property('highlight')
    ], HighlightSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], HighlightSettings.prototype, "modifiedDate", void 0);
    return HighlightSettings;
}(ChildProperty));
export { HighlightSettings };
/**
 * The `LineSettings` module is used to provide the properties to line annotation.
 */
var LineSettings = /** @class */ (function (_super) {
    __extends(LineSettings, _super);
    function LineSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], LineSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], LineSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], LineSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], LineSettings.prototype, "author", void 0);
    __decorate([
        Property('Line')
    ], LineSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], LineSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], LineSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], LineSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], LineSettings.prototype, "borderDashArray", void 0);
    return LineSettings;
}(ChildProperty));
export { LineSettings };
/**
 * The `ArrowSettings` module is used to provide the properties to arrow annotation.
 */
var ArrowSettings = /** @class */ (function (_super) {
    __extends(ArrowSettings, _super);
    function ArrowSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ArrowSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ArrowSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], ArrowSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], ArrowSettings.prototype, "author", void 0);
    __decorate([
        Property('Arrow')
    ], ArrowSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], ArrowSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], ArrowSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], ArrowSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], ArrowSettings.prototype, "borderDashArray", void 0);
    return ArrowSettings;
}(ChildProperty));
export { ArrowSettings };
/**
 * The `RectangleSettings` module is used to provide the properties to rectangle annotation.
 */
var RectangleSettings = /** @class */ (function (_super) {
    __extends(RectangleSettings, _super);
    function RectangleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], RectangleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RectangleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RectangleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RectangleSettings.prototype, "author", void 0);
    __decorate([
        Property('Rectangle')
    ], RectangleSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], RectangleSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], RectangleSettings.prototype, "thickness", void 0);
    return RectangleSettings;
}(ChildProperty));
export { RectangleSettings };
/**
 * The `CircleSettings` module is used to provide the properties to circle annotation.
 */
var CircleSettings = /** @class */ (function (_super) {
    __extends(CircleSettings, _super);
    function CircleSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], CircleSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], CircleSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], CircleSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], CircleSettings.prototype, "author", void 0);
    __decorate([
        Property('Circle')
    ], CircleSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], CircleSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], CircleSettings.prototype, "thickness", void 0);
    return CircleSettings;
}(ChildProperty));
export { CircleSettings };
/**
 * The `ShapeLabelSettings` module is used to provide the properties to rectangle annotation.
 */
var ShapeLabelSettings = /** @class */ (function (_super) {
    __extends(ShapeLabelSettings, _super);
    function ShapeLabelSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], ShapeLabelSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], ShapeLabelSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#000')
    ], ShapeLabelSettings.prototype, "fontColor", void 0);
    __decorate([
        Property(16)
    ], ShapeLabelSettings.prototype, "fontSize", void 0);
    __decorate([
        Property('Helvetica')
    ], ShapeLabelSettings.prototype, "fontFamily", void 0);
    return ShapeLabelSettings;
}(ChildProperty));
export { ShapeLabelSettings };
/**
 * The `PolygonSettings` module is used to provide the properties to polygon annotation.
 */
var PolygonSettings = /** @class */ (function (_super) {
    __extends(PolygonSettings, _super);
    function PolygonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], PolygonSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PolygonSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PolygonSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PolygonSettings.prototype, "author", void 0);
    __decorate([
        Property('Polygon')
    ], PolygonSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], PolygonSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], PolygonSettings.prototype, "thickness", void 0);
    return PolygonSettings;
}(ChildProperty));
export { PolygonSettings };
/**
 * The `stampSettings` module is used to provide the properties to stamp annotation.
 */
var StampSettings = /** @class */ (function (_super) {
    __extends(StampSettings, _super);
    function StampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], StampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], StampSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], StampSettings.prototype, "modifiedDate", void 0);
    return StampSettings;
}(ChildProperty));
export { StampSettings };
/**
 * The `CustomStampSettings` module is used to provide the properties to customstamp annotation.
 */
var CustomStampSettings = /** @class */ (function (_super) {
    __extends(CustomStampSettings, _super);
    function CustomStampSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], CustomStampSettings.prototype, "opacity", void 0);
    __decorate([
        Property('Guest')
    ], CustomStampSettings.prototype, "author", void 0);
    __decorate([
        Property('')
    ], CustomStampSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "width", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "height", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "left", void 0);
    __decorate([
        Property(0)
    ], CustomStampSettings.prototype, "top", void 0);
    __decorate([
        Property(false)
    ], CustomStampSettings.prototype, "isAddToSubMenu", void 0);
    return CustomStampSettings;
}(ChildProperty));
export { CustomStampSettings };
/**
 * The `DistanceSettings` module is used to provide the properties to distance calibrate annotation.
 */
var DistanceSettings = /** @class */ (function (_super) {
    __extends(DistanceSettings, _super);
    function DistanceSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], DistanceSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], DistanceSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], DistanceSettings.prototype, "author", void 0);
    __decorate([
        Property('Distance calculation')
    ], DistanceSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], DistanceSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], DistanceSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], DistanceSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], DistanceSettings.prototype, "borderDashArray", void 0);
    return DistanceSettings;
}(ChildProperty));
export { DistanceSettings };
/**
 * The `PerimeterSettings` module is used to provide the properties to perimeter calibrate annotation.
 */
var PerimeterSettings = /** @class */ (function (_super) {
    __extends(PerimeterSettings, _super);
    function PerimeterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], PerimeterSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], PerimeterSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], PerimeterSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], PerimeterSettings.prototype, "author", void 0);
    __decorate([
        Property('Perimeter calculation')
    ], PerimeterSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], PerimeterSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], PerimeterSettings.prototype, "thickness", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadStartStyle", void 0);
    __decorate([
        Property('None')
    ], PerimeterSettings.prototype, "lineHeadEndStyle", void 0);
    __decorate([
        Property(0)
    ], PerimeterSettings.prototype, "borderDashArray", void 0);
    return PerimeterSettings;
}(ChildProperty));
export { PerimeterSettings };
/**
 * The `AreaSettings` module is used to provide the properties to area calibrate annotation.
 */
var AreaSettings = /** @class */ (function (_super) {
    __extends(AreaSettings, _super);
    function AreaSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], AreaSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], AreaSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], AreaSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], AreaSettings.prototype, "author", void 0);
    __decorate([
        Property('Area calculation')
    ], AreaSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], AreaSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], AreaSettings.prototype, "thickness", void 0);
    return AreaSettings;
}(ChildProperty));
export { AreaSettings };
/**
 * The `RadiusSettings` module is used to provide the properties to radius calibrate annotation.
 */
var RadiusSettings = /** @class */ (function (_super) {
    __extends(RadiusSettings, _super);
    function RadiusSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], RadiusSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], RadiusSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], RadiusSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], RadiusSettings.prototype, "author", void 0);
    __decorate([
        Property('Radius calculation')
    ], RadiusSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], RadiusSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], RadiusSettings.prototype, "thickness", void 0);
    return RadiusSettings;
}(ChildProperty));
export { RadiusSettings };
/**
 * The `VolumeSettings` module is used to provide the properties to volume calibrate annotation.
 */
var VolumeSettings = /** @class */ (function (_super) {
    __extends(VolumeSettings, _super);
    function VolumeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], VolumeSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], VolumeSettings.prototype, "fillColor", void 0);
    __decorate([
        Property('#ff0000')
    ], VolumeSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property('Guest')
    ], VolumeSettings.prototype, "author", void 0);
    __decorate([
        Property('Volume calculation')
    ], VolumeSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], VolumeSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('1')
    ], VolumeSettings.prototype, "thickness", void 0);
    return VolumeSettings;
}(ChildProperty));
export { VolumeSettings };
/**
 * The `stickyNotesSettings` module is used to provide the properties to sticky notes annotation.
 */
var StickyNotesSettings = /** @class */ (function (_super) {
    __extends(StickyNotesSettings, _super);
    function StickyNotesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Guest')
    ], StickyNotesSettings.prototype, "author", void 0);
    __decorate([
        Property('Sticky Note')
    ], StickyNotesSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], StickyNotesSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property(1)
    ], StickyNotesSettings.prototype, "opacity", void 0);
    return StickyNotesSettings;
}(ChildProperty));
export { StickyNotesSettings };
/**
 * The `MeasurementSettings` module is used to provide the settings to measurement annotations.
 */
var MeasurementSettings = /** @class */ (function (_super) {
    __extends(MeasurementSettings, _super);
    function MeasurementSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], MeasurementSettings.prototype, "scaleRatio", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "conversionUnit", void 0);
    __decorate([
        Property('in')
    ], MeasurementSettings.prototype, "displayUnit", void 0);
    __decorate([
        Property(96)
    ], MeasurementSettings.prototype, "depth", void 0);
    return MeasurementSettings;
}(ChildProperty));
export { MeasurementSettings };
/**
 * The `FreeTextSettings` module is used to provide the properties to free text annotation.
 */
var FreeTextSettings = /** @class */ (function (_super) {
    __extends(FreeTextSettings, _super);
    function FreeTextSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "borderColor", void 0);
    __decorate([
        Property(1)
    ], FreeTextSettings.prototype, "borderWidth", void 0);
    __decorate([
        Property('solid')
    ], FreeTextSettings.prototype, "borderStyle", void 0);
    __decorate([
        Property('Guest')
    ], FreeTextSettings.prototype, "author", void 0);
    __decorate([
        Property('Text Box')
    ], FreeTextSettings.prototype, "subject", void 0);
    __decorate([
        Property('')
    ], FreeTextSettings.prototype, "modifiedDate", void 0);
    __decorate([
        Property('#ffffff00')
    ], FreeTextSettings.prototype, "fillColor", void 0);
    __decorate([
        Property(16)
    ], FreeTextSettings.prototype, "fontSize", void 0);
    __decorate([
        Property(151)
    ], FreeTextSettings.prototype, "width", void 0);
    __decorate([
        Property(24.6)
    ], FreeTextSettings.prototype, "height", void 0);
    __decorate([
        Property('#000')
    ], FreeTextSettings.prototype, "fontColor", void 0);
    __decorate([
        Property('Helvetica')
    ], FreeTextSettings.prototype, "fontFamily", void 0);
    __decorate([
        Property('TypeHere')
    ], FreeTextSettings.prototype, "defaultText", void 0);
    __decorate([
        Property('None')
    ], FreeTextSettings.prototype, "fontStyle", void 0);
    __decorate([
        Property('Left')
    ], FreeTextSettings.prototype, "textAlignment", void 0);
    return FreeTextSettings;
}(ChildProperty));
export { FreeTextSettings };
/**
 * The `AnnotationSelectorSettings` module is used to provide the properties to annotation selectors.
 */
var AnnotationSelectorSettings = /** @class */ (function (_super) {
    __extends(AnnotationSelectorSettings, _super);
    function AnnotationSelectorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], AnnotationSelectorSettings.prototype, "selectionBorderColor", void 0);
    __decorate([
        Property('black')
    ], AnnotationSelectorSettings.prototype, "resizerBorderColor", void 0);
    __decorate([
        Property('#FF4081')
    ], AnnotationSelectorSettings.prototype, "resizerFillColor", void 0);
    __decorate([
        Property(8)
    ], AnnotationSelectorSettings.prototype, "resizerSize", void 0);
    __decorate([
        Property(1)
    ], AnnotationSelectorSettings.prototype, "selectionBorderThickness", void 0);
    return AnnotationSelectorSettings;
}(ChildProperty));
export { AnnotationSelectorSettings };
/**
 * The `TextSearchColorSettings` module is used to set the settings for the color of the text search highlight.
 */
var TextSearchColorSettings = /** @class */ (function (_super) {
    __extends(TextSearchColorSettings, _super);
    function TextSearchColorSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('#fdd835')
    ], TextSearchColorSettings.prototype, "currentOccurrence", void 0);
    __decorate([
        Property('#8b4c12')
    ], TextSearchColorSettings.prototype, "otherOccurrence", void 0);
    return TextSearchColorSettings;
}(ChildProperty));
export { TextSearchColorSettings };
/**
 * The `HandWrittenSignatureSettings` module is used to provide the properties to handwritten signature.
 */
var HandWrittenSignatureSettings = /** @class */ (function (_super) {
    __extends(HandWrittenSignatureSettings, _super);
    function HandWrittenSignatureSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "opacity", void 0);
    __decorate([
        Property('#000000')
    ], HandWrittenSignatureSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(1)
    ], HandWrittenSignatureSettings.prototype, "thickness", void 0);
    __decorate([
        Property(100)
    ], HandWrittenSignatureSettings.prototype, "width", void 0);
    __decorate([
        Property(100)
    ], HandWrittenSignatureSettings.prototype, "height", void 0);
    return HandWrittenSignatureSettings;
}(ChildProperty));
export { HandWrittenSignatureSettings };
/**
 * Represents the PDF viewer component.
 * ```html
 * <div id="pdfViewer"></div>
 * <script>
 *  var pdfViewerObj = new PdfViewer();
 *  pdfViewerObj.appendTo("#pdfViewer");
 * </script>
 * ```
 */
var PdfViewer = /** @class */ (function (_super) {
    __extends(PdfViewer, _super);
    function PdfViewer(options, element) {
        var _this = _super.call(this, options, element) || this;
        /**
         * Gets or sets the document name loaded in the PdfViewer control.
         */
        _this.fileName = null;
        /**
         * Gets or sets the export annotations JSON file name in the PdfViewer control.
         */
        _this.exportAnnotationFileName = null;
        /**
         * @private
         */
        _this.zIndex = -1;
        /**
         * @private
         */
        _this.nameTable = {};
        /**   @private  */
        _this.clipboardData = {};
        /**
         * @private
         */
        _this.zIndexTable = [];
        _this.defaultLocale = {
            'PdfViewer': 'PDF Viewer',
            'Cancel': 'Cancel',
            'Download file': 'Download file',
            'Download': 'Download',
            'Enter Password': 'This document is password protected. Please enter a password.',
            'File Corrupted': 'File Corrupted',
            'File Corrupted Content': 'The file is corrupted and cannot be opened.',
            'Fit Page': 'Fit Page',
            'Fit Width': 'Fit Width',
            'Automatic': 'Automatic',
            'Go To First Page': 'Show first page',
            'Invalid Password': 'Incorrect Password. Please try again.',
            'Next Page': 'Show next page',
            'OK': 'OK',
            'Open': 'Open file',
            'Page Number': 'Current page number',
            'Previous Page': 'Show previous page',
            'Go To Last Page': 'Show last page',
            'Zoom': 'Zoom',
            'Zoom In': 'Zoom in',
            'Zoom Out': 'Zoom out',
            'Page Thumbnails': 'Page thumbnails',
            'Bookmarks': 'Bookmarks',
            'Print': 'Print file',
            'Password Protected': 'Password Required',
            'Copy': 'Copy',
            'Text Selection': 'Text selection tool',
            'Panning': 'Pan mode',
            'Text Search': 'Find text',
            'Find in document': 'Find in document',
            'Match case': 'Match case',
            'Apply': 'Apply',
            'GoToPage': 'Go to Page',
            // tslint:disable-next-line:max-line-length
            'No matches': 'Viewer has finished searching the document. No more matches were found',
            'No Text Found': 'No Text Found',
            'Undo': 'Undo',
            'Redo': 'Redo',
            'Annotation': 'Add or Edit annotations',
            'Highlight': 'Highlight Text',
            'Underline': 'Underline Text',
            'Strikethrough': 'Strikethrough Text',
            'Delete': 'Delete annotation',
            'Opacity': 'Opacity',
            'Color edit': 'Change Color',
            'Opacity edit': 'Change Opacity',
            'Highlight context': 'Highlight',
            'Underline context': 'Underline',
            'Strikethrough context': 'Strike through',
            // tslint:disable-next-line:max-line-length
            'Server error': 'Web-service is not listening. PDF Viewer depends on web-service for all it\'s features. Please start the web service to continue.',
            // tslint:disable-next-line:max-line-length
            'Client error': 'Client-side error is found. Please check the custom headers provided in the AjaxRequestSettings property and web action methods in the ServerActionSettings property.',
            'Open text': 'Open',
            'First text': 'First Page',
            'Previous text': 'Previous Page',
            'Next text': 'Next Page',
            'Last text': 'Last Page',
            'Zoom in text': 'Zoom In',
            'Zoom out text': 'Zoom Out',
            'Selection text': 'Selection',
            'Pan text': 'Pan',
            'Print text': 'Print',
            'Search text': 'Search',
            'Annotation Edit text': 'Edit Annotation',
            'Line Thickness': 'Line Thickness',
            'Line Properties': 'Line Properties',
            'Start Arrow': 'Start Arrow',
            'End Arrow': 'End Arrow',
            'Line Style': 'Line Style',
            'Fill Color': 'Fill Color',
            'Line Color': 'Line Color',
            'None': 'None',
            'Open Arrow': 'Open',
            'Closed Arrow': 'Closed',
            'Round Arrow': 'Round',
            'Square Arrow': 'Square',
            'Diamond Arrow': 'Diamond',
            'Cut': 'Cut',
            'Paste': 'Paste',
            'Delete Context': 'Delete',
            'Properties': 'Properties',
            'Add Stamp': 'Add Stamp',
            'Add Shapes': 'Add Shapes',
            'Stroke edit': 'Change Stroke Color',
            'Change thickness': 'Change Border Thickness',
            'Add line': 'Add Line',
            'Add arrow': 'Add Arrow',
            'Add rectangle': 'Add Rectangle',
            'Add circle': 'Add Circle',
            'Add polygon': 'Add Polygon',
            'Add Comments': 'Add Comments',
            'Comments': 'Comments',
            'No Comments Yet': 'No Comments Yet',
            'Accepted': 'Accepted',
            'Completed': 'Completed',
            'Cancelled': 'Cancelled',
            'Rejected': 'Rejected',
            'Leader Length': 'Leader Length',
            'Scale Ratio': 'Scale Ratio',
            'Calibrate': 'Calibrate',
            'Calibrate Distance': 'Calibrate Distance',
            'Calibrate Perimeter': 'Calibrate Perimeter',
            'Calibrate Area': 'Calibrate Area',
            'Calibrate Radius': 'Calibrate Radius',
            'Calibrate Volume': 'Calibrate Volume',
            'Depth': 'Depth',
            'Closed': 'Closed',
            'Round': 'Round',
            'Square': 'Square',
            'Diamond': 'Diamond',
            'Edit': 'Edit',
            'Comment': 'Comment',
            'Comment Panel': 'Comment Panel',
            'Set Status': 'Set Status',
            'Post': 'Post',
            'Page': 'Page',
            'Add a comment': 'Add a comment',
            'Add a reply': 'Add a reply',
            'Import Annotations': 'Import Annotations',
            'Export Annotations': 'Export Annotations',
            'Add': 'Add',
            'Clear': 'Clear',
            'Bold': 'Bold',
            'Italic': 'Italic',
            'Strikethroughs': 'Strikethrough',
            'Underlines': 'Underline',
            'Superscript': 'Superscript',
            'Subscript': 'Subscript',
            'Align left': 'Align Left',
            'Align right': 'Align Right',
            'Center': 'Center',
            'Justify': 'Justify',
            'Font color': 'Font Color',
            'Text Align': 'Text Align',
            'Text Properties': 'Font Style',
            'Draw Signature': 'Draw Signature',
            'Create': 'Create',
            'Font family': 'Font Family',
            'Font size': 'Font Size',
            'Free Text': 'Free Text',
            'Import Failed': 'Invalid JSON file type or file name; please select a valid JSON file',
            'File not found': 'Imported JSON file is not found in the desired location',
            'Export Failed': 'Export annotations action has failed; please ensure annotations are added properly'
        };
        _this.viewerBase = new PdfViewerBase(_this);
        _this.drawing = new Drawing(_this);
        return _this;
    }
    Object.defineProperty(PdfViewer.prototype, "pageCount", {
        /**
         * Returns the page count of the document loaded in the PdfViewer control.
    
    
         */
        get: function () {
            return this.viewerBase.pageCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "isDocumentEdited", {
        /**
         * Checks whether the PDF document is edited.
    
    
         */
        get: function () {
            return this.viewerBase.isDocumentEdited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "currentPageNumber", {
        /**
         * Returns the current page number of the document displayed in the PdfViewer control.
    
    
         */
        get: function () {
            return this.viewerBase.currentPageNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "zoomPercentage", {
        /**
         * Returns the current zoom percentage of the PdfViewer control.
    
    
         */
        get: function () {
            return this.magnificationModule.zoomFactor * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "bookmark", {
        /**
         * Gets the bookmark view object of the pdf viewer.
    
    
         * @returns { BookmarkView }
         */
        get: function () {
            return this.bookmarkViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "print", {
        /**
         * Gets the print object of the pdf viewer.
    
    
         * @returns { Print }
         */
        get: function () {
            return this.printModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "magnification", {
        /**
         * Gets the magnification object of the pdf viewer.
    
    
         * @returns { Magnification }
         */
        get: function () {
            return this.magnificationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "navigation", {
        /**
         * Gets the navigation object of the pdf viewer.
    
    
         * @returns { Navigation }
         */
        get: function () {
            return this.navigationModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "textSearch", {
        /**
         * Gets the text search object of the pdf viewer.
    
    
         * @returns { TextSearch }
         */
        get: function () {
            return this.textSearchModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "toolbar", {
        /**
         * Gets the toolbar object of the pdf viewer.
    
    
         * @returns { Toolbar }
         */
        get: function () {
            return this.toolbarModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "thumbnailView", {
        /**
         * Gets the thumbnail-view object of the pdf viewer.
    
    
         * @returns { ThumbnailView }
         */
        get: function () {
            return this.thumbnailViewModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfViewer.prototype, "annotation", {
        /**
         * Gets the annotation object of the pdf viewer.
    
    
         * @returns { Annotation }
         */
        get: function () {
            return this.annotationModule;
        },
        enumerable: true,
        configurable: true
    });
    PdfViewer.prototype.preRender = function () {
        this.localeObj = new L10n(this.getModuleName(), this.defaultLocale, this.locale);
    };
    PdfViewer.prototype.render = function () {
        this.viewerBase.initializeComponent();
        if (this.enableTextSelection && this.textSelectionModule) {
            this.textSelectionModule.enableTextSelectionMode();
        }
        else {
            this.viewerBase.disableTextSelectionMode();
        }
        this.drawing.renderLabels(this);
        this.renderComplete();
    };
    PdfViewer.prototype.getModuleName = function () {
        return 'PdfViewer';
    };
    /**
     * @private
     */
    PdfViewer.prototype.getLocaleConstants = function () {
        return this.defaultLocale;
    };
    PdfViewer.prototype.onPropertyChanged = function (newProp, oldProp) {
        var requireRefresh = false;
        if (this.isDestroyed) {
            return;
        }
        var properties = Object.keys(newProp);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'enableToolbar':
                    this.notify('', { module: 'toolbar', enable: this.enableToolbar });
                    requireRefresh = true;
                    break;
                case 'enableCommentPanel':
                    this.notify('', { module: 'annotation', enable: this.enableCommentPanel });
                    requireRefresh = true;
                    if (this.toolbarModule && this.toolbarModule.annotationToolbarModule) {
                        this.toolbarModule.annotationToolbarModule.enableCommentPanelTool(this.enableCommentPanel);
                    }
                    if (!this.enableCommentPanel) {
                        if (this.viewerBase.navigationPane) {
                            this.viewerBase.navigationPane.closeCommentPanelContainer();
                        }
                    }
                    break;
                case 'documentPath':
                    this.load(newProp.documentPath, null);
                    break;
                case 'interactionMode':
                    this.interactionMode = newProp.interactionMode;
                    if (newProp.interactionMode === 'Pan') {
                        this.viewerBase.initiatePanning();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(false);
                        }
                    }
                    else if (newProp.interactionMode === 'TextSelection') {
                        this.viewerBase.initiateTextSelectMode();
                        if (this.toolbar) {
                            this.toolbar.updateInteractionTools(true);
                        }
                    }
                    break;
                case 'height':
                    this.height = newProp.height;
                    this.viewerBase.updateHeight();
                    this.viewerBase.onWindowResize();
                    if (this.toolbar.annotationToolbarModule.isToolbarHidden) {
                        this.toolbar.annotationToolbarModule.adjustViewer(false);
                    }
                    else {
                        this.toolbar.annotationToolbarModule.adjustViewer(true);
                    }
                    break;
                case 'width':
                    this.width = newProp.width;
                    this.viewerBase.updateWidth();
                    this.viewerBase.onWindowResize();
                    break;
                case 'customStampItems':
                    this.annotation.stampAnnotationModule.isStampAddMode = true;
                    this.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
                    this.viewerBase.stampAdded = true;
                    this.viewerBase.isAlreadyAdded = false;
                    // tslint:disable-next-line:max-line-length
                    this.annotation.stampAnnotationModule.createCustomStampAnnotation(this.customStampItems[0].customStampImageSource);
                    break;
            }
        }
    };
    PdfViewer.prototype.getPersistData = function () {
        return 'PdfViewer';
    };
    PdfViewer.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableMagnification) {
            modules.push({
                member: 'Magnification', args: [this, this.viewerBase]
            });
        }
        if (this.enableNavigation) {
            modules.push({
                member: 'Navigation', args: [this, this.viewerBase]
            });
        }
        if (this.enableToolbar || this.enableNavigationToolbar) {
            modules.push({
                member: 'Toolbar', args: [this, this.viewerBase]
            });
        }
        if (this.enableHyperlink) {
            modules.push({
                member: 'LinkAnnotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableThumbnail) {
            modules.push({
                member: 'ThumbnailView', args: [this, this.viewerBase]
            });
        }
        if (this.enableBookmark) {
            modules.push({
                member: 'BookmarkView', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSelection) {
            modules.push({
                member: 'TextSelection', args: [this, this.viewerBase]
            });
        }
        if (this.enableTextSearch) {
            modules.push({
                member: 'TextSearch', args: [this, this.viewerBase]
            });
        }
        if (this.enablePrint) {
            modules.push({
                member: 'Print', args: [this, this.viewerBase]
            });
        }
        if (this.enableAnnotation) {
            modules.push({
                member: 'Annotation', args: [this, this.viewerBase]
            });
        }
        if (this.enableFormFields) {
            modules.push({
                member: 'FormFields', args: [this, this.viewerBase]
            });
        }
        return modules;
    };
    /**
     * Loads the given PDF document in the PDF viewer control
     * @param  {string} document - Specifies the document name for load
     * @param  {string} password - Specifies the Given document password
     * @returns void
     */
    PdfViewer.prototype.load = function (document, password) {
        if (this.viewerBase.pageCount !== 0) {
            this.viewerBase.clear(true);
        }
        else {
            this.viewerBase.clear(false);
        }
        this.viewerBase.pageCount = 0;
        this.viewerBase.currentPageNumber = 0;
        if (this.toolbarModule) {
            this.toolbarModule.resetToolbar();
        }
        this.viewerBase.initiatePageRender(document, password);
    };
    /**
     * Downloads the PDF document being loaded in the ejPdfViewer control.
     * @returns void
     */
    PdfViewer.prototype.download = function () {
        if (this.enableDownload) {
            this.viewerBase.download();
        }
    };
    /**
     * Saves the PDF document being loaded in the PDF Viewer control as blob.
     * @returns Promise<Blob>
     */
    PdfViewer.prototype.saveAsBlob = function () {
        var _this = this;
        if (this.enableDownload) {
            return new Promise(function (resolve, reject) {
                resolve(_this.viewerBase.saveAsBlob());
            });
        }
        else {
            return null;
        }
    };
    /**
     * updates the PDF Viewer container width and height from externally.
     * @returns void
     */
    PdfViewer.prototype.updateViewerContainer = function () {
        this.viewerBase.updateViewerContainer();
    };
    /**
     * Perform undo action for the edited annotations
     * @returns void
     */
    PdfViewer.prototype.undo = function () {
        if (this.annotationModule) {
            this.annotationModule.undo();
        }
    };
    /**
     * Perform redo action for the edited annotations
     * @returns void
     */
    PdfViewer.prototype.redo = function () {
        if (this.annotationModule) {
            this.annotationModule.redo();
        }
    };
    /**
     * Unloads the PDF document being displayed in the PDF viewer.
     * @returns void
     */
    PdfViewer.prototype.unload = function () {
        this.viewerBase.clear(true);
        this.viewerBase.pageCount = 0;
        this.toolbarModule.resetToolbar();
        this.magnificationModule.zoomTo(100);
    };
    /**
     * Destroys all managed resources used by this object.
     */
    PdfViewer.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.toolbarModule) {
            this.toolbarModule.destroy();
        }
        if (!isNullOrUndefined(this.element)) {
            this.element.classList.remove('e-pdfviewer');
            this.element.innerHTML = '';
        }
        this.viewerBase.destroy();
    };
    // tslint:disable-next-line
    /**
     * Perform imports annotations action in the PDF Viewer
     * @param  {any} importData - Specifies the data for annotation imports
     * @returns void
     */
    // tslint:disable-next-line
    PdfViewer.prototype.importAnnotations = function (importData) {
        if (this.annotationModule) {
            this.viewerBase.importAnnotations(importData);
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns void
     */
    PdfViewer.prototype.exportAnnotations = function () {
        if (this.annotationModule) {
            this.viewerBase.exportAnnotations();
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns Promise<object>
     */
    PdfViewer.prototype.exportAnnotationsAsObject = function () {
        var _this = this;
        if (this.annotationModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportAnnotationsAsObject().then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    // tslint:disable-next-line
    /**
     * Perform  action in the PDF Viewer
     * @returns void
     */
    // tslint:disable-next-line
    PdfViewer.prototype.importFormFields = function (formFields) {
        if (this.formFieldsModule) {
            this.viewerBase.importFormFields(formFields);
        }
    };
    /**
     * Perform export action in the PDF Viewer
     * @returns void
     */
    PdfViewer.prototype.exportFormFields = function () {
        if (this.formFieldsModule) {
            this.viewerBase.exportFormFields();
        }
    };
    /**
     * Perform export annotations action in the PDF Viewer
     * @returns Promise<object>
     */
    PdfViewer.prototype.exportFormFieldsAsObject = function () {
        var _this = this;
        if (this.formFieldsModule) {
            return new Promise(function (resolve, reject) {
                _this.viewerBase.exportFormFieldsAsObject().then(function (value) {
                    resolve(value);
                });
            });
        }
        else {
            return null;
        }
    };
    /**
     * To delete the annotation Collections in the PDF Document.
     * @returns void
     */
    PdfViewer.prototype.deleteAnnotations = function () {
        if (this.annotationModule) {
            this.viewerBase.deleteAnnotations();
        }
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireDocumentLoad = function () {
        var eventArgs = { name: 'documentLoad', documentName: this.fileName };
        this.trigger('documentLoad', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireDocumentUnload = function (fileName) {
        var eventArgs = { name: 'documentUnload', documentName: fileName };
        this.trigger('documentUnload', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireDocumentLoadFailed = function (isPasswordRequired, password) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'documentLoadFailed', documentName: this.fileName, isPasswordRequired: isPasswordRequired, password: password };
        this.trigger('documentLoadFailed', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireAjaxRequestFailed = function (errorStatusCode, errorMessage, action) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'ajaxRequestFailed', documentName: this.fileName, errorStatusCode: errorStatusCode, errorMessage: errorMessage, action: action };
        this.trigger('ajaxRequestFailed', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.firePageClick = function (x, y, pageNumber) {
        var eventArgs = { name: 'pageClick', documentName: this.fileName, x: x, y: y, pageNumber: pageNumber };
        this.trigger('pageClick', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.firePageChange = function (previousPageNumber) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'pageChange', documentName: this.fileName, currentPageNumber: this.viewerBase.currentPageNumber, previousPageNumber: previousPageNumber };
        this.trigger('pageChange', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireZoomChange = function () {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'zoomChange', zoomValue: this.magnificationModule.zoomFactor * 100, previousZoomValue: this.magnificationModule.previousZoomFactor * 100 };
        this.trigger('zoomChange', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireHyperlinkClick = function (hyperlink, hyperlinkElement) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'hyperlinkClick', hyperlink: hyperlink, hyperlinkElement: hyperlinkElement };
        this.trigger('hyperlinkClick', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireHyperlinkHover = function (hyperlinkElement) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'hyperlinkMouseOver', hyperlinkElement: hyperlinkElement };
        this.trigger('hyperlinkMouseOver', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireAnnotationAdd = function (pageNumber, index, type, bounds, settings, textMarkupContent, tmStartIndex, tmEndIndex) {
        var eventArgs = { name: 'annotationAdd', pageIndex: pageNumber, annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        if (textMarkupContent) {
            eventArgs.textMarkupContent = textMarkupContent;
            eventArgs.textMarkupStartIndex = tmStartIndex;
            eventArgs.textMarkupEndIndex = tmEndIndex;
        }
        this.trigger('annotationAdd', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireAnnotationRemove = function (pageNumber, index, type) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'annotationRemove', pageIndex: pageNumber, annotationId: index, annotationType: type };
        this.trigger('annotationRemove', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    PdfViewer.prototype.fireAnnotationPropertiesChange = function (pageNumber, index, type, isColorChanged, isOpacityChanged, isTextChanged, isCommentsChanged) {
        var eventArgs = { name: 'annotationPropertiesChange', pageIndex: pageNumber, annotationId: index, annotationType: type, isColorChanged: isColorChanged, isOpacityChanged: isOpacityChanged, isTextChanged: isTextChanged, isCommentsChanged: isCommentsChanged };
        this.trigger('annotationPropertiesChange', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireAnnotationSelect = function (id, pageNumber, annotation) {
        var eventArgs = { name: 'annotationSelect', annotationId: id, pageIndex: pageNumber, annotation: annotation };
        this.trigger('annotationSelect', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireTextSelectionStart = function (pageNumber) {
        var eventArgs = { pageIndex: pageNumber };
        this.trigger('textSelectionStart', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireTextSelectionEnd = function (pageNumber, text, bound) {
        var eventArgs = { pageIndex: pageNumber, textContent: text, textBounds: bound };
        this.trigger('textSelectionEnd', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.renderDrawing = function (canvas, index) {
        if (!index && this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        if (this.annotation) {
            this.annotation.renderAnnotations(index, null, null, null, canvas);
        }
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireAnnotationResize = function (pageNumber, index, type, bounds, settings) {
        var eventArgs = { name: 'annotationResize', pageIndex: pageNumber, annotationId: index, annotationType: type, annotationBound: bounds, annotationSettings: settings };
        this.trigger('annotationResize', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.fireThumbnailClick = function (pageNumber) {
        var eventArgs = { name: 'thumbnailClick', pageNumber: pageNumber };
        this.trigger('thumbnailClick', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireImportStart = function (importData) {
        var eventArgs = { name: 'ImportAnnotationsStart', importData: importData };
        this.trigger('importStart', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireExportStart = function (exportData) {
        var eventArgs = { name: 'ExportAnnotationsStart', exportData: exportData };
        this.trigger('exportStart', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireImportSuccess = function (importData) {
        var eventArgs = { name: 'ImportAnnotationsSuccess', importData: importData };
        this.trigger('importSuccess', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireExportSuccess = function (exportData, fileName) {
        var eventArgs = { name: 'ExportAnnotationsSuccess', exportData: exportData, fileName: fileName };
        this.trigger('exportSuccess', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireImportFailed = function (data, errorDetails) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'importAnnotationsFailed', importData: data, errorDetails: errorDetails };
        this.trigger('importFailed', eventArgs);
    };
    /**
     * @private
     */
    // tslint:disable-next-line
    PdfViewer.prototype.fireExportFailed = function (data, errorDetails) {
        // tslint:disable-next-line:max-line-length
        var eventArgs = { name: 'exportAnnotationsFailed', exportData: data, errorDetails: errorDetails };
        this.trigger('exportFailed', eventArgs);
    };
    /**
     * @private
     */
    PdfViewer.prototype.renderAdornerLayer = function (bounds, commonStyle, cavas, index) {
        renderAdornerLayer(bounds, commonStyle, cavas, index, this);
    };
    /**
     * @private
     */
    PdfViewer.prototype.renderSelector = function (index) {
        this.drawing.renderSelector(index);
    };
    /**
     * @private
     */
    PdfViewer.prototype.select = function (objArray, multipleSelection, preventUpdate) {
        var annotationSelect = this.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage;
        if (annotationSelect) {
            this.annotationModule.textMarkupAnnotationModule.clearCurrentAnnotationSelection(annotationSelect, true);
        }
        this.drawing.select(objArray, multipleSelection, preventUpdate);
    };
    /**
     * @private
     */
    PdfViewer.prototype.getPageTable = function (pageId) {
        return this.drawing.getPageTable(pageId);
    };
    /**
     * @private
     */
    PdfViewer.prototype.dragSelectedObjects = function (diffX, diffY, pageIndex, helper) {
        return this.drawing.dragSelectedObjects(diffX, diffY, pageIndex, helper);
    };
    /**
     * @private
     */
    PdfViewer.prototype.scaleSelectedItems = function (sx, sy, pivot) {
        return this.drawing.scaleSelectedItems(sx, sy, pivot);
    };
    /**
     * @private
     */
    // tslint:disable-next-line:max-line-length
    PdfViewer.prototype.dragConnectorEnds = function (endPoint, obj, point, segment, target, targetPortId) {
        return this.drawing.dragConnectorEnds(endPoint, obj, point, segment, target);
    };
    /**
     * @private
     */
    PdfViewer.prototype.clearSelection = function (pageId) {
        var selectormodel = this.selectedItems;
        if (selectormodel.annotations.length > 0) {
            selectormodel.offsetX = 0;
            selectormodel.offsetY = 0;
            selectormodel.width = 0;
            selectormodel.height = 0;
            selectormodel.rotateAngle = 0;
            selectormodel.annotations = [];
            selectormodel.wrapper = null;
        }
        this.drawing.clearSelectorLayer(pageId);
    };
    /**
     * @private
     */
    PdfViewer.prototype.add = function (obj) {
        return this.drawing.add(obj);
    };
    /**
     * @private
     */
    PdfViewer.prototype.remove = function (obj) {
        return this.drawing.remove(obj);
    };
    /**
     * @private
     */
    PdfViewer.prototype.copy = function () {
        this.annotation.isShapeCopied = true;
        return this.drawing.copy();
    };
    /**
     * @private
     */
    PdfViewer.prototype.rotate = function (angle) {
        return this.drawing.rotate(this.selectedItems, angle);
    };
    /**
     * @private
     */
    PdfViewer.prototype.paste = function (obj) {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        return this.drawing.paste(obj, index || 0);
    };
    /**
     * @private
     */
    PdfViewer.prototype.refresh = function () {
        for (var i = 0; i < this.annotations.length; i++) {
            if (this.zIndexTable.length !== undefined) {
                var notFound = true;
                for (var i_1 = 0; i_1 < this.zIndexTable.length; i_1++) {
                    var objects = this.zIndexTable[i_1].objects;
                    for (var j = 0; j < objects.length; j++) {
                        objects.splice(j, 1);
                    }
                    delete this.zIndexTable[i_1];
                }
                this.annotations = [];
                this.selectedItems.annotations = [];
                this.zIndexTable = [];
                this.renderDrawing();
            }
        }
    };
    /**
     * @private
     */
    PdfViewer.prototype.cut = function () {
        var index;
        if (this.viewerBase.activeElements.activePageID) {
            index = this.viewerBase.activeElements.activePageID;
        }
        this.annotation.isShapeCopied = true;
        return this.drawing.cut(index || 0);
    };
    /**
     * @private
     */
    PdfViewer.prototype.nodePropertyChange = function (actualObject, node) {
        this.drawing.nodePropertyChange(actualObject, node);
    };
    /**
     * @private
     */
    PdfViewer.prototype.checkBoundaryConstraints = function (tx, ty, pageIndex, nodeBounds, isStamp) {
        return this.drawing.checkBoundaryConstraints(tx, ty, pageIndex, nodeBounds, isStamp);
    };
    __decorate([
        Property()
    ], PdfViewer.prototype, "serviceUrl", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "documentPath", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], PdfViewer.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigationToolbar", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableCommentPanel", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableTextMarkupResizer", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableDownload", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePrint", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableThumbnail", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableBookmark", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHyperlink", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableHandwrittenSignature", void 0);
    __decorate([
        Property('CurrentTab')
    ], PdfViewer.prototype, "hyperlinkOpenState", void 0);
    __decorate([
        Property('RightClick')
    ], PdfViewer.prototype, "contextMenuOption", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableNavigation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMagnification", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableShapeLabel", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enablePinchZoom", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSelection", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextSearch", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFormFields", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableFreeText", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableTextMarkupAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableShapeAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableMeasureAnnotation", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStampAnnotations", void 0);
    __decorate([
        Property(true)
    ], PdfViewer.prototype, "enableStickyNotesAnnotation", void 0);
    __decorate([
        Property(false)
    ], PdfViewer.prototype, "enableAnnotationToolbar", void 0);
    __decorate([
        Property('TextSelection')
    ], PdfViewer.prototype, "interactionMode", void 0);
    __decorate([
        Property({ showTooltip: true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'SelectionTool', 'CommentTool', 'AnnotationEditTool', 'FreeTextAnnotationOption', 'InkAnnotationOption', 'ShapeAnnotationOption', 'StampAnnotation', 'SignatureOption', 'SearchOption', 'PrintOption', 'DownloadOption'] })
    ], PdfViewer.prototype, "toolbarSettings", void 0);
    __decorate([
        Property({ ajaxHeaders: [] })
    ], PdfViewer.prototype, "ajaxRequestSettings", void 0);
    __decorate([
        Property({ customStampName: '', customStampImageSource: '' })
    ], PdfViewer.prototype, "customStampItems", void 0);
    __decorate([
        Property({ showTooltip: true, annotationToolbarItem: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool', 'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool', 'HandWrittenSignatureTool', 'ShapeTool', 'CalibrateTool', 'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool', 'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool', 'FontColorAnnotationTool', 'CommentPanelTool'] })
    ], PdfViewer.prototype, "annotationToolbarSettings", void 0);
    __decorate([
        Property({ load: 'Load', renderPages: 'RenderPdfPages', unload: 'Unload', download: 'Download', renderThumbnail: 'RenderThumbnailImages', print: 'PrintImages', renderComments: 'RenderAnnotationComments', importAnnotations: 'ImportAnnotations', exportAnnotations: 'ExportAnnotations', importFormFields: 'ImportFormFields', exportFormFields: 'ExportFormFields' })
    ], PdfViewer.prototype, "serverActionSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#FFDF56', author: 'Guest', subject: 'Highlight', modifiedDate: '' })
    ], PdfViewer.prototype, "highlightSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#ff0000', author: 'Guest', subject: 'Strikethrough', modifiedDate: '' })
    ], PdfViewer.prototype, "strikethroughSettings", void 0);
    __decorate([
        Property({ opacity: 1, color: '#00ff00', author: 'Guest', subject: 'Underline', modifiedDate: '' })
    ], PdfViewer.prototype, "underlineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Line', modifiedDate: '', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'None', lineHeadEndStyle: 'None' })
    ], PdfViewer.prototype, "lineSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Arrow', modifiedDate: '', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed' })
    ], PdfViewer.prototype, "arrowSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Rectangle', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "rectangleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ff0000', fontColor: '#000', fontSize: 16, labelHeight: 24.6, labelMaxWidth: 151 })
    ], PdfViewer.prototype, "shapeLabelSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Circle', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "circleSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Polygon', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "polygonSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', modifiedDate: '' })
    ], PdfViewer.prototype, "stampSettings", void 0);
    __decorate([
        Property({ opacity: 1, author: 'Guest', modifiedDate: '', width: 0, height: 0, left: 0, top: 0 })
    ], PdfViewer.prototype, "customStampSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Distance calculation', modifiedDate: '', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Closed', lineHeadEndStyle: 'Closed' })
    ], PdfViewer.prototype, "distanceSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Perimeter calculation', modifiedDate: '', thickness: 1, borderDashArray: 0, lineHeadStartStyle: 'Open', lineHeadEndStyle: 'Open' })
    ], PdfViewer.prototype, "perimeterSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Area calculation', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "areaSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Radius calculation', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "radiusSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', strokeColor: '#ff0000', author: 'Guest', subject: 'Volume calculation', modifiedDate: '', thickness: 1 })
    ], PdfViewer.prototype, "volumeSettings", void 0);
    __decorate([
        Property({ author: 'Guest', subject: 'Sticky Note', modifiedDate: '', opacity: 1 })
    ], PdfViewer.prototype, "stickyNotesSettings", void 0);
    __decorate([
        Property({ opacity: 1, fillColor: '#ffffff00', borderColor: '#ffffff00', author: 'Guest', subject: 'Text Box', modifiedDate: '', borderWidth: 1, width: 151, fontSize: 16, height: 24.6, fontColor: '#000', fontFamily: 'Helvetica', defaultText: 'Type Here', textAlignment: 'Left', fontStyle: FontStyle.None })
    ], PdfViewer.prototype, "freeTextSettings", void 0);
    __decorate([
        Property({ conversionUnit: 'in', displayUnit: 'in', scaleRatio: 1, depth: 96 })
    ], PdfViewer.prototype, "measurementSettings", void 0);
    __decorate([
        Property({ selectionBorderColor: '', resizerBorderColor: 'black', resizerFillColor: '#FF4081', resizerSize: 8, selectionBorderThickness: 1 })
    ], PdfViewer.prototype, "annotationSelectorSettings", void 0);
    __decorate([
        Property({ currentOccurrence: '#fdd835', otherOccurrence: '#8b4c12' })
    ], PdfViewer.prototype, "textSearchColorSettings", void 0);
    __decorate([
        Property({ opacity: 1, strokeColor: '#000000', width: 100, height: 100, thickness: 1 })
    ], PdfViewer.prototype, "handWrittenSignatureSettings", void 0);
    __decorate([
        Complex({}, Selector)
    ], PdfViewer.prototype, "selectedItems", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoad", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentUnload", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "documentLoadFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "ajaxRequestFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "pageChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "hyperlinkMouseOver", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "zoomChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationAdd", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationRemove", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationPropertiesChange", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationResize", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "annotationSelect", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportSuccess", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "importFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "exportFailed", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "thumbnailClick", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionStart", void 0);
    __decorate([
        Event()
    ], PdfViewer.prototype, "textSelectionEnd", void 0);
    __decorate([
        Collection([], PdfAnnotationBase)
    ], PdfViewer.prototype, "annotations", void 0);
    __decorate([
        Property('')
    ], PdfViewer.prototype, "tool", void 0);
    __decorate([
        Property()
    ], PdfViewer.prototype, "drawingObject", void 0);
    PdfViewer = __decorate([
        NotifyPropertyChanges
    ], PdfViewer);
    return PdfViewer;
}(Component));
export { PdfViewer };
