/**
 * Specified the hyperlink type.
 */
export declare type HyperlinkType = 
/**
 * Specifies the link to a file. The link that starts with "file:///".
 */
'File' | 
/**
 * Specifies the link to a web page. The link that starts with "http://", "https://", "www." etc.
 */
'WebPage' | 
/**
 * Specifies the link to an e-mail. The link that starts with "mailto:".
 */
'Email' | 
/**
 * Specifies the link to a bookmark. The link that refers to a bookmark.
 */
'Bookmark';
/**
 * Enum underline for character format
 */
export declare type Underline = 'None' | 'Single' | 'Words' | 'Double' | 'Dotted' | 'Thick' | 'Dash' | 'DashLong' | 'DotDash' | 'DotDotDash' | 'Wavy' | 'DottedHeavy' | 'DashHeavy' | 'DashLongHeavy' | 'DotDashHeavy' | 'DotDotDashHeavy' | 'WavyHeavy' | 'WavyDouble';
/**
 * enum strikethrough for character format
 */
export declare type Strikethrough = 'None' | 'SingleStrike' | 'DoubleStrike';
/**
 * enum baseline alignment for character format
 */
export declare type BaselineAlignment = 'Normal' | 'Superscript' | 'Subscript';
/**
 * enum highlight color for character format
 */
export declare type HighlightColor = 'NoColor' | 'Yellow' | 'BrightGreen' | 'Turquoise' | 'Pink' | 'Blue' | 'Red' | 'DarkBlue' | 'Teal' | 'Green' | 'Violet' | 'DarkRed' | 'DarkYellow' | 'Gray50' | 'Gray25' | 'Black';
/**
 * Enum LineSpacingType For Paragraph Format Preservation
 */
export declare type LineSpacingType = 
/**
 * The line spacing can be greater than or equal to, but never less than,
 * the value specified in the LineSpacing property.
 */
'AtLeast' | 
/**
 * The line spacing never changes from the value specified in the LineSpacing property,
 * even if a larger font is used within the paragraph.
 */
'Exactly' | 
/**
 * The line spacing is specified in the LineSpacing property as the number of lines.
 * Single line spacing equals 12 points.
 */
'Multiple';
/**
 * Enum TextAlignment For Paragraph Format Preservation
 */
export declare type TextAlignment = 
/**
 * Text is centered within the container.
 */
'Center' | 
/**
 * Text is aligned to the left edge of the container.
 */
'Left' | 
/**
 * Text is aligned to the right edge of the container.
 */
'Right' | 
/**
 * Text is justified within the container.
 */
'Justify';
/**
 * Enum for Header Footer
 */
export declare type HeaderFooterType = 'EvenHeader' | 'OddHeader' | 'EvenFooter' | 'OddFooter' | 'FirstPageHeader' | 'FirstPageFooter';
/**
 * Enum for List type
 */
export declare type ListType = 'None' | 'Bullet' | 'Numbering' | 'OutlineNumbering';
/**
 * Enum for List Level Pattern
 */
export declare type ListLevelPattern = 'Arabic' | 'UpRoman' | 'LowRoman' | 'UpLetter' | 'LowLetter' | 'Ordinal' | 'Number' | 'OrdinalText' | 'LeadingZero' | 'Bullet' | 'FarEast' | 'Special' | 'None';
/**
 * Enum for follow character type
 */
