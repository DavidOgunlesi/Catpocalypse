/**
 * The Login Page is the page which allows the user to log into their account in Catpocalypse.
 * The following page will explain the documentation of what occurs in LoginPage.js.
 */

/**
 * The imports which are required for this page to run which includes packages from React and other files which exist.
 */

import React, {useState} from "react";
import { useNavigate } from 'react-router';
import logo from '/static/images/logo.png';
import {Button, Grid, Typography, TextField, FormControl, FormControlLabel,FormHelperText, FilledInput, Input, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import Background from "./static/Background";

/**
 * Main function of LoginPage.js
 * @returns The login page asking the user to fill up their emaill address and their password, followed by two buttons "Log In" to proceed logging in, 
 * @returns or "Back" which redirects the user to another page.
 */
export default function LoginPage(){
    
    /**
     * Assign the useNavigate function to a variable.
     */
    let navigate = useNavigate();

    /**
     * Sets the states of email, password and error message.
     */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    /**
     * 
     * @returns ehecks if the fields have been filled or not. If they are not filled, it will return an error message allowing the user to re-enter again.
     */
    function onLogin(){
        if (email=="" || password=="") {
            setErrorMessage("Not all fields have been filled.");
            return;
        }
        /**
         * Sends the requestOption to a variable with the POST method and sends it to the API at the backend.
         */
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                password:password,
                email: email
            }),
        };
        //send post request to our api!
        fetch('/api/login', requestOptions)
        .then((response) => {
            if (!response.ok){
                setErrorMessage("Error logging in.");
                return response.json();
            }
            //Redirect to map page
            console.log("ok!");
            navigate("/");
            location.reload();
            return response.json();
        }).then((data) => {
            setErrorMessage(data.message); // if there is an error, it will return the error message
        });
    }

    /**
     * The Login Page will be returned in a set background with Catpocalypse's colour palette
     * Returns two input fields "Email Address" and "Password"
     * Returns 2 centered buttons of "Log in" - which allows the user to login or go "Back"
     */
    return (
        <Background
        gradient={false} 
        primaryCol="#FEEAC2" 
        outlineCol="#FFC992" 
        outlineThickness={200} 
        skew={-32}
        backgroundCol="#FFF59D"
        >
        <div className="gradient">
        <img src={logo} className="logo" alt="Logo" />
        <div className="center">
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">Log in</Typography>
                </Grid>
                <Grid item xs={12} align="center">
                        <TextField
                            onChange={e => setEmail(e.target.value)}
                            required={true}
                            type = "text"
                            className="inputRounded"
                            placeholder="Enter Email"
                            variant="standard"
                            textalign="center"
                            variant="outlined"
                            size="small"
                            fullWidth={true}
                            style={{
                                background: "white"
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} align="center">
                    <TextField
                        required={true}
                        onChange={e => setPassword(e.target.value)}
                        type = "password"
                        className="inputRounded"
                        placeholder="Enter Password"
                        variant="standard"
                        textalign="center"
                        variant="outlined"
                        size="small"
                        fullWidth={true}
                        style={{
                            background: "white"
                        }}
                    />
                    </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText variant="filled" error={true}>
                        <Typography variant="h6" component="h6">{errorMessage}</Typography>
                    </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    onClick={onLogin}
                    color = 'primary' 
                    variant = "contained"
                    size = "large" 
                    style = {{ borderRadius: 50 }}
                    fullWidth = {true}
                    >
                        Log in
                    </Button> 
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    color = 'primary' 
                    variant = "contained"
                    size = "large" 
                    style = {{ borderRadius: 50 }}
                    fullWidth = {true}
                    component = {Link}
                    to="/"
                    >
                        Back
                    </Button> 
                </Grid>
            </Grid>
        </div>
        </div>
        </Background>
    );
    
    
}