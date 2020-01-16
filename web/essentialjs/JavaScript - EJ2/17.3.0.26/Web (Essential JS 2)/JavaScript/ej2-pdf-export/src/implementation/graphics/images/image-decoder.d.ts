/**
 * ImageDecoder class
 */
import { ByteArray } from './byte-array';
import { PdfStream } from './../../primitives/pdf-stream';
/**
 * Specifies the image `format`.
 * @private
 */
export declare enum ImageFormat {
    /**
     * Specifies the type of `Unknown`.

     * @private
     */
    Unknown = 0,
    /**
     * Specifies the type of `Bmp`.

     * @private
     */
    Bmp = 1,
    /**
     * Specifies the type of `Emf`.

     * @private
     */
    Emf = 2,
    /**
     * Specifies the type of `Gif`.

     * @private
     */
    Gif = 3,
    /**
     * Specifies the type of `Jpeg`.

     * @private
     */
    Jpeg = 4,
    /**
     * Specifies the type of `Png`.

     * @private
     */
    Png = 5,
    /**
     * Specifies the type of `Wmf`.

     * @private
     */
    Wmf = 6,
    /**
     * Specifies the type of `Icon`.

     * @private
     */
    Icon = 7
}
/**
 * `Decode the image stream`.
 * @private
 */
export declare class ImageDecoder {
    /**
     * Number array for `png header`.

     * @private
     */
    private static mPngHeader;
    /**
     * Number Array for `jpeg header`.

     * @private
     */
    private static mJpegHeader;
    /**
     * Number array for `gif header`.

     * @private
     */
    private static GIF_HEADER;
    /**
     * Number array for `bmp header.`

     * @private
     */
    private static BMP_HEADER;
    /**
     * `memory stream` to store image data.

     * @private
     */
    private mStream;
    /**
     * Specifies `format` of image.

     * @private
     */
    private mFormat;
    /**
     * `Height` of image.

     * @private
     */
    private mHeight;
    /**
     * `Width` of image.

     * @private
     */
    private mWidth;
    /**
     * `Bits per component`.


     * @private
     */
    private mbitsPerComponent;
    /**
     * ByteArray to store `image data`.

     * @private
     */
    private mImageData;
    /**
     * Store an instance of `PdfStream` for an image.

     * @private
     */
    private imageStream;
    /**
     * Internal variable for accessing fields from `DictionryProperties` class.

     * @private
     */
    private dictionaryProperties;
    /**
     * Initialize the new instance for `image-decoder` class.
     * @private
     */
    constructor(stream: ByteArray);
    /**
     * Gets the `height` of image.

     * @private
     */
    readonly height: number;
    /**
     * Gets the `width` of image.

     * @private
     */
    readonly width: number;
    /**
     * Gets `bits per component`.

     * @private
     */
    readonly bitsPerComponent: number;
    /**
     * Gets the `size` of an image data.

     * @private
     */
    readonly size: number;
    /**
     * Gets the value of an `image data`.

     * @private
     */
    readonly imageData: ByteArray;
    /**
     * Gets the value of an `image data as number array`.

     * @private
     */
    readonly imageDataAsNumberArray: ArrayBuffer;
    /**
     * `Initialize` image data and image stream.

     * @private
     */
    private initialize;
    /**
     * `Reset` stream position into 0.

     * @private
     */
    private reset;
    /**
     * `Parse` Jpeg image.

     * @private
     */
    private parseJpegImage;
    /**
     * Gets the image `format`.
     * @private

     */
    readonly format: ImageFormat;
    /**
     * `Checks if JPG`.
     * @private

     */
    private checkIfJpeg;
    /**
     * Return image `dictionary`.

     * @private
     */
    getImageDictionary(): PdfStream;
    /**
     * Return `colorSpace` of an image.

     * @private
     */
    private getColorSpace;
    /**
     * Return `decode parameters` of an image.

     * @private
     */
    private getDecodeParams;
}
