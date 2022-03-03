import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Grid, Typography, InputAdornment} from "@material-ui/core";
import FallingCat from "./dynamic/FallingCat";
import {getRandomRange} from '/src/util/math.js';
import Background from "./static/Background";
import {Link} from "react-router-dom";
import LoginPage from "./LoginPage";
import {GoogleLogin} from 'react-google-login';
import GoogleLogo from '/static/images/GoogleLogo.png';
import ModalWindow from "./dynamic/ModalWindow";
import ChoiceModalWindow from "./dynamic/ChoiceModalWindow";

export default function MainMenu(){
    const [musicEnabled,setMusicEnabled] = useState(false);
    const [audioModalOpen,setAudioModalOpen] = useState(true);
    const requireLogin = true;

    useEffect(()=>{
        setMusicEnabled(manageModalState(isMusicPlaying()));
    })

    function responseGoogleSuccess(response) {
        console.log("SUCCESS");
        console.log(response);
        console.log(response.profileObj);
    }
    function responseGoogleFailure(response) {
        console.log("FAIL");
        console.log(response);
    }

    function spawnCats(){ // integer state
        for (let index = 0; index < getRandomRange(1,3); index++) {
            var x = Math.floor(Math.random() * window.innerWidth);
            var y = -200;
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
                    variant = "contained"
                    size = "large" 
                    style = {{ borderRadius: 50 }}
                    fullWidth = {true}
                    component = {Link}
                    to="/login"
                    >
                        Log in
                    </Button> 
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    fullWidth={true}
                    component = {Link}
                    to="/register"
                    >
                        Sign up
                    </Button> 
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Or log in with:</Typography>
                </Grid>
                <GoogleLogin
                clientId="745185368334-qa0udogh8j1pge5c8tcc3699m42o0bv9.apps.googleusercontent.com"
                render={renderProps => (
                    <Grid item xs={12}>
                        <Button 
                        variant="contained"
                        size="large" 
                        style={{ borderRadius: 25, background: "white" }}
                        fullWidth={true}
                        onClick={renderProps.onClick} disabled={renderProps.disabled}
                        startIcon={
                                <InputAdornment position="start">
                                    <img src={GoogleLogo} width={20}/>
                                </InputAdornment>}
                        >
                        <Typography  style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            GOOGLE
                        </Typography>
                        </Button>
                </Grid>
                  )}
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
                />
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

    function enableAudio(){
        console.log("trying to play");
        document.getElementById('soundtrack').play();
    }

    function isMusicPlaying(){
        console.log("g");
        var audio = document.getElementById('soundtrack');
        console.log(audio);
        console.log(!(audio == null ? false : audio.paused));
        return (audio == null ? false : audio.paused);
    }

    function manageModalState(isMusicPlaying){
        if (!isMusicPlaying == false || audioModalOpen == false) {
            return false;
        }
        return true;
    }

    function renderModal(){
        if (!musicEnabled) {
            return (
                <ChoiceModalWindow
                title="Enable Audio?" 
                content="Would you like audio to play in the game?"
                onClick={_=>{enableAudio()}}
                />
            );
        }
        return null;
    }

    return (
        <Background 
        gradient={false} 
        primaryCol="#FEEAC2" 
        outlineCol="#FFC992" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#FFF59D"
        >
            {renderModal()}
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