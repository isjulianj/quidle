import React from 'react';
import {useParams} from "react-router-dom";
import {Box} from '../../../../lib/ui-components';
import {CreateMeeting} from "./createMeeting";
import {EditMeeting} from "./editMeeting";
import {MapProvider} from "../../../../lib/components/mapProvider/mapContext";

export default function MeetingComponent() {
    const params = useParams();
    const isExistingMeeting = params?.meetingId !== 'new';

    function renderMeetingComponent() {
        return isExistingMeeting ? (<EditMeeting/>) : (<CreateMeeting/>);
    }

    return (
        <MapProvider>
            <Box sx={{ paddingTop: 2}}>
                {renderMeetingComponent()}
            </Box>
        </MapProvider>
    )
}
