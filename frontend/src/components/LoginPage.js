import React, {useState} from "react";
import { useNavigate } from 'react-router';
import logo from '/static/images/logo.png';
import {Button, Grid, Typography, TextField, FormControl, FormControlLabel,FormHelperText, FilledInput, Input, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import Background from "./static/Background";

export default function LoginPage(){
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function onLogin(){
        if (email=="" || password=="") {
            setErrorMessage("Not all fields have been filled.");
            return;
        }
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
            //redirect to map page
            console.log("ok!");
            navigate("/");
            return response.json();
        }).then((data) => {
            setErrorMessage(data.message);
        });
    }

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