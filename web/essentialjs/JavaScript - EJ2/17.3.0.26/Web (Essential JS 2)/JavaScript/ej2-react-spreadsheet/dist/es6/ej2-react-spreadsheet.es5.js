import { ComplexBase, ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
import { PureComponent, createElement } from 'react';
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `SheetDirective` represent a sheet of the React Spreadsheet.
 * It must be contained in a Spreadsheet component(`SpreadsheetComponent`).
 * ```tsx
 * <SpreadsheetComponent>
 *   <SheetsDirective>
 *    <SheetDirective></SheetDirective>
 *    <SheetDirective></SheetDirective>
 *   </SheetsDirective>
 * </SpreadsheetComponent>
 * ```
 */
var SheetDirective = /** @class */ (function (_super) {
    __extends(SheetDirective, _super);
    function SheetDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SheetDirective.moduleName = 'sheet';
    return SheetDirective;
}(ComplexBase));
var SheetsDirective = /** @class */ (function (_super) {
    __extends(SheetsDirective, _super);
    function SheetsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SheetsDirective.propertyName = 'sheets';
    SheetsDirective.moduleName = 'sheets';
    return SheetsDirective;
}(ComplexBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `RowDirective` represent a row of the React Spreadsheet.
 * It must be contained in a `SheetDirective`.
 * ```tsx
 * <SpreadsheetComponent>
 *   <SheetsDirective>
 *    <SheetDirective>
 *    <RowsDirective>
 *    <RowDirective></RowDirective>
 *    </RowsDirective>
 *    </SheetDirective>
 *   </SheetsDirective>
 * </SpreadsheetComponent>
 * ```
 */
var RowDirective = /** @class */ (function (_super) {
    __extends$1(RowDirective, _super);
    function RowDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowDirective.moduleName = 'row';
    return RowDirective;
}(ComplexBase));
var RowsDirective = /** @class */ (function (_super) {
    __extends$1(RowsDirective, _super);
    function RowsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowsDirective.propertyName = 'rows';
    RowsDirective.moduleName = 'rows';
    return RowsDirective;
}(ComplexBase));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `CellDirective` represent a cell of the React Spreadsheet.
 * It must be contained in a `RowDirective`.
 * ```tsx
 * <SpreadsheetComponent>
 *   <SheetsDirective>
 *    <SheetDirective>
 *    <RowsDirective>
 *    <RowDirective>
 *    <CellsDirective>
 *    <CellDirective value='A1'></CellDirective>
 *    </CellsDirective>
 *    </RowDirective>
 *    </RowsDirective>
 *    </SheetDirective>
 *   </SheetsDirective>
 * </SpreadsheetComponent>
 * ```
 */
var CellDirective = /** @class */ (function (_super) {
    __extends$2(CellDirective, _super);
    function CellDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellDirective.moduleName = 'cell';
    return CellDirective;
}(ComplexBase));
var CellsDirective = /** @class */ (function (_super) {
    __extends$2(CellsDirective, _super);
    function CellsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CellsDirective.propertyName = 'cells';
    CellsDirective.moduleName = 'cells';
    return CellsDirective;
}(ComplexBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `ColumnDirective` represent a column of the React Spreadsheet.
 * It must be contained in a `SheetDirective`.
 * ```tsx
 * <SpreadsheetComponent>
 *   <SheetsDirective>
 *    <SheetDirective>
 *    <ColumnsDirective>
 *    <ColumnDirective width='100'></ColumnDirective>
 *    </ColumnsDirective>
 *    </SheetDirective>
 *   </SheetsDirective>
 * </SpreadsheetComponent>
 * ```
 */
var ColumnDirective = /** @class */ (function (_super) {
    __extends$3(ColumnDirective, _super);
    function ColumnDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnDirective.moduleName = 'column';
    return ColumnDirective;
}(ComplexBase));
var ColumnsDirective = /** @class */ (function (_super) {
    __extends$3(ColumnsDirective, _super);
    function ColumnsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnsDirective.propertyName = 'columns';
    ColumnsDirective.moduleName = 'columns';
    return ColumnsDirective;
}(ComplexBase));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    __extends$4(RangeSettingDirective, _super);
    function RangeSettingDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingDirective.moduleName = 'rangeSetting';
    return RangeSettingDirective;
}(ComplexBase));
var RangeSettingsDirective = /** @class */ (function (_super) {
    __extends$4(RangeSettingsDirective, _super);
    function RangeSettingsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeSettingsDirective.propertyName = 'rangeSettings';
    RangeSettingsDirective.moduleName = 'rangeSettings';
    return RangeSettingsDirective;
}(ComplexBase));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `DefinedNameDirective` represent a defined name of the React Spreadsheet.
 * It must be contained in a Spreadsheet component(`SpreadsheetComponent`).
 * ```tsx
 * <SpreadsheetComponent>
 *   <DefinedNamesDirective>
 *    <DefinedNameDirective></DefinedNameDirective>
 *    <DefinedNameDirective></DefinedNameDirective>
 *   </DefinedNamesDirective>
 * </SpreadsheetComponent>
 * ```
 */
var DefinedNameDirective = /** @class */ (function (_super) {
    __extends$5(DefinedNameDirective, _super);
    function DefinedNameDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefinedNameDirective.moduleName = 'definedName';
    return DefinedNameDirective;
}(ComplexBase));
var DefinedNamesDirective = /** @class */ (function (_super) {
    __extends$5(DefinedNamesDirective, _super);
    function DefinedNamesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefinedNamesDirective.propertyName = 'definedNames';
    DefinedNamesDirective.moduleName = 'definedNames';
    return DefinedNamesDirective;
}(ComplexBase));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * `SpreadsheetComponent` represents the react Spreadsheet.
 * ```tsx
 * <SpreadsheetComponent />
 * ```
 */
var SpreadsheetComponent = /** @class */ (function (_super) {
    __extends$6(SpreadsheetComponent, _super);
    function SpreadsheetComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = true;
        _this.directivekeys = { 'sheets': { 'sheet': { 'rows': { 'row': { 'cells': 'cell' } }, 'columns': 'column', 'rangeSettings': 'rangeSetting' } }, 'definedNames': 'definedName' };
        _this.immediateRender = false;
        return _this;
    }
    SpreadsheetComponent.prototype.render = function () {
        if ((this.element && !this.initRenderCalled) || this.refreshing) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), this.props.children);
        }
    };
    return SpreadsheetComponent;
}(Spreadsheet));
applyMixins(SpreadsheetComponent, [ComponentBase, PureComponent]);

export { SheetDirective, SheetsDirective, RowDirective, RowsDirective, CellDirective, CellsDirective, ColumnDirective, ColumnsDirective, RangeSettingDirective, RangeSettingsDirective, DefinedNameDirective, DefinedNamesDirective, SpreadsheetComponent };
export * from '@syncfusion/ej2-spreadsheet';
export { Inject } from '@syncfusion/ej2-react-base';
//# sourceMappingURL=ej2-react-spreadsheet.es5.js.map
