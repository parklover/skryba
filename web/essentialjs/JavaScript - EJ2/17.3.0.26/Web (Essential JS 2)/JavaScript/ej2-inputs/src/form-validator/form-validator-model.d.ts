import { selectAll, select, createElement, Base, EmitType, detach } from '@syncfusion/ej2-base';import { extend, isNullOrUndefined, IKeyValue, EventHandler } from '@syncfusion/ej2-base';import { Property, NotifyPropertyChanges, INotifyPropertyChanged, Event, onIntlChange } from '@syncfusion/ej2-base';import { Internationalization, L10n } from '@syncfusion/ej2-base';
import {ErrorOption,ValidArgs,FormEventArgs} from "./form-validator";

/**
 * Interface for a class FormValidator
 */
export interface FormValidatorModel {

    /**
     * default locale variable
     */
    locale?: string;

    /**
     * Ignores input fields based on the class name

     */
    ignore?: string;

    /**
     * Maps the input fields with validation rules

     */
    rules?: { [name: string]: { [rule: string]: Object } };

    /**
     * Sets the defined css class to error fields 

     */
    errorClass?: string;

    /**
     * Sets the defined css class to valid fields 

     */
    validClass?: string;

    /**
     * Specify HTML element for error

     */
    errorElement?: string;

    /**
     * Specify HTML element for error container 

     */
    errorContainer?: string;

    /**
     * Option to display the error


     */
    errorOption?: ErrorOption;

    /**
     * Triggers when a field's focused  out
     * @event
     */
    focusout?: EmitType<Event>;

    /**
     * Trigger when keyup is triggered in any fields
     * @event
     */
    keyup?: EmitType<KeyboardEvent>;

    /**
     * Triggers when a check box field is clicked
     * @event
     */
    click?: EmitType<Event>;

    /**
     * Trigger when a select/drop-down field is changed
     * @event
     */
    change?: EmitType<Event>;

    /**
     * Triggers before form is being submitted
     * @event
     */
    submit?: EmitType<Event>;

    /**
     * Triggers before validation starts
     * @event
     */
    validationBegin?: EmitType<Object | ValidArgs>;

    /**
     * Triggers after validation is completed
     * @event
     */
    validationComplete?: EmitType<Object | FormEventArgs>;

    /**
     * Assigns the custom function to place the error message in the page.
     * @event
     */
    // tslint:disable
    customPlacement?: EmitType<HTMLElement | any>;

}