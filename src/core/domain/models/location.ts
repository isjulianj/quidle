import {Extent} from "../../../lib/extent/Extent";


export type Location = {
    bounds: Extent;
    coords: number[];
    name: string;
    imageUrl?: string;
}

/**
 * Create a new Location
 * @param {Extent} bounds
 * @param {number[]} coords
 * @param {string} name
 */
export const createLocation = (bounds: Extent, coords: number[], name: string): Location => {
    return {
        bounds,
        coords,
        name
    }
}
