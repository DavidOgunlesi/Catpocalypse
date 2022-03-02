import React, {useState}  from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link, Redirect, Routes} from "react-router-dom";
import PlayPage from "./PlayPage";
import LoginPage from "./LoginPage";
import MainMenu from "./MainMenu";
import RegisterPage from "./RegisterPage";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {isMobile} from 'react-device-detect';
import DesktopWarningPage from "./DesktopWarningPage";
import VerifyPage from "./VerifyPage";
import { useNavigate } from "react-router-dom";

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
    console.log(!!document.createElement('audio').canPlayType);
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

        function redirectIfLoggedIn(){
            var isLoggedIn = false;
            fetch(`/api/isLoggedIn`)
            .then((response) => {
                if (response.ok){
                    isLoggedIn = true;
                }
                return;
            });
            return (isLoggedIn ? <PlayPage/> : <MainMenu splash={true}/>);
        }
        
        return(
            <MuiThemeProvider theme={theme}>
                <audio autoplay preload>
                    <source src={Song} type="audio/mp3"></source>
                    
                </audio>
                <Router>
                    <Routes>
                        <Route path="/" element={redirectIfLoggedIn()}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/play" element={<PlayPage/>}/>
                        <Route path="/verify" element={<VerifyPage/>}/>
                        <Route path="/verify/:token" element={<VerifyPage/>}/>
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