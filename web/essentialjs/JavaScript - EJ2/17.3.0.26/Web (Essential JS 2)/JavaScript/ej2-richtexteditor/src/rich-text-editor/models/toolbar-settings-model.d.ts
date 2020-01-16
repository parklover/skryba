import { Property, ChildProperty } from '@syncfusion/ej2-base';import { ToolbarType, ActionOnScroll, ToolbarItems } from '../base/enum';import { IToolbarItems, IDropDownItemModel, ColorModeType, IToolsItemConfigs } from '../base/interface';import { TableStyleItems } from '../models/items';import { SaveFormat } from '../../common';

/**
 * Interface for a class ToolbarSettings
 */
export interface ToolbarSettingsModel {

    /**
     * Specifies whether to render toolbar in RichTextEditor.

     */
    enable?: boolean;

    /**
     * Specifies whether to enable/disable floating toolbar.

     */
    enableFloating?: boolean;

    /**
     * Specifies the Toolbar display types.
     * The possible types are:
     * - Expand: Toolbar items placed within the available space and rest of the items are placed to the extended menu section.
     * - MultiRow: Toolbar which placed at top of RichTextEditor editing area.

     */
    type?: ToolbarType;

    /**
     * An array of string or object that is used to configure items.

     * 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
     */
    items?: (string | IToolbarItems)[];

    /**
     * Using this property, Modify the default toolbar item configuration like icon class.

     */
    itemConfigs?: { [key in ToolbarItems]?: IToolsItemConfigs };

}

/**
 * Interface for a class ImageSettings
 */
export interface ImageSettingsModel {

    /**
     * Specifies whether to allowType based file select.

     */
    allowedTypes?: string[];

    /**
     * Specifies whether insert image inline or break.

     */
    display?: string;

    /**
     * Specifies whether the inserted image is saved as blob or base64.

     */
    saveFormat?: SaveFormat;

    /**
     * Specifies whether image width.

     */
    width?: string;

    /**
     * Specifies whether image height.

     */
    height?: string;

    /**
     * Specifies the URL of save action that will receive the upload files and save in the server.

     */
    saveUrl?: string;

    /**
     * Specifies the URL of save action that will receive the upload files and save in the server.

     */
    path?: string;

    /**
     * To enable resizing for image element.

     */
    resize?: boolean;

    /**
     * Defines the minimum Width of the image.

     */
    minWidth?: string | number;

    /**
     * Defines the maximum Width of the image.

     */
    maxWidth?: string | number;

    /**
     * Defines the minimum Height of the image.

     */
    minHeight?: string | number;

    /**
     * Defines the maximum Height of the image.

     */
    maxHeight?: string | number;

    /**
     * image resizing should be done by percentage calculation.

     */
    resizeByPercent?: boolean;

}

/**
 * Interface for a class TableSettings
 */
export interface TableSettingsModel {

    /**
     * To specify the width of table

     */
    width?: string | number;

    /**
     * Class name should be appended by default in table element.
     * It helps to design the table in specific CSS styles always when inserting in editor.

     */
    styles?: IDropDownItemModel[];

    /**
     * To enable resizing for table element.

     */
    resize?: boolean;

    /**
     * Defines the minimum Width of the table.

     */
    minWidth?: string | number;

    /**
     * Defines the maximum Width of the table.

     */
    maxWidth?: string | number;

}

/**
 * Interface for a class QuickToolbarSettings
 */
export interface QuickToolbarSettingsModel {

    /**
     * Specifies whether to enable quick toolbar in RichTextEditor.

     */
    enable?: boolean;

    /**
     * Specifies whether to opens a quick toolbar on the right click.

     */
    showOnRightClick?: boolean;

    /**
     * Specifies the action that should happen when scroll the target-parent container.

     */
    actionOnScroll?: ActionOnScroll;

    /**
     * Specifies the items to render in quick toolbar, when link selected.

     */
    link?: (string | IToolbarItems)[];

    /**
     * Specifies the items to render in quick toolbar, when image selected.

     */
    // tslint:disable
    image?: (string | IToolbarItems)[];

    /**
     * Specifies the items to render in quick toolbar, when text selected.

     */
    text?: (string | IToolbarItems)[];

    /**
     * Specifies the items to render in quick toolbar, when table selected.

     */
    table?: (string | IToolbarItems)[];

}

/**
 * Interface for a class PasteCleanupSettings
 */
export interface PasteCleanupSettingsModel {

    /**
     * Specifies whether to enable the prompt for paste in RichTextEditor.

     */
    prompt?: boolean;

    /**
     * Specifies the attributes to restrict when pasting in RichTextEditor.

     */
    deniedAttrs?: string[];

    /**
     * Specifies the allowed style properties when pasting in RichTextEditor.

     */
    allowedStyleProps?: string[];

    /**
     * Specifies the tags to restrict when pasting in RichTextEditor.

     */
    deniedTags?: string[];

    /**
     * Specifies whether to keep or remove the format when pasting in RichTextEditor.

     */
    keepFormat?: boolean;

    /**
     * Specifies whether to paste as plain text or not in RichTextEditor.

     */
    plainText?: boolean;

}

/**
 * Interface for a class FontFamily
 */
export interface FontFamilyModel {

    /**
     * Specifies default font family selection

     */
    default?: string;

    /**
     * Specifies content width

     */
    width?: string;

    /**
     * Specifies default font family items

     */
    items?: IDropDownItemModel[];

}

/**
 * Interface for a class FontSize
 */
export interface FontSizeModel {

    /**
     * Specifies default font size selection

     */
    default?: string;

    /**
     * Specifies content width

     */
    width?: string;

    /**
     * Specifies default font size items

     */
    items?: IDropDownItemModel[];

}

/**
 * Interface for a class Format
 */
export interface FormatModel {

    /**
     * Specifies default format

     */
    default?: string;

    /**
     * Specifies content width

     */
    width?: string;

    /**
     * Specifies default font size items

     */
    types?: IDropDownItemModel[];

}

/**
 * Interface for a class FontColor
 */
export interface FontColorModel {

    /**
     * Specifies default font color

     */
    default?: string;

    /**
     * Specifies mode

     */
    mode?: ColorModeType;

    /**
     * Specifies columns

     */
    columns?: number;

    /**
     * Specifies color code customization

     */
    colorCode?: { [key: string]: string[] };

    /**
     * Specifies modeSwitcher button

     */
    modeSwitcher?: boolean;

}

/**
 * Interface for a class BackgroundColor
 */
export interface BackgroundColorModel {

    /**
     * Specifies default font color

     */
    default?: string;

    /**
     * Specifies mode

     */
    mode?: ColorModeType;

    /**
     * Specifies columns

     */
    columns?: number;

    /**
     * Specifies color code customization

     */
    colorCode?: { [key: string]: string[] };

    /**
     * Specifies a modeSwitcher button

     */
    modeSwitcher?: boolean;

}