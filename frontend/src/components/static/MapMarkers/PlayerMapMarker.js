import React from "react";
import marker from "/static/images/marker.png";

export default function PlayerMapMarker(){
    return (
        <div>
            <img src={marker} width="50" style={{position: "absolute", bottom: 1}} />
        </div>
    );
    
}