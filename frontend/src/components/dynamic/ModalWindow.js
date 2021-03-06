/**
 * The standard component of the Modal windows which show up throughout the app
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */
import React, {useState} from "react";
import {Modal, Box, Typography, Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * Sets a constant style for all the modal windows will show up.
 */
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

/**
 * Main function for ModalWindow.js
 * @param {*} param0 
 * @returns A modal window
 */
export default function ModalWindow({
    title = "Modal Title",
    content = "Modal Content",
    buttonText = "Close",
    buttonInactive = false,
    open = false,
    openState = null,
    handleClose = null,
    imageSrc = null,
    imageAlt ="",
    extraContentBefore = null,
    extraContentAfter = null,
    buttonLink = "",
    onClick = null
}){
    const [isOpen, setIsOpen] = useState(open);

    function handleButtonPress(){
        if (onClick != null) {
            onClick();
        }
        if (!buttonInactive) {
            setIsOpen(false);
        }
    }
    function setOpen(){
        if (openState==false || isOpen == false){
            return false;
        }
        return true;
    }
    return (
        <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={setOpen()}
        onClose={handleClose}
        >
            <Box sx={style}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <img src={imageSrc} alt={imageAlt} style={{width:"100%"}}/>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {content}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {extraContentBefore}
                    </Grid>
                    <Grid item xs={12}>
                    <Button 
                    component = {Link}
                    to = {buttonLink}
                    color = 'primary' 
                    variant="contained"
                    size="large" 
                    style={{ borderRadius: 50 }}
                    disableElevation={true}
                    fullWidth={true}
                    onClick={handleButtonPress}
                    >
                        {buttonText}
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {extraContentAfter}
                    </Grid>
            </Grid> 
            </Box>
        </Modal>
    );
    
}
//onClick={_ => {buttonInactive ? setOpen(false) : setOpen(true)}}