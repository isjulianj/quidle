import { Meeting } from "./meeting";

export type User = {
    id: UniqueId;
    name: string;
    email: Email;
    meetings: Meeting[];
}

/**
 * Get aspecific meeting.
 * @param {User} user
 * @param {string} meetingId
 */
export const getMeeting = (user: User, meetingId: string): Meeting => {
    let find = user.meetings.find(meeting => meeting.id === meetingId);
    // TODO: nasty
    return find as Meeting
}

/**
 * Return all user Meetings
 * @param {User} user
 */
export const getMeetings = (user: User) => user.meetings;


export const createUser = (): User => {
    return {
        id: 1,
        name: 'Julian',
        email: 'isjulian@gmail.com',
        meetings: []
    }
}
