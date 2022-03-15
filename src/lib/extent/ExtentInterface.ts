import {Extent as olExtent} from "ol/extent";

export type ExtentArray = {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number
}

export interface ExtentInterface {
    isValid: () => boolean;
    increaseExtent: (addExtend: ExtentArray) => void;
    getCenter: () => number[];
    getMinCoords: () => number[];
    getMaxCoords: () => number[];
}

export interface OLExtentInterface extends ExtentInterface{
    asOlExtent: () => olExtent
    setFromOlExtent: (olExtent: olExtent) => void
}

export interface BingExtentInterface extends ExtentInterface{
    asBingExtent: () => olExtent
    setFromBingBounds: (bingBounds: number[]) => void
}

export interface TomTomExtentInterface extends ExtentInterface{
    asTomTomExtent: () => olExtent
    setFromTomTomBounds: (bingBounds: number[]) => void
}



