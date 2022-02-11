import React from 'react';
import './App.css';
import {Header} from "./components/layout/Header";
import {Routes, Route} from 'react-router-dom'
import {Meetings} from "./modules/meetings/compositions/meetings";
import {MeetingsLocalCacheAdapter} from "./lib/services/MeetingCacheAdapter";

const About = () => {
    return (
        <>
            <h2>About</h2>
        </>
    );
};

const meetingsStoreAdapter = new MeetingsLocalCacheAdapter();


function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<Meetings meetingsCacheProvider={meetingsStoreAdapter} />} />
                {/*<Route path="meetings" element={<Meetings />} />*/}
                <Route path="dashboard" element={<About />} />
                <Route path="*" element={'404'} />
            </Routes>
        </>
    );
}

export default App;
