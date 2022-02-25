import React, {useState, useEffect} from "react";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import {Button, Grid} from "@material-ui/core"

export default function MainMenu(){

    if (isMobile) {
        return (
            <div>
                 <img src={logo} className="logo" alt="Logo" />
                <div className="center">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button 
                            color = 'primary' 
                            variant="contained"
                            size="large" 
                            style={{ borderRadius: 50 }}
                            >
                                 Start The Catpocalpyse!
                            </Button>
                        </Grid>
                    </Grid>
                </div>
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