import { Property, ChildProperty } from '@syncfusion/ej2-base';import { EditMode, RowPosition  } from '../base/enum';

/**
 * Interface for a class EditSettings
 */
export interface EditSettingsModel {

    /**
     * If `allowEditing` is set to true, values can be updated in the existing record.

     */
    allowEditing?: boolean;

    /**
     * If `allowAdding` is set to true, new records can be added to the Gantt.  

     */
    allowAdding?: boolean;

    /**
     * If `allowDeleting` is set to true, existing record can be deleted from the Gantt.

     */
    allowDeleting?: boolean;

    /**
     * Defines edit mode in Gantt.
     * * `Auto` - Defines cell edit mode in grid side and dialog mode in chart side.
     * * `Dialog` - Defines dialog edit mode on both sides.


     */
    mode?: EditMode;

    /**
     * Defines the row position for new records. The available row positions are:
     * * Top
     * * Bottom
     * * Above
     * * Below
     * * Child

     */
    newRowPosition?: RowPosition;

    /**
     * If `showDeleteConfirmDialog` is set to true, confirm dialog will show delete action. You can also cancel delete command.

     */
    showDeleteConfirmDialog?: boolean;

    /**
     * Enabled or disables taskbar resizing, taskbar dragging, progress bar resizing and 
     * predecessor draw action in chart side.

     */
    allowTaskbarEditing?: boolean;

}