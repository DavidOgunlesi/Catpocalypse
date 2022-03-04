/**
 * Returns Cat markers on the app on the Map View when the user is playing the game
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React from "react";
import Cat from "/static/images/cat.png";

/**
 * Main Function of CatMapMarker.js
 * @returns The cat image which bounces on the interactive map
 */
export default function CatMapMarker({
    size=50
}){
    return (
        <div class="markerImg">
            <img class="bounce" width={size} src={Cat}/>
        </div>
    );
    
}