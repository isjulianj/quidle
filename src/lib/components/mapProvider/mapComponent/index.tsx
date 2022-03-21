import React, {useEffect, useRef, } from 'react';

// Start Openlayers imports
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

import {useMapContext} from "../mapContext";
import {Box} from "@mui/material";
import {convertESPG4326To3857} from "../../../latLng-to-espg3857";

interface MapComponentProps {
    center: number[];
    zoom: number;
}

const MapComponent = ({center, zoom = 13}: MapComponentProps) => {
    const mapElement = useRef<HTMLElement | undefined | string>(undefined);
    const {mapControl, setMapControl} = useMapContext();

    useEffect(() => {

            const convertedCords = convertESPG4326To3857({longitude: center[0], latitude: center[1]})

            let options = {
                view: new View({zoom, center: convertedCords}),
                layers: [new TileLayer({
                    source: new OSM({
                        crossOrigin: "anonymous", // or "use-credentials", but not "none"
                    })
                })],
                controls: [],
                overlays: []
            };

            const newOlmap = new Map(options);
            newOlmap.setTarget(mapElement.current)
            setMapControl(newOlmap);



            return () => newOlmap.setTarget(undefined);
        },
        []
    )
    ;

    // zoom change handler
    useEffect(() => {
        if (!mapControl) return;

        mapControl.getView().setZoom(zoom);
    }, [zoom]);

    // center change handler
    useEffect(() => {
        if (!mapControl) return;

        mapControl.getView().setCenter(center)
    }, [center])

    // Map, tile and feature layer set up

    return (
        <Box ref={mapElement} className="mapDiv" id="map" style={{height: '500px'}}>

        </Box>
    )

}

export default MapComponent
