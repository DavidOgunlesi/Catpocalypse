/**
 * The Main Menu page is the first page which shows up when you run the server and open http://localhost:8000
 * The following page will explain the documentation of what occurs in MainMenu.js
 */

// The imports which are required for this page to run which includes packages from React Js and other files which exist.
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

/**
 * The main function of the MainMenu.js page
 * @type {Array<number>}
 * @returns the Main Menu of Catpocalypse when the game gets initialised.
 */
export default function MainMenu(){
    const clientId = "745185368334-aef3mdrspfkkegcbrunmbiho20doko8d.apps.googleusercontent.com";
    const [musicEnabled,setMusicEnabled] = useState(false);
    /**
     * Fixed Variables which cannot be changed or modified
     */
    const [audioModalOpen,setAudioModalOpen] = useState(true);

    /**
     * @returns {boolean} Returns true when login is required.
     */
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

    /**
     * This function lets cats get spawned and creates an animation effect of falling cats in the background.
     */
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

    /**
     * This checks if the user is using their mobile to allow the effect to take place. If the user is using their Desktop, there will be no effects taking place.
     * However, if the user is accessing with their mobile, this effect will be used with the cats being spawned every second.
     */
    useEffect(() => {
        if (isMobile){
            var timerID = setInterval(() => spawnCats(), 1000);
            return () => clearInterval(timerID);
        }
    });


    /**
     * renderStartButton() is a function which is contained in a grid and has a button with the following properties as mentioned below.
     * @returns A modal window on the page which pops up and shows the user "Click Anywhere to Start the Catpocalypse".
     */
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

    /**
     * There are 3 centered buttons shown on the Main Menu page from which the user can choose from. If this function is called, it will return all the 3 buttons.
     * The function is surrounded by a grid which further has another grid inside followed by the respective buttons as explained below.
     * @returns A few buttons which show up on the Main Menu page. This includes the Login button, which redirects you to the Login page,
     * the Sign Up button which is linked and redirects the user to the registeration page,
     * the button labelled "Google" with the Google logo which allows the user to login with their Google account instead of registering with Catpocalypse.
     */
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
                    to="/login" // redirects the user to the login page
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
                    to="/register" // redirects the user to the register page.
                    >
                        Sign up
                    </Button> 
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Or log in with:</Typography>
                </Grid>
                
                <GoogleLogin
                clientId="745185368334-cduhbhmaeckcunr242v5l3sefa8i31jg.apps.googleusercontent.com"
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

    /**
     * The chooseRender() function decides which page should the user be redirected to.
     * @returns If the login is required, it will return the renderRegAndLoginButton() function, 
     * else if the login is not required, it will return the renderStartButton() function
     */
    function chooseRender(){
        if (requireLogin){
            return renderRegAndLoginButton();
        }else{
            return renderStartButton();
        }
    }

    /**
     * This function allows the user to select if they want the music to play in the background while Catpocalypse is running.
     * This option will be asked in a pop up window with Catpocalypse's colour palette in the background.
     * If the user selects yes, the music will start playing, however if the user selects no, then no music will be played throughout.
     */
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