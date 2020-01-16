import { remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { uiUpdate, initialEnd, dataReady, modelChanged, refreshAggregates, refreshFooterRenderer, groupAggregates } from '../base/constant';
import { FooterRenderer } from '../renderer/footer-renderer';
import { SummaryCellRenderer } from '../renderer/summary-cell-renderer';
import { GroupSummaryModelGenerator, CaptionSummaryModelGenerator } from '../services/summary-model-generator';
/**
 * Summary Action controller.
 */
var Aggregate = /** @class */ (function () {
    function Aggregate(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.addEventListener();
    }
    Aggregate.prototype.getModuleName = function () {
        return 'aggregate';
    };
    Aggregate.prototype.initiateRender = function () {
        var _this = this;
        var cellFac = this.locator.getService('cellRendererFactory');
        var instance = new SummaryCellRenderer(this.parent, this.locator);
        [CellType.Summary, CellType.CaptionSummary, CellType.GroupSummary].forEach(function (type) {
            return cellFac.addCellRenderer(type, instance);
        });
        this.footerRenderer = new FooterRenderer(this.parent, this.locator);
        this.footerRenderer.renderPanel();
        this.footerRenderer.renderTable();
        this.locator.register('footerRenderer', this.footerRenderer);
        var fn = function () {
            _this.prepareSummaryInfo();
            _this.parent.off(dataReady, fn);
        };
        this.parent.on(dataReady, fn, this);
        this.parent.on(dataReady, this.footerRenderer.refresh, this.footerRenderer);
    };
    Aggregate.prototype.prepareSummaryInfo = function () {
        var _this = this;
        summaryIterator(this.parent.aggregates, function (column) {
            var dataColumn = _this.parent.getColumnByField(column.field) || {};
            var type = dataColumn.type;
            var cFormat = 'customFormat';
            if (!isNullOrUndefined(column[cFormat])) {
                column.setPropertiesSilent({ format: column[cFormat] });
            }
            column.setPropertiesSilent({ format: _this.getFormatFromType(column.format, type) });
            column.setFormatter(_this.parent.locale);
            column.setPropertiesSilent({ columnName: column.columnName || column.field });
        });
    };
    Aggregate.prototype.getFormatFromType = function (format, type) {
        if (isNullOrUndefined(type) || typeof format !== 'string') {
            return format;
        }
        var obj;
        switch (type) {
            case 'number':
                obj = { format: format };
                break;
            case 'date':
                obj = { type: type, skeleton: format };
                break;
            case 'datetime':
                obj = { type: 'dateTime', skeleton: format };
                break;
        }
        return obj;
    };
    Aggregate.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        if (isNullOrUndefined(this.footerRenderer)) {
            this.initiateRender();
        }
        this.prepareSummaryInfo();
        this.footerRenderer.refresh();
        var cModel = new CaptionSummaryModelGenerator(this.parent);
        var gModel = new GroupSummaryModelGenerator(this.parent);
        if (gModel.getData().length !== 0 || !cModel.isEmpty()) {
            this.parent.notify(modelChanged, {});
        }
    };
    Aggregate.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(initialEnd, this.initiateRender, this);
        this.parent.on(uiUpdate, this.onPropertyChanged, this);
        this.parent.on(refreshAggregates, this.refresh, this);
    };
    Aggregate.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.footerRenderer.removeEventListener();
        this.parent.off(initialEnd, this.initiateRender);
        this.parent.off(dataReady, this.footerRenderer.refresh);
        this.parent.off(uiUpdate, this.onPropertyChanged);
        this.parent.off(refreshAggregates, this.refresh);
    };
    Aggregate.prototype.destroy = function () {
        this.removeEventListener();
        remove(this.parent.element.querySelector('.e-gridfooter'));
    };
    Aggregate.prototype.refresh = function (data) {
        var editedData = data instanceof Array ? data : [data];
        this.parent.notify(refreshFooterRenderer, editedData);
        if (this.parent.groupSettings.columns.length > 0) {
            this.parent.notify(groupAggregates, editedData);
        }
    };
    return Aggregate;
}());
export { Aggregate };
/**
 * @private
 */
export function summaryIterator(aggregates, callback) {
    aggregates.forEach(function (row) {
        row.columns.forEach(function (column) {
            callback(column, row);
        });
    });
}