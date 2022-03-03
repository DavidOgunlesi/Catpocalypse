/**
 * Animation of the falling cats is done in this file
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React from "react";
import cat from '/static/images/normal_cat.png';
import {getRandomRange} from '/src/util/math.js'
import Expire from "../util/Expire";

/**
 * Main Function of FallingCat.js
 * @param {*} props 
 * @returns falling cats which are spinning in both clockwise and anti-clockwise directions
 */
export default function FallingCat(props){

    const randomSpeed = getRandomRange(props.minSpeed,props.maxSpeed);
    const randomNum = Math.ceil(getRandomRange(0,2));
    var anim;
    randomNum-1 == 1 ? anim = "spin" : anim = "spinOpposite";

    
    return (
        <Expire delay={props.aliveTime * 1000}>
        <div className="fallingCat" 
        style = {{
            top: props.y, 
            right: props.x,
            animation: `drop ${randomSpeed}s linear`
        }}
        >
            <img src={cat} 
            className="fallingCat" 
            alt="Logo" 
            style = {{
                animation: `${anim} ${randomSpeed/4}s linear infinite`
            }}
            />
        </div>
        </Expire>
    );
    
}