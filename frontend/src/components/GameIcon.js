/**
 * Loads an icon with a given name from an icon resource folder
 * Imports React and Icon from the Material-UI from the React Package
 */
import React from "react";
import { Icon } from "@material-ui/core";

export default function GameIcon({
    src="",
    height=25,
    width=25
}){
    return (
            <img src={`/static/icons/${src}.svg`} height={height} width={width}/>
    );
    
}