export declare type FollowCharacterType = 'Tab' | 'Space' | 'None';
export declare type TableAlignment = 'Left' | 'Center' | 'Right';
export declare type WidthType = 'Auto' | 'Percent' | 'Point';
export declare type CellVerticalAlignment = 'Top' | 'Center' | 'Bottom';
export declare type HeightType = 'Auto' | 'AtLeast' | 'Exactly';
export declare type LineStyle = 'None' | 'Single' | 'Dot' | 'DashSmallGap' | 'DashLargeGap' | //dashed
'DashDot' | //dotDash
'DashDotDot' | //dotDotDash
'Double' | 'Triple' | 'ThinThickSmallGap' | 'ThickThinSmallGap' | 'ThinThickThinSmallGap' | 'ThinThickMediumGap' | 'ThickThinMediumGap' | 'ThinThickThinMediumGap' | 'ThinThickLargeGap' | 'ThickThinLargeGap' | 'ThinThickThinLargeGap' | 'SingleWavy' | //wave.
'DoubleWavy' | //doubleWave.
'DashDotStroked' | 'Emboss3D' | 'Engrave3D' | 'Outset' | 'Inset' | 'Thick' | 'Cleared';
export declare type TextureStyle = 'TextureNone' | 'Texture2Pt5Percent' | 'Texture5Percent' | 'Texture7Pt5Percent' | 'Texture10Percent' | 'Texture12Pt5Percent' | 'Texture15Percent' | 'Texture17Pt5Percent' | 'Texture20Percent' | 'Texture22Pt5Percent' | 'Texture25Percent' | 'Texture27Pt5Percent' | 'Texture30Percent' | 'Texture32Pt5Percent' | 'Texture35Percent' | 'Texture37Pt5Percent' | 'Texture40Percent' | 'Texture42Pt5Percent' | 'Texture45Percent' | 'Texture47Pt5Percent' | 'Texture50Percent' | 'Texture52Pt5Percent' | 'Texture55Percent' | 'Texture57Pt5Percent' | 'Texture60Percent' | 'Texture62Pt5Percent' | 'Texture65Percent' | 'Texture67Pt5Percent' | 'Texture70Percent' | 'Texture72Pt5Percent' | 'Texture75Percent' | 'Texture77Pt5Percent' | 'Texture80Percent' | 'Texture82Pt5Percent' | 'Texture85Percent' | 'Texture87Pt5Percent' | 'Texture90Percent' | 'Texture92Pt5Percent' | 'Texture95Percent' | 'Texture97Pt5Percent' | 'TextureSolid' | 'TextureDarkHorizontal' | 'TextureDarkVertical' | 'TextureDarkDiagonalDown' | 'TextureDarkDiagonalUp' | 'TextureDarkCross' | 'TextureDarkDiagonalCross' | 'TextureHorizontal' | 'TextureVertical' | 'TextureDiagonalDown' | 'TextureDiagonalUp' | 'TextureCross' | 'TextureDiagonalCross';
/**
 * Format type.
 */
export declare type FormatType = 
/**
 * Microsoft Word Open XML Format.
 */
'Docx' | 
/**
 * HTML Format.
 */
'Html' | 
/**
 * Plain Text Format.
 */
'Txt' | 
/**
 * Syncfusion Document Text Format.
 */
'Sfdt';
/**
 * Enum for find option
 */
export declare type FindOption = 'None' | 'WholeWord' | 'CaseSensitive' | 'CaseSensitiveWholeWord';
/**
 * WColor interface
 * @private
 */
export interface WColor {
    r: number;
    g: number;
    b: number;
}
export declare type OutlineLevel = 'Level1' | 'Level2' | 'Level3' | 'Level4' | 'Level5' | 'Level6' | 'Level7' | 'Level8' | 'Level9' | 'BodyText';
/**
 * Specifies style type.
 */
export declare type StyleType = 
/**
 * Paragraph style.
 */
'Paragraph' | 
/**
 * Character style.
 */
'Character';
/**
 * Specifies table row placement.
 * @private
 */
export declare type RowPlacement = 'Above' | 'Below';
/**
 * Specifies table column placement.
 * @private
 */
export declare type ColumnPlacement = 'Left' | 'Right';
/**
 * Specifies the tab justification.
 */
export declare type TabJustification = 
/**
 * Bar
 */
'Bar' | 
/**
 * Center
 */
'Center' | 
/**
 * Decimal
 */
'Decimal' | 
/**
 * Left
 */
'Left' | 
/**
 * List
 */
'List' | 
/**
 * Right
 */
'Right';
/**
 * Specifies the tab leader.
 */
export declare type TabLeader = 
/**
 * None
 */
'None' | 
/**
 * Dotted
 */
'Dot' | 
/**
 * Hyphenated
 */
'Hyphen' | 
/**
 * Underscore
 */
'Underscore';
/**
 * Specifies the page fit type.
 */
export declare type PageFitType = 
/**
 * Fits the page to 100%.
 */
'None' | 
/**
 * Fits atleast one page in view.
 */
'FitOnePage' | 
/**
 * Fits the page to its width in view.
 */
'FitPageWidth';
/**
 * Specifies the context type at selection.
 */
export declare type ContextType = 'Text' | 'Image' | 'List' | 'TableText' | 'TableImage' | 'HeaderText' | 'HeaderImage' | 'HeaderTableText' | 'HeaderTableImage' | 'FooterText' | 'FooterImage' | 'FooterTableText' | 'FooterTableImage' | 'TableOfContents';
/**
 * Specifies the border type to be applied.
 */
export declare type BorderType = 
/**
 * Outside border.
 */
'OutsideBorders' | 
/**
 * All border.
 */
'AllBorders' | 
/**
 * Insider borders.
 */
'InsideBorders' | 
/**
 * Left border.
 */
'LeftBorder' | 
/**
 * Inside vertical border.
 */
'InsideVerticalBorder' | 
/**
 * Right border.
 */
'RightBorder' | 
/**
 * Top border.
 */
'TopBorder' | 
/**
 * Insider horizontal border.
 */
