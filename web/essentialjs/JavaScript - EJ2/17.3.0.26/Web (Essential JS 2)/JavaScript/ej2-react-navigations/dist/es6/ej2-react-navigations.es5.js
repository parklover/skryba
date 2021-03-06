import { ComplexBase, ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
import { PureComponent, createElement } from 'react';
import { Accordion, ContextMenu, Menu, Sidebar, Tab, Toolbar, TreeView } from '@syncfusion/ej2-navigations';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ItemDirective` directive represent a item of the react Accordion.
 * It must be contained in a Accordion component(`Accordion`).
 * ```tsx
 * <AccordionComponent>
 * <AccordionItemsDirective>
 * <AccordionItemDirective  header='Header1'></AccordionItemDirective>
 * <AccordionItemDirective  header='Header2' content='Content2'></AccordionItemDirective>
 * <AccordionItemsDirective>
 * </AccordionComponent>
 * ```
 */
var AccordionItemDirective = /** @class */ (function (_super) {
    __extends(AccordionItemDirective, _super);
    function AccordionItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemDirective.moduleName = 'accordionItem';
    return AccordionItemDirective;
}(ComplexBase));
var AccordionItemsDirective = /** @class */ (function (_super) {
    __extends(AccordionItemsDirective, _super);
    function AccordionItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccordionItemsDirective.propertyName = 'items';
    AccordionItemsDirective.moduleName = 'accordionItems';
    return AccordionItemsDirective;
}(ComplexBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `AccordionComponent` represents the react Accordion Component.
 * ```ts
 * <AccordionComponent ></AccordionComponent
 * ```
 */
var AccordionComponent = /** @class */ (function (_super) {
    __extends$1(AccordionComponent, _super);
    function AccordionComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'accordionItems': 'accordionItem' };
        _this.immediateRender = false;
        return _this;
    }
    AccordionComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return AccordionComponent;
}(Accordion));
applyMixins(AccordionComponent, [ComponentBase, PureComponent]);

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ItemDirective` directive represent a item of the react Toolbar.
 * It must be contained in a Toolbar component(`Toolbar`).
 * ```tsx
 * <ToolbarComponent>
 * <ItemsDirective>
 * <ItemDirective text='Cut'></ItemDirective>
 * <ItemDirective text='Copy'></ItemDirective>
 * <ItemsDirective>
 * </ToolbarComponent>
 * ```
 */
var ItemDirective = /** @class */ (function (_super) {
    __extends$2(ItemDirective, _super);
    function ItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDirective.moduleName = 'item';
    return ItemDirective;
}(ComplexBase));
var ItemsDirective = /** @class */ (function (_super) {
    __extends$2(ItemsDirective, _super);
    function ItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemsDirective.propertyName = 'items';
    ItemsDirective.moduleName = 'items';
    return ItemsDirective;
}(ComplexBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ToolbarComponent` represents the react Toolbar Component.
 * ```ts
 * <ToolbarComponent overflowMode= 'Popup' ></ToolbarComponent
 * ```
 */
var ToolbarComponent = /** @class */ (function (_super) {
    __extends$3(ToolbarComponent, _super);
    function ToolbarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'items': 'item' };
        _this.immediateRender = false;
        return _this;
    }
    ToolbarComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return ToolbarComponent;
}(Toolbar));
applyMixins(ToolbarComponent, [ComponentBase, PureComponent]);

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ContextMenuComponent` represents the react ContextMenu Component.
 * ```ts
 * <div id='target'>Right click / Touch hold to open the ContextMenu</div>
 * <ContextMenuComponent target='#target' items={menuItems} />
 * ```
 */
var ContextMenuComponent = /** @class */ (function (_super) {
    __extends$4(ContextMenuComponent, _super);
    function ContextMenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.immediateRender = true;
        return _this;
    }
    ContextMenuComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), this.props.children);
        }
    };
    return ContextMenuComponent;
}(ContextMenu));
applyMixins(ContextMenuComponent, [ComponentBase, PureComponent]);

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `TabItemDirective` directive represent a column of the react Tab.
 * It must be contained in a Tab component(`Tab`).
 * ```ts
 * <TabComponent
 *  <TabItemsDirective>
 *   <TabItemDirective header= { 'Header 1' } content= { 'Content 1' } />
 *   <TabItemDirective header= { 'Header 2' } content= { 'Content 2' } />
 *  <TabItemsDirective>
 * </TabComponent>
 * ```
 */
