/**
 * @private

 */
export interface IDictionaryPair<K, V> {
    key: K;
    value: V;
}
/**
 * @private

 */
export declare class Dictionary<K, V> {
    /**
     * @private

     */
    protected table: {
        [key: string]: IDictionaryPair<K, V>;
    };
    /**
     * @private

     */
    protected nElements: number;
    /**
     * @private

     */
    protected toStr: (key: K) => string;
    /**
     * @private

     */
    constructor(toStringFunction?: (key: K) => string);
    /**
     * @private

     */
    getValue(key: K): V;
    /**
     * @private

     */
    setValue(key: K, value: V): V;
    /**
     * @private

     */
    remove(key: K): V;
    /**
     * @private

     */
    keys(): K[];
    /**
     * @private

     */
    values(): V[];
    /**
     * @private

     */
    containsKey(key: K): boolean;
    /**
     * @private

     */
    clear(): void;
    /**
     * @private

     */
    size(): number;
}
