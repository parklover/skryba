import { ComplexBase } from '@syncfusion/ej2-react-base';
import { TabItemModel } from '@syncfusion/ej2-navigations';
export interface TabItemDirTypecast {
    content?: string | Function | any;
    headerText?: string | Function | any;
    headerTemplate?: string | Function | any;
}
/**
 * `TabItemDirective` directive represent a column of the react Tab.
 * It must be contained in a Tab component(`Tab`).
 * ```ts
 * <TabComponent
 *  <TabItemsDirective>
 *   <TabItemDirective header= { 'Header 1' } content= { 'Content 1' } />
 *   <TabItemDirective header= { 'Header 2' } content= { 'Content 2' } />
 *  <TabItemsDirective>
 * </TabComponent>
 * ```
 */
export declare class TabItemDirective extends ComplexBase<TabItemModel | TabItemDirTypecast, TabItemModel | TabItemDirTypecast> {
    static moduleName: string;
    static complexTemplate: Object;
}
export declare class TabItemsDirective extends ComplexBase<{}, {}> {
    static propertyName: string;
    static moduleName: string;
}
