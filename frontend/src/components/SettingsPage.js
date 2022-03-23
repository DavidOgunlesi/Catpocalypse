/**
 * A set template used to check if the page is working or not.
 * Imports React from the React Package
 */
import React from "react";
import { InputAdornment, Button, Typography } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";

 export default function SettingsPage(){
 
    const logout = () => {
        fetch('/api/logout')
		.then(response => response.json())
		.then(data => {
            console.log(data);
            window.location.reload();
        })
    }
     /**
      * Returns Hello World!
      */
     return (
        <Button 
        color = 'primary' 
        variant = "contained"
        size = "large" 
        style = {{ borderRadius: 50 }}
        fullWidth = {true}
        onClick={()=>logout()}
        startIcon={
            <InputAdornment position="start">
                 <ExitToApp />
            </InputAdornment>}
        >
            <Typography variant="h4" component="h4">Logout</Typography>
         </Button>
     );
     
 }