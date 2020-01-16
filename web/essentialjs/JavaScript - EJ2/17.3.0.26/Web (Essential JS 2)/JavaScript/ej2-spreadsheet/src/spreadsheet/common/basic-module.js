import { Spreadsheet } from '../index';
import { Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, CellFormat } from '../actions/index';
import { Resize, CollaborativeEditing } from '../actions/index';
import { Ribbon, FormulaBar, SheetTabs, Open, ContextMenu, Save, NumberFormat, Formula, Sort } from '../integrations/index';
import { DataBind } from '../../workbook/index';
/**
 * Spreadsheet basic module.
 * @private
 */
var BasicModule = /** @class */ (function () {
    /**
     * Constructor for Spreadsheet basic module.
     * @private
     */
    function BasicModule() {
        Spreadsheet.Inject(Ribbon, FormulaBar, SheetTabs, Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, DataBind, Open, ContextMenu, Save, NumberFormat, CellFormat, Formula, Sort, Resize, CollaborativeEditing);
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    BasicModule.prototype.getModuleName = function () {
        return 'basic';
    };
    /**
     * Destroys the Spreadsheet basic module.
     * @return {void}
     */
    BasicModule.prototype.destroy = function () {
        /* code snippet */
    };
    return BasicModule;
}());
export { BasicModule };
