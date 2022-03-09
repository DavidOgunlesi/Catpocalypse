import React, {useEffect, useState} from "react";
import ModalWindow from "./dynamic/ModalWindow";
import warningCat from '/static/images/warningCat.png';
import { geolocated } from "react-geolocated";
import GoogleMapReact from 'google-map-react';
import Background from "./static/Background";
import HorizontalCompass from "./dynamic/HorizontalCompass";
import { useDrag, useGesture } from '@use-gesture/react'

export default function CatdexEntry(){
	if (isMobile){
		return(<Background 
        gradient={false} 
        primaryCol="#FEEAC2" 
        outlineCol="#FFC992" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#FFF59D"
        ></Background>);
		}
	else{
		return(<p>Yessir</p>);
	}
}