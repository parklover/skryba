/// <reference path="../calendar/calendar-model.d.ts" />
import { KeyboardEvents, BaseEventArgs, KeyboardEventArgs, EmitType, ChildProperty } from '@syncfusion/ej2-base';
import { CalendarView, CalendarBase, NavigatedEventArgs, RenderDayCellEventArgs, CalendarType } from '../calendar/calendar';
import { Popup } from '@syncfusion/ej2-popups';
import { BlurEventArgs, FocusEventArgs } from '../calendar/calendar';
import { FloatLabelType } from '@syncfusion/ej2-inputs';
import { PresetsModel, DateRangePickerModel } from './daterangepicker-model';
export declare class Presets extends ChildProperty<Presets> {
    /**
     * Defines the label string of the preset range.
     */
    label: string;
    /**
     * Defines the start date of the preset range.
     */
    start: Date;
    /**
     * Defines the end date of the preset range
     */
    end: Date;
}
export interface DateRange {
    /** Defines the start date */
    start?: Date;
    /** Defines the end date */
    end?: Date;
}
export interface RangeEventArgs extends BaseEventArgs {
    /**
     * Defines the value
     */
    value?: Date[] | DateRange;
    /** Defines the value string in the input element */
    text?: string;
    /** Defines the start date  */
    startDate?: Date;
    /** Defines the end date  */
    endDate?: Date;
    /** Defines the day span between the range */
    daySpan?: number;
    /** Specifies the element. */
    element?: HTMLElement | HTMLInputElement;
    /**
     * Specifies the original event arguments.
     */
    event?: MouseEvent | KeyboardEvent | TouchEvent | Event;
    /**
     * If the event is triggered by interaction, it returns true. Otherwise, it returns false.
     */
    isInteracted?: boolean;
}
export interface RangePopupEventArgs {
    /** Defines the range string in the input element */
    date: string;
    /** Defines the DateRangePicker model */
    model: DateRangePickerModel;
    /**
     * Illustrates whether the current action needs to be prevented or not.
     */
    cancel?: boolean;
    /**
     * Defines the DateRangePicker popup object.

     */
    popup?: Popup;
    /**
     * Specifies the original event arguments.
     */
    event?: MouseEvent | KeyboardEvent | Event;
    /**
     * Specifies the node to which the popup element to be appended.
     */
    appendTo?: HTMLElement;
}
export interface RangeFormatObject {
    /**
     * Specifies the format in which the date format will process
     */
    skeleton?: string;
}
/**
 * Represents the DateRangePicker component that allows user to select the date range from the calendar
 * or entering the range through the input element.
 * ```html
 * <input id="daterangepicker"/>
 * ```
 * ```typescript
 * <script>
 *   var dateRangePickerObj = new DateRangePicker({ startDate: new Date("05/07/2017"), endDate: new Date("10/07/2017") });
 *   dateRangePickerObj.appendTo("#daterangepicker");
 * </script>
 * ```
 */
export declare class DateRangePicker extends CalendarBase {
    private popupObj;
    private inputWrapper;
    private popupWrapper;
    private rightCalendar;
    private leftCalendar;
    private deviceCalendar;
    private leftCalCurrentDate;
    private initStartDate;
    private initEndDate;
    private startValue;
    private endValue;
    private modelValue;
    private rightCalCurrentDate;
    private leftCalPrevIcon;
    private leftCalNextIcon;
    private leftTitle;
    private rightTitle;
    private rightCalPrevIcon;
    private rightCalNextIcon;
    private inputKeyboardModule;
    protected leftKeyboardModule: KeyboardEvents;
    protected rightKeyboardModule: KeyboardEvents;
    private previousStartValue;
    private previousEndValue;
    private applyButton;
    private cancelButton;
    private startButton;
    private endButton;
    private cloneElement;
    private l10n;
    private isCustomRange;
    private isCustomWindow;
    private presetsItem;
    private liCollections;
    private activeIndex;
    private presetElement;
    private previousEleValue;
    private targetElement;
    private disabledDayCnt;
    private angularTag;
    private inputElement;
    private modal;
    private firstHiddenChild;
    private secondHiddenChild;
    private isKeyPopup;
    private dateDisabled;
    private navNextFunction;
    private navPrevFunction;
    private deviceNavNextFunction;
    private deviceNavPrevFunction;
    private isRangeIconClicked;
    private isMaxDaysClicked;
    private popupKeyboardModule;
    private presetKeyboardModule;
    private btnKeyboardModule;
    private virtualRenderCellArgs;
    private disabledDays;
    private isMobile;
    private keyInputConfigs;
    private defaultConstant;
    private preventBlur;
    private preventFocus;
    private valueType;
    private closeEventArgs;
    private openEventArgs;
    private controlDown;
    private startCopy;
    private endCopy;
    private formElement;
    private formatString;
    protected tabIndex: string;
    private invalidValueString;
    private dateRangeOptions;
    private mobileRangePopupWrap;
    /**
     * Gets or sets the start and end date of the Calendar.

     */
    value: Date[] | DateRange;
    /**
     * Enable or disable the persisting component's state between the page reloads. If enabled, following list of states will be persisted.
     * 1. startDate
     * 2. endDate
     * 3. value

     */
    enablePersistence: boolean;
    /**
     * Gets or sets the minimum date that can be selected in the calendar-popup.


     */
    min: Date;
    /**
     * Gets or sets the maximum date that can be selected in the calendar-popup.


     */
    max: Date;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.

