import React, {ReactNode, useContext, useEffect} from 'react';
import {Box, Button, Text} from '../../../../lib/ui-components';
import {ICache} from "../../../../lib/services/ICache";
import {MEETINGS} from "../../../../lib/services/MeetingCacheAdapter";
import {useNavigate, useParams} from "react-router-dom";
import {CacheContext} from "../../../../context/cache";
import {MeetingCard} from "../../components/meetingCard/MeetingCard";
import {useMeetingStore} from "../../store";


interface MeetingsProps {
    meetingsCacheProvider?: ICache
    children?: ReactNode
}

export const MeetingsOverview = ({}: MeetingsProps) => {

    const cache = useContext(CacheContext);

    const {meetings, addMeetings} = useMeetingStore();
    let navigate = useNavigate();


    // on load get the meetings
    useEffect(() => {
        const savedMeetings = cache?.get(MEETINGS);

        if (savedMeetings === null) {
            return
        }

        addMeetings(savedMeetings.meetings);

    }, [cache])


    return (
        <Box display='flex' flexDirection={'column'} width='100%' padding={1}>
            <Text variant='h4' component='h1'>Meetings</Text>

            {meetings && meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting}/>
            ))
            }
            <Button sx={{width: '100%'}} variant="contained" onClick={() =>navigate('/meetings/new')}>Create
                meeting</Button>
        </Box>
    );
};


