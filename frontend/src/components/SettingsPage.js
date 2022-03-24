/**
 * The Settings page redirects the user to the page 
 * which has an option for the user to logout
 */

/**
 * The imports which are required for the SettingsPage.js page 
 * to run which includes packages from React and other files which exist.
 */
import React from "react";
import { InputAdornment, Button, Typography } from "@material-ui/core";
import ExitToApp from "@material-ui/icons/ExitToApp";

/**
 * The main function of the SettingsPage.js page
 * @returns the Settings page with a button which fetches an API call from backend
 * to allow the player to logout from the game
 */
 export default function SettingsPage(){
 
    /**
     * Fetches the Logout API call from backend
     */
    const logout = () => {
        fetch('/api/logout')
		.then(response => response.json())
		.then(data => {
            console.log(data);
            window.location.reload();
        })
    }
     /**
      * Logout button which redirects the player to leave the app
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