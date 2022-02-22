import React, {useState}  from "react";
import {render} from "react-dom"

export default function App(){

    //We can pass props to homepage component
    return(
    <div className="center">
        Hello World!
        Centered Text!
    </div>
    );
    
}

const appDiv = document.getElementById("app");
//render app component in the app div with "name" prop
render(<App name="Example name!"/>,appDiv)