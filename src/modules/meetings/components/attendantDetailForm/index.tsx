import React, {ChangeEvent, useState} from 'react';
import {Attendant, updateAttendant} from "../../../../core/domain/models/attendant";
import {InputWrapper} from "../../../../lib/ui-components";
import {Box, Button, Input, InputLabel} from "@mui/material";


const ariaLabel = {'aria-label': 'description'};

interface AttendantDetailFormProps {
    attendant: Attendant;
    setAttendant?: any;
    handleSave: (meetingId: string, updatedAttendant: Attendant) => void;
}

export const AttendantDetailForm = ({attendant, handleSave}: AttendantDetailFormProps) => {

    const [name, setName] = useState<string>(attendant?.name || '');
    const [locationName, setLocationName] = useState<string>(attendant?.location?.name || '');
    const [email, setEmail] = useState<string>(attendant?.user?.email || '');

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const inputName = event.target.name;

        switch (inputName) {
            case 'name':
                setName(event.target.value)
                break;
            case 'email':
                setEmail(event.target.value)
                break;
            case 'location-name':
                setLocationName(event.target.value)
                break;
            default:
                return
        }

    }

    const save = (e: any) => {
        e.preventDefault();
        const updatedAttendant  = updateAttendant(attendant, {name, locationName, email});
        handleSave(attendant?.meetingId, updatedAttendant as Attendant)


    }


    return (

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            onSubmit={save}
            autoComplete="off"
        >
            <InputWrapper fullWidth variant="standard">
                <InputLabel htmlFor="name">Name?</InputLabel>
                <Input id="name" name='name' inputProps={ariaLabel} value={name}
                       onChange={handleChange} required/>
            </InputWrapper>
            <InputWrapper fullWidth variant="standard">
                <InputLabel htmlFor="locationName">Location</InputLabel>
                <Input id="locationName" name='location-name' inputProps={ariaLabel} value={locationName}
                       onChange={handleChange}/>
            </InputWrapper>
            <InputWrapper fullWidth variant="standard">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name='email' inputProps={ariaLabel} value={email}
                       onChange={handleChange}/>
            </InputWrapper>
            <Button type='submit'>Save</Button>
        </Box>
    );
};
