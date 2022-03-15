import React, {ChangeEvent, useState} from 'react';
import {Input, InputLabel, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {InputWrapper} from "../../../../lib/ui-components";
import enLocale from 'date-fns/locale/en-GB';
import {Meeting} from "../../../../core/domain/models/meeting";



const ariaLabel = {'aria-label': 'description'};

interface MeetingFormProps {
    meeting?: Meeting;
}

export const MeetingForm = ({meeting}: MeetingFormProps) => {

    const [meetingName, setMeetingName] = useState<string | undefined>(meeting?.name || undefined);
    const [startDate, setStartDate] = useState<Date>(meeting ? new Date(meeting.createdDate) : new Date());
    // const [centroid, setCentroid] = useState<Location | undefined>(meeting?.centroid || undefined);
    // const [attendants, setAttendants] = useState<Attendant[] | undefined>(meeting?.attendants || undefined);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const inputName = event.target.name;

        switch (inputName) {
            case 'meeting-name':
                setMeetingName(event.target.value)
                break;
            case 'start-date':
                setMeetingName(event.target.value)
                break;
            default:
                return
        }

    }


    return (
        <>
            <InputWrapper fullWidth variant="standard">
                <InputLabel htmlFor="meeting-name">Meeting Name?</InputLabel>
                <Input id="meeting-name" name='meeting-name' inputProps={ariaLabel} value={meetingName}
                       onChange={handleChange}/>
            </InputWrapper>
            <InputWrapper fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
                    <DatePicker
                        renderInput={(props) => (<> <TextField variant="standard" {...props} /></>)}
                        label="Start date"
                        value={startDate}
                        onChange={(newValue) => {
                            if (newValue) {
                                setStartDate(newValue);
                            }
                            return
                        }}/>
                </LocalizationProvider>
            </InputWrapper>
        </>
    );
};
