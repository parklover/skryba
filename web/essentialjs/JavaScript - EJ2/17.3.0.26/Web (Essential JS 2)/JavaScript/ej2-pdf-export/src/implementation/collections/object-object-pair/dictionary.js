/**
 * Dictionary class
 * @private

 */
var TemporaryDictionary = /** @class */ (function () {
    function TemporaryDictionary() {
        /**
    
         * @private
         */
        this.mKeys = [];
        /**
    
         * @private
         */
        this.mValues = [];
    }
    /**

     * @private
     */
    TemporaryDictionary.prototype.size = function () {
        return this.mKeys.length;
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.add = function (key, value) {
        if (key === undefined || key === null || value === undefined || value === null) {
            throw new ReferenceError('Provided key or value is not valid.');
        }
        var index = this.mKeys.indexOf(key);
        if (index < 0) {
            this.mKeys.push(key);
            this.mValues.push(value);
            return 1;
        }
        else {
            throw new RangeError('An item with the same key has already been added.');
        }
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.keys = function () {
        return this.mKeys;
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.values = function () {
        return this.mValues;
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.getValue = function (key) {
        if (key === undefined || key === null) {
            throw new ReferenceError('Provided key is not valid.');
        }
        var index = this.mKeys.indexOf(key);
        if (index < 0) {
            throw new RangeError('No item with the specified key has been added.');
        }
        else {
            return this.mValues[index];
        }
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.setValue = function (key, value) {
        if (key === undefined || key === null) {
            throw new ReferenceError('Provided key is not valid.');
        }
        var index = this.mKeys.indexOf(key);
        if (index < 0) {
            this.mKeys.push(key);
            this.mValues.push(value);
        }
        else {
            this.mValues[index] = value;
        }
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.remove = function (key) {
        if (key === undefined || key === null) {
            throw new ReferenceError('Provided key is not valid.');
        }
        var index = this.mKeys.indexOf(key);
        if (index < 0) {
            throw new RangeError('No item with the specified key has been added.');
        }
        else {
            this.mKeys.splice(index, 1);
            this.mValues.splice(index, 1);
            return true;
        }
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.containsKey = function (key) {
        if (key === undefined || key === null) {
            throw new ReferenceError('Provided key is not valid.');
        }
        var index = this.mKeys.indexOf(key);
        if (index < 0) {
            return false;
        }
        return true;
    };
    /**

     * @private
     */
    TemporaryDictionary.prototype.clear = function () {
        this.mKeys = [];
        this.mValues = [];
    };
    return TemporaryDictionary;
}());
export { TemporaryDictionary };
