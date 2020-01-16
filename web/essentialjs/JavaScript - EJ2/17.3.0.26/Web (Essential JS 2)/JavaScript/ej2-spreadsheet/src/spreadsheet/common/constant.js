export var DISABLED = 'e-disabled';
export var locale = 'spreadsheetLocale';
export var dialog = 'dialog';
export var beginCompleteEvents = 'beginCompleteEvents';
export var fontColor = {
    'Custom': [
        '#ffffff', '#000000', '#e7e6e6', '#44546a', '#4472c4', '#ed7d31', '#a5a5a5', '#ffc000', '#70ad47', '#ff0000',
        '#f2f2f2', '#808080', '#cfcdcd', '#d5dce4', '#d9e2f3', '#fbe4d5', '#ededed', '#fff2cc', '#e2efd9', '#ffcccc',
        '#d9d9d9', '#595959', '#aeaaaa', '#acb9ca', '#b4c6e7', '#f7caac', '#dbdbdb', '#ffe599', '#c5e0b3', '#ff8080',
        '#bfbfbf', '#404040', '#747070', '#8496b0', '#8eaadb', '#f4b083', '#c9c9c9', '#ffd966', '#a8d08d', '#ff3333',
        '#a6a6a6', '#262626', '#3b3838', '#323e4f', '#2f5496', '#c45911', '#7b7b7b', '#bf8f00', '#538135', '#b30000',
        '#7f7f7f', '#0d0d0d', '#161616', '#212934', '#1f3763', '#823b0b', '#525252', '#7f5f00', '#375623', '#660000'
    ]
};
export var fillColor = {
    'Custom': [
        '#ffffff', '#000000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff0000', '#000080', '#800080', '#996633',
        '#f2f2f2', '#808080', '#ffffcc', '#b3ffb3', '#ccffff', '#ccccff', '#ffcccc', '#ccccff', '#ff80ff', '#f2e6d9',
        '#d9d9d9', '#595959', '#ffff80', '#80ff80', '#b3ffff', '#8080ff', '#ff8080', '#8080ff', '#ff00ff', '#dfbf9f',
        '#bfbfbf', '#404040', '#ffff33', '#33ff33', '#33ffff', '#3333ff', '#ff3333', '#0000b3', '#b300b3', '#c68c53',
        '#a6a6a6', '#262626', '#e6e600', '#00b300', '#009999', '#000099', '#b30000', '#000066', '#660066', '#86592d',
        '#7f7f7f', '#0d0d0d', '#999900', '#006600', '#006666', '#000066', '#660000', '#00004d', '#4d004d', '#734d26',
    ]
};
/**
 * Default locale text

 */
