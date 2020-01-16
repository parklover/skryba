/**
 * ByteArray class
 * Used to keep information about image stream as byte array.
 * @private
 */
export declare class ByteArray {
    /**
     * Current stream `position`.

     * @private
     */
    private mPosition;
    /**
     * Uint8Array for returing `buffer`.

     * @private
     */
    private buffer;
    /**
     * Specifies the `data view`.

     * @private
     */
    private dataView;
    /**
     * Initialize the new instance for `byte-array` class

     * @private
     */
    constructor(length: number);
    /**
     * Gets and Sets a current `position` of byte array.

     * @private
     */
    position: number;
    /**
     * `Read` from current stream position.


     * @private
     */
    read(buffer: ByteArray, offset: number, count: number): void;
    /**

     */
    getBuffer(index: number): number;
    /**

     */
    writeFromBase64String(base64: string): void;
    /**

     */
    encodedString(input: string): Uint8Array;
    /**

     */
    readByte(offset: number): number;
    /**

     */
    readonly internalBuffer: Uint8Array;
    /**

     */
    readonly count: number;
}
