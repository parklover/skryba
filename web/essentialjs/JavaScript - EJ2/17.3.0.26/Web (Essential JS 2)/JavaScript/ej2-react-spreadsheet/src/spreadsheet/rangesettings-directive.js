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
import { ComplexBase } from '@syncfusion/ej2-react-base';
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
var RangeSettingDirective = /** @class */ (function (_super) {
    __extends(RangeSettingDirective, _super);
    function RangeSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingDirective.moduleName = 'rangeSetting';
    return RangeSettingDirective;
}(ComplexBase));
export { RangeSettingDirective };
var RangeSettingsDirective = /** @class */ (function (_super) {
    __extends(RangeSettingsDirective, _super);
    function RangeSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingsDirective.propertyName = 'rangeSettings';
    RangeSettingsDirective.moduleName = 'rangeSettings';
    return RangeSettingsDirective;
}(ComplexBase));
export { RangeSettingsDirective };
