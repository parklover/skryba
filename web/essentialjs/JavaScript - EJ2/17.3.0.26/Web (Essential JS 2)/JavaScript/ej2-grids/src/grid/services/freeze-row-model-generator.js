import { RowModelGenerator } from '../services/row-model-generator';
/**
 * FreezeRowModelGenerator is used to generate grid data rows with freeze row and column.

 */
var FreezeRowModelGenerator = /** @class */ (function () {
    function FreezeRowModelGenerator(parent) {
        this.isFrzLoad = 1;
        this.parent = parent;
        this.rowModelGenerator = new RowModelGenerator(this.parent);
    }
    FreezeRowModelGenerator.prototype.generateRows = function (data, notifyArgs) {
        var frzCols = this.parent.getFrozenColumns();
        var row = this.rowModelGenerator.generateRows(data, notifyArgs);
        for (var i = 0, len = row.length; i < len; i++) {
            if (this.isFrzLoad % 2 === 0) {
                row[i].cells = row[i].cells.slice(frzCols, row[i].cells.length);
            }
            else {
                row[i].cells = row[i].cells.slice(0, frzCols);
            }
        }
        this.isFrzLoad++;
        return row;
    };
    return FreezeRowModelGenerator;
}());
export { FreezeRowModelGenerator };
