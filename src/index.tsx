import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider as MaterialThemeProvider} from "@mui/material";
import {theme} from "./lib/theme";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Meetings from "./routes/meetings";
import NotFound from "./routes/notFound";
import Meeting from "./routes/meeting";

import {CacheProvider} from "./lib/services/context/cache";
import {MeetingsLocalCacheAdapter} from "./lib/services/context/cache/MeetingCacheAdapter";


const meetingsStoreAdapter = new MeetingsLocalCacheAdapter();


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CssBaseline/>
            <MaterialThemeProvider theme={theme}>
                <CacheProvider meetingsCacheProvider={meetingsStoreAdapter}>
                    <Routes>
                        <Route path="/" element={<App/>}>
                            {/*<Route path="/" element={<Navigate replace to="/meetings"/>}/>*/}
                            <Route path="meetings" element={<Meetings/>}/>
                            <Route path="meetings/:meetingId" element={<Meeting/>}/>
                            <Route
                                path="/*"
                                element={<NotFound/>
                                }
                            />
                        </Route>
                    </Routes>
                </CacheProvider>
            </MaterialThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
