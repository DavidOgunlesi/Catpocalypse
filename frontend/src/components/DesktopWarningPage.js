import React from "react";
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Typography} from "@material-ui/core";
import Background from "./static/Background";
export default function DesktopWarningPage(){

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