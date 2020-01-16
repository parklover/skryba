import { ComplexBase } from '@syncfusion/ej2-react-base';
import { RangeSettingModel } from '@syncfusion/ej2-spreadsheet';
/**
 * `RangeSettingDirective` represent a range setting of the React Spreadsheet.
 * It must be contained in a `SheetDirective`.
 * ```tsx
 * <SpreadsheetComponent>
 *   <SheetsDirective>
 *    <SheetDirective>
 *    <RangeSettingsDirective>
 *    <RangeSettingDirective dataSource={data}></RangeSettingDirective>
 *    </RangeSettingsDirective>
 *    </SheetDirective>
 *   </SheetsDirective>
 * </SpreadsheetComponent>
 * ```
 */
export declare class RangeSettingDirective extends ComplexBase<RangeSettingModel, RangeSettingModel> {
    static moduleName: string;
}
export declare class RangeSettingsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
