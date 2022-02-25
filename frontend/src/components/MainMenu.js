import React, {useState, useEffect} from "react";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';

export default function MainMenu(){

    if (isMobile) {
        return (
            <div className="center">
                <img src={logo} alt="Logo" />
                In Mobile Browser
            </div>
        );
    }else{
        return (
            <div>In Desktop Browser!</div>
        );
    }
    
}

/*
------------
Use of Browser and Mobile view
------------
import {BrowserView, MobileView} from 'react-device-detect';

const MyComponent = () => {
    return (
        <>
            <BrowserView>
                <h1>This is rendered only in browser</h1>
            </BrowserView>
            <MobileView>
                <h1>This is rendered only on mobile</h1>
            </MobileView>
        </>
    );
};

-------------
Use of isMobile Boolean
-------------
import {isMobile} from 'react-device-detect';

const MyComponent = () => {
    if(isMobile) {
        return (
            <div> This content is available only on mobile</div>
        )
    }
    return (
        <div> content... </div>
    );
};
----------------
Simple Method
----------------
// Create states
const [width, setWidth] = useState(window.innerWidth);

// Check if the window has been resized, if so update state
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}

// If we are in a moble browser or not
const isDebugMobile = width <= 768;
*/