export var defaultLocale = {
    Cut: 'Cut',
    Copy: 'Copy',
    Paste: 'Paste',
    PasteSpecial: 'Paste Special',
    All: 'All',
    Values: 'Values',
    Formats: 'Formats',
    Bold: 'Bold',
    Font: 'Font',
    FontSize: 'Font Size',
    Italic: 'Italic',
    Underline: 'Underline',
    Strikethrough: 'Strikethrough',
    TextColor: 'Text Color',
    FillColor: 'Fill Color',
    HorizontalAlignment: 'Horizontal Alignment',
    AlignLeft: 'Align Left',
    AlignCenter: 'Center',
    AlignRight: 'Align Right',
    VerticalAlignment: 'Vertical Alignment',
    AlignTop: 'Align Top',
    AlignMiddle: 'Align Middle',
    AlignBottom: 'Align Bottom',
    InsertFunction: 'Insert Function',
    Insert: 'Insert',
    Delete: 'Delete',
    Rename: 'Rename',
    Hide: 'Hide',
    Unhide: 'Unhide',
    NameBox: 'Name Box',
    ShowHeaders: 'Show Headers',
    HideHeaders: 'Hide Headers',
    ShowGridLines: 'Show Gridlines',
    HideGridLines: 'Hide Gridlines',
    AddSheet: 'Add Sheet',
    ListAllSheets: 'List All Sheets',
    FullScreen: 'Full Screen',
    CollapseToolbar: 'Collapse Toolbar',
    ExpandToolbar: 'Expand Toolbar',
    CollapseFormulaBar: 'Collapse Formula Bar',
    ExpandFormulaBar: 'Expand Formula Bar',
    File: 'File',
    Home: 'Home',
    Formulas: 'Formulas',
    View: 'View',
    New: 'New',
    Open: 'Open',
    SaveAs: 'Save As',
    ExcelXlsx: 'Microsoft Excel',
    ExcelXls: 'Microsoft Excel 97-2003',
    CSV: 'Comma-separated values',
    FormulaBar: 'Formula Bar',
    Sort: 'Sort',
    SortAscending: 'Ascending',
    SortDescending: 'Descending',
    CustomSort: 'Custom Sort',
    AddColumn: 'Add Column',
    ContainsHeader: 'Data contains header',
    CaseSensitive: 'Case sensitive',
    SortBy: 'Sort by',
    ThenBy: 'Then by',
    SelectAColumn: 'Select a column',
    SortEmptyFieldError: 'Sort criteria column should not be empty.',
    SortDuplicateFieldError: ' is mentioned more than once. Duplicate columns must be removed.',
    SortOutOfRangeError: 'Select a cell or range inside the used range and try again.',
    HideRow: 'Hide Row',
    HideRows: 'Hide Rows',
    UnHideRows: 'UnHide Rows',
    HideColumn: 'Hide Column',
    HideColumns: 'Hide Columns',
    UnHideColumns: 'UnHide Columns',
    Ok: 'Ok',
    Close: 'Close',
    Cancel: 'Cancel',
    Apply: 'Apply',
    MoreColors: 'More Colors',
    StandardColors: 'Standard Colors',
    General: 'General',
    Number: 'Number',
    Currency: 'Currency',
    Accounting: 'Accounting',
    ShortDate: 'Short Date',
    LongDate: 'Long Date',
    Time: 'Time',
    Percentage: 'Percentage',
    Fraction: 'Fraction',
    Scientific: 'Scientific',
    Text: 'Text',
    MobileFormulaBarPlaceHolder: 'Enter value or Formula',
    NumberFormat: 'Number Format',
    PasteAlert: 'You can\'t paste this here, because the copy area and paste area aren\'t in the same size. ' +
        'Please try pasting in a different range.',
    DestroyAlert: 'Are you sure you want to destroy the current workbook without saving and create a new workbook?',
    SheetRenameInvalidAlert: 'Sheet name contains invalid character.',
    SheetRenameEmptyAlert: 'Sheet name cannot be empty.',
    SheetRenameAlreadyExistsAlert: 'Sheet name already exists. Please enter another name.',
    DeleteSheetAlert: 'Are you sure you want to delete this sheet?',
    DeleteSingleLastSheetAlert: 'A Workbook must contain at least one visible worksheet.',
    PickACategory: 'Pick a category',
    Description: 'Description',
    UnsupportedFile: 'Unsupported File',
    InvalidUrl: 'Invalid URL',
    SUM: 'Adds a series of numbers and/or cells.',
    SUMIF: 'Adds the cells based on specified condition.',
    SUMIFS: 'Adds the cells based on specified conditions.',
    ABS: 'Returns the value of a number without its sign.',
    RAND: 'Returns a random number between 0 and 1.',
    RANDBETWEEN: 'Returns a random integer based on specified values.',
    FLOOR: 'Rounds a number down to the nearest multiple of a given factor.',
    CEILING: 'Rounds a number up to the nearest multiple of a given factor.',
    PRODUCT: 'Multiplies a series of numbers and/or cells.',
    AVERAGE: 'Calculates average for the series of numbers and/or cells excluding text.',
    AVERAGEIF: 'Calculates average for the cells based on specified criterion.',
    AVERAGEIFS: 'Calculates average for the cells based on specified conditions.',
    AVERAGEA: 'Calculates the average for the cells evaluating TRUE as 1, text and FALSE as 0.',
    COUNT: 'Counts the cells that contain numeric values in a range.',
    COUNTIF: 'Counts the cells based on specified condition.',
    COUNTIFS: 'Counts the cells based on specified conditions.',
    COUNTA: 'Counts the cells that contains values in a range.',
    MIN: 'Returns the smallest number of the given arguments.',
    MAX: 'Returns the largest number of the given arguments.',
    DATE: 'Returns the date based on given year, month, and day.',
    DAY: 'Returns the day from the given date.',
    DAYS: 'Returns the number of days between two dates.',
    IF: 'Returns value based on the given expression.',
    IFS: 'Returns value based on the given multiple expressions.',
    AND: 'Returns TRUE if all the arguments are TRUE, otherwise returns FALSE.',
    OR: 'Returns TRUE if any of the arguments are TRUE, otherwise returns FALSE.',
    IFERROR: 'Returns value if no error found else it will return specified value.',
    CHOOSE: 'Returns a value from list of values, based on index number.',
    INDEX: 'Returns a value of the cell in a given range based on row and column number.',
    FIND: 'Returns the position of a string within another string, which is case sensitive',
    CONCATENATE: 'Combines two or more strings together.',
    CONCAT: 'Concatenates a list or a range of text strings.',
    SUBTOTAL: 'Returns subtotal for a range using the given function number.',
    RADIANS: 'Converts degrees into radians.',
    MATCH: 'Returns the relative position of a specified value in given range.',
    DefineNameExists: 'This name already exists, try different name.',
    CircularReference: 'When a formula refers to one or more circular references, this may result in an incorrect calculation.'
};
