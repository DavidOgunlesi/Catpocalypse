/**
 * The standard component of the Slide up windows which show up throughout the app
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
export default function SlideUpWindow({
    title = null,
    textContent = null,
    content = null,
    open = false,
    callback = null,
    blur = false,
    textColor="",
    backgroundColor="",
    fillBox = false
}){
    var styleClass = blur ? "blurSlider" : "slider";

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
                padding: fillBox ? "0px" : "50px",
                margin: "0px 25px 0px 25px",
                height:  "100%",
                overflow: "auto",
                overflowX: "hidden",
                overflow: fillBox ? "hidden" : "",
                backgroundColor: backgroundColor
            }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography style={{color: textColor}} id="modal-modal-title" variant="h3" component="h3">
                        {title}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography style={{color: textColor}} id="modal-modal-description" sx={{ mt: 2 }}>
                        {textContent}
                    </Typography>
                    </Grid>
                </Grid> 
                {content}
            </div>
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