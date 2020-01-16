import { ChildProperty } from '@syncfusion/ej2-base';
import { ToolbarType, ActionOnScroll, ToolbarItems } from '../base/enum';
import { IToolbarItems, IDropDownItemModel, ColorModeType, IToolsItemConfigs } from '../base/interface';
import { SaveFormat } from '../../common';
export declare const predefinedItems: string[];
export declare const fontFamily: IDropDownItemModel[];
export declare const fontSize: IDropDownItemModel[];
export declare const formatItems: IDropDownItemModel[];
export declare const fontColor: {
    [key: string]: string[];
};
export declare const backgroundColor: {
    [key: string]: string[];
};
/**
 * Configures the toolbar settings of the RichTextEditor.
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Specifies whether to render toolbar in RichTextEditor.

     */
    enable: boolean;
    /**
     * Specifies whether to enable/disable floating toolbar.

     */
    enableFloating: boolean;
    /**
     * Specifies the Toolbar display types.
     * The possible types are:
     * - Expand: Toolbar items placed within the available space and rest of the items are placed to the extended menu section.
     * - MultiRow: Toolbar which placed at top of RichTextEditor editing area.

     */
    type: ToolbarType;
    /**
     * An array of string or object that is used to configure items.

     * 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
     */
    items: (string | IToolbarItems)[];
    /**
     * Using this property, Modify the default toolbar item configuration like icon class.

     */
    itemConfigs: {
        [key in ToolbarItems]?: IToolsItemConfigs;
    };
}
/**
 * Configures the image settings of the RichTextEditor.
 */
export declare class ImageSettings extends ChildProperty<ImageSettings> {
    /**
     * Specifies whether to allowType based file select.

     */
    allowedTypes: string[];
    /**
     * Specifies whether insert image inline or break.

     */
    display: string;
    /**
     * Specifies whether the inserted image is saved as blob or base64.

     */
    saveFormat: SaveFormat;
    /**
     * Specifies whether image width.

     */
    width: string;
    /**
     * Specifies whether image height.

     */
    height: string;
    /**
     * Specifies the URL of save action that will receive the upload files and save in the server.

     */
    saveUrl: string;
    /**
     * Specifies the URL of save action that will receive the upload files and save in the server.

     */
    path: string;
    /**
     * To enable resizing for image element.

     */
    resize: boolean;
    /**
     * Defines the minimum Width of the image.

     */
    minWidth: string | number;
    /**
     * Defines the maximum Width of the image.

     */
    maxWidth: string | number;
    /**
     * Defines the minimum Height of the image.

     */
    minHeight: string | number;
    /**
     * Defines the maximum Height of the image.

     */
    maxHeight: string | number;
    /**
     * image resizing should be done by percentage calculation.

     */
    resizeByPercent: boolean;
}
export declare class TableSettings extends ChildProperty<TableSettings> {
    /**
     * To specify the width of table

     */
    width: string | number;
    /**
     * Class name should be appended by default in table element.
     * It helps to design the table in specific CSS styles always when inserting in editor.

     */
    styles: IDropDownItemModel[];
    /**
     * To enable resizing for table element.

     */
    resize: boolean;
    /**
     * Defines the minimum Width of the table.

     */
    minWidth: string | number;
    /**
     * Defines the maximum Width of the table.

     */
    maxWidth: string | number;
}
/**
 * Configures the quick toolbar settings of the RichTextEditor.
 */
export declare class QuickToolbarSettings extends ChildProperty<QuickToolbarSettings> {
    /**
     * Specifies whether to enable quick toolbar in RichTextEditor.

     */
    enable: boolean;
    /**
     * Specifies whether to opens a quick toolbar on the right click.

     */
    showOnRightClick: boolean;
    /**
     * Specifies the action that should happen when scroll the target-parent container.

     */
    actionOnScroll: ActionOnScroll;
    /**
     * Specifies the items to render in quick toolbar, when link selected.

     */
    link: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in quick toolbar, when image selected.

     */
    image: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in quick toolbar, when text selected.

     */
    text: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in quick toolbar, when table selected.

     */
    table: (string | IToolbarItems)[];
}
/**
 * Configures the Paste Cleanup settings of the RichTextEditor.
 */
export declare class PasteCleanupSettings extends ChildProperty<PasteCleanupSettings> {
    /**
     * Specifies whether to enable the prompt for paste in RichTextEditor.

     */
    prompt: boolean;
    /**
     * Specifies the attributes to restrict when pasting in RichTextEditor.

     */
    deniedAttrs: string[];
    /**
     * Specifies the allowed style properties when pasting in RichTextEditor.

     */
    allowedStyleProps: string[];
    /**
     * Specifies the tags to restrict when pasting in RichTextEditor.

     */
    deniedTags: string[];
    /**
     * Specifies whether to keep or remove the format when pasting in RichTextEditor.

     */
    keepFormat: boolean;
    /**
     * Specifies whether to paste as plain text or not in RichTextEditor.

     */
    plainText: boolean;
}
/**
 * Configures the font family settings of the RichTextEditor.
 */
export declare class FontFamily extends ChildProperty<FontFamily> {
    /**
     * Specifies default font family selection

     */
    default: string;
    /**
     * Specifies content width

     */
    width: string;
    /**
     * Specifies default font family items

     */
    items: IDropDownItemModel[];
}
/**
 * Configures the font size settings of the RichTextEditor.
 */
export declare class FontSize extends ChildProperty<FontSize> {
    /**
     * Specifies default font size selection

     */
    default: string;
    /**
     * Specifies content width

     */
    width: string;
    /**
     * Specifies default font size items

     */
    items: IDropDownItemModel[];
}
/**
 * Configures the format settings of the RichTextEditor.
 */
export declare class Format extends ChildProperty<Format> {
    /**
     * Specifies default format

     */
    default: string;
    /**
     * Specifies content width

     */
    width: string;
    /**
     * Specifies default font size items

     */
    types: IDropDownItemModel[];
}
/**
 * Configures the font Color settings of the RichTextEditor.
 */
export declare class FontColor extends ChildProperty<FontColor> {
    /**
     * Specifies default font color

     */
    default: string;
    /**
     * Specifies mode

     */
    mode: ColorModeType;
    /**
     * Specifies columns

     */
    columns: number;
    /**
     * Specifies color code customization

     */
    colorCode: {
        [key: string]: string[];
    };
    /**
     * Specifies modeSwitcher button

     */
    modeSwitcher: boolean;
}
/**
 * Configures the background Color settings of the RichTextEditor.
 */
export declare class BackgroundColor extends ChildProperty<BackgroundColor> {
    /**
     * Specifies default font color

     */
    default: string;
    /**
     * Specifies mode

     */
    mode: ColorModeType;
    /**
     * Specifies columns

     */
    columns: number;
    /**
     * Specifies color code customization

     */
    colorCode: {
        [key: string]: string[];
    };
    /**
     * Specifies a modeSwitcher button

     */
    modeSwitcher: boolean;
}
