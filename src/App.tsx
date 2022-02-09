import React from 'react';
import './App.css';
import {Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant={"h1"} fontWeight={"bold"}>
          Quidle
        </Typography>
          <Typography variant={"subtitle1"} fontWeight={"bold"}>
          Equidistant meet ups
        </Typography>
      </header>
    </div>
  );
}

export default App;
