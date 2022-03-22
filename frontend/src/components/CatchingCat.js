/**
 * The Catching Cats page is used to allow players to catch cats from the map view
 */
/**
 * The imports which are required for the CatchingCat.js page to run which includes packages from React and other files which exist.
 */
import React, { useState } from "react";
import {Typography, IconButton} from "@material-ui/core";
import OverlayUI from "./dynamic/OverlayUI";
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';

/**
 * The main function for CatchingCat.js
 * @param {catId} param {callback} 
 * @returns gets activated when the user clicks on a cat on the map and displays the cat which needs to be caught
 */ 
export default function CatchingCat({
     catId = null,
     callback=null
 }){

    const chooseGradient = () =>{
        
        const dayTimeGradient ={
            background: "rgb(66,75,28)",
            background: "linear-gradient(0deg, rgba(66,75,28,1) 0%, rgba(125,214,55,1) 53%, rgba(131,223,242,1) 63%, rgba(45,217,251,1) 100%)"  
            
        }
        const nightTimeGradient ={
            background: "rgb(16,43,19)",
            background: "linear-gradient(0deg, rgba(16,43,19,1) 0%, rgba(52,149,91,1) 53%, rgba(54,64,173,1) 63%, rgba(15,100,201,1) 100%)"
        }
        const duskGradient = {
            background: "rgb(8,29,10)",
            background: "linear-gradient(0deg, rgba(8,29,10,1) 0%, rgba(15,84,44,1) 53%, rgba(168,96,48,1) 63%, rgba(34,65,94,1) 100%)"
        }
        const dawnGradient = {
            background: "rgb(19,48,16)",
            background: "linear-gradient(0deg, rgba(19,48,16,1) 0%, rgba(45,110,75,1) 53%, rgba(219,141,126,1) 63%, rgba(109,136,170,1) 100%)",
        }
        var gradient = dayTimeGradient;
        const d = new Date();
        let hour = d.getHours();
        console.log(hour);
        if (hour >= 20 || hour < 5){
            console.log("1");
            gradient = nightTimeGradient;
        }
        if (hour >= 5 && hour < 6){
            console.log("2");
            gradient = dawnGradient;
        }
        if (hour >= 6 && hour < 19){
            console.log("3");
            gradient = dayTimeGradient;
        }
        if (hour >= 19 && hour < 20){
            console.log("4");
            gradient = duskGradient;
        }
        return (gradient);
    }

    const loadCatImageFromId = (id) =>{
        return `/static/images/cats/${id}.png`
    }  
     /**
      * Returns Hello World!
      */

     return (
         <div style={{
             ...chooseGradient(), 
             width: "100%",
             height: "100%"
         }}>
             <div
            className="center"
            >
            <img src={loadCatImageFromId(catId)} width={200}/>
            </div>
            <OverlayUI>
                <IconButton
                variant="h4"
                x="0px"
                y="0px"
                size="large"
                anchor = "top left"
                onClick={() => {
                    if (callback!=null){
                        callback();
                    }
                }}
                >
                    <ArrowBackRounded style={{color:'white'}}/>
                </IconButton>

            </OverlayUI>
        </div>
     );
     
 }