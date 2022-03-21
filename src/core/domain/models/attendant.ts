import {User} from "./user";
import {Location} from "./location";

export type Attendant = {
    id: UniqueId;
    name: string;
    location: Location;
    meetingId: string;
    isUser: boolean;
    user?: User;
}

export interface IAttendantUpdateProperties {
    name: string;
    locationName: string;
    email: string;
}

/**
 * Get the location of attendant in a meeting
 * @param {Attendant} attendant
 */
export const getAttendantLocation = (attendant: Attendant) => {
    return attendant.location;
}


export const updateAttendant = (attendant: Attendant, updatedAttendant: IAttendantUpdateProperties) => {
    return {
        ...attendant,
        name: updatedAttendant.name,
        location: {...attendant.location, name: updatedAttendant.locationName},
        user: {...attendant.user, email: updatedAttendant.email}
    }
}

export const createAttendant = (id: number, name: string = "", meetingId: string, location: Location, user: User = {} as User): Attendant => {
    return {
        id,
        name,
        location,
        meetingId,
        isUser: false,
        user
    }
}
