import React, {useState} from "react";
import PasswordChecklist from "react-password-checklist";
import {isMobile} from 'react-device-detect';
import Background from "./static/Background";
import logo from '/static/images/logo.png';
import {Button, Grid, Typography, TextField, FormControl, FormControlLabel,FormHelperText, FilledInput, Input} from "@material-ui/core";

export default function RegisterPage(){
    const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
    if(isMobile){
        return (
            <Background 
            gradient={false} 
            primaryCol="#FEEAC2" 
            outlineCol="#FFC992" 
            outlineThickness={200}
            skew={-32}
            backgroundCol="#FFF59D"
            >
                <img src={logo} className="logo" alt="Logo" />
                <div className="center">
                    
                    <Grid container spacing={3}>
                            <Grid item xs={12} align="center">
                                <FormControl component="fieldset">
                                    <TextField
                                        required={true}
                                        type = "text"
                                        className="inputRounded"
                                        placeholder="Username"
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
                                        placeholder="Email Address"
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
                                    type = "password"
                                    onChange={e => setPassword(e.target.value)}
                                    className="inputRounded"
                                    placeholder="Password"
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
                                    type = "password" 
                                    onChange={e => setPasswordAgain(e.target.value)}
                                    className="inputRounded"
                                    placeholder="Re-enter Password"
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
                                <PasswordChecklist
                                    rules={["minLength","specialChar","number","capital","match"]}
                                    minLength={5}
                                    value={password}
                                    valueAgain={passwordAgain}
                                    onChange={(isValid) => {}}
                                />
                                </Grid>
                    </Grid>
                </div>
            </Background>
        );
    }else {

    }
    
}