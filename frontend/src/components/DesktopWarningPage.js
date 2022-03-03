/**
 * The Desktop Warning Page checks if the user is using their mobile or their desktop
 * It will return an error, if the user is using their desktop as they should not be able to access the game from their web browser on a computer.
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React from "react";
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Typography} from "@material-ui/core";
import Background from "./static/Background";

/**
 * The main function for DesktopWarningPage.js
 * @returns An error message will show up if the player is using their desktop to play Catpocalypse
 */
export default function DesktopWarningPage(){

    /**
     * Returns the error message with a set background with our Catpocalypse's logo with the error message 
     */
    return (
        <Background 
        gradient={false} 
        primaryCol="#FEEAC2" 
        backgroundCol="#FFF59D"
        >
            <Button 
            variant="outline" 
            style={{ width:"100%", height: "100%", position:"absolute"}}
            />
            <img src={logo} className="logo" alt="Logo" />
            <Typography 
            variant="h4" 
            component="h4" 
            style=
            {{
                backgroundColor:"black", 
                color:"white", 
                height:"10%", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                height: "500px"
            }}
            >
                Desktop Browser currently not supported<br/>Please open with a mobile device to play!
            </Typography>
            <div 
            style=
            {{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center"
            }}
            >
                <img src={cat} alt="Cat"/>
            </div>
        </Background>
        );
    
}