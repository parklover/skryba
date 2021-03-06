import { getObject, Grid, Reorder as GridReorder } from '@syncfusion/ej2-grids';
/**
 * TreeGrid Reorder module

 */
var Reorder = /** @class */ (function () {
    /**
     * Constructor for Reorder module
     */
    function Reorder(parent, treeColumn) {
        Grid.Inject(GridReorder);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    Reorder.prototype.getModuleName = function () {
        return 'reorder';
    };
    /**

     */
    Reorder.prototype.addEventListener = function () {
        this.parent.on('getColumnIndex', this.getTreeColumn, this);
    };
    Reorder.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('getColumnIndex', this.getTreeColumn);
    };
    /**
     * To destroy the Reorder
     * @return {void}

     */
    Reorder.prototype.destroy = function () {
        this.removeEventListener();
    };
    Reorder.prototype.getTreeColumn = function () {
        var treeColumn = this.parent.columns[this.parent.treeColumnIndex];
        var treeIndex;
        var updatedCols = this.parent.getColumns();
        for (var f = 0; f < updatedCols.length; f++) {
            var treeColumnfield = getObject('field', treeColumn);
            var parentColumnfield = getObject('field', updatedCols[f]);
            if (treeColumnfield === parentColumnfield) {
                treeIndex = f;
                break;
            }
        }
        this.parent.setProperties({ treeColumnIndex: treeIndex }, true);
    };
    return Reorder;
}());
export { Reorder };
