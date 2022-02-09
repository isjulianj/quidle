import React from 'react';
import './App.css';
import {Header} from "./components/layout/Header";
import {Routes, Route} from 'react-router-dom'

const Home = () => {
    return (
        <>
            <h2>Home</h2>
        </>
    );
};

const About = () => {
    return (
        <>
            <h2>About</h2>
        </>
    );
};
function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="dashboard" element={<About />} />
                <Route path="*" element={'404'} />
            </Routes>
        </>
    );
}

export default App;
