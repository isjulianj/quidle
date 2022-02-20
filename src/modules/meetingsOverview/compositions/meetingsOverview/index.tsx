import React, {ReactNode, useEffect, useState} from 'react';
import {Box, Button, Text} from '../../../../lib/ui-components';
import {ICache} from "../../../../lib/services/ICache";
import {MEETINGS} from "../../../../lib/services/MeetingCacheAdapter";
import {Meeting} from "../../../../core/domain/models/meeting";
import {Card, CardContent} from "@mui/material";
import CardActionArea from '@mui/material/CardActionArea';
import { NavLink, useLocation} from "react-router-dom";


interface MeetingsProps {
    meetingsCacheProvider: ICache
    children?: ReactNode
}

export const MeetingsOverview = ({meetingsCacheProvider}: MeetingsProps) => {

    const [meetings, setMeetings] = useState<Meeting[]>([]);


    // on load get the meetingsOverview
    useEffect(() => {
        const savedMeetings = meetingsCacheProvider.get(MEETINGS);

        if (savedMeetings === null) {
            return
        }

        setMeetings(savedMeetings.meetings)

    }, [meetingsCacheProvider])


    return (
        <Box display='flex' flexDirection={'column'} width='100%' padding={1}>
            <Text variant='h4'>Meetings</Text>

            {meetings && meetings.map((meeting) => (
                <Box key={meeting.id} padding={1}>
                    <QueryNavLink
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/${meeting.id}`}
                        key={meeting.id}
                        state={{ meetingId: meeting.id}}
                    >
                    <CardActionArea component="a" href="#">
                        <Card sx={{display: 'flex'}}>
                            <CardContent sx={{flex: 1}}>
                                <Text component="h2" variant="h5">
                                    {meeting.name}
                                </Text>
                                <Text variant="body2" color="text.secondary">
                                    {meeting.createdDate}
                                </Text>
                                <Box  display='flex' >
                                    <Text variant="subtitle1" paragraph>Created by:</Text> &nbsp;
                                    <Text variant="subtitle1" paragraph>{meeting.user.name}</Text>
                                </Box>
                            </CardContent>
                            {/*<CardMedia*/}
                            {/*    component="img"*/}
                            {/*    sx={{width: 160, display: {xs: 'none', sm: 'block'}}}*/}
                            {/*    image={meeting.image}*/}
                            {/*    alt={post.imageLabel}*/}
                            {/*/>*/}
                        </Card>
                    </CardActionArea>
                    </QueryNavLink>
                </Box>
            ))
            }
            <Button sx={{width: '100%'}} variant="contained" onClick={() => console.log('hello')}>Create meeting</Button>
        </Box>
    );
};

function QueryNavLink({ to, state, ...props }: any) {
    let location = useLocation();
    return <NavLink to={to + location.search} state={state} {...props} >{props.children}</NavLink>;
}
