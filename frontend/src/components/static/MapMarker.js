/**
 * Returns markers on the app on the Map View when the user is playing the same
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React from "react";
import CatMapMarker from "./MapMarkers/CatMapMarker";
import PlayerMapMarker from "./MapMarkers/PlayerMapMarker";

/**
 * Main function of MapMarker.js
 * @param {string} param0 == the markerType has to be either cat or player if not the default is to return nothing.
 * @returns the marker at which the player is at using the GPS location and also returns the location at which the cats are being spawned
 */
export default function MapMarker({
    markerType="",
    size=50,
    id=null,
    invisible=false
}){
    /**
     * Checks if the cat is invisible, if invisible, there will be no display of the cat on the map
     * If it is visible, the cat will be displayed on the map.
     */
    if(invisible){
        return null;
    }
    switch (markerType) {
        case "cat":
            return(<CatMapMarker size={size} id={id}/>);
        case "player":
            return(<PlayerMapMarker size={size}/>);
        default:
            return(null);
    }
    
}