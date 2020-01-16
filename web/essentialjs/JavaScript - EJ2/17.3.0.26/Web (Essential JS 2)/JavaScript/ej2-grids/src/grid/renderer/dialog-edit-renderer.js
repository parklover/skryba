import { Dialog } from '@syncfusion/ej2-popups';
import { remove, extend, updateBlazorTemplate, isBlazor } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { appendChildren } from '../base/util';
/**
 * Edit render module is used to render grid edit row.

 */
var DialogEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     */
    function DialogEditRender(parent, serviceLocator) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.dialogDestroy, this.destroy, this);
        this.parent.on(events.destroy, this.destroy, this);
    }
    DialogEditRender.prototype.setLocaleObj = function () {
        this.l10n = this.serviceLocator.getService('localization');
    };
    DialogEditRender.prototype.addNew = function (elements, args) {
        this.isEdit = false;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.update = function (elements, args) {
        this.isEdit = true;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.createDialog = function (elements, args) {
        var gObj = this.parent;
        this.dialog = this.parent.createElement('div', { id: gObj.element.id + '_dialogEdit_wrapper', styles: 'width: auto' });
        gObj.element.appendChild(this.dialog);
        this.setLocaleObj();
        // let position: PositionDataModel = this.parent.element.getBoundingClientRect().height < 400 ?
        //     { X: 'center', Y: 'top' } : { X: 'center', Y: 'center' };
        this.dialogObj = new Dialog(extend({
            header: this.isEdit ? this.l10n.getConstant('EditFormTitle') + args.primaryKeyValue[0] :
                this.l10n.getConstant('AddFormTitle'), isModal: true, visible: true, cssClass: 'e-edit-dialog',
            content: this.getEditElement(elements, args),
            showCloseIcon: true,
            allowDragging: true,
            // position: position,
            close: this.dialogClose.bind(this),
            closeOnEscape: true, width: gObj.editSettings.template ? 'auto' : '330px',
            target: args.target ? args.target : document.body, animationSettings: { effect: 'None' },
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: { content: this.l10n.getConstant('SaveButton'), cssClass: 'e-primary', isPrimary: true }
                },
                { click: this.btnClick.bind(this), buttonModel: { cssClass: 'e-flat', content: this.l10n.getConstant('CancelButton') } }]
        }, gObj.editSettings.dialog.params));
        if (!isBlazor()) {
            args.dialog = this.dialogObj;
        }
        var isStringTemplate = 'isStringTemplate';
        this.dialogObj[isStringTemplate] = true;
        this.dialogObj.appendTo(this.dialog);
        this.parent.applyBiggerTheme(this.dialogObj.element.parentElement);
    };
    DialogEditRender.prototype.btnClick = function (e) {
        if (this.l10n.getConstant('CancelButton').toLowerCase() === e.target.innerText.trim().toLowerCase()) {
            this.dialogClose();
        }
        else {
            this.parent.endEdit();
        }
    };
    DialogEditRender.prototype.dialogClose = function () {
        this.parent.closeEdit();
        this.destroy();
    };
    DialogEditRender.prototype.destroy = function (args) {
        var editTemplateID = this.parent.element.id + 'editSettingsTemplate';
        updateBlazorTemplate(editTemplateID, 'Template', this.parent.editSettings);
        this.parent.notify(events.destroyForm, {});
        this.parent.isEdit = false;
        this.parent.notify(events.toolbarRefresh, {});
        if (this.dialog && !this.dialogObj.isDestroyed) {
            this.dialogObj.destroy();
            remove(this.dialog);
        }
    };
    DialogEditRender.prototype.getEditElement = function (elements, args) {
        var gObj = this.parent;
        var div = this.parent.createElement('div', { className: this.isEdit ? 'e-editedrow' : 'e-insertedrow' });
        var form = args.form =
            this.parent.createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        if (this.parent.editSettings.template) {
            var editTemplateID = this.parent.element.id + 'editSettingsTemplate';
            var dummyData = extend({}, args.rowData, { isAdd: !this.isEdit }, true);
            appendChildren(form, this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID));
            updateBlazorTemplate(editTemplateID, 'Template', this.parent.editSettings);
            div.appendChild(form);
            return div;
        }
        var table = this.parent.createElement('table', { className: 'e-table', attrs: { cellspacing: '6px' } });
        var tbody = this.parent.createElement('tbody');
        var cols = gObj.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (this.parent.editModule.checkColumnIsGrouped(cols[i]) || cols[i].commands || cols[i].commandsTemplate) {
                continue;
            }
            var tr = this.parent.createElement('tr');
            var dataCell = this.parent.createElement('td', {
                className: 'e-rowcell', attrs: {
                    style: 'text-align:' + (this.parent.enableRtl ? 'right' : 'left') + ';width:190px'
                }
            });
            var label = this.parent.createElement('label', { innerHTML: cols[i].field });
            elements[cols[i].uid].classList.remove('e-input');
            dataCell.appendChild(elements[cols[i].uid]);
            tr.appendChild(dataCell);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        form.appendChild(table);
        div.appendChild(form);
        return div;
    };
    DialogEditRender.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.dialogDestroy, this.destroy);
        this.parent.off(events.destroy, this.destroy);
    };
    return DialogEditRender;
}());
export { DialogEditRender };