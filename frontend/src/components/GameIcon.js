/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
import React from "react";
import { Icon } from "@material-ui/core";

export default function GameIcon({
    src=""
}){
    return (
        <Icon>
            <img src={`/static/icons/${src}.svg`} height={25} width={25}/>
        </Icon>
    );
    
}