import React, {ReactNode, useEffect, useState} from 'react';
import {Box, Button, Text} from '../../../../lib/ui-components';
import {ICache} from "../../../../lib/services/ICache";
import {MEETINGS} from "../../../../lib/services/MeetingCacheAdapter";
import {Meeting} from "../../../../core/domain/models/meeting";


interface MeetingsProps {
    meetingsCacheProvider: ICache
    children?: ReactNode
}

export const Meetings = ({meetingsCacheProvider}: MeetingsProps) => {

    const [meetings, setMeetings] = useState<Meeting[]>([]);


    // on load get the meetings
    useEffect(() => {
        const savedMeetings = meetingsCacheProvider.get(MEETINGS);

        if (savedMeetings === null) {
            return
        }

        setMeetings(savedMeetings.meetings)

    }, [])


    return (
        <Box display='flex'  width='100%' padding={1}>

            {meetings && meetings.map((meeting) => (
                <Box key={meeting.id}><Text>{meeting.name}</Text></Box>

            ))
            }
            <Button sx={{width: '100%'}} variant="outlined" onClick={() => console.log('hello')}>Create meeting</Button>
        </Box>
    );
};
