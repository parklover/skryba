/**
 * Search Result info
 */
var SearchResults = /** @class */ (function () {
    /**
     * @private
     */
    function SearchResults(search) {
        this.searchModule = search;
    }
    Object.defineProperty(SearchResults.prototype, "length", {
        /**
         * Gets the length of search results.
    
    
         */
        get: function () {
            return this.searchModule.textSearchResults.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "index", {
        /**
         * Gets the index of current search result.
    
    
         */
        get: function () {
            return this.searchModule.textSearchResults.currentIndex;
        },
        /**
         * Set the index of current search result.
    
    
         */
        set: function (value) {
            if (this.length === 0 || value < 0 || value > this.searchModule.textSearchResults.length - 1) {
                return;
            }
            this.searchModule.textSearchResults.currentIndex = value;
            this.navigate(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Replace text in current search result.
     * @param textToReplace text to replace
     * @private
     */
    SearchResults.prototype.replace = function (textToReplace) {
        if (this.index === -1) {
            return;
        }
        this.searchModule.replaceInternal(textToReplace);
    };
    /**
     * Replace all the instance of search result.
     * @param textToReplace text to replace
     */
    SearchResults.prototype.replaceAll = function (textToReplace) {
        if (this.index === -1) {
            return;
        }
        this.searchModule.replaceAllInternal(textToReplace);
    };
    /**
     * @private
     */
    SearchResults.prototype.navigate = function (index) {
        this.searchModule.navigate(this.searchModule.textSearchResults.currentSearchResult);
        this.searchModule.highlight(this.searchModule.textSearchResults);
    };
    /**
     * Clears all the instance of search result.
     */
    SearchResults.prototype.clear = function () {
        this.searchModule.textSearchResults.clearResults();
        this.searchModule.clearSearchHighlight();
        this.searchModule.viewer.renderVisiblePages();
    };
    return SearchResults;
}());
export { SearchResults };
