import { Search } from './search';
/**
 * Search Result info
 */
export declare class SearchResults {
    private searchModule;
    /**
     * Gets the length of search results.


     */
    readonly length: number;
    /**
     * Gets the index of current search result.


     */
    /**
    * Set the index of current search result.
    
    
    */
    index: number;
    /**
     * @private
     */
    constructor(search: Search);
    /**
     * Replace text in current search result.
     * @param textToReplace text to replace
     * @private
     */
    replace(textToReplace: string): void;
    /**
     * Replace all the instance of search result.
     * @param textToReplace text to replace
     */
    replaceAll(textToReplace: string): void;
    /**
     * @private
     */
    navigate(index: number): void;
    /**
     * Clears all the instance of search result.
     */
    clear(): void;
}
