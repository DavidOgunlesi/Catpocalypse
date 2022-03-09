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

export default function CatdexEntry(){
	if (isMobile){
		return(<Background 
        gradient={false} 
        primaryCol="#E2FADD" 
        outlineCol="#9EE6C9" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#B8FCF3"
        ></Background>);
		}
	else{
		return(<p>Yessir</p>);
	}
}