import React, {useState} from "react";
import {Button} from '@material-ui/core';
import ModalWindow from "./ModalWindow";

export default function ChoiceModalWindow(props){

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