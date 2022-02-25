import React from "react";
import cat from '/static/images/normal_cat.png';
import {getRandomRange} from '/src/util/math.js'
import Expire from "../util/Expire";

export default function FallingCat(props){

    const randomSpeed = getRandomRange(props.minSpeed,props.maxSpeed);
    
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
                animation: `spin ${randomSpeed/4}s linear infinite`
            }}
            />
        </div>
        </Expire>
    );
    
}