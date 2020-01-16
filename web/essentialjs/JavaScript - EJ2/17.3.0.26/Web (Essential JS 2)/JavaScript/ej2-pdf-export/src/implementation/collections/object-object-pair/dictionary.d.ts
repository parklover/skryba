/**
 * Dictionary class
 * @private

 */
export declare class TemporaryDictionary<K, V> {
    /**

     * @private
     */
    private mKeys;
    /**

     * @private
     */
    private mValues;
    /**

     * @private
     */
    size(): number;
    /**

     * @private
     */
    add(key: K, value: V): number;
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
    getValue(key: K): V;
    /**

     * @private
     */
    setValue(key: K, value: V): void;
    /**

     * @private
     */
    remove(key: K): boolean;
    /**

     * @private
     */
    containsKey(key: K): boolean;
    /**

     * @private
     */
    clear(): void;
}
