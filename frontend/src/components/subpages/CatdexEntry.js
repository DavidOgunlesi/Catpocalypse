import React, {useEffect, useState} from "react";
import Background from "../static/Background";
import Slider from '../dynamic/Slider'

/**
 * Main Function of CatdexEntry.js
 * Renders the Catdex entry page when it is clicked.
 * Displays a sliding menu with arrows to navigate between each of the user's cats.
 * @returns The Catdex entry component.
 */
export default function CatdexEntry({id, ownedCats}){
    if (ownedCats == null) {
        return null;
    }

    return (
        <Background 
        gradient={false} 
        primaryCol="#E2FADD" 
        outlineCol="#9EE6C9" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#B8FCF3"
        >
            
            <Slider ownedCats={ownedCats}/>  
        </Background>  
    );
}