import React from "react";
import {Modal, Box, Typography, Button, Grid} from "@material-ui/core";

export default function SlideUpWindow({
    title = "Modal Title",
    content = "Modal Content",
    open = false,
    callback = null
}){
    if (open) {
        $('.slider').toggleClass('close');
    }
    
    function closeWindow(){
        callback();
        $('.slider').toggleClass('close');
    }

    return (
        <div class="slider close">
            <div class="content">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h3" component="h3">
                        {title}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {content}
                    </Typography>
                    </Grid>
                </Grid> 
            </div>
            <Button 
                color = 'secondary' 
                variant="contained"
                size="large" 
                style={{ borderRadius: 50 }}
                disableElevation={true}
                fullWidth={true}
                onClick={closeWindow}
                >
                    Back
                </Button>
        </div>
    );
    
}