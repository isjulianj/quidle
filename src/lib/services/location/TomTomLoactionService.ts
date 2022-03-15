import tt from "@tomtom-international/web-sdk-services";
import SearchBox from "@tomtom-international/web-sdk-plugin-searchbox";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import {
    LocationSearchAdapterInterface, ResultsCleared,
    ResultsSelected
} from "./LocationSearchAdapterInterface";


const NO_RESULTS_MESSAGE = 'No results found.'

export type searchType = string[];

export const useTomTomLocationService = (searchType: searchType = [] ): LocationSearchAdapterInterface => {
    const API_KEY = 'enDW8HX6mL8UjAOeXWskWdiBlaAK3Fwa';

    const ttServices = tt.services;

    const searchOptions = {
        key: API_KEY,
        language: 'en-GB',
        limit: 5,
        minNumberOfCharacters: 3,
        idxSet: searchType.join(',')

    };

    // Options for the autocomplete service
    const autocompleteOptions = {
        key: API_KEY,
        language: 'en-GB',
        resultSet: 'location',
    };


    const searchBoxOptions = {
        minNumberOfCharacters: 3,
        searchOptions,
        autocompleteOptions,
        distanceFromPoint: [15.4, 53.0],
        labels: {
            noResultsMessage: NO_RESULTS_MESSAGE
        },


    };

    const ttSearchBox = new SearchBox(ttServices, searchBoxOptions);
    return {
        appendSearch(element) {
            element?.current?.appendChild(ttSearchBox.getSearchBoxHTML());

        },
        registerOnSelectedCallback(callback: ResultsSelected) {
            ttSearchBox.on('tomtom.searchbox.resultselected',  callback);
        },
        resultsCleared(callback: ResultsCleared) {
            ttSearchBox.on('tomtom.searchbox.resultscleared', callback)
        },
        removeSearch() {
            ttSearchBox.onRemove()
        }
    }
}
