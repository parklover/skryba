import { PivotButton } from '../actions/pivot-button';
import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { createElement, prepend } from '@syncfusion/ej2-base';
/**
 * Module to render Axis Fields
 */
var AxisFields = /** @class */ (function () {
    /** Constructor for render module */
    function AxisFields(parent) {
        this.parent = parent;
    }
    /**
     * Initialize the pivot button rendering
     * @returns void
     * @private
     */
    AxisFields.prototype.render = function () {
        this.pivotButton = new PivotButton(this.parent);
        this.createPivotButtons();
        var pivotButtons = [];
        /* tslint:disable:no-any */
        for (var _i = 0, _a = this.parent.element.querySelectorAll('.' + cls.GROUP_ROW_CLASS); _i < _a.length; _i++) {
            var element = _a[_i];
            if (!element.classList.contains(cls.GROUP_CHART_ROW)) {
                pivotButtons = pivotButtons.concat([].slice.call(element.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS)));
            }
        }
        var vlen = pivotButtons.length;
        for (var j = 0; j < vlen; j++) {
            var indentWidth = 24;
            var indentDiv = createElement('span', {
                className: 'e-indent-div',
                styles: 'width:' + j * indentWidth + 'px'
            });
            prepend([indentDiv], pivotButtons[j]);
        }
    };
    AxisFields.prototype.createPivotButtons = function () {
        var fields = [this.parent.dataSourceSettings.rows, this.parent.dataSourceSettings.columns,
            this.parent.dataSourceSettings.values, this.parent.dataSourceSettings.filters];
        for (var _i = 0, _a = this.parent.element.querySelectorAll('.' + cls.GROUP_ROW_CLASS + ',.' + cls.GROUP_COLUMN_CLASS + ',.'
            + cls.GROUP_VALUE_CLASS + ',.' + cls.GROUP_FILTER_CLASS); _i < _a.length; _i++) {
            var element = _a[_i];
            if (this.parent.dataSourceSettings.values.length > 0 ? !element.classList.contains(cls.GROUP_CHART_VALUE) : true) {
                element.innerHTML = '';
            }
        }
        var axis = ['rows', 'columns', 'values', 'filters'];
        var count = axis.length;
        for (var i = 0, lnt = fields.length; i < lnt; i++) {
            if (fields[i]) {
                var args = {
                    field: fields[i],
                    axis: axis[i].toString()
                };
                this.parent.notify(events.pivotButtonUpdate, args);
            }
        }
    };
    return AxisFields;
}());
export { AxisFields };
