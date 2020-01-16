import { classList } from '@syncfusion/ej2-base';
/**
 * Edit render module is used to render grid edit row.

 */
var BatchEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function BatchEditRender(parent) {
        this.parent = parent;
    }
    BatchEditRender.prototype.update = function (elements, args) {
        args.cell.innerHTML = '';
        args.cell.appendChild(this.getEditElement(elements, args));
        args.cell.classList.remove('e-ellipsistooltip');
        args.cell.classList.add('e-editedbatchcell');
        classList(args.row, ['e-editedrow', 'e-batchrow'], []);
    };
    BatchEditRender.prototype.getEditElement = function (elements, args) {
        var gObj = this.parent;
        var form = this.parent
            .createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        form.appendChild(elements[args.columnObject.uid]);
        if (args.columnObject.editType === 'booleanedit') {
            args.cell.classList.add('e-boolcell');
        }
        if (!args.columnObject.editType) {
            args.cell.classList.add('e-inputbox');
        }
        return form;
    };
    BatchEditRender.prototype.removeEventListener = function () {
        //To destroy the renderer
    };
    return BatchEditRender;
}());
export { BatchEditRender };
