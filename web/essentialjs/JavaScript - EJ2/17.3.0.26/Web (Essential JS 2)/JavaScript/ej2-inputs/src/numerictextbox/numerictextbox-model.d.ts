import { Component, EventHandler, Property, Event, Browser, L10n, EmitType } from '@syncfusion/ej2-base';import { NotifyPropertyChanges, INotifyPropertyChanged, BaseEventArgs } from '@syncfusion/ej2-base';import { createElement, attributes, addClass, removeClass, detach, closest } from '@syncfusion/ej2-base';import { isNullOrUndefined, getValue, formatUnit, setValue, merge } from '@syncfusion/ej2-base';import { Internationalization, NumberFormatOptions, getNumericObject } from '@syncfusion/ej2-base';import { Input, InputObject, FloatLabelType } from '../input/input';
import {ChangeEventArgs,NumericFocusEventArgs,NumericBlurEventArgs} from "./numerictextbox";
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class NumericTextBox
 */
export interface NumericTextBoxModel extends ComponentModel{

    /**
     * Gets or Sets the CSS classes to root element of the NumericTextBox which helps to customize the
     * complete UI styles for the NumericTextBox component.

     */
    cssClass?: string;

    /**
     * Sets the value of the NumericTextBox.



     */
    value?: number;

    /**
     * Specifies a minimum value that is allowed a user can enter.
     * For more information on min, refer to
     * [min](../../numerictextbox/getting-started/#range-validation).




     */
    min?: number;

    /**
     * Specifies a maximum value that is allowed a user can enter.
     * For more information on max, refer to
     * [max](../../numerictextbox/getting-started/#range-validation).




     */
    max?: number;

    /**
     * Specifies the incremental or decremental step size for the NumericTextBox.
     * For more information on step, refer to
     * [step](../../numerictextbox/getting-started/#range-validation).



     */
    step?: number;

    /**
     * Specifies the width of the NumericTextBox.

     */
    width?: number | string;

    /**
     * Gets or sets the string shown as a hint/placeholder when the NumericTextBox is empty.
     * It acts as a label and floats above the NumericTextBox based on the
     * <b><a href="#floatlabeltype" target="_blank">floatLabelType.</a></b>

     */
    placeholder?: string;

    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.

     */
    htmlAttributes?: { [key: string]: string; };

    /**
     * Specifies whether the up and down spin buttons should be displayed in NumericTextBox.

     */
    showSpinButton?: boolean;

    /**
     * Sets a value that enables or disables the readonly state on the NumericTextBox. If it is true, 
     * NumericTextBox will not allow your input.

     */
    readonly?: boolean;

    /**
     * Sets a value that enables or disables the NumericTextBox control.

     */
    enabled?: boolean;

    /**
     * Specifies whether to show or hide the clear icon.

     */
    showClearButton?: boolean;

    /**
     * Enable or disable persisting NumericTextBox state between page reloads. If enabled, the `value` state will be persisted.

     */
    enablePersistence?: boolean;

    /**
     * Specifies the number format that indicates the display format for the value of the NumericTextBox.
     * For more information on formats, refer to
     * [formats](../../numerictextbox/formats/#standard-formats).

     */
    format?: string;

    /**
     * Specifies the number precision applied to the textbox value when the NumericTextBox is focused.
     * For more information on decimals, refer to
     * [decimals](../../numerictextbox/formats/#precision-of-numbers).




     */
    decimals?: number;

    /**
     * Specifies the currency code to use in currency formatting.
     * Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar,'EUR' for the euro.

     */
    currency?: string;

    /**
     * Specifies the currency code to use in currency formatting.
     * Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar,'EUR' for the euro.

     * @private
     */
    currencyCode?: string;

    /**
     * Specifies a value that indicates whether the NumericTextBox control allows the value for the specified range.
     * * If it is true, the input value will be restricted between the min and max range.
     * The typed value gets modified to fit the range on focused out state.
     * ```html
     * <input type='text' id="numeric"/>
     * ```
     * ```typescript
     * <script>
     *   var numericObj = new NumericTextBox({ min: 10, max: 20, value: 15 });
     *   numericObj.appendTo("#numeric");
     * </script>
     * ```
     * * Else, it allows any value even out of range value,
     * At that time of wrong value entered, the error class will be added to the component to highlight the error.
     * ```html
     * <input type='text' id="numeric"/>
     * ```
     * ```typescript
     * <script>
     *   var numericObj = new NumericTextBox({ strictMode: false, min: 10, max: 20, value: 15 });
     *   numericObj.appendTo("#numeric");
     * </script>
     * ```

     */
    strictMode?: boolean;

    /**
     * Specifies whether the decimals length should be restricted during typing.

     */
    validateDecimalOnType?: boolean;

    /**
     * The <b><a href="#placeholder" target="_blank">placeholder</a></b> acts as a label
     * and floats above the NumericTextBox based on the below values.
     * Possible values are:
     * * `Never` - Never floats the label in the NumericTextBox when the placeholder is available.
     * * `Always` - The floating label always floats above the NumericTextBox.
     * * `Auto` - The floating label floats above the NumericTextBox after focusing it or when enters the value in it.

     */
    floatLabelType?: FloatLabelType;

    /**
     * Triggers when the NumericTextBox component is created.
     * @event

     */
    created?: EmitType<Object>;

    /**
     * Triggers when the NumericTextBox component is destroyed.
     * @event

     */
    destroyed?: EmitType<Object>;

    /**
     * Triggers when the value of the NumericTextBox changes.
     * @event

     */
    change?: EmitType<ChangeEventArgs>;

    /**
     * Triggers when the NumericTextBox got focus in.
     * @event
     */
    focus?: EmitType<NumericFocusEventArgs>;

    /**
     * Triggers when the NumericTextBox got focus out.
     * @event
     */
    blur?: EmitType<NumericBlurEventArgs>;

}