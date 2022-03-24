/**
 * Renders the app and checks if the user is accessing the game with their laptop/desktop or their mobile device.
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useState, useEffect}  from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link, Redirect, Routes} from "react-router-dom";
import Map from "./Map";
import LoginPage from "./LoginPage";
import MainMenu from "./MainMenu";
import RegisterPage from "./RegisterPage";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {isMobile} from 'react-device-detect';
import DesktopWarningPage from "./DesktopWarningPage";
import VerifyPage from "./VerifyPage";
import GoogleLogin from 'react-google-login';


/**
 * Imports the background music from the media folder
 */
import MainSoundtrack from '/static/media/Martin Klem - Hast Du Einen Kugelschreiber.mp3'
import CatchingCat from "./CatchingCat";
import Battle from "./subpages/Battle";

/**
 * Sets a fixed theme for the App
 */
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#AEAEAE'
        }
    }
    
  });

/**
 * Main function of the App.js page which checks if the user is logged in or not.
 * @returns Depending on the user being logged in or not, the function will redirect the user accordingly.
 */
export default function App(){

    /**
     * Sets a constant for the isLoggedIn variable
     */
    //const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // the state is set to false.
    console.log(!!document.createElement('audio').canPlayType);
    console.log("loaded"); // the console log will show that it is loaded.

    /**
     * Uses the music effect by checking whether the user is logged in or not by calling the checkIfUserLoggedIn() function.
     */
    useEffect(() => {
        checkIfUserLoggedIn();
        //console.log(document.getElementById('soundtrack'));
        //document.getElementById('soundtrack').play();
    });
    
    /**
     * Ensures if the user is logged in to the system or not.
     * @returns the console will be informed if the user is logged in or not and will be recorded by checking the response received from the backend.
     */
    function checkIfUserLoggedIn(){
        console.log("Checking...");
        fetch(`/api/isLoggedIn`)
        .then((response) => {
            if (response.ok){
                setIsLoggedIn(true);
                console.log("Is logged in!");
            }
            return response.json();
        }).then((data) => {
            console.log(data);
        });
    }

    /*
    <ModalWindow 
        title="*Crickets*" 
        content="Your browser appears to not support audio!" 
        open={true}
        imageSrc = {warningCat}
        buttonText="Ok"
        />
     */
    //We can pass props to homepage component
    

    /**
     * checks if the user is logged in with their mobile devices
     */
    if (isMobile) {
        
        /**
         * This function will redirect the user to the Map page if the user is logged in or not.
         * @param {} component checks whether isLoggedIn is true or false.
         * @returns if the user is logged in, the app will redirect the user directly to the Map view.
         */
        function redirectIfLoggedIn(component){
            return (isLoggedIn ? <Map/> : component);
        }
        
        /**
         * Plays the audio in the background and set paths to go to various routes of the entire Catpocalypse game 
         * such as Main Menu, Login,Register, Verify (including and excluding the token)
         */
        return(
            <MuiThemeProvider theme={theme}>
                <audio id="soundtrack" loop>
                    <source src={MainSoundtrack} type="audio/mp3"></source>
                </audio>
                <Router>
                    <Routes>
                        <Route path="/" element={redirectIfLoggedIn(<MainMenu splash={true}/>)}/>
                        <Route path="/login" element={redirectIfLoggedIn(<LoginPage/>)}/>
                        <Route path="/register" element={redirectIfLoggedIn(<RegisterPage/>)}/>
                        <Route path="/verify" element={redirectIfLoggedIn(<VerifyPage/>)}/>
                        <Route path="/verify/:token" element={redirectIfLoggedIn(<VerifyPage/>)}/>
                        <Route path="/battle" element={<Battle/>}/>
                        <Route path="/dev/map" element={<Map/>}/>
                        <Route path="/dev/cat" element={<CatchingCat/>}/>
                    </Routes>
                </Router>
            </MuiThemeProvider>
        );

    /**
     * If there is an error, it will return a Desktop Warning Page
     */
    }else{
        return(<DesktopWarningPage/>);
    }
    
}

const appDiv = document.getElementById("app");
//render app component in the app div with "name" prop
render(<App name="Example name!"/>,appDiv)