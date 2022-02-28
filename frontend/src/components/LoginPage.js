import React, {useState, useEffect} from "react";
import {render} from "react-dom";
import {isMobile} from 'react-device-detect';
import logo from '/static/images/logo.png';
import cat from '/static/images/cat.png';
import {Button, Grid, Typography, TextField, FormControl, FormControlLabel,FormHelperText, FilledInput, Input, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import Background from "./static/Background";

export default function LoginPage(){

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
                    <FormControl component="fieldset">
                        <TextField
                            required={true}
                            type = "text"
                            className="inputRounded"
                            placeholder="Enter Username or Email"
                            variant="standard"
                            textalign="center"
                            variant="outlined"
                            size="small"
                            style={{
                                background: "white"
                            }}
                        />
                    </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                    <TextField
                        required={true}
                        type = "text"
                        className="inputRounded"
                        placeholder="Enter Password"
                        variant="standard"
                        textalign="center"
                        variant="outlined"
                        size="small"
                        style={{
                            background: "white"
                        }}
                    />
                    </FormControl>
                    </Grid>
                <Grid item xs={12}>
                    <Button 
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