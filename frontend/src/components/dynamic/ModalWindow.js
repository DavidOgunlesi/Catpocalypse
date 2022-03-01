import React, {useState} from "react";
import {Modal, Box, Typography, Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";

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

export default function ModalWindow({
    title = "Modal Title",
    content = "Modal Content",
    buttonText = "Close",
    buttonInactive = false,
    open = false,
    handleClose = null,
    imageSrc = null,
    imageAlt ="",
    extraContentBefore = null,
    extraContentAfter = null,
    buttonLink = ""
}){
    const [isOpen, setIsOpen] = useState(open);
    return (
        <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={isOpen}
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
                    onClick={_ => {!buttonInactive ? setIsOpen(false) : null}}
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