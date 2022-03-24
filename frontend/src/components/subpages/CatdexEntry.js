import React, {useEffect, useState} from "react";
import Background from "../static/Background";
import { useDrag, useGesture } from '@use-gesture/react';
import Slider from '../dynamic/Slider'

export default function CatdexEntry({id, ownedCats}){
    console.log(id);
    console.log(ownedCats);
    
    //for each item in owned cats
    //render profile component, with slidable screens for each cat

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