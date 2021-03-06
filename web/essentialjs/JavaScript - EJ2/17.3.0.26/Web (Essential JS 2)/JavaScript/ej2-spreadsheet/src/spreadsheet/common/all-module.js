import { Spreadsheet } from '../index';
import { Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, CellFormat } from '../actions/index';
import { Resize, CollaborativeEditing } from '../actions/index';
import { Ribbon, FormulaBar, SheetTabs, Open, Save, NumberFormat, Formula, Sort } from '../integrations/index';
import { DataBind } from '../../workbook/integrations/index';
/**
 * Spreadsheet all module.
 * @private
 */
var AllModule = /** @class */ (function () {
    /**
     * Constructor for Spreadsheet all module.
     * @private
     */
    function AllModule() {
        Spreadsheet.Inject(Ribbon, FormulaBar, SheetTabs, Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, DataBind, Open, Save, NumberFormat, CellFormat, Formula, Sort, Resize, CollaborativeEditing);
    }
    /**
     * For internal use only - Get the module name.
     * @private
     */
    AllModule.prototype.getModuleName = function () {
        return 'all';
    };
    /**
     * Destroys the Spreadsheet all module.
     * @return {void}
     */
    AllModule.prototype.destroy = function () {
        /* code snippet */
    };
    return AllModule;
}());
export { AllModule };
