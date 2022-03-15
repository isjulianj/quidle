import {RefObject} from "react";
import {SearchBoxEvent} from "@tomtom-international/web-sdk-plugin-searchbox";

export type elementRef = RefObject<HTMLDivElement>;
export type ResultsSelected =  SearchBoxEvent['tomtom.searchbox.resultselected'];
export type ResultsSelectedEvent = ReturnType<ResultsSelected>;
export type ResultsCleared = SearchBoxEvent['tomtom.searchbox.resultscleared'];


export interface LocationSearchAdapterInterface {
    appendSearch: (element: elementRef) => void;
    removeSearch: () => void;
    registerOnSelectedCallback?: (event: ResultsSelected) => void;
    resultsCleared?: (event: ResultsCleared) => void;
}
