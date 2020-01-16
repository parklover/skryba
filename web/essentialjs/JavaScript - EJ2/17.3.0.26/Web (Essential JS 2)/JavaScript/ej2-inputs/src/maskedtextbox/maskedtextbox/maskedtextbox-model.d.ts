import { Component, Event, Property, EmitType, NotifyPropertyChanges, INotifyPropertyChanged, BaseEventArgs } from '@syncfusion/ej2-base';import { isNullOrUndefined, formatUnit, getValue, setValue, attributes, addClass, detach, createElement } from '@syncfusion/ej2-base';import { removeClass , Browser, closest} from '@syncfusion/ej2-base';import { Input, InputObject, FloatLabelType } from '../../input/input';import { regularExpressions, createMask, applyMask, wireEvents, unwireEvents, unstrippedValue, strippedValue } from '../base/index';import { setMaskValue, MaskUndo, setElementValue, bindClearEvent } from '../base/index';import { maskInputBlurHandler } from '../base/mask-base';
import {MaskChangeEventArgs,MaskFocusEventArgs,MaskBlurEventArgs} from "./maskedtextbox";
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class MaskedTextBox
 */
export interface MaskedTextBoxModel extends ComponentModel{

    /**
     * Gets or sets the CSS classes to root element of the MaskedTextBox which helps to customize the
     * complete UI styles for the MaskedTextBox component.

     */
    cssClass?: string;

    /**
     * Sets the width of the MaskedTextBox.

     */
    width?: number | string;

    /**
     * Gets or sets the string shown as a hint/placeholder when the MaskedTextBox is empty.
     * It acts as a label and floats above the MaskedTextBox based on the
     * <b><a href="#floatlabeltype" target="_blank">floatLabelType.</a></b>

     */
    placeholder?: string;

    /**
     * The <b><a href="#placeholder" target="_blank">placeholder</a></b> acts as a label
     * and floats above the MaskedTextBox based on the below values.
     * Possible values are:
     * * Never - The floating label will not be enable when the placeholder is available.
     * * Always - The floating label always floats above the MaskedTextBox.
     * * Auto - The floating label floats above the MaskedTextBox after focusing it or when enters the value in it.

     */
    floatLabelType?: FloatLabelType;

    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.

     */
    htmlAttributes?: { [key: string]: string; };

    /**
     * Sets a value that enables or disables the MaskedTextBox component.

     */
    enabled?: boolean;

    /**
     * Specifies the boolean value whether the Masked TextBox allows the user to change the text.

     */
    readonly?: boolean;

    /**
     * Specifies whether to show or hide the clear icon.

     */
    showClearButton?: boolean;

    /**
     * Sets a value that enables or disables the persisting state of the MaskedTextBox after reloading the page.
     * If enabled, the 'value' state will be persisted.

     */
    enablePersistence?: boolean;

    /**
     * Sets a value that masks the MaskedTextBox to allow/validate the user input.
     * * Mask allows [`standard mask elements`](../../maskedtextbox/mask-configuration/#standard-mask-elements)
     * </b>, <b>[`custom characters`](../../maskedtextbox/mask-configuration/#custom-characters)</b> and
     * <b>[`regular expression`](../../maskedtextbox/mask-configuration/#regular-expression)</b> as mask
     * elements.
     * For more information on mask, refer to
     * [mask](../../maskedtextbox/mask-configuration/#standard-mask-elements).
     * * If the mask value is empty, the MaskedTextBox will behave as an input element with text type.

     */
    mask?: string;

    /**
     * Gets or sets a value that will be shown as a prompting symbol for the masked value.
     * The symbol used to show input positions in the MaskedTextBox.
     * For more information on prompt-character, refer to
     * [prompt-character](../../maskedtextbox/mask-configuration/#prompt-character).

     */
    promptChar?: string;

    /**
     * Gets or sets the value of the MaskedTextBox. It is a raw value of the MaskedTextBox excluding literals
     * and prompt characters. By using `getMaskedValue` property, you can get the value of MaskedTextBox with the masked format.
     * ```html
     * <input id="mask" type="text" />
     * ```
     * ```typescript
     * <script>
     * var maskObj = new MaskedTextBox({ mask: "(999) 9999-999", value: "8674321756" });
     * maskObj.appendTo('#mask');
     * </script>
     * ```

     */
    value?: string;

    /**
     * Sets the collection of values to be mapped for non-mask elements(literals)
     * which have been set in the mask of MaskedTextBox.
     * * In the below example, non-mask elements "P" accepts values
     * "P" , "A" , "p" , "a" and "M" accepts values "M", "m" mentioned in the custom characters collection.
     * ```html
     * <input id="mask" type="text" />
     * ```
     * ```typescript
     * <script>
     * var customChar = { P: 'P,A,p,a', M: 'M,m'};
     * var maskObj = new MaskedTextBox({ mask: "99 : 99 PM", customCharacters: customChar });
     * maskObj.appendTo('#mask');
     * </script>
     * ```
     * For more information on customCharacters, refer to
     * [customCharacters](../../maskedtextbox/mask-configuration/#custom-characters).

     */
    customCharacters?: { [x: string]: Object };

    /**
     * Triggers when the MaskedTextBox component is created.
     * @event

     */
    created?: EmitType<Object>;

    /**
     * Triggers when the MaskedTextBox component is destroyed.
     * @event

     */
    destroyed?: EmitType<Object>;

    /**
     * Triggers when the value of the MaskedTextBox changes.
     * @event

     */
    change?: EmitType <MaskChangeEventArgs>;

    /**
     * Triggers when the MaskedTextBox got focus in.
     * @event
     */
    focus?: EmitType<MaskFocusEventArgs>;

    /**
     * Triggers when the MaskedTextBox got focus out.
     * @event
     */
    blur?: EmitType<MaskBlurEventArgs>;

}