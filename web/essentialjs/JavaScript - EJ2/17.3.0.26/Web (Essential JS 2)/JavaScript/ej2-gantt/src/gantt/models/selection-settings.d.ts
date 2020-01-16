import { ChildProperty } from '@syncfusion/ej2-base';
import { SelectionMode, CellSelectionMode, SelectionType } from '@syncfusion/ej2-grids';
/**
 * Configures the selection behavior of the Gantt.
 */
export declare class SelectionSettings extends ChildProperty<SelectionSettings> {
    /**
     * Gantt supports row, cell, and both (row and cell) selection mode.




     */
    mode: SelectionMode;
    /**
     * To define selection mode of cell.




     */
    cellSelectionMode: CellSelectionMode;
    /**
     * Defines options for selection type. They are
     * * `Single`: Allows selection of only a row or a cell.
     * * `Multiple`: Allows selection of multiple rows or cells.






     */
    type: SelectionType;
    /**
     * If 'persistSelection' set to true, then the Gantt selection is persisted on all operations.

     */
    persistSelection: boolean;
}
