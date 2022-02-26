import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import {Button, Grid} from "@material-ui/core";
import FallingCat from "./dynamic/FallingCat";
import {getRandomRange} from '/src/util/math.js';
import Background from "./static/Background";

export default function MainMenu(){

    const requireLogin = true;

    function spawnCats(){ // integer state
        for (let index = 0; index < getRandomRange(1,3); index++) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = -1000;
            var cat = (<FallingCat x={x} y={y} minSpeed={3} maxSpeed={6} aliveTime={10}/>);
            var catDiv = document.createElement('div');
            render(cat,catDiv);
            document.getElementById("catHolder").append(catDiv);
        }
    }

    useEffect(() => {
        if (isMobile){
            var timerID = setInterval(() => spawnCats(), 1000);
            return () => clearInterval(timerID);
        }
    });


    function renderStartButton(){
        return (
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <Button 
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    disableElevation={true}
                    disableFocusRipple={true}
                    disableRipple={true}
                    fullWidth={true}
                    >
                        Click Anywhere To Start The Catpocalpyse!
                    </Button> 
                </Grid>
            </Grid>
        );
    }

    function renderRegAndLoginButton(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button 
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    fullWidth={true}
                    >
                        Login
                    </Button> 
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    fullWidth={true}
                    >
                        Sign up
                    </Button> 
                </Grid>
            </Grid>
        );
    }

    function chooseRender(){
        if (requireLogin){
            return renderRegAndLoginButton();
        }else{
            return renderStartButton();
        }
    }

    if (isMobile) {
        return (
            <Background 
            gradient={false} 
            primaryCol="#FEEAC2" 
            outlineCol="#FFC992" 
            outlineThickness={200} 
            skew={-32}
            backgroundCol="#FFF59D"
            >
                <Button 
                variant="outline" 
                style={{ width:"100%", height: "100%", position:"absolute"}}
                />
                <img src={logo} className="logo" alt="Logo" />
                <div id="catHolder"></div>
                <div className="center">
                    {chooseRender()}
                </div>
            </Background>
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