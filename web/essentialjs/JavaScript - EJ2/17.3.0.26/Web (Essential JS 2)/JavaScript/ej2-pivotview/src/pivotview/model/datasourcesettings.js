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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Complex, Collection, ChildProperty } from '@syncfusion/ej2-base';
/**
 * Configures the fields in dataSource.
 */
var FieldOptions = /** @class */ (function (_super) {
    __extends(FieldOptions, _super);
    function FieldOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], FieldOptions.prototype, "name", void 0);
    __decorate([
        Property()
    ], FieldOptions.prototype, "caption", void 0);
    __decorate([
        Property('Sum')
    ], FieldOptions.prototype, "type", void 0);
    __decorate([
        Property()
    ], FieldOptions.prototype, "axis", void 0);
    __decorate([
        Property(false)
    ], FieldOptions.prototype, "showNoDataItems", void 0);
    __decorate([
        Property()
    ], FieldOptions.prototype, "baseField", void 0);
    __decorate([
        Property()
    ], FieldOptions.prototype, "baseItem", void 0);
    __decorate([
        Property(true)
    ], FieldOptions.prototype, "showSubTotals", void 0);
    __decorate([
        Property(false)
    ], FieldOptions.prototype, "isNamedSet", void 0);
    __decorate([
        Property(false)
    ], FieldOptions.prototype, "isCalculatedField", void 0);
    return FieldOptions;
}(ChildProperty));
export { FieldOptions };
var FieldListFieldOptions = /** @class */ (function (_super) {
    __extends(FieldListFieldOptions, _super);
    function FieldListFieldOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldListFieldOptions;
}(FieldOptions));
export { FieldListFieldOptions };
/**
 * Configures the style settings.
 */
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Style.prototype, "backgroundColor", void 0);
    __decorate([
        Property()
    ], Style.prototype, "color", void 0);
    __decorate([
        Property()
    ], Style.prototype, "fontFamily", void 0);
    __decorate([
        Property()
    ], Style.prototype, "fontSize", void 0);
    return Style;
}(ChildProperty));
export { Style };
/**
 * Configures the filter settings.
 */
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    function Filter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Filter.prototype, "name", void 0);
    __decorate([
        Property('Include')
    ], Filter.prototype, "type", void 0);
    __decorate([
        Property()
    ], Filter.prototype, "items", void 0);
    __decorate([
        Property('DoesNotEquals')
    ], Filter.prototype, "condition", void 0);
    __decorate([
        Property()
    ], Filter.prototype, "value1", void 0);
    __decorate([
        Property()
    ], Filter.prototype, "value2", void 0);
    __decorate([
        Property()
    ], Filter.prototype, "measure", void 0);
    __decorate([
        Property(1)
    ], Filter.prototype, "levelCount", void 0);
    __decorate([
        Property()
    ], Filter.prototype, "selectedField", void 0);
    return Filter;
}(ChildProperty));
export { Filter };
/**
 * Configures the conditional format settings.
 */
var ConditionalFormatSettings = /** @class */ (function (_super) {
    __extends(ConditionalFormatSettings, _super);
    function ConditionalFormatSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "measure", void 0);
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "label", void 0);
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "conditions", void 0);
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "value1", void 0);
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "value2", void 0);
    __decorate([
        Property()
    ], ConditionalFormatSettings.prototype, "style", void 0);
    __decorate([
        Property(true)
    ], ConditionalFormatSettings.prototype, "applyGrandTotals", void 0);
    return ConditionalFormatSettings;
}(ChildProperty));
export { ConditionalFormatSettings };
/**
 * Configures the sort settings.
 */
var Sort = /** @class */ (function (_super) {
    __extends(Sort, _super);
    function Sort() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], Sort.prototype, "name", void 0);
    __decorate([
        Property('Ascending')
    ], Sort.prototype, "order", void 0);
    return Sort;
}(ChildProperty));
export { Sort };
/**
 * Configures the format settings of value fields.
 */
var FormatSettings = /** @class */ (function (_super) {
    __extends(FormatSettings, _super);
    function FormatSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], FormatSettings.prototype, "name", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "minimumFractionDigits", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "maximumFractionDigits", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "minimumSignificantDigits", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "maximumSignificantDigits", void 0);
    __decorate([
        Property(true)
    ], FormatSettings.prototype, "useGrouping", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "skeleton", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "type", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "currency", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "minimumIntegerDigits", void 0);
    __decorate([
        Property()
    ], FormatSettings.prototype, "format", void 0);
    return FormatSettings;
}(ChildProperty));
export { FormatSettings };
/**
 * Configures the group settings of fields.
 */
var GroupSettings = /** @class */ (function (_super) {
    __extends(GroupSettings, _super);
    function GroupSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], GroupSettings.prototype, "name", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "groupInterval", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "startingAt", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "endingAt", void 0);
    __decorate([
        Property('Date')
    ], GroupSettings.prototype, "type", void 0);
    __decorate([
        Property()
    ], GroupSettings.prototype, "rangeInterval", void 0);
    return GroupSettings;
}(ChildProperty));
export { GroupSettings };
/**
 * Configures the calculatedfields settings.
 */
