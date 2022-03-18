import {fromLonLat} from "ol/proj";

export const convertESPG4326To3857= (coords: { longitude: number,  latitude: number}): number[] => {
    return fromLonLat(
        [coords.longitude, coords.latitude],
        "EPSG:3857"
    );

}