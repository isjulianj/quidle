import React from 'react';
import CardActionArea from "@mui/material/CardActionArea";
import {Card, CardContent, IconButton} from "@mui/material";
import {Box, Text} from "../../../../lib/ui-components";
import {NavLink, NavLinkProps, useLocation} from "react-router-dom";
import {Meeting} from "../../../../core/domain/models/meeting";
import DeleteIcon from '@mui/icons-material/Delete';

interface MeetingCardProps {
    meeting: Meeting;
    onClick?: () => void;
}

export const MeetingCard = ({meeting}: MeetingCardProps) => {
    return (
        <Box key={meeting.id}>
            <QueryNavLink
                key={meeting.id}
                style={({isActive}) => {
                    return {
                        display: 'block',
                        marginTop: '10px',
                        marginBottom: '10px',
                        color: isActive ? 'red' : '',
                    };
                }}
                to={`/meetings/${meeting.id}`}
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
                            <Box display='flex'>
                                <Text variant="subtitle1" paragraph>Created by:</Text> &nbsp;
                                <Text variant="subtitle1" paragraph>{meeting.user.name}</Text>
                            </Box>
                        </CardContent>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
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
    );
};

function QueryNavLink({to, ...props}: NavLinkProps) {
    let location = useLocation();
    return <NavLink to={to + location.search}  {...props} />;
}
