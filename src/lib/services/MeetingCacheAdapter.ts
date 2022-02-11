import {Meeting} from "../../core/domain/models/meeting";
import {ICache} from "./ICache";


export const MEETINGS = 'MEETINGS'

export interface MeetingsCache {
    meetings: Meeting[],
    expires: DateTimeString,
}


export class MeetingsLocalCacheAdapter implements ICache {
    set(key = MEETINGS, meeting: Meeting): void {
        // get the existing data
        const existingMeetings = this.get(key);

        // set new data
        if (existingMeetings === null) {
            window.localStorage.setItem(key, JSON.stringify(this.createMeeting(meeting)))
        } else {

            // TODO: check fro expiration;
            // if(existingMeetings.expires !== undefined)
            // update existing data
            const meetings = existingMeetings.meetings;
            const meetingIndex = meetings.findIndex(item => item.id === meeting.id);

            if (meetingIndex === -1) {
                meetings.push(meeting)
            } else {
                // replace existing data
                meetings[meetingIndex] = meeting;
            }
            existingMeetings.expires = new Date().toISOString();
            window.localStorage.setItem(MEETINGS, JSON.stringify(existingMeetings))

        }
    }

    get(key = MEETINGS): MeetingsCache | null {
        const meetings = window.localStorage.getItem(key);

        if (meetings !== null) {
            return JSON.parse(meetings)
        }
        return null

    }

    remove(key = MEETINGS): void {
        window.localStorage.removeItem(key)
    }

    createMeeting(meeting: Meeting) {
        return {
            meetings: [meeting],
            expires: new Date().toISOString()
        }
    }

}
// const DUMMY_MEETINGS_DATA = {
//     meetings: [
//         {
//             id: '1',
//             name: 'meeting 3',
//             meetingStatus: 'planning',
//             createdDate: new Date().toISOString(),
//             modifiedDate: new Date().toISOString(),
//             centroid: 'Location',
//             user: {
//                 id: 1,
//                 name: 'Julian',
//                 email: 'isjulian@gmail.com',
//                 meetings: []
//             },
//             attendants: [{
//                 id: '1',
//                 name: 'test',
//                 isUser: false,
//                 location: 'nowhere'
//             }]
//         },
//         {
//             id: '2',
//             name: 'meeting 2',
//             meetingStatus: 'planning',
//             createdDate: new Date().toISOString(),
//             modifiedDate: new Date().toISOString(),
//             centroid: 'Location',
//             user: {
//                 id: 1,
//                 name: 'Julian',
//                 email: 'isjulian@gmail.com',
//                 meetings: []
//             },
//             attendants: [{
//                 id: '1',
//                 name: 'test',
//                 isUser: false,
//                 location: 'nowhere'
//             }],
//         }
//     ],
//     expires: new Date().toISOString()
// }
