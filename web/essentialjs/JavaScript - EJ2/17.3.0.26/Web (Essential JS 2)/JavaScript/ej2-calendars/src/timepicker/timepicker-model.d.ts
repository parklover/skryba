﻿﻿import { EventHandler, Property, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';import { KeyboardEvents, KeyboardEventArgs, Animation, AnimationModel, Browser, BaseEventArgs } from '@syncfusion/ej2-base';import { EmitType, cldrData, L10n, Component, getDefaultDateObject, rippleEffect, RippleOptions, Event } from '@syncfusion/ej2-base';import { createElement, remove, addClass, detach, removeClass, closest, append, attributes, setStyleAttribute } from '@syncfusion/ej2-base';import { isNullOrUndefined, formatUnit, getValue, setValue, extend, getUniqueID } from '@syncfusion/ej2-base';import { Popup } from '@syncfusion/ej2-popups';import { FocusEventArgs, BlurEventArgs } from '../calendar/calendar';import { Input, InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';import { ListBase, cssClass as ListBaseClasses, ListBaseOptions, createElementParams } from '@syncfusion/ej2-lists';
import {TimeFormatObject,ChangeEventArgs,PopupEventArgs,ItemEventArgs} from "./timepicker";
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class TimePicker
 */
export interface TimePickerModel extends ComponentModel{

    /**
     * Gets or sets the width of the TimePicker component. The width of the popup is based on the width of the component.

     */
    width?: string | number;

    /**
     * Specifies the root CSS class of the TimePicker that allows to
     * customize the appearance by overriding the styles.

     */
    cssClass?: string;

    /**
     * Specifies the component to act as strict so that, it allows to enter only a valid time value within a specified range or else 
     * resets to previous value. By default, strictMode is in false.
     * > For more details refer to 
     * [`Strict Mode`](../../timepicker/strict-mode/) documentation.

     */
    strictMode?: boolean;

    /**
     * Customizes the key actions in TimePicker.
     * For example, when using German keyboard, the key actions can be customized using these shortcuts.
     * 
     * <table> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * Key action<br/></td><td colSpan=1 rowSpan=1> 
     * Key<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * enter<br/></td><td colSpan=1 rowSpan=1> 
     * enter<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * escape<br/></td><td colSpan=1 rowSpan=1> 
     * escape<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * end<br/></td><td colSpan=1 rowSpan=1> 
     * end<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * tab<br/></td><td colSpan=1 rowSpan=1> 
     * tab<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * home<br/></td><td colSpan=1 rowSpan=1> 
     * home<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * down<br/></td><td colSpan=1 rowSpan=1> 
     * downarrow<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * up<br/></td><td colSpan=1 rowSpan=1> 
     * uparrow<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * left<br/></td><td colSpan=1 rowSpan=1> 
     * leftarrow<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * right<br/></td><td colSpan=1 rowSpan=1> 
     * rightarrow<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * open<br/></td><td colSpan=1 rowSpan=1> 
     * alt+downarrow<br/></td></tr> 
     * <tr> 
     * <td colSpan=1 rowSpan=1> 
     * close<br/></td><td colSpan=1 rowSpan=1> 
     * alt+uparrow<br/></td></tr> 
     * </table>
     * 


     */
    keyConfigs?: { [key: string]: string };

    /**
     * Specifies the format of value that is to be displayed in component. By default, the format is
     * based on the culture. 
     * > For more details refer to 
     * [`Format`](../../timepicker/getting-started#setting-the-time-format) documentation.



     */
    format?: string | TimeFormatObject;

    /**
     * Specifies whether the component to be disabled or not.

     */
    enabled?: boolean;

    /**
     * Specifies the component in readonly state. 

     */
    readonly?: boolean;

    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.

     */
    htmlAttributes?: { [key: string]: string; };

    /**
     * Specifies the placeholder text to be floated.
     * Possible values are:
     * Never: The label will never float in the input when the placeholder is available.
     * Always: The floating label will always float above the input.
     * Auto: The floating label will float above the input after focusing or entering a value in the input.




     */
    floatLabelType?: FloatLabelType | string;

    /**
     * Specifies the placeholder text that is displayed in textbox.

     */
    placeholder?: string;

    /**
     * specifies the z-index value of the timePicker popup element.



     */
    zIndex?: number;

    /**
     * Enable or disable the persisting component's state between the page reloads. If enabled, following list of states will be persisted.
     * 1. Value

     */
    enablePersistence?: boolean;

    /**
     * Specifies whether to show or hide the clear icon.

     */
    showClearButton?: boolean;

    /**
     * Specifies the time interval between the two adjacent time values in the popup list. 
     * > For more details refer to 
     * [`Format`](../../timepicker/getting-started#setting-the-time-format)documentation.


     * 
     */
    step?: number;

    /**
     * Specifies the scroll bar position if there is no value is selected in the popup list or
     *  the given value is not present in the popup list.
     * > For more details refer to 
     * [`Time Duration`](https://ej2.syncfusion.com/demos/#/material/timepicker/list-formatting.html) sample. 


     */
    scrollTo?: Date;

    /**
     * Gets or sets the value of the component. The value is parsed based on the culture specific time format.


     */
    value?: Date;

    /**
     * Gets or sets the minimum time value that can be allowed to select in TimePicker.
     * > For more details refer to 
     * [`Time Range`](../../timepicker/time-range/) documentation.


     */
    min?: Date;

    /**
     * Gets or sets the maximum time value that can be allowed to select in TimePicker.
     * > For more details refer to 
     * [`Time Range`](../../timepicker/time-range/) documentation.


     */
    max?: Date;

    /**
     * > Support for `allowEdit` has been provided from 
     * [`v16.2.46`](https://ej2.syncfusion.com/angular/documentation/release-notes/16.2.46/#timepicker).
     * 
     * Specifies whether the input textbox is editable or not. Here the user can select the value from the 
     * popup and cannot edit in the input textbox.

     */
    allowEdit?: boolean;

    /**
     * Triggers when the value is changed.
     * @event  

     */
    change?: EmitType<ChangeEventArgs>;

    /**
     * Triggers when the component is created.
     * @event

     */
    created?: EmitType<Object>;

    /**
     * Triggers when the component is destroyed.
     * @event

     */
    destroyed?: EmitType<Object>;

    /**
     * Triggers when the popup is opened.
     * @event

     */
    open?: EmitType<PopupEventArgs>;

    /**
     * Triggers while rendering the each popup list item.
     * @event

     */
    itemRender?: EmitType<ItemEventArgs>;

    /**
     * Triggers when the popup is closed.
     * @event

     */
    close?: EmitType<PopupEventArgs>;

    /**
     * Triggers when the control loses the focus.
     * @event
     */
    blur?: EmitType<BlurEventArgs>;

    /**
     * Triggers when the control gets focused.
     * @event
     */
    focus?: EmitType<FocusEventArgs>;

}