     */
    locale: string;
    /**
     * Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
     * > For more details about firstDayOfWeek refer to
     * [`First day of week`](../../daterangepicker/customization#first-day-of-week) documentation.

     */
    firstDayOfWeek: number;
    /**
     * Determines whether the week number of the Calendar is to be displayed or not.
     * The week number is displayed in every week row.
     * > For more details about weekNumber refer to
     * [`Calendar with week number`](../../calendar/how-to/week-number#render-the-calendar-with-week-numbers)documentation.

     */
    weekNumber: boolean;
    /**
     * Gets or sets the Calendar's Type like gregorian or islamic.

     * @private
     */
    calendarMode: CalendarType;
    /**
     * Triggers when Calendar is created.
     * @event

     */
    created: EmitType<Object>;
    /**
     * Triggers when Calendar is destroyed.
     * @event

     */
    destroyed: EmitType<Object>;
    /**
     * Triggers when the Calendar value is changed.
     * @event

     */
    change: EmitType<RangeEventArgs>;
    /**
     * Triggers when the Calendar is navigated to another view or within the same level of view.
     * @event

     */
    navigated: EmitType<NavigatedEventArgs>;
    /**
     * Triggers when each day cell of the Calendar is rendered.
     * @event

     */
    renderDayCell: EmitType<RenderDayCellEventArgs>;
    /**
     * Gets or sets the start date of the date range selection.


     */
    startDate: Date;
    /**
     * Gets or sets the end date of the date range selection.


     */
    endDate: Date;
    /**
     * Set the predefined ranges which let the user pick required range easily in a component.
     * > For more details refer to
     * [`Preset Ranges`](../../daterangepicker/customization#preset-ranges) documentation.

     */
    presets: PresetsModel[];
    /**
     * Specifies the width of the DateRangePicker component.

     */
    width: number | string;
    /**
     * specifies the z-index value of the dateRangePicker popup element.



     */
    zIndex: number;
    /**
     * Specifies whether to show or hide the clear icon

     */
    showClearButton: boolean;
    /**
     * Specifies whether the today button is to be displayed or not.


     */
    showTodayButton: boolean;
    /**
     * Specifies the initial view of the Calendar when it is opened.
     * With the help of this property, initial view can be changed to year or decade view.

     */
    start: CalendarView;
    /**
     * Sets the maximum level of view (month, year, decade) in the Calendar.
     * Depth view should be smaller than the start view to restrict its view navigation.

     */
    depth: CalendarView;
    /**
     *  Sets the root CSS class to the DateRangePicker which allows you to customize the appearance.

     */
    cssClass: string;
    /**
     * Sets or gets the string that used between the start and end date string.

     */
    separator: string;
    /**
     *  Specifies the minimum span of days that can be allowed in date range selection.
     * > For more details refer to
     * [`Range Span`](../../daterangepicker/range-restriction/#range-span) documentation.



     */
    minDays: number;
    /**
     *  Specifies the maximum span of days that can be allowed in a date range selection.
     * > For more details refer to
     * [`Range Span`](../../daterangepicker/range-restriction/#range-span) documentation.




     */
    maxDays: number;
    /**
     * Specifies the component to act as strict which allows entering only a valid date range in a DateRangePicker.
     * > For more details refer to
     * [`Strict Mode`](../../daterangepicker/range-restriction#strict-mode)documentation.

     */
    strictMode: boolean;
    /**
     * Customizes the key actions in DateRangePicker.
     * For example, when using German keyboard, the key actions can be customized using these shortcuts.
     *
     *
     * Input Navigation
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Key action<br/></td><td colSpan=1 rowSpan=1>
     * Key<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altUpArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altDownArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+downarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * escape<br/></td><td colSpan=1 rowSpan=1>
     * escape<br/></td></tr>
     * </table>
     *
     * Calendar Navigation (Use the following list of keys to navigate the currently focused Calendar after the popup has opened).
     * <table>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * Key action<br/></td><td colSpan=1 rowSpan=1>
     * Key<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlUp<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+38<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlDown<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+40<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveDown<br/></td><td colSpan=1 rowSpan=1>
     * downarrow<br/></td></tr>
     * <td colSpan=1 rowSpan=1>
     * pageUp<br/></td><td colSpan=1 rowSpan=1>
     * pageup<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * pageDown<br/></td><td colSpan=1 rowSpan=1>
     * pagedown<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * shiftPageUp<br/></td><td colSpan=1 rowSpan=1>
     * shift+pageup<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * shiftPageDown<br/></td><td colSpan=1 rowSpan=1>
     * shift+pagedown<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveUp<br/></td><td colSpan=1 rowSpan=1>
     * uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveLeft<br/></td><td colSpan=1 rowSpan=1>
     * leftarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * moveRight<br/></td><td colSpan=1 rowSpan=1>
     * rightarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * select<br/></td><td colSpan=1 rowSpan=1>
     * enter<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * home<br/></td><td colSpan=1 rowSpan=1>
     * home<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * end<br/></td><td colSpan=1 rowSpan=1>
     * end<br/></td></tr>
     * <tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlHome<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+home<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * controlEnd<br/></td><td colSpan=1 rowSpan=1>
     * ctrl+end<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altUpArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+uparrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * spacebar<br/></td><td colSpan=1 rowSpan=1>
     * space<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * enter<br/></td><td colSpan=1 rowSpan=1>
     * enter<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altRightArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+rightarrow<br/></td></tr>
     * <tr>
     * <td colSpan=1 rowSpan=1>
     * altLeftArrow<br/></td><td colSpan=1 rowSpan=1>
     * alt+leftarrow<br/></td></tr>
     * </table>
     *


     */
    keyConfigs: {
        [key: string]: string;
    };
    /**
     * Sets or gets the required date format to the start and end date string.
     * > For more details refer to
     * [`Format`](https://ej2.syncfusion.com/demos/#/material/daterangepicker/format.html)sample.



     */
    format: string | RangeFormatObject;
    /**
     * Specifies the component to be disabled which prevents the DateRangePicker from user interactions.

     */
    enabled: boolean;
    /**
     * Denies the editing the ranges in the DateRangePicker component.

     */
    readonly: boolean;
    /**
     * > Support for `allowEdit` has been provided from
     * [`v16.2.46`](https://ej2.syncfusion.com/angular/documentation/release-notes/16.2.46/#daterangepicker).
     *
     * Specifies whether the input textbox is editable or not. Here the user can select the value from the
     * popup and cannot edit in the input textbox.

     */
    allowEdit: boolean;
    /**
     * Specifies the placeholder text to be floated.
     * Possible values are:
     * Never: The label will never float in the input when the placeholder is available.
     * Always: The floating label will always float above the input.
     * Auto: The floating label will float above the input after focusing or entering a value in the input.




     */
    floatLabelType: FloatLabelType | string;
    /**
     * Specifies the placeholder text that need to be displayed in the DateRangePicker component.
     *

     */
    placeholder: string;
    /**
     * You can add the additional html attributes such as disabled, value etc., to the element.
     * If you configured both property and equivalent html attribute then the component considers the property value.

     */
    htmlAttributes: {
        [key: string]: string;
    };
    /**
     * Triggers when the DateRangePicker is opened.
     * @event


     */
    open: EmitType<Object>;
    /**
     * Triggers when the DateRangePicker is closed.
     * @event


     */
    close: EmitType<Object>;
    /**
     * Triggers on selecting the start and end date.
     * @event


     */
    select: EmitType<Object>;
    /**
     *  Triggers when the control gets focus.
     * @event
     */
    focus: EmitType<FocusEventArgs>;
    /**
     * Triggers when the control loses the focus.
     * @event
     */
    blur: EmitType<BlurEventArgs>;
    /**
     * Constructor for creating the widget
     */
    constructor(options?: DateRangePickerModel, element?: string | HTMLInputElement);
    /**
     * To Initialize the control rendering.
     * @return void
     * @private
     */
    protected render(): void;
    /**
     * Initialize the event handler
     * @returns void
     * @private
     */
    protected preRender(): void;
    private updateValue;
    private initProperty;
    protected checkFormat(): void;
    private initialize;
    private updateDataAttribute;
    private setRangeAllowEdit;
    private updateClearIconState;
    protected validationAttribute(element: HTMLElement, input: Element): void;
    private updateHtmlAttributeToWrapper;
    private updateHtmlAttributeToElement;
    private processPresets;
    protected bindEvents(): void;
    private updateHiddenInput;
    private inputChangeHandler;
    private bindClearEvent;
    protected resetHandler(e: MouseEvent): void;
    private restoreValue;
    protected formResetHandler(e: MouseEvent): void;
    private clear;
    private rangeIconHandler;
    private checkHtmlAttributes;
    private createPopup;
    private renderControl;
    private clearCalendarEvents;
    private updateNavIcons;
    private calendarIconEvent;
    private bindCalendarEvents;
    private calendarIconRipple;
    private deviceCalendarEvent;
    private deviceNavNext;
    private deviceNavPrevious;
    private updateDeviceCalendar;
    private deviceHeaderClick;
    private inputFocusHandler;
    private inputBlurHandler;
    private clearRange;
    private errorClass;
    private keyCalendarUpdate;
    private navInCalendar;
    private keyInputHandler;
    private keyNavigation;
    private inputHandler;
    private bindCalendarCellEvents;
    private removeFocusedDate;
    private hoverSelection;
    private isSameStartEnd;
    private updateRange;
    private checkMinMaxDays;
    private rangeArgs;
    private otherMonthSelect;
    private selectRange;
    private selectableDates;
    private updateMinMaxDays;
    private removeClassDisabled;
    private updateHeader;
    private removeSelection;
    private addSelectedAttributes;
    private removeSelectedAttributes;
    private updateCalendarElement;
    private navPrevMonth;
    private deviceNavigation;
    private updateControl;
    private navNextMonth;
    private compareMonths;
    private compareYears;
    private compareDecades;
    private isPopupOpen;
    protected createRangeHeader(): HTMLElement;
    private disableInput;
    private validateMinMax;
    private validateRangeStrict;
    private validateRange;
    private validateMinMaxDays;
    private renderCalendar;
    private isSameMonth;
    private isSameYear;
    private isSameDecade;
    private startMonthCurrentDate;
    private selectNextMonth;
    private selectNextYear;
    private selectNextDecade;
    private selectStartMonth;
    private createCalendar;
    private leftNavTitle;
    private calendarNavigation;
    private rightNavTitle;
    protected clickEventEmitter(e: MouseEvent): void;
    /**
     * Gets the current view of the Calendar.
     * @returns string
     * @private

     */
    currentView(): string;
    protected getCalendarView(view: string): CalendarView;
    protected navigatedEvent(e: MouseEvent): void;
    private createControl;
    private cancelFunction;
    private deviceHeaderUpdate;
    private applyFunction;
    private onMouseClick;
    private onMouseOver;
    private onMouseLeave;
    private setListSelection;
    private removeListSelection;
    private setValue;
    private applyPresetRange;
    private showPopup;
    private renderCustomPopup;
    private listRippleEffect;
    private createPresets;
    private wireListEvents;
    private unWireListEvents;
    private renderPopup;
    protected popupCloseHandler(e: KeyboardEventArgs): void;
    private calendarFocus;
    private presetHeight;
    private presetKeyActionHandler;
    private listMoveDown;
    private listMoveUp;
    private getHoverLI;
    private getActiveLI;
    private popupKeyBoardHandler;
    private setScrollPosition;
    private popupKeyActionHandle;
    private documentHandler;
    private createInput;
    private setEleWidth;
    private adjustLongHeaderWidth;
    private refreshControl;
    private updateInput;
    protected checkInvalidRange(value: String | DateRange | Date[]): void;
    private getstringvalue;
    private checkInvalidValue;
    private isDateDisabled;
    private disabledDateRender;
    private virtualRenderCellEvent;
    private disabledDates;
    private setModelValue;
    /**
     * To dispatch the event manually
     */
    protected dispatchEvent(element: HTMLElement, type: string): void;
    private changeTrigger;
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void

