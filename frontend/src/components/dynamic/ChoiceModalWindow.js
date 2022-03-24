/**
 * The imports which are required for this page to run which includes packages from React.
 */
import React, {useState} from "react";
import {Button} from '@material-ui/core';
import ModalWindow from "./ModalWindow";

/**
 * 
 * Main function for ChoiceModalWindow.js
 * @returns the modal window with a button 
 */
export default function ChoiceModalWindow(props){

    /**
     * Variable using state for the Audio Modal Window but it cannot be reassigned
     */
    const [audioModalOpen,setAudioModalOpen] = useState(true);

    return (
        <ModalWindow 
            {...props}
            open={true}
            openState={audioModalOpen}
            buttonText="Yes"
            extraContentAfter={
                <Button 
                color = 'primary' 
                variant="contained"
                size="large" 
                style={{ borderRadius: 50 }}
                disableElevation={true}
                fullWidth={true}
                onClick={_=>{setAudioModalOpen(false);}}
                >
                    No
                </Button>
            }
            />
    );
    
}