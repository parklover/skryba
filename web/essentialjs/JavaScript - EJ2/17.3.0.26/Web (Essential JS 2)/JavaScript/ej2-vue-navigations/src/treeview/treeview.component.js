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
import { TreeView } from '@syncfusion/ej2-navigations';
export var properties = ['allowDragAndDrop', 'allowEditing', 'allowMultiSelection', 'animation', 'autoCheck', 'checkedNodes', 'cssClass', 'enablePersistence', 'enableRtl', 'expandOn', 'expandedNodes', 'fields', 'fullRowSelect', 'loadOnDemand', 'locale', 'nodeTemplate', 'selectedNodes', 'showCheckBox', 'sortOrder', 'created', 'dataBound', 'dataSourceChanged', 'destroyed', 'drawNode', 'keyPress', 'nodeChecked', 'nodeChecking', 'nodeClicked', 'nodeCollapsed', 'nodeCollapsing', 'nodeDragStart', 'nodeDragStop', 'nodeDragging', 'nodeDropped', 'nodeEdited', 'nodeEditing', 'nodeExpanded', 'nodeExpanding', 'nodeSelected', 'nodeSelecting'];
export var modelProps = [];
/**
 * Represents the EJ2 VueJS TreeView Component.
 * ```html
 * <ejs-treeview></ejs-treeview>
 * ```
 */
var TreeViewComponent = /** @class */ (function (_super) {
    __extends(TreeViewComponent, _super);
    function TreeViewComponent() {
        var _this = _super.call(this) || this;
        _this.propKeys = properties;
        _this.models = modelProps;
        _this.hasChildDirective = false;
        _this.hasInjectedModules = false;
        _this.tagMapper = {};
        _this.tagNameMapper = {};
        _this.ej2Instances = new TreeView({});
        _this.bindProperties();
        _this.ej2Instances._setProperties = _this.ej2Instances.setProperties;
        _this.ej2Instances.setProperties = _this.setProperties;
        return _this;
    }
    TreeViewComponent.prototype.setProperties = function (prop, muteOnChange) {
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
    TreeViewComponent.prototype.render = function (createElement) {
        return createElement('div', this.$slots.default);
    };
    TreeViewComponent.prototype.addNodes = function (nodes, target, index, preventTargetExpand) {
        return this.ej2Instances.addNodes(nodes, target, index, preventTargetExpand);
    };
    TreeViewComponent.prototype.beginEdit = function (node) {
        return this.ej2Instances.beginEdit(node);
    };
    TreeViewComponent.prototype.checkAll = function (nodes) {
        return this.ej2Instances.checkAll(nodes);
    };
    TreeViewComponent.prototype.collapseAll = function (nodes, level, excludeHiddenNodes) {
        return this.ej2Instances.collapseAll(nodes, level, excludeHiddenNodes);
    };
    TreeViewComponent.prototype.disableNodes = function (nodes) {
        return this.ej2Instances.disableNodes(nodes);
    };
    TreeViewComponent.prototype.enableNodes = function (nodes) {
        return this.ej2Instances.enableNodes(nodes);
    };
    TreeViewComponent.prototype.ensureVisible = function (node) {
        return this.ej2Instances.ensureVisible(node);
    };
    TreeViewComponent.prototype.expandAll = function (nodes, level, excludeHiddenNodes) {
        return this.ej2Instances.expandAll(nodes, level, excludeHiddenNodes);
    };
    TreeViewComponent.prototype.getAllCheckedNodes = function () {
        return this.ej2Instances.getAllCheckedNodes();
    };
    TreeViewComponent.prototype.getNode = function (node) {
        return this.ej2Instances.getNode(node);
    };
    TreeViewComponent.prototype.getTreeData = function (node) {
        return this.ej2Instances.getTreeData(node);
    };
    TreeViewComponent.prototype.moveNodes = function (sourceNodes, target, index, preventTargetExpand) {
        return this.ej2Instances.moveNodes(sourceNodes, target, index, preventTargetExpand);
    };
    TreeViewComponent.prototype.removeNodes = function (nodes) {
        return this.ej2Instances.removeNodes(nodes);
    };
    TreeViewComponent.prototype.uncheckAll = function (nodes) {
        return this.ej2Instances.uncheckAll(nodes);
    };
    TreeViewComponent.prototype.updateNode = function (target, newText) {
        return this.ej2Instances.updateNode(target, newText);
    };
    TreeViewComponent = __decorate([
        EJComponentDecorator({
            props: properties
        })
    ], TreeViewComponent);
    return TreeViewComponent;
}(ComponentBase));
export { TreeViewComponent };
export var TreeViewPlugin = {
    name: 'ejs-treeview',
    install: function (Vue) {
        Vue.component(TreeViewPlugin.name, TreeViewComponent);
    }
};
