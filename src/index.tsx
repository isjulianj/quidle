import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider as MaterialThemeProvider} from "@mui/material";
import {theme} from "./lib/theme";

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <MaterialThemeProvider theme={theme}>
            <App/>
        </MaterialThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
