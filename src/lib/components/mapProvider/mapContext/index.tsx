import React, {createContext, ReactNode, useState} from 'react';

// Start Openlayers imports
import {Map} from "ol";
import VectorImageLayer from "ol/layer/VectorImage";


interface IMapContext {
    mapControl: Map | null;
    setMapControl: (map: Map) => void | null;
    vectorImageLayer: VectorImageLayer<any> | null;
    setVectorImageLayer: (olVectorImageLayer: VectorImageLayer<any>) => void | null;
}

interface MapProviderProps {
    children?: ReactNode
}

// @ts-ignore
const MapContext = createContext<IMapContext>({mapControl: null, setMapControl: null, vectorImageLayer: null, setVectorImageLayer: null});

export const MapProvider = ({children}: MapProviderProps) => {

    const [mapControl, setMapControl] = useState<Map | null>(null);
    const [vectorImageLayer, setVectorImageLayer] = useState<VectorImageLayer<any> | null>(null)



    const value = {
        mapControl,
        setMapControl,
        vectorImageLayer: vectorImageLayer,
        setVectorImageLayer: setVectorImageLayer
    }


    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    )

}

export const useMapContext = () => React.useContext(MapContext);
