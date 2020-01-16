import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { PivotButton } from '../../common/actions/pivot-button';
/**
 * Module to render Axis Fields
 */
var AxisFieldRenderer = /** @class */ (function () {
    /** Constructor for render module */
    function AxisFieldRenderer(parent) {
        this.parent = parent;
    }
    /**
     * Initialize the pivot button rendering
     * @returns void
     * @private
     */
    AxisFieldRenderer.prototype.render = function () {
        this.pivotButton = new PivotButton(this.parent);
        this.createPivotButtons();
    };
    AxisFieldRenderer.prototype.createPivotButtons = function () {
        var rows = this.parent.dataSourceSettings.rows;
        var columns = this.parent.dataSourceSettings.columns;
        var values = this.parent.dataSourceSettings.values;
        var filters = this.parent.dataSourceSettings.filters;
        var fields = [rows, columns, values, filters];
        var parentElement = this.parent.dialogRenderer.parentElement;
        if (parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-filters')) {
            parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-filters').querySelector('.' + cls.AXIS_CONTENT_CLASS).innerHTML = '';
        }
        if (parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-rows')) {
            parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-rows').querySelector('.' + cls.AXIS_CONTENT_CLASS).innerHTML = '';
        }
        if (parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-columns')) {
            parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-columns').querySelector('.' + cls.AXIS_CONTENT_CLASS).innerHTML = '';
        }
        if (parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-values')) {
            parentElement.querySelector('.' + cls.FIELD_LIST_CLASS + '-values').querySelector('.' + cls.AXIS_CONTENT_CLASS).innerHTML = '';
        }
        var axis = ['rows', 'columns', 'values', 'filters'];
        for (var len = 0, lnt = fields.length; len < lnt; len++) {
            if (fields[len]) {
                var args = {
                    field: fields[len],
                    axis: axis[len].toString()
                };
                this.parent.notify(events.pivotButtonUpdate, args);
            }
        }
    };
    return AxisFieldRenderer;
}());
export { AxisFieldRenderer };
