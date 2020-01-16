import { MultiSelect as EJ2MultiSelect } from '@syncfusion/ej2-dropdowns';
import { InPlaceEditor } from '../base/inplace-editor';
import { NotifyParams, IComponent } from '../base/interface';
/**
 * The `MultiSelect` module is used configure the properties of Multi select type editor.
 */
export declare class MultiSelect implements IComponent {
    private base;
    protected parent: InPlaceEditor;
    compObj: EJ2MultiSelect;
    constructor(parent?: InPlaceEditor);
    render(e: NotifyParams): void;
    /**

     */
    showPopup(): void;
    focus(): void;
    updateValue(e: NotifyParams): void;
    getRenderValue(): void;
    /**
     * Destroys the module.
     * @method destroy
     * @return {void}

     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     */
    private getModuleName;
}