var TabItemDirective = /** @class */ (function (_super) {
    __extends$5(TabItemDirective, _super);
    function TabItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemDirective.moduleName = 'tabItem';
    TabItemDirective.complexTemplate = { 'headerText': 'header.text' };
    return TabItemDirective;
}(ComplexBase));
var TabItemsDirective = /** @class */ (function (_super) {
    __extends$5(TabItemsDirective, _super);
    function TabItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabItemsDirective.propertyName = 'items';
    TabItemsDirective.moduleName = 'tabItems';
    return TabItemsDirective;
}(ComplexBase));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `TabComponent` represents the react Tab Component.
 * ```ts
 * <TabComponent overflowMode= 'Popup'></TabComponent>
 * ```
 */
var TabComponent = /** @class */ (function (_super) {
    __extends$6(TabComponent, _super);
    function TabComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'tabItems': 'tabItem' };
        _this.immediateRender = false;
        return _this;
    }
    TabComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return TabComponent;
}(Tab));
applyMixins(TabComponent, [ComponentBase, PureComponent]);

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `TreeViewComponent` represents the react TreeView Component.
 * ```ts
 * <TreeViewComponent allowDragAndDrop={true}></TreeViewComponent>
 * ```
 */
var TreeViewComponent = /** @class */ (function (_super) {
    __extends$7(TreeViewComponent, _super);
    function TreeViewComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = false;
        return _this;
    }
    TreeViewComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return TreeViewComponent;
}(TreeView));
applyMixins(TreeViewComponent, [ComponentBase, PureComponent]);

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `SidebarComponent` represents the Essential JS 2 React Sidebar Component.
 * ```ts
 * <SidebarComponent></SidebarComponent>
 * ```
 */
var SidebarComponent = /** @class */ (function (_super) {
    __extends$8(SidebarComponent, _super);
    function SidebarComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.immediateRender = true;
        return _this;
    }
    SidebarComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return SidebarComponent;
}(Sidebar));
applyMixins(SidebarComponent, [ComponentBase, PureComponent]);

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MenuItemDirective = /** @class */ (function (_super) {
    __extends$9(MenuItemDirective, _super);
    function MenuItemDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemDirective.moduleName = 'menuItem';
    return MenuItemDirective;
}(ComplexBase));
var MenuItemsDirective = /** @class */ (function (_super) {
    __extends$9(MenuItemsDirective, _super);
    function MenuItemsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItemsDirective.propertyName = 'items';
    MenuItemsDirective.moduleName = 'menuItems';
    return MenuItemsDirective;
}(ComplexBase));

var __extends$10 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `MenuComponent` represents the react Menu Component.
 * ```ts
 * <MenuComponent items={menuItems} />
 * ```
 */
var MenuComponent = /** @class */ (function (_super) {
    __extends$10(MenuComponent, _super);
    function MenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'menuItems': 'menuItem' };
        _this.immediateRender = false;
        return _this;
    }
    MenuComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('ul', this.getDefaultAttributes(), this.props.children);
        }
    };
    return MenuComponent;
}(Menu));
applyMixins(MenuComponent, [ComponentBase, PureComponent]);

export { AccordionItemDirective, AccordionItemsDirective, AccordionComponent, ItemDirective, ItemsDirective, ToolbarComponent, ContextMenuComponent, TabItemDirective, TabItemsDirective, TabComponent, TreeViewComponent, SidebarComponent, MenuItemDirective, MenuItemsDirective, MenuComponent };
export * from '@syncfusion/ej2-navigations';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-navigations.es5.js.map
