import {User} from "../../../core/domain/models/user";
import {Location} from "../../../core/domain/models/location";
import {Attendant, createAttendant} from "../../../core/domain/models/attendant";

interface CreateAttendantInterface {
    name: string;
    location:  Location;
    user?: User;
    meetingId: string;

}

export function useBuildAttendant() {
    function buildAttendant(attendantData: CreateAttendantInterface): Attendant {

        const id = Math.random() * 10

        return createAttendant(id, attendantData.name,  attendantData.meetingId, attendantData.location)

    }

    return {buildAttendant}
}
