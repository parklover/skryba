/**
 * Dictionary.ts class for EJ2-PDF
 * @private

 */
import { defaultToString } from './utils';
/**
 * @private

 */
var Dictionary = /** @class */ (function () {
    /**
     * @private

     */
    function Dictionary(toStringFunction) {
        this.table = {};
        this.nElements = 0;
        this.toStr = toStringFunction || defaultToString;
    }
    /**
     * @private

     */
    Dictionary.prototype.getValue = function (key) {
        var pair = this.table['$' + this.toStr(key)];
        if (typeof pair === 'undefined') {
            return undefined;
        }
        return pair.value;
    };
    /**
     * @private

     */
    Dictionary.prototype.setValue = function (key, value) {
        // if (typeof key === 'undefined' || typeof value === 'undefined') {
        //     return undefined;
        // }
        var ret;
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        // if (typeof previousElement === 'undefined') {
        this.nElements++;
        ret = undefined;
        // }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    };
    /**
     * @private

     */
    Dictionary.prototype.remove = function (key) {
        var k = '$' + this.toStr(key);
        var previousElement = this.table[k];
        // if (typeof previousElement !== 'undefined') {
        delete this.table[k];
        this.nElements--;
        return previousElement.value;
        // }
        // return undefined;
    };
    /**
     * @private

     */
    Dictionary.prototype.keys = function () {
        var keysArray = [];
        var namesOfKeys = Object.keys(this.table);
        for (var index1 = 0; index1 < namesOfKeys.length; index1++) {
            // if (Object.prototype.hasOwnProperty.call(this.table, namesOfKeys[index1])) {
            var pair1 = this.table[namesOfKeys[index1]];
            keysArray.push(pair1.key);
            // }
        }
        return keysArray;
    };
    /**
     * @private

     */
    Dictionary.prototype.values = function () {
        var valuesArray = [];
        var namesOfValues = Object.keys(this.table);
        for (var index2 = 0; index2 < namesOfValues.length; index2++) {
            // if (Object.prototype.hasOwnProperty.call(this.table, namesOfValues[index2])) {
            var pair2 = this.table[namesOfValues[index2]];
            valuesArray.push(pair2.value);
            // }
        }
        return valuesArray;
    };
    /**
     * @private

     */
    Dictionary.prototype.containsKey = function (key) {
        var retutnValue = true;
        if (typeof this.getValue(key) === 'undefined') {
            retutnValue = true;
        }
        else {
            retutnValue = false;
        }
        return !retutnValue;
    };
    /**
     * @private

     */
    Dictionary.prototype.clear = function () {
        this.table = {};
        this.nElements = 0;
    };
    /**
     * @private

     */
    Dictionary.prototype.size = function () {
        return this.nElements;
    };
    return Dictionary;
}()); // End of dictionary
export { Dictionary };