'InsideHorizontalBorder' | 
/**
 * Bottom border.
 */
'BottomBorder' | 
/**
 * No border.
 */
'NoBorder';
/**
 * Specifies the dialog type.
 */
export declare type DialogType = 
/**
 * Specifies hyperlink dialog.
 */
'Hyperlink' | 
/**
 * Specifies table dialog.
 */
'Table' | 
/**
 * Specifies bookmark dialog.
 */
'Bookmark' | 
/**
 * Specifies table of contents dialog.
 */
'TableOfContents' | 
/**
 * Specifies page setup dialog.
 */
'PageSetup' | 
/**
 * Specifies list dialog.
 */
'List' | 
/**
 * Specifies style dialog.
 */
'Style' | 
/**
 * Specifies styles dialog.
 */
'Styles' | 
/**
 * Specifies paragraph dialog.
 */
'Paragraph' | 
/**
 * Specifies font dialog.
 */
'Font' | 
/**
 * Specifies table properties dialog.
 */
'TableProperties' | 
/**
 * Specifies borders and shading dialog.
 */
'BordersAndShading' | 
/**
 * Specifies table options dialog.
 */
'TableOptions';
/**
 * @private
 * Action type
 */
export declare type Action = 'Insert' | 'Delete' | 'BackSpace' | 'Selection' | 'MultiSelection' | 'Enter' | 'ImageResizing' | 'ReplaceAll' | 'Cut' | 'CharacterFormat' | 'Bold' | 'Italic' | 'FontSize' | 'FontFamily' | 'HighlightColor' | 'BaselineAlignment' | 'Strikethrough' | 'Underline' | 'InsertHyperlink' | 'InsertBookmark' | 'InsertElements' | 'DeleteBookmark' | 'FontColor' | 'InsertInline' | 'RemoveHyperlink' | 'AutoFormatHyperlink' | 'TextAlignment' | 'LeftIndent' | 'AfterSpacing' | 'BeforeSpacing' | 'RightIndent' | 'FirstLineIndent' | 'LineSpacing' | 'LineSpacingType' | 'ListFormat' | 'ParagraphFormat' | 'SectionFormat' | 'List' | 'InsertRowAbove' | 'InsertRowBelow' | 'DeleteTable' | 'DeleteRow' | 'DeleteColumn' | 'InsertColumnLeft' | 'InsertColumnRight' | 'TableFormat' | 'RowFormat' | 'CellFormat' | 'TableProperties' | 'Paste' | 'DeleteCells' | 'ClearCells' | 'InsertTable' | 'RowResizing' | 'CellResizing' | 'MergeCells' | 'ClearFormat' | 'ClearCharacterFormat' | 'ClearParagraphFormat' | 'AutoList' | 'BordersAndShading' | 'TableMarginsSelection' | 'CellMarginsSelection' | 'CellOptions' | 'TableOptions' | 'TableAlignment' | 'TableLeftIndent' | 'CellSpacing' | 'DefaultCellLeftMargin' | 'DefaultCellRightMargin' | 'TablePreferredWidthType' | 'TablePreferredWidth' | 'CellPreferredWidthType' | 'CellPreferredWidth' | 'DefaultCellTopMargin' | 'DefaultCellBottomMargin' | 'CellContentVerticalAlignment' | 'CellLeftMargin' | 'CellRightMargin' | 'CellTopMargin' | 'CellBottomMargin' | 'RowHeight' | 'RowHeightType' | 'RowHeader' | 'AllowBreakAcrossPages' | 'PageHeight' | 'PageWidth' | 'LeftMargin' | 'RightMargin' | 'TopMargin' | 'BottomMargin' | 'DefaultCellSpacing' | 'ListCharacterFormat' | 'ContinueNumbering' | 'RestartNumbering' | 'ListSelect' | 'Shading' | 'Borders' | 'TOC' | 'StyleName' | 'ApplyStyle' | 'SectionBreak' | 'PageBreak' | 'IMEInput' | 'TableAutoFitToContents' | 'TableAutoFitToWindow' | 'TableFixedColumnWidth' | 'ParagraphBidi' | 'TableBidi' | 'ContextualSpacing' | 'RestrictEditing' | 'RemoveEditRange';
export declare type BiDirectionalOverride = 'None' | 'LTR' | 'RTL';
export declare type AutoFitType = 'FitToContents' | 'FitToWindow' | 'FixedColumnWidth';
/**
 * Specifies the type of protection
 * @private
 */
export declare type ProtectionType = 'NoProtection' | 'ReadOnly';
export declare type PasteOptions = 'KeepSourceFormatting' | 'MergeWithExistingFormatting' | 'KeepTextOnly';
