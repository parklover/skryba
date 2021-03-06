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
import { ExcelFilterBase } from '../common/excel-filter-base';
import { CheckBoxFilter } from './checkbox-filter';
/**

 * `ExcelFilter` module is used to handle filtering action.
 */
var ExcelFilter = /** @class */ (function (_super) {
    __extends(ExcelFilter, _super);
    /**
     * Constructor for excelbox filtering module

     */
    function ExcelFilter(parent, filterSettings, serviceLocator, customFltrOperators) {
        var _this = _super.call(this, parent, filterSettings, serviceLocator) || this;
        _this.parent = parent;
        _this.excelFilterBase = new ExcelFilterBase(parent, filterSettings, customFltrOperators);
        return _this;
    }
    /**
     * To destroy the excel filter.
     * @return {void}

     */
    ExcelFilter.prototype.destroy = function () {
        this.excelFilterBase.closeDialog();
    };
    ExcelFilter.prototype.openDialog = function (options) {
        this.excelFilterBase.openDialog(options);
    };
    ExcelFilter.prototype.closeDialog = function () {
        this.excelFilterBase.closeDialog();
    };
    /* tslint:disable-next-line:max-line-length */
    ExcelFilter.prototype.filterByColumn = function (fieldName, firstOperator, firstValue, predicate, matchCase, ignoreAccent, secondOperator, secondValue) {
        /* tslint:disable-next-line:max-line-length */
        this.excelFilterBase.filterByColumn(fieldName, firstOperator, firstValue, predicate, matchCase, ignoreAccent, secondOperator, secondValue);
    };
    /**
     * For internal use only - Get the module name.
     * @private
     */
    ExcelFilter.prototype.getModuleName = function () {
        return 'excelFilter';
    };
    return ExcelFilter;
}(CheckBoxFilter));
export { ExcelFilter };