     */
    navigateTo(view: CalendarView, date: Date): void;
    private navigate;
    /**
     * Sets the focus to widget for interaction.
     * @returns void
     */
    focusIn(): void;
    /**
     * Remove the focus from widget, if the widget is in focus state.
     * @returns void
     */
    focusOut(): void;
    /**
     * To destroy the widget.
     * @returns void
     */
    destroy(): void;
    protected ensureInputAttribute(): void;
    /**
     * To get component name
     * @returns string
     * @private
     */
    protected getModuleName(): string;
    /**
     * Return the properties that are maintained upon browser refresh.
     * @returns string
     */
    getPersistData(): string;
    /**
     * Return the selected range and day span in the DateRangePicker.
     * @returns Object
     */
    getSelectedRange(): Object;
    /**
     * To open the Popup container in the DateRangePicker component.
     * @returns void
     */
    show(element?: HTMLElement, event?: MouseEvent | KeyboardEventArgs | Event): void;
    /**
     * To close the Popup container in the DateRangePicker component.
     * @returns void
     */
    hide(event?: KeyboardEventArgs | MouseEvent | Event): void;
    private setLocale;
    private refreshChange;
    private setDate;
    private enableInput;
    private clearModelvalue;
    private createHiddenInput;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    onPropertyChanged(newProp: DateRangePickerModel, oldProp: DateRangePickerModel): void;
}
