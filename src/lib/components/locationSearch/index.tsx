import React, {useEffect, useRef} from 'react';
import {useTomTomLocationService} from "../../services/location/TomTomLoactionService";
import {Box} from '../../ui-components';
import {
    ResultsCleared,
    ResultsSelected
} from "../../services/location/LocationSearchAdapterInterface";


interface LocationSearchInputProps {
    onSearchCleared: ResultsCleared
    onSelected: ResultsSelected
}

export const LocationSearchInput = ({onSearchCleared, onSelected}: LocationSearchInputProps) => {
    const searchContainer = useRef<HTMLDivElement | null>(null);


    // services
    // TODO: create factory to handle search types.
    // currently only searching Geography types
    const {appendSearch, registerOnSelectedCallback, removeSearch, resultsCleared} = useTomTomLocationService(['Geo'])


    // When map is mounted properly
    // set up the search service
    useEffect(() => {

        if (!searchContainer.current) {
            return
        }
        appendSearch(searchContainer)

        if (registerOnSelectedCallback) {
            registerOnSelectedCallback(onSelected);
        }

        if (resultsCleared) {
            resultsCleared(onSearchCleared)
        }


        return () => removeSearch();
    }, [])

    return (
        <Box>
            <div className="search-container">
                <div ref={searchContainer} style={{marginBottom: '1rem'}}/>
            </div>
        </Box>
    );
};
