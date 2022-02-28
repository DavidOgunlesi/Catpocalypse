import React, {useState}  from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link, Redirect, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import MainMenu from "./MainMenu";
import RegisterPage from "./RegisterPage";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {isMobile} from 'react-device-detect';
import DesktopWarningPage from "./DesktopWarningPage";

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

    //We can pass props to homepage component
    if (isMobile) {
        return(
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainMenu splash={true}/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
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