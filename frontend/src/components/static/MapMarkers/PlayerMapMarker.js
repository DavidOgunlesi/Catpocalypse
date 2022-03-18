/**
 * Returns Player markers on the app on the Map View when the user is playing the game
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useEffect, useState} from "react";
import marker from "/static/images/marker.png";

/**
 * Main Function of PlayerMapMarker.js
 * @returns A basic marker showing the player their current location using GPS
 */
export default function PlayerMapMarker({
    size=50
}){
    return (
        <div>
            <img src={marker} width={size} style={{position: "absolute", bottom: 1}} />
        </div>
    );
    
}