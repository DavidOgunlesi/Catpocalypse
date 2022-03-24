/**
 * The standard component of the Slide Horizontal window which shows up throughout the app at multiple intervals
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, { useState } from "react";
import {Modal, Box, Typography, Button, Grid} from "@material-ui/core";


/**
 * Main function for SlideUpWindow.js
 * @param {string} content The content will be input when the Sliding Up Window shows up 
 * @returns The entire Slide Up Window with a pre-defined style, font and background.
 */
export default function SlideHorizontalWindow({
    open = false,
    callback = null,
    backgroundColor="",
    children
}){
    /**
     * Constant variable which sets states which cannot be reassigned
     */
    const [state, setState] = useState(0)
    var styleClass = "blurLeftSlider";
    if (open) {
        if(state!=1){
            $(`.${styleClass}`).toggleClass('close');
            setState(1);
        }
    }else{
        closeWindow();
    }
    /**
     * Function which closes window
     */
    function closeWindow(){
        if (state!=0){
            setState(0);
            $(`.${styleClass}`).toggleClass('close');
            if (callback!=null){
                callback();
            }
        }
    }
    
    return (
        <div class={`${styleClass} close`}>
            <div 
            style={{
                position: "relative",
                margin: "0px 25px 0px 25px",
                overflow: "auto",
                overflowY: "hidden",
                overflowX: "hidden",
                backgroundColor: backgroundColor
            }}
            >
                {children}
            </div>
            <Typography 
            style={{ 
                position: "fixed",
                bottom: "-200px",
                display: open ? "block" : "none"
            }} 
            variant="h5" 
            component="h5"
            >Catnip</Typography>
            <Button 
                color = 'secondary' 
                variant="contained"
                size="large" 
                style={{ 
                    borderRadius: 50,
                    position: "fixed",
                    bottom: "10px",
                    display: open ? "block" : "none"
                    }}
                disableElevation={true}
                fullWidth={true}
                onClick={() => {
                    if (callback != null){
                        callback();
                    }
                    
                }}
                >
                    Back
                </Button>
        </div>
    );
    
    
}