import { closest } from '@syncfusion/ej2-base';
import { MultiSelect as EJ2MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Base } from './base-module';
/**
 * The `MultiSelect` module is used configure the properties of Multi select type editor.
 */
var MultiSelect = /** @class */ (function () {
    function MultiSelect(parent) {
        this.compObj = undefined;
        this.parent = parent;
        this.parent.multiSelectModule = this;
        this.base = new Base(this.parent, this);
    }
    MultiSelect.prototype.render = function (e) {
        this.compObj = new EJ2MultiSelect(this.parent.model, e.target);
    };
    /**

     */
    MultiSelect.prototype.showPopup = function () {
        this.compObj.focusIn();
        this.compObj.showPopup();
    };
    MultiSelect.prototype.focus = function () {
        closest(this.compObj.element, '.e-multi-select-wrapper').dispatchEvent(new MouseEvent('mousedown'));
    };
    MultiSelect.prototype.updateValue = function (e) {
        if (this.compObj && e.type === 'MultiSelect') {
            this.parent.setProperties({ value: this.compObj.value }, true);
            this.parent.extendModelValue(this.compObj.value);
        }
    };
    MultiSelect.prototype.getRenderValue = function () {
        this.parent.printValue = this.compObj.text;
    };
    /**
     * Destroys the module.
     * @method destroy
     * @return {void}

     */
    MultiSelect.prototype.destroy = function () {
        this.base.destroy();
    };
    /**
     * For internal use only - Get the module name.
     */
    MultiSelect.prototype.getModuleName = function () {
        return 'multi-select';
    };
    return MultiSelect;
}());
export { MultiSelect };
