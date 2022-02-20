import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider as MaterialThemeProvider} from "@mui/material";
import {theme} from "./lib/theme";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Meetings from "./routes/meetings";
import {MeetingComp} from "./routes/meeting";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <CssBaseline/>
            <MaterialThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route path="/" element={<Navigate replace to="/meetings" />} />
                        <Route path="meetings" element={<Meetings/>}/>
                        <Route path=":meetingId" element={<MeetingComp />} />
                        <Route
                            path="*"
                            element={
                                <main style={{padding: '1rem'}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Route>

                </Routes>
                {/*<Routes>*/}
                {/*    <Route index element={<Meetings meetingsCacheProvider={meetingsStoreAdapter} />} />*/}
                {/*    /!*<Route path="meetingsOverview" element={<Meetings />} />*!/*/}
                {/*    <Route path="dashboard" element={<About />} />*/}
                {/*    <Route path="*" element={'404'} />*/}
                {/*</Routes>*/}

            </MaterialThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
