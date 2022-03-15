
import {Extent} from "../../extent/Extent";
import {createLocation, Location} from "../../../core/domain/models/location";

interface CreateLocationInterface {
    extent: Extent;
    coords: number[];
    locationName:  string

}

export const useBuildLocation = () => {
    function buildLocation(locationData: CreateLocationInterface): Location {
        const extent = locationData.extent;

        if (extent.isValid()) {
            return createLocation(locationData.extent, locationData.coords, locationData.locationName)
        }
        return createLocation(new Extent(), locationData.coords, locationData.locationName)


    }

    return {buildLocation}
}
