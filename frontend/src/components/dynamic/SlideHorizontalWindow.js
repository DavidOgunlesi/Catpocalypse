/**
 * The standard component of the Slide Horizontal window which shows up throughout the app at multiple intervals
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React from "react";
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
    var styleClass = "blurLeftSlider";
    if (open) {
        $(`.${styleClass}`).toggleClass('close');
    }
    
    function closeWindow(){
        if (callback!=null){
            callback();
        }
        $(`.${styleClass}`).toggleClass('close');
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
                onClick={closeWindow}
                >
                    Back
                </Button>
        </div>
    );
    
    
}