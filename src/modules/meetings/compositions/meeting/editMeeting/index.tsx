import React, {useContext, useEffect, useState} from 'react';
import {MeetingForm} from "../../../components/meetingFormInput/MeetingForm";
import {useMeetingStore} from "../../../store";
import {useParams} from "react-router-dom";
import {Slide} from "@mui/material";
import MeetingHeader from "../../../components/meetingHeader";
import {LocationSearchInput} from "../../../../../lib/components/locationSearch";
import {
    ResultsSelected,
} from "../../../../../lib/services/location/LocationSearchAdapterInterface";
import {Extent} from "../../../../../lib/extent/Extent";
import {useBuildLocation} from "../../../../../lib/hooks/use-build-location/useBuildLocation";
import {Location} from "../../../../../core/domain/models/location";
import {AttendantModal} from "../../../components/attendantModal";
import {AttendantDetailForm} from "../../../components/attendantDetailForm";
import {Attendant} from "../../../../../core/domain/models/attendant";
import {useBuildAttendant} from "../../../../../lib/hooks/use-build-attendant";
import {Box, Button, Text} from '../../../../../lib/ui-components';
import {Meeting} from "../../../../../core/domain/models/meeting";
import {MEETINGS} from "../../../../../lib/services/MeetingCacheAdapter";
import {CacheContext} from "../../../../../context/cache";


export const EditMeeting = () => {

    const {meetings, addAttendant, addMeetings} = useMeetingStore();
    let params = useParams();
    const {buildLocation} = useBuildLocation();
    const {buildAttendant} = useBuildAttendant();
    const [seeInput, setSeeInput] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<Location>()
    const [editExistingAttendant, setEditExistingAttendant] = useState<boolean>(false)
    const [selectedAttendant, setSelectedAttendant] = useState<Attendant>()
    const [showAttendantModal, setShowAttendantModal] = useState<boolean>(false)
    const [meeting, setMeeting] = useState<any>()

    const cache = useContext(CacheContext);

    // when navigating to the page without coming from meetings page
    useEffect(() => {
        if(meetings.length > 0) {
            setMeeting(meetings.find((meeting: Meeting) => meeting.id === params.meetingId))
            return
        }

        const savedMeetings = cache?.get(MEETINGS);

        if (savedMeetings === null) {
            return
        }

        addMeetings(savedMeetings.meetings);
        setMeeting(meetings.find((meeting: Meeting) => meeting.id === params.meetingId))

    }, [cache, meetings])


    const onSelected: ResultsSelected = (event): void => {

        if (meeting?.id === undefined) {
            // TODO: tell user that meeting couldnt be selected.
            return
        }

        const result: any = event?.data?.result;

        // create extent
        const extent = new Extent(
            result?.boundingBox?.btmRightPoint?.lat ?? 0,
            result?.boundingBox?.topLeftPoint?.lng ?? 0,
            result?.boundingBox?.topLeftPoint?.lat ?? 0,
            result?.boundingBox?.btmRightPoint?.lng ?? 0,
        )
        // create location


        const locationName = result.entityType === 'Municipality' ? result.address.municipality : result.address.country
        const newLocation = buildLocation({
            extent,
            coords: [result.position.lng, result.position.lat],
            locationName
        })

        const newAttendant = buildAttendant({name: '', location: newLocation, meetingId: meeting.id})

        setSelectedAttendant(newAttendant)

        // open a modal
        // Modal display pre populated fields
        // Save modal store in state

    }

    const saveAttendant = (meetingId: string, attendant: Attendant) => {
        addAttendant(meetingId, attendant)
    }


    // Attendant selected
    // open modal
    useEffect(() => {
        if (selectedAttendant) {
            console.log('selectedLocation', selectedLocation)
            setShowAttendantModal(true)
        }


    }, [selectedAttendant, meetings])


    const closeAttendantModal = () => {
        console.log('closed')
        setShowAttendantModal(!showAttendantModal)
    }

    return (
        <>
            <Box>

                <MeetingHeader heading='Edit the meeting.'>
                    {seeInput ?
                        <Slide
                            direction="left"
                            in={seeInput}
                            mountOnEnter
                            unmountOnExit
                        >
                            <Box>
                                <LocationSearchInput
                                    onSelected={onSelected}
                                    onSearchCleared={(e) => setSeeInput(false)}
                                />
                            </Box>
                        </Slide> :
                        <Button onClick={() => setSeeInput(true)}>Add Attendant</Button>
                    }

                </MeetingHeader>
                <Box>
                    {meeting &&
                    <MeetingForm meeting={meeting}/>
                    }
                </Box>

                <Box>
                    <Text variant='subtitle1'>Attendants</Text>
                    {/*{meeting && meeting.attendants.map(attendant => <Box key={attendant.name}>{attendant.name}</Box>)}*/}
                </Box>

            </Box>
            <AttendantModal open={showAttendantModal} handleClose={closeAttendantModal}
                            isEdit={editExistingAttendant}>

                <Box padding={2}>
                    {selectedAttendant &&
                    <AttendantDetailForm attendant={selectedAttendant} handleSave={saveAttendant}/>
                    }

                </Box>
            </AttendantModal>

        </>
    );
};