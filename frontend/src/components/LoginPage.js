import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Grid, Typography} from "@material-ui/core";
import Background from "./static/Background";

export default function LoginPage(){

    if(isMobile){
        return (
            <Background 
            gradient={false} 
            primaryCol="#FEEAC2" 
            outlineCol="#FFC992" 
            outlineThickness={200} 
            skew={-32}
            backgroundCol="#FFF59D"
            >
            </Background>
        );
    }else {

    }
    
    
}