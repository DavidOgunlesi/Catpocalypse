import React from "react";
import CatMapMarker from "./MapMarkers/CatMapMarker";
import PlayerMapMarker from "./MapMarkers/PlayerMapMarker";

export default function MapMarker({
    markerType=""
}){
    switch (markerType) {
        case "cat":
            return(<CatMapMarker/>);
            break;
        case "player":
            return(<PlayerMapMarker/>);
            break;
        default:
            return(null);
            break;
    }
    
}