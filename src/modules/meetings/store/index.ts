import create from 'zustand';
import {Meeting} from "../../../core/domain/models/meeting";
import {Attendant} from "../../../core/domain/models/attendant";
import {Extent} from "../../../lib/extent/Extent";

interface IMeetingsState {
    meetings: Meeting[];
    addMeeting: (meeting: Meeting) => void;
    addMeetings: (meetings: Meeting[]) => void;
    removeMeeting: (id: string) => void;
    updateMeeting: (meeting: Meeting) => void;
    addAttendant: (meetingId: string, attendant: Attendant) => void;
    updateSingleAttendant: (attendant: Attendant) => void;
}


const useStore = create<IMeetingsState>(set => ({
    meetings: [],
    addMeetings: (meetings: Meeting[]) => {
        set((state) => ({
            meetings: meetings
        }))
    },
    addMeeting: (meeting: Meeting) =>
        set((state) => ({
            meetings: [
                {
                    id: meeting.id,
                    name: meeting.name,
                    meetingStatus: 'planning',
                    createdDate: meeting.createdDate,
                    modifiedDate: meeting.modifiedDate,
                    centroid: {
                        bounds: {} as Extent,
                        coords: [3, 3, 3, 3],
                        name: 'name',
                        imageUrl: 'string',
                    },
                    user: {
                        id: 1,
                        name: 'Julian',
                        email: 'isjulian@gmail.com',
                        meetings: []
                    },
                    attendants: [{
                        id: '1',
                        name: 'test',
                        isUser: false,
                        meetingId: meeting.id,
                        location: {
                            bounds: {} as Extent,
                            coords: [3, 3, 3, 3],
                            name: 'name',
                            imageUrl: 'string',
                        },
                    }]
                },
                ...state.meetings
            ]
        })),
    removeMeeting: (id: string) =>
        set((state) => ({
            meetings: state.meetings.filter((meeting: Meeting) => meeting.id !== id)
        })),
    updateMeeting: (meeting: Meeting) =>
        set((state) => ({
            meetings: state.meetings.map((item: Meeting) => {
                if (item.id === meeting.id) {
                    return {
                        ...item,
                        name: meeting.name,
                        user: meeting.user,
                        modifiedDate: new Date().toISOString(),
                    };
                } else {
                    return item;
                }
            })
        })),
    addAttendant: (meetingId: string, attendant: Attendant) =>
        set((state) => ({
            meetings: state.meetings.map((item: Meeting) => {
                if (item.id === meetingId) {
                    return {
                        ...item,
                        attendants: [...item.attendants, attendant]
                    };
                } else {
                    return item;
                }
            })
        })),
    updateSingleAttendant: (attendant: Attendant) =>
        set((state) => ({
            meetings: state.meetings.map((item: Meeting) => {
                if (item.id === attendant.meetingId) {
                    item.attendants.map(a => {
                        if (a.id === attendant.id) {
                            return {
                                ...a,
                                name: attendant.name,
                                user: {...a.user, email: attendant.user?.email},
                                location: {...a.location, name: attendant.location?.name},
                            }
                        }
                    })

                }
                return item;

            })
        })),

}));

export const useMeetingStore = useStore;
