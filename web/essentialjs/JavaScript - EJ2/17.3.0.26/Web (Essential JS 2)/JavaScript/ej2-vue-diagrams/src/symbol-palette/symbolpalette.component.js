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
import { ComponentBase, EJComponentDecorator } from '@syncfusion/ej2-vue-base';
import { SymbolPalette } from '@syncfusion/ej2-diagrams';
import { PalettesDirective, PaletteDirective, PalettesPlugin, PalettePlugin } from './palettes.directive';
export var properties = ['accessKey', 'allowDrag', 'connectorDefaults', 'enableAnimation', 'enablePersistence', 'enableRtl', 'enableSearch', 'expandMode', 'filterSymbols', 'getConnectorDefaults', 'getNodeDefaults', 'getSymbolInfo', 'getSymbolTemplate', 'height', 'ignoreSymbolsOnSearch', 'locale', 'nodeDefaults', 'palettes', 'symbolHeight', 'symbolInfo', 'symbolMargin', 'symbolPreview', 'symbolWidth', 'width', 'paletteSelectionChange'];
export var modelProps = [];
/**
 * Represents vue SymbolPalette Component
 * ```html
 * <ej-symbol-palette></ej-symbol-palette>
 * ```
 */
var SymbolPaletteComponent = /** @class */ (function (_super) {
    __extends(SymbolPaletteComponent, _super);
    function SymbolPaletteComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = true;
        _this.hasInjectedModules = true;
        _this.tagMapper = { "e-palettes": "e-palette" };
        _this.tagNameMapper = {};
        _this.ej2Instances = new SymbolPalette({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    SymbolPaletteComponent.prototype.setProperties = function (prop, muteOnChange) {
        var _this = this;
        if (this.ej2Instances && this.ej2Instances._setProperties) {
            this.ej2Instances._setProperties(prop, muteOnChange);
        }
        if (prop && this.models && this.models.length) {
            Object.keys(prop).map(function (key) {
                _this.models.map(function (model) {
                    if ((key === model) && !(/datasource/i.test(key))) {
                        _this.$emit('update:' + key, prop[key]);
                    }
                });
            });
        }
    };
    SymbolPaletteComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    SymbolPaletteComponent.prototype.addPaletteItem = function (paletteName, paletteSymbol) {
        return this.ej2Instances.addPaletteItem(paletteName, paletteSymbol);
    };
    SymbolPaletteComponent.prototype.removePaletteItem = function (paletteName, symbolId) {
        return this.ej2Instances.removePaletteItem(paletteName, symbolId);
    };
    SymbolPaletteComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], SymbolPaletteComponent);
    return SymbolPaletteComponent;
}(ComponentBase));
export { SymbolPaletteComponent };
export var SymbolPalettePlugin = {
    name: 'ejs-symbolpalette',
    install: function (Vue) {
        Vue.component(SymbolPalettePlugin.name, SymbolPaletteComponent);
        Vue.component(PalettePlugin.name, PaletteDirective);
        Vue.component(PalettesPlugin.name, PalettesDirective);
    }
};
