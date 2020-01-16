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
import Vue from 'vue';
import { EJComponentDecorator } from '@syncfusion/ej2-vue-base';
var CustomCursorsDirective = /** @class */ (function (_super) {
    __extends(CustomCursorsDirective, _super);
    function CustomCursorsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomCursorsDirective.prototype.render = function () {
        return;
    };
    CustomCursorsDirective = __decorate([
        EJComponentDecorator({})
    ], CustomCursorsDirective);
    return CustomCursorsDirective;
}(Vue));
export { CustomCursorsDirective };
export var CustomCursorsPlugin = {
    name: 'e-cursormaps',
    install: function (Vue) {
        Vue.component(CustomCursorsPlugin.name, CustomCursorsDirective);
    }
};
/**
 * `e-custormaps` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
var CustomCursorDirective = /** @class */ (function (_super) {
    __extends(CustomCursorDirective, _super);
    function CustomCursorDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomCursorDirective.prototype.render = function () {
        return;
    };
    CustomCursorDirective = __decorate([
        EJComponentDecorator({})
    ], CustomCursorDirective);
    return CustomCursorDirective;
}(Vue));
export { CustomCursorDirective };
export var CustomCursorPlugin = {
    name: 'e-cursormap',
    install: function (Vue) {
        Vue.component(CustomCursorPlugin.name, CustomCursorDirective);
    }
};
