/**
 * To get Workbook required modules.

 * @param {Workbook} context
 */
export function getWorkbookRequiredModules(context, modules) {
    if (modules === void 0) { modules = []; }
    modules.push({ member: 'workbookBasic', args: [] });
    modules.push({ member: 'workbookAll', args: [] });
    modules.push({
        member: 'dataBind',
        args: [context]
    });
    if (context.allowSave) {
        modules.push({
            member: 'workbookSave',
            args: [context]
        });
    }
    if (context.allowOpen) {
        modules.push({
            member: 'workbookOpen',
            args: [context]
        });
    }
    if (context.allowEditing) {
        modules.push({
            member: 'workbookEdit',
            args: [context]
        });
        modules.push({
            member: 'workbookFormula',
            args: [context]
        });
    }
    if (context.allowNumberFormatting) {
        modules.push({
            member: 'workbookNumberFormat',
            args: [context]
        });
    }
    if (context.allowCellFormatting) {
        modules.push({
            member: 'workbookcellformat',
            args: [context]
        });
    }
    if (context.allowSorting) {
        modules.push({ member: 'workbookSort', args: [context] });
    }
    return modules;
}
