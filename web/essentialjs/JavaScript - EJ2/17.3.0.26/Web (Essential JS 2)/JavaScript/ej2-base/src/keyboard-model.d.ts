import { Property, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';import { Base, EmitType } from './base';
import {KeyboardEventArgs} from "./keyboard";

/**
 * Interface for a class KeyboardEvents
 */
export interface KeyboardEventsModel {

    /**
     * Specifies key combination and it respective action name.

     */
    keyConfigs?: { [key: string]: string };

    /**
     * Specifies on which event keyboardEvents class should listen for key press. For ex., `keyup`, `keydown` or `keypress`

     */
    eventName?: string;

    /**
     * Specifies the listener when keyboard actions is performed. 
     * @event
     */
    keyAction?: EmitType<KeyboardEventArgs>;

}