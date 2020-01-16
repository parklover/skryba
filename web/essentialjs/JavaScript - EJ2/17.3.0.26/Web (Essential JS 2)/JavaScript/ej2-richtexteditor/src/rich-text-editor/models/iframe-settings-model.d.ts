import { Property, ChildProperty, Complex } from '@syncfusion/ej2-base';

/**
 * Interface for a class Resources
 */
export interface ResourcesModel {

    /**
     * Specifies styles that inject into iframe.

     */
    styles?: string[];

    /**
     * Specifies scripts that inject into iframe.

     */
    scripts?: string[];

}

/**
 * Interface for a class IFrameSettings
 */
export interface IFrameSettingsModel {

    /**
     * Specifies whether to render iframe based editable element in RTE.

     */
    enable?: boolean;

    /**
     * Defines additional attributes to render iframe.

     */
    attributes?: { [key: string]: string; };

    /**
     * The object used for inject styles and scripts.

     */
    resources?: ResourcesModel;

}