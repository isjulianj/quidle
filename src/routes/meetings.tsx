import React from 'react';
import {MeetingsOverview} from "../modules/meetingsOverview/compositions/meetingsOverview";
import {MeetingsLocalCacheAdapter} from "../lib/services/MeetingCacheAdapter";

const meetingsStoreAdapter = new MeetingsLocalCacheAdapter();

 const Meetings = () => {return (<MeetingsOverview meetingsCacheProvider={meetingsStoreAdapter}/>)}

export default Meetings