var CalculatedFieldSettings = /** @class */ (function (_super) {
    __extends(CalculatedFieldSettings, _super);
    function CalculatedFieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], CalculatedFieldSettings.prototype, "name", void 0);
    __decorate([
        Property()
    ], CalculatedFieldSettings.prototype, "formula", void 0);
    __decorate([
        Property()
    ], CalculatedFieldSettings.prototype, "hierarchyUniqueName", void 0);
    __decorate([
        Property()
    ], CalculatedFieldSettings.prototype, "formatString", void 0);
    return CalculatedFieldSettings;
}(ChildProperty));
export { CalculatedFieldSettings };
/**
 * Configures drilled state of field members.
 */
var DrillOptions = /** @class */ (function (_super) {
    __extends(DrillOptions, _super);
    function DrillOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], DrillOptions.prototype, "name", void 0);
    __decorate([
        Property()
    ], DrillOptions.prototype, "items", void 0);
    __decorate([
        Property()
    ], DrillOptions.prototype, "delimiter", void 0);
    return DrillOptions;
}(ChildProperty));
export { DrillOptions };
/**
 * Configures value sort settings.
 */
var ValueSortSettings = /** @class */ (function (_super) {
    __extends(ValueSortSettings, _super);
    function ValueSortSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], ValueSortSettings.prototype, "headerText", void 0);
    __decorate([
        Property('.')
    ], ValueSortSettings.prototype, "headerDelimiter", void 0);
    __decorate([
        Property('None')
    ], ValueSortSettings.prototype, "sortOrder", void 0);
    __decorate([
        Property()
    ], ValueSortSettings.prototype, "measure", void 0);
    return ValueSortSettings;
}(ChildProperty));
export { ValueSortSettings };
/**
 * Configures the settings of dataSource.
 */
var DataSourceSettings = /** @class */ (function (_super) {
    __extends(DataSourceSettings, _super);
    function DataSourceSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], DataSourceSettings.prototype, "catalog", void 0);
    __decorate([
        Property()
    ], DataSourceSettings.prototype, "cube", void 0);
    __decorate([
        Property('Relational')
    ], DataSourceSettings.prototype, "providerType", void 0);
    __decorate([
        Property()
    ], DataSourceSettings.prototype, "url", void 0);
    __decorate([
        Property(1033)
    ], DataSourceSettings.prototype, "localeIdentifier", void 0);
    __decorate([
        Property()
    ], DataSourceSettings.prototype, "dataSource", void 0);
    __decorate([
        Collection([], FieldOptions)
    ], DataSourceSettings.prototype, "rows", void 0);
    __decorate([
        Collection([], FieldOptions)
    ], DataSourceSettings.prototype, "columns", void 0);
    __decorate([
        Collection([], FieldOptions)
    ], DataSourceSettings.prototype, "values", void 0);
    __decorate([
        Collection([], FieldOptions)
    ], DataSourceSettings.prototype, "filters", void 0);
    __decorate([
        Property([])
    ], DataSourceSettings.prototype, "excludeFields", void 0);
    __decorate([
        Property(false)
    ], DataSourceSettings.prototype, "expandAll", void 0);
    __decorate([
        Property('column')
    ], DataSourceSettings.prototype, "valueAxis", void 0);
    __decorate([
        Collection([], Filter)
    ], DataSourceSettings.prototype, "filterSettings", void 0);
    __decorate([
        Collection([], Sort)
    ], DataSourceSettings.prototype, "sortSettings", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "enableSorting", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "allowMemberFilter", void 0);
    __decorate([
        Property(false)
    ], DataSourceSettings.prototype, "allowLabelFilter", void 0);
    __decorate([
        Property(false)
    ], DataSourceSettings.prototype, "allowValueFilter", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showSubTotals", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showRowSubTotals", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showColumnSubTotals", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showGrandTotals", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showRowGrandTotals", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showColumnGrandTotals", void 0);
    __decorate([
        Property(false)
    ], DataSourceSettings.prototype, "alwaysShowValueHeader", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showHeaderWhenEmpty", void 0);
    __decorate([
        Property(true)
    ], DataSourceSettings.prototype, "showAggregationOnValueField", void 0);
    __decorate([
        Collection([], FormatSettings)
    ], DataSourceSettings.prototype, "formatSettings", void 0);
    __decorate([
        Collection([], DrillOptions)
    ], DataSourceSettings.prototype, "drilledMembers", void 0);
    __decorate([
        Complex({}, ValueSortSettings)
    ], DataSourceSettings.prototype, "valueSortSettings", void 0);
    __decorate([
        Collection([], CalculatedFieldSettings)
    ], DataSourceSettings.prototype, "calculatedFieldSettings", void 0);
    __decorate([
        Collection([], ConditionalFormatSettings)
    ], DataSourceSettings.prototype, "conditionalFormatSettings", void 0);
    __decorate([
        Property()
    ], DataSourceSettings.prototype, "emptyCellsTextContent", void 0);
    __decorate([
        Collection([], GroupSettings)
    ], DataSourceSettings.prototype, "groupSettings", void 0);
    return DataSourceSettings;
}(ChildProperty));
export { DataSourceSettings };
