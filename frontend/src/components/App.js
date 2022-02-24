import React, {useState}  from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link, Redirect, Routes} from "react-router-dom";
import HomePage from "./HomePage";

export default function App(){

    //We can pass props to homepage component
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Router>

    
    );
    
}

const appDiv = document.getElementById("app");
//render app component in the app div with "name" prop
render(<App name="Example name!"/>,appDiv)