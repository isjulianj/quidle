import {Meeting} from "../../../../core/domain/models/meeting";
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

            // TODO: check for expiration;
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

    setTestData(key = MEETINGS) {
        // get the existing data
        const existingMeetings = this.get(key);

        // set new data
        if (existingMeetings === null) {
            window.localStorage.setItem(key, JSON.stringify(DUMMY_MEETINGS_DATA));
        }
    }

}

const DUMMY_MEETINGS_DATA = {
    meetings: [
        {
            id: '1',
            name: 'meeting 3',
            meetingStatus: 'planning',
            createdDate: new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
            centroid: 'Location',
            user: {
                id: '1',
                name: 'Julian',
                email: 'isjulian@gmail.com',
                meetings: []
            },
            attendants: [{
                "id": 0.44789741912253156,
                "name": "Jules",
                "location": {
                    "bounds": {
                        "minX": 41.65587,
                        "minY": 12.23443,
                        "maxX": 42.14096,
                        "maxY": 12.85586
                    },
                    "coords": [
                        12.49427,
                        41.89056
                    ],
                    "name": "Rome"
                },
                "meetingId": "2",
                "isUser": false,
                "user": {
                    "email": "Test@email.com"
                }
            }
            ]
        },
        {
            id: '2',
            name: 'meeting 2',
            meetingStatus: 'planning',
            createdDate: new Date().toISOString(),
            modifiedDate: new Date().toISOString(),
            centroid: 'Location',
            user: {
                id: '1',
                name: 'Julian',
                email: 'isjulian@gmail.com',
                meetings: []
            },
            attendants: [{
                "id": 0.44789741912253156,
                "name": "Jules",
                "location": {
                    "bounds": {
                        "minX": 41.65587,
                        "minY": 12.23443,
                        "maxX": 42.14096,
                        "maxY": 12.85586
                    },
                    "coords": [
                        12.49427,
                        41.89056
                    ],
                    "name": "Rome"
                },
                "meetingId": "2",
                "isUser": false,
                "user": {
                    "email": "Test@email.com"
                }
            }],
        }
    ],
    expires: new Date().toISOString()
}
