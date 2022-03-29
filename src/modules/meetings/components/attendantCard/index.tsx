import React from 'react'
import {Attendant} from "../../../../core/domain/models/attendant";
import {Avatar, Box, Text} from '../../../../lib/ui-components';
import {IconButton} from "@mui/material";
import {cyan} from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";

interface AttendantCardProps {
    attendant: Attendant;
    action: (attendant: Attendant) => void
}


export const AttendantCard = ({attendant, action}: AttendantCardProps) => {

    const editAttendant = () => {
        debugger;
        action(attendant)
    }
    return (
        <Box sx={{
            backgroundColor: theme => theme.palette.background.paper,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            p: 2,
            mb: 2
        }}>
            <Avatar sx={{bgcolor: cyan[200]}} aria-label="attendant-card">
                {attendant.name[0]}
            </Avatar>
            <Box sx={{marginLeft: 2}}>
                <Text variant={"body1"} color='primary.main'>{attendant.name}</Text>
                <Text variant={"body2"} color='text.disabled'>{attendant.location.name}</Text>
            </Box>
            <Box sx={{
                marginLeft: "auto"
            }}>
                <IconButton onMouseDown={editAttendant} aria-label="edit">
                    <EditIcon/>
                </IconButton>
            </Box>


        </Box>
    );
};
