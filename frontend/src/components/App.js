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

import Song from '/static/media/price.mp3'

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

export default function App(){

    //const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(!!document.createElement('audio').canPlayType);
    console.log("loaded");
    useEffect(() => {
        checkIfUserLoggedIn();
    });
    
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
    if (isMobile) {
        
        function redirectIfLoggedIn(component){
            return (isLoggedIn ? <Map/> : component);
        }
        
        return(
            <MuiThemeProvider theme={theme}>
                <audio autoplay preload>
                    <source src={Song} type="audio/mp3"></source>
                    
                </audio>
                <Router>
                    <Routes>
                        <Route path="/" element={redirectIfLoggedIn(<MainMenu splash={true}/>)}/>
                        <Route path="/login" element={redirectIfLoggedIn(<LoginPage/>)}/>
                        <Route path="/register" element={redirectIfLoggedIn(<RegisterPage/>)}/>
                        <Route path="/verify" element={redirectIfLoggedIn(<VerifyPage/>)}/>
                        <Route path="/verify/:token" element={redirectIfLoggedIn(<VerifyPage/>)}/>
                    </Routes>
                </Router>
            </MuiThemeProvider>
        );
    }else{
        return(<DesktopWarningPage/>);
    }
    
}

const appDiv = document.getElementById("app");
//render app component in the app div with "name" prop
render(<App name="Example name!"/>,appDiv)