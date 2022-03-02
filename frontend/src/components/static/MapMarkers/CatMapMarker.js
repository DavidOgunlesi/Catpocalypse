import React from "react";
import Cat from "/static/images/cat.png";

export default function CatMapMarker(){
    return (
        <div class="markerImg">
            <img class="bounce"  src={Cat}/>
        </div>
    );
